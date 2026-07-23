import { IPlayer, IBattleRule } from '../entities/Player';
import { IMonster } from '../entities/Monster';

export class BattleAI {
  private rules: IBattleRule[];

  constructor(rules: IBattleRule[]) {
    this.rules = rules.sort((a, b) => a.priority - b.priority);
  }

  decide(player: IPlayer, enemy: IMonster, round: number): 'attack' | 'defend' | 'flee' | { techId: string } {
    for (const rule of this.rules) {
      if (this.evaluate(rule.condition, player, enemy, round)) {
        if (rule.action.type === 'technique' && rule.action.techId) {
          const tech = player.techniques.find(t => t.id === rule.action.techId);
          if (tech && player.mana >= tech.manaCost) {
            return { techId: rule.action.techId };
          }
        }
        if (rule.action.type === 'flee') return 'flee';
        if (rule.action.type === 'defend') return 'defend';
        return 'attack';
      }
    }
    return 'attack';
  }

  private evaluate(cond: IBattleRule['condition'], player: IPlayer, enemy: IMonster, round: number): boolean {
    switch (cond.type) {
      case 'hp_less_than':
        return player.hp / player.maxHp < (cond.threshold || 0.3);
      case 'mp_greater_than':
        return player.mana / player.maxMana > (cond.threshold || 0.5);
      case 'enemy_hp_less_than':
        return enemy.hp / enemy.maxHp < (cond.threshold || 0.2);
      case 'first_round':
        return round === 0;
      default:
        return true;
    }
  }
}