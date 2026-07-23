/**
 * 位置面板
 * 显示当前房间名称与描述
 */

import { BasePanel } from './BasePanel';
import { eventBus, GameEvents } from '../../infrastructure/event/EventBus';
import { ILocationSnapshot } from '../../application/services/UIService';
import { LayoutType } from '../../application/services/UIService';

export class LocationPanel extends BasePanel {
  private nameEl: HTMLElement;
  private descEl: HTMLElement;

  constructor(container: HTMLElement) {
    super(container, 'location');

    this.nameEl = container.querySelector('#room-name') as HTMLElement;
    this.descEl = container.querySelector('#room-desc') as HTMLElement;

    const unsub = eventBus.on<ILocationSnapshot>(GameEvents.LOCATION_CHANGED, (location) => {
      this.render(location);
    });
    this.subscriptions.push(unsub);
  }

  render(data: ILocationSnapshot): void {
    if (this.nameEl) this.nameEl.textContent = data.roomName;
    if (this.descEl) this.descEl.textContent = data.roomDescription;
  }

  protected onLayoutChange(layout: LayoutType): void {
    this.container.classList.toggle('panel-mobile-hidden', layout === 'mobile');
  }
}
