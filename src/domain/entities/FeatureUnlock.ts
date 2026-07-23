/**
 * 功能解锁系统
 * 游戏功能随玩家境界/任务逐步解锁，避免信息过载
 */

export enum FeatureId {
  // 基础功能（初始解锁）
  STATUS = 'status',
  CULTIVATION = 'cultivation',
  INVENTORY_BASIC = 'inventory_basic',

  // 逐步解锁
  TASK = 'task',
  MAP = 'map',
  TALENT = 'talent',
  COMBAT = 'combat',
  EQUIPMENT = 'equipment',
  SHOP = 'shop',
  ALCHEMY = 'alchemy',
  FORGE = 'forge',
  ARRAY = 'array',
  CAVE = 'cave',
  SECT = 'sect',
  MOUNT = 'mount',
  COMPANION = 'companion',
  ACHIEVEMENT = 'achievement',
  TECHNIQUE = 'technique',
  NPC_INTERACTION = 'npc_interaction',
}

export interface IUnlockCondition {
  type: 'realm' | 'quest' | 'level' | 'item' | 'manual';
  value: number | string;
}

export interface IFeatureInfo {
  id: FeatureId;
  name: string;
  icon: string;
  description: string;
  category: '核心' | '养成' | '玩法' | '社交';
  unlockCondition: IUnlockCondition;
  unlockHint: string;
  isUnlocked: boolean;
  unlockOrder: number;
}

export const FEATURE_DEFS: Record<FeatureId, Omit<IFeatureInfo, 'isUnlocked'>> = {
  [FeatureId.STATUS]: {
    id: FeatureId.STATUS,
    name: '角色状态',
    icon: '📊',
    description: '查看角色属性、境界、修为等基础信息',
    category: '核心',
    unlockCondition: { type: 'manual', value: 0 },
    unlockHint: '初始解锁',
    unlockOrder: 1,
  },
  [FeatureId.CULTIVATION]: {
    id: FeatureId.CULTIVATION,
    name: '修炼',
    icon: '🧘',
    description: '打坐修炼，提升修为和境界',
    category: '核心',
    unlockCondition: { type: 'manual', value: 0 },
    unlockHint: '初始解锁',
    unlockOrder: 2,
  },
  [FeatureId.INVENTORY_BASIC]: {
    id: FeatureId.INVENTORY_BASIC,
    name: '背包',
    icon: '🎒',
    description: '查看和管理背包中的物品',
    category: '核心',
    unlockCondition: { type: 'quest', value: 'quest_first_hunt' },
    unlockHint: '完成「初出茅庐」任务后解锁',
    unlockOrder: 3,
  },
  [FeatureId.TASK]: {
    id: FeatureId.TASK,
    name: '任务',
    icon: '📜',
    description: '查看可接取的任务，完成任务获得奖励',
    category: '玩法',
    unlockCondition: { type: 'realm', value: 0 },
    unlockHint: '搬血境后自动解锁',
    unlockOrder: 4,
  },
  [FeatureId.MAP]: {
    id: FeatureId.MAP,
    name: '舆图',
    icon: '🗺',
    description: '探索周边区域，寻找机缘和挑战',
    category: '玩法',
    unlockCondition: { type: 'quest', value: 'quest_first_hunt' },
    unlockHint: '完成「初出茅庐」任务后解锁',
    unlockOrder: 5,
  },
  [FeatureId.COMBAT]: {
    id: FeatureId.COMBAT,
    name: '战斗',
    icon: '⚔',
    description: '与妖兽和敌人战斗，获取战利品',
    category: '核心',
    unlockCondition: { type: 'quest', value: 'quest_first_hunt' },
    unlockHint: '完成「初出茅庐」任务后解锁',
    unlockOrder: 6,
  },
  [FeatureId.EQUIPMENT]: {
    id: FeatureId.EQUIPMENT,
    name: '装备',
    icon: '🛡',
    description: '穿戴装备，提升战斗力',
    category: '养成',
    unlockCondition: { type: 'quest', value: 'quest_skin_collector' },
    unlockHint: '完成「狼皮收集」任务后解锁',
    unlockOrder: 7,
  },
  [FeatureId.TALENT]: {
    id: FeatureId.TALENT,
    name: '天赋',
    icon: '⭐',
    description: '查看你的天赋能力，金色天赋有专属机缘',
    category: '养成',
    unlockCondition: { type: 'realm', value: 1 },
    unlockHint: '达到搬血境后解锁',
    unlockOrder: 8,
  },
  [FeatureId.SHOP]: {
    id: FeatureId.SHOP,
    name: '商店',
    icon: '🏪',
    description: '购买和出售物品',
    category: '玩法',
    unlockCondition: { type: 'realm', value: 2 },
    unlockHint: '达到洞天境后解锁',
    unlockOrder: 9,
  },
  [FeatureId.TECHNIQUE]: {
    id: FeatureId.TECHNIQUE,
    name: '功法',
    icon: '📚',
    description: '学习和修炼功法宝术',
    category: '养成',
    unlockCondition: { type: 'realm', value: 2 },
    unlockHint: '达到洞天境后解锁',
    unlockOrder: 10,
  },
  [FeatureId.NPC_INTERACTION]: {
    id: FeatureId.NPC_INTERACTION,
    name: 'NPC交互',
    icon: '💬',
    description: '与NPC对话、交易、建立关系',
    category: '社交',
    unlockCondition: { type: 'quest', value: 'quest_skin_collector' },
    unlockHint: '「狼皮收集」任务中接触',
    unlockOrder: 11,
  },
  [FeatureId.ALCHEMY]: {
    id: FeatureId.ALCHEMY,
    name: '炼丹',
    icon: '⚗',
    description: '炼制丹药，辅助修炼和战斗',
    category: '玩法',
    unlockCondition: { type: 'realm', value: 3 },
    unlockHint: '达到化灵境后解锁',
    unlockOrder: 12,
  },
  [FeatureId.FORGE]: {
    id: FeatureId.FORGE,
    name: '炼器',
    icon: '🔨',
    description: '锻造和强化装备',
    category: '玩法',
    unlockCondition: { type: 'realm', value: 4 },
    unlockHint: '达到铭纹境后解锁',
    unlockOrder: 13,
  },
  [FeatureId.CAVE]: {
    id: FeatureId.CAVE,
    name: '洞府',
    icon: '🏔',
    description: '拥有自己的洞府，种植灵草、豢养灵兽',
    category: '养成',
    unlockCondition: { type: 'realm', value: 5 },
    unlockHint: '达到列阵境后解锁',
    unlockOrder: 14,
  },
  [FeatureId.SECT]: {
    id: FeatureId.SECT,
    name: '宗门',
    icon: '🏛',
    description: '加入宗门，学习宗门功法，参与宗门活动',
    category: '社交',
    unlockCondition: { type: 'realm', value: 6 },
    unlockHint: '达到尊者境后解锁',
    unlockOrder: 15,
  },
  [FeatureId.MOUNT]: {
    id: FeatureId.MOUNT,
    name: '坐骑',
    icon: '🐎',
    description: '收服坐骑，提升移动速度和战力',
    category: '养成',
    unlockCondition: { type: 'realm', value: 6 },
    unlockHint: '达到尊者境后解锁',
    unlockOrder: 16,
  },
  [FeatureId.COMPANION]: {
    id: FeatureId.COMPANION,
    name: '道侣',
    icon: '💞',
    description: '结识道侣，结伴修行',
    category: '社交',
    unlockCondition: { type: 'realm', value: 7 },
    unlockHint: '达到神火境后解锁',
    unlockOrder: 17,
  },
  [FeatureId.ARRAY]: {
    id: FeatureId.ARRAY,
    name: '阵法',
    icon: '🔯',
    description: '学习和布置阵法，攻防守备',
    category: '玩法',
    unlockCondition: { type: 'realm', value: 5 },
    unlockHint: '达到列阵境后解锁',
    unlockOrder: 18,
  },
  [FeatureId.ACHIEVEMENT]: {
    id: FeatureId.ACHIEVEMENT,
    name: '成就',
    icon: '🏆',
    description: '查看成就和称号，获取属性加成',
    category: '玩法',
    unlockCondition: { type: 'realm', value: 3 },
    unlockHint: '达到化灵境后解锁',
    unlockOrder: 19,
  },
};

export class FeatureUnlockSystem {
  private static instance: FeatureUnlockSystem;
  private unlockedFeatures: Set<FeatureId> = new Set();
  private unlockedAt: Map<FeatureId, number> = new Map();

  private constructor() {
    this.initBaseFeatures();
  }

  static getInstance(): FeatureUnlockSystem {
    if (!FeatureUnlockSystem.instance) {
      FeatureUnlockSystem.instance = new FeatureUnlockSystem();
    }
    return FeatureUnlockSystem.instance;
  }

  private initBaseFeatures(): void {
    Object.entries(FEATURE_DEFS).forEach(([id, def]) => {
      if (def.unlockCondition.type === 'manual' && def.unlockCondition.value === 0) {
        this.unlockedFeatures.add(id as FeatureId);
        this.unlockedAt.set(id as FeatureId, 0);
      }
    });
  }

  isUnlocked(featureId: FeatureId): boolean {
    return this.unlockedFeatures.has(featureId);
  }

  getFeatureInfo(featureId: FeatureId): IFeatureInfo {
    const def = FEATURE_DEFS[featureId];
    return {
      ...def,
      isUnlocked: this.unlockedFeatures.has(featureId),
    };
  }

  getAllFeatures(): IFeatureInfo[] {
    return Object.values(FEATURE_DEFS)
      .sort((a, b) => a.unlockOrder - b.unlockOrder)
      .map(def => ({
        ...def,
        isUnlocked: this.unlockedFeatures.has(def.id),
      }));
  }

  getUnlockedFeatures(): IFeatureInfo[] {
    return this.getAllFeatures().filter(f => f.isUnlocked);
  }

  getLockedFeatures(): IFeatureInfo[] {
    return this.getAllFeatures().filter(f => !f.isUnlocked);
  }

  getNextUnlock(): IFeatureInfo | null {
    const locked = this.getLockedFeatures().sort((a, b) => a.unlockOrder - b.unlockOrder);
    return locked.length > 0 ? locked[0] : null;
  }

  unlockFeature(featureId: FeatureId, timestamp: number = Date.now()): boolean {
    if (this.unlockedFeatures.has(featureId)) return false;
    this.unlockedFeatures.add(featureId);
    this.unlockedAt.set(featureId, timestamp);
    return true;
  }

  checkRealmUnlock(realmLevel: number): FeatureId[] {
    const newlyUnlocked: FeatureId[] = [];
    Object.entries(FEATURE_DEFS).forEach(([id, def]) => {
      if (
        def.unlockCondition.type === 'realm' &&
        typeof def.unlockCondition.value === 'number' &&
        realmLevel >= def.unlockCondition.value &&
        !this.unlockedFeatures.has(id as FeatureId)
      ) {
        this.unlockedFeatures.add(id as FeatureId);
        this.unlockedAt.set(id as FeatureId, Date.now());
        newlyUnlocked.push(id as FeatureId);
      }
    });
    return newlyUnlocked;
  }

  checkQuestUnlock(questId: string): FeatureId[] {
    const newlyUnlocked: FeatureId[] = [];
    Object.entries(FEATURE_DEFS).forEach(([id, def]) => {
      if (
        def.unlockCondition.type === 'quest' &&
        def.unlockCondition.value === questId &&
        !this.unlockedFeatures.has(id as FeatureId)
      ) {
        this.unlockedFeatures.add(id as FeatureId);
        this.unlockedAt.set(id as FeatureId, Date.now());
        newlyUnlocked.push(id as FeatureId);
      }
    });
    return newlyUnlocked;
  }

  getUnlockHint(featureId: FeatureId): string {
    const def = FEATURE_DEFS[featureId];
    if (!def) return '';
    return def.unlockHint;
  }

  reset(): void {
    this.unlockedFeatures.clear();
    this.unlockedAt.clear();
    this.initBaseFeatures();
  }
}

export function getFeatureName(featureId: FeatureId): string {
  return FEATURE_DEFS[featureId]?.name || featureId;
}

export function getFeatureIcon(featureId: FeatureId): string {
  return FEATURE_DEFS[featureId]?.icon || '❓';
}