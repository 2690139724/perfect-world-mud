/**
 * 可学习的丹方数据
 * 每个丹方有品阶，炼丹师品阶达到要求才能学习
 */

import { RecipeGrade, RECIPE_GRADE_LEVEL } from '../../domain/entities/ProfessionGrade';

export interface IAlchemyRecipeData {
  id: string;
  name: string;
  grade: RecipeGrade;
  description: string;
  origin: string;                         // 出处/典故
  requiredGrade: number;                  // 需要的炼丹师品阶等级
  ingredients: { id: string; amount: number }[];
  outputItemId: string;                   // 炼制出的丹药ID
  outputAmount: number;                   // 基础产出数量
  successRate: number;                    // 基础成功率
  expReward: number;                      // 学习获得的经验
  cultivationExp: number;                 // 炼制成功获得的炼丹经验
  learnCost: number;                      // 学习消耗灵石
}

export const ALCHEMY_RECIPES_DATA: IAlchemyRecipeData[] = [
  // ==================== 凡级丹方 ====================
  {
    id: 'recipe_small_heal',
    name: '小还丹丹方',
    grade: RecipeGrade.MORTAL,
    description: '基础疗伤丹药，可恢复少量气血。',
    origin: '凡人修仙传：韩立早期常用的疗伤丹药',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.MORTAL],
    ingredients: [{ id: 'blood_ginseng', amount: 1 }, { id: 'spirit_grass', amount: 2 }],
    outputItemId: 'minor_heal_pill',
    outputAmount: 3,
    successRate: 0.9,
    expReward: 10,
    cultivationExp: 5,
    learnCost: 50,
  },
  {
    id: 'recipe_mana_pill',
    name: '回气丹丹方',
    grade: RecipeGrade.MORTAL,
    description: '恢复法力的基础丹药。',
    origin: '基础丹方',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.MORTAL],
    ingredients: [{ id: 'spirit_grass', amount: 3 }, { id: 'spirit_liquid', amount: 1 }],
    outputItemId: 'spirit_gather_pill',
    outputAmount: 3,
    successRate: 0.85,
    expReward: 10,
    cultivationExp: 5,
    learnCost: 50,
  },
  {
    id: 'recipe_body_pill',
    name: '锻体丹丹方',
    grade: RecipeGrade.MORTAL,
    description: '强化肉身的基础丹药。',
    origin: '完美世界：石族常用',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.MORTAL],
    ingredients: [{ id: 'iron_ore', amount: 2 }, { id: 'blood_ginseng', amount: 1 }],
    outputItemId: 'body_tempering_elixir',
    outputAmount: 2,
    successRate: 0.8,
    expReward: 15,
    cultivationExp: 8,
    learnCost: 80,
  },

  // ==================== 灵级丹方 ====================
  {
    id: 'recipe_big_heal',
    name: '大还丹丹方',
    grade: RecipeGrade.SPIRIT,
    description: '强效疗伤丹药，可恢复大量气血。',
    origin: '凡人修仙传：韩立中期常用的疗伤丹药',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.SPIRIT],
    ingredients: [{ id: 'blood_ginseng', amount: 3 }, { id: 'snow_lotus', amount: 1 }],
    outputItemId: 'major_heal_pill',
    outputAmount: 2,
    successRate: 0.75,
    expReward: 30,
    cultivationExp: 15,
    learnCost: 200,
  },
  {
    id: 'recipe_gathering_pill',
    name: '聚灵丹丹方',
    grade: RecipeGrade.SPIRIT,
    description: '聚集灵气加速修炼。',
    origin: '斗破苍穹：萧炎常用',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.SPIRIT],
    ingredients: [{ id: 'spirit_liquid', amount: 2 }, { id: 'moon_grass', amount: 1 }],
    outputItemId: 'spirit_gather_pill',
    outputAmount: 2,
    successRate: 0.7,
    expReward: 40,
    cultivationExp: 20,
    learnCost: 300,
  },
  {
    id: 'recipe_power_pill',
    name: '神力丹丹方',
    grade: RecipeGrade.SPIRIT,
    description: '临时提升力量的丹药。',
    origin: '通用丹方',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.SPIRIT],
    ingredients: [{ id: 'tiger_bone', amount: 2 }, { id: 'spirit_liquid', amount: 1 }],
    outputItemId: 'power_pill',
    outputAmount: 2,
    successRate: 0.65,
    expReward: 35,
    cultivationExp: 18,
    learnCost: 250,
  },
  {
    id: 'recipe_agility_pill',
    name: '轻身丹丹方',
    grade: RecipeGrade.SPIRIT,
    description: '临时提升速度的丹药。',
    origin: '通用丹方',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.SPIRIT],
    ingredients: [{ id: 'wind_eye', amount: 1 }, { id: 'spirit_grass', amount: 2 }],
    outputItemId: 'agility_pill',
    outputAmount: 2,
    successRate: 0.65,
    expReward: 35,
    cultivationExp: 18,
    learnCost: 250,
  },

  // ==================== 宝级丹方 ====================
  {
    id: 'recipe_soul_heal',
    name: '回魂丹丹方',
    grade: RecipeGrade.TREASURE,
    description: '修复神魂的珍贵丹药。',
    origin: '凡人修仙传：韩立后期炼制',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.TREASURE],
    ingredients: [{ id: 'ghost_mushroom', amount: 2 }, { id: 'spirit_crystal', amount: 1 }],
    outputItemId: 'soul_heal_pill',
    outputAmount: 1,
    successRate: 0.55,
    expReward: 80,
    cultivationExp: 40,
    learnCost: 800,
  },
  {
    id: 'recipe_breakthrough_pill',
    name: '破境丹丹方',
    grade: RecipeGrade.TREASURE,
    description: '帮助突破境界的丹药。',
    origin: '斗破苍穹：萧炎后期炼制',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.TREASURE],
    ingredients: [{ id: 'dragon_saliva', amount: 1 }, { id: 'spirit_crystal', amount: 2 }],
    outputItemId: 'breakthrough_pill',
    outputAmount: 1,
    successRate: 0.5,
    expReward: 100,
    cultivationExp: 50,
    learnCost: 1000,
  },
  {
    id: 'recipe_iron_skin',
    name: '铁骨丹丹方',
    grade: RecipeGrade.TREASURE,
    description: '大幅提升防御的丹药。',
    origin: '通用丹方',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.TREASURE],
    ingredients: [{ id: 'black_iron', amount: 3 }, { id: 'tiger_bone', amount: 2 }],
    outputItemId: 'iron_skin_pill',
    outputAmount: 1,
    successRate: 0.6,
    expReward: 70,
    cultivationExp: 35,
    learnCost: 600,
  },

  // ==================== 圣级丹方 ====================
  {
    id: 'recipe_nascent_soul',
    name: '化婴丹丹方',
    grade: RecipeGrade.SAINT,
    description: '帮助金丹修士化婴的圣丹。',
    origin: '凡人修仙传：韩立用虚天鼎灵药炼制',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.SAINT],
    ingredients: [{ id: 'phoenix_feather_material', amount: 1 }, { id: 'dragon_saliva', amount: 2 }],
    outputItemId: 'nascent_soul_pill_2',
    outputAmount: 1,
    successRate: 0.4,
    expReward: 200,
    cultivationExp: 100,
    learnCost: 3000,
  },
  {
    id: 'recipe_fire_pill',
    name: '火菩丹丹方',
    grade: RecipeGrade.SAINT,
    description: '提升火属性斗气的顶级丹药。',
    origin: '斗破苍穹：萧炎炼制的顶级丹药',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.SAINT],
    ingredients: [{ id: 'fire_essence', amount: 1 }, { id: 'phoenix_iron', amount: 1 }],
    outputItemId: 'phoenix_essence_pill',
    outputAmount: 1,
    successRate: 0.45,
    expReward: 180,
    cultivationExp: 90,
    learnCost: 2500,
  },
  {
    id: 'recipe_wisdom',
    name: '慧心丹丹方',
    grade: RecipeGrade.SAINT,
    description: '大幅提升悟性的珍贵丹药。',
    origin: '完美世界：石族秘传',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.SAINT],
    ingredients: [{ id: 'immortal_copper', amount: 1 }, { id: 'sun_moon_stone', amount: 2 }],
    outputItemId: 'wisdom_pill',
    outputAmount: 1,
    successRate: 0.5,
    expReward: 150,
    cultivationExp: 75,
    learnCost: 2000,
  },

  // ==================== 神级丹方 ====================
  {
    id: 'recipe_deity_pill',
    name: '化神丹丹方',
    grade: RecipeGrade.DIVINE,
    description: '帮助元婴修士化神的神丹。',
    origin: '凡人修仙传：韩立后期炼制',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.DIVINE],
    ingredients: [{ id: 'dragon_crystal', amount: 1 }, { id: 'chaos_stone', amount: 1 }],
    outputItemId: 'deity_transform_pill',
    outputAmount: 1,
    successRate: 0.35,
    expReward: 400,
    cultivationExp: 200,
    learnCost: 8000,
  },
  {
    id: 'recipe_killing_pill',
    name: '杀戮丹丹方',
    grade: RecipeGrade.DIVINE,
    description: '蕴含杀戮本源的神丹。',
    origin: '仙逆：王林炼制',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.DIVINE],
    ingredients: [{ id: 'killing_essence', amount: 1 }, { id: 'ancient_god_blood', amount: 1 }],
    outputItemId: 'killing_pill',
    outputAmount: 1,
    successRate: 0.3,
    expReward: 500,
    cultivationExp: 250,
    learnCost: 10000,
  },
  {
    id: 'recipe_desolate_pill',
    name: '荒道丹丹方',
    grade: RecipeGrade.DIVINE,
    description: '蕴含荒道法则的神丹。',
    origin: '完美世界：荒天帝传承',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.DIVINE],
    ingredients: [{ id: 'desolate_essence', amount: 1 }, { id: 'desolate_soil', amount: 2 }],
    outputItemId: 'desolate_pill',
    outputAmount: 1,
    successRate: 0.35,
    expReward: 450,
    cultivationExp: 220,
    learnCost: 9000,
  },

  // ==================== 仙级丹方 ====================
  {
    id: 'recipe_void_pill',
    name: '炼虚丹丹方',
    grade: RecipeGrade.IMMORTAL,
    description: '帮助化神修士炼虚的仙丹。',
    origin: '凡人修仙传：韩立后期炼制',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.IMMORTAL],
    ingredients: [{ id: 'space_crystal', amount: 1 }, { id: 'chaos_stone', amount: 2 }],
    outputItemId: 'void_refining_pill',
    outputAmount: 1,
    successRate: 0.25,
    expReward: 800,
    cultivationExp: 400,
    learnCost: 30000,
  },
  {
    id: 'recipe_immortal_pill',
    name: '仙元丹丹方',
    grade: RecipeGrade.IMMORTAL,
    description: '完美世界仙王级丹药。',
    origin: '完美世界：仙王炼制',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.IMMORTAL],
    ingredients: [{ id: 'immortal_copper', amount: 2 }, { id: 'god_spring_water', amount: 1 }],
    outputItemId: 'immortal_pill_perfect',
    outputAmount: 1,
    successRate: 0.2,
    expReward: 1000,
    cultivationExp: 500,
    learnCost: 50000,
  },
  {
    id: 'recipe_emperor_pill',
    name: '帝丹丹方',
    grade: RecipeGrade.IMMORTAL,
    description: '遮天大帝级丹药。',
    origin: '遮天：大帝炼制',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.IMMORTAL],
    ingredients: [{ id: 'nine_life_fruit', amount: 1 }, { id: 'heavenly_stone', amount: 2 }],
    outputItemId: 'emperor_pill',
    outputAmount: 1,
    successRate: 0.15,
    expReward: 1200,
    cultivationExp: 600,
    learnCost: 80000,
  },

  // ==================== 帝级丹方 ====================
  {
    id: 'recipe_rebirth_pill',
    name: '重生丹丹方',
    grade: RecipeGrade.EMPEROR,
    description: '可让人死后重生的神丹。',
    origin: '仙逆：王林炼制',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.EMPEROR],
    ingredients: [{ id: 'time_sand', amount: 1 }, { id: 'killing_essence', amount: 2 }],
    outputItemId: 'rebirth_pill',
    outputAmount: 1,
    successRate: 0.1,
    expReward: 2000,
    cultivationExp: 1000,
    learnCost: 200000,
  },
  {
    id: 'recipe_heaven_pill',
    name: '逆天道丹丹方',
    grade: RecipeGrade.EMPEROR,
    description: '可逆转天道的至高丹药。',
    origin: '仙逆：王林炼制',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.EMPEROR],
    ingredients: [{ id: 'heavenly_reverse_stone', amount: 1 }, { id: 'primordial_matter', amount: 1 }],
    outputItemId: 'reverse_heaven_pill',
    outputAmount: 1,
    successRate: 0.08,
    expReward: 3000,
    cultivationExp: 1500,
    learnCost: 500000,
  },
  {
    id: 'recipe_desolate_emperor',
    name: '荒帝丹丹方',
    grade: RecipeGrade.EMPEROR,
    description: '荒天帝本命丹药，蕴含荒道法则。',
    origin: '完美世界：荒天帝传承',
    requiredGrade: RECIPE_GRADE_LEVEL[RecipeGrade.EMPEROR],
    ingredients: [{ id: 'desolate_essence', amount: 2 }, { id: 'primordial_matter', amount: 1 }],
    outputItemId: 'desolate_emperor_pill',
    outputAmount: 1,
    successRate: 0.1,
    expReward: 2500,
    cultivationExp: 1200,
    learnCost: 300000,
  },
];

/**
 * 根据ID查找丹方
 */
export function findAlchemyRecipeById(id: string): IAlchemyRecipeData | undefined {
  return ALCHEMY_RECIPES_DATA.find(r => r.id === id);
}

/**
 * 获取指定品阶的所有丹方
 */
export function getAlchemyRecipesByGrade(grade: RecipeGrade): IAlchemyRecipeData[] {
  return ALCHEMY_RECIPES_DATA.filter(r => r.grade === grade);
}

/**
 * 获取炼丹师可以学习的所有丹方
 */
export function getLearnableAlchemyRecipes(alchemistLevel: number): IAlchemyRecipeData[] {
  return ALCHEMY_RECIPES_DATA.filter(r => r.requiredGrade <= alchemistLevel);
}

/**
 * 检查是否可以学习某丹方
 */
export function canLearnAlchemyRecipe(alchemistLevel: number, recipeId: string): boolean {
  const recipe = findAlchemyRecipeById(recipeId);
  if (!recipe) return false;
  return alchemistLevel >= recipe.requiredGrade;
}