export enum RumorType {
  EVENT = 'event',
  NPC = 'npc',
  LOCATION = 'location',
  ITEM = 'item',
  FACTION = 'faction',
  SECRET = 'secret',
  WARNING = 'warning',
}

export enum RumorReliability {
  RUMOR = 'rumor',
  HEARSAY = 'hearsay',
  CONFIRMED = 'confirmed',
  FALSE = 'false',
}

export enum RumorStatus {
  SPREADING = 'spreading',
  WIDELY_KNOWN = 'widely_known',
  FADED = 'faded',
  VERIFIED = 'verified',
}

export interface IRumor {
  id: string;
  type: RumorType;
  title: string;
  content: string;
  source: string;
  reliability: RumorReliability;
  status: RumorStatus;
  spreadLevel: number;
  createdAt: number;
  expiresAt: number;
  tags: string[];
  affectedNPCs?: string[];
  affectedLocations?: string[];
  affectedFactions?: string[];
}

export const RUMOR_TYPE_NAMES: Record<RumorType, string> = {
  [RumorType.EVENT]: '事件',
  [RumorType.NPC]: '人物',
  [RumorType.LOCATION]: '地点',
  [RumorType.ITEM]: '物品',
  [RumorType.FACTION]: '势力',
  [RumorType.SECRET]: '秘闻',
  [RumorType.WARNING]: '警示',
};

export const RUMOR_RELIABILITY_NAMES: Record<RumorReliability, string> = {
  [RumorReliability.RUMOR]: '传闻',
  [RumorReliability.HEARSAY]: '道听途说',
  [RumorReliability.CONFIRMED]: '证实',
  [RumorReliability.FALSE]: '虚假',
};

export const RUMOR_STATUS_NAMES: Record<RumorStatus, string> = {
  [RumorStatus.SPREADING]: '传播中',
  [RumorStatus.WIDELY_KNOWN]: '人尽皆知',
  [RumorStatus.FADED]: '已消散',
  [RumorStatus.VERIFIED]: '已核实',
};

export function getRumorTypeColor(type: RumorType): string {
  switch (type) {
    case RumorType.EVENT: return '#4CAF50';
    case RumorType.NPC: return '#2196F3';
    case RumorType.LOCATION: return '#FF9800';
    case RumorType.ITEM: return '#E91E63';
    case RumorType.FACTION: return '#9C27B0';
    case RumorType.SECRET: return '#607D8B';
    case RumorType.WARNING: return '#F44336';
    default: return '#757575';
  }
}

export function getRumorReliabilityColor(reliability: RumorReliability): string {
  switch (reliability) {
    case RumorReliability.CONFIRMED: return '#4CAF50';
    case RumorReliability.RUMOR: return '#FF9800';
    case RumorReliability.HEARSAY: return '#FFC107';
    case RumorReliability.FALSE: return '#F44336';
    default: return '#757575';
  }
}
