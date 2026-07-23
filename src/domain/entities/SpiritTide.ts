export enum TideType {
  LOW = '低潮',
  NORMAL = '常潮',
  HIGH = '高潮',
  PEAK = '巅峰',
  TIDAL_WAVE = '潮汐',
}

export interface ISpiritTide {
  type: TideType;
  startTime: number;
  duration: number;
  intensity: number;
  region: string;
}

export interface ITideEffect {
  cultivationBonus: number;
  manaRecoveryBonus: number;
  insightChanceBonus: number;
  deviationRiskBonus: number;
  specialEffects: string[];
}

export const TIDE_CONFIG: Record<TideType, ITideEffect> = {
  [TideType.LOW]: {
    cultivationBonus: 0.5,
    manaRecoveryBonus: 0.5,
    insightChanceBonus: -0.02,
    deviationRiskBonus: 0.02,
    specialEffects: ['灵气稀薄，修炼效率降低'],
  },
  [TideType.NORMAL]: {
    cultivationBonus: 1.0,
    manaRecoveryBonus: 1.0,
    insightChanceBonus: 0,
    deviationRiskBonus: 0,
    specialEffects: [],
  },
  [TideType.HIGH]: {
    cultivationBonus: 1.5,
    manaRecoveryBonus: 1.2,
    insightChanceBonus: 0.02,
    deviationRiskBonus: 0,
    specialEffects: ['灵气充沛，修炼效率提升'],
  },
  [TideType.PEAK]: {
    cultivationBonus: 2.0,
    manaRecoveryBonus: 1.5,
    insightChanceBonus: 0.05,
    deviationRiskBonus: -0.02,
    specialEffects: ['灵气浓郁，修炼事半功倍', '顿悟几率提升'],
  },
  [TideType.TIDAL_WAVE]: {
    cultivationBonus: 3.0,
    manaRecoveryBonus: 2.0,
    insightChanceBonus: 0.1,
    deviationRiskBonus: 0.05,
    specialEffects: ['天地灵气潮汐降临！', '修炼效率大幅提升', '顿悟几率大增', '走火入魔风险提升'],
  },
};

export const TIDE_DURATION: Record<TideType, number> = {
  [TideType.LOW]: 300000,
  [TideType.NORMAL]: 1200000,
  [TideType.HIGH]: 600000,
  [TideType.PEAK]: 300000,
  [TideType.TIDAL_WAVE]: 120000,
};

export const TIDE_CHANCES: Record<TideType, number> = {
  [TideType.LOW]: 0.15,
  [TideType.NORMAL]: 0.50,
  [TideType.HIGH]: 0.25,
  [TideType.PEAK]: 0.08,
  [TideType.TIDAL_WAVE]: 0.02,
};

export function generateTide(currentTime: number, region: string): ISpiritTide {
  const rand = Math.random();
  let cumulative = 0;
  
  for (const [type, chance] of Object.entries(TIDE_CHANCES)) {
    cumulative += chance;
    if (rand < cumulative) {
      return {
        type: type as TideType,
        startTime: currentTime,
        duration: TIDE_DURATION[type as TideType],
        intensity: getTideIntensity(type as TideType),
        region,
      };
    }
  }
  
  return {
    type: TideType.NORMAL,
    startTime: currentTime,
    duration: TIDE_DURATION[TideType.NORMAL],
    intensity: 1.0,
    region,
  };
}

function getTideIntensity(type: TideType): number {
  const base = {
    [TideType.LOW]: 0.5,
    [TideType.NORMAL]: 1.0,
    [TideType.HIGH]: 1.5,
    [TideType.PEAK]: 2.0,
    [TideType.TIDAL_WAVE]: 3.0,
  };
  return base[type] * (0.9 + Math.random() * 0.2);
}

export function isTideActive(tide: ISpiritTide, currentTime: number): boolean {
  return currentTime >= tide.startTime && currentTime < tide.startTime + tide.duration;
}

export function getRemainingTime(tide: ISpiritTide, currentTime: number): number {
  return Math.max(0, tide.startTime + tide.duration - currentTime);
}

export function formatTideTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}