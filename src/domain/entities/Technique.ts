import { CultivationRealm } from './Player';
import { AttributeType } from './CombatAttributes';

export enum TechniqueQuality {
  COMMON = '凡术',
  BEAST = '遗种宝术',
  PURE = '纯血宝术',
  LEGEND = '十凶宝术',
  SUPREME = '至尊宝术',
}

export enum TechniqueSource {
  SELF_CREATED = '自创',
  ANCESTRAL = '传承',
  BEAST_BLOODLINE = '血脉',
  ANCIENT_RUINS = '古遗迹',
  DIVINE_BEING = '神明',
  IMMORTAL = '仙域',
  OTHER = '其他',
}

export interface ITechnique {
  id: string;
  name: string;
  quality: TechniqueQuality;
  source: TechniqueSource;
  baseDamage: number;
  manaCost: number;
  cooldown: number;
  description: string;
  originStory: string;
  element: 'fire' | 'water' | 'thunder' | 'wind' | 'earth' | 'none';
  effect?: {
    type: 'bleed' | 'burn' | 'freeze' | 'stun' | 'heal' | 'buff' | 'lifesteal' | 'shield' | 'mana_restore' | 'debuff' | 'dodge_buff' | 'crit_buff';
    value: number;
    duration?: number;
  };
  /** 功法属性，用于属性克制计算 */
  attribute?: AttributeType;
  proficiency: number;
  maxProficiency: number;
  requiredRealm: CultivationRealm;
  boneRunes?: string[];
  specialAbility?: string;
}