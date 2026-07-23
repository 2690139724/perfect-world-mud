import { IPlayer } from '../entities/Player';
import { IItem } from '../entities/Item';

export enum NpcType {
  MERCHANT = '商人',
  BLACKSMITH = '铁匠',
  ALCHEMIST = '炼丹师',
  QUEST_GIVER = '任务发布者',
  TRAINER = '导师',
  GUILD_MASTER = '宗门掌门',
  HEALER = '医师',
  MYSTERIOUS = '神秘人',
  ENEMY = '敌人',
}

export enum NpcReputation {
  HOSTILE = '敌对',
  NEUTRAL = '中立',
  FRIENDLY = '友好',
  TRUSTED = '信赖',
  LOYAL = '忠诚',
}

export interface INpc {
  id: string;
  name: string;
  type: NpcType;
  avatarId: string;
  description: string;
  dialogue: {
    greeting: string;
    options: { text: string; response: string; action?: string }[];
  };
  reputation: Record<string, NpcReputation>;
  affinity: Record<string, number>;
  inventory?: IItem[];
  services?: {
    type: string;
    price: number;
    description: string;
  }[];
  quests?: string[];
  location: string;
  schedule?: {
    available: boolean;
    availableTime?: string;
  };
}

export interface INpcAffinityReward {
  affinityThreshold: number;
  reward: {
    type: 'discount' | 'item' | 'service' | 'quest';
    value: string | number;
    description: string;
  };
}

export interface INpcContract {
  id: string;
  npcId: string;
  playerId: string;
  type: 'gather' | 'craft' | 'guard' | 'explore';
  duration: number;
  rewards: {
    exp: number;
    gold: number;
    items?: string[];
  };
  status: 'active' | 'completed' | 'failed';
  startTime: number;
}

export interface INpcRelationship {
  npcId: string;
  playerId: string;
  affinity: number;
  reputation: NpcReputation;
  history: {
    type: 'chat' | 'trade' | 'quest' | 'gift' | 'battle';
    timestamp: number;
    outcome: 'positive' | 'negative' | 'neutral';
  }[];
}

export const NPC_AFFINITY_REWARDS: Record<string, INpcAffinityReward[]> = {
  merchant: [
    { affinityThreshold: 100, reward: { type: 'discount', value: 0.1, description: '购物享受9折优惠' } },
    { affinityThreshold: 300, reward: { type: 'discount', value: 0.2, description: '购物享受8折优惠' } },
    { affinityThreshold: 500, reward: { type: 'item', value: 'item_rare_material', description: '赠送稀有材料' } },
  ],
  blacksmith: [
    { affinityThreshold: 200, reward: { type: 'discount', value: 0.15, description: '锻造费用降低15%' } },
    { affinityThreshold: 500, reward: { type: 'service', value: 'enhance', description: '解锁强化服务' } },
  ],
};

export const NPC_CONTRACTS = [
  {
    id: 'contract_gather',
    type: 'gather',
    description: '收集灵草',
    duration: 3600000,
    rewards: { exp: 1000, gold: 500 },
  },
  {
    id: 'contract_craft',
    type: 'craft',
    description: '炼制丹药',
    duration: 7200000,
    rewards: { exp: 2000, gold: 1000 },
  },
];

export class NpcService {
  static getNpcAffinity(player: IPlayer, npcId: string): number {
    return player.intimacyMap.get(npcId) || 0;
  }

  static changeAffinity(player: IPlayer, npcId: string, amount: number): void {
    const current = player.intimacyMap.get(npcId) || 0;
    player.intimacyMap.set(npcId, Math.max(0, Math.min(1000, current + amount)));
  }

  static getNpcReputation(player: IPlayer, npcId: string): NpcReputation {
    const affinity = this.getNpcAffinity(player, npcId);
    
    if (affinity < 50) return NpcReputation.HOSTILE;
    if (affinity < 100) return NpcReputation.NEUTRAL;
    if (affinity < 300) return NpcReputation.FRIENDLY;
    if (affinity < 500) return NpcReputation.TRUSTED;
    return NpcReputation.LOYAL;
  }

  static getAffinityRewards(npcType: string, affinity: number): INpcAffinityReward[] {
    const rewards = NPC_AFFINITY_REWARDS[npcType] || [];
    return rewards.filter(r => affinity >= r.affinityThreshold);
  }

  static interactWithNpc(player: IPlayer, npcId: string, action: string): {
    success: boolean;
    message: string;
    affinityChange?: number;
  } {
    const affinityChangeMap: Record<string, number> = {
      chat: 5,
      trade: 2,
      gift: 20,
      quest: 15,
      help: 25,
    };

    const affinityChange = affinityChangeMap[action] || 0;
    this.changeAffinity(player, npcId, affinityChange);

    return {
      success: true,
      message: `与NPC交互成功！`,
      affinityChange,
    };
  }

  static hireNpc(player: IPlayer, npcId: string): {
    success: boolean;
    message: string;
  } {
    const affinity = this.getNpcAffinity(player, npcId);
    if (affinity < 300) {
      return { success: false, message: '好感度不足，无法雇佣' };
    }

    const cost = 10000;
    if (player.gold < cost) {
      return { success: false, message: '金币不足' };
    }

    player.gold -= cost;

    return { success: true, message: `成功雇佣NPC！` };
  }

  static assignContract(player: IPlayer, npcId: string, contractType: string): {
    success: boolean;
    message: string;
    contract?: INpcContract;
  } {
    const contractTemplate = NPC_CONTRACTS.find(c => c.id === `contract_${contractType}`);
    if (!contractTemplate) {
      return { success: false, message: '契约类型不存在' };
    }

    const contract: INpcContract = {
      id: `contract_${Date.now()}`,
      npcId,
      playerId: player.id,
      type: contractType as INpcContract['type'],
      duration: contractTemplate.duration,
      rewards: contractTemplate.rewards,
      status: 'active',
      startTime: Date.now(),
    };

    return { success: true, message: '契约已分配！', contract };
  }

  static completeContract(player: IPlayer, contractId: string): {
    success: boolean;
    message: string;
    rewards?: { exp: number; gold: number; items?: string[] };
  } {
    return {
      success: true,
      message: '契约完成！',
      rewards: { exp: 1000, gold: 500 },
    };
  }

  static getNpcDialogue(npcId: string): { greeting: string; options: { text: string; response: string }[] } {
    return {
      greeting: '欢迎光临！',
      options: [
        { text: '你好', response: '你好！有什么可以帮你的吗？' },
        { text: '离开', response: '再见！' },
      ],
    };
  }

  static buyFromNpc(player: IPlayer, npcId: string, itemId: string, quantity: number): {
    success: boolean;
    message: string;
    item?: IItem;
  } {
    const affinity = this.getNpcAffinity(player, npcId);
    const rewards = this.getAffinityRewards('merchant', affinity);
    const discountReward = rewards.find(r => r.reward.type === 'discount');
    const discount = discountReward ? (discountReward.reward.value as number) : 0;

    const price = 100 * quantity * (1 - discount);
    
    if (player.gold < price) {
      return { success: false, message: '金币不足' };
    }

    player.gold -= Math.floor(price);

    return {
      success: true,
      message: `购买成功！${discount > 0 ? `享受${Math.floor(discount * 100)}%优惠` : ''}`,
    };
  }
}