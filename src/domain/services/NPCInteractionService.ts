import { INPC } from '../entities/NPC';
import { IPlayer } from '../entities/Player';
import { NPCRelationshipService } from './NPCRelationshipService';
import { NPCRelationshiptatus } from '../entities/NPCRelationship';
import { NPCLifeService } from './NPCLifeService';
import { GameEvents } from '../../infrastructure/event/EventBus';

export enum NPCInteractionType {
  CHAT = 'chat',
  ARGUE = 'argue',
  TRADE = 'trade',
  GOSSIP = 'gossip',
  FIGHT = 'fight',
  HELP = 'help',
  AVOID = 'avoid',
  COOPERATE = 'cooperate',
  BETRAY = 'betray',
}

export interface INPCInteractionResult {
  type: NPCInteractionType;
  initiator: string;
  target: string;
  description: string;
  favorabilityChange: number;
  timestamp: number;
  location: string;
}

export interface INPCMemory {
  npcId: string;
  aboutPlayer: {
    metCount: number;
    lastMet: number;
    notableEvents: string[];
    playerReputation: string;
  };
  aboutOtherNPCs: Map<string, {
    favorability: number;
    notableEvents: string[];
  }>;
  rumors: string[];
}

export class NPCInteractionService {
  private static instance: NPCInteractionService;
  private npcMemories: Map<string, INPCMemory> = new Map();
  private recentInteractions: INPCInteractionResult[] = [];
  private maxRecentInteractions = 50;

  private constructor() {}

  static getInstance(): NPCInteractionService {
    if (!NPCInteractionService.instance) {
      NPCInteractionService.instance = new NPCInteractionService();
    }
    return NPCInteractionService.instance;
  }

  /** 获取或创建NPC记忆 */
  getMemory(npcId: string): INPCMemory {
    if (!this.npcMemories.has(npcId)) {
      this.npcMemories.set(npcId, {
        npcId,
        aboutPlayer: {
          metCount: 0,
          lastMet: 0,
          notableEvents: [],
          playerReputation: 'unknown',
        },
        aboutOtherNPCs: new Map(),
        rumors: [],
      });
    }
    return this.npcMemories.get(npcId)!;
  }

  /** 记录NPC与玩家的会面 */
  recordPlayerMeeting(npcId: string, player: IPlayer, event?: string): void {
    const memory = this.getMemory(npcId);
    memory.aboutPlayer.metCount++;
    memory.aboutPlayer.lastMet = Date.now();
    if (event) {
      memory.aboutPlayer.notableEvents.push(event);
      if (memory.aboutPlayer.notableEvents.length > 20) {
        memory.aboutPlayer.notableEvents.shift();
      }
    }
  }

  /** 记录NPC之间的好感度 */
  recordNPCRelation(npcId: string, otherNpcId: string, favorabilityChange: number, event?: string): void {
    const memory = this.getMemory(npcId);
    let relation = memory.aboutOtherNPCs.get(otherNpcId);
    if (!relation) {
      relation = { favorability: 0, notableEvents: [] };
      memory.aboutOtherNPCs.set(otherNpcId, relation);
    }
    relation.favorability = Math.max(-100, Math.min(100, relation.favorability + favorabilityChange));
    if (event) {
      relation.notableEvents.push(event);
      if (relation.notableEvents.length > 10) {
        relation.notableEvents.shift();
      }
    }
  }

  /** 获取NPC对另一个NPC的好感度 */
  getNPCRelation(npcId: string, otherNpcId: string): number {
    const memory = this.getMemory(npcId);
    return memory.aboutOtherNPCs.get(otherNpcId)?.favorability || 0;
  }

  /** 传播传闻 */
  spreadRumor(fromNpcId: string, toNpcId: string, rumor: string): boolean {
    const fromRelation = this.getNPCRelation(fromNpcId, toNpcId);
    // 只有关系不太差才会传播
    if (fromRelation < -30) return false;

    const toMemory = this.getMemory(toNpcId);
    if (!toMemory.rumors.includes(rumor)) {
      toMemory.rumors.push(rumor);
      if (toMemory.rumors.length > 10) {
        toMemory.rumors.shift();
      }
    }
    return true;
  }

  /** NPC之间的随机交互 */
  processNPCInteraction(
    npc1: INPC,
    npc2: INPC,
    location: string,
    lifeService: NPCLifeService,
  ): INPCInteractionResult | null {
    const relation = this.getNPCRelation(npc1.id, npc2.id);
    const state1 = lifeService.getNPCState(npc1.id);
    const state2 = lifeService.getNPCState(npc2.id);

    // 根据关系决定交互类型
    let possibleInteractions: { type: NPCInteractionType; weight: number }[] = [];

    if (relation >= 50) {
      possibleInteractions = [
        { type: NPCInteractionType.CHAT, weight: 40 },
        { type: NPCInteractionType.COOPERATE, weight: 30 },
        { type: NPCInteractionType.TRADE, weight: 15 },
        { type: NPCInteractionType.HELP, weight: 15 },
      ];
    } else if (relation >= 0) {
      possibleInteractions = [
        { type: NPCInteractionType.CHAT, weight: 50 },
        { type: NPCInteractionType.TRADE, weight: 20 },
        { type: NPCInteractionType.GOSSIP, weight: 20 },
        { type: NPCInteractionType.ARGUE, weight: 10 },
      ];
    } else if (relation >= -30) {
      possibleInteractions = [
        { type: NPCInteractionType.AVOID, weight: 30 },
        { type: NPCInteractionType.ARGUE, weight: 40 },
        { type: NPCInteractionType.GOSSIP, weight: 20 },
        { type: NPCInteractionType.FIGHT, weight: 10 },
      ];
    } else {
      possibleInteractions = [
        { type: NPCInteractionType.FIGHT, weight: 40 },
        { type: NPCInteractionType.ARGUE, weight: 30 },
        { type: NPCInteractionType.AVOID, weight: 20 },
        { type: NPCInteractionType.BETRAY, weight: 10 },
      ];
    }

    // 心情影响
    if (state1 && state1.mood === 'angry') {
      possibleInteractions.forEach(i => { if (i.type === NPCInteractionType.ARGUE || i.type === NPCInteractionType.FIGHT) i.weight *= 2; });
    }
    if (state1 && state1.mood === 'happy') {
      possibleInteractions.forEach(i => { if (i.type === NPCInteractionType.CHAT || i.type === NPCInteractionType.COOPERATE) i.weight *= 1.5; });
    }

    // 加权随机选择
    const totalWeight = possibleInteractions.reduce((sum, i) => sum + i.weight, 0);
    let random = Math.random() * totalWeight;
    let selected = possibleInteractions[0];
    for (const interaction of possibleInteractions) {
      random -= interaction.weight;
      if (random <= 0) {
        selected = interaction;
        break;
      }
    }

    return this.executeInteraction(selected.type, npc1, npc2, location, relation);
  }

  private executeInteraction(
    type: NPCInteractionType,
    npc1: INPC,
    npc2: INPC,
    location: string,
    currentRelation: number,
  ): INPCInteractionResult | null {
    const templates = this.getInteractionTemplates(type, npc1, npc2);
    const template = templates[Math.floor(Math.random() * templates.length)];

    let favorabilityChange = 0;
    switch (type) {
      case NPCInteractionType.CHAT: favorabilityChange = 1; break;
      case NPCInteractionType.COOPERATE: favorabilityChange = 3; break;
      case NPCInteractionType.HELP: favorabilityChange = 5; break;
      case NPCInteractionType.TRADE: favorabilityChange = 2; break;
      case NPCInteractionType.GOSSIP: favorabilityChange = 0; break;
      case NPCInteractionType.ARGUE: favorabilityChange = -5; break;
      case NPCInteractionType.FIGHT: favorabilityChange = -15; break;
      case NPCInteractionType.BETRAY: favorabilityChange = -30; break;
      case NPCInteractionType.AVOID: favorabilityChange = -1; break;
    }

    const result: INPCInteractionResult = {
      type,
      initiator: npc1.id,
      target: npc2.id,
      description: template,
      favorabilityChange,
      timestamp: Date.now(),
      location,
    };

    this.recordNPCRelation(npc1.id, npc2.id, favorabilityChange, template);
    this.recordNPCRelation(npc2.id, npc1.id, favorabilityChange, template);
    this.addRecentInteraction(result);

    return result;
  }

  private getInteractionTemplates(type: NPCInteractionType, npc1: INPC, npc2: INPC): string[] {
    const n1 = npc1.name;
    const n2 = npc2.name;

    switch (type) {
      case NPCInteractionType.CHAT:
        return [
          `${n1}和${n2}正在闲聊最近城里的新鲜事。`,
          `${n1}向${n2}请教修炼上的疑惑。`,
          `${n1}和${n2}讨论着 upcoming 的集市。`,
          `${n1}给${n2}讲了个笑话，两人哈哈大笑。`,
          `${n1}和${n2}在交流各自的见闻。`,
        ];
      case NPCInteractionType.COOPERATE:
        return [
          `${n1}和${n2}正在合作完成一项工作。`,
          `${n1}帮${n2}搬运重物，两人配合默契。`,
          `${n1}和${n2}联手处理了一件麻烦事。`,
          `${n1}传授了${n2}一些独到的技巧。`,
        ];
      case NPCInteractionType.HELP:
        return [
          `${n1}主动帮${n2}解决了一个难题。`,
          `${n2}遇到困难，${n1}毫不犹豫地伸出援手。`,
          `${n1}给${n2}提供了一些珍贵的情报。`,
          `${n1}替${n2}解围，化解了一场尴尬。`,
        ];
      case NPCInteractionType.TRADE:
        return [
          `${n1}和${n2}正在交换物品。`,
          `${n1}用一批药材和${n2}换了几件工具。`,
          `${n1}和${n2}讨价还价了半天，终于成交。`,
        ];
      case NPCInteractionType.GOSSIP:
        return [
          `${n1}小声跟${n2}说着什么，时不时看向四周。`,
          `${n1}跟${n2}分享了最近听到的一些传闻。`,
          `${n2}从${n1}那里打听到了一些消息。`,
          `${n1}和${n2}在窃窃私语，似乎在密谋什么。`,
        ];
      case NPCInteractionType.ARGUE:
        return [
          `${n1}和${n2}发生了口角，声音越来越大。`,
          `${n1}对${n2}的某个观点强烈不满，据理力争。`,
          `${n2}质疑${n1}的能力，两人针锋相对。`,
          `${n1}觉得${n2}做事不公，当场质问。`,
          `因为一点小事，${n1}和${n2}吵了起来。`,
        ];
      case NPCInteractionType.FIGHT:
        return [
          `${n1}和${n2}大打出手！场面一度十分混乱。`,
          `${n1}突然对${n2}出手，两人战成一团。`,
          `积怨已久的${n1}和${n2}终于爆发了冲突。`,
          `${n2}出言不逊，${n1}怒不可遏，动起手来。`,
        ];
      case NPCInteractionType.BETRAY:
        return [
          `${n1}趁${n2}不备，暗中下了黑手！`,
          `${n1}泄露了${n2}的秘密，被当场撞破。`,
          `${n1}在关键时刻背叛了${n2}的信任。`,
        ];
      case NPCInteractionType.AVOID:
        return [
          `${n1}看到${n2}走过来，故意避开了目光。`,
          `${n1}找了个借口离开了，不想和${n2}待在一起。`,
          `${n1}和${n2}擦肩而过，谁也没说话。`,
        ];
      default:
        return [`${n1}和${n2}正在互动。`];
    }
  }

  private addRecentInteraction(interaction: INPCInteractionResult): void {
    this.recentInteractions.push(interaction);
    if (this.recentInteractions.length > this.maxRecentInteractions) {
      this.recentInteractions.shift();
    }
  }

  /** 获取最近的NPC交互记录 */
  getRecentInteractions(limit: number = 10): INPCInteractionResult[] {
    return this.recentInteractions.slice(-limit);
  }

  /** 获取某个地点最近发生的交互 */
  getLocationInteractions(location: string, limit: number = 5): INPCInteractionResult[] {
    return this.recentInteractions
      .filter(i => i.location === location)
      .slice(-limit);
  }

  /** 获取涉及特定NPC的交互 */
  getNPCInteractions(npcId: string, limit: number = 10): INPCInteractionResult[] {
    return this.recentInteractions
      .filter(i => i.initiator === npcId || i.target === npcId)
      .slice(-limit);
  }

  /** NPC之间传播玩家传闻 */
  spreadPlayerReputation(npcId: string, player: IPlayer, toNpcIds: string[]): string[] {
    const memory = this.getMemory(npcId);
    const spreadRumors: string[] = [];

    // 根据玩家与这个NPC的关系，生成不同的传闻
    const playerRel = NPCRelationshipService.getRelationship(player.id, npcId);
    let reputation = 'neutral';
    if (playerRel.status === NPCRelationshiptatus.HOSTILE) reputation = 'hostile';
    else if (playerRel.status === NPCRelationshiptatus.ALLY) reputation = 'ally';
    else if (playerRel.status === NPCRelationshiptatus.TRUSTED) reputation = 'trusted';
    else if (playerRel.status === NPCRelationshiptatus.FRIENDLY) reputation = 'friendly';
    else if (playerRel.status === NPCRelationshiptatus.UNFRIENDLY) reputation = 'unfriendly';

    memory.aboutPlayer.playerReputation = reputation;

    const rumors = this.generatePlayerRumors(player, reputation, npcId);

    for (const targetId of toNpcIds) {
      if (targetId === npcId) continue;
      const success = this.spreadRumor(npcId, targetId, rumors[0]);
      if (success) {
        spreadRumors.push(`${npcId} -> ${targetId}: ${rumors[0]}`);
      }
    }

    return spreadRumors;
  }

  private generatePlayerRumors(player: IPlayer, reputation: string, npcId: string): string[] {
    const rumors: Record<string, string[]> = {
      hostile: [
        `听说${player.name}心狠手辣，不可深交。`,
        `有人说${player.name}背信弃义，是个小人。`,
        `${player.name}似乎得罪了不少人，你小心点。`,
      ],
      unfriendly: [
        `${player.name}那人不太好相处，我劝你离远点。`,
        `有人说${player.name}有些古怪，不太好打交道。`,
      ],
      neutral: [
        `最近经常看到一个叫${player.name}的修士。`,
        `${player.name}似乎刚来这一带，来历不明。`,
      ],
      friendly: [
        `${player.name}那人还不错，挺仗义的。`,
        `我和${player.name}打过交道，是个值得结交的人。`,
      ],
      trusted: [
        `${player.name}是个可靠的人，我信得过。`,
        `如果你遇到困难，可以找${player.name}帮忙。`,
      ],
      ally: [
        `${player.name}是我最信任的伙伴，生死之交。`,
        `有${player.name}在，什么困难都不怕。`,
      ],
    };

    return rumors[reputation] || rumors.neutral;
  }

  /** 获取NPC知道的关于玩家的传闻 */
  getNPCRumorsAboutPlayer(npcId: string): string[] {
    const memory = this.getMemory(npcId);
    return [...memory.rumors];
  }

  /** 清除所有记忆（用于转世等） */
  resetAllMemories(): void {
    this.npcMemories.clear();
    this.recentInteractions = [];
  }
}
