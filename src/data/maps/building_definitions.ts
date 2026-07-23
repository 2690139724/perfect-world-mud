export interface BuildingDimension {
  width: string;
  depth: string;
  height: string;
}

export interface BuildingMaterial {
  outer: string;
  inner: string;
  roof: string;
  foundation: string;
}

export interface BuildingLayout {
  rooms: string[];
  sections: string[];
  description: string;
}

export interface CultivationFeature {
  name: string;
  description: string;
  effect: string;
}

export interface BuildingDefinition {
  id: string;
  name: string;
  category: 'wall' | 'gate' | 'street' | 'commercial' | 'public' | 'residential' | 'service' | 'entertainment' | 'transport';
  appearance: string;
  dimension: BuildingDimension;
  material: BuildingMaterial;
  layout: BuildingLayout;
  function: string;
  cultivationFeatures?: CultivationFeature[];
  locationHint?: string;
  variants?: string[];
}

export const BUILDING_DEFINITIONS: BuildingDefinition[] = [
  {
    id: 'city_wall',
    name: '城墙',
    category: 'wall',
    appearance: '夯土筑成，外包青砖，高约三丈。墙顶设雉堞和巡道，巡道宽五尺。墙基底部宽一丈二，顶部收窄至六尺，呈梯形截面。因城镇发展，城墙走向略有弯曲，依地势而建。',
    dimension: { width: '底部一丈二，顶部六尺', depth: '一丈二', height: '三丈' },
    material: {
      outer: '烧制青砖，砖缝以糯米灰浆勾缝',
      inner: '版筑夯土（三合土：黄土+石灰+砂石）',
      roof: '无',
      foundation: '石砌基座'
    },
    layout: {
      rooms: [],
      sections: ['雉堞', '巡道', '墙基'],
      description: '城墙顶部设有垛口供防御，巡道供守卫巡逻'
    },
    function: '防御外敌、兽潮，界定城镇范围',
    cultivationFeatures: [
      {
        name: '灵石埋设',
        description: '墙基每隔十丈埋设一块低阶灵石',
        effect: '提供基础能量'
      },
      {
        name: '防风符文',
        description: '墙砖内侧刻有简易防风符文',
        effect: '遇兽潮时可激发微光屏障'
      }
    ]
  },
  {
    id: 'city_gate',
    name: '城门',
    category: 'gate',
    appearance: '拱形门洞，上建城楼。门洞宽一丈五，高一丈八，深一丈二。两扇厚木门，外包铁皮，密布铜钉（九行九列）。城楼面阔三间，歇山顶，青瓦覆面。',
    dimension: { width: '一丈五', depth: '一丈二', height: '城楼高三丈' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌基座'
    },
    layout: {
      rooms: ['城楼'],
      sections: ['门洞', '城楼'],
      description: '城楼内设守城器械（弓弩、滚石、火油）'
    },
    function: '交通要冲、税收节点、防御前沿',
    cultivationFeatures: [
      {
        name: '灵镜探测',
        description: '门洞上方嵌有一块灵镜',
        effect: '可照出来者修为（简易探测）'
      }
    ]
  },
  {
    id: 'moat',
    name: '护城河',
    category: 'wall',
    appearance: '城墙外环绕的人工河道，宽两丈，深一丈二。两岸以石块砌护坡，河水引自附近河流，流速平缓。',
    dimension: { width: '两丈', depth: '一丈二', height: '河面至堤顶八尺' },
    material: {
      outer: '石块护坡',
      inner: '河床泥底',
      roof: '无',
      foundation: '石砌堤岸'
    },
    layout: {
      rooms: [],
      sections: ['河道', '护坡'],
      description: '环绕城墙一周的防御性河道'
    },
    function: '防御、排水、取水',
    cultivationFeatures: [
      {
        name: '净水莲',
        description: '河底植有净水莲',
        effect: '防止毒物投水'
      },
      {
        name: '沸汤阵',
        description: '阵法令河水化为沸汤',
        effect: '敌袭时可加热河水防御'
      }
    ]
  },
  {
    id: 'main_street',
    name: '主干道',
    category: 'street',
    appearance: '连接南北城门，宽三丈，青石板铺面，两侧设排水明沟。街道两旁店铺林立，招牌幡旗随风招展。',
    dimension: { width: '三丈', depth: '贯穿全城', height: '路面平整' },
    material: {
      outer: '青石板（长四尺、宽两尺）',
      inner: '碎石夯土垫层',
      roof: '无',
      foundation: '素土夯实'
    },
    layout: {
      rooms: [],
      sections: ['路面', '排水沟', '人行道'],
      description: '城镇最繁华的交通轴线'
    },
    function: '主要交通、商业枢纽',
    cultivationFeatures: [
      {
        name: '灵石路灯',
        description: '主干道两侧立石柱，柱高八尺，柱顶嵌低阶灵石',
        effect: '入夜自动发光，光照三丈范围'
      }
    ]
  },
  {
    id: 'secondary_street',
    name: '次干道',
    category: 'street',
    appearance: '连接东西城门，宽两丈，与南北大街十字相交。碎石夯土路面，两侧设简易排水。',
    dimension: { width: '两丈', depth: '贯穿全城', height: '路面平整' },
    material: {
      outer: '碎石夯土',
      inner: '素土夯实',
      roof: '无',
      foundation: '素土夯实'
    },
    layout: {
      rooms: [],
      sections: ['路面', '排水沟'],
      description: '次要交通干道'
    },
    function: '辅助交通、连接各坊区'
  },
  {
    id: 'lane',
    name: '巷道',
    category: 'street',
    appearance: '从主干道分出的次级通道，宽一丈至一丈五，多为土路或碎石路，延伸进各居民区。两侧为民居院墙。',
    dimension: { width: '一丈至一丈五', depth: '不定', height: '路面平整' },
    material: {
      outer: '素土夯实或碎石',
      inner: '素土',
      roof: '无',
      foundation: '素土'
    },
    layout: {
      rooms: [],
      sections: ['路面'],
      description: '居民区内部通道'
    },
    function: '居民出行、邻里往来'
  },
  {
    id: 'fang_gate',
    name: '坊门',
    category: 'gate',
    appearance: '木制大门或四柱牌坊，上书坊名。坊门高两丈，宽一丈五，立柱为石质，横梁为木质。',
    dimension: { width: '一丈五', depth: '八尺', height: '两丈' },
    material: {
      outer: '青石立柱，木质横梁',
      inner: '木构件',
      roof: '青瓦（牌坊式无）',
      foundation: '石砌基座'
    },
    layout: {
      rooms: [],
      sections: ['立柱', '横梁', '匾额'],
      description: '坊区入口标志'
    },
    function: '坊区入口、夜间宵禁、标识地域'
  },
  {
    id: 'blacksmith_shop',
    name: '铁匠铺',
    category: 'commercial',
    appearance: '临街开间，门板拆开后炉火可见，墙上挂成品铁器。门口挂铁器招牌（刀剑、犁铧等），炉火映红半条街。',
    dimension: { width: '一丈二至一丈五', depth: '两丈至两丈四', height: '一丈八' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['铺面', '作坊'],
      sections: ['柜台', '火炉', '风箱', '铁砧', '淬火槽'],
      description: '前店后作坊格局'
    },
    function: '打造铁器、兵器、农具',
    locationHint: '炼器街'
  },
  {
    id: 'pill_shop',
    name: '丹药铺',
    category: 'commercial',
    appearance: '药香弥漫，店铺挂葫芦或药碾招牌。铺内柜台陈列丹药瓶罐，后堂有药碾、药臼、炒锅。',
    dimension: { width: '一丈二至一丈五', depth: '两丈至两丈四', height: '一丈八' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['铺面', '诊室', '药房'],
      sections: ['柜台', '药柜', '药碾', '药臼', '炒锅'],
      description: '前店后诊格局，药柜设百格抽屉'
    },
    function: '售卖丹药、诊病配药',
    locationHint: '丹药街'
  },
  {
    id: 'material_shop',
    name: '灵材铺',
    category: 'commercial',
    appearance: '售卖灵矿、兽骨、灵木、符纸等修炼材料，货物堆积至店门口。门口挂"灵"字旗。',
    dimension: { width: '一丈二至一丈五', depth: '两丈至两丈四', height: '一丈八' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['铺面', '库房'],
      sections: ['柜台', '货架', '储物架'],
      description: '前店后库格局'
    },
    function: '售卖修炼材料',
    locationHint: '灵材街'
  },
  {
    id: 'general_shop',
    name: '杂货铺',
    category: 'commercial',
    appearance: '售卖布匹、粮食、盐、铁锅、陶器等民生用品，摊位最密集。门口挂彩幡旗。',
    dimension: { width: '一丈二至一丈五', depth: '两丈至两丈四', height: '一丈八' },
    material: {
      outer: '青砖或土坯',
      inner: '木构架',
      roof: '青瓦或茅草',
      foundation: '石砌或素土'
    },
    layout: {
      rooms: ['铺面', '库房'],
      sections: ['柜台', '货架', '摊位'],
      description: '前店后库格局'
    },
    function: '售卖日常用品',
    locationHint: '杂货街'
  },
  {
    id: 'restaurant',
    name: '酒楼',
    category: 'commercial',
    appearance: '两层楼，门口挂彩幡旗，二楼有临窗座位。店内桌椅整齐，后厨飘出饭菜香气。',
    dimension: { width: '一丈五至两丈', depth: '两丈四至三丈', height: '两丈六' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['大堂', '雅间', '厨房'],
      sections: ['柜台', '桌椅', '灶台'],
      description: '一楼大堂散座，二楼雅间'
    },
    function: '餐饮、聚会',
    locationHint: '食肆街'
  },
  {
    id: 'market',
    name: '市集',
    category: 'commercial',
    appearance: '镇中心广场或主干道交叉口的开阔地带，临时木台或铺地布，摆卖农户自产的果蔬、兽皮、草药等。',
    dimension: { width: '十丈见方', depth: '十丈见方', height: '无' },
    material: {
      outer: '青石板或素土',
      inner: '素土',
      roof: '临时布棚',
      foundation: '素土夯实'
    },
    layout: {
      rooms: [],
      sections: ['摊位区', '通道'],
      description: '露天市场，逢五逢十开集'
    },
    function: '农产品交易、临时集市',
    locationHint: '镇中心广场'
  },
  {
    id: 'town_hall',
    name: '镇公所',
    category: 'public',
    appearance: '三开间衙堂，青瓦硬山顶，门前有照壁（砖砌，高三尺），两侧立石鼓。',
    dimension: { width: '三丈', depth: '四丈', height: '两丈' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['前堂', '后堂', '东西厢房'],
      sections: ['公案桌', '刑具架', '公座屏风'],
      description: '前堂办公，后堂居住，厢房为差役房和档案房'
    },
    function: '行政中心、司法处理、城镇管理',
    cultivationFeatures: [
      {
        name: '明镜高悬',
        description: '堂上悬挂"明镜高悬"匾额，实为一面低阶灵镜',
        effect: '可测谎'
      }
    ],
    locationHint: '城镇中心或主干道旁'
  },
  {
    id: 'post_station',
    name: '驿站',
    category: 'public',
    appearance: '两进院，前院为马厩与灶间，后院为客房。大门悬"驿"字牌。',
    dimension: { width: '三丈', depth: '五丈', height: '一丈八' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['前院', '马厩', '灶间', '通铺客房', '官员单间'],
      sections: ['石槽', '料仓', '茶灶', '大炕'],
      description: '前院接待，后院住宿'
    },
    function: '官员驿传、信使歇脚、商旅住宿',
    cultivationFeatures: [
      {
        name: '传信阵',
        description: '驿站设有小型传送阵',
        effect: '仅接收传信玉简，不可传送人'
      }
    ],
    locationHint: '城门内侧或主干道旁'
  },
  {
    id: 'spirit_shrine',
    name: '祭灵祠',
    category: 'public',
    appearance: '石砌殿堂，单檐歇山顶，正脊两端翘起，青瓦覆面。正殿供奉祭灵本体（如石山、古树、石兽）。',
    dimension: { width: '两丈四', depth: '三丈', height: '两丈二' },
    material: {
      outer: '青石',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['正殿', '左右耳室', '前庭'],
      sections: ['神龛', '香案', '铜炉'],
      description: '正殿供奉祭灵，耳室存放祭器，前庭为祭祀广场'
    },
    function: '城镇信仰核心、祭祀祈福、聚灵',
    cultivationFeatures: [
      {
        name: '聚灵阵',
        description: '正殿地面刻有聚灵阵纹',
        effect: '祭灵像常年萦绕微光'
      }
    ],
    locationHint: '十字街心或镇中高地'
  },
  {
    id: 'drum_tower',
    name: '鼓楼',
    category: 'public',
    appearance: '底层石砌，上层木构架大鼓，四面开敞。底宽一丈五，总高三丈。',
    dimension: { width: '一丈五', depth: '一丈五', height: '三丈' },
    material: {
      outer: '青石基座，木构上层',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['底层', '鼓室'],
      sections: ['大鼓', '楼梯'],
      description: '底层为基座，上层设大鼓'
    },
    function: '报时、预警',
    locationHint: '镇中心高处'
  },
  {
    id: 'ordinary_house',
    name: '普通民居',
    category: 'residential',
    appearance: '一进院，院门一间，院内正房三间。土坯墙或砖墙（下部砖、上部土坯），瓦顶或茅草顶。',
    dimension: { width: '两丈四', depth: '两丈四', height: '一丈六' },
    material: {
      outer: '土坯或青砖（下部）',
      inner: '木构架',
      roof: '茅草或青瓦',
      foundation: '素土夯实'
    },
    layout: {
      rooms: ['正房', '灶间'],
      sections: ['堂屋', '卧房', '土灶'],
      description: '中央堂屋会客用餐，两侧卧房，一侧附建灶间'
    },
    function: '普通居民住所'
  },
  {
    id: 'wealthy_house',
    name: '富户民居',
    category: 'residential',
    appearance: '二进院，门楼一间，有影壁。青砖墙，灰瓦顶，白灰粉刷。',
    dimension: { width: '三丈', depth: '六丈', height: '一丈八' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '灰瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['门楼', '前堂', '正房', '东西厢房'],
      sections: ['影壁', '前院', '后院'],
      description: '一进为前堂会客，二进为居住区域'
    },
    function: '富裕居民住所'
  },
  {
    id: 'shop_house',
    name: '商铺兼住宅',
    category: 'residential',
    appearance: '临街铺面（供营业），后院为居住区。敞开门板，设柜台、货架。',
    dimension: { width: '一丈二至一丈五', depth: '四丈', height: '一丈八' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['铺面', '后院', '正房', '灶间'],
      sections: ['柜台', '货架', '天井'],
      description: '前铺后宅格局，小天井采光'
    },
    function: '商铺经营兼家庭居住',
    locationHint: '主干道两侧'
  },
  {
    id: 'public_well',
    name: '公共水井',
    category: 'service',
    appearance: '石砌井栏高出地面两尺，井口设辘轳，井旁设洗衣石槽。',
    dimension: { width: '井口直径三尺', depth: '三至五丈', height: '井栏高两尺' },
    material: {
      outer: '青石',
      inner: '无',
      roof: '无',
      foundation: '石砌井壁'
    },
    layout: {
      rooms: [],
      sections: ['井栏', '辘轳', '石槽'],
      description: '公共取水点'
    },
    function: '居民取水、洗衣'
  },
  {
    id: 'mill',
    name: '磨坊',
    category: 'service',
    appearance: '土木结构，内设石磨（直径三尺至四尺）。临水而建，利用水力或畜力驱动。',
    dimension: { width: '两丈', depth: '两丈', height: '一丈八' },
    material: {
      outer: '土坯或青砖',
      inner: '木构架',
      roof: '茅草或青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['磨房'],
      sections: ['石磨', '水槽', '料仓'],
      description: '磨房内设大型石磨'
    },
    function: '粮食加工'
  },
  {
    id: 'pawnshop',
    name: '当铺',
    category: 'service',
    appearance: '门面窄，柜台高（齐胸），设铁栅栏。内部货架堆存质押物品。',
    dimension: { width: '一丈', depth: '两丈', height: '一丈八' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['铺面', '库房'],
      sections: ['柜台', '货架', '铁栅栏'],
      description: '高柜台保护，铁栅栏防盗'
    },
    function: '质押借贷、物品典当'
  },
  {
    id: 'bathhouse',
    name: '公共澡堂',
    category: 'service',
    appearance: '石砌大屋，内分男女池，引入热泉。',
    dimension: { width: '三丈', depth: '两丈', height: '一丈八' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['更衣间', '男池', '女池'],
      sections: ['浴池', '石凳'],
      description: '砖砌浴池，长两丈、宽一丈、深四尺'
    },
    function: '公共洗浴',
    variants: ['地热型', '普通型']
  },
  {
    id: 'stage',
    name: '戏台',
    category: 'entertainment',
    appearance: '木台高出地面四尺，顶上搭布棚，后台为演员更衣处。',
    dimension: { width: '两丈', depth: '一丈五', height: '两丈' },
    material: {
      outer: '木构',
      inner: '木构',
      roof: '布棚',
      foundation: '木柱石础'
    },
    layout: {
      rooms: ['戏台', '后台'],
      sections: ['台面', '布棚', '化妆间'],
      description: '露天戏台，三面观演'
    },
    function: '戏曲表演、节庆活动',
    locationHint: '集市广场或寺庙前'
  },
  {
    id: 'goulan',
    name: '勾栏瓦舍',
    category: 'entertainment',
    appearance: '围栏圈出一片区域，内有数个表演棚。',
    dimension: { width: '五丈', depth: '四丈', height: '无' },
    material: {
      outer: '木围栏',
      inner: '木棚',
      roof: '布棚',
      foundation: '素土夯实'
    },
    layout: {
      rooms: [],
      sections: ['表演棚', '观众区'],
      description: '多个表演区域，内容包括说书、杂耍、幻术'
    },
    function: '娱乐表演、休闲',
    locationHint: '镇中热闹处'
  },
  {
    id: 'brothel_low',
    name: '窑子',
    category: 'entertainment',
    appearance: '砖木两层小楼，挂红灯笼。一楼大堂摆方桌，供酒水。二楼隔间六至八间。',
    dimension: { width: '一丈五', depth: '两丈', height: '两丈六' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['大堂', '隔间'],
      sections: ['方桌', '床铺'],
      description: '一楼饮酒，二楼留宿'
    },
    function: '低档风月场所',
    locationHint: '偏街暗巷'
  },
  {
    id: 'gambling_stall',
    name: '赌摊',
    category: 'entertainment',
    appearance: '木台一张铺布，放骰盅。',
    dimension: { width: '八尺', depth: '八尺', height: '四尺' },
    material: {
      outer: '木台',
      inner: '木',
      roof: '无',
      foundation: '木腿'
    },
    layout: {
      rooms: [],
      sections: ['台面', '骰盅'],
      description: '临时赌摊'
    },
    function: '赌博娱乐',
    locationHint: '集市角落'
  },
  {
    id: 'stone_bridge',
    name: '石桥',
    category: 'transport',
    appearance: '三孔石拱桥，桥面铺石板，两侧设石栏。',
    dimension: { width: '一丈五', depth: '五丈', height: '拱高八尺' },
    material: {
      outer: '青石',
      inner: '青石',
      roof: '无',
      foundation: '石砌桥墩'
    },
    layout: {
      rooms: [],
      sections: ['桥面', '栏杆', '桥拱'],
      description: '跨河桥梁'
    },
    function: '过河通道'
  },
  {
    id: 'ferry',
    name: '渡口',
    category: 'transport',
    appearance: '河岸木平台，拴缆绳，备木船。',
    dimension: { width: '两丈', depth: '一丈', height: '无' },
    material: {
      outer: '木平台',
      inner: '木',
      roof: '无',
      foundation: '木桩'
    },
    layout: {
      rooms: [],
      sections: ['平台', '木船'],
      description: '河边摆渡点'
    },
    function: '摆渡行人、货物'
  },
  {
    id: 'beast_station',
    name: '兽车站',
    category: 'transport',
    appearance: '带顶棚的停靠区，设长凳供候车人坐。',
    dimension: { width: '两丈', depth: '三丈', height: '一丈六' },
    material: {
      outer: '木构',
      inner: '木构',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: [],
      sections: ['站台', '长凳', '拴兽桩'],
      description: '灵兽车停靠点'
    },
    function: '灵兽车停靠、乘客候车',
    locationHint: '城门外或主干道旁'
  },
  {
    id: 'spirit_transmission_array',
    name: '传送阵',
    category: 'transport',
    appearance: '石砌圆台直径六尺，刻有传送符文，阵眼嵌有灵石。',
    dimension: { width: '六尺', depth: '六尺', height: '一尺' },
    material: {
      outer: '青石圆台',
      inner: '符文刻石',
      roof: '无',
      foundation: '石砌'
    },
    layout: {
      rooms: [],
      sections: ['阵台', '阵眼', '符文'],
      description: '传送魔法阵'
    },
    function: '远距离传送',
    cultivationFeatures: [
      {
        name: '传送符文',
        description: '刻有传送符文',
        effect: '可传送人和物品'
      }
    ],
    locationHint: '驿站或特定地点'
  },
  {
    id: 'spirit_torch',
    name: '灵石路灯',
    category: 'service',
    appearance: '石柱高八尺，柱顶嵌低阶灵石（下品）。',
    dimension: { width: '一尺', depth: '一尺', height: '八尺' },
    material: {
      outer: '青石',
      inner: '无',
      roof: '无',
      foundation: '石砌基座'
    },
    layout: {
      rooms: [],
      sections: ['石柱', '灵石'],
      description: '街道照明设施'
    },
    function: '夜间照明',
    cultivationFeatures: [
      {
        name: '灵石发光',
        description: '柱顶嵌低阶灵石',
        effect: '入夜自动发光，光照三丈范围'
      }
    ],
    locationHint: '主干道两侧'
  },
  {
    id: 'sound_transmission_array',
    name: '传音阵',
    category: 'public',
    appearance: '镇中心立石镜一面。',
    dimension: { width: '三尺', depth: '一尺', height: '五尺' },
    material: {
      outer: '灵玉镜',
      inner: '符文刻石',
      roof: '无',
      foundation: '石砌基座'
    },
    layout: {
      rooms: [],
      sections: ['石镜', '符文'],
      description: '信息公告设施'
    },
    function: '张贴公告、任务，修士可感应查看',
    cultivationFeatures: [
      {
        name: '传音符文',
        description: '刻有传音符文',
        effect: '修士可远程感应公告内容'
      }
    ],
    locationHint: '镇中心'
  },
  {
    id: 'spirit_test_stone',
    name: '测灵石',
    category: 'public',
    appearance: '方形石碑，高一丈，宽三尺，刻有探测符文。',
    dimension: { width: '三尺', depth: '一尺', height: '一丈' },
    material: {
      outer: '灵玉',
      inner: '符文刻石',
      roof: '无',
      foundation: '石砌基座'
    },
    layout: {
      rooms: [],
      sections: ['石碑', '符文'],
      description: '修为检测设施'
    },
    function: '探测入门者修为',
    cultivationFeatures: [
      {
        name: '探测符文',
        description: '刻有探测符文',
        effect: '可显示来者修为境界'
      }
    ],
    locationHint: '城门口'
  }
];

export function getBuildingById(id: string): BuildingDefinition | undefined {
  return BUILDING_DEFINITIONS.find(b => b.id === id);
}

export function getBuildingsByCategory(category: BuildingDefinition['category']): BuildingDefinition[] {
  return BUILDING_DEFINITIONS.filter(b => b.category === category);
}
