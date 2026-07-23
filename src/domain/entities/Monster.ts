import { AttributeType } from './CombatAttributes';

export type MonsterAIType = 'normal' | 'charge' | 'summon' | 'shield';

export interface IMonster {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  expValue: number;
  drops: { itemId: string; chance: number; minCount: number; maxCount: number }[];
  description: string;
  race: string;
  skills: string[];
  aiType?: MonsterAIType;
  /** 怪物境界，用于境界压制计算 */
  realm?: number;
  /** 怪物属性，用于属性克制计算 */
  attribute?: AttributeType;
}