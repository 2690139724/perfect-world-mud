import { PillGrade } from './Alchemy';
import { ArrayFormationTier } from './ArrayFormation';

/**
 * 炼制师品阶系统
 *
 * 包含：
 * - 炼丹师8阶品阶（炼丹学徒至炼丹帝师）
 * - 阵法师8阶品阶（阵法学徒至阵法帝师）
 * - 品阶与丹方品阶/阵法品阶的联动（不同品阶可学习不同等级配方）
 * - 骨文铭刻品阶（用于装备强化）
 * - 器灵契约品阶（用于器灵系统）
 */

// ============= 炼丹师品阶 =============

export enum AlchemistRank {
  APPRENTICE = '炼丹学徒',
  DISCIPLE = '炼丹门生',
  MASTER = '炼丹师',
  GRANDMASTER = '炼丹大师',
  ELDER = '炼丹宗师',
  GREAT_ELDER = '炼丹大宗师',
  SAGE = '炼丹圣师',
  EMPEROR = '炼丹帝师',
}

export const ALCHEMIST_RANK_ORDER: AlchemistRank[] = [
  AlchemistRank.APPRENTICE,
  AlchemistRank.DISCIPLE,
  AlchemistRank.MASTER,
  AlchemistRank.GRANDMASTER,
  AlchemistRank.ELDER,
  AlchemistRank.GREAT_ELDER,
  AlchemistRank.SAGE,
  AlchemistRank.EMPEROR,
];

/** 炼丹师品阶配置：经验上限、可学丹方品阶、成功率加成 */
export interface IAlchemistRankConfig {
  rank: AlchemistRank;
  /** 升至此品阶所需的经验 */
  requiredExp: number;
  /** 可学习的丹方品阶（含及以下） */
  maxRecipeGrade: PillGrade;
  /** 炼丹成功率加成 */
  successRateBonus: number;
  /** 出丹数量加成 */
  yieldBonus: number;
  /** 描述 */
  description: string;
}

export const ALCHEMIST_RANK_CONFIG: Record<AlchemistRank, IAlchemistRankConfig> = {
  [AlchemistRank.APPRENTICE]: {
    rank: AlchemistRank.APPRENTICE,
    requiredExp: 0,
    maxRecipeGrade: PillGrade.MORTAL,
    successRateBonus: 0,
    yieldBonus: 0,
    description: '初入丹道，仅能炼制凡级丹方。',
  },
  [AlchemistRank.DISCIPLE]: {
    rank: AlchemistRank.DISCIPLE,
    requiredExp: 200,
    maxRecipeGrade: PillGrade.MORTAL,
    successRateBonus: 0.05,
    yieldBonus: 0.1,
    description: '掌握丹道基础，凡级丹方炼制更稳。',
  },
  [AlchemistRank.MASTER]: {
    rank: AlchemistRank.MASTER,
    requiredExp: 800,
    maxRecipeGrade: PillGrade.SPIRIT,
    successRateBonus: 0.1,
    yieldBonus: 0.2,
    description: '可学习灵级丹方，炼丹之道小成。',
  },
  [AlchemistRank.GRANDMASTER]: {
    rank: AlchemistRank.GRANDMASTER,
    requiredExp: 2400,
    maxRecipeGrade: PillGrade.TREASURE,
    successRateBonus: 0.15,
    yieldBonus: 0.3,
    description: '可学习宝级丹方，丹道已入佳境。',
  },
  [AlchemistRank.ELDER]: {
    rank: AlchemistRank.ELDER,
    requiredExp: 6000,
    maxRecipeGrade: PillGrade.SAINT,
    successRateBonus: 0.2,
    yieldBonus: 0.4,
    description: '可学习圣级丹方，丹道宗师之名。',
  },
  [AlchemistRank.GREAT_ELDER]: {
    rank: AlchemistRank.GREAT_ELDER,
    requiredExp: 15000,
    maxRecipeGrade: PillGrade.DIVINE,
    successRateBonus: 0.25,
    yieldBonus: 0.5,
    description: '可学习神级丹方，丹道大宗师。',
  },
  [AlchemistRank.SAGE]: {
    rank: AlchemistRank.SAGE,
    requiredExp: 40000,
    maxRecipeGrade: PillGrade.IMMORTAL,
    successRateBonus: 0.3,
    yieldBonus: 0.6,
    description: '可学习仙级丹方，丹道圣师。',
  },
  [AlchemistRank.EMPEROR]: {
    rank: AlchemistRank.EMPEROR,
    requiredExp: 100000,
    maxRecipeGrade: PillGrade.EMPEROR,
    successRateBonus: 0.4,
    yieldBonus: 0.8,
    description: '可学习帝级丹方，丹道帝师，举世罕见。',
  },
};

// ============= 阵法师品阶 =============

export enum FormationMasterRank {
  APPRENTICE = '阵法学徒',
  DISCIPLE = '阵法门生',
  MASTER = '阵法师',
  GRANDMASTER = '阵法大师',
  ELDER = '阵法宗师',
  GREAT_ELDER = '阵法大宗师',
  SAGE = '阵法圣师',
  EMPEROR = '阵法帝师',
}

export const FORMATION_RANK_ORDER: FormationMasterRank[] = [
  FormationMasterRank.APPRENTICE,
  FormationMasterRank.DISCIPLE,
  FormationMasterRank.MASTER,
  FormationMasterRank.GRANDMASTER,
  FormationMasterRank.ELDER,
  FormationMasterRank.GREAT_ELDER,
  FormationMasterRank.SAGE,
  FormationMasterRank.EMPEROR,
];

export interface IFormationRankConfig {
  rank: FormationMasterRank;
  requiredExp: number;
  /** 可学习的阵法品阶（含及以下） */
  maxFormationTier: ArrayFormationTier;
  /** 布阵成功率加成 */
  successRateBonus: number;
  /** 阵法效果加成 */
  effectBonus: number;
  description: string;
}

export const FORMATION_RANK_CONFIG: Record<FormationMasterRank, IFormationRankConfig> = {
  [FormationMasterRank.APPRENTICE]: {
    rank: FormationMasterRank.APPRENTICE,
    requiredExp: 0,
    maxFormationTier: ArrayFormationTier.COMMON,
    successRateBonus: 0,
    effectBonus: 0,
    description: '初入阵道，仅能布置普通阵法。',
  },
  [FormationMasterRank.DISCIPLE]: {
    rank: FormationMasterRank.DISCIPLE,
    requiredExp: 200,
    maxFormationTier: ArrayFormationTier.COMMON,
    successRateBonus: 0.05,
    effectBonus: 0.1,
    description: '掌握阵法基础，普通阵法布置更稳。',
  },
  [FormationMasterRank.MASTER]: {
    rank: FormationMasterRank.MASTER,
    requiredExp: 800,
    maxFormationTier: ArrayFormationTier.RARE,
    successRateBonus: 0.1,
    effectBonus: 0.2,
    description: '可学习稀有阵法，阵道小成。',
  },
  [FormationMasterRank.GRANDMASTER]: {
    rank: FormationMasterRank.GRANDMASTER,
    requiredExp: 2400,
    maxFormationTier: ArrayFormationTier.EPIC,
    successRateBonus: 0.15,
    effectBonus: 0.3,
    description: '可学习史诗阵法，阵道入佳境。',
  },
  [FormationMasterRank.ELDER]: {
    rank: FormationMasterRank.ELDER,
    requiredExp: 6000,
    maxFormationTier: ArrayFormationTier.LEGENDARY,
    successRateBonus: 0.2,
    effectBonus: 0.4,
    description: '可学习传说阵法，阵法宗师之名。',
  },
  [FormationMasterRank.GREAT_ELDER]: {
    rank: FormationMasterRank.GREAT_ELDER,
    requiredExp: 15000,
    maxFormationTier: ArrayFormationTier.LEGENDARY,
    successRateBonus: 0.25,
    effectBonus: 0.5,
    description: '阵法大宗师，传说阵法炉火纯青。',
  },
  [FormationMasterRank.SAGE]: {
    rank: FormationMasterRank.SAGE,
    requiredExp: 40000,
    maxFormationTier: ArrayFormationTier.MYTHIC,
    successRateBonus: 0.3,
    effectBonus: 0.6,
    description: '可学习神话阵法，阵法圣师。',
  },
  [FormationMasterRank.EMPEROR]: {
    rank: FormationMasterRank.EMPEROR,
    requiredExp: 100000,
    maxFormationTier: ArrayFormationTier.MYTHIC,
    successRateBonus: 0.4,
    effectBonus: 0.8,
    description: '阵法帝师，神话阵法信手拈来。',
  },
};

// ============= 骨文铭刻品阶 =============

export enum BoneScriptRank {
  NONE = '未入门',
  INITIATE = '骨文初识',
  APPRENTICE = '骨文入门',
  ADEPT = '骨文熟手',
  MASTER = '骨文大师',
  GRANDMASTER = '骨文宗师',
  SAGE = '骨文圣师',
  EMPEROR = '骨文帝师',
}

export const BONE_SCRIPT_RANK_ORDER: BoneScriptRank[] = [
  BoneScriptRank.NONE,
  BoneScriptRank.INITIATE,
  BoneScriptRank.APPRENTICE,
  BoneScriptRank.ADEPT,
  BoneScriptRank.MASTER,
  BoneScriptRank.GRANDMASTER,
  BoneScriptRank.SAGE,
  BoneScriptRank.EMPEROR,
];

export interface IBoneScriptRankConfig {
  rank: BoneScriptRank;
  requiredLevel: number;
  /** 可铭刻的装备品阶（1-7，对应凡到帝） */
  maxItemGrade: number;
  /** 铭刻成功率加成 */
  successRateBonus: number;
  /** 属性加成倍率 */
  attributeMultiplier: number;
  description: string;
}

export const BONE_SCRIPT_RANK_CONFIG: Record<BoneScriptRank, IBoneScriptRankConfig> = {
  [BoneScriptRank.NONE]: {
    rank: BoneScriptRank.NONE,
    requiredLevel: 0,
    maxItemGrade: 0,
    successRateBonus: 0,
    attributeMultiplier: 1.0,
    description: '尚未入门骨文铭刻。',
  },
  [BoneScriptRank.INITIATE]: {
    rank: BoneScriptRank.INITIATE,
    requiredLevel: 1,
    maxItemGrade: 1,
    successRateBonus: 0,
    attributeMultiplier: 1.05,
    description: '可铭刻凡级装备。',
  },
  [BoneScriptRank.APPRENTICE]: {
    rank: BoneScriptRank.APPRENTICE,
    requiredLevel: 5,
    maxItemGrade: 2,
    successRateBonus: 0.05,
    attributeMultiplier: 1.1,
    description: '可铭刻灵级装备。',
  },
  [BoneScriptRank.ADEPT]: {
    rank: BoneScriptRank.ADEPT,
    requiredLevel: 15,
    maxItemGrade: 3,
    successRateBonus: 0.1,
    attributeMultiplier: 1.2,
    description: '可铭刻宝级装备。',
  },
  [BoneScriptRank.MASTER]: {
    rank: BoneScriptRank.MASTER,
    requiredLevel: 30,
    maxItemGrade: 4,
    successRateBonus: 0.15,
    attributeMultiplier: 1.35,
    description: '可铭刻圣级装备，骨文大师。',
  },
  [BoneScriptRank.GRANDMASTER]: {
    rank: BoneScriptRank.GRANDMASTER,
    requiredLevel: 50,
    maxItemGrade: 5,
    successRateBonus: 0.2,
    attributeMultiplier: 1.5,
    description: '可铭刻神级装备，骨文宗师。',
  },
  [BoneScriptRank.SAGE]: {
    rank: BoneScriptRank.SAGE,
    requiredLevel: 80,
    maxItemGrade: 6,
    successRateBonus: 0.25,
    attributeMultiplier: 1.75,
    description: '可铭刻仙级装备，骨文圣师。',
  },
  [BoneScriptRank.EMPEROR]: {
    rank: BoneScriptRank.EMPEROR,
    requiredLevel: 120,
    maxItemGrade: 7,
    successRateBonus: 0.3,
    attributeMultiplier: 2.0,
    description: '可铭刻帝级装备，骨文帝师。',
  },
};

// ============= 器灵契约品阶 =============

export enum SpiritBondRank {
  NONE = '未契约',
  INITIATE = '初识器灵',
  APPRENTICE = '器灵学徒',
  ADEPT = '器灵熟手',
  MASTER = '器灵大师',
  GRANDMASTER = '器灵宗师',
  SAGE = '器灵圣师',
  EMPEROR = '器灵帝师',
}

// ============= 工具函数 =============

/** 根据炼丹经验获取当前品阶 */
export function getAlchemistRank(exp: number): AlchemistRank {
  let currentRank = AlchemistRank.APPRENTICE;
  for (const rank of ALCHEMIST_RANK_ORDER) {
    if (exp >= ALCHEMIST_RANK_CONFIG[rank].requiredExp) {
      currentRank = rank;
    } else {
      break;
    }
  }
  return currentRank;
}

/** 根据阵法经验获取当前品阶 */
export function getFormationRank(exp: number): FormationMasterRank {
  let currentRank = FormationMasterRank.APPRENTICE;
  for (const rank of FORMATION_RANK_ORDER) {
    if (exp >= FORMATION_RANK_CONFIG[rank].requiredExp) {
      currentRank = rank;
    } else {
      break;
    }
  }
  return currentRank;
}

/** 根据骨文等级获取当前品阶 */
export function getBoneScriptRank(level: number): BoneScriptRank {
  let currentRank = BoneScriptRank.NONE;
  for (const rank of BONE_SCRIPT_RANK_ORDER) {
    if (level >= BONE_SCRIPT_RANK_CONFIG[rank].requiredLevel) {
      currentRank = rank;
    } else {
      break;
    }
  }
  return currentRank;
}

/** 检查炼丹师品阶是否能学习指定丹方品阶 */
export function canLearnAlchemyRecipe(rank: AlchemistRank, grade: PillGrade): boolean {
  const config = ALCHEMIST_RANK_CONFIG[rank];
  const rankGradeOrder = getPillGradeOrder(config.maxRecipeGrade);
  const targetGradeOrder = getPillGradeOrder(grade);
  return targetGradeOrder <= rankGradeOrder;
}

/** 检查阵法师品阶是否能学习指定阵法品阶 */
export function canLearnFormation(rank: FormationMasterRank, tier: ArrayFormationTier): boolean {
  const config = FORMATION_RANK_CONFIG[rank];
  const rankTierOrder = getFormationTierOrder(config.maxFormationTier);
  const targetTierOrder = getFormationTierOrder(tier);
  return targetTierOrder <= rankTierOrder;
}

function getPillGradeOrder(grade: PillGrade): number {
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

function getFormationTierOrder(tier: ArrayFormationTier): number {
  const order: Record<ArrayFormationTier, number> = {
    [ArrayFormationTier.COMMON]: 1,
    [ArrayFormationTier.RARE]: 2,
    [ArrayFormationTier.EPIC]: 3,
    [ArrayFormationTier.LEGENDARY]: 4,
    [ArrayFormationTier.MYTHIC]: 5,
  };
  return order[tier] || 0;
}
