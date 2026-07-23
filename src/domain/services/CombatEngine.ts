import { IPlayer } from '../entities/Player';
import { IMonster } from '../entities/Monster';
import { ITechnique } from '../entities/Technique';
import { AttributeType, calculateAttributeDamage, IAttributeEffect } from '../entities/CombatAttributes';
import { IRageState, addRage, consumeRage, tickEnrage, RAGE_CONFIG, RAGE_SKILLS, IComboChain, checkComboChain } from '../entities/RageSystem';
import { calculateRealmDifference, getSuppressionEffect, getAdvantageEffect, checkCanChallenge, calculateEscapeChanceWithSuppression } from '../entities/RealmSuppression';
import { TalentStatsCalculator } from './TalentStatsCalculator';

export { AttributeType } from '../entities/CombatAttributes';

export interface ICombatLog {
  text: string;
  type: 'info' | 'damage' | 'heal' | 'buff' | 'special';
}

interface IStatusEffect {
  type: 'burn' | 'freeze' | 'stun' | 'poison' | 'shield';
  duration: number;
  value: number;
  source?: string;
}

type ChargeState = 'idle' | 'charging' | 'stunned';
type ShieldState = 'up' | 'broken' | 'regen';

export class CombatEngine {
  public player: IPlayer;
  public monster: IMonster;
  private round: number = 0;
  private _ended: boolean = false;
  private tempDefense: number = 0;
  private tempAttack: number = 0;
  private playerCombo: number = 0;
  private monsterCombo: number = 0;

  private playerRage: IRageState;
  private monsterRage: IRageState;
  private playerStatusEffects: IStatusEffect[] = [];
  private monsterStatusEffects: IStatusEffect[] = [];
  private playerTechniqueHistory: string[] = [];
  private monsterTechniqueHistory: string[] = [];
  private playerCooldowns: Map<string, number> = new Map();
  private monsterCooldowns: Map<string, number> = new Map();

  private chargeState: ChargeState = 'idle';
  private chargeTurnsRemaining: number = 0;
  private shieldState: ShieldState = 'up';
  private shieldHp: number = 0;
  private shieldMaxHp: number = 0;
  private shieldRegenTimer: number = 0;
  private summonCount: number = 0;
  private summonMax: number = 2;
  private summonCooldown: number = 0;

  constructor(player: IPlayer, monster: IMonster) {
    this.player = { ...player };
    this.monster = { ...monster, hp: monster.maxHp, realm: monster.realm ?? 0 };

    // 应用天赋属性加成
    const talentBonuses = TalentStatsCalculator.calculateBonuses(player);
    this.player.attack = Math.floor(this.player.attack * (1 + talentBonuses.attackPct / 100));
    this.player.defense = Math.floor(this.player.defense * (1 + talentBonuses.defensePct / 100));
    this.player.speed = Math.floor(this.player.speed * (1 + talentBonuses.speedPct / 100));
    this.player.critRate = this.player.critRate + talentBonuses.critRatePct;
    this.player.maxHp = Math.floor(this.player.maxHp * (1 + talentBonuses.maxHpPct / 100));
    this.player.maxMana = Math.floor(this.player.maxMana * (1 + talentBonuses.maxManaPct / 100));
    // 保持当前血量比例
    if (player.hp > 0 && player.maxHp > 0) {
      this.player.hp = Math.min(this.player.maxHp, Math.floor(this.player.maxHp * player.hp / player.maxHp));
    }
    if (player.mana > 0 && player.maxMana > 0) {
      this.player.mana = Math.min(this.player.maxMana, Math.floor(this.player.maxMana * player.mana / player.maxMana));
    }

    if (this.monster.aiType === 'shield') {
      this.shieldMaxHp = Math.floor(this.monster.maxHp * 0.25);
      this.shieldHp = this.shieldMaxHp;
    }

    this.playerRage = {
      current: 0,
      max: RAGE_CONFIG.baseMax + player.realm * RAGE_CONFIG.perLevelBonus,
      overflow: 0,
      isEnraged: false,
      enragedTurns: 0,
    };
    
    this.monsterRage = {
      current: 0,
      max: RAGE_CONFIG.baseMax + monster.level * RAGE_CONFIG.perLevelBonus,
      overflow: 0,
      isEnraged: false,
      enragedTurns: 0,
    };
  }

  get ended(): boolean { return this._ended; }
  get currentRound(): number { return this.round; }

  public playerAction(action: 'attack' | 'defend' | 'flee' | 'technique' | 'rage_skill', techId?: string, rageSkillId?: string): ICombatLog[] {
    if (this._ended) return [{ text: '战斗已经结束。', type: 'info' }];

    const logs: ICombatLog[] = [];
    const playerStunned = this.playerStatusEffects.some(e => e.type === 'stun');
    const playerFrozen = this.playerStatusEffects.some(e => e.type === 'freeze');

    if (playerStunned) {
      logs.push({ text: '你被眩晕了，无法行动！', type: 'info' });
      this.round++;
      this.processStatusEffects(logs);
      this.monsterTurn(logs);
      return logs;
    }

    if (playerFrozen) {
      logs.push({ text: '你被冻结了，行动迟缓！', type: 'info' });
    }

    this.round++;

    const realmDiff = calculateRealmDifference(this.player.realm, this.monster.realm ?? 0);
    const playerAdvantage = getAdvantageEffect(realmDiff);
    const monsterSuppression = getSuppressionEffect(realmDiff);

    if (playerAdvantage && this.round === 1) {
      logs.push({ text: `【境界压制】${playerAdvantage.description}`, type: 'buff' });
    }
    if (monsterSuppression && this.round === 1) {
      logs.push({ text: `【境界压制】${monsterSuppression.description}`, type: 'buff' });
    }

    if (action === 'attack') {
      this.playerCombo++;
      const isComboCrit = this.playerCombo >= 3;
      const baseCritChance = this.player.critRate || 5;
      const isCrit = isComboCrit || Math.random() * 100 < baseCritChance;
      
      let dmg = this.calcDamage(this.player.attack + this.tempAttack, this.monster.defense);
      
      if (isCrit) {
        const critMultiplier = isComboCrit ? 2.0 : 1.5;
        dmg = Math.floor(dmg * critMultiplier);
        const rageResult = addRage(this.playerRage, RAGE_CONFIG.attackGain + (isComboCrit ? 10 : 5));
        if (rageResult.enraged) {
          logs.push({ text: '【怒气爆发！】你进入狂暴状态！', type: 'special' });
        }
        this.applyMonsterDamage(dmg, logs, AttributeType.FIRE);
        if (isComboCrit) {
          logs.push({ text: `你连击破绽！一记重击贯穿${this.monster.name}，造成 **${dmg} 点暴击伤害**！`, type: 'damage' });
          this.playerCombo = 0;
        } else {
          logs.push({ text: `你精准命中要害！暴击！造成 **${dmg} 点暴击伤害**！`, type: 'damage' });
        }
      } else {
        const rageResult = addRage(this.playerRage, RAGE_CONFIG.attackGain);
        this.applyMonsterDamage(dmg, logs, AttributeType.FIRE);
        const hint = this.playerCombo === 2 ? '（破绽将成！）' : '';
        logs.push({ text: `你挥拳猛击${this.monster.name}，造成 **${dmg} 点伤害**${hint}。`, type: 'damage' });
      }
    } else if (action === 'technique' && techId) {
      const tech = this.player.techniques.find(t => t.id === techId);
      const cd = this.playerCooldowns.get(techId) || 0;
      if (cd > 0) {
        logs.push({ text: `「${tech?.name || '此宝术'}」冷却中，还需 ${cd} 回合。`, type: 'info' });
        return logs;
      }
      if (tech && this.player.mana >= tech.manaCost) {
        let dmg = this.calcTechDamage(tech, this.player.attack + this.tempAttack, this.monster.defense);
        
        if (this.playerRage.isEnraged) {
          dmg = Math.floor(dmg * 1.3);
          logs.push({ text: '【狂暴加成】伤害提升！', type: 'buff' });
        }
        
        const techAttr = tech.attribute || AttributeType.FIRE;
        const monsterAttr = this.monster.attribute || AttributeType.FIRE;
        
        this.applyMonsterDamage(dmg, logs, techAttr, monsterAttr);
        
        this.player.mana -= tech.manaCost;
        this.playerTechniqueHistory.push(tech.id);
        if (tech.cooldown > 0) {
          this.playerCooldowns.set(tech.id, tech.cooldown);
        }
        
        if (this.playerTechniqueHistory.length > 5) {
          this.playerTechniqueHistory.shift();
        }
        
        const comboChain = checkComboChain([tech.id], this.playerTechniqueHistory);
        if (comboChain) {
          const comboDmg = Math.floor(dmg * comboChain.damageMultiplier);
          this.monster.hp -= comboDmg;
          logs.push({ text: `【连击技！${comboChain.name}】造成 **${comboDmg} 点额外伤害**！`, type: 'special' });
          addRage(this.playerRage, comboChain.rageGain);
          
          if (comboChain.specialEffect) {
            this.monsterStatusEffects.push({
              type: comboChain.specialEffect.type,
              duration: comboChain.specialEffect.duration,
              value: comboChain.specialEffect.value,
              source: comboChain.name,
            });
            logs.push({ text: `${this.monster.name}陷入${this.getEffectName(comboChain.specialEffect.type)}状态！`, type: 'buff' });
          }
        }
        
        logs.push({ text: `你施展 **${tech.name}**，${this.monster.name}受到 **${dmg} 点伤害**。`, type: 'damage' });
        
        if (tech.effect?.type === 'burn') {
          this.monsterStatusEffects.push({ type: 'burn', duration: (tech.effect as any).duration || 3, value: tech.effect.value || 5 });
          logs.push({ text: `${this.monster.name}被烈焰灼烧，每回合将失去额外气血。`, type: 'buff' });
        } else if (tech.effect?.type === 'freeze') {
          this.monsterStatusEffects.push({ type: 'freeze', duration: (tech.effect as any).duration || 2, value: tech.effect.value || 1 });
          logs.push({ text: `${this.monster.name}被寒霜冻结，行动受阻！`, type: 'buff' });
        } else if (tech.effect?.type === 'stun') {
          this.monsterStatusEffects.push({ type: 'stun', duration: (tech.effect as any).duration || 1, value: tech.effect.value || 1 });
          logs.push({ text: `${this.monster.name}被震慑，眩晕无法行动！`, type: 'buff' });
        } else if (tech.effect?.type === 'heal') {
          const heal = tech.effect.value;
          this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
          logs.push({ text: `你汲取了生命之力，恢复 **${heal} 点气血**。`, type: 'heal' });
        } else if (tech.effect?.type === 'lifesteal') {
          const steal = Math.floor(dmg * tech.effect.value / 100);
          this.player.hp = Math.min(this.player.maxHp, this.player.hp + steal);
          logs.push({ text: `你吸取了 ${this.monster.name} 的生命精气，恢复 **${steal} 点气血**。`, type: 'heal' });
        } else if (tech.effect?.type === 'shield') {
          this.playerStatusEffects.push({ type: 'shield', duration: (tech.effect as any).duration || 3, value: tech.effect.value });
          logs.push({ text: `你周身浮现护体灵光，获得 **${tech.effect.value} 点护盾**！`, type: 'buff' });
        } else if (tech.effect?.type === 'mana_restore') {
          const restore = tech.effect.value;
          this.player.mana = Math.min(this.player.maxMana, this.player.mana + restore);
          logs.push({ text: `你运转功法，恢复 **${restore} 点法力**。`, type: 'buff' });
        } else if (tech.effect?.type === 'buff') {
          this.tempAttack += tech.effect.value;
          logs.push({ text: `你气势暴涨，攻击力提升 **${tech.effect.value}**！`, type: 'buff' });
        }
        
        addRage(this.playerRage, RAGE_CONFIG.skillGain);
      } else if (!tech) {
        logs.push({ text: '你未掌握此宝术。', type: 'info' });
        return logs;
      } else {
        logs.push({ text: '法力不足，无法施展此宝术。', type: 'info' });
        return logs;
      }
    } else if (action === 'rage_skill' && rageSkillId) {
      const rageSkill = RAGE_SKILLS.find(s => s.id === rageSkillId);
      if (!rageSkill) {
        logs.push({ text: '未知的怒气技能。', type: 'info' });
        return logs;
      }
      
      if (!consumeRage(this.playerRage, rageSkill.rageCost)) {
        logs.push({ text: `怒气不足，需要 ${rageSkill.rageCost} 点怒气。`, type: 'info' });
        return logs;
      }
      
      logs.push({ text: `你发动【${rageSkill.name}】！`, type: 'special' });
      
      if (rageSkill.damageMultiplier > 0) {
        const dmg = Math.floor(this.calcDamage(this.player.attack + this.tempAttack, this.monster.defense) * rageSkill.damageMultiplier);
        this.applyMonsterDamage(dmg, logs);
        logs.push({ text: `造成 **${dmg} 点伤害**！`, type: 'damage' });
      }
      
      if (rageSkill.effects) {
        for (const effect of rageSkill.effects) {
          if (effect.type === 'heal') {
            const heal = Math.floor(this.player.maxHp * effect.value / 100);
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
            logs.push({ text: `恢复 **${heal} 点气血**！`, type: 'heal' });
          } else if (effect.type === 'shield') {
            this.playerStatusEffects.push({ type: 'shield', duration: effect.duration, value: effect.value });
            logs.push({ text: `获得 **${effect.value} 点护盾**！`, type: 'buff' });
          } else if (effect.type === 'buff') {
            this.tempAttack += effect.value;
            logs.push({ text: `攻击力提升 **${effect.value}**！`, type: 'buff' });
          }
        }
      }
    } else if (action === 'defend') {
      this.tempDefense += 3;
      this.playerCombo = 0;
      logs.push({ text: '你摆出防御姿态，防御力暂时提升，连击中断。', type: 'buff' });
    } else if (action === 'flee') {
      const baseChance = 0.4 + this.player.speed * 0.02;
      const fleeChance = calculateEscapeChanceWithSuppression(this.player.realm, this.monster.realm ?? 0, baseChance);
      const success = Math.random() < fleeChance;
      if (success) {
        this._ended = true;
        logs.push({ text: '你成功逃脱了战斗！', type: 'special' });
        return logs;
      } else {
        logs.push({ text: '逃跑失败！', type: 'info' });
      }
    }

    this.processStatusEffects(logs);

    if (this.monster.hp <= 0) {
      this.monster.hp = 0;
      this._ended = true;
      logs.push({ text: `**${this.monster.name}** 轰然倒地！`, type: 'special' });
      return logs;
    }

    this.monsterTurn(logs);

    this.tempDefense = 0;
    this.tempAttack = 0;
    const enrageResult = tickEnrage(this.playerRage);
    if (enrageResult.ended) {
      logs.push({ text: '狂暴状态结束！', type: 'info' });
    }

    if (this.player.hp <= 0) {
      this.player.hp = 0;
      this._ended = true;
      logs.push({ text: '你被击败了...', type: 'special' });
    }

    return logs;
  }

  private processStatusEffects(logs: ICombatLog[]): void {
    this.tickCooldowns();
    
    this.playerStatusEffects = this.playerStatusEffects.filter(e => {
      if (e.type === 'burn') {
        const damage = e.value;
        this.player.hp -= damage;
        logs.push({ text: `灼烧伤害：-${damage} 气血`, type: 'damage' });
      } else if (e.type === 'poison') {
        const damage = e.value;
        this.player.hp -= damage;
        logs.push({ text: `毒素伤害：-${damage} 气血`, type: 'damage' });
      } else if (e.type === 'stun') {
        logs.push({ text: '眩晕中...', type: 'info' });
      } else if (e.type === 'freeze') {
        logs.push({ text: '冻结中...', type: 'info' });
      }
      
      e.duration--;
      return e.duration > 0;
    });

    this.monsterStatusEffects = this.monsterStatusEffects.filter(e => {
      if (e.type === 'burn') {
        const damage = e.value;
        this.monster.hp -= damage;
        logs.push({ text: `${this.monster.name}被灼烧：-${damage} 气血`, type: 'damage' });
      } else if (e.type === 'poison') {
        const damage = e.value;
        this.monster.hp -= damage;
        logs.push({ text: `${this.monster.name}中毒：-${damage} 气血`, type: 'damage' });
      } else if (e.type === 'stun') {
        logs.push({ text: `${this.monster.name}眩晕中...`, type: 'info' });
      } else if (e.type === 'freeze') {
        logs.push({ text: `${this.monster.name}冻结中...`, type: 'info' });
      }
      
      e.duration--;
      return e.duration > 0;
    });
  }

  private getEffectName(type: string): string {
    const names: Record<string, string> = {
      burn: '灼烧',
      freeze: '冻结',
      stun: '眩晕',
      poison: '中毒',
    };
    return names[type] || type;
  }

  private applyMonsterDamage(dmg: number, logs: ICombatLog[], attackAttr?: AttributeType, defenseAttr?: AttributeType): void {
    let finalDamage = dmg;
    let counterBonus = 0;
    let resisted = false;
    
    if (attackAttr) {
      const attrResult = calculateAttributeDamage(dmg, attackAttr, defenseAttr);
      finalDamage = attrResult.finalDamage;
      counterBonus = attrResult.counterBonus;
      resisted = attrResult.resisted;
      
      if (counterBonus > 0) {
        logs.push({ text: `【属性克制】额外造成 **${counterBonus} 点伤害**！`, type: 'damage' });
      }
      if (resisted) {
        logs.push({ text: `【属性抵抗】伤害被削弱！`, type: 'info' });
      }
    }

    if (this.monster.aiType === 'shield' && this.shieldState === 'up' && this.shieldHp > 0) {
      if (finalDamage <= this.shieldHp) {
        this.shieldHp -= finalDamage;
        logs.push({ text: `${this.monster.name}周身灵光护罩一颤，吸收了 ${finalDamage} 点伤害（余 ${this.shieldHp}）。`, type: 'buff' });
        if (this.shieldHp <= 0) {
          this.shieldState = 'broken';
          this.shieldRegenTimer = 3;
          logs.push({ text: `**灵光护罩碎裂！** ${this.monster.name}露出破绽！`, type: 'special' });
        }
        return;
      } else {
        const overflow = finalDamage - this.shieldHp;
        logs.push({ text: `${this.monster.name}灵光护罩被击碎！溢出 ${overflow} 点伤害透入本体。`, type: 'special' });
        this.shieldHp = 0;
        this.shieldState = 'broken';
        this.shieldRegenTimer = 3;
        this.monster.hp -= overflow;
        return;
      }
    }
    this.monster.hp -= finalDamage;
  }

  private monsterTurn(logs: ICombatLog[]): void {
    const ai = this.monster.aiType || 'normal';

    switch (ai) {
      case 'charge':
        this.chargeAITurn(logs);
        break;
      case 'summon':
        this.summonAITurn(logs);
        break;
      case 'shield':
        this.shieldAITurn(logs);
        break;
      default:
        this.normalAITurn(logs);
        break;
    }
  }

  private normalAITurn(logs: ICombatLog[]): void {
    const monsterStunned = this.monsterStatusEffects.some(e => e.type === 'stun');
    const monsterFrozen = this.monsterStatusEffects.some(e => e.type === 'freeze');
    
    if (monsterStunned) {
      logs.push({ text: `${this.monster.name}被眩晕了，无法行动！`, type: 'info' });
      return;
    }
    
    if (monsterFrozen) {
      logs.push({ text: `${this.monster.name}被冻结了，行动迟缓！`, type: 'info' });
      return;
    }

    this.monsterCombo++;
    let dmg = this.calcMonsterDamage();
    if (this.monsterCombo >= 3) {
      dmg = Math.floor(dmg * 1.8);
      logs.push({ text: `${this.monster.name}抓住你破绽！一记重击造成 **${dmg} 点伤害**！`, type: 'damage' });
      this.monsterCombo = 0;
    } else {
      logs.push({ text: `${this.monster.name}反扑，你受到 **${dmg} 点伤害**。`, type: 'damage' });
    }
    this.applyPlayerDamage(dmg, logs);
  }

  // ===== 蓄力型 AI：idle → charging（1-2回合） → 必杀 → stunned（1回合虚弱） → idle =====
  private chargeAITurn(logs: ICombatLog[]): void {
    const monsterStunned = this.monsterStatusEffects.some(e => e.type === 'stun');
    const monsterFrozen = this.monsterStatusEffects.some(e => e.type === 'freeze');
    
    if (monsterStunned) {
      logs.push({ text: `${this.monster.name}被眩晕了，蓄力被打断！`, type: 'info' });
      this.chargeState = 'idle';
      return;
    }
    
    if (monsterFrozen) {
      logs.push({ text: `${this.monster.name}被冻结了，无法蓄力！`, type: 'info' });
      return;
    }

    if (this.chargeState === 'charging') {
      this.chargeTurnsRemaining--;
      if (this.chargeTurnsRemaining <= 0) {
        const dmg = Math.floor(this.calcMonsterDamage() * 2.5);
        this.applyPlayerDamage(dmg, logs);
        logs.push({ text: `**${this.monster.name}蓄力完毕！** 爆发出毁灭性一击，造成 **${dmg} 点伤害**！`, type: 'special' });
        this.chargeState = 'stunned';
        return;
      } else {
        logs.push({ text: `${this.monster.name}仍在蓄力，气息越来越强...（还需 ${this.chargeTurnsRemaining} 回合）`, type: 'buff' });
        const dmg = Math.floor(this.calcMonsterDamage() * 0.5);
        this.applyPlayerDamage(dmg, logs);
        logs.push({ text: `${this.monster.name}随手一击，造成 **${dmg} 点伤害**。`, type: 'damage' });
        return;
      }
    }

    if (this.chargeState === 'stunned') {
      logs.push({ text: `${this.monster.name}必杀后气虚力竭，动作迟缓...（虚弱中）`, type: 'info' });
      const dmg = Math.floor(this.calcMonsterDamage() * 0.3);
      this.applyPlayerDamage(dmg, logs);
      logs.push({ text: `${this.monster.name}勉强反击，造成 **${dmg} 点伤害**。`, type: 'damage' });
      this.chargeState = 'idle';
      return;
    }

    this.monsterCombo++;
    let dmg = this.calcMonsterDamage();
    if (this.monsterCombo >= 3) {
      dmg = Math.floor(dmg * 1.8);
      logs.push({ text: `${this.monster.name}抓住你破绽！一记重击造成 **${dmg} 点伤害**！`, type: 'damage' });
      this.monsterCombo = 0;
    } else {
      logs.push({ text: `${this.monster.name}反扑，你受到 **${dmg} 点伤害**。`, type: 'damage' });
    }
    this.applyPlayerDamage(dmg, logs);

    const hpRatio = this.monster.hp / this.monster.maxHp;
    const chargeChance = hpRatio < 0.5 ? 0.4 : 0.2;
    if (Math.random() < chargeChance && this.round > 1) {
      this.chargeState = 'charging';
      this.chargeTurnsRemaining = 1 + Math.floor(Math.random() * 2);
      this.monsterCombo = 0;
      logs.push({ text: `**${this.monster.name}开始蓄力！** 周身气势暴涨，即将发动致命一击！`, type: 'special' });
    }
  }

  // ===== 召唤型 AI：召唤小怪 → 小怪攻击 → 冷却后再召唤 =====
  private summonAITurn(logs: ICombatLog[]): void {
    const monsterStunned = this.monsterStatusEffects.some(e => e.type === 'stun');
    const monsterFrozen = this.monsterStatusEffects.some(e => e.type === 'freeze');
    
    if (monsterStunned) {
      logs.push({ text: `${this.monster.name}被眩晕了，无法召唤！`, type: 'info' });
      return;
    }
    
    if (monsterFrozen) {
      logs.push({ text: `${this.monster.name}被冻结了，无法召唤！`, type: 'info' });
      return;
    }

    if (this.summonCooldown > 0) this.summonCooldown--;

    if (this.summonCooldown === 0 && this.summonCount < this.summonMax) {
      if (Math.random() < 0.4 || this.round === 1) {
        this.summonCount++;
        this.summonCooldown = 3;
        logs.push({ text: `${this.monster.name}张口一吐，召出一头小妖助战！（小妖 ×${this.summonCount}）`, type: 'special' });
        const minionDmg = Math.floor(this.calcMonsterDamage() * 0.3 * this.summonCount);
        if (minionDmg > 0) {
          this.applyPlayerDamage(minionDmg, logs);
          logs.push({ text: `小妖群起攻之，造成 **${minionDmg} 点伤害**。`, type: 'damage' });
        }
        return;
      }
    }

    this.monsterCombo++;
    let dmg = this.calcMonsterDamage();
    if (this.monsterCombo >= 3) {
      dmg = Math.floor(dmg * 1.8);
      logs.push({ text: `${this.monster.name}抓住你破绽！一记重击造成 **${dmg} 点伤害**！`, type: 'damage' });
      this.monsterCombo = 0;
    } else {
      logs.push({ text: `${this.monster.name}反扑，你受到 **${dmg} 点伤害**。`, type: 'damage' });
    }
    this.applyPlayerDamage(dmg, logs);

    if (this.summonCount > 0) {
      const minionDmg = Math.floor(this.monster.attack * 0.15 * this.summonCount);
      this.applyPlayerDamage(minionDmg, logs);
      logs.push({ text: `小妖趁乱骚扰，额外造成 **${minionDmg} 点伤害**。`, type: 'damage' });
    }
  }

  // ===== 护盾型 AI：护盾 → 被打碎 → 爆发 → 再生护盾 =====
  private shieldAITurn(logs: ICombatLog[]): void {
    const monsterStunned = this.monsterStatusEffects.some(e => e.type === 'stun');
    const monsterFrozen = this.monsterStatusEffects.some(e => e.type === 'freeze');
    
    if (monsterStunned) {
      logs.push({ text: `${this.monster.name}被眩晕了，无法行动！`, type: 'info' });
      return;
    }
    
    if (monsterFrozen) {
      logs.push({ text: `${this.monster.name}被冻结了，行动迟缓！`, type: 'info' });
      return;
    }

    if (this.shieldState === 'broken') {
      this.shieldRegenTimer--;
      if (this.shieldRegenTimer <= 0) {
        const burstDmg = Math.floor(this.calcMonsterDamage() * 2.0);
        this.applyPlayerDamage(burstDmg, logs);
        logs.push({ text: `**${this.monster.name}灵光一震！** 趁护盾再生前爆发出全力一击，造成 **${burstDmg} 点伤害**！`, type: 'special' });

        this.shieldState = 'up';
        this.shieldHp = this.shieldMaxHp;
        this.monsterCombo = 0;
        logs.push({ text: `${this.monster.name}周身灵光再次凝聚，护罩重现！（${this.shieldHp}）`, type: 'buff' });
        return;
      }
    }

    this.monsterCombo++;
    let dmg = this.calcMonsterDamage();
    if (this.shieldState === 'up') {
      dmg = Math.floor(dmg * 0.7);
    } else {
      dmg = Math.floor(dmg * 1.2);
    }
    if (this.monsterCombo >= 3) {
      dmg = Math.floor(dmg * 1.8);
      logs.push({ text: `${this.monster.name}抓住你破绽！一记重击造成 **${dmg} 点伤害**！`, type: 'damage' });
      this.monsterCombo = 0;
    } else {
      logs.push({ text: `${this.monster.name}反扑，你受到 **${dmg} 点伤害**。`, type: 'damage' });
    }
    this.applyPlayerDamage(dmg, logs);
  }

  public quickResolve(): { win: boolean; hpLost: number; expGain: number } {
    // 已废弃：原实现跳过掉落、宝术、死亡流程，造成收益/惩罚不一致。
    // 改为仅当玩家攻击力 3 倍碾压时强制胜利，并按完整流程结算。
    const powerRatio = this.player.attack / Math.max(1, this.monster.attack);
    if (powerRatio < 3) {
      // 非碾压场景不快速结算
      return { win: false, hpLost: 0, expGain: 0 };
    }
    // 碾压结算：怪物直接死亡，玩家仅受轻微伤害
    this.monster.hp = 0;
    const hpLost = Math.floor(this.monster.attack * 0.1);
    this.player.hp = Math.max(1, this.player.hp - hpLost);
    this._ended = true;
    return { win: true, hpLost, expGain: this.monster.expValue };
  }

  private calcDamage(attack: number, defense: number): number {
    const base = Math.max(1, attack - defense * 0.5);
    const random = 0.85 + Math.random() * 0.3;
    return Math.floor(base * random);
  }

  private calcTechDamage(tech: ITechnique, attack: number, defense: number): number {
    const base = attack * (tech.baseDamage / 100) + tech.proficiency * 0.5;
    return this.calcDamage(base, defense);
  }

  private calcMonsterDamage(): number {
    const realmDiff = calculateRealmDifference(this.player.realm, this.monster.realm ?? 0);
    const suppression = getSuppressionEffect(realmDiff);
    
    let attack = this.monster.attack;
    if (suppression) {
      attack = Math.floor(attack * (1 - suppression.attackPenalty / 100));
    }
    
    const base = Math.max(1, attack - (this.player.defense + this.tempDefense) * 0.3);
    const random = 0.8 + Math.random() * 0.4;
    return Math.floor(base * random);
  }

  private applyPlayerDamage(dmg: number, logs: ICombatLog[]): void {
    const shieldEffect = this.playerStatusEffects.find(e => e.type === 'shield');
    if (shieldEffect) {
      if (dmg <= shieldEffect.value) {
        shieldEffect.value -= dmg;
        logs.push({ text: `护盾吸收了 ${dmg} 点伤害（余 ${shieldEffect.value}）`, type: 'buff' });
        if (shieldEffect.value <= 0) {
          this.playerStatusEffects = this.playerStatusEffects.filter(e => e !== shieldEffect);
          logs.push({ text: '护盾破碎！', type: 'info' });
        }
        return;
      } else {
        const remaining = dmg - shieldEffect.value;
        logs.push({ text: `护盾破碎！吸收了 ${shieldEffect.value} 点伤害，剩余 ${remaining} 点透入本体`, type: 'special' });
        this.playerStatusEffects = this.playerStatusEffects.filter(e => e !== shieldEffect);
        this.player.hp -= remaining;
        addRage(this.playerRage, RAGE_CONFIG.damageTakenGain);
        return;
      }
    }
    
    this.player.hp -= dmg;
    addRage(this.playerRage, RAGE_CONFIG.damageTakenGain);
  }

  private tickCooldowns(): void {
    const toDelete: string[] = [];
    this.playerCooldowns.forEach((cd, id) => {
      const newCd = cd - 1;
      if (newCd <= 0) {
        toDelete.push(id);
      } else {
        this.playerCooldowns.set(id, newCd);
      }
    });
    toDelete.forEach(id => this.playerCooldowns.delete(id));

    const monsterToDelete: string[] = [];
    this.monsterCooldowns.forEach((cd, id) => {
      const newCd = cd - 1;
      if (newCd <= 0) {
        monsterToDelete.push(id);
      } else {
        this.monsterCooldowns.set(id, newCd);
      }
    });
    monsterToDelete.forEach(id => this.monsterCooldowns.delete(id));
  }

  public getTechniqueCooldown(techId: string): number {
    return this.playerCooldowns.get(techId) || 0;
  }

  public getAllPlayerCooldowns(): Record<string, number> {
    const result: Record<string, number> = {};
    this.playerCooldowns.forEach((cd, id) => {
      result[id] = cd;
    });
    return result;
  }

  public isTechniqueReady(techId: string): boolean {
    return (this.playerCooldowns.get(techId) || 0) <= 0;
  }
}