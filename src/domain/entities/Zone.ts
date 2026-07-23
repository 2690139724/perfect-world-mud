export enum ZoneType {
  TOWN = 'town',
  WILD = 'wild',
  DUNGEON = 'dungeon',
  CITY = 'city',
  RUIN = 'ruin',
  PORTAL = 'portal',
}

export interface IZoneEntrance {
  direction: string;
  targetZoneId: string;
  targetRoomId: string;
  condition?: string;
}

export interface IZone {
  id: string;
  name: string;
  type: ZoneType;
  description: string;
  roomIds: string[];
  entrances: IZoneEntrance[];
  recommendedLevel: number;
  fullyExplored: boolean;
  specialRules?: string[];
  discovered: boolean;
  discoveryTime?: number;
}