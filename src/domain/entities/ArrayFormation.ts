export enum ArrayFormationType {
  ATTACK = 'attack',
  DEFENSE = 'defense',
  GATHERING = 'gathering',
  TRAP = 'trap',
  TRANSMISSION = 'transmission',
}

export enum ArrayFormationTier {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
  MYTHIC = 'mythic',
}

export interface IArrayFormation {
  id: string;
  name: string;
  type: ArrayFormationType;
  tier: ArrayFormationTier;
  description: string;
  originStory: string;
  requiredRealm: number;
  materials: Record<string, number>;
  effects: {
    type: string;
    value: number;
    duration?: number;
  }[];
  cooldownHours: number;
  maxLevel: number;
}

export interface IArrayFormationInstance {
  formationId: string;
  level: number;
  placedRoomId?: string;
  remainingDuration: number;
}

export const ARRAY_FORMATIONS: IArrayFormation[] = [
  {
    id: 'formation_fire_array',
    name: '烈火阵',
    type: ArrayFormationType.ATTACK,
    tier: ArrayFormationTier.COMMON,
    description: '以灵石为引，点燃火焰攻击敌人。',
    originStory: '石族常用的基础攻击阵法，利用灵石中的灵力引动火焰。',
    requiredRealm: 0,
    materials: { spirit_crystal: 3 },
    effects: [{ type: 'damage', value: 20 }],
    cooldownHours: 1,
    maxLevel: 5,
  },
  {
    id: 'formation_stone_wall',
    name: '石壁阵',
    type: ArrayFormationType.DEFENSE,
    tier: ArrayFormationTier.COMMON,
    description: '召唤石壁阻挡敌人攻击。',
    originStory: '石族传承的防御阵法，以石之力构筑屏障。',
    requiredRealm: 0,
    materials: { stone_core: 2, iron_ore: 3 },
    effects: [{ type: 'defense', value: 15 }],
    cooldownHours: 2,
    maxLevel: 5,
  },
  {
    id: 'formation_spirit_gather',
    name: '聚灵阵',
    type: ArrayFormationType.GATHERING,
    tier: ArrayFormationTier.RARE,
    description: '汇聚天地灵气，加速修炼。',
    originStory: '太古时期流传下来的修炼辅助阵法，可将周围灵气汇聚于一点。',
    requiredRealm: 1,
    materials: { spirit_crystal: 5, spirit_herb: 3 },
    effects: [{ type: 'cultivation_speed', value: 1.5 }],
    cooldownHours: 0,
    maxLevel: 10,
  },
  {
    id: 'formation_thunder_trap',
    name: '雷劫阵',
    type: ArrayFormationType.TRAP,
    tier: ArrayFormationTier.RARE,
    description: '引动雷霆，对踏入阵中的敌人造成伤害。',
    originStory: '模仿天劫的恐怖阵法，引动天地雷霆之力。',
    requiredRealm: 1,
    materials: { spirit_crystal: 8, soul_fragment: 2 },
    effects: [{ type: 'lightning_damage', value: 50 }],
    cooldownHours: 4,
    maxLevel: 5,
  },
  {
    id: 'formation_void_array',
    name: '虚空阵',
    type: ArrayFormationType.ATTACK,
    tier: ArrayFormationTier.EPIC,
    description: '撕裂虚空，对敌人造成空间伤害。',
    originStory: '领悟空间法则后才能布置的高级阵法。',
    requiredRealm: 4,
    materials: { soul_fragment: 5, spirit_crystal: 10 },
    effects: [{ type: 'void_damage', value: 100 }, { type: 'ignore_defense', value: 0.3 }],
    cooldownHours: 8,
    maxLevel: 8,
  },
  {
    id: 'formation_immortal_barrier',
    name: '仙障阵',
    type: ArrayFormationType.DEFENSE,
    tier: ArrayFormationTier.LEGENDARY,
    description: '仙人遗留的防御阵法，可抵挡强大攻击。',
    originStory: '远古仙人留下的阵法传承，蕴含仙力。',
    requiredRealm: 6,
    materials: { soul_fragment: 10, spirit_crystal: 20, ancient_bone: 5 },
    effects: [{ type: 'defense', value: 100 }, { type: 'damage_reflect', value: 0.2 }],
    cooldownHours: 12,
    maxLevel: 5,
  },
  {
    id: 'formation_time_array',
    name: '时光阵',
    type: ArrayFormationType.GATHERING,
    tier: ArrayFormationTier.LEGENDARY,
    description: '扭曲时间流速，极大提升修炼速度。',
    originStory: '领悟时间法则后才能布置的神级阵法。',
    requiredRealm: 6,
    materials: { soul_fragment: 15, spirit_crystal: 30, law_essence_time: 1 },
    effects: [{ type: 'cultivation_speed', value: 3.0 }, { type: 'time_warp', value: 0.5 }],
    cooldownHours: 24,
    maxLevel: 5,
  },
  {
    id: 'formation_divine_transmission',
    name: '神传送阵',
    type: ArrayFormationType.TRANSMISSION,
    tier: ArrayFormationTier.MYTHIC,
    description: '可跨域传送的神级阵法。',
    originStory: '远古大能开辟的传送阵法，可在不同界域间穿梭。',
    requiredRealm: 8,
    materials: { soul_fragment: 20, spirit_crystal: 50, law_essence_destiny: 1 },
    effects: [{ type: 'teleport', value: 1 }],
    cooldownHours: 48,
    maxLevel: 3,
  },
];

export function findFormation(id: string): IArrayFormation | undefined {
  return ARRAY_FORMATIONS.find(f => f.id === id);
}

export function getFormationsByType(type: ArrayFormationType): IArrayFormation[] {
  return ARRAY_FORMATIONS.filter(f => f.type === type);
}

export function getFormationsByRealm(realm: number): IArrayFormation[] {
  return ARRAY_FORMATIONS.filter(f => f.requiredRealm <= realm);
}