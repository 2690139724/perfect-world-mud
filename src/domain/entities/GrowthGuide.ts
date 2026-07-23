/**
 * 成长手册系统
 * 7日目标 + 阶段性成长指引，让玩家知道"接下来该做什么"
 */

export enum GrowthGuideType {
  DAILY = 'daily',
  MAINLINE = 'mainline',
  SIDELINE = 'sideline',
  ACHIEVEMENT = 'achievement',
}

export interface IGrowthTask {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: GrowthGuideType;
  dayIndex?: number;
  order: number;
  target: {
    type: 'reach_realm' | 'complete_quest' | 'kill_monsters' | 'cultivate_times' | 'equip_count' | 'learn_technique' | 'collect_items' | 'npc_friendship' | 'explore_zones';
    value: number;
    targetId?: string;
  };
  rewards: {
    type: 'exp' | 'gold' | 'item' | 'title';
    id?: string;
    amount: number;
  }[];
  tips: string;
  isCompleted: boolean;
  isClaimed: boolean;
}

export const GROWTH_TASKS: IGrowthTask[] = [
  // ==================== 第1日目标 ====================
  {
    id: 'growth_day1_realm',
    title: '初窥门径',
    description: '突破到搬血境，踏上修仙之路',
    icon: '🌱',
    type: GrowthGuideType.DAILY,
    dayIndex: 1,
    order: 1,
    target: { type: 'reach_realm', value: 1 },
    rewards: [
      { type: 'gold', amount: 100 },
      { type: 'item', id: 'heal_potion', amount: 5 },
    ],
    tips: '点击底部「修炼」按钮，开始打坐修行。修为满后即可突破。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day1_quest',
    title: '初试身手',
    description: '完成第一个任务「初出茅庐」',
    icon: '⚔',
    type: GrowthGuideType.DAILY,
    dayIndex: 1,
    order: 2,
    target: { type: 'complete_quest', value: 1, targetId: 'quest_first_hunt' },
    rewards: [
      { type: 'gold', amount: 50 },
      { type: 'exp', amount: 50 },
    ],
    tips: '前往石村找刘老伯接取任务。任务是快速获取资源的好方法！',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day1_explore',
    title: '踏足荒野',
    description: '探索3个不同的区域',
    icon: '🗺',
    type: GrowthGuideType.DAILY,
    dayIndex: 1,
    order: 3,
    target: { type: 'explore_zones', value: 3 },
    rewards: [
      { type: 'gold', amount: 30 },
      { type: 'item', id: 'mana_potion', amount: 3 },
    ],
    tips: '点击「舆图」按钮查看周边区域，每个区域都有不同的机缘。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day1_cultivate',
    title: '勤学苦练',
    description: '累计修炼10次',
    icon: '🧘',
    type: GrowthGuideType.DAILY,
    dayIndex: 1,
    order: 4,
    target: { type: 'cultivate_times', value: 10 },
    rewards: [
      { type: 'exp', amount: 30 },
    ],
    tips: '修炼是提升境界的根本，持之以恒才能有所成就。',
    isCompleted: false,
    isClaimed: false,
  },

  // ==================== 第2日目标 ====================
  {
    id: 'growth_day2_realm',
    title: '洞天开辟',
    description: '突破到洞天境',
    icon: '🏠',
    type: GrowthGuideType.DAILY,
    dayIndex: 2,
    order: 1,
    target: { type: 'reach_realm', value: 2 },
    rewards: [
      { type: 'gold', amount: 200 },
      { type: 'item', id: 'exp_pill', amount: 3 },
    ],
    tips: '洞天境是修仙路上的重要里程碑，可开辟自身洞天。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day2_equip',
    title: '神兵利器',
    description: '装备3件装备',
    icon: '🛡',
    type: GrowthGuideType.DAILY,
    dayIndex: 2,
    order: 2,
    target: { type: 'equip_count', value: 3 },
    rewards: [
      { type: 'gold', amount: 100 },
      { type: 'item', id: 'iron_sword', amount: 1 },
    ],
    tips: '完成任务和击杀怪物都可以获得装备。在背包中点击装备即可穿戴。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day2_technique',
    title: '博学多才',
    description: '学习2门功法',
    icon: '📚',
    type: GrowthGuideType.DAILY,
    dayIndex: 2,
    order: 3,
    target: { type: 'learn_technique', value: 2 },
    rewards: [
      { type: 'gold', amount: 80 },
      { type: 'exp', amount: 50 },
    ],
    tips: '功法可以在商店购买，或通过任务、机缘获得。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day2_kill',
    title: '小试牛刀',
    description: '击杀20只怪物',
    icon: '⚔',
    type: GrowthGuideType.DAILY,
    dayIndex: 2,
    order: 4,
    target: { type: 'kill_monsters', value: 20 },
    rewards: [
      { type: 'gold', amount: 60 },
    ],
    tips: '击杀怪物不仅能获得战利品，还能提升实战经验。',
    isCompleted: false,
    isClaimed: false,
  },

  // ==================== 第3日目标 ====================
  {
    id: 'growth_day3_realm',
    title: '化灵成形',
    description: '突破到化灵境',
    icon: '✨',
    type: GrowthGuideType.DAILY,
    dayIndex: 3,
    order: 1,
    target: { type: 'reach_realm', value: 3 },
    rewards: [
      { type: 'gold', amount: 300 },
      { type: 'item', id: 'spirit_gather_pill', amount: 5 },
    ],
    tips: '化灵境可凝练灵气为己用，实力大幅提升。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day3_alchemy',
    title: '丹道入门',
    description: '解锁炼丹系统，炼制第一炉丹药',
    icon: '⚗',
    type: GrowthGuideType.DAILY,
    dayIndex: 3,
    order: 2,
    target: { type: 'learn_technique', value: 1, targetId: 'alchemy_basic' },
    rewards: [
      { type: 'gold', amount: 150 },
      { type: 'item', id: 'blood_ginseng', amount: 5 },
    ],
    tips: '化灵境后解锁炼丹系统，可自己炼制丹药，节省大量资源。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day3_npc',
    title: '广结善缘',
    description: '与3位NPC达到友善关系',
    icon: '🤝',
    type: GrowthGuideType.DAILY,
    dayIndex: 3,
    order: 3,
    target: { type: 'npc_friendship', value: 3 },
    rewards: [
      { type: 'gold', amount: 100 },
      { type: 'item', id: 'gift_common', amount: 3 },
    ],
    tips: '多与NPC聊天、送礼，可以提升好感度，解锁更多功能和优惠。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day3_collect',
    title: '聚沙成塔',
    description: '收集30种不同物品',
    icon: '📦',
    type: GrowthGuideType.DAILY,
    dayIndex: 3,
    order: 4,
    target: { type: 'collect_items', value: 30 },
    rewards: [
      { type: 'gold', amount: 80 },
    ],
    tips: '探索、战斗、任务都可以获得各种物品。',
    isCompleted: false,
    isClaimed: false,
  },

  // ==================== 第4-7日目标 ====================
  {
    id: 'growth_day4_realm',
    title: '铭纹悟道',
    description: '突破到铭纹境',
    icon: '🔮',
    type: GrowthGuideType.DAILY,
    dayIndex: 4,
    order: 1,
    target: { type: 'reach_realm', value: 4 },
    rewards: [
      { type: 'gold', amount: 500 },
      { type: 'item', id: 'wisdom_pill', amount: 2 },
    ],
    tips: '铭纹境可在兵器上铭刻纹路，提升战力。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day5_realm',
    title: '列阵待发',
    description: '突破到列阵境',
    icon: '🔯',
    type: GrowthGuideType.DAILY,
    dayIndex: 5,
    order: 1,
    target: { type: 'reach_realm', value: 5 },
    rewards: [
      { type: 'gold', amount: 800 },
      { type: 'title', amount: 1 },
    ],
    tips: '列阵境可布置阵法，攻防守备皆有妙用。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day6_realm',
    title: '尊者之威',
    description: '突破到尊者境',
    icon: '👑',
    type: GrowthGuideType.DAILY,
    dayIndex: 6,
    order: 1,
    target: { type: 'reach_realm', value: 6 },
    rewards: [
      { type: 'gold', amount: 1200 },
      { type: 'item', id: 'breakthrough_pill', amount: 1 },
    ],
    tips: '尊者境，可开宗立派，威震一方。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_day7_realm',
    title: '神火燃烧',
    description: '突破到神火境',
    icon: '🔥',
    type: GrowthGuideType.DAILY,
    dayIndex: 7,
    order: 1,
    target: { type: 'reach_realm', value: 7 },
    rewards: [
      { type: 'gold', amount: 2000 },
      { type: 'title', amount: 1 },
    ],
    tips: '神火境，神火燃烧，踏上真一之路。',
    isCompleted: false,
    isClaimed: false,
  },

  // ==================== 主线目标（长期） ====================
  {
    id: 'growth_mainline_realm_10',
    title: '祭道之路',
    description: '突破到祭道境',
    icon: '🌟',
    type: GrowthGuideType.MAINLINE,
    order: 1,
    target: { type: 'reach_realm', value: 9 },
    rewards: [
      { type: 'gold', amount: 5000 },
      { type: 'title', amount: 1 },
    ],
    tips: '祭道境，可祭炼大道，窥探天道奥秘。',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'growth_mainline_realm_14',
    title: '至尊之路',
    description: '突破到至尊境',
    icon: '⚡',
    type: GrowthGuideType.MAINLINE,
    order: 2,
    target: { type: 'reach_realm', value: 14 },
    rewards: [
      { type: 'gold', amount: 20000 },
      { type: 'title', amount: 1 },
    ],
    tips: '至尊境，俯瞰苍生，万古长青。',
    isCompleted: false,
    isClaimed: false,
  },
];

export class GrowthGuideSystem {
  private static instance: GrowthGuideSystem;
  private tasks: Map<string, IGrowthTask> = new Map();
  private currentDay: number = 1;
  private stats: Record<string, number> = {
    cultivate_times: 0,
    kill_monsters: 0,
    explore_zones: 0,
    equip_count: 0,
    learn_technique: 0,
    collect_items: 0,
    npc_friendship: 0,
  };

  private constructor() {
    this.initTasks();
  }

  static getInstance(): GrowthGuideSystem {
    if (!GrowthGuideSystem.instance) {
      GrowthGuideSystem.instance = new GrowthGuideSystem();
    }
    return GrowthGuideSystem.instance;
  }

  private initTasks(): void {
    GROWTH_TASKS.forEach(task => {
      this.tasks.set(task.id, { ...task });
    });
  }

  getTask(taskId: string): IGrowthTask | undefined {
    return this.tasks.get(taskId);
  }

  getDailyTasks(day: number): IGrowthTask[] {
    return Array.from(this.tasks.values())
      .filter(t => t.type === GrowthGuideType.DAILY && t.dayIndex === day)
      .sort((a, b) => a.order - b.order);
  }

  getCurrentDayTasks(): IGrowthTask[] {
    return this.getDailyTasks(this.currentDay);
  }

  getMainlineTasks(): IGrowthTask[] {
    return Array.from(this.tasks.values())
      .filter(t => t.type === GrowthGuideType.MAINLINE)
      .sort((a, b) => a.order - b.order);
  }

  getIncompleteTasks(): IGrowthTask[] {
    return Array.from(this.tasks.values())
      .filter(t => !t.isCompleted)
      .sort((a, b) => {
        const aDay = a.dayIndex ?? 999;
        const bDay = b.dayIndex ?? 999;
        return aDay - bDay || a.order - b.order;
      });
  }

  getNextTask(): IGrowthTask | null {
    const incomplete = this.getIncompleteTasks();
    return incomplete.length > 0 ? incomplete[0] : null;
  }

  getProgress(taskId: string): number {
    const task = this.tasks.get(taskId);
    if (!task) return 0;
    const statKey = task.target.type;
    const current = this.stats[statKey] || 0;
    return Math.min(100, Math.floor((current / task.target.value) * 100));
  }

  updateStat(statType: string, value: number, targetId?: string): void {
    if (this.stats[statType] !== undefined) {
      this.stats[statType] += value;
    }
    this.checkTaskCompletion(statType, targetId);
  }

  setStat(statType: string, value: number): void {
    if (this.stats[statType] !== undefined) {
      this.stats[statType] = value;
    }
  }

  private checkTaskCompletion(statType: string, targetId?: string): void {
    this.tasks.forEach(task => {
      if (task.isCompleted) return;
      if (task.target.type !== statType) return;
      if (task.target.targetId && task.target.targetId !== targetId) return;

      const current = this.stats[statType] || 0;
      if (current >= task.target.value) {
        task.isCompleted = true;
      }
    });
  }

  completeTask(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task || task.isCompleted) return false;
    task.isCompleted = true;
    return true;
  }

  claimReward(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task || !task.isCompleted || task.isClaimed) return false;
    task.isClaimed = true;
    return true;
  }

  getCurrentDay(): number {
    return this.currentDay;
  }

  setCurrentDay(day: number): void {
    this.currentDay = Math.max(1, Math.min(7, day));
  }

  advanceDay(): void {
    if (this.currentDay < 7) {
      this.currentDay++;
    }
  }

  reset(): void {
    this.initTasks();
    this.currentDay = 1;
    Object.keys(this.stats).forEach(k => {
      this.stats[k] = 0;
    });
  }
}

export function getGrowthTaskTitle(taskId: string): string {
  return GROWTH_TASKS.find(t => t.id === taskId)?.title || taskId;
}