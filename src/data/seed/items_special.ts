import { IItem, ItemType } from '../../domain/entities/Item';

/**
 * 小说风格特殊道具数据
 * 参考：《遮天》《完美世界》《凡人修仙传》《斗破苍穹》《仙逆》《一念永恒》等
 */

export const SPECIAL_ITEMS: IItem[] = [
  // ==================== 符箓类 ====================
  // 凡品
  {
    id: 'firecracker', name: '爆竹', type: ItemType.SPECIAL, quality: '凡品',
    desc: '普通爆竹，可制造声响。', price: 1, stackable: true, maxStack: 99, icon: '爆',
    effect: { type: 'noise' },
  },
  {
    id: 'paper_talisman', name: '黄纸符', type: ItemType.SPECIAL, quality: '凡品',
    desc: '道士画的符箓，略有驱邪效果。', price: 5, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'ward', value: 5 },
  },
  // 良品
  {
    id: 'fire_talisman', name: '火球符', type: ItemType.SPECIAL, quality: '良品',
    desc: '激发后可释放火球攻击敌人。', price: 20, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'attack_fire', value: 30 },
  },
  {
    id: 'ice_talisman', name: '冰锥符', type: ItemType.SPECIAL, quality: '良品',
    desc: '激发后可释放冰锥攻击敌人。', price: 20, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'attack_ice', value: 30 },
  },
  {
    id: 'thunder_talisman', name: '雷符', type: ItemType.SPECIAL, quality: '良品',
    desc: '激发后可释放雷电攻击敌人。', price: 25, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'attack_thunder', value: 35 },
  },
  {
    id: 'shield_talisman', name: '护盾符', type: ItemType.SPECIAL, quality: '良品',
    desc: '激发后可生成护盾抵挡攻击。', price: 22, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'shield', value: 50 },
  },
  {
    id: 'speed_talisman', name: '神行符', type: ItemType.SPECIAL, quality: '良品',
    desc: '贴在腿上可让速度大增。', price: 18, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'buff_speed', value: 15, duration: 60 },
  },
  // 珍品
  {
    id: 'summon_talisman', name: '召唤符', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可召唤一只灵兽助战。', price: 100, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'summon', value: 1 },
  },
  {
    id: 'teleport_talisman', name: '遁地符', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可瞬间遁地逃走，脱离战斗。', price: 120, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'escape' },
  },
  {
    id: 'invisibility_talisman', name: '隐身符', type: ItemType.SPECIAL, quality: '珍品',
    desc: '贴上后可暂时隐身。', price: 110, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'invisibility', duration: 120 },
  },
  {
    id: 'explosion_talisman', name: '爆裂符', type: ItemType.SPECIAL, quality: '珍品',
    desc: '威力巨大的爆炸符箓，可炸伤一片敌人。', price: 130, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'aoe_damage', value: 80 },
  },
  // 极品
  {
    id: 'heavenly_thunder_talisman', name: '天雷符', type: ItemType.SPECIAL, quality: '极品',
    desc: '可召唤天雷攻击，威力惊人。', price: 400, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'attack_thunder', value: 200 },
  },
  {
    id: 'space_tear_talisman', name: '破界符', type: ItemType.SPECIAL, quality: '极品',
    desc: '可撕裂空间，穿越到指定地点。', price: 500, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'teleport' },
  },
  {
    id: 'time_stop_talisman', name: '定身符', type: ItemType.SPECIAL, quality: '极品',
    desc: '可让敌人定身，无法动弹。', price: 450, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'stun', value: 5, duration: 30 },
  },
  // 仙品
  {
    id: 'immortal_seal', name: '封神符', type: ItemType.SPECIAL, quality: '仙品',
    desc: '可封印仙人的法力，让其沦为凡人。', price: 3000, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'seal', value: 100 },
  },
  {
    id: 'creation_talisman', name: '造物符', type: ItemType.SPECIAL, quality: '仙品',
    desc: '可凭空创造物品，不可思议。', price: 3500, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'create_item' },
  },

  // ==================== 阵盘类 ====================
  {
    id: 'trap_formation', name: '困阵盘', type: ItemType.SPECIAL, quality: '良品',
    desc: '布置后可困住敌人。', price: 35, stackable: true, maxStack: 99, icon: '阵',
    effect: { type: 'trap', value: 10 },
  },
  {
    id: 'killing_formation', name: '杀阵盘', type: ItemType.SPECIAL, quality: '珍品',
    desc: '布置后可自动攻击进入阵法的敌人。', price: 150, stackable: true, maxStack: 99, icon: '阵',
    effect: { type: 'damage_over_time', value: 20 },
  },
  {
    id: 'illusion_formation', name: '幻阵盘', type: ItemType.SPECIAL, quality: '珍品',
    desc: '布置后可制造幻象迷惑敌人。', price: 140, stackable: true, maxStack: 99, icon: '阵',
    effect: { type: 'illusion', value: 15 },
  },
  {
    id: 'spirit_gathering_formation', name: '聚灵阵盘', type: ItemType.SPECIAL, quality: '珍品',
    desc: '布置后可聚集灵气，提升修炼速度。', price: 160, stackable: true, maxStack: 99, icon: '阵',
    effect: { type: 'buff_cultivation', value: 30, duration: 3600 },
  },
  {
    id: 'defensive_formation', name: '防御阵盘', type: ItemType.SPECIAL, quality: '极品',
    desc: '布置后可生成强大防御罩，抵御攻击。', price: 500, stackable: true, maxStack: 99, icon: '阵',
    effect: { type: 'shield', value: 200 },
  },
  {
    id: 'heavenly_formation', name: '周天星斗大阵盘', type: ItemType.SPECIAL, quality: '仙品',
    desc: '可布置周天星斗大阵，借星辰之力御敌。', price: 4000, stackable: true, maxStack: 99, icon: '阵',
    effect: { type: 'buff_all', value: 50, duration: 600 },
  },

  // ==================== 灵兽蛋/宠物类 ====================
  {
    id: 'chicken_egg', name: '灵鸡蛋', type: ItemType.SPECIAL, quality: '凡品',
    desc: '普通灵鸡下的蛋，可食用。', price: 3, stackable: true, maxStack: 99, icon: '蛋',
    effect: { type: 'food', value: 10 },
  },
  {
    id: 'spirit_dog_egg', name: '灵犬幼崽', type: ItemType.SPECIAL, quality: '良品',
    desc: '忠诚的灵犬幼崽，可作守护兽。', price: 40, stackable: false, maxStack: 1, icon: '兽',
    effect: { type: 'pet', value: 1 },
  },
  {
    id: 'spirit_cat_egg', name: '灵猫幼崽', type: ItemType.SPECIAL, quality: '良品',
    desc: '灵巧的灵猫幼崽，可感知危险。', price: 45, stackable: false, maxStack: 1, icon: '兽',
    effect: { type: 'pet', value: 2 },
  },
  {
    id: 'spirit_fox_egg', name: '灵狐幼崽', type: ItemType.SPECIAL, quality: '珍品',
    desc: '聪慧的灵狐幼崽，可迷惑敌人。', price: 180, stackable: false, maxStack: 1, icon: '兽',
    effect: { type: 'pet', value: 3 },
  },
  {
    id: 'spirit_wolf_egg', name: '灵狼幼崽', type: ItemType.SPECIAL, quality: '珍品',
    desc: '凶猛的灵狼幼崽，可助战。', price: 200, stackable: false, maxStack: 1, icon: '兽',
    effect: { type: 'pet', value: 4 },
  },
  {
    id: 'spirit_eagle_egg', name: '灵鹰幼崽', type: ItemType.SPECIAL, quality: '珍品',
    desc: '高傲的灵鹰幼崽，可侦查敌情。', price: 190, stackable: false, maxStack: 1, icon: '兽',
    effect: { type: 'pet', value: 5 },
  },
  {
    id: 'dragon_egg', name: '龙蛋', type: ItemType.SPECIAL, quality: '极品',
    desc: '蛟龙之蛋，孵化后可得蛟龙坐骑。', price: 800, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'mount', value: 1 },
  },
  {
    id: 'phoenix_egg', name: '凤凰蛋', type: ItemType.SPECIAL, quality: '仙品',
    desc: '凤凰之蛋，孵化后可得凤凰坐骑。', price: 5000, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'mount', value: 2 },
  },
  {
    id: 'qilin_egg', name: '麒麟蛋', type: ItemType.SPECIAL, quality: '仙品',
    desc: '麒麟之蛋，孵化后可得麒麟坐骑。', price: 4500, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'mount', value: 3 },
  },

  // ==================== 功法残卷/秘籍类 ====================
  {
    id: 'sword_manual_fragment', name: '剑谱残页', type: ItemType.SPECIAL, quality: '凡品',
    desc: '普通剑法的残页，参考价值不大。', price: 8, stackable: true, maxStack: 99, icon: '卷',
    effect: { type: 'comprehension', value: 2 },
  },
  {
    id: 'palm_manual_fragment', name: '掌法残页', type: ItemType.SPECIAL, quality: '凡品',
    desc: '普通掌法的残页，参考价值不大。', price: 8, stackable: true, maxStack: 99, icon: '卷',
    effect: { type: 'comprehension', value: 2 },
  },
  {
    id: 'lightness_manual', name: '轻功秘籍', type: ItemType.SPECIAL, quality: '良品',
    desc: '记载轻功身法的秘籍，可提升速度。', price: 35, stackable: false, maxStack: 1, icon: '书',
    effect: { type: 'learn_skill', value: 1 },
  },
  {
    id: 'sword_qi_manual', name: '剑气诀', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可修炼剑气的功法，剑修必修。', price: 180, stackable: false, maxStack: 1, icon: '书',
    effect: { type: 'learn_skill', value: 2 },
  },
  {
    id: 'fire_palm_manual', name: '火焰掌', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可修炼火焰掌力的功法，威力不俗。', price: 170, stackable: false, maxStack: 1, icon: '书',
    effect: { type: 'learn_skill', value: 3 },
  },
  {
    id: 'ice_palm_manual', name: '玄冰掌', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可修炼玄冰掌力的功法，冰冷刺骨。', price: 170, stackable: false, maxStack: 1, icon: '书',
    effect: { type: 'learn_skill', value: 4 },
  },
  {
    id: 'thunder_fist_manual', name: '奔雷拳', type: ItemType.SPECIAL, quality: '极品',
    desc: '可修炼奔雷拳法的功法，拳出如雷。', price: 600, stackable: false, maxStack: 1, icon: '书',
    effect: { type: 'learn_skill', value: 5 },
  },
  {
    id: 'void_step_manual', name: '虚空步', type: ItemType.SPECIAL, quality: '极品',
    desc: '可修炼虚空踏步的身法，一步千里。', price: 650, stackable: false, maxStack: 1, icon: '书',
    effect: { type: 'learn_skill', value: 6 },
  },
  {
    id: 'immortal_sword_manual', name: '仙剑诀', type: ItemType.SPECIAL, quality: '仙品',
    desc: '仙界流传的剑诀，一剑可斩星辰。', price: 4000, stackable: false, maxStack: 1, icon: '书',
    effect: { type: 'learn_skill', value: 7 },
  },
  {
    id: 'chaos_dao_manual', name: '混沌道经', type: ItemType.SPECIAL, quality: '仙品',
    desc: '记载混沌大道的经文，可悟道成仙。', price: 4500, stackable: false, maxStack: 1, icon: '经',
    effect: { type: 'comprehension', value: 200 },
  },
  {
    id: 'heavenly_demon_manual', name: '天魔策', type: ItemType.SPECIAL, quality: '仙品',
    desc: '魔界至高功法，修炼后可成魔尊。', price: 3500, stackable: false, maxStack: 1, icon: '策',
    effect: { type: 'learn_skill', value: 8 },
  },

  // ==================== 卷轴类 ====================
  {
    id: 'map_scroll', name: '藏宝图', type: ItemType.SPECIAL, quality: '良品',
    desc: '记载宝藏位置的地图，可能有风险。', price: 30, stackable: false, maxStack: 1, icon: '图',
    effect: { type: 'reveal_treasure' },
  },
  {
    id: 'dungeon_scroll', name: '秘境卷轴', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可开启一处秘境的卷轴，内有宝物也有危险。', price: 150, stackable: false, maxStack: 1, icon: '卷',
    effect: { type: 'open_dungeon' },
  },
  {
    id: 'summon_scroll', name: '召唤卷轴', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可召唤强大存在助战一次。', price: 200, stackable: true, maxStack: 99, icon: '卷',
    effect: { type: 'summon_powerful', value: 1 },
  },
  {
    id: 'identification_scroll', name: '鉴定卷轴', type: ItemType.SPECIAL, quality: '良品',
    desc: '可鉴定未知物品的属性。', price: 25, stackable: true, maxStack: 99, icon: '卷',
    effect: { type: 'identify' },
  },
  {
    id: 'enchantment_scroll', name: '附魔卷轴', type: ItemType.SPECIAL, quality: '极品',
    desc: '可为装备附加额外属性。', price: 500, stackable: true, maxStack: 99, icon: '卷',
    effect: { type: 'enchant' },
  },
  {
    id: 'resurrection_scroll', name: '复活卷轴', type: ItemType.SPECIAL, quality: '仙品',
    desc: '可让死亡之人复活一次。', price: 3000, stackable: true, maxStack: 99, icon: '卷',
    effect: { type: 'resurrect' },
  },

  // ==================== 钥匙/令牌类 ====================
  {
    id: 'bronze_key', name: '青铜钥匙', type: ItemType.SPECIAL, quality: '良品',
    desc: '可打开青铜级别的宝箱或门。', price: 20, stackable: true, maxStack: 99, icon: '钥',
    effect: { type: 'unlock', value: 1 },
  },
  {
    id: 'silver_key', name: '白银钥匙', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可打开白银级别的宝箱或门。', price: 100, stackable: true, maxStack: 99, icon: '钥',
    effect: { type: 'unlock', value: 2 },
  },
  {
    id: 'gold_key', name: '黄金钥匙', type: ItemType.SPECIAL, quality: '极品',
    desc: '可打开黄金级别的宝箱或门。', price: 400, stackable: true, maxStack: 99, icon: '钥',
    effect: { type: 'unlock', value: 3 },
  },
  {
    id: 'sect_token', name: '宗门令牌', type: ItemType.SPECIAL, quality: '良品',
    desc: '某宗门的身份令牌，可出入宗门。', price: 30, stackable: false, maxStack: 1, icon: '令',
    effect: { type: 'access', value: 1 },
  },
  {
    id: 'city_pass', name: '通行令', type: ItemType.SPECIAL, quality: '良品',
    desc: '可自由出入某座城池。', price: 25, stackable: false, maxStack: 1, icon: '令',
    effect: { type: 'access', value: 2 },
  },
  {
    id: 'immortal_token', name: '仙令', type: ItemType.SPECIAL, quality: '仙品',
    desc: '仙界发放的令牌，可自由出入仙界。', price: 2500, stackable: false, maxStack: 1, icon: '令',
    effect: { type: 'access', value: 3 },
  },

  // ==================== 美食/酒水类 ====================
  {
    id: 'plain_bun', name: '馒头', type: ItemType.SPECIAL, quality: '凡品',
    desc: '普通白面馒头，可充饥。', price: 1, stackable: true, maxStack: 99, icon: '食',
    effect: { type: 'food', value: 5 },
  },
  {
    id: 'roast_chicken', name: '烧鸡', type: ItemType.SPECIAL, quality: '凡品',
    desc: '香喷喷的烧鸡，可恢复体力。', price: 5, stackable: true, maxStack: 99, icon: '食',
    effect: { type: 'food', value: 15 },
  },
  {
    id: 'spirit_wine', name: '灵酒', type: ItemType.SPECIAL, quality: '良品',
    desc: '以灵果酿制的酒，可恢复法力。', price: 15, stackable: true, maxStack: 99, icon: '酒',
    effect: { type: 'restore_mana', value: 20 },
  },
  {
    id: 'hundred_flowers_wine', name: '百花酿', type: ItemType.SPECIAL, quality: '珍品',
    desc: '采集百种灵花酿制，香气扑鼻，可恢复大量法力。', price: 80, stackable: true, maxStack: 99, icon: '酒',
    effect: { type: 'restore_mana', value: 60 },
  },
  {
    id: 'immortal_drunk', name: '仙人醉', type: ItemType.SPECIAL, quality: '极品',
    desc: '仙界名酒，连仙人都可醉倒。', price: 450, stackable: true, maxStack: 99, icon: '酒',
    effect: { type: 'buff_all', value: 10, duration: 600 },
  },
  {
    id: 'dragon_liver_phoenix_gall', name: '龙肝凤髓', type: ItemType.SPECIAL, quality: '仙品',
    desc: '传说中的美食，吃一口可增百年修为。', price: 2000, stackable: true, maxStack: 99, icon: '食',
    effect: { type: 'cultivation', value: 500 },
  },

  // ==================== 杂物/趣味物品 ====================
  {
    id: 'dice', name: '骰子', type: ItemType.SPECIAL, quality: '凡品',
    desc: '赌博用的骰子，试试手气？', price: 2, stackable: true, maxStack: 99, icon: '骰',
    effect: { type: 'gamble' },
  },
  {
    id: 'fishing_rod', name: '鱼竿', type: ItemType.SPECIAL, quality: '凡品',
    desc: '普通鱼竿，可钓鱼消遣。', price: 5, stackable: false, maxStack: 1, icon: '竿',
    effect: { type: 'fish' },
  },
  {
    id: 'spirit_fishing_rod', name: '灵钓竿', type: ItemType.SPECIAL, quality: '珍品',
    desc: '以灵木制成的钓竿，可钓灵鱼。', price: 150, stackable: false, maxStack: 1, icon: '竿',
    effect: { type: 'fish_spirit' },
  },
  {
    id: 'music_box', name: '八音盒', type: ItemType.SPECIAL, quality: '良品',
    desc: '可播放美妙音乐的盒子，可宁心静气。', price: 30, stackable: false, maxStack: 1, icon: '盒',
    effect: { type: 'calm', value: 5 },
  },
  {
    id: 'chess_set', name: '围棋', type: ItemType.SPECIAL, quality: '良品',
    desc: '黑白棋子，可陶冶情操，亦可悟道。', price: 25, stackable: false, maxStack: 1, icon: '棋',
    effect: { type: 'comprehension', value: 3 },
  },
  {
    id: 'painting_brush', name: '灵画笔', type: ItemType.SPECIAL, quality: '珍品',
    desc: '以灵兽毛制成的画笔，画出的画可成真。', price: 180, stackable: false, maxStack: 1, icon: '笔',
    effect: { type: 'create_illusion' },
  },
  {
    id: 'music_instrument_guqin', name: '古琴', type: ItemType.SPECIAL, quality: '珍品',
    desc: '上等桐木制成的古琴，琴音可惑人心神。', price: 200, stackable: false, maxStack: 1, icon: '琴',
    effect: { type: 'charm', value: 10 },
  },
  {
    id: 'tea_set', name: '茶具', type: ItemType.SPECIAL, quality: '良品',
    desc: '一套精致的茶具，泡茶更佳。', price: 20, stackable: false, maxStack: 1, icon: '具',
    effect: { type: 'buff_cultivation', value: 5, duration: 300 },
  },
  {
    id: 'incense_burner', name: '香炉', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可焚烧灵香，净化心灵，辅助修炼。', price: 140, stackable: false, maxStack: 1, icon: '炉',
    effect: { type: 'buff_cultivation', value: 10, duration: 600 },
  },
  {
    id: 'pill_furnace', name: '炼丹炉', type: ItemType.SPECIAL, quality: '珍品',
    desc: '炼丹必备的炉鼎，可提升炼丹成功率。', price: 170, stackable: false, maxStack: 1, icon: '炉',
    effect: { type: 'buff_alchemy', value: 15 },
  },
  {
    id: 'forging_hammer', name: '锻造锤', type: ItemType.SPECIAL, quality: '良品',
    desc: '铁匠用的锻造锤，可打造装备。', price: 30, stackable: false, maxStack: 1, icon: '锤',
    effect: { type: 'craft' },
  },
  {
    id: 'spirit_forge', name: '灵锻台', type: ItemType.SPECIAL, quality: '极品',
    desc: '可炼制灵器的锻造台，内有地火。', price: 600, stackable: false, maxStack: 1, icon: '台',
    effect: { type: 'craft_spirit' },
  },

  // ==================== 任务道具 ====================
  {
    id: 'letter', name: '信笺', type: ItemType.QUEST, quality: '凡品',
    desc: '一封普通的信，可能有重要信息。', price: 1, stackable: true, maxStack: 99, icon: '信',
  },
  {
    id: 'secret_letter', name: '密信', type: ItemType.QUEST, quality: '良品',
    desc: '加密的信件，需要特殊方法才能阅读。', price: 10, stackable: true, maxStack: 99, icon: '信',
  },
  {
    id: 'ancient_scroll', name: '古卷', type: ItemType.QUEST, quality: '珍品',
    desc: '上古遗留的卷轴，记载着失传的秘法。', price: 100, stackable: false, maxStack: 1, icon: '卷',
  },
  {
    id: 'jade_slip', name: '玉简', type: ItemType.QUEST, quality: '珍品',
    desc: '记载信息的玉简，可用神识读取。', price: 80, stackable: true, maxStack: 99, icon: '简',
  },
  {
    id: 'blood_contract', name: '血契', type: ItemType.QUEST, quality: '极品',
    desc: '以鲜血签订的契约，不可违背。', price: 400, stackable: false, maxStack: 1, icon: '契',
  },
  {
    id: 'heavenly_edict', name: '天书', type: ItemType.QUEST, quality: '仙品',
    desc: '上天降下的旨意，蕴含天道法则。', price: 3000, stackable: false, maxStack: 1, icon: '书',
  },

  // ==================== 碎片类 ====================
  {
    id: 'sword_fragment', name: '剑之碎片', type: ItemType.FRAGMENT, quality: '珍品',
    desc: '某把神剑的碎片，收集齐全可重铸神剑。', price: 50, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'armor_fragment', name: '甲之碎片', type: ItemType.FRAGMENT, quality: '珍品',
    desc: '某件神甲的碎片，收集齐全可重铸神甲。', price: 50, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'mirror_fragment', name: '镜之碎片', type: ItemType.FRAGMENT, quality: '极品',
    desc: '昆仑镜的碎片，收集齐全可修复昆仑镜。', price: 200, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'pagoda_fragment', name: '塔之碎片', type: ItemType.FRAGMENT, quality: '极品',
    desc: '昊天塔的碎片，收集齐全可修复昊天塔。', price: 200, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'bell_fragment', name: '钟之碎片', type: ItemType.FRAGMENT, quality: '仙品',
    desc: '东皇钟的碎片，收集齐全可修复东皇钟。', price: 1000, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'map_fragment_1', name: '藏宝图碎片·上', type: ItemType.FRAGMENT, quality: '珍品',
    desc: '藏宝图的上半部分。', price: 80, stackable: false, maxStack: 1, icon: '图',
  },
  {
    id: 'map_fragment_2', name: '藏宝图碎片·下', type: ItemType.FRAGMENT, quality: '珍品',
    desc: '藏宝图的下半部分。', price: 80, stackable: false, maxStack: 1, icon: '图',
  },
  {
    id: 'dragon_scale_fragment', name: '逆鳞碎片', type: ItemType.FRAGMENT, quality: '极品',
    desc: '龙族逆鳞的碎片，蕴含龙族秘法。', price: 300, stackable: true, maxStack: 99, icon: '鳞',
  },
  {
    id: 'phoenix_nirvana_fragment', name: '涅槃碎片', type: ItemType.FRAGMENT, quality: '仙品',
    desc: '凤凰涅槃时留下的碎片，蕴含重生之力。', price: 1500, stackable: true, maxStack: 99, icon: '碎',
  },

  // ==================== 完美世界专属特殊道具 ====================
  {
    id: 'immortal_king_order', name: '仙王令', type: ItemType.SPECIAL, quality: '神品',
    desc: '完美世界仙王的令牌，可号令天下。', price: 10000, stackable: false, maxStack: 1, icon: '令',
    effect: { type: 'access' },
  },
  {
    id: 'desolate_emperor_seal', name: '荒帝印', type: ItemType.SPECIAL, quality: '神品',
    desc: '荒天帝的印章，可镇压一切。', price: 12000, stackable: false, maxStack: 1, icon: '印',
    effect: { type: 'ward' },
  },
  {
    id: 'heavenly_origin_pill', name: '原始真解', type: ItemType.SPECIAL, quality: '神品',
    desc: '完美世界第一功法，蕴含原始大道。', price: 15000, stackable: false, maxStack: 1, icon: '功',
    effect: { type: 'learn_skill', value: 5 },
  },
  {
    id: 'god_seed', name: '神种', type: ItemType.SPECIAL, quality: '仙品',
    desc: '可生长为神树的种子，蕴含生命法则。', price: 3000, stackable: false, maxStack: 1, icon: '种',
    effect: { type: 'pet', value: 3 },
  },

  // ==================== 斗破苍穹专属特殊道具 ====================
  {
    id: 'ancient_books', name: '古籍', type: ItemType.SPECIAL, quality: '极品',
    desc: '古界遗留的功法秘籍。', price: 600, stackable: false, maxStack: 1, icon: '书',
    effect: { type: 'learn_skill', value: 2 },
  },
  {
    id: 'medusa_egg', name: '美杜莎蛋', type: ItemType.SPECIAL, quality: '仙品',
    desc: '美杜莎女王的后代，孵化后可成为强大的战斗伙伴。', price: 4000, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'pet', value: 4 },
  },
  {
    id: 'ancient_fire_map', name: '古界火图', type: ItemType.SPECIAL, quality: '仙品',
    desc: '记载异火位置的地图。', price: 3500, stackable: false, maxStack: 1, icon: '图',
    effect: { type: 'reveal_treasure' },
  },
  {
    id: 'fighting_qi_crystal', name: '斗气晶核', type: ItemType.SPECIAL, quality: '珍品',
    desc: '凝聚的斗气精华，可加速修炼。', price: 150, stackable: true, maxStack: 99, icon: '核',
    effect: { type: 'cultivation', value: 30 },
  },

  // ==================== 凡人修仙传专属特殊道具 ====================
  {
    id: 'heavenly_treasure_map', name: '虚天殿钥匙', type: ItemType.SPECIAL, quality: '极品',
    desc: '开启虚天殿的钥匙。', price: 500, stackable: false, maxStack: 1, icon: '钥',
    effect: { type: 'open_dungeon' },
  },
  {
    id: 'black_iron_spider', name: '墨铁蜘蛛', type: ItemType.SPECIAL, quality: '珍品',
    desc: '韩立的灵兽，可吐丝结网。', price: 200, stackable: false, maxStack: 1, icon: '蛛',
    effect: { type: 'pet', value: 1 },
  },
  {
    id: 'green_lotus', name: '青元剑诀', type: ItemType.SPECIAL, quality: '极品',
    desc: '韩立的本命剑诀，蕴含青元法则。', price: 700, stackable: false, maxStack: 1, icon: '功',
    effect: { type: 'learn_skill', value: 3 },
  },
  {
    id: 'blood_slave', name: '血奴契约', type: ItemType.SPECIAL, quality: '极品',
    desc: '可控制他人的血契。', price: 450, stackable: false, maxStack: 1, icon: '契',
    effect: { type: 'charm', value: 50 },
  },

  // ==================== 遮天专属特殊道具 ====================
  {
    id: 'emperor_token', name: '大帝令', type: ItemType.SPECIAL, quality: '神品',
    desc: '遮天大帝的令牌，可号令天下修士。', price: 12000, stackable: false, maxStack: 1, icon: '令',
    effect: { type: 'access' },
  },
  {
    id: 'dragon_coffin_key', name: '九龙拉棺钥匙', type: ItemType.SPECIAL, quality: '神品',
    desc: '开启九龙拉棺的钥匙，可穿越星空。', price: 15000, stackable: false, maxStack: 1, icon: '钥',
    effect: { type: 'teleport' },
  },
  {
    id: 'heavenly_book', name: '无字天书', type: ItemType.SPECIAL, quality: '神品',
    desc: '遮天中的无上功法，蕴含天道法则。', price: 18000, stackable: false, maxStack: 1, icon: '书',
    effect: { type: 'learn_skill', value: 6 },
  },
  {
    id: 'star_chart', name: '星图', type: ItemType.SPECIAL, quality: '仙品',
    desc: '记载星空路线的图谱，可指引方向。', price: 3000, stackable: false, maxStack: 1, icon: '图',
    effect: { type: 'reveal_treasure' },
  },

  // ==================== 仙逆专属特殊道具 ====================
  {
    id: 'reverse_heaven_order', name: '逆天道令', type: ItemType.SPECIAL, quality: '神品',
    desc: '王林的道令，可逆转天道。', price: 10000, stackable: false, maxStack: 1, icon: '令',
    effect: { type: 'change_fate', value: 30 },
  },
  {
    id: 'ancient_god_seal', name: '古神印', type: ItemType.SPECIAL, quality: '仙品',
    desc: '古神留下的印章，可镇压一切。', price: 5000, stackable: false, maxStack: 1, icon: '印',
    effect: { type: 'ward' },
  },
  {
    id: 'soul_lamp', name: '命魂灯', type: ItemType.SPECIAL, quality: '极品',
    desc: '可感应他人生死的魂灯。', price: 400, stackable: false, maxStack: 1, icon: '灯',
    effect: { type: 'identify' },
  },
  {
    id: 'killing_array', name: '杀戮阵盘', type: ItemType.SPECIAL, quality: '仙品',
    desc: '王林布置的杀戮阵法，可灭杀一切。', price: 4500, stackable: false, maxStack: 1, icon: '阵',
    effect: { type: 'aoe_damage', value: 80 },
  },

  // ==================== 符箓系列 ====================
  {
    id: 'fire_burst_talisman', name: '爆炎符', type: ItemType.SPECIAL, quality: '良品',
    desc: '释放爆炎攻击敌人，可造成范围火焰伤害。', price: 15, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'attack_fire', value: 40 },
  },
  {
    id: 'ice_seal_talisman', name: '冰封符', type: ItemType.SPECIAL, quality: '珍品',
    desc: '释放寒气冻结敌人，可造成冰冻效果。', price: 120, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'attack_ice', value: 60 },
  },
  {
    id: 'thunder_strike_talisman', name: '天雷符', type: ItemType.SPECIAL, quality: '极品',
    desc: '召唤天雷轰击敌人，威力惊人。', price: 350, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'attack_thunder', value: 100 },
  },
  {
    id: 'barrier_talisman', name: '金刚符', type: ItemType.SPECIAL, quality: '珍品',
    desc: '生成金刚护盾，可抵挡大量伤害。', price: 100, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'shield', value: 80 },
  },
  {
    id: 'invisibility_talisman', name: '隐身符', type: ItemType.SPECIAL, quality: '极品',
    desc: '使用后可隐身一段时间，避过敌人耳目。', price: 400, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'invisibility', value: 1, duration: 300 },
  },
  {
    id: 'blink_talisman', name: '瞬移符', type: ItemType.SPECIAL, quality: '极品',
    desc: '可瞬间移动到指定位置，逃命必备。', price: 500, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'teleport', value: 1 },
  },
  {
    id: 'summon_talisman', name: '召唤符', type: ItemType.SPECIAL, quality: '仙品',
    desc: '可召唤强大的灵兽助战。', price: 2000, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'summon', value: 3 },
  },
  {
    id: 'stun_talisman', name: '定身符', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可定住敌人，使其无法动弹。', price: 150, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'stun', value: 1, duration: 60 },
  },
  {
    id: 'seal_talisman', name: '封印符', type: ItemType.SPECIAL, quality: '极品',
    desc: '可封印敌人的修为，使其暂时无法使用法术。', price: 600, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'seal', value: 1, duration: 120 },
  },
  {
    id: 'heavenly_thunder_talisman', name: '九天玄雷符', type: ItemType.SPECIAL, quality: '神品',
    desc: '上古符箓，可引动九天玄雷，毁天灭地。', price: 8000, stackable: true, maxStack: 99, icon: '符',
    effect: { type: 'attack_thunder', value: 300 },
  },

  // ==================== 阵盘系列 ====================
  {
    id: 'spirit_gathering_array', name: '聚灵阵盘', type: ItemType.SPECIAL, quality: '良品',
    desc: '可聚集周围灵气，加速修炼速度。', price: 20, stackable: false, maxStack: 1, icon: '阵',
    effect: { type: 'buff_cultivation', value: 20 },
  },
  {
    id: 'illusion_array', name: '幻阵盘', type: ItemType.SPECIAL, quality: '珍品',
    desc: '布置幻阵，迷惑敌人感官。', price: 180, stackable: false, maxStack: 1, icon: '阵',
    effect: { type: 'illusion', value: 1 },
  },
  {
    id: 'trapping_array', name: '困阵盘', type: ItemType.SPECIAL, quality: '极品',
    desc: '布置困阵，可困住敌人。', price: 450, stackable: false, maxStack: 1, icon: '阵',
    effect: { type: 'trap', value: 1 },
  },
  {
    id: 'killing_sword_array', name: '诛仙剑阵盘', type: ItemType.SPECIAL, quality: '仙品',
    desc: '仿照诛仙剑阵炼制的阵盘，威力无穷。', price: 5000, stackable: false, maxStack: 1, icon: '阵',
    effect: { type: 'aoe_damage', value: 150 },
  },
  {
    id: 'defensive_heaven_array', name: '玄武阵盘', type: ItemType.SPECIAL, quality: '极品',
    desc: '布置防御大阵，可抵挡强敌攻击。', price: 500, stackable: false, maxStack: 1, icon: '阵',
    effect: { type: 'shield', value: 150 },
  },
  {
    id: 'yin_yang_array', name: '阴阳阵盘', type: ItemType.SPECIAL, quality: '仙品',
    desc: '蕴含阴阳法则的阵盘，可逆转生死。', price: 4500, stackable: false, maxStack: 1, icon: '阵',
    effect: { type: 'rebirth', value: 1 },
  },
  {
    id: 'five_elements_array', name: '五行阵盘', type: ItemType.SPECIAL, quality: '极品',
    desc: '蕴含五行法则的阵盘，可演化万物。', price: 550, stackable: false, maxStack: 1, icon: '阵',
    effect: { type: 'buff_all', value: 20 },
  },
  {
    id: 'star_shift_array', name: '斗转星移阵盘', type: ItemType.SPECIAL, quality: '仙品',
    desc: '可转移攻击，借力打力。', price: 4000, stackable: false, maxStack: 1, icon: '阵',
    effect: { type: 'shield', value: 200 },
  },
  {
    id: 'nine_heavens_array', name: '九天十地阵盘', type: ItemType.SPECIAL, quality: '神品',
    desc: '上古大阵，可覆盖九天十地，镇压一切。', price: 12000, stackable: false, maxStack: 1, icon: '阵',
    effect: { type: 'aoe_damage', value: 250 },
  },
  {
    id: 'chaos_array', name: '混沌阵盘', type: ItemType.SPECIAL, quality: '神品',
    desc: '蕴含混沌法则的阵盘，可开天辟地。', price: 15000, stackable: false, maxStack: 1, icon: '阵',
    effect: { type: 'create_illusion', value: 5 },
  },

  // ==================== 灵兽蛋/坐骑蛋系列 ====================
  {
    id: 'qilin_egg', name: '麒麟蛋', type: ItemType.SPECIAL, quality: '仙品',
    desc: '麒麟之蛋，孵化后可得麒麟坐骑。', price: 5000, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'mount', value: 3 },
  },
  {
    id: 'white_tiger_egg', name: '白虎蛋', type: ItemType.SPECIAL, quality: '仙品',
    desc: '白虎之蛋，孵化后可得白虎坐骑。', price: 4500, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'mount', value: 3 },
  },
  {
    id: 'black_tortoise_egg', name: '玄武蛋', type: ItemType.SPECIAL, quality: '仙品',
    desc: '玄武之蛋，孵化后可得玄武坐骑。', price: 4500, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'mount', value: 3 },
  },
  {
    id: 'vermillion_bird_egg', name: '朱雀蛋', type: ItemType.SPECIAL, quality: '仙品',
    desc: '朱雀之蛋，孵化后可得朱雀坐骑。', price: 5000, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'mount', value: 3 },
  },
  {
    id: 'azure_dragon_egg', name: '青龙蛋', type: ItemType.SPECIAL, quality: '神品',
    desc: '青龙之蛋，孵化后可得青龙坐骑。', price: 8000, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'mount', value: 4 },
  },
  {
    id: 'nine_tailed_fox_egg', name: '九尾狐蛋', type: ItemType.SPECIAL, quality: '极品',
    desc: '九尾狐之蛋，孵化后可得九尾狐宠物。', price: 600, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'pet', value: 2 },
  },
  {
    id: 'golden_winged_peng_egg', name: '金翅大鹏蛋', type: ItemType.SPECIAL, quality: '仙品',
    desc: '金翅大鹏之蛋，孵化后可得金翅大鹏坐骑。', price: 5500, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'mount', value: 4 },
  },
  {
    id: 'black_dragon_egg', name: '黑龙蛋', type: ItemType.SPECIAL, quality: '仙品',
    desc: '黑龙之蛋，孵化后可得黑龙坐骑。', price: 6000, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'mount', value: 4 },
  },
  {
    id: 'immortal_crane_egg', name: '仙鹤蛋', type: ItemType.SPECIAL, quality: '珍品',
    desc: '仙鹤之蛋，孵化后可得仙鹤坐骑。', price: 200, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'mount', value: 2 },
  },
  {
    id: 'spirit_monkey_egg', name: '灵猴蛋', type: ItemType.SPECIAL, quality: '珍品',
    desc: '灵猴之蛋，孵化后可得灵猴宠物。', price: 150, stackable: false, maxStack: 1, icon: '蛋',
    effect: { type: 'pet', value: 1 },
  },

  // ==================== 任务道具系列 ====================
  {
    id: 'broken_sword', name: '断剑', type: ItemType.QUEST, quality: '凡品',
    desc: '一把断裂的古剑，似乎有某种故事。', price: 5, stackable: false, maxStack: 1, icon: '剑',
  },
  {
    id: 'old_wine_pot', name: '旧酒壶', type: ItemType.QUEST, quality: '凡品',
    desc: '一个破旧的酒壶，残留着酒香。', price: 3, stackable: false, maxStack: 1, icon: '壶',
  },
  {
    id: 'mysterious_iron_box', name: '玄铁盒', type: ItemType.QUEST, quality: '珍品',
    desc: '一个精致的玄铁盒子，需要特殊方法才能打开。', price: 120, stackable: false, maxStack: 1, icon: '盒',
  },
  {
    id: 'family_jade', name: '家族玉佩', type: ItemType.QUEST, quality: '极品',
    desc: '某个修仙家族的传承玉佩，内含家族秘法。', price: 500, stackable: false, maxStack: 1, icon: '玉',
  },
  {
    id: 'demon_sect_token', name: '魔宗令牌', type: ItemType.QUEST, quality: '极品',
    desc: '魔道宗门的身份令牌，持有者可进入魔宗。', price: 400, stackable: false, maxStack: 1, icon: '令',
  },
  {
    id: 'immortal_remains', name: '仙人遗骸', type: ItemType.QUEST, quality: '仙品',
    desc: '上古仙人的遗骸，蕴含大道法则。', price: 3000, stackable: false, maxStack: 1, icon: '骸',
  },
  {
    id: 'world_stone', name: '界石', type: ItemType.QUEST, quality: '神品',
    desc: '可连通两界的神石，极为稀有。', price: 10000, stackable: false, maxStack: 1, icon: '石',
  },
  {
    id: 'karma_thread', name: '因果线', type: ItemType.QUEST, quality: '神品',
    desc: '连接因果的丝线，可追踪任何人。', price: 8000, stackable: false, maxStack: 1, icon: '线',
  },

  // ==================== 功能性道具系列 ====================
  {
    id: 'resurrection_scroll', name: '复活卷轴', type: ItemType.SPECIAL, quality: '仙品',
    desc: '可让人死而复生的神奇卷轴。', price: 5000, stackable: true, maxStack: 99, icon: '卷',
    effect: { type: 'resurrect', value: 1 },
  },
  {
    id: 'world_teleport_scroll', name: '跨界传送卷轴', type: ItemType.SPECIAL, quality: '极品',
    desc: '可传送到任意已激活的传送点。', price: 300, stackable: true, maxStack: 99, icon: '卷',
    effect: { type: 'teleport', value: 1 },
  },
  {
    id: 'identification_scroll', name: '鉴定卷轴', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可鉴定未知物品的属性。', price: 80, stackable: true, maxStack: 99, icon: '卷',
    effect: { type: 'identify', value: 1 },
  },
  {
    id: 'enchantment_scroll', name: '附魔卷轴', type: ItemType.SPECIAL, quality: '极品',
    desc: '可为装备附加额外属性。', price: 400, stackable: true, maxStack: 99, icon: '卷',
    effect: { type: 'enchant', value: 1 },
  },
  {
    id: 'spirit_stone_bag', name: '灵石袋', type: ItemType.SPECIAL, quality: '良品',
    desc: '可存储大量灵石的袋子。', price: 20, stackable: false, maxStack: 1, icon: '袋',
    effect: { type: 'access' },
  },
  {
    id: 'medicine_cauldron', name: '炼丹炉', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可炼制丹药的丹炉，品质越好成丹率越高。', price: 150, stackable: false, maxStack: 1, icon: '炉',
    effect: { type: 'buff_alchemy', value: 15 },
  },
  {
    id: 'spirit_forge_advanced', name: '炼器台', type: ItemType.SPECIAL, quality: '珍品',
    desc: '可炼制法宝的锻造台，内有灵火。', price: 180, stackable: false, maxStack: 1, icon: '台',
    effect: { type: 'craft_spirit', value: 15 },
  },
  {
    id: 'fishing_rod_spirit', name: '灵鱼竿', type: ItemType.SPECIAL, quality: '极品',
    desc: '可钓取灵鱼的鱼竿，有机会钓到珍稀灵物。', price: 350, stackable: false, maxStack: 1, icon: '竿',
    effect: { type: 'fish_spirit', value: 2 },
  },
  {
    id: 'gambling_dice', name: '天机骰子', type: ItemType.SPECIAL, quality: '极品',
    desc: '可预测天机的天机骰子，有机会获得珍稀物品。', price: 500, stackable: false, maxStack: 1, icon: '骰',
    effect: { type: 'gamble', value: 1 },
  },
  {
    id: 'tranquil_incense', name: '安神香', type: ItemType.SPECIAL, quality: '良品',
    desc: '可让人心神宁静，提升修炼效率。', price: 25, stackable: true, maxStack: 99, icon: '香',
    effect: { type: 'calm', value: 10 },
  },

  // ==================== 更多碎片系列 ====================
  {
    id: 'sword_fragment_2', name: '诛仙剑碎片', type: ItemType.FRAGMENT, quality: '仙品',
    desc: '诛仙剑的碎片，蕴含无尽杀意。', price: 800, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'pagoda_fragment_2', name: '荒塔碎片', type: ItemType.FRAGMENT, quality: '仙品',
    desc: '荒塔的碎片，蕴含荒道法则。', price: 900, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'mirror_fragment_2', name: '昆仑镜碎片', type: ItemType.FRAGMENT, quality: '仙品',
    desc: '昆仑镜的碎片，可映照过去未来。', price: 850, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'ding_fragment', name: '神农鼎碎片', type: ItemType.FRAGMENT, quality: '极品',
    desc: '神农鼎的碎片，蕴含丹道法则。', price: 300, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'qin_fragment', name: '伏羲琴碎片', type: ItemType.FRAGMENT, quality: '仙品',
    desc: '伏羲琴的碎片，蕴含音律大道。', price: 700, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'axe_fragment', name: '盘古斧碎片', type: ItemType.FRAGMENT, quality: '神品',
    desc: '盘古斧的碎片，蕴含开天之力。', price: 2000, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'spear_fragment', name: '弑神枪碎片', type: ItemType.FRAGMENT, quality: '神品',
    desc: '弑神枪的碎片，蕴含毁灭之力。', price: 1800, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'lamp_fragment', name: '宝莲灯碎片', type: ItemType.FRAGMENT, quality: '仙品',
    desc: '宝莲灯的碎片，蕴含光明之力。', price: 750, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'gourd_fragment', name: '斩仙飞刀碎片', type: ItemType.FRAGMENT, quality: '仙品',
    desc: '斩仙飞刀的碎片，蕴含杀戮法则。', price: 800, stackable: true, maxStack: 99, icon: '碎',
  },
  {
    id: 'fan_fragment', name: '芭蕉扇碎片', type: ItemType.FRAGMENT, quality: '极品',
    desc: '芭蕉扇的碎片，蕴含风火之力。', price: 250, stackable: true, maxStack: 99, icon: '碎',
  },
];
