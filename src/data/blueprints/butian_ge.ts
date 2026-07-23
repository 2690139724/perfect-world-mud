import { ZoneBlueprintDB, IZoneBlueprint } from './BlueprintDB';
import { TerrainType } from '../../domain/entities/Room';

const ButianGeBlueprint: IZoneBlueprint = {
  id: 'butian_ge',
  name: '补天阁',
  type: 'city',
  description: '荒域三大宗门之一，传承自上古补天术。宗门坐落在群山之间，云雾缭绕，灵气充沛。楼阁依山而建，气势恢宏。两座石山组成的山门巍峨肃穆，进入后广袤无比，秀山耸立，佳木葱茏，亭台楼阁错落有致。',
  recommendedLevel: 5,
  entrances: [
    { direction: '东', targetZoneId: 'wasteland', targetRoomId: 'wasteland_03' }
  ],
  specialRules: ['弟子入阁需先拜祖师像', '后山禁地需化灵境以上方可进入'],
  rooms: [
    {
      id: 'butian_ge_gate',
      name: '补天阁山门',
      description: '两座巨大的石山矗立在山道两侧，巍峨肃穆。石山上刻满了古老的符文，散发着淡淡的灵光。两山之间是一条宽阔的石阶路，通往宗门内部。石阶路尽头，悬挂着一块巨大的匾额，上书「补天阁」三个大字，笔力苍劲，隐隐透着威压。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 50,
      exits: [
        { direction: '内', targetId: 'butian_ge_avenue', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'wasteland_03', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [],
      resources: [],
      npcs: ['butian_elder'],
      isSafeZone: true,
      details: [
        { id: 'gate_stone_mountains', name: '山门石山', description: '两座巨大的石山，高约百丈，直插云霄。山体呈青灰色，表面光滑如镜，上面刻满了密密麻麻的符文。阳光照射下，符文闪闪发光，形成一道天然的屏障。', type: 'environment' },
        { id: 'gate_runes', name: '护山符文', description: '石山上刻满了护山符文，是上古传承下来的防御阵法。这些符文可抵御强大的攻击，寻常修士无法靠近。', type: 'environment' },
        { id: 'gate_stairs', name: '石阶路', description: '两山之间是一条宽阔的石阶路，由青石板铺成。石阶路蜿蜒向上，通往宗门内部。石阶上长满了青苔，显得古朴而久远。', type: 'environment' },
        { id: 'gate_plaque', name: '补天阁匾额', description: '石阶路尽头悬挂着一块巨大的匾额，由千年灵木制成。匾额上「补天阁」三个大字，是上古先贤亲手书写，笔力苍劲，隐隐透着威压。', type: 'environment' },
        { id: 'gate_view', name: '远景', description: '站在山门外，可远眺补天阁内部的景象。云雾缭绕中，一座座秀山若隐若现，山上佳木葱茏，亭台楼阁错落有致。', type: 'environment' },
      ],
    },
    {
      id: 'butian_ge_avenue',
      name: '天阶大道',
      description: '一条宽阔的大道，由青石板铺成。大道两旁种植着灵槐树，树干粗壮，枝叶繁茂。大道上不时有弟子走过，有的匆匆忙忙，有的悠闲漫步。大道尽头是一片开阔的广场。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 55,
      exits: [
        { direction: '外', targetId: 'butian_ge_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '内', targetId: 'butian_ge_square', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['butian_xiaoshidi'],
      isSafeZone: true,
      details: [
        { id: 'avenue_trees', name: '灵槐树', description: '大道两旁种植着灵槐树，树干粗壮，枝叶繁茂。灵槐树散发着淡淡的灵光，可净化空气，助修士静心。', type: 'environment' },
        { id: 'avenue_disciples', name: '弟子', description: '大道上不时有弟子走过，有的匆匆忙忙赶往演武场，有的悠闲漫步在树下。弟子们穿着统一的青色道袍，腰间挂着宗门令牌。', type: 'environment' },
        { id: 'avenue_architecture', name: '亭台楼阁', description: '大道两侧，依山而建有不少亭台楼阁。有的是供弟子休息的凉亭，有的是修炼用的阁楼，有的是存放典籍的书房。', type: 'environment' },
      ],
    },
    {
      id: 'butian_ge_square',
      name: '演武广场',
      description: '宽阔的青石广场上，数十名弟子正在习武。有的在练拳，有的在舞剑，有的在切磋，呼喝声此起彼伏。广场东侧矗立着一尊巨大的祖师像，弟子入阁需先拜祖师像。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 55,
      exits: [
        { direction: '外', targetId: 'butian_ge_avenue', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'butian_ge_hall', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'butian_ge_library', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西', targetId: 'butian_ge_danfang', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '南', targetId: 'butian_ge_founders_hall', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['butian_xiaoshidi'],
      isSafeZone: true,
      details: [
        { id: 'square_practice', name: '弟子习武', description: '广场上数十名弟子正在习武，有的练拳，有的舞剑，有的切磋。呼喝声此起彼伏，剑气纵横。', type: 'environment' },
        { id: 'square_stone', name: '演武石', description: '广场上有几块巨大的演武石，弟子们用来练习力量。石头上布满了拳印和剑痕，是历代弟子留下的痕迹。', type: 'environment' },
        { id: 'square_banners', name: '宗门旗帜', description: '广场四周插着几面大旗，上面绣着「补天阁」三个字。旗帜随风飘扬，气势恢宏。', type: 'environment' },
      ],
    },
    {
      id: 'butian_ge_founders_hall',
      name: '祖师殿',
      description: '一座古朴的大殿，供奉着补天阁历代祖师的神像。大殿中央是一尊巨大的祖师像，高达数丈，栩栩如生。弟子入阁需先拜祖师像，以示敬意。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 65,
      exits: [
        { direction: '北', targetId: 'butian_ge_square', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['butian_guardian'],
      isSafeZone: true,
      details: [
        { id: 'founder_statue', name: '祖师像', description: '大殿中央是一尊巨大的祖师像，高达数丈，栩栩如生。祖师身披道袍，手持法器，面容肃穆。雕像由整块灵玉雕刻而成，散发着淡淡的灵光。', type: 'environment' },
        { id: 'founder_incense', name: '香火', description: '祖师像前摆放着香炉，香火缭绕。弟子们入阁时都会上香祭拜，以示敬意。', type: 'environment' },
        { id: 'founder_tablets', name: '历代祖师牌位', description: '大殿两侧的墙壁上，摆放着历代祖师的牌位。每个牌位上都刻着祖师的名字和事迹，供后人瞻仰。', type: 'lore' },
        { id: 'founder_runes', name: '护殿符文', description: '大殿四周刻满了护殿符文，可防止外人亵渎祖师灵位。符文散发着淡淡的灵光，形成一道无形的屏障。', type: 'environment' },
        { id: 'founder_legend', name: '祖师传说', description: '补天阁祖师是上古时期的一位大能，曾参与补天之战。他留下的传承是补天阁的根基，也是弟子们修炼的指引。', type: 'lore' },
      ],
    },
    {
      id: 'butian_ge_hall',
      name: '议事大殿',
      description: '古朴的大殿中，十二根盘龙石柱支撑着穹顶。正面墙壁上刻着一幅巨大的壁画，描绘着上古补天之战。大殿中央，补天阁主端坐于主位之上，两侧坐着各位长老。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 65,
      exits: [
        { direction: '南', targetId: 'butian_ge_square', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '后', targetId: 'butian_ge_backhill', condition: '需化灵境', isHidden: true, travelCost: 0 }
      ],
      monsters: [],
      resources: [],
      npcs: ['butian_leader'],
      isSafeZone: true,
      details: [
        { id: 'hall_pillars', name: '盘龙石柱', description: '大殿中有十二根盘龙石柱，高约十丈，支撑着穹顶。柱子上刻着盘龙图案，栩栩如生，散发着淡淡的灵光。', type: 'environment' },
        { id: 'hall_mural', name: '补天壁画', description: '正面墙壁上刻着一幅巨大的壁画，描绘着上古补天之战。壁画上有各种神兽和修士，场面宏大，气势磅礴。', type: 'lore' },
        { id: 'hall_seat', name: '阁主宝座', description: '大殿中央有一座高大的宝座，由千年灵木制成，镶嵌着各种宝石。补天阁主端坐其上，威严无比。', type: 'environment' },
        { id: 'hall_elder', name: '长老席位', description: '大殿两侧摆放着长老席位，由各位长老坐席。席位整齐排列，显示出宗门的等级制度。', type: 'environment' },
      ],
    },
    {
      id: 'butian_ge_library',
      name: '藏经阁',
      description: '一座三层高的楼阁，里面摆满了各种古籍和功法卷轴。空气中弥漫着纸张和墨香的气息。楼阁依山而建，周围种满了灵竹，环境清幽。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 60,
      exits: [
        { direction: '西', targetId: 'butian_ge_square', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [],
      resources: [],
      npcs: ['butian_librarian'],
      isSafeZone: true,
      details: [
        { id: 'library_books', name: '古籍卷轴', description: '藏经阁内摆满了书架，书架上密密麻麻地排列着各种古籍和功法卷轴。有补天术的传承、各种宝术秘籍、修炼心得等。', type: 'environment' },
        { id: 'library_guard', name: '护经阵法', description: '藏经阁内设有护经阵法，可防止经书被偷或损坏。只有得到许可的弟子才能进入。', type: 'environment' },
        { id: 'library_bamboo', name: '灵竹园', description: '藏经阁周围种满了灵竹，竹叶青青，随风摇曳。灵竹散发着淡淡的灵光，可净化空气，助修士静心研读。', type: 'environment' },
        { id: 'library_secret', name: '秘典', description: '藏经阁第三层存放着补天阁最珍贵的秘典，只有阁主和少数长老才能翻阅。', type: 'secret', hint: '查阅秘典...', requiredRealm: 7 },
      ],
    },
    {
      id: 'butian_ge_danfang',
      name: '丹药司',
      description: '丹药司中热气腾腾，数座丹炉同时运转，火焰跳动。药架上摆满了各种珍稀药材，空气中弥漫着浓郁的丹药香味。丹药司依山而建，背后是一座秀山。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 55,
      exits: [
        { direction: '东', targetId: 'butian_ge_square', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [{ resourceId: 'spirit_herb', amount: 10, respawnTime: 600, harvestDifficulty: 2 }],
      npcs: ['butian_dan_elder'],
      isSafeZone: true,
      details: [
        { id: 'danfang_furnaces', name: '丹炉', description: '丹药司中有数座丹炉，由精铁铸成，上面刻着炼丹符文。丹炉内火焰跳动，正在炼制各种丹药。', type: 'environment' },
        { id: 'danfang_herbs', name: '药材', description: '药架上摆满了各种珍稀药材，有灵芝、灵菇、血参等。每种药材都有标注，方便炼丹师取用。', type: 'environment' },
        { id: 'danfang_steam', name: '药气', description: '丹药司内热气腾腾，空气中弥漫着浓郁的丹药香味。药气可助修士恢复体力和法力。', type: 'environment' },
        { id: 'danfang_mountain', name: '秀山', description: '丹药司背后是一座秀山，山上佳木葱茏，灵气充沛。山上有一处灵泉，是炼丹的绝佳水源。', type: 'environment' },
      ],
    },
    {
      id: 'butian_ge_backhill',
      name: '后山禁地',
      description: '补天阁的后山，灵气最为浓郁之地。山壁上刻满了上古符文，据说这里封印着某种强大的力量。周围设有禁制，寻常弟子不得入内。后山深处有一株古老的祭灵老藤，是补天阁的根基。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 80,
      exits: [
        { direction: '前', targetId: 'butian_ge_hall', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '深', targetId: 'butian_ge_old_vine', condition: '需化灵境', isHidden: true, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'spirit_fox', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 300 }
      ],
      resources: [{ resourceId: 'spirit_crystal', amount: 3, respawnTime: 3600, harvestDifficulty: 5 }],
      isSafeZone: false,
      details: [
        { id: 'backhill_runes', name: '上古符文', description: '山壁上刻满了上古符文，是补天阁的护山阵法的核心。符文散发着浓郁的灵光，可抵御强大的攻击。', type: 'environment' },
        { id: 'backhill_forbidden', name: '禁制', description: '后山设有强大的禁制，寻常弟子不得入内。只有阁主和长老才能进入后山深处。', type: 'environment' },
        { id: 'backhill_cave', name: '隐秘山洞', description: '后山有几处隐秘的山洞，据说里面藏着上古传承和珍贵宝物。但山洞被阵法封印，难以进入。', type: 'secret', hint: '探索山洞...', requiredRealm: 6 },
        { id: 'backhill_view', name: '山顶远眺', description: '站在后山山顶，可远眺补天阁全貌和周围的群山。云雾缭绕，如仙境一般。', type: 'environment' },
      ],
    },
    {
      id: 'butian_ge_old_vine',
      name: '祭灵老藤',
      description: '后山深处，生长着一株古老的祭灵老藤。老藤高达百丈，枝干粗壮如柱，上面缠绕着无数藤蔓。老藤散发着浓郁的灵光，是补天阁的根基和守护者。老藤根部有一颗葫芦种子，是重建补天阁的关键。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 90,
      exits: [
        { direction: '外', targetId: 'butian_ge_backhill', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [{ resourceId: 'vine_essence', amount: 1, respawnTime: 7200, harvestDifficulty: 8 }],
      isSafeZone: true,
      details: [
        { id: 'old_vine_main', name: '老藤本体', description: '祭灵老藤高达百丈，枝干粗壮如柱，上面缠绕着无数藤蔓。老藤通体碧绿，散发着浓郁的灵光。', type: 'environment' },
        { id: 'old_vine_leaves', name: '灵叶', description: '老藤上生长着灵叶，每片叶子都散发着灵光。灵叶可入药，是珍贵的炼丹材料。', type: 'environment' },
        { id: 'old_vine_seed', name: '葫芦种子', description: '老藤根部有一颗葫芦种子，散发着耀眼的灵光。这颗种子是补天阁覆灭后重建的关键，蕴含着强大的生命力。', type: 'secret', hint: '获取葫芦种子...', requiredRealm: 8 },
        { id: 'old_vine_legend', name: '老藤传说', description: '祭灵老藤是补天阁的守护者，从上古时期就生长在这里。据说它曾见证了补天之战，是补天阁最珍贵的宝藏。', type: 'lore' },
        { id: 'old_vine_ruins', name: '覆灭遗迹', description: '老藤周围散落着一些残破的建筑遗迹，是补天阁覆灭时留下的。断壁残垣中，隐约可见当年的辉煌。', type: 'lore' },
      ],
    },
    {
      id: 'butian_ge_xiushan',
      name: '秀山',
      description: '补天阁内部的一座秀山，山上佳木葱茏，灵气充沛。山上建有亭台楼阁，是弟子们休闲修炼的好去处。山顶有一座观星台，可远眺星空。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 65,
      exits: [
        { direction: '下', targetId: 'butian_ge_avenue', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '顶', targetId: 'butian_ge_star_view', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [{ resourceId: 'spirit_herb', amount: 8, respawnTime: 600, harvestDifficulty: 3 }],
      npcs: ['butian_xiaoshidi'],
      isSafeZone: true,
      details: [
        { id: 'xiushan_trees', name: '佳木', description: '秀山上长满了各种佳木，有灵槐、灵松、灵竹等。树木高大挺拔，散发着淡淡的灵光。', type: 'environment' },
        { id: 'xiushan_pavilion', name: '凉亭', description: '山上建有几座凉亭，由木搭建，周围种满了花草。弟子们喜欢在这里休息和交流。', type: 'environment' },
        { id: 'xiushan_spring', name: '灵泉', description: '山上有一处灵泉，泉水清澈甘甜，蕴含着浓郁的灵气。弟子们常来这里取水饮用。', type: 'environment' },
        { id: 'xiushan_path', name: '山间小路', description: '山上有蜿蜒的山间小路，由青石板铺成。小路两旁长满了花草，风景秀丽。', type: 'environment' },
      ],
    },
    {
      id: 'butian_ge_star_view',
      name: '观星台',
      description: '秀山山顶的一座观星台，由青石砌成。站在这里，可远眺星空，感悟天地法则。观星台上有一副古老的星图，是观星的指引。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 70,
      exits: [
        { direction: '下', targetId: 'butian_ge_xiushan', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: [],
      isSafeZone: true,
      details: [
        { id: 'star_view_platform', name: '观星台', description: '观星台由青石砌成，高约三丈。台上有石凳和石桌，供弟子们观星时使用。', type: 'environment' },
        { id: 'star_view_map', name: '星图', description: '观星台上刻着一副古老的星图，标注着各种星辰的位置和运行规律。星图散发着淡淡的灵光，是观星的指引。', type: 'lore' },
        { id: 'star_view_night', name: '夜景', description: '夜晚时分，站在观星台上，可远眺星空。繁星点点，银河横亘，美不胜收。', type: 'environment' },
        { id: 'star_view_meditation', name: '观星悟道', description: '弟子们常在这里观星悟道，感悟天地法则。据说上古先贤曾在这里领悟到补天术的精髓。', type: 'lore' },
      ],
    },
  ]
};

ZoneBlueprintDB.register(ButianGeBlueprint);
