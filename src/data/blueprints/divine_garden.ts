import { ZoneBlueprintDB, IZoneBlueprint } from './BlueprintDB';
import { TerrainType } from '../../domain/entities/Room';

const DivineGardenBlueprint: IZoneBlueprint = {
  id: 'divine_garden',
  name: '太古神药园',
  type: 'dungeon',
  description: '传说中太古神明种植灵药的园子，藏于虚空中。园中种植着无数珍稀灵药，有些甚至是传说中的不死药。但园中也布满了阵法和守护灵兽，危机四伏。',
  recommendedLevel: 5,
  entrances: [
    { direction: '入口', targetZoneId: 'hundred_breaks', targetRoomId: 'hundred_breaks_ruins' }
  ],
  rooms: [
    {
      id: 'divine_garden_entrance',
      name: '神药园入口',
      description: '一道虚空裂缝出现在你面前，裂缝中传来浓郁的药香。穿过裂缝，你来到了一处被阵法笼罩的古老园林。园门上刻着"太古神药园"五个大字，散发着淡淡的神光。',
      terrain: TerrainType.RUIN,
      spiritDensity: 100,
      exits: [
        { direction: '内', targetId: 'divine_garden_path', condition: '需尊者境', isHidden: false, travelCost: 0 },
        { direction: '外', targetId: 'hundred_breaks_ruins', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: [],
      isSafeZone: true,
      details: [
        { id: 'divine_gate_runes', name: '园门神纹', description: '园门上的神纹是太古神明亲手刻画的，蕴含着神之力。据说这些神纹可抵御一切外敌，只有有缘人才能进入。', type: 'lore' },
        { id: 'divine_gate_scent', name: '药香', description: '从园中飘出的药香令人精神一振，这药香本身就蕴含着灵力，闻一闻就能提升修为。', type: 'environment' },
      ],
    },
    {
      id: 'divine_garden_path',
      name: '神药小径',
      description: '一条由灵玉铺成的小径，两旁种植着各种珍稀灵药。小径上弥漫着灵雾，能见度不高。偶尔可以看到灵兽在灵药间穿梭。',
      terrain: TerrainType.FOREST,
      spiritDensity: 120,
      exits: [
        { direction: '外', targetId: 'divine_garden_entrance', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '前', targetId: 'divine_garden_center', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'divine_garden_pool', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'divine_beast', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 1800 },
      ],
      resources: [
        { resourceId: 'immortal_herb', amount: 5, respawnTime: 3600, harvestDifficulty: 7 },
        { resourceId: 'spirit_crystal', amount: 3, respawnTime: 3600, harvestDifficulty: 6 },
      ],
      npcs: [],
      isSafeZone: false,
      details: [
        { id: 'divine_path_herbs', name: '珍稀灵药', description: '小径两旁种植着各种珍稀灵药，有万年雪莲、九转还魂草、七彩灵芝等。每一株都散发着浓郁的灵气。', type: 'interactive', hint: '采集灵药...', interactionResult: '你小心翼翼地采集了一株万年雪莲，雪莲散发着冰凉的灵气。', rewardItemId: '万年雪莲', rewardAmount: 1 },
        { id: 'divine_path_beasts', name: '守护灵兽', description: '园中的灵兽是太古神明留下的守护者，它们守护着灵药，一旦有人偷采灵药，便会发起攻击。', type: 'lore' },
        { id: 'divine_path_fog', name: '灵雾', description: '弥漫在空气中的灵雾是天地灵气凝结而成，在灵雾中修炼可事半功倍。', type: 'environment' },
      ],
    },
    {
      id: 'divine_garden_pool',
      name: '神药灵池',
      description: '一处由灵泉汇聚而成的灵池，池水散发着七彩光芒。池中生长着一株散发着仙气的莲花，似乎是传说中的"混沌青莲"。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 150,
      exits: [
        { direction: '西', targetId: 'divine_garden_path', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'pool_guardian', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 7200 },
      ],
      resources: [
        { resourceId: 'immortal_essence', amount: 1, respawnTime: 86400, harvestDifficulty: 10 },
      ],
      npcs: [],
      isSafeZone: false,
      details: [
        { id: 'divine_pool_water', name: '灵池水', description: '灵池中的水是天地灵气凝结而成，饮用可大幅提升修为。但池水威力强大，修为不足者饮用可能爆体而亡。', type: 'interactive', hint: '饮用灵池水...', interactionResult: '你掬起一捧灵池水喝下，一股庞大的灵力涌入体内，修为暴涨！', rewardItemId: '灵池仙水', rewardAmount: 1, requiredRealm: 7 },
        { id: 'divine_pool_lotus', name: '混沌青莲', description: '池中的莲花是传说中的"混沌青莲"，蕴含着混沌之力。据说获得混沌青莲可成就无上道果。', type: 'secret', hint: '采摘混沌青莲...', requiredRealm: 9 },
        { id: 'divine_pool_guardian', name: '池中守护者', description: '灵池中有一头太古神兽守护着混沌青莲，它的实力深不可测，即使是尊者境的修士也未必能战胜它。', type: 'lore' },
      ],
    },
    {
      id: 'divine_garden_center',
      name: '神药园核心',
      description: '神药园的核心区域，一座古老的药鼎矗立在中央。药鼎周围种植着传说中的"不死药"，散发着金色的光芒。空气中弥漫着浓郁的药香，令人心旷神怡。',
      terrain: TerrainType.RUIN,
      spiritDensity: 200,
      exits: [
        { direction: '后', targetId: 'divine_garden_path', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '下', targetId: 'divine_garden_secret', condition: '需神火境', isHidden: true, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'ancient_immortal', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 14400 },
      ],
      resources: [
        { resourceId: 'immortal_essence', amount: 2, respawnTime: 86400, harvestDifficulty: 12 },
      ],
      npcs: [],
      isSafeZone: false,
      details: [
        { id: 'divine_center_cauldron', name: '太古药鼎', description: '矗立在中央的药鼎是太古神明炼丹所用的药鼎，蕴含着炼丹之道。据说用药鼎炼丹可提升丹药品质。', type: 'lore' },
        { id: 'divine_center_immortal_grass', name: '不死药', description: '传说中的"不死药"，服用可延年益寿，甚至起死回生。不死药是天地间最珍贵的灵药之一。', type: 'interactive', hint: '采摘不死药...', interactionResult: '你小心翼翼地采摘了一株不死药，不死药散发着金色的光芒，蕴含着庞大的生命力。', rewardItemId: '不死药', rewardAmount: 1, requiredRealm: 8 },
        { id: 'divine_center_secret', name: '地下密室', description: '药鼎下方似乎有一个隐藏的入口，通向地下深处的密室。据说密室中藏着太古神明留下的传承。', type: 'secret', hint: '进入地下密室...', requiredRealm: 7 },
      ],
    },
    {
      id: 'divine_garden_secret',
      name: '神明秘境',
      description: '神药园地下的秘境，是太古神明闭关修炼的地方。秘境中时间流速与外界不同，灵气浓郁到形成了灵液。秘境中央有一座神台，上面放着一卷古老的经文。',
      terrain: TerrainType.CAVE,
      spiritDensity: 300,
      exits: [
        { direction: '上', targetId: 'divine_garden_center', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'divine_spirit', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 28800 },
      ],
      resources: [
        { resourceId: 'immortal_essence', amount: 3, respawnTime: 172800, harvestDifficulty: 15 },
        { resourceId: 'xian_jing', amount: 5, respawnTime: 86400, harvestDifficulty: 10 },
      ],
      isSafeZone: false,
      details: [
        { id: 'divine_secret_altar', name: '神明祭台', description: '秘境中央的祭台是太古神明修炼所用，台上放着一卷古老的经文，散发着神光。', type: 'interactive', hint: '取走经文...', interactionResult: '你拿起经文，一股浩瀚的力量涌入脑海。你获得了太古神明的传承！', rewardItemId: '神明古经', rewardAmount: 1, requiredRealm: 9 },
        { id: 'divine_secret_time', name: '时间法则', description: '秘境中的时间流速比外界慢百倍，在这里修炼一天相当于外界百天。这是太古神明以时间法则布置的。', type: 'lore' },
        { id: 'divine_secret_pool', name: '灵液池', description: '秘境角落有一个灵液池，池中是液态的灵气，修炼效果远超灵石。', type: 'interactive', hint: '吸收灵液...', interactionResult: '你吸收了一些灵液，修为大幅提升！', rewardItemId: '灵液', rewardAmount: 1, requiredRealm: 8 },
      ],
    },
  ],
};

ZoneBlueprintDB.register(DivineGardenBlueprint);