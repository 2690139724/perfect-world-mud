/**
 * 隐藏支线系统接口定义
 *
 * 设计理念：玩家通过探索、对话、战斗、收集等多渠道发现线索，
 * 集齐指定数量线索后触发隐藏支线任务，完成后获得稀有奖励。
 * 基于《完美世界》小说世界观设计。
 */

/** 线索来源类型 */
export type ClueSource = 'explore' | 'npc' | 'kill' | 'item';

/** 单条线索 */
export interface IClue {
  /** 线索唯一ID */
  id: string;
  /** 所属支线ID */
  storylineId: string;
  /** 线索标题 */
  title: string;
  /** 线索详细内容 */
  description: string;
  /** 玩家提示（发现时显示） */
  hint: string;
  /** 来源类型 */
  source: ClueSource;
  /** 来源ID（房间细节ID / NPC ID / 怪物ID / 物品ID） */
  sourceId: string;
  /** 解锁所需的前置线索ID列表 */
  requiredClues?: string[];
  /** 所需境界（CultivationRealm 枚举值） */
  requiredRealm?: number;
  /** 所需已完成的任务ID */
  requiredCompletedQuest?: string;
}

/** 隐藏支线分类 */
export type StorylineCategory = 'mystery' | 'legacy' | 'ancient' | 'legend';

/** 隐藏支线定义 */
export interface IHiddenStoryline {
  /** 支线唯一ID */
  id: string;
  /** 支线名称 */
  name: string;
  /** 支线简述 */
  description: string;
  /** 分类 */
  category: StorylineCategory;
  /** 所有线索ID列表 */
  clues: string[];
  /** 触发隐藏任务所需线索数 */
  requiredClueCount: number;
  /** 触发的隐藏任务ID */
  triggerQuestId: string;
  /** 完成奖励称号 */
  rewardTitle?: string;
  /** 背景故事文本 */
  loreText: string;
  /** 推荐境界 */
  recommendedRealm: number;
}

/** 玩家隐藏支线进度 */
export interface IHiddenStorylineProgress {
  /** 支线ID */
  storylineId: string;
  /** 已发现的线索ID列表 */
  discoveredClues: string[];
  /** 是否已触发任务 */
  isTriggered: boolean;
  /** 是否已完成 */
  isCompleted: boolean;
}

/** 支线分类名称映射 */
export const StorylineCategoryNames: Record<StorylineCategory, string> = {
  mystery: '谜团',
  legacy: '传承',
  ancient: '上古',
  legend: '传说',
};

/** 支线分类颜色映射 */
export const StorylineCategoryColors: Record<StorylineCategory, string> = {
  mystery: '#8866bb',
  legacy: '#c8a84a',
  ancient: '#4488aa',
  legend: '#e91e63',
};
