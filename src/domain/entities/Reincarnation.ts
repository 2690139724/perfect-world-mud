import { CultivationRealm } from './Player';

export interface IReincarnation {
  count: number;
  retainedTalents: string[];
  retainedTechniques: string[];
  retainedLaws: string[];
  bonusExp: number;
  bonusAttack: number;
  bonusDefense: number;
  bonusSpeed: number;
  unlockedContent: string[];
}

export const REINCARNATION_BONUSES: Record<number, {
  expBonus: number;
  attackBonus: number;
  defenseBonus: number;
  speedBonus: number;
  unlockContent: string[];
}> = {
  1: {
    expBonus: 0.1,
    attackBonus: 5,
    defenseBonus: 5,
    speedBonus: 2,
    unlockContent: ['mount_linghu', 'talent_huang_ti'],
  },
  2: {
    expBonus: 0.2,
    attackBonus: 10,
    defenseBonus: 10,
    speedBonus: 5,
    unlockContent: ['mount_wolf', 'mount_bird', 'talent_huang_gu'],
  },
  3: {
    expBonus: 0.3,
    attackBonus: 20,
    defenseBonus: 15,
    speedBonus: 8,
    unlockContent: ['mount_lion', 'law_five_elements', 'law_fire'],
  },
  4: {
    expBonus: 0.5,
    attackBonus: 30,
    defenseBonus: 25,
    speedBonus: 12,
    unlockContent: ['mount_dragon', 'law_thunder', 'law_sword'],
  },
  5: {
    expBonus: 0.8,
    attackBonus: 50,
    defenseBonus: 40,
    speedBonus: 20,
    unlockContent: ['mount_kirin', 'law_time', 'law_space', 'talent_shengti_daoji'],
  },
  6: {
    expBonus: 1.0,
    attackBonus: 80,
    defenseBonus: 60,
    speedBonus: 30,
    unlockContent: ['law_destruction', 'law_life', 'talent_zhenlong_xue'],
  },
  7: {
    expBonus: 1.5,
    attackBonus: 120,
    defenseBonus: 90,
    speedBonus: 45,
    unlockContent: ['law_reincarnation', 'talent_kunpeng_xue'],
  },
  8: {
    expBonus: 2.0,
    attackBonus: 180,
    defenseBonus: 130,
    speedBonus: 65,
    unlockContent: ['law_destiny', 'talent_ba_ti'],
  },
  9: {
    expBonus: 3.0,
    attackBonus: 280,
    defenseBonus: 200,
    speedBonus: 100,
    unlockContent: ['talent_mystery_eye', 'talent_immortal_soul'],
  },
  10: {
    expBonus: 5.0,
    attackBonus: 500,
    defenseBonus: 350,
    speedBonus: 200,
    unlockContent: ['ultimate_technique', 'secret_area'],
  },
};

export function getReincarnationBonus(count: number): {
  expBonus: number;
  attackBonus: number;
  defenseBonus: number;
  speedBonus: number;
  unlockContent: string[];
} {
  const maxCount = Math.max(...Object.keys(REINCARNATION_BONUSES).map(Number));
  const effectiveCount = Math.min(count, maxCount);
  
  if (effectiveCount === 0) {
    return {
      expBonus: 0,
      attackBonus: 0,
      defenseBonus: 0,
      speedBonus: 0,
      unlockContent: [],
    };
  }
  
  return REINCARNATION_BONUSES[effectiveCount];
}

export function getReincarnationCost(count: number): {
  gold: number;
  items: { id: string; amount: number }[];
  requiredRealm: CultivationRealm;
} {
  return {
    gold: count * 1000,
    items: [],
    requiredRealm: Math.min(CultivationRealm.SUPREME, CultivationRealm.BLOOD_MOVING + count - 1),
  };
}

export function createReincarnation(count: number): IReincarnation {
  const bonus = getReincarnationBonus(count);
  return {
    count,
    retainedTalents: [],
    retainedTechniques: [],
    retainedLaws: [],
    bonusExp: bonus.expBonus,
    bonusAttack: bonus.attackBonus,
    bonusDefense: bonus.defenseBonus,
    bonusSpeed: bonus.speedBonus,
    unlockedContent: bonus.unlockContent,
  };
}