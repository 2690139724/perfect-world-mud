import { IItem, ItemType, EquipmentSlot } from '../../domain/entities/Item';
import { getItemByIdOrThrow } from '../seed/items';

export interface IShopEntry {
  item: IItem;
  price: number;
  stock: number;
}

export interface IShop {
  roomId: string;
  name: string;
  greeting: string;
  items: IShopEntry[];
  /** 商店老板NPC ID（用于 ShopPriceService 关系折扣，可选） */
  ownerId?: string;
  /** 商店类型（general/blacksmith/alchemy 等，影响专业加成，可选） */
  shopType?: string;
}

export const SHOPS: IShop[] = [
  {
    roomId: 'stone_city_market',
    name: '集市杂货铺',
    greeting: '一位老掌柜笑眯眯地看着你："客官需要点什么？丹药、材料，应有尽有。"',
    items: [
      { item: getItemByIdOrThrow('heal_potion'), price: 10, stock: -1 },
      { item: getItemByIdOrThrow('mana_potion'), price: 10, stock: -1 },
      { item: getItemByIdOrThrow('exp_pill'), price: 25, stock: 10 },
      { item: getItemByIdOrThrow('spirit_herb'), price: 5, stock: -1 },
      {
        item: {
          id: 'seed_lingcao', name: '灵草种子', type: ItemType.MATERIAL, quality: '凡品',
          desc: '可种植出灵草的种子，是炼丹的基础材料。', price: 8, stackable: true, maxStack: 99, icon: '◈',
        },
        price: 8, stock: -1,
      },
      {
        item: {
          id: 'seed_xuelinghua', name: '血灵花种子', type: ItemType.MATERIAL, quality: '良品',
          desc: '可种植出血灵花的种子，血红色花朵是珍贵的炼丹材料。', price: 15, stackable: true, maxStack: 50, icon: '◈',
        },
        price: 15, stock: -1,
      },
      {
        item: {
          id: 'xuelinghua', name: '血灵花', type: ItemType.MATERIAL, quality: '良品',
          desc: '通体血红的灵花，炼丹的珍贵材料。', price: 20, stackable: true, maxStack: 50, icon: '✿',
        },
        price: 20, stock: -1,
      },
      {
        item: {
          id: 'lingcao', name: '灵草', type: ItemType.MATERIAL, quality: '凡品',
          desc: '普通的灵草，炼丹的基础材料。', price: 5, stackable: true, maxStack: 99, icon: '✿',
        },
        price: 5, stock: -1,
      },
      {
        item: {
          id: 'rune_stone_str', name: '力之符文石', type: ItemType.SPECIAL, quality: '良品',
          desc: '刻着"力"字的符文石，蕴含着不俗的力量。', price: 35, stackable: true, maxStack: 10, icon: '◈',
        },
        price: 35, stock: 5,
      },
      {
        item: {
          id: 'bone_necklace', name: '狼骨项链', type: ItemType.EQUIPMENT, quality: '凡品',
          desc: '凶兽骸骨制成的饰品，据说能辟邪。', price: 15, stackable: false, maxStack: 1, icon: '◯',
          slot: EquipmentSlot.ACCESSORY, stats: { defense: 2 },
        },
        price: 15, stock: 3,
      },
    ],
  },
  {
    roomId: 'stone_city_blacksmith',
    name: '铁匠铺',
    greeting: '铁匠铺里炉火正旺，精壮的铁匠放下铁锤："想要趁手的家伙？"',
    items: [
      { item: getItemByIdOrThrow('iron_sword'), price: 20, stock: 3 },
      { item: getItemByIdOrThrow('leather_armor'), price: 18, stock: 3 },
      { item: getItemByIdOrThrow('cloth_boots'), price: 12, stock: 3 },
      { item: getItemByIdOrThrow('iron_ore'), price: 3, stock: -1 },
      { item: getItemByIdOrThrow('bone_sword'), price: 45, stock: 2 },
    ],
  },
  {
    roomId: 'fire_pharmacy',
    name: '灵药阁',
    greeting: '一位药童迎上来："前辈需要什么丹药？本阁丹药品质上乘，包您满意。"',
    items: [
      {
        item: {
          id: 'heal_potion_2', name: '上品回春丹', type: ItemType.ELIXIR, quality: '良品',
          desc: '服用后恢复 80 点气血。', price: 30, stackable: true, maxStack: 20, icon: '◎',
          effect: { type: 'heal', value: 80 },
        },
        price: 30, stock: -1,
      },
      {
        item: {
          id: 'mana_potion_2', name: '上品凝气丹', type: ItemType.ELIXIR, quality: '良品',
          desc: '服用后恢复 50 点法力。', price: 30, stackable: true, maxStack: 20, icon: '◎',
          effect: { type: 'mana', value: 50 },
        },
        price: 30, stock: -1,
      },
      {
        item: {
          id: 'exp_pill_2', name: '小培元丹', type: ItemType.ELIXIR, quality: '良品',
          desc: '服用后增加 120 修为。', price: 60, stackable: true, maxStack: 10, icon: '◉',
          effect: { type: 'cultivation', value: 120 },
        },
        price: 60, stock: 10,
      },
      {
        item: {
          id: 'blood_grass', name: '血灵花', type: ItemType.MATERIAL, quality: '良品',
          desc: '通体血红的灵花，炼丹的珍贵材料。', price: 20, stackable: true, maxStack: 99, icon: '✿',
        },
        price: 20, stock: -1,
      },
      {
        item: {
          id: 'seed_ningxiangcao', name: '凝神草种子', type: ItemType.MATERIAL, quality: '良品',
          desc: '可种植出凝神草的种子，凝神草是恢复法力的好材料。', price: 20, stackable: true, maxStack: 30, icon: '◈',
        },
        price: 20, stock: -1,
      },
      {
        item: {
          id: 'ningxiangcao', name: '凝神草', type: ItemType.MATERIAL, quality: '良品',
          desc: '散发着清香的灵草，可辅助凝神静气。', price: 25, stackable: true, maxStack: 50, icon: '✿',
        },
        price: 25, stock: -1,
      },
      {
        item: {
          id: 'seed_moon_grass', name: '月光草种子', type: ItemType.MATERIAL, quality: '珍品',
          desc: '可种植出月光草的稀有种子，月光草只在月圆之夜成熟。', price: 50, stackable: true, maxStack: 20, icon: '◈',
        },
        price: 50, stock: 10,
      },
      {
        item: {
          id: 'moon_grass', name: '月光草', type: ItemType.MATERIAL, quality: '珍品',
          desc: '吸收月光精华生长的灵草，极为珍贵。', price: 80, stackable: true, maxStack: 30, icon: '✿',
        },
        price: 80, stock: 10,
      },
      {
        item: {
          id: 'spirit_gather_pill', name: '聚灵丹', type: ItemType.ELIXIR, quality: '良品',
          desc: '服用后增加 200 修为，修炼辅助丹药。', price: 80, stackable: true, maxStack: 10, icon: '◉',
          effect: { type: 'cultivation', value: 200 },
        },
        price: 80, stock: 8,
      },
    ],
  },
  {
    roomId: 'fire_pharmacy_up',
    name: '灵药阁·丹房',
    greeting: '丹老头也不抬："要买丹药就快点，老夫还忙着炼丹呢。"',
    items: [
      {
        item: {
          id: 'heal_potion_3', name: '极品回春丹', type: ItemType.ELIXIR, quality: '珍品',
          desc: '服用后恢复 200 点气血。', price: 80, stackable: true, maxStack: 20, icon: '◎',
          effect: { type: 'heal', value: 200 },
        },
        price: 80, stock: -1,
      },
      {
        item: {
          id: 'exp_pill_3', name: '大培元丹', type: ItemType.ELIXIR, quality: '珍品',
          desc: '服用后增加 500 修为。', price: 150, stackable: true, maxStack: 10, icon: '◉',
          effect: { type: 'cultivation', value: 500 },
        },
        price: 150, stock: 5,
      },
      {
        item: {
          id: 'breakthrough_pill', name: '破境丹', type: ItemType.ELIXIR, quality: '珍品',
          desc: '突破时服用可提升 15% 成功率。', price: 300, stackable: true, maxStack: 5, icon: '◉',
          effect: { type: 'cultivation', value: 0 },
        },
        price: 300, stock: 3,
      },
      {
        item: {
          id: 'seven_color_grass', name: '七彩草', type: ItemType.MATERIAL, quality: '珍品',
          desc: '叶片呈现七种颜色的灵草，极为罕见。', price: 100, stackable: true, maxStack: 99, icon: '✿',
        },
        price: 100, stock: 5,
      },
    ],
  },
  {
    roomId: 'butian_ge_danfang',
    name: '补天阁丹药司',
    greeting: '丹房长老微微颔首："本门弟子可用原始币兑换丹药，外人若有机缘，也可在此交易。"',
    items: [
      {
        item: {
          id: 'butian_pill', name: '补天丹', type: ItemType.ELIXIR, quality: '珍品',
          desc: '补天阁秘制丹药，恢复 150 点气血和 80 点法力。', price: 100, stackable: true, maxStack: 10, icon: '◉',
          effect: { type: 'heal', value: 150 },
        },
        price: 100, stock: 5,
      },
      {
        item: {
          id: 'spirit_pill', name: '通灵丹', type: ItemType.ELIXIR, quality: '珍品',
          desc: '服用后增加 400 修为，并临时提升修炼速度。', price: 130, stackable: true, maxStack: 10, icon: '◉',
          effect: { type: 'cultivation', value: 400 },
        },
        price: 130, stock: 5,
      },
      {
        item: {
          id: 'detox_pill', name: '解毒丹', type: ItemType.ELIXIR, quality: '良品',
          desc: '可解大部分毒素。', price: 25, stackable: true, maxStack: 10, icon: '◎',
          effect: { type: 'cure', value: 0 },
        },
        price: 25, stock: -1,
      },
      {
        item: {
          id: 'ginseng_root', name: '野生参须', type: ItemType.MATERIAL, quality: '良品',
          desc: '野山参的须根，炼丹辅材。', price: 15, stackable: true, maxStack: 99, icon: '¶',
        },
        price: 15, stock: -1,
      },
    ],
  },
  {
    roomId: 'hundred_breaks_entrance',
    name: '驼背老吴的小摊',
    greeting: '驼背老吴看到你，热情地招呼："来来来，进山之前准备充分了没有？"',
    items: [
      {
        item: {
          id: 'dry_ration', name: '干粮', type: ItemType.MATERIAL, quality: '凡品',
          desc: '充饥的干粮，野外探索必备。', price: 2, stackable: true, maxStack: 99, icon: '◆',
        },
        price: 2, stock: -1,
      },
      {
        item: {
          id: 'water_skin', name: '清水', type: ItemType.MATERIAL, quality: '凡品',
          desc: '一皮袋清水，解渴用。', price: 2, stackable: true, maxStack: 99, icon: '◆',
        },
        price: 2, stock: -1,
      },
      {
        item: {
          id: 'rope', name: '绳索', type: ItemType.MATERIAL, quality: '凡品',
          desc: '结实的麻绳，探险必备工具。', price: 5, stackable: true, maxStack: 10, icon: '◆',
        },
        price: 5, stock: -1,
      },
      {
        item: {
          id: 'jinchuang_yao', name: '金疮药', type: ItemType.ELIXIR, quality: '凡品',
          desc: '简易伤药，恢复 20 点气血。', price: 8, stackable: true, maxStack: 20, icon: '◎',
          effect: { type: 'heal', value: 20 },
        },
        price: 8, stock: -1,
      },
      {
        item: {
          id: 'torch', name: '火折子', type: ItemType.MATERIAL, quality: '凡品',
          desc: '可在黑暗中照明。', price: 3, stackable: true, maxStack: 10, icon: '◆',
        },
        price: 3, stock: -1,
      },
      { item: getItemByIdOrThrow('heal_potion'), price: 12, stock: 5 },
    ],
  },
  {
    roomId: 'fire_plaza',
    name: '火皇城商铺',
    greeting: '一位精明的掌柜迎上来："客官好眼力！火皇城百货齐全，您要的这里都有。"',
    items: [
      {
        item: {
          id: 'fire_charm', name: '火灵符', type: ItemType.SPECIAL, quality: '良品',
          desc: '火皇城符师制作的符箓，可释放火球攻击敌人。', price: 45, stackable: true, maxStack: 30, icon: '◈',
        },
        price: 45, stock: 10,
      },
      {
        item: {
          id: 'fire_blade', name: '焰纹刀', type: ItemType.EQUIPMENT, quality: '良品',
          desc: '刻有火焰纹路的精钢刀，火国兵器坊出品。', price: 60, stackable: false, maxStack: 1, icon: '⚔',
          slot: EquipmentSlot.WEAPON, stats: { attack: 12 },
        },
        price: 60, stock: 3,
      },
      {
        item: {
          id: 'fire_robe', name: '火蚕丝袍', type: ItemType.EQUIPMENT, quality: '良品',
          desc: '火蚕丝织成的法袍，防火耐热，轻便坚韧。', price: 55, stackable: false, maxStack: 1, icon: '🛡',
          slot: EquipmentSlot.ARMOR, stats: { defense: 6 },
        },
        price: 55, stock: 3,
      },
      {
        item: {
          id: 'fire_marrow', name: '火灵髓', type: ItemType.MATERIAL, quality: '珍品',
          desc: '火属性灵材，炼器和炼丹的珍贵辅材。', price: 80, stackable: true, maxStack: 50, icon: '♦',
        },
        price: 80, stock: 5,
      },
      { item: getItemByIdOrThrow('heal_potion'), price: 12, stock: -1 },
    ],
  },
  {
    roomId: 'stone_city_inn',
    name: '石城客栈',
    greeting: '掌柜笑眯眯地迎上来："客官，是要静修还是暂歇？本店有灵酿和灵气微薄的静室。"',
    items: [
      {
        item: {
          id: 'room_single', name: '静室', type: ItemType.SPECIAL, quality: '凡品',
          desc: '灵气微薄的单人静室，可静心调息，恢复少许气血。', price: 10, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 10, stock: -1,
      },
      {
        item: {
          id: 'room_double', name: '灵室', type: ItemType.SPECIAL, quality: '良品',
          desc: '汇聚微弱灵气的静室，恢复效果更佳。', price: 20, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 20, stock: -1,
      },
      {
        item: {
          id: 'lingjiu', name: '灵酿', type: ItemType.ELIXIR, quality: '良品',
          desc: '以灵泉水和灵谷酿制的美酒，蕴含微弱灵气，饮之可润经脉、恢复少许法力。', price: 15, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 15, stock: -1,
      },
      {
        item: {
          id: 'food_set', name: '灵食', type: ItemType.ELIXIR, quality: '良品',
          desc: '以灵谷、灵蔬烹制的菜肴，蕴含灵气，可滋养气血。', price: 25, stackable: true, maxStack: 5, icon: '◉',
        },
        price: 25, stock: -1,
      },
    ],
  },
  {
    roomId: 'stone_city_bank',
    name: '石城宝阁',
    greeting: '宝阁掌柜穿着体面的长袍，笑容可掬："客官，是要寄放灵石还是换取原始币？利息优厚，安全无忧。"',
    items: [
      {
        item: {
          id: 'bank_deposit', name: '寄放', type: ItemType.SPECIAL, quality: '凡品',
          desc: '将原始币寄放宝阁，每月获得10%利息。', price: 0, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 0, stock: -1,
      },
      {
        item: {
          id: 'bank_loan', name: '借贷', type: ItemType.SPECIAL, quality: '凡品',
          desc: '向宝阁借贷，需支付三分月息。', price: 0, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 0, stock: -1,
      },
      {
        item: {
          id: 'bank_vault', name: '藏宝库', type: ItemType.SPECIAL, quality: '良品',
          desc: '租用宝阁藏宝库，以阵法封印，安全存放贵重物品。', price: 50, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 50, stock: -1,
      },
    ],
  },
  {
    roomId: 'stone_city_tailor',
    name: '锦绣坊',
    greeting: '裁缝师傅正在裁剪灵蚕丝，头也不抬："客官要裁新衣？量体裁衣，保证合身。"',
    items: [
      {
        item: {
          id: 'cloth_robe', name: '青布道袍', type: ItemType.EQUIPMENT, quality: '凡品',
          desc: '以普通青布缝制的道袍，轻便舒适，适合修行者日常穿着。', price: 10, stackable: false, maxStack: 1, icon: '🛡',
          slot: EquipmentSlot.ARMOR, stats: { defense: 1 },
        },
        price: 10, stock: -1,
      },
      {
        item: {
          id: 'leather_boots_2', name: '灵皮靴', type: ItemType.EQUIPMENT, quality: '良品',
          desc: '以凶兽皮毛鞣制的靴子，轻便坚韧，可抵御少许寒气。', price: 35, stackable: false, maxStack: 1, icon: '🛡',
          slot: EquipmentSlot.BOOTS, stats: { defense: 3 },
        },
        price: 35, stock: 5,
      },
      {
        item: {
          id: 'fox_fur_coat', name: '银狐裘', type: ItemType.EQUIPMENT, quality: '珍品',
          desc: '以银狐皮毛缝制的披风，银光闪烁，保暖护身。', price: 80, stackable: false, maxStack: 1, icon: '🛡',
          slot: EquipmentSlot.ACCESSORY, stats: { defense: 5 },
        },
        price: 80, stock: 2,
      },
      {
        item: {
          id: 'tailor_repair', name: '修补', type: ItemType.SPECIAL, quality: '凡品',
          desc: '修补破损的衣物法器。', price: 5, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 5, stock: -1,
      },
    ],
  },
  {
    roomId: 'stone_city_bookstore',
    name: '藏经阁',
    greeting: '藏经阁阁主正在整理典籍："客官想看些什么？功法、丹方、阵法，应有尽有。"',
    items: [
      {
        item: {
          id: 'basic_alchemy_book', name: '丹方初解', type: ItemType.SPECIAL, quality: '凡品',
          desc: '记载十种基础丹药炼制方法的古籍，适合初学丹道者。', price: 30, stackable: false, maxStack: 1, icon: '◉',
        },
        price: 30, stock: 5,
      },
      {
        item: {
          id: 'basic_forge_book', name: '铸器入门', type: ItemType.SPECIAL, quality: '凡品',
          desc: '介绍炼器基础知识的典籍，涵盖选材、熔炼、铭刻等步骤。', price: 30, stackable: false, maxStack: 1, icon: '◉',
        },
        price: 30, stock: 5,
      },
      {
        item: {
          id: 'cultivation_manual', name: '修行心得', type: ItemType.SPECIAL, quality: '良品',
          desc: '一位化灵境修士的毕生感悟，记录了突破瓶颈的心得。', price: 50, stackable: false, maxStack: 1, icon: '◉',
        },
        price: 50, stock: 3,
      },
      {
        item: {
          id: 'local_history', name: '荒域志', type: ItemType.SPECIAL, quality: '良品',
          desc: '记载荒域各地风土人情、秘境传说的志书。', price: 40, stackable: false, maxStack: 1, icon: '◉',
        },
        price: 40, stock: 5,
      },
    ],
  },
  {
    roomId: 'fire_teahouse',
    name: '清风茶楼',
    greeting: '茶博士热情地招呼："客官，请坐！本店的灵茶远近闻名，来一壶？"',
    items: [
      {
        item: {
          id: 'spirit_tea', name: '灵茶', type: ItemType.ELIXIR, quality: '良品',
          desc: '以灵泉水冲泡的好茶，蕴含微弱灵气，饮之可清心明目、提神醒脑。', price: 10, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 10, stock: -1,
      },
      {
        item: {
          id: 'premium_tea', name: '百年灵茶', type: ItemType.ELIXIR, quality: '珍品',
          desc: '采自灵山百年古茶树的茶叶，香气四溢，蕴含浓郁灵气，可辅助修炼。', price: 30, stackable: true, maxStack: 5, icon: '◉',
        },
        price: 30, stock: 10,
      },
      {
        item: {
          id: 'tea_set', name: '灵茶小点', type: ItemType.ELIXIR, quality: '良品',
          desc: '精致的灵谷糕点，配灵茶食用，可滋养气血。', price: 20, stackable: true, maxStack: 5, icon: '◉',
        },
        price: 20, stock: -1,
      },
    ],
  },
  {
    roomId: 'fire_jewelry',
    name: '珍宝阁',
    greeting: '掌柜小心翼翼地取出一件灵宝："客官好眼力！这可是稀世珍品，错过就没了。"',
    items: [
      {
        item: {
          id: 'spirit_ring', name: '灵玉戒', type: ItemType.EQUIPMENT, quality: '珍品',
          desc: '以千年灵玉雕琢而成的戒指，蕴含精纯灵气，可小幅提升修炼速度。', price: 200, stackable: false, maxStack: 1, icon: '◯',
          slot: EquipmentSlot.ACCESSORY, stats: { attack: 5 },
        },
        price: 200, stock: 3,
      },
      {
        item: {
          id: 'protection_amulet', name: '护身玉佩', type: ItemType.EQUIPMENT, quality: '珍品',
          desc: '刻有防御符文的古玉，蕴含浩然正气，可抵挡一次致命攻击。', price: 300, stackable: false, maxStack: 1, icon: '◯',
          slot: EquipmentSlot.ACCESSORY, stats: { defense: 8 },
        },
        price: 300, stock: 2,
      },
      {
        item: {
          id: 'storage_bag', name: '储物袋', type: ItemType.SPECIAL, quality: '珍品',
          desc: '以空间法则炼制的宝物，内有丈许空间，可存放物品。', price: 500, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 500, stock: 1,
      },
      {
        item: {
          id: 'ancient_scroll', name: '上古秘卷', type: ItemType.SPECIAL, quality: '神品',
          desc: '记载着上古秘闻的玉简，蕴含大道法则，极为珍贵。', price: 1000, stackable: false, maxStack: 1, icon: '◉',
        },
        price: 1000, stock: 1,
      },
    ],
  },
  {
    roomId: 'fire_weapons',
    name: '烈焰兵阁',
    greeting: '兵阁阁主是个魁梧的汉子："客官要选兵器？本店的神兵，火皇城第一！"',
    items: [
      {
        item: {
          id: 'iron_sword_2', name: '精钢剑', type: ItemType.EQUIPMENT, quality: '良品',
          desc: '以精炼玄铁锻造的长剑，锋利异常，可斩断普通兵器。', price: 80, stackable: false, maxStack: 1, icon: '⚔',
          slot: EquipmentSlot.WEAPON, stats: { attack: 10 },
        },
        price: 80, stock: 5,
      },
      {
        item: {
          id: 'flame_blade', name: '烈焰刀', type: ItemType.EQUIPMENT, quality: '珍品',
          desc: '以火灵铁锻造，刻有火焰符文的宝刀，攻击时可附带火焰伤害。', price: 200, stackable: false, maxStack: 1, icon: '⚔',
          slot: EquipmentSlot.WEAPON, stats: { attack: 18 },
        },
        price: 200, stock: 3,
      },
      {
        item: {
          id: 'heavy_axe', name: '玄铁巨斧', type: ItemType.EQUIPMENT, quality: '珍品',
          desc: '重达百斤的玄铁巨斧，威力惊人，可开山裂石。', price: 250, stackable: false, maxStack: 1, icon: '⚔',
          slot: EquipmentSlot.WEAPON, stats: { attack: 22 },
        },
        price: 250, stock: 2,
      },
      {
        item: {
          id: 'weapon_sharpen', name: '淬炼', type: ItemType.SPECIAL, quality: '凡品',
          desc: '以灵火淬炼兵器，提升锋利度和威力。', price: 20, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 20, stock: -1,
      },
    ],
  },
  {
    roomId: 'fire_rune_shop',
    name: '符文阁',
    greeting: '符文师正在刻画符文，神情专注："想要什么样的符文？攻击、防御、加速，应有尽有。"',
    items: [
      {
        item: {
          id: 'rune_attack', name: '攻击符文', type: ItemType.SPECIAL, quality: '良品',
          desc: '以灵纹石为基，刻画"力"字符文，可临时提升攻击力。', price: 50, stackable: true, maxStack: 20, icon: '◈',
        },
        price: 50, stock: -1,
      },
      {
        item: {
          id: 'rune_defense', name: '防御符文', type: ItemType.SPECIAL, quality: '良品',
          desc: '以灵纹石为基，刻画"御"字符文，可临时提升防御力。', price: 50, stackable: true, maxStack: 20, icon: '◈',
        },
        price: 50, stock: -1,
      },
      {
        item: {
          id: 'rune_speed', name: '神速符文', type: ItemType.SPECIAL, quality: '良品',
          desc: '以灵纹石为基，刻画"速"字符文，可临时提升身法速度。', price: 40, stackable: true, maxStack: 20, icon: '◈',
        },
        price: 40, stock: -1,
      },
      {
        item: {
          id: 'rune_strength', name: '巨力符文', type: ItemType.SPECIAL, quality: '珍品',
          desc: '以千年灵纹石为基，刻画高阶"力"字符文，大幅提升攻击力。', price: 120, stackable: true, maxStack: 10, icon: '◈',
        },
        price: 120, stock: 10,
      },
      {
        item: {
          id: 'rune_custom', name: '量身符文', type: ItemType.SPECIAL, quality: '珍品',
          desc: '符文师根据你的属性，亲自刻画专属符文。', price: 200, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 200, stock: -1,
      },
    ],
  },
  {
    roomId: 'fire_array_master',
    name: '阵法堂',
    greeting: '阵法师捋着胡须："阵法之道，博大精深。客官是想学习阵法，还是购买阵盘？"',
    items: [
      {
        item: {
          id: 'basic_array_book', name: '阵法初解', type: ItemType.SPECIAL, quality: '良品',
          desc: '介绍基础阵法知识的典籍，涵盖阵法原理和基础布置方法。', price: 80, stackable: false, maxStack: 1, icon: '◉',
        },
        price: 80, stock: 5,
      },
      {
        item: {
          id: 'defense_array', name: '玄盾阵盘', type: ItemType.SPECIAL, quality: '珍品',
          desc: '刻有玄盾阵法纹路的阵盘，可布置小型防御阵法，抵挡攻击。', price: 150, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 150, stock: 5,
      },
      {
        item: {
          id: 'trap_array', name: '困龙阵盘', type: ItemType.SPECIAL, quality: '珍品',
          desc: '刻有困龙阵法纹路的阵盘，可布置陷阱阵法，困敌于其中。', price: 120, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 120, stock: 5,
      },
      {
        item: {
          id: 'spirit_gather_array', name: '聚灵阵盘', type: ItemType.SPECIAL, quality: '神品',
          desc: '以天材地宝炼制的阵盘，可布置聚灵阵法，汇聚天地灵气，大幅提升修炼速度。', price: 500, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 500, stock: 2,
      },
    ],
  },
  {
    roomId: 'fire_marketplace',
    name: '火皇坊市',
    greeting: '坊市入口人来人往，叫卖声此起彼伏。一位老者热情地招呼："道友，来看看！这里什么都有！"',
    items: [
      {
        item: {
          id: 'market_herb', name: '灵草', type: ItemType.MATERIAL, quality: '良品',
          desc: '新鲜采摘的灵草，可用于炼丹或修炼。', price: 15, stackable: true, maxStack: 20, icon: '◉',
        },
        price: 15, stock: -1,
      },
      {
        item: {
          id: 'market_crystal', name: '灵晶', type: ItemType.MATERIAL, quality: '珍品',
          desc: '蕴含精纯灵气的晶石，可辅助修炼。', price: 80, stackable: true, maxStack: 10, icon: '◯',
        },
        price: 80, stock: 20,
      },
      {
        item: {
          id: 'market_bone', name: '凶兽骨', type: ItemType.MATERIAL, quality: '良品',
          desc: '凶兽骸骨，可用于炼器或制作骨器。', price: 40, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 40, stock: -1,
      },
      {
        item: {
          id: 'market_fur', name: '凶兽皮毛', type: ItemType.MATERIAL, quality: '珍品',
          desc: '珍贵的凶兽皮毛，可用于缝制护身衣物。', price: 100, stackable: true, maxStack: 5, icon: '◉',
        },
        price: 100, stock: 5,
      },
      {
        item: {
          id: 'market_egg', name: '灵兽蛋', type: ItemType.SPECIAL, quality: '神品',
          desc: '蕴含强大血脉的灵兽蛋，孵化后可成为强大的战宠。', price: 800, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 800, stock: 1,
      },
    ],
  },
  {
    roomId: 'fire_beast_shop',
    name: '灵兽坊',
    greeting: '灵兽坊内传来各种灵兽的叫声。坊主正在喂养一只小火狐，微笑着说："道友想挑选一只灵兽？"',
    items: [
      {
        item: {
          id: 'beast_fox', name: '灵狐', type: ItemType.SPECIAL, quality: '良品',
          desc: '温顺可爱的灵狐，可作为宠物，偶尔能感知危险。', price: 150, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 150, stock: 3,
      },
      {
        item: {
          id: 'beast_eagle', name: '灵鹰', type: ItemType.SPECIAL, quality: '珍品',
          desc: '可飞行的灵鹰，速度快，可用于侦查和代步。', price: 300, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 300, stock: 2,
      },
      {
        item: {
          id: 'beast_wolf', name: '战狼', type: ItemType.SPECIAL, quality: '珍品',
          desc: '凶猛的战狼，攻击力强，可协助战斗。', price: 400, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 400, stock: 2,
      },
      {
        item: {
          id: 'beast_feed', name: '灵兽口粮', type: ItemType.MATERIAL, quality: '良品',
          desc: '专门喂养灵兽的灵谷，可提升灵兽好感度。', price: 20, stackable: true, maxStack: 20, icon: '◉',
        },
        price: 20, stock: -1,
      },
    ],
  },
  {
    roomId: 'fire_dan_tower',
    name: '丹塔',
    greeting: '丹塔高耸入云，一股浓郁的药香扑面而来。丹塔长老微微一笑："道友是来炼丹，还是购买丹药？"',
    items: [
      {
        item: {
          id: 'dan_pill_heal', name: '疗伤丹', type: ItemType.ELIXIR, quality: '良品',
          desc: '可快速恢复气血的丹药。', price: 50, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 50, stock: -1,
      },
      {
        item: {
          id: 'dan_pill_mana', name: '法力丹', type: ItemType.ELIXIR, quality: '良品',
          desc: '可快速恢复法力的丹药。', price: 60, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 60, stock: -1,
      },
      {
        item: {
          id: 'dan_pill_cultivate', name: '筑基丹', type: ItemType.ELIXIR, quality: '珍品',
          desc: '可辅助突破境界的丹药，增加突破成功率。', price: 300, stackable: true, maxStack: 5, icon: '◉',
        },
        price: 300, stock: 10,
      },
      {
        item: {
          id: 'dan_pill_strength', name: '大力丹', type: ItemType.ELIXIR, quality: '珍品',
          desc: '可临时提升力量的丹药，战斗时使用效果极佳。', price: 150, stackable: true, maxStack: 5, icon: '◉',
        },
        price: 150, stock: 20,
      },
      {
        item: {
          id: 'dan_pill_escape', name: '遁速丹', type: ItemType.ELIXIR, quality: '珍品',
          desc: '可大幅提升移动速度的丹药，逃跑或追击时使用。', price: 120, stackable: true, maxStack: 5, icon: '◉',
        },
        price: 120, stock: 20,
      },
    ],
  },
  {
    roomId: 'fire_ye_family',
    name: '叶府',
    greeting: '叶家族长正在翻阅丹方："道友光临叶府，是要买丹药，还是有其他事？"',
    items: [
      {
        item: {
          id: 'ye_heal_pill', name: '叶家疗伤丹', type: ItemType.ELIXIR, quality: '珍品',
          desc: '叶家秘制的疗伤丹，疗效远超普通疗伤丹。', price: 80, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 80, stock: 10,
      },
      {
        item: {
          id: 'ye_mana_pill', name: '叶家法力丹', type: ItemType.ELIXIR, quality: '珍品',
          desc: '叶家秘制的法力丹，恢复效果更佳。', price: 90, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 90, stock: 10,
      },
      {
        item: {
          id: 'ye_cultivate_pill', name: '叶家筑基丹', type: ItemType.ELIXIR, quality: '神品',
          desc: '叶家秘制的筑基丹，大幅增加突破成功率。', price: 500, stackable: true, maxStack: 5, icon: '◉',
        },
        price: 500, stock: 5,
      },
      {
        item: {
          id: 'ye_recipe', name: '丹方残卷', type: ItemType.SPECIAL, quality: '珍品',
          desc: '叶家祖传的丹方残卷，记载着六品丹药的炼制方法。', price: 800, stackable: false, maxStack: 1, icon: '◉',
        },
        price: 800, stock: 1,
      },
    ],
  },
  {
    roomId: 'fire_wang_family',
    name: '王府',
    greeting: '王家族长正在锻造兵器："道友来王府，是要锻造兵器，还是有其他事？"',
    items: [
      {
        item: {
          id: 'wang_sword', name: '王家精铁剑', type: ItemType.EQUIPMENT, quality: '珍品',
          desc: '王家锻造的精铁剑，锋利异常。', price: 150, stackable: false, maxStack: 1, icon: '⚔',
          slot: EquipmentSlot.WEAPON, stats: { attack: 15 },
        },
        price: 150, stock: 5,
      },
      {
        item: {
          id: 'wang_blade', name: '王家烈焰刀', type: ItemType.EQUIPMENT, quality: '神品',
          desc: '王家锻造的烈焰刀，刻有火焰符文，威力惊人。', price: 400, stackable: false, maxStack: 1, icon: '⚔',
          slot: EquipmentSlot.WEAPON, stats: { attack: 25 },
        },
        price: 400, stock: 2,
      },
      {
        item: {
          id: 'wang_armor', name: '王家玄铁甲', type: ItemType.EQUIPMENT, quality: '珍品',
          desc: '王家锻造的玄铁甲，防御力强。', price: 200, stackable: false, maxStack: 1, icon: '🛡',
          slot: EquipmentSlot.ARMOR, stats: { defense: 12 },
        },
        price: 200, stock: 3,
      },
      {
        item: {
          id: 'wang_forge_map', name: '锻造图谱', type: ItemType.SPECIAL, quality: '珍品',
          desc: '王家祖传的锻造图谱，记载着上古炼器之法。', price: 600, stackable: false, maxStack: 1, icon: '◉',
        },
        price: 600, stock: 1,
      },
    ],
  },
  {
    roomId: 'fire_su_family',
    name: '苏府',
    greeting: '苏家族长正在推演阵法："道友光临苏府，是想学习阵法，还是购买阵盘？"',
    items: [
      {
        item: {
          id: 'su_defense_array', name: '苏家玄盾阵盘', type: ItemType.SPECIAL, quality: '珍品',
          desc: '苏家炼制的玄盾阵盘，防御力更强。', price: 200, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 200, stock: 5,
      },
      {
        item: {
          id: 'su_trap_array', name: '苏家困龙阵盘', type: ItemType.SPECIAL, quality: '珍品',
          desc: '苏家炼制的困龙阵盘，困敌效果更佳。', price: 180, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 180, stock: 5,
      },
      {
        item: {
          id: 'su_gather_array', name: '苏家聚灵阵盘', type: ItemType.SPECIAL, quality: '神品',
          desc: '苏家炼制的聚灵阵盘，汇聚灵气效果极佳。', price: 800, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 800, stock: 2,
      },
      {
        item: {
          id: 'su_array_book', name: '苏家阵法书', type: ItemType.SPECIAL, quality: '珍品',
          desc: '苏家祖传的阵法书籍，记载着各种高阶阵法。', price: 500, stackable: false, maxStack: 1, icon: '◉',
        },
        price: 500, stock: 1,
      },
    ],
  },
  {
    roomId: 'fire_chen_family',
    name: '陈府',
    greeting: '陈家族长正在查看账目："道友好！来陈家是做生意，还是有其他事？"',
    items: [
      {
        item: {
          id: 'chen_treasure', name: '陈家珍宝', type: ItemType.SPECIAL, quality: '珍品',
          desc: '陈家收藏的珍宝，价值不菲。', price: 300, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 300, stock: 5,
      },
      {
        item: {
          id: 'chen_ancient', name: '太古灵晶', type: ItemType.SPECIAL, quality: '神品',
          desc: '太古时期的灵晶，蕴含浓郁灵气，极为珍贵。', price: 2000, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 2000, stock: 1,
      },
      {
        item: {
          id: 'chen_contract', name: '生意契约', type: ItemType.SPECIAL, quality: '良品',
          desc: '与陈家签订的生意契约，可获得优惠。', price: 100, stackable: false, maxStack: 1, icon: '◉',
        },
        price: 100, stock: 10,
      },
    ],
  },
  {
    roomId: 'fire_zuixian_lou',
    name: '醉仙楼',
    greeting: '楼主优雅地站起来："道友好！欢迎来到醉仙楼。不知是要用餐，还是要雅间？"',
    items: [
      {
        item: {
          id: 'zuixian_wine', name: '灵猴酒', type: ItemType.ELIXIR, quality: '珍品',
          desc: '醉仙楼秘制的灵猴酒，蕴含浓郁灵气，饮之可润经脉。', price: 20, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 20, stock: -1,
      },
      {
        item: {
          id: 'zuixian_feng', name: '凤凰酒', type: ItemType.ELIXIR, quality: '神品',
          desc: '醉仙楼珍藏的凤凰酒，极为珍贵，饮之可大幅恢复气血和法力。', price: 50, stackable: true, maxStack: 5, icon: '◉',
        },
        price: 50, stock: 20,
      },
      {
        item: {
          id: 'zuixian_feast', name: '灵宴', type: ItemType.SPECIAL, quality: '珍品',
          desc: '醉仙楼的灵宴，汇聚各种灵食，可大幅恢复气血和法力。', price: 100, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 100, stock: -1,
      },
      {
        item: {
          id: 'zuixian_private', name: '醉仙楼雅间', type: ItemType.SPECIAL, quality: '神品',
          desc: '醉仙楼的雅间，可俯瞰火皇城夜景。', price: 500, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 500, stock: 5,
      },
    ],
  },
  {
    roomId: 'fire_baihua_fang',
    name: '百花舫',
    greeting: '舫主扭动着身姿走过来："哎哟，这位道友好生面生。来百花舫，是听曲，还是……"',
    items: [
      {
        item: {
          id: 'baihua_music', name: '歌舞表演', type: ItemType.SPECIAL, quality: '珍品',
          desc: '百花舫的歌舞表演，赏心悦目。', price: 50, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 50, stock: -1,
      },
      {
        item: {
          id: 'baihua_private', name: '百花舫密室', type: ItemType.SPECIAL, quality: '神品',
          desc: '百花舫的密室，私密空间。', price: 100, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 100, stock: 5,
      },
      {
        item: {
          id: 'baihua_wine', name: '百花酿', type: ItemType.ELIXIR, quality: '珍品',
          desc: '百花舫的百花酿，香气扑鼻。', price: 30, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 30, stock: -1,
      },
    ],
  },
  {
    roomId: 'fire_jubao_ge',
    name: '聚宝阁',
    greeting: '老板笑眯眯地看着你："道友好！来聚宝阁，是想赌一把，还是……"',
    items: [
      {
        item: {
          id: 'jubao_chip', name: '筹码', type: ItemType.SPECIAL, quality: '良品',
          desc: '聚宝阁的筹码，可用于赌博。', price: 10, stackable: true, maxStack: 100, icon: '◈',
        },
        price: 10, stock: -1,
      },
      {
        item: {
          id: 'jubao_vip', name: 'VIP包厢', type: ItemType.SPECIAL, quality: '神品',
          desc: '聚宝阁的VIP包厢，最低下注一万枚原始币。', price: 10000, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 10000, stock: 3,
      },
    ],
  },
  {
    roomId: 'stone_city_shi_family',
    name: '石府',
    greeting: '石城城主正在处理公务："道友光临石府，有何指教？"',
    items: [
      {
        item: {
          id: 'shi_rune', name: '石族符文', type: ItemType.SPECIAL, quality: '珍品',
          desc: '石族先祖刻制的符文，蕴含强大力量。', price: 200, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 200, stock: 5,
      },
      {
        item: {
          id: 'shi_training', name: '石府演武', type: ItemType.SPECIAL, quality: '良品',
          desc: '在石府演武场修炼，可提升战斗技巧。', price: 50, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 50, stock: -1,
      },
    ],
  },
  {
    roomId: 'stone_city_li_family',
    name: '李府',
    greeting: '李富贵笑眯眯地迎上来："道友好！来李府是做生意，还是做客？"',
    items: [
      {
        item: {
          id: 'li_herb', name: '凝神草', type: ItemType.MATERIAL, quality: '良品',
          desc: '李家经营的凝神草，品质上乘。', price: 10, stackable: true, maxStack: 20, icon: '◉',
        },
        price: 10, stock: -1,
      },
      {
        item: {
          id: 'li_blood_flower', name: '血灵花', type: ItemType.MATERIAL, quality: '珍品',
          desc: '李家经营的血灵花，品质上乘。', price: 20, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 20, stock: -1,
      },
      {
        item: {
          id: 'li_ice_grass', name: '冰魄草', type: ItemType.MATERIAL, quality: '珍品',
          desc: '李家经营的冰魄草，品质上乘。', price: 30, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 30, stock: -1,
      },
      {
        item: {
          id: 'li_mineral', name: '灵矿石', type: ItemType.MATERIAL, quality: '珍品',
          desc: '李家经营的灵矿石，可用于炼器。', price: 50, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 50, stock: -1,
      },
    ],
  },
  {
    roomId: 'stone_city_xianglai_lou',
    name: '香来楼',
    greeting: '掌柜热情地招呼："道友好！欢迎来到香来楼。想吃点什么？"',
    items: [
      {
        item: {
          id: 'xiang_wine', name: '香来灵酒', type: ItemType.ELIXIR, quality: '良品',
          desc: '香来楼的灵酒，蕴含微弱灵气。', price: 5, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 5, stock: -1,
      },
      {
        item: {
          id: 'xiang_food', name: '香来灵食', type: ItemType.ELIXIR, quality: '良品',
          desc: '香来楼的灵食，可恢复少许气血。', price: 10, stackable: true, maxStack: 10, icon: '◉',
        },
        price: 10, stock: -1,
      },
      {
        item: {
          id: 'xiang_set', name: '香来套餐', type: ItemType.SPECIAL, quality: '珍品',
          desc: '香来楼的套餐，可恢复较多气血和法力。', price: 20, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 20, stock: -1,
      },
      {
        item: {
          id: 'xiang_private', name: '香来楼雅间', type: ItemType.SPECIAL, quality: '珍品',
          desc: '香来楼的雅间，可俯瞰石城景色。', price: 50, stackable: false, maxStack: 1, icon: '◈',
        },
        price: 50, stock: 3,
      },
    ],
  },
];

export function findShop(roomId: string): IShop | undefined {
  return SHOPS.find(s => s.roomId === roomId);
}