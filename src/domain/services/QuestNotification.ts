import { IPlayer } from '../entities/Player';
import { QuestManager } from './QuestManager';
import { findQuest } from '../../data/quests/quest_data';
import { eventBus } from '../../infrastructure/event/EventBus';

export class QuestNotification {
  private static shownQuests: Set<string> = new Set();

  static checkAndNotify(player: IPlayer): void {
    const availableQuests = QuestManager.listAvailable(player);
    const newQuests = availableQuests.filter(qId => !this.shownQuests.has(qId));

    for (const questId of newQuests) {
      const quest = findQuest(questId);
      if (quest) {
        this.showNotification(player, quest);
        this.shownQuests.add(questId);
      }
    }
  }

  private static showNotification(_player: IPlayer, quest: any): void {
    eventBus.emit('system:message', '【任务推送】');
    eventBus.emit('system:message', `📋 **${quest.name}**`);
    eventBus.emit('system:message', `   ${quest.description}`);

    if (quest.stages && quest.stages[0] && quest.stages[0].giverNpcId) {
      eventBus.emit('system:message', `   接取人：${quest.stages[0].giverNpcId}`);
    }

    eventBus.emit('system:message', '   点击「任务」按钮查看详情并接取');
    eventBus.emit('system:message', '');
  }

  static reset(): void {
    this.shownQuests.clear();
  }

  static markShown(questId: string): void {
    this.shownQuests.add(questId);
  }

  static isShown(questId: string): boolean {
    return this.shownQuests.has(questId);
  }
}
