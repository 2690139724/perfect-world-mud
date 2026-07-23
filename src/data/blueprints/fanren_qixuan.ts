import { ZoneBlueprintDB, IZoneBlueprint } from './BlueprintDB';
import { TerrainType } from '../../domain/entities/Room';

const FanrenQixuanBlueprint: IZoneBlueprint = {
  id: 'fanren_qixuan',
  name: '七玄门',
  type: 'mountain',
  description: '天南地区的修仙门派，坐落于青牛山脉之上。山门巍峨，灵气氤氲，是附近百里内有数的修仙世家。门派以炼丹和符箓闻名，门下弟子数百人，在修仙界虽不算顶尖大派，却也有几分薄名。',
  recommendedLevel: 1,
  entrances: [],
  rooms: [
    {
      id: 'qixuan_gate',
      name: '七玄门山门',
      description: '一座高大的石牌坊矗立在山道尽头，上书"七玄门"三个苍劲大字，字体飘逸中透着威严。牌坊两侧各立着一根白玉石柱，柱上刻满了密密麻麻的符文，散发着淡淡的灵光。山门前方是一片开阔的石台，台下石阶蜿蜒而下，直通山脚。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 25,
      exits: [
        { direction: '内', targetId: 'qixuan_square', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '南', targetId: 'qixuan_square', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['nan_gong_wan'],
      isSafeZone: true,
      details: [
        { id: 'gate_archway', name: '七玄牌坊', description: '这座石牌坊是七玄门开派祖师亲手所立，已有数百年历史。牌坊上的符文是护山大阵的一部分，可抵御外敌入侵。据说每逢月圆之夜，牌坊上的符文便会自行运转，发出柔和的灵光。', type: 'lore' },
        { id: 'gate_pillars', name: '白玉石柱', description: '两根白玉石柱并非凡物，乃是用整块的灵玉雕琢而成。柱身上刻着七玄门的镇派功法《七玄真经》的总纲，不过字迹模糊，常人难以辨认。', type: 'environment' },
        { id: 'gate_steps', name: '登天阶', description: '通往山门的石阶共有九百九十九级，名为"登天阶"。每一级石阶上都刻着淡淡的阵纹，走在上面会感到一股无形的压力，是七玄门考验入门弟子心性的第一道关卡。', type: 'environment' },
      ],
    },
    {
      id: 'qixuan_square',
      name: '七玄门广场',
      description: '穿过山门，眼前豁然开朗。一座巨大的广场铺展在眼前，地面由青色灵砖铺就，每一块砖上都刻着聚灵阵纹。广场中央矗立着一座高约三丈的青铜鼎，鼎中香烟袅袅，散发着沁人心脾的药香。广场四周分布着各种殿宇楼阁，飞檐翘角，气势恢宏。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 35,
      exits: [
        { direction: '北', targetId: 'qixuan_main_hall', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '南', targetId: 'qixuan_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'qixuan_medicine_garden', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西', targetId: 'qixuan_outer_court', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东北', targetId: 'qixuan_inner_court', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西北', targetId: 'qixuan_back_mountain', condition: '内门弟子方可进入', isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: [],
      isSafeZone: true,
      details: [
        { id: 'square_cauldron', name: '聚灵鼎', description: '广场中央的青铜鼎名为"聚灵鼎"，是七玄门的镇派宝物之一。此鼎可汇聚天地灵气，使得整个广场的灵气浓度远超外界。鼎中燃烧的是"凝神香"，闻之可清心凝神，有助于修炼。', type: 'lore' },
        { id: 'square_bricks', name: '聚灵砖', description: '铺地的青色灵砖名为"聚灵砖"，每一块都刻着微型聚灵阵。这些阵纹相互连接，形成一个巨大的聚灵阵，将整个广场笼罩其中。在广场上修炼，速度比外界快上三成。', type: 'environment' },
        { id: 'square_flag', name: '七玄旗', description: '广场四周的旗杆上飘扬着七面旗帜，每面旗帜上都绣着不同的图案，分别代表七玄门的七座主峰。旗帜随风飘扬，发出猎猎声响。', type: 'environment' },
        { id: 'square_disciples', name: '修炼弟子', description: '广场上有不少外门弟子正在打坐修炼，他们一个个神情专注，汲取着周围浓郁的灵气。偶尔有执事弟子走过，维持着广场的秩序。', type: 'interactive', hint: '观看弟子修炼...', interactionResult: '你站在一旁观看弟子们修炼，他们的修炼方法虽然不算顶尖，但根基扎实，看得出七玄门的教导颇为严格。' },
      ],
    },
    {
      id: 'qixuan_main_hall',
      name: '七玄殿',
      description: '广场正北方是一座宏伟的大殿，殿门上方高悬一块金匾，上书"七玄殿"三个大字，笔走龙蛇，气势磅礴。大殿由整根的楠木立柱支撑，殿顶覆盖着金色的琉璃瓦，在阳光下熠熠生辉。殿前台阶上站着两名内门弟子，神情肃穆地守卫着殿门。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 45,
      exits: [
        { direction: '南', targetId: 'qixuan_square', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['su_yuan'],
      isSafeZone: true,
      details: [
        { id: 'hall_plaque', name: '七玄殿金匾', description: '这块金匾是七玄门开派祖师亲笔所题，历经数百年而不褪色。匾上的三个字蕴含着宗师级的剑意，据说心志不坚者多看几眼便会感到心神震颤。', type: 'lore' },
        { id: 'hall_throne', name: '掌门宝座', description: '大殿正中是一座檀木宝座，那是七玄门掌门的座位。宝座后方的墙壁上挂着一幅巨大的山水画，画中云山雾绕，隐约可见七座山峰，正是七玄门的全景。', type: 'environment' },
        { id: 'hall_side', name: '两侧偏殿', description: '大殿两侧各有偏殿，左侧是议事厅，右侧是待客室。平时门派中的重要事务都在左侧偏殿商议，而右侧偏殿则用来接待外来的修仙者。', type: 'environment' },
        { id: 'hall_forbidden', name: '禁地入口', description: '大殿后方有一道隐秘的门户，通向七玄门的禁地。那里是门派储藏重要典籍和宝物的地方，只有掌门和几位长老才有资格进入。', type: 'secret', hint: '探查禁地入口...', requiredRealm: 3 },
      ],
    },
    {
      id: 'qixuan_medicine_garden',
      name: '药王园',
      description: '广场东侧是一片清幽的药园，园内种满了各种珍稀灵药。空气中弥漫着浓郁的药香，吸一口便觉得神清气爽。药园被一道低矮的篱笆围着，篱笆上爬满了紫色的灵藤，藤上挂着一串串晶莹剔透的小果子。园中有几间茅舍，茅舍前的石桌上摆放着各种炼丹器具。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 40,
      exits: [
        { direction: '西', targetId: 'qixuan_square', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [
        { resourceId: 'spirit_herb', amount: 10, respawnTime: 600, harvestDifficulty: 2 },
      ],
      npcs: ['mo_jiafu'],
      isSafeZone: true,
      details: [
        { id: 'garden_herbs', name: '灵药圃', description: '药园里分成一块块整齐的药圃，种着各种不同的灵药。有提神醒脑的凝香草，有疗伤解毒的血灵花，还有一些叫不出名字的珍稀药草。每一株灵药都被精心照料，长势喜人。', type: 'environment' },
        { id: 'garden_hut', name: '炼丹茅舍', description: '药园深处的几间茅舍是炼丹的地方。茅舍虽简，但布置得十分整洁，丹炉、药臼、药碾等炼丹器具一应俱全。空气中除了药香，还能闻到淡淡的丹火气息。', type: 'interactive', hint: '观看炼丹...', interactionResult: '你站在茅舍外，看到里面有人正在炼丹。炉火纯青，丹香四溢，看得出炼丹者的技艺相当高超。' },
        { id: 'garden_spring', name: '灵泉眼', description: '药园一角有一口小小的泉眼，泉水清澈见底，散发着淡淡的灵气。这口灵泉是药园的命脉，所有灵药的灌溉都靠它。据说这灵泉通往地下灵脉，泉水含有丰富的灵力。', type: 'interactive', hint: '饮用灵泉水...', interactionResult: '你掬起一捧灵泉水喝下，泉水甘甜清冽，一股暖流顺着喉咙滑下，浑身都感到舒泰无比。', rewardItemId: '灵泉水', rewardAmount: 1 },
        { id: 'garden_rare', name: '千年灵药', description: '药园最深处，有几株用阵法罩着的千年灵药。这些灵药年份久远，药效极强，是七玄门的重要底蕴。据说其中还有一株传说中的"九转还魂草"，活死人肉白骨，珍贵无比。', type: 'secret', hint: '探查千年灵药...', requiredRealm: 2 },
      ],
    },
    {
      id: 'qixuan_outer_court',
      name: '外门弟子居住区',
      description: '广场西侧是一片整齐的院落，是外门弟子的居所。一排排的石屋依山而建，每间石屋前都有一小块空地，供弟子们日常修炼。院子里种着一些普通的灵草，还有几棵高大的灵果树，树上挂满了青色的果实。不时有外门弟子进出，有的在修炼，有的在打扫，显得井然有序。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 20,
      exits: [
        { direction: '东', targetId: 'qixuan_square', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['li_huayuan', 'han_li', 'zhang_tie'],
      isSafeZone: true,
      details: [
        { id: 'outer_houses', name: '外门弟子房', description: '每间石屋都差不多大小，里面陈设简单，只有一张床、一张桌子和一个蒲团。外门弟子的待遇虽然不算好，但至少有个安身之所，还能学到基础的修炼功法。', type: 'environment' },
        { id: 'outer_yards', name: '练功小院', description: '每间石屋前都有一个小小的院子，是弟子们日常修炼的地方。院子里的地面上刻着简单的聚灵阵，虽然效果不如广场上的，但聊胜于无。', type: 'environment' },
        { id: 'outer_canteen', name: '外门食堂', description: '居住区的尽头有一座大食堂，是外门弟子用餐的地方。食堂提供的饭菜虽然简单，但都含有微弱的灵气，有助于弟子们的修炼。', type: 'interactive', hint: '进入食堂...', interactionResult: '你走进食堂，里面已经坐了不少弟子。饭菜的香气扑鼻而来，虽然都是些普通的灵谷灵菜，但分量十足。' },
        { id: 'outer_training', name: '演武场', description: '居住区中央有一片开阔的演武场，是外门弟子切磋武艺的地方。演武场边上立着几个石人靶子，还有一些修炼用的器械。', type: 'interactive', hint: '观看切磋...', interactionResult: '演武场上，两名外门弟子正在比试。他们你来我往，虽然招式还略显稚嫩，但基本功还算扎实。' },
      ],
    },
    {
      id: 'qixuan_inner_court',
      name: '内门弟子居住区',
      description: '广场东北方向是内门弟子的居所，比起外门来要精致得多。一座座独立的小院错落有致地分布在山腰上，每座小院都有独立的聚灵阵，灵气浓度远超外门。院中花木扶疏，灵鹤飞舞，宛如仙境一般。能够住在这里的，都是七玄门的精英弟子，前途不可限量。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 50,
      exits: [
        { direction: '西南', targetId: 'qixuan_square', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['qi_yun_xiao'],
      isSafeZone: true,
      details: [
        { id: 'inner_courtyards', name: '独立小院', description: '每座小院都是独立的，院门紧闭，互不干扰。院内有卧室、丹房、修炼室等，设施齐全。院中的聚灵阵比广场上的还要精妙，修炼速度自然也更快。', type: 'environment' },
        { id: 'inner_scenery', name: '灵秀山水', description: '内门区域依山傍水，风景秀丽。有清澈的溪流，有飞泻的瀑布，还有各种珍稀的灵花异草。住在这里，不仅修炼速度快，心情也会变得愉悦。', type: 'environment' },
        { id: 'inner_crane', name: '灵鹤', description: '天空中不时有灵鹤飞过，这些灵鹤是七玄门驯养的，既能充当坐骑，又能传递消息。灵鹤通人性，是内门弟子的好伙伴。', type: 'interactive', hint: '观赏灵鹤...', interactionResult: '几只灵鹤从天空飞过，它们羽毛洁白，姿态优雅，引得不少弟子驻足观看。' },
        { id: 'inner_chamber', name: '闭关密室', description: '内门区域的最深处，有一排闭关密室。这些密室的防御极强，而且灵气最为浓郁，是内门弟子冲击瓶颈时使用的。使用密室需要贡献点，而且时间有限。', type: 'secret', hint: '探查闭关密室...', requiredRealm: 2 },
      ],
    },
    {
      id: 'qixuan_back_mountain',
      name: '后山禁地',
      description: '七玄门的后山，被一层淡淡的雾气笼罩着，显得神秘莫测。这里是七玄门的禁地，没有掌门的允许，任何人不得擅自进入。后山古木参天，荆棘丛生，隐约可见一些残破的建筑遗迹。空气中弥漫着一股阴森的气息，与山前的清朗截然不同。据说后山深处封印着一头妖物，也有人说那里藏着七玄门最大的秘密。',
      terrain: TerrainType.FOREST,
      spiritDensity: 55,
      exits: [
        { direction: '东南', targetId: 'qixuan_square', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'spirit_fox', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 300 },
      ],
      resources: [
        { resourceId: 'ancient_jade', amount: 1, respawnTime: 86400, harvestDifficulty: 5 },
      ],
      npcs: ['wang_chan', 'gui_ling', 'wan_ying_lao_zu'],
      isSafeZone: false,
      details: [
        { id: 'back_forest', name: '古木林', description: '后山上的古树都有上千年的树龄，树干粗壮，需要数人合抱。树冠遮天蔽日，使得林中光线昏暗，平添了几分阴森感。地上落满了厚厚的枯叶，踩上去发出沙沙的声响。', type: 'environment' },
        { id: 'back_ruins', name: '残破遗迹', description: '山林深处有一些残破的建筑遗迹，从残存的墙壁和石柱来看，这里曾经有过一座宏伟的建筑。没人知道这些遗迹是什么时候留下的，也没人知道这里曾经发生过什么。', type: 'lore' },
        { id: 'back_mist', name: '迷雾阵', description: '后山的雾气并非天然形成，而是一座巨大的迷雾阵。这座阵法既能阻挡外人进入，又能掩盖后山的秘密。一旦进入阵中，很容易迷失方向。', type: 'environment' },
        { id: 'back_cave', name: '神秘洞窟', description: '在后山最深处，有一个隐藏在瀑布后的洞窟。洞窟深不见底，据说里面封印着一头上古妖物。也有人说，那是七玄门开派祖师的坐化之地，里面藏着惊天的传承。', type: 'secret', hint: '探索神秘洞窟...', requiredRealm: 4 },
      ],
    },
  ]
};

ZoneBlueprintDB.register(FanrenQixuanBlueprint);
