/**
 * 成就系统服务
 * 负责成就解锁检查、进度更新、奖励发放、称号效果应用
 */

import { IAchievement, ITitle, SEED_ACHIEVEMENTS, SEED_TITLES, AchievementCategory, findTitle } from '../entities/Achievement';
import { IPlayer } from '../entities/Player';

export interface IAchievementProgress {
  achievementId: string;
  requirementIndex: number;
  current: number;
  target: number;
  isCompleted: boolean;
}

export interface IAchievementUnlockResult {
  achievement: IAchievement;
  rewards: {
    type: string;
    value: string | number;
    description: string;
  }[];
  newTitle?: ITitle;
}

export class AchievementService {
  private static instance: AchievementService;
  private stats: Record<string, number> = {
    reach_realm: 0,
    kill_monsters: 0,
    complete_quests: 0,
    discover_zones: 0,
    collect_items: 0,
    spend_gold: 0,
    learn_techniques: 0,
    alchemy_count: 0,
    forge_count: 0,
    gold_earned: 0,
    cultivate_times: 0,
    breakthrough_count: 0,
    equipment_count: 0,
    npc_friendship: 0,
    reincarnation_count: 0,
  };

  private constructor() {}

  static getInstance(): AchievementService {
    if (!AchievementService.instance) {
      AchievementService.instance = new AchievementService();
    }
    return AchievementService.instance;
  }

  getStat(type: string): number {
    return this.stats[type] || 0;
  }

  setStat(type: string, value: number): void {
    if (this.stats[type] !== undefined) {
      this.stats[type] = value;
    }
  }

  updateStat(type: string, value: number): void {
    if (this.stats[type] !== undefined) {
      this.stats[type] += value;
    }
  }

  onRealmBreakthrough(realmLevel: number): void {
    this.setStat('reach_realm', realmLevel);
  }

  onMonsterKilled(count: number = 1): void {
    this.updateStat('kill_monsters', count);
  }

  onQuestCompleted(count: number = 1): void {
    this.updateStat('complete_quests', count);
  }

  onZoneDiscovered(totalZones: number): void {
    this.setStat('discover_zones', totalZones);
  }

  onItemsCollected(totalItems: number): void {
    this.setStat('collect_items', totalItems);
  }

  onGoldSpent(amount: number): void {
    this.updateStat('spend_gold', amount);
  }

  onTechniqueLearned(count: number = 1): void {
    this.updateStat('learn_techniques', count);
  }

  onAlchemySuccess(count: number = 1): void {
    this.updateStat('alchemy_count', count);
  }

  onForgeSuccess(count: number = 1): void {
    this.updateStat('forge_count', count);
  }

  onGoldEarned(amount: number): void {
    this.updateStat('gold_earned', amount);
  }

  onCultivate(count: number = 1): void {
    this.updateStat('cultivate_times', count);
  }

  onBreakthrough(count: number = 1): void {
    this.updateStat('breakthrough_count', count);
  }

  onEquipmentChanged(count: number): void {
    this.setStat('equipment_count', count);
  }

  onNpcFriendshipChanged(totalFriends: number): void {
    this.setStat('npc_friendship', totalFriends);
  }

  onReincarnation(count: number): void {
    this.setStat('reincarnation_count', count);
  }

  syncFromPlayer(player: IPlayer): void {
    this.setStat('reach_realm', player.realm);
    this.setStat('reincarnation_count', player.reincarnationCount || 0);
    this.setStat('learn_techniques', player.knownMethodIds?.length || 0);
    this.setStat('equipment_count', this.countEquippedItems(player));
  }

  private countEquippedItems(player: IPlayer): number {
    let count = 0;
    const equipFields = ['weapon', 'armor', 'boots', 'accessory', 'artifact'] as const;
    for (const field of equipFields) {
      if ((player as any)[field]) count++;
    }
    if (player.cave?.pets) {
      // pets don't count as equipment
    }
    return count;
  }

  checkRequirement(req: { type: string; target: number }): boolean {
    const current = this.stats[req.type] || 0;
    return current >= req.target;
  }

  getProgress(achievement: { requirements: { type: string; target: number }[] }): number {
    if (achievement.requirements.length === 0) return 0;
    let totalProgress = 0;
    for (const req of achievement.requirements) {
      const current = Math.min(this.stats[req.type] || 0, req.target);
      totalProgress += (current / req.target) * 100;
    }
    return Math.floor(totalProgress / achievement.requirements.length);
  }

  getRequirementProgress(achievement: { requirements: { type: string; target: number }[] }): IAchievementProgress[] {
    return achievement.requirements.map((req, index) => {
      const current = this.stats[req.type] || 0;
      return {
        achievementId: '',
        requirementIndex: index,
        current: Math.min(current, req.target),
        target: req.target,
        isCompleted: current >= req.target,
      };
    });
  }

  checkUnlocks(player: IPlayer): IAchievementUnlockResult[] {
    const results: IAchievementUnlockResult[] = [];
    const existingIds = new Set(player.achievements.map(a => a.id));

    for (const seedAchievement of SEED_ACHIEVEMENTS) {
      if (existingIds.has(seedAchievement.id)) continue;

      const allMet = seedAchievement.requirements.every(req => this.checkRequirement(req));
      if (!allMet) continue;

      const achievement: IAchievement = {
        ...seedAchievement,
        unlocked: true,
      };
      player.achievements.push(achievement);

      const rewards = this.grantRewards(player, achievement);
      results.push({ achievement, rewards });
    }

    return results;
  }

  private grantRewards(player: IPlayer, achievement: IAchievement): {
    type: string;
    value: string | number;
    description: string;
  }[] {
    const rewardDescriptions: { type: string; value: string | number; description: string }[] = [];

    for (const reward of achievement.rewards) {
      switch (reward.type) {
        case 'title': {
          const titleName = String(reward.value);
          const title = SEED_TITLES.find(t => t.name === titleName);
          if (title) {
            const hasTitle = player.titles.some(t => t.id === title.id);
            if (!hasTitle) {
              player.titles.push({ ...title });
            }
            rewardDescriptions.push({
              type: 'title',
              value: title.name,
              description: `获得称号「${title.name}」`,
            });
          }
          break;
        }
        case 'gold': {
          const gold = Number(reward.value);
          player.gold += gold;
          rewardDescriptions.push({
            type: 'gold',
            value: gold,
            description: `获得 ${gold} 灵石`,
          });
          break;
        }
        case 'stat_bonus': {
          const statKey = reward.statKey || 'attack';
          const bonus = Number(reward.value);
          this.applyStatBonus(player, statKey, bonus);
          rewardDescriptions.push({
            type: 'stat_bonus',
            value: bonus,
            description: `${this.getStatName(statKey)} +${bonus}`,
          });
          break;
        }
        case 'item': {
          rewardDescriptions.push({
            type: 'item',
            value: String(reward.value),
            description: `获得物品「${reward.value}」`,
          });
          break;
        }
      }
    }

    return rewardDescriptions;
  }

  private applyStatBonus(player: IPlayer, statKey: string, bonus: number): void {
    switch (statKey) {
      case 'attack': player.attack += bonus; break;
      case 'defense': player.defense += bonus; break;
      case 'hp': player.maxHp += bonus; player.hp += bonus; break;
      case 'mana': player.maxMana += bonus; player.mana += bonus; break;
      case 'speed': player.speed += bonus; break;
      case 'crit': player.critRate += bonus; break;
      case 'critRate': player.critRate += bonus; break;
    }
  }

  private getStatName(statKey: string): string {
    const names: Record<string, string> = {
      attack: '攻击力',
      defense: '防御力',
      hp: '气血',
      mana: '法力',
      speed: '速度',
      crit: '暴击率',
      critRate: '暴击率',
      spiritAbsorbRate: '灵气吸收率',
    };
    return names[statKey] || statKey;
  }

  equipTitle(player: IPlayer, titleId: string): boolean {
    const title = player.titles.find(t => t.id === titleId);
    if (!title) return false;

    if (player.currentTitleId) {
      const oldTitle = player.titles.find(t => t.id === player.currentTitleId);
      if (oldTitle?.effects) {
        this.removeTitleEffects(player, oldTitle);
      }
    }

    player.currentTitleId = titleId;
    if (title.effects) {
      this.applyTitleEffects(player, title);
    }
    return true;
  }

  unequipTitle(player: IPlayer): boolean {
    if (!player.currentTitleId) return false;
    const oldTitle = player.titles.find(t => t.id === player.currentTitleId);
    if (oldTitle?.effects) {
      this.removeTitleEffects(player, oldTitle);
    }
    player.currentTitleId = undefined;
    return true;
  }

  private applyTitleEffects(player: IPlayer, title: ITitle): void {
    if (!title.effects) return;
    const effects = title.effects;
    if (effects.attack) player.attack += effects.attack;
    if (effects.defense) player.defense += effects.defense;
    if (effects.hp) { player.maxHp += effects.hp; player.hp += effects.hp; }
    if (effects.mana) { player.maxMana += effects.mana; player.mana += effects.mana; }
    if (effects.speed) player.speed += effects.speed;
    if (effects.crit) player.critRate += effects.crit;
    if (effects.critRate) player.critRate += effects.critRate;
    if (effects.spiritAbsorbRate) player.spiritAbsorbRate *= effects.spiritAbsorbRate;
  }

  private removeTitleEffects(player: IPlayer, title: ITitle): void {
    if (!title.effects) return;
    const effects = title.effects;
    if (effects.attack) player.attack -= effects.attack;
    if (effects.defense) player.defense -= effects.defense;
    if (effects.hp) { player.maxHp -= effects.hp; player.hp = Math.min(player.hp, player.maxHp); }
    if (effects.mana) { player.maxMana -= effects.mana; player.mana = Math.min(player.mana, player.maxMana); }
    if (effects.speed) player.speed -= effects.speed;
    if (effects.crit) player.critRate -= effects.crit;
    if (effects.critRate) player.critRate -= effects.critRate;
    if (effects.spiritAbsorbRate) player.spiritAbsorbRate /= effects.spiritAbsorbRate;
  }

  getTitleEffects(title: ITitle): Record<string, number> {
    return title.effects || {};
  }

  getEquippedTitle(player: IPlayer): ITitle | undefined {
    if (!player.currentTitleId) return undefined;
    return player.titles.find(t => t.id === player.currentTitleId);
  }

  getAllAchievements(player: IPlayer): IAchievement[] {
    const unlockedMap = new Map(player.achievements.map(a => [a.id, a]));
    return SEED_ACHIEVEMENTS.map(seed => {
      const unlocked = unlockedMap.get(seed.id);
      if (unlocked) return unlocked;
      return { ...seed, unlocked: false };
    });
  }

  getAchievementsByCategory(player: IPlayer, category: AchievementCategory): IAchievement[] {
    return this.getAllAchievements(player).filter(a => a.category === category);
  }

  getUnlockedAchievements(player: IPlayer): IAchievement[] {
    return this.getAllAchievements(player).filter(a => a.unlocked);
  }

  getLockedAchievements(player: IPlayer): IAchievement[] {
    return this.getAllAchievements(player).filter(a => !a.unlocked);
  }

  getCompletionRate(player: IPlayer): { unlocked: number; total: number; percentage: number } {
    const total = SEED_ACHIEVEMENTS.length;
    const unlocked = player.achievements.length;
    return {
      unlocked,
      total,
      percentage: total > 0 ? Math.floor((unlocked / total) * 100) : 0,
    };
  }

  getNearCompletion(player: IPlayer, threshold: number = 80): IAchievement[] {
    return this.getLockedAchievements(player).filter(a => {
      const progress = this.getProgress(a);
      return progress >= threshold;
    });
  }

  formatUnlockMessage(result: IAchievementUnlockResult): string {
    let msg = `【成就解锁】${result.achievement.icon} ${result.achievement.name}\n`;
    msg += `${result.achievement.description}\n`;
    for (const reward of result.rewards) {
      msg += `  🎁 ${reward.description}\n`;
    }
    return msg.trim();
  }
}

export function getTitleByName(name: string): ITitle | undefined {
  return SEED_TITLES.find(t => t.name === name);
}

export function getTitleById(id: string): ITitle | undefined {
  return findTitle(id);
}
