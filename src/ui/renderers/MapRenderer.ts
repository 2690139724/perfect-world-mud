import { World } from '../../domain/World';

export class MapRenderer {
  constructor(private container: HTMLElement) {}

  render(currentRoomId: string, world: World): void {
    const current = world.getRoom(currentRoomId);
    if (!current) {
      this.container.innerHTML = '<span class="map-empty">你迷失在未知之地。</span>';
      return;
    }

    const neighbors = world.getNeighbors(currentRoomId, 2);
    const htmlParts: string[] = [];

    // 当前房间（大号突出显示）
    htmlParts.push(`<div class="map-current-room">★ ${current.name}</div>`);

    // 出口列表（按目标房间去重合并）
    const exits = current.exits;
    if (exits.length === 0) {
      htmlParts.push('<div class="map-no-exits">此地没有出口。</div>');
    } else {
      // 按 targetId 分组去重
      const grouped = new Map<string, { directions: string[]; target: typeof exits[0] }>();
      for (const exit of exits) {
        const key = exit.targetId || exit.direction;
        if (!grouped.has(key)) {
          grouped.set(key, { directions: [], target: exit });
        }
        grouped.get(key)!.directions.push(exit.direction);
      }

      htmlParts.push('<div class="map-exits">');
      for (const [, group] of grouped) {
        const exit = group.target;
        const dirs = group.directions;
        const target = exit.targetId ? world.getRoom(exit.targetId) : null;
        const name = target ? target.name : (exit.isHidden ? '???' : '未探索的路径');
        const visited = target?.visited;
        const condition = exit.condition ? ` <span class="map-condition">[${exit.condition}]</span>` : '';
        const hidden = exit.isHidden ? ' <span class="map-hidden">[?]</span>' : '';

        // 已探索/未探索标记
        let statusClass = 'map-unvisited';
        let statusText = '未探索';
        if (visited) {
          statusClass = 'map-visited';
          statusText = '已探索';
        }

        // 多个方向时合并显示
        const dirHtml = dirs.map(d => `<span class="map-dir">${d}</span>`).join(' ');

        htmlParts.push(
          `<div class="map-exit ${statusClass}" data-exit-dir="${dirs[0]}">` +
            dirHtml +
            `<span class="map-arrow">→</span>` +
            `<span class="map-name">${name}</span>` +
            `<span class="map-status">${statusText}</span>` +
            `${condition}${hidden}` +
          `</div>`
        );
      }
      htmlParts.push('</div>');
    }

    // 邻近区域
    if (neighbors.length > 0) {
      htmlParts.push('<div class="map-divider"></div>');
      htmlParts.push('<div class="map-nearby">');
      const zoneNames = new Set<string>();
      for (const room of neighbors) {
        if (room.id !== currentRoomId) {
          const zone = world.getZoneByRoomId(room.id);
          if (zone) zoneNames.add(zone.name);
        }
      }
      if (zoneNames.size > 0) {
        htmlParts.push(`<span class="map-nearby-label">邻近</span>`);
        htmlParts.push(Array.from(zoneNames).map(z => `<span class="map-zone-tag">${z}</span>`).join(''));
      }
      htmlParts.push('</div>');
    }

    this.container.innerHTML = htmlParts.join('');
  }
}