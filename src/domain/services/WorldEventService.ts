import { IPlayer } from '../entities/Player';
import { IWorldEventTemplate, IEventOutcome, IEventEffect } from '../entities/WorldEvent';
import { getWeightedRandomEvent, resolveChoiceOutcome } from '../../data/events/world_events';
import { NPCRelationshipService } from './NPCRelationshipService';
import { eventBus } from '../../infrastructure/event/EventBus';

export interface IEventTriggerResult {
  triggered: boolean;
  event?: IWorldEventTemplate;
  message?: string;
}

export interface IChoiceResult {
  outcome: IEventOutcome;
  effectsApplied: string[];
}

export class WorldEventService {
  private static activeEvents: Map<string, IWorldEventTemplate> = new Map();
  private static eventCooldowns: Map<string, number> = new Map();

  static tryTriggerEvent(
    player: IPlayer,
    locationId: string,
    terrain: string,
    isSafeZone: boolean,
    triggerChance: number = 0.15,
  ): IEventTriggerResult {
    if (this.activeEvents.has(player.id)) {
      return { triggered: false, message: '已有未处理的事件' };
    }

    const cooldownKey = `${player.id}_${locationId}`;
    const lastEvent = this.eventCooldowns.get(cooldownKey) || 0;
    if (Date.now() - lastEvent < 60000) {
      return { triggered: false, message: '事件冷却中' };
    }

    if (Math.random() > triggerChance) {
      return { triggered: false };
    }

    const event = getWeightedRandomEvent(terrain, player.realm, isSafeZone);
    if (!event) {
      return { triggered: false, message: '没有符合条件的事件' };
    }

    this.activeEvents.set(player.id, event);
    this.eventCooldowns.set(cooldownKey, Date.now());

    eventBus.emit('worldEvent:triggered', {
      playerId: player.id,
      eventId: event.id,
      location: locationId,
    });

    return {
      triggered: true,
      event,
    };
  }

  static getActiveEvent(playerId: string): IWorldEventTemplate | undefined {
    return this.activeEvents.get(playerId);
  }

  static resolveChoice(player: IPlayer, choiceId: string): IChoiceResult | null {
    const event = this.activeEvents.get(player.id);
    if (!event) return null;

    const choice = event.choices.find(c => c.id === choiceId);
    if (!choice) return null;

    const outcome = resolveChoiceOutcome(choice);
    const effectsApplied = this.applyEffects(player, outcome.effects);

    eventBus.emit('worldEvent:resolved', {
      playerId: player.id,
      eventId: event.id,
      choiceId,
      outcomeId: outcome.id,
    });

    this.activeEvents.delete(player.id);

    return {
      outcome,
      effectsApplied,
    };
  }

  private static applyEffects(player: IPlayer, effects: IEventEffect[]): string[] {
    const results: string[] = [];

    for (const effect of effects) {
      switch (effect.type) {
        case 'gold':
          const goldChange = effect.value as number;
          player.gold = Math.max(0, player.gold + goldChange);
          results.push(effect.description || `灵石 ${goldChange > 0 ? '+' : ''}${goldChange}`);
          break;

        case 'hp':
          const hpChange = effect.value as number;
          player.hp = Math.max(0, Math.min(player.maxHp, player.hp + hpChange));
          results.push(effect.description || `气血 ${hpChange > 0 ? '+' : ''}${hpChange}`);
          break;

        case 'mana':
          const manaChange = effect.value as number;
          player.mana = Math.max(0, Math.min(player.maxMana, player.mana + manaChange));
          results.push(effect.description || `法力 ${manaChange > 0 ? '+' : ''}${manaChange}`);
          break;

        case 'exp':
          const expChange = effect.value as number;
          if (player.cultivationExp !== undefined) {
            player.cultivationExp += expChange;
          }
          results.push(effect.description || `修为 ${expChange > 0 ? '+' : ''}${expChange}`);
          break;

        case 'favorability':
          const npcId = effect.target || 'unknown';
          const favResult = NPCRelationshipService.changeFavorability(
            player.id,
            npcId,
            effect.value as number,
          );
          results.push(favResult.message);
          break;

        case 'item':
          results.push(effect.description || `获得物品：${effect.value}`);
          break;

        case 'reputation':
          results.push(effect.description || `获得名声：${effect.value}`);
          break;

        case 'buff':
          results.push(effect.description || `获得buff：${effect.value}`);
          break;

        case 'debuff':
          results.push(effect.description || `获得debuff：${effect.value}`);
          break;

        case 'unlock':
          results.push(effect.description || `解锁：${effect.value}`);
          break;
      }
    }

    return results;
  }

  static dismissEvent(playerId: string): void {
    this.activeEvents.delete(playerId);
  }
}
