import { IItem, ItemType, EquipmentSlot } from '../../domain/entities/Item';
import { ZHETIAN_ITEMS } from './items_zhetian';
import { SHENGXU_ITEMS } from './items_shengxu';
import { WEAPON_ITEMS } from './items_weapons';
import { ARMOR_ARTIFACT_ITEMS } from './items_armor_artifact';
import { MATERIAL_ITEMS } from './items_materials';
import { ELIXIR_ITEMS } from './items_elixirs';
import { SPECIAL_ITEMS } from './items_special';

export const SEED_ITEMS: IItem[] = [
  // ===== 材料 =====
  {
    id: 'wolf_skin', name: '狼皮', type: ItemType.MATERIAL, quality: '凡品',
    desc: '野狼的皮毛，可用于制作皮甲。', price: 5, stackable: true, maxStack: 99, icon: '■',
  },
  {
    id: 'snake_venom', name: '蛇毒', type: ItemType.MATERIAL, quality: '凡品',
    desc: '碧磷蛇的毒液，可用于淬毒。', price: 8, stackable: true, maxStack: 99, icon: '◆',
  },
  {
    id: 'stone_core', name: '石核', type: ItemType.MATERIAL, quality: '良品',
    desc: '石巨人的核心，蕴含精纯的大地之力。', price: 15, stackable: true, maxStack: 99, icon: '●',
  },
  {
    id: 'hawk_feather', name: '风隼羽', type: ItemType.MATERIAL, quality: '凡品',
    desc: '风隼的羽毛，轻盈而锋利。', price: 3, stackable: true, maxStack: 99, icon: '♠',
  },
  {
    id: 'croc_scale', name: '鳄鳞', type: ItemType.MATERIAL, quality: '良品',
    desc: '沼泽鳄的鳞片，坚硬无比。', price: 12, stackable: true, maxStack: 99, icon: '▲',
  },
  {
    id: 'soul_fragment', name: '魂之碎片', type: ItemType.MATERIAL, quality: '珍品',
    desc: '游魂消散后留下的灵魂碎片，蕴含神秘力量。', price: 25, stackable: true, maxStack: 99, icon: '◇',
  },
  {
    id: 'fox_spirit_orb', name: '灵狐丹', type: ItemType.MATERIAL, quality: '良品',
    desc: '灵狐的内丹，可用于炼制丹药。', price: 20, stackable: true, maxStack: 99, icon: '○',
  },
  {
    id: 'spirit_herb', name: '灵草', type: ItemType.MATERIAL, quality: '凡品',
    desc: '蕴含灵气的药草，是炼丹的基础材料。', price: 5, stackable: true, maxStack: 99, icon: '¶',
  },
  {
    id: 'iron_ore', name: '铁矿石', type: ItemType.MATERIAL, quality: '凡品',
    desc: '普通的铁矿石，可用于锻造。', price: 3, stackable: true, maxStack: 99, icon: '♦',
  },
  {
    id: 'spirit_crystal', name: '灵石', type: ItemType.MATERIAL, quality: '良品',
    desc: '蕴含精纯灵气的晶石，可用于修炼和布阵。', price: 30, stackable: true, maxStack: 99, icon: '★',
  },
  {
    id: 'ancient_bone', name: '古兽骨', type: ItemType.MATERIAL, quality: '珍品',
    desc: '上古凶兽的遗骨，上面刻有天然的道纹。', price: 50, stackable: true, maxStack: 99, icon: '†',
  },

  // ===== 丹药材料 =====
  {
    id: 'xuelinghua', name: '血灵花', type: ItemType.MATERIAL, quality: '良品',
    desc: '蕴含精血之力的灵花，呈血红色。', price: 15, stackable: true, maxStack: 99, icon: '❀',
  },
  {
    id: 'ningxiangcao', name: '凝神草', type: ItemType.MATERIAL, quality: '良品',
    desc: '可凝神静气的灵草，散发淡淡的清香。', price: 12, stackable: true, maxStack: 99, icon: '✿',
  },
  {
    id: 'moon_grass', name: '月光草', type: ItemType.MATERIAL, quality: '珍品',
    desc: '吸收月华精华生长的灵草，只在夜间发光。', price: 30, stackable: true, maxStack: 99, icon: '☽',
  },
  {
    id: 'dragon_saliva', name: '龙涎草', type: ItemType.MATERIAL, quality: '珍品',
    desc: '生长于龙穴附近的灵草，沾染了龙气。', price: 50, stackable: true, maxStack: 99, icon: '🐲',
  },
  {
    id: 'lingcao', name: '灵草', type: ItemType.MATERIAL, quality: '凡品',
    desc: '蕴含灵气的药草，是炼丹的基础材料。', price: 5, stackable: true, maxStack: 99, icon: '¶',
  },
  {
    id: 'spirit_crystal', name: '灵石', type: ItemType.MATERIAL, quality: '良品',
    desc: '蕴含精纯灵气的晶石，可用于修炼和布阵。', price: 30, stackable: true, maxStack: 99, icon: '★',
  },
  {
    id: 'failed_pill', name: '废丹', type: ItemType.MATERIAL, quality: '凡品',
    desc: '炼丹失败产生的残渣，可作为低级材料。', price: 2, stackable: true, maxStack: 99, icon: '⚫',
  },
  {
    id: 'fox_blood', name: '狐血', type: ItemType.MATERIAL, quality: '良品',
    desc: '灵狐的精血，是炼制精血丹的重要材料。', price: 15, stackable: true, maxStack: 99, icon: '🩸',
  },
  {
    id: 'beast_bone', name: '兽骨', type: ItemType.MATERIAL, quality: '良品',
    desc: '凶兽的遗骨，可用于锻造和灵兽进化。', price: 10, stackable: true, maxStack: 99, icon: '†',
  },
  {
    id: 'dragon_bone', name: '龙骨', type: ItemType.MATERIAL, quality: '神品',
    desc: '神龙的遗骨，蕴含龙威，极为珍贵。', price: 100, stackable: true, maxStack: 99, icon: '🦴',
  },
  {
    id: 'spirit_fruit', name: '灵果', type: ItemType.MATERIAL, quality: '良品',
    desc: '蕴含灵气的果实，口感甘甜。', price: 8, stackable: true, maxStack: 99, icon: '🍎',
  },
  {
    id: 'holy_grass', name: '圣药', type: ItemType.MATERIAL, quality: '神品',
    desc: '传说中的圣药，生长于圣山之巅。', price: 500, stackable: true, maxStack: 99, icon: '✦',
  },
  {
    id: 'divine_herb', name: '神药', type: ItemType.MATERIAL, quality: '仙品',
    desc: '神界流传下来的神药，药效逆天。', price: 1000, stackable: true, maxStack: 99, icon: '🌟',
  },
  {
    id: 'immortal_herb', name: '仙药', type: ItemType.MATERIAL, quality: '仙品',
    desc: '仙界的仙草，可令人脱胎换骨。', price: 2000, stackable: true, maxStack: 99, icon: '🌸',
  },
  {
    id: 'shenmu_zhihua', name: '神木之花', type: ItemType.MATERIAL, quality: '神品',
    desc: '神树绽放的花朵，蕴含生命之力。', price: 800, stackable: true, maxStack: 99, icon: '🌺',
  },
  {
    id: 'tianming_pearl', name: '天命珠', type: ItemType.MATERIAL, quality: '仙品',
    desc: '蕴含命运之力的宝珠，极为稀有。', price: 3000, stackable: true, maxStack: 99, icon: '💫',
  },
  {
    id: 'jiuyou_yinhuo', name: '九幽阴火', type: ItemType.MATERIAL, quality: '神品',
    desc: '来自九幽之地的阴火，可熔化万物。', price: 1200, stackable: true, maxStack: 99, icon: '🔥',
  },
  {
    id: 'chaos_crystal', name: '混沌晶石', type: ItemType.MATERIAL, quality: '仙品',
    desc: '蕴含混沌之力的晶石，可用于铸造神器。', price: 2500, stackable: true, maxStack: 99, icon: '🌀',
  },

  // ===== 灵草种子 =====
  {
    id: 'seed_lingcao', name: '灵草种子', type: ItemType.MATERIAL, quality: '凡品',
    desc: '可种植出灵草的种子。', price: 10, stackable: true, maxStack: 99, icon: '🌰',
  },
  {
    id: 'seed_xuelinghua', name: '血灵花种子', type: ItemType.MATERIAL, quality: '良品',
    desc: '可种植出血灵花的种子。', price: 25, stackable: true, maxStack: 99, icon: '🌰',
  },
  {
    id: 'seed_ningxiangcao', name: '凝神草种子', type: ItemType.MATERIAL, quality: '良品',
    desc: '可种植出凝神草的种子。', price: 20, stackable: true, maxStack: 99, icon: '🌰',
  },
  {
    id: 'seed_moon_grass', name: '月光草种子', type: ItemType.MATERIAL, quality: '珍品',
    desc: '可种植出月光草的种子，需要月光滋养。', price: 50, stackable: true, maxStack: 99, icon: '🌰',
  },
  {
    id: 'seed_dragon_saliva', name: '龙涎草种子', type: ItemType.MATERIAL, quality: '珍品',
    desc: '可种植出龙涎草的种子，极为珍贵。', price: 80, stackable: true, maxStack: 99, icon: '🌰',
  },
  {
    id: 'seed_shenmu_zhihua', name: '神木之花种子', type: ItemType.MATERIAL, quality: '神品',
    desc: '可种植出神木之花的神级种子。', price: 500, stackable: true, maxStack: 99, icon: '🌰',
  },

  // ===== 丹药 =====
  {
    id: 'heal_potion', name: '疗伤丹', type: ItemType.ELIXIR, quality: '凡品',
    desc: '基础疗伤丹药，可恢复少量气血。', price: 15, stackable: true, maxStack: 20, icon: '◎',
    effect: { type: 'heal', value: 50 },
  },
  {
    id: 'mana_potion', name: '灵力丹', type: ItemType.ELIXIR, quality: '凡品',
    desc: '基础灵力丹药，可恢复少量灵力。', price: 15, stackable: true, maxStack: 20, icon: '◎',
    effect: { type: 'mana', value: 30 },
  },
  {
    id: 'exp_pill', name: '聚气丹', type: ItemType.ELIXIR, quality: '凡品',
    desc: '可加速修炼的丹药，增加修为。', price: 30, stackable: true, maxStack: 10, icon: '◉',
    effect: { type: 'cultivation', value: 100 },
  },
  {
    id: 'blood_pill', name: '精血丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '以灵狐之血炼制的丹药，可增强气血。', price: 45, stackable: true, maxStack: 10, icon: '🧪',
    effect: { type: 'cultivation', value: 200 },
  },
  {
    id: 'ningyuan_pill', name: '凝元丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '化灵境修士常用的修炼丹药，可大幅提升修为。', price: 200, stackable: true, maxStack: 10, icon: '◉',
    effect: { type: 'cultivation', value: 500 },
  },
  {
    id: 'baoyuan_pill', name: '宝元丹', type: ItemType.ELIXIR, quality: '极品',
    desc: '宝级丹药，宝辉流转，药力精纯。', price: 500, stackable: true, maxStack: 5, icon: '◆',
    effect: { type: 'cultivation', value: 1500 },
  },
  {
    id: 'shenyuan_pill', name: '神元丹', type: ItemType.ELIXIR, quality: '神品',
    desc: '神级丹药，蕴含庞大的神力。', price: 1500, stackable: true, maxStack: 3, icon: '★',
    effect: { type: 'cultivation', value: 3000 },
  },
  {
    id: 'xianyuan_pill', name: '仙元丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '仙级丹药，仙药所化，可遇而不可求。', price: 5000, stackable: true, maxStack: 2, icon: '✨',
    effect: { type: 'cultivation', value: 5000 },
  },
  {
    id: 'diyuan_pill', name: '帝元丹', type: ItemType.ELIXIR, quality: '仙品',
    desc: '帝级丹药，不死药炼制，一枚可换一片天。', price: 20000, stackable: true, maxStack: 1, icon: '👑',
    effect: { type: 'cultivation', value: 10000 },
  },
  {
    id: 'fuyuan_pill', name: '复元丹', type: ItemType.ELIXIR, quality: '珍品',
    desc: '可恢复大量气血和灵力的高级丹药。', price: 150, stackable: true, maxStack: 10, icon: '◎',
    effect: { type: 'heal', value: 300 },
  },
  {
    id: 'gongji_pill', name: '攻击丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '临时提升攻击力的丹药。', price: 80, stackable: true, maxStack: 10, icon: '⚔',
    effect: { type: 'attack', value: 20 },
  },
  {
    id: 'fangyu_pill', name: '防御丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '临时提升防御力的丹药。', price: 80, stackable: true, maxStack: 10, icon: '🛡',
    effect: { type: 'defense', value: 20 },
  },

  // ===== 装备 =====
  {
    id: 'iron_sword', name: '粗铁剑', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '一柄粗糙的铁剑，勉强可用。', price: 20, stackable: false, maxStack: 1, icon: '⚔',
    slot: EquipmentSlot.WEAPON, stats: { attack: 5 },
  },
  {
    id: 'leather_armor', name: '兽皮甲', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '用兽皮缝制的简易护甲。', price: 18, stackable: false, maxStack: 1, icon: '🛡',
    slot: EquipmentSlot.ARMOR, stats: { defense: 3 },
  },
  {
    id: 'cloth_boots', name: '布靴', type: ItemType.EQUIPMENT, quality: '凡品',
    desc: '普通的布制靴子，轻便舒适。', price: 12, stackable: false, maxStack: 1, icon: '👢',
    slot: EquipmentSlot.BOOTS, stats: { speed: 2 },
  },
  {
    id: 'bone_sword', name: '骨刃', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '用古兽骨打磨而成的利刃，锋利无比。', price: 45, stackable: false, maxStack: 1, icon: '⚔',
    slot: EquipmentSlot.WEAPON, stats: { attack: 12, speed: 1 },
  },
  {
    id: 'scale_armor', name: '鳄鳞甲', type: ItemType.EQUIPMENT, quality: '良品',
    desc: '用沼泽鳄鳞片制成的护甲，防御力出色。', price: 40, stackable: false, maxStack: 1, icon: '🛡',
    slot: EquipmentSlot.ARMOR, stats: { defense: 8, hp: 10 },
  },
  {
    id: 'spirit_sword', name: '灵剑', type: ItemType.EQUIPMENT, quality: '珍品',
    desc: '蕴含灵气的灵剑，威力远超凡铁。', price: 200, stackable: false, maxStack: 1, icon: '⚔',
    slot: EquipmentSlot.WEAPON, stats: { attack: 25, mana: 20 },
    runeSlots: 2,
  },
  {
    id: 'dragon_armor', name: '龙骨甲', type: ItemType.EQUIPMENT, quality: '神品',
    desc: '以真龙之骨锻造的神级护甲，防御力逆天。', price: 2000, stackable: false, maxStack: 1, icon: '🛡',
    slot: EquipmentSlot.ARMOR, stats: { defense: 80, hp: 200 },
    runeSlots: 3,
  },
  {
    id: 'chaos_blade', name: '混沌之刃', type: ItemType.EQUIPMENT, quality: '仙品',
    desc: '蕴含混沌之力的神器，可斩断一切。', price: 5000, stackable: false, maxStack: 1, icon: '⚔',
    slot: EquipmentSlot.WEAPON, stats: { attack: 150, speed: 10, crit: 20 },
    runeSlots: 4,
  },
  {
    id: 'gold_coin', name: '原始币', type: ItemType.MATERIAL, quality: '良品',
    desc: '荒域通用货币，蕴含着淡淡的灵气。', price: 1, stackable: true, maxStack: 999, icon: '🪙',
  },
  {
    id: 'blood_pill', name: '精血丹', type: ItemType.ELIXIR, quality: '良品',
    desc: '用灵狐精血炼制的丹药，可提升修为。', price: 30, stackable: true, maxStack: 99, icon: '🧪',
  },
  {
    id: 'fox_blood', name: '狐血', type: ItemType.MATERIAL, quality: '良品',
    desc: '灵狐的精血，是炼制精血丹的重要材料。', price: 15, stackable: true, maxStack: 99, icon: '🩸',
  },
  {
    id: 'baoshu_fragment_zhenlong', name: '真龙宝术残篇', type: ItemType.MATERIAL, quality: '珍品',
    desc: '记载着真龙宝术部分内容的残篇，收集10片可合成完整宝术。', price: 100, stackable: true, maxStack: 99, icon: '📜',
  },
  {
    id: 'baoshu_fragment_qingluan', name: '青鸾宝术残篇', type: ItemType.MATERIAL, quality: '珍品',
    desc: '记载着青鸾宝术部分内容的残篇，收集10片可合成完整宝术。', price: 100, stackable: true, maxStack: 99, icon: '📜',
  },
  {
    id: 'baoshu_fragment_taotie', name: '饕餮宝术残篇', type: ItemType.MATERIAL, quality: '珍品',
    desc: '记载着饕餮宝术部分内容的残篇，收集10片可合成完整宝术。', price: 100, stackable: true, maxStack: 99, icon: '📜',
  },
  {
    id: 'baoshu_fragment_liushen', name: '柳神法残篇', type: ItemType.MATERIAL, quality: '神品',
    desc: '记载着柳神法部分内容的残篇，收集15片可合成完整宝术。', price: 300, stackable: true, maxStack: 99, icon: '📜',
  },
  {
    id: 'baoshu_fragment_huangdi', name: '荒帝宝术残篇', type: ItemType.MATERIAL, quality: '神品',
    desc: '记载着荒帝宝术部分内容的残篇，收集20片可合成完整宝术。', price: 500, stackable: true, maxStack: 99, icon: '📜',
  },
  {
    id: 'law_essence_time', name: '时间法则感悟', type: ItemType.MATERIAL, quality: '神品',
    desc: '对时间法则的一丝感悟，积累足够可领悟时间法则。', price: 400, stackable: true, maxStack: 99, icon: '⏳',
  },
  {
    id: 'law_essence_destiny', name: '命运法则感悟', type: ItemType.MATERIAL, quality: '神品',
    desc: '对命运法则的一丝感悟，积累足够可领悟命运法则。', price: 500, stackable: true, maxStack: 99, icon: '⚖',
  },
  {
    id: 'talent_fragment', name: '天赋碎片', type: ItemType.MATERIAL, quality: '珍品',
    desc: '蕴含天赋之力的碎片，可用于强化已有的天赋。', price: 150, stackable: true, maxStack: 99, icon: '✨',
  },

  // ===== 隐藏支线线索道具 =====
  {
    id: 'clue_jade_pendant', name: '残破的玉佩', type: ItemType.MATERIAL, quality: '珍品',
    desc: '一枚残破的玉佩，刻有"柳"字，背面有"持此佩者，可入火皇宫"的小字。似乎是某位护卫的信物。', price: 0, stackable: false, maxStack: 1, icon: '◈',
  },
  {
    id: 'clue_battlefield_relic', name: '古战场遗物', type: ItemType.MATERIAL, quality: '极品',
    desc: '从蛮荒古战场收集的遗物，包含断剑、残旗、将印三件。将印上刻有"柳"字，散发着微弱的灵光。', price: 0, stackable: false, maxStack: 1, icon: '⚔',
  },
  {
    id: 'clue_ancient_rune', name: '太古符文碎片', type: ItemType.MATERIAL, quality: '仙品',
    desc: '从不老山石碑上解读的太古符文碎片，记载着四象之证的藏匿之处。蕴含远古智慧。', price: 0, stackable: false, maxStack: 1, icon: '✦',
  },
  {
    id: 'clue_ant_armor', name: '蚁后遗甲', type: ItemType.MATERIAL, quality: '极品',
    desc: '数片天角蚁后的甲壳，拼合后形成一幅地图，指向百断山深处的宝藏所在。', price: 0, stackable: false, maxStack: 1, icon: '◆',
  },
  ...ZHETIAN_ITEMS,
  ...SHENGXU_ITEMS,
  ...WEAPON_ITEMS,
  ...ARMOR_ARTIFACT_ITEMS,
  ...MATERIAL_ITEMS,
  ...ELIXIR_ITEMS,
  ...SPECIAL_ITEMS,
];

export const SEED_ITEMS_MAP: Map<string, IItem> = new Map(SEED_ITEMS.map(item => [item.id, item]));

export function getItemById(id: string): IItem | undefined {
  return SEED_ITEMS_MAP.get(id);
}

export function getItemByIdOrThrow(id: string): IItem {
  const item = SEED_ITEMS_MAP.get(id);
  if (!item) throw new Error(`Item not found: ${id}`);
  return item;
}