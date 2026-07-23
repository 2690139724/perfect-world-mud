/**
 * 小地图导航系统（MUD 文本网格版）
 * 替代原 Canvas 渲染，符合用户硬约束：MUD-style text grid maps
 * 样式抽离至 styles/components/minimap.css
 * 层级 z-index:1000（浮动信息层）
 */

import { World } from '../../domain/World';
import { IPlayer } from '../../domain/entities/Player';
import { IZone, ZoneType } from '../../domain/entities/Zone';

interface IGridCell {
  /** 'current' | 'discovered' | 'unknown' | 'empty' */
  state: 'current' | 'discovered' | 'unknown' | 'empty';
  zone?: IZone;
  direction?: string;
  targetRoomId?: string;
}

// 方向 → 网格位置映射（3x3 网格，索引 0~8）
// 0 1 2    西北 北 东北
// 3 4 5     西 中   东
// 6 7 8    西南 南 东南
const DIRECTION_GRID_MAP: Record<string, number> = {
  '北': 1, '南': 7, '东': 5, '西': 3,
  '东北': 2, '西北': 0, '东南': 8, '西南': 6,
  '上': 1, '下': 7, '里': 5, '外': 3,
};

const ZONE_TYPE_ICON: Record<ZoneType, string> = {
  [ZoneType.TOWN]: '邑',
  [ZoneType.CITY]: '城',
  [ZoneType.WILD]: '野',
  [ZoneType.DUNGEON]: '秘',
  [ZoneType.RUIN]: '遗',
  [ZoneType.PORTAL]: '门',
};

export class MiniMap {
  private static instance: MiniMap;
  private container: HTMLElement | null = null;
  private visible: boolean = false;
  private onNavigate?: (roomId: string) => void;

  private constructor() {
    this.createUI();
  }

  static getInstance(): MiniMap {
    if (!MiniMap.instance) {
      MiniMap.instance = new MiniMap();
    }
    return MiniMap.instance;
  }

  /** 设置导航回调，玩家点击相邻已发现区域时触发 */
  setNavigateCallback(cb: (roomId: string) => void): void {
    this.onNavigate = cb;
  }

  private createUI(): void {
    this.container = document.createElement('div');
    this.container.id = 'minimap-container';
    this.container.classList.add('hidden');

    const header = document.createElement('div');
    header.className = 'minimap-header';

    const title = document.createElement('span');
    title.className = 'minimap-title';
    title.textContent = '舆图';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'minimap-close';
    closeBtn.textContent = '×';
    closeBtn.onclick = () => this.hide();

    header.appendChild(title);
    header.appendChild(closeBtn);
    this.container.appendChild(header);

    const body = document.createElement('div');
    body.className = 'minimap-body';
    body.id = 'minimap-body';
    this.container.appendChild(body);

    document.body.appendChild(this.container);
  }

  update(world: World, player: IPlayer): void {
    if (!this.visible) return;
    const body = this.container?.querySelector('#minimap-body');
    if (!body) return;

    body.innerHTML = '';

    const currentZone = world.getZoneByRoomId(player.currentRoomId);
    if (!currentZone) {
      body.innerHTML = '<div class="minimap-zone-name minimap-zone-unknown">身处异处，方位难辨</div>';
      return;
    }

    // 区域名称
    const zoneNameEl = document.createElement('div');
    zoneNameEl.className = 'minimap-zone-name';
    zoneNameEl.textContent = `【${currentZone.name}】`;
    body.appendChild(zoneNameEl);

    // 探索进度
    const progress = world.getZoneExplorationProgress(currentZone.id);
    const progressEl = document.createElement('div');
    progressEl.className = 'minimap-progress';
    progressEl.innerHTML = `
      <span>探</span>
      <div class="minimap-progress-bar">
        <div class="minimap-progress-fill" style="--progress:${progress}%"></div>
      </div>
      <span>${progress}%</span>
    `;
    body.appendChild(progressEl);

    // 构建 3x3 网格
    const cells: IGridCell[] = new Array(9).fill(null).map(() => ({ state: 'empty' }));
    // 中心 = 当前区域
    cells[4] = { state: 'current', zone: currentZone };

    // 相邻区域填充
    for (const entrance of currentZone.entrances) {
      const gridIdx = DIRECTION_GRID_MAP[entrance.direction];
      if (gridIdx === undefined) continue;
      const neighborZone = world.getZone(entrance.targetZoneId);
      if (!neighborZone) continue;
      cells[gridIdx] = {
        state: neighborZone.discovered ? 'discovered' : 'unknown',
        zone: neighborZone,
        direction: entrance.direction,
        targetRoomId: entrance.targetRoomId,
      };
    }

    // 渲染网格
    const gridEl = document.createElement('div');
    gridEl.className = 'minimap-grid';
    cells.forEach((cell) => {
      const cellEl = document.createElement('div');
      cellEl.className = `minimap-cell ${cell.state}`;

      if (cell.state === 'empty') {
        cellEl.innerHTML = '<span class="minimap-cell-icon">·</span>';
      } else if (cell.state === 'current' && cell.zone) {
        cellEl.innerHTML = `
          <span class="minimap-cell-icon">◆</span>
          <span class="minimap-cell-label">${cell.zone.name}</span>
        `;
      } else if (cell.state === 'discovered' && cell.zone) {
        const icon = ZONE_TYPE_ICON[cell.zone.type] || '○';
        cellEl.innerHTML = `
          <span class="minimap-cell-icon">${icon}</span>
          <span class="minimap-cell-label">${cell.zone.name}</span>
        `;
        if (cell.targetRoomId && this.onNavigate) {
          cellEl.classList.add('navigable');
          cellEl.onclick = () => {
            this.onNavigate!(cell.targetRoomId!);
          };
        }
      } else if (cell.state === 'unknown') {
        cellEl.innerHTML = `
          <span class="minimap-cell-icon">？</span>
          <span class="minimap-cell-label">未知</span>
        `;
      }

      gridEl.appendChild(cellEl);
    });
    body.appendChild(gridEl);

    // 图例
    const legend = document.createElement('div');
    legend.className = 'minimap-legend';
    legend.innerHTML = `
      <div class="minimap-legend-item"><span class="minimap-legend-mark">◆</span>当前</div>
      <div class="minimap-legend-item"><span class="minimap-legend-mark">○</span>已探</div>
      <div class="minimap-legend-item"><span class="minimap-legend-mark">？</span>未知</div>
    `;
    body.appendChild(legend);
  }

  show(): void {
    if (this.container) {
      this.container.classList.remove('hidden');
      this.visible = true;
    }
  }

  hide(): void {
    if (this.container) {
      this.container.classList.add('hidden');
      this.visible = false;
    }
  }

  toggle(): void {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  isVisible(): boolean {
    return this.visible;
  }
}
