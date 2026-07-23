export enum MeridianType {
  HAND_TAI_YIN = '手太阴肺经',
  HAND_JUE_YIN = '手厥阴心包经',
  HAND_SHUO_YIN = '手少阴心经',
  HAND_TAI_YANG = '手太阳小肠经',
  HAND_YANG_MING = '手阳明大肠经',
  HAND_JUE_YANG = '手少阳三焦经',
  FOOT_TAI_YIN = '足太阴脾经',
  FOOT_JUE_YIN = '足厥阴肝经',
  FOOT_SHUO_YIN = '足少阴肾经',
  FOOT_TAI_YANG = '足太阳膀胱经',
  FOOT_YANG_MING = '足阳明胃经',
  FOOT_JUE_YANG = '足少阳胆经',
  DU_MAI = '督脉',
  REN_MAI = '任脉',
  CHONG_MAI = '冲脉',
  DAI_MAI = '带脉',
  YIN_WEI_MAI = '阴维脉',
  YANG_WEI_MAI = '阳维脉',
  YIN_QIAO_MAI = '阴跷脉',
  YANG_QIAO_MAI = '阳跷脉',
}

export interface IMeridian {
  type: MeridianType;
  level: number;
  maxLevel: number;
  progress: number;
  maxProgress: number;
  isOpen: boolean;
  isBlocked: boolean;
  blockedReason?: string;
}

export interface IMeridianEffect {
  attackBonus: number;
  defenseBonus: number;
  maxHpBonus: number;
  maxManaBonus: number;
  speedBonus: number;
  spiritAbsorbBonus: number;
}

export const MERIDIAN_CONFIG: Record<MeridianType, {
  maxLevel: number;
  baseEffect: IMeridianEffect;
  unlockRealm: number;
  description: string;
}> = {
  [MeridianType.HAND_TAI_YIN]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 2, defenseBonus: 0, maxHpBonus: 0, maxManaBonus: 5, speedBonus: 0, spiritAbsorbBonus: 0.01 },
    unlockRealm: 0,
    description: '主气，贯通后灵气吸收效率提升',
  },
  [MeridianType.HAND_JUE_YIN]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 0, defenseBonus: 0, maxHpBonus: 0, maxManaBonus: 8, speedBonus: 0, spiritAbsorbBonus: 0.01 },
    unlockRealm: 0,
    description: '主脉，贯通后法力上限提升',
  },
  [MeridianType.HAND_SHUO_YIN]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 3, defenseBonus: 0, maxHpBonus: 10, maxManaBonus: 0, speedBonus: 0, spiritAbsorbBonus: 0 },
    unlockRealm: 0,
    description: '主血，贯通后气血上限提升',
  },
  [MeridianType.HAND_TAI_YANG]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 4, defenseBonus: 1, maxHpBonus: 0, maxManaBonus: 0, speedBonus: 2, spiritAbsorbBonus: 0 },
    unlockRealm: 1,
    description: '主阳，贯通后攻击速度提升',
  },
  [MeridianType.HAND_YANG_MING]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 5, defenseBonus: 0, maxHpBonus: 0, maxManaBonus: 0, speedBonus: 0, spiritAbsorbBonus: 0 },
    unlockRealm: 1,
    description: '主明，贯通后攻击力提升',
  },
  [MeridianType.HAND_JUE_YANG]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 0, defenseBonus: 2, maxHpBonus: 0, maxManaBonus: 5, speedBonus: 1, spiritAbsorbBonus: 0 },
    unlockRealm: 1,
    description: '主疏，贯通后身法灵活度提升',
  },
  [MeridianType.FOOT_TAI_YIN]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 0, defenseBonus: 3, maxHpBonus: 15, maxManaBonus: 0, speedBonus: 0, spiritAbsorbBonus: 0 },
    unlockRealm: 1,
    description: '主运，贯通后防御力提升',
  },
  [MeridianType.FOOT_JUE_YIN]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 2, defenseBonus: 2, maxHpBonus: 10, maxManaBonus: 0, speedBonus: 1, spiritAbsorbBonus: 0 },
    unlockRealm: 2,
    description: '主藏，贯通后攻防兼备',
  },
  [MeridianType.FOOT_SHUO_YIN]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 0, defenseBonus: 0, maxHpBonus: 20, maxManaBonus: 10, speedBonus: 0, spiritAbsorbBonus: 0.02 },
    unlockRealm: 2,
    description: '主精，贯通后生命力大增',
  },
  [MeridianType.FOOT_TAI_YANG]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 3, defenseBonus: 3, maxHpBonus: 0, maxManaBonus: 0, speedBonus: 3, spiritAbsorbBonus: 0 },
    unlockRealm: 2,
    description: '主表，贯通后移动速度提升',
  },
  [MeridianType.FOOT_YANG_MING]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 6, defenseBonus: 1, maxHpBonus: 5, maxManaBonus: 0, speedBonus: 0, spiritAbsorbBonus: 0 },
    unlockRealm: 2,
    description: '主肌，贯通后肉身力量提升',
  },
  [MeridianType.FOOT_JUE_YANG]: {
    maxLevel: 5,
    baseEffect: { attackBonus: 2, defenseBonus: 4, maxHpBonus: 0, maxManaBonus: 5, speedBonus: 2, spiritAbsorbBonus: 0 },
    unlockRealm: 3,
    description: '主筋，贯通后筋骨坚韧',
  },
  [MeridianType.DU_MAI]: {
    maxLevel: 10,
    baseEffect: { attackBonus: 10, defenseBonus: 5, maxHpBonus: 50, maxManaBonus: 20, speedBonus: 0, spiritAbsorbBonus: 0.05 },
    unlockRealm: 3,
    description: '奇经八脉之首，总管一身阳气',
  },
  [MeridianType.REN_MAI]: {
    maxLevel: 10,
    baseEffect: { attackBonus: 0, defenseBonus: 10, maxHpBonus: 80, maxManaBonus: 30, speedBonus: 0, spiritAbsorbBonus: 0.05 },
    unlockRealm: 3,
    description: '奇经八脉之尊，总管一身阴气',
  },
  [MeridianType.CHONG_MAI]: {
    maxLevel: 10,
    baseEffect: { attackBonus: 8, defenseBonus: 0, maxHpBonus: 0, maxManaBonus: 50, speedBonus: 5, spiritAbsorbBonus: 0.03 },
    unlockRealm: 4,
    description: '十二经之海，贯通后法力澎湃',
  },
  [MeridianType.DAI_MAI]: {
    maxLevel: 10,
    baseEffect: { attackBonus: 0, defenseBonus: 15, maxHpBonus: 100, maxManaBonus: 0, speedBonus: 0, spiritAbsorbBonus: 0 },
    unlockRealm: 4,
    description: '环腰一周，贯通后防御大增',
  },
  [MeridianType.YIN_WEI_MAI]: {
    maxLevel: 8,
    baseEffect: { attackBonus: 0, defenseBonus: 8, maxHpBonus: 30, maxManaBonus: 25, speedBonus: 0, spiritAbsorbBonus: 0.03 },
    unlockRealm: 5,
    description: '维系诸阴经，贯通后阴力稳固',
  },
  [MeridianType.YANG_WEI_MAI]: {
    maxLevel: 8,
    baseEffect: { attackBonus: 8, defenseBonus: 0, maxHpBonus: 0, maxManaBonus: 0, speedBonus: 5, spiritAbsorbBonus: 0.03 },
    unlockRealm: 5,
    description: '维系诸阳经，贯通后阳力充沛',
  },
  [MeridianType.YIN_QIAO_MAI]: {
    maxLevel: 8,
    baseEffect: { attackBonus: 5, defenseBonus: 5, maxHpBonus: 40, maxManaBonus: 15, speedBonus: 8, spiritAbsorbBonus: 0 },
    unlockRealm: 5,
    description: '主睡眠，贯通后身法诡异',
  },
  [MeridianType.YANG_QIAO_MAI]: {
    maxLevel: 8,
    baseEffect: { attackBonus: 10, defenseBonus: 3, maxHpBonus: 20, maxManaBonus: 10, speedBonus: 10, spiritAbsorbBonus: 0 },
    unlockRealm: 6,
    description: '主清醒，贯通后行动如风',
  },
};

export function createInitialMeridians(): IMeridian[] {
  return Object.values(MeridianType).map(type => ({
    type,
    level: 0,
    maxLevel: MERIDIAN_CONFIG[type].maxLevel,
    progress: 0,
    maxProgress: 100,
    isOpen: false,
    isBlocked: true,
    blockedReason: '未开启',
  }));
}

export function canUnlockMeridian(realm: number, type: MeridianType): boolean {
  return realm >= MERIDIAN_CONFIG[type].unlockRealm;
}

export function calculateMeridianEffects(meridians: IMeridian[]): IMeridianEffect {
  const result: IMeridianEffect = {
    attackBonus: 0,
    defenseBonus: 0,
    maxHpBonus: 0,
    maxManaBonus: 0,
    speedBonus: 0,
    spiritAbsorbBonus: 0,
  };
  
  for (const meridian of meridians) {
    if (!meridian.isOpen) continue;
    const config = MERIDIAN_CONFIG[meridian.type];
    const levelMult = meridian.level / config.maxLevel;
    const effect = config.baseEffect;
    result.attackBonus += Math.floor(effect.attackBonus * levelMult);
    result.defenseBonus += Math.floor(effect.defenseBonus * levelMult);
    result.maxHpBonus += Math.floor(effect.maxHpBonus * levelMult);
    result.maxManaBonus += Math.floor(effect.maxManaBonus * levelMult);
    result.speedBonus += Math.floor(effect.speedBonus * levelMult);
    result.spiritAbsorbBonus += effect.spiritAbsorbBonus * levelMult;
  }
  
  return result;
}

export function getMeridianUnlockCost(type: MeridianType, currentLevel: number): {
  gold: number;
  cultivationExp: number;
  materials?: Record<string, number>;
} {
  const config = MERIDIAN_CONFIG[type];
  const level = currentLevel || 0;
  return {
    gold: 50 * (level + 1) * (config.unlockRealm + 1),
    cultivationExp: 100 * (level + 1),
  };
}