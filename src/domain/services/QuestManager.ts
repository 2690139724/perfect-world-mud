import { IQuest } from '../entities/Quest';
import { IPlayer, CultivationRealm } from '../entities/Player';
import { IItem } from '../entities/Item';
import { findQuest, cloneQuest, QUEST_DATA } from '../../data/quests/quest_data';
import { getItemById } from '../../data/seed/items';
import { getTechniqueById } from '../../data/seed/techniques';
import { ICave, CaveQuality } from '../entities/Cave';

export interface IQuestResult {
  success: boolean;
  message: string;
}

export class QuestManager {
  static listAvailable(player: IPlayer): string[] {
    const result: string[] = [];

    for (const qDef of QUEST_DATA) {
      if (player.completedQuests.includes(qDef.id)) continue;
      if (player.activeQuests.some(aq => aq.id === qDef.id)) continue;

      const prereqsMet = qDef.prerequisites.every(pid => player.completedQuests.includes(pid));
      if (!prereqsMet) continue;

      result.push(qDef.id);
    }
    return result;
  }

  static acceptQuest(player: IPlayer, questId: string): IQuestResult {
    if (player.activeQuests.some(q => q.id === questId)) {
      return { success: false, message: '你已经接取了该任务。' };
    }
    if (player.completedQuests.includes(questId)) {
      return { success: false, message: '该任务已完成。' };
    }

    const q = findQuest(questId);
    if (!q) {
      return { success: false, message: '未知任务。' };
    }

    for (const pid of q.prerequisites) {
      if (!player.completedQuests.includes(pid)) {
        return { success: false, message: '未满足前置条件。' };
      }
    }

    const currentStage = q.stages.find(s => s.id === q.currentStageId);
    if (currentStage) {
      for (const obj of currentStage.objectives) {
        if (obj.type === 'reach') {
          if (player.currentRoomId === obj.targetId) {
            obj.current = 1;
          }
        }
      }
    }

    player.activeQuests.push(q);
    return { success: true, message: `接受任务: ${q.name}` };
  }

  static trackKill(player: IPlayer, monsterId: string): string[] {
    const messages: string[] = [];
    for (const quest of player.activeQuests) {
      if (quest.isCompleted) continue;

      const currentStage = quest.stages.find(s => s.id === quest.currentStageId);
      if (!currentStage || currentStage.isCompleted) continue;

      for (const obj of currentStage.objectives) {
        if (obj.type === 'kill' && obj.targetId === monsterId && obj.current < obj.required) {
          obj.current++;
          const desc = obj.description.replace(/\d+\/\d+/g, `${obj.current}/${obj.required}`);
          messages.push(`[任务] ${quest.name} - ${currentStage.name}: ${desc}`);
        }
      }
    }
    return messages;
  }

  static trackReach(player: IPlayer, roomId: string): string[] {
    const messages: string[] = [];
    for (const quest of player.activeQuests) {
      if (quest.isCompleted) continue;

      const currentStage = quest.stages.find(s => s.id === quest.currentStageId);
      if (!currentStage || currentStage.isCompleted) continue;

      for (const obj of currentStage.objectives) {
        if (obj.type === 'reach' && obj.targetId === roomId && obj.current < obj.required) {
          obj.current++;
          const desc = obj.description.replace(/\d+\/\d+/g, `${obj.current}/${obj.required}`);
          messages.push(`[任务] ${quest.name} - ${currentStage.name}: ${desc}`);
        }
      }
    }
    return messages;
  }

  static trackTalk(player: IPlayer, npcId: string): string[] {
    const messages: string[] = [];
    for (const quest of player.activeQuests) {
      if (quest.isCompleted) continue;

      const currentStage = quest.stages.find(s => s.id === quest.currentStageId);
      if (!currentStage || currentStage.isCompleted) continue;

      for (const obj of currentStage.objectives) {
        if (obj.type === 'talk' && obj.targetId === npcId && obj.current < obj.required) {
          obj.current++;
          const desc = obj.description.replace(/\d+\/\d+/g, `${obj.current}/${obj.required}`);
          messages.push(`[任务] ${quest.name} - ${currentStage.name}: ${desc}`);
        }
      }
    }
    return messages;
  }

  static updateCollectObjectives(player: IPlayer): void {
    for (const quest of player.activeQuests) {
      if (quest.isCompleted) continue;

      const currentStage = quest.stages.find(s => s.id === quest.currentStageId);
      if (!currentStage || currentStage.isCompleted) continue;

      for (const obj of currentStage.objectives) {
        if (obj.type === 'collect') {
          const count = player.inventory.filter(i => i.id === obj.targetId).length;
          obj.current = Math.min(obj.required, count);
        }
      }
    }
  }

  static checkCompletion(player: IPlayer): { questId: string; questName: string; rewards: string[] }[] {
    const completed: { questId: string; questName: string; rewards: string[] }[] = [];

    for (const quest of player.activeQuests) {
      if (quest.isCompleted) continue;

      const currentStage = quest.stages.find(s => s.id === quest.currentStageId);
      if (!currentStage) continue;

      for (const obj of currentStage.objectives) {
        if (obj.type === 'collect' || obj.type === 'deliver') {
          const count = player.inventory.filter(i => i.id === obj.targetId).length;
          obj.current = Math.min(obj.required, count);
        }
      }

      const allDone = currentStage.objectives.every(obj => obj.current >= obj.required);
      if (!allDone) continue;

      currentStage.isCompleted = true;
      const rewardMessages = this.grantStageRewards(player, currentStage);

      if (currentStage.nextStageId) {
        quest.currentStageId = currentStage.nextStageId;
      } else {
        quest.isCompleted = true;
        player.completedQuests.push(quest.id);

        for (const reward of quest.rewards) {
          const msg = this.grantReward(player, reward);
          if (msg) rewardMessages.push(msg);
        }

        completed.push({ questId: quest.id, questName: quest.name, rewards: rewardMessages });
      }
    }

    player.activeQuests = player.activeQuests.filter(q => !q.isCompleted);

    return completed;
  }

  private static grantStageRewards(player: IPlayer, stage: any): string[] {
    const messages: string[] = [];
    if (!stage.rewards) return messages;

    for (const reward of stage.rewards) {
      const msg = this.grantReward(player, reward);
      if (msg) messages.push(msg);
    }
    return messages;
  }

  private static grantReward(player: IPlayer, reward: any): string | undefined {
    if (reward.type === 'exp') {
      player.cultivationExp += reward.amount;
      return `修为 +${reward.amount}`;
    } else if (reward.type === 'item' && reward.id) {
      const item = getItemById(reward.id);
      if (item) {
        for (let n = 0; n < reward.amount; n++) {
          player.inventory.push({ ...item });
        }
        return `${item.name} ×${reward.amount}`;
      }
    } else if (reward.type === 'technique' && reward.id) {
      const technique = getTechniqueById(reward.id);
      if (technique) {
        player.techniques.push({ ...technique });
        return `获得宝术: ${technique.name}`;
      }
    } else if (reward.type === 'cave' && reward.id) {
      const cave: ICave = {
        id: `cave_${Date.now()}`,
        name: reward.id === 'cave_basic' ? '凡洞天' : reward.id,
        quality: reward.id === 'cave_basic' ? CaveQuality.MORTAL : CaveQuality.SPIRIT,
        realm: CultivationRealm.CAVE,
        spiritDensity: 1.0,
        size: 3,
        plants: [],
        pets: [],
        decorations: [],
        lastVisitTime: Date.now(),
      };
      player.caves.push(cave);
      player.caveCount++;
      return `获得洞天: ${cave.name}`;
    }
    return undefined;
  }
}