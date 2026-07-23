import {
  IRumor,
  RumorType,
  RumorReliability,
  RumorStatus,
} from '../entities/Rumor';
import { eventBus } from '../../infrastructure/event/EventBus';
import { GameTimeService } from './GameTimeService';

export class RumorService {
  private static instance: RumorService;
  private rumors: Map<string, IRumor> = new Map();
  private gameTimeService: GameTimeService;

  private constructor() {
    this.gameTimeService = GameTimeService.getInstance();
    this.initializeEventListeners();
  }

  static getInstance(): RumorService {
    if (!RumorService.instance) {
      RumorService.instance = new RumorService();
    }
    return RumorService.instance;
  }

  private initializeEventListeners(): void {
    eventBus.on('gameTime:dayChanged', () => this.onDayChanged());
    eventBus.on('worldEvent:completed', (event) => this.generateEventRumor(event));
    eventBus.on('npc:activityChanged', (data) => this.generateNPCRumor(data));
    eventBus.on('faction:conflict', (data) => this.generateFactionRumor(data));
  }

  createRumor(data: {
    type: RumorType;
    title: string;
    content: string;
    source: string;
    reliability?: RumorReliability;
    tags?: string[];
    affectedNPCs?: string[];
    affectedLocations?: string[];
    affectedFactions?: string[];
  }): IRumor {
    const rumor: IRumor = {
      id: `rumor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: data.type,
      title: data.title,
      content: data.content,
      source: data.source,
      reliability: data.reliability || RumorReliability.RUMOR,
      status: RumorStatus.SPREADING,
      spreadLevel: 0,
      createdAt: this.gameTimeService.getTime().day,
      expiresAt: this.gameTimeService.getTime().day + Math.floor(Math.random() * 7) + 3,
      tags: data.tags || [],
      affectedNPCs: data.affectedNPCs,
      affectedLocations: data.affectedLocations,
      affectedFactions: data.affectedFactions,
    };

    this.rumors.set(rumor.id, rumor);
    eventBus.emit('rumor:created', rumor);

    return rumor;
  }

  private generateEventRumor(event: any): void {
    if (!event || !event.description) return;

    const reliability = Math.random() < 0.3 ? RumorReliability.CONFIRMED : RumorReliability.RUMOR;

    this.createRumor({
      type: RumorType.EVENT,
      title: event.title || '神秘事件',
      content: event.description,
      source: '路人',
      reliability,
      tags: ['事件'],
    });
  }

  private generateNPCRumor(data: any): void {
    if (!data || !data.npcName) return;

    const rumors = [
      { title: `${data.npcName}的行踪`, content: `有人说看到${data.npcName}在${data.location || '某处'}出现` },
      { title: `${data.npcName}的秘密`, content: `据说${data.npcName}最近行为古怪，似乎在隐藏什么` },
      { title: `${data.npcName}的传闻`, content: `${data.npcName}最近${data.activity || ''}的样子很奇怪` },
    ];

    if (Math.random() < 0.1) {
      const rumor = rumors[Math.floor(Math.random() * rumors.length)];
      this.createRumor({
        type: RumorType.NPC,
        title: rumor.title,
        content: rumor.content,
        source: '茶馆客人',
        reliability: RumorReliability.HEARSAY,
        tags: ['人物'],
        affectedNPCs: [data.npcId],
      });
    }
  }

  private generateFactionRumor(data: any): void {
    if (!data || !data.faction) return;

    this.createRumor({
      type: RumorType.FACTION,
      title: `${data.faction}的动向`,
      content: data.description || `${data.faction}似乎有大动作`,
      source: '情报贩子',
      reliability: RumorReliability.RUMOR,
      tags: ['势力'],
      affectedFactions: [data.faction],
    });
  }

  onDayChanged(): void {
    const currentDay = this.gameTimeService.getTime().day;

    for (const rumor of this.rumors.values()) {
      if (rumor.expiresAt <= currentDay) {
        rumor.status = RumorStatus.FADED;
      } else if (rumor.spreadLevel < 100) {
        rumor.spreadLevel = Math.min(100, rumor.spreadLevel + Math.floor(Math.random() * 20) + 5);
        if (rumor.spreadLevel >= 70) {
          rumor.status = RumorStatus.WIDELY_KNOWN;
        }
      }
    }

    if (Math.random() < 0.3) {
      this.generateRandomRumor();
    }

    eventBus.emit('rumor:updated');
  }

  private generateRandomRumor(): void {
    const rumorTemplates = [
      {
        type: RumorType.LOCATION,
        title: '神秘地点',
        content: ['据说在某个地方发现了古代遗迹', '有人声称看到了一处隐蔽的洞天福地', '某个山谷传来奇怪的光芒'],
        source: ['探险者', '采药人', '猎人'],
      },
      {
        type: RumorType.ITEM,
        title: '稀有宝物',
        content: ['传说中的神器似乎重现人间', '有人在黑市看到了罕见的材料', '某件宝物的下落有了眉目'],
        source: ['商人', '黑市消息', '拍卖行'],
      },
      {
        type: RumorType.SECRET,
        title: '秘闻',
        content: ['某个大人物隐藏了一个惊天秘密', '古老的传说似乎是真的', '有人发现了修炼的捷径'],
        source: ['神秘人', '古籍记载', '隐世高人'],
      },
      {
        type: RumorType.WARNING,
        title: '警示',
        content: ['某个区域变得危险了', '近期有强大的妖兽出没', '不明势力在暗中活动'],
        source: ['巡逻队', '幸存者', '守卫'],
      },
    ];

    const template = rumorTemplates[Math.floor(Math.random() * rumorTemplates.length)];
    const content = template.content[Math.floor(Math.random() * template.content.length)];
    const source = template.source[Math.floor(Math.random() * template.source.length)];

    this.createRumor({
      type: template.type,
      title: template.title,
      content,
      source,
      reliability: Math.random() < 0.2 ? RumorReliability.CONFIRMED : RumorReliability.RUMOR,
      tags: [template.title],
    });
  }

  getAllRumors(): IRumor[] {
    return Array.from(this.rumors.values())
      .filter((r) => r.status !== RumorStatus.FADED)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  getRumorsByType(type: RumorType): IRumor[] {
    return this.getAllRumors().filter((r) => r.type === type);
  }

  getRumorsByNPC(npcId: string): IRumor[] {
    return this.getAllRumors().filter((r) => r.affectedNPCs?.includes(npcId));
  }

  getRumorsByLocation(locationId: string): IRumor[] {
    return this.getAllRumors().filter((r) => r.affectedLocations?.includes(locationId));
  }

  getRumorsByFaction(factionId: string): IRumor[] {
    return this.getAllRumors().filter((r) => r.affectedFactions?.includes(factionId));
  }

  verifyRumor(rumorId: string, isTrue: boolean): void {
    const rumor = this.rumors.get(rumorId);
    if (!rumor) return;

    rumor.reliability = isTrue ? RumorReliability.CONFIRMED : RumorReliability.FALSE;
    rumor.status = RumorStatus.VERIFIED;

    eventBus.emit('rumor:verified', { rumor, isTrue });
  }

  spreadRumor(rumorId: string): void {
    const rumor = this.rumors.get(rumorId);
    if (!rumor) return;

    rumor.spreadLevel = Math.min(100, rumor.spreadLevel + 25);
    if (rumor.spreadLevel >= 70) {
      rumor.status = RumorStatus.WIDELY_KNOWN;
    }

    eventBus.emit('rumor:spread', rumor);
  }

  getRumorById(rumorId: string): IRumor | undefined {
    return this.rumors.get(rumorId);
  }

  removeRumor(rumorId: string): void {
    this.rumors.delete(rumorId);
    eventBus.emit('rumor:removed', rumorId);
  }
}
