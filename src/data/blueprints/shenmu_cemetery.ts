import { ZoneBlueprintDB, IZoneBlueprint } from './BlueprintDB';
import { TerrainType } from '../../domain/entities/Room';

const ShenmuCemeteryBlueprint: IZoneBlueprint = {
  id: 'shenmu_cemetery',
  name: '神魔陵园',
  type: 'dungeon',
  description: '神魔陵园，天地间最神秘的禁地之一。这里埋葬着太古时期的诸神与众魔，每一寸土地都弥漫着浓郁的死气与神魔之力。陵园中阴风阵阵，鬼哭狼嚎，无数亡灵在其间游荡。传说中，这里是连接生与死的边界，是神魔陨落后的归宿之地。',
  recommendedLevel: 5,
  entrances: [],
  rooms: [
    {
      id: 'shenmu_gate',
      name: '神魔陵园入口',
      description: '一座高达百丈的巨大石门矗立在天地之间，门上刻着"神魔陵园"四个太古大字，每一笔都蕴含着无尽的威压。石门半开，门缝中透出阵阵阴风，仿佛要将人的灵魂都吸进去。门前两尊石像，左为神，右为魔，双目闭合，却散发着令人心悸的气息。',
      terrain: TerrainType.RUIN,
      spiritDensity: 30,
      exits: [
        { direction: '内', targetId: 'shenmu_main_path', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'shenmu_main_path', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [],
      resources: [],
      npcs: ['chen_nan', 'feng_zi', 'xiao_bai'],
      isSafeZone: false,
      details: [
        { id: 'gate_stone', name: '神魔石门', description: '这扇石门由整块神魔石铸就，重达亿万斤。门上的符文是太古时期的神文与魔文交织而成，蕴含着封印与开启的双重力量。据说只有拥有神魔血脉之人，才能完全推开这扇大门。', type: 'lore' },
        { id: 'gate_statue_god', name: '天神石像', description: '左侧的天神石像，面容慈悲，双手结印，周身刻满了神纹。虽然只是石像，却散发着淡淡的神威，让邪恶之物不敢靠近。据说这是太古时期一位神王的雕像，死后以石像形态守护陵园入口。', type: 'lore' },
        { id: 'gate_statue_demon', name: '魔王石像', description: '右侧的魔王石像，面目狰狞，手持魔戟，周身缠绕着魔气。与天神石像相对而立，一神一魔，共同守护着这片陵园。传说这是太古时期一位魔王的雕像，与天神达成协议，共守此地。', type: 'lore' },
        { id: 'gate_soul', name: '徘徊的灵魂', description: '石门附近有许多模糊的人影在徘徊，他们是死后无法安息的灵魂，被神魔陵园的力量束缚在此。这些灵魂大多没有恶意，只是在寻找离开的方法。', type: 'environment' },
      ],
    },
    {
      id: 'shenmu_main_path',
      name: '神道',
      description: '一条由白骨铺就的道路，通向陵园深处。道路两旁矗立着无数墓碑，每一块墓碑都散发着不同的气息——有的神圣，有的邪恶，有的古朴，有的诡异。阴风呼啸，吹得路旁的鬼火忽明忽暗，仿佛有无数双眼睛在黑暗中窥视。',
      terrain: TerrainType.RUIN,
      spiritDensity: 40,
      exits: [
        { direction: '南', targetId: 'shenmu_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'shenmu_ancient_tomb', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'shenmu_undead_forest', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西', targetId: 'shenmu_god_tomb', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'wandering_soul', minCount: 2, maxCount: 4, spawnWeight: 100, respawnTime: 300 },
        { monsterId: 'bone_skeleton', minCount: 1, maxCount: 2, spawnWeight: 60, respawnTime: 600 }
      ],
      resources: [{ resourceId: 'ghost_fire', amount: 3, respawnTime: 600, harvestDifficulty: 3 }],
      npcs: ['zhu_ge_hou', 'chu_ge'],
      isSafeZone: false,
      details: [
        { id: 'path_bone', name: '白骨之路', description: '这条道路由无数神魔的骸骨铺就，每一块骨头都蕴含着生前的力量。行走在上面，能隐约听到远古的呐喊与悲鸣，那是神魔陨落时最后的嘶吼。', type: 'lore' },
        { id: 'path_tombstone', name: '无名墓碑', description: '道路两旁的墓碑大多已经风化，上面的名字模糊不清。这些都是太古时期陨落的神魔，虽然名姓已失，但他们的威名仍在天地间流传。', type: 'environment' },
        { id: 'path_fire', name: '鬼火', description: '一簇簇幽蓝色的鬼火在道路两旁飘荡，它们是亡灵的化身，也是神魔陵园的指路明灯。据说跟着鬼火走，能找到隐藏的宝藏，但也可能陷入万劫不复之地。', type: 'interactive', hint: '靠近鬼火...', interactionResult: '你小心翼翼地靠近一簇鬼火，它似乎有灵性，在你身边盘旋了几圈后飘向远方。你感到一股凉意袭来，但精神却清醒了不少。', rewardItemId: '鬼火精华', rewardAmount: 1 },
        { id: 'path_secret', name: '隐藏的暗道', description: '在一块不起眼的墓碑后面，有一个被杂草掩盖的洞口。据说这条暗道通向陵园的地下迷宫，那里埋葬着更多不为人知的秘密。', type: 'secret', hint: '探索暗道...', requiredRealm: 4 },
      ],
    },
    {
      id: 'shenmu_ancient_tomb',
      name: '远古坟墓',
      description: '神道尽头，一座巨大的古墓矗立在眼前。坟墓由黑色的巨石筑成，上面刻满了远古的符文，散发着幽幽的寒光。墓门半掩，里面传来阵阵腐朽的气息和低沉的咆哮。这座坟墓比周围的都要大得多，显然埋葬着非同一般的存在。',
      terrain: TerrainType.CAVE,
      spiritDensity: 50,
      exits: [
        { direction: '南', targetId: 'shenmu_main_path', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'shenmu_sky_pavilion', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'zombie_king', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 1800 },
        { monsterId: 'bone_skeleton', minCount: 2, maxCount: 4, spawnWeight: 80, respawnTime: 600 }
      ],
      resources: [
        { resourceId: 'ancient_jade', amount: 2, respawnTime: 1200, harvestDifficulty: 4 },
        { resourceId: 'death_crystal', amount: 1, respawnTime: 2400, harvestDifficulty: 6 }
      ],
      npcs: ['meng_ke_er'],
      isSafeZone: false,
      details: [
        { id: 'tomb_door', name: '远古墓门', description: '厚重的墓门上刻着远古的封印符文，虽然已经残破不堪，但仍能感受到其中蕴含的强大力量。墓门上有一个清晰的手印，似乎是有人强行破开封印留下的。', type: 'lore' },
        { id: 'tomb_coffin', name: '巨大石棺', description: '坟墓中央摆放着一具巨大的石棺，棺盖上刻着神秘的图案。石棺已经被打开，里面空空如也，只有一些破碎的衣物和陪葬品散落四周。看来墓主人早已不在棺中。', type: 'environment' },
        { id: 'tomb_treasure', name: '陪葬品', description: '坟墓四周散落着各种陪葬品，有金银珠宝，有兵器法宝，有丹药药材。但大部分都已经腐朽，只有少数品质极高的宝物还保存完好。', type: 'interactive', hint: '翻找陪葬品...', interactionResult: '你在陪葬品中翻找了一会儿，找到了一些还能用的东西。虽然大多已经残破，但聊胜于无。', rewardItemId: '古铜币', rewardAmount: 20 },
        { id: 'tomb_mural', name: '远古壁画', description: '墓壁上刻着精美的壁画，描绘着远古时期的一场大战。画面中，神与魔在天地间厮杀，日月无光，山河破碎。最后一幅画中，一个身影从坟墓中走出，仰天长啸。', type: 'secret', hint: '仔细观察壁画...', requiredRealm: 3 },
      ],
    },
    {
      id: 'shenmu_undead_forest',
      name: '亡灵森林',
      description: '神道东侧是一片阴森的森林，树木都是黑色的，没有一片叶子，光秃秃的枝桠伸向天空，如同鬼爪。森林中弥漫着浓浓的黑雾，伸手不见五指。偶尔传来凄厉的惨叫声和骨头摩擦的声音，让人毛骨悚然。这里是亡灵的乐园，也是生者的禁地。',
      terrain: TerrainType.FOREST,
      spiritDensity: 35,
      exits: [
        { direction: '西', targetId: 'shenmu_main_path', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'shenmu_demon_tomb', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'undead_beast', minCount: 2, maxCount: 3, spawnWeight: 100, respawnTime: 400 },
        { monsterId: 'wandering_soul', minCount: 1, maxCount: 3, spawnWeight: 70, respawnTime: 300 },
        { monsterId: 'ghost_general', minCount: 1, maxCount: 1, spawnWeight: 30, respawnTime: 1200 }
      ],
      resources: [
        { resourceId: 'death_herb', amount: 5, respawnTime: 600, harvestDifficulty: 2 },
        { resourceId: 'bone_fragment', amount: 4, respawnTime: 400, harvestDifficulty: 1 }
      ],
      npcs: ['long_wu'],
      isSafeZone: false,
      details: [
        { id: 'forest_tree', name: '枯骨树', description: '这些黑色的树木并非普通植物，而是由无数骸骨生长而成。它们以亡灵的怨念为养分，越往森林深处，树木越高大，也越危险。据说最深处的枯骨树已经有了灵性，能主动攻击入侵者。', type: 'lore' },
        { id: 'forest_fog', name: '亡灵黑雾', description: '森林中弥漫的黑雾是由无数亡灵的气息凝聚而成，具有腐蚀心智的作用。普通人进入不出片刻便会迷失方向，最终被黑雾吞噬，成为亡灵的一员。', type: 'environment' },
        { id: 'forest_soul', name: '怨灵', description: '森林中游荡着许多怨灵，它们都是带着不甘与怨恨死去的存在。这些怨灵比普通亡灵更加强大，也更加危险。它们会主动攻击生者，吸取其生命力。', type: 'environment' },
        { id: 'forest_lake', name: '血池', description: '森林深处有一个血红色的池塘，池水粘稠腥臭，散发着浓郁的血腥味。据说这是远古大战中神魔之血汇聚而成，具有不可思议的力量，但也极度危险。', type: 'secret', hint: '查看血池...', requiredRealm: 5 },
      ],
    },
    {
      id: 'shenmu_god_tomb',
      name: '神王墓',
      description: '神道西侧，一座气势恢宏的神殿矗立在天地间。与其他坟墓不同，这座坟墓散发着神圣的光芒，空气中弥漫着浓郁的神灵气息。神殿大门敞开，里面传来若有若无的诵经声。这是太古时期一位神王的长眠之地，虽然神王已逝，但他的神威仍在守护着这片土地。',
      terrain: TerrainType.RUIN,
      spiritDensity: 70,
      exits: [
        { direction: '东', targetId: 'shenmu_main_path', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'shenmu_sky_pavilion', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'tomb_spirit', minCount: 2, maxCount: 4, spawnWeight: 100, respawnTime: 600 },
        { monsterId: 'god_guardian', minCount: 1, maxCount: 1, spawnWeight: 50, respawnTime: 1800 }
      ],
      resources: [
        { resourceId: 'divine_crystal', amount: 2, respawnTime: 1800, harvestDifficulty: 6 },
        { resourceId: 'god_herb', amount: 3, respawnTime: 1200, harvestDifficulty: 5 }
      ],
      npcs: ['du_gu_bai'],
      isSafeZone: false,
      details: [
        { id: 'god_temple', name: '神王神殿', description: '这座神殿完全由神晶筑成，每一块砖石都蕴含着神圣的力量。虽然经历了无尽岁月，但神殿依然光彩夺目，没有丝毫腐朽的迹象。这就是神王的底蕴，即使死去，也能让自己的长眠之地永恒不朽。', type: 'lore' },
        { id: 'god_throne', name: '神王宝座', description: '神殿深处，一张由神骨铸成的宝座静静矗立。宝座上空无一人，但宝座上仍残留着神王的气息。据说神王并未真正死去，他只是在沉睡中等待着苏醒的时机。', type: 'environment' },
        { id: 'god_sutra', name: '太古神文', description: '神殿四周的墙壁上刻满了太古神文，这些都是神王生前修炼的功法和感悟。虽然大部分已经模糊不清，但残存的部分仍然蕴含着无尽的奥秘。若是能够领悟，必将受益无穷。', type: 'interactive', hint: '研读神文...', interactionResult: '你凝神研读墙壁上的神文，虽然只能看懂一小部分，但感觉对修炼之道有了新的领悟。神王的境界，果然深不可测。', rewardItemId: '神文碎片', rewardAmount: 1, requiredRealm: 5 },
        { id: 'god_secret', name: '神王传承', description: '神殿最深处，有一个被神光笼罩的石台。据说那是神王传承之地，只有得到神王认可之人，才能获得他的传承。但神王的考验极其严苛，无数年来，没有一人能够成功。', type: 'secret', hint: '接受考验...', requiredRealm: 7 },
      ],
    },
    {
      id: 'shenmu_demon_tomb',
      name: '魔王墓',
      description: '亡灵森林深处，一座漆黑如墨的魔殿矗立在眼前。与神王墓的神圣不同，这座坟墓散发着令人心悸的魔气，四周的空气都仿佛凝固了一般。魔殿大门紧闭，门上刻着狰狞的魔头图案，似乎随时都会活过来将人吞噬。这是太古时期一位魔王的埋骨之地。',
      terrain: TerrainType.RUIN,
      spiritDensity: 65,
      exits: [
        { direction: '西', targetId: 'shenmu_undead_forest', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '北', targetId: 'shenmu_sky_pavilion', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'demon_spirit', minCount: 2, maxCount: 3, spawnWeight: 100, respawnTime: 600 },
        { monsterId: 'demon_guardian', minCount: 1, maxCount: 1, spawnWeight: 40, respawnTime: 1800 }
      ],
      resources: [
        { resourceId: 'demon_crystal', amount: 2, respawnTime: 1800, harvestDifficulty: 6 },
        { resourceId: 'demon_herb', amount: 3, respawnTime: 1200, harvestDifficulty: 5 }
      ],
      npcs: ['da_mo_tian_wang'],
      isSafeZone: false,
      details: [
        { id: 'demon_palace', name: '魔王魔殿', description: '这座魔殿由漆黑的魔晶筑成，每一块砖石都散发着邪异的光芒。与神王墓不同，魔殿给人的感觉是压抑、恐惧、疯狂。但不可否认的是，其中蕴含的力量同样强大无比。', type: 'lore' },
        { id: 'demon_throne', name: '魔王宝座', description: '魔殿深处，一张由魔骨铸成的宝座静静矗立。宝座上残留着魔王的气息，邪恶而霸道。据说魔王死后，其魔念不散，仍在魔殿中游荡，寻找着合适的传人。', type: 'environment' },
        { id: 'demon_tome', name: '魔功秘籍', description: '魔殿四周的墙壁上刻满了魔文，这些都是魔王生前修炼的魔功。虽然大多已经残缺，但仍然能感受到其中蕴含的霸道力量。只是修炼魔功风险极大，稍有不慎便会走火入魔。', type: 'interactive', hint: '研读魔文...', interactionResult: '你小心翼翼地研读墙壁上的魔文，只觉得一股邪恶的力量涌入脑海。你连忙收敛心神，但还是感觉到了魔功的霸道。', rewardItemId: '魔文碎片', rewardAmount: 1, requiredRealm: 5 },
        { id: 'demon_secret', name: '魔王传承', description: '魔殿最深处，有一个被魔气笼罩的石台。据说那是魔王传承之地，只有得到魔王认可之人，才能获得他的传承。但魔王的传承充满了诅咒，获得力量的同时，也会付出惨重的代价。', type: 'secret', hint: '接受传承...', requiredRealm: 7 },
      ],
    },
    {
      id: 'shenmu_sky_pavilion',
      name: '登天阁',
      description: '神魔陵园的最深处，一座通天之塔直插云霄。这座塔一半神圣一半邪恶，左半边散发着金色的神光，右半边缭绕着黑色的魔气，神魔之力在塔顶交汇，形成一个巨大的漩涡。传说中，这座塔是连接天界与魔界的通道，也是神魔陵园的核心所在。登上塔顶，或许能找到离开这里的方法，或者...更可怕的东西。',
      terrain: TerrainType.SPECIAL,
      spiritDensity: 100,
      exits: [
        { direction: '南', targetId: 'shenmu_ancient_tomb', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '西南', targetId: 'shenmu_god_tomb', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东南', targetId: 'shenmu_demon_tomb', condition: undefined, isHidden: false, travelCost: 0 }
      ],
      monsters: [
        { monsterId: 'ancient_guardian', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 3600 },
        { monsterId: 'demon_general', minCount: 1, maxCount: 1, spawnWeight: 80, respawnTime: 3600 },
        { monsterId: 'god_general', minCount: 1, maxCount: 1, spawnWeight: 80, respawnTime: 3600 }
      ],
      resources: [
        { resourceId: 'heavenly_crystal', amount: 1, respawnTime: 7200, harvestDifficulty: 8 },
        { resourceId: 'demon_god_fruit', amount: 1, respawnTime: 14400, harvestDifficulty: 9 }
      ],
      npcs: ['yu_qing_xian'],
      isSafeZone: false,
      details: [
        { id: 'pavilion_tower', name: '登天神塔', description: '这座塔名为"登天阁"，是太古时期神魔共同建造的。据说塔高九千九百九十九层，每一层都有不同的考验和机缘。能够登上塔顶的人，便能超脱生死，真正的"登天"。但无数年来，从未有人成功过。', type: 'lore' },
        { id: 'pavilion_door', name: '神魔之门', description: '塔的入口是一扇巨大的门，左边是神纹，右边是魔纹，门上有一个巨大的漩涡，缓缓旋转。这扇门就是神魔陵园的核心，也是通往更深层次的通道。据说门后是另一个世界，是神魔真正的归宿。', type: 'environment' },
        { id: 'pavilion_statue', name: '神魔雕像', description: '塔的左右两侧各有一尊巨大的雕像，左边是天神，右边是魔王。两尊雕像相对而立，虽然形态迥异，但气息却奇妙地和谐统一。这就是神魔的终极奥秘——神与魔，本就是一体两面。', type: 'lore' },
        { id: 'pavilion_secret', name: '登天之秘', description: '塔顶的漩涡中，隐约可见一座更宏伟的宫殿。据说那是真正的"天界"，是所有修炼者的终极目标。但想要到达那里，不仅需要强大的实力，还需要...一些特殊的东西。', type: 'secret', hint: '仰望塔顶...', requiredRealm: 8 },
      ],
    },
  ]
};

ZoneBlueprintDB.register(ShenmuCemeteryBlueprint);
