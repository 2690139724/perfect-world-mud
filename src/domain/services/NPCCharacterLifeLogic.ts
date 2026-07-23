import {
  NPCActivityType,
  NPCMood,
  INPCDailyRoutine,
} from '../entities/NPCLifeLogic';

const CHARACTER_LIFE_LOGIC: Record<string, INPCDailyRoutine> = {
  fire_emperor: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.MEDITATING, description: '清晨修炼炎帝诀', greeting: '炎帝正在修炼炎帝诀，周身笼罩着一层淡淡的火焰。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '炎帝正在用膳，御膳房准备了丰盛的早餐。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '处理国政', greeting: '炎帝正在处理国政，文武百官分列两侧。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接见大臣', greeting: '炎帝正在接见大臣议事。' },
      { startHour: 12, endHour: 14, activity: NPCActivityType.EATING, description: '用午膳', greeting: '炎帝正在用午膳，御膳房的手艺名不虚传。' },
      { startHour: 14, endHour: 15, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '炎帝正在小憩，请勿打扰。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.CULTIVATING, description: '修炼火道法则', greeting: '炎帝正在参悟火道法则，大殿中温度骤升。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.WORKING, description: '批阅奏章', greeting: '炎帝正在批阅奏章，神色凝重。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '炎帝正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间修炼', greeting: '炎帝正在夜间修炼，火焰在他周身流转。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，炎帝已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼炎帝诀，感悟火道' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理国政，神情肃穆' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '接见心腹大臣' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '静心修炼' },
    ],
    weeklyPattern: [
      { dayOfWeek: 1, activity: NPCActivityType.WORKING, description: '初一朝会' },
      { dayOfWeek: 5, activity: NPCActivityType.CULTIVATING, description: '初五闭关修炼' },
      { dayOfWeek: 7, activity: NPCActivityType.SOCIALIZING, description: '初七接见外宾' },
    ],
  },

  fire_princess: {
    schedule: [
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '赖床不起', greeting: '焰灵还在床上赖着，嘟囔着不想起床。' },
      { startHour: 8, endHour: 9, activity: NPCActivityType.EATING, description: '用早膳', greeting: '焰灵正在用早膳，一边吃一边抱怨规矩太多。' },
      { startHour: 9, endHour: 11, activity: NPCActivityType.CULTIVATING, description: '修炼炎帝诀', greeting: '焰灵正在修炼炎帝诀，虽然有些不耐烦，但天赋极高。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '和宫女聊天', greeting: '焰灵正在和宫女们聊天，笑声清脆。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '焰灵正在用午膳，挑挑拣拣。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '午睡', greeting: '焰灵正在午睡，睡得很香。' },
      { startHour: 14, endHour: 17, activity: NPCActivityType.TRAVELING, description: '在城中闲逛', greeting: '焰灵正在城中闲逛，好奇地打量着四周。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.SOCIALIZING, description: '与人切磋', greeting: '焰灵正在与人切磋，战意高昂。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '焰灵正在用晚膳，胃口很好。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.SOCIALIZING, description: '夜间玩耍', greeting: '焰灵正在玩耍，精力旺盛。' },
      { startHour: 22, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，焰灵终于睡着了。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼有进展' },
      { activity: NPCActivityType.TRAVELING, mood: NPCMood.HAPPY, reason: '逛街开心' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与人玩乐' },
      { activity: NPCActivityType.RESTING, mood: NPCMood.BORED, reason: '午睡无聊' },
    ],
    weeklyPattern: [
      { dayOfWeek: 3, activity: NPCActivityType.TRAVELING, description: '初三去演武场' },
      { dayOfWeek: 6, activity: NPCActivityType.SHOPPING, description: '初六去集市' },
    ],
  },

  dan_lao: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CRAFTING, description: '准备药材', greeting: '丹老正在准备药材，神情专注。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '丹老正在用早膳，吃得很简单。' },
      { startHour: 8, endHour: 12, activity: NPCActivityType.CRAFTING, description: '上午炼丹', greeting: '丹老正在炼丹，丹炉中火焰熊熊。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '丹老正在用午膳，一边吃一边思考丹方。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '丹老正在小憩，恢复精神。' },
      { startHour: 14, endHour: 18, activity: NPCActivityType.CRAFTING, description: '下午炼丹', greeting: '丹老正在炼丹，全神贯注。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '丹老正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.LEARNING, description: '研究丹方', greeting: '丹老正在研究丹方，眉头紧锁。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '丹老已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CRAFTING, mood: NPCMood.EXCITED, reason: '炼丹成功' },
      { activity: NPCActivityType.LEARNING, mood: NPCMood.NEUTRAL, reason: '研究丹方' },
      { activity: NPCActivityType.RESTING, mood: NPCMood.TIRED, reason: '炼丹疲惫' },
    ],
    weeklyPattern: [
      { dayOfWeek: 2, activity: NPCActivityType.SHOPPING, description: '初二采购药材' },
      { dayOfWeek: 4, activity: NPCActivityType.CRAFTING, description: '初四炼制高阶丹药' },
    ],
  },

  night_watcher: {
    schedule: [
      { startHour: 20, endHour: 22, activity: NPCActivityType.GUARDING, description: '巡视祭坛', greeting: '守夜人正在巡视祭坛，神情肃穆。' },
      { startHour: 22, endHour: 24, activity: NPCActivityType.MEDITATING, description: '夜间冥想', greeting: '守夜人正在冥想，与祭坛沟通。' },
      { startHour: 0, endHour: 5, activity: NPCActivityType.GUARDING, description: '深夜值守', greeting: '守夜人正在深夜值守，警惕地观察四周。' },
      { startHour: 5, endHour: 6, activity: NPCActivityType.MEDITATING, description: '黎明冥想', greeting: '守夜人正在黎明时分冥想，感悟天地。' },
      { startHour: 6, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '守夜人正在用早膳，吃得很清淡。' },
      { startHour: 8, endHour: 14, activity: NPCActivityType.SLEEPING, description: '白天休息', greeting: '守夜人正在白天休息，请勿打扰。' },
      { startHour: 14, endHour: 16, activity: NPCActivityType.MEDITATING, description: '午后冥想', greeting: '守夜人正在午后冥想。' },
      { startHour: 16, endHour: 18, activity: NPCActivityType.WORKING, description: '研究祭坛铭文', greeting: '守夜人正在研究祭坛铭文，神情专注。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '守夜人正在用晚膳。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.RESTING, description: '准备夜间值守', greeting: '守夜人正在准备夜间值守。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.GUARDING, mood: NPCMood.WORRIED, reason: '守护封印' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '与祭坛沟通' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '研究铭文' },
      { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '整夜值守' },
    ],
    weeklyPattern: [
      { dayOfWeek: 1, activity: NPCActivityType.WORKING, description: '初一祭祀' },
      { dayOfWeek: 15, activity: NPCActivityType.WORKING, description: '十五祭月' },
    ],
  },

  liu_old: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.MEDITATING, description: '清晨打坐', greeting: '柳老正在清晨打坐，精神矍铄。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '柳老正在用早膳，喝着稀粥。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.SLEEPING, description: '打盹', greeting: '柳老正在打盹，看似睡着了。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与人闲聊', greeting: '柳老正在与人闲聊，讲着往事。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '柳老正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.SLEEPING, description: '午睡', greeting: '柳老正在午睡，鼾声阵阵。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.SOCIALIZING, description: '与人下棋', greeting: '柳老正在与人下棋，棋艺高超。' },
      { startHour: 17, endHour: 18, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '柳老正在用晚膳。' },
      { startHour: 18, endHour: 20, activity: NPCActivityType.SOCIALIZING, description: '晚间闲聊', greeting: '柳老正在晚间闲聊。' },
      { startHour: 20, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '柳老已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与人闲聊' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '打坐静心' },
      { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '年纪大了' },
    ],
  },

  fire_princess_alt: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '焰灵正在清晨修炼，火焰环绕周身。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '焰灵正在用早膳。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.WORKING, description: '学习礼仪', greeting: '焰灵正在学习礼仪，有些不耐烦。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼武技', greeting: '焰灵正在修炼武技，英姿飒爽。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '焰灵正在用午膳。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '焰灵正在小憩。' },
      { startHour: 14, endHour: 16, activity: NPCActivityType.SOCIALIZING, description: '与好友玩耍', greeting: '焰灵正在与好友玩耍。' },
      { startHour: 16, endHour: 18, activity: NPCActivityType.TRAVELING, description: '在城中游玩', greeting: '焰灵正在城中游玩。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '焰灵正在用晚膳。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.MEDITATING, description: '晚间冥想', greeting: '焰灵正在晚间冥想。' },
      { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '焰灵已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼有成' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.BORED, reason: '学习礼仪枯燥' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与好友玩耍' },
      { activity: NPCActivityType.TRAVELING, mood: NPCMood.HAPPY, reason: '游玩开心' },
    ],
  },

  guard_general: {
    schedule: [
      { startHour: 5, endHour: 6, activity: NPCActivityType.EATING, description: '用早膳', greeting: '烈山将军正在用早膳。' },
      { startHour: 6, endHour: 8, activity: NPCActivityType.WORKING, description: '操练士兵', greeting: '烈山将军正在操练士兵，声如洪钟。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.PATROLLING, description: '巡视城防', greeting: '烈山将军正在巡视城防，威风凛凛。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.WORKING, description: '处理军务', greeting: '烈山将军正在处理军务。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '烈山将军正在用午膳。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '烈山将军正在小憩。' },
      { startHour: 14, endHour: 16, activity: NPCActivityType.CULTIVATING, description: '修炼战技', greeting: '烈山将军正在修炼战技，气势惊人。' },
      { startHour: 16, endHour: 18, activity: NPCActivityType.PATROLLING, description: '巡视城防', greeting: '烈山将军正在巡视城防。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '烈山将军正在用晚膳。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '夜间值守', greeting: '烈山将军正在夜间值守。' },
      { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '烈山将军已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '操练士兵' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼战技' },
      { activity: NPCActivityType.PATROLLING, mood: NPCMood.WORRIED, reason: '警惕外敌' },
    ],
  },

  auctioneer: {
    schedule: [
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '金算子正在用早膳。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.WORKING, description: '准备拍卖', greeting: '金算子正在准备拍卖会，忙得不亦乐乎。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接待贵宾', greeting: '金算子正在接待贵宾，笑容满面。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '金算子正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '小憩', greeting: '金算子正在小憩。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.WORKING, description: '核对拍品', greeting: '金算子正在核对拍品。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.TRADING, description: '主持拍卖会', greeting: '金算子正在主持拍卖会，声情并茂。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '金算子正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.WORKING, description: '盘点账目', greeting: '金算子正在盘点账目。' },
      { startHour: 22, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '金算子已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.TRADING, mood: NPCMood.HAPPY, reason: '拍卖会火爆' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理事务' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '接待贵宾' },
    ],
    weeklyPattern: [
      { dayOfWeek: 1, activity: NPCActivityType.TRADING, description: '初一拍卖会' },
      { dayOfWeek: 15, activity: NPCActivityType.TRADING, description: '十五拍卖会' },
    ],
  },

  pharmacy_apprentice: {
    schedule: [
      { startHour: 5, endHour: 6, activity: NPCActivityType.WORKING, description: '打扫丹房', greeting: '小药童正在打扫丹房。' },
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '小药童正在用早膳。' },
      { startHour: 7, endHour: 12, activity: NPCActivityType.CRAFTING, description: '研磨药材', greeting: '小药童正在研磨药材，一丝不苟。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '小药童正在用午膳。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '小药童正在小憩。' },
      { startHour: 14, endHour: 18, activity: NPCActivityType.CRAFTING, description: '继续研磨药材', greeting: '小药童正在继续研磨药材。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '小药童正在用晚膳。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.LEARNING, description: '学习药性', greeting: '小药童正在学习药性。' },
      { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '小药童已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '学习新知识' },
      { activity: NPCActivityType.CRAFTING, mood: NPCMood.NEUTRAL, reason: '研磨药材' },
      { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '忙碌一天' },
    ],
  },

  zhou_fuzi: {
    schedule: [
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '周夫子正在用早膳。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.LEARNING, description: '备课', greeting: '周夫子正在备课。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '授课', greeting: '周夫子正在授课，声如洪钟。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与学生交流', greeting: '周夫子正在与学生交流。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '周夫子正在用午膳。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '周夫子正在小憩。' },
      { startHour: 14, endHour: 17, activity: NPCActivityType.WORKING, description: '授课', greeting: '周夫子正在授课。' },
      { startHour: 17, endHour: 18, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '周夫子正在用晚膳。' },
      { startHour: 18, endHour: 21, activity: NPCActivityType.LEARNING, description: '研究学问', greeting: '周夫子正在研究学问。' },
      { startHour: 21, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '周夫子已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '授课' },
      { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '研究学问有心得' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与学生交流' },
    ],
  },

  blind_fortuneteller: {
    schedule: [
      { startHour: 8, endHour: 12, activity: NPCActivityType.WORKING, description: '摆摊卜卦', greeting: '盲眼先生正在摆摊卜卦。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '盲眼先生正在用午膳。' },
      { startHour: 13, endHour: 18, activity: NPCActivityType.WORKING, description: '继续卜卦', greeting: '盲眼先生正在继续卜卦。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '盲眼先生正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间冥想', greeting: '盲眼先生正在夜间冥想。' },
      { startHour: 22, endHour: 8, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '盲眼先生已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '卜卦' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '感悟天道' },
    ],
  },

  baiyi_shusheng: {
    schedule: [
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '白秋然正在用早膳。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.LEARNING, description: '研读古籍', greeting: '白秋然正在研读古籍，神情专注。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与人交流', greeting: '白秋然正在与人交流，谈吐不凡。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '白秋然正在用午膳。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '白秋然正在小憩。' },
      { startHour: 14, endHour: 16, activity: NPCActivityType.TRAVELING, description: '四处游历', greeting: '白秋然正在四处游历。' },
      { startHour: 16, endHour: 18, activity: NPCActivityType.LEARNING, description: '研究风土人情', greeting: '白秋然正在研究风土人情。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '白秋然正在用晚膳。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.SOCIALIZING, description: '晚间交流', greeting: '白秋然正在晚间交流。' },
      { startHour: 21, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '白秋然已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '研读古籍有心得' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与人交流' },
      { activity: NPCActivityType.TRAVELING, mood: NPCMood.EXCITED, reason: '游历见闻' },
    ],
  },

  jiu_lao: {
    schedule: [
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '酒老正在用早膳，喝着小酒。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.SOCIALIZING, description: '与人喝酒聊天', greeting: '酒老正在与人喝酒聊天。' },
      { startHour: 11, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '酒老正在用午膳，喝得醉醺醺的。' },
      { startHour: 13, endHour: 16, activity: NPCActivityType.SLEEPING, description: '醉酒沉睡', greeting: '酒老正在醉酒沉睡。' },
      { startHour: 16, endHour: 19, activity: NPCActivityType.SOCIALIZING, description: '继续喝酒', greeting: '酒老正在继续喝酒。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '酒老正在用晚膳，离不开酒。' },
      { startHour: 21, endHour: 23, activity: NPCActivityType.SOCIALIZING, description: '夜间饮酒', greeting: '酒老正在夜间饮酒。' },
      { startHour: 23, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '酒老已醉倒睡去。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '喝酒开心' },
      { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '醉酒沉睡' },
    ],
  },

  old_soldier: {
    schedule: [
      { startHour: 5, endHour: 6, activity: NPCActivityType.MEDITATING, description: '清晨冥想', greeting: '老兵正在清晨冥想。' },
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '老兵正在用早膳。' },
      { startHour: 7, endHour: 10, activity: NPCActivityType.GUARDING, description: '守护战场', greeting: '老兵正在守护战场，神情肃穆。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.WORKING, description: '整理遗物', greeting: '老兵正在整理战友遗物。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '老兵正在用午膳。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '老兵正在小憩。' },
      { startHour: 14, endHour: 17, activity: NPCActivityType.GUARDING, description: '继续守护', greeting: '老兵正在继续守护战场。' },
      { startHour: 17, endHour: 18, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '老兵正在用晚膳。' },
      { startHour: 18, endHour: 20, activity: NPCActivityType.SOCIALIZING, description: '缅怀战友', greeting: '老兵正在缅怀战友，神色黯然。' },
      { startHour: 20, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '老兵已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.GUARDING, mood: NPCMood.WORRIED, reason: '守护战场' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.SAD, reason: '缅怀战友' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '追忆往事' },
    ],
  },

  wounded_monk: {
    schedule: [
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '刘元正在用早膳，动作缓慢。' },
      { startHour: 7, endHour: 12, activity: NPCActivityType.RESTING, description: '养伤休息', greeting: '刘元正在养伤休息，脸色苍白。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '刘元正在用午膳。' },
      { startHour: 13, endHour: 17, activity: NPCActivityType.RESTING, description: '继续养伤', greeting: '刘元正在继续养伤。' },
      { startHour: 17, endHour: 18, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '刘元正在用晚膳。' },
      { startHour: 18, endHour: 20, activity: NPCActivityType.MEDITATING, description: '冥想恢复', greeting: '刘元正在冥想恢复。' },
      { startHour: 20, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '刘元已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.RESTING, mood: NPCMood.TIRED, reason: '伤势未愈' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '冥想恢复' },
      { activity: NPCActivityType.EATING, mood: NPCMood.HAPPY, reason: '补充体力' },
    ],
  },

  tomb_robber: {
    schedule: [
      { startHour: 8, endHour: 10, activity: NPCActivityType.EATING, description: '用早膳', greeting: '侯三正在用早膳。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.WORKING, description: '探查遗迹', greeting: '侯三正在探查遗迹，小心翼翼。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '侯三正在用午膳。' },
      { startHour: 13, endHour: 16, activity: NPCActivityType.WORKING, description: '破解机关', greeting: '侯三正在破解机关，神情紧张。' },
      { startHour: 16, endHour: 18, activity: NPCActivityType.WORKING, description: '搜寻宝物', greeting: '侯三正在搜寻宝物。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '侯三正在用晚膳。' },
      { startHour: 19, endHour: 23, activity: NPCActivityType.WORKING, description: '夜间寻宝', greeting: '侯三正在夜间寻宝，偷偷摸摸。' },
      { startHour: 23, endHour: 8, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '侯三已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.WORKING, mood: NPCMood.EXCITED, reason: '发现宝物' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.WORRIED, reason: '破解机关' },
      { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '忙碌一天' },
    ],
  },

  old_herbalist: {
    schedule: [
      { startHour: 4, endHour: 6, activity: NPCActivityType.FARMING, description: '清晨采药', greeting: '药农老翁正在清晨采药。' },
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '药农老翁正在用早膳。' },
      { startHour: 7, endHour: 12, activity: NPCActivityType.FARMING, description: '上午采药', greeting: '药农老翁正在上午采药，健步如飞。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '药农老翁正在用午膳。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '药农老翁正在小憩。' },
      { startHour: 14, endHour: 18, activity: NPCActivityType.FARMING, description: '下午采药', greeting: '药农老翁正在下午采药。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '药农老翁正在用晚膳。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '整理药材', greeting: '药农老翁正在整理药材。' },
      { startHour: 21, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '药农老翁已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.FARMING, mood: NPCMood.HAPPY, reason: '采到珍稀药材' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '整理药材' },
      { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '采药疲惫' },
    ],
  },

  xiao_zhan: {
    schedule: [
      { startHour: 5, endHour: 6, activity: NPCActivityType.MEDITATING, description: '清晨冥想', greeting: '萧战正在清晨冥想，调理斗气。' },
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '萧战正在用早膳。' },
      { startHour: 7, endHour: 9, activity: NPCActivityType.WORKING, description: '处理族务', greeting: '萧战正在处理萧家族务。' },
      { startHour: 9, endHour: 11, activity: NPCActivityType.CULTIVATING, description: '修炼萧家功法', greeting: '萧战正在修炼萧家基础功法。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接见访客', greeting: '萧战正在接见来访的宾客。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '萧战正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '萧战正在午后小憩。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.WORKING, description: '巡视族中产业', greeting: '萧战正在巡视萧家产业。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.SOCIALIZING, description: '与家族长老议事', greeting: '萧战正在与家族长老议事。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '萧战正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间修炼', greeting: '萧战正在夜间修炼。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '萧战已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.WORKING, mood: NPCMood.WORRIED, reason: '忧心家族兴衰' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.NEUTRAL, reason: '处理人际' },
    ],
  },

  xiao_yan: {
    schedule: [
      { startHour: 4, endHour: 6, activity: NPCActivityType.CULTIVATING, description: '后山修炼', greeting: '萧炎正在后山修炼，汗水浸透了衣衫。' },
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '萧炎正在用早膳，狼吞虎咽。' },
      { startHour: 7, endHour: 9, activity: NPCActivityType.WORKING, description: '家族杂务', greeting: '萧炎正在做家族杂务。' },
      { startHour: 9, endHour: 11, activity: NPCActivityType.RESTING, description: '树下休息', greeting: '萧炎靠在树下休息，眼神中透着不甘。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与人交谈', greeting: '萧炎正在与人交谈，神色复杂。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '萧炎正在用午膳。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '萧炎正在午后休息。' },
      { startHour: 14, endHour: 17, activity: NPCActivityType.CULTIVATING, description: '药老指点修炼', greeting: '萧炎正在接受药老指点，修炼状态渐入佳境。' },
      { startHour: 17, endHour: 18, activity: NPCActivityType.TRAVELING, description: '在城中闲逛', greeting: '萧炎正在城中闲逛。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '萧炎正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间修炼', greeting: '萧炎正在夜间修炼，灵气环绕周身。' },
      { startHour: 22, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '萧炎已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼有进步' },
      { activity: NPCActivityType.RESTING, mood: NPCMood.SAD, reason: '想起往事' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '静心修炼' },
    ],
  },

  yao_lao: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.MEDITATING, description: '灵魂修炼', greeting: '药老正在修炼灵魂力量，周身灵光闪烁。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '吸收灵粹', greeting: '药老正在吸收灵粹精华。' },
      { startHour: 8, endHour: 12, activity: NPCActivityType.CRAFTING, description: '研究丹方', greeting: '药老正在研究丹方，皱眉沉思。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '吸收灵粹', greeting: '药老正在吸收灵粹。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '灵魂休憩', greeting: '药老正在灵魂休憩中。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '指点萧炎修炼', greeting: '药老正在指点萧炎修炼。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '吸收灵粹', greeting: '药老正在吸收灵粹精华。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CRAFTING, description: '炼制丹药', greeting: '药老正在炼制丹药，丹炉火焰熊熊。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '灵魂休眠', greeting: '药老正在灵魂休眠中。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CRAFTING, mood: NPCMood.EXCITED, reason: '炼丹有心得' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '修炼灵魂' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.HAPPY, reason: '指点弟子' },
    ],
  },

  hai_bodong: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '修炼冰系斗气', greeting: '海波东正在修炼冰系斗气，周围寒气逼人。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '海波东正在用早膳。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '处理米特尔家族事务', greeting: '海波东正在处理米特尔家族事务。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接见访客', greeting: '海波东正在接见来访宾客。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '海波东正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '海波东正在午后小憩。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.PATROLLING, description: '巡视城市', greeting: '海波东正在巡视城市。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.CULTIVATING, description: '闭关修炼', greeting: '海波东正在闭关修炼。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '海波东正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间冥想', greeting: '海波东正在夜间冥想。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '海波东已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '修炼冰系斗气' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理家族事务' },
      { activity: NPCActivityType.PATROLLING, mood: NPCMood.WORRIED, reason: '警惕周边形势' },
    ],
  },

  ya_fei: {
    schedule: [
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '雅妃正在用早膳，举止优雅。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.WORKING, description: '查看账目', greeting: '雅妃正在查看商会账目。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.TRADING, description: '与商人洽谈', greeting: '雅妃正在与商人洽谈生意。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '雅妃正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '雅妃正在午后休息。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.SOCIALIZING, description: '参加社交活动', greeting: '雅妃正在参加社交活动，光彩照人。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.WORKING, description: '处理商会事务', greeting: '雅妃正在处理商会事务。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '雅妃正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.LEARNING, description: '研读商道', greeting: '雅妃正在研读商道书籍。' },
      { startHour: 22, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '雅妃已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.TRADING, mood: NPCMood.HAPPY, reason: '生意成功' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理事务' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '社交愉悦' },
    ],
  },

  nalan_yanran: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨练剑', greeting: '纳兰嫣然正在清晨练剑，剑光闪烁。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '纳兰嫣然正在用早膳。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.WORKING, description: '学习礼仪', greeting: '纳兰嫣然正在学习贵族礼仪。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼云岚宗功法', greeting: '纳兰嫣然正在修炼云岚宗功法。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '纳兰嫣然正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '纳兰嫣然正在午后休息。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.SOCIALIZING, description: '与师姐妹交谈', greeting: '纳兰嫣然正在与师姐妹交谈。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.CULTIVATING, description: '下午修炼', greeting: '纳兰嫣然正在下午修炼。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '纳兰嫣然正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间冥想', greeting: '纳兰嫣然正在夜间冥想。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '纳兰嫣然已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼精进' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.BORED, reason: '学习礼仪枯燥' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与师姐妹相处' },
    ],
  },

  chen_nan: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.MEDITATING, description: '感悟体内力量', greeting: '辰南正在感悟体内神秘力量，眉头紧锁。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '辰南正在用早膳，神色复杂。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '探索神魔陵园', greeting: '辰南正在探索神魔陵园，寻找记忆的线索。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与陵园中人交谈', greeting: '辰南正在与人交谈，试图了解当前世界。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '辰南正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '辰南正在午后休息，闭目沉思。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '修炼远古功法', greeting: '辰南正在修炼远古功法，力量涌动。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '辰南正在用晚膳。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.SOCIALIZING, description: '夜间探索陵园', greeting: '辰南正在夜间探索陵园，警惕四周。' },
      { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '辰南已安寝，梦中似乎有佳人身影。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '力量觉醒' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.WORRIED, reason: '失去记忆' },
      { activity: NPCActivityType.SLEEPING, mood: NPCMood.SAD, reason: '梦中佳人' },
    ],
  },

  meng_ke_er: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '修炼神功', greeting: '梦可儿正在修炼绝世神功，仙气缭绕。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '梦可儿正在用早膳，仪态万方。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '处理教派事务', greeting: '梦可儿正在处理教派事务。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接见弟子', greeting: '梦可儿正在接见弟子。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '梦可儿正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '梦可儿正在午后小憩。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.MEDITATING, description: '感悟天道', greeting: '梦可儿正在感悟天道，周身有祥云环绕。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '梦可儿正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '夜间修炼', greeting: '梦可儿正在夜间修炼，月华加身。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '梦可儿已安寝，睡容绝美。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '修炼仙道' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '感悟天道' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '教导弟子' },
    ],
  },

  long_wu: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '修炼龙家武技', greeting: '龙舞正在修炼龙家武技，英姿飒爽。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '龙舞正在用早膳。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.TRAVELING, description: '在森林中探索', greeting: '龙舞正在森林中探索。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.HUNTING, description: '狩猎灵兽', greeting: '龙舞正在狩猎灵兽。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '龙舞正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '龙舞正在午后休息。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.SOCIALIZING, description: '与族人切磋', greeting: '龙舞正在与族人切磋。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.CULTIVATING, description: '下午修炼', greeting: '龙舞正在下午修炼。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '龙舞正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间冥想', greeting: '龙舞正在夜间冥想。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '龙舞已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼有得' },
      { activity: NPCActivityType.HUNTING, mood: NPCMood.EXCITED, reason: '狩猎兴奋' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与族人相处' },
    ],
  },

  zhu_ge_hou: {
    schedule: [
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '诸葛璺正在用早膳。' },
      { startHour: 7, endHour: 11, activity: NPCActivityType.LEARNING, description: '研究墓碑符文', greeting: '诸葛璺正在研究墓碑上的符文，神情专注。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与来者交谈', greeting: '诸葛璺正在与人交谈魔法理论。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '诸葛璺正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '诸葛璺正在午后休息。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '修炼魔法', greeting: '诸葛璺正在修炼魔法，元素之力涌动。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '诸葛璺正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.LEARNING, description: '研究魔法古籍', greeting: '诸葛璺正在研究魔法古籍。' },
      { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '诸葛璺已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '研究有突破' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '修炼魔法' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '探讨魔法' },
    ],
  },

  du_gu_bai: {
    schedule: [
      { startHour: 4, endHour: 7, activity: NPCActivityType.MEDITATING, description: '感悟天地', greeting: '独孤败天正在感悟天地，周身气息深不可测。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '吸纳灵气', greeting: '独孤败天正在吸纳天地灵气。' },
      { startHour: 8, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼太古神功', greeting: '独孤败天正在修炼太古神功，威压冲天。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '吸纳灵气', greeting: '独孤败天正在吸纳天地灵气。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '闭目养神', greeting: '独孤败天正在闭目养神。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.MEDITATING, description: '参悟神道', greeting: '独孤败天正在参悟神道。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '吸纳灵气', greeting: '独孤败天正在吸纳天地灵气。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '夜间修炼', greeting: '独孤败天正在夜间修炼，星光加身。' },
      { startHour: 22, endHour: 4, activity: NPCActivityType.SLEEPING, description: '休眠', greeting: '独孤败天正在休眠。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '修炼太古神功' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '感悟天道' },
    ],
  },

  wang_lin: {
    schedule: [
      { startHour: 4, endHour: 6, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '王林正在清晨修炼，眼神坚定。' },
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '王林正在用早膳，沉默寡言。' },
      { startHour: 7, endHour: 10, activity: NPCActivityType.WORKING, description: '完成宗门任务', greeting: '王林正在完成宗门任务。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼仙逆功法', greeting: '王林正在修炼仙逆功法，灵气翻涌。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '王林正在用午膳。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '王林正在午后休息，闭目沉思。' },
      { startHour: 14, endHour: 17, activity: NPCActivityType.LEARNING, description: '研读道法', greeting: '王林正在研读道法典籍。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.CULTIVATING, description: '下午修炼', greeting: '王林正在下午修炼。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '王林正在用晚膳。' },
      { startHour: 20, endHour: 23, activity: NPCActivityType.MEDITATING, description: '夜间修炼', greeting: '王林正在夜间修炼，周身灵气环绕。' },
      { startHour: 23, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '王林已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '道法有得' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '静心悟道' },
    ],
  },

  li_mu_wan: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '修炼功法', greeting: '李慕婉正在修炼，气质清雅。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '李慕婉正在用早膳。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.CRAFTING, description: '炼制丹药', greeting: '李慕婉正在炼制丹药。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.LEARNING, description: '研读丹道古籍', greeting: '李慕婉正在研读丹道古籍。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '李慕婉正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '李慕婉正在午后休息。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.SOCIALIZING, description: '与同门交流', greeting: '李慕婉正在与同门交流。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.CULTIVATING, description: '下午修炼', greeting: '李慕婉正在下午修炼。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '李慕婉正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间冥想', greeting: '李慕婉正在夜间冥想。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '李慕婉已安寝，睡容恬静。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '静心修炼' },
      { activity: NPCActivityType.CRAFTING, mood: NPCMood.HAPPY, reason: '炼丹成功' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与同门相处' },
    ],
  },

  si_qiu: {
    schedule: [
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '司秋正在用早膳。' },
      { startHour: 7, endHour: 10, activity: NPCActivityType.WORKING, description: '处理外门事务', greeting: '司秋正在处理外门事务。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼功法', greeting: '司秋正在修炼功法。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '司秋正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '司秋正在午后休息。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.SOCIALIZING, description: '与弟子交流', greeting: '司秋正在与弟子交流。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.CULTIVATING, description: '下午修炼', greeting: '司秋正在下午修炼。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '司秋正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.LEARNING, description: '研读功法', greeting: '司秋正在研读功法。' },
      { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '司秋已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理事务' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与弟子相处' },
    ],
  },

  liu_bing: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '练剑', greeting: '柳冰正在练剑，剑光如霜。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '柳冰正在用早膳。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '内门值守', greeting: '柳冰正在内门值守。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与师姐交谈', greeting: '柳冰正在与师姐交谈。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '柳冰正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '柳冰正在午后休息。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.CULTIVATING, description: '下午修炼', greeting: '柳冰正在下午修炼。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.SOCIALIZING, description: '切磋剑法', greeting: '柳冰正在与人切磋剑法。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '柳冰正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间冥想', greeting: '柳冰正在夜间冥想。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '柳冰已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心练剑' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '切磋剑法' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '静心修炼' },
    ],
  },

  ye_fan: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '叶凡正在清晨修炼，圣体气息涌动。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '叶凡正在用早膳。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '探索荒古禁地', greeting: '叶凡正在探索荒古禁地，寻找机缘。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与人论道', greeting: '叶凡正在与人论道。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '叶凡正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '叶凡正在午后休息。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '修炼天帝经', greeting: '叶凡正在修炼天帝经，帝威初显。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '叶凡正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '悟道', greeting: '叶凡正在悟道，周身有道韵流转。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '叶凡已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '圣体觉醒' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '悟道中' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与人论道' },
    ],
  },

  wu_shi: {
    schedule: [
      { startHour: 4, endHour: 7, activity: NPCActivityType.MEDITATING, description: '无始悟道', greeting: '无始大帝正在悟道，时空静止。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '吸纳天地精气', greeting: '无始大帝正在吸纳天地精气。' },
      { startHour: 8, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼无始经', greeting: '无始大帝正在修炼无始经，大道无形。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '吸纳天地精气', greeting: '无始大帝正在吸纳天地精气。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '闭目养神', greeting: '无始大帝正在闭目养神。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.MEDITATING, description: '参悟时空之道', greeting: '无始大帝正在参悟时空之道。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '吸纳天地精气', greeting: '无始大帝正在吸纳天地精气。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '夜间修炼', greeting: '无始大帝正在夜间修炼。' },
      { startHour: 22, endHour: 4, activity: NPCActivityType.SLEEPING, description: '休眠', greeting: '无始大帝正在休眠。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '证道大帝' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '参悟大道' },
    ],
  },

  hen_ren: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.MEDITATING, description: '独自静坐', greeting: '狠人大帝正在静坐，面具下的面容看不真切。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '吸纳神华', greeting: '狠人大帝正在吸纳天地神华。' },
      { startHour: 8, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼吞天魔功', greeting: '狠人大帝正在修炼吞天魔功，魔气滔天。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '吸纳神华', greeting: '狠人大帝正在吸纳天地神华。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '遥望远方', greeting: '狠人大帝正在遥望远方，似乎在等待什么人。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.MEDITATING, description: '悟道', greeting: '狠人大帝正在悟道。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '吸纳神华', greeting: '狠人大帝正在吸纳天地神华。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '夜间修炼', greeting: '狠人大帝正在夜间修炼。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '狠人大帝已安睡。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '修炼魔功' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.SAD, reason: '思念故人' },
      { activity: NPCActivityType.RESTING, mood: NPCMood.SAD, reason: '等待哥哥' },
    ],
  },

  donghuang: {
    schedule: [
      { startHour: 4, endHour: 7, activity: NPCActivityType.MEDITATING, description: '东皇悟道', greeting: '东皇正在悟道，周身有混沌气环绕。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '吸纳鸿蒙气', greeting: '东皇正在吸纳鸿蒙之气。' },
      { startHour: 8, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼东皇钟', greeting: '东皇正在修炼东皇钟，钟声悠扬。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '吸纳鸿蒙气', greeting: '东皇正在吸纳鸿蒙之气。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '闭目养神', greeting: '东皇正在闭目养神。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.WORKING, description: '处理妖族事务', greeting: '东皇正在处理妖族事务。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '吸纳鸿蒙气', greeting: '东皇正在吸纳鸿蒙之气。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '夜间修炼', greeting: '东皇正在夜间修炼。' },
      { startHour: 22, endHour: 4, activity: NPCActivityType.SLEEPING, description: '休眠', greeting: '东皇正在休眠。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '修炼妖族神功' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理妖族事务' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '悟道中' },
    ],
  },

  chu_feng: {
    schedule: [
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '楚风正在用早膳。' },
      { startHour: 7, endHour: 10, activity: NPCActivityType.WORKING, description: '探索异变区域', greeting: '楚风正在探索异变区域，寻找机缘。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼呼吸法', greeting: '楚风正在修炼神秘呼吸法。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '楚风正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '楚风正在午后休息。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.HUNTING, description: '狩猎异兽王', greeting: '楚风正在狩猎异兽王。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.CULTIVATING, description: '下午修炼', greeting: '楚风正在下午修炼。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '楚风正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.SOCIALIZING, description: '与人交流', greeting: '楚风正在与人交流。' },
      { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '楚风已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼有得' },
      { activity: NPCActivityType.HUNTING, mood: NPCMood.EXCITED, reason: '狩猎异兽王' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '探索异变' },
    ],
  },

  sun_wukong: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '修炼七十二变', greeting: '孙悟空正在修炼七十二变，身形变幻莫测。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '孙悟空正在用早膳，狼吞虎咽。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '降妖除魔', greeting: '孙悟空正在降妖除魔，金箍棒挥舞。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与各路神仙交流', greeting: '孙悟空正在与各路神仙交流。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '孙悟空正在用午膳，吃了一大堆。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '孙悟空正在午后小憩，鼾声如雷。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.TRAVELING, description: '四处游历', greeting: '孙悟空正在四处游历，一个筋斗云十万八千里。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '孙悟空正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '修炼火眼金睛', greeting: '孙悟空正在修炼火眼金睛。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '孙悟空已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼神功' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.EXCITED, reason: '降妖除魔' },
      { activity: NPCActivityType.TRAVELING, mood: NPCMood.HAPPY, reason: '四处游历' },
    ],
  },

  jiu_dian: {
    schedule: [
      { startHour: 8, endHour: 10, activity: NPCActivityType.EATING, description: '用早膳配酒', greeting: '酒帝正在用早膳，当然少不了酒。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.CRAFTING, description: '酿造仙酒', greeting: '酒帝正在酿造仙酒，酒香四溢。' },
      { startHour: 12, endHour: 14, activity: NPCActivityType.EATING, description: '饮酒作乐', greeting: '酒帝正在饮酒作乐。' },
      { startHour: 14, endHour: 16, activity: NPCActivityType.SLEEPING, description: '醉卧', greeting: '酒帝醉卧不起。' },
      { startHour: 16, endHour: 18, activity: NPCActivityType.SOCIALIZING, description: '邀请友人喝酒', greeting: '酒帝正在邀请友人喝酒。' },
      { startHour: 18, endHour: 22, activity: NPCActivityType.EATING, description: '夜间畅饮', greeting: '酒帝正在夜间畅饮。' },
      { startHour: 22, endHour: 24, activity: NPCActivityType.CULTIVATING, description: '修炼酒道', greeting: '酒帝正在修炼酒道。' },
      { startHour: 0, endHour: 8, activity: NPCActivityType.SLEEPING, description: '醉眠', greeting: '酒帝醉眠中。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.EATING, mood: NPCMood.HAPPY, reason: '饮酒开心' },
      { activity: NPCActivityType.CRAFTING, mood: NPCMood.EXCITED, reason: '酿出新酒' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与友畅饮' },
    ],
  },

  shi_hao: {
    schedule: [
      { startHour: 4, endHour: 6, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '陈玄正在清晨修炼，周身血气奔涌如龙。' },
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '陈玄正在用早膳，食量惊人。' },
      { startHour: 7, endHour: 9, activity: NPCActivityType.WORKING, description: '狩猎妖兽', greeting: '陈玄正在狩猎妖兽，身手矫健。' },
      { startHour: 9, endHour: 11, activity: NPCActivityType.CULTIVATING, description: '修炼原始真解', greeting: '陈玄正在修炼原始真解，宝术流转。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与村中孩童玩耍', greeting: '陈玄正在与村中孩童玩耍，笑容灿烂。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '陈玄正在用午膳，狼吞虎咽。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '陈玄正在午后休息，闭目养神。' },
      { startHour: 14, endHour: 17, activity: NPCActivityType.CULTIVATING, description: '修炼骨文', greeting: '陈玄正在刻录骨文，眉心光华闪烁。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.HUNTING, description: '进山狩猎', greeting: '陈玄正在山中狩猎，寻找宝药。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '陈玄正在用晚膳，品尝今日猎物。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间悟道', greeting: '陈玄正在夜间悟道，周身有大道符文流转。' },
      { startHour: 22, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '陈玄已安寝，睡梦中还在咂嘴。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼有精进' },
      { activity: NPCActivityType.HUNTING, mood: NPCMood.EXCITED, reason: '狩猎收获颇丰' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与伙伴玩耍' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '悟道中' },
    ],
    weeklyPattern: [
      { dayOfWeek: 3, activity: NPCActivityType.TRAVELING, description: '初三去大荒深处' },
      { dayOfWeek: 6, activity: NPCActivityType.SOCIALIZING, description: '初六参加族比' },
    ],
  },

  shi_yi: {
    schedule: [
      { startHour: 4, endHour: 6, activity: NPCActivityType.MEDITATING, description: '清晨冥想', greeting: '石毅正在清晨冥想，双目开合间有神光射出。' },
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '石毅正在用早膳，举止优雅。' },
      { startHour: 7, endHour: 10, activity: NPCActivityType.CULTIVATING, description: '修炼重瞳宝术', greeting: '石毅正在修炼重瞳宝术，瞳孔中符文密布。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.LEARNING, description: '研读古籍', greeting: '石毅正在研读古籍，神情专注。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '石毅正在用午膳。' },
      { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '石毅正在午后小憩。' },
      { startHour: 14, endHour: 17, activity: NPCActivityType.CULTIVATING, description: '修炼补天术', greeting: '石毅正在修炼补天术，气息深不可测。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.SOCIALIZING, description: '与族中长老议事', greeting: '石毅正在与族中长老议事。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '石毅正在用晚膳。' },
      { startHour: 20, endHour: 23, activity: NPCActivityType.MEDITATING, description: '夜间修炼', greeting: '石毅正在夜间修炼，周身有神圣光辉。' },
      { startHour: 23, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '石毅已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '悟道有得' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.NEUTRAL, reason: '处理族务' },
    ],
    weeklyPattern: [
      { dayOfWeek: 1, activity: NPCActivityType.WORKING, description: '初一处理族务' },
      { dayOfWeek: 5, activity: NPCActivityType.CULTIVATING, description: '初五闭关' },
    ],
  },

  yue_chan: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '月婵正在清晨修炼，周身仙气缭绕。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '月婵正在用早膳，仪态万方。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.MEDITATING, description: '参悟天道', greeting: '月婵正在参悟天道，眉目如画。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.LEARNING, description: '研读仙经', greeting: '月婵正在研读仙经，神光内敛。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '月婵正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后静养', greeting: '月婵正在午后静养，如同月下仙子。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '修炼补天阁功法', greeting: '月婵正在修炼补天阁功法，神圣祥和。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '月婵正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间悟道', greeting: '月婵正在夜间悟道，月华加身。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '月婵已安寝，睡容绝美。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '静心修炼' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '悟道中' },
      { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '研读仙经有得' },
    ],
  },

  qing_yi: {
    schedule: [
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '清漪正在用早膳，眉眼如画。' },
      { startHour: 7, endHour: 9, activity: NPCActivityType.CULTIVATING, description: '修炼法术', greeting: '清漪正在修炼法术，灵光闪烁。' },
      { startHour: 9, endHour: 11, activity: NPCActivityType.SOCIALIZING, description: '与师姐交谈', greeting: '清漪正在与师姐交谈，笑容温婉。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.LEARNING, description: '研读丹道', greeting: '清漪正在研读丹道典籍。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '清漪正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '清漪正在午后休息。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CRAFTING, description: '炼制丹药', greeting: '清漪正在炼制丹药，丹香弥漫。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '清漪正在用晚膳。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.MEDITATING, description: '夜间修炼', greeting: '清漪正在夜间修炼。' },
      { startHour: 21, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '清漪已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.CRAFTING, mood: NPCMood.HAPPY, reason: '炼丹成功' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与师姐相处' },
    ],
  },

  huo_linger: {
    schedule: [
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '赖床', greeting: '焰灵还在赖床，嘟囔着不想起。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '焰灵正在用早膳，一边吃一边东张西望。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.CULTIVATING, description: '修炼火凰功', greeting: '焰灵正在修炼火凰功，周身火焰跳动。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.TRAVELING, description: '在城中游玩', greeting: '焰灵正在城中游玩，好奇地看着四周。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '焰灵正在用午膳，挑挑拣拣。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.SLEEPING, description: '午睡', greeting: '焰灵正在午睡，睡得很香甜。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.SOCIALIZING, description: '与侍女玩耍', greeting: '焰灵正在与侍女玩耍，笑声清脆。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.HUNTING, description: '猎场狩猎', greeting: '焰灵正在猎场狩猎，英姿飒爽。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '焰灵正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.SOCIALIZING, description: '夜间玩耍', greeting: '焰灵正在夜间玩耍，精力旺盛。' },
      { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '焰灵终于睡着了。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.TRAVELING, mood: NPCMood.HAPPY, reason: '游玩开心' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.BORED, reason: '修炼无聊' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '玩耍开心' },
    ],
  },

  maoshan: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '茅山道人正在清晨修炼，气息沉稳。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '茅山道人正在用早膳。' },
      { startHour: 8, endHour: 12, activity: NPCActivityType.WORKING, description: '处理青云村事务', greeting: '茅山道人正在处理青云村事务，神色认真。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '茅山道人正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '茅山道人正在午后休息。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '下午修炼', greeting: '茅山道人正在下午修炼。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '茅山道人正在用晚膳。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.SOCIALIZING, description: '与村民闲聊', greeting: '茅山道人正在与村民闲聊。' },
      { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '茅山道人已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理村务' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与村民相处' },
    ],
  },

  xiao_xun_er: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '萧薰儿正在清晨修炼，金色斗气萦绕周身。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '萧薰儿正在用早膳，举止优雅。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.SOCIALIZING, description: '寻找萧炎', greeting: '萧薰儿正在寻找萧炎的身影。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼古族功法', greeting: '萧薰儿正在修炼古族功法，神光内敛。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '萧薰儿正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '萧薰儿正在午后休息，想着萧炎哥哥。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.LEARNING, description: '研读古籍', greeting: '萧薰儿正在研读古籍，寻找提升实力的方法。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.SOCIALIZING, description: '与萧炎相处', greeting: '萧薰儿正在与萧炎在一起，笑容温婉。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '萧薰儿正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间修炼', greeting: '萧薰儿正在夜间修炼，金辉洒落。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '萧薰儿已安寝，睡梦中带着微笑。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与萧炎哥哥在一起' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '发现新功法' },
    ],
  },

  yun_yun: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨练剑', greeting: '云韵正在清晨练剑，剑光如练。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '云韵正在用早膳，气质高雅。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '处理宗门事务', greeting: '云韵正在处理云岚宗事务，神色认真。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接见弟子', greeting: '云韵正在接见弟子。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '云韵正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '云韵正在午后小憩，眉宇间带着忧色。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '修炼风系斗气', greeting: '云韵正在修炼风系斗气，周身清风缭绕。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '云韵正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间悟道', greeting: '云韵正在夜间悟道，神色复杂。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '云韵已安寝，睡梦中似乎有心事。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.WORKING, mood: NPCMood.WORRIED, reason: '忧心宗门' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.SAD, reason: '想起往事' },
    ],
  },

  xiao_mei: {
    schedule: [
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '萧媚正在用早膳。' },
      { startHour: 7, endHour: 9, activity: NPCActivityType.CULTIVATING, description: '修炼斗气', greeting: '萧媚正在修炼斗气，很是用功。' },
      { startHour: 9, endHour: 11, activity: NPCActivityType.SOCIALIZING, description: '与姐妹聊天', greeting: '萧媚正在与姐妹们聊天，笑声不断。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.LEARNING, description: '学习礼仪', greeting: '萧媚正在学习贵族礼仪。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '萧媚正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '萧媚正在午后休息。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.SOCIALIZING, description: '参加社交活动', greeting: '萧媚正在参加社交活动，左右逢源。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.CULTIVATING, description: '下午修炼', greeting: '萧媚正在下午修炼。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '萧媚正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.SOCIALIZING, description: '夜间闲聊', greeting: '萧媚正在夜间闲聊。' },
      { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '萧媚已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与人相处' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.LEARNING, mood: NPCMood.BORED, reason: '礼仪枯燥' },
    ],
  },

  chen_zhan: {
    schedule: [
      { startHour: 4, endHour: 6, activity: NPCActivityType.MEDITATING, description: '感悟天地', greeting: '辰战正在感悟天地，气息深不可测。' },
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '吸纳灵气', greeting: '辰战正在吸纳天地灵气。' },
      { startHour: 7, endHour: 11, activity: NPCActivityType.CULTIVATING, description: '修炼神禁', greeting: '辰战正在修炼神禁之术，威压惊天。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.WORKING, description: '寻找辰南', greeting: '辰战正在寻找辰南的下落，神色凝重。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '吸纳灵气', greeting: '辰战正在吸纳天地灵气。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '闭目养神', greeting: '辰战正在闭目养神。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.MEDITATING, description: '参悟天道', greeting: '辰战正在参悟天道，仿佛与天地合一。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '吸纳灵气', greeting: '辰战正在吸纳天地灵气。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '夜间修炼', greeting: '辰战正在夜间修炼，星光如瀑。' },
      { startHour: 22, endHour: 4, activity: NPCActivityType.SLEEPING, description: '休眠', greeting: '辰战正在休眠中。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '修炼神禁' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.WORRIED, reason: '寻找辰南' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '悟道中' },
    ],
  },

  da_mo_tian_wang: {
    schedule: [
      { startHour: 4, endHour: 7, activity: NPCActivityType.MEDITATING, description: '参悟魔道', greeting: '大魔天王正在参悟魔道，魔气冲天。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '吸纳精气', greeting: '大魔天王正在吸纳天地精气。' },
      { startHour: 8, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼魔功', greeting: '大魔天王正在修炼魔功，威压盖世。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '吸纳精气', greeting: '大魔天王正在吸纳天地精气。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '闭目养神', greeting: '大魔天王正在闭目养神。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.WORKING, description: '谋划大事', greeting: '大魔天王正在谋划大事，神色莫测。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '吸纳精气', greeting: '大魔天王正在吸纳天地精气。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '夜间修炼', greeting: '大魔天王正在夜间修炼，魔气滔天。' },
      { startHour: 22, endHour: 4, activity: NPCActivityType.SLEEPING, description: '休眠', greeting: '大魔天王正在休眠中。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '修炼魔功' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.EXCITED, reason: '大计将成' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '参悟魔道' },
    ],
  },

  yu_qing_xian: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '雨清仙正在清晨修炼，仙气缭绕。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '雨清仙正在用早膳，气质出尘。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '处理门派事务', greeting: '雨清仙正在处理门派事务。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接见弟子', greeting: '雨清仙正在接见弟子。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '雨清仙正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '雨清仙正在午后小憩。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.MEDITATING, description: '感悟天道', greeting: '雨清仙正在感悟天道，周身祥云环绕。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '雨清仙正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '夜间修炼', greeting: '雨清仙正在夜间修炼，月华遍洒。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '雨清仙已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '修炼仙道' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '悟道中' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '教导弟子' },
    ],
  },

  ji_ziyue: {
    schedule: [
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '姬紫月正在用早膳，俏皮可爱。' },
      { startHour: 7, endHour: 9, activity: NPCActivityType.CULTIVATING, description: '修炼姬家功法', greeting: '姬紫月正在修炼姬家功法，灵气灵动。' },
      { startHour: 9, endHour: 11, activity: NPCActivityType.SOCIALIZING, description: '与丫鬟玩耍', greeting: '姬紫月正在与丫鬟玩耍，笑声清脆。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.LEARNING, description: '学习道术', greeting: '姬紫月正在学习道术，神情专注。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '姬紫月正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '姬紫月正在午后休息。' },
      { startHour: 15, endHour: 17, activity: NPCActivityType.TRAVELING, description: '在城中闲逛', greeting: '姬紫月正在城中闲逛，好奇地打量四周。' },
      { startHour: 17, endHour: 19, activity: NPCActivityType.SOCIALIZING, description: '与叶凡聊天', greeting: '姬紫月正在与叶凡聊天，笑容灿烂。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '姬紫月正在用晚膳。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间修炼', greeting: '姬紫月正在夜间修炼。' },
      { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '姬紫月已安寝，睡梦中带着笑容。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与朋友玩耍' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.TRAVELING, mood: NPCMood.HAPPY, reason: '逛街开心' },
    ],
  },

  ji_haoyue: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '姬皓月正在清晨修炼，神华内敛。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '姬皓月正在用早膳，气质如玉。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '处理家族事务', greeting: '姬皓月正在处理姬家事务。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.LEARNING, description: '研读古籍', greeting: '姬皓月正在研读古籍，神情专注。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '姬皓月正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '姬皓月正在午后休息。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '修炼虚空术', greeting: '姬皓月正在修炼虚空术，空间波动。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '姬皓月正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间悟道', greeting: '姬皓月正在夜间悟道，周身有大道符文。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '姬皓月已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理家族事务' },
      { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '悟道有得' },
    ],
  },

  qing_yuan: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.MEDITATING, description: '清晨打坐', greeting: '清缘正在清晨打坐，气息祥和。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '清缘正在用早膳，清雅脱俗。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.CULTIVATING, description: '修炼秘术', greeting: '清缘正在修炼秘术，神光闪烁。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.LEARNING, description: '研读道经', greeting: '清缘正在研读道经。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '清缘正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后静养', greeting: '清缘正在午后静养。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.SOCIALIZING, description: '与人论道', greeting: '清缘正在与人论道。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '清缘正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间修炼', greeting: '清缘正在夜间修炼。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '清缘已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与人论道' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '悟道中' },
    ],
  },

  huang_jin: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '黄金正在清晨修炼，气血冲霄。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '黄金正在用早膳，食量惊人。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.HUNTING, description: '狩猎异兽', greeting: '黄金正在狩猎异兽，威风凛凛。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与族人交流', greeting: '黄金正在与族人交流。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '黄金正在用午膳，大口吃肉。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '黄金正在午后休息，鼾声如雷。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '修炼王族功法', greeting: '黄金正在修炼王族功法，金光万丈。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '黄金正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.SOCIALIZING, description: '夜间聚会', greeting: '黄金正在参加夜间聚会。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '黄金已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼有得' },
      { activity: NPCActivityType.HUNTING, mood: NPCMood.EXCITED, reason: '狩猎兴奋' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与族人相处' },
    ],
  },

  zhang_hu_feng: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '张虎峰正在清晨修炼，气息沉稳。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '张虎峰正在用早膳。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '处理外门事务', greeting: '张虎峰正在处理外门事务，严肃认真。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.GUARDING, description: '巡视外门', greeting: '张虎峰正在巡视外门。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '张虎峰正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '张虎峰正在午后休息。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '下午修炼', greeting: '张虎峰正在下午修炼。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '张虎峰正在用晚膳。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '夜间值守', greeting: '张虎峰正在夜间值守。' },
      { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '张虎峰已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理事务' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.GUARDING, mood: NPCMood.WORRIED, reason: '警惕四周' },
    ],
  },

  tie_zhu: {
    schedule: [
      { startHour: 5, endHour: 6, activity: NPCActivityType.EATING, description: '用早膳', greeting: '铁柱正在用早膳，吃得很香。' },
      { startHour: 6, endHour: 10, activity: NPCActivityType.CRAFTING, description: '打铁', greeting: '铁柱正在打铁，叮叮当当。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.WORKING, description: '修补农具', greeting: '铁柱正在修补农具。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '铁柱正在用午膳，狼吞虎咽。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '铁柱正在午后休息，打着呼噜。' },
      { startHour: 15, endHour: 19, activity: NPCActivityType.CRAFTING, description: '继续打铁', greeting: '铁柱正在继续打铁，汗水浸透了衣衫。' },
      { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '铁柱正在用晚膳。' },
      { startHour: 20, endHour: 21, activity: NPCActivityType.SOCIALIZING, description: '与人闲聊', greeting: '铁柱正在与人闲聊。' },
      { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '铁柱已安寝，鼾声震天。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CRAFTING, mood: NPCMood.HAPPY, reason: '打铁开心' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与人闲聊' },
      { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '劳作一天' },
    ],
  },

  xiao_cui: {
    schedule: [
      { startHour: 5, endHour: 6, activity: NPCActivityType.WORKING, description: '采药', greeting: '小翠正在采药，动作轻盈。' },
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '小翠正在用早膳。' },
      { startHour: 7, endHour: 10, activity: NPCActivityType.CRAFTING, description: '晾晒药材', greeting: '小翠正在晾晒药材。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.LEARNING, description: '学习药理', greeting: '小翠正在学习药理，神情认真。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '小翠正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '小翠正在午后休息。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.SOCIALIZING, description: '与玩伴玩耍', greeting: '小翠正在与玩伴玩耍，笑声清脆。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '小翠正在用晚膳。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.LEARNING, description: '夜间学习', greeting: '小翠正在夜间学习药理知识。' },
      { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '小翠已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '学到新知识' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与玩伴玩耍' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '采药劳作' },
    ],
  },

  wang_pangzi: {
    schedule: [
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '王胖子正在用早膳，吃得满嘴流油。' },
      { startHour: 8, endHour: 10, activity: NPCActivityType.WORKING, description: '盘点货物', greeting: '王胖子正在盘点货物，打着算盘。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.TRADING, description: '做买卖', greeting: '王胖子正在做买卖，笑容满面。' },
      { startHour: 12, endHour: 14, activity: NPCActivityType.EATING, description: '用午膳', greeting: '王胖子正在用午膳，满桌佳肴。' },
      { startHour: 14, endHour: 16, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '王胖子正在午后小憩，鼾声如雷。' },
      { startHour: 16, endHour: 18, activity: NPCActivityType.SOCIALIZING, description: '打探消息', greeting: '王胖子正在打探消息，眼神贼亮。' },
      { startHour: 18, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '王胖子正在用晚膳，大快朵颐。' },
      { startHour: 20, endHour: 22, activity: NPCActivityType.WORKING, description: '核对账目', greeting: '王胖子正在核对账目。' },
      { startHour: 22, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '王胖子已安寝，梦里还在数钱。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.TRADING, mood: NPCMood.HAPPY, reason: '生意兴隆' },
      { activity: NPCActivityType.EATING, mood: NPCMood.HAPPY, reason: '美食当前' },
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '打理生意' },
    ],
  },

  old_village_head: {
    schedule: [
      { startHour: 5, endHour: 6, activity: NPCActivityType.MEDITATING, description: '清晨调息', greeting: '老村长正在清晨调息，精神矍铄。' },
      { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '老村长正在用早膳，喝着稀粥。' },
      { startHour: 7, endHour: 10, activity: NPCActivityType.WORKING, description: '处理村中事务', greeting: '老村长正在处理村中事务，神情认真。' },
      { startHour: 10, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与村民交谈', greeting: '老村长正在与村民交谈。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '老村长正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '老村长正在午后休息。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.SOCIALIZING, description: '看望村中老人', greeting: '老村长正在看望村中老人。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '老村长正在用晚膳。' },
      { startHour: 19, endHour: 21, activity: NPCActivityType.LEARNING, description: '研究古籍', greeting: '老村长正在研究古籍，追忆往事。' },
      { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '老村长已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理村务' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与村民相处' },
      { activity: NPCActivityType.LEARNING, mood: NPCMood.NEUTRAL, reason: '研究古籍' },
    ],
  },

  bai_ze: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.MEDITATING, description: '清晨悟道', greeting: '白泽正在清晨悟道，智慧之光闪烁。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '吸纳灵气', greeting: '白泽正在吸纳天地灵气。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.LEARNING, description: '研读古籍', greeting: '白泽正在研读古籍，通晓万物。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '解答疑惑', greeting: '白泽正在为来者解答疑惑。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '吸纳灵气', greeting: '白泽正在吸纳天地灵气。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '闭目养神', greeting: '白泽正在闭目养神。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '修炼神通', greeting: '白泽正在修炼神通，气息深不可测。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '吸纳灵气', greeting: '白泽正在吸纳天地灵气。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间悟道', greeting: '白泽正在夜间悟道，周身有道韵流转。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '休眠', greeting: '白泽正在休眠中。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '发现新知' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '悟道中' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '传道授业' },
    ],
  },

  chu_ge: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '楚歌正在清晨修炼，战意冲天。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '楚歌正在用早膳。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '训练士兵', greeting: '楚歌正在训练士兵，声如洪钟。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与将士议事', greeting: '楚歌正在与将士议事。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '楚歌正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '楚歌正在午后休息。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.PATROLLING, description: '巡视防线', greeting: '楚歌正在巡视防线，神色凝重。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '楚歌正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '夜间修炼', greeting: '楚歌正在夜间修炼。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '楚歌已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '训练士兵' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼有得' },
      { activity: NPCActivityType.PATROLLING, mood: NPCMood.WORRIED, reason: '警惕敌情' },
    ],
  },

  feng_zi: {
    schedule: [
      { startHour: 8, endHour: 9, activity: NPCActivityType.EATING, description: '用早膳', greeting: '疯子正在用早膳，一边吃一边傻笑。' },
      { startHour: 9, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '胡言乱语', greeting: '疯子正在胡言乱语，时而大笑时而哭泣。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '疯子正在用午膳，吃得满身都是。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.SLEEPING, description: '随地而卧', greeting: '疯子正在随地而卧，鼾声阵阵。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.TRAVELING, description: '四处游荡', greeting: '疯子正在四处游荡，疯疯癫癫。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '疯子正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '偶尔清醒', greeting: '疯子偶尔清醒，眼中闪过一道精光。' },
      { startHour: 22, endHour: 8, activity: NPCActivityType.SLEEPING, description: '露宿街头', greeting: '疯子正在露宿街头。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '疯癫中作乐' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '偶尔清醒' },
      { activity: NPCActivityType.TRAVELING, mood: NPCMood.BORED, reason: '四处游荡' },
    ],
  },

  ji_shengzhu: {
    schedule: [
      { startHour: 5, endHour: 7, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '姬圣主正在清晨修炼，气息深不可测。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '姬圣主正在用早膳，威严庄重。' },
      { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '处理家族事务', greeting: '姬圣主正在处理姬家事务。' },
      { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接见宾客', greeting: '姬圣主正在接见宾客。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '姬圣主正在用午膳。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '姬圣主正在午后小憩。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '闭关修炼', greeting: '姬圣主正在闭关修炼。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '姬圣主正在用晚膳。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间悟道', greeting: '姬圣主正在夜间悟道。' },
      { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '姬圣主已安寝。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理家族事务' },
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '专心修炼' },
      { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.NEUTRAL, reason: '接见宾客' },
    ],
  },

  ji_laozu: {
    schedule: [
      { startHour: 4, endHour: 7, activity: NPCActivityType.MEDITATING, description: '参悟大道', greeting: '姬老祖正在参悟大道，仿佛与天地合一。' },
      { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '吸纳精气', greeting: '姬老祖正在吸纳天地精气。' },
      { startHour: 8, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼虚空经', greeting: '姬老祖正在修炼虚空经，空间波动。' },
      { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '吸纳精气', greeting: '姬老祖正在吸纳天地精气。' },
      { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '闭目养神', greeting: '姬老祖正在闭目养神。' },
      { startHour: 15, endHour: 18, activity: NPCActivityType.MEDITATING, description: '感悟虚空', greeting: '姬老祖正在感悟虚空之道。' },
      { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '吸纳精气', greeting: '姬老祖正在吸纳天地精气。' },
      { startHour: 19, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '夜间修炼', greeting: '姬老祖正在夜间修炼。' },
      { startHour: 22, endHour: 4, activity: NPCActivityType.SLEEPING, description: '休眠', greeting: '姬老祖正在休眠中。' },
    ],
    moodChanges: [
      { activity: NPCActivityType.CULTIVATING, mood: NPCMood.NEUTRAL, reason: '修炼虚空经' },
      { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '悟道中' },
    ],
  },
};

export function getCharacterLifeLogic(npcId: string): INPCDailyRoutine | undefined {
  return CHARACTER_LIFE_LOGIC[npcId];
}

export function hasCharacterLifeLogic(npcId: string): boolean {
  return CHARACTER_LIFE_LOGIC.hasOwnProperty(npcId);
}
