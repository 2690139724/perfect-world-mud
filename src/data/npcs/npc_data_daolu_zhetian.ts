import { IDaoLu, DaoLuFactionType, DUAL_CULTIVATION_POSE_TEMPLATES, DAO_LU_INTERACTION_TEMPLATES } from '../../domain/entities/DaoLu';
import { INPCDialogue } from '../../domain/entities/NPC';

const zhetianDialogues: Record<string, INPCDialogue[]> = {
  jiziyue: [
    { id: 'jiziyue_family', topic: '询问姬家', text: '"姬家乃是荒古世家，传承悠久。"姬紫月眨了眨眼睛，嘴角扬起一抹得意的笑："我哥哥姬皓月可是东荒神体，很厉害吧？不过嘛……我觉得你将来也不会差。"' },
    { id: 'jiziyue_tianyan', topic: '谈论天演神术', text: '"你对天演神术感兴趣？"姬紫月眼中闪过一丝狡黠："这可是姬家不传之秘，能推算吉凶、洞察天机。不过嘛……看在你这么诚心的份上，我可以教你一点基础的。"' },
    { id: 'jiziyue_adventure', topic: '邀请去探险', text: '"探险？好啊好啊！"姬紫月兴奋地拍手："我早就想去太玄门附近的那处遗迹看看了，据说里面有上古传承呢！"' },
  ],
  anmiaoyi: [
    { id: 'anmiaoyi_miaoyu', topic: '询问妙欲庵', text: '"妙欲庵虽名为欲，实则讲究以情入道。"安妙依轻抚琴弦，眼波流转："世间万物，皆由情生。若不历情劫，又如何看破红尘？"' },
    { id: 'anmiaoyi_music', topic: '欣赏琴音', text: '"这曲子名为《霓裳羽衣》，是我自创的。"安妙依指尖轻拨，琴音袅袅："你听，这前段如春花烂漫，中段似秋月清冷，尾音却又如冬雪消融……"' },
    { id: 'anmiaoyi_dao', topic: '探讨大道', text: '"大道无情，人有情。"安妙依放下琴弦，目光悠远："我愿以妙欲之道，求证无上大道。若能得一知己，共参阴阳，此生无憾。"' },
  ],
  yanruyu: [
    { id: 'yanruyu_yaodi', topic: '询问妖帝', text: '"先祖乃东荒最后一位妖帝，震古烁今。"颜如玉眼中闪过一丝骄傲，随即黯然："可惜妖帝之心遗失多年，我身为后人，却不能光复先祖荣光……"' },
    { id: 'yanruyu_greenlotus', topic: '谈论混沌青莲', text: '"你见过混沌青莲？"颜如玉美眸中闪过一丝惊讶："那是与先祖伴生的至宝，早已失落万古。若能寻回，妖族复兴有望。"' },
    { id: 'yanruyu_yaozu', topic: '探讨妖族未来', text: '"妖族势微，已不复太古辉煌。"颜如玉望向远方："但我相信，只要妖族同心，终有一日能重现先祖荣光。你愿意……助我一臂之力吗？"' },
  ],
  qinyao: [
    { id: 'qinyao_yaozu', topic: '询问妖族生活', text: '"妖族的生活？可比你们人族自在多了。"秦瑶掩嘴轻笑，媚眼如丝："我们不受那些繁文缛节束缚，想做什么便做什么，何等逍遥？"' },
    { id: 'qinyao_princess', topic: '谈论颜如玉', text: '"公主殿下是我妖族复兴的希望。"秦瑶收起嬉笑之色，难得认真："我秦瑶虽只是一介小妖，但愿为公主赴汤蹈火，在所不辞。"' },
    { id: 'qinyao_cultivation', topic: '探讨修炼', text: '"妖族修炼与人族不同，我们更注重淬炼肉身。"秦瑶展颜一笑："要不要我教你几招妖族的身法？保证让你在战斗中如虎添翼。"' },
  ],
  yiqingwu: [
    { id: 'yiqingwu_guanghan', topic: '询问广寒宫', text: '"广寒宫居于九天之上，终年云雾缭绕。"伊轻舞声音清冷如月："宫中弟子修炼《广寒真经》，讲究心如止水，不染尘埃。"' },
    { id: 'yiqingwu_moon', topic: '谈论太阴之力', text: '"太阴之力至柔至寒，却蕴含无穷生机。"伊轻舞抬起玉手，一缕银辉在掌心流转："你看，这便是太阴精华，可净化万物，亦可滋养万物。"' },
    { id: 'yiqingwu_dao', topic: '探讨无情道', text: '"世人皆道广寒宫修无情道，其实不然。"伊轻舞微微摇头："非是无情，而是至情。唯有经历过情劫，才能真正超脱。"' },
  ],
  fanxian: [
    { id: 'fanxian_fanzu', topic: '询问梵族', text: '"梵族传承自太古，血脉中流淌着祖先的荣耀。"梵仙高昂着头，语气中带着一丝傲然："我梵仙身为梵族天骄，自当光耀门楣，不负先祖。"' },
    { id: 'fanxian_strength', topic: '谈论实力', text: '"实力？"梵仙嘴角勾起一抹自信的弧度："同阶之中，我梵仙还未曾怕过谁。你若想与我切磋，随时奉陪。"' },
    { id: 'fanxian_ambition', topic: '探讨志向', text: '"我的志向？"梵仙目光灼灼："我要让梵族之名响彻诸天万界，让所有势力都知晓，太古种族的荣光永不熄灭！"' },
  ],
  zixia: [
    { id: 'zixia_zifu', topic: '询问紫府圣地', text: '"紫府圣地乃是东荒名门，以紫气东来诀闻名于世。"紫霞仙子语气淡然："我为紫府圣女，自当以振兴圣地为己任。"' },
    { id: 'zixia_purpleqi', topic: '谈论紫气东来', text: '"紫气东来，乃是祥瑞之兆。"紫霞仙子周身浮现淡淡紫气："修炼至深处，可引动天地紫气护体，万法不侵。"' },
    { id: 'zixia_saint', topic: '探讨圣女之路', text: '"圣女之路，看似光鲜，实则孤寂。"紫霞仙子轻叹一声："但既然选择了这条路，我便无怨无悔。只求大道可期，不负此生。"' },
  ],
  chenxi: [
    { id: 'chenxi_taiyin', topic: '询问太阴之体', text: '"太阴之体……乃是天地间最罕见的体质之一。"晨曦低下头，声音轻柔："自幼我便能感觉到月华之力与我共鸣，却也因这体质招惹了不少祸端。"' },
    { id: 'chenxi_life', topic: '谈论过往', text: '"我出身平凡，却因体质特殊被各方势力觊觎。"晨曦眼中闪过一丝哀伤，随即微笑："但我不恨这体质，它让我遇见了修仙之路，也……遇见了你。"' },
    { id: 'chenxi_moon', topic: '探讨太阴大道', text: '"太阴者，万物之母也。"晨曦仰头望向月亮："我愿以太阴之体，参悟太阴大道，终有一日，让这体质不再是祸根，而是护佑苍生的力量。"' },
  ],
};

export const ZHETIAN_DAOLU: IDaoLu[] = [
  {
    id: 'daolu_jiziyue',
    name: '姬紫月',
    title: '姬家明珠',
    description: '一位身着淡紫衣裙的少女，眉眼弯弯，笑起来有两个浅浅的酒窝。她周身缭绕着淡淡的紫气，一双明眸灵动狡黠，仿佛藏着无数鬼点子。',
    greeting: '姬紫月转过身，眼中闪过一丝惊喜："呀，你怎么来了？正好本小姐无聊得很，快陪我去逛逛！"',
    roomId: 'zhetian_ji_family',
    dialogues: zhetianDialogues.jiziyue,
    faction: {
      name: '姬家',
      type: DaoLuFactionType.CLAN,
      description: '荒古世家姬家，东荒顶尖势力之一，传承悠久，底蕴深厚。姬家以虚空大帝传承闻名，族中天才辈出。',
      power: '东荒顶尖荒古世家',
      location: '东荒姬家祖地',
      leader: '姬家圣主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'jiziyue_story_1',
        title: '初遇青铜仙殿',
        requiredIntimacy: 0,
        description: '你在青铜仙殿附近初遇姬紫月，她正被妖族修士追杀。她虽身负姬家神术，却因修为尚浅而险象环生。',
        choices: [
          {
            text: '出手相救，击退妖族修士',
            effect: (player) => ({ messages: ['你挺身而出，施展神通击退妖族修士。姬紫月眼中闪过感激："多谢道友相救，我姬紫月记下了这份恩情。"'], intimacyChange: 15, reward: '姬家信物一枚' }),
          },
          {
            text: '暗中观察，伺机而动',
            effect: (player) => ({ messages: ['你隐匿气息，在关键时刻出手化解了致命一击。姬紫月微微蹙眉："你为何不出手？不过……也算帮了我。"'], intimacyChange: 5 }),
          },
        ],
      },
      {
        id: 'jiziyue_story_2',
        title: '太玄门共探遗迹',
        requiredIntimacy: 50,
        description: '姬紫月邀你同探太玄门附近的上古遗迹。遗迹中机关重重，险象环生，她却在危机中展现出惊人的天演神术造诣。',
        choices: [
          {
            text: '全力护她周全',
            effect: (player) => ({ messages: ['你始终守护在她身侧，为她挡下无数机关。遗迹深处，姬紫月转头看你，眼波流转："你……为何对我这么好？"'], intimacyChange: 20, reward: '上古传承残卷' }),
          },
          {
            text: '各自为战，相互照应',
            effect: (player) => ({ messages: ['你们配合默契，各自施展手段破解机关。出了遗迹，姬紫月笑道："和你搭档还挺顺手的，以后多带我探险啊！"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'jiziyue_story_3',
        title: '姬家提亲风波',
        requiredIntimacy: 200,
        description: '姬家得知你们的关系后，圣主亲自召见。姬皓月对你百般刁难，欲以实力考验你是否配得上姬家明珠。',
        choices: [
          {
            text: '坦然接受挑战，以实力证明',
            effect: (player) => ({ messages: ['你与姬皓月大战三百回合，虽略处下风却展现了惊人潜力。姬紫月扑到你怀中："笨蛋，谁让你这么拼命的……"姬家圣主颔首："也罢，女大不中留。"'], intimacyChange: 30, reward: '姬家认可' }),
          },
          {
            text: '以理服人，表明心迹',
            effect: (player) => ({ messages: ['你向姬家圣主坦诚心迹，许诺此生不负紫月。姬紫月眼眶微红，握紧你的手："父亲，女儿此生非他不嫁。"'], intimacyChange: 25, reward: '姬家认可' }),
          },
        ],
      },
      {
        id: 'jiziyue_story_4',
        title: '虚空大帝传承',
        requiredIntimacy: 500,
        description: '姬紫月带你进入姬家最深处的祖地，虚空大帝的传承之地。在虚空镜前，她与你共同感悟虚空大道，许下生死与共的誓言。',
        choices: [
          {
            text: '立下道侣之誓，共参大道',
            effect: (player) => ({ messages: ['虚空镜光芒大盛，映照出你们交缠的命运。姬紫月含泪带笑："从青铜仙殿相遇的那一刻起，我就知道……你就是我的劫，也是我的缘。"'], intimacyChange: 100, reward: '虚空大道感悟' }),
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
    firstMeeting: '青铜仙殿外，你被一阵打斗声吸引。只见一名紫衣少女被数名妖族修士围困，她虽施展玄妙神术左支右绌，却难敌众手。危急时刻，你挺身而出——这一战，注定改变两人的命运。',
    backgroundStory: '姬紫月，荒古世家姬家的小公主，天生与虚空大道亲和。她性格活泼俏皮，喜爱探险，却因出身显赫而自幼被保护在象牙塔中。青铜仙殿一役，她偷溜出家门历练，险些香消玉殒，幸得你出手相救。此后她便赖上了你，以"报恩"为名与你同行，实则是向往外面广阔的天地。她身负天演神术，能推算吉凶，却算不透自己的情缘。',
    personalityTraits: ['活泼俏皮', '古灵精怪', '重情重义', '向往自由'],
    likes: ['探险寻宝', '品尝美食', '研究上古遗迹', '捉弄熟人'],
    dislikes: ['繁文缛节', '被当作花瓶', '背叛', '束缚自由'],
    favoriteGifts: ['上古残卷', '稀奇古怪的法宝', '灵果佳酿', '紫色衣裙'],
  },
  {
    id: 'daolu_anmiaoyi',
    name: '安妙依',
    title: '妙欲传人',
    description: '一位身着素白纱裙的绝世佳人，肌肤胜雪，眉目如画。她坐在琴案前，指尖轻拨琴弦，眼波流转间既有出尘之姿，又含万千风情。',
    greeting: '安妙依停下抚琴，抬眸看你，唇角微扬："你来了。我新谱了一曲，想第一个弹给你听。"',
    roomId: 'zhetian_miaoyu_an',
    dialogues: zhetianDialogues.anmiaoyi,
    faction: {
      name: '妙欲庵',
      type: DaoLuFactionType.SECT,
      description: '妙欲庵是东荒著名宗门，以"以情入道"闻名。庵中弟子皆容貌绝世，修炼妙欲之道，讲究历经情劫以证大道。',
      power: '东荒一流宗门',
      location: '东荒妙欲山脉',
      leader: '妙欲庵主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'anmiaoyi_story_1',
        title: '妙欲庵初见',
        requiredIntimacy: 0,
        description: '你受邀参加妙欲庵的论道大会，在百花深处遇见了正在抚琴的安妙依。琴声如泣如诉，仿佛在诉说着一个古老的故事。',
        choices: [
          {
            text: '静静聆听，以心共鸣',
            effect: (player) => ({ messages: ['你闭目聆听，神识随琴音起伏。一曲终了，安妙依惊讶地看向你："你是第一个……能听懂我琴中真意的人。"'], intimacyChange: 15, reward: '琴音感悟' }),
          },
          {
            text: '鼓掌称赞，以礼相交',
            effect: (player) => ({ messages: ['你鼓掌称赞，安妙依微微颔首："过奖了。妙欲庵的琴音，向来只弹给懂的人听。"'], intimacyChange: 8 }),
          },
        ],
      },
      {
        id: 'anmiaoyi_story_2',
        title: '情劫试炼',
        requiredIntimacy: 50,
        description: '安妙依告知你，妙欲庵弟子需历情劫方可突破。她选择你作为她的情劫，问你愿不愿陪她走这一遭。',
        choices: [
          {
            text: '心甘情愿，赴汤蹈火',
            effect: (player) => ({ messages: ['你握住她的手，目光坚定。安妙依眼眶微红，轻声道："情劫九死一生，你可知一旦失败，轻则道心破碎，重则身死道消？"你笑而不答，她低头轻叹："傻瓜……"'], intimacyChange: 20, reward: '情劫共鸣' }),
          },
          {
            text: '谨慎询问，再做决定',
            effect: (player) => ({ messages: ['你详细询问了情劫的凶险，安妙依眼中闪过一丝失望，却很快恢复平静："谨慎是好事。我给你时间考虑。"'], intimacyChange: 5 }),
          },
        ],
      },
      {
        id: 'anmiaoyi_story_3',
        title: '破劫重生',
        requiredIntimacy: 200,
        description: '情劫降临，安妙依道心几近崩溃。关键时刻，你不惜以自身道基受损为代价，助她稳住心神，共渡大劫。',
        choices: [
          {
            text: '燃烧精血，护她周全',
            effect: (player) => ({ messages: ['你燃烧自身精血，化作一道屏障护住她的道心。安妙依在恍惚中看见你的身影，泪如雨下："为什么……为什么要为我做到这一步……"劫后余生，她扑入你怀中，泣不成声。'], intimacyChange: 30, reward: '道心通明' }),
          },
          {
            text: '以神识引导，助她自救',
            effect: (player) => ({ messages: ['你的神识化作明灯，引导她自己走出迷雾。安妙依破劫而出，眸中多了一分坚毅："是你让我明白，情劫不是毁灭，而是重生。谢谢你。"'], intimacyChange: 20, reward: '神识升华' }),
          },
        ],
      },
      {
        id: 'anmiaoyi_story_4',
        title: '妙欲成真',
        requiredIntimacy: 500,
        description: '安妙依历劫成功，成为妙欲庵有史以来最年轻的庵主。她在登基大典上当众宣布，愿以庵主之位换取与你共参大道。',
        choices: [
          {
            text: '携手同行，不离不弃',
            effect: (player) => ({ messages: ['你在万众瞩目中走上高台，与她十指相扣。安妙依笑靥如花："从今往后，妙欲庵的琴音，只为你一人而弹。"'], intimacyChange: 100, reward: '妙欲真谛' }),
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
    firstMeeting: '妙欲庵的论道大会上，百花盛开，琴声悠扬。你循着琴音走去，在万花丛中看见了那个白衣如雪的女子。她指尖轻拨，一曲《霓裳》动人心魄。你驻足聆听，竟忘了时间流逝。',
    backgroundStory: '安妙依，妙欲庵当代最杰出的传人，自幼被寄予厚望。她容颜绝世，琴艺无双，更难得的是对妙欲之道有着超凡的领悟。然而妙欲庵的传承有一个诅咒——历代庵主皆需历情劫，而情劫九死一生。她本以为自己会像前辈一样，在情劫中道心破碎，却不想遇见了你。你的出现，让她明白了情劫不是毁灭，而是通往更高境界的阶梯。',
    personalityTraits: ['绝代风华', '外柔内刚', '情深义重', '聪慧通透'],
    likes: ['抚琴奏乐', '赏花品茗', '论道谈玄', '月下独舞'],
    dislikes: ['虚情假意', '强迫逼迫', '道貌岸然', '薄情寡义'],
    favoriteGifts: ['古琴', '珍稀茶叶', '绝世功法', '白色纱裙'],
  },
  {
    id: 'daolu_yanruyu',
    name: '颜如玉',
    title: '妖帝后人',
    description: '一位身着碧绿长裙的绝色女子，眉目如画，气质高贵清冷。她周身隐约有青莲虚影流转，一双美眸似秋水般澄澈，却又藏着妖族特有的野性。',
    greeting: '颜如玉转过身，青莲虚影在身后轻轻摇曳："你来了。今日月华正好，适合探讨妖族古文。"',
    roomId: 'zhetian_yaozu_palace',
    dialogues: zhetianDialogues.yanruyu,
    faction: {
      name: '妖族',
      type: DaoLuFactionType.MONSTER,
      description: '妖族乃东荒大族，传承自太古妖皇。颜如玉一脉为东荒最后一位妖帝的后人，身负混沌青莲血脉，在妖族中地位尊崇。',
      power: '东荒妖族正统',
      location: '妖族祖地青莲宫',
      leader: '妖族大能',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'yanruyu_story_1',
        title: '妖帝坟冢相遇',
        requiredIntimacy: 0,
        description: '你在妖帝坟冢探险时遇见了颜如玉。她正带领妖族修士寻找先祖遗物，却被人族修士围攻。',
        choices: [
          {
            text: '出手相助，击退人族修士',
            effect: (player) => ({ messages: ['你拔剑相助，与妖族并肩作战。战后，颜如玉微微欠身："人族中竟也有如此仗义之士，颜如玉谢过。"'], intimacyChange: 15, reward: '妖族友谊' }),
          },
          {
            text: '调解冲突，化解恩怨',
            effect: (player) => ({ messages: ['你站出来调解双方矛盾，提议各退一步。颜如玉深深看你一眼："能平息干戈，倒是比动手更难。"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'yanruyu_story_2',
        title: '共寻妖帝之心',
        requiredIntimacy: 50,
        description: '颜如玉邀请你一同寻找失落的妖帝之心。这一路凶险万分，你们却配合默契，渐渐生出情愫。',
        choices: [
          {
            text: '以命相护，绝不让她受伤',
            effect: (player) => ({ messages: ['在禁地深处，一道上古禁制突然爆发，你毫不犹豫地将她护在身后。颜如玉看着你受伤的背影，眼眶微红："你……你为何对我这么好？"'], intimacyChange: 20, reward: '妖帝之心线索' }),
          },
          {
            text: '智取禁制，共同破解',
            effect: (player) => ({ messages: ['你仔细观察禁制纹路，与她合力破解。颜如玉眼中闪过赞赏："你不仅实力出众，更有急智。有你同行，真好。"'], intimacyChange: 12 }),
          },
        ],
      },
      {
        id: 'yanruyu_story_3',
        title: '妖族内乱',
        requiredIntimacy: 200,
        description: '妖族内部有人不满颜如玉与人族交往，发动叛乱。颜如玉身陷险境，众叛亲离。',
        choices: [
          {
            text: '独闯妖宫，救她脱险',
            effect: (player) => ({ messages: ['你单枪匹马闯入妖宫，浴血奋战将她救出。颜如玉靠在你怀中，泪落如雨："我连自己的族人都守护不了……"你轻抚她的长发："你还有我。"'], intimacyChange: 30, reward: '青莲血脉共鸣' }),
          },
          {
            text: '联络盟友，平息叛乱',
            effect: (player) => ({ messages: ['你暗中联络妖族中的正义之士，里应外合平息叛乱。颜如玉重掌大权，看向你时眼中有光："是你让我明白，种族之隔，挡不住真心。"'], intimacyChange: 25, reward: '妖族大权' }),
          },
        ],
      },
      {
        id: 'yanruyu_story_4',
        title: '青莲并蒂',
        requiredIntimacy: 500,
        description: '颜如玉终于寻回妖帝之心，在混沌青莲前觉醒血脉。她转身看向你，做出了一个震动妖族的决定。',
        choices: [
          {
            text: '接受她的誓言，生死与共',
            effect: (player) => ({ messages: ['混沌青莲绽放，两朵莲花并蒂而生。颜如玉将妖帝之心的一半分给你："从此，你我血脉相连，生死与共。妖族与人族的隔阂，由我们来打破。"'], intimacyChange: 100, reward: '混沌青莲印记' }),
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
    firstMeeting: '妖帝坟冢深处，阴气森森。你在一座破碎的石碑前遇见了那个绿衣女子。她正与人族修士对峙，青莲虚影在身后摇曳，虽处下风却傲骨不屈。你本可袖手旁观，却鬼使神差地站到了她身边。',
    backgroundStory: '颜如玉，东荒最后一位妖帝的后人，身负混沌青莲血脉。自幼肩负复兴妖族的重任，她不得不将自己包裹在冰冷的面具之下。然而在人族与妖族的纷争中，她渐渐厌倦了无休止的仇恨。你的出现，让她第一次感受到了超越种族的温暖。她渴望打破人妖之隔，却也因此承受了巨大的压力。',
    personalityTraits: ['高贵清冷', '傲骨铮铮', '胸怀大义', '内心温柔'],
    likes: ['研读妖族古文', '培育灵植', '月下静坐', '青莲香气'],
    dislikes: ['种族偏见', '背叛先祖', '虚伪做作', '无谓纷争'],
    favoriteGifts: ['妖族古籍', '混沌青莲种子', '碧绿衣裙', '上古妖文拓片'],
  },
  {
    id: 'daolu_qinyao',
    name: '秦瑶',
    title: '妖族媚姬',
    description: '一位身着红色薄纱的妖媚女子，身段婀娜，眉眼含春。她慵懒地倚在软榻上，手中把玩着一缕青丝，眼波流转间尽是万种风情。',
    greeting: '秦瑶抬眸看你，红唇微启，声音酥软入骨："哟，什么风把您给吹来了？快来陪奴家说说话，一个人待着好生无聊呢。"',
    roomId: 'zhetian_yaozu_valley',
    dialogues: zhetianDialogues.qinyao,
    faction: {
      name: '妖族',
      type: DaoLuFactionType.MONSTER,
      description: '妖族分支之一，秦瑶隶属颜如玉麾下，是妖族中颇具实力的年轻一代。',
      power: '妖族中青代主力',
      location: '妖族百花谷',
      leader: '颜如玉',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'qinyao_story_1',
        title: '百花谷偶遇',
        requiredIntimacy: 0,
        description: '你在百花谷寻找一味灵药时误入了秦瑶的领地。她本欲将你赶走，却被你身上奇特的气息吸引。',
        choices: [
          {
            text: '坦诚道歉，说明来意',
            effect: (player) => ({ messages: ['你坦诚说明来意，秦瑶掩嘴轻笑："难得见一个人族修士这么老实，罢了，那灵药我送你便是。"'], intimacyChange: 12, reward: '珍稀灵药' }),
          },
          {
            text: '与她调笑，化解尴尬',
            effect: (player) => ({ messages: ['你笑着与她打趣，秦瑶愣了一下，随即笑得花枝乱颤："你这人倒是有趣，和那些死板的人族修士不一样。"'], intimacyChange: 8 }),
          },
        ],
      },
      {
        id: 'qinyao_story_2',
        title: '妖族祭典',
        requiredIntimacy: 50,
        description: '妖族举办百年一度的祭典，秦瑶邀你同往。祭典上妖族长老对你这个人族充满敌意，秦瑶却当众维护你。',
        choices: [
          {
            text: '感激她的维护，当众致谢',
            effect: (player) => ({ messages: ['你当众向她致谢，秦瑶脸颊微红，嘴上却不饶人："别多想，奴家只是看不惯他们以多欺少罢了。"'], intimacyChange: 15, reward: '妖族祭典祝福' }),
          },
          {
            text: '以实力证明自己，赢得尊重',
            effect: (player) => ({ messages: ['你在祭典的比试中大展身手，赢得了妖族的尊重。秦瑶看着你，眼中有光："奴家果然没看错人。"'], intimacyChange: 12 }),
          },
        ],
      },
      {
        id: 'qinyao_story_3',
        title: '生死相随',
        requiredIntimacy: 200,
        description: '秦瑶在一次任务中中了人族修士的埋伏，身受重伤。你得知消息后星夜驰援，在她最危急的时刻赶到。',
        choices: [
          {
            text: '不惜代价救治她',
            effect: (player) => ({ messages: ['你以自己的精血为引，炼制救命丹药。秦瑶醒来后看着你苍白的脸，第一次敛去了嬉笑："你……你这个傻子，奴家的命哪值得你这样……"'], intimacyChange: 25, reward: '生死之交' }),
          },
          {
            text: '斩杀仇敌，为她报仇',
            effect: (player) => ({ messages: ['你一怒之下追杀仇敌千里，将其尽数斩杀。秦瑶靠在你肩头，轻声道："从没有人……为奴家做到这一步。"'], intimacyChange: 20, reward: '仇敌战利品' }),
          },
        ],
      },
      {
        id: 'qinyao_story_4',
        title: '真情流露',
        requiredIntimacy: 500,
        description: '秦瑶终于卸下了妩媚的假面，向你展露真实的自己。原来她的妖媚只是保护色，内心深处渴望的不过是一份真挚的感情。',
        choices: [
          {
            text: '许她一生一世',
            effect: (player) => ({ messages: ['秦瑶泪如雨下，却笑得无比灿烂："奴家等这句话……等了好久。从今往后，奴家只是你一个人的秦瑶。"'], intimacyChange: 100, reward: '秦瑶真心' }),
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
    firstMeeting: '百花谷中，万花齐放。你循着灵药的气息来到一处幽谷，却见一名红衣女子慵懒地倚在花丛中。她抬眸看你，眼波流转，仿佛能勾魂夺魄。你心中一凛，却见她笑靥如花："人族修士？倒是稀罕。"',
    backgroundStory: '秦瑶，妖族百花谷出身的狐妖，自幼便被教导要以媚术惑人。她练就了一身妖媚本领，却也因此被族人视为工具。只有颜如玉将她当作姐妹，她也因此对颜如玉忠心耿耿。表面上她风情万种、游戏人间，实则内心孤独，渴望有人能看穿她的伪装，爱上真实的她。你的出现，让她第一次有了想要卸下心防的冲动。',
    personalityTraits: ['妩媚动人', '外热内冷', '重情重义', '渴望真情'],
    likes: ['百花谷赏花', '调制香料', '听人间故事', '红色衣裙'],
    dislikes: ['被当作玩物', '虚情假意', '种族歧视', '孤独寂寞'],
    favoriteGifts: ['珍稀香料', '红色纱裙', '美容养颜灵丹', '人间话本'],
  },
  {
    id: 'daolu_yiqingwu',
    name: '伊轻舞',
    title: '广寒仙子',
    description: '一位身着月白长裙的仙子，气质清冷如月，周身缭绕着淡淡的太阴寒气。她站在广寒宫的月桂树下，仿佛与月光融为一体，美得不可方物。',
    greeting: '伊轻舞缓缓转身，月光在她身上镀了一层银辉："月华正好，道友既然来了，不如同赏这一轮明月。"',
    roomId: 'zhetian_guanghan_palace',
    dialogues: zhetianDialogues.yiqingwu,
    faction: {
      name: '广寒宫',
      type: DaoLuFactionType.DAOIST,
      description: '广寒宫是东荒隐世道统，居于九天之上，专修太阴大道。宫中弟子皆心如止水，追求天人合一之境。',
      power: '东荒隐世道统',
      location: '九天广寒仙境',
      leader: '广寒宫主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'yiqingwu_story_1',
        title: '月桂树下',
        requiredIntimacy: 0,
        description: '你误闯广寒宫秘境，在月桂树下遇见了正在修炼的伊轻舞。她本欲将你驱逐，却被你身上奇特的阴阳气息所吸引。',
        choices: [
          {
            text: '说明误入缘由，请求宽恕',
            effect: (player) => ({ messages: ['你诚恳解释，伊轻舞微微颔首："既然是无心之失，便不追究。但这广寒秘境，常人不可久留。"'], intimacyChange: 10, reward: '太阴寒气感悟' }),
          },
          {
            text: '请教太阴大道，以学为媒',
            effect: (player) => ({ messages: ['你虚心请教太阴大道，伊轻舞眸中闪过一丝诧异："你非广寒宫弟子，却对太阴之道有所涉猎……倒是有趣。"'], intimacyChange: 15 }),
          },
        ],
      },
      {
        id: 'yiqingwu_story_2',
        title: '共参阴阳',
        requiredIntimacy: 50,
        description: '伊轻舞发现你身具罕见的阴阳调和体质，邀请你与她共同参悟阴阳大道。在双修的过程中，两人的气息逐渐交融。',
        choices: [
          {
            text: '全心全意，毫无保留',
            effect: (player) => ({ messages: ['你放开所有防备，任太阴之气涌入体内。伊轻舞轻哼一声，脸颊泛起红晕："你……你竟如此信任我？"'], intimacyChange: 20, reward: '阴阳调和感悟' }),
          },
          {
            text: '循序渐进，互相试探',
            effect: (player) => ({ messages: ['你小心翼翼地引导气息，与她互相试探。伊轻舞嘴角微扬："谨慎是好事，但大道无情，岂能犹豫？"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'yiqingwu_story_3',
        title: '宫规如天',
        requiredIntimacy: 200,
        description: '广寒宫主发现你们的关系，震怒之下欲将伊轻舞逐出师门。伊轻舞面临抉择：是留在宫中，还是随你而去。',
        choices: [
          {
            text: '独自承担罪责，不让她为难',
            effect: (player) => ({ messages: ['你跪在广寒宫主面前，愿以一己之身承担所有罪责。伊轻舞泪落如雨，第一次失态："不……我要与他同生共死！"宫主长叹："罢了，情劫亦是道劫。"'], intimacyChange: 30, reward: '广寒宫认可' }),
          },
          {
            text: '说服宫主，证明你们的情谊无损道心',
            effect: (player) => ({ messages: ['你以大道之理说服广寒宫主，证明阴阳调和乃天地至理。伊轻舞看向你，眸中有光："你总能……让我看到不一样的天地。"'], intimacyChange: 25, reward: '广寒宫认可' }),
          },
        ],
      },
      {
        id: 'yiqingwu_story_4',
        title: '月满西楼',
        requiredIntimacy: 500,
        description: '伊轻舞突破至太阴大道大成之境，在月满之夜向你袒露心声。她愿以广寒宫未来宫主的身份，与你共结连理。',
        choices: [
          {
            text: '月下盟誓，白头偕老',
            effect: (player) => ({ messages: ['月桂树下，你们十指相扣。伊轻舞清冷的面容绽放出前所未有的笑容："太阴太阳，本是天地至理。从今往后，你我阴阳调和，共参大道。"'], intimacyChange: 100, reward: '太阴大道印记' }),
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
    firstMeeting: '广寒秘境，月桂飘香。你循着一道清冷的月光走去，在树影婆娑中看见了那个白衣胜雪的女子。她周身缭绕着太阴寒气，仿佛月宫仙子谪落凡尘。她转身看你，目光清冷，却又藏着一丝好奇。',
    backgroundStory: '伊轻舞，广寒宫当代最杰出的弟子，天生太阴之体，被誉为广寒宫千年以来最有希望参透太阴大道的人。她自幼在宫中长大，心如止水，不染尘埃。然而你的出现，却在她平静的心湖中投下了一颗石子。你身上的阴阳气息与她产生共鸣，让她第一次对大道之外的事物产生了兴趣。她渴望打破广寒宫冰冷的面具，寻找属于自己的温度。',
    personalityTraits: ['清冷出尘', '外冷内热', '执着大道', '渴望温暖'],
    likes: ['月下修炼', '品鉴桂花酿', '研读道藏', '白色长裙'],
    dislikes: ['喧嚣嘈杂', '强迫束缚', '虚情假意', '道心蒙尘'],
    favoriteGifts: ['太阴精华', '月桂花瓣', '道藏古籍', '白色衣裙'],
  },
  {
    id: 'daolu_fanxian',
    name: '梵仙',
    title: '梵族天骄',
    description: '一位身着金色战甲的英气女子，眉目如画却带着一股凌厉之气。她手持一杆金色长枪，周身散发着太古种族特有的威压，宛如一尊女战神。',
    greeting: '梵仙收枪而立，金色眼眸中闪过一丝审视："你就是那个人族修士？哼，看起来也不怎么样嘛。不过既然来了，就让我看看你有没有资格站在我身边。"',
    roomId: 'zhetian_fanzu_holy_land',
    dialogues: zhetianDialogues.fanxian,
    faction: {
      name: '梵族',
      type: DaoLuFactionType.CLAN,
      description: '梵族传承自太古，是仅存的几支太古种族之一。族中血脉强横，肉身无敌，在诸天万界中享有赫赫威名。',
      power: '太古强族',
      location: '梵族祖地',
      leader: '梵族老祖',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'fanxian_story_1',
        title: '太古战场初遇',
        requiredIntimacy: 0,
        description: '你在太古战场遗迹中探险时遇见了梵仙。她正与一头远古凶兽激战，虽占据上风却也险象环生。',
        choices: [
          {
            text: '出手相助，共同御敌',
            effect: (player) => ({ messages: ['你加入战斗，与她联手斩杀凶兽。梵仙擦去额头的汗水，难得露出一丝笑意："身手不错，有资格做我的对手。"'], intimacyChange: 15, reward: '太古凶兽材料' }),
          },
          {
            text: '在旁掠阵，防止意外',
            effect: (player) => ({ messages: ['你在旁掠阵，在她危急时出手化解。梵仙眉头微蹙："多管闲事……不过，谢了。"'], intimacyChange: 8 }),
          },
        ],
      },
      {
        id: 'fanxian_story_2',
        title: '梵族试炼',
        requiredIntimacy: 50,
        description: '梵仙邀请你参加梵族的青年试炼。在试炼中你们互为对手，却又在关键时刻互相救助。',
        choices: [
          {
            text: '全力以赴，赢得她的尊重',
            effect: (player) => ({ messages: ['你在试炼中全力以赴，最终与她战成平手。梵仙仰天大笑："痛快！你是第一个能与我战平的人族！"'], intimacyChange: 20, reward: '梵族试炼奖励' }),
          },
          {
            text: '在关键时刻救她一命',
            effect: (player) => ({ messages: ['试炼中突发变故，你舍身救她于危难。梵仙愣在原地，半晌才道："你……你这个人族，倒也重情重义。"'], intimacyChange: 15, reward: '梵族友谊' }),
          },
        ],
      },
      {
        id: 'fanxian_story_3',
        title: '族规禁锢',
        requiredIntimacy: 200,
        description: '梵族老祖得知梵仙与人族交往，震怒之下欲将她许配给族中另一支的天骄。梵仙宁死不从，被囚禁于祖地面壁。',
        choices: [
          {
            text: '独闯梵族祖地，带她走',
            effect: (player) => ({ messages: ['你独闯梵族祖地，浴血奋战将她救出。梵仙看着你满身的伤痕，眼眶微红："傻瓜……你知不知道这是送死……"'], intimacyChange: 30, reward: '梵仙真心' }),
          },
          {
            text: '以实力说服梵族老祖',
            effect: (player) => ({ messages: ['你在梵族大殿上与各路天骄论道比试，最终赢得老祖的认可。梵仙骄傲地挽住你的手臂："看，这就是我选中的人！"'], intimacyChange: 25, reward: '梵族认可' }),
          },
        ],
      },
      {
        id: 'fanxian_story_4',
        title: '梵天共舞',
        requiredIntimacy: 500,
        description: '梵仙在与你共同经历生死后，终于放下了太古种族的骄傲。她愿以梵族最高礼仪，与你结为道侣。',
        choices: [
          {
            text: '接受她的誓言，生死与共',
            effect: (player) => ({ messages: ['梵族祖地上空，金色神光普照。梵仙将金色长枪交到你手中："这是我梵族最高的信任。从此，你我并肩作战，生死与共！"'], intimacyChange: 100, reward: '梵族战神印记' }),
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
    firstMeeting: '太古战场遗迹，凶兽咆哮。你在一座破碎的石柱旁看见了那个金甲女子。她手持长枪，与一头远古凶兽激战正酣。阳光洒在她身上，仿佛给她镀了一层金辉。你本欲离去，却见她险象环生，鬼使神差地拔出了剑。',
    backgroundStory: '梵仙，梵族当代最杰出的天骄，身负太古血脉，肉身强横无匹。她性格高傲，眼高于顶，同辈之中鲜有能入她眼者。自幼便被灌输太古种族的荣耀与骄傲，她视人族为弱小的种族。然而你的出现，打破了她所有的偏见。你以实力赢得了她的尊重，以情义打动了她的心。她渴望打破种族的桎梏，与你并肩站在诸天万界的巅峰。',
    personalityTraits: ['高傲自信', '直爽豪迈', '重情重义', '外刚内柔'],
    likes: ['切磋战斗', '太古遗迹探险', '金色战甲', '烈酒'],
    dislikes: ['虚伪做作', '种族偏见', '软弱无能', '背叛'],
    favoriteGifts: ['太古神兵', '淬体灵药', '金色战甲', '烈酒佳酿'],
  },
  {
    id: 'daolu_zixia',
    name: '紫霞仙子',
    title: '紫府圣女',
    description: '一位身着紫霞仙衣的绝美女子，周身紫气缭绕，宛如紫气东来。她眉目如画，气质圣洁高贵，一举一动皆带着圣女的威仪。',
    greeting: '紫霞仙子微微颔首，紫气在她周身流转："道友远道而来，紫霞有失远迎。请入座，共品一杯紫府仙茶。"',
    roomId: 'zhetian_zifu_holy_land',
    dialogues: zhetianDialogues.zixia,
    faction: {
      name: '紫府圣地',
      type: DaoLuFactionType.SECT,
      description: '紫府圣地是东荒名门大派，以紫气东来诀闻名于世。圣地传承悠久，历代圣女皆风华绝代。',
      power: '东荒名门圣地',
      location: '东荒紫府山',
      leader: '紫府圣主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'zixia_story_1',
        title: '紫府论道',
        requiredIntimacy: 0,
        description: '你受邀参加紫府圣地的论道大会，在紫气缭绕的山巅遇见了紫霞仙子。她正在讲解紫气东来诀的奥义，引得众人如痴如醉。',
        choices: [
          {
            text: '提出独到见解，引起她的注意',
            effect: (player) => ({ messages: ['你提出了对紫气东来诀的独特见解，紫霞仙子眸中闪过异彩："道友的见解……倒是别具一格，紫霞受教了。"'], intimacyChange: 15, reward: '紫府好感' }),
          },
          {
            text: '虚心请教，以礼相交',
            effect: (player) => ({ messages: ['你虚心请教，紫霞仙子微微颔首："道友谦逊有礼，紫霞愿与道友结交。"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'zixia_story_2',
        title: '圣地危机',
        requiredIntimacy: 50,
        description: '紫府圣地突遭强敌入侵，紫霞仙子率领弟子抵抗。你闻讯赶来，与她并肩作战。',
        choices: [
          {
            text: '舍身护她，挡下致命一击',
            effect: (player) => ({ messages: ['强敌的杀招直指紫霞仙子，你不假思索地挡在她身前。紫霞仙子抱着受伤的你，泪落如雨："你为什么……为什么要这样做……"'], intimacyChange: 20, reward: '紫霞牵挂' }),
          },
          {
            text: '联手对敌，共退强敌',
            effect: (player) => ({ messages: ['你与紫霞仙子配合默契，紫气与剑光交织，终将强敌击退。她看向你，眸中有光："能与道友并肩作战，是紫霞之幸。"'], intimacyChange: 15, reward: '紫府感谢' }),
          },
        ],
      },
      {
        id: 'zixia_story_3',
        title: '圣女抉择',
        requiredIntimacy: 200,
        description: '紫府圣主为巩固势力，欲将紫霞仙子许配给另一大教的神子。紫霞仙子虽不愿，却因圣女身份而不得不从。',
        choices: [
          {
            text: '当众挑战神子，以实力争取',
            effect: (player) => ({ messages: ['你当众挑战那位神子，以实力将其击败。紫霞仙子看着你，眼中有泪光闪动："你可知……这一战，你会得罪多少势力？"'], intimacyChange: 25, reward: '紫府震动' }),
          },
          {
            text: '私下劝说她，尊重她的选择',
            effect: (player) => ({ messages: ['你私下找到她，告诉她无论她作何选择，你都会支持。紫霞仙子沉默良久，最终抬眸："紫霞此生……只愿追随本心。"'], intimacyChange: 30, reward: '紫霞真心' }),
          },
        ],
      },
      {
        id: 'zixia_story_4',
        title: '紫气东来',
        requiredIntimacy: 500,
        description: '紫霞仙子终于突破圣女桎梏，领悟紫气东来诀的最高境界。她在紫气浩荡中向你走来，做出了震惊东荒的决定。',
        choices: [
          {
            text: '执子之手，与子偕老',
            effect: (player) => ({ messages: ['紫气浩荡三万里，紫霞仙子褪去圣女华服，只着一袭紫衣走到你面前："紫霞已非圣女，只是一个普通女子。你可愿……娶我？"'], intimacyChange: 100, reward: '紫气东来印记' }),
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
    firstMeeting: '紫府山巅，紫气东来。你在论道大会的会场中看见了那个紫衣女子。她站在高台上讲解大道，紫气缭绕，宛如九天玄女下凡。她的声音清澈如泉，每一个字都仿佛蕴含着天地至理。你不由自主地驻足聆听，直到她看向你，四目相对。',
    backgroundStory: '紫霞仙子，紫府圣地当代圣女，自幼便被当作未来圣主培养。她天赋绝伦，悟性超凡，更难得的是拥有一颗纯净的道心。然而圣女的光环既是荣耀，也是枷锁。她必须时刻保持完美，不能有任何私心杂念。你的出现，让她第一次感受到了心动的感觉。她渴望打破圣女的桎梏，做一个有血有肉的普通女子。',
    personalityTraits: ['圣洁高贵', '温柔坚韧', '追求自由', '情深义重'],
    likes: ['紫气修炼', '品茶论道', '赏花', '紫色衣裙'],
    dislikes: ['虚伪权谋', '被迫联姻', '道貌岸然', '束缚自由'],
    favoriteGifts: ['紫气精华', '珍稀茶叶', '紫色仙衣', '道藏古籍'],
  },
  {
    id: 'daolu_chenxi',
    name: '晨曦',
    title: '太阴之体',
    description: '一位身着淡蓝衣裙的柔弱女子，眉目清秀，气质温婉。她周身隐约散发着淡淡的月华光芒，却因病态而显得楚楚可怜，让人心生怜惜。',
    greeting: '晨曦微微抬头，苍白的脸上浮现一抹温柔的笑意："你来了。今日月色很好，我能感觉到……太阴之力在慢慢恢复呢。"',
    roomId: 'zhetian_chenxi_cottage',
    dialogues: zhetianDialogues.chenxi,
    faction: {
      name: '无',
      type: DaoLuFactionType.WANDERER,
      description: '晨曦出身平凡，无门无派。因身负太阴之体而被各方势力觊觎，不得不隐姓埋名，四处漂泊。',
      power: '无',
      location: '隐居小筑',
      leader: '无',
    },
    status: '散修',
    storyNodes: [
      {
        id: 'chenxi_story_1',
        title: '月下救人',
        requiredIntimacy: 0,
        description: '你在一个月黑风高的夜晚发现了昏倒在路边的晨曦。她身负太阴之体，却因体质反噬而性命垂危。',
        choices: [
          {
            text: '不惜代价救治她',
            effect: (player) => ({ messages: ['你以自己的真气为她续命，晨曦悠悠转醒，虚弱地笑道："多谢道友救命之恩……晨曦无以为报。"'], intimacyChange: 15, reward: '晨曦感激' }),
          },
          {
            text: '带她寻医问药',
            effect: (player) => ({ messages: ['你背起她，连夜赶往附近的仙城寻医。晨曦靠在你背上，轻声道："你……你为何要救我一个素不相识的人？"'], intimacyChange: 10, reward: '仙城医师好感' }),
          },
        ],
      },
      {
        id: 'chenxi_story_2',
        title: '太阴反噬',
        requiredIntimacy: 50,
        description: '晨曦的太阴之体再次反噬，比以往任何一次都严重。她以为自己必死无疑，却在你的陪伴下挺过了难关。',
        choices: [
          {
            text: '日夜守护，不离不弃',
            effect: (player) => ({ messages: ['你日夜守在她床前，用自身真气为她调和太阴寒气。晨曦醒来后，看着你憔悴的面容，泪如雨下："你为什么……对我这么好……"'], intimacyChange: 20, reward: '太阴调和感悟' }),
          },
          {
            text: '寻找破解之法',
            effect: (player) => ({ messages: ['你四处奔波，终于寻得一株千年火莲为她化解寒气。晨曦握着你的手，眼中满是感动："从来没有人……为我做到这一步。"'], intimacyChange: 15, reward: '千年火莲' }),
          },
        ],
      },
      {
        id: 'chenxi_story_3',
        title: '势力逼迫',
        requiredIntimacy: 200,
        description: '一个大教得知晨曦身负太阴之体，欲强行将她掳走作为炉鼎。晨曦绝望之际，你挺身而出。',
        choices: [
          {
            text: '以命相护，绝不退让',
            effect: (player) => ({ messages: ['你挡在晨曦身前，面对大教高手毫不退让。晨曦哭着拉住你的衣角："不要……你会死的……"你回头一笑："为了你，值得。"'], intimacyChange: 30, reward: '晨曦生死相随' }),
          },
          {
            text: '智取脱险，带她远走高飞',
            effect: (player) => ({ messages: ['你设下连环计，带着晨曦成功脱险。在安全之地，晨曦扑入你怀中："从今以后……晨曦只信你一人。"'], intimacyChange: 25, reward: '安全庇护所' }),
          },
        ],
      },
      {
        id: 'chenxi_story_4',
        title: '太阴大成',
        requiredIntimacy: 500,
        description: '在你的帮助下，晨曦终于掌控了太阴之体，修为大成。她在月光下向你走来，眼中满是深情。',
        choices: [
          {
            text: '许她一世安稳',
            effect: (player) => ({ messages: ['月光如水，晨曦依偎在你怀中："从前我以为，太阴之体是我的诅咒。直到遇见你，我才明白……这是上天给我的礼物，让我能遇见你。"'], intimacyChange: 100, reward: '太阴之体共鸣' }),
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
    firstMeeting: '月色朦胧，寒风凛冽。你在一条荒凉的山道上发现了那个昏倒的女子。她面色苍白，周身却散发着淡淡的月华光芒。你探查之下，发现她竟身负传说中的太阴之体。你不忍心见死不救，将她带回了住处。',
    backgroundStory: '晨曦，出身平凡的女子，却因天生太阴之体而命运多舛。太阴之体是世间最罕见的体质之一，也是各方势力觊觎的对象。自幼便有人想将她掳走作为炉鼎，她不得不四处逃亡。长期的逃亡生活让她变得柔弱而敏感，但她内心深处却有着坚韧不拔的意志。你的出现，像一束光照亮了她灰暗的人生。她渴望能过上平静安稳的生活，更渴望能与真心待她的人相守一生。',
    personalityTraits: ['温柔善良', '坚韧隐忍', '知恩图报', '渴望安稳'],
    likes: ['月下静修', '种植花草', '听琴', '淡蓝色衣裙'],
    dislikes: ['争斗厮杀', '被人觊觎', '孤独漂泊', '寒冷阴暗'],
    favoriteGifts: ['火属性灵药', '温暖衣物', '花草种子', '古琴'],
  },
];
