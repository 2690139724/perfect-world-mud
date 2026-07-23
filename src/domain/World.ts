import { IRoom } from './entities/Room';
import { IZone, ZoneType } from './entities/Zone';
import { RoomGenerator } from './services/RoomGenerator';
import { SeedRandom } from '../infrastructure/random/SeedRandom';
import { ZoneBlueprintDB } from '../data/blueprints/BlueprintDB';
import { IZoneBlueprint } from '../data/blueprints/BlueprintDB';

export class World {
  private zones: Map<string, IZone> = new Map();
  private rooms: Map<string, IRoom> = new Map();
  private generator: RoomGenerator;
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
    this.generator = new RoomGenerator(new SeedRandom(seed));
    this.loadBlueprints();
  }

  getSeed(): number { return this.seed; }
  getZone(id: string): IZone | undefined { return this.zones.get(id); }
  getRoom(id: string): IRoom | undefined { return this.rooms.get(id); }
  getAllZones(): IZone[] { return Array.from(this.zones.values()); }
  getAllRooms(): IRoom[] { return Array.from(this.rooms.values()); }

  private loadBlueprints(): void {
    const blueprints = ZoneBlueprintDB.getAll();
    for (const bp of blueprints) {
      this.buildZoneFromBlueprint(bp);
    }
  }

  private buildZoneFromBlueprint(blueprint: IZoneBlueprint): void {
    const zone: IZone = {
      id: blueprint.id,
      name: blueprint.name,
      type: blueprint.type as any,
      description: blueprint.description,
      roomIds: [],
      entrances: blueprint.entrances || [],
      recommendedLevel: blueprint.recommendedLevel || 0,
      fullyExplored: false,
      specialRules: blueprint.specialRules,
      discovered: false,
    };

    for (const roomBp of blueprint.rooms) {
      const room: IRoom = {
        ...roomBp,
        npcs: roomBp.npcs || [],
        visited: false,
        firstVisited: 0,
        dynamicEvents: [],
        zoneId: zone.id,
      };
      this.rooms.set(room.id, room);
      zone.roomIds.push(room.id);
    }

    // 处理跨区域出口
    for (const entrance of zone.entrances) {
      const room = this.rooms.get(entrance.targetRoomId);
      if (room) {
        room.exits.push({
          direction: entrance.direction,
          targetId: entrance.targetRoomId,
          condition: entrance.condition,
          isHidden: false,
          travelCost: 0,
        });
      }
    }

    this.zones.set(zone.id, zone);
  }

  public generateWildZone(zoneId: string, size: number, depth: number): IZone {
    const zone: IZone = {
      id: zoneId,
      name: `荒野-${zoneId}`,
      type: ZoneType.WILD,
      description: '一片广阔无垠的蛮荒之地。',
      roomIds: [],
      entrances: [],
      recommendedLevel: Math.floor(depth / 10),
      fullyExplored: false,
      discovered: false,
    };

    for (let i = 0; i < size; i++) {
      const roomId = `${zoneId}_room_${i}`;
      const room = this.generator.generateRoom(roomId, depth + i);
      room.zoneId = zoneId;
      this.rooms.set(room.id, room);
      zone.roomIds.push(room.id);
    }

    this.connectRoomsInZone(zone);
    this.zones.set(zone.id, zone);
    return zone;
  }

  private connectRoomsInZone(zone: IZone): void {
    const ids = zone.roomIds;
    if (ids.length <= 1) return;

    // 构建主线路径
    for (let i = 0; i < ids.length - 1; i++) {
      const roomA = this.rooms.get(ids[i]);
      const roomB = this.rooms.get(ids[i + 1]);
      if (roomA && roomB) {
        roomA.exits.push({
          direction: this.randomDirection(),
          targetId: roomB.id,
          condition: undefined,
          isHidden: false,
          travelCost: 0,
        });
        roomB.exits.push({
          direction: this.randomDirection(),
          targetId: roomA.id,
          condition: undefined,
          isHidden: false,
          travelCost: 0,
        });
      }
    }

    // 添加额外连接（保证图稀疏但连通）
    const extraConnections = Math.floor(ids.length * 0.1);
    for (let i = 0; i < extraConnections; i++) {
      const idxA = Math.floor(Math.random() * ids.length);
      let idxB = Math.floor(Math.random() * ids.length);
      while (idxB === idxA) idxB = Math.floor(Math.random() * ids.length);
      const roomA = this.rooms.get(ids[idxA]);
      const roomB = this.rooms.get(ids[idxB]);
      if (roomA && roomB) {
        roomA.exits.push({
          direction: this.randomDirection(),
          targetId: roomB.id,
          condition: undefined,
          isHidden: true,
          travelCost: 0,
        });
        roomB.exits.push({
          direction: this.randomDirection(),
          targetId: roomA.id,
          condition: undefined,
          isHidden: true,
          travelCost: 0,
        });
      }
    }
  }

  private randomDirection(): string {
    const dirs = ['北', '南', '东', '西', '东北', '西北', '东南', '西南'];
    return dirs[Math.floor(Math.random() * dirs.length)];
  }

  public getOrGenerateRoom(roomId: string, parentRoomId?: string): IRoom {
    if (this.rooms.has(roomId)) return this.rooms.get(roomId)!;
    if (roomId.startsWith('wild_')) {
      const parent = parentRoomId ? this.rooms.get(parentRoomId) : undefined;
      const depth = this.calcDepth(parentRoomId);
      const newRoom = this.generator.generateRoom(roomId, depth, parent);
      const zoneId = parent?.zoneId || 'wasteland';
      newRoom.zoneId = zoneId;
      this.rooms.set(roomId, newRoom);
      const zone = this.zones.get(zoneId);
      if (zone) zone.roomIds.push(roomId);
      return newRoom;
    }
    throw new Error(`房间 ${roomId} 不存在且无法生成。`);
  }

  private calcDepth(roomId?: string): number {
    if (!roomId) return 0;
    return 0;
  }

  public getZoneByRoomId(roomId: string): IZone | undefined {
    const room = this.rooms.get(roomId);
    if (!room) return undefined;
    return this.zones.get(room.zoneId);
  }

  public getNeighbors(roomId: string, depth: number = 2): IRoom[] {
    const result: IRoom[] = [];
    const visited = new Set<string>();
    const queue: { id: string; d: number }[] = [{ id: roomId, d: 0 }];
    while (queue.length > 0) {
      const { id, d } = queue.shift()!;
      if (d > depth || visited.has(id)) continue;
      visited.add(id);
      const room = this.rooms.get(id);
      if (!room) continue;
      result.push(room);
      for (const exit of room.exits) {
        if (exit.targetId && !visited.has(exit.targetId)) {
          queue.push({ id: exit.targetId, d: d + 1 });
        }
      }
    }
    return result;
  }

  public getExploredZones(): IZone[] {
    return Array.from(this.zones.values()).filter(z => z.discovered);
  }

  public getZoneExplorationProgress(zoneId: string): number {
    const zone = this.zones.get(zoneId);
    if (!zone) return 0;
    const total = zone.roomIds.length;
    if (total === 0) return 0;
    const visited = zone.roomIds.filter(id => {
      const room = this.rooms.get(id);
      return room?.visited;
    }).length;
    return Math.round((visited / total) * 100);
  }
}