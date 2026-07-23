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
  tier: 'outer' | 'imperial' | 'palace';
  category: 'wall' | 'gate' | 'street' | 'commercial' | 'public' | 'residential' | 'government' | 'palace' | 'cultivation';
  appearance: string;
  dimension: BuildingDimension;
  material: BuildingMaterial;
  layout: BuildingLayout;
  function: string;
  cultivationFeatures?: CultivationFeature[];
  locationHint?: string;
}

export const CAPITAL_BUILDING_DEFINITIONS: BuildingDefinition[] = [
  {
    id: 'outer_city_wall',
    name: '外城墙',
    tier: 'outer',
    category: 'wall',
    appearance: '高四丈，底宽两丈五，顶宽一丈二，双层包砖。内外两层青砖包砌，中间为版筑夯土芯。墙顶设雉堞和马道，每隔十丈设一藏兵洞。',
    dimension: { width: '底宽两丈五，顶宽一丈二', depth: '一丈五', height: '四丈' },
    material: {
      outer: '双层青砖包砌，砖缝糯米灰浆',
      inner: '版筑夯土芯（三合土）',
      roof: '无',
      foundation: '石砌基座'
    },
    layout: {
      rooms: ['藏兵洞'],
      sections: ['雉堞', '马道', '藏兵洞'],
      description: '墙顶马道宽一丈二，可行马车，每隔十丈设藏兵洞'
    },
    function: '外城防御屏障',
    cultivationFeatures: [
      {
        name: '防御阵纹',
        description: '墙砖内层刻满防御阵纹',
        effect: '每隔百丈设灵石柱基，可激发护城光幕'
      }
    ]
  },
  {
    id: 'outer_city_gate',
    name: '外城门',
    tier: 'outer',
    category: 'gate',
    appearance: '门洞三开——中间为御道，两侧为行人通道。城门铁皮包厚木，铜钉九行九列。城楼面阔五间，重檐歇山顶，总高五丈。',
    dimension: { width: '主洞两丈五，侧洞一丈五', depth: '一丈五', height: '城楼总高五丈' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌基座'
    },
    layout: {
      rooms: ['城楼底层', '城楼中层', '城楼顶层'],
      sections: ['门洞', '守城指挥室', '观景台'],
      description: '底层为门洞通道，中层为指挥室设沙盘，顶层为弩炮阵地'
    },
    function: '外城主要出入口、御道',
    cultivationFeatures: [
      {
        name: '千斤闸',
        description: '城门上方设铁铸千斤闸，厚三寸',
        effect: '危急时可放下阻挡敌人'
      }
    ]
  },
  {
    id: 'outer_wengcheng',
    name: '瓮城',
    tier: 'outer',
    category: 'wall',
    appearance: '半圆形或方形小城，位于城门外侧，半径五丈至十丈。四周设藏兵室，内门为第二道城门。',
    dimension: { width: '半径五丈至十丈', depth: '同', height: '三丈五' },
    material: {
      outer: '青砖',
      inner: '夯土',
      roof: '无',
      foundation: '石砌'
    },
    layout: {
      rooms: ['藏兵室'],
      sections: ['外门', '内门', '藏兵室'],
      description: '诱敌深入后关闭内外门围歼'
    },
    function: '城门防御增强，瓮中捉鳖'
  },
  {
    id: 'outer_ditai',
    name: '敌台',
    tier: 'outer',
    category: 'wall',
    appearance: '城墙外侧突出的方形台，与城墙同高。突出三丈，宽两丈五。',
    dimension: { width: '两丈五', depth: '突出三丈', height: '四丈' },
    material: {
      outer: '青砖',
      inner: '夯土',
      roof: '无',
      foundation: '石砌'
    },
    layout: {
      rooms: [],
      sections: ['射口'],
      description: '三面射箭，消除射击死角'
    },
    function: '城墙防御工事，扩大射击范围'
  },
  {
    id: 'outer_jiaolou',
    name: '角楼',
    tier: 'outer',
    category: 'wall',
    appearance: '三层砖木结构，飞檐高翘，位于外城四角。',
    dimension: { width: '底径两丈', depth: '底径两丈', height: '三丈五' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌基座'
    },
    layout: {
      rooms: ['底层', '中层', '顶层'],
      sections: ['瞭望口', '箭窗'],
      description: '三层结构，可瞭望、驻兵、储箭'
    },
    function: '瞭望、驻兵、储箭'
  },
  {
    id: 'outer_moat',
    name: '外城护城河',
    tier: 'outer',
    category: 'wall',
    appearance: '宽五丈，深两丈五。两岸石砌护坡，水底暗设铁蒺藜。',
    dimension: { width: '五丈', depth: '两丈五', height: '河面至堤顶一丈' },
    material: {
      outer: '石砌护坡',
      inner: '河床泥底',
      roof: '无',
      foundation: '石砌堤岸'
    },
    layout: {
      rooms: [],
      sections: ['河道', '护坡'],
      description: '环绕外城的防御性河道'
    },
    function: '外城防御、排水',
    cultivationFeatures: [
      {
        name: '水属性阵纹',
        description: '河底刻水属性阵纹',
        effect: '可化水为冰或雾'
      }
    ]
  },
  {
    id: 'zhuque_street',
    name: '朱雀大街',
    tier: 'outer',
    category: 'street',
    appearance: '宽五十丈，南北贯穿全城，全长十里。青石板对缝铺砌，中间设御道高出两侧一尺。两侧植灵槐树，树下设青石坐凳。',
    dimension: { width: '五十丈', depth: '十里', height: '御道高出一尺' },
    material: {
      outer: '青石板（长六尺、宽三尺）',
      inner: '碎石夯土垫层',
      roof: '无',
      foundation: '素土夯实'
    },
    layout: {
      rooms: [],
      sections: ['御道', '人行道', '绿化带'],
      description: '城市中轴线，御道居中'
    },
    function: '城市中轴线，主要交通',
    cultivationFeatures: [
      {
        name: '灵石路灯',
        description: '灵槐树之间立石灯柱，顶嵌中品灵石',
        effect: '夜间如昼'
      }
    ]
  },
  {
    id: 'east_west_street',
    name: '东西横街',
    tier: 'outer',
    category: 'street',
    appearance: '宽二十丈，东西走向，连接东市与西市。',
    dimension: { width: '二十丈', depth: '贯穿全城', height: '平整' },
    material: {
      outer: '青石板',
      inner: '碎石夯土',
      roof: '无',
      foundation: '素土夯实'
    },
    layout: {
      rooms: [],
      sections: ['路面'],
      description: '连接东西两市的主干道'
    },
    function: '连接东市与西市'
  },
  {
    id: 'fang_wall',
    name: '里坊墙',
    tier: 'outer',
    category: 'wall',
    appearance: '夯土墙，高一丈八，厚三尺。每坊约三百步见方。',
    dimension: { width: '三百步见方', depth: '厚三尺', height: '一丈八' },
    material: {
      outer: '夯土',
      inner: '夯土',
      roof: '无',
      foundation: '素土夯实'
    },
    layout: {
      rooms: [],
      sections: ['坊门'],
      description: '每坊四面各设一门，早开晚闭'
    },
    function: '坊区边界，宵禁管理'
  },
  {
    id: 'ordinary_house_capital',
    name: '坊内民居',
    tier: 'outer',
    category: 'residential',
    appearance: '一进院或二进院，砖木结构，青瓦白墙。院门朝巷开，正对影壁。',
    dimension: { width: '两丈四', depth: '两丈四', height: '一丈六' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['堂屋', '卧房', '灶间'],
      sections: ['影壁', '院落'],
      description: '标准四合院格局'
    },
    function: '普通百姓居所'
  },
  {
    id: 'wealthy_house_capital',
    name: '坊内富户',
    tier: 'outer',
    category: 'residential',
    appearance: '三进院落，后花园。大门→影壁→一进（客厅）→二进（正房+厢房）→三进（书房+花园）。',
    dimension: { width: '四丈', depth: '十丈', height: '一丈八' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['大门', '客厅', '正房', '厢房', '书房'],
      sections: ['影壁', '前院', '中院', '后院', '花园'],
      description: '三进院格局，有后花园'
    },
    function: '富裕人家居所'
  },
  {
    id: 'dongshi',
    name: '东市',
    tier: 'outer',
    category: 'commercial',
    appearance: '南北三十丈，东西二十五丈。两层楼阁，雕梁画栋，门前悬挂灵石灯笼。',
    dimension: { width: '二十五丈', depth: '三十丈', height: '两丈五' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['店铺', '阁楼'],
      sections: ['灵材阁', '法器铺', '宝术斋', '古玩店', '绸缎庄'],
      description: '高端消费区，店铺多为两层'
    },
    function: '高端消费——灵材、法器、宝术卷轴、古籍'
  },
  {
    id: 'xishi',
    name: '西市',
    tier: 'outer',
    category: 'commercial',
    appearance: '南北三十丈，东西二十五丈。单层铺面，门前搭遮阳棚，胡商聚集。',
    dimension: { width: '二十五丈', depth: '三十丈', height: '一丈八' },
    material: {
      outer: '青砖或土坯',
      inner: '木构架',
      roof: '青瓦或茅草',
      foundation: '石砌或素土'
    },
    layout: {
      rooms: ['店铺'],
      sections: ['粮行', '铁匠铺', '布庄', '盐铺', '陶器店', '兽皮坊'],
      description: '民生消费区，异族商人云集'
    },
    function: '民生消费——兽皮、粮食、铁器、布匹'
  },
  {
    id: 'taixue',
    name: '太学',
    tier: 'outer',
    category: 'public',
    appearance: '三进院落，青瓦红墙。前院讲堂，中院斋房，后院藏书楼。',
    dimension: { width: '五丈', depth: '八丈', height: '藏书楼高三丈' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['讲堂', '斋房', '藏书楼'],
      sections: ['讲坛', '书库'],
      description: '前院讲堂可容百人，后院藏书楼三层'
    },
    function: '国家最高学府',
    cultivationFeatures: [
      {
        name: '灵树',
        description: '院中植一棵灵树',
        effect: '树下为弟子论道处，灵气浓郁'
      }
    ]
  },
  {
    id: 'yiguan',
    name: '医馆',
    tier: 'outer',
    category: 'public',
    appearance: '临街铺面，后院药房。大堂设诊桌数张，药房药柜百格。',
    dimension: { width: '一丈五', depth: '三丈', height: '一丈八' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['大堂', '药房', '病房'],
      sections: ['诊桌', '药柜'],
      description: '为平民诊病，低价售药'
    },
    function: '公共医疗'
  },
  {
    id: 'yicang',
    name: '义仓',
    tier: 'outer',
    category: 'public',
    appearance: '高墙大院，仓房多间。面宽六丈，进深八丈，仓房六间。',
    dimension: { width: '六丈', depth: '八丈', height: '两丈' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['仓房'],
      sections: ['储粮区'],
      description: '每间仓房储粮二百石'
    },
    function: '储粮备荒，灾年开仓放粮'
  },
  {
    id: 'daluo',
    name: '大牢',
    tier: 'outer',
    category: 'public',
    appearance: '石砌房屋，无窗，铁门。中间走廊，两侧各四间牢房。',
    dimension: { width: '三丈', depth: '四丈', height: '一丈八' },
    material: {
      outer: '青石',
      inner: '石砌',
      roof: '青石板',
      foundation: '石砌'
    },
    layout: {
      rooms: ['牢房'],
      sections: ['走廊'],
      description: '木栅门牢房，衙役轮值看守'
    },
    function: '监狱，关押犯人'
  },
  {
    id: 'imperial_city_wall',
    name: '皇城墙',
    tier: 'imperial',
    category: 'wall',
    appearance: '高四丈五，砖石砌筑，表面更精致。设三门，南门为正门端门。',
    dimension: { width: '底宽两丈', depth: '一丈五', height: '四丈五' },
    material: {
      outer: '青砖',
      inner: '夯土',
      roof: '无',
      foundation: '石砌基座'
    },
    layout: {
      rooms: [],
      sections: ['城门', '雉堞'],
      description: '第二重城墙，护卫衙署区'
    },
    function: '皇城防御屏障'
  },
  {
    id: 'liubu_yamen',
    name: '六部衙门',
    tier: 'imperial',
    category: 'government',
    appearance: '五进大院，青瓦白墙，门前石狮。面宽十丈，进深十五丈。',
    dimension: { width: '十丈', depth: '十五丈', height: '两丈' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['大门', '大堂', '二堂', '三堂', '四堂', '五堂'],
      sections: ['办公区', '议事区', '档案区', '官员居所', '库房'],
      description: '六部（吏户礼兵刑工）各占一座'
    },
    function: '中央政府机构办公'
  },
  {
    id: 'wangfu',
    name: '王府',
    tier: 'imperial',
    category: 'government',
    appearance: '朱漆大门，门楣悬金匾。前广场青石板铺地，内有演武厅、内院、密室、后花园。',
    dimension: { width: '十二丈', depth: '十五丈', height: '两丈' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['大门', '演武厅', '客厅', '密室', '灵厨'],
      sections: ['前广场', '内院', '后花园'],
      description: '贵族王侯府邸'
    },
    function: '王侯居住与办公',
    cultivationFeatures: [
      {
        name: '练功阵',
        description: '演武厅玄石地砖刻有练功阵',
        effect: '辅助修炼'
      }
    ]
  },
  {
    id: 'tailiao',
    name: '太庙',
    tier: 'imperial',
    category: 'public',
    appearance: '面阔七间，重檐歇山顶，红墙琉璃瓦。大殿供奉历代人皇牌位，配殿存放祭器。',
    dimension: { width: '十丈', depth: '六丈', height: '五丈' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '琉璃瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['大殿', '配殿'],
      sections: ['祭台'],
      description: '祭祀历代先皇'
    },
    function: '皇家宗庙祭祀'
  },
  {
    id: 'jixia_xuegong',
    name: '稷下学宫',
    tier: 'imperial',
    category: 'public',
    appearance: '围合式大院，正中讲堂，四周廊庑。讲堂面阔五丈，可容二百人听讲。',
    dimension: { width: '八丈', depth: '八丈', height: '两丈五' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['讲堂', '廊庑'],
      sections: ['讲坛'],
      description: '汇聚学者修士讲经论道'
    },
    function: '学术殿堂，论道讲学'
  },
  {
    id: 'palace_wall',
    name: '宫城墙',
    tier: 'palace',
    category: 'wall',
    appearance: '高三丈，汉白玉砌筑，墙顶琉璃瓦檐。正南门为午门，五开间门洞。',
    dimension: { width: '底宽一丈五', depth: '一丈', height: '三丈' },
    material: {
      outer: '汉白玉',
      inner: '汉白玉',
      roof: '琉璃瓦檐',
      foundation: '石砌基座'
    },
    layout: {
      rooms: [],
      sections: ['午门'],
      description: '最内层城墙，护卫人皇居所'
    },
    function: '宫城防御屏障'
  },
  {
    id: 'renhuang_dadian',
    name: '人皇大殿',
    tier: 'palace',
    category: 'palace',
    appearance: '面阔九间，重檐庑殿顶，黄色琉璃瓦。汉白玉台基高两丈五，设九十九级台阶。',
    dimension: { width: '十二丈', depth: '六丈', height: '七丈' },
    material: {
      outer: '青砖',
      inner: '楠木金柱',
      roof: '黄色琉璃瓦',
      foundation: '汉白玉台基'
    },
    layout: {
      rooms: ['大殿'],
      sections: ['金柱', '龙椅', '铜鹤铜龟', '暖玉地砖'],
      description: '金柱三十六根楠木朱漆描金，龙椅居中金丝楠木雕龙'
    },
    function: '人皇朝会、接见使节、大典',
    cultivationFeatures: [
      {
        name: '暖玉地砖',
        description: '地面铺暖玉地砖',
        effect: '冬暖夏凉'
      }
    ]
  },
  {
    id: 'piandian',
    name: '偏殿',
    tier: 'palace',
    category: 'palace',
    appearance: '面阔五间，歇山顶，青瓦。面宽五丈，进深三丈。',
    dimension: { width: '五丈', depth: '三丈', height: '两丈五' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['左偏殿', '右偏殿'],
      sections: ['奏章台'],
      description: '左右各一，处理日常政务'
    },
    function: '人皇批阅奏章、处理日常政务'
  },
  {
    id: 'jingwen_lou',
    name: '经文楼',
    tier: 'palace',
    category: 'palace',
    appearance: '方形七层石塔，青砖砌筑，木制飞檐。底宽四丈，高十丈。',
    dimension: { width: '四丈', depth: '四丈', height: '十丈' },
    material: {
      outer: '青砖',
      inner: '木楼板',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['第一层至第七层'],
      sections: ['藏书阁'],
      description: '每层藏书，第七层存放镇国经卷'
    },
    function: '存放皇家秘典、骨文经卷'
  },
  {
    id: 'baoshu_dian',
    name: '宝术殿',
    tier: 'palace',
    category: 'palace',
    appearance: '圆形穹顶建筑，石材墙体，青铜穹顶，铜门。直径六丈，高五丈。',
    dimension: { width: '六丈', depth: '六丈', height: '五丈' },
    material: {
      outer: '石材',
      inner: '铜穹顶',
      roof: '青铜穹顶',
      foundation: '石砌'
    },
    layout: {
      rooms: ['大殿'],
      sections: ['符文壁', '石台'],
      description: '内壁刻宝术符文，中央石台陈列拓本'
    },
    function: '存放镇国宝术拓本',
    cultivationFeatures: [
      {
        name: '宝术符文',
        description: '内壁刻宝术符文',
        effect: '增强宝术拓本的保存'
      }
    ]
  },
  {
    id: 'yuhua_yuan',
    name: '御花园',
    tier: 'palace',
    category: 'palace',
    appearance: '十五丈见方。太湖石假山高两丈，曲池养灵鱼，三座亭（八角亭、水榭、观景亭）。',
    dimension: { width: '十五丈', depth: '十五丈', height: '假山两丈' },
    material: {
      outer: '青石铺路',
      inner: '太湖石',
      roof: '亭顶青瓦',
      foundation: '素土'
    },
    layout: {
      rooms: ['八角亭', '水榭', '观景亭'],
      sections: ['假山', '曲池', '灵植区'],
      description: '珍稀草木——灵竹、朱果树、养魂草'
    },
    function: '皇家园林，休闲观景',
    cultivationFeatures: [
      {
        name: '灵植',
        description: '种植珍稀灵草灵木',
        effect: '灵气浓郁，可辅助修炼'
      }
    ]
  },
  {
    id: 'yushan_fang',
    name: '御膳房',
    tier: 'palace',
    category: 'palace',
    appearance: '长排大屋，烟囱林立。面宽八丈，进深三丈。',
    dimension: { width: '八丈', depth: '三丈', height: '两丈' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['灶房', '食材库房', '传膳厅'],
      sections: ['灶台'],
      description: '灶台十座，每日以凶兽肉、灵谷入膳'
    },
    function: '皇家膳食制作'
  },
  {
    id: 'neichao_fang',
    name: '内朝房',
    tier: 'palace',
    category: 'palace',
    appearance: '三排平房，每排十余间，每间面宽一丈二、进深一丈。',
    dimension: { width: '三丈', depth: '十五丈', height: '一丈六' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['候朝房'],
      sections: ['休息区', '更衣区'],
      description: '官员上朝前休息更衣'
    },
    function: '官员候朝处'
  },
  {
    id: 'hougong',
    name: '后宫',
    tier: 'palace',
    category: 'palace',
    appearance: '花园式院落群，占地二十丈见方。多座小殿错落分布，回廊相连，每座三开间+独立小花园。',
    dimension: { width: '二十丈', depth: '二十丈', height: '两丈' },
    material: {
      outer: '青砖',
      inner: '木构架',
      roof: '青瓦',
      foundation: '石砌'
    },
    layout: {
      rooms: ['寝殿', '小花园'],
      sections: ['回廊'],
      description: '人皇后妃居住'
    },
    function: '后妃居所'
  },
  {
    id: 'hucheng_dazhen',
    name: '护城大阵',
    tier: 'outer',
    category: 'cultivation',
    appearance: '灵石柱基每隔百丈一根，柱身阵纹金色。',
    dimension: { width: '柱径三尺', depth: '同', height: '两丈' },
    material: {
      outer: '灵石柱',
      inner: '符文刻石',
      roof: '无',
      foundation: '石砌基座'
    },
    layout: {
      rooms: [],
      sections: ['阵眼'],
      description: '沿外城城墙根埋设'
    },
    function: '护城光幕',
    cultivationFeatures: [
      {
        name: '金光屏障',
        description: '柱身阵纹金色',
        effect: '遇敌激发金光屏障'
      }
    ]
  },
  {
    id: 'feizhou_tai',
    name: '飞舟台',
    tier: 'palace',
    category: 'cultivation',
    appearance: '石砌高台，台面十丈见方，高两丈。',
    dimension: { width: '十丈', depth: '十丈', height: '两丈' },
    material: {
      outer: '青石',
      inner: '符文刻石',
      roof: '无',
      foundation: '石砌'
    },
    layout: {
      rooms: [],
      sections: ['起降区'],
      description: '宫城侧旁'
    },
    function: '灵禽/飞舟起降'
  },
  {
    id: 'xuankong_dao',
    name: '悬空岛',
    tier: 'palace',
    category: 'cultivation',
    appearance: '被阵法托起的小岛，直径五丈。岛上有一座小殿。',
    dimension: { width: '五丈', depth: '五丈', height: '悬空三丈' },
    material: {
      outer: '灵土',
      inner: '阵纹基石',
      roof: '小殿青瓦',
      foundation: '阵法托举'
    },
    layout: {
      rooms: ['小殿'],
      sections: ['灵草区'],
      description: '宫城上空'
    },
    function: '人皇闭关或祭灵居所',
    cultivationFeatures: [
      {
        name: '浮空阵法',
        description: '被阵法托起',
        effect: '悬浮在空中'
      }
    ]
  },
  {
    id: 'guanxing_tai',
    name: '观星台',
    tier: 'palace',
    category: 'cultivation',
    appearance: '汉白玉圆台直径三丈，上有铜浑仪。',
    dimension: { width: '三丈', depth: '三丈', height: '两丈' },
    material: {
      outer: '汉白玉',
      inner: '铜浑仪',
      roof: '无',
      foundation: '石砌'
    },
    layout: {
      rooms: [],
      sections: ['浑仪'],
      description: '宫城最高处'
    },
    function: '观测天象、推演气运'
  },
  {
    id: 'lingmai_jiedian',
    name: '灵脉节点',
    tier: 'palace',
    category: 'cultivation',
    appearance: '地下石室，灵气浓郁成雾。',
    dimension: { width: '四丈', depth: '四丈', height: '两丈' },
    material: {
      outer: '石砌',
      inner: '灵玉镶嵌',
      roof: '石穹顶',
      foundation: '灵脉之上'
    },
    layout: {
      rooms: ['修炼室'],
      sections: ['灵气池'],
      description: '宫城下方'
    },
    function: '人皇修炼之所',
    cultivationFeatures: [
      {
        name: '灵气浓郁',
        description: '灵气浓郁成雾',
        effect: '修炼效率倍增'
      }
    ]
  },
  {
    id: 'chuanxun_zhen',
    name: '传讯阵',
    tier: 'imperial',
    category: 'cultivation',
    appearance: '石砌圆台直径一丈，刻有传讯符文。',
    dimension: { width: '一丈', depth: '一丈', height: '一尺' },
    material: {
      outer: '青石',
      inner: '符文刻石',
      roof: '无',
      foundation: '石砌'
    },
    layout: {
      rooms: [],
      sections: ['阵台', '符文'],
      description: '皇城内'
    },
    function: '与全国各城远程通讯',
    cultivationFeatures: [
      {
        name: '传讯符文',
        description: '刻有传讯符文',
        effect: '跨城远程通讯'
      }
    ]
  }
];

export function getCapitalBuildingById(id: string): BuildingDefinition | undefined {
  return CAPITAL_BUILDING_DEFINITIONS.find(b => b.id === id);
}

export function getCapitalBuildingsByTier(tier: BuildingDefinition['tier']): BuildingDefinition[] {
  return CAPITAL_BUILDING_DEFINITIONS.filter(b => b.tier === tier);
}

export function getCapitalBuildingsByCategory(category: BuildingDefinition['category']): BuildingDefinition[] {
  return CAPITAL_BUILDING_DEFINITIONS.filter(b => b.category === category);
}
