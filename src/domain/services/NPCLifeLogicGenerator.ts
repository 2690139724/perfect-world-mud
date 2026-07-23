import {
  NPCActivityType,
  NPCMood,
  INPCDailyRoutine,
  INPCScheduleEntry,
} from '../entities/NPCLifeLogic';

export class NPCLifeLogicGenerator {
  static generateForType(npcType: string, npcRoomId: string): INPCDailyRoutine {
    switch (npcType.toLowerCase()) {
      case 'elder':
      case '长老':
        return this.generateElderRoutine(npcRoomId);
      case 'guard':
      case '守卫':
      case '护卫':
        return this.generateGuardRoutine(npcRoomId);
      case 'merchant':
      case '商人':
      case '小贩':
        return this.generateMerchantRoutine(npcRoomId);
      case 'cultivator':
      case '修士':
      case '弟子':
        return this.generateCultivatorRoutine(npcRoomId);
      case 'innkeeper':
      case '掌柜':
        return this.generateInnkeeperRoutine(npcRoomId);
      case 'chef':
      case '厨师':
        return this.generateChefRoutine(npcRoomId);
      case 'doctor':
      case '医师':
      case '炼药师':
        return this.generateDoctorRoutine(npcRoomId);
      case 'blacksmith':
      case '铁匠':
        return this.generateBlacksmithRoutine(npcRoomId);
      case 'villager':
      case '村民':
      case '百姓':
        return this.generateVillagerRoutine(npcRoomId);
      case 'hunter':
      case '猎人':
        return this.generateHunterRoutine(npcRoomId);
      case 'farmer':
      case '农夫':
        return this.generateFarmerRoutine(npcRoomId);
      case 'teacher':
      case '夫子':
      case '先生':
        return this.generateTeacherRoutine(npcRoomId);
      case 'noble':
      case '贵族':
      case '官员':
        return this.generateNobleRoutine(npcRoomId);
      case 'emperor':
      case '皇':
      case '帝':
      case '王':
        return this.generateEmperorRoutine(npcRoomId);
      case 'princess':
      case '公主':
      case '郡主':
        return this.generatePrincessRoutine(npcRoomId);
      case 'auctioneer':
      case '拍卖师':
        return this.generateAuctioneerRoutine(npcRoomId);
      case 'fortuneteller':
      case '算命':
      case '卜卦':
        return this.generateFortunetellerRoutine(npcRoomId);
      case 'scholar':
      case '书生':
      case '文人':
        return this.generateScholarRoutine(npcRoomId);
      case 'drunkard':
      case '酒鬼':
      case '酒徒':
        return this.generateDrunkardRoutine(npcRoomId);
      case 'veteran':
      case '老兵':
      case '老卒':
        return this.generateVeteranRoutine(npcRoomId);
      case 'tombrobber':
      case '盗墓':
      case '摸金':
        return this.generateTombRobberRoutine(npcRoomId);
      case 'herbalist':
      case '药农':
      case '采药':
        return this.generateHerbalistRoutine(npcRoomId);
      case 'alchemist':
      case '丹师':
      case '炼丹':
        return this.generateAlchemistRoutine(npcRoomId);
      case 'sectleader':
      case '宗主':
      case '掌门':
        return this.generateSectLeaderRoutine(npcRoomId);
      case 'assassin':
      case '刺客':
      case '杀手':
        return this.generateAssassinRoutine(npcRoomId);
      case 'beast':
      case '灵兽':
      case '妖兽':
        return this.generateBeastRoutine(npcRoomId);
      case 'merchantleader':
      case '商会':
      case '会长':
        return this.generateMerchantLeaderRoutine(npcRoomId);
      case 'patrolleader':
      case '巡防':
      case '统领':
        return this.generatePatrolLeaderRoutine(npcRoomId);
      case 'musician':
      case '乐师':
      case '琴师':
      case '乐伎':
        return this.generateMusicianRoutine(npcRoomId);
      case 'dancer':
      case '舞姬':
      case '舞女':
        return this.generateDancerRoutine(npcRoomId);
      case 'tailor':
      case '裁缝':
      case '绣娘':
        return this.generateTailorRoutine(npcRoomId);
      case 'fisherman':
      case '渔夫':
      case '渔翁':
        return this.generateFishermanRoutine(npcRoomId);
      case 'woodcutter':
      case '樵夫':
      case '伐木工':
        return this.generateWoodcutterRoutine(npcRoomId);
      case 'miner':
      case '矿工':
      case '采矿':
        return this.generateMinerRoutine(npcRoomId);
      case 'messenger':
      case '信使':
      case '镖师':
      case '押运':
        return this.generateMessengerRoutine(npcRoomId);
      case 'beggar':
      case '乞丐':
      case '流浪汉':
        return this.generateBeggarRoutine(npcRoomId);
      case 'gardener':
      case '花匠':
      case '园丁':
        return this.generateGardenerRoutine(npcRoomId);
      case 'prisoner':
      case '狱卒':
      case '看守':
        return this.generatePrisonGuardRoutine(npcRoomId);
      case 'coroner':
      case '仵作':
      case '验尸':
        return this.generateCoronerRoutine(npcRoomId);
      case 'monk':
      case '和尚':
      case '僧侣':
      case '僧人':
        return this.generateMonkRoutine(npcRoomId);
      case 'witch':
      case '巫师':
      case '巫婆':
        return this.generateWitchRoutine(npcRoomId);
      case 'chessplayer':
      case '棋手':
      case '棋师':
        return this.generateChessPlayerRoutine(npcRoomId);
      case 'servant':
      case '仆人':
      case '丫鬟':
      case '侍女':
        return this.generateServantRoutine(npcRoomId);
      case 'painter':
      case '画家':
      case '画师':
        return this.generatePainterRoutine(npcRoomId);
      case 'poet':
      case '诗人':
      case '词客':
        return this.generatePoetRoutine(npcRoomId);
      case 'thief':
      case '小偷':
      case '窃贼':
        return this.generateThiefRoutine(npcRoomId);
      case 'spy':
      case '探子':
      case '密探':
        return this.generateSpyRoutine(npcRoomId);
      case 'nightwatch':
      case '更夫':
      case '打更':
        return this.generateNightWatchRoutine(npcRoomId);
      default:
        return this.generateDefaultRoutine(npcRoomId);
    }
  }

  private static generateElderRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 7, activity: NPCActivityType.MEDITATING, description: '清晨打坐冥想', greeting: '年轻人，这么早就来了？老夫正在打坐。' },
        { startHour: 7, endHour: 9, activity: NPCActivityType.EATING, description: '用早餐', greeting: '正好，来陪老夫用早餐吧。' },
        { startHour: 9, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '潜心修炼', greeting: '老夫正在修炼，有事稍后再说。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '正好到了用餐时间，一起吃点吧。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '午后时光，正是休息的好时候。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.SOCIALIZING, description: '与人交谈', greeting: '来，坐下聊聊。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '天色已晚，留下来吃顿便饭吧。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.MEDITATING, description: '晚间冥想', greeting: '老夫正在冥想，请勿打扰。' },
        { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，老夫要休息了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '冥想中，心境平和' },
        { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼有进展' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与人交谈心情舒畅' },
      ],
    };
  }

  private static generateGuardRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 8, activity: NPCActivityType.EATING, description: '用早餐', greeting: '早啊，吃了吗？' },
        { startHour: 8, endHour: 12, activity: NPCActivityType.GUARDING, description: '上午值守', greeting: '站住！什么人？' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '正好换班吃饭。' },
        { startHour: 13, endHour: 18, activity: NPCActivityType.GUARDING, description: '下午值守', greeting: '无事退下！' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '终于可以吃饭了。' },
        { startHour: 19, endHour: 24, activity: NPCActivityType.PATROLLING, description: '夜间巡逻', greeting: '夜间巡逻，请勿随意走动。' },
        { startHour: 0, endHour: 6, activity: NPCActivityType.SLEEPING, description: '休息', greeting: '我值夜班刚回来，让我睡会儿。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.GUARDING, mood: NPCMood.NEUTRAL, reason: '坚守岗位' },
        { activity: NPCActivityType.PATROLLING, mood: NPCMood.WORRIED, reason: '夜间警惕' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '值夜班疲惫' },
      ],
    };
  }

  private static generateMerchantRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 8, activity: NPCActivityType.EATING, description: '用早餐', greeting: '早啊，准备开门做生意了。' },
        { startHour: 8, endHour: 12, activity: NPCActivityType.TRADING, description: '上午营业', greeting: '客官，看看有什么需要的？' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '客官也来吃点东西？' },
        { startHour: 13, endHour: 18, activity: NPCActivityType.TRADING, description: '下午营业', greeting: '欢迎光临，看看有什么好货？' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '收摊了，吃点东西去。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '盘点货物', greeting: '正在盘点，明天再来吧。' },
        { startHour: 21, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，关门了！' },
      ],
      moodChanges: [
        { activity: NPCActivityType.TRADING, mood: NPCMood.HAPPY, reason: '生意兴隆' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '认真盘点' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '一天忙碌' },
      ],
    };
  }

  private static generateCultivatorRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 4, endHour: 6, activity: NPCActivityType.CULTIVATING, description: '清晨修炼', greeting: '清晨正是修炼的好时候！' },
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早餐', greeting: '修炼完正好补充体力。' },
        { startHour: 7, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '上午修炼', greeting: '正在修炼，请勿打扰。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '吃点东西继续修炼。' },
        { startHour: 13, endHour: 18, activity: NPCActivityType.CULTIVATING, description: '下午修炼', greeting: '修炼要紧，无事退下。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '终于可以休息一下了。' },
        { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '晚间冥想', greeting: '正在冥想，感悟天道。' },
        { startHour: 22, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，该休息了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼精进' },
        { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '心境平和' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '修炼疲惫' },
      ],
    };
  }

  private static generateInnkeeperRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 7, activity: NPCActivityType.WORKING, description: '准备开门', greeting: '起得真早，要住店吗？' },
        { startHour: 7, endHour: 9, activity: NPCActivityType.EATING, description: '用早餐', greeting: '客官，吃早餐了吗？' },
        { startHour: 9, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '招待客人', greeting: '客官里边请！' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '客官，要不要来点酒菜？' },
        { startHour: 13, endHour: 18, activity: NPCActivityType.SOCIALIZING, description: '招待客人', greeting: '欢迎光临！' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '客官，今晚想吃点什么？' },
        { startHour: 19, endHour: 23, activity: NPCActivityType.WORKING, description: '夜间值守', greeting: '客官慢走，欢迎下次再来！' },
        { startHour: 23, endHour: 5, activity: NPCActivityType.SLEEPING, description: '休息', greeting: '夜深了，有事明天再说。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '客人多开心' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '认真工作' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '忙碌一天' },
      ],
    };
  }

  private static generateChefRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 4, endHour: 7, activity: NPCActivityType.WORKING, description: '准备早餐', greeting: '这么早就来了？早餐马上就好。' },
        { startHour: 7, endHour: 9, activity: NPCActivityType.WORKING, description: '做早餐', greeting: '新鲜出炉的早餐，来点？' },
        { startHour: 9, endHour: 10, activity: NPCActivityType.EATING, description: '用早餐', greeting: '忙完了，该吃点东西了。' },
        { startHour: 10, endHour: 13, activity: NPCActivityType.WORKING, description: '准备午餐', greeting: '正在准备午餐，稍等片刻。' },
        { startHour: 13, endHour: 14, activity: NPCActivityType.EATING, description: '用午餐', greeting: '要不要一起吃点？' },
        { startHour: 14, endHour: 17, activity: NPCActivityType.WORKING, description: '准备晚餐', greeting: '晚餐快好了。' },
        { startHour: 17, endHour: 20, activity: NPCActivityType.WORKING, description: '做晚餐', greeting: '快来尝尝我的手艺！' },
        { startHour: 20, endHour: 21, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '终于可以吃自己做的饭了。' },
        { startHour: 21, endHour: 22, activity: NPCActivityType.WORKING, description: '清理厨房', greeting: '正在清理，明天再来。' },
        { startHour: 22, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '太累了，晚安。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.EXCITED, reason: '烹饪创作' },
        { activity: NPCActivityType.EATING, mood: NPCMood.HAPPY, reason: '品尝美食' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '厨房忙碌' },
      ],
    };
  }

  private static generateDoctorRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早餐', greeting: '早啊，有哪里不舒服吗？' },
        { startHour: 7, endHour: 12, activity: NPCActivityType.WORKING, description: '坐诊', greeting: '哪里不舒服？让我看看。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '看完这最后一位就吃饭。' },
        { startHour: 13, endHour: 18, activity: NPCActivityType.WORKING, description: '坐诊', greeting: '请坐，让我为你诊断一下。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '忙了一天，该休息了。' },
        { startHour: 19, endHour: 22, activity: NPCActivityType.CRAFTING, description: '配药', greeting: '正在配药，请勿打扰。' },
        { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，明天再来吧。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '认真诊治' },
        { activity: NPCActivityType.CRAFTING, mood: NPCMood.NEUTRAL, reason: '精心配药' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '诊治疲惫' },
      ],
    };
  }

  private static generateBlacksmithRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早餐', greeting: '早啊，来打把兵器？' },
        { startHour: 7, endHour: 12, activity: NPCActivityType.CRAFTING, description: '上午锻造', greeting: '叮叮当当，正在锻造！' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '歇会儿，吃点东西。' },
        { startHour: 13, endHour: 18, activity: NPCActivityType.CRAFTING, description: '下午锻造', greeting: '要打什么兵器？' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '收工了，吃点东西。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '整理工具', greeting: '正在整理，明天再来。' },
        { startHour: 21, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '太累了，晚安。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.CRAFTING, mood: NPCMood.EXCITED, reason: '锻造出好兵器' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '整理工具' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '锻造疲惫' },
      ],
    };
  }

  private static generateVillagerRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 7, activity: NPCActivityType.FARMING, description: '清晨劳作', greeting: '早起的鸟儿有虫吃！' },
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早餐', greeting: '吃点东西再干活。' },
        { startHour: 8, endHour: 12, activity: NPCActivityType.FARMING, description: '上午耕种', greeting: '正在地里干活呢。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '回家吃饭了。' },
        { startHour: 13, endHour: 17, activity: NPCActivityType.FARMING, description: '下午耕种', greeting: '继续干活了。' },
        { startHour: 17, endHour: 18, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '忙完了，吃点东西。' },
        { startHour: 18, endHour: 20, activity: NPCActivityType.SOCIALIZING, description: '邻里聊天', greeting: '来，坐下聊聊。' },
        { startHour: 20, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '早睡早起身体好。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.FARMING, mood: NPCMood.NEUTRAL, reason: '辛勤劳作' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '邻里和睦' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '劳作疲惫' },
      ],
    };
  }

  private static generateHunterRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 4, endHour: 6, activity: NPCActivityType.EATING, description: '用早餐', greeting: '早起去打猎！' },
        { startHour: 6, endHour: 12, activity: NPCActivityType.HUNTING, description: '上午狩猎', greeting: '正在追踪猎物，勿扰！' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '在野外吃点干粮。' },
        { startHour: 13, endHour: 18, activity: NPCActivityType.HUNTING, description: '下午狩猎', greeting: '继续追踪！' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '收获不错，今晚有肉吃了。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '处理猎物', greeting: '正在处理猎物，明天去镇上卖。' },
        { startHour: 21, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '太累了，晚安。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.HUNTING, mood: NPCMood.EXCITED, reason: '追踪猎物兴奋' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '认真处理' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '狩猎疲惫' },
      ],
    };
  }

  private static generateFarmerRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 7, activity: NPCActivityType.FARMING, description: '清晨下地', greeting: '早起下地干活！' },
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早餐', greeting: '回来吃点东西。' },
        { startHour: 8, endHour: 12, activity: NPCActivityType.FARMING, description: '上午耕种', greeting: '正在地里忙呢。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '回家吃饭了。' },
        { startHour: 13, endHour: 17, activity: NPCActivityType.FARMING, description: '下午耕种', greeting: '继续干活了。' },
        { startHour: 17, endHour: 18, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '忙完了，吃点东西。' },
        { startHour: 18, endHour: 20, activity: NPCActivityType.SOCIALIZING, description: '聊天休息', greeting: '来，坐下聊聊收成。' },
        { startHour: 20, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '早睡早起。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.FARMING, mood: NPCMood.NEUTRAL, reason: '辛勤耕作' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '聊收成开心' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '耕作疲惫' },
      ],
    };
  }

  private static generateTeacherRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早餐', greeting: '早啊，学生来了吗？' },
        { startHour: 7, endHour: 9, activity: NPCActivityType.LEARNING, description: '备课', greeting: '正在备课，稍后上课。' },
        { startHour: 9, endHour: 12, activity: NPCActivityType.WORKING, description: '上午授课', greeting: '同学们，上课了！' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '下课吃饭了。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '午后休息时间。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.WORKING, description: '下午授课', greeting: '继续上课！' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '下课了，吃点东西。' },
        { startHour: 19, endHour: 22, activity: NPCActivityType.WORKING, description: '批改作业', greeting: '正在批改作业，请勿打扰。' },
        { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，该休息了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '认真授课' },
        { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '备课有灵感' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '授课疲惫' },
      ],
    };
  }

  private static generateNobleRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早餐', greeting: '早安，有什么事吗？' },
        { startHour: 8, endHour: 10, activity: NPCActivityType.WORKING, description: '处理事务', greeting: '正在处理公务，稍后再说。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '会客', greeting: '请进，坐吧。' },
        { startHour: 12, endHour: 14, activity: NPCActivityType.EATING, description: '用午餐', greeting: '正好一起用餐。' },
        { startHour: 14, endHour: 16, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '午后时光，请勿打扰。' },
        { startHour: 16, endHour: 18, activity: NPCActivityType.WORKING, description: '处理事务', greeting: '正在处理公务。' },
        { startHour: 18, endHour: 20, activity: NPCActivityType.SOCIALIZING, description: '晚宴', greeting: '来，一起享用晚宴。' },
        { startHour: 20, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '晚间修炼', greeting: '正在修炼，请勿打扰。' },
        { startHour: 22, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，退下吧。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理公务' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '宾客满堂' },
        { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼精进' },
      ],
    };
  }

  private static generateDefaultRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早餐', greeting: '早安！' },
        { startHour: 7, endHour: 12, activity: NPCActivityType.WORKING, description: '上午工作', greeting: '正在忙呢。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午餐', greeting: '吃饭了！' },
        { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '休息时间。' },
        { startHour: 14, endHour: 18, activity: NPCActivityType.WORKING, description: '下午工作', greeting: '忙着呢。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚餐', greeting: '吃点东西吧。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.SOCIALIZING, description: '晚间活动', greeting: '来，聊聊吧。' },
        { startHour: 21, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，晚安。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '认真工作' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与人交流' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '一天忙碌' },
      ],
    };
  }

  private static generateEmperorRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 7, activity: NPCActivityType.MEDITATING, description: '清晨修炼', greeting: '朕正在修炼，稍后再说。' },
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '御膳房准备了丰盛的早餐。' },
        { startHour: 8, endHour: 11, activity: NPCActivityType.WORKING, description: '处理国政', greeting: '朕正在处理国政，文武百官分列两侧。' },
        { startHour: 11, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接见大臣', greeting: '朕正在接见大臣议事。' },
        { startHour: 12, endHour: 14, activity: NPCActivityType.EATING, description: '用午膳', greeting: '御膳房的手艺名不虚传。' },
        { startHour: 14, endHour: 15, activity: NPCActivityType.RESTING, description: '午后小憩', greeting: '朕正在小憩，请勿打扰。' },
        { startHour: 15, endHour: 17, activity: NPCActivityType.CULTIVATING, description: '修炼法则', greeting: '朕正在参悟法则，大殿中威压弥漫。' },
        { startHour: 17, endHour: 19, activity: NPCActivityType.WORKING, description: '批阅奏章', greeting: '朕正在批阅奏章，神色凝重。' },
        { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '朕正在用晚膳。' },
        { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间修炼', greeting: '朕正在夜间修炼。' },
        { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，朕已安寝。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼精进' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理国政' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '接见心腹' },
      ],
    };
  }

  private static generatePrincessRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '本公主正在用早膳。' },
        { startHour: 8, endHour: 10, activity: NPCActivityType.WORKING, description: '学习礼仪', greeting: '正在学习礼仪，真无聊。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.CULTIVATING, description: '修炼武技', greeting: '修炼中，请勿打扰。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '终于可以吃东西了。' },
        { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '午睡', greeting: '正在午睡，别吵。' },
        { startHour: 14, endHour: 17, activity: NPCActivityType.TRAVELING, description: '城中游玩', greeting: '正在城中游玩呢。' },
        { startHour: 17, endHour: 19, activity: NPCActivityType.SOCIALIZING, description: '与人切磋', greeting: '来，陪本公主练练！' },
        { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳时间到了。' },
        { startHour: 20, endHour: 22, activity: NPCActivityType.SOCIALIZING, description: '夜间玩耍', greeting: '精力旺盛，不想睡觉！' },
        { startHour: 22, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，本公主睡了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼有成' },
        { activity: NPCActivityType.TRAVELING, mood: NPCMood.HAPPY, reason: '游玩开心' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.BORED, reason: '学习礼仪枯燥' },
      ],
    };
  }

  private static generateAuctioneerRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，准备拍卖会了。' },
        { startHour: 8, endHour: 10, activity: NPCActivityType.WORKING, description: '准备拍卖', greeting: '正在准备拍卖会，忙得不亦乐乎。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接待贵宾', greeting: '欢迎各位贵宾光临！' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '吃点东西继续忙。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '小憩', greeting: '稍作休息。' },
        { startHour: 15, endHour: 17, activity: NPCActivityType.WORKING, description: '核对拍品', greeting: '正在核对拍品。' },
        { startHour: 17, endHour: 19, activity: NPCActivityType.TRADING, description: '主持拍卖会', greeting: '各位贵宾，拍卖会开始！' },
        { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '拍卖会结束，吃点东西。' },
        { startHour: 20, endHour: 22, activity: NPCActivityType.WORKING, description: '盘点账目', greeting: '正在盘点账目。' },
        { startHour: 22, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，晚安。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.TRADING, mood: NPCMood.HAPPY, reason: '拍卖会火爆' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理事务' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '接待贵宾' },
      ],
    };
  }

  private static generateFortunetellerRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 8, endHour: 12, activity: NPCActivityType.WORKING, description: '摆摊卜卦', greeting: '客官，算一卦如何？' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '稍作休息，吃点东西。' },
        { startHour: 13, endHour: 18, activity: NPCActivityType.WORKING, description: '继续卜卦', greeting: '客官，来算一卦吧。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '收摊了，吃点东西。' },
        { startHour: 19, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间冥想', greeting: '正在冥想，感悟天道。' },
        { startHour: 22, endHour: 8, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，晚安。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '卜卦中' },
        { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '感悟天道' },
      ],
    };
  }

  private static generateScholarRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，读了几本书？' },
        { startHour: 8, endHour: 10, activity: NPCActivityType.LEARNING, description: '研读古籍', greeting: '正在研读古籍，请勿打扰。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与人交流', greeting: '来，一起探讨学问。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '读书累了，吃点东西。' },
        { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '午后小憩。' },
        { startHour: 14, endHour: 16, activity: NPCActivityType.TRAVELING, description: '四处游历', greeting: '正在四处游历。' },
        { startHour: 16, endHour: 18, activity: NPCActivityType.LEARNING, description: '研究风土人情', greeting: '正在研究风土人情。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳了。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.SOCIALIZING, description: '晚间交流', greeting: '来，聊聊学问。' },
        { startHour: 21, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，该休息了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '研读有心得' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '与人交流' },
        { activity: NPCActivityType.TRAVELING, mood: NPCMood.EXCITED, reason: '游历见闻' },
      ],
    };
  }

  private static generateDrunkardRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，喝一杯？' },
        { startHour: 8, endHour: 11, activity: NPCActivityType.SOCIALIZING, description: '与人喝酒', greeting: '来来来，喝一杯！' },
        { startHour: 11, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '边喝边吃，人生快事！' },
        { startHour: 13, endHour: 16, activity: NPCActivityType.SLEEPING, description: '醉酒沉睡', greeting: '醉了，睡一会儿。' },
        { startHour: 16, endHour: 19, activity: NPCActivityType.SOCIALIZING, description: '继续喝酒', greeting: '醒了，再来一杯！' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '离不开酒啊。' },
        { startHour: 21, endHour: 23, activity: NPCActivityType.SOCIALIZING, description: '夜间饮酒', greeting: '夜深了，再喝一杯！' },
        { startHour: 23, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '醉倒了，晚安。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '喝酒开心' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '醉酒沉睡' },
      ],
    };
  }

  private static generateVeteranRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 6, activity: NPCActivityType.MEDITATING, description: '清晨冥想', greeting: '老兵正在冥想。' },
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '简单吃点。' },
        { startHour: 7, endHour: 10, activity: NPCActivityType.GUARDING, description: '守护战场', greeting: '守护战场中。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.WORKING, description: '整理遗物', greeting: '正在整理战友遗物。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '吃点东西。' },
        { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '小憩片刻。' },
        { startHour: 14, endHour: 17, activity: NPCActivityType.GUARDING, description: '继续守护', greeting: '继续守护。' },
        { startHour: 17, endHour: 18, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳。' },
        { startHour: 18, endHour: 20, activity: NPCActivityType.SOCIALIZING, description: '缅怀战友', greeting: '缅怀逝去的战友。' },
        { startHour: 20, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.GUARDING, mood: NPCMood.WORRIED, reason: '守护战场' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.SAD, reason: '缅怀战友' },
        { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '追忆往事' },
      ],
    };
  }

  private static generateTombRobberRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 8, endHour: 10, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，有活干吗？' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.WORKING, description: '探查遗迹', greeting: '正在探查遗迹，小心翼翼。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '吃点干粮。' },
        { startHour: 13, endHour: 16, activity: NPCActivityType.WORKING, description: '破解机关', greeting: '正在破解机关，小心点！' },
        { startHour: 16, endHour: 18, activity: NPCActivityType.WORKING, description: '搜寻宝物', greeting: '正在搜寻宝物。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '收获不错。' },
        { startHour: 19, endHour: 23, activity: NPCActivityType.WORKING, description: '夜间寻宝', greeting: '夜间寻宝，小心行事。' },
        { startHour: 23, endHour: 8, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '太累了，睡了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.EXCITED, reason: '发现宝物' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.WORRIED, reason: '破解机关' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '忙碌一天' },
      ],
    };
  }

  private static generateHerbalistRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 4, endHour: 6, activity: NPCActivityType.FARMING, description: '清晨采药', greeting: '清晨采药好时机！' },
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '吃点东西。' },
        { startHour: 7, endHour: 12, activity: NPCActivityType.FARMING, description: '上午采药', greeting: '正在采药。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '回家吃饭。' },
        { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '小憩片刻。' },
        { startHour: 14, endHour: 18, activity: NPCActivityType.FARMING, description: '下午采药', greeting: '继续采药。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '整理药材', greeting: '正在整理药材。' },
        { startHour: 21, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '早睡早起。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.FARMING, mood: NPCMood.HAPPY, reason: '采到珍稀药材' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '整理药材' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '采药疲惫' },
      ],
    };
  }

  private static generateAlchemistRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 7, activity: NPCActivityType.CRAFTING, description: '准备药材', greeting: '正在准备药材。' },
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '简单吃点。' },
        { startHour: 8, endHour: 12, activity: NPCActivityType.CRAFTING, description: '上午炼丹', greeting: '正在炼丹，请勿打扰。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '吃点东西继续。' },
        { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '小憩恢复精神。' },
        { startHour: 14, endHour: 18, activity: NPCActivityType.CRAFTING, description: '下午炼丹', greeting: '正在炼丹，全神贯注。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳。' },
        { startHour: 19, endHour: 22, activity: NPCActivityType.LEARNING, description: '研究丹方', greeting: '正在研究丹方。' },
        { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '太累了，晚安。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.CRAFTING, mood: NPCMood.EXCITED, reason: '炼丹成功' },
        { activity: NPCActivityType.LEARNING, mood: NPCMood.NEUTRAL, reason: '研究丹方' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '炼丹疲惫' },
      ],
    };
  }

  private static generateSectLeaderRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 4, endHour: 6, activity: NPCActivityType.MEDITATING, description: '清晨冥想', greeting: '本座正在冥想。' },
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '用早膳。' },
        { startHour: 7, endHour: 10, activity: NPCActivityType.WORKING, description: '处理宗务', greeting: '正在处理宗务。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接见长老', greeting: '正在接见长老议事。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '用午膳。' },
        { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '小憩片刻。' },
        { startHour: 14, endHour: 17, activity: NPCActivityType.CULTIVATING, description: '修炼功法', greeting: '正在修炼宗门功法。' },
        { startHour: 17, endHour: 19, activity: NPCActivityType.WORKING, description: '批阅宗卷', greeting: '正在批阅宗卷。' },
        { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳。' },
        { startHour: 20, endHour: 22, activity: NPCActivityType.MEDITATING, description: '夜间冥想', greeting: '正在夜间冥想。' },
        { startHour: 22, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼精进' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理宗务' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '接见长老' },
      ],
    };
  }

  private static generateAssassinRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '夜幕降临，开始行动。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '准备刺杀', greeting: '正在准备刺杀计划。' },
        { startHour: 21, endHour: 24, activity: NPCActivityType.PATROLLING, description: '夜间潜伏', greeting: '正在潜伏，寻找机会。' },
        { startHour: 0, endHour: 4, activity: NPCActivityType.WORKING, description: '执行任务', greeting: '正在执行任务。' },
        { startHour: 4, endHour: 6, activity: NPCActivityType.RESTING, description: '隐匿休息', greeting: '正在隐匿休息。' },
        { startHour: 6, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '任务完成，吃点东西。' },
        { startHour: 8, endHour: 16, activity: NPCActivityType.SLEEPING, description: '白天沉睡', greeting: '正在休息，请勿打扰。' },
        { startHour: 16, endHour: 18, activity: NPCActivityType.LEARNING, description: '研究目标', greeting: '正在研究目标。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.WORRIED, reason: '执行任务' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '夜间行动疲惫' },
        { activity: NPCActivityType.LEARNING, mood: NPCMood.NEUTRAL, reason: '研究目标' },
      ],
    };
  }

  private static generateBeastRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 8, activity: NPCActivityType.EATING, description: '觅食', greeting: '正在觅食。' },
        { startHour: 8, endHour: 10, activity: NPCActivityType.RESTING, description: '休息', greeting: '正在休息。' },
        { startHour: 10, endHour: 14, activity: NPCActivityType.HUNTING, description: '狩猎', greeting: '正在狩猎！' },
        { startHour: 14, endHour: 16, activity: NPCActivityType.EATING, description: '进食', greeting: '正在进食。' },
        { startHour: 16, endHour: 18, activity: NPCActivityType.RESTING, description: '休息', greeting: '正在休息。' },
        { startHour: 18, endHour: 22, activity: NPCActivityType.HUNTING, description: '夜间狩猎', greeting: '夜间狩猎！' },
        { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '正在安睡。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.HUNTING, mood: NPCMood.EXCITED, reason: '狩猎兴奋' },
        { activity: NPCActivityType.EATING, mood: NPCMood.HAPPY, reason: '进食开心' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '狩猎疲惫' },
      ],
    };
  }

  private static generateMerchantLeaderRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，有什么好货？' },
        { startHour: 8, endHour: 10, activity: NPCActivityType.WORKING, description: '处理商务', greeting: '正在处理商会事务。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '接见商人', greeting: '欢迎各位商友！' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '一起用餐。' },
        { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '小憩', greeting: '小憩片刻。' },
        { startHour: 14, endHour: 17, activity: NPCActivityType.TRADING, description: '谈生意', greeting: '正在谈一笔大生意。' },
        { startHour: 17, endHour: 18, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳。' },
        { startHour: 18, endHour: 21, activity: NPCActivityType.WORKING, description: '盘点资产', greeting: '正在盘点资产。' },
        { startHour: 21, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.TRADING, mood: NPCMood.HAPPY, reason: '生意成功' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理商务' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '接见商友' },
      ],
    };
  }

  private static generatePatrolLeaderRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 6, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，准备巡逻。' },
        { startHour: 6, endHour: 8, activity: NPCActivityType.WORKING, description: '集结队伍', greeting: '正在集结队伍。' },
        { startHour: 8, endHour: 12, activity: NPCActivityType.PATROLLING, description: '上午巡逻', greeting: '正在巡逻！' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '吃点东西继续。' },
        { startHour: 13, endHour: 17, activity: NPCActivityType.PATROLLING, description: '下午巡逻', greeting: '继续巡逻！' },
        { startHour: 17, endHour: 18, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳。' },
        { startHour: 18, endHour: 20, activity: NPCActivityType.WORKING, description: '汇报情况', greeting: '正在汇报巡逻情况。' },
        { startHour: 20, endHour: 22, activity: NPCActivityType.CULTIVATING, description: '修炼战技', greeting: '正在修炼战技。' },
        { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.PATROLLING, mood: NPCMood.WORRIED, reason: '警惕外敌' },
        { activity: NPCActivityType.CULTIVATING, mood: NPCMood.EXCITED, reason: '修炼精进' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '处理军务' },
      ],
    };
  }

  private static generateMusicianRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，今天要练新曲子。' },
        { startHour: 7, endHour: 10, activity: NPCActivityType.CRAFTING, description: '练习乐器', greeting: '正在练习乐器，请勿打扰。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.LEARNING, description: '研究乐谱', greeting: '正在研究新乐谱。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '吃点东西再继续。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '小憩片刻。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.WORKING, description: '演奏', greeting: '正在演奏，欢迎欣赏。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '演出结束，吃点东西。' },
        { startHour: 19, endHour: 22, activity: NPCActivityType.SOCIALIZING, description: '夜间表演', greeting: '夜间表演，客官来点一曲？' },
        { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，该休息了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.CRAFTING, mood: NPCMood.EXCITED, reason: '练习新曲' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.HAPPY, reason: '演奏顺利' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '演出疲惫' },
      ],
    };
  }

  private static generateDancerRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，今天要练新舞。' },
        { startHour: 7, endHour: 10, activity: NPCActivityType.WORKING, description: '练舞', greeting: '正在练舞，请勿打扰。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.CRAFTING, description: '缝制舞衣', greeting: '正在缝制新舞衣。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '吃点东西再继续。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '小憩片刻，养足精神。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.LEARNING, description: '学习新舞', greeting: '正在学习新舞蹈。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳，晚上还要表演。' },
        { startHour: 19, endHour: 22, activity: NPCActivityType.WORKING, description: '跳舞表演', greeting: '正在跳舞表演，欢迎观赏。' },
        { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，休息了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.HAPPY, reason: '跳舞开心' },
        { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '学新舞' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '练舞疲惫' },
      ],
    };
  }

  private static generateTailorRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，要做新衣服吗？' },
        { startHour: 7, endHour: 12, activity: NPCActivityType.CRAFTING, description: '缝制衣服', greeting: '正在缝制衣服，稍等片刻。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '歇会儿，吃点东西。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午后休息', greeting: '午后小憩。' },
        { startHour: 15, endHour: 19, activity: NPCActivityType.CRAFTING, description: '继续缝制', greeting: '正在赶制衣服。' },
        { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '收工了，吃点东西。' },
        { startHour: 20, endHour: 22, activity: NPCActivityType.WORKING, description: '整理布料', greeting: '正在整理布料。' },
        { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，明天再来。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.CRAFTING, mood: NPCMood.HAPPY, reason: '做出好衣服' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '认真工作' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '缝纫疲惫' },
      ],
    };
  }

  private static generateFishermanRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 4, endHour: 5, activity: NPCActivityType.EATING, description: '用早膳', greeting: '天没亮就得出船了。' },
        { startHour: 5, endHour: 10, activity: NPCActivityType.HUNTING, description: '捕鱼', greeting: '正在江上捕鱼。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.TRADING, description: '卖鱼', greeting: '新鲜的鱼，来看看！' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '在岸边吃点干粮。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '休息', greeting: '歇会儿，下午再出去。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.HUNTING, description: '继续捕鱼', greeting: '正在撒网捕鱼。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '今天收成不错！' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '修补渔网', greeting: '正在修补渔网。' },
        { startHour: 21, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '累了一天，睡了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.HUNTING, mood: NPCMood.HAPPY, reason: '鱼获丰富' },
        { activity: NPCActivityType.TRADING, mood: NPCMood.HAPPY, reason: '卖了好价钱' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '打鱼疲惫' },
      ],
    };
  }

  private static generateWoodcutterRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 6, activity: NPCActivityType.EATING, description: '用早膳', greeting: '吃饱了好上山砍柴。' },
        { startHour: 6, endHour: 11, activity: NPCActivityType.FARMING, description: '砍柴', greeting: '正在山上砍柴。' },
        { startHour: 11, endHour: 12, activity: NPCActivityType.TRADING, description: '卖柴', greeting: '干柴，要不要来点？' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '吃点东西歇会儿。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '休息', greeting: '午后歇歇。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.FARMING, description: '继续砍柴', greeting: '趁着天还亮，再砍点柴。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '收工了，吃晚饭。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '整理柴火', greeting: '正在整理柴火。' },
        { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '累了，睡了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.FARMING, mood: NPCMood.NEUTRAL, reason: '辛勤砍柴' },
        { activity: NPCActivityType.TRADING, mood: NPCMood.HAPPY, reason: '卖了好价钱' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '砍柴疲惫' },
      ],
    };
  }

  private static generateMinerRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 6, activity: NPCActivityType.EATING, description: '用早膳', greeting: '吃饱了好下矿。' },
        { startHour: 6, endHour: 12, activity: NPCActivityType.FARMING, description: '采矿', greeting: '正在矿井里采矿。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '在矿洞口吃点东西。' },
        { startHour: 13, endHour: 14, activity: NPCActivityType.RESTING, description: '休息', greeting: '歇会儿，喘口气。' },
        { startHour: 14, endHour: 18, activity: NPCActivityType.FARMING, description: '继续采矿', greeting: '正在挖矿，找着好东西了！' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.TRADING, description: '卖矿石', greeting: '新鲜矿石，看看！' },
        { startHour: 19, endHour: 20, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '今天挖了不少。' },
        { startHour: 20, endHour: 22, activity: NPCActivityType.WORKING, description: '整理工具', greeting: '正在整理采矿工具。' },
        { startHour: 22, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '太累了，睡了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.FARMING, mood: NPCMood.EXCITED, reason: '发现矿脉' },
        { activity: NPCActivityType.TRADING, mood: NPCMood.HAPPY, reason: '卖了好价钱' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '采矿疲惫' },
      ],
    };
  }

  private static generateMessengerRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 6, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，今天要送很多信。' },
        { startHour: 6, endHour: 12, activity: NPCActivityType.TRAVELING, description: '送信', greeting: '正在送信，赶时间！' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '路边吃点东西。' },
        { startHour: 13, endHour: 18, activity: NPCActivityType.TRAVELING, description: '继续送信', greeting: '还有好多信要送。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '今天的信终于送完了。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '整理信件', greeting: '正在整理明天要送的信。' },
        { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '跑了一天，累坏了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.TRAVELING, mood: NPCMood.WORRIED, reason: '怕耽误时间' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '整理信件' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '奔波一天' },
      ],
    };
  }

  private static generateBeggarRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 8, endHour: 9, activity: NPCActivityType.EATING, description: '乞讨早餐', greeting: '行行好，给口吃的吧。' },
        { startHour: 9, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '乞讨', greeting: '大爷大娘，赏点吧。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '乞讨午餐', greeting: '好心人，给点吃的吧。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '晒太阳', greeting: '正在墙角晒太阳。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.SOCIALIZING, description: '继续乞讨', greeting: '可怜可怜吧。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '乞讨晚餐', greeting: '一天没吃饭了。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.SOCIALIZING, description: '夜间乞讨', greeting: '好心人，赏点吧。' },
        { startHour: 21, endHour: 8, activity: NPCActivityType.SLEEPING, description: '露宿街头', greeting: '正在街角睡觉。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.EATING, mood: NPCMood.HAPPY, reason: '讨到吃的' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.SAD, reason: '乞讨艰难' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '一天奔波' },
      ],
    };
  }

  private static generateGardenerRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 6, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，花园里逛逛？' },
        { startHour: 6, endHour: 10, activity: NPCActivityType.FARMING, description: '浇花', greeting: '正在给花儿浇水。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.CRAFTING, description: '修剪花枝', greeting: '正在修剪花枝。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '歇会儿，吃点东西。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '休息', greeting: '在树荫下歇会儿。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.FARMING, description: '培育花卉', greeting: '正在培育新品种。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '今天花儿开得真好。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.LEARNING, description: '研究花艺', greeting: '正在研究花艺。' },
        { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，花儿也睡了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.FARMING, mood: NPCMood.HAPPY, reason: '花儿盛开' },
        { activity: NPCActivityType.CRAFTING, mood: NPCMood.NEUTRAL, reason: '修剪花枝' },
        { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '研究新品种' },
      ],
    };
  }

  private static generatePrisonGuardRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，来探监吗？' },
        { startHour: 7, endHour: 12, activity: NPCActivityType.GUARDING, description: '看守牢房', greeting: '正在看守牢房。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '换班吃饭。' },
        { startHour: 13, endHour: 18, activity: NPCActivityType.GUARDING, description: '继续看守', greeting: '老实点！' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '吃晚饭了。' },
        { startHour: 19, endHour: 24, activity: NPCActivityType.PATROLLING, description: '夜间巡逻', greeting: '夜间巡逻，都老实点！' },
        { startHour: 0, endHour: 6, activity: NPCActivityType.SLEEPING, description: '休息', greeting: '值完夜班，睡会儿。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.GUARDING, mood: NPCMood.ANGRY, reason: '囚犯闹事' },
        { activity: NPCActivityType.PATROLLING, mood: NPCMood.WORRIED, reason: '警惕越狱' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '值夜班疲惫' },
      ],
    };
  }

  private static generateCoronerRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，有案子吗？' },
        { startHour: 8, endHour: 12, activity: NPCActivityType.WORKING, description: '验尸', greeting: '正在验尸，请勿打扰。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '吃点东西，有点反胃。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '休息', greeting: '歇会儿，平复一下心情。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.LEARNING, description: '研究医书', greeting: '正在研读验尸之术。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '整理案卷', greeting: '正在整理验尸案卷。' },
        { startHour: 21, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '希望今晚别做噩梦。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.NEUTRAL, reason: '认真验尸' },
        { activity: NPCActivityType.LEARNING, mood: NPCMood.EXCITED, reason: '有新发现' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.SAD, reason: '见多了死亡' },
      ],
    };
  }

  private static generateMonkRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 4, endHour: 5, activity: NPCActivityType.MEDITATING, description: '早课', greeting: '阿弥陀佛，正在做早课。' },
        { startHour: 5, endHour: 6, activity: NPCActivityType.EATING, description: '用早斋', greeting: '施主，用点素斋吧。' },
        { startHour: 6, endHour: 10, activity: NPCActivityType.WORKING, description: '打扫寺院', greeting: '正在打扫寺院。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.MEDITATING, description: '打坐参禅', greeting: '正在打坐参禅。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午斋', greeting: '过午不食，请施主见谅。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '午休', greeting: '正在午休。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.LEARNING, description: '诵读佛经', greeting: '正在诵读佛经。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚斋', greeting: '用点晚斋吧。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.SOCIALIZING, description: '讲经说法', greeting: '施主，听贫僧讲一段经？' },
        { startHour: 21, endHour: 4, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，施主请回吧。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '参禅悟道' },
        { activity: NPCActivityType.LEARNING, mood: NPCMood.HAPPY, reason: '诵读佛经' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '讲经说法' },
      ],
    };
  }

  private static generateWitchRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 8, endHour: 9, activity: NPCActivityType.EATING, description: '用早膳', greeting: '啊哈，又有人来找我了？' },
        { startHour: 9, endHour: 12, activity: NPCActivityType.CRAFTING, description: '炼制蛊虫', greeting: '正在炼制蛊虫，小心点！' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '吃点东西继续练。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '休息', greeting: '歇会儿。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.WORKING, description: '占卜算命', greeting: '想知道未来？来找我就对了！' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳。' },
        { startHour: 19, endHour: 23, activity: NPCActivityType.MEDITATING, description: '夜间修炼', greeting: '月黑风高，正是修炼好时候！' },
        { startHour: 23, endHour: 8, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，明天再来。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.CRAFTING, mood: NPCMood.EXCITED, reason: '炼出好蛊' },
        { activity: NPCActivityType.WORKING, mood: NPCMood.HAPPY, reason: '占卜有得' },
        { activity: NPCActivityType.MEDITATING, mood: NPCMood.NEUTRAL, reason: '修炼巫术' },
      ],
    };
  }

  private static generateChessPlayerRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，来一盘？' },
        { startHour: 8, endHour: 12, activity: NPCActivityType.SOCIALIZING, description: '与人对弈', greeting: '正在下棋，稍等片刻。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '这盘下完就吃饭。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '休息', greeting: '歇会儿，下一盘再战。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.LEARNING, description: '研究棋谱', greeting: '正在研究古棋谱。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳，晚上继续研究。' },
        { startHour: 19, endHour: 22, activity: NPCActivityType.SOCIALIZING, description: '夜间对弈', greeting: '挑灯夜战，来一盘！' },
        { startHour: 22, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，明天再下。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.EXCITED, reason: '棋逢对手' },
        { activity: NPCActivityType.LEARNING, mood: NPCMood.HAPPY, reason: '棋艺精进' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '下棋太累' },
      ],
    };
  }

  private static generateServantRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 5, endHour: 6, activity: NPCActivityType.WORKING, description: '打扫房间', greeting: '正在打扫房间。' },
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '吃点东西，还有好多活要干。' },
        { startHour: 7, endHour: 10, activity: NPCActivityType.WORKING, description: '伺候主人', greeting: '正在伺候主人。' },
        { startHour: 10, endHour: 12, activity: NPCActivityType.WORKING, description: '洗衣做饭', greeting: '正在洗衣服。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '匆匆吃点东西。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '休息', greeting: '趁这会儿歇会儿。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.WORKING, description: '采购物品', greeting: '正在街上采购。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '忙了一天，终于能吃饭了。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.WORKING, description: '伺候晚饭', greeting: '正在伺候主人用晚饭。' },
        { startHour: 21, endHour: 5, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '累了一天，终于能睡了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.TIRED, reason: '干活太累' },
        { activity: NPCActivityType.EATING, mood: NPCMood.HAPPY, reason: '吃饭休息' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '劳碌一天' },
      ],
    };
  }

  private static generatePainterRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，今天要画幅新画。' },
        { startHour: 7, endHour: 12, activity: NPCActivityType.CRAFTING, description: '作画', greeting: '正在作画，请勿打扰。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '歇会儿，吃点东西。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '休息', greeting: '午后小憩，找找灵感。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.TRAVELING, description: '写生', greeting: '正在户外写生。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '今天画得不错！' },
        { startHour: 19, endHour: 22, activity: NPCActivityType.LEARNING, description: '研究画技', greeting: '正在研究前人画作。' },
        { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，明天继续画。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.CRAFTING, mood: NPCMood.EXCITED, reason: '画出佳作' },
        { activity: NPCActivityType.TRAVELING, mood: NPCMood.HAPPY, reason: '写生有灵感' },
        { activity: NPCActivityType.LEARNING, mood: NPCMood.NEUTRAL, reason: '研究画技' },
      ],
    };
  }

  private static generatePoetRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 7, endHour: 8, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，今日可有好诗？' },
        { startHour: 8, endHour: 11, activity: NPCActivityType.LEARNING, description: '研读诗书', greeting: '正在研读前人诗作。' },
        { startHour: 11, endHour: 12, activity: NPCActivityType.CRAFTING, description: '作诗', greeting: '正在酝酿诗句。' },
        { startHour: 12, endHour: 13, activity: NPCActivityType.EATING, description: '用午膳', greeting: '诗兴大发，边吃边想。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '休息', greeting: '歇会儿，找找灵感。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.TRAVELING, description: '游山玩水', greeting: '正在游山玩水，寻找灵感。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '今日得一佳句！' },
        { startHour: 19, endHour: 22, activity: NPCActivityType.SOCIALIZING, description: '吟诗作对', greeting: '来来来，今日我们吟诗作对！' },
        { startHour: 22, endHour: 7, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，梦里续诗。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.CRAFTING, mood: NPCMood.EXCITED, reason: '得一佳句' },
        { activity: NPCActivityType.TRAVELING, mood: NPCMood.HAPPY, reason: '游山玩水' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.HAPPY, reason: '以诗会友' },
      ],
    };
  }

  private static generateThiefRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 10, endHour: 11, activity: NPCActivityType.EATING, description: '用午膳', greeting: '刚起，吃点东西。' },
        { startHour: 11, endHour: 14, activity: NPCActivityType.RESTING, description: '休息', greeting: '白天睡觉，晚上干活。' },
        { startHour: 14, endHour: 17, activity: NPCActivityType.SOCIALIZING, description: '打探消息', greeting: '正在街上打探消息。' },
        { startHour: 17, endHour: 18, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '吃饱了好干活。' },
        { startHour: 18, endHour: 20, activity: NPCActivityType.PATROLLING, description: '踩点', greeting: '正在踩点，观察地形。' },
        { startHour: 20, endHour: 24, activity: NPCActivityType.WORKING, description: '行窃', greeting: '正在行窃，小声点！' },
        { startHour: 0, endHour: 4, activity: NPCActivityType.WORKING, description: '继续行窃', greeting: '夜深人静，正是好时候。' },
        { startHour: 4, endHour: 10, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '干完活了，好好睡一觉。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.WORRIED, reason: '怕被发现' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.NEUTRAL, reason: '打探消息' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '夜间劳作' },
      ],
    };
  }

  private static generateSpyRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '早啊，今天天气不错。' },
        { startHour: 7, endHour: 11, activity: NPCActivityType.SOCIALIZING, description: '打探情报', greeting: '正在与人闲聊，实则打探。' },
        { startHour: 11, endHour: 13, activity: NPCActivityType.WORKING, description: '整理情报', greeting: '正在整理搜集到的情报。' },
        { startHour: 13, endHour: 15, activity: NPCActivityType.RESTING, description: '休息', greeting: '歇会儿。' },
        { startHour: 15, endHour: 18, activity: NPCActivityType.TRAVELING, description: '传递情报', greeting: '正在传递情报，请勿打扰。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '用晚膳。' },
        { startHour: 19, endHour: 22, activity: NPCActivityType.PATROLLING, description: '夜间监视', greeting: '正在监视目标。' },
        { startHour: 22, endHour: 6, activity: NPCActivityType.SLEEPING, description: '安睡', greeting: '夜深了，休息了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.WORKING, mood: NPCMood.WORRIED, reason: '怕身份暴露' },
        { activity: NPCActivityType.SOCIALIZING, mood: NPCMood.NEUTRAL, reason: '伪装自己' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.TIRED, reason: '一天忙碌' },
      ],
    };
  }

  private static generateNightWatchRoutine(roomId: string): INPCDailyRoutine {
    return {
      schedule: [
        { startHour: 6, endHour: 7, activity: NPCActivityType.EATING, description: '用早膳', greeting: '刚打完更，吃点东西。' },
        { startHour: 7, endHour: 18, activity: NPCActivityType.SLEEPING, description: '白天睡觉', greeting: '白天睡觉，晚上还要打更。' },
        { startHour: 18, endHour: 19, activity: NPCActivityType.EATING, description: '用晚膳', greeting: '吃饱了好打更。' },
        { startHour: 19, endHour: 21, activity: NPCActivityType.RESTING, description: '准备打更工具', greeting: '正在准备打更工具。' },
        { startHour: 21, endHour: 23, activity: NPCActivityType.NIGHT_WATCH, description: '打初更', greeting: '天干物燥，小心火烛！' },
        { startHour: 23, endHour: 1, activity: NPCActivityType.NIGHT_WATCH, description: '打二更', greeting: '关好门窗，防盗防贼！' },
        { startHour: 1, endHour: 3, activity: NPCActivityType.NIGHT_WATCH, description: '打三更', greeting: '三更半夜，注意安全！' },
        { startHour: 3, endHour: 5, activity: NPCActivityType.NIGHT_WATCH, description: '打四更', greeting: '四更天了，快亮了。' },
        { startHour: 5, endHour: 6, activity: NPCActivityType.NIGHT_WATCH, description: '打五更', greeting: '五更天了，该起床了。' },
      ],
      moodChanges: [
        { activity: NPCActivityType.NIGHT_WATCH, mood: NPCMood.TIRED, reason: '夜间打更辛苦' },
        { activity: NPCActivityType.SLEEPING, mood: NPCMood.NEUTRAL, reason: '补觉中' },
      ],
    };
  }

  static detectNPCType(title: string): string {
    const typeKeywords: Record<string, string> = {
      '皇': 'emperor',
      '帝': 'emperor',
      '王': 'emperor',
      '公主': 'princess',
      '郡主': 'princess',
      '宗主': 'sectleader',
      '掌门': 'sectleader',
      '长老': 'elder',
      '守卫': 'guard',
      '护卫': 'guard',
      '巡防': 'patrolleader',
      '统领': 'patrolleader',
      '商人': 'merchant',
      '小贩': 'merchant',
      '商会': 'merchantleader',
      '会长': 'merchantleader',
      '拍卖师': 'auctioneer',
      '修士': 'cultivator',
      '弟子': 'cultivator',
      '掌柜': 'innkeeper',
      '厨师': 'chef',
      '医师': 'doctor',
      '炼药师': 'doctor',
      '丹师': 'alchemist',
      '炼丹': 'alchemist',
      '铁匠': 'blacksmith',
      '村民': 'villager',
      '百姓': 'villager',
      '猎人': 'hunter',
      '农夫': 'farmer',
      '药农': 'herbalist',
      '采药': 'herbalist',
      '夫子': 'teacher',
      '先生': 'teacher',
      '书生': 'scholar',
      '文人': 'scholar',
      '算命': 'fortuneteller',
      '卜卦': 'fortuneteller',
      '官员': 'noble',
      '贵族': 'noble',
      '酒鬼': 'drunkard',
      '酒徒': 'drunkard',
      '老兵': 'veteran',
      '老卒': 'veteran',
      '刺客': 'assassin',
      '杀手': 'assassin',
      '盗墓': 'tombrobber',
      '摸金': 'tombrobber',
      '灵兽': 'beast',
      '妖兽': 'beast',
      '乐师': 'musician',
      '琴师': 'musician',
      '乐伎': 'musician',
      '舞姬': 'dancer',
      '舞女': 'dancer',
      '裁缝': 'tailor',
      '绣娘': 'tailor',
      '渔夫': 'fisherman',
      '渔翁': 'fisherman',
      '樵夫': 'woodcutter',
      '伐木工': 'woodcutter',
      '矿工': 'miner',
      '采矿': 'miner',
      '信使': 'messenger',
      '镖师': 'messenger',
      '押运': 'messenger',
      '乞丐': 'beggar',
      '流浪汉': 'beggar',
      '花匠': 'gardener',
      '园丁': 'gardener',
      '狱卒': 'prisoner',
      '看守': 'prisoner',
      '仵作': 'coroner',
      '验尸': 'coroner',
      '和尚': 'monk',
      '僧侣': 'monk',
      '僧人': 'monk',
      '巫师': 'witch',
      '巫婆': 'witch',
      '棋手': 'chessplayer',
      '棋师': 'chessplayer',
      '仆人': 'servant',
      '丫鬟': 'servant',
      '侍女': 'servant',
      '画家': 'painter',
      '画师': 'painter',
      '诗人': 'poet',
      '词客': 'poet',
      '小偷': 'thief',
      '窃贼': 'thief',
      '探子': 'spy',
      '密探': 'spy',
      '更夫': 'nightwatch',
      '打更': 'nightwatch',
      '稳婆': 'midwife',
      '接生婆': 'midwife',
      '说书': 'storyteller',
      '说书先生': 'storyteller',
      '杂耍': 'acrobat',
      '卖艺': 'acrobat',
      '酿酒': 'brewer',
      '酒坊': 'brewer',
      '糕饼': 'baker',
      '点心': 'baker',
      '染坊': 'dyer',
      '染工': 'dyer',
      '轿夫': 'carrier',
      '脚夫': 'carrier',
      '木匠': 'carpenter',
      '木工': 'carpenter',
      '陶工': 'potter',
      '制陶': 'potter',
      '雕刻': 'sculptor',
      '石匠': 'sculptor',
      '洗衣': 'laundry',
      '浣衣': 'laundry',
      '马夫': 'stablehand',
      '喂马': 'stablehand',
      '水手': 'sailor',
      '船夫': 'sailor',
      '邮差': 'postman',
      '驿卒': 'postman',
      '鞋匠': 'cobbler',
      '补鞋': 'cobbler',
      '剃头': 'barber',
      '理发师': 'barber',
      '搬运': 'porter',
      '挑夫': 'porter',
      '戏子': 'actor',
      '伶人': 'actor',
      '赌徒': 'gambler',
      '赌鬼': 'gambler',
      '傻子': 'idiot',
      '痴儿': 'idiot',
      '寡妇': 'widow',
      '孤孀': 'widow',
      '孤儿': 'orphan',
      '弃婴': 'orphan',
      '退休': 'retired',
      '告老': 'retired',
    };

    for (const [keyword, type] of Object.entries(typeKeywords)) {
      if (title.includes(keyword)) {
        return type;
      }
    }

    return 'default';
  }
}
