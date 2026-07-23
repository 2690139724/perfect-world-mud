import { IPlayer } from '../entities/Player';
import { WorldId } from '../entities/WorldDefinition';

export enum WorldReputation {
  STRANGER = '陌生人',
  ACQUAINTED = '相识',
  FRIENDLY = '友好',
  RESPECTED = '尊敬',
  HONORED = '崇敬',
  LEGENDARY = '传说',
}

export interface IWorldBoss {
  id: string;
  name: string;
  worldId: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  rewards: {
    exp: number;
    gold: number;
    items: string[];
    reputation: number;
  };
  respawnTime: number;
  lastDefeatedTime: number;
  difficulty: 'normal' | 'hard' | 'epic' | 'legendary';
}

export interface IWorldTrade {
  id: string;
  fromWorldId: string;
  toWorldId: string;
  goods: Record<string, number>;
  priceModifier: number;
  duration: number;
}

export interface IWorldQuest {
  id: string;
  worldId: string;
  title: string;
  description: string;
  rewards: {
    exp: number;
    gold: number;
    reputation: number;
    items?: string[];
  };
  requirements: {
    minRealm: number;
    minReputation?: WorldReputation;
  };
}

export const WORLD_BOSSES: IWorldBoss[] = [
  {
    id: 'boss_perfect_dragon',
    name: '太古凶龙',
    worldId: WorldId.PERFECT_WORLD,
    health: 100000,
    maxHealth: 100000,
    attack: 500,
    defense: 200,
    rewards: { exp: 50000, gold: 100000, items: ['mat_dragon_scale', 'mat_dragon_heart'], reputation: 500 },
    respawnTime: 86400000,
    lastDefeatedTime: 0,
    difficulty: 'legendary',
  },
  {
    id: 'boss_zhetian_titan',
    name: '星空巨兽',
    worldId: WorldId.ZHE_TIAN,
    health: 80000,
    maxHealth: 80000,
    attack: 400,
    defense: 300,
    rewards: { exp: 40000, gold: 80000, items: ['mat_titan_bone', 'mat_titan_blood'], reputation: 400 },
    respawnTime: 72000000,
    lastDefeatedTime: 0,
    difficulty: 'epic',
  },
  {
    id: 'boss_shengxu_immortal',
    name: '仙帝残魂',
    worldId: WorldId.SHENG_XU,
    health: 150000,
    maxHealth: 150000,
    attack: 600,
    defense: 250,
    rewards: { exp: 80000, gold: 150000, items: ['mat_immortal_essence', 'mat_divine_spark'], reputation: 800 },
    respawnTime: 172800000,
    lastDefeatedTime: 0,
    difficulty: 'legendary',
  },
];

export const WORLD_TRADES: IWorldTrade[] = [
  {
    id: 'trade_perfect_to_zhetian',
    fromWorldId: WorldId.PERFECT_WORLD,
    toWorldId: WorldId.ZHE_TIAN,
    goods: { 'mat_spirit_stone': 10, 'mat_herb': 5 },
    priceModifier: 1.5,
    duration: 3600000,
  },
  {
    id: 'trade_doupo_to_perfect',
    fromWorldId: WorldId.DOU_PO,
    toWorldId: WorldId.PERFECT_WORLD,
    goods: { 'mat_fire_essence': 5, 'mat_medicinal_herb': 8 },
    priceModifier: 2.0,
    duration: 7200000,
  },
];

export const WORLD_QUESTS: IWorldQuest[] = [
  {
    id: 'quest_perfect_clear_monsters',
    worldId: WorldId.PERFECT_WORLD,
    title: '清除妖兽',
    description: '清除领地内的妖兽',
    rewards: { exp: 5000, gold: 2000, reputation: 50 },
    requirements: { minRealm: 3 },
  },
  {
    id: 'quest_zhetian_gather_star',
    worldId: WorldId.ZHE_TIAN,
    title: '收集星辰',
    description: '收集星辰之力',
    rewards: { exp: 8000, gold: 5000, reputation: 80 },
    requirements: { minRealm: 5 },
  },
];

export class WorldService {
  static travelToWorld(player: IPlayer, worldId: WorldId): { success: boolean; message: string } {
    if (player.currentWorldId === worldId) {
      return { success: false, message: '你已经在这个世界了' };
    }

    player.currentWorldId = worldId;

    if (!player.worldTravelRecords[worldId]) {
      player.worldTravelRecords[worldId] = {
        worldId,
        firstArrivalTime: Date.now(),
        highestRealmLevel: player.realm,
        totalTimeSpent: 0,
        ascended: false,
      };
    }

    return { success: true, message: `成功到达${worldId}` };
  }

  static checkWorldBoss(worldId: WorldId): IWorldBoss | null {
    const boss = WORLD_BOSSES.find(b => b.worldId === worldId);
    if (!boss) return null;

    const now = Date.now();
    if (now - boss.lastDefeatedTime >= boss.respawnTime) {
      return boss;
    }

    return null;
  }

  static defeatWorldBoss(player: IPlayer, boss: IWorldBoss): { success: boolean; message: string; rewards?: typeof boss.rewards } {
    boss.health = 0;
    boss.lastDefeatedTime = Date.now();

    player.cultivationExp += boss.rewards.exp;
    player.gold += boss.rewards.gold;

    return {
      success: true,
      message: `成功击败${boss.name}！获得丰厚奖励！`,
      rewards: boss.rewards,
    };
  }

  static getWorldReputation(player: IPlayer, worldId: WorldId): WorldReputation {
    const record = player.worldTravelRecords[worldId];
    if (!record) return WorldReputation.STRANGER;

    const totalExp = player.cultivationExp;
    if (totalExp < 1000) return WorldReputation.STRANGER;
    if (totalExp < 5000) return WorldReputation.ACQUAINTED;
    if (totalExp < 20000) return WorldReputation.FRIENDLY;
    if (totalExp < 50000) return WorldReputation.RESPECTED;
    if (totalExp < 100000) return WorldReputation.HONORED;
    return WorldReputation.LEGENDARY;
  }

  static tradeBetweenWorlds(player: IPlayer, tradeId: string): { success: boolean; message: string } {
    const trade = WORLD_TRADES.find(t => t.id === tradeId);
    if (!trade) {
      return { success: false, message: '贸易路线不存在' };
    }

    for (const [itemId, amount] of Object.entries(trade.goods)) {
      const count = player.inventory.filter(item => item.id === itemId).reduce((sum, item) => sum + (item.stackable ? item.maxStack : 1), 0);
      if (count < amount) {
        return { success: false, message: `物品不足：${itemId}` };
      }
    }

    const earnings = 1000 * trade.priceModifier;
    player.gold += Math.floor(earnings);

    for (const [itemId, amount] of Object.entries(trade.goods)) {
      let remaining = amount;
      player.inventory = player.inventory.filter(item => {
        if (remaining <= 0) return true;
        if (item.id === itemId) {
          remaining--;
          return false;
        }
        return true;
      });
    }

    return { success: true, message: `贸易成功！获得${Math.floor(earnings)}金币` };
  }

  static getWorldQuests(worldId: WorldId): IWorldQuest[] {
    return WORLD_QUESTS.filter(q => q.worldId === worldId);
  }

  static completeWorldQuest(player: IPlayer, questId: string): { success: boolean; message: string } {
    const quest = WORLD_QUESTS.find(q => q.id === questId);
    if (!quest) {
      return { success: false, message: '任务不存在' };
    }

    if (player.realm < quest.requirements.minRealm) {
      return { success: false, message: '境界不足' };
    }

    player.cultivationExp += quest.rewards.exp;
    player.gold += quest.rewards.gold;

    return { success: true, message: `完成任务「${quest.title}」！获得${quest.rewards.exp}经验、${quest.rewards.gold}金币` };
  }
}