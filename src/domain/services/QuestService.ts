import { IPlayer } from '../entities/Player';

export enum QuestQuality {
  NORMAL = '普通',
  ELITE = '精英',
  EPIC = '史诗',
  LEGENDARY = '传说',
}

export enum QuestType {
  MAIN = '主线',
  SIDE = '支线',
  DAILY = '日常',
  WEEKLY = '周常',
  REPEATABLE = '可重复',
  EVENT = '活动',
}

export interface IQuestBranch {
  id: string;
  text: string;
  requirements?: {
    stats?: Record<string, number>;
    choices?: string[];
  };
  nextQuestId?: string;
  rewards?: {
    exp: number;
    gold: number;
    items?: string[];
  };
  consequences?: {
    reputation?: Record<string, number>;
    flags?: string[];
  };
}

export interface IQuestChain {
  id: string;
  name: string;
  quests: string[];
  rewards?: {
    exp: number;
    gold: number;
    items?: string[];
    title?: string;
  };
}

export interface IDynamicQuest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  quality: QuestQuality;
  rewards: {
    exp: number;
    gold: number;
    items?: string[];
  };
  requirements: {
    minRealm: number;
    completedQuests?: string[];
    flags?: string[];
  };
  branches?: IQuestBranch[];
  chainId?: string;
  expiresAt?: number;
  dailyReset?: boolean;
}

export const QUEST_CHAINS: IQuestChain[] = [
  {
    id: 'chain_emperor_path',
    name: '帝道之路',
    quests: ['quest_emperor_1', 'quest_emperor_2', 'quest_emperor_3', 'quest_emperor_4'],
    rewards: { exp: 100000, gold: 200000, items: ['title_emperor'], title: '帝道传人' },
  },
];

export const DYNAMIC_QUESTS: IDynamicQuest[] = [
  {
    id: 'quest_emperor_1',
    title: '初入修行',
    description: '踏上修行之路，完成第一次突破',
    type: QuestType.MAIN,
    quality: QuestQuality.NORMAL,
    rewards: { exp: 1000, gold: 500 },
    requirements: { minRealm: 1 },
    branches: [
      { id: 'branch_1', text: '独自突破', nextQuestId: 'quest_emperor_2a', rewards: { exp: 500, gold: 0 } },
      { id: 'branch_2', text: '寻求宗门帮助', nextQuestId: 'quest_emperor_2b', rewards: { exp: 300, gold: 300 } },
    ],
    chainId: 'chain_emperor_path',
  },
  {
    id: 'quest_daily_cultivate',
    title: '每日修炼',
    description: '今日完成一次修炼',
    type: QuestType.DAILY,
    quality: QuestQuality.NORMAL,
    rewards: { exp: 500, gold: 200 },
    requirements: { minRealm: 0 },
    dailyReset: true,
  },
  {
    id: 'quest_weekly_boss',
    title: '周常挑战',
    description: '本周击败一只世界BOSS',
    type: QuestType.WEEKLY,
    quality: QuestQuality.EPIC,
    rewards: { exp: 10000, gold: 5000, items: ['mat_rare_material'] },
    requirements: { minRealm: 5 },
  },
];

export class QuestService {
  static getAvailableQuests(player: IPlayer): IDynamicQuest[] {
    const available: IDynamicQuest[] = [];

    for (const quest of DYNAMIC_QUESTS) {
      if (player.realm < quest.requirements.minRealm) continue;
      if (player.completedQuests.includes(quest.id)) continue;
      if (quest.requirements.completedQuests?.some(q => !player.completedQuests.includes(q))) continue;

      available.push(quest);
    }

    return available;
  }

  static acceptQuest(player: IPlayer, questId: string): { success: boolean; message: string; quest?: IDynamicQuest } {
    const quest = DYNAMIC_QUESTS.find(q => q.id === questId);
    if (!quest) {
      return { success: false, message: '任务不存在' };
    }

    if (player.activeQuests.some(q => q.id === questId)) {
      return { success: false, message: '已接取该任务' };
    }

    if (player.realm < quest.requirements.minRealm) {
      return { success: false, message: '境界不足' };
    }

    player.activeQuests.push({ ...quest } as any);
    return { success: true, message: `接取任务「${quest.title}」！`, quest };
  }

  static completeQuest(player: IPlayer, questId: string): { success: boolean; message: string; rewards?: { exp: number; gold: number; items?: string[] } } {
    const quest = DYNAMIC_QUESTS.find(q => q.id === questId);
    if (!quest) {
      return { success: false, message: '任务不存在' };
    }

    const activeQuestIndex = player.activeQuests.findIndex(q => q.id === questId);
    if (activeQuestIndex === -1) {
      return { success: false, message: '未接取该任务' };
    }

    player.activeQuests.splice(activeQuestIndex, 1);
    player.completedQuests.push(questId);

    player.cultivationExp += quest.rewards.exp;
    player.gold += quest.rewards.gold;

    this.checkChainCompletion(player, quest.chainId);

    return {
      success: true,
      message: `完成任务「${quest.title}」！获得${quest.rewards.exp}经验、${quest.rewards.gold}金币`,
      rewards: quest.rewards,
    };
  }

  static checkChainCompletion(player: IPlayer, chainId?: string): void {
    if (!chainId) return;

    const chain = QUEST_CHAINS.find(c => c.id === chainId);
    if (!chain) return;

    const allCompleted = chain.quests.every(q => player.completedQuests.includes(q));
    if (!allCompleted) return;

    player.cultivationExp += chain.rewards?.exp || 0;
    player.gold += chain.rewards?.gold || 0;
  }

  static selectBranch(player: IPlayer, questId: string, branchId: string): { success: boolean; message: string; nextQuestId?: string } {
    const quest = DYNAMIC_QUESTS.find(q => q.id === questId);
    if (!quest) {
      return { success: false, message: '任务不存在' };
    }

    const branch = quest.branches?.find(b => b.id === branchId);
    if (!branch) {
      return { success: false, message: '选项不存在' };
    }

    if (branch.rewards) {
      player.cultivationExp += branch.rewards.exp;
      player.gold += branch.rewards.gold;
    }

    if (branch.consequences?.flags) {
      branch.consequences.flags.forEach(flag => {
        if (!player.completedQuests.includes(flag)) {
          player.completedQuests.push(flag);
        }
      });
    }

    return {
      success: true,
      message: branch.text,
      nextQuestId: branch.nextQuestId,
    };
  }

  static getDailyQuests(player: IPlayer): IDynamicQuest[] {
    return DYNAMIC_QUESTS.filter(q => q.type === QuestType.DAILY);
  }

  static getWeeklyQuests(player: IPlayer): IDynamicQuest[] {
    return DYNAMIC_QUESTS.filter(q => q.type === QuestType.WEEKLY);
  }

  static resetDailyQuests(player: IPlayer): void {
    player.activeQuests = player.activeQuests.filter(q => q.category !== 'daily');
  }

  static resetWeeklyQuests(player: IPlayer): void {
    player.activeQuests = player.activeQuests.filter(q => q.category !== 'daily');
  }
}