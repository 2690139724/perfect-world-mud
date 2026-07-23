// ===== 天赋系统（统一） =====

export type TalentRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'myth';
export type TalentType = 'innate' | 'physique' | 'soul' | 'bloodline' | 'special';

export interface ITalent {
  id: string;
  name: string;
  description: string;
  type: TalentType;
  rarity: TalentRarity;
  effects: { stat: string; value: number; description: string }[];
  originStory?: string;
  requiredRealm?: number;
  awakenCondition?: string;
  isAwakened?: boolean;
  stealable?: boolean;  // 是否可被抢夺
}

// ===== 天赋注册表 =====
export const talentRegistry = new Map<string, ITalent>();

function registerTalent(talent: ITalent): void {
  talentRegistry.set(talent.id, talent);
}

export function getAllTalents(): ITalent[] {
  return Array.from(talentRegistry.values());
}

export function getTalent(id: string): ITalent | undefined {
  return talentRegistry.get(id);
}

export function getRandomTalents(count: number): ITalent[] {
  const allTalents = getAllTalents();
  const shuffled = [...allTalents].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getTalentEffects(talentIds: string[]): Record<string, number> {
  const merged: Record<string, number> = {};
  for (const id of talentIds) {
    const talent = talentRegistry.get(id);
    if (!talent) continue;
    for (const effect of talent.effects) {
      const key = effect.stat;
      merged[key] = (merged[key] || 0) + effect.value;
    }
  }
  return merged;
}

// ===== 天赋注册 =====

// 天生神力 (rare / innate)
registerTalent({
  id: 'innate_strength',
  name: '天生神力',
  description: '天生神力，远超常人，力能扛鼎。',
  type: 'innate',
  effects: [
    { stat: 'attack', value: 15, description: '攻击+15%' },
  ],
  rarity: 'rare',
});

// 至尊骨 (legendary / physique)
registerTalent({
  id: 'supreme_bone',
  name: '至尊骨',
  description: '体内生有至尊骨，拥有无上潜能，可领悟至尊术。',
  type: 'physique',
  effects: [
    { stat: 'attack', value: 30, description: '攻击+30%' },
    { stat: 'special', value: 0, description: '自带至尊术' },
  ],
  rarity: 'legendary',
  stealable: true,
});

// 重瞳 (legendary / physique)
registerTalent({
  id: 'double_pupils',
  name: '重瞳',
  description: '天生重瞳，可看破虚妄，洞察万物弱点。',
  type: 'physique',
  effects: [
    { stat: 'critRate', value: 10, description: '暴击率+10%' },
    { stat: 'special', value: 0, description: '看破弱点' },
  ],
  rarity: 'legendary',
  stealable: true,
});

// 轮回之体 (legendary / physique)
registerTalent({
  id: 'reincarnation_body',
  name: '轮回之体',
  description: '轮回不灭，转世后可保留前世修为与记忆。',
  type: 'physique',
  effects: [
    { stat: 'reincarnationRetain', value: 50, description: '转世保留50%修为' },
  ],
  rarity: 'legendary',
  stealable: true,
});

// 先天道胎 (legendary / physique)
registerTalent({
  id: 'innate_dao_fetus',
  name: '先天道胎',
  description: '天生亲近大道，修炼速度远超常人。',
  type: 'physique',
  effects: [
    { stat: 'cultivationSpeed', value: 30, description: '修炼速度+30%' },
  ],
  rarity: 'legendary',
  stealable: true,
});

// 万法不侵 (rare / physique)
registerTalent({
  id: 'immune_to_myriad',
  name: '万法不侵',
  description: '体质特殊，对法术攻击有极强的抗性。',
  type: 'physique',
  effects: [
    { stat: 'defense', value: 20, description: '防御+20%' },
  ],
  rarity: 'rare',
});

// 雷电法体 (rare / physique)
registerTalent({
  id: 'thunder_body',
  name: '雷电法体',
  description: '身蕴雷电之力，速度与爆发力惊人。',
  type: 'physique',
  effects: [
    { stat: 'speed', value: 15, description: '速度+15%' },
  ],
  rarity: 'rare',
});

// 火焰灵体 (rare / physique)
registerTalent({
  id: 'flame_spirit_body',
  name: '火焰灵体',
  description: '火属性亲和力极高，攻击附带火焰之力。',
  type: 'physique',
  effects: [
    { stat: 'attack', value: 10, description: '攻击+10%' },
  ],
  rarity: 'rare',
});

// 太阴之体 (rare / physique)
registerTalent({
  id: 'taiyin_body',
  name: '太阴之体',
  description: '太阴之力充盈，法力浩瀚如海。',
  type: 'physique',
  effects: [
    { stat: 'maxMana', value: 25, description: '法力上限+25%' },
  ],
  rarity: 'rare',
});

// 太阳之体 (rare / physique)
registerTalent({
  id: 'taiyang_body',
  name: '太阳之体',
  description: '太阳之力加身，气血旺盛如烘炉。',
  type: 'physique',
  effects: [
    { stat: 'maxHp', value: 25, description: '气血上限+25%' },
  ],
  rarity: 'rare',
});

// 不灭金身 (legendary / physique)
registerTalent({
  id: 'indestructible_golden_body',
  name: '不灭金身',
  description: '肉身如金刚不坏，气血磅礴，防御惊人。',
  type: 'physique',
  effects: [
    { stat: 'maxHp', value: 40, description: '气血+40%' },
    { stat: 'defense', value: 10, description: '防御+10%' },
  ],
  rarity: 'legendary',
});

// 风灵体 (common / physique)
registerTalent({
  id: 'wind_spirit_body',
  name: '风灵体',
  description: '身轻如风，速度极快，来去如电。',
  type: 'physique',
  effects: [
    { stat: 'speed', value: 25, description: '速度+25%' },
  ],
  rarity: 'common',
});

// 星辰之体 (rare / physique)
registerTalent({
  id: 'star_body',
  name: '星辰之体',
  description: '引星辰之力淬体，灵气吸收速度极快。',
  type: 'physique',
  effects: [
    { stat: 'spiritAbsorption', value: 30, description: '灵气吸收+30%' },
  ],
  rarity: 'rare',
});

// 虚空之体 (rare / physique)
registerTalent({
  id: 'void_body',
  name: '虚空之体',
  description: '身融虚空，身形飘忽不定，极难被击中。',
  type: 'physique',
  effects: [
    { stat: 'dodge', value: 15, description: '闪避+15%' },
  ],
  rarity: 'rare',
});

// 神之视 (rare / soul)
registerTalent({
  id: 'god_sight',
  name: '神之视',
  description: '神魂强大，洞察力超凡，悟性远胜常人。',
  type: 'soul',
  effects: [
    { stat: 'insight', value: 20, description: '悟性+20%' },
  ],
  rarity: 'rare',
});

// ===== 新增小说天赋 =====

// 狻猊宝术传承 (rare / soul)
registerTalent({
  id: 'suanni_heritage',
  name: '狻猊传承',
  description: '体内流淌着狻猊遗种的血脉，施展雷电类宝术威力倍增。',
  type: 'soul',
  effects: [
    { stat: 'attack', value: 8, description: '攻击+8%' },
  ],
  rarity: 'rare',
});

// 原始真解领悟 (rare / soul)
registerTalent({
  id: 'primordial_insight',
  name: '原始悟性',
  description: '对原始真解有天然领悟力，修炼任何功法都事半功倍。',
  type: 'soul',
  effects: [
    { stat: 'cultivationSpeed', value: 15, description: '修炼速度+15%' },
  ],
  rarity: 'rare',
});

// 补天阁传承 (rare / soul)
registerTalent({
  id: 'butian_heritage',
  name: '补天遗泽',
  description: '得到补天阁的远古传承，修复伤势速度翻倍。',
  type: 'soul',
  effects: [
    { stat: 'healRate', value: 30, description: '恢复速度+30%' },
  ],
  rarity: 'rare',
});

// 十凶血脉 (legendary / physique)
registerTalent({
  id: 'ten_ferocious_blood',
  name: '十凶血脉',
  description: '体内流淌着十凶之一的血脉，修炼速度与战力都远超常人。',
  type: 'physique',
  effects: [
    { stat: 'attack', value: 20, description: '攻击+20%' },
    { stat: 'cultivationSpeed', value: 20, description: '修炼速度+20%' },
  ],
  rarity: 'legendary',
  stealable: true,
});

// 天眼通 (rare / soul)
registerTalent({
  id: 'heavenly_eye',
  name: '天眼通',
  description: '额头生有天眼，可洞察一切虚妄，看破敌人的弱点。',
  type: 'soul',
  effects: [
    { stat: 'critRate', value: 8, description: '暴击率+8%' },
  ],
  rarity: 'rare',
});

// 万古长青体 (legendary / physique)
registerTalent({
  id: 'evergreen_body',
  name: '万古长青体',
  description: '生命力极其旺盛，气血恢复速度极快，堪称不死之身。',
  type: 'physique',
  effects: [
    { stat: 'maxHp', value: 35, description: '气血上限+35%' },
    { stat: 'healRate', value: 50, description: '恢复速度+50%' },
  ],
  rarity: 'legendary',
});

// 混沌体 (legendary / physique)
registerTalent({
  id: 'chaos_body',
  name: '混沌体',
  description: '天地初开时的混沌体质，万法不侵，修炼速度无双。',
  type: 'physique',
  effects: [
    { stat: 'cultivationSpeed', value: 50, description: '修炼速度+50%' },
    { stat: 'defense', value: 15, description: '防御+15%' },
  ],
  rarity: 'legendary',
  stealable: true,
});

// 神蚕体 (common / physique)
registerTalent({
  id: 'divine_silkworm',
  name: '神蚕体',
  description: '体质如神蚕，每次突破后可涅槃蜕变，实力大幅提升。',
  type: 'physique',
  effects: [
    { stat: 'maxHp', value: 15, description: '气血上限+15%' },
  ],
  rarity: 'common',
});

// 灵瞳 (common / soul)
registerTalent({
  id: 'spirit_eye',
  name: '灵瞳',
  description: '双目生有灵光，可看见天地灵气的流动。',
  type: 'soul',
  effects: [
    { stat: 'spiritAbsorption', value: 10, description: '灵气吸收+10%' },
  ],
  rarity: 'common',
});

// 天纵之资 (legendary / innate)
registerTalent({
  id: 'heavenly_gift',
  name: '天纵之资',
  description: '天生修炼奇才，所有属性都有不俗的加成。',
  type: 'innate',
  effects: [
    { stat: 'cultivationSpeed', value: 25, description: '修炼速度+25%' },
    { stat: 'attack', value: 10, description: '攻击+10%' },
    { stat: 'defense', value: 5, description: '防御+5%' },
  ],
  rarity: 'legendary',
});

// 不灭之魂 (rare / soul)
registerTalent({
  id: 'indestructible_soul',
  name: '不灭之魂',
  description: '神魂坚不可摧，转世重修时能保留更多修为。',
  type: 'soul',
  effects: [
    { stat: 'reincarnationRetain', value: 30, description: '转世保留30%修为' },
  ],
  rarity: 'rare',
});

// ===== 迁移自 Talent.ts 的觉醒天赋 =====

// 先天圣体道胎 (myth / physique) - 可被抢夺
registerTalent({
  id: 'talent_shengti_daoji',
  name: '先天圣体道胎',
  description: '万古无一的至强体质，天生亲近大道，修炼速度极快。',
  type: 'physique',
  rarity: 'myth',
  effects: [
    { stat: 'cultivationSpeed', value: 200, description: '修炼速度+200%' },
    { stat: 'insight', value: 150, description: '悟性+150%' },
    { stat: 'attack', value: 10, description: '攻击+10%' },
    { stat: 'maxHp', value: 50, description: '气血+50%' },
  ],
  originStory: '先天圣体道胎是传说中的至强体质，拥有者天生与大道共鸣，修炼一日千里。石昊虽非天生此体，但凭借机缘最终成就无上帝位。',
  requiredRealm: 0,
  awakenCondition: '出生时即觉醒',
  isAwakened: false,
  stealable: true,
});

// 苍天霸体 (legendary / physique) - 可被抢夺
registerTalent({
  id: 'talent_ba_ti',
  name: '苍天霸体',
  description: '霸道无边的体质，压制同阶，战力惊人。',
  type: 'physique',
  rarity: 'legendary',
  effects: [
    { stat: 'attack', value: 15, description: '攻击+15%' },
    { stat: 'defense', value: 10, description: '防御+10%' },
    { stat: 'maxHp', value: 30, description: '气血+30%' },
    { stat: 'critRate', value: 5, description: '暴击率+5%' },
  ],
  originStory: '苍天霸体是上古霸体一族的传承体质，拥有者天生神力，可压制同阶修士。在小说中是极为强横的体质之一。',
  requiredRealm: 0,
  awakenCondition: '出生时即觉醒',
  isAwakened: false,
  stealable: true,
});

// 荒天体 (legendary / physique)
registerTalent({
  id: 'talent_huang_ti',
  name: '荒天体',
  description: '石昊所拥有的特殊体质，坚韧不拔，越战越强。',
  type: 'physique',
  rarity: 'legendary',
  effects: [
    { stat: 'attack', value: 8, description: '攻击+8%' },
    { stat: 'defense', value: 8, description: '防御+8%' },
    { stat: 'maxHp', value: 40, description: '气血+40%' },
    { stat: 'cultivationSpeed', value: 50, description: '修炼速度+50%' },
  ],
  originStory: '荒天体并非天生体质，而是石昊在无数战斗中磨砺出来的特殊体质。拥有者越战越强，永不言败。',
  requiredRealm: 1,
  awakenCondition: '经历十场战斗后觉醒',
  isAwakened: false,
});

// 不灭体 (epic / physique)
registerTalent({
  id: 'talent_bu_mie',
  name: '不灭体',
  description: '生命力极强，恢复速度惊人，难以被杀死。',
  type: 'physique',
  rarity: 'epic',
  effects: [
    { stat: 'maxHp', value: 60, description: '气血+60%' },
    { stat: 'defense', value: 5, description: '防御+5%' },
  ],
  originStory: '不灭体是修炼到极致后的特殊体质，拥有者生命力极其顽强，即使重伤也能快速恢复。',
  requiredRealm: 2,
  awakenCondition: '气血降至10%以下后存活觉醒',
  isAwakened: false,
});

// 真龙血脉 (myth / bloodline) - 可被抢夺
registerTalent({
  id: 'talent_long_xue',
  name: '真龙血脉',
  description: '蕴含真龙之血，拥有龙族的力量和威压。',
  type: 'bloodline',
  rarity: 'myth',
  effects: [
    { stat: 'attack', value: 20, description: '攻击+20%' },
    { stat: 'maxHp', value: 50, description: '气血+50%' },
    { stat: 'critRate', value: 10, description: '暴击率+10%' },
    { stat: 'insight', value: 50, description: '悟性+50%' },
  ],
  originStory: '真龙血脉是太古十凶之一真龙的血脉传承，拥有者可获得真龙的部分力量。小说中石昊曾获得真龙血淬炼肉身。',
  requiredRealm: 3,
  awakenCondition: '服用真龙血后觉醒',
  isAwakened: false,
  stealable: true,
});

// 鲲鹏血脉 (myth / bloodline) - 可被抢夺
registerTalent({
  id: 'talent_kunpeng_xue',
  name: '鲲鹏血脉',
  description: '蕴含鲲鹏之血，拥有极速和变化之力。',
  type: 'bloodline',
  rarity: 'myth',
  effects: [
    { stat: 'speed', value: 15, description: '速度+15%' },
    { stat: 'attack', value: 10, description: '攻击+10%' },
    { stat: 'maxMana', value: 20, description: '法力+20%' },
  ],
  originStory: '鲲鹏血脉是太古十凶鲲鹏的血脉传承，拥有者可获得鲲鹏的极速和变化能力。',
  requiredRealm: 3,
  awakenCondition: '获得鲲鹏宝术后觉醒',
  isAwakened: false,
  stealable: true,
});

// 先天道骨 (epic / soul)
registerTalent({
  id: 'talent_dao_xing',
  name: '先天道骨',
  description: '天生悟性极高，学习宝术和领悟法则速度极快。',
  type: 'soul',
  rarity: 'epic',
  effects: [
    { stat: 'cultivationSpeed', value: 150, description: '修炼速度+150%' },
    { stat: 'insight', value: 100, description: '悟性+100%' },
  ],
  originStory: '先天道骨是极为罕见的悟性体质，拥有者天生对大道有极高的悟性，学习任何功法都事半功倍。',
  requiredRealm: 0,
  awakenCondition: '学习第一门宝术后觉醒',
  isAwakened: false,
});

// 神源之眼 (legendary / special)
registerTalent({
  id: 'talent_shenyuan',
  name: '神源之眼',
  description: '可看破虚妄，发现隐秘之物和敌人弱点。',
  type: 'special',
  rarity: 'legendary',
  effects: [
    { stat: 'critRate', value: 15, description: '暴击率+15%' },
    { stat: 'insight', value: 50, description: '悟性+50%' },
  ],
  originStory: '神源之眼是传说中的特殊天赋，拥有者可看破一切虚妄，发现隐藏的机缘和敌人的弱点。',
  requiredRealm: 4,
  awakenCondition: '探索10个隐秘点后觉醒',
  isAwakened: false,
});

// 不灭神魂 (epic / special)
registerTalent({
  id: 'talent_bu_si',
  name: '不灭神魂',
  description: '神魂极强，免疫精神攻击，可承受更多法力。',
  type: 'special',
  rarity: 'epic',
  effects: [
    { stat: 'maxMana', value: 50, description: '法力+50%' },
    { stat: 'defense', value: 3, description: '防御+3%' },
  ],
  originStory: '不灭神魂是修炼神魂到极致的特殊天赋，拥有者神魂坚不可摧，免疫大部分精神攻击。',
  requiredRealm: 5,
  awakenCondition: '经历神魂攻击后存活觉醒',
  isAwakened: false,
});

// 荒古战体 (legendary / physique)
registerTalent({
  id: 'talent_huang_gu',
  name: '荒古战体',
  description: '为战斗而生的体质，战斗经验获取加倍。',
  type: 'physique',
  rarity: 'legendary',
  effects: [
    { stat: 'attack', value: 12, description: '攻击+12%' },
    { stat: 'defense', value: 8, description: '防御+8%' },
    { stat: 'cultivationSpeed', value: 100, description: '修炼速度+100%' },
  ],
  originStory: '荒古战体是上古战族传承的体质，拥有者天生擅长战斗，在战斗中成长速度极快。',
  requiredRealm: 1,
  awakenCondition: '击杀50个敌人后觉醒',
  isAwakened: false,
});

// ===== 新增小说天赋（完美世界/遮天/圣墟/仙逆/凡人修仙传） =====

// 生命之轮 (myth / special) - 可被抢夺
registerTalent({
  id: 'life_wheel',
  name: '生命之轮',
  description: '体内孕育生命之轮，可操控生灭之力，寿元远超同阶。',
  type: 'special',
  rarity: 'myth',
  effects: [
    { stat: 'maxHp', value: 50, description: '气血+50%' },
    { stat: 'healRate', value: 40, description: '恢复+40%' },
  ],
  originStory: '生命之轮是遮天中叶凡的至宝，可操控生灭之力，拥有者寿元绵长。',
  requiredRealm: 0,
  awakenCondition: '出生时即觉醒',
  stealable: true,
});

// 凤凰宝体 (legendary / physique) - 可被抢夺
registerTalent({
  id: 'phoenix_body',
  name: '凤凰宝体',
  description: '身蕴凤凰之力，涅槃重生，浴火不死。',
  type: 'physique',
  rarity: 'legendary',
  effects: [
    { stat: 'maxHp', value: 30, description: '气血+30%' },
    { stat: 'attack', value: 15, description: '攻击+15%' },
    { stat: 'reincarnationRetain', value: 20, description: '转世保留+20%' },
  ],
  originStory: '凤凰宝体是完美世界中凤族的至强体质，可涅槃重生。',
  requiredRealm: 0,
  awakenCondition: '出生时即觉醒',
  stealable: true,
});

// 石人族体 (epic / physique)
registerTalent({
  id: 'stone_man_body',
  name: '石人族体',
  description: '石化万古，肉身坚不可摧，免疫部分法术。',
  type: 'physique',
  rarity: 'epic',
  effects: [
    { stat: 'defense', value: 30, description: '防御+30%' },
    { stat: 'maxHp', value: 20, description: '气血+20%' },
  ],
  originStory: '石人族是完美世界中的古老种族，天生石化之体。',
  requiredRealm: 3,
  awakenCondition: '肉身经受重创后觉醒',
});

// 剑心通明 (epic / soul)
registerTalent({
  id: 'sword_heart',
  name: '剑心通明',
  description: '天生剑心，万剑归宗，剑道悟性无双。',
  type: 'soul',
  rarity: 'epic',
  effects: [
    { stat: 'attack', value: 15, description: '攻击+15%' },
    { stat: 'critRate', value: 12, description: '暴击率+12%' },
    { stat: 'insight', value: 20, description: '悟性+20%' },
  ],
  originStory: '剑心通明是仙逆中王林领悟的剑道境界，万剑臣服。',
  requiredRealm: 2,
  awakenCondition: '使用剑类武器击杀30个敌人后觉醒',
});

// 丹灵之体 (rare / physique)
registerTalent({
  id: 'dan_spirit_body',
  name: '丹灵之体',
  description: '天生对丹药有极高亲和力，炼丹成功率大增。',
  type: 'physique',
  rarity: 'rare',
  effects: [
    { stat: 'spiritAbsorption', value: 25, description: '灵气吸收+25%' },
    { stat: 'healRate', value: 20, description: '恢复+20%' },
  ],
  originStory: '丹灵之体是凡人修仙传中韩立拥有的特殊体质，对丹药有天然亲和。',
  requiredRealm: 0,
  awakenCondition: '出生时即觉醒',
});

// 不灭意志 (epic / innate)
registerTalent({
  id: 'undying_will',
  name: '不灭意志',
  description: '意志坚不可摧，越战越勇，濒死时战力暴增。',
  type: 'innate',
  rarity: 'epic',
  effects: [
    { stat: 'attack', value: 10, description: '攻击+10%' },
    { stat: 'defense', value: 15, description: '防御+15%' },
    { stat: 'maxHp', value: 20, description: '气血+20%' },
  ],
  originStory: '不灭意志是遮天中叶凡的特质，在绝境中爆发出惊人战力。',
  requiredRealm: 1,
  awakenCondition: '气血降至10%以下后存活觉醒',
});

// 远古神魂 (myth / soul) - 可被抢夺
registerTalent({
  id: 'primeval_spirit',
  name: '远古神魂',
  description: '神魂来自远古大能转世，天生神识浩瀚。',
  type: 'soul',
  rarity: 'myth',
  effects: [
    { stat: 'insight', value: 40, description: '悟性+40%' },
    { stat: 'maxMana', value: 30, description: '法力+30%' },
    { stat: 'cultivationSpeed', value: 20, description: '修炼速度+20%' },
  ],
  originStory: '远古神魂是圣墟中楚风的特质，神识远超同阶，可感知天地变化。',
  requiredRealm: 0,
  awakenCondition: '出生时即觉醒',
  stealable: true,
});

// 九秘传承 (myth / special) - 可被抢夺
registerTalent({
  id: 'nine_secret',
  name: '九秘传承',
  description: '蕴含九种秘术之力，战斗中随机激发一种秘术。',
  type: 'special',
  rarity: 'myth',
  effects: [
    { stat: 'attack', value: 18, description: '攻击+18%' },
    { stat: 'defense', value: 12, description: '防御+12%' },
    { stat: 'speed', value: 15, description: '速度+15%' },
  ],
  originStory: '九秘传承是遮天中叶凡收集的九大秘术，每一种都有逆天之能。',
  requiredRealm: 5,
  awakenCondition: '集齐三种以上功法后觉醒',
  stealable: true,
});

// 幽冥之体 (rare / physique)
registerTalent({
  id: 'dark_spirit_body',
  name: '幽冥之体',
  description: '身融幽冥之力，可在暗处修炼速度倍增。',
  type: 'physique',
  rarity: 'rare',
  effects: [
    { stat: 'cultivationSpeed', value: 20, description: '修炼速度+20%' },
    { stat: 'dodge', value: 10, description: '闪避+10%' },
  ],
  originStory: '幽冥之体是仙逆中修炼幽冥之力的特殊体质。',
  requiredRealm: 2,
  awakenCondition: '在黑夜修炼10次后觉醒',
});

// 剑瞳 (epic / special) - 可被抢夺
registerTalent({
  id: 'sword_pupil',
  name: '剑瞳',
  description: '双瞳蕴含剑意，可射出剑光伤敌。',
  type: 'special',
  rarity: 'epic',
  effects: [
    { stat: 'attack', value: 12, description: '攻击+12%' },
    { stat: 'critRate', value: 15, description: '暴击率+15%' },
  ],
  originStory: '剑瞳是完美世界中罕见的瞳术天赋，双目可射剑光。',
  requiredRealm: 3,
  awakenCondition: '使用瞳术类功法20次后觉醒',
  stealable: true,
});
