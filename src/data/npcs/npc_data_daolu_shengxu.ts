import { IDaoLu, DaoLuFactionType, DUAL_CULTIVATION_POSE_TEMPLATES, DAO_LU_INTERACTION_TEMPLATES } from '../../domain/entities/DaoLu';
import { INPCDialogue } from '../../domain/entities/NPC';

const shengxuDialogues: INPCDialogue[] = [
  {
    id: 'daolu_greeting',
    topic: '问候',
    text: '你来了...今日的风，似乎带着星空的凉意。',
  },
  {
    id: 'daolu_cultivation',
    topic: '修炼心得',
    text: '阴阳调和，水火既济，方是大道。你可愿与我共参？',
  },
  {
    id: 'daolu_story',
    topic: '过往经历',
    text: '往事如烟，但那片星空下的记忆，我始终无法忘怀。',
  },
];

export const SHENGXU_DAOLU: IDaoLu[] = [
  {
    id: 'daolu_shengxu_yaoyao',
    name: '妖妖',
    title: '星空下第一',
    description: '阳间第一美人，妖族绝世天骄，风采绝世，曾号称星空下第一。',
    greeting: '你是...来自那片星空的人吗？',
    dialogues: [
      ...shengxuDialogues,
      {
        id: 'yaoyao_star',
        topic: '星空记忆',
        text: '那片星空很美，可惜再也回不去了...',
      },
      {
        id: 'yaoyao_demon',
        topic: '妖族祖地',
        text: '妖族祖地深处，藏着我们一族最古老的秘密。',
      },
    ],
    roomId: 'room_shengxu_yaoyao_pavilion',
    faction: {
      name: '妖族祖地',
      type: DaoLuFactionType.MONSTER,
      description: '阳间妖族正统传承之地，血脉古老，底蕴深厚，曾出过数位震动阳间的大妖。',
      power: '阳间顶级',
      location: '阳间妖族祖地·万妖山',
      leader: '妖祖',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'yaoyao_story_1',
        title: '星空遗梦',
        requiredIntimacy: 20,
        description: '妖妖在月下独坐，望着星空发呆。',
        choices: [
          {
            text: '陪她一起看星空',
            effect: () => ({
              messages: ['你静静地坐在她身旁，两人无言地仰望星空。半晌，她轻声道："谢谢你。"'],
              intimacyChange: 10,
            }),
          },
          {
            text: '询问她的往事',
            effect: () => ({
              messages: ['她微微一怔，摇头道："往事不堪回首，待时机成熟，我自会告诉你。"'],
              intimacyChange: 5,
            }),
          },
        ],
      },
      {
        id: 'yaoyao_story_2',
        title: '妖族试炼',
        requiredIntimacy: 100,
        description: '妖族祖地开启试炼，妖妖面临生死危机。',
        choices: [
          {
            text: '闯入试炼之地相救',
            effect: () => ({
              messages: ['你冒着被妖族通缉的风险闯入试炼之地，将她从生死边缘救回。她看着你，眼中有泪光闪动："你为何...要如此待我？"'],
              intimacyChange: 20,
              reward: '妖族圣血丹',
            }),
          },
          {
            text: '在外面默默守候',
            effect: () => ({
              messages: ['你在试炼之地外守候三天三夜，当她满身伤痕地走出时，第一个看到的就是你。'],
              intimacyChange: 15,
            }),
          },
        ],
      },
      {
        id: 'yaoyao_story_3',
        title: '星空下的誓言',
        requiredIntimacy: 500,
        description: '月圆之夜，妖妖终于向你敞开心扉。',
        choices: [
          {
            text: '许下星空誓言',
            effect: () => ({
              messages: ['你们在星空下立下誓言，无论轮回几度，都要找到彼此。妖妖泪如雨下，却笑得比星辰还灿烂。'],
              intimacyChange: 50,
              reward: '星空道侣契',
            }),
          },
        ],
      },
    ],
    dualCultivationPoses: DUAL_CULTIVATION_POSE_TEMPLATES,
    interactions: DAO_LU_INTERACTION_TEMPLATES,
    intimacyLabels: {
      0: '素不相识',
      20: '初识好感',
      50: '相识相知',
      100: '亲密无间',
      200: '心有灵犀',
      500: '结为道侣',
    },
    firstMeeting: '你在一片废墟中发现了昏迷的她。她醒来时，那双如星辰般的眼眸定定地看着你，仿佛要看穿你的灵魂。',
    backgroundStory: '妖妖出身妖族祖地，血脉尊贵，天赋绝世。曾被誉为"星空下第一"，在阳间拥有无数追随者。然而一场大变让她失去了一切，只能在世间漂泊。她性格外冷内热，表面高傲不可一世，实则内心脆弱，渴望有人能真正理解她。她一直在寻找那片记忆中的星空，寻找回家的路。',
    personalityTraits: ['高傲', '外冷内热', '执着', '重情重义', '口是心非'],
    likes: ['星空', '妖族圣物', '古老传说', '月夜独舞', '真心之人'],
    dislikes: ['虚伪', '背叛', '提及往事', '被当作花瓶', '阳间大教的伪君子'],
    favoriteGifts: ['星辰碎片', '妖族圣血', '古老星图', '月光石', '万妖果'],
  },
  {
    id: 'daolu_shengxu_linnuoyi',
    name: '林诺依',
    title: '星空女神',
    description: '天神集团神女，星空下最耀眼的存在之一，气质清冷如月。',
    greeting: '你来了。今日...可有空陪我走走？',
    dialogues: [
      ...shengxuDialogues,
      {
        id: 'linnuoyi_tianshen',
        topic: '天神集团',
        text: '天神集团...不过是史前遗留下来的一个名字罢了。',
      },
      {
        id: 'linnuoyi_stars',
        topic: '星空深处',
        text: '星空深处有许多秘密，有些...还是不要知道为好。',
      },
    ],
    roomId: 'room_shengxu_linnuoyi_tower',
    faction: {
      name: '天神集团',
      type: DaoLuFactionType.DYNASTY,
      description: '史前阳间超级进化势力，底蕴深不可测，掌控着星空深处的诸多秘密。',
      power: '阳间顶级',
      location: '星空深处·天神主星',
      leader: '天神',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'linnuoyi_story_1',
        title: '天神之谜',
        requiredIntimacy: 20,
        description: '林诺依独自在天神塔顶修炼，眉头紧锁。',
        choices: [
          {
            text: '为她护法',
            effect: () => ({
              messages: ['你在塔下静坐护法，一夜无言。次日她下来时，轻声说了句"谢谢"。'],
              intimacyChange: 10,
            }),
          },
          {
            text: '送上清心丹',
            effect: () => ({
              messages: ['她接过丹药，微微点头："你有心了。"'],
              intimacyChange: 8,
              reward: '天神集团好感度',
            }),
          },
        ],
      },
      {
        id: 'linnuoyi_story_2',
        title: '星空遗族',
        requiredIntimacy: 100,
        description: '林诺依发现自己是史前星空遗族的后裔，陷入迷茫。',
        choices: [
          {
            text: '告诉她无论她是谁都会陪着她',
            effect: () => ({
              messages: ['她听完你的话，清冷的面容终于露出一丝笑容："你...真是个怪人。"'],
              intimacyChange: 20,
            }),
          },
          {
            text: '帮她寻找身世真相',
            effect: () => ({
              messages: ['你们一起深入天神集团禁地，找到了她身世的真相。她看着古老的记载，泪如雨下。'],
              intimacyChange: 25,
              reward: '星空遗族秘典',
            }),
          },
        ],
      },
      {
        id: 'linnuoyi_story_3',
        title: '女神之泪',
        requiredIntimacy: 500,
        description: '天神集团遭遇大劫，林诺依面临抉择。',
        choices: [
          {
            text: '与她共同面对',
            effect: () => ({
              messages: ['你站在她身边，与她共同对抗来犯之敌。战后，她第一次在你面前落泪："你为什么...总是这样..."'],
              intimacyChange: 50,
              reward: '天神之心',
            }),
          },
        ],
      },
    ],
    dualCultivationPoses: DUAL_CULTIVATION_POSE_TEMPLATES,
    interactions: DAO_LU_INTERACTION_TEMPLATES,
    intimacyLabels: {
      0: '素不相识',
      20: '初识好感',
      50: '相识相知',
      100: '亲密无间',
      200: '心有灵犀',
      500: '结为道侣',
    },
    firstMeeting: '你在天神集团的外围遇到了她。她一袭白衣，清冷如月，只是淡淡地看了你一眼，却让你铭记终生。',
    backgroundStory: '林诺依是天神集团培养的神女，天赋卓绝，气质清冷。她自幼在天神主星长大，接受最严格的训练，被灌输守护天神集团的使命。然而随着修为提升，她逐渐发现天神集团背后隐藏的黑暗秘密，以及自己身世的真相——她是史前星空遗族的后裔，被天神集团收养利用。她内心挣扎，渴望自由，却身不由己。',
    personalityTraits: ['清冷', '聪慧', '隐忍', '外柔内刚', '重情义'],
    likes: ['星空', '清静之地', '古老典籍', '灵茶', '真心相待'],
    dislikes: ['虚伪', '被利用', '嘈杂', '阳间大教的勾心斗角', '背叛'],
    favoriteGifts: ['星辰精魄', '天神玉', '古老星图', '清心茶叶', '月光石'],
  },
  {
    id: 'daolu_shengxu_qinluoyin',
    name: '秦珞音',
    title: '史前阳间第一丽人',
    description: '史前阳间第一丽人，风华绝代，曾是一代传说。',
    greeting: '岁月流转，没想到还能见到你这样的人...',
    dialogues: [
      ...shengxuDialogues,
      {
        id: 'qinluoyin_past',
        topic: '史前岁月',
        text: '史前的事...提它作甚。如今的我，不过是个过客。',
      },
      {
        id: 'qinluoyin_beauty',
        topic: '第一丽人',
        text: '容颜易老，芳华易逝，唯有大道永恒。',
      },
    ],
    roomId: 'room_shengxu_qinluoyin_garden',
    faction: {
      name: '史前阳间道统',
      type: DaoLuFactionType.DAOIST,
      description: '史前阳间传承下来的古老道统，曾盛极一时，如今只剩零星传承。',
      power: '史前顶级',
      location: '阳间·古遗迹',
    },
    status: '隐居',
    storyNodes: [
      {
        id: 'qinluoyin_story_1',
        title: '古遗迹相逢',
        requiredIntimacy: 20,
        description: '你在古遗迹中遇到了隐居的秦珞音。',
        choices: [
          {
            text: '表达敬仰之情',
            effect: () => ({
              messages: ['她淡淡一笑："那都是过去的事了，如今的我，只是个普通修士。"'],
              intimacyChange: 10,
            }),
          },
          {
            text: '请教修炼之道',
            effect: () => ({
              messages: ['她见你诚恳，便指点了几句。你茅塞顿开，感激不已。'],
              intimacyChange: 15,
              reward: '史前修炼心得',
            }),
          },
        ],
      },
      {
        id: 'qinluoyin_story_2',
        title: '往昔重现',
        requiredIntimacy: 100,
        description: '秦珞音旧伤复发，陷入回忆中。',
        choices: [
          {
            text: '为她寻药疗伤',
            effect: () => ({
              messages: ['你冒着生命危险进入禁地，为她寻来疗伤的圣药。她醒来时，看着你满是伤痕的手，沉默良久。'],
              intimacyChange: 25,
              reward: '史前圣药',
            }),
          },
          {
            text: '陪她度过难关',
            effect: () => ({
              messages: ['你守在她身边三天三夜，听她讲述史前的故事。那些辉煌与落寞，让你更加了解她。'],
              intimacyChange: 20,
            }),
          },
        ],
      },
      {
        id: 'qinluoyin_story_3',
        title: '丽人归心',
        requiredIntimacy: 500,
        description: '秦珞音终于放下过去，愿意重新开始。',
        choices: [
          {
            text: '邀她共游天下',
            effect: () => ({
              messages: ['她看着你的眼睛，轻轻点头："好，我陪你。"那一刻，天地失色，唯有她眼中的光芒永恒。'],
              intimacyChange: 50,
              reward: '史前道侣契',
            }),
          },
        ],
      },
    ],
    dualCultivationPoses: DUAL_CULTIVATION_POSE_TEMPLATES,
    interactions: DAO_LU_INTERACTION_TEMPLATES,
    intimacyLabels: {
      0: '素不相识',
      20: '初识好感',
      50: '相识相知',
      100: '亲密无间',
      200: '心有灵犀',
      500: '结为道侣',
    },
    firstMeeting: '你在古遗迹深处发现了一座精致的庭院，她正坐在庭中抚琴。琴声悠扬，却透着无尽的孤寂。',
    backgroundStory: '秦珞音曾是史前阳间第一丽人，风华绝代，追求者无数。然而史前大劫来临，她所在的道统覆灭，她也身受重伤，只能隐居在古遗迹中。岁月流逝，她的容颜依旧，但心已苍老。她看透了世事，选择隐居不出，直到你的出现，才让她冰封的心有了一丝波澜。她精通音律，擅长史前功法，是难得的修炼伴侣。',
    personalityTraits: ['温婉', '淡泊', '智慧', '外柔内刚', '念旧'],
    likes: ['古琴', '古遗迹', '宁静', '史前典籍', '知音之人'],
    dislikes: ['喧嚣', '虚伪的追求者', '提及史前大劫', '阳间大教的纷争', '背叛'],
    favoriteGifts: ['史前古琴', '古老乐谱', '灵茶', '古遗迹珍宝', '静心玉'],
  },
  {
    id: 'daolu_shengxu_shaonvxi',
    name: '少女曦',
    title: '曦皇朝公主',
    description: '阳间曦皇朝公主，活泼灵动，身份尊贵却不拘小节。',
    greeting: '嘿！你来啦！快陪我出去玩！',
    dialogues: [
      ...shengxuDialogues,
      {
        id: 'shaonvxi_royal',
        topic: '皇朝生活',
        text: '皇朝里好无聊的，每天都有那么多规矩...',
      },
      {
        id: 'shaonvxi_adventure',
        topic: '冒险故事',
        text: '你有没有什么好玩的冒险故事？快讲给我听！',
      },
    ],
    roomId: 'room_shengxu_shaonvxi_palace',
    faction: {
      name: '曦皇朝',
      type: DaoLuFactionType.DYNASTY,
      description: '阳间古老进化皇朝，传承久远，底蕴深厚，掌控阳间一州之地。',
      power: '阳间大教级',
      location: '阳间曦州·皇城',
      leader: '曦皇',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'shaonvxi_story_1',
        title: '偷溜出宫',
        requiredIntimacy: 20,
        description: '少女曦又偷偷溜出皇宫，在街市上遇到了你。',
        choices: [
          {
            text: '陪她逛集市',
            effect: () => ({
              messages: ['你们逛遍了整个集市，她买了许多小玩意儿，笑得像个小女孩。'],
              intimacyChange: 15,
            }),
          },
          {
            text: '劝她回宫',
            effect: () => ({
              messages: ['她撅起嘴："你也跟他们一样，就知道让我回宫！"话虽如此，她眼中却没有真的生气。'],
              intimacyChange: 5,
            }),
          },
        ],
      },
      {
        id: 'shaonvxi_story_2',
        title: '皇朝危机',
        requiredIntimacy: 100,
        description: '曦皇朝遭遇外敌入侵，少女曦被困宫中。',
        choices: [
          {
            text: '独闯皇宫救她',
            effect: () => ({
              messages: ['你单枪匹马闯入皇宫，在乱军之中找到了她。她看到你，又惊又喜："你...你怎么来了！"'],
              intimacyChange: 25,
              reward: '曦皇朝秘宝',
            }),
          },
          {
            text: '协助皇朝抵御外敌',
            effect: () => ({
              messages: ['你协助曦皇朝击退外敌，曦皇对你赞赏有加，少女曦看向你的目光也多了几分不同。'],
              intimacyChange: 20,
            }),
          },
        ],
      },
      {
        id: 'shaonvxi_story_3',
        title: '公主的抉择',
        requiredIntimacy: 500,
        description: '少女曦面临和亲的命运，向你求助。',
        choices: [
          {
            text: '带她远走高飞',
            effect: () => ({
              messages: ['你带她逃离了皇城，她在马背上紧紧抱着你："我...我不后悔。"'],
              intimacyChange: 50,
              reward: '曦皇朝公主之心',
            }),
          },
          {
            text: '说服曦皇改变主意',
            effect: () => ({
              messages: ['你以自身实力和诚意说服了曦皇，取消了和亲。少女曦扑进你怀里，喜极而泣。'],
              intimacyChange: 45,
              reward: '曦皇朝永久友谊',
            }),
          },
        ],
      },
    ],
    dualCultivationPoses: DUAL_CULTIVATION_POSE_TEMPLATES,
    interactions: DAO_LU_INTERACTION_TEMPLATES,
    intimacyLabels: {
      0: '素不相识',
      20: '初识好感',
      50: '相识相知',
      100: '亲密无间',
      200: '心有灵犀',
      500: '结为道侣',
    },
    firstMeeting: '你在街市上看到一个少女正在与小贩讨价还价，那活泼灵动的样子与周围的人格格不入。后来她偷偷告诉你，她是偷溜出宫的公主。',
    backgroundStory: '少女曦是曦皇朝最受宠爱的公主，自幼在皇宫长大，身份尊贵。但她天性活泼好动，不喜欢皇宫里的繁文缛节，经常偷溜出宫玩耍。她看似天真烂漫，实则聪慧过人，对修炼也有独到的见解。她渴望自由，渴望真正的爱情，而不是政治联姻的工具。你的出现，让她看到了希望。',
    personalityTraits: ['活泼', '天真', '聪慧', '叛逆', '重情义'],
    likes: ['自由', '街市', '冒险', '新奇事物', '真心相待'],
    dislikes: ['规矩', '政治联姻', '虚伪', '被关在皇宫', '背叛'],
    favoriteGifts: ['宫外小吃', '新奇玩物', '冒险地图', '灵石', '自由之羽'],
  },
  {
    id: 'daolu_shengxu_yingxiaoxiao',
    name: '映晓晓',
    title: '映族明珠',
    description: '映族年轻一代最出色的女子，如明珠般璀璨耀眼。',
    greeting: '你好...我、我叫映晓晓，你叫什么？',
    dialogues: [
      ...shengxuDialogues,
      {
        id: 'yingxiaoxiao_family',
        topic: '映族',
        text: '映族虽然不是什么大势力，但也是我们一族的根...',
      },
      {
        id: 'yingxiaoxiao_shy',
        topic: '害羞',
        text: '你...你别一直看着我呀...',
      },
    ],
    roomId: 'room_shengxu_yingxiaoxiao_house',
    faction: {
      name: '映族',
      type: DaoLuFactionType.CLAN,
      description: '阳间进化世家，传承数代，以血脉进化闻名。',
      power: '阳间世家级',
      location: '阳间映州·映族祖地',
      leader: '映族家主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'yingxiaoxiao_story_1',
        title: '明珠初现',
        requiredIntimacy: 20,
        description: '映晓晓在族中试炼中遇到困难，向你求助。',
        choices: [
          {
            text: '耐心指导她',
            effect: () => ({
              messages: ['你耐心地为她讲解修炼的诀窍，她听得入神，眼中闪烁着崇拜的光芒。'],
              intimacyChange: 15,
              reward: '映族好感度',
            }),
          },
          {
            text: '陪她一起练习',
            effect: () => ({
              messages: ['你们一起练习到深夜，她虽然疲惫，但脸上洋溢着满足的笑容。'],
              intimacyChange: 12,
            }),
          },
        ],
      },
      {
        id: 'yingxiaoxiao_story_2',
        title: '血脉觉醒',
        requiredIntimacy: 100,
        description: '映晓晓的血脉即将觉醒，却遭遇危机。',
        choices: [
          {
            text: '以自身灵气助她觉醒',
            effect: () => ({
              messages: ['你将自身灵气渡入她体内，助她完成血脉觉醒。她醒来后，血脉之力澎湃，看着你的目光满是感激与柔情。'],
              intimacyChange: 25,
              reward: '映族血脉精魄',
            }),
          },
          {
            text: '守护她度过难关',
            effect: () => ({
              messages: ['你守护在她身边，击退所有来犯之敌。她醒来后，第一次主动握住了你的手。'],
              intimacyChange: 20,
            }),
          },
        ],
      },
      {
        id: 'yingxiaoxiao_story_3',
        title: '明珠有主',
        requiredIntimacy: 500,
        description: '映族要将映晓晓许配给他人，她向你表明心迹。',
        choices: [
          {
            text: '向她表白心意',
            effect: () => ({
              messages: ['你当着映族众人的面表白，她羞红了脸，却坚定地点头："我...我愿意。"'],
              intimacyChange: 50,
              reward: '映族明珠之心',
            }),
          },
          {
            text: '向映族提亲',
            effect: () => ({
              messages: ['你备足聘礼，正式向映族提亲。映族家主见你诚意十足，欣然应允。映晓晓躲在屏风后，笑得像朵花。'],
              intimacyChange: 45,
              reward: '映族永久友谊',
            }),
          },
        ],
      },
    ],
    dualCultivationPoses: DUAL_CULTIVATION_POSE_TEMPLATES,
    interactions: DAO_LU_INTERACTION_TEMPLATES,
    intimacyLabels: {
      0: '素不相识',
      20: '初识好感',
      50: '相识相知',
      100: '亲密无间',
      200: '心有灵犀',
      500: '结为道侣',
    },
    firstMeeting: '你在映族祖地外遇到了一个害羞的少女，她正被几个恶少欺负。你出手相助，她红着脸向你道谢，那娇羞的模样让人心生怜惜。',
    backgroundStory: '映晓晓出身映族，是族中年轻一代最出色的女子，被誉为"映族明珠"。她性格温柔害羞，但内心坚韧。自幼便展现出非凡的血脉天赋，被族中寄予厚望。然而她并不喜欢被当作筹码的感觉，渴望一份真挚的感情。她对强者有着天然的崇拜，但更看重对方的真心。你的出现，让她第一次感受到了被真心对待的温暖。',
    personalityTraits: ['温柔', '害羞', '坚韧', '善良', '崇拜强者'],
    likes: ['安静', '修炼', '花', '被人真心对待', '强者'],
    dislikes: ['被欺负', '虚伪', '政治联姻', '嘈杂', '背叛'],
    favoriteGifts: ['映族花种', '修炼资源', '首饰', '灵石', '温柔陪伴'],
  },
  {
    id: 'daolu_shengxu_ouyangfeng',
    name: '欧阳风',
    title: '欧阳世家女修',
    description: '欧阳世家嫡系女修，性格豪爽，不拘小节，颇有英气。',
    greeting: '哈哈！你来了！来，陪我喝一杯！',
    dialogues: [
      ...shengxuDialogues,
      {
        id: 'ouyangfeng_family',
        topic: '欧阳世家',
        text: '欧阳世家虽不是什么超级大族，但也有自己的骨气！',
      },
      {
        id: 'ouyangfeng_wine',
        topic: '饮酒',
        text: '来！喝酒！修炼之人，哪能不会喝酒！',
      },
    ],
    roomId: 'room_shengxu_ouyangfeng_hall',
    faction: {
      name: '欧阳世家',
      type: DaoLuFactionType.CLAN,
      description: '阳间异荒世家，传承自异荒时代，血脉中带有异兽之力。',
      power: '阳间世家级',
      location: '阳间·异荒之地',
      leader: '欧阳家主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'ouyangfeng_story_1',
        title: '酒逢知己',
        requiredIntimacy: 20,
        description: '欧阳风在酒馆中大醉，与人发生冲突。',
        choices: [
          {
            text: '替她解围',
            effect: () => ({
              messages: ['你替她解了围，将她扶回住处。她醉眼朦胧地看着你："你...你是个好人。"'],
              intimacyChange: 15,
            }),
          },
          {
            text: '陪她一起喝',
            effect: () => ({
              messages: ['你们喝到酩酊大醉，她拍着你的肩膀称兄道弟，虽然她是女儿身，却豪爽得让人敬佩。'],
              intimacyChange: 12,
            }),
          },
        ],
      },
      {
        id: 'ouyangfeng_story_2',
        title: '异荒血脉',
        requiredIntimacy: 100,
        description: '欧阳风的异荒血脉失控，面临暴走。',
        choices: [
          {
            text: '以修为镇压她的血脉',
            effect: () => ({
              messages: ['你耗尽修为，终于将她的异荒血脉镇压下去。她醒来后，看着虚弱的你，眼中满是复杂的情感。'],
              intimacyChange: 25,
              reward: '异荒血脉精魄',
            }),
          },
          {
            text: '引导她控制血脉',
            effect: () => ({
              messages: ['你引导她控制异荒血脉，经过一夜的努力，她终于掌握了这股力量。她看着你，第一次露出了女子的娇羞。'],
              intimacyChange: 20,
              reward: '异荒控血术',
            }),
          },
        ],
      },
      {
        id: 'ouyangfeng_story_3',
        title: '英气柔情',
        requiredIntimacy: 500,
        description: '欧阳风终于卸下防备，向你展露真心。',
        choices: [
          {
            text: '接受她的真心',
            effect: () => ({
              messages: ['她难得地红了脸，小声道："我...我虽不如其他女子温柔，但我会一辈子对你好的。"'],
              intimacyChange: 50,
              reward: '欧阳世家之心',
            }),
          },
        ],
      },
    ],
    dualCultivationPoses: DUAL_CULTIVATION_POSE_TEMPLATES,
    interactions: DAO_LU_INTERACTION_TEMPLATES,
    intimacyLabels: {
      0: '素不相识',
      20: '初识好感',
      50: '相识相知',
      100: '亲密无间',
      200: '心有灵犀',
      500: '结为道侣',
    },
    firstMeeting: '你在酒馆中看到一个女子正与人拼酒，那豪爽的气概让周围的男子都自愧不如。她注意到你的目光，举杯向你示意。',
    backgroundStory: '欧阳风出身欧阳世家，是嫡系女修。她继承了欧阳世家独特的异荒血脉，天赋不凡。但她性格豪爽，不拘小节，更像男儿而非女子。她不喜欢世家子弟的虚伪做作，更喜欢与江湖豪杰结交。她体内流淌着异兽之血，有时会失控，这让她既强大又危险。她渴望有人能理解她的豪爽外表下的孤独，你的出现让她找到了知音。',
    personalityTraits: ['豪爽', '英气', '忠诚', '外刚内柔', '重情义'],
    likes: ['美酒', '战斗', '江湖', '豪爽之人', '真心相待'],
    dislikes: ['虚伪', '规矩', '娘娘腔', '被当作怪物', '背叛'],
    favoriteGifts: ['美酒', '战斗秘籍', '异荒材料', '灵石', '江湖消息'],
  },
  {
    id: 'daolu_shengxu_jiangluoshen',
    name: '姜洛神',
    title: '姜家神女',
    description: '姜家神女，气质出尘，如洛神临世，修炼天赋惊人。',
    greeting: '道友有礼。今日前来，可是有修炼上的困惑？',
    dialogues: [
      ...shengxuDialogues,
      {
        id: 'jiangluoshen_god',
        topic: '姜家传承',
        text: '姜家传承久远，神女之位，既是荣耀，也是责任。',
      },
      {
        id: 'jiangluoshen_cultivation',
        topic: '修炼之道',
        text: '修炼如逆水行舟，不进则退。道友切不可懈怠。',
      },
    ],
    roomId: 'room_shengxu_jiangluoshen_temple',
    faction: {
      name: '姜家',
      type: DaoLuFactionType.CLAN,
      description: '阳间古老进化世家，传承久远，以神女传承闻名，历代神女皆有惊世之姿。',
      power: '阳间世家级',
      location: '阳间·姜家祖地',
      leader: '姜家族长',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'jiangluoshen_story_1',
        title: '神女之责',
        requiredIntimacy: 20,
        description: '姜洛神因神女的责任而疲惫，在你面前露出脆弱。',
        choices: [
          {
            text: '安慰她',
            effect: () => ({
              messages: ['你轻声安慰她，她靠在你的肩膀上，难得地放松下来。'],
              intimacyChange: 15,
            }),
          },
          {
            text: '帮她分担责任',
            effect: () => ({
              messages: ['你主动帮她处理了一些事务，她感激地看着你："谢谢你，从来没有人这样帮过我。"'],
              intimacyChange: 18,
            }),
          },
        ],
      },
      {
        id: 'jiangluoshen_story_2',
        title: '洛神之泪',
        requiredIntimacy: 100,
        description: '姜家遭遇危机，姜洛神被迫做出牺牲。',
        choices: [
          {
            text: '阻止她牺牲自己',
            effect: () => ({
              messages: ['你拼尽全力阻止了她的牺牲，将她从鬼门关拉了回来。她抱着你痛哭："你为什么要这样..."'],
              intimacyChange: 25,
              reward: '姜家神女之泪',
            }),
          },
          {
            text: '与她共同面对',
            effect: () => ({
              messages: ['你与她共同面对危机，最终化解了姜家的劫难。她看着你，眼中满是柔情。'],
              intimacyChange: 20,
              reward: '姜家永久友谊',
            }),
          },
        ],
      },
      {
        id: 'jiangluoshen_story_3',
        title: '神女归心',
        requiredIntimacy: 500,
        description: '姜洛神决定放下神女的枷锁，追求自己的幸福。',
        choices: [
          {
            text: '带她离开姜家',
            effect: () => ({
              messages: ['你带着她离开了姜家，她在你的怀中轻声道："从今天起，我只是你的洛神。"'],
              intimacyChange: 50,
              reward: '洛神之心',
            }),
          },
          {
            text: '支持她的决定',
            effect: () => ({
              messages: ['你支持她留在姜家改革，她成为了姜家有史以来最伟大的神女，也是你最坚定的道侣。'],
              intimacyChange: 45,
              reward: '姜家神女之位',
            }),
          },
        ],
      },
    ],
    dualCultivationPoses: DUAL_CULTIVATION_POSE_TEMPLATES,
    interactions: DAO_LU_INTERACTION_TEMPLATES,
    intimacyLabels: {
      0: '素不相识',
      20: '初识好感',
      50: '相识相知',
      100: '亲密无间',
      200: '心有灵犀',
      500: '结为道侣',
    },
    firstMeeting: '你在姜家祖地的神女殿中见到了她。她一袭白衣，如洛神临世，那出尘的气质让你一时间竟忘了言语。',
    backgroundStory: '姜洛神是姜家当代神女，自幼便被选中，接受最严格的培养。她天赋绝世，气质出尘，被誉为"洛神再世"。然而神女之位既是荣耀也是枷锁，她的一言一行都受到族规的约束。她渴望自由，渴望真正的爱情，但从未有人能走进她的内心。直到你的出现，才让她冰冷的心有了一丝温度。她温柔而坚韧，是理想的修炼伴侣。',
    personalityTraits: ['出尘', '温柔', '坚韧', '责任感强', '渴望自由'],
    likes: ['清静', '修炼', '洛水', '古籍', '真心之人'],
    dislikes: ['束缚', '虚伪', '规矩', '被当作工具', '背叛'],
    favoriteGifts: ['洛水精华', '古老典籍', '神女服饰', '灵石', '自由之羽'],
  },
  {
    id: 'daolu_shengxu_yushang',
    name: '羽尚天尊后人',
    title: '天尊血脉传承者',
    description: '羽尚天尊的后人，身怀天尊血脉，气质高贵，却隐于世。',
    greeting: '你来了...我等你很久了。',
    dialogues: [
      ...shengxuDialogues,
      {
        id: 'yushang_bloodline',
        topic: '天尊血脉',
        text: '天尊血脉...是祝福，也是诅咒。',
      },
      {
        id: 'yushang_hidden',
        topic: '隐居生活',
        text: '隐居于此，只是为了躲避那些贪婪的目光。',
      },
    ],
    roomId: 'room_shengxu_yushang_retreat',
    faction: {
      name: '羽尚天尊一脉',
      type: DaoLuFactionType.HIDDEN,
      description: '阳间古天尊羽尚的血脉传承，曾是阳间最尊贵的血脉之一，如今却日渐凋零。',
      power: '天尊遗脉',
      location: '阳间·隐秘之地',
    },
    status: '隐居',
    storyNodes: [
      {
        id: 'yushang_story_1',
        title: '天尊遗脉',
        requiredIntimacy: 20,
        description: '羽尚天尊后人向你透露天尊血脉的秘密。',
        choices: [
          {
            text: '表示愿意守护她',
            effect: () => ({
              messages: ['她看着你，眼中闪过一丝惊讶："你...你知道这意味着什么吗？"'],
              intimacyChange: 15,
            }),
          },
          {
            text: '询问天尊往事',
            effect: () => ({
              messages: ['她轻叹一声，向你讲述了羽尚天尊的辉煌与陨落。'],
              intimacyChange: 12,
              reward: '天尊往事录',
            }),
          },
        ],
      },
      {
        id: 'yushang_story_2',
        title: '血脉觉醒',
        requiredIntimacy: 100,
        description: '羽尚天尊后人的血脉即将觉醒，却引来强敌窥视。',
        choices: [
          {
            text: '击退强敌',
            effect: () => ({
              messages: ['你浴血奋战，击退了所有来犯之敌。她看着你满身是血，泪如雨下："你...你何必如此..."'],
              intimacyChange: 25,
              reward: '天尊血脉精魄',
            }),
          },
          {
            text: '带她转移',
            effect: () => ({
              messages: ['你带着她转移到安全之地，助她完成血脉觉醒。她醒来后，气质更加高贵，看着你的目光却多了几分柔情。'],
              intimacyChange: 20,
            }),
          },
        ],
      },
      {
        id: 'yushang_story_3',
        title: '天尊之誓',
        requiredIntimacy: 500,
        description: '羽尚天尊后人决定重振天尊一脉，请求你的帮助。',
        choices: [
          {
            text: '与她共立天尊之誓',
            effect: () => ({
              messages: ['你们在羽尚天尊的雕像前立下誓言，共同重振天尊一脉。她握着你的手，眼中满是坚定与柔情："从今以后，我们生死与共。"'],
              intimacyChange: 50,
              reward: '天尊道侣契',
            }),
          },
        ],
      },
    ],
    dualCultivationPoses: DUAL_CULTIVATION_POSE_TEMPLATES,
    interactions: DAO_LU_INTERACTION_TEMPLATES,
    intimacyLabels: {
      0: '素不相识',
      20: '初识好感',
      50: '相识相知',
      100: '亲密无间',
      200: '心有灵犀',
      500: '结为道侣',
    },
    firstMeeting: '你在一处隐秘的山谷中发现了一座简陋的茅屋，她正坐在屋前抚琴。那高贵的气质与简陋的环境形成了鲜明的对比。',
    backgroundStory: '羽尚天尊后人是阳间古天尊羽尚的血脉传承者，身怀尊贵的天尊血脉。然而天尊一脉已经日渐凋零，她只能隐居避世，躲避那些觊觎天尊血脉的贪婪之人。她高贵而孤独，内心深处渴望有人能保护她，陪伴她重振天尊一脉的荣光。她精通上古秘法，是天尊一脉最后的希望。你的出现，让她看到了曙光。',
    personalityTraits: ['高贵', '孤独', '坚韧', '聪慧', '重情义'],
    likes: ['清静', '上古秘法', '天尊遗物', '抚琴', '真心守护之人'],
    dislikes: ['贪婪', '虚伪', '被打扰', '觊觎天尊血脉之人', '背叛'],
    favoriteGifts: ['天尊遗物', '上古秘法', '灵石', '古琴', '守护之誓'],
  },
];
