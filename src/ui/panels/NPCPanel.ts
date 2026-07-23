/**
 * NPC 面板
 * 显示当前房间可交谈 NPC
 */

import { BasePanel } from './BasePanel';
import { eventBus, GameEvents } from '../../infrastructure/event/EventBus';
import { INPCSnapshot, LayoutType } from '../../application/services/UIService';

export class NPCPanel extends BasePanel {
  private moduleEl: HTMLElement;
  private listEl: HTMLElement;
  private onNPCClick?: (index: number) => void;

  constructor(container: HTMLElement) {
    super(container, 'npc');

    this.moduleEl = container;
    this.listEl = container.querySelector('#npc-list') as HTMLElement;

    const unsub = eventBus.on<INPCSnapshot[]>(GameEvents.NPC_LIST_UPDATED, (npcs) => {
      this.render(npcs);
    });
    this.subscriptions.push(unsub);

    this.bindClick();
  }

  setOnNPCClick(callback: (index: number) => void): void {
    this.onNPCClick = callback;
  }

  render(data: INPCSnapshot[]): void {
    const npcs = data as INPCSnapshot[];
    if (!this.moduleEl || !this.listEl) return;

    if (npcs.length === 0) {
      this.moduleEl.classList.add('hidden');
      return;
    }

    this.moduleEl.classList.remove('hidden');

    const maxDisplay = 4;
    const displayNPCs = npcs.slice(0, maxDisplay);
    const hasMore = npcs.length > maxDisplay;

    let html = displayNPCs.map((npc, i) => {
      return `<button class="npc-tag" data-npc-idx="${i}" title="${npc.title} ${npc.name}">
        <span class="npc-tag-name">${npc.name}</span>
        <span class="npc-tag-title">${npc.title}</span>
      </button>`;
    }).join('');

    if (hasMore) {
      const remainingCount = npcs.length - maxDisplay;
      html += `<button class="npc-tag npc-tag-more" data-npc-more="${remainingCount}">
        <span class="npc-tag-name">+${remainingCount}</span>
        <span class="npc-tag-title">更多</span>
      </button>`;
    }

    this.listEl.innerHTML = html;
  }

  protected onLayoutChange(layout: LayoutType): void {
    this.container.classList.toggle('panel-mobile-hidden', layout === 'mobile');
  }

  private bindClick(): void {
    if (!this.listEl) return;

    this.listEl.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('.npc-tag') as HTMLElement;
      if (!btn) return;

      const idx = btn.getAttribute('data-npc-idx');
      const more = btn.getAttribute('data-npc-more');

      if (idx !== null && this.onNPCClick) {
        this.onNPCClick(parseInt(idx));
      } else if (more !== null) {
        this.expandAll();
      }
    });
  }

  private expandAll(): void {
    eventBus.emit(GameEvents.PANEL_OPEN, { panelId: 'npc-full' });
  }
}
