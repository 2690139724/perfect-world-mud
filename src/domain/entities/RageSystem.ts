export interface IRageState {
  current: number;
  max: number;
  overflow: number;
  isEnraged: boolean;
  enragedTurns: number;
}

export interface IRageSkill {
  id: string;
  name: string;
  description: string;
  rageCost: number;
  damageMultiplier: number;
  effects?: {
    type: 'heal' | 'shield' | 'buff' | 'debuff';
    value: number;
    duration: number;
  }[];
}

export interface IComboChain {
  id: string;
  name: string;
  description: string;
  requiredTechniques: string[];
  damageMultiplier: number;
  rageGain: number;
  specialEffect?: {
    type: 'stun' | 'freeze' | 'burn' | 'poison';
    duration: number;
    value: number;
  };
}

export const RAGE_CONFIG = {
  baseMax: 100,
  perLevelBonus: 10,
  attackGain: 15,
  skillGain: 25,
  damageTakenGain: 10,
  counterGain: 20,
  maxOverflow: 50,
  enrageThreshold: 100,
  enrageDuration: 3,
};

export const RAGE_SKILLS: IRageSkill[] = [
  {
    id: 'rage_berserk',
    name: '狂暴',
    description: '消耗50点怒气，进入狂暴状态，下一次攻击伤害翻倍',
    rageCost: 50,
    damageMultiplier: 2.0,
    effects: [{ type: 'buff', value: 50, duration: 1 }],
  },
  {
    id: 'rage_heal',
    name: '嗜血',
    description: '消耗40点怒气，恢复自身20%最大气血',
    rageCost: 40,
    damageMultiplier: 0,
    effects: [{ type: 'heal', value: 20, duration: 0 }],
  },
  {
    id: 'rage_shield',
    name: '护盾',
    description: '消耗30点怒气，获得一个吸收100点伤害的护盾',
    rageCost: 30,
    damageMultiplier: 0,
    effects: [{ type: 'shield', value: 100, duration: 2 }],
  },
  {
    id: 'rage_crit',
    name: '致命一击',
    description: '消耗80点怒气，下一次攻击必定暴击，伤害1.5倍',
    rageCost: 80,
    damageMultiplier: 1.5,
    effects: [{ type: 'buff', value: 100, duration: 1 }],
  },
];

export const COMBO_CHAINS: IComboChain[] = [
  {
    id: 'combo_flame_storm',
    name: '烈焰风暴',
    description: '连续使用火属性技能触发',
    requiredTechniques: ['tech_fireball', 'tech_inferno', 'tech_meteor'],
    damageMultiplier: 1.8,
    rageGain: 30,
    specialEffect: { type: 'burn', duration: 4, value: 10 },
  },
  {
    id: 'combo_ice_prison',
    name: '冰封牢笼',
    description: '连续使用冰属性技能触发',
    requiredTechniques: ['tech_ice_shard', 'tech_blizzard', 'tech_frost_nova'],
    damageMultiplier: 1.6,
    rageGain: 25,
    specialEffect: { type: 'freeze', duration: 2, value: 0 },
  },
  {
    id: 'combo_thunder_chain',
    name: '雷霆锁链',
    description: '连续使用雷属性技能触发',
    requiredTechniques: ['tech_lightning', 'tech_thunder_bolt', 'tech_chain_lightning'],
    damageMultiplier: 2.0,
    rageGain: 35,
    specialEffect: { type: 'stun', duration: 2, value: 0 },
  },
  {
    id: 'combo_shadow_assault',
    name: '暗影突袭',
    description: '连续使用暗属性技能触发',
    requiredTechniques: ['tech_shadow_strike', 'tech_void_slash', 'tech_dark_pact'],
    damageMultiplier: 1.7,
    rageGain: 28,
    specialEffect: { type: 'poison', duration: 5, value: 6 },
  },
  {
    id: 'combo_divine_blessing',
    name: '神圣祝福',
    description: '连续使用光属性技能触发',
    requiredTechniques: ['tech_holy_light', 'tech_divine_shield', 'tech_angelic_wrath'],
    damageMultiplier: 1.5,
    rageGain: 20,
    specialEffect: { type: 'burn', duration: 3, value: 8 },
  },
];

export function createInitialRageState(level: number): IRageState {
  return {
    current: 0,
    max: RAGE_CONFIG.baseMax + level * RAGE_CONFIG.perLevelBonus,
    overflow: 0,
    isEnraged: false,
    enragedTurns: 0,
  };
}

export function addRage(state: IRageState, amount: number): { overflow: boolean; enraged: boolean } {
  state.current += amount;
  let overflow = false;
  let enraged = false;

  if (state.current > state.max) {
    overflow = true;
    state.overflow = Math.min(RAGE_CONFIG.maxOverflow, state.current - state.max);
    state.current = state.max;
  } else {
    state.overflow = 0;
  }

  if (state.current >= RAGE_CONFIG.enrageThreshold && !state.isEnraged) {
    state.isEnraged = true;
    state.enragedTurns = RAGE_CONFIG.enrageDuration;
    enraged = true;
  }

  return { overflow, enraged };
}

export function consumeRage(state: IRageState, amount: number): boolean {
  if (state.current >= amount) {
    state.current -= amount;
    return true;
  }
  return false;
}

export function tickEnrage(state: IRageState): { ended: boolean } {
  if (state.isEnraged) {
    state.enragedTurns--;
    if (state.enragedTurns <= 0) {
      state.isEnraged = false;
      state.current = Math.floor(state.max * 0.5);
      return { ended: true };
    }
  }
  return { ended: false };
}

export function checkComboChain(usedTechniques: string[], techniqueHistory: string[]): IComboChain | null {
  for (const chain of COMBO_CHAINS) {
    const matchCount = chain.requiredTechniques.filter(tech => techniqueHistory.includes(tech)).length;
    if (matchCount >= chain.requiredTechniques.length - 1) {
      const lastUsed = techniqueHistory[techniqueHistory.length - 1];
      if (chain.requiredTechniques.includes(lastUsed)) {
        return chain;
      }
    }
  }
  return null;
}