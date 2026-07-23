import { INPC, INPCDialogue } from './NPC';
import { IPlayer } from './Player';
import { NPCLifeLogicGenerator } from '../services/NPCLifeLogicGenerator';

export interface IDynamicNPCTemplate {
  id: string;
  name: string;
  title: string;
  description: string;
  greeting: string;
  dialogues: INPCDialogue[];
  environments: string[];
}

const dynamicNPCTemplates: IDynamicNPCTemplate[] = [
  {
    id: 'traveler',
    name: '云游旅人',
    title: '行脚商人',
    description: '一个风尘仆仆的旅人，背着一个巨大的行囊，脚步匆匆。看起来刚从远方而来，又要去往更远的地方。',
    greeting: '旅人停下脚步，看了你一眼："这位道友，赶路呢？这条路可不太平，多保重。"',
    environments: ['道路', '小径', '路口', '荒原', '旷野'],
    dialogues: [
      {
        id: 'traveler_where',
        topic: '问他从哪里来',
        text: '旅人指了指身后："从火皇城那边来。最近那边可不太平，百断山方向有异动，连火皇都派人去查了。"',
      },
      {
        id: 'traveler_goods',
        topic: '看看他卖什么',
        text: '旅人打开行囊，里面有一些零散的灵药和兽骨制品："都是些路上顺手收集的，价格公道，道友有兴趣看看？"',
      },
      {
        id: 'traveler_warning',
        topic: '打听前方情况',
        text: '"前面那段路我没走过，但听说有凶兽出没。你要是修为不够，最好结伴而行。"',
      },
    ],
  },
  {
    id: 'hunter',
    name: '山林猎户',
    title: '猎手',
    description: '一个穿着兽皮衣的猎户，背着猎弓，腰间挂着几个兽皮袋。身上带着淡淡的血腥味，显然刚打猎回来。',
    greeting: '猎户警觉地看向你，看清是修士后放松了些："道友也是来猎凶兽的？这片林子最近可不太平。"',
    environments: ['森林', '山林', '树林', '后山', '荒野'],
    dialogues: [
      {
        id: 'hunter_prey',
        topic: '问他打到了什么',
        text: '猎户得意地展示他的猎物："今天运气不错，猎到了一头灵狐。这皮毛可以做护身符，肉也能卖个好价钱。"',
      },
      {
        id: 'hunter_danger',
        topic: '打听危险',
        text: '猎户压低声音："林子深处有一只大家伙，我远远看到过，通体雪白，起码有千年道行。你最好别往那边去。"',
      },
      {
        id: 'hunter_advice',
        topic: '请教打猎技巧',
        text: '"打猎嘛，讲究的是耐心和眼力。凶兽虽然厉害，但也有弱点。你得学会观察，找到它的破绽再出手。"',
      },
    ],
  },
  {
    id: 'herbalist',
    name: '采药人',
    title: '药农',
    description: '一个背着竹篓的采药人，身上沾满泥土和草屑。手中拿着一把药锄，正在认真地搜寻着什么。',
    greeting: '采药人抬起头，擦了把汗："道友，请问你看到过一株紫色的草药吗？我找了半天都没找到。"',
    environments: ['山林', '森林', '山谷', '溪边', '草地'],
    dialogues: [
      {
        id: 'herbalist_herbs',
        topic: '帮他找草药',
        text: '你帮他在附近搜寻了一番，终于找到了那株紫色的草药。采药人感激地说："多谢道友！这是紫纹草，可是炼制凝神丹的好材料。"',
        onSelect: () => ({ messages: ['采药人分了几株普通灵草给你作为谢礼。'] }),
      },
      {
        id: 'herbalist_knowledge',
        topic: '请教草药知识',
        text: '采药人如数家珍地介绍起来："这片山里有不少好药，只是越珍贵的药，旁边越可能有凶兽守着。你看这株——"他指着一株不起眼的草："这叫解毒草，遇到蛇毒时有用。"',
      },
      {
        id: 'herbalist_warning',
        topic: '问山里的情况',
        text: '"最近山里不太平，我看到过几只凶兽在游荡。你要是想采药，最好白天来，天黑之前一定要离开。"',
      },
    ],
  },
  {
    id: 'merchant',
    name: '游商',
    title: '流动商贩',
    description: '一个精明的商人，推着一辆小车，车上摆满了各种货物。一双眼睛滴溜溜地转，一看就是做惯了生意的人。',
    greeting: '商人热情地招呼你："来来来！看一看瞧一瞧！各种灵药、法器、宝术残片，应有尽有！"',
    environments: ['集市', '广场', '街道', '路口', '城门'],
    dialogues: [
      {
        id: 'merchant_bargain',
        topic: '讨价还价',
        text: '商人一脸肉痛："道友你这是要我的命啊！这价我已经是亏本卖了……罢了罢了，看你面善，给你便宜点。"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 5) {
            p.gold -= 5;
            return { messages: ['你花了 5 枚原始币买了一件普通法器。商人笑眯眯地收了钱，你总觉得自己还是亏了。'] };
          }
          return { messages: ['你摸了摸口袋，钱不够。商人摆摆手："下次再来。"'] };
        },
      },
      {
        id: 'merchant_rumor',
        topic: '打听消息',
        text: '商人压低声音："我听说啊，最近有大人物要来这一带。好像是为了百断山的事……具体我也不清楚，你自己琢磨去吧。"',
      },
      {
        id: 'merchant_goods',
        topic: '看看好货',
        text: '"嘿嘿，我这可有好东西！"商人从怀里摸出一块玉佩："这是从一处遗迹里淘来的，据说能辟邪。价钱嘛……不便宜。"',
      },
    ],
  },
  {
    id: 'guard',
    name: '巡逻卫兵',
    title: '城防士兵',
    description: '一个穿着制式铠甲的士兵，手持长枪，步伐稳健。眼神锐利，警惕地观察着四周。',
    greeting: '卫兵拦住了你："站住！此处是城防重地，出示你的身份证明。"',
    environments: ['城门', '城墙', '兵营', '街道', '广场'],
    dialogues: [
      {
        id: 'guard_pass',
        topic: '出示身份',
        text: '卫兵检查了你的身份，点点头："原来是道友。城内禁止私斗，违者重罚。你要是有什么事，可以去城主府找石伯。"',
      },
      {
        id: 'guard_news',
        topic: '打听城内消息',
        text: '"最近城外不太平，凶兽越来越多了。城主已经下令加强戒备，你出城的时候也要小心。"',
      },
      {
        id: 'guard_training',
        topic: '请求切磋',
        text: '卫兵眼睛一亮："切磋？好！正好手痒了。不过我会手下留情的。"',
        condition: (p: IPlayer) => p.realm >= 2,
        onSelect: () => {
          const dmg = Math.floor(Math.random() * 15) + 5;
          return { messages: [`切磋结束，你掉了 ${dmg} 点气血。卫兵点头："不错，有潜力。"`] };
        },
      },
    ],
  },
  {
    id: 'monk',
    name: '苦行僧',
    title: '游历僧人',
    description: '一个穿着破旧僧袍的僧人，赤着脚，背着一个布袋。面容清瘦，但眼神平和，透着一股超然物外的气息。',
    greeting: '僧人双手合十，微微一笑："阿弥陀佛。施主，你也是来此历练的？"',
    environments: ['寺庙', '祭坛', '山林', '道路', '废墟'],
    dialogues: [
      {
        id: 'monk_philosophy',
        topic: '请教佛法',
        text: '僧人缓缓说道："世间万物，皆有因果。修炼亦是如此，种善因得善果，种恶因得恶果。施主，切记心存善念。"',
        onSelect: () => ({ messages: ['听了僧人的话，你感觉心境平和了许多。'] }),
      },
      {
        id: 'monk_origin',
        topic: '问他来自哪里',
        text: '"我来自西方的雷音寺。"僧人说："此番游历，是为了寻找遗失的经文。据说那部经文记载着上古的秘密。"',
      },
      {
        id: 'monk_warning',
        topic: '问前路吉凶',
        text: '僧人掐指一算："施主，前路虽有凶险，但亦是机缘。记住——「福祸相依，生死一念」。"',
      },
    ],
  },
  {
    id: 'fisherman',
    name: '老渔夫',
    title: '垂钓者',
    description: '一个戴着斗笠的老人，坐在河边垂钓。鱼竿很长，鱼钩在水面轻轻晃动。身旁放着一个鱼篓，里面有几条活蹦乱跳的鱼。',
    greeting: '老渔夫头也不抬，慢悠悠地说："年轻人，别吵，鱼要上钩了。"',
    environments: ['河边', '湖畔', '江边', '溪流', '水潭'],
    dialogues: [
      {
        id: 'fisherman_fish',
        topic: '看他钓了什么',
        text: '老渔夫提起鱼竿，一条银光闪闪的鱼被钓了上来："呵呵，这条不错，足有三斤重。晚上可以炖个鱼汤喝了。"',
      },
      {
        id: 'fisherman_story',
        topic: '听他讲故事',
        text: '老渔夫放下鱼竿，陷入回忆："三十年前，这里还是一片荒地。后来有人发现了这处灵泉，慢慢就热闹起来了。我在这钓了二十年鱼，看着石城一天天变大。"',
      },
      {
        id: 'fisherman_advice',
        topic: '请教人生哲理',
        text: '"钓鱼嘛，讲究的是耐心。"老渔夫说："修炼也是一样，急不得。你看这鱼，你越急着钓它，它越不上钩。"',
      },
    ],
  },
  {
    id: 'child',
    name: '玩耍孩童',
    title: '天真孩童',
    description: '一个七八岁的小孩子，脸上脏兮兮的，手里拿着一个风车。看到你来，好奇地睁大眼睛看着你。',
    greeting: '小孩子跑到你面前，举着风车："大哥哥/大姐姐，你看我的风车！会转呢！"',
    environments: ['广场', '街道', '居民区', '庭院', '溪边'],
    dialogues: [
      {
        id: 'child_play',
        topic: '陪他玩',
        text: '你陪小孩子玩了一会儿，他开心地咯咯直笑："大哥哥/大姐姐真好！我长大了也要当修士！"',
        onSelect: () => ({ messages: ['小孩子送了你一颗糖果作为谢礼。虽然只是普通的糖果，但你感到一丝温暖。'] }),
      },
      {
        id: 'child_secret',
        topic: '问他知道什么',
        text: '小孩子神秘兮兮地说："我告诉你一个秘密！后山有个山洞，里面有发光的石头！不过我不敢进去……"',
      },
      {
        id: 'child_dream',
        topic: '问他长大想做什么',
        text: '"我长大了要当最厉害的修士！"小孩子挺起胸膛："然后保护村子，不让凶兽伤害大家！"',
      },
    ],
  },
  {
    id: 'scholar',
    name: '书生',
    title: '游学读书人',
    description: '一个穿着青衫的书生，背着书箱，手持折扇。看起来文质彬彬，但眉宇间透着一股傲气。',
    greeting: '书生看到你，微微拱手："这位道友，有礼了。在下游学至此，想请教一些关于此地的风土人情。"',
    environments: ['书院', '广场', '酒馆', '街道', '客栈'],
    dialogues: [
      {
        id: 'scholar_discuss',
        topic: '讨论学问',
        text: '书生侃侃而谈："天地之道，在于阴阳平衡。修炼亦是如此，刚柔并济，方为正道。你可知为何许多修士卡在瓶颈？便是因为只知进不知退。"',
        onSelect: () => ({ messages: ['听了书生的话，你感觉对修炼有了新的领悟。'] }),
      },
      {
        id: 'scholar_origin',
        topic: '问他来历',
        text: '"在下来自东域的书香门第。"书生说："此番游学，是为了增长见闻。听说此地有上古遗迹，不知道友可有耳闻？"',
      },
      {
        id: 'scholar_rumor',
        topic: '打听消息',
        text: '书生压低声音："我听说，百断山深处有一处上古洞府，里面可能有宝术传承。这事儿知道的人不多，你可别到处说。"',
      },
    ],
  },
  {
    id: 'blacksmith',
    name: '铁匠',
    title: '锻冶师',
    description: '一个精壮的汉子，赤裸上身，古铜色的皮肤上布满汗珠。铁锤在他手中上下翻飞，火花四溅。',
    greeting: '铁匠擦了把汗，咧嘴一笑："想要兵器？我打造的兵器，方圆百里都是有名的！"',
    environments: ['铁匠铺', '工坊', '广场', '市集'],
    dialogues: [
      {
        id: 'blacksmith_weapon',
        topic: '打造兵器',
        text: '铁匠打量了你一番："你这修为，需要一把趁手的兵器。我这里有几种材料，你看看想要哪种？"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 20) {
            p.gold -= 20;
            return { messages: ['你花了 20 枚原始币，铁匠为你打造了一把精钢长剑。剑刃锋利，入手沉重。'] };
          }
          return { messages: ['铁匠摇摇头："材料不够，你先攒点钱再来吧。"'] };
        },
      },
      {
        id: 'blacksmith_talk',
        topic: '聊打铁',
        text: '铁匠自豪地说："我这手艺是祖传的！当年我爷爷还给火皇的亲卫队打造过兵器呢。可惜后来家道中落了……"',
      },
      {
        id: 'blacksmith_material',
        topic: '问他需要什么材料',
        text: '"好材料？后山暗影洞深处有种矿石，叫影铁。要是能弄来几块，我能给你打把好兵器。不过那地方凶险，你自己掂量。"',
      },
    ],
  },
  {
    id: 'innkeeper',
    name: '客栈老板',
    title: '掌柜',
    description: '一个精明的中年人，穿着体面的衣裳，站在柜台后面。看到客人来了，立刻堆满笑容。',
    greeting: '老板热情地迎上来："客官，是住店还是打尖？我们这里干净整洁，饭菜可口，价钱公道！"',
    environments: ['客栈', '酒馆', '驿站'],
    dialogues: [
      {
        id: 'innkeeper_stay',
        topic: '住店',
        text: '老板麻利地安排好房间："客官，二楼天字号房，干净又安静。您好好休息，有什么需要随时叫我。"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 10) {
            p.gold -= 10;
            return { messages: ['你花了 10 枚原始币住了一晚。房间干净整洁，你好好休息了一晚，气血恢复了一些。'] };
          }
          return { messages: ['老板摇摇头："客官，先结账吧。"'] };
        },
      },
      {
        id: 'innkeeper_food',
        topic: '吃饭',
        text: '老板吆喝一声："小二，上一桌好酒好菜！"不一会儿，一桌丰盛的酒菜端了上来。你饱餐一顿，感觉精力充沛。',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 5) {
            p.gold -= 5;
            return { messages: ['你花了 5 枚原始币吃了一顿饭。酒菜不错，你感觉气血有所恢复。'] };
          }
          return { messages: ['老板笑眯眯地看着你："客官，账还没结呢。"'] };
        },
      },
      {
        id: 'innkeeper_rumor',
        topic: '打听消息',
        text: '老板压低声音："你听说了吗？最近有大人物要来这一带。好像是为了百断山的事……具体我也不清楚，你自己琢磨去吧。"',
      },
    ],
  },
  {
    id: 'alchemist',
    name: '炼丹师',
    title: '丹师',
    description: '一个穿着丹袍的老者，须发皆白，身上散发着浓郁的草药味。正在专注地盯着丹炉，眉头紧锁。',
    greeting: '丹师头也不抬："嘘……别说话，这炉丹正在关键时刻。"',
    environments: ['丹房', '灵药阁', '药铺', '山洞'],
    dialogues: [
      {
        id: 'alchemist_learn',
        topic: '请教炼丹',
        text: '丹师终于抬起头，打量了你一番："想学炼丹？首先得认得药性，其次要掌握火候。你连草药都认不全吧？先从基础学起。"',
        condition: (p: IPlayer) => p.realm < 3,
      },
      {
        id: 'alchemist_buy',
        topic: '买丹药',
        text: '丹师拿出一瓶丹药："这是培元丹，能固本培元。二十枚原始币一瓶。你要是买得多，可以便宜点。"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 20) {
            p.gold -= 20;
            return { messages: ['你花了 20 枚原始币买了一瓶培元丹。丹药入手温热，散发着淡淡的药香。'] };
          }
          return { messages: ['丹师摇摇头："没钱？那就别问了。"'] };
        },
      },
      {
        id: 'alchemist_secret',
        topic: '打听秘方',
        text: '丹师神秘地说："我最近在研究一种新丹药，据说能让人突破瓶颈。但是材料太难找了，需要百断山深处的龙涎草作为主药。"',
      },
    ],
  },
  {
    id: 'rune_master',
    name: '符文师',
    title: '符文大师',
    description: '一个穿着蓝色长袍的中年人，手指修长，正在一块灵纹石上刻画符文。神情专注，仿佛整个世界只剩下他和手中的符文。',
    greeting: '符文师头也不抬，专注地刻画符文："想要什么样的符文？攻击、防御、神速，应有尽有。"',
    environments: ['符文阁', '工坊', '广场', '市集'],
    dialogues: [
      {
        id: 'rune_buy',
        topic: '买符文',
        text: '符文师放下刻刀，拿出一块刻着"力"字的灵纹石："这是以灵纹石为基刻画的攻击符文，可临时提升攻击力。三十枚原始币。"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 30) {
            p.gold -= 30;
            return { messages: ['你花了 30 枚原始币买了一枚攻击符文。灵纹石入手温热，似乎蕴含着一股力量。'] };
          }
          return { messages: ['符文师摇摇头："符文可不便宜。"'] };
        },
      },
      {
        id: 'rune_learn',
        topic: '请教符文之道',
        text: '"符文之道，在于沟通天地。"符文师语重心长地说："每一个符文，都是对天地法则的一种诠释。道友若想学，先从基础的符文开始，理解它们的含义。"',
      },
      {
        id: 'rune_secret',
        topic: '打听高阶符文',
        text: '符文师压低声音："高阶符文？我这有一枚巨力符文，是我师父传下来的。大幅提升攻击力，但数量有限，一百枚原始币一枚。"',
      },
    ],
  },
  {
    id: 'array_master',
    name: '阵法师',
    title: '阵法大师',
    description: '一个穿着道袍的老者，须发皆白，但精神矍铄。手里拿着一个罗盘，正在推演阵法。',
    greeting: '阵法师捋着胡须："阵法之道，博大精深。道友是想学习阵法，还是购买阵盘？"',
    environments: ['阵法堂', '工坊', '广场', '市集'],
    dialogues: [
      {
        id: 'array_buy',
        topic: '买阵盘',
        text: '阵法师从架子上取下一个精致的阵盘："这是玄盾阵盘，刻有玄盾阵法纹路，可布置小型防御阵法。一百枚原始币。"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 100) {
            p.gold -= 100;
            return { messages: ['你花了 100 枚原始币买了一个玄盾阵盘。阵盘上刻满了复杂的纹路，散发着淡淡的灵光。'] };
          }
          return { messages: ['阵法师叹了口气："阵盘制作不易，便宜不了。"'] };
        },
      },
      {
        id: 'array_learn',
        topic: '学习阵法',
        text: '"学习阵法好啊。"阵法师说："这本《阵法初解》介绍了基础的阵法知识，八十枚原始币。"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 80) {
            p.gold -= 80;
            return { messages: ['你花了 80 枚原始币买了《阵法初解》。书中记载了各种基础阵法的原理和布置方法。'] };
          }
          return { messages: ['阵法师摇摇头："知识无价，便宜不了。"'] };
        },
      },
      {
        id: 'array_advice',
        topic: '请教阵法之道',
        text: '"阵法之道，在于天时地利人和。"阵法师傅语重心长地说："一个好的阵法，不仅要懂其原理，还要懂得如何因地制宜，灵活运用。"',
      },
    ],
  },
  {
    id: 'tamer',
    name: '灵兽驯养师',
    title: '驯兽师',
    description: '一个穿着兽皮的中年人，身边跟着一只灵狐。面容粗犷，但眼神温柔，显然很爱护灵兽。',
    greeting: '驯兽师正在抚摸灵狐，看到你来了，微笑着说："道友想挑选一只灵兽？"',
    environments: ['灵兽坊', '广场', '市集', '后山'],
    dialogues: [
      {
        id: 'tamer_buy',
        topic: '买灵兽',
        text: '驯兽师抱起一只灵狐："温顺可爱的灵狐，可作为宠物，偶尔能感知危险。一百枚原始币。"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 100) {
            p.gold -= 100;
            return { messages: ['你花了 100 枚原始币买了一只灵狐。灵狐温顺可爱，用脑袋蹭了蹭你的手。'] };
          }
          return { messages: ['驯兽师摇摇头："灵狐可不便宜。"'] };
        },
      },
      {
        id: 'tamer_story',
        topic: '聊灵兽',
        text: '"灵兽是修士最好的伙伴。"驯兽师温柔地抚摸着灵狐："它们不仅能陪伴你，还能在战斗中帮助你。我从小就喜欢灵兽，所以做起了驯兽师。"',
      },
      {
        id: 'tamer_advice',
        topic: '请教驯兽技巧',
        text: '"驯兽嘛，最重要的是耐心和爱心。"驯兽师说："灵兽虽然有灵性，但也需要时间来培养感情。你对它好，它自然会对你忠诚。"',
      },
    ],
  },
  {
    id: 'fortune_teller',
    name: '算命先生',
    title: '卜卦师',
    description: '一个穿着破旧道袍的老者，坐在街边，面前摆着一个卦摊。手里拿着一根竹签，正在闭目推算。',
    greeting: '算命先生睁开眼睛，看了你一眼："这位道友，你眉宇间有一股煞气，近日必有血光之灾啊！"',
    environments: ['街道', '广场', '市集', '路口'],
    dialogues: [
      {
        id: 'fortune_divine',
        topic: '求卜',
        text: '算命先生让你抽了一根签，看了看："此签为凶中带吉。道友虽然会遇到危险，但也会有贵人相助。记住，遇事不要慌张，冷静应对。"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 5) {
            p.gold -= 5;
            return { messages: ['你花了 5 枚原始币求了一卦。算命先生的话让你若有所思。'] };
          }
          return { messages: ['算命先生摇摇头："没钱？那就别算了。"'] };
        },
      },
      {
        id: 'fortune_secret',
        topic: '打听秘密',
        text: '算命先生压低声音："我告诉你一个秘密……百断山深处有一座古墓，里面可能有太古传承。不过，那地方邪门得很……"',
      },
      {
        id: 'fortune_advice',
        topic: '请教人生哲理',
        text: '"人生如棋，一步错步步错。"算命先生说："修炼亦是如此，选择很重要。有时候，退一步海阔天空。"',
      },
    ],
  },
  {
    id: 'beastmaster',
    name: '兽王',
    title: '蛮族勇士',
    description: '一个身材高大的蛮族男子，穿着兽皮制成的铠甲，身边跟着一头巨狼。面容粗犷，眼神锐利。',
    greeting: '兽王正在训练巨狼，看到你来了，大声喊道："外族之人！来我领地有何贵干？"',
    environments: ['草原', '荒野', '蛮族领地', '后山'],
    dialogues: [
      {
        id: 'beastmaster_fight',
        topic: '切磋武艺',
        text: '"来，让我看看你的实力！"兽王摆开架势："蛮族的勇士从不畏惧挑战！"',
        onSelect: () => {
          const win = Math.random() > 0.5;
          return { messages: win ? ['你击败了兽王！他敬佩地说："你是一个真正的勇士！"'] : ['兽王轻松击败了你。他笑着说："继续努力！"'] };
        },
      },
      {
        id: 'beastmaster_trade',
        topic: '以物易物',
        text: '"蛮族不使用货币，以物易物。"兽王说："你有什么东西？草药、矿石都可以换我们的兽肉和兽皮。"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 10) {
            p.gold -= 10;
            return { messages: ['你用一些草药换了蛮族的兽肉。兽肉很新鲜，蕴含着浓郁的生命力。'] };
          }
          return { messages: ['兽王摇摇头："你没有东西可换。"'] };
        },
      },
      {
        id: 'beastmaster_story',
        topic: '聊蛮族',
        text: '"蛮族在这片蛮荒之地生存了数千年。"兽王自豪地说："我们靠狩猎为生，靠战斗变强。蛮族的勇士，从不畏惧任何挑战！"',
      },
    ],
  },
  {
    id: 'assassin',
    name: '暗影刺客',
    title: '杀手',
    description: '一个穿着黑色劲装的神秘人，面容隐藏在面具之后。身上散发着淡淡的杀气，让人不寒而栗。',
    greeting: '暗影刺客冷冷地看着你："你是谁？为什么来到这里？"',
    environments: ['暗影洞', '山洞', '废墟', '后山'],
    dialogues: [
      {
        id: 'assassin_hire',
        topic: '雇佣杀手',
        text: '"杀人？可以。"暗影刺客冷冷地说："价格根据目标的实力而定。普通修士一百枚，强者一千枚。"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 100) {
            p.gold -= 100;
            return { messages: ['你花了 100 枚原始币雇佣了暗影刺客。他消失在黑暗中，留下一句："三天后给你消息。"'] };
          }
          return { messages: ['暗影刺客摇摇头："没钱？那就别谈了。"'] };
        },
      },
      {
        id: 'assassin_secret',
        topic: '打听秘密',
        text: '暗影刺客压低声音："我知道很多秘密。比如……石城那个守夜人，最近经常半夜去祭坛，不知道在搞什么鬼。"',
      },
      {
        id: 'assassin_warning',
        topic: '警告',
        text: '"小心点，年轻人。"暗影刺客说："这片山林里不止有凶兽，还有其他危险。有些人，比凶兽更可怕。"',
      },
    ],
  },
  {
    id: 'treasure_hunter',
    name: '寻宝者',
    title: '探险者',
    description: '一个背着行囊的探险者，身上布满伤痕，看起来刚从危险的地方回来。眼神兴奋，似乎发现了什么宝贝。',
    greeting: '寻宝者看到你，兴奋地说："你也是来寻宝的？太好了！我刚发现了一条线索，据说指向一处上古遗迹！"',
    environments: ['百断山', '山洞', '废墟', '秘境'],
    dialogues: [
      {
        id: 'treasure_guide',
        topic: '寻求向导',
        text: '"我可以带你去那处遗迹，但你要分我一半的收获。"寻宝者说："那地方很危险，有很多机关和陷阱。"',
        condition: (p: IPlayer) => p.realm >= 3,
      },
      {
        id: 'treasure_story',
        topic: '听他讲探险故事',
        text: '"我曾经在百断山深处发现了一座古墓。"寻宝者兴奋地说："里面有很多珍宝，但也有很多危险。我差点就出不来了……"',
      },
      {
        id: 'treasure_warning',
        topic: '请教探险技巧',
        text: '"探险嘛，最重要的是小心和谨慎。"寻宝者说："不要贪心，见好就收。否则，你可能会把命留在里面。"',
      },
    ],
  },
  {
    id: 'healer',
    name: '医者',
    title: '济世医者',
    description: '一个穿着白色长袍的老者，面容和蔼，手里拿着药箱。正在为一个受伤的修士治疗。',
    greeting: '医者正在忙碌，看到你来了，微笑着说："道友受伤了吗？让我看看。"',
    environments: ['医馆', '广场', '市集', '驿站'],
    dialogues: [
      {
        id: 'healer_treat',
        topic: '治疗伤势',
        text: '医者仔细检查了你的伤势，拿出药膏涂抹："放心，这点小伤不算什么。二十枚原始币。"',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 20) {
            p.gold -= 20;
            return { messages: ['你花了 20 枚原始币治疗伤势。医者的药膏效果很好，你的气血恢复了一些。'] };
          }
          return { messages: ['医者摇摇头："没钱？那就先忍着吧。"'] };
        },
      },
      {
        id: 'healer_advice',
        topic: '请教医术',
        text: '"医术是救人的学问。"医者感慨地说："我年轻时曾游历四方，学到了不少医术。现在回到家乡，为乡亲们看病。"',
      },
      {
        id: 'healer_secret',
        topic: '打听秘方',
        text: '医者压低声音："我这里有一种祖传的疗伤圣药，效果奇佳。但是材料太难找了……如果你能帮我找到千年人参，我可以送你一瓶。"',
        condition: (p: IPlayer) => p.realm >= 3,
      },
    ],
  },
  {
    id: 'musician',
    name: '琴师',
    title: '乐师',
    description: '一个穿着白衣的女子，怀抱古琴，面容清丽。正在弹奏一首悠扬的曲子，琴声如流水般动人。',
    greeting: '琴师停下弹奏，微微一笑："道友好，想听什么曲子？"',
    environments: ['酒楼', '茶馆', '广场', '花园'],
    dialogues: [
      {
        id: 'musician_listen',
        topic: '听一曲',
        text: '琴师拨动琴弦，婉转的琴声响起。一曲终了，余音绕梁。',
        onSelect: (p: IPlayer) => {
          if (p.gold >= 30) {
            p.gold -= 30;
            return { messages: ['你花了 30 枚原始币听了一曲。琴师的琴声婉转动人，让你忘却了一切烦恼。'] };
          }
          return { messages: ['琴师轻声道："没钱听不了。"'] };
        },
      },
      {
        id: 'musician_story',
        topic: '问她的故事',
        text: '琴师叹了口气："我本是书香门第的女儿，家道中落后，被迫来到这里卖艺。在这里弹琴，只为了……活下去。"',
      },
      {
        id: 'musician_help',
        topic: '帮她赎身',
        text: '琴师眼睛一亮："赎身？需要五百枚原始币……"她低下头："我知道这很难，但……如果你愿意帮我，我……我愿意做牛做马报答你。"',
        condition: (p: IPlayer) => p.gold >= 500,
        onSelect: (p: IPlayer) => {
          p.gold -= 500;
          return { messages: ['你帮琴师赎了身。她感激涕零："多谢道友！我……我不知该如何报答你。"'] };
        },
      },
    ],
  },
];

export function generateDynamicNPCs(roomDescription: string, roomId: string): INPC[] {
  const npcs: INPC[] = [];
  const usedTemplates = new Set<string>();
  
  const busyKeywords = ['集市', '广场', '街道', '商路', '码头', '驿站', '城', '镇', '坊', '巷'];
  const isBusyArea = busyKeywords.some(kw => roomDescription.includes(kw));
  const baseCount = isBusyArea ? 8 : 3;
  const maxCount = isBusyArea ? 15 : 8;
  
  for (const template of dynamicNPCTemplates) {
    for (const env of template.environments) {
      if (roomDescription.includes(env) && !usedTemplates.has(template.id)) {
        const npcType = NPCLifeLogicGenerator.detectNPCType(template.title);
        const lifeLogic = NPCLifeLogicGenerator.generateForType(npcType, roomId);
        const npc: INPC = {
          id: `dynamic_${template.id}_${roomId}_${Date.now()}_${npcs.length}`,
          name: template.name,
          title: template.title,
          description: template.description,
          greeting: template.greeting,
          dialogues: [...template.dialogues],
          roomId: roomId,
          lifeLogic,
        };
        npcs.push(npc);
        usedTemplates.add(template.id);
        
        if (isBusyArea) {
          const extraCount = Math.floor(Math.random() * 3);
          for (let i = 0; i < extraCount && npcs.length < maxCount; i++) {
            npcs.push({
              ...npc,
              id: `dynamic_${template.id}_${roomId}_${Date.now()}_${npcs.length}_extra`,
            });
          }
        }
        break;
      }
    }
  }
  
  if (npcs.length < baseCount) {
    const availableTemplates = dynamicNPCTemplates.filter(t => !usedTemplates.has(t.id));
    while (npcs.length < baseCount && availableTemplates.length > 0) {
      const randomTemplate = availableTemplates.splice(Math.floor(Math.random() * availableTemplates.length), 1)[0];
      const npcType = NPCLifeLogicGenerator.detectNPCType(randomTemplate.title);
      const lifeLogic = NPCLifeLogicGenerator.generateForType(npcType, roomId);
      npcs.push({
        id: `dynamic_${randomTemplate.id}_${roomId}_${Date.now()}_filler`,
        name: randomTemplate.name,
        title: randomTemplate.title,
        description: randomTemplate.description,
        greeting: randomTemplate.greeting,
        dialogues: [...randomTemplate.dialogues],
        roomId: roomId,
        lifeLogic,
      });
    }
  }
  
  return npcs;
}

export function getDynamicNPCTemplates(): IDynamicNPCTemplate[] {
  return dynamicNPCTemplates;
}
