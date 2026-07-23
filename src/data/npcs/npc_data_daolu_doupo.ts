import { IDaoLu, DaoLuFactionType, DUAL_CULTIVATION_POSE_TEMPLATES, DAO_LU_INTERACTION_TEMPLATES } from '../../domain/entities/DaoLu';
import { INPCDialogue } from '../../domain/entities/NPC';

const doupoDialogues: Record<string, INPCDialogue[]> = {
  xiaoxuner: [
    { id: 'xun_er_gu_clan', topic: '询问古族', text: '"古族传承自远古八族，血脉中流淌着斗帝之血。"萧薰儿眼中闪过一丝骄傲，随即柔声道："但在薰儿心中，那些荣耀都不及萧炎哥哥的一丝一毫。"' },
    { id: 'xun_er_gold_flame', topic: '谈论金帝焚天炎', text: '"金帝焚天炎是古族传承异火，排名第四。"萧薰儿掌心浮现一缕金色火焰，温度惊人却对你毫无伤害："只有最纯净的古族血脉才能驾驭它。"' },
    { id: 'xun_er_xiaoyan', topic: '提起萧炎', text: '"萧炎哥哥……"萧薰儿低下头，嘴角却忍不住上扬："他是我见过最执着的人。从小到大，无论遇到什么困难，他都不会放弃。薰儿相信他，终有一日会站在斗气大陆的巅峰。"' },
  ],
  medusa: [
    { id: 'medusa_snake', topic: '询问蛇人族', text: '"蛇人族在这塔戈尔大沙漠生存了千年。"美杜莎女王目光冰冷，语气中却带着一丝傲然："本王三岁凝聚斗气，十岁斗灵，二十岁斗皇。蛇人族在本王手中，必将重现荣光。"' },
    { id: 'medusa_evolution', topic: '谈论进化', text: '"进化是蛇人族最高秘法，以异火煅烧己身，九死一生。"美杜莎眼中闪过复杂的神色："本王成功进化为七彩吞天蟒，却也失去了许多记忆。那些往事……不提也罢。"' },
    { id: 'medusa_desert', topic: '谈论沙漠', text: '"塔戈尔大沙漠虽然贫瘠，却是蛇人族的家园。"美杜莎望向远方："这里的每一粒沙子，都浸染着族人的鲜血。本王发誓，终有一日要让蛇人族走出沙漠，不再受人类欺压。"' },
  ],
  yunyan: [
    { id: 'yunyan_flower', topic: '询问花宗', text: '"花宗是中州二宗之一，以花入道，讲究心境平和。"云韵轻抚一朵白色花朵："我虽曾是云岚宗宗主，但如今已是花宗之人。过去的恩怨，就让它随风而去吧。"' },
    { id: 'yunyan_wind', text: '"风属性斗气讲究飘逸灵动，如云如风。"云韵身形一闪，化作一道清风绕你一周："云岚宗的风之极剑法，便是我当年最得意的斗技。"', topic: '谈论风属性斗气' },
    { id: 'yunyan_past', topic: '谈论过往', text: '"云岚宗……"云韵神色黯然："那是我师父毕生心血，却因魂殿介入而覆灭。我曾恨过萧炎，但后来明白，真正的罪魁祸首是魂殿。如今云岚宗已不在，我只愿在这花宗安度余生。"' },
  ],
  xiaoyixian: [
    { id: 'xiyx_poison', topic: '询问厄难毒体', text: '"厄难毒体是天生的毒物容器，随着修为提升，体内毒素会不断累积。"小医仙苦笑："若无控制之法，终将毒发身亡，还会牵连身边的人。所以我自幼便不敢与人亲近。"' },
    { id: 'xiyx_medicine', topic: '谈论医术', text: '"我自幼跟着师父学习医术，本想济世救人。"小医仙眼中闪过温柔："可惜厄难毒体让我变成了人人畏惧的毒女。但我从未忘记初心，即便用毒，也只杀该杀之人。"' },
    { id: 'xiyx_wandai', topic: '谈论万药斋', text: '"万药斋是我在青山镇开设的药铺，那里有我许多美好的回忆。"小医仙微笑："萧炎便是在那里与我相识的。那时候的他，还只是个初出茅庐的少年呢。"' },
  ],
  yafei: [
    { id: 'yafei_miter', topic: '询问米特尔家族', text: '"米特尔家族是加玛帝国三大家族之一，以拍卖行起家。"雅妃嘴角含笑，眼波流转："我虽只是旁系出身，却凭着几分手段，坐上了这拍卖行掌柜的位置。在这世上，美貌是本钱，智慧才是根基。"' },
    { id: 'yafei_auction', topic: '谈论拍卖', text: '"拍卖之道，在于识货、识人、识时。"雅妃轻敲桌面："一件宝物值多少钱，不在于它本身，而在于想要它的人愿意出多少。人心，才是最值钱的东西。"' },
    { id: 'yafei_business', topic: '谈生意', text: '"想跟我谈生意？"雅妃上下打量你，笑意更深："我喜欢跟聪明人做生意。只要价码合适，米特尔拍卖行可以为你提供任何你需要的东西——情报、宝物、人脉，应有尽有。"' },
  ],
  nanyanran: [
    { id: 'nyr_sect', topic: '询问云岚宗', text: '"云岚宗是加玛帝国第一大宗门，传承数百年。"纳兰嫣然神色复杂："我自幼被定为少宗主，肩负宗门荣耀。可惜……那场三年之约，改变了一切。"' },
    { id: 'nyr_promise', topic: '谈论三年之约', text: '"三年之约……是我这辈子最错误的决定。"纳兰嫣然低下头："我当众退婚，伤了萧炎的尊严，也让云岚宗走向灭亡。年少轻狂，总要付出代价。如今我只求能弥补当年的过错。"' },
    { id: 'nyr_sword', topic: '谈论剑法', text: '"云岚宗的追风剑法讲究快、准、狠。"纳兰嫣然拔剑出鞘，剑光如虹："我纳兰嫣然虽不才，但在剑法上从未懈怠。即便宗门不在，这身剑术也不会荒废。"' },
  ],
  ziyan: [
    { id: 'ziyan_dragon', topic: '询问太虚古龙', text: '"太虚古龙是魔兽界三大族群之首，天生掌控空间之力。"紫妍双手叉腰，得意洋洋："别看我这样子，我可是太虚古龙族的王族血脉！等长大了，整个龙族都要听我的！"' },
    { id: 'ziyan_food', topic: '谈论吃', text: '"你身上有好吃的丹药味道！"紫妍凑近你嗅了嗅，眼睛发亮："给我吃一颗，我就帮你打架！我可是很厉害的，斗宗以下一拳一个！"' },
    { id: 'ziyan_grow', topic: '谈论长大', text: '"哼，别看我这样子，我可是在化形呢！"紫妍气鼓鼓地叉腰："等我能完全化形了，一定会变得超级漂亮，让那些看不起我的人都大吃一惊！"' },
  ],
  caoying: [
    { id: 'caoying_pill_tower', topic: '询问丹塔', text: '"丹塔是斗气大陆炼药师的圣地，分为小丹塔和丹塔外塔。"曹颖嘴角勾起一抹自信的弧度："我是丹塔最年轻的长老，灵魂境界已至灵境。论炼药天赋，整个丹塔也没几人能胜过我。"' },
    { id: 'caoying_soul', topic: '谈论灵魂力量', text: '"炼药师最重要的是灵魂力量。"曹颖闭上双眼，一股无形的波动扩散开来："我的灵魂天生强大，修炼魂技更是事半功倍。你若能感受到这股波动，说明你也有不弱的灵魂天赋。"' },
    { id: 'caoying_alchemy', topic: '谈论炼丹', text: '"炼丹如修炼，需心无旁骛。"曹颖取出一枚圆润的丹药："这枚七品丹药是我亲手炼制，怎么样，想不想跟我学两手？不过我的学费可是很贵的。"' },
  ],
};

export const DOUPO_DAOLU: IDaoLu[] = [
  {
    id: 'daolu_xiaoxuner',
    name: '萧薰儿',
    title: '古族千金',
    description: '一位身着淡金衣裙的少女，眉目如画，气质空灵出尘。她周身缭绕着淡淡的金色火焰，一双明眸清澈温柔，仿佛蕴含着万千星辰。她是古族千年不遇的神品血脉，却对世俗荣耀毫不在意。',
    greeting: '萧薰儿转过身，看到你来时眼中闪过惊喜："你来了。这古界虽大，却无趣得很，幸好还有你能陪薰儿说说话。"',
    roomId: 'gu_clan',
    dialogues: doupoDialogues.xiaoxuner,
    faction: {
      name: '古族',
      type: DaoLuFactionType.CLAN,
      description: '远古八族之一，传承自斗帝血脉，是斗气大陆最顶尖的势力之一。古族以金帝焚天炎和金帝血脉闻名，族中强者如云，底蕴深不可测。',
      power: '远古八族之首',
      location: '古界',
      leader: '古族族长',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'xun_er_story_1',
        title: '乌坦城初遇',
        requiredIntimacy: 0,
        description: '你在乌坦城萧家初见萧薰儿。她正坐在后山的青石板上，望着远方的云霞发呆。察觉到有人靠近，她转过头来，目光温柔如水。',
        choices: [
          {
            text: '上前搭话，共赏晚霞',
            effect: (player) => ({ messages: ['你走到她身旁坐下，两人一起望着天边的晚霞。萧薰儿轻声道："这乌坦城的晚霞，是我见过最美的风景。因为……这里有萧炎哥哥。"'], intimacyChange: 15, reward: '薰儿的微笑' }),
          },
          {
            text: '默默陪伴，不多言语',
            effect: (player) => ({ messages: ['你没有说话，只是安静地坐在她身旁。萧薰儿微微一笑："你倒是个有趣的人，不说话却让人觉得很舒服。"'], intimacyChange: 8 }),
          },
        ],
      },
      {
        id: 'xun_er_story_2',
        title: '迦南学院历练',
        requiredIntimacy: 50,
        description: '萧薰儿邀你一同前往迦南学院附近的天焚炼气塔历练。塔内异火气息浓郁，她的金帝焚天炎也随之躁动不安。',
        choices: [
          {
            text: '以自身斗气帮她平复异火',
            effect: (player) => ({ messages: ['你将自身斗气输入她体内，帮助她平复躁动的金帝焚天炎。萧薰儿睁开眼，眸中满是感激："谢谢你……除了萧炎哥哥，你是第二个对我这么好的人。"'], intimacyChange: 20, reward: '异火感悟' }),
          },
          {
            text: '在旁护法，确保她安全',
            effect: (player) => ({ messages: ['你守护在她身旁，警惕地注视着四周。萧薰儿修炼完毕后，递给你一枚丹药："这是我自己炼制的，收下吧。谢谢你一直守着我。"'], intimacyChange: 12 }),
          },
        ],
      },
      {
        id: 'xun_er_story_3',
        title: '古族成人礼风波',
        requiredIntimacy: 200,
        description: '古族成人礼上，族中长老反对萧薰儿与你来往，欲以族规施压。萧薰儿站在你身前，寸步不让。',
        choices: [
          {
            text: '挺身而出，以实力证明自己',
            effect: (player) => ({ messages: ['你迎战古族长老，虽实力悬殊却毫不退缩。萧薰儿含泪挡在你身前："谁敢动他，便是与我萧薰儿为敌！"古族族长最终叹息："女大不中留……罢了罢了。"'], intimacyChange: 30, reward: '古族认可' }),
          },
          {
            text: '以情动人，请求族长成全',
            effect: (player) => ({ messages: ['你向古族族长坦诚心迹，表明自己对薰儿的真心。萧薰儿紧握你的手，目光坚定："父亲，女儿此生非他不嫁。"'], intimacyChange: 25, reward: '古族认可' }),
          },
        ],
      },
      {
        id: 'xun_er_story_4',
        title: '金帝焚天炎下的誓言',
        requiredIntimacy: 500,
        description: '古族祖地深处，萧薰儿引动金帝焚天炎的本源，欲与你缔结灵魂契约。金色火焰将你们包裹，温度高得可焚毁万物，却温暖如春。',
        choices: [
          {
            text: '与她立下灵魂契约，生死与共',
            effect: (player) => ({ messages: ['金帝焚天炎在你们灵魂深处烙下印记。萧薰儿泪流满面，却笑得如花般灿烂："从乌坦城后山的那一眼起，薰儿就知道……你是我的劫，也是我的缘。"'], intimacyChange: 100, reward: '金帝血脉共鸣' }),
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
    firstMeeting: '乌坦城萧家后山，夕阳的余晖洒在金裙少女身上。她回眸一笑，眸中仿佛有星辰流转。那一刻，你知道这个名叫萧薰儿的少女，将是你此生无法忘怀的存在。',
    backgroundStory: '萧薰儿，本名古薰儿，远古八族之一古族的千金小姐，拥有千年不遇的神品血脉。自幼被送往萧家，与萧炎青梅竹马。她性情温柔恬静，内心却执着坚定，为了心爱之人可以不顾一切。她身负金帝焚天炎，是古族未来的希望，却在遇见你之后，心中多了一丝牵挂。',
    personalityTraits: ['温柔恬静', '执着坚定', '外柔内刚', '重情重义'],
    likes: ['萧炎', '晚霞', '安静的时光', '修炼'],
    dislikes: ['背叛', '被当作古族工具', '繁文缛节', '欺凌弱小'],
    favoriteGifts: ['古籍', '异火相关宝物', '精美的发簪', '珍稀药材'],
  },
  {
    id: 'daolu_medusa',
    name: '美杜莎',
    title: '蛇人族女王',
    description: '一位身着紫色锦袍的绝美女子，身材高挑丰腴，眉目间透着一股凌厉的霸气。她的眼眸呈妖异的竖瞳状，长发如瀑，周身散发着危险而迷人的气息。她是蛇人族至高无上的女王，也是塔戈尔大沙漠中最可怕的存在。',
    greeting: '美杜莎女王斜倚在王座上，紫眸微抬，语气慵懒却不失威严："人类，你胆敢踏入本王的宫殿？胆子倒是不小。"',
    roomId: 'beast_mountains',
    dialogues: doupoDialogues.medusa,
    faction: {
      name: '蛇人族',
      type: DaoLuFactionType.MONSTER,
      description: '蛇人族是塔戈尔大沙漠的本土种族，上半身为人，下半身为蛇。族人天生擅长毒术和幻术，在沙漠中生存了千年。美杜莎女王是蛇人族历代最强者，统领全族。',
      power: '塔戈尔大沙漠霸主',
      location: '塔戈尔大沙漠神殿',
      leader: '美杜莎女王',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'medusa_story_1',
        title: '神殿初遇',
        requiredIntimacy: 0,
        description: '你闯入蛇人族神殿寻找异火，却在神殿深处遇见了正在闭关的美杜莎女王。她正处于进化的关键时刻，气息紊乱，竖瞳中满是戒备。',
        choices: [
          {
            text: '表明来意，承诺不打扰她进化',
            effect: (player) => ({ messages: ['你坦诚说明来意，并表示愿意护法。美杜莎女王冷哼一声："人类都该死……但你，似乎不太一样。"'], intimacyChange: 10, reward: '女王的好奇' }),
          },
          {
            text: '默默退开，守在神殿门口',
            effect: (player) => ({ messages: ['你没有多言，转身守在神殿门口，为她拦下了几波想要闯入的蛇人族长老。事后，美杜莎淡淡道："你欠本王的，以后还。"'], intimacyChange: 15, reward: '蛇人族信物' }),
          },
        ],
      },
      {
        id: 'medusa_story_2',
        title: '异火锻身',
        requiredIntimacy: 50,
        description: '美杜莎决定以异火煅烧己身，进化为更高层次的存在。这个过程九死一生，她需要你为她护法，并在关键时刻以斗气稳定她的心神。',
        choices: [
          {
            text: '全力以赴，以命相护',
            effect: (player) => ({ messages: ['异火狂暴无比，你以身挡在她身前，承受了大部分火焰冲击。美杜莎成功进化后，看着伤痕累累的你，第一次露出复杂的神色："为什么……要为本王做到这种地步？"'], intimacyChange: 25, reward: '七彩吞天蟒精血' }),
          },
          {
            text: '施展手段，帮她稳定心神',
            effect: (player) => ({ messages: ['你以灵魂力量帮她稳定心神，助她成功度过最危险的阶段。美杜莎进化后，冷傲的语气中多了一丝温度："你……是个有趣的人类。"'], intimacyChange: 18 }),
          },
        ],
      },
      {
        id: 'medusa_story_3',
        title: '蛇人族危机',
        requiredIntimacy: 200,
        description: '魂殿势力入侵塔戈尔大沙漠，欲抓捕蛇人族强者炼制灵魂。美杜莎女王独战魂殿斗尊，身受重伤。你及时赶到，与她并肩作战。',
        choices: [
          {
            text: '与她联手，击退魂殿强者',
            effect: (player) => ({ messages: ['你们联手击退了魂殿强者。美杜莎女王靠在王座上，虚弱却不失威严："人类，你救了本王，也救了蛇人族。这份恩情，本王记下了。"'], intimacyChange: 30, reward: '蛇人族永久友谊' }),
          },
          {
            text: '带她撤离，保全蛇人族火种',
            effect: (player) => ({ messages: ['你当机立断，带她撤离神殿，保全了蛇人族的火种。美杜莎女王望着燃烧的神殿，第一次流露出悲伤："本王的家……没了。但从今以后，你在的地方，就是本王的归宿。"'], intimacyChange: 35, reward: '女王之心' }),
          },
        ],
      },
      {
        id: 'medusa_story_4',
        title: '沙漠之夜的情愫',
        requiredIntimacy: 500,
        description: '月圆之夜，你们在塔戈尔大沙漠的最高处相对而坐。进化后的美杜莎已经能完全化为人形，她望着月亮，第一次向你敞开了心扉。',
        choices: [
          {
            text: '握住她的手，许下一世之约',
            effect: (player) => ({ messages: ['你握住她冰凉却柔软的手。美杜莎女王没有抽回，而是轻轻靠在你肩上："本王从不需要任何人……但你，是本王唯一的例外。"月光下，她冷傲的面容柔和如水。'], intimacyChange: 100, reward: '蛇人族共主之誓' }),
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
    firstMeeting: '蛇人族神殿深处，紫色锦袍的女王高踞王座之上。她的竖瞳冰冷无情，周身弥漫着致命的压迫感。然而在那冰冷的目光深处，你似乎看到了一丝孤独——那是王者高处不胜寒的寂寞。',
    backgroundStory: '美杜莎女王，蛇人族历代最强者，三岁凝聚斗气，十岁斗灵，二十岁斗皇。为了带领蛇人族走出沙漠，她不惜以异火煅烧己身，进化为传说中的七彩吞天蟒。她冷傲霸道，杀伐果断，对敌人从不手软，却也重情重义，一旦认定之人，便会以命相护。在她冰冷的外表下，藏着一颗渴望被理解的心。',
    personalityTraits: ['冷傲霸道', '杀伐果断', '外冷内热', '重情重义'],
    likes: ['异火', '强者', '蛇人族', '沙漠月夜'],
    dislikes: ['背叛', '软弱', '魂殿', '欺压蛇人族之人'],
    favoriteGifts: ['异火信息', '珍贵药材', '紫色衣裙', '强者遗物'],
  },
  {
    id: 'daolu_yunyan',
    name: '云韵',
    title: '花宗宗主',
    description: '一位身着素白长裙的绝美女子，气质空灵如仙，眉目间带着淡淡的忧伤。她手持一柄青色长剑，剑鞘古朴，却隐隐有风雷之声。曾经的云岚宗宗主，如今的花宗之主，历经沧桑却依然保持着一颗纯净的心。',
    greeting: '云韵缓缓转身，目光清澈如水："你来了。这花宗的花海虽美，却总让我想起云岚山的云海。坐吧，我正好沏了一壶清茶。"',
    roomId: 'jiaoma_capital',
    dialogues: doupoDialogues.yunyan,
    faction: {
      name: '花宗',
      type: DaoLuFactionType.SECT,
      description: '花宗是中州二宗之一，以花入道，讲究心境平和、与世无争。宗门弟子多为女子，修炼花属性斗技，擅长治愈与辅助。',
      power: '中州二宗之一',
      location: '中州花宗',
      leader: '花宗宗主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'yunyan_story_1',
        title: '云岚山初遇',
        requiredIntimacy: 0,
        description: '你在云岚山历练时偶遇云韵。她正独自站在悬崖边，望着翻滚的云海发呆。山风吹动她的素白长裙，宛如即将飞升的仙子。',
        choices: [
          {
            text: '上前询问她是否有什么心事',
            effect: (player) => ({ messages: ['云韵微微一愣，随即露出一丝苦笑："心事？或许吧。云岚宗的担子太重，有时候真想放下一切，做回当年那个无忧无虑的少女。"'], intimacyChange: 12, reward: '云韵的信任' }),
          },
          {
            text: '静静站在她身旁，陪她看云海',
            effect: (player) => ({ messages: ['你没有说话，只是静静地陪着她。良久，云韵轻声道："谢谢你。很久没有这样安静地看云海了。"'], intimacyChange: 15 }),
          },
        ],
      },
      {
        id: 'yunyan_story_2',
        title: '魔兽山脉同行',
        requiredIntimacy: 50,
        description: '云韵邀你一同前往魔兽山脉采集一种名为"云心草"的珍稀药材。山脉中魔兽横行，危机四伏，她却在危机中展现出令人心疼的脆弱。',
        choices: [
          {
            text: '始终护在她身前，不让她受一丝伤害',
            effect: (player) => ({ messages: ['你挡在她身前，斩杀了数头高阶魔兽。云韵看着你受伤的背影，眼眶微红："你为什么……要对我这么好？云岚宗欠你的，我自己也欠你的……"'], intimacyChange: 20, reward: '云心草' }),
          },
          {
            text: '与她配合，共同应对危机',
            effect: (player) => ({ messages: ['你们配合默契，她施展风属性斗技牵制魔兽，你负责致命一击。战斗结束后，云韵微笑道："与你并肩作战，感觉很安心。"'], intimacyChange: 15 }),
          },
        ],
      },
      {
        id: 'yunyan_story_3',
        title: '云岚宗覆灭之夜',
        requiredIntimacy: 200,
        description: '魂殿联合萧炎覆灭云岚宗的那个夜晚，云韵独自站在云岚山大殿的废墟中，手中的长剑滴着鲜血。她面临着人生中最艰难的选择。',
        choices: [
          {
            text: '带她离开这片伤心之地',
            effect: (player) => ({ messages: ['你强行带她离开云岚山。她在你的怀中痛哭失声，那是她第一次在人前失态："云岚宗没了……师父没了……我什么都没有了……"你紧紧抱住她："你还有我。"'], intimacyChange: 35, reward: '云韵的依赖' }),
          },
          {
            text: '陪她一起面对，无论结果如何',
            effect: (player) => ({ messages: ['你陪她站在废墟中，面对萧炎和魂殿的强者。云韵握紧你的手，目光逐渐坚定："云岚宗虽灭，但我云韵不会倒下。谢谢你，陪我走到最后。"'], intimacyChange: 30, reward: '生死与共之谊' }),
          },
        ],
      },
      {
        id: 'yunyan_story_4',
        title: '花宗花海中的告白',
        requiredIntimacy: 500,
        description: '花宗的花海在月光下绽放，云韵站在花丛中，素白长裙被花瓣沾染了点点色彩。她转身看你，目光中没有了往日的忧伤，只有满满的温柔。',
        choices: [
          {
            text: '告诉她你愿意陪她看尽世间花海',
            effect: (player) => ({ messages: ['云韵笑了，那是你见过的最美的笑容。她轻轻握住你的手："云岚宗的云海、花宗的花海，都不及你眼中的风景。此生有你，足矣。"'], intimacyChange: 100, reward: '花宗宗主之心' }),
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
    firstMeeting: '云岚山悬崖边，素白长裙的女子独立风中。云海在她脚下翻滚，夕阳为她的侧脸镀上一层金边。她转头看你，目光清澈如水，却藏着说不尽的沧桑。那一刻，你想抚平她眉间的忧愁。',
    backgroundStory: '云韵，曾经的云岚宗宗主，加玛帝国顶尖强者。她天资卓绝，自幼被定为云岚宗接班人，肩负重振宗门的使命。然而命运弄人，她爱上了不该爱的人，云岚宗也最终覆灭。她带着满身伤痕离开故土，加入中州花宗，从宗主变成了花宗的普通一员。她外表清冷如仙，内心却温柔脆弱，渴望有人能真正理解她、陪伴她。',
    personalityTraits: ['清冷如仙', '温柔脆弱', '重情重义', '坚韧不拔'],
    likes: ['云海', '清茶', '剑法', '宁静的时光'],
    dislikes: ['背叛', '战争', '魂殿', '勾心斗角'],
    favoriteGifts: ['名茶', '古籍', '风属性宝物', '素雅的首饰'],
  },
  {
    id: 'daolu_xiaoyixian',
    name: '小医仙',
    title: '厄难毒体',
    description: '一位身着淡绿色衣裙的温婉女子，气质柔弱，眉眼间带着淡淡的忧愁。她的肌肤白皙近乎透明，周身若有若无地飘散着一丝极淡的香气——那是厄难毒体特有的气息，美丽却致命。',
    greeting: '小医仙抬起头，看到你来时露出一丝温柔的笑意："你来了。我刚配好一副药方，正想找人试试效果。你……不会嫌弃我是个毒女吧？"',
    roomId: 'wutan_plaza',
    dialogues: doupoDialogues.xiaoyixian,
    faction: {
      name: '毒宗',
      type: DaoLuFactionType.WANDERER,
      description: '毒宗是小医仙在出云帝国建立的势力，以毒术闻名。她虽为毒宗之主，却从未忘记济世救人的初心，只以毒术对付该死之人。',
      power: '出云帝国顶级势力',
      location: '出云帝国',
      leader: '小医仙',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'xiyx_story_1',
        title: '青山镇初遇',
        requiredIntimacy: 0,
        description: '你在青山镇的万药斋初见小医仙。她正蹲在药柜前分拣药材，动作轻柔，神情专注。阳光透过窗棂洒在她身上，让她看起来像个普通的医女，而非令人闻风丧胆的毒宗之主。',
        choices: [
          {
            text: '上前帮忙分拣药材',
            effect: (player) => ({ messages: ['你蹲下身帮她分拣药材。小医仙惊讶地抬头："你……不怕这些药材有毒吗？"随即她笑了："谢谢你，很少有人愿意接近我。"'], intimacyChange: 15, reward: '小医仙的好感' }),
          },
          {
            text: '向她请教医术',
            effect: (player) => ({ messages: ['你向她请教医术。小医仙眼睛一亮，滔滔不绝地讲解起来："这株是冰心草，能清热解毒；这朵是七星花，可活血化淤……"她讲得兴起，脸上洋溢着少有的光彩。'], intimacyChange: 10, reward: '基础医术心得' }),
          },
        ],
      },
      {
        id: 'xiyx_story_2',
        title: '厄难毒体发作',
        requiredIntimacy: 50,
        description: '小医仙的厄难毒体突然发作，毒素失控，整个人被灰紫色的毒气包裹。她痛苦地蜷缩在地上，却强忍着不让自己伤害到你。',
        choices: [
          {
            text: '不顾危险，冲入毒气中抱住她',
            effect: (player) => ({ messages: ['你冲入毒气中，紧紧抱住痛苦不堪的小医仙。她在你怀中挣扎："放开我……你会死的……"你却抱得更紧："那就一起死。"最终，你的斗气奇迹般地帮她稳定了毒素。'], intimacyChange: 25, reward: '毒体压制之法' }),
          },
          {
            text: '以灵魂力量帮她稳定心神',
            effect: (player) => ({ messages: ['你以灵魂力量探入她体内，帮她稳定躁动的毒素。小医仙缓缓睁开眼，泪水滑落："为什么要救我……我这种人，死了不是更好吗……"'], intimacyChange: 20, reward: '灵魂疗伤术' }),
          },
        ],
      },
      {
        id: 'xiyx_story_3',
        title: '毒宗危机',
        requiredIntimacy: 200,
        description: '魂殿盯上了小医仙的厄难毒体，派出强者欲将她抓走炼制毒丹。毒宗弟子死伤惨重，小医仙独自迎战魂殿斗宗，毒素即将彻底失控。',
        choices: [
          {
            text: '与她并肩作战，生死与共',
            effect: (player) => ({ messages: ['你挡在她身前，与魂殿强者殊死搏斗。小医仙看着你伤痕累累的背影，终于彻底释放厄难毒体的力量，将敌人尽数毒杀。战斗结束后，她扑入你怀中痛哭："我以为……又要失去一个重要的人了……"'], intimacyChange: 30, reward: '毒宗至宝' }),
          },
          {
            text: '带她突围，保全她的性命',
            effect: (player) => ({ messages: ['你当机立断，带着她突围而出。小医仙望着燃烧的毒宗，泪水模糊了双眼："毒宗没了……但我还有你。只要有你在，我就能重新站起来。"'], intimacyChange: 35, reward: '生死相依之誓' }),
          },
        ],
      },
      {
        id: 'xiyx_story_4',
        title: '万药斋的重逢',
        requiredIntimacy: 500,
        description: '你们回到青山镇的万药斋，那里已经荒废多年。小医仙站在破败的药柜前，却露出了释然的微笑。',
        choices: [
          {
            text: '帮她重建万药斋，许下一生之约',
            effect: (player) => ({ messages: ['你握住她的手，许诺帮她重建万药斋。小医仙泪流满面，却笑得前所未有的灿烂："我这一生的厄难，原来都是为了遇见你。从今以后，这万药斋就是我们的家。"'], intimacyChange: 100, reward: '万药斋之主' }),
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
    firstMeeting: '青山镇万药斋，淡绿衣裙的医女蹲在药柜前分拣药材。阳光洒在她身上，让她看起来柔弱而纯净。她抬头看你，目光中带着一丝不易察觉的自卑与期待——那是厄难毒体拥有者对"被接纳"的渴望。',
    backgroundStory: '小医仙，天生厄难毒体，自幼被视为灾星。她跟着师父学习医术，本想济世救人，却因毒体被人畏惧和排斥。她在青山镇开设万药斋，过着平静的生活，直到遇见萧炎和后来的你。她温柔善良，内心却极度自卑，总觉得自己不配被人爱护。为了控制毒体，她建立了毒宗，却从未忘记初心，只用毒术对付恶徒。',
    personalityTraits: ['温柔善良', '自卑敏感', '坚韧不拔', '重情重义'],
    likes: ['医术', '药材', '宁静的生活', '被需要的感觉'],
    dislikes: ['被排斥', '毒体失控', '魂殿', '伤害无辜'],
    favoriteGifts: ['珍稀药材', '医书', '解毒丹方', '淡绿色衣裙'],
  },
  {
    id: 'daolu_yafei',
    name: '雅妃',
    title: '米特尔家族拍卖师',
    description: '一位身着红色紧身长裙的绝美女子，身材曼妙，气质雍容华贵。她的眉眼间带着精明的算计，却在看向你时流露出一丝真诚。作为米特尔拍卖行的实际掌权人，她手腕高超，是加玛帝国商界最厉害的女人。',
    greeting: '雅妃倚在软榻上，手中把玩着一枚玉如意，眼波流转："哎呀，稀客呀。来米特尔拍卖行，是想买东西呢，还是……想看我呢？"',
    roomId: 'miter_house',
    dialogues: doupoDialogues.yafei,
    faction: {
      name: '米特尔家族',
      type: DaoLuFactionType.CLAN,
      description: '米特尔家族是加玛帝国三大家族之一，以拍卖行和商业网络闻名。家族生意遍布整个帝国，情报网也极为发达。雅妃虽是旁系出身，却凭实力坐上了拍卖行掌柜的位置。',
      power: '加玛帝国三大家族之一',
      location: '乌坦城/帝都',
      leader: '米特尔家族族长',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'yafei_story_1',
        title: '拍卖行初遇',
        requiredIntimacy: 0,
        description: '你第一次踏入米特尔拍卖行，便被这位红裙女子的风采所折服。她游刃有余地周旋于各方势力之间，却在无人注意时露出一丝疲惫。',
        choices: [
          {
            text: '以真诚相待，不掺杂利益算计',
            effect: (player) => ({ messages: ['你没有像其他人那样阿谀奉承，而是真诚地称赞她的能力。雅妃微微一愣，随即笑了："你是第一个不把我当花瓶的人。有趣，我们交个朋友吧。"'], intimacyChange: 15, reward: '米特尔贵宾卡' }),
          },
          {
            text: '展示实力，表示可以合作',
            effect: (player) => ({ messages: ['你展示了自身的实力和底牌。雅妃眼中闪过精光："有实力的人，才有资格跟我谈生意。说吧，你想怎么合作？"'], intimacyChange: 10, reward: '合作意向书' }),
          },
        ],
      },
      {
        id: 'yafei_story_2',
        title: '帝都风云',
        requiredIntimacy: 50,
        description: '雅妃在帝都的米特尔总部遭遇家族内部权力斗争，旁系出身的她被嫡系长老排挤，甚至面临被撤职的危险。',
        choices: [
          {
            text: '站在她这边，帮她稳固地位',
            effect: (player) => ({ messages: ['你公开站在雅妃这边，以实力震慑了那些心怀不轨的长老。雅妃感激地看着你："在这尔虞我诈的家族里，你是第一个真心帮我的人。"'], intimacyChange: 20, reward: '雅妃的信赖' }),
          },
          {
            text: '出谋划策，以智取胜',
            effect: (player) => ({ messages: ['你帮她制定了一系列反击策略，成功瓦解了嫡系的阴谋。雅妃佩服地看着你："你不仅实力强，脑子也这么好使。跟你合作，真是愉快。"'], intimacyChange: 18 }),
          },
        ],
      },
      {
        id: 'yafei_story_3',
        title: '拍卖行的危机',
        requiredIntimacy: 200,
        description: '魂殿势力渗透加玛帝国，米特尔拍卖行的生意遭到毁灭性打击。雅妃面临人生最大的危机，却在此时收到了你的来信。',
        choices: [
          {
            text: '火速赶到，与她共渡难关',
            effect: (player) => ({ messages: ['你放下一切赶到她身边。雅妃看到你时，强撑的坚强终于崩溃，扑入你怀中痛哭："我以为……你不会来的……在这世上，我只剩下你了……"'], intimacyChange: 30, reward: '雅妃的真心' }),
          },
          {
            text: '暗中布局，帮她铲除威胁',
            effect: (player) => ({ messages: ['你暗中出手，将魂殿渗透的势力连根拔起。雅妃得知后，又惊又喜："你总是在我最需要的时候出现。这辈子，我雅妃跟定你了。"'], intimacyChange: 25, reward: '米特尔暗部掌控权' }),
          },
        ],
      },
      {
        id: 'yafei_story_4',
        title: '米特尔之巅的誓言',
        requiredIntimacy: 500,
        description: '在米特尔拍卖行最高的阁楼中，雅妃身穿一袭大红嫁衣，美得惊心动魄。她望着窗外的帝都夜景，转身对你伸出了手。',
        choices: [
          {
            text: '握住她的手，许她一世繁华',
            effect: (player) => ({ messages: ['你握住她的手，将她拥入怀中。雅妃靠在你胸前，轻声道："我算计了一生，却从未算计到你会走进我心里。这辈子，我什么都不想要了，只要你。"'], intimacyChange: 100, reward: '米特尔共主之誓' }),
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
    firstMeeting: '米特尔拍卖行，红裙女子游刃有余地周旋于各方势力之间。她的笑容完美得无懈可击，却在转身看你时，眼中闪过一丝真实的好奇。在那一瞬间，你看到了她面具下的孤独——那是高位者无人能懂的寂寞。',
    backgroundStory: '雅妃，米特尔家族旁系出身，自幼便展现出惊人的商业天赋。她凭借美貌和智慧，一步步从拍卖行的小职员爬到了掌柜的位置。在外人眼中，她是个精明算计、手腕高超的女强人，但只有你知道，她内心的柔软和脆弱。她渴望有人能看到她面具下的真实，渴望一份不掺杂利益的真情。',
    personalityTraits: ['精明算计', '手腕高超', '外热内冷', '渴望真情'],
    likes: ['商业', '拍卖', '权力', '真诚的陪伴'],
    dislikes: ['被当作花瓶', '虚伪', '背叛', '家族斗争'],
    favoriteGifts: ['珍稀宝物', '商业情报', '红色首饰', '高档茶叶'],
  },
  {
    id: 'daolu_nanyanran',
    name: '纳兰嫣然',
    title: '云岚宗少宗主',
    description: '一位身着月白色劲装的英气少女，腰悬长剑，眉目间带着一股不服输的傲气。她是云岚宗百年不遇的天才，也是加玛帝国年轻一代的佼佼者。年少时的冲动让她付出了沉重的代价，如今的她褪去了青涩，多了几分沉稳与成熟。',
    greeting: '纳兰嫣然收剑而立，月白色的劲装在风中猎猎作响。她看向你，目光中少了往日的锋芒，多了一丝柔和："你来了。正好，陪我练会儿剑吧。"',
    roomId: 'yunlan_sect',
    dialogues: doupoDialogues.nanyanran,
    faction: {
      name: '云岚宗',
      type: DaoLuFactionType.SECT,
      description: '云岚宗是加玛帝国第一大宗门，传承数百年，以风属性斗技闻名。宗门弟子遍布帝国，势力庞大。纳兰嫣然自幼被定为少宗主，肩负宗门荣耀。',
      power: '加玛帝国第一宗门',
      location: '云岚山',
      leader: '云韵宗主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'nyr_story_1',
        title: '云岚山初遇',
        requiredIntimacy: 0,
        description: '你在云岚山历练时遇见了正在练剑的纳兰嫣然。她的剑法凌厉，却隐隐透着一丝烦躁。看到你时，她收剑而立，目光中带着审视。',
        choices: [
          {
            text: '称赞她的剑法，提出切磋',
            effect: (player) => ({ messages: ['纳兰嫣然眼中闪过一丝战意："好！我正好想找个人试试新练的剑招。"你们切磋了数十招，她对你的实力颇为认可。'], intimacyChange: 12, reward: '纳兰嫣然的认可' }),
          },
          {
            text: '询问她为何烦躁，表示关心',
            effect: (player) => ({ messages: ['纳兰嫣然微微一愣，随即冷哼："我的事不用你管。"但她并没有离开，而是低声道："只是……有些心烦罢了。"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'nyr_story_2',
        title: '三年之约的阴影',
        requiredIntimacy: 50,
        description: '纳兰嫣然独自坐在云岚山后山，望着萧炎离去的方向发呆。三年之约的惨败让她背负着巨大的心理压力，宗门弟子背后的议论更是让她难以承受。',
        choices: [
          {
            text: '告诉她失败并不可怕，重要的是重新站起来',
            effect: (player) => ({ messages: ['你坐在她身旁，陪她聊了很久。纳兰嫣然眼眶微红："你说得对……我纳兰嫣然不会被打倒。三年之约输了，但我还有下一个三年，三十年！"'], intimacyChange: 18, reward: '纳兰嫣然的信任' }),
          },
          {
            text: '陪她练剑，以行动支持她',
            effect: (player) => ({ messages: ['你陪她练了一整天的剑。夕阳西下时，纳兰嫣然收剑而立，汗水浸湿了衣衫，脸上却带着释然的笑容："谢谢你。陪我练剑的人不少，但你是唯一不问原因的。"'], intimacyChange: 15 }),
          },
        ],
      },
      {
        id: 'nyr_story_3',
        title: '云岚宗覆灭之际',
        requiredIntimacy: 200,
        description: '萧炎杀上云岚宗，云岚宗面临覆灭危机。纳兰嫣然站在宗门广场中央，手持长剑，准备以死捍卫宗门最后的尊严。',
        choices: [
          {
            text: '站在她身旁，与她共同面对',
            effect: (player) => ({ messages: ['你站在她身旁，与她并肩面对萧炎和魂殿的强者。纳兰嫣然转头看你，泪水在眼眶中打转："你为什么要来……这是我云岚宗的事……""你的事，就是我的事。"'], intimacyChange: 30, reward: '生死与共之谊' }),
          },
          {
            text: '带她离开，保全她的性命',
            effect: (player) => ({ messages: ['你强行带她离开云岚山。纳兰嫣然挣扎着："放开我！我要与宗门共存亡！"你却紧紧抱住她："云岚宗已经没了，但你还活着。活下去，才有希望。"'], intimacyChange: 35, reward: '纳兰嫣然的余生' }),
          },
        ],
      },
      {
        id: 'nyr_story_4',
        title: '放下过往的释然',
        requiredIntimacy: 500,
        description: '离开云岚宗后，纳兰嫣然在一座小山村中隐居。你找到她时，她正在教村里的孩子们练剑，脸上洋溢着纯真的笑容。',
        choices: [
          {
            text: '告诉她你愿陪她重新开始',
            effect: (player) => ({ messages: ['纳兰嫣然愣住了，随即泪如雨下。她扑入你怀中，泣不成声："我欠萧炎的，已经还清了。我欠云岚宗的，也用命还过了。从今以后，我只是纳兰嫣然，只是你的……嫣然。"'], intimacyChange: 100, reward: '纳兰嫣然之心' }),
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
    firstMeeting: '云岚山练武场，月白劲装的少女收剑而立，英姿飒爽。她的目光如剑般锐利，却在看向你时微微一怔。那是纳兰嫣然，云岚宗的少宗主，也是背负了太多期望和枷锁的少女。',
    backgroundStory: '纳兰嫣然，云岚宗少宗主，加玛帝国年轻一代的天才。她自幼被定为少宗主，背负着宗门的荣耀和期望。年少轻狂时，她当众退婚，却不知这一举动改变了所有人的命运。三年之约的惨败让她明白了 humility，云岚宗的覆灭让她失去了所有。如今的她褪去了青涩，学会了珍惜和感恩，也渴望一份能让她放下一切的真情。',
    personalityTraits: ['英气傲骨', '执着坚韧', '敢爱敢恨', '知错能改'],
    likes: ['剑法', '修炼', '自由自在', '被认可'],
    dislikes: ['被束缚', '虚伪', '失败', '背叛'],
    favoriteGifts: ['名剑', '剑谱', '修炼资源', '月白色的衣物'],
  },
  {
    id: 'daolu_ziyan',
    name: '紫妍',
    title: '太虚古龙',
    description: '一位身着紫色衣裙的少女，外表看起来不过十四五岁，灵动活泼，眼珠子滴溜溜地转，仿佛随时在打着什么鬼主意。别看她身形娇小，体内却蕴含着太虚古龙王族的恐怖力量，一拳能打爆一座山。',
    greeting: '紫妍看到你来，眼睛一亮，蹦蹦跳跳地跑过来："你终于来了！我等你好久了！快，给我带好吃的了吗？没有的话……我就咬你！"',
    roomId: 'zhongzhou_city',
    dialogues: doupoDialogues.ziyan,
    faction: {
      name: '太虚古龙族',
      type: DaoLuFactionType.MONSTER,
      description: '太虚古龙是魔兽界三大族群之首，天生掌控空间之力，成年的太虚古龙可撕裂虚空，穿梭于空间裂缝之中。紫妍是太虚古龙族的王族血脉，未来的龙皇。',
      power: '魔兽界三大族群之首',
      location: '虚空雷池/古龙岛',
      leader: '太虚古龙皇',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'ziyan_story_1',
        title: '迦南学院初遇',
        requiredIntimacy: 0,
        description: '你在迦南学院的内院遇见了正在偷吃丹药的紫妍。她看到你时，嘴里还塞着丹药，鼓着腮帮子，像只偷吃的小松鼠。',
        choices: [
          {
            text: '递给她更多丹药，表示友好',
            effect: (player) => ({ messages: ['你递给她一瓶丹药。紫妍眼睛亮得像星星，一把抢过去："你人真好！比学院里那些小气鬼强多了！以后你就是我朋友了，谁敢欺负你，我帮你揍他！"'], intimacyChange: 15, reward: '紫妍的友谊' }),
          },
          {
            text: '逗她玩，问她是不是小馋龙',
            effect: (player) => ({ messages: ['紫妍气鼓鼓地叉腰："我才不是小馋龙！我这是……这是在补充能量！对，补充能量！"她瞪了你一眼，却忍不住笑了："不过……你说得也没错。"'], intimacyChange: 12 }),
          },
        ],
      },
      {
        id: 'ziyan_story_2',
        title: '太虚古龙觉醒',
        requiredIntimacy: 50,
        description: '紫妍体内的太虚古龙血脉突然觉醒，龙皇气息席卷整个迦南学院。她痛苦地蜷缩在地上，身体周围的空间不断扭曲撕裂。',
        choices: [
          {
            text: '冲上去抱住她，用自己的斗气帮她稳定血脉',
            effect: (player) => ({ messages: ['你冲上去紧紧抱住她，不顾周围撕裂的空间。紫妍在你怀中颤抖："好痛……我好怕……"你轻声安慰："别怕，我在。"最终，她成功觉醒了血脉。'], intimacyChange: 20, reward: '龙皇血脉共鸣' }),
          },
          {
            text: '在旁护法，帮她隔绝外界干扰',
            effect: (player) => ({ messages: ['你在旁布置结界，帮她隔绝外界干扰。紫妍觉醒后，虚弱地靠在你肩上："谢谢你……刚才真的好可怕……但我感觉现在好强大！"'], intimacyChange: 15 }),
          },
        ],
      },
      {
        id: 'ziyan_story_3',
        title: '古龙岛之战',
        requiredIntimacy: 200,
        description: '太虚古龙族内部爆发内战，三大龙王联手欲夺龙皇之位。紫妍被迫返回古龙岛，面对比自己强大数倍的敌人。',
        choices: [
          {
            text: '跟她一起去古龙岛，帮她夺回皇位',
            effect: (player) => ({ messages: ['你跟她一起杀入古龙岛。紫妍化身为百丈巨龙，龙威浩荡。激战中，你为她挡下了致命一击。紫妍悲痛欲绝，彻底爆发了龙皇之力，将三大龙王尽数击溃。战后，她趴在你身旁哭得像个孩子："不许死……我不许你死……"'], intimacyChange: 35, reward: '龙皇守护之誓' }),
          },
          {
            text: '暗中帮助，帮她离间三大龙王',
            effect: (player) => ({ messages: ['你暗中出手，成功离间了三大龙王的联盟。紫妍趁机各个击破，最终夺回龙皇之位。她站在龙皇宝座上，朝你露出得意的笑容："怎么样，我厉害吧？不过……最厉害的还是你啦！"'], intimacyChange: 25, reward: '古龙岛友谊' }),
          },
        ],
      },
      {
        id: 'ziyan_story_4',
        title: '龙皇的嫁妆',
        requiredIntimacy: 500,
        description: '紫妍彻底掌控太虚古龙族后，宣布要嫁给你。整个古龙岛沸腾了，长老们反对，她却一拍龙皇宝座："本皇想嫁谁就嫁谁！谁敢反对，先问问我的拳头！"',
        choices: [
          {
            text: '笑着答应，许她一世宠溺',
            effect: (player) => ({ messages: ['你笑着答应了。紫妍扑入你怀中，又哭又笑："你答应啦！不许反悔！不然我就……我就哭给你看！"太虚古龙族的长老们面面相觑，最终只能无奈接受这位人类龙皇夫婿。'], intimacyChange: 100, reward: '太虚古龙皇夫婿' }),
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
    firstMeeting: '迦南学院内院，紫裙少女蹲在角落里偷吃丹药，鼓着腮帮子像只小松鼠。她转头看你，眼睛亮得像星星，嘴角还沾着丹药渣。那一刻，你无法将眼前这个可爱的小女孩与"太虚古龙王族"联系起来。',
    backgroundStory: '紫妍，太虚古龙族的王族血脉，未来的龙皇。她幼年时期误食化形草，变成了人类小女孩的模样，被迦南学院的大长老收养。她外表天真可爱，实则体内蕴含着恐怖的力量。她喜欢美食，尤其是丹药，性格直率活泼，爱恨分明。虽然她有时候任性调皮，但内心极其重情义，一旦认定的人，就会用生命去守护。',
    personalityTraits: ['天真活泼', '直率任性', '重情重义', '爱吃'],
    likes: ['丹药', '美食', '打架', '被宠爱'],
    dislikes: ['饿肚子', '被小看', '背叛', '束缚'],
    favoriteGifts: ['高阶丹药', '美食', '亮晶晶的宝物', '紫色裙子'],
  },
  {
    id: 'daolu_caoying',
    name: '曹颖',
    title: '丹塔妖女',
    description: '一位身着黑色紧身炼丹服的妖艳女子，身材火辣，眉眼间透着一股勾魂摄魄的魅惑。她是丹塔最年轻的长老，灵魂力量强大得令人发指，一手炼丹术更是让无数老怪物自叹不如。她被称为"妖女"，不仅因为容貌，更因为她那让人捉摸不透的性格。',
    greeting: '曹颖靠在炼丹炉旁，纤长的手指把玩着一枚刚出炉的丹药，媚眼如丝："哟，稀客呀。来丹塔找我的男人可不少，但能让本小姐正眼瞧的，没几个。你……算一个。"',
    roomId: 'alchemy_city',
    dialogues: doupoDialogues.caoying,
    faction: {
      name: '丹塔',
      type: DaoLuFactionType.SECT,
      description: '丹塔是斗气大陆炼药师的圣地，分为外塔和小丹塔。丹塔拥有三位巨头，皆是八品以上的炼药宗师。曹颖是丹塔最年轻的长老，灵魂力量达到灵境，是丹塔未来的希望。',
      power: '斗气大陆炼药师圣地',
      location: '丹城',
      leader: '丹塔三巨头',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'caoying_story_1',
        title: '丹会初遇',
        requiredIntimacy: 0,
        description: '你在丹塔举办的丹会上遇见了曹颖。她正在当众炼制一枚七品丹药，手法娴熟，灵魂力量波动让在场所有人都为之侧目。炼丹结束后，她注意到了人群中的你。',
        choices: [
          {
            text: '称赞她的炼丹术，表示佩服',
            effect: (player) => ({ messages: ['曹颖挑了挑眉，嘴角勾起一抹得意的笑："有眼光。能看懂我炼丹手法的人可不多。你……也是炼药师？"'], intimacyChange: 12, reward: '曹颖的注意' }),
          },
          {
            text: '指出她炼丹中的一个细节问题',
            effect: (player) => ({ messages: ['曹颖先是一愣，随即眼中闪过惊讶和兴趣："哟，有点本事嘛。居然能看出我火候控制的问题。来，跟我去丹房，我们好好聊聊。"'], intimacyChange: 15 }),
          },
        ],
      },
      {
        id: 'caoying_story_2',
        title: '灵魂双修之法',
        requiredIntimacy: 50,
        description: '曹颖邀请你一同研究一种古老的灵魂双修之法，此法需要两人灵魂力量高度契合，共同参悟灵魂奥秘。研究过程中，你们的灵魂产生了奇妙的共鸣。',
        choices: [
          {
            text: '全身心投入，与她灵魂交融',
            effect: (player) => ({ messages: ['你们的灵魂力量交融在一起，产生了前所未有的共鸣。曹颖的灵魂深处向你敞开了大门，你感受到了她内心的孤独和对炼丹的执着。结束后，她难得地露出一丝羞涩："你……看到了吧？不许说出去！"'], intimacyChange: 22, reward: '灵魂双修秘法' }),
          },
          {
            text: '保持清醒，帮她完善秘法',
            effect: (player) => ({ messages: ['你保持清醒，帮她分析和完善了灵魂双修之法。曹颖佩服地看着你："你不仅灵魂力量强，头脑也这么好使。我越来越欣赏你了。"'], intimacyChange: 15 }),
          },
        ],
      },
      {
        id: 'caoying_story_3',
        title: '丹塔危机',
        requiredIntimacy: 200,
        description: '魂殿联合一批邪修炼药师进攻丹塔，欲夺取丹塔的传承异火。曹颖独自守护丹塔核心，面对数位斗尊强者的围攻，灵魂力量几近枯竭。',
        choices: [
          {
            text: '冲入核心区域，与她并肩作战',
            effect: (player) => ({ messages: ['你冲入丹塔核心，挡在曹颖身前。她看到你时，眼中闪过复杂的神色："你怎么来了……这里危险……""你的危险，就是我的危险。"你们联手击退了敌人。战后，她靠在你怀中，虚弱却满足："原来……被人保护的感觉这么好。"'], intimacyChange: 30, reward: '丹塔守护勋章' }),
          },
          {
            text: '以灵魂力量支援她，助她反败为胜',
            effect: (player) => ({ messages: ['你以灵魂力量隔空支援她，助她施展了一招禁忌丹术，将敌人尽数击溃。曹颖战后找到你，眼中闪着光芒："我们的灵魂……真的很契合。这辈子，你只能是我的。"'], intimacyChange: 25, reward: '灵魂契约' }),
          },
        ],
      },
      {
        id: 'caoying_story_4',
        title: '丹塔之巅的丹誓',
        requiredIntimacy: 500,
        description: '丹塔之巅，曹颖身穿一袭黑色嫁衣，美艳不可方物。她亲手炼制了一枚"同心丹"，据说服下此丹的两人，灵魂将永远纠缠在一起，生死不离。',
        choices: [
          {
            text: '与她一同服下同心丹，立下永恒之誓',
            effect: (player) => ({ messages: ['你们一同服下同心丹。曹颖的灵魂与你的灵魂彻底交融，那种亲密无间的感觉超越了任何肉体接触。她媚眼如丝，却流下两行清泪："我曹颖这一辈子，只认你一个人。谁敢抢你，我就毒死谁。"'], intimacyChange: 100, reward: '同心丹契约' }),
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
    firstMeeting: '丹会现场，黑衣女子操控着炼丹炉，灵魂力量如海浪般汹涌。她转头看你，媚眼中带着审视和玩味。那是曹颖，丹塔的妖女，也是灵魂力量强大到令人心悸的天才炼药师。',
    backgroundStory: '曹颖，丹塔最年轻的长老，灵魂境界达到灵境，是丹塔百年不遇的炼药天才。她出身普通，却凭一己之力在丹塔站稳了脚跟。她外表妖艳魅惑，性格捉摸不透，被称为"妖女"，但内心深处极度孤独，渴望找到一个能与她灵魂共鸣的人。她对炼丹有着近乎偏执的热爱，为了炼丹可以不顾一切。',
    personalityTraits: ['妖艳魅惑', '捉摸不透', '执着偏执', '内心孤独'],
    likes: ['炼丹', '灵魂修炼', '强者', '被理解'],
    dislikes: ['平庸', '虚伪', '被小看', '妨碍炼丹之人'],
    favoriteGifts: ['珍稀丹方', '灵魂类宝物', '高阶药材', '黑色衣裙'],
  },
];
