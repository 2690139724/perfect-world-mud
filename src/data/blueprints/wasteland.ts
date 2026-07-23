import { ZoneBlueprintDB, IZoneBlueprint } from './BlueprintDB';
import { TerrainType } from '../../domain/entities/Room';

const WastelandBlueprint: IZoneBlueprint = {
  id: 'wasteland',
  name: '蛮荒之地',
  type: 'wild',
  description: '一片广袤无垠的蛮荒之地，古木参天，凶兽横行。这里是荒域各国之间的缓冲地带，连接着石国、火国、金狼古国、青鳞古国、血神古国、雨国、雷国、兽国等多个古国。',
  recommendedLevel: 1,
  entrances: [
    { direction: '南', targetZoneId: 'stone_city', targetRoomId: 'stone_city_gate' },
    { direction: '北', targetZoneId: 'fire_city', targetRoomId: 'fire_gate' },
    { direction: '西', targetZoneId: 'butian_ge', targetRoomId: 'butian_ge_gate' },
    { direction: '东', targetZoneId: 'zhulu_shuyuan', targetRoomId: 'zhulu_shuyuan_gate' },
    { direction: '北', targetZoneId: 'hundred_breaks', targetRoomId: 'hundred_breaks_entrance' },
    { direction: '西北', targetZoneId: 'golden_wolf', targetRoomId: 'golden_wolf_gate' },
    { direction: '东', targetZoneId: 'qinglin', targetRoomId: 'qinglin_gate' },
    { direction: '东北', targetZoneId: 'blood_god', targetRoomId: 'blood_god_gate' },
    { direction: '东南', targetZoneId: 'rain_kingdom', targetRoomId: 'rain_gate' },
    { direction: '西北', targetZoneId: 'thunder_kingdom', targetRoomId: 'thunder_gate' },
    { direction: '西南', targetZoneId: 'beast_kingdom', targetRoomId: 'beast_gate' },
    { direction: '南', targetZoneId: 'stone_provinces', targetRoomId: 'stone_city_gate' },
    { direction: '北', targetZoneId: 'fire_provinces', targetRoomId: 'fire_province_gate' }
  ],
  rooms: [
    {
      id: 'wasteland_gate',
      name: '蛮荒入口',
      description: '石城北门外的一片荒原，草木稀疏，远处隐约可见山峦起伏。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 15,
      exits: [
        { direction: '南', targetId: 'stone_city_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'wasteland_01', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'wasteland_02', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '内', targetId: 'stone_city_gate', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'wild_wolf', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 120 }
      ],
      resources: [{ resourceId: 'spirit_herb', amount: 2, respawnTime: 300, harvestDifficulty: 1 }],
      npcs: ['liehu_zhao'],
      isSafeZone: false,
    },
    {
      id: 'wasteland_01',
      name: '碎石坡',
      description: '满地碎石的山坡，山风呼啸，偶尔有碎石滚落。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 18,
      exits: [
        { direction: '南', targetId: 'wasteland_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'wasteland_03', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'wild_wolf', minCount: 1, maxCount: 1, spawnWeight: 80, respawnTime: 120 },
        { monsterId: 'stone_beast', minCount: 1, maxCount: 1, spawnWeight: 40, respawnTime: 300 }
      ],
      resources: [{ resourceId: 'iron_ore', amount: 2, respawnTime: 600, harvestDifficulty: 2 }],
      npcs: ['wander_monk'],
      isSafeZone: false,
    },
    {
      id: 'wasteland_02',
      name: '枯木林',
      description: '一片枯死的树林，枝干扭曲如鬼爪，林中弥漫着淡淡的雾气。',
      terrain: TerrainType.FOREST,
      spiritDensity: 20,
      exits: [
        { direction: '西', targetId: 'wasteland_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'wasteland_04', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东北', targetId: 'little_gu_gate', targetZoneId: 'little_gu_mountain', targetRoomId: 'little_gu_gate', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'poison_snake', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 180 }
      ],
      resources: [{ resourceId: 'lingzhi', amount: 1, respawnTime: 600, harvestDifficulty: 2 }],
      npcs: ['a_ling'],
      isSafeZone: false,
    },
    {
      id: 'wasteland_03',
      name: '风嚎谷',
      description: '狭窄的山谷，风声如嚎，两侧峭壁陡峭。谷口通往多个古国，是荒域的交通要道。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 22,
      exits: [
        { direction: '南', targetId: 'wasteland_01', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'wasteland_05', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西', targetId: 'butian_ge_gate', condition: '需洞天境', isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'zhulu_shuyuan_gate', condition: '需洞天境', isHidden: false, travelCost: 0 },
        { direction: '西南', targetId: 'stone_village_entrance', targetZoneId: 'stone_village', targetRoomId: 'stone_village_entrance', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西北', targetId: 'wu_wang_fu_gate', targetZoneId: 'wu_wang_fu', targetRoomId: 'wu_wang_fu_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西北', targetId: 'golden_wolf_gate', targetZoneId: 'golden_wolf', targetRoomId: 'golden_wolf_gate', condition: '需化灵境', isHidden: false, travelCost: 0 },
        { direction: '西北', targetId: 'thunder_gate', targetZoneId: 'thunder_kingdom', targetRoomId: 'thunder_gate', condition: '需化灵境', isHidden: false, travelCost: 0 },
        { direction: '西南', targetId: 'beast_gate', targetZoneId: 'beast_kingdom', targetRoomId: 'beast_gate', condition: '需化灵境', isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'wind_hawk', minCount: 1, maxCount: 1, spawnWeight: 80, respawnTime: 200 },
        { monsterId: 'stone_beast', minCount: 1, maxCount: 1, spawnWeight: 40, respawnTime: 300 }
      ],
      resources: [],
      npcs: ['ma_san'],
      isSafeZone: false,
    },
    {
      id: 'wasteland_04',
      name: '迷雾沼泽',
      description: '沼泽中水汽弥漫，脚下泥泞不堪，偶尔可见巨大的气泡从泥潭中冒出。沼泽东侧通往青鳞古国，东南侧通往雨国。',
      terrain: TerrainType.SWAMP,
      spiritDensity: 25,
      exits: [
        { direction: '南', targetId: 'wasteland_02', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'wasteland_06', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'qinglin_gate', targetZoneId: 'qinglin', targetRoomId: 'qinglin_gate', condition: '需化灵境', isHidden: false, travelCost: 0 },
        { direction: '东南', targetId: 'rain_gate', targetZoneId: 'rain_kingdom', targetRoomId: 'rain_gate', condition: '需化灵境', isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'swamp_crocodile', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 300 }
      ],
      resources: [{ resourceId: 'blood_flower', amount: 2, respawnTime: 600, harvestDifficulty: 3 }],
      npcs: ['li_qing'],
      isSafeZone: false,
    },
    {
      id: 'wasteland_05',
      name: '断崖',
      description: '一道深不见底的断崖，云雾缭绕。崖边生长着几株灵草。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 30,
      exits: [
        { direction: '南', targetId: 'wasteland_03', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'fire_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'stone_kingdom_gate', targetZoneId: 'stone_kingdom', targetRoomId: 'stone_kingdom_gate', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'wind_hawk', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 200 }
      ],
      resources: [{ resourceId: 'spirit_herb', amount: 3, respawnTime: 600, harvestDifficulty: 2 }],
      isSafeZone: false,
    },
    {
      id: 'wasteland_06',
      name: '古战场遗址',
      description: '一片荒芜的古战场，残破的兵器散落一地，地面上依稀可见暗红色的血迹。战场东北侧通往血神古国。',
      terrain: TerrainType.RUIN,
      spiritDensity: 35,
      exits: [
        { direction: '西', targetId: 'wasteland_04', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'hundred_breaks_entrance', condition: '需化灵境', isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'immortal_gate', condition: '需化灵境', isHidden: false, travelCost: 0 },
        { direction: '东北', targetId: 'burial_entrance', condition: '需神火境', isHidden: false, travelCost: 0 },
        { direction: '东北', targetId: 'blood_god_gate', targetZoneId: 'blood_god', targetRoomId: 'blood_god_gate', condition: '需列阵境', isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'wandering_soul', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 300 }
      ],
      resources: [{ resourceId: 'ancient_bone', amount: 1, respawnTime: 1200, harvestDifficulty: 4 }],
      npcs: ['old_soldier'],
      isSafeZone: false,
      details: [
        { id: 'wasteland_battlefield_relic', name: '古战场遗物', description: '在战场边缘的废墟中，你发现了一柄断剑、一面残旗和一枚将印。将印上刻着"柳"字，散发着微弱的灵光，似乎在召唤着什么。这些遗物似乎是三百年前那场大战的遗存。', type: 'secret', hint: '拾取古战场遗物...', requiredRealm: 2 },
        { id: 'wasteland_battlefield_stele', name: '战场古碑', description: '战场中央立着一块残破的古碑，碑文已模糊不清，只能依稀辨认出："……柳卫率三千精锐……血战三日……无一生还……"碑下散落着破碎的兵器。', type: 'lore' },
      ],
    }
  ]
};

ZoneBlueprintDB.register(WastelandBlueprint);