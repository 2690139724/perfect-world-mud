/**
 * 区域面板
 * 显示当前区域名称、类型、探索进度
 */

import { BasePanel } from './BasePanel';
import { eventBus, GameEvents } from '../../infrastructure/event/EventBus';
import { ILocationSnapshot, LayoutType } from '../../application/services/UIService';

export class ZonePanel extends BasePanel {
  private nameEl: HTMLElement;
  private typeEl: HTMLElement;
  private progressFillEl: HTMLElement;
  private progressTextEl: HTMLElement;

  constructor(container: HTMLElement) {
    super(container, 'zone');

    this.nameEl = container.querySelector('#zone-name') as HTMLElement;
    this.typeEl = container.querySelector('#zone-type') as HTMLElement;
    this.progressFillEl = container.querySelector('#zone-progress-fill') as HTMLElement;
    this.progressTextEl = container.querySelector('#zone-progress-text') as HTMLElement;

    const unsub = eventBus.on<ILocationSnapshot>(GameEvents.LOCATION_CHANGED, (location) => {
      this.render(location);
    });
    this.subscriptions.push(unsub);
  }

  render(data: ILocationSnapshot): void {
    if (this.nameEl) this.nameEl.textContent = data.zoneName;
    if (this.typeEl) this.typeEl.textContent = data.zoneType;
    if (this.progressFillEl) {
      this.progressFillEl.style.setProperty('--progress', `${Math.min(100, Math.max(0, data.zoneProgress))}%`);
    }
    if (this.progressTextEl) {
      this.progressTextEl.textContent = `${Math.round(data.zoneProgress)}%`;
    }
  }

  protected onLayoutChange(layout: LayoutType): void {
    this.container.classList.toggle('panel-mobile-hidden', layout === 'mobile');
  }
}
