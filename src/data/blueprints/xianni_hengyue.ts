import { ZoneBlueprintDB, IZoneBlueprint } from './BlueprintDB';
import { TerrainType } from '../../domain/entities/Room';

const XianniHengyueBlueprint: IZoneBlueprint = {
  id: 'xianni_hengyue',
  name: '恒岳派',
  type: 'mountain',
  description: '恒岳派，坐落于恒山之巅，是幽州境内有名的修仙门派。山门高耸，云雾缭绕，灵气充沛。派中弟子众多，分为外门、内门、核心弟子三个等级。恒岳派以剑修闻名，后山剑冢藏有历代先辈的佩剑与传承。',
  recommendedLevel: 3,
  entrances: [],
  specialRules: ['恒岳派', '宗门驻地', '禁止私斗'],
  rooms: [
    {
      id: 'hengyue_gate',
      name: '恒岳派山门',
      description: '一座高大的石牌坊矗立在山巅，上书"恒岳派"三个大字，笔锋苍劲有力，隐隐有剑气萦绕。牌坊两侧各有一尊石剑，插于山石之中，历经岁月风霜，仍散发着淡淡的威压。山门处常有外门弟子值守，盘问来往之人。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 30,
      exits: [
        { direction: '内', targetId: 'hengyue_plaza', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '南', targetId: 'hengyue_plaza', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: [],
      isSafeZone: true,
      details: [
        { id: 'gate_archway', name: '石牌坊', description: '高大的石牌坊，上书"恒岳派"三字，据传是恒岳派开山祖师亲手所书，蕴含着一丝剑意。', type: 'environment' },
        { id: 'gate_swords', name: '石剑', description: '牌坊两侧的石剑，是恒岳派的象征，据说内藏阵法，可御敌于山门之外。', type: 'environment' },
      ],
    },
    {
      id: 'hengyue_plaza',
      name: '恒岳广场',
      description: '一片开阔的青石广场，是恒岳派弟子日常集合、操练的地方。广场中央立着一根高耸的旗杆，上面悬挂着恒岳派的旗帜——青色旗帜上绣着一柄长剑。广场四周分布着各式殿宇，错落有致。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 35,
      exits: [
        { direction: '北', targetId: 'hengyue_main_hall', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '南', targetId: 'hengyue_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'hengyue_sutra_pavilion', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西', targetId: 'hengyue_outer_cave', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东北', targetId: 'hengyue_inner_cave', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西北', targetId: 'hengyue_back_mountain', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['zhang_hu_feng', 'tie_ye'],
      isSafeZone: true,
      details: [
        { id: 'plaza_flag', name: '派旗', description: '旗杆上的青色旗帜，绣着恒岳派的剑形标志，迎风招展，威风凛凛。', type: 'environment' },
        { id: 'plaza_ground', name: '演武场', description: '广场地面刻着淡淡的阵纹，是弟子们操练和切磋的地方，据说这些阵纹可缓冲灵力冲击。', type: 'environment' },
      ],
    },
    {
      id: 'hengyue_main_hall',
      name: '恒岳大殿',
      description: '恒岳派的主殿，气势恢宏，殿宇高耸，飞檐翘角。殿内供奉着恒岳派历代祖师的牌位，香烟缭绕。正中是掌门的宝座，两侧是长老的席位。大殿内灵气浓郁，是派中最重要的议事和祭祀场所。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 50,
      exits: [
        { direction: '南', targetId: 'hengyue_plaza', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['teng_hua_yuan'],
      isSafeZone: true,
      details: [
        { id: 'hall_throne', name: '掌门宝座', description: '大殿正中的掌门宝座，由千年灵木雕刻而成，散发着淡淡的灵光。只有恒岳派掌门才能坐于此。', type: 'environment' },
        { id: 'hall_ancestors', name: '祖师牌位', description: '大殿后方供奉的历代祖师牌位，每一块都散发着微弱的灵光，是恒岳派的根基所在。', type: 'lore' },
      ],
    },
    {
      id: 'hengyue_sutra_pavilion',
      name: '藏经阁',
      description: '一座三层高的古朴楼阁，飞檐翘角，古色古香。这里是恒岳派收藏典籍功法的地方，从基础的引气诀到高深的剑法秘籍，应有尽有。阁外有弟子把守，非本派弟子不得入内。阁内安静肃穆，只能听到翻书的声音。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 40,
      exits: [
        { direction: '西', targetId: 'hengyue_plaza', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['liu_wu_shi'],
      isSafeZone: true,
      details: [
        { id: 'sutra_floor1', name: '一楼典籍', description: '藏经阁一楼收藏着基础功法和普通典籍，外门弟子也可查阅。', type: 'environment' },
        { id: 'sutra_floor2', name: '二楼秘籍', description: '藏经阁二楼收藏着进阶功法和剑法秘籍，只有内门弟子以上才能进入。', type: 'secret', hint: '登上二楼...', requiredRealm: 4 },
        { id: 'sutra_floor3', name: '三楼珍本', description: '藏经阁三楼收藏着恒岳派的镇派功法和顶级剑典，只有核心弟子和长老才能查阅。', type: 'secret', hint: '登上三楼...', requiredRealm: 6 },
      ],
    },
    {
      id: 'hengyue_outer_cave',
      name: '外门弟子洞府区',
      description: '一片依山而建的洞府区，是外门弟子居住修炼的地方。洞府大小不一，都是在山壁上开凿而成。洞府前有一小块空地，供弟子日常活动。这里灵气比内门稍弱，但胜在清静，适合刚入门的弟子打基础。',
      terrain: TerrainType.CAVE,
      spiritDensity: 25,
      exits: [
        { direction: '东', targetId: 'hengyue_plaza', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['wang_lin', 'si_qiu', 'wang_hao'],
      isSafeZone: true,
      details: [
        { id: 'outer_caves', name: '外门洞府', description: '一排排开凿在山壁上的洞府，每间都不大，但五脏俱全，是外门弟子的居所。', type: 'environment' },
        { id: 'outer_training', name: '练功场', description: '洞府区前的空地上，有一些简易的练功设施，供外门弟子日常操练。', type: 'environment' },
      ],
    },
    {
      id: 'hengyue_inner_cave',
      name: '内门弟子洞府区',
      description: '内门弟子的洞府区，比外门要精致许多。洞府更大，灵气更浓郁，每间洞府都有聚灵阵辅助修炼。洞府之间有小路相连，路旁种着灵草仙花。这里居住着恒岳派的内门弟子，都是天资出众之辈。',
      terrain: TerrainType.CAVE,
      spiritDensity: 45,
      exits: [
        { direction: '西南', targetId: 'hengyue_plaza', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['liu_bing', 'li_mu_wan', 'mu_bing_mei'],
      isSafeZone: true,
      details: [
        { id: 'inner_caves', name: '内门洞府', description: '内门弟子的洞府更加宽敞，每间都配有聚灵阵，修炼效率远超外门。', type: 'environment' },
        { id: 'inner_garden', name: '灵药园', description: '洞府区旁有一片灵药园，种植着各种低阶灵药，供内门弟子取用。', type: 'interactive', hint: '采摘灵药...', interactionResult: '你在灵药园中小心翼翼地采了一株低阶灵药，药性温和，可用于炼制基础丹药。', rewardItemId: '低阶灵药', rewardAmount: 1 },
      ],
    },
    {
      id: 'hengyue_back_mountain',
      name: '后山剑冢',
      description: '恒岳派后山的一处禁地，葬着历代先辈的佩剑。剑冢四周布有阵法，剑气纵横，寻常弟子不敢靠近。据说剑冢深处藏有恒岳派的镇派神剑，以及先辈留下的剑道传承。此地灵气中蕴含着凌厉的剑意，长期在此修炼可淬炼剑心。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 60,
      exits: [
        { direction: '东南', targetId: 'hengyue_plaza', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: [],
      isSafeZone: false,
      details: [
        { id: 'sword_tombs', name: '剑冢', description: '满山插着各式各样的剑，有断剑、残剑、古剑，都是恒岳派历代先辈的佩剑，死后葬于此地。', type: 'environment' },
        { id: 'sword_intent', name: '剑意', description: '空气中弥漫着凌厉的剑意，修为不足者靠近会感到肌肤刺痛，甚至被剑气所伤。', type: 'lore' },
        { id: 'sword_heritage', name: '剑道传承', description: '传说剑冢最深处，藏着恒岳派开山祖师的佩剑和剑道传承，有缘者可得之。', type: 'secret', hint: '深入剑冢...', requiredRealm: 5 },
      ],
    },
  ]
};

ZoneBlueprintDB.register(XianniHengyueBlueprint);
