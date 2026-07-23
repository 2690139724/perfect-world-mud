import { ZoneBlueprintDB, IZoneBlueprint, IRoomBlueprint } from '../../data/blueprints/BlueprintDB';
import { TerrainType } from '../entities/Room';
import { IGameTime, TimeOfDay, Season, isNight } from '../entities/GameTime';
import { CultivationRealm } from '../entities/Player';

export type CountryType = 'stone' | 'fire' | 'wood' | 'rain' | 'wind' | 'human';
export type SceneType = 'village' | 'town' | 'city' | 'megacity' | 'outpost' | 'camp' | 'mine' | 'post_station' | 'ruin' | 'sect' | 'battlefield' | 'fishing_village';
export type TerrainCategory = 'valley' | 'plain' | 'riverbank' | 'coast' | 'mountain' | 'desert' | 'forest';

export interface IBuildingLibrary {
  id: string;
  name: string;
  type: string;
  description: string;
  dimensions: { width: number; depth: number; height?: number };
  materials: string[];
  interior?: string;
  function: string;
  category: 'mandatory' | 'optional' | 'extension';
}

export interface ICountryConstraints {
  country: CountryType;
  materials: string[];
  architecturalStyle: string;
  worshipObject: string;
  specialFeatures: string[];
  terrainPreference: TerrainCategory[];
}

export interface ISceneGenerationParams {
  country: CountryType;
  sceneType: SceneType;
  terrain: TerrainCategory;
  variantRate?: number;
}

const countryConstraints: Record<CountryType, ICountryConstraints> = {
  stone: {
    country: 'stone',
    materials: ['巨石', '花岗岩', '夯土', '茅草'],
    architecturalStyle: '粗犷坚固，以石为基',
    worshipObject: '柳神',
    specialFeatures: ['祭灵台', '雷击柳', '兽骨祭品'],
    terrainPreference: ['valley', 'mountain', 'plain'],
  },
  fire: {
    country: 'fire',
    materials: ['火桑木', '火晶石', '赤红岩石', '烈焰砖'],
    architecturalStyle: '火红色调，火焰纹饰',
    worshipObject: '朱雀',
    specialFeatures: ['朱雀祭坛', '地火灶', '火桑古树'],
    terrainPreference: ['plain', 'mountain'],
  },
  wood: {
    country: 'wood',
    materials: ['千年古木', '圆木', '树皮', '藤蔓'],
    architecturalStyle: '树屋为主，自然融合',
    worshipObject: '古榕',
    specialFeatures: ['树屋', '蜂房', '古树祭坛'],
    terrainPreference: ['forest', 'mountain', 'riverbank'],
  },
  rain: {
    country: 'rain',
    materials: ['竹木', '茅草', '石料', '绳索'],
    architecturalStyle: '吊脚楼，竹木结构',
    worshipObject: '水潭',
    specialFeatures: ['水潭祭坛', '竹筏码头', '吊脚楼'],
    terrainPreference: ['riverbank', 'coast', 'plain'],
  },
  wind: {
    country: 'wind',
    materials: ['土坯', '夯土', '沙石板', '羊皮'],
    architecturalStyle: '厚墙小窗，防风设计',
    worshipObject: '泉眼',
    specialFeatures: ['泉眼祭坛', '防风围墙', '平顶屋'],
    terrainPreference: ['desert', 'plain'],
  },
  human: {
    country: 'human',
    materials: ['青砖', '汉白玉', '瓦', '木材'],
    architecturalStyle: '规整整齐，礼仪之邦',
    worshipObject: '祖龙',
    specialFeatures: ['祖龙坛', '村学', '青砖瓦房'],
    terrainPreference: ['plain', 'riverbank'],
  },
};

const buildingLibraries: Record<SceneType, IBuildingLibrary[]> = {
  village: [
    { id: 'altar', name: '祭灵台', type: '祭灵', description: '石砌祭灵台方形花岗岩台，底宽两丈四、顶宽两丈、高三尺', dimensions: { width: 2.4, depth: 2.0, height: 0.3 }, materials: ['花岗岩', '青石'], interior: '台面刻血槽，中央立祭灵本体', function: '祭祀中心，信仰圣地', category: 'mandatory' },
    { id: 'house_single', name: '单间石屋', type: '民居', description: '圆形乱石垒成，直径一丈二，檐高七尺', dimensions: { width: 1.2, depth: 1.2, height: 0.7 }, materials: ['乱石', '茅草'], interior: '中央火塘，一侧干草铺床', function: '单身猎人居住', category: 'mandatory' },
    { id: 'house_double', name: '双间石屋', type: '民居', description: '长方形乱石墙，面宽一丈八、进深一丈二', dimensions: { width: 1.8, depth: 1.2, height: 0.8 }, materials: ['乱石', '茅草'], interior: '外间灶台、内间石床', function: '三口之家居住', category: 'mandatory' },
    { id: 'house_triple', name: '三间石屋', type: '民居', description: '青石砌墙，面宽两丈四、进深一丈五', dimensions: { width: 2.4, depth: 1.5, height: 1.0 }, materials: ['青石', '瓦'], interior: '正中堂屋、东卧室、西储物', function: '大家族居住', category: 'mandatory' },
    { id: 'well', name: '公共水井', type: '公共', description: '石砌井栏高出地面两尺，井口直径三尺', dimensions: { width: 0.3, depth: 0.3 }, materials: ['石料', '木材'], interior: '井深四丈，井架木辘轳', function: '提供饮用水', category: 'mandatory' },
    { id: 'blacksmith', name: '铁匠棚', type: '工坊', description: '四柱茅草棚，宽一丈五、深一丈二', dimensions: { width: 1.5, depth: 1.2 }, materials: ['木材', '茅草'], interior: '砖砌火炉+木风箱+铁砧', function: '锻造武器和工具', category: 'optional' },
    { id: 'threshing', name: '晒谷场', type: '生产', description: '夯土平地宽五丈、深四丈', dimensions: { width: 5.0, depth: 4.0 }, materials: ['夯土'], interior: '边缘堆石碾', function: '晾晒粮食', category: 'optional' },
    { id: 'school', name: '村学', type: '教育', description: '石屋面宽三丈、进深两丈', dimensions: { width: 3.0, depth: 2.0, height: 1.0 }, materials: ['石料', '木材'], interior: '大堂木桌长凳+密室储物', function: '教育村民子弟', category: 'optional' },
    { id: 'fence', name: '村口木栅栏', type: '防御', description: '粗木并排竖立顶部削尖，宽一丈二、高八尺', dimensions: { width: 1.2, depth: 0.1, height: 0.8 }, materials: ['木材'], interior: '', function: '防御野兽', category: 'optional' },
    { id: 'herb_dryer', name: '草药晾晒架', type: '扩展', description: '木架四排每排长一丈、高五尺', dimensions: { width: 1.0, depth: 0.5, height: 0.5 }, materials: ['木材', '竹席'], interior: '上铺竹席', function: '晾晒草药', category: 'extension' },
    { id: 'beehive', name: '蜂房', type: '扩展', description: '悬挂树梢的木箱六至八只', dimensions: { width: 0.1, depth: 0.1, height: 0.1 }, materials: ['木材'], interior: '箱内有蜂巢板', function: '生产蜂蜜', category: 'extension' },
    { id: 'fire_stove', name: '地火灶', type: '扩展', description: '利用地底火焰的天然灶台', dimensions: { width: 0.5, depth: 0.5, height: 0.3 }, materials: ['岩石'], interior: '火焰喷射口', function: '做饭取暖', category: 'extension' },
    { id: 'raft_dock', name: '竹筏码头', type: '扩展', description: '河岸木平台两丈见方', dimensions: { width: 2.0, depth: 2.0 }, materials: ['木材'], interior: '延伸入水绑竹筏', function: '水上交通', category: 'extension' },
    { id: 'firepit', name: '公共火塘', type: '公共', description: '露天石砌圆坑直径五尺', dimensions: { width: 0.5, depth: 0.5 }, materials: ['石料'], interior: '周围摆条石坐凳', function: '取暖聚会', category: 'optional' },
    { id: 'graveyard', name: '村葬地', type: '殡葬', description: '乱石堆垒成圆形石冢', dimensions: { width: 1.0, depth: 1.0, height: 0.4 }, materials: ['乱石'], interior: '', function: '安葬逝者', category: 'optional' },
  ],
  town: [
    { id: 'city_wall', name: '城墙', type: '防御', description: '夯土主城墙梯形截面高两丈五', dimensions: { width: 1.2, depth: 0.5, height: 2.5 }, materials: ['夯土', '砖'], interior: '顶部有女墙垛口', function: '防御外敌', category: 'mandatory' },
    { id: 'spirit_temple', name: '祭灵祠', type: '宗教', description: '重檐歇山顶，面阔三间宽三丈', dimensions: { width: 3.0, depth: 2.0, height: 2.0 }, materials: ['石料', '木材', '瓦'], interior: '主殿设祭灵神像', function: '祭祀祭灵', category: 'mandatory' },
    { id: 'cross_street', name: '十字街', type: '交通', description: '碎石夯土路面宽两丈', dimensions: { width: 2.0, depth: 5.0 }, materials: ['碎石', '夯土'], interior: '', function: '交通枢纽', category: 'mandatory' },
    { id: 'yamen', name: '镇公所', type: '行政', description: '三开间衙门，面宽两丈四', dimensions: { width: 2.4, depth: 2.0, height: 1.2 }, materials: ['青砖', '瓦'], interior: '大堂办公+后宅', function: '处理政务', category: 'mandatory' },
    { id: 'market_square', name: '集市广场', type: '商业', description: '空地宽五丈、深五丈', dimensions: { width: 5.0, depth: 5.0 }, materials: ['碎石'], interior: '逢集日搭木台', function: '商品交易', category: 'mandatory' },
    { id: 'post_station', name: '驿站', type: '交通', description: '两进院宽四丈、进深六丈', dimensions: { width: 4.0, depth: 6.0 }, materials: ['木材', '砖瓦'], interior: '前院马厩+茶灶，后院客房', function: '驿马换乘', category: 'optional' },
    { id: 'blacksmith', name: '铁匠铺', type: '商业', description: '门面宽一丈五、进深两丈', dimensions: { width: 1.5, depth: 2.0, height: 1.0 }, materials: ['木材', '砖瓦'], interior: '前店后坊', function: '锻造交易', category: 'optional' },
    { id: 'herb_shop', name: '药铺', type: '商业', description: '门面宽一丈二、进深一丈五', dimensions: { width: 1.2, depth: 1.5, height: 1.0 }, materials: ['木材', '砖瓦'], interior: '柜台+药材架', function: '出售药材', category: 'optional' },
    { id: 'wine_shop', name: '酒肆', type: '商业', description: '门面宽一丈五、进深两丈', dimensions: { width: 1.5, depth: 2.0, height: 1.0 }, materials: ['木材', '砖瓦'], interior: '柜台+客座', function: '饮酒聚会', category: 'optional' },
    { id: 'inn', name: '客栈', type: '商业', description: '两进院宽三丈、进深四丈', dimensions: { width: 3.0, depth: 4.0 }, materials: ['木材', '砖瓦'], interior: '前堂+客房', function: '旅客住宿', category: 'optional' },
    { id: 'bathhouse', name: '公共澡堂', type: '服务', description: '宽两丈、进深一丈五', dimensions: { width: 2.0, depth: 1.5, height: 1.0 }, materials: ['石料', '木材'], interior: '浴池+更衣室', function: '沐浴清洁', category: 'extension' },
    { id: 'mill', name: '磨坊', type: '生产', description: '宽一丈五、进深一丈二', dimensions: { width: 1.5, depth: 1.2, height: 1.0 }, materials: ['石料', '木材'], interior: '大水车+石磨', function: '粮食加工', category: 'extension' },
    { id: 'pawnshop', name: '当铺', type: '商业', description: '门面宽一丈、进深一丈五', dimensions: { width: 1.0, depth: 1.5, height: 1.0 }, materials: ['木材', '砖瓦'], interior: '柜台+库房', function: '典当物品', category: 'extension' },
    { id: 'coffin_shop', name: '棺材铺', type: '商业', description: '门面宽一丈、进深一丈五', dimensions: { width: 1.0, depth: 1.5, height: 1.0 }, materials: ['木材'], interior: '棺材展示+制作区', function: '出售棺材', category: 'extension' },
  ],
  city: [
    { id: 'outer_wall', name: '外城墙', type: '防御', description: '夯土主城墙梯形截面高两丈五', dimensions: { width: 1.5, depth: 0.8, height: 2.5 }, materials: ['夯土', '砖'], interior: '顶部有女墙垛口', function: '外城防御', category: 'mandatory' },
    { id: 'inner_wall', name: '内城墙', type: '防御', description: '青砖砌筑城墙高两丈', dimensions: { width: 1.2, depth: 0.6, height: 2.0 }, materials: ['青砖'], interior: '顶部有敌台', function: '内城防御', category: 'mandatory' },
    { id: 'city_lord', name: '城主府', type: '行政', description: '三进大院宽五丈、进深八丈', dimensions: { width: 5.0, depth: 8.0 }, materials: ['青砖', '汉白玉', '瓦'], interior: '前厅办公+中堂会客+后宅居住', function: '城主办公居所', category: 'mandatory' },
    { id: 'main_temple', name: '主祭灵庙', type: '宗教', description: '重檐庑殿顶，面阔五间宽五丈', dimensions: { width: 5.0, depth: 3.5, height: 3.0 }, materials: ['石料', '木材', '琉璃瓦'], interior: '主殿设巨型祭灵神像', function: '主要祭祀场所', category: 'mandatory' },
    { id: 'east_market', name: '东市', type: '商业', description: '集市区域宽十丈、深八丈', dimensions: { width: 10.0, depth: 8.0 }, materials: ['碎石', '木材'], interior: '摊位密集', function: '商品交易', category: 'mandatory' },
    { id: 'west_market', name: '西市', type: '商业', description: '集市区域宽十丈、深八丈', dimensions: { width: 10.0, depth: 8.0 }, materials: ['碎石', '木材'], interior: '摊位密集', function: '商品交易', category: 'mandatory' },
    { id: 'residential', name: '里坊', type: '居住', description: '坊内民居整齐排列', dimensions: { width: 10.0, depth: 10.0 }, materials: ['青砖', '瓦'], interior: '多户民居', function: '居民居住', category: 'mandatory' },
    { id: 'academy', name: '府学', type: '教育', description: '三进院落宽四丈、进深六丈', dimensions: { width: 4.0, depth: 6.0 }, materials: ['青砖', '木材', '瓦'], interior: '讲堂+藏书楼', function: '教育官员子弟', category: 'optional' },
    { id: 'hospital', name: '医馆', type: '服务', description: '门面宽两丈、进深两丈', dimensions: { width: 2.0, depth: 2.0, height: 1.0 }, materials: ['木材', '砖瓦'], interior: '诊室+药房+病房', function: '治病救人', category: 'optional' },
    { id: 'granary', name: '义仓', type: '仓储', description: '土坯圆仓直径两丈、高三丈', dimensions: { width: 2.0, depth: 2.0, height: 3.0 }, materials: ['土坯'], interior: '储粮', function: '储备粮食', category: 'optional' },
    { id: 'bell_tower', name: '钟楼', type: '公共', description: '石砌底座木构上层高两丈五', dimensions: { width: 2.0, depth: 2.0, height: 2.5 }, materials: ['石料', '木材', '铜'], interior: '悬大铜钟', function: '报时警示', category: 'optional' },
    { id: 'drum_tower', name: '鼓楼', type: '公共', description: '石砌底座木构上层高两丈', dimensions: { width: 2.0, depth: 2.0, height: 2.0 }, materials: ['石料', '木材'], interior: '悬大鼓', function: '报时警示', category: 'optional' },
    { id: 'barbican', name: '瓮城', type: '防御', description: '城门外半圆形城墙', dimensions: { width: 5.0, depth: 5.0 }, materials: ['砖石'], interior: '', function: '增强城门防御', category: 'optional' },
    { id: 'enemy_platform', name: '敌台', type: '防御', description: '城墙上突出的平台', dimensions: { width: 3.0, depth: 2.0, height: 2.5 }, materials: ['砖石'], interior: '驻兵射箭', function: '防御射击', category: 'optional' },
    { id: 'red_light', name: '烟花巷', type: '娱乐', description: '街道宽一丈五', dimensions: { width: 1.5, depth: 10.0 }, materials: ['木材', '砖瓦'], interior: '妓院林立', function: '娱乐场所', category: 'extension' },
    { id: 'casino', name: '赌坊', type: '娱乐', description: '深宅大院宽三丈、进深四丈', dimensions: { width: 3.0, depth: 4.0, height: 1.2 }, materials: ['木材', '砖瓦'], interior: '赌桌+厢房', function: '赌博娱乐', category: 'extension' },
    { id: 'brothel', name: '青楼', type: '娱乐', description: '两层楼阁宽两丈、进深三丈', dimensions: { width: 2.0, depth: 3.0, height: 2.0 }, materials: ['木材', '砖瓦'], interior: '雅间+大厅', function: '高档娱乐', category: 'extension' },
  ],
  megacity: [
    { id: 'outer_wall', name: '外郭城', type: '防御', description: '巨大城墙高两丈五', dimensions: { width: 2.0, depth: 1.0, height: 2.5 }, materials: ['夯土', '砖'], interior: '108坊', function: '外城防御', category: 'mandatory' },
    { id: 'middle_wall', name: '皇城', type: '防御', description: '青砖城墙高三丈', dimensions: { width: 1.5, depth: 0.8, height: 3.0 }, materials: ['青砖'], interior: '六部+王府', function: '皇城防御', category: 'mandatory' },
    { id: 'inner_wall', name: '宫城', type: '防御', description: '白玉城墙高三丈五', dimensions: { width: 1.8, depth: 1.0, height: 3.5 }, materials: ['白玉石'], interior: '人皇殿+经文楼+宝术殿', function: '宫城防御', category: 'mandatory' },
    { id: 'human_emperor_hall', name: '人皇殿', type: '宫殿', description: '面阔九间宽九丈', dimensions: { width: 9.0, depth: 6.0, height: 4.0 }, materials: ['汉白玉', '黄金', '琉璃'], interior: '金銮殿+龙椅', function: '朝会大典', category: 'mandatory' },
    { id: 'scripture_tower', name: '经文楼', type: '文化', description: '五层木楼宽三丈、进深两丈四', dimensions: { width: 3.0, depth: 2.4, height: 5.0 }, materials: ['木材', '瓦'], interior: '藏书万卷', function: '收藏经文', category: 'mandatory' },
    { id: 'treasure_tower', name: '宝术殿', type: '文化', description: '面阔五间宽五丈', dimensions: { width: 5.0, depth: 3.5, height: 3.0 }, materials: ['石料', '木材', '瓦'], interior: '存放宝术', function: '传承宝术', category: 'mandatory' },
    { id: 'six_ministries', name: '六部', type: '行政', description: '六部衙门建筑群', dimensions: { width: 10.0, depth: 10.0 }, materials: ['青砖', '瓦'], interior: '六部办公', function: '国家行政', category: 'mandatory' },
    { id: 'prince_mansion', name: '王府', type: '居住', description: '王府大院宽六丈、进深十丈', dimensions: { width: 6.0, depth: 10.0 }, materials: ['青砖', '瓦', '木材'], interior: '前院+后院+花园', function: '王爷居住', category: 'mandatory' },
    { id: 'zhuque_street', name: '朱雀大街', type: '交通', description: '主干道宽五丈', dimensions: { width: 5.0, depth: 20.0 }, materials: ['青石板'], interior: '', function: '中轴交通', category: 'mandatory' },
    { id: 'east_market', name: '东市', type: '商业', description: '大型集市', dimensions: { width: 15.0, depth: 15.0 }, materials: ['青石板', '木材'], interior: '商铺林立', function: '商品交易', category: 'mandatory' },
    { id: 'west_market', name: '西市', type: '商业', description: '大型集市', dimensions: { width: 15.0, depth: 15.0 }, materials: ['青石板', '木材'], interior: '商铺林立', function: '商品交易', category: 'mandatory' },
    { id: 'ancestral_temple', name: '太庙', type: '宗教', description: '皇家祖庙宽四丈、进深六丈', dimensions: { width: 4.0, depth: 6.0, height: 3.0 }, materials: ['汉白玉', '木材', '瓦'], interior: '祖先牌位', function: '皇家祭祀', category: 'optional' },
    { id: 'heaven_altar', name: '祭天台', type: '宗教', description: '圆形石台直径五丈、高两丈', dimensions: { width: 5.0, depth: 5.0, height: 2.0 }, materials: ['汉白玉'], interior: '祭天仪式', function: '祭天', category: 'optional' },
    { id: 'music_bureau', name: '教坊司', type: '娱乐', description: '宽三丈、进深四丈', dimensions: { width: 3.0, depth: 4.0, height: 2.0 }, materials: ['木材', '砖瓦'], interior: '乐舞表演', function: '宫廷娱乐', category: 'optional' },
    { id: 'red_light', name: '烟花巷', type: '娱乐', description: '高档娱乐区', dimensions: { width: 2.0, depth: 15.0 }, materials: ['木材', '砖瓦'], interior: '妓院林立', function: '娱乐场所', category: 'optional' },
    { id: 'jade_terrace', name: '瑶台仙境', type: '娱乐', description: '空中楼阁', dimensions: { width: 5.0, depth: 5.0, height: 5.0 }, materials: ['玉石', '木材'], interior: '仙境般的娱乐场所', function: '顶级娱乐', category: 'optional' },
    { id: 'dark_market', name: '暗市', type: '商业', description: '地下集市', dimensions: { width: 10.0, depth: 10.0 }, materials: ['石料'], interior: '黑市交易', function: '非法交易', category: 'optional' },
    { id: 'flying_boat', name: '飞舟台', type: '交通', description: '高台宽三丈见方、高两丈', dimensions: { width: 3.0, depth: 3.0, height: 2.0 }, materials: ['石料', '木材'], interior: '停靠飞舟', function: '空中交通', category: 'optional' },
  ],
  outpost: [
    { id: 'watch_tower', name: '瞭望主塔', type: '防御', description: '方形夯土塔底宽两丈、高四丈', dimensions: { width: 2.0, depth: 2.0, height: 4.0 }, materials: ['夯土', '木材'], interior: '三层木结构瞭望层', function: '瞭望警戒', category: 'mandatory' },
    { id: 'outpost_wall', name: '哨所围墙', type: '防御', description: '夯土墙高一丈五、顶宽三尺', dimensions: { width: 0.3, depth: 0.5, height: 1.5 }, materials: ['夯土'], interior: '四角设箭垛', function: '防御工事', category: 'mandatory' },
    { id: 'barracks', name: '兵舍', type: '居住', description: '长排土屋宽两丈、进深一丈二', dimensions: { width: 2.0, depth: 1.2, height: 0.8 }, materials: ['土坯', '茅草'], interior: '通铺土炕可容二十人', function: '士兵居住', category: 'mandatory' },
    { id: 'stable', name: '马厩', type: '设施', description: '木栅栏围成宽三丈、深两丈', dimensions: { width: 3.0, depth: 2.0 }, materials: ['木材'], interior: '草棚遮雨，料槽石砌', function: '饲养马匹', category: 'mandatory' },
    { id: 'granary', name: '粮仓', type: '仓储', description: '土坯圆仓直径一丈五、高两丈', dimensions: { width: 1.5, depth: 1.5, height: 2.0 }, materials: ['土坯'], interior: '储粮三百石', function: '储存粮食', category: 'mandatory' },
    { id: 'beacon', name: '烽火台', type: '通讯', description: '独立高台底宽一丈五、高三丈', dimensions: { width: 1.5, depth: 1.5, height: 3.0 }, materials: ['石料', '木材'], interior: '顶部垒柴堆+狼粪缸', function: '传递信号', category: 'mandatory' },
    { id: 'water_cellar', name: '水窖', type: '设施', description: '地下石砌方池两丈见方、深一丈', dimensions: { width: 2.0, depth: 2.0, height: 1.0 }, materials: ['石料', '木材'], interior: '顶覆木板取水口', function: '储存水源', category: 'optional' },
    { id: 'outpost_gate', name: '哨所大门', type: '防御', description: '粗木排钉铁皮，宽一丈、高八尺', dimensions: { width: 1.0, depth: 0.2, height: 0.8 }, materials: ['木材', '铁皮'], interior: '门后设横闩三道', function: '出入通道', category: 'optional' },
  ],
  camp: [
    { id: 'big_tent', name: '军帐（大）', type: '居住', description: '牛皮缝制圆形帐篷，直径三丈、高两丈', dimensions: { width: 3.0, depth: 3.0, height: 2.0 }, materials: ['牛皮', '木材'], interior: '中厅+两侧隔间，中央火塘', function: '指挥中心', category: 'mandatory' },
    { id: 'small_tent', name: '军帐（小）', type: '居住', description: '兽皮帐篷直径一丈五、高八尺', dimensions: { width: 1.5, depth: 1.5, height: 0.8 }, materials: ['兽皮', '木材'], interior: '单间住四人，地铺干草', function: '士兵居住', category: 'mandatory' },
    { id: 'campfire', name: '营火区', type: '公共', description: '露天圆形石围直径一丈', dimensions: { width: 1.0, depth: 1.0 }, materials: ['石料'], interior: '中央燃篝火，周围摆木桩坐凳', function: '取暖做饭', category: 'mandatory' },
    { id: 'kitchen_shed', name: '炊事棚', type: '设施', description: '四柱油布顶棚宽一丈五、深一丈', dimensions: { width: 1.5, depth: 1.0 }, materials: ['木材', '油布'], interior: '灶台+木案', function: '烹饪食物', category: 'mandatory' },
    { id: 'command_tent', name: '指挥帐', type: '行政', description: '最大帐篷直径两丈五', dimensions: { width: 2.5, depth: 2.5, height: 2.0 }, materials: ['牛皮', '木材'], interior: '桌案+地图架+旗座', function: '指挥作战', category: 'mandatory' },
    { id: 'watch_post', name: '哨位', type: '防御', description: '浅坑堆土成台，高一尺', dimensions: { width: 1.0, depth: 1.0, height: 0.1 }, materials: ['土'], interior: '设两人值守', function: '监视警戒', category: 'mandatory' },
    { id: 'supplies', name: '物资堆放区', type: '仓储', description: '油布覆盖', dimensions: { width: 3.0, depth: 2.0 }, materials: ['油布', '木材'], interior: '四角钉木桩拉绳固定', function: '存放物资', category: 'optional' },
    { id: 'tame_stake', name: '驯兽桩', type: '设施', description: '粗木桩排列，高五尺', dimensions: { width: 2.0, depth: 0.1, height: 0.5 }, materials: ['木材'], interior: '桩间横木连接', function: '拴灵兽/马匹', category: 'optional' },
    { id: 'medical_tent', name: '医疗帐', type: '服务', description: '牛皮帐篷直径一丈五', dimensions: { width: 1.5, depth: 1.5, height: 1.0 }, materials: ['牛皮', '木材'], interior: '草铺两张+药箱木架', function: '治疗伤员', category: 'optional' },
  ],
  mine: [
    { id: 'mine_cave', name: '主矿洞', type: '采矿', description: '山体开凿入口宽一丈五、高八尺', dimensions: { width: 1.5, depth: 50.0, height: 0.8 }, materials: ['岩石'], interior: '洞口木架支护，内部巷道纵横', function: '开采矿石', category: 'mandatory' },
    { id: 'lift_frame', name: '矿井提升架', type: '设施', description: '洞口外木架高两丈', dimensions: { width: 2.0, depth: 2.0, height: 2.0 }, materials: ['木材'], interior: '装辘轳绞盘，绳索吊筐', function: '运输矿石', category: 'mandatory' },
    { id: 'smelter', name: '冶炼炉', type: '生产', description: '土石砌筑窑炉直径一丈、高一丈五', dimensions: { width: 1.0, depth: 1.0, height: 1.5 }, materials: ['土石'], interior: '鼓风孔+出铁口，侧堆木炭', function: '粗炼矿石', category: 'mandatory' },
    { id: 'miner_shed', name: '矿工棚', type: '居住', description: '长排木板房宽一丈五、进深一丈二', dimensions: { width: 1.5, depth: 1.2, height: 0.8 }, materials: ['木材'], interior: '大通铺草席，两侧可容四十人', function: '矿工居住', category: 'mandatory' },
    { id: 'overseer_house', name: '监工房', type: '行政', description: '独立木屋宽一丈五、进深一丈', dimensions: { width: 1.5, depth: 1.0, height: 0.8 }, materials: ['木材'], interior: '单间办公+居住，设桌案床铺', function: '管理矿工', category: 'mandatory' },
    { id: 'ore_store', name: '矿石仓库', type: '仓储', description: '木柱框架油布顶宽三丈、深两丈', dimensions: { width: 3.0, depth: 2.0 }, materials: ['木材', '油布'], interior: '堆矿石成品，地面铺木板防潮', function: '储存矿石', category: 'mandatory' },
    { id: 'wash_channel', name: '洗矿渠', type: '生产', description: '木槽引水长三丈、宽一尺五', dimensions: { width: 0.15, depth: 3.0 }, materials: ['木材'], interior: '矿工在水中淘洗精矿', function: '淘洗精矿', category: 'mandatory' },
    { id: 'tool_house', name: '工具房', type: '设施', description: '木屋宽一丈二、进深一丈', dimensions: { width: 1.2, depth: 1.0, height: 0.8 }, materials: ['木材'], interior: '内放镐、锹、锤、筐、绳索', function: '存放工具', category: 'optional' },
    { id: 'explosives', name: '火药库', type: '仓储', description: '独立石砌小屋宽一丈、深一丈', dimensions: { width: 1.0, depth: 1.0, height: 1.0 }, materials: ['石料'], interior: '无窗厚墙铁门', function: '存放爆破用品', category: 'optional' },
  ],
  post_station: [
    { id: 'post_house', name: '驿铺', type: '交通', description: '两进院宽四丈、进深六丈', dimensions: { width: 4.0, depth: 6.0 }, materials: ['木材', '砖瓦'], interior: '前院马厩十间+茶灶，后院客房六间+驿丞居所', function: '驿马换乘', category: 'mandatory' },
    { id: 'small_post', name: '递铺', type: '交通', description: '单间土屋宽一丈五、进深一丈二', dimensions: { width: 1.5, depth: 1.2, height: 0.8 }, materials: ['土坯'], interior: '驻铺兵两人，备马三匹', function: '传递文书', category: 'mandatory' },
    { id: 'road_pavilion', name: '路亭', type: '设施', description: '四柱木亭宽一丈二见方', dimensions: { width: 1.2, depth: 1.2, height: 1.0 }, materials: ['木材', '青瓦'], interior: '内置石凳', function: '行人歇脚', category: 'mandatory' },
    { id: 'guest_house', name: '客舍', type: '服务', description: '土坯房宽两丈、进深一丈二', dimensions: { width: 2.0, depth: 1.2, height: 0.8 }, materials: ['土坯'], interior: '堂屋+两间客房', function: '接待旅客', category: 'mandatory' },
    { id: 'stable_inn', name: '车马店', type: '服务', description: '宽大通间宽三丈、进深两丈', dimensions: { width: 3.0, depth: 2.0, height: 1.0 }, materials: ['木材'], interior: '大通铺+车马停放棚', function: '停放车马', category: 'mandatory' },
    { id: 'tea_stall', name: '茶摊', type: '服务', description: '路边木台宽一丈、深四尺', dimensions: { width: 1.0, depth: 0.4 }, materials: ['木材', '布'], interior: '支布棚放条凳', function: '卖茶点', category: 'mandatory' },
    { id: 'hitching_post', name: '拴马桩', type: '设施', description: '路边石桩高四尺', dimensions: { width: 0.1, depth: 0.1, height: 0.4 }, materials: ['石料'], interior: '间距六尺，共五根', function: '拴马', category: 'optional' },
    { id: 'milestone', name: '驿路碑', type: '设施', description: '石制方碑高三尺、宽一尺五', dimensions: { width: 0.15, depth: 0.1, height: 0.3 }, materials: ['石料'], interior: '刻驿道名称及里程', function: '指示里程', category: 'optional' },
    { id: 'barracks', name: '驿兵营房', type: '居住', description: '长排屋宽一丈五、进深一丈', dimensions: { width: 1.5, depth: 1.0, height: 0.8 }, materials: ['木材'], interior: '住驿兵十人+武器架', function: '驿兵居住', category: 'optional' },
    { id: 'post_box', name: '邮亭', type: '设施', description: '路旁木柱挂木箱，高六尺', dimensions: { width: 0.2, depth: 0.2, height: 0.6 }, materials: ['木材'], interior: '', function: '投递信件', category: 'optional' },
  ],
  ruin: [
    { id: 'entrance_gate', name: '入口石门', type: '入口', description: '两座石柱撑横梁，高两丈、宽一丈', dimensions: { width: 1.0, depth: 0.5, height: 2.0 }, materials: ['石料'], interior: '门楣刻太古符文，半边坍塌', function: '遗迹入口', category: 'mandatory' },
    { id: 'altar', name: '祭坛', type: '宗教', description: '圆形石坛直径三丈、高三尺', dimensions: { width: 3.0, depth: 3.0, height: 0.3 }, materials: ['石料'], interior: '坛面刻阵纹，中央凹槽干涸血迹', function: '祭祀场所', category: 'mandatory' },
    { id: 'library', name: '藏经室', type: '文化', description: '石室宽两丈、进深一丈五', dimensions: { width: 2.0, depth: 1.5, height: 1.0 }, materials: ['石料'], interior: '石架坍塌，散落残破骨文玉简', function: '收藏经文', category: 'mandatory' },
    { id: 'trial_field', name: '试炼场', type: '试炼', description: '方形石台宽五丈、深四丈', dimensions: { width: 5.0, depth: 4.0, height: 0.3 }, materials: ['石料'], interior: '台面刻满阵纹，四角立石柱', function: '试炼场所', category: 'mandatory' },
    { id: 'treasure_room', name: '宝库密室', type: '宝藏', description: '小型石室宽一丈见方', dimensions: { width: 1.0, depth: 1.0, height: 1.0 }, materials: ['石料'], interior: '石台上残存宝盒/玉匣', function: '存放宝藏', category: 'mandatory' },
    { id: 'coffin_room', name: '棺椁室', type: '殡葬', description: '石室宽两丈、进深两丈', dimensions: { width: 2.0, depth: 2.0, height: 1.5 }, materials: ['石料'], interior: '中央石棺长一丈、宽四尺、高五尺', function: '安葬逝者', category: 'mandatory' },
    { id: 'medicine_garden', name: '灵药园', type: '生产', description: '石墙围成两丈见方', dimensions: { width: 2.0, depth: 2.0 }, materials: ['石料'], interior: '土壤龟裂，偶有几株灵药残存', function: '种植灵药', category: 'optional' },
    { id: 'seal_tower', name: '封印塔', type: '封印', description: '残破石塔残高两丈', dimensions: { width: 1.5, depth: 1.5, height: 2.0 }, materials: ['石料'], interior: '底层石门铁锁锈蚀', function: '封印魔物', category: 'optional' },
    { id: 'cauldron_room', name: '药鼎室', type: '生产', description: '石室宽一丈五', dimensions: { width: 1.5, depth: 1.5, height: 1.0 }, materials: ['石料'], interior: '中央青铜药鼎高四尺、直径三尺', function: '炼药', category: 'optional' },
    { id: 'spirit_spring', name: '灵泉', type: '设施', description: '石砌泉池直径一丈', dimensions: { width: 1.0, depth: 1.0, height: 0.5 }, materials: ['石料'], interior: '池底龟裂，仅存一小洼水', function: '提供灵水', category: 'optional' },
    { id: 'mural_corridor', name: '壁画长廊', type: '文化', description: '石壁连续刻画长三丈', dimensions: { width: 3.0, depth: 0.3 }, materials: ['石料'], interior: '描绘太古大战/祭灵传说', function: '记录历史', category: 'optional' },
    { id: 'trap_corridor', name: '陷阱甬道', type: '防御', description: '狭窄通道宽四尺、高三丈', dimensions: { width: 0.4, depth: 10.0, height: 3.0 }, materials: ['石料'], interior: '地面石板松动，两侧墙有箭孔', function: '防御入侵者', category: 'optional' },
  ],
  sect: [
    { id: 'paifang', name: '山门牌坊', type: '入口', description: '三间四柱石牌坊，宽三丈、高两丈五', dimensions: { width: 3.0, depth: 0.5, height: 2.5 }, materials: ['石料'], interior: '额刻门派名，石柱雕云纹', function: '宗门入口', category: 'mandatory' },
    { id: 'stone_steps', name: '登山石阶', type: '交通', description: '青石板铺阶，宽一丈二', dimensions: { width: 1.2, depth: 30.0 }, materials: ['青石板'], interior: '阶侧有石栏', function: '登山通道', category: 'mandatory' },
    { id: 'main_hall', name: '主殿', type: '宗教', description: '面阔五间宽五丈、进深三丈五', dimensions: { width: 5.0, depth: 3.5, height: 1.5 }, materials: ['石料', '木材', '瓦'], interior: '重檐歇山顶，殿内设讲坛+蒲团', function: '讲道授业', category: 'mandatory' },
    { id: 'side_hall', name: '配殿', type: '文化', description: '三层木楼宽三丈、进深两丈四', dimensions: { width: 3.0, depth: 2.4, height: 3.0 }, materials: ['木材', '瓦'], interior: '藏书万卷', function: '藏经楼', category: 'mandatory' },
    { id: 'disciple_quarters', name: '弟子舍', type: '居住', description: '一排木屋宽一丈二、进深一丈', dimensions: { width: 1.2, depth: 1.0, height: 0.8 }, materials: ['木材'], interior: '每间住两人', function: '弟子居住', category: 'mandatory' },
    { id: 'training_field', name: '演武场', type: '训练', description: '方形青石铺地宽八丈、深六丈', dimensions: { width: 8.0, depth: 6.0 }, materials: ['青石'], interior: '地面刻简易练功阵', function: '练习武艺', category: 'mandatory' },
    { id: 'alchemy_room', name: '丹房', type: '生产', description: '独立石屋宽一丈五、进深一丈二', dimensions: { width: 1.5, depth: 1.2, height: 1.0 }, materials: ['石料', '木材'], interior: '铜制丹炉+药材架+蒲团', function: '炼制丹药', category: 'mandatory' },
    { id: 'bell_tower', name: '钟楼', type: '公共', description: '底层石砌上层木构，高两丈五', dimensions: { width: 2.0, depth: 2.0, height: 2.5 }, materials: ['石料', '木材', '铜'], interior: '悬大铜钟', function: '报时', category: 'mandatory' },
    { id: 'array_nodes', name: '护山大阵节点', type: '防御', description: '灵石柱基十二根', dimensions: { width: 0.5, depth: 0.5, height: 2.0 }, materials: ['灵石'], interior: '柱刻阵纹', function: '启动防御屏障', category: 'mandatory' },
    { id: 'guest_hall', name: '客院', type: '服务', description: '小院三间客房', dimensions: { width: 2.5, depth: 2.0, height: 1.0 }, materials: ['木材', '砖瓦'], interior: '接待来访修士', function: '接待客人', category: 'optional' },
    { id: 'beast_garden', name: '灵兽园', type: '设施', description: '木栅栏围成宽三丈、深两丈五', dimensions: { width: 3.0, depth: 2.5 }, materials: ['木材'], interior: '饲养骑乘灵禽/灵兽', function: '驯养灵兽', category: 'optional' },
    { id: 'lecture_platform', name: '讲经台', type: '文化', description: '山巅平台宽两丈见方', dimensions: { width: 2.0, depth: 2.0, height: 1.0 }, materials: ['青石'], interior: '周围散落巨石座椅', function: '露天讲道', category: 'optional' },
    { id: 'ancestor_hall', name: '祖师殿', type: '宗教', description: '小殿堂宽两丈、进深一丈五', dimensions: { width: 2.0, depth: 1.5, height: 1.2 }, materials: ['石料', '木材'], interior: '供奉历代祖师牌位+画像', function: '祭拜祖师', category: 'optional' },
    { id: 'practice_cave', name: '修行洞', type: '修炼', description: '山体岩洞，洞口宽六尺', dimensions: { width: 0.6, depth: 1.5, height: 1.0 }, materials: ['岩石'], interior: '仅容一人盘坐，壁刻修行心得', function: '闭关修炼', category: 'optional' },
    { id: 'sword_store', name: '藏剑阁', type: '仓储', description: '石砌两层阁楼宽两丈、进深一丈五', dimensions: { width: 2.0, depth: 1.5, height: 2.0 }, materials: ['石料'], interior: '兵器架+法器', function: '存放兵器', category: 'optional' },
    { id: 'medicine_garden', name: '药圃', type: '生产', description: '山坡梯田式药圃宽五丈、深三丈', dimensions: { width: 5.0, depth: 3.0 }, materials: ['土壤', '石块'], interior: '种植各种灵药', function: '种植药材', category: 'optional' },
    { id: 'dining_hall', name: '斋堂', type: '服务', description: '宽大木屋宽四丈、进深两丈四', dimensions: { width: 4.0, depth: 2.4, height: 1.0 }, materials: ['木材'], interior: '长桌条凳，可容百人用餐', function: '弟子用餐', category: 'optional' },
  ],
  battlefield: [
    { id: 'defense_wall', name: '防御土墙', type: '防御', description: '夯土筑墙高一丈五、顶宽一丈', dimensions: { width: 1.0, depth: 0.5, height: 1.5 }, materials: ['夯土'], interior: '墙顶设女墙垛口，每十丈设一暗堡', function: '防御工事', category: 'mandatory' },
    { id: 'trench', name: '壕沟', type: '防御', description: '墙前挖壕宽一丈五、深一丈二', dimensions: { width: 1.5, depth: 5.0, height: 1.2 }, materials: ['土'], interior: '底插竹签尖刺，壕外设鹿砦', function: '防御障碍', category: 'mandatory' },
    { id: 'arrow_tower', name: '箭塔', type: '防御', description: '木构方塔底宽一丈二、高三丈五', dimensions: { width: 1.2, depth: 1.2, height: 3.5 }, materials: ['木材'], interior: '顶层四面开箭窗', function: '射击塔楼', category: 'mandatory' },
    { id: 'hideout', name: '藏兵洞', type: '设施', description: '墙内挖掘土洞宽两丈、进深三丈', dimensions: { width: 2.0, depth: 3.0, height: 0.7 }, materials: ['土'], interior: '可容五十人藏身待击', function: '隐藏士兵', category: 'mandatory' },
    { id: 'command_post', name: '指挥台', type: '行政', description: '墙后高台土石垒成宽两丈见方、高两丈', dimensions: { width: 2.0, depth: 2.0, height: 2.0 }, materials: ['土石'], interior: '台顶插帅旗', function: '指挥作战', category: 'mandatory' },
    { id: 'horse_defense', name: '拒马', type: '防御', description: '粗木交叉绑成宽两丈、高四尺', dimensions: { width: 2.0, depth: 0.5, height: 0.4 }, materials: ['木材'], interior: '前端削尖', function: '阻挡骑兵', category: 'mandatory' },
    { id: 'cannon_platform', name: '弩炮台', type: '防御', description: '方形石台宽一丈五见方、高一丈二', dimensions: { width: 1.5, depth: 1.5, height: 1.2 }, materials: ['石料'], interior: '上装重型弩炮', function: '远程攻击', category: 'mandatory' },
    { id: 'catapult', name: '投石车阵地', type: '防御', description: '平地夯台宽两丈见方', dimensions: { width: 2.0, depth: 2.0, height: 0.5 }, materials: ['木材', '土'], interior: '上置投石车', function: '投掷石弹', category: 'optional' },
    { id: 'hospital_shed', name: '伤兵棚', type: '服务', description: '茅草棚宽三丈、进深两丈', dimensions: { width: 3.0, depth: 2.0 }, materials: ['茅草', '木材'], interior: '内设草铺数十', function: '救治伤员', category: 'optional' },
    { id: 'supply_dump', name: '粮草囤', type: '仓储', description: '地面铺木板', dimensions: { width: 3.0, depth: 2.0 }, materials: ['木材', '油布'], interior: '堆放粮袋草料', function: '储存粮草', category: 'optional' },
  ],
  fishing_village: [
    { id: 'pier', name: '码头栈桥', type: '交通', description: '木桩打入水底，上铺木板，宽一丈五、伸出水面三丈', dimensions: { width: 1.5, depth: 3.0 }, materials: ['木材'], interior: '两侧拴渔船缆绳', function: '停靠船只', category: 'mandatory' },
    { id: 'fish_market', name: '渔市', type: '商业', description: '岸边空地宽四丈、深三丈', dimensions: { width: 4.0, depth: 3.0 }, materials: ['泥土'], interior: '凌晨摊位摆满鱼获', function: '交易鱼获', category: 'mandatory' },
    { id: 'fish_dryer', name: '晒鱼场', type: '生产', description: '竹架晾晒台宽三丈、深两丈', dimensions: { width: 3.0, depth: 2.0 }, materials: ['竹', '木材'], interior: '分层排列竹匾晒鱼干/虾皮', function: '晾晒鱼干', category: 'mandatory' },
    { id: 'shipwright_shed', name: '船匠棚', type: '生产', description: '半露天木棚宽两丈、进深三丈', dimensions: { width: 2.0, depth: 3.0 }, materials: ['木材'], interior: '木料+造船工具+半成品船', function: '修船造船', category: 'mandatory' },
    { id: 'fisher_house', name: '渔家屋', type: '居住', description: '临水木桩架屋', dimensions: { width: 2.0, depth: 1.5, height: 1.2 }, materials: ['木材'], interior: '一楼架空存渔具，二楼居住', function: '渔民居住', category: 'mandatory' },
    { id: 'dragon_temple', name: '龙王庙', type: '宗教', description: '岸边小石庙宽一丈、进深八尺', dimensions: { width: 1.0, depth: 0.8, height: 1.0 }, materials: ['石料'], interior: '供海神像', function: '祭海', category: 'mandatory' },
    { id: 'salt_field', name: '盐场', type: '生产', description: '岸边盐田方格', dimensions: { width: 5.0, depth: 5.0 }, materials: ['泥土'], interior: '每格一丈见方，引海水日晒结晶', function: '晒盐', category: 'mandatory' },
    { id: 'boathouse', name: '渔船坞', type: '设施', description: '岸边挖入式船坞宽两丈、深三丈', dimensions: { width: 2.0, depth: 3.0 }, materials: ['木材', '石料'], interior: '木架支撑', function: '修船避浪', category: 'optional' },
    { id: 'net_repair', name: '渔网修补场', type: '生产', description: '岸边平整沙地宽两丈、深一丈五', dimensions: { width: 2.0, depth: 1.5 }, materials: ['沙'], interior: '晒网补网', function: '修补渔网', category: 'optional' },
    { id: 'saltfish_store', name: '咸鱼仓', type: '仓储', description: '木柱架高离地三尺', dimensions: { width: 2.0, depth: 1.5 }, materials: ['木材'], interior: '堆叠咸鱼缸/鱼干垛', function: '储存鱼干', category: 'optional' },
    { id: 'lighthouse', name: '灯塔', type: '设施', description: '石砌圆形塔底径一丈二、高三丈', dimensions: { width: 1.2, depth: 1.2, height: 3.0 }, materials: ['石料'], interior: '顶置油灯', function: '导航', category: 'optional' },
    { id: 'bollard', name: '缆桩', type: '设施', description: '岸上石桩高两尺', dimensions: { width: 0.1, depth: 0.1, height: 0.2 }, materials: ['石料'], interior: '密集排列数十个', function: '拴船', category: 'optional' },
    { id: 'ice_cellar', name: '冰窖', type: '仓储', description: '半地下式圆窖直径一丈五、深一丈二', dimensions: { width: 1.5, depth: 1.5, height: 1.2 }, materials: ['石料'], interior: '冬季储冰，夏季保鱼鲜', function: '保鲜', category: 'optional' },
  ],
};

export class SceneGenerator {
  static generate(params: ISceneGenerationParams): IZoneBlueprint {
    const { country, sceneType, terrain, variantRate = 0.7 } = params;
    const constraints = countryConstraints[country];
    const library = buildingLibraries[sceneType];
    
    const mandatoryBuildings = library.filter(b => b.category === 'mandatory');
    const optionalBuildings = library.filter(b => b.category === 'optional');
    const extensionBuildings = library.filter(b => b.category === 'extension');
    
    const selectedOptional = this.selectRandom(optionalBuildings, Math.floor(optionalBuildings.length * variantRate));
    const selectedExtensions = this.selectRandom(extensionBuildings, Math.floor(extensionBuildings.length * variantRate * 0.5));
    
    const allBuildings = [...mandatoryBuildings, ...selectedOptional, ...selectedExtensions];
    
    const rooms = this.buildRooms(allBuildings, constraints, terrain, country);
    const zoneId = this.generateZoneId(country, sceneType);
    const zoneName = this.generateZoneName(country, sceneType);
    
    return {
      id: zoneId,
      name: zoneName,
      type: this.getZoneType(sceneType),
      description: this.generateDescription(country, sceneType, terrain, constraints),
      recommendedLevel: this.getRecommendedLevel(sceneType),
      entrances: this.generateEntrances(country),
      specialRules: this.generateSpecialRules(country, sceneType, constraints),
      rooms,
    };
  }

  private static selectRandom<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.max(0, count));
  }

  private static buildRooms(buildings: IBuildingLibrary[], constraints: ICountryConstraints, terrain: TerrainCategory, country: CountryType): IRoomBlueprint[] {
    const terrainMap: Record<TerrainCategory, TerrainType> = {
      valley: TerrainType.PLAIN,
      plain: TerrainType.PLAIN,
      riverbank: TerrainType.WATER,
      coast: TerrainType.WATER,
      mountain: TerrainType.MOUNTAIN,
      desert: TerrainType.DESERT,
      forest: TerrainType.FOREST,
    };

    const defaultTerrain = terrainMap[terrain] || TerrainType.PLAIN;
    
    return buildings.map((building, index) => {
      const roomId = `${country}_${building.id}_${index}`;
      const spiritDensity = this.calculateSpiritDensity(building, country);
      
      return {
        id: roomId,
        name: this.localizeName(building.name, constraints),
        description: this.localizeDescription(building, constraints),
        terrain: this.getBuildingTerrain(building, defaultTerrain),
        spiritDensity,
        exits: this.generateExits(building, index, buildings.length),
        monsters: [],
        resources: [],
        npcs: this.generateNPCs(building),
        isSafeZone: this.isSafeZone(building),
        details: this.generateDetails(building, constraints),
      };
    });
  }

  private static localizeName(name: string, constraints: ICountryConstraints): string {
    return name;
  }

  private static localizeDescription(building: IBuildingLibrary, constraints: ICountryConstraints): string {
    const materialOverride = constraints.materials[0] || '';
    let desc = building.description;
    
    if (materialOverride && desc.includes('石料')) {
      desc = desc.replace(/石料/g, materialOverride);
    }
    if (materialOverride && desc.includes('木材')) {
      desc = desc.replace(/木材/g, constraints.materials[1] || materialOverride);
    }
    
    return desc;
  }

  private static getBuildingTerrain(building: IBuildingLibrary, defaultTerrain: TerrainType): TerrainType {
    if (building.type === '采矿') return TerrainType.MOUNTAIN;
    if (building.type === '祭祀' || building.type === '宗教') return TerrainType.PLAIN;
    if (building.type === '水域' || building.id.includes('water') || building.id.includes('dock')) return TerrainType.WATER;
    return defaultTerrain;
  }

  private static calculateSpiritDensity(building: IBuildingLibrary, country: CountryType): number {
    const baseDensity: Record<string, number> = {
      stone: 20,
      fire: 30,
      wood: 40,
      rain: 35,
      wind: 25,
      human: 30,
    };
    
    const typeMultiplier: Record<string, number> = {
      '祭灵': 1.5,
      '宗教': 1.5,
      '宫殿': 1.5,
      '试炼': 1.3,
      '宝藏': 1.4,
      '修炼': 1.4,
      '生产': 0.8,
      '仓储': 0.7,
      '居住': 0.8,
      '防御': 0.9,
    };
    
    const base = baseDensity[country] || 25;
    const multiplier = typeMultiplier[building.type] || 1.0;
    
    return Math.round(base * multiplier);
  }

  private static generateExits(building: IBuildingLibrary, index: number, total: number): { direction: string; targetId: string; condition?: string; isHidden: boolean; travelCost: number; targetZoneId?: string; targetRoomId?: string }[] {
    if (index === 0) {
      return [{ direction: '外', targetId: 'outside', isHidden: false, travelCost: 0 }];
    }
    
    const directions = ['东', '西', '南', '北'];
    const exits: { direction: string; targetId: string; condition?: string; isHidden: boolean; travelCost: number }[] = [];
    
    if (index > 0) {
      exits.push({ direction: directions[(index - 1) % 4], targetId: `room_${index - 1}`, isHidden: false, travelCost: 0 });
    }
    if (index < total - 1) {
      exits.push({ direction: directions[index % 4], targetId: `room_${index + 1}`, isHidden: false, travelCost: 0 });
    }
    
    return exits;
  }

  private static generateNPCs(building: IBuildingLibrary): string[] {
    const npcMap: Record<string, string[]> = {
      '祭灵': ['priest'],
      '宗教': ['priest'],
      '宫殿': ['guard', 'official'],
      '居住': ['villager'],
      '行政': ['official'],
      '商业': ['merchant'],
      '生产': ['worker'],
      '训练': ['trainer'],
      '医疗': ['medic'],
      '防御': ['soldier'],
      '设施': ['worker'],
      '仓储': ['keeper'],
    };
    
    return npcMap[building.type] || [];
  }

  private static isSafeZone(building: IBuildingLibrary): boolean {
    const unsafeTypes = ['采矿', '试炼', '陷阱', '战场'];
    return !unsafeTypes.includes(building.type);
  }

  private static generateDetails(building: IBuildingLibrary, constraints: ICountryConstraints): { id: string; name: string; description: string; type: 'environment' | 'interactive' | 'secret' | 'lore' }[] {
    const details: { id: string; name: string; description: string; type: 'environment' | 'interactive' | 'secret' | 'lore' }[] = [];
    
    if (building.interior) {
      details.push({
        id: `${building.id}_interior`,
        name: building.name,
        description: building.interior,
        type: 'environment',
      });
    }
    
    details.push({
      id: `${building.id}_materials`,
      name: '材质',
      description: `主要材质：${constraints.materials.join('、')}`,
      type: 'environment',
    });
    
    return details;
  }

  private static generateZoneId(country: CountryType, sceneType: SceneType): string {
    const idMap: Record<SceneType, string> = {
      village: 'village',
      town: 'city',
      city: 'capital',
      megacity: 'megacity',
      outpost: 'outpost',
      camp: 'camp',
      mine: 'mine',
      post_station: 'post_station',
      ruin: 'ruin',
      sect: 'sect',
      battlefield: 'battlefield',
      fishing_village: 'fishing_village',
    };
    
    return `${country}_${idMap[sceneType]}`;
  }

  private static generateZoneName(country: CountryType, sceneType: SceneType): string {
    const countryNames: Record<CountryType, string> = {
      stone: '石国',
      fire: '火国',
      wood: '木国',
      rain: '雨国',
      wind: '风国',
      human: '人国',
    };
    
    const typeNames: Record<SceneType, string> = {
      village: '村落',
      town: '城镇',
      city: '城池',
      megacity: '主城',
      outpost: '边境哨所',
      camp: '野外营地',
      mine: '矿场',
      post_station: '驿站村落',
      ruin: '秘境遗迹',
      sect: '教派山门',
      battlefield: '战场工事',
      fishing_village: '港口渔村',
    };
    
    return `${countryNames[country]}${typeNames[sceneType]}`;
  }

  private static getZoneType(sceneType: SceneType): 'town' | 'wild' | 'dungeon' | 'city' | 'ruin' | 'portal' | 'mountain' {
    const typeMap: Record<SceneType, 'town' | 'wild' | 'dungeon' | 'city' | 'ruin' | 'portal' | 'mountain'> = {
      village: 'wild',
      town: 'city',
      city: 'city',
      megacity: 'city',
      outpost: 'wild',
      camp: 'wild',
      mine: 'wild',
      post_station: 'town',
      ruin: 'ruin',
      sect: 'mountain',
      battlefield: 'wild',
      fishing_village: 'town',
    };
    
    return typeMap[sceneType];
  }

  private static generateDescription(country: CountryType, sceneType: SceneType, terrain: TerrainCategory, constraints: ICountryConstraints): string {
    const terrainNames: Record<TerrainCategory, string> = {
      valley: '山谷',
      plain: '平原',
      riverbank: '河岸',
      coast: '海岸',
      mountain: '山地',
      desert: '沙漠',
      forest: '森林',
    };
    
    const typeDescriptions: Record<SceneType, string> = {
      village: '以祭灵为信仰中心的原始村落，村民以狩猎和农耕为生',
      town: '中型城镇，四方城墙，十字街心规划',
      city: '大型城池，双重城墙环绕，商业发达',
      megacity: '巨型都城，三重城墙层层递进，国家政治文化中心',
      outpost: '国境前线的军事防御工事，粗犷实用',
      camp: '临时野外营地，以帐篷为主，可拆卸移动',
      mine: '矿场，以开采和粗炼矿石为主',
      post_station: '官道沿线的驿站村落，以驿站为中心',
      ruin: '太古遗迹，残破古老，充满神秘气息',
      sect: '教派山门，仙气飘渺，庄严肃穆',
      battlefield: '国境前线的战场工事，军事防御为主',
      fishing_village: '港口渔村，以渔业和水运为主',
    };
    
    return `${constraints.worshipObject}庇佑的${terrainNames[terrain]}${typeDescriptions[sceneType]}，${constraints.architecturalStyle}`;
  }

  private static getRecommendedLevel(sceneType: SceneType): number {
    const levelMap: Record<SceneType, number> = {
      village: 2,
      town: 5,
      city: 7,
      megacity: 10,
      outpost: 3,
      camp: 2,
      mine: 4,
      post_station: 2,
      ruin: 8,
      sect: 7,
      battlefield: 6,
      fishing_village: 3,
    };
    
    return levelMap[sceneType];
  }

  private static generateEntrances(country: CountryType): { direction: string; targetZoneId: string; targetRoomId: string; condition?: string }[] {
    return [
      { direction: '外', targetZoneId: `${country}_provinces`, targetRoomId: `${country}_province_01` },
    ];
  }

  private static generateSpecialRules(country: CountryType, sceneType: SceneType, constraints: ICountryConstraints): string[] {
    return [
      `${constraints.worshipObject}庇佑`,
      constraints.architecturalStyle,
    ];
  }

  /**
   * 根据时辰/季节/玩家境界为房间描述附加上下文修饰
   * 返回 [修饰后描述, 额外氛围文本（可为空）]
   */
  static decorateRoomDescription(baseDescription: string, time: IGameTime, realm: CultivationRealm): { description: string; ambiance: string } {
    // 时辰氛围
    let timeFlavor = '';
    switch (time.timeOfDay) {
      case TimeOfDay.DAWN: timeFlavor = '晨曦初露，薄雾未散'; break;
      case TimeOfDay.MORNING: timeFlavor = '日上三竿，万物苏醒'; break;
      case TimeOfDay.NOON: timeFlavor = '日轮当空，光华流转'; break;
      case TimeOfDay.AFTERNOON: timeFlavor = '日影西斜，光影斑驳'; break;
      case TimeOfDay.DUSK: timeFlavor = '残阳如血，晚霞漫天'; break;
      case TimeOfDay.NIGHT: timeFlavor = '月华如练，星河璀璨'; break;
      case TimeOfDay.MIDNIGHT: timeFlavor = '夜阑人静，万籁俱寂'; break;
    }

    // 季节修饰
    let seasonFlavor = '';
    switch (time.season) {
      case Season.SPRING: seasonFlavor = '春意盎然，灵气勃发'; break;
      case Season.SUMMER: seasonFlavor = '夏日炎炎，火灵活跃'; break;
      case Season.AUTUMN: seasonFlavor = '秋高气爽，金气肃杀'; break;
      case Season.WINTER: seasonFlavor = '寒冬凛冽，万灵蛰伏'; break;
    }

    // 境界感知：高境界者能感知灵气与道韵
    let realmFlavor = '';
    if (realm >= CultivationRealm.TRUE_IMMORTAL) {
      realmFlavor = '你神识一扫，万物灵韵尽收眼底，似有大道低回。';
    } else if (realm >= CultivationRealm.ESCAPE) {
      realmFlavor = '你超脱之眼一瞥，可见此间因果脉络隐现。';
    } else if (realm >= CultivationRealm.SELF_CUT) {
      realmFlavor = '你心境通明，隐约感知到此地暗藏道韵。';
    } else if (realm >= CultivationRealm.VOID) {
      realmFlavor = '你神识敏锐，能察觉空气中灵气的流向。';
    } else if (realm >= CultivationRealm.TRUE_ONE) {
      realmFlavor = '你真一之眼所见，万物皆有灵光浮沉。';
    } else if (realm >= CultivationRealm.SUPREME) {
      realmFlavor = '你至尊之识可感知此地灵气浓淡之差。';
    }

    // 夜晚额外加成
    const nightHint = isNight(time) ? '夜色中似有异样气息流动...' : '';

    const ambiance = [timeFlavor, seasonFlavor, realmFlavor, nightHint].filter(Boolean).join(' ');
    return { description: baseDescription, ambiance };
  }
}
