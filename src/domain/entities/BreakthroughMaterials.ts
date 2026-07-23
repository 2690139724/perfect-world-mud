import { CultivationRealm } from './Player';

export interface IBreakthroughMaterial {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  effect: {
    type: 'success_rate' | 'reduce_damage' | 'retain_exp' | 'insight';
    value: number;
  };
  sources: string[];
}

export interface IRealmMaterialRequirements {
  mainMaterial: string;
  auxiliaryMaterials: { id: string; count: number }[];
}

export const BREAKTHROUGH_MATERIALS: Record<string, IBreakthroughMaterial> = {
  mat_breakthrough_pill: {
    id: 'mat_breakthrough_pill',
    name: '破境丹',
    description: '辅助突破的基础丹药，可小幅提升突破成功率',
    rarity: 'common',
    effect: { type: 'success_rate', value: 15 },
    sources: ['炼丹', '宗门兑换', '商店购买'],
  },
  mat_spirit_stone: {
    id: 'mat_spirit_stone',
    name: '灵石',
    description: '蕴含灵气的矿石，可作为基础突破材料',
    rarity: 'common',
    effect: { type: 'success_rate', value: 2 },
    sources: ['矿洞采集', '怪物掉落', '商店购买'],
  },
  mat_essence_crystal: {
    id: 'mat_essence_crystal',
    name: '精华水晶',
    description: '凝聚天地精华的水晶，可大幅提升突破成功率',
    rarity: 'rare',
    effect: { type: 'success_rate', value: 10 },
    sources: ['秘境探索', '世界BOSS掉落', '拍卖'],
  },
  mat_heavenly_pearl: {
    id: 'mat_heavenly_pearl',
    name: '天珠',
    description: '天降神珠，蕴含法则之力',
    rarity: 'epic',
    effect: { type: 'success_rate', value: 20 },
    sources: ['灵气潮汐采集', '特殊事件', '跨世界贸易'],
  },
  mat_demon_core: {
    id: 'mat_demon_core',
    name: '妖丹',
    description: '强大妖兽的核心，蕴含精纯能量',
    rarity: 'uncommon',
    effect: { type: 'success_rate', value: 5 },
    sources: ['妖兽击杀', '秘境探索'],
  },
  mat_immortal_grass: {
    id: 'mat_immortal_grass',
    name: '仙草',
    description: '生长于灵山的神药',
    rarity: 'rare',
    effect: { type: 'reduce_damage', value: 20 },
    sources: ['洞天种植', '秘境采集'],
  },
  mat_divine_blood: {
    id: 'mat_divine_blood',
    name: '神血',
    description: '神明遗留下的神血，蕴含至高法则',
    rarity: 'legendary',
    effect: { type: 'success_rate', value: 30 },
    sources: ['上古遗迹', '神境BOSS', '特殊任务'],
  },
  mat_time_sand: {
    id: 'mat_time_sand',
    name: '时光砂',
    description: '蕴含时间法则的奇异沙粒',
    rarity: 'legendary',
    effect: { type: 'retain_exp', value: 30 },
    sources: ['时间秘境', '虚空探索'],
  },
  mat_dao_tear: {
    id: 'mat_dao_tear',
    name: '道之泪',
    description: '天道垂怜所化的泪水',
    rarity: 'epic',
    effect: { type: 'insight', value: 10 },
    sources: ['突破失败', '特殊心境事件'],
  },
};

export const REALM_BREAKTHROUGH_MATERIALS: Record<CultivationRealm, IRealmMaterialRequirements> = {
  [CultivationRealm.MORTAL]: {
    mainMaterial: 'mat_breakthrough_pill',
    auxiliaryMaterials: [{ id: 'mat_spirit_stone', count: 10 }],
  },
  [CultivationRealm.BLOOD_MOVING]: {
    mainMaterial: 'mat_breakthrough_pill',
    auxiliaryMaterials: [{ id: 'mat_spirit_stone', count: 20 }, { id: 'mat_demon_core', count: 5 }],
  },
  [CultivationRealm.CAVE]: {
    mainMaterial: 'mat_essence_crystal',
    auxiliaryMaterials: [{ id: 'mat_spirit_stone', count: 50 }, { id: 'mat_demon_core', count: 10 }],
  },
  [CultivationRealm.SPIRIT]: {
    mainMaterial: 'mat_essence_crystal',
    auxiliaryMaterials: [{ id: 'mat_spirit_stone', count: 100 }, { id: 'mat_immortal_grass', count: 3 }],
  },
  [CultivationRealm.INSCRIBE]: {
    mainMaterial: 'mat_heavenly_pearl',
    auxiliaryMaterials: [{ id: 'mat_essence_crystal', count: 5 }, { id: 'mat_demon_core', count: 20 }],
  },
  [CultivationRealm.ARRAY]: {
    mainMaterial: 'mat_heavenly_pearl',
    auxiliaryMaterials: [{ id: 'mat_essence_crystal', count: 10 }, { id: 'mat_immortal_grass', count: 5 }],
  },
  [CultivationRealm.VENERABLE]: {
    mainMaterial: 'mat_divine_blood',
    auxiliaryMaterials: [{ id: 'mat_heavenly_pearl', count: 3 }, { id: 'mat_essence_crystal', count: 20 }],
  },
  [CultivationRealm.DIVINE_FIRE]: {
    mainMaterial: 'mat_divine_blood',
    auxiliaryMaterials: [{ id: 'mat_heavenly_pearl', count: 5 }, { id: 'mat_immortal_grass', count: 10 }],
  },
  [CultivationRealm.TRUE_ONE]: {
    mainMaterial: 'mat_time_sand',
    auxiliaryMaterials: [{ id: 'mat_divine_blood', count: 3 }, { id: 'mat_heavenly_pearl', count: 10 }],
  },
  [CultivationRealm.SACRIFICE]: {
    mainMaterial: 'mat_time_sand',
    auxiliaryMaterials: [{ id: 'mat_divine_blood', count: 5 }, { id: 'mat_essence_crystal', count: 50 }],
  },
  [CultivationRealm.GOD]: {
    mainMaterial: 'mat_dao_tear',
    auxiliaryMaterials: [{ id: 'mat_time_sand', count: 3 }, { id: 'mat_divine_blood', count: 10 }],
  },
  [CultivationRealm.VOID]: {
    mainMaterial: 'mat_dao_tear',
    auxiliaryMaterials: [{ id: 'mat_time_sand', count: 5 }, { id: 'mat_heavenly_pearl', count: 20 }],
  },
  [CultivationRealm.SELF_CUT]: {
    mainMaterial: 'mat_divine_blood',
    auxiliaryMaterials: [{ id: 'mat_dao_tear', count: 3 }, { id: 'mat_time_sand', count: 10 }],
  },
  [CultivationRealm.ESCAPE]: {
    mainMaterial: 'mat_divine_blood',
    auxiliaryMaterials: [{ id: 'mat_dao_tear', count: 5 }, { id: 'mat_time_sand', count: 15 }],
  },
  [CultivationRealm.SUPREME]: {
    mainMaterial: 'mat_time_sand',
    auxiliaryMaterials: [{ id: 'mat_dao_tear', count: 10 }, { id: 'mat_divine_blood', count: 20 }],
  },
  [CultivationRealm.TRUE_IMMORTAL]: {
    mainMaterial: 'mat_dao_tear',
    auxiliaryMaterials: [{ id: 'mat_time_sand', count: 20 }, { id: 'mat_divine_blood', count: 30 }],
  },
  [CultivationRealm.KING]: {
    mainMaterial: 'mat_dao_tear',
    auxiliaryMaterials: [{ id: 'mat_time_sand', count: 50 }, { id: 'mat_divine_blood', count: 50 }],
  },
};

export function getBreakthroughMaterials(realm: CultivationRealm): IRealmMaterialRequirements | undefined {
  return REALM_BREAKTHROUGH_MATERIALS[realm];
}

export function getMaterialInfo(materialId: string): IBreakthroughMaterial | undefined {
  return BREAKTHROUGH_MATERIALS[materialId];
}

export function calculateMaterialBonus(materials: string[]): { successRateBonus: number; damageReduction: number; expRetention: number; insightBonus: number } {
  let successRateBonus = 0;
  let damageReduction = 0;
  let expRetention = 0;
  let insightBonus = 0;

  for (const matId of materials) {
    const material = BREAKTHROUGH_MATERIALS[matId];
    if (!material) continue;

    switch (material.effect.type) {
      case 'success_rate':
        successRateBonus += material.effect.value;
        break;
      case 'reduce_damage':
        damageReduction += material.effect.value;
        break;
      case 'retain_exp':
        expRetention += material.effect.value;
        break;
      case 'insight':
        insightBonus += material.effect.value;
        break;
    }
  }

  return { successRateBonus, damageReduction, expRetention, insightBonus };
}