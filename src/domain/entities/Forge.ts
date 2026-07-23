import { CultivationRealm } from './Player';
import { ItemType, EquipmentSlot } from './Item';

export enum ForgeQuality {
  MORTAL = '凡器',
  SPIRIT = '灵器',
  DIVINE = '神器',
  IMMORTAL = '仙器',
}

export interface IForgeRecipe {
  id: string;
  name: string;
  resultItemName: string;
  quality: ForgeQuality;
  slot: EquipmentSlot;
  description: string;
  originStory: string;
  requiredRealm: CultivationRealm;
  ingredients: { id: string; amount: number }[];
  baseStats: {
    attack?: number;
    defense?: number;
    hp?: number;
    mana?: number;
    speed?: number;
  };
  successRate: number;
  runeSlots: number;
  specialEffect?: string;
}

export interface IForgeSkill {
  level: number;
  exp: number;
  maxExp: number;
}

export interface IRuneEngrave {
  id: string;
  name: string;
  description: string;
  effect: {
    attackBonus?: number;
    defenseBonus?: number;
    critBonus?: number;
    speedBonus?: number;
  };
  requiredRealm: CultivationRealm;
}

export const FORGE_QUALITY_BONUS: Record<ForgeQuality, { statMultiplier: number; successRateBonus: number }> = {
  [ForgeQuality.MORTAL]: { statMultiplier: 1.0, successRateBonus: 0.15 },
  [ForgeQuality.SPIRIT]: { statMultiplier: 1.5, successRateBonus: 0.05 },
  [ForgeQuality.DIVINE]: { statMultiplier: 2.0, successRateBonus: 0 },
  [ForgeQuality.IMMORTAL]: { statMultiplier: 3.0, successRateBonus: -0.1 },
};

export const RUNE_ENGRAVES: IRuneEngrave[] = [
  {
    id: 'rune_sharp',
    name: '锋锐符文',
    description: '增加武器攻击力',
    effect: { attackBonus: 10 },
    requiredRealm: CultivationRealm.BLOOD_MOVING,
  },
  {
    id: 'rune_hard',
    name: '坚固符文',
    description: '增加护甲防御力',
    effect: { defenseBonus: 10 },
    requiredRealm: CultivationRealm.BLOOD_MOVING,
  },
  {
    id: 'rune_swift',
    name: '疾风符文',
    description: '增加移动速度',
    effect: { speedBonus: 5 },
    requiredRealm: CultivationRealm.CAVE,
  },
  {
    id: 'rune_critical',
    name: '暴击符文',
    description: '增加暴击率',
    effect: { critBonus: 0.05 },
    requiredRealm: CultivationRealm.CAVE,
  },
  {
    id: 'rune_dragon',
    name: '真龙符文',
    description: '蕴含真龙之力，大幅提升攻击力',
    effect: { attackBonus: 30, critBonus: 0.1 },
    requiredRealm: CultivationRealm.SPIRIT,
  },
  {
    id: 'rune_phoenix',
    name: '凤凰符文',
    description: '蕴含凤凰之力，大幅提升防御和生命',
    effect: { defenseBonus: 25, },
    requiredRealm: CultivationRealm.SPIRIT,
  },
  {
    id: 'rune_kunpeng',
    name: '鲲鹏符文',
    description: '蕴含鲲鹏之力，提升速度和攻击',
    effect: { speedBonus: 15, attackBonus: 15 },
    requiredRealm: CultivationRealm.INSCRIBE,
  },
];

export const FORGE_RECIPES: IForgeRecipe[] = [
  {
    id: 'forge_iron_sword',
    name: '玄铁剑',
    resultItemName: '玄铁剑',
    quality: ForgeQuality.MORTAL,
    slot: EquipmentSlot.WEAPON,
    description: '由玄铁打造的基础武器，锋利耐用。',
    originStory: '玄铁剑是修士常用的基础武器，由玄铁矿石打造而成。虽然品质一般，但胜在坚固耐用。',
    requiredRealm: CultivationRealm.BLOOD_MOVING,
    ingredients: [{ id: 'iron_ore', amount: 3 }],
    baseStats: { attack: 15 },
    successRate: 0.85,
    runeSlots: 1,
  },
  {
    id: 'forge_stone_armor',
    name: '石甲',
    resultItemName: '石甲',
    quality: ForgeQuality.MORTAL,
    slot: EquipmentSlot.ARMOR,
    description: '由石族工艺打造的护甲，坚硬如石。',
    originStory: '石甲是石族特有的护甲，由石族工匠以秘法打造，坚硬如石，可抵御大部分攻击。',
    requiredRealm: CultivationRealm.BLOOD_MOVING,
    ingredients: [{ id: 'stone_material', amount: 3 }],
    baseStats: { defense: 12, hp: 30 },
    successRate: 0.85,
    runeSlots: 1,
  },
  {
    id: 'forge_wind_boots',
    name: '风行靴',
    resultItemName: '风行靴',
    quality: ForgeQuality.MORTAL,
    slot: EquipmentSlot.BOOTS,
    description: '轻便的靴子，可提升移动速度。',
    originStory: '风行靴是修士常用的辅助装备，可提升移动速度，在战斗和探索中都有很大帮助。',
    requiredRealm: CultivationRealm.BLOOD_MOVING,
    ingredients: [{ id: 'beast_skin', amount: 2 }, { id: 'wind_crystal', amount: 1 }],
    baseStats: { speed: 5 },
    successRate: 0.8,
    runeSlots: 1,
  },
  {
    id: 'forge_bone_sword',
    name: '龙骨剑',
    resultItemName: '龙骨剑',
    quality: ForgeQuality.SPIRIT,
    slot: EquipmentSlot.WEAPON,
    description: '以龙骨碎片打造的灵器，蕴含龙族之力。',
    originStory: '龙骨剑是以太古龙骨碎片打造的灵器，蕴含着龙族的威压。石昊曾使用过类似的骨器。',
    requiredRealm: CultivationRealm.CAVE,
    ingredients: [{ id: 'dragon_bone', amount: 1 }, { id: 'iron_ore', amount: 5 }],
    baseStats: { attack: 40 },
    successRate: 0.6,
    runeSlots: 2,
    specialEffect: '攻击时5%概率释放龙息',
  },
  {
    id: 'forge_spirit_armor',
    name: '灵纹甲',
    resultItemName: '灵纹甲',
    quality: ForgeQuality.SPIRIT,
    slot: EquipmentSlot.ARMOR,
    description: '刻有灵纹的护甲，防御力极强。',
    originStory: '灵纹甲是炼器师以灵纹刻画的护甲，防御力远超普通护甲，是中阶修士的优选装备。',
    requiredRealm: CultivationRealm.CAVE,
    ingredients: [{ id: 'spirit_ore', amount: 3 }, { id: 'spirit_crystal', amount: 1 }],
    baseStats: { defense: 35, hp: 80 },
    successRate: 0.6,
    runeSlots: 2,
  },
  {
    id: 'forge_divine_blade',
    name: '神罚之刃',
    resultItemName: '神罚之刃',
    quality: ForgeQuality.DIVINE,
    slot: EquipmentSlot.WEAPON,
    description: '蕴含神力的神器，可斩神灭魔。',
    originStory: '神罚之刃是传说中的神器，蕴含着神明的力量。据说只有最顶尖的炼器师才能打造出这样的神器。',
    requiredRealm: CultivationRealm.VENERABLE,
    ingredients: [{ id: 'immortal_essence', amount: 1 }, { id: 'dragon_bone', amount: 3 }, { id: 'spirit_crystal', amount: 5 }],
    baseStats: { attack: 120 },
    successRate: 0.35,
    runeSlots: 3,
    specialEffect: '攻击时10%概率触发神罚，造成2倍伤害',
  },
  {
    id: 'forge_immortal_crown',
    name: '仙灵冠',
    resultItemName: '仙灵冠',
    quality: ForgeQuality.IMMORTAL,
    slot: EquipmentSlot.ACCESSORY,
    description: '仙器级别的饰品，蕴含仙力。',
    originStory: '仙灵冠是仙器级别的饰品，蕴含着仙力。据说佩戴者可获得仙人的庇护。',
    requiredRealm: CultivationRealm.SUPREME,
    ingredients: [{ id: 'immortal_essence', amount: 3 }, { id: 'xian_jing', amount: 5 }],
    baseStats: { hp: 200, mana: 100, defense: 30 },
    successRate: 0.2,
    runeSlots: 3,
    specialEffect: '全属性提升10%',
  },
];

export function findForgeRecipe(id: string): IForgeRecipe | undefined {
  return FORGE_RECIPES.find(r => r.id === id);
}

export function findRuneEngrave(id: string): IRuneEngrave | undefined {
  return RUNE_ENGRAVES.find(r => r.id === id);
}

// ===== 骨文宝术系统（完美世界凶兽宝术刻录） =====

export enum BoneRuneGrade {
  BEAST = '遗种骨文',
  PURE = '纯血骨文',
  DIVINE = '神兽骨文',
  TEN_FIERCE = '十凶骨文',
}

export const BONE_RUNE_GRADE_COLOR_CLASS: Record<BoneRuneGrade, string> = {
  [BoneRuneGrade.BEAST]: 'bone-rune-beast',
  [BoneRuneGrade.PURE]: 'bone-rune-pure',
  [BoneRuneGrade.DIVINE]: 'bone-rune-divine',
  [BoneRuneGrade.TEN_FIERCE]: 'bone-rune-ten-fierce',
};

export const BONE_RUNE_GRADE_STARS: Record<BoneRuneGrade, number> = {
  [BoneRuneGrade.BEAST]: 2,
  [BoneRuneGrade.PURE]: 3,
  [BoneRuneGrade.DIVINE]: 5,
  [BoneRuneGrade.TEN_FIERCE]: 7,
};

export interface IBoneRune {
  id: string;
  name: string;
  grade: BoneRuneGrade;
  source: string;
  description: string;
  originStory: string;
  requiredRealm: CultivationRealm;
  effect: {
    attackBonus?: number;
    defenseBonus?: number;
    hpBonus?: number;
    manaBonus?: number;
    speedBonus?: number;
    critBonus?: number;
    specialEffect?: string;
  };
  cost: { gold: number; materials: { id: string; amount: number }[] };
}

export const BONE_RUNES: IBoneRune[] = [
  {
    id: 'bone_rune_linghu',
    name: '灵狐幻术',
    grade: BoneRuneGrade.BEAST,
    source: '灵狐遗骨',
    description: '从灵狐遗骨中提取的骨文宝术，可制造幻象迷惑敌人。',
    originStory: '荒域灵狐擅长幻术，其遗骨蕴含幻术宝文。石昊曾以灵狐骨文刻录装备，获得初期的幻术能力。',
    requiredRealm: CultivationRealm.BLOOD_MOVING,
    effect: { speedBonus: 8, critBonus: 0.05, specialEffect: '攻击时3%概率释放幻术，降低敌人命中率' },
    cost: { gold: 200, materials: [{ id: 'beast_bone', amount: 2 }] },
  },
  {
    id: 'bone_rune_leishou',
    name: '雷兽之力',
    grade: BoneRuneGrade.BEAST,
    source: '雷兽遗骨',
    description: '从雷兽遗骨中提取的骨文宝术，蕴含雷电之力。',
    originStory: '雷兽是荒域常见凶兽，其遗骨蕴含雷电宝文。刻录后可获得雷属性攻击能力。',
    requiredRealm: CultivationRealm.BLOOD_MOVING,
    effect: { attackBonus: 15, specialEffect: '攻击时5%概率释放雷击，造成额外伤害' },
    cost: { gold: 300, materials: [{ id: 'beast_bone', amount: 3 }] },
  },
  {
    id: 'bone_rune_jiaolong',
    name: '蛟龙之力',
    grade: BoneRuneGrade.PURE,
    source: '蛟龙遗骨',
    description: '从蛟龙遗骨中提取的纯血骨文宝术，蕴含蛟龙之力。',
    originStory: '蛟龙拥有龙族血脉，其遗骨蕴含纯血宝文。石昊在百断山曾获得蛟龙遗骨，刻录后实力大增。',
    requiredRealm: CultivationRealm.CAVE,
    effect: { attackBonus: 30, defenseBonus: 15, hpBonus: 100, specialEffect: '攻击时8%概率释放龙息' },
    cost: { gold: 1000, materials: [{ id: 'dragon_bone', amount: 1 }, { id: 'beast_bone', amount: 5 }] },
  },
  {
    id: 'bone_rune_zhenhuang',
    name: '真凰涅槃',
    grade: BoneRuneGrade.DIVINE,
    source: '真凰遗骨',
    description: '从真凰遗骨中提取的神兽骨文宝术，蕴含涅槃重生之力。',
    originStory: '真凰是传说中的神兽，其遗骨蕴含涅槃宝文。据说刻录此骨文后，可在垂死之际涅槃重生。',
    requiredRealm: CultivationRealm.SPIRIT,
    effect: { hpBonus: 300, defenseBonus: 30, specialEffect: '受到致命伤害时10%概率涅槃，恢复30%气血' },
    cost: { gold: 5000, materials: [{ id: 'phoenix_bone', amount: 1 }, { id: 'spirit_crystal', amount: 3 }] },
  },
  {
    id: 'bone_rune_zhenlong',
    name: '真龙之威',
    grade: BoneRuneGrade.DIVINE,
    source: '真龙遗骨',
    description: '从真龙遗骨中提取的神兽骨文宝术，蕴含真龙之威。',
    originStory: '真龙是万兽之尊，其遗骨蕴含真龙宝文。刻录后可获得真龙之威，攻击力暴涨。',
    requiredRealm: CultivationRealm.SPIRIT,
    effect: { attackBonus: 60, hpBonus: 200, critBonus: 0.1, specialEffect: '攻击时10%概率释放龙威，震慑敌人' },
    cost: { gold: 5000, materials: [{ id: 'dragon_bone', amount: 3 }, { id: 'spirit_crystal', amount: 3 }] },
  },
  {
    id: 'bone_rune_kunpeng',
    name: '鲲鹏宝术',
    grade: BoneRuneGrade.TEN_FIERCE,
    source: '鲲鹏遗骨',
    description: '从十凶之一鲲鹏遗骨中提取的骨文宝术，速度与力量并存。',
    originStory: '鲲鹏是十凶之一，速度冠绝天下，力量足以撕裂虚空。石昊在鲲鹏巢穴获得鲲鹏宝术，成为其最强底牌之一。',
    requiredRealm: CultivationRealm.ARRAY,
    effect: { attackBonus: 80, speedBonus: 30, critBonus: 0.15, specialEffect: '攻击时15%概率释放鲲鹏击，造成2倍伤害' },
    cost: { gold: 20000, materials: [{ id: 'kunpeng_bone', amount: 1 }, { id: 'spirit_crystal', amount: 10 }] },
  },
  {
    id: 'bone_rune_shijiao',
    name: '十角宝术',
    grade: BoneRuneGrade.TEN_FIERCE,
    source: '十角龙遗骨',
    description: '从十凶之一十角龙遗骨中提取的骨文宝术，防御无双。',
    originStory: '十角龙是十凶之一，肉身防御冠绝天下。其遗骨蕴含的宝文可让装备获得近乎无敌的防御力。',
    requiredRealm: CultivationRealm.ARRAY,
    effect: { defenseBonus: 80, hpBonus: 500, specialEffect: '受到攻击时10%概率触发龙甲，减免50%伤害' },
    cost: { gold: 20000, materials: [{ id: 'shijiao_bone', amount: 1 }, { id: 'spirit_crystal', amount: 10 }] },
  },
];

export function findBoneRune(id: string): IBoneRune | undefined {
  return BONE_RUNES.find(r => r.id === id);
}

export function getBoneRunesByRealm(realm: CultivationRealm): IBoneRune[] {
  return BONE_RUNES.filter(r => r.requiredRealm <= realm);
}

// ===== 器灵觉醒系统 =====

export enum SpiritPersonality {
  BRAVE = '勇猛',
  CALM = '沉稳',
  CUNNING = '狡诈',
  BENEVOLENT = '仁慈',
  FIERCE = '暴烈',
  MYSTERIOUS = '神秘',
}

export const SPIRIT_PERSONALITY_COLOR_CLASS: Record<SpiritPersonality, string> = {
  [SpiritPersonality.BRAVE]: 'spirit-brave',
  [SpiritPersonality.CALM]: 'spirit-calm',
  [SpiritPersonality.CUNNING]: 'spirit-cunning',
  [SpiritPersonality.BENEVOLENT]: 'spirit-benevolent',
  [SpiritPersonality.FIERCE]: 'spirit-fierce',
  [SpiritPersonality.MYSTERIOUS]: 'spirit-mysterious',
};

export interface ISpiritType {
  personality: SpiritPersonality;
  namePrefix: string;
  description: string;
  effect: {
    attackBonus?: number;
    defenseBonus?: number;
    hpBonus?: number;
    speedBonus?: number;
    critBonus?: number;
    specialEffect: string;
  };
}

export const SPIRIT_TYPES: ISpiritType[] = [
  {
    personality: SpiritPersonality.BRAVE,
    namePrefix: '战魂',
    description: '勇猛好战的器灵，擅长冲锋陷阵，攻击时气势如虹。',
    effect: { attackBonus: 20, critBonus: 0.05, specialEffect: '攻击时10%概率释放战吼，提升主人攻击力' },
  },
  {
    personality: SpiritPersonality.CALM,
    namePrefix: '守灵',
    description: '沉稳内敛的器灵，擅长防御守护，危急时刻挺身护主。',
    effect: { defenseBonus: 20, hpBonus: 100, specialEffect: '受到致命伤害时15%概率替主人抵挡' },
  },
  {
    personality: SpiritPersonality.CUNNING,
    namePrefix: '幻灵',
    description: '狡诈多变的器灵，擅长幻术迷惑，让敌人防不胜防。',
    effect: { speedBonus: 10, critBonus: 0.08, specialEffect: '攻击时8%概率释放幻术，使敌人眩晕一回合' },
  },
  {
    personality: SpiritPersonality.BENEVOLENT,
    namePrefix: '医灵',
    description: '仁慈悲悯的器灵，擅长治愈回复，危难时救主人于水火。',
    effect: { hpBonus: 150, specialEffect: '每回合恢复主人5%气血' },
  },
  {
    personality: SpiritPersonality.FIERCE,
    namePrefix: '煞灵',
    description: '暴烈凶残的器灵，嗜血好杀，攻击时带着毁灭之力。',
    effect: { attackBonus: 35, critBonus: 0.1, specialEffect: '暴击时20%概率造成额外50%伤害' },
  },
  {
    personality: SpiritPersonality.MYSTERIOUS,
    namePrefix: '玄灵',
    description: '神秘莫测的器灵，蕴含天地玄妙之力，能力全面。',
    effect: { attackBonus: 15, defenseBonus: 15, hpBonus: 100, speedBonus: 5, specialEffect: '全属性提升5%' },
  },
];

export interface IEquipmentSpirit {
  name: string;
  personality: SpiritPersonality;
  level: number;
  exp: number;
  maxExp: number;
  effect: ISpiritType['effect'];
  awakenCount: number;
}

export function rollSpiritType(): ISpiritType {
  return SPIRIT_TYPES[Math.floor(Math.random() * SPIRIT_TYPES.length)];
}

export function generateSpiritName(prefix: string, equipmentName: string): string {
  return `${prefix}·${equipmentName.charAt(0)}`;
}

export function getSpiritLevelBonus(level: number): number {
  return 1 + (level - 1) * 0.15;
}

export function getSpiritMaxExp(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}