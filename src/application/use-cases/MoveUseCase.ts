import { GameStore } from '../store/GameStore';
import { World } from '../../domain/World';
import { IPlayer, CultivationRealm } from '../../domain/entities/Player';
import { EventBus, GameEvents } from '../../infrastructure/event/EventBus';
import { QuestManager } from '../../domain/services/QuestManager';
import { EventService } from '../../domain/services/EventService';
import { getNPC, getNPCsByRoom } from '../../data/npcs/npc_data';
import { ExplorationRewardService } from '../../domain/services/ExplorationRewardService';

export class MoveUseCase {
  constructor(
    private store: GameStore,
    private world: World,
    private eventBus: EventBus
  ) {}

  execute(direction: string): { success: boolean; message: string } {
    const state = this.store.getState();
    const player = state.player;
    const currentRoom = this.world.getRoom(player.currentRoomId);

    if (!currentRoom) {
      return { success: false, message: '你迷失在虚空之中。' };
    }

    const exit = currentRoom.exits.find(e => e.direction === direction);
    if (!exit) {
      return { success: false, message: `此路不通。方向 "${direction}" 不存在。` };
    }

    if (exit.condition && !this.checkCondition(exit.condition, player)) {
      return { success: false, message: `无法通过：${exit.condition}` };
    }

    const targetId = exit.targetId;

    if (!targetId) {
      return { success: false, message: '此路尚未开通。' };
    }

    let targetRoom = this.world.getRoom(targetId);
    if (!targetRoom && targetId.startsWith('wild_')) {
      targetRoom = this.world.getOrGenerateRoom(targetId, currentRoom.id);
    }
    if (!targetRoom) {
      return { success: false, message: '目标房间不存在。' };
    }

    // 执行移动
    const prevRoomId = player.currentRoomId;
    player.currentRoomId = targetRoom.id;

    if (!targetRoom.visited) {
      targetRoom.visited = true;
      targetRoom.firstVisited = Date.now();
      this.eventBus.trigger(GameEvents.ROOM_DISCOVERED, { room: targetRoom, player });
    }

    // 检查是否进入新区域
    const zone = this.world.getZoneByRoomId(targetRoom.id);
    if (zone && !zone.discovered) {
      zone.discovered = true;
      zone.discoveryTime = Date.now();
      this.eventBus.trigger(GameEvents.ZONE_DISCOVERED, { zone, player });
    }

    // 更新玩家区域
    if (zone) {
      player.currentZoneId = zone.id;
      if (!player.discoveredZones.includes(zone.id)) {
        player.discoveredZones.push(zone.id);
      }
    }

    this.store.dispatch({
      type: 'MOVE_SUCCESS',
      payload: {
        room: targetRoom,
        zone: this.world.getZoneByRoomId(targetRoom.id),
        player,
        prevRoomId,
        message: `你来到了 ${targetRoom.name}`,
      },
    });

    // 显示房间内 NPC
    if (targetRoom.npcs && targetRoom.npcs.length > 0) {
      const npcData = targetRoom.npcs.map((id, index) => {
        const npc = getNPC(id);
        return npc ? { id: npc.id, title: npc.title, name: npc.name, index } : null;
      }).filter((n): n is { id: string; title: string; name: string; index: number } => n !== null);
      if (npcData.length > 0) {
        this.store.dispatch({
          type: 'NPC_LIST',
          payload: npcData
        });
      }
    }

    // 任务追踪：到达进度
    const reachMessages = QuestManager.trackReach(player, targetRoom.id);
    for (const msg of reachMessages) {
      this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: msg });
    }

    // 检查任务完成
    const completedQuests = QuestManager.checkCompletion(player);
    for (const cq of completedQuests) {
      this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[任务完成] ${cq.questName}！` });
    }

    // 检查区域探索度里程碑
    if (zone && targetRoom.visited) {
      const rewards = ExplorationRewardService.checkMilestone(this.world, player, zone.id);
      for (const rw of rewards) {
        const desc = ExplorationRewardService.getRewardDescription(rw);
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `**${desc}**` });
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: rw.description });
        if (rw.effect?.stat) {
          const parts: string[] = [];
          const s = rw.effect.stat;
          if (s.attack) parts.push(`攻击+${s.attack}`);
          if (s.defense) parts.push(`防御+${s.defense}`);
          if (s.maxHp) parts.push(`气血+${s.maxHp}`);
          if (s.maxMana) parts.push(`法力+${s.maxMana}`);
          if (s.speed) parts.push(`速度+${s.speed}`);
          if (s.spiritAbsorbRate) parts.push(`灵气吸收+${Math.round(s.spiritAbsorbRate * 100)}%`);
          if (parts.length > 0) {
            this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `效果：${parts.join('、')}` });
          }
        }
        if (rw.effect?.expBonus) {
          this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `经验加成 +${rw.effect.expBonus}%` });
        }
        if (rw.effect?.goldBonus) {
          this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `金币加成 +${rw.effect.goldBonus}%` });
        }
      }
    }

    // 随机事件
    const event = EventService.rollEvent(targetRoom.id, targetRoom.isSafeZone, player);
    if (event) {
      const optLines = event.options.map((o) => `◆ ${o.label}`);
      this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '' });
      this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[CARD:status]⚡ ${event.title}` });
      this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: event.description });
      this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '---' });
      for (const line of optLines) {
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: line });
      }
      this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[/CARD]' });
      // 设置动态回应按钮
      this.store.dispatch({ type: 'SET_CONTEXT', payload: { type: 'event', options: event.options.map((o, i) => ({ label: o.label, action: `回应 ${i + 1}` })) } });
    }

    return {
      success: true,
      message: `你来到了 ${targetRoom.name}`,
    };
  }

  private checkCondition(condition: string, player: IPlayer): boolean {
    const conditions: Record<string, () => boolean> = {
      '需搬血境圆满': () => player.realm >= CultivationRealm.BLOOD_MOVING,
      '需洞天境': () => player.realm >= CultivationRealm.CAVE,
      '需化灵境': () => player.realm >= CultivationRealm.SPIRIT,
      '需铭纹境': () => player.realm >= CultivationRealm.INSCRIBE,
      '需列阵境': () => player.realm >= CultivationRealm.ARRAY,
      '需尊者境': () => player.realm >= CultivationRealm.VENERABLE,
      '需神火境': () => player.realm >= CultivationRealm.DIVINE_FIRE,
    };
    for (const [key, fn] of Object.entries(conditions)) {
      if (condition.includes(key)) return fn();
    }
    return true;
  }
}