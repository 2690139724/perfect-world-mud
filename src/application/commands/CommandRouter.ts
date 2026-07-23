import { GameStore } from '../store/GameStore';
import { World } from '../../domain/World';
import { MoveUseCase } from '../use-cases/MoveUseCase';
import { CombatUseCase } from '../use-cases/CombatUseCase';
import { NarrativeStream } from '../../ui/components/NarrativeStream';
import { ModalManager } from '../../ui/components/ModalManager';

export interface ICommandContext {
  store: GameStore;
  world: World;
  moveUseCase: MoveUseCase;
  combatUseCase: CombatUseCase;
  narrative: NarrativeStream;
  modalManager?: ModalManager;
}

export interface ICommandHandler {
  canHandle(action: string): boolean;
  execute(action: string, args: string[], context: ICommandContext): void;
}

export class CommandRouter {
  private handlers: ICommandHandler[] = [];

  register(handler: ICommandHandler): void {
    this.handlers.push(handler);
  }

  execute(action: string, args: string[], context: ICommandContext): boolean {
    for (const handler of this.handlers) {
      if (handler.canHandle(action)) {
        handler.execute(action, args, context);
        return true;
      }
    }
    return false;
  }
}