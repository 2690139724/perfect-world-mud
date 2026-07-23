import { ICommandHandler, ICommandContext } from './CommandRouter';
import { ITalent, TALENTS, findTalent, applyTalentEffects } from '../../domain/entities/Talent';
import { CultivationRealm, RealmNames } from '../../domain/entities/Player';
import { TalentService, TALENT_EVOLUTIONS } from '../../domain/services/TalentService';
import { getTalent } from '../../data/talents/talent_data';

export class TalentCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['talent', '天赋', '体质', '血脉', '查看天赋', '觉醒天赋', '进化天赋', '天赋进化', '天赋组合', '天赋详情', '夺回天赋'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;

    if (action === 'talent' || action === '天赋' || action === '查看天赋') {
      this.showTalents(store, narrative, modalManager);
    } else if (action === '觉醒天赋') {
      this.awakenTalent(store, narrative, args);
    } else if (action === '进化天赋' || action === '天赋进化') {
      this.evolveTalent(store, narrative, args, modalManager);
    } else if (action === '天赋组合') {
      this.showCombinations(store, narrative, modalManager);
    } else if (action === '天赋详情') {
      this.showTalentDetail(store, narrative, args, modalManager);
    } else if (action === '夺回天赋') {
      this.showStolenTalents(store, narrative);
    }
  }

  private showTalents(store: any, narrative: any, modalManager: any): void {
    const player = store.getState().player;
    const ownedTalents = player.talentIds || [];
    const effects = applyTalentEffects(ownedTalents);

    const rarityLabels: Record<string, string> = {
      common: '普通',
      rare: '稀有',
      epic: '史诗',
      legendary: '传说',
      myth: '神话',
    };

    const typeNames: Record<string, string> = {
      innate: '先天',
      physique: '体质',
      soul: '神魂',
      bloodline: '血脉',
      special: '特殊',
    };

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【天赋】' });
      if (ownedTalents.length > 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '已觉醒天赋：' });
        const talentItems = ownedTalents.map((id: string) => {
          const talent = findTalent(id);
          if (!talent) return null;
          return {
            label: `${talent.name}（${rarityLabels[talent.rarity]}·${typeNames[talent.type]}）`,
            action: `天赋详情 ${talent.id}`,
            desc: talent.description,
          };
        }).filter(Boolean);
        narrative.pushClickableList('已觉醒天赋', talentItems);
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你尚未觉醒任何天赋。' });
      }
      if (effects.expBonus > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `天赋总效果：修炼速度+${(effects.expBonus * 100).toFixed(0)}%` });
      if (effects.attackBonus > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `天赋总效果：攻击力+${effects.attackBonus}` });
      if (effects.defenseBonus > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `天赋总效果：防御力+${effects.defenseBonus}` });
      if (effects.hpBonus > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `天赋总效果：气血上限+${effects.hpBonus}` });
      if (effects.manaBonus > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `天赋总效果：法力上限+${effects.manaBonus}` });
      if (effects.speedBonus > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `天赋总效果：速度+${effects.speedBonus}` });
      if (effects.critBonus > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `天赋总效果：暴击率+${(effects.critBonus * 100).toFixed(0)}%` });
      if (effects.spiritBonus > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `天赋总效果：灵气感知+${(effects.spiritBonus * 100).toFixed(0)}%` });
      this.showAwakeningGuide(store, narrative);
      return;
    }

    modalManager.showInteractive('天赋系统', (container: HTMLElement) => {
      if (effects.expBonus > 0 || effects.attackBonus > 0 || effects.defenseBonus > 0 || effects.hpBonus > 0 || effects.manaBonus > 0 || effects.speedBonus > 0 || effects.critBonus > 0 || effects.spiritBonus > 0) {
        const effectsHeader = document.createElement('div');
        effectsHeader.className = 'talent-effects';
        const effectLines: string[] = [];
        if (effects.expBonus > 0) effectLines.push(`修炼速度+${(effects.expBonus * 100).toFixed(0)}%`);
        if (effects.attackBonus > 0) effectLines.push(`攻击力+${effects.attackBonus}`);
        if (effects.defenseBonus > 0) effectLines.push(`防御力+${effects.defenseBonus}`);
        if (effects.hpBonus > 0) effectLines.push(`气血上限+${effects.hpBonus}`);
        if (effects.manaBonus > 0) effectLines.push(`法力上限+${effects.manaBonus}`);
        if (effects.speedBonus > 0) effectLines.push(`速度+${effects.speedBonus}`);
        if (effects.critBonus > 0) effectLines.push(`暴击率+${(effects.critBonus * 100).toFixed(0)}%`);
        if (effects.spiritBonus > 0) effectLines.push(`灵气感知+${(effects.spiritBonus * 100).toFixed(0)}%`);
        effectsHeader.innerHTML = `<div class="talent-effects-title">天赋总效果</div><div class="talent-effects-list">${effectLines.join(' | ')}</div>`;
        container.appendChild(effectsHeader);
      }

      const ownedSection = document.createElement('div');
      ownedSection.className = 'talent-section';
      ownedSection.innerHTML = '<div class="talent-section-title">✨ 已觉醒天赋</div>';

      if (ownedTalents.length > 0) {
        const ownedGrid = document.createElement('div');
        ownedGrid.className = 'talent-grid';

        for (const id of ownedTalents) {
          const talent = findTalent(id);
          if (!talent) continue;

          const talentCard = document.createElement('div');
          talentCard.className = 'talent-card';
          talentCard.innerHTML = `
            <div class="talent-icon">⭐</div>
            <div class="talent-info">
              <div class="talent-name">${talent.name}${talent.stealable ? '<span class="talent-stealable">可被夺</span>' : ''}</div>
              <div class="talent-type">${rarityLabels[talent.rarity]} · ${typeNames[talent.type]}</div>
              <div class="talent-desc">${talent.description}</div>
              <div class="talent-condition">${talent.effects.map((e: any) => e.description).join('、')}</div>
            </div>
          `;
          ownedGrid.appendChild(talentCard);
        }
        ownedSection.appendChild(ownedGrid);
      } else {
        ownedSection.innerHTML += '<div class="modal-empty">尚未觉醒任何天赋</div>';
      }
      container.appendChild(ownedSection);

      this.showAwakeningGuide(store, narrative, modalManager, container);
    }, { width: '650px', height: '500px' });
  }

  private showAwakeningGuide(store: any, narrative: any, modalManager?: any, container?: HTMLElement): void {
    const player = store.getState().player;
    const ownedIds = player.talentIds || [];

    const availableTalents = TALENTS.filter(t =>
      !ownedIds.includes(t.id) && (t.requiredRealm ?? 0) <= player.realm
    );

    const rarityLabels: Record<string, string> = {
      common: '普通',
      rare: '稀有',
      epic: '史诗',
      legendary: '传说',
      myth: '神话',
    };

    const typeNames: Record<string, string> = {
      innate: '先天',
      physique: '体质',
      soul: '神魂',
      bloodline: '血脉',
      special: '特殊',
    };

    if (!modalManager) {
      if (availableTalents.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n当前境界无可觉醒的天赋。' });
        return;
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n可觉醒天赋：' });
      const talentItems = availableTalents.map(talent => {
        const canAwaken = this.checkAwakenCondition(player, talent);
        return {
          label: `${talent.name}（${rarityLabels[talent.rarity]}·${typeNames[talent.type]}）${canAwaken ? '【可觉醒】' : ''}`,
          action: canAwaken ? `觉醒天赋 ${talent.id}` : '',
          desc: `${talent.description}\n觉醒条件：${talent.awakenCondition}`,
          disabled: !canAwaken,
        };
      });
      narrative.pushClickableList('可觉醒天赋', talentItems);
      return;
    }

    if (!container) return;

    if (availableTalents.length === 0) return;

    const availableSection = document.createElement('div');
    availableSection.className = 'talent-section';
    availableSection.innerHTML = '<div class="talent-section-title">💫 可觉醒天赋</div>';

    const availableGrid = document.createElement('div');
    availableGrid.className = 'talent-grid';

    for (const talent of availableTalents) {
      const canAwaken = this.checkAwakenCondition(player, talent);

      const talentCard = document.createElement('div');
      talentCard.className = `talent-card ${canAwaken ? '' : 'disabled'}`;
      talentCard.innerHTML = `
        <div class="talent-icon">${canAwaken ? '🌟' : '⭐'}</div>
        <div class="talent-info">
          <div class="talent-name">${talent.name} ${canAwaken ? '<span class="talent-awakenable">可觉醒</span>' : ''}</div>
          <div class="talent-type">${rarityLabels[talent.rarity]} · ${typeNames[talent.type]}</div>
          <div class="talent-desc">${talent.description}</div>
          <div class="talent-condition">觉醒条件：${talent.awakenCondition}</div>
        </div>
      `;

      if (canAwaken) {
        const btn = document.createElement('button');
        btn.className = 'modal-btn modal-btn-primary';
        btn.textContent = '觉醒';
        btn.addEventListener('click', () => {
          modalManager.close();
          this.awakenTalent(store, narrative, [talent.id]);
        });
        talentCard.appendChild(btn);
      }

      availableGrid.appendChild(talentCard);
    }

    availableSection.appendChild(availableGrid);
    container.appendChild(availableSection);
  }

  private checkAwakenCondition(player: any, talent: ITalent): boolean {
    if (!talent.awakenCondition) return false;

    switch (talent.id) {
      case 'talent_shengti_daoji':
        return player.realm === CultivationRealm.MORTAL;
      case 'talent_ba_ti':
        return player.realm === CultivationRealm.MORTAL;
      case 'talent_huang_ti':
        return player.killedMonsters.length >= 10;
      case 'talent_bu_mie':
        return player.hp <= player.maxHp * 0.1;
      case 'talent_long_xue':
        return player.inventory.some((item: any) => item.id === 'dragon_blood');
      case 'talent_kunpeng_xue':
        return player.techniqueIds.some((id: string) => id.includes('kunpeng'));
      case 'talent_dao_xing':
        return player.techniqueIds.length >= 1;
      case 'talent_shenyuan':
        return (player.discoveredZones || []).length >= 10;
      case 'talent_bu_si':
        return player.killedMonsters.length >= 100;
      case 'talent_huang_gu':
        return player.killedMonsters.length >= 50;
      default:
        return false;
    }
  }

  private awakenTalent(store: any, narrative: any, args: string[]): void {
    const player = store.getState().player;
    const talentId = args[0];

    if (!talentId) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请指定要觉醒的天赋！' });
      return;
    }

    const talent = findTalent(talentId);
    if (!talent) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未找到天赋：${talentId}` });
      return;
    }

    const ownedIds = player.talentIds || [];
    if (ownedIds.includes(talentId)) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${talent.name}已经觉醒！` });
      return;
    }

    if ((talent.requiredRealm ?? 0) > player.realm) {
      const realmName = talent.requiredRealm !== undefined ? RealmNames[talent.requiredRealm as CultivationRealm] : '';
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `境界不足！需要${realmName}才能觉醒。` });
      return;
    }

    if (!this.checkAwakenCondition(player, talent)) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未满足觉醒条件：${talent.awakenCondition}` });
      return;
    }

    player.talentIds = [...ownedIds, talentId];
    talent.isAwakened = true;

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n━━━━━━━━━━━━━━━━━━━━' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `天赋觉醒：${talent.name}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '━━━━━━━━━━━━━━━━━━━━' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: talent.originStory });

    const e = applyTalentEffects([talent.id]);
    if (e.expBonus) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `修炼速度提升 ${(e.expBonus * 100).toFixed(0)}%` });
    }
    if (e.attackBonus) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `攻击力提升 ${e.attackBonus}` });
    }
    if (e.defenseBonus) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `防御力提升 ${e.defenseBonus}` });
    }
    if (e.hpBonus) {
      player.maxHp += e.hpBonus;
      player.hp += e.hpBonus;
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `气血上限提升 ${e.hpBonus}` });
    }
    if (e.manaBonus) {
      player.maxMana += e.manaBonus;
      player.mana += e.manaBonus;
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `法力上限提升 ${e.manaBonus}` });
    }
    if (e.speedBonus) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `速度提升 ${e.speedBonus}` });
    }
    if (e.critBonus) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `暴击率提升 ${(e.critBonus * 100).toFixed(0)}%` });
    }
    if (e.spiritBonus) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `灵气感知提升 ${(e.spiritBonus * 100).toFixed(0)}%` });
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    // 检查天赋组合共鸣
    const activeCombos = TalentService.checkTalentCombinations(player);
    if (activeCombos.length > 0) {
      for (const combo of activeCombos) {
        // Only notify for new combos
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n✦ 天赋组合共鸣激活：${combo.name}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${combo.description}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `共鸣效果：${combo.combinedEffect.map(e => e.description).join('、')}` });
      }
    }

    const actions = [
      { label: '查看天赋', action: '天赋', desc: '查看所有天赋' },
      { label: '查看状态', action: '状态', desc: '查看角色状态' },
    ];
    narrative.pushClickableList('天赋觉醒成功', actions);
  }

  private evolveTalent(store: any, narrative: any, args: string[], modalManager?: any): void {
    const player = store.getState().player;
    const talentId = args[0];

    if (!talentId) {
      // Show list of evolvable talents
      const evolvableIds = Object.keys(TALENT_EVOLUTIONS);
      const owned = player.talentIds.filter((id: string) =>
        evolvableIds.some(eid => id === eid || id.startsWith(eid + '_'))
      );

      if (owned.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你没有可进化的天赋。' });
        return;
      }

      const items = owned.map((id: string) => {
        const baseId = id.split('_')[0] === 'supreme' ? 'supreme_bone' :
                       id.split('_')[0] === 'double' ? 'double_pupils' :
                       id.split('_')[0] === 'chaos' ? 'chaos_body' : id;
        const talent = getTalent(baseId);
        const stage = TalentService.getCurrentEvolutionStage(player, baseId);
        const stageName = TalentService.getStageName(stage);
        return {
          label: `${talent?.name || id}（${stageName}）`,
          action: `进化天赋 ${baseId}`,
          desc: `当前阶段：${stageName} | 点击查看进化条件`,
        };
      });
      narrative.pushClickableList('可进化天赋', items);
      return;
    }

    const result = TalentService.evolveTalent(player, talentId);
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: result.message });

    if (result.success && result.evolvedTalent) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `进化后效果：${result.evolvedTalent.effects.map(e => e.description).join('、')}` });
      store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
    }
  }

  private showCombinations(store: any, narrative: any, modalManager?: any): void {
    const player = store.getState().player;
    const activeCombos = TalentService.checkTalentCombinations(player);

    if (activeCombos.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '未激活任何天赋组合共鸣。' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '收集特定天赋组合可激活共鸣效果，获得额外属性加成。' });
      return;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【天赋组合共鸣】' });
    for (const combo of activeCombos) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ ${combo.name}：${combo.description}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `  效果：${combo.combinedEffect.map(e => e.description).join('、')}` });
    }
  }

  private showTalentDetail(store: any, narrative: any, args: string[], modalManager?: any): void {
    const talentId = args[0];
    if (!talentId) return;

    const talent = getTalent(talentId);
    if (!talent) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未找到天赋：${talentId}` });
      return;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【${talent.name}】` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `类型：${this.getTypeName(talent.type)} | 品阶：${this.getRarityName(talent.rarity)}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `描述：${talent.description}` });
    if (talent.originStory) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `来历：${talent.originStory}` });
    }
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `效果：${talent.effects.map(e => e.description).join('、')}` });

    // Check if evolvable
    const baseId = talentId.split('_')[0] === 'supreme' ? 'supreme_bone' :
                   talentId.split('_')[0] === 'double' ? 'double_pupils' :
                   talentId.split('_')[0] === 'chaos' ? 'chaos_body' : talentId;
    if (TALENT_EVOLUTIONS[baseId]) {
      const player = store.getState().player;
      const stage = TalentService.getCurrentEvolutionStage(player, baseId);
      const stageName = TalentService.getStageName(stage);
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `进化阶段：${stageName}` });

      const evolutions = TALENT_EVOLUTIONS[baseId];
      const nextStage = TalentService.getNextStage(stage);
      const nextEvo = evolutions.find(e => e.stage === nextStage);
      if (nextEvo) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `下一阶段：${TalentService.getStageName(nextStage)}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `需要境界：${nextEvo.requirements.minRealm} | 金币：${nextEvo.requirements.goldCost}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `进化效果：${nextEvo.enhancedEffects.map(e => e.description).join('、')}` });

        if (player.realm >= nextEvo.requirements.minRealm && player.gold >= nextEvo.requirements.goldCost) {
          const items = [{
            label: `进化至${TalentService.getStageName(nextStage)}`,
            action: `进化天赋 ${baseId}`,
            desc: `消耗金币${nextEvo.requirements.goldCost}进行进化`,
          }];
          narrative.pushClickableList('可进化', items);
        }
      }
    }

    // Check if stealable
    if (talent.stealable) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '⚠ 此天赋可被强敌觊觎抢夺，需谨慎防范。' });
    }
  }

  private showStolenTalents(store: any, narrative: any): void {
    const player = store.getState().player;
    const stolenInfo = (player as any).stolenTalentInfo;

    if (!stolenInfo) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你没有被抢夺的天赋。' });
      return;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【被夺天赋】` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${stolenInfo.talentName} 被 ${stolenInfo.thiefName} 夺走。` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `需要找到并击败 ${stolenInfo.thiefName} 才能夺回。` });

    const items = [{
      label: `追踪 ${stolenInfo.thiefName}`,
      action: '追踪仇敌',
      desc: `消耗大量金币追踪仇敌踪迹`,
    }];
    narrative.pushClickableList('复仇', items);
  }

  private getRarityName(rarity: string): string {
    const labels: Record<string, string> = {
      common: '凡品', rare: '稀有', epic: '史诗', legendary: '传说', myth: '神话',
    };
    return labels[rarity] || rarity;
  }

  private getTypeName(type: string): string {
    const labels: Record<string, string> = {
      innate: '先天', physique: '体质', soul: '神魂', bloodline: '血脉', special: '特殊',
    };
    return labels[type] || type;
  }
}
