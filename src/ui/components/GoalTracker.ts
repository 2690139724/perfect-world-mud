/**
 * 目标追踪系统
 * 智能推荐玩家下一步行动，提供优先级建议
 */

import { IPlayer, CultivationRealm } from '../../domain/entities/Player';
import { QuestManager } from '../../domain/services/QuestManager';

export interface IGoal {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: 'main' | 'side' | 'daily';
  progress?: number;
  maxProgress?: number;
  action?: string;
  reward?: string;
}

export class GoalTracker {
  private static instance: GoalTracker;
  private container: HTMLElement | null = null;
  private goals: IGoal[] = [];

  private constructor() {
    this.createUI();
  }

  static getInstance(): GoalTracker {
    if (!GoalTracker.instance) {
      GoalTracker.instance = new GoalTracker();
    }
    return GoalTracker.instance;
  }

  private createUI(): void {
    this.container = document.createElement('div');
    this.container.id = 'goal-tracker';
    this.container.classList.add('hidden');

    document.body.appendChild(this.container);
  }

  update(player: IPlayer): void {
    this.goals = this.generateGoals(player);
    this.render();
  }

  private generateGoals(player: IPlayer): IGoal[] {
    const goals: IGoal[] = [];

    // 1. 修炼目标
    const expProgress = player.cultivationExp / player.maxCultivationExp;
    if (expProgress >= 0.9) {
      goals.push({
        id: 'breakthrough',
        title: '境界突破',
        description: '修为已满，准备冲击更高境界！',
        priority: 'high',
        type: 'main',
        progress: Math.floor(expProgress * 100),
        maxProgress: 100,
        action: 'cultivation breakthrough',
        reward: '境界提升',
      });
    } else if (expProgress >= 0.5) {
      goals.push({
        id: 'cultivate',
        title: '精进修为',
        description: `还需${player.maxCultivationExp - player.cultivationExp}点修为可突破`,
        priority: 'medium',
        type: 'daily',
        progress: Math.floor(expProgress * 100),
        maxProgress: 100,
        action: 'cultivation sit',
      });
    }

    // 2. 任务目标
    const availableQuests = QuestManager.listAvailable(player);
    if (availableQuests.length > 0 && player.activeQuests.length === 0) {
      goals.push({
        id: 'quest-new',
        title: '接取任务',
        description: '有新的任务可以接取，完成任务可获得丰厚奖励',
        priority: 'high',
        type: 'side',
        action: 'open task',
      });
    }

    // 3. 探索目标
    if (player.realm === CultivationRealm.MORTAL) {
      goals.push({
        id: 'explore',
        title: '探索世界',
        description: '探索周围区域，发现机缘和挑战',
        priority: 'low',
        type: 'daily',
        action: 'open map',
      });
    }

    // 4. 装备目标
    const hasWeapon = player.inventory.some((i: any) => i.type === 'weapon');
    if (!hasWeapon) {
      goals.push({
        id: 'equip',
        title: '获取装备',
        description: '装备可大幅提升战斗力',
        priority: 'medium',
        type: 'side',
      });
    }

    // 5. 功法目标
    if (player.techniques.length === 0) {
      goals.push({
        id: 'technique',
        title: '选择功法',
        description: '选择一门功法开始修炼',
        priority: 'high',
        type: 'main',
        action: 'open technique',
      });
    }

    return goals.slice(0, 4); // 最多显示4个目标
  }

  private render(): void {
    if (!this.container) return;

    let html = `
      <div class="goal-tracker-header">
        <div class="goal-tracker-title">
          <span class="goal-tracker-title-mark">◆</span>
          <span>当前目标</span>
        </div>
        <button class="goal-tracker-toggle" id="goal-close">收起</button>
      </div>
      <div class="goal-list">
    `;

    if (this.goals.length === 0) {
      html += '<div class="goal-empty">暂无目标</div>';
    } else {
      for (const goal of this.goals) {
        html += `
          <div class="goal-item priority-${goal.priority}">
            <div class="goal-header">
              <span class="goal-title">${goal.title}</span>
              <span class="goal-type-tag">${this.getTypeLabel(goal.type)}</span>
            </div>
            <div class="goal-description">${goal.description}</div>
        `;

        if (goal.progress !== undefined) {
          html += `
            <div class="goal-progress">
              <div class="goal-progress-bar">
                <div class="goal-progress-fill" style="--progress:${goal.progress}%"></div>
              </div>
              <span class="goal-progress-text">${goal.progress}%</span>
            </div>
          `;
        }

        if (goal.action) {
          html += `<button class="goal-action" data-action="${goal.action}">前往</button>`;
        }

        html += '</div>';
      }
    }

    html += '</div>';
    this.container.innerHTML = html;

    // 绑定事件
    this.container.querySelector('#goal-close')?.addEventListener('click', () => {
      this.hide();
    });

    this.container.querySelectorAll('.goal-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = (e.target as HTMLElement).dataset.action;
        if (action) {
          this.handleAction(action);
        }
      });
    });
  }

  private getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      main: '主线',
      side: '支线',
      daily: '日常',
    };
    return labels[type] || type;
  }

  private handleAction(action: string): void {
    // 发送自定义事件
    const event = new CustomEvent('goalAction', { detail: { action } });
    document.dispatchEvent(event);
  }

  show(): void {
    if (this.container) {
      this.container.classList.remove('hidden');
    }
  }

  hide(): void {
    if (this.container) {
      this.container.classList.add('hidden');
    }
  }

  toggle(): void {
    if (this.container) {
      this.container.classList.toggle('hidden');
    }
  }
}