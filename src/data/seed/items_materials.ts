import { IItem, ItemType } from '../../domain/entities/Item';

/**
 * 小说风格材料数据
 * 参考：《遮天》《完美世界》《凡人修仙传》《斗破苍穹》《仙逆》等
 */

export const MATERIAL_ITEMS: IItem[] = [
  // ==================== 矿石类 ====================
  // 凡品矿石
  {
    id: 'iron_ore', name: '铁矿石', type: ItemType.MATERIAL, quality: '凡品',
    desc: '普通的铁矿石，随处可见。', price: 3, stackable: true, maxStack: 99, icon: '矿',
  },
  {
    id: 'copper_ore', name: '铜矿石', type: ItemType.MATERIAL, quality: '凡品',
    desc: '含铜量一般的矿石，可作铸造之用。', price: 4, stackable: true, maxStack: 99, icon: '矿',
  },
  {
    id: 'tin_ore', name: '锡矿石', type: ItemType.MATERIAL, quality: '凡品',
    desc: '质地柔软的金属矿石。', price: 3, stackable: true, maxStack: 99, icon: '矿',
  },
  // 良品矿石
  {
    id: 'silver_ore', name: '银矿石', type: ItemType.MATERIAL, quality: '良品',
    desc: '含有银质的矿石，可提炼白银。', price: 15, stackable: true, maxStack: 99, icon: '矿',
  },
  {
    id: 'gold_ore', name: '金矿石', type: ItemType.MATERIAL, quality: '良品',
    desc: '含有金质的矿石，价值不菲。', price: 25, stackable: true, maxStack: 99, icon: '矿',
  },
  {
    id: 'jade_rough', name: '璞玉', type: ItemType.MATERIAL, quality: '良品',
    desc: '未经雕琢的玉石原石。', price: 20, stackable: true, maxStack: 99, icon: '玉',
  },
  {
    id: 'cold_iron_ore', name: '寒铁矿石', type: ItemType.MATERIAL, quality: '良品',
    desc: '开采自极寒之地的矿石，触感冰冷。', price: 30, stackable: true, maxStack: 99, icon: '矿',
  },
  // 珍品矿石
  {
    id: 'mystic_iron', name: '玄铁', type: ItemType.MATERIAL, quality: '珍品',
    desc: '天外陨铁，质地坚硬，是炼器的上佳材料。', price: 80, stackable: true, maxStack: 99, icon: '铁',
  },
  {
    id: 'spirit_jade', name: '灵玉', type: ItemType.MATERIAL, quality: '珍品',
    desc: '蕴含灵气的玉石，可制作法器。', price: 100, stackable: true, maxStack: 99, icon: '玉',
  },
  {
    id: 'fire_crystal', name: '火晶石', type: ItemType.MATERIAL, quality: '珍品',
    desc: '诞生于火山深处的晶体，内藏烈焰。', price: 90, stackable: true, maxStack: 99, icon: '晶',
  },
  {
    id: 'ice_crystal', name: '冰晶石', type: ItemType.MATERIAL, quality: '珍品',
    desc: '万年寒冰凝结的晶体，可冻结万物。', price: 90, stackable: true, maxStack: 99, icon: '晶',
  },
  {
    id: 'thunder_stone', name: '雷纹石', type: ItemType.MATERIAL, quality: '珍品',
    desc: '被天雷劈中后形成的奇石，蕴含雷电之力。', price: 95, stackable: true, maxStack: 99, icon: '石',
  },
  // 极品矿石
  {
    id: 'star_metal', name: '星辰铁', type: ItemType.MATERIAL, quality: '极品',
    desc: '星辰陨落时留下的金属，闪烁星光。', price: 300, stackable: true, maxStack: 99, icon: '铁',
  },
  {
    id: 'dragon_bone', name: '龙骨', type: ItemType.MATERIAL, quality: '极品',
    desc: '真龙遗骨，可入药可炼器，珍贵无比。', price: 400, stackable: true, maxStack: 99, icon: '骨',
  },
  {
    id: 'phoenix_feather_gold', name: '凤血金', type: ItemType.MATERIAL, quality: '极品',
    desc: '凤凰涅槃时滴落的鲜血凝固成的金属，赤红如火。', price: 450, stackable: true, maxStack: 99, icon: '金',
  },
  {
    id: 'void_stone', name: '虚空石', type: ItemType.MATERIAL, quality: '极品',
    desc: '诞生于虚空裂缝中的奇石，可开辟空间。', price: 350, stackable: true, maxStack: 99, icon: '石',
  },
  // 仙品矿石
  {
    id: 'immortal_gold', name: '仙金', type: ItemType.MATERIAL, quality: '仙品',
    desc: '仙界独有的金属，炼制仙器必备材料。', price: 2000, stackable: true, maxStack: 99, icon: '金',
  },
  {
    id: 'chaos_stone', name: '混沌石', type: ItemType.MATERIAL, quality: '仙品',
    desc: '混沌初开时留下的奇石，蕴含创世之力。', price: 2500, stackable: true, maxStack: 99, icon: '石',
  },
  {
    id: 'world_tree_wood', name: '世界树心', type: ItemType.MATERIAL, quality: '仙品',
    desc: '世界树的核心，蕴含无穷生机。', price: 3000, stackable: true, maxStack: 99, icon: '木',
  },
  // 神品矿石
  {
    id: 'primordial_matter', name: '鸿蒙紫气', type: ItemType.MATERIAL, quality: '神品',
    desc: '天地初开时的第一缕紫气，成圣之基。', price: 10000, stackable: true, maxStack: 99, icon: '气',
  },

  // ==================== 灵草类 ====================
  // 凡品灵草
  {
    id: 'ginseng', name: '人参', type: ItemType.MATERIAL, quality: '凡品',
    desc: '普通的百年人参，可补气养血。', price: 5, stackable: true, maxStack: 99, icon: '草',
  },
  {
    id: 'goji_berry', name: '枸杞子', type: ItemType.MATERIAL, quality: '凡品',
    desc: '常见的滋补药材。', price: 2, stackable: true, maxStack: 99, icon: '果',
  },
  {
    id: 'angelica', name: '当归', type: ItemType.MATERIAL, quality: '凡品',
    desc: '活血调经的药材。', price: 3, stackable: true, maxStack: 99, icon: '草',
  },
  {
    id: 'lichen', name: '灵芝', type: ItemType.MATERIAL, quality: '凡品',
    desc: '普通灵芝，略有灵气。', price: 8, stackable: true, maxStack: 99, icon: '芝',
  },
  // 良品灵草
  {
    id: 'hundred_year_ginseng', name: '百年人参', type: ItemType.MATERIAL, quality: '良品',
    desc: '生长百年的老参，药效显著。', price: 25, stackable: true, maxStack: 99, icon: '参',
  },
  {
    id: 'snow_lotus', name: '雪莲', type: ItemType.MATERIAL, quality: '良品',
    desc: '生长于雪山之巅，清热解毒。', price: 35, stackable: true, maxStack: 99, icon: '莲',
  },
  {
    id: 'reishi', name: '赤灵芝', type: ItemType.MATERIAL, quality: '良品',
    desc: '通体赤红的灵芝，蕴含火属性灵气。', price: 30, stackable: true, maxStack: 99, icon: '芝',
  },
  {
    id: 'bamboo_leaf', name: '灵竹叶', type: ItemType.MATERIAL, quality: '良品',
    desc: '灵竹的嫩叶，可清心明目。', price: 15, stackable: true, maxStack: 99, icon: '叶',
  },
  // 珍品灵草
  {
    id: 'thousand_year_ginseng', name: '千年人参', type: ItemType.MATERIAL, quality: '珍品',
    desc: '千年老参，已成人形，可续命延年。', price: 120, stackable: true, maxStack: 99, icon: '参',
  },
  {
    id: 'nine_leaf_clover', name: '九叶剑草', type: ItemType.MATERIAL, quality: '珍品',
    desc: '一叶一世界，九叶可斩仙。完美世界十大宝术之一的本体。', price: 150, stackable: true, maxStack: 99, icon: '草',
  },
  {
    id: 'dragon_blood_grass', name: '龙血草', type: ItemType.MATERIAL, quality: '珍品',
    desc: '龙血浇灌而生，通体赤红如血。', price: 140, stackable: true, maxStack: 99, icon: '草',
  },
  {
    id: 'phoenix_tears_grass', name: '凤泪草', type: ItemType.MATERIAL, quality: '珍品',
    desc: '凤凰泪滴落处生长，可治愈一切伤势。', price: 160, stackable: true, maxStack: 99, icon: '草',
  },
  {
    id: 'nether_flower', name: '彼岸花', type: ItemType.MATERIAL, quality: '珍品',
    desc: '黄泉路上绽放的花，生死人肉白骨。', price: 130, stackable: true, maxStack: 99, icon: '花',
  },
  // 极品灵草
  {
    id: 'immortal_grass', name: '不死药', type: ItemType.MATERIAL, quality: '极品',
    desc: '传说中的不死仙药，可让人长生不死。', price: 500, stackable: true, maxStack: 99, icon: '药',
  },
  {
    id: 'chaos_lotus', name: '混沌青莲', type: ItemType.MATERIAL, quality: '极品',
    desc: '混沌中诞生的青莲，盘古便孕育其中。', price: 600, stackable: true, maxStack: 99, icon: '莲',
  },
  {
    id: 'yinyang_flower', name: '阴阳两仪花', type: ItemType.MATERIAL, quality: '极品',
    desc: '阴阳交汇之处诞生的奇花，可调和阴阳。', price: 450, stackable: true, maxStack: 99, icon: '花',
  },
  // 仙品灵草
  {
    id: 'peach_of_immortality', name: '蟠桃', type: ItemType.MATERIAL, quality: '仙品',
    desc: '王母娘娘蟠桃园中所产，九千年一熟。', price: 3000, stackable: true, maxStack: 99, icon: '桃',
  },
  {
    id: 'ginseng_fruit', name: '人参果', type: ItemType.MATERIAL, quality: '仙品',
    desc: '镇元大仙五庄观中所产，闻一闻活三百六十岁。', price: 2500, stackable: true, maxStack: 99, icon: '果',
  },
  {
    id: 'bodhi_seed', name: '菩提子', type: ItemType.MATERIAL, quality: '仙品',
    desc: '菩提树下结出的种子，可悟道明心。', price: 2000, stackable: true, maxStack: 99, icon: '子',
  },

  // ==================== 妖兽材料 ====================
  // 凡品
  {
    id: 'wolf_fang', name: '狼牙', type: ItemType.MATERIAL, quality: '凡品',
    desc: '普通野狼的獠牙，可作装饰。', price: 3, stackable: true, maxStack: 99, icon: '牙',
  },
  {
    id: 'boar_skin', name: '野猪皮', type: ItemType.MATERIAL, quality: '凡品',
    desc: '厚实的野猪皮，可制革。', price: 4, stackable: true, maxStack: 99, icon: '皮',
  },
  {
    id: 'rabbit_fur', name: '兔毛', type: ItemType.MATERIAL, quality: '凡品',
    desc: '柔软的兔毛，可纺织。', price: 2, stackable: true, maxStack: 99, icon: '毛',
  },
  // 良品
  {
    id: 'tiger_bone', name: '虎骨', type: ItemType.MATERIAL, quality: '良品',
    desc: '猛虎之骨，可入药，强筋健骨。', price: 25, stackable: true, maxStack: 99, icon: '骨',
  },
  {
    id: 'bear_gall', name: '熊胆', type: ItemType.MATERIAL, quality: '良品',
    desc: '黑熊之胆，清热解毒，明目养肝。', price: 30, stackable: true, maxStack: 99, icon: '胆',
  },
  {
    id: 'snake_skin', name: '蛇蜕', type: ItemType.MATERIAL, quality: '良品',
    desc: '灵蛇蜕下的皮，可炼制护甲。', price: 20, stackable: true, maxStack: 99, icon: '皮',
  },
  {
    id: 'eagle_feather', name: '鹰羽', type: ItemType.MATERIAL, quality: '良品',
    desc: '灵鹰的尾羽，可用于炼制箭矢。', price: 18, stackable: true, maxStack: 99, icon: '羽',
  },
  // 珍品
  {
    id: 'demon_core_low', name: '妖丹', type: ItemType.MATERIAL, quality: '珍品',
    desc: '妖兽修炼凝聚的内丹，蕴含妖力精华。', price: 100, stackable: true, maxStack: 99, icon: '丹',
  },
  {
    id: 'dragon_scale', name: '龙鳞', type: ItemType.MATERIAL, quality: '珍品',
    desc: '蛟龙之鳞，坚硬异常，是炼甲的极品材料。', price: 150, stackable: true, maxStack: 99, icon: '鳞',
  },
  {
    id: 'phoenix_feather', name: '凤羽', type: ItemType.MATERIAL, quality: '珍品',
    desc: '凤凰的尾羽，可御火，永不熄灭。', price: 180, stackable: true, maxStack: 99, icon: '羽',
  },
  {
    id: 'unicorn_horn', name: '麒麟角', type: ItemType.MATERIAL, quality: '珍品',
    desc: '麒麟之角，祥瑞之物，可辟邪镇煞。', price: 160, stackable: true, maxStack: 99, icon: '角',
  },
  {
    id: 'turtle_shell', name: '玄龟壳', type: ItemType.MATERIAL, quality: '珍品',
    desc: '万年玄龟的背甲，防御力惊人。', price: 140, stackable: true, maxStack: 99, icon: '壳',
  },
  // 极品
  {
    id: 'demon_core_high', name: '天妖丹', type: ItemType.MATERIAL, quality: '极品',
    desc: '天妖级别妖兽的内丹，妖力磅礴。', price: 400, stackable: true, maxStack: 99, icon: '丹',
  },
  {
    id: 'true_dragon_blood', name: '真龙血', type: ItemType.MATERIAL, quality: '极品',
    desc: '真龙之血，一滴可让凡人脱胎换骨。', price: 500, stackable: true, maxStack: 99, icon: '血',
  },
  {
    id: 'phoenix_heart', name: '凤凰心', type: ItemType.MATERIAL, quality: '极品',
    desc: '凤凰的心脏，蕴含涅槃之力。', price: 550, stackable: true, maxStack: 99, icon: '心',
  },
  // 仙品
  {
    id: 'qilin_blood', name: '麒麟血', type: ItemType.MATERIAL, quality: '仙品',
    desc: '瑞兽麒麟的精血，可提升气运。', price: 2500, stackable: true, maxStack: 99, icon: '血',
  },
  {
    id: 'basilisk_pearl', name: '玄武珠', type: ItemType.MATERIAL, quality: '仙品',
    desc: '玄武体内孕育的宝珠，可镇水辟邪。', price: 2200, stackable: true, maxStack: 99, icon: '珠',
  },

  // ==================== 天地灵物 ====================
  // 良品
  {
    id: 'spirit_water', name: '灵泉水', type: ItemType.MATERIAL, quality: '良品',
    desc: '蕴含灵气的泉水，饮用可恢复法力。', price: 12, stackable: true, maxStack: 99, icon: '水',
  },
  {
    id: 'earth_fire', name: '地火', type: ItemType.MATERIAL, quality: '良品',
    desc: '地底深处诞生的火焰，可用于炼丹炼器。', price: 18, stackable: true, maxStack: 99, icon: '火',
  },
  // 珍品
  {
    id: 'moonlight_water', name: '月华凝露', type: ItemType.MATERIAL, quality: '珍品',
    desc: '月光凝聚的露水，只在月圆之夜出现。', price: 90, stackable: true, maxStack: 99, icon: '露',
  },
  {
    id: 'sun_essence', name: '日精', type: ItemType.MATERIAL, quality: '珍品',
    desc: '太阳精华凝聚，炽热无比。', price: 85, stackable: true, maxStack: 99, icon: '精',
  },
  {
    id: 'earth_pulp', name: '地乳', type: ItemType.MATERIAL, quality: '珍品',
    desc: '大地深处孕育的灵液，可滋养肉身。', price: 95, stackable: true, maxStack: 99, icon: '乳',
  },
  {
    id: 'wind_eye', name: '风眼', type: ItemType.MATERIAL, quality: '珍品',
    desc: '风暴中心凝聚的精华，可操控风势。', price: 80, stackable: true, maxStack: 99, icon: '眼',
  },
  // 极品
  {
    id: 'five_elements_essence', name: '五行精魄', type: ItemType.MATERIAL, quality: '极品',
    desc: '金木水火土五行精华凝聚的灵物。', price: 350, stackable: true, maxStack: 99, icon: '魄',
  },
  {
    id: 'yin_yang_pearl', name: '阴阳珠', type: ItemType.MATERIAL, quality: '极品',
    desc: '阴阳交汇处诞生的宝珠，可调和阴阳二气。', price: 400, stackable: true, maxStack: 99, icon: '珠',
  },
  {
    id: 'life_death_water', name: '生死水', type: ItemType.MATERIAL, quality: '极品',
    desc: '生与死的交汇，一念生一念死。', price: 480, stackable: true, maxStack: 99, icon: '水',
  },
  // 仙品
  {
    id: 'heavenly_light', name: '天光', type: ItemType.MATERIAL, quality: '仙品',
    desc: '九天之上降临的神光，可净化一切。', price: 2000, stackable: true, maxStack: 99, icon: '光',
  },
  {
    id: 'nether_breath', name: '黄泉气', type: ItemType.MATERIAL, quality: '仙品',
    desc: '九幽黄泉中提炼的死气，可腐蚀万物。', price: 1800, stackable: true, maxStack: 99, icon: '气',
  },
  {
    id: 'karma_thread', name: '因果线', type: ItemType.MATERIAL, quality: '仙品',
    desc: '命运长河中抽出的丝线，可编织因果。', price: 2200, stackable: true, maxStack: 99, icon: '线',
  },
  // 神品
  {
    id: 'heavenly_way_fragment', name: '天道碎片', type: ItemType.MATERIAL, quality: '神品',
    desc: '天道崩裂时掉落的碎片，蕴含宇宙法则。', price: 8000, stackable: true, maxStack: 99, icon: '片',
  },
  {
    id: 'destiny_stone', name: '命运石', type: ItemType.MATERIAL, quality: '神品',
    desc: '可改变命运轨迹的奇石，因果不沾身。', price: 10000, stackable: true, maxStack: 99, icon: '石',
  },

  // ==================== 完美世界专属材料 ====================
  {
    id: 'immortal_copper', name: '仙铜', type: ItemType.MATERIAL, quality: '仙品',
    desc: '完美世界独有的金属，可铸造仙器。', price: 2200, stackable: true, maxStack: 99, icon: '铜',
  },
  {
    id: 'desolate_soil', name: '荒土', type: ItemType.MATERIAL, quality: '仙品',
    desc: '荒域独有的土壤，蕴含荒道法则。', price: 2000, stackable: true, maxStack: 99, icon: '土',
  },
  {
    id: 'god_spring_water', name: '神泉水', type: ItemType.MATERIAL, quality: '仙品',
    desc: '神泉之水，可洗筋伐髓，提升体质。', price: 2500, stackable: true, maxStack: 99, icon: '泉',
  },
  {
    id: 'sun_moon_stone', name: '日月石', type: ItemType.MATERIAL, quality: '极品',
    desc: '蕴含日月精华的奇石，可提升神魂。', price: 450, stackable: true, maxStack: 99, icon: '石',
  },
  {
    id: 'nine_death_grass', name: '九死仙藤', type: ItemType.MATERIAL, quality: '神品',
    desc: '完美世界十大凶兵之一，可杀人于无形。', price: 8000, stackable: true, maxStack: 99, icon: '藤',
  },

  // ==================== 斗破苍穹专属材料 ====================
  {
    id: 'fire_essence', name: '异火本源', type: ItemType.MATERIAL, quality: '仙品',
    desc: '异火的本源力量，可提升炼药术。', price: 3000, stackable: true, maxStack: 99, icon: '源',
  },
  {
    id: 'dragon_scale_material', name: '古龙鳞片', type: ItemType.MATERIAL, quality: '极品',
    desc: '远古巨龙的鳞片，可炼制顶级护甲。', price: 500, stackable: true, maxStack: 99, icon: '鳞',
  },
  {
    id: 'medusa_blood', name: '美杜莎之血', type: ItemType.MATERIAL, quality: '仙品',
    desc: '美杜莎女王的精血，可提升斗气化翼。', price: 2800, stackable: true, maxStack: 99, icon: '血',
  },
  {
    id: 'ancient_rune_stone', name: '古界符文', type: ItemType.MATERIAL, quality: '极品',
    desc: '古界遗留的符文，可增幅斗技威力。', price: 400, stackable: true, maxStack: 99, icon: '符',
  },
  {
    id: 'spirit_liquid', name: '斗气液', type: ItemType.MATERIAL, quality: '珍品',
    desc: '凝聚的斗气精华，可加速修炼。', price: 120, stackable: true, maxStack: 99, icon: '液',
  },

  // ==================== 凡人修仙传专属材料 ====================
  {
    id: 'green_bamboo_material', name: '青竹心', type: ItemType.MATERIAL, quality: '珍品',
    desc: '青竹蜂云剑的主材，蕴含剑灵。', price: 150, stackable: true, maxStack: 99, icon: '心',
  },
  {
    id: 'wind_thunder_essence', name: '风雷精髓', type: ItemType.MATERIAL, quality: '珍品',
    desc: '风雷翅的主材，蕴含风雷之力。', price: 180, stackable: true, maxStack: 99, icon: '精',
  },
  {
    id: 'golden_thread', name: '金雷竹丝', type: ItemType.MATERIAL, quality: '极品',
    desc: '韩立后期炼制飞剑的材料。', price: 450, stackable: true, maxStack: 99, icon: '丝',
  },
  {
    id: 'phoenix_feather_material', name: '天凤翎', type: ItemType.MATERIAL, quality: '仙品',
    desc: '天凤的翎羽，可炼制飞行法宝。', price: 2500, stackable: true, maxStack: 99, icon: '翎',
  },
  {
    id: 'blood_pearl', name: '血玉', type: ItemType.MATERIAL, quality: '良品',
    desc: '韩立早期修炼的辅助材料。', price: 30, stackable: true, maxStack: 99, icon: '玉',
  },

  // ==================== 遮天专属材料 ====================
  {
    id: 'bronze_immortal_metal', name: '仙铜', type: ItemType.MATERIAL, quality: '仙品',
    desc: '遮天中的仙金，可铸造帝器。', price: 3000, stackable: true, maxStack: 99, icon: '铜',
  },
  {
    id: 'golden_black_iron', name: '龙纹黑金', type: ItemType.MATERIAL, quality: '极品',
    desc: '叶凡的兵器材料，坚硬无比。', price: 500, stackable: true, maxStack: 99, icon: '金',
  },
  {
    id: 'desolate_essence', name: '荒道法则', type: ItemType.MATERIAL, quality: '神品',
    desc: '荒天帝的道则碎片，可感悟荒道。', price: 10000, stackable: true, maxStack: 99, icon: '则',
  },
  {
    id: 'heavenly_stone', name: '仙石', type: ItemType.MATERIAL, quality: '仙品',
    desc: '仙界流通的货币，蕴含浓郁仙气。', price: 2000, stackable: true, maxStack: 99, icon: '石',
  },
  {
    id: 'nine_life_fruit', name: '九世果', type: ItemType.MATERIAL, quality: '神品',
    desc: '可让人重生九世的神果。', price: 12000, stackable: true, maxStack: 99, icon: '果',
  },

  // ==================== 仙逆专属材料 ====================
  {
    id: 'heavenly_reverse_stone', name: '天逆石', type: ItemType.MATERIAL, quality: '仙品',
    desc: '天逆珠的材质，蕴含九色之力。', price: 2800, stackable: true, maxStack: 99, icon: '石',
  },
  {
    id: 'killing_essence', name: '杀戮本源', type: ItemType.MATERIAL, quality: '神品',
    desc: '王林在古神之地获得的本源力量。', price: 8000, stackable: true, maxStack: 99, icon: '源',
  },
  {
    id: 'ghost_essence', name: '鬼魂精华', type: ItemType.MATERIAL, quality: '珍品',
    desc: '厉鬼的精华，可炼制魂幡。', price: 150, stackable: true, maxStack: 99, icon: '魂',
  },
  {
    id: 'ancient_god_blood', name: '古神之血', type: ItemType.MATERIAL, quality: '仙品',
    desc: '古神的血液，可提升肉身强度。', price: 2500, stackable: true, maxStack: 99, icon: '血',
  },
  {
    id: 'dragon_blood_material', name: '龙血', type: ItemType.MATERIAL, quality: '极品',
    desc: '真龙的血液，可提升血脉。', price: 450, stackable: true, maxStack: 99, icon: '血',
  },

  // ==================== 更多矿石材料 ====================
  {
    id: 'meteorite_iron', name: '陨铁', type: ItemType.MATERIAL, quality: '良品',
    desc: '从天而降的陨铁，蕴含星辰之力。', price: 25, stackable: true, maxStack: 99, icon: '铁',
  },
  {
    id: 'cold_iron', name: '寒铁', type: ItemType.MATERIAL, quality: '珍品',
    desc: '万年寒潭中孕育的铁矿，触之生寒。', price: 80, stackable: true, maxStack: 99, icon: '铁',
  },
  {
    id: 'fire_copper', name: '火铜', type: ItemType.MATERIAL, quality: '珍品',
    desc: '火山深处孕育的铜矿，蕴含火属性灵气。', price: 90, stackable: true, maxStack: 99, icon: '铜',
  },
  {
    id: 'lightning_stone', name: '雷晶石', type: ItemType.MATERIAL, quality: '极品',
    desc: '常年被雷霆洗礼的晶石，蕴含雷电之力。', price: 350, stackable: true, maxStack: 99, icon: '石',
  },
  {
    id: 'ice_soul_stone', name: '冰魄石', type: ItemType.MATERIAL, quality: '极品',
    desc: '万年玄冰中孕育的晶石，蕴含极致寒气。', price: 400, stackable: true, maxStack: 99, icon: '石',
  },
  {
    id: 'phoenix_iron', name: '凤血铁', type: ItemType.MATERIAL, quality: '仙品',
    desc: '沾染凤凰精血的铁矿，可铸造神兵。', price: 2500, stackable: true, maxStack: 99, icon: '铁',
  },
  {
    id: 'dragon_crystal', name: '龙晶', type: ItemType.MATERIAL, quality: '仙品',
    desc: '龙族体内孕育的晶石，蕴含龙威。', price: 2800, stackable: true, maxStack: 99, icon: '晶',
  },
  {
    id: 'chaos_stone', name: '混沌石', type: ItemType.MATERIAL, quality: '神品',
    desc: '混沌初开时形成的奇石，蕴含混沌之力。', price: 8000, stackable: true, maxStack: 99, icon: '石',
  },
  {
    id: 'yinyang_stone', name: '阴阳石', type: ItemType.MATERIAL, quality: '神品',
    desc: '蕴含阴阳法则的神石，可调和万物。', price: 7500, stackable: true, maxStack: 99, icon: '石',
  },

  // ==================== 更多灵草材料 ====================
  {
    id: 'blood_ginseng', name: '血参', type: ItemType.MATERIAL, quality: '珍品',
    desc: '吸收日月精华生长的人参，可补气养血。', price: 60, stackable: true, maxStack: 99, icon: '参',
  },
  {
    id: 'snow_lotus', name: '雪莲', type: ItemType.MATERIAL, quality: '极品',
    desc: '雪山之巅生长的莲花，可清心明目。', price: 300, stackable: true, maxStack: 99, icon: '莲',
  },
  {
    id: 'ghost_mushroom', name: '鬼灵芝', type: ItemType.MATERIAL, quality: '极品',
    desc: '阴森之地生长的灵芝，蕴含阴属性灵气。', price: 280, stackable: true, maxStack: 99, icon: '芝',
  },
  {
    id: 'sun_flower', name: '向阳花', type: ItemType.MATERIAL, quality: '珍品',
    desc: '永远朝向太阳的灵花，蕴含纯阳之力。', price: 70, stackable: true, maxStack: 99, icon: '花',
  },
  {
    id: 'moon_grass', name: '月见草', type: ItemType.MATERIAL, quality: '珍品',
    desc: '只在月光下生长的灵草，蕴含太阴之力。', price: 75, stackable: true, maxStack: 99, icon: '草',
  },
  {
    id: 'dragon_bone_grass', name: '龙骨草', type: ItemType.MATERIAL, quality: '仙品',
    desc: '生长在龙骸之上的灵草，蕴含龙气。', price: 2000, stackable: true, maxStack: 99, icon: '草',
  },
  {
    id: 'phoenix_nirvana_grass', name: '涅槃草', type: ItemType.MATERIAL, quality: '仙品',
    desc: '凤凰涅槃之地生长的神草，可助人重生。', price: 2200, stackable: true, maxStack: 99, icon: '草',
  },
  {
    id: 'immortal_peach_pit', name: '蟠桃核', type: ItemType.MATERIAL, quality: '神品',
    desc: '蟠桃的果核，可种植出新的蟠桃树。', price: 6000, stackable: true, maxStack: 99, icon: '核',
  },

  // ==================== 更多妖兽材料 ====================
  {
    id: 'wolf_tooth', name: '狼牙', type: ItemType.MATERIAL, quality: '凡品',
    desc: '妖狼的牙齿，可制作低阶法器。', price: 5, stackable: true, maxStack: 99, icon: '牙',
  },
  {
    id: 'bear_paw', name: '熊掌', type: ItemType.MATERIAL, quality: '良品',
    desc: '妖熊的熊掌，可入药或炼制法宝。', price: 15, stackable: true, maxStack: 99, icon: '掌',
  },
  {
    id: 'snake_gall', name: '蛇胆', type: ItemType.MATERIAL, quality: '珍品',
    desc: '妖蛇的胆囊，可入药或明目。', price: 50, stackable: true, maxStack: 99, icon: '胆',
  },
  {
    id: 'tiger_bone', name: '虎骨', type: ItemType.MATERIAL, quality: '极品',
    desc: '妖虎的骨骼，可炼制强身健骨的丹药。', price: 200, stackable: true, maxStack: 99, icon: '骨',
  },
  {
    id: 'demon_core_low', name: '妖丹', type: ItemType.MATERIAL, quality: '珍品',
    desc: '妖兽体内凝结的内丹，蕴含妖兽毕生修为。', price: 100, stackable: true, maxStack: 99, icon: '丹',
  },
  {
    id: 'demon_core_high', name: '大妖内丹', type: ItemType.MATERIAL, quality: '极品',
    desc: '大妖体内凝结的内丹，蕴含庞大的妖力。', price: 450, stackable: true, maxStack: 99, icon: '丹',
  },
  {
    id: 'demon_core_king', name: '妖王内丹', type: ItemType.MATERIAL, quality: '仙品',
    desc: '妖王体内凝结的内丹，蕴含毁天灭地的妖力。', price: 3000, stackable: true, maxStack: 99, icon: '丹',
  },
  {
    id: 'qilin_horn', name: '麒麟角', type: ItemType.MATERIAL, quality: '仙品',
    desc: '麒麟的独角，可入药或炼制顶级法宝。', price: 3500, stackable: true, maxStack: 99, icon: '角',
  },

  // ==================== 更多天地灵物 ====================
  {
    id: 'earth_fire', name: '地火', type: ItemType.MATERIAL, quality: '极品',
    desc: '地底深处孕育的灵火，可炼丹炼器。', price: 300, stackable: true, maxStack: 99, icon: '火',
  },
  {
    id: 'spirit_spring', name: '灵泉', type: ItemType.MATERIAL, quality: '珍品',
    desc: '蕴含灵气的泉水，可洗涤身心。', price: 80, stackable: true, maxStack: 99, icon: '泉',
  },
  {
    id: 'thunder_pool', name: '雷池', type: ItemType.MATERIAL, quality: '仙品',
    desc: '雷霆汇聚之地形成的池水，可淬炼肉身。', price: 2500, stackable: true, maxStack: 99, icon: '池',
  },
  {
    id: 'wind_eye', name: '风眼', type: ItemType.MATERIAL, quality: '仙品',
    desc: '风暴中心孕育的灵物，蕴含风之法则。', price: 2200, stackable: true, maxStack: 99, icon: '眼',
  },
  {
    id: 'time_sand', name: '时光沙', type: ItemType.MATERIAL, quality: '神品',
    desc: '蕴含时间法则的神沙，可加速或减缓时间。', price: 9000, stackable: true, maxStack: 99, icon: '沙',
  },
  {
    id: 'space_crystal', name: '虚空晶', type: ItemType.MATERIAL, quality: '神品',
    desc: '虚空中孕育的晶石，蕴含空间法则。', price: 8500, stackable: true, maxStack: 99, icon: '晶',
  },
];
