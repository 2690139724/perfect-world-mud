import { IItem, ItemType, EquipmentSlot } from '../../domain/entities/Item';

/**
 * 小说风格防具与法宝数据
 * 参考：《遮天》《完美世界》《凡人修仙传》《仙逆》《斗破苍穹》《封神演义》等
 */

export const ARMOR_ARTIFACT_ITEMS: IItem[] = [
  // ==================== 护甲类 ====================
  // 凡品
  {
    id: 'linen_cloth', name: '麻布衣', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通麻布缝制，仅能蔽体。', price: 5, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 1 },
  },
  {
    id: 'padded_armor', name: '棉袄', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '棉花填充的厚衣，可御寒。', price: 8, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 2, hp: 5 },
  },
  {
    id: 'cloth_robe', name: '道袍', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通道士穿着的长袍。', price: 10, stackable: false, maxStack: 1, icon: '袍',
    slot: EquipmentSlot.ARMOR, stats: { defense: 2, mana: 5 },
  },
  // 良品
  {
    id: 'leather_vest', name: '皮甲', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '鞣制皮革制成的护甲，轻便实用。', price: 25, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 5, speed: 1 },
  },
  {
    id: 'bronze_armor', name: '青铜甲', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '青铜片串联而成的铠甲，古朴厚重。', price: 35, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 8, speed: -1 },
  },
  {
    id: 'silk_robe', name: '丝绸法袍', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '上等丝绸缝制，内绣聚灵阵纹。', price: 40, stackable: false, maxStack: 1, icon: '袍',
    slot: EquipmentSlot.ARMOR, stats: { defense: 4, mana: 15 },
  },
  // 珍品
  {
    id: 'chain_mail', name: '锁子甲', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '精铁环扣连缀，刀枪难入。', price: 150, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 15, hp: 10 }, runeSlots: 1,
  },
  {
    id: 'tiger_skin_armor', name: '虎皮甲', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '以妖虎皮毛制成，虎威凛凛。', price: 170, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 12, attack: 3, hp: 15 }, runeSlots: 1,
  },
  {
    id: 'spirit_silk_robe', name: '灵丝法袍', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '以灵蚕吐丝织就，可自动吸纳灵气。', price: 180, stackable: false, maxStack: 1, icon: '袍',
    slot: EquipmentSlot.ARMOR, stats: { defense: 8, mana: 30, speed: 2 }, runeSlots: 1,
  },
  // 极品
  {
    id: 'black_dragon_armor', name: '黑龙甲', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '以黑龙鳞为主材，防御力惊人。', price: 600, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 35, hp: 30, speed: 3 }, runeSlots: 2,
  },
  {
    id: 'phoenix_nirvana_robe', name: '涅槃羽衣', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '以凤凰尾羽织就，可浴火重生。', price: 700, stackable: false, maxStack: 1, icon: '袍',
    slot: EquipmentSlot.ARMOR, stats: { defense: 20, hp: 50, mana: 20 }, runeSlots: 2,
  },
  {
    id: 'turtle_shell_armor', name: '玄武甲', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '以玄龟背甲炼制，坚不可摧。', price: 650, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 45, hp: 20, speed: -3 }, runeSlots: 2,
  },
  // 仙品
  {
    id: 'lotus_throne_robe', name: '莲台宝衣', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '观音菩萨座下莲台所化，万法不侵。', price: 6000, stackable: false, maxStack: 1, icon: '袍',
    slot: EquipmentSlot.ARMOR, stats: { defense: 80, hp: 100, mana: 80 }, runeSlots: 4,
  },
  {
    id: 'eight_trigrams_robe', name: '八卦仙衣', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '太上老君所赐，八卦环绕，诸邪退避。', price: 5500, stackable: false, maxStack: 1, icon: '袍',
    slot: EquipmentSlot.ARMOR, stats: { defense: 70, mana: 100, speed: 5 }, runeSlots: 3,
  },
  {
    id: 'nine_dragons_armor', name: '九龙神火罩', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '太乙真人法宝，可罩人烧之。', price: 7000, stackable: false, maxStack: 1, icon: '罩',
    slot: EquipmentSlot.ARMOR, stats: { defense: 90, hp: 60, attack: 20 }, runeSlots: 4,
  },
  // 神品
  {
    id: 'pangu_body', name: '盘古真身', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '盘古开天后遗留的法则所化，肉身成圣。', price: 18000, stackable: false, maxStack: 1, icon: '身',
    slot: EquipmentSlot.ARMOR, stats: { defense: 150, hp: 200, attack: 30 }, runeSlots: 5,
  },

  // ==================== 头盔/头饰类 ====================
  {
    id: 'straw_hat', name: '斗笠', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通斗笠，遮阳挡雨。', price: 3, stackable: false, maxStack: 1, icon: '帽',
    slot: EquipmentSlot.ACCESSORY, stats: { defense: 1 },
  },
  {
    id: 'bronze_helmet', name: '青铜盔', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '青铜铸造的头盔，古朴厚重。', price: 20, stackable: false, maxStack: 1, icon: '盔',
    slot: EquipmentSlot.ACCESSORY, stats: { defense: 4, hp: 5 },
  },
  {
    id: 'night_luminous_pearl', name: '夜明珠', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '镶嵌于额头的明珠，夜间可照明，亦可辟邪。', price: 160, stackable: false, maxStack: 1, icon: '珠',
    slot: EquipmentSlot.ACCESSORY, stats: { defense: 5, mana: 20 },
  },
  {
    id: 'golden_crown', name: '紫金冠', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '孙悟空头戴之宝，可抵御神识攻击。', price: 500, stackable: false, maxStack: 1, icon: '冠',
    slot: EquipmentSlot.ACCESSORY, stats: { defense: 15, mana: 30, hp: 20 }, runeSlots: 1,
  },
  {
    id: 'three_flower_crown', name: '三花聚顶冠', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '大罗金仙所戴，三花聚顶，五气朝元。', price: 4500, stackable: false, maxStack: 1, icon: '冠',
    slot: EquipmentSlot.ACCESSORY, stats: { defense: 30, mana: 80, hp: 40 }, runeSlots: 3,
  },

  // ==================== 靴子类 ====================
  {
    id: 'straw_sandals', name: '草鞋', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通草鞋，轻便透气。', price: 2, stackable: false, maxStack: 1, icon: '靴',
    slot: EquipmentSlot.BOOTS, stats: { speed: 1 },
  },
  {
    id: 'cloth_shoes', name: '布鞋', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '棉麻布料缝制，舒适耐穿。', price: 5, stackable: false, maxStack: 1, icon: '靴',
    slot: EquipmentSlot.BOOTS, stats: { speed: 2 },
  },
  {
    id: 'leather_boots', name: '皮靴', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '鞣制皮革制成，适合长途跋涉。', price: 22, stackable: false, maxStack: 1, icon: '靴',
    slot: EquipmentSlot.BOOTS, stats: { speed: 4, defense: 2 },
  },
  {
    id: 'cloud_walking_boots', name: '踏云靴', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '穿上如踏云端，步履轻盈。', price: 160, stackable: false, maxStack: 1, icon: '靴',
    slot: EquipmentSlot.BOOTS, stats: { speed: 10, defense: 3 }, runeSlots: 1,
  },
  {
    id: 'wind_chasing_boots', name: '追风靴', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '追风逐电，日行万里。', price: 550, stackable: false, maxStack: 1, icon: '靴',
    slot: EquipmentSlot.BOOTS, stats: { speed: 18, defense: 5, crit: 3 }, runeSlots: 2,
  },
  {
    id: 'wind_fire_wheel', name: '风火轮', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '哪吒之宝，双轮生风喷火，飞行极速。', price: 5000, stackable: false, maxStack: 1, icon: '轮',
    slot: EquipmentSlot.BOOTS, stats: { speed: 35, attack: 20, defense: 10 }, runeSlots: 3,
  },

  // ==================== 饰品类 ====================
  // 项链
  {
    id: 'stone_pendant', name: '石坠', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通石头打磨的吊坠。', price: 5, stackable: false, maxStack: 1, icon: '坠',
    slot: EquipmentSlot.ACCESSORY, stats: { hp: 3 },
  },
  {
    id: 'jade_pendant', name: '玉佩', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '温润美玉雕琢，可宁心静气。', price: 30, stackable: false, maxStack: 1, icon: '佩',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 10, hp: 5 },
  },
  {
    id: 'dragon_tiger_pendant', name: '龙虎玉佩', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '一面刻龙一面刻虎，蕴含龙虎之气。', price: 150, stackable: false, maxStack: 1, icon: '佩',
    slot: EquipmentSlot.ACCESSORY, stats: { attack: 5, defense: 5, hp: 10 }, runeSlots: 1,
  },
  {
    id: 'five_elements_bracelet', name: '五行手镯', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '金木水火土五行精华凝聚，五行相生。', price: 500, stackable: false, maxStack: 1, icon: '镯',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 40, hp: 30, speed: 3 }, runeSlots: 2,
  },
  {
    id: 'kunlun_mirror', name: '昆仑镜', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '西王母之宝，可洞察万物，穿越时空。', price: 6000, stackable: false, maxStack: 1, icon: '镜',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 100, defense: 20, speed: 10 }, runeSlots: 4,
  },
  // 戒指
  {
    id: 'wood_ring', name: '木戒', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通木环，可作装饰。', price: 3, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 2 },
  },
  {
    id: 'copper_ring', name: '铜戒', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '刻有简易符文的铜戒指。', price: 25, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 8, hp: 5 },
  },
  {
    id: 'silver_ring', name: '银戒', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '刻有聚灵阵纹的银戒指。', price: 140, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 20, speed: 2 }, runeSlots: 1,
  },
  {
    id: 'gold_ring', name: '金戒', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '纯金打造，镶嵌宝石，富贵逼人。', price: 450, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { hp: 30, mana: 20, attack: 5 }, runeSlots: 1,
  },
  {
    id: 'storage_ring', name: '纳戒', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '内含独立空间，可储物。萧炎之标配。', price: 4000, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 60, defense: 10, speed: 3 }, runeSlots: 3,
  },
  // 腰带
  {
    id: 'cloth_belt', name: '布腰带', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通布带，束腰之用。', price: 3, stackable: false, maxStack: 1, icon: '带',
    slot: EquipmentSlot.ACCESSORY, stats: { defense: 1 },
  },
  {
    id: 'leather_belt', name: '皮腰带', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '坚韧皮革制成，可挂兵器。', price: 20, stackable: false, maxStack: 1, icon: '带',
    slot: EquipmentSlot.ACCESSORY, stats: { defense: 3, hp: 5 },
  },
  {
    id: 'dragon_belt', name: '盘龙带', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '盘龙纹金丝腰带，龙气护体。', price: 480, stackable: false, maxStack: 1, icon: '带',
    slot: EquipmentSlot.ACCESSORY, stats: { defense: 12, hp: 20, attack: 5 }, runeSlots: 1,
  },

  // ==================== 法宝类（ARTIFACT槽位） ====================
  {
    id: 'spirit_bag', name: '乾坤袋', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '内有乾坤，可纳万物。', price: 200, stackable: false, maxStack: 1, icon: '袋',
    slot: EquipmentSlot.ARTIFACT, stats: { hp: 10, mana: 15 }, runeSlots: 1,
  },
  {
    id: 'soul_banner', name: '招魂幡', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '可招引亡魂，炼制阴兵。', price: 190, stackable: false, maxStack: 1, icon: '幡',
    slot: EquipmentSlot.ARTIFACT, stats: { mana: 25, attack: 5 }, runeSlots: 1,
  },
  {
    id: 'fire_gourd', name: '火葫芦', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '内藏三昧真火，可喷火伤敌。', price: 600, stackable: false, maxStack: 1, icon: '葫',
    slot: EquipmentSlot.ARTIFACT, stats: { attack: 25, mana: 20 }, runeSlots: 2,
  },
  {
    id: 'spirit_umbrella', name: '混元伞', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '撑开可遮天蔽日，收拢可困敌于内。', price: 650, stackable: false, maxStack: 1, icon: '伞',
    slot: EquipmentSlot.ARTIFACT, stats: { defense: 20, hp: 20, mana: 15 }, runeSlots: 2,
  },
  {
    id: 'gourd_vine', name: '紫金红葫芦', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '太上老君装丹之葫芦，叫一声名字，若应了便吸入其中。', price: 5000, stackable: false, maxStack: 1, icon: '葫',
    slot: EquipmentSlot.ARTIFACT, stats: { attack: 50, mana: 60, hp: 30 }, runeSlots: 3,
  },
  {
    id: 'jade_vase', name: '羊脂玉净瓶', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '观音菩萨之宝，内装甘露水，可起死回生。', price: 5500, stackable: false, maxStack: 1, icon: '瓶',
    slot: EquipmentSlot.ARTIFACT, stats: { mana: 80, hp: 60, defense: 15 }, runeSlots: 3,
  },
  {
    id: 'demon_subduing_bowl', name: '金钵', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '法海之宝，可收妖镇魔。', price: 4800, stackable: false, maxStack: 1, icon: '钵',
    slot: EquipmentSlot.ARTIFACT, stats: { attack: 40, defense: 25, mana: 30 }, runeSlots: 3,
  },
  {
    id: 'heaven_earth_bag', name: '人种袋', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '弥勒佛后天袋，可装人装天。', price: 6000, stackable: false, maxStack: 1, icon: '袋',
    slot: EquipmentSlot.ARTIFACT, stats: { mana: 100, hp: 50, defense: 20 }, runeSlots: 4,
  },
  {
    id: 'nine_heaven_tower', name: '昊天塔', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '天界重宝，可降服一切妖魔邪道。', price: 15000, stackable: false, maxStack: 1, icon: '塔',
    slot: EquipmentSlot.ARTIFACT, stats: { defense: 60, hp: 100, mana: 80 }, runeSlots: 5,
  },
  {
    id: 'xuanyuan_mirror', name: '东皇钟', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '十大神器之首，可毁天灭地，吞噬诸天。', price: 20000, stackable: false, maxStack: 1, icon: '钟',
    slot: EquipmentSlot.ARTIFACT, stats: { attack: 80, defense: 80, hp: 80, mana: 80 }, runeSlots: 5,
  },

  // ==================== 完美世界专属防具法宝 ====================
  {
    id: 'golden_winged_peng_armor', name: '金翅大鹏甲', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '以金翅大鹏羽毛炼制的护甲，可御空飞行。', price: 6000, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 70, speed: 25, hp: 40 }, runeSlots: 4,
  },
  {
    id: 'nine_lives_cat_artifact', name: '九命猫', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '完美世界十大凶兵之一，可九条命，不死不灭。', price: 7000, stackable: false, maxStack: 1, icon: '猫',
    slot: EquipmentSlot.ARTIFACT, stats: { hp: 150, defense: 40, attack: 30 }, runeSlots: 4,
  },
  {
    id: 'heavenly_lightning_robe', name: '天蚕衣', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '以天蚕丝织就，刀枪不入，水火不侵。', price: 700, stackable: false, maxStack: 1, icon: '衣',
    slot: EquipmentSlot.ARMOR, stats: { defense: 40, speed: 5, mana: 20 }, runeSlots: 2,
  },

  // ==================== 斗破苍穹专属防具法宝 ====================
  {
    id: 'medusa_scales', name: '美杜莎鳞片', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '美杜莎女王的鳞片，可炼制顶级护甲。', price: 6500, stackable: false, maxStack: 1, icon: '鳞',
    slot: EquipmentSlot.ARMOR, stats: { defense: 80, attack: 25, speed: 5 }, runeSlots: 4,
  },
  {
    id: 'ancient_ice_shield', name: '古界冰盾', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '古界至宝，可冻结一切攻击。', price: 5500, stackable: false, maxStack: 1, icon: '盾',
    slot: EquipmentSlot.ARTIFACT, stats: { defense: 100, hp: 50, mana: 30 }, runeSlots: 3,
  },
  {
    id: 'high_level_fire_ring', name: '高阶纳戒', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '容量巨大的纳戒，可容纳一座城池。', price: 600, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 50, hp: 20, defense: 10 }, runeSlots: 2,
  },

  // ==================== 凡人修仙传专属防具法宝 ====================
  {
    id: 'black_iron_shield', name: '玄铁盾', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '韩立早期的防御法宝，可抵挡筑基期攻击。', price: 150, stackable: false, maxStack: 1, icon: '盾',
    slot: EquipmentSlot.ARTIFACT, stats: { defense: 25, hp: 20 }, runeSlots: 1,
  },
  {
    id: 'dragon_scale_armor', name: '龙鳞甲', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '韩立用真龙鳞片炼制的护甲，防御力惊人。', price: 650, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 45, hp: 50, attack: 5 }, runeSlots: 2,
  },
  {
    id: 'purple_gold_robe', name: '紫金软甲', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '韩立后期的护身软甲，可抵御同阶攻击。', price: 5000, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 70, speed: 10, hp: 60 }, runeSlots: 3,
  },

  // ==================== 遮天专属防具法宝 ====================
  {
    id: 'golden_cudgel_chain', name: '混沌链', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '遮天至宝，可锁住一切，连大帝都难以挣脱。', price: 18000, stackable: false, maxStack: 1, icon: '链',
    slot: EquipmentSlot.ARTIFACT, stats: { attack: 60, defense: 100, mana: 80 }, runeSlots: 5,
  },
  {
    id: 'heavenly_vault', name: '仙钟', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '遮天至宝，钟声一响，万物臣服。', price: 16000, stackable: false, maxStack: 1, icon: '钟',
    slot: EquipmentSlot.ARTIFACT, stats: { defense: 120, hp: 80, mana: 60 }, runeSlots: 5,
  },
  {
    id: 'jade_emperor_crown', name: '玉皇冠', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '叶凡的帝冠，可增幅神识，统御万灵。', price: 7000, stackable: false, maxStack: 1, icon: '冠',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 100, defense: 25, attack: 15 }, runeSlots: 4,
  },

  // ==================== 仙逆专属防具法宝 ====================
  {
    id: 'ghost_cloak', name: '鬼影披风', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '王林的隐身法宝，可融入阴影，无声无息。', price: 200, stackable: false, maxStack: 1, icon: '披',
    slot: EquipmentSlot.ARMOR, stats: { speed: 15, defense: 8, mana: 15 }, runeSlots: 1,
  },
  {
    id: 'time_ring', name: '定界之环', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '王林的时间法宝，可减缓周围时间流速。', price: 6000, stackable: false, maxStack: 1, icon: '环',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 80, defense: 30, speed: 10 }, runeSlots: 3,
  },
  {
    id: 'dragon_blood_armor', name: '龙血铠甲', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '王林用真龙血炼制的铠甲，可增幅战力。', price: 700, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 50, attack: 15, hp: 30 }, runeSlots: 3,
  },

  // ==================== 更多通用防具 ====================
  {
    id: 'cloth_robe', name: '布衣', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通的布衣，几乎没有防御力。', price: 5, stackable: false, maxStack: 1, icon: '衣',
    slot: EquipmentSlot.ARMOR, stats: { defense: 3 }, runeSlots: 0,
  },
  {
    id: 'leather_armor', name: '皮甲', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '兽皮制作的护甲，可提供基础防护。', price: 12, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 5 }, runeSlots: 0,
  },
  {
    id: 'bronze_armor', name: '青铜甲', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '青铜铸造的护甲，防御力尚可。', price: 25, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 10, speed: -1 }, runeSlots: 0,
  },
  {
    id: 'iron_armor', name: '铁甲', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '铁甲打造的护甲，防御力不错。', price: 30, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 12, speed: -2 }, runeSlots: 0,
  },
  {
    id: 'spirit_robe', name: '灵袍', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '蕴含灵气的法袍，可增幅法术防御。', price: 90, stackable: false, maxStack: 1, icon: '袍',
    slot: EquipmentSlot.ARMOR, stats: { defense: 18, mana: 15 }, runeSlots: 1,
  },
  {
    id: 'demon_armor', name: '魔甲', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '魔道修士的护甲，蕴含魔气。', price: 500, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 35, attack: 10, hp: -10 }, runeSlots: 2,
  },
  {
    id: 'immortal_robe', name: '仙袍', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '仙界流传的法袍，蕴含仙灵之气。', price: 4500, stackable: false, maxStack: 1, icon: '袍',
    slot: EquipmentSlot.ARMOR, stats: { defense: 60, mana: 50, speed: 5 }, runeSlots: 3,
  },
  {
    id: 'god_armor', name: '神甲', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '神界至宝，可抵御一切攻击。', price: 14000, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 120, hp: 80, mana: 40 }, runeSlots: 5,
  },
  {
    id: 'ghost_robe', name: '鬼袍', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '厉鬼使用的法袍，可融入阴影。', price: 450, stackable: false, maxStack: 1, icon: '袍',
    slot: EquipmentSlot.ARMOR, stats: { defense: 25, speed: 10, mana: 20 }, runeSlots: 2,
  },
  {
    id: 'blood_armor', name: '血甲', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '以血祭炼的护甲，可吸血恢复。', price: 4000, stackable: false, maxStack: 1, icon: '甲',
    slot: EquipmentSlot.ARMOR, stats: { defense: 55, hp: 60, attack: 15 }, runeSlots: 3,
  },

  // ==================== 更多通用饰品 ====================
  {
    id: 'wooden_ring', name: '木戒指', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通的木戒指，几乎没有任何效果。', price: 3, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 2 }, runeSlots: 0,
  },
  {
    id: 'copper_ring', name: '铜戒指', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '铜制的戒指，可微量提升法力。', price: 20, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 5 }, runeSlots: 0,
  },
  {
    id: 'silver_ring', name: '银戒指', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '银制的戒指，可提升一定法力。', price: 70, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 12, hp: 5 }, runeSlots: 0,
  },
  {
    id: 'gold_ring', name: '金戒指', type: ItemType.EQUIPMENT, quality: '极品',
    desc: '金制的戒指，可提升较多法力。', price: 300, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 25, hp: 10 }, runeSlots: 1,
  },
  {
    id: 'spirit_ring', name: '灵戒', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '蕴含灵气的戒指，可大幅提升法力。', price: 3500, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 60, defense: 10, speed: 5 }, runeSlots: 2,
  },
  {
    id: 'god_ring', name: '神戒', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '神界至宝，可增幅所有属性。', price: 12000, stackable: false, maxStack: 1, icon: '戒',
    slot: EquipmentSlot.ACCESSORY, stats: { mana: 100, hp: 50, attack: 20, defense: 20 }, runeSlots: 4,
  },
];
