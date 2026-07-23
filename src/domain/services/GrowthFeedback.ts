import { eventBus } from '../../infrastructure/event/EventBus';

/**
 * 成长反馈系统
 * 样式抽离至 styles/components/growth-feedback.css
 * 层级 z-index:2400(overlay) / 2500(popup)（event 层级）
 */
export class GrowthFeedback {
  static showBreakthroughSuccess(realmName: string): void {
    eventBus.emit('system:message', '');
    eventBus.emit('system:message', '════════════════════════════════');
    eventBus.emit('system:message', '');
    eventBus.emit('system:message', '          【境界突破！】          ');
    eventBus.emit('system:message', '');
    eventBus.emit('system:message', `        恭喜你晋级为 ${realmName}！         `);
    eventBus.emit('system:message', '');
    eventBus.emit('system:message', '          大道可期，仙途无量！          ');
    eventBus.emit('system:message', '');
    eventBus.emit('system:message', '════════════════════════════════');
    eventBus.emit('system:message', '');

    setTimeout(() => {
      this.showBreakthroughPopup(realmName);
    }, 500);
  }

  static showBreakthroughPopup(realmName: string): void {
    const overlay = document.createElement('div');
    overlay.className = 'breakthrough-overlay';

    const popup = document.createElement('div');
    popup.className = 'breakthrough-popup';

    const title = document.createElement('div');
    title.className = 'breakthrough-title';
    title.textContent = '境界突破';
    popup.appendChild(title);

    const name = document.createElement('div');
    name.className = 'breakthrough-name';
    name.textContent = realmName;
    popup.appendChild(name);

    const desc = document.createElement('div');
    desc.className = 'breakthrough-desc';
    desc.textContent = '大道可期，仙途无量';
    popup.appendChild(desc);

    const close = () => {
      popup.remove();
      overlay.remove();
    };
    overlay.onclick = close;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    setTimeout(close, 4000);
  }

  static showStageAdvance(stage: number, isPerfection: boolean = false): void {
    if (isPerfection) {
      eventBus.emit('system:message', '');
      eventBus.emit('system:message', '【大圆满！】修为已达当前境界巅峰！');
      eventBus.emit('system:message', '准备冲击更高境界吧！');
      eventBus.emit('system:message', '');
    } else {
      eventBus.emit('system:message', `【精进！】进入第 ${stage} 层`);
    }
  }

  static showTalentActivate(talentName: string): void {
    eventBus.emit('system:message', '');
    eventBus.emit('system:message', `【天赋觉醒！】${talentName}`);
    eventBus.emit('system:message', '你的天赋能力已激活！');
    eventBus.emit('system:message', '');
  }

  static showAchievement(achievementName: string, description: string): void {
    eventBus.emit('system:message', '');
    eventBus.emit('system:message', '━━━ 成就达成 ━━━');
    eventBus.emit('system:message', `🏆 ${achievementName}`);
    eventBus.emit('system:message', description);
    eventBus.emit('system:message', '');
  }
}
