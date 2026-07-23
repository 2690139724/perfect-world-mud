import { ItemType } from '../../domain/entities/Item';

export interface IAlchemyRecipe {
  id: string;
  name: string;
  outputId: string;
  outputAmount: number;
  materials: Record<string, number>;
  successRate: number;
  minRealm: number;
  description: string;
}

export interface IForgeRecipe {
  id: string;
  name: string;
  outputId: string;
  materials: Record<string, number>;
  successRate: number;
  minRealm: number;
  description: string;
}

export const ALCHEMY_RECIPES: IAlchemyRecipe[] = [
  {
    id: 'recipe_heal_pill',
    name: '疗伤丹',
    outputId: 'heal_potion',
    outputAmount: 3,
    materials: { xuelinghua: 1, lingcao: 2 },
    successRate: 0.85,
    minRealm: 1,
    description: '基础疗伤丹药，可恢复少量气血。',
  },
  {
    id: 'recipe_mana_pill',
    name: '灵力丹',
    outputId: 'mana_potion',
    outputAmount: 3,
    materials: { ningxiangcao: 1, lingcao: 2 },
    successRate: 0.85,
    minRealm: 1,
    description: '基础灵力丹药，可恢复少量灵力。',
  },
  {
    id: 'recipe_exp_pill',
    name: '聚气丹',
    outputId: 'exp_pill',
    outputAmount: 2,
    materials: { moon_grass: 1, xuelinghua: 2 },
    successRate: 0.75,
    minRealm: 2,
    description: '可加速修炼的丹药，增加修为。',
  },
  {
    id: 'recipe_blood_pill',
    name: '精血丹',
    outputId: 'blood_pill',
    outputAmount: 2,
    materials: { fox_blood: 1, xuelinghua: 3 },
    successRate: 0.7,
    minRealm: 2,
    description: '以灵狐之血炼制的丹药，可增强气血。',
  },
  {
    id: 'recipe_spirit_pill',
    name: '凝元丹',
    outputId: 'ningyuan_pill',
    outputAmount: 2,
    materials: { dragon_saliva: 1, moon_grass: 2 },
    successRate: 0.6,
    minRealm: 3,
    description: '化灵境修士常用的修炼丹药。',
  },
  {
    id: 'recipe_treasure_pill',
    name: '宝元丹',
    outputId: 'baoyuan_pill',
    outputAmount: 1,
    materials: { spirit_crystal: 1, dragon_saliva: 3 },
    successRate: 0.5,
    minRealm: 4,
    description: '宝级丹药，宝辉流转，药力精纯。',
  },
  {
    id: 'recipe_divine_pill',
    name: '神元丹',
    outputId: 'shenyuan_pill',
    outputAmount: 1,
    materials: { jiuyou_yinhuo: 1, spirit_crystal: 3 },
    successRate: 0.4,
    minRealm: 6,
    description: '神级丹药，蕴含庞大的神力。',
  },
  {
    id: 'recipe_immortal_pill',
    name: '仙元丹',
    outputId: 'xianyuan_pill',
    outputAmount: 1,
    materials: { immortal_herb: 1, chaos_crystal: 2 },
    successRate: 0.25,
    minRealm: 7,
    description: '仙级丹药，仙药所化，可遇而不可求。',
  },
  {
    id: 'recipe_emperor_pill',
    name: '帝元丹',
    outputId: 'diyuan_pill',
    outputAmount: 1,
    materials: { immortal_herb: 2, Tianming_pearl: 1 },
    successRate: 0.15,
    minRealm: 8,
    description: '帝级丹药，不死药炼制，一枚可换一片天。',
  },
  {
    id: 'recipe_fuyuan_pill',
    name: '复元丹',
    outputId: 'fuyuan_pill',
    outputAmount: 2,
    materials: { shenmu_zhihua: 1, dragon_saliva: 2 },
    successRate: 0.55,
    minRealm: 4,
    description: '可恢复大量气血和灵力的高级丹药。',
  },
  {
    id: 'recipe_gongji_pill',
    name: '攻击丹',
    outputId: 'gongji_pill',
    outputAmount: 2,
    materials: { fox_blood: 2, spirit_crystal: 1 },
    successRate: 0.65,
    minRealm: 3,
    description: '临时提升攻击力的丹药。',
  },
  {
    id: 'recipe_fangyu_pill',
    name: '防御丹',
    outputId: 'fangyu_pill',
    outputAmount: 2,
    materials: { beast_bone: 3, spirit_crystal: 1 },
    successRate: 0.65,
    minRealm: 3,
    description: '临时提升防御力的丹药。',
  },
];

export const FORGE_RECIPES: IForgeRecipe[] = [
  {
    id: 'forge_iron_sword',
    name: '粗铁剑',
    outputId: 'iron_sword',
    materials: { iron_ore: 5 },
    successRate: 0.9,
    minRealm: 1,
    description: '用铁矿石锻造的基础武器。',
  },
  {
    id: 'forge_leather_armor',
    name: '兽皮甲',
    outputId: 'leather_armor',
    materials: { wolf_skin: 3 },
    successRate: 0.85,
    minRealm: 1,
    description: '用兽皮缝制的简易护甲。',
  },
  {
    id: 'forge_bone_sword',
    name: '骨刃',
    outputId: 'bone_sword',
    materials: { ancient_bone: 2 },
    successRate: 0.8,
    minRealm: 2,
    description: '用古兽骨打磨而成的利刃，锋利无比。',
  },
  {
    id: 'forge_scale_armor',
    name: '鳄鳞甲',
    outputId: 'scale_armor',
    materials: { croc_scale: 5, iron_ore: 3 },
    successRate: 0.75,
    minRealm: 2,
    description: '用沼泽鳄鳞片制成的护甲，防御力出色。',
  },
  {
    id: 'forge_spirit_sword',
    name: '灵剑',
    outputId: 'spirit_sword',
    materials: { spirit_crystal: 3, ancient_bone: 2 },
    successRate: 0.65,
    minRealm: 3,
    description: '蕴含灵气的灵剑，威力远超凡铁。',
  },
  {
    id: 'forge_dragon_armor',
    name: '龙骨甲',
    outputId: 'dragon_armor',
    materials: { dragon_bone: 1, spirit_crystal: 5 },
    successRate: 0.5,
    minRealm: 6,
    description: '以真龙之骨锻造的神级护甲，防御力逆天。',
  },
  {
    id: 'forge_chaos_blade',
    name: '混沌之刃',
    outputId: 'chaos_blade',
    materials: { chaos_crystal: 2, dragon_bone: 1 },
    successRate: 0.35,
    minRealm: 8,
    description: '蕴含混沌之力的神器，可斩断一切。',
  },
];

export function findAlchemyRecipe(id: string): IAlchemyRecipe | undefined {
  return ALCHEMY_RECIPES.find(r => r.id === id || r.name === id);
}

export function findForgeRecipe(id: string): IForgeRecipe | undefined {
  return FORGE_RECIPES.find(r => r.id === id || r.name === id);
}

export function getAlchemyRecipesByRealm(realm: number): IAlchemyRecipe[] {
  return ALCHEMY_RECIPES.filter(r => r.minRealm <= realm);
}

export function getForgeRecipesByRealm(realm: number): IForgeRecipe[] {
  return FORGE_RECIPES.filter(r => r.minRealm <= realm);
}