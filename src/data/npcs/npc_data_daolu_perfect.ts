import { IDaoLu, DaoLuFactionType, DUAL_CULTIVATION_POSE_TEMPLATES, DAO_LU_INTERACTION_TEMPLATES } from '../../domain/entities/DaoLu';
import { INPCDialogue } from '../../domain/entities/NPC';
import { IPlayer } from '../../domain/entities/Player';

export const PERFECT_WORLD_DAOLU: IDaoLu[] = [
  {
    id: 'daolu_huolinger',
    name: '火灵儿',
    title: '火国公主',
    description: '一位身穿火红长裙的少女，眉目如画，肤若凝脂。她周身缭绕着淡淡的火焰灵光，宛如火中精灵。一双明眸热情而坚毅，举手投足间既有公主的高贵，又不失少女的纯真。',
    greeting: '火灵儿转过身，火焰般的长发随风轻扬，嫣然一笑："你来了？快来，我刚从火桑林采了些灵果，一起尝尝吧。"',
    roomId: 'fire_city_imperial_palace',
    dialogues: [
      { id: 'huolinger_fire_sang', topic: '火桑林', text: '"火桑林是我最喜欢的地方。"火灵儿望向远方，眼中闪过温柔："那里的火桑叶如同燃烧的火焰，风一吹，漫天火红，美极了。传说在火桑林深处，有一株万年火桑神树。"' },
      { id: 'huolinger_princess', topic: '火国公主', text: '"公主的身份看似荣耀，实则束缚。"火灵儿轻叹一声："从小我便被教导要以火国为重。但遇见你之后，我才明白，有些感情比皇权更重要。"' },
      { id: 'huolinger_cultivation', topic: '火道修炼', text: '"火国以火道立世，我修炼的乃是《朱雀真火诀》。"火灵儿掌心浮现一缕赤红火焰："此火可焚尽万物，亦可温暖人心。关键在于掌控它的人。"' },
    ] as INPCDialogue[],
    faction: {
      name: '火国皇族',
      type: DaoLuFactionType.DYNASTY,
      description: '火国是下界八大域中的强大皇朝，以火道立世，传承久远。火皇乃是一代雄主，统御火国万民。',
      power: '火国皇朝',
      location: '火皇城',
      leader: '火皇',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'story_huolinger_1',
        title: '火桑林初遇',
        requiredIntimacy: 0,
        description: '你在火桑林深处偶遇正在采摘火桑叶的火灵儿。她一身红裙，在漫天火红的桑叶间格外醒目。见你到来，她警惕地后退一步，但很快露出笑容。',
        choices: [
          {
            text: '称赞火桑林的美景',
            effect: (player: IPlayer) => ({
              messages: ['火灵儿眼睛一亮："你也喜欢火桑林？这里是我心中的圣地。"她主动拉起你的手："来，我带你去看看最美的那片林子。"'],
              intimacyChange: 10,
            }),
          },
          {
            text: '询问她是否需要帮助',
            effect: (player: IPlayer) => ({
              messages: ['火灵儿微微一笑："你倒是个热心人。我在采集火桑叶炼制丹药，确实需要有人帮忙采摘高处的叶子。"'],
              intimacyChange: 5,
            }),
          },
          {
            text: '默默观察，保持距离',
            effect: (player: IPlayer) => ({
              messages: ['火灵儿看了你一眼，有些困惑，但也没有多言。气氛略显尴尬。'],
              intimacyChange: 2,
            }),
          },
        ],
      },
      {
        id: 'story_huolinger_2',
        title: '火国危机',
        requiredIntimacy: 50,
        description: '火国突遭敌国入侵，火皇闭关未出，朝中大乱。火灵儿身为公主，主动请缨前往前线督战。你得知消息后，急忙赶往火皇城。',
        choices: [
          {
            text: '主动提出随她一同出征',
            effect: (player: IPlayer) => ({
              messages: ['火灵儿怔怔地看着你，眼眶微红："你...愿意为我涉险？"她深吸一口气，郑重地点头："好！有你在身边，我什么都不怕。"'],
              intimacyChange: 20,
              reward: '火国战旗',
            }),
          },
          {
            text: '帮她稳固后方，保护百姓',
            effect: (player: IPlayer) => ({
              messages: ['火灵儿感动地点头："后方确实更需要你。百姓是无辜的，请你保护好他们。"她转身离去时，回头深深看了你一眼。'],
              intimacyChange: 15,
              reward: '火灵护符',
            }),
          },
          {
            text: '去寻找火皇出关',
            effect: (player: IPlayer) => ({
              messages: ['火灵儿眼中闪过复杂神色："父亲闭关之地乃是禁地...但你说得对，只有父亲出关才能化解危机。拜托你了。"'],
              intimacyChange: 10,
            }),
          },
        ],
      },
      {
        id: 'story_huolinger_3',
        title: '安澜之劫',
        requiredIntimacy: 200,
        description: '异域不朽之王安澜跨界而来，火灵儿为救苍生，自愿被掳至异域。你在生死关头赶到，却眼睁睁看着她消失在空间裂缝中。',
        choices: [
          {
            text: '发誓无论天涯海角都要找到她',
            effect: (player: IPlayer) => ({
              messages: ['火灵儿在消失前听到你的誓言，泪流满面："我等你...无论多久，我都等你..."这一等，便是两百万年。'],
              intimacyChange: 50,
              reward: '执念之种',
            }),
          },
          {
            text: '燃烧精血，试图阻止空间裂缝',
            effect: (player: IPlayer) => ({
              messages: ['你燃烧精血，爆发出惊人战力，却仍无法阻止安澜。火灵儿哭喊着："不要！不要为了我送命！活下去！"'],
              intimacyChange: 30,
            }),
          },
          {
            text: '冷静思考，寻找异域坐标',
            effect: (player: IPlayer) => ({
              messages: ['你强行冷静下来，在空间裂缝闭合前捕捉到了一丝异域坐标。火灵儿最后看你的那一眼，充满了信任与期盼。'],
              intimacyChange: 25,
              reward: '异域坐标碎片',
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
    firstMeeting: '火桑林中，红叶漫天。一位红裙少女在林间翩翩起舞，火焰般的长发随风飞扬。她回眸一笑，仿佛整片火桑林都为之失色。',
    backgroundStory: '火灵儿，火国公主，火皇最疼爱的女儿。自幼在火国皇宫长大，修炼《朱雀真火诀》，性格热情开朗，坚韧不拔。曾在火桑林与荒天帝石昊相识，结下深厚情缘。后因异域入侵被掳至异域，历经两百万年岁月，最终在仙域与石昊重逢。她的一生，是等待与坚守的一生，也是火桑花般绚烂而执着的一生。',
    personalityTraits: ['热情开朗', '坚韧不拔', '重情重义'],
    likes: ['火桑叶', '朱雀果', '火属性灵材', '火桑林'],
    dislikes: ['背叛', '冷漠', '水域', '寒冰'],
    favoriteGifts: ['万年火桑叶', '朱雀真血', '火桑花簪'],
  },

  {
    id: 'daolu_yunxi',
    name: '云曦',
    title: '天人族明珠',
    description: '一位身穿淡紫色长裙的女子，气质温婉如水，眉目间带着淡淡的忧郁。她肤若凝脂，发如乌云，额间有一枚淡淡的天人印记，散发着柔和的灵光。她静静地站在花丛中，宛如一幅水墨画卷。',
    greeting: '云曦微微抬眸，露出温柔的笑意："你来了。我刚采了些灵花，正想着要不要酿些花茶。你若不嫌弃，留下来品一杯吧。"',
    roomId: 'stone_nation_yuhua_yuan',
    dialogues: [
      { id: 'yunxi_tianren', topic: '天人族', text: '"天人族是上界的大族，传承自仙古纪元。"云曦轻抚额间印记："这天人印记既是荣耀，也是枷锁。它代表着血脉的纯净，也意味着责任的沉重。"' },
      { id: 'yunxi_flower', topic: '灵花', text: '"这些灵花名为「紫云英」，只在灵气充裕之地生长。"云曦小心地采摘一朵："用它泡的茶可以静心宁神，对修炼大有裨益。"' },
      { id: 'yunxi_wish', topic: '她的心愿', text: '"我的心愿？"云曦望向天空："我只希望天人族能够繁荣昌盛，族人不再受异域欺凌。至于我自己...能有一个知心人相伴，便足够了。"' },
    ] as INPCDialogue[],
    faction: {
      name: '天人族',
      type: DaoLuFactionType.CLAN,
      description: '上界传承久远的大族，血脉高贵，额生天人印记。族中强者如云，曾出过真仙级存在。',
      power: '天人族祖地',
      location: '上界天州',
      leader: '天人族老祖',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'story_yunxi_1',
        title: '百断山相逢',
        requiredIntimacy: 0,
        description: '你在百断山秘境中偶遇正在采摘灵药的云曦。她一身淡紫长裙，在花丛中若隐若现。察觉到你的气息，她警觉地抬起头，手中捏着一道法诀。',
        choices: [
          {
            text: '表明自己没有恶意',
            effect: (player: IPlayer) => ({
              messages: ['云曦仔细观察你片刻，缓缓放下法诀："你身上没有杀气，倒是我过于紧张了。这百断山危机四伏，你一个人也要小心。"'],
              intimacyChange: 10,
            }),
          },
          {
            text: '夸赞她的美貌',
            effect: (player: IPlayer) => ({
              messages: ['云曦脸颊微红，低声道："登徒子...不过，看在你眼光不错的份上，不与你计较。"她嘴角却微微上扬。'],
              intimacyChange: 5,
            }),
          },
          {
            text: '询问是否需要同行',
            effect: (player: IPlayer) => ({
              messages: ['云曦犹豫了一下："同行...也好。百断山确实危险，多一个人多一份照应。但你要是敢有歹意，我绝不会手软。"'],
              intimacyChange: 8,
            }),
          },
        ],
      },
      {
        id: 'story_yunxi_2',
        title: '天人族之变',
        requiredIntimacy: 50,
        description: '天人族突遭异域袭击，族中老祖重伤。云曦身为族中明珠，被迫承担起重任。你赶到天人族祖地时，她正独自站在祖祠前，背影单薄而倔强。',
        choices: [
          {
            text: '承诺会帮她守护天人族',
            effect: (player: IPlayer) => ({
              messages: ['云曦转身看着你，泪水在眼眶中打转："为什么...为什么要对我这么好？"她扑入你怀中，泣不成声。'],
              intimacyChange: 25,
              reward: '天人族客卿令牌',
            }),
          },
          {
            text: '帮她寻找救治老祖的方法',
            effect: (player: IPlayer) => ({
              messages: ['云曦擦干眼泪，郑重地向你行了一礼："若能救回老祖，你便是天人族永远的恩人。此恩，云曦永世不忘。"'],
              intimacyChange: 20,
              reward: '仙古药方残卷',
            }),
          },
          {
            text: '默默陪伴在她身边',
            effect: (player: IPlayer) => ({
              messages: ['你没有说话，只是静静地站在她身旁。云曦感受到了你的陪伴，紧锁的眉头渐渐舒展："有你在，我便有了勇气。"'],
              intimacyChange: 15,
            }),
          },
        ],
      },
      {
        id: 'story_yunxi_3',
        title: '帝关之约',
        requiredIntimacy: 200,
        description: '帝关之战爆发，云曦为助你一臂之力，不惜燃烧天人精血。战后，她虚弱地倒在你怀中，却露出了欣慰的笑容。',
        choices: [
          {
            text: '立下誓言，此生不负',
            effect: (player: IPlayer) => ({
              messages: ['云曦眼中泪光闪烁："我等你这句话...等了好久。"她紧紧握住你的手："此生有你，足矣。"'],
              intimacyChange: 50,
              reward: '天人同心结',
            }),
          },
          {
            text: '为她寻找恢复精血的方法',
            effect: (player: IPlayer) => ({
              messages: ['云曦摇头："不必为我费心...能为你做些什么，我很开心。"你坚持要为她寻药，她感动得无以复加。'],
              intimacyChange: 30,
              reward: '血菩提',
            }),
          },
          {
            text: '紧紧抱住她，什么都不说',
            effect: (player: IPlayer) => ({
              messages: ['你紧紧抱住她，感受着她微弱的体温。云曦在你怀中轻轻闭上眼睛，嘴角带着幸福的笑意。'],
              intimacyChange: 25,
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
    firstMeeting: '百断山花海之中，一位紫衣少女正在采摘灵花。阳光透过树叶洒在她身上，额间的天人印记散发着柔和的光芒。她抬头与你对视，那一眼，仿佛穿越了千年。',
    backgroundStory: '云曦，天人族明珠，上界天州最耀眼的女子之一。额生天人印记，血脉高贵纯净。曾在百断山与石昊相遇，后又在上界重逢。她温柔善良，善解人意，为了守护天人族和心爱之人，不惜燃烧精血，战至最后一刻。她是石昊明媒正娶的妻子，陪伴他走过了最艰难的岁月，诞下帝子石凡。',
    personalityTraits: ['温柔善良', '聪慧坚韧', '善解人意'],
    likes: ['紫云英', '灵花茶', '天人族古籍', '宁静的夜晚'],
    dislikes: ['战争', '背叛', '喧嚣', '血腥'],
    favoriteGifts: ['天人族古籍', '紫云英花簪', '静心玉佩'],
  },

  {
    id: 'daolu_qingyi',
    name: '清漪',
    title: '补天教圣女',
    description: '一位身穿素白长裙的女子，气质清冷如月，不食人间烟火。她眉目如画，却带着拒人千里的寒意。周身有淡淡的月华流转，仿佛九天仙子临凡。然而在她眼底深处，却藏着一丝不易察觉的温柔。',
    greeting: '清漪缓缓转身，月华般的目光落在你身上，声音清冷："你来了。我正好有修炼上的疑惑，不知你可愿与我探讨？"',
    roomId: 'stone_city_spirit_pavilion',
    dialogues: [
      { id: 'qingyi_butian', topic: '补天教', text: '"补天教传承自仙古纪元，以补天之术立教。"清漪语气平淡："教主号称能补苍天，实则不过是借天地之力修炼己身。我身为圣女，不过是教中棋子罢了。"' },
      { id: 'qingyi_moon', topic: '月婵主身', text: '"月婵是我的主身，我是她的次身。"清漪眼中闪过复杂神色："主次身合一，便能登临绝巅。但我已不愿再做他人的附庸...我要走自己的路。"' },
      { id: 'qingyi_cultivation', topic: '清月诀', text: '"我修炼的《清月诀》讲究心如止水，明月照大江。"清漪指尖浮现一轮月华："此法可净化心魔，但也会让人愈发清冷。你说，这是福是祸？"' },
    ] as INPCDialogue[],
    faction: {
      name: '补天教',
      type: DaoLuFactionType.SECT,
      description: '上界传承久远的大教，以补天之术闻名。教中强者如云，圣女月婵（清漪）号称上界第一仙子。',
      power: '补天教总坛',
      location: '上界',
      leader: '补天教教主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'story_qingyi_1',
        title: '石城初会',
        requiredIntimacy: 0,
        description: '你在石城灵驿偶遇正在等待传送阵的清漪。她一身白衣，在人群中格外醒目。周围的修士纷纷侧目，却无人敢上前搭话。',
        choices: [
          {
            text: '以修炼心得为话题搭话',
            effect: (player: IPlayer) => ({
              messages: ['清漪微微侧目："你对《清月诀》也有研究？倒是难得。"她的态度虽然依旧清冷，但眼中多了一丝兴趣。'],
              intimacyChange: 10,
            }),
          },
          {
            text: '称赞她的气质',
            effect: (player: IPlayer) => ({
              messages: ['清漪淡淡地看了你一眼："世人皆爱皮囊，你也不例外。"话虽如此，她却没有离开，似乎对你的坦然有些意外。'],
              intimacyChange: 5,
            }),
          },
          {
            text: '询问她是否在等人',
            effect: (player: IPlayer) => ({
              messages: ['清漪摇头："我在等一个人，但他不会来了。"她语气平淡，却透着一丝落寞。'],
              intimacyChange: 8,
            }),
          },
        ],
      },
      {
        id: 'story_qingyi_2',
        title: '主次身之争',
        requiredIntimacy: 50,
        description: '月婵主身降临，要求清漪与她合一。清漪不愿放弃自我，与之激战。你感应到波动赶来，只见两道白衣身影在空中交锋，月华与剑气纵横。',
        choices: [
          {
            text: '站在清漪这边，助她对抗主身',
            effect: (player: IPlayer) => ({
              messages: ['清漪看到你站在她身旁，眼中闪过一丝感动："你可知与月婵为敌，便是与整个补天教为敌？"她咬了咬唇："但...谢谢你。"'],
              intimacyChange: 25,
              reward: '月华剑意',
            }),
          },
          {
            text: '试图调解，寻找两全之法',
            effect: (player: IPlayer) => ({
              messages: ['月婵冷笑："区区凡人，也敢插手我补天教事务？"但清漪却拦住了她："他是一片好意...让我与他谈谈。"'],
              intimacyChange: 15,
            }),
          },
          {
            text: '暗中布阵，助清漪脱身',
            effect: (player: IPlayer) => ({
              messages: ['你暗中布置传送阵，助清漪脱离战场。清漪深深看了你一眼："此恩，我记下了。"她的身影消失在光芒中，只留下一缕幽香。'],
              intimacyChange: 20,
              reward: '传送阵符',
            }),
          },
        ],
      },
      {
        id: 'story_qingyi_3',
        title: '青月焰之约',
        requiredIntimacy: 200,
        description: '清漪为修炼青月焰，深入焚天之地。你得知后冒险闯入，在烈焰深处找到了她。她全身被青焰包裹，眉头紧锁，显然到了关键时刻。',
        choices: [
          {
            text: '以自身法力助她炼化青月焰',
            effect: (player: IPlayer) => ({
              messages: ['你握住她的手，将自身法力渡入她体内。清漪猛地睁眼："你疯了？这会伤及你的道基！"但她没有推开你，反而紧紧回握。青月焰在两人合力下渐渐温顺。'],
              intimacyChange: 50,
              reward: '青月焰火种',
            }),
          },
          {
            text: '在旁护法，为她挡下烈焰侵袭',
            effect: (player: IPlayer) => ({
              messages: ['你以肉身抵挡焚天烈焰，护住清漪周全。当她成功炼化青月焰时，看到你遍体鳞伤，泪水终于夺眶而出："傻子...你为什么总是这样..."'],
              intimacyChange: 30,
            }),
          },
          {
            text: '为她吟唱清心咒，稳定心神',
            effect: (player: IPlayer) => ({
              messages: ['你的声音穿透烈焰，传入清漪耳中。她紧锁的眉头渐渐舒展，嘴角浮现一丝笑意。青月焰终于被她完全掌控。'],
              intimacyChange: 25,
              reward: '清心咒秘籍',
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
    firstMeeting: '石城灵驿，人来人往。一位白衣女子独立于传送阵旁，周身月华流转，仿佛与尘世隔绝。她回眸一瞥，清冷的目光中藏着万古孤寂。',
    backgroundStory: '清漪，补天教圣女月婵的次身，号称上界第一仙子。自幼修炼《清月诀》，气质清冷出尘。在下界与石昊相遇，经历了从敌对到相知的过程。她不甘做月婵的附庸，选择走自己的路。后在下界与石昊成亲，虽然历经波折，但始终坚守本心。她是完美世界中最具独立意识的女性之一，也是石昊心中那一轮清冷的明月。',
    personalityTraits: ['清冷高洁', '外冷内热', '执着坚定'],
    likes: ['月光', '清茶', '古籍', '宁静'],
    dislikes: ['喧嚣', '算计', '束缚', '炎热'],
    favoriteGifts: ['月华石', '清月古卷', '寒玉簪'],
  },

  {
    id: 'daolu_chongtong_nv',
    name: '重瞳女',
    title: '上古重瞳者',
    description: '一位身穿玄色长袍的神秘女子，双目之中各有双瞳，深邃如星空。她周身笼罩着一层淡淡的迷雾，让人看不真切。她的气质孤傲清冷，仿佛不属于这个时代。举手投足间，有古老的符文若隐若现。',
    greeting: '重瞳女缓缓睁眼，四只瞳孔中倒映着你的身影，声音空灵而悠远："终于等到你了...我看见了你的命运，也看见了我的。"',
    roomId: 'stone_nation_xuankong_dao',
    dialogues: [
      { id: 'chongtong_eye', topic: '重瞳之秘', text: '"重瞳，乃上古圣人之相。"重瞳女眼中符文流转："一眼可洞穿虚妄，一眼可看破未来。但看得越多，便越觉得命运无常...你，相信命运吗？"' },
      { id: 'chongtong_origin', topic: '她的来历', text: '"我来自仙古纪元...或者说，我本该属于那个时代。"重瞳女望向虚空："岁月如梭，故人已逝，唯有我这双眼睛，还见证着那段历史。"' },
      { id: 'chongtong_shiyi', topic: '石毅', text: '"石毅那孩子...也觉醒了重瞳。"重瞳女露出一丝追忆："我传他重瞳真术，是希望他不要重蹈覆辙。重瞳者，当看破虚妄，而非执迷于力量。"' },
    ] as INPCDialogue[],
    faction: {
      name: '重瞳一脉',
      type: DaoLuFactionType.HIDDEN,
      description: '传承自仙古纪元的隐世势力，以重瞳者为尊。历代重瞳者皆是天地间最强大的存在之一，可看破虚妄，洞察未来。',
      power: '重瞳秘境',
      location: '未知',
      leader: '无（历代重瞳者各自独立）',
    },
    status: '隐居',
    storyNodes: [
      {
        id: 'story_chongtong_1',
        title: '悬空岛现',
        requiredIntimacy: 0,
        description: '你误入石国宫城悬空岛，在岛中央的古殿中发现了一位双目重瞳的女子。她似乎早已等候多时，四只瞳孔中流转着古老的符文。',
        choices: [
          {
            text: '询问她为何在此等候',
            effect: (player: IPlayer) => ({
              messages: ['重瞳女微微一笑，笑容中带着万古沧桑："因为我看见了你会来。重瞳者，可看破时间长河...虽然代价沉重，但有些画面，值得一看。"'],
              intimacyChange: 10,
            }),
          },
          {
            text: '表达对她力量的敬畏',
            effect: (player: IPlayer) => ({
              messages: ['重瞳女摇头："力量不过是工具，真正重要的，是选择。"她意味深长地看着你："你今后的每一个选择，都将影响万古。"'],
              intimacyChange: 8,
            }),
          },
          {
            text: '请求她传授重瞳之术',
            effect: (player: IPlayer) => ({
              messages: ['重瞳女沉默片刻："重瞳乃天生，不可传授。但我可以教你如何用普通的眼睛，看破部分的虚妄。"'],
              intimacyChange: 5,
              reward: '洞虚之眼修炼法',
            }),
          },
        ],
      },
      {
        id: 'story_chongtong_2',
        title: '仙古秘辛',
        requiredIntimacy: 50,
        description: '重瞳女带你进入重瞳秘境，向你展示仙古纪元的画面。你看到了无数强者陨落，看到了天地崩塌，也看到了...希望。',
        choices: [
          {
            text: '承诺会守护这一世的和平',
            effect: (player: IPlayer) => ({
              messages: ['重瞳女眼中闪过一丝欣慰："仙古纪元，无人能阻大劫。但这一世...或许不同。"她伸出手，轻轻点在你眉心："这是我能给你的...最后的礼物。"'],
              intimacyChange: 25,
              reward: '仙古记忆碎片',
            }),
          },
          {
            text: '询问如何阻止大劫',
            effect: (player: IPlayer) => ({
              messages: ['重瞳女摇头："大劫无法阻止，只能面对。但你可以变得更强大...强大到足以保护你想保护的一切。"'],
              intimacyChange: 15,
            }),
          },
          {
            text: '默默感受仙古的悲壮',
            effect: (player: IPlayer) => ({
              messages: ['你没有说话，只是静静地看着那些画面。重瞳女站在你身旁，轻声道："能懂这份悲壮的，不多。你...是个特别的人。"'],
              intimacyChange: 20,
            }),
          },
        ],
      },
      {
        id: 'story_chongtong_3',
        title: '重瞳之殇',
        requiredIntimacy: 200,
        description: '重瞳女因频繁窥视未来，双目开始流血。她告诉你，这是重瞳者的宿命——看得越多，失去得越多。她即将陷入永恒的沉睡。',
        choices: [
          {
            text: '发誓会找到救治她的方法',
            effect: (player: IPlayer) => ({
              messages: ['重瞳女轻轻摇头，鲜血从眼角滑落："不必了...这是我选择的路。但在沉睡之前，我想再看你一眼...记住你的样子。"'],
              intimacyChange: 50,
              reward: '重瞳之泪',
            }),
          },
          {
            text: '握住她的手，陪她到最后',
            effect: (player: IPlayer) => ({
              messages: ['你紧紧握住她的手，感受着她逐渐冰冷的体温。重瞳女露出一丝微笑："真温暖啊...我已经很久，没有感受过这样的温暖了。"'],
              intimacyChange: 30,
            }),
          },
          {
            text: '以自身精元为她续命',
            effect: (player: IPlayer) => ({
              messages: ['你毫不犹豫地渡入自身精元。重瞳女震惊地看着你："你疯了？这会折损你的寿元！"她想要推开你，却被你紧紧抱住。'],
              intimacyChange: 40,
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
    firstMeeting: '悬空岛古殿之中，玄色长袍的女子静静盘坐。她睁眼的瞬间，四只瞳孔中仿佛有星空流转，万古岁月在一念之间。她看着你，仿佛已经等待了亿万年。',
    backgroundStory: '重瞳女，上古重瞳者，传承自仙古纪元的神秘存在。她见证了仙古纪元的辉煌与毁灭，见证了无数天骄的崛起与陨落。她的双眼可看破虚妄，洞察时间长河，但每一次窥视未来都要付出沉重的代价。她将重瞳真术传授给石毅，希望这一代的重瞳者不要再走老路。她孤傲清冷，却在漫长的岁月中，渴望着一丝温暖与陪伴。',
    personalityTraits: ['神秘莫测', '孤傲清冷', '深不可测'],
    likes: ['古籍', '星空', '寂静', '历史'],
    dislikes: ['喧嚣', '窥探', '改变历史', '炎热'],
    favoriteGifts: ['仙古残卷', '星辰石', '时光沙漏'],
  },

  {
    id: 'daolu_kunpeng_nv',
    name: '女鲲鹏',
    title: '鲲鹏遗族',
    description: '一位身材高挑的英气女子，身穿蓝金色战甲，背后有淡淡的鲲鹏虚影。她眉目如画，却带着睥睨天下的霸气。一双凤目炯炯有神，仿佛能看穿九天十地。她站在那里，便如同一座不可逾越的高山。',
    greeting: '女鲲鹏转过身，背后的鲲鹏虚影轻轻振翅，掀起一阵狂风。她爽朗大笑："哈哈哈，你终于来了！来，陪本座喝一杯北海特酿！"',
    roomId: 'stone_city_gate_north',
    dialogues: [
      { id: 'kunpeng_race', topic: '鲲鹏一族', text: '"我族乃十凶之一，可化鲲可化鹏。"女鲲鹏傲然道："鲲之大，不知其几千里也；鹏之背，不知其几千里也。这种力量，你可曾见过？"' },
      { id: 'kunpeng_north_sea', topic: '北海', text: '"北海是我族祖地，水天一色，无边无际。"女鲲鹏眼中闪过怀念："那里的海水不是普通的水，而是洪荒之力凝聚而成。在北海深处，沉睡着真正的鲲鹏遗骸。"' },
      { id: 'kunpeng_fight', topic: '战斗', text: '"战斗是我族的本能！"女鲲鹏握紧拳头，战意冲天："没有什么是一场痛快淋漓的战斗解决不了的！如果有，那就两场！"' },
    ] as INPCDialogue[],
    faction: {
      name: '鲲鹏遗族',
      type: DaoLuFactionType.CLAN,
      description: '太古十凶之一鲲鹏的后裔，传承有完整的鲲鹏宝术。族中强者可化鲲游于北海，化鹏翱翔九天。',
      power: '北海鲲鹏巢',
      location: '北海',
      leader: '鲲鹏王',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'story_kunpeng_1',
        title: '石城相逢',
        requiredIntimacy: 0,
        description: '你在石城北门偶遇一位正在与守城将士饮酒的蓝甲女子。她酒量惊人，一碗接一碗，笑声如雷。察觉到你的目光，她放下酒碗，大大咧咧地走了过来。',
        choices: [
          {
            text: '豪爽地与她拼酒',
            effect: (player: IPlayer) => ({
              messages: ['女鲲鹏眼睛一亮："好！有胆色！"她拍开一坛百年老酒："来，谁先趴下谁是孙子！"一场拼酒下来，你们都有了三分醉意，却也因此结下了情谊。'],
              intimacyChange: 15,
              reward: '北海特酿',
            }),
          },
          {
            text: '称赞她的霸气',
            effect: (player: IPlayer) => ({
              messages: ['女鲲鹏哈哈大笑："你小子有眼光！本座就是喜欢爽快人！"她一把搂住你的肩膀，如同多年老友。'],
              intimacyChange: 10,
            }),
          },
          {
            text: '询问她为何来到石城',
            effect: (player: IPlayer) => ({
              messages: ['女鲲鹏收起笑容，正色道："北海有变，我奉族长之命来下界寻找一样东西...一件关乎鲲鹏一族未来的东西。"'],
              intimacyChange: 8,
              reward: '北海情报',
            }),
          },
        ],
      },
      {
        id: 'story_kunpeng_2',
        title: '鲲鹏巢现',
        requiredIntimacy: 50,
        description: '北海鲲鹏巢突然现世，引来无数强者觊觎。女鲲鹏孤身前往守护，你得知消息后立刻赶去。在鲲鹏巢外，她正与数位强者对峙，背后鲲鹏虚影若隐若现。',
        choices: [
          {
            text: '与她并肩作战，击退强敌',
            effect: (player: IPlayer) => ({
              messages: ['女鲲鹏看到你赶来，战意更盛："哈哈哈，有你在，今日便战个痛快！"你们联手，将强敌一一击退。战后，她重重地拍了拍你的肩膀："兄弟，够义气！"'],
              intimacyChange: 25,
              reward: '鲲鹏羽毛',
            }),
          },
          {
            text: '帮她布下护巢大阵',
            effect: (player: IPlayer) => ({
              messages: ['女鲲鹏看着你布置的大阵，点头赞许："没想到你还有些手段。有此阵守护，鲲鹏巢可保百年无忧。谢了！"'],
              intimacyChange: 15,
              reward: '鲲鹏巢阵图',
            }),
          },
          {
            text: '以智谋引开强敌',
            effect: (player: IPlayer) => ({
              messages: ['你巧施计谋，将强敌引入北海深处。女鲲鹏在鲲鹏巢前看着你远去的背影，低声道："一定要平安回来..."'],
              intimacyChange: 20,
            }),
          },
        ],
      },
      {
        id: 'story_kunpeng_3',
        title: '化鹏之日',
        requiredIntimacy: 200,
        description: '女鲲鹏面临化鹏之劫，需要在九天雷劫中完成蜕变。她独自立于雷云之下，蓝金色的战甲在雷光中闪烁。这一劫，九死一生。',
        choices: [
          {
            text: '为她挡下最猛烈的天雷',
            effect: (player: IPlayer) => ({
              messages: ['你冲天而起，以肉身硬抗天雷。女鲲鹏在雷云中嘶吼："不要！你会死的！"但她已经无法阻止你。最终，她成功化鹏，展翅九万里，将你从雷劫中救出。'],
              intimacyChange: 50,
              reward: '鹏羽护心镜',
            }),
          },
          {
            text: '在旁诵念鲲鹏古经，助她悟道',
            effect: (player: IPlayer) => ({
              messages: ['你的声音穿透雷云，传入女鲲鹏耳中。她心神一震，想起了鲲鹏一族最古老的传承。一声长啸，她化作大鹏，扶摇直上九万里！'],
              intimacyChange: 30,
              reward: '鲲鹏古经残卷',
            }),
          },
          {
            text: '紧握她的手，给她信念',
            effect: (player: IPlayer) => ({
              messages: ['你在雷云之下，紧紧握住她的手。女鲲鹏感受着你的温度，眼中闪过坚定："有你在，我绝不会倒下！"她仰天长啸，化鹏而出！'],
              intimacyChange: 25,
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
    firstMeeting: '石城北门，一位蓝甲女子正与守城将士拼酒。她背后有鲲鹏虚影若隐若现，笑声如雷，豪气干云。她看向你，凤目之中战意与笑意交织。',
    backgroundStory: '女鲲鹏，太古十凶之一鲲鹏的后裔，鲲鹏遗族年轻一代最强者。自幼在北海长大，传承有完整的鲲鹏宝术。性格豪放不羁，重情重义，睥睨天下。她可化鲲游于北海，化鹏翱翔九天，战力无双。在下界历练时与石昊相识，被其潜力所折服。她追求极致的力量，却也渴望有一个能与她并肩作战的知己。',
    personalityTraits: ['豪放不羁', '重情重义', '睥睨天下'],
    likes: ['烈酒', '战斗', '北海', '自由'],
    dislikes: ['拘束', '阴险', '弱者', '背叛'],
    favoriteGifts: ['北海龙涎酒', '鲲鹏骨片', '九天雷晶'],
  },

  {
    id: 'daolu_tianhu',
    name: '天狐仙子',
    title: '截天教仙子',
    description: '一位身穿粉色纱裙的绝色女子，身姿曼妙，媚眼如丝。她身后有九条淡淡的狐尾虚影，轻轻摇曳。一双狐狸眼仿佛能勾魂摄魄，笑起来时百媚千娇。然而在她眼底深处，却藏着一丝不易察觉的狡黠与警惕。',
    greeting: '天狐仙子轻摇折扇，掩唇轻笑，声音酥软入骨："哎呀，这位公子生得好生俊俏。来来来，陪奴家喝一杯，奴家请你听一曲《截天谣》如何？"',
    roomId: 'stone_nation_feiyin_ge',
    dialogues: [
      { id: 'tianhu_jietian', topic: '截天教', text: '"截天教与补天教乃是死对头。"天狐仙子收起折扇，眼中闪过冷意："他们号称补天，我们便是截天。天道不公，便截而取之。这才是我辈修士应有的气魄。"' },
      { id: 'tianhu_tail', topic: '九尾天狐', text: '"我族乃九尾天狐后裔，每一条尾巴都代表着一种神通。"天狐仙子身后的狐尾虚影轻轻摇曳："等九尾齐出之日，便是奴家登临绝巅之时。"' },
      { id: 'tianhu_dance', topic: '截天舞', text: '"想看奴家跳舞吗？"天狐仙子嫣然一笑："截天舞可不是普通的舞蹈，每一舞步都蕴含截天之道。看得入神了，小心魂儿被奴家勾走哦~"' },
    ] as INPCDialogue[],
    faction: {
      name: '截天教',
      type: DaoLuFactionType.SECT,
      description: '上界大教，与补天教势不两立。截天教讲究截取天机，逆天而行。教中弟子多为心性果决之辈，行事不拘一格。',
      power: '截天教总坛',
      location: '上界',
      leader: '截天教教主',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'story_tianhu_1',
        title: '飞音阁相遇',
        requiredIntimacy: 0,
        description: '你在石国飞音阁欣赏歌舞，一位粉衣女子突然出现在你面前。她媚眼如丝，笑容倾城，身后狐尾虚影若隐若现。周围的修士都看呆了，她却只看着你。',
        choices: [
          {
            text: '邀请她共饮一杯',
            effect: (player: IPlayer) => ({
              messages: ['天狐仙子咯咯一笑，毫不客气地坐下："公子倒是大方。奴家最喜欢大方的人了。"她举杯轻抿，眼波流转间，你已有些心神荡漾。'],
              intimacyChange: 10,
            }),
          },
          {
            text: '夸赞她的舞姿',
            effect: (player: IPlayer) => ({
              messages: ['天狐仙子掩唇轻笑："公子的嘴真甜。不过奴家的舞，可不是谁都能看的。今日破例，为你独舞一曲。"'],
              intimacyChange: 15,
              reward: '截天舞感悟',
            }),
          },
          {
            text: '询问她接近自己的目的',
            effect: (player: IPlayer) => ({
              messages: ['天狐仙子微微一怔，随即笑道："公子倒是警惕。不错，奴家确实有事相求。但在此之前...让奴家好好享受一下相处的时光，不好吗？"'],
              intimacyChange: 8,
            }),
          },
        ],
      },
      {
        id: 'story_tianhu_2',
        title: '截天秘术',
        requiredIntimacy: 50,
        description: '天狐仙子带你去截天教的一处秘密据点，向你展示截天教的核心秘术。她告诉你，截天教正在谋划一件大事，而你是关键的一环。',
        choices: [
          {
            text: '表示愿意助她一臂之力',
            effect: (player: IPlayer) => ({
              messages: ['天狐仙子眼中闪过一丝感动，但很快掩饰过去："你...真的愿意？这可是与补天教为敌。"她握住你的手："不管结果如何，奴家都记你这份情。"'],
              intimacyChange: 25,
              reward: '截天秘术残卷',
            }),
          },
          {
            text: '询问具体计划，再做决定',
            effect: (player: IPlayer) => ({
              messages: ['天狐仙子点头："理应如此。奴家便将计划全盘托出...此事关乎截天教存亡，也关乎...奴家的未来。"'],
              intimacyChange: 15,
            }),
          },
          {
            text: '提醒她小心为上',
            effect: (player: IPlayer) => ({
              messages: ['天狐仙子微微一愣，随即露出真心的笑容："你...是在关心奴家？"她低下头，声音轻柔："已经很久，没有人这样关心过奴家了。"'],
              intimacyChange: 20,
            }),
          },
        ],
      },
      {
        id: 'story_tianhu_3',
        title: '九尾之劫',
        requiredIntimacy: 200,
        description: '天狐仙子在突破八尾之时遭遇心魔入侵，九条狐尾虚影在空中乱舞，她本人则痛苦地蜷缩在地。心魔化作她最恐惧的画面，将她困在幻境之中。',
        choices: [
          {
            text: '以神识进入幻境，将她带出',
            effect: (player: IPlayer) => ({
              messages: ['你冒险将神识探入她的幻境，在无数心魔中找到她。她看到你，泪如雨下："你为什么要来...这里好危险..."你握紧她的手："因为你在。"'],
              intimacyChange: 50,
              reward: '天狐心印',
            }),
          },
          {
            text: '以自身法力助她镇压心魔',
            effect: (player: IPlayer) => ({
              messages: ['你将法力源源不断地输入她体内，助她镇压心魔。天狐仙子渐渐平静，第九条狐尾缓缓凝聚。她醒来时，看到你苍白的脸色，紧紧抱住了你。'],
              intimacyChange: 30,
            }),
          },
          {
            text: '为她吟唱安魂曲',
            effect: (player: IPlayer) => ({
              messages: ['你轻声吟唱，声音穿透幻境。天狐仙子在最黑暗的时刻听到了你的声音，如同溺水者抓住了浮木。她循着声音，一步步走出幻境。'],
              intimacyChange: 25,
              reward: '安魂曲谱',
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
    firstMeeting: '飞音阁歌舞升平，一位粉衣女子从台上飘然而下，落在你身前。她媚眼如丝，九条狐尾虚影在身后轻轻摇曳，笑容倾城。',
    backgroundStory: '天狐仙子，截天教年轻一代最强者之一，九尾天狐后裔。自幼在截天教长大，修炼截天秘术，性格妩媚妖娆，机智狡黠。她与补天教圣女月婵是死对头，两人多次交锋。她看似风情万种，实则内心孤独，因为九尾天狐的传承让她难以信任他人。直到遇见你，她才慢慢放下了防备，展现出了真实的自我。',
    personalityTraits: ['妩媚妖娆', '机智狡黠', '敢爱敢恨'],
    likes: ['歌舞', '美酒', '粉色衣裙', '珠宝'],
    dislikes: ['虚伪', '背叛', ' boring的人', '寒冷'],
    favoriteGifts: ['九尾狐玉佩', '截天教古籍', '天蚕丝裙'],
  },

  {
    id: 'daolu_taiyin_yutu',
    name: '太阴玉兔',
    title: '太古遗族',
    description: '一位看起来只有十四五岁的少女，身穿白色兔绒衣裙，头顶有一对毛茸茸的兔耳。她眼睛又大又圆，如同红宝石般晶莹剔透。她蹦蹦跳跳地穿梭在集市中，手里还拿着一根胡萝卜，活泼可爱得不像一位修士。',
    greeting: '太阴玉兔蹦蹦跳跳地来到你面前，仰起小脸，眼睛弯成月牙："呀！你就是那个很厉害的人吗？要不要请我吃胡萝卜？我请你吃我最爱的太阴糕！"',
    roomId: 'stone_city_market',
    dialogues: [
      { id: 'yutu_race', topic: '太阴玉兔一族', text: '"我族是太古遗族哦！"太阴玉兔骄傲地挺起小胸脯："虽然看起来很小只，但我很厉害的！我的太阴之力可以冻结万物，哼哼！"' },
      { id: 'yutu_carrot', topic: '胡萝卜', text: '"胡萝卜是世界上最好吃的东西！"太阴玉兔认真地啃了一口胡萝卜："不信你尝尝？呃...好吧，你们人类可能不喜欢。但真的很甜！"' },
      { id: 'yutu_friend', topic: '她的朋友', text: '"我有一个很好的朋友，是一只小胖子！"太阴玉兔咯咯笑着："他总说我贪吃，但每次都会给我带好吃的。好朋友就是这样的吧？"' },
    ] as INPCDialogue[],
    faction: {
      name: '太阴玉兔一族',
      type: DaoLuFactionType.CLAN,
      description: '太古遗族之一，传承有太阴之力。族人多居住在太阴星附近，性格活泼可爱，但实力不容小觑。',
      power: '太阴星',
      location: '上界',
      leader: '玉兔老祖',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'story_yutu_1',
        title: '集市偶遇',
        requiredIntimacy: 0,
        description: '你在石城集市中看到一个蹦蹦跳跳的少女，她头顶兔耳，手里抱着一大堆零食，嘴角还沾着糕点碎屑。她不小心撞到了你，零食散落一地。',
        choices: [
          {
            text: '帮她捡起零食，并请她吃更多',
            effect: (player: IPlayer) => ({
              messages: ['太阴玉兔眼睛瞬间亮了起来："真的吗？你人真好！"她拉着你的手在集市里穿梭："这个好吃！那个也好吃！你都给我买吗？"'],
              intimacyChange: 15,
              reward: '太阴糕配方',
            }),
          },
          {
            text: '温柔地帮她擦去嘴角的碎屑',
            effect: (player: IPlayer) => ({
              messages: ['太阴玉兔愣了一下，小脸瞬间红透，兔耳也耷拉下来："你...你干什么啦...虽然你长得好看，但也不能随便..."她话没说完，却也没躲开。'],
              intimacyChange: 10,
            }),
          },
          {
            text: '询问她一个人是否安全',
            effect: (player: IPlayer) => ({
              messages: ['太阴玉兔鼓起腮帮子："我可是很厉害的！虽然看起来小只，但打坏人一点都不含糊！"她挥了挥小拳头，却意外地可爱。'],
              intimacyChange: 8,
            }),
          },
        ],
      },
      {
        id: 'story_yutu_2',
        title: '太阴之怒',
        requiredIntimacy: 50,
        description: '一群邪修盯上了太阴玉兔的太阴之力，设下陷阱将她围困。你感应到太阴之力的波动赶来，看到她被围在阵法中，兔耳耷拉着，眼中却燃着怒火。',
        choices: [
          {
            text: '破阵而入，与她并肩作战',
            effect: (player: IPlayer) => ({
              messages: ['你破开阵法，站在她身旁。太阴玉兔看到你，眼中闪过惊喜："你来啦！看我们联手，把这些坏蛋打成猪头！"太阴之力与你交融，威力倍增。'],
              intimacyChange: 25,
              reward: '太阴珠',
            }),
          },
          {
            text: '以智谋破解阵法，助她脱困',
            effect: (player: IPlayer) => ({
              messages: ['你冷静分析阵法破绽，助太阴玉兔脱困。她跳出阵法的瞬间，回头对你做了个鬼脸："聪明鬼！不愧是我看好的人！"'],
              intimacyChange: 15,
            }),
          },
          {
            text: '挡在她身前，独自面对邪修',
            effect: (player: IPlayer) => ({
              messages: ['你挡在她身前，独自面对数位邪修。太阴玉兔在身后急得跳脚："不要逞强啦！我们一起打！"但她心中，却有暖流涌动。'],
              intimacyChange: 20,
            }),
          },
        ],
      },
      {
        id: 'story_yutu_3',
        title: '月宫之约',
        requiredIntimacy: 200,
        description: '太阴玉兔感应到月宫召唤，需要返回太阴星接受传承。她站在月光下，兔耳轻轻抖动，眼中满是不舍。传承一旦开始，她便要沉睡百年。',
        choices: [
          {
            text: '承诺百年后一定去太阴星找她',
            effect: (player: IPlayer) => ({
              messages: ['太阴玉兔眼眶红了，扑进你怀里："一百年好久啊...但你说会来找我，我就相信你！拉钩钩，不许反悔！"她伸出小拇指，认真地与你拉钩。'],
              intimacyChange: 50,
              reward: '月宫信物',
            }),
          },
          {
            text: '为她准备百年的零食',
            effect: (player: IPlayer) => ({
              messages: ['太阴玉兔看到堆积如山的零食，破涕为笑："哈哈哈你把我当猪吗！但我好喜欢！"她抱紧零食，又抱紧你："谢谢你...我会想你的。"'],
              intimacyChange: 30,
            }),
          },
          {
            text: '在她额头印下一吻',
            effect: (player: IPlayer) => ({
              messages: ['太阴玉兔整个人都僵住了，兔耳竖得笔直，小脸通红。半晌，她小声嘟囔："坏蛋...偷亲我...但我...我不讨厌..."'],
              intimacyChange: 40,
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
    firstMeeting: '石城集市熙熙攘攘，一个头顶兔耳的少女蹦蹦跳跳地穿梭在人群中。她怀里抱着零食，嘴角沾着糕点碎屑，不小心撞入你怀中，零食散落一地。',
    backgroundStory: '太阴玉兔，太古遗族太阴玉兔一族的后裔，传承有纯净的太阴之力。外表看起来只有十四五岁，性格活泼可爱，古灵精怪。她喜欢吃胡萝卜和太阴糕，总说自己"很厉害"，实际上确实拥有冻结万物的恐怖实力。她与曹雨生是至交好友，在下界历练时与石昊相识，成为了并肩作战的伙伴。她看似天真无邪，实则内心细腻，渴望被保护和珍视。',
    personalityTraits: ['活泼可爱', '古灵精怪', '嘴硬心软'],
    likes: ['胡萝卜', '太阴糕', '零食', '月光'],
    dislikes: ['孤单', '黑暗', '苦味', '被说小只'],
    favoriteGifts: ['万年胡萝卜', '太阴月华石', '兔绒玩偶'],
  },

  {
    id: 'daolu_huangdie',
    name: '皇蝶',
    title: '虫族帝者',
    description: '一位身穿紫金长裙的绝美女子，气质高贵优雅，宛如帝王。她背后有一对紫金神蝶翼，轻轻扇动间有花粉般的灵光洒落。她沉默寡言，目光清澈而深邃，仿佛看透了一切。她站在那里，便如同一位君临天下的女皇。',
    greeting: '皇蝶缓缓转身，紫金蝶翼轻轻扇动，洒落点点灵光。她静静地看着你，良久才开口，声音如同天籁："你终于来了。我已经...等了很久。"',
    roomId: 'stone_nation_jixia_xuegong',
    dialogues: [
      { id: 'huangdie_emperor', topic: '虫族帝者', text: '"我乃紫金神蝶，虫族唯一的帝者。"皇蝶语气平淡，却透着无上威严："但帝者的身份，不过是力量的象征。真正的强大，在于守护想守护的一切。"' },
      { id: 'huangdie_butterfly', topic: '紫金神蝶', text: '"紫金神蝶一族，自古便与大道亲和。"皇蝶背后的蝶翼轻轻扇动："这对翅膀不仅可翱翔九天，更可沟通天地法则。你...想摸摸看吗？"她难得露出一丝浅笑。' },
      { id: 'huangdie_silence', topic: '她的沉默', text: '"我不善言辞。"皇蝶垂下眼眸："虫族的历史太过沉重，紫金神蝶的血脉中承载了太多记忆。有时候，沉默比言语更能表达一切。"' },
    ] as INPCDialogue[],
    faction: {
      name: '虫族',
      type: DaoLuFactionType.MONSTER,
      description: '太古便存在的强大种族，以虫后为尊。紫金神蝶是虫族中的至高存在，可与真龙、凤凰等比肩。',
      power: '虫族祖地',
      location: '未知秘境',
      leader: '皇蝶',
    },
    status: '势力成员',
    storyNodes: [
      {
        id: 'story_huangdie_1',
        title: '学宫初见',
        requiredIntimacy: 0,
        description: '你在稷下学宫的古籍区发现一位正在阅读上古典籍的紫衣女子。她背后的紫金蝶翼引起了所有人的注意，但她本人却仿佛与周围隔绝，沉浸在书卷之中。',
        choices: [
          {
            text: '安静地坐在她身旁，同阅古籍',
            effect: (player: IPlayer) => ({
              messages: ['皇蝶侧目看了你一眼，没有说话，却轻轻将古籍往你这边推了推，示意你可以一起看。这种无声的接纳，比任何言语都珍贵。'],
              intimacyChange: 10,
            }),
          },
          {
            text: '询问她对古籍的见解',
            effect: (player: IPlayer) => ({
              messages: ['皇蝶合上典籍，沉默片刻后开口："这卷记载的是仙古纪元的虫族历史...你也有兴趣？"她的眼中闪过一丝意外，随即化为淡淡的喜悦。'],
              intimacyChange: 8,
            }),
          },
          {
            text: '称赞她的紫金蝶翼',
            effect: (player: IPlayer) => ({
              messages: ['皇蝶微微一怔，背后的蝶翼轻轻颤动："你是第一个...不害怕这对翅膀的人。"她低下头，声音轻柔："谢谢。"'],
              intimacyChange: 12,
            }),
          },
        ],
      },
      {
        id: 'story_huangdie_2',
        title: '虫族之危',
        requiredIntimacy: 50,
        description: '虫族祖地突遭异域强者入侵，皇蝶必须返回主持大局。你得知消息后，在学宫门口拦住了即将离去的她。她背对着你，紫金蝶翼在夕阳中闪烁。',
        choices: [
          {
            text: '坚持随她一同前往',
            effect: (player: IPlayer) => ({
              messages: ['皇蝶转身看着你，目光复杂："虫族祖地凶险万分，你不必..."她话未说完，看到你坚定的眼神，轻轻点头："好。但答应我，活着回来。"'],
              intimacyChange: 25,
              reward: '虫族友谊印记',
            }),
          },
          {
            text: '为她准备疗伤的丹药',
            effect: (player: IPlayer) => ({
              messages: ['皇蝶接过丹药，眼中闪过感动："你...早就料到了？"她握紧玉瓶："这些丹药，在虫族比任何东西都珍贵。谢谢你。"'],
              intimacyChange: 15,
              reward: '紫金回春丹',
            }),
          },
          {
            text: '告诉她你会在学宫等她',
            effect: (player: IPlayer) => ({
              messages: ['皇蝶静静地看着你，良久才开口："从没有人...愿意等我。"她转过身，紫金蝶翼扇动："我会回来的。一定。"'],
              intimacyChange: 20,
            }),
          },
        ],
      },
      {
        id: 'story_huangdie_3',
        title: '帝者之誓',
        requiredIntimacy: 200,
        description: '皇蝶在虫族祖地完成帝者传承，成为真正的虫族之帝。传承结束后，她第一时间来到你面前。紫金蝶翼完全展开，遮天蔽日，但她的目光依旧清澈温柔。',
        choices: [
          {
            text: '单膝跪地，宣誓效忠',
            effect: (player: IPlayer) => ({
              messages: ['皇蝶急忙扶起你，眼中带着慌乱："你做什么？我...我不需要你的效忠。我只需要..."她顿了顿，轻声道："我只需要你陪在我身边。"'],
              intimacyChange: 50,
              reward: '帝者之翼',
            }),
          },
          {
            text: '微笑祝贺她',
            effect: (player: IPlayer) => ({
              messages: ['皇蝶看着你温暖的笑容，冰冷的帝者之心仿佛被融化。她轻轻靠在你肩头："这帝位...好冷。幸好，还有你。"'],
              intimacyChange: 30,
            }),
          },
          {
            text: '为她戴上紫金花冠',
            effect: (player: IPlayer) => ({
              messages: ['皇蝶愣住了，任由你将花冠戴在她头上。她抬手轻触花冠，嘴角浮现笑意："这是...帝者的加冕？不，这是你的礼物。我很喜欢。"'],
              intimacyChange: 40,
              reward: '紫金花冠',
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
    firstMeeting: '稷下学宫古籍区，一位紫衣女子静静翻阅上古典籍。她背后的紫金蝶翼轻轻扇动，洒落点点灵光。周围人窃窃私语，她却仿佛与尘世隔绝，只沉浸在自己的世界中。',
    backgroundStory: '皇蝶，紫金神蝶，虫族唯一的帝者。传承自仙古纪元的至高血脉，可与真龙、凤凰等十凶比肩。她高贵优雅，沉默寡言，却拥有洞察一切的智慧。作为虫族帝者，她肩负着整个种族的未来。在稷下学宫阅读古籍时与你相遇，被你的真诚所打动。她不善于表达情感，但每一个眼神、每一个动作，都饱含深意。她是虫族的希望，也是你心中那抹最温柔的紫金之色。',
    personalityTraits: ['高贵优雅', '沉默寡言', '忠诚不渝'],
    likes: ['古籍', '紫金花', '宁静', '月光'],
    dislikes: ['喧嚣', '战争', '虚伪', '背叛'],
    favoriteGifts: ['紫金古卷', '虫族秘宝', '月光花蜜'],
  },
];
