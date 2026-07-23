/**
 * UI State 计算服务
 * 将原始游戏状态转换为界面需要的数据快照
 * 解耦 Store 与 Renderer
 */

import { GameStore, IGameState } from '../store/GameStore';
import { eventBus, GameEvents } from '../../infrastructure/event/EventBus';
import { IPlayer } from '../../domain/entities/Player';
import { IRoom, IExit } from '../../domain/entities/Room';
import { IZone } from '../../domain/entities/Zone';
import { IItem } from '../../domain/entities/Item';
import { WORLD_NAMES, getFullRealmName } from '../../domain/entities/WorldDefinition';

export type LayoutType = 'desktop' | 'tablet' | 'mobile';

export type EventCardType = 'item' | 'cultivation' | 'combat' | 'dialogue' | 'system' | 'quest' | 'explore';

export interface IEventCard {
  id: string;
  type: EventCardType;
  title: string;
  content: string;
  timestamp: number;
  meta?: Record<string, string | number>;
}

export interface IPlayerSnapshot {
  name: string;
  realmName: string;
  worldName: string;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  cultivationExp: number;
  maxCultivationExp: number;
  caveCount: number;
  gold: number;
  equipment: IEquipmentSnapshot[];
}

export interface ILocationSnapshot {
  roomId: string;
  roomName: string;
  roomDescription: string;
  zoneName: string;
  zoneType: string;
  zoneProgress: number;
  exits: IExit[];
}

export interface INPCSnapshot {
  id: string;
  name: string;
  title: string;
}

export interface IEquipmentSnapshot {
  slot: string;
  name: string;
  icon?: string;
}

export interface IUIState {
  layout: LayoutType;
  player: IPlayerSnapshot;
  location: ILocationSnapshot;
  npcs: INPCSnapshot[];
  equipment: IEquipmentSnapshot[];
  narrativeText: string;
  eventCards: IEventCard[];
  visiblePanels: string[];
  activeView: string;
}

export class UIService {
  private store: GameStore;
  private unsubscribe: (() => void) | null = null;
  private layout: LayoutType = 'desktop';
  private eventCards: IEventCard[] = [];

  constructor(store: GameStore) {
    this.store = store;
  }

  /**
   * 启动 UI State 计算
   */
  start(): void {
    this.unsubscribe = this.store.subscribe(() => {
      this.computeAndEmit();
    });
    this.computeAndEmit();
  }

  /**
   * 停止 UI State 计算
   */
  stop(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  /**
   * 设置当前布局
   */
  setLayout(layout: LayoutType): void {
    if (this.layout === layout) return;
    this.layout = layout;
    eventBus.emit(GameEvents.LAYOUT_CHANGED, layout);
    this.computeAndEmit();
  }

  /**
   * 获取当前 UI State
   */
  getState(): IUIState {
    const state = this.store.getState();
    return this.buildUIState(state);
  }

  /**
   * 追加事件卡片
   */
  addEventCard(card: Omit<IEventCard, 'id' | 'timestamp'>): void {
    const fullCard: IEventCard = {
      ...card,
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: Date.now(),
    };
    this.eventCards.push(fullCard);
    if (this.eventCards.length > 50) {
      this.eventCards.shift();
    }
    eventBus.emit(GameEvents.EVENT_ADDED, fullCard);
  }

  /**
   * 清空事件卡片
   */
  clearEventCards(): void {
    this.eventCards = [];
    eventBus.emit(GameEvents.EVENTS_CLEARED);
  }

  /**
   * 计算并广播 UI State
   */
  private computeAndEmit(): void {
    const state = this.store.getState();
    const uiState = this.buildUIState(state);

    eventBus.emit(GameEvents.PLAYER_UPDATED, uiState.player);
    eventBus.emit(GameEvents.LOCATION_CHANGED, uiState.location);
    eventBus.emit(GameEvents.NPC_LIST_UPDATED, uiState.npcs);

    if (uiState.narrativeText) {
      eventBus.emit(GameEvents.NARRATIVE_APPENDED, uiState.narrativeText);
    }
  }

  /**
   * 构建完整的 UI State
   */
  private buildUIState(state: IGameState): IUIState {
    const player = state.player;
    const room = state.world.getRoom(player.currentRoomId) || null;
    const zone = room ? (state.world.getZone(room.zoneId) || null) : null;
    const latestLog = state.logs.length > 0 ? state.logs[state.logs.length - 1] : '';

    return {
      layout: this.layout,
      player: this.buildPlayerSnapshot(player),
      location: this.buildLocationSnapshot(room, zone, state.world),
      npcs: this.buildNPCSnapshot(state.currentRoomNPCs),
      equipment: this.buildEquipmentSnapshot(player),
      narrativeText: latestLog,
      eventCards: [...this.eventCards],
      visiblePanels: this.getVisiblePanels(),
      activeView: 'main',
    };
  }

  private buildPlayerSnapshot(player: IPlayer): IPlayerSnapshot {
    return {
      name: player.name,
      realmName: getFullRealmName(player.currentWorldId, player.realm as number, player.realmStage, player.realmPerfection),
      worldName: WORLD_NAMES[player.currentWorldId] || '未知世界',
      hp: player.hp,
      maxHp: player.maxHp,
      mana: player.mana,
      maxMana: player.maxMana,
      cultivationExp: player.cultivationExp,
      maxCultivationExp: player.maxCultivationExp,
      caveCount: player.caveCount || 0,
      gold: player.gold,
      equipment: this.buildEquipmentSnapshot(player),
    };
  }

  private buildLocationSnapshot(room: IRoom | null, zone: IZone | null, world: IGameState['world']): ILocationSnapshot {
    if (!room) {
      return {
        roomId: '',
        roomName: '未知之地',
        roomDescription: '',
        zoneName: '未知',
        zoneType: '未知',
        zoneProgress: 0,
        exits: [],
      };
    }

    return {
      roomId: room.id,
      roomName: room.name,
      roomDescription: room.description,
      zoneName: zone?.name || '未知区域',
      zoneType: zone?.type || '未知',
      zoneProgress: world.getZoneExplorationProgress(room.zoneId),
      exits: room.exits || [],
    };
  }

  private buildNPCSnapshot(roomNPCs: IGameState['currentRoomNPCs']): INPCSnapshot[] {
    return roomNPCs.map(npc => ({
      id: npc.id,
      name: npc.name,
      title: npc.title,
    }));
  }

  private buildEquipmentSnapshot(player: IPlayer): IEquipmentSnapshot[] {
    const slotEntries: { key: keyof IPlayer['equipment']; label: string }[] = [
      { key: 'weapon', label: '武器' },
      { key: 'armor', label: '护甲' },
      { key: 'boots', label: '靴子' },
      { key: 'accessory1', label: '饰品一' },
      { key: 'accessory2', label: '饰品二' },
      { key: 'artifact', label: '法宝' },
    ];

    return slotEntries.map(({ key, label }) => {
      const item = player.equipment[key] as IItem | null;
      return {
        slot: label,
        name: item ? item.name : '空',
        icon: item ? item.icon : undefined,
      };
    });
  }

  private getVisiblePanels(): string[] {
    if (this.layout === 'mobile') {
      return ['narrative', 'event-cards'];
    }
    return ['location', 'zone', 'npc', 'equipment', 'local-map', 'narrative', 'event-cards'];
  }
}
