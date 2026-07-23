/**
 * 装备面板
 * 显示当前装备
 */

import { BasePanel } from './BasePanel';
import { eventBus, GameEvents } from '../../infrastructure/event/EventBus';
import { IPlayerSnapshot, IEquipmentSnapshot, LayoutType } from '../../application/services/UIService';

export class EquipmentPanel extends BasePanel {
  private listEl: HTMLElement;

  constructor(container: HTMLElement) {
    super(container, 'equipment');

    this.listEl = container.querySelector('#equip-list') as HTMLElement;

    const unsub = eventBus.on<IPlayerSnapshot>(GameEvents.PLAYER_UPDATED, (player) => {
      this.render(player.equipment);
    });
    this.subscriptions.push(unsub);
  }

  render(data: IEquipmentSnapshot[]): void {
    if (!this.listEl) return;

    const html = data.map(item => {
      return `<div class="equip-slot">
        <span class="equip-slot-name">${item.slot}</span>
        <span class="equip-slot-value">${item.name}</span>
      </div>`;
    }).join('');

    this.listEl.innerHTML = html;
  }

  protected onLayoutChange(layout: LayoutType): void {
    this.container.classList.toggle('panel-mobile-hidden', layout === 'mobile');
  }
}
