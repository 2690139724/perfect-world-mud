import { CultivationRealm } from './Player';

export enum CaveQuality {
  MORTAL = '凡洞天',
  SPIRIT = '灵洞天',
  DIVINE = '神洞天',
  IMMORTAL = '仙洞天',
}

export interface ICavePlant {
  id: string;
  plantId: string;
  name: string;
  plantedTime: number;
  growthStage: number;
  maxGrowthStage: number;
  harvestTime: number;
  yield: number;
}

export interface ICavePet {
  id: string;
  petId: string;
  name: string;
  level: number;
  exp: number;
  maxExp: number;
  attack: number;
  defense: number;
  loyalty: number;
}

export interface ICave {
  id: string;
  name: string;
  quality: CaveQuality;
  realm: CultivationRealm;
  spiritDensity: number;
  size: number;
  plants: ICavePlant[];
  pets: ICavePet[];
  decorations: string[];
  lastVisitTime: number;
}

export const CAVE_QUALITIES: Record<CaveQuality, { name: string; spiritBonus: number; maxSize: number }> = {
  [CaveQuality.MORTAL]: { name: '凡洞天', spiritBonus: 1.0, maxSize: 3 },
  [CaveQuality.SPIRIT]: { name: '灵洞天', spiritBonus: 1.5, maxSize: 5 },
  [CaveQuality.DIVINE]: { name: '神洞天', spiritBonus: 2.0, maxSize: 8 },
  [CaveQuality.IMMORTAL]: { name: '仙洞天', spiritBonus: 3.0, maxSize: 12 },
};

export const SEED_PLANTS: Record<string, { name: string; growthTime: number; maxStage: number; yield: number; seedId: string }> = {
  lingcao: { name: '灵草', growthTime: 300000, maxStage: 3, yield: 2, seedId: 'seed_lingcao' },
  xuelinghua: { name: '血灵花', growthTime: 600000, maxStage: 5, yield: 3, seedId: 'seed_xuelinghua' },
  ningxiangcao: { name: '凝神草', growthTime: 900000, maxStage: 5, yield: 2, seedId: 'seed_ningxiangcao' },
  moon_grass: { name: '月光草', growthTime: 1200000, maxStage: 7, yield: 1, seedId: 'seed_moon_grass' },
  dragon_saliva: { name: '龙涎草', growthTime: 1800000, maxStage: 9, yield: 1, seedId: 'seed_dragon_saliva' },
};

export const SEED_PETS: Record<string, { name: string; baseAttack: number; baseDefense: number; expPerLevel: number }> = {
  spirit_fox: { name: '灵狐', baseAttack: 5, baseDefense: 3, expPerLevel: 100 },
  wind_hawk: { name: '风鹰', baseAttack: 8, baseDefense: 2, expPerLevel: 150 },
  stone_beast: { name: '石兽', baseAttack: 6, baseDefense: 8, expPerLevel: 120 },
  fire_lion: { name: '火狮', baseAttack: 12, baseDefense: 6, expPerLevel: 200 },
};