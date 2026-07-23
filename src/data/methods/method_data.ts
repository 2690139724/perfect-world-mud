// 功法系统接口定义与数据注册
// 根据小说《完美世界》设计的功法系统

/** 功法获取途径类型 */
export enum AcquireType {
  /** 出生自带（每位修士皆可使用） */
  STARTING = 'starting',
  /** 宗门传承（加入宗门后自动传授或宗门藏经阁兑换） */
  SECT = 'sect',
  /** NPC 赠予（提升好感度后赠与） */
  NPC_GIFT = 'npc_gift',
  /** NPC 授业（需拜师或完成任务） */
  NPC_TUTOR = 'npc_tutor',
  /** 机缘（探索、奇遇、战斗、灵气潮汐等随机触发） */
  DESTINY = 'destiny',
  /** 任务奖励（完成任务后获得） */
  QUEST_REWARD = 'quest_reward',
  /** 副本/秘境奖励 */
  DUNGEON_REWARD = 'dungeon_reward',
  /** 兑换（用声望/贡献/灵石在特定地点兑换） */
  EXCHANGE = 'exchange',
}

/** 获取条件 */
export interface IAcquireCondition {
  /** 最低境界要求 */
  minRealm?: number;
  /** 最低声望要求 */
  minReputation?: number;
  /** 关联宗门 ID（宗门传承/兑换用） */
  sectId?: string;
  /** 关联 NPC ID（赠予/授业用） */
  npcId?: string;
  /** 关联任务 ID（任务奖励用） */
  questId?: string;
  /** 关联副本 ID（秘境奖励用） */
  dungeonId?: string;
  /** 关联兑换地点 */
  exchangeLocationId?: string;
  /** 兑换所需货币 */
  exchangeCost?: { gold?: number; reputation?: number; sectContribution?: number; spiritStones?: number };
}

export interface ICultivationMethod {
  id: string;
  name: string;
  description: string;
  grade: '黄' | '玄' | '地' | '天' | '至尊' | '仙';
  speedBonus: number;      // 修炼速度加成，0.5-3.0
  requiredRealm: number;    // 最低修炼境界，0=凡人即可
  specialEffects: string[]; // 特殊效果描述
  source: string;           // 获取途径（原文）
  /** 获取类型 */
  acquireType: AcquireType;
  /** 获取途径详细描述 */
  acquireDetail: string;
  /** 获取条件 */
  acquireCondition?: IAcquireCondition;
  /** 进阶后功法ID */
  evolvesTo?: string;
  /** 进阶后功法名 */
  evolvesToName?: string;
  /** 进阶所需熟练度 */
  proficiencyRequired?: number;
}

/** 功法品阶顺序 */
export const GRADE_ORDER: Array<'黄' | '玄' | '地' | '天' | '至尊' | '仙'> = ['黄', '玄', '地', '天', '至尊', '仙'];

/** 品阶颜色（CSS class名） */
export const GRADE_COLOR_CLASS: Record<string, string> = {
  '黄': 'method-grade-huang',
  '玄': 'method-grade-xuan',
  '地': 'method-grade-di',
  '天': 'method-grade-tian',
  '至尊': 'method-grade-zhizun',
  '仙': 'method-grade-xian',
};

/** 品阶描述 */
export const GRADE_DESC: Record<string, string> = {
  '黄': '凡品功法，根基之法',
  '玄': '玄品功法，初窥门径',
  '地': '地品功法，登堂入室',
  '天': '天品功法，威震一方',
  '至尊': '至尊功法，万法之尊',
  '仙': '仙品功法，超凡入圣',
};

/** 顿悟进阶奥义描述池 */
export const ENLIGHTENMENT_OBSCURE_WORDS: Record<string, string[]> = {
  '黄': [
    '感悟天地灵气流转之理，功法运转更加圆融',
    '体内经脉拓宽，灵力运转效率提升',
    '基础更加稳固，为日后进阶打下根基',
  ],
  '玄': [
    '领悟五行相生之妙，功法奥义初显',
    '体内灵力质变，蕴含玄妙之力',
    '功法与天地共鸣，修炼效率大增',
  ],
  '地': [
    '触碰到地脉之力，功法威能暴涨',
    '领悟地之厚重，根基坚不可摧',
    '功法奥义深入，已窥天机',
  ],
  '天': [
    '引动天威，功法蕴含天道之力',
    '领悟天道运行之理，万法归一',
    '功法大成，天降异象',
  ],
  '至尊': [
    '感悟至尊之威，功法已臻化境',
    '万法臣服，功法威压盖世',
    '触及大道本源，功法超凡',
  ],
  '仙': [
    '证得仙道，功法已至圆满',
    '超脱天地束缚，功法蕴含仙韵',
    '万法归宗，仙道大成',
  ],
};

// ===== 功法注册表 =====
const methodRegistry = new Map<string, ICultivationMethod>();

function registerMethod(method: ICultivationMethod): void {
  methodRegistry.set(method.id, method);
}

// ===== 注册功法 =====

// 原始真解 (黄) → 可进阶为原始真解·玄篇
registerMethod({
  id: 'yuanshi_zhenjie',
  name: '原始真解',
  description: '上古流传下来的基础修炼法门，记载了天地运行的根本道理，是一切功法的根基。',
  grade: '黄',
  speedBonus: 1.0,
  requiredRealm: 0,
  specialEffects: ['基础修炼法门'],
  source: '天地传承',
  acquireType: AcquireType.STARTING,
  acquireDetail: '修士出生即已领悟，无需外求。原始真解记载于天地本源，万法之基，传说太古时代的强者皆以此法为根基。',
  evolvesTo: 'yuanshi_zhenjie_xuan',
  evolvesToName: '原始真解·玄篇',
  proficiencyRequired: 100,
});

// 厚土诀 (黄)
registerMethod({
  id: 'houtu_jue',
  name: '厚土诀',
  description: '引大地厚土之力淬炼己身，虽品阶不高但胜在稳固扎实，修炼后气血充盈、防御力提升。',
  grade: '黄',
  speedBonus: 0.8,
  requiredRealm: 0,
  specialEffects: ['基础防御'],
  source: '石城兵阁',
  acquireType: AcquireType.NPC_GIFT,
  acquireDetail: '前往石城兵阁拜访老铁匠，提升好感度至"朋友"后，他会将家传厚土诀传授于你。',
  acquireCondition: { npcId: 'stone_city_blacksmith', minRealm: 0 },
});

// 五行诀 (玄)
registerMethod({
  id: 'wuxing_jue',
  name: '五行诀',
  description: '以五行相生之理运转体内灵力，金木水火土五种属性均衡发展，根基稳固。',
  grade: '玄',
  speedBonus: 1.2,
  requiredRealm: 0,
  specialEffects: ['五行平衡'],
  source: '火皇城灵药阁',
  acquireType: AcquireType.EXCHANGE,
  acquireDetail: '在火皇城灵药阁用 200 金币 + 30 声望兑换，需境界达到搬血境。',
  acquireCondition: { minRealm: 1, exchangeLocationId: 'fire_pharmacy', exchangeCost: { gold: 200, reputation: 30 } },
});

// 补天术 (玄)
registerMethod({
  id: 'butian_shu',
  name: '补天术',
  description: '补天阁镇阁功法，据说脱胎于上古补天神通。不仅能加速修炼，还能修复体内伤势，恢复力惊人。',
  grade: '玄',
  speedBonus: 1.3,
  requiredRealm: 1,
  specialEffects: ['修复伤势', '补天阁传承'],
  source: '补天阁传承',
  acquireType: AcquireType.SECT,
  acquireDetail: '加入补天阁（需化灵境 + 100 声望），晋升为"内门弟子"后自动传授。',
  acquireCondition: { minRealm: 3, minReputation: 100, sectId: 'butian_ge' },
});

// 柳神法 (地)
registerMethod({
  id: 'liushen_fa',
  name: '柳神法',
  description: '柳神所传的无上法门，以柔克刚，防御无双。修炼到大成可化身柳树，万法不侵。',
  grade: '地',
  speedBonus: 1.5,
  requiredRealm: 2,
  specialEffects: ['防御加成', '柳神传承'],
  source: '柳神传承',
  acquireType: AcquireType.DESTINY,
  acquireDetail: '在石村后山寻找那株通天柳树（需列阵境），通过其"考验"后获得柳神赐法。机率触发。',
  acquireCondition: { minRealm: 5 },
});

// 六道轮回拳 (天)
registerMethod({
  id: 'liudao_lunhuiquan',
  name: '六道轮回拳',
  description: '百断山出土的上古拳法，一拳出而六道现，轮回之力加身，攻击力冠绝同阶。',
  grade: '天',
  speedBonus: 1.7,
  requiredRealm: 3,
  specialEffects: ['攻击加成'],
  source: '百断山传承',
  acquireType: AcquireType.DUNGEON_REWARD,
  acquireDetail: '通关"百断山遗迹"传说级副本最后一层，打败 BOSS 后开启传承宝箱获得。',
  acquireCondition: { minRealm: 3, dungeonId: 'baiduan_ruins' },
});

// 雷帝法 (天)
registerMethod({
  id: 'leidi_fa',
  name: '雷帝法',
  description: '雷帝遗留的至高雷法，引九天神雷淬体，举手投足间雷光万丈，克制一切邪祟。',
  grade: '天',
  speedBonus: 1.8,
  requiredRealm: 3,
  specialEffects: ['雷系攻击'],
  source: '雷帝遗迹',
  acquireType: AcquireType.DESTINY,
  acquireDetail: '在雷雨天前往雷帝遗迹（旧矿区北部），引动九天神雷入体，有机率触发雷帝残念传承。',
  acquireCondition: { minRealm: 3 },
});

// 真凰法 (天)
registerMethod({
  id: 'zhenhuang_fa',
  name: '真凰法',
  description: '真凰一族的无上宝术，浴火重生，涅槃不灭。修炼此法者生命力极强，哪怕遭受重创也能涅槃再生。',
  grade: '天',
  speedBonus: 1.9,
  requiredRealm: 3,
  specialEffects: ['涅槃重生'],
  source: '真凰遗迹',
  acquireType: AcquireType.DUNGEON_REWARD,
  acquireDetail: '通关"南陨神岭·真凰巢"神话级副本，激活涅槃之火后自动习得。',
  acquireCondition: { minRealm: 3, dungeonId: 'zhenhuang_nest' },
});

// 鲲鹏法 (至尊)
registerMethod({
  id: 'kunpeng_fa',
  name: '鲲鹏法',
  description: '鲲鹏族的至高宝术，化而为鸟其名为鹏，化而为鱼其名为鲲。速度冠绝天下，同时兼具至强力量。',
  grade: '至尊',
  speedBonus: 2.2,
  requiredRealm: 5,
  specialEffects: ['速度极致'],
  source: '鲲鹏巢穴',
  acquireType: AcquireType.DESTINY,
  acquireDetail: '完成"鲲鹏遗种"隐藏支线任务（需在北冥海底发现鲲鹏幼崽并抚养），机率触发其主动传功。',
  acquireCondition: { minRealm: 5 },
});

// 他化自在 (仙)
registerMethod({
  id: 'tahua_zizai',
  name: '他化自在',
  description: '终极传承之法，万法归宗，可演化世间一切法门。修炼到极致，天地万法皆可为我所用。',
  grade: '仙',
  speedBonus: 3.0,
  requiredRealm: 7,
  specialEffects: ['万法归宗'],
  source: '终极传承',
  acquireType: AcquireType.DESTINY,
  acquireDetail: '集齐十凶宝术全部，至尊境后触发"他化自在"大因果，自动获得（游戏终极成就之一）。',
  acquireCondition: { minRealm: 14 },
});

// 石家拳法 (黄)
registerMethod({
  id: 'shijia_quanfa',
  name: '石家拳法',
  description: '石族世代相传的基础拳法，虽然简单但在荒域中极为实用，强身健体、淬炼筋骨。',
  grade: '黄',
  speedBonus: 0.7,
  requiredRealm: 0,
  specialEffects: ['基础修炼'],
  source: '石城石族',
  acquireType: AcquireType.NPC_TUTOR,
  acquireDetail: '在石城石族祠堂拜石族长为师（需 50 声望），完成三次考验后习得。',
  acquireCondition: { npcId: 'stone_clan_chief', minReputation: 50 },
});

// 引气诀 (黄)
registerMethod({
  id: 'yinqi_jue',
  name: '引气诀',
  description: '最基础的引气入体法门，引导天地灵气进入体内，淬炼经脉。',
  grade: '黄',
  speedBonus: 0.9,
  requiredRealm: 0,
  specialEffects: ['基础引气'],
  source: '石城书阁',
  acquireType: AcquireType.EXCHANGE,
  acquireDetail: '在石城书阁用 50 金币购买。入门级功法，人人可习。',
  acquireCondition: { exchangeLocationId: 'stone_city_bookstore', exchangeCost: { gold: 50 } },
});

// 火皇经 (玄)
registerMethod({
  id: 'huohuang_jing',
  name: '火皇经',
  description: '火皇城的不传之秘，引动天地火灵气淬炼己身，修炼出的法力带有火焰之力。',
  grade: '玄',
  speedBonus: 1.2,
  requiredRealm: 1,
  specialEffects: ['火焰之力'],
  source: '火皇城传承',
  acquireType: AcquireType.SECT,
  acquireDetail: '加入火皇城势力（需 200 声望），晋升"火将"后自动传授。',
  acquireCondition: { minRealm: 1, minReputation: 200, sectId: 'huohuang_cheng' },
});

// 百断山炼体诀 (地)
registerMethod({
  id: 'baiduan_lianti',
  name: '百断山炼体诀',
  description: '百断山出土的上古炼体法门，以极端环境淬炼肉身，修炼到大成可肉身硬抗宝术。',
  grade: '地',
  speedBonus: 1.4,
  requiredRealm: 2,
  specialEffects: ['肉身强化'],
  source: '百断山遗迹',
  acquireType: AcquireType.DUNGEON_REWARD,
  acquireDetail: '通关"百断山"精英级副本第 5 层"炼体试炼"，通过肉身考验后获得。',
  acquireCondition: { minRealm: 2, dungeonId: 'baiduan_mountain' },
});

// 逐鹿心经 (地)
registerMethod({
  id: 'zhulu_xinjing',
  name: '逐鹿心经',
  description: '逐鹿书院镇院功法，以文入道，以心证道。修炼此法需博览群书，以才气推动修为。',
  grade: '地',
  speedBonus: 1.5,
  requiredRealm: 2,
  specialEffects: ['文气入道'],
  source: '逐鹿书院传承',
  acquireType: AcquireType.SECT,
  acquireDetail: '加入逐鹿书院（需铭纹境 + 200 声望），完成"书山有路"任务后传授。',
  acquireCondition: { minRealm: 4, minReputation: 200, sectId: 'zhulu_shuyuan' },
});

// 不老长春功 (天)
registerMethod({
  id: 'bulao_changchun',
  name: '不老长春功',
  description: '不老山的不传之秘，修炼有成者青春永驻，寿命大幅延长。法力绵长，生生不息。',
  grade: '天',
  speedBonus: 1.7,
  requiredRealm: 3,
  specialEffects: ['延年益寿'],
  source: '不老山传承',
  acquireType: AcquireType.SECT,
  acquireDetail: '加入不老山（需列阵境 + 300 声望），并完成"长春试炼"后获得。',
  acquireCondition: { minRealm: 5, minReputation: 300, sectId: 'bulao_shan' },
});

// ===== 功法进阶路径（顿悟后解锁的更高品阶功法） =====

// 原始真解·玄篇 (玄) — 原始真解顿悟进阶
registerMethod({
  id: 'yuanshi_zhenjie_xuan',
  name: '原始真解·玄篇',
  description: '原始真解顿悟后的进阶形态，领悟了天地运行的玄妙之理，功法运转效率大增。',
  grade: '玄',
  speedBonus: 1.5,
  requiredRealm: 0,
  specialEffects: ['基础修炼法门', '玄妙感悟'],
  source: '顿悟进阶',
  acquireType: AcquireType.DESTINY,
  acquireDetail: '修炼《原始真解》熟练度达到 100 后自动顿悟进阶（无门槛，纯粹靠机缘）。',
  acquireCondition: { minRealm: 0 },
  evolvesTo: 'yuanshi_zhenjie_di',
  evolvesToName: '原始真解·地篇',
  proficiencyRequired: 300,
});

// 原始真解·地篇 (地) — 二次顿悟
registerMethod({
  id: 'yuanshi_zhenjie_di',
  name: '原始真解·地篇',
  description: '二次顿悟后，原始真解触及地脉本源之力，功法威能暴涨，根基坚不可摧。',
  grade: '地',
  speedBonus: 2.0,
  requiredRealm: 0,
  specialEffects: ['基础修炼法门', '玄妙感悟', '地脉之力'],
  source: '顿悟进阶',
  acquireType: AcquireType.DESTINY,
  acquireDetail: '修炼《原始真解·玄篇》熟练度达到 300 后自动顿悟进阶。',
  acquireCondition: { minRealm: 0 },
  evolvesTo: 'yuanshi_zhenjie_tian',
  evolvesToName: '原始真解·天篇',
  proficiencyRequired: 800,
});

// 原始真解·天篇 (天) — 三次顿悟
registerMethod({
  id: 'yuanshi_zhenjie_tian',
  name: '原始真解·天篇',
  description: '三次顿悟，原始真解引动天威，蕴含天道之力。石昊正是凭借原始真解不断领悟，最终化茧成蝶。',
  grade: '天',
  speedBonus: 2.5,
  requiredRealm: 0,
  specialEffects: ['基础修炼法门', '玄妙感悟', '地脉之力', '天道共鸣'],
  source: '顿悟进阶',
  acquireType: AcquireType.DESTINY,
  acquireDetail: '修炼《原始真解·地篇》熟练度达到 800 后自动顿悟进阶。',
  acquireCondition: { minRealm: 0 },
  evolvesTo: 'yuanshi_zhenjie_zhizun',
  evolvesToName: '原始真解·至尊篇',
  proficiencyRequired: 2000,
});

// 原始真解·至尊篇 (至尊) — 四次顿悟
registerMethod({
  id: 'yuanshi_zhenjie_zhizun',
  name: '原始真解·至尊篇',
  description: '四次顿悟，原始真解已臻化境，万法臣服，功法威压盖世。这正是石昊走过的道路。',
  grade: '至尊',
  speedBonus: 2.8,
  requiredRealm: 0,
  specialEffects: ['基础修炼法门', '玄妙感悟', '地脉之力', '天道共鸣', '万法臣服'],
  source: '顿悟进阶',
  acquireType: AcquireType.DESTINY,
  acquireDetail: '修炼《原始真解·天篇》熟练度达到 2000 后自动顿悟进阶。',
  acquireCondition: { minRealm: 0 },
  evolvesTo: 'yuanshi_zhenjie_xian',
  evolvesToName: '原始真解·仙篇',
  proficiencyRequired: 5000,
});

// 原始真解·仙篇 (仙) — 终极顿悟
registerMethod({
  id: 'yuanshi_zhenjie_xian',
  name: '原始真解·仙篇',
  description: '终极顿悟，原始真解证得仙道，超脱天地束缚，万法归宗。传说石昊最终就是以此法超凡入圣。',
  grade: '仙',
  speedBonus: 3.5,
  requiredRealm: 0,
  specialEffects: ['基础修炼法门', '玄妙感悟', '地脉之力', '天道共鸣', '万法臣服', '仙道大成'],
  source: '顿悟进阶',
  acquireType: AcquireType.DESTINY,
  acquireDetail: '修炼《原始真解·至尊篇》熟练度达到 5000 后自动顿悟进阶（终极形态）。',
  acquireCondition: { minRealm: 0 },
});

// ===== 导出函数 =====

export function getAllMethods(): ICultivationMethod[] {
  return Array.from(methodRegistry.values());
}

export function getMethod(id: string): ICultivationMethod | undefined {
  return methodRegistry.get(id);
}

export function getMethodsByRealm(realm: number): ICultivationMethod[] {
  const result: ICultivationMethod[] = [];
  for (const method of methodRegistry.values()) {
    if (method.requiredRealm <= realm) {
      result.push(method);
    }
  }
  return result;
}