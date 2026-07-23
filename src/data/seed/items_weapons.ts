import { IItem, ItemType, EquipmentSlot } from '../../domain/entities/Item';

/**
 * 小说风格武器数据
 * 参考：《遮天》《完美世界》《凡人修仙传》《仙逆》《斗破苍穹》《诛仙》《一念永恒》等
 */

export const WEAPON_ITEMS: IItem[] = [
  // ==================== 剑类 ====================
  // 凡品
  {
    id: 'wood_sword', name: '桃木剑', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通桃木削制的长剑，道士常用。', price: 8, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 3 },
  },
  {
    id: 'bamboo_sword', name: '青竹剑', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '百年青竹削制，轻灵飘逸。', price: 12, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 4, speed: 1 },
  },
  {
    id: 'copper_sword', name: '青铜剑', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '青铜铸造的古剑，虽旧犹利。', price: 15, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 6 },
  },
  // 良品
  {
    id: 'fine_iron_sword', name: '精铁剑', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '百炼精铁锻造，锋芒毕露。', price: 35, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 10, speed: 2 },
  },
  {
    id: 'cold_iron_sword', name: '寒铁剑', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '万年寒铁所铸，剑身冰冷刺骨。', price: 45, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 12, crit: 2 },
  },
  {
    id: 'crimson_sword', name: '赤焰剑', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '火属性矿石锻造，剑身泛红。', price: 50, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 11, hp: 10 },
  },
  // 珍品
  {
    id: 'azure_sword', name: '青霜剑', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '剑身如霜，出鞘即寒气逼人。', price: 180, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 22, speed: 5 }, runeSlots: 1,
  },
  {
    id: 'thunder_sword', name: '惊雷剑', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '引天雷淬炼而成，剑动雷鸣。', price: 200, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 25, crit: 5 }, runeSlots: 1,
  },
  {
    id: 'seven_star_sword', name: '七星剑', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '剑身镶嵌七颗星石，暗合北斗七星之势。', price: 220, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 20, mana: 30 }, runeSlots: 2,
  },
  {
    id: 'green_bamboo_sword', name: '绿玉剑', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '以万年绿玉竹炼制，剑气如翠竹般生生不息。', price: 190, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 18, speed: 8, mana: 15 }, runeSlots: 1,
  },
  // 极品
  {
    id: 'dragon_slaying_sword', name: '斩龙剑', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '曾斩蛟龙的神剑，剑身有龙血浸染的痕迹。', price: 600, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 45, crit: 8, hp: 20 }, runeSlots: 2,
  },
  {
    id: 'frost_soul_sword', name: '玄冰剑', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '万年玄冰精华凝练，触之即寒入骨髓。', price: 650, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 40, defense: 15, speed: 3 }, runeSlots: 2,
  },
  {
    id: 'purple_light_sword', name: '紫电剑', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '剑出如紫电横空，快若惊鸿。', price: 700, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 48, speed: 12, crit: 5 }, runeSlots: 2,
  },
  {
    id: 'heaven_piercing_sword', name: '破天剑', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '上古剑修遗留，一剑可破天穹。', price: 800, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 55, speed: 5, mana: 20 }, runeSlots: 3,
  },
  // 仙品
  {
    id: 'immortal_sword_zhuxian', name: '诛仙剑', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '通天教主的佩剑，诛仙利，戮仙亡，陷仙到处起红光。', price: 8000, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 180, crit: 15, speed: 10 }, runeSlots: 4,
  },
  {
    id: 'immortal_sword_qingping', name: '青萍剑', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '通天教主证道之宝，混沌青莲所化。', price: 7500, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 170, mana: 100, speed: 8 }, runeSlots: 4,
  },
  {
    id: 'xuanyuan_sword', name: '轩辕剑', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '圣道之剑，剑身一面刻日月星辰，一面刻山川草木。', price: 8500, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 200, defense: 30, hp: 50 }, runeSlots: 4,
  },
  {
    id: 'zhu_xian_sword_array', name: '诛仙剑阵图', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '非剑胜剑，可布下诛仙剑阵，灭绝一切。', price: 10000, stackable: false, maxStack: 1, icon: '阵',
    slot: EquipmentSlot.WEAPON, stats: { attack: 150, defense: 80, mana: 120 }, runeSlots: 5,
  },
  // 神品
  {
    id: 'god_sword_pangu', name: '盘古幡', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '元始天尊证道之宝，可撕裂混沌，开辟天地。', price: 20000, stackable: false, maxStack: 1, icon: '幡',
    slot: EquipmentSlot.WEAPON, stats: { attack: 300, defense: 50, hp: 100 }, runeSlots: 5,
  },
  {
    id: 'god_sword_taie', name: '太阿剑', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '威道之剑，剑气自发，诸侯服其威。', price: 15000, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 250, crit: 20, speed: 15 }, runeSlots: 5,
  },

  // ==================== 刀类 ====================
  {
    id: 'hunting_knife', name: '猎刀', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '猎人常用的短刀，锋利耐用。', price: 8, stackable: false, maxStack: 1, icon: '刀',
    slot: EquipmentSlot.WEAPON, stats: { attack: 4 },
  },
  {
    id: 'butcher_cleaver', name: '斩骨刀', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '屠夫常用的砍骨刀，沉重有力。', price: 10, stackable: false, maxStack: 1, icon: '刀',
    slot: EquipmentSlot.WEAPON, stats: { attack: 5, speed: -1 },
  },
  {
    id: 'serpent_fang_blade', name: '蛇牙刀', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '以千年蛇牙为刃，淬有剧毒。', price: 40, stackable: false, maxStack: 1, icon: '刀',
    slot: EquipmentSlot.WEAPON, stats: { attack: 13, crit: 3 },
  },
  {
    id: 'blood_moon_blade', name: '血月刀', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '刀身泛红如血月，饮血越多越锋利。', price: 200, stackable: false, maxStack: 1, icon: '刀',
    slot: EquipmentSlot.WEAPON, stats: { attack: 28, crit: 8, hp: -10 }, runeSlots: 1,
  },
  {
    id: 'dragon_slayer_blade', name: '屠龙刀', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '武林至尊，宝刀屠龙，号令天下，莫敢不从。', price: 800, stackable: false, maxStack: 1, icon: '刀',
    slot: EquipmentSlot.WEAPON, stats: { attack: 60, defense: 10 }, runeSlots: 3,
  },
  {
    id: 'heaven_cleaver', name: '开天刀', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '一刀开天，斩断山河，劈裂虚空。', price: 7000, stackable: false, maxStack: 1, icon: '刀',
    slot: EquipmentSlot.WEAPON, stats: { attack: 190, defense: 20, crit: 10 }, runeSlots: 4,
  },

  // ==================== 枪/戟/矛类 ====================
  {
    id: 'wooden_spear', name: '白蜡杆', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '白蜡木制成的长枪，韧性极佳。', price: 10, stackable: false, maxStack: 1, icon: '枪',
    slot: EquipmentSlot.WEAPON, stats: { attack: 5, speed: 1 },
  },
  {
    id: 'iron_spear', name: '铁头枪', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '精铁枪头，寒光闪烁。', price: 38, stackable: false, maxStack: 1, icon: '枪',
    slot: EquipmentSlot.WEAPON, stats: { attack: 12, speed: 2 },
  },
  {
    id: 'dragon_spear', name: '龙胆枪', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '枪身如龙，刺出如龙出海。', price: 210, stackable: false, maxStack: 1, icon: '枪',
    slot: EquipmentSlot.WEAPON, stats: { attack: 26, speed: 6, crit: 4 }, runeSlots: 1,
  },
  {
    id: 'fangtian_halberd', name: '方天画戟', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '人中吕布，马中赤兔，方天画戟天下无双。', price: 900, stackable: false, maxStack: 1, icon: '戟',
    slot: EquipmentSlot.WEAPON, stats: { attack: 58, speed: 3, crit: 7 }, runeSlots: 3,
  },
  {
    id: 'sky_piercing_spear', name: '弑神枪', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '魔祖罗睺之宝，杀伐之气直冲云霄。', price: 7500, stackable: false, maxStack: 1, icon: '枪',
    slot: EquipmentSlot.WEAPON, stats: { attack: 185, crit: 18, speed: 5 }, runeSlots: 4,
  },
  {
    id: 'red_tassel_spear', name: '红缨枪', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '哪吒火尖枪，能喷三昧真火。', price: 16000, stackable: false, maxStack: 1, icon: '枪',
    slot: EquipmentSlot.WEAPON, stats: { attack: 260, speed: 20, crit: 12 }, runeSlots: 5,
  },

  // ==================== 棍/棒/锤类 ====================
  {
    id: 'bamboo_staff', name: '青竹棍', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '韧性十足的青竹，可作防身之用。', price: 6, stackable: false, maxStack: 1, icon: '棍',
    slot: EquipmentSlot.WEAPON, stats: { attack: 3, speed: 1 },
  },
  {
    id: 'iron_staff', name: '镔铁棍', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '重达百斤的镔铁棍，力大势沉。', price: 35, stackable: false, maxStack: 1, icon: '棍',
    slot: EquipmentSlot.WEAPON, stats: { attack: 14, speed: -2 },
  },
  {
    id: 'zen_staff', name: '禅杖', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '佛门法器，可驱邪镇魔。', price: 180, stackable: false, maxStack: 1, icon: '杖',
    slot: EquipmentSlot.WEAPON, stats: { attack: 22, defense: 10, hp: 20 }, runeSlots: 1,
  },
  {
    id: 'sky_smashing_hammer', name: '碎星锤', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '一锤之下，山崩地裂，星辰破碎。', price: 850, stackable: false, maxStack: 1, icon: '锤',
    slot: EquipmentSlot.WEAPON, stats: { attack: 65, speed: -5, crit: 10 }, runeSlots: 2,
  },
  {
    id: 'golden_cudgel', name: '如意金箍棒', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '斗战圣佛孙悟空的本命兵器，原是东海定海神针铁，重一万三千五百斤，能随心变化大小，在轮回纪元中镇压过诸天强者。', price: 9000, stackable: false, maxStack: 1, icon: '棒',
    slot: EquipmentSlot.WEAPON, stats: { attack: 220, speed: -3, hp: 80 }, runeSlots: 4,
  },

  // ==================== 鞭/索类 ====================
  {
    id: 'leather_whip', name: '皮鞭', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '牛皮编织的长鞭，柔韧有力。', price: 9, stackable: false, maxStack: 1, icon: '鞭',
    slot: EquipmentSlot.WEAPON, stats: { attack: 3, speed: 2 },
  },
  {
    id: 'chain_whip', name: '九节鞭', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '精铁打造的九节鞭，刚柔并济。', price: 42, stackable: false, maxStack: 1, icon: '鞭',
    slot: EquipmentSlot.WEAPON, stats: { attack: 11, speed: 4 },
  },
  {
    id: 'dragon_tendon_whip', name: '龙筋鞭', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '以蛟龙筋为材料，抽打时龙吟阵阵。', price: 190, stackable: false, maxStack: 1, icon: '鞭',
    slot: EquipmentSlot.WEAPON, stats: { attack: 20, speed: 10, crit: 5 }, runeSlots: 1,
  },
  {
    id: 'sky_binding_whip', name: '缚仙索', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '捆仙绳一类法宝，可缚仙锁神。', price: 6000, stackable: false, maxStack: 1, icon: '索',
    slot: EquipmentSlot.WEAPON, stats: { attack: 80, speed: 15, mana: 50 }, runeSlots: 3,
  },

  // ==================== 扇/琴/笛类（法器） ====================
  {
    id: 'paper_fan', name: '折扇', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '书生常用的折扇，可作防身。', price: 12, stackable: false, maxStack: 1, icon: '扇',
    slot: EquipmentSlot.WEAPON, stats: { attack: 2, speed: 1 },
  },
  {
    id: 'iron_fan', name: '铁扇', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '精铁扇骨，扇面暗藏利刃。', price: 40, stackable: false, maxStack: 1, icon: '扇',
    slot: EquipmentSlot.WEAPON, stats: { attack: 10, speed: 3 },
  },
  {
    id: 'five_flame_fan', name: '五火七禽扇', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '清虚道德真君之宝，一扇生五火，可焚尽万物。', price: 8000, stackable: false, maxStack: 1, icon: '扇',
    slot: EquipmentSlot.WEAPON, stats: { attack: 160, mana: 80, speed: 5 }, runeSlots: 4,
  },
  {
    id: 'banana_fan', name: '芭蕉扇', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '铁扇公主之宝，一扇熄火，二扇生风，三扇下雨。', price: 7000, stackable: false, maxStack: 1, icon: '扇',
    slot: EquipmentSlot.WEAPON, stats: { attack: 100, speed: 25, mana: 60 }, runeSlots: 3,
  },
  {
    id: 'jade_flute', name: '碧玉箫', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '以千年碧玉制成，箫声可惑人心神。', price: 200, stackable: false, maxStack: 1, icon: '箫',
    slot: EquipmentSlot.WEAPON, stats: { attack: 15, mana: 30, speed: 5 }, runeSlots: 1,
  },
  {
    id: 'heavenly_lyre', name: '天魔琴', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '琴音可乱人心智，杀人于无形。', price: 900, stackable: false, maxStack: 1, icon: '琴',
    slot: EquipmentSlot.WEAPON, stats: { attack: 30, mana: 60, speed: 3 }, runeSlots: 3,
  },
  {
    id: 'fuxi_lyre', name: '伏羲琴', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '伏羲所制，琴音可净化万物，亦可毁灭苍生。', price: 8500, stackable: false, maxStack: 1, icon: '琴',
    slot: EquipmentSlot.WEAPON, stats: { attack: 120, mana: 150, hp: 50 }, runeSlots: 5,
  },

  // ==================== 弓/弩类 ====================
  {
    id: 'hunting_bow', name: '猎弓', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '猎人常用的复合弓，射程有限。', price: 10, stackable: false, maxStack: 1, icon: '弓',
    slot: EquipmentSlot.WEAPON, stats: { attack: 4, speed: 1 },
  },
  {
    id: 'horn_bow', name: '牛角弓', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '以牛角为材，力道强劲。', price: 38, stackable: false, maxStack: 1, icon: '弓',
    slot: EquipmentSlot.WEAPON, stats: { attack: 11, crit: 3 },
  },
  {
    id: 'spirit_eagle_bow', name: '灵鹰弓', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '以灵鹰翅骨为弓臂，箭出如鹰击长空。', price: 195, stackable: false, maxStack: 1, icon: '弓',
    slot: EquipmentSlot.WEAPON, stats: { attack: 24, speed: 8, crit: 6 }, runeSlots: 1,
  },
  {
    id: 'sun_shooting_bow', name: '射日弓', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '后羿射日之弓，一箭可落星辰。', price: 7200, stackable: false, maxStack: 1, icon: '弓',
    slot: EquipmentSlot.WEAPON, stats: { attack: 170, crit: 25, speed: 5 }, runeSlots: 4,
  },
  {
    id: 'crossbow', name: '诸葛连弩', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '一次可连发十箭，威力不俗。', price: 45, stackable: false, maxStack: 1, icon: '弩',
    slot: EquipmentSlot.WEAPON, stats: { attack: 9, speed: 5 },
  },

  // ==================== 奇门兵器 ====================
  {
    id: 'three_section_staff', name: '三节棍', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '三节相连，变化莫测。', price: 30, stackable: false, maxStack: 1, icon: '棍',
    slot: EquipmentSlot.WEAPON, stats: { attack: 10, speed: 3 },
  },
  {
    id: 'tiger_claw', name: '虎爪', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '形似虎爪，可近身搏杀。', price: 170, stackable: false, maxStack: 1, icon: '爪',
    slot: EquipmentSlot.WEAPON, stats: { attack: 20, speed: 7, crit: 6 }, runeSlots: 1,
  },
  {
    id: 'meteor_hammer', name: '流星锤', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '铁链系锤，舞动如流星赶月。', price: 160, stackable: false, maxStack: 1, icon: '锤',
    slot: EquipmentSlot.WEAPON, stats: { attack: 25, speed: -1, crit: 8 }, runeSlots: 1,
  },
  {
    id: 'shadow_dagger', name: '鱼肠剑', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '勇绝之剑，专诸刺王僚之利器。', price: 750, stackable: false, maxStack: 1, icon: '匕',
    slot: EquipmentSlot.WEAPON, stats: { attack: 50, speed: 15, crit: 15 }, runeSlots: 2,
  },
  {
    id: 'twin_blades', name: '干将莫邪', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '挚情之剑，双剑合璧，天下无敌。', price: 8000, stackable: false, maxStack: 1, icon: '双',
    slot: EquipmentSlot.WEAPON, stats: { attack: 140, speed: 18, crit: 12 }, runeSlots: 4,
  },
  {
    id: 'yueya_spear', name: '月牙铲', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '沙僧降妖宝杖，可降妖除魔。', price: 14000, stackable: false, maxStack: 1, icon: '铲',
    slot: EquipmentSlot.WEAPON, stats: { attack: 230, defense: 30, hp: 60 }, runeSlots: 5,
  },

  // ==================== 双持/拳套类 ====================
  {
    id: 'cloth_wrap', name: '布条', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '缠绕拳头的布条，保护双手。', price: 5, stackable: false, maxStack: 1, icon: '拳',
    slot: EquipmentSlot.WEAPON, stats: { attack: 2, speed: 2 },
  },
  {
    id: 'iron_knuckle', name: '铁指虎', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '套在手上的铁环，拳拳到肉。', price: 28, stackable: false, maxStack: 1, icon: '拳',
    slot: EquipmentSlot.WEAPON, stats: { attack: 9, speed: 3 },
  },
  {
    id: 'tiger_claw_glove', name: '虎爪拳套', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '虎爪形状的拳套，可撕裂护甲。', price: 175, stackable: false, maxStack: 1, icon: '拳',
    slot: EquipmentSlot.WEAPON, stats: { attack: 18, speed: 6, crit: 7 }, runeSlots: 1,
  },
  {
    id: 'dragon_fist', name: '龙拳', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '拳出如龙，龙吟震天。', price: 700, stackable: false, maxStack: 1, icon: '拳',
    slot: EquipmentSlot.WEAPON, stats: { attack: 45, speed: 8, crit: 10 }, runeSlots: 2,
  },

  // ==================== 完美世界专属武器 ====================
  {
    id: 'divine_stone', name: '打神石', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '完美世界十大凶兵之一，石族至宝，可打神杀仙。', price: 8000, stackable: false, maxStack: 1, icon: '石',
    slot: EquipmentSlot.WEAPON, stats: { attack: 160, defense: 40, hp: 50 }, runeSlots: 4,
  },
  {
    id: 'bronze_immortal_palace', name: '青铜仙殿', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '荒域无上至宝，内蕴小世界，可镇压一切。', price: 18000, stackable: false, maxStack: 1, icon: '殿',
    slot: EquipmentSlot.WEAPON, stats: { attack: 280, defense: 60, hp: 120 }, runeSlots: 5,
  },
  {
    id: 'heavenly_sword_world', name: '世界树', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '完美世界至强神树，可滋养万物，亦可斩灭一切。', price: 22000, stackable: false, maxStack: 1, icon: '树',
    slot: EquipmentSlot.WEAPON, stats: { attack: 240, defense: 80, hp: 150, mana: 100 }, runeSlots: 5,
  },

  // ==================== 斗破苍穹专属武器 ====================
  {
    id: 'black_heavy_ruler', name: '玄重尺', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '萧炎的武器，药老所赠，尺身漆黑，重十万八千斤。', price: 800, stackable: false, maxStack: 1, icon: '尺',
    slot: EquipmentSlot.WEAPON, stats: { attack: 55, speed: -5, crit: 12 }, runeSlots: 3,
  },
  {
    id: 'burning_flame', name: '陨落心炎', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '萧炎收服的异火，生有异灵，可焚天煮海。', price: 6000, stackable: false, maxStack: 1, icon: '炎',
    slot: EquipmentSlot.WEAPON, stats: { attack: 140, speed: 10, mana: 60 }, runeSlots: 4,
  },
  {
    id: 'bone_spirit_flame', name: '骨灵冷火', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '药老的异火，可冻结一切，威力惊人。', price: 5500, stackable: false, maxStack: 1, icon: '火',
    slot: EquipmentSlot.WEAPON, stats: { attack: 130, defense: 20, speed: 8 }, runeSlots: 4,
  },

  // ==================== 凡人修仙传专属武器 ====================
  {
    id: 'green_bamboo_sword', name: '青竹蜂云剑', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '韩立的本命飞剑，七十二柄成套，可布剑阵。', price: 750, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 50, speed: 15, mana: 30 }, runeSlots: 3,
  },
  {
    id: 'wind_thunder_wings', name: '风雷翅', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '韩立的飞行法宝，可御风而行，速度极快。', price: 200, stackable: false, maxStack: 1, icon: '翅',
    slot: EquipmentSlot.WEAPON, stats: { speed: 20, defense: 5, mana: 15 }, runeSlots: 1,
  },
  {
    id: 'profound_sword', name: '玄天斩灵剑', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '韩立后期的本命飞剑，蕴含玄天剑诀。', price: 6500, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 150, crit: 15, mana: 50 }, runeSlots: 4,
  },

  // ==================== 遮天专属武器 ====================
  {
    id: 'nine_dragon_coffin', name: '九龙拉棺', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '遮天开篇神器，九条真龙拉着一口青铜巨棺，穿越星空。', price: 20000, stackable: false, maxStack: 1, icon: '棺',
    slot: EquipmentSlot.WEAPON, stats: { attack: 250, defense: 100, hp: 100 }, runeSlots: 5,
  },
  {
    id: 'desolate_tower', name: '荒塔', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '东荒至宝，可镇压一切，内含世界。', price: 16000, stackable: false, maxStack: 1, icon: '塔',
    slot: EquipmentSlot.WEAPON, stats: { attack: 220, defense: 80, mana: 60 }, runeSlots: 5,
  },
  {
    id: 'dragon_pattern_gold', name: '龙纹黑金', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '叶凡的兵器材料，可铸造至强兵器。', price: 7000, stackable: false, maxStack: 1, icon: '金',
    slot: EquipmentSlot.WEAPON, stats: { attack: 170, defense: 30, hp: 40 }, runeSlots: 4,
  },

  // ==================== 仙逆专属武器 ====================
  {
    id: 'heavenly_reverse_pearl', name: '天逆珠', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '王林的本命法宝，内含九色空间，可容纳万物。', price: 7500, stackable: false, maxStack: 1, icon: '珠',
    slot: EquipmentSlot.WEAPON, stats: { attack: 120, mana: 120, defense: 30 }, runeSlots: 4,
  },
  {
    id: 'killing_origin', name: '杀戮本源', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '王林在古神之地获得的杀戮本源，可斩灭一切。', price: 15000, stackable: false, maxStack: 1, icon: '杀',
    slot: EquipmentSlot.WEAPON, stats: { attack: 280, crit: 25, speed: 10 }, runeSlots: 5,
  },
  {
    id: 'boundary_compass', name: '定界罗盘', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '王林的空间法宝，可定位任何位置。', price: 6000, stackable: false, maxStack: 1, icon: '盘',
    slot: EquipmentSlot.WEAPON, stats: { speed: 25, defense: 20, mana: 40 }, runeSlots: 3,
  },

  // ==================== 更多通用武器 ====================
  {
    id: 'iron_sword', name: '铁剑', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通的铁剑，新手修士常用的武器。', price: 10, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 8 }, runeSlots: 0,
  },
  {
    id: 'bronze_sword', name: '青铜剑', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '青铜铸造的剑，比铁剑稍好一些。', price: 15, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 10 }, runeSlots: 0,
  },
  {
    id: 'steel_blade', name: '钢刀', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '精钢打造的刀，锋利无比。', price: 30, stackable: false, maxStack: 1, icon: '刀',
    slot: EquipmentSlot.WEAPON, stats: { attack: 15, speed: 2 }, runeSlots: 0,
  },
  {
    id: 'fine_iron_sword', name: '精铁剑', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '精铁打造的剑，品质上乘。', price: 35, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 16, crit: 2 }, runeSlots: 0,
  },
  {
    id: 'spirit_sword', name: '灵剑', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '蕴含灵气的剑，可增幅法术威力。', price: 100, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 22, mana: 10 }, runeSlots: 1,
  },
  {
    id: 'demon_sword', name: '魔剑', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '魔道修士使用的剑，蕴含魔气。', price: 500, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 40, crit: 8, hp: -10 }, runeSlots: 2,
  },
  {
    id: 'immortal_sword', name: '仙剑', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '仙界流传的剑，蕴含仙灵之气。', price: 5000, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 130, speed: 10, mana: 40 }, runeSlots: 4,
  },
  {
    id: 'god_sword', name: '神剑', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '神界至宝，可斩神灭魔。', price: 15000, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 250, crit: 20, speed: 15 }, runeSlots: 5,
  },
  {
    id: 'ghost_sword', name: '鬼剑', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '厉鬼使用的剑，可伤神魂。', price: 550, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 38, mana: 20 }, runeSlots: 2,
  },
  {
    id: 'blood_sword', name: '血剑', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '以血祭炼的剑，可吸血恢复。', price: 4500, stackable: false, maxStack: 1, icon: '剑',
    slot: EquipmentSlot.WEAPON, stats: { attack: 120, hp: 50, crit: 12 }, runeSlots: 3,
  },
];
