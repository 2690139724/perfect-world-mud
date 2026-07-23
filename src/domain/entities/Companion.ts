import { CultivationRealm, RealmNames } from './Player';
import { ITechnique } from './Technique';

export enum CompanionRelationship {
  STRANGER = '陌生人',
  ACQUAINTANCE = '相识',
  FRIEND = '朋友',
  CLOSE_FRIEND = '挚友',
  LOVER = '道侣',
  SOULMATE = '灵魂伴侣',
}

export enum CompanionPersonality {
  COLD = '高冷',
  WARM = '温柔',
  FIERY = '火爆',
  CALM = '沉稳',
  PLAYFUL = '俏皮',
  MYSTERIOUS = '神秘',
}

export enum CompanionType {
  MORTAL = '凡人',
  CULTIVATOR = '修士',
  DEMON = '妖族',
  SPIRIT = '灵体',
  GODDESS = '神女',
}

/** 六国差异（春宵意象源） */
export enum CompanionNation {
  STONE = '石国',
  FIRE = '火国',
  WOOD = '木国',
  RAIN = '雨国',
  WIND = '风国',
  HUMAN = '人国',
  NONE = '散修',
}

/** 道侣专属剧情节点 */
export interface ICompanionStoryNode {
  id: string;
  /** 触发所需关系阶段 */
  requiredRelationship: CompanionRelationship;
  /** 触发所需好感度下限 */
  requiredAffinity: number;
  /** 标题 */
  title: string;
  /** 剧情正文 */
  content: string;
  /** 完成后奖励 */
  reward?: { affinity?: number; exp?: number; itemId?: string; techniqueId?: string };
  /** 解锁的下一节点 id */
  nextNodeId?: string;
}

/** 交互动作（按关系阶段分层解锁） */
export interface ICompanionInteraction {
  id: string;
  /** 动作名称 */
  name: string;
  /** 动作类型 */
  type: 'chat' | 'gift' | 'meditate' | 'adventure' | 'duel' | 'play' | 'exchange' | 'protect' | 'springnight';
  /** 解锁所需关系阶段 */
  requiredRelationship: CompanionRelationship;
  /** 好感收益 */
  affinityGain: number;
  /** 修为收益 */
  expGain?: number;
  /** 法力消耗 */
  manaCost?: number;
  /** 描述 */
  description: string;
}

export interface ICompanion {
  id: string;
  name: string;
  avatarId: string;
  personality: CompanionPersonality;
  type: CompanionType;
  realm: CultivationRealm;
  realmStage: number;
  affinity: number;
  maxAffinity: number;
  relationship: CompanionRelationship;
  exclusiveSkill?: ITechnique;
  bondSkillId?: string;
  giftPreferences: string[];
  storyProgress: number;
  cultivationBonus: number;
  combatBonus: number;
  lastInteractionTime: number;
  isOnline: boolean;
  location?: string;
  /** 所属国（影响春宵意象） */
  nation: CompanionNation;
  /** 势力背景（如：紫电宗真传、截天教圣女、火国公主） */
  faction: string;
  /** 专属剧情节点 */
  storyNodes: ICompanionStoryNode[];
  /** 可用交互动作 */
  interactions: ICompanionInteraction[];
  /** 已解锁的双修姿势 id 列表 */
  unlockedPoses: string[];
  /** 今日已互动次数（每日重置） */
  todayInteractCount: number;
  /** 上次互动日期（YYYY-MM-DD） */
  lastInteractDate: string;
  /** 是否已正式结为道侣 */
  isBonded: boolean;
}

export const RELATIONSHIP_CONFIG: Record<CompanionRelationship, { minAffinity: number; maxAffinity: number; bonuses: { cultivation: number; combat: number } }> = {
  [CompanionRelationship.STRANGER]: {
    minAffinity: 0,
    maxAffinity: 99,
    bonuses: { cultivation: 0, combat: 0 },
  },
  [CompanionRelationship.ACQUAINTANCE]: {
    minAffinity: 100,
    maxAffinity: 299,
    bonuses: { cultivation: 0.02, combat: 0.01 },
  },
  [CompanionRelationship.FRIEND]: {
    minAffinity: 300,
    maxAffinity: 499,
    bonuses: { cultivation: 0.05, combat: 0.03 },
  },
  [CompanionRelationship.CLOSE_FRIEND]: {
    minAffinity: 500,
    maxAffinity: 799,
    bonuses: { cultivation: 0.1, combat: 0.06 },
  },
  [CompanionRelationship.LOVER]: {
    minAffinity: 800,
    maxAffinity: 1499,
    bonuses: { cultivation: 0.2, combat: 0.15 },
  },
  [CompanionRelationship.SOULMATE]: {
    minAffinity: 1500,
    maxAffinity: 9999,
    bonuses: { cultivation: 0.35, combat: 0.25 },
  },
};

export const PERSONALITY_INTERACTIONS: Record<CompanionPersonality, {
  giftBonus: Record<string, number>;
  preferredActions: string[];
  dialogueStyle: string;
}> = {
  [CompanionPersonality.COLD]: {
    giftBonus: { 'jewelry': 1.5, 'weapons': 1.2, 'potions': 0.8 },
    preferredActions: ['meditate', 'practice', 'exchange'],
    dialogueStyle: '冷淡',
  },
  [CompanionPersonality.WARM]: {
    giftBonus: { 'flowers': 1.5, 'food': 1.3, 'clothes': 1.2 },
    preferredActions: ['chat', 'gift', 'adventure'],
    dialogueStyle: '温柔',
  },
  [CompanionPersonality.FIERY]: {
    giftBonus: { 'weapons': 1.5, 'alcohol': 1.3, 'challenge': 1.4 },
    preferredActions: ['duel', 'adventure', 'compete'],
    dialogueStyle: '热情',
  },
  [CompanionPersonality.CALM]: {
    giftBonus: { 'books': 1.5, 'tea': 1.3, 'artifacts': 1.2 },
    preferredActions: ['chat', 'meditate', 'study'],
    dialogueStyle: '沉稳',
  },
  [CompanionPersonality.PLAYFUL]: {
    giftBonus: { 'toys': 1.5, 'snacks': 1.3, 'novelty': 1.4 },
    preferredActions: ['play', 'adventure', 'prank'],
    dialogueStyle: '俏皮',
  },
  [CompanionPersonality.MYSTERIOUS]: {
    giftBonus: { 'mystical': 1.5, 'ancient': 1.4, 'rare': 1.3 },
    preferredActions: ['explore', 'meditate', 'secret'],
    dialogueStyle: '神秘',
  },
};

export const COMPANION_TASKS = [
  { id: 'task_companion_1', title: '初遇', description: '与道侣初次相遇', reward: { affinity: 50, exp: 100 } },
  { id: 'task_companion_2', title: '同行修炼', description: '与道侣一同修炼一次', reward: { affinity: 30, exp: 200 } },
  { id: 'task_companion_3', title: '赠送礼物', description: '送给道侣一件心仪的礼物', reward: { affinity: 40, exp: 150 } },
  { id: 'task_companion_4', title: '共同战斗', description: '与道侣一起击败敌人', reward: { affinity: 60, exp: 300 } },
  { id: 'task_companion_5', title: '突破相助', description: '在道侣突破时提供帮助', reward: { affinity: 100, exp: 500 } },
  { id: 'task_companion_6', title: '秘境探险', description: '与道侣一同探索秘境', reward: { affinity: 80, exp: 400 } },
  { id: 'task_companion_7', title: '生死与共', description: '在战斗中保护道侣免受致命伤害', reward: { affinity: 150, exp: 800 } },
  { id: 'task_companion_8', title: '灵魂共鸣', description: '与道侣达到灵魂伴侣境界', reward: { affinity: 0, exp: 2000, title: '灵魂伴侣' } },
];

export function calculateCompanionBonuses(companion: ICompanion): { cultivation: number; combat: number } {
  const config = RELATIONSHIP_CONFIG[companion.relationship];
  const affinityBonus = Math.floor(companion.affinity / 100) * 0.01;
  
  return {
    cultivation: config.bonuses.cultivation + affinityBonus + companion.cultivationBonus,
    combat: config.bonuses.combat + affinityBonus + companion.combatBonus,
  };
}

export function updateRelationship(companion: ICompanion): CompanionRelationship {
  const affinity = companion.affinity;
  
  for (const [relationship, config] of Object.entries(RELATIONSHIP_CONFIG)) {
    if (affinity >= config.minAffinity && affinity <= config.maxAffinity) {
      return relationship as CompanionRelationship;
    }
  }
  
  return CompanionRelationship.SOULMATE;
}

export function getAffinityChange(action: string, companion: ICompanion): number {
  const personality = PERSONALITY_INTERACTIONS[companion.personality];
  
  switch (action) {
    case 'chat':
      return personality.preferredActions.includes('chat') ? 20 : 10;
    case 'gift':
      return 30;
    case 'meditate':
      return personality.preferredActions.includes('meditate') ? 25 : 15;
    case 'adventure':
      return personality.preferredActions.includes('adventure') ? 35 : 20;
    case 'duel':
      return personality.preferredActions.includes('duel') ? 30 : 15;
    case 'play':
      return personality.preferredActions.includes('play') ? 25 : 10;
    case 'exchange':
      return personality.preferredActions.includes('exchange') ? 30 : 15;
    case 'protect':
      return 50;
    default:
      return 5;
  }
}

export function getRealmName(realm: CultivationRealm): string {
  return RealmNames[realm] || '未知';
}

// ====================================================================
// 春宵场景：6国差异化意象 + 自然意象映射动作库
// 严格遵循映射关系（藤蔓缠绕=拥抱 / 月光沿山脊=抚摸 / 溪水沿石缝=亲吻 /
// 云在暮色交融=身体贴合 / 花瓣滑落=衣物滑落或反应 / 弓弦拉满=身体绷紧或准备 /
// 风穿垂柳=抚摸发丝或触碰 / 烛影合拢=两人靠近或贴合 / 露珠颤动=身体颤抖或反应）
// 结构：前奏(1句) + 高潮(2-4句) + 收尾(1句)，每段 50-100 字
// 仅描写局部动作与感官意象，禁用直接身体部位描写
// ====================================================================

/** 六国春宵意象池 */
export const SPRING_NIGHT_IMAGERY: Record<CompanionNation, {
  prelude: string[];   // 前奏意象
  climax: string[];    // 高潮意象
  ending: string[];    // 收尾意象
}> = {
  [CompanionNation.STONE]: {
    prelude: [
      '宫灯映锦缎，沉香烟缕绕梁而上',
      '金丝帷幔低垂，宫灯将两道影子投成一道',
    ],
    climax: [
      '月光沿山脊缓缓滑落，藤蔓在锦缎间无声缠绕',
      '烛影合拢，露珠在宫灯辉光下轻轻颤动',
      '弓弦拉满又松，花瓣自沉香屑中无声滑落',
    ],
    ending: [
      '宫灯渐暗，唯余沉香余韵袅袅',
      '锦缎上月光如水，露珠终于归于平静',
    ],
  },
  [CompanionNation.FIRE]: {
    prelude: [
      '赤纱垂地，红烛将整室映作暖霞',
      '红烛摇曳，赤纱在风里轻轻起伏',
    ],
    climax: [
      '烛影合拢，藤蔓在赤纱间炽烈缠绕',
      '弓弦拉满，露珠在烛光下颤动如火星',
      '云在暮色交融，花瓣随烛泪一同滑落',
    ],
    ending: [
      '红烛燃至半截，赤纱上残温未散',
      '烛影散去，唯余两缕气息交缠于暖霞中',
    ],
  },
  [CompanionNation.WOOD]: {
    prelude: [
      '花香满室，藤萝自梁上垂落如帘',
      '藤萝低垂，花香将夜色染作青翠',
    ],
    climax: [
      '藤蔓缠绕再缠绕，月光沿山脊滑过花影',
      '风穿垂柳，花瓣自藤萝间纷纷滑落',
      '云在暮色交融，露珠在花蕊中颤动',
    ],
    ending: [
      '花香渐淡，藤萝在月色中归于静默',
      '花瓣落尽，唯余藤蔓相依如初',
    ],
  },
  [CompanionNation.RAIN]: {
    prelude: [
      '青纱半卷，雨声将夜色浸润成水墨',
      '雨声潺潺，青纱在湿润气息中浮动',
    ],
    climax: [
      '溪水沿石缝潺潺而下，青纱被雨声浸透',
      '风穿垂柳，露珠在青纱上颤动如雨痕',
      '云在暮色交融，花瓣随雨声一同滑落',
    ],
    ending: [
      '雨声渐歇，青纱上残留湿润月色',
      '青纱垂落，唯余雨声余韵入梦',
    ],
  },
  [CompanionNation.WIND]: {
    prelude: [
      '驼绒厚叠，风啸将帐外天地隔远',
      '风啸阵阵，驼绒在帐中铺成暖云',
    ],
    climax: [
      '弓弦拉满又松，驼绒间藤蔓无声缠绕',
      '风穿垂柳，露珠在驼绒上颤动',
      '云在暮色交融，花瓣随风啸一同滑落',
    ],
    ending: [
      '风啸渐远，驼绒上余温如旧',
      '驼绒拢紧，唯余风声在帐外低吟',
    ],
  },
  [CompanionNation.HUMAN]: {
    prelude: [
      '素纱轻垂，檀香将气息调成沉静',
      '檀香袅袅，素纱在月色中浮动如雾',
    ],
    climax: [
      '月光沿山脊缓缓滑过，素纱间藤蔓缠绕',
      '烛影合拢，露珠在檀香烟缕中颤动',
      '云在暮色交融，花瓣自素纱间滑落',
    ],
    ending: [
      '檀香燃尽，素纱上月光如水',
      '素纱垂落，唯余檀香余韵入心',
    ],
  },
  [CompanionNation.NONE]: {
    prelude: [
      '帷幔低垂，夜色将两人影叠为一道',
      '月光入户，夜风将气息染成清浅',
    ],
    climax: [
      '月光沿山脊缓缓滑过，藤蔓在夜色中缠绕',
      '烛影合拢，露珠在月辉下轻轻颤动',
      '云在暮色交融，花瓣无声滑落',
    ],
    ending: [
      '夜色渐深，唯余两道气息交缠',
      '月光如水，露珠终于归于平静',
    ],
  },
};

/** 双修姿势（按关系阶段与好感度分层解锁） */
export interface IDualCultivationPose {
  id: string;
  name: string;
  /** 解锁所需关系阶段 */
  requiredRelationship: CompanionRelationship;
  /** 解锁所需好感度下限 */
  requiredAffinity: number;
  /** 修为加成倍率 */
  expMultiplier: number;
  /** 法力消耗 */
  manaCost: number;
  /** 每日限次 */
  dailyLimit: number;
  /** 姿势描述（含意象映射，不含直接描写） */
  description: string;
}

export const DUAL_CULTIVATION_POSES: IDualCultivationPose[] = [
  {
    id: 'pose_yin_yang',
    name: '阴阳交汇',
    requiredRelationship: CompanionRelationship.LOVER,
    requiredAffinity: 800,
    expMultiplier: 1.5,
    manaCost: 80,
    dailyLimit: 1,
    description: '两人对坐相向，灵力互引，云在暮色交融，藤蔓缠绕如一。',
  },
  {
    id: 'pose_moon_ridge',
    name: '月下山脊',
    requiredRelationship: CompanionRelationship.LOVER,
    requiredAffinity: 1000,
    expMultiplier: 1.8,
    manaCost: 100,
    dailyLimit: 1,
    description: '月光沿山脊缓缓滑过，烛影合拢，露珠在月辉下颤动。',
  },
  {
    id: 'pose_cloud_dusk',
    name: '暮云相融',
    requiredRelationship: CompanionRelationship.SOULMATE,
    requiredAffinity: 1500,
    expMultiplier: 2.2,
    manaCost: 150,
    dailyLimit: 1,
    description: '云在暮色交融，花瓣无声滑落，弓弦拉满又松，露珠归于平静。',
  },
];

/** 默认交互动作池（按关系阶段分层解锁） */
export const DEFAULT_INTERACTIONS: ICompanionInteraction[] = [
  { id: 'int_chat', name: '闲谈', type: 'chat', requiredRelationship: CompanionRelationship.STRANGER, affinityGain: 10, description: '与道侣闲话家常' },
  { id: 'int_gift', name: '赠礼', type: 'gift', requiredRelationship: CompanionRelationship.STRANGER, affinityGain: 30, description: '送上一份心意' },
  { id: 'int_meditate', name: '同修', type: 'meditate', requiredRelationship: CompanionRelationship.ACQUAINTANCE, affinityGain: 20, expGain: 100, manaCost: 30, description: '一同打坐修炼' },
  { id: 'int_exchange', name: '论道', type: 'exchange', requiredRelationship: CompanionRelationship.FRIEND, affinityGain: 30, expGain: 200, description: '交流修炼心得' },
  { id: 'int_play', name: '游玩', type: 'play', requiredRelationship: CompanionRelationship.FRIEND, affinityGain: 25, description: '一同游玩散心' },
  { id: 'int_adventure', name: '同游秘境', type: 'adventure', requiredRelationship: CompanionRelationship.CLOSE_FRIEND, affinityGain: 40, expGain: 300, description: '携手探索秘境' },
  { id: 'int_duel', name: '切磋', type: 'duel', requiredRelationship: CompanionRelationship.CLOSE_FRIEND, affinityGain: 30, expGain: 150, description: '武艺切磋' },
  { id: 'int_protect', name: '守护', type: 'protect', requiredRelationship: CompanionRelationship.LOVER, affinityGain: 60, description: '舍身守护道侣' },
  { id: 'int_springnight', name: '春宵', type: 'springnight', requiredRelationship: CompanionRelationship.LOVER, affinityGain: 80, expGain: 500, manaCost: 80, description: '与道侣共度春宵（双修悟道）' },
];

/** 默认剧情节点模板（可在道侣数据中覆写） */
export const DEFAULT_STORY_NODES: ICompanionStoryNode[] = [
  {
    id: 'story_first_meet',
    requiredRelationship: CompanionRelationship.STRANGER,
    requiredAffinity: 0,
    title: '初遇',
    content: '命运的丝线悄然交织，你与{companionName}初次相遇。{faction}的背景让{ta}气质独特，目光交汇的瞬间，似乎有什么被悄然埋下。',
    reward: { affinity: 50, exp: 100 },
    nextNodeId: 'story_first_chat',
  },
  {
    id: 'story_first_chat',
    requiredRelationship: CompanionRelationship.ACQUAINTANCE,
    requiredAffinity: 100,
    title: '初识',
    content: '你与{companionName}渐熟，{ta}开始向你讲述{faction}中的往事。话语间，你似乎触碰到了{ta}心底某种柔软。',
    reward: { affinity: 80, exp: 200 },
    nextNodeId: 'story_shared_secret',
  },
  {
    id: 'story_shared_secret',
    requiredRelationship: CompanionRelationship.FRIEND,
    requiredAffinity: 300,
    title: '心事',
    content: '{companionName}向你吐露了{faction}中不为人知的秘密。这份信任，让你们之间的距离又近了一分。',
    reward: { affinity: 100, exp: 300 },
    nextNodeId: 'story_life_death',
  },
  {
    id: 'story_life_death',
    requiredRelationship: CompanionRelationship.CLOSE_FRIEND,
    requiredAffinity: 500,
    title: '生死与共',
    content: '一场突如其来的危机中，你与{companionName}并肩而战。弓弦拉满之际，{ta}为你挡下一记致命攻势——这一刻，你们已是生死之交。',
    reward: { affinity: 200, exp: 800 },
    nextNodeId: 'story_bond',
  },
  {
    id: 'story_bond',
    requiredRelationship: CompanionRelationship.LOVER,
    requiredAffinity: 800,
    title: '结缘',
    content: '烛影合拢，月光如水。你与{companionName}在天地见证下正式结为道侣，从此携手共赴长生路。',
    reward: { affinity: 300, exp: 1500 },
    nextNodeId: 'story_soulmate',
  },
  {
    id: 'story_soulmate',
    requiredRelationship: CompanionRelationship.SOULMATE,
    requiredAffinity: 1500,
    title: '灵魂共鸣',
    content: '云在暮色交融，露珠颤动归于平静。你与{companionName}已至灵魂共鸣之境，一念一动皆可心心相印。',
    reward: { affinity: 500, exp: 3000 },
  },
];