import { ICommandHandler, ICommandContext } from './CommandRouter';
import { WorldEventService } from '../../domain/services/WorldEventService';
import { WorldEventModal } from '../../ui/components/WorldEventModal';

const DIRECTIONS = ['北', '南', '东', '西', '内', '外', '上', '下', '东北', '西北', '东南', '西南', '北偏东', '北偏西', '东偏南', '东偏北', '西偏南', '西偏北', '南偏东', '南偏西'];

export class MoveCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return DIRECTIONS.includes(action);
  }

  execute(action: string, _args: string[], context: ICommandContext): void {
    const { store, world, moveUseCase, combatUseCase } = context;
    
    const result = moveUseCase.execute(action);
    if (result.success) {
      const room = world.getRoom(store.getState().player.currentRoomId);
      if (room && !room.isSafeZone) {
        combatUseCase.tryRandomEncounter(room.zoneId);

        const player = store.getState().player;
        const eventResult = WorldEventService.tryTriggerEvent(
          player,
          room.id,
          room.terrain,
          room.isSafeZone,
          0.2,
        );

        if (eventResult.triggered && eventResult.event) {
          const modal = new WorldEventModal(player, () => {});
          modal.show(eventResult.event);
        }
      }
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: result.message });
    }
  }
}