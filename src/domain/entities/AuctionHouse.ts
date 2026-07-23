export enum AuctionStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  ENDED = 'ended',
}

export interface IAuctionItem {
  id: string;
  itemId: string;
  itemName: string;
  itemIcon: string;
  quality: string;
  startingPrice: number;
  currentPrice: number;
  currentBidder?: string;
  increment: number;
  endTime: number;
  status: AuctionStatus;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  /** NPC对该物品的兴趣度（0-1），越高越可能竞价 */
  npcInterest?: number;
  /** 该物品的价格上限（NPC不会超过此价） */
  npcMaxBudget?: number;
}

export interface IAuctionSession {
  id: string;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
  items: IAuctionItem[];
  status: AuctionStatus;
}

export interface IAuctionHistory {
  sessionId: string;
  itemId: string;
  itemName: string;
  bidPrice: number;
  timestamp: number;
  won: boolean;
}

export const AUCTION_CONFIG = {
  dailyTimes: [9, 15, 21],
  sessionDurationMinutes: 60,
  minimumIncrement: 10,
  /** NPC竞价间隔（秒） */
  npcBidIntervalSeconds: 15,
  /** NPC竞价概率基础值 */
  npcBidBaseChance: 0.35,
};

/** 拍卖会NPC竞价者名字池——基于修仙世界设定 */
export const AUCTION_NPC_NAMES: string[] = [
  '青衣老者', '紫袍修士', '金甲武士', '白发道人', '红纱女子',
  '黑衣杀手', '白衣少年', '碧落仙子', '苍鬓剑客', '玄衣商贾',
  '赤足散人', '玉面书生', '铁面判官', '银发婆婆', '青衫剑修',
  '黄袍力士', '蓝衣丹师', '灰袍隐士', '翠羽灵女', '墨衣暗卫',
  '丹鼎宗长老', '天剑门弟子', '万宝楼掌柜', '灵兽谷谷主', '阵法宗师',
  '散修强者', '魔道修士', '佛门和尚', '妖族长老', '龙宫使者',
];

export const SEED_AUCTION_ITEMS: Partial<IAuctionItem>[] = [
  { itemId: 'ancient_bone', startingPrice: 100, increment: 20, rarity: 'rare' },
  { itemId: 'spirit_crystal', startingPrice: 50, increment: 10, rarity: 'common' },
  { itemId: 'soul_fragment', startingPrice: 150, increment: 30, rarity: 'epic' },
  { itemId: 'baoshu_fragment_zhenlong', startingPrice: 500, increment: 100, rarity: 'legendary' },
  { itemId: 'baoshu_fragment_qingluan', startingPrice: 400, increment: 80, rarity: 'legendary' },
  { itemId: 'baoshu_fragment_taotie', startingPrice: 400, increment: 80, rarity: 'legendary' },
  { itemId: 'law_essence_time', startingPrice: 1000, increment: 200, rarity: 'mythic' },
  { itemId: 'law_essence_destiny', startingPrice: 1200, increment: 250, rarity: 'mythic' },
  { itemId: 'talent_fragment', startingPrice: 200, increment: 40, rarity: 'epic' },
  { itemId: 'blood_pill', startingPrice: 30, increment: 5, rarity: 'common' },
  { itemId: 'exp_pill', startingPrice: 25, increment: 5, rarity: 'common' },
];

export function generateAuctionSession(): IAuctionSession {
  const now = Date.now();
  const sessionId = `auction_${now}`;
  const randomItems = [...SEED_AUCTION_ITEMS]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5 + Math.floor(Math.random() * 4));

  /** 稀有度→NPC兴趣度与预算倍数映射 */
  const rarityConfig: Record<string, { interest: number; budgetMult: number }> = {
    common: { interest: 0.2, budgetMult: 2 },
    rare: { interest: 0.4, budgetMult: 3 },
    epic: { interest: 0.55, budgetMult: 4 },
    legendary: { interest: 0.7, budgetMult: 6 },
    mythic: { interest: 0.85, budgetMult: 10 },
  };

  const items: IAuctionItem[] = randomItems.map((item, index) => {
    const cfg = rarityConfig[item.rarity!] || rarityConfig.common;
    return {
      id: `${sessionId}_item_${index}`,
      itemId: item.itemId!,
      itemName: '',
      itemIcon: '',
      quality: '',
      startingPrice: item.startingPrice!,
      currentPrice: item.startingPrice!,
      increment: item.increment!,
      endTime: now + AUCTION_CONFIG.sessionDurationMinutes * 60 * 1000,
      status: AuctionStatus.RUNNING,
      rarity: item.rarity!,
      npcInterest: cfg.interest,
      npcMaxBudget: item.startingPrice! * cfg.budgetMult,
    };
  });

  return {
    id: sessionId,
    name: '石城拍卖会',
    description: '荒域最大的拍卖会之一，汇聚天下奇珍异宝。',
    startTime: now,
    endTime: now + AUCTION_CONFIG.sessionDurationMinutes * 60 * 1000,
    items,
    status: AuctionStatus.RUNNING,
  };
}