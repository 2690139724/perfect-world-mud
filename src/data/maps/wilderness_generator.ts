import { IZone, ZoneType } from '../../domain/entities/Zone';
import { IRoom, TerrainType } from '../../domain/entities/Room';
import { TerrainDefinition, getTerrainById } from './wilderness_terrain_definitions';

export interface WildernessConfig {
  id: string;
  name: string;
  description: string;
  terrainIds: string[];
  entranceZoneId?: string;
  entranceRoomId?: string;
  recommendedLevel?: number;
}

export interface GeneratedWilderness {
  zones: IZone[];
  rooms: IRoom[];
}

export class WildernessGenerator {
  private config: WildernessConfig;
  private terrains: TerrainDefinition[] = [];
  
  constructor(config: WildernessConfig) {
    this.config = config;
    this.terrains = config.terrainIds.map(id => getTerrainById(id)).filter(Boolean) as TerrainDefinition[];
  }
  
  generate(): GeneratedWilderness {
    const zones = this.generateZones();
    const rooms = this.generateRooms();
    
    return { zones, rooms };
  }
  
  private generateZones(): IZone[] {
    const zones: IZone[] = [];
    
    const mainZone: IZone = {
      id: this.config.id,
      name: this.config.name,
      type: ZoneType.WILD,
      description: this.config.description,
      roomIds: this.generateRoomIds(),
      entrances: this.generateEntrances(),
      recommendedLevel: this.config.recommendedLevel || this.getMaxDangerLevel(),
      fullyExplored: false,
      specialRules: this.generateSpecialRules(),
      discovered: false,
    };
    
    zones.push(mainZone);
    
    return zones;
  }
  
  private generateRoomIds(): string[] {
    const prefix = this.config.id;
    const roomIds: string[] = [];
    
    this.terrains.forEach((terrain, index) => {
      roomIds.push(`${prefix}_${terrain.id}_entrance`);
      roomIds.push(`${prefix}_${terrain.id}_center`);
      roomIds.push(`${prefix}_${terrain.id}_deep`);
      
      if (index < this.terrains.length - 1) {
        roomIds.push(`${prefix}_transition_${index}`);
      }
    });
    
    return roomIds;
  }
  
  private generateEntrances() {
    const entrances = [];
    
    if (this.config.entranceZoneId && this.config.entranceRoomId) {
      entrances.push({
        direction: '内',
        targetZoneId: this.config.entranceZoneId,
        targetRoomId: this.config.entranceRoomId,
      });
    }
    
    return entrances;
  }
  
  private getMaxDangerLevel(): number {
    return Math.max(...this.terrains.map(t => t.dangerLevelNum));
  }
  
  private generateSpecialRules(): string[] {
    const rules: string[] = [];
    
    this.terrains.forEach(terrain => {
      rules.push(terrain.name);
      if (terrain.dangerLevel === 'extreme') {
        rules.push('极高危险');
      }
    });
    
    return rules;
  }
  
  private generateRooms(): IRoom[] {
    const prefix = this.config.id;
    const rooms: IRoom[] = [];
    
    this.terrains.forEach((terrain, index) => {
      const entranceRoom = this.createTerrainRoom(
        `${prefix}_${terrain.id}_entrance`,
        `${terrain.name}入口`,
        terrain,
        'entrance',
        index
      );
      rooms.push(entranceRoom);
      
      const centerRoom = this.createTerrainRoom(
        `${prefix}_${terrain.id}_center`,
        `${terrain.name}腹地`,
        terrain,
        'center',
        index
      );
      rooms.push(centerRoom);
      
      const deepRoom = this.createTerrainRoom(
        `${prefix}_${terrain.id}_deep`,
        `${terrain.name}深处`,
        terrain,
        'deep',
        index
      );
      rooms.push(deepRoom);
      
      if (index < this.terrains.length - 1) {
        const transitionRoom = this.createTransitionRoom(
          `${prefix}_transition_${index}`,
          this.terrains[index],
          this.terrains[index + 1],
          index
        );
        rooms.push(transitionRoom);
      }
    });
    
    this.connectRooms(rooms);
    
    return rooms;
  }
  
  private createTerrainRoom(
    id: string,
    name: string,
    terrain: TerrainDefinition,
    type: 'entrance' | 'center' | 'deep',
    terrainIndex: number
  ): IRoom {
    const terrainTypeMap: Record<string, TerrainType> = {
      'mountain': TerrainType.MOUNTAIN,
      'plain': TerrainType.PLAIN,
      'forest': TerrainType.FOREST,
      'water': TerrainType.WATER,
      'arid': TerrainType.DESERT,
      'special': TerrainType.RUIN,
    };
    
    const spiritMultiplier = type === 'entrance' ? 0.6 : type === 'center' ? 1 : 1.4;
    const spiritDensity = Math.round(terrain.spiritDensity * spiritMultiplier);
    
    const description = this.generateRoomDescription(terrain, type);
    
    return {
      id,
      name,
      description,
      terrain: terrainTypeMap[terrain.category] || TerrainType.PLAIN,
      spiritDensity,
      exits: [],
      monsters: this.generateMonsters(terrain, type),
      resources: this.generateResources(terrain, type),
      npcs: this.generateNPCs(terrain, type),
      isSafeZone: type === 'entrance' && terrain.dangerLevel === 'low',
      visited: false,
      firstVisited: 0,
      dynamicEvents: terrain.possibleEvents.map(e => e.id),
      zoneId: this.config.id,
      details: this.generateDetails(terrain),
    };
  }
  
  private createTransitionRoom(
    id: string,
    fromTerrain: TerrainDefinition,
    toTerrain: TerrainDefinition,
    index: number
  ): IRoom {
    const avgSpiritDensity = Math.round((fromTerrain.spiritDensity + toTerrain.spiritDensity) / 2);
    
    return {
      id,
      name: `${fromTerrain.name}与${toTerrain.name}过渡带`,
      description: `从${fromTerrain.name}逐渐过渡到${toTerrain.name}的区域。${fromTerrain.name}的${fromTerrain.visualFeatures[0]}逐渐变为${toTerrain.name}的${toTerrain.visualFeatures[0]}，植被和地貌也随之变化。`,
      terrain: TerrainType.PLAIN,
      spiritDensity: avgSpiritDensity,
      exits: [],
      monsters: [],
      resources: [],
      npcs: [],
      isSafeZone: false,
      visited: false,
      firstVisited: 0,
      dynamicEvents: [],
      zoneId: this.config.id,
    };
  }
  
  private generateRoomDescription(terrain: TerrainDefinition, type: 'entrance' | 'center' | 'deep'): string {
    const visualFeatures = terrain.visualFeatures.join('，');
    
    if (type === 'entrance') {
      return `${terrain.name}入口区域。${visualFeatures}。这里相对安全，适合初入此地的修士探索。`;
    } else if (type === 'center') {
      return `${terrain.name}腹地。${visualFeatures}。灵气逐渐浓郁，凶兽活动增多。`;
    } else {
      return `${terrain.name}深处。${visualFeatures}。灵气最为浓郁，但也最为危险，高阶凶兽出没频繁。`;
    }
  }
  
  private generateMonsters(terrain: TerrainDefinition, type: 'entrance' | 'center' | 'deep') {
    if (type === 'entrance') {
      return terrain.monsters.filter(m => m.level <= 2).map(m => ({
        monsterId: m.id,
        minCount: 1,
        maxCount: 3,
        spawnWeight: m.spawnWeight,
        respawnTime: 300,
      }));
    } else if (type === 'center') {
      return terrain.monsters.filter(m => m.level >= 2 && m.level <= 5).map(m => ({
        monsterId: m.id,
        minCount: 2,
        maxCount: 5,
        spawnWeight: m.spawnWeight,
        respawnTime: 400,
      }));
    } else {
      return terrain.monsters.filter(m => m.level >= 4).map(m => ({
        monsterId: m.id,
        minCount: 3,
        maxCount: 8,
        spawnWeight: m.spawnWeight,
        respawnTime: 500,
      }));
    }
  }
  
  private generateResources(terrain: TerrainDefinition, type: 'entrance' | 'center' | 'deep') {
    if (type === 'entrance') {
      return terrain.resourceOutputs.filter(r => r.harvestDifficulty <= 3).map(r => ({
        resourceId: r.id,
        amount: Math.max(1, Math.round(r.amount * 0.5)),
        respawnTime: r.respawnTime,
        harvestDifficulty: r.harvestDifficulty,
      }));
    } else if (type === 'center') {
      return terrain.resourceOutputs.filter(r => r.harvestDifficulty >= 3 && r.harvestDifficulty <= 8).map(r => ({
        resourceId: r.id,
        amount: r.amount,
        respawnTime: r.respawnTime,
        harvestDifficulty: r.harvestDifficulty,
      }));
    } else {
      return terrain.resourceOutputs.filter(r => r.harvestDifficulty >= 6).map(r => ({
        resourceId: r.id,
        amount: Math.round(r.amount * 1.5),
        respawnTime: Math.round(r.respawnTime * 1.5),
        harvestDifficulty: r.harvestDifficulty,
      }));
    }
  }
  
  private generateNPCs(terrain: TerrainDefinition, type: 'entrance' | 'center' | 'deep'): string[] {
    const npcs: string[] = [];
    
    if (type === 'entrance') {
      npcs.push('hunter');
      npcs.push('traveler');
    } else if (type === 'center') {
      npcs.push('herbalist');
      npcs.push('adventurer');
    } else {
      npcs.push('explorer');
    }
    
    return npcs;
  }
  
  private generateDetails(terrain: TerrainDefinition) {
    return terrain.cultivationElements.slice(0, 3).map((el, index) => ({
      id: `${terrain.id}_detail_${index}`,
      name: `修仙元素${index + 1}`,
      description: el,
      type: 'environment' as const,
    }));
  }
  
  private connectRooms(rooms: IRoom[]) {
    const prefix = this.config.id;
    
    this.terrains.forEach((terrain, index) => {
      const entranceRoom = rooms.find(r => r.id === `${prefix}_${terrain.id}_entrance`);
      const centerRoom = rooms.find(r => r.id === `${prefix}_${terrain.id}_center`);
      const deepRoom = rooms.find(r => r.id === `${prefix}_${terrain.id}_deep`);
      
      if (entranceRoom && centerRoom) {
        entranceRoom.exits.push({
          direction: '内',
          targetId: centerRoom.id,
          targetZoneId: this.config.id,
          isHidden: false,
          travelCost: 5,
        });
        centerRoom.exits.push({
          direction: '外',
          targetId: entranceRoom.id,
          targetZoneId: this.config.id,
          isHidden: false,
          travelCost: 5,
        });
      }
      
      if (centerRoom && deepRoom) {
        centerRoom.exits.push({
          direction: '深',
          targetId: deepRoom.id,
          targetZoneId: this.config.id,
          isHidden: false,
          travelCost: 8,
        });
        deepRoom.exits.push({
          direction: '浅',
          targetId: centerRoom.id,
          targetZoneId: this.config.id,
          isHidden: false,
          travelCost: 8,
        });
      }
      
      if (index < this.terrains.length - 1) {
        const nextTerrain = this.terrains[index + 1];
        const transitionRoom = rooms.find(r => r.id === `${prefix}_transition_${index}`);
        const currentDeep = rooms.find(r => r.id === `${prefix}_${terrain.id}_deep`);
        const nextEntrance = rooms.find(r => r.id === `${prefix}_${nextTerrain.id}_entrance`);
        
        if (currentDeep && transitionRoom) {
          currentDeep.exits.push({
            direction: '过渡',
            targetId: transitionRoom.id,
            targetZoneId: this.config.id,
            isHidden: false,
            travelCost: 6,
          });
          transitionRoom.exits.push({
            direction: '返回',
            targetId: currentDeep.id,
            targetZoneId: this.config.id,
            isHidden: false,
            travelCost: 6,
          });
        }
        
        if (transitionRoom && nextEntrance) {
          transitionRoom.exits.push({
            direction: '进入',
            targetId: nextEntrance.id,
            targetZoneId: this.config.id,
            isHidden: false,
            travelCost: 6,
          });
          nextEntrance.exits.push({
            direction: '返回',
            targetId: transitionRoom.id,
            targetZoneId: this.config.id,
            isHidden: false,
            travelCost: 6,
          });
        }
      }
    });
    
    const firstEntrance = rooms.find(r => r.id === `${prefix}_${this.terrains[0].id}_entrance`);
    if (firstEntrance && this.config.entranceZoneId) {
      firstEntrance.exits.push({
        direction: '回城',
        targetId: null,
        targetZoneId: this.config.entranceZoneId,
        targetRoomId: this.config.entranceRoomId,
        isHidden: false,
        travelCost: 10,
      });
    }
  }
}

export function generateWilderness(config: WildernessConfig): GeneratedWilderness {
  const generator = new WildernessGenerator(config);
  return generator.generate();
}
