import { CultivationRealm } from './Player';

export interface ISuppressionEffect {
  attackPenalty: number;
  defensePenalty: number;
  speedPenalty: number;
  critRatePenalty: number;
  skillEffectPenalty: number;
  description: string;
}

export interface IRealmAdvantage {
  attackBonus: number;
  defenseBonus: number;
  speedBonus: number;
  critRateBonus: number;
  skillEffectBonus: number;
  description: string;
}

export const SUPPRESSION_TABLE: Record<number, ISuppressionEffect> = {
  1: {
    attackPenalty: 10,
    defensePenalty: 5,
    speedPenalty: 5,
    critRatePenalty: 3,
    skillEffectPenalty: 5,
    description: '对方境界稍高，你感受到一丝压力。',
  },
  2: {
    attackPenalty: 25,
    defensePenalty: 15,
    speedPenalty: 15,
    critRatePenalty: 10,
    skillEffectPenalty: 15,
    description: '对方境界高出不少，你的实力受到压制。',
  },
  3: {
    attackPenalty: 45,
    defensePenalty: 30,
    speedPenalty: 30,
    critRatePenalty: 20,
    skillEffectPenalty: 30,
    description: '对方境界远超于你，巨大的威压让你难以发挥实力！',
  },
  4: {
    attackPenalty: 70,
    defensePenalty: 50,
    speedPenalty: 50,
    critRatePenalty: 35,
    skillEffectPenalty: 50,
    description: '对方境界碾压级差距，你几乎无法反抗！',
  },
  5: {
    attackPenalty: 90,
    defensePenalty: 70,
    speedPenalty: 70,
    critRatePenalty: 50,
    skillEffectPenalty: 70,
    description: '对方境界如同天堑，你被完全压制，毫无还手之力！',
  },
};

export const ADVANTAGE_TABLE: Record<number, IRealmAdvantage> = {
  1: {
    attackBonus: 10,
    defenseBonus: 5,
    speedBonus: 5,
    critRateBonus: 3,
    skillEffectBonus: 5,
    description: '对方境界稍低，你占据优势。',
  },
  2: {
    attackBonus: 25,
    defenseBonus: 15,
    speedBonus: 15,
    critRateBonus: 10,
    skillEffectBonus: 15,
    description: '对方境界低出不少，你占据明显优势。',
  },
  3: {
    attackBonus: 45,
    defenseBonus: 30,
    speedBonus: 30,
    critRateBonus: 20,
    skillEffectBonus: 30,
    description: '对方境界远低于你，巨大的威压让对方难以发挥！',
  },
  4: {
    attackBonus: 70,
    defenseBonus: 50,
    speedBonus: 50,
    critRateBonus: 35,
    skillEffectBonus: 50,
    description: '对方境界被你碾压，几乎毫无还手之力！',
  },
  5: {
    attackBonus: 90,
    defenseBonus: 70,
    speedBonus: 70,
    critRateBonus: 50,
    skillEffectBonus: 70,
    description: '对方境界如同蝼蚁，你可轻易碾压！',
  },
};

export function calculateRealmDifference(attackerRealm: CultivationRealm, defenderRealm: CultivationRealm): number {
  return attackerRealm - defenderRealm;
}

export function getSuppressionEffect(difference: number): ISuppressionEffect | null {
  if (difference >= 0) return null;
  const absDiff = Math.abs(difference);
  const clampedDiff = Math.min(absDiff, 5);
  return SUPPRESSION_TABLE[clampedDiff] || null;
}

export function getAdvantageEffect(difference: number): IRealmAdvantage | null {
  if (difference <= 0) return null;
  const clampedDiff = Math.min(difference, 5);
  return ADVANTAGE_TABLE[clampedDiff] || null;
}

export function applySuppressionToDamage(damage: number, suppression: ISuppressionEffect): number {
  return Math.floor(damage * (1 - suppression.attackPenalty / 100));
}

export function applyAdvantageToDamage(damage: number, advantage: IRealmAdvantage): number {
  return Math.floor(damage * (1 + advantage.attackBonus / 100));
}

export function checkCanChallenge(attackerRealm: CultivationRealm, defenderRealm: CultivationRealm): { canChallenge: boolean; reason?: string } {
  const diff = defenderRealm - attackerRealm;
  
  if (diff >= 5) {
    return {
      canChallenge: false,
      reason: '对方境界远超于你，巨大的威压让你无法靠近！',
    };
  }
  
  if (diff >= 3) {
    return {
      canChallenge: true,
      reason: '对方境界远超于你，战斗将受到巨大压制！',
    };
  }
  
  return { canChallenge: true };
}

export function calculateEscapeChanceWithSuppression(attackerRealm: CultivationRealm, defenderRealm: CultivationRealm, baseChance: number): number {
  const diff = attackerRealm - defenderRealm;
  
  if (diff >= 2) {
    return Math.min(100, baseChance + diff * 15);
  }
  
  if (diff <= -2) {
    return Math.max(0, baseChance + diff * 20);
  }
  
  return baseChance;
}