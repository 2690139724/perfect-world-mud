import { WorldId } from '../../domain/entities/WorldDefinition';
import { IZone } from '../../domain/entities/Zone';
import { IRoom } from '../../domain/entities/Room';

const loadedMaps = new Set<WorldId>();
const zoneMap = new Map<string, IZone>();
const roomMap = new Map<string, IRoom>();

const worldMapLoaders: Record<WorldId, (() => Promise<void>) | null> = {
  [WorldId.PERFECT_WORLD]: null,
  [WorldId.ZHE_TIAN]: () => import('./map_data_zhetian').then(m => {
    m.ZHETIAN_ZONES.forEach(z => zoneMap.set(z.id, z));
    m.ZHETIAN_ROOMS.forEach(r => roomMap.set(r.id, r));
  }),
  [WorldId.SHENG_XU]: () => import('./map_data_shengxu').then(m => {
    m.SHENGXU_ZONES.forEach(z => zoneMap.set(z.id, z));
    m.SHENGXU_ROOMS.forEach(r => roomMap.set(r.id, r));
  }),
  [WorldId.DOU_PO]: () => import('./map_data_doupo').then(m => {
    m.DOUPO_ZONES.forEach(z => zoneMap.set(z.id, z));
    m.DOUPO_ROOMS.forEach(r => roomMap.set(r.id, r));
  }),
  [WorldId.SHEN_MU]: () => import('./map_data_shenmu').then(m => {
    m.SHENMU_ZONES.forEach(z => zoneMap.set(z.id, z));
    m.SHENMU_ROOMS.forEach(r => roomMap.set(r.id, r));
  }),
  [WorldId.FAN_REN]: () => import('./map_data_fanren').then(m => {
    m.FANREN_ZONES.forEach(z => zoneMap.set(z.id, z));
    m.FANREN_ROOMS.forEach(r => roomMap.set(r.id, r));
  }),
  [WorldId.XIAN_NI]: () => import('./map_data_xianni').then(m => {
    m.XIANNI_ZONES.forEach(z => zoneMap.set(z.id, z));
    m.XIANNI_ROOMS.forEach(r => roomMap.set(r.id, r));
  }),
};

export async function loadWorldMaps(worldId: WorldId): Promise<void> {
  if (loadedMaps.has(worldId)) return;
  const loader = worldMapLoaders[worldId];
  if (!loader) {
    loadedMaps.add(worldId);
    return;
  }
  await loader();
  loadedMaps.add(worldId);
}

export function isWorldMapsLoaded(worldId: WorldId): boolean {
  return loadedMaps.has(worldId);
}

export function registerZone(zone: IZone): void {
  zoneMap.set(zone.id, zone);
}

export function registerRoom(room: IRoom): void {
  roomMap.set(room.id, room);
}

export function getZoneById(id: string): IZone | undefined {
  return zoneMap.get(id);
}

export function getRoomById(id: string): IRoom | undefined {
  return roomMap.get(id);
}

export function getZoneByIdOrThrow(id: string): IZone {
  const zone = zoneMap.get(id);
  if (!zone) throw new Error(`Zone not found: ${id}`);
  return zone;
}

export function getRoomByIdOrThrow(id: string): IRoom {
  const room = roomMap.get(id);
  if (!room) throw new Error(`Room not found: ${id}`);
  return room;
}

export function getAllZones(): IZone[] {
  return Array.from(zoneMap.values());
}

export function getAllRooms(): IRoom[] {
  return Array.from(roomMap.values());
}
