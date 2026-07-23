/**
 * 职业品阶系统
 * 炼丹师和阵法师都有品阶，品阶决定了可以学习的丹方/阵法
 */

// ==================== 炼丹师品阶 ====================
export enum AlchemistGrade {
  APPRENTICE = '炼丹学徒',      // 0阶 - 可以学习凡级丹方
  NOVICE = '初级炼丹师',        // 1阶 - 可以学习灵级丹方
  INTERMEDIATE = '中级炼丹师',  // 2阶 - 可以学习宝级丹方
  ADVANCED = '高级炼丹师',      // 3阶 - 可以学习圣级丹方
  MASTER = '炼丹宗师',          // 4阶 - 可以学习神级丹方
  GRANDMASTER = '炼丹大宗师',   // 5阶 - 可以学习仙级丹方
  IMMORTAL = '炼丹仙师',        // 6阶 - 可以学习帝级丹方
  EMPEROR = '炼丹帝师',         // 7阶 - 可以学习一切丹方
}

export const ALCHEMIST_GRADE_INFO: Record<AlchemistGrade, {
  level: number;
  expRequired: number;
  successBonus: number;
  effectBonus: number;
  description: string;
}> = {
  [AlchemistGrade.APPRENTICE]: {
    level: 0,
    expRequired: 0,
    successBonus: 0,
    effectBonus: 0,
    description: '刚入门的炼丹学徒，只能炼制最基础的丹药。',
  },
  [AlchemistGrade.NOVICE]: {
    level: 1,
    expRequired: 100,
    successBonus: 0.05,
    effectBonus: 0.1,
    description: '初级炼丹师，可以炼制灵级丹药。',
  },
  [AlchemistGrade.INTERMEDIATE]: {
    level: 2,
    expRequired: 500,
    successBonus: 0.1,
    effectBonus: 0.2,
    description: '中级炼丹师，可以炼制宝级丹药。',
  },
  [AlchemistGrade.ADVANCED]: {
    level: 3,
    expRequired: 2000,
    successBonus: 0.15,
    effectBonus: 0.3,
    description: '高级炼丹师，可以炼制圣级丹药。',
  },
  [AlchemistGrade.MASTER]: {
    level: 4,
    expRequired: 8000,
    successBonus: 0.2,
    effectBonus: 0.5,
    description: '炼丹宗师，可以炼制神级丹药。',
  },
  [AlchemistGrade.GRANDMASTER]: {
    level: 5,
    expRequired: 30000,
    successBonus: 0.25,
    effectBonus: 0.8,
    description: '炼丹大宗师，可以炼制仙级丹药。',
  },
  [AlchemistGrade.IMMORTAL]: {
    level: 6,
    expRequired: 100000,
    successBonus: 0.3,
    effectBonus: 1.2,
    description: '炼丹仙师，可以炼制帝级丹药。',
  },
  [AlchemistGrade.EMPEROR]: {
    level: 7,
    expRequired: 500000,
    successBonus: 0.4,
    effectBonus: 1.5,
    description: '炼丹帝师，可以炼制一切丹药，成功率极高。',
  },
};

// ==================== 阵法师品阶 ====================
export enum ArrayMasterGrade {
  APPRENTICE = '阵法学徒',      // 0阶 - 可以学习普通阵法
  NOVICE = '初级阵法师',        // 1阶 - 可以学习稀有阵法
  INTERMEDIATE = '中级阵法师',  // 2阶 - 可以学习史诗阵法
  ADVANCED = '高级阵法师',      // 3阶 - 可以学习传说阵法
  MASTER = '阵法宗师',          // 4阶 - 可以学习神话阵法
  GRANDMASTER = '阵法大宗师',   // 5阶 - 可以学习一切阵法
  IMMORTAL = '阵法仙师',        // 6阶 - 阵法通神
  EMPEROR = '阵法帝师',         // 7阶 - 阵法通天
}

export const ARRAY_MASTER_GRADE_INFO: Record<ArrayMasterGrade, {
  level: number;
  expRequired: number;
  powerBonus: number;
  durationBonus: number;
  description: string;
}> = {
  [ArrayMasterGrade.APPRENTICE]: {
    level: 0,
    expRequired: 0,
    powerBonus: 0,
    durationBonus: 0,
    description: '刚入门的阵法学徒，只能布置最基础的阵法。',
  },
  [ArrayMasterGrade.NOVICE]: {
    level: 1,
    expRequired: 100,
    powerBonus: 0.1,
    durationBonus: 0.1,
    description: '初级阵法师，可以布置稀有级阵法。',
  },
  [ArrayMasterGrade.INTERMEDIATE]: {
    level: 2,
    expRequired: 500,
    powerBonus: 0.2,
    durationBonus: 0.15,
    description: '中级阵法师，可以布置史诗级阵法。',
  },
  [ArrayMasterGrade.ADVANCED]: {
    level: 3,
    expRequired: 2000,
    powerBonus: 0.3,
    durationBonus: 0.2,
    description: '高级阵法师，可以布置传说级阵法。',
  },
  [ArrayMasterGrade.MASTER]: {
    level: 4,
    expRequired: 8000,
    powerBonus: 0.5,
    durationBonus: 0.3,
    description: '阵法宗师，可以布置神话级阵法。',
  },
  [ArrayMasterGrade.GRANDMASTER]: {
    level: 5,
    expRequired: 30000,
    powerBonus: 0.8,
    durationBonus: 0.5,
    description: '阵法大宗师，可以布置一切阵法。',
  },
  [ArrayMasterGrade.IMMORTAL]: {
    level: 6,
    expRequired: 100000,
    powerBonus: 1.2,
    durationBonus: 0.8,
    description: '阵法仙师，阵法通神，威力惊人。',
  },
  [ArrayMasterGrade.EMPEROR]: {
    level: 7,
    expRequired: 500000,
    powerBonus: 2.0,
    durationBonus: 1.0,
    description: '阵法帝师，阵法通天，可开天辟地。',
  },
};

// ==================== 丹方品阶 ====================
export enum RecipeGrade {
  MORTAL = '凡级',     // 需要0阶炼丹师
  SPIRIT = '灵级',     // 需要1阶炼丹师
  TREASURE = '宝级',   // 需要2阶炼丹师
  SAINT = '圣级',      // 需要3阶炼丹师
  DIVINE = '神级',     // 需要4阶炼丹师
  IMMORTAL = '仙级',   // 需要5阶炼丹师
  EMPEROR = '帝级',    // 需要6阶炼丹师
}

export const RECIPE_GRADE_LEVEL: Record<RecipeGrade, number> = {
  [RecipeGrade.MORTAL]: 0,
  [RecipeGrade.SPIRIT]: 1,
  [RecipeGrade.TREASURE]: 2,
  [RecipeGrade.SAINT]: 3,
  [RecipeGrade.DIVINE]: 4,
  [RecipeGrade.IMMORTAL]: 5,
  [RecipeGrade.EMPEROR]: 6,
};

// ==================== 阵法品阶 ====================
export enum FormationGrade {
  COMMON = '普通',     // 需要0阶阵法师
  RARE = '稀有',       // 需要1阶阵法师
  EPIC = '史诗',       // 需要2阶阵法师
  LEGENDARY = '传说',  // 需要3阶阵法师
  MYTHIC = '神话',     // 需要4阶阵法师
}

export const FORMATION_GRADE_LEVEL: Record<FormationGrade, number> = {
  [FormationGrade.COMMON]: 0,
  [FormationGrade.RARE]: 1,
  [FormationGrade.EPIC]: 2,
  [FormationGrade.LEGENDARY]: 3,
  [FormationGrade.MYTHIC]: 4,
};

// ==================== 学习限制判断 ====================

/**
 * 判断炼丹师是否可以学习某丹方
 */
export function canAlchemistLearnRecipe(
  alchemistGrade: AlchemistGrade,
  recipeGrade: RecipeGrade
): boolean {
  const alchemistLevel = ALCHEMIST_GRADE_INFO[alchemistGrade].level;
  const recipeLevel = RECIPE_GRADE_LEVEL[recipeGrade];
  return alchemistLevel >= recipeLevel;
}

/**
 * 判断阵法师是否可以学习某阵法
 */
export function canArrayMasterLearnFormation(
  arrayMasterGrade: ArrayMasterGrade,
  formationGrade: FormationGrade
): boolean {
  const masterLevel = ARRAY_MASTER_GRADE_INFO[arrayMasterGrade].level;
  const formationLevel = FORMATION_GRADE_LEVEL[formationGrade];
  return masterLevel >= formationLevel;
}

/**
 * 获取炼丹师可学习的丹方品阶列表
 */
export function getLearnableRecipeGrades(alchemistGrade: AlchemistGrade): RecipeGrade[] {
  const level = ALCHEMIST_GRADE_INFO[alchemistGrade].level;
  return Object.entries(RECIPE_GRADE_LEVEL)
    .filter(([, reqLevel]) => reqLevel <= level)
    .map(([grade]) => grade as RecipeGrade);
}

/**
 * 获取阵法师可学习的阵法品阶列表
 */
export function getLearnableFormationGrades(arrayMasterGrade: ArrayMasterGrade): FormationGrade[] {
  const level = ARRAY_MASTER_GRADE_INFO[arrayMasterGrade].level;
  return Object.entries(FORMATION_GRADE_LEVEL)
    .filter(([, reqLevel]) => reqLevel <= level)
    .map(([grade]) => grade as FormationGrade);
}

// ==================== 品阶提升 ====================

/**
 * 获取炼丹师下一品阶
 */
export function getNextAlchemistGrade(currentGrade: AlchemistGrade): AlchemistGrade | null {
  const grades = Object.values(AlchemistGrade);
  const currentIndex = grades.indexOf(currentGrade);
  if (currentIndex < grades.length - 1) {
    return grades[currentIndex + 1];
  }
  return null;
}

/**
 * 获取阵法师下一品阶
 */
export function getNextArrayMasterGrade(currentGrade: ArrayMasterGrade): ArrayMasterGrade | null {
  const grades = Object.values(ArrayMasterGrade);
  const currentIndex = grades.indexOf(currentGrade);
  if (currentIndex < grades.length - 1) {
    return grades[currentIndex + 1];
  }
  return null;
}

/**
 * 检查炼丹师是否可以提升品阶
 */
export function canUpgradeAlchemistGrade(
  currentGrade: AlchemistGrade,
  currentExp: number
): boolean {
  const nextGrade = getNextAlchemistGrade(currentGrade);
  if (!nextGrade) return false;
  const requiredExp = ALCHEMIST_GRADE_INFO[nextGrade].expRequired;
  return currentExp >= requiredExp;
}

/**
 * 检查阵法师是否可以提升品阶
 */
export function canUpgradeArrayMasterGrade(
  currentGrade: ArrayMasterGrade,
  currentExp: number
): boolean {
  const nextGrade = getNextArrayMasterGrade(currentGrade);
  if (!nextGrade) return false;
  const requiredExp = ARRAY_MASTER_GRADE_INFO[nextGrade].expRequired;
  return currentExp >= requiredExp;
}