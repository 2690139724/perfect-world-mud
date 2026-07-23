import { IZone, ZoneType } from '../../domain/entities/Zone';
import { IRoom, TerrainType } from '../../domain/entities/Room';
import { BuildingDefinition, getCapitalBuildingById } from './capital_building_definitions';

export interface CapitalConfig {
  id: string;
  name: string;
  nation: string;
  description: string;
  coreLandmark: string;
  buildingMaterials: {
    wall: string;
    roof: string;
    foundation: string;
  };
  defenseStyle: string;
  luxuryPlaces: string[];
  recommendedLevel: number;
  population: number;
}

export interface GeneratedCapital {
  zones: IZone[];
  rooms: IRoom[];
}

export class CapitalGenerator {
  private config: CapitalConfig;
  
  constructor(config: CapitalConfig) {
    this.config = config;
  }
  
  generate(): GeneratedCapital {
    const zones = this.generateZones();
    const rooms = this.generateRooms();
    
    return { zones, rooms };
  }
  
  private generateZones(): IZone[] {
    return [
      this.generateOuterCityZone(),
      this.generateImperialCityZone(),
      this.generatePalaceZone(),
    ];
  }
  
  private generateOuterCityZone(): IZone {
    const prefix = this.config.id;
    const roomIds = [
      `${prefix}_outer_gate_north`,
      `${prefix}_outer_gate_south`,
      `${prefix}_outer_gate_east`,
      `${prefix}_outer_gate_west`,
      `${prefix}_zhuque_street`,
      `${prefix}_east_west_street`,
      `${prefix}_dongshi`,
      `${prefix}_xishi`,
      `${prefix}_taixue`,
      `${prefix}_yiguan`,
      `${prefix}_yicang`,
      `${prefix}_daluo`,
      `${prefix}_fang_yongning`,
      `${prefix}_fang_guide`,
      `${prefix}_fang_qinghe`,
    ];
    
    return {
      id: `${prefix}_outer`,
      name: `${this.config.name}外城`,
      type: ZoneType.CITY,
      description: `${this.config.name}外城，百姓居住、商业贸易、市井生活。`,
      roomIds,
      entrances: [
        { direction: '北', targetZoneId: 'border_region', targetRoomId: 'border_entrance' },
        { direction: '南', targetZoneId: 'qing_shi_town', targetRoomId: 'qing_shi_gate_north' },
        { direction: '东', targetZoneId: 'eastern_wild', targetRoomId: 'eastern_entrance' },
        { direction: '西', targetZoneId: 'western_wild', targetRoomId: 'western_entrance' },
        { direction: '内', targetZoneId: `${prefix}_imperial`, targetRoomId: `${prefix}_imperial_gate_south` },
      ],
      recommendedLevel: this.config.recommendedLevel,
      fullyExplored: false,
      specialRules: ['里坊制', '宵禁', '朱雀大街御道', this.config.defenseStyle],
      discovered: true,
    };
  }
  
  private generateImperialCityZone(): IZone {
    const prefix = this.config.id;
    const roomIds = [
      `${prefix}_imperial_gate_south`,
      `${prefix}_imperial_gate_east`,
      `${prefix}_imperial_gate_west`,
      `${prefix}_liubu_office`,
      `${prefix}_wangfu_wu`,
      `${prefix}_wangfu_wen`,
      `${prefix}_tailiao`,
      `${prefix}_jixia_xuegong`,
      `${prefix}_chuanxun_zhen`,
    ];
    
    return {
      id: `${prefix}_imperial`,
      name: `${this.config.name}皇城`,
      type: ZoneType.CITY,
      description: `${this.config.name}皇城，中央政府机构、王侯府邸。`,
      roomIds,
      entrances: [
        { direction: '外', targetZoneId: `${prefix}_outer`, targetRoomId: `${prefix}_zhuque_street` },
        { direction: '内', targetZoneId: `${prefix}_palace`, targetRoomId: `${prefix}_palace_gate_south` },
      ],
      recommendedLevel: this.config.recommendedLevel + 1,
      fullyExplored: false,
      specialRules: ['官员准入', '六部办公', '传讯阵'],
      discovered: true,
    };
  }
  
  private generatePalaceZone(): IZone {
    const prefix = this.config.id;
    const roomIds = [
      `${prefix}_palace_gate_south`,
      `${prefix}_renhuang_dadian`,
      `${prefix}_piandian_left`,
      `${prefix}_piandian_right`,
      `${prefix}_jingwen_lou`,
      `${prefix}_baoshu_dian`,
      `${prefix}_yuhua_yuan`,
      `${prefix}_yushan_fang`,
      `${prefix}_neichao_fang`,
      `${prefix}_hougong`,
      `${prefix}_feizhou_tai`,
      `${prefix}_xuankong_dao`,
      `${prefix}_guanxing_tai`,
      `${prefix}_lingmai_jiedian`,
    ];
    
    return {
      id: `${prefix}_palace`,
      name: `${this.config.name}宫城`,
      type: ZoneType.CITY,
      description: `${this.config.name}宫城，人皇居住、朝会、祭祀。`,
      roomIds,
      entrances: [
        { direction: '外', targetZoneId: `${prefix}_imperial`, targetRoomId: `${prefix}_imperial_gate_south` },
      ],
      recommendedLevel: this.config.recommendedLevel + 2,
      fullyExplored: false,
      specialRules: ['禁地', '人皇居所', '护城大阵核心'],
      discovered: true,
    };
  }
  
  private generateRooms(): IRoom[] {
    const prefix = this.config.id;
    const rooms: IRoom[] = [];
    
    rooms.push(...this.generateOuterCityRooms(prefix));
    rooms.push(...this.generateImperialCityRooms(prefix));
    rooms.push(...this.generatePalaceRooms(prefix));
    
    return rooms;
  }
  
  private generateOuterCityRooms(prefix: string): IRoom[] {
    const rooms: IRoom[] = [];
    
    rooms.push(this.createRoom(
      `${prefix}_outer_gate_south`,
      '外城南门',
      this.getBuildingDescription('outer_city_gate', '主门'),
      TerrainType.PLAIN,
      8,
      [
        { direction: '北', targetId: `${prefix}_zhuque_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
        { direction: '南', targetId: null, targetZoneId: 'qing_shi_town', targetRoomId: 'qing_shi_gate_north', isHidden: false, travelCost: 20 },
      ],
      ['outer_guard', 'imperial_inspector'],
      true,
      ['千斤闸']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_outer_gate_north`,
      '外城北门',
      this.getBuildingDescription('outer_city_gate', '北'),
      TerrainType.PLAIN,
      6,
      [
        { direction: '南', targetId: `${prefix}_zhuque_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
        { direction: '北', targetId: null, targetZoneId: 'border_region', targetRoomId: 'border_entrance', isHidden: false, travelCost: 25 },
      ],
      ['outer_guard'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_outer_gate_east`,
      '外城东门',
      this.getBuildingDescription('outer_city_gate', '东'),
      TerrainType.PLAIN,
      6,
      [
        { direction: '西', targetId: `${prefix}_east_west_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
        { direction: '东', targetId: null, targetZoneId: 'eastern_wild', targetRoomId: 'eastern_entrance', isHidden: false, travelCost: 22 },
      ],
      ['outer_guard'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_outer_gate_west`,
      '外城西门',
      this.getBuildingDescription('outer_city_gate', '西'),
      TerrainType.PLAIN,
      6,
      [
        { direction: '东', targetId: `${prefix}_east_west_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
        { direction: '西', targetId: null, targetZoneId: 'western_wild', targetRoomId: 'western_entrance', isHidden: false, travelCost: 22 },
      ],
      ['outer_guard'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_zhuque_street`,
      '朱雀大街',
      this.getBuildingDescription('zhuque_street'),
      TerrainType.PLAIN,
      10,
      [
        { direction: '北', targetId: `${prefix}_outer_gate_north`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 5 },
        { direction: '南', targetId: `${prefix}_outer_gate_south`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 5 },
        { direction: '东', targetId: `${prefix}_east_west_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
        { direction: '西', targetId: `${prefix}_east_west_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
        { direction: '内', targetId: `${prefix}_imperial_gate_south`, targetZoneId: `${prefix}_imperial`, isHidden: false, travelCost: 5 },
        { direction: '东北', targetId: `${prefix}_dongshi`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 3 },
        { direction: '西北', targetId: `${prefix}_xishi`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 3 },
      ],
      ['imperial_official', 'noble', 'commoner'],
      false,
      ['灵石路灯']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_east_west_street`,
      '东西横街',
      this.getBuildingDescription('east_west_street'),
      TerrainType.PLAIN,
      8,
      [
        { direction: '东', targetId: `${prefix}_outer_gate_east`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 5 },
        { direction: '西', targetId: `${prefix}_outer_gate_west`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 5 },
        { direction: '南', targetId: `${prefix}_zhuque_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
        { direction: '北', targetId: `${prefix}_zhuque_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
        { direction: '北东', targetId: `${prefix}_dongshi`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
        { direction: '北西', targetId: `${prefix}_xishi`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
      ],
      ['commoner', 'merchant'],
      false,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_dongshi`,
      '东市',
      this.getBuildingDescription('dongshi'),
      TerrainType.PLAIN,
      12,
      [
        { direction: '西', targetId: `${prefix}_zhuque_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 3 },
      ],
      ['spirit_material_merchant', 'artifact_dealer', 'scroll_seller'],
      false,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_xishi`,
      '西市',
      this.getBuildingDescription('xishi'),
      TerrainType.PLAIN,
      10,
      [
        { direction: '东', targetId: `${prefix}_zhuque_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 3 },
      ],
      ['grain_merchant', 'blacksmith', 'foreign_trader'],
      false,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_taixue`,
      '太学',
      this.getBuildingDescription('taixue'),
      TerrainType.PLAIN,
      8,
      [
        { direction: '北', targetId: `${prefix}_east_west_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 3 },
      ],
      ['professor', 'student', 'librarian'],
      true,
      ['灵树']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_yiguan`,
      '医馆',
      this.getBuildingDescription('yiguan'),
      TerrainType.PLAIN,
      6,
      [
        { direction: '南', targetId: `${prefix}_east_west_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
      ],
      ['doctor', 'medicine_boy'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_yicang`,
      '义仓',
      this.getBuildingDescription('yicang'),
      TerrainType.PLAIN,
      5,
      [
        { direction: '西', targetId: `${prefix}_east_west_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 3 },
      ],
      ['warehouse_keeper'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_daluo`,
      '大牢',
      this.getBuildingDescription('daluo'),
      TerrainType.PLAIN,
      4,
      [
        { direction: '东', targetId: `${prefix}_east_west_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 3 },
      ],
      ['jailer'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_fang_yongning`,
      '永宁坊',
      '外城永宁坊，青砖白墙，坊内十字街将坊区分四部分，房屋排列整齐。居民多为士绅富商。',
      TerrainType.PLAIN,
      6,
      [
        { direction: '南', targetId: `${prefix}_zhuque_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
      ],
      ['wealthy_resident', 'shopkeeper'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_fang_guide`,
      '归德坊',
      '外城归德坊，平民居住区，坊内多为一进院民居，生活气息浓厚。',
      TerrainType.PLAIN,
      5,
      [
        { direction: '北', targetId: `${prefix}_zhuque_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
      ],
      ['common_resident', 'street_vendor'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_fang_qinghe`,
      '清河坊',
      '外城清河坊，靠近东市，多为商铺兼住宅，坊内设有小型集市。',
      TerrainType.PLAIN,
      7,
      [
        { direction: '西', targetId: `${prefix}_dongshi`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 2 },
      ],
      ['merchant', 'craftsman'],
      true,
      []
    ));
    
    return rooms;
  }
  
  private generateImperialCityRooms(prefix: string): IRoom[] {
    const rooms: IRoom[] = [];
    
    rooms.push(this.createRoom(
      `${prefix}_imperial_gate_south`,
      '皇城端门',
      this.getBuildingDescription('imperial_city_wall', '南门'),
      TerrainType.PLAIN,
      10,
      [
        { direction: '外', targetId: `${prefix}_zhuque_street`, targetZoneId: `${prefix}_outer`, isHidden: false, travelCost: 5 },
        { direction: '内', targetId: `${prefix}_palace_gate_south`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 5 },
      ],
      ['imperial_guard', 'official'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_liubu_office`,
      '六部衙门',
      this.getBuildingDescription('liubu_yamen'),
      TerrainType.PLAIN,
      9,
      [
        { direction: '南', targetId: `${prefix}_imperial_gate_south`, targetZoneId: `${prefix}_imperial`, isHidden: false, travelCost: 3 },
      ],
      ['minister', 'official', 'clerk'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_wangfu_wu`,
      '武王府',
      this.getBuildingDescription('wangfu', '武'),
      TerrainType.PLAIN,
      11,
      [
        { direction: '西', targetId: `${prefix}_imperial_gate_south`, targetZoneId: `${prefix}_imperial`, isHidden: false, travelCost: 4 },
      ],
      ['prince_wu', 'general', 'guard'],
      true,
      ['练功阵']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_wangfu_wen`,
      '文王府',
      this.getBuildingDescription('wangfu', '文'),
      TerrainType.PLAIN,
      10,
      [
        { direction: '东', targetId: `${prefix}_imperial_gate_south`, targetZoneId: `${prefix}_imperial`, isHidden: false, travelCost: 4 },
      ],
      ['prince_wen', 'scholar', 'secretary'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_tailiao`,
      '太庙',
      this.getBuildingDescription('tailiao'),
      TerrainType.PLAIN,
      12,
      [
        { direction: '西', targetId: `${prefix}_imperial_gate_south`, targetZoneId: `${prefix}_imperial`, isHidden: false, travelCost: 3 },
      ],
      ['priest', 'guardian'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_jixia_xuegong`,
      '稷下学宫',
      this.getBuildingDescription('jixia_xuegong'),
      TerrainType.PLAIN,
      10,
      [
        { direction: '东', targetId: `${prefix}_imperial_gate_south`, targetZoneId: `${prefix}_imperial`, isHidden: false, travelCost: 3 },
      ],
      ['scholar', 'disciple'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_chuanxun_zhen`,
      '传讯阵',
      this.getBuildingDescription('chuanxun_zhen'),
      TerrainType.PLAIN,
      12,
      [
        { direction: '南', targetId: `${prefix}_liubu_office`, targetZoneId: `${prefix}_imperial`, isHidden: false, travelCost: 2 },
      ],
      ['array_master'],
      true,
      ['传讯符文']
    ));
    
    return rooms;
  }
  
  private generatePalaceRooms(prefix: string): IRoom[] {
    const rooms: IRoom[] = [];
    
    rooms.push(this.createRoom(
      `${prefix}_palace_gate_south`,
      '午门',
      this.getBuildingDescription('palace_wall', '南门'),
      TerrainType.PLAIN,
      12,
      [
        { direction: '外', targetId: `${prefix}_imperial_gate_south`, targetZoneId: `${prefix}_imperial`, isHidden: false, travelCost: 5 },
        { direction: '内', targetId: `${prefix}_renhuang_dadian`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 3 },
      ],
      ['palace_guard'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_renhuang_dadian`,
      '人皇大殿',
      this.getBuildingDescription('renhuang_dadian'),
      TerrainType.PLAIN,
      15,
      [
        { direction: '南', targetId: `${prefix}_palace_gate_south`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 3 },
        { direction: '北', targetId: `${prefix}_piandian_left`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 2 },
        { direction: '左', targetId: `${prefix}_piandian_left`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 2 },
        { direction: '右', targetId: `${prefix}_piandian_right`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 2 },
      ],
      ['emperor', 'minister', 'guard'],
      true,
      ['暖玉地砖']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_piandian_left`,
      '左偏殿',
      this.getBuildingDescription('piandian', '左'),
      TerrainType.PLAIN,
      12,
      [
        { direction: '右', targetId: `${prefix}_renhuang_dadian`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 2 },
      ],
      ['secretary', 'official'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_piandian_right`,
      '右偏殿',
      this.getBuildingDescription('piandian', '右'),
      TerrainType.PLAIN,
      12,
      [
        { direction: '左', targetId: `${prefix}_renhuang_dadian`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 2 },
      ],
      ['secretary', 'official'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_jingwen_lou`,
      '经文楼',
      this.getBuildingDescription('jingwen_lou'),
      TerrainType.PLAIN,
      14,
      [
        { direction: '东', targetId: `${prefix}_renhuang_dadian`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 3 },
      ],
      ['librarian', 'guard'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_baoshu_dian`,
      '宝术殿',
      this.getBuildingDescription('baoshu_dian'),
      TerrainType.PLAIN,
      16,
      [
        { direction: '西', targetId: `${prefix}_renhuang_dadian`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 3 },
      ],
      ['guard', 'array_master'],
      true,
      ['宝术符文']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_yuhua_yuan`,
      '御花园',
      this.getBuildingDescription('yuhua_yuan'),
      TerrainType.PLAIN,
      13,
      [
        { direction: '北', targetId: `${prefix}_hougong`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 2 },
        { direction: '南', targetId: `${prefix}_renhuang_dadian`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 3 },
      ],
      ['gardener', 'princess'],
      true,
      ['灵植']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_yushan_fang`,
      '御膳房',
      this.getBuildingDescription('yushan_fang'),
      TerrainType.PLAIN,
      8,
      [
        { direction: '东', targetId: `${prefix}_yuhua_yuan`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 2 },
      ],
      ['chef', 'servant'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_neichao_fang`,
      '内朝房',
      this.getBuildingDescription('neichao_fang'),
      TerrainType.PLAIN,
      8,
      [
        { direction: '南', targetId: `${prefix}_palace_gate_south`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 2 },
      ],
      ['official'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_hougong`,
      '后宫',
      this.getBuildingDescription('hougong'),
      TerrainType.PLAIN,
      12,
      [
        { direction: '南', targetId: `${prefix}_yuhua_yuan`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 2 },
      ],
      ['empress', 'concubine', 'maid'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_feizhou_tai`,
      '飞舟台',
      this.getBuildingDescription('feizhou_tai'),
      TerrainType.PLAIN,
      10,
      [
        { direction: '西', targetId: `${prefix}_palace_gate_south`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 3 },
      ],
      ['pilot', 'guard'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_xuankong_dao`,
      '悬空岛',
      this.getBuildingDescription('xuankong_dao'),
      TerrainType.PLAIN,
      18,
      [
        { direction: '下', targetId: `${prefix}_yuhua_yuan`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 5 },
      ],
      ['island_guard'],
      true,
      ['浮空阵法']
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_guanxing_tai`,
      '观星台',
      this.getBuildingDescription('guanxing_tai'),
      TerrainType.PLAIN,
      14,
      [
        { direction: '南', targetId: `${prefix}_jingwen_lou`, targetZoneId: `${prefix}_palace`, isHidden: false, travelCost: 2 },
      ],
      ['astrologer'],
      true,
      []
    ));
    
    rooms.push(this.createRoom(
      `${prefix}_lingmai_jiedian`,
      '灵脉节点',
      this.getBuildingDescription('lingmai_jiedian'),
      TerrainType.PLAIN,
      20,
      [
        { direction: '上', targetId: `${prefix}_renhuang_dadian`, targetZoneId: `${prefix}_palace`, isHidden: true, travelCost: 10 },
      ],
      [],
      true,
      ['灵气浓郁']
    ));
    
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
      zoneId: this.getZoneIdByRoomId(id),
      details,
    };
  }
  
  private getZoneIdByRoomId(roomId: string): string {
    if (roomId.includes('_outer_')) return `${this.config.id}_outer`;
    if (roomId.includes('_imperial_')) return `${this.config.id}_imperial`;
    if (roomId.includes('_palace_')) return `${this.config.id}_palace`;
    return `${this.config.id}_outer`;
  }
  
  private getBuildingDescription(buildingId: string, modifier?: string): string {
    const building = getCapitalBuildingById(buildingId);
    if (!building) return '';
    
    let desc = building.appearance;
    if (modifier) {
      if (modifier === '主门') {
        desc = '主门（南门），' + desc;
      } else if (modifier === '左' || modifier === '右') {
        desc = `${modifier}偏殿，` + desc;
      } else if (modifier === '武' || modifier === '文') {
        desc = `${modifier}王府，` + desc;
      } else {
        desc = `${modifier}${building.name}，` + desc;
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
      '千斤闸': '城门上方设铁铸千斤闸，厚三寸，危急时可放下阻挡敌人。',
      '灵石路灯': '灵槐树之间立石灯柱，顶嵌中品灵石，夜间如昼。',
      '灵树': '院中植一棵灵树，树下为弟子论道处，灵气浓郁。',
      '练功阵': '演武厅玄石地砖刻有练功阵，辅助修炼。',
      '传讯符文': '刻有传讯符文，可跨城远程通讯。',
      '暖玉地砖': '地面铺暖玉地砖，冬暖夏凉。',
      '宝术符文': '内壁刻宝术符文，增强宝术拓本的保存。',
      '灵植': '种植珍稀灵草灵木，灵气浓郁。',
      '浮空阵法': '被阵法托起，悬浮在空中。',
      '灵气浓郁': '灵气浓郁成雾，修炼效率倍增。',
    };
    
    return descriptions[name] || '';
  }
}

export function generateCapital(config: CapitalConfig): GeneratedCapital {
  const generator = new CapitalGenerator(config);
  return generator.generate();
}
