import { IItem, ItemType } from '../../domain/entities/Item';

/**
 * 小说风格丹药数据
 * 参考：《斗破苍穹》《凡人修仙传》《遮天》《仙逆》《一念永恒》等
 */

export const ELIXIR_ITEMS: IItem[] = [
  // ==================== 恢复类丹药 ====================
  // 凡品
  {
    id: 'bandage', name: '绷带', type: ItemType.ELIXIR, quality: '凡品',
    desc: '普通布条，可包扎伤口。', price: 2, stackable: true, maxStack: 99, icon: '带',
    effect: { type: 'heal', value: 20 },
  },
  {
    id: 'herbal_paste', name: '金疮药', type: ItemType.ELIXIR, quality: '凡品',
    desc: '外敷止血的药膏。', price: 5, stackable: true, maxStack: 99, icon: '膏',
    effect: { type: 'heal', value: 35 },
  },
  {
    id: 'clear_water', name: '清水', type: ItemType.ELIXIR, quality: '凡品',
    desc: '普通清水，可解渴。', price: 1, stackable: true, maxStack: 99, icon: '水',
    effect: { type: 'restore_mana', value: 10 },
  },
  // 良品
  {
    id: 'health_pill_low', name: '回血丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '低阶疗伤丹药，可恢复气血。', price: 15, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'heal', value: 60 },
  },
  {
    id: 'mana_pill_low', name: '回灵丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '低阶回灵丹药，可恢复法力。', price: 15, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'restore_mana', value: 40 },
  },
  {
    id: 'stamina_pill', name: '健体丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '可恢复体力，缓解疲劳。', price: 12, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'restore_stamina', value: 50 },
  },
  // 珍品
  {
    id: 'health_pill_mid', name: '大还丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '中阶疗伤圣药，生死人肉白骨。', price: 80, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'heal', value: 150 },
  },
  {
    id: 'mana_pill_mid', name: '聚灵丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可快速恢复大量法力。', price: 75, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'restore_mana', value: 100 },
  },
  {
    id: 'detox_pill', name: '解毒丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可解百毒，百试百灵。', price: 60, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cure_poison' },
  },
  // 极品
  {
    id: 'health_pill_high', name: '九转还魂丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '太上老君炼制，可起死回生。', price: 500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'heal', value: 500 },
  },
  {
    id: 'mana_pill_high', name: '九转金丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可瞬间恢复全部法力。', price: 450, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'restore_mana', value: 300 },
  },
  {
    id: 'full_restore_pill', name: '十全大补丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '气血法力同时恢复，全面补充。', price: 600, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'full_restore', value: 200 },
  },
  // 仙品
  {
    id: 'immortal_health_pill', name: '不死药', type: ItemType.ELIXIR, quality: '仙品',
    desc: '传说中的仙丹，可让人长生不死。', price: 5000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'heal', value: 9999 },
  },

  // ==================== 修炼类丹药 ====================
  // 凡品
  {
    id: 'spirit_rice', name: '灵米饭', type: ItemType.ELIXIR, quality: '凡品',
    desc: '以灵米煮成的饭，略有灵气。', price: 3, stackable: true, maxStack: 99, icon: '饭',
    effect: { type: 'cultivation', value: 5 },
  },
  {
    id: 'spirit_tea', name: '灵茶', type: ItemType.ELIXIR, quality: '凡品',
    desc: '灵茶树的嫩叶泡制，可提神醒脑。', price: 5, stackable: true, maxStack: 99, icon: '茶',
    effect: { type: 'cultivation', value: 8 },
  },
  // 良品
  {
    id: 'cultivation_pill_low', name: '聚气丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '低阶修炼丹药，可加速灵气聚集。', price: 20, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 20 },
  },
  {
    id: 'foundation_pill', name: '筑基丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '筑基期修士修炼必备，可稳固根基。', price: 30, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 30 },
  },
  // 珍品
  {
    id: 'cultivation_pill_mid', name: '凝气丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '中阶修炼丹药，可大幅提升修炼速度。', price: 100, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 60 },
  },
  {
    id: 'golden_core_pill', name: '结金丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可帮助修士凝结金丹，突破瓶颈。', price: 150, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 80 },
  },
  {
    id: 'nascent_soul_pill', name: '元婴丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可帮助修士孕育元婴，破丹成婴。', price: 180, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 100 },
  },
  // 极品
  {
    id: 'cultivation_pill_high', name: '造化丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '高阶修炼圣药，可让修士一日千里。', price: 400, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 200 },
  },
  {
    id: 'spirit_ascension_pill', name: '化神丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可帮助元婴修士化神，一步登天。', price: 500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 300 },
  },
  {
    id: 'void_breaking_pill', name: '破虚丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可帮助化神修士破碎虚空，突破界壁。', price: 550, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 400 },
  },
  // 仙品
  {
    id: 'immortal_cultivation_pill', name: '仙灵丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '仙界流传下来的修炼丹药，效果惊人。', price: 3000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 1000 },
  },
  {
    id: 'dao_comprehension_pill', name: '悟道丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '可让修士进入悟道状态，感悟天道。', price: 3500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'comprehension', value: 500 },
  },

  // ==================== 增益类丹药（临时buff） ====================
  // 良品
  {
    id: 'strength_pill', name: '大力丸', type: ItemType.ELIXIR, quality: '良品',
    desc: '可暂时提升力量，力大无穷。', price: 18, stackable: true, maxStack: 99, icon: '丸',
    effect: { type: 'buff_strength', value: 10, duration: 300 },
  },
  {
    id: 'agility_pill', name: '轻身丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '可暂时提升速度，身轻如燕。', price: 18, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_speed', value: 10, duration: 300 },
  },
  {
    id: 'iron_skin_pill', name: '铁骨丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '可暂时提升防御，刀枪不入。', price: 20, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_defense', value: 10, duration: 300 },
  },
  // 珍品
  {
    id: 'frenzy_pill', name: '狂暴丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可激发潜能，攻击力暴增，但有副作用。', price: 80, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_attack', value: 30, duration: 180 },
  },
  {
    id: 'ghost_step_pill', name: '鬼步丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可让身法如鬼魅，速度暴增。', price: 85, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_speed', value: 25, duration: 180 },
  },
  {
    id: 'diamond_body_pill', name: '金刚丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可让身体坚如金刚，防御力大增。', price: 90, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_defense', value: 25, duration: 180 },
  },
  {
    id: 'wise_mind_pill', name: '明心丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可让神识清明，修炼效率提升。', price: 100, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_cultivation', value: 20, duration: 600 },
  },
  // 极品
  {
    id: 'god_strength_pill', name: '神力丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可暂时获得神力，力能拔山。', price: 350, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_attack', value: 50, duration: 300 },
  },
  {
    id: 'wind_god_pill', name: '风神丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可暂时获得风之神速，快若闪电。', price: 350, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_speed', value: 50, duration: 300 },
  },
  {
    id: 'turtle_god_pill', name: '玄武丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可暂时获得玄武之盾，万法不侵。', price: 400, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_defense', value: 50, duration: 300 },
  },

  // ==================== 突破类丹药 ====================
  // 珍品
  {
    id: 'barrier_break_pill_low', name: '破障丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可帮助低阶修士突破小境界瓶颈。', price: 120, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 10 },
  },
  {
    id: 'realm_break_pill_low', name: '破境丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可帮助修士突破大境界瓶颈。', price: 200, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 20 },
  },
  // 极品
  {
    id: 'barrier_break_pill_high', name: '天劫丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可帮助高阶修士抵御天劫，突破瓶颈。', price: 600, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 30 },
  },
  {
    id: 'immortal_break_pill', name: '飞升丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可帮助大乘修士飞升仙界。', price: 800, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 50 },
  },
  // 仙品
  {
    id: 'dao_break_pill', name: '悟道丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '可让修士顿悟大道，突破瓶颈如喝水。', price: 3000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 100 },
  },

  // ==================== 疗伤解毒类 ====================
  {
    id: 'antidote', name: '百草丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '可解常见毒素。', price: 15, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cure_poison' },
  },
  {
    id: 'bone_mending_pill', name: '接骨丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '可让断骨重生，恢复如初。', price: 18, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'heal', value: 40 },
  },
  {
    id: 'soul_healing_pill', name: '养魂丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可修复受损神魂，滋养元神。', price: 110, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'heal_soul', value: 50 },
  },
  {
    id: 'meridian_pill', name: '通脉丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可打通堵塞的经脉，恢复功力。', price: 100, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'restore_meridian' },
  },
  {
    id: 'rebirth_pill', name: '涅槃丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可让修士涅槃重生，洗筋伐髓。', price: 500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'rebirth' },
  },

  // ==================== 特殊效果丹药 ====================
  {
    id: 'invisibility_pill', name: '隐身丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '服用后可暂时隐身，持续一段时间。', price: 120, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'invisibility', duration: 60 },
  },
  {
    id: 'breath_holding_pill', name: '闭息丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '服用后可长时间不呼吸，适合水下探险。', price: 20, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'water_breathing', duration: 300 },
  },
  {
    id: 'transformation_pill', name: '化形丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '妖兽服用后可化为人形，人类服用可变身为妖兽。', price: 700, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'transformation', duration: 3600 },
  },
  {
    id: 'youth_pill', name: '驻颜丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可让容颜永驻，青春不老。', price: 150, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'youth', value: 10 },
  },
  {
    id: 'reincarnation_pill', name: '轮回丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '可让修士转世重修，保留前世记忆。', price: 4000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'reincarnation' },
  },
  {
    id: 'fate_pill', name: '改命丹', type: ItemType.ELIXIR, quality: '神品',
    desc: '可改变修士的命运轨迹，逆天改命。', price: 15000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'change_fate' },
  },

  // ==================== 毒丹 ====================
  {
    id: 'poison_pill_low', name: '断肠散', type: ItemType.ELIXIR, quality: '良品',
    desc: '剧毒之物，可让敌人肠穿肚烂。', price: 25, stackable: true, maxStack: 99, icon: '毒',
    effect: { type: 'poison', value: 30, duration: 60 },
  },
  {
    id: 'poison_pill_mid', name: '七步倒', type: ItemType.ELIXIR, quality: '珍品',
    desc: '无色无味的剧毒，七步之内必倒。', price: 100, stackable: true, maxStack: 99, icon: '毒',
    effect: { type: 'poison', value: 80, duration: 120 },
  },
  {
    id: 'soul_scatter_pill', name: '噬魂散', type: ItemType.ELIXIR, quality: '极品',
    desc: '可腐蚀神魂，让修士魂飞魄散。', price: 400, stackable: true, maxStack: 99, icon: '毒',
    effect: { type: 'soul_damage', value: 100, duration: 30 },
  },
  {
    id: 'love_potion', name: '合欢散', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可让人意乱情迷，失去理智。', price: 80, stackable: true, maxStack: 99, icon: '散',
    effect: { type: 'charm', duration: 300 },
  },

  // ==================== 萧炎专属系列（斗破梗） ====================
  {
    id: 'gathering_spirit_pill', name: '聚气散', type: ItemType.ELIXIR, quality: '良品',
    desc: '萧炎炼制的第一种丹药，可帮助斗者凝聚斗气。', price: 25, stackable: true, maxStack: 99, icon: '散',
    effect: { type: 'cultivation', value: 15 },
  },
  {
    id: 'foundation_establishment_pill', name: '筑基灵液', type: ItemType.ELIXIR, quality: '良品',
    desc: '萧炎早期炼制的药液，可固本培元。', price: 30, stackable: true, maxStack: 99, icon: '液',
    effect: { type: 'cultivation', value: 25 },
  },
  {
    id: 'three_mysteries_pill', name: '三纹青灵丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '萧炎炼制的极品丹药，有三道丹纹，可助斗师突破大斗师。', price: 500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 25 },
  },
  {
    id: 'heaven_breaking_pill', name: '破宗丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可帮助斗皇巅峰突破至斗宗。', price: 600, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 35 },
  },
  {
    id: 'emperor_breaking_pill', name: '菩提丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '可帮助半圣突破至斗圣，萧炎后期炼制。', price: 3000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 80 },
  },

  // ==================== 韩立专属系列（凡人修仙传梗） ====================
  {
    id: 'yellow_dragon_pill', name: '黄龙丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '韩立早期常用的修炼丹药，可增进修为。', price: 20, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 18 },
  },
  {
    id: 'golden_flash_pill', name: '金髓丸', type: ItemType.ELIXIR, quality: '良品',
    desc: '可洗髓伐骨，改善体质。', price: 22, stackable: true, maxStack: 99, icon: '丸',
    effect: { type: 'cultivation', value: 15 },
  },
  {
    id: 'solidifying_base_pill', name: '定颜丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '韩立送给师姐的丹药，可让容颜不老。', price: 130, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'youth', value: 20 },
  },
  {
    id: 'core_forming_pill', name: '结丹期丹药', type: ItemType.ELIXIR, quality: '珍品',
    desc: '韩立用血色禁地的灵草炼制，可助筑基修士结丹。', price: 160, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 15 },
  },
  {
    id: 'nascent_soul_formation_pill', name: '元婴丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '韩立用虚天鼎中的灵药炼制，可助结丹修士凝婴。', price: 550, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 30 },
  },

  // ==================== 完美世界专属丹药 ====================
  {
    id: 'immortal_pill_perfect', name: '仙元丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '完美世界中的顶级丹药，可助修士突破至仙王境界。', price: 4000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 90 },
  },
  {
    id: 'desolate_pill', name: '荒道丹', type: ItemType.ELIXIR, quality: '神品',
    desc: '蕴含荒道法则的神丹，可感悟荒道。', price: 8000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 200 },
  },
  {
    id: 'body_tempering_elixir', name: '锻体丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可强化肉身，提升体质。', price: 500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_strength', value: 25 },
  },
  {
    id: 'soul_nourishing_pill', name: '养魂丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可滋养神魂，提升神识。', price: 150, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'comprehension', value: 15 },
  },

  // ==================== 斗破苍穹专属丹药 ====================
  {
    id: 'phoenix_essence_pill', name: '火菩丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '萧炎炼制的顶级丹药，可提升火属性斗气。', price: 3500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_attack', value: 40 },
  },
  {
    id: 'dragon_blood_elixir', name: '龙血丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可提升血脉，获得龙威。', price: 450, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_all', value: 15 },
  },
  {
    id: 'medusa_heart_pill', name: '美杜莎心丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '美杜莎女王的内丹所炼，可提升斗气化翼。', price: 3800, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_speed', value: 30 },
  },
  {
    id: 'breakthrough_pill', name: '破境丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可帮助斗尊突破至斗圣。', price: 600, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 60 },
  },

  // ==================== 遮天专属丹药 ====================
  {
    id: 'emperor_pill', name: '帝丹', type: ItemType.ELIXIR, quality: '神品',
    desc: '遮天中的神丹，可助修士突破至大帝境界。', price: 10000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 100 },
  },
  {
    id: 'desolate_emperor_pill', name: '荒帝丹', type: ItemType.ELIXIR, quality: '神品',
    desc: '荒天帝的本命丹药，蕴含荒道法则。', price: 9000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 250 },
  },
  {
    id: 'nine_turn_pill', name: '九转仙丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '九转而成的仙丹，可提升修为。', price: 4000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 120 },
  },
  {
    id: 'star_pill', name: '星辰丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '蕴含星辰之力的丹药，可提升神魂。', price: 550, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'comprehension', value: 20 },
  },

  // ==================== 仙逆专属丹药 ====================
  {
    id: 'reverse_heaven_pill', name: '逆天道丹', type: ItemType.ELIXIR, quality: '神品',
    desc: '王林炼制的神丹，可逆转天道。', price: 8000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'change_fate', value: 50 },
  },
  {
    id: 'killing_pill', name: '杀戮丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '蕴含杀戮本源的丹药，可提升战力。', price: 3500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_attack', value: 45 },
  },
  {
    id: 'ghost_pill', name: '厉魂丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可吞噬厉鬼，提升神魂。', price: 450, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'comprehension', value: 18 },
  },
  {
    id: 'ancient_god_pill', name: '古神丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '可提升肉身强度，达到古神级别。', price: 3200, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_strength', value: 40 },
  },

  // ==================== 更多恢复类丹药 ====================
  {
    id: 'minor_heal_pill', name: '小还丹', type: ItemType.ELIXIR, quality: '凡品',
    desc: '常见的恢复丹药，可少量恢复气血。', price: 5, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'heal', value: 30 },
  },
  {
    id: 'major_heal_pill', name: '大还丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '强效的恢复丹药，可大量恢复气血。', price: 80, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'heal', value: 120 },
  },
  {
    id: 'soul_heal_pill', name: '回魂丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可恢复神魂的丹药，对神魂伤势有奇效。', price: 350, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'heal_soul', value: 50 },
  },
  {
    id: 'meridian_restore_pill', name: '通脉丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可修复受损经脉的丹药。', price: 400, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'restore_meridian', value: 1 },
  },

  // ==================== 更多修炼类丹药 ====================
  {
    id: 'spirit_gather_pill', name: '聚灵丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '可聚集周围灵气，加速修炼。', price: 12, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 20 },
  },
  {
    id: 'spirit_condense_pill', name: '凝灵丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可凝练体内灵气，提升修为。', price: 90, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 35 },
  },
  {
    id: 'spirit_pure_pill', name: '洗灵丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可洗练体内杂质，提升修炼资质。', price: 450, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cultivation', value: 60 },
  },
  {
    id: 'nascent_soul_pill_2', name: '化婴丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '可助金丹修士化婴，突破至元婴期。', price: 3500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 55 },
  },
  {
    id: 'deity_transform_pill', name: '化神丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '可助元婴修士化神，突破至化神期。', price: 4000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 65 },
  },
  {
    id: 'void_refining_pill', name: '炼虚丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '可助化神修士炼虚，突破至炼虚期。', price: 4500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'breakthrough', value: 70 },
  },

  // ==================== 更多增益类丹药 ====================
  {
    id: 'power_pill', name: '神力丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可暂时提升力量，增强攻击力。', price: 60, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_strength', value: 15, duration: 300 },
  },
  {
    id: 'agility_pill', name: '轻身丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可暂时提升速度，身轻如燕。', price: 55, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_speed', value: 15, duration: 300 },
  },
  {
    id: 'iron_skin_pill', name: '铁骨丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可暂时提升防御，刀枪不入。', price: 65, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_defense', value: 20, duration: 300 },
  },
  {
    id: 'wisdom_pill', name: '慧心丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可暂时提升悟性，领悟功法事半功倍。', price: 300, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'comprehension', value: 25, duration: 300 },
  },
  {
    id: 'comprehensive_pill', name: '十全大补丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '可全面提升各项属性，是难得的神丹。', price: 2500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'buff_all', value: 25, duration: 600 },
  },

  // ==================== 特殊效果丹药 ====================
  {
    id: 'rebirth_pill', name: '重生丹', type: ItemType.ELIXIR, quality: '神品',
    desc: '可让人死后重生，保留修为。', price: 8000, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'rebirth', value: 1 },
  },
  {
    id: 'youth_restore_pill', name: '回春丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '可恢复青春，延年益寿。', price: 3500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'youth', value: 30 },
  },
  {
    id: 'transformation_pill', name: '化形丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可让妖兽化为人形，也可让人变化外形。', price: 500, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'transformation', value: 1, duration: 3600 },
  },
  {
    id: 'invisibility_pill', name: '隐身丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '可让人隐身，避过敌人耳目。', price: 450, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'invisibility', value: 1, duration: 300 },
  },
  {
    id: 'detox_pill', name: '百草丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可解百毒，是行走江湖必备丹药。', price: 40, stackable: true, maxStack: 99, icon: '丹',
    effect: { type: 'cure_poison', value: 1 },
  },
];
