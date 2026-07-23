/**
 * 全局事件总线
 * 用于解耦 Store、Renderer、Panel、Router 等模块
 * 同时兼容旧代码的 trigger 方法和新代码的 emit 方法
 */

export type EventCallback<T = unknown> = (payload: T) => void;

export class EventBus {
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private history: { event: string; data: any; timestamp: number }[] = [];
  private maxHistory: number = 100;

  /**
   * 订阅事件
   * @param event 事件名
   * @param callback 回调函数
   * @returns 取消订阅函数
   */
  on<T = unknown>(event: string, callback: EventCallback<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    const set = this.listeners.get(event)!;
    const cb = callback as EventCallback;
    set.add(cb);

    return () => {
      set.delete(cb);
      if (set.size === 0) {
        this.listeners.delete(event);
      }
    };
  }

  /**
   * 订阅一次性事件
   */
  once<T = unknown>(event: string, callback: EventCallback<T>): () => void {
    const unsubscribe = this.on<T>(event, (payload: T) => {
      unsubscribe();
      callback(payload);
    });
    return unsubscribe;
  }

  /**
   * 取消订阅
   * @param event 事件名
   * @param callback 回调函数
   */
  off<T = unknown>(event: string, callback: EventCallback<T>): void {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(callback as EventCallback);
      if (set.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  /**
   * 触发事件（新API）
   */
  emit<T = unknown>(event: string, payload?: T): void {
    this.history.push({ event, data: payload, timestamp: Date.now() });
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    const set = this.listeners.get(event);
    if (!set) return;
    set.forEach(callback => {
      try {
        callback(payload);
      } catch (err) {
        console.error(`[EventBus] 事件 ${event} 回调执行失败:`, err);
      }
    });
  }

  /**
   * 触发事件（旧API兼容，与emit等价）
   */
  trigger(event: string, data: any): void {
    this.emit(event, data);
  }

  /**
   * 获取事件历史
   */
  getHistory(): { event: string; data: any; timestamp: number }[] {
    return [...this.history];
  }

  /**
   * 检查条件事件（旧API兼容）
   */
  check(player: any, world: any): string[] {
    const triggered: string[] = [];
    for (const [event, _handlers] of this.listeners) {
      if (event.startsWith('check_')) {
        try {
          this.trigger(event, { player, world });
        } catch { /* ignore */ }
      }
    }
    return triggered;
  }

  /**
   * 清空所有监听
   */
  clear(): void {
    this.listeners.clear();
    this.history = [];
  }
}

export const eventBus = new EventBus();

/**
 * 预定义事件名，避免硬编码字符串
 */
export const GameEvents = {
  // 移动相关
  MOVE_SUCCESS: 'MOVE_SUCCESS',
  ROOM_DISCOVERED: 'ROOM_DISCOVERED',
  ZONE_DISCOVERED: 'ZONE_DISCOVERED',

  // 战斗相关
  COMBAT_START: 'COMBAT_START',
  COMBAT_END: 'COMBAT_END',
  COMBAT_END_DETAILS: 'COMBAT_END_DETAILS',
  ENEMY_DEFEATED: 'ENEMY_DEFEATED',
  PLAYER_DEFEATED: 'PLAYER_DEFEATED',

  // 修炼相关
  CULTIVATE_SUCCESS: 'CULTIVATE_SUCCESS',
  REALM_BREAKTHROUGH: 'REALM_BREAKTHROUGH',

  // 道侣相关
  COMPANION_UNLOCKED: 'COMPANION_UNLOCKED',
  INTIMACY_CHANGED: 'INTIMACY_CHANGED',
  DUAL_CULTIVATION: 'DUAL_CULTIVATION',

  // 系统相关
  COMMAND: 'COMMAND',
  SYSTEM_MESSAGE: 'SYSTEM_MESSAGE',
  SAVE_COMPLETE: 'SAVE_COMPLETE',
  LOAD_COMPLETE: 'LOAD_COMPLETE',

  // 任务相关
  QUEST_UPDATED: 'QUEST_UPDATED',
  QUEST_COMPLETED: 'QUEST_COMPLETED',

  // 时间相关
  TIME_TICK: 'TIME_TICK',
  TIME_OF_DAY_CHANGED: 'TIME_OF_DAY_CHANGED',
  SEASON_CHANGED: 'SEASON_CHANGED',

  // 玩家状态（UI层）
  PLAYER_UPDATED: 'player:updated',

  // 位置/场景（UI层）
  LOCATION_CHANGED: 'location:changed',
  ZONE_CHANGED: 'zone:changed',

  // 叙事（UI层）
  NARRATIVE_APPENDED: 'narrative:appended',
  NARRATIVE_CLEARED: 'narrative:cleared',

  // 事件卡片（UI层）
  EVENT_ADDED: 'event:added',
  EVENTS_CLEARED: 'events:cleared',

  // NPC（UI层）
  NPC_LIST_UPDATED: 'npc:list:updated',

  // 面板（UI层）
  PANEL_OPEN: 'panel:open',
  PANEL_CLOSE: 'panel:close',

  // 布局（UI层）
  LAYOUT_CHANGED: 'layout:changed',

  // 视图（UI层）
  VIEW_SWITCH: 'view:switch',
  VIEW_BACK: 'view:back',

  // 系统（UI层）
  GAME_STARTED: 'game:started',
  GAME_EXIT_TO_MENU: 'game:exit:to:menu',
} as const;
