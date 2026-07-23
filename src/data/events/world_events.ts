import {
  IWorldEventTemplate,
  WorldEventType,
  EventDangerLevel,
  PlayerChoiceType,
} from '../../domain/entities/WorldEvent';

export const WORLD_EVENT_TEMPLATES: IWorldEventTemplate[] = [
  {
    id: 'ev_robbery_road',
    type: WorldEventType.NPC_ROBBERY,
    title: '路遇劫匪',
    description: '前方山道上，几个蒙面修士正围着一个商人模样的人，刀剑出鞘，似乎在抢劫财物。那商人瑟瑟发抖，地上散落着几个被打开的储物袋。',
    dangerLevel: EventDangerLevel.MEDIUM,
    weight: 15,
    isSafeZoneAllowed: false,
    terrainTypes: ['山脉', '密林', '平原'],
    choices: [
      {
        id: 'ch_help_merchant',
        text: '出手相助，击退劫匪',
        type: PlayerChoiceType.HELP,
        successRate: 0.7,
        outcomes: [
          {
            id: 'out_success',
            text: '你拔剑相助，几个回合便击退了劫匪。商人感激涕零，硬塞给你一袋灵石和一张他珍藏的丹方。',
            weight: 70,
            effects: [
              { type: 'gold', value: 500, description: '获得灵石 500' },
              { type: 'favorability', target: 'merchant_li', value: 25, description: '商人好感+25' },
              { type: 'reputation', value: 'honest', description: '获得【正直】名声' },
            ],
          },
          {
            id: 'out_hard_fight',
            text: '劫匪人数众多，你苦战一番才将他们赶走。虽然救下了商人，但自己也受了些伤。',
            weight: 30,
            effects: [
              { type: 'hp', value: -30, description: '损失气血 30' },
              { type: 'gold', value: 200, description: '获得灵石 200' },
              { type: 'favorability', target: 'merchant_li', value: 20, description: '商人好感+20' },
            ],
          },
        ],
      },
      {
        id: 'ch_join_robbers',
        text: '趁火打劫，加入劫匪',
        type: PlayerChoiceType.JOIN,
        outcomes: [
          {
            id: 'out_join_success',
            text: '劫匪头目看你修为不弱，欣然应允。你们一起洗劫了商人，分赃时你得到了大头。但远处似乎有修士看到了这一幕...',
            weight: 60,
            effects: [
              { type: 'gold', value: 800, description: '获得灵石 800' },
              { type: 'favorability', target: 'merchant_li', value: -50, description: '商人好感-50' },
              { type: 'reputation', value: 'cruel', description: '获得【残忍】名声' },
            ],
          },
          {
            id: 'out_join_trap',
            text: '谁知这劫匪头目是个阴险之辈，他假意答应，转头就和手下一起围攻你！"吃独食"才是他们的规矩。',
            weight: 40,
            effects: [
              { type: 'hp', value: -50, description: '损失气血 50' },
              { type: 'gold', value: -200, description: '损失灵石 200' },
              { type: 'favorability', target: 'merchant_li', value: -30, description: '商人好感-30' },
            ],
          },
        ],
      },
      {
        id: 'ch_observe',
        text: '暗中观察，等待时机',
        type: PlayerChoiceType.OBSERVE,
        outcomes: [
          {
            id: 'out_steal',
            text: '趁双方缠斗之际，你悄悄捡起了地上遗落的一个储物袋，悄无声息地离开了。',
            weight: 50,
            effects: [
              { type: 'gold', value: 300, description: '获得灵石 300' },
              { type: 'item', value: 'low_grade_pill', description: '获得下品丹药 x2' },
            ],
          },
          {
            id: 'out_found',
            text: '你刚想捡漏，就被一个劫匪发现了。他大喊一声，你只好狼狈逃走。',
            weight: 50,
            effects: [
              { type: 'hp', value: -10, description: '逃跑时擦伤，损失气血 10' },
            ],
          },
        ],
      },
      {
        id: 'ch_flee',
        text: '多一事不如少一事，绕路离开',
        type: PlayerChoiceType.FLEE,
        outcomes: [
          {
            id: 'out_safe',
            text: '你悄悄绕开了是非之地。虽然什么都没得到，但至少是安全的。',
            weight: 100,
            effects: [],
          },
        ],
      },
    ],
  },

  {
    id: 'ev_mysterious_stranger',
    type: WorldEventType.MYSTERIOUS_STRANGER,
    title: '神秘老者',
    description: '一位衣衫褴褛的老者坐在路边，身旁放着一个破旧的葫芦。他看到你路过，浑浊的眼睛里闪过一丝精光："小友，陪老朽喝一杯如何？"',
    dangerLevel: EventDangerLevel.LOW,
    weight: 10,
    isSafeZoneAllowed: true,
    terrainTypes: ['平原', '山脉', '密林'],
    choices: [
      {
        id: 'ch_drink',
        text: '恭敬不如从命，陪他喝一杯',
        type: PlayerChoiceType.ACCEPT,
        outcomes: [
          {
            id: 'out_sage',
            text: '酒过三巡，老者忽然哈哈大笑："好胆色！不怕我在酒里下毒？"说完他身形一闪，化作一道虹光消失在天际，只留下一卷古籍和一枚玉简。"小友，这是老夫的一点心意。"',
            weight: 20,
            effects: [
              { type: 'item', value: 'mysterious_technique', description: '获得神秘功法' },
              { type: 'exp', value: 500, description: '获得修为 500' },
              { type: 'buff', value: 'sage_blessing', description: '获得【贤者祝福】buff' },
            ],
          },
          {
            id: 'out_insight',
            text: '酒是好酒。老者和你聊了许多修炼上的疑惑，你只觉茅塞顿开，收获颇丰。',
            weight: 40,
            effects: [
              { type: 'exp', value: 200, description: '获得修为 200' },
              { type: 'mana', value: 50, description: '法力上限+50' },
            ],
          },
          {
            id: 'out_drunk',
            text: '这酒后劲太大，你喝了三杯就醉倒了。醒来时老者已不见踪影，头还有些昏沉。',
            weight: 40,
            effects: [
              { type: 'hp', value: -10, description: '宿醉不适，损失气血 10' },
            ],
          },
        ],
      },
      {
        id: 'ch_refuse_politely',
        text: '婉言谢绝，告辞离开',
        type: PlayerChoiceType.REFUSE,
        outcomes: [
          {
            id: 'out_nod',
            text: '老者也不勉强，只是深深看了你一眼，微微点头："稳重心细，是个好苗子。"说完便继续闭目养神。',
            weight: 70,
            effects: [],
          },
          {
            id: 'out_test',
            text: '老者忽然释放出一丝威压，如山岳压顶！但只是一瞬便收回："道心稳固，不错。"',
            weight: 30,
            effects: [
              { type: 'exp', value: 50, description: '获得修为 50' },
            ],
          },
        ],
      },
      {
        id: 'ch_suspicious',
        text: '此人可疑，拔剑戒备',
        type: PlayerChoiceType.ATTACK,
        outcomes: [
          {
            id: 'out_angry',
            text: '老者冷哼一声，袖子一挥，你便被一股无形之力掀飞出去。"小辈无礼！"他的声音远远传来，你摔得七荤八素。',
            weight: 80,
            effects: [
              { type: 'hp', value: -40, description: '损失气血 40' },
              { type: 'debuff', value: 'weakened', description: '【虚弱】debuff，持续1小时' },
            ],
          },
          {
            id: 'out_respect',
            text: '老者非但不怒，反而抚掌大笑："好！有魄力！老夫最欣赏你这种有胆识的年轻人！"他丢给你一瓶丹药，飘然而去。',
            weight: 20,
            effects: [
              { type: 'item', value: 'healing_pill', description: '获得疗伤丹 x3' },
              { type: 'exp', value: 100, description: '获得修为 100' },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'ev_treasure_chest',
    type: WorldEventType.TREASURE_DISCOVERY,
    title: '遗落的宝箱',
    description: '灌木丛中，一个布满灰尘的宝箱静静躺着。看样式似乎是某位修士的遗物。宝箱周围有几具枯骨，似乎是为了这箱子而丧命。',
    dangerLevel: EventDangerLevel.MEDIUM,
    weight: 12,
    isSafeZoneAllowed: false,
    terrainTypes: ['密林', '山脉', '废墟', '洞穴'],
    choices: [
      {
        id: 'ch_open_directly',
        text: '直接打开宝箱',
        type: PlayerChoiceType.ACCEPT,
        outcomes: [
          {
            id: 'out_treasure',
            text: '宝箱里是一堆灵石和几件法器，还有一本泛黄的功法秘籍。发了！',
            weight: 40,
            effects: [
              { type: 'gold', value: 600, description: '获得灵石 600' },
              { type: 'item', value: 'magic_tool', description: '获得法器一件' },
              { type: 'exp', value: 150, description: '获得修为 150' },
            ],
          },
          {
            id: 'out_trap_poison',
            text: '"咔嗒"一声，宝箱底部弹出毒针！你躲闪不及，中了毒。但箱子里的东西还是拿到了。',
            weight: 35,
            effects: [
              { type: 'gold', value: 300, description: '获得灵石 300' },
              { type: 'hp', value: -40, description: '中毒，损失气血 40' },
              { type: 'debuff', value: 'poisoned', description: '【中毒】debuff，持续30分钟' },
            ],
          },
          {
            id: 'out_empty',
            text: '箱子是空的...不，底部有一行小字："贪心的人啊，你以为宝物会在路边等你吗？——寻宝狂人 留"',
            weight: 25,
            effects: [],
          },
        ],
      },
      {
        id: 'ch_check_carefully',
        text: '仔细检查陷阱后再开',
        type: PlayerChoiceType.SEARCH,
        outcomes: [
          {
            id: 'out_found_trap',
            text: '你果然发现了机关！小心拆除后，宝箱安全打开，里面的东西全归你了。',
            weight: 60,
            effects: [
              { type: 'gold', value: 500, description: '获得灵石 500' },
              { type: 'item', value: 'low_grade_talisman', description: '获得下品符箓 x3' },
            ],
          },
          {
            id: 'out_too_careful',
            text: '你检查了半天，什么陷阱都没发现。打开一看，里面只有几块碎灵石。看来是你想多了。',
            weight: 40,
            effects: [
              { type: 'gold', value: 100, description: '获得灵石 100' },
            ],
          },
        ],
      },
      {
        id: 'ch_leave',
        text: '财色动人心，还是不碰为妙',
        type: PlayerChoiceType.FLEE,
        outcomes: [
          {
            id: 'out_smart',
            text: '你明智地选择了离开。走出不远，就听到身后传来轰隆一声——果然有埋伏！',
            weight: 50,
            effects: [
              { type: 'exp', value: 30, description: '获得修为 30（增长阅历）' },
            ],
          },
          {
            id: 'out_regret',
            text: '你离开了，但走了几步又后悔了。等你再回去时，宝箱已经被别人搬走了。',
            weight: 50,
            effects: [],
          },
        ],
      },
    ],
  },

  {
    id: 'ev_injured_cultivator',
    type: WorldEventType.NPC_RESCUE,
    title: '受伤的修士',
    description: '路旁躺着一个浑身是血的修士，气息微弱。他看到你，艰难地抬起手："道友...救我...必有重谢..."他腰间的储物袋鼓鼓囊囊的。',
    dangerLevel: EventDangerLevel.MEDIUM,
    weight: 12,
    isSafeZoneAllowed: false,
    terrainTypes: ['山脉', '密林', '平原', '沼泽'],
    choices: [
      {
        id: 'ch_save',
        text: '救人一命胜造七级浮屠，救他',
        type: PlayerChoiceType.HELP,
        outcomes: [
          {
            id: 'out_real_injury',
            text: '你喂他服下疗伤药，又助他运转功法疗伤。半个时辰后，他面色好了许多。"大恩不言谢！"他郑重地递给你一枚玉简，"这是我家族的独门秘术，聊表心意。"',
            weight: 50,
            effects: [
              { type: 'item', value: 'secret_technique', description: '获得家族秘术' },
              { type: 'gold', value: 300, description: '获得灵石 300' },
              { type: 'reputation', value: 'kind', description: '获得【善良】名声' },
              { type: 'favorability', target: 'injured_cultivator', value: 40, description: '修士好感+40' },
            ],
          },
          {
            id: 'out_feign',
            text: '你刚靠近，那人突然暴起！"小子，你中计了！"他哪里有半分受伤的样子，分明是陷阱！',
            weight: 30,
            effects: [
              { type: 'hp', value: -45, description: '被偷袭，损失气血 45' },
              { type: 'gold', value: -150, description: '慌乱中丢失灵石 150' },
            ],
          },
          {
            id: 'out_die',
            text: '他伤得太重了，你的丹药也回天乏术。临终前，他把储物袋塞给你："替我...交给..."话没说完便咽了气。',
            weight: 20,
            effects: [
              { type: 'gold', value: 400, description: '获得灵石 400' },
              { type: 'item', value: 'inheritance_token', description: '获得遗物令牌' },
              { type: 'exp', value: 80, description: '获得修为 80（人生阅历）' },
            ],
          },
        ],
      },
      {
        id: 'ch_rob',
        text: '趁他病要他命，杀人夺宝',
        type: PlayerChoiceType.BETRAY,
        outcomes: [
          {
            id: 'out_easy_kill',
            text: '他伤势太重，根本无力反抗。你夺走了他的储物袋，里面收获不菲。但你心中隐隐有些不安...',
            weight: 50,
            effects: [
              { type: 'gold', value: 700, description: '获得灵石 700' },
              { type: 'item', value: 'stolen_treasure', description: '获得不明法宝' },
              { type: 'reputation', value: 'villainous', description: '获得【邪恶】名声' },
              { type: 'debuff', value: 'inner_demon', description: '【心魔滋生】debuff' },
            ],
          },
          {
            id: 'out_hidden_strength',
            text: '"找死！"他突然睁眼，身上爆发出远超表面的修为！"区区蝼蚁，也敢觊觎本长老的东西？"他一掌拍来，你重伤倒飞。',
            weight: 30,
            effects: [
              { type: 'hp', value: -70, description: '损失气血 70' },
              { type: 'debuff', value: 'severe_injury', description: '【重伤】debuff，持续2小时' },
            ],
          },
          {
            id: 'out_sect_revenge',
            text: '你得手了。但几天后你才知道，那人是某个大宗门的外门长老。他的同门正在到处追查凶手...',
            weight: 20,
            effects: [
              { type: 'gold', value: 500, description: '获得灵石 500' },
              { type: 'unlock', value: 'sect_manhunt', description: '解锁【宗门追杀】事件线' },
            ],
          },
        ],
      },
      {
        id: 'ch_ask_details',
        text: '先问清楚情况再说',
        type: PlayerChoiceType.NEGOTIATE,
        outcomes: [
          {
            id: 'out_truth',
            text: '他断断续续地告诉你，他是被同门偷袭，抢了秘境中获得的宝物。"那些人...还在附近..."',
            weight: 50,
            effects: [
              { type: 'exp', value: 50, description: '获得修为 50（了解内情）' },
            ],
          },
          {
            id: 'out_lie',
            text: '他眼神闪烁，说话前后矛盾。你敏锐地察觉到——他在撒谎！',
            weight: 50,
            effects: [
              { type: 'exp', value: 30, description: '获得修为 30（增长见识）' },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'ev_business_offer',
    type: WorldEventType.NPC_SECRET_DEAL,
    title: '黑市商人',
    description: '一个戴着斗笠的神秘人从巷子里探出头来，向你招手："这位道友，我这里有些紧俏货，价格公道，要不要看看？"他的声音压得很低。',
    dangerLevel: EventDangerLevel.LOW,
    weight: 8,
    isSafeZoneAllowed: true,
    terrainTypes: ['平原', '特殊'],
    choices: [
      {
        id: 'ch_look',
        text: '看看他卖些什么',
        type: PlayerChoiceType.ACCEPT,
        outcomes: [
          {
            id: 'out_good_deal',
            text: '他从储物戒指里拿出几样东西，居然都是真货！而且价格比市价低三成。你忍不住买了几样。',
            weight: 40,
            effects: [
              { type: 'gold', value: -400, description: '花费灵石 400' },
              { type: 'item', value: 'rare_herb', description: '获得稀有灵草 x2' },
              { type: 'item', value: 'mid_grade_pill', description: '获得中品丹药 x1' },
            ],
          },
          {
            id: 'out_fake',
            text: '你买了几样东西，回去仔细一看，居然都是伪造的假货！那个商人早就没影了。',
            weight: 35,
            effects: [
              { type: 'gold', value: -300, description: '被骗灵石 300' },
              { type: 'favorability', target: 'black_market_merchant', value: -20, description: '黑市商人好感-20' },
            ],
          },
          {
            id: 'out_stolen',
            text: '东西倒是真的，但你刚买完，就有几个修士拦住你："这是我们失窃的宝物！你和那窃贼是一伙的！"',
            weight: 25,
            effects: [
              { type: 'gold', value: -200, description: '被迫赔偿灵石 200' },
              { type: 'item', value: 'stolen_goods', description: '购买的物品被没收' },
              { type: 'reputation', value: 'cunning', description: '获得【狡猾】名声' },
            ],
          },
        ],
      },
      {
        id: 'ch_refuse',
        text: '来路不明的东西，还是不买了',
        type: PlayerChoiceType.REFUSE,
        outcomes: [
          {
            id: 'out_leave',
            text: '你摇了摇头，径直走开。身后传来那商人的嘀咕声："又一个胆小鬼..."',
            weight: 70,
            effects: [],
          },
          {
            id: 'out_threat',
            text: '见你不买，那商人的语气冷了下来："你看了我的货，不买就想走？"但他最终也没敢动手，只是恨恨地看着你离开。',
            weight: 30,
            effects: [
              { type: 'favorability', target: 'black_market_merchant', value: -10, description: '黑市商人好感-10' },
            ],
          },
        ],
      },
      {
        id: 'ch_report',
        text: '形迹可疑，去向城卫举报',
        type: PlayerChoiceType.BETRAY,
        outcomes: [
          {
            id: 'out_reward',
            text: '城卫根据你的线索，成功抓住了那个黑市商人。经查，他果然是通缉犯！城卫赏了你一笔赏金。',
            weight: 50,
            effects: [
              { type: 'gold', value: 500, description: '获得赏金 500' },
              { type: 'reputation', value: 'noble', description: '获得【高尚】名声' },
              { type: 'favorability', target: 'black_market_merchant', value: -60, description: '黑市商人好感-60' },
            ],
          },
          {
            id: 'out_no_evidence',
            text: '城卫去的时候，那人已经跑了。没有证据，城卫也没办法，只是感谢了你的热心。',
            weight: 50,
            effects: [
              { type: 'exp', value: 30, description: '获得修为 30' },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'ev_spirit_beast_cub',
    type: WorldEventType.SPIRIT_BEAST,
    title: '灵兽幼崽',
    description: '草丛里传来嘤嘤的叫声，你走近一看，是一只毛茸茸的灵兽幼崽。它的腿受了伤，可怜巴巴地看着你。不远处，一只死去的成年灵兽倒在血泊中，似乎是它的母亲。',
    dangerLevel: EventDangerLevel.LOW,
    weight: 10,
    isSafeZoneAllowed: false,
    terrainTypes: ['密林', '山脉', '平原'],
    choices: [
      {
        id: 'ch_adopt',
        text: '好可怜，收养它吧',
        type: PlayerChoiceType.HELP,
        outcomes: [
          {
            id: 'out_bond',
            text: '你给幼崽包扎好伤口，喂它食物。它蹭了蹭你的手心，眼中满是依赖。从此，它就是你的伙伴了。',
            weight: 60,
            effects: [
              { type: 'unlock', value: 'spirit_beast_companion', description: '解锁灵兽伙伴' },
              { type: 'item', value: 'spirit_beast_cub', description: '获得灵兽幼崽' },
              { type: 'favorability', target: 'spirit_beast', value: 30, description: '灵兽好感+30' },
            ],
          },
          {
            id: 'out_mother_back',
            text: '你刚抱起幼崽，远处就传来一声咆哮！那成年灵兽没死！它气势汹汹地冲了过来，你只好放下幼崽赶紧跑。',
            weight: 40,
            effects: [
              { type: 'hp', value: -20, description: '逃跑时摔伤，损失气血 20' },
            ],
          },
        ],
      },
      {
        id: 'ch_sell',
        text: '灵兽幼崽值不少钱，带走卖了',
        type: PlayerChoiceType.BETRAY,
        outcomes: [
          {
            id: 'out_sell_good',
            text: '你把幼崽带到灵兽店，老板眼睛都亮了："好品相！"给了你一个很高的价钱。',
            weight: 60,
            effects: [
              { type: 'gold', value: 800, description: '获得灵石 800' },
              { type: 'reputation', value: 'greedy', description: '获得【贪婪】名声' },
            ],
          },
          {
            id: 'out_mother_angry',
            text: '你刚抓住幼崽，那成年灵兽就从树上扑了下来！原来它是在装死！你扔下幼崽狼狈逃窜。',
            weight: 40,
            effects: [
              { type: 'hp', value: -50, description: '被灵兽抓伤，损失气血 50' },
              { type: 'debuff', value: 'beast_mark', description: '【灵兽标记】debuff' },
            ],
          },
        ],
      },
      {
        id: 'ch_leave',
        text: '物竞天择，不要干涉',
        type: PlayerChoiceType.FLEE,
        outcomes: [
          {
            id: 'out_pity',
            text: '你叹了口气，转身离开。身后幼崽的叫声越来越弱...道心莫名地有些波动。',
            weight: 100,
            effects: [
              { type: 'exp', value: 20, description: '获得修为 20（道心磨炼）' },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'ev_ancient_ruin',
    type: WorldEventType.ANCIENT_RUIN,
    title: '古遗迹入口',
    description: '藤蔓掩映之下，一座古老的石门半开着。门上刻满了不知名的符文，散发着幽幽的光芒。里面似乎传来若有若无的灵气波动。',
    dangerLevel: EventDangerLevel.HIGH,
    weight: 6,
    minRealm: 3,
    isSafeZoneAllowed: false,
    terrainTypes: ['废墟', '山脉', '密林', '洞穴'],
    choices: [
      {
        id: 'ch_enter',
        text: '进去探索一番',
        type: PlayerChoiceType.ACCEPT,
        outcomes: [
          {
            id: 'out_treasure_room',
            text: '你小心翼翼地穿过机关，来到一间保存完好的石室。里面摆放着几具灵石和一部上古功法的残卷！',
            weight: 25,
            effects: [
              { type: 'gold', value: 1200, description: '获得灵石 1200' },
              { type: 'item', value: 'ancient_technique', description: '获得上古残卷' },
              { type: 'exp', value: 400, description: '获得修为 400' },
            ],
          },
          {
            id: 'out_trap_hall',
            text: '"轰隆！"你踩中了机关，箭雨从四面射来！你拼死抵挡，虽然冲了过去，但也伤痕累累。',
            weight: 35,
            effects: [
              { type: 'hp', value: -60, description: '损失气血 60' },
              { type: 'gold', value: 300, description: '获得灵石 300' },
              { type: 'item', value: 'ancient_fragment', description: '获得古物碎片' },
            ],
          },
          {
            id: 'out_guardian',
            text: '遗迹深处有一只石像守卫苏醒了！它实力强横，你苦战一番才将其击败。掉落了一些好东西。',
            weight: 25,
            effects: [
              { type: 'hp', value: -45, description: '损失气血 45' },
              { type: 'item', value: 'stone_core', description: '获得石之核心' },
              { type: 'exp', value: 300, description: '获得修为 300' },
            ],
          },
          {
            id: 'out_curse',
            text: '你在遗迹深处发现了一座祭坛。祭坛上放着一颗发光的珠子。你刚碰到珠子，一股阴冷之气便钻入体内。',
            weight: 15,
            effects: [
              { type: 'item', value: 'cursed_bead', description: '获得诅咒之珠' },
              { type: 'debuff', value: 'ancient_curse', description: '【古老诅咒】debuff' },
              { type: 'exp', value: 100, description: '获得修为 100' },
            ],
          },
        ],
      },
      {
        id: 'ch_explore_outside',
        text: '太危险了，只在外围看看',
        type: PlayerChoiceType.OBSERVE,
        outcomes: [
          {
            id: 'out_pickup',
            text: '你在遗迹外围转了一圈，捡到了一些散落的灵石和一枚锈迹斑斑的令牌。',
            weight: 70,
            effects: [
              { type: 'gold', value: 150, description: '获得灵石 150' },
              { type: 'item', value: 'rusty_token', description: '获得生锈令牌' },
            ],
          },
          {
            id: 'out_other_people',
            text: '遗迹外围还有其他几个修士在搜寻。有人恶狠狠地瞪了你一眼："这地方我们包了，滚！"',
            weight: 30,
            effects: [
              { type: 'favorability', target: 'rival_cultivators', value: -15, description: '敌对修士好感-15' },
            ],
          },
        ],
      },
      {
        id: 'ch_leave',
        text: '太危险了，不进去',
        type: PlayerChoiceType.FLEE,
        outcomes: [
          {
            id: 'out_watch',
            text: '你在远处观望了一会儿。陆续有其他修士进入遗迹，有的满载而归，有的被抬了出来。修仙界，果然步步惊心。',
            weight: 100,
            effects: [
              { type: 'exp', value: 40, description: '获得修为 40（增长见识）' },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'ev_frame_up',
    type: WorldEventType.NPC_FRAME_UP,
    title: '栽赃陷害',
    description: '你正在街上走着，忽然一个修士撞了你一下，然后大喊："抓小偷！他偷了我的储物袋！"很快就有城卫围了过来。',
    dangerLevel: EventDangerLevel.MEDIUM,
    weight: 8,
    isSafeZoneAllowed: true,
    terrainTypes: ['平原', '特殊'],
    choices: [
      {
        id: 'ch_explain',
        text: '冷静解释，证明清白',
        type: PlayerChoiceType.NEGOTIATE,
        outcomes: [
          {
            id: 'out_proven',
            text: '你不慌不忙，让城卫检查双方储物袋，并指出那人身上的破绽。城卫查明真相，将那人带走了。"好眼力，道友。"城卫队长向你点头。',
            weight: 50,
            effects: [
              { type: 'reputation', value: 'wise', description: '获得【睿智】名声' },
              { type: 'favorability', target: 'city_guard', value: 15, description: '城卫好感+15' },
              { type: 'gold', value: 100, description: '获得赏金 100' },
            ],
          },
          {
            id: 'out_circumstantial',
            text: '虽然你极力辩解，但人证物证俱在。城卫将信将疑，最后罚了你一笔灵石了事。"下次注意点。"',
            weight: 50,
            effects: [
              { type: 'gold', value: -200, description: '被罚灵石 200' },
              { type: 'reputation', value: 'cunning', description: '获得【狡猾】名声（负面）' },
            ],
          },
        ],
      },
      {
        id: 'ch_run',
        text: '三十六计走为上，跑！',
        type: PlayerChoiceType.FLEE,
        outcomes: [
          {
            id: 'out_escape',
            text: '你身形一闪，几个起落便消失在巷子里。虽然洗脱不了嫌疑，但至少没被抓住。不过，你在这座城的名声算是臭了。',
            weight: 60,
            effects: [
              { type: 'reputation', value: 'cunning', description: '获得【狡猾】名声' },
              { type: 'favorability', target: 'city_guard', value: -20, description: '城卫好感-20' },
            ],
          },
          {
            id: 'out_caught',
            text: '你没跑几步，就被一个实力更强的城卫截住了。"还敢跑？罪加一等！"',
            weight: 40,
            effects: [
              { type: 'gold', value: -500, description: '被罚灵石 500' },
              { type: 'hp', value: -20, description: '被擒拿时挣扎受伤' },
              { type: 'debuff', value: 'city_wanted', description: '【城中通缉】debuff' },
            ],
          },
        ],
      },
      {
        id: 'ch_confront',
        text: '反将一军，指出他是栽赃',
        type: PlayerChoiceType.BETRAY,
        outcomes: [
          {
            id: 'out_flip',
            text: '你冷笑一声，当众指出那人腰间的伤痕和手法，正是近日城里连环盗窃案的特征。那人脸色大变，转身想跑，被城卫当场拿下。',
            weight: 45,
            effects: [
              { type: 'gold', value: 300, description: '获得赏金 300' },
              { type: 'reputation', value: 'wise', description: '获得【睿智】名声' },
              { type: 'favorability', target: 'city_guard', value: 25, description: '城卫好感+25' },
              { type: 'favorability', target: 'thief', value: -40, description: '窃贼好感-40' },
            ],
          },
          {
            id: 'out_backfire',
            text: '你反咬一口，但那人早有准备，反而拿出更多"证据"。围观的人都对你指指点点。',
            weight: 55,
            effects: [
              { type: 'gold', value: -300, description: '被罚灵石 300' },
              { type: 'reputation', value: 'villainous', description: '获得【卑劣】名声' },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'ev_celestial_phenomenon',
    type: WorldEventType.CELESTIAL_PHENOMENON,
    title: '天降异象',
    description: '天空中忽然出现七彩祥云，仙气缭绕。一道光柱从天而降，落在不远处的山中。看样子，是有宝物出世了！',
    dangerLevel: EventDangerLevel.HIGH,
    weight: 5,
    minRealm: 2,
    isSafeZoneAllowed: true,
    terrainTypes: ['山脉', '平原', '密林'],
    choices: [
      {
        id: 'ch_rush',
        text: '快！宝物有德者居之，赶紧去抢！',
        type: PlayerChoiceType.ATTACK,
        outcomes: [
          {
            id: 'out_first',
            text: '你速度极快，第一个赶到光柱所在地。光柱中央悬浮着一颗灵珠。你一把抓住，收入囊中！',
            weight: 20,
            effects: [
              { type: 'item', value: 'celestial_spirit_pearl', description: '获得天运灵珠' },
              { type: 'exp', value: 500, description: '获得修为 500' },
              { type: 'buff', value: 'heaven_favor', description: '【天眷】buff' },
            ],
          },
          {
            id: 'out_fight',
            text: '等你赶到时，已经有好几个修士在争抢了。你加入战团，虽然抢到了一些东西，但也受了伤。',
            weight: 50,
            effects: [
              { type: 'hp', value: -55, description: '损失气血 55' },
              { type: 'gold', value: 400, description: '获得灵石 400' },
              { type: 'item', value: 'celestial_fragment', description: '获得天物碎片' },
            ],
          },
          {
            id: 'out_late',
            text: '等你赶到时，宝物早被人抢走了。只剩下一片狼藉的战场，和几具尸体。',
            weight: 30,
            effects: [
              { type: 'exp', value: 50, description: '获得修为 50' },
            ],
          },
        ],
      },
      {
        id: 'ch_observe',
        text: '先观望，看看情况再说',
        type: PlayerChoiceType.OBSERVE,
        outcomes: [
          {
            id: 'out_opportunity',
            text: '你躲在暗处观察。等最强的那个修士抢到宝物、身受重伤时，你突然出手...螳螂捕蝉，黄雀在后！',
            weight: 35,
            effects: [
              { type: 'gold', value: 600, description: '获得灵石 600' },
              { type: 'item', value: 'celestial_spirit_pearl', description: '获得天运灵珠' },
              { type: 'reputation', value: 'cunning', description: '获得【狡诈】名声' },
            ],
          },
          {
            id: 'out_powerful',
            text: '抢到宝物的那个修士实力太强了，你根本没有机会。你只能眼睁睁看着他扬长而去。',
            weight: 40,
            effects: [
              { type: 'exp', value: 80, description: '获得修为 80（增长见识）' },
            ],
          },
          {
            id: 'out_found',
            text: '"谁在那里！"一个修士发现了你，向你攻了过来。你只好应战。',
            weight: 25,
            effects: [
              { type: 'hp', value: -30, description: '损失气血 30' },
              { type: 'gold', value: 150, description: '击败修士获得灵石 150' },
            ],
          },
        ],
      },
      {
        id: 'ch_ignore',
        text: '与我无关，继续赶路',
        type: PlayerChoiceType.FLEE,
        outcomes: [
          {
            id: 'out_wise',
            text: '你没有去凑热闹。后来你听说，为了那件宝物死了十几个修士，抢到宝物的人也被追杀了千里。祸福相依，古人诚不我欺。',
            weight: 100,
            effects: [
              { type: 'exp', value: 60, description: '获得修为 60（道心增长）' },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'ev_poisoned_tea',
    type: WorldEventType.NPC_POISONING,
    title: '茶摊迷局',
    description: '路边的茶摊上，一位热情的老板娘招呼你过去："这位道友，走累了吧？喝杯茶歇口气！"茶香四溢，但你总觉得哪里不太对劲。',
    dangerLevel: EventDangerLevel.MEDIUM,
    weight: 8,
    isSafeZoneAllowed: false,
    terrainTypes: ['平原', '山脉'],
    choices: [
      {
        id: 'ch_drink',
        text: '多谢老板娘，来一碗',
        type: PlayerChoiceType.ACCEPT,
        outcomes: [
          {
            id: 'out_fine',
            text: '茶是好茶，清凉解渴。老板娘笑盈盈地收下你的铜板。"常来啊！"',
            weight: 40,
            effects: [
              { type: 'hp', value: 20, description: '恢复气血 20' },
              { type: 'mana', value: 20, description: '恢复法力 20' },
              { type: 'gold', value: -10, description: '花费灵石 10' },
            ],
          },
          {
            id: 'out_poisoned',
            text: '茶水下肚，你忽然觉得头晕目眩。"嘿嘿嘿..."老板娘露出了诡异的笑容。你昏倒前看到她拿出了一把刀...',
            weight: 35,
            effects: [
              { type: 'hp', value: -40, description: '损失气血 40' },
              { type: 'gold', value: -300, description: '被洗劫灵石 300' },
              { type: 'debuff', value: 'poisoned', description: '【中毒】debuff' },
            ],
          },
          {
            id: 'out_drug',
            text: '你喝完茶，感觉浑身燥热...再看那老板娘，正含情脉脉地看着你。"小哥哥，不如到里屋歇歇？"',
            weight: 25,
            effects: [
              { type: 'gold', value: -200, description: '花费灵石 200' },
              { type: 'debuff', value: 'weakened', description: '【虚弱】debuff（透支）' },
              { type: 'exp', value: 40, description: '获得修为 40（采阴补阳？）' },
            ],
          },
        ],
      },
      {
        id: 'ch_test_poison',
        text: '银针试毒，看看有没有问题',
        type: PlayerChoiceType.SEARCH,
        outcomes: [
          {
            id: 'out_clean',
            text: '你用银针试了试，没问题。老板娘撇撇嘴："疑心还挺重。"你有些尴尬地付了钱喝茶。',
            weight: 50,
            effects: [
              { type: 'hp', value: 15, description: '恢复气血 15' },
              { type: 'gold', value: -10, description: '花费灵石 10' },
              { type: 'favorability', target: 'tea_lady', value: -5, description: '老板娘好感-5' },
            ],
          },
          {
            id: 'out_clever',
            text: '银针果然变黑了！你冷笑一声，掀翻了茶摊。老板娘见势不妙，转身就跑。',
            weight: 50,
            effects: [
              { type: 'exp', value: 60, description: '获得修为 60（增长阅历）' },
              { type: 'favorability', target: 'tea_lady', value: -40, description: '老板娘好感-40' },
            ],
          },
        ],
      },
      {
        id: 'ch_refuse',
        text: '多谢好意，我不渴',
        type: PlayerChoiceType.REFUSE,
        outcomes: [
          {
            id: 'out_normal',
            text: '你婉言谢绝，继续赶路。身后传来老板娘的嘀咕："又一个穷鬼..."',
            weight: 100,
            effects: [],
          },
        ],
      },
    ],
  },
];

export function getWeightedRandomEvent(
  terrain: string,
  realm: number,
  isSafeZone: boolean,
): IWorldEventTemplate | null {
  const eligible = WORLD_EVENT_TEMPLATES.filter(e => {
    if (e.minRealm && realm < e.minRealm) return false;
    if (e.maxRealm && realm > e.maxRealm) return false;
    if (!e.isSafeZoneAllowed && isSafeZone) return false;
    if (e.terrainTypes && e.terrainTypes.length > 0 && !e.terrainTypes.includes(terrain)) return false;
    return true;
  });

  if (eligible.length === 0) return null;

  const totalWeight = eligible.reduce((sum, e) => sum + e.weight, 0);
  let random = Math.random() * totalWeight;

  for (const event of eligible) {
    random -= event.weight;
    if (random <= 0) return event;
  }

  return eligible[0];
}

export function resolveChoiceOutcome(choice: any): any {
  const totalWeight = choice.outcomes.reduce((sum: number, o: any) => sum + o.weight, 0);
  let random = Math.random() * totalWeight;

  for (const outcome of choice.outcomes) {
    random -= outcome.weight;
    if (random <= 0) return outcome;
  }

  return choice.outcomes[0];
}
