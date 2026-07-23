import { IZone } from '../../domain/entities/Zone';
import { IRoom } from '../../domain/entities/Room';
import { PERFECT_ZONES, PERFECT_ROOMS } from './map_data_perfect';
import { ZHETIAN_ZONES, ZHETIAN_ROOMS } from './map_data_zhetian';
import { SHENGXU_ZONES, SHENGXU_ROOMS } from './map_data_shengxu';
import { DOUPO_ZONES, DOUPO_ROOMS } from './map_data_doupo';
import { SHENMU_ZONES, SHENMU_ROOMS } from './map_data_shenmu';
import { FANREN_ZONES, FANREN_ROOMS } from './map_data_fanren';
import { XIANNI_ZONES, XIANNI_ROOMS } from './map_data_xianni';
import { QINGSHI_ZONE, QINGSHI_ROOMS } from './town_qing_shi';
import { STONE_NATION_ZONES, STONE_NATION_ROOMS } from './capital_stone_nation';
import { MISTY_MOUNTAINS_ZONE, MISTY_MOUNTAINS_ROOMS } from './wilderness_misty_mountains';
import { WASTELAND_ZONE, WASTELAND_ROOMS } from './wilderness_wasteland';
import { GREEN_MOUNTAIN_ZONE, GREEN_MOUNTAIN_ROOMS } from './wilderness_green_mountain';
import { DESERT_ZONE, DESERT_ROOMS } from './wilderness_desert';
import { VOLCANIC_ZONE, VOLCANIC_ROOMS } from './wilderness_volcanic';
import { LAKE_ZONE, LAKE_ROOMS } from './wilderness_lake';

export const ALL_ZONES: IZone[] = [
  ...PERFECT_ZONES,
  ...ZHETIAN_ZONES,
  ...SHENGXU_ZONES,
  ...DOUPO_ZONES,
  ...SHENMU_ZONES,
  ...FANREN_ZONES,
  ...XIANNI_ZONES,
  QINGSHI_ZONE,
  ...STONE_NATION_ZONES,
  MISTY_MOUNTAINS_ZONE,
  WASTELAND_ZONE,
  GREEN_MOUNTAIN_ZONE,
  DESERT_ZONE,
  VOLCANIC_ZONE,
  LAKE_ZONE,
];

export const ALL_ROOMS: IRoom[] = [
  ...PERFECT_ROOMS,
  ...ZHETIAN_ROOMS,
  ...SHENGXU_ROOMS,
  ...DOUPO_ROOMS,
  ...SHENMU_ROOMS,
  ...FANREN_ROOMS,
  ...XIANNI_ROOMS,
  ...QINGSHI_ROOMS,
  ...STONE_NATION_ROOMS,
  ...MISTY_MOUNTAINS_ROOMS,
  ...WASTELAND_ROOMS,
  ...GREEN_MOUNTAIN_ROOMS,
  ...DESERT_ROOMS,
  ...VOLCANIC_ROOMS,
  ...LAKE_ROOMS,
];

export const ZONES_MAP: Map<string, IZone> = new Map(ALL_ZONES.map(zone => [zone.id, zone]));

export const ROOMS_MAP: Map<string, IRoom> = new Map(ALL_ROOMS.map(room => [room.id, room]));

export function getZoneById(id: string): IZone | undefined {
  return ZONES_MAP.get(id);
}

export function getRoomById(id: string): IRoom | undefined {
  return ROOMS_MAP.get(id);
}

export function getZoneByIdOrThrow(id: string): IZone {
  const zone = ZONES_MAP.get(id);
  if (!zone) throw new Error(`Zone not found: ${id}`);
  return zone;
}

export function getRoomByIdOrThrow(id: string): IRoom {
  const room = ROOMS_MAP.get(id);
  if (!room) throw new Error(`Room not found: ${id}`);
  return room;
}

export { PERFECT_ZONES, PERFECT_ROOMS } from './map_data_perfect';
export { ZHETIAN_ZONES, ZHETIAN_ROOMS } from './map_data_zhetian';
export { SHENGXU_ZONES, SHENGXU_ROOMS } from './map_data_shengxu';
export { DOUPO_ZONES, DOUPO_ROOMS } from './map_data_doupo';
export { SHENMU_ZONES, SHENMU_ROOMS } from './map_data_shenmu';
export { FANREN_ZONES, FANREN_ROOMS } from './map_data_fanren';
export { XIANNI_ZONES, XIANNI_ROOMS } from './map_data_xianni';
export { QINGSHI_ZONE, QINGSHI_ROOMS } from './town_qing_shi';
export { BUILDING_DEFINITIONS, getBuildingById, getBuildingsByCategory } from './building_definitions';
export { TownGenerator, generateTown } from './town_generator';
export type { TownConfig, GeneratedTown } from './town_generator';
export { STONE_NATION_ZONES, STONE_NATION_ROOMS } from './capital_stone_nation';
export { CAPITAL_BUILDING_DEFINITIONS, getCapitalBuildingById, getCapitalBuildingsByTier, getCapitalBuildingsByCategory } from './capital_building_definitions';
export { CapitalGenerator, generateCapital } from './capital_generator';
export type { CapitalConfig, GeneratedCapital } from './capital_generator';
export { MISTY_MOUNTAINS_ZONE, MISTY_MOUNTAINS_ROOMS } from './wilderness_misty_mountains';
export { WASTELAND_ZONE, WASTELAND_ROOMS } from './wilderness_wasteland';
export { WILDERNESS_TERRAIN_DEFINITIONS, getTerrainById, getTerrainsByCategory, getTransitionTerrains } from './wilderness_terrain_definitions';
export { WildernessGenerator, generateWilderness } from './wilderness_generator';
export type { WildernessConfig, GeneratedWilderness } from './wilderness_generator';
export type { TerrainCategory, DangerLevel, TerrainResource, TerrainEvent, TerrainMonster, TerrainDefinition } from './wilderness_terrain_definitions';
export { GREEN_MOUNTAIN_ZONE, GREEN_MOUNTAIN_ROOMS } from './wilderness_green_mountain';
export { DESERT_ZONE, DESERT_ROOMS } from './wilderness_desert';
export { WILDERNESS_BUILDINGS, getWildernessBuildingById, getWildernessBuildingsByType } from './wilderness_building_definitions';
export type { WildernessBuilding } from './wilderness_building_definitions';
