import { WorldId, getRealmName as getWorldRealmName, getFullRealmName as getWorldFullRealmName } from './WorldDefinition';
import { IMeridian } from './MeridianSystem';
import { IDaoHeart } from './DaoHeart';
import { ICompanion } from './Companion';

export enum CultivationRealm {
  MORTAL = 0,
  BLOOD_MOVING = 1,
  CAVE = 2,
  SPIRIT = 3,
  INSCRIBE = 4,
  ARRAY = 5,
  VENERABLE = 6,
  DIVINE_FIRE = 7,
  TRUE_ONE = 8,
  SACRIFICE = 9,
  GOD = 10,
  VOID = 11,
  SELF_CUT = 12,
  ESCAPE = 13,
  SUPREME = 14,
  TRUE_IMMORTAL = 15,
  KING = 16,
}

export const RealmNames: Record<CultivationRealm, string> = {
  [CultivationRealm.MORTAL]: '凡人',
  [CultivationRealm.BLOOD_MOVING]: '搬血境',
  [CultivationRealm.CAVE]: '洞天境',
  [CultivationRealm.SPIRIT]: '化灵境',
  [CultivationRealm.INSCRIBE]: '铭纹境',
  [CultivationRealm.ARRAY]: '列阵境',
  [CultivationRealm.VENERABLE]: '尊者境',
  [CultivationRealm.DIVINE_FIRE]: '神火境',
  [CultivationRealm.TRUE_ONE]: '真一境',
  [CultivationRealm.SACRIFICE]: '祭道境',
  [CultivationRealm.GOD]: '神境',
  [CultivationRealm.VOID]: '虚道境',
  [CultivationRealm.SELF_CUT]: '斩我境',
  [CultivationRealm.ESCAPE]: '遁一境',
  [CultivationRealm.SUPREME]: '至尊境',
  [CultivationRealm.TRUE_IMMORTAL]: '真仙境',
  [CultivationRealm.KING]: '王者境',
};

export interface IWorldTravelRecord {
  worldId: WorldId;
  firstArrivalTime: number;
  highestRealmLevel: number;
  totalTimeSpent: number;
  ascended: boolean;
}

export function getRealmNameByWorld(worldId: WorldId, realmLevel: number): string {
  return getWorldRealmName(worldId, realmLevel);
}

export function getFullRealmNameByWorld(worldId: WorldId, realmLevel: number, stage: number, perfection: boolean): string {
  return getWorldFullRealmName(worldId, realmLevel, stage, perfection);
}

export interface IBattleRule {
  id: string;
  priority: number;
  condition: {
    type: 'hp_less_than' | 'mp_greater_than' | 'enemy_hp_less_than' | 'first_round' | 'always';
    threshold?: number;
  };
  action: {
    type: 'technique' | 'attack' | 'defend' | 'flee';
    techId?: string;
  };
}

export interface IOfflineStrategy {
  movementMode: 'follow_path' | 'deeper' | 'wander' | 'target' | 'stay';
  targetRoomId?: string;
  targetZoneId?: string;
  activityBias: {
    combat: number;
    gathering: number;
    cultivation: number;
    explore: number;
  };
  battleRules: IBattleRule[];
  supplyThreshold: {
    hpPercent: number;
    manaPercent: number;
  };
  fleeIfUnbeatable: boolean;
  useEscapeToken: boolean;
}

export interface IPlayer {
  id: string;
  name: string;
  origin: OriginType;
  /** 当前所在世界 */
  currentWorldId: WorldId;
  /** 世界游历记录：{ worldId: record } */
  worldTravelRecords: Record<string, IWorldTravelRecord>;
  realm: CultivationRealm;
  /** 小境界 1-9，同大境界内的细分层 */
  realmStage: number;
  /** 是否已达大圆满（十境） */
  realmPerfection: boolean;
  /** 转世重修次数 */
  reincarnationCount: number;
  cultivationExp: number;
  maxCultivationExp: number;
  /** 突破感悟（积累突破经验，提升成功率） */
  breakthroughInsight: number;
  /** 前世记忆：转世时根据前世最高境界与转世次数累积，提供突破成功率加成（百分比点） */
  pastLifeMemory: number;
  /** 历世最高境界（用于转世增益计算） */
  highestRealmReached: CultivationRealm;
  /** 当前大境界连续突破失败次数 */
  breakthroughAttempts: number;
  /** 经验加成（百分比） */
  expBonus?: number;
  /** 金币加成（百分比） */
  goldBonus?: number;
  /** 区域探索里程碑：{ zoneId: [30, 60, 100] } */
  explorationMilestones?: Record<string, number[]>;
  /** 已选天赋ID列表（最多3个） */
  talentIds: string[];
  /** 当前修炼功法ID */
  currentMethodId?: string;
  /** 当前功法熟练度 */
  methodProficiency: number;
  /** 当前功法熟练度上限 */
  methodMaxProficiency: number;
  /** 功法顿悟次数（已进阶次数） */
  methodEnlightenmentCount: number;
  /** 已获功法ID列表（玩家已习得但未必当前修炼） */
  knownMethodIds: string[];
  gold: number;
  /** 声望值 */
  reputation: number;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
  speed: number;
  critRate: number;
  caveCount: number;
  cave?: ICave;
  spiritAbsorbRate: number;
  meridians: IMeridian[];
  daoHeart: IDaoHeart;
  equipment: {
    weapon: IItem | null;
    armor: IItem | null;
    boots: IItem | null;
    accessory1: IItem | null;
    accessory2: IItem | null;
    artifact: IItem | null;
  };
  techniques: ITechnique[];
  battleStrategy: IBattleRule[];
  offlineStrategy: IOfflineStrategy;
  inventory: IItem[];
  intimacyMap: Map<string, number>;
  bondSkills: string[];
  completedQuests: string[];
  activeQuests: IQuest[];
  currentRoomId: string;
  currentZoneId: string;
  passives: IPassive[];
  avatars: IAvatar[];
  sectId?: string;
  laws: ILawProgress[];
  killedMonsters: string[];
  discoveredZones: string[];
  totalPlayTime: number;
  totalOfflineTime: number;
  caves: ICave[];
  mounts: IMount[];
  alchemySkill: IAlchemySkill;
  /** 阵法师技能（品阶、经验、已学阵法） */
  formationSkill: IAlchemySkill;
  /** 已学会的丹方ID列表（受炼丹师品阶限制） */
  learnedAlchemyRecipes: string[];
  /** 已学会的阵法ID列表（受阵法师品阶限制） */
  learnedFormations: string[];
  /** 骨文铭刻等级（用于装备强化） */
  boneScriptLevel: number;
  /** 器灵契约列表（已契约的器灵ID） */
  bondedSpiritIds: string[];
  dungeonProgress: IDungeonProgress[];
  /** 当前副本探索状态 */
  currentDungeonState?: import('./Dungeon').ICurrentDungeonState;
  formations: IArrayFormationInstance[];
  achievements: IAchievement[];
  titles: ITitle[];
  currentTitleId?: string;
  /** 隐藏支线进度 */
  hiddenStorylines: IHiddenStorylineProgress[];
  /** 全局已发现线索ID */
  discoveredClues: string[];
  /** 道侣列表 */
  companions: ICompanion[];
  /** 当前道侣ID（正在同行的道侣） */
  currentCompanionId?: string;
  /** 社会职位/身份（由出身决定） */
  position?: string;
}

/** 每个大境界突破至十境（大圆满）所需的特殊材料 */
export const PERFECTION_MATERIALS: Record<CultivationRealm, { id: string; name: string; description: string }> = {
  [CultivationRealm.MORTAL]: { id: 'mat_mortal', name: '凡尘之心', description: '凡人极境所需，承载凡尘感悟' },
  [CultivationRealm.BLOOD_MOVING]: { id: 'mat_blood', name: '血精石', description: '搬血境大圆满所需，凝聚全身精血的奇石' },
  [CultivationRealm.CAVE]: { id: 'mat_cave', name: '洞天珠', description: '洞天境大圆满所需，容纳十洞天的宝珠' },
  [CultivationRealm.SPIRIT]: { id: 'mat_spirit', name: '化灵果', description: '化灵境大圆满所需，蕴含灵魂之力的异果' },
  [CultivationRealm.INSCRIBE]: { id: 'mat_inscribe', name: '铭纹神玉', description: '铭纹境大圆满所需，刻录天地道纹的神玉' },
  [CultivationRealm.ARRAY]: { id: 'mat_array', name: '阵源石', description: '列阵境大圆满所需，承载万阵之源的奇石' },
  [CultivationRealm.VENERABLE]: { id: 'mat_venerable', name: '尊者舍利', description: '尊者境大圆满所需，大能圆寂所化的舍利' },
  [CultivationRealm.DIVINE_FIRE]: { id: 'mat_divine_fire', name: '神火种', description: '神火境大圆满所需，一缕不灭神火之种' },
  [CultivationRealm.TRUE_ONE]: { id: 'mat_true_one', name: '真一圣水', description: '真一境大圆满所需，凝练唯一真我的圣水' },
  [CultivationRealm.SACRIFICE]: { id: 'mat_sacrifice', name: '祭道神晶', description: '祭道境大圆满所需，献祭己身凝练的神晶' },
  [CultivationRealm.GOD]: { id: 'mat_god', name: '神源', description: '神境大圆满所需，上古神明遗留下的神源' },
  [CultivationRealm.VOID]: { id: 'mat_void', name: '虚空石', description: '虚道境大圆满所需，蕴含虚空法则的奇石' },
  [CultivationRealm.SELF_CUT]: { id: 'mat_self_cut', name: '斩我刀', description: '斩我境大圆满所需，斩断过去的绝世神兵' },
  [CultivationRealm.ESCAPE]: { id: 'mat_escape', name: '遁一符', description: '遁一境大圆满所需，铭刻遁去其一的符箓' },
  [CultivationRealm.SUPREME]: { id: 'mat_supreme', name: '至尊骨', description: '至尊境大圆满所需，天生的至尊骨' },
  [CultivationRealm.TRUE_IMMORTAL]: { id: 'mat_immortal', name: '仙源', description: '真仙境大圆满所需，仙域坠落的仙源' },
  [CultivationRealm.KING]: { id: 'mat_king', name: '帝者之心', description: '王者境大圆满所需，成就帝位的无上之心' },
};

/** 获取带小境界的境界名称（默认完美世界体系，兼容旧代码） */
export function getFullRealmName(realm: CultivationRealm, stage: number, perfection: boolean): string {
  const baseName = RealmNames[realm] || '未知';
  if (perfection) return `${baseName}·大圆满`;
  return `${baseName}·${['一','二','三','四','五','六','七','八','九'][stage - 1] || '一'}层`;
}

/** 获取当前大境界的十境材料 */
export function getPerfectionMaterial(realm: CultivationRealm): { id: string; name: string; description: string } {
  return PERFECTION_MATERIALS[realm] || { id: 'mat_unknown', name: '未知材料', description: '未知' };
}

export type OriginType = string;

import { IItem } from './Item';
import { ITechnique } from './Technique';
import { IPassive } from './Passive';
import { IAvatar } from './Avatar';
import { ILawProgress } from './Law';
import { IQuest } from './Quest';
import { ICave } from './Cave';
import { IAlchemySkill } from './Alchemy';
import { IDungeonProgress } from './Dungeon';
import { IArrayFormationInstance } from './ArrayFormation';
import { IAchievement, ITitle } from './Achievement';
import { IMount } from './Mount';
import { IHiddenStorylineProgress } from './HiddenStoryline';