import { IPlayer } from '../entities/Player';
import { IRoom, TerrainType } from '../entities/Room';
import { getMethod, ICultivationMethod, ENLIGHTENMENT_OBSCURE_WORDS, AcquireType, getAllMethods } from '../../data/methods/method_data';
import { MethodService } from './MethodService';
import { IMeridian, MeridianType, MERIDIAN_CONFIG, canUnlockMeridian, getMeridianUnlockCost, calculateMeridianEffects } from '../entities/MeridianSystem';
import { ISpiritTide, TideType, TIDE_CONFIG, isTideActive } from '../entities/SpiritTide';
import { TalentStatsCalculator } from './TalentStatsCalculator';

export enum CultivationMode {
  MEDITATE = '静坐',
  BREATHE = '吐纳',
  PUSH = '冲关',
  MERIDIAN = '通脉',
}

export interface ICultivationResult {
  expGain: number;
  manaCost: number;
  manaRecovery: number;
  messages: string[];
  eventType: 'none' | 'insight' | 'deviation';
  eventMessage?: string;
  envBonus?: number;
  envLabel?: string;
  proficiencyGain?: number;
  methodEvolved?: boolean;
  evolvedMethodName?: string;
  meridianOpened?: boolean;
  meridianName?: string;
  tideBonus?: number;
  /** 是否触发机缘获得功法 */
  destinyTriggered?: boolean;
  /** 机缘获得的功法ID */
  destinyMethodId?: string;
  /** 机缘获得的功法名称 */
  destinyMethodName?: string;
}

export interface IBottleneckInfo {
  exists: boolean;
  description: string;
  progress: number;
  maxProgress: number;
  requiredActions: string[];
}

export class CultivationService {
  /**
   * 根据灵气浓度返回环境评价
   */
  static getSpiritDensityLabel(density: number): { label: string; tier: number } {
    if (density >= 50) return { label: '仙灵之气', tier: 6 };
    if (density >= 30) return { label: '醇厚灵气', tier: 5 };
    if (density >= 18) return { label: '灵气充沛', tier: 4 };
    if (density >= 10) return { label: '灵气浓郁', tier: 3 };
    if (density >= 5) return { label: '灵气普通', tier: 2 };
    if (density >= 2) return { label: '灵气稀薄', tier: 1 };
    return { label: '灵气匮乏', tier: 0 };
  }

  /**
   * 计算地形属性加成（对应功法属性可额外增益）
   */
  static getTerrainBonus(terrain: TerrainType, isSafe: boolean): { pct: number; label: string } {
    let pct = 0;
    const labels: string[] = [];

    switch (terrain) {
      case TerrainType.MOUNTAIN:
      case TerrainType.CAVE:
        pct += 15; labels.push('土灵脉');
        break;
      case TerrainType.WATER:
        pct += 15; labels.push('水灵脉');
        break;
      case TerrainType.VOLCANO:
        pct += 20; labels.push('火灵脉');
        break;
      case TerrainType.FOREST:
        pct += 10; labels.push('木灵脉');
        break;
      case TerrainType.SNOW:
        pct += 12; labels.push('水灵脉');
        break;
      case TerrainType.DESERT:
        pct -= 10; labels.push('火燥之地');
        break;
      case TerrainType.SWAMP:
        pct -= 5; labels.push('浊气淤积');
        break;
      case TerrainType.RUIN:
        pct += 5; labels.push('古意残存');
        break;
      default:
        break;
    }

    if (isSafe) {
      pct += 10;
      labels.push('无扰之地');
    }

    return { pct, label: labels.join('、') };
  }

  /**
   * 检查玩家是否已修炼功法
   */
  static hasMethod(player: IPlayer): boolean {
    return !!player.currentMethodId;
  }

  static cultivate(player: IPlayer, room: IRoom, mode: CultivationMode, methodSpeedBonus: number = 1.0, currentTide?: ISpiritTide): ICultivationResult {
    const baseGain = room.spiritDensity * 0.5 + 2;
    const absorbMult = 1 + player.spiritAbsorbRate;
    const methodMult = methodSpeedBonus;
    const terrainInfo = this.getTerrainBonus(room.terrain, room.isSafeZone);
    const envMult = 1 + terrainInfo.pct / 100;

    let tideBonus = 1.0;
    let tideMessages: string[] = [];
    if (currentTide && isTideActive(currentTide, Date.now())) {
      const tideEffect = TIDE_CONFIG[currentTide.type];
      tideBonus = tideEffect.cultivationBonus * currentTide.intensity;
      if (tideEffect.specialEffects.length > 0) {
        tideMessages = tideEffect.specialEffects;
      }
    }

    const meridianEffect = player.meridians ? calculateMeridianEffects(player.meridians) : null;
    const meridianMult = meridianEffect ? 1 + meridianEffect.spiritAbsorbBonus : 1.0;

    // 天赋修炼速度加成
    const talentCultMult = TalentStatsCalculator.getCultivationSpeedMultiplier(player);
    // 天赋灵气吸收加成
    const talentAbsorbMult = TalentStatsCalculator.getSpiritAbsorptionMultiplier(player);

    let expGain: number;
    let manaCost = 0;
    let manaRecovery = 0;
    let eventType: 'none' | 'insight' | 'deviation' = 'none';
    let eventMessage: string | undefined;
    const messages: string[] = [];

    const densityInfo = this.getSpiritDensityLabel(room.spiritDensity);
    const envParts: string[] = [`灵气：${densityInfo.label}`];
    if (terrainInfo.label) envParts.push(terrainInfo.label);
    if (terrainInfo.pct !== 0) {
      envParts.push(terrainInfo.pct > 0 ? `+${terrainInfo.pct}%` : `${terrainInfo.pct}%`);
    }

    if (tideBonus !== 1.0) {
      const tidePct = Math.round((tideBonus - 1) * 100);
      envParts.push(tidePct > 0 ? `潮汐+${tidePct}%` : `潮汐${tidePct}%`);
    }

    switch (mode) {
      case CultivationMode.MEDITATE:
        expGain = Math.floor(baseGain * 0.5 * absorbMult * methodMult * envMult * tideBonus * meridianMult * talentCultMult * talentAbsorbMult);
        manaRecovery = Math.floor(player.maxMana * 0.05 * (currentTide ? TIDE_CONFIG[currentTide.type].manaRecoveryBonus : 1.0));
        if (manaRecovery > 0) {
          messages.push(`静心调息，灵气缓缓流入体内，法力恢复 ${manaRecovery}。`);
        } else {
          messages.push('静心调息，感悟天地灵气。');
        }
        break;

      case CultivationMode.BREATHE:
        expGain = Math.floor(baseGain * absorbMult * methodMult * envMult * tideBonus * meridianMult * talentCultMult * talentAbsorbMult);
        messages.push('吐纳天地灵气，运转周身经脉。');
        break;

      case CultivationMode.PUSH:
        manaCost = Math.floor(10 + player.maxMana * 0.05);
        if (player.mana < manaCost) {
          return {
            expGain: 0, manaCost: 0, manaRecovery: 0,
            messages: ['法力不足，无法冲关修炼。'],
            eventType: 'none',
            envBonus: terrainInfo.pct,
            envLabel: densityInfo.label,
            tideBonus: tideBonus !== 1.0 ? Math.round((tideBonus - 1) * 100) : undefined,
          };
        }
        expGain = Math.floor(baseGain * 2.0 * absorbMult * methodMult * envMult * tideBonus * meridianMult * talentCultMult * talentAbsorbMult);
        messages.push('全力运转功法，强行冲击经脉瓶颈！');
        
        let deviationRate = 0.05;
        if (room.isSafeZone) deviationRate *= 0.5;
        if (room.terrain === TerrainType.VOLCANO || room.terrain === TerrainType.DESERT) deviationRate *= 1.3;
        if (currentTide) {
          deviationRate += TIDE_CONFIG[currentTide.type].deviationRiskBonus;
        }
        
        if (Math.random() < deviationRate) {
          const hpLoss = Math.floor(player.maxHp * 0.08);
          player.hp = Math.max(1, player.hp - hpLoss);
          expGain = Math.floor(expGain * 0.5);
          eventType = 'deviation';
          eventMessage = `真气逆行！走火入魔！损失 ${hpLoss} 气血，修为仅得一半。`;
        }
        break;

      case CultivationMode.MERIDIAN:
        return this.cultivateMeridian(player, mode);

      default:
        expGain = Math.floor(baseGain * absorbMult * envMult * tideBonus * meridianMult * talentCultMult * talentAbsorbMult);
        messages.push('吐纳天地灵气。');
        break;
    }

    if (mode !== CultivationMode.MEDITATE) {
      messages.push(`〔${envParts.join(' · ')}〕`);
    }

    if (tideMessages.length > 0) {
      messages.push('');
      messages.push('◆ 灵气潮汐：');
      messages.push(...tideMessages);
    }

    let insightChance = 0.04;
    if (currentTide) {
      insightChance += TIDE_CONFIG[currentTide.type].insightChanceBonus;
    }
    
    if (eventType === 'none' && Math.random() < insightChance) {
      expGain = Math.floor(expGain * 3);
      eventType = 'insight';
      eventMessage = '灵光一闪，陷入顿悟之境！修为暴涨！';
    }

    if (manaCost > 0) player.mana -= manaCost;
    if (manaRecovery > 0) player.mana = Math.min(player.maxMana, player.mana + manaRecovery);

    let proficiencyGain = 0;
    let methodEvolved = false;
    let evolvedMethodName: string | undefined;

    if (player.currentMethodId && expGain > 0) {
      const currentMethod = getMethod(player.currentMethodId);
      if (currentMethod) {
        const modeProfMult: Record<CultivationMode, number> = {
          [CultivationMode.MEDITATE]: 1.5,
          [CultivationMode.BREATHE]: 1.0,
          [CultivationMode.PUSH]: 0.8,
          [CultivationMode.MERIDIAN]: 0.5,
        };
        proficiencyGain = Math.max(1, Math.floor(expGain * 0.1 * modeProfMult[mode]));
        player.methodProficiency = Math.min(
          player.methodMaxProficiency,
          player.methodProficiency + proficiencyGain
        );

        if (player.methodProficiency >= player.methodMaxProficiency && currentMethod.evolvesTo) {
          const evolvedMethod = getMethod(currentMethod.evolvesTo);
          if (evolvedMethod) {
            methodEvolved = true;
            evolvedMethodName = evolvedMethod.name;
            const obscureWords = ENLIGHTENMENT_OBSCURE_WORDS[currentMethod.grade] || [];
            const obscureWord = obscureWords.length > 0
              ? obscureWords[Math.floor(Math.random() * obscureWords.length)]
              : '功法运转更加圆融';

            player.currentMethodId = evolvedMethod.id;
            player.methodProficiency = 0;
            player.methodMaxProficiency = evolvedMethod.proficiencyRequired || 9999;
            player.methodEnlightenmentCount += 1;
            messages.push('');
            messages.push(`【功法顿悟！】${obscureWord}`);
            messages.push(`${currentMethod.name} 进阶为 ${evolvedMethod.name}（${evolvedMethod.grade}品）！`);
            messages.push(`修炼速度加成提升至 ${evolvedMethod.speedBonus}倍！`);
            if (evolvedMethod.specialEffects.length > currentMethod.specialEffects.length) {
              const newEffects = evolvedMethod.specialEffects.filter(
                e => !currentMethod.specialEffects.includes(e)
              );
              if (newEffects.length > 0) {
                messages.push(`解锁奥义：${newEffects.join('、')}`);
              }
            }
          }
        }
      }
    }

    // ===== 机缘触发 =====
    let destinyTriggered = false;
    let destinyMethodId: string | undefined;
    let destinyMethodName: string | undefined;

    // 机缘只在主动修炼（非静坐）且获得修为时触发（通脉模式已在上方返回）
    if (mode !== CultivationMode.MEDITATE && expGain > 0) {
      const allMethods = getAllMethods();
      // 筛选 DESTINY 类型、未习得、境界足够、无进阶路径、且非任务/副本/终极成就的功法
      const destinyMethods = allMethods.filter(m =>
        m.acquireType === AcquireType.DESTINY &&
        !player.knownMethodIds.includes(m.id) &&
        player.realm >= m.requiredRealm &&
        !m.evolvesTo &&
        !m.acquireCondition?.questId &&
        !m.acquireCondition?.dungeonId &&
        m.id !== 'tahua_zizai' // 他化自在大成需集齐十凶宝术，不通过普通机缘触发
      );

      if (destinyMethods.length > 0) {
        let chance = 0.005; // 基础 0.5%
        if (mode === CultivationMode.PUSH) chance += 0.015; // 冲关 +1.5%
        if (eventType === 'insight') chance += 0.02; // 顿悟状态 +2%
        if (currentTide) chance += 0.005 * currentTide.intensity; // 潮汐加成
        if (room.terrain === TerrainType.RUIN || room.terrain === TerrainType.VOLCANO) chance += 0.005; // 遗迹/火山 +0.5%

        if (Math.random() < chance) {
          const method = destinyMethods[Math.floor(Math.random() * destinyMethods.length)];
          const learnResult = MethodService.learnMethod(player, method.id);
          if (learnResult.success) {
            destinyTriggered = true;
            destinyMethodId = method.id;
            destinyMethodName = method.name;
            messages.push('');
            messages.push('【机缘降临！】');
            messages.push('天地异动，灵气汇聚，冥冥中似有上古传承向你敞开...');
            messages.push(`你领悟了《${method.name}》！`);
            messages.push(`《${method.name}》：${method.description}`);
          }
        }
      }
    }

    return {
      expGain, manaCost, manaRecovery, messages, eventType, eventMessage,
      envBonus: terrainInfo.pct,
      envLabel: densityInfo.label,
      proficiencyGain,
      methodEvolved,
      evolvedMethodName,
      tideBonus: tideBonus !== 1.0 ? Math.round((tideBonus - 1) * 100) : undefined,
      destinyTriggered,
      destinyMethodId,
      destinyMethodName,
    };
  }

  static cultivateMeridian(player: IPlayer, mode: CultivationMode): ICultivationResult {
    if (!player.meridians || player.meridians.length === 0) {
      return {
        expGain: 0, manaCost: 0, manaRecovery: 0,
        messages: ['你尚未开启任何经脉，请先打通经脉。'],
        eventType: 'none',
      };
    }

    const unlockedMeridians = player.meridians.filter(m => m.isOpen && m.level < m.maxLevel);
    if (unlockedMeridians.length === 0) {
      return {
        expGain: 0, manaCost: 0, manaRecovery: 0,
        messages: ['所有已开启经脉均已修炼至最高境界。'],
        eventType: 'none',
      };
    }

    const targetMeridian = unlockedMeridians[Math.floor(Math.random() * unlockedMeridians.length)];
    const config = MERIDIAN_CONFIG[targetMeridian.type];
    
    const manaCost = Math.floor(5 + player.maxMana * 0.03);
    if (player.mana < manaCost) {
      return {
        expGain: 0, manaCost: 0, manaRecovery: 0,
        messages: [`法力不足，无法打通${targetMeridian.type}。`],
        eventType: 'none',
      };
    }

    player.mana -= manaCost;
    targetMeridian.progress += 20;
    
    const messages: string[] = [];
    messages.push(`你开始修炼${targetMeridian.type}...`);
    
    if (targetMeridian.progress >= targetMeridian.maxProgress) {
      targetMeridian.level++;
      targetMeridian.progress = 0;
      messages.push(`【经脉突破！】${targetMeridian.type}提升至第 ${targetMeridian.level} 层！`);
      messages.push(config.description);
      
      if (targetMeridian.level >= targetMeridian.maxLevel) {
        messages.push(`【经脉贯通！】${targetMeridian.type}已达圆满！`);
      }
      
      this.applyMeridianEffects(player, targetMeridian);
    } else {
      messages.push(`${targetMeridian.type}修炼中...（进度：${targetMeridian.progress}/${targetMeridian.maxProgress}）`);
    }

    return {
      expGain: 0, manaCost, manaRecovery: 0,
      messages,
      eventType: targetMeridian.level > 0 ? 'insight' : 'none',
      meridianOpened: targetMeridian.level >= targetMeridian.maxLevel,
      meridianName: targetMeridian.type,
    };
  }

  static applyMeridianEffects(player: IPlayer, meridian?: IMeridian): void {
    if (!player.meridians) return;
    if (meridian) {
      // 只应用当前升级经脉的增量（一级的加成）
      const config = MERIDIAN_CONFIG[meridian.type];
      const levelMult = 1 / config.maxLevel;
      const effect = config.baseEffect;
      player.maxHp += Math.floor(effect.maxHpBonus * levelMult);
      player.maxMana += Math.floor(effect.maxManaBonus * levelMult);
      player.attack += Math.floor(effect.attackBonus * levelMult);
      player.defense += Math.floor(effect.defenseBonus * levelMult);
      player.speed += Math.floor(effect.speedBonus * levelMult);
      player.spiritAbsorbRate += effect.spiritAbsorbBonus * levelMult;
    }
  }

  static checkBottleneck(player: IPlayer): IBottleneckInfo {
    const progress = player.cultivationExp / player.maxCultivationExp;
    
    if (progress >= 0.7 && progress < 0.85) {
      return {
        exists: true,
        description: '修为进入瓶颈期，修炼效率开始下降。',
        progress: Math.floor((progress - 0.7) / 0.15 * 100),
        maxProgress: 100,
        requiredActions: ['寻找突破丹药', '进入洞天修炼', '完成宗门任务'],
      };
    }
    
    if (progress >= 0.85 && progress < 0.95) {
      return {
        exists: true,
        description: '修为进入深瓶颈期，需要特殊手段才能突破。',
        progress: Math.floor((progress - 0.85) / 0.1 * 100),
        maxProgress: 100,
        requiredActions: ['服用破境丹', '寻找天地灵物', '接受心魔考验'],
      };
    }
    
    if (progress >= 0.95) {
      return {
        exists: true,
        description: '修为即将圆满，可尝试冲击更高境界。',
        progress: Math.floor((progress - 0.95) / 0.05 * 100),
        maxProgress: 100,
        requiredActions: ['准备突破', '积累突破感悟', '检查突破材料'],
      };
    }
    
    return {
      exists: false,
      description: '修为稳步增长中，尚未遇到瓶颈。',
      progress: 0,
      maxProgress: 100,
      requiredActions: [],
    };
  }

  static getModeHelp(): string {
    return (
      '修炼模式:\n' +
      '  修炼 静坐  — 缓慢但安全，恢复法力\n' +
      '  修炼 吐纳  — 平稳修炼，无消耗\n' +
      '  修炼 冲关  — 快速但消耗法力，有走火入魔风险\n' +
      '  修炼 通脉  — 修炼已开启经脉，提升属性\n' +
      '  查看经脉    — 查看当前经脉状态\n' +
      '  查看潮汐    — 查看当前灵气潮汐状态\n' +
      '  查看瓶颈    — 查看当前修炼瓶颈'
    );
  }
}