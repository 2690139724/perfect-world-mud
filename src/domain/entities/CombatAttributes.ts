export enum AttributeType {
  FIRE = '火',
  WATER = '水',
  WOOD = '木',
  EARTH = '土',
  METAL = '金',
  LIGHT = '光',
  DARK = '暗',
  WIND = '风',
  THUNDER = '雷',
  ICE = '冰',
}

export interface IAttributeEffect {
  damageMultiplier: number;
  effectType?: 'burn' | 'freeze' | 'stun' | 'poison' | 'heal';
  effectDuration?: number;
  effectValue?: number;
  description: string;
}

export const ATTRIBUTE_COUNTER: Record<AttributeType, AttributeType> = {
  [AttributeType.FIRE]: AttributeType.WATER,
  [AttributeType.WATER]: AttributeType.FIRE,
  [AttributeType.WOOD]: AttributeType.METAL,
  [AttributeType.METAL]: AttributeType.WOOD,
  [AttributeType.EARTH]: AttributeType.WIND,
  [AttributeType.WIND]: AttributeType.EARTH,
  [AttributeType.LIGHT]: AttributeType.DARK,
  [AttributeType.DARK]: AttributeType.LIGHT,
  [AttributeType.THUNDER]: AttributeType.WATER,
  [AttributeType.ICE]: AttributeType.FIRE,
};

export const COUNTER_EFFECTS: Record<AttributeType, IAttributeEffect> = {
  [AttributeType.FIRE]: {
    damageMultiplier: 1.5,
    effectType: 'burn',
    effectDuration: 3,
    effectValue: 5,
    description: '烈火灼烧，持续伤害',
  },
  [AttributeType.WATER]: {
    damageMultiplier: 1.5,
    effectType: 'freeze',
    effectDuration: 1,
    effectValue: 0,
    description: '寒冰冻结，行动迟缓',
  },
  [AttributeType.WOOD]: {
    damageMultiplier: 1.5,
    effectType: 'poison',
    effectDuration: 4,
    effectValue: 3,
    description: '剧毒侵袭，持续流失',
  },
  [AttributeType.METAL]: {
    damageMultiplier: 1.6,
    effectType: 'stun',
    effectDuration: 1,
    effectValue: 0,
    description: '金戈破甲，眩晕一击',
  },
  [AttributeType.EARTH]: {
    damageMultiplier: 1.4,
    effectType: 'heal',
    effectDuration: 0,
    effectValue: 10,
    description: '大地回春，恢复气血',
  },
  [AttributeType.WIND]: {
    damageMultiplier: 1.4,
    effectType: 'stun',
    effectDuration: 1,
    effectValue: 0,
    description: '疾风乱舞，目眩神迷',
  },
  [AttributeType.LIGHT]: {
    damageMultiplier: 1.7,
    effectType: 'burn',
    effectDuration: 2,
    effectValue: 8,
    description: '圣光净化，灼烧邪祟',
  },
  [AttributeType.DARK]: {
    damageMultiplier: 1.6,
    effectType: 'poison',
    effectDuration: 5,
    effectValue: 4,
    description: '暗影侵蚀，生命流失',
  },
  [AttributeType.THUNDER]: {
    damageMultiplier: 1.8,
    effectType: 'stun',
    effectDuration: 2,
    effectValue: 0,
    description: '雷霆万钧，麻痹全身',
  },
  [AttributeType.ICE]: {
    damageMultiplier: 1.5,
    effectType: 'freeze',
    effectDuration: 2,
    effectValue: 0,
    description: '冰封万里，动弹不得',
  },
};

export function checkAttributeCounter(attackAttr: AttributeType, defenseAttr: AttributeType): {
  isCounter: boolean;
  effect: IAttributeEffect | null;
} {
  const counterAttr = ATTRIBUTE_COUNTER[attackAttr];
  if (counterAttr === defenseAttr) {
    return { isCounter: true, effect: COUNTER_EFFECTS[attackAttr] };
  }
  return { isCounter: false, effect: null };
}

export function checkAttributeResistance(attackAttr: AttributeType, defenseAttr: AttributeType): {
  isResisted: boolean;
  resistanceMultiplier: number;
} {
  const counterAttr = ATTRIBUTE_COUNTER[defenseAttr];
  if (counterAttr === attackAttr) {
    return { isResisted: true, resistanceMultiplier: 0.7 };
  }
  return { isResisted: false, resistanceMultiplier: 1.0 };
}

export function calculateAttributeDamage(damage: number, attackAttr: AttributeType, defenseAttr?: AttributeType): {
  finalDamage: number;
  counterBonus: number;
  resisted: boolean;
  effect: IAttributeEffect | null;
} {
  let finalDamage = damage;
  let counterBonus = 0;
  let resisted = false;
  let effect: IAttributeEffect | null = null;

  if (!defenseAttr) {
    return { finalDamage, counterBonus, resisted, effect };
  }

  const counterResult = checkAttributeCounter(attackAttr, defenseAttr);
  if (counterResult.isCounter && counterResult.effect) {
    finalDamage = Math.floor(damage * counterResult.effect.damageMultiplier);
    counterBonus = Math.floor(damage * (counterResult.effect.damageMultiplier - 1));
    effect = counterResult.effect;
  }

  const resistResult = checkAttributeResistance(attackAttr, defenseAttr);
  if (resistResult.isResisted) {
    finalDamage = Math.floor(finalDamage * resistResult.resistanceMultiplier);
    resisted = true;
    effect = null;
  }

  return { finalDamage, counterBonus, resisted, effect };
}