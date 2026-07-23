// 天赋系统已统一至 talent_data.ts
// 此文件保留向后兼容的导出
export type {
  ITalent,
  TalentRarity,
  TalentType,
} from '../../data/talents/talent_data';

export {
  getAllTalents,
  getTalent,
  getRandomTalents,
  getTalentEffects,
  talentRegistry,
} from '../../data/talents/talent_data';

// 兼容旧接口的枚举映射
export enum TalentTier {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGEND = 'legendary',
  MYTH = 'myth',
}

export type { TalentRarity as TalentTierOld } from '../../data/talents/talent_data';

// 旧的 TALENTS 数组改为从注册表获取
import { getAllTalents } from '../../data/talents/talent_data';
export const TALENTS = getAllTalents();
export const TALENTS_MAP = new Map(TALENTS.map(t => [t.id, t]));

export function findTalent(id: string) {
  return TALENTS_MAP.get(id);
}

export function getAwakenedTalents(talentIds: string[]) {
  return talentIds
    .map(id => TALENTS_MAP.get(id))
    .filter((t): t is NonNullable<typeof t> => t !== undefined && t.isAwakened === true);
}

export function applyTalentEffects(talentIds: string[]) {
  // 使用 talent_data.ts 的统一函数
  const effects = getTalentEffectsFromData(talentIds);
  return {
    attackBonus: effects.attack || 0,
    defenseBonus: effects.defense || 0,
    hpBonus: effects.maxHp || 0,
    manaBonus: effects.maxMana || 0,
    speedBonus: effects.speed || 0,
    critBonus: (effects.critRate || 0) / 100,
    expBonus: (effects.cultivationSpeed || 0) / 100,
    spiritBonus: (effects.insight || 0) / 100,
  };
}

import { getTalentEffects as getTalentEffectsFromData } from '../../data/talents/talent_data';
