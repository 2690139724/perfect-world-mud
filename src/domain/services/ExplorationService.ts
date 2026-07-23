import { IPlayer } from '../entities/Player';

export enum ExplorationEventType {
  ENCOUNTER_MONSTER = 'encounter_monster',
  FIND_TREASURE = 'find_treasure',
  DISCOVER_HIDDEN_AREA = 'discover_hidden_area',
  MEET_NPC = 'meet_npc',
  TRAP = 'trap',
  EVENT = 'random_event',
}

export interface IExplorationEvent {
  id: string;
  type: ExplorationEventType;
  title: string;
  description: string;
  rewards?: {
    exp: number;
    gold: number;
    items: string[];
    reputation?: number;
  };
  penalties?: {
    hpLoss: number;
    goldLoss: number;
  };
  choices?: {
    id: string;
    text: string;
    result: string;
    rewards?: { exp?: number; gold?: number; items?: string[] };
    penalties?: { hpLoss?: number; goldLoss?: number };
  }[];
  zoneId: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface IExplorationLog {
  id: string;
  eventId: string;
  timestamp: number;
  outcome: 'success' | 'failure' | 'partial';
  rewards?: { exp?: number; gold?: number; items?: string[] };
}

export interface IMysticZone {
  id: string;
  name: string;
  description: string;
  entranceCondition: {
    minRealm: number;
    requiredItems?: string[];
    requiredQuests?: string[];
  };
  difficulty: 'normal' | 'hard' | 'epic' | 'legendary';
  rewards: {
    exp: number;
    gold: number;
    uniqueItems: string[];
  };
  discovered: boolean;
  cleared: boolean;
  resetTime: number;
}

export const EXPLORATION_EVENTS: IExplorationEvent[] = [
  {
    id: 'event_treasure',
    type: ExplorationEventType.FIND_TREASURE,
    title: '发现宝藏',
    description: '你在一处隐蔽的山洞中发现了古代修士留下的宝藏！',
    rewards: { exp: 2000, gold: 5000, items: ['mat_ancient_coin', 'mat_mystical_gem'] },
    zoneId: 'zone_ancient_ruins',
    rarity: 'rare',
  },
  {
    id: 'event_monster',
    type: ExplorationEventType.ENCOUNTER_MONSTER,
    title: '遭遇妖兽',
    description: '一头强大的妖兽挡住了你的去路！',
    choices: [
      { id: 'fight', text: '战斗', result: '成功击败妖兽！', rewards: { exp: 1500, gold: 2000 } },
      { id: 'flee', text: '逃跑', result: '成功逃跑，但损失了一些金币', penalties: { goldLoss: 500 } },
    ],
    zoneId: 'zone_wilderness',
    rarity: 'common',
  },
  {
    id: 'event_hidden',
    type: ExplorationEventType.DISCOVER_HIDDEN_AREA,
    title: '发现隐藏区域',
    description: '你发现了一条隐蔽的通道，通向未知的区域...',
    rewards: { exp: 1000, gold: 0, items: [], reputation: 50 },
    zoneId: 'zone_mountain',
    rarity: 'epic',
  },
  {
    id: 'event_trap',
    type: ExplorationEventType.TRAP,
    title: '触发陷阱',
    description: '你不小心触发了一处古代陷阱！',
    penalties: { hpLoss: 200, goldLoss: 0 },
    zoneId: 'zone_ancient_ruins',
    rarity: 'common',
  },
  {
    id: 'event_npc',
    type: ExplorationEventType.MEET_NPC,
    title: '遇到神秘老者',
    description: '一位神秘的老者正在此地修炼...',
    choices: [
      { id: 'chat', text: '交谈', result: '老者传授了你一些修炼心得', rewards: { exp: 3000 } },
      { id: 'leave', text: '悄悄离开', result: '你安静地离开了', rewards: { exp: 500 } },
    ],
    zoneId: 'zone_sacred_land',
    rarity: 'legendary',
  },
];

export const MYSTIC_ZONES: IMysticZone[] = [
  {
    id: 'mystic_1',
    name: '远古秘境',
    description: '上古时期遗留的秘境，蕴含无数宝藏',
    entranceCondition: { minRealm: 5 },
    difficulty: 'epic',
    rewards: { exp: 50000, gold: 100000, uniqueItems: ['mat_ancient_artifact', 'mat_secret_technique'] },
    discovered: false,
    cleared: false,
    resetTime: 86400000,
  },
  {
    id: 'mystic_2',
    name: '仙域碎片',
    description: '从仙域坠落的碎片，蕴含仙力',
    entranceCondition: { minRealm: 10, requiredItems: ['item_immortal_key'] },
    difficulty: 'legendary',
    rewards: { exp: 200000, gold: 500000, uniqueItems: ['mat_immortal_essence', 'mat_divine_spark'] },
    discovered: false,
    cleared: false,
    resetTime: 172800000,
  },
];

export class ExplorationService {
  static exploreZone(player: IPlayer, zoneId: string): {
    success: boolean;
    events: IExplorationEvent[];
    log: IExplorationLog[];
    message: string;
  } {
    const zoneEvents = EXPLORATION_EVENTS.filter(e => e.zoneId === zoneId);
    if (zoneEvents.length === 0) {
      return { success: false, events: [], log: [], message: '该区域没有探索事件' };
    }

    const numEvents = Math.min(3, 1 + Math.floor(Math.random() * 3));
    const shuffled = [...zoneEvents].sort(() => Math.random() - 0.5);
    const selectedEvents = shuffled.slice(0, numEvents);

    const logs: IExplorationLog[] = [];

    for (const event of selectedEvents) {
      const log: IExplorationLog = {
        id: `log_${Date.now()}_${Math.random().toString(36)}`,
        eventId: event.id,
        timestamp: Date.now(),
        outcome: 'success',
      };

      if (event.rewards) {
        player.cultivationExp += event.rewards.exp;
        player.gold += event.rewards.gold;
        log.rewards = { exp: event.rewards.exp, gold: event.rewards.gold };
      }

      if (event.penalties) {
        player.hp = Math.max(1, player.hp - event.penalties.hpLoss);
        player.gold = Math.max(0, player.gold - event.penalties.goldLoss);
        log.outcome = 'failure';
      }

      logs.push(log);
    }

    return {
      success: true,
      events: selectedEvents,
      log: logs,
      message: `探索完成！触发了${selectedEvents.length}个事件`,
    };
  }

  static handleEventChoice(player: IPlayer, event: IExplorationEvent, choiceId: string): {
    success: boolean;
    result: string;
    rewards?: { exp?: number; gold?: number; items?: string[] };
    penalties?: { hpLoss?: number; goldLoss?: number };
  } {
    const choice = event.choices?.find(c => c.id === choiceId);
    if (!choice) {
      return { success: false, result: '选项不存在' };
    }

    if (choice.rewards) {
      if (choice.rewards.exp) player.cultivationExp += choice.rewards.exp;
      if (choice.rewards.gold) player.gold += choice.rewards.gold;
    }

    if (choice.penalties) {
      if (choice.penalties.hpLoss) player.hp = Math.max(1, player.hp - choice.penalties.hpLoss);
      if (choice.penalties.goldLoss) player.gold = Math.max(0, player.gold - choice.penalties.goldLoss);
    }

    return {
      success: true,
      result: choice.result,
      rewards: choice.rewards,
      penalties: choice.penalties,
    };
  }

  static discoverMysticZone(player: IPlayer, zoneId: string): {
    success: boolean;
    message: string;
    zone?: IMysticZone;
  } {
    const zone = MYSTIC_ZONES.find(z => z.id === zoneId);
    if (!zone) {
      return { success: false, message: '秘境不存在' };
    }

    if (zone.discovered) {
      return { success: false, message: '秘境已被发现' };
    }

    if (player.realm < zone.entranceCondition.minRealm) {
      return { success: false, message: '境界不足' };
    }

    if (zone.entranceCondition.requiredItems) {
      for (const itemId of zone.entranceCondition.requiredItems) {
        if (!player.inventory.some(item => item.id === itemId)) {
          return { success: false, message: `缺少必要物品：${itemId}` };
        }
      }
    }

    zone.discovered = true;
    return { success: true, message: `发现秘境「${zone.name}」！`, zone };
  }

  static enterMysticZone(player: IPlayer, zoneId: string): {
    success: boolean;
    message: string;
    rewards?: { exp: number; gold: number; items: string[] };
  } {
    const zone = MYSTIC_ZONES.find(z => z.id === zoneId);
    if (!zone) {
      return { success: false, message: '秘境不存在' };
    }

    if (!zone.discovered) {
      return { success: false, message: '秘境未被发现' };
    }

    if (player.realm < zone.entranceCondition.minRealm) {
      return { success: false, message: '境界不足' };
    }

    const now = Date.now();
    if (zone.cleared && now - zone.resetTime < zone.resetTime) {
      return { success: false, message: '秘境尚未重置' };
    }

    player.cultivationExp += zone.rewards.exp;
    player.gold += zone.rewards.gold;
    zone.cleared = true;

    return {
      success: true,
      message: `成功通关秘境「${zone.name}」！获得丰厚奖励！`,
      rewards: { exp: zone.rewards.exp, gold: zone.rewards.gold, items: zone.rewards.uniqueItems },
    };
  }

  static getExplorationLog(player: IPlayer): IExplorationLog[] {
    return [];
  }

  static getMysticZones(player: IPlayer): IMysticZone[] {
    return MYSTIC_ZONES.filter(z => z.discovered || player.realm >= z.entranceCondition.minRealm);
  }
}