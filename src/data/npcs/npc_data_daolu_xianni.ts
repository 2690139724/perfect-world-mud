import { IDaoLu, DaoLuFactionType, DUAL_CULTIVATION_POSE_TEMPLATES, DAO_LU_INTERACTION_TEMPLATES } from '../../domain/entities/DaoLu';
import { INPCDialogue } from '../../domain/entities/NPC';

const xianniDialogues: Record<string, INPCDialogue[]> = {
  limuwan: [
    { id: 'limuwan_alchemy', topic: '请教炼丹', text: '"炼丹之道，在于心静。"李慕婉轻抚丹炉，温婉一笑："这炉养元丹还需三个时辰，你若不急，可以陪我等等。"' },
    { id: 'limuwan_yuntian', topic: '询问云天宗', text: '"云天宗虽不是朱雀星顶尖宗门，却以丹道闻名。"李慕婉望向远处云海："我在这里修行多年，早已将宗门当作了家。"' },
    { id: 'limuwan_wanglin', topic: '提起王林', text: '"你……你也认识他？"李慕婉眸中泛起柔光，声音轻如蚊呐："那个木头，总是不言不语，却把所有事都藏在心里……"' },
  ],
  mubingmei: [
    { id: 'mubingmei_kunxu', topic: '询问昆虚', text: '"昆虚之境，乃是联盟星域至高圣地。"木冰眉声音清冷，如寒泉击石："我身为昆虚圣女，自当以守护道统为己任。"' },
    { id: 'mubingmei_dao', topic: '探讨大道', text: '"大道无情，人心有情。"木冰眉轻叹一声，眸中闪过复杂："我曾以为可以斩断一切，却终究逃不过一个情字。"' },
    { id: 'mubingmei_battle', topic: '谈论修行', text: '"昆虚传承博大精深，讲究以冰入道，冻结万物。"木冰眉抬手凝出一朵冰莲："你看，这便是昆虚冰魄，可封天地。"' },
  ],
  liqianmei: [
    { id: 'liqianmei_lanmeng', topic: '询问蓝梦道尊', text: '"父亲大人是蓝丝族之主，修为通天。"李倩梅提起父亲，眼中满是崇敬："他常说，修道之人最重本心，不可忘乎所以。"' },
    { id: 'liqianmei_music', topic: '欣赏琴音', text: '"这是我蓝丝族的古曲《梦归处》。"李倩梅拨动琴弦，音色空灵："每一个音符，都承载着族人对故乡的思念。"' },
    { id: 'liqianmei_sacrifice', topic: '谈论牺牲', text: '"为了你，我愿意付出一切。"李倩梅轻声道，目光坚定："哪怕是本命精血，哪怕是……魂魄。"' },
  ],
  hongdie: [
    { id: 'hongdie_zhuque', topic: '询问朱雀星', text: '"朱雀星乃四级修真星，天骄辈出。"红蝶傲然抬头："我红蝶自幼便是雪域国第一天骄，同阶之中从无败绩！"' },
    { id: 'hongdie_rivalry', topic: '谈论对手', text: '"王林……他是我此生最大的对手。"红蝶握紧双拳，美眸中战意燃烧："也是唯一一个，让我心服口服的人。"' },
    { id: 'hongdie_snow', topic: '谈论雪域', text: '"雪域国终年飘雪，万里冰封。"红蝶望向远方，目光悠远："那里的雪，比任何地方的都要纯净。"' },
  ],
  xizifeng: [
    { id: 'xizifeng_luotian', topic: '询问罗天星域', text: '"罗天星域浩瀚无垠，修士如过江之鲫。"西子凤轻摇折扇："我西子家虽非顶尖，却也有几分薄名。"' },
    { id: 'xizifeng_trade', topic: '谈论交易', text: '"在罗天星域，没有什么是不能交易的。"西子凤狡黠一笑："情报、法宝、甚至……人情，都可以明码标价。"' },
    { id: 'xizifeng_adventure', topic: '邀请探险', text: '"探险？本小姐最擅长这个！"西子凤眼睛一亮："我知道一处上古遗迹，里面可能有传承，去不去？"' },
  ],
  yaoxuexue: [
    { id: 'yaoxuexue_blood', topic: '询问血祖', text: '"父亲是罗天星域血祖，修为滔天。"姚惜雪眼中闪过黯然："可那又如何？他眼中只有力量，从没有我这个女儿。"' },
    { id: 'yaoxuexue_prison', topic: '谈论过往', text: '"那段被囚禁的日子，是我一生最黑暗的时光。"姚惜雪声音微颤："是你……让我重新看见了光。"' },
    { id: 'yaoxuexue_future', topic: '展望未来', text: '"我不想再做血祖之女，我只想……做我自己。"姚惜雪抬起头，目光逐渐坚定："你能帮我吗？"' },
  ],
  siqu: [
    { id: 'siqu_wang', topic: '询问王家', text: '"王家曾是朱雀星赵国的凡人家族，因出了王林老祖而一飞冲天。"司秋温婉道："我能入修仙之路，全赖老祖余荫。"' },
    { id: 'siqu_memory', topic: '谈论老祖', text: '"老祖的传说太多了，每一件都惊心动魄。"司秋眼中闪着星光："我虽未曾亲眼见过他，却一直以他为榜样。"' },
    { id: 'siqu_cultivation', topic: '探讨修炼', text: '"我的资质普通，只能以勤补拙。"司秋不好意思地笑笑："若能得你指点，定当感激不尽。"' },
  ],
  liumei: [
    { id: 'liumei_qianhuan', topic: '询问千幻宗', text: '"千幻宗修炼千幻无情道，讲究断情绝欲。"柳眉声音平淡，不带一丝感情："有情皆孽，无情方为正途。"' },
    { id: 'liumei_illusion', topic: '谈论幻术', text: '"幻术之道，在于攻心。"柳眉眸中闪过一丝幽光："若能让人自愿沉浸在幻境中，何须强行操控？"' },
    { id: 'liumei_past', topic: '谈论过去', text: '"我曾以为，这世上没有人能让我动容。"柳眉转头看你，目光复杂："直到遇见了你……这是劫，还是缘？"' },
  ],
  hujuan: [
    { id: 'hujuan_demon', topic: '询问妖灵之地', text: '"妖灵之地是界外之所，强者生存，弱者沦为血食。"胡娟神色凝重："能在那里活下来，本身就是一种修行。"' },
    { id: 'hujuan_beast', topic: '谈论妖兽', text: '"妖兽并非无情，只是不善表达。"胡娟轻抚一只小兽："你看它，多乖巧。只要以诚相待，妖兽亦可为友。"' },
    { id: 'hujuan_survival', topic: '探讨生存', text: '"在妖灵之地，每一天都是生死之间。"胡娟展颜一笑，带着几分野性："但我喜欢这种刺激，平淡的生活反而不适合我。"' },
  ],
  simaqin: [
    { id: 'simaqin_wanderer', topic: '询问散修生活', text: '"散修虽无宗门依靠，却也无拘无束。"司马琴洒脱一笑："天地为家，四海为客，何等逍遥？"' },
    { id: 'simaqin_luotian', topic: '谈论罗天星域', text: '"罗天星域的散修多如繁星，想要出头难如登天。"司马琴目光灼灼："但我相信，终有一日，我会让所有人记住我的名字。"' },
    { id: 'simaqin_dao', topic: '探讨琴道', text: '"我修的乃是琴道，以音入道，以乐化形。"司马琴轻拨琴弦："一曲肝肠断，天涯何处觅知音？"' },
  ],
};

export const XIANNI_DAOLU: IDaoLu[] = [
  {
    id: 'daolu_limuwan',
    name: '李慕婉',
    title: '云天丹仙',
    description: '一位身着淡青色长裙的女子，气质温婉如水，眉目间带着淡淡的忧愁。她手持一柄玉质丹勺，周身萦绕着淡淡的药香，令人心神宁静。',
    greeting: '李慕婉转过身，眸中闪过一丝惊喜："你来了。我刚炼制了一炉养元丹，正想请你品鉴。"',
    roomId: 'xianni_yuntian_sect',
    dialogues: xianniDialogues.limuwan,
    faction: {
      name: '云天宗',
      type: DaoLuFactionType.SECT,
      description: '云天宗是朱雀星楚国境内的三级修真宗门，以丹道闻名于世。宗门内有一座丹峰，终年药香弥漫，是炼丹师的圣地。',
      power: '楚国顶尖丹道宗门',
      location: '朱雀星楚国云天山脉',
      leader: '云天宗主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'limuwan_story_1',
        title: '丹峰初遇',
        requiredIntimacy: 0,
        description: '你在云天宗丹峰采药时遇见了正在炼丹的李慕婉。她的丹炉突然炸炉，危急时刻你出手相助，替她挡下了飞溅的丹火。',
        choices: [
          {
            text: '不顾伤势，先问她是否安好',
            effect: (player) => ({ messages: ['你顾不上自己的伤势，连忙询问她是否受伤。李慕婉看着你灼伤的手臂，眼眶微红："你这人……怎么先关心我？我……我帮你上药。"'], intimacyChange: 15, reward: '养元丹三枚' }),
          },
          {
            text: '帮她收拾丹炉残骸',
            effect: (player) => ({ messages: ['你默默帮她收拾散落的丹炉碎片。李慕婉轻声道："多谢道友相助，这炉丹药毁了便毁了，人没事就好。"'], intimacyChange: 8 }),
          },
        ],
      },
      {
        id: 'limuwan_story_2',
        title: '月下传丹道',
        requiredIntimacy: 50,
        description: '李慕婉邀你月下论丹道。她向你展示了云天宗不传之秘"凝丹十三诀"，问你愿不愿意陪她一起钻研。',
        choices: [
          {
            text: '欣然答应，彻夜论道',
            effect: (player) => ({ messages: ['你们从月升谈到月落，丹道见解不谋而合。李慕婉望着你，眸中星光闪烁："从来没有人能与我论丹到这种程度……你，很特别。"'], intimacyChange: 20, reward: '凝丹十三诀感悟' }),
          },
          {
            text: '谦虚推辞，不敢窥视宗门秘术',
            effect: (player) => ({ messages: ['你婉言推辞，李慕婉却微微一笑："无妨，我相信你。"她执意将口诀传授于你，让你心中感动不已。'], intimacyChange: 12 }),
          },
        ],
      },
      {
        id: 'limuwan_story_3',
        title: '寿元之劫',
        requiredIntimacy: 200,
        description: '李慕婉因早年炼丹透支寿元，如今生机枯竭，容颜渐衰。她不愿拖累你，欲悄然离去。',
        choices: [
          {
            text: '立下誓言，寻遍天下也要救她',
            effect: (player) => ({ messages: ['你紧紧握住她的手，立下重誓。李慕婉泪如雨下："傻瓜……我不过是一介丹修，值得你如此吗？"你坚定地点头，她终是扑入你怀中，泣不成声。'], intimacyChange: 30, reward: '生死同心契' }),
          },
          {
            text: '带她寻访名医，共寻续命之法',
            effect: (player) => ({ messages: ['你带她踏遍千山万水，寻访续命之法。李慕婉靠在你肩头，虚弱却幸福："就算……就算寻不到，能与你走完这一程，我也无憾了。"'], intimacyChange: 25, reward: '续命丹方' }),
          },
        ],
      },
      {
        id: 'limuwan_story_4',
        title: '轮回再续',
        requiredIntimacy: 500,
        description: '历经千辛万苦，你终于寻得复活之法。在轮回之中，你们再续前缘，李慕婉重生归来，与你结为道侣。',
        choices: [
          {
            text: '执子之手，生生世世',
            effect: (player) => ({ messages: ['轮回之光中，李慕婉重生归来，容颜依旧，只是眸中多了千年思念。她扑入你怀中，泪中带笑："这一世，换我守着你。"'], intimacyChange: 100, reward: '轮回同心印' }),
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
    firstMeeting: '云天宗丹峰之上，丹香弥漫。你循着药香走去，只见一名青衣女子正专注地控制着丹火。突然丹炉一震，火焰暴涨，你本能地冲上前去——这一挡，便挡出了一段跨越生死的情缘。',
    backgroundStory: '李慕婉，云天宗丹道天才，自幼便在丹峰修行。她性格温婉善良，对丹道有着超凡的执着与天赋。多年前为了救宗门弟子，她不惜透支自身寿元炼制禁丹，导致生机受损。她本以为自己会在丹峰孤独终老，直到你的出现，让她重新燃起了对生命的渴望。于她而言，你是比任何仙丹都要珍贵的存在。',
    personalityTraits: ['温婉善良', '执着坚韧', '多愁善感', '丹道痴人'],
    likes: ['炼丹制药', '月下静思', '药香弥漫之地', '温润如玉之人'],
    dislikes: ['打打杀杀', '寿元流逝', '成为负担', '离别之苦'],
    favoriteGifts: ['珍稀丹方', '上品丹炉', '延寿灵草', '青色素裙'],
  },
  {
    id: 'daolu_mubingmei',
    name: '木冰眉',
    title: '昆虚圣女',
    description: '一位身着冰蓝色长裙的女子，气质冷若冰霜，眉目如画却带着拒人千里的寒意。她周身缭绕着淡淡的冰雾，每一步落下都有冰莲绽放。',
    greeting: '木冰眉缓缓转身，冰眸中闪过一丝波动："你来了。昆虚的月色，今夜格外清冷。"',
    roomId: 'xianni_kunxu_palace',
    dialogues: xianniDialogues.mubingmei,
    faction: {
      name: '昆虚之境',
      type: DaoLuFactionType.SECT,
      description: '昆虚之境是联盟星域最顶尖的势力之一，传承自远古昆虚道人。昆虚弟子修炼冰系神通，以无情入道，追求极致的冰冷与纯粹。',
      power: '联盟星域至高圣地',
      location: '联盟星域昆虚星',
      leader: '昆虚老祖',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'mubingmei_story_1',
        title: '昆虚冰宫初见',
        requiredIntimacy: 0,
        description: '你在联盟星域历练时误入昆虚之境，在冰宫深处遇见了正在修炼的木冰眉。她误以为你是入侵者，出手便是杀招。',
        choices: [
          {
            text: '不闪不避，以诚心化解误会',
            effect: (player) => ({ messages: ['你不闪不避，任由冰刃抵在咽喉。木冰眉眉头微蹙，收回了神通："你不怕死？"你坦然回答，她冰眸中闪过一丝异样："有趣……你走吧，下次便不会留情。"'], intimacyChange: 15, reward: '昆虚冰晶' }),
          },
          {
            text: '化解攻势，表明来意',
            effect: (player) => ({ messages: ['你施展神通化解了她的攻势，并表明自己只是迷路。木冰眉冷冷道："昆虚之境不是你能来的地方，我送你出去。"'], intimacyChange: 5 }),
          },
        ],
      },
      {
        id: 'mubingmei_story_2',
        title: '冰心试炼',
        requiredIntimacy: 50,
        description: '木冰眉告诉你，昆虚圣女需历冰心试炼，斩断一切情感。她问你，情之一字，真的值得执念吗？',
        choices: [
          {
            text: '深情款款，告诉她情比道重',
            effect: (player) => ({ messages: ['你凝视着她的双眸，将心中所想尽数倾诉。木冰眉冰冷的面具出现一丝裂痕，她别过脸去："胡说……情之一字，最是误人。"可她的耳尖，却悄悄红了。'], intimacyChange: 20, reward: '冰心共鸣' }),
          },
          {
            text: '尊重她的道，默默守护',
            effect: (player) => ({ messages: ['你没有强行辩驳，只是静静地陪在她身边。木冰眉轻声道："你……为什么不劝我？"你笑而不答，她沉默良久，轻叹一声。'], intimacyChange: 12 }),
          },
        ],
      },
      {
        id: 'mubingmei_story_3',
        title: '昆虚之变',
        requiredIntimacy: 200,
        description: '昆虚之境遭遇大劫，强敌来犯。木冰眉为守护宗门，不惜燃烧本源施展禁术。你挺身而出，与她并肩作战。',
        choices: [
          {
            text: '挡在她身前，替她承受致命一击',
            effect: (player) => ({ messages: ['你毫不犹豫地挡在她身前，替她承受了那致命一击。木冰眉抱着重伤的你，泪落如冰："为什么……为什么要为我做到这一步……你死了，我修这道又有何用！"'], intimacyChange: 30, reward: '昆虚守护印记' }),
          },
          {
            text: '与她联手，共抗强敌',
            effect: (player) => ({ messages: ['你们联手施展合击之术，击退了强敌。战后，木冰眉看着你，第一次露出了真心的笑容："有你并肩，真好。"'], intimacyChange: 20, reward: '冰火同源感悟' }),
          },
        ],
      },
      {
        id: 'mubingmei_story_4',
        title: '冰融雪消',
        requiredIntimacy: 500,
        description: '大劫过后，木冰眉放弃圣女之位，在昆虚镜前立下誓言，愿与你共参大道，不再孤冷一生。',
        choices: [
          {
            text: '拥她入怀，许她一世温暖',
            effect: (player) => ({ messages: ['你轻轻将她拥入怀中，用体温融化她周身的冰霜。木冰眉闭上眼，泪水滑落："从今以后，我只为你一人……绽放。"'], intimacyChange: 100, reward: '昆虚同心契' }),
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
    firstMeeting: '昆虚冰宫深处，万年玄冰散发着刺骨寒意。你误入此地，只见一名蓝衣女子盘坐于冰莲之上，周身冰雾缭绕。她睁开眼眸，那一眼，仿佛冻结了时光。',
    backgroundStory: '木冰眉，昆虚之境当代圣女，自幼便被寄予厚望。她修炼昆虚冰心诀，追求无情大道，以为可以斩断一切情缘。然而你的出现，如一道暖阳照进她冰封的世界。她曾在道与情之间挣扎，最终明白，真正的大道并非无情，而是历经情劫后依然坚定的心。',
    personalityTraits: ['外冷内热', '高傲执着', '情深义重', '不善表达'],
    likes: ['月下独舞', '冰莲盛开', '清净之地', '真诚之人'],
    dislikes: ['虚伪奉承', '强迫逼迫', '背叛欺骗', '喧嚣纷扰'],
    favoriteGifts: ['万年玄冰', '冰系功法', '蓝色长裙', '古琴'],
  },
  {
    id: 'daolu_liqianmei',
    name: '李倩梅',
    title: '蓝梦仙子',
    description: '一位身着淡蓝色纱裙的女子，气质空灵出尘，宛如梦中走来。她怀抱一张古琴，发丝间点缀着蓝色的梦丝花，每一步都似踏在云端。',
    greeting: '李倩梅停下抚琴，抬眸看你，眸中带着几分温柔与思念："你来了。我新学了一首曲子，要听吗？"',
    roomId: 'xianni_lanmeng_star',
    dialogues: xianniDialogues.liqianmei,
    faction: {
      name: '蓝丝族',
      type: DaoLuFactionType.CLAN,
      description: '蓝丝族是蓝梦星域的大族，族人以梦入道，擅长音律与幻术。蓝梦道尊是族中至高存在，修为通天彻地。',
      power: '蓝梦星域主宰族群',
      location: '蓝梦星域蓝丝族祖地',
      leader: '蓝梦道尊',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'liqianmei_story_1',
        title: '蓝梦湖畔初见',
        requiredIntimacy: 0,
        description: '你在蓝梦星游历，于湖畔听见一阵空灵琴音。循声而去，看见了正在抚琴的李倩梅。她见你到来，琴音戛然而止。',
        choices: [
          {
            text: '称赞琴音，请求再奏一曲',
            effect: (player) => ({ messages: ['你由衷称赞她的琴艺。李倩梅微微一笑："你是第一个听懂我琴音的人……好，我再为你弹一曲。"'], intimacyChange: 15, reward: '琴音感悟' }),
          },
          {
            text: '静静聆听，不打扰她的雅兴',
            effect: (player) => ({ messages: ['你静静站在一旁，等她弹完。李倩梅收起古琴，轻声道："你很懂礼数，坐下喝杯茶吧。"'], intimacyChange: 8 }),
          },
        ],
      },
      {
        id: 'liqianmei_story_2',
        title: '梦丝之赠',
        requiredIntimacy: 50,
        description: '李倩梅取出一缕本命梦丝，欲赠予你。梦丝是蓝丝族修士最重要的本源之物，赠出梦丝意味着托付终身。',
        choices: [
          {
            text: '郑重接过，许诺不负',
            effect: (player) => ({ messages: ['你郑重地接过梦丝，小心翼翼地收好。李倩梅眼眶微红："这是我最重要的一缕梦丝……从此，我的梦里有你。"'], intimacyChange: 25, reward: '本命梦丝' }),
          },
          {
            text: '婉言谢绝，不愿她损伤本源',
            effect: (player) => ({ messages: ['你婉言谢绝，不愿她损伤本源。李倩梅却执意相赠："你值得。"她轻轻将梦丝系在你的手腕上，笑容如花。'], intimacyChange: 15 }),
          },
        ],
      },
      {
        id: 'liqianmei_story_3',
        title: '血魂献祭',
        requiredIntimacy: 200,
        description: '你遭遇生死大劫，命悬一线。李倩梅不惜以自身精血和魂魄为代价，施展蓝丝族禁术"梦魂归"，欲救你性命。',
        choices: [
          {
            text: '强行阻止，宁死不愿她牺牲',
            effect: (player) => ({ messages: ['你强撑着阻止她，宁死也不愿她牺牲。李倩梅泪如雨下："你若死了，我活着还有什么意义！"最终你们共同施术，渡过了劫难。'], intimacyChange: 30, reward: '梦魂同心' }),
          },
          {
            text: '接受她的牺牲，发誓永生不负',
            effect: (player) => ({ messages: ['你接受了她的献祭，重焕生机。你跪在她面前，立下重誓。李倩梅虚弱地笑笑："别发誓……我信你。"'], intimacyChange: 25, reward: '蓝梦守护' }),
          },
        ],
      },
      {
        id: 'liqianmei_story_4',
        title: '梦归处有你在',
        requiredIntimacy: 500,
        description: '劫难过后，李倩梅虽元气大损，却无怨无悔。蓝梦道尊亲自为你们主持道侣大典，整个蓝梦星域都为之祝福。',
        choices: [
          {
            text: '与她携手，共赴梦境尽头',
            effect: (player) => ({ messages: ['在蓝梦道尊的见证下，你们立下了同生共死的誓言。李倩梅靠在你怀中，轻声道："我的梦，终于完整了。"'], intimacyChange: 100, reward: '蓝梦同心印' }),
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
    firstMeeting: '蓝梦湖畔，水波如镜，琴声空灵。你循声而去，看见一名蓝衣女子坐于湖边，指尖轻拨琴弦。她抬头看你，那一眼，仿佛穿越了梦境与现实。',
    backgroundStory: '李倩梅，蓝梦道尊之女，蓝丝族的天之骄女。她自幼修习梦道与音律，性格温柔而坚韧。在遇到你之前，她的世界只有梦境与琴音；遇见你之后，她才明白，最美的梦不在幻境中，而在与你相守的每一个真实瞬间。她曾为你献祭精血魂魄，也曾为你逆天改命，只因你是她梦中最珍贵的存在。',
    personalityTraits: ['温柔似水', '痴情专一', '空灵出尘', '坚韧不拔'],
    likes: ['抚琴奏乐', '梦境漫游', '蓝色花海', '真心相待'],
    dislikes: ['虚情假意', '生死离别', '伤害族人', '打破宁静'],
    favoriteGifts: ['古琴', '梦丝花', '蓝色纱裙', '音律功法'],
  },
  {
    id: 'daolu_hongdie',
    name: '红蝶',
    title: '雪域天骄',
    description: '一位身着火红长裙的女子，容貌绝美，眉心有一点朱砂痣，宛如雪中红梅。她气质高傲张扬，周身隐隐有风雪之力流转，令人不敢直视。',
    greeting: '红蝶转过身，朱唇微扬，带着一丝傲然："你来了？正好，陪我过几招！"',
    roomId: 'xianni_zhuque_snow',
    dialogues: xianniDialogues.hongdie,
    faction: {
      name: '雪域国',
      type: DaoLuFactionType.SECT,
      description: '雪域国是朱雀星上的四级修真国，以冰雪神通闻名。国中修士修炼冰系功法，性格大多清冷，唯独红蝶如火般热烈。',
      power: '朱雀星四级修真国',
      location: '朱雀星雪域国',
      leader: '雪域国主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'hongdie_story_1',
        title: '朱雀墓之争',
        requiredIntimacy: 0,
        description: '你在朱雀墓探险时与红蝶相遇。她正与一只上古凶兽激战，虽占上风却一时难以取胜。',
        choices: [
          {
            text: '出手相助，与她并肩作战',
            effect: (player) => ({ messages: ['你加入战局，与她联手击退了凶兽。红蝶收起神通，傲然道："身手不错，有资格做我的对手……或者，朋友。"'], intimacyChange: 15, reward: '雪域冰魄' }),
          },
          {
            text: '在一旁观战，寻找时机',
            effect: (player) => ({ messages: ['你在关键时刻出手，替她化解了凶兽的偷袭。红蝶冷哼一声："多管闲事……不过，谢了。"'], intimacyChange: 5 }),
          },
        ],
      },
      {
        id: 'hongdie_story_2',
        title: '冰雪中的火焰',
        requiredIntimacy: 50,
        description: '红蝶邀你共闯雪域禁地。禁地内寒气逼人，她却如一团火焰在冰雪中燃烧。途中她不慎触发上古禁制，身受重伤。',
        choices: [
          {
            text: '背起她，冒死冲出禁地',
            effect: (player) => ({ messages: ['你背起重伤的红蝶，在禁地中左冲右突。她伏在你背上，轻声道："从来没有人……愿意为我做到这一步。"'], intimacyChange: 20, reward: '雪域禁地传承' }),
          },
          {
            text: '为她护法，助她疗伤',
            effect: (player) => ({ messages: ['你在她身边护法，替她挡住了一波波寒气侵袭。红蝶疗伤完毕，看你冻得嘴唇发紫，第一次露出了真心的担忧："笨蛋……"'], intimacyChange: 12 }),
          },
        ],
      },
      {
        id: 'hongdie_story_3',
        title: '天骄之战',
        requiredIntimacy: 200,
        description: '红蝶向你发起挑战，要在朱雀星万众瞩目之下与你一战。她说，只有战胜她的人，才有资格站在她身边。',
        choices: [
          {
            text: '全力以赴，赢得她的尊重',
            effect: (player) => ({ messages: ['你们大战三百回合，最终以半招之差取胜。红蝶收剑而立，目光灼灼："你赢了……从今天起，我心甘情愿跟随你。"'], intimacyChange: 30, reward: '红蝶认可' }),
          },
          {
            text: '以平局收场，不伤和气',
            effect: (player) => ({ messages: ['你们战至最后同时收手，以平局告终。红蝶先是一愣，随即笑靥如花："好！你是唯一一个，让我心甘情愿平局的人。"'], intimacyChange: 20, reward: '天骄之谊' }),
          },
        ],
      },
      {
        id: 'hongdie_story_4',
        title: '蝶恋花',
        requiredIntimacy: 500,
        description: '红蝶放弃了雪域国天骄的身份，只愿追随你左右。在漫天飞雪中，她第一次露出了小女儿的娇羞。',
        choices: [
          {
            text: '为她拂去肩头落雪，许她余生',
            effect: (player) => ({ messages: ['你轻轻为她拂去肩头的落雪，在她额头印下一吻。红蝶闭上眼，冰雪般的外壳彻底融化："从今以后，我只为你一人绽放。"'], intimacyChange: 100, reward: '蝶恋同心契' }),
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
    firstMeeting: '朱雀墓深处，风雪交加。一名红衣女子正与上古凶兽激战，她如一团火焰在冰雪中燃烧，耀眼夺目。你不知为何停下了脚步，那一战，让你记住了她的名字——红蝶。',
    backgroundStory: '红蝶，雪域国第一天骄，自幼便展现出惊人的修炼天赋。她性格高傲如火，从不将任何人放在眼里。然而你的出现，打破了她所有的骄傲。从对手到知己，从知己到道侣，她用了很久才承认自己的心意。她是雪中红梅，只在最寒冷的时刻，为最值得的人绽放。',
    personalityTraits: ['高傲张扬', '热情如火', '口硬心软', '执着不屈'],
    likes: ['切磋战斗', '雪中独行', '烈火美酒', '强者之争'],
    dislikes: ['虚伪做作', '懦弱退缩', '被人轻视', '背叛欺骗'],
    favoriteGifts: ['火系法宝', '烈酒', '红色长裙', '战斗功法'],
  },
  {
    id: 'daolu_xizifeng',
    name: '西子凤',
    title: '罗天骄女',
    description: '一位身着紫色劲装的女子，英姿飒爽，眉眼间带着罗天星域特有的洒脱与精明。她手持一柄折扇，扇面上绘着星域图，行走间似有星辰流转。',
    greeting: '西子凤收起折扇，嘴角勾起一抹笑意："哟，稀客啊。来得正好，陪我喝一杯？"',
    roomId: 'xianni_luotian_domain',
    dialogues: xianniDialogues.xizifeng,
    faction: {
      name: '西子家族',
      type: DaoLuFactionType.CLAN,
      description: '西子家族是罗天星域的修真世家，以商道和情报闻名。家族生意遍布星域，消息灵通，财力雄厚。',
      power: '罗天星域一流世家',
      location: '罗天星域西子星',
      leader: '西子家主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'xizifeng_story_1',
        title: '星域交易会',
        requiredIntimacy: 0,
        description: '你在罗天星域的交易会上遇见了西子凤。她正与一名奸商讨价还价，见你路过，突然拉你当"托"。',
        choices: [
          {
            text: '配合她演戏，帮她压价',
            effect: (player) => ({ messages: ['你配合她演了一出好戏，成功帮她以低价购得宝物。西子凤拍拍你的肩："兄弟，够意思！这人情我记下了。"'], intimacyChange: 15, reward: '交易会优惠券' }),
          },
          {
            text: '笑而不语，静观其变',
            effect: (player) => ({ messages: ['你笑而不语，西子凤自己搞定了奸商。她瞪你一眼："喂，你就看着？算了……请你喝酒赔罪。"'], intimacyChange: 8 }),
          },
        ],
      },
      {
        id: 'xizifeng_story_2',
        title: '遗迹探险',
        requiredIntimacy: 50,
        description: '西子凤邀请你同探一处上古遗迹。她说是为了寻找家族失落的传承，实则也是想试探你的为人。',
        choices: [
          {
            text: '寻宝时优先让给她',
            effect: (player) => ({ messages: ['你发现宝物时，毫不犹豫地让给了她。西子凤愣了一下，随即笑道："你这个人……真奇怪。不过，我喜欢。"'], intimacyChange: 20, reward: '上古传承线索' }),
          },
          {
            text: '与她平分，不贪心',
            effect: (player) => ({ messages: ['你们平分了遗迹中的宝物。西子凤满意地点头："够爽快！你这个朋友，我交了。"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'xizifeng_story_3',
        title: '家族危机',
        requiredIntimacy: 200,
        description: '西子家族遭遇强敌围攻，西子凤孤身应战。你得知消息后，星夜兼程赶来相助。',
        choices: [
          {
            text: '单枪匹马杀入重围，救她脱险',
            effect: (player) => ({ messages: ['你单枪匹马杀入重围，浑身浴血将她救出。西子凤看着你，眼眶微红："傻瓜……为什么要来……你知不知道有多危险……"'], intimacyChange: 30, reward: '西子家族友谊' }),
          },
          {
            text: '联络盟友，里应外合解围',
            effect: (player) => ({ messages: ['你联络各方盟友，里应外合解了西子家族之围。西子凤激动地抱住你："你总是能在关键时刻出现……谢谢你。"'], intimacyChange: 20, reward: '罗天盟约' }),
          },
        ],
      },
      {
        id: 'xizifeng_story_4',
        title: '凤栖梧桐',
        requiredIntimacy: 500,
        description: '危机过后，西子凤正式接任家主之位。她在登基大典上当众宣布，愿以整个西子家族为嫁妆，与你结为道侣。',
        choices: [
          {
            text: '握住她的手，与她共治星域',
            effect: (player) => ({ messages: ['你在万众瞩目中走上高台，与她十指相扣。西子凤笑靥如花："从今以后，我的星域，就是你的星域。"'], intimacyChange: 100, reward: '星域同心契' }),
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
    firstMeeting: '罗天星域交易会上，人声鼎沸。一名紫衣女子正与奸商讨价还价，突然一把拉住你："这位道友，你说这货值不值这个价？"你愣神的功夫，已经被她拉入了一场闹剧。',
    backgroundStory: '西子凤，西子家族大小姐，自幼便展现出过人的商业头脑和修炼天赋。她性格洒脱精明，善于交际，在罗天星域人脉极广。她见过太多虚情假意，所以对真心格外珍惜。你的出现，让她明白这世上还有不求回报的付出，还有值得托付终身的人。',
    personalityTraits: ['洒脱精明', '重情重义', '敢爱敢恨', '机智过人'],
    likes: ['交易买卖', '探险寻宝', '美酒佳肴', '星辰大海'],
    dislikes: ['奸诈虚伪', '欠钱不还', '束缚自由', '背信弃义'],
    favoriteGifts: ['星域地图', '珍稀法宝', '紫色衣裙', '美酒'],
  },
  {
    id: 'daolu_yaoxuexue',
    name: '姚惜雪',
    title: '血族公主',
    description: '一位身着暗红色长裙的女子，容貌艳丽，却带着几分病态的苍白。她周身缭绕着淡淡的血气，一双美眸中藏着深深的孤寂与哀伤。',
    greeting: '姚惜雪抬起头，目光复杂："你又来了……我不需要同情，也不需要怜悯。"',
    roomId: 'xianni_blood_sect',
    dialogues: xianniDialogues.yaoxuexue,
    faction: {
      name: '血祖麾下',
      type: DaoLuFactionType.DEMON,
      description: '血祖是罗天星域的顶尖魔道大能，以血道神通闻名。其麾下聚集了大量魔道修士，势力庞大，令人闻风丧胆。',
      power: '罗天星域魔道巨擘',
      location: '罗天星域血海星',
      leader: '血祖',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'yaoxuexue_story_1',
        title: '血海边缘',
        requiredIntimacy: 0,
        description: '你在血海星历练时遇见了独自坐在海边的姚惜雪。她望着血色的海面，背影孤寂而落寞。',
        choices: [
          {
            text: '安静地坐在她身边，陪她看海',
            effect: (player) => ({ messages: ['你安静地坐在她身边，一言不发。良久，姚惜雪轻声道："你是第一个……不问我为什么的人。"'], intimacyChange: 15, reward: '血海结晶' }),
          },
          {
            text: '递给她一壶清水，不言不语',
            effect: (player) => ({ messages: ['你递给她一壶清水。姚惜雪愣了一下，接过水壶："在血海星，清水比灵石还珍贵……谢谢。"'], intimacyChange: 8 }),
          },
        ],
      },
      {
        id: 'yaoxuexue_story_2',
        title: '逃离血海',
        requiredIntimacy: 50,
        description: '姚惜雪告诉你，她想逃离血祖的控制，过上自由的生活。她问你，愿不愿意带她走。',
        choices: [
          {
            text: '毫不犹豫地答应，带她远走高飞',
            effect: (player) => ({ messages: ['你毫不犹豫地答应了她。姚惜雪眼眶微红："你不怕血祖的追杀吗？"你握紧她的手："怕，但更怕失去你。"'], intimacyChange: 25, reward: '逃亡路线图' }),
          },
          {
            text: '谨慎规划，确保万无一失',
            effect: (player) => ({ messages: ['你详细规划了逃离路线。姚惜雪看着你认真的样子，眼中闪过一丝温柔："谢谢你……为我考虑这么多。"'], intimacyChange: 12 }),
          },
        ],
      },
      {
        id: 'yaoxuexue_story_3',
        title: '血祖之怒',
        requiredIntimacy: 200,
        description: '血祖得知姚惜雪叛逃，震怒之下派出无数高手追杀。你们被逼入绝境，生死一线。',
        choices: [
          {
            text: '燃烧精血，为她杀出一条生路',
            effect: (player) => ({ messages: ['你燃烧精血，拼尽全力杀出一条血路。姚惜雪抱着重伤的你，泪如雨下："为什么……为什么要为我做到这一步……我不要你死……"'], intimacyChange: 30, reward: '血祖之敌印记' }),
          },
          {
            text: '以智脱身，金蝉脱壳',
            effect: (player) => ({ messages: ['你施展妙计，金蝉脱壳逃出血祖包围。姚惜雪松了口气，紧紧抱住你："我以为……再也见不到你了……"'], intimacyChange: 20, reward: '脱困秘术' }),
          },
        ],
      },
      {
        id: 'yaoxuexue_story_4',
        title: '浴火重生',
        requiredIntimacy: 500,
        description: '历经磨难，姚惜雪终于摆脱了血祖的阴影。她在新的家园中，向你敞开了封闭已久的心扉。',
        choices: [
          {
            text: '为她拭去泪水，许她一世安稳',
            effect: (player) => ({ messages: ['你轻轻为她拭去泪水，在她耳边许下承诺。姚惜雪闭上眼，露出了久违的笑容："这是我……第一次觉得，活着真好。"'], intimacyChange: 100, reward: '浴火同心契' }),
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
    firstMeeting: '血海星的海边，海水如血，映照着暗红色的天空。一名红衣女子独自坐在礁石上，望着无尽的血海。她的背影那么孤寂，让你忍不住想要靠近。',
    backgroundStory: '姚惜雪，血祖之女，自幼便在血海星长大。她虽是血祖血脉，却并不认同父亲的魔道理念。她渴望自由，渴望阳光，渴望过上正常人的生活。在遇到你之前，她以为自己会一辈子被囚禁在血海之中；遇见你之后，她终于鼓起勇气，为自己活一次。',
    personalityTraits: ['外冷内热', '渴望自由', '敏感脆弱', '重情重义'],
    likes: ['安静独处', '清水蓝天', '自由之风', '真诚相待'],
    dislikes: ['血腥杀戮', '被人控制', '虚情假意', '黑暗孤独'],
    favoriteGifts: ['清水', '阳光石', '红色衣裙', '自由之羽'],
  },
  {
    id: 'daolu_siqu',
    name: '司秋',
    title: '王家玉女',
    description: '一位身着素雅长裙的女子，气质温婉端庄，眉眼间带着书卷气。她手持一卷古籍，站在老宅的银杏树下，宛如画中走出的江南女子。',
    greeting: '司秋抬起头，温婉一笑："你来了。我正读到一段有趣的典故，要不要一起品鉴？"',
    roomId: 'xianni_wang_family',
    dialogues: xianniDialogues.siqu,
    faction: {
      name: '王氏家族',
      type: DaoLuFactionType.CLAN,
      description: '王氏家族是朱雀星赵国的修真家族，因王林老祖而崛起。家族虽不算顶尖，却在朱雀星有着特殊的地位，无人敢轻易招惹。',
      power: '朱雀星赵国名门',
      location: '朱雀星赵国王家祖地',
      leader: '王家族长',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'siqu_story_1',
        title: '祖宅银杏',
        requiredIntimacy: 0,
        description: '你在王家祖宅做客时，于银杏树下遇见了正在读书的司秋。一片落叶飘入她发间，你下意识伸手为她拂去。',
        choices: [
          {
            text: '温柔地为她拂去落叶',
            effect: (player) => ({ messages: ['你温柔地为她拂去发间落叶。司秋微微一怔，耳尖微红："多谢……很少有人这样待我。"'], intimacyChange: 15, reward: '银杏书签' }),
          },
          {
            text: '称赞她的读书专注',
            effect: (player) => ({ messages: ['你称赞她读书专注。司秋不好意思地笑笑："让道友见笑了，我不过是打发时间罢了。"'], intimacyChange: 8 }),
          },
        ],
      },
      {
        id: 'siqu_story_2',
        title: '家族试炼',
        requiredIntimacy: 50,
        description: '王家举行家族试炼，司秋因修为不足而信心欠缺。她问你，资质平庸的人，真的也能走修仙之路吗？',
        choices: [
          {
            text: '鼓励她，告诉她坚持就是胜利',
            effect: (player) => ({ messages: ['你坚定地告诉她，修仙之路贵在坚持。司秋眼中泛起泪光："从来没有人……这样鼓励过我。谢谢你。"'], intimacyChange: 20, reward: '信念之种' }),
          },
          {
            text: '陪她修炼，以实际行动支持',
            effect: (player) => ({ messages: ['你每天陪她修炼，为她答疑解惑。司秋的修为突飞猛进，她感激地看着你："是你让我相信，我也可以。"'], intimacyChange: 12 }),
          },
        ],
      },
      {
        id: 'siqu_story_3',
        title: '老祖归来',
        requiredIntimacy: 200,
        description: '王林老祖归来，王家举族欢庆。司秋却在人群中独自黯然，觉得自己太过渺小，配不上站在你身边。',
        choices: [
          {
            text: '在万众瞩目中走向她，牵起她的手',
            effect: (player) => ({ messages: ['你在万众瞩目中走向她，当众牵起她的手。司秋惊呆了，眼眶微红："你……你不怕被人笑话吗……"你摇头："我只怕你看轻自己。"'], intimacyChange: 30, reward: '王家认可' }),
          },
          {
            text: '私下安慰她，告诉她你不在乎身份差距',
            effect: (player) => ({ messages: ['你私下找到她，告诉她你不在乎身份差距。司秋泪如雨下，扑入你怀中："谢谢你……谢谢你从来没有看轻我。"'], intimacyChange: 20, reward: '知心之约' }),
          },
        ],
      },
      {
        id: 'siqu_story_4',
        title: '白头之约',
        requiredIntimacy: 500,
        description: '在王家祖宅的银杏树下，司秋穿着嫁衣等你。金黄的银杏叶纷纷落下，如同天地为证。',
        choices: [
          {
            text: '为她戴上发簪，许下白头之约',
            effect: (player) => ({ messages: ['你为她戴上银杏发簪，在漫天落叶中许下白头之约。司秋笑中带泪："此生有你，司秋无憾。"'], intimacyChange: 100, reward: '银杏同心契' }),
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
    firstMeeting: '王家祖宅的银杏树下，金黄落叶纷飞。一名素衣女子倚树读书，神情专注。一片落叶飘入她发间，你下意识伸手——她抬头看你，那一眼，温柔了岁月。',
    backgroundStory: '司秋，王氏家族旁系之女，自幼便被主脉子弟轻视。她资质平平，却酷爱读书，性情温婉坚韧。在遇到你之前，她以为自己会默默无名地过完一生；遇见你之后，她才明白，原来也有人能看见她的光芒。她不奢求惊天动地的爱情，只愿与你岁月静好，细水长流。',
    personalityTraits: ['温婉端庄', '坚韧执着', '知书达理', '不善言辞'],
    likes: ['读书品茶', '银杏落叶', '安静时光', '被人认可'],
    dislikes: ['被人轻视', '喧嚣纷扰', '争权夺利', '离别之苦'],
    favoriteGifts: ['古籍', '文房四宝', '素色长裙', '银杏饰品'],
  },
  {
    id: 'daolu_liumei',
    name: '柳眉',
    title: '千幻魔女',
    description: '一位身着黑色纱裙的女子，容貌绝美却冷若冰霜。她周身缭绕着淡淡的幻雾，一双眼眸深邃如潭，仿佛能看穿人心最深处的欲望。',
    greeting: '柳眉缓缓转身，幻雾在她身后聚散："你又来了。不怕我惑了你的心神，让你万劫不复吗？"',
    roomId: 'xianni_qianhuan_sect',
    dialogues: xianniDialogues.liumei,
    faction: {
      name: '千幻宗',
      type: DaoLuFactionType.DEMON,
      description: '千幻宗是联盟星域的魔道宗门，以幻术和无情道闻名。宗中弟子修炼千幻无情道，讲究以欲入道，断情绝欲，最终达到太上忘情的境界。',
      power: '联盟星域魔道大宗',
      location: '联盟星域千幻星',
      leader: '千幻老祖',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'liumei_story_1',
        title: '幻境初遇',
        requiredIntimacy: 0,
        description: '你在千幻星历练时不慎陷入幻境，在幻境深处遇见了柳眉。她正在以幻术考验你的心性，看你能否抵御欲望的诱惑。',
        choices: [
          {
            text: '坚守本心，看破幻境',
            effect: (player) => ({ messages: ['你坚守本心，看破了层层幻境。柳眉微微惊讶："能破我幻境的人不多……你，很有趣。"'], intimacyChange: 15, reward: '幻境感悟' }),
          },
          {
            text: '不强行破境，而是以心感化',
            effect: (player) => ({ messages: ['你没有强行破境，而是以真诚之心面对幻境中的她。柳眉眉头微蹙："你为什么不反抗？"你笑而不答，她沉默良久。'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'liumei_story_2',
        title: '无情道心',
        requiredIntimacy: 50,
        description: '柳眉告诉你，千幻无情道要求断情绝欲，她正在犹豫是否要以你为劫，斩断最后一丝情感。',
        choices: [
          {
            text: '告诉她，真正的道不在无情',
            effect: (player) => ({ messages: ['你告诉她，真正的大道不是无情，而是历经情劫后依然坚定。柳眉眸中闪过波动："你说得轻松……可知我若动情，便是道心破碎之日？"'], intimacyChange: 20, reward: '道心共鸣' }),
          },
          {
            text: '尊重她的选择，无论结果如何',
            effect: (player) => ({ messages: ['你尊重她的选择，转身离去。柳眉在身后喊道："你……你就这么走了？"你回头："我尊重你的道。"她愣在原地，久久不能言语。'], intimacyChange: 12 }),
          },
        ],
      },
      {
        id: 'liumei_story_3',
        title: '幻梦一场',
        requiredIntimacy: 200,
        description: '柳眉施展最强幻术，将自己与你一同困在幻梦之中。在幻梦里，你们度过了平凡人的一生，结婚生子，白头偕老。',
        choices: [
          {
            text: '在幻梦中也不愿醒来，想与她共度余生',
            effect: (player) => ({ messages: ['你在幻梦中沉浸良久，不愿醒来。柳眉看着你，泪如雨下："傻瓜……幻梦再美，也是假的啊……"你握住她的手："可我对你的心，是真的。"'], intimacyChange: 30, reward: '幻梦真情' }),
          },
          {
            text: '带她走出幻梦，承诺给她真实的人生',
            effect: (player) => ({ messages: ['你牵着她的手，带她走出幻梦。柳眉迷茫地看着你："真实的人生……会比幻梦更好吗？"你点头："有我在，会。"'], intimacyChange: 20, reward: '破幻而出' }),
          },
        ],
      },
      {
        id: 'liumei_story_4',
        title: '眉间一点情',
        requiredIntimacy: 500,
        description: '柳眉放弃了千幻无情道，修为大损却心甘情愿。她在千幻星最高处，为你跳了最后一支幻舞。',
        choices: [
          {
            text: '接住坠落的她，许她不再孤寂',
            effect: (player) => ({ messages: ['幻舞终了，她力竭坠落。你飞身接住她，紧紧拥入怀中。柳眉闭上眼，第一次露出了安心的笑容："原来……被人接住的感觉，这么好。"'], intimacyChange: 100, reward: '千幻同心契' }),
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
    firstMeeting: '千幻幻境深处，迷雾重重。你迷失在欲望与恐惧交织的幻象中，忽然看见一名黑衣女子立于幻雾之中。她看着你，目光如深渊般不可测："能走到这里，你倒是有几分本事。"',
    backgroundStory: '柳眉，千幻宗核心弟子，自幼便被灌输无情道的理念。她以为自己的心早已冰冷如铁，却在你的出现后开始动摇。从想以你为劫，到不愿断情，她经历了最痛苦的挣扎。最终她明白，所谓无情道，不过是不敢面对真心的借口。她放弃了修为，只为换你一句真心。',
    personalityTraits: ['冷若冰霜', '外冷内热', '执着倔强', '渴望真情'],
    likes: ['幻术研究', '月下独舞', '静谧之夜', '真心之人'],
    dislikes: ['虚伪欲望', '强迫逼迫', '道貌岸然', '背叛欺骗'],
    favoriteGifts: ['幻术功法', '黑色纱裙', '迷梦花', '古琴'],
  },
  {
    id: 'daolu_hujuan',
    name: '胡娟',
    title: '妖灵猎手',
    description: '一位身着兽皮短装的女子，肌肤呈健康的小麦色，腰间别着几把骨刃。她眼神锐利如鹰，周身散发着妖灵之地特有的野性气息，却又带着几分异样的妩媚。',
    greeting: '胡娟从树梢跃下，轻盈地落在你面前，嘴角挂着狡黠的笑："又来人类了？长得倒是不赖，陪我打猎去？"',
    roomId: 'xianni_demon_spirit',
    dialogues: xianniDialogues.hujuan,
    faction: {
      name: '妖灵之地',
      type: DaoLuFactionType.MONSTER,
      description: '妖灵之地是界外蛮荒之所，强者为尊。这里聚居着无数妖兽和半妖修士，弱肉强食是唯一的法则。',
      power: '界外蛮荒势力',
      location: '界外妖灵之地',
      leader: '妖灵之王',
    },
    status: '散修',
    storyNodes: [
      {
        id: 'hujuan_story_1',
        title: '丛林初遇',
        requiredIntimacy: 0,
        description: '你在妖灵之地的丛林中历练时遇见了正在狩猎的胡娟。她误以为你是入侵者，一把骨刃抵在了你的咽喉。',
        choices: [
          {
            text: '不慌不忙，展示善意',
            effect: (player) => ({ messages: ['你不慌不忙，示意自己没有恶意。胡娟收起骨刃，饶有兴致地打量你："有意思，人类见到我居然不怕。走吧，我请你吃烤肉。"'], intimacyChange: 15, reward: '妖灵烤肉' }),
          },
          {
            text: '出手化解，以实力赢得尊重',
            effect: (player) => ({ messages: ['你轻轻化解了她的攻势，展示出不俗的实力。胡娟眼睛一亮："身手不错！来，陪我打一架！"'], intimacyChange: 8 }),
          },
        ],
      },
      {
        id: 'hujuan_story_2',
        title: '妖兽围猎',
        requiredIntimacy: 50,
        description: '胡娟邀请你参加妖灵之地的围猎。在围猎中，你们遭遇了一只上古凶兽，情况危急。',
        choices: [
          {
            text: '以身作饵，引开凶兽保护她',
            effect: (player) => ({ messages: ['你以身作饵引开凶兽，让她有机会射出致命一箭。事后，胡娟看着你身上的伤口，声音发颤："你……你傻不傻……"'], intimacyChange: 20, reward: '上古凶兽材料' }),
          },
          {
            text: '与她配合，默契击杀凶兽',
            effect: (player) => ({ messages: ['你们配合默契，一前一后将凶兽击杀。胡娟兴奋地拍拍你的肩："够意思！以后你就是我胡娟的兄弟了！"'], intimacyChange: 12 }),
          },
        ],
      },
      {
        id: 'hujuan_story_3',
        title: '妖灵祭典',
        requiredIntimacy: 200,
        description: '妖灵之地举行祭典，胡娟要在祭典上与其他妖灵勇士比武招亲。她问你，愿不愿意为她而战。',
        choices: [
          {
            text: '为她连战十场，赢得最终胜利',
            effect: (player) => ({ messages: ['你为她连战十场，浑身浴血却屹立不倒。胡娟冲上台抱住你，在所有妖灵面前大声宣布："这个男人，是我胡娟的！"'], intimacyChange: 30, reward: '妖灵勇士称号' }),
          },
          {
            text: '以智慧化解，避免无谓争斗',
            effect: (player) => ({ messages: ['你以智慧化解了争斗，赢得了所有妖灵的尊重。胡娟看着你，眼中满是骄傲："我的男人，就是不一样。"'], intimacyChange: 20, reward: '妖灵尊重' }),
          },
        ],
      },
      {
        id: 'hujuan_story_4',
        title: '野性温柔',
        requiredIntimacy: 500,
        description: '祭典过后，胡娟带你来到妖灵之地最美的瀑布前。她说，这是她最喜欢的秘密基地，从未带别人来过。',
        choices: [
          {
            text: '从背后轻轻拥住她，许她一世守护',
            effect: (player) => ({ messages: ['你从背后轻轻拥住她，在她耳边许下承诺。胡娟转过身，眼中闪着泪光："你们人类的话……我信了。不许骗我。"'], intimacyChange: 100, reward: '妖灵同心契' }),
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
    firstMeeting: '妖灵之地的密林中，阳光透过树叶洒下斑驳光影。一名兽皮短装的女子从树梢跃下，骨刃在阳光下闪着寒光。她看着你，目光中既有警惕，又有好奇。',
    backgroundStory: '胡娟，妖灵之地土生土长的半妖修士，自幼便在丛林中摸爬滚打。她性格野性直率，敢爱敢恨，从不掩饰自己的情感。她见过太多人类修士的虚伪，所以格外珍惜真心。你的出现，让她第一次对人类产生了信任，也第一次想要为谁停留。',
    personalityTraits: ['野性直率', '敢爱敢恨', '忠诚勇敢', '不拘小节'],
    likes: ['丛林狩猎', '篝火烤肉', '瀑布戏水', '强者之争'],
    dislikes: ['虚伪做作', '阴谋诡计', '束缚自由', '伤害妖兽'],
    favoriteGifts: ['骨刃', '兽皮', '野果', '战斗功法'],
  },
  {
    id: 'daolu_simaqin',
    name: '司马琴',
    title: '罗天琴散',
    description: '一位身着青灰色长袍的女子，气质洒脱不羁，怀中抱着一张七弦琴。她倚坐在一块巨石上，发丝随风飘扬，宛如天地间的一缕自由清风。',
    greeting: '司马琴拨动琴弦，一个清越的音符跃出："来啦？正好，我刚谱了一首新曲，缺个听众。"',
    roomId: 'xianni_luotian_wanderer',
    dialogues: xianniDialogues.simaqin,
    faction: {
      name: '罗天散修',
      type: DaoLuFactionType.WANDERER,
      description: '罗天星域的散修联盟，没有固定的宗门和家族，以自由为最高追求。散修们各自为战，却也在危难时刻相互扶持。',
      power: '罗天星域散修联盟',
      location: '罗天星域各处',
      leader: '散修盟主',
    },
    status: '散修',
    storyNodes: [
      {
        id: 'simaqin_story_1',
        title: '陨石之上',
        requiredIntimacy: 0,
        description: '你在罗天星域游历，于一块漂浮的陨石上遇见了正在弹琴的司马琴。她的琴声吸引了附近星盗的注意。',
        choices: [
          {
            text: '拔剑相助，击退星盗',
            effect: (player) => ({ messages: ['你拔剑击退星盗。司马琴收起古琴，笑道："身手不错嘛，有没有兴趣做我的保镖？报酬嘛……每天一首曲子，如何？"'], intimacyChange: 15, reward: '星盗战利品' }),
          },
          {
            text: '与她联手，以琴音配合剑气',
            effect: (player) => ({ messages: ['你以剑气配合她的琴音，将来犯之敌尽数击退。司马琴眼睛一亮："音剑合鸣？你这家伙，有点意思！"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'simaqin_story_2',
        title: '星空漫游',
        requiredIntimacy: 50,
        description: '司马琴邀你一同在星空中漫游。她说，罗天星域最美的风景，往往藏在最偏僻的角落。',
        choices: [
          {
            text: '陪她漫无目的地漂流，享受当下',
            effect: (player) => ({ messages: ['你们漫无目的地在星空中漂流，看星云流转，看陨石坠落。司马琴靠在你肩头，轻声道："从来没有人……愿意陪我这样浪费时间。"'], intimacyChange: 20, reward: '星空之忆' }),
          },
          {
            text: '为她寻找传说中的极光星',
            effect: (player) => ({ messages: ['你费尽周折找到了传说中的极光星。司马琴看着漫天极光，眼眶微红："我以为……这只是传说。谢谢你，让它变成了现实。"'], intimacyChange: 15, reward: '极光石' }),
          },
        ],
      },
      {
        id: 'simaqin_story_3',
        title: '琴心破碎',
        requiredIntimacy: 200,
        description: '司马琴在一次争斗中琴心受损，再也无法弹奏。她陷入了前所未有的绝望，甚至想放弃修道。',
        choices: [
          {
            text: '日夜守护，为她寻遍天下名医',
            effect: (player) => ({ messages: ['你日夜守护在她身边，寻遍天下名医。司马琴看着你憔悴的面容，泪如雨下："为什么要对我这么好……我只是个散修，什么都没有……"'], intimacyChange: 30, reward: '琴心修复之法' }),
          },
          {
            text: '告诉她，即便不能弹琴，你依然爱她',
            effect: (player) => ({ messages: ['你握着她的手，告诉她即便她再也不能弹琴，你也依然爱她。司马琴怔怔地看着你，泪水夺眶而出："你……你这个笨蛋……"'], intimacyChange: 25, reward: '真情之泪' }),
          },
        ],
      },
      {
        id: 'simaqin_story_4',
        title: '琴瑟和鸣',
        requiredIntimacy: 500,
        description: '琴心修复之日，司马琴在星空之下为你独奏一曲《长相守》。琴音袅袅，回荡在无垠星河之中。',
        choices: [
          {
            text: '与她合奏一曲，许她星空为证',
            effect: (player) => ({ messages: ['你取出一支玉箫，与她琴箫合奏。司马琴望着你，眸中星光璀璨："这一曲，我只为你而弹。从今往后，天涯海角，我都随你去。"'], intimacyChange: 100, reward: '琴瑟同心契' }),
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
    firstMeeting: '罗天星域，一块漂浮的陨石上。一名青衣女子正抚琴自娱，琴音在真空中诡异地震颤。星盗的飞船悄然靠近，你拔剑而出——这一剑，斩断了杀机，也牵出了一段星缘。',
    backgroundStory: '司马琴，罗天星域的一名普通散修，自幼便在星空中流浪。她修炼琴道，以音律感悟天地，性格洒脱不羁。她没有显赫的背景，没有强大的靠山，只有一张古琴和一颗向往自由的心。在遇到你之前，她的琴声只为自己而弹；遇见你之后，她终于找到了那个值得为之弹奏一生的人。',
    personalityTraits: ['洒脱不羁', '热爱自由', '才情横溢', '重情重义'],
    likes: ['星空漫游', '抚琴奏乐', '极光流星', '无拘无束'],
    dislikes: ['宗门束缚', '尔虞我诈', '被人看轻', '失去自由'],
    favoriteGifts: ['古琴', '星图', '青色长袍', '音律功法'],
  },
];
