import { ICommandHandler, ICommandContext } from './CommandRouter';
import { ItemType } from '../../domain/entities/Item';

export class CombatCommand implements ICommandHandler {
  private validActions = ['攻击', '防御', '逃跑', '技能', '吃药', '怒气'];

  canHandle(action: string): boolean {
    return this.validActions.includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const state = context.store.getState();
    
    if (!state.combatState || !state.combatState.awaitingAction) {
      return;
    }

    switch (action) {
      case '攻击':
        context.store.dispatch({ type: 'COMBAT_PLAYER_ACTION', payload: { action: 'attack' } });
        break;

      case '防御':
        context.store.dispatch({ type: 'COMBAT_PLAYER_ACTION', payload: { action: 'defend' } });
        break;

      case '逃跑':
        context.store.dispatch({ type: 'COMBAT_PLAYER_ACTION', payload: { action: 'flee' } });
        break;

      case '技能':
        this.handleTechnique(args, context);
        break;

      case '吃药':
        this.handleUseItem(args, context);
        break;

      case '怒气':
        this.handleRageSkill(args, context);
        break;
    }
  }

  private handleTechnique(args: string[], context: ICommandContext): void {
    const state = context.store.getState();
    const player = state.player;

    if (args.length === 0) {
      const available = player.techniques.filter(t => t.manaCost <= player.mana);
      if (available.length === 0) {
        context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '法力不足，无法使用任何技能。' });
        return;
      }
      context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '可用技能：' });
      available.forEach((t, i) => {
        context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `  ${i + 1}. ${t.name}（法力消耗: ${t.manaCost}）` });
      });
      return;
    }

    const techIdx = parseInt(args[0]) - 1;
    if (isNaN(techIdx) || techIdx < 0 || techIdx >= player.techniques.length) {
      context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '无效的技能编号。' });
      return;
    }

    const tech = player.techniques[techIdx];
    if (player.mana < tech.manaCost) {
      context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '法力不足，无法使用此技能。' });
      return;
    }

    context.store.dispatch({ type: 'COMBAT_PLAYER_ACTION', payload: { action: 'technique', techId: tech.id } });
  }

  private handleUseItem(args: string[], context: ICommandContext): void {
    const state = context.store.getState();
    const player = state.player;
    const consumables = player.inventory.filter(item => 
      item.type === ItemType.ELIXIR || item.effect?.type === 'heal' || item.effect?.type === 'mana'
    );

    if (args.length === 0) {
      if (consumables.length === 0) {
        context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '背包中没有可使用的物品。' });
        return;
      }
      context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '可用物品：' });
      consumables.forEach((item, i) => {
        context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `  ${i + 1}. ${item.name}` });
      });
      return;
    }

    const itemIdx = parseInt(args[0]) - 1;
    if (isNaN(itemIdx) || itemIdx < 0 || itemIdx >= consumables.length) {
      context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '无效的物品编号。' });
      return;
    }

    const item = consumables[itemIdx];
    const idx = player.inventory.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      player.inventory.splice(idx, 1);
      
      if (item.effect?.type === 'heal') {
        const heal = item.effect.value ?? 0;
        player.hp = Math.min(player.maxHp, player.hp + heal);
        context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `使用${item.name}，恢复 ${heal} 点气血。` });
      } else if (item.effect?.type === 'mana') {
        const manaGain = item.effect.value ?? 0;
        player.mana = Math.min(player.maxMana, player.mana + manaGain);
        context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `使用${item.name}，恢复 ${manaGain} 点法力。` });
      }
      
      context.store.dispatch({ type: 'UPDATE_PLAYER', payload: { hp: player.hp, mana: player.mana, inventory: player.inventory } });
    }
  }

  private handleRageSkill(args: string[], context: ICommandContext): void {
    const state = context.store.getState();
    const engine = state.combatState?.engine;
    if (!engine) return;

    const { RAGE_SKILLS } = require('../../domain/entities/RageSystem');
    const available = RAGE_SKILLS.filter((s: any) => s.rageCost <= (engine as any).playerRage?.current);

    if (args.length === 0) {
      if (available.length === 0) {
        context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '怒气不足，无法使用怒气技能。' });
        return;
      }
      context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '可用怒气技能：' });
      available.forEach((s: any, i: number) => {
        context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `  ${i + 1}. ${s.name}（怒气消耗: ${s.rageCost}）` });
      });
      return;
    }

    const skillIdx = parseInt(args[0]) - 1;
    if (isNaN(skillIdx) || skillIdx < 0 || skillIdx >= available.length) {
      context.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '无效的怒气技能编号。' });
      return;
    }

    const skill = available[skillIdx];
    context.store.dispatch({ type: 'COMBAT_PLAYER_ACTION', payload: { action: 'rage_skill' as any, rageSkillId: skill.id } as any });
  }
}