import { CultivationRealm } from './Player';

export enum PillGrade {
  MORTAL = '凡丹',
  SPIRIT = '灵丹',
  TREASURE = '宝丹',
  SAINT = '圣丹',
  DIVINE = '神丹',
  IMMORTAL = '仙丹',
  EMPEROR = '帝丹',
}

export const PILL_GRADE_COLOR: Record<PillGrade, string> = {
  [PillGrade.MORTAL]: '#9CA3AF',
  [PillGrade.SPIRIT]: '#10B981',
  [PillGrade.TREASURE]: '#3B82F6',
  [PillGrade.SAINT]: '#8B5CF6',
  [PillGrade.DIVINE]: '#F59E0B',
  [PillGrade.IMMORTAL]: '#EC4899',
  [PillGrade.EMPEROR]: '#DC2626',
};

export const PILL_GRADE_STARS: Record<PillGrade, number> = {
  [PillGrade.MORTAL]: 1,
  [PillGrade.SPIRIT]: 2,
  [PillGrade.TREASURE]: 3,
  [PillGrade.SAINT]: 4,
  [PillGrade.DIVINE]: 5,
  [PillGrade.IMMORTAL]: 6,
  [PillGrade.EMPEROR]: 7,
};

export const PILL_GRADE_DESC: Record<PillGrade, string> = {
  [PillGrade.MORTAL]: '凡人修士常用的基础丹药，药性温和。',
  [PillGrade.SPIRIT]: '蕴含灵气的丹药，化灵境修士标配。',
  [PillGrade.TREASURE]: '宝辉流转的丹药，每一颗都价值不菲。',
  [PillGrade.SAINT]: '圣级丹药，以圣药为主料，药力磅礴。',
  [PillGrade.DIVINE]: '神级丹药，神药炼制，有神妙莫测之能。',
  [PillGrade.IMMORTAL]: '仙级丹药，仙药所化，可遇而不可求。',
  [PillGrade.EMPEROR]: '帝级丹药，不死药炼制，一枚可换一片天。',
};

export enum PillStar {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

export const PILL_STAR_NAMES: Record<PillStar, string> = {
  [PillStar.ONE]: '下品',
  [PillStar.TWO]: '中品',
  [PillStar.THREE]: '上品',
};

export enum PillEffect {
  HEAL = 'heal',
  MANA_RESTORE = 'mana_restore',
  EXP_BOOST = 'exp_boost',
  ATTACK_BOOST = 'attack_boost',
  DEFENSE_BOOST = 'defense_boost',
  SPEED_BOOST = 'speed_boost',
  CRIT_BOOST = 'crit_boost',
  REALM_BOOST = 'realm_boost',
}

export interface IAlchemyRecipe {
  id: string;
  name: string;
  grade: PillGrade;
  description: string;
  requiredRealm: CultivationRealm;
  ingredients: { id: string; amount: number }[];
  effect: {
    type: PillEffect;
    value: number;
    duration?: number;
  };
  successRate: number;
  baseCount: number;
  failureProduct?: { id: string; amount: number };
  pillItemId?: string;
}

export interface IAlchemySkill {
  level: number;
  exp: number;
  maxExp: number;
}

export const PILL_GRADE_BONUS: Record<PillGrade, { successRateBonus: number; effectBonus: number }> = {
  [PillGrade.MORTAL]: { successRateBonus: 0.15, effectBonus: 1.0 },
  [PillGrade.SPIRIT]: { successRateBonus: 0.1, effectBonus: 1.4 },
  [PillGrade.TREASURE]: { successRateBonus: 0.05, effectBonus: 1.8 },
  [PillGrade.SAINT]: { successRateBonus: 0, effectBonus: 2.4 },
  [PillGrade.DIVINE]: { successRateBonus: -0.05, effectBonus: 3.2 },
  [PillGrade.IMMORTAL]: { successRateBonus: -0.1, effectBonus: 4.2 },
  [PillGrade.EMPEROR]: { successRateBonus: -0.15, effectBonus: 5.5 },
};

export const PILL_STAR_MULTIPLIER: Record<PillStar, number> = {
  [PillStar.ONE]: 0.7,
  [PillStar.TWO]: 1.0,
  [PillStar.THREE]: 1.5,
};

export function rollPillStar(qualityBonus: number, alchemyLevel: number = 1): PillStar {
  const base = 0.3 + qualityBonus + alchemyLevel * 0.02;
  const roll = Math.random();
  const threeStarChance = Math.max(0.05, 0.05 + base * 0.25);
  const twoStarChance = Math.max(0.3, 0.3 + base * 0.35);
  if (roll < threeStarChance) return PillStar.THREE;
  if (roll < threeStarChance + twoStarChance) return PillStar.TWO;
  return PillStar.ONE;
}

export function rollPillCount(baseCount: number, star: PillStar): number {
  const starBonus: Record<PillStar, number> = {
    [PillStar.ONE]: -0.25,
    [PillStar.TWO]: 0,
    [PillStar.THREE]: 0.35,
  };
  const mult = 1 + starBonus[star];
  const count = Math.max(1, Math.round(baseCount * mult + (Math.random() - 0.5)));
  return count;
}

export function formatPillStars(star: PillStar): string {
  return '★'.repeat(star) + '☆'.repeat(3 - star);
}

export function getPillGradeOrder(grade: PillGrade): number {
  const order: Record<PillGrade, number> = {
    [PillGrade.MORTAL]: 1,
    [PillGrade.SPIRIT]: 2,
    [PillGrade.TREASURE]: 3,
    [PillGrade.SAINT]: 4,
    [PillGrade.DIVINE]: 5,
    [PillGrade.IMMORTAL]: 6,
    [PillGrade.EMPEROR]: 7,
  };
  return order[grade] || 0;
}

export const ALCHEMY_RECIPES: IAlchemyRecipe[] = [
  {
    id: 'recipe_heal_pill',
    name: '疗伤丹',
    grade: PillGrade.MORTAL,
    description: '基础疗伤丹药，可恢复少量气血。',
    requiredRealm: CultivationRealm.BLOOD_MOVING,
    ingredients: [{ id: 'xuelinghua', amount: 1 }, { id: 'lingcao', amount: 2 }],
    effect: { type: PillEffect.HEAL, value: 50 },
    successRate: 0.85,
    baseCount: 3,
    pillItemId: 'heal_potion',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
  {
    id: 'recipe_mana_pill',
    name: '灵力丹',
    grade: PillGrade.MORTAL,
    description: '基础灵力丹药，可恢复少量灵力。',
    requiredRealm: CultivationRealm.BLOOD_MOVING,
    ingredients: [{ id: 'ningxiangcao', amount: 1 }, { id: 'lingcao', amount: 2 }],
    effect: { type: PillEffect.MANA_RESTORE, value: 30 },
    successRate: 0.85,
    baseCount: 3,
    pillItemId: 'mana_potion',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
  {
    id: 'recipe_exp_pill',
    name: '聚气丹',
    grade: PillGrade.MORTAL,
    description: '可加速修炼的丹药，增加修为。',
    requiredRealm: CultivationRealm.CAVE,
    ingredients: [{ id: 'moon_grass', amount: 1 }, { id: 'xuelinghua', amount: 2 }],
    effect: { type: PillEffect.EXP_BOOST, value: 100 },
    successRate: 0.75,
    baseCount: 2,
    pillItemId: 'exp_pill',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
  {
    id: 'recipe_blood_pill',
    name: '精血丹',
    grade: PillGrade.SPIRIT,
    description: '以灵狐之血炼制的丹药，可增强气血。',
    requiredRealm: CultivationRealm.CAVE,
    ingredients: [{ id: 'fox_blood', amount: 1 }, { id: 'xuelinghua', amount: 3 }],
    effect: { type: PillEffect.ATTACK_BOOST, value: 10, duration: 3600000 },
    successRate: 0.7,
    baseCount: 2,
    pillItemId: 'blood_pill',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
  {
    id: 'recipe_spirit_pill',
    name: '凝元丹',
    grade: PillGrade.SPIRIT,
    description: '化灵境修士常用的修炼丹药。',
    requiredRealm: CultivationRealm.SPIRIT,
    ingredients: [{ id: 'dragon_saliva', amount: 1 }, { id: 'moon_grass', amount: 2 }],
    effect: { type: PillEffect.EXP_BOOST, value: 500 },
    successRate: 0.6,
    baseCount: 2,
    pillItemId: 'ningyuan_pill',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
  {
    id: 'recipe_treasure_pill',
    name: '宝元丹',
    grade: PillGrade.TREASURE,
    description: '宝级丹药，宝辉流转，药力精纯。',
    requiredRealm: CultivationRealm.ARRAY,
    ingredients: [{ id: 'spirit_crystal', amount: 1 }, { id: 'dragon_saliva', amount: 3 }],
    effect: { type: PillEffect.EXP_BOOST, value: 1500 },
    successRate: 0.5,
    baseCount: 1,
    pillItemId: 'baoyuan_pill',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
  {
    id: 'recipe_divine_pill',
    name: '神元丹',
    grade: PillGrade.DIVINE,
    description: '神级丹药，蕴含庞大的神力。',
    requiredRealm: CultivationRealm.VENERABLE,
    ingredients: [{ id: 'jiuyou_yinhuo', amount: 1 }, { id: 'spirit_crystal', amount: 3 }],
    effect: { type: PillEffect.EXP_BOOST, value: 3000 },
    successRate: 0.4,
    baseCount: 1,
    pillItemId: 'shenyuan_pill',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
  {
    id: 'recipe_immortal_pill',
    name: '仙元丹',
    grade: PillGrade.IMMORTAL,
    description: '仙级丹药，仙药所化，可遇而不可求。',
    requiredRealm: CultivationRealm.KING,
    ingredients: [{ id: 'immortal_herb', amount: 1 }, { id: 'chaos_crystal', amount: 2 }],
    effect: { type: PillEffect.EXP_BOOST, value: 5000 },
    successRate: 0.25,
    baseCount: 1,
    pillItemId: 'xianyuan_pill',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
  {
    id: 'recipe_emperor_pill',
    name: '帝元丹',
    grade: PillGrade.EMPEROR,
    description: '帝级丹药，不死药炼制，一枚可换一片天。',
    requiredRealm: CultivationRealm.TRUE_IMMORTAL,
    ingredients: [{ id: 'immortal_herb', amount: 2 }, { id: 'tianming_pearl', amount: 1 }],
    effect: { type: PillEffect.EXP_BOOST, value: 10000 },
    successRate: 0.15,
    baseCount: 1,
    pillItemId: 'diyuan_pill',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
  {
    id: 'recipe_fuyuan_pill',
    name: '复元丹',
    grade: PillGrade.TREASURE,
    description: '可恢复大量气血和灵力的高级丹药。',
    requiredRealm: CultivationRealm.ARRAY,
    ingredients: [{ id: 'shenmu_zhihua', amount: 1 }, { id: 'dragon_saliva', amount: 2 }],
    effect: { type: PillEffect.HEAL, value: 300 },
    successRate: 0.55,
    baseCount: 2,
    pillItemId: 'fuyuan_pill',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
  {
    id: 'recipe_gongji_pill',
    name: '攻击丹',
    grade: PillGrade.SPIRIT,
    description: '临时提升攻击力的丹药。',
    requiredRealm: CultivationRealm.SPIRIT,
    ingredients: [{ id: 'fox_blood', amount: 2 }, { id: 'spirit_crystal', amount: 1 }],
    effect: { type: PillEffect.ATTACK_BOOST, value: 20, duration: 1800000 },
    successRate: 0.65,
    baseCount: 2,
    pillItemId: 'gongji_pill',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
  {
    id: 'recipe_fangyu_pill',
    name: '防御丹',
    grade: PillGrade.SPIRIT,
    description: '临时提升防御力的丹药。',
    requiredRealm: CultivationRealm.SPIRIT,
    ingredients: [{ id: 'beast_bone', amount: 3 }, { id: 'spirit_crystal', amount: 1 }],
    effect: { type: PillEffect.DEFENSE_BOOST, value: 20, duration: 1800000 },
    successRate: 0.65,
    baseCount: 2,
    pillItemId: 'fangyu_pill',
    failureProduct: { id: 'failed_pill', amount: 1 },
  },
];

export function findRecipe(id: string): IAlchemyRecipe | undefined {
  return ALCHEMY_RECIPES.find(r => r.id === id);
}
