export enum NPCRelationshiptatus {
  HOSTILE = 'hostile',
  UNFRIENDLY = 'unfriendly',
  NEUTRAL = 'neutral',
  FRIENDLY = 'friendly',
  TRUSTED = 'trusted',
  ALLY = 'ally',
}

export enum NPCReputationTag {
  KIND = 'kind',
  CRUEL = 'cruel',
  HONEST = 'honest',
  CUNNING = 'cunning',
  GENEROUS = 'generous',
  GREEDY = 'greedy',
  BRAVE = 'brave',
  COWARDLY = 'cowardly',
  WISE = 'wise',
  FOOLISH = 'foolish',
  NOBLE = 'noble',
  VILLAINOUS = 'villainous',
}

export interface INPCRelationship {
  npcId: string;
  favorability: number;
  status: NPCRelationshiptatus;
  reputationTags: NPCReputationTag[];
  metCount: number;
  lastInteractionTime: number;
  giftsGiven: string[];
  questsCompleted: string[];
  specialFlags: string[];
  debtOwed: number;
  debtOwedTo: number;
  savedLife: boolean;
  betrayed: boolean;
}

export const FAVORABILITY_THRESHOLDS = {
  HOSTILE_MAX: -50,
  UNFRIENDLY_MAX: -10,
  NEUTRAL_MAX: 20,
  FRIENDLY_MAX: 60,
  TRUSTED_MAX: 90,
};

export function getRelationshipStatus(favorability: number): NPCRelationshiptatus {
  if (favorability <= FAVORABILITY_THRESHOLDS.HOSTILE_MAX) return NPCRelationshiptatus.HOSTILE;
  if (favorability <= FAVORABILITY_THRESHOLDS.UNFRIENDLY_MAX) return NPCRelationshiptatus.UNFRIENDLY;
  if (favorability <= FAVORABILITY_THRESHOLDS.NEUTRAL_MAX) return NPCRelationshiptatus.NEUTRAL;
  if (favorability <= FAVORABILITY_THRESHOLDS.FRIENDLY_MAX) return NPCRelationshiptatus.FRIENDLY;
  if (favorability <= FAVORABILITY_THRESHOLDS.TRUSTED_MAX) return NPCRelationshiptatus.TRUSTED;
  return NPCRelationshiptatus.ALLY;
}

export function getStatusName(status: NPCRelationshiptatus): string {
  const names: Record<NPCRelationshiptatus, string> = {
    [NPCRelationshiptatus.HOSTILE]: '敌对',
    [NPCRelationshiptatus.UNFRIENDLY]: '冷淡',
    [NPCRelationshiptatus.NEUTRAL]: '中立',
    [NPCRelationshiptatus.FRIENDLY]: '友善',
    [NPCRelationshiptatus.TRUSTED]: '信任',
    [NPCRelationshiptatus.ALLY]: '至交',
  };
  return names[status];
}

export function getStatusColor(status: NPCRelationshiptatus): string {
  const colors: Record<NPCRelationshiptatus, string> = {
    [NPCRelationshiptatus.HOSTILE]: '#dc2626',
    [NPCRelationshiptatus.UNFRIENDLY]: '#f97316',
    [NPCRelationshiptatus.NEUTRAL]: '#6b7280',
    [NPCRelationshiptatus.FRIENDLY]: '#22c55e',
    [NPCRelationshiptatus.TRUSTED]: '#3b82f6',
    [NPCRelationshiptatus.ALLY]: '#a855f7',
  };
  return colors[status];
}
