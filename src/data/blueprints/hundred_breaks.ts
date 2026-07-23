import { ZoneBlueprintDB, IZoneBlueprint } from './BlueprintDB';
import { TerrainType } from '../../domain/entities/Room';

const HundredBreaksBlueprint: IZoneBlueprint = {
  id: 'hundred_breaks',
  name: '百断山',
  type: 'wild',
  description: '一座古老的山脉，山势险峻，断崖林立，故称"百断"。山中多古遗迹和凶兽，是修士历练的绝佳之地，也是寻找上古传承的宝地。',
  recommendedLevel: 5,
  entrances: [
    { direction: '南', targetZoneId: 'wasteland', targetRoomId: 'wasteland_06' }
  ],
  rooms: [
    {
      id: 'hundred_breaks_entrance',
      name: '百断山入口',
      description: '两座巍峨的山峰夹峙着一条狭窄的山道，道口立着一块残破的石碑，上面刻着"百断山"三个古字。山风呼啸，带着一股蛮荒的气息。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 45,
      exits: [
        { direction: '南', targetId: 'wasteland_06', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'hundred_breaks_path', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '内', targetId: 'hundred_breaks_path', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [],
      resources: [],
      npcs: ['mysterious_old', 'mountain_merchant'],
      isSafeZone: true,
    },
    {
      id: 'hundred_breaks_path',
      name: '山道',
      description: '蜿蜒曲折的山道，两侧古木参天，遮天蔽日。地面上散落着巨大的兽骨，偶尔可见残缺的兵器，说明这里曾是战场。',
      terrain: TerrainType.FOREST,
      spiritDensity: 50,
      exits: [
        { direction: '南', targetId: 'hundred_breaks_entrance', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'hundred_breaks_mid', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'hundred_breaks_dense', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'iron_beast', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 180 },
        { monsterId: 'wind_hawk', minCount: 1, maxCount: 1, spawnWeight: 60, respawnTime: 200 }
      ],
      resources: [{ resourceId: 'spirit_herb', amount: 3, respawnTime: 400, harvestDifficulty: 2 }],
      npcs: ['wounded_monk', 'mu_daoren'],
      isSafeZone: false,
    },
    {
      id: 'hundred_breaks_dense',
      name: '密林深处',
      description: '树木越发茂密，枝干纠缠如虬龙。林间雾气弥漫，隐约可见一些残破的石像和祭坛，透着一股诡异的气息。',
      terrain: TerrainType.FOREST,
      spiritDensity: 55,
      exits: [
        { direction: '西', targetId: 'hundred_breaks_path', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'hundred_breaks_ruins', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'vine_beast', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 200 },
        { monsterId: 'spirit_fox', minCount: 1, maxCount: 1, spawnWeight: 40, respawnTime: 300 }
      ],
      resources: [{ resourceId: 'spirit_herb', amount: 4, respawnTime: 500, harvestDifficulty: 3 }],
      npcs: ['old_herbalist', 'cai_shen_ren'],
      isSafeZone: false,
    },
    {
      id: 'hundred_breaks_mid',
      name: '山腰断崖',
      description: '山道在此中断，前方是一道深不见底的断崖。崖边有一座石亭，亭中石桌上刻着一副残局。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 60,
      exits: [
        { direction: '南', targetId: 'hundred_breaks_path', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'hundred_breaks_waterfall', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'hundred_breaks_peak', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'stone_beast', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 300 }
      ],
      resources: [{ resourceId: 'iron_ore', amount: 3, respawnTime: 500, harvestDifficulty: 3 }],
      isSafeZone: false,
    },
    {
      id: 'hundred_breaks_waterfall',
      name: '飞瀑',
      description: '一道银白色的瀑布从高处倾泻而下，水声如雷。瀑布后隐约可见一个洞口，似乎别有洞天。',
      terrain: TerrainType.WATER,
      spiritDensity: 70,
      exits: [
        { direction: '西', targetId: 'hundred_breaks_mid', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '内', targetId: 'hundred_breaks_cave', condition: '需洞天境', isHidden: true, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'water_beast', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 400 }
      ],
      resources: [{ resourceId: 'spirit_herb', amount: 5, respawnTime: 600, harvestDifficulty: 4 }],
      isSafeZone: false,
    },
    {
      id: 'hundred_breaks_cave',
      name: '水帘洞府',
      description: '瀑布后的洞穴，干燥宽敞，洞壁上镶嵌着夜明珠，照得洞内如同白昼。中央有一座石台，台上放着一卷古经。',
      terrain: TerrainType.CAVE,
      spiritDensity: 90,
      exits: [
        { direction: '外', targetId: 'hundred_breaks_waterfall', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [],
      resources: [{ resourceId: 'spirit_crystal', amount: 3, respawnTime: 3600, harvestDifficulty: 5 }],
      isSafeZone: true,
      details: [
        { id: 'hundred_breaks_cave_ant', name: '古老蚁穴', description: '洞府深处，你发现了一个巨大的蚁穴。蚁穴入口刻着古老的纹路，似乎是太古时期人为建造。穴内传来微弱的灵气波动，似乎藏着什么宝物。', type: 'secret', hint: '探查古老蚁穴...', requiredRealm: 5 },
        { id: 'hundred_breaks_cave_book', name: '太古凶兽志', description: '石台上的古经竟是《太古凶兽志》。翻阅后，你找到了关于天角蚁的记载："天角蚁，太古凶虫也。其王拥十角，力可撼山。王死后，宝藏葬于百断山深处，待有缘人开启。"', type: 'lore' },
      ],
    },
    {
      id: 'hundred_breaks_ruins',
      name: '上古遗迹',
      description: '一片残垣断壁，依稀可辨当年建筑的宏伟。地面上刻着复杂的阵纹，虽然已经破损，但仍散发着微弱的光芒。',
      terrain: TerrainType.RUIN,
      spiritDensity: 75,
      exits: [
        { direction: '南', targetId: 'hundred_breaks_dense', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'hundred_breaks_peak', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'divine_garden_entrance', condition: '需尊者境', isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'ancient_guardian', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 600 },
        { monsterId: 'wandering_soul', minCount: 1, maxCount: 2, spawnWeight: 60, respawnTime: 300 }
      ],
      resources: [{ resourceId: 'ancient_bone', amount: 2, respawnTime: 1800, harvestDifficulty: 6 }],
      npcs: ['tomb_robber'],
      isSafeZone: false,
    },
    {
      id: 'hundred_breaks_peak',
      name: '百断山主峰',
      description: '百断山的最高处，四周云雾缭绕，仿佛立于云端。山顶有一座古老的传送阵，不知通往何方。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 100,
      exits: [
        { direction: '南', targetId: 'hundred_breaks_mid', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西', targetId: 'hundred_breaks_ruins', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'wind_hawk', minCount: 2, maxCount: 3, spawnWeight: 100, respawnTime: 200 }
      ],
      resources: [{ resourceId: 'spirit_crystal', amount: 2, respawnTime: 2400, harvestDifficulty: 5 }],
      isSafeZone: false,
    },
  ]
};

ZoneBlueprintDB.register(HundredBreaksBlueprint);