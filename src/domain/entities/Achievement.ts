export enum AchievementCategory {
  CULTIVATION = 'cultivation',
  BATTLE = 'battle',
  EXPLORATION = 'exploration',
  SOCIAL = 'social',
  COLLECTION = 'collection',
}

export interface IAchievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  requirements: {
    type: 'reach_realm' | 'kill_monsters' | 'complete_quests' | 'discover_zones' | 'collect_items' | 'spend_gold' |
          'learn_techniques' | 'alchemy_count' | 'forge_count' | 'gold_earned' | 'cultivate_times' | 'breakthrough_count' |
          'equipment_count' | 'npc_friendship' | 'reincarnation_count';
    target: number;
    current?: number;
  }[];
  rewards: {
    type: 'title' | 'gold' | 'item' | 'stat_bonus';
    value: string | number;
    statKey?: string;
  }[];
  unlocked: boolean;
  /** 隐藏成就：不在列表中显示直到解锁 */
  hidden?: boolean;
}

export interface ITitle {
  id: string;
  name: string;
  description: string;
  icon: string;
  effects?: Record<string, number>;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
}

export const SEED_ACHIEVEMENTS: Omit<IAchievement, 'unlocked'>[] = [
  {
    id: 'achievement_first_realm',
    name: '初窥门径',
    description: '首次突破到搬血境',
    category: AchievementCategory.CULTIVATION,
    icon: '🌱',
    requirements: [{ type: 'reach_realm', target: 1 }],
    rewards: [{ type: 'title', value: '初窥门径' }],
  },
  {
    id: 'achievement_cave_realm',
    name: '洞天开辟',
    description: '突破到洞天境',
    category: AchievementCategory.CULTIVATION,
    icon: '🏠',
    requirements: [{ type: 'reach_realm', target: 2 }],
    rewards: [{ type: 'title', value: '洞天开辟' }],
  },
  {
    id: 'achievement_spirit_realm',
    name: '化灵成圣',
    description: '突破到化灵境',
    category: AchievementCategory.CULTIVATION,
    icon: '✨',
    requirements: [{ type: 'reach_realm', target: 3 }],
    rewards: [{ type: 'title', value: '化灵成圣' }],
  },
  {
    id: 'achievement_kill_100',
    name: '百斩',
    description: '击杀100只怪物',
    category: AchievementCategory.BATTLE,
    icon: '⚔',
    requirements: [{ type: 'kill_monsters', target: 100 }],
    rewards: [{ type: 'title', value: '百斩' }],
  },
  {
    id: 'achievement_kill_1000',
    name: '千斩',
    description: '击杀1000只怪物',
    category: AchievementCategory.BATTLE,
    icon: '⚔',
    requirements: [{ type: 'kill_monsters', target: 1000 }],
    rewards: [{ type: 'title', value: '千斩' }, { type: 'stat_bonus', value: 5, statKey: 'attack' }],
  },
  {
    id: 'achievement_complete_10_quests',
    name: '初入江湖',
    description: '完成10个任务',
    category: AchievementCategory.SOCIAL,
    icon: '📜',
    requirements: [{ type: 'complete_quests', target: 10 }],
    rewards: [{ type: 'title', value: '初入江湖' }, { type: 'gold', value: 50 }],
  },
  {
    id: 'achievement_complete_50_quests',
    name: '江湖老手',
    description: '完成50个任务',
    category: AchievementCategory.SOCIAL,
    icon: '📜',
    requirements: [{ type: 'complete_quests', target: 50 }],
    rewards: [{ type: 'title', value: '江湖老手' }, { type: 'gold', value: 200 }],
  },
  {
    id: 'achievement_discover_all_zones',
    name: '踏遍天下',
    description: '发现所有区域',
    category: AchievementCategory.EXPLORATION,
    icon: '🗺',
    requirements: [{ type: 'discover_zones', target: 10 }],
    rewards: [{ type: 'title', value: '踏遍天下' }, { type: 'stat_bonus', value: 10, statKey: 'speed' }],
  },
  {
    id: 'achievement_collect_baoshu',
    name: '宝术收藏家',
    description: '收集10种宝术',
    category: AchievementCategory.COLLECTION,
    icon: '📚',
    requirements: [{ type: 'collect_items', target: 10 }],
    rewards: [{ type: 'title', value: '宝术收藏家' }],
  },
  {
    id: 'achievement_xiaobudian',
    name: '小不点',
    description: '初出茅庐，踏上修炼之路',
    category: AchievementCategory.CULTIVATION,
    icon: '👶',
    requirements: [{ type: 'reach_realm', target: 1 }],
    rewards: [{ type: 'title', value: '小不点' }],
  },
  {
    id: 'achievement_shaonian_zhizun',
    name: '少年至尊',
    description: '年少成名，同辈无敌',
    category: AchievementCategory.CULTIVATION,
    icon: '⚡',
    requirements: [{ type: 'reach_realm', target: 3 }],
    rewards: [{ type: 'title', value: '少年至尊' }],
  },
  {
    id: 'achievement_xuemo',
    name: '血魔',
    description: '征战四方，血染沙场',
    category: AchievementCategory.BATTLE,
    icon: '🩸',
    requirements: [{ type: 'kill_monsters', target: 500 }],
    rewards: [{ type: 'title', value: '血魔' }],
  },
  {
    id: 'achievement_shihuang',
    name: '石皇',
    description: '威震一方，万民敬仰',
    category: AchievementCategory.CULTIVATION,
    icon: '👑',
    requirements: [{ type: 'reach_realm', target: 5 }],
    rewards: [{ type: 'title', value: '石皇' }],
  },
  {
    id: 'achievement_huang',
    name: '荒',
    description: '石昊之名，响彻九天',
    category: AchievementCategory.CULTIVATION,
    icon: '🌌',
    requirements: [{ type: 'reach_realm', target: 7 }],
    rewards: [{ type: 'title', value: '荒' }],
  },
  {
    id: 'achievement_lunhui_shihao',
    name: '轮回石昊',
    description: '轮回九世，逆命重修',
    category: AchievementCategory.CULTIVATION,
    icon: '🔄',
    requirements: [{ type: 'reach_realm', target: 9 }],
    rewards: [{ type: 'title', value: '轮回石昊' }],
  },
  {
    id: 'achievement_tianting_zhuzhu',
    name: '天庭之主',
    description: '建立天庭，统御诸天',
    category: AchievementCategory.CULTIVATION,
    icon: '🏛',
    requirements: [{ type: 'reach_realm', target: 12 }],
    rewards: [{ type: 'title', value: '天庭之主' }],
  },
  {
    id: 'achievement_huangtiandi',
    name: '荒天帝',
    description: '独断万古，镇压一切',
    category: AchievementCategory.CULTIVATION,
    icon: '🌟',
    requirements: [{ type: 'reach_realm', target: 14 }],
    rewards: [{ type: 'title', value: '荒天帝' }],
  },
  {
    id: 'achievement_duduan_wangu',
    name: '独断万古',
    description: '石昊最终成就，斩断万古纪元',
    category: AchievementCategory.CULTIVATION,
    icon: '⚔',
    requirements: [{ type: 'reach_realm', target: 16 }],
    rewards: [{ type: 'title', value: '独断万古' }],
  },
  // ===== 扩展成就 =====
  {
    id: 'achievement_cultivate_100',
    name: '勤修不辍',
    description: '累计修炼100次',
    category: AchievementCategory.CULTIVATION,
    icon: '🧘',
    requirements: [{ type: 'cultivate_times', target: 100 }],
    rewards: [{ type: 'gold', value: 100 }, { type: 'stat_bonus', value: 10, statKey: 'hp' }],
  },
  {
    id: 'achievement_cultivate_1000',
    name: '道心坚定',
    description: '累计修炼1000次',
    category: AchievementCategory.CULTIVATION,
    icon: '🧘',
    requirements: [{ type: 'cultivate_times', target: 1000 }],
    rewards: [{ type: 'title', value: '道心坚定' }, { type: 'stat_bonus', value: 20, statKey: 'mana' }],
  },
  {
    id: 'achievement_learn_5_techniques',
    name: '博闻强识',
    description: '学习5种功法',
    category: AchievementCategory.COLLECTION,
    icon: '📖',
    requirements: [{ type: 'learn_techniques', target: 5 }],
    rewards: [{ type: 'gold', value: 200 }],
  },
  {
    id: 'achievement_learn_15_techniques',
    name: '万法归宗',
    description: '学习15种功法',
    category: AchievementCategory.COLLECTION,
    icon: '📖',
    requirements: [{ type: 'learn_techniques', target: 15 }],
    rewards: [{ type: 'title', value: '万法归宗' }, { type: 'stat_bonus', value: 15, statKey: 'attack' }],
  },
  {
    id: 'achievement_alchemy_50',
    name: '炼丹初成',
    description: '成功炼丹50次',
    category: AchievementCategory.COLLECTION,
    icon: '⚗',
    requirements: [{ type: 'alchemy_count', target: 50 }],
    rewards: [{ type: 'gold', value: 300 }],
  },
  {
    id: 'achievement_alchemy_500',
    name: '丹道宗师',
    description: '成功炼丹500次',
    category: AchievementCategory.COLLECTION,
    icon: '⚗',
    requirements: [{ type: 'alchemy_count', target: 500 }],
    rewards: [{ type: 'title', value: '丹道宗师' }, { type: 'stat_bonus', value: 30, statKey: 'mana' }],
  },
  {
    id: 'achievement_forge_50',
    name: '炼器入门',
    description: '成功炼器50次',
    category: AchievementCategory.COLLECTION,
    icon: '🔨',
    requirements: [{ type: 'forge_count', target: 50 }],
    rewards: [{ type: 'gold', value: 300 }],
  },
  {
    id: 'achievement_gold_10000',
    name: '小有积蓄',
    description: '累计赚取10000灵石',
    category: AchievementCategory.COLLECTION,
    icon: '💰',
    requirements: [{ type: 'gold_earned', target: 10000 }],
    rewards: [{ type: 'title', value: '小有积蓄' }],
  },
  {
    id: 'achievement_gold_100000',
    name: '富甲一方',
    description: '累计赚取100000灵石',
    category: AchievementCategory.COLLECTION,
    icon: '💰',
    requirements: [{ type: 'gold_earned', target: 100000 }],
    rewards: [{ type: 'title', value: '富甲一方' }, { type: 'stat_bonus', value: 50, statKey: 'defense' }],
  },
  {
    id: 'achievement_breakthrough_10',
    name: '破境十次',
    description: '成功突破境界10次',
    category: AchievementCategory.CULTIVATION,
    icon: '⚡',
    requirements: [{ type: 'breakthrough_count', target: 10 }],
    rewards: [{ type: 'gold', value: 500 }],
  },
  {
    id: 'achievement_equip_all',
    name: '全副武装',
    description: '同时穿戴5件装备',
    category: AchievementCategory.COLLECTION,
    icon: '🛡',
    requirements: [{ type: 'equipment_count', target: 5 }],
    rewards: [{ type: 'gold', value: 200 }, { type: 'stat_bonus', value: 10, statKey: 'defense' }],
  },
  {
    id: 'achievement_npc_5_friends',
    name: '广交天下',
    description: '与5位NPC达到朋友关系',
    category: AchievementCategory.SOCIAL,
    icon: '🤝',
    requirements: [{ type: 'npc_friendship', target: 5 }],
    rewards: [{ type: 'gold', value: 300 }, { type: 'title', value: '广交天下' }],
  },
  {
    id: 'achievement_reincarnation_1',
    name: '轮回初体验',
    description: '首次转世重修',
    category: AchievementCategory.CULTIVATION,
    icon: '🔄',
    requirements: [{ type: 'reincarnation_count', target: 1 }],
    rewards: [{ type: 'title', value: '轮回初体验' }],
    hidden: true,
  },
  {
    id: 'achievement_reincarnation_3',
    name: '三世轮回',
    description: '转世重修3次',
    category: AchievementCategory.CULTIVATION,
    icon: '🔄',
    requirements: [{ type: 'reincarnation_count', target: 3 }],
    rewards: [{ type: 'title', value: '三世轮回' }, { type: 'stat_bonus', value: 100, statKey: 'hp' }],
    hidden: true,
  },
  {
    id: 'achievement_spend_50000',
    name: '挥金如土',
    description: '累计消费50000灵石',
    category: AchievementCategory.COLLECTION,
    icon: '💸',
    requirements: [{ type: 'spend_gold', target: 50000 }],
    rewards: [{ type: 'title', value: '挥金如土' }],
  },
  {
    id: 'achievement_kill_5000',
    name: '杀伐果断',
    description: '击杀5000只怪物',
    category: AchievementCategory.BATTLE,
    icon: '☠',
    requirements: [{ type: 'kill_monsters', target: 5000 }],
    rewards: [{ type: 'title', value: '杀伐果断' }, { type: 'stat_bonus', value: 30, statKey: 'attack' }],
  },
  {
    id: 'achievement_complete_200_quests',
    name: '任务大师',
    description: '完成200个任务',
    category: AchievementCategory.SOCIAL,
    icon: '📜',
    requirements: [{ type: 'complete_quests', target: 200 }],
    rewards: [{ type: 'title', value: '任务大师' }, { type: 'gold', value: 1000 }],
  },
];

export const SEED_TITLES: ITitle[] = [
  { id: 'title_beginner', name: '初窥门径', description: '首次突破到搬血境获得', icon: '🌱', effects: { attack: 2 }, rarity: 'common' },
  { id: 'title_cave', name: '洞天开辟', description: '突破到洞天境获得', icon: '🏠', effects: { defense: 5 }, rarity: 'common' },
  { id: 'title_spirit', name: '化灵成圣', description: '突破到化灵境获得', icon: '✨', effects: { hp: 30 }, rarity: 'rare' },
  { id: 'title_hundred_kills', name: '百斩', description: '击杀100只怪物获得', icon: '⚔', effects: { attack: 3 }, rarity: 'common' },
  { id: 'title_thousand_kills', name: '千斩', description: '击杀1000只怪物获得', icon: '⚔', effects: { attack: 10, crit: 0.05 }, rarity: 'rare' },
  { id: 'title_quest_10', name: '初入江湖', description: '完成10个任务获得', icon: '📜', effects: { hp: 20 }, rarity: 'common' },
  { id: 'title_quest_50', name: '江湖老手', description: '完成50个任务获得', icon: '📜', effects: { hp: 50, mana: 30 }, rarity: 'rare' },
  { id: 'title_explorer', name: '踏遍天下', description: '发现所有区域获得', icon: '🗺', effects: { speed: 10, defense: 5 }, rarity: 'epic' },
  { id: 'title_baoshu_collector', name: '宝术收藏家', description: '收集10种宝术获得', icon: '📚', effects: { attack: 15 }, rarity: 'epic' },
  { id: 'title_supreme', name: '至尊', description: '突破到至尊境获得', icon: '👑', effects: { attack: 50, defense: 50, hp: 200 }, rarity: 'legendary' },
  { id: 'title_xiaobudian', name: '小不点', description: '石村少年，天生至尊骨，初出茅庐', icon: '👶', effects: { attack: 5, spiritAbsorbRate: 1.1 }, rarity: 'common' },
  { id: 'title_shaonian_zhizun', name: '少年至尊', description: '年少成名，同辈无敌，威震荒域', icon: '⚡', effects: { attack: 15, critRate: 0.05 }, rarity: 'rare' },
  { id: 'title_xuemo', name: '血魔', description: '征战四方，血染沙场，凶名远播', icon: '🩸', effects: { attack: 25, hp: 80 }, rarity: 'rare' },
  { id: 'title_shihuang', name: '石皇', description: '石国之皇，威震一方，万民敬仰', icon: '👑', effects: { defense: 30, hp: 100, attack: 15 }, rarity: 'epic' },
  { id: 'title_huang', name: '荒', description: '石昊之名，响彻九天，独断万古', icon: '🌌', effects: { attack: 40, defense: 20, critRate: 0.1 }, rarity: 'epic' },
  { id: 'title_lunhui_shihao', name: '轮回石昊', description: '轮回九世，逆命重修，再创辉煌', icon: '🔄', effects: { attack: 50, hp: 150, spiritAbsorbRate: 1.2 }, rarity: 'legendary' },
  { id: 'title_tianting_zhuzhu', name: '天庭之主', description: '建立天庭，统御诸天，万族朝拜', icon: '🏛', effects: { attack: 80, defense: 60, hp: 250 }, rarity: 'legendary' },
  { id: 'title_huangtiandi', name: '荒天帝', description: '独断万古，镇压一切，成为至高无上的存在', icon: '🌟', effects: { attack: 150, defense: 100, hp: 500, critRate: 0.2 }, rarity: 'mythic' },
  { id: 'title_duduan_wangu', name: '独断万古', description: '石昊最终成就，以一己之力斩断万古纪元', icon: '⚔', effects: { attack: 200, defense: 150, hp: 800, critRate: 0.3 }, rarity: 'mythic' },
  // ===== 扩展称号 =====
  { id: 'title_daoxin', name: '道心坚定', description: '修炼千次，道心坚如磐石', icon: '🧘', effects: { mana: 100, spiritAbsorbRate: 1.1 }, rarity: 'rare' },
  { id: 'title_wanfa', name: '万法归宗', description: '博学多才，融汇万法', icon: '📖', effects: { attack: 30, mana: 50 }, rarity: 'epic' },
  { id: 'title_dandao_zongshi', name: '丹道宗师', description: '炼丹大成，丹道宗师', icon: '⚗', effects: { mana: 80, hp: 50 }, rarity: 'epic' },
  { id: 'title_fujia', name: '富甲一方', description: '富甲一方，财大气粗', icon: '💰', effects: { defense: 50, hp: 100 }, rarity: 'epic' },
  { id: 'title_guangjiao', name: '广交天下', description: '广交天下好友，人脉广阔', icon: '🤝', effects: { hp: 80, mana: 40, speed: 5 }, rarity: 'rare' },
  { id: 'title_lunhui_1', name: '轮回初体验', description: '首次轮回，初窥轮回之道', icon: '🔄', effects: { hp: 200, mana: 100 }, rarity: 'legendary' },
  { id: 'title_lunhui_3', name: '三世轮回', description: '三世轮回，轮回大道小成', icon: '🔄', effects: { hp: 500, attack: 50, defense: 50 }, rarity: 'legendary' },
  { id: 'title_huijin', name: '挥金如土', description: '挥金如土，豪气干云', icon: '💸', effects: { attack: 20, defense: 20 }, rarity: 'rare' },
  { id: 'title_shafa', name: '杀伐果断', description: '杀伐果断，威震四方', icon: '☠', effects: { attack: 60, critRate: 0.05 }, rarity: 'epic' },
  { id: 'title_renwu_dashi', name: '任务大师', description: '任务大师，名震江湖', icon: '📜', effects: { hp: 100, mana: 50, speed: 10 }, rarity: 'epic' },
  { id: 'title_xiaoyou', name: '小有积蓄', description: '小有积蓄，初通财运', icon: '💰', effects: { defense: 10 }, rarity: 'common' },
];

export function findTitle(id: string): ITitle | undefined {
  return SEED_TITLES.find(t => t.id === id);
}