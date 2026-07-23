import { CultivationRealm } from './Player';

export enum MountTier {
  COMMON = '普通',
  RARE = '稀有',
  EPIC = '史诗',
  LEGEND = '传说',
  MYTH = '神话',
}

export const MOUNT_TIER_COLOR_CLASS: Record<MountTier, string> = {
  [MountTier.COMMON]: 'mount-tier-common',
  [MountTier.RARE]: 'mount-tier-rare',
  [MountTier.EPIC]: 'mount-tier-epic',
  [MountTier.LEGEND]: 'mount-tier-legend',
  [MountTier.MYTH]: 'mount-tier-myth',
};

export const MOUNT_TIER_STARS: Record<MountTier, number> = {
  [MountTier.COMMON]: 1,
  [MountTier.RARE]: 2,
  [MountTier.EPIC]: 3,
  [MountTier.LEGEND]: 4,
  [MountTier.MYTH]: 5,
};

export interface IMount {
  id: string;
  name: string;
  tier: MountTier;
  description: string;
  originStory: string;
  requiredRealm: CultivationRealm;
  baseSpeed: number;
  baseAttack: number;
  baseDefense: number;
  skills: {
    id: string;
    name: string;
    description: string;
    effect: {
      attackBonus?: number;
      defenseBonus?: number;
      speedBonus?: number;
      healPercent?: number;
    };
  }[];
  canFly: boolean;
  isMounted: boolean;
  level: number;
  exp: number;
  /** 亲密度（0-100） */
  intimacy?: number;
  /** 已进化次数 */
  evolveCount?: number;
}

export const MOUNTS: IMount[] = [
  {
    id: 'mount_linghu',
    name: '灵狐',
    tier: MountTier.COMMON,
    description: '一只雪白的灵狐，毛发顺滑，眼睛闪烁着灵性的光芒。',
    originStory: '灵狐是荒域常见的灵兽，性情温顺，可作为坐骑。',
    requiredRealm: CultivationRealm.MORTAL,
    baseSpeed: 10,
    baseAttack: 5,
    baseDefense: 3,
    skills: [],
    canFly: false,
    isMounted: false,
    level: 1,
    exp: 0,
  },
  {
    id: 'mount_wolf',
    name: '疾风狼',
    tier: MountTier.RARE,
    description: '一只通体灰黑的巨狼，奔跑如风，眼神凶狠。',
    originStory: '疾风狼是蛮荒之地常见的坐骑，速度极快。',
    requiredRealm: CultivationRealm.BLOOD_MOVING,
    baseSpeed: 15,
    baseAttack: 10,
    baseDefense: 5,
    skills: [
      {
        id: 'wolf_dash',
        name: '疾风冲刺',
        description: '瞬间爆发速度，可快速脱离战斗或追击敌人',
        effect: { speedBonus: 20 },
      },
    ],
    canFly: false,
    isMounted: false,
    level: 1,
    exp: 0,
  },
  {
    id: 'mount_bird',
    name: '风鹰',
    tier: MountTier.RARE,
    description: '一只巨大的雄鹰，翅膀展开可达数丈，翱翔于天际。',
    originStory: '风鹰是天空中的霸主，可载人飞行。',
    requiredRealm: CultivationRealm.BLOOD_MOVING,
    baseSpeed: 20,
    baseAttack: 8,
    baseDefense: 4,
    skills: [
      {
        id: 'bird_dive',
        name: '俯冲攻击',
        description: '从高空俯冲而下，造成额外伤害',
        effect: { attackBonus: 15 },
      },
    ],
    canFly: true,
    isMounted: false,
    level: 1,
    exp: 0,
  },
  {
    id: 'mount_lion',
    name: '火狮',
    tier: MountTier.EPIC,
    description: '一只浑身燃烧着烈焰的狮子，散发着灼热的气息。',
    originStory: '火狮是火域特有的灵兽，实力强大。',
    requiredRealm: CultivationRealm.CAVE,
    baseSpeed: 12,
    baseAttack: 20,
    baseDefense: 10,
    skills: [
      {
        id: 'lion_fire',
        name: '烈焰吐息',
        description: '喷出烈焰，伤害敌人',
        effect: { attackBonus: 25 },
      },
    ],
    canFly: false,
    isMounted: false,
    level: 1,
    exp: 0,
  },
  {
    id: 'mount_dragon',
    name: '龙马',
    tier: MountTier.LEGEND,
    description: '一匹身有龙鳞的骏马，头上生有龙角，脚踏祥云。',
    originStory: '龙马是传说中的神兽，龙首马身，可飞天遁地。石昊曾骑乘龙马闯荡天下。',
    requiredRealm: CultivationRealm.SPIRIT,
    baseSpeed: 30,
    baseAttack: 25,
    baseDefense: 15,
    skills: [
      {
        id: 'dragon_roar',
        name: '龙吟',
        description: '发出龙吼，震慑敌人',
        effect: { attackBonus: 30, defenseBonus: 10 },
      },
      {
        id: 'dragon_flight',
        name: '腾云驾雾',
        description: '飞行速度大幅提升',
        effect: { speedBonus: 30 },
      },
    ],
    canFly: true,
    isMounted: false,
    level: 1,
    exp: 0,
  },
  {
    id: 'mount_kirin',
    name: '麒麟',
    tier: MountTier.MYTH,
    description: '一只浑身散发着金光的麒麟，头上生有独角，脚踏火焰。',
    originStory: '麒麟是传说中的神兽，象征祥瑞。只有天命之人才可骑乘麒麟。',
    requiredRealm: CultivationRealm.VENERABLE,
    baseSpeed: 40,
    baseAttack: 40,
    baseDefense: 30,
    skills: [
      {
        id: 'qilin_bless',
        name: '麒麟祝福',
        description: '提升主人全属性',
        effect: { attackBonus: 50, defenseBonus: 30, speedBonus: 20 },
      },
      {
        id: 'qilin_heal',
        name: '祥瑞治愈',
        description: '治愈主人伤势',
        effect: { healPercent: 0.3 },
      },
    ],
    canFly: true,
    isMounted: false,
    level: 1,
    exp: 0,
  },
];

export function findMount(id: string): IMount | undefined {
  return MOUNTS.find(m => m.id === id);
}

export function getMountSpeedBonus(mount: IMount): number {
  return mount.baseSpeed * (1 + (mount.level - 1) * 0.1);
}

export function getMountAttackBonus(mount: IMount): number {
  return mount.baseAttack * (1 + (mount.level - 1) * 0.1);
}

export function getMountDefenseBonus(mount: IMount): number {
  return mount.baseDefense * (1 + (mount.level - 1) * 0.1);
}

// ===== 灵兽进化系统 =====

export interface IMountEvolution {
  fromTier: MountTier;
  toTier: MountTier;
  requiredLevel: number;
  requiredIntimacy: number;
  cost: { gold: number; materials: { id: string; amount: number }[] };
  statBoost: { speed: number; attack: number; defense: number };
  newSkill?: { id: string; name: string; description: string; effect: any };
  evolutionStory: string;
}

export const MOUNT_EVOLUTIONS: IMountEvolution[] = [
  {
    fromTier: MountTier.COMMON,
    toTier: MountTier.RARE,
    requiredLevel: 10,
    requiredIntimacy: 50,
    cost: { gold: 500, materials: [{ id: 'beast_bone', amount: 3 }] },
    statBoost: { speed: 5, attack: 5, defense: 3 },
    newSkill: { id: 'evolve_skill_1', name: '灵兽之怒', description: '进化后觉醒的技能，战斗中提升主人攻击', effect: { attackBonus: 10 } },
    evolutionStory: '灵兽在长期培养下血脉觉醒，品阶提升为稀有！外形变得更加威武，速度和力量都有所增长。',
  },
  {
    fromTier: MountTier.RARE,
    toTier: MountTier.EPIC,
    requiredLevel: 20,
    requiredIntimacy: 70,
    cost: { gold: 2000, materials: [{ id: 'beast_bone', amount: 5 }, { id: 'spirit_crystal', amount: 1 }] },
    statBoost: { speed: 8, attack: 10, defense: 5 },
    newSkill: { id: 'evolve_skill_2', name: '灵兽护主', description: '进化后觉醒的技能，危急时替主人抵挡伤害', effect: { defenseBonus: 15 } },
    evolutionStory: '灵兽血脉进一步觉醒，品阶提升为史诗！浑身散发着灵光，实力大增，与主人的羁绊更加深厚。',
  },
  {
    fromTier: MountTier.EPIC,
    toTier: MountTier.LEGEND,
    requiredLevel: 35,
    requiredIntimacy: 85,
    cost: { gold: 8000, materials: [{ id: 'dragon_bone', amount: 1 }, { id: 'spirit_crystal', amount: 3 }] },
    statBoost: { speed: 12, attack: 15, defense: 8 },
    newSkill: { id: 'evolve_skill_3', name: '传说之力', description: '传说级灵兽的威压，全属性提升', effect: { attackBonus: 20, defenseBonus: 10, speedBonus: 10 } },
    evolutionStory: '灵兽触及传说之境，品阶提升为传说！宛如神兽降世，威压四方，可载人翱翔九天。',
  },
  {
    fromTier: MountTier.LEGEND,
    toTier: MountTier.MYTH,
    requiredLevel: 50,
    requiredIntimacy: 100,
    cost: { gold: 30000, materials: [{ id: 'dragon_bone', amount: 3 }, { id: 'spirit_crystal', amount: 10 }] },
    statBoost: { speed: 20, attack: 25, defense: 15 },
    newSkill: { id: 'evolve_skill_4', name: '神话庇佑', description: '神话级灵兽的终极庇佑，大幅提升全属性', effect: { attackBonus: 40, defenseBonus: 30, speedBonus: 20, healPercent: 0.2 } },
    evolutionStory: '灵兽超凡入圣，品阶提升为神话！浑身金光璀璨，象征祥瑞，唯有天命之人方可驾驭。',
  },
];

export function getMountEvolution(tier: MountTier): IMountEvolution | undefined {
  return MOUNT_EVOLUTIONS.find(e => e.fromTier === tier);
}

export function getIntimacyLabel(intimacy: number): string {
  if (intimacy >= 90) return '心意相通';
  if (intimacy >= 70) return '亲密无间';
  if (intimacy >= 50) return '默契配合';
  if (intimacy >= 30) return '初具信任';
  if (intimacy >= 10) return '略有亲近';
  return '陌生警惕';
}