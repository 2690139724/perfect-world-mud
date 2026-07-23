import { GameStore, IGameState } from '../../application/store/GameStore';
import { NarrativeStream } from '../components/NarrativeStream';
import { getWorldDefinition, getFullRealmName as getWorldFullRealmName } from '../../domain/entities/WorldDefinition';
import { getNPCsByRoom } from '../../data/npcs/npc_data';
import { IRoom } from '../../domain/entities/Room';
import { ItemType } from '../../domain/entities/Item';

const ZONE_TYPE_NAMES: Record<string, string> = {
  'town': '城镇',
  'city': '城池',
  'wild': '荒野',
  'dungeon': '秘境',
  'ruin': '遗迹',
  'portal': '传送门',
  'village': '村庄',
};

export class GameRenderer {
  private store: GameStore;
  private narrative: NarrativeStream;
  private unsubscribe: () => void;

  // 缓存标记，避免重复渲染
  private lastLogCount: number = 0;
  private lastStatusHash: string = '';
  private lastZoneId: string = '';
  private lastRoomId: string = '';
  private lastEquipHash: string = '';
  private lastNPCListJson: string = '';
  private lastTalentHash: string = '';
  private lastTimeStr: string = '';
  private lastMenuSaveStatus: string = '';

  // 渲染节流控制
  private renderPending: boolean = false;
  private renderScheduled: boolean = false;

  // 折叠状态
  private npcExpanded: boolean = false;

  public onNPCClick?: (npcIndex: number) => void;
  public onNavigate?: (view: string) => void;
  public onAction?: (action: string) => void;
  public onOpenMenu?: () => void;
  public onOpenHelp?: () => void;

  public getNarrative(): NarrativeStream {
    return this.narrative;
  }

  constructor(store: GameStore) {
    this.store = store;

    const narrativeContainer = this.findElement(['#narrative-stream', '.narrative-stream', '.col-center']);
    this.narrative = new NarrativeStream(narrativeContainer);

    this.bindGlobalActions();
    this.unsubscribe = this.store.subscribe(() => this.scheduleRender());

    setTimeout(() => this.scheduleRender(), 80);
  }

  /**
   * 使用 rAF 节流渲染，避免在 IDE 预览面板中触发 React 无限循环
   */
  private scheduleRender(): void {
    if (this.renderScheduled) return;
    this.renderScheduled = true;
    requestAnimationFrame(() => {
      this.renderScheduled = false;
      this.render();
    });
  }

  private findElement(selectors: string[]): HTMLElement {
    for (const sel of selectors) {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el) return el;
    }
    const fallback = document.createElement('div');
    document.body.appendChild(fallback);
    return fallback;
  }

  private bindGlobalActions(): void {
    document.querySelectorAll('.narrative-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.narrative-tab').forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
      });
    });
  }

  public render(): void {
    const state = this.store.getState();
    this.renderLogs(state);
    this.renderStatus(state);
    this.renderTime(state);
    this.renderZone(state);
    this.renderRoom(state);
    this.renderEquipment(state);
    this.renderTalentPanel(state);
    this.renderNPCList(state);
    this.renderMenuTimeHint();
  }

  private renderLogs(state: IGameState): void {
    const logs = state.logs;
    for (let i = this.lastLogCount; i < logs.length; i++) {
      this.narrative.push(logs[i]);
    }
    this.lastLogCount = logs.length;
  }

  private renderStatus(state: IGameState): void {
    const p = state.player;
    const hash = `${p.name}|${p.realm}|${p.realmStage}|${p.realmPerfection}|${p.gold}|${p.caveCount}|${p.hp}|${p.maxHp}|${p.mana}|${p.maxMana}|${Math.floor(p.cultivationExp)}|${p.maxCultivationExp}`;
    if (hash === this.lastStatusHash) return;
    this.lastStatusHash = hash;

    this.setText('player-name', p.name);
    this.setText('player-realm', getWorldFullRealmName(p.currentWorldId, p.realm, p.realmStage, p.realmPerfection));
    this.setText('player-world', getWorldDefinition(p.currentWorldId).name);
    this.setText('player-gold', `💰 ${p.gold}`);
    this.setText('player-talents', `天赋 ${p.talentIds.length}/3`);

    const hpPercent = Math.max(0, Math.min(100, (p.hp / p.maxHp) * 100));
    const manaPercent = Math.max(0, Math.min(100, (p.mana / p.maxMana) * 100));
    const expPercent = Math.max(0, Math.min(100, (p.cultivationExp / p.maxCultivationExp) * 100));

    this.setStyle('topbar-hp-fill', 'width', hpPercent + '%');
    this.setStyle('topbar-mp-fill', 'width', manaPercent + '%');
    this.setStyle('topbar-exp-fill', 'width', expPercent + '%');

    this.setText('topbar-hp-text', `${p.hp} / ${p.maxHp}`);
    this.setText('topbar-mp-text', `${p.mana} / ${p.maxMana}`);
    this.setText('topbar-exp-text', `${Math.floor(p.cultivationExp)} / ${p.maxCultivationExp}`);
  }

  private renderTime(state: IGameState): void {
    const t = state.gameTime;
    const timeNames: string[] = ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时'];
    const seasonNames: string[] = ['春', '夏', '秋', '冬'];
    const tod: number = Number(t.timeOfDay ?? 0);
    const sn: number = Number(t.season ?? 0);
    const str = `${timeNames[tod] || ''} · ${seasonNames[sn] || ''}`;
    if (str === this.lastTimeStr) return;
    this.lastTimeStr = str;
    this.setText('topbar-time', str);
  }

  private renderZone(state: IGameState): void {
    const zone = state.world.getZoneByRoomId(state.player.currentRoomId);
    if (!zone) return;
    if (zone.id === this.lastZoneId) return;
    this.lastZoneId = zone.id;

    this.setText('zone-name', zone.name);
    this.setText('zone-type', ZONE_TYPE_NAMES[zone.type] || zone.type);

    const progress = state.world.getZoneExplorationProgress(zone.id);
    this.setStyle('zone-progress-fill', 'width', progress + '%');
    this.setText('zone-progress-text', `探索 ${progress}%`);
  }

  private renderRoom(state: IGameState): void {
    const room = state.world.getRoom(state.player.currentRoomId);
    if (!room) return;
    if (room.id === this.lastRoomId) return;
    this.lastRoomId = room.id;
    this.npcExpanded = false;

    this.setText('location-name', room.name);
    this.setText('location-desc', room.description);
  }

  private renderNPCList(state: IGameState): void {
    const room = state.world.getRoom(state.player.currentRoomId);
    if (!room) return;

    const allNPCs = getNPCsByRoom(room.id, room.description);
    const json = JSON.stringify(allNPCs.map(n => `${n.id}:${n.title}:${n.name}`)) + '|' + (this.npcExpanded ? '1' : '0');
    if (json === this.lastNPCListJson) return;
    this.lastNPCListJson = json;

    const list = document.getElementById('npc-list');
    if (!list) return;

    if (allNPCs.length === 0) {
      list.innerHTML = '<div class="npc-empty">此处无人。</div>';
      return;
    }

    const max = 4;
    const display = this.npcExpanded ? allNPCs : allNPCs.slice(0, max);
    const hasMore = allNPCs.length > max;

    let html = display.map((npc, i) => `
      <button class="npc-item" data-npc-idx="${i}">
        <span class="npc-item-mark"></span>
        <span class="npc-item-title">${npc.title}</span>
        <span class="npc-item-name">${npc.name}</span>
      </button>
    `).join('');

    if (hasMore && !this.npcExpanded) {
      html += `<div class="npc-item-more" data-npc-expand="1">+ ${allNPCs.length - max} 更多</div>`;
    } else if (hasMore && this.npcExpanded) {
      html += `<div class="npc-item-more" data-npc-collapse="1">收起</div>`;
    }

    list.innerHTML = html;

    list.querySelectorAll<HTMLElement>('.npc-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.npcIdx || '0');
        this.onNPCClick?.(idx);
      });
    });
    list.querySelectorAll<HTMLElement>('[data-npc-expand]').forEach(el => {
      el.addEventListener('click', () => {
        this.npcExpanded = true;
        this.lastNPCListJson = '';
        this.renderNPCList(this.store.getState());
      });
    });
    list.querySelectorAll<HTMLElement>('[data-npc-collapse]').forEach(el => {
      el.addEventListener('click', () => {
        this.npcExpanded = false;
        this.lastNPCListJson = '';
        this.renderNPCList(this.store.getState());
      });
    });
  }

  private renderEquipment(state: IGameState): void {
    const eq = state.player.equipment;
    const hash = `${eq.weapon?.id || ''}|${eq.armor?.id || ''}|${eq.boots?.id || ''}|${eq.accessory1?.id || ''}|${eq.accessory2?.id || ''}|${eq.artifact?.id || ''}`;
    if (hash === this.lastEquipHash) return;
    this.lastEquipHash = hash;

    const list = document.getElementById('equip-list');
    if (!list) return;

    const slots: { key: keyof typeof eq; label: string }[] = [
      { key: 'weapon', label: '武器' },
      { key: 'armor', label: '护甲' },
      { key: 'boots', label: '靴子' },
      { key: 'accessory1', label: '饰品一' },
      { key: 'accessory2', label: '饰品二' },
      { key: 'artifact', label: '法宝' },
    ];

    list.innerHTML = slots.map(slot => {
      const item = eq[slot.key];
      const name = item?.name || '空';
      const empty = !item;
      return `<div class="equip-slot ${empty ? 'is-empty' : ''}">
        <span class="equip-slot-name">${slot.label}</span>
        <span class="equip-slot-value">${name}</span>
      </div>`;
    }).join('');
  }

  private renderTalentPanel(state: IGameState): void {
    const player = state.player;
    const talentIds = player.talentIds || [];
    const hash = talentIds.join('|');
    if (hash === this.lastTalentHash) return;
    this.lastTalentHash = hash;

    // 天赋面板渲染到 feature-window 或 modal 中，这里不直接渲染
    // 仅在需要时通过 data-action="天赋" 触发 TalentCommand
  }

  private renderMenuTimeHint(): void {
    const state = this.store.getState();
    const t = state.gameTime;
    const tod: number = Number(t.timeOfDay ?? 0);
    const timeNames: string[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const seasonNames: string[] = ['春', '夏', '秋', '冬'];
    const day: number = Number(t.day ?? 1);
    const sn: number = Number(t.season ?? 0);
    const str = `修行第 ${day} 日 · ${timeNames[tod] || ''}时 · ${seasonNames[sn] || ''}季`;
    if (str === this.lastMenuSaveStatus) return;
    this.lastMenuSaveStatus = str;
    this.setText('menu-time-hint', str);
  }

  private setText(id: string, text: string): void {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  private setStyle(id: string, key: string, value: string): void {
    const el = document.getElementById(id);
    if (el) (el.style as any)[key] = value;
  }

  public destroy(): void {
    this.unsubscribe();
  }
}
