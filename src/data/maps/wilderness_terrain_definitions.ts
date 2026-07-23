export type TerrainCategory = 'mountain' | 'plain' | 'forest' | 'water' | 'arid' | 'special';

export type DangerLevel = 'low' | 'medium' | 'medium_high' | 'high' | 'extreme';

export interface TerrainResource {
  id: string;
  name: string;
  description: string;
  harvestDifficulty: number;
  respawnTime: number;
  amount: number;
}

export interface TerrainEvent {
  id: string;
  name: string;
  description: string;
  triggerCondition?: string;
}

export interface TerrainMonster {
  id: string;
  name: string;
  description: string;
  level: number;
  spawnWeight: number;
}

export interface TerrainDefinition {
  id: string;
  name: string;
  category: TerrainCategory;
  visualFeatures: string[];
  vegetation: string[];
  geography: string[];
  cultivationElements: string[];
  possibleEvents: TerrainEvent[];
  dangerLevel: DangerLevel;
  dangerLevelNum: number;
  spiritDensity: number;
  resourceOutputs: TerrainResource[];
  monsters: TerrainMonster[];
  transitionTerrain?: string[];
}

export const WILDERNESS_TERRAIN_DEFINITIONS: TerrainDefinition[] = [
  {
    id: 'low_hills',
    name: '低山丘陵',
    category: 'mountain',
    visualFeatures: [
      '起伏和缓的丘陵，高度约数十至百丈',
      '山脊圆润，植被茂密',
      '晨雾常在山谷间游走',
      '阳光透过树冠洒下斑驳光影'
    ],
    vegetation: [
      '灌木丛、杂木林为主',
      '间有野果林（山桃、野柿、酸枣）',
      '林下生长蕨类与野花',
      '溪边有芦苇与菖蒲'
    ],
    geography: [
      '土层较厚（约三尺）',
      '岩石裸露不多',
      '溪流切割形成浅谷',
      '谷底常有卵石滩'
    ],
    cultivationElements: [
      '偶见低阶灵药（十年份以下）生长于背阴处，如山参、黄精、石斛',
      '可能有小型凶兽出没（山兔、野猪、青狐）'
    ],
    possibleEvents: [
      { id: 'hunter_trap', name: '猎户陷阱', description: '发现猎户设置的铁夹或绳套' },
      { id: 'herbalist_trace', name: '采药人痕迹', description: '发现采药人遗留的药篓、石锄' },
      { id: 'animal_path', name: '兽道', description: '遇见动物踩出的路径' },
      { id: 'hunter_cabin', name: '猎户木屋', description: '偶遇猎户的山间小屋' }
    ],
    dangerLevel: 'low',
    dangerLevelNum: 1,
    spiritDensity: 5,
    resourceOutputs: [
      { id: 'common_wood', name: '普通木材', description: '可用于建筑的普通木材', harvestDifficulty: 2, respawnTime: 120, amount: 1 },
      { id: 'wild_fruit', name: '野果', description: '山桃、野柿、酸枣等野果', harvestDifficulty: 1, respawnTime: 60, amount: 1 },
      { id: 'low_herb_10', name: '低阶草药（十年份）', description: '山参、黄精、石斛等十年份草药', harvestDifficulty: 3, respawnTime: 300, amount: 1 },
      { id: 'low_beast_hide', name: '低阶兽皮', description: '山兔、野猪、青狐等兽皮', harvestDifficulty: 2, respawnTime: 200, amount: 1 }
    ],
    monsters: [
      { id: 'mountain_rabbit', name: '山兔', description: '敏捷的山地野兔', level: 1, spawnWeight: 50 },
      { id: 'wild_boar', name: '野猪', description: '凶猛的野猪', level: 2, spawnWeight: 30 },
      { id: 'green_fox', name: '青狐', description: '狡猾的青色狐狸', level: 2, spawnWeight: 20 }
    ],
    transitionTerrain: ['mid_mountain', 'evergreen_forest', 'alluvial_plain']
  },
  {
    id: 'mid_mountain',
    name: '中山密林',
    category: 'mountain',
    visualFeatures: [
      '山势陡然陡峭，树高林密，遮天蔽日',
      '藤萝垂挂如帘',
      '苔藓遍生石上',
      '林间光线昏暗，鸟鸣兽吼声此起彼伏'
    ],
    vegetation: [
      '以松、柏、栎、枫等乔木为主',
      '树高可达十丈',
      '树冠完全遮蔽天空',
      '林下蕨类丛生',
      '偶有千年古树（需数人合抱）'
    ],
    geography: [
      '山石嶙峋',
      '土层浅薄（仅数寸）',
      '多裸露岩壁',
      '泉眼隐藏于树根之间',
      '形成细流汇入山涧'
    ],
    cultivationElements: [
      '百年份灵药生长于岩缝（灵芝、何首乌、茯苓）',
      '有中阶凶兽栖息（青狼、铁背熊、花豹）',
      '可能发现废弃的山洞（前人行修洞府）',
      '或散落的骨文残片'
    ],
    possibleEvents: [
      { id: 'lost', name: '迷路', description: '林间方向难辨，容易迷失' },
      { id: 'beast_encounter', name: '凶兽遭遇', description: '遭遇狼群或铁背熊' },
      { id: 'spirit_herb', name: '发现灵药', description: '发现百年份灵药，但可能有守护兽' },
      { id: 'residual_array', name: '误入残阵', description: '误入前人遗留的残破阵法' },
      { id: 'cultivator_remains', name: '修士遗骨', description: '发现修士的遗骸' }
    ],
    dangerLevel: 'medium',
    dangerLevelNum: 2,
    spiritDensity: 12,
    resourceOutputs: [
      { id: 'hard_wood', name: '硬木', description: '松柏木等坚硬木材', harvestDifficulty: 4, respawnTime: 200, amount: 1 },
      { id: 'spirit_herb_100', name: '灵药（百年份）', description: '灵芝、何首乌、茯苓等百年份灵药', harvestDifficulty: 6, respawnTime: 500, amount: 1 },
      { id: 'medium_beast_materials', name: '凶兽材料', description: '青狼、铁背熊、花豹的兽骨兽皮', harvestDifficulty: 5, respawnTime: 400, amount: 1 },
      { id: 'mountain_spring_water', name: '山泉灵水', description: '富含灵气的山泉水', harvestDifficulty: 2, respawnTime: 100, amount: 2 }
    ],
    monsters: [
      { id: 'green_wolf', name: '青狼', description: '群居的青色狼群', level: 3, spawnWeight: 40 },
      { id: 'iron_back_bear', name: '铁背熊', description: '背部如铁的巨熊', level: 4, spawnWeight: 30 },
      { id: 'spotted_leopard', name: '花豹', description: '敏捷凶猛的花豹', level: 4, spawnWeight: 30 }
    ],
    transitionTerrain: ['low_hills', 'high_mountain', 'ancient_forest']
  },
  {
    id: 'high_mountain',
    name: '高山之巅',
    category: 'mountain',
    visualFeatures: [
      '山体完全裸露，岩石嶙峋如剑',
      '云雾缭绕于腰',
      '峰顶覆盖终年不化的积雪或冰川',
      '罡风呼啸，气温极低'
    ],
    vegetation: [
      '几乎无高大乔木',
      '仅存苔藓、地衣',
      '耐寒的高山灵草（雪莲、冰魄草）贴地生长'
    ],
    geography: [
      '风蚀严重',
      '多奇石怪峰（石柱、石笋、风蚀洞）',
      '可能有天池（火山口积水成湖）',
      '或冰川湖（冰蚀洼地）'
    ],
    cultivationElements: [
      '千年灵药生于绝壁（需攀岩采集）',
      '有高阶凶兽巢穴（雪猿、冰蟒、雷鹰）',
      '峰顶常有雷击痕迹（修士渡劫留下的焦痕）'
    ],
    possibleEvents: [
      { id: 'blizzard', name: '暴风雪', description: '天气突变，遭遇暴风雪' },
      { id: 'ancient_writing', name: '上古刻字', description: '发现石壁上的上古刻字' },
      { id: 'beast_territory', name: '凶兽领地', description: '闯入高阶凶兽的领地' },
      { id: 'tribulation_remains', name: '渡劫遗物', description: '发现渡劫者留下的残破法器' }
    ],
    dangerLevel: 'high',
    dangerLevelNum: 4,
    spiritDensity: 20,
    resourceOutputs: [
      { id: 'rare_herb_1000', name: '稀有灵药（千年份）', description: '雪莲、冰魄草等千年份灵药', harvestDifficulty: 10, respawnTime: 1000, amount: 1 },
      { id: 'ice_spirit_stone', name: '冰灵石', description: '蕴含冰系灵气的矿石', harvestDifficulty: 8, respawnTime: 800, amount: 1 },
      { id: 'high_beast_core', name: '高阶凶兽内丹', description: '雪猿、冰蟒、雷鹰的内丹', harvestDifficulty: 12, respawnTime: 1200, amount: 1 }
    ],
    monsters: [
      { id: 'snow_ape', name: '雪猿', description: '力大无穷的雪猿', level: 6, spawnWeight: 25 },
      { id: 'ice_python', name: '冰蟒', description: '通体冰寒的巨蟒', level: 7, spawnWeight: 35 },
      { id: 'thunder_eagle', name: '雷鹰', description: '翱翔云端的雷属性巨鹰', level: 7, spawnWeight: 40 }
    ],
    transitionTerrain: ['mid_mountain', 'canyon']
  },
  {
    id: 'canyon',
    name: '峡谷裂谷',
    category: 'mountain',
    visualFeatures: [
      '两山夹峙，谷底狭窄幽深',
      '光线昏暗（终日仅有数小时日照）',
      '崖壁陡峭如削，高达数十丈至百丈',
      '抬头仅见一线天'
    ],
    vegetation: [
      '谷底植被异常繁茂（因水汽充沛且少日照）',
      '藤蔓密布',
      '崖壁附生蕨类与苔藓',
      '偶见兰花附石而生'
    ],
    geography: [
      '河流切割形成',
      '常见瀑布（从崖顶跌落）',
      '深潭（瀑下积水）',
      '溶洞入口（崖壁开口）'
    ],
    cultivationElements: [
      '谷底阴气重，常有阴属性灵物生长（阴灵芝、九幽草）',
      '也有毒虫（蜈蚣、蝎子、毒蛇）',
      '可能藏有秘宝或封印（古人藏物处）'
    ],
    possibleEvents: [
      { id: 'toxic_fog', name: '毒瘴', description: '遭遇谷底沼气形成的毒瘴' },
      { id: 'secret_realm', name: '秘境入口', description: '发现岩壁暗门通向秘境' },
      { id: 'poison_insect_swarm', name: '毒虫围攻', description: '被蜈蚣、蝎子、毒蛇围攻' },
      { id: 'ancient_cave', name: '古修洞府', description: '发现崖壁上的古修洞府' }
    ],
    dangerLevel: 'medium_high',
    dangerLevelNum: 3,
    spiritDensity: 15,
    resourceOutputs: [
      { id: 'yin_herb', name: '阴属性灵药', description: '阴灵芝、九幽草等阴属性灵药', harvestDifficulty: 7, respawnTime: 600, amount: 1 },
      { id: 'exposed_ore', name: '暴露矿石', description: '峡谷冲刷暴露的稀有矿石', harvestDifficulty: 5, respawnTime: 500, amount: 1 },
      { id: 'deep_pool_spirit_fish', name: '深潭灵鱼', description: '蕴含灵气的深潭鱼类', harvestDifficulty: 6, respawnTime: 400, amount: 1 }
    ],
    monsters: [
      { id: 'giant_centipede', name: '巨蜈', description: '巨大的蜈蚣', level: 4, spawnWeight: 30 },
      { id: 'scorpion', name: '毒蝎', description: '剧毒的蝎子', level: 4, spawnWeight: 30 },
      { id: 'poison_snake', name: '毒蛇', description: '各种剧毒蛇类', level: 3, spawnWeight: 40 }
    ],
    transitionTerrain: ['mid_mountain', 'high_mountain', 'mist_swamp']
  },
  {
    id: 'alluvial_plain',
    name: '冲积平原',
    category: 'plain',
    visualFeatures: [
      '地势平坦开阔，一马平川',
      '土壤呈深褐色（肥沃）',
      '河流蜿蜒如带',
      '视野极远可达天际线'
    ],
    vegetation: [
      '以草本植物为主（野草、野花）',
      '间有稀疏乔木（柳树、榆树）',
      '农田开垦痕迹明显（田埂、水渠）'
    ],
    geography: [
      '河网密布',
      '季节性泛滥形成牛轭湖（废弃河曲）',
      '沼泽边缘（湿地）',
      '土层极厚（数丈）'
    ],
    cultivationElements: [
      '平原上散落着古代文明的遗迹（石碑半埋土中、祭坛残基长满荒草）',
      '某些区域地脉灵气汇聚（宜立门派）'
    ],
    possibleEvents: [
      { id: 'merchant_caravan', name: '行商队伍', description: '遇见驼队或车队' },
      { id: 'abandoned_village', name: '废弃村庄', description: '发现废弃村庄的遗骸' },
      { id: 'bandits', name: '马贼流寇', description: '遭遇马贼或流寇' },
      { id: 'ancient_stele', name: '古碑', description: '发现刻有文字的古碑' }
    ],
    dangerLevel: 'low',
    dangerLevelNum: 1,
    spiritDensity: 4,
    resourceOutputs: [
      { id: 'grain', name: '粮食', description: '普通粮食作物', harvestDifficulty: 1, respawnTime: 300, amount: 2 },
      { id: 'spirit_grain', name: '灵谷', description: '蕴含灵气的谷物', harvestDifficulty: 3, respawnTime: 400, amount: 1 },
      { id: 'common_herb', name: '普通药材', description: '车前草、蒲公英等普通药材', harvestDifficulty: 1, respawnTime: 150, amount: 1 }
    ],
    monsters: [
      { id: 'wild_dog', name: '野狗', description: '流浪野狗', level: 1, spawnWeight: 50 },
      { id: 'rabbit', name: '野兔', description: '平原野兔', level: 1, spawnWeight: 50 }
    ],
    transitionTerrain: ['low_hills', 'grassland', 'evergreen_forest']
  },
  {
    id: 'grassland',
    name: '高草草原',
    category: 'plain',
    visualFeatures: [
      '一望无际的草海',
      '野草高过人腰（高者可及丈）',
      '风吹草低见兽群',
      '天际线与草海融为一体，天地苍茫'
    ],
    vegetation: [
      '以禾本科野草为主（狗尾草、芦苇、芒草）',
      '高者可达一丈',
      '散生灌木（锦鸡儿、柠条）',
      '雨季繁茂，旱季枯黄'
    ],
    geography: [
      '地势平缓起伏',
      '偶有孤丘（岩石风化残留）',
      '或巨石独立于原野'
    ],
    cultivationElements: [
      '成群的低阶凶兽在此游荡（角马群、剑齿野猪群、草原狼群）',
      '草原深处可能有太古遗种（独角兽、六牙象）'
    ],
    possibleEvents: [
      { id: 'beast_stampede', name: '兽群冲锋', description: '遭遇兽群冲锋，有被践踏的风险' },
      { id: 'ancient_battlefield', name: '古战场', description: '发现古战场遗骸，散落白骨与锈蚀兵器' },
      { id: 'lost_direction', name: '迷失方向', description: '草原无地标，容易迷失' },
      { id: 'grassland_bandits', name: '草原马贼', description: '遭遇草原马贼' }
    ],
    dangerLevel: 'medium',
    dangerLevelNum: 2,
    spiritDensity: 8,
    resourceOutputs: [
      { id: 'beast_hide_meat', name: '兽皮兽肉', description: '大量兽皮和兽肉', harvestDifficulty: 3, respawnTime: 250, amount: 2 },
      { id: 'wild_grain', name: '野生谷物', description: '草籽等可食野生谷物', harvestDifficulty: 2, respawnTime: 200, amount: 1 },
      { id: 'grassland_spirit_herb', name: '草原灵草', description: '草原特有的灵草', harvestDifficulty: 4, respawnTime: 350, amount: 1 }
    ],
    monsters: [
      { id: 'horned_horse', name: '角马', description: '长角的草原马', level: 2, spawnWeight: 40 },
      { id: 'saber_tooth_boar', name: '剑齿野猪', description: '獠牙如剑的野猪', level: 3, spawnWeight: 30 },
      { id: 'grassland_wolf', name: '草原狼', description: '草原狼群', level: 2, spawnWeight: 30 }
    ],
    transitionTerrain: ['alluvial_plain', 'ancient_forest', 'wasteland']
  },
  {
    id: 'evergreen_forest',
    name: '常绿阔叶林',
    category: 'forest',
    visualFeatures: [
      '四季常青，树冠层叠如盖',
      '林内光线斑驳（阳光透过叶隙洒落）',
      '地面覆盖厚厚落叶层',
      '干枯后踩上去沙沙作响'
    ],
    vegetation: [
      '以樟、楠、榕、青冈等常绿阔叶树为主',
      '林下灌木密集（杜鹃、山茶、南天竹）',
      '溪边长满蕨类与苔藓'
    ],
    geography: [
      '地表覆盖腐殖层（厚数寸，松软）',
      '溪流众多',
      '偶有沼泽化洼地（水洼、泥炭）'
    ],
    cultivationElements: [
      '灵气浓度中等',
      '有各种灵药（玉竹、黄精、天门冬）',
      '和凶兽（山魈、豺狼）',
      '是散修最常出没的地形'
    ],
    possibleEvents: [
      { id: 'find_herb', name: '发现灵药', description: '发现灵药，需辨识是否有毒' },
      { id: 'chased_by_beast', name: '被凶兽追赶', description: '被狍子或野猪追赶' },
      { id: 'meet_cultivator', name: '遇上修士', description: '遇上其他采药或历练的修士' },
      { id: 'hunter_cabin_forest', name: '猎户木屋', description: '发现猎户的林间小屋' }
    ],
    dangerLevel: 'medium',
    dangerLevelNum: 2,
    spiritDensity: 10,
    resourceOutputs: [
      { id: 'camphor_wood', name: '樟楠木', description: '珍贵的樟木楠木', harvestDifficulty: 4, respawnTime: 250, amount: 1 },
      { id: 'mushroom', name: '菌菇', description: '灵芝、香菇等菌菇', harvestDifficulty: 3, respawnTime: 200, amount: 1 },
      { id: 'spirit_herb_common', name: '普通灵药', description: '玉竹、黄精、天门冬等百年以下灵药', harvestDifficulty: 5, respawnTime: 400, amount: 1 },
      { id: 'beast_materials', name: '凶兽材料', description: '山魈、豺狼等凶兽材料', harvestDifficulty: 4, respawnTime: 300, amount: 1 }
    ],
    monsters: [
      { id: 'mountain_sprite', name: '山魈', description: '灵智较高的山魈', level: 3, spawnWeight: 35 },
      { id: 'jackal', name: '豺狼', description: '群居的豺狼', level: 3, spawnWeight: 65 }
    ],
    transitionTerrain: ['low_hills', 'mid_mountain', 'alluvial_plain', 'ancient_forest']
  },
  {
    id: 'ancient_forest',
    name: '原始密林',
    category: 'forest',
    visualFeatures: [
      '树木高耸入云（数人合抱，高数十丈）',
      '树冠完全遮蔽天空',
      '林内终年昏暗如黄昏',
      '雾气弥漫不散',
      '藤萝垂挂如蟒蛇',
      '空气中弥漫着腐朽与生机混合的气息'
    ],
    vegetation: [
      '巨木参天',
      '树干长满苔藓与附生植物（石韦、蕨类、兰花）',
      '藤本植物粗如手臂，缠绕树间',
      '倒木上生长着各色菌菇'
    ],
    geography: [
      '地表起伏不平，被巨树根系切割成台地状',
      '倒木与枯枝堆积如山',
      '腐殖层厚达一尺',
      '踩上去可陷至脚踝'
    ],
    cultivationElements: [
      '灵气浓郁（肉眼可见的雾气）',
      '有千年级别灵药（紫芝、千年何首乌）',
      '栖居着强大的太古遗种（龙蟒、金翅大鹏后裔）或妖修',
      '林间可能藏有远古战场（散落残兵）或封印'
    ],
    possibleEvents: [
      { id: 'ancient_being', name: '遭遇遗种', description: '遭遇妖修或太古遗种，高级别战斗' },
      { id: 'illusion_array', name: '误入幻阵', description: '误入天然或人为幻阵' },
      { id: 'ancient_ruins', name: '太古遗迹', description: '发现太古遗迹（残破祭坛）' },
      { id: 'tree_spirit', name: '树灵', description: '触发古木成精的树灵' }
    ],
    dangerLevel: 'extreme',
    dangerLevelNum: 5,
    spiritDensity: 25,
    resourceOutputs: [
      { id: 'rare_spirit_herb', name: '稀有灵药（千年以上）', description: '紫芝、千年何首乌等', harvestDifficulty: 12, respawnTime: 1200, amount: 1 },
      { id: 'spirit_wood', name: '灵木', description: '建木、龙骨木等珍贵灵木', harvestDifficulty: 10, respawnTime: 1000, amount: 1 },
      { id: 'spirit_stone', name: '灵石', description: '地表散落的灵石', harvestDifficulty: 8, respawnTime: 600, amount: 1 },
      { id: 'ancient_being_materials', name: '遗种材料', description: '太古遗种的鳞羽骨爪', harvestDifficulty: 15, respawnTime: 1500, amount: 1 }
    ],
    monsters: [
      { id: 'dragon_python', name: '龙蟒', description: '有龙族血脉的巨蟒', level: 8, spawnWeight: 20 },
      { id: 'golden_eagle', name: '金翅大鹏后裔', description: '金翅大鹏的后裔', level: 9, spawnWeight: 25 },
      { id: 'tree_demon', name: '树妖', description: '古木成精的树妖', level: 7, spawnWeight: 55 }
    ],
    transitionTerrain: ['mid_mountain', 'evergreen_forest', 'mist_swamp']
  },
  {
    id: 'mist_swamp',
    name: '迷雾沼泽森林',
    category: 'forest',
    visualFeatures: [
      '树木生长于水中或湿地',
      '水面倒映树影',
      '雾气终年不散（晨昏尤甚）',
      '光线穿过雾气呈乳白色',
      '整个环境如梦境般朦胧'
    ],
    vegetation: [
      '以水杉、落羽杉等耐水树种为主',
      '树干基部膨大（呼吸根）',
      '水生植物（芦苇、菖蒲、睡莲）繁茂',
      '水面浮萍如毯'
    ],
    geography: [
      '地表被浅水覆盖（深数寸至数尺）',
      '泥底松软易陷',
      '树根间有水道（可通木船）',
      '深处可达丈余'
    ],
    cultivationElements: [
      '阴气重，适合阴属性灵药生长（水灵芝、龙涎草）',
      '有沼泽凶兽（鳄蛟、巨蟒、毒蛙）',
      '可能有封印或禁制（水底古阵）'
    ],
    possibleEvents: [
      { id: 'mud_trap', name: '陷入泥沼', description: '陷入泥沼，行动受限', },
      { id: 'poison_attack', name: '毒物袭击', description: '被水蛭、毒蛇等毒物袭击' },
      { id: 'sunken_ruins', name: '沉没遗迹', description: '发现沉没遗迹的石柱露出水面' },
      { id: 'swamp_python', name: '沼泽巨蟒', description: '遭遇巨大的沼泽巨蟒' }
    ],
    dangerLevel: 'medium_high',
    dangerLevelNum: 3,
    spiritDensity: 14,
    resourceOutputs: [
      { id: 'yin_water_material', name: '阴属性灵材', description: '阴水珠等阴属性材料', harvestDifficulty: 7, respawnTime: 600, amount: 1 },
      { id: 'aquatic_spirit_herb', name: '水生灵药', description: '水灵芝、水龙骨等水生灵药', harvestDifficulty: 6, respawnTime: 500, amount: 1 },
      { id: 'water_cedar_wood', name: '水杉木', description: '珍贵的水杉木', harvestDifficulty: 5, respawnTime: 400, amount: 1 }
    ],
    monsters: [
      { id: 'crocodile_dragon', name: '鳄蛟', description: '鳄鱼与蛟龙的混血', level: 5, spawnWeight: 30 },
      { id: 'swamp_python', name: '沼泽巨蟒', description: '巨大的沼泽巨蟒', level: 5, spawnWeight: 40 },
      { id: 'poison_frog', name: '毒蛙', description: '巨毒的沼泽蛙', level: 4, spawnWeight: 30 }
    ],
    transitionTerrain: ['canyon', 'ancient_forest']
  },
  {
    id: 'river',
    name: '河流溪流',
    category: 'water',
    visualFeatures: [
      '水流蜿蜒流淌，两岸植被茂密',
      '水质清澈（山溪）或浑浊（下流）',
      '流速各异（上游急、下游缓）',
      '水面在阳光下波光粼粼'
    ],
    vegetation: [
      '菖蒲、水芹、芦苇',
      '河岸边水草丰茂',
      '水生植物（浮萍、荷花）'
    ],
    geography: [
      '水深：浅处及膝，深处数丈',
      '河床多为卵石（上游）或泥沙（下游）',
      '河道弯曲，有急流段和平缓段'
    ],
    cultivationElements: [
      '河中有灵鱼（鳞片发光）',
      '河蚌（可能产灵珠）',
      '河岸可能发现水属性灵药（菖蒲、水芹）',
      '河底沉有古物（前人遗落法器）'
    ],
    possibleEvents: [
      { id: 'water_beast', name: '遭遇水兽', description: '遭遇水蟒、鳄蛟、河怪' },
      { id: 'sunken_item', name: '发现沉物', description: '发现沉船或沉没法器' },
      { id: 'rest', name: '河边休整', description: '在河边休整补给' },
      { id: 'cross_river', name: '渡河遇险', description: '渡河时被急流冲走' }
    ],
    dangerLevel: 'medium',
    dangerLevelNum: 2,
    spiritDensity: 8,
    resourceOutputs: [
      { id: 'spirit_fish', name: '灵鱼', description: '鳞片发光的灵鱼，肉可食', harvestDifficulty: 3, respawnTime: 300, amount: 1 },
      { id: 'spirit_pearl', name: '灵珠', description: '河蚌内概率产出的灵珠', harvestDifficulty: 5, respawnTime: 600, amount: 1 },
      { id: 'water_spirit_stone', name: '水灵石', description: '蕴含水属性灵气的矿石', harvestDifficulty: 4, respawnTime: 400, amount: 1 }
    ],
    monsters: [
      { id: 'water_python', name: '水蟒', description: '栖息于河流的巨蟒', level: 3, spawnWeight: 30 },
      { id: 'river_crocodile', name: '河鳄', description: '河流中的鳄鱼', level: 4, spawnWeight: 40 },
      { id: 'river_monster', name: '河怪', description: '河流深处的神秘水怪', level: 5, spawnWeight: 30 }
    ],
    transitionTerrain: ['low_hills', 'alluvial_plain', 'lake']
  },
  {
    id: 'lake',
    name: '湖泊',
    category: 'water',
    visualFeatures: [
      '水面开阔无垠，水天一色',
      '远山倒映于湖面',
      '晨起水雾缭绕，傍晚霞光铺水',
      '湖心或有岛屿（翠绿一点）'
    ],
    vegetation: [
      '湖边芦苇、菖蒲',
      '湖心岛植被茂密',
      '水生植物（荷花、菱角）'
    ],
    geography: [
      '水深：深者可达数十丈至百丈',
      '湖水清澈（高山湖）或碧绿（低地湖）',
      '湖心可能有岛屿'
    ],
    cultivationElements: [
      '湖心岛可能藏有秘境或洞府（古修隐居）',
      '湖底有灵脉节点，孕育水属性法宝材料（万年寒铁）',
      '湖周灵气汇聚'
    ],
    possibleEvents: [
      { id: 'lake_monster', name: '湖中巨兽', description: '遭遇水蛟、鼍龙、巨大水蟒' },
      { id: 'lake_ruins', name: '湖心遗迹', description: '发现湖心遗迹（石殿露出水面）' },
      { id: 'underwater', name: '水下探宝', description: '水下探宝（需避水诀）' },
      { id: 'storm', name: '渡湖遇风浪', description: '渡湖时遭遇风浪，小船倾覆' }
    ],
    dangerLevel: 'medium_high',
    dangerLevelNum: 3,
    spiritDensity: 15,
    resourceOutputs: [
      { id: 'water_iron', name: '万年寒铁', description: '水属性灵矿，炼制法宝材料', harvestDifficulty: 8, respawnTime: 1000, amount: 1 },
      { id: 'ancient_mussel', name: '千年灵蚌', description: '可能产极品灵珠的千年灵蚌', harvestDifficulty: 6, respawnTime: 800, amount: 1 },
      { id: 'water_lotus', name: '水莲', description: '湖中生长的水属性灵药', harvestDifficulty: 5, respawnTime: 500, amount: 1 }
    ],
    monsters: [
      { id: 'water_dragon', name: '水蛟', description: '栖息于湖底的蛟龙', level: 6, spawnWeight: 30 },
      { id: 'crocodile_turtle', name: '鼍龙', description: '巨大的鼍龙', level: 7, spawnWeight: 25 },
      { id: 'giant_water_python', name: '巨大水蟒', description: '湖泊中的巨蟒', level: 5, spawnWeight: 45 }
    ],
    transitionTerrain: ['river', 'high_mountain', 'mist_swamp']
  },
  {
    id: 'waterfall',
    name: '瀑布深潭',
    category: 'water',
    visualFeatures: [
      '水流从高处跌落，白练垂挂',
      '水声轰鸣如雷',
      '水雾弥漫方圆数丈',
      '阳光照射时可见彩虹',
      '潭水幽深碧绿，深不见底'
    ],
    vegetation: [
      '潭边湿壁生长石斛、还魂草',
      '瀑布周边苔藓地衣',
      '水生植物（蕨类）'
    ],
    geography: [
      '瀑布后有水帘洞（常见，被水幕遮蔽）',
      '潭下有暗河或水洞（通向地下）',
      '崖壁陡峭，岩石湿滑'
    ],
    cultivationElements: [
      '水汽充沛（灵气浓度较高）',
      '常有水属性灵药（石斛、还魂草）生长于潭边湿壁',
      '潭底可能藏有古修遗物（封印或藏宝处）'
    ],
    possibleEvents: [
      { id: 'water_curtain_cave', name: '水帘洞', description: '探索水帘洞（需穿过水幕）' },
      { id: 'dive_pool', name: '潜入深潭', description: '潜入深潭（需避水诀）' },
      { id: 'pool_dragon', name: '潭蛟', description: '遭遇水属性凶兽（潭蛟）' },
      { id: 'ancient_writing_waterfall', name: '古修刻字', description: '发现崖壁上的古修刻字' }
    ],
    dangerLevel: 'medium',
    dangerLevelNum: 2,
    spiritDensity: 12,
    resourceOutputs: [
      { id: 'water_dendrobium', name: '石斛', description: '水属性灵药', harvestDifficulty: 5, respawnTime: 400, amount: 1 },
      { id: 'water_dragon_bone', name: '水龙骨', description: '水属性灵材', harvestDifficulty: 6, respawnTime: 500, amount: 1 },
      { id: 'underground_ore', name: '暗河矿石', description: '冲刷入潭的矿石', harvestDifficulty: 4, respawnTime: 350, amount: 1 },
      { id: 'ancient_treasure', name: '潭底古物', description: '概率发现的古修遗物', harvestDifficulty: 8, respawnTime: 800, amount: 1 }
    ],
    monsters: [
      { id: 'pool_dragon', name: '潭蛟', description: '潭中的蛟龙', level: 5, spawnWeight: 50 },
      { id: 'water_sprite', name: '水精灵', description: '水属性灵物', level: 3, spawnWeight: 50 }
    ],
    transitionTerrain: ['mid_mountain', 'canyon', 'underground_river']
  },
  {
    id: 'underground_river',
    name: '地下暗河',
    category: 'water',
    visualFeatures: [
      '完全黑暗（必须携带照明工具）',
      '水流声在洞壁间回荡轰鸣',
      '钟乳石从洞顶垂下（形如冰锥）',
      '石笋从地面长出',
      '荧光菌类附着石壁，发出幽绿或淡蓝微光'
    ],
    vegetation: [
      '荧光菌类（幽绿/淡蓝）',
      '阴生植物（无阳光）',
      '苔藓地衣'
    ],
    geography: [
      '喀斯特地貌溶洞',
      '地下河流经其中',
      '支洞岔道极多（易迷路）',
      '部分洞段为涉水或乘船通行'
    ],
    cultivationElements: [
      '阴气重，适合阴属性/暗属性修炼',
      '可能有古修封印或墓葬（藏于洞中）',
      '暗河深处有盲鱼（无眼，可食）和暗河巨蟒'
    ],
    possibleEvents: [
      { id: 'cave_lost', name: '迷路', description: '岔路众多，容易迷路' },
      { id: 'cave_monster', name: '暗河凶兽', description: '遭遇盲鱼群、巨蟒' },
      { id: 'tomb_trap', name: '古墓机关', description: '触发古墓机关（石门箭弩）' },
      { id: 'cave_remains', name: '古修遗物', description: '发现古修遗物（遗骨旁）' }
    ],
    dangerLevel: 'medium_high',
    dangerLevelNum: 3,
    spiritDensity: 14,
    resourceOutputs: [
      { id: 'glowing_ore', name: '荧光矿石', description: '可作为照明材料的矿石', harvestDifficulty: 3, respawnTime: 200, amount: 1 },
      { id: 'yin_grass', name: '阴生草', description: '暗属性灵药', harvestDifficulty: 6, respawnTime: 500, amount: 1 },
      { id: 'ancient_artifact_fragment', name: '古修遗物', description: '法器残件', harvestDifficulty: 7, respawnTime: 700, amount: 1 }
    ],
    monsters: [
      { id: 'blind_fish', name: '盲鱼', description: '无眼的暗河鱼类', level: 2, spawnWeight: 40 },
      { id: 'cave_python', name: '暗河巨蟒', description: '黑暗中的巨蟒', level: 5, spawnWeight: 40 },
      { id: 'cave_spirit', name: '洞灵', description: '溶洞中诞生的灵体', level: 4, spawnWeight: 20 }
    ],
    transitionTerrain: ['waterfall', 'canyon', 'ancient_ruins']
  },
  {
    id: 'desert',
    name: '荒漠',
    category: 'arid',
    visualFeatures: [
      '视野无垠，黄沙漫漫',
      '沙丘起伏如波浪',
      '天空无云，白昼炽热（沙面可烤熟鸡蛋）',
      '入夜骤冷（温差极大）',
      '风起时沙尘漫天'
    ],
    vegetation: [
      '骆驼刺、沙柳、胡杨等耐旱植物',
      '多聚集于绿洲边缘',
      '整体极稀少'
    ],
    geography: [
      '沙丘、沙坑',
      '偶尔的裸岩地（风蚀城堡）',
      '干涸河床（季节性洪水冲刷痕迹）',
      '绿洲（水源聚集区）'
    ],
    cultivationElements: [
      '沙暴可能带有灵力（风灵/土灵）',
      '地下可能埋有古城、古墓或灵石矿脉',
      '绿洲常有守护者（灵兽或修士）'
    ],
    possibleEvents: [
      { id: 'sandstorm', name: '沙暴', description: '遭遇沙暴（需寻找躲避）' },
      { id: 'oasis', name: '发现绿洲', description: '发现绿洲（补给点）' },
      { id: 'quicksand', name: '沙陷', description: '误入沙陷（流沙吞噬）' },
      { id: 'desert_ruins', name: '遗迹', description: '找到遗迹（露出沙面的石柱）' }
    ],
    dangerLevel: 'high',
    dangerLevelNum: 4,
    spiritDensity: 8,
    resourceOutputs: [
      { id: 'desert_ginseng', name: '沙参', description: '沙漠特有的灵药', harvestDifficulty: 5, respawnTime: 400, amount: 1 },
      { id: 'red_willow', name: '红柳花', description: '沙漠灵药', harvestDifficulty: 4, respawnTime: 350, amount: 1 },
      { id: 'desert_cistanche', name: '肉苁蓉', description: '珍贵的沙漠药材', harvestDifficulty: 6, respawnTime: 500, amount: 1 },
      { id: 'wind_spirit_stone', name: '风灵石', description: '地表拾取的风属性灵石', harvestDifficulty: 3, respawnTime: 250, amount: 1 },
      { id: 'ruins_item', name: '遗迹遗物', description: '古城残骸中的器物', harvestDifficulty: 7, respawnTime: 600, amount: 1 }
    ],
    monsters: [
      { id: 'sand_worm', name: '沙虫', description: '潜伏于沙中的巨虫', level: 5, spawnWeight: 30 },
      { id: 'desert_eagle', name: '沙漠鹰', description: '翱翔于沙漠上空的猛禽', level: 4, spawnWeight: 35 },
      { id: 'sand_lizard', name: '沙蜥', description: '沙漠中的巨型蜥蜴', level: 3, spawnWeight: 35 }
    ],
    transitionTerrain: ['grassland', 'gobi', 'salt_flat']
  },
  {
    id: 'gobi',
    name: '戈壁',
    category: 'arid',
    visualFeatures: [
      '地面覆盖碎石砾石（大小不一）',
      '颜色灰褐或红褐色',
      '风蚀作用形成奇特地貌（岩柱如塔、风蚀洞如窗）',
      '寸草不生，荒凉寂寥'
    ],
    vegetation: [
      '极少，偶有苔藓地衣附着于岩石背阴面'
    ],
    geography: [
      '地表为岩石风化层（厚数寸至数尺）',
      '地下可能有盐层或金属矿脉（铜铁）',
      '风蚀地貌（岩柱、风蚀洞）'
    ],
    cultivationElements: [
      '荒凉环境中往往有遗落的古修遗迹（因无人烟而保存较好）',
      '风灵石散落地表（风化剥落）'
    ],
    possibleEvents: [
      { id: 'gobi_cave', name: '古修洞府', description: '发现掩埋于砾石下的古修洞府' },
      { id: 'gobi_beast', name: '风沙兽', description: '遭遇戈壁特有凶兽' },
      { id: 'gobi_lost', name: '迷路缺水', description: '迷路缺水（无地表水）' }
    ],
    dangerLevel: 'medium_high',
    dangerLevelNum: 3,
    spiritDensity: 6,
    resourceOutputs: [
      { id: 'gobi_wind_stone', name: '风灵石', description: '地表散落的风灵石', harvestDifficulty: 3, respawnTime: 200, amount: 1 },
      { id: 'metal_ore', name: '金属矿石', description: '铜铁锡等金属矿石', harvestDifficulty: 5, respawnTime: 350, amount: 1 },
      { id: 'gobi_artifact', name: '遗迹器物', description: '陶器铜器等古物', harvestDifficulty: 4, respawnTime: 300, amount: 1 }
    ],
    monsters: [
      { id: 'wind_beast', name: '风沙兽', description: '戈壁特有凶兽', level: 4, spawnWeight: 50 },
      { id: 'gobi_wolf', name: '戈壁狼', description: '适应戈壁环境的狼群', level: 3, spawnWeight: 50 }
    ],
    transitionTerrain: ['desert', 'salt_flat', 'high_mountain']
  },
  {
    id: 'salt_flat',
    name: '盐碱地',
    category: 'arid',
    visualFeatures: [
      '地表白色结晶（盐霜）',
      '反射阳光刺眼',
      '寸草不生',
      '地面龟裂成多边形',
      '空气干燥，风吹过时有盐粒飞扬'
    ],
    vegetation: [
      '几乎无植被'
    ],
    geography: [
      '古代湖泊干涸形成',
      '表层为盐壳（厚数寸至数尺）',
      '下为盐泥或淤泥层'
    ],
    cultivationElements: [
      '地下常有灵盐（炼丹必须材料）或盐矿中的灵晶（伴生）',
      '盐碱地可能有封印（利用盐的净化特性）'
    ],
    possibleEvents: [
      { id: 'salt_forbidden', name: '禁地', description: '闯入禁地（被盐阵困住）' },
      { id: 'salt_seal', name: '封印', description: '误触封印（盐层下刻阵）' },
      { id: 'salt_beast', name: '守矿凶兽', description: '遇见守矿凶兽（盐蜥、白蛇）' }
    ],
    dangerLevel: 'medium',
    dangerLevelNum: 2,
    spiritDensity: 5,
    resourceOutputs: [
      { id: 'spirit_salt', name: '灵盐', description: '炼丹必须材料', harvestDifficulty: 4, respawnTime: 400, amount: 2 },
      { id: 'salt_crystal', name: '灵晶', description: '盐矿伴生的灵晶', harvestDifficulty: 6, respawnTime: 600, amount: 1 },
      { id: 'common_salt', name: '盐矿', description: '普通盐', harvestDifficulty: 2, respawnTime: 150, amount: 3 }
    ],
    monsters: [
      { id: 'salt_lizard', name: '盐蜥', description: '适应盐碱地的蜥蜴', level: 3, spawnWeight: 40 },
      { id: 'white_snake', name: '白蛇', description: '白色的蛇类', level: 4, spawnWeight: 60 }
    ],
    transitionTerrain: ['desert', 'gobi', 'ancient_ruins']
  },
  {
    id: 'spirit_vein',
    name: '灵脉',
    category: 'special',
    visualFeatures: [
      '地表雾气缭绕（灵气浓郁到肉眼可见，呈白雾状）',
      '草木异常茂盛（叶大花艳）',
      '空气中弥漫清新气息',
      '无论四季，植物常绿'
    ],
    vegetation: [
      '灵植茂盛',
      '千年灵药随处可见',
      '草木叶大花艳'
    ],
    geography: [
      '地脉汇聚处',
      '可能是山头（灵山）、谷底（灵谷）或水底（灵泉眼）',
      '土壤中灵石碎片随处可见'
    ],
    cultivationElements: [
      '灵气浓度极高（修炼速度加倍）',
      '是建立洞府的绝佳地点',
      '吸引强大存在占据（妖修/凶兽）',
      '古人设下禁制（防止外人占用）'
    ],
    possibleEvents: [
      { id: 'spirit_cave', name: '洞府遗址', description: '发现前人修行的洞府遗址' },
      { id: 'spirit_guard', name: '守护兽', description: '遭遇被灵脉吸引来的强大存在' },
      { id: 'spirit_seal', name: '禁制', description: '触发禁制（误入封禁区域）' }
    ],
    dangerLevel: 'medium_high',
    dangerLevelNum: 3,
    spiritDensity: 35,
    resourceOutputs: [
      { id: 'high_purity_stone', name: '高纯度灵石', description: '上品以上灵石', harvestDifficulty: 4, respawnTime: 300, amount: 2 },
      { id: 'thousand_year_herb', name: '千年灵药', description: '数量多的千年灵药', harvestDifficulty: 8, respawnTime: 800, amount: 1 },
      { id: 'spirit_core', name: '灵脉核心', description: '可移动的灵泉', harvestDifficulty: 12, respawnTime: 1500, amount: 1 }
    ],
    monsters: [
      { id: 'spirit_guardian', name: '灵脉守护兽', description: '强大的守护兽', level: 8, spawnWeight: 40 },
      { id: 'spirit_demon', name: '灵修', description: '占据灵脉的妖修', level: 9, spawnWeight: 60 }
    ],
    transitionTerrain: ['low_hills', 'mid_mountain', 'lake', 'forest']
  },
  {
    id: 'fire_crack',
    name: '地火裂口',
    category: 'special',
    visualFeatures: [
      '地表裂缝中透出暗红色火光',
      '热气蒸腾（可感灼热）',
      '岩石呈暗红色或黑色（冷却的岩浆）',
      '地表有硫磺结晶（黄色）'
    ],
    vegetation: [
      '寸草不生',
      '裂缝边缘有耐热菌类（嗜热蕈）'
    ],
    geography: [
      '地壳裂缝',
      '深处有岩浆层（可见流动）',
      '地表有喷气孔（蒸汽出口）',
      '沸泥塘（翻滚的泥浆）'
    ],
    cultivationElements: [
      '火属性修炼的绝佳场所',
      '有火属性灵物（火灵石、火灵芝、赤铜矿）',
      '可能有炼器师潜居（利用地火炼器）'
    ],
    possibleEvents: [
      { id: 'fire_beast', name: '火兽', description: '遭遇火兽（岩浆蜥蜴、火鸦）' },
      { id: 'forge_ruins', name: '炼器遗址', description: '发现废弃的炼器遗址' },
      { id: 'forge', name: '地火炼器', description: '采集地火炼器（需耐热法器）' }
    ],
    dangerLevel: 'high',
    dangerLevelNum: 4,
    spiritDensity: 20,
    resourceOutputs: [
      { id: 'fire_spirit_stone', name: '火灵石', description: '高纯度火属性灵石', harvestDifficulty: 6, respawnTime: 400, amount: 2 },
      { id: 'fire_ganoderma', name: '火灵芝', description: '火属性灵药', harvestDifficulty: 8, respawnTime: 600, amount: 1 },
      { id: 'red_copper', name: '赤铜', description: '地火炼材', harvestDifficulty: 5, respawnTime: 350, amount: 1 },
      { id: 'fine_iron', name: '精铁', description: '优质铁矿', harvestDifficulty: 4, respawnTime: 300, amount: 1 }
    ],
    monsters: [
      { id: 'magma_lizard', name: '岩浆蜥蜴', description: '生活于岩浆中的蜥蜴', level: 6, spawnWeight: 40 },
      { id: 'fire_crow', name: '火鸦', description: '火属性的乌鸦', level: 5, spawnWeight: 60 }
    ],
    transitionTerrain: ['high_mountain', 'canyon', 'ancient_ruins']
  },
  {
    id: 'ancient_ruins',
    name: '太古遗迹',
    category: 'special',
    visualFeatures: [
      '残垣断壁散布',
      '倒塌的石柱半埋土中',
      '风化的雕塑面目模糊',
      '地面凹坑遍布（法力冲击形成的爆炸坑）',
      '大地上有黑焦色的裂纹',
      '夜间可能有磷火浮动（能量残留）'
    ],
    vegetation: [
      '杂草丛生',
      '藤蔓缠绕残垣',
      '苔藓覆盖石面'
    ],
    geography: [
      '结构散乱，建筑半埋于土',
      '有未被摧毁的地下部分（地宫、地下室）可能保存完好',
      '地面凹凸不平'
    ],
    cultivationElements: [
      '阵纹残余可能被触发（残留的法力）',
      '有封印未解（需特定条件打开）',
      '有遗落的法宝碎片（可拾取修复）',
      '夜间可能有磷火浮动（能量残留）'
    ],
    possibleEvents: [
      { id: 'ruins_array', name: '残阵', description: '触发残阵（陷入险境）' },
      { id: 'ruins_treasure', name: '古修遗物', description: '发现掩埋于土下的古修遗物' },
      { id: 'ruins_guardian', name: '守护灵', description: '遭遇遗迹守护灵（阵灵或怨灵）' }
    ],
    dangerLevel: 'high',
    dangerLevelNum: 4,
    spiritDensity: 18,
    resourceOutputs: [
      { id: 'artifact_fragment', name: '法宝碎片', description: '可修复的法宝碎片', harvestDifficulty: 8, respawnTime: 800, amount: 1 },
      { id: 'bone_text', name: '骨文残片', description: '功法传承残片', harvestDifficulty: 10, respawnTime: 1000, amount: 1 },
      { id: 'pill_residue', name: '丹药残渣', description: '仍有药力的丹药残渣', harvestDifficulty: 6, respawnTime: 600, amount: 1 },
      { id: 'ancient_knowledge', name: '太古秘闻', description: '石刻记载的太古秘闻', harvestDifficulty: 5, respawnTime: 500, amount: 1 }
    ],
    monsters: [
      { id: 'ruins_spirit', name: '阵灵', description: '遗迹中的阵灵', level: 7, spawnWeight: 30 },
      { id: 'ruins_ghost', name: '怨灵', description: '残留的怨灵', level: 6, spawnWeight: 40 },
      { id: 'ruins_beast', name: '遗迹凶兽', description: '守护遗迹的凶兽', level: 8, spawnWeight: 30 }
    ],
    transitionTerrain: ['ancient_forest', 'desert', 'underground_river']
  },
  {
    id: 'sealed_land',
    name: '封印之地',
    category: 'special',
    visualFeatures: [
      '被山脉、密林或迷雾环绕',
      '有明显的阵纹结界笼罩（结界光膜若隐若现，呈淡金或幽蓝色）',
      '环境异常压抑或祥和'
    ],
    vegetation: [
      '可能异常茂盛或寸草不生',
      '视封印内容而定'
    ],
    geography: [
      '被阵法改造过',
      '可能出现空间扭曲（外侧看与内侧不符）',
      '如外侧看是小山，内侧是巨谷'
    ],
    cultivationElements: [
      '封印着某种强大的存在（古魔/凶神）或力量（灾厄）',
      '或有逆天机缘（至宝）',
      '阵法强大，难以突破'
    ],
    possibleEvents: [
      { id: 'break_seal', name: '突破禁制', description: '尝试突破禁制（需破解阵法）' },
      { id: 'seal_backlash', name: '封印反噬', description: '被封印反噬（受伤或走火入魔）' },
      { id: 'release_sealed', name: '放出封印', description: '放出封印之物（引发灾难）' }
    ],
    dangerLevel: 'extreme',
    dangerLevelNum: 5,
    spiritDensity: 40,
    resourceOutputs: [
      { id: 'sealed_treasure', name: '封印之物', description: '未知，高风险高回报', harvestDifficulty: 15, respawnTime: 0, amount: 1 }
    ],
    monsters: [
      { id: 'sealed_monster', name: '封印之物', description: '强大的封印存在', level: 15, spawnWeight: 100 }
    ],
    transitionTerrain: ['high_mountain', 'ancient_forest', 'ancient_ruins']
  },
  {
    id: 'ancient_sacred_mountain',
    name: '太古神山',
    category: 'special',
    visualFeatures: [
      '山体呈紫金色（日出时）或碧玉色（日中时）',
      '祥云缭绕于山腰',
      '瀑布从山顶倒流而下（逆流）',
      '灵禽飞舞（仙鹤、青鸾）'
    ],
    vegetation: [
      '全为灵植，无凡木',
      '枝叶皆有光泽（灵气滋养）',
      '花朵常年盛开，果实饱满发亮'
    ],
    geography: [
      '山体通体灵石（整座山就是一块巨大灵石）',
      '泉水为灵液（可直接饮用增加修为）',
      '有巨大的道场（天然石台可容千人）'
    ],
    cultivationElements: [
      '祭灵或神明居所（有灵守护）',
      '有巨大的道场（天然石台可容千人）',
      '可能有太古传承（石碑刻字）'
    ],
    possibleEvents: [
      { id: 'worship', name: '朝拜祭灵', description: '朝拜祭灵（获得祝福）' },
      { id: 'trial', name: '接受考验', description: '接受考验（通过才能进入）' },
      { id: 'inheritance', name: '获得传承', description: '获得传承（习得古法）' }
    ],
    dangerLevel: 'medium',
    dangerLevelNum: 2,
    spiritDensity: 50,
    resourceOutputs: [
      { id: 'top_herb', name: '顶级灵药', description: '万年以上灵药', harvestDifficulty: 10, respawnTime: 1200, amount: 1 },
      { id: 'spirit_liquid', name: '灵液', description: '可炼丹或直接饮用的灵液', harvestDifficulty: 4, respawnTime: 200, amount: 2 },
      { id: 'blessing', name: '祭灵祝福', description: '临时增益效果', harvestDifficulty: 0, respawnTime: 3600, amount: 1 }
    ],
    monsters: [
      { id: 'sacred_bird', name: '灵禽', description: '仙鹤、青鸾等灵禽', level: 5, spawnWeight: 50 },
      { id: 'sacred_guardian', name: '神山守护', description: '守护神山的强大存在', level: 10, spawnWeight: 50 }
    ],
    transitionTerrain: ['high_mountain', 'spirit_vein']
  }
];

export function getTerrainById(id: string): TerrainDefinition | undefined {
  return WILDERNESS_TERRAIN_DEFINITIONS.find(t => t.id === id);
}

export function getTerrainsByCategory(category: TerrainCategory): TerrainDefinition[] {
  return WILDERNESS_TERRAIN_DEFINITIONS.filter(t => t.category === category);
}

export function getTransitionTerrains(id: string): TerrainDefinition[] {
  const terrain = getTerrainById(id);
  if (!terrain || !terrain.transitionTerrain) return [];
  return terrain.transitionTerrain.map(tid => getTerrainById(tid)).filter(Boolean) as TerrainDefinition[];
}
