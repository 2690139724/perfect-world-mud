export enum DaoHeartLevel {
  BEGINNER = '初窥门径',
  APPRENTICE = '略有小成',
  PROFICIENT = '登堂入室',
  MASTER = '炉火纯青',
  PERFECT = '返璞归真',
  TRANSCENDENT = '超凡入圣',
}

export interface IDaoHeart {
  level: DaoHeartLevel;
  exp: number;
  maxExp: number;
  virtues: Record<string, number>;
  defects: Record<string, number>;
}

export interface IVirtue {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  effects: string[];
}

export interface IDefect {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  penalties: string[];
}

export const DAO_HEART_LEVEL_CONFIG: Record<DaoHeartLevel, { maxExp: number; bonus: number }> = {
  [DaoHeartLevel.BEGINNER]: { maxExp: 100, bonus: 0 },
  [DaoHeartLevel.APPRENTICE]: { maxExp: 300, bonus: 5 },
  [DaoHeartLevel.PROFICIENT]: { maxExp: 800, bonus: 10 },
  [DaoHeartLevel.MASTER]: { maxExp: 2000, bonus: 15 },
  [DaoHeartLevel.PERFECT]: { maxExp: 5000, bonus: 20 },
  [DaoHeartLevel.TRANSCENDENT]: { maxExp: 10000, bonus: 30 },
};

export const VIRTUES: IVirtue[] = [
  {
    id: 'virtue_perseverance',
    name: '坚毅',
    description: '面对困难永不放弃',
    maxLevel: 10,
    effects: ['突破失败损失降低', '修炼效率提升'],
  },
  {
    id: 'virtue_wisdom',
    name: '智慧',
    description: '明辨是非，洞察真相',
    maxLevel: 10,
    effects: ['顿悟几率提升', '心魔考验加成'],
  },
  {
    id: 'virtue_compassion',
    name: '慈悲',
    description: '心怀苍生，普度众生',
    maxLevel: 10,
    effects: ['NPC好感度加成', '道侣修炼效果提升'],
  },
  {
    id: 'virtue_courage',
    name: '勇气',
    description: '直面恐惧，一往无前',
    maxLevel: 10,
    effects: ['战斗暴击率提升', '突破保底提前'],
  },
  {
    id: 'virtue_humility',
    name: '谦逊',
    description: '虚怀若谷，不骄不躁',
    maxLevel: 10,
    effects: ['功法进阶几率提升', '境界压制抗性'],
  },
];

export const DEFECTS: IDefect[] = [
  {
    id: 'defect_greed',
    name: '贪婪',
    description: '贪得无厌，欲壑难填',
    maxLevel: 10,
    penalties: ['资源消耗增加', '心魔考验难度提升'],
  },
  {
    id: 'defect_pride',
    name: '傲慢',
    description: '目空一切，轻视他人',
    maxLevel: 10,
    penalties: ['NPC好感度降低', '战斗失误率提升'],
  },
  {
    id: 'defect_fear',
    name: '恐惧',
    description: '畏首畏尾，不敢前行',
    maxLevel: 10,
    penalties: ['突破成功率降低', '战斗逃跑率提升'],
  },
  {
    id: 'defect_doubt',
    name: '疑虑',
    description: '犹豫不决，缺乏自信',
    maxLevel: 10,
    penalties: ['修炼效率降低', '顿悟几率降低'],
  },
  {
    id: 'defect_lust',
    name: '贪欲',
    description: '沉迷女色，荒废修行',
    maxLevel: 10,
    penalties: ['道侣效果降低', '修炼速度降低'],
  },
];

export function calculateDaoHeartBonus(daoHeart: IDaoHeart): number {
  const levelConfig = DAO_HEART_LEVEL_CONFIG[daoHeart.level];
  let bonus = levelConfig.bonus;
  
  for (const [, level] of Object.entries(daoHeart.virtues)) {
    bonus += level * 0.5;
  }
  
  for (const [, level] of Object.entries(daoHeart.defects)) {
    bonus -= level * 0.5;
  }
  
  return Math.max(0, bonus);
}

export function checkDaoHeartLevelUp(daoHeart: IDaoHeart): boolean {
  const levels = [DaoHeartLevel.BEGINNER, DaoHeartLevel.APPRENTICE, DaoHeartLevel.PROFICIENT, DaoHeartLevel.MASTER, DaoHeartLevel.PERFECT, DaoHeartLevel.TRANSCENDENT];
  const currentIdx = levels.indexOf(daoHeart.level);
  
  if (currentIdx >= levels.length - 1) return false;
  
  const nextLevel = levels[currentIdx + 1];
  const nextConfig = DAO_HEART_LEVEL_CONFIG[nextLevel];
  
  if (daoHeart.exp >= nextConfig.maxExp) {
    daoHeart.level = nextLevel;
    daoHeart.maxExp = nextConfig.maxExp;
    return true;
  }
  
  return false;
}

export function addDaoHeartExp(daoHeart: IDaoHeart, exp: number): { leveledUp: boolean; newLevel?: DaoHeartLevel } {
  daoHeart.exp += exp;
  const leveledUp = checkDaoHeartLevelUp(daoHeart);
  
  if (leveledUp) {
    return { leveledUp, newLevel: daoHeart.level };
  }
  
  return { leveledUp };
}

export function updateVirtue(daoHeart: IDaoHeart, virtueId: string, change: number): void {
  const virtue = VIRTUES.find(v => v.id === virtueId);
  if (!virtue) return;
  
  daoHeart.virtues[virtueId] = Math.max(0, Math.min(virtue.maxLevel, (daoHeart.virtues[virtueId] || 0) + change));
}

export function updateDefect(daoHeart: IDaoHeart, defectId: string, change: number): void {
  const defect = DEFECTS.find(d => d.id === defectId);
  if (!defect) return;
  
  daoHeart.defects[defectId] = Math.max(0, Math.min(defect.maxLevel, (daoHeart.defects[defectId] || 0) + change));
}

export function createInitialDaoHeart(): IDaoHeart {
  return {
    level: DaoHeartLevel.BEGINNER,
    exp: 0,
    maxExp: DAO_HEART_LEVEL_CONFIG[DaoHeartLevel.BEGINNER].maxExp,
    virtues: {},
    defects: {},
  };
}