import { IPlayer } from '../entities/Player';
import { IClue, IHiddenStoryline, IHiddenStorylineProgress, StorylineCategoryNames, StorylineCategoryColors } from '../entities/HiddenStoryline';
import {
  ALL_CLUES,
  HIDDEN_STORYLINES,
  CLUES_MAP,
  CLUES_BY_SOURCE,
  findClueBySource,
  findClueById,
  findStorylineById,
} from '../../data/storylines/hidden_storylines';
import { QuestManager } from './QuestManager';
import { RealmNames } from '../entities/Player';

/**
 * 隐藏支线服务
 *
 * 负责线索发现、支线触发、进度查询等核心逻辑。
 * 所有方法均为静态方法，无需实例化。
 */
export class HiddenStorylineService {
  /**
   * 尝试通过探索发现线索
   * @param player 玩家
   * @param detailId 房间细节ID
   * @returns 发现的线索，未发现返回 null
   */
  static tryDiscoverClueByExplore(player: IPlayer, detailId: string): IClue | null {
    return this.tryDiscoverClue(player, 'explore', detailId);
  }

  /**
   * 尝试通过击杀怪物发现线索
   * @param player 玩家
   * @param monsterId 怪物ID
   * @returns 发现的线索，未发现返回 null
   */
  static tryDiscoverClueByKill(player: IPlayer, monsterId: string): IClue | null {
    return this.tryDiscoverClue(player, 'kill', monsterId);
  }

  /**
   * 尝试通过 NPC 对话发现线索
   * @param player 玩家
   * @param npcId NPC ID
   * @returns 发现的线索，未发现返回 null
   */
  static tryDiscoverClueByNpc(player: IPlayer, npcId: string): IClue | null {
    return this.tryDiscoverClue(player, 'npc', npcId);
  }

  /**
   * 尝试通过获得物品发现线索
   * @param player 玩家
   * @param itemId 物品ID
   * @returns 发现的线索，未发现返回 null
   */
  static tryDiscoverClueByItem(player: IPlayer, itemId: string): IClue | null {
    return this.tryDiscoverClue(player, 'item', itemId);
  }

  /**
   * 通用线索发现逻辑
   */
  private static tryDiscoverClue(player: IPlayer, source: string, sourceId: string): IClue | null {
    // 初始化字段（兼容旧存档）
    if (!player.discoveredClues) player.discoveredClues = [];
    if (!player.hiddenStorylines) player.hiddenStorylines = [];

    // 性能优化：如果该 source+sourceId 没有任何线索，直接返回
    const sourceClues = CLUES_BY_SOURCE[source];
    if (!sourceClues) return null;

    // 性能优化：快速检查是否所有相关线索都已发现
    const relevantClues = sourceClues.filter(c => c.sourceId === sourceId);
    if (relevantClues.length === 0) return null;

    // 查找匹配且未发现的线索
    const clue = relevantClues.find(c => !player.discoveredClues!.includes(c.id));
    if (!clue) return null;

    // 检查境界要求
    if (clue.requiredRealm !== undefined && player.realm < clue.requiredRealm) {
      return null;
    }

    // 检查前置线索要求
    if (clue.requiredClues) {
      for (const requiredId of clue.requiredClues) {
        if (!player.discoveredClues.includes(requiredId)) {
          return null;
        }
      }
    }

    // 检查前置任务要求
    if (clue.requiredCompletedQuest && !player.completedQuests.includes(clue.requiredCompletedQuest)) {
      return null;
    }

    // 发现线索
    this.discoverClue(player, clue);
    return clue;
  }

  /**
   * 标记线索为已发现
   */
  private static discoverClue(player: IPlayer, clue: IClue): void {
    player.discoveredClues.push(clue.id);

    // 更新对应支线进度
    let progress = player.hiddenStorylines.find(p => p.storylineId === clue.storylineId);
    if (!progress) {
      progress = {
        storylineId: clue.storylineId,
        discoveredClues: [],
        isTriggered: false,
        isCompleted: false,
      };
      player.hiddenStorylines.push(progress);
    }
    if (!progress.discoveredClues.includes(clue.id)) {
      progress.discoveredClues.push(clue.id);
    }
  }

  /**
   * 检查是否触发隐藏任务
   * @param player 玩家
   * @returns 触发的支线，未触发返回 null
   */
  static checkTrigger(player: IPlayer): IHiddenStoryline | null {
    if (!player.hiddenStorylines) return null;

    for (const progress of player.hiddenStorylines) {
      if (progress.isTriggered || progress.isCompleted) continue;

      const storyline = findStorylineById(progress.storylineId);
      if (!storyline) continue;

      if (progress.discoveredClues.length >= storyline.requiredClueCount) {
        // 触发隐藏任务
        const result = QuestManager.acceptQuest(player, storyline.triggerQuestId);
        if (result.success) {
          progress.isTriggered = true;
          return storyline;
        }
      }
    }
    return null;
  }

  /**
   * 标记支线为已完成
   */
  static markCompleted(player: IPlayer, storylineId: string): void {
    if (!player.hiddenStorylines) return;
    const progress = player.hiddenStorylines.find(p => p.storylineId === storylineId);
    if (progress) {
      progress.isCompleted = true;
    }
  }

  /**
   * 获取玩家所有支线进度
   */
  static getProgress(player: IPlayer): IHiddenStorylineProgress[] {
    return player.hiddenStorylines || [];
  }

  /**
   * 获取玩家可见的支线列表（已发现至少1条线索）
   */
  static getVisibleStorylines(player: IPlayer): Array<{
    storyline: IHiddenStoryline;
    progress: IHiddenStorylineProgress;
    discoveredCount: number;
    totalCount: number;
  }> {
    if (!player.hiddenStorylines) return [];

    const result: Array<{
      storyline: IHiddenStoryline;
      progress: IHiddenStorylineProgress;
      discoveredCount: number;
      totalCount: number;
    }> = [];

    for (const progress of player.hiddenStorylines) {
      const storyline = findStorylineById(progress.storylineId);
      if (!storyline) continue;
      result.push({
        storyline,
        progress,
        discoveredCount: progress.discoveredClues.length,
        totalCount: storyline.clues.length,
      });
    }
    return result;
  }

  /**
   * 渲染支线面板数据
   */
  static renderStorylinePanel(player: IPlayer): Array<{
    id: string;
    name: string;
    category: string;
    categoryName: string;
    categoryColor: string;
    description: string;
    loreText: string;
    progress: string;
    progressPercent: number;
    discoveredClues: Array<{ title: string; description: string; hint: string }>;
    isTriggered: boolean;
    isCompleted: boolean;
    recommendedRealm: string;
  }> {
    const visible = this.getVisibleStorylines(player);
    return visible.map(({ storyline, progress, discoveredCount, totalCount }) => {
      const discoveredClueDetails = storyline.clues
        .filter(cid => progress.discoveredClues.includes(cid))
        .map(cid => {
          const clue = findClueById(cid);
          return clue
            ? { title: clue.title, description: clue.description, hint: clue.hint }
            : { title: '未知线索', description: '', hint: '' };
        });

      return {
        id: storyline.id,
        name: storyline.name,
        category: storyline.category,
        categoryName: StorylineCategoryNames[storyline.category],
        categoryColor: StorylineCategoryColors[storyline.category],
        description: storyline.description,
        loreText: storyline.loreText,
        progress: `${discoveredCount}/${totalCount}`,
        progressPercent: Math.round((discoveredCount / totalCount) * 100),
        discoveredClues: discoveredClueDetails,
        isTriggered: progress.isTriggered,
        isCompleted: progress.isCompleted,
        recommendedRealm: RealmNames[storyline.recommendedRealm as 0] || '未知',
      };
    });
  }

  /**
   * 获取所有支线总数
   */
  static getTotalStorylineCount(): number {
    return HIDDEN_STORYLINES.length;
  }

  /**
   * 获取玩家已完成的支线数
   */
  static getCompletedStorylineCount(player: IPlayer): number {
    if (!player.hiddenStorylines) return 0;
    return player.hiddenStorylines.filter(p => p.isCompleted).length;
  }

  /**
   * 获取玩家已发现的线索数
   */
  static getDiscoveredClueCount(player: IPlayer): number {
    return (player.discoveredClues || []).length;
  }

  /**
   * 获取线索总数
   */
  static getTotalClueCount(): number {
    return ALL_CLUES.length;
  }
}
