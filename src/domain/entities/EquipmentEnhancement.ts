export interface IEquipmentEnhancement {
  level: number;
  maxLevel: number;
  successRate: number;
  materials: Record<string, number>;
  bonusStats: Record<string, number>;
}

export interface IEquipmentRefine {
  level: number;
  maxLevel: number;
  materials: Record<string, number>;
  bonusPercent: number;
}

export interface IEquipmentSet {
  id: string;
  name: string;
  pieces: string[];
  bonuses: {
    count: number;
    effects: Record<string, number>;
    description: string;
  }[];
}

export const ENHANCEMENT_CONFIG = {
  maxLevel: 15,
  baseSuccessRate: 0.9,
  successRateDecay: 0.05,
};

export const ENHANCEMENT_MATERIALS: Record<number, Record<string, number>> = {
  1: { iron_ore: 5, spirit_crystal: 1 },
  2: { iron_ore: 10, spirit_crystal: 2 },
  3: { iron_ore: 15, spirit_crystal: 3 },
  4: { iron_ore: 20, spirit_crystal: 5 },
  5: { ancient_bone: 3, spirit_crystal: 8 },
  6: { ancient_bone: 5, spirit_crystal: 10 },
  7: { ancient_bone: 8, soul_fragment: 2, spirit_crystal: 15 },
  8: { ancient_bone: 10, soul_fragment: 3, spirit_crystal: 20 },
  9: { soul_fragment: 5, spirit_crystal: 30 },
  10: { soul_fragment: 8, spirit_crystal: 50 },
  11: { soul_fragment: 10, ancient_bone: 20, spirit_crystal: 80 },
  12: { soul_fragment: 15, ancient_bone: 30, spirit_crystal: 120 },
  13: { soul_fragment: 20, ancient_bone: 50, spirit_crystal: 200 },
  14: { soul_fragment: 30, ancient_bone: 80, spirit_crystal: 350 },
  15: { soul_fragment: 50, ancient_bone: 100, spirit_crystal: 500 },
};

export const REFINE_MATERIALS: Record<number, Record<string, number>> = {
  1: { stone_core: 3 },
  2: { stone_core: 5 },
  3: { stone_core: 8, spirit_crystal: 5 },
  4: { stone_core: 12, spirit_crystal: 10 },
  5: { stone_core: 20, soul_fragment: 2, spirit_crystal: 20 },
};

export const EQUIPMENT_SETS: IEquipmentSet[] = [
  {
    id: 'set_stone_tribe',
    name: '石族套装',
    pieces: ['stone_sword', 'stone_armor', 'stone_boots'],
    bonuses: [
      { count: 2, effects: { defense: 10 }, description: '装备2件：防御+10' },
      { count: 3, effects: { attack: 15, defense: 15 }, description: '装备3件：攻击+15，防御+15' },
    ],
  },
  {
    id: 'set_immortal',
    name: '仙人套装',
    pieces: ['immortal_sword', 'immortal_armor', 'immortal_boots', 'immortal_ring'],
    bonuses: [
      { count: 2, effects: { hp: 50 }, description: '装备2件：气血+50' },
      { count: 3, effects: { attack: 20, defense: 20 }, description: '装备3件：攻击+20，防御+20' },
      { count: 4, effects: { attack: 50, defense: 50, speed: 10 }, description: '装备4件：攻击+50，防御+50，速度+10' },
    ],
  },
];

export function calculateEnhancementSuccessRate(currentLevel: number): number {
  return Math.max(0.3, ENHANCEMENT_CONFIG.baseSuccessRate - currentLevel * ENHANCEMENT_CONFIG.successRateDecay);
}

export function calculateEnhancementBonus(baseStats: Record<string, number>, level: number): Record<string, number> {
  const bonus: Record<string, number> = {};
  for (const [key, value] of Object.entries(baseStats)) {
    bonus[key] = Math.floor(value * level * 0.15);
  }
  return bonus;
}