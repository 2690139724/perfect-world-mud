import { TerrainType, IExit, IMonsterSpawn, IResourceNode, IRoomDetail } from '../../domain/entities/Room';

export interface IZoneBlueprint {
  id: string;
  name: string;
  type: 'town' | 'wild' | 'dungeon' | 'city' | 'ruin' | 'portal' | 'mountain';
  description: string;
  recommendedLevel?: number;
  entrances?: { direction: string; targetZoneId: string; targetRoomId: string; condition?: string }[];
  specialRules?: string[];
  rooms: IRoomBlueprint[];
}

export interface IRoomBlueprint {
  id: string;
  name: string;
  description: string;
  terrain: TerrainType;
  spiritDensity: number;
  exits: IExit[];
  monsters: IMonsterSpawn[];
  resources: IResourceNode[];
  npcs?: string[];  // NPC ID 列表
  isSafeZone: boolean;
  details?: IRoomDetail[];
}

export class ZoneBlueprintDB {
  private static blueprints: IZoneBlueprint[] = [];

  static register(bp: IZoneBlueprint): void {
    this.blueprints.push(bp);
  }

  static getAll(): IZoneBlueprint[] {
    return this.blueprints;
  }

  static get(id: string): IZoneBlueprint | undefined {
    return this.blueprints.find(bp => bp.id === id);
  }
}