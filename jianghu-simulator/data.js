/* ============================================================
 * 江湖模拟器 · 数据库  data.js
 * 出身 / 天赋 / 门派 / 角色 / 武学 / 地图 / 事件 / 物价
 * ============================================================ */
var JH = window.JH = window.JH || {};

/* ---------- 通用：掷骰 ---------- */
JH.dice = function(sides=100){ return 1 + Math.floor(Math.random()*sides); };
JH.pick = function(arr){ return arr[Math.floor(Math.random()*arr.length)]; };

/* ---------- 时辰 ---------- */
JH.SHICHEN = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
JH.SHICHEN_NAME = ['子时','丑时','寅时','卯时','辰时','巳时','午时','未时','申时','酉时','戌时','亥时'];
// 时辰时段描述
JH.SHICHEN_PERIOD = ['深夜','深夜','黎明','清晨','上午','上午','正午','午后','傍晚','入夜','夜深','深夜'];

/* ---------- 历法（农历） ---------- */
// 月份与季节
JH.MONTHS = [
  {name:'正月',season:'春'},{name:'二月',season:'春'},{name:'三月',season:'春'},
  {name:'四月',season:'夏'},{name:'五月',season:'夏'},{name:'六月',season:'夏'},
  {name:'七月',season:'秋'},{name:'八月',season:'秋'},{name:'九月',season:'秋'},
  {name:'十月',season:'冬'},{name:'冬月',season:'冬'},{name:'腊月',season:'冬'},
];
// 节日（农历月/日 -> 名称）
JH.FESTIVALS = {
  '1-15':'上元灯会','4-5':'清明祭扫','5-5':'端午龙舟',
  '7-7':'七夕乞巧','8-15':'中秋赏月','12-30':'除夕守岁'
};

/* ---------- 天气 ---------- */
JH.WEATHER = ['晴','晴','阴','小雨','大雨','雷雨','风雪','雾霾','微风','晴'];
JH.weatherFor = function(season){
  if(season==='冬') return JH.pick(['风雪','阴','晴','寒风','小雪']);
  if(season==='夏') return JH.pick(['晴','雷雨','闷热','大雨','晴']);
  return JH.pick(['晴','阴','小雨','微风','晴']);
};

/* ============================================================
 * 一、出身（十二选一）
 * ============================================================ */
JH.BACKGROUNDS = [
  {key:'A',name:'名门世家',silver:200,mods:{魅力:+2},shengwang:20,
   desc:'世家子弟，锦衣玉食，家族眼线密布天下。',
   items:[{name:'精铁剑',type:'武器',val:15,note:'凡品长剑，削铁如泥尚不能'}],
   start:'洛阳名门府邸',startLoc:'中原洛阳'},
  {key:'B',name:'武学世家',mods:{根骨:+2,臂力:+1},
   desc:'世代习武之家，背负光大门楣之望，自幼耳濡目染。',
   wuxue:[{name:'家传三流拳法',grade:'凡品',type:'外功',power:8,desc:'祖传拳法，刚猛有余巧劲不足'}],
   items:[{name:'旧布衣',type:'衣物'},{name:'精铁剑',type:'武器',val:15}],
   start:'泉州武学世家',startLoc:'泉州'},
  {key:'C',name:'寒门书生',mods:{悟性:+3,臂力:-1},
   desc:'寒窗苦读，胸有丘壑而手无缚鸡之力，可走科举之途。',
   items:[{name:'剑谱残页',type:'秘籍',note:'残缺剑意，悟性高者可参悟'}],
   start:'苏州寒门书舍',startLoc:'江南姑苏'},
  {key:'D',name:'市井孤儿',mods:{身法:+2,气运:+1},silver:5,
   desc:'自幼浪迹市井，三教九流皆识，自由自在惯了。',
   start:'开封市井巷弄',startLoc:'中原洛阳'},
  {key:'E',name:'镖局之后',mods:{臂力:+2},tiliMaxBonus:10,
   desc:'镖局子弟，见多识广，路引齐全，江湖路熟。',
   items:[{name:'路引',type:'文书'},{name:'单刀',type:'武器',val:12}],
   start:'长安长风镖局',startLoc:'京都·长安'},
  {key:'F',name:'医家传人',mods:{悟性:+1},
   desc:'医家子弟，怀《百草经》，救人可得人情声望。',
   items:[{name:'《百草经》',type:'秘籍',note:'药王谷凡品医典，可识百草'}],
   start:'江南药乡',startLoc:'江南药王谷'},
  {key:'G',name:'官宦子弟',silver:150,shengwang:30,
   desc:'官宦之后，识朝堂门路，然江湖人见之提防。',
   items:[{name:'路引',type:'文书'},{name:'官府腰牌',type:'文书'}],
   start:'京都长安官邸',startLoc:'京都·长安'},
  {key:'H',name:'边关遗孤',mods:{臂力:+2,气运:+1},
   desc:'边关烽火中幸存，意志坚韧，与朝廷马匪皆有纠葛。',
   items:[{name:'旧军刀',type:'武器',val:13}],
   start:'雁门关外',startLoc:'西陲雁门关'},
  {key:'I',name:'江湖艺人',mods:{魅力:+3,身法:+1},
   desc:'走江湖卖艺，口才了得，消息灵通。',
   silver:20,start:'中原洛阳闹市',startLoc:'中原洛阳'},
  {key:'J',name:'魔教遗孤',mods:{内力:+20},
   desc:'魔教余孽之后，身怀幽冥心法，印记暗藏，身世凶险。',
   wuxue:[{name:'幽冥真气(残)',grade:'绝学',type:'内功',power:30,desc:'阴寒蚀骨，魔教镇教心法残篇'}],
   start:'北境风雪城外',startLoc:'北境风雪城',specialLine:true},
  {key:'K',name:'隐世高人之后',mods:{根骨:+1,悟性:+1,气运:+1},
   desc:'隐世高人后裔，根基扎实而通世故甚少。',
   start:'青城山隐居小院',startLoc:'巴蜀唐家堡'},
  {key:'L',name:'前朝皇族遗脉',shengwang:50,
   desc:'前朝遗脉（稀有），身怀信物，一旦暴露则朝野皆欲得之。',
   items:[{name:'前朝玉佩',type:'信物',note:'暴露身份将引来杀身之祸'}],
   start:'流亡途中客栈',startLoc:'中原洛阳',specialLine:true},
];

/* ============================================================
 * 二、天赋
 * ============================================================ */
JH.TALENTS = [
  {key:'天生神力',mod:{臂力:+5},desc:'天生神力，臂力+5'},
  {key:'过目不忘',mod:{悟性:+15},desc:'过目不忘，悟性+15，记忆八分'},
  {key:'身轻如燕',mod:{身法:+15},desc:'身轻如燕，身法+15'},
  {key:'医武双修',desc:'医武双修，制药效率+50%（需医家/魔教）'},
  {key:'巧舌如簧',mod:{魅力:+15},desc:'巧舌如簧，魅力+15'},
  {key:'气运加身',mod:{气运:+15},desc:'气运加身，气运+15'},
  {key:'百毒不侵',desc:'百毒不侵，所受毒伤减半（需医家/魔教）'},
  {key:'心有灵犀',desc:'心有灵犀，好感获取+20%'},
  {key:'剑心通明',desc:'剑心通明，剑修效率+50%'},
  {key:'力拔山兮',rare:true,mod:{臂力:+8,悟性:-2},desc:'力拔山兮（稀有），臂力+8 悟性-2'},
];

/* ============================================================
 * 三、境界
 * ============================================================ */
JH.REALMS = [
  {name:'不入流',neili:0},
  {name:'三流',neili:40},
  {name:'二流',neili:120},
  {name:'一流',neili:300},
  {name:'宗师',neili:600},
  {name:'大宗师',neili:1000},
  {name:'武圣',neili:1800},
];

/* ============================================================
 * 四、门派
 * ============================================================ */
JH.SECTS = [
  {key:'少林',align:'正',loc:'嵩山',leader:'方丈了尘',desc:'武林祖庭，戒律森严。绝学：罗汉拳/易筋经/七十二绝技'},
  {key:'武当',align:'正',loc:'武当山',leader:'玄微真人',desc:'道门泰斗。绝学：太极剑/梯云纵/绵掌'},
  {key:'峨眉',align:'正',loc:'峨眉山',leader:'静虚师太',desc:'尼众道场。绝学：峨眉剑/拂尘功/拈花指'},
  {key:'丐帮',align:'正',loc:'中原',leader:'铁拐翁',desc:'草莽第一大帮，消息最灵。绝学：打狗棒法/降龙掌(残)'},
  {key:'唐家堡',align:'亦正亦邪',loc:'巴蜀',leader:'唐鹤年',desc:'暗器毒术双绝。绝学：满天花雨/唐门毒经/暴雨梨花针'},
  {key:'药王谷',align:'中立',loc:'江南',leader:'白茯苓',desc:'医毒双绝。绝学：回春术/百毒诀'},
  {key:'听雨楼',align:'中立',loc:'姑苏',leader:'凌无咎',desc:'天下消息尽在掌中。情报组织'},
  {key:'漕帮',align:'中立',loc:'江南水道',leader:'/',desc:'水运第一大帮，掌控江南水路'},
  {key:'六扇门',align:'朝廷',loc:'京都',leader:'总捕头秦正',desc:'朝廷缉捕衙门。办案/追缉/升迁'},
  {key:'东缉事厂',align:'朝廷',loc:'京都',leader:'督主江鹤',desc:'朝廷鹰犬，密探刑罚。入则正派好感大减'},
  {key:'幽冥教',align:'邪',loc:'北境风雪城',leader:'夜沧澜',desc:'魔教，阴寒武学。绝学：幽冥真气/摄魂大法'},
  {key:'五毒教',align:'邪',loc:'苗疆',leader:'蓝凤凰(教主之女)',desc:'蛊术通神。绝学：五毒掌/金蚕蛊'},
  {key:'血刀门',align:'邪',loc:'西陲',leader:'/',desc:'邪派，嗜杀刀客'},
];

/* ============================================================
 * 五、地图
 * ============================================================ */
JH.MAP = {
  '京都·长安':{region:'中原',desc:'大昭都城，皇城/厂卫/六扇门所在，繁盛之地。',shops:['客栈','医馆','兵器铺','当铺','赌坊'],connects:['嵩山少林','中原洛阳']},
  '嵩山少林':{region:'中原',desc:'少林祖庭，嵩山脚下。',shops:['客栈'],connects:['京都·长安','中原洛阳']},
  '武当山':{region:'中原',desc:'武当真武观所在，道门圣地。',shops:['客栈','道观'],connects:['中原洛阳','江南姑苏']},
  '峨眉山':{region:'西陲',desc:'峨眉金顶庵，尼众道场。',shops:['客栈'],connects:['巴蜀唐家堡']},
  '巴蜀唐家堡':{region:'巴蜀',desc:'唐家堡，暗器毒术之乡。',shops:['暗器铺','药铺'],connects:['峨眉山','江南姑苏']},
  '天山缥缈峰':{region:'北境',desc:'天山之巅，寒冰武学发源地。',shops:[],connects:['北境风雪城']},
  '江南姑苏':{region:'江南',desc:'姑苏城，商会/药王谷/听雨楼所在。',shops:['客栈','医馆','丝绸铺','画舫','当铺'],connects:['武当山','巴蜀唐家堡','江南药王谷']},
  '江南药王谷':{region:'江南',desc:'药王谷，医毒双绝之地。',shops:['药铺'],connects:['江南姑苏']},
  '西陲雁门关':{region:'西陲',desc:'边关军镇，烽火之地。',shops:['军市'],connects:['京都·长安','北境风雪城']},
  '北境风雪城':{region:'北境',desc:'幽冥教禁地，苦寒凶险。',shops:[],connects:['天山缥缈峰','西陲雁门关']},
  '中原洛阳':{region:'中原',desc:'中原腹地，武林大会举办地。',shops:['客栈','医馆','兵器铺','赌坊','青楼'],connects:['京都·长安','嵩山少林','武当山']},
  '泉州':{region:'东南',desc:'东南沿海商埠。',shops:['客栈','市集','医馆'],connects:['中原洛阳','江南姑苏']},
};

/* ============================================================
 * 六、可攻略角色（全性向，不分玩家性别）
 * ============================================================ */
JH.NPCS = [
  // 男性角色
  {key:'顾青崖',gender:'男',age:25,identity:'武当大师兄',sect:'武当',align:'正',
   wuxue:'太极剑(绝学)/绵掌/梯云纵',realm:'一流',
   personality:'温润如玉，外和内刚，责任感重',
   likes:'清茶/剑道/山水',dislikes:'虚伪/聒噪',
   loc:'武当山',stageIntro:'紫霄宫中常可见其练剑，白衣如雪。'},
  {key:'萧凤鸣',gender:'男',age:26,identity:'东缉事厂千户',sect:'东缉事厂',align:'朝廷',
   wuxue:'厂卫刀法/暗器',realm:'一流',
   personality:'面若冠玉、心狠，却对你保留真心',
   likes:'权谋/棋局/忠诚',dislikes:'背叛/软弱',
   loc:'京都·长安',stageIntro:'常着飞鱼服出入诏狱与宫禁。'},
  {key:'段横刀',gender:'男',age:24,identity:'雁门关少将军',sect:'边军',align:'朝廷',
   wuxue:'军中刀法/马上长枪',realm:'二流',
   personality:'热血豪迈，马背汉子',
   likes:'烈酒/烈马/战功',dislikes:'怯懦/阴谋',
   loc:'西陲雁门关',stageIntro:'守关悍将，刀下从不留敌。'},
  {key:'叶孤鸿',gender:'男',age:27,identity:'幽冥教左护法',sect:'幽冥教',align:'邪',
   wuxue:'幽冥真气/摄魂大法',realm:'宗师',
   personality:'神秘冷峻，武功深不可测，认死理',
   likes:'独处/信物/承诺',dislikes:'欺骗/喧闹',
   loc:'北境风雪城',stageIntro:'常一袭黑袍立于雪原，无声如影。'},
  {key:'温良玉',gender:'男',age:23,identity:'姑苏才子/听雨楼暗探',sect:'听雨楼',align:'中立',
   wuxue:'折扇点穴/轻功',realm:'二流',
   personality:'潇洒不羁，红颜无数却真心对你',
   likes:'美酒/奇案',dislikes:'平庸/被人看穿',
   loc:'江南姑苏',stageIntro:'画舫上执扇笑谈，眼波藏锋。'},
  {key:'觉明',gender:'男',age:20,identity:'少林俗家弟子',sect:'少林',align:'正',
   wuxue:'罗汉拳/易筋经(初)',realm:'三流',
   personality:'憨厚正直，天生神力',
   likes:'馒头/练武/侠义故事',dislikes:'酒肉/欺凌',
   loc:'嵩山少林',stageIntro:'藏经阁外常挥拳至汗透僧衣。'},
  {key:'赵承嗣',gender:'男',age:19,identity:'大昭三皇子',sect:'皇室',align:'朝廷',
   wuxue:'皇室剑法/弓马',realm:'三流',
   personality:'礼贤下士，志在夺嫡',
   likes:'策论/人才/民间疾苦',dislikes:'奢靡/无能',
   loc:'京都·长安',stageIntro:'常微服出宫，访贤于市井。'},
  {key:'沈千杯',gender:'男',age:38,identity:'丐帮长老',sect:'丐帮',align:'正',
   wuxue:'降龙掌(残)/打狗棒法',realm:'宗师',
   personality:'游戏人间的高人，大智若愚',
   likes:'酒/美食/烤鸡',dislikes:'规矩/虚伪',
   loc:'中原洛阳',stageIntro:'醉卧桥头，葫芦不离手。'},
  {key:'谢听澜',gender:'男',age:28,identity:'武林盟主之子',sect:'武林盟',align:'正',
   wuxue:'听澜剑法/琴剑双绝',realm:'一流',
   personality:'背负振盟重担，温文尔雅心思重',
   likes:'古琴/盟务/清净',dislikes:'纷扰/失信',
   loc:'中原洛阳',stageIntro:'抚琴于盟主府，眉间常带忧色。'},
  {key:'燕青鸿',gender:'男',age:30,identity:'夜枭阁阁主',sect:'夜枭阁',align:'中立',
   wuxue:'夜枭刀法/暗杀术',realm:'宗师',
   personality:'杀人如麻却重信诺，只接该杀之人',
   likes:'月下独酌/一诺千金/棋',dislikes:'背信/滥杀无辜',
   loc:'行踪不定',stageIntro:'月下独行，刀未出鞘已有人头落地。'},
  {key:'凌无咎',gender:'男',age:29,identity:'听雨楼楼主',sect:'听雨楼',align:'中立',
   wuxue:'笑面掌/暗器/易容',realm:'一流',
   personality:'白面书生，笑面罗刹，天下消息尽在掌中',
   likes:'秘辛/古画/有趣的灵魂',dislikes:'无趣/被骗',
   loc:'江南姑苏',stageIntro:'听雨楼中常笑迎八方客，眼底深不见底。'},
  {key:'楚云澜',gender:'男',age:22,identity:'药王谷少谷主',sect:'药王谷',align:'中立',
   wuxue:'回春术/药王掌',realm:'二流',
   personality:'少年神医，清朗如月，身世成谜',
   likes:'药草/琴/疑难杂症',dislikes:'见死不救/谎言',
   loc:'江南药王谷',stageIntro:'采药于山间，药篓里花香清苦。'},
  // 女性角色
  {key:'苏挽月',gender:'女',age:21,identity:'峨眉弟子',sect:'峨眉',align:'正',
   wuxue:'峨眉剑/拂尘功',realm:'二流',
   personality:'清冷剑仙，外冷内热',
   likes:'剑/雪/围棋',dislikes:'油嘴滑舌/纠缠',
   loc:'峨眉山',stageIntro:'金顶之上练剑，剑光如雪。'},
  {key:'唐小棠',gender:'女',age:19,identity:'唐家堡大小姐',sect:'唐家堡',align:'亦正亦邪',
   wuxue:'满天花雨/唐门毒经',realm:'三流',
   personality:'古灵精怪，玩毒如戏',
   likes:'新奇暗器/甜食',dislikes:'医书/无聊',
   loc:'巴蜀唐家堡',stageIntro:'堡中常闻她嬉笑，袖中暗器叮当作响。'},
  {key:'蓝凤凰',gender:'女',age:22,identity:'五毒教教主之女',sect:'五毒教',align:'邪',
   wuxue:'五毒掌/金蚕蛊',realm:'一流',
   personality:'苗疆美人，蛊术通神，向往自由',
   likes:'蛊虫/烈酒/自由',dislikes:'背叛/束缚',
   loc:'苗疆',stageIntro:'苗寨银饰叮当，她笑里藏蛊。'},
  {key:'夜无霜',gender:'女',age:23,identity:'幽冥教圣女',sect:'幽冥教',align:'邪',
   wuxue:'幽冥真气/摄魂大法',realm:'一流',
   personality:'亦正亦邪，美艳危险',
   likes:'月色/孤高/强者',dislikes:'软弱/俗物',
   loc:'北境风雪城',stageIntro:'圣女台上红衣似火，眸冷如霜。'},
  {key:'柳含烟',gender:'女',age:20,identity:'姑苏画舫花魁',sect:'无',align:'中立',
   wuxue:'音律惑心/轻功',realm:'三流',
   personality:'才貌双全，深藏前朝身世',
   likes:'诗画/音律/自由',dislikes:'轻薄/权贵逼迫',
   loc:'江南姑苏',stageIntro:'画舫琴声悠扬，珠帘后倩影朦胧。'},
  {key:'慕容清歌',gender:'女',age:18,identity:'大昭七公主',sect:'皇室',align:'朝廷',
   wuxue:'皇室剑法',realm:'三流',
   personality:'金枝玉叶，身在夺嫡漩涡',
   likes:'新奇物件/侠客故事',dislikes:'宫规/联姻',
   loc:'京都·长安',stageIntro:'宫墙之内常眺望江湖方向。'},
];

JH.npcByKey = function(key){ return JH.NPCS.find(n=>n.key===key); };

// 关系阶段
JH.AFF_STAGES = [
  {min:0,name:'陌生'},{min:20,name:'相识'},{min:40,name:'熟悉'},
  {min:60,name:'知己/暧昧'},{min:80,name:'恋人'},{min:100,name:'生死相托'}
];
JH.affStage = function(v){
  let s = JH.AFF_STAGES[0];
  for(let st of JH.AFF_STAGES){ if(v>=st.min) s=st; }
  return s.name;
};

/* ============================================================
 * 七、武学秘籍总览
 * ============================================================ */
JH.WUXUE_LIB = [
  {name:'基础吐纳法',grade:'凡品',type:'内功',power:5,desc:'内力+5，入门内功',src:'任何武馆'},
  {name:'太祖长拳',grade:'凡品',type:'外功',power:8,desc:'拳法入门',src:'镖局/市井'},
  {name:'柳叶刀法',grade:'凡品',type:'外功',power:8,desc:'刀法入门',src:'市集刀铺'},
  {name:'武当绵掌',grade:'上品',type:'外功',power:18,desc:'掌法，绵柔克刚',src:'真武观'},
  {name:'梯云纵',grade:'上品',type:'轻功',power:15,desc:'登高跃涧',src:'真武观'},
  {name:'峨眉剑法',grade:'上品',type:'外功',power:18,desc:'剑法，轻灵迅捷',src:'金顶庵'},
  {name:'满天花雨',grade:'上品',type:'外功',power:20,desc:'暗器手法，可洒毒',src:'唐家堡'},
  {name:'五毒掌',grade:'上品',type:'外功',power:20,desc:'掌中带蛊毒',src:'五毒教'},
  {name:'回春术',grade:'上品',type:'奇门',power:0,desc:'医术，可愈内伤',src:'药王谷'},
  {name:'太极剑法',grade:'绝学',type:'外功',power:40,desc:'以静制动，剑意连绵',src:'真武观镇派'},
  {name:'打狗棒法',grade:'绝学',type:'外功',power:40,desc:'变化无穷，专克兵器',src:'丐帮帮主亲传'},
  {name:'降龙掌(残篇)',grade:'绝学',type:'外功',power:45,desc:'刚猛无俦，掌力雄浑',src:'丐帮密藏'},
  {name:'易筋经',grade:'绝学',type:'内功',power:50,desc:'洗筋伐髓，根骨大增',src:'少林藏经阁'},
  {name:'幽冥真气',grade:'绝学',type:'内功',power:45,desc:'阴寒蚀骨，可摄人心神',src:'幽冥教'},
  {name:'九阳神功',grade:'神功',type:'内功',power:80,desc:'内力生生不息，百毒不侵',src:'传说机缘'},
  {name:'北冥心法',grade:'神功',type:'内功',power:80,desc:'可化人内力为己用',src:'传说机缘'},
  {name:'太玄经(残卷)',grade:'神功',type:'内功',power:90,desc:'包罗万象，武学总纲',src:'前朝遗迹'},
  {name:'不死药方',grade:'神功',type:'奇门',power:0,desc:'服之脱胎换骨（代价未知）',src:'幽冥教秘辛'},
];
JH.wuxueByName = function(n){ return JH.WUXUE_LIB.find(w=>w.name===n); };

/* ============================================================
 * 八、物价
 * ============================================================ */
JH.PRICES = {
  '馒头':3,'烧饼':5,'好酒':200,'客栈(一夜)':100,'疗伤药':500,
  '普通兵器':800,'上品兵器':5000,'凡品秘籍':1000,'上品秘籍':8000,
  '清茶':30,'甜食糕点':80,'药草':50,'烈酒':300,'烤鸡':150,
  '古琴':2000,'棋具':500,'新奇暗器':600,
};

/* 商店货品模板（按店铺类型） */
JH.SHOP_STOCK = {
  '客栈':['馒头','烧饼','好酒','客栈(一夜)'],
  '医馆':['疗伤药','药草'],
  '兵器铺':['普通兵器','上品兵器'],
  '市集':['馒头','烧饼','清茶','甜食糕点','烈酒'],
  '药铺':['疗伤药','药草'],
  '暗器铺':['新奇暗器'],
  '军市':['普通兵器','烈酒','烤鸡'],
  '当铺':[],
  '赌坊':[],
  '青楼':['好酒'],
  '画舫':['好酒','古琴'],
  '道观':['清茶'],
};

/* ============================================================
 * 九、随机日常事件（每回合 1d100≤20 触发）
 * ============================================================ */
JH.RANDOM_EVENTS = [
  {id:'thief',title:'市集小偷',text:'市集人潮中，一只贼手伸向身旁老妇的钱袋。',
   opts:['抓贼(身法判定)','喝止','佯装未见']},
  {id:'elder',title:'老者晕倒',text:'路边一位须发皆白的老者忽然晕倒，众人围观却无人上前。',
   opts:['上前施救(需医术/悟性)','扶起送往医馆','绕道而行']},
  {id:'tavern',title:'客栈挑衅',text:'客栈中几个江湖客见你面生，借着酒意出言挑衅。',
   opts:['应战(切磋)','忍气吞声','以言化解(魅力)']},
  {id:'letter',title:'神秘飞书',text:'一封无署名的飞书塞入你怀中，上书「欲知靖武令内情，三日后城西破庙」。',auto:true},
  {id:'carve',title:'石壁刻字',text:'山道旁石壁上刻有残篇武学，字迹斑驳。',auto:true},
  {id:'feud',title:'仇杀现场',text:'前方巷口两人正刀剑相向，血光将起。',
   opts:['出手阻止','帮其中一方','旁观','悄然离去']},
  {id:'caravan',title:'商队护送',text:'一支商队正招募护镖人手，许以银两。',
   opts:['应募护送(得银)','婉拒']},
  {id:'beggar',title:'乞丐秘闻',text:'桥下老丐拉住你衣角，低声说要卖你一则江湖秘闻(要价5两)。',
   opts:['买(付5两)','讨价还价','不买']},
  {id:'temple',title:'破庙书生',text:'破庙中一位落魄书生正对月吟哦，似非常人。',
   opts:['上前攀谈','留些干粮悄然离去']},
  {id:'fox',title:'拾得白狐',text:'山涧边一只受伤白狐呜咽，似通人性。',auto:true},
  {id:'mistaken',title:'被认错人',text:'一江湖人远远喊你「师兄」奔来，似认错了人。',
   opts:['将错就错','澄清','借机套话']},
  {id:'storm',title:'暴雨山洪',text:'天色骤变，山洪暴发，前路被阻。',
   opts:['冒险强渡(身法/气运)','绕道(耗时)','就地避雨']},
];

/* ============================================================
 * 十、奇遇（气运判定触发，深度更高）
 * ============================================================ */
JH.ADVENTURES = [
  {id:'cliff',title:'悬崖武学碑刻',text:'崖壁深处发现古老武学碑刻，似为失传绝学。',
   needLuck:70,reward:{type:'wuxue',val:'上品'}},
  {id:'master',title:'隐世宗师传招',text:'林中老者见你根骨，愿授一招。',
   needLuck:75,reward:{type:'wuxue',val:'上品'}},
  {id:'auction',title:'拍卖会捡漏',text:'拍卖会上，一件无人识货之物落入你手。',
   needLuck:65,reward:{type:'item'}},
  {id:'dream',title:'白衣人梦中授武',text:'梦中白衣人现身，授你一段心法。',
   needLuck:80,reward:{type:'neili',val:30}},
  {id:'tomb',title:'废弃古墓',text:'乱山中发现一座废弃古墓，机关重重。',
   needLuck:70,reward:{type:'item'}},
  {id:'elixir',title:'长者赠续命丹',text:'药王谷长者赠你一枚续命丹。',
   needLuck:85,reward:{type:'item',val:'续命丹'}},
  {id:'oldchess',title:'对弈老翁授暗器',text:'桥头老翁与你对弈一局，输后笑授暗器手法。',
   needLuck:70,reward:{type:'wuxue',val:'凡品'}},
  {id:'sword',title:'山洪古剑藏诀',text:'山洪退去，泥中露出半截古剑，剑身藏诀。',
   needLuck:75,reward:{type:'item',val:'古剑'}},
  {id:'heal',title:'音律疗伤',text:'林中琴音入耳，旧伤竟隐隐松动。',
   needLuck:70,reward:{type:'heal'}},
  {id:'token',title:'神秘人赠信物',text:'神秘人留下一枚信物，言日后有用。',
   needLuck:80,reward:{type:'item',val:'神秘信物'}},
];

/* ============================================================
 * 十一、主线节点
 * ============================================================ */
JH.MAIN_QUESTS = [
  {id:'wudang',title:'武当开山门',text:'闻听武当山将开山门收徒，限期三月。',deadline:90},
  {id:'jingwu',title:'靖武令之变',text:'朝廷清点武林、收缴私兵，武林暗流涌动。'},
  {id:'mengzhu',title:'武林盟主之争',text:'武林盟主病逝，群龙无首，新盟主之位悬空。'},
  {id:'mojiao',title:'魔教复辟',text:'幽冥教残部欲趁机复辟，正邪大战将起。'},
  {id:'duodi',title:'夺嫡之争',text:'朝堂夺嫡暗潮卷入江湖，诸皇子各蓄势力。'},
];

/* 开局剧本 */
JH.OPENING_SCENES = [
  {id:'shaonian',name:'少年出山',text:'你奉师命下山历练，行至城门，正撞见一伙泼皮当街行凶，欺凌一老翁。'},
  {id:'bianguan',name:'边关风沙',text:'你持一张路引过关，守将却皱眉——这路引的印章，是假的。'},
  {id:'huayefang',name:'雨夜画舫',text:'雨夜，你登上一艘画舫避雨。花魁的琴声里，似藏着一组暗号。'},
  {id:'mojiaoyiguer',name:'魔教遗孤',text:'你腕上的印记忽然发烫，客栈里有人死死盯着你的手腕——他认出了你。'},
  {id:'miaotang',name:'庙堂初试',text:'酒肆之中，两名官员压低声音密谈「靖武令」三字，目光却扫向你这边。'},
];

/* ============================================================
 * 十二、开局默认属性与初始物品
 * ============================================================ */
JH.BASE_ITEMS = [
  {name:'旧布衣',type:'衣物'},
  {name:'干粮',type:'食物',qty:3},
  {name:'水囊',type:'杂物'},
  {name:'火折子',type:'杂物'},
];

JH.STAT_KEYS = ['根骨','悟性','身法','臂力','魅力','气运'];
JH.STAT_DESC = {
  '根骨':'体质/体力上限/抗毒抗伤/武功根基',
  '悟性':'学武速度/顿悟/读秘籍/破阵',
  '身法':'闪避/轻功/先手/暗器/偷窃',
  '臂力':'攻击/负重/劈砍/震慑',
  '魅力':'好感初始/说服/讲价/交际',
  '气运':'奇遇/暴击/开箱/赌博/生死判定',
};

JH.GENDER_OPTIONS = ['男','女','自定义'];

console.log('[JH] data loaded: ', Object.keys(JH).length, 'keys');
