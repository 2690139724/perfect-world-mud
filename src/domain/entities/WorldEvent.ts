import { IPlayer } from './Player';

export enum WorldEventType {
  NPC_FIGHT = 'npc_fight',
  NPC_ROBBERY = 'npc_robbery',
  NPC_TRADE = 'npc_trade',
  NPC_BETRAYAL = 'npc_betrayal',
  NPC_RESCUE = 'npc_rescue',
  NPC_SECRET_DEAL = 'npc_secret_deal',
  NPC_POISONING = 'npc_poisoning',
  NPC_FRAME_UP = 'npc_frame_up',
  NPC_ALLIANCE = 'npc_alliance',
  NPC_RIVALRY = 'npc_rivalry',
  TREASURE_DISCOVERY = 'treasure_discovery',
  TRAP = 'trap',
  AMBUSH = 'ambush',
  MYSTERIOUS_STRANGER = 'mysterious_stranger',
  CULTIVATION_INSIGHT = 'cultivation_insight',
  SPIRIT_BEAST = 'spirit_beast',
  ANCIENT_RUIN = 'ancient_ruin',
  CELESTIAL_PHENOMENON = 'celestial_phenomenon',
}

export enum EventDangerLevel {
  SAFE = 'safe',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  DEADLY = 'deadly',
}

export enum PlayerChoiceType {
  HELP = 'help',
  ATTACK = 'attack',
  NEGOTIATE = 'negotiate',
  OBSERVE = 'observe',
  FLEE = 'flee',
  JOIN = 'join',
  BETRAY = 'betray',
  SEARCH = 'search',
  ACCEPT = 'accept',
  REFUSE = 'refuse',
}

export interface IEventChoice {
  id: string;
  text: string;
  type: PlayerChoiceType;
  successRate?: number;
  requiredRealm?: number;
  requiredItem?: string;
  outcomes: IEventOutcome[];
}

export interface IEventOutcome {
  id: string;
  text: string;
  weight: number;
  effects: IEventEffect[];
}

export interface IEventEffect {
  type: 'favorability' | 'item' | 'gold' | 'exp' | 'hp' | 'mana' | 'debuff' | 'buff' | 'reputation' | 'unlock';
  target?: string;
  value: number | string;
  description?: string;
}

export interface IWorldEventTemplate {
  id: string;
  type: WorldEventType;
  title: string;
  description: string;
  dangerLevel: EventDangerLevel;
  weight: number;
  minRealm?: number;
  maxRealm?: number;
  terrainTypes?: string[];
  isSafeZoneAllowed: boolean;
  choices: IEventChoice[];
  npcInvolved?: string[];
  cooldown?: number;
}

export interface IActiveWorldEvent {
  templateId: string;
  triggeredAt: number;
  location: string;
  resolved: boolean;
  selectedChoice?: string;
  outcome?: IEventOutcome;
}
