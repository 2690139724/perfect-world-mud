import { ZoneBlueprintDB, IZoneBlueprint } from './BlueprintDB';
import { TerrainType } from '../../domain/entities/Room';

const DoupoWutanBlueprint: IZoneBlueprint = {
  id: 'doupo_wutan',
  name: '乌坦城',
  type: 'city',
  description: '加玛帝国东北部的一座小城，因地处魔兽山脉边缘而成为冒险者的聚集地。城中三大家族（萧家、加列家、奥巴家）明争暗斗，表面平静实则暗流涌动。乌坦城虽小，却走出了那位名震斗气大陆的炎帝。',
  recommendedLevel: 0,
  entrances: [
    { direction: '北', targetZoneId: 'wasteland', targetRoomId: 'wasteland_gate' }
  ],
  rooms: [
    {
      id: 'wutan_city_gate',
      name: '乌坦城城门',
      description: '乌坦城的北城门，由青灰色巨石砌成，高约五丈。城门上方镌刻着"乌坦"二字，字迹古朴。门前常有守卫盘查来往行人，城门两侧则是摆摊叫卖的小贩，热闹非凡。从这里向北望去，隐约可见魔兽山脉的轮廓。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 15,
      exits: [
        { direction: '内', targetId: 'wutan_city_plaza', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '南', targetId: 'wutan_city_plaza', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '外', targetId: 'wasteland_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'wasteland_gate', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [],
      resources: [],
      npcs: ['yun_yun'],
      isSafeZone: true,
      details: [
        { id: 'gate_guard', name: '城守卫兵', description: '几名身披轻甲的守卫站在城门两侧，眼神警惕地打量着每一个进出的行人。他们都是萧家的护卫队成员，负责维护城门秩序。', type: 'environment' },
        { id: 'gate_sign', name: '城门告示', description: '城门旁贴着一张告示，上面写着近期魔兽山脉异动频繁，提醒冒险者量力而行。告示末尾盖着萧家的印章。', type: 'lore' },
      ],
    },
    {
      id: 'wutan_city_plaza',
      name: '乌坦城广场',
      description: '乌坦城的中心广场，青石铺就的地面宽敞平整。广场中央有一座小型喷泉，四周分布着各种摊位和店铺。这里是乌坦城最繁华的地方，三教九流汇聚于此，消息灵通。每逢年节，广场上还会举办庆典活动。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 20,
      exits: [
        { direction: '北', targetId: 'wutan_city_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'miter_house', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西', targetId: 'xiao_family_estate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '南', targetId: 'wutan_market', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东南', targetId: 'wutan_alley', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['xiao_yan', 'nalan_yanran'],
      isSafeZone: true,
      details: [
        { id: 'plaza_fountain', name: '广场喷泉', description: '广场中央的喷泉已经有些年头了，石雕的花纹斑驳陆离。泉水从顶部的兽首口中流出，叮咚作响。据说这座喷泉是乌坦城建城时就有的。', type: 'environment' },
        { id: 'plaza_storyteller', name: '说书先生', description: '广场角落，一位说书先生正眉飞色舞地讲着故事，周围围了不少听众。他讲的大多是斗气大陆上的奇闻轶事，偶尔也会提到一些远古秘辛。', type: 'interactive', hint: '听说书...', interactionResult: '你驻足听说书先生讲了一段炎帝萧炎的故事，听得津津有味。周围的听众也都沉浸其中。', rewardItemId: '故事茶点', rewardAmount: 1 },
        { id: 'plaza_board', name: '任务布告栏', description: '广场东侧立着一块巨大的布告栏，上面贴满了各种任务告示。有寻物的、有悬赏的、还有招募护卫的，琳琅满目。', type: 'interactive', hint: '查看布告...', interactionResult: '你浏览了布告栏上的各种任务，有不少看起来报酬丰厚，但也伴随着不小的风险。', rewardItemId: '任务清单', rewardAmount: 1 },
      ],
    },
    {
      id: 'xiao_family_estate',
      name: '萧家府邸',
      description: '乌坦城三大家族之一萧家的府邸，占地颇广。朱红的大门上悬挂着"萧府"的金字牌匾，气派不凡。府内亭台楼阁、花园回廊错落有致，处处透着百年世家的底蕴。虽然近年来萧家势力有所衰退，但瘦死的骆驼比马大，在乌坦城中依然举足轻重。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 25,
      exits: [
        { direction: '东', targetId: 'wutan_city_plaza', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['xiao_zhan', 'xiao_yan', 'xiao_mei', 'xiao_xun_er'],
      isSafeZone: true,
      details: [
        { id: 'xiao_hall', name: '萧家大厅', description: '萧家的议事大厅，宽敞明亮。正墙上挂着萧家历代先祖的画像，画像下方是族长的宝座。每当族中有大事商议，萧家族长便会在此召集族人。', type: 'environment' },
        { id: 'xiao_training', name: '演武场', description: '萧家后院的演武场，地面铺着坚硬的青石板。场边摆放着各种兵器架，萧家子弟在此修炼斗技、锤炼体魄。想当年，那位天才少年也是在这里挥汗如雨。', type: 'environment' },
        { id: 'xiao_garden', name: '后花园', description: '萧家的后花园，种满了各种奇花异草。花园中央有一座小亭，亭中石桌上常摆着茶具。闲暇时，萧家族人会在此品茶赏花、谈天说地。', type: 'interactive', hint: '逛花园...', interactionResult: '你在萧家后花园中漫步，花香扑鼻，令人心旷神怡。花园中还有几株罕见的灵药，散发着淡淡的灵气。', rewardItemId: '凝神花', rewardAmount: 1 },
        { id: 'xiao_secret', name: '萧家密室', description: '据说萧家深处有一间密室，里面藏着萧家最珍贵的传承。但密室入口极其隐蔽，只有历代族长才知晓具体位置。', type: 'secret', hint: '寻找密室...', requiredRealm: 3 },
      ],
    },
    {
      id: 'wutan_market',
      name: '乌坦城集市',
      description: '乌坦城最热闹的集市，街道两旁店铺林立，摊贩叫卖声此起彼伏。这里出售各种丹药、兵器、功法秘籍，甚至还有从魔兽山脉中猎获的珍稀材料。只要你有足够的金币，几乎能在这里买到任何东西。集市上鱼龙混杂，三教九流应有尽有。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 20,
      exits: [
        { direction: '北', targetId: 'wutan_city_plaza', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'wutan_alley', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['xiao_yi_xian'],
      isSafeZone: true,
      details: [
        { id: 'market_potion', name: '丹药铺', description: '一家专卖丹药的店铺，柜台上摆放着各种瓶瓶罐罐。有疗伤的、有补气的、还有提升修为的，种类繁多。据说店主曾是一名二品炼药师。', type: 'interactive', hint: '查看丹药...', interactionResult: '你浏览了丹药铺的各种丹药，价格有高有低。一些高阶丹药更是价值不菲，令人咂舌。', rewardItemId: '回气丹', rewardAmount: 1 },
        { id: 'market_weapon', name: '兵器店', description: '一间兵器铺，墙上挂满了各种刀枪剑戟。有普通的铁剑，也有灌注了斗气的精钢兵器。店主是一位秃顶的老者，据说年轻时也是一名斗者。', type: 'interactive', hint: '挑选兵器...', interactionResult: '你仔细挑选了一番，发现虽然没有什么神兵利器，但也有几把锻造精良的好刀好剑。', rewardItemId: '精钢匕首', rewardAmount: 1 },
        { id: 'market_herb', name: '药草摊', description: '一个摆满各种药草的摊位，有常见的止血草、回灵草，也有一些罕见的灵药。摊主是一位老农模样的人，据说这些药草都是他亲自去魔兽山脉边缘采的。', type: 'interactive', hint: '挑选药草...', interactionResult: '你从药草摊上挑选了几株品质不错的灵药，摊主还热情地给你讲解了各种药草的功效。', rewardItemId: '止血草', rewardAmount: 3 },
        { id: 'market_gambling', name: '赌坊', description: '集市深处有一间赌坊，里面人声鼎沸。骰子声、吆喝声、欢呼声此起彼伏。不少冒险者在这里一掷千金，想要一夜暴富，但更多的人却是输得精光。', type: 'interactive', hint: '进去试试...', interactionResult: '你试着玩了几把骰子，运气时好时坏。最后算了算，竟然还小赢了一把。', rewardItemId: '金币', rewardAmount: 10 },
      ],
    },
    {
      id: 'wutan_alley',
      name: '乌坦城小巷',
      description: '乌坦城偏僻的小巷，阴暗潮湿，路面坑洼不平。两旁是破旧的房屋，大多是穷苦人家的居所。这里鱼龙混杂，藏着不少见不得光的交易。据说在小巷深处，还有通往城外的密道，是走私犯和盗贼的必经之路。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 10,
      exits: [
        { direction: '西北', targetId: 'wutan_city_plaza', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西', targetId: 'wutan_market', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'miter_house', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '南', targetId: 'yao_lao_cave', condition: '需找到隐秘入口', isHidden: true, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['mo_ying'],
      isSafeZone: false,
      details: [
        { id: 'alley_beggar', name: '落魄乞丐', description: '小巷角落里蜷缩着一个衣衫褴褛的乞丐，看似奄奄一息。但如果你仔细观察，会发现他的眼神偶尔闪过一丝精光，似乎并非普通乞丐那么简单。', type: 'interactive', hint: '施舍乞丐...', interactionResult: '你给了乞丐几个铜板，他感激地看了你一眼，低声说了句："小心萧家..."便不再言语。', rewardItemId: '神秘线索', rewardAmount: 1 },
        { id: 'alley_dealer', name: '黑市商人', description: '一个神秘的黑衣人站在小巷阴影中，低声兜售着各种来路不明的货物。有违禁的丹药、失窃的宝物，甚至还有功法残卷。', type: 'secret', hint: '查看货物...', requiredRealm: 1 },
        { id: 'alley_cave_entrance', name: '隐秘入口', description: '小巷最深处的墙壁上，有一处被杂草掩盖的裂缝。裂缝后面似乎别有洞天，隐约能感受到微弱的灵气波动。', type: 'secret', hint: '钻进去看看...', requiredRealm: 2 },
      ],
    },
    {
      id: 'miter_house',
      name: '米特尔拍卖行',
      description: '乌坦城中最奢华的建筑，米特尔家族旗下的拍卖行。金色的穹顶在阳光下熠熠生辉，大门前两尊白玉石狮威风凛凛。拍卖行内装饰华贵，各种奇珍异宝琳琅满目。每月一次的大型拍卖会，更是会吸引周边众多势力前来。这里不仅是交易的场所，更是打探消息、结交权贵的好地方。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 30,
      exits: [
        { direction: '西', targetId: 'wutan_city_plaza', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西南', targetId: 'wutan_alley', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['hai_bodong', 'ya_fei', 'hai_jiao_xiu'],
      isSafeZone: true,
      details: [
        { id: 'miter_hall', name: '拍卖大厅', description: '宽敞华丽的拍卖大厅，一排排座椅整齐地排列着。正前方是一座高台，那是拍卖师的位置。大厅四周还有豪华的包厢，是给贵客准备的。每逢拍卖会，这里总是座无虚席。', type: 'environment' },
        { id: 'miter_vip', name: '贵宾室', description: '拍卖行二楼的贵宾室，装修更加奢华。里面摆放着名贵的家具，墙上挂着名家字画。据说只有消费达到一定数额的贵客，才有资格进入贵宾室。', type: 'lore' },
        { id: 'miter_treasure', name: '珍宝阁', description: '拍卖行深处的珍宝阁，存放着最珍贵的拍卖品。各种珍稀丹药、高级功法、远古遗物应有尽有。珍宝阁守卫森严，寻常人根本无法靠近。', type: 'secret', hint: '想办法混入...', requiredRealm: 4 },
        { id: 'miter_teahouse', name: '休憩茶室', description: '拍卖行一侧的茶室，供宾客休息品茶。这里提供各种名贵的灵茶和精致的点心，是打听消息、结交朋友的好地方。', type: 'interactive', hint: '喝杯茶...', interactionResult: '你在茶室中找了个位置坐下，品着香醇的灵茶，听着周围宾客的高谈阔论，倒也了解了不少消息。', rewardItemId: '灵云雾茶', rewardAmount: 1 },
      ],
    },
    {
      id: 'yao_lao_cave',
      name: '药老山洞',
      description: '乌坦城地下深处的一座隐秘山洞，是药老沉睡之地。洞中光线昏暗，但四周的洞壁上却嵌着各种发光的矿石，散发着柔和的光芒。山洞中央有一座石台，石台上放着一枚古朴的黑色戒指。这里灵气浓郁，远胜外界，是修炼的绝佳之地。但山洞的位置极其隐秘，鲜有人知。',
      terrain: TerrainType.CAVE,
      spiritDensity: 60,
      exits: [
        { direction: '北', targetId: 'wutan_alley', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [
        { resourceId: 'spirit_herb', amount: 3, respawnTime: 600, harvestDifficulty: 2 }
      ],
      npcs: ['yao_lao', 'yao_tong'],
      isSafeZone: true,
      details: [
        { id: 'cave_ring', name: '黑色戒指', description: '山洞中央石台上放着一枚古朴的黑色戒指，看起来毫不起眼。但如果你仔细观察，会发现戒指上刻着极其细密的纹路，似乎蕴含着某种神秘的力量。这枚戒指，便是药老的栖身之所。', type: 'interactive', hint: '拿起戒指...', interactionResult: '你小心翼翼地拿起那枚黑色戒指，入手温润，一股奇异的感觉涌上心头。你隐隐觉得，这枚戒指绝不简单。', rewardItemId: '神秘戒指', rewardAmount: 1, requiredRealm: 2 },
        { id: 'cave_herbs', name: '灵药圃', description: '山洞角落有一小块灵药圃，种着各种珍稀的药草。这些药草在浓郁的灵气滋润下，长得格外茂盛。其中不乏一些外界罕见的灵药。', type: 'interactive', hint: '采集灵药...', interactionResult: '你在灵药圃中小心地采集了几株珍稀灵药，这些药草的品质极高，是炼制丹药的上好材料。', rewardItemId: '九转灵草', rewardAmount: 1 },
        { id: 'cave_pill', name: '丹炉', description: '山洞深处摆放着一尊古朴的丹炉，炉身刻满了神秘的符文。虽然已经多年未用，但丹炉上依然残留着淡淡的丹香。这尊丹炉，据说曾炼出过九品丹药。', type: 'lore' },
        { id: 'cave_secret', name: '药老传承', description: '据说这座山洞中藏着药老的毕生传承，包括炼丹之术和各种功法秘籍。但想要获得传承，必须得到药老的认可才行。', type: 'secret', hint: '寻找传承...', requiredRealm: 5 },
      ],
    },
  ]
};

ZoneBlueprintDB.register(DoupoWutanBlueprint);
