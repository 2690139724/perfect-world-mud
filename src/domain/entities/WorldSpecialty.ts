import { WorldId } from '../entities/WorldDefinition';
import { CultivationRealm } from '../entities/Player';

// ===== 世界专属修炼体系类型 =====
export enum SpecialtyType {
  ALIEN_FIRE = 'alien_fire',       // 斗破苍穹：异火
  WAR_SOUL = 'war_soul',           // 神墓：战魂
  SPIRIT_ROOT = 'spirit_root',     // 凡人修仙传：灵根
  LIFE_DEATH = 'life_death',       // 仙逆：生死意境
}

// ===== 异火定义（斗破苍穹） =====
export interface IAlienFire {
  id: string;
  name: string;
  description: string;
  rank: number;           // 异火排名（1-23，越小越强）
  powerBonus: number;     // 攻击力加成百分比
  absorbDifficulty: number; // 吸收难度（1-10）
  requiredRealm: CultivationRealm;
}

// ===== 战魂定义（神墓） =====
export interface IWarSoul {
  id: string;
  name: string;
  description: string;
  tier: number;           // 战魂等级（1-9）
  attackBonus: number;    // 攻击力加成
  defenseBonus: number;   // 防御力加成
  requiredRealm: CultivationRealm;
}

// ===== 灵根定义（凡人修仙传） =====
export interface ISpiritRoot {
  id: string;
  name: string;
  element: 'metal' | 'wood' | 'water' | 'fire' | 'earth' | 'wind' | 'thunder' | 'ice';
  description: string;
  grade: number;          // 灵根等级（1-5，越高越好）
  cultivationBonus: number; // 修炼速度加成百分比
}

// ===== 生死意境定义（仙逆） =====
export interface ILifeDeathRealm {
  id: string;
  name: string;
  description: string;
  level: number;          // 领悟层次（1-9）
  comprehensionBonus: number; // 悟性加成百分比
  breakthroughBonus: number;  // 突破成功率加成
}

// ===== 世界专属体系配置 =====
export interface IWorldSpecialty {
  worldId: WorldId;
  type: SpecialtyType;
  name: string;
  description: string;
  alienFires?: IAlienFire[];
  warSouls?: IWarSoul[];
  spiritRoots?: ISpiritRoot[];
  lifeDeathRealms?: ILifeDeathRealm[];
}

// ===== 各世界专属体系数据 =====
export const WORLD_SPECIALTIES: Record<WorldId, IWorldSpecialty> = {
  [WorldId.DOU_PO]: {
    worldId: WorldId.DOU_PO,
    type: SpecialtyType.ALIEN_FIRE,
    name: '异火系统',
    description: '斗气大陆上，天地间存在着二十三种奇异火焰。吞噬异火可大幅增强斗气实力，但过程凶险万分。',
    alienFires: [
      { id: 'qinglian_dixinhuo', name: '青莲地心火', description: '深埋地底的青色火焰，温度极高，可熔金化铁。', rank: 19, powerBonus: 15, absorbDifficulty: 4, requiredRealm: 3 },
      { id: 'fenglian_douhuo', name: '风雷翼龙火', description: '风雷之力凝聚的异火，兼具速度与破坏。', rank: 16, powerBonus: 20, absorbDifficulty: 5, requiredRealm: 4 },
      { id: 'hai_xinyan', name: '海心焰', description: '生于深海的蓝色火焰，水火相济。', rank: 15, powerBonus: 22, absorbDifficulty: 6, requiredRealm: 5 },
      { id: 'gu_ling_yan', name: '骨灵冷火', description: '极寒与极热并存的诡异火焰，可冻魂焚体。', rank: 11, powerBonus: 30, absorbDifficulty: 7, requiredRealm: 6 },
      { id: 'san_qi_zun_xiao_yan', name: '三千焱炎火', description: '群星之力凝聚的火焰，蕴含星辰之力。', rank: 9, powerBonus: 40, absorbDifficulty: 8, requiredRealm: 7 },
      { id: 'ba_huang_po_mie_yan', name: '八荒破灭焱', description: '可焚尽八荒的毁灭之焰。', rank: 6, powerBonus: 55, absorbDifficulty: 9, requiredRealm: 8 },
      { id: 'jing_lian_yao_huo', name: '净莲妖火', description: '可净化万物的圣洁火焰，也可化为妖焰焚天。', rank: 3, powerBonus: 75, absorbDifficulty: 10, requiredRealm: 9 },
      { id: 'xu_kong_tun_yan', name: '虚无吞炎', description: '可吞噬万物的黑色火焰，无形无质。', rank: 2, powerBonus: 90, absorbDifficulty: 10, requiredRealm: 10 },
    ],
  },

  [WorldId.SHEN_MU]: {
    worldId: WorldId.SHEN_MU,
    type: SpecialtyType.WAR_SOUL,
    name: '战魂系统',
    description: '神魔陵园中，太古神魔的战意不散，化为战魂。有缘者可吸收战魂，获得远古强者的战力加持。',
    warSouls: [
      { id: 'soul_xuanwu', name: '玄武战魂', description: '太古玄武的残存战意，防御无双。', tier: 1, attackBonus: 5, defenseBonus: 15, requiredRealm: 2 },
      { id: 'soul_baihu', name: '白虎战魂', description: '太古白虎的杀伐之意，攻伐凌厉。', tier: 2, attackBonus: 15, defenseBonus: 5, requiredRealm: 3 },
      { id: 'soul_qinglong', name: '青龙战魂', description: '太古青龙的威严战意，攻守兼备。', tier: 4, attackBonus: 20, defenseBonus: 20, requiredRealm: 5 },
      { id: 'soul_zhuque', name: '朱雀战魂', description: '太古朱雀的焚天战意，烈焰滔天。', tier: 5, attackBonus: 30, defenseBonus: 10, requiredRealm: 6 },
      { id: 'soul_dugu', name: '独孤战魂', description: '独孤败天的战意残存，逆天而行。', tier: 7, attackBonus: 45, defenseBonus: 25, requiredRealm: 8 },
      { id: 'soul_demon', name: '太古魔神战魂', description: '远古魔神的毁灭战意，可毁天灭地。', tier: 9, attackBonus: 70, defenseBonus: 40, requiredRealm: 10 },
    ],
  },

  [WorldId.FAN_REN]: {
    worldId: WorldId.FAN_REN,
    type: SpecialtyType.SPIRIT_ROOT,
    name: '灵根系统',
    description: '修仙之根本。灵根决定修炼速度与功法亲和。天灵根修炼神速，杂灵根虽慢却有独特之妙。',
    spiritRoots: [
      { id: 'root_metal', name: '庚金灵根', element: 'metal', description: '金属性灵根，剑修首选，攻伐犀利。', grade: 3, cultivationBonus: 10 },
      { id: 'root_wood', name: '乙木灵根', element: 'wood', description: '木属性灵根，生机旺盛，擅长木系法术。', grade: 3, cultivationBonus: 10 },
      { id: 'root_water', name: '癸水灵根', element: 'water', description: '水属性灵根，柔和绵长，擅长防御。', grade: 3, cultivationBonus: 10 },
      { id: 'root_fire', name: '丁火灵根', element: 'fire', description: '火属性灵根，爆裂猛烈，擅长火系法术。', grade: 3, cultivationBonus: 12 },
      { id: 'root_earth', name: '戊土灵根', element: 'earth', description: '土属性灵根，厚重稳固，擅长防御。', grade: 3, cultivationBonus: 8 },
      { id: 'root_wind', name: '巽风灵根', element: 'wind', description: '风属性异灵根，速度极快，罕少见。', grade: 4, cultivationBonus: 20 },
      { id: 'root_thunder', name: '震雷灵根', element: 'thunder', description: '雷属性异灵根，攻伐第一，极为罕见。', grade: 5, cultivationBonus: 30 },
      { id: 'root_ice', name: '坎冰灵根', element: 'ice', description: '冰属性异灵根，冰封万物，十分罕见。', grade: 4, cultivationBonus: 22 },
    ],
  },

  [WorldId.XIAN_NI]: {
    worldId: WorldId.XIAN_NI,
    type: SpecialtyType.LIFE_DEATH,
    name: '生死意境',
    description: '生死轮回，大道之极。领悟生死意境者，可逆天改命，超脱轮回。这是王林所修的核心大道。',
    lifeDeathRealms: [
      { id: 'ld_sisheng', name: '死生初悟', description: '初窥生死之门，感悟生死流转。', level: 1, comprehensionBonus: 5, breakthroughBonus: 3 },
      { id: 'ld_lunhui', name: '轮回之境', description: '领悟生死轮回之理，看破一线生死。', level: 3, comprehensionBonus: 10, breakthroughBonus: 8 },
      { id: 'ld_nishi', name: '逆死之境', description: '可逆转生死，令将死之人延缓生机。', level: 5, comprehensionBonus: 18, breakthroughBonus: 15 },
      { id: 'ld_zhuansheng', name: '转生之境', description: '生死自如，可转世重修不失记忆。', level: 7, comprehensionBonus: 30, breakthroughBonus: 25 },
      { id: 'ld_dadao', name: '生死大道', description: '生死大道圆满，超脱轮回，与天地同寿。', level: 9, comprehensionBonus: 50, breakthroughBonus: 40 },
    ],
  },

  // 以下世界暂无专属体系
  [WorldId.PERFECT_WORLD]: {
    worldId: WorldId.PERFECT_WORLD,
    type: SpecialtyType.ALIEN_FIRE,
    name: '原始真解',
    description: '完美世界的修炼以原始法则为核心，万物归一。',
  },
  [WorldId.ZHE_TIAN]: {
    worldId: WorldId.ZHE_TIAN,
    type: SpecialtyType.WAR_SOUL,
    name: '帝兵传承',
    description: '遮天世界的修炼以大帝传承为核心。',
  },
  [WorldId.SHENG_XU]: {
    worldId: WorldId.SHENG_XU,
    type: SpecialtyType.LIFE_DEATH,
    name: '魂火系统',
    description: '圣墟世界的修炼以魂火为核心。',
  },
};

// ===== 辅助函数 =====
export function getWorldSpecialty(worldId: WorldId): IWorldSpecialty | undefined {
  return WORLD_SPECIALTIES[worldId];
}

export function getSpecialtyType(worldId: WorldId): SpecialtyType | undefined {
  return WORLD_SPECIALTIES[worldId]?.type;
}

export function getAlienFires(): IAlienFire[] {
  return WORLD_SPECIALTIES[WorldId.DOU_PO]?.alienFires || [];
}

export function getWarSouls(): IWarSoul[] {
  return WORLD_SPECIALTIES[WorldId.SHEN_MU]?.warSouls || [];
}

export function getSpiritRoots(): ISpiritRoot[] {
  return WORLD_SPECIALTIES[WorldId.FAN_REN]?.spiritRoots || [];
}

export function getLifeDeathRealms(): ILifeDeathRealm[] {
  return WORLD_SPECIALTIES[WorldId.XIAN_NI]?.lifeDeathRealms || [];
}
