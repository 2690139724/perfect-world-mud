import { IDaoLu, DaoLuFactionType, DUAL_CULTIVATION_POSE_TEMPLATES, DAO_LU_INTERACTION_TEMPLATES } from '../../domain/entities/DaoLu';
import { INPCDialogue } from '../../domain/entities/NPC';

const fanrenDialogues: Record<string, INPCDialogue[]> = {
  nangongwan: [
    { id: 'nangongwan_sect', topic: '询问掩月宗', text: '"掩月宗乃天南大宗，以素女轮回功闻名于世。"南宫婉声音温婉，目光柔和："我自幼入门，修行百年，见过无数天骄，却唯独与你……缘分最深。"' },
    { id: 'nangongwan_cultivation', topic: '谈论修炼', text: '"素女轮回功讲究轮回转世，每一世都是新的开始。"南宫婉轻叹："我曾以为修仙之路注定孤寂，直到在血色禁地遇见了你。"' },
    { id: 'nangongwan_past', topic: '提起血色禁地', text: '"那时你我皆是筑基小修，谁能想到……"南宫婉脸上浮现淡淡红晕，低下头去："那日之事，我从未后悔。"' },
  ],
  ziling: [
    { id: 'ziling_miaoyin', topic: '询问妙音门', text: '"妙音门虽以音律立宗，实则是乱星海不容小觑的势力。"紫灵仙子眸光流转，语气中带着一丝傲然："我继承门主之位时，曾发誓要让妙音门成为乱星海第一宗门。"' },
    { id: 'ziling_beauty', topic: '称赞她的美貌', text: '"美貌？"紫灵仙子轻笑一声，眼中却有几分苦涩："在这修仙界，美貌若无实力守护，不过是祸端罢了。我宁愿世人记住我的实力，而非这张脸。"' },
    { id: 'ziling_ambition', topic: '谈论志向', text: '"我汪凝此生，不求飞升仙界，只求护住妙音门上下。"紫灵望向远方，目光坚定："若有朝一日能寻得大道，与你同行，便是最好的归宿。"' },
  ],
  yuanyao: [
    { id: 'yuanyao_ghost', topic: '询问鬼修之道', text: '"鬼修……是旁门左道，为天下修士所不齿。"元瑶神色黯然，随即又变得坚定："但为了救妍丽师姐，我无怨无悔。就算堕入鬼道，我也心甘情愿。"' },
    { id: 'yuanyao_sister', topic: '谈论妍丽', text: '"师姐待我如亲妹妹，当年在魁星岛，若不是她护着我……"元瑶眼眶微红："所以我一定要找到还魂之法，让她重新活过来。"' },
    { id: 'yuanyao_past', topic: '提起过往', text: '"魁星岛的日子，是我此生最平静的时光。"元瑶露出一丝怀念的笑："那时我和师姐一起修炼、一起采药，从不曾想过会走上这条不归路。"' },
  ],
  yanli: [
    { id: 'yanli_sister', topic: '谈论元瑶', text: '"元瑶那丫头，总是这么冲动。"妍丽无奈地摇头，眼中却满是宠溺："为了救我，她竟然去修炼鬼道……这份情，我如何还得起。"' },
    { id: 'yanli_ghost', topic: '鬼修的感受', text: '"成为鬼修之后，我才知道阴阳两隔的痛楚。"妍丽轻叹："但能看到元瑶为我奔波，我又觉得……这一切都值得。"' },
    { id: 'yanli_future', topic: '展望未来', text: '"若有一日能重归人道，我想和元瑶一起，寻一处清净之地隐居。"妍丽望向窗外："不再过问修仙界的纷争，过普通人的日子。"' },
  ],
  chenqiaoqian: [
    { id: 'chenqiaoqian_sect', topic: '询问黄枫谷', text: '"黄枫谷是越国七大派之一，我入门已有数十年。"陈巧倩声音温婉："谷中师兄弟众多，但能有你这样的知己，实属难得。"' },
    { id: 'chenqiaoqian_cultivation', topic: '谈论修炼心得', text: '"修炼一途，切忌急功近利。"陈巧倩认真地告诫："我见证过太多同门因为贪图速成而走火入魔。你资质虽非顶尖，但心性沉稳，未来可期。"' },
    { id: 'chenqiaoqian_feeling', topic: '表露心意', text: '"韩师弟……"陈巧倩低下头，声音细若蚊呐："从你在血色禁地救我的那一刻起，我便……罢了，修仙之人，不该被儿女情长所困。"' },
  ],
  dongxuaner: [
    { id: 'dongxuaner_hehuan', topic: '询问合欢宗', text: '"合欢宗修炼的是阴阳和合之道，世人多有误解。"董萱儿眼波流转，媚态横生："其实讲究的是阴阳调和，互补共生，而非单纯的采补之术。"' },
    { id: 'dongxuaner_body', topic: '天生媚体', text: '"这天生媚体，是福也是祸。"董萱儿苦笑："从小我便能吸引异性，却也招来无数麻烦。若非红拂师祖庇护，我早就被当成炉鼎了。"' },
    { id: 'dongxuaner_freedom', topic: '谈论自由', text: '"我转入合欢宗，并非因为贪恋魔道，而是想要掌控自己的命运。"董萱儿目光灼灼："与其做他人炉鼎，不如自己修成大道。"' },
  ],
  mupeiling: [
    { id: 'mupeiling_luoyun', topic: '询问落云宗', text: '"落云宗在天南虽非顶尖大宗，却也有千年传承。"慕沛灵恭敬地回答："我入门较晚，资质平庸，幸得宗门栽培，才能修炼到今日境界。"' },
    { id: 'mupeiling_master', topic: '谈论韩立', text: '"能侍奉前辈左右，是沛灵的福分。"慕沛灵低下头，脸上浮现淡淡红晕："前辈不仅指点我修炼，更待我如家人一般，这份恩情，沛灵永世不忘。"' },
    { id: 'mupeiling_dream', topic: '修炼的梦想', text: '"我别无所求，只愿能突破瓶颈，多看一眼这修仙界的风景。"慕沛灵轻声说："若能伴随前辈左右，便是此生最大的造化。"' },
  ],
  yinyue: [
    { id: 'yinyue_wolf', topic: '询问银月狼族', text: '"银月狼族乃是灵界妖族中的王族，血脉高贵。"银月眼中闪过一丝傲然，随即又有些落寞："可惜我被困人界数万年，不知族中如今是何模样。"' },
    { id: 'yinyue_vodong', topic: '虚天鼎的岁月', text: '"虚天鼎中暗无天日，唯有神识尚存。"银月叹息："数万年的孤寂，若非遇到你，我恐怕早已神识溃散。你……是我的救命恩人。"' },
    { id: 'yinyue_identity', topic: '狼族妖妃', text: '"妖妃之名，不过是过去的虚名。"银月淡然一笑："如今我只是一缕器灵，依附于你。但若有朝一日能重返灵界，我必当重谢你的恩情。"' },
  ],
};

export const FANREN_DAOLU: IDaoLu[] = [
  {
    id: 'daolu_nangongwan',
    name: '南宫婉',
    title: '掩月宗仙子',
    description: '一位身着淡青色长裙的绝世佳人，气质温婉如兰，眉目间带着淡淡的清冷。她周身缭绕着素女轮回功特有的淡金色灵光，宛如月宫仙子临凡，高洁而不可侵犯。',
    greeting: '南宫婉转过身，看清是你后，清冷的面容上浮现一抹温柔笑意："你来了。我正好炼制了几枚清心丹，你拿去吧。"',
    roomId: 'qingyun_sect',
    dialogues: fanrenDialogues.nangongwan,
    faction: {
      name: '掩月宗',
      type: DaoLuFactionType.SECT,
      description: '天南地区顶尖宗门之一，以素女轮回功闻名于世。宗门女修居多，功法讲究轮回转世，每一世都是新的开始。',
      power: '天南七大派之一',
      location: '掩月宗山门',
      leader: '掩月宗大长老',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'nangongwan_story_1',
        title: '血色禁地初遇',
        requiredIntimacy: 0,
        description: '你在血色禁地深处探索时，发现一名青衣女修正被墨蛟所困。她施展素女轮回功苦苦支撑，却渐渐不支。危急关头，你挺身而出——',
        choices: [
          {
            text: '全力出手，斩杀墨蛟',
            effect: (player) => ({ messages: ['你祭出法器，与墨蛟激战数十回合，终于将其斩杀。南宫婉虚弱地倒在你怀中，面色绯红："多谢道友相救……这份恩情，南宫婉铭记于心。"'], intimacyChange: 20, reward: '墨蛟内丹' }),
          },
          {
            text: '抛出符箓，掩护她撤退',
            effect: (player) => ({ messages: ['你抛出数张高阶符箓，逼退墨蛟，拉着她的手迅速撤离。南宫婉微微一愣，却没有挣脱："道友……好快的反应。"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'nangongwan_story_2',
        title: '素女轮回功的隐患',
        requiredIntimacy: 50,
        description: '南宫婉修炼素女轮回功到了瓶颈，需要一枚罕见的"轮回果"辅助突破。她独自前往幽冥山脉寻找，你得知消息后急忙追赶。',
        choices: [
          {
            text: '陪她一同寻找轮回果',
            effect: (player) => ({ messages: ['你们在幽冥山脉中历经艰险，终于找到轮回果。南宫婉服下灵果，功法大成，她睁开眼，目光中满是柔情："你为何总是这般……让我心动。"'], intimacyChange: 25, reward: '素女心法残页' }),
          },
          {
            text: '替她挡住山脉中的妖兽',
            effect: (player) => ({ messages: ['你独自守在山脉入口，连斩三头高阶妖兽，为南宫婉争取了宝贵时间。她归来时看到你满身伤痕，泪光闪动："傻瓜……何必如此。"'], intimacyChange: 20, reward: '妖兽材料' }),
          },
        ],
      },
      {
        id: 'nangongwan_story_3',
        title: '掩月宗的婚约',
        requiredIntimacy: 200,
        description: '掩月宗大长老为南宫婉定下婚约，要将她许配给天道盟的少主。南宫婉抵死不从，被软禁在宗门禁地。你闻讯赶来——',
        choices: [
          {
            text: '独闯掩月宗，当面退婚',
            effect: (player) => ({ messages: ['你独闯掩月宗大殿，面对元婴期大长老的威压毫不退缩："南宫婉的婚事，应由她自己做主！"南宫婉挣脱束缚，扑入你怀中："我此生非他不嫁！"'], intimacyChange: 40, reward: '掩月宗认可' }),
          },
          {
            text: '以实力证明自己',
            effect: (player) => ({ messages: ['你与天道盟少主当众比试，以结丹之身击败元婴期的他。全场哗然，南宫婉泪流满面："我就知道……你不会让我失望。"'], intimacyChange: 35, reward: '天道盟少主令牌' }),
          },
        ],
      },
      {
        id: 'nangongwan_story_4',
        title: '轮回路上共白头',
        requiredIntimacy: 500,
        description: '南宫婉素女轮回功大成，面临转世轮回的抉择。她可以选择保留记忆轮回，但意味着要离开你数十年；也可以选择放弃轮回，陪你走完此生。',
        choices: [
          {
            text: '立下誓言，等她轮回归来',
            effect: (player) => ({ messages: ['"无论多少年，我都等你。"你郑重起誓。南宫婉泪如雨下，与你紧紧相拥："下一世，我必寻你。生生世世，不负此情。"'], intimacyChange: 100, reward: '轮回之约' }),
          },
          {
            text: '请求她放弃轮回，共赴大道',
            effect: (player) => ({ messages: ['"没有你的大道，我不要。"南宫婉毅然放弃轮回之机，与你十指相扣："素女轮回功虽强，却不如与你共参阴阳大道。此生有你，足矣。"'], intimacyChange: 100, reward: '阴阳和合之气' }),
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
    firstMeeting: '血色禁地，瘴气弥漫。你循着打斗声深入，只见一名青衣女修正与墨蛟缠斗。她身姿曼妙，功法玄妙，却渐露败象。你来不及多想，祭出法器冲入战局——这一战，注定了你们纠缠不清的缘分。',
    backgroundStory: '南宫婉，掩月宗核心弟子，修炼素女轮回功百年，气质清冷如月，内心却温柔多情。血色禁地一役中被韩立所救，二人因墨蛟之毒而结缘，从此情根深种。她虽出身名门，却从不以身份自傲，对韩立一心一意，甚至不惜违抗宗门婚约。后成为韩立的道侣，与他共闯修仙界，是韩立最信任的红颜知己。',
    personalityTraits: ['温婉清冷', '外冷内热', '忠贞不渝', '坚韧不拔'],
    likes: ['灵草丹药', '月下独酌', '清静修炼', '琴音雅乐'],
    dislikes: ['强权逼迫', '虚情假意', '背叛', '喧嚣纷争'],
    favoriteGifts: ['轮回果', '清心丹', '古琴', '青色长裙'],
  },
  {
    id: 'daolu_ziling',
    name: '紫灵仙子',
    title: '妙音门主',
    description: '一位身着紫色纱裙的绝色佳人，眉目如画，肤若凝脂，一双凤眸顾盼生辉。她周身萦绕着妙音门特有的音波灵光，举手投足间既有大家闺秀的端庄，又含上位者的威严。',
    greeting: '紫灵仙子放下手中的玉简，抬眸看你，唇角微扬："稀客呀。妙音门今日新到了一批乱星海的灵茶，要尝尝吗？"',
    roomId: 'tiannan_city',
    dialogues: fanrenDialogues.ziling,
    faction: {
      name: '妙音门',
      type: DaoLuFactionType.SECT,
      description: '乱星海著名宗门，以音律入道，门中弟子多为女修。妙音门功法讲究以音律操控人心，既可治愈亦可杀敌。',
      power: '乱星海一流宗门',
      location: '妙音岛',
      leader: '紫灵仙子',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'ziling_story_1',
        title: '妙音岛邂逅',
        requiredIntimacy: 0,
        description: '你来到乱星海妙音岛，听闻妙音门主紫灵仙子正在招募修士探索一处上古遗迹。你前往应征，在妙音殿中第一次见到这位传说中的乱星海第一美女。',
        choices: [
          {
            text: '以实力打动她，接下探索任务',
            effect: (player) => ({ messages: ['你展露修为，紫灵仙子眼中闪过一丝惊讶："倒是小瞧你了。好，这探索任务便交给你。若能成功，妙音门必有重谢。"'], intimacyChange: 15, reward: '妙音门任务令牌' }),
          },
          {
            text: '以见识博得好感，谈论遗迹秘闻',
            effect: (player) => ({ messages: ['你谈起那处遗迹的上古秘闻，紫灵仙子眼中异彩连连："你竟知道这些？看来不是普通的散修。有趣……"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'ziling_story_2',
        title: '遗迹中的生死与共',
        requiredIntimacy: 50,
        description: '上古遗迹中机关重重，紫灵仙子为破解一处音律阵法耗尽灵力，恰逢遗迹坍塌。你与她被困在密室之中，生死一线。',
        choices: [
          {
            text: '耗尽法力护她周全，独自承受冲击',
            effect: (player) => ({ messages: ['你以肉身挡住坍塌的巨石，将她护在身下。紫灵仙子看着你嘴角的鲜血，眼眶微红："傻子……你为什么要这么做？"'], intimacyChange: 25, reward: '上古音律残卷' }),
          },
          {
            text: '与她合力破解机关，共同脱困',
            effect: (player) => ({ messages: ['你们配合默契，她抚琴破阵，你护法御敌。脱困后，紫灵仙子轻叹："能与我合奏至此的，你是第一个。"'], intimacyChange: 20 }),
          },
        ],
      },
      {
        id: 'ziling_story_3',
        title: '妙音门的内乱',
        requiredIntimacy: 200,
        description: '妙音门长老叛变，勾结外敌围攻妙音岛。紫灵仙子身为门主，誓与宗门共存亡。你得知消息后，连夜赶往乱星海。',
        choices: [
          {
            text: '率众驰援，平定叛乱',
            effect: (player) => ({ messages: ['你召集各方修士，连夜驰援妙音岛。大战三日，终于平定叛乱。紫灵仙子一身血污，却笑得灿烂："你来了……我就知道你一定会来。"'], intimacyChange: 35, reward: '妙音门客卿长老令牌' }),
          },
          {
            text: '潜入敌营，斩杀叛变长老',
            effect: (player) => ({ messages: ['你孤身潜入敌营，于万军之中取叛院长老首级。紫灵仙子看到那颗头颅，怔了许久，而后紧紧抱住你："谢谢……谢谢你为我守住妙音门。"'], intimacyChange: 30 }),
          },
        ],
      },
      {
        id: 'ziling_story_4',
        title: '乱星海第一道侣',
        requiredIntimacy: 500,
        description: '妙音门在你的帮助下成为乱星海第一大派。紫灵仙子站在妙音岛最高处，望着漫天星辰，轻声问你："修仙路上，你可愿让我陪你走下去？"',
        choices: [
          {
            text: '执她之手，许下一世承诺',
            effect: (player) => ({ messages: ['你握住她的手，在漫天星辰下立下誓言。紫灵仙子泪中带笑："我汪凝此生，从不信命。但遇见你，是我唯一相信的缘分。"'], intimacyChange: 100, reward: '妙音门镇派之宝' }),
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
    firstMeeting: '妙音殿中，琴音袅袅。紫灵仙子端坐于琴案之后，紫纱裙裾铺展如莲。她抬眸看你的那一瞬，仿佛乱星海所有的星光都汇聚在她眼中。那是你们第一次相遇，却像是命中注定。',
    backgroundStory: '紫灵仙子，本名汪凝，妙音门门主之女，后继承门主之位。她美貌绝伦，聪明机智，被称为乱星海第一美女。幼年时父亲被仇家所杀，她忍辱负重，在各方势力周旋中保住妙音门。与韩立在乱星海相识，历经遗迹探险、宗门叛乱等生死考验，逐渐对他倾心。她既有女子的柔情，又有领袖的决断，是韩立修仙路上最重要的红颜之一。',
    personalityTraits: ['聪明机智', '外柔内刚', '重情重义', '野心勃勃'],
    likes: ['音律琴艺', '探索遗迹', '珍稀灵茶', '紫色衣裙'],
    dislikes: ['背叛', '被当作花瓶', '弱者的眼泪', '虚伪的奉承'],
    favoriteGifts: ['上古琴谱', '乱星海灵茶', '紫玉簪', '音律法宝'],
  },
  {
    id: 'daolu_yuanyao',
    name: '元瑶',
    title: '鬼道奇女',
    description: '一位身着玄色衣裙的女子，面色苍白却难掩绝色容颜。她周身缭绕着淡淡的鬼气，双眸中既有鬼修的阴冷，又藏着人世的温情。她站在阴风之中，宛如一朵盛开在冥界的彼岸花。',
    greeting: '元瑶转过头，看清是你后，眼中的阴冷瞬间化开："是你？这阴冥之地凶险万分，你怎么找到这里的？"',
    roomId: 'black_wind',
    dialogues: fanrenDialogues.yuanyao,
    faction: {
      name: '鬼道散修',
      type: DaoLuFactionType.WANDERER,
      description: '不入正统宗门的鬼道修士，游离于正魔两道之外。以阴气修炼，能沟通幽冥，常被正道修士所排斥。',
      power: '散修中的强者',
      location: '阴冥山脉',
    },
    status: '散修',
    storyNodes: [
      {
        id: 'yuanyao_story_1',
        title: '魁星岛的旧识',
        requiredIntimacy: 0,
        description: '你在魁星岛坊市偶遇一名玄衣女修，她正在购买炼制养魂丹的材料。你认出她正是当年在血色禁地有过一面之缘的元瑶。她似乎也认出了你。',
        choices: [
          {
            text: '主动上前打招呼，询问近况',
            effect: (player) => ({ messages: ['你上前寒暄，元瑶微微一愣，随即露出一丝苦笑："没想到你还记得我。如今我已是鬼修，你我正魔有别，还是保持距离为好。"话虽如此，她却没有离开。'], intimacyChange: 10 }),
          },
          {
            text: '帮她付清材料费用',
            effect: (player) => ({ messages: ['你替她付清了昂贵的材料费用。元瑶怔怔地看着你："你……何必如此？这些灵石对散修来说不是小数目。"她低下头，声音轻若蚊呐："谢谢。"'], intimacyChange: 15, reward: '养魂丹材料' }),
          },
        ],
      },
      {
        id: 'yuanyao_story_2',
        title: '还魂之法的秘密',
        requiredIntimacy: 50,
        description: '元瑶为了救活妍丽，一直在寻找传说中的还魂之法。她听闻阴冥山脉深处有一株万年阴灵芝，是炼制还魂丹的主药，便独自前往。你知道后放心不下，追了过去。',
        choices: [
          {
            text: '陪她深入阴冥山脉，共寻阴灵芝',
            effect: (player) => ({ messages: ['你们在阴冥山脉中历经九死一生，终于找到万年阴灵芝。元瑶捧着灵芝，泪如雨下："师姐有救了……韩兄，大恩不言谢，元瑶此生定当报答。"'], intimacyChange: 25, reward: '万年阴灵芝' }),
          },
          {
            text: '替她斩杀守护灵芝的鬼王',
            effect: (player) => ({ messages: ['你独自迎战守护阴灵芝的千年鬼王，激战一夜，终于将其斩杀。元瑶看着你伤痕累累的身体，泣不成声："你傻不傻……为什么要为我拼命？"'], intimacyChange: 20, reward: '鬼王内丹' }),
          },
        ],
      },
      {
        id: 'yuanyao_story_3',
        title: '鬼道天劫',
        requiredIntimacy: 200,
        description: '元瑶修炼鬼道至结丹巅峰，面临鬼道特有的阴煞天劫。此劫九死一生，且会波及方圆十里。她为了不牵连他人，独自前往荒原渡劫。你得知后，带上护身法宝赶去。',
        choices: [
          {
            text: '以法宝为她抵挡天劫',
            effect: (player) => ({ messages: ['你祭出护身法宝，替她挡下最猛烈的三道天雷。元瑶在雷光中仰头看你，泪眼朦胧："你为何总是这般……让我欠你越来越多？"'], intimacyChange: 35, reward: '阴煞之气' }),
          },
          {
            text: '在旁护法，防止心魔入侵',
            effect: (player) => ({ messages: ['天劫过后，元瑶心魔丛生，你以神识进入她的识海，助她斩灭心魔。醒来后，她怔怔地看着你："你看到了……我的心魔是你。"'], intimacyChange: 30 }),
          },
        ],
      },
      {
        id: 'yuanyao_story_4',
        title: '阴阳两隔亦相随',
        requiredIntimacy: 500,
        description: '妍丽终于还魂成功，元瑶了却心愿。她站在阴阳交界处，回身看你："我身为鬼修，与你有阴阳之隔。你若嫌弃，我便就此离去，永不再见。"',
        choices: [
          {
            text: '跨越阴阳，与她结为道侣',
            effect: (player) => ({ messages: ['"阴阳相隔又如何？我便修阴阳大道，与你共参。"你坚定地说。元瑶愣了片刻，随即扑入你怀中，泣不成声："韩兄……韩兄……"'], intimacyChange: 100, reward: '阴阳鬼道心法' }),
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
    firstMeeting: '魁星岛坊市，阴风阵阵。玄衣女修站在丹药铺前，面色苍白如纸，却掩不住眉宇间的倔强。她便是元瑶——那个为救师姐不惜堕入鬼道的奇女子。你的一次援手，让她冰冷的心房裂开了一道缝隙。',
    backgroundStory: '元瑶，乱星海魁星岛散修，与师姐妍丽情同姐妹。妍丽被鬼王所害后，元瑶为救师姐，毅然放弃人道，转修鬼道。她重情重义，性格坚韧，虽为鬼修却心存善念。在修仙路上与韩立多次相遇，从最初的戒备到后来的信任，再到生死相依。她对韩立的感情深沉而内敛，从不轻易表露，却在关键时刻总能为他挺身而出。',
    personalityTraits: ['重情重义', '坚韧不拔', '内敛深沉', '知恩图报'],
    likes: ['阴属性灵材', '养魂之物', '安静独处', '师姐的平安'],
    dislikes: ['正道修士的偏见', '见死不救', '背叛', '强权压迫'],
    favoriteGifts: ['万年阴灵芝', '养魂木', '玄色衣裙', '鬼道功法残卷'],
  },
  {
    id: 'daolu_yanli',
    name: '妍丽',
    title: '元瑶师姐',
    description: '一位身着素白衣裙的女子，气质温柔如水，眉目间带着淡淡的忧愁。她周身鬼气比元瑶淡了许多，显然还魂不久，修为尚未恢复。她静静地坐在窗边，望着远方的天空，仿佛在思念什么人。',
    greeting: '妍丽转过头，看到是你，露出一抹温柔的笑："是韩道友啊。元瑶那丫头又麻烦你了吧？她总是这样，不知分寸。"',
    roomId: 'demon_beast',
    dialogues: fanrenDialogues.yanli,
    faction: {
      name: '鬼道散修',
      type: DaoLuFactionType.WANDERER,
      description: '不入正统宗门的鬼道修士，与师妹元瑶一同修行。性情温和，不喜争斗，只求与师妹平安度日。',
      power: '散修',
      location: '阴冥山脉',
    },
    status: '散修',
    storyNodes: [
      {
        id: 'yanli_story_1',
        title: '还魂苏醒',
        requiredIntimacy: 0,
        description: '元瑶终于成功炼制还魂丹，妍丽的魂魄重归肉身。她苏醒后第一眼看到的，除了守在床边的元瑶，还有你这个帮忙寻找材料的外人。',
        choices: [
          {
            text: '温和地问候她，让她安心休养',
            effect: (player) => ({ messages: ['你温和地问候，妍丽虚弱地点头："多谢道友相助……元瑶都告诉我了。这份恩情，我们姐妹铭记于心。"'], intimacyChange: 10 }),
          },
          {
            text: '取出一瓶恢复元气的丹药相赠',
            effect: (player) => ({ messages: ['你取出一瓶珍贵的恢复丹药。妍丽眼中闪过感激："这……太贵重了。"元瑶在一旁笑道："师姐，他是一片好心，你就收下吧。"'], intimacyChange: 15, reward: '还魂丹' }),
          },
        ],
      },
      {
        id: 'yanli_story_2',
        title: '重建修为',
        requiredIntimacy: 50,
        description: '妍丽还魂后修为大跌，需要重新修炼。她不愿拖累元瑶，常常独自前往险地寻找恢复修为的灵药。你得知后，主动提出帮忙。',
        choices: [
          {
            text: '陪她一起寻找灵药，护她周全',
            effect: (player) => ({ messages: ['你们一同前往万妖山脉寻找"回魂草"。途中遭遇妖兽袭击，你始终护在她身前。妍丽看着你宽阔的背影，轻声道："有你在……真好。"'], intimacyChange: 20, reward: '回魂草' }),
          },
          {
            text: '直接送她一瓶高阶恢复丹药',
            effect: (player) => ({ messages: ['你送上一瓶高阶恢复丹药，妍丽推辞不过，只得收下。她看着你，眼中满是温柔："韩道友总是这般体贴，叫妍丽如何报答？"'], intimacyChange: 15 }),
          },
        ],
      },
      {
        id: 'yanli_story_3',
        title: '姐妹的抉择',
        requiredIntimacy: 200,
        description: '元瑶为救妍丽，欠下了巨额灵石债务，被债主逼迫做危险任务。妍丽得知后，决定独自承担债务，不让元瑶再涉险。你得知这事后，找上门来。',
        choices: [
          {
            text: '替她们还清债务',
            effect: (player) => ({ messages: ['你拿出巨额灵石，替她们还清了债务。妍丽跪地叩首："韩道友大恩，妍丽无以为报。若有来世，愿为奴为婢，报答此恩。"你连忙扶起她："不必如此，你们平安就好。"'], intimacyChange: 30, reward: '姐妹感激' }),
          },
          {
            text: '以实力震慑债主，免除债务',
            effect: (player) => ({ messages: ['你找上债主，以元婴期修为震慑对方，迫使其免除债务。妍丽得知后，又是感激又是担忧："你为了我们得罪那人……值得吗？"'], intimacyChange: 25 }),
          },
        ],
      },
      {
        id: 'yanli_story_4',
        title: '隐居之愿',
        requiredIntimacy: 500,
        description: '妍丽修为终于恢复大半，她和元瑶打算寻一处清净之地隐居。临行前，妍丽单独找到你，欲言又止。',
        choices: [
          {
            text: '邀请她们跟随你，共参大道',
            effect: (player) => ({ messages: ['你邀请她们同行。妍丽怔了许久，回头看了看元瑶，又看向你，最终轻轻点头："好……我们姐妹，便随你一同走下去。"'], intimacyChange: 100, reward: '姐妹同心' }),
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
    firstMeeting: '阴冥山脉深处，一间简陋的石室中。素白衣裙的女子缓缓睁开双眼，眸中还有些迷茫。元瑶喜极而泣，而你站在一旁，看着这感人的一幕。妍丽虚弱地向你道谢，那一刻，你看到了她眼底的温柔与坚韧。',
    backgroundStory: '妍丽，乱星海散修，元瑶的师姐。性情温柔善良，与元瑶在魁星岛相依为命。后被鬼王所害，肉身毁灭，魂魄被元瑶以秘法保存。元瑶为救她，不惜堕入鬼道，历经千辛万苦终于炼成还魂丹。妍丽苏醒后，对韩立的恩情铭记于心。她虽不如元瑶那般锋芒毕露，却有着润物细无声的温柔，是韩立修仙路上最温暖的存在。',
    personalityTraits: ['温柔善良', '坚韧隐忍', '知恩图报', '体贴入微'],
    likes: ['清静安宁', '花草灵植', '元瑶的平安', '简单的生活'],
    dislikes: ['拖累他人', '纷争厮杀', '欠债', '分别'],
    favoriteGifts: ['回魂草', '温养魂魄的灵药', '素白衣裙', '静心香'],
  },
  {
    id: 'daolu_chenqiaoqian',
    name: '陈巧倩',
    title: '黄枫谷师姐',
    description: '一位身着淡黄衣裙的女子，气质温婉贤淑，眉目如画。她周身缭绕着黄枫谷功法特有的木属性灵光，宛如春日里的暖阳，让人感到舒适安心。她手持一卷功法玉简，正在静室中研读。',
    greeting: '陈巧倩抬起头，看到你后露出温婉的笑容："韩师弟来了？快坐，我刚泡好一壶灵茶。"',
    roomId: 'qixuan_gate',
    dialogues: fanrenDialogues.chenqiaoqian,
    faction: {
      name: '黄枫谷',
      type: DaoLuFactionType.SECT,
      description: '越国七大派之一，以木属性功法为主，功法温和绵长，适合女修修炼。黄枫谷弟子多性情温和，不喜争斗。',
      power: '越国七大派之一',
      location: '黄枫谷山门',
      leader: '黄枫谷掌门',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'chenqiaoqian_story_1',
        title: '血色禁地的救命之恩',
        requiredIntimacy: 0,
        description: '你在血色禁地深处遇到被妖兽围攻的陈巧倩。她虽已是筑基后期，却寡不敌众，身陷险境。你认出她是黄枫谷的师姐，毫不犹豫地出手相救。',
        choices: [
          {
            text: '全力斩杀妖兽，护她离开',
            effect: (player) => ({ messages: ['你施展浑身解数，斩杀围攻的妖兽，护着陈巧倩撤离禁地。她脸色苍白，却强撑着道谢："韩师弟……多谢救命之恩，巧倩没齿难忘。"'], intimacyChange: 20, reward: '妖兽材料' }),
          },
          {
            text: '抛出高阶符箓，制造机会逃脱',
            effect: (player) => ({ messages: ['你抛出高阶遁地符，带着陈巧倩遁出百里之外。她惊魂未定，看着你："韩师弟心思缜密，巧倩佩服。今日之恩，日后必报。"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'chenqiaoqian_story_2',
        title: '黄枫谷的困境',
        requiredIntimacy: 50,
        description: '黄枫谷突遭魔道袭击，多名弟子受伤。陈巧倩忙于救治同门，自己却中了魔道奇毒。你得知后，带着解毒丹药赶来黄枫谷。',
        choices: [
          {
            text: '亲自为她解毒，寸步不离地照顾',
            effect: (player) => ({ messages: ['你以自身灵力为她疏导毒素，三日三夜未曾合眼。陈巧倩醒来后，看着你憔悴的面容，眼眶微红："韩师弟……你为何对我这么好？"'], intimacyChange: 25, reward: '黄枫谷感激' }),
          },
          {
            text: '献上珍稀解毒丹药',
            effect: (player) => ({ messages: ['你献上一枚珍贵的"清灵解毒丹"。陈巧倩服下后毒素尽消，她向你盈盈一拜："此丹价值连城，韩师弟大恩，巧倩不知何以回报。"'], intimacyChange: 15, reward: '清灵解毒丹' }),
          },
        ],
      },
      {
        id: 'chenqiaoqian_story_3',
        title: '婚约的枷锁',
        requiredIntimacy: 200,
        description: '黄枫谷掌门为了拉拢天道盟，欲将陈巧倩许配给天道盟长老之子。陈巧倩心系于你，却不敢违抗师命。她在月下独酌，黯然神伤。',
        choices: [
          {
            text: '当面向掌门提亲，表明心意',
            effect: (player) => ({ messages: ['你孤身来到黄枫谷大殿，当着众长老之面向陈巧倩表白。她手中的酒杯跌落，泪如雨下："韩师弟……你……"掌门见状，长叹一声："罢了，巧倩的幸福，由她自己选择。"'], intimacyChange: 40, reward: '掌门认可' }),
          },
          {
            text: '私下带她离开黄枫谷',
            effect: (player) => ({ messages: ['夜深人静，你潜入陈巧倩的住处，带她悄然离开黄枫谷。她在月光下握紧你的手："韩师弟，我此生……跟定你了。"'], intimacyChange: 35 }),
          },
        ],
      },
      {
        id: 'chenqiaoqian_story_4',
        title: '黄枫树下定终身',
        requiredIntimacy: 500,
        description: '你们来到黄枫谷后山的那棵千年黄枫树下。陈巧倩靠在树干上，望着漫天红叶："韩师弟，你可知道，黄枫谷的弟子若有了心上人，便会在此树下许约？"',
        choices: [
          {
            text: '在黄枫树下与她结为道侣',
            effect: (player) => ({ messages: ['你们在漫天红叶中许下道侣之誓。陈巧倩泪中带笑，将一枚黄枫叶编入你的发髻："从此，你便是我的道侣。生死相随，不离不弃。"'], intimacyChange: 100, reward: '黄枫谷秘传心法' }),
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
    firstMeeting: '血色禁地，妖兽咆哮。淡黄衣裙的女修被数头二阶妖兽围困，虽勉力支撑，却已是强弩之末。你认出她是黄枫谷的陈师姐，当即祭出法器杀入战局。那一战之后，她看你的眼神，便再也不同。',
    backgroundStory: '陈巧倩，黄枫谷核心弟子，筑基后期修为，性格温婉贤淑。血色禁地一役中被韩立所救，从此对他暗生情愫。她虽身为师姐，却从不以身份压人，对韩立关怀备至。后黄枫谷欲将她许配他人，她心系韩立，最终在选择中偏向了爱情。她是韩立早期修仙路上最温柔的陪伴，代表着凡尘俗世中最真挚的情感。',
    personalityTraits: ['温婉贤淑', '知书达理', '情深义重', '柔中带刚'],
    likes: ['灵茶', '黄枫叶', '安静读书', '同门和睦'],
    dislikes: ['强迫婚约', '魔道修士', '见死不救', '背信弃义'],
    favoriteGifts: ['黄枫灵茶', '木属性灵材', '功法玉简', '淡黄衣裙'],
  },
  {
    id: 'daolu_dongxuaner',
    name: '董萱儿',
    title: '合欢宗魔女',
    description: '一位身着绯红纱裙的妖艳女子，天生媚体，举手投足间自带万种风情。她周身缭绕着合欢宗特有的粉色灵光，一双媚眼顾盼生辉，仿佛能勾魂摄魄。她斜倚在软榻上，姿态慵懒而魅惑。',
    greeting: '董萱儿抬起媚眼，嘴角勾起一抹撩人的笑意："哟，这不是韩道友吗？来合欢宗做客，可要姐姐好好招待你？"',
    roomId: 'hehuan_sect',
    dialogues: fanrenDialogues.dongxuaner,
    faction: {
      name: '合欢宗',
      type: DaoLuFactionType.DEMON,
      description: '魔道六宗之一，修炼阴阳和合之道。宗门弟子多为女修，擅长媚术与双修功法。虽被正道视为邪魔外道，实则内部规矩森严，并非外界所想那般不堪。',
      power: '魔道六宗之一',
      location: '合欢宗总坛',
      leader: '合欢宗宗主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'dongxuaner_story_1',
        title: '黄枫谷的旧识',
        requiredIntimacy: 0,
        description: '你曾在黄枫谷与董萱儿有过数面之缘。后来她转投合欢宗，成为魔道修士。此次你在合欢宗附近的坊市偶遇她，她正被正道修士围堵。',
        choices: [
          {
            text: '出手解围，击退正道修士',
            effect: (player) => ({ messages: ['你出手击退围堵的正道修士。董萱儿收起媚笑，神色复杂："你……为何要救我这个魔道妖女？正道修士不是都恨不得除魔卫道吗？"'], intimacyChange: 15 }),
          },
          {
            text: '以理服人，化解冲突',
            effect: (player) => ({ messages: ['你出面调解，让正道修士离去。董萱儿看着你，眼中闪过一丝意外："没想到你还有这般口才。韩道友，你倒是个妙人。"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'dongxuaner_story_2',
        title: '媚体之苦',
        requiredIntimacy: 50,
        description: '董萱儿的天生媚体突然失控，体内阴气暴走，若不及时调和，将有性命之忧。她不愿成为宗门长老的炉鼎，独自逃到荒山野岭。你感应到她的气息，寻了过去。',
        choices: [
          {
            text: '以自身阳气为她调和阴气',
            effect: (player) => ({ messages: ['你以自身灵力为她疏导暴走的阴气，二人阴阳调和，她的媚体终于稳定下来。董萱儿虚弱地靠在你怀中，难得露出脆弱的一面："谢谢你……从来没有人，这样待过我。"'], intimacyChange: 25, reward: '阴阳调和之气' }),
          },
          {
            text: '寻找灵药，替她压制媚体',
            effect: (player) => ({ messages: ['你寻来珍贵灵药，助她压制媚体。董萱儿服下丹药后，神色复杂："你明明可以趁人之危……为何没有？"'], intimacyChange: 20, reward: '媚体压制丹' }),
          },
        ],
      },
      {
        id: 'dongxuaner_story_3',
        title: '合欢宗的内斗',
        requiredIntimacy: 200,
        description: '合欢宗长老欲强占董萱儿为炉鼎，她拼死反抗，却被宗门囚禁。你得知消息后，单枪匹马闯入合欢宗。',
        choices: [
          {
            text: '大闹合欢宗，救她脱困',
            effect: (player) => ({ messages: ['你独闯合欢宗，连败三位长老，救出董萱儿。她看着你浑身是血的模样，泪如雨下："傻子……你这个傻子……为了我得罪合欢宗，值得吗？"'], intimacyChange: 40, reward: '合欢宗长老令牌' }),
          },
          {
            text: '以宝物交换她的自由',
            effect: (player) => ({ messages: ['你以一件上古法宝为代价，换得董萱儿的自由。她走出囚室，看着你："你为了我，连上古法宝都舍得？我董萱儿……何德何能。"'], intimacyChange: 30 }),
          },
        ],
      },
      {
        id: 'dongxuaner_story_4',
        title: '舍弃媚体，只为一人',
        requiredIntimacy: 500,
        description: '董萱儿决定废去天生媚体，从此不再受它束缚。这需要极大的勇气和痛苦，且修为会大跌。她在密室中闭关前，只通知了你一人。',
        choices: [
          {
            text: '在密室门口为她护法，不离不弃',
            effect: (player) => ({ messages: ['你在密室门口守了七七四十九日。董萱儿出关时，虽修为大跌，却笑靥如花："从今以后，我董萱儿只属于你一人。这份情，你可要负责到底。"'], intimacyChange: 100, reward: '舍弃媚体后的真情' }),
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
    firstMeeting: '合欢宗坊市，正魔对峙。绯红纱裙的妖艳女子被数名正道修士围堵，她却依旧笑得妩媚，仿佛丝毫不惧。你认出她是黄枫谷的旧识董萱儿，心生恻隐，出手替她解围。她看你的眼神，从惊讶到复杂，再到一丝说不清道不明的情愫。',
    backgroundStory: '董萱儿，原为黄枫谷弟子，天生媚体，修炼资质极佳。因体质特殊，被合欢宗看中，转投魔道。她虽身处魔宗，却心有不甘，不愿沦为他人炉鼎。与韩立在黄枫谷相识，后多次得他相救，逐渐对他产生真情。她性格妖媚却不放荡，外表风情万种，内心却渴望一份真挚的感情。最终为了韩立，不惜废去天生媚体，只求与他相守。',
    personalityTraits: ['妖媚风情', '外浪内贞', '敢爱敢恨', '坚韧不拔'],
    likes: ['自由', '被人真心对待', '绯红衣饰', '强大实力'],
    dislikes: ['被当作炉鼎', '虚伪的正道', '强迫', '背叛'],
    favoriteGifts: ['阴阳调和丹', '绯红纱裙', '媚术功法', '自由之身'],
  },
  {
    id: 'daolu_mupeiling',
    name: '慕沛灵',
    title: '落云宗弟子',
    description: '一位身着淡蓝色衣裙的年轻女修，气质清秀温婉，眉眼间带着几分拘谨和恭敬。她周身灵力波动显示她刚刚突破结丹期，修为尚不稳固。她手持一卷功法，正在刻苦研读。',
    greeting: '慕沛灵看到你，连忙起身行礼，神色恭敬中带着一丝羞涩："前辈来了？沛灵有失远迎，还请恕罪。"',
    roomId: 'qixuan_main_street',
    dialogues: fanrenDialogues.mupeiling,
    faction: {
      name: '落云宗',
      type: DaoLuFactionType.SECT,
      description: '天南地区中等宗门，以炼器和阵法闻名。宗门氛围宽松，弟子自由度高，不像大宗门那般等级森严。',
      power: '天南中等宗门',
      location: '落云宗山门',
      leader: '落云宗大长老',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'mupeiling_story_1',
        title: '落云宗的初见',
        requiredIntimacy: 0,
        description: '你初到落云宗，宗门安排一名女弟子接待你。那便是慕沛灵，她修为不高，却做事认真细致，将一切安排得井井有条。',
        choices: [
          {
            text: '称赞她的细心，赠送一枚丹药',
            effect: (player) => ({ messages: ['你称赞她的细心，并赠予一枚有助于修炼的丹药。慕沛灵受宠若惊："前辈过奖了……这丹药太贵重，沛灵不敢收。"你坚持之下，她才小心收起。'], intimacyChange: 10, reward: '落云宗好感' }),
          },
          {
            text: '询问她的修炼情况，指点一二',
            effect: (player) => ({ messages: ['你随意指点了几句结丹期的心得。慕沛灵如获至宝，连忙拿出玉简记录："前辈所言，沛灵定当铭记于心。"'], intimacyChange: 15 }),
          },
        ],
      },
      {
        id: 'mupeiling_story_2',
        title: '宗门大比',
        requiredIntimacy: 50,
        description: '落云宗举行宗门大比，慕沛灵报名参加，却在比试中被同门师兄暗算，身受重伤。你恰好在场，目睹了这一切。',
        choices: [
          {
            text: '当众揭穿暗算，为她讨回公道',
            effect: (player) => ({ messages: ['你当众揭穿那名师兄的暗算手段，迫使其受罚。慕沛灵躺在担架上，含泪看你："前辈……为何要为了我，得罪宗门弟子？"'], intimacyChange: 20, reward: '公道' }),
          },
          {
            text: '私下为她疗伤，赠送疗伤丹药',
            effect: (player) => ({ messages: ['你私下为她疗伤，以高阶丹药助她恢复。慕沛灵感动不已："前辈大恩，沛灵无以为报。日后前辈若有差遣，沛灵万死不辞。"'], intimacyChange: 15, reward: '疗伤丹药' }),
          },
        ],
      },
      {
        id: 'mupeiling_story_3',
        title: '名义侍妾',
        requiredIntimacy: 200,
        description: '为了躲避宗门内的逼婚，慕沛灵请求你做她名义上的侍妾之主。你答应后，她得以摆脱宗门长老的纠缠。但她心中，却渐渐生出了真情。',
        choices: [
          {
            text: '真心待她，不将她当作侍妾',
            effect: (player) => ({ messages: ['你待她如弟子，悉心指点修炼，从不逾矩。慕沛灵日渐倾心，一日终于忍不住问："前辈……你为何不碰我？是沛灵不够好吗？"'], intimacyChange: 30 }),
          },
          {
            text: '助她提升修为，让她自立',
            effect: (player) => ({ messages: ['你倾力相助，助她突破结丹中期。慕沛灵修为精进后，却不愿离开："前辈，沛灵不想自立门户……只想陪在你身边。"'], intimacyChange: 25, reward: '结丹中期修为' }),
          },
        ],
      },
      {
        id: 'mupeiling_story_4',
        title: '落云之巅',
        requiredIntimacy: 500,
        description: '慕沛灵修为终于突破元婴期，成为落云宗年轻一代最强者。她在落云之巅找到你，目光坚定："前辈，沛灵如今已有资格站在你身边。你可愿……让我成为真正的道侣？"',
        choices: [
          {
            text: '牵起她的手，正式结为道侣',
            effect: (player) => ({ messages: ['你牵起她的手，在落云之巅立下道侣之誓。慕沛灵泪光闪烁，却笑得无比灿烂："沛灵此生，最大的造化不是突破元婴，而是遇见了你。"'], intimacyChange: 100, reward: '落云宗秘宝' }),
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
    firstMeeting: '落云宗山门前，淡蓝衣裙的女修恭敬地向你行礼。她修为不高，却将接待事宜安排得妥妥当当。你随口指点了几句结丹心得，她便如获至宝，认真记录的模样让你不禁莞尔。',
    backgroundStory: '慕沛灵，落云宗弟子，资质中上，性情温婉恭顺。初遇韩立时，她只是宗门安排接待的女弟子，修为尚浅。后在宗门大比中被韩立所救，对他心生仰慕。为躲避宗门逼婚，她请求成为韩立名义上的侍妾。韩立待她如弟子，悉心指点，助她一路突破至元婴期。她对韩立的感情从敬仰到爱慕，最终成为他真正的道侣。她是韩立身边最温柔体贴的存在，代表着平凡女子通过努力获得幸福的希望。',
    personalityTraits: ['温婉恭顺', '勤奋刻苦', '知恩图报', '坚韧执着'],
    likes: ['修炼', '前辈的指点', '落云宗', '安静的环境'],
    dislikes: ['宗门逼婚', '同门暗算', '被轻视', '喧嚣'],
    favoriteGifts: ['修炼丹药', '功法玉简', '淡蓝衣裙', '灵石'],
  },
  {
    id: 'daolu_yinyue',
    name: '银月',
    title: '银月狼妃',
    description: '一位银发及腰的绝美女子，肌肤胜雪，双眸呈奇异的银色，宛如两轮弯月。她身后隐约可见一条银色狼尾的虚影，周身散发着妖族特有的野性气息与高贵威压。她斜倚在石座上，姿态慵懒而威严。',
    greeting: '银月抬起银色的眼眸，看清是你后，嘴角微微上扬："你来了？虚天鼎中那数万年的孤寂，都不及等你来的这半日漫长。"',
    roomId: 'demon_beast',
    dialogues: fanrenDialogues.yinyue,
    faction: {
      name: '银月狼族',
      type: DaoLuFactionType.MONSTER,
      description: '灵界妖族中的王族，血脉高贵，实力强横。银月狼族以月光修炼，族中强者可引动月华之力，威力无穷。',
      power: '灵界妖族王族',
      location: '灵界银月山脉',
      leader: '银月狼王',
    },
    status: '隐居',
    storyNodes: [
      {
        id: 'yinyue_story_1',
        title: '虚天鼎中的器灵',
        requiredIntimacy: 0,
        description: '你在虚天殿中得到虚天鼎，却发现鼎中封印着一道强大的器灵。那器灵显现真身，竟是一位银发绝色女子——银月狼族的妖妃。',
        choices: [
          {
            text: '承诺助她重返灵界',
            effect: (player) => ({ messages: ['你郑重承诺助她重返灵界。银月银色的眼眸中闪过一丝惊讶，随即笑道："数万年来，你是第一个不把我当器灵使唤的人。有趣……"'], intimacyChange: 15, reward: '银月认可' }),
          },
          {
            text: '询问她的来历，表示尊重',
            effect: (player) => ({ messages: ['你认真询问她的来历，态度恭敬。银月微微一愣，随即露出怀念之色："已经很久没有人，把我当作平等的修士对待了……"'], intimacyChange: 10 }),
          },
        ],
      },
      {
        id: 'yinyue_story_2',
        title: '狼族血脉的觉醒',
        requiredIntimacy: 50,
        description: '银月依附于你后，发现你的灵力竟然能激发她体内沉寂已久的狼族血脉。她需要一处月光充沛之地进行血脉觉醒仪式，却遭遇人界修士的围攻。',
        choices: [
          {
            text: '全力守护，为她争取觉醒时间',
            effect: (player) => ({ messages: ['你独自面对数名元婴期修士，为银月争取觉醒时间。当她完成觉醒，银色狼影冲天而起时，她第一时间冲到你身前，护住伤痕累累的你："敢伤他的人……死！"'], intimacyChange: 25, reward: '狼族血脉觉醒' }),
          },
          {
            text: '以智取胜，引开围攻的修士',
            effect: (player) => ({ messages: ['你以计引开围攻的修士，让银月顺利完成觉醒。她醒来后找到你，银色眼眸中满是复杂："你明明可以把我交出去换平安……为什么要冒险？"'], intimacyChange: 20 }),
          },
        ],
      },
      {
        id: 'yinyue_story_3',
        title: '灵界通道的开启',
        requiredIntimacy: 200,
        description: '你终于找到了通往灵界的上古传送阵，却需要牺牲一件本命法宝作为祭品。银月得知后，坚决反对——因为那件法宝是你与她神识相连的纽带。',
        choices: [
          {
            text: '坚持开启传送阵，送她回家',
            effect: (player) => ({ messages: ['你毅然牺牲本命法宝，开启传送阵。银月泪如雨下："你这笨蛋……没有了纽带，我们如何联系？"她咬破手指，以狼族血誓与你建立新的联系："以血为契，生生世世，我都能找到你。"'], intimacyChange: 40, reward: '狼族血誓' }),
          },
          {
            text: '寻找替代之法，不牺牲纽带',
            effect: (player) => ({ messages: ['你历经艰辛，找到替代祭品，保全了与她的神识纽带。银月松了一口气，却又有些失落："你……是不是舍不得我？"'], intimacyChange: 30 }),
          },
        ],
      },
      {
        id: 'yinyue_story_4',
        title: '银月之下',
        requiredIntimacy: 500,
        description: '银月即将通过传送阵返回灵界。临别前夜，她化作一头银色巨狼，带你飞到万丈高空，在皓月之下俯瞰大地。',
        choices: [
          {
            text: '在月光下与她立下重逢之约',
            effect: (player) => ({ messages: ['你在月光下立下誓言，无论千年万年，必去灵界寻她。银月化作人形，与你相拥："我银月此生，只认你一人。灵界的月亮再圆，没有你在身边，也是残缺。"'], intimacyChange: 100, reward: '银月之吻' }),
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
    firstMeeting: '虚天殿深处，古鼎横空。你以精血炼化虚天鼎，鼎中突然冲出一道银光，化作一位银发绝色女子。她银色的眼眸中带着数万年的孤寂与傲然，俯视着你："凡人，是你唤醒了本宫？"那一刻，你们命运的齿轮开始转动。',
    backgroundStory: '银月，灵界银月狼族的王妃，身份尊贵，实力强大。因卷入灵界纷争，被封印在虚天鼎中数万年，沦为器灵。后被韩立所得，逐渐恢复神识。她既有妖族的高傲，又有女子的柔情。在漫长的相伴中，她对韩立从利用到依赖，再到深爱。她是韩立身边最神秘的红颜，也是实力最强的助力之一。最终为返回灵界复仇，与韩立暂别，但二人之情，跨越了人灵两界的阻隔。',
    personalityTraits: ['高傲尊贵', '外冷内热', '忠贞不渝', '野性难驯'],
    likes: ['月光', '自由', '强大实力', '银饰'],
    dislikes: ['被封印', '被当作器灵', '背叛', '弱小'],
    favoriteGifts: ['月光石', '银月狼族遗物', '空间法宝', '银色发饰'],
  },
];
