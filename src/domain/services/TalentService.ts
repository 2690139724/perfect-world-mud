import { ITalent, getTalent, talentRegistry } from '../../data/talents/talent_data';
import { IPlayer } from '../entities/Player';

export enum TalentEvolutionStage {
  BASE = 'base',
  ADVANCED = 'advanced',
  AWAKENED = 'awakened',
  TRANSFORMED = 'transformed',
  DIVINE = 'divine',
}

export enum TalentCategory {
  PHYSIQUE = 'physique',
  SOUL = 'soul',
  INNATE = 'innate',
  BLOODLINE = 'bloodline',
}

export interface ITalentEvolution {
  talentId: string;
  stage: TalentEvolutionStage;
  requirements: {
    minRealm: number;
    materials: string[];
    goldCost: number;
  };
  enhancedEffects: { stat: string; value: number; description: string }[];
}

export interface ITalentCombination {
  id: string;
  name: string;
  requiredTalents: string[];
  combinedEffect: { stat: string; value: number; description: string }[];
  description: string;
}

export interface IHiddenTalent {
  id: string;
  talent: ITalent;
  unlockCondition: {
    type: 'realm' | 'achievement' | 'story' | 'combat' | 'exploration';
    value: string | number;
  };
  unlocked: boolean;
}

export interface ITalentInheritance {
  fromPlayerId: string;
  talentId: string;
  transferRate: number;
  remainingUses: number;
}

export const TALENT_EVOLUTIONS: Record<string, ITalentEvolution[]> = {
  supreme_bone: [
    {
      talentId: 'supreme_bone',
      stage: TalentEvolutionStage.ADVANCED,
      requirements: { minRealm: 5, materials: ['mat_emperor_blood'], goldCost: 10000 },
      enhancedEffects: [{ stat: 'attack', value: 45, description: '攻击+45%' }],
    },
    {
      talentId: 'supreme_bone',
      stage: TalentEvolutionStage.AWAKENED,
      requirements: { minRealm: 8, materials: ['mat_emperor_blood', 'mat_immortal_essence'], goldCost: 50000 },
      enhancedEffects: [{ stat: 'attack', value: 60, description: '攻击+60%' }, { stat: 'special', value: 0, description: '至尊术觉醒' }],
    },
    {
      talentId: 'supreme_bone',
      stage: TalentEvolutionStage.TRANSFORMED,
      requirements: { minRealm: 11, materials: ['mat_emperor_blood', 'mat_immortal_essence', 'mat_divine_spark'], goldCost: 200000 },
      enhancedEffects: [{ stat: 'attack', value: 80, description: '攻击+80%' }, { stat: 'critRate', value: 20, description: '暴击率+20%' }],
    },
  ],
  double_pupils: [
    {
      talentId: 'double_pupils',
      stage: TalentEvolutionStage.ADVANCED,
      requirements: { minRealm: 5, materials: ['mat_eye_of_heaven'], goldCost: 8000 },
      enhancedEffects: [{ stat: 'critRate', value: 15, description: '暴击率+15%' }],
    },
    {
      talentId: 'double_pupils',
      stage: TalentEvolutionStage.AWAKENED,
      requirements: { minRealm: 8, materials: ['mat_eye_of_heaven', 'mat_divine_insight'], goldCost: 40000 },
      enhancedEffects: [{ stat: 'critRate', value: 25, description: '暴击率+25%' }, { stat: 'special', value: 0, description: '洞察万物' }],
    },
  ],
  chaos_body: [
    {
      talentId: 'chaos_body',
      stage: TalentEvolutionStage.ADVANCED,
      requirements: { minRealm: 6, materials: ['mat_chaos_essence'], goldCost: 15000 },
      enhancedEffects: [{ stat: 'cultivationSpeed', value: 65, description: '修炼速度+65%' }, { stat: 'defense', value: 25, description: '防御+25%' }],
    },
    {
      talentId: 'chaos_body',
      stage: TalentEvolutionStage.DIVINE,
      requirements: { minRealm: 13, materials: ['mat_chaos_essence', 'mat_primal_chaos'], goldCost: 500000 },
      enhancedEffects: [{ stat: 'cultivationSpeed', value: 100, description: '修炼速度+100%' }, { stat: 'defense', value: 40, description: '防御+40%' }],
    },
  ],
};

export const TALENT_COMBINATIONS: ITalentCombination[] = [
  {
    id: 'combo_emperor',
    name: '帝道无双',
    requiredTalents: ['supreme_bone', 'ten_ferocious_blood'],
    combinedEffect: [
      { stat: 'attack', value: 30, description: '攻击+30%' },
      { stat: 'cultivationSpeed', value: 15, description: '修炼速度+15%' },
    ],
    description: '至尊骨与十凶血脉交融，成就帝道之基',
  },
  {
    id: 'combo_immortal',
    name: '不朽传说',
    requiredTalents: ['indestructible_golden_body', 'indestructible_soul'],
    combinedEffect: [
      { stat: 'maxHp', value: 25, description: '气血+25%' },
      { stat: 'reincarnationRetain', value: 20, description: '转世保留+20%' },
    ],
    description: '不灭金身与不灭之魂合一，成就不朽之身',
  },
  {
    id: 'combo_seer',
    name: '洞察天机',
    requiredTalents: ['double_pupils', 'god_sight'],
    combinedEffect: [
      { stat: 'critRate', value: 15, description: '暴击率+15%' },
      { stat: 'insight', value: 15, description: '悟性+15%' },
    ],
    description: '重瞳与神之视共鸣，可洞察天机',
  },
  {
    id: 'combo_elements',
    name: '元素掌控',
    requiredTalents: ['flame_spirit_body', 'thunder_body'],
    combinedEffect: [
      { stat: 'attack', value: 20, description: '攻击+20%' },
      { stat: 'speed', value: 10, description: '速度+10%' },
    ],
    description: '火焰与雷电之力交融，掌控元素',
  },
  {
    id: 'combo_reincarnation',
    name: '轮回主宰',
    requiredTalents: ['reincarnation_body', 'indestructible_soul'],
    combinedEffect: [
      { stat: 'reincarnationRetain', value: 30, description: '转世保留+30%' },
      { stat: 'cultivationSpeed', value: 10, description: '修炼速度+10%' },
    ],
    description: '轮回之体与不灭之魂，主宰轮回',
  },
];

export const HIDDEN_TALENTS: IHiddenTalent[] = [
  {
    id: 'hidden_emperor_heart',
    talent: {
      id: 'emperor_heart',
      name: '帝心',
      description: '拥有成为大帝的无上意志，所有属性全面提升。',
      type: 'innate',
      effects: [
        { stat: 'attack', value: 25, description: '攻击+25%' },
        { stat: 'defense', value: 25, description: '防御+25%' },
        { stat: 'cultivationSpeed', value: 25, description: '修炼速度+25%' },
      ],
      rarity: 'legendary',
    },
    unlockCondition: { type: 'realm', value: 12 },
    unlocked: false,
  },
  {
    id: 'hidden_chaos_origin',
    talent: {
      id: 'chaos_origin',
      name: '混沌本源',
      description: '领悟混沌本源，万法皆通，修炼无极限。',
      type: 'soul',
      effects: [
        { stat: 'cultivationSpeed', value: 40, description: '修炼速度+40%' },
        { stat: 'insight', value: 30, description: '悟性+30%' },
      ],
      rarity: 'legendary',
    },
    unlockCondition: { type: 'achievement', value: 'reach_true_immortal' },
    unlocked: false,
  },
  {
    id: 'hidden_battle_prodigy',
    talent: {
      id: 'battle_prodigy',
      name: '战帝',
      description: '天生战神，战斗中越战越强。',
      type: 'physique',
      effects: [
        { stat: 'attack', value: 20, description: '攻击+20%' },
        { stat: 'critRate', value: 15, description: '暴击率+15%' },
      ],
      rarity: 'legendary',
    },
    unlockCondition: { type: 'combat', value: 1000 },
    unlocked: false,
  },
];

export class TalentService {
  static evolveTalent(player: IPlayer, talentId: string): { success: boolean; message: string; evolvedTalent?: ITalent } {
    const talent = getTalent(talentId);
    if (!talent) {
      return { success: false, message: '天赋不存在' };
    }

    const evolutions = TALENT_EVOLUTIONS[talentId];
    if (!evolutions || evolutions.length === 0) {
      return { success: false, message: '该天赋无法进化' };
    }

    const currentStage = this.getCurrentEvolutionStage(player, talentId);
    const nextEvolution = evolutions.find(e => 
      e.stage === this.getNextStage(currentStage) && 
      player.realm >= e.requirements.minRealm
    );

    if (!nextEvolution) {
      return { success: false, message: '未达到进化条件' };
    }

    if (player.gold < nextEvolution.requirements.goldCost) {
      return { success: false, message: '金币不足' };
    }

    player.gold -= nextEvolution.requirements.goldCost;

    const evolvedTalent: ITalent = {
      ...talent,
      id: `${talentId}_${nextEvolution.stage}`,
      name: `${talent.name}·${this.getStageName(nextEvolution.stage)}`,
      effects: [...talent.effects, ...nextEvolution.enhancedEffects],
    };

    player.talentIds = player.talentIds.filter(id => id !== talentId);
    player.talentIds.push(evolvedTalent.id);

    talentRegistry.set(evolvedTalent.id, evolvedTalent);

    return { success: true, message: `${talent.name}进化成功！`, evolvedTalent };
  }

  static getCurrentEvolutionStage(player: IPlayer, talentId: string): TalentEvolutionStage {
    const stages = [TalentEvolutionStage.BASE, TalentEvolutionStage.ADVANCED, TalentEvolutionStage.AWAKENED, TalentEvolutionStage.TRANSFORMED, TalentEvolutionStage.DIVINE];
    
    for (let i = stages.length - 1; i >= 0; i--) {
      const stageId = i === 0 ? talentId : `${talentId}_${stages[i]}`;
      if (player.talentIds.includes(stageId)) {
        return stages[i];
      }
    }
    
    return TalentEvolutionStage.BASE;
  }

  static getNextStage(current: TalentEvolutionStage): TalentEvolutionStage {
    const stages = [TalentEvolutionStage.BASE, TalentEvolutionStage.ADVANCED, TalentEvolutionStage.AWAKENED, TalentEvolutionStage.TRANSFORMED, TalentEvolutionStage.DIVINE];
    const currentIndex = stages.indexOf(current);
    return stages[Math.min(currentIndex + 1, stages.length - 1)];
  }

  static getStageName(stage: TalentEvolutionStage): string {
    const names: Record<TalentEvolutionStage, string> = {
      [TalentEvolutionStage.BASE]: '初阶',
      [TalentEvolutionStage.ADVANCED]: '进阶',
      [TalentEvolutionStage.AWAKENED]: '觉醒',
      [TalentEvolutionStage.TRANSFORMED]: '蜕变',
      [TalentEvolutionStage.DIVINE]: '神化',
    };
    return names[stage];
  }

  static checkTalentCombinations(player: IPlayer): ITalentCombination[] {
    const playerTalentIds = new Set(player.talentIds);
    const activeCombos: ITalentCombination[] = [];

    for (const combo of TALENT_COMBINATIONS) {
      if (combo.requiredTalents.every(id => playerTalentIds.has(id))) {
        activeCombos.push(combo);
      }
    }

    return activeCombos;
  }

  static getCombinationBonuses(combinations: ITalentCombination[]): Record<string, number> {
    const bonuses: Record<string, number> = {};
    
    for (const combo of combinations) {
      for (const effect of combo.combinedEffect) {
        bonuses[effect.stat] = (bonuses[effect.stat] || 0) + effect.value;
      }
    }
    
    return bonuses;
  }

  static checkHiddenTalentUnlock(player: IPlayer): IHiddenTalent | null {
    for (const hidden of HIDDEN_TALENTS) {
      if (hidden.unlocked) continue;

      let unlocked = false;

      switch (hidden.unlockCondition.type) {
        case 'realm':
          unlocked = player.realm >= (hidden.unlockCondition.value as number);
          break;
        case 'achievement':
          unlocked = player.achievements.some(a => a.id === hidden.unlockCondition.value);
          break;
        case 'combat':
          unlocked = player.killedMonsters.length >= (hidden.unlockCondition.value as number);
          break;
        case 'exploration':
          unlocked = player.discoveredZones.length >= (hidden.unlockCondition.value as number);
          break;
        case 'story':
          unlocked = player.hiddenStorylines.some(s => s.storylineId === hidden.unlockCondition.value && s.isCompleted);
          break;
      }

      if (unlocked) {
        hidden.unlocked = true;
        player.talentIds.push(hidden.talent.id);
        talentRegistry.set(hidden.talent.id, hidden.talent);
        return hidden;
      }
    }

    return null;
  }

  static inheritTalent(fromPlayer: IPlayer, toPlayer: IPlayer, talentId: string): { success: boolean; message: string } {
    if (!fromPlayer.talentIds.includes(talentId)) {
      return { success: false, message: '源玩家没有该天赋' };
    }

    if (toPlayer.talentIds.includes(talentId)) {
      return { success: false, message: '目标玩家已拥有该天赋' };
    }

    const talent = getTalent(talentId);
    if (!talent) {
      return { success: false, message: '天赋不存在' };
    }

    const inheritanceCost = 10000 * (talent.rarity === 'legendary' ? 10 : talent.rarity === 'rare' ? 5 : 1);
    if (toPlayer.gold < inheritanceCost) {
      return { success: false, message: '金币不足' };
    }

    toPlayer.gold -= inheritanceCost;
    toPlayer.talentIds.push(talentId);

    fromPlayer.talentIds = fromPlayer.talentIds.filter(id => id !== talentId);

    return { success: true, message: `${talent.name}传承成功！` };
  }

  static getTalentById(id: string): ITalent | undefined {
    return getTalent(id);
  }

  static getAllTalents(): ITalent[] {
    return Array.from(talentRegistry.values());
  }

  static getTalentEffects(talentIds: string[]): Record<string, number> {
    const merged: Record<string, number> = {};
    for (const id of talentIds) {
      const talent = getTalent(id);
      if (!talent) continue;
      for (const effect of talent.effects) {
        const key = effect.stat;
        merged[key] = (merged[key] || 0) + effect.value;
      }
    }
    return merged;
  }
}