export enum TerrainType {
  PLAIN = '平原',
  FOREST = '密林',
  MOUNTAIN = '山脉',
  SWAMP = '沼泽',
  DESERT = '荒漠',
  VOLCANO = '火山',
  RUIN = '废墟',
  CAVE = '洞穴',
  WATER = '水域',
  SNOW = '雪原',
  SPECIAL = '特殊',
}

export interface IExit {
  direction: string;
  targetId: string | null;
  targetZoneId?: string;
  targetRoomId?: string;
  condition?: string;
  isHidden: boolean;
  travelCost: number;
}

export interface IMonsterSpawn {
  monsterId: string;
  minCount: number;
  maxCount: number;
  spawnWeight: number;
  respawnTime: number;
}

export interface IResourceNode {
  resourceId: string;
  amount: number;
  respawnTime: number;
  harvestDifficulty: number;
}

export interface IRoomDetail {
  id: string;
  name: string;
  description: string;
  type: 'environment' | 'interactive' | 'secret' | 'lore';
  hint?: string;
  interactable?: boolean;
  interactionResult?: string;
  rewardItemId?: string;
  rewardAmount?: number;
  shopId?: string;
  requiredRealm?: number;
  explored?: boolean;
}

export interface IRoom {
  id: string;
  name: string;
  description: string;
  terrain: TerrainType;
  spiritDensity: number;
  exits: IExit[];
  monsters: IMonsterSpawn[];
  resources: IResourceNode[];
  npcs: string[];  // NPC ID 列表
  isSafeZone: boolean;
  visited: boolean;
  firstVisited: number;
  dynamicEvents: string[];
  zoneId: string;
  details?: IRoomDetail[];
}