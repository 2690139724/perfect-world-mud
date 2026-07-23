import { Season } from './GameTime';

export enum WeatherType {
  SUNNY = 'sunny',           // 晴天
  CLOUDY = 'cloudy',         // 多云
  RAINY = 'rainy',           // 下雨
  STORMY = 'stormy',         // 暴风雨
  SNOWY = 'snowy',           // 下雪
  FOGGY = 'foggy',           // 大雾
  WINDY = 'windy',           // 大风
  HOT = 'hot',               // 酷热
  COLD = 'cold',             // 严寒
}

export enum NPCPersonalityTrait {
  DILIGENT = 'diligent',           // 勤劳
  LAZY = 'lazy',                   // 懒惰
  OPTIMISTIC = 'optimistic',        // 乐观
  PESSIMISTIC = 'pessimistic',      // 悲观
  SOCIAL = 'social',               // 喜社交
  SOLITARY = 'solitary',           // 孤僻
  DISCIPLINED = 'disciplined',      // 自律
  CAREFREE = 'carefree',           // 随性
  AMBITIOUS = 'ambitious',          // 有野心
  HUMBLE = 'humble',               // 谦逊
  BRAVE = 'brave',                 // 勇敢
  CAUTIOUS = 'cautious',           // 谨慎
  CREATIVE = 'creative',           // 有创意
  TRADITIONAL = 'traditional',      // 传统
  PATIENT = 'patient',             // 耐心
  IMPATIENT = 'impatient',          // 急躁
  GENEROUS = 'generous',           // 慷慨
  GREEDY = 'greedy',               // 贪婪
  HONEST = 'honest',               // 诚实
  CUNNING = 'cunning',             // 狡猾
}

export enum NPCActivityType {
  // 基本生活活动
  SLEEPING = 'sleeping',
  RESTING = 'resting',
  EATING = 'eating',
  
  // 修炼相关
  CULTIVATING = 'cultivating',
  MEDITATING = 'meditating',
  LEARNING = 'learning',
  HEALING = 'healing',
  
  // 战斗相关
  TRAINING = 'training',
  SPARRING = 'sparring',
  HUNTING = 'hunting',
  GUARDING = 'guarding',
  PATROLLING = 'patrolling',
  
  // 探索与出行
  TRAVELING = 'traveling',
  EXPLORING = 'exploring',
  
  // 社交与交易
  SOCIALIZING = 'socializing',
  TRADING = 'trading',
  SHOPPING = 'shopping',
  
  // 工作与技艺（修仙界常见）
  WORKING = 'working',
  CRAFTING = 'crafting',
  FARMING = 'farming',
  MINING = 'mining',
  GATHERING = 'gathering',
  BREWING = 'brewing',  // 酿制灵酒
  
  // 宗门与家族活动
  TEACHING = 'teaching',
  PRAYING = 'praying',  // 祭拜
  CEREMONY = 'ceremony',
  
  // 特殊活动
  STEALING = 'stealing',    // 潜入偷盗（小说常见）
  SPYING = 'spying',        // 刺探情报
  ESCORTING = 'escorting',  // 护送任务
  
  // 夜间活动
  PATROLLING_NIGHT = 'patrolling_night',
  NIGHT_WATCH = 'night_watch',
  LATE_NIGHT_CULTIVATION = 'late_night_cultivation',
  MOON_GAZING = 'moon_gazing',
  STAR_GAZING = 'star_gazing',
  
  // 完美世界特色
  SACRIFICING = 'sacrificing',
  WORSHIPPING = 'worshipping',
  BONE_RITUAL = 'bone_ritual',
  ANCESTRAL_WORSHIP = 'ancestral_worship',
  TRIBAL_MEETING = 'tribal_meeting',
  BATTLE_TRAINING = 'battle_training',
  BEAST_HUNTING = 'beast_hunting',
  HERB_GATHERING = 'herb_gathering',
  ALCHEMY = 'alchemy',
  RUNE_CARVING = 'rune_carving',
  REALM_CHALLENGE = 'realm_challenge',
  TRIBAL_COMPETITION = 'tribal_competition',
  BONE_SCRIPT_PRACTICE = 'bone_script_practice',
  
  // 遮天特色
  STAR_GAZING_MEDITATION = 'star_gazing_meditation',
  COSMIC_CULTIVATION = 'cosmic_cultivation',
  ALTAR_SACRIFICE = 'altar_sacrifice',
  ANCIENT_TABLET_STUDY = 'ancient_tablet_study',
  IMMORTAL_ROAD_GUARD = 'immortal_road_guard',
  STAR_WALKING = 'star_walking',
  SOUL_SEARCHING = 'soul_searching',
  SOURCE_REFINING = 'source_refining',
  DANTA_COMPETITION = 'danta_competition',
  
  // 圣墟特色
  EVOLUTION_PATH = 'evolution_path',
  REINCARNATION_BAPTISM = 'reincarnation_baptism',
  UNDERWORLD_TRIAL = 'underworld_trial',
  YANGWORLD_CULTIVATION = 'yangworld_cultivation',
  SOUL_LAMP_REFINING = 'soul_lamp_refining',
  ANCESTOR_COURT_WORSHIP = 'ancestor_court_worship',
  DARKNESS_EXPLORATION = 'darkness_exploration',
  BEAST_KINGDOM_CHALLENGE = 'beast_kingdom_challenge',
  
  // 斗破苍穹特色
  ALCHEMIST_COMPETITION = 'alchemist_competition',
  AUCTION_PARTICIPATION = 'auction_participation',
  BATTLE_QI_TRAINING = 'battle_qi_training',
  BATTLE_SKILL_PRACTICE = 'battle_skill_practice',
  FIRE_CONTROL_TRAINING = 'fire_control_training',
  MEDICINAL_STUDY = 'medicinal_study',
  GUILD_MISSION = 'guild_mission',
  ARENA_BATTLE = 'arena_battle',
  
  // 神墓特色
  YIN_YANG_PRACTICE = 'yin_yang_practice',
  TIME_SPACE_CULTIVATION = 'time_space_cultivation',
  UNDEAD_SUMMONING = 'undead_summoning',
  DEITY_DEMON_BATTLE = 'deity_demon_battle',
  HEAVENLY_TAO_PERCEPTION = 'heavenly_tao_perception',
  REINCARNATION_CYCLE = 'reincarnation_cycle',
  WORLD_CREATION = 'world_creation',
  
  // 凡人修仙传特色
  TALISMAN_DRAWING = 'talisman_drawing',
  MAGIC_ITEM_REFINING = 'magic_item_refining',
  SPIRIT_STONE_MEDITATION = 'spirit_stone_meditation',
  MARKET_BROWSING = 'market_browsing',
  BLOODY_TRIAL = 'bloody_trial',
  CLAN_MISSION = 'clan_mission',
  SEAL_RESEARCH = 'seal_research',
  SPIRIT_BEAST_TAMING = 'spirit_beast_taming',
  
  // 仙逆特色
  MOON_CULTIVATION = 'moon_cultivation',
  KILLING_PATH = 'killing_path',
  ANCIENT_GOD_INHERITANCE = 'ancient_god_inheritance',
  RUNE_RESEARCH = 'rune_research',
  HEAVENLY_TRUTH_SEEKING = 'heavenly_truth_seeking',
  ARRAY_LAYING = 'array_laying',
  SOUL_REFINING = 'soul_refining',
  LIFE_AND_DEATH_PERCEPTION = 'life_and_death_perception',
}

export enum NPCMood {
  HAPPY = 'happy',
  NEUTRAL = 'neutral',
  TIRED = 'tired',
  ANGRY = 'angry',
  SAD = 'sad',
  EXCITED = 'excited',
  BORED = 'bored',
  WORRIED = 'worried',
  PEACEFUL = 'peaceful',
  CURIOUS = 'curious',
  PROUD = 'proud',
  SHY = 'shy',
  GRATEFUL = 'grateful',
  JEALOUS = 'jealous',
  AMUSED = 'amused',
  FRUSTRATED = 'frustrated',
  RELIEVED = 'relieved',
  NOSTALGIC = 'nostalgic',
  DETERMINED = 'determined',
  SERENE = 'serene',
  ANXIOUS = 'anxious',
  HOPEFUL = 'hopeful',
  DISAPPOINTED = 'disappointed',
  SATISFIED = 'satisfied',
  HUNGRY = 'hungry',
  THIRSTY = 'thirsty',
  COLD = 'cold',
  HOT = 'hot',
  ENERGETIC = 'energetic',
  MELANCHOLY = 'melancholy',
  // 修仙类情绪 - 完美世界特色
  DEFIANT = 'defiant',                 // 桀骜
  PRIDEFUL = 'prideful',               // 高傲
  BLOODTHIRSTY = 'bloodthirsty',       // 嗜血
  NOBLE = 'noble',                     // 高贵
  RUTHLESS = 'ruthless',               // 狠辣
  
  // 遮天特色
  TRANSCENDENT = 'transcendent',       // 超脱
  MYSTERIOUS = 'mysterious',           // 神秘
  MAJESTIC = 'majestic',               // 威严
  DIVINE = 'divine',                   // 神圣
  
  // 圣墟特色
  EVOLVING = 'evolving',               // 进化中
  REINCARNATED = 'reincarnated',       // 轮回
  ANCIENT = 'ancient',                 // 古老
  DARKENED = 'darkened',               // 黑暗
  
  // 斗破苍穹特色
  FIERY = 'fiery',                     // 火热
  RESOLUTE = 'resolute',               // 坚毅
  ARROGANT = 'arrogant',               // 狂妄
  DOMINANT = 'dominant',               // 霸道
  
  // 神墓特色
  ETERNAL = 'eternal',                 // 永恒
  TRAGIC = 'tragic',                   // 悲凉
  UNYIELDING = 'unyielding',           // 不屈
  COSMIC = 'cosmic',                   // 浩瀚
  
  // 凡人修仙传特色
  CUNNING = 'cunning',                 // 狡猾
  CALCULATING = 'calculating',         // 算计
  STEALTHY = 'stealthy',               // 隐秘
  PERSEVERING = 'persevering',         // 隐忍
  
  // 仙逆特色
  MOONLIT = 'moonlit',                 // 月光
  DAO_SEEKING = 'dao_seeking',         // 求道
  OVERWHELMING = 'overwhelming',       // 碾压
  SOULFUL = 'soulful',                 // 魂魄
}

export interface INPCScheduleEntry {
  startHour: number;
  endHour: number;
  activity: NPCActivityType;
  location?: string;
  description: string;
  greeting: string;
}

export interface INPCDailyRoutine {
  schedule: INPCScheduleEntry[];
  moodChanges: {
    activity: NPCActivityType;
    mood: NPCMood;
    reason: string;
  }[];
  weeklyPattern?: {
    dayOfWeek: number;
    activity: NPCActivityType;
    description: string;
  }[];
}

export interface INPCLifeState {
  currentActivity: NPCActivityType;
  currentLocation: string;
  mood: NPCMood;
  fatigue: number;
  hunger: number;
  activityProgress: number;
  lastActivityChange: number;
}

export const ACTIVITY_NAMES: Record<NPCActivityType, string> = {
  // 基本生活活动
  [NPCActivityType.SLEEPING]: '睡觉',
  [NPCActivityType.RESTING]: '休息',
  [NPCActivityType.EATING]: '吃饭',
  
  // 修炼相关
  [NPCActivityType.CULTIVATING]: '修炼',
  [NPCActivityType.MEDITATING]: '冥想',
  [NPCActivityType.LEARNING]: '学习',
  [NPCActivityType.HEALING]: '疗伤',
  
  // 战斗相关
  [NPCActivityType.TRAINING]: '训练',
  [NPCActivityType.SPARRING]: '切磋',
  [NPCActivityType.HUNTING]: '狩猎',
  [NPCActivityType.GUARDING]: '守卫',
  [NPCActivityType.PATROLLING]: '巡逻',
  
  // 探索与出行
  [NPCActivityType.TRAVELING]: '出行',
  [NPCActivityType.EXPLORING]: '探索',
  
  // 社交与交易
  [NPCActivityType.SOCIALIZING]: '社交',
  [NPCActivityType.TRADING]: '交易',
  [NPCActivityType.SHOPPING]: '购物',
  
  // 工作与技艺
  [NPCActivityType.WORKING]: '工作',
  [NPCActivityType.CRAFTING]: '制作',
  [NPCActivityType.FARMING]: '耕种',
  [NPCActivityType.MINING]: '采矿',
  [NPCActivityType.GATHERING]: '采集',
  [NPCActivityType.BREWING]: '酿酒',
  
  // 宗门与家族活动
  [NPCActivityType.TEACHING]: '授业',
  [NPCActivityType.PRAYING]: '祭拜',
  [NPCActivityType.CEREMONY]: '典礼',
  
  // 特殊活动
  [NPCActivityType.STEALING]: '潜入',
  [NPCActivityType.SPYING]: '刺探',
  [NPCActivityType.ESCORTING]: '护送',
  
  // 夜间活动
  [NPCActivityType.PATROLLING_NIGHT]: '夜巡',
  [NPCActivityType.NIGHT_WATCH]: '守夜',
  [NPCActivityType.LATE_NIGHT_CULTIVATION]: '夜修',
  [NPCActivityType.MOON_GAZING]: '赏月',
  [NPCActivityType.STAR_GAZING]: '观星',
  
  // 完美世界特色
  [NPCActivityType.SACRIFICING]: '祭祀',
  [NPCActivityType.WORSHIPPING]: '祭拜',
  [NPCActivityType.BONE_RITUAL]: '祭骨仪式',
  [NPCActivityType.ANCESTRAL_WORSHIP]: '祭祖',
  [NPCActivityType.TRIBAL_MEETING]: '族会',
  [NPCActivityType.BATTLE_TRAINING]: '演武',
  [NPCActivityType.BEAST_HUNTING]: '猎杀凶兽',
  [NPCActivityType.HERB_GATHERING]: '采摘灵药',
  [NPCActivityType.ALCHEMY]: '炼丹',
  [NPCActivityType.RUNE_CARVING]: '刻符文',
  [NPCActivityType.REALM_CHALLENGE]: '闯秘境',
  [NPCActivityType.TRIBAL_COMPETITION]: '族比',
  [NPCActivityType.BONE_SCRIPT_PRACTICE]: '骨文修炼',
  
  // 遮天特色
  [NPCActivityType.STAR_GAZING_MEDITATION]: '观星悟道',
  [NPCActivityType.COSMIC_CULTIVATION]: '吞纳星辰',
  [NPCActivityType.ALTAR_SACRIFICE]: '祭坛祭祀',
  [NPCActivityType.ANCIENT_TABLET_STUDY]: '悟道古碑',
  [NPCActivityType.IMMORTAL_ROAD_GUARD]: '守护仙路',
  [NPCActivityType.STAR_WALKING]: '星空漫步',
  [NPCActivityType.SOUL_SEARCHING]: '寻道',
  [NPCActivityType.SOURCE_REFINING]: '炼化本源',
  [NPCActivityType.DANTA_COMPETITION]: '丹塔大会',
  
  // 圣墟特色
  [NPCActivityType.EVOLUTION_PATH]: '进化之路',
  [NPCActivityType.REINCARNATION_BAPTISM]: '轮回洗礼',
  [NPCActivityType.UNDERWORLD_TRIAL]: '阴间历练',
  [NPCActivityType.YANGWORLD_CULTIVATION]: '阳间修行',
  [NPCActivityType.SOUL_LAMP_REFINING]: '魂灯祭炼',
  [NPCActivityType.ANCESTOR_COURT_WORSHIP]: '祖庭朝拜',
  [NPCActivityType.DARKNESS_EXPLORATION]: '黑暗探索',
  [NPCActivityType.BEAST_KINGDOM_CHALLENGE]: '兽王战',
  
  // 斗破苍穹特色
  [NPCActivityType.ALCHEMIST_COMPETITION]: '炼药师大会',
  [NPCActivityType.AUCTION_PARTICIPATION]: '拍卖会',
  [NPCActivityType.BATTLE_QI_TRAINING]: '斗气修炼',
  [NPCActivityType.BATTLE_SKILL_PRACTICE]: '斗技演练',
  [NPCActivityType.FIRE_CONTROL_TRAINING]: '控火修炼',
  [NPCActivityType.MEDICINAL_STUDY]: '药典研读',
  [NPCActivityType.GUILD_MISSION]: '公会任务',
  [NPCActivityType.ARENA_BATTLE]: '竞技场',
  
  // 神墓特色
  [NPCActivityType.YIN_YANG_PRACTICE]: '逆乱阴阳',
  [NPCActivityType.TIME_SPACE_CULTIVATION]: '时空修炼',
  [NPCActivityType.UNDEAD_SUMMONING]: '亡灵召唤',
  [NPCActivityType.DEITY_DEMON_BATTLE]: '神魔大战',
  [NPCActivityType.HEAVENLY_TAO_PERCEPTION]: '天道感悟',
  [NPCActivityType.REINCARNATION_CYCLE]: '轮回转世',
  [NPCActivityType.WORLD_CREATION]: '开天辟地',
  
  // 凡人修仙传特色
  [NPCActivityType.TALISMAN_DRAWING]: '绘制符箓',
  [NPCActivityType.MAGIC_ITEM_REFINING]: '法器祭炼',
  [NPCActivityType.SPIRIT_STONE_MEDITATION]: '灵石修炼',
  [NPCActivityType.MARKET_BROWSING]: '修仙集市',
  [NPCActivityType.BLOODY_TRIAL]: '血色试炼',
  [NPCActivityType.CLAN_MISSION]: '宗门任务',
  [NPCActivityType.SEAL_RESEARCH]: '阵法研究',
  [NPCActivityType.SPIRIT_BEAST_TAMING]: '灵兽驯养',
  
  // 仙逆特色
  [NPCActivityType.MOON_CULTIVATION]: '望月修炼',
  [NPCActivityType.KILLING_PATH]: '杀戮道',
  [NPCActivityType.ANCIENT_GOD_INHERITANCE]: '古神传承',
  [NPCActivityType.RUNE_RESEARCH]: '符文研究',
  [NPCActivityType.HEAVENLY_TRUTH_SEEKING]: '求道',
  [NPCActivityType.ARRAY_LAYING]: '布阵',
  [NPCActivityType.SOUL_REFINING]: '炼魂',
  [NPCActivityType.LIFE_AND_DEATH_PERCEPTION]: '生死感悟',
};

export const MOOD_NAMES: Record<NPCMood, string> = {
  [NPCMood.HAPPY]: '开心',
  [NPCMood.NEUTRAL]: '平静',
  [NPCMood.TIRED]: '疲惫',
  [NPCMood.ANGRY]: '愤怒',
  [NPCMood.SAD]: '悲伤',
  [NPCMood.EXCITED]: '兴奋',
  [NPCMood.BORED]: '无聊',
  [NPCMood.WORRIED]: '担忧',
  [NPCMood.PEACEFUL]: '祥和',
  [NPCMood.CURIOUS]: '好奇',
  [NPCMood.PROUD]: '骄傲',
  [NPCMood.SHY]: '害羞',
  [NPCMood.GRATEFUL]: '感激',
  [NPCMood.JEALOUS]: '嫉妒',
  [NPCMood.AMUSED]: '愉悦',
  [NPCMood.FRUSTRATED]: '沮丧',
  [NPCMood.RELIEVED]: '释然',
  [NPCMood.NOSTALGIC]: '怀旧',
  [NPCMood.DETERMINED]: '坚定',
  [NPCMood.SERENE]: '恬静',
  [NPCMood.ANXIOUS]: '焦虑',
  [NPCMood.HOPEFUL]: '期待',
  [NPCMood.DISAPPOINTED]: '失望',
  [NPCMood.SATISFIED]: '满足',
  [NPCMood.HUNGRY]: '饥饿',
  [NPCMood.THIRSTY]: '口渴',
  [NPCMood.COLD]: '寒冷',
  [NPCMood.HOT]: '燥热',
  [NPCMood.ENERGETIC]: '精力充沛',
  [NPCMood.MELANCHOLY]: '惆怅',
  // 修仙类情绪 - 完美世界特色
  [NPCMood.DEFIANT]: '桀骜',
  [NPCMood.PRIDEFUL]: '高傲',
  [NPCMood.BLOODTHIRSTY]: '嗜血',
  [NPCMood.NOBLE]: '高贵',
  [NPCMood.RUTHLESS]: '狠辣',
  
  // 遮天特色
  [NPCMood.TRANSCENDENT]: '超脱',
  [NPCMood.MYSTERIOUS]: '神秘',
  [NPCMood.MAJESTIC]: '威严',
  [NPCMood.DIVINE]: '神圣',
  
  // 圣墟特色
  [NPCMood.EVOLVING]: '进化中',
  [NPCMood.REINCARNATED]: '轮回',
  [NPCMood.ANCIENT]: '古老',
  [NPCMood.DARKENED]: '黑暗',
  
  // 斗破苍穹特色
  [NPCMood.FIERY]: '火热',
  [NPCMood.RESOLUTE]: '坚毅',
  [NPCMood.ARROGANT]: '狂妄',
  [NPCMood.DOMINANT]: '霸道',
  
  // 神墓特色
  [NPCMood.ETERNAL]: '永恒',
  [NPCMood.TRAGIC]: '悲凉',
  [NPCMood.UNYIELDING]: '不屈',
  [NPCMood.COSMIC]: '浩瀚',
  
  // 凡人修仙传特色
  [NPCMood.CUNNING]: '狡猾',
  [NPCMood.CALCULATING]: '算计',
  [NPCMood.STEALTHY]: '隐秘',
  [NPCMood.PERSEVERING]: '隐忍',
  
  // 仙逆特色
  [NPCMood.MOONLIT]: '月光',
  [NPCMood.DAO_SEEKING]: '求道',
  [NPCMood.OVERWHELMING]: '碾压',
  [NPCMood.SOULFUL]: '魂魄',
};

export const MOOD_COLORS: Record<NPCMood, string> = {
  [NPCMood.HAPPY]: '#00ff00',
  [NPCMood.NEUTRAL]: '#999999',
  [NPCMood.TIRED]: '#cccccc',
  [NPCMood.ANGRY]: '#ff0000',
  [NPCMood.SAD]: '#0000ff',
  [NPCMood.EXCITED]: '#ff8800',
  [NPCMood.BORED]: '#888888',
  [NPCMood.WORRIED]: '#ff00ff',
  [NPCMood.PEACEFUL]: '#88ccff',
  [NPCMood.CURIOUS]: '#ffff00',
  [NPCMood.PROUD]: '#ffcc00',
  [NPCMood.SHY]: '#ff99cc',
  [NPCMood.GRATEFUL]: '#66ffcc',
  [NPCMood.JEALOUS]: '#66ff66',
  [NPCMood.AMUSED]: '#ffcc99',
  [NPCMood.FRUSTRATED]: '#cc6666',
  [NPCMood.RELIEVED]: '#99ffcc',
  [NPCMood.NOSTALGIC]: '#cc99ff',
  [NPCMood.DETERMINED]: '#ff6633',
  [NPCMood.SERENE]: '#aaddff',
  [NPCMood.ANXIOUS]: '#ff6699',
  [NPCMood.HOPEFUL]: '#ccff66',
  [NPCMood.DISAPPOINTED]: '#666699',
  [NPCMood.SATISFIED]: '#ffcc66',
  [NPCMood.HUNGRY]: '#ff9966',
  [NPCMood.THIRSTY]: '#66ccff',
  [NPCMood.COLD]: '#99ccff',
  [NPCMood.HOT]: '#ff6600',
  [NPCMood.ENERGETIC]: '#ffff66',
  [NPCMood.MELANCHOLY]: '#9999cc',
  // 修仙类情绪颜色
  [NPCMood.DEFIANT]: '#ff6600',
  [NPCMood.PRIDEFUL]: '#ffcc00',
  [NPCMood.BLOODTHIRSTY]: '#8b0000',
  [NPCMood.NOBLE]: '#0088cc',
  [NPCMood.RUTHLESS]: '#444444',
  
  [NPCMood.TRANSCENDENT]: '#eeeeee',
  [NPCMood.MYSTERIOUS]: '#4b0082',
  [NPCMood.MAJESTIC]: '#8b4513',
  [NPCMood.DIVINE]: '#ffd700',
  
  [NPCMood.EVOLVING]: '#00ff88',
  [NPCMood.REINCARNATED]: '#8888ff',
  [NPCMood.ANCIENT]: '#6b8e23',
  [NPCMood.DARKENED]: '#1a1a1a',
  
  [NPCMood.FIERY]: '#ff4500',
  [NPCMood.RESOLUTE]: '#4169e1',
  [NPCMood.ARROGANT]: '#daa520',
  [NPCMood.DOMINANT]: '#ff1493',
  
  [NPCMood.ETERNAL]: '#e0e0e0',
  [NPCMood.TRAGIC]: '#8b0000',
  [NPCMood.UNYIELDING]: '#006400',
  [NPCMood.COSMIC]: '#0000cd',
  
  [NPCMood.CUNNING]: '#556b2f',
  [NPCMood.CALCULATING]: '#2f4f4f',
  [NPCMood.STEALTHY]: '#222222',
  [NPCMood.PERSEVERING]: '#696969',
  
  [NPCMood.MOONLIT]: '#f0e68c',
  [NPCMood.DAO_SEEKING]: '#98fb98',
  [NPCMood.OVERWHELMING]: '#dc143c',
  [NPCMood.SOULFUL]: '#dda0dd',
};

export const WEATHER_NAMES: Record<WeatherType, string> = {
  [WeatherType.SUNNY]: '晴朗',
  [WeatherType.CLOUDY]: '多云',
  [WeatherType.RAINY]: '下雨',
  [WeatherType.STORMY]: '暴风雨',
  [WeatherType.SNOWY]: '下雪',
  [WeatherType.FOGGY]: '大雾',
  [WeatherType.WINDY]: '大风',
  [WeatherType.HOT]: '酷热',
  [WeatherType.COLD]: '严寒',
};

export interface IWeatherEffect {
  weather: WeatherType;
  activityModifiers: {
    activity: NPCActivityType;
    modifier: number;  // 正数增加概率，负数减少概率
  }[];
  moodModifiers: {
    mood: NPCMood;
    modifier: number;
  }[];
  description: string;
}

export interface ISeasonEffect {
  season: Season;
  activityModifiers: {
    activity: NPCActivityType;
    modifier: number;
  }[];
  moodModifiers: {
    mood: NPCMood;
    modifier: number;
  }[];
  preferredActivities: NPCActivityType[];
  description: string;
}

export const WEATHER_EFFECTS: Record<WeatherType, IWeatherEffect> = {
  [WeatherType.SUNNY]: {
    weather: WeatherType.SUNNY,
    activityModifiers: [
      { activity: NPCActivityType.FARMING, modifier: 0.2 },
      { activity: NPCActivityType.HUNTING, modifier: 0.2 },
      { activity: NPCActivityType.TRAVELING, modifier: 0.15 },
      { activity: NPCActivityType.EXPLORING, modifier: 0.2 },
      { activity: NPCActivityType.BEAST_HUNTING, modifier: 0.15 },
    ],
    moodModifiers: [
      { mood: NPCMood.HAPPY, modifier: 0.2 },
      { mood: NPCMood.ENERGETIC, modifier: 0.15 },
    ],
    description: '天气晴朗，适合户外活动',
  },
  [WeatherType.CLOUDY]: {
    weather: WeatherType.CLOUDY,
    activityModifiers: [],
    moodModifiers: [
      { mood: NPCMood.NEUTRAL, modifier: 0.1 },
    ],
    description: '多云天气，平平淡淡',
  },
  [WeatherType.RAINY]: {
    weather: WeatherType.RAINY,
    activityModifiers: [
      { activity: NPCActivityType.FARMING, modifier: -0.3 },
      { activity: NPCActivityType.HUNTING, modifier: -0.4 },
      { activity: NPCActivityType.TRAVELING, modifier: -0.3 },
      { activity: NPCActivityType.CRAFTING, modifier: 0.2 },
      { activity: NPCActivityType.LEARNING, modifier: 0.3 },
      { activity: NPCActivityType.TEACHING, modifier: 0.2 },
      { activity: NPCActivityType.BREWING, modifier: 0.15 },
    ],
    moodModifiers: [
      { mood: NPCMood.MELANCHOLY, modifier: 0.2 },
      { mood: NPCMood.TIRED, modifier: 0.1 },
    ],
    description: '下雨天，户外活动减少',
  },
  [WeatherType.STORMY]: {
    weather: WeatherType.STORMY,
    activityModifiers: [
      { activity: NPCActivityType.FARMING, modifier: -0.5 },
      { activity: NPCActivityType.HUNTING, modifier: -0.6 },
      { activity: NPCActivityType.TRAVELING, modifier: -0.6 },
      { activity: NPCActivityType.SLEEPING, modifier: 0.3 },
      { activity: NPCActivityType.CRAFTING, modifier: 0.3 },
      { activity: NPCActivityType.LEARNING, modifier: 0.3 },
    ],
    moodModifiers: [
      { mood: NPCMood.WORRIED, modifier: 0.3 },
      { mood: NPCMood.ANXIOUS, modifier: 0.2 },
    ],
    description: '暴风雨天气，大多躲在屋内',
  },
  [WeatherType.SNOWY]: {
    weather: WeatherType.SNOWY,
    activityModifiers: [
      { activity: NPCActivityType.FARMING, modifier: -0.5 },
      { activity: NPCActivityType.HUNTING, modifier: -0.4 },
      { activity: NPCActivityType.TRAVELING, modifier: -0.4 },
      { activity: NPCActivityType.CRAFTING, modifier: 0.25 },
      { activity: NPCActivityType.LEARNING, modifier: 0.25 },
      { activity: NPCActivityType.MEDITATING, modifier: 0.2 },
      { activity: NPCActivityType.CULTIVATING, modifier: 0.15 },
    ],
    moodModifiers: [
      { mood: NPCMood.COLD, modifier: 0.3 },
      { mood: NPCMood.PEACEFUL, modifier: 0.15 },
    ],
    description: '下雪天，适合室内活动',
  },
  [WeatherType.FOGGY]: {
    weather: WeatherType.FOGGY,
    activityModifiers: [
      { activity: NPCActivityType.TRAVELING, modifier: -0.3 },
      { activity: NPCActivityType.HUNTING, modifier: -0.3 },
      { activity: NPCActivityType.SPYING, modifier: 0.3 },
      { activity: NPCActivityType.STEALING, modifier: 0.2 },
    ],
    moodModifiers: [
      { mood: NPCMood.WORRIED, modifier: 0.15 },
      { mood: NPCMood.CURIOUS, modifier: 0.1 },
    ],
    description: '大雾天气，视线模糊',
  },
  [WeatherType.WINDY]: {
    weather: WeatherType.WINDY,
    activityModifiers: [
      { activity: NPCActivityType.TRAINING, modifier: -0.2 },
      { activity: NPCActivityType.TRAVELING, modifier: -0.15 },
      { activity: NPCActivityType.EXPLORING, modifier: -0.2 },
    ],
    moodModifiers: [
      { mood: NPCMood.ENERGETIC, modifier: 0.1 },
    ],
    description: '大风天气，户外活动受影响',
  },
  [WeatherType.HOT]: {
    weather: WeatherType.HOT,
    activityModifiers: [
      { activity: NPCActivityType.FARMING, modifier: -0.2 },
      { activity: NPCActivityType.HUNTING, modifier: -0.2 },
      { activity: NPCActivityType.SLEEPING, modifier: -0.2 },
      { activity: NPCActivityType.RESTING, modifier: 0.2 },
      { activity: NPCActivityType.MEDITATING, modifier: 0.2 },
    ],
    moodModifiers: [
      { mood: NPCMood.HOT, modifier: 0.3 },
      { mood: NPCMood.TIRED, modifier: 0.2 },
    ],
    description: '酷热天气，容易疲惫',
  },
  [WeatherType.COLD]: {
    weather: WeatherType.COLD,
    activityModifiers: [
      { activity: NPCActivityType.FARMING, modifier: -0.2 },
      { activity: NPCActivityType.TRAVELING, modifier: -0.15 },
      { activity: NPCActivityType.CULTIVATING, modifier: 0.2 },
      { activity: NPCActivityType.MEDITATING, modifier: 0.2 },
      { activity: NPCActivityType.BREWING, modifier: 0.15 },
    ],
    moodModifiers: [
      { mood: NPCMood.COLD, modifier: 0.3 },
      { mood: NPCMood.DETERMINED, modifier: 0.1 },
    ],
    description: '严寒天气，适合室内修炼',
  },
};

export const SEASON_EFFECTS: Record<string, ISeasonEffect> = {
  '春': {
    season: Season.SPRING,
    activityModifiers: [
      { activity: NPCActivityType.HERB_GATHERING, modifier: 0.3 },
      { activity: NPCActivityType.FARMING, modifier: 0.2 },
      { activity: NPCActivityType.HEALING, modifier: 0.15 },
      { activity: NPCActivityType.TRAVELING, modifier: 0.2 },
    ],
    moodModifiers: [
      { mood: NPCMood.HAPPY, modifier: 0.2 },
      { mood: NPCMood.HOPEFUL, modifier: 0.2 },
      { mood: NPCMood.ENERGETIC, modifier: 0.15 },
    ],
    preferredActivities: [NPCActivityType.HERB_GATHERING, NPCActivityType.FARMING, NPCActivityType.TRAVELING],
    description: '春暖花开，万物复苏',
  },
  '夏': {
    season: Season.SUMMER,
    activityModifiers: [
      { activity: NPCActivityType.HUNTING, modifier: 0.15 },
      { activity: NPCActivityType.CULTIVATING, modifier: 0.1 },
      { activity: NPCActivityType.EXPLORING, modifier: 0.2 },
    ],
    moodModifiers: [
      { mood: NPCMood.ENERGETIC, modifier: 0.2 },
      { mood: NPCMood.HOT, modifier: 0.15 },
    ],
    preferredActivities: [NPCActivityType.HUNTING, NPCActivityType.EXPLORING],
    description: '夏日炎炎，适合避暑',
  },
  '秋': {
    season: Season.AUTUMN,
    activityModifiers: [
      { activity: NPCActivityType.GATHERING, modifier: 0.3 },
      { activity: NPCActivityType.HUNTING, modifier: 0.2 },
      { activity: NPCActivityType.BREWING, modifier: 0.2 },
      { activity: NPCActivityType.CRAFTING, modifier: 0.15 },
    ],
    moodModifiers: [
      { mood: NPCMood.SATISFIED, modifier: 0.2 },
      { mood: NPCMood.NOSTALGIC, modifier: 0.15 },
    ],
    preferredActivities: [NPCActivityType.FARMING, NPCActivityType.HUNTING, NPCActivityType.BREWING],
    description: '秋高气爽，丰收季节',
  },
  '冬': {
    season: Season.WINTER,
    activityModifiers: [
      { activity: NPCActivityType.CULTIVATING, modifier: 0.25 },
      { activity: NPCActivityType.MEDITATING, modifier: 0.25 },
      { activity: NPCActivityType.LEARNING, modifier: 0.2 },
      { activity: NPCActivityType.CRAFTING, modifier: 0.15 },
      { activity: NPCActivityType.HUNTING, modifier: -0.2 },
      { activity: NPCActivityType.FARMING, modifier: -0.3 },
    ],
    moodModifiers: [
      { mood: NPCMood.PEACEFUL, modifier: 0.2 },
      { mood: NPCMood.COLD, modifier: 0.15 },
    ],
    preferredActivities: [NPCActivityType.CULTIVATING, NPCActivityType.MEDITATING, NPCActivityType.LEARNING],
    description: '冬日寒冷，适合室内修炼',
  },
};

export const PERSONALITY_NAMES: Record<NPCPersonalityTrait, string> = {
  [NPCPersonalityTrait.DILIGENT]: '勤劳',
  [NPCPersonalityTrait.LAZY]: '懒惰',
  [NPCPersonalityTrait.OPTIMISTIC]: '乐观',
  [NPCPersonalityTrait.PESSIMISTIC]: '悲观',
  [NPCPersonalityTrait.SOCIAL]: '喜社交',
  [NPCPersonalityTrait.SOLITARY]: '孤僻',
  [NPCPersonalityTrait.DISCIPLINED]: '自律',
  [NPCPersonalityTrait.CAREFREE]: '随性',
  [NPCPersonalityTrait.AMBITIOUS]: '有野心',
  [NPCPersonalityTrait.HUMBLE]: '谦逊',
  [NPCPersonalityTrait.BRAVE]: '勇敢',
  [NPCPersonalityTrait.CAUTIOUS]: '谨慎',
  [NPCPersonalityTrait.CREATIVE]: '有创意',
  [NPCPersonalityTrait.TRADITIONAL]: '传统',
  [NPCPersonalityTrait.PATIENT]: '耐心',
  [NPCPersonalityTrait.IMPATIENT]: '急躁',
  [NPCPersonalityTrait.GENEROUS]: '慷慨',
  [NPCPersonalityTrait.GREEDY]: '贪婪',
  [NPCPersonalityTrait.HONEST]: '诚实',
  [NPCPersonalityTrait.CUNNING]: '狡猾',
};

export interface IPersonalityEffect {
  trait: NPCPersonalityTrait;
  activityPreferences: {
    activity: NPCActivityType;
    probability: number;  // 0-1，偏好程度
  }[];
  moodTendencies: {
    mood: NPCMood;
    probability: number;
  }[];
  wakeUpTimeModifier: number;  // 起床时间偏移（小时）
  sleepTimeModifier: number;   // 睡觉时间偏移（小时）
  workDurationModifier: number; // 工作时长偏移
  restDurationModifier: number; // 休息时长偏移
  socialFrequency: number;      // 社交频率
  greetingVariations: string[];
}

export const PERSONALITY_EFFECTS: Record<NPCPersonalityTrait, IPersonalityEffect> = {
  [NPCPersonalityTrait.DILIGENT]: {
    trait: NPCPersonalityTrait.DILIGENT,
    activityPreferences: [
      { activity: NPCActivityType.WORKING, probability: 0.3 },
      { activity: NPCActivityType.CULTIVATING, probability: 0.25 },
    ],
    moodTendencies: [
      { mood: NPCMood.SATISFIED, probability: 0.2 },
    ],
    wakeUpTimeModifier: -1,
    sleepTimeModifier: 1,
    workDurationModifier: 0.2,
    restDurationModifier: -0.1,
    socialFrequency: 0.3,
    greetingVariations: ['今天也要努力工作！', '早起的鸟儿有虫吃。', '勤奋是最好的修行。'],
  },
  [NPCPersonalityTrait.LAZY]: {
    trait: NPCPersonalityTrait.LAZY,
    activityPreferences: [
      { activity: NPCActivityType.SLEEPING, probability: 0.25 },
      { activity: NPCActivityType.RESTING, probability: 0.2 },
    ],
    moodTendencies: [
      { mood: NPCMood.BORED, probability: 0.2 },
    ],
    wakeUpTimeModifier: 2,
    sleepTimeModifier: -1,
    workDurationModifier: -0.2,
    restDurationModifier: 0.3,
    socialFrequency: 0.2,
    greetingVariations: ['再睡会儿...', '这么早干嘛...', '能躺着绝不动。'],
  },
  [NPCPersonalityTrait.OPTIMISTIC]: {
    trait: NPCPersonalityTrait.OPTIMISTIC,
    activityPreferences: [
      { activity: NPCActivityType.SOCIALIZING, probability: 0.2 },
      { activity: NPCActivityType.TRAVELING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.HAPPY, probability: 0.3 },
      { mood: NPCMood.HOPEFUL, probability: 0.2 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: 0,
    restDurationModifier: 0,
    socialFrequency: 0.6,
    greetingVariations: ['今天又是美好的一天！', '开心点，生活多美好！', '笑一笑，什么都好了。'],
  },
  [NPCPersonalityTrait.PESSIMISTIC]: {
    trait: NPCPersonalityTrait.PESSIMISTIC,
    activityPreferences: [
      { activity: NPCActivityType.MEDITATING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.WORRIED, probability: 0.2 },
      { mood: NPCMood.MELANCHOLY, probability: 0.15 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: -0.1,
    restDurationModifier: 0.1,
    socialFrequency: 0.2,
    greetingVariations: ['唉...', '没什么好说的。', '人生啊...'],
  },
  [NPCPersonalityTrait.SOCIAL]: {
    trait: NPCPersonalityTrait.SOCIAL,
    activityPreferences: [
      { activity: NPCActivityType.SOCIALIZING, probability: 0.35 },
      { activity: NPCActivityType.BREWING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.HAPPY, probability: 0.25 },
      { mood: NPCMood.EXCITED, probability: 0.2 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: -1,
    workDurationModifier: -0.1,
    restDurationModifier: 0,
    socialFrequency: 0.8,
    greetingVariations: ['来聊聊！', '一个人太无聊了。', '朋友，近来可好？'],
  },
  [NPCPersonalityTrait.SOLITARY]: {
    trait: NPCPersonalityTrait.SOLITARY,
    activityPreferences: [
      { activity: NPCActivityType.LEARNING, probability: 0.2 },
      { activity: NPCActivityType.MEDITATING, probability: 0.2 },
      { activity: NPCActivityType.CULTIVATING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.PEACEFUL, probability: 0.2 },
      { mood: NPCMood.NEUTRAL, probability: 0.15 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: 0.1,
    restDurationModifier: 0.1,
    socialFrequency: 0.1,
    greetingVariations: ['请勿打扰。', '我更喜欢安静。', '一个人挺好的。'],
  },
  [NPCPersonalityTrait.DISCIPLINED]: {
    trait: NPCPersonalityTrait.DISCIPLINED,
    activityPreferences: [
      { activity: NPCActivityType.CULTIVATING, probability: 0.25 },
      { activity: NPCActivityType.TRAINING, probability: 0.2 },
    ],
    moodTendencies: [
      { mood: NPCMood.DETERMINED, probability: 0.2 },
    ],
    wakeUpTimeModifier: -2,
    sleepTimeModifier: 0,
    workDurationModifier: 0.15,
    restDurationModifier: -0.05,
    socialFrequency: 0.3,
    greetingVariations: ['自律使人进步。', '坚持就是胜利。', '每天都要进步。'],
  },
  [NPCPersonalityTrait.CAREFREE]: {
    trait: NPCPersonalityTrait.CAREFREE,
    activityPreferences: [
      { activity: NPCActivityType.TRAVELING, probability: 0.2 },
      { activity: NPCActivityType.EXPLORING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.HAPPY, probability: 0.2 },
      { mood: NPCMood.AMUSED, probability: 0.15 },
    ],
    wakeUpTimeModifier: 1,
    sleepTimeModifier: -1,
    workDurationModifier: -0.15,
    restDurationModifier: 0.15,
    socialFrequency: 0.5,
    greetingVariations: ['随遇而安~', '开心就好。', '想干啥就干啥。'],
  },
  [NPCPersonalityTrait.AMBITIOUS]: {
    trait: NPCPersonalityTrait.AMBITIOUS,
    activityPreferences: [
      { activity: NPCActivityType.CULTIVATING, probability: 0.3 },
      { activity: NPCActivityType.LEARNING, probability: 0.2 },
    ],
    moodTendencies: [
      { mood: NPCMood.DETERMINED, probability: 0.25 },
      { mood: NPCMood.ENERGETIC, probability: 0.15 },
    ],
    wakeUpTimeModifier: -1,
    sleepTimeModifier: 1,
    workDurationModifier: 0.2,
    restDurationModifier: -0.15,
    socialFrequency: 0.4,
    greetingVariations: ['我要成为最强者！', '不断突破自己！', '天下风云出我辈！'],
  },
  [NPCPersonalityTrait.HUMBLE]: {
    trait: NPCPersonalityTrait.HUMBLE,
    activityPreferences: [
      { activity: NPCActivityType.LEARNING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.PEACEFUL, probability: 0.2 },
      { mood: NPCMood.GRATEFUL, probability: 0.15 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: 0.1,
    restDurationModifier: 0,
    socialFrequency: 0.4,
    greetingVariations: ['还请多多指教。', '我还有很多要学的。', '虚心求教。'],
  },
  [NPCPersonalityTrait.BRAVE]: {
    trait: NPCPersonalityTrait.BRAVE,
    activityPreferences: [
      { activity: NPCActivityType.HUNTING, probability: 0.25 },
      { activity: NPCActivityType.SPARRING, probability: 0.2 },
    ],
    moodTendencies: [
      { mood: NPCMood.EXCITED, probability: 0.2 },
      { mood: NPCMood.DETERMINED, probability: 0.15 },
    ],
    wakeUpTimeModifier: -1,
    sleepTimeModifier: 0,
    workDurationModifier: 0.1,
    restDurationModifier: 0,
    socialFrequency: 0.5,
    greetingVariations: ['敢冒险才有收获！', '勇者无惧！', '挑战才是乐趣。'],
  },
  [NPCPersonalityTrait.CAUTIOUS]: {
    trait: NPCPersonalityTrait.CAUTIOUS,
    activityPreferences: [
      { activity: NPCActivityType.GUARDING, probability: 0.2 },
      { activity: NPCActivityType.PATROLLING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.WORRIED, probability: 0.15 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: 0.05,
    restDurationModifier: 0,
    socialFrequency: 0.3,
    greetingVariations: ['小心驶得万年船。', '万事小心为上。', '多看多想。'],
  },
  [NPCPersonalityTrait.CREATIVE]: {
    trait: NPCPersonalityTrait.CREATIVE,
    activityPreferences: [
      { activity: NPCActivityType.CRAFTING, probability: 0.25 },
      { activity: NPCActivityType.ALCHEMY, probability: 0.2 },
      { activity: NPCActivityType.RUNE_CARVING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.CURIOUS, probability: 0.2 },
      { mood: NPCMood.EXCITED, probability: 0.15 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: -1,
    workDurationModifier: 0.1,
    restDurationModifier: 0,
    socialFrequency: 0.4,
    greetingVariations: ['灵感来了！', '今天要创作点新东西。', '艺术无止境。'],
  },
  [NPCPersonalityTrait.TRADITIONAL]: {
    trait: NPCPersonalityTrait.TRADITIONAL,
    activityPreferences: [
      { activity: NPCActivityType.PRAYING, probability: 0.2 },
      { activity: NPCActivityType.TEACHING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.PEACEFUL, probability: 0.2 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: 0,
    restDurationModifier: 0,
    socialFrequency: 0.35,
    greetingVariations: ['遵循传统。', '祖宗规矩不可废。', '老祖宗的智慧。'],
  },
  [NPCPersonalityTrait.PATIENT]: {
    trait: NPCPersonalityTrait.PATIENT,
    activityPreferences: [
      { activity: NPCActivityType.CRAFTING, probability: 0.2 },
      { activity: NPCActivityType.LEARNING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.PEACEFUL, probability: 0.25 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: 0.15,
    restDurationModifier: 0,
    socialFrequency: 0.3,
    greetingVariations: ['慢工出细活。', '好事多磨。', '慢慢来，不急。'],
  },
  [NPCPersonalityTrait.IMPATIENT]: {
    trait: NPCPersonalityTrait.IMPATIENT,
    activityPreferences: [],
    moodTendencies: [
      { mood: NPCMood.FRUSTRATED, probability: 0.2 },
      { mood: NPCMood.ANGRY, probability: 0.1 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: -0.15,
    restDurationModifier: 0.1,
    socialFrequency: 0.3,
    greetingVariations: ['快点的！', '磨磨蹭蹭的...', '别浪费时间！'],
  },
  [NPCPersonalityTrait.GENEROUS]: {
    trait: NPCPersonalityTrait.GENEROUS,
    activityPreferences: [
      { activity: NPCActivityType.TRADING, probability: 0.1 },
    ],
    moodTendencies: [
      { mood: NPCMood.HAPPY, probability: 0.2 },
      { mood: NPCMood.GRATEFUL, probability: 0.15 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: 0,
    restDurationModifier: 0,
    socialFrequency: 0.5,
    greetingVariations: ['有福同享！', '拿去用吧。', '这点小事不用谢。'],
  },
  [NPCPersonalityTrait.GREEDY]: {
    trait: NPCPersonalityTrait.GREEDY,
    activityPreferences: [
      { activity: NPCActivityType.TRADING, probability: 0.25 },
      { activity: NPCActivityType.MINING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.JEALOUS, probability: 0.15 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: 0.1,
    restDurationModifier: 0,
    socialFrequency: 0.3,
    greetingVariations: ['这东西值多少钱？', '能不能便宜点？', '多多益善。'],
  },
  [NPCPersonalityTrait.HONEST]: {
    trait: NPCPersonalityTrait.HONEST,
    activityPreferences: [],
    moodTendencies: [
      { mood: NPCMood.PEACEFUL, probability: 0.15 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: 0.05,
    restDurationModifier: 0,
    socialFrequency: 0.4,
    greetingVariations: ['实话实说。', '骗人不对。', '做人要诚实。'],
  },
  [NPCPersonalityTrait.CUNNING]: {
    trait: NPCPersonalityTrait.CUNNING,
    activityPreferences: [
      { activity: NPCActivityType.SPYING, probability: 0.2 },
      { activity: NPCActivityType.STEALING, probability: 0.15 },
    ],
    moodTendencies: [
      { mood: NPCMood.CURIOUS, probability: 0.15 },
    ],
    wakeUpTimeModifier: 0,
    sleepTimeModifier: 0,
    workDurationModifier: 0,
    restDurationModifier: 0,
    socialFrequency: 0.3,
    greetingVariations: ['嘿嘿...', '这事不简单。', '走着瞧。'],
  },
};

export interface INPCRandomEvent {
  eventType: string;
  probability: number;
  activityOverride?: NPCActivityType;
  moodOverride?: NPCMood;
  duration: number;  // 持续时间（小时）
  description: string;
  greeting: string;
}

export const RANDOM_EVENTS: INPCRandomEvent[] = [
  {
    eventType: 'illness',
    probability: 0.02,
    activityOverride: NPCActivityType.HEALING,
    moodOverride: NPCMood.TIRED,
    duration: 6,
    description: '身体不适，需要休息',
    greeting: '今日身体不适，恕不奉陪。',
  },
  {
    eventType: 'inspiration',
    probability: 0.03,
    activityOverride: NPCActivityType.CULTIVATING,
    moodOverride: NPCMood.EXCITED,
    duration: 4,
    description: '灵光乍现，要闭关参悟',
    greeting: '突然有了顿悟，要闭关！',
  },
  {
    eventType: 'visitor',
    probability: 0.05,
    activityOverride: NPCActivityType.SOCIALIZING,
    moodOverride: NPCMood.HAPPY,
    duration: 3,
    description: '有故人来访',
    greeting: '有老友来访，来，一起喝杯茶。',
  },
  {
    eventType: 'nightmare',
    probability: 0.02,
    moodOverride: NPCMood.WORRIED,
    duration: 2,
    description: '昨夜做了噩梦，心神不宁',
    greeting: '昨夜噩梦连连，心情不好。',
  },
  {
    eventType: 'good_mood',
    probability: 0.05,
    moodOverride: NPCMood.HAPPY,
    duration: 4,
    description: '心情格外好',
    greeting: '今天心情格外好！',
  },
  {
    eventType: 'hangover',
    probability: 0.02,
    activityOverride: NPCActivityType.RESTING,
    moodOverride: NPCMood.TIRED,
    duration: 3,
    description: '宿醉未醒',
    greeting: '昨晚喝多了...头疼。',
  },
  {
    eventType: 'lost_item',
    probability: 0.02,
    moodOverride: NPCMood.SAD,
    duration: 2,
    description: '丢了重要东西',
    greeting: '丢了一件重要的东西，烦心。',
  },
  {
    eventType: 'epiphany',
    probability: 0.01,
    activityOverride: NPCActivityType.MEDITATING,
    moodOverride: NPCMood.EXCITED,
    duration: 8,
    description: '进入顿悟状态',
    greeting: '道心清明，正在参悟！',
  },
];
