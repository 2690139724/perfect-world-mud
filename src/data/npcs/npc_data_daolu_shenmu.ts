import { IDaoLu, DaoLuFactionType, DUAL_CULTIVATION_POSE_TEMPLATES, DAO_LU_INTERACTION_TEMPLATES } from '../../domain/entities/DaoLu';
import { INPCDialogue } from '../../domain/entities/NPC';

/** 神墓背景道侣数据 - 基于辰东小说《神墓》世界观 */

const dialogues_yuxin: INPCDialogue[] = [
  { id: 'yuxin_past', topic: '询问过去', text: '雨馨目光迷离，望向远方："我总在梦中见到一片古老的战场，有无数神魔在嘶吼...还有一个人，他在呼唤我的名字。那声音很悲伤，让我心痛。"她轻抚胸口，眉头微蹙。' },
  { id: 'yuxin_human_king', topic: '人王的传说', text: '"人王？"雨馨微微摇头："我只在古籍中读到过。据说那是远古至强之人，连天都要敬畏三分。但那些都太过遥远...我只想做回我自己。"她的眼中闪过一丝迷茫与坚定。' },
  { id: 'yuxin_flower', topic: '赠送鲜花', text: '雨馨接过花朵，露出纯净的笑容："好美...谢谢你。不知为何，我特别喜欢百花谷的花。总觉得那里有一种熟悉的气息，仿佛很久以前，我在那里生活过。"她将花轻轻别在发间。' },
];

const dialogues_tantaixuan: INPCDialogue[] = [
  { id: 'tantaixuan_sect', topic: '澹台圣地', text: '澹台璇神色淡然："澹台圣地传承万年，源自太古一位女帝。创立圣地的初衷，是为了守护这片天地间的正道。"她目光深远："但正道二字，又有谁能真正说清？"' },
  { id: 'tantaixuan_past', topic: '万年前的往事', text: '"万年前？"澹台璇神色复杂："那是一个动乱的时代。神姬大人指使我...做了一些事情。"她轻叹一声："有些事，当时觉得是对的，如今回想，却只剩下遗憾。修炼之路漫长，最难修的不是功法，而是本心。"' },
  { id: 'tantaixuan_wisdom', topic: '请教智慧', text: '澹台璇微微一笑："智慧不是教出来的，是历经磨难后沉淀下来的。我活了万年，见过太多人杰陨落，见过太多王朝更替。唯一不变的，是这天地间的大道。你想学？先学会在纷扰中保持一颗清净心。"' },
];

const dialogues_mengkeer: INPCDialogue[] = [
  { id: 'mengkeer_saint', topic: '澹台圣女', text: '梦可儿轻踏莲台，神色圣洁："澹台圣地每代只出一位圣女，代表着圣地的最高传承。我从小就被教导要以天下苍生为重，要守护正道。"她嘴角微扬："但圣女也是人，也有自己的想法。"' },
  { id: 'mengkeer_seven', topic: '七绝天女', text: '"七绝天女？"梦可儿神色凝重："那是太古时期的一位女帝，她的魂魄分裂成了数道分身。我...便是其中之一。"她轻叹："这个身份既是荣耀，也是枷锁。我不知道未来会怎样，但我会走出属于自己的路。"' },
  { id: 'mengkeer_lotus', topic: '莲台功法', text: '梦可儿轻挥素手，一朵金莲在掌心绽放："这是澹台圣地的「金莲诀」，以心化莲，以莲为台。修炼到深处，可以踏莲而行，万法不侵。"她看向你："你若想学，我可以教你基础心法。"' },
];

const dialogues_longwu: INPCDialogue[] = [
  { id: 'longwu_dragon', topic: '龙族血脉', text: '龙舞眼中闪过金色光芒："龙族是太古时期的霸主，凌驾于百兽之上。虽然我看起来是人形，但真身可是能遮天蔽日的神龙！"她挺起胸膛，一脸骄傲，随即又有些黯然："可惜如今龙族凋零，不复当年盛况。"' },
  { id: 'longwu_valley', topic: '龙谷', text: '"龙谷是龙族的圣地，也是我长大的地方。"龙舞目光怀念："那里有条龙脉，灵气浓郁得化不开。小时候我总喜欢在山谷间飞翔，和同龄的龙族子弟比试。"她看向你："有机会我带你回去看看！"' },
  { id: 'longwu_sword', topic: '龙舞剑', text: '龙舞取出一柄碧绿长剑："这是龙舞剑，以龙骨为柄，龙鳞为鞘，是我成年时父亲赠予的。剑出如龙舞九天，故名龙舞剑。"她轻抚剑身："此剑饮过无数妖魔之血，是龙族荣耀的象征。"' },
];

const dialogues_chuyu: INPCDialogue[] = [
  { id: 'chuyu_princess', topic: '楚国公主', text: '楚钰扬起精致的小脸："本公主可是楚国皇室最疼爱的小公主！从小到大要什么有什么，连父王都舍不得对我说一句重话。"她眼珠一转："不过嘛...偷偷告诉你，宫外可比宫里好玩多了！"' },
  { id: 'chuyu_trouble', topic: '小麻烦', text: '"哼！谁说我是小麻烦了？"楚钰叉腰瞪眼："本公主只是...只是比较活泼而已！那些被我捉弄的人都是活该，谁让他们对本公主不敬的。"说完她自己先笑了起来，眼睛弯成月牙。' },
  { id: 'chuyu_treasure', topic: '皇室宝物', text: '楚钰神秘兮兮地凑近："我偷偷给你看..."她从怀中取出一块玉佩："这是楚国皇室的镇国之宝之一，据说里面封印着上古神灵的一缕神识。父王本来不让我带出来的，我偷偷拿出来的。"她一脸得意。' },
];

const dialogues_chuyue: INPCDialogue[] = [
  { id: 'chuyue_empire', topic: '楚国大势', text: '楚月神色沉稳，尽显大公主风范："楚国作为东方三大帝国之一，能屹立千年不倒，靠的是铁血手腕与深谋远虑。"她看向你："在皇家，没有真正的朋友，也没有永远的敌人，只有利益。你要记住这一点。"' },
  { id: 'chuyue_soul', topic: '残魂之谜', text: '"我的魂魄并不完整。"楚月罕见地露出一丝脆弱："我从小就能感觉到，我的灵魂深处缺少了一部分。直到后来才明白，那是七绝天女的分魂。"她神色恢复如常："不过这不影响我追求大道。"' },
  { id: 'chuyue_politics', topic: '权谋之术', text: '楚月嘴角微扬："想学术法还是权谋？我可以都教你一些。在楚国皇宫长大，若不懂权谋，早就尸骨无存了。"她意味深长地看着你："修仙之路也是如此，实力固然重要，但懂得审时度势，才能活得更久。"' },
];

const dialogues_nalanruoshui: INPCDialogue[] = [
  { id: 'nalan_medical', topic: '医术心得', text: '纳兰若水温和一笑："医术之道，在于仁心。我虽非绝色，但这双手救过的人，不知凡几。"她轻轻整理药箱："奇士府中多是刀口舔血的修士，我虽不能上阵杀敌，却能让他们少流些血。"' },
  { id: 'nalan_angel', topic: '斗战天使', text: '"斗战天使？"纳兰若水神色恍惚："我有时会做一些奇怪的梦，梦见自己长着洁白的翅膀，在云端战斗。那感觉既陌生又熟悉...或许真如传言所说，我是西方斗战天使的转世之身。"她轻轻摇头："但那又如何？我今生只是纳兰若水。"' },
  { id: 'nalan_herbs', topic: '草药学问', text: '纳兰若水从药箱中取出一株灵草："这是清心草，生于悬崖峭壁之间，可以炼制清心丹，稳固心神，防止走火入魔。"她细致地讲解："采药要注意时辰，卯时采摘最佳，此时灵气最纯净。"' },
];

const dialogues_chenxi: INPCDialogue[] = [
  { id: 'chenxi_nature', topic: '自然之力', text: '晨曦微笑着伸出手，一朵小花从她掌心缓缓绽放："我天生就能与花草树木沟通，感受它们的喜怒哀乐。大自然是最好的朋友，也是最强大的力量。"她轻轻抚摸花瓣："每一朵花都有自己的灵魂。"' },
  { id: 'chenxi_life', topic: '生命之气', text: '"我体内流淌着生命之气，可以治愈伤痛，让枯木逢春。"晨曦神色纯真："但我不知道为什么会有这种力量。从记事起，我就能感觉到体内有一团温暖的光，它告诉我，我的存在是为了守护生命。"' },
  { id: 'chenxi_forest', topic: '精灵森林', text: '晨曦眼中闪着光："精灵族的圣地有一片生命之树，据说已经存在了数万年。那里是世间最纯净的地方，没有杀戮，没有纷争。"她期待地看着你："我想带你去看，你一定会喜欢的。"' },
];

export const SHENMU_DAOLU: IDaoLu[] = [
  {
    id: 'daolu_yuxin',
    name: '雨馨',
    title: '人王转世',
    description: '一位白衣胜雪的绝美女子，气质空灵出尘，仿佛不属于这个尘世。她的眼眸清澈见底，却又蕴含着历经沧桑的深邃。周身散发着淡淡的生命气息，让人如沐春风。',
    greeting: '雨馨缓缓转身，目光清澈如水："你来了...不知道为什么，见到你，我心里总有一种奇怪的感觉。仿佛我们很久以前就认识。"她微微一笑，如百花盛开。',
    roomId: 'celestial_pavilion',
    dialogues: dialogues_yuxin,
    faction: {
      name: '人王遗脉',
      type: DaoLuFactionType.HIDDEN,
      description: '远古至强人王留下的传承血脉，虽已式微，但底蕴深厚',
      power: '隐世',
      location: '天界天宫',
      leader: '雨馨',
    },
    status: '隐居',
    storyNodes: [
      {
        id: 'yuxin_node1',
        title: '失忆的仙子',
        requiredIntimacy: 0,
        description: '雨馨失去了大部分记忆，只记得自己叫这个名字。她隐约感觉自己肩负着某种使命，却怎么也想不起来。你决定帮助她找回记忆。',
        choices: [
          {
            text: '带她前往神魔陵园，寻找线索',
            effect: (player) => {
              return {
                messages: ['你们来到神魔陵园，雨馨站在陵园前，泪水不知不觉滑落。"这里...我来过。"她喃喃自语，记忆似乎有所触动。'],
                intimacyChange: 10,
                reward: '人王残魂碎片',
              };
            },
          },
          {
            text: '先安定下来，慢慢恢复',
            effect: (player) => {
              return {
                messages: ['你在天界找了一处僻静之地，让雨馨安心休养。她感激地看着你："谢谢你...至少现在，我不再是一个人了。"'],
                intimacyChange: 5,
              };
            },
          },
        ],
      },
      {
        id: 'yuxin_node2',
        title: '百花谷的回忆',
        requiredIntimacy: 50,
        description: '在一次偶然的机会中，雨馨来到了百花谷。看到满谷的鲜花，她的记忆如潮水般涌来——她想起了一个人，一个对她很重要的人。',
        choices: [
          {
            text: '静静陪伴她，让她慢慢回忆',
            effect: (player) => {
              return {
                messages: ['你静静地陪在雨馨身边。她坐在花丛中，泪水滑落："我想起来了...辰南，那是他的名字。可是，他是谁？为什么我会如此心痛？"她靠在你的肩头，轻声啜泣。'],
                intimacyChange: 20,
                reward: '百花谷灵种',
              };
            },
          },
          {
            text: '询问她是否愿意放下过去',
            effect: (player) => {
              return {
                messages: ['雨馨沉默良久，轻轻摇头："有些记忆，即便是痛，也是生命中最重要的部分。我不能忘记他...但我也会珍惜眼前人。"她看向你，目光温柔而复杂。'],
                intimacyChange: 15,
              };
            },
          },
        ],
      },
      {
        id: 'yuxin_node3',
        title: '人王觉醒',
        requiredIntimacy: 200,
        description: '随着修为的提升，雨馨体内的人王血脉开始觉醒。她的力量越来越强大，记忆也越来越清晰。但觉醒带来的是巨大的痛苦，她需要有人在身边守护。',
        choices: [
          {
            text: '全力助她觉醒，无论付出什么代价',
            effect: (player) => {
              return {
                messages: ['你以自身灵力为引，帮助雨馨疏导体内暴走的能量。三天三夜后，她终于完成了觉醒。睁眼的那一刻，她的目光中多了王者的威严，但看向你时，依然温柔："谢谢你...我的道侣。"'],
                intimacyChange: 50,
                reward: '人王传承印记',
              };
            },
          },
          {
            text: '为她护法，让她自己完成觉醒',
            effect: (player) => {
              return {
                messages: ['你在旁护法，警惕着任何可能的危险。雨馨独自承受觉醒的痛苦，却始终没有发出一声呻吟。当她睁开双眼，目光中满是坚毅："我做到了...谢谢你一直守着我。"'],
                intimacyChange: 30,
              };
            },
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
    firstMeeting: '你在天界天宫的花园中，遇见了一位白衣女子。她独自站在一株古树下，望着远方发呆。你上前搭话，她转过身来，目光中带着一丝迷茫与温柔："你好，我叫雨馨...我们是不是在哪里见过？"',
    backgroundStory: '雨馨是《神墓》世界的女主角，远古至强人王之王的转世之身。她初依靠天地灵气化形，在一个雨夜被人间界修者捡到，故而得名雨馨。万年前与辰南相恋，后因修炼《太上忘情录》灵魂分裂出四大分身。本体雨馨沉睡万年，醒来后失去了大部分记忆，但那份对人王之道的执着与对爱的追寻从未改变。她性格纯净善良，即便在残酷的修仙世界中，也始终保持着一颗赤子之心。',
    personalityTraits: ['纯净善良', '空灵出尘', '坚韧不拔', '温柔体贴', '执着追寻'],
    likes: ['百花', '古琴', '清静之地', '帮助他人', '回忆往事'],
    dislikes: ['杀戮', '背叛', '喧嚣', '强迫', '遗忘'],
    favoriteGifts: ['百花蜜', '古琴谱', '生命灵泉', '忘情花', '人王玉佩'],
  },
  {
    id: 'daolu_tantaixuan',
    name: '澹台璇',
    title: '澹台圣地仙子',
    description: '一位身穿淡金色长裙的绝世女子，容颜倾城，气质高贵而神秘。她的眼眸深邃如星空，仿佛能看透世间一切。举手投足间，尽显万年沉淀的优雅与智慧。',
    greeting: '澹台璇缓缓抬眸，目光如电却又瞬间柔和："哦？竟有客人造访。我已在此闭关多年，不知外界如今是何年月？"她轻轻放下手中的古籍，示意你入座。',
    roomId: 'divine_palace',
    dialogues: dialogues_tantaixuan,
    faction: {
      name: '澹台圣地',
      type: DaoLuFactionType.SECT,
      description: '天界最负盛名的圣地之一，由澹台璇万年前创立，传承自太古女帝',
      power: '天界顶尖',
      location: '天界神殿',
      leader: '澹台璇',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'tantaixuan_node1',
        title: '万年心结',
        requiredIntimacy: 0,
        description: '澹台璇心中有一个万年心结——万年前她受神姬指使，封印了辰南的功力，间接导致其身亡。虽然事后她创立了澹台圣地守护正道，但那份愧疚始终萦绕心头。',
        choices: [
          {
            text: '告诉她人非圣贤，孰能无过',
            effect: (player) => {
              return {
                messages: ['澹台璇沉默良久，轻叹一声："你说得对...但有些事，不是一句道歉就能放下的。我创立澹台圣地，便是想以此赎罪。"她看向你，目光中多了一丝释然。'],
                intimacyChange: 10,
              };
            },
          },
          {
            text: '陪她前往神魔陵园，寻找辰南的踪迹',
            effect: (player) => {
              return {
                messages: ['你们来到神魔陵园，澹台璇站在一座空墓前，泪如雨下："他果然复活了...万年前的因，今日终于见到了果。"她转身看向你："谢谢你陪我来这一趟。"'],
                intimacyChange: 15,
                reward: '澹台圣地令牌',
              };
            },
          },
        ],
      },
      {
        id: 'tantaixuan_node2',
        title: '七绝之谜',
        requiredIntimacy: 50,
        description: '澹台璇是七绝天女的分魂之一。随着你们关系的深入，她开始向你透露这个秘密，并寻求你的帮助，以应对未来七绝分身合一的宿命。',
        choices: [
          {
            text: '承诺无论发生什么，都会站在她身边',
            effect: (player) => {
              return {
                messages: ['澹台璇眼中闪过一丝感动，这是她万年来第一次露出如此柔软的神情："你可知，到了我这般境界，本不该再动凡心。但你...让我想起了年少时的自己。"她轻轻握住你的手。'],
                intimacyChange: 25,
                reward: '七绝天女秘典残页',
              };
            },
          },
          {
            text: '帮她寻找其他分身，提前做好准备',
            effect: (player) => {
              return {
                messages: ['澹台璇点头："聪明的做法。知己知彼，方能百战不殆。其他分身各有特点，梦可儿是我圣地的当代圣女，楚月身在楚国皇室..."她开始详细分析每一位分身的特点。'],
                intimacyChange: 15,
              };
            },
          },
        ],
      },
      {
        id: 'tantaixuan_node3',
        title: '澹台秘传',
        requiredIntimacy: 200,
        description: '澹台璇决定将自己毕生所学传授给你。这是澹台圣地最高深的秘法，只有她最信任的人才能修习。在传授的过程中，你们的关系也达到了前所未有的亲密。',
        choices: [
          {
            text: '认真修习，不负她所望',
            effect: (player) => {
              return {
                messages: ['你日夜苦练，终于掌握了「澹台神诀」的精髓。澹台璇看着你，眼中满是赞赏："万年了，我终于找到了可以传承衣钵之人。不，不仅是衣钵..."她轻轻靠入你怀中。'],
                intimacyChange: 50,
                reward: '澹台神诀传承',
              };
            },
          },
          {
            text: '更在意她这个人，而非功法',
            effect: (player) => {
              return {
                messages: ['你放下功法，认真地看着她："比起功法，我更在意你。万年的孤独，该结束了。"澹台璇怔住了，万年古井无波的心湖，第一次泛起了剧烈的涟漪。她紧紧抱住你，泪水无声滑落。'],
                intimacyChange: 60,
                reward: '澹台璇的真心',
              };
            },
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
    firstMeeting: '你在天界神殿深处，偶遇了一位正在研读古籍的仙子。她抬头看向你，目光中带着万年沉淀的睿智与一丝好奇："能走到这里的年轻人，不简单。我是澹台璇，你呢？"',
    backgroundStory: '澹台璇是《神墓》中的传奇女子，澹台圣地的创始人，七绝天女分魂之一。万年前受神姬指使封印辰南功力，后创立澹台圣地守护正道。她存活了万年，见证了无数王朝更替、人杰陨落，是天界最负盛名的天骄仙子。她集美与智慧于一身，神秘而强大。万年岁月让她看透了许多，但内心深处依然有着对真挚情感的渴望。',
    personalityTraits: ['智慧深沉', '优雅高贵', '内心孤独', '责任感强', '外冷内热'],
    likes: ['古籍', '清静', '棋艺', '莲花', '茶道'],
    dislikes: ['背叛', '喧嚣', '愚昧', '强迫', '虚伪'],
    favoriteGifts: ['上古古籍', '天界灵茶', '莲花种子', '星辰石', '万年玉简'],
  },
  {
    id: 'daolu_mengkeer',
    name: '梦可儿',
    title: '澹台圣地圣女',
    description: '一位白衣胜雪、仙姿玉骨的女子，容颜倾城，兼具圣洁与心机。她轻踏莲台而来，周身环绕着淡淡的金莲光晕，一颦一笑都恰到好处，让人既生敬畏又生亲近。',
    greeting: '梦可儿转过身来，眼波流转间尽显风情，却又带着一丝圣洁不可侵犯的气质："哦？竟然有人能走到这古墓之前。你是为神魔陵园的秘宝而来，还是...为我而来？"她嘴角微扬。',
    roomId: 'world_city',
    dialogues: dialogues_mengkeer,
    faction: {
      name: '澹台圣地',
      type: DaoLuFactionType.SECT,
      description: '人间界与神墓世界最负盛名的修炼圣地，以女性修士为主，传承金莲心法',
      power: '人间界顶尖',
      location: '人间城',
      leader: '澹台璇',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'mengkeer_node1',
        title: '圣地试炼',
        requiredIntimacy: 0,
        description: '梦可儿作为澹台圣地当代圣女，肩负着寻找太古遗物的使命。她邀请你一同前往神魔陵园深处，寻找与圣地有渊源的传承。',
        choices: [
          {
            text: '欣然同意，与她并肩作战',
            effect: (player) => {
              return {
                messages: ['梦可儿微微一笑："有你在，我便放心许多。"你们一同深入神魔陵园，面对重重危险。在生死之间，你们的默契迅速建立。最终成功取得太古遗物，她看向你的目光中多了一丝柔情。'],
                intimacyChange: 15,
                reward: '太古遗物碎片',
              };
            },
          },
          {
            text: '先考验她的实力，再决定是否同行',
            effect: (player) => {
              return {
                messages: ['梦可儿挑眉，素手一挥，一道凌厉剑气破空而来。你接了三招，她收剑而立："能接我三剑的男子，你是第一个。看来我小看你了。"她眼中闪过一丝赞赏与好奇。'],
                intimacyChange: 10,
              };
            },
          },
        ],
      },
      {
        id: 'mengkeer_node2',
        title: '心魔试炼',
        requiredIntimacy: 50,
        description: '梦可儿修炼「太上忘情录」走火入魔，体内七绝天女的分魂开始躁动。她痛苦不堪，需要有人帮助她稳定心神。',
        choices: [
          {
            text: '以自身灵力帮她镇压心魔',
            effect: (player) => {
              return {
                messages: ['你将灵力输入她体内，与那股暴走的能量对抗。梦可儿紧咬牙关，额头布满汗珠。最终，在你的帮助下，她成功镇压了心魔。她虚弱地靠在你怀中："为什么...为什么要救我？"'],
                intimacyChange: 25,
                reward: '梦可儿的信任',
              };
            },
          },
          {
            text: '带她去百花谷，以自然之力安抚',
            effect: (player) => {
              return {
                messages: ['百花谷的花香与灵气安抚了梦可儿躁动的分魂。她坐在花丛中，渐渐平静下来："这里...让我感觉很舒服。谢谢你，如果不是你，我可能就..."她没有说下去，但眼中的感激不言而喻。'],
                intimacyChange: 20,
              };
            },
          },
        ],
      },
      {
        id: 'mengkeer_node3',
        title: '圣女之心',
        requiredIntimacy: 200,
        description: '经过重重磨难，梦可儿终于对你敞开心扉。作为圣女，她本不该动情，但你的真诚与陪伴，让她违背了圣地的戒律。',
        choices: [
          {
            text: '向她表白心意，不在乎世俗眼光',
            effect: (player) => {
              return {
                messages: ['梦可儿听完你的表白，眼中泪光闪烁："你可知道，圣女的身份对我来说既是荣耀也是枷锁？但我...我愿意为你，打破这枷锁。"她主动握住你的手，金莲在你们脚下绽放。'],
                intimacyChange: 50,
                reward: '圣女之心',
              };
            },
          },
          {
            text: '尊重她的选择，无论她如何决定',
            effect: (player) => {
              return {
                messages: ['梦可儿深深地看着你："你总是这样，从不强迫我，总是尊重我的选择。这份心意，比任何甜言蜜语都让我心动。"她轻靠在你肩头："给我一些时间，我会做出选择。"'],
                intimacyChange: 40,
              };
            },
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
    firstMeeting: '你在人间城的街道上，看到一位白衣女子轻踏莲台从天而降。她落在神魔陵园入口前，转身看向你，目光中带着审视与好奇："你也是要进陵园的吗？一个人太危险，不如结伴？"',
    backgroundStory: '梦可儿是《神墓》中的三大奇女子之一，澹台圣地的当代最杰出传人，七绝天女分身之一。她不同于其他七绝分身，是由天地精气凝聚而成。她心思细腻，善于筹划，本性温柔善良，但身为圣女，又不得不保持圣洁与威严。她与辰南的关系复杂，从敌对到相知，最终成为一家人。在游戏中，她将这份情感的羁绊转移到了玩家身上。',
    personalityTraits: ['心思细腻', '圣洁高贵', '善于筹划', '温柔善良', '内心矛盾'],
    likes: ['莲花', '古琴', '修炼', '清静', '正义'],
    dislikes: ['邪恶', '背叛', '喧嚣', '强迫', '虚伪'],
    favoriteGifts: ['金莲种子', '圣水', '古琴谱', '天界丝绸', '灵石'],
  },
  {
    id: 'daolu_longwu',
    name: '龙舞',
    title: '龙家小姐',
    description: '一位身着碧色长裙的少女，眼瞳中隐有金色竖瞳闪动，周身萦绕着一股淡淡的龙威。她的发间生有小小双角，灵动而神秘。英姿飒爽中又不失少女的娇俏。',
    greeting: '龙舞歪头打量着你，金色竖瞳微微收缩："咦？人类？居然敢一个人在这里晃悠？你胆子不小，不过...脑子可能不太够用。"她嘴角上扬，露出小虎牙。',
    roomId: 'dragon_valley',
    dialogues: dialogues_longwu,
    faction: {
      name: '龙族',
      type: DaoLuFactionType.CLAN,
      description: '太古时期称霸一方的强大种族，虽经大战凋零，但底蕴犹存',
      power: '一方霸主',
      location: '龙谷',
      leader: '龙皇',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'longwu_node1',
        title: '龙族试炼',
        requiredIntimacy: 0,
        description: '龙舞需要完成龙族的成年试炼——进入神魔陵园寻找先辈遗骨。她邀请你一同前往，但警告你这将极其危险。',
        choices: [
          {
            text: '毫不犹豫答应，陪她前往',
            effect: (player) => {
              return {
                messages: ['龙舞眼中闪过一丝感动，但嘴上不饶人："哼，算你有点胆量。不过到时候可别吓得哭鼻子，本小姐可不会保护你...大概。"她别过脸去，耳尖微红。'],
                intimacyChange: 15,
                reward: '龙族护符',
              };
            },
          },
          {
            text: '询问试炼详情，做好万全准备',
            effect: (player) => {
              return {
                messages: ['龙舞点点头："谨慎是好事。龙族试炼需要进入龙墓深处，那里有先辈的龙魂守护。稍有不慎，就会被龙威碾碎。我们需要准备一些抵御龙威的法宝。"'],
                intimacyChange: 10,
              };
            },
          },
        ],
      },
      {
        id: 'longwu_node2',
        title: '寻回遗骨',
        requiredIntimacy: 50,
        description: '在神魔陵园深处，你们找到了龙舞祖父的遗骨。但遗骨被一头远古亡灵守护，你们必须联手击败它。',
        choices: [
          {
            text: '全力以赴，帮她夺回祖父遗骨',
            effect: (player) => {
              return {
                messages: ['战斗异常惨烈，你身上添了数道伤口，但最终成功击败了亡灵。龙舞紧紧抱着祖父的遗骨，泪流满面："谢谢你...这是我龙族的孝道，也是我的心结。从今天起，你就是我龙舞最重要的朋友。"'],
                intimacyChange: 25,
                reward: '龙魂精血',
              };
            },
          },
          {
            text: '用计谋引开亡灵，智取遗骨',
            effect: (player) => {
              return {
                messages: ['你用计引开了亡灵，成功取回遗骨。龙舞看着你，眼中闪着异彩："没想到你不仅胆量大，脑子也挺好使的嘛！"她开心地拍了拍你的肩膀，力道大得让你龇牙咧嘴。'],
                intimacyChange: 20,
              };
            },
          },
        ],
      },
      {
        id: 'longwu_node3',
        title: '龙舞九天',
        requiredIntimacy: 200,
        description: '龙舞在找回祖父遗骨后，龙族血脉进一步觉醒。她邀请你观看她的化龙仪式，这是龙族最神圣的典礼，只有最亲近的人才有资格观礼。',
        choices: [
          {
            text: '为她护法，见证她的蜕变',
            effect: (player) => {
              return {
                messages: ['龙舞在龙谷深处开始化龙仪式。你守在谷口，击退了数波来袭的妖魔。当她完成蜕变，化作一条碧绿神龙腾空而起时，整个龙谷都在颤抖。落地后，她化为人形，紧紧抱住你："谢谢你...我的道侣。"'],
                intimacyChange: 50,
                reward: '龙族秘法·龙舞九天',
              };
            },
          },
          {
            text: '送上祝福，表示会一直陪伴她',
            effect: (player) => {
              return {
                messages: ['龙舞完成化龙后，听到你的祝福，金色竖瞳中闪过温柔："你这人...总是说这些让人心动的话。我龙舞一生，最不缺的就是力量。但我现在发现，有你在身边，比任何力量都让我安心。"'],
                intimacyChange: 45,
              };
            },
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
    firstMeeting: '你在龙谷外围探险时，遇到了一位碧衣少女。她正被一群妖魔围攻，却丝毫不惧，龙威四溢。见你到来，她喊道："喂！那边的人类，看够了没有？要帮忙就快来！"',
    backgroundStory: '龙舞是《神墓》中的龙族少女，率性洒脱，风华绝代，兼具女子的美丽与男儿的英气。她是龙族后辈中的佼佼者，为了寻找战死祖父的遗骨而踏入神魔陵园。龙族在太古大战中几乎被屠戮殆尽，残存的龙族隐居各处，等待复兴时机。龙舞性格直爽，敢爱敢恨，一旦认定的人，便会用生命去守护。',
    personalityTraits: ['率真洒脱', '英姿飒爽', '重情重义', '骄傲自信', '敢爱敢恨'],
    likes: ['战斗', '龙谷', '美食', '自由', '诚实的人'],
    dislikes: ['虚伪', '背叛', '束缚', '怯懦', '欺骗'],
    favoriteGifts: ['龙血草', '龙骨碎片', '碧龙珠', '烈酒', '战甲'],
  },
  {
    id: 'daolu_chuyu',
    name: '楚钰',
    title: '楚国小公主',
    description: '一位容貌精致如精灵的少女，身穿粉色宫装，灵动活泼。她的眼眸如星辰般明亮，睫毛长长，秀鼻挺挺，虽然身形娇小，却透着一股不容忽视的皇家贵气。',
    greeting: '楚钰眨着大眼睛打量你，忽然凑近："喂，你是新来的修士吧？看起来挺有意思的。本公主叫楚钰，你呢？有没有带什么好玩的东西？"她一脸期待地伸出手。',
    roomId: 'world_city',
    dialogues: dialogues_chuyu,
    faction: {
      name: '楚国皇室',
      type: DaoLuFactionType.DYNASTY,
      description: '东方三大帝国之一，实力雄厚，底蕴深厚，皇室中隐藏诸多强者',
      power: '帝国级',
      location: '人间城皇宫',
      leader: '楚王',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'chuyu_node1',
        title: '逃宫计划',
        requiredIntimacy: 0,
        description: '楚钰厌倦了宫中枯燥的生活，想要偷偷溜出宫外探险。她看中了你，觉得你是不错的"保镖"人选。',
        choices: [
          {
            text: '答应带她出宫，但要求她听话',
            effect: (player) => {
              return {
                messages: ['楚钰撅起小嘴："哼，敢对本公主提要求？不过...看在你还算顺眼的份上，勉强答应你。但你要是敢告诉父王，我就...我就哭给你看！"她眼珠一转，露出狡黠的笑容。'],
                intimacyChange: 10,
                reward: '楚国通行令',
              };
            },
          },
          {
            text: '劝她不要任性，宫中更安全',
            effect: (player) => {
              return {
                messages: ['楚钰不满地瞪着你："你也和那些老臣一样无趣！不过...你说得也有道理。"她忽然笑了："但你得每天来陪我玩，不然我就偷跑出去！"'],
                intimacyChange: 5,
              };
            },
          },
        ],
      },
      {
        id: 'chuyu_node2',
        title: '七绝觉醒',
        requiredIntimacy: 50,
        description: '楚钰体内潜藏的七绝天女分魂开始觉醒，她的力量时强时弱，情绪也变得不稳定。作为她最信任的人，你需要帮助她度过这个难关。',
        choices: [
          {
            text: '日夜陪伴，安抚她躁动的情绪',
            effect: (player) => {
              return {
                messages: ['你日夜守在楚钰身边，当她痛苦时握住她的手，当她害怕时轻声安慰。终于，她成功融合了分魂的力量。醒来的第一句话就是："你一直陪着我？...谢谢。"她罕见地露出了脆弱的神情。'],
                intimacyChange: 25,
                reward: '七绝灵力碎片',
              };
            },
          },
          {
            text: '寻找压制分魂的方法，暂缓觉醒',
            effect: (player) => {
              return {
                messages: ['你四处寻找古籍，终于找到了暂缓觉醒的方法。楚钰虽然暂时安全，但分魂的问题并未根本解决。她看着疲惫的你，轻声说："谢谢你...为我做了这么多。"'],
                intimacyChange: 15,
              };
            },
          },
        ],
      },
      {
        id: 'chuyu_node3',
        title: '公主的承诺',
        requiredIntimacy: 200,
        description: '经历了种种磨难，楚钰从一个任性的小公主成长为有担当的女子。她决定向你吐露真心，这是楚国皇室女子一生只能给一次的承诺。',
        choices: [
          {
            text: '接受她的承诺，许下一生的誓言',
            effect: (player) => {
              return {
                messages: ['楚钰将一块玉佩放入你手中："这是我们楚国皇室女子许给心爱之人的信物。我楚钰此生，只认你一人。"她仰起小脸，眼中满是坚定与柔情，再无往日的任性。'],
                intimacyChange: 50,
                reward: '楚国皇室玉佩',
              };
            },
          },
          {
            text: '告诉她无论发生什么，都会守护她',
            effect: (player) => {
              return {
                messages: ['楚钰听完你的话，眼眶微红，却强忍着不让泪水落下："你这个人...总是说这些让人感动的话。好，那我们就说定了，你要守护我一辈子，不许反悔！"她紧紧抱住你。'],
                intimacyChange: 45,
              };
            },
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
    firstMeeting: '你在人间城的集市上，看到一个粉衣少女正和摊贩讨价还价。她买走了一串糖葫芦，转身时差点撞到你。她抬起头，大眼睛忽闪忽闪："喂，你挡到本公主的路了！不过...看你长得还行，就不计较了。"',
    backgroundStory: '楚钰是《神墓》中的楚国小公主，东方三大帝国之一楚国的掌上明珠，容貌精致如精灵，性格古灵精怪，娇蛮可爱。她的深层身份是七绝天女的分魂之一。作为皇室公主，她自幼享受无尽荣宠，却也因此厌倦了宫中枯燥的生活，渴望自由和冒险。与玩家相遇后，她找到了愿意陪伴她、包容她的人，逐渐从任性的小公主成长为有担当的女子。',
    personalityTraits: ['古灵精怪', '娇蛮可爱', '渴望自由', '心地善良', '重情重义'],
    likes: ['糖葫芦', '宫外冒险', '小动物', '漂亮的衣服', '有趣的人'],
    dislikes: ['枯燥的礼仪', '拘束', '虚伪的大臣', '孤独', '被当作小孩'],
    favoriteGifts: ['糖葫芦', '精致发簪', '宫外小吃', '灵宠', '漂亮衣裙'],
  },
  {
    id: 'daolu_chuyue',
    name: '楚月',
    title: '楚国大公主',
    description: '一位身着华贵宫装的女子，气质高贵而沉稳，举手投足间尽显皇家风范。她的眼眸深邃而冷静，仿佛能看透人心。与妹妹楚钰的活泼不同，她身上散发着成熟女性独有的魅力。',
    greeting: '楚月端坐在殿中，目光平静地打量着你："你就是那位最近名声不小的修士？请坐。本宫楚国大公主楚月，今日请你来，是有事相商。"她示意侍女上茶。',
    roomId: 'world_city',
    dialogues: dialogues_chuyue,
    faction: {
      name: '楚国皇室',
      type: DaoLuFactionType.DYNASTY,
      description: '东方三大帝国之一，实力雄厚，皇室中隐藏诸多强者与大能',
      power: '帝国级',
      location: '人间城皇宫',
      leader: '楚王',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'chuyue_node1',
        title: '帝国危机',
        requiredIntimacy: 0,
        description: '楚国面临外敌入侵的危机，楚月作为大公主，必须担起责任。她看中你的实力，邀请你协助楚国度过难关。',
        choices: [
          {
            text: '答应相助，共同抵御外敌',
            effect: (player) => {
              return {
                messages: ['楚月微微点头，露出一丝难得的笑意："有你在，胜算便多了几分。本宫不会亏待有功之人。"她起身，向你伸出手："合作愉快。"她的手掌温暖而有力。'],
                intimacyChange: 15,
                reward: '楚国将军令牌',
              };
            },
          },
          {
            text: '询问报酬，再决定是否出手',
            effect: (player) => {
              return {
                messages: ['楚月眼中闪过一丝欣赏："聪明人。本宫欣赏直来直往的人。报酬自然不会少——灵石、法宝、功法，只要你开口。不过本宫更希望你是因为认可楚国，而非单纯的利益。"'],
                intimacyChange: 10,
              };
            },
          },
        ],
      },
      {
        id: 'chuyue_node2',
        title: '魂魄之谜',
        requiredIntimacy: 50,
        description: '楚月发现自己的魂魄并不完整，缺少的那一部分似乎与某位神秘女子有关。她需要你帮助她寻找真相。',
        choices: [
          {
            text: '陪她寻找纳兰若水，解开魂魄之谜',
            effect: (player) => {
              return {
                messages: ['你们找到了纳兰若水。当两人相见时，竟同时产生了一种奇异的感觉——她们的魂魄在共鸣！原来，楚月与纳兰若水共同组成了七绝天女的第七道分魂。得知真相后，楚月看你的目光复杂："原来你一直都知道...谢谢你陪我面对。"'],
                intimacyChange: 25,
                reward: '完整七绝魂印',
              };
            },
          },
          {
            text: '帮她查阅古籍，寻找其他方法补全魂魄',
            effect: (player) => {
              return {
                messages: ['你翻阅无数古籍，终于找到了一种不用融合他人，自行补全魂魄的方法。虽然过程漫长，但楚月可以保留独立的人格。她感激地看着你："谢谢你...让我有了选择的权利。"'],
                intimacyChange: 20,
              };
            },
          },
        ],
      },
      {
        id: 'chuyue_node3',
        title: '月下之誓',
        requiredIntimacy: 200,
        description: '在一个月圆之夜，楚月邀请你登上楚国皇宫的最高处。她告诉你，从小到大，她从未对任何人敞开心扉，但你是例外。',
        choices: [
          {
            text: '握住她的手，许下守护一生的誓言',
            effect: (player) => {
              return {
                messages: ['楚月望着圆月，轻声道："生在皇家，我从小就被教导不能信任任何人。但你...让我破例了。"她转头看向你，眼中是前所未有的柔软："今夜之誓，永不相负。"'],
                intimacyChange: 50,
                reward: '楚国大公主的信物',
              };
            },
          },
          {
            text: '告诉她，你欣赏的是她这个人，而非公主身份',
            effect: (player) => {
              return {
                messages: ['楚月听完，嘴角微微上扬，这是她第一次真心实意地笑："从小到大，所有人都因为我是公主而接近我。你是第一个...只看中楚月这个人的人。"她轻轻靠在你肩头。'],
                intimacyChange: 45,
              };
            },
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
    firstMeeting: '你在人间城的客栈中，被一位宫装女子拦住。她自称是楚国大公主，有要事相商。你跟随她进入一处密室，她转身看你，目光冷静而审视："修士，本宫看中你的实力，可愿为楚国效力？"',
    backgroundStory: '楚月是《神墓》中的楚国大公主，七绝天女第七魂之半魂转世之身。她行事果断，深谙权谋，作为一国公主无可厚非。在楚国皇宫的尔虞我诈中长大，她学会了不轻易信任任何人。但她内心深处，依然渴望一份真挚的情感。与玩家相遇后，她逐渐被对方的真诚与实力打动，最终卸下心防。',
    personalityTraits: ['沉稳冷静', '深谋远虑', '外冷内热', '责任心强', '渴望真情'],
    likes: ['权谋', '茶道', '古籍', '月色', '忠诚的人'],
    dislikes: ['背叛', '愚蠢', '虚伪', '喧闹', '被利用'],
    favoriteGifts: ['古玉', '名茶', '兵法典籍', '月华石', '宫廷绸缎'],
  },
  {
    id: 'daolu_nalanruoshui',
    name: '纳兰若水',
    title: '医学天才',
    description: '一位身着素雅白衣的女子，气质出尘，给人一种岁月静好的感觉。她并非绝色佳人，但胜在气质温婉，手中总是提着一个药箱，身上散发着淡淡的药香。',
    greeting: '纳兰若水抬起头，温和一笑："你是来看病的吗？请坐，我先帮你把把脉。"她取出一块丝帕垫在你的手腕上，动作轻柔而专业。',
    roomId: 'world_city',
    dialogues: dialogues_nalanruoshui,
    faction: {
      name: '奇士府',
      type: DaoLuFactionType.SECT,
      description: '楚国招揽天下奇人异士之所，纳兰若水为其中挂职医官',
      power: '一方势力',
      location: '人间城',
      leader: '府主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'nalan_node1',
        title: '瘟疫之灾',
        requiredIntimacy: 0,
        description: '人间城突发瘟疫，无数百姓染病。纳兰若水日夜救治，却人手不足。她请求你的帮助。',
        choices: [
          {
            text: '立刻帮忙，不分昼夜救治百姓',
            effect: (player) => {
              return {
                messages: ['你与纳兰若水并肩作战三天三夜，终于控制了瘟疫。她疲惫地擦去额头的汗水，看向你："谢谢你...我见过太多修士只顾自己修炼，从不关心凡人死活。你不一样。"她眼中闪过一丝异样的光芒。'],
                intimacyChange: 20,
                reward: '瘟疫解方',
              };
            },
          },
          {
            text: '帮她寻找瘟疫源头，从根本上解决问题',
            effect: (player) => {
              return {
                messages: ['你追踪瘟疫源头，发现是一头妖魔作祟。斩杀妖魔后，瘟疫自然消退。纳兰若水听完你的报告，佩服地点头："标本兼治，这才是医者该有的思维。"'],
                intimacyChange: 15,
              };
            },
          },
        ],
      },
      {
        id: 'nalan_node2',
        title: '天使之忆',
        requiredIntimacy: 50,
        description: '纳兰若水开始频繁梦见自己长着翅膀在天空战斗。她怀疑自己真的是西方斗战天使转世，为此感到困惑和恐惧。',
        choices: [
          {
            text: '陪她面对，告诉她无论前世如何，今生她只是纳兰若水',
            effect: (player) => {
              return {
                messages: ['纳兰若水听完你的话，泪光闪烁："你说得对...前世如何，与今生的我何干？我纳兰若水，只是楚国的一名医者。"她释然一笑，那笑容如春风拂面，让你心神一荡。'],
                intimacyChange: 25,
                reward: '斗战天使之羽',
              };
            },
          },
          {
            text: '帮她寻找解除前世记忆的方法',
            effect: (player) => {
              return {
                messages: ['你四处寻找方法，最终帮她封印了部分前世记忆。纳兰若水感觉轻松了许多："虽然那些记忆还在，但不再困扰我了。谢谢你...让我能专心做自己想做的事。"'],
                intimacyChange: 15,
              };
            },
          },
        ],
      },
      {
        id: 'nalan_node3',
        title: '若水之心',
        requiredIntimacy: 200,
        description: '经历了瘟疫与前世记忆的事件后，纳兰若水对你的感情已经超越了普通朋友。她决定向你表明心迹。',
        choices: [
          {
            text: '告诉她，你愿做她一生的病人',
            effect: (player) => {
              return {
                messages: ['纳兰若水"噗嗤"一笑，随即正色道："我可不想你生病。但我想...让你一直陪在我身边。医者仁心，但我的心，只给你一人。"她主动握住你的手，药香萦绕。'],
                intimacyChange: 50,
                reward: '若水医心',
              };
            },
          },
          {
            text: '认真回应她的感情，许下承诺',
            effect: (player) => {
              return {
                messages: ['纳兰若水听完你的承诺，温柔地笑了："我这一生，救人无数，却从未想过自己也会被拯救。是你让我明白，医者也需要有人陪伴。"她轻轻靠在你怀中。'],
                intimacyChange: 45,
              };
            },
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
    firstMeeting: '你在人间城的医馆中，看到一位白衣女子正在为一个受伤的孩童包扎伤口。她动作轻柔，神情专注。处理完伤口后，她抬头看到你，温和一笑："你也是来看病的吗？"',
    backgroundStory: '纳兰若水是《神墓》中的奇女子，楚国左丞相纳兰文成之女，在奇士府中挂职医生。她是西方斗战天使的转世之身，但今生的她只想过平凡的生活，用医术救人。她虽非绝色佳人，但胜在气质出尘，给人一种岁月静好的感觉。她性格温和善良，从不与人争抢，却有着坚定的内心。与玩家相遇后，她找到了可以托付终身的人。',
    personalityTraits: ['温柔善良', '宁静淡泊', '医术高超', '内心坚定', '善解人意'],
    likes: ['草药', '医术', '救人', '宁静', '真诚的人'],
    dislikes: ['杀戮', '纷争', '虚伪', '喧闹', '见死不救'],
    favoriteGifts: ['珍稀草药', '医书', '玉制药箱', '灵泉水', '丝巾'],
  },
  {
    id: 'daolu_chenxi',
    name: '晨曦',
    title: '精灵圣女',
    description: '一位气质清新纯净的少女，仿佛雨馨生命之气所化。她的肌肤如玉，眼眸清澈见底，周身散发着淡淡的自然气息。她站在花丛中，与周围的花草树木融为一体，宛如自然精灵。',
    greeting: '晨曦从花丛中抬起头，露出纯净的笑容："你好呀！这些花儿今天开得好漂亮，你看！"她举起一朵刚摘下的小花，阳光洒在她脸上，仿佛整个人都在发光。',
    roomId: 'dragon_valley',
    dialogues: dialogues_chenxi,
    faction: {
      name: '精灵族',
      type: DaoLuFactionType.MONSTER,
      description: '亲近自然的古老种族，守护生命与自然的平衡，居住在神秘的精灵森林',
      power: '隐世强族',
      location: '龙谷外围森林',
      leader: '精灵女王',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'chenxi_node1',
        title: '生命之树',
        requiredIntimacy: 0,
        description: '精灵族的圣地生命之树开始枯萎，晨曦焦急万分。她需要寻找拥有纯净灵力的人帮助她救治生命之树。',
        choices: [
          {
            text: '毫不犹豫地输送灵力，救治生命之树',
            effect: (player) => {
              return {
                messages: ['你将自身灵力源源不断地输入生命之树。晨曦在一旁紧张地看着，当生命之树重新焕发生机时，她喜极而泣，扑入你怀中："谢谢你！你是我们精灵族的大恩人！"'],
                intimacyChange: 20,
                reward: '生命之树的馈赠',
              };
            },
          },
          {
            text: '帮她寻找枯萎的原因，从根本上解决',
            effect: (player) => {
              return {
                messages: ['你发现生命之树枯萎是因为地底灵脉被污染。清除污染源后，生命之树自然恢复。晨曦崇拜地看着你："你好聪明！不仅力量强大，还懂得找原因。"'],
                intimacyChange: 15,
              };
            },
          },
        ],
      },
      {
        id: 'chenxi_node2',
        title: '灵魂共鸣',
        requiredIntimacy: 50,
        description: '晨曦发现自己与一个叫"雨馨"的女子有着神秘的联系。她体内似乎蕴含着对方的部分灵魂。这个发现让她困惑不已。',
        choices: [
          {
            text: '带她寻找雨馨，解开灵魂之谜',
            effect: (player) => {
              return {
                messages: ['你们找到了雨馨。当晨曦与雨馨相见时，两人之间产生了奇异的灵魂共鸣。原来，晨曦是雨馨在百花谷留下的灵魂种子所化。得知真相后，晨曦虽然有些失落，但很快释然："不管我是谁，我现在只是晨曦。而你，是我最重要的人。"'],
                intimacyChange: 25,
                reward: '灵魂种子',
              };
            },
          },
          {
            text: '告诉她，无论她是谁，你都喜欢现在的她',
            effect: (player) => {
              return {
                messages: ['晨曦听完你的话，眼中泪光闪烁，却笑得无比灿烂："真的吗？我不管前世如何，今生我只是晨曦。但听到你这么说，我好开心..."她紧紧抱住你，不愿松手。'],
                intimacyChange: 20,
              };
            },
          },
        ],
      },
      {
        id: 'chenxi_node3',
        title: '精灵之誓',
        requiredIntimacy: 200,
        description: '晨曦决定向你表白。作为精灵圣女，她的一生本应奉献给自然与族人。但你的出现，让她第一次有了"自私"的想法。',
        choices: [
          {
            text: '接受她的爱，愿意与她一起守护自然',
            effect: (player) => {
              return {
                messages: ['晨曦将一片翠绿的树叶放入你手中："这是生命之树的叶子，代表精灵族最神圣的誓言。我晨曦，愿与你共度此生，一起守护这片天地。"她踮起脚尖，在你脸颊轻轻一吻。'],
                intimacyChange: 50,
                reward: '精灵圣女的誓言',
              };
            },
          },
          {
            text: '告诉她，你会一直陪在她身边',
            effect: (player) => {
              return {
                messages: ['晨曦听完，眼中满是幸福的光芒："我从小就没有父母，是精灵族养大的。我以为自己不会有家...但现在，有你在的地方，就是我的家。"她依偎在你怀中，如一只归巢的小鸟。'],
                intimacyChange: 45,
              };
            },
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
    firstMeeting: '你在龙谷外围的森林中迷路，看到一位少女正在和一只小鹿说话。她似乎能听懂鹿的语言，轻轻抚摸鹿的脑袋。你走近时，她抬起头，露出比阳光还灿烂的笑容："你也是来找花儿的吗？"',
    backgroundStory: '晨曦是《神墓》中的精灵圣女，雨馨在百花谷留下的灵魂种子所化。她清新纯净，拥有自然精灵般的美貌，天生能与花草树木沟通。她被精灵族抚养长大，成为精灵族的圣女，肩负着守护自然与生命的使命。她对世界充满好奇与善意，像一张白纸般纯净。与玩家相遇后，她第一次体验到了爱情的美好。',
    personalityTraits: ['纯净天真', '善良温柔', '亲近自然', '乐观开朗', '感恩之心'],
    likes: ['花草', '小动物', '阳光', '森林', '善良的人'],
    dislikes: ['杀戮', '污染', '虚伪', '黑暗', '伤害生命'],
    favoriteGifts: ['花种', '灵泉', '小动物', '自然晶石', '手工花环'],
  },
];
