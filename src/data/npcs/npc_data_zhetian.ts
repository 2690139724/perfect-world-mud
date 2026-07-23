import { INPC } from '../../domain/entities/NPC';
import { IPlayer } from '../../domain/entities/Player';

export const ZHETIAN_NPCS: INPC[] = [
  {
    id: 'ye_fan',
    name: '叶凡',
    title: '天帝',
    description: '荒古禁地走出的少年，最终成为天帝，镇压黑暗动乱，守护九天十地。',
    greeting: '叶凡负手而立，目光深邃地看着远方："又有人踏上了这条路……"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: 'yefan_intro',
        topic: '自我介绍',
        text: '叶凡微微一笑："我从荒古禁地走来，只为寻找一条成仙之路。"',
      },
      {
        id: 'yefan_immortal',
        topic: '问成仙之路',
        text: '"仙路尽头谁为峰，一见无始道成空。"叶凡感慨道："成仙之路，难如登天。但我相信，只要坚持不懈，总有一天能够成功。"',
      },
      {
        id: 'yefan_fight',
        topic: '切磋武艺',
        text: '"若天压我，劈开那天！若地拘我，踏碎那地！"叶凡摆开架势："让我看看你的实力！"',
        onSelect: () => {
          const win = Math.random() > 0.8;
          return { messages: win ? ['你击败了叶凡！他惊讶地说："没想到你的实力这么强！"'] : ['叶凡轻松击败了你。他笑着说："继续努力！"'] };
        },
        condition: (p: IPlayer) => p.realm >= 8,
      },
      {
        id: 'yefan_story',
        topic: '聊他的故事',
        text: '"我曾经只是一个平凡的少年，从荒古禁地走出，历经无数磨难，才走到今天这一步。"叶凡陷入回忆："这条路，充满了鲜血和泪水。"',
      },
      {
        id: 'yefan_quest',
        topic: '请求任务',
        text: '"如果你想历练，可以去寻找仙路的线索。"叶凡说："仙路就在前方，但危险重重。"',
        condition: (p: IPlayer) => p.realm >= 6,
      },
    ],
  },
  {
    id: 'wu_shi',
    name: '无始大帝',
    title: '无始',
    description: '史上最强大帝之一，以"仙路尽头谁为峰，一见无始道成空"闻名于世。',
    greeting: '无始大帝端坐于虚空之中，周身缭绕着无尽的帝道法则："你来了……"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: 'wushi_intro',
        topic: '自我介绍',
        text: '"我为无始，可镇一切！"无始大帝声音平淡，却蕴含着无尽的威严。',
      },
      {
        id: 'wushi_reputation',
        topic: '问他的威名',
        text: '"仙路尽头谁为峰，一见无始道成空。"无始大帝淡淡道："这不过是世人的赞誉罢了。"',
      },
      {
        id: 'wushi_fight',
        topic: '切磋武艺',
        text: '"天地为局，众生为棋，我执棋子，笑看风云。"无始大帝站起身来："让我看看你的实力！"',
        onSelect: () => {
          const win = Math.random() > 0.9;
          return { messages: win ? ['你击败了无始大帝！他惊讶地说："没想到你的实力这么强！"'] : ['无始大帝轻松击败了你。他说："继续努力！"'] };
        },
        condition: (p: IPlayer) => p.realm >= 9,
      },
      {
        id: 'wushi_story',
        topic: '聊他的故事',
        text: '"我一生都在追寻成仙之路。"无始大帝缓缓说道："但成仙之路太过艰难，我至今未能成功。"',
      },
      {
        id: 'wushi_quest',
        topic: '请求任务',
        text: '"如果你想获得我的传承，可以去寻找无始钟的碎片。"无始大帝说："那是我的本命帝兵，蕴含着我的毕生所学。"',
        condition: (p: IPlayer) => p.realm >= 7,
      },
    ],
  },
  {
    id: 'hen_ren',
    name: '狠人大帝',
    title: '狠人',
    description: '史上最惊艳的女子，为寻哥哥修炼成仙，留下无尽传说。',
    greeting: '狠人大帝一袭白衣，面容绝美，眼神中带着一丝忧伤："你来了……"',
    roomId: 'stone_kingdom_harem',
    dialogues: [
      {
        id: 'henren_intro',
        topic: '自我介绍',
        text: '"我狠故我在！"狠人大帝声音冰冷，却带着一丝柔情。',
      },
      {
        id: 'henren_love',
        topic: '问她的执念',
        text: '"不为成仙，只为在那红尘中等你归来。"狠人大帝眼中闪过一丝泪光："我等了他无数岁月，却始终没有等到。"',
      },
      {
        id: 'henren_fight',
        topic: '切磋武艺',
        text: '"谁敢伤我哥哥，我便屠他满门！"狠人大帝周身缭绕着无尽的杀气："让我看看你的实力！"',
        onSelect: () => {
          const win = Math.random() > 0.85;
          return { messages: win ? ['你击败了狠人大帝！她惊讶地说："没想到你的实力这么强！"'] : ['狠人大帝轻松击败了你。她说："继续努力！"'] };
        },
        condition: (p: IPlayer) => p.realm >= 8,
      },
      {
        id: 'henren_story',
        topic: '聊她的故事',
        text: '"我曾经只是一个平凡的女子，为了寻找失散的哥哥，踏上了修炼之路。"狠人大帝陷入回忆："这条路，充满了孤独和痛苦。"',
      },
      {
        id: 'henren_quest',
        topic: '请求任务',
        text: '"如果你想帮助我，可以去寻找我哥哥的转世。"狠人大帝说："他的灵魂碎片散落在世间，等待着有缘人去收集。"',
        condition: (p: IPlayer) => p.realm >= 6,
      },
    ],
  },
  {
    id: 'donghuang',
    name: '东荒圣女',
    title: '圣女',
    description: '东荒圣地的圣女，美丽动人，修为高深。',
    greeting: '东荒圣女微微一笑，如春风拂面："公子远道而来，辛苦了。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: 'donghuang_intro',
        topic: '自我介绍',
        text: '"东荒圣地欢迎各位道友。"东荒圣女温柔地说："我是东荒圣地的圣女。"',
      },
      {
        id: 'donghuang_advice',
        topic: '请教修炼',
        text: '"修行之路漫漫，还请珍重。"东荒圣女语重心长地说："修炼不仅是提升实力，更是磨练心性。"',
      },
      {
        id: 'donghuang_quest',
        topic: '请求任务',
        text: '"东荒圣地最近遇到了一些麻烦。"东荒圣女说："如果你能帮助我们解决，圣地必有重谢。"',
        condition: (p: IPlayer) => p.realm >= 4,
      },
      {
        id: 'donghuang_story',
        topic: '聊圣地',
        text: '"东荒圣地已有千年历史。"东荒圣女自豪地说："我们圣地培养了无数优秀的修士。"',
      },
    ],
  },
  {
    id: 'jiu_dian',
    name: '龙九子',
    title: '九变',
    description: '龙族九子之一，实力强大，忠于龙族。',
    greeting: '龙九子化作人形，身披龙鳞铠甲，目光锐利："我乃龙族九子，谁敢造次！"',
    roomId: 'stone_kingdom_west_market',
    dialogues: [
      {
        id: 'jiudian_intro',
        topic: '自我介绍',
        text: '"我乃龙族九子，九变！"龙九子声音洪亮："龙族威严，不容侵犯！"',
      },
      {
        id: 'jiudian_fight',
        topic: '切磋武艺',
        text: '"有我在，谁也别想伤害龙主！"龙九子摆开架势："让我看看你的实力！"',
        onSelect: () => {
          const win = Math.random() > 0.6;
          return { messages: win ? ['你击败了龙九子！他敬佩地说："你是一个真正的强者！"'] : ['龙九子轻松击败了你。他说："继续努力！"'] };
        },
        condition: (p: IPlayer) => p.realm >= 5,
      },
      {
        id: 'jiudian_quest',
        topic: '请求任务',
        text: '"龙族最近遇到了一些麻烦。"龙九子说："如果你能帮助我们解决，龙族必有重谢。"',
        condition: (p: IPlayer) => p.realm >= 4,
      },
      {
        id: 'jiudian_story',
        topic: '聊龙族',
        text: '"龙族是这片天地最古老的种族之一。"龙九子自豪地说："我们龙族，曾经统治过这片天地！"',
      },
    ],
  },
  {
    id: 'ji_haoyue',
    name: '姬皓月',
    title: '姬家神王体',
    description: '姬家年轻一代第一人，身负神王体，海上升明月异象举世无双。他英姿勃发，眸若冷电，一生追求大道，曾与叶凡多次交锋亦惺惺相惜。',
    greeting: '姬皓月负手而立，身后一轮明月缓缓升起："来者何人？"',
    roomId: 'beidou_star_field',
    dialogues: [
      {
        id: 'ji_haoyue_dlg_0',
        topic: '自我介绍',
        text: '"我乃姬皓月，姬家神王体。"他淡淡道："姬家传承自虚空大帝，岂是寻常势力可比。"',
      },
      {
        id: 'ji_haoyue_dlg_1',
        topic: '问虚空大帝',
        text: '"虚空大帝，一生不弱于人！"他眼中闪过崇敬之色："我姬家先祖以空间证道，镇压黑暗动乱，留下无尽传说。"',
      },
      {
        id: 'ji_haoyue_dlg_2',
        topic: '谈修炼心得',
        text: '"虚空古经玄奥莫测，重在感悟空间之妙。"他沉吟道："修炼之路漫漫，唯有心如虚空，方能包容万物。"',
      },
      {
        id: 'ji_haoyue_dlg_3',
        topic: '聊当今天下',
        text: '"如今大世降临，各族天骄并起。"他目光望向远方："姬家当在此世再铸辉煌，不负先祖之名。"',
      },
      {
        id: 'ji_haoyue_dlg_4',
        topic: '请求指点',
        text: '"若你想学虚空之术，需先明悟空间真意。"他伸手指向远方："去吧，从最基本的虚空符文开始。"',
      },
    ],
  },
  {
    id: 'ji_ziyue',
    name: '姬紫月',
    title: '姬家明珠',
    description: '姬家嫡女，活泼灵动，拥有元灵体，可与天地本源共鸣。她笑容甜美，却心思聪慧，在险恶的修炼界中始终保持一颗赤子之心。',
    greeting: '姬紫月眨着明亮的大眼睛，好奇地打量着你："你好呀，是从哪里来的？"',
    roomId: 'huanggu_forbidden',
    dialogues: [
      {
        id: 'ji_ziyue_dlg_0',
        topic: '自我介绍',
        text: '"我乃姬紫月，姬家明珠。"他淡淡道："姬家传承自虚空大帝，岂是寻常势力可比。"',
      },
      {
        id: 'ji_ziyue_dlg_1',
        topic: '问虚空大帝',
        text: '"虚空大帝，一生不弱于人！"他眼中闪过崇敬之色："我姬家先祖以空间证道，镇压黑暗动乱，留下无尽传说。"',
      },
      {
        id: 'ji_ziyue_dlg_2',
        topic: '谈修炼心得',
        text: '"虚空古经玄奥莫测，重在感悟空间之妙。"他沉吟道："修炼之路漫漫，唯有心如虚空，方能包容万物。"',
      },
      {
        id: 'ji_ziyue_dlg_3',
        topic: '聊当今天下',
        text: '"如今大世降临，各族天骄并起。"他目光望向远方："姬家当在此世再铸辉煌，不负先祖之名。"',
      },
      {
        id: 'ji_ziyue_dlg_4',
        topic: '请求指点',
        text: '"若你想学虚空之术，需先明悟空间真意。"他伸手指向远方："去吧，从最基本的虚空符文开始。"',
      },
    ],
  },
  {
    id: 'ji_shengzhu',
    name: '姬家圣主',
    title: '荒古圣主',
    description: '姬家当代圣主，威严深沉，执掌虚空大帝传承。他坐镇江湖数千年，一身虚空妙法鬼神莫测，是东荒最有权势的人物之一。',
    greeting: '姬家圣主眸光深邃，仿佛可洞穿虚空："小友，来我姬家有何贵干？"',
    roomId: 'yuhua_school',
    dialogues: [
      {
        id: 'ji_shengzhu_dlg_0',
        topic: '自我介绍',
        text: '"我乃姬家圣主，荒古圣主。"他傲然道："姬家传承自虚空大帝，岂是寻常势力可比。"',
      },
      {
        id: 'ji_shengzhu_dlg_1',
        topic: '问虚空大帝',
        text: '"虚空大帝，一生不弱于人！"他眼中闪过崇敬之色："我姬家先祖以空间证道，镇压黑暗动乱，留下无尽传说。"',
      },
      {
        id: 'ji_shengzhu_dlg_2',
        topic: '谈修炼心得',
        text: '"虚空古经玄奥莫测，重在感悟空间之妙。"他沉吟道："修炼之路漫漫，唯有心如虚空，方能包容万物。"',
      },
      {
        id: 'ji_shengzhu_dlg_3',
        topic: '聊当今天下',
        text: '"如今大世降临，各族天骄并起。"他目光望向远方："姬家当在此世再铸辉煌，不负先祖之名。"',
      },
      {
        id: 'ji_shengzhu_dlg_4',
        topic: '请求指点',
        text: '"若你想学虚空之术，需先明悟空间真意。"他伸手指向远方："去吧，从最基本的虚空符文开始。"',
      },
    ],
  },
  {
    id: 'ji_laozu',
    name: '姬家老祖',
    title: '活化石',
    description: '姬家最古老的活化石之一，已从世间消失上万年，沉睡在神源之中。他见证了虚空大帝的辉煌，承载着荒古世家最久远的记忆。',
    greeting: '苍老的声音从神源中传出，带着万古的沧桑："又一个大世来临了吗……"',
    roomId: 'beidou_city_gate',
    dialogues: [
      {
        id: 'ji_laozu_dlg_0',
        topic: '自我介绍',
        text: '"我乃姬家老祖，活化石。"他傲然道："姬家传承自虚空大帝，岂是寻常势力可比。"',
      },
      {
        id: 'ji_laozu_dlg_1',
        topic: '问虚空大帝',
        text: '"虚空大帝，一生不弱于人！"他眼中闪过崇敬之色："我姬家先祖以空间证道，镇压黑暗动乱，留下无尽传说。"',
      },
      {
        id: 'ji_laozu_dlg_2',
        topic: '谈修炼心得',
        text: '"虚空古经玄奥莫测，重在感悟空间之妙。"他沉吟道："修炼之路漫漫，唯有心如虚空，方能包容万物。"',
      },
      {
        id: 'ji_laozu_dlg_3',
        topic: '聊当今天下',
        text: '"如今大世降临，各族天骄并起。"他目光望向远方："姬家当在此世再铸辉煌，不负先祖之名。"',
      },
      {
        id: 'ji_laozu_dlg_4',
        topic: '请求指点',
        text: '"若你想学虚空之术，需先明悟空间真意。"他从神源中传出一声叹息："去吧，从最基本的虚空符文开始。"',
      },
    ],
  },
  {
    id: 'ji_yanzhi',
    name: '姬言志',
    title: '姬家大能',
    description: '姬家太上长老，修为深不可测，精通虚空古经中的杀伐之术。他性格刚烈，为维护姬家荣耀不惜一战，在族中威望极高。',
    greeting: '姬言志目光如炬，周身虚空微微扭曲："姬家重地，闲人止步。"',
    roomId: 'beidou_city_main_street',
    dialogues: [
      {
        id: 'ji_yanzhi_dlg_0',
        topic: '自我介绍',
        text: '"我乃姬言志，姬家大能。"他傲然道："姬家传承自虚空大帝，岂是寻常势力可比。"',
      },
      {
        id: 'ji_yanzhi_dlg_1',
        topic: '问虚空大帝',
        text: '"虚空大帝，一生不弱于人！"他眼中闪过崇敬之色："我姬家先祖以空间证道，镇压黑暗动乱，留下无尽传说。"',
      },
      {
        id: 'ji_yanzhi_dlg_2',
        topic: '谈修炼心得',
        text: '"虚空古经玄奥莫测，重在感悟空间之妙。"他沉吟道："修炼之路漫漫，唯有心如虚空，方能包容万物。"',
      },
      {
        id: 'ji_yanzhi_dlg_3',
        topic: '聊当今天下',
        text: '"如今大世降临，各族天骄并起。"他目光望向远方："姬家当在此世再铸辉煌，不负先祖之名。"',
      },
      {
        id: 'ji_yanzhi_dlg_4',
        topic: '请求指点',
        text: '"若你想学虚空之术，需先明悟空间真意。"他伸手指向远方："去吧，从最基本的虚空符文开始。"',
      },
    ],
  },
  {
    id: 'ji_hui',
    name: '姬惠',
    title: '姬家长老',
    description: '姬家女性长老，心思缜密，掌管家族内务。她看似和蔼可亲，实则手段凌厉，将姬家上下打理得井井有条。',
    greeting: '姬惠端坐在玉座上，淡淡一笑："年轻人，来我姬家所为何事？"',
    roomId: 'beidou_city_east_market',
    dialogues: [
      {
        id: 'ji_hui_dlg_0',
        topic: '自我介绍',
        text: '"我乃姬惠，姬家长老。"他傲然道："姬家传承自虚空大帝，岂是寻常势力可比。"',
      },
      {
        id: 'ji_hui_dlg_1',
        topic: '问虚空大帝',
        text: '"虚空大帝，一生不弱于人！"他眼中闪过崇敬之色："我姬家先祖以空间证道，镇压黑暗动乱，留下无尽传说。"',
      },
      {
        id: 'ji_hui_dlg_2',
        topic: '谈修炼心得',
        text: '"虚空古经玄奥莫测，重在感悟空间之妙。"他沉吟道："修炼之路漫漫，唯有心如虚空，方能包容万物。"',
      },
      {
        id: 'ji_hui_dlg_3',
        topic: '聊当今天下',
        text: '"如今大世降临，各族天骄并起。"他目光望向远方："姬家当在此世再铸辉煌，不负先祖之名。"',
      },
      {
        id: 'ji_hui_dlg_4',
        topic: '请求指点',
        text: '"若你想学虚空之术，需先明悟空间真意。"他伸手指向远方："去吧，从最基本的虚空符文开始。"',
      },
    ],
  },
  {
    id: 'ji_ren',
    name: '姬仁',
    title: '姬家护道者',
    description: '姬家年轻一代的护道者，沉默寡言，实力惊人。他常年隐匿在暗中，保护姬家子弟的安全，是影子中的守护者。',
    greeting: '一道黑影从虚空中浮现，低沉的声音响起："跟我来。"',
    roomId: 'beidou_city_west_market',
    dialogues: [
      {
        id: 'ji_ren_dlg_0',
        topic: '自我介绍',
        text: '"我乃姬仁，姬家护道者。"他傲然道："姬家传承自虚空大帝，岂是寻常势力可比。"',
      },
      {
        id: 'ji_ren_dlg_1',
        topic: '问虚空大帝',
        text: '"虚空大帝，一生不弱于人！"他眼中闪过崇敬之色："我姬家先祖以空间证道，镇压黑暗动乱，留下无尽传说。"',
      },
      {
        id: 'ji_ren_dlg_2',
        topic: '谈修炼心得',
        text: '"虚空古经玄奥莫测，重在感悟空间之妙。"他沉吟道："修炼之路漫漫，唯有心如虚空，方能包容万物。"',
      },
      {
        id: 'ji_ren_dlg_3',
        topic: '聊当今天下',
        text: '"如今大世降临，各族天骄并起。"他目光望向远方："姬家当在此世再铸辉煌，不负先祖之名。"',
      },
      {
        id: 'ji_ren_dlg_4',
        topic: '请求指点',
        text: '"若你想学虚空之术，需先明悟空间真意。"他伸手指向远方："去吧，从最基本的虚空符文开始。"',
      },
    ],
  },
  {
    id: 'ji_shuiyue',
    name: '姬水月',
    title: '姬家女修',
    description: '姬家旁系天才，性情清冷如水，专修寒冰道法。她在姬家年轻一代中实力不俗，一心追寻大道，不问世事。',
    greeting: '姬水月眸如寒潭，轻轻点头："道友，请说明来意。"',
    roomId: 'beidou_imperial_city',
    dialogues: [
      {
        id: 'ji_shuiyue_dlg_0',
        topic: '自我介绍',
        text: '"我乃姬水月，姬家女修。"他淡淡道："姬家传承自虚空大帝，岂是寻常势力可比。"',
      },
      {
        id: 'ji_shuiyue_dlg_1',
        topic: '问虚空大帝',
        text: '"虚空大帝，一生不弱于人！"他眼中闪过崇敬之色："我姬家先祖以空间证道，镇压黑暗动乱，留下无尽传说。"',
      },
      {
        id: 'ji_shuiyue_dlg_2',
        topic: '谈修炼心得',
        text: '"虚空古经玄奥莫测，重在感悟空间之妙。"他沉吟道："修炼之路漫漫，唯有心如虚空，方能包容万物。"',
      },
      {
        id: 'ji_shuiyue_dlg_3',
        topic: '聊当今天下',
        text: '"如今大世降临，各族天骄并起。"他目光望向远方："姬家当在此世再铸辉煌，不负先祖之名。"',
      },
      {
        id: 'ji_shuiyue_dlg_4',
        topic: '请求指点',
        text: '"若你想学虚空之术，需先明悟空间真意。"他伸手指向远方："去吧，从最基本的虚空符文开始。"',
      },
    ],
  },
  {
    id: 'ji_changkong',
    name: '姬长空',
    title: '虚空传人',
    description: '姬家嫡系传人，天生与虚空大道亲和，可穿梭空间如履平地。他志向远大，立志重现虚空大帝的无上荣光。',
    greeting: '姬长空从虚空中迈步而出，微笑道："有朋自远方来，不亦乐乎。"',
    roomId: 'beidou_imperial_palace',
    dialogues: [
      {
        id: 'ji_changkong_dlg_0',
        topic: '自我介绍',
        text: '"我乃姬长空，虚空传人。"他傲然道："姬家传承自虚空大帝，岂是寻常势力可比。"',
      },
      {
        id: 'ji_changkong_dlg_1',
        topic: '问虚空大帝',
        text: '"虚空大帝，一生不弱于人！"他眼中闪过崇敬之色："我姬家先祖以空间证道，镇压黑暗动乱，留下无尽传说。"',
      },
      {
        id: 'ji_changkong_dlg_2',
        topic: '谈修炼心得',
        text: '"虚空古经玄奥莫测，重在感悟空间之妙。"他沉吟道："修炼之路漫漫，唯有心如虚空，方能包容万物。"',
      },
      {
        id: 'ji_changkong_dlg_3',
        topic: '聊当今天下',
        text: '"如今大世降临，各族天骄并起。"他目光望向远方："姬家当在此世再铸辉煌，不负先祖之名。"',
      },
      {
        id: 'ji_changkong_dlg_4',
        topic: '请求指点',
        text: '"若你想学虚空之术，需先明悟空间真意。"他伸手指向远方："去吧，从最基本的虚空符文开始。"',
      },
    ],
  },
  {
    id: 'ji_wuming',
    name: '姬无名',
    title: '姬家暗卫',
    description: '姬家最神秘的暗卫统领，无人知其真名。他从小被培养为杀戮机器，却在家族危难之际展现出惊人的忠诚与牺牲精神。',
    greeting: '黑暗中传来冰冷的声音："报上名来，否则格杀勿论。"',
    roomId: 'beidou_sky_pavilion',
    dialogues: [
      {
        id: 'ji_wuming_dlg_0',
        topic: '自我介绍',
        text: '"我乃姬无名，姬家暗卫。"他傲然道："姬家传承自虚空大帝，岂是寻常势力可比。"',
      },
      {
        id: 'ji_wuming_dlg_1',
        topic: '问虚空大帝',
        text: '"虚空大帝，一生不弱于人！"他眼中闪过崇敬之色："我姬家先祖以空间证道，镇压黑暗动乱，留下无尽传说。"',
      },
      {
        id: 'ji_wuming_dlg_2',
        topic: '谈修炼心得',
        text: '"虚空古经玄奥莫测，重在感悟空间之妙。"他沉吟道："修炼之路漫漫，唯有心如虚空，方能包容万物。"',
      },
      {
        id: 'ji_wuming_dlg_3',
        topic: '聊当今天下',
        text: '"如今大世降临，各族天骄并起。"他目光望向远方："姬家当在此世再铸辉煌，不负先祖之名。"',
      },
      {
        id: 'ji_wuming_dlg_4',
        topic: '请求指点',
        text: '"若你想学虚空之术，需先明悟空间真意。"他伸手指向远方："去吧，从最基本的虚空符文开始。"',
      },
    ],
  },
  {
    id: 'jiang_yifei',
    name: '姜逸飞',
    title: '姜家神王体',
    description: '姜家年轻一代的翘楚，丰神如玉，白衣胜雪。他气质温和，却实力惊人，一身神王体血脉在体内奔涌，是未来可期的天骄人物。',
    greeting: '姜逸飞微微一笑，如春风拂面："道友远道而来，姜某有失远迎。"',
    roomId: 'huanggu_core',
    dialogues: [
      {
        id: 'jiang_yifei_dlg_0',
        topic: '自我介绍',
        text: '"姜逸飞，姜家神王体。"他温和地介绍道："姜家传承自恒宇大帝，以火行道法闻名于世。"',
      },
      {
        id: 'jiang_yifei_dlg_1',
        topic: '问恒宇大帝',
        text: '"恒宇大帝，以离火神炉证道，镇压太古万族。"他眼中燃起崇敬之火："我姜家先祖的荣光，必将在此世重现。"',
      },
      {
        id: 'jiang_yifei_dlg_2',
        topic: '谈神王姜太虚',
        text: '"神王再生，举世皆惊。"他激动道："四千年前白衣神王横扫天下，四千年后他依旧无敌于世，是我姜家永远的骄傲。"',
      },
      {
        id: 'jiang_yifei_dlg_3',
        topic: '论当世局势',
        text: '"黑暗动乱将临，各方势力蠢蠢欲动。"他沉声道："姜家当与同道携手，共御大敌，守护这芸芸众生。"',
      },
      {
        id: 'jiang_yifei_dlg_4',
        topic: '请求传承',
        text: '"姜家传承非轻易可授。"他沉吟片刻："若你有大毅力、大机缘，可去试炼之地证明自己。"',
      },
    ],
  },
  {
    id: 'jiang_caixuan',
    name: '姜采萱',
    title: '姜家圣女',
    description: '姜家圣女，清丽脱俗，气质如兰。她不仅容貌绝美，更精通姜家传承的恒宇大道，是东荒无数青年修士心中的仙子。',
    greeting: '姜采萱盈盈一礼，声音清越："见过道友，愿君道途顺遂。"',
    roomId: 'huanggu_tomb',
    dialogues: [
      {
        id: 'jiang_caixuan_dlg_0',
        topic: '自我介绍',
        text: '"姜采萱，姜家圣女。"他温和地介绍道："姜家传承自恒宇大帝，以火行道法闻名于世。"',
      },
      {
        id: 'jiang_caixuan_dlg_1',
        topic: '问恒宇大帝',
        text: '"恒宇大帝，以离火神炉证道，镇压太古万族。"他眼中燃起崇敬之火："我姜家先祖的荣光，必将在此世重现。"',
      },
      {
        id: 'jiang_caixuan_dlg_2',
        topic: '谈神王姜太虚',
        text: '"神王再生，举世皆惊。"他激动道："四千年前白衣神王横扫天下，四千年后他依旧无敌于世，是我姜家永远的骄傲。"',
      },
      {
        id: 'jiang_caixuan_dlg_3',
        topic: '论当世局势',
        text: '"黑暗动乱将临，各方势力蠢蠢欲动。"他沉声道："姜家当与同道携手，共御大敌，守护这芸芸众生。"',
      },
      {
        id: 'jiang_caixuan_dlg_4',
        topic: '请求传承',
        text: '"姜家传承非轻易可授。"他沉吟片刻："若你有大毅力、大机缘，可去试炼之地证明自己。"',
      },
    ],
  },
  {
    id: 'jiang_taixu',
    name: '姜太虚',
    title: '白衣神王',
    description: '姜家四千年前的人物，被誉为白衣神王。他在紫山中沉寂数千年，一出世便震动天下，以无敌之姿横扫诸敌，是遮天世界最传奇的人物之一。',
    greeting: '白衣神王姜太虚静立山巅，声音缥缈："四千年了，这世间可还有人记得我？"',
    roomId: 'huanggu_lake',
    dialogues: [
      {
        id: 'jiang_taixu_dlg_0',
        topic: '自我介绍',
        text: '"姜太虚，白衣神王。"他温和地介绍道："姜家传承自恒宇大帝，以火行道法闻名于世。"',
      },
      {
        id: 'jiang_taixu_dlg_1',
        topic: '问恒宇大帝',
        text: '"恒宇大帝，以离火神炉证道，镇压太古万族。"他眼中燃起崇敬之火："我姜家先祖的荣光，必将在此世重现。"',
      },
      {
        id: 'jiang_taixu_dlg_2',
        topic: '谈神王姜太虚',
        text: '"神王再生，举世皆惊。"他激动道："四千年前白衣神王横扫天下，四千年后他依旧无敌于世，是我姜家永远的骄傲。"',
      },
      {
        id: 'jiang_taixu_dlg_3',
        topic: '论当世局势',
        text: '"黑暗动乱将临，各方势力蠢蠢欲动。"他沉声道："姜家当与同道携手，共御大敌，守护这芸芸众生。"',
      },
      {
        id: 'jiang_taixu_dlg_4',
        topic: '请求传承',
        text: '"姜家传承非轻易可授。"他微微摇头："若你有大毅力、大机缘，可去试炼之地证明自己。"',
      },
    ],
  },
  {
    id: 'jiang_shengzhu',
    name: '姜家圣主',
    title: '恒宇传人',
    description: '姜家当代圣主，威严沉稳，执掌恒宇大帝的极道帝兵恒宇炉。他肩负着守护姜家、镇压黑暗动乱的重任，是东荒的定海神针。',
    greeting: '姜家圣主端坐大殿之上，目光深邃："小友，东荒风云变幻，你可做好准备？"',
    roomId: 'xianyu_gate',
    dialogues: [
      {
        id: 'jiang_shengzhu_dlg_0',
        topic: '自我介绍',
        text: '"姜家圣主，恒宇传人。"他温和地介绍道："姜家传承自恒宇大帝，以火行道法闻名于世。"',
      },
      {
        id: 'jiang_shengzhu_dlg_1',
        topic: '问恒宇大帝',
        text: '"恒宇大帝，以离火神炉证道，镇压太古万族。"他眼中燃起崇敬之火："我姜家先祖的荣光，必将在此世重现。"',
      },
      {
        id: 'jiang_shengzhu_dlg_2',
        topic: '谈神王姜太虚',
        text: '"神王再生，举世皆惊。"他激动道："四千年前白衣神王横扫天下，四千年后他依旧无敌于世，是我姜家永远的骄傲。"',
      },
      {
        id: 'jiang_shengzhu_dlg_3',
        topic: '论当世局势',
        text: '"黑暗动乱将临，各方势力蠢蠢欲动。"他沉声道："姜家当与同道携手，共御大敌，守护这芸芸众生。"',
      },
      {
        id: 'jiang_shengzhu_dlg_4',
        topic: '请求传承',
        text: '"姜家传承非轻易可授。"他沉吟片刻："若你有大毅力、大机缘，可去试炼之地证明自己。"',
      },
    ],
  },
  {
    id: 'jiang_yun',
    name: '姜云',
    title: '姜家大能',
    description: '姜家太上长老，性格豪爽，重情重义。他与白衣神王同辈，当年曾并肩作战，是姜家最值得信赖的守护者之一。',
    greeting: '姜云大笑一声，声若洪钟："哈哈哈，来的好！老夫正愁无人饮酒！"',
    roomId: 'xianyu_palace',
    dialogues: [
      {
        id: 'jiang_yun_dlg_0',
        topic: '自我介绍',
        text: '"姜云，姜家大能。"他温和地介绍道："姜家传承自恒宇大帝，以火行道法闻名于世。"',
      },
      {
        id: 'jiang_yun_dlg_1',
        topic: '问恒宇大帝',
        text: '"恒宇大帝，以离火神炉证道，镇压太古万族。"他眼中燃起崇敬之火："我姜家先祖的荣光，必将在此世重现。"',
      },
      {
        id: 'jiang_yun_dlg_2',
        topic: '谈神王姜太虚',
        text: '"神王再生，举世皆惊。"他激动道："四千年前白衣神王横扫天下，四千年后他依旧无敌于世，是我姜家永远的骄傲。"',
      },
      {
        id: 'jiang_yun_dlg_3',
        topic: '论当世局势',
        text: '"黑暗动乱将临，各方势力蠢蠢欲动。"他沉声道："姜家当与同道携手，共御大敌，守护这芸芸众生。"',
      },
      {
        id: 'jiang_yun_dlg_4',
        topic: '请求传承',
        text: '"姜家传承非轻易可授。"他沉吟片刻："若你有大毅力、大机缘，可去试炼之地证明自己。"',
      },
    ],
  },
  {
    id: 'jiang_ting',
    name: '姜婷',
    title: '姜家明珠',
    description: '姜家旁系出身的才女，虽非嫡系，却以惊人天赋获得家族重视。她聪慧机敏，善于交际，在姜家年轻一代中人脉极广。',
    greeting: '姜婷笑靥如花，热情地招呼："快来快来，我正说起你呢！"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: 'jiang_ting_dlg_0',
        topic: '自我介绍',
        text: '"姜婷，姜家明珠。"他温和地介绍道："姜家传承自恒宇大帝，以火行道法闻名于世。"',
      },
      {
        id: 'jiang_ting_dlg_1',
        topic: '问恒宇大帝',
        text: '"恒宇大帝，以离火神炉证道，镇压太古万族。"他眼中燃起崇敬之火："我姜家先祖的荣光，必将在此世重现。"',
      },
      {
        id: 'jiang_ting_dlg_2',
        topic: '谈神王姜太虚',
        text: '"神王再生，举世皆惊。"他激动道："四千年前白衣神王横扫天下，四千年后他依旧无敌于世，是我姜家永远的骄傲。"',
      },
      {
        id: 'jiang_ting_dlg_3',
        topic: '论当世局势',
        text: '"黑暗动乱将临，各方势力蠢蠢欲动。"他沉声道："姜家当与同道携手，共御大敌，守护这芸芸众生。"',
      },
      {
        id: 'jiang_ting_dlg_4',
        topic: '请求传承',
        text: '"姜家传承非轻易可授。"他沉吟片刻："若你有大毅力、大机缘，可去试炼之地证明自己。"',
      },
    ],
  },
  {
    id: 'jiang_zhan',
    name: '姜战',
    title: '姜家战神',
    description: '姜家以战闻名的长老，一生经历大小战斗无数，从未退缩。他浑身布满伤痕，每一道都是荣耀的印记，是姜家战意的化身。',
    greeting: '姜战浑身散发着凛冽战意，沉声道："想跟我打一场？随时奉陪！"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: 'jiang_zhan_dlg_0',
        topic: '自我介绍',
        text: '"姜战，姜家战神。"他傲然地介绍道："姜家传承自恒宇大帝，以火行道法闻名于世。"',
      },
      {
        id: 'jiang_zhan_dlg_1',
        topic: '问恒宇大帝',
        text: '"恒宇大帝，以离火神炉证道，镇压太古万族。"他眼中燃起崇敬之火："我姜家先祖的荣光，必将在此世重现。"',
      },
      {
        id: 'jiang_zhan_dlg_2',
        topic: '谈神王姜太虚',
        text: '"神王再生，举世皆惊。"他激动道："四千年前白衣神王横扫天下，四千年后他依旧无敌于世，是我姜家永远的骄傲。"',
      },
      {
        id: 'jiang_zhan_dlg_3',
        topic: '论当世局势',
        text: '"黑暗动乱将临，各方势力蠢蠢欲动。"他沉声道："姜家当与同道携手，共御大敌，守护这芸芸众生。"',
      },
      {
        id: 'jiang_zhan_dlg_4',
        topic: '请求传承',
        text: '"姜家传承非轻易可授。"他沉吟片刻："若你有大毅力、大机缘，可去试炼之地证明自己。"',
      },
    ],
  },
  {
    id: 'jiang_hengyu',
    name: '姜恒宇',
    title: '恒宇后裔',
    description: '姜家最古老的血脉之一，名字取自恒宇大帝。他体内流淌着最纯正的帝血，自幼被寄予厚望，是姜家未来的希望。',
    greeting: '姜恒宇神色庄重，拱手道："恒宇大帝后裔，见过道友。"',
    roomId: 'stone_kingdom_zhuque',
    dialogues: [
      {
        id: 'jiang_hengyu_dlg_0',
        topic: '自我介绍',
        text: '"姜恒宇，恒宇后裔。"他温和地介绍道："姜家传承自恒宇大帝，以火行道法闻名于世。"',
      },
      {
        id: 'jiang_hengyu_dlg_1',
        topic: '问恒宇大帝',
        text: '"恒宇大帝，以离火神炉证道，镇压太古万族。"他眼中燃起崇敬之火："我姜家先祖的荣光，必将在此世重现。"',
      },
      {
        id: 'jiang_hengyu_dlg_2',
        topic: '谈神王姜太虚',
        text: '"神王再生，举世皆惊。"他激动道："四千年前白衣神王横扫天下，四千年后他依旧无敌于世，是我姜家永远的骄傲。"',
      },
      {
        id: 'jiang_hengyu_dlg_3',
        topic: '论当世局势',
        text: '"黑暗动乱将临，各方势力蠢蠢欲动。"他沉声道："姜家当与同道携手，共御大敌，守护这芸芸众生。"',
      },
      {
        id: 'jiang_hengyu_dlg_4',
        topic: '请求传承',
        text: '"姜家传承非轻易可授。"他沉吟片刻："若你有大毅力、大机缘，可去试炼之地证明自己。"',
      },
    ],
  },
  {
    id: 'jiang_laoyu',
    name: '姜老妪',
    title: '姜家活化石',
    description: '姜家存活最久的女修，鸡皮鹤发，却精神矍铄。她见证了姜家数个时代的兴衰，手中掌握着无数不为人知的秘密。',
    greeting: '姜老妪眯起浑浊的双眼，沙哑道："又一个年轻人……让老身看看你的命数。"',
    roomId: 'stone_kingdom_east_market',
    dialogues: [
      {
        id: 'jiang_laoyu_dlg_0',
        topic: '自我介绍',
        text: '"姜老妪，姜家活化石。"他温和地介绍道："姜家传承自恒宇大帝，以火行道法闻名于世。"',
      },
      {
        id: 'jiang_laoyu_dlg_1',
        topic: '问恒宇大帝',
        text: '"恒宇大帝，以离火神炉证道，镇压太古万族。"他眼中燃起崇敬之火："我姜家先祖的荣光，必将在此世重现。"',
      },
      {
        id: 'jiang_laoyu_dlg_2',
        topic: '谈神王姜太虚',
        text: '"神王再生，举世皆惊。"他激动道："四千年前白衣神王横扫天下，四千年后他依旧无敌于世，是我姜家永远的骄傲。"',
      },
      {
        id: 'jiang_laoyu_dlg_3',
        topic: '论当世局势',
        text: '"黑暗动乱将临，各方势力蠢蠢欲动。"他沉声道："姜家当与同道携手，共御大敌，守护这芸芸众生。"',
      },
      {
        id: 'jiang_laoyu_dlg_4',
        topic: '请求传承',
        text: '"姜家传承非轻易可授。"他沉吟片刻："若你有大毅力、大机缘，可去试炼之地证明自己。"',
      },
    ],
  },
  {
    id: 'jiang_liu',
    name: '姜流',
    title: '姜家暗子',
    description: '姜家布置在暗处的棋子，表面上是散修，实则忠心耿耿。他在暗中为姜家收集情报，铲除威胁，是阴影中的利刃。',
    greeting: '姜流警惕地环顾四周，低声道："这里不是说话的地方，跟我来。"',
    roomId: 'stone_kingdom_west_market',
    dialogues: [
      {
        id: 'jiang_liu_dlg_0',
        topic: '自我介绍',
        text: '"姜流，姜家暗子。"他温和地介绍道："姜家传承自恒宇大帝，以火行道法闻名于世。"',
      },
      {
        id: 'jiang_liu_dlg_1',
        topic: '问恒宇大帝',
        text: '"恒宇大帝，以离火神炉证道，镇压太古万族。"他眼中燃起崇敬之火："我姜家先祖的荣光，必将在此世重现。"',
      },
      {
        id: 'jiang_liu_dlg_2',
        topic: '谈神王姜太虚',
        text: '"神王再生，举世皆惊。"他激动道："四千年前白衣神王横扫天下，四千年后他依旧无敌于世，是我姜家永远的骄傲。"',
      },
      {
        id: 'jiang_liu_dlg_3',
        topic: '论当世局势',
        text: '"黑暗动乱将临，各方势力蠢蠢欲动。"他沉声道："姜家当与同道携手，共御大敌，守护这芸芸众生。"',
      },
      {
        id: 'jiang_liu_dlg_4',
        topic: '请求传承',
        text: '"姜家传承非轻易可授。"他沉吟片刻："若你有大毅力、大机缘，可去试炼之地证明自己。"',
      },
    ],
  },
  {
    id: 'xian_wangmu',
    name: '西王母',
    title: '瑶池之主',
    description: '瑶池圣地当代西王母，风华绝代，威震东荒。她不仅拥有绝世容颜，更掌握着西皇母留下的无上传承，是女性修士中的至尊人物。',
    greeting: '西王母端坐瑶池仙台之上，声音空灵："来者何事扰我瑶池清净？"',
    roomId: 'stone_kingdom_huji_tavern',
    dialogues: [
      {
        id: 'xian_wangmu_dlg_0',
        topic: '自我介绍',
        text: '"西王母，瑶池之主。"她威严地说道："瑶池圣地传承自西皇母，是天下女修的圣地。"',
      },
      {
        id: 'xian_wangmu_dlg_1',
        topic: '问西皇母',
        text: '"西皇母，万古第一女帝！"她神色崇敬："她以无上伟力开创瑶池，留下西皇真经，庇护后世女修无数岁月。"',
      },
      {
        id: 'xian_wangmu_dlg_2',
        topic: '谈瑶池传承',
        text: '"西皇真经玄奥莫测，重在洗涤心灵、净化本源。"她缓缓道："修炼此法，需保持赤子之心，不为外物所扰。"',
      },
      {
        id: 'xian_wangmu_dlg_3',
        topic: '论女修道途',
        text: '"天下女修，苦求大道久矣。"她感慨道："瑶池圣地愿为天下女修提供庇护，让她们在险恶世间有一处安身立命之所。"',
      },
      {
        id: 'xian_wangmu_dlg_4',
        topic: '请求灵药',
        text: '"瑶池灵药珍贵异常，非轻易可赠。"她沉吟道："若你能完成试炼，证明你的诚心，圣地或可赐你一枚。"',
      },
    ],
  },
  {
    id: 'yaochi_shengnv',
    name: '瑶池圣女',
    title: '瑶池传人',
    description: '瑶池圣地选定的圣女，冰肌玉骨，不染尘埃。她修炼西皇真经，气质出尘，是东荒无数修士梦寐以求的道侣人选。',
    greeting: '瑶池圣女轻纱遮面，眸光如水："道友请留步，前方是我瑶池禁地。"',
    roomId: 'stone_kingdom_wanjintang',
    dialogues: [
      {
        id: 'yaochi_shengnv_dlg_0',
        topic: '自我介绍',
        text: '"瑶池圣女，瑶池传人。"她温婉地说道："瑶池圣地传承自西皇母，是天下女修的圣地。"',
      },
      {
        id: 'yaochi_shengnv_dlg_1',
        topic: '问西皇母',
        text: '"西皇母，万古第一女帝！"她神色崇敬："她以无上伟力开创瑶池，留下西皇真经，庇护后世女修无数岁月。"',
      },
      {
        id: 'yaochi_shengnv_dlg_2',
        topic: '谈瑶池传承',
        text: '"西皇真经玄奥莫测，重在洗涤心灵、净化本源。"她缓缓道："修炼此法，需保持赤子之心，不为外物所扰。"',
      },
      {
        id: 'yaochi_shengnv_dlg_3',
        topic: '论女修道途',
        text: '"天下女修，苦求大道久矣。"她感慨道："瑶池圣地愿为天下女修提供庇护，让她们在险恶世间有一处安身立命之所。"',
      },
      {
        id: 'yaochi_shengnv_dlg_4',
        topic: '请求灵药',
        text: '"瑶池灵药珍贵异常，非轻易可赠。"她沉吟道："若你能完成试炼，证明你的诚心，圣地或可赐你一枚。"',
      },
    ],
  },
  {
    id: 'yaochi_zhanglao',
    name: '瑶池长老',
    title: '瑶池太上',
    description: '瑶池圣地太上长老，女性大能，修行已逾五千年。她气质雍容华贵，举手投足间尽显圣地风范，是瑶池的顶梁柱。',
    greeting: '瑶池长老手持玉如意，微微颔首："小友气质不凡，可愿入我瑶池一叙？"',
    roomId: 'stone_kingdom_wanjintang_back',
    dialogues: [
      {
        id: 'yaochi_zhanglao_dlg_0',
        topic: '自我介绍',
        text: '"瑶池长老，瑶池太上。"她温婉地说道："瑶池圣地传承自西皇母，是天下女修的圣地。"',
      },
      {
        id: 'yaochi_zhanglao_dlg_1',
        topic: '问西皇母',
        text: '"西皇母，万古第一女帝！"她神色崇敬："她以无上伟力开创瑶池，留下西皇真经，庇护后世女修无数岁月。"',
      },
      {
        id: 'yaochi_zhanglao_dlg_2',
        topic: '谈瑶池传承',
        text: '"西皇真经玄奥莫测，重在洗涤心灵、净化本源。"她缓缓道："修炼此法，需保持赤子之心，不为外物所扰。"',
      },
      {
        id: 'yaochi_zhanglao_dlg_3',
        topic: '论女修道途',
        text: '"天下女修，苦求大道久矣。"她感慨道："瑶池圣地愿为天下女修提供庇护，让她们在险恶世间有一处安身立命之所。"',
      },
      {
        id: 'yaochi_zhanglao_dlg_4',
        topic: '请求灵药',
        text: '"瑶池灵药珍贵异常，非轻易可赠。"她沉吟道："若你能完成试炼，证明你的诚心，圣地或可赐你一枚。"',
      },
    ],
  },
  {
    id: 'yaochi_xianzi',
    name: '瑶池仙子',
    title: '瑶池弟子',
    description: '瑶池圣地普通弟子，容貌秀丽，性情温婉。她自幼在瑶池长大，修习西皇母传承的道法，对外面的世界充满好奇。',
    greeting: '瑶池仙子盈盈一拜，浅笑道："贵客临门，小女子有失远迎。"',
    roomId: 'stone_kingdom_dark_market',
    dialogues: [
      {
        id: 'yaochi_xianzi_dlg_0',
        topic: '自我介绍',
        text: '"瑶池仙子，瑶池弟子。"她温婉地说道："瑶池圣地传承自西皇母，是天下女修的圣地。"',
      },
      {
        id: 'yaochi_xianzi_dlg_1',
        topic: '问西皇母',
        text: '"西皇母，万古第一女帝！"她神色崇敬："她以无上伟力开创瑶池，留下西皇真经，庇护后世女修无数岁月。"',
      },
      {
        id: 'yaochi_xianzi_dlg_2',
        topic: '谈瑶池传承',
        text: '"西皇真经玄奥莫测，重在洗涤心灵、净化本源。"她缓缓道："修炼此法，需保持赤子之心，不为外物所扰。"',
      },
      {
        id: 'yaochi_xianzi_dlg_3',
        topic: '论女修道途',
        text: '"天下女修，苦求大道久矣。"她感慨道："瑶池圣地愿为天下女修提供庇护，让她们在险恶世间有一处安身立命之所。"',
      },
      {
        id: 'yaochi_xianzi_dlg_4',
        topic: '请求灵药',
        text: '"瑶池灵药珍贵异常，非轻易可赠。"她沉吟道："若你能完成试炼，证明你的诚心，圣地或可赐你一枚。"',
      },
    ],
  },
  {
    id: 'xi_huangmu',
    name: '西皇母',
    title: '远古大帝',
    description: '瑶池圣地开创者，远古时期证道的女性大帝。她创下西皇真经，以无上伟力镇压黑暗动乱，是后世所有女修的楷模与信仰。',
    greeting: '一道虚幻的身影在瑶池上空浮现，大帝威压弥漫："后世之人，寻我所为何事？"',
    roomId: 'stone_kingdom_zuiyuefang',
    dialogues: [
      {
        id: 'xi_huangmu_dlg_0',
        topic: '自我介绍',
        text: '"西皇母，远古大帝。"她威严地说道："瑶池圣地传承自西皇母，是天下女修的圣地。"',
      },
      {
        id: 'xi_huangmu_dlg_1',
        topic: '问西皇母',
        text: '"西皇母，万古第一女帝！"她神色崇敬："她以无上伟力开创瑶池，留下西皇真经，庇护后世女修无数岁月。"',
      },
      {
        id: 'xi_huangmu_dlg_2',
        topic: '谈瑶池传承',
        text: '"西皇真经玄奥莫测，重在洗涤心灵、净化本源。"她缓缓道："修炼此法，需保持赤子之心，不为外物所扰。"',
      },
      {
        id: 'xi_huangmu_dlg_3',
        topic: '论女修道途',
        text: '"天下女修，苦求大道久矣。"她感慨道："瑶池圣地愿为天下女修提供庇护，让她们在险恶世间有一处安身立命之所。"',
      },
      {
        id: 'xi_huangmu_dlg_4',
        topic: '请求灵药',
        text: '"瑶池灵药珍贵异常，非轻易可赠。"她沉吟道："若你能完成试炼，证明你的诚心，圣地或可赐你一枚。"',
      },
    ],
  },
  {
    id: 'yaochi_shouhu',
    name: '瑶池守护者',
    title: '瑶池古兽',
    description: '守护瑶池圣地的远古异兽，据说是西皇母当年收服的神兽后裔。它体型庞大，性情温和，却对侵犯瑶池者毫不留情。',
    greeting: '一声低沉的兽吼从瑶池深处传来，水波荡漾，灵气翻涌。',
    roomId: 'stone_kingdom_cangchun',
    dialogues: [
      {
        id: 'yaochi_shouhu_dlg_0',
        topic: '自我介绍',
        text: '"瑶池守护者，瑶池古兽。"她温婉地说道："瑶池圣地传承自西皇母，是天下女修的圣地。"',
      },
      {
        id: 'yaochi_shouhu_dlg_1',
        topic: '问西皇母',
        text: '"西皇母，万古第一女帝！"她神色崇敬："她以无上伟力开创瑶池，留下西皇真经，庇护后世女修无数岁月。"',
      },
      {
        id: 'yaochi_shouhu_dlg_2',
        topic: '谈瑶池传承',
        text: '"西皇真经玄奥莫测，重在洗涤心灵、净化本源。"她缓缓道："修炼此法，需保持赤子之心，不为外物所扰。"',
      },
      {
        id: 'yaochi_shouhu_dlg_3',
        topic: '论女修道途',
        text: '"天下女修，苦求大道久矣。"她感慨道："瑶池圣地愿为天下女修提供庇护，让她们在险恶世间有一处安身立命之所。"',
      },
      {
        id: 'yaochi_shouhu_dlg_4',
        topic: '请求灵药',
        text: '"瑶池灵药珍贵异常，非轻易可赠。"她沉吟道："若你能完成试炼，证明你的诚心，圣地或可赐你一枚。"',
      },
    ],
  },
  {
    id: 'yaochi_yaonong',
    name: '瑶池药农',
    title: '灵药园主',
    description: '掌管瑶池圣地药园的老修士，一生与灵药为伴。他对各种珍稀药草了如指掌，培育出的仙药远近闻名。',
    greeting: '瑶池药农满身药香，笑呵呵地说："来看看老夫的宝贝灵药？"',
    roomId: 'stone_kingdom_cangchun_pool',
    dialogues: [
      {
        id: 'yaochi_yaonong_dlg_0',
        topic: '自我介绍',
        text: '"瑶池药农，灵药园主。"她温婉地说道："瑶池圣地传承自西皇母，是天下女修的圣地。"',
      },
      {
        id: 'yaochi_yaonong_dlg_1',
        topic: '问西皇母',
        text: '"西皇母，万古第一女帝！"她神色崇敬："她以无上伟力开创瑶池，留下西皇真经，庇护后世女修无数岁月。"',
      },
      {
        id: 'yaochi_yaonong_dlg_2',
        topic: '谈瑶池传承',
        text: '"西皇真经玄奥莫测，重在洗涤心灵、净化本源。"她缓缓道："修炼此法，需保持赤子之心，不为外物所扰。"',
      },
      {
        id: 'yaochi_yaonong_dlg_3',
        topic: '论女修道途',
        text: '"天下女修，苦求大道久矣。"她感慨道："瑶池圣地愿为天下女修提供庇护，让她们在险恶世间有一处安身立命之所。"',
      },
      {
        id: 'yaochi_yaonong_dlg_4',
        topic: '请求灵药',
        text: '"瑶池灵药珍贵异常，非轻易可赠。"她沉吟道："若你能完成试炼，证明你的诚心，圣地或可赐你一枚。"',
      },
    ],
  },
  {
    id: 'yaochi_qinshi',
    name: '瑶池琴师',
    title: '音律大家',
    description: '瑶池圣地中以琴音入道的奇女子，一曲琴音可动天地。她常年在瑶池畔抚琴，据说她的琴声能洗涤心灵、驱除心魔。',
    greeting: '悠扬的琴声从瑶池畔传来，琴师抬眸轻语："愿闻君之来意。"',
    roomId: 'stone_kingdom_yicui',
    dialogues: [
      {
        id: 'yaochi_qinshi_dlg_0',
        topic: '自我介绍',
        text: '"瑶池琴师，音律大家。"她温婉地说道："瑶池圣地传承自西皇母，是天下女修的圣地。"',
      },
      {
        id: 'yaochi_qinshi_dlg_1',
        topic: '问西皇母',
        text: '"西皇母，万古第一女帝！"她神色崇敬："她以无上伟力开创瑶池，留下西皇真经，庇护后世女修无数岁月。"',
      },
      {
        id: 'yaochi_qinshi_dlg_2',
        topic: '谈瑶池传承',
        text: '"西皇真经玄奥莫测，重在洗涤心灵、净化本源。"她缓缓道："修炼此法，需保持赤子之心，不为外物所扰。"',
      },
      {
        id: 'yaochi_qinshi_dlg_3',
        topic: '论女修道途',
        text: '"天下女修，苦求大道久矣。"她感慨道："瑶池圣地愿为天下女修提供庇护，让她们在险恶世间有一处安身立命之所。"',
      },
      {
        id: 'yaochi_qinshi_dlg_4',
        topic: '请求灵药',
        text: '"瑶池灵药珍贵异常，非轻易可赠。"她沉吟道："若你能完成试炼，证明你的诚心，圣地或可赐你一枚。"',
      },
    ],
  },
  {
    id: 'yaochi_zhishi',
    name: '瑶池执事',
    title: '外门总管',
    description: '掌管瑶池圣地外门事务的执事，精明能干。她虽非顶尖强者，却将瑶池的日常运转打理得井井有条，深受西王母信任。',
    greeting: '瑶池执事干练地整理衣袖，微笑道："贵客有何需求，尽管吩咐。"',
    roomId: 'stone_kingdom_zuixian',
    dialogues: [
      {
        id: 'yaochi_zhishi_dlg_0',
        topic: '自我介绍',
        text: '"瑶池执事，外门总管。"她温婉地说道："瑶池圣地传承自西皇母，是天下女修的圣地。"',
      },
      {
        id: 'yaochi_zhishi_dlg_1',
        topic: '问西皇母',
        text: '"西皇母，万古第一女帝！"她神色崇敬："她以无上伟力开创瑶池，留下西皇真经，庇护后世女修无数岁月。"',
      },
      {
        id: 'yaochi_zhishi_dlg_2',
        topic: '谈瑶池传承',
        text: '"西皇真经玄奥莫测，重在洗涤心灵、净化本源。"她缓缓道："修炼此法，需保持赤子之心，不为外物所扰。"',
      },
      {
        id: 'yaochi_zhishi_dlg_3',
        topic: '论女修道途',
        text: '"天下女修，苦求大道久矣。"她感慨道："瑶池圣地愿为天下女修提供庇护，让她们在险恶世间有一处安身立命之所。"',
      },
      {
        id: 'yaochi_zhishi_dlg_4',
        topic: '请求灵药',
        text: '"瑶池灵药珍贵异常，非轻易可赠。"她沉吟道："若你能完成试炼，证明你的诚心，圣地或可赐你一枚。"',
      },
    ],
  },
  {
    id: 'yaochi_yueji',
    name: '瑶池月姬',
    title: '月华仙子',
    description: '瑶池圣地中以月华之力修炼的奇女子，每逢月圆之夜实力暴涨。她性情清冷，独来独往，却在瑶池中有极高地位。',
    greeting: '月光下，瑶池月姬静静伫立，淡淡道："月圆之夜，不宜外出。"',
    roomId: 'stone_kingdom_taohua',
    dialogues: [
      {
        id: 'yaochi_yueji_dlg_0',
        topic: '自我介绍',
        text: '"瑶池月姬，月华仙子。"她温婉地说道："瑶池圣地传承自西皇母，是天下女修的圣地。"',
      },
      {
        id: 'yaochi_yueji_dlg_1',
        topic: '问西皇母',
        text: '"西皇母，万古第一女帝！"她神色崇敬："她以无上伟力开创瑶池，留下西皇真经，庇护后世女修无数岁月。"',
      },
      {
        id: 'yaochi_yueji_dlg_2',
        topic: '谈瑶池传承',
        text: '"西皇真经玄奥莫测，重在洗涤心灵、净化本源。"她缓缓道："修炼此法，需保持赤子之心，不为外物所扰。"',
      },
      {
        id: 'yaochi_yueji_dlg_3',
        topic: '论女修道途',
        text: '"天下女修，苦求大道久矣。"她感慨道："瑶池圣地愿为天下女修提供庇护，让她们在险恶世间有一处安身立命之所。"',
      },
      {
        id: 'yaochi_yueji_dlg_4',
        topic: '请求灵药',
        text: '"瑶池灵药珍贵异常，非轻易可赠。"她沉吟道："若你能完成试炼，证明你的诚心，圣地或可赐你一枚。"',
      },
    ],
  },
  {
    id: 'yaoguang_shengzi',
    name: '摇光圣子',
    title: '摇光传人',
    description: '摇光圣地选定的圣子，丰神俊朗，实力深不可测。他修炼摇光圣地的无上圣法，身负特殊体质，是年轻一代中最耀眼的人物之一。',
    greeting: '摇光圣子眸光如电，淡淡道："你身上有让我感兴趣的气息。"',
    roomId: 'stone_kingdom_fang_01',
    dialogues: [
      {
        id: 'yaoguang_shengzi_dlg_0',
        topic: '自我介绍',
        text: '"摇光圣子，摇光传人。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'yaoguang_shengzi_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'yaoguang_shengzi_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'yaoguang_shengzi_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'yaoguang_shengzi_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他正色道："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'yaoguang_shengnv',
    name: '摇光圣女',
    title: '摇光明珠',
    description: '摇光圣地圣女，美丽妖娆，风情万种。她看似柔弱，实则心机深沉，在摇光圣地中地位极高，是圣子的左膀右臂。',
    greeting: '摇光圣女巧笑嫣然，眼波流转："这位公子，可愿与奴家共饮一杯？"',
    roomId: 'stone_kingdom_fang_02',
    dialogues: [
      {
        id: 'yaoguang_shengnv_dlg_0',
        topic: '自我介绍',
        text: '"摇光圣女，摇光明珠。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'yaoguang_shengnv_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'yaoguang_shengnv_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'yaoguang_shengnv_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'yaoguang_shengnv_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他温婉一笑："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'wanchu_shengzi',
    name: '万初圣子',
    title: '万初传人',
    description: '万初圣地圣子，性格沉稳，不善言辞。万初圣地以推演天机闻名，他自幼学习卦象之道，可窥探一丝未来。',
    greeting: '万初圣子掐指一算，眉头微皱："奇怪，你的命数为何模糊不清？"',
    roomId: 'stone_kingdom_fang_03',
    dialogues: [
      {
        id: 'wanchu_shengzi_dlg_0',
        topic: '自我介绍',
        text: '"万初圣子，万初传人。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'wanchu_shengzi_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'wanchu_shengzi_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'wanchu_shengzi_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'wanchu_shengzi_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他正色道："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'zifu_shengnv',
    name: '紫府圣女',
    title: '紫府传人',
    description: '紫府圣地圣女，气质空灵，如紫气东来。紫府圣地专修神识，她的神念之强在年轻一代中罕有敌手，一念可动山河。',
    greeting: '紫府圣女双眸微闭，神念如潮水般涌来："来者神识不弱，值得一战。"',
    roomId: 'stone_kingdom_bishui_yuan',
    dialogues: [
      {
        id: 'zifu_shengnv_dlg_0',
        topic: '自我介绍',
        text: '"紫府圣女，紫府传人。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'zifu_shengnv_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'zifu_shengnv_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'zifu_shengnv_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'zifu_shengnv_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他温婉一笑："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'dayan_shengzi',
    name: '大衍圣子',
    title: '大衍传人',
    description: '大衍圣地圣子，身材魁梧，力大无穷。大衍圣地以武入道，他将肉身修炼到极致，一拳可崩碎山岳，是纯粹的体修。',
    greeting: '大衍圣子捏了捏拳头，骨节爆响："想打一架？来吧！"',
    roomId: 'stone_kingdom_fang_04',
    dialogues: [
      {
        id: 'dayan_shengzi_dlg_0',
        topic: '自我介绍',
        text: '"大衍圣子，大衍传人。"他傲然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'dayan_shengzi_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'dayan_shengzi_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'dayan_shengzi_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'dayan_shengzi_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他正色道："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'daoyi_shengzi',
    name: '道一圣子',
    title: '道一传人',
    description: '道一圣地圣子，一身道袍，仙风道骨。道一圣地讲究天人合一，他常年游历名山大川，感悟自然之道，实力深不可测。',
    greeting: '道一圣子拂尘轻摆，微笑道："道生一，一生二，二生三。道友，可悟了？"',
    roomId: 'stone_kingdom_yaotai',
    dialogues: [
      {
        id: 'daoyi_shengzi_dlg_0',
        topic: '自我介绍',
        text: '"道一圣子，道一传人。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'daoyi_shengzi_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'daoyi_shengzi_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'daoyi_shengzi_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'daoyi_shengzi_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他正色道："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'wanchu_zhanglao',
    name: '万初长老',
    title: '万初太上',
    description: '万初圣地太上长老，白须飘飘，仙风道骨。他精通推演之术，可算天机、测吉凶，是万初圣地最受人尊敬的长者。',
    greeting: '万初长老抚须微笑："小友印堂发亮，近日或有奇遇。"',
    roomId: 'stone_kingdom_yaotai_food',
    dialogues: [
      {
        id: 'wanchu_zhanglao_dlg_0',
        topic: '自我介绍',
        text: '"万初长老，万初太上。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'wanchu_zhanglao_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'wanchu_zhanglao_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'wanchu_zhanglao_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'wanchu_zhanglao_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他正色道："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'zifu_zhanglao',
    name: '紫府长老',
    title: '紫府太上',
    description: '紫府圣地太上长老，神识浩瀚如海。他的神念可覆盖方圆千里，任何风吹草动都逃不过他的感知，是紫府的定海神针。',
    greeting: '紫府长老双眼微睁，神念波动："小友神识凝练，可是修炼过特殊法门？"',
    roomId: 'stone_kingdom_yaotai_discuss',
    dialogues: [
      {
        id: 'zifu_zhanglao_dlg_0',
        topic: '自我介绍',
        text: '"紫府长老，紫府太上。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'zifu_zhanglao_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'zifu_zhanglao_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'zifu_zhanglao_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'zifu_zhanglao_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他正色道："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'dayan_zhanglao',
    name: '大衍长老',
    title: '大衍战神',
    description: '大衍圣地以战闻名的长老，浑身肌肉虬结，如铁塔般耸立。他一生征战无数，是大衍圣地战力的象征，令敌人闻风丧胆。',
    greeting: '大衍长老声如雷鸣："小子，体格不错，有没有兴趣学大衍战体？"',
    roomId: 'stone_kingdom_yaotai_pool',
    dialogues: [
      {
        id: 'dayan_zhanglao_dlg_0',
        topic: '自我介绍',
        text: '"大衍长老，大衍战神。"他傲然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'dayan_zhanglao_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'dayan_zhanglao_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'dayan_zhanglao_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'dayan_zhanglao_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他正色道："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'daoyi_zhanglao',
    name: '道一长老',
    title: '道一真人',
    description: '道一圣地修为最深的长老之一，常年闭关悟道，极少出世。他对大道的理解已达化境，一言一语都蕴含深奥哲理。',
    greeting: '道一长老睁开双眼，眸中有星辰生灭："天地不仁，以万物为刍狗。小友，你来寻道？"',
    roomId: 'stone_kingdom_culture_plaza',
    dialogues: [
      {
        id: 'daoyi_zhanglao_dlg_0',
        topic: '自我介绍',
        text: '"道一长老，道一真人。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'daoyi_zhanglao_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'daoyi_zhanglao_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'daoyi_zhanglao_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'daoyi_zhanglao_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他正色道："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'yaoguang_laoshengzhu',
    name: '摇光老圣主',
    title: '摇光旧主',
    description: '摇光圣地上一代的圣主，退位后闭关苦修，实力更上一层楼。他对摇光圣地忠心耿耿，在圣地危难之际曾出手力挽狂澜。',
    greeting: '摇光老圣主目光如炬，沉声道："摇光圣地，岂能容他人欺辱！"',
    roomId: 'stone_kingdom_imperial_gate',
    dialogues: [
      {
        id: 'yaoguang_laoshengzhu_dlg_0',
        topic: '自我介绍',
        text: '"摇光老圣主，摇光旧主。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'yaoguang_laoshengzhu_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'yaoguang_laoshengzhu_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'yaoguang_laoshengzhu_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'yaoguang_laoshengzhu_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他正色道："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'wanchu_shengnv',
    name: '万初圣女',
    title: '万初明珠',
    description: '万初圣地圣女，气质温婉，精通医术。她不仅擅长推演天机，更以救死扶伤闻名，在各大圣地中人脉极广。',
    greeting: '万初圣女温柔一笑，如春风拂面："道友面色有恙，可要小妹诊治一番？"',
    roomId: 'stone_kingdom_imperial_city',
    dialogues: [
      {
        id: 'wanchu_shengnv_dlg_0',
        topic: '自我介绍',
        text: '"万初圣女，万初明珠。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'wanchu_shengnv_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'wanchu_shengnv_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'wanchu_shengnv_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'wanchu_shengnv_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他温婉一笑："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'zifu_shengzi',
    name: '紫府圣子',
    title: '紫府天骄',
    description: '紫府圣地圣子，神识之强冠绝同代。他可一念化万千，同时操控无数法器，战斗风格华丽而致命，令人防不胜防。',
    greeting: '紫府圣子周身环绕着数十件法器，淡淡道："你的神识，接得住我一念吗？"',
    roomId: 'stone_kingdom_jiaofangsi',
    dialogues: [
      {
        id: 'zifu_shengzi_dlg_0',
        topic: '自我介绍',
        text: '"紫府圣子，紫府天骄。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'zifu_shengzi_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'zifu_shengzi_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'zifu_shengzi_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'zifu_shengzi_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他正色道："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'dayan_shengnv',
    name: '大衍圣女',
    title: '大衍女战',
    description: '大衍圣地罕见的女性战神，虽为女子，却将肉身修炼到惊世骇俗的地步。她一拳可裂虚空，是大衍圣地最另类的传人。',
    greeting: '大衍圣女秀拳紧握，战意昂扬："来！让我看看你有几斤几两！"',
    roomId: 'stone_kingdom_feiyinge',
    dialogues: [
      {
        id: 'dayan_shengnv_dlg_0',
        topic: '自我介绍',
        text: '"大衍圣女，大衍女战。"他傲然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'dayan_shengnv_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'dayan_shengnv_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'dayan_shengnv_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'dayan_shengnv_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他温婉一笑："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'daoyi_shengnv',
    name: '道一圣女',
    title: '道一仙子',
    description: '道一圣地圣女，常年隐居深山，不问世事。她一心向道，对世间纷争毫无兴趣，却在道一圣地中地位超然。',
    greeting: '道一圣女素手轻拈花瓣，头也不抬："山中无岁月，道友何来？"',
    roomId: 'stone_kingdom_feiyinge_2',
    dialogues: [
      {
        id: 'daoyi_shengnv_dlg_0',
        topic: '自我介绍',
        text: '"道一圣女，道一仙子。"他淡然道："圣地传承，非寻常门派可比。"',
      },
      {
        id: 'daoyi_shengnv_dlg_1',
        topic: '问圣地传承',
        text: '"我圣地传承久远，底蕴深厚。"他自豪道："历代圣主皆是一方霸主，留下了无数传奇。"',
      },
      {
        id: 'daoyi_shengnv_dlg_2',
        topic: '谈年轻一代',
        text: '"如今天骄并起，大世降临。"他目光灼灼："我辈当自强不息，在此世争渡，求那一线成仙之机。"',
      },
      {
        id: 'daoyi_shengnv_dlg_3',
        topic: '论黑暗动乱',
        text: '"黑暗动乱是悬在众生头顶的利剑。"他沉声道："圣地有责任守护一方平安，即便粉身碎骨，也在所不惜。"',
      },
      {
        id: 'daoyi_shengnv_dlg_4',
        topic: '请求加入',
        text: '"想入我圣地，需通过层层考核。"他温婉一笑："资质、心性、毅力，缺一不可。"',
      },
    ],
  },
  {
    id: 'qingdi_houren',
    name: '青帝后人',
    title: '妖帝血脉',
    description: '妖帝青帝的后人，体内流淌着妖帝之血。她容貌绝美，气质空灵，背负着复兴妖帝一脉的重任，在妖族中地位尊崇。',
    greeting: '青帝后人眸中青光一闪，轻声道："妖帝一脉，不容轻辱。"',
    roomId: 'stone_kingdom_feiyinge_3',
    dialogues: [
      {
        id: 'qingdi_houren_dlg_0',
        topic: '自我介绍',
        text: '"青帝后人，妖帝血脉。"他淡淡道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'qingdi_houren_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'qingdi_houren_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'qingdi_houren_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'qingdi_houren_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'yaodi_shijiusun',
    name: '妖帝十九世孙',
    title: '青帝嫡血',
    description: '妖帝青帝的第十九代嫡孙，天赋异禀，血脉之力惊人。他性格孤傲，一心想要重现青帝当年的辉煌，号令天下妖族。',
    greeting: '妖帝十九世孙浑身妖气冲天，傲然道："见我如见青帝，还不下跪？"',
    roomId: 'stone_kingdom_baixipeng',
    dialogues: [
      {
        id: 'yaodi_shijiusun_dlg_0',
        topic: '自我介绍',
        text: '"妖帝十九世孙，青帝嫡血。"他淡淡道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'yaodi_shijiusun_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'yaodi_shijiusun_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'yaodi_shijiusun_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'yaodi_shijiusun_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'tianyao_gongzhu',
    name: '天妖宫主',
    title: '天妖至尊',
    description: '天妖宫的当代宫主，统御天下妖族的至尊强者。他本体是一头远古天妖，实力深不可测，是妖族中最有话语权的人物。',
    greeting: '天妖宫主妖气弥漫，声音如雷："人族修士，来我天妖宫所为何事？"',
    roomId: 'stone_kingdom_ministries',
    dialogues: [
      {
        id: 'tianyao_gongzhu_dlg_0',
        topic: '自我介绍',
        text: '"天妖宫主，天妖至尊。"他傲然道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'tianyao_gongzhu_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'tianyao_gongzhu_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'tianyao_gongzhu_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'tianyao_gongzhu_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'jinchi_pengwang',
    name: '金翅小鹏王',
    title: '鹏族天骄',
    description: '金翅大鹏鸟一族的年轻天骄，桀骜不驯，目中无人。他速度无双，双翅一展可横渡万里，是妖族年轻一代的佼佼者。',
    greeting: '金翅小鹏王双翅微展，狂风大作："哼，人族？不过是我鹏族的食物！"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: 'jinchi_pengwang_dlg_0',
        topic: '自我介绍',
        text: '"金翅小鹏王，鹏族天骄。"他傲然道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'jinchi_pengwang_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'jinchi_pengwang_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'jinchi_pengwang_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'jinchi_pengwang_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'kongque_wang',
    name: '孔雀王',
    title: '孔雀大明王',
    description: '妖族大圣孔雀王，实力通天彻地。他本体是一只五色孔雀，可刷落万物，是妖族中站在最顶端的强者之一。',
    greeting: '孔雀王身后五色神光流转，淡然道："五色神光面前，万物皆虚。"',
    roomId: 'stone_kingdom_scripture',
    dialogues: [
      {
        id: 'kongque_wang_dlg_0',
        topic: '自我介绍',
        text: '"孔雀王，孔雀大明王。"他傲然道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'kongque_wang_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'kongque_wang_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'kongque_wang_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'kongque_wang_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'qingjiao_wang',
    name: '青蛟王',
    title: '蛟龙大圣',
    description: '妖族大圣青蛟王，本体是一条千年青蛟，即将化龙。他镇守妖族水域多年，威名赫赫，是水中妖族的领袖。',
    greeting: '青蛟王周身水雾缭绕，龙吟阵阵："水域重地，人族速退！"',
    roomId: 'stone_kingdom_technique',
    dialogues: [
      {
        id: 'qingjiao_wang_dlg_0',
        topic: '自我介绍',
        text: '"青蛟王，蛟龙大圣。"他傲然道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'qingjiao_wang_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'qingjiao_wang_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'qingjiao_wang_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'qingjiao_wang_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'chilong_laodao',
    name: '赤龙老道',
    title: '妖族活化石',
    description: '妖族最古老的活化石之一，本体是一条赤龙。他在妖族中辈分极高，连各大妖王都要恭敬行礼，是妖族的定海神针。',
    greeting: '赤龙老道龙须飘动，老眼微睁："年轻人，老夫活了太久，久到忘记了很多事……"',
    roomId: 'stone_kingdom_prince_mansion',
    dialogues: [
      {
        id: 'chilong_laodao_dlg_0',
        topic: '自我介绍',
        text: '"赤龙老道，妖族活化石。"他淡淡道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'chilong_laodao_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'chilong_laodao_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'chilong_laodao_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'chilong_laodao_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'shencan_gongzhu',
    name: '神蚕公主',
    title: '神蚕岭传人',
    description: '神蚕岭的公主，本体是一只神蚕，可九变无敌。她每一次蜕变都会实力暴涨，是妖族中最神秘也最令人期待的天才。',
    greeting: '神蚕公主身上蚕丝闪烁，声音轻柔："我又要蜕变了，希望这次能成功……"',
    roomId: 'stone_kingdom_palace_gate',
    dialogues: [
      {
        id: 'shencan_gongzhu_dlg_0',
        topic: '自我介绍',
        text: '"神蚕公主，神蚕岭传人。"他傲然道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'shencan_gongzhu_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'shencan_gongzhu_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'shencan_gongzhu_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'shencan_gongzhu_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'douzhan_shengyuan',
    name: '斗战圣猿',
    title: '太古凶猿',
    description: '斗战圣猿一族的后裔，继承了该族好战的天性。他手持一根铁棍，战天斗地，从不知畏惧为何物，是纯粹的战斗疯子。',
    greeting: '斗战圣猿抡起铁棍，战意冲天："打！打！打！快跟我打一架！"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: 'douzhan_shengyuan_dlg_0',
        topic: '自我介绍',
        text: '"斗战圣猿，太古凶猿。"他淡淡道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'douzhan_shengyuan_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'douzhan_shengyuan_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'douzhan_shengyuan_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'douzhan_shengyuan_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'niumo_wang',
    name: '牛魔王',
    title: '大力牛魔',
    description: '妖族中以力量著称的牛魔之王，力大无穷，可拔山填海。他性格豪爽，重情重义，在妖族中极受爱戴。',
    greeting: '牛魔王鼻孔喷气，声如闷雷："哈哈哈！来喝酒！俺老牛最喜结交好汉！"',
    roomId: 'stone_kingdom_throne',
    dialogues: [
      {
        id: 'niumo_wang_dlg_0',
        topic: '自我介绍',
        text: '"牛魔王，大力牛魔。"他傲然道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'niumo_wang_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'niumo_wang_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'niumo_wang_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'niumo_wang_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'yutu_jing',
    name: '玉兔精',
    title: '月宫遗族',
    description: '据说是远古月宫遗留下来的玉兔一族后裔，通体雪白，灵动可爱。她精通月华之力，可治愈伤势，在妖族中极受欢迎。',
    greeting: '玉兔精红眼睛眨了眨，脆声道："你好呀，要尝尝我做的桂花糕吗？"',
    roomId: 'stone_kingdom_harem',
    dialogues: [
      {
        id: 'yutu_jing_dlg_0',
        topic: '自我介绍',
        text: '"玉兔精，月宫遗族。"他淡淡道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'yutu_jing_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'yutu_jing_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'yutu_jing_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'yutu_jing_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他轻笑一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'jiuwei_tianhu',
    name: '九尾天狐',
    title: '狐族至尊',
    description: '九尾天狐一族的至尊强者，拥有九条尾巴，每一条都代表一条命。她魅惑天成，可颠倒众生，是妖族中最危险也最美丽的存在。',
    greeting: '九尾天狐九条尾巴轻轻摇曳，媚眼如丝："小兄弟，可愿陪姐姐聊聊？"',
    roomId: 'stone_kingdom_treasure',
    dialogues: [
      {
        id: 'jiuwei_tianhu_dlg_0',
        topic: '自我介绍',
        text: '"九尾天狐，狐族至尊。"他淡淡道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'jiuwei_tianhu_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'jiuwei_tianhu_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'jiuwei_tianhu_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'jiuwei_tianhu_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他轻笑一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'heixiong_jing',
    name: '黑熊精',
    title: '熊岭霸主',
    description: '熊岭的霸主，本体是一头远古黑熊，皮糙肉厚，防御惊人。他看似憨厚，实则精明，将熊岭治理得井井有条。',
    greeting: '黑熊精挠了挠头，憨笑道：" visitors？俺熊岭欢迎来做客，管饱！"',
    roomId: 'stone_kingdom_flying_platform',
    dialogues: [
      {
        id: 'heixiong_jing_dlg_0',
        topic: '自我介绍',
        text: '"黑熊精，熊岭霸主。"他淡淡道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'heixiong_jing_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'heixiong_jing_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'heixiong_jing_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'heixiong_jing_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'baishe_furen',
    name: '白蛇夫人',
    title: '蛇族女王',
    description: '蛇族的女王，本体是一条修炼千年的白蛇，剧毒无比。她性情阴冷，喜怒无常，却在妖族中有极高的威望。',
    greeting: '白蛇夫人吐着信子，声音阴柔："嘶……人族的小家伙，你的血肉闻起来很香呢。"',
    roomId: 'beidou_star_field',
    dialogues: [
      {
        id: 'baishe_furen_dlg_0',
        topic: '自我介绍',
        text: '"白蛇夫人，蛇族女王。"他淡淡道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'baishe_furen_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'baishe_furen_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'baishe_furen_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'baishe_furen_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'jinwu_taizi',
    name: '金乌太子',
    title: '太阳遗族',
    description: '远古金乌一族的太子，体内流淌着太阳真血。他可化身为太阳，焚烧万物，是妖族中最具毁灭性的存在之一。',
    greeting: '金乌太子周身太阳真火燃烧，炽热逼人："靠近我，你会化为灰烬。"',
    roomId: 'huanggu_forbidden',
    dialogues: [
      {
        id: 'jinwu_taizi_dlg_0',
        topic: '自我介绍',
        text: '"金乌太子，太阳遗族。"他淡淡道："妖族自古便存于天地之间，何须人族认可。"',
      },
      {
        id: 'jinwu_taizi_dlg_1',
        topic: '问妖帝青帝',
        text: '"青帝，万古妖帝！以一株不死神药证道，开创妖族盛世。"他神色崇敬："我妖族大帝，不弱于人族任何古帝。"',
      },
      {
        id: 'jinwu_taizi_dlg_2',
        topic: '谈人妖关系',
        text: '"人族与妖族，自古纷争不断。"他沉声道："但并非不能共存。只要人族不犯我妖族，我妖族也不愿多生事端。"',
      },
      {
        id: 'jinwu_taizi_dlg_3',
        topic: '论妖族修炼',
        text: '"妖族修炼，重在本源觉醒。"他解释道："每一头妖兽体内都沉睡着远古血脉，唤醒它，便可获得毁天灭地的力量。"',
      },
      {
        id: 'jinwu_taizi_dlg_4',
        topic: '请求结盟',
        text: '"妖族从不轻易与人族结盟。"他冷哼一声："若你有足够的实力和诚意，可去天妖宫求见宫主。"',
      },
    ],
  },
  {
    id: 'shenzu_shengzi',
    name: '神族神子',
    title: '古族天骄',
    description: '太古神族的神子，生来便拥有神性血脉，被古族视为未来的希望。他高傲冷漠，视人族为蝼蚁，一心想要重现太古万族的辉煌。',
    greeting: '神族神子神光绕体，居高临下："卑微的人族，见到本神子为何不跪？"',
    roomId: 'yuhua_school',
    dialogues: [
      {
        id: 'shenzu_shengzi_dlg_0',
        topic: '自我介绍',
        text: '"神族神子，古族天骄。"他傲然道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'shenzu_shengzi_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'shenzu_shengzi_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'shenzu_shengzi_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'shenzu_shengzi_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'mozu_mozi',
    name: '魔族魔子',
    title: '魔道传人',
    description: '太古魔族的魔子，浑身魔气滔天，性格残忍嗜杀。他在古族中代表着最极端的力量，所到之处血流成河，令人闻风丧胆。',
    greeting: '魔族魔子舔了舔嘴唇，眼中血光闪烁："新鲜的血肉……闻起来很美味。"',
    roomId: 'beidou_city_gate',
    dialogues: [
      {
        id: 'mozu_mozi_dlg_0',
        topic: '自我介绍',
        text: '"魔族魔子，魔道传人。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'mozu_mozi_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'mozu_mozi_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'mozu_mozi_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'mozu_mozi_dlg_4',
        topic: '请求和平',
        text: '"和平？"他残忍一笑："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'xuehuang_shengzi',
    name: '血凰山圣子',
    title: '血凰传人',
    description: '血凰山一脉的圣子，本体是一只远古血凰的后裔。他可浴火重生，每一次死亡后都会变得更加强大，是不死鸟的传说化身。',
    greeting: '血凰山圣子周身血焰燃烧，声音尖锐："血凰不死，浴火重生！"',
    roomId: 'beidou_city_main_street',
    dialogues: [
      {
        id: 'xuehuang_shengzi_dlg_0',
        topic: '自我介绍',
        text: '"血凰山圣子，血凰传人。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'xuehuang_shengzi_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'xuehuang_shengzi_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'xuehuang_shengzi_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'xuehuang_shengzi_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'huolin_huangzi',
    name: '火麟洞皇子',
    title: '火麟传人',
    description: '火麟洞一脉的皇子，本体是一头火麒麟。他性格暴躁，一言不合便大打出手，是古族中最不好惹的存在之一。',
    greeting: '火麟洞皇子鼻孔喷火，怒道："看什么看？想打架吗？"',
    roomId: 'beidou_city_east_market',
    dialogues: [
      {
        id: 'huolin_huangzi_dlg_0',
        topic: '自我介绍',
        text: '"火麟洞皇子，火麟传人。"他傲然道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'huolin_huangzi_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'huolin_huangzi_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'huolin_huangzi_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'huolin_huangzi_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'huangjin_jinchi',
    name: '黄金族金翅',
    title: '黄金天骄',
    description: '黄金一族的年轻天骄，浑身如黄金浇铸，防御无双。黄金族以肉身强悍著称，他的身体比大多数神兵利器还要坚硬。',
    greeting: '黄金族金翅浑身金光灿灿，傲然道："黄金族肉身无双，你可敢与我一战？"',
    roomId: 'beidou_city_west_market',
    dialogues: [
      {
        id: 'huangjin_jinchi_dlg_0',
        topic: '自我介绍',
        text: '"黄金族金翅，黄金天骄。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'huangjin_jinchi_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'huangjin_jinchi_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'huangjin_jinchi_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'huangjin_jinchi_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'yinxue_shengnv',
    name: '银血族圣女',
    title: '银月传人',
    description: '银血一族的圣女，血液呈银色，拥有神秘的力量。她可操控月光，在月圆之夜实力暴涨，是古族中最神秘的女性天骄。',
    greeting: '银血族圣女银发飘飘，月光在她周身流转："月光之下，万物皆在我的掌控之中。"',
    roomId: 'beidou_imperial_city',
    dialogues: [
      {
        id: 'yinxue_shengnv_dlg_0',
        topic: '自我介绍',
        text: '"银血族圣女，银月传人。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'yinxue_shengnv_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'yinxue_shengnv_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'yinxue_shengnv_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'yinxue_shengnv_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'yanmo_zhanglao',
    name: '炎魔族长老',
    title: '炎魔大能',
    description: '炎魔一族的太上长老，浑身由岩浆构成，温度高得可怕。他存活了数万年，见证了太古万族从辉煌到沉寂的全过程。',
    greeting: '炎魔族长老周身岩浆翻滚，热浪逼人："人族……已经很多年没有见过活的了。"',
    roomId: 'beidou_imperial_palace',
    dialogues: [
      {
        id: 'yanmo_zhanglao_dlg_0',
        topic: '自我介绍',
        text: '"炎魔族长老，炎魔大能。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'yanmo_zhanglao_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'yanmo_zhanglao_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'yanmo_zhanglao_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'yanmo_zhanglao_dlg_4',
        topic: '请求和平',
        text: '"和平？"他残忍一笑："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'bingpo_shengzi',
    name: '冰魄族圣子',
    title: '冰魄传人',
    description: '冰魄一族的圣子，浑身散发着极寒之气，可冻结万物。他与火麟洞皇子是天生的死对头，水火不容，每次见面必有一战。',
    greeting: '冰魄族圣子周身冰霜凝结，冷声道："离我远点，你身上的热气让我恶心。"',
    roomId: 'beidou_sky_pavilion',
    dialogues: [
      {
        id: 'bingpo_shengzi_dlg_0',
        topic: '自我介绍',
        text: '"冰魄族圣子，冰魄传人。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'bingpo_shengzi_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'bingpo_shengzi_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'bingpo_shengzi_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'bingpo_shengzi_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'taitan_juren',
    name: '泰坦族巨人',
    title: '泰坦战神',
    description: '泰坦一族的巨人，身高百丈，力大无穷。泰坦族是古族中体型最大的种族，他们一脚可踏碎山岳，一拳可崩裂大地。',
    greeting: '泰坦族巨人俯视着你，声音如雷鸣："小不点，你还没有我的脚趾头高。"',
    roomId: 'huanggu_core',
    dialogues: [
      {
        id: 'taitan_juren_dlg_0',
        topic: '自我介绍',
        text: '"泰坦族巨人，泰坦战神。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'taitan_juren_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'taitan_juren_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'taitan_juren_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'taitan_juren_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'anying_cike',
    name: '暗影族刺客',
    title: '暗影之王',
    description: '暗影一族的王牌刺客，可隐匿于黑暗之中，杀人于无形。他是古族中最令人恐惧的存在之一，连各大皇族都不敢轻易招惹。',
    greeting: '黑暗中传来阴冷的声音，却不见人影："我已经在你身后了……"',
    roomId: 'huanggu_tomb',
    dialogues: [
      {
        id: 'anying_cike_dlg_0',
        topic: '自我介绍',
        text: '"暗影族刺客，暗影之王。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'anying_cike_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'anying_cike_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'anying_cike_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'anying_cike_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'guzu_zuwang',
    name: '古族祖王',
    title: '太古祖王',
    description: '从神源中解封出来的太古祖王，是古族真正的底蕴。他们存活了无尽岁月，实力深不可测，每一位出世都会引起天下大乱。',
    greeting: '古族祖王睁开万古未曾睁开的双眼，帝威弥漫："这一世……人族还有大帝吗？"',
    roomId: 'huanggu_lake',
    dialogues: [
      {
        id: 'guzu_zuwang_dlg_0',
        topic: '自我介绍',
        text: '"古族祖王，太古祖王。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'guzu_zuwang_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'guzu_zuwang_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'guzu_zuwang_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'guzu_zuwang_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'longzu_gongzhu',
    name: '龙族公主',
    title: '太古龙女',
    description: '太古真龙一族的公主，本体是一条银龙，美丽而强大。她在古族中地位尊崇，却对人族抱有一丝好奇，这在古族中极为罕见。',
    greeting: '龙族公主龙角晶莹，好奇地打量着你："人族……和古籍中记载的不太一样呢。"',
    roomId: 'xianyu_gate',
    dialogues: [
      {
        id: 'longzu_gongzhu_dlg_0',
        topic: '自我介绍',
        text: '"龙族公主，太古龙女。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'longzu_gongzhu_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'longzu_gongzhu_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'longzu_gongzhu_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'longzu_gongzhu_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'tiancan_zhanglao',
    name: '天蚕族长老',
    title: '天蚕古圣',
    description: '天蚕一族的古老圣人，可吐丝结茧，困杀强敌。他性格温和，不喜争斗，却为了保护族人不得不屡次出手。',
    greeting: '天蚕族长老缓缓吐出一缕蚕丝，叹息道："为何世间总有这么多纷争……"',
    roomId: 'xianyu_palace',
    dialogues: [
      {
        id: 'tiancan_zhanglao_dlg_0',
        topic: '自我介绍',
        text: '"天蚕族长老，天蚕古圣。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'tiancan_zhanglao_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'tiancan_zhanglao_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'tiancan_zhanglao_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'tiancan_zhanglao_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'leizu_shengzi',
    name: '雷族圣子',
    title: '雷霆传人',
    description: '雷族圣子，天生可掌控雷霆，被誉为雷神的化身。他性格火爆，嫉恶如仇，在古族年轻一代中实力名列前茅。',
    greeting: '雷族圣子周身雷电缠绕，噼啪作响："挡我者，天雷诛之！"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: 'leizu_shengzi_dlg_0',
        topic: '自我介绍',
        text: '"雷族圣子，雷霆传人。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'leizu_shengzi_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'leizu_shengzi_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'leizu_shengzi_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'leizu_shengzi_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'fengzu_shengnv',
    name: '风族圣女',
    title: '风神后裔',
    description: '风族圣女，身形如风，来无影去无踪。她速度无双，连许多老一辈强者都追不上她，是古族中最难缠的对手之一。',
    greeting: '一阵风吹过，风族圣女的身影若隐若现："你追不上我的，放弃吧。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: 'fengzu_shengnv_dlg_0',
        topic: '自我介绍',
        text: '"风族圣女，风神后裔。"他冷冷道："太古万族，才是这片天地真正的主人。"',
      },
      {
        id: 'fengzu_shengnv_dlg_1',
        topic: '问太古往事',
        text: '"太古时代，万族林立，人族不过是我等的食物。"他眼中闪过追忆："那时大帝辈出，是何等辉煌的岁月……"',
      },
      {
        id: 'fengzu_shengnv_dlg_2',
        topic: '谈古族苏醒',
        text: '"神源解封，大世降临。"他沉声道："我古族终将重现辉煌，重新执掌这片天地，人族的时代该结束了。"',
      },
      {
        id: 'fengzu_shengnv_dlg_3',
        topic: '论万族纷争',
        text: '"万族之间亦有纷争，并非铁板一块。"他坦言："但面对人族时，万族总会暂时放下恩怨，一致对外。"',
      },
      {
        id: 'fengzu_shengnv_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑一声："只有弱者才祈求和平。强者的和平，建立在弱者的尸骨之上。"',
      },
    ],
  },
  {
    id: 'daxia_huangzi',
    name: '大夏皇子',
    title: '中州皇族',
    description: '中州大夏皇朝的皇子，气质尊贵，龙气加身。大夏皇朝传承自远古皇朝，底蕴深厚，他自幼接受最好的教育，是中州最有权势的年轻人之一。',
    greeting: '大夏皇子龙袍加身，淡淡道："见本皇子为何不跪？罢了，免礼平身。"',
    roomId: 'stone_kingdom_zhuque',
    dialogues: [
      {
        id: 'daxia_huangzi_dlg_0',
        topic: '自我介绍',
        text: '"大夏皇子，中州皇族。"他傲然道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'daxia_huangzi_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'daxia_huangzi_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'daxia_huangzi_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'daxia_huangzi_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'guhua_gongzhu',
    name: '古华公主',
    title: '古华明珠',
    description: '中州古华皇朝的公主，才貌双全，精通琴棋书画。她看似柔弱，实则手腕强硬，在古华皇朝的政坛上有着不小的影响力。',
    greeting: '古华公主轻摇团扇，微微一笑："公子有礼了，本宫这厢有礼。"',
    roomId: 'stone_kingdom_east_market',
    dialogues: [
      {
        id: 'guhua_gongzhu_dlg_0',
        topic: '自我介绍',
        text: '"古华公主，古华明珠。"他淡淡道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'guhua_gongzhu_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'guhua_gongzhu_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'guhua_gongzhu_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'guhua_gongzhu_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'jiuli_huangzi',
    name: '九黎皇子',
    title: '九黎传人',
    description: '中州九黎皇朝的皇子，身材魁梧，浑身肌肉虬结。九黎皇朝尚武，他以武入道，一身战力在同代中罕有敌手。',
    greeting: '九黎皇子拍了拍结实的胸膛，爽朗道："来！跟本皇子喝一碗！"',
    roomId: 'stone_kingdom_west_market',
    dialogues: [
      {
        id: 'jiuli_huangzi_dlg_0',
        topic: '自我介绍',
        text: '"九黎皇子，九黎传人。"他傲然道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'jiuli_huangzi_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'jiuli_huangzi_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'jiuli_huangzi_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'jiuli_huangzi_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'daxia_huangzhu',
    name: '大夏皇主',
    title: '大夏人皇',
    description: '大夏皇朝当代皇主，九五之尊，统御亿万里山河。他坐在龙椅上，手握生杀大权，是中州最有权势的人，一言可决万人生死。',
    greeting: '大夏皇主端坐龙椅之上，威严道："宣！所奏何事？"',
    roomId: 'stone_kingdom_huji_tavern',
    dialogues: [
      {
        id: 'daxia_huangzhu_dlg_0',
        topic: '自我介绍',
        text: '"大夏皇主，大夏人皇。"他傲然道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'daxia_huangzhu_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'daxia_huangzhu_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'daxia_huangzhu_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'daxia_huangzhu_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'guhua_huangzhu',
    name: '古华皇主',
    title: '古华人皇',
    description: '古华皇朝当代皇主，儒雅斯文，实则城府极深。他将古华皇朝治理得井井有条，国力日渐强盛，是中州最受人尊敬的皇主之一。',
    greeting: '古华皇主放下手中奏折，温和道："爱卿平身，有何事禀报？"',
    roomId: 'stone_kingdom_wanjintang',
    dialogues: [
      {
        id: 'guhua_huangzhu_dlg_0',
        topic: '自我介绍',
        text: '"古华皇主，古华人皇。"他傲然道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'guhua_huangzhu_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'guhua_huangzhu_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'guhua_huangzhu_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'guhua_huangzhu_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'jiuli_huangzhu',
    name: '九黎皇主',
    title: '九黎人皇',
    description: '九黎皇朝当代皇主，体格魁梧，不怒自威。他是中州公认的战神，曾亲自率军征讨四方，为九黎皇朝开疆拓土。',
    greeting: '九黎皇主声如洪钟："好！来人，赐酒！朕要与壮士共饮！"',
    roomId: 'stone_kingdom_wanjintang_back',
    dialogues: [
      {
        id: 'jiuli_huangzhu_dlg_0',
        topic: '自我介绍',
        text: '"九黎皇主，九黎人皇。"他傲然道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'jiuli_huangzhu_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'jiuli_huangzhu_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'jiuli_huangzhu_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'jiuli_huangzhu_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'zhongzhou_taishi',
    name: '中州太师',
    title: '三朝元老',
    description: '中州三朝元老，侍奉过三代皇主，是中州朝廷的中流砥柱。他虽无惊天修为，却智谋无双，是皇主最信任的谋士。',
    greeting: '中州太师拄着拐杖，颤巍巍道："老夫活了太久，见惯了兴衰荣辱……"',
    roomId: 'stone_kingdom_dark_market',
    dialogues: [
      {
        id: 'zhongzhou_taishi_dlg_0',
        topic: '自我介绍',
        text: '"中州太师，三朝元老。"他淡淡道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'zhongzhou_taishi_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'zhongzhou_taishi_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'zhongzhou_taishi_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'zhongzhou_taishi_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他微微一笑："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'daxia_jiangjun',
    name: '大夏将军',
    title: '镇国大将',
    description: '大夏皇朝的镇国大将军，统领百万雄师，战功赫赫。他是大夏皇朝的军事支柱，一生未尝败绩，令敌国闻风丧胆。',
    greeting: '大夏将军甲胄在身，沉声道："军营重地，闲人免进！"',
    roomId: 'stone_kingdom_zuiyuefang',
    dialogues: [
      {
        id: 'daxia_jiangjun_dlg_0',
        topic: '自我介绍',
        text: '"大夏将军，镇国大将。"他淡淡道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'daxia_jiangjun_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'daxia_jiangjun_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'daxia_jiangjun_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'daxia_jiangjun_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'guhua_chengxiang',
    name: '古华丞相',
    title: '古华宰相',
    description: '古华皇朝的当朝丞相，一人之下万人之上。他精通治国之道，将古华皇朝治理得路不拾遗、夜不闭户，是千古名相。',
    greeting: '古华丞相手摇羽扇，微笑道："公子器宇不凡，可愿入朝为官？"',
    roomId: 'stone_kingdom_cangchun',
    dialogues: [
      {
        id: 'guhua_chengxiang_dlg_0',
        topic: '自我介绍',
        text: '"古华丞相，古华宰相。"他淡淡道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'guhua_chengxiang_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'guhua_chengxiang_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'guhua_chengxiang_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'guhua_chengxiang_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他微微一笑："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'jiuli_jisi',
    name: '九黎祭司',
    title: '九黎大祭司',
    description: '九黎皇朝的大祭司，掌管祭祀与占卜。他可与先祖沟通，预测吉凶，在九黎皇朝中地位尊崇，连皇主都要礼让三分。',
    greeting: '九黎祭司手持骨杖，念念有词："先祖有灵，示我以天机……"',
    roomId: 'stone_kingdom_cangchun_pool',
    dialogues: [
      {
        id: 'jiuli_jisi_dlg_0',
        topic: '自我介绍',
        text: '"九黎祭司，九黎大祭司。"他淡淡道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'jiuli_jisi_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'jiuli_jisi_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'jiuli_jisi_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'jiuli_jisi_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'zhongzhou_fuma',
    name: '中州驸马',
    title: '皇朝贵胄',
    description: '中州某皇朝的驸马，出身名门，才学出众。他娶了公主为妻，从此飞黄腾达，在皇朝中拥有不小的势力。',
    greeting: '中州驸马锦衣华服，拱手道："本驸马有礼了，不知阁下有何见教？"',
    roomId: 'stone_kingdom_yicui',
    dialogues: [
      {
        id: 'zhongzhou_fuma_dlg_0',
        topic: '自我介绍',
        text: '"中州驸马，皇朝贵胄。"他淡淡道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'zhongzhou_fuma_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'zhongzhou_fuma_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'zhongzhou_fuma_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'zhongzhou_fuma_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'daxia_gongzhu',
    name: '大夏公主',
    title: '大夏明珠',
    description: '大夏皇朝最受宠爱的公主，金枝玉叶，集万千宠爱于一身。她性格刁蛮任性，却心地善良，是皇主的心头肉。',
    greeting: '大夏公主娇哼一声，扬起下巴："见到本公主还不快跪下？"',
    roomId: 'stone_kingdom_zuixian',
    dialogues: [
      {
        id: 'daxia_gongzhu_dlg_0',
        topic: '自我介绍',
        text: '"大夏公主，大夏明珠。"他淡淡道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'daxia_gongzhu_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'daxia_gongzhu_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'daxia_gongzhu_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'daxia_gongzhu_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'guhua_shizi',
    name: '古华世子',
    title: '王府继承人',
    description: '古华皇朝某王府的世子，身份尊贵，前途无量。他自幼在皇宫中长大，见惯了权力斗争，深谙生存之道。',
    greeting: '古华世子彬彬有礼，却目光审视："阁下气质不凡，不知出自何门何派？"',
    roomId: 'stone_kingdom_taohua',
    dialogues: [
      {
        id: 'guhua_shizi_dlg_0',
        topic: '自我介绍',
        text: '"古华世子，王府继承人。"他淡淡道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'guhua_shizi_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'guhua_shizi_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'guhua_shizi_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'guhua_shizi_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'jiuli_zhanshen',
    name: '九黎战神',
    title: '九黎战神',
    description: '九黎皇朝公认的战神，一生杀敌无数，浑身杀气凝为实质。他是九黎皇朝军中的传奇，每个士兵都以他为偶像。',
    greeting: '九黎战神杀气腾腾，冷声道："战场上，没有朋友，只有敌人。"',
    roomId: 'stone_kingdom_fang_01',
    dialogues: [
      {
        id: 'jiuli_zhanshen_dlg_0',
        topic: '自我介绍',
        text: '"九黎战神，九黎战神。"他淡淡道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'jiuli_zhanshen_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'jiuli_zhanshen_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'jiuli_zhanshen_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'jiuli_zhanshen_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'zhongzhou_taijian',
    name: '中州太监总管',
    title: '内廷总管',
    description: '中州皇朝的内廷太监总管，服侍皇主多年，深得信任。他在后宫中权势极大，虽无修为，却可左右许多人的命运。',
    greeting: '中州太监总管尖着嗓子道："圣旨到——还不跪下接旨？"',
    roomId: 'stone_kingdom_fang_02',
    dialogues: [
      {
        id: 'zhongzhou_taijian_dlg_0',
        topic: '自我介绍',
        text: '"中州太监总管，内廷总管。"他淡淡道："中州皇朝，统御亿万里山河，岂是寻常势力可比。"',
      },
      {
        id: 'zhongzhou_taijian_dlg_1',
        topic: '问皇朝历史',
        text: '"我朝传承久远，历经无数风雨而不倒。"他自豪道："历代皇主皆是一代人杰，留下了不朽的功业。"',
      },
      {
        id: 'zhongzhou_taijian_dlg_2',
        topic: '谈治国之道',
        text: '"治国如烹小鲜，需谨慎行事。"他沉吟道："既要安抚百姓，又要提防外敌，还要平衡朝中势力，谈何容易。"',
      },
      {
        id: 'zhongzhou_taijian_dlg_3',
        topic: '论中州局势',
        text: '"中州看似平静，实则暗流涌动。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'zhongzhou_taijian_dlg_4',
        topic: '请求封赏',
        text: '"想要封赏？"他挑眉："需有功于社稷。只要你能立下大功，皇朝必不相负。"',
      },
    ],
  },
  {
    id: 'shijia_mouni',
    name: '释迦牟尼',
    title: '佛门世尊',
    description: '西漠佛教的创始人，传说来自遥远的星空彼岸。他以无上大智慧创立佛门，普度众生，是西漠亿万佛徒心中的至高无上的存在。',
    greeting: '释迦牟尼拈花微笑，佛光普照："众生皆苦，我佛慈悲。"',
    roomId: 'stone_kingdom_fang_03',
    dialogues: [
      {
        id: 'shijia_mouni_dlg_0',
        topic: '自我介绍',
        text: '"释迦牟尼，佛门世尊。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'shijia_mouni_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'shijia_mouni_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'shijia_mouni_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'shijia_mouni_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'emituo_shengseng',
    name: '阿弥陀圣僧',
    title: '净土宗师',
    description: '西漠佛教净土宗的宗师，专修往生之法，可助人超脱轮回。他一生诵念佛号无数，佛号声可净化心灵、驱除邪魔。',
    greeting: '阿弥陀圣僧双手合十，低声诵道："阿弥陀佛，施主与我佛有缘。"',
    roomId: 'stone_kingdom_bishui_yuan',
    dialogues: [
      {
        id: 'emituo_shengseng_dlg_0',
        topic: '自我介绍',
        text: '"阿弥陀圣僧，净土宗师。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'emituo_shengseng_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'emituo_shengseng_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'emituo_shengseng_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'emituo_shengseng_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'mile_fozhu',
    name: '弥勒佛主',
    title: '未来佛主',
    description: '西漠佛教中代表未来的佛主，大肚能容，笑口常开。他看似嘻嘻哈哈，实则佛法高深，是未来可成佛的存在。',
    greeting: '弥勒佛主哈哈大笑，拍了拍大肚子："施主莫急，来来来，先吃颗佛珠糖。"',
    roomId: 'stone_kingdom_fang_04',
    dialogues: [
      {
        id: 'mile_fozhu_dlg_0',
        topic: '自我介绍',
        text: '"弥勒佛主，未来佛主。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'mile_fozhu_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'mile_fozhu_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'mile_fozhu_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'mile_fozhu_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'damo_shengseng',
    name: '达摩圣僧',
    title: '禅宗祖师',
    description: '西漠佛教禅宗的祖师，面壁九年，一朝悟道。他创立了以心传心的禅宗法门，不立文字，直指人心，见性成佛。',
    greeting: '达摩圣僧闭目打坐，淡淡道："施主心中纷扰，何不坐下静思片刻？"',
    roomId: 'stone_kingdom_yaotai',
    dialogues: [
      {
        id: 'damo_shengseng_dlg_0',
        topic: '自我介绍',
        text: '"达摩圣僧，禅宗祖师。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'damo_shengseng_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'damo_shengseng_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'damo_shengseng_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'damo_shengseng_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'jingang_luohan',
    name: '金刚罗汉',
    title: '护法金刚',
    description: '西漠佛教的护法罗汉，浑身金光灿灿，力大无穷。他负责守护佛寺安全，降妖伏魔，是佛门最坚固的屏障。',
    greeting: '金刚罗汉怒目圆睁，声如雷鸣："佛门清净地，妖邪速退！"',
    roomId: 'stone_kingdom_yaotai_food',
    dialogues: [
      {
        id: 'jingang_luohan_dlg_0',
        topic: '自我介绍',
        text: '"金刚罗汉，护法金刚。"他声如洪钟地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'jingang_luohan_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'jingang_luohan_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'jingang_luohan_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'jingang_luohan_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'kuxing_seng',
    name: '苦行僧',
    title: '苦修尊者',
    description: '西漠佛教中以苦行闻名的尊者，赤脚行走千里，餐风饮露。他相信苦难可净化罪孽，是佛门中最令人敬佩的修行者。',
    greeting: '苦行僧脚上满是血泡，却神色平静："苦难是修行，施主可愿同行？"',
    roomId: 'stone_kingdom_yaotai_discuss',
    dialogues: [
      {
        id: 'kuxing_seng_dlg_0',
        topic: '自我介绍',
        text: '"苦行僧，苦修尊者。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'kuxing_seng_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'kuxing_seng_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'kuxing_seng_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'kuxing_seng_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'zangjingge_zhanglao',
    name: '藏经阁长老',
    title: '藏经阁守',
    description: '守护西漠佛教藏经阁的长老，博览群经，通晓佛法。他一生与经书为伴，是佛门中最有学问的人之一。',
    greeting: '藏经阁长老从书卷中抬头，微笑道："施主想读哪部经书？老衲为你取来。"',
    roomId: 'stone_kingdom_yaotai_pool',
    dialogues: [
      {
        id: 'zangjingge_zhanglao_dlg_0',
        topic: '自我介绍',
        text: '"藏经阁长老，藏经阁守。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'zangjingge_zhanglao_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'zangjingge_zhanglao_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'zangjingge_zhanglao_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'zangjingge_zhanglao_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'fangsheng_sengren',
    name: '放生僧人',
    title: '慈悲僧人',
    description: '西漠佛教中以放生闻名的僧人，常年购买被捕的生灵放归自然。他相信每一条生命都值得尊重，是佛门慈悲的化身。',
    greeting: '放生僧人提着一笼小鸟，笑道："今日又救了数十条性命，善哉善哉。"',
    roomId: 'stone_kingdom_culture_plaza',
    dialogues: [
      {
        id: 'fangsheng_sengren_dlg_0',
        topic: '自我介绍',
        text: '"放生僧人，慈悲僧人。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'fangsheng_sengren_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'fangsheng_sengren_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'fangsheng_sengren_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'fangsheng_sengren_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'jiangmo_gaoseng',
    name: '降魔高僧',
    title: '降魔尊者',
    description: '西漠佛教中专修降魔之术的高僧，手持降魔杵，可镇压一切邪魔外道。他是佛门中的战斗僧，曾多次与妖魔鬼怪交手。',
    greeting: '降魔高僧手持降魔杵，佛光大盛："妖孽，吃我一杵！"',
    roomId: 'stone_kingdom_imperial_gate',
    dialogues: [
      {
        id: 'jiangmo_gaoseng_dlg_0',
        topic: '自我介绍',
        text: '"降魔高僧，降魔尊者。"他声如洪钟地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'jiangmo_gaoseng_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'jiangmo_gaoseng_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'jiangmo_gaoseng_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'jiangmo_gaoseng_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'saodi_seng',
    name: '扫地僧',
    title: '无名老僧',
    description: '西漠某座佛寺中扫地的老僧，默默无闻，看似普通。但据说他的佛法修为深不可测，只是不愿显露罢了。',
    greeting: '扫地僧头也不抬，继续扫地："施主请自便，老衲只是扫地的。"',
    roomId: 'stone_kingdom_imperial_city',
    dialogues: [
      {
        id: 'saodi_seng_dlg_0',
        topic: '自我介绍',
        text: '"扫地僧，无名老僧。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'saodi_seng_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'saodi_seng_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'saodi_seng_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'saodi_seng_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'nigu_anzhu',
    name: '尼姑庵主',
    title: '净庵住持',
    description: '西漠某座尼姑庵的住持，戒律森严，佛法精深。她将庵中打理得井井有条，是西漠女尼中的楷模。',
    greeting: '尼姑庵主手持念珠，平静道："女施主请入内，男施主请留步。"',
    roomId: 'stone_kingdom_jiaofangsi',
    dialogues: [
      {
        id: 'nigu_anzhu_dlg_0',
        topic: '自我介绍',
        text: '"尼姑庵主，净庵住持。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'nigu_anzhu_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'nigu_anzhu_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'nigu_anzhu_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'nigu_anzhu_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'zhuanshi_lingtong',
    name: '转世灵童',
    title: '活佛转世',
    description: '西漠佛教中转世归来的灵童，虽年幼却拥有前世记忆。他是佛门中的特殊存在，被视为活佛再世，深受信徒爱戴。',
    greeting: '转世灵童天真一笑，眼中却有沧桑："这一世，我又回来了。"',
    roomId: 'stone_kingdom_feiyinge',
    dialogues: [
      {
        id: 'zhuanshi_lingtong_dlg_0',
        topic: '自我介绍',
        text: '"转世灵童，活佛转世。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'zhuanshi_lingtong_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'zhuanshi_lingtong_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'zhuanshi_lingtong_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'zhuanshi_lingtong_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'fomen_xingzhe',
    name: '佛门行者',
    title: '游方僧人',
    description: '西漠佛教中游历四方的行者，云游天下，普度众生。他踏遍了西漠的每一寸土地，是佛门中最了解世间疾苦的人。',
    greeting: '佛门行者背着行囊，微笑道："施主，可有一口斋饭施舍？"',
    roomId: 'stone_kingdom_feiyinge_2',
    dialogues: [
      {
        id: 'fomen_xingzhe_dlg_0',
        topic: '自我介绍',
        text: '"佛门行者，游方僧人。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'fomen_xingzhe_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'fomen_xingzhe_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'fomen_xingzhe_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'fomen_xingzhe_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'mizong_shangshi',
    name: '密宗上师',
    title: '密宗法王',
    description: '西漠佛教密宗的上师，精通各种密宗法门，可召唤护法神明。他在密宗中地位极高，是密宗弟子心中的神明化身。',
    greeting: '密宗上师手持法轮，神秘道："密宗之法，不可轻传。施主可愿皈依？"',
    roomId: 'stone_kingdom_feiyinge_3',
    dialogues: [
      {
        id: 'mizong_shangshi_dlg_0',
        topic: '自我介绍',
        text: '"密宗上师，密宗法王。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'mizong_shangshi_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'mizong_shangshi_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'mizong_shangshi_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'mizong_shangshi_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他神秘一笑："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'bianjing_gaoseng',
    name: '辩经高僧',
    title: '辩经大师',
    description: '西漠佛教中以辩经闻名的高僧，口若悬河，无人能敌。他精通佛理，可驳倒一切外道邪说，是佛门中的智者。',
    greeting: '辩经高僧微微一笑，自信满满："施主有何疑惑？老衲为你一一解答。"',
    roomId: 'stone_kingdom_baixipeng',
    dialogues: [
      {
        id: 'bianjing_gaoseng_dlg_0',
        topic: '自我介绍',
        text: '"辩经高僧，辩经大师。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'bianjing_gaoseng_dlg_1',
        topic: '问佛门历史',
        text: '"佛门传承久远，自远古便有佛陀出世。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海。"',
      },
      {
        id: 'bianjing_gaoseng_dlg_2',
        topic: '谈佛法修行',
        text: '"佛法修行，重在心性。"他缓缓道："心中有佛，处处是净土；心中无佛，纵在灵山也枉然。"',
      },
      {
        id: 'bianjing_gaoseng_dlg_3',
        topic: '论因果轮回',
        text: '"因果循环，报应不爽。"他沉声道："前世因，今世果。施主今生种种，皆是前世所造。"',
      },
      {
        id: 'bianjing_gaoseng_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'yuan_tianshi',
    name: '源天师',
    title: '寻源宗师',
    description: '源天师一脉的当代传人，可寻龙点穴，观源识宝。他一双慧眼可看穿大地，找到深埋地下的神源和宝物，是各大势力争相拉拢的对象。',
    greeting: '源天师手持罗盘，目光如炬："地下有宝，这位道友可有兴趣？"',
    roomId: 'stone_kingdom_ministries',
    dialogues: [
      {
        id: 'yuan_tianshi_dlg_0',
        topic: '自我介绍',
        text: '"源天师，寻源宗师。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'yuan_tianshi_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'yuan_tianshi_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'yuan_tianshi_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'yuan_tianshi_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'yuan_shushi',
    name: '源术师',
    title: '源术大家',
    description: '精通源术的大家，虽不如源天师那样登峰造极，却也是一代宗师。他常年出入各大赌石坊，以源术赌石，输赢参半，名声不小。',
    greeting: '源术师摩挲着一块原石，喃喃道："这块……有货，但不大……"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: 'yuan_shushi_dlg_0',
        topic: '自我介绍',
        text: '"源术师，源术大家。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'yuan_shushi_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'yuan_shushi_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'yuan_shushi_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'yuan_shushi_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'dushi_fangzhu',
    name: '赌石坊主',
    title: '石坊之主',
    description: '某座赌石坊的主人，精明圆滑，阅人无数。他见惯了因赌石一夜暴富或倾家荡产的人，对人性有着深刻的理解。',
    greeting: '赌石坊主满脸堆笑，热情地招呼："来来来，新到的原石，切开必有惊喜！"',
    roomId: 'stone_kingdom_scripture',
    dialogues: [
      {
        id: 'dushi_fangzhu_dlg_0',
        topic: '自我介绍',
        text: '"赌石坊主，石坊之主。"他热情地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'dushi_fangzhu_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'dushi_fangzhu_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'dushi_fangzhu_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'dushi_fangzhu_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'xun_yuanren',
    name: '寻源人',
    title: '荒野寻源者',
    description: '常年在荒野中游荡的寻源人，风餐露宿，以寻找源石为生。他熟悉每一条山脉的走势，知道哪里可能埋藏着宝物。',
    greeting: '寻源人满身泥土，兴奋地喊道："我找到了！好大一块源石！"',
    roomId: 'stone_kingdom_technique',
    dialogues: [
      {
        id: 'xun_yuanren_dlg_0',
        topic: '自我介绍',
        text: '"寻源人，荒野寻源者。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'xun_yuanren_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'xun_yuanren_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'xun_yuanren_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'xun_yuanren_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'yuan_houren',
    name: '源天师后人',
    title: '源术传人',
    description: '源天师一脉的后人，自幼学习源术，天赋出众。她继承了先辈的遗志，立志将源天师一脉发扬光大，重现昔日荣光。',
    greeting: '源天师后人手持古籍，坚定道："我定要成为新一代源天师！"',
    roomId: 'stone_kingdom_prince_mansion',
    dialogues: [
      {
        id: 'yuan_houren_dlg_0',
        topic: '自我介绍',
        text: '"源天师后人，源术传人。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'yuan_houren_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'yuan_houren_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'yuan_houren_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'yuan_houren_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'lao_yuanshi',
    name: '老源师',
    title: '年迈源师',
    description: '年迈的源术师，经验丰富，却因年老体衰无法再深入荒野。他将自己的经验传授给年轻人，是源术界最受尊敬的长者。',
    greeting: '老源师咳嗽几声，缓缓道："年轻人，源术之道，在于观势、察气、辨纹……"',
    roomId: 'stone_kingdom_palace_gate',
    dialogues: [
      {
        id: 'lao_yuanshi_dlg_0',
        topic: '自我介绍',
        text: '"老源师，年迈源师。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'lao_yuanshi_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'lao_yuanshi_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'lao_yuanshi_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'lao_yuanshi_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'yuanshi_shangren',
    name: '源石商人',
    title: '石料商人',
    description: '专门贩卖源石和原石的商人，走南闯北，消息灵通。他知道哪里的源石质量好，哪里的价格低，是赌石者的知音。',
    greeting: '源石商人拍着胸脯保证："我这些石头，都是从最好的矿脉运来的，假一赔十！"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: 'yuanshi_shangren_dlg_0',
        topic: '自我介绍',
        text: '"源石商人，石料商人。"他热情地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'yuanshi_shangren_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'yuanshi_shangren_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'yuanshi_shangren_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'yuanshi_shangren_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'qieshi_shifu',
    name: '切石师傅',
    title: '解石匠人',
    description: '专门负责切开原石的师傅，手法精湛，经验丰富。一块原石在他手中，可完整取出内部的源石，不会造成任何损伤。',
    greeting: '切石师傅手持切刀，神情专注："别吵，我要下刀了……"',
    roomId: 'stone_kingdom_throne',
    dialogues: [
      {
        id: 'qieshi_shifu_dlg_0',
        topic: '自我介绍',
        text: '"切石师傅，解石匠人。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'qieshi_shifu_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'qieshi_shifu_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'qieshi_shifu_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'qieshi_shifu_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'yuanwen_yanjiu',
    name: '源纹研究者',
    title: '源纹学者',
    description: '专门研究源纹的学者，对源石上的纹路有着独到的见解。他可通过源纹判断源石内部的品质，准确率极高。',
    greeting: '源纹研究者推了推眼镜，兴奋道："这纹路……太神奇了，我从未见过！"',
    roomId: 'stone_kingdom_harem',
    dialogues: [
      {
        id: 'yuanwen_yanjiu_dlg_0',
        topic: '自我介绍',
        text: '"源纹研究者，源纹学者。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'yuanwen_yanjiu_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'yuanwen_yanjiu_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'yuanwen_yanjiu_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'yuanwen_yanjiu_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'yuan_zhinian',
    name: '源天师执念',
    title: '远古残魂',
    description: '远古源天师留下的一缕残魂，飘荡在天地之间。他承载着远古源天师的记忆和执念，等待着有缘人继承他的衣钵。',
    greeting: '一道虚幻的身影浮现，声音缥缈："寻源……觅道……传承……不可断……"',
    roomId: 'stone_kingdom_treasure',
    dialogues: [
      {
        id: 'yuan_zhinian_dlg_0',
        topic: '自我介绍',
        text: '"源天师执念，远古残魂。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'yuan_zhinian_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'yuan_zhinian_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'yuan_zhinian_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'yuan_zhinian_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他虚幻的身影微微波动："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'lao_xiazi',
    name: '老瞎子',
    title: '盗墓宗师',
    description: '一个瞎眼的老者，看似普通，实则精通盗墓之术。他与段德并称盗墓双绝，一生挖过的古墓不计其数，连大帝陵寝都敢下手。',
    greeting: '老瞎子摸索着拐杖，嘿嘿笑道："小友身上的阴气不轻，可是下过墓了？"',
    roomId: 'stone_kingdom_flying_platform',
    dialogues: [
      {
        id: 'lao_xiazi_dlg_0',
        topic: '自我介绍',
        text: '"老瞎子，盗墓宗师。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'lao_xiazi_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'lao_xiazi_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'lao_xiazi_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'lao_xiazi_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'wei_yi',
    name: '卫易',
    title: '天璇圣人',
    description: '天璇圣地的老圣人，六千年前的人物，从神源中苏醒。他见证了天璇圣地的辉煌与覆灭，一生悲苦，却始终守护着故土。',
    greeting: '卫易老圣人眸中泪光闪烁："天璇……我的天璇啊……"',
    roomId: 'beidou_star_field',
    dialogues: [
      {
        id: 'wei_yi_dlg_0',
        topic: '自我介绍',
        text: '"卫易，天璇圣人。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'wei_yi_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'wei_yi_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'wei_yi_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'wei_yi_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'lao_daobazi',
    name: '老刀把子',
    title: '杀圣传人',
    description: '人世间杀圣联盟的传人，一生在刀口上舔血。他看似粗犷，实则心思缜密，是杀手界活着的传奇，令无数强者胆寒。',
    greeting: '老刀把子把玩着匕首，淡淡道："买命还是卖命？我这儿都接。"',
    roomId: 'huanggu_forbidden',
    dialogues: [
      {
        id: 'lao_daobazi_dlg_0',
        topic: '自我介绍',
        text: '"老刀把子，杀圣传人。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'lao_daobazi_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'lao_daobazi_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'lao_daobazi_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'lao_daobazi_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'tu_tian',
    name: '涂天',
    title: '大能涂天',
    description: '北域十三大寇之一，实力强大，性情豪爽。他与叶凡交好，多次出手相助，是北域散修中的代表人物，威名远播。',
    greeting: '涂天大笑一声，拍了拍你的肩膀："小子，有胆识！老夫喜欢你！"',
    roomId: 'yuhua_school',
    dialogues: [
      {
        id: 'tu_tian_dlg_0',
        topic: '自我介绍',
        text: '"涂天，大能涂天。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'tu_tian_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'tu_tian_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'tu_tian_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'tu_tian_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'li_heng',
    name: '李恒',
    title: '阴阳老怪',
    description: '修炼阴阳之术的老怪物，性格古怪，喜怒无常。他精通阴阳变化，可男可女，可老可少，令人捉摸不透。',
    greeting: '李恒的声音忽男忽女，诡异至极："你觉得……我是男是女？"',
    roomId: 'beidou_city_gate',
    dialogues: [
      {
        id: 'li_heng_dlg_0',
        topic: '自我介绍',
        text: '"李恒，阴阳老怪。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'li_heng_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'li_heng_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'li_heng_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'li_heng_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'huohuashi_jia',
    name: '活化石甲',
    title: '世家活化石',
    description: '某荒古世家的活化石，从神源中解封而出。他见证了家族数个时代的兴衰，是家族最古老的存在，也是最后的底牌。',
    greeting: '活化石甲缓缓睁开双眼，浑浊的眸子中闪过精光："多少年了……终于又见到了阳光。"',
    roomId: 'beidou_city_main_street',
    dialogues: [
      {
        id: 'huohuashi_jia_dlg_0',
        topic: '自我介绍',
        text: '"活化石甲，世家活化石。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'huohuashi_jia_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'huohuashi_jia_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'huohuashi_jia_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'huohuashi_jia_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'huohuashi_yi',
    name: '活化石乙',
    title: '圣地活化石',
    description: '某圣地的活化石，封印了无尽岁月。他对圣地的感情深厚，愿意为圣地付出一切，包括自己的生命。',
    greeting: '活化石乙环视四周，感慨道："圣地还在……好，很好……"',
    roomId: 'beidou_city_east_market',
    dialogues: [
      {
        id: 'huohuashi_yi_dlg_0',
        topic: '自我介绍',
        text: '"活化石乙，圣地活化石。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'huohuashi_yi_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'huohuashi_yi_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'huohuashi_yi_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'huohuashi_yi_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'guzu_laowang',
    name: '古族老王',
    title: '太古王族',
    description: '从神源中解封出来的太古王族，实力恐怖。他在太古时代便是王者，如今苏醒，对这个世界充满了好奇与敌意。',
    greeting: '古族老王嗅了嗅空气，皱眉道："这个世界的气息……变了，变得让我厌恶。"',
    roomId: 'beidou_city_west_market',
    dialogues: [
      {
        id: 'guzu_laowang_dlg_0',
        topic: '自我介绍',
        text: '"古族老王，太古王族。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'guzu_laowang_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'guzu_laowang_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'guzu_laowang_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'guzu_laowang_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'jinqushou_huzhe',
    name: '禁区守护者',
    title: '禁区看门人',
    description: '某生命禁区的守护者，世代守护禁区入口，防止外人进入。他对禁区的秘密了如指掌，却从不对外人透露半分。',
    greeting: '禁区守护者挡在路口，面无表情："前方禁区，擅入者死。"',
    roomId: 'beidou_imperial_city',
    dialogues: [
      {
        id: 'jinqushou_huzhe_dlg_0',
        topic: '自我介绍',
        text: '"禁区守护者，禁区看门人。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'jinqushou_huzhe_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'jinqushou_huzhe_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'jinqushou_huzhe_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'jinqushou_huzhe_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'shenmi_laoren',
    name: '神秘老人',
    title: '无名老者',
    description: '来历不明的神秘老人，无人知道他的姓名和来历。他出现在各种关键时刻，给予年轻人指点，然后消失无踪。',
    greeting: '神秘老人捋着胡须，微笑道："年轻人，我看你骨骼清奇，是个修道的好苗子。"',
    roomId: 'beidou_imperial_palace',
    dialogues: [
      {
        id: 'shenmi_laoren_dlg_0',
        topic: '自我介绍',
        text: '"神秘老人，无名老者。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'shenmi_laoren_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'shenmi_laoren_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'shenmi_laoren_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'shenmi_laoren_dlg_4',
        topic: '请求指点',
        text: '"指点？"他神秘一笑："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'feng_laoren',
    name: '疯老人',
    title: '疯癫圣人',
    description: '一位疯疯癫癫的老圣人，时清醒时糊涂。清醒时佛法无边，糊涂时胡言乱语。他是佛门中的异类，却深受百姓爱戴。',
    greeting: '疯老人手舞足蹈，哈哈大笑："我是佛！我是魔！哈哈哈！都不是！"',
    roomId: 'beidou_sky_pavilion',
    dialogues: [
      {
        id: 'feng_laoren_dlg_0',
        topic: '自我介绍',
        text: '"疯老人，疯癫圣人。"他疯疯癫癫地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'feng_laoren_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'feng_laoren_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'feng_laoren_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'feng_laoren_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'lao_shenyi',
    name: '老神医',
    title: '医道圣手',
    description: '医术通神的老者，可生死人肉白骨。他一生救死扶伤无数，从不问对方身份，只问病情，是世间最受人尊敬的老人。',
    greeting: '老神医把了把你的脉，皱眉道："气血两虚，经脉滞涩，最近可是太拼命了？"',
    roomId: 'huanggu_core',
    dialogues: [
      {
        id: 'lao_shenyi_dlg_0',
        topic: '自我介绍',
        text: '"老神医，医道圣手。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'lao_shenyi_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'lao_shenyi_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'lao_shenyi_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'lao_shenyi_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'lao_zhujianshi',
    name: '老铸剑师',
    title: '铸剑宗师',
    description: '一生铸剑无数的老铸剑师，每一把剑都是精品。他可将修士的道与剑完美融合，铸出有灵性的神兵利器。',
    greeting: '老铸剑师锤打着烧红的铁块，头也不抬："想要好剑？先告诉我你的道是什么。"',
    roomId: 'huanggu_tomb',
    dialogues: [
      {
        id: 'lao_zhujianshi_dlg_0',
        topic: '自我介绍',
        text: '"老铸剑师，铸剑宗师。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'lao_zhujianshi_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'lao_zhujianshi_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'lao_zhujianshi_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'lao_zhujianshi_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'lao_yufu',
    name: '老渔夫',
    title: '渔翁圣人',
    description: '表面上是一个普通的渔夫，实则是一位隐世的圣人。他每日垂钓江边，以钓鱼修身养性，感悟天地大道。',
    greeting: '老渔夫提起鱼竿，一条金鳞跃出水面："不急不急，鱼儿上钩，需耐心等待。"',
    roomId: 'huanggu_lake',
    dialogues: [
      {
        id: 'lao_yufu_dlg_0',
        topic: '自我介绍',
        text: '"老渔夫，渔翁圣人。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'lao_yufu_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'lao_yufu_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'lao_yufu_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'lao_yufu_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'lao_qinshi',
    name: '老琴师',
    title: '琴道宗师',
    description: '以琴入道的老者，一曲琴音可动天地。他的琴声可安抚人心，也可杀人于无形，是音律之道的巅峰存在。',
    greeting: '老琴师拨动琴弦，悠扬的琴声响起："听，这是山水的声音，也是大道的声音。"',
    roomId: 'xianyu_gate',
    dialogues: [
      {
        id: 'lao_qinshi_dlg_0',
        topic: '自我介绍',
        text: '"老琴师，琴道宗师。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'lao_qinshi_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'lao_qinshi_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'lao_qinshi_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'lao_qinshi_dlg_4',
        topic: '请求指点',
        text: '"指点？"他咳嗽几声："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'hua_yunfei',
    name: '华云飞',
    title: '太玄琴师',
    description: '太玄门的绝世天才，以琴音入道，气质出尘。他看似温文尔雅，实则身负吞天魔功，是年轻一代中最令人惋惜的悲剧人物。',
    greeting: '华云飞抚琴而坐，淡淡一笑："兄台可懂音律？愿闻一曲否？"',
    roomId: 'xianyu_palace',
    dialogues: [
      {
        id: 'hua_yunfei_dlg_0',
        topic: '自我介绍',
        text: '"华云飞，太玄琴师。"他微笑道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'hua_yunfei_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'hua_yunfei_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'hua_yunfei_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'hua_yunfei_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他淡淡一笑："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'li_xiaoman',
    name: '李小曼',
    title: '太玄传人',
    description: '叶凡的故人，后来加入太玄门，走上了一条与叶凡截然不同的道路。她性格坚韧，不甘人后，却在命运面前显得如此渺小。',
    greeting: '李小曼神色复杂，轻声道："你也来了……这个世界，真的很小。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: 'li_xiaoman_dlg_0',
        topic: '自我介绍',
        text: '"李小曼，太玄传人。"他微笑道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'li_xiaoman_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'li_xiaoman_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'li_xiaoman_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'li_xiaoman_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'pang_bo',
    name: '庞博',
    title: '妖神后裔',
    description: '叶凡最好的朋友，后被妖帝十九世孙夺舍，经历了常人难以想象的磨难。他性格豪爽，重情重义，是叶凡最信任的兄弟。',
    greeting: '庞博大笑着拍了拍你的肩膀："兄弟！好久不见！走，喝酒去！"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: 'pang_bo_dlg_0',
        topic: '自我介绍',
        text: '"庞博，妖神后裔。"他微笑道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'pang_bo_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'pang_bo_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'pang_bo_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'pang_bo_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'zhang_ziling',
    name: '张子陵',
    title: '张家天骄',
    description: '中州张家的天才少年，精通阵法之道。他布下的阵法鬼神莫测，连老一辈强者都忌惮三分，是年轻一代的阵法宗师。',
    greeting: '张子陵手中阵旗挥舞，微笑道："敢入我阵中一试吗？"',
    roomId: 'stone_kingdom_zhuque',
    dialogues: [
      {
        id: 'zhang_ziling_dlg_0',
        topic: '自我介绍',
        text: '"张子陵，张家天骄。"他微笑道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'zhang_ziling_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'zhang_ziling_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'zhang_ziling_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'zhang_ziling_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'wang_teng',
    name: '王腾',
    title: '北帝王腾',
    description: '北原王家的人，被誉为北帝，自幼便展现出惊人的天赋。他身负大帝传承，志向远大，却在与叶凡的争锋中逐渐迷失自我。',
    greeting: '王腾眸光如电，傲然道："我王腾，有大帝之资！"',
    roomId: 'stone_kingdom_east_market',
    dialogues: [
      {
        id: 'wang_teng_dlg_0',
        topic: '自我介绍',
        text: '"王腾，北帝王腾。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'wang_teng_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'wang_teng_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'wang_teng_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'wang_teng_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'an_miaoyi',
    name: '安妙依',
    title: '妙欲庵主',
    description: '妙欲庵的当代传人，美丽妖娆，风情万种。她看似放荡不羁，实则洁身自好，一心向道，最终为叶凡献出了生命。',
    greeting: '安妙依倚栏而笑，眼波流转："公子，可愿与奴家共参大道？"',
    roomId: 'stone_kingdom_west_market',
    dialogues: [
      {
        id: 'an_miaoyi_dlg_0',
        topic: '自我介绍',
        text: '"安妙依，妙欲庵主。"他微笑道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'an_miaoyi_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'an_miaoyi_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'an_miaoyi_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'an_miaoyi_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他淡淡一笑："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'qin_yao',
    name: '秦瑶',
    title: '妖族公主',
    description: '妖族中的天才少女，活泼可爱，敢爱敢恨。她与叶凡有过一段情缘，却在修炼中香消玉殒，令人扼腕叹息。',
    greeting: '秦瑶叉着腰，娇嗔道："看什么看？没见过美女啊？"',
    roomId: 'stone_kingdom_huji_tavern',
    dialogues: [
      {
        id: 'qin_yao_dlg_0',
        topic: '自我介绍',
        text: '"秦瑶，妖族公主。"他微笑道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'qin_yao_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'qin_yao_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'qin_yao_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'qin_yao_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'yan_ruyu',
    name: '颜如玉',
    title: '青帝后人',
    description: '妖帝青帝的后人，拥有最纯正的青帝血脉。她清丽脱俗，气质高贵，肩负着复兴妖帝一脉的重任，是妖族年轻一代的领袖。',
    greeting: '颜如玉眸中青光一闪，淡淡道："青帝一脉，不容轻辱。"',
    roomId: 'stone_kingdom_wanjintang',
    dialogues: [
      {
        id: 'yan_ruyu_dlg_0',
        topic: '自我介绍',
        text: '"颜如玉，青帝后人。"他微笑道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'yan_ruyu_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'yan_ruyu_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'yan_ruyu_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'yan_ruyu_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'anye_junwang',
    name: '暗夜君王',
    title: '暗夜天骄',
    description: '中州年轻一代中的传奇人物，行踪诡秘，实力惊人。他只在夜间出没，如幽灵般收割敌人的生命，令人闻风丧胆。',
    greeting: '黑暗中传来冰冷的声音："夜幕降临，是我的狩猎时间。"',
    roomId: 'stone_kingdom_wanjintang_back',
    dialogues: [
      {
        id: 'anye_junwang_dlg_0',
        topic: '自我介绍',
        text: '"暗夜君王，暗夜天骄。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'anye_junwang_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'anye_junwang_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'anye_junwang_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'anye_junwang_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'zhongzhou_shuangzi',
    name: '中州双子王',
    title: '中州双璧',
    description: '中州一对孪生兄弟，心意相通，联手可战圣主。他们是中州皇朝培养出的最强天骄，被誉为中州未来的希望。',
    greeting: '双子王异口同声道："我们兄弟联手，天下无敌！"',
    roomId: 'stone_kingdom_dark_market',
    dialogues: [
      {
        id: 'zhongzhou_shuangzi_dlg_0',
        topic: '自我介绍',
        text: '"中州双子王，中州双璧。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'zhongzhou_shuangzi_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'zhongzhou_shuangzi_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'zhongzhou_shuangzi_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'zhongzhou_shuangzi_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'nan_yao',
    name: '南妖',
    title: '南岭妖主',
    description: '南岭妖族年轻一代的领袖，本体是一只远古凶兽。他残暴嗜杀，却也重情重义，在南岭一带拥有极高的威望。',
    greeting: '南妖咧嘴一笑，露出锋利的獠牙："小子，敢来南岭撒野？"',
    roomId: 'stone_kingdom_zuiyuefang',
    dialogues: [
      {
        id: 'nan_yao_dlg_0',
        topic: '自我介绍',
        text: '"南妖，南岭妖主。"他微笑道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'nan_yao_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'nan_yao_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'nan_yao_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'nan_yao_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'bei_di',
    name: '北帝',
    title: '北原至尊',
    description: '北原年轻一代的第一人，实力恐怖。他在北原一带称尊，无人敢撄其锋，是北原所有年轻人的偶像。',
    greeting: '北帝负手而立，傲视八方："北原，是我的地盘。"',
    roomId: 'stone_kingdom_cangchun',
    dialogues: [
      {
        id: 'bei_di_dlg_0',
        topic: '自我介绍',
        text: '"北帝，北原至尊。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'bei_di_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'bei_di_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'bei_di_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'bei_di_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'xi_pusa',
    name: '西菩萨',
    title: '西漠佛子',
    description: '西漠佛教选定的佛子，天生佛骨，悟性惊人。他一心向佛，立志普度众生，是西漠佛教未来的希望。',
    greeting: '西菩萨双手合十，佛光普照："施主，与我佛有缘。"',
    roomId: 'stone_kingdom_cangchun_pool',
    dialogues: [
      {
        id: 'xi_pusa_dlg_0',
        topic: '自我介绍',
        text: '"西菩萨，西漠佛子。"他微笑道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'xi_pusa_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'xi_pusa_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'xi_pusa_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'xi_pusa_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'donghuang_shenti',
    name: '东荒神体',
    title: '神王传人',
    description: '东荒某个世家培养出的神体，天生与大道亲和。他资质惊人，修行速度远超常人，被认为是东荒未来的领军人物。',
    greeting: '东荒神体周身神光环绕，淡淡道："神体一出，谁与争锋？"',
    roomId: 'stone_kingdom_yicui',
    dialogues: [
      {
        id: 'donghuang_shenti_dlg_0',
        topic: '自我介绍',
        text: '"东荒神体，神王传人。"他微笑道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'donghuang_shenti_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'donghuang_shenti_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'donghuang_shenti_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'donghuang_shenti_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'yuhua_tianjiao',
    name: '羽化天骄',
    title: '羽化传人',
    description: '羽化神朝培养出的最强天骄，被寄予厚望。他身负羽化大帝的部分传承，实力深不可测，是羽化神朝未来的希望。',
    greeting: '羽化天骄羽衣飘飘，如仙人临凡："羽化飞升，才是正道。"',
    roomId: 'stone_kingdom_zuixian',
    dialogues: [
      {
        id: 'yuhua_tianjiao_dlg_0',
        topic: '自我介绍',
        text: '"羽化天骄，羽化传人。"他微笑道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'yuhua_tianjiao_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'yuhua_tianjiao_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'yuhua_tianjiao_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'yuhua_tianjiao_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'hei_huang',
    name: '黑皇',
    title: '无良道士',
    description: '一只大黑狗，本体是远古生灵，跟随过无始大帝。它贪婪无耻，精通阵法，一生致力于挖坟盗墓和收集宝物，是遮天世界最另类的存在。',
    greeting: '黑皇人立而起，搓着爪子坏笑："小子，有好宝贝吗？本皇跟你换！"',
    roomId: 'stone_kingdom_taohua',
    dialogues: [
      {
        id: 'hei_huang_dlg_0',
        topic: '自我介绍',
        text: '"黑皇，无良道士。"他坏笑地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'hei_huang_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'hei_huang_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'hei_huang_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'hei_huang_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他搓着爪子："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'duan_de',
    name: '段德',
    title: '盗墓天尊',
    description: '一个胖胖的道士，看似猥琐，实则来历惊天。他是渡劫天尊的转世，精通盗墓之术，一生挖过的古墓不计其数，连大帝陵寝都敢下手。',
    greeting: '段德搓着手，两眼放光："这位道友，看你骨骼清奇，不如跟贫道去挖个墓？"',
    roomId: 'stone_kingdom_fang_01',
    dialogues: [
      {
        id: 'duan_de_dlg_0',
        topic: '自我介绍',
        text: '"段德，盗墓天尊。"他神秘地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'duan_de_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'duan_de_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'duan_de_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'duan_de_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他两眼放光："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'gai_jiuyou',
    name: '盖九幽',
    title: '九幽仙曲',
    description: '一位活了九千岁的老圣人，一曲仙音动九幽。他年轻时曾与大帝争锋，虽败犹荣，是那个时代最惊艳的人物之一。',
    greeting: '盖九幽轻抚琴弦，幽幽一叹："九千年了……这世间，还有谁记得我？"',
    roomId: 'stone_kingdom_fang_02',
    dialogues: [
      {
        id: 'gai_jiuyou_dlg_0',
        topic: '自我介绍',
        text: '"盖九幽，九幽仙曲。"他神秘地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'gai_jiuyou_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'gai_jiuyou_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'gai_jiuyou_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'gai_jiuyou_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'shenwang_jiangtaixu',
    name: '神王姜太虚',
    title: '白衣神王',
    description: '四千年前的人物，被誉为白衣神王。他在紫山中沉寂数千年，一出世便震动天下，以无敌之姿横扫诸敌，是遮天世界最传奇的人物。',
    greeting: '白衣神王姜太虚静立虚空，声音缥缈："四千年……这世间变了太多。"',
    roomId: 'stone_kingdom_fang_03',
    dialogues: [
      {
        id: 'shenwang_jiangtaixu_dlg_0',
        topic: '自我介绍',
        text: '"神王姜太虚，白衣神王。"他神秘地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'shenwang_jiangtaixu_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'shenwang_jiangtaixu_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'shenwang_jiangtaixu_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'shenwang_jiangtaixu_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'lao_fengzi',
    name: '老疯子',
    title: '天璇圣子',
    description: '天璇圣地的圣子，六千年前的人物。天璇圣地覆灭后他疯了，却也因此获得了不可思议的力量，是世间最强大也最悲哀的存在。',
    greeting: '老疯子披头散发，喃喃自语："疯了……都疯了……天璇……我的天璇……"',
    roomId: 'stone_kingdom_bishui_yuan',
    dialogues: [
      {
        id: 'lao_fengzi_dlg_0',
        topic: '自我介绍',
        text: '"老疯子，天璇圣子。"他淡淡地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'lao_fengzi_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'lao_fengzi_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'lao_fengzi_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'lao_fengzi_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'renmo_laoyezi',
    name: '人魔老爷子',
    title: '太古魔人',
    description: '一位从太古时代存活下来的魔人，吃人为生，凶残无比。他被封印了无尽岁月，一旦出世便会引起血雨腥风，是世间最危险的存在。',
    greeting: '人魔老爷子舔了舔嘴唇，露出獠牙："好香的味道……是人肉的味道……"',
    roomId: 'stone_kingdom_fang_04',
    dialogues: [
      {
        id: 'renmo_laoyezi_dlg_0',
        topic: '自我介绍',
        text: '"人魔老爷子，太古魔人。"他淡淡地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'renmo_laoyezi_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'renmo_laoyezi_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'renmo_laoyezi_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'renmo_laoyezi_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'kanchai_laoren',
    name: '砍柴老人',
    title: '神秘樵夫',
    description: '一个每天砍柴的老人，看似普通，实则是一位深不可测的强者。他从不显露修为，却在关键时刻展现出惊天动地的力量。',
    greeting: '砍柴老人放下斧头，擦了擦汗："年轻人，要柴火吗？我这儿多的是。"',
    roomId: 'stone_kingdom_yaotai',
    dialogues: [
      {
        id: 'kanchai_laoren_dlg_0',
        topic: '自我介绍',
        text: '"砍柴老人，神秘樵夫。"他淡淡地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'kanchai_laoren_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'kanchai_laoren_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'kanchai_laoren_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'kanchai_laoren_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'maiyao_laoren',
    name: '卖药老人',
    title: '药神转世',
    description: '一个走街串巷卖药的老人，卖的药看似普通，却有奇效。无人知道他的来历，但据说他曾是远古时代的药神，转世重修。',
    greeting: '卖药老人打开药箱，神秘道："我这药，可治百病，可延寿元，可洗髓伐骨。要不要来一副？"',
    roomId: 'stone_kingdom_yaotai_food',
    dialogues: [
      {
        id: 'maiyao_laoren_dlg_0',
        topic: '自我介绍',
        text: '"卖药老人，药神转世。"他淡淡地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'maiyao_laoren_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'maiyao_laoren_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'maiyao_laoren_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'maiyao_laoren_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'suangua_xiansheng',
    name: '算卦先生',
    title: '天机传人',
    description: '一个摆卦摊的先生，可算天机、测吉凶。他的卦象极准，却从不为自己算卦，说是因为怕泄露太多天机遭天谴。',
    greeting: '算卦先生摇了摇龟甲，微笑道："来算一卦？算不准不收钱。"',
    roomId: 'stone_kingdom_yaotai_discuss',
    dialogues: [
      {
        id: 'suangua_xiansheng_dlg_0',
        topic: '自我介绍',
        text: '"算卦先生，天机传人。"他神秘地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'suangua_xiansheng_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'suangua_xiansheng_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'suangua_xiansheng_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'suangua_xiansheng_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'datie_jiang',
    name: '打铁匠',
    title: '隐世神匠',
    description: '一个普通的打铁匠，却可铸造出媲美圣兵的神器。他隐藏在市井之中，从不显露真实身份，只为等待有缘人。',
    greeting: '打铁匠锤打着铁块，火星四溅："要打什么？普通的农具还是……特殊的兵器？"',
    roomId: 'stone_kingdom_yaotai_pool',
    dialogues: [
      {
        id: 'datie_jiang_dlg_0',
        topic: '自我介绍',
        text: '"打铁匠，隐世神匠。"他神秘地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'datie_jiang_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'datie_jiang_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'datie_jiang_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'datie_jiang_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'baidu_ren',
    name: '摆渡人',
    title: '黄泉摆渡',
    description: '一位在神秘河流上摆渡的老人，据说可渡人往返阴阳两界。他的船只在特定的时间出现，搭载有缘人前往未知之地。',
    greeting: '摆渡人撑着竹篙，沙哑道："上船吧，过了这条河，就是另一片天地了。"',
    roomId: 'stone_kingdom_culture_plaza',
    dialogues: [
      {
        id: 'baidu_ren_dlg_0',
        topic: '自我介绍',
        text: '"摆渡人，黄泉摆渡。"他神秘地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'baidu_ren_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'baidu_ren_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'baidu_ren_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'baidu_ren_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'shoumu_ren',
    name: '守墓人',
    title: '帝陵守护者',
    description: '某位大帝陵墓的守护者，世代守护陵墓，防止盗墓贼侵扰。他对大帝忠心耿耿，即便大帝已逝，依然履行着当年的誓言。',
    greeting: '守墓人手持长明灯，挡在墓门前："帝陵重地，擅入者，死。"',
    roomId: 'stone_kingdom_imperial_gate',
    dialogues: [
      {
        id: 'shoumu_ren_dlg_0',
        topic: '自我介绍',
        text: '"守墓人，帝陵守护者。"他神秘地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'shoumu_ren_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'shoumu_ren_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'shoumu_ren_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'shoumu_ren_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'huazhong_ren',
    name: '画中人',
    title: '画中仙',
    description: '一幅古画中走出的仙人，来历不明，实力不明。他可自由出入画卷，在画中修炼，是世间最神秘的存在之一。',
    greeting: '画中人从画卷中走出，微微一笑："我在画中看了你很久，你很有趣。"',
    roomId: 'stone_kingdom_imperial_city',
    dialogues: [
      {
        id: 'huazhong_ren_dlg_0',
        topic: '自我介绍',
        text: '"画中人，画中仙。"他神秘地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'huazhong_ren_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'huazhong_ren_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'huazhong_ren_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'huazhong_ren_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'jingzhong_ke',
    name: '镜中客',
    title: '镜界行者',
    description: '一位可在镜子中行走的神秘人物，通过镜子穿梭于不同的空间。他知晓许多不为人知的秘密，却从不轻易透露。',
    greeting: '镜中客从镜子中探出头来，眨了眨眼："嘿，借过一下，我要从这边出去。"',
    roomId: 'stone_kingdom_jiaofangsi',
    dialogues: [
      {
        id: 'jingzhong_ke_dlg_0',
        topic: '自我介绍',
        text: '"镜中客，镜界行者。"他神秘地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'jingzhong_ke_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'jingzhong_ke_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'jingzhong_ke_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'jingzhong_ke_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'wuming_jianke',
    name: '无名剑客',
    title: '一剑绝尘',
    description: '一位没有名字的剑客，从不说话，只用剑说话。他的剑快得不可思议，一剑出，天地失色，是世间最可怕的剑客。',
    greeting: '无名剑客抱剑而立，微微点头，不发一言。',
    roomId: 'stone_kingdom_feiyinge',
    dialogues: [
      {
        id: 'wuming_jianke_dlg_0',
        topic: '自我介绍',
        text: '"无名剑客，一剑绝尘。"他神秘地说道："我的来历，说了你也不会信。"',
      },
      {
        id: 'wuming_jianke_dlg_1',
        topic: '问过往秘密',
        text: '"秘密之所以是秘密，就是因为不能说出来。"他意味深长地看了你一眼："知道得太多，对你没有好处。"',
      },
      {
        id: 'wuming_jianke_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'wuming_jianke_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'wuming_jianke_dlg_4',
        topic: '请求帮助',
        text: '"帮你？"他沉吟片刻："好处呢？没有好处的事情，我可不做。"',
      },
    ],
  },
  {
    id: 'lunhuihai_zhizhu',
    name: '轮回海之主',
    title: '禁区至尊',
    description: '轮回海生命禁区的主人，一位自斩一刀的至尊。他蛰伏在轮回海中，等待成仙路开启，是世间最危险的存在之一。',
    greeting: '轮回海之主的声音从海底传来，带着万古的寒意："你来轮回海，是求死吗？"',
    roomId: 'stone_kingdom_feiyinge_2',
    dialogues: [
      {
        id: 'lunhuihai_zhizhu_dlg_0',
        topic: '自我介绍',
        text: '"轮回海之主，禁区至尊。"他威严地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'lunhuihai_zhizhu_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'lunhuihai_zhizhu_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'lunhuihai_zhizhu_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'lunhuihai_zhizhu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'zangtiandao_shouhu',
    name: '葬天岛守护者',
    title: '葬天守卫',
    description: '葬天岛生命禁区的守护者，世代守护这座神秘的岛屿。他知晓葬天岛的秘密，却从不对外人透露半分。',
    greeting: '葬天岛守护者挡在岛前，面无表情："葬天岛上，有进无出。你还想上去吗？"',
    roomId: 'stone_kingdom_feiyinge_3',
    dialogues: [
      {
        id: 'zangtiandao_shouhu_dlg_0',
        topic: '自我介绍',
        text: '"葬天岛守护者，葬天守卫。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'zangtiandao_shouhu_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'zangtiandao_shouhu_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'zangtiandao_shouhu_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'zangtiandao_shouhu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'taichugu_kuanggong',
    name: '太初古矿矿工',
    title: '古矿奴工',
    description: '太初古矿中的矿工，世代在矿中劳作，开采神源。他们被诅咒束缚，无法离开古矿，一生都在暗无天日的地下度过。',
    greeting: '太初古矿矿工提着矿灯，疲惫道："又一个来找死的……随你便吧。"',
    roomId: 'stone_kingdom_baixipeng',
    dialogues: [
      {
        id: 'taichugu_kuanggong_dlg_0',
        topic: '自我介绍',
        text: '"太初古矿矿工，古矿奴工。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'taichugu_kuanggong_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'taichugu_kuanggong_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'taichugu_kuanggong_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'taichugu_kuanggong_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'xianling_shoumu',
    name: '仙陵守墓人',
    title: '仙陵守护者',
    description: '仙陵生命禁区的守墓人，世代守护仙人的陵墓。他见证了无数强者的陨落，对生命已经麻木，只剩下守护的职责。',
    greeting: '仙陵守墓人坐在墓碑旁，头也不抬："仙陵重地，擅入者，埋骨于此。"',
    roomId: 'stone_kingdom_ministries',
    dialogues: [
      {
        id: 'xianling_shoumu_dlg_0',
        topic: '自我介绍',
        text: '"仙陵守墓人，仙陵守护者。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'xianling_shoumu_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'xianling_shoumu_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'xianling_shoumu_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'xianling_shoumu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'shenxu_zhizhu',
    name: '神墟之主',
    title: '神墟至尊',
    description: '神墟生命禁区的主人，一位从神话时代存活下来的至尊。他在神墟中沉睡，偶尔醒来便会引起天下大乱。',
    greeting: '神墟之主睁开双眼，神威浩荡："神话时代的气息……你身上怎么会有？"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: 'shenxu_zhizhu_dlg_0',
        topic: '自我介绍',
        text: '"神墟之主，神墟至尊。"他威严地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'shenxu_zhizhu_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'shenxu_zhizhu_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'shenxu_zhizhu_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'shenxu_zhizhu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'bushishan_shizhe',
    name: '不死山使者',
    title: '不死使者',
    description: '不死山生命禁区派出的使者，行走于世间，为禁区收集情报。他实力强大，心狠手辣，是不死山在世间的手脚。',
    greeting: '不死山使者冷冷一笑："不死山看中了你，跟我走吧，否则……死。"',
    roomId: 'stone_kingdom_scripture',
    dialogues: [
      {
        id: 'bushishan_shizhe_dlg_0',
        topic: '自我介绍',
        text: '"不死山使者，不死使者。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'bushishan_shizhe_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'bushishan_shizhe_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'bushishan_shizhe_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'bushishan_shizhe_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'huanggujin_shizhe',
    name: '荒古禁地使者',
    title: '荒奴',
    description: '荒古禁地中的奴仆，被禁区之力侵蚀，失去了自我意识。他们机械地执行着禁区的命令，是荒古禁地最忠实的仆人。',
    greeting: '荒奴眼神空洞，声音嘶哑："禁地……不得入内……违令者……杀……"',
    roomId: 'stone_kingdom_technique',
    dialogues: [
      {
        id: 'huanggujin_shizhe_dlg_0',
        topic: '自我介绍',
        text: '"荒古禁地使者，荒奴。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'huanggujin_shizhe_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'huanggujin_shizhe_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'huanggujin_shizhe_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'huanggujin_shizhe_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'jinqu_tanxian',
    name: '禁区探险者',
    title: '亡命之徒',
    description: '一位以探险禁区为生的亡命之徒，无数次出入禁区边缘，采集珍稀材料。他对禁区有着异于常人的了解，却也付出了惨重的代价。',
    greeting: '禁区探险者浑身是伤，却兴奋地笑道："刚从禁区出来，这次收获不小！"',
    roomId: 'stone_kingdom_prince_mansion',
    dialogues: [
      {
        id: 'jinqu_tanxian_dlg_0',
        topic: '自我介绍',
        text: '"禁区探险者，亡命之徒。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'jinqu_tanxian_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'jinqu_tanxian_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'jinqu_tanxian_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'jinqu_tanxian_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'jinqu_yanjiu',
    name: '禁区研究者',
    title: '禁地学者',
    description: '一位专门研究生命禁区的学者，对各大禁区的历史、成因、危险了如指掌。他为了研究禁区，不惜以身犯险，是个不折不扣的疯子。',
    greeting: '禁区研究者激动地翻着笔记："太棒了！又发现了禁区的新秘密！"',
    roomId: 'stone_kingdom_palace_gate',
    dialogues: [
      {
        id: 'jinqu_yanjiu_dlg_0',
        topic: '自我介绍',
        text: '"禁区研究者，禁地学者。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'jinqu_yanjiu_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'jinqu_yanjiu_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'jinqu_yanjiu_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'jinqu_yanjiu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'jinqu_shangren',
    name: '禁区商人',
    title: '黑市商人',
    description: '专门贩卖禁区产出的珍稀材料的黑市商人。他的货物来路不明，却都是世间罕见的宝贝，是冒险者最喜欢的交易对象。',
    greeting: '禁区商人神秘兮兮地打开包裹："刚从禁区搞到的好货，要不要看看？"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: 'jinqu_shangren_dlg_0',
        topic: '自我介绍',
        text: '"禁区商人，黑市商人。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'jinqu_shangren_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'jinqu_shangren_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'jinqu_shangren_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'jinqu_shangren_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他咧嘴一笑："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'jinqu_lieren',
    name: '禁区猎人',
    title: '异兽猎人',
    description: '专门猎杀禁区边缘异兽的猎人，实力强大，胆大包天。他以猎杀禁区异兽为生，每一块兽皮、每一根兽骨都能卖到天价。',
    greeting: '禁区猎人扛着一头巨大的异兽尸体，咧嘴笑道："今天运气不错，搞到了一头大家伙！"',
    roomId: 'stone_kingdom_throne',
    dialogues: [
      {
        id: 'jinqu_lieren_dlg_0',
        topic: '自我介绍',
        text: '"禁区猎人，异兽猎人。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'jinqu_lieren_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'jinqu_lieren_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'jinqu_lieren_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'jinqu_lieren_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'jinqu_taonan',
    name: '禁区逃难者',
    title: '幸存者',
    description: '一位从禁区中侥幸逃出来的幸存者，精神已经崩溃。他口中不断念叨着禁区的恐怖，警告所有人不要靠近。',
    greeting: '禁区逃难者惊恐地环顾四周，颤抖道："它们……它们还在追我……不要……不要进去……"',
    roomId: 'stone_kingdom_harem',
    dialogues: [
      {
        id: 'jinqu_taonan_dlg_0',
        topic: '自我介绍',
        text: '"禁区逃难者，幸存者。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'jinqu_taonan_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'jinqu_taonan_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'jinqu_taonan_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'jinqu_taonan_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'jinqu_yinlu',
    name: '禁区引路人',
    title: '禁区向导',
    description: '一位专门为人引路进入禁区边缘的向导，对禁区的路线了如指掌。他收费极高，却总能将人安全带进去再带出来。',
    greeting: '禁区引路人点燃一根烟，淡淡道："想去禁区？先付定金，死了不退。"',
    roomId: 'stone_kingdom_treasure',
    dialogues: [
      {
        id: 'jinqu_yinlu_dlg_0',
        topic: '自我介绍',
        text: '"禁区引路人，禁区向导。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'jinqu_yinlu_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'jinqu_yinlu_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'jinqu_yinlu_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'jinqu_yinlu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'jinqu_zuzhou',
    name: '禁区诅咒者',
    title: '诅咒缠身者',
    description: '一位被禁区诅咒缠身的可怜人，身体逐渐异变，神志逐渐丧失。他四处寻找解除诅咒的方法，却始终无果。',
    greeting: '禁区诅咒者露出被诅咒侵蚀的手臂，痛苦道："救救我……我不想变成怪物……"',
    roomId: 'stone_kingdom_flying_platform',
    dialogues: [
      {
        id: 'jinqu_zuzhou_dlg_0',
        topic: '自我介绍',
        text: '"禁区诅咒者，诅咒缠身者。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'jinqu_zuzhou_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'jinqu_zuzhou_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'jinqu_zuzhou_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'jinqu_zuzhou_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'jinqu_chuanshuo',
    name: '禁区传说者',
    title: '禁区说书人',
    description: '一位专门讲述禁区传说的说书人，将禁区的故事编成话本，在民间流传。他从未进入过禁区，却比许多进去过的人更了解禁区。',
    greeting: '禁区传说者清了清嗓子，朗声道："要说这生命禁区，那可是说来话长……"',
    roomId: 'beidou_star_field',
    dialogues: [
      {
        id: 'jinqu_chuanshuo_dlg_0',
        topic: '自我介绍',
        text: '"禁区传说者，禁区说书人。"他冷冷地说道："生命禁区，不是你能染指的地方。"',
      },
      {
        id: 'jinqu_chuanshuo_dlg_1',
        topic: '问禁区秘密',
        text: '"禁区的秘密？"他冷笑："知道了秘密的人，都死了。你还想知道吗？"',
      },
      {
        id: 'jinqu_chuanshuo_dlg_2',
        topic: '谈禁区历史',
        text: '"生命禁区，自古便存。"他缓缓道："每一座禁区都埋葬着无数强者，每一块石头都浸透了鲜血。"',
      },
      {
        id: 'jinqu_chuanshuo_dlg_3',
        topic: '论禁区危险',
        text: '"禁区之中，九死一生。"他沉声道："即便是大圣进入，也可能陨落。你这点修为，进去就是送死。"',
      },
      {
        id: 'jinqu_chuanshuo_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他冷笑一声："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'wang_laohan',
    name: '王老汉',
    title: '老农民',
    description: '一位朴实的农民，面朝黄土背朝天，一生与土地为伴。他不知道什么是修炼，什么是成仙，只关心今年的收成好不好。',
    greeting: '王老汉擦了擦汗，憨厚地笑道："客人，要买些新鲜的蔬菜吗？"',
    roomId: 'huanggu_forbidden',
    dialogues: [
      {
        id: 'wang_laohan_dlg_0',
        topic: '自我介绍',
        text: '"王老汉，老农民。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'wang_laohan_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'wang_laohan_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'wang_laohan_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'wang_laohan_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'li_daniang',
    name: '李大娘',
    title: '杂货店主',
    description: '一位在街边开杂货店的大娘，卖些日常用品。她热情好客，见多识广，是街坊邻居们的消息灵通人士。',
    greeting: '李大娘热情地招呼："来啦来啦，看看需要什么，大娘给你算便宜点！"',
    roomId: 'yuhua_school',
    dialogues: [
      {
        id: 'li_daniang_dlg_0',
        topic: '自我介绍',
        text: '"李大娘，杂货店主。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'li_daniang_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'li_daniang_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'li_daniang_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'li_daniang_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'zhang_xiaoer',
    name: '张小二',
    title: '店小二',
    description: '一家酒楼里的店小二，机灵勤快，嘴甜会做人。他见惯了各路修士，对修仙界的事情知道不少，是个百事通。',
    greeting: '张小二点头哈腰，满脸堆笑："客官里面请！今儿个想吃点啥？"',
    roomId: 'beidou_city_gate',
    dialogues: [
      {
        id: 'zhang_xiaoer_dlg_0',
        topic: '自我介绍',
        text: '"张小二，店小二。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'zhang_xiaoer_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'zhang_xiaoer_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'zhang_xiaoer_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'zhang_xiaoer_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'zhao_tiejiang',
    name: '赵铁匠',
    title: '铁匠师傅',
    description: '一位打铁为生的大汉，手艺精湛，打出的农具结实耐用。他虽然只是凡人，却有把子力气，连一些低阶修士都比不过。',
    greeting: '赵铁匠擦了擦手上的煤灰，爽朗道："要打什么？锄头还是镰刀？"',
    roomId: 'beidou_city_main_street',
    dialogues: [
      {
        id: 'zhao_tiejiang_dlg_0',
        topic: '自我介绍',
        text: '"赵铁匠，铁匠师傅。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'zhao_tiejiang_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'zhao_tiejiang_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'zhao_tiejiang_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'zhao_tiejiang_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'sun_langzhong',
    name: '孙郎中',
    title: '赤脚医生',
    description: '一位走街串巷的郎中，靠给人看病为生。他不懂修炼，却精通医术，许多修士受伤后也会找他调理。',
    greeting: '孙郎中把了把你的脉，皱眉道："气血旺盛，不是普通人啊……"',
    roomId: 'beidou_city_east_market',
    dialogues: [
      {
        id: 'sun_langzhong_dlg_0',
        topic: '自我介绍',
        text: '"孙郎中，赤脚医生。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'sun_langzhong_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'sun_langzhong_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'sun_langzhong_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'sun_langzhong_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'zhou_zhanggui',
    name: '周掌柜',
    title: '当铺老板',
    description: '一家当铺的掌柜，精明算计，眼光毒辣。他经手的宝贝不计其数，一眼就能看出东西的真假和价值。',
    greeting: '周掌柜推了推算盘，笑眯眯道："客官要当什么？先让老朽掌掌眼。"',
    roomId: 'beidou_city_west_market',
    dialogues: [
      {
        id: 'zhou_zhanggui_dlg_0',
        topic: '自我介绍',
        text: '"周掌柜，当铺老板。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'zhou_zhanggui_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'zhou_zhanggui_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'zhou_zhanggui_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'zhou_zhanggui_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他眼睛一亮："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'wu_xiucai',
    name: '吴秀才',
    title: '落第书生',
    description: '一位屡试不第的穷书生，满腹经纶却无人赏识。他常年在街边摆摊写字，替人写信为生，心中却怀有治国平天下的抱负。',
    greeting: '吴秀才放下毛笔，苦笑道："十年寒窗，不如人家一个仙字。"',
    roomId: 'beidou_imperial_city',
    dialogues: [
      {
        id: 'wu_xiucai_dlg_0',
        topic: '自我介绍',
        text: '"吴秀才，落第书生。"他苦笑地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'wu_xiucai_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'wu_xiucai_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'wu_xiucai_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'wu_xiucai_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'zheng_tuhu',
    name: '郑屠户',
    title: '肉铺老板',
    description: '一位卖肉为生的屠户，五大三粗，嗓门极大。他每天凌晨起来杀猪宰羊，是街坊们肉食的供应者。',
    greeting: '郑屠户挥舞着菜刀，大声吆喝："新鲜猪肉！刚杀的！快来买啊！"',
    roomId: 'beidou_imperial_palace',
    dialogues: [
      {
        id: 'zheng_tuhu_dlg_0',
        topic: '自我介绍',
        text: '"郑屠户，肉铺老板。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'zheng_tuhu_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'zheng_tuhu_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'zheng_tuhu_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'zheng_tuhu_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'qian_shangren',
    name: '钱商人',
    title: '行商',
    description: '一位走南闯北的行商，贩卖各地的特产。他见识广博，口才了得，一张嘴能把死的说成活的，是生意场上的老手。',
    greeting: '钱商人打开货箱，热情地介绍："来看看，这可是从北域运来的好东西！"',
    roomId: 'beidou_sky_pavilion',
    dialogues: [
      {
        id: 'qian_shangren_dlg_0',
        topic: '自我介绍',
        text: '"钱商人，行商。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'qian_shangren_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'qian_shangren_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'qian_shangren_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'qian_shangren_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他眼睛一亮："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'chen_qigai',
    name: '陈乞丐',
    title: '老乞丐',
    description: '一位在街边乞讨的老乞丐，衣衫褴褛，蓬头垢面。无人知道他的来历，但据说他曾是一位强大的修士，因故沦落至此。',
    greeting: '陈乞丐伸出破碗，沙哑道："行行好，给口饭吃吧……"',
    roomId: 'huanggu_core',
    dialogues: [
      {
        id: 'chen_qigai_dlg_0',
        topic: '自我介绍',
        text: '"陈乞丐，老乞丐。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'chen_qigai_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'chen_qigai_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'chen_qigai_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'chen_qigai_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'lin_caifeng',
    name: '林裁缝',
    title: '裁缝师傅',
    description: '一位手艺精湛的裁缝，专为人缝制衣裳。他做的衣服合体舒适，连一些修士也会找他定制法袍。',
    greeting: '林裁缝量着你的尺寸，笑道："客官身材不错，做一身好衣裳肯定精神！"',
    roomId: 'huanggu_tomb',
    dialogues: [
      {
        id: 'lin_caifeng_dlg_0',
        topic: '自我介绍',
        text: '"林裁缝，裁缝师傅。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'lin_caifeng_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'lin_caifeng_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'lin_caifeng_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'lin_caifeng_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'huang_mujiang',
    name: '黄木匠',
    title: '木匠师傅',
    description: '一位做木工活儿的老师傅，手艺精湛，可打造出精美的家具。他虽然不懂阵法，却可将木材的纹理与灵气完美结合。',
    greeting: '黄木匠刨着木头，头也不抬："要做家具？把图纸放下，三天后来取。"',
    roomId: 'huanggu_lake',
    dialogues: [
      {
        id: 'huang_mujiang_dlg_0',
        topic: '自我介绍',
        text: '"黄木匠，木匠师傅。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'huang_mujiang_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'huang_mujiang_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'huang_mujiang_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'huang_mujiang_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'liu_chuzi',
    name: '刘厨子',
    title: '酒楼大厨',
    description: '一家酒楼的大厨，厨艺精湛，做出的菜肴远近闻名。他以普通的食材做出不凡的味道，连一些修士都慕名而来。',
    greeting: '刘厨子挥舞着锅铲，香气四溢："客官稍等，招牌菜马上就好！"',
    roomId: 'xianyu_gate',
    dialogues: [
      {
        id: 'liu_chuzi_dlg_0',
        topic: '自我介绍',
        text: '"刘厨子，酒楼大厨。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'liu_chuzi_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'liu_chuzi_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'liu_chuzi_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'liu_chuzi_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'yang_huolang',
    name: '杨货郎',
    title: '货郎',
    description: '一位挑着担子走街串巷的货郎，卖些针头线脑、糖果玩具。他是孩子们最喜欢的人，也是乡间最热闹的风景。',
    greeting: '杨货郎摇着拨浪鼓，大声吆喝："糖葫芦！泥人儿！快来买喽！"',
    roomId: 'xianyu_palace',
    dialogues: [
      {
        id: 'yang_huolang_dlg_0',
        topic: '自我介绍',
        text: '"杨货郎，货郎。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'yang_huolang_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'yang_huolang_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'yang_huolang_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'yang_huolang_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'zhu_gengfu',
    name: '朱更夫',
    title: '打更人',
    description: '一位负责夜间打更的老人，常年在深夜的街道上行走。他见惯了夜间的怪事，知道许多不为人知的秘密。',
    greeting: '朱更夫敲着梆子，沙哑道："天干物燥，小心火烛——夜深了，早点回家吧。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: 'zhu_gengfu_dlg_0',
        topic: '自我介绍',
        text: '"朱更夫，打更人。"他憨厚地说道："咱就是个普通人，比不得你们这些仙人。"',
      },
      {
        id: 'zhu_gengfu_dlg_1',
        topic: '问民间生活',
        text: '"老百姓的日子，就是柴米油盐酱醋茶。"他感慨道："不求大富大贵，只求平平安安，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'zhu_gengfu_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'zhu_gengfu_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'zhu_gengfu_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'yuhua_dadi',
    name: '羽化大帝',
    title: '羽化飞升',
    description: '羽化神朝的开创者，远古时期证道的大帝。他留下羽化神朝，传承至今，是羽化神朝所有人心中的至高神明。',
    greeting: '羽化大帝的虚影浮现，仙气缭绕："后世之人，寻朕所为何事？"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: 'yuhua_dadi_dlg_0',
        topic: '自我介绍',
        text: '"羽化大帝，羽化飞升。"他威严地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'yuhua_dadi_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'yuhua_dadi_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'yuhua_dadi_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'yuhua_dadi_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'yuhua_shenzhu',
    name: '羽化神主',
    title: '神朝之主',
    description: '羽化神朝当代神主，统御羽化神朝，实力深不可测。他肩负着复兴羽化大帝辉煌的重任，野心勃勃。',
    greeting: '羽化神主端坐神座之上，威严道："羽化神朝，统御八方！"',
    roomId: 'stone_kingdom_zhuque',
    dialogues: [
      {
        id: 'yuhua_shenzhu_dlg_0',
        topic: '自我介绍',
        text: '"羽化神主，神朝之主。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'yuhua_shenzhu_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'yuhua_shenzhu_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'yuhua_shenzhu_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'yuhua_shenzhu_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'yuhua_tiannv',
    name: '羽化天女',
    title: '羽化圣女',
    description: '羽化神朝选定的天女，美丽圣洁，如仙子临凡。她修炼羽化大帝的传承，气质出尘，是羽化神朝最耀眼的明珠。',
    greeting: '羽化天女羽衣飘飘，淡淡道："羽化飞升，才是正道。你为何还不醒悟？"',
    roomId: 'stone_kingdom_east_market',
    dialogues: [
      {
        id: 'yuhua_tiannv_dlg_0',
        topic: '自我介绍',
        text: '"羽化天女，羽化圣女。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'yuhua_tiannv_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'yuhua_tiannv_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'yuhua_tiannv_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'yuhua_tiannv_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'yuhua_jiangjun',
    name: '羽化将军',
    title: '神朝战神',
    description: '羽化神朝的镇国将军，统领神朝大军，战功赫赫。他忠心耿耿，为羽化神朝南征北战，是神朝最可靠的守护者。',
    greeting: '羽化将军甲胄在身，沉声道："神朝疆域，寸土不让！"',
    roomId: 'stone_kingdom_west_market',
    dialogues: [
      {
        id: 'yuhua_jiangjun_dlg_0',
        topic: '自我介绍',
        text: '"羽化将军，神朝战神。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'yuhua_jiangjun_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'yuhua_jiangjun_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'yuhua_jiangjun_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'yuhua_jiangjun_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'yuhua_jisi',
    name: '羽化祭司',
    title: '神朝大祭司',
    description: '羽化神朝的大祭司，掌管祭祀与占卜。他可与羽化大帝沟通，获得神谕，在神朝中地位尊崇。',
    greeting: '羽化祭司手持羽扇，念念有词："大帝有谕，示我以天机……"',
    roomId: 'stone_kingdom_huji_tavern',
    dialogues: [
      {
        id: 'yuhua_jisi_dlg_0',
        topic: '自我介绍',
        text: '"羽化祭司，神朝大祭司。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'yuhua_jisi_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'yuhua_jisi_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'yuhua_jisi_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'yuhua_jisi_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'tianting_zhizhu',
    name: '天庭之主',
    title: '古天庭至尊',
    description: '远古天庭的主人，神话时代的至尊强者。他建立了古天庭，统御万族，是远古时代最强大的存在之一。',
    greeting: '天庭之主的声音从远古传来，带着无尽的威严："后世之人，可知天庭之辉煌？"',
    roomId: 'stone_kingdom_wanjintang',
    dialogues: [
      {
        id: 'tianting_zhizhu_dlg_0',
        topic: '自我介绍',
        text: '"天庭之主，古天庭至尊。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'tianting_zhizhu_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'tianting_zhizhu_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'tianting_zhizhu_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'tianting_zhizhu_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'difu_yanluo',
    name: '地府阎罗',
    title: '地府之主',
    description: '地府的主人，掌管生死轮回。他居住在阴森的地下宫殿中，审判死者的功过，决定其来世的去向。',
    greeting: '地府阎罗的声音阴森可怖："阳寿已尽，随本王入地府受审！"',
    roomId: 'stone_kingdom_wanjintang_back',
    dialogues: [
      {
        id: 'difu_yanluo_dlg_0',
        topic: '自我介绍',
        text: '"地府阎罗，地府之主。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'difu_yanluo_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'difu_yanluo_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'difu_yanluo_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'difu_yanluo_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'huangchao_zhizhu',
    name: '凰巢之主',
    title: '不死凰主',
    description: '不死天皇建立的凰巢的主人，实力恐怖。他继承了不死天皇的意志，一心想要建立不朽的皇朝，统御天下。',
    greeting: '凰巢之主周身凰火燃烧，声音尖锐："凰巢不灭，天皇不死！"',
    roomId: 'stone_kingdom_dark_market',
    dialogues: [
      {
        id: 'huangchao_zhizhu_dlg_0',
        topic: '自我介绍',
        text: '"凰巢之主，不死凰主。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'huangchao_zhizhu_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'huangchao_zhizhu_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'huangchao_zhizhu_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'huangchao_zhizhu_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'shenzuzhi_shouling',
    name: '神组织首领',
    title: '神秘组织首领',
    description: '一个神秘组织的首领，无人知道他的真实身份。他在暗中操控着许多事情，影响着天下的走向，是幕后黑手之一。',
    greeting: '神组织首领隐藏在阴影中，声音沙哑："你很有趣，有没有兴趣加入我的组织？"',
    roomId: 'stone_kingdom_zuiyuefang',
    dialogues: [
      {
        id: 'shenzuzhi_shouling_dlg_0',
        topic: '自我介绍',
        text: '"神组织首领，神秘组织首领。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'shenzuzhi_shouling_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'shenzuzhi_shouling_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'shenzuzhi_shouling_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'shenzuzhi_shouling_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他阴冷一笑："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'shashou_chaozhu',
    name: '杀手神朝之主',
    title: '杀神之主',
    description: '人世间或地狱杀神组织的主人，杀手界的至尊。他本身便是最可怕的杀手，曾刺杀过无数强者，从未失手。',
    greeting: '杀手神朝之主的声音从四面八方传来："买命还是卖命？价格公道，童叟无欺。"',
    roomId: 'stone_kingdom_cangchun',
    dialogues: [
      {
        id: 'shashou_chaozhu_dlg_0',
        topic: '自我介绍',
        text: '"杀手神朝之主，杀神之主。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'shashou_chaozhu_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'shashou_chaozhu_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'shashou_chaozhu_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'shashou_chaozhu_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他阴冷一笑："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'di_zun',
    name: '帝尊',
    title: '神话至尊',
    description: '神话时代的天庭之主，建立了古天庭，几乎成仙。他是远古时代最强大的存在，也是天庭覆灭的罪魁祸首。',
    greeting: '帝尊的虚影浮现，带着万古的威严："朕，几乎成仙……"',
    roomId: 'stone_kingdom_cangchun_pool',
    dialogues: [
      {
        id: 'di_zun_dlg_0',
        topic: '自我介绍',
        text: '"帝尊，神话至尊。"他威严地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'di_zun_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'di_zun_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'di_zun_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'di_zun_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'busi_tianhuang',
    name: '不死天皇',
    title: '太古至高神',
    description: '太古万族心中的至高神明，一尊仙凰化形的无敌存在。他建立了凰巢，留下了无尽的传说，是遮天世界最神秘的人物之一。',
    greeting: '不死天皇的虚影展翅高飞，凰鸣声响彻天地："本尊，不死不灭！"',
    roomId: 'stone_kingdom_yicui',
    dialogues: [
      {
        id: 'busi_tianhuang_dlg_0',
        topic: '自我介绍',
        text: '"不死天皇，太古至高神。"他威严地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'busi_tianhuang_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'busi_tianhuang_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'busi_tianhuang_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'busi_tianhuang_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'ming_huang',
    name: '冥皇',
    title: '地府开创者',
    description: '地府的开创者，一位从神话时代存活下来的恐怖存在。他建立了地府，掌管生死，是世间最令人恐惧的人物。',
    greeting: '冥皇的声音从九幽传来："生死簿上，可有你的名字？"',
    roomId: 'stone_kingdom_zuixian',
    dialogues: [
      {
        id: 'ming_huang_dlg_0',
        topic: '自我介绍',
        text: '"冥皇，地府开创者。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'ming_huang_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'ming_huang_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'ming_huang_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'ming_huang_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'zhenyu_huang',
    name: '镇狱皇',
    title: '地府守护者',
    description: '地府的守护者，掌管地狱的刑罚。他冷酷无情，对罪人毫不手软，是地府中最令人畏惧的存在。',
    greeting: '镇狱皇手持铁链，冷声道："擅闯地府者，入十八层地狱受罚！"',
    roomId: 'stone_kingdom_taohua',
    dialogues: [
      {
        id: 'zhenyu_huang_dlg_0',
        topic: '自我介绍',
        text: '"镇狱皇，地府守护者。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'zhenyu_huang_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'zhenyu_huang_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'zhenyu_huang_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'zhenyu_huang_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'changshang_tianzun',
    name: '长生天尊',
    title: '九秘传人',
    description: '一位追求长生的天尊，掌握着九秘之一的传承。他为了长生不死，不惜一切代价，是世间最执着也最可悲的存在。',
    greeting: '长生天尊目光狂热，喃喃道："长生……我要长生……谁能给我长生？"',
    roomId: 'stone_kingdom_fang_01',
    dialogues: [
      {
        id: 'changshang_tianzun_dlg_0',
        topic: '自我介绍',
        text: '"长生天尊，九秘传人。"他淡淡地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'changshang_tianzun_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'changshang_tianzun_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'changshang_tianzun_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'changshang_tianzun_dlg_4',
        topic: '请求合作',
        text: '"想与我合作？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格站在我身边。"',
      },
    ],
  },
  {
    id: 'ziwei_xingzhu',
    name: '紫微星主',
    title: '紫微至尊',
    description: '紫微星的统治者，统御整颗星球。紫微星是北斗星域中最重要的星球之一，他作为星主，实力深不可测。',
    greeting: '紫微星主星光绕体，威严道："欢迎来到紫微星，远方的客人。"',
    roomId: 'stone_kingdom_fang_02',
    dialogues: [
      {
        id: 'ziwei_xingzhu_dlg_0',
        topic: '自我介绍',
        text: '"紫微星主，紫微至尊。"他威严地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'ziwei_xingzhu_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'ziwei_xingzhu_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'ziwei_xingzhu_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'ziwei_xingzhu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'yongheng_guodu',
    name: '永恒国度使者',
    title: '永恒使者',
    description: '来自永恒国度的使者，代表着那个科技高度发达的文明。他身穿奇异的服饰，使用着与修仙者截然不同的力量体系。',
    greeting: '永恒国度使者启动身上的装置，发出机械的声音："你好，我是永恒国度第7号使者。"',
    roomId: 'stone_kingdom_fang_03',
    dialogues: [
      {
        id: 'yongheng_guodu_dlg_0',
        topic: '自我介绍',
        text: '"永恒国度使者，永恒使者。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'yongheng_guodu_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'yongheng_guodu_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'yongheng_guodu_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'yongheng_guodu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'gouchen_guxing',
    name: '勾陈古星长老',
    title: '勾陈太上',
    description: '勾陈古星的太上长老，见证了勾陈星的兴衰。他精通勾陈星特有的古法，是勾陈星最受人尊敬的长者。',
    greeting: '勾陈古星长老抚摸着古老的星图，微笑道："勾陈星，已经有十万年没有外人来过了。"',
    roomId: 'stone_kingdom_bishui_yuan',
    dialogues: [
      {
        id: 'gouchen_guxing_dlg_0',
        topic: '自我介绍',
        text: '"勾陈古星长老，勾陈太上。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'gouchen_guxing_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'gouchen_guxing_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'gouchen_guxing_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'gouchen_guxing_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'huosang_xingke',
    name: '火桑星来客',
    title: '火桑遗民',
    description: '来自火桑星的遗民，那颗星球已经毁灭。他背负着复兴母星的使命，流浪在星域之间，寻找新的家园。',
    greeting: '火桑星来客眼中闪过悲伤："火桑星……已经不存在了。我是最后的遗民。"',
    roomId: 'stone_kingdom_fang_04',
    dialogues: [
      {
        id: 'huosang_xingke_dlg_0',
        topic: '自我介绍',
        text: '"火桑星来客，火桑遗民。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'huosang_xingke_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'huosang_xingke_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'huosang_xingke_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'huosang_xingke_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'feixian_xianzi',
    name: '飞仙星仙子',
    title: '飞仙传人',
    description: '来自飞仙星的女修，气质空灵，如飞仙降临。飞仙星以出产美女闻名，她更是其中的佼佼者，是星域中有名的仙子。',
    greeting: '飞仙星仙子翩翩起舞，如仙子临凡："飞仙星来的，见过道友。"',
    roomId: 'stone_kingdom_yaotai',
    dialogues: [
      {
        id: 'feixian_xianzi_dlg_0',
        topic: '自我介绍',
        text: '"飞仙星仙子，飞仙传人。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'feixian_xianzi_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'feixian_xianzi_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'feixian_xianzi_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'feixian_xianzi_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'tianbing_zhanshen',
    name: '天兵星战神',
    title: '天兵统领',
    description: '来自天兵星的战神，统领天兵星的无敌军团。天兵星以出产战士闻名，每一个天兵都是身经百战的勇士。',
    greeting: '天兵星战神甲胄在身，沉声道："天兵星战士，从不退缩！"',
    roomId: 'stone_kingdom_yaotai_food',
    dialogues: [
      {
        id: 'tianbing_zhanshen_dlg_0',
        topic: '自我介绍',
        text: '"天兵星战神，天兵统领。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'tianbing_zhanshen_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'tianbing_zhanshen_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'tianbing_zhanshen_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'tianbing_zhanshen_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'lingbao_qishi',
    name: '灵宝星器师',
    title: '灵宝宗师',
    description: '来自灵宝星的炼器宗师，灵宝星以出产法器闻名。他炼制的法器精美绝伦，威力强大，是星域中最抢手的商品。',
    greeting: '灵宝星器师展示着手中的法器，骄傲道："灵宝星出品，必属精品！"',
    roomId: 'stone_kingdom_yaotai_discuss',
    dialogues: [
      {
        id: 'lingbao_qishi_dlg_0',
        topic: '自我介绍',
        text: '"灵宝星器师，灵宝宗师。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'lingbao_qishi_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'lingbao_qishi_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'lingbao_qishi_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'lingbao_qishi_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'tianyuan_xingzhu',
    name: '天元星主',
    title: '天元至尊',
    description: '天元星的统治者，天元星是北斗星域中灵气最浓郁的星球之一。他作为星主，享受最好的修炼资源，实力恐怖。',
    greeting: '天元星主周身灵气浓郁，微笑道："天元星欢迎每一位求道者。"',
    roomId: 'stone_kingdom_yaotai_pool',
    dialogues: [
      {
        id: 'tianyuan_xingzhu_dlg_0',
        topic: '自我介绍',
        text: '"天元星主，天元至尊。"他威严地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'tianyuan_xingzhu_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'tianyuan_xingzhu_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'tianyuan_xingzhu_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'tianyuan_xingzhu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'huangquan_yinlu',
    name: '黄泉星引路人',
    title: '黄泉渡者',
    description: '来自黄泉星的引路人，黄泉星是传说中连接阴阳两界的星球。他可引渡亡魂，也可带活人进入黄泉，是星域中最神秘的存在。',
    greeting: '黄泉星引路人手持灯笼，灯光幽绿："要过河吗？黄泉路，有去无回。"',
    roomId: 'stone_kingdom_culture_plaza',
    dialogues: [
      {
        id: 'huangquan_yinlu_dlg_0',
        topic: '自我介绍',
        text: '"黄泉星引路人，黄泉渡者。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'huangquan_yinlu_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'huangquan_yinlu_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'huangquan_yinlu_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'huangquan_yinlu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'hundun_yiren',
    name: '混沌星异人',
    title: '混沌之子',
    description: '来自混沌星的异人，在混沌中诞生，拥有不可思议的力量。他的身体由混沌气构成，可幻化万物，是星域中最奇特的存在。',
    greeting: '混沌星异人身体不断变幻，声音缥缈："我来自混沌，终将归于混沌。"',
    roomId: 'stone_kingdom_imperial_gate',
    dialogues: [
      {
        id: 'hundun_yiren_dlg_0',
        topic: '自我介绍',
        text: '"混沌星异人，混沌之子。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'hundun_yiren_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'hundun_yiren_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'hundun_yiren_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'hundun_yiren_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'ziwei_shangren',
    name: '紫薇星商人',
    title: '星际商人',
    description: '一位在北斗星域间做生意的商人，走遍了各大星球。他消息灵通，货物齐全，是星际旅行者们最喜欢的交易对象。',
    greeting: '紫薇星商人打开货舱，热情地介绍："来看看，这可是从飞仙星运来的特产！"',
    roomId: 'stone_kingdom_imperial_city',
    dialogues: [
      {
        id: 'ziwei_shangren_dlg_0',
        topic: '自我介绍',
        text: '"紫薇星商人，星际商人。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'ziwei_shangren_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'ziwei_shangren_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'ziwei_shangren_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'ziwei_shangren_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他咧嘴一笑："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'zangdi_shoumu',
    name: '葬帝星守墓人',
    title: '星域守护者',
    description: '葬帝星的守墓人，世代守护这颗埋葬了无数大帝的星球。他知道葬帝星的所有秘密，却从不对外人透露。',
    greeting: '葬帝星守墓人挡在星门前，沉声道："葬帝星，不是你能踏足的地方。"',
    roomId: 'stone_kingdom_jiaofangsi',
    dialogues: [
      {
        id: 'zangdi_shoumu_dlg_0',
        topic: '自我介绍',
        text: '"葬帝星守墓人，星域守护者。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'zangdi_shoumu_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'zangdi_shoumu_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'zangdi_shoumu_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'zangdi_shoumu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'xingkong_yinlu',
    name: '星空古路引路人',
    title: '古路守护者',
    description: '星空古路的引路人，指引着年轻天骄踏上试炼之路。他见证了无数天骄的崛起与陨落，对星空古路了如指掌。',
    greeting: '星空古路引路人指着远方的星光，微笑道："踏上这条路，就没有回头的机会了。"',
    roomId: 'stone_kingdom_feiyinge',
    dialogues: [
      {
        id: 'xingkong_yinlu_dlg_0',
        topic: '自我介绍',
        text: '"星空古路引路人，古路守护者。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'xingkong_yinlu_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'xingkong_yinlu_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'xingkong_yinlu_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'xingkong_yinlu_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'xingyu_haidao',
    name: '星域海盗',
    title: '星空大盗',
    description: '北斗星域中臭名昭著的海盗，专门劫掠星际商船。他实力强大，行踪诡秘，是星域中最令人头疼的存在。',
    greeting: '星域海盗挥舞着长刀，狂笑道："此路是我开，此星是我栽！留下买路财！"',
    roomId: 'stone_kingdom_feiyinge_2',
    dialogues: [
      {
        id: 'xingyu_haidao_dlg_0',
        topic: '自我介绍',
        text: '"星域海盗，星空大盗。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'xingyu_haidao_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'xingyu_haidao_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'xingyu_haidao_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'xingyu_haidao_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他咧嘴一笑："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'xingji_liulang',
    name: '星际流浪者',
    title: '星空浪人',
    description: '一位在星域间流浪的孤独旅人，没有目的地，只是不断地前行。他去过无数星球，见过无数风景，心中却永远空虚。',
    greeting: '星际流浪者望着星空，淡淡道："我已经流浪了很久……久到忘记了自己来自哪里。"',
    roomId: 'stone_kingdom_feiyinge_3',
    dialogues: [
      {
        id: 'xingji_liulang_dlg_0',
        topic: '自我介绍',
        text: '"星际流浪者，星空浪人。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'xingji_liulang_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'xingji_liulang_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'xingji_liulang_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'xingji_liulang_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'xianyu_shoumen',
    name: '仙域守门人',
    title: '仙门守卫',
    description: '仙域大门的守卫者，世代守护通往仙域的入口。他见证了无数强者试图闯入仙域，却大多铩羽而归，只有极少数人成功。',
    greeting: '仙域守门人横枪而立，仙光弥漫："仙域重地，非仙不可入！"',
    roomId: 'stone_kingdom_baixipeng',
    dialogues: [
      {
        id: 'xianyu_shoumen_dlg_0',
        topic: '自我介绍',
        text: '"仙域守门人，仙门守卫。"他威严地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyu_shoumen_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyu_shoumen_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyu_shoumen_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyu_shoumen_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他横枪而立："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianyu_xianzi',
    name: '仙域仙子',
    title: '仙域女修',
    description: '仙域中的女修，自幼在仙域长大，浑身仙气缭绕。她从未去过下界，对外面的世界充满好奇，却也被仙域的规矩束缚。',
    greeting: '仙域仙子好奇地打量着你，轻声道："你来自下界？听说那里很有趣……"',
    roomId: 'stone_kingdom_ministries',
    dialogues: [
      {
        id: 'xianyu_xianzi_dlg_0',
        topic: '自我介绍',
        text: '"仙域仙子，仙域女修。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyu_xianzi_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyu_xianzi_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyu_xianzi_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyu_xianzi_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianyu_zhanjiang',
    name: '仙域战将',
    title: '仙域战神',
    description: '仙域中的战将，负责守护仙域的安全。他实力恐怖，在下界足以横扫一方，在仙域却只是普通的守卫。',
    greeting: '仙域战将战甲在身，沉声道："下界之人，来仙域所为何事？"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: 'xianyu_zhanjiang_dlg_0',
        topic: '自我介绍',
        text: '"仙域战将，仙域战神。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyu_zhanjiang_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyu_zhanjiang_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyu_zhanjiang_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyu_zhanjiang_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'zhenxian_canhun',
    name: '真仙残魂',
    title: '远古真仙',
    description: '一位远古真仙留下的残魂，飘荡在仙域边缘。他见证了仙域的辉煌与衰落，对如今的仙域充满了失望。',
    greeting: '真仙残魂虚幻不定，叹息道："仙域……已经不是当年的仙域了……"',
    roomId: 'stone_kingdom_scripture',
    dialogues: [
      {
        id: 'zhenxian_canhun_dlg_0',
        topic: '自我介绍',
        text: '"真仙残魂，远古真仙。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'zhenxian_canhun_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'zhenxian_canhun_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'zhenxian_canhun_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'zhenxian_canhun_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianyao_huaxing',
    name: '仙药化形',
    title: '仙药精灵',
    description: '一株生长了百万年的仙药化形而成的小精灵，浑身药香浓郁。她是仙域中最珍贵的存在之一，她的药力可生死人肉白骨。',
    greeting: '仙药化形蹦蹦跳跳地跑过来，脆声道："你好呀！要尝尝我的叶子吗？很甜的！"',
    roomId: 'stone_kingdom_technique',
    dialogues: [
      {
        id: 'xianyao_huaxing_dlg_0',
        topic: '自我介绍',
        text: '"仙药化形，仙药精灵。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyao_huaxing_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyao_huaxing_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyao_huaxing_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyao_huaxing_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianshou_houyi',
    name: '仙兽后裔',
    title: '仙兽血脉',
    description: '远古仙兽的后裔，体内流淌着仙兽之血。他在仙域中长大，实力远超下界同阶，是仙域中未来的强者。',
    greeting: '仙兽后裔威风凛凛，傲然道："我祖先可是跟随过仙王的！"',
    roomId: 'stone_kingdom_prince_mansion',
    dialogues: [
      {
        id: 'xianshou_houyi_dlg_0',
        topic: '自我介绍',
        text: '"仙兽后裔，仙兽血脉。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianshou_houyi_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianshou_houyi_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianshou_houyi_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianshou_houyi_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianyu_qinshi',
    name: '仙域琴师',
    title: '仙音大家',
    description: '仙域中以琴音入道的大家，一曲琴音可动天地。他的琴声在仙域中回荡，据说可洗涤心灵、提升修为。',
    greeting: '仙域琴师拨动琴弦，仙音袅袅："听，这是仙域的声音，也是大道的声音。"',
    roomId: 'stone_kingdom_palace_gate',
    dialogues: [
      {
        id: 'xianyu_qinshi_dlg_0',
        topic: '自我介绍',
        text: '"仙域琴师，仙音大家。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyu_qinshi_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyu_qinshi_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyu_qinshi_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyu_qinshi_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianyu_danlian',
    name: '仙域炼丹师',
    title: '仙丹宗师',
    description: '仙域中的炼丹宗师，可炼制出仙级丹药。他的丹药在仙域中也是抢手货，每一颗都能引起疯抢。',
    greeting: '仙域炼丹师打开丹炉，药香四溢："刚出炉的九转仙丹，要不要来一颗？"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: 'xianyu_danlian_dlg_0',
        topic: '自我介绍',
        text: '"仙域炼丹师，仙丹宗师。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyu_danlian_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyu_danlian_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyu_danlian_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyu_danlian_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianyu_shuishu',
    name: '仙域说书人',
    title: '仙域游吟',
    description: '一位在仙域中游历的说书人，将仙域的故事编成话本。他见多识广，知晓仙域的许多秘闻，是仙域中的百事通。',
    greeting: '仙域说书人清了清嗓子，朗声道："要说这仙域，那可是说来话长……"',
    roomId: 'stone_kingdom_throne',
    dialogues: [
      {
        id: 'xianyu_shuishu_dlg_0',
        topic: '自我介绍',
        text: '"仙域说书人，仙域游吟。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyu_shuishu_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyu_shuishu_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyu_shuishu_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyu_shuishu_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianyu_liulang',
    name: '仙域流浪者',
    title: '仙域浪人',
    description: '一位在仙域中流浪的孤独旅人，没有固定的居所。他看遍了仙域的风景，却找不到归属感，是仙域中最孤独的存在。',
    greeting: '仙域流浪者望着远方，淡淡道："仙域虽大，却没有我的容身之处。"',
    roomId: 'stone_kingdom_harem',
    dialogues: [
      {
        id: 'xianyu_liulang_dlg_0',
        topic: '自我介绍',
        text: '"仙域流浪者，仙域浪人。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyu_liulang_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyu_liulang_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyu_liulang_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyu_liulang_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianwang_xuying',
    name: '仙王虚影',
    title: '远古仙王',
    description: '远古仙王留下的一道虚影，镇压着仙域的某个角落。他虽已逝去，但余威仍在，令所有靠近者心生敬畏。',
    greeting: '仙王虚影浮现，仙威浩荡："后世之人，可知仙王之威？"',
    roomId: 'stone_kingdom_treasure',
    dialogues: [
      {
        id: 'xianwang_xuying_dlg_0',
        topic: '自我介绍',
        text: '"仙王虚影，远古仙王。"他威严地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianwang_xuying_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianwang_xuying_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianwang_xuying_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianwang_xuying_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianyu_zhexian',
    name: '仙域谪仙',
    title: '谪落仙人',
    description: '一位因犯错被贬下凡的仙人，流落在仙域边缘。他心中充满了不甘和怨恨，一心想要重返仙界，恢复昔日的荣光。',
    greeting: '仙域谪仙眼中闪过怨恨，冷声道："我本是仙，却被贬至此。总有一天，我要回去！"',
    roomId: 'stone_kingdom_flying_platform',
    dialogues: [
      {
        id: 'xianyu_zhexian_dlg_0',
        topic: '自我介绍',
        text: '"仙域谪仙，谪落仙人。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyu_zhexian_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyu_zhexian_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyu_zhexian_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyu_zhexian_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianyu_lingquan',
    name: '仙域灵泉守护者',
    title: '泉灵',
    description: '仙域中一口灵泉的守护者，本体是泉水中诞生的精灵。他掌管着灵泉的水源，可赐予有缘人仙泉之水。',
    greeting: '仙域灵泉守护者从泉水中浮现，微笑道："饮一口仙泉水，可延年益寿。"',
    roomId: 'beidou_star_field',
    dialogues: [
      {
        id: 'xianyu_lingquan_dlg_0',
        topic: '自我介绍',
        text: '"仙域灵泉守护者，泉灵。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyu_lingquan_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyu_lingquan_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyu_lingquan_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyu_lingquan_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianyu_gushu',
    name: '仙域古树的灵',
    title: '树灵',
    description: '仙域中一棵万古古树诞生的树灵，见证了仙域的无数岁月。他知晓仙域的许多秘密，却只在特定的时候才会开口。',
    greeting: '仙域古树的枝叶沙沙作响，苍老的声音传来："年轻人，我在你身上感受到了熟悉的气息……"',
    roomId: 'huanggu_forbidden',
    dialogues: [
      {
        id: 'xianyu_gushu_dlg_0',
        topic: '自我介绍',
        text: '"仙域古树的灵，树灵。"他温和地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyu_gushu_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyu_gushu_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyu_gushu_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyu_gushu_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'xianyu_zhifa',
    name: '仙域执法者',
    title: '仙律执行',
    description: '仙域中的执法者，负责维护仙域的秩序。他冷酷无情，对违反仙律者毫不手软，是仙域中最令人畏惧的存在。',
    greeting: '仙域执法者手持仙律玉简，冷声道："你违反了仙律第7条，跟我走一趟。"',
    roomId: 'yuhua_school',
    dialogues: [
      {
        id: 'xianyu_zhifa_dlg_0',
        topic: '自我介绍',
        text: '"仙域执法者，仙律执行。"他威严地说道："仙域，是众生梦寐以求的圣地。"',
      },
      {
        id: 'xianyu_zhifa_dlg_1',
        topic: '问仙域秘密',
        text: '"仙域的秘密？"他意味深长："仙域并非完美的乐土，这里也有纷争，也有黑暗。只是下界的人看不到罢了。"',
      },
      {
        id: 'xianyu_zhifa_dlg_2',
        topic: '谈成仙之道',
        text: '"成仙之路，艰难无比。"他缓缓道："即便到了仙域，也未必能成仙。真正的仙，需要感悟大道，超脱自我。"',
      },
      {
        id: 'xianyu_zhifa_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'xianyu_zhifa_dlg_4',
        topic: '请求进入仙域',
        text: '"想进仙域？"他沉吟片刻："仙域大门，非有缘者不可开。你……有那个缘分吗？"',
      },
    ],
  },
  {
    id: 'shandian_niao',
    name: '闪电鸟',
    title: '雷电异兽',
    description: '一种以雷电为生的异兽，速度如闪电般迅捷。它常出现在雷雨天气中，吞噬雷电修炼，是修士们最头疼的异兽之一。',
    greeting: '闪电鸟浑身电光闪烁，鸣叫道："啾——"',
    roomId: 'beidou_city_gate',
    dialogues: [
      {
        id: 'shandian_niao_dlg_0',
        topic: '自我介绍',
        text: '"闪电鸟，雷电异兽。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'shandian_niao_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'shandian_niao_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'shandian_niao_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'shandian_niao_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他惊讶："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'jiuye_jiancao',
    name: '九叶剑草',
    title: '剑道灵植',
    description: '一株生长了万年的剑草，叶片如剑，可发出惊天剑气。它虽为植物，却领悟了剑道真意，是植物中的剑道宗师。',
    greeting: '九叶剑草的叶片轻轻颤动，剑气纵横："靠近我，你会被剑气所伤。"',
    roomId: 'beidou_city_main_street',
    dialogues: [
      {
        id: 'jiuye_jiancao_dlg_0',
        topic: '自我介绍',
        text: '"九叶剑草，剑道灵植。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'jiuye_jiancao_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'jiuye_jiancao_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'jiuye_jiancao_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'jiuye_jiancao_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他惊讶："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'tongling_gushi',
    name: '通灵古尸',
    title: '古尸通灵',
    description: '一具远古尸体通灵而生，保留了生前的部分记忆。他不记得自己是谁，只记得一些模糊的片段，在世间游荡寻找答案。',
    greeting: '通灵古尸歪着头，嘶哑道："我……是谁……你……认识我吗……"',
    roomId: 'beidou_city_east_market',
    dialogues: [
      {
        id: 'tongling_gushi_dlg_0',
        topic: '自我介绍',
        text: '"通灵古尸，古尸通灵。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'tongling_gushi_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'tongling_gushi_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'tongling_gushi_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'tongling_gushi_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他惊讶："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'yinling_jiangjun',
    name: '阴灵将军',
    title: '鬼道战将',
    description: '一位死后化为阴灵的将军，统领着一支阴兵。他在夜间出没，四处征战，却不知自己早已死去，只剩下战斗的本能。',
    greeting: '阴灵将军挥舞着锈迹斑斑的长刀，嘶吼道："杀——为了陛下——"',
    roomId: 'beidou_city_west_market',
    dialogues: [
      {
        id: 'yinling_jiangjun_dlg_0',
        topic: '自我介绍',
        text: '"阴灵将军，鬼道战将。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'yinling_jiangjun_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'yinling_jiangjun_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'yinling_jiangjun_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'yinling_jiangjun_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他惊讶："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'shan_shen',
    name: '山神',
    title: '山岳之灵',
    description: '一座大山的山神，由山中灵气孕育而生。他守护着大山和山中的生灵，对破坏山林者毫不留情。',
    greeting: '山神的声音从山中传来，隆隆作响："人类，不要破坏我的山林！"',
    roomId: 'beidou_imperial_city',
    dialogues: [
      {
        id: 'shan_shen_dlg_0',
        topic: '自我介绍',
        text: '"山神，山岳之灵。"他傲然地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'shan_shen_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'shan_shen_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'shan_shen_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'shan_shen_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'he_bo',
    name: '河伯',
    title: '水域之主',
    description: '一条大河的河伯，掌管着河流的水文。他可控制河水涨落，保佑两岸风调雨顺，也可发洪水惩罚恶人。',
    greeting: '河伯从水中浮现，微笑道："我是这条河的河伯，要渡河吗？"',
    roomId: 'beidou_imperial_palace',
    dialogues: [
      {
        id: 'he_bo_dlg_0',
        topic: '自我介绍',
        text: '"河伯，水域之主。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'he_bo_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'he_bo_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'he_bo_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'he_bo_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'tudi_gong',
    name: '土地公',
    title: '土地之神',
    description: '一方土地的土地神，掌管着这片土地上的琐事。他虽是小神，却与百姓最亲近，是民间最常见的神明。',
    greeting: '土地公从地下钻出，笑呵呵道："这位客官，可是在找什么地方？老朽或许知道。"',
    roomId: 'beidou_sky_pavilion',
    dialogues: [
      {
        id: 'tudi_gong_dlg_0',
        topic: '自我介绍',
        text: '"土地公，土地之神。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'tudi_gong_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'tudi_gong_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'tudi_gong_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'tudi_gong_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'cheng_huang',
    name: '城隍',
    title: '城池守护神',
    description: '一座城池的城隍，掌管着城中的善恶功过。他守护着城池的安宁，审判死者的灵魂，是城中百姓最敬畏的神明。',
    greeting: '城隍端坐城隍庙中，威严道："城中之事，皆在本神掌控之中。"',
    roomId: 'huanggu_core',
    dialogues: [
      {
        id: 'cheng_huang_dlg_0',
        topic: '自我介绍',
        text: '"城隍，城池守护神。"他傲然地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'cheng_huang_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'cheng_huang_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'cheng_huang_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'cheng_huang_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他惊讶："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'jiangshi_wang',
    name: '僵尸王',
    title: '尸族之王',
    description: '僵尸一族的王，浑身长满绿毛，力大无穷。他统领着僵尸大军，在夜间出没，是活人最恐惧的存在。',
    greeting: '僵尸王仰天咆哮，尸气冲天："吼——活人……血肉……"',
    roomId: 'huanggu_tomb',
    dialogues: [
      {
        id: 'jiangshi_wang_dlg_0',
        topic: '自我介绍',
        text: '"僵尸王，尸族之王。"他傲然地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'jiangshi_wang_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'jiangshi_wang_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'jiangshi_wang_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'jiangshi_wang_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他惊讶："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'gui_xiu',
    name: '鬼修',
    title: '鬼道修士',
    description: '一位以鬼道修炼的修士，肉身已毁，只剩神魂。他在鬼道之路上越走越远，最终可能成为鬼仙，也可能永世不得超生。',
    greeting: '鬼修虚幻的身影飘忽不定，阴森道："我已非人，却还在追求大道。可笑吗？"',
    roomId: 'huanggu_lake',
    dialogues: [
      {
        id: 'gui_xiu_dlg_0',
        topic: '自我介绍',
        text: '"鬼修，鬼道修士。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'gui_xiu_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'gui_xiu_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'gui_xiu_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'gui_xiu_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他惊讶："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_246',
    name: '欧阳锋',
    title: '欧阳家主',
    description: '荒古世家欧阳家的当代家主，修炼毒功，令人闻风丧胆。欧阳家以用毒闻名天下，他更是将毒道修炼到了极致，一念可毒杀万人。',
    greeting: '欧阳锋周身毒气缭绕，阴冷道："欧阳家的毒，你可敢试一试？"',
    roomId: 'xianyu_gate',
    dialogues: [
      {
        id: 'npc_246_dlg_0',
        topic: '自我介绍',
        text: '"欧阳锋，欧阳家主。"他淡淡道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_246_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_246_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_246_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_246_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他审视着你："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_247',
    name: '欧阳雪',
    title: '欧阳明珠',
    description: '欧阳家的大小姐，天生毒体，百毒不侵。她看似柔弱美丽，实则身怀剧毒，触之即死，是世间最危险的女子之一。',
    greeting: '欧阳雪浅浅一笑，眸中毒光一闪："别碰我，你会死的。"',
    roomId: 'xianyu_palace',
    dialogues: [
      {
        id: 'npc_247_dlg_0',
        topic: '自我介绍',
        text: '"欧阳雪，欧阳明珠。"他淡淡道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_247_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_247_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_247_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_247_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他审视着你："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_248',
    name: '南岭蛮王',
    title: '蛮族之王',
    description: '南岭蛮族的王者，身材魁梧如山，力大无穷。蛮族不修法术，只修肉身，他将肉身修炼到可硬撼神兵的地步，是南岭的霸主。',
    greeting: '南岭蛮王一拳砸碎地面，声如雷鸣："蛮族战士，从不退缩！"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: 'npc_248_dlg_0',
        topic: '自我介绍',
        text: '"南岭蛮王，蛮族之王。"他傲然道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_248_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_248_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_248_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_248_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他审视着你："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_249',
    name: '南岭巫女',
    title: '蛮族巫祝',
    description: '南岭蛮族中的巫女，精通巫术和蛊毒。她在蛮族中地位超然，可与祖先沟通，预测吉凶，是蛮族的精神领袖。',
    greeting: '南岭巫女摇着骨铃，声音沙哑："祖先有灵，示我以天机……"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: 'npc_249_dlg_0',
        topic: '自我介绍',
        text: '"南岭巫女，蛮族巫祝。"他淡淡道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_249_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_249_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_249_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_249_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他微微一笑："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_250',
    name: '风家圣主',
    title: '风神传人',
    description: '荒古世家风家的当代圣主，修炼风之道法，速度无双。他身形如风，来无影去无踪，是东荒最难以捉摸的人物之一。',
    greeting: '一阵风吹过，风家圣主的身影若隐若现："风之所在，我便在。"',
    roomId: 'stone_kingdom_zhuque',
    dialogues: [
      {
        id: 'npc_250_dlg_0',
        topic: '自我介绍',
        text: '"风家圣主，风神传人。"他傲然道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_250_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_250_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_250_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_250_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他审视着你："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_251',
    name: '风家圣女',
    title: '风之仙子',
    description: '风家选定的圣女，天生与风亲和，可御风而行。她性格洒脱，不受拘束，如风一般自由，是东荒无数修士心中的自由女神。',
    greeting: '风家圣女乘风而来，衣袂飘飘："风带我去哪里，我便去哪里。"',
    roomId: 'stone_kingdom_east_market',
    dialogues: [
      {
        id: 'npc_251_dlg_0',
        topic: '自我介绍',
        text: '"风家圣女，风之仙子。"他淡淡道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_251_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_251_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_251_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_251_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他微微一笑："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_252',
    name: '北原王家主',
    title: '王家至尊',
    description: '北原王家的家主，王腾之父，实力恐怖。他将王家治理成北原第一世家，野心勃勃，一心想要让王家成为帝族。',
    greeting: '北原王家主目光如炬，沉声道："我儿王腾，有大帝之资！"',
    roomId: 'stone_kingdom_west_market',
    dialogues: [
      {
        id: 'npc_252_dlg_0',
        topic: '自我介绍',
        text: '"北原王家主，王家至尊。"他傲然道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_252_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_252_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_252_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_252_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他审视着你："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_253',
    name: '北原王家长老',
    title: '王家太上',
    description: '北原王家的太上长老，见证了王家的崛起。他对王家忠心耿耿，是王家的定海神针，在王家中威望极高。',
    greeting: '北原王家长老抚须微笑："王家底蕴，岂是常人能知？"',
    roomId: 'stone_kingdom_huji_tavern',
    dialogues: [
      {
        id: 'npc_253_dlg_0',
        topic: '自我介绍',
        text: '"北原王家长老，王家太上。"他傲然道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_253_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_253_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_253_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_253_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他审视着你："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_254',
    name: '中州张家主',
    title: '张家家主',
    description: '中州张家的家主，精通阵法之道。张家以阵法闻名中州，他更是将阵法修炼到出神入化的地步，一念可布下杀阵。',
    greeting: '中州张家主手中阵旗挥舞，微笑道："入我阵中，生死由我。"',
    roomId: 'stone_kingdom_wanjintang',
    dialogues: [
      {
        id: 'npc_254_dlg_0',
        topic: '自我介绍',
        text: '"中州张家主，张家家主。"他傲然道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_254_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_254_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_254_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_254_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他审视着你："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_255',
    name: '中州张家长老',
    title: '张家太上',
    description: '中州张家的太上长老，阵法宗师。他一生研究阵法，可布下传送万里的超级大阵，是张家最宝贵的财富。',
    greeting: '中州张家长老看着阵图，皱眉道："这阵法……还有改进的空间。"',
    roomId: 'stone_kingdom_wanjintang_back',
    dialogues: [
      {
        id: 'npc_255_dlg_0',
        topic: '自我介绍',
        text: '"中州张家长老，张家太上。"他淡淡道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_255_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_255_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_255_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_255_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他审视着你："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_256',
    name: '西漠李家家主',
    title: '李家之主',
    description: '西漠李家的家主，修炼佛武之道，战力惊人。李家世代与佛门交好，他将佛法与武道融合，创出独特的佛武之道。',
    greeting: '西漠李家家主双手合十，却战意盎然："佛也有火，施主莫要逼我。"',
    roomId: 'stone_kingdom_dark_market',
    dialogues: [
      {
        id: 'npc_256_dlg_0',
        topic: '自我介绍',
        text: '"西漠李家家主，李家之主。"他傲然道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_256_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_256_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_256_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_256_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他审视着你："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_257',
    name: '西漠李家小姐',
    title: '李家千金',
    description: '西漠李家的大小姐，自幼在佛寺长大，精通佛法。她心地善良，常行善事，在西漠百姓中口碑极好。',
    greeting: '西漠李家小姐盈盈一礼，温柔道："施主有礼了，愿佛光普照于你。"',
    roomId: 'stone_kingdom_zuiyuefang',
    dialogues: [
      {
        id: 'npc_257_dlg_0',
        topic: '自我介绍',
        text: '"西漠李家小姐，李家千金。"他淡淡道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_257_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_257_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_257_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_257_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他微微一笑："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_258',
    name: '东荒赵家主',
    title: '赵家至尊',
    description: '东荒赵家的家主，修炼雷之道法，可召唤天雷。赵家以雷法闻名东荒，他更是将雷法修炼到可引动九天神雷的地步。',
    greeting: '东荒赵家主周身雷电缠绕，威严道："天雷滚滚，邪魔退散！"',
    roomId: 'stone_kingdom_cangchun',
    dialogues: [
      {
        id: 'npc_258_dlg_0',
        topic: '自我介绍',
        text: '"东荒赵家主，赵家至尊。"他傲然道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_258_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_258_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_258_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_258_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他审视着你："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_259',
    name: '东荒赵家小姐',
    title: '赵家明珠',
    description: '东荒赵家的小姐，天生雷灵体，可自由操控雷电。她性格泼辣，嫉恶如仇，是东荒年轻一代中有名的女汉子。',
    greeting: '东荒赵家小姐指尖电光闪烁，哼道："谁敢欺负本姑娘，电死他！"',
    roomId: 'stone_kingdom_cangchun_pool',
    dialogues: [
      {
        id: 'npc_259_dlg_0',
        topic: '自我介绍',
        text: '"东荒赵家小姐，赵家明珠。"他淡淡道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_259_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_259_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_259_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_259_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他微微一笑："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_260',
    name: '南岭吴家主',
    title: '吴家之主',
    description: '南岭吴家的家主，精通蛊术和巫术。吴家与蛮族世代交好，他将蛊术修炼到可控制万虫的地步，令人不寒而栗。',
    greeting: '南岭吴家主袖中爬出一只金蚕，阴笑道："我的宝贝，想尝尝你的味道。"',
    roomId: 'stone_kingdom_yicui',
    dialogues: [
      {
        id: 'npc_260_dlg_0',
        topic: '自我介绍',
        text: '"南岭吴家主，吴家之主。"他傲然道："世家传承，非寻常势力可比。"',
      },
      {
        id: 'npc_260_dlg_1',
        topic: '问家族历史',
        text: '"我族传承久远，历经无数风雨。"他自豪道："历代先辈皆是一方人杰，留下了不朽的功业和传承。"',
      },
      {
        id: 'npc_260_dlg_2',
        topic: '谈修炼之道',
        text: '"修炼之道，贵在专精。"他沉吟道："我族世代专修一道，将其发挥到极致，方有今日之地位。"',
      },
      {
        id: 'npc_260_dlg_3',
        topic: '论世家责任',
        text: '"身为世家之人，肩负着家族的荣耀和责任。"他沉声道："无论何时，都不能让家族蒙羞。"',
      },
      {
        id: 'npc_260_dlg_4',
        topic: '请求结盟',
        text: '"想与我族结盟？"他审视着你："需看你有没有那个资格和价值。"',
      },
    ],
  },
  {
    id: 'npc_261',
    name: '逍遥门主',
    title: '逍遥至尊',
    description: '逍遥门的门主，修炼逍遥之道，来去如风。逍遥门讲究随心所欲，他在东荒各大圣地中是最洒脱的一位。',
    greeting: '逍遥门主大袖飘飘，笑道："逍遥天地间，何处不可去？"',
    roomId: 'stone_kingdom_zuixian',
    dialogues: [
      {
        id: 'npc_261_dlg_0',
        topic: '自我介绍',
        text: '"逍遥门主，逍遥至尊。"他傲然道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_261_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_261_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_261_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_261_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他审视着你："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_262',
    name: '逍遥圣女',
    title: '逍遥仙子',
    description: '逍遥门选定的圣女，性格洒脱不羁，不受礼法约束。她常独自一人游历天下，是东荒各大圣地中最特立独行的女子。',
    greeting: '逍遥圣女骑鹤而来，挥挥手："嘿，要不要一起游历天下？"',
    roomId: 'stone_kingdom_taohua',
    dialogues: [
      {
        id: 'npc_262_dlg_0',
        topic: '自我介绍',
        text: '"逍遥圣女，逍遥仙子。"他淡淡道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_262_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_262_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_262_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_262_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他温婉一笑："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_263',
    name: '焚香谷主',
    title: '焚香大师',
    description: '焚香谷的谷主，精通火之道法和炼丹之术。焚香谷以炼丹闻名天下，他炼制的丹药供不应求，是各大势力争相拉拢的对象。',
    greeting: '焚香谷主丹炉中火光熊熊，笑道："来尝尝老夫新炼的丹药？"',
    roomId: 'stone_kingdom_fang_01',
    dialogues: [
      {
        id: 'npc_263_dlg_0',
        topic: '自我介绍',
        text: '"焚香谷主，焚香大师。"他傲然道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_263_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_263_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_263_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_263_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他审视着你："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_264',
    name: '焚香谷长老',
    title: '炼丹宗师',
    description: '焚香谷的炼丹宗师，一生痴迷于炼丹。他可炼制出各种稀奇古怪的丹药，有些甚至连他自己都不知道功效。',
    greeting: '焚香谷长老捧着一颗七彩丹药，兴奋道："成功了！这次一定能成功！"',
    roomId: 'stone_kingdom_fang_02',
    dialogues: [
      {
        id: 'npc_264_dlg_0',
        topic: '自我介绍',
        text: '"焚香谷长老，炼丹宗师。"他淡淡道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_264_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_264_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_264_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_264_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他审视着你："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_265',
    name: '天剑门主',
    title: '剑道至尊',
    description: '天剑门的门主，剑道修为深不可测。天剑门以剑入道，他将剑道修炼到剑气纵横三万里的境界，是东荒第一剑修。',
    greeting: '天剑门主背后长剑轻鸣，淡淡道："剑之所在，心之所在。"',
    roomId: 'stone_kingdom_fang_03',
    dialogues: [
      {
        id: 'npc_265_dlg_0',
        topic: '自我介绍',
        text: '"天剑门主，剑道至尊。"他傲然道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_265_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_265_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_265_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_265_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他审视着你："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_266',
    name: '天剑门圣女',
    title: '剑道仙子',
    description: '天剑门选定的圣女，人如其名，冷若冰霜，剑气凌人。她一心向剑，对男女之情毫无兴趣，是世间最纯粹的剑修。',
    greeting: '天剑门圣女剑指一引，剑气森然："出剑吧，让我看看你的剑道。"',
    roomId: 'stone_kingdom_bishui_yuan',
    dialogues: [
      {
        id: 'npc_266_dlg_0',
        topic: '自我介绍',
        text: '"天剑门圣女，剑道仙子。"他淡淡道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_266_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_266_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_266_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_266_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他温婉一笑："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_267',
    name: '玄阴教教主',
    title: '玄阴魔主',
    description: '玄阴教的教主，修炼玄阴魔功，是东荒魔道中的巨擘。他心狠手辣，为达目的不择手段，令正道修士闻风丧胆。',
    greeting: '玄阴教教主魔气滔天，阴森道："正道？魔道？不过是弱者的借口罢了。"',
    roomId: 'stone_kingdom_fang_04',
    dialogues: [
      {
        id: 'npc_267_dlg_0',
        topic: '自我介绍',
        text: '"玄阴教教主，玄阴魔主。"他傲然道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_267_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_267_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_267_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_267_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他审视着你："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_268',
    name: '玄阴教圣女',
    title: '玄阴魔女',
    description: '玄阴教选定的圣女，美貌妖娆，心如蛇蝎。她以美色为武器，迷惑了无数正道修士，是玄阴教最锋利的刀。',
    greeting: '玄阴教圣女媚眼如丝，轻笑道："公子，可愿为奴家赴汤蹈火？"',
    roomId: 'stone_kingdom_yaotai',
    dialogues: [
      {
        id: 'npc_268_dlg_0',
        topic: '自我介绍',
        text: '"玄阴教圣女，玄阴魔女。"他淡淡道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_268_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_268_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_268_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_268_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他温婉一笑："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_269',
    name: '天机阁主',
    title: '天机老人',
    description: '天机阁的阁主，精通推演天机之术，可预测未来。天机阁是东荒最神秘的势力之一，他更是神秘中的神秘，极少现身。',
    greeting: '天机阁主掐指一算，皱眉道："奇怪，你的命数为何如此模糊？"',
    roomId: 'stone_kingdom_yaotai_food',
    dialogues: [
      {
        id: 'npc_269_dlg_0',
        topic: '自我介绍',
        text: '"天机阁主，天机老人。"他傲然道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_269_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_269_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_269_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_269_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他审视着你："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_270',
    name: '天机阁弟子',
    title: '天机传人',
    description: '天机阁的弟子，精通卦象之术。他常年在世间行走，为人算命测吉凶，是天机阁在世间的手脚。',
    greeting: '天机阁弟子展开八卦盘，微笑道："来算一卦？不准不收钱。"',
    roomId: 'stone_kingdom_yaotai_discuss',
    dialogues: [
      {
        id: 'npc_270_dlg_0',
        topic: '自我介绍',
        text: '"天机阁弟子，天机传人。"他淡淡道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_270_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_270_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_270_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_270_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他审视着你："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_271',
    name: '万兽门主',
    title: '万兽至尊',
    description: '万兽门的门主，精通御兽之术，可操控万兽。万兽门以御兽闻名，他更是可召唤远古异兽，战力惊人。',
    greeting: '万兽门主身后万兽咆哮，傲然道："万兽听令，踏平敌阵！"',
    roomId: 'stone_kingdom_yaotai_pool',
    dialogues: [
      {
        id: 'npc_271_dlg_0',
        topic: '自我介绍',
        text: '"万兽门主，万兽至尊。"他傲然道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_271_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_271_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_271_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_271_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他审视着你："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_272',
    name: '万兽门圣女',
    title: '兽语仙子',
    description: '万兽门选定的圣女，天生可与兽类沟通。她从小与兽类一起长大，将兽类视为家人，可号令百兽为己用。',
    greeting: '万兽门圣女肩上趴着一只灵狐，微笑道："小白说，你是个好人。"',
    roomId: 'stone_kingdom_culture_plaza',
    dialogues: [
      {
        id: 'npc_272_dlg_0',
        topic: '自我介绍',
        text: '"万兽门圣女，兽语仙子。"他淡淡道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_272_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_272_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_272_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_272_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他温婉一笑："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_273',
    name: '玄天宗主',
    title: '玄天至尊',
    description: '玄天宗的宗主，修炼玄天之道，可借用天地之力。玄天宗是东荒最古老的宗门之一，他肩负着守护宗门传承的重任。',
    greeting: '玄天宗主周身天地之力环绕，威严道："玄天宗，传承万古，不容侵犯！"',
    roomId: 'stone_kingdom_imperial_gate',
    dialogues: [
      {
        id: 'npc_273_dlg_0',
        topic: '自我介绍',
        text: '"玄天宗主，玄天至尊。"他傲然道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_273_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_273_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_273_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_273_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他审视着你："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_274',
    name: '玄天宗长老',
    title: '玄天太上',
    description: '玄天宗的太上长老，见证了宗门的兴衰。他将一生奉献给了玄天宗，是宗门最忠诚的守护者。',
    greeting: '玄天宗长老抚摸着宗门石碑，感慨道："玄天宗……还在就好……"',
    roomId: 'stone_kingdom_imperial_city',
    dialogues: [
      {
        id: 'npc_274_dlg_0',
        topic: '自我介绍',
        text: '"玄天宗长老，玄天太上。"他淡淡道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_274_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_274_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_274_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_274_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他审视着你："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_275',
    name: '玉女掌门',
    title: '玉女至尊',
    description: '玉女派的掌门，修炼玉女心经，容貌永驻。玉女派只收女弟子，她将门派打理得井井有条，是东荒女修门派中的佼佼者。',
    greeting: '玉女掌门容颜不老，淡淡道："玉女派，只收女弟子。你是来做什么的？"',
    roomId: 'stone_kingdom_jiaofangsi',
    dialogues: [
      {
        id: 'npc_275_dlg_0',
        topic: '自我介绍',
        text: '"玉女掌门，玉女至尊。"他淡淡道："我派传承久远，岂是寻常门派可比。"',
      },
      {
        id: 'npc_275_dlg_1',
        topic: '问门派历史',
        text: '"我派开创于远古时期，历经无数大劫而不倒。"他自豪道："历代祖师皆是一方人杰，留下了不朽的传承。"',
      },
      {
        id: 'npc_275_dlg_2',
        topic: '谈修炼之法',
        text: '"我派修炼之法，重在专一。"他沉吟道："将一道修炼到极致，便可触类旁通，万法归一。"',
      },
      {
        id: 'npc_275_dlg_3',
        topic: '论正魔之分',
        text: '"正道魔道，不过是世人贴的标签。"他冷声道："真正的强者，不分正魔，只分强弱。"',
      },
      {
        id: 'npc_275_dlg_4',
        topic: '请求加入',
        text: '"想入我派？"他温婉一笑："需通过考核，证明你的资质和心性。"',
      },
    ],
  },
  {
    id: 'npc_276',
    name: '白虎王',
    title: '西方白虎',
    description: '妖族四大圣兽之一白虎的后裔，统领西方妖族。他杀伐果断，战力惊人，是妖族中最令人敬畏的王者之一。',
    greeting: '白虎王仰天长啸，杀气冲天："白虎一出，万兽臣服！"',
    roomId: 'stone_kingdom_feiyinge',
    dialogues: [
      {
        id: 'npc_276_dlg_0',
        topic: '自我介绍',
        text: '"白虎王，西方白虎。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_276_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_276_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_276_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_276_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_277',
    name: '玄武王',
    title: '北方玄武',
    description: '妖族四大圣兽之一玄武的后裔，统领北方妖族。他防御无双，几乎不可破，是妖族中最坚固的盾牌。',
    greeting: '玄武王背负龟甲，沉稳道："想要破我防御？再来一万年吧。"',
    roomId: 'stone_kingdom_feiyinge_2',
    dialogues: [
      {
        id: 'npc_277_dlg_0',
        topic: '自我介绍',
        text: '"玄武王，北方玄武。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_277_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_277_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_277_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_277_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_278',
    name: '朱雀王',
    title: '南方朱雀',
    description: '妖族四大圣兽之一朱雀的后裔，统领南方妖族。她周身南明离火燃烧，可焚尽万物，是妖族中最炽热的存在。',
    greeting: '朱雀王周身南明离火燃烧，炽热逼人："靠近我，你会化为灰烬。"',
    roomId: 'stone_kingdom_feiyinge_3',
    dialogues: [
      {
        id: 'npc_278_dlg_0',
        topic: '自我介绍',
        text: '"朱雀王，南方朱雀。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_278_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_278_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_278_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_278_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_279',
    name: '麒麟子',
    title: '麒麟后裔',
    description: '远古麒麟一族的后裔，身负祥瑞之气。麒麟一族自古便是祥瑞的象征，他走到哪里，哪里便有福气降临。',
    greeting: '麒麟子周身瑞气千条，温和道："麒麟踏祥云，人间百难消。"',
    roomId: 'stone_kingdom_baixipeng',
    dialogues: [
      {
        id: 'npc_279_dlg_0',
        topic: '自我介绍',
        text: '"麒麟子，麒麟后裔。"他淡淡道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_279_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_279_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_279_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_279_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_280',
    name: '貔貅王',
    title: '招财神兽',
    description: '远古貔貅一族的王者，可吞万物而不泄，只进不出。他被商人视为财神，常被人供奉以求财运。',
    greeting: '貔貅王大嘴一张，金光闪闪："想发财？给我贡品，我保你财运亨通！"',
    roomId: 'stone_kingdom_ministries',
    dialogues: [
      {
        id: 'npc_280_dlg_0',
        topic: '自我介绍',
        text: '"貔貅王，招财神兽。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_280_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_280_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_280_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_280_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_281',
    name: '白泽妖王',
    title: '通晓万物',
    description: '白泽一族的妖王，通晓万物之情，知晓天下所有鬼怪的名字和弱点。他是妖族中的智者，连妖帝都对他敬重三分。',
    greeting: '白泽妖王翻开古籍，微笑道："你想知道什么？天下万物，没有我不知道的。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: 'npc_281_dlg_0',
        topic: '自我介绍',
        text: '"白泽妖王，通晓万物。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_281_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_281_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_281_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_281_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_282',
    name: '相柳妖圣',
    title: '九头蛇圣',
    description: '相柳一族的妖圣，本体是九头巨蛇，剧毒无比。他是妖族中最危险的存在之一，九个脑袋可同时喷出不同的毒液。',
    greeting: '相柳妖圣九个头颅同时嘶吼，毒雾弥漫："九个脑袋，九种毒，你要尝尝哪一种？"',
    roomId: 'stone_kingdom_scripture',
    dialogues: [
      {
        id: 'npc_282_dlg_0',
        topic: '自我介绍',
        text: '"相柳妖圣，九头蛇圣。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_282_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_282_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_282_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_282_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_283',
    name: '毕方妖王',
    title: '火鸟之王',
    description: '毕方一族的妖王，本体是一只独脚火鸟，所过之处便会发生火灾。他性格暴躁，难以控制自己的力量。',
    greeting: '毕方妖王单脚站立，周身火焰燃烧："离我远点，我不想烧死你。"',
    roomId: 'stone_kingdom_technique',
    dialogues: [
      {
        id: 'npc_283_dlg_0',
        topic: '自我介绍',
        text: '"毕方妖王，火鸟之王。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_283_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_283_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_283_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_283_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_284',
    name: '穷奇妖王',
    title: '凶兽之王',
    description: '穷奇一族的妖王，四大凶兽之一，性情残暴，喜食人。他是妖族中最凶残的存在，连妖族内部都对他忌惮三分。',
    greeting: '穷奇妖王舔了舔嘴唇，残忍道："人肉的味道，我已经很久没尝过了。"',
    roomId: 'stone_kingdom_prince_mansion',
    dialogues: [
      {
        id: 'npc_284_dlg_0',
        topic: '自我介绍',
        text: '"穷奇妖王，凶兽之王。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_284_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_284_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_284_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_284_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_285',
    name: '饕餮妖王',
    title: '贪吃之王',
    description: '饕餮一族的妖王，四大凶兽之一，贪吃无比。他可吞噬万物，永远吃不饱，是妖族中最另类的存在。',
    greeting: '饕餮妖王摸着肚子，可怜巴巴："好饿……你有吃的吗？什么都行。"',
    roomId: 'stone_kingdom_palace_gate',
    dialogues: [
      {
        id: 'npc_285_dlg_0',
        topic: '自我介绍',
        text: '"饕餮妖王，贪吃之王。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_285_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_285_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_285_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_285_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_286',
    name: '混沌妖王',
    title: '无面之王',
    description: '混沌一族的妖王，四大凶兽之一，没有五官，混沌一片。他实力恐怖，可操控混沌之力，是妖族中最神秘的存在。',
    greeting: '混沌妖王的无面头颅转向你，声音从虚空中传来："我没有眼睛，但我能看到你。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: 'npc_286_dlg_0',
        topic: '自我介绍',
        text: '"混沌妖王，无面之王。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_286_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_286_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_286_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_286_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_287',
    name: '梼杌妖王',
    title: '顽凶之王',
    description: '梼杌一族的妖王，四大凶兽之一，顽固凶恶，死不悔改。他是妖族中最难对付的存在，一旦结仇便不死不休。',
    greeting: '梼杌妖王凶目圆睁，怒吼道："要么滚，要么死，没有第三条路！"',
    roomId: 'stone_kingdom_throne',
    dialogues: [
      {
        id: 'npc_287_dlg_0',
        topic: '自我介绍',
        text: '"梼杌妖王，顽凶之王。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_287_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_287_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_287_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_287_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_288',
    name: '青鸾仙子',
    title: '神鸟青鸾',
    description: '青鸾一族的仙子，本体是一只美丽的青鸾鸟，可带来吉祥。她性情温和，不喜争斗，是妖族中最受人喜爱的存在。',
    greeting: '青鸾仙子翩翩起舞，歌声悠扬："青鸾鸣叫，天下安宁。"',
    roomId: 'stone_kingdom_harem',
    dialogues: [
      {
        id: 'npc_288_dlg_0',
        topic: '自我介绍',
        text: '"青鸾仙子，神鸟青鸾。"他淡淡道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_288_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_288_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_288_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_288_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他温婉一笑："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_289',
    name: '大鹏妖圣',
    title: '鹏族大圣',
    description: '大鹏一族的妖圣，金翅小鹏王的长辈，速度无双。他一翅可横渡九万里，是妖族中速度最快的存在。',
    greeting: '大鹏妖圣双翅一展，狂风大作："小辈，你的速度还差得远呢！"',
    roomId: 'stone_kingdom_treasure',
    dialogues: [
      {
        id: 'npc_289_dlg_0',
        topic: '自我介绍',
        text: '"大鹏妖圣，鹏族大圣。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_289_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_289_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_289_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_289_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_290',
    name: '蛇族妖后',
    title: '万蛇之母',
    description: '蛇族的妖后，本体是一条修炼万年的美杜莎，可石化万物。她统领着天下万蛇，是蛇族中至高无上的存在。',
    greeting: '蛇族妖后眸中闪过灰光，警告道："不要看我的眼睛，除非你想变成石头。"',
    roomId: 'stone_kingdom_flying_platform',
    dialogues: [
      {
        id: 'npc_290_dlg_0',
        topic: '自我介绍',
        text: '"蛇族妖后，万蛇之母。"他淡淡道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_290_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_290_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_290_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_290_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_291',
    name: '石族圣子',
    title: '石化传人',
    description: '石族的圣子，本体是一块远古神石化形，浑身坚硬如铁。石族以防御著称，他的身体比大多数神兵还要坚硬。',
    greeting: '石族圣子浑身石化，冷声道："想破我防御？你还不配。"',
    roomId: 'beidou_star_field',
    dialogues: [
      {
        id: 'npc_291_dlg_0',
        topic: '自我介绍',
        text: '"石族圣子，石化传人。"他傲然道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_291_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_291_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_291_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_291_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_292',
    name: '木族圣女',
    title: '万木之灵',
    description: '木族的圣女，本体是一株远古神树化形，可操控植物。她心地善良，热爱自然，是古族中最温和的存在。',
    greeting: '木族圣女指尖藤蔓缠绕，微笑道："植物是我的朋友，也是我的武器。"',
    roomId: 'huanggu_forbidden',
    dialogues: [
      {
        id: 'npc_292_dlg_0',
        topic: '自我介绍',
        text: '"木族圣女，万木之灵。"他冷冷道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_292_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_292_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_292_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_292_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_293',
    name: '水族皇子',
    title: '深海之主',
    description: '水族的皇子，本体是一条远古海兽，可操控万水。他在水中实力暴涨，几乎无敌，是海洋中的霸主。',
    greeting: '水族皇子周身水波荡漾，傲然道："在水中，我就是神！"',
    roomId: 'yuhua_school',
    dialogues: [
      {
        id: 'npc_293_dlg_0',
        topic: '自我介绍',
        text: '"水族皇子，深海之主。"他傲然道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_293_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_293_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_293_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_293_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_294',
    name: '土族圣子',
    title: '大地传人',
    description: '土族的圣子，本体是一座远古山岭化形，力大无穷。他可操控大地，引发地震，是古族中最具破坏力的存在。',
    greeting: '土族圣子脚踏大地，沉声道："大地是我的母亲，也是我的力量源泉。"',
    roomId: 'beidou_city_gate',
    dialogues: [
      {
        id: 'npc_294_dlg_0',
        topic: '自我介绍',
        text: '"土族圣子，大地传人。"他傲然道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_294_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_294_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_294_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_294_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_295',
    name: '金族圣女',
    title: '金精之灵',
    description: '金族的圣女，本体是一块远古金精化形，浑身金光灿灿。金族以攻击著称，她的攻击锐利无匹，可切割万物。',
    greeting: '金族圣女周身金光闪耀，冷声道："我的锋芒，可切割世间万物。"',
    roomId: 'beidou_city_main_street',
    dialogues: [
      {
        id: 'npc_295_dlg_0',
        topic: '自我介绍',
        text: '"金族圣女，金精之灵。"他冷冷道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_295_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_295_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_295_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_295_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_296',
    name: '光族圣子',
    title: '光明传人',
    description: '光族的圣子，本体是一缕远古圣光化形，可操控光明。他在光明中几乎无敌，是古族中最耀眼的存在。',
    greeting: '光族圣子浑身圣光闪耀，庄严道："光明所到之处，黑暗退散！"',
    roomId: 'beidou_city_east_market',
    dialogues: [
      {
        id: 'npc_296_dlg_0',
        topic: '自我介绍',
        text: '"光族圣子，光明传人。"他傲然道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_296_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_296_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_296_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_296_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_297',
    name: '暗族圣女',
    title: '黑暗之灵',
    description: '暗族的圣女，本体是一团远古暗影化形，可操控黑暗。她在黑暗中如鱼得水，是古族中最神秘的存在。',
    greeting: '暗族圣女融入黑暗，声音飘忽："黑暗中，你找不到我。"',
    roomId: 'beidou_city_west_market',
    dialogues: [
      {
        id: 'npc_297_dlg_0',
        topic: '自我介绍',
        text: '"暗族圣女，黑暗之灵。"他冷冷道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_297_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_297_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_297_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_297_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_298',
    name: '时族长老',
    title: '时间守护者',
    description: '时族的长老，可操控一丝时间之力。时族是古族中最神秘的种族，他们可让时间加速或减速，甚至短暂停滞。',
    greeting: '时族长老周围时间扭曲，缓缓道："时间是最公平的，也是最残酷的。"',
    roomId: 'beidou_imperial_city',
    dialogues: [
      {
        id: 'npc_298_dlg_0',
        topic: '自我介绍',
        text: '"时族长老，时间守护者。"他冷冷道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_298_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_298_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_298_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_298_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_299',
    name: '空族圣子',
    title: '空间传人',
    description: '空族的圣子，可操控空间之力，与姬家的虚空大道有异曲同工之妙。他可开辟空间通道，瞬间移动到任何地方。',
    greeting: '空族圣子周围空间扭曲，微笑道："空间是我的游乐场，想去哪里都可以。"',
    roomId: 'beidou_imperial_palace',
    dialogues: [
      {
        id: 'npc_299_dlg_0',
        topic: '自我介绍',
        text: '"空族圣子，空间传人。"他傲然道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_299_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_299_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_299_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_299_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_300',
    name: '魂族圣女',
    title: '灵魂之主',
    description: '魂族的圣女，可操控灵魂之力。魂族是古族中最诡异的种族，他们可吞噬灵魂，也可将灵魂从肉体中抽离。',
    greeting: '魂族圣女眼中魂火燃烧，阴森道："你的灵魂，看起来很美味。"',
    roomId: 'beidou_sky_pavilion',
    dialogues: [
      {
        id: 'npc_300_dlg_0',
        topic: '自我介绍',
        text: '"魂族圣女，灵魂之主。"他冷冷道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_300_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_300_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_300_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_300_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_301',
    name: '骨族圣子',
    title: '骸骨之王',
    description: '骨族的圣子，本体是一具远古骸骨化形，浑身由骨头组成。骨族以不死著称，即便被打散也可重新组合。',
    greeting: '骨族圣子骨架咔咔作响，空洞的眼窝盯着你："想拆了我的骨头？来试试。"',
    roomId: 'huanggu_core',
    dialogues: [
      {
        id: 'npc_301_dlg_0',
        topic: '自我介绍',
        text: '"骨族圣子，骸骨之王。"他傲然道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_301_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_301_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_301_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_301_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_302',
    name: '血族圣女',
    title: '血之女王',
    description: '血族的圣女，可操控血液之力。血族是古族中最嗜血的种族，他们以血为食，越战越强，几乎不可战胜。',
    greeting: '血族圣女舔了舔嘴唇，媚笑道："让我尝一口你的血，就一口。"',
    roomId: 'huanggu_tomb',
    dialogues: [
      {
        id: 'npc_302_dlg_0',
        topic: '自我介绍',
        text: '"血族圣女，血之女王。"他冷冷道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_302_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_302_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_302_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_302_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_303',
    name: '魂族长老',
    title: '魂之古圣',
    description: '魂族的古老圣人，精通灵魂之道。他可将灵魂分割成无数份，只要有一份存活便可重生，是不死的存在。',
    greeting: '魂族长老虚幻的身影飘忽不定："你杀不死我的，我的灵魂分散在无数地方。"',
    roomId: 'huanggu_lake',
    dialogues: [
      {
        id: 'npc_303_dlg_0',
        topic: '自我介绍',
        text: '"魂族长老，魂之古圣。"他冷冷道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_303_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_303_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_303_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_303_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_304',
    name: '巫族圣子',
    title: '巫道传人',
    description: '巫族的圣子，精通巫术和诅咒。巫族是古族中最诡异的种族之一，他们的巫术可杀人于无形，防不胜防。',
    greeting: '巫族圣子手持骨杖，神秘道："中了我的巫术，你会在痛苦中慢慢死去。"',
    roomId: 'xianyu_gate',
    dialogues: [
      {
        id: 'npc_304_dlg_0',
        topic: '自我介绍',
        text: '"巫族圣子，巫道传人。"他傲然道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_304_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_304_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_304_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_304_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_305',
    name: '蛮族圣女',
    title: '蛮力之女',
    description: '蛮族的圣女，力大无穷，可徒手撕裂虚空。蛮族以力量著称，她的力量连许多男性古族都比不上，是蛮族的骄傲。',
    greeting: '蛮族圣女秀拳紧握，战意昂扬："来！让我看看你有没有资格与我交手！"',
    roomId: 'xianyu_palace',
    dialogues: [
      {
        id: 'npc_305_dlg_0',
        topic: '自我介绍',
        text: '"蛮族圣女，蛮力之女。"他冷冷道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_305_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_305_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_305_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_305_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_306',
    name: '马脚夫',
    title: '挑夫',
    description: '一位靠挑担为生的脚夫，身体强壮，吃苦耐劳。他常年在码头和集市之间奔波，是城市运转不可或缺的一环。',
    greeting: '马脚夫擦了擦汗，憨厚地笑道："客人，要挑东西吗？我力气大，价钱公道！"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: 'npc_306_dlg_0',
        topic: '自我介绍',
        text: '"马脚夫，挑夫。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_306_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_306_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_306_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_306_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_307',
    name: '何绣娘',
    title: '绣女',
    description: '一位以刺绣为生的绣娘，手艺精湛，绣出的花鸟栩栩如生。她的绣品在城中颇有名气，常被大户人家订购。',
    greeting: '何绣娘低头刺绣，头也不抬："客官要看绣品？随便看，喜欢哪幅告诉我。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: 'npc_307_dlg_0',
        topic: '自我介绍',
        text: '"何绣娘，绣女。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_307_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_307_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_307_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_307_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_308',
    name: '罗算命',
    title: '算命先生',
    description: '一位在街边摆摊算命的先生，靠着三寸不烂之舌为生。他算命准不准不好说，但口才却是一流，总能把人哄得开开心心。',
    greeting: '罗算命摇了摇龟甲，笑眯眯道："客官来算一卦？算姻缘还是算财运？"',
    roomId: 'stone_kingdom_zhuque',
    dialogues: [
      {
        id: 'npc_308_dlg_0',
        topic: '自我介绍',
        text: '"罗算命，算命先生。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_308_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_308_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_308_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_308_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他眼睛一亮："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_309',
    name: '田渔夫',
    title: '渔民',
    description: '一位以捕鱼为生的渔夫，常年在江上飘荡。他熟悉江中的每一条水道，知道哪里鱼多，哪里鱼少。',
    greeting: '田渔夫提着鱼篓，笑道："今天收成不错，要不要来几条新鲜的江鱼？"',
    roomId: 'stone_kingdom_east_market',
    dialogues: [
      {
        id: 'npc_309_dlg_0',
        topic: '自我介绍',
        text: '"田渔夫，渔民。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_309_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_309_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_309_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_309_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_310',
    name: '石猎人',
    title: '猎人',
    description: '一位以打猎为生的猎人，箭法精准，身手敏捷。他常年在山林中穿梭，对山林中的一草一木都了如指掌。',
    greeting: '石猎人背着弓箭，淡淡道："山里的情况我熟，要我带路吗？"',
    roomId: 'stone_kingdom_west_market',
    dialogues: [
      {
        id: 'npc_310_dlg_0',
        topic: '自我介绍',
        text: '"石猎人，猎人。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_310_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_310_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_310_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_310_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_311',
    name: '花魁娘子',
    title: '青楼花魁',
    description: '一家青楼的花魁，容貌绝美，琴棋书画样样精通。她卖艺不卖身，是城中无数达官贵人追捧的对象。',
    greeting: '花魁娘子倚栏而笑，眼波流转："公子，可愿听奴家弹奏一曲？"',
    roomId: 'stone_kingdom_huji_tavern',
    dialogues: [
      {
        id: 'npc_311_dlg_0',
        topic: '自我介绍',
        text: '"花魁娘子，青楼花魁。"他嫣然一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_311_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_311_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_311_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_311_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_312',
    name: '说书张',
    title: '说书先生',
    description: '一位在茶馆说书的先生，口才了得，故事精彩。他说的修仙故事深受百姓喜爱，每场都座无虚席。',
    greeting: '说书张清了清嗓子，朗声道："要说那叶凡大帝的故事，那可是说来话长……"',
    roomId: 'stone_kingdom_wanjintang',
    dialogues: [
      {
        id: 'npc_312_dlg_0',
        topic: '自我介绍',
        text: '"说书张，说书先生。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_312_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_312_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_312_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_312_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_313',
    name: '杂耍李',
    title: '杂耍艺人',
    description: '一位在街边表演杂耍的艺人，身手敏捷，技艺高超。他的表演常常引来围观，是街头最热闹的风景。',
    greeting: '杂耍李抛接着三个火球，笑道："各位看官，有钱的捧个钱场，没钱的捧个人场！"',
    roomId: 'stone_kingdom_wanjintang_back',
    dialogues: [
      {
        id: 'npc_313_dlg_0',
        topic: '自我介绍',
        text: '"杂耍李，杂耍艺人。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_313_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_313_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_313_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_313_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_314',
    name: '卖炭翁',
    title: '烧炭老人',
    description: '一位以烧炭为生的老人，满脸煤灰，双手粗糙。他烧出的炭火旺盛持久，是城中百姓过冬的必备之物。',
    greeting: '卖炭翁推着炭车，沙哑道："卖炭啦——上好的木炭，耐烧火旺！"',
    roomId: 'stone_kingdom_dark_market',
    dialogues: [
      {
        id: 'npc_314_dlg_0',
        topic: '自我介绍',
        text: '"卖炭翁，烧炭老人。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_314_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_314_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_314_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_314_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_316',
    name: '守夜人',
    title: '更夫',
    description: '一位负责夜间巡逻的更夫，胆子极大。他见惯了夜间的怪事，知道许多不为人知的秘密，却从不对外人说起。',
    greeting: '守夜人提着灯笼，低声道："夜深了，早点回家。这夜里……不太平。"',
    roomId: 'stone_kingdom_cangchun',
    dialogues: [
      {
        id: 'npc_316_dlg_0',
        topic: '自我介绍',
        text: '"守夜人，更夫。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_316_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_316_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_316_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_316_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_317',
    name: '花农',
    title: '种花老人',
    description: '一位以种花为生的老人，培育出的花卉品种繁多，色彩艳丽。他的花园是城中最美的地方，每到花季便游人如织。',
    greeting: '花农捧着一盆牡丹，笑道："这花养了三十年，今日终于开了。"',
    roomId: 'stone_kingdom_cangchun_pool',
    dialogues: [
      {
        id: 'npc_317_dlg_0',
        topic: '自我介绍',
        text: '"花农，种花老人。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_317_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_317_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_317_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_317_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_318',
    name: '豆腐西施',
    title: '豆腐摊主',
    description: '一位卖豆腐的年轻寡妇，容貌秀丽，被称为豆腐西施。她的豆腐嫩滑可口，是城中最受欢迎的美食之一。',
    greeting: '豆腐西施擦了擦手，笑道："客官，来块豆腐吗？刚做的，嫩着呢！"',
    roomId: 'stone_kingdom_yicui',
    dialogues: [
      {
        id: 'npc_318_dlg_0',
        topic: '自我介绍',
        text: '"豆腐西施，豆腐摊主。"他嫣然一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_318_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_318_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_318_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_318_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_319',
    name: '铁口直断',
    title: '相面先生',
    description: '一位以相面为生的先生，据说相面极准。他可通过面相看出一个人的命运，每天都有人排队找他相面。',
    greeting: '铁口直断端详着你的脸，皱眉道："客官这面相……大凶大吉，难以定论啊。"',
    roomId: 'stone_kingdom_zuixian',
    dialogues: [
      {
        id: 'npc_319_dlg_0',
        topic: '自我介绍',
        text: '"铁口直断，相面先生。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_319_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_319_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_319_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_319_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_320',
    name: '丐帮长老',
    title: '乞丐头子',
    description: '城中乞丐的首领，看似邋遢，实则消息灵通。他掌管着城中所有的乞丐，是地下消息网的重要节点。',
    greeting: '丐帮长老剔着牙，懒洋洋道："想打听消息？先给点孝敬。"',
    roomId: 'stone_kingdom_taohua',
    dialogues: [
      {
        id: 'npc_320_dlg_0',
        topic: '自我介绍',
        text: '"丐帮长老，乞丐头子。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_320_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_320_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_320_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_320_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他眼睛一亮："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_321',
    name: '红毛怪人',
    title: '不详之人',
    description: '一位浑身长满红毛的怪人，被不详缠身。他原本是一位强大的修士，却在探索某处禁地时被不详侵蚀，变成了如今的模样。',
    greeting: '红毛怪人浑身红毛抖动，嘶哑道："不详……远离我……否则你也会变成我这样……"',
    roomId: 'stone_kingdom_fang_01',
    dialogues: [
      {
        id: 'npc_321_dlg_0',
        topic: '自我介绍',
        text: '"红毛怪人，不详之人。"他阴森地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_321_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_321_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_321_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_321_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他阴森一笑："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_322',
    name: '无面人',
    title: '无面行者',
    description: '一位没有面孔的人，脸上只有一片空白。他来自某个神秘的组织，执行任务时从不露出真面目，是世间最神秘的刺客。',
    greeting: '无面人的空白面孔对着你，声音从虚空中传来："你看到的是我，也不是我。"',
    roomId: 'stone_kingdom_fang_02',
    dialogues: [
      {
        id: 'npc_322_dlg_0',
        topic: '自我介绍',
        text: '"无面人，无面行者。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_322_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_322_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_322_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_322_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_323',
    name: '双头老人',
    title: '双生智者',
    description: '一位长着两个头的老人，两个头各有不同的性格和智慧。他们常常互相争论，却在关键时刻总能达成一致。',
    greeting: '双头老人的左头说："这个人看起来不错。"右头说："不，我觉得他很可疑。"',
    roomId: 'stone_kingdom_fang_03',
    dialogues: [
      {
        id: 'npc_323_dlg_0',
        topic: '自我介绍',
        text: '"双头老人，双生智者。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_323_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_323_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_323_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_323_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_324',
    name: '透明人',
    title: '隐形者',
    description: '一位身体完全透明的人，只能隐约看到轮廓。他天生便是如此，无法被常人看见，是世间最孤独的存在。',
    greeting: '空气中传来声音，却看不到人："我在这里……但你永远看不到我。"',
    roomId: 'stone_kingdom_bishui_yuan',
    dialogues: [
      {
        id: 'npc_324_dlg_0',
        topic: '自我介绍',
        text: '"透明人，隐形者。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_324_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_324_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_324_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_324_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: '_backwards',
    name: ' backwards说话者',
    title: '逆言者',
    description: '一位说话总是倒着说的怪人，据说是中了某种诅咒。他的每一句话都需要倒过来听，是世间最难以交流的人。',
    greeting: ' backwards说话者说："好你见遇很兴高我"——倒过来是"我很高兴遇见你"。',
    roomId: 'stone_kingdom_fang_04',
    dialogues: [
      {
        id: 'backwards_dlg_0',
        topic: '自我介绍',
        text: '" backwards说话者，逆言者。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'backwards_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'backwards_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'backwards_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'backwards_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_326',
    name: '影子人',
    title: '影之居民',
    description: '一位生活在影子中的人，只能在阴影中存活。一旦暴露在阳光下，便会灰飞烟灭。他是影子的奴隶，也是影子的主人。',
    greeting: '影子人从阴影中探出头来，低声道："不要把我带到阳光下，我会死的。"',
    roomId: 'stone_kingdom_yaotai',
    dialogues: [
      {
        id: 'npc_326_dlg_0',
        topic: '自我介绍',
        text: '"影子人，影之居民。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_326_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_326_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_326_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_326_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_327',
    name: '镜像人',
    title: '镜中倒影',
    description: '一位从镜子中走出的怪人，与现实世界的人完全相反。他的心脏在右边，写字用左手，是镜像世界的居民。',
    greeting: '镜像人伸出左手与你握手，微笑道："在我的世界里，你是镜子里的那个人。"',
    roomId: 'stone_kingdom_yaotai_food',
    dialogues: [
      {
        id: 'npc_327_dlg_0',
        topic: '自我介绍',
        text: '"镜像人，镜中倒影。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_327_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_327_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_327_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_327_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_328',
    name: '时间旅行者',
    title: '时之旅人',
    description: '一位自称来自未来的时间旅行者，知晓许多即将发生的事情。他的话真假难辨，却有许多都被证实，令人不得不信。',
    greeting: '时间旅行者看着怀表，焦急道："时间不多了，快按照我说的做！"',
    roomId: 'stone_kingdom_yaotai_discuss',
    dialogues: [
      {
        id: 'npc_328_dlg_0',
        topic: '自我介绍',
        text: '"时间旅行者，时之旅人。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_328_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_328_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_328_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_328_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_329',
    name: '失忆剑客',
    title: '忘剑之人',
    description: '一位失去了所有记忆的剑客，只记得如何挥剑。他不知道自己是谁，来自哪里，只凭着本能在这个世界游荡。',
    greeting: '失忆剑客茫然四顾，喃喃道："我是谁……我为什么会在这里……"',
    roomId: 'stone_kingdom_yaotai_pool',
    dialogues: [
      {
        id: 'npc_329_dlg_0',
        topic: '自我介绍',
        text: '"失忆剑客，忘剑之人。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_329_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_329_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_329_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_329_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_330',
    name: '画中鬼',
    title: '画魂',
    description: '一幅古画中封印的鬼魂，可在画中世界自由穿梭。他无法离开画卷，却可将人的灵魂拉入画中，永世囚禁。',
    greeting: '画中鬼从画中伸出手，阴森道："进来吧，画中世界比你想象的更有趣。"',
    roomId: 'stone_kingdom_culture_plaza',
    dialogues: [
      {
        id: 'npc_330_dlg_0',
        topic: '自我介绍',
        text: '"画中鬼，画魂。"他阴森地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_330_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_330_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_330_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_330_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他阴森一笑："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_331',
    name: '附身灵',
    title: '借体之魂',
    description: '一位没有肉体的游魂，需要附身在他人身上才能行动。他不断更换宿主，体验着不同的人生，是世间最漂泊的存在。',
    greeting: '被附身的人突然换了一种语气："你好，我是借住在这具身体里的人。"',
    roomId: 'stone_kingdom_imperial_gate',
    dialogues: [
      {
        id: 'npc_331_dlg_0',
        topic: '自我介绍',
        text: '"附身灵，借体之魂。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_331_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_331_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_331_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_331_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_332',
    name: '预言家',
    title: '先知',
    description: '一位可预见未来的预言家，却从不主动预言。他说天机不可泄露，每一次预言都会付出惨重的代价，是世间最谨慎的人。',
    greeting: '预言家闭上双眼，叹息道："我看到了你的未来……但我不说，说了对你我都没有好处。"',
    roomId: 'stone_kingdom_imperial_city',
    dialogues: [
      {
        id: 'npc_332_dlg_0',
        topic: '自我介绍',
        text: '"预言家，先知。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_332_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_332_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_332_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_332_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_333',
    name: '换脸人',
    title: '千面郎君',
    description: '一位可随意更换面容的怪人，据说有一千张不同的脸。他是世间最出色的间谍和刺客，无人知道他的真实面目。',
    greeting: '换脸人换了一张新的面孔，微笑道："你喜欢哪张脸？我随时可以换。"',
    roomId: 'stone_kingdom_jiaofangsi',
    dialogues: [
      {
        id: 'npc_333_dlg_0',
        topic: '自我介绍',
        text: '"换脸人，千面郎君。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_333_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_333_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_333_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_333_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_334',
    name: '缩地老人',
    title: '地行仙',
    description: '一位可在地下自由行走的老人，如鱼儿在水中一般。他常年在地下生活，对地下的世界了如指掌，是地下世界的向导。',
    greeting: '缩地老人从地下钻出，满身泥土："地下可比地上有趣多了，要不要跟我去看看？"',
    roomId: 'stone_kingdom_feiyinge',
    dialogues: [
      {
        id: 'npc_334_dlg_0',
        topic: '自我介绍',
        text: '"缩地老人，地行仙。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_334_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_334_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_334_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_334_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_335',
    name: '飞天女',
    title: '天行者',
    description: '一位天生可在空中行走的女子，如平地一般。她从不落地，常年漂浮在空中，是世间最自由也最孤独的存在。',
    greeting: '飞天女漂浮在空中，俯视着你："地上的风景，我已经看了太久了。"',
    roomId: 'stone_kingdom_feiyinge_2',
    dialogues: [
      {
        id: 'npc_335_dlg_0',
        topic: '自我介绍',
        text: '"飞天女，天行者。"他神秘地说道："我的存在，本身就是一个谜。"',
      },
      {
        id: 'npc_335_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："知道得太多，对你没有好处。有些秘密，还是永远埋藏的好。"',
      },
      {
        id: 'npc_335_dlg_2',
        topic: '谈人生感悟',
        text: '"人生如梦，梦如人生。"他感慨道："活得太久，见得太多了。有时候，糊涂一点反而更幸福。"',
      },
      {
        id: 'npc_335_dlg_3',
        topic: '论世间真相',
        text: '"这世间，哪有什么真相？"他冷笑："你所看到的，只是别人想让你看到的。真正的真相，藏在最黑暗的角落里。"',
      },
      {
        id: 'npc_335_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他沉吟片刻："可以，但你要有付出代价的觉悟。"',
      },
    ],
  },
  {
    id: 'npc_336',
    name: '仙域园丁',
    title: '仙草园丁',
    description: '仙域中负责照料仙草的园丁，一生与仙草为伴。他对各种仙草了如指掌，可培育出世间最珍贵的仙药。',
    greeting: '仙域园丁满身药香，笑道："来看看我培育的新品种仙草，可好看了！"',
    roomId: 'stone_kingdom_feiyinge_3',
    dialogues: [
      {
        id: 'npc_336_dlg_0',
        topic: '自我介绍',
        text: '"仙域园丁，仙草园丁。"他温和地说道："仙域虽大，却也有许多凡人琐事。"',
      },
      {
        id: 'npc_336_dlg_1',
        topic: '问仙域生活',
        text: '"仙域的生活，看似逍遥，实则也有烦恼。"他叹息道："仙亦有仙的规矩，亦有仙的纷争，并不比下界轻松多少。"',
      },
      {
        id: 'npc_336_dlg_2',
        topic: '谈仙道修炼',
        text: '"仙道修炼，重在心性。"他缓缓道："心中有道，处处是净土；心中无道，纵在仙域也枉然。"',
      },
      {
        id: 'npc_336_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'npc_336_dlg_4',
        topic: '请求指点',
        text: '"指点？"他微笑道："我这点微末道行，能指点你什么？不过倒是可以给你一些建议。"',
      },
    ],
  },
  {
    id: 'npc_337',
    name: '仙域厨师',
    title: '仙厨',
    description: '仙域中的厨师，可用仙材烹饪出绝世美味。他的菜肴不仅美味，还可提升修为，是仙域中最受欢迎的人。',
    greeting: '仙域厨师挥舞着锅铲，香气四溢："刚做好的仙宴，要不要尝尝？"',
    roomId: 'stone_kingdom_baixipeng',
    dialogues: [
      {
        id: 'npc_337_dlg_0',
        topic: '自我介绍',
        text: '"仙域厨师，仙厨。"他温和地说道："仙域虽大，却也有许多凡人琐事。"',
      },
      {
        id: 'npc_337_dlg_1',
        topic: '问仙域生活',
        text: '"仙域的生活，看似逍遥，实则也有烦恼。"他叹息道："仙亦有仙的规矩，亦有仙的纷争，并不比下界轻松多少。"',
      },
      {
        id: 'npc_337_dlg_2',
        topic: '谈仙道修炼',
        text: '"仙道修炼，重在心性。"他缓缓道："心中有道，处处是净土；心中无道，纵在仙域也枉然。"',
      },
      {
        id: 'npc_337_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'npc_337_dlg_4',
        topic: '请求指点',
        text: '"指点？"他微笑道："我这点微末道行，能指点你什么？不过倒是可以给你一些建议。"',
      },
    ],
  },
  {
    id: 'npc_338',
    name: '仙域书童',
    title: '仙籍童子',
    description: '仙域中负责整理仙籍的书童，博览群书，知晓无数仙界秘闻。他虽地位不高，却是仙域中最有学问的人之一。',
    greeting: '仙域书童抱着一摞古籍，气喘吁吁："这些书可重了……你找什么书？我帮你找。"',
    roomId: 'stone_kingdom_ministries',
    dialogues: [
      {
        id: 'npc_338_dlg_0',
        topic: '自我介绍',
        text: '"仙域书童，仙籍童子。"他温和地说道："仙域虽大，却也有许多凡人琐事。"',
      },
      {
        id: 'npc_338_dlg_1',
        topic: '问仙域生活',
        text: '"仙域的生活，看似逍遥，实则也有烦恼。"他叹息道："仙亦有仙的规矩，亦有仙的纷争，并不比下界轻松多少。"',
      },
      {
        id: 'npc_338_dlg_2',
        topic: '谈仙道修炼',
        text: '"仙道修炼，重在心性。"他缓缓道："心中有道，处处是净土；心中无道，纵在仙域也枉然。"',
      },
      {
        id: 'npc_338_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'npc_338_dlg_4',
        topic: '请求指点',
        text: '"指点？"他挠挠头："我这点微末道行，能指点你什么？不过倒是可以给你一些建议。"',
      },
    ],
  },
  {
    id: 'npc_339',
    name: '仙域画师',
    title: '仙画大师',
    description: '仙域中的画师，可将景物画入画中，永世保存。他的画作不仅精美，还可让人进入画中世界，体验画中的一切。',
    greeting: '仙域画师展开一幅画卷，微笑道："进来看看？这是我最新画的仙境。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: 'npc_339_dlg_0',
        topic: '自我介绍',
        text: '"仙域画师，仙画大师。"他温和地说道："仙域虽大，却也有许多凡人琐事。"',
      },
      {
        id: 'npc_339_dlg_1',
        topic: '问仙域生活',
        text: '"仙域的生活，看似逍遥，实则也有烦恼。"他叹息道："仙亦有仙的规矩，亦有仙的纷争，并不比下界轻松多少。"',
      },
      {
        id: 'npc_339_dlg_2',
        topic: '谈仙道修炼',
        text: '"仙道修炼，重在心性。"他缓缓道："心中有道，处处是净土；心中无道，纵在仙域也枉然。"',
      },
      {
        id: 'npc_339_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'npc_339_dlg_4',
        topic: '请求指点',
        text: '"指点？"他微笑道："我这点微末道行，能指点你什么？不过倒是可以给你一些建议。"',
      },
    ],
  },
  {
    id: 'npc_340',
    name: '仙域乐师',
    title: '仙乐大家',
    description: '仙域中的乐师，一曲仙乐可动天地。他的乐器皆是仙器，奏出的音乐可洗涤心灵、提升修为，是仙域中的瑰宝。',
    greeting: '仙域乐师拨动仙琴，仙音袅袅："听，这是仙域的声音，也是大道的声音。"',
    roomId: 'stone_kingdom_scripture',
    dialogues: [
      {
        id: 'npc_340_dlg_0',
        topic: '自我介绍',
        text: '"仙域乐师，仙乐大家。"他温和地说道："仙域虽大，却也有许多凡人琐事。"',
      },
      {
        id: 'npc_340_dlg_1',
        topic: '问仙域生活',
        text: '"仙域的生活，看似逍遥，实则也有烦恼。"他叹息道："仙亦有仙的规矩，亦有仙的纷争，并不比下界轻松多少。"',
      },
      {
        id: 'npc_340_dlg_2',
        topic: '谈仙道修炼',
        text: '"仙道修炼，重在心性。"他缓缓道："心中有道，处处是净土；心中无道，纵在仙域也枉然。"',
      },
      {
        id: 'npc_340_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'npc_340_dlg_4',
        topic: '请求指点',
        text: '"指点？"他微笑道："我这点微末道行，能指点你什么？不过倒是可以给你一些建议。"',
      },
    ],
  },
  {
    id: 'npc_341',
    name: '仙域医者',
    title: '仙医',
    description: '仙域中的医者，医术通神，可生死人肉白骨。他以仙药治病，以仙法治伤，是仙域中最受人尊敬的人。',
    greeting: '仙域医者把了把你的脉，皱眉道："气血两虚，经脉滞涩，最近可是太拼命了？"',
    roomId: 'stone_kingdom_technique',
    dialogues: [
      {
        id: 'npc_341_dlg_0',
        topic: '自我介绍',
        text: '"仙域医者，仙医。"他温和地说道："仙域虽大，却也有许多凡人琐事。"',
      },
      {
        id: 'npc_341_dlg_1',
        topic: '问仙域生活',
        text: '"仙域的生活，看似逍遥，实则也有烦恼。"他叹息道："仙亦有仙的规矩，亦有仙的纷争，并不比下界轻松多少。"',
      },
      {
        id: 'npc_341_dlg_2',
        topic: '谈仙道修炼',
        text: '"仙道修炼，重在心性。"他缓缓道："心中有道，处处是净土；心中无道，纵在仙域也枉然。"',
      },
      {
        id: 'npc_341_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'npc_341_dlg_4',
        topic: '请求指点',
        text: '"指点？"他微笑道："我这点微末道行，能指点你什么？不过倒是可以给你一些建议。"',
      },
    ],
  },
  {
    id: 'npc_342',
    name: '仙域铁匠',
    title: '仙匠',
    description: '仙域中的铁匠，可铸造出仙器。他的锻造技术出神入化，每一件作品都是精品，是仙域中最抢手的匠人。',
    greeting: '仙域铁匠锤打着仙金，火星四溅："要打什么？普通的仙器还是极道帝兵？"',
    roomId: 'stone_kingdom_prince_mansion',
    dialogues: [
      {
        id: 'npc_342_dlg_0',
        topic: '自我介绍',
        text: '"仙域铁匠，仙匠。"他温和地说道："仙域虽大，却也有许多凡人琐事。"',
      },
      {
        id: 'npc_342_dlg_1',
        topic: '问仙域生活',
        text: '"仙域的生活，看似逍遥，实则也有烦恼。"他叹息道："仙亦有仙的规矩，亦有仙的纷争，并不比下界轻松多少。"',
      },
      {
        id: 'npc_342_dlg_2',
        topic: '谈仙道修炼',
        text: '"仙道修炼，重在心性。"他缓缓道："心中有道，处处是净土；心中无道，纵在仙域也枉然。"',
      },
      {
        id: 'npc_342_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'npc_342_dlg_4',
        topic: '请求指点',
        text: '"指点？"他微笑道："我这点微末道行，能指点你什么？不过倒是可以给你一些建议。"',
      },
    ],
  },
  {
    id: 'npc_343',
    name: '仙域裁缝',
    title: '仙衣仙子',
    description: '仙域中的裁缝，可用仙丝缝制出仙衣。她缝制的仙衣不仅美丽，还可抵御攻击，是仙域女修最喜欢的裁缝。',
    greeting: '仙域裁缝量着你的尺寸，笑道："做一身仙衣可好？保证让你成为仙域最靓的仔！"',
    roomId: 'stone_kingdom_palace_gate',
    dialogues: [
      {
        id: 'npc_343_dlg_0',
        topic: '自我介绍',
        text: '"仙域裁缝，仙衣仙子。"他温和地说道："仙域虽大，却也有许多凡人琐事。"',
      },
      {
        id: 'npc_343_dlg_1',
        topic: '问仙域生活',
        text: '"仙域的生活，看似逍遥，实则也有烦恼。"他叹息道："仙亦有仙的规矩，亦有仙的纷争，并不比下界轻松多少。"',
      },
      {
        id: 'npc_343_dlg_2',
        topic: '谈仙道修炼',
        text: '"仙道修炼，重在心性。"他缓缓道："心中有道，处处是净土；心中无道，纵在仙域也枉然。"',
      },
      {
        id: 'npc_343_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'npc_343_dlg_4',
        topic: '请求指点',
        text: '"指点？"他微笑道："我这点微末道行，能指点你什么？不过倒是可以给你一些建议。"',
      },
    ],
  },
  {
    id: 'npc_344',
    name: '仙域马夫',
    title: '天马牧人',
    description: '仙域中负责饲养天马的牧人，对天马了如指掌。他饲养的天马可腾云驾雾，是仙域中最好的坐骑。',
    greeting: '仙域马夫抚摸着天马的鬃毛，笑道："这天马可烈了，你要骑可得小心点。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: 'npc_344_dlg_0',
        topic: '自我介绍',
        text: '"仙域马夫，天马牧人。"他温和地说道："仙域虽大，却也有许多凡人琐事。"',
      },
      {
        id: 'npc_344_dlg_1',
        topic: '问仙域生活',
        text: '"仙域的生活，看似逍遥，实则也有烦恼。"他叹息道："仙亦有仙的规矩，亦有仙的纷争，并不比下界轻松多少。"',
      },
      {
        id: 'npc_344_dlg_2',
        topic: '谈仙道修炼',
        text: '"仙道修炼，重在心性。"他缓缓道："心中有道，处处是净土；心中无道，纵在仙域也枉然。"',
      },
      {
        id: 'npc_344_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'npc_344_dlg_4',
        topic: '请求指点',
        text: '"指点？"他微笑道："我这点微末道行，能指点你什么？不过倒是可以给你一些建议。"',
      },
    ],
  },
  {
    id: 'npc_345',
    name: '仙域渔夫',
    title: '仙渔翁',
    description: '仙域中在仙湖中捕鱼的老渔翁，经验丰富。他捕的鱼皆是仙鱼，肉质鲜美，还可提升修为，是仙域中的美食。',
    greeting: '仙域渔夫提起鱼竿，一条金鳞仙鱼跃出水面："今天的收获不错，要不要来一条？"',
    roomId: 'stone_kingdom_throne',
    dialogues: [
      {
        id: 'npc_345_dlg_0',
        topic: '自我介绍',
        text: '"仙域渔夫，仙渔翁。"他温和地说道："仙域虽大，却也有许多凡人琐事。"',
      },
      {
        id: 'npc_345_dlg_1',
        topic: '问仙域生活',
        text: '"仙域的生活，看似逍遥，实则也有烦恼。"他叹息道："仙亦有仙的规矩，亦有仙的纷争，并不比下界轻松多少。"',
      },
      {
        id: 'npc_345_dlg_2',
        topic: '谈仙道修炼',
        text: '"仙道修炼，重在心性。"他缓缓道："心中有道，处处是净土；心中无道，纵在仙域也枉然。"',
      },
      {
        id: 'npc_345_dlg_3',
        topic: '论仙凡之别',
        text: '"仙凡之别，不在力量，而在心境。"他沉声道："真正的仙，心怀苍生，普度众生。否则，不过是强大的凡人罢了。"',
      },
      {
        id: 'npc_345_dlg_4',
        topic: '请求指点',
        text: '"指点？"他微笑道："我这点微末道行，能指点你什么？不过倒是可以给你一些建议。"',
      },
    ],
  },
  {
    id: 'npc_346',
    name: '禁区采药人',
    title: '禁区药师',
    description: '一位专门在禁区边缘采集珍稀药草的药师，胆大心细。他熟悉禁区的每一处安全路线，是各大势力争相拉拢的对象。',
    greeting: '禁区采药人背着药篓，兴奋道："又采到一株千年灵药，这次发财了！"',
    roomId: 'stone_kingdom_harem',
    dialogues: [
      {
        id: 'npc_346_dlg_0',
        topic: '自我介绍',
        text: '"禁区采药人，禁区药师。"他疲惫地说道："禁区虽危险，却也是发财的好地方。"',
      },
      {
        id: 'npc_346_dlg_1',
        topic: '问禁区经验',
        text: '"禁区之中，步步危机。"他沉声道："但只要熟悉路线，掌握规律，也并非九死一生。我能在禁区活到现在，靠的就是经验和谨慎。"',
      },
      {
        id: 'npc_346_dlg_2',
        topic: '谈禁区收获',
        text: '"禁区的收获，远超外界。"他兴奋道："珍稀药草、神源矿石、远古遗宝……只要你能带出来，都是无价之宝。"',
      },
      {
        id: 'npc_346_dlg_3',
        topic: '论禁区恐怖',
        text: '"禁区最恐怖的，不是已知危险，而是未知。"他沉声道："你永远不知道下一秒会发生什么，这才是禁区最令人恐惧的地方。"',
      },
      {
        id: 'npc_346_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他沉吟片刻："可以，但价钱要加倍，而且死了不退。"',
      },
    ],
  },
  {
    id: 'npc_347',
    name: '禁区矿工',
    title: '神源矿工',
    description: '一位在禁区矿脉中开采神源的矿工，经验丰富。他知晓哪里的神源品质好，哪里的矿脉已经枯竭，是矿区最宝贵的人才。',
    greeting: '禁区矿工提着矿灯，疲惫道："今天又挖到一块神源，够吃半年了。"',
    roomId: 'stone_kingdom_treasure',
    dialogues: [
      {
        id: 'npc_347_dlg_0',
        topic: '自我介绍',
        text: '"禁区矿工，神源矿工。"他疲惫地说道："禁区虽危险，却也是发财的好地方。"',
      },
      {
        id: 'npc_347_dlg_1',
        topic: '问禁区经验',
        text: '"禁区之中，步步危机。"他沉声道："但只要熟悉路线，掌握规律，也并非九死一生。我能在禁区活到现在，靠的就是经验和谨慎。"',
      },
      {
        id: 'npc_347_dlg_2',
        topic: '谈禁区收获',
        text: '"禁区的收获，远超外界。"他兴奋道："珍稀药草、神源矿石、远古遗宝……只要你能带出来，都是无价之宝。"',
      },
      {
        id: 'npc_347_dlg_3',
        topic: '论禁区恐怖',
        text: '"禁区最恐怖的，不是已知危险，而是未知。"他沉声道："你永远不知道下一秒会发生什么，这才是禁区最令人恐惧的地方。"',
      },
      {
        id: 'npc_347_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他沉吟片刻："可以，但价钱要加倍，而且死了不退。"',
      },
    ],
  },
  {
    id: 'npc_348',
    name: '禁区拾荒者',
    title: '禁区 scavenger',
    description: '一位在禁区外围捡拾各种废弃材料的老者，看似卑微，却见过无数进入禁区的强者。他对禁区的了解，比许多大修士还要深刻。',
    greeting: '禁区拾荒者捡起一块骨头，喃喃道："又是一个倒霉鬼留下的……"',
    roomId: 'stone_kingdom_flying_platform',
    dialogues: [
      {
        id: 'npc_348_dlg_0',
        topic: '自我介绍',
        text: '"禁区拾荒者，禁区 scavenger。"他疲惫地说道："禁区虽危险，却也是发财的好地方。"',
      },
      {
        id: 'npc_348_dlg_1',
        topic: '问禁区经验',
        text: '"禁区之中，步步危机。"他沉声道："但只要熟悉路线，掌握规律，也并非九死一生。我能在禁区活到现在，靠的就是经验和谨慎。"',
      },
      {
        id: 'npc_348_dlg_2',
        topic: '谈禁区收获',
        text: '"禁区的收获，远超外界。"他兴奋道："珍稀药草、神源矿石、远古遗宝……只要你能带出来，都是无价之宝。"',
      },
      {
        id: 'npc_348_dlg_3',
        topic: '论禁区恐怖',
        text: '"禁区最恐怖的，不是已知危险，而是未知。"他沉声道："你永远不知道下一秒会发生什么，这才是禁区最令人恐惧的地方。"',
      },
      {
        id: 'npc_348_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他沉吟片刻："可以，但价钱要加倍，而且死了不退。"',
      },
    ],
  },
  {
    id: 'npc_349',
    name: '禁区占卜师',
    title: '禁区先知',
    description: '一位专门占卜禁区吉凶的占卜师，据说准确率极高。他可通过占卜预测禁区的危险，为探险者提供指引。',
    greeting: '禁区占卜师展开龟甲，皱眉道："大凶之兆……今日不宜进入禁区。"',
    roomId: 'beidou_star_field',
    dialogues: [
      {
        id: 'npc_349_dlg_0',
        topic: '自我介绍',
        text: '"禁区占卜师，禁区先知。"他疲惫地说道："禁区虽危险，却也是发财的好地方。"',
      },
      {
        id: 'npc_349_dlg_1',
        topic: '问禁区经验',
        text: '"禁区之中，步步危机。"他沉声道："但只要熟悉路线，掌握规律，也并非九死一生。我能在禁区活到现在，靠的就是经验和谨慎。"',
      },
      {
        id: 'npc_349_dlg_2',
        topic: '谈禁区收获',
        text: '"禁区的收获，远超外界。"他兴奋道："珍稀药草、神源矿石、远古遗宝……只要你能带出来，都是无价之宝。"',
      },
      {
        id: 'npc_349_dlg_3',
        topic: '论禁区恐怖',
        text: '"禁区最恐怖的，不是已知危险，而是未知。"他沉声道："你永远不知道下一秒会发生什么，这才是禁区最令人恐惧的地方。"',
      },
      {
        id: 'npc_349_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他沉吟片刻："可以，但价钱要加倍，而且死了不退。"',
      },
    ],
  },
  {
    id: 'npc_350',
    name: '禁区走私者',
    title: '黑市走私',
    description: '一位专门走私禁区物资的走私者，神通广大，门路极多。他可将禁区的珍稀材料运送到世界各地，是黑市中最活跃的人物。',
    greeting: '禁区走私者神秘兮兮地打开包裹："刚从禁区搞到的好货，要不要看看？"',
    roomId: 'huanggu_forbidden',
    dialogues: [
      {
        id: 'npc_350_dlg_0',
        topic: '自我介绍',
        text: '"禁区走私者，黑市走私。"他神秘地说道："禁区虽危险，却也是发财的好地方。"',
      },
      {
        id: 'npc_350_dlg_1',
        topic: '问禁区经验',
        text: '"禁区之中，步步危机。"他沉声道："但只要熟悉路线，掌握规律，也并非九死一生。我能在禁区活到现在，靠的就是经验和谨慎。"',
      },
      {
        id: 'npc_350_dlg_2',
        topic: '谈禁区收获',
        text: '"禁区的收获，远超外界。"他兴奋道："珍稀药草、神源矿石、远古遗宝……只要你能带出来，都是无价之宝。"',
      },
      {
        id: 'npc_350_dlg_3',
        topic: '论禁区恐怖',
        text: '"禁区最恐怖的，不是已知危险，而是未知。"他沉声道："你永远不知道下一秒会发生什么，这才是禁区最令人恐惧的地方。"',
      },
      {
        id: 'npc_350_dlg_4',
        topic: '请求带路',
        text: '"想让我带你进禁区？"他咧嘴一笑："可以，但价钱要加倍，而且死了不退。"',
      },
    ],
  },
  {
    id: 'npc_351',
    name: '林惊羽',
    title: '惊羽天骄',
    description: '一位以剑法闻名的年轻天骄，剑法惊鸿一瞥，快如闪电。他性格孤傲，一心向剑，是年轻一代中最纯粹的剑修。',
    greeting: '林惊羽剑指一引，剑气森然："出剑吧，让我看看你的剑道。"',
    roomId: 'yuhua_school',
    dialogues: [
      {
        id: 'npc_351_dlg_0',
        topic: '自我介绍',
        text: '"林惊羽，惊羽天骄。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_351_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_351_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_351_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_351_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_352',
    name: '苏媚儿',
    title: '媚功传人',
    description: '一位修炼媚功的年轻女子，媚骨天成，可颠倒众生。她看似柔弱，实则心机深沉，是年轻一代中最难对付的女子之一。',
    greeting: '苏媚儿媚眼如丝，轻笑道："公子，可愿与奴家共参大道？"',
    roomId: 'beidou_city_gate',
    dialogues: [
      {
        id: 'npc_352_dlg_0',
        topic: '自我介绍',
        text: '"苏媚儿，媚功传人。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_352_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_352_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_352_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_352_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_353',
    name: '铁手无情',
    title: '铁手修罗',
    description: '一位以铁手闻名的年轻杀手，出手无情，从不留活口。他在杀手界声名鹊起，是年轻一代中最令人恐惧的杀手。',
    greeting: '铁手无情铁手紧握，冷声道："目标确认，你可以死了。"',
    roomId: 'beidou_city_main_street',
    dialogues: [
      {
        id: 'npc_353_dlg_0',
        topic: '自我介绍',
        text: '"铁手无情，铁手修罗。"他冷冷道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_353_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_353_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_353_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_353_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_354',
    name: '梦无痕',
    title: '梦境行者',
    description: '一位可在梦境中行走的年轻修士，可在梦中杀人于无形。他的能力诡异莫测，是年轻一代中最令人防不胜防的存在。',
    greeting: '梦无痕双眼微闭，淡淡道："小心，我要进入你的梦境了。"',
    roomId: 'beidou_city_east_market',
    dialogues: [
      {
        id: 'npc_354_dlg_0',
        topic: '自我介绍',
        text: '"梦无痕，梦境行者。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_354_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_354_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_354_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_354_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_355',
    name: '雷震子',
    title: '雷神传人',
    description: '一位天生可掌控雷电的年轻天骄，被誉为雷神转世。他性格火爆，嫉恶如仇，是年轻一代中最热血的存在。',
    greeting: '雷震子周身雷电缠绕，噼啪作响："挡我者，天雷诛之！"',
    roomId: 'beidou_city_west_market',
    dialogues: [
      {
        id: 'npc_355_dlg_0',
        topic: '自我介绍',
        text: '"雷震子，雷神传人。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_355_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_355_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_355_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_355_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_356',
    name: '水灵儿',
    title: '水之仙子',
    description: '一位天生与水亲和的年轻女子，可操控万水。她性情温柔，如水一般包容，是年轻一代中最受欢迎的女子之一。',
    greeting: '水灵儿周身水波荡漾，微笑道："水能载舟，亦能覆舟。你是舟还是石？"',
    roomId: 'beidou_imperial_city',
    dialogues: [
      {
        id: 'npc_356_dlg_0',
        topic: '自我介绍',
        text: '"水灵儿，水之仙子。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_356_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_356_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_356_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_356_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_357',
    name: '火灵儿',
    title: '火之仙子',
    description: '一位天生与火亲和的年轻女子，可操控万火。她性情火爆，如火焰一般炽烈，与水灵儿是死对头。',
    greeting: '火灵儿周身火焰燃烧，傲然道："靠近我，你会被烧成灰烬！"',
    roomId: 'beidou_imperial_palace',
    dialogues: [
      {
        id: 'npc_357_dlg_0',
        topic: '自我介绍',
        text: '"火灵儿，火之仙子。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_357_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_357_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_357_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_357_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_358',
    name: '土行孙',
    title: '地行传人',
    description: '一位精通土遁之术的年轻修士，可在地下自由穿行。他性格憨厚，重情重义，是年轻一代中最可靠的伙伴。',
    greeting: '土行孙从地下钻出，满身泥土："地下可比地上安全多了，要不要跟我躲一躲？"',
    roomId: 'beidou_sky_pavilion',
    dialogues: [
      {
        id: 'npc_358_dlg_0',
        topic: '自我介绍',
        text: '"土行孙，地行传人。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_358_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_358_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_358_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_358_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_359',
    name: '风清扬',
    title: '清风剑客',
    description: '一位以风之剑法闻名的年轻剑客，剑如风，无形无迹。他性格洒脱，不受拘束，是年轻一代中最自由的剑客。',
    greeting: '风清扬剑随风动，淡淡道："风无形，剑无迹，你接得住吗？"',
    roomId: 'huanggu_core',
    dialogues: [
      {
        id: 'npc_359_dlg_0',
        topic: '自我介绍',
        text: '"风清扬，清风剑客。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_359_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_359_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_359_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_359_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_360',
    name: '月无双',
    title: '月华天女',
    description: '一位以月华之力修炼的年轻女子，每逢月圆之夜实力暴涨。她清冷如月，高不可攀，是年轻一代中最令人向往的女子。',
    greeting: '月无双沐浴月光，淡淡道："月圆之夜，我的实力会翻倍。你确定要现在挑战我？"',
    roomId: 'huanggu_tomb',
    dialogues: [
      {
        id: 'npc_360_dlg_0',
        topic: '自我介绍',
        text: '"月无双，月华天女。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_360_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_360_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_360_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_360_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_361',
    name: '醉道人',
    title: '酒中仙',
    description: '一位以酒入道的老道人，整日醉醺醺，却实力深不可测。他说酒中自有大道，醉眼朦胧中可见真理。',
    greeting: '醉道人提着酒葫芦，醉醺醺道："来，陪老夫喝一碗！酒中自有乾坤！"',
    roomId: 'huanggu_lake',
    dialogues: [
      {
        id: 'npc_361_dlg_0',
        topic: '自我介绍',
        text: '"醉道人，酒中仙。"他醉醺醺地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'npc_361_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'npc_361_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'npc_361_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'npc_361_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'npc_362',
    name: '棋痴老人',
    title: '棋道圣手',
    description: '一位痴迷于下棋的老人，棋艺无双，天下无敌。他说棋如人生，落子无悔，每一步都蕴含着大道至理。',
    greeting: '棋痴老人盯着棋盘，头也不抬："来，陪老夫下一盘。赢了，老夫送你一场造化。"',
    roomId: 'xianyu_gate',
    dialogues: [
      {
        id: 'npc_362_dlg_0',
        topic: '自我介绍',
        text: '"棋痴老人，棋道圣手。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'npc_362_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'npc_362_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'npc_362_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'npc_362_dlg_4',
        topic: '请求指点',
        text: '"指点？"他微微一笑："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'npc_363',
    name: '画圣',
    title: '丹青妙手',
    description: '一位以画入道的老人，画笔一挥可画出真实世界。他的画作不仅美观，还可将画中物具现化，是世间最神奇的画道宗师。',
    greeting: '画圣挥毫泼墨，微笑道："看好了，这一笔，可画出山河万里。"',
    roomId: 'xianyu_palace',
    dialogues: [
      {
        id: 'npc_363_dlg_0',
        topic: '自我介绍',
        text: '"画圣，丹青妙手。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'npc_363_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'npc_363_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'npc_363_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'npc_363_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'npc_364',
    name: '书圣',
    title: '书法宗师',
    description: '一位以书法入道的老人，一笔一划皆含道韵。他的书法作品不仅是艺术，更是可镇压邪魔的法器，是世间最珍贵的墨宝。',
    greeting: '书圣提笔蘸墨，淡淡道："字如其人，心正则笔正。让我看看你的心。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: 'npc_364_dlg_0',
        topic: '自我介绍',
        text: '"书圣，书法宗师。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'npc_364_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'npc_364_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'npc_364_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'npc_364_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'npc_365',
    name: '医圣',
    title: '医道至尊',
    description: '一位医术通神的老人，可生死人肉白骨，起死回生。他一生救死扶伤无数，从不问对方身份，只问病情，是世间最受人尊敬的老人。',
    greeting: '医圣把了把你的脉，皱眉道："气血两虚，经脉滞涩，最近可是太拼命了？"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: 'npc_365_dlg_0',
        topic: '自我介绍',
        text: '"医圣，医道至尊。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'npc_365_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'npc_365_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'npc_365_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'npc_365_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'npc_366',
    name: '大夏太子',
    title: '储君',
    description: '大夏皇朝的太子，未来的皇主。他自幼接受最好的教育，文韬武略样样精通，是中州最有前途的年轻人。',
    greeting: '大夏太子身着蟒袍，淡淡道："见本宫，为何不跪？"',
    roomId: 'stone_kingdom_zhuque',
    dialogues: [
      {
        id: 'npc_366_dlg_0',
        topic: '自我介绍',
        text: '"大夏太子，储君。"他傲然道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_366_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_366_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_366_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_366_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_367',
    name: '古华太子',
    title: '储君',
    description: '古华皇朝的太子，儒雅斯文，实则城府极深。他在朝中结交了不少大臣，为将来继位做准备。',
    greeting: '古华太子微微一笑，拱手道："公子有礼了。"',
    roomId: 'stone_kingdom_east_market',
    dialogues: [
      {
        id: 'npc_367_dlg_0',
        topic: '自我介绍',
        text: '"古华太子，储君。"他傲然道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_367_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_367_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_367_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_367_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_368',
    name: '九黎太子',
    title: '储君',
    description: '九黎皇朝的太子，身材魁梧，武艺高强。他常年随军出征，在军中有极高的威望，是九黎未来的战神。',
    greeting: '九黎太子拍了拍腰间长刀，爽朗道："来！跟我去打一场猎！"',
    roomId: 'stone_kingdom_west_market',
    dialogues: [
      {
        id: 'npc_368_dlg_0',
        topic: '自我介绍',
        text: '"九黎太子，储君。"他傲然道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_368_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_368_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_368_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_368_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_369',
    name: '大夏国师',
    title: '护国法师',
    description: '大夏皇朝的护国法师，精通法术和占卜。他为大夏皇朝服务了数百年，是大夏皇主最信任的谋士之一。',
    greeting: '大夏国师手持法杖，沉声道："国运昌盛，天佑大夏。"',
    roomId: 'stone_kingdom_huji_tavern',
    dialogues: [
      {
        id: 'npc_369_dlg_0',
        topic: '自我介绍',
        text: '"大夏国师，护国法师。"他淡淡道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_369_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_369_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_369_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_369_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_370',
    name: '古华国师',
    title: '护国法师',
    description: '古华皇朝的护国法师，精通阵法和符箓。他为古华皇朝布置了无数的护国大阵，是古华皇朝最坚固的屏障。',
    greeting: '古华国师展开阵图，微笑道："古华皇朝，固若金汤。"',
    roomId: 'stone_kingdom_wanjintang',
    dialogues: [
      {
        id: 'npc_370_dlg_0',
        topic: '自我介绍',
        text: '"古华国师，护国法师。"他淡淡道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_370_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_370_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_370_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_370_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_371',
    name: '九黎国师',
    title: '护国法师',
    description: '九黎皇朝的护国法师，精通巫术和蛊毒。他为九黎皇朝培养了无数的巫蛊战士，是九黎皇朝最神秘的存在。',
    greeting: '九黎国师袖中爬出一只金蚕，阴笑道："敢犯九黎者，万蛊噬身！"',
    roomId: 'stone_kingdom_wanjintang_back',
    dialogues: [
      {
        id: 'npc_371_dlg_0',
        topic: '自我介绍',
        text: '"九黎国师，护国法师。"他淡淡道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_371_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_371_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_371_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_371_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_372',
    name: '大夏禁军统领',
    title: '禁军之首',
    description: '大夏皇朝禁军的统领，负责保护皇主和皇宫的安全。他忠心耿耿，武艺高强，是大夏皇主最信任的人。',
    greeting: '大夏禁军统领甲胄在身，沉声道："皇宫重地，闲人免进！"',
    roomId: 'stone_kingdom_dark_market',
    dialogues: [
      {
        id: 'npc_372_dlg_0',
        topic: '自我介绍',
        text: '"大夏禁军统领，禁军之首。"他淡淡道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_372_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_372_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_372_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_372_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_373',
    name: '古华禁军统领',
    title: '禁军之首',
    description: '古华皇朝禁军的统领，负责保护皇主和皇宫的安全。他智勇双全，将禁军训练得纪律严明，是古华皇主的左膀右臂。',
    greeting: '古华禁军统领目光如炬，沉声道："擅闯皇宫者，格杀勿论！"',
    roomId: 'stone_kingdom_zuiyuefang',
    dialogues: [
      {
        id: 'npc_373_dlg_0',
        topic: '自我介绍',
        text: '"古华禁军统领，禁军之首。"他淡淡道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_373_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_373_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_373_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_373_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_374',
    name: '九黎禁军统领',
    title: '禁军之首',
    description: '九黎皇朝禁军的统领，负责保护皇主和皇宫的安全。他身经百战，浑身杀气凝为实质，是九黎皇主最锋利的刀。',
    greeting: '九黎禁军统领杀气腾腾，冷声道："来者止步，再往前一步，死！"',
    roomId: 'stone_kingdom_cangchun',
    dialogues: [
      {
        id: 'npc_374_dlg_0',
        topic: '自我介绍',
        text: '"九黎禁军统领，禁军之首。"他淡淡道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_374_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_374_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_374_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_374_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_375',
    name: '大夏御医',
    title: '宫廷神医',
    description: '大夏皇朝的御医，医术通神，可生死人肉白骨。他专为皇主和皇室成员治病，是大夏皇朝最宝贵的医者。',
    greeting: '大夏御医提着药箱，皱眉道："陛下龙体欠安，老臣来诊治。"',
    roomId: 'stone_kingdom_cangchun_pool',
    dialogues: [
      {
        id: 'npc_375_dlg_0',
        topic: '自我介绍',
        text: '"大夏御医，宫廷神医。"他淡淡道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_375_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_375_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_375_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_375_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他沉吟片刻："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_376',
    name: '古华御医',
    title: '宫廷神医',
    description: '古华皇朝的御医，精通医术和炼丹。他炼制的丹药可延年益寿，是古华皇主最信赖的医者。',
    greeting: '古华御医展开银针，微笑道："针灸之道，可通经脉，可治百病。"',
    roomId: 'stone_kingdom_yicui',
    dialogues: [
      {
        id: 'npc_376_dlg_0',
        topic: '自我介绍',
        text: '"古华御医，宫廷神医。"他淡淡道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_376_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_376_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_376_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_376_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他沉吟片刻："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_377',
    name: '九黎御医',
    title: '宫廷神医',
    description: '九黎皇朝的御医，精通巫医之道。他以巫术治病，以草药疗伤，是九黎皇朝最神奇的医者。',
    greeting: '九黎御医手持骨杖，念念有词："祖先保佑，祛病消灾……"',
    roomId: 'stone_kingdom_zuixian',
    dialogues: [
      {
        id: 'npc_377_dlg_0',
        topic: '自我介绍',
        text: '"九黎御医，宫廷神医。"他淡淡道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_377_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_377_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_377_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_377_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他沉吟片刻："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_378',
    name: '大夏礼部尚书',
    title: '礼部之首',
    description: '大夏皇朝礼部的尚书，掌管礼仪和祭祀。他精通各种礼仪，是大夏皇朝最讲究规矩的人。',
    greeting: '大夏礼部尚书整理衣冠，沉声道："礼仪之道，不可废也。"',
    roomId: 'stone_kingdom_taohua',
    dialogues: [
      {
        id: 'npc_378_dlg_0',
        topic: '自我介绍',
        text: '"大夏礼部尚书，礼部之首。"他傲然道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_378_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_378_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_378_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_378_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_379',
    name: '古华户部尚书',
    title: '户部之首',
    description: '古华皇朝户部的尚书，掌管财政和税收。他精打细算，将古华皇朝的财政打理得井井有条，是古华皇主的财神爷。',
    greeting: '古华户部尚书拨着算盘，笑眯眯道："国库充盈，可堪大用。"',
    roomId: 'stone_kingdom_fang_01',
    dialogues: [
      {
        id: 'npc_379_dlg_0',
        topic: '自我介绍',
        text: '"古华户部尚书，户部之首。"他傲然道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_379_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_379_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_379_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_379_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_380',
    name: '九黎兵部尚书',
    title: '兵部之首',
    description: '九黎皇朝兵部的尚书，掌管军事和兵员。他精通兵法，为九黎皇朝训练了无数的精兵强将，是九黎皇主的战神。',
    greeting: '九黎兵部尚书展开兵书，沉声道："兵者，国之大事，不可不察。"',
    roomId: 'stone_kingdom_fang_02',
    dialogues: [
      {
        id: 'npc_380_dlg_0',
        topic: '自我介绍',
        text: '"九黎兵部尚书，兵部之首。"他傲然道："皇朝之事，岂是寻常百姓能知。"',
      },
      {
        id: 'npc_380_dlg_1',
        topic: '问皇朝制度',
        text: '"我朝制度严谨，分工明确。"他自豪道："文官治政，武将守边，各司其职，方能国泰民安。"',
      },
      {
        id: 'npc_380_dlg_2',
        topic: '谈为官之道',
        text: '"为官之道，在于清廉。"他沉吟道："贪赃枉法者，虽一时得利，终将身败名裂。"',
      },
      {
        id: 'npc_380_dlg_3',
        topic: '论天下大势',
        text: '"天下大势，分久必合，合久必分。"他低声道："各大皇朝之间明争暗斗，稍有不慎，便是战火连天。"',
      },
      {
        id: 'npc_380_dlg_4',
        topic: '请求引荐',
        text: '"想让我引荐？"他审视着你："需看你有没有那个资格。皇朝可不是什么人都能进的。"',
      },
    ],
  },
  {
    id: 'npc_381',
    name: '迦叶尊者',
    title: '头陀第一',
    description: '释迦牟尼的十大弟子之一，头陀行第一。他严守戒律，苦行修炼，是佛门中最严格的修行者。',
    greeting: '迦叶尊者合十行礼，沉声道："施主，可愿同修苦行？"',
    roomId: 'stone_kingdom_fang_03',
    dialogues: [
      {
        id: 'npc_381_dlg_0',
        topic: '自我介绍',
        text: '"迦叶尊者，头陀第一。"他庄严地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'npc_381_dlg_1',
        topic: '问佛法奥义',
        text: '"佛法无边，奥义无穷。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海，往生净土。"',
      },
      {
        id: 'npc_381_dlg_2',
        topic: '谈修行之苦',
        text: '"修行如逆水行舟，不进则退。"他缓缓道："需持戒、修定、发慧，三者缺一不可。"',
      },
      {
        id: 'npc_381_dlg_3',
        topic: '论因果报应',
        text: '"因果循环，报应不爽。"他沉声道："善有善报，恶有恶报，不是不报，时候未到。"',
      },
      {
        id: 'npc_381_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'npc_382',
    name: '阿难尊者',
    title: '多闻第一',
    description: '释迦牟尼的十大弟子之一，多闻第一。他博闻强记，将佛陀的教诲全部记下，是佛经的传承者。',
    greeting: '阿难尊者微笑道："施主想听哪部佛经？我为你说来。"',
    roomId: 'stone_kingdom_bishui_yuan',
    dialogues: [
      {
        id: 'npc_382_dlg_0',
        topic: '自我介绍',
        text: '"阿难尊者，多闻第一。"他庄严地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'npc_382_dlg_1',
        topic: '问佛法奥义',
        text: '"佛法无边，奥义无穷。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海，往生净土。"',
      },
      {
        id: 'npc_382_dlg_2',
        topic: '谈修行之苦',
        text: '"修行如逆水行舟，不进则退。"他缓缓道："需持戒、修定、发慧，三者缺一不可。"',
      },
      {
        id: 'npc_382_dlg_3',
        topic: '论因果报应',
        text: '"因果循环，报应不爽。"他沉声道："善有善报，恶有恶报，不是不报，时候未到。"',
      },
      {
        id: 'npc_382_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'npc_383',
    name: '文殊菩萨',
    title: '智慧菩萨',
    description: '佛门四大菩萨之一，代表智慧。他手持智慧剑，可斩断一切烦恼，是佛门中最智慧的菩萨。',
    greeting: '文殊菩萨手持智慧剑，微笑道："智慧如剑，可断烦恼。"',
    roomId: 'stone_kingdom_fang_04',
    dialogues: [
      {
        id: 'npc_383_dlg_0',
        topic: '自我介绍',
        text: '"文殊菩萨，智慧菩萨。"他庄严地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'npc_383_dlg_1',
        topic: '问佛法奥义',
        text: '"佛法无边，奥义无穷。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海，往生净土。"',
      },
      {
        id: 'npc_383_dlg_2',
        topic: '谈修行之苦',
        text: '"修行如逆水行舟，不进则退。"他缓缓道："需持戒、修定、发慧，三者缺一不可。"',
      },
      {
        id: 'npc_383_dlg_3',
        topic: '论因果报应',
        text: '"因果循环，报应不爽。"他沉声道："善有善报，恶有恶报，不是不报，时候未到。"',
      },
      {
        id: 'npc_383_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'npc_384',
    name: '普贤菩萨',
    title: '行愿菩萨',
    description: '佛门四大菩萨之一，代表行愿。他骑乘白象，行愿无边，是佛门中最有愿力的菩萨。',
    greeting: '普贤菩萨骑象而来，庄严道："行愿无边，广度众生。"',
    roomId: 'stone_kingdom_yaotai',
    dialogues: [
      {
        id: 'npc_384_dlg_0',
        topic: '自我介绍',
        text: '"普贤菩萨，行愿菩萨。"他庄严地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'npc_384_dlg_1',
        topic: '问佛法奥义',
        text: '"佛法无边，奥义无穷。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海，往生净土。"',
      },
      {
        id: 'npc_384_dlg_2',
        topic: '谈修行之苦',
        text: '"修行如逆水行舟，不进则退。"他缓缓道："需持戒、修定、发慧，三者缺一不可。"',
      },
      {
        id: 'npc_384_dlg_3',
        topic: '论因果报应',
        text: '"因果循环，报应不爽。"他沉声道："善有善报，恶有恶报，不是不报，时候未到。"',
      },
      {
        id: 'npc_384_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'npc_385',
    name: '观音菩萨',
    title: '慈悲菩萨',
    description: '佛门四大菩萨之一，代表慈悲。她千手千眼，可听闻世间一切苦难，是佛门中最慈悲的菩萨。',
    greeting: '观音菩萨手持净瓶，温柔道："众生皆苦，我佛慈悲。"',
    roomId: 'stone_kingdom_yaotai_food',
    dialogues: [
      {
        id: 'npc_385_dlg_0',
        topic: '自我介绍',
        text: '"观音菩萨，慈悲菩萨。"他庄严地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'npc_385_dlg_1',
        topic: '问佛法奥义',
        text: '"佛法无边，奥义无穷。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海，往生净土。"',
      },
      {
        id: 'npc_385_dlg_2',
        topic: '谈修行之苦',
        text: '"修行如逆水行舟，不进则退。"他缓缓道："需持戒、修定、发慧，三者缺一不可。"',
      },
      {
        id: 'npc_385_dlg_3',
        topic: '论因果报应',
        text: '"因果循环，报应不爽。"他沉声道："善有善报，恶有恶报，不是不报，时候未到。"',
      },
      {
        id: 'npc_385_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'npc_386',
    name: '地藏菩萨',
    title: '大愿菩萨',
    description: '佛门四大菩萨之一，代表大愿。他发誓地狱不空，誓不成佛，是佛门中最有毅力的菩萨。',
    greeting: '地藏菩萨手持锡杖，沉声道："地狱不空，誓不成佛。"',
    roomId: 'stone_kingdom_yaotai_discuss',
    dialogues: [
      {
        id: 'npc_386_dlg_0',
        topic: '自我介绍',
        text: '"地藏菩萨，大愿菩萨。"他庄严地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'npc_386_dlg_1',
        topic: '问佛法奥义',
        text: '"佛法无边，奥义无穷。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海，往生净土。"',
      },
      {
        id: 'npc_386_dlg_2',
        topic: '谈修行之苦',
        text: '"修行如逆水行舟，不进则退。"他缓缓道："需持戒、修定、发慧，三者缺一不可。"',
      },
      {
        id: 'npc_386_dlg_3',
        topic: '论因果报应',
        text: '"因果循环，报应不爽。"他沉声道："善有善报，恶有恶报，不是不报，时候未到。"',
      },
      {
        id: 'npc_386_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他微笑道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'npc_387',
    name: '罗汉堂首座',
    title: '罗汉之首',
    description: '西漠佛教罗汉堂的首座，统领五百罗汉。他战力惊人，是佛门中的战斗领袖，负责守护佛门安全。',
    greeting: '罗汉堂首座怒目圆睁，声如雷鸣："佛门清净地，妖邪速退！"',
    roomId: 'stone_kingdom_yaotai_pool',
    dialogues: [
      {
        id: 'npc_387_dlg_0',
        topic: '自我介绍',
        text: '"罗汉堂首座，罗汉之首。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'npc_387_dlg_1',
        topic: '问佛法奥义',
        text: '"佛法无边，奥义无穷。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海，往生净土。"',
      },
      {
        id: 'npc_387_dlg_2',
        topic: '谈修行之苦',
        text: '"修行如逆水行舟，不进则退。"他缓缓道："需持戒、修定、发慧，三者缺一不可。"',
      },
      {
        id: 'npc_387_dlg_3',
        topic: '论因果报应',
        text: '"因果循环，报应不爽。"他沉声道："善有善报，恶有恶报，不是不报，时候未到。"',
      },
      {
        id: 'npc_387_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他庄严道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'npc_388',
    name: '戒律院首座',
    title: '戒律之首',
    description: '西漠佛教戒律院的首座，负责维护佛门戒律。他铁面无私，对违反戒律者毫不留情，是佛门中的执法者。',
    greeting: '戒律院首座手持戒律板，沉声道："违反戒律者，杖责三百！"',
    roomId: 'stone_kingdom_culture_plaza',
    dialogues: [
      {
        id: 'npc_388_dlg_0',
        topic: '自我介绍',
        text: '"戒律院首座，戒律之首。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'npc_388_dlg_1',
        topic: '问佛法奥义',
        text: '"佛法无边，奥义无穷。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海，往生净土。"',
      },
      {
        id: 'npc_388_dlg_2',
        topic: '谈修行之苦',
        text: '"修行如逆水行舟，不进则退。"他缓缓道："需持戒、修定、发慧，三者缺一不可。"',
      },
      {
        id: 'npc_388_dlg_3',
        topic: '论因果报应',
        text: '"因果循环，报应不爽。"他沉声道："善有善报，恶有恶报，不是不报，时候未到。"',
      },
      {
        id: 'npc_388_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他庄严道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'npc_389',
    name: '般若堂首座',
    title: '般若之首',
    description: '西漠佛教般若堂的首座，精通般若智慧。他可将深奥的佛理用简单的话语解释清楚，是佛门中的智者。',
    greeting: '般若堂首座微笑道："般若智慧，在于明心见性。"',
    roomId: 'stone_kingdom_imperial_gate',
    dialogues: [
      {
        id: 'npc_389_dlg_0',
        topic: '自我介绍',
        text: '"般若堂首座，般若之首。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'npc_389_dlg_1',
        topic: '问佛法奥义',
        text: '"佛法无边，奥义无穷。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海，往生净土。"',
      },
      {
        id: 'npc_389_dlg_2',
        topic: '谈修行之苦',
        text: '"修行如逆水行舟，不进则退。"他缓缓道："需持戒、修定、发慧，三者缺一不可。"',
      },
      {
        id: 'npc_389_dlg_3',
        topic: '论因果报应',
        text: '"因果循环，报应不爽。"他沉声道："善有善报，恶有恶报，不是不报，时候未到。"',
      },
      {
        id: 'npc_389_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他庄严道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'npc_390',
    name: '达摩院首座',
    title: '武道之首',
    description: '西漠佛教达摩院的首座，精通佛门武学。他将佛法与武道融合，创出无数佛门绝技，是佛门中的武学宗师。',
    greeting: '达摩院首座摆出拳架，沉声道："佛法无边，武道无疆。"',
    roomId: 'stone_kingdom_imperial_city',
    dialogues: [
      {
        id: 'npc_390_dlg_0',
        topic: '自我介绍',
        text: '"达摩院首座，武道之首。"他温和地说道："我佛慈悲，普度众生。"',
      },
      {
        id: 'npc_390_dlg_1',
        topic: '问佛法奥义',
        text: '"佛法无边，奥义无穷。"他双手合十："我佛以大智慧、大慈悲，指引众生脱离苦海，往生净土。"',
      },
      {
        id: 'npc_390_dlg_2',
        topic: '谈修行之苦',
        text: '"修行如逆水行舟，不进则退。"他缓缓道："需持戒、修定、发慧，三者缺一不可。"',
      },
      {
        id: 'npc_390_dlg_3',
        topic: '论因果报应',
        text: '"因果循环，报应不爽。"他沉声道："善有善报，恶有恶报，不是不报，时候未到。"',
      },
      {
        id: 'npc_390_dlg_4',
        topic: '请求皈依',
        text: '"若施主真心皈依，佛门自然欢迎。"他庄严道："但皈依容易，修行难。需持之以恒，方能得成正果。"',
      },
    ],
  },
  {
    id: 'npc_391',
    name: '源天书传人',
    title: '源天书继承者',
    description: '源天师一脉中继承《源天书》的传人，精通源术之道。他可将《源天书》中的源术运用自如，是当世最顶尖的源术师之一。',
    greeting: '源天书传人手持古籍，沉声道："《源天书》在此，谁敢不服？"',
    roomId: 'stone_kingdom_jiaofangsi',
    dialogues: [
      {
        id: 'npc_391_dlg_0',
        topic: '自我介绍',
        text: '"源天书传人，源天书继承者。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'npc_391_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'npc_391_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'npc_391_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'npc_391_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'npc_392',
    name: '寻龙点穴师',
    title: '风水大师',
    description: '一位精通寻龙点穴之术的风水大师，可找到天地间最好的修炼宝地。他为各大势力寻找龙脉，是世间最抢手的人才。',
    greeting: '寻龙点穴师手持罗盘，目光如炬："此地龙脉汇聚，乃绝佳的修炼宝地！"',
    roomId: 'stone_kingdom_feiyinge',
    dialogues: [
      {
        id: 'npc_392_dlg_0',
        topic: '自我介绍',
        text: '"寻龙点穴师，风水大师。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'npc_392_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'npc_392_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'npc_392_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'npc_392_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'npc_393',
    name: '观星识源师',
    title: '星象源师',
    description: '一位通过观星象来识别源石的奇人，据说星辰的位置可影响源石的品质。他常年夜观天象，是源术界最另类的存在。',
    greeting: '观星识源师仰望星空，喃喃道："星辰移位，明日必有源石出世……"',
    roomId: 'stone_kingdom_feiyinge_2',
    dialogues: [
      {
        id: 'npc_393_dlg_0',
        topic: '自我介绍',
        text: '"观星识源师，星象源师。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'npc_393_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'npc_393_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'npc_393_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'npc_393_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'npc_394',
    name: '闻香识源师',
    title: '嗅觉源师',
    description: '一位通过嗅觉来识别源石的奇人，据说不同的源石有不同的气味。他的鼻子比任何仪器都灵敏，是源术界最神奇的源师。',
    greeting: '闻香识源师嗅了嗅空气，兴奋道："我闻到了！东边有块极品源石！"',
    roomId: 'stone_kingdom_feiyinge_3',
    dialogues: [
      {
        id: 'npc_394_dlg_0',
        topic: '自我介绍',
        text: '"闻香识源师，嗅觉源师。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'npc_394_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'npc_394_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'npc_394_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'npc_394_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'npc_395',
    name: '听声识源师',
    title: '听觉源师',
    description: '一位通过敲击原石听声音来识别源石的奇人，据说不同的源石有不同的回音。他的耳朵可分辨出最细微的声音差别。',
    greeting: '听声识源师敲了敲原石，侧耳倾听："这块……声音清脆，必有货！"',
    roomId: 'stone_kingdom_baixipeng',
    dialogues: [
      {
        id: 'npc_395_dlg_0',
        topic: '自我介绍',
        text: '"听声识源师，听觉源师。"他沉稳地说道："源术之道，博大精深，穷其一生也难以穷尽。"',
      },
      {
        id: 'npc_395_dlg_1',
        topic: '问源天师传说',
        text: '"源天师，可寻龙点穴，观天察地，找到天地间的造化之源。"他神色向往："真正的源天师，可布局天地，以源术对抗大帝。"',
      },
      {
        id: 'npc_395_dlg_2',
        topic: '谈赌石之道',
        text: '"赌石，赌的是眼力、胆识和运气。"他沉吟道："一刀切下去，可能一夜暴富，也可能血本无归。心脏不好者，莫入此道。"',
      },
      {
        id: 'npc_395_dlg_3',
        topic: '论源术传承',
        text: '"源天师一脉，传承艰难。"他叹息道："不仅需要天赋，更需要大量实践。如今真正的源天师，已经凤毛麟角了。"',
      },
      {
        id: 'npc_395_dlg_4',
        topic: '请求传授源术',
        text: '"想学源术？"他沉吟片刻："先去背熟《源天书》，再随我入山实践三年，方可入门。"',
      },
    ],
  },
  {
    id: 'npc_396',
    name: '紫微星商人',
    title: '星际商人',
    description: '一位在北斗星域间做生意的商人，走遍了各大星球。他消息灵通，货物齐全，是星际旅行者们最喜欢的交易对象。',
    greeting: '紫微星商人打开货舱，热情地介绍："来看看，这可是从飞仙星运来的特产！"',
    roomId: 'stone_kingdom_ministries',
    dialogues: [
      {
        id: 'npc_396_dlg_0',
        topic: '自我介绍',
        text: '"紫微星商人，星际商人。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'npc_396_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'npc_396_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'npc_396_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'npc_396_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他咧嘴一笑："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'npc_397',
    name: '永恒国度科学家',
    title: '科学狂人',
    description: '来自永恒国度的科学家，痴迷于研究修仙与科技的结合。他认为修仙和科学本质上是相通的，都追求对宇宙的深刻理解。',
    greeting: '永恒国度科学家启动仪器，兴奋道："让我分析一下你的能量构成！太神奇了！"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: 'npc_397_dlg_0',
        topic: '自我介绍',
        text: '"永恒国度科学家，科学狂人。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'npc_397_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'npc_397_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'npc_397_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'npc_397_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'npc_398',
    name: '勾陈古星守护者',
    title: '古星守护者',
    description: '勾陈古星的守护者，世代守护这颗古老的星球。他见证了勾陈星的兴衰，对古星有着深厚的感情。',
    greeting: '勾陈古星守护者挡在星门前，沉声道："勾陈古星，不容侵犯！"',
    roomId: 'stone_kingdom_scripture',
    dialogues: [
      {
        id: 'npc_398_dlg_0',
        topic: '自我介绍',
        text: '"勾陈古星守护者，古星守护者。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'npc_398_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'npc_398_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'npc_398_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'npc_398_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'npc_399',
    name: '火桑星遗民',
    title: '火桑遗孤',
    description: '来自火桑星的遗民，那颗星球已经毁灭。他背负着复兴母星的使命，流浪在星域之间，寻找新的家园。',
    greeting: '火桑星遗民眼中闪过悲伤："火桑星……已经不存在了。我是最后的遗民。"',
    roomId: 'stone_kingdom_technique',
    dialogues: [
      {
        id: 'npc_399_dlg_0',
        topic: '自我介绍',
        text: '"火桑星遗民，火桑遗孤。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'npc_399_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'npc_399_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'npc_399_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'npc_399_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'npc_400',
    name: '飞仙星花魁',
    title: '飞仙花魁',
    description: '来自飞仙星的花魁，容貌绝美，舞姿曼妙。飞仙星以出产美女闻名，她更是其中的佼佼者，是星域中最有名的花魁。',
    greeting: '飞仙星花魁翩翩起舞，眼波流转："公子，可愿与奴家共舞一曲？"',
    roomId: 'stone_kingdom_prince_mansion',
    dialogues: [
      {
        id: 'npc_400_dlg_0',
        topic: '自我介绍',
        text: '"飞仙星花魁，飞仙花魁。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'npc_400_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'npc_400_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'npc_400_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'npc_400_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'npc_401',
    name: '天兵星老兵',
    title: '天兵老兵',
    description: '天兵星的一位老兵，经历了无数次战斗。他虽然年迈，却依然勇猛，是天兵星战士精神的象征。',
    greeting: '天兵星老兵抚摸着伤疤，沉声道："这些伤疤，都是我的荣耀。"',
    roomId: 'stone_kingdom_palace_gate',
    dialogues: [
      {
        id: 'npc_401_dlg_0',
        topic: '自我介绍',
        text: '"天兵星老兵，天兵老兵。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'npc_401_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'npc_401_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'npc_401_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'npc_401_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'npc_402',
    name: '灵宝星学徒',
    title: '炼器学徒',
    description: '灵宝星的一位炼器学徒，正在学习炼器之术。他梦想着有一天能成为炼器宗师，铸造出属于自己的仙器。',
    greeting: '灵宝星学徒挥舞着锤子，兴奋道："我要铸造出世界上最强的仙器！"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: 'npc_402_dlg_0',
        topic: '自我介绍',
        text: '"灵宝星学徒，炼器学徒。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'npc_402_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'npc_402_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'npc_402_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'npc_402_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'npc_403',
    name: '天元星长老',
    title: '天元太上',
    description: '天元星的太上长老，见证了天元星的兴衰。他精通天元星的古法，是天元星最受人尊敬的长者。',
    greeting: '天元星长老周身灵气浓郁，微笑道："天元星欢迎每一位求道者。"',
    roomId: 'stone_kingdom_throne',
    dialogues: [
      {
        id: 'npc_403_dlg_0',
        topic: '自我介绍',
        text: '"天元星长老，天元太上。"他威严地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'npc_403_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'npc_403_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'npc_403_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'npc_403_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'npc_404',
    name: '黄泉星摆渡人',
    title: '黄泉渡者',
    description: '来自黄泉星的摆渡人，负责引渡亡魂过河。他见惯了生死，对世间的一切都看得淡然。',
    greeting: '黄泉星摆渡人撑着竹篙，沙哑道："要过河吗？黄泉路，有去无回。"',
    roomId: 'stone_kingdom_harem',
    dialogues: [
      {
        id: 'npc_404_dlg_0',
        topic: '自我介绍',
        text: '"黄泉星摆渡人，黄泉渡者。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'npc_404_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'npc_404_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'npc_404_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'npc_404_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'npc_405',
    name: '混沌星探险者',
    title: '混沌探险家',
    description: '一位专门探索混沌星的探险家，胆大心细。混沌星充满了混沌之力，他却如鱼得水，是混沌星最了解的人。',
    greeting: '混沌星探险者浑身混沌气缭绕，兴奋道："混沌星又有新的发现了！"',
    roomId: 'stone_kingdom_treasure',
    dialogues: [
      {
        id: 'npc_405_dlg_0',
        topic: '自我介绍',
        text: '"混沌星探险者，混沌探险家。"他淡淡地说道："北斗星域，浩瀚无垠，每一颗星球都有自己的故事。"',
      },
      {
        id: 'npc_405_dlg_1',
        topic: '问星球历史',
        text: '"我所在的星球，历史悠久，传承深远。"他追忆道："那里有古老的遗迹，有神秘的传承，也有无数先辈留下的足迹。"',
      },
      {
        id: 'npc_405_dlg_2',
        topic: '谈星际旅行',
        text: '"星际旅行，危险重重。"他沉声道："星空中有各种未知的危险，有星际海盗，有虚空异兽，还有古老的禁制。没有实力，寸步难行。"',
      },
      {
        id: 'npc_405_dlg_3',
        topic: '论星域局势',
        text: '"北斗星域看似平静，实则暗流涌动。"他低声道："各大星球之间既有合作，也有竞争。稍有不慎，便是星球之间的战争。"',
      },
      {
        id: 'npc_405_dlg_4',
        topic: '请求带路',
        text: '"想让我带你去？"他沉吟片刻："可以，但你要有足够的实力和报酬。星际旅行，可不是免费的。"',
      },
    ],
  },
  {
    id: 'npc_406',
    name: '张铁匠',
    title: '铁匠',
    description: '一位打铁为生的铁匠，手艺精湛，打出的农具结实耐用。他虽然只是凡人，却有把子力气，连一些低阶修士都比不过。',
    greeting: '张铁匠擦了擦手上的煤灰，爽朗道："要打什么？锄头还是镰刀？"',
    roomId: 'stone_kingdom_flying_platform',
    dialogues: [
      {
        id: 'npc_406_dlg_0',
        topic: '自我介绍',
        text: '"张铁匠，铁匠。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_406_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_406_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_406_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_406_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_407',
    name: '李屠夫',
    title: '屠户',
    description: '一位卖肉为生的屠户，五大三粗，嗓门极大。他每天凌晨起来杀猪宰羊，是街坊们肉食的供应者。',
    greeting: '李屠夫挥舞着菜刀，大声吆喝："新鲜猪肉！刚杀的！快来买啊！"',
    roomId: 'beidou_star_field',
    dialogues: [
      {
        id: 'npc_407_dlg_0',
        topic: '自我介绍',
        text: '"李屠夫，屠户。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_407_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_407_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_407_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_407_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_408',
    name: '王郎中',
    title: '郎中',
    description: '一位走街串巷的郎中，靠给人看病为生。他不懂修炼，却精通医术，许多修士受伤后也会找他调理。',
    greeting: '王郎中把了把你的脉，皱眉道："气血旺盛，不是普通人啊……"',
    roomId: 'huanggu_forbidden',
    dialogues: [
      {
        id: 'npc_408_dlg_0',
        topic: '自我介绍',
        text: '"王郎中，郎中。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_408_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_408_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_408_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_408_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_409',
    name: '赵掌柜',
    title: '当铺老板',
    description: '一家当铺的掌柜，精明算计，眼光毒辣。他经手的宝贝不计其数，一眼就能看出东西的真假和价值。',
    greeting: '赵掌柜推了推算盘，笑眯眯道："客官要当什么？先让老朽掌掌眼。"',
    roomId: 'yuhua_school',
    dialogues: [
      {
        id: 'npc_409_dlg_0',
        topic: '自我介绍',
        text: '"赵掌柜，当铺老板。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_409_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_409_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_409_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_409_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他眼睛一亮："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_410',
    name: '钱秀才',
    title: '书生',
    description: '一位屡试不第的穷书生，满腹经纶却无人赏识。他常年在街边摆摊写字，替人写信为生，心中却怀有治国平天下的抱负。',
    greeting: '钱秀才放下毛笔，苦笑道："十年寒窗，不如人家一个仙字。"',
    roomId: 'beidou_city_gate',
    dialogues: [
      {
        id: 'npc_410_dlg_0',
        topic: '自我介绍',
        text: '"钱秀才，书生。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_410_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_410_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_410_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_410_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_411',
    name: '孙货郎',
    title: '货郎',
    description: '一位挑着担子走街串巷的货郎，卖些针头线脑、糖果玩具。他是孩子们最喜欢的人，也是乡间最热闹的风景。',
    greeting: '孙货郎摇着拨浪鼓，大声吆喝："糖葫芦！泥人儿！快来买喽！"',
    roomId: 'beidou_city_main_street',
    dialogues: [
      {
        id: 'npc_411_dlg_0',
        topic: '自我介绍',
        text: '"孙货郎，货郎。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_411_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_411_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_411_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_411_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_412',
    name: '周更夫',
    title: '打更人',
    description: '一位负责夜间打更的老人，常年在深夜的街道上行走。他见惯了夜间的怪事，知道许多不为人知的秘密。',
    greeting: '周更夫敲着梆子，沙哑道："天干物燥，小心火烛——夜深了，早点回家吧。"',
    roomId: 'beidou_city_east_market',
    dialogues: [
      {
        id: 'npc_412_dlg_0',
        topic: '自我介绍',
        text: '"周更夫，打更人。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_412_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_412_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_412_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_412_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_413',
    name: '吴裁缝',
    title: '裁缝',
    description: '一位手艺精湛的裁缝，专为人缝制衣裳。他做的衣服合体舒适，连一些修士也会找他定制法袍。',
    greeting: '吴裁缝量着你的尺寸，笑道："客官身材不错，做一身好衣裳肯定精神！"',
    roomId: 'beidou_city_west_market',
    dialogues: [
      {
        id: 'npc_413_dlg_0',
        topic: '自我介绍',
        text: '"吴裁缝，裁缝。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_413_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_413_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_413_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_413_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_414',
    name: '郑木匠',
    title: '木匠',
    description: '一位做木工活儿的老师傅，手艺精湛，可打造出精美的家具。他虽然不懂阵法，却可将木材的纹理与灵气完美结合。',
    greeting: '郑木匠刨着木头，头也不抬："要做家具？把图纸放下，三天后来取。"',
    roomId: 'beidou_imperial_city',
    dialogues: [
      {
        id: 'npc_414_dlg_0',
        topic: '自我介绍',
        text: '"郑木匠，木匠。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_414_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_414_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_414_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_414_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_415',
    name: '陈厨子',
    title: '大厨',
    description: '一家酒楼的大厨，厨艺精湛，做出的菜肴远近闻名。他以普通的食材做出不凡的味道，连一些修士都慕名而来。',
    greeting: '陈厨子挥舞着锅铲，香气四溢："客官稍等，招牌菜马上就好！"',
    roomId: 'beidou_imperial_palace',
    dialogues: [
      {
        id: 'npc_415_dlg_0',
        topic: '自我介绍',
        text: '"陈厨子，大厨。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_415_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_415_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_415_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_415_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_416',
    name: '刘乞丐',
    title: '乞丐',
    description: '一位在街边乞讨的乞丐，衣衫褴褛，蓬头垢面。无人知道他的来历，但据说他曾是一位强大的修士，因故沦落至此。',
    greeting: '刘乞丐伸出破碗，沙哑道："行行好，给口饭吃吧……"',
    roomId: 'beidou_sky_pavilion',
    dialogues: [
      {
        id: 'npc_416_dlg_0',
        topic: '自我介绍',
        text: '"刘乞丐，乞丐。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_416_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_416_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_416_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_416_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_417',
    name: '杨花农',
    title: '花农',
    description: '一位以种花为生的老人，培育出的花卉品种繁多，色彩艳丽。他的花园是城中最美的地方，每到花季便游人如织。',
    greeting: '杨花农捧着一盆牡丹，笑道："这花养了三十年，今日终于开了。"',
    roomId: 'huanggu_core',
    dialogues: [
      {
        id: 'npc_417_dlg_0',
        topic: '自我介绍',
        text: '"杨花农，花农。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_417_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_417_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_417_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_417_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_418',
    name: '朱豆腐',
    title: '豆腐摊主',
    description: '一位卖豆腐的年轻寡妇，容貌秀丽，被称为豆腐西施。她的豆腐嫩滑可口，是城中最受欢迎的美食之一。',
    greeting: '朱豆腐擦了擦手，笑道："客官，来块豆腐吗？刚做的，嫩着呢！"',
    roomId: 'huanggu_tomb',
    dialogues: [
      {
        id: 'npc_418_dlg_0',
        topic: '自我介绍',
        text: '"朱豆腐，豆腐摊主。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_418_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_418_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_418_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_418_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他憨厚一笑："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_419',
    name: '秦算命',
    title: '算命先生',
    description: '一位在街边摆摊算命的先生，据说算命极准。他可通过面相和手相看出一个人的命运，每天都有人排队找他算命。',
    greeting: '秦算命摇了摇龟甲，笑眯眯道："客官来算一卦？算姻缘还是算财运？"',
    roomId: 'huanggu_lake',
    dialogues: [
      {
        id: 'npc_419_dlg_0',
        topic: '自我介绍',
        text: '"秦算命，算命先生。"他憨厚一笑："咱就是个普通人，靠手艺吃饭。"',
      },
      {
        id: 'npc_419_dlg_1',
        topic: '问生活琐事',
        text: '"日子嘛，就是这样一天天过的。"他感慨道："不求大富大贵，只求平安顺遂，有口饭吃，有个地方住，就够了。"',
      },
      {
        id: 'npc_419_dlg_2',
        topic: '谈修仙者',
        text: '"修仙者？那是天上的神仙，咱高攀不起。"他摇头道："不过有些修仙者倒是挺好，会帮咱们治病除妖。有些就……不说了。"',
      },
      {
        id: 'npc_419_dlg_3',
        topic: '论世道艰难',
        text: '"世道艰难啊……"他叹息道："妖兽横行，盗匪四起，咱们老百姓能活下来就不容易了。"',
      },
      {
        id: 'npc_419_dlg_4',
        topic: '请求帮助',
        text: '"帮忙？"他眼睛一亮："只要您开口，能办到的我一定办！"',
      },
    ],
  },
  {
    id: 'npc_421',
    name: '茶圣',
    title: '茶道宗师',
    description: '一位以茶入道的老人，泡茶之术出神入化。他说茶中有道，一杯清茶可洗涤心灵，是世间最懂茶的人。',
    greeting: '茶圣沏了一杯清茶，微笑道："来，尝尝老夫泡的茶，可洗涤心灵。"',
    roomId: 'xianyu_palace',
    dialogues: [
      {
        id: 'npc_421_dlg_0',
        topic: '自我介绍',
        text: '"茶圣，茶道宗师。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'npc_421_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'npc_421_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'npc_421_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'npc_421_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'npc_422',
    name: '酒圣',
    title: '酒道宗师',
    description: '一位以酒入道的老人，酿酒之术天下无双。他说酒中有道，一杯美酒可忘忧解愁，是世间最懂酒的人。',
    greeting: '酒圣斟了一碗美酒，大笑道："来，陪老夫喝一碗！酒中自有乾坤！"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: 'npc_422_dlg_0',
        topic: '自我介绍',
        text: '"酒圣，酒道宗师。"他醉醺醺地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'npc_422_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'npc_422_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'npc_422_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'npc_422_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'npc_423',
    name: '花圣',
    title: '花道宗师',
    description: '一位以花入道的老人，插花之术美轮美奂。他说花中有道，一盆插花可体现天地之美，是世间最懂花的人。',
    greeting: '花圣修剪着花枝，微笑道："花如人生，有开有落，皆是常态。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: 'npc_423_dlg_0',
        topic: '自我介绍',
        text: '"花圣，花道宗师。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'npc_423_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'npc_423_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'npc_423_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'npc_423_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'npc_424',
    name: '香圣',
    title: '香道宗师',
    description: '一位以香入道的老人，制香之术独步天下。他说香中有道，一缕清香可安神定魂，是世间最懂香的人。',
    greeting: '香圣点燃一炉檀香，淡淡道："香可通神，亦可静心。闻闻看。"',
    roomId: 'stone_kingdom_zhuque',
    dialogues: [
      {
        id: 'npc_424_dlg_0',
        topic: '自我介绍',
        text: '"香圣，香道宗师。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'npc_424_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'npc_424_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'npc_424_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'npc_424_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'npc_425',
    name: '渔圣',
    title: '渔道宗师',
    description: '一位以渔入道的老人，垂钓之术出神入化。他说渔中有道，钓鱼不在鱼，而在钓，是世间最懂渔的人。',
    greeting: '渔圣提起鱼竿，一条金鳞跃出水面："不急不急，鱼儿上钩，需耐心等待。"',
    roomId: 'stone_kingdom_east_market',
    dialogues: [
      {
        id: 'npc_425_dlg_0',
        topic: '自我介绍',
        text: '"渔圣，渔道宗师。"他淡淡地说道："活得久了，很多事情都记不清了。"',
      },
      {
        id: 'npc_425_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'npc_425_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'npc_425_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'npc_425_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'npc_426',
    name: '剑无尘',
    title: '无尘剑客',
    description: '一位以无尘剑法闻名的年轻剑客，剑法凌厉，不留痕迹。他性格冷傲，一心向剑，是年轻一代中最令人敬畏的剑客。',
    greeting: '剑无尘剑指一引，剑气森然："出剑吧，让我看看你的剑道。"',
    roomId: 'stone_kingdom_west_market',
    dialogues: [
      {
        id: 'npc_426_dlg_0',
        topic: '自我介绍',
        text: '"剑无尘，无尘剑客。"他冷冷道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_426_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_426_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_426_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_426_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_427',
    name: '琴心',
    title: '琴道仙子',
    description: '一位以琴音入道的年轻女子，一曲琴音可动天地。她性情温婉，气质出尘，是年轻一代中最受欢迎的仙子。',
    greeting: '琴心拨动琴弦，悠扬的琴声响起："愿闻君之来意。"',
    roomId: 'stone_kingdom_huji_tavern',
    dialogues: [
      {
        id: 'npc_427_dlg_0',
        topic: '自我介绍',
        text: '"琴心，琴道仙子。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_427_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_427_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_427_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_427_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_428',
    name: '墨染',
    title: '墨道书生',
    description: '一位以墨入道的年轻书生，一笔一划皆可化为攻击。他将书法与道法融合，创出独特的墨道，是年轻一代中最有才华的书生。',
    greeting: '墨染提笔蘸墨，微笑道："字如其人，让我看看你的心。"',
    roomId: 'stone_kingdom_wanjintang',
    dialogues: [
      {
        id: 'npc_428_dlg_0',
        topic: '自我介绍',
        text: '"墨染，墨道书生。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_428_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_428_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_428_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_428_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_429',
    name: '丹青',
    title: '画道仙子',
    description: '一位以画入道的年轻女子，一笔一画皆可化为真实。她将绘画与道法融合，创出独特的画道，是年轻一代中最有才华的画家。',
    greeting: '丹青展开画卷，微笑道："进来看看？这是我最新画的仙境。"',
    roomId: 'stone_kingdom_wanjintang_back',
    dialogues: [
      {
        id: 'npc_429_dlg_0',
        topic: '自我介绍',
        text: '"丹青，画道仙子。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_429_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_429_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_429_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_429_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_430',
    name: '棋魂',
    title: '棋道少年',
    description: '一位以棋入道的年轻少年，一盘棋局可定生死。他将棋艺与道法融合，创出独特的棋道，是年轻一代中最有才华的棋手。',
    greeting: '棋魂盯着棋盘，头也不抬："来，陪我下一盘。赢了，我送你一场造化。"',
    roomId: 'stone_kingdom_dark_market',
    dialogues: [
      {
        id: 'npc_430_dlg_0',
        topic: '自我介绍',
        text: '"棋魂，棋道少年。"他傲然道："年轻一代中，我自问不弱于任何人。"',
      },
      {
        id: 'npc_430_dlg_1',
        topic: '问修炼目标',
        text: '"我的目标？当然是成仙！"他目光灼灼："不成仙，终究是一场空。我要在这条路上走到最后，看看尽头的风景。"',
      },
      {
        id: 'npc_430_dlg_2',
        topic: '谈同代天骄',
        text: '"同代天骄如繁星，各有所长。"他沉吟道："叶凡、姬皓月、摇光圣子……每一个人都是劲敌，但也正因为有他们，这条路才不寂寞。"',
      },
      {
        id: 'npc_430_dlg_3',
        topic: '论大世之争',
        text: '"大世降临，万族争锋。"他握紧拳头："这是最好的时代，也是最坏的时代。要么崛起，要么陨落，没有第三条路。"',
      },
      {
        id: 'npc_430_dlg_4',
        topic: '请求切磋',
        text: '"想与我切磋？"他战意升腾："好！正合我意！让我看看你的实力！"',
      },
    ],
  },
  {
    id: 'npc_431',
    name: '虚空大帝',
    title: '虚空至尊',
    description: '姬家的先祖，远古时期证道的大帝。他以虚空之道证道，留下虚空古经，是姬家永恒的荣耀。',
    greeting: '虚空大帝的虚影浮现，虚空扭曲："后世之人，可悟虚空之道？"',
    roomId: 'stone_kingdom_zuiyuefang',
    dialogues: [
      {
        id: 'npc_431_dlg_0',
        topic: '自我介绍',
        text: '"虚空大帝，虚空至尊。"他威严地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'npc_431_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'npc_431_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'npc_431_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'npc_431_dlg_4',
        topic: '请求传承',
        text: '"想要我的传承？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格继承我的道统。"',
      },
    ],
  },
  {
    id: 'npc_432',
    name: '恒宇大帝',
    title: '恒宇至尊',
    description: '姜家的先祖，远古时期证道的大帝。他以恒宇之道证道，留下恒宇炉，是姜家永恒的荣耀。',
    greeting: '恒宇大帝的虚影浮现，火光冲天："后世之人，可承恒宇之志？"',
    roomId: 'stone_kingdom_cangchun',
    dialogues: [
      {
        id: 'npc_432_dlg_0',
        topic: '自我介绍',
        text: '"恒宇大帝，恒宇至尊。"他威严地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'npc_432_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'npc_432_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'npc_432_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'npc_432_dlg_4',
        topic: '请求传承',
        text: '"想要我的传承？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格继承我的道统。"',
      },
    ],
  },
  {
    id: 'npc_433',
    name: '乱古大帝',
    title: '乱古至尊',
    description: '远古时期证道的大帝，以乱古之道闻名。他的一生充满传奇，是乱古时代最强大的存在。',
    greeting: '乱古大帝的虚影浮现，乱流涌动："乱古时代，谁敢与我争锋？"',
    roomId: 'stone_kingdom_cangchun_pool',
    dialogues: [
      {
        id: 'npc_433_dlg_0',
        topic: '自我介绍',
        text: '"乱古大帝，乱古至尊。"他威严地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'npc_433_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'npc_433_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'npc_433_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'npc_433_dlg_4',
        topic: '请求传承',
        text: '"想要我的传承？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格继承我的道统。"',
      },
    ],
  },
  {
    id: 'npc_434',
    name: '无始大帝',
    title: '无始至尊',
    description: '远古时期证道的大帝，与狠人大帝齐名。他以无始之道证道，留下无始钟，是世间最强大的帝兵之一。',
    greeting: '无始大帝的虚影浮现，钟声悠扬："仙路尽头谁为峰，一见无始道成空。"',
    roomId: 'stone_kingdom_yicui',
    dialogues: [
      {
        id: 'npc_434_dlg_0',
        topic: '自我介绍',
        text: '"无始大帝，无始至尊。"他威严地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'npc_434_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'npc_434_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'npc_434_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'npc_434_dlg_4',
        topic: '请求传承',
        text: '"想要我的传承？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格继承我的道统。"',
      },
    ],
  },
  {
    id: 'npc_435',
    name: '狠人大帝',
    title: '狠道至尊',
    description: '远古时期证道的女性大帝，以狠辣之道闻名。她一生与天争命，只为在红尘中等待那一朵相似的花。',
    greeting: '狠人大帝的面具浮现，幽幽道："不为成仙，只为在红尘中等你归来。"',
    roomId: 'stone_kingdom_zuixian',
    dialogues: [
      {
        id: 'npc_435_dlg_0',
        topic: '自我介绍',
        text: '"狠人大帝，狠道至尊。"他威严地说道："我的存在，本身就是一种传说。"',
      },
      {
        id: 'npc_435_dlg_1',
        topic: '问远古传说',
        text: '"远古时代，大帝辈出，天庭辉煌。"他追忆道："那时的天地，法则完善，灵气浓郁，是真正的黄金时代。"',
      },
      {
        id: 'npc_435_dlg_2',
        topic: '谈成仙之路',
        text: '"成仙之路，艰难无比。"他沉声道："多少人杰倒在最后一步，多少大帝含恨而终。但我不信，我一定要找到那条路！"',
      },
      {
        id: 'npc_435_dlg_3',
        topic: '论当世大局',
        text: '"当世大局，暗流涌动。"他目光深邃："各大势力都在布局，等待成仙路开启的那一刻。届时，必将是一场血雨腥风。"',
      },
      {
        id: 'npc_435_dlg_4',
        topic: '请求传承',
        text: '"想要我的传承？"他沉吟片刻："可以，但你要证明你的价值。废物，没有资格继承我的道统。"',
      },
    ],
  },
  {
    id: 'npc_436',
    name: '金乌王',
    title: '太阳之王',
    description: '金乌一族的王者，周身太阳真火燃烧，可焚尽万物。他是妖族中最炽热的存在，连妖帝都要对他礼让三分。',
    greeting: '金乌王化身为太阳，炽热逼人："靠近我，你会化为灰烬。"',
    roomId: 'stone_kingdom_taohua',
    dialogues: [
      {
        id: 'npc_436_dlg_0',
        topic: '自我介绍',
        text: '"金乌王，太阳之王。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_436_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_436_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_436_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_436_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_437',
    name: '银月狼王',
    title: '月狼之王',
    description: '银月狼族的王者，每逢月圆之夜实力暴涨。他是妖族中最善于夜间狩猎的存在，连古族都对他忌惮三分。',
    greeting: '银月狼王对月长啸，银光闪闪："月圆之夜，是我的狩猎时间。"',
    roomId: 'stone_kingdom_fang_01',
    dialogues: [
      {
        id: 'npc_437_dlg_0',
        topic: '自我介绍',
        text: '"银月狼王，月狼之王。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_437_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_437_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_437_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_437_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_438',
    name: '黑蛟王',
    title: '黑水之蛟',
    description: '黑蛟一族的王者，本体是一条千年黑蛟，即将化龙。他镇守妖族黑水域多年，威名赫赫，是水中妖族的领袖。',
    greeting: '黑蛟王周身黑水翻涌，龙吟阵阵："黑水域重地，人族速退！"',
    roomId: 'stone_kingdom_fang_02',
    dialogues: [
      {
        id: 'npc_438_dlg_0',
        topic: '自我介绍',
        text: '"黑蛟王，黑水之蛟。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_438_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_438_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_438_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_438_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_439',
    name: '雪狐王',
    title: '雪域之狐',
    description: '雪狐一族的王者，通体雪白，美丽而危险。她精通幻术，可制造幻境迷惑敌人，是妖族中最难对付的存在之一。',
    greeting: '雪狐王九条尾巴轻轻摇曳，媚眼如丝："小兄弟，可愿陪我玩玩？"',
    roomId: 'stone_kingdom_fang_03',
    dialogues: [
      {
        id: 'npc_439_dlg_0',
        topic: '自我介绍',
        text: '"雪狐王，雪域之狐。"他傲然道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_439_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_439_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_439_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_439_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他温婉一笑："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_440',
    name: '铁背苍熊',
    title: '熊族勇士',
    description: '熊族中最勇猛的战士，背部如铁，刀枪不入。他性格憨厚，却对敌人毫不留情，是妖族中最可靠的战友。',
    greeting: '铁背苍熊拍了拍胸膛，憨笑道："想打架？来！俺让你三拳！"',
    roomId: 'stone_kingdom_bishui_yuan',
    dialogues: [
      {
        id: 'npc_440_dlg_0',
        topic: '自我介绍',
        text: '"铁背苍熊，熊族勇士。"他淡淡道："妖族强者如云，岂是尔等能小觑的。"',
      },
      {
        id: 'npc_440_dlg_1',
        topic: '问妖族传承',
        text: '"我妖族传承自远古，血脉中沉睡着无尽的力量。"他沉声道："只要唤醒血脉，便可获得毁天灭地的能力。"',
      },
      {
        id: 'npc_440_dlg_2',
        topic: '谈妖族荣耀',
        text: '"妖族曾在太古时代统治天地，那是何等的辉煌。"他追忆道："如今妖族式微，但我等必会重现昔日荣光。"',
      },
      {
        id: 'npc_440_dlg_3',
        topic: '论人妖之别',
        text: '"人族与妖族，皆是天地生灵，有何高低贵贱之分？"他冷声道："若人族再咄咄逼人，妖族必不惜一战！"',
      },
      {
        id: 'npc_440_dlg_4',
        topic: '请求赐教',
        text: '"想让我赐教？"他战意升腾："好！让我看看你有几分本事！"',
      },
    ],
  },
  {
    id: 'npc_441',
    name: '影族圣子',
    title: '影之传人',
    description: '影族的圣子，可隐匿于影子之中，杀人于无形。他是古族中最令人恐惧的刺客，连大帝都曾被他刺杀过。',
    greeting: '影族圣子从影子中浮现，阴森道："我已经在你身后了……"',
    roomId: 'stone_kingdom_fang_04',
    dialogues: [
      {
        id: 'npc_441_dlg_0',
        topic: '自我介绍',
        text: '"影族圣子，影之传人。"他傲然道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_441_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_441_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_441_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_441_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_442',
    name: '音族圣女',
    title: '音之传人',
    description: '音族的圣女，可操控声音之力。她的歌声可让人沉醉，也可杀人于无形，是古族中最危险的存在之一。',
    greeting: '音族圣女轻启朱唇，歌声悠扬："听，这是死亡的声音……"',
    roomId: 'stone_kingdom_yaotai',
    dialogues: [
      {
        id: 'npc_442_dlg_0',
        topic: '自我介绍',
        text: '"音族圣女，音之传人。"他冷冷道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_442_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_442_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_442_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_442_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_443',
    name: '力族圣子',
    title: '力之传人',
    description: '力族的圣子，力大无穷，可徒手撕裂虚空。他是古族中最强大的战士之一，一拳可崩碎山岳。',
    greeting: '力族圣子秀拳紧握，战意昂扬："来！让我看看你有没有资格与我交手！"',
    roomId: 'stone_kingdom_yaotai_food',
    dialogues: [
      {
        id: 'npc_443_dlg_0',
        topic: '自我介绍',
        text: '"力族圣子，力之传人。"他傲然道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_443_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_443_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_443_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_443_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_444',
    name: '速族圣女',
    title: '速之传人',
    description: '速族的圣女，速度无双，可超越光速。她是古族中最快的存在，连影子都追不上她。',
    greeting: '速族圣女的身影一闪而逝，声音从远处传来："你追不上我的，放弃吧。"',
    roomId: 'stone_kingdom_yaotai_discuss',
    dialogues: [
      {
        id: 'npc_444_dlg_0',
        topic: '自我介绍',
        text: '"速族圣女，速之传人。"他冷冷道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_444_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_444_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_444_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_444_dlg_4',
        topic: '请求和平',
        text: '"和平？"他冷笑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_445',
    name: '幻族圣子',
    title: '幻之传人',
    description: '幻族的圣子，可制造幻境，让人沉迷其中无法自拔。他是古族中最难对付的存在之一，连大圣都曾陷在他的幻境中。',
    greeting: '幻族圣子微微一笑，周围景象变幻："欢迎来到我的世界，这里的一切都由我掌控。"',
    roomId: 'stone_kingdom_yaotai_pool',
    dialogues: [
      {
        id: 'npc_445_dlg_0',
        topic: '自我介绍',
        text: '"幻族圣子，幻之传人。"他傲然道："古族底蕴，非你人族能想象。"',
      },
      {
        id: 'npc_445_dlg_1',
        topic: '问古族秘辛',
        text: '"古族的秘密，岂能轻易告知外人？"他冷笑："但可告诉你一点，古族的实力，远超你的想象。"',
      },
      {
        id: 'npc_445_dlg_2',
        topic: '谈古族觉醒',
        text: '"神源解封，古族觉醒，这是大势所趋。"他沉声道："人族的时代即将结束，古族将重新执掌这片天地。"',
      },
      {
        id: 'npc_445_dlg_3',
        topic: '论种族优劣',
        text: '"太古万族，各有神通。"他傲然道："人族不过是后起之秀，凭什么与我等古族平起平坐？"',
      },
      {
        id: 'npc_445_dlg_4',
        topic: '请求和平',
        text: '"和平？"他不屑："只有强者才配谈和平。弱者，只配臣服。"',
      },
    ],
  },
  {
    id: 'npc_446',
    name: '老茶倌',
    title: '茶馆老板',
    description: '一位开了几十年茶馆的老掌柜，泡茶手艺一绝。他的茶馆是城中消息最灵通的地方，三教九流皆汇聚于此。',
    greeting: '老茶倌提着茶壶，笑呵呵道："客官，来壶上好的龙井？"',
    roomId: 'stone_kingdom_culture_plaza',
    dialogues: [
      {
        id: 'npc_446_dlg_0',
        topic: '自我介绍',
        text: '"老茶倌，茶馆老板。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_446_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_446_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_446_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_446_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_447',
    name: '胖厨娘',
    title: '酒楼厨娘',
    description: '一位体态丰腴的厨娘，厨艺精湛，尤其擅长红烧肉。她做的红烧肉肥而不腻，入口即化，是酒楼的招牌菜。',
    greeting: '胖厨娘擦了擦手，热情道："客官，今儿个有新鲜的红烧肉，来一份？"',
    roomId: 'stone_kingdom_imperial_gate',
    dialogues: [
      {
        id: 'npc_447_dlg_0',
        topic: '自我介绍',
        text: '"胖厨娘，酒楼厨娘。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_447_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_447_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_447_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_447_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_448',
    name: '瘦马夫',
    title: '马车夫',
    description: '一位瘦削的马车夫，赶车技术一流。他常年在各大城市之间奔波，见多识广，是旅途中最可靠的伙伴。',
    greeting: '瘦马夫挥了挥马鞭，喊道："上车吧，保证又快又稳！"',
    roomId: 'stone_kingdom_imperial_city',
    dialogues: [
      {
        id: 'npc_448_dlg_0',
        topic: '自我介绍',
        text: '"瘦马夫，马车夫。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_448_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_448_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_448_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_448_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_449',
    name: '盲琴师',
    title: '琴师',
    description: '一位失明的琴师，琴艺却出神入化。他虽看不见，却能通过琴声感知世界，是世间最纯粹的琴师。',
    greeting: '盲琴师拨动琴弦，淡淡道："客官想听什么曲子？尽管点。"',
    roomId: 'stone_kingdom_jiaofangsi',
    dialogues: [
      {
        id: 'npc_449_dlg_0',
        topic: '自我介绍',
        text: '"盲琴师，琴师。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_449_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_449_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_449_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_449_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_450',
    name: '哑匠人',
    title: '木匠',
    description: '一位哑巴木匠，手艺精湛，却不能说话。他通过手势和图纸与人交流，打造出的家具精美绝伦。',
    greeting: '哑匠人比划着手势，指了指手中的木器，露出自豪的笑容。',
    roomId: 'stone_kingdom_feiyinge',
    dialogues: [
      {
        id: 'npc_450_dlg_0',
        topic: '自我介绍',
        text: '"哑匠人，木匠。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_450_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_450_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_450_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_450_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_451',
    name: '珠宝商人',
    title: '珠宝商',
    description: '一位专门贩卖珠宝首饰的商人，眼光毒辣，可一眼辨别珠宝的真假。他经手的珠宝价值连城，是富贵人家最喜欢的商人。',
    greeting: '珠宝商人打开锦盒，珠光宝气："来看看，这可是从南海运来的珍珠！"',
    roomId: 'stone_kingdom_feiyinge_2',
    dialogues: [
      {
        id: 'npc_451_dlg_0',
        topic: '自我介绍',
        text: '"珠宝商人，珠宝商。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_451_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_451_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_451_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_451_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_452',
    name: '药材商人',
    title: '药商',
    description: '一位专门贩卖珍稀药材的商人，走南闯北，收集了天下各种奇药。他的药材是修士们炼丹的必备之物，供不应求。',
    greeting: '药材商人打开药箱，药香四溢："千年人参、万年灵芝，应有尽有！"',
    roomId: 'stone_kingdom_feiyinge_3',
    dialogues: [
      {
        id: 'npc_452_dlg_0',
        topic: '自我介绍',
        text: '"药材商人，药商。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_452_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_452_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_452_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_452_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_453',
    name: '兵器商人',
    title: '兵商',
    description: '一位专门贩卖兵器法宝的商人，与各门各派都有往来。他的兵器虽非法宝，却也是精钢打造，锋利无比。',
    greeting: '兵器商人拔出一把长剑，寒光闪闪："好剑！削铁如泥，吹毛断发！"',
    roomId: 'stone_kingdom_baixipeng',
    dialogues: [
      {
        id: 'npc_453_dlg_0',
        topic: '自我介绍',
        text: '"兵器商人，兵商。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_453_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_453_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_453_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_453_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_454',
    name: '丝绸商人',
    title: '丝商',
    description: '一位专门贩卖丝绸的商人，走南闯北，将各地的丝绸汇聚一堂。他的丝绸质地柔软，色彩艳丽，是贵妇人们的最爱。',
    greeting: '丝绸商人展开一匹锦缎，光彩夺目："上好的江南丝绸，摸一摸，滑不滑？"',
    roomId: 'stone_kingdom_ministries',
    dialogues: [
      {
        id: 'npc_454_dlg_0',
        topic: '自我介绍',
        text: '"丝绸商人，丝商。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_454_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_454_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_454_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_454_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_455',
    name: '古董商人',
    title: '骨商',
    description: '一位专门贩卖古董的商人，眼光独到，可一眼辨别古董的年代和价值。他的古董店中珍品无数，是收藏家们的天堂。',
    greeting: '古董商人神秘兮兮地打开木盒："刚收来的远古玉器，要不要看看？"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: 'npc_455_dlg_0',
        topic: '自我介绍',
        text: '"古董商人，骨商。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_455_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_455_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_455_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_455_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_456',
    name: '散修甲',
    title: '流浪修士',
    description: '一位没有门派的散修，独自在世间流浪修行。他没有宗门的庇护，一切都要靠自己，是修仙界最底层的存在。',
    greeting: '散修甲警惕地看着你，手按剑柄："你是谁？想干什么？"',
    roomId: 'stone_kingdom_scripture',
    dialogues: [
      {
        id: 'npc_456_dlg_0',
        topic: '自我介绍',
        text: '"散修甲，流浪修士。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_456_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_456_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_456_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_456_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_457',
    name: '散修乙',
    title: '山野修士',
    description: '一位隐居在山野中的散修，不问世事，一心修炼。他在山中搭建了一座草庐，过着与世无争的生活。',
    greeting: '散修乙从草庐中走出，淡淡道："山野之人，不见外客。你有何事？"',
    roomId: 'stone_kingdom_technique',
    dialogues: [
      {
        id: 'npc_457_dlg_0',
        topic: '自我介绍',
        text: '"散修乙，山野修士。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_457_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_457_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_457_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_457_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_458',
    name: '散修丙',
    title: '江湖修士',
    description: '一位在江湖中行走的散修，精通各种杂学。他没有固定的居所，常年在江湖中漂泊，靠接各种任务为生。',
    greeting: '散修丙抱拳道："道友有礼了，可是在找帮手？"',
    roomId: 'stone_kingdom_prince_mansion',
    dialogues: [
      {
        id: 'npc_458_dlg_0',
        topic: '自我介绍',
        text: '"散修丙，江湖修士。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_458_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_458_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_458_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_458_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_459',
    name: '散修丁',
    title: '苦修之士',
    description: '一位以苦修闻名的散修，常年在恶劣的环境中修炼。他认为只有经历苦难，才能真正领悟大道，是散修中最坚韧的存在。',
    greeting: '散修丁满身伤痕，却目光坚定："苦难是修行，我已习惯了。"',
    roomId: 'stone_kingdom_palace_gate',
    dialogues: [
      {
        id: 'npc_459_dlg_0',
        topic: '自我介绍',
        text: '"散修丁，苦修之士。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_459_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_459_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_459_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_459_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_460',
    name: '散修戊',
    title: '逍遥散人',
    description: '一位逍遥自在的散修，不拘礼法，随心所欲。他认为修仙就是为了逍遥，不愿被任何规矩束缚，是散修中最洒脱的存在。',
    greeting: '散修戊大袖飘飘，笑道："逍遥天地间，何处不可去？"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: 'npc_460_dlg_0',
        topic: '自我介绍',
        text: '"散修戊，逍遥散人。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_460_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_460_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_460_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_460_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_461',
    name: '灵猫妖女',
    title: '猫妖',
    description: '一只修炼成精的灵猫，化身为美丽女子。她性格傲娇，喜欢捉弄人，却心地善良，是妖族中最可爱的存在。',
    greeting: '灵猫妖女舔了舔爪子，慵懒道："喵~你是谁？来陪我玩吗？"',
    roomId: 'stone_kingdom_throne',
    dialogues: [
      {
        id: 'npc_461_dlg_0',
        topic: '自我介绍',
        text: '"灵猫妖女，猫妖。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_461_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_461_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_461_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_461_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_462',
    name: '老树精',
    title: '树妖',
    description: '一棵修炼千年的老树成精，根茎遍布整片森林。他性格温和，是森林的守护者，对破坏森林者毫不留情。',
    greeting: '老树精的声音从树干中传来，低沉而慈祥："孩子，你为何来到这片森林？"',
    roomId: 'stone_kingdom_harem',
    dialogues: [
      {
        id: 'npc_462_dlg_0',
        topic: '自我介绍',
        text: '"老树精，树妖。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_462_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_462_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_462_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_462_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_463',
    name: '鲤鱼精',
    title: '鱼妖',
    description: '一条修炼百年的鲤鱼精，即将化龙。她居住在深潭之中，偶尔浮出水面透气，对人间充满好奇。',
    greeting: '鲤鱼精从水中探出头来，好奇地打量着你："你是人类？我听说人类很有趣。"',
    roomId: 'stone_kingdom_treasure',
    dialogues: [
      {
        id: 'npc_463_dlg_0',
        topic: '自我介绍',
        text: '"鲤鱼精，鱼妖。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_463_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_463_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_463_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_463_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_464',
    name: '黄鼠狼精',
    title: '黄仙',
    description: '一只修炼成精的黄鼠狼，擅长幻术和迷惑人心。他性格狡黠，喜欢恶作剧，却从不真正伤害人。',
    greeting: '黄鼠狼精眯着小眼睛，坏笑道："嘿嘿，让我给你变个戏法？"',
    roomId: 'stone_kingdom_flying_platform',
    dialogues: [
      {
        id: 'npc_464_dlg_0',
        topic: '自我介绍',
        text: '"黄鼠狼精，黄仙。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_464_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_464_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_464_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_464_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_465',
    name: '蜘蛛精',
    title: '蛛妖',
    description: '一只修炼成精的巨大蜘蛛，可吐出坚韧的蛛丝。她性格阴冷，独居在洞穴中，将闯入者困在蛛网中慢慢享用。',
    greeting: '蜘蛛精从黑暗中爬出，八只眼睛闪闪发光："又一个自投罗网的猎物……"',
    roomId: 'beidou_star_field',
    dialogues: [
      {
        id: 'npc_465_dlg_0',
        topic: '自我介绍',
        text: '"蜘蛛精，蛛妖。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_465_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_465_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_465_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_465_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_466',
    name: '火族圣子',
    title: '火之传人',
    description: '火族的圣子，可操控万火，焚尽万物。他是古族中最炽热的存在，周身火焰燃烧，连空气都被烤得扭曲。',
    greeting: '火族圣子周身火焰燃烧，傲然道："靠近我，你会化为灰烬。"',
    roomId: 'huanggu_forbidden',
    dialogues: [
      {
        id: 'npc_466_dlg_0',
        topic: '自我介绍',
        text: '"火族圣子，火之传人。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_466_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_466_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_466_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_466_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_467',
    name: '冰族圣女',
    title: '冰之传人',
    description: '冰族的圣女，可操控万冰，冻结万物。她是古族中最寒冷的存在，周身冰霜凝结，连火焰都会被冻结。',
    greeting: '冰族圣女周身冰霜凝结，冷声道："我的寒冷，可冻结你的灵魂。"',
    roomId: 'yuhua_school',
    dialogues: [
      {
        id: 'npc_467_dlg_0',
        topic: '自我介绍',
        text: '"冰族圣女，冰之传人。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_467_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_467_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_467_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_467_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_468',
    name: '雷族圣女',
    title: '雷之传人',
    description: '雷族的圣女，可操控万雷，劈碎万物。她是古族中最狂暴的存在，周身雷电缠绕，连天空都会变色。',
    greeting: '雷族圣女周身雷电缠绕，威严道："天雷滚滚，邪魔退散！"',
    roomId: 'beidou_city_gate',
    dialogues: [
      {
        id: 'npc_468_dlg_0',
        topic: '自我介绍',
        text: '"雷族圣女，雷之传人。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_468_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_468_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_468_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_468_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_469',
    name: '风族圣子',
    title: '风之传人',
    description: '风族的圣子，可操控狂风，撕裂万物。他是古族中最迅捷的存在，身形如风，来无影去无踪。',
    greeting: '风族圣子乘风而起，微笑道："风带我去哪里，我便去哪里。"',
    roomId: 'beidou_city_main_street',
    dialogues: [
      {
        id: 'npc_469_dlg_0',
        topic: '自我介绍',
        text: '"风族圣子，风之传人。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_469_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_469_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_469_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_469_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_470',
    name: '山族圣子',
    title: '山之传人',
    description: '山族的圣子，本体是一座远古山岭化形，力大无穷。他是古族中最坚固的存在，如大山一般不可动摇。',
    greeting: '山族圣子脚踏大地，沉稳道："大地是我的母亲，也是我的力量源泉。"',
    roomId: 'beidou_city_east_market',
    dialogues: [
      {
        id: 'npc_470_dlg_0',
        topic: '自我介绍',
        text: '"山族圣子，山之传人。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_470_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_470_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_470_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_470_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_471',
    name: '失忆老人',
    title: '遗忘者',
    description: '一位失去了所有记忆的老人，不知道自己是谁，来自哪里。他在世间游荡，寻找着关于自己的线索。',
    greeting: '失忆老人茫然四顾，喃喃道："我是谁……我为什么会在这里……"',
    roomId: 'beidou_city_west_market',
    dialogues: [
      {
        id: 'npc_471_dlg_0',
        topic: '自我介绍',
        text: '"失忆老人，遗忘者。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_471_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_471_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_471_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_471_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_472',
    name: '双面人',
    title: '双面间谍',
    description: '一位拥有两张面孔的怪人，一张善良，一张邪恶。他在正邪之间游走，无人知道他的真实立场。',
    greeting: '双面人转过另一张脸，冷笑道："你以为你了解我？你只看到了一半。"',
    roomId: 'beidou_imperial_city',
    dialogues: [
      {
        id: 'npc_472_dlg_0',
        topic: '自我介绍',
        text: '"双面人，双面间谍。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_472_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_472_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_472_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_472_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_473',
    name: '不老童子',
    title: '长生童子',
    description: '一位永远长不大的童子，却已经活了数千年。他看似天真无邪，实则知晓世间一切秘密，是最古老的存在之一。',
    greeting: '不老童子天真一笑，眼中却有沧桑："我已经活了很久……久到忘记了自己的年龄。"',
    roomId: 'beidou_imperial_palace',
    dialogues: [
      {
        id: 'npc_473_dlg_0',
        topic: '自我介绍',
        text: '"不老童子，长生童子。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_473_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_473_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_473_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_473_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_474',
    name: '幽灵船夫',
    title: '冥河船夫',
    description: '一位在冥河上摆渡的幽灵船夫，引渡亡魂前往冥界。他见过无数生死，对世间的一切都已麻木。',
    greeting: '幽灵船夫撑着骨篙，沙哑道："上船吧，过了这条河，就是冥界了。"',
    roomId: 'beidou_sky_pavilion',
    dialogues: [
      {
        id: 'npc_474_dlg_0',
        topic: '自我介绍',
        text: '"幽灵船夫，冥河船夫。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_474_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_474_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_474_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_474_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_475',
    name: '守塔人',
    title: '古塔守护者',
    description: '一位守护远古之塔的神秘人，世代守护塔中的秘密。他知晓塔中的一切，却从不对外人透露半分。',
    greeting: '守塔人挡在塔门前，面无表情："古塔重地，擅入者，永世囚禁。"',
    roomId: 'huanggu_core',
    dialogues: [
      {
        id: 'npc_475_dlg_0',
        topic: '自我介绍',
        text: '"守塔人，古塔守护者。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_475_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_475_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_475_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_475_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_476',
    name: '仙域宫女',
    title: '仙宫女侍',
    description: '仙域宫殿中的宫女，负责照顾仙人的起居。她虽地位卑微，却也能接触到仙域的仙气和仙法。',
    greeting: '仙域宫女盈盈一拜，轻声道："贵客有礼了，请随我来。"',
    roomId: 'huanggu_tomb',
    dialogues: [
      {
        id: 'npc_476_dlg_0',
        topic: '自我介绍',
        text: '"仙域宫女，仙宫女侍。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_476_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_476_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_476_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_476_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_477',
    name: '仙域侍卫',
    title: '仙宫守卫',
    description: '仙域宫殿中的侍卫，负责保护仙人的安全。他实力强大，在仙域中虽然只是侍卫，在下界却足以横扫一方。',
    greeting: '仙域侍卫甲胄在身，沉声道："仙宫重地，闲人免进！"',
    roomId: 'huanggu_lake',
    dialogues: [
      {
        id: 'npc_477_dlg_0',
        topic: '自我介绍',
        text: '"仙域侍卫，仙宫守卫。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_477_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_477_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_477_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_477_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_478',
    name: '仙域舞姬',
    title: '仙舞姬',
    description: '仙域中的舞姬，舞姿曼妙，可动天地。她的舞蹈不仅美观，还可引动仙气，提升观众的修为。',
    greeting: '仙域舞姬翩翩起舞，如仙子临凡："愿为君舞一曲，可好？"',
    roomId: 'xianyu_gate',
    dialogues: [
      {
        id: 'npc_478_dlg_0',
        topic: '自我介绍',
        text: '"仙域舞姬，仙舞姬。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_478_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_478_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_478_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_478_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_479',
    name: '仙域老仆',
    title: '仙家老仆',
    description: '仙域中某位仙人的老仆，跟随仙人多年，忠心耿耿。他虽只是仆人，却也沾染了仙气，寿命远超常人。',
    greeting: '仙域老仆颤巍巍地行礼，微笑道："老奴伺候仙人多年，见过不少贵客。"',
    roomId: 'xianyu_palace',
    dialogues: [
      {
        id: 'npc_479_dlg_0',
        topic: '自我介绍',
        text: '"仙域老仆，仙家老仆。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_479_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_479_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_479_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_479_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_480',
    name: '仙域仙童',
    title: '仙家童子',
    description: '仙域中某位仙人收养的童子，天真可爱，却也有着不俗的修为。他是仙域中最无忧无虑的存在。',
    greeting: '仙域仙童蹦蹦跳跳地跑过来，脆声道："你好呀！要尝尝我摘的仙果吗？"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: 'npc_480_dlg_0',
        topic: '自我介绍',
        text: '"仙域仙童，仙家童子。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_480_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_480_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_480_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_480_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_481',
    name: '禁区盗墓贼',
    title: '盗墓贼',
    description: '一位专门在禁区外围盗墓的贼人，胆大心细。他知晓许多古墓的位置，靠盗取墓中的宝物为生。',
    greeting: '禁区盗墓贼神秘兮兮地打开包裹："刚从禁区搞到的好货，要不要看看？"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: 'npc_481_dlg_0',
        topic: '自我介绍',
        text: '"禁区盗墓贼，盗墓贼。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_481_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_481_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_481_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_481_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_482',
    name: '禁区佣兵',
    title: '禁区佣兵',
    description: '一位以禁区探险为生的佣兵，实力强大，经验丰富。他可护送人进入禁区边缘，收取高额的报酬。',
    greeting: '禁区佣兵扛着大刀，沉声道："想去禁区？先付定金，死了不退。"',
    roomId: 'stone_kingdom_zhuque',
    dialogues: [
      {
        id: 'npc_482_dlg_0',
        topic: '自我介绍',
        text: '"禁区佣兵，禁区佣兵。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_482_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_482_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_482_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_482_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_483',
    name: '禁区学者',
    title: '禁区研究员',
    description: '一位专门研究禁区的学者，对禁区的历史、成因、危险了如指掌。他为了研究禁区，不惜以身犯险。',
    greeting: '禁区学者激动地翻着笔记："太棒了！又发现了禁区的新秘密！"',
    roomId: 'stone_kingdom_east_market',
    dialogues: [
      {
        id: 'npc_483_dlg_0',
        topic: '自我介绍',
        text: '"禁区学者，禁区研究员。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_483_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_483_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_483_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_483_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_484',
    name: '禁区导游',
    title: '禁区向导',
    description: '一位专门为人引路进入禁区边缘的导游，对禁区的路线了如指掌。他收费极高，却总能将人安全带进去再带出来。',
    greeting: '禁区导游点燃一根烟，淡淡道："想去禁区？先付定金，死了不退。"',
    roomId: 'stone_kingdom_west_market',
    dialogues: [
      {
        id: 'npc_484_dlg_0',
        topic: '自我介绍',
        text: '"禁区导游，禁区向导。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_484_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_484_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_484_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_484_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'npc_485',
    name: '禁区幸存者',
    title: '禁区生还者',
    description: '一位从禁区中侥幸逃出来的幸存者，精神已经崩溃。他口中不断念叨着禁区的恐怖，警告所有人不要靠近。',
    greeting: '禁区幸存者惊恐地环顾四周，颤抖道："它们……它们还在追我……不要……不要进去……"',
    roomId: 'stone_kingdom_huji_tavern',
    dialogues: [
      {
        id: 'npc_485_dlg_0',
        topic: '自我介绍',
        text: '"禁区幸存者，禁区生还者。"他淡淡地说道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'npc_485_dlg_1',
        topic: '问修行之道',
        text: '"我的修行之道，与众不同。"他解释道："草木可修道，僵尸可修道，鬼物亦可修道。大道万千，殊途同归。"',
      },
      {
        id: 'npc_485_dlg_2',
        topic: '谈生死轮回',
        text: '"生死轮回，是天道。"他沉声道："但我不服！凭什么草木僵尸就不能追求长生？我也要逆天而行！"',
      },
      {
        id: 'npc_485_dlg_3',
        topic: '论世间偏见',
        text: '"世人对我等异类多有偏见。"他叹息道："但我们也有情感，也有追求，也有梦想。请不要再歧视我们了。"',
      },
      {
        id: 'npc_485_dlg_4',
        topic: '请求帮助',
        text: '"帮我？"他微微一笑："你真的愿意帮我？太好了……我已经很久没有被善待过了。"',
      },
    ],
  },
  {
    id: 'lingshuo_xianren',
    name: '灵槎仙人',
    title: '星河渡者',
    description: '一位乘灵槎穿梭于星河之间的神秘仙人，据说他曾在银河源头钓起过星辰。他行踪不定，只在有缘人面前现身，传授星域之间的秘密通道。',
    greeting: '灵槎仙人手持竹篙，站在星光凝聚的小舟上微笑："要上船吗？这船可渡星河。"',
    roomId: 'beidou_star_field',
    dialogues: [
      {
        id: 'lingshuo_xianren_dlg_0',
        topic: '自我介绍',
        text: '"灵槎仙人，星河渡者。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'lingshuo_xianren_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'lingshuo_xianren_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'lingshuo_xianren_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'lingshuo_xianren_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'mingshi_guiren',
    name: '命师鬼人',
    title: '生死簿判官',
    description: '地府中一位特殊的判官，专断修士的生死命数。他手中握着一支以黄泉骨磨成的笔，可改写阳寿，却从不滥用。他说生死有命，但大道五十，天衍四九，人遁其一。',
    greeting: '命师鬼人翻开一本泛着幽光的簿册，抬头看你："让我看看……你的阳寿还剩多少？"',
    roomId: 'huanggu_forbidden',
    dialogues: [
      {
        id: 'mingshi_guiren_dlg_0',
        topic: '自我介绍',
        text: '"命师鬼人，生死簿判官。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'mingshi_guiren_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'mingshi_guiren_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'mingshi_guiren_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'mingshi_guiren_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'tiangou_shizhe',
    name: '天狗食者',
    title: '吞月凶灵',
    description: '远古天狗一族的最后血脉，拥有吞食日月星辰的恐怖能力。他并非邪恶，只是饥饿，饥饿了数万年。在月圆之夜，他的力量会暴涨到令大圣都退避三舍的地步。',
    greeting: '天狗食者仰天长啸，嘴角滴落星辉："月亮……好圆的月亮……我饿了……"',
    roomId: 'yuhua_school',
    dialogues: [
      {
        id: 'tiangou_shizhe_dlg_0',
        topic: '自我介绍',
        text: '"天狗食者，吞月凶灵。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'tiangou_shizhe_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'tiangou_shizhe_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'tiangou_shizhe_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'tiangou_shizhe_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'yinyang_shaozhu',
    name: '阴阳少主',
    title: '两仪传人',
    description: '一位身负阴阳两极体的绝世天骄，可同时修炼截然相反的两种功法。他的左眼如烈日，右眼如寒月，是年轻一代中最具传奇色彩的存在，据说与混沌体不相上下。',
    greeting: '阴阳少主左眼金芒右眼银辉，淡淡道："阴阳调和，天地至理。你可懂？"',
    roomId: 'beidou_city_gate',
    dialogues: [
      {
        id: 'yinyang_shaozhu_dlg_0',
        topic: '自我介绍',
        text: '"阴阳少主，两仪传人。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'yinyang_shaozhu_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'yinyang_shaozhu_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'yinyang_shaozhu_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'yinyang_shaozhu_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'longmai_shouhuzhe',
    name: '龙脉守护者',
    title: '地脉真龙',
    description: '一条与大地龙脉融为一体的远古地龙，已非纯粹的妖兽，而是大地意志的化身。他沉睡时如山岳，苏醒时如地震，守护着东荒最重要的几条龙脉不被破坏。',
    greeting: '大地微微震颤，龙脉守护者的声音从地底传来："勿惊扰大地，否则天翻地覆。"',
    roomId: 'beidou_city_main_street',
    dialogues: [
      {
        id: 'longmai_shouhuzhe_dlg_0',
        topic: '自我介绍',
        text: '"龙脉守护者，地脉真龙。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'longmai_shouhuzhe_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'longmai_shouhuzhe_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'longmai_shouhuzhe_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'longmai_shouhuzhe_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'cangqiong_shengshou',
    name: '苍穹圣手',
    title: '医道圣手',
    description: '一位以医入道的绝世高人，一双圣手可肉白骨、活死人。他不问来者的身份地位，只问病情。他说医者父母心，但若是恶人，他会救活后再亲手送其上路。',
    greeting: '苍穹圣手正在研磨一株紫金仙草，头也不抬："坐下，伸手，让我看看你的脉象。"',
    roomId: 'beidou_city_east_market',
    dialogues: [
      {
        id: 'cangqiong_shengshou_dlg_0',
        topic: '自我介绍',
        text: '"苍穹圣手，医道圣手。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'cangqiong_shengshou_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'cangqiong_shengshou_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'cangqiong_shengshou_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'cangqiong_shengshou_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'juechen_jianxian',
    name: '绝尘剑仙',
    title: '一剑绝尘',
    description: '一位隐居在绝壁之上的剑仙，百年未下过山。他的剑道已臻至"无剑"之境，万物皆可为剑，一念可化万千剑气。据说他曾是某个圣地的圣子，后因情伤归隐。',
    greeting: '绝尘剑仙立于绝壁之巅，背对苍生："你来求剑？还是求道？亦或是……求死？"',
    roomId: 'beidou_city_west_market',
    dialogues: [
      {
        id: 'juechen_jianxian_dlg_0',
        topic: '自我介绍',
        text: '"绝尘剑仙，一剑绝尘。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'juechen_jianxian_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'juechen_jianxian_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'juechen_jianxian_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'juechen_jianxian_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'hunyuan_daozhu',
    name: '混元道主',
    title: '混沌道统',
    description: '一位修炼混元大道的古老存在，体内自成一方小世界。他看似年轻，实则已活了数万年，见证了混沌体的辉煌与没落。他一直在寻找下一个混沌体，传承自己的道统。',
    greeting: '混元道主周身混沌气缭绕，如开天辟地前的景象："混沌未分，阴阳未定，你想从何处开始？"',
    roomId: 'beidou_imperial_city',
    dialogues: [
      {
        id: 'hunyuan_daozhu_dlg_0',
        topic: '自我介绍',
        text: '"混元道主，混沌道统。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'hunyuan_daozhu_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'hunyuan_daozhu_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'hunyuan_daozhu_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'hunyuan_daozhu_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'tiankong_zhizhu',
    name: '天工织女',
    title: '织天女神',
    description: '一位以星辰为丝、银河为梭的神奇女子，可织出遮蔽天机的锦缎。她为各大圣地织造护山大阵的阵图，每一幅都价值连城。她说织的是天，也是命。',
    greeting: '天工织女纤手翻飞，星辉在她指尖流转："想要一幅阵图？先告诉我，你要遮蔽什么天机？"',
    roomId: 'beidou_imperial_palace',
    dialogues: [
      {
        id: 'tiankong_zhizhu_dlg_0',
        topic: '自我介绍',
        text: '"天工织女，织天女神。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'tiankong_zhizhu_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'tiankong_zhizhu_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'tiankong_zhizhu_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'tiankong_zhizhu_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'huangquan_mengpo',
    name: '黄泉孟婆',
    title: '忘川之主',
    description: '忘川河畔煮汤的老妪，那汤可让人忘却前世今生。她已不记得自己是谁，只记得要为每一个过桥的人送上一碗汤。偶尔，她会对着河面发呆，仿佛在等一个不会来的人。',
    greeting: '黄泉孟婆舀起一碗汤，声音沙哑："喝了吧，喝了就忘了。忘了，就不苦了。"',
    roomId: 'beidou_sky_pavilion',
    dialogues: [
      {
        id: 'huangquan_mengpo_dlg_0',
        topic: '自我介绍',
        text: '"黄泉孟婆，忘川之主。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'huangquan_mengpo_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'huangquan_mengpo_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'huangquan_mengpo_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'huangquan_mengpo_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'xuanhuang_qizi',
    name: '玄黄棋子',
    title: '天地棋灵',
    description: '一盘天地大棋中诞生的棋灵，本体是一枚玄黄之气凝聚的棋子。他被困在棋盘中数万年，渴望有人能下完那盘未完的棋，让他获得自由。',
    greeting: '棋盘上浮现出一道虚幻的身影，玄黄棋子叹息道："来陪我下完这盘棋，好吗？"',
    roomId: 'huanggu_core',
    dialogues: [
      {
        id: 'xuanhuang_qizi_dlg_0',
        topic: '自我介绍',
        text: '"玄黄棋子，天地棋灵。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'xuanhuang_qizi_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'xuanhuang_qizi_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'xuanhuang_qizi_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'xuanhuang_qizi_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'bajian_laozhe',
    name: '拔剑老者',
    title: '拔剑术宗师',
    description: '一位专修拔剑之术的老者，一生只练拔剑这一个动作。他的拔剑之快，可在念头转动之前斩落敌人的头颅。他说天下剑术，唯快不破，而拔剑，是最快的剑。',
    greeting: '拔剑老者手按剑柄，目光如电："我的剑，只拔一次。一次，定生死。你想试试？"',
    roomId: 'huanggu_tomb',
    dialogues: [
      {
        id: 'bajian_laozhe_dlg_0',
        topic: '自我介绍',
        text: '"拔剑老者，拔剑术宗师。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'bajian_laozhe_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'bajian_laozhe_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'bajian_laozhe_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'bajian_laozhe_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'wuxing_tongzi',
    name: '五行童子',
    title: '五行灵体',
    description: '一位天生五行灵体的童子，可同时操控金木水火土五种元素。他看似年幼，实则心智成熟，因为五行之力的反噬让他无法长大。他在寻找五行合一的方法。',
    greeting: '五行童子周身五色光芒流转，稚声道："大哥哥，你知道五行合一的秘密吗？"',
    roomId: 'huanggu_lake',
    dialogues: [
      {
        id: 'wuxing_tongzi_dlg_0',
        topic: '自我介绍',
        text: '"五行童子，五行灵体。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'wuxing_tongzi_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'wuxing_tongzi_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'wuxing_tongzi_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'wuxing_tongzi_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'yinyue_mowang',
    name: '阴月魔王',
    title: '月蚀魔主',
    description: '一位在月蚀之夜诞生的魔王，可吸收月之阴华修炼。他并非纯粹的恶，只是阴月之力让他不得不与光明对立。他在寻找一位可与他共赏月色的人，不论敌友。',
    greeting: '阴月魔王立于月影之中，魔气与月华交织："月色真美，可惜……只能我一个人看。"',
    roomId: 'xianyu_gate',
    dialogues: [
      {
        id: 'yinyue_mowang_dlg_0',
        topic: '自我介绍',
        text: '"阴月魔王，月蚀魔主。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'yinyue_mowang_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'yinyue_mowang_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'yinyue_mowang_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'yinyue_mowang_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'taixu_shengren',
    name: '太虚圣人',
    title: '太虚之道',
    description: '一位修炼太虚之道的古圣，身体已化为虚无，只剩下一道意识存于世间。他说太虚非无，而是包容一切。他在等待一个能理解太虚真意的人，将自己的道统传下去。',
    greeting: '虚空中传来一声叹息，太虚圣人的声音缥缈："我己非我，你仍是你。来，聊聊太虚。"',
    roomId: 'xianyu_palace',
    dialogues: [
      {
        id: 'taixu_shengren_dlg_0',
        topic: '自我介绍',
        text: '"太虚圣人，太虚之道。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'taixu_shengren_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'taixu_shengren_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'taixu_shengren_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'taixu_shengren_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'fuhu_luohan',
    name: '伏虎罗汉',
    title: '降龙伏虎',
    description: '西漠佛教中的一位罗汉，以降服猛虎闻名。他的坐骑便是一只远古白虎，与他形影不离。他说佛法无边，可度化一切众生，包括最凶恶的猛兽。',
    greeting: '伏虎罗汉身骑白虎，手持金刚杵，声若洪钟："施主，我这虎可还温顺？"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: 'fuhu_luohan_dlg_0',
        topic: '自我介绍',
        text: '"伏虎罗汉，降龙伏虎。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'fuhu_luohan_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'fuhu_luohan_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'fuhu_luohan_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'fuhu_luohan_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: 'xinghe_yufu',
    name: '星河渔父',
    title: '星域渔夫',
    description: '一位在星河中垂钓的渔父，以星辰为鱼，以银河为塘。他钓的不是鱼，是因果。每一颗被他钓起的星辰，都代表一段因果的终结。他说星河如网，众生如鱼。',
    greeting: '星河渔父甩出星光凝聚的鱼线，淡淡道："今天运势如何？让我钓一钓你的因果。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: 'xinghe_yufu_dlg_0',
        topic: '自我介绍',
        text: '"星河渔父，星域渔夫。"他淡淡道："世间万物，皆有灵智，皆可修道。"',
      },
      {
        id: 'xinghe_yufu_dlg_1',
        topic: '问过往经历',
        text: '"往事如烟，不提也罢。"他叹息道："这一世，我见过太多天骄崛起又陨落，见过太多王朝兴盛又覆灭。"',
      },
      {
        id: 'xinghe_yufu_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"他缓缓道："多少人半途而废，多少人误入歧途。唯有心如磐石，方能走到最后。"',
      },
      {
        id: 'xinghe_yufu_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，变数无穷。"他浑浊的双眼望向远方："这一世，或许会有人成仙，也或许……所有人都会死去。"',
      },
      {
        id: 'xinghe_yufu_dlg_4',
        topic: '请求指点',
        text: '"指点？"他沉吟片刻："我这一把老骨头，能指点你什么？去吧，自己的路，要自己走。"',
      },
    ],
  },
  {
    id: '姬家剑侍_292',
    name: '姬家剑侍',
    title: '世家执事',
    description: '姬家剑侍，荒古世家一脉的传人，在荒古禁地有着不小的名声。',
    greeting: '姬家剑侍负手而立，周身散发着世家子弟的傲气："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '姬家剑侍_292_dlg_0',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '姬家剑侍_292_dlg_1',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '姬家剑侍_292_dlg_2',
        topic: '自我介绍',
        text: '"小老儿姬家剑侍，在这荒古禁地待了大半辈子了。"',
      },
      {
        id: '姬家剑侍_292_dlg_3',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '姬家剑侍_292_dlg_4',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '姬家护卫_293',
    name: '姬家护卫',
    title: '世家传人',
    description: '来自姬家的姬家护卫，在这石国一带也算是有头有脸的人物。',
    greeting: '姬家护卫手持古卷，若有所思："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '姬家护卫_293_dlg_0',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '姬家护卫_293_dlg_1',
        topic: '自我介绍',
        text: '"小老儿姬家护卫，在这石国待了大半辈子了。"',
      },
      {
        id: '姬家护卫_293_dlg_2',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
    ],
  },
  {
    id: '姜家弟子_294',
    name: '姜家弟子',
    title: '世家执事',
    description: '姜家弟子，世家中人，修行多年，颇有造诣。',
    greeting: '姜家弟子端坐在石椅上，眼神淡漠："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '姜家弟子_294_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '姜家弟子_294_dlg_1',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '姜家弟子_294_dlg_2',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
    ],
  },
  {
    id: '姜家侍女_295',
    name: '姜家侍女',
    title: '荒古血脉',
    description: '姜家的姜家侍女，虽非天骄，却也修有所成。',
    greeting: '姜家侍女正在闭目修炼，周身灵气缭绕："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '姜家侍女_295_dlg_0',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '姜家侍女_295_dlg_1',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '姜家侍女_295_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '姜家侍女_295_dlg_3',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '姜家侍女_295_dlg_4',
        topic: '自我介绍',
        text: '"我乃姜家，见过道友。"',
      },
    ],
  },
  {
    id: '姬家长老_296',
    name: '姬家长老',
    title: '世家执事',
    description: '姬家长老，姜家一脉的传人，在虚空圣地有着不小的名声。',
    greeting: '姬家长老正在闭目修炼，周身灵气缭绕："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '姬家长老_296_dlg_0',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '姬家长老_296_dlg_1',
        topic: '自我介绍',
        text: '"小老儿姬家长老，在这虚空圣地待了大半辈子了。"',
      },
      {
        id: '姬家长老_296_dlg_2',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
    ],
  },
  {
    id: '姜家长老_297',
    name: '姜家长老',
    title: '世家执事',
    description: '来自姬家的姜家长老，在这摇光圣地一带也算是有头有脸的人物。',
    greeting: '姜家长老漫步于庭院中，神色从容："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '姜家长老_297_dlg_0',
        topic: '自我介绍',
        text: '"小老儿姜家长老，在这摇光圣地待了大半辈子了。"',
      },
      {
        id: '姜家长老_297_dlg_1',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '姜家长老_297_dlg_2',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
    ],
  },
  {
    id: '姬家执事_298',
    name: '姬家执事',
    title: '荒古血脉',
    description: '姬家执事，姜家中人，修行多年，颇有造诣。',
    greeting: '姬家执事端坐在石椅上，眼神淡漠："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '姬家执事_298_dlg_0',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '姬家执事_298_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '姬家执事_298_dlg_2',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '姬家执事_298_dlg_3',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '姬家执事_298_dlg_4',
        topic: '自我介绍',
        text: '"我乃姜家，见过道友。"',
      },
    ],
  },
  {
    id: '姜家执事_299',
    name: '姜家执事',
    title: '世家执事',
    description: '姜家执事，荒古世家一脉的传人，在北斗圣地有着不小的名声。',
    greeting: '姜家执事手持古卷，若有所思："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '姜家执事_299_dlg_0',
        topic: '自我介绍',
        text: '"小老儿姜家执事，在这北斗圣地待了大半辈子了。"',
      },
      {
        id: '姜家执事_299_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '姜家执事_299_dlg_2',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '姜家执事_299_dlg_3',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '荒古世家传人_300',
    name: '荒古世家传人',
    title: '世家客卿',
    description: '来自姬家的荒古世家传人，在这紫府一带也算是有头有脸的人物。',
    greeting: '荒古世家传人正在闭目修炼，周身灵气缭绕："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '荒古世家传人_300_dlg_0',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '荒古世家传人_300_dlg_1',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '荒古世家传人_300_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '世家旁系子弟_301',
    name: '世家旁系子弟',
    title: '世家子弟',
    description: '世家旁系子弟，荒古世家中人，修行多年，颇有造诣。',
    greeting: '世家旁系子弟手持古卷，若有所思："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '世家旁系子弟_301_dlg_0',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '世家旁系子弟_301_dlg_1',
        topic: '自我介绍',
        text: '"我乃荒古世家，见过道友。"',
      },
      {
        id: '世家旁系子弟_301_dlg_2',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
    ],
  },
  {
    id: '姬家客卿_302',
    name: '姬家客卿',
    title: '世家传人',
    description: '世家出身的姬家客卿，在紫府小有名气。',
    greeting: '姬家客卿正在闭目修炼，周身灵气缭绕："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '姬家客卿_302_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '姬家客卿_302_dlg_1',
        topic: '自我介绍',
        text: '"在下姬家客卿，见过阁下。"',
      },
      {
        id: '姬家客卿_302_dlg_2',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '姬家客卿_302_dlg_3',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '姬家客卿_302_dlg_4',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
    ],
  },
  {
    id: '姜家客卿_303',
    name: '姜家客卿',
    title: '世家传人',
    description: '姜家出身的姜家客卿，在紫府小有名气。',
    greeting: '姜家客卿端坐在石椅上，眼神淡漠："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '姜家客卿_303_dlg_0',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '姜家客卿_303_dlg_1',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '姜家客卿_303_dlg_2',
        topic: '自我介绍',
        text: '"贫道姜家客卿，修行数十载，却仍是凡胎。"',
      },
      {
        id: '姜家客卿_303_dlg_3',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '姜家客卿_303_dlg_4',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
    ],
  },
  {
    id: '世家炼器师_304',
    name: '世家炼器师',
    title: '荒古血脉',
    description: '世家的世家炼器师，虽非天骄，却也修有所成。',
    greeting: '世家炼器师漫步于庭院中，神色从容："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '世家炼器师_304_dlg_0',
        topic: '自我介绍',
        text: '"我乃世家，见过道友。"',
      },
      {
        id: '世家炼器师_304_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '世家炼器师_304_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '世家炼器师_304_dlg_3',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '世家炼器师_304_dlg_4',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
    ],
  },
  {
    id: '世家炼丹师_305',
    name: '世家炼丹师',
    title: '世家执事',
    description: '姬家出身的世家炼丹师，在北斗圣地小有名气。',
    greeting: '世家炼丹师端坐在石椅上，眼神淡漠："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '世家炼丹师_305_dlg_0',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '世家炼丹师_305_dlg_1',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '世家炼丹师_305_dlg_2',
        topic: '自我介绍',
        text: '"我乃姬家，见过道友。"',
      },
      {
        id: '世家炼丹师_305_dlg_3',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '世家炼丹师_305_dlg_4',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
    ],
  },
  {
    id: '世家阵法师_306',
    name: '世家阵法师',
    title: '荒古血脉',
    description: '世家的世家阵法师，虽非天骄，却也修有所成。',
    greeting: '世家阵法师负手而立，周身散发着世家子弟的傲气："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '世家阵法师_306_dlg_0',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '世家阵法师_306_dlg_1',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '世家阵法师_306_dlg_2',
        topic: '自我介绍',
        text: '"贫道世家阵法师，修行数十载，却仍是凡胎。"',
      },
    ],
  },
  {
    id: '世家护卫统领_307',
    name: '世家护卫统领',
    title: '世家子弟',
    description: '世家护卫统领，姜家中人，修行多年，颇有造诣。',
    greeting: '世家护卫统领端坐在石椅上，眼神淡漠："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '世家护卫统领_307_dlg_0',
        topic: '自我介绍',
        text: '"在下世家护卫统领，不过是一介散修罢了。"',
      },
      {
        id: '世家护卫统领_307_dlg_1',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '世家护卫统领_307_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '世家护卫统领_307_dlg_3',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '世家护卫统领_307_dlg_4',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '世家管家_308',
    name: '世家管家',
    title: '荒古血脉',
    description: '世家管家，姜家中人，修行多年，颇有造诣。',
    greeting: '世家管家负手而立，周身散发着世家子弟的傲气："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '世家管家_308_dlg_0',
        topic: '自我介绍',
        text: '"我乃姜家，见过道友。"',
      },
      {
        id: '世家管家_308_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '世家管家_308_dlg_2',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
    ],
  },
  {
    id: '世家侍从_309',
    name: '世家侍从',
    title: '世家执事',
    description: '世家侍从，姬家中人，修行多年，颇有造诣。',
    greeting: '世家侍从端坐在石椅上，眼神淡漠："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '世家侍从_309_dlg_0',
        topic: '自我介绍',
        text: '"我乃姬家，见过道友。"',
      },
      {
        id: '世家侍从_309_dlg_1',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '世家侍从_309_dlg_2',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '世家侍从_309_dlg_3',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '世家侍从_309_dlg_4',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '世家记名弟子_310',
    name: '世家记名弟子',
    title: '世家执事',
    description: '世家记名弟子，姜家一脉的传人，在古族有着不小的名声。',
    greeting: '世家记名弟子手持古卷，若有所思："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '世家记名弟子_310_dlg_0',
        topic: '自我介绍',
        text: '"在下世家记名弟子，见过阁下。"',
      },
      {
        id: '世家记名弟子_310_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '世家记名弟子_310_dlg_2',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '世家记名弟子_310_dlg_3',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '世家记名弟子_310_dlg_4',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
    ],
  },
  {
    id: '世家外门弟子_311',
    name: '世家外门弟子',
    title: '世家客卿',
    description: '世家外门弟子，荒古世家一脉的传人，在石城有着不小的名声。',
    greeting: '世家外门弟子端坐在石椅上，眼神淡漠："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '世家外门弟子_311_dlg_0',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '世家外门弟子_311_dlg_1',
        topic: '自我介绍',
        text: '"在下世家外门弟子，不过是一介散修罢了。"',
      },
      {
        id: '世家外门弟子_311_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '世家外门弟子_311_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
    ],
  },
  {
    id: '姬家剑侍_312',
    name: '姬家剑侍',
    title: '世家客卿',
    description: '荒古世家出身的姬家剑侍，在北斗圣地小有名气。',
    greeting: '姬家剑侍正在闭目修炼，周身灵气缭绕："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '姬家剑侍_312_dlg_0',
        topic: '自我介绍',
        text: '"我乃荒古世家，见过道友。"',
      },
      {
        id: '姬家剑侍_312_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '姬家剑侍_312_dlg_2',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '姬家剑侍_312_dlg_3',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '姬家剑侍_312_dlg_4',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
    ],
  },
  {
    id: '姬家护卫_313',
    name: '姬家护卫',
    title: '世家传人',
    description: '姬家护卫，姜家中人，修行多年，颇有造诣。',
    greeting: '姬家护卫正在闭目修炼，周身灵气缭绕："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '姬家护卫_313_dlg_0',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '姬家护卫_313_dlg_1',
        topic: '自我介绍',
        text: '"贫道姬家护卫，修行数十载，却仍是凡胎。"',
      },
      {
        id: '姬家护卫_313_dlg_2',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '姬家护卫_313_dlg_3',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '姬家护卫_313_dlg_4',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
    ],
  },
  {
    id: '姜家弟子_314',
    name: '姜家弟子',
    title: '荒古血脉',
    description: '姬家出身的姜家弟子，在紫府小有名气。',
    greeting: '姜家弟子手持古卷，若有所思："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '姜家弟子_314_dlg_0',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '姜家弟子_314_dlg_1',
        topic: '自我介绍',
        text: '"我乃姬家，见过道友。"',
      },
      {
        id: '姜家弟子_314_dlg_2',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '姜家弟子_314_dlg_3',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
    ],
  },
  {
    id: '姜家侍女_315',
    name: '姜家侍女',
    title: '世家子弟',
    description: '姬家出身的姜家侍女，在虚空圣地小有名气。',
    greeting: '姜家侍女负手而立，周身散发着世家子弟的傲气："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '姜家侍女_315_dlg_0',
        topic: '自我介绍',
        text: '"贫道姜家侍女，修行数十载，却仍是凡胎。"',
      },
      {
        id: '姜家侍女_315_dlg_1',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '姜家侍女_315_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '姜家侍女_315_dlg_3',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
    ],
  },
  {
    id: '姬家长老_316',
    name: '姬家长老',
    title: '世家子弟',
    description: '姬家长老，姬家一脉的传人，在石城有着不小的名声。',
    greeting: '姬家长老端坐在石椅上，眼神淡漠："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '姬家长老_316_dlg_0',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '姬家长老_316_dlg_1',
        topic: '自我介绍',
        text: '"小老儿姬家长老，在这石城待了大半辈子了。"',
      },
      {
        id: '姬家长老_316_dlg_2',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '姬家长老_316_dlg_3',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '姬家长老_316_dlg_4',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
    ],
  },
  {
    id: '姜家长老_317',
    name: '姜家长老',
    title: '荒古血脉',
    description: '世家出身的姜家长老，在源石城小有名气。',
    greeting: '姜家长老端坐在石椅上，眼神淡漠："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '姜家长老_317_dlg_0',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '姜家长老_317_dlg_1',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '姜家长老_317_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '姜家长老_317_dlg_3',
        topic: '自我介绍',
        text: '"在下姜家长老，不过是一介散修罢了。"',
      },
    ],
  },
  {
    id: '姬家执事_318',
    name: '姬家执事',
    title: '荒古血脉',
    description: '姬家执事，荒古世家一脉的传人，在源石城有着不小的名声。',
    greeting: '姬家执事手持古卷，若有所思："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '姬家执事_318_dlg_0',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '姬家执事_318_dlg_1',
        topic: '自我介绍',
        text: '"小老儿姬家执事，在这源石城待了大半辈子了。"',
      },
      {
        id: '姬家执事_318_dlg_2',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '姬家执事_318_dlg_3',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '姜家执事_319',
    name: '姜家执事',
    title: '世家客卿',
    description: '姜家执事，荒古世家中人，修行多年，颇有造诣。',
    greeting: '姜家执事漫步于庭院中，神色从容："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '姜家执事_319_dlg_0',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '姜家执事_319_dlg_1',
        topic: '自我介绍',
        text: '"我乃荒古世家，见过道友。"',
      },
      {
        id: '姜家执事_319_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
    ],
  },
  {
    id: '荒古世家传人_320',
    name: '荒古世家传人',
    title: '世家客卿',
    description: '姜家出身的荒古世家传人，在阴阳圣地小有名气。',
    greeting: '荒古世家传人漫步于庭院中，神色从容："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '荒古世家传人_320_dlg_0',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '荒古世家传人_320_dlg_1',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '荒古世家传人_320_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '荒古世家传人_320_dlg_3',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
    ],
  },
  {
    id: '世家旁系子弟_321',
    name: '世家旁系子弟',
    title: '世家客卿',
    description: '世家旁系子弟，世家一脉的传人，在石城有着不小的名声。',
    greeting: '世家旁系子弟手持古卷，若有所思："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '世家旁系子弟_321_dlg_0',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '世家旁系子弟_321_dlg_1',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '世家旁系子弟_321_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
    ],
  },
  {
    id: '圣地炼丹师_322',
    name: '圣地炼丹师',
    title: '圣地执事',
    description: '圣地炼丹师，北斗圣地中人，修行多年，颇有造诣。',
    greeting: '圣地炼丹师正在整理圣地典籍："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣地炼丹师_322_dlg_0',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '圣地炼丹师_322_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '圣地炼丹师_322_dlg_2',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '圣地炼丹师_322_dlg_3',
        topic: '自我介绍',
        text: '"我乃北斗圣地，见过道友。"',
      },
      {
        id: '圣地炼丹师_322_dlg_4',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '圣地阵法师_323',
    name: '圣地阵法师',
    title: '圣地隐士',
    description: '圣地阵法师，北斗圣地中人，修行多年，颇有造诣。',
    greeting: '圣地阵法师正在整理圣地典籍："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣地阵法师_323_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '圣地阵法师_323_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '圣地阵法师_323_dlg_2',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '圣地阵法师_323_dlg_3',
        topic: '自我介绍',
        text: '"我乃北斗圣地，见过道友。"',
      },
    ],
  },
  {
    id: '圣地巡查使_324',
    name: '圣地巡查使',
    title: '圣地执事',
    description: '紫府圣地的圣地巡查使，虽非天骄，却也修有所成。',
    greeting: '圣地巡查使端坐于蒲团之上，正在悟道："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣地巡查使_324_dlg_0',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '圣地巡查使_324_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '圣地巡查使_324_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '圣地巡查使_324_dlg_3',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '圣地巡查使_324_dlg_4',
        topic: '自我介绍',
        text: '"在下圣地巡查使，见过阁下。"',
      },
    ],
  },
  {
    id: '圣地接引使_325',
    name: '圣地接引使',
    title: '圣地长老',
    description: '瑶池圣地出身的圣地接引使，在摇光圣地小有名气。',
    greeting: '圣地接引使手持玉简，眉头微皱："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '圣地接引使_325_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '圣地接引使_325_dlg_1',
        topic: '自我介绍',
        text: '"我乃瑶池圣地，见过道友。"',
      },
      {
        id: '圣地接引使_325_dlg_2',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '圣地接引使_325_dlg_3',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '圣地接引使_325_dlg_4',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
    ],
  },
  {
    id: '圣地考核官_326',
    name: '圣地考核官',
    title: '圣地执事',
    description: '圣地考核官，紫府圣地一脉的传人，在紫府有着不小的名声。',
    greeting: '圣地考核官正在整理圣地典籍："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '圣地考核官_326_dlg_0',
        topic: '自我介绍',
        text: '"在下圣地考核官，不过是一介散修罢了。"',
      },
      {
        id: '圣地考核官_326_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '圣地考核官_326_dlg_2',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '圣地考核官_326_dlg_3',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
    ],
  },
  {
    id: '圣地药园管事_327',
    name: '圣地药园管事',
    title: '圣地长老',
    description: '阴阳圣地的圣地药园管事，虽非天骄，却也修有所成。',
    greeting: '圣地药园管事手持玉简，眉头微皱："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣地药园管事_327_dlg_0',
        topic: '自我介绍',
        text: '"我乃阴阳圣地，见过道友。"',
      },
      {
        id: '圣地药园管事_327_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '圣地药园管事_327_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
    ],
  },
  {
    id: '圣地器阁管事_328',
    name: '圣地器阁管事',
    title: '圣地弟子',
    description: '北斗圣地的圣地器阁管事，虽非天骄，却也修有所成。',
    greeting: '圣地器阁管事手持玉简，眉头微皱："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣地器阁管事_328_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '圣地器阁管事_328_dlg_1',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '圣地器阁管事_328_dlg_2',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '圣地器阁管事_328_dlg_3',
        topic: '自我介绍',
        text: '"在下圣地器阁管事，不过是一介散修罢了。"',
      },
      {
        id: '圣地器阁管事_328_dlg_4',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
    ],
  },
  {
    id: '圣地藏书阁守卫_329',
    name: '圣地藏书阁守卫',
    title: '圣地隐士',
    description: '来自虚圣地的圣地藏书阁守卫，在这荒古禁地一带也算是有头有脸的人物。',
    greeting: '圣地藏书阁守卫周身灵光流转，圣地气息尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣地藏书阁守卫_329_dlg_0',
        topic: '自我介绍',
        text: '"贫道圣地藏书阁守卫，修行数十载，却仍是凡胎。"',
      },
      {
        id: '圣地藏书阁守卫_329_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '圣地藏书阁守卫_329_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '圣地外门弟子_330',
    name: '圣地外门弟子',
    title: '圣地长老',
    description: '阴阳圣地出身的圣地外门弟子，在天骄擂台小有名气。',
    greeting: '圣地外门弟子手持玉简，眉头微皱："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '圣地外门弟子_330_dlg_0',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '圣地外门弟子_330_dlg_1',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '圣地外门弟子_330_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '圣地外门弟子_330_dlg_3',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '圣地外门弟子_330_dlg_4',
        topic: '自我介绍',
        text: '"在下圣地外门弟子，不过是一介散修罢了。"',
      },
    ],
  },
  {
    id: '圣地记名弟子_331',
    name: '圣地记名弟子',
    title: '圣地弟子',
    description: '圣地记名弟子，北斗圣地一脉的传人，在古族有着不小的名声。',
    greeting: '圣地记名弟子周身灵光流转，圣地气息尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣地记名弟子_331_dlg_0',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '圣地记名弟子_331_dlg_1',
        topic: '自我介绍',
        text: '"在下圣地记名弟子，不过是一介散修罢了。"',
      },
      {
        id: '圣地记名弟子_331_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '圣地记名弟子_331_dlg_3',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '圣地记名弟子_331_dlg_4',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
    ],
  },
  {
    id: '摇光圣地弟子_332',
    name: '摇光圣地弟子',
    title: '圣地传人',
    description: '虚圣地出身的摇光圣地弟子，在摇光圣地小有名气。',
    greeting: '摇光圣地弟子负手而立，圣地威严尽显："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '摇光圣地弟子_332_dlg_0',
        topic: '自我介绍',
        text: '"小老儿摇光圣地弟子，在这摇光圣地待了大半辈子了。"',
      },
      {
        id: '摇光圣地弟子_332_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '摇光圣地弟子_332_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '摇光圣地弟子_332_dlg_3',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '摇光圣地弟子_332_dlg_4',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '瑶池圣地仙子_333',
    name: '瑶池圣地仙子',
    title: '圣地传人',
    description: '来自摇光圣地的瑶池圣地仙子，在这万妖谷一带也算是有头有脸的人物。',
    greeting: '瑶池圣地仙子正在整理圣地典籍："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '瑶池圣地仙子_333_dlg_0',
        topic: '自我介绍',
        text: '"贫道瑶池圣地仙子，修行数十载，却仍是凡胎。"',
      },
      {
        id: '瑶池圣地仙子_333_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '瑶池圣地仙子_333_dlg_2',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '紫府圣地传人_334',
    name: '紫府圣地传人',
    title: '圣地弟子',
    description: '紫府圣地传人，阴阳圣地中人，修行多年，颇有造诣。',
    greeting: '紫府圣地传人正在整理圣地典籍："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '紫府圣地传人_334_dlg_0',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '紫府圣地传人_334_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '紫府圣地传人_334_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '紫府圣地传人_334_dlg_3',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '紫府圣地传人_334_dlg_4',
        topic: '自我介绍',
        text: '"在下紫府圣地传人，见过阁下。"',
      },
    ],
  },
  {
    id: '虚圣地隐士_335',
    name: '虚圣地隐士',
    title: '圣地执事',
    description: '紫府圣地的虚圣地隐士，虽非天骄，却也修有所成。',
    greeting: '虚圣地隐士端坐于蒲团之上，正在悟道："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '虚圣地隐士_335_dlg_0',
        topic: '自我介绍',
        text: '"小老儿虚圣地隐士，在这阴阳圣地待了大半辈子了。"',
      },
      {
        id: '虚圣地隐士_335_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '虚圣地隐士_335_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '虚圣地隐士_335_dlg_3',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
    ],
  },
  {
    id: '阴阳圣地修士_336',
    name: '阴阳圣地修士',
    title: '圣地执事',
    description: '来自虚圣地的阴阳圣地修士，在这万妖谷一带也算是有头有脸的人物。',
    greeting: '阴阳圣地修士负手而立，圣地威严尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '阴阳圣地修士_336_dlg_0',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '阴阳圣地修士_336_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '阴阳圣地修士_336_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '阴阳圣地修士_336_dlg_3',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
    ],
  },
  {
    id: '北斗圣地长老_337',
    name: '北斗圣地长老',
    title: '圣地执事',
    description: '来自虚圣地的北斗圣地长老，在这万妖谷一带也算是有头有脸的人物。',
    greeting: '北斗圣地长老端坐于蒲团之上，正在悟道："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '北斗圣地长老_337_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '北斗圣地长老_337_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '北斗圣地长老_337_dlg_2',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '圣地守护者_338',
    name: '圣地守护者',
    title: '圣地传人',
    description: '阴阳圣地的圣地守护者，虽非天骄，却也修有所成。',
    greeting: '圣地守护者周身灵光流转，圣地气息尽显："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '圣地守护者_338_dlg_0',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '圣地守护者_338_dlg_1',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '圣地守护者_338_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '圣地守护者_338_dlg_3',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '圣地守护者_338_dlg_4',
        topic: '自我介绍',
        text: '"在下圣地守护者，不过是一介散修罢了。"',
      },
    ],
  },
  {
    id: '圣地执事_339',
    name: '圣地执事',
    title: '圣地弟子',
    description: '圣地执事，阴阳圣地中人，修行多年，颇有造诣。',
    greeting: '圣地执事负手而立，圣地威严尽显："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '圣地执事_339_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '圣地执事_339_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '圣地执事_339_dlg_2',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '圣地执事_339_dlg_3',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
    ],
  },
  {
    id: '圣地客卿_340',
    name: '圣地客卿',
    title: '圣地传人',
    description: '圣地客卿，紫府圣地一脉的传人，在阴阳圣地有着不小的名声。',
    greeting: '圣地客卿手持玉简，眉头微皱："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '圣地客卿_340_dlg_0',
        topic: '自我介绍',
        text: '"在下圣地客卿，不过是一介散修罢了。"',
      },
      {
        id: '圣地客卿_340_dlg_1',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '圣地客卿_340_dlg_2',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '圣地客卿_340_dlg_3',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
    ],
  },
  {
    id: '圣地炼器师_341',
    name: '圣地炼器师',
    title: '圣地隐士',
    description: '摇光圣地的圣地炼器师，虽非天骄，却也修有所成。',
    greeting: '圣地炼器师周身灵光流转，圣地气息尽显："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '圣地炼器师_341_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '圣地炼器师_341_dlg_1',
        topic: '自我介绍',
        text: '"在下圣地炼器师，见过阁下。"',
      },
      {
        id: '圣地炼器师_341_dlg_2',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '圣地炼器师_341_dlg_3',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
    ],
  },
  {
    id: '圣地炼丹师_342',
    name: '圣地炼丹师',
    title: '圣地传人',
    description: '圣地炼丹师，北斗圣地中人，修行多年，颇有造诣。',
    greeting: '圣地炼丹师端坐于蒲团之上，正在悟道："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣地炼丹师_342_dlg_0',
        topic: '自我介绍',
        text: '"在下圣地炼丹师，不过是一介散修罢了。"',
      },
      {
        id: '圣地炼丹师_342_dlg_1',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '圣地炼丹师_342_dlg_2',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
    ],
  },
  {
    id: '圣地阵法师_343',
    name: '圣地阵法师',
    title: '圣地长老',
    description: '北斗圣地出身的圣地阵法师，在石城小有名气。',
    greeting: '圣地阵法师正在整理圣地典籍："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '圣地阵法师_343_dlg_0',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '圣地阵法师_343_dlg_1',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '圣地阵法师_343_dlg_2',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '圣地阵法师_343_dlg_3',
        topic: '自我介绍',
        text: '"在下圣地阵法师，不过是一介散修罢了。"',
      },
    ],
  },
  {
    id: '圣地巡查使_344',
    name: '圣地巡查使',
    title: '圣地弟子',
    description: '阴阳圣地的圣地巡查使，虽非天骄，却也修有所成。',
    greeting: '圣地巡查使端坐于蒲团之上，正在悟道："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣地巡查使_344_dlg_0',
        topic: '自我介绍',
        text: '"我乃阴阳圣地，见过道友。"',
      },
      {
        id: '圣地巡查使_344_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '圣地巡查使_344_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
    ],
  },
  {
    id: '圣地接引使_345',
    name: '圣地接引使',
    title: '圣地传人',
    description: '圣地接引使，紫府圣地一脉的传人，在石国有着不小的名声。',
    greeting: '圣地接引使负手而立，圣地威严尽显："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '圣地接引使_345_dlg_0',
        topic: '自我介绍',
        text: '"我乃紫府圣地，见过道友。"',
      },
      {
        id: '圣地接引使_345_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '圣地接引使_345_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '圣地接引使_345_dlg_3',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
    ],
  },
  {
    id: '圣地考核官_346',
    name: '圣地考核官',
    title: '圣地长老',
    description: '摇光圣地出身的圣地考核官，在摇光圣地小有名气。',
    greeting: '圣地考核官手持玉简，眉头微皱："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣地考核官_346_dlg_0',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '圣地考核官_346_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '圣地考核官_346_dlg_2',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '圣地药园管事_347',
    name: '圣地药园管事',
    title: '圣地长老',
    description: '圣地药园管事，紫府圣地一脉的传人，在天骄擂台有着不小的名声。',
    greeting: '圣地药园管事端坐于蒲团之上，正在悟道："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '圣地药园管事_347_dlg_0',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '圣地药园管事_347_dlg_1',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '圣地药园管事_347_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '圣地药园管事_347_dlg_3',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '圣地药园管事_347_dlg_4',
        topic: '自我介绍',
        text: '"在下圣地药园管事，见过阁下。"',
      },
    ],
  },
  {
    id: '圣地器阁管事_348',
    name: '圣地器阁管事',
    title: '圣地传人',
    description: '圣地器阁管事，瑶池圣地中人，修行多年，颇有造诣。',
    greeting: '圣地器阁管事正在整理圣地典籍："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '圣地器阁管事_348_dlg_0',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '圣地器阁管事_348_dlg_1',
        topic: '自我介绍',
        text: '"贫道圣地器阁管事，修行数十载，却仍是凡胎。"',
      },
      {
        id: '圣地器阁管事_348_dlg_2',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '圣地器阁管事_348_dlg_3',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
    ],
  },
  {
    id: '圣地藏书阁守卫_349',
    name: '圣地藏书阁守卫',
    title: '圣地执事',
    description: '来自北斗圣地的圣地藏书阁守卫，在这石城一带也算是有头有脸的人物。',
    greeting: '圣地藏书阁守卫周身灵光流转，圣地气息尽显："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '圣地藏书阁守卫_349_dlg_0',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '圣地藏书阁守卫_349_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '圣地藏书阁守卫_349_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '圣地藏书阁守卫_349_dlg_3',
        topic: '自我介绍',
        text: '"贫道圣地藏书阁守卫，修行数十载，却仍是凡胎。"',
      },
    ],
  },
  {
    id: '圣地外门弟子_350',
    name: '圣地外门弟子',
    title: '圣地隐士',
    description: '圣地外门弟子，阴阳圣地中人，修行多年，颇有造诣。',
    greeting: '圣地外门弟子手持玉简，眉头微皱："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '圣地外门弟子_350_dlg_0',
        topic: '自我介绍',
        text: '"在下圣地外门弟子，见过阁下。"',
      },
      {
        id: '圣地外门弟子_350_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '圣地外门弟子_350_dlg_2',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '圣地外门弟子_350_dlg_3',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '圣地记名弟子_351',
    name: '圣地记名弟子',
    title: '圣地长老',
    description: '来自阴阳圣地的圣地记名弟子，在这源石城一带也算是有头有脸的人物。',
    greeting: '圣地记名弟子周身灵光流转，圣地气息尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣地记名弟子_351_dlg_0',
        topic: '自我介绍',
        text: '"在下圣地记名弟子，不过是一介散修罢了。"',
      },
      {
        id: '圣地记名弟子_351_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '圣地记名弟子_351_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '圣地记名弟子_351_dlg_3',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '圣地记名弟子_351_dlg_4',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '摇光圣地弟子_352',
    name: '摇光圣地弟子',
    title: '圣地长老',
    description: '摇光圣地弟子，阴阳圣地中人，修行多年，颇有造诣。',
    greeting: '摇光圣地弟子正在整理圣地典籍："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '摇光圣地弟子_352_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '摇光圣地弟子_352_dlg_1',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '摇光圣地弟子_352_dlg_2',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
    ],
  },
  {
    id: '瑶池圣地仙子_353',
    name: '瑶池圣地仙子',
    title: '圣地弟子',
    description: '瑶池圣地仙子，北斗圣地中人，修行多年，颇有造诣。',
    greeting: '瑶池圣地仙子负手而立，圣地威严尽显："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '瑶池圣地仙子_353_dlg_0',
        topic: '自我介绍',
        text: '"我乃北斗圣地，见过道友。"',
      },
      {
        id: '瑶池圣地仙子_353_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '瑶池圣地仙子_353_dlg_2',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '瑶池圣地仙子_353_dlg_3',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '瑶池圣地仙子_353_dlg_4',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '紫府圣地传人_354',
    name: '紫府圣地传人',
    title: '圣地隐士',
    description: '虚圣地出身的紫府圣地传人，在摇光圣地小有名气。',
    greeting: '紫府圣地传人手持玉简，眉头微皱："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '紫府圣地传人_354_dlg_0',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '紫府圣地传人_354_dlg_1',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '紫府圣地传人_354_dlg_2',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
    ],
  },
  {
    id: '虚圣地隐士_355',
    name: '虚圣地隐士',
    title: '圣地长老',
    description: '瑶池圣地出身的虚圣地隐士，在瑶池小有名气。',
    greeting: '虚圣地隐士端坐于蒲团之上，正在悟道："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '虚圣地隐士_355_dlg_0',
        topic: '自我介绍',
        text: '"在下虚圣地隐士，不过是一介散修罢了。"',
      },
      {
        id: '虚圣地隐士_355_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '虚圣地隐士_355_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '虚圣地隐士_355_dlg_3',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '阴阳圣地修士_356',
    name: '阴阳圣地修士',
    title: '圣地传人',
    description: '摇光圣地出身的阴阳圣地修士，在石城小有名气。',
    greeting: '阴阳圣地修士正在整理圣地典籍："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '阴阳圣地修士_356_dlg_0',
        topic: '自我介绍',
        text: '"我乃摇光圣地，见过道友。"',
      },
      {
        id: '阴阳圣地修士_356_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '阴阳圣地修士_356_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '阴阳圣地修士_356_dlg_3',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '万妖谷弟子_357',
    name: '万妖谷弟子',
    title: '妖族天骄',
    description: '妖族的万妖谷弟子，虽非天骄，却也修有所成。',
    greeting: '万妖谷弟子端坐于云端，妖气冲天："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '万妖谷弟子_357_dlg_0',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '万妖谷弟子_357_dlg_1',
        topic: '自我介绍',
        text: '"在下万妖谷弟子，见过阁下。"',
      },
      {
        id: '万妖谷弟子_357_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
    ],
  },
  {
    id: '青妖一族_358',
    name: '青妖一族',
    title: '妖皇',
    description: '青妖一族，天妖一族中人，修行多年，颇有造诣。',
    greeting: '青妖一族负手而立，妖族威压隐隐："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '青妖一族_358_dlg_0',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '青妖一族_358_dlg_1',
        topic: '自我介绍',
        text: '"小老儿青妖一族，在这荒古禁地待了大半辈子了。"',
      },
      {
        id: '青妖一族_358_dlg_2',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '天妖一族_359',
    name: '天妖一族',
    title: '妖族天骄',
    description: '龙族出身的天妖一族，在荒古禁地小有名气。',
    greeting: '天妖一族化为人形，却带着几分妖异之气："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '天妖一族_359_dlg_0',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '天妖一族_359_dlg_1',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '天妖一族_359_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '天妖一族_359_dlg_3',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '天妖一族_359_dlg_4',
        topic: '自我介绍',
        text: '"我乃龙族，见过道友。"',
      },
    ],
  },
  {
    id: '龙族旁系_360',
    name: '龙族旁系',
    title: '妖族长老',
    description: '天妖一族出身的龙族旁系，在紫府小有名气。',
    greeting: '龙族旁系负手而立，妖族威压隐隐："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '龙族旁系_360_dlg_0',
        topic: '自我介绍',
        text: '"小老儿龙族旁系，在这紫府待了大半辈子了。"',
      },
      {
        id: '龙族旁系_360_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '龙族旁系_360_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
    ],
  },
  {
    id: '凤族后裔_361',
    name: '凤族后裔',
    title: '妖族天骄',
    description: '凤族后裔，万妖谷中人，修行多年，颇有造诣。',
    greeting: '凤族后裔端坐于云端，妖气冲天："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '凤族后裔_361_dlg_0',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '凤族后裔_361_dlg_1',
        topic: '自我介绍',
        text: '"在下凤族后裔，不过是一介散修罢了。"',
      },
      {
        id: '凤族后裔_361_dlg_2',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
    ],
  },
  {
    id: '妖族商人_362',
    name: '妖族商人',
    title: '妖族长老',
    description: '妖族商人，万妖谷中人，修行多年，颇有造诣。',
    greeting: '妖族商人负手而立，妖族威压隐隐："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '妖族商人_362_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '妖族商人_362_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '妖族商人_362_dlg_2',
        topic: '自我介绍',
        text: '"在下妖族商人，见过阁下。"',
      },
    ],
  },
  {
    id: '妖族隐士_363',
    name: '妖族隐士',
    title: '妖族长老',
    description: '来自天妖一族的妖族隐士，在这紫府一带也算是有头有脸的人物。',
    greeting: '妖族隐士化为人形，却带着几分妖异之气："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '妖族隐士_363_dlg_0',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '妖族隐士_363_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '妖族隐士_363_dlg_2',
        topic: '自我介绍',
        text: '"在下妖族隐士，不过是一介散修罢了。"',
      },
      {
        id: '妖族隐士_363_dlg_3',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '妖族隐士_363_dlg_4',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
    ],
  },
  {
    id: '妖族化形者_364',
    name: '妖族化形者',
    title: '妖皇',
    description: '万妖谷的妖族化形者，虽非天骄，却也修有所成。',
    greeting: '妖族化形者端坐于云端，妖气冲天："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '妖族化形者_364_dlg_0',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '妖族化形者_364_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '妖族化形者_364_dlg_2',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '妖族化形者_364_dlg_3',
        topic: '自我介绍',
        text: '"小老儿妖族化形者，在这源石城待了大半辈子了。"',
      },
    ],
  },
  {
    id: '妖族幼崽守护_365',
    name: '妖族幼崽守护',
    title: '天妖',
    description: '妖族幼崽守护，妖族中人，修行多年，颇有造诣。',
    greeting: '妖族幼崽守护端坐于云端，妖气冲天："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '妖族幼崽守护_365_dlg_0',
        topic: '自我介绍',
        text: '"我乃妖族，见过道友。"',
      },
      {
        id: '妖族幼崽守护_365_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '妖族幼崽守护_365_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '妖族幼崽守护_365_dlg_3',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '妖族幼崽守护_365_dlg_4',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
    ],
  },
  {
    id: '妖族血脉传承者_366',
    name: '妖族血脉传承者',
    title: '妖皇',
    description: '妖族血脉传承者，龙族中人，修行多年，颇有造诣。',
    greeting: '妖族血脉传承者端坐于云端，妖气冲天："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '妖族血脉传承者_366_dlg_0',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '妖族血脉传承者_366_dlg_1',
        topic: '自我介绍',
        text: '"在下妖族血脉传承者，见过阁下。"',
      },
      {
        id: '妖族血脉传承者_366_dlg_2',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
    ],
  },
  {
    id: '妖族圣地守护_367',
    name: '妖族圣地守护',
    title: '妖族长老',
    description: '来自万妖谷的妖族圣地守护，在这源石城一带也算是有头有脸的人物。',
    greeting: '妖族圣地守护端坐于云端，妖气冲天："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '妖族圣地守护_367_dlg_0',
        topic: '自我介绍',
        text: '"在下妖族圣地守护，不过是一介散修罢了。"',
      },
      {
        id: '妖族圣地守护_367_dlg_1',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '妖族圣地守护_367_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
    ],
  },
  {
    id: '妖族老祖化身_368',
    name: '妖族老祖化身',
    title: '大妖',
    description: '青妖一族出身的妖族老祖化身，在荒古禁地小有名气。',
    greeting: '妖族老祖化身负手而立，妖族威压隐隐："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '妖族老祖化身_368_dlg_0',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '妖族老祖化身_368_dlg_1',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '妖族老祖化身_368_dlg_2',
        topic: '自我介绍',
        text: '"贫道妖族老祖化身，修行数十载，却仍是凡胎。"',
      },
      {
        id: '妖族老祖化身_368_dlg_3',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '妖族渡劫者_369',
    name: '妖族渡劫者',
    title: '大妖',
    description: '凤族的妖族渡劫者，虽非天骄，却也修有所成。',
    greeting: '妖族渡劫者周身妖气缭绕，双目闪烁着兽性光芒："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '妖族渡劫者_369_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '妖族渡劫者_369_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '妖族渡劫者_369_dlg_2',
        topic: '自我介绍',
        text: '"小老儿妖族渡劫者，在这紫府待了大半辈子了。"',
      },
    ],
  },
  {
    id: '妖族炼体士_370',
    name: '妖族炼体士',
    title: '妖族长老',
    description: '来自万妖谷的妖族炼体士，在这瑶池一带也算是有头有脸的人物。',
    greeting: '妖族炼体士化为人形，却带着几分妖异之气："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '妖族炼体士_370_dlg_0',
        topic: '自我介绍',
        text: '"我乃万妖谷，见过道友。"',
      },
      {
        id: '妖族炼体士_370_dlg_1',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '妖族炼体士_370_dlg_2',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
    ],
  },
  {
    id: '妖族血脉觉醒者_371',
    name: '妖族血脉觉醒者',
    title: '天妖',
    description: '妖族血脉觉醒者，凤族中人，修行多年，颇有造诣。',
    greeting: '妖族血脉觉醒者周身妖气缭绕，双目闪烁着兽性光芒："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '妖族血脉觉醒者_371_dlg_0',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '妖族血脉觉醒者_371_dlg_1',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '妖族血脉觉醒者_371_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '妖族血脉觉醒者_371_dlg_3',
        topic: '自我介绍',
        text: '"小老儿妖族血脉觉醒者，在这石国待了大半辈子了。"',
      },
      {
        id: '妖族血脉觉醒者_371_dlg_4',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
    ],
  },
  {
    id: '大妖化身_372',
    name: '大妖化身',
    title: '妖族长老',
    description: '大妖化身，凤族一脉的传人，在荒古禁地有着不小的名声。',
    greeting: '大妖化身周身妖气缭绕，双目闪烁着兽性光芒："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '大妖化身_372_dlg_0',
        topic: '自我介绍',
        text: '"小老儿大妖化身，在这荒古禁地待了大半辈子了。"',
      },
      {
        id: '大妖化身_372_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '大妖化身_372_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '大妖化身_372_dlg_3',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '大妖化身_372_dlg_4',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
    ],
  },
  {
    id: '妖族皇者_373',
    name: '妖族皇者',
    title: '妖族天骄',
    description: '来自天妖一族的妖族皇者，在这荒古禁地一带也算是有头有脸的人物。',
    greeting: '妖族皇者端坐于云端，妖气冲天："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '妖族皇者_373_dlg_0',
        topic: '自我介绍',
        text: '"贫道妖族皇者，修行数十载，却仍是凡胎。"',
      },
      {
        id: '妖族皇者_373_dlg_1',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '妖族皇者_373_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '妖族皇者_373_dlg_3',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '妖族天骄_374',
    name: '妖族天骄',
    title: '妖族天骄',
    description: '妖族天骄，青妖一族一脉的传人，在石城有着不小的名声。',
    greeting: '妖族天骄正在吞吐日月精华，妖族本性尽显："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '妖族天骄_374_dlg_0',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '妖族天骄_374_dlg_1',
        topic: '自我介绍',
        text: '"小老儿妖族天骄，在这石城待了大半辈子了。"',
      },
      {
        id: '妖族天骄_374_dlg_2',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '妖族天骄_374_dlg_3',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '妖族天骄_374_dlg_4',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
    ],
  },
  {
    id: '妖族长老_375',
    name: '妖族长老',
    title: '大妖',
    description: '妖族出身的妖族长老，在源石城小有名气。',
    greeting: '妖族长老正在吞吐日月精华，妖族本性尽显："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '妖族长老_375_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '妖族长老_375_dlg_1',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '妖族长老_375_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '妖族长老_375_dlg_3',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
    ],
  },
  {
    id: '妖族守护_376',
    name: '妖族守护',
    title: '妖族天骄',
    description: '万妖谷的妖族守护，虽非天骄，却也修有所成。',
    greeting: '妖族守护端坐于云端，妖气冲天："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '妖族守护_376_dlg_0',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '妖族守护_376_dlg_1',
        topic: '自我介绍',
        text: '"贫道妖族守护，修行数十载，却仍是凡胎。"',
      },
      {
        id: '妖族守护_376_dlg_2',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '妖族守护_376_dlg_3',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '万妖谷弟子_377',
    name: '万妖谷弟子',
    title: '天妖',
    description: '万妖谷弟子，凤族中人，修行多年，颇有造诣。',
    greeting: '万妖谷弟子端坐于云端，妖气冲天："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '万妖谷弟子_377_dlg_0',
        topic: '自我介绍',
        text: '"贫道万妖谷弟子，修行数十载，却仍是凡胎。"',
      },
      {
        id: '万妖谷弟子_377_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '万妖谷弟子_377_dlg_2',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '万妖谷弟子_377_dlg_3',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
    ],
  },
  {
    id: '青妖一族_378',
    name: '青妖一族',
    title: '妖族天骄',
    description: '青妖一族，天妖一族一脉的传人，在荒古禁地有着不小的名声。',
    greeting: '青妖一族端坐于云端，妖气冲天："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '青妖一族_378_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '青妖一族_378_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '青妖一族_378_dlg_2',
        topic: '自我介绍',
        text: '"在下青妖一族，见过阁下。"',
      },
      {
        id: '青妖一族_378_dlg_3',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '天妖一族_379',
    name: '天妖一族',
    title: '妖皇',
    description: '天妖一族，天妖一族一脉的传人，在天骄擂台有着不小的名声。',
    greeting: '天妖一族化为人形，却带着几分妖异之气："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '天妖一族_379_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '天妖一族_379_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '天妖一族_379_dlg_2',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
    ],
  },
  {
    id: '龙族旁系_380',
    name: '龙族旁系',
    title: '妖族天骄',
    description: '天妖一族的龙族旁系，虽非天骄，却也修有所成。',
    greeting: '龙族旁系正在吞吐日月精华，妖族本性尽显："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '龙族旁系_380_dlg_0',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '龙族旁系_380_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '龙族旁系_380_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
    ],
  },
  {
    id: '凤族后裔_381',
    name: '凤族后裔',
    title: '天妖',
    description: '青妖一族出身的凤族后裔，在紫府小有名气。',
    greeting: '凤族后裔化为人形，却带着几分妖异之气："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '凤族后裔_381_dlg_0',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '凤族后裔_381_dlg_1',
        topic: '自我介绍',
        text: '"贫道凤族后裔，修行数十载，却仍是凡胎。"',
      },
      {
        id: '凤族后裔_381_dlg_2',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '凤族后裔_381_dlg_3',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
    ],
  },
  {
    id: '妖族商人_382',
    name: '妖族商人',
    title: '天妖',
    description: '妖族商人，妖族一脉的传人，在瑶池有着不小的名声。',
    greeting: '妖族商人负手而立，妖族威压隐隐："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '妖族商人_382_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '妖族商人_382_dlg_1',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '妖族商人_382_dlg_2',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
    ],
  },
  {
    id: '妖族隐士_383',
    name: '妖族隐士',
    title: '妖皇',
    description: '天妖一族出身的妖族隐士，在北斗圣地小有名气。',
    greeting: '妖族隐士负手而立，妖族威压隐隐："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '妖族隐士_383_dlg_0',
        topic: '自我介绍',
        text: '"在下妖族隐士，见过阁下。"',
      },
      {
        id: '妖族隐士_383_dlg_1',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '妖族隐士_383_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '妖族隐士_383_dlg_3',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
    ],
  },
  {
    id: '妖族化形者_384',
    name: '妖族化形者',
    title: '妖族长老',
    description: '妖族化形者，天妖一族中人，修行多年，颇有造诣。',
    greeting: '妖族化形者端坐于云端，妖气冲天："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '妖族化形者_384_dlg_0',
        topic: '自我介绍',
        text: '"在下妖族化形者，见过阁下。"',
      },
      {
        id: '妖族化形者_384_dlg_1',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '妖族化形者_384_dlg_2',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '妖族化形者_384_dlg_3',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '妖族化形者_384_dlg_4',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '妖族幼崽守护_385',
    name: '妖族幼崽守护',
    title: '妖族天骄',
    description: '妖族出身的妖族幼崽守护，在虚空圣地小有名气。',
    greeting: '妖族幼崽守护负手而立，妖族威压隐隐："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '妖族幼崽守护_385_dlg_0',
        topic: '自我介绍',
        text: '"贫道妖族幼崽守护，修行数十载，却仍是凡胎。"',
      },
      {
        id: '妖族幼崽守护_385_dlg_1',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '妖族幼崽守护_385_dlg_2',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '妖族幼崽守护_385_dlg_3',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
    ],
  },
  {
    id: '妖族血脉传承者_386',
    name: '妖族血脉传承者',
    title: '大妖',
    description: '妖族血脉传承者，万妖谷一脉的传人，在虚空圣地有着不小的名声。',
    greeting: '妖族血脉传承者负手而立，妖族威压隐隐："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '妖族血脉传承者_386_dlg_0',
        topic: '自我介绍',
        text: '"贫道妖族血脉传承者，修行数十载，却仍是凡胎。"',
      },
      {
        id: '妖族血脉传承者_386_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '妖族血脉传承者_386_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '古族圣地守护_387',
    name: '古族圣地守护',
    title: '古族长老',
    description: '古族圣地守护，神族血脉中人，修行多年，颇有造诣。',
    greeting: '古族圣地守护负手而立，古族威严尽显："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '古族圣地守护_387_dlg_0',
        topic: '自我介绍',
        text: '"在下古族圣地守护，见过阁下。"',
      },
      {
        id: '古族圣地守护_387_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '古族圣地守护_387_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
    ],
  },
  {
    id: '古族炼器师_388',
    name: '古族炼器师',
    title: '古族天骄',
    description: '古族炼器师，太古王族一脉的传人，在古族有着不小的名声。',
    greeting: '古族炼器师正在吐纳天地精华，古族传承隐隐："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '古族炼器师_388_dlg_0',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '古族炼器师_388_dlg_1',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '古族炼器师_388_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '古族炼器师_388_dlg_3',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
    ],
  },
  {
    id: '古族炼丹师_389',
    name: '古族炼丹师',
    title: '古族血脉',
    description: '古族炼丹师，神族血脉中人，修行多年，颇有造诣。',
    greeting: '古族炼丹师正在吐纳天地精华，古族传承隐隐："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '古族炼丹师_389_dlg_0',
        topic: '自我介绍',
        text: '"在下古族炼丹师，不过是一介散修罢了。"',
      },
      {
        id: '古族炼丹师_389_dlg_1',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '古族炼丹师_389_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
    ],
  },
  {
    id: '古族阵法师_390',
    name: '古族阵法师',
    title: '古族天骄',
    description: '远古世家的古族阵法师，虽非天骄，却也修有所成。',
    greeting: '古族阵法师正在吐纳天地精华，古族传承隐隐："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '古族阵法师_390_dlg_0',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '古族阵法师_390_dlg_1',
        topic: '自我介绍',
        text: '"小老儿古族阵法师，在这紫府待了大半辈子了。"',
      },
      {
        id: '古族阵法师_390_dlg_2',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '古族阵法师_390_dlg_3',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '古族阵法师_390_dlg_4',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
    ],
  },
  {
    id: '古族血脉守护_391',
    name: '古族血脉守护',
    title: '古族长老',
    description: '来自古族的古族血脉守护，在这荒古禁地一带也算是有头有脸的人物。',
    greeting: '古族血脉守护正在吐纳天地精华，古族传承隐隐："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '古族血脉守护_391_dlg_0',
        topic: '自我介绍',
        text: '"在下古族血脉守护，不过是一介散修罢了。"',
      },
      {
        id: '古族血脉守护_391_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '古族血脉守护_391_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '古族血脉守护_391_dlg_3',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
    ],
  },
  {
    id: '古族血脉者_392',
    name: '古族血脉者',
    title: '古族血脉',
    description: '古族出身的古族血脉者，在万妖谷小有名气。',
    greeting: '古族血脉者目光深邃，古族智慧在其中流转："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '古族血脉者_392_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '古族血脉者_392_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '古族血脉者_392_dlg_2',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
    ],
  },
  {
    id: '古族旁系_393',
    name: '古族旁系',
    title: '古族隐士',
    description: '古皇血脉出身的古族旁系，在源石城小有名气。',
    greeting: '古族旁系端坐于古殿之中，古老的血脉气息弥漫："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '古族旁系_393_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '古族旁系_393_dlg_1',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '古族旁系_393_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '古族旁系_393_dlg_3',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '古族旁系_393_dlg_4',
        topic: '自我介绍',
        text: '"我乃古皇血脉，见过道友。"',
      },
    ],
  },
  {
    id: '古族仆从_394',
    name: '古族仆从',
    title: '古族隐士',
    description: '来自古族的古族仆从，在这古族一带也算是有头有脸的人物。',
    greeting: '古族仆从周身古族血脉气息流转，隐隐有帝影浮现："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '古族仆从_394_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '古族仆从_394_dlg_1',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '古族仆从_394_dlg_2',
        topic: '自我介绍',
        text: '"我乃古族，见过道友。"',
      },
    ],
  },
  {
    id: '古族守护_395',
    name: '古族守护',
    title: '古族长老',
    description: '神族血脉出身的古族守护，在阴阳圣地小有名气。',
    greeting: '古族守护负手而立，古族威严尽显："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '古族守护_395_dlg_0',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '古族守护_395_dlg_1',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '古族守护_395_dlg_2',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '古族守护_395_dlg_3',
        topic: '自我介绍',
        text: '"在下古族守护，不过是一介散修罢了。"',
      },
    ],
  },
  {
    id: '古族天骄_396',
    name: '古族天骄',
    title: '古族隐士',
    description: '远古世家的古族天骄，虽非天骄，却也修有所成。',
    greeting: '古族天骄正在吐纳天地精华，古族传承隐隐："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '古族天骄_396_dlg_0',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '古族天骄_396_dlg_1',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '古族天骄_396_dlg_2',
        topic: '自我介绍',
        text: '"在下古族天骄，见过阁下。"',
      },
      {
        id: '古族天骄_396_dlg_3',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '古族天骄_396_dlg_4',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '古族隐士_397',
    name: '古族隐士',
    title: '古族天骄',
    description: '太古王族的古族隐士，虽非天骄，却也修有所成。',
    greeting: '古族隐士负手而立，古族威严尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '古族隐士_397_dlg_0',
        topic: '自我介绍',
        text: '"贫道古族隐士，修行数十载，却仍是凡胎。"',
      },
      {
        id: '古族隐士_397_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '古族隐士_397_dlg_2',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '古族隐士_397_dlg_3',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
    ],
  },
  {
    id: '古族长老_398',
    name: '古族长老',
    title: '古族传人',
    description: '古族长老，古族中人，修行多年，颇有造诣。',
    greeting: '古族长老目光深邃，古族智慧在其中流转："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '古族长老_398_dlg_0',
        topic: '自我介绍',
        text: '"小老儿古族长老，在这摇光圣地待了大半辈子了。"',
      },
      {
        id: '古族长老_398_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '古族长老_398_dlg_2',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
    ],
  },
  {
    id: '古族执事_399',
    name: '古族执事',
    title: '古族血脉',
    description: '神族血脉的古族执事，虽非天骄，却也修有所成。',
    greeting: '古族执事正在吐纳天地精华，古族传承隐隐："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '古族执事_399_dlg_0',
        topic: '自我介绍',
        text: '"贫道古族执事，修行数十载，却仍是凡胎。"',
      },
      {
        id: '古族执事_399_dlg_1',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '古族执事_399_dlg_2',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '古族执事_399_dlg_3',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
    ],
  },
  {
    id: '古族客卿_400',
    name: '古族客卿',
    title: '古族传人',
    description: '古族的古族客卿，虽非天骄，却也修有所成。',
    greeting: '古族客卿负手而立，古族威严尽显："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '古族客卿_400_dlg_0',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '古族客卿_400_dlg_1',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '古族客卿_400_dlg_2',
        topic: '自我介绍',
        text: '"贫道古族客卿，修行数十载，却仍是凡胎。"',
      },
      {
        id: '古族客卿_400_dlg_3',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
    ],
  },
  {
    id: '古族记名弟子_401',
    name: '古族记名弟子',
    title: '古族传人',
    description: '远古世家出身的古族记名弟子，在万妖谷小有名气。',
    greeting: '古族记名弟子正在吐纳天地精华，古族传承隐隐："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '古族记名弟子_401_dlg_0',
        topic: '自我介绍',
        text: '"贫道古族记名弟子，修行数十载，却仍是凡胎。"',
      },
      {
        id: '古族记名弟子_401_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '古族记名弟子_401_dlg_2',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '古族记名弟子_401_dlg_3',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
    ],
  },
  {
    id: '古族外门弟子_402',
    name: '古族外门弟子',
    title: '古族隐士',
    description: '古族外门弟子，神族血脉中人，修行多年，颇有造诣。',
    greeting: '古族外门弟子端坐于古殿之中，古老的血脉气息弥漫："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '古族外门弟子_402_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '古族外门弟子_402_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '古族外门弟子_402_dlg_2',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '古族血脉觉醒者_403',
    name: '古族血脉觉醒者',
    title: '古族天骄',
    description: '古族血脉觉醒者，神族血脉一脉的传人，在天骄擂台有着不小的名声。',
    greeting: '古族血脉觉醒者周身古族血脉气息流转，隐隐有帝影浮现："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '古族血脉觉醒者_403_dlg_0',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '古族血脉觉醒者_403_dlg_1',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '古族血脉觉醒者_403_dlg_2',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
    ],
  },
  {
    id: '古族传承者_404',
    name: '古族传承者',
    title: '古族长老',
    description: '古皇血脉的古族传承者，虽非天骄，却也修有所成。',
    greeting: '古族传承者负手而立，古族威严尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '古族传承者_404_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '古族传承者_404_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '古族传承者_404_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
    ],
  },
  {
    id: '古族渡劫者_405',
    name: '古族渡劫者',
    title: '古族天骄',
    description: '古族渡劫者，神族血脉一脉的传人，在古族有着不小的名声。',
    greeting: '古族渡劫者正在吐纳天地精华，古族传承隐隐："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '古族渡劫者_405_dlg_0',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '古族渡劫者_405_dlg_1',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '古族渡劫者_405_dlg_2',
        topic: '自我介绍',
        text: '"我乃神族血脉，见过道友。"',
      },
      {
        id: '古族渡劫者_405_dlg_3',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '古族渡劫者_405_dlg_4',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
    ],
  },
  {
    id: '古族老祖化身_406',
    name: '古族老祖化身',
    title: '古族天骄',
    description: '古族老祖化身，太古王族一脉的传人，在石国有着不小的名声。',
    greeting: '古族老祖化身负手而立，古族威严尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '古族老祖化身_406_dlg_0',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '古族老祖化身_406_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '古族老祖化身_406_dlg_2',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '古族老祖化身_406_dlg_3',
        topic: '自我介绍',
        text: '"在下古族老祖化身，不过是一介散修罢了。"',
      },
      {
        id: '古族老祖化身_406_dlg_4',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '古族圣地守护_407',
    name: '古族圣地守护',
    title: '古族长老',
    description: '古族圣地守护，神族血脉中人，修行多年，颇有造诣。',
    greeting: '古族圣地守护端坐于古殿之中，古老的血脉气息弥漫："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '古族圣地守护_407_dlg_0',
        topic: '自我介绍',
        text: '"在下古族圣地守护，见过阁下。"',
      },
      {
        id: '古族圣地守护_407_dlg_1',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '古族圣地守护_407_dlg_2',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '古族圣地守护_407_dlg_3',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
    ],
  },
  {
    id: '古族炼器师_408',
    name: '古族炼器师',
    title: '古族隐士',
    description: '古族炼器师，远古世家中人，修行多年，颇有造诣。',
    greeting: '古族炼器师正在吐纳天地精华，古族传承隐隐："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '古族炼器师_408_dlg_0',
        topic: '自我介绍',
        text: '"在下古族炼器师，不过是一介散修罢了。"',
      },
      {
        id: '古族炼器师_408_dlg_1',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '古族炼器师_408_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '古族炼器师_408_dlg_3',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '古族炼丹师_409',
    name: '古族炼丹师',
    title: '古族天骄',
    description: '古族炼丹师，神族血脉一脉的传人，在虚空圣地有着不小的名声。',
    greeting: '古族炼丹师目光深邃，古族智慧在其中流转："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '古族炼丹师_409_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '古族炼丹师_409_dlg_1',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '古族炼丹师_409_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
    ],
  },
  {
    id: '古族阵法师_410',
    name: '古族阵法师',
    title: '古族隐士',
    description: '古族阵法师，古皇血脉一脉的传人，在虚空圣地有着不小的名声。',
    greeting: '古族阵法师目光深邃，古族智慧在其中流转："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '古族阵法师_410_dlg_0',
        topic: '自我介绍',
        text: '"在下古族阵法师，不过是一介散修罢了。"',
      },
      {
        id: '古族阵法师_410_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '古族阵法师_410_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
    ],
  },
  {
    id: '古族血脉守护_411',
    name: '古族血脉守护',
    title: '古族血脉',
    description: '古族血脉守护，神族血脉中人，修行多年，颇有造诣。',
    greeting: '古族血脉守护负手而立，古族威严尽显："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '古族血脉守护_411_dlg_0',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '古族血脉守护_411_dlg_1',
        topic: '自我介绍',
        text: '"在下古族血脉守护，见过阁下。"',
      },
      {
        id: '古族血脉守护_411_dlg_2',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '古族血脉守护_411_dlg_3',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
    ],
  },
  {
    id: '源天师传人_412',
    name: '源天师传人',
    title: '源矿探查者',
    description: '源天师传人，源天一脉一脉的传人，在源石城有着不小的名声。',
    greeting: '源天师传人手持源石，正在仔细端详："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源天师传人_412_dlg_0',
        topic: '自我介绍',
        text: '"贫道源天师传人，修行数十载，却仍是凡胎。"',
      },
      {
        id: '源天师传人_412_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '源天师传人_412_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '源天师传人_412_dlg_3',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
    ],
  },
  {
    id: '源天师弟子_413',
    name: '源天师弟子',
    title: '源石商人',
    description: '源天师弟子，源天一脉一脉的传人，在万妖谷有着不小的名声。',
    greeting: '源天师弟子负手而立，源石气息隐隐："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源天师弟子_413_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '源天师弟子_413_dlg_1',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '源天师弟子_413_dlg_2',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '源天师弟子_413_dlg_3',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '源石鉴定师_414',
    name: '源石鉴定师',
    title: '源石鉴定师',
    description: '来自源天一脉的源石鉴定师，在这荒古禁地一带也算是有头有脸的人物。',
    greeting: '源石鉴定师周身源气流转，源天师传承尽显："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '源石鉴定师_414_dlg_0',
        topic: '自我介绍',
        text: '"在下源石鉴定师，见过阁下。"',
      },
      {
        id: '源石鉴定师_414_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '源石鉴定师_414_dlg_2',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '源石鉴定师_414_dlg_3',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '源石商人_415',
    name: '源石商人',
    title: '源天师',
    description: '源石世家的源石商人，虽非天骄，却也修有所成。',
    greeting: '源石商人负手而立，源石气息隐隐："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源石商人_415_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '源石商人_415_dlg_1',
        topic: '自我介绍',
        text: '"小老儿源石商人，在这虚空圣地待了大半辈子了。"',
      },
      {
        id: '源石商人_415_dlg_2',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '源石商人_415_dlg_3',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
    ],
  },
  {
    id: '源石赌徒_416',
    name: '源石赌徒',
    title: '源天师',
    description: '源石赌徒，源石世家一脉的传人，在荒古禁地有着不小的名声。',
    greeting: '源石赌徒手持源石，正在仔细端详："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '源石赌徒_416_dlg_0',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '源石赌徒_416_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '源石赌徒_416_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '源石赌徒_416_dlg_3',
        topic: '自我介绍',
        text: '"我乃源石世家，见过道友。"',
      },
    ],
  },
  {
    id: '源石切割师_417',
    name: '源石切割师',
    title: '源石商人',
    description: '来自源天师的源石切割师，在这源石城一带也算是有头有脸的人物。',
    greeting: '源石切割师端坐于石椅，源天师智慧在其中："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源石切割师_417_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '源石切割师_417_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '源石切割师_417_dlg_2',
        topic: '自我介绍',
        text: '"在下源石切割师，见过阁下。"',
      },
    ],
  },
  {
    id: '源矿探查者_418',
    name: '源矿探查者',
    title: '源天师',
    description: '源矿探查者，源天一脉一脉的传人，在荒古禁地有着不小的名声。',
    greeting: '源矿探查者端坐于石椅，源天师智慧在其中："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '源矿探查者_418_dlg_0',
        topic: '自我介绍',
        text: '"在下源矿探查者，不过是一介散修罢了。"',
      },
      {
        id: '源矿探查者_418_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '源矿探查者_418_dlg_2',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '源矿探查者_418_dlg_3',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '源气感应者_419',
    name: '源气感应者',
    title: '源矿探查者',
    description: '源气感应者，源天一脉一脉的传人，在石国有着不小的名声。',
    greeting: '源气感应者周身源气流转，源天师传承尽显："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '源气感应者_419_dlg_0',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '源气感应者_419_dlg_1',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '源气感应者_419_dlg_2',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
    ],
  },
  {
    id: '源天一脉_420',
    name: '源天一脉',
    title: '源石大师',
    description: '来自源天一脉的源天一脉，在这紫府一带也算是有头有脸的人物。',
    greeting: '源天一脉负手而立，源石气息隐隐："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源天一脉_420_dlg_0',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '源天一脉_420_dlg_1',
        topic: '自我介绍',
        text: '"在下源天一脉，见过阁下。"',
      },
      {
        id: '源天一脉_420_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '源天师记名弟子_421',
    name: '源天师记名弟子',
    title: '源矿探查者',
    description: '源天师记名弟子，源石世家中人，修行多年，颇有造诣。',
    greeting: '源天师记名弟子负手而立，源石气息隐隐："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源天师记名弟子_421_dlg_0',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '源天师记名弟子_421_dlg_1',
        topic: '自我介绍',
        text: '"在下源天师记名弟子，见过阁下。"',
      },
      {
        id: '源天师记名弟子_421_dlg_2',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '源天师记名弟子_421_dlg_3',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '源天师记名弟子_421_dlg_4',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '源石收藏家_422',
    name: '源石收藏家',
    title: '源石鉴定师',
    description: '源石收藏家，源天一脉一脉的传人，在瑶池有着不小的名声。',
    greeting: '源石收藏家负手而立，源石气息隐隐："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '源石收藏家_422_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '源石收藏家_422_dlg_1',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '源石收藏家_422_dlg_2',
        topic: '自我介绍',
        text: '"我乃源天一脉，见过道友。"',
      },
      {
        id: '源石收藏家_422_dlg_3',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
    ],
  },
  {
    id: '源石鉴定专家_423',
    name: '源石鉴定专家',
    title: '源石大师',
    description: '源石鉴定专家，源石世家中人，修行多年，颇有造诣。',
    greeting: '源石鉴定专家周身源气流转，源天师传承尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '源石鉴定专家_423_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '源石鉴定专家_423_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '源石鉴定专家_423_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '源石鉴定专家_423_dlg_3',
        topic: '自我介绍',
        text: '"在下源石鉴定专家，见过阁下。"',
      },
    ],
  },
  {
    id: '源矿守护者_424',
    name: '源矿守护者',
    title: '源石商人',
    description: '源天一脉的源矿守护者，虽非天骄，却也修有所成。',
    greeting: '源矿守护者正在鉴定源石，神情专注："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '源矿守护者_424_dlg_0',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '源矿守护者_424_dlg_1',
        topic: '自我介绍',
        text: '"在下源矿守护者，不过是一介散修罢了。"',
      },
      {
        id: '源矿守护者_424_dlg_2',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '源天师后人_425',
    name: '源天师后人',
    title: '源石大师',
    description: '源石世家出身的源天师后人，在北斗圣地小有名气。',
    greeting: '源天师后人周身源气流转，源天师传承尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '源天师后人_425_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '源天师后人_425_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '源天师后人_425_dlg_2',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
    ],
  },
  {
    id: '源天师旁系_426',
    name: '源天师旁系',
    title: '源矿探查者',
    description: '源天师旁系，源天师中人，修行多年，颇有造诣。',
    greeting: '源天师旁系周身源气流转，源天师传承尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '源天师旁系_426_dlg_0',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '源天师旁系_426_dlg_1',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '源天师旁系_426_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '源天师旁系_426_dlg_3',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '源天师旁系_426_dlg_4',
        topic: '自我介绍',
        text: '"贫道源天师旁系，修行数十载，却仍是凡胎。"',
      },
    ],
  },
  {
    id: '源石大会评委_427',
    name: '源石大会评委',
    title: '源石大师',
    description: '源石大会评委，源石世家一脉的传人，在古族有着不小的名声。',
    greeting: '源石大会评委手持源石，正在仔细端详："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源石大会评委_427_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '源石大会评委_427_dlg_1',
        topic: '自我介绍',
        text: '"小老儿源石大会评委，在这古族待了大半辈子了。"',
      },
      {
        id: '源石大会评委_427_dlg_2',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '源石大会评委_427_dlg_3',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '源石大会评委_427_dlg_4',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
    ],
  },
  {
    id: '源天师盟成员_428',
    name: '源天师盟成员',
    title: '源石鉴定师',
    description: '源天师盟成员，源石世家一脉的传人，在紫府有着不小的名声。',
    greeting: '源天师盟成员周身源气流转，源天师传承尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '源天师盟成员_428_dlg_0',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '源天师盟成员_428_dlg_1',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '源天师盟成员_428_dlg_2',
        topic: '自我介绍',
        text: '"贫道源天师盟成员，修行数十载，却仍是凡胎。"',
      },
      {
        id: '源天师盟成员_428_dlg_3',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '源天师盟成员_428_dlg_4',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
    ],
  },
  {
    id: '源石赌坊老板_429',
    name: '源石赌坊老板',
    title: '源天师',
    description: '源天师出身的源石赌坊老板，在源石城小有名气。',
    greeting: '源石赌坊老板周身源气流转，源天师传承尽显："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源石赌坊老板_429_dlg_0',
        topic: '自我介绍',
        text: '"我乃源天师，见过道友。"',
      },
      {
        id: '源石赌坊老板_429_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '源石赌坊老板_429_dlg_2',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '源石赌坊老板_429_dlg_3',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '源石赌坊老板_429_dlg_4',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '源石拍卖师_430',
    name: '源石拍卖师',
    title: '源石鉴定师',
    description: '源石拍卖师，源石世家中人，修行多年，颇有造诣。',
    greeting: '源石拍卖师负手而立，源石气息隐隐："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源石拍卖师_430_dlg_0',
        topic: '自我介绍',
        text: '"在下源石拍卖师，不过是一介散修罢了。"',
      },
      {
        id: '源石拍卖师_430_dlg_1',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '源石拍卖师_430_dlg_2',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '源石拍卖师_430_dlg_3',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '源天师传承者_431',
    name: '源天师传承者',
    title: '源石大师',
    description: '源天师传承者，源天师一脉的传人，在石城有着不小的名声。',
    greeting: '源天师传承者手持源石，正在仔细端详："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源天师传承者_431_dlg_0',
        topic: '自我介绍',
        text: '"在下源天师传承者，不过是一介散修罢了。"',
      },
      {
        id: '源天师传承者_431_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '源天师传承者_431_dlg_2',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
    ],
  },
  {
    id: '源天师传人_432',
    name: '源天师传人',
    title: '源石商人',
    description: '源天师传人，源石世家一脉的传人，在瑶池有着不小的名声。',
    greeting: '源天师传人端坐于石椅，源天师智慧在其中："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源天师传人_432_dlg_0',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '源天师传人_432_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '源天师传人_432_dlg_2',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '源天师传人_432_dlg_3',
        topic: '自我介绍',
        text: '"贫道源天师传人，修行数十载，却仍是凡胎。"',
      },
    ],
  },
  {
    id: '源天师弟子_433',
    name: '源天师弟子',
    title: '源石大师',
    description: '源天师弟子，源天一脉中人，修行多年，颇有造诣。',
    greeting: '源天师弟子端坐于石椅，源天师智慧在其中："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源天师弟子_433_dlg_0',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '源天师弟子_433_dlg_1',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '源天师弟子_433_dlg_2',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '源天师弟子_433_dlg_3',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
    ],
  },
  {
    id: '源石鉴定师_434',
    name: '源石鉴定师',
    title: '源石商人',
    description: '源石鉴定师，源石世家一脉的传人，在源石城有着不小的名声。',
    greeting: '源石鉴定师负手而立，源石气息隐隐："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '源石鉴定师_434_dlg_0',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '源石鉴定师_434_dlg_1',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '源石鉴定师_434_dlg_2',
        topic: '自我介绍',
        text: '"在下源石鉴定师，不过是一介散修罢了。"',
      },
      {
        id: '源石鉴定师_434_dlg_3',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
    ],
  },
  {
    id: '源石商人_435',
    name: '源石商人',
    title: '源石鉴定师',
    description: '源石世家出身的源石商人，在源石城小有名气。',
    greeting: '源石商人正在鉴定源石，神情专注："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '源石商人_435_dlg_0',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '源石商人_435_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '源石商人_435_dlg_2',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '源石商人_435_dlg_3',
        topic: '自我介绍',
        text: '"在下源石商人，见过阁下。"',
      },
    ],
  },
  {
    id: '源石赌徒_436',
    name: '源石赌徒',
    title: '源石商人',
    description: '源天师出身的源石赌徒，在荒古禁地小有名气。',
    greeting: '源石赌徒正在鉴定源石，神情专注："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '源石赌徒_436_dlg_0',
        topic: '自我介绍',
        text: '"小老儿源石赌徒，在这荒古禁地待了大半辈子了。"',
      },
      {
        id: '源石赌徒_436_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '源石赌徒_436_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '源石赌徒_436_dlg_3',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '源石赌徒_436_dlg_4',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '绝世剑修_437',
    name: '绝世剑修',
    title: '当世天才',
    description: '绝世剑修，绝世天骄一脉的传人，在荒古禁地有着不小的名声。',
    greeting: '绝世剑修端坐于云端，无敌之姿隐隐："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '绝世剑修_437_dlg_0',
        topic: '自我介绍',
        text: '"贫道绝世剑修，修行数十载，却仍是凡胎。"',
      },
      {
        id: '绝世剑修_437_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '绝世剑修_437_dlg_2',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
    ],
  },
  {
    id: '无敌魔修_438',
    name: '无敌魔修',
    title: '绝世天骄',
    description: '来自圣体传人的无敌魔修，在这石城一带也算是有头有脸的人物。',
    greeting: '无敌魔修负手而立，绝世风华在其中："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '无敌魔修_438_dlg_0',
        topic: '自我介绍',
        text: '"贫道无敌魔修，修行数十载，却仍是凡胎。"',
      },
      {
        id: '无敌魔修_438_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '无敌魔修_438_dlg_2',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
    ],
  },
  {
    id: '九死一生者_439',
    name: '九死一生者',
    title: '圣子',
    description: '圣体传人出身的九死一生者，在虚空圣地小有名气。',
    greeting: '九死一生者负手而立，绝世风华在其中："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '九死一生者_439_dlg_0',
        topic: '自我介绍',
        text: '"小老儿九死一生者，在这虚空圣地待了大半辈子了。"',
      },
      {
        id: '九死一生者_439_dlg_1',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '九死一生者_439_dlg_2',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '逆天改命者_440',
    name: '逆天改命者',
    title: '绝世天骄',
    description: '逆天改命者，霸体血脉一脉的传人，在北斗圣地有着不小的名声。',
    greeting: '逆天改命者负手而立，绝世风华在其中："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '逆天改命者_440_dlg_0',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '逆天改命者_440_dlg_1',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '逆天改命者_440_dlg_2',
        topic: '自我介绍',
        text: '"小老儿逆天改命者，在这北斗圣地待了大半辈子了。"',
      },
    ],
  },
  {
    id: '天生圣体_441',
    name: '天生圣体',
    title: '绝代双骄',
    description: '来自当世天才的天生圣体，在这摇光圣地一带也算是有头有脸的人物。',
    greeting: '天生圣体正在悟道，天骄之资尽显："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '天生圣体_441_dlg_0',
        topic: '自我介绍',
        text: '"小老儿天生圣体，在这摇光圣地待了大半辈子了。"',
      },
      {
        id: '天生圣体_441_dlg_1',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '天生圣体_441_dlg_2',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '天生圣体_441_dlg_3',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '天生圣体_441_dlg_4',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
    ],
  },
  {
    id: '先天道胎_442',
    name: '先天道胎',
    title: '绝代双骄',
    description: '先天道胎，绝世天骄中人，修行多年，颇有造诣。',
    greeting: '先天道胎负手而立，绝世风华在其中："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '先天道胎_442_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '先天道胎_442_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '先天道胎_442_dlg_2',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '先天道胎_442_dlg_3',
        topic: '自我介绍',
        text: '"在下先天道胎，见过阁下。"',
      },
    ],
  },
  {
    id: '圣体拥有者_443',
    name: '圣体拥有者',
    title: '圣子',
    description: '来自当世天才的圣体拥有者，在这瑶池一带也算是有头有脸的人物。',
    greeting: '圣体拥有者端坐于云端，无敌之姿隐隐："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '圣体拥有者_443_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '圣体拥有者_443_dlg_1',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '圣体拥有者_443_dlg_2',
        topic: '自我介绍',
        text: '"在下圣体拥有者，不过是一介散修罢了。"',
      },
      {
        id: '圣体拥有者_443_dlg_3',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '霸体传人_444',
    name: '霸体传人',
    title: '圣子',
    description: '绝世天骄出身的霸体传人，在源石城小有名气。',
    greeting: '霸体传人负手而立，绝世风华在其中："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '霸体传人_444_dlg_0',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '霸体传人_444_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '霸体传人_444_dlg_2',
        topic: '自我介绍',
        text: '"在下霸体传人，见过阁下。"',
      },
    ],
  },
  {
    id: '苍天霸血_445',
    name: '苍天霸血',
    title: '当世天才',
    description: '苍天霸血，圣体传人中人，修行多年，颇有造诣。',
    greeting: '苍天霸血周身气血冲天，天骄之气尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '苍天霸血_445_dlg_0',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '苍天霸血_445_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '苍天霸血_445_dlg_2',
        topic: '自我介绍',
        text: '"在下苍天霸血，见过阁下。"',
      },
    ],
  },
  {
    id: '神体觉醒者_446',
    name: '神体觉醒者',
    title: '圣子',
    description: '霸体血脉出身的神体觉醒者，在荒古禁地小有名气。',
    greeting: '神体觉醒者周身气血冲天，天骄之气尽显："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '神体觉醒者_446_dlg_0',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '神体觉醒者_446_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '神体觉醒者_446_dlg_2',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '神体觉醒者_446_dlg_3',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '仙体拥有者_447',
    name: '仙体拥有者',
    title: '绝代双骄',
    description: '来自绝世天骄的仙体拥有者，在这石城一带也算是有头有脸的人物。',
    greeting: '仙体拥有者端坐于云端，无敌之姿隐隐："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '仙体拥有者_447_dlg_0',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '仙体拥有者_447_dlg_1',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '仙体拥有者_447_dlg_2',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '仙体拥有者_447_dlg_3',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
    ],
  },
  {
    id: '剑道天才_448',
    name: '剑道天才',
    title: '圣女',
    description: '剑道天才，圣体传人一脉的传人，在源石城有着不小的名声。',
    greeting: '剑道天才目光如电，绝代风华在其中："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '剑道天才_448_dlg_0',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '剑道天才_448_dlg_1',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '剑道天才_448_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '剑道天才_448_dlg_3',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '剑道天才_448_dlg_4',
        topic: '自我介绍',
        text: '"小老儿剑道天才，在这源石城待了大半辈子了。"',
      },
    ],
  },
  {
    id: '阵法天才_449',
    name: '阵法天才',
    title: '当世天才',
    description: '阵法天才，神体觉醒一脉的传人，在荒古禁地有着不小的名声。',
    greeting: '阵法天才目光如电，绝代风华在其中："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '阵法天才_449_dlg_0',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '阵法天才_449_dlg_1',
        topic: '自我介绍',
        text: '"在下阵法天才，不过是一介散修罢了。"',
      },
      {
        id: '阵法天才_449_dlg_2',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '阵法天才_449_dlg_3',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '阵法天才_449_dlg_4',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
    ],
  },
  {
    id: '炼丹天才_450',
    name: '炼丹天才',
    title: '绝代双骄',
    description: '来自霸体血脉的炼丹天才，在这万妖谷一带也算是有头有脸的人物。',
    greeting: '炼丹天才端坐于云端，无敌之姿隐隐："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '炼丹天才_450_dlg_0',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '炼丹天才_450_dlg_1',
        topic: '自我介绍',
        text: '"在下炼丹天才，不过是一介散修罢了。"',
      },
      {
        id: '炼丹天才_450_dlg_2',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
    ],
  },
  {
    id: '炼器天才_451',
    name: '炼器天才',
    title: '圣子',
    description: '炼器天才，绝世天骄一脉的传人，在源石城有着不小的名声。',
    greeting: '炼器天才端坐于云端，无敌之姿隐隐："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '炼器天才_451_dlg_0',
        topic: '自我介绍',
        text: '"我乃绝世天骄，见过道友。"',
      },
      {
        id: '炼器天才_451_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '炼器天才_451_dlg_2',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '炼器天才_451_dlg_3',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '绝世天骄_452',
    name: '绝世天骄',
    title: '绝代双骄',
    description: '当世天才出身的绝世天骄，在荒古禁地小有名气。',
    greeting: '绝世天骄端坐于云端，无敌之姿隐隐："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '绝世天骄_452_dlg_0',
        topic: '自我介绍',
        text: '"小老儿绝世天骄，在这荒古禁地待了大半辈子了。"',
      },
      {
        id: '绝世天骄_452_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '绝世天骄_452_dlg_2',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '绝世天骄_452_dlg_3',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
    ],
  },
  {
    id: '当世天才_453',
    name: '当世天才',
    title: '圣子',
    description: '霸体血脉的当世天才，虽非天骄，却也修有所成。',
    greeting: '当世天才负手而立，绝世风华在其中："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '当世天才_453_dlg_0',
        topic: '自我介绍',
        text: '"我乃霸体血脉，见过道友。"',
      },
      {
        id: '当世天才_453_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '当世天才_453_dlg_2',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
    ],
  },
  {
    id: '圣子传人_454',
    name: '圣子传人',
    title: '绝代双骄',
    description: '圣体传人出身的圣子传人，在石城小有名气。',
    greeting: '圣子传人端坐于云端，无敌之姿隐隐："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '圣子传人_454_dlg_0',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '圣子传人_454_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '圣子传人_454_dlg_2',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '圣子传人_454_dlg_3',
        topic: '自我介绍',
        text: '"小老儿圣子传人，在这石城待了大半辈子了。"',
      },
      {
        id: '圣子传人_454_dlg_4',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
    ],
  },
  {
    id: '圣女化身_455',
    name: '圣女化身',
    title: '当世天才',
    description: '圣女化身，圣体传人中人，修行多年，颇有造诣。',
    greeting: '圣女化身正在悟道，天骄之资尽显："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '圣女化身_455_dlg_0',
        topic: '自我介绍',
        text: '"在下圣女化身，不过是一介散修罢了。"',
      },
      {
        id: '圣女化身_455_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '圣女化身_455_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '圣女化身_455_dlg_3',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '圣女化身_455_dlg_4',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
    ],
  },
  {
    id: '绝代天骄_456',
    name: '绝代天骄',
    title: '圣女',
    description: '绝世天骄的绝代天骄，虽非天骄，却也修有所成。',
    greeting: '绝代天骄正在悟道，天骄之资尽显："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '绝代天骄_456_dlg_0',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '绝代天骄_456_dlg_1',
        topic: '自我介绍',
        text: '"在下绝代天骄，见过阁下。"',
      },
      {
        id: '绝代天骄_456_dlg_2',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
    ],
  },
  {
    id: '绝世剑修_457',
    name: '绝世剑修',
    title: '圣女',
    description: '圣体传人出身的绝世剑修，在紫府小有名气。',
    greeting: '绝世剑修周身气血冲天，天骄之气尽显："见过道友。"',
    roomId: 'stone_kingdom_palace',
    dialogues: [
      {
        id: '绝世剑修_457_dlg_0',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '绝世剑修_457_dlg_1',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '绝世剑修_457_dlg_2',
        topic: '自我介绍',
        text: '"在下绝世剑修，不过是一介散修罢了。"',
      },
      {
        id: '绝世剑修_457_dlg_3',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '绝世剑修_457_dlg_4',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
    ],
  },
  {
    id: '无敌魔修_458',
    name: '无敌魔修',
    title: '绝代双骄',
    description: '圣体传人的无敌魔修，虽非天骄，却也修有所成。',
    greeting: '无敌魔修端坐于云端，无敌之姿隐隐："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '无敌魔修_458_dlg_0',
        topic: '自我介绍',
        text: '"小老儿无敌魔修，在这源石城待了大半辈子了。"',
      },
      {
        id: '无敌魔修_458_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '无敌魔修_458_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '无敌魔修_458_dlg_3',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '无敌魔修_458_dlg_4',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
    ],
  },
  {
    id: '九死一生者_459',
    name: '九死一生者',
    title: '绝代双骄',
    description: '霸体血脉出身的九死一生者，在石城小有名气。',
    greeting: '九死一生者正在悟道，天骄之资尽显："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '九死一生者_459_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '九死一生者_459_dlg_1',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '九死一生者_459_dlg_2',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '逆天改命者_460',
    name: '逆天改命者',
    title: '绝世天骄',
    description: '来自当世天才的逆天改命者，在这石城一带也算是有头有脸的人物。',
    greeting: '逆天改命者正在悟道，天骄之资尽显："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '逆天改命者_460_dlg_0',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '逆天改命者_460_dlg_1',
        topic: '自我介绍',
        text: '"在下逆天改命者，见过阁下。"',
      },
      {
        id: '逆天改命者_460_dlg_2',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
      {
        id: '逆天改命者_460_dlg_3',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '天生圣体_461',
    name: '天生圣体',
    title: '当世天才',
    description: '神体觉醒的天生圣体，虽非天骄，却也修有所成。',
    greeting: '天生圣体正在悟道，天骄之资尽显："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '天生圣体_461_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '天生圣体_461_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '天生圣体_461_dlg_2',
        topic: '自我介绍',
        text: '"贫道天生圣体，修行数十载，却仍是凡胎。"',
      },
      {
        id: '天生圣体_461_dlg_3',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '先天道胎_462',
    name: '先天道胎',
    title: '当世天才',
    description: '来自霸体血脉的先天道胎，在这石国一带也算是有头有脸的人物。',
    greeting: '先天道胎周身气血冲天，天骄之气尽显："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '先天道胎_462_dlg_0',
        topic: '自我介绍',
        text: '"在下先天道胎，见过阁下。"',
      },
      {
        id: '先天道胎_462_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '先天道胎_462_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '先天道胎_462_dlg_3',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
    ],
  },
  {
    id: '圣体拥有者_463',
    name: '圣体拥有者',
    title: '绝代双骄',
    description: '圣体传人出身的圣体拥有者，在阴阳圣地小有名气。',
    greeting: '圣体拥有者正在悟道，天骄之资尽显："见过道友。"',
    roomId: 'stone_kingdom_temple',
    dialogues: [
      {
        id: '圣体拥有者_463_dlg_0',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '圣体拥有者_463_dlg_1',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '圣体拥有者_463_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '圣体拥有者_463_dlg_3',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '圣体拥有者_463_dlg_4',
        topic: '自我介绍',
        text: '"在下圣体拥有者，不过是一介散修罢了。"',
      },
    ],
  },
  {
    id: '霸体传人_464',
    name: '霸体传人',
    title: '绝世天骄',
    description: '霸体传人，神体觉醒中人，修行多年，颇有造诣。',
    greeting: '霸体传人负手而立，绝世风华在其中："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '霸体传人_464_dlg_0',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '霸体传人_464_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '霸体传人_464_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '霸体传人_464_dlg_3',
        topic: '自我介绍',
        text: '"小老儿霸体传人，在这摇光圣地待了大半辈子了。"',
      },
      {
        id: '霸体传人_464_dlg_4',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '苍天霸血_465',
    name: '苍天霸血',
    title: '圣子',
    description: '神体觉醒出身的苍天霸血，在荒古禁地小有名气。',
    greeting: '苍天霸血端坐于云端，无敌之姿隐隐："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '苍天霸血_465_dlg_0',
        topic: '自我介绍',
        text: '"在下苍天霸血，不过是一介散修罢了。"',
      },
      {
        id: '苍天霸血_465_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '苍天霸血_465_dlg_2',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '苍天霸血_465_dlg_3',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
    ],
  },
  {
    id: '神体觉醒者_466',
    name: '神体觉醒者',
    title: '当世天才',
    description: '圣体传人的神体觉醒者，虽非天骄，却也修有所成。',
    greeting: '神体觉醒者目光如电，绝代风华在其中："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '神体觉醒者_466_dlg_0',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '神体觉醒者_466_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '神体觉醒者_466_dlg_2',
        topic: '自我介绍',
        text: '"我乃圣体传人，见过道友。"',
      },
    ],
  },
  {
    id: '商队护院总管_467',
    name: '商队护院总管',
    title: '商人',
    description: '江湖出身的商队护院总管，在荒古禁地小有名气。',
    greeting: '商队护院总管悠闲地坐在茶馆里，品着茶水："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '商队护院总管_467_dlg_0',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '商队护院总管_467_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '商队护院总管_467_dlg_2',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '商队护院总管_467_dlg_3',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '商队护院总管_467_dlg_4',
        topic: '自我介绍',
        text: '"我乃江湖，见过道友。"',
      },
    ],
  },
  {
    id: '商队老厨子_468',
    name: '商队老厨子',
    title: '隐士',
    description: '商队老厨子，隐世一脉的传人，在阴阳圣地有着不小的名声。',
    greeting: '商队老厨子坐在门前，看着来来往往的人群："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '商队老厨子_468_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '商队老厨子_468_dlg_1',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '商队老厨子_468_dlg_2',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '商队老厨子_468_dlg_3',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '商队老厨子_468_dlg_4',
        topic: '自我介绍',
        text: '"我乃隐世，见过道友。"',
      },
    ],
  },
  {
    id: '商队老马夫_469',
    name: '商队老马夫',
    title: '江湖人',
    description: '山村出身的商队老马夫，在石国小有名气。',
    greeting: '商队老马夫悠闲地坐在茶馆里，品着茶水："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '商队老马夫_469_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '商队老马夫_469_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '商队老马夫_469_dlg_2',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '客栈老掌柜_470',
    name: '客栈老掌柜',
    title: '凡人',
    description: '商队的客栈老掌柜，虽非天骄，却也修有所成。',
    greeting: '客栈老掌柜坐在门前，看着来来往往的人群："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '客栈老掌柜_470_dlg_0',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '客栈老掌柜_470_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '客栈老掌柜_470_dlg_2',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '客栈老掌柜_470_dlg_3',
        topic: '自我介绍',
        text: '"在下客栈老掌柜，见过阁下。"',
      },
    ],
  },
  {
    id: '茶楼老说书人_471',
    name: '茶楼老说书人',
    title: '凡人',
    description: '来自商队的茶楼老说书人，在这阴阳圣地一带也算是有头有脸的人物。',
    greeting: '茶楼老说书人坐在门前，看着来来往往的人群："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '茶楼老说书人_471_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '茶楼老说书人_471_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '茶楼老说书人_471_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '茶楼老说书人_471_dlg_3',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '茶楼老说书人_471_dlg_4',
        topic: '自我介绍',
        text: '"贫道茶楼老说书人，修行数十载，却仍是凡胎。"',
      },
    ],
  },
  {
    id: '杂货铺老掌柜_472',
    name: '杂货铺老掌柜',
    title: '凡人',
    description: '商队出身的杂货铺老掌柜，在荒古禁地小有名气。',
    greeting: '杂货铺老掌柜正在忙碌着，见你走来，抬头招呼："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '杂货铺老掌柜_472_dlg_0',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '杂货铺老掌柜_472_dlg_1',
        topic: '自我介绍',
        text: '"在下杂货铺老掌柜，不过是一介散修罢了。"',
      },
      {
        id: '杂货铺老掌柜_472_dlg_2',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '杂货铺老掌柜_472_dlg_3',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
      {
        id: '杂货铺老掌柜_472_dlg_4',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '城中老员外_473',
    name: '城中老员外',
    title: '百姓',
    description: '江湖出身的城中老员外，在北斗圣地小有名气。',
    greeting: '城中老员外悠闲地坐在茶馆里，品着茶水："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '城中老员外_473_dlg_0',
        topic: '自我介绍',
        text: '"在下城中老员外，不过是一介散修罢了。"',
      },
      {
        id: '城中老员外_473_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '城中老员外_473_dlg_2',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
    ],
  },
  {
    id: '书香门第老爷_474',
    name: '书香门第老爷',
    title: '隐士',
    description: '江湖的书香门第老爷，虽非天骄，却也修有所成。',
    greeting: '书香门第老爷正在整理货物，头也不抬："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '书香门第老爷_474_dlg_0',
        topic: '自我介绍',
        text: '"小老儿书香门第老爷，在这阴阳圣地待了大半辈子了。"',
      },
      {
        id: '书香门第老爷_474_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '书香门第老爷_474_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
    ],
  },
  {
    id: '隐世高人前辈_475',
    name: '隐世高人前辈',
    title: '隐士',
    description: '来自江湖的隐世高人前辈，在这北斗圣地一带也算是有头有脸的人物。',
    greeting: '隐世高人前辈坐在门前，看着来来往往的人群："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '隐世高人前辈_475_dlg_0',
        topic: '自我介绍',
        text: '"小老儿隐世高人前辈，在这北斗圣地待了大半辈子了。"',
      },
      {
        id: '隐世高人前辈_475_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '隐世高人前辈_475_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
    ],
  },
  {
    id: '山中猎户长者_476',
    name: '山中猎户长者',
    title: '凡人',
    description: '山中猎户长者，江湖中人，修行多年，颇有造诣。',
    greeting: '山中猎户长者正在整理货物，头也不抬："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '山中猎户长者_476_dlg_0',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '山中猎户长者_476_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '山中猎户长者_476_dlg_2',
        topic: '自我介绍',
        text: '"贫道山中猎户长者，修行数十载，却仍是凡胎。"',
      },
      {
        id: '山中猎户长者_476_dlg_3',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '江边老渔民_477',
    name: '江边老渔民',
    title: '江湖人',
    description: '江边老渔民，商队一脉的传人，在北斗圣地有着不小的名声。',
    greeting: '江边老渔民悠闲地坐在茶馆里，品着茶水："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '江边老渔民_477_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '江边老渔民_477_dlg_1',
        topic: '自我介绍',
        text: '"贫道江边老渔民，修行数十载，却仍是凡胎。"',
      },
      {
        id: '江边老渔民_477_dlg_2',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
    ],
  },
  {
    id: '乞丐帮老帮主_478',
    name: '乞丐帮老帮主',
    title: '凡人',
    description: '乞丐帮老帮主，江湖一脉的传人，在虚空圣地有着不小的名声。',
    greeting: '乞丐帮老帮主悠闲地坐在茶馆里，品着茶水："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '乞丐帮老帮主_478_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '乞丐帮老帮主_478_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '乞丐帮老帮主_478_dlg_2',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '乞丐帮老帮主_478_dlg_3',
        topic: '自我介绍',
        text: '"小老儿乞丐帮老帮主，在这虚空圣地待了大半辈子了。"',
      },
      {
        id: '乞丐帮老帮主_478_dlg_4',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
    ],
  },
  {
    id: '流浪老艺人_479',
    name: '流浪老艺人',
    title: '江湖人',
    description: '来自商队的流浪老艺人，在这虚空圣地一带也算是有头有脸的人物。',
    greeting: '流浪老艺人坐在门前，看着来来往往的人群："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '流浪老艺人_479_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '流浪老艺人_479_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '流浪老艺人_479_dlg_2',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
    ],
  },
  {
    id: '小镇老郎中夫人_480',
    name: '小镇老郎中夫人',
    title: '百姓',
    description: '小镇老郎中夫人，江湖一脉的传人，在石国有着不小的名声。',
    greeting: '小镇老郎中夫人站在街边，打量着过往行人："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '小镇老郎中夫人_480_dlg_0',
        topic: '自我介绍',
        text: '"贫道小镇老郎中夫人，修行数十载，却仍是凡胎。"',
      },
      {
        id: '小镇老郎中夫人_480_dlg_1',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '小镇老郎中夫人_480_dlg_2',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '村中老族长夫人_481',
    name: '村中老族长夫人',
    title: '隐士',
    description: '来自隐世的村中老族长夫人，在这阴阳圣地一带也算是有头有脸的人物。',
    greeting: '村中老族长夫人坐在门前，看着来来往往的人群："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '村中老族长夫人_481_dlg_0',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '村中老族长夫人_481_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '村中老族长夫人_481_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '村中老族长夫人_481_dlg_3',
        topic: '自我介绍',
        text: '"我乃隐世，见过道友。"',
      },
    ],
  },
  {
    id: '城中老县令_482',
    name: '城中老县令',
    title: '凡人',
    description: '城中老县令，山村一脉的传人，在古族有着不小的名声。',
    greeting: '城中老县令悠闲地坐在茶馆里，品着茶水："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '城中老县令_482_dlg_0',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '城中老县令_482_dlg_1',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '城中老县令_482_dlg_2',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
    ],
  },
  {
    id: '江湖老侠客_483',
    name: '江湖老侠客',
    title: '凡人',
    description: '来自山村的江湖老侠客，在这荒古禁地一带也算是有头有脸的人物。',
    greeting: '江湖老侠客悠闲地坐在茶馆里，品着茶水："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '江湖老侠客_483_dlg_0',
        topic: '自我介绍',
        text: '"我乃山村，见过道友。"',
      },
      {
        id: '江湖老侠客_483_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '江湖老侠客_483_dlg_2',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '江湖老侠客_483_dlg_3',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '江湖老侠客_483_dlg_4',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
    ],
  },
  {
    id: '商队老护卫头领_484',
    name: '商队老护卫头领',
    title: '百姓',
    description: '江湖的商队老护卫头领，虽非天骄，却也修有所成。',
    greeting: '商队老护卫头领站在街边，打量着过往行人："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '商队老护卫头领_484_dlg_0',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '商队老护卫头领_484_dlg_1',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
      {
        id: '商队老护卫头领_484_dlg_2',
        topic: '自我介绍',
        text: '"小老儿商队老护卫头领，在这石城待了大半辈子了。"',
      },
    ],
  },
  {
    id: '客栈老账房_485',
    name: '客栈老账房',
    title: '隐士',
    description: '隐世出身的客栈老账房，在紫府小有名气。',
    greeting: '客栈老账房悠闲地坐在茶馆里，品着茶水："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '客栈老账房_485_dlg_0',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '客栈老账房_485_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '客栈老账房_485_dlg_2',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
    ],
  },
  {
    id: '茶楼老掌柜_486',
    name: '茶楼老掌柜',
    title: '隐士',
    description: '茶楼老掌柜，山村一脉的传人，在紫府有着不小的名声。',
    greeting: '茶楼老掌柜悠闲地坐在茶馆里，品着茶水："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '茶楼老掌柜_486_dlg_0',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '茶楼老掌柜_486_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '茶楼老掌柜_486_dlg_2',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
      {
        id: '茶楼老掌柜_486_dlg_3',
        topic: '自我介绍',
        text: '"贫道茶楼老掌柜，修行数十载，却仍是凡胎。"',
      },
      {
        id: '茶楼老掌柜_486_dlg_4',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
    ],
  },
  {
    id: '街边老泥人匠_487',
    name: '街边老泥人匠',
    title: '隐士',
    description: '街边老泥人匠，江湖一脉的传人，在天骄擂台有着不小的名声。',
    greeting: '街边老泥人匠站在街边，打量着过往行人："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '街边老泥人匠_487_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼之道，贵在坚持。"',
      },
      {
        id: '街边老泥人匠_487_dlg_1',
        topic: '请求指点',
        text: '"自己的路，要自己走。"',
      },
      {
        id: '街边老泥人匠_487_dlg_2',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '街边老泥人匠_487_dlg_3',
        topic: '自我介绍',
        text: '"在下街边老泥人匠，不过是一介散修罢了。"',
      },
      {
        id: '街边老泥人匠_487_dlg_4',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
    ],
  },
  {
    id: '城中老守城门卫_488',
    name: '城中老守城门卫',
    title: '隐士',
    description: '城中老守城门卫，江湖中人，修行多年，颇有造诣。',
    greeting: '城中老守城门卫站在街边，打量着过往行人："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '城中老守城门卫_488_dlg_0',
        topic: '自我介绍',
        text: '"在下城中老守城门卫，不过是一介散修罢了。"',
      },
      {
        id: '城中老守城门卫_488_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '城中老守城门卫_488_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
    ],
  },
  {
    id: '山中老隐士_489',
    name: '山中老隐士',
    title: '商人',
    description: '隐世出身的山中老隐士，在摇光圣地小有名气。',
    greeting: '山中老隐士站在街边，打量着过往行人："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '山中老隐士_489_dlg_0',
        topic: '自我介绍',
        text: '"在下山中老隐士，不过是一介散修罢了。"',
      },
      {
        id: '山中老隐士_489_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '山中老隐士_489_dlg_2',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '山中老隐士_489_dlg_3',
        topic: '请求指点',
        text: '"我能说的，只有四个字：坚持不懈。"',
      },
    ],
  },
  {
    id: '江湖老神医_490',
    name: '江湖老神医',
    title: '凡人',
    description: '江湖老神医，隐世中人，修行多年，颇有造诣。',
    greeting: '江湖老神医正在整理货物，头也不抬："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '江湖老神医_490_dlg_0',
        topic: '自我介绍',
        text: '"小老儿江湖老神医，在这紫府待了大半辈子了。"',
      },
      {
        id: '江湖老神医_490_dlg_1',
        topic: '问过往经历',
        text: '"我的经历？不过是一步一步走过来罢了。"',
      },
      {
        id: '江湖老神医_490_dlg_2',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '江湖老神医_490_dlg_3',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
      {
        id: '江湖老神医_490_dlg_4',
        topic: '谈修炼心得',
        text: '"我虽资质平平，却也悟出些许道理。"',
      },
    ],
  },
  {
    id: '江湖老相士_491',
    name: '江湖老相士',
    title: '凡人',
    description: '隐世的江湖老相士，虽非天骄，却也修有所成。',
    greeting: '江湖老相士正在忙碌着，见你走来，抬头招呼："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '江湖老相士_491_dlg_0',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '江湖老相士_491_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '江湖老相士_491_dlg_2',
        topic: '论当今天下',
        text: '"如今大世降临，天骄并起。"',
      },
      {
        id: '江湖老相士_491_dlg_3',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '铁匠铺老掌柜_492',
    name: '铁匠铺老掌柜',
    title: '商人',
    description: '隐世出身的铁匠铺老掌柜，在瑶池小有名气。',
    greeting: '铁匠铺老掌柜正在忙碌着，见你走来，抬头招呼："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '铁匠铺老掌柜_492_dlg_0',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '铁匠铺老掌柜_492_dlg_1',
        topic: '问过往经历',
        text: '"这一路走来，见过太多生死，太多离别。"',
      },
      {
        id: '铁匠铺老掌柜_492_dlg_2',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '铁匠铺老掌柜_492_dlg_3',
        topic: '自我介绍',
        text: '"小老儿铁匠铺老掌柜，在这瑶池待了大半辈子了。"',
      },
    ],
  },
  {
    id: '药铺老板娘_493',
    name: '药铺老板娘',
    title: '隐士',
    description: '药铺老板娘，隐世中人，修行多年，颇有造诣。',
    greeting: '药铺老板娘坐在门前，看着来来往往的人群："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '药铺老板娘_493_dlg_0',
        topic: '自我介绍',
        text: '"在下药铺老板娘，不过是一介散修罢了。"',
      },
      {
        id: '药铺老板娘_493_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '药铺老板娘_493_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '药铺老板娘_493_dlg_3',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '药铺老板娘_493_dlg_4',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
    ],
  },
  {
    id: '杂耍老艺人班主_494',
    name: '杂耍老艺人班主',
    title: '隐士',
    description: '商队出身的杂耍老艺人班主，在万妖谷小有名气。',
    greeting: '杂耍老艺人班主站在街边，打量着过往行人："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '杂耍老艺人班主_494_dlg_0',
        topic: '论当今天下',
        text: '"大世争锋，谁能登顶？"',
      },
      {
        id: '杂耍老艺人班主_494_dlg_1',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '杂耍老艺人班主_494_dlg_2',
        topic: '自我介绍',
        text: '"我乃商队，见过道友。"',
      },
    ],
  },
  {
    id: '商队老护卫教头_495',
    name: '商队老护卫教头',
    title: '隐士',
    description: '江湖的商队老护卫教头，虽非天骄，却也修有所成。',
    greeting: '商队老护卫教头正在整理货物，头也不抬："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '商队老护卫教头_495_dlg_0',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '商队老护卫教头_495_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '商队老护卫教头_495_dlg_2',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '商队老护卫教头_495_dlg_3',
        topic: '自我介绍',
        text: '"贫道商队老护卫教头，修行数十载，却仍是凡胎。"',
      },
      {
        id: '商队老护卫教头_495_dlg_4',
        topic: '请求指点',
        text: '"指点？我有什么资格指点你？"',
      },
    ],
  },
  {
    id: '商队老采购管事_496',
    name: '商队老采购管事',
    title: '商人',
    description: '来自隐世的商队老采购管事，在这源石城一带也算是有头有脸的人物。',
    greeting: '商队老采购管事坐在门前，看着来来往往的人群："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '商队老采购管事_496_dlg_0',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
      {
        id: '商队老采购管事_496_dlg_1',
        topic: '论当今天下',
        text: '"乱世将至，因果纠缠。"',
      },
      {
        id: '商队老采购管事_496_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '商队老采购管事_496_dlg_3',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '商队老采购管事_496_dlg_4',
        topic: '自我介绍',
        text: '"在下商队老采购管事，不过是一介散修罢了。"',
      },
    ],
  },
  {
    id: '商队老账房_497',
    name: '商队老账房',
    title: '百姓',
    description: '城中出身的商队老账房，在天骄擂台小有名气。',
    greeting: '商队老账房坐在门前，看着来来往往的人群："见过道友。"',
    roomId: 'stone_kingdom_gate',
    dialogues: [
      {
        id: '商队老账房_497_dlg_0',
        topic: '论当今天下',
        text: '"这一世，或许会有人成仙。"',
      },
      {
        id: '商队老账房_497_dlg_1',
        topic: '自我介绍',
        text: '"在下商队老账房，见过阁下。"',
      },
      {
        id: '商队老账房_497_dlg_2',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '商队老账房_497_dlg_3',
        topic: '谈修炼心得',
        text: '"修炼如逆水行舟，不进则退。"',
      },
      {
        id: '商队老账房_497_dlg_4',
        topic: '请求指点',
        text: '"修行之路，我只能给你一句忠告：莫要心急。"',
      },
    ],
  },
  {
    id: '客栈老伙计_498',
    name: '客栈老伙计',
    title: '百姓',
    description: '城中的客栈老伙计，虽非天骄，却也修有所成。',
    greeting: '客栈老伙计坐在门前，看着来来往往的人群："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '客栈老伙计_498_dlg_0',
        topic: '自我介绍',
        text: '"在下客栈老伙计，不过是一介散修罢了。"',
      },
      {
        id: '客栈老伙计_498_dlg_1',
        topic: '问过往经历',
        text: '"说来话长，不知从何说起。"',
      },
      {
        id: '客栈老伙计_498_dlg_2',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
    ],
  },
  {
    id: '茶楼老跑堂_499',
    name: '茶楼老跑堂',
    title: '百姓',
    description: '茶楼老跑堂，城中中人，修行多年，颇有造诣。',
    greeting: '茶楼老跑堂悠闲地坐在茶馆里，品着茶水："见过道友。"',
    roomId: 'xianyu_garden',
    dialogues: [
      {
        id: '茶楼老跑堂_499_dlg_0',
        topic: '自我介绍',
        text: '"小老儿茶楼老跑堂，在这万妖谷待了大半辈子了。"',
      },
      {
        id: '茶楼老跑堂_499_dlg_1',
        topic: '问过往经历',
        text: '"往事已矣，不提也罢。"',
      },
      {
        id: '茶楼老跑堂_499_dlg_2',
        topic: '谈修炼心得',
        text: '"修行不在于功法高低，在于心境。"',
      },
    ],
  },
  {
    id: '杂货铺老账房_500',
    name: '杂货铺老账房',
    title: '江湖人',
    description: '山村的杂货铺老账房，虽非天骄，却也修有所成。',
    greeting: '杂货铺老账房坐在门前，看着来来往往的人群："见过道友。"',
    roomId: 'stone_kingdom_market',
    dialogues: [
      {
        id: '杂货铺老账房_500_dlg_0',
        topic: '自我介绍',
        text: '"在下杂货铺老账房，不过是一介散修罢了。"',
      },
      {
        id: '杂货铺老账房_500_dlg_1',
        topic: '问过往经历',
        text: '"年轻时也曾意气风发，如今却只剩回忆。"',
      },
      {
        id: '杂货铺老账房_500_dlg_2',
        topic: '请求指点',
        text: '"你要指点？先把自己的心境修炼好吧。"',
      },
      {
        id: '杂货铺老账房_500_dlg_3',
        topic: '谈修炼心得',
        text: '"大道至简，却在日常。"',
      },
      {
        id: '杂货铺老账房_500_dlg_4',
        topic: '论当今天下',
        text: '"当今天下，群雄逐鹿。"',
      },
    ],
  },
];
