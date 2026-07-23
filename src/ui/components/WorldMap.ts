/**
 * 大世界地图组件
 * 可视化展示当前世界的所有区域，支持导航和探索
 *
 * 样式抽离至 styles/components/world-map.css
 * 层级 z-index:2400（event 层级，可遮挡主界面）
 */

import { IZone, ZoneType } from '../../domain/entities/Zone';
import { IPlayer } from '../../domain/entities/Player';
import { WorldId, WORLD_NAMES } from '../../domain/entities/WorldDefinition';

interface IZoneNode {
  zone: IZone;
  x: number;
  y: number;
  level: number;
}

interface IZoneConnection {
  from: string;
  to: string;
  direction: string;
}

// 区域类型 → 中文图标（MUD 风格字符，替代 emoji）
const ZONE_TYPE_ICON: Record<ZoneType, string> = {
  [ZoneType.TOWN]: '邑',
  [ZoneType.CITY]: '城',
  [ZoneType.WILD]: '野',
  [ZoneType.DUNGEON]: '秘',
  [ZoneType.RUIN]: '遗',
  [ZoneType.PORTAL]: '门',
};

const ZONE_TYPE_NAME: Record<ZoneType, string> = {
  [ZoneType.TOWN]: '城镇',
  [ZoneType.CITY]: '都城',
  [ZoneType.WILD]: '荒野',
  [ZoneType.DUNGEON]: '秘境',
  [ZoneType.RUIN]: '遗迹',
  [ZoneType.PORTAL]: '传送',
};

export class WorldMap {
  private static instance: WorldMap;
  private container: HTMLElement | null = null;
  private visible: boolean = false;
  private player: IPlayer | null = null;
  private currentWorldId: WorldId = WorldId.PERFECT_WORLD;
  private zones: IZone[] = [];
  private nodes: Map<string, IZoneNode> = new Map();
  private connections: IZoneConnection[] = [];
  private selectedZoneId: string | null = null;
  private onNavigate?: (zoneId: string, roomId: string) => void;

  private constructor() {}

  static getInstance(): WorldMap {
    if (!WorldMap.instance) {
      WorldMap.instance = new WorldMap();
    }
    return WorldMap.instance;
  }

  init(player: IPlayer, zones: IZone[], worldId: WorldId, onNavigate?: (zoneId: string, roomId: string) => void): void {
    this.player = player;
    this.zones = zones.filter(z => z.id.startsWith(worldId.replace('_', '_')) || this.isZoneInWorld(z, worldId));
    this.currentWorldId = worldId;
    this.onNavigate = onNavigate;
    this.calculateLayout();
    this.createUI();
  }

  private isZoneInWorld(zone: IZone, worldId: WorldId): boolean {
    const prefix = worldId.replace('_', '_');
    return zone.id.includes(prefix) || zone.id.includes(worldId.split('_')[0]);
  }

  private calculateLayout(): void {
    this.nodes.clear();
    this.connections = [];

    const startZone = this.zones.find(z => z.discovered) || this.zones[0];
    if (!startZone) return;

    const visited = new Set<string>();
    const queue: { zoneId: string; level: number }[] = [{ zoneId: startZone.id, level: 0 }];
    const levelMap = new Map<number, string[]>();

    while (queue.length > 0) {
      const { zoneId, level } = queue.shift()!;
      if (visited.has(zoneId)) continue;
      visited.add(zoneId);

      if (!levelMap.has(level)) levelMap.set(level, []);
      levelMap.get(level)!.push(zoneId);

      const zone = this.zones.find(z => z.id === zoneId);
      if (zone) {
        for (const entrance of zone.entrances) {
          if (!visited.has(entrance.targetZoneId) && this.zones.some(z => z.id === entrance.targetZoneId)) {
            this.connections.push({
              from: zoneId,
              to: entrance.targetZoneId,
              direction: entrance.direction,
            });
            queue.push({ zoneId: entrance.targetZoneId, level: level + 1 });
          }
        }
      }
    }

    const levelHeight = 140;
    const nodeWidth = 160;
    const gap = 40;

    for (const [level, zoneIds] of levelMap) {
      const totalWidth = zoneIds.length * nodeWidth + (zoneIds.length - 1) * gap;
      const startX = -totalWidth / 2 + nodeWidth / 2;

      zoneIds.forEach((zoneId, index) => {
        const zone = this.zones.find(z => z.id === zoneId);
        if (zone) {
          this.nodes.set(zoneId, {
            zone,
            x: startX + index * (nodeWidth + gap),
            y: level * levelHeight - (levelMap.size - 1) * levelHeight / 2,
            level,
          });
        }
      });
    }
  }

  private createUI(): void {
    if (this.container) return;

    this.container = document.createElement('div');
    this.container.id = 'world-map-overlay';

    // 头部
    const header = document.createElement('div');
    header.className = 'world-map-header';

    const headerLeft = document.createElement('div');
    headerLeft.className = 'world-map-header-left';

    const glyph = document.createElement('span');
    glyph.className = 'world-map-glyph';
    glyph.textContent = '图';

    const titleBlock = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'world-map-title';
    title.textContent = WORLD_NAMES[this.currentWorldId] || '大世界舆图';
    const subtitle = document.createElement('div');
    subtitle.className = 'world-map-subtitle';
    subtitle.textContent = '点击区域查看详情，可导航至已探索区域';
    titleBlock.appendChild(title);
    titleBlock.appendChild(subtitle);

    headerLeft.appendChild(glyph);
    headerLeft.appendChild(titleBlock);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'world-map-close';
    closeBtn.textContent = '关闭';
    closeBtn.onclick = () => this.hide();

    header.appendChild(headerLeft);
    header.appendChild(closeBtn);

    // 主体 SVG
    const body = document.createElement('div');
    body.className = 'world-map-body';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'world-map-svg';
    body.appendChild(svg);

    // 详情面板
    const detail = document.createElement('div');
    detail.className = 'world-map-detail';
    detail.id = 'world-map-detail';

    this.container.appendChild(header);
    this.container.appendChild(body);
    this.container.appendChild(detail);
    document.body.appendChild(this.container);

    this.renderMap();
  }

  private renderMap(): void {
    const svg = this.container?.querySelector('#world-map-svg');
    if (!svg) return;

    const svgEl = svg as SVGSVGElement;
    const width = 1000;
    const height = 700;
    svgEl.setAttribute('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

    let svgContent = '';

    // 背景网格
    svgContent += `<defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(212, 168, 88, 0.08)" stroke-width="0.5"/>
      </pattern>
    </defs>`;
    svgContent += `<rect x="${-width / 2}" y="${-height / 2}" width="${width}" height="${height}" fill="url(#grid)"/>`;

    // 连接线
    for (const conn of this.connections) {
      const fromNode = this.nodes.get(conn.from);
      const toNode = this.nodes.get(conn.to);
      if (fromNode && toNode) {
        const isPathKnown = fromNode.zone.discovered && toNode.zone.discovered;
        const strokeColor = isPathKnown ? 'rgba(212, 168, 88, 0.5)' : 'rgba(120, 110, 90, 0.2)';
        const strokeWidth = isPathKnown ? 2 : 1;

        svgContent += `<line
          x1="${fromNode.x}" y1="${fromNode.y}"
          x2="${toNode.x}" y2="${toNode.y}"
          stroke="${strokeColor}"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${isPathKnown ? '0' : '5,5'}"
        />`;

        if (isPathKnown) {
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          svgContent += `<text x="${midX}" y="${midY - 5}" text-anchor="middle" fill="rgba(212, 168, 88, 0.6)" font-size="11" font-family="var(--font-deco)">${conn.direction}</text>`;
        }
      }
    }

    // Zone 节点（移除装饰性粒子动画 <animate>）
    for (const [zoneId, node] of this.nodes) {
      const zone = node.zone;
      const isCurrent = this.player?.currentRoomId && zone.roomIds.includes(this.player.currentRoomId);
      const isDiscovered = zone.discovered;
      const isSelected = this.selectedZoneId === zoneId;

      const nodeColor = this.getZoneColor(zone.type, isDiscovered);
      const strokeColor = isCurrent ? 'var(--gold-1)' : isSelected ? 'var(--azure)' : isDiscovered ? nodeColor : 'rgba(120, 110, 90, 0.3)';
      const strokeWidth = (isCurrent || isSelected) ? 2 : 1;

      // 节点背景
      svgContent += `<rect
        x="${node.x - 70}" y="${node.y - 45}"
        width="140" height="90"
        rx="10"
        fill="${isDiscovered ? 'rgba(30, 25, 20, 0.95)' : 'rgba(20, 20, 25, 0.9)'}"
        stroke="${strokeColor}"
        stroke-width="${strokeWidth}"
        class="zone-node"
        data-zone-id="${zoneId}"
      />`;

      // Zone 图标（中文字符替代 emoji）
      const icon = isDiscovered ? ZONE_TYPE_ICON[zone.type] : '？';
      svgContent += `<text x="${node.x}" y="${node.y - 18}" text-anchor="middle" font-size="20" font-family="var(--font-deco)" fill="${isDiscovered ? nodeColor : 'var(--paper-4)'}">${icon}</text>`;

      // Zone 名称
      const nameColor = isDiscovered ? 'var(--paper-0)' : 'var(--paper-4)';
      const nameText = isDiscovered ? zone.name : '？？？';
      svgContent += `<text x="${node.x}" y="${node.y + 5}" text-anchor="middle" fill="${nameColor}" font-size="14" font-weight="bold" font-family="var(--font-deco)">${nameText}</text>`;

      if (isDiscovered) {
        svgContent += `<text x="${node.x}" y="${node.y + 22}" text-anchor="middle" fill="${nodeColor}" font-size="11" font-family="var(--font-deco)">${ZONE_TYPE_NAME[zone.type]}</text>`;
      }

      // 推荐境界
      if (isDiscovered) {
        const levelColor = this.player && this.player.realm >= zone.recommendedLevel ? 'var(--jade)' : 'var(--crimson)';
        svgContent += `<text x="${node.x}" y="${node.y + 36}" text-anchor="middle" fill="${levelColor}" font-size="10" font-family="var(--font-deco)">推荐境界: ${zone.recommendedLevel}</text>`;
      }

      // 当前位置标记
      if (isCurrent) {
        svgContent += `<text x="${node.x}" y="${node.y + 52}" text-anchor="middle" fill="var(--gold-1)" font-size="10" font-weight="bold" font-family="var(--font-deco)">◆ 当前位置</text>`;
      }
    }

    svgEl.innerHTML = svgContent;

    // 绑定点击事件
    svgEl.querySelectorAll('.zone-node').forEach(node => {
      node.addEventListener('click', (e) => {
        const zoneId = (e.currentTarget as SVGRectElement).getAttribute('data-zone-id');
        if (zoneId) {
          this.selectZone(zoneId);
        }
      });
    });
  }

  private selectZone(zoneId: string): void {
    this.selectedZoneId = zoneId;
    this.renderMap();
    this.showZoneDetail(zoneId);
  }

  private showZoneDetail(zoneId: string): void {
    const detailPanel = this.container?.querySelector('#world-map-detail');
    if (!detailPanel) return;

    const zone = this.zones.find(z => z.id === zoneId);
    if (!zone) return;

    const isDiscovered = zone.discovered;
    const isCurrent = this.player?.currentRoomId && zone.roomIds.includes(this.player.currentRoomId);
    const canNavigate = isDiscovered && !isCurrent && this.onNavigate;

    detailPanel.innerHTML = '';
    detailPanel.classList.add('visible');

    const row = document.createElement('div');
    row.className = 'world-map-detail-row';

    const main = document.createElement('div');
    main.className = 'world-map-detail-main';

    const titleRow = document.createElement('div');
    titleRow.className = 'world-map-detail-title-row';

    const icon = document.createElement('span');
    icon.className = 'world-map-detail-icon';
    icon.textContent = isDiscovered ? ZONE_TYPE_ICON[zone.type] : '？';

    const titleBlock = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'world-map-detail-name';
    name.textContent = isDiscovered ? zone.name : '未探索区域';

    const meta = document.createElement('div');
    meta.className = 'world-map-detail-meta';
    meta.textContent = isDiscovered
      ? `${ZONE_TYPE_NAME[zone.type]} · 推荐境界: ${zone.recommendedLevel}`
      : '类型未知';

    titleBlock.appendChild(name);
    titleBlock.appendChild(meta);
    titleRow.appendChild(icon);
    titleRow.appendChild(titleBlock);
    main.appendChild(titleRow);

    const desc = document.createElement('div');
    desc.className = 'world-map-detail-desc';
    desc.textContent = isDiscovered ? zone.description : '这片区域尚未被探索，传闻中充满了危险与机遇……';
    main.appendChild(desc);

    if (isDiscovered && zone.specialRules && zone.specialRules.length > 0) {
      const rules = document.createElement('div');
      rules.className = 'world-map-detail-rules';
      for (const rule of zone.specialRules) {
        const tag = document.createElement('span');
        tag.className = 'world-map-rule-tag';
        tag.textContent = rule;
        rules.appendChild(tag);
      }
      main.appendChild(rules);
    }

    row.appendChild(main);

    // 操作区
    const actions = document.createElement('div');
    actions.className = 'world-map-detail-actions';

    if (canNavigate) {
      const navBtn = document.createElement('button');
      navBtn.className = 'world-map-navigate-btn';
      navBtn.textContent = '前往此处';
      navBtn.onclick = () => {
        const targetRoomId = zone.roomIds[0];
        this.onNavigate!(zoneId, targetRoomId);
        this.hide();
      };
      actions.appendChild(navBtn);
    } else if (isCurrent) {
      const badge = document.createElement('div');
      badge.className = 'world-map-status-badge world-map-status-current';
      badge.textContent = '◆ 当前位置';
      actions.appendChild(badge);
    } else if (!isDiscovered) {
      const badge = document.createElement('div');
      badge.className = 'world-map-status-badge world-map-status-unknown';
      badge.textContent = '？ 尚未探索';
      actions.appendChild(badge);
    }

    row.appendChild(actions);
    detailPanel.appendChild(row);
  }

  private getZoneColor(type: ZoneType, discovered: boolean): string {
    if (!discovered) return 'var(--paper-4)';
    const colors: Record<ZoneType, string> = {
      [ZoneType.TOWN]: 'var(--jade)',
      [ZoneType.CITY]: 'var(--azure)',
      [ZoneType.WILD]: '#c47a3a',
      [ZoneType.DUNGEON]: 'var(--crimson)',
      [ZoneType.RUIN]: 'var(--violet)',
      [ZoneType.PORTAL]: '#5ab8b0',
    };
    return colors[type] || 'var(--paper-4)';
  }

  show(): void {
    if (!this.container) this.createUI();
    if (this.container) {
      this.container.classList.add('visible');
      this.visible = true;
      this.renderMap();
    }
  }

  hide(): void {
    if (this.container) {
      this.container.classList.remove('visible');
      this.visible = false;
    }
  }

  toggle(): void {
    if (this.visible) this.hide();
    else this.show();
  }

  isVisible(): boolean {
    return this.visible;
  }

  updatePlayer(player: IPlayer): void {
    this.player = player;
    if (this.visible) {
      this.renderMap();
    }
  }
}
