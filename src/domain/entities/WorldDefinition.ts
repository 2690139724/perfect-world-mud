export enum WorldId {
  PERFECT_WORLD = 'perfect_world',
  ZHE_TIAN = 'zhe_tian',
  SHENG_XU = 'sheng_xu',
  DOU_PO = 'dou_po',
  SHEN_MU = 'shen_mu',
  FAN_REN = 'fan_ren',
  XIAN_NI = 'xian_ni',
}

export const WORLD_NAMES: Record<WorldId, string> = {
  [WorldId.PERFECT_WORLD]: '完美世界',
  [WorldId.ZHE_TIAN]: '遮天',
  [WorldId.SHENG_XU]: '圣墟',
  [WorldId.DOU_PO]: '斗破苍穹',
  [WorldId.SHEN_MU]: '神墓',
  [WorldId.FAN_REN]: '凡人修仙传',
  [WorldId.XIAN_NI]: '仙逆',
};

export const WORLD_DESCRIPTIONS: Record<WorldId, string> = {
  [WorldId.PERFECT_WORLD]: '大荒无垠，万族林立。远古大能陨落于此，留下无数传承与秘境。修士在大荒中历练成长，追寻长生大道。这是一个充满热血与机遇的修仙世界。',
  [WorldId.ZHE_TIAN]: '冰冷与黑暗并存的宇宙深处，九具龙尸拉着一座铜棺。辰南飞升成仙，却发现仙域已毁。这是一个大帝争锋的时代。',
  [WorldId.SHENG_XU]: '彼岸花盛开，轮回不息。楚风在末世中崛起，跨越轮回，成就仙帝。这是一个连接过去与未来的神秘世界。',
  [WorldId.DOU_PO]: '斗气大陆，万族争锋。萧炎从废物到斗帝，一路逆袭，焚尽苍穹。这里是斗气与异火的世界。',
  [WorldId.SHEN_MU]: '神魔陵园，万神长眠。辰南从神魔陵园中苏醒，寻找失落的天道。这是一个众神陨落的悲壮时代。',
  [WorldId.FAN_REN]: '凡人之躯，亦可修仙。韩立从青牛镇走出，步步为营，终成仙尊。这是一个真实而残酷的修仙世界。',
  [WorldId.XIAN_NI]: '顺为凡，逆为仙。王林以平庸之资，逆天改命，成就第四步。这是一条充满血泪的逆天之路。',
};

export interface IRealmTier {
  level: number;
  name: string;
  description: string;
}

export interface IWorldDefinition {
  id: WorldId;
  name: string;
  description: string;
  realms: IRealmTier[];
  ascensionTarget?: WorldId;
  ascensionRealmLevel?: number;
  startingRoomId: string;
  startingZoneId: string;
  colorClass: string;
}

function r(level: number, name: string, description: string): IRealmTier {
  return { level, name, description };
}

export const WORLD_DEFINITIONS: Record<WorldId, IWorldDefinition> = {
  [WorldId.PERFECT_WORLD]: {
    id: WorldId.PERFECT_WORLD,
    name: '完美世界',
    description: WORLD_DESCRIPTIONS[WorldId.PERFECT_WORLD],
    realms: [
      r(0, '凡人', '未踏入修炼之路的凡人'),
      r(1, '搬血境', '淬炼全身精血，激发肉身潜能'),
      r(2, '洞天境', '开辟洞天，容纳天地灵气'),
      r(3, '化灵境', '灵气化形，可离体攻敌'),
      r(4, '铭纹境', '刻铭道纹于身，增幅战力'),
      r(5, '列阵境', '布下大阵，以阵御敌'),
      r(6, '尊者境', '一方霸主，受人尊崇'),
      r(7, '神火境', '点燃神火，超凡入圣'),
      r(8, '真一境', '真我唯一，万法不侵'),
      r(9, '祭道境', '献祭己身，问道于天'),
      r(10, '神境', '神识大成，遨游太虚'),
      r(11, '虚道境', '虚空悟道，法则加身'),
      r(12, '斩我境', '斩断过去，明悟本心'),
      r(13, '遁一境', '遁去其一，万化归一'),
      r(14, '至尊境', '至尊无上，俯视众生'),
      r(15, '真仙境', '飞升成仙，长生不老'),
      r(16, '王者境', '仙王临世，诸天臣服'),
    ],
    ascensionTarget: WorldId.ZHE_TIAN,
    ascensionRealmLevel: 15,
    startingRoomId: 'stone_village_center',
    startingZoneId: 'stone_village',
    colorClass: 'world-perfect',
  },
  [WorldId.ZHE_TIAN]: {
    id: WorldId.ZHE_TIAN,
    name: '遮天',
    description: WORLD_DESCRIPTIONS[WorldId.ZHE_TIAN],
    realms: [
      r(0, '凡人', '未踏入修炼之路的凡人'),
      r(1, '轮海境', '开辟苦海，种下命泉，架起神桥，抵达彼岸'),
      r(2, '道宫境', '修炼五脏六腑，五神藏共鸣'),
      r(3, '四极境', '四肢如龙，撑起一方天地'),
      r(4, '化龙境', '脊柱化龙，蜕变升华'),
      r(5, '仙台一层', '半步大能，初入仙台'),
      r(6, '仙台二层', '大成王者，称霸一方'),
      r(7, '仙台三层', '圣人，言出法随'),
      r(8, '仙台四层', '圣人王，威震星域'),
      r(9, '仙台五层', '大圣，俯瞰世间'),
      r(10, '仙台六层', '准帝，半步大帝'),
      r(11, '大帝', '镇压一世，万族臣服'),
      r(12, '红尘仙', '红尘中成仙，超脱轮回'),
    ],
    ascensionTarget: WorldId.SHENG_XU,
    ascensionRealmLevel: 12,
    startingRoomId: 'beidou_city_gate',
    startingZoneId: 'zhutian_beidou',
    colorClass: 'world-zhetian',
  },
  [WorldId.SHENG_XU]: {
    id: WorldId.SHENG_XU,
    name: '圣墟',
    description: WORLD_DESCRIPTIONS[WorldId.SHENG_XU],
    realms: [
      r(0, '凡人', '未踏入修炼之路的凡人'),
      r(1, '凡境', '刚接触修炼，体能强化'),
      r(2, '觉醒境', '觉醒异术，超凡脱俗'),
      r(3, '枷锁境', '打破基因枷锁，释放潜能'),
      r(4, '逍遥境', '逍遥自在，御空飞行'),
      r(5, '观想境', '观想万物，以精神力攻敌'),
      r(6, '餐霞境', '吞吐霞气，淬炼肉身'),
      r(7, '塑道境', '塑造道基，奠定大道'),
      r(8, '育道境', '孕育道果，静待花开'),
      r(9, '化道境', '大道化成，初窥门径'),
      r(10, '亚圣', '半步圣人，威压一方'),
      r(11, '圣者', '圣者无敌，横推世间'),
      r(12, '圣王', '圣王临世，万法归一'),
      r(13, '大圣', '大圣归来，天翻地覆'),
      r(14, '准天尊', '半步天尊，触及天道'),
      r(15, '天尊', '天尊当道，镇压纪元'),
      r(16, '大天尊', '大天尊，超越天尊'),
      r(17, '仙', '飞升成仙，超脱轮回'),
      r(18, '仙王', '仙王巨头，俯瞰纪元'),
      r(19, '仙帝', '仙帝至尊，至高无上'),
    ],
    ascensionTarget: undefined,
    ascensionRealmLevel: undefined,
    startingRoomId: 'bianhua_gate',
    startingZoneId: 'shengxu_bianhua',
    colorClass: 'world-shengxu',
  },
  [WorldId.DOU_PO]: {
    id: WorldId.DOU_PO,
    name: '斗破苍穹',
    description: WORLD_DESCRIPTIONS[WorldId.DOU_PO],
    realms: [
      r(0, '凡人', '未踏入修炼之路的凡人'),
      r(1, '斗之气', '初感斗气，强身健体'),
      r(2, '斗者', '凝聚气旋，正式踏入修炼'),
      r(3, '斗师', '斗气外放，可伤人于无形'),
      r(4, '大斗师', '斗气凝物，可化铠甲兵器'),
      r(5, '斗灵', '斗气如灵，操控自如'),
      r(6, '斗王', '斗气化翼，可御空飞行'),
      r(7, '斗皇', '斗气凝海，威压一方'),
      r(8, '斗宗', '踏空而行，空间封锁'),
      r(9, '斗尊', '掌握空间之力，可撕裂虚空'),
      r(10, '斗圣', '圣者无敌，开辟空间'),
      r(11, '斗帝', '斗帝临世，万族臣服'),
    ],
    ascensionTarget: WorldId.PERFECT_WORLD,
    ascensionRealmLevel: 11,
    startingRoomId: 'wutan_city_gate',
    startingZoneId: 'doupo_wutan',
    colorClass: 'world-doupo',
  },
  [WorldId.SHEN_MU]: {
    id: WorldId.SHEN_MU,
    name: '神墓',
    description: WORLD_DESCRIPTIONS[WorldId.SHEN_MU],
    realms: [
      r(0, '凡人', '未踏入修炼之路的凡人'),
      r(1, '一阶', '初窥武道，强身健体'),
      r(2, '二阶', '内力深厚，可开碑裂石'),
      r(3, '三阶', '轻功卓越，来去如风'),
      r(4, '四阶', '真气外放，剑气纵横'),
      r(5, '五阶', '御剑飞行，逍遥天地'),
      r(6, '六阶', '凌空虚度，超凡入圣'),
      r(7, '七阶', '神王级强者，威震一方'),
      r(8, '神皇', '神皇至尊，统御众神'),
      r(9, '天阶', '天阶高手，超越凡俗'),
      r(10, '逆天级', '逆天改命，对抗天道'),
    ],
    ascensionTarget: WorldId.PERFECT_WORLD,
    ascensionRealmLevel: 10,
    startingRoomId: 'shenmu_gate',
    startingZoneId: 'shenmu_cemetery',
    colorClass: 'world-shenmu',
  },
  [WorldId.FAN_REN]: {
    id: WorldId.FAN_REN,
    name: '凡人修仙传',
    description: WORLD_DESCRIPTIONS[WorldId.FAN_REN],
    realms: [
      r(0, '凡人', '未踏入修炼之路的凡人'),
      r(1, '练气期', '感知灵气，引气入体'),
      r(2, '筑基期', '筑就道基，正式修仙'),
      r(3, '结丹期', '凝聚金丹，寿命大增'),
      r(4, '元婴期', '元婴出窍，可夺舍重生'),
      r(5, '化神期', '化神为念，神游太虚'),
      r(6, '炼虚期', '炼虚合道，初窥天道'),
      r(7, '合体期', '天人合一，法力无边'),
      r(8, '大乘期', '大乘修士，渡劫在即'),
      r(9, '渡劫期', '渡劫飞升，指日可待'),
      r(10, '真仙', '飞升成仙，长生不老'),
    ],
    ascensionTarget: WorldId.ZHE_TIAN,
    ascensionRealmLevel: 10,
    startingRoomId: 'qingniu_town_gate',
    startingZoneId: 'fanren_qingniu',
    colorClass: 'world-fanren',
  },
  [WorldId.XIAN_NI]: {
    id: WorldId.XIAN_NI,
    name: '仙逆',
    description: WORLD_DESCRIPTIONS[WorldId.XIAN_NI],
    realms: [
      r(0, '凡人', '未踏入修炼之路的凡人'),
      r(1, '练气期', '引气入体，凝聚灵力'),
      r(2, '筑基期', '筑就仙基，踏上仙途'),
      r(3, '结丹期', '凝聚金丹，蜕凡化仙'),
      r(4, '元婴期', '元婴成形，可离体御敌'),
      r(5, '化神期', '化神为念，神识大成'),
      r(6, '问鼎期', '问鼎大道，初窥天道'),
      r(7, '阴虚', '阴虚境界，触及阴阳'),
      r(8, '阳实', '阳实境界，阴阳调和'),
      r(9, '窥涅', '窥探涅槃，涅槃重生'),
      r(10, '净涅', '清净涅槃，脱胎换骨'),
      r(11, '碎涅', '破碎涅槃，超越自我'),
      r(12, '天人', '天人合一，超凡入圣'),
      r(13, '衰劫', '天人五衰，生死之间'),
      r(14, '第三步', '第三步大能，超脱轮回'),
      r(15, '第四步', '第四步，踏天之道'),
    ],
    ascensionTarget: WorldId.SHENG_XU,
    ascensionRealmLevel: 15,
    startingRoomId: 'zhuque_gate',
    startingZoneId: 'xianni_zhuque',
    colorClass: 'world-xianni',
  },
};

export function getWorldDefinition(worldId: WorldId): IWorldDefinition {
  return WORLD_DEFINITIONS[worldId];
}

export function getRealmName(worldId: WorldId, realmLevel: number): string {
  const world = WORLD_DEFINITIONS[worldId];
  if (!world) return '未知';
  const realm = world.realms.find(r => r.level === realmLevel);
  return realm?.name || '未知';
}

export function getRealmDescription(worldId: WorldId, realmLevel: number): string {
  const world = WORLD_DEFINITIONS[worldId];
  if (!world) return '';
  const realm = world.realms.find(r => r.level === realmLevel);
  return realm?.description || '';
}

export function getMaxRealmLevel(worldId: WorldId): number {
  const world = WORLD_DEFINITIONS[worldId];
  if (!world || world.realms.length === 0) return 0;
  return Math.max(...world.realms.map(r => r.level));
}

export function getFullRealmName(worldId: WorldId, realmLevel: number, stage: number, perfection: boolean): string {
  const baseName = getRealmName(worldId, realmLevel);
  if (perfection) return `${baseName}·大圆满`;
  const stageNames = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
  return `${baseName}·${stageNames[stage - 1] || '一'}层`;
}

export function canAscend(worldId: WorldId, realmLevel: number): boolean {
  const world = WORLD_DEFINITIONS[worldId];
  if (!world || !world.ascensionTarget || !world.ascensionRealmLevel) return false;
  return realmLevel >= world.ascensionRealmLevel;
}

export function getAscensionTarget(worldId: WorldId): { targetWorld: WorldId; targetRealmLevel: number } | null {
  const world = WORLD_DEFINITIONS[worldId];
  if (!world || !world.ascensionTarget || !world.ascensionRealmLevel) return null;
  const targetWorld = WORLD_DEFINITIONS[world.ascensionTarget];
  if (!targetWorld) return null;
  const targetRealm = Math.floor(targetWorld.realms.length * 0.4);
  return {
    targetWorld: world.ascensionTarget,
    targetRealmLevel: Math.max(1, targetRealm),
  };
}

export const WORLD_LIST: WorldId[] = [
  WorldId.PERFECT_WORLD,
  WorldId.DOU_PO,
  WorldId.FAN_REN,
  WorldId.XIAN_NI,
  WorldId.SHEN_MU,
  WorldId.ZHE_TIAN,
  WorldId.SHENG_XU,
];
