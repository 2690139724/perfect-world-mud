import { IZone, ZoneType } from '../../domain/entities/Zone';
import { IRoom, TerrainType } from '../../domain/entities/Room';
import { BuildingDefinition, getBuildingById } from './building_definitions';

export interface TownConfig {
  id: string;
  name: string;
  owner: string;
  population: number;
  description: string;
  isBorderTown?: boolean;
  specialFeatures?: string[];
  spiritLevel?: number;
}

export interface GeneratedTown {
  zone: IZone;
  rooms: IRoom[];
}

export class TownGenerator {
  private config: TownConfig;
  private buildings: BuildingDefinition[] = [];
  
  constructor(config: TownConfig) {
    this.config = config;
    this.buildings = this.selectBuildings();
  }
  
  private selectBuildings(): BuildingDefinition[] {
    const selected: BuildingDefinition[] = [];
    
    selected.push(getBuildingById('city_wall')!);
    selected.push(getBuildingById('city_gate')!);
    selected.push(getBuildingById('moat')!);
    selected.push(getBuildingById('main_street')!);
    selected.push(getBuildingById('secondary_street')!);
    selected.push(getBuildingById('town_hall')!);
    selected.push(getBuildingById('post_station')!);
    selected.push(getBuildingById('spirit_shrine')!);
    selected.push(getBuildingById('drum_tower')!);
    selected.push(getBuildingById('market')!);
    selected.push(getBuildingById('blacksmith_shop')!);
    selected.push(getBuildingById('pill_shop')!);
    selected.push(getBuildingById('material_shop')!);
    selected.push(getBuildingById('general_shop')!);
    selected.push(getBuildingById('restaurant')!);
    selected.push(getBuildingById('ordinary_house')!);
    selected.push(getBuildingById('wealthy_house')!);
    selected.push(getBuildingById('shop_house')!);
    selected.push(getBuildingById('public_well')!);
    selected.push(getBuildingById('mill')!);
    selected.push(getBuildingById('pawnshop')!);
    selected.push(getBuildingById('stage')!);
    selected.push(getBuildingById('goulan')!);
    selected.push(getBuildingById('stone_bridge')!);
    selected.push(getBuildingById('beast_station')!);
    selected.push(getBuildingById('spirit_torch')!);
    selected.push(getBuildingById('sound_transmission_array')!);
    selected.push(getBuildingById('spirit_test_stone')!);
    
    if (this.config.isBorderTown) {
      selected.push(getBuildingById('spirit_transmission_array')!);
    }
    
    return selected;
  }
  
  generate(): GeneratedTown {
    const zone = this.generateZone();
    const rooms = this.generateRooms();
    
    return { zone, rooms };
  }
  
  private generateZone(): IZone {
    const roomIds = this.generateRoomIds();
    
    return {
      id: this.config.id,
      name: this.config.name,
      type: ZoneType.CITY,
      description: this.config.description,
      roomIds,
      entrances: this.generateEntrances(),
      recommendedLevel: this.config.spiritLevel || 1,
      fullyExplored: false,
      specialRules: this.config.specialFeatures || ['灵石路灯照明', '灵兽车通行', '坊门遗迹'],
      discovered: true,
    };
  }
  
  private generateRoomIds(): string[] {
    const prefix = this.config.id;
    
    return [
      `${prefix}_gate_north`,
      `${prefix}_gate_south`,
      `${prefix}_gate_east`,
      `${prefix}_gate_west`,
      `${prefix}_main_street`,
      `${prefix}_cross_street`,
      `${prefix}_alley_east`,
      `${prefix}_alley_west`,
      `${prefix}_market`,
      `${prefix}_town_hall`,
      `${prefix}_post_station`,
      `${prefix}_spirit_shrine`,
      `${prefix}_drum_tower`,
      `${prefix}_blacksmith_street`,
      `${prefix}_pill_street`,
      `${prefix}_material_street`,
      `${prefix}_food_street`,
      `${prefix}_public_well`,
      `${prefix}_mill`,
      `${prefix}_pawnshop`,
      `${prefix}_stage`,
      `${prefix}_goulan`,
      `${prefix}_stone_bridge`,
      `${prefix}_beast_station`,
      `${prefix}_transmission_array`,
    ];
  }
  
  private generateEntrances() {
    return [
      { direction: '南', targetZoneId: `${this.config.id}_village`, targetRoomId: `${this.config.id}_village_center` },
      { direction: '北', targetZoneId: `${this.config.id}_capital`, targetRoomId: `${this.config.id}_capital_gate` },
      { direction: '东', targetZoneId: `${this.config.id}_wild_east`, targetRoomId: `${this.config.id}_wild_east_entrance` },
      { direction: '西', targetZoneId: `${this.config.id}_wild_west`, targetRoomId: `${this.config.id}_wild_west_entrance` },
    ];
  }
  
  private generateRooms(): IRoom[] {
    const prefix = this.config.id;
    const rooms: IRoom[] = [];
    
    rooms.push(this.createRoom(
      `${prefix}_gate_north`,
      '北门',
      this.getBuildingDescription('city_gate', '北'),
      TerrainType.PLAIN,
      3,
      [
        { direction: '南', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
        { direction: '北', targetId: null, targetZoneId: `${prefix}_capital`, targetRoomId: `${prefix}_capital_gate`, isHidden: false, travelCost: 15 },
      ],
      ['guard_north'],
      true,
      ['测灵石']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_gate_south`,
      '南门',
      this.getBuildingDescription('city_gate', '南'),
      TerrainType.PLAIN,
      3,
      [
        { direction: '北', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
        { direction: '南', targetId: null, targetZoneId: `${prefix}_village`, targetRoomId: `${prefix}_village_center`, isHidden: false, travelCost: 10 },
      ],
      ['guard_south'],
      true,
      ['测灵石']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_gate_east`,
      '东门',
      this.getBuildingDescription('city_gate', '东'),
      TerrainType.PLAIN,
      3,
      [
        { direction: '西', targetId: `${prefix}_cross_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
        { direction: '东', targetId: null, targetZoneId: `${prefix}_wild_east`, targetRoomId: `${prefix}_wild_east_entrance`, isHidden: false, travelCost: 12 },
      ],
      ['guard_east'],
      true,
      ['测灵石']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_gate_west`,
      '西门',
      this.getBuildingDescription('city_gate', '西'),
      TerrainType.PLAIN,
      3,
      [
        { direction: '东', targetId: `${prefix}_cross_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
        { direction: '西', targetId: null, targetZoneId: `${prefix}_wild_west`, targetRoomId: `${prefix}_wild_west_entrance`, isHidden: false, travelCost: 12 },
      ],
      ['guard_west'],
      true,
      ['测灵石']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_main_street`,
      '南北大街',
      this.getBuildingDescription('main_street'),
      TerrainType.PLAIN,
      5,
      [
        { direction: '北', targetId: `${prefix}_gate_north`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
        { direction: '南', targetId: `${prefix}_gate_south`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
        { direction: '东', targetId: `${prefix}_cross_street`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
        { direction: '西', targetId: `${prefix}_cross_street`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
        { direction: '东北', targetId: `${prefix}_town_hall`, targetZoneId: prefix, isHidden: false, travelCost: 3 },
        { direction: '西南', targetId: `${prefix}_market`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
      ],
      ['street_vendor', 'traveler'],
      false,
      ['灵石路灯']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_cross_street`,
      '东西横街',
      this.getBuildingDescription('secondary_street'),
      TerrainType.PLAIN,
      4,
      [
        { direction: '东', targetId: `${prefix}_gate_east`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
        { direction: '西', targetId: `${prefix}_gate_west`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
        { direction: '南', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
        { direction: '北', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
        { direction: '东南', targetId: `${prefix}_spirit_shrine`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
        { direction: '西北', targetId: `${prefix}_drum_tower`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
      ],
      ['street_vendor'],
      false,
      ['灵石路灯']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_market`,
      '市集广场',
      this.getBuildingDescription('market'),
      TerrainType.PLAIN,
      6,
      [
        { direction: '东北', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
        { direction: '东', targetId: `${prefix}_pill_street`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
        { direction: '西', targetId: `${prefix}_blacksmith_street`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
      ],
      ['market_merchant', 'story_teller', 'auctioneer'],
      false,
      ['传音阵']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_town_hall`,
      '镇公所',
      this.getBuildingDescription('town_hall'),
      TerrainType.PLAIN,
      4,
      [
        { direction: '西南', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 3 },
      ],
      ['magistrate', 'clerk'],
      true,
      ['明镜高悬']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_post_station`,
      '驿站',
      this.getBuildingDescription('post_station'),
      TerrainType.PLAIN,
      4,
      [
        { direction: '南', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
      ],
      ['station_master', 'messenger'],
      true,
      ['传信阵']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_spirit_shrine`,
      '祭灵祠',
      this.getBuildingDescription('spirit_shrine'),
      TerrainType.PLAIN,
      8,
      [
        { direction: '西北', targetId: `${prefix}_cross_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
      ],
      ['priest', 'devotee'],
      true,
      ['聚灵阵']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_drum_tower`,
      '鼓楼',
      this.getBuildingDescription('drum_tower'),
      TerrainType.PLAIN,
      3,
      [
        { direction: '东南', targetId: `${prefix}_cross_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
      ],
      [],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_blacksmith_street`,
      '炼器街',
      this.getBuildingDescription('blacksmith_shop', '街'),
      TerrainType.PLAIN,
      5,
      [
        { direction: '东', targetId: `${prefix}_market`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
      ],
      ['blacksmith', 'apprentice'],
      false,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_pill_street`,
      '丹药街',
      this.getBuildingDescription('pill_shop', '街'),
      TerrainType.PLAIN,
      6,
      [
        { direction: '西', targetId: `${prefix}_market`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
      ],
      ['alchemist', 'herbalist'],
      false,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_material_street`,
      '灵材街',
      this.getBuildingDescription('material_shop', '街'),
      TerrainType.PLAIN,
      5,
      [
        { direction: '北', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
      ],
      ['material_merchant'],
      false,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_food_street`,
      '食肆街',
      this.getBuildingDescription('restaurant', '街'),
      TerrainType.PLAIN,
      5,
      [
        { direction: '南', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
      ],
      ['chef', 'waiter'],
      false,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_alley_east`,
      '永宁坊',
      '城东居民区，巷道纵横交错，青石板路蜿蜒。坊内有富户宅邸与普通民居，生活气息浓厚。',
      TerrainType.PLAIN,
      3,
      [
        { direction: '西', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
      ],
      ['resident', 'shopkeeper'],
      true,
      ['公共水井']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_alley_west`,
      '归德坊',
      '城西居民区，巷道较窄，多为土坯墙民居。坊内设有磨坊和当铺，生活便利。',
      TerrainType.PLAIN,
      3,
      [
        { direction: '东', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
      ],
      ['mill_worker', 'pawnbroker'],
      true,
      ['公共水井', '磨坊']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_public_well`,
      '公用水井',
      this.getBuildingDescription('public_well'),
      TerrainType.PLAIN,
      3,
      [
        { direction: '北', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
      ],
      [],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_mill`,
      '磨坊',
      this.getBuildingDescription('mill'),
      TerrainType.PLAIN,
      3,
      [
        { direction: '东', targetId: `${prefix}_alley_west`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
      ],
      ['mill_owner'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_pawnshop`,
      '当铺',
      this.getBuildingDescription('pawnshop'),
      TerrainType.PLAIN,
      4,
      [
        { direction: '东', targetId: `${prefix}_main_street`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
      ],
      ['pawnbroker'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_stage`,
      '戏台',
      this.getBuildingDescription('stage'),
      TerrainType.PLAIN,
      4,
      [
        { direction: '北', targetId: `${prefix}_market`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
      ],
      ['actor', 'musician'],
      false,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_goulan`,
      '勾栏瓦舍',
      this.getBuildingDescription('goulan'),
      TerrainType.PLAIN,
      4,
      [
        { direction: '南', targetId: `${prefix}_market`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
      ],
      ['storyteller', 'acrobat'],
      false,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_stone_bridge`,
      '石桥',
      this.getBuildingDescription('stone_bridge'),
      TerrainType.WATER,
      3,
      [
        { direction: '南', targetId: `${prefix}_gate_south`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
      ],
      [],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_beast_station`,
      '兽车站',
      this.getBuildingDescription('beast_station'),
      TerrainType.PLAIN,
      3,
      [
        { direction: '北', targetId: `${prefix}_gate_north`, targetZoneId: prefix, isHidden: false, travelCost: 2 },
      ],
      ['beast_driver'],
      true,
      []
    ));
    
    if (this.config.isBorderTown) {
      rooms.push(this.createRoom(
        `${prefix}_transmission_array`,
        '传送阵',
        this.getBuildingDescription('spirit_transmission_array'),
        TerrainType.PLAIN,
        8,
        [
          { direction: '北', targetId: `${prefix}_post_station`, targetZoneId: prefix, isHidden: false, travelCost: 1 },
        ],
        ['array_guard'],
        true,
        ['传送阵']
      ));
    }
    
    return rooms;
  }
  
  private createRoom(
    id: string,
    name: string,
    description: string,
    terrain: TerrainType,
    spiritDensity: number,
    exits: any[],
    npcs: string[],
    isSafeZone: boolean,
    detailNames: string[]
  ): IRoom {
    const details = detailNames.map((name, index) => ({
      id: `${id}_detail_${index}`,
      name,
      description: this.getDetailDescription(name),
      type: 'environment' as const,
    }));
    
    return {
      id,
      name,
      description,
      terrain,
      spiritDensity,
      exits,
      monsters: [],
      resources: [],
      npcs,
      isSafeZone,
      visited: false,
      firstVisited: 0,
      dynamicEvents: [],
      zoneId: this.config.id,
      details,
    };
  }
  
  private getBuildingDescription(buildingId: string, modifier?: string): string {
    const building = getBuildingById(buildingId);
    if (!building) return '';
    
    let desc = building.appearance;
    if (modifier) {
      if (modifier === '街') {
        desc = `街道两侧${building.name}林立，${building.appearance.replace('临街开间，', '')}`;
      } else {
        desc = `${modifier}${building.name}，${building.appearance}`;
      }
    }
    
    if (building.cultivationFeatures && building.cultivationFeatures.length > 0) {
      const featureDesc = building.cultivationFeatures.map(f => f.description).join('，');
      desc += ` ${featureDesc}`;
    }
    
    return desc;
  }
  
  private getDetailDescription(name: string): string {
    const descriptions: Record<string, string> = {
      '灵石路灯': '主干道两侧立石柱，柱高八尺，柱顶嵌低阶灵石，入夜自动发光。',
      '传音阵': '镇中心立石镜一面，可张贴公告、任务，修士可感应查看。',
      '传信阵': '驿站内设有小型传送阵，仅接收传信玉简。',
      '测灵石': '城门洞上方嵌有灵镜，可照出来者修为。',
      '明镜高悬': '镇公所堂前匾额实为低阶灵镜，可测谎。',
      '聚灵阵': '祭灵祠正殿地面刻有聚灵阵纹，祭灵像常年萦绕微光。',
      '公共水井': '石砌井栏高出地面两尺，井口设辘轳，井旁设洗衣石槽。',
      '磨坊': '土木结构，内设石磨，利用水力驱动。',
      '传送阵': '石砌圆台直径六尺，刻有传送符文，阵眼嵌有灵石。',
    };
    
    return descriptions[name] || '';
  }
}

export function generateTown(config: TownConfig): GeneratedTown {
  const generator = new TownGenerator(config);
  return generator.generate();
}
