/**
 * 世界事件弹窗
 * 样式抽离至 styles/components/world-event.css
 * 层级 z-index:2500（event 层级）
 */

import { IWorldEventTemplate, IEventChoice } from '../../domain/entities/WorldEvent';
import { WorldEventService, IChoiceResult } from '../../domain/services/WorldEventService';
import { IPlayer } from '../../domain/entities/Player';

const DANGER_NAMES: Record<string, string> = {
  safe: '安全',
  low: '低危',
  medium: '中危',
  high: '高危',
  deadly: '致命',
};

const EVENT_TYPE_NAMES: Record<string, string> = {
  npc_fight: 'NPC冲突',
  npc_robbery: '拦路抢劫',
  npc_trade: '交易事件',
  npc_betrayal: '背叛阴谋',
  npc_rescue: '救援事件',
  npc_secret_deal: '秘密交易',
  npc_poisoning: '阴谋诡计',
  npc_frame_up: '栽赃陷害',
  npc_alliance: '联盟结义',
  npc_rivalry: '竞争对立',
  treasure_discovery: '发现宝物',
  trap: '陷阱机关',
  ambush: '埋伏突袭',
  mysterious_stranger: '神秘人物',
  cultivation_insight: '修炼机缘',
  spirit_beast: '灵兽相遇',
  ancient_ruin: '上古遗迹',
  celestial_phenomenon: '天降异象',
};

// 选项类型 → 仙侠化中文标签（替代 emoji）
const CHOICE_TYPE_LABEL: Record<string, string> = {
  help: '援',
  attack: '战',
  negotiate: '谈',
  observe: '观',
  flee: '遁',
  join: '盟',
  betray: '叛',
  search: '寻',
  accept: '允',
  refuse: '拒',
};

export class WorldEventModal {
  private container: HTMLElement;
  private player: IPlayer;
  private onClose?: () => void;

  constructor(player: IPlayer, onClose?: () => void) {
    this.player = player;
    this.onClose = onClose;
    this.container = document.createElement('div');
    this.container.id = 'world-event-modal';
  }

  show(event: IWorldEventTemplate): void {
    document.body.appendChild(this.container);
    this.renderEvent(event);
  }

  private renderEvent(event: IWorldEventTemplate): void {
    const dangerName = DANGER_NAMES[event.dangerLevel] || '未知';

    this.container.innerHTML = '';

    const card = document.createElement('div');
    card.className = `world-event-card danger-${event.dangerLevel}`;

    // 头部
    const header = document.createElement('div');
    header.className = 'world-event-header';

    const titleRow = document.createElement('div');
    titleRow.className = 'world-event-title-row';

    const title = document.createElement('h2');
    title.className = 'world-event-title';
    title.textContent = event.title;

    const danger = document.createElement('span');
    danger.className = 'world-event-danger';
    danger.textContent = `危险度：${dangerName}`;

    titleRow.appendChild(title);
    titleRow.appendChild(danger);

    const typeEl = document.createElement('div');
    typeEl.className = 'world-event-type';
    typeEl.textContent = this.getEventTypeName(event.type);

    header.appendChild(titleRow);
    header.appendChild(typeEl);
    card.appendChild(header);

    // 描述
    const desc = document.createElement('div');
    desc.className = 'world-event-desc';
    desc.textContent = event.description;
    card.appendChild(desc);

    // 选项列表
    const choicesWrap = document.createElement('div');
    choicesWrap.className = 'world-event-choices';

    const choicesLabel = document.createElement('div');
    choicesLabel.className = 'world-event-choices-label';
    choicesLabel.textContent = '你的选择：';
    choicesWrap.appendChild(choicesLabel);

    event.choices.forEach((choice, index) => {
      choicesWrap.appendChild(this.buildChoiceButton(choice, index));
    });
    card.appendChild(choicesWrap);

    this.container.appendChild(card);
  }

  private buildChoiceButton(choice: IEventChoice, index: number): HTMLElement {
    const btn = document.createElement('button');
    btn.className = 'event-choice-btn';
    btn.dataset.choice = choice.id;

    const icon = document.createElement('span');
    icon.className = 'event-choice-icon';
    icon.textContent = CHOICE_TYPE_LABEL[choice.type] || '择';

    const text = document.createElement('span');
    text.className = 'event-choice-text';
    text.textContent = `${index + 1}. ${choice.text}`;

    btn.appendChild(icon);
    btn.appendChild(text);

    if (choice.successRate) {
      const rate = document.createElement('span');
      rate.className = 'event-choice-rate';
      rate.textContent = `成功率 ${Math.round(choice.successRate * 100)}%`;
      btn.appendChild(rate);
    }

    btn.onclick = () => this.handleChoice(choice);
    return btn;
  }

  private handleChoice(choice: IEventChoice): void {
    // 需要原始事件引用，通过查询当前 DOM 获取
    // 为保持原有行为，重写渲染结果
    const result = WorldEventService.resolveChoice(this.player, choice.id);
    if (result) {
      this.renderOutcome(choice, result);
    }
  }

  private renderOutcome(choice: IEventChoice, result: IChoiceResult): void {
    const outcome = result.outcome;

    this.container.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'world-event-card danger-medium';

    const header = document.createElement('div');
    header.className = 'world-event-header';
    const title = document.createElement('h2');
    title.className = 'world-event-title';
    title.textContent = '结果';
    header.appendChild(title);
    card.appendChild(header);

    const desc = document.createElement('div');
    desc.className = 'world-event-desc';
    desc.textContent = outcome.text;
    card.appendChild(desc);

    if (result.effectsApplied.length > 0) {
      const effectsWrap = document.createElement('div');
      effectsWrap.className = 'world-event-outcome-effects';

      const label = document.createElement('div');
      label.className = 'world-event-effects-label';
      label.textContent = '事件影响：';
      effectsWrap.appendChild(label);

      const list = document.createElement('div');
      list.className = 'world-event-effect-list';
      for (const effect of result.effectsApplied) {
        const item = document.createElement('div');
        const isPositive = effect.includes('+') || effect.includes('获得');
        const isNegative = effect.includes('-') || effect.includes('损失');
        item.className = `world-event-effect ${isPositive ? 'positive' : isNegative ? 'negative' : ''}`;
        item.textContent = effect;
        list.appendChild(item);
      }
      effectsWrap.appendChild(list);
      card.appendChild(effectsWrap);
    }

    const closeWrap = document.createElement('div');
    closeWrap.className = 'world-event-choices';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'world-event-close-btn';
    closeBtn.textContent = '继续';
    closeBtn.onclick = () => this.close();
    closeWrap.appendChild(closeBtn);
    card.appendChild(closeWrap);

    this.container.appendChild(card);
  }

  private getEventTypeName(type: string): string {
    return EVENT_TYPE_NAMES[type] || '随机事件';
  }

  close(): void {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    if (this.onClose) {
      this.onClose();
    }
  }
}
