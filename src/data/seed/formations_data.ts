/**
 * 可学习的阵法数据
 * 每个阵法有品阶，阵法师品阶达到要求才能学习
 */

import { FormationGrade, FORMATION_GRADE_LEVEL } from '../../domain/entities/ProfessionGrade';
import { ArrayFormationType } from '../../domain/entities/ArrayFormation';

export interface IFormationData {
  id: string;
  name: string;
  grade: FormationGrade;
  type: ArrayFormationType;
  description: string;
  origin: string;                         // 出处/典故
  requiredGrade: number;                  // 需要的阵法师品阶等级
  materials: { id: string; amount: number }[];
  effects: {
    type: string;
    value: number;
    duration?: number;
  }[];
  cooldownHours: number;
  expReward: number;                      // 学习获得的经验
  cultivationExp: number;                 // 布阵成功获得的阵法经验
  learnCost: number;                      // 学习消耗灵石
}

export const FORMATIONS_DATA: IFormationData[] = [
  // ==================== 普通阵法 ====================
  {
    id: 'formation_fire_array_basic',
    name: '烈火阵',
    grade: FormationGrade.COMMON,
    type: ArrayFormationType.ATTACK,
    description: '基础火焰攻击阵法。',
    origin: '石族常用的基础攻击阵法',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.COMMON],
    materials: [{ id: 'spirit_crystal', amount: 3 }, { id: 'fire_copper', amount: 2 }],
    effects: [{ type: 'damage', value: 30 }],
    cooldownHours: 1,
    expReward: 10,
    cultivationExp: 5,
    learnCost: 50,
  },
  {
    id: 'formation_stone_wall_basic',
    name: '石壁阵',
    grade: FormationGrade.COMMON,
    type: ArrayFormationType.DEFENSE,
    description: '基础防御阵法，召唤石壁阻挡攻击。',
    origin: '石族传承的防御阵法',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.COMMON],
    materials: [{ id: 'iron_ore', amount: 5 }, { id: 'spirit_crystal', amount: 2 }],
    effects: [{ type: 'defense', value: 20 }],
    cooldownHours: 2,
    expReward: 10,
    cultivationExp: 5,
    learnCost: 50,
  },
  {
    id: 'formation_spirit_gather_basic',
    name: '聚灵阵',
    grade: FormationGrade.COMMON,
    type: ArrayFormationType.GATHERING,
    description: '基础聚灵阵法，可聚集周围灵气。',
    origin: '太古时期流传下来的修炼辅助阵法',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.COMMON],
    materials: [{ id: 'spirit_crystal', amount: 5 }, { id: 'spirit_grass', amount: 3 }],
    effects: [{ type: 'cultivation_speed', value: 1.2 }],
    cooldownHours: 0,
    expReward: 15,
    cultivationExp: 8,
    learnCost: 80,
  },
  {
    id: 'formation_trap_basic',
    name: '困敌阵',
    grade: FormationGrade.COMMON,
    type: ArrayFormationType.TRAP,
    description: '基础困敌阵法，可困住敌人片刻。',
    origin: '通用阵法',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.COMMON],
    materials: [{ id: 'spirit_crystal', amount: 4 }, { id: 'iron_ore', amount: 3 }],
    effects: [{ type: 'stun', value: 1, duration: 30 }],
    cooldownHours: 3,
    expReward: 12,
    cultivationExp: 6,
    learnCost: 60,
  },

  // ==================== 稀有阵法 ====================
  {
    id: 'formation_thunder_array',
    name: '雷劫阵',
    grade: FormationGrade.RARE,
    type: ArrayFormationType.ATTACK,
    description: '引动雷霆攻击敌人的阵法。',
    origin: '模仿天劫的恐怖阵法',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.RARE],
    materials: [{ id: 'lightning_stone', amount: 2 }, { id: 'spirit_crystal', amount: 8 }],
    effects: [{ type: 'lightning_damage', value: 80 }],
    cooldownHours: 4,
    expReward: 40,
    cultivationExp: 20,
    learnCost: 300,
  },
  {
    id: 'formation_ice_barrier',
    name: '冰封阵',
    grade: FormationGrade.RARE,
    type: ArrayFormationType.DEFENSE,
    description: '冰属性防御阵法，可冻结靠近的敌人。',
    origin: '极北之地传承的阵法',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.RARE],
    materials: [{ id: 'ice_soul_stone', amount: 2 }, { id: 'cold_iron', amount: 3 }],
    effects: [{ type: 'defense', value: 40 }, { type: 'freeze_chance', value: 0.2 }],
    cooldownHours: 3,
    expReward: 45,
    cultivationExp: 22,
    learnCost: 350,
  },
  {
    id: 'formation_illusion_basic',
    name: '幻阵',
    grade: FormationGrade.RARE,
    type: ArrayFormationType.TRAP,
    description: '制造幻象迷惑敌人的阵法。',
    origin: '幻魔宗传承',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.RARE],
    materials: [{ id: 'ghost_mushroom', amount: 2 }, { id: 'spirit_crystal', amount: 6 }],
    effects: [{ type: 'illusion', value: 1, duration: 60 }],
    cooldownHours: 2,
    expReward: 35,
    cultivationExp: 18,
    learnCost: 250,
  },
  {
    id: 'formation_wind_walk',
    name: '风行阵',
    grade: FormationGrade.RARE,
    type: ArrayFormationType.TRANSMISSION,
    description: '加速移动的辅助阵法。',
    origin: '风族传承',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.RARE],
    materials: [{ id: 'wind_eye', amount: 1 }, { id: 'spirit_crystal', amount: 5 }],
    effects: [{ type: 'speed', value: 1.5, duration: 60 }],
    cooldownHours: 1,
    expReward: 30,
    cultivationExp: 15,
    learnCost: 200,
  },

  // ==================== 史诗阵法 ====================
  {
    id: 'formation_void_array',
    name: '虚空阵',
    grade: FormationGrade.EPIC,
    type: ArrayFormationType.ATTACK,
    description: '撕裂虚空攻击敌人的高级阵法。',
    origin: '领悟空间法则后才能布置的高级阵法',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.EPIC],
    materials: [{ id: 'space_crystal', amount: 1 }, { id: 'spirit_crystal', amount: 15 }],
    effects: [{ type: 'void_damage', value: 150 }, { type: 'ignore_defense', value: 0.3 }],
    cooldownHours: 8,
    expReward: 100,
    cultivationExp: 50,
    learnCost: 1000,
  },
  {
    id: 'formation_yinyang_array',
    name: '阴阳阵',
    grade: FormationGrade.EPIC,
    type: ArrayFormationType.DEFENSE,
    description: '蕴含阴阳法则的防御阵法。',
    origin: '道家传承的顶级防御阵法',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.EPIC],
    materials: [{ id: 'yinyang_stone', amount: 1 }, { id: 'spirit_crystal', amount: 12 }],
    effects: [{ type: 'defense', value: 80 }, { type: 'damage_reflect', value: 0.15 }],
    cooldownHours: 6,
    expReward: 90,
    cultivationExp: 45,
    learnCost: 800,
  },
  {
    id: 'formation_five_elements',
    name: '五行阵',
    grade: FormationGrade.EPIC,
    type: ArrayFormationType.GATHERING,
    description: '蕴含五行法则的修炼辅助阵法。',
    origin: '五行宗传承',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.EPIC],
    materials: [
      { id: 'fire_copper', amount: 1 },
      { id: 'cold_iron', amount: 1 },
      { id: 'spirit_crystal', amount: 10 }
    ],
    effects: [{ type: 'cultivation_speed', value: 2.0 }],
    cooldownHours: 0,
    expReward: 80,
    cultivationExp: 40,
    learnCost: 700,
  },
  {
    id: 'formation_killing_sword',
    name: '诛仙剑阵',
    grade: FormationGrade.EPIC,
    type: ArrayFormationType.ATTACK,
    description: '仿照诛仙剑阵炼制的攻击阵法。',
    origin: '通天教主传承，诛仙四剑演化',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.EPIC],
    materials: [{ id: 'sword_fragment_2', amount: 1 }, { id: 'spirit_crystal', amount: 20 }],
    effects: [{ type: 'aoe_damage', value: 200 }],
    cooldownHours: 12,
    expReward: 150,
    cultivationExp: 75,
    learnCost: 1500,
  },

  // ==================== 传说阵法 ====================
  {
    id: 'formation_immortal_barrier',
    name: '仙障阵',
    grade: FormationGrade.LEGENDARY,
    type: ArrayFormationType.DEFENSE,
    description: '仙人遗留的防御阵法，可抵挡强大攻击。',
    origin: '远古仙人留下的阵法传承',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.LEGENDARY],
    materials: [{ id: 'immortal_copper', amount: 2 }, { id: 'spirit_crystal', amount: 30 }],
    effects: [{ type: 'defense', value: 150 }, { type: 'damage_reflect', value: 0.25 }],
    cooldownHours: 12,
    expReward: 250,
    cultivationExp: 125,
    learnCost: 4000,
  },
  {
    id: 'formation_time_array',
    name: '时光阵',
    grade: FormationGrade.LEGENDARY,
    type: ArrayFormationType.GATHERING,
    description: '扭曲时间流速的神级阵法。',
    origin: '领悟时间法则后才能布置的神级阵法',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.LEGENDARY],
    materials: [{ id: 'time_sand', amount: 1 }, { id: 'spirit_crystal', amount: 40 }],
    effects: [{ type: 'cultivation_speed', value: 3.5 }, { type: 'time_warp', value: 0.5 }],
    cooldownHours: 24,
    expReward: 300,
    cultivationExp: 150,
    learnCost: 5000,
  },
  {
    id: 'formation_nine_heavens',
    name: '九天十地阵',
    grade: FormationGrade.LEGENDARY,
    type: ArrayFormationType.ATTACK,
    description: '上古大阵，可覆盖九天十地。',
    origin: '远古大能传承',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.LEGENDARY],
    materials: [{ id: 'chaos_stone', amount: 1 }, { id: 'spirit_crystal', amount: 50 }],
    effects: [{ type: 'aoe_damage', value: 300 }],
    cooldownHours: 24,
    expReward: 350,
    cultivationExp: 175,
    learnCost: 6000,
  },

  // ==================== 神话阵法 ====================
  {
    id: 'formation_chaos',
    name: '混沌阵',
    grade: FormationGrade.MYTHIC,
    type: ArrayFormationType.ATTACK,
    description: '蕴含混沌法则的至高阵法，可开天辟地。',
    origin: '混沌初开时的原始阵法',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.MYTHIC],
    materials: [{ id: 'chaos_stone', amount: 3 }, { id: 'primordial_matter', amount: 1 }],
    effects: [{ type: 'aoe_damage', value: 500 }, { type: 'ignore_defense', value: 0.5 }],
    cooldownHours: 48,
    expReward: 800,
    cultivationExp: 400,
    learnCost: 20000,
  },
  {
    id: 'formation_desolate_emperor',
    name: '荒帝阵',
    grade: FormationGrade.MYTHIC,
    type: ArrayFormationType.DEFENSE,
    description: '荒天帝留下的至高防御阵法。',
    origin: '完美世界：荒天帝传承',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.MYTHIC],
    materials: [{ id: 'desolate_essence', amount: 2 }, { id: 'nine_life_fruit', amount: 1 }],
    effects: [{ type: 'defense', value: 300 }, { type: 'damage_reflect', value: 0.4 }],
    cooldownHours: 48,
    expReward: 900,
    cultivationExp: 450,
    learnCost: 25000,
  },
  {
    id: 'formation_heavenly_reverse',
    name: '逆天阵',
    grade: FormationGrade.MYTHIC,
    type: ArrayFormationType.GATHERING,
    description: '可逆转天道的至高阵法。',
    origin: '仙逆：王林创造的阵法',
    requiredGrade: FORMATION_GRADE_LEVEL[FormationGrade.MYTHIC],
    materials: [{ id: 'heavenly_reverse_stone', amount: 2 }, { id: 'killing_essence', amount: 1 }],
    effects: [{ type: 'cultivation_speed', value: 5.0 }, { type: 'change_fate', value: 20 }],
    cooldownHours: 72,
    expReward: 1000,
    cultivationExp: 500,
    learnCost: 50000,
  },
];

/**
 * 根据ID查找阵法
 */
export function findFormationById(id: string): IFormationData | undefined {
  return FORMATIONS_DATA.find(f => f.id === id);
}

/**
 * 获取指定品阶的所有阵法
 */
export function getFormationsByGrade(grade: FormationGrade): IFormationData[] {
  return FORMATIONS_DATA.filter(f => f.grade === grade);
}

/**
 * 获取阵法师可以学习的所有阵法
 */
export function getLearnableFormations(arrayMasterLevel: number): IFormationData[] {
  return FORMATIONS_DATA.filter(f => f.requiredGrade <= arrayMasterLevel);
}

/**
 * 检查是否可以学习某阵法
 */
export function canLearnFormation(arrayMasterLevel: number, formationId: string): boolean {
  const formation = findFormationById(formationId);
  if (!formation) return false;
  return arrayMasterLevel >= formation.requiredGrade;
}

/**
 * 获取指定类型的可学习阵法
 */
export function getLearnableFormationsByType(
  arrayMasterLevel: number,
  type: ArrayFormationType
): IFormationData[] {
  return FORMATIONS_DATA.filter(
    f => f.requiredGrade <= arrayMasterLevel && f.type === type
  );
}