import { IPlayer } from '../entities/Player';
import { IItem, ItemType, EquipmentSlot } from '../entities/Item';

export enum EquipmentQuality {
  COMMON = '凡品',
  FINE = '良品',
  RARE = '珍品',
  EPIC = '极品',
  LEGENDARY = '仙品',
  MYTHIC = '神品',
}

export enum EquipmentRarity {
  NORMAL = '普通',
  MAGIC = '魔法',
  RARE = '稀有',
  EPIC = '史诗',
  LEGENDARY = '传说',
}

export enum ForgeResult {
  SUCCESS = 'success',
  FAILURE = 'failure',
  GREAT_SUCCESS = 'great_success',
  DESTRUCTION = 'destruction',
}

export interface IEquipmentEnhancement {
  level: number;
  maxLevel: number;
  successRate: number;
  enhancementBonus: { stat: string; value: number }[];
}

export interface IEquipmentSet {
  id: string;
  name: string;
  pieces: string[];
  setBonuses: {
    requiredPieces: number;
    bonuses: { stat: string; value: number; description: string }[];
  }[];
  description: string;
}

export interface IEquipmentResonance {
  equipmentIds: string[];
  resonanceEffect: { stat: string; value: number; description: string };
  description: string;
}

export interface IForgeRecipe {
  id: string;
  name: string;
  targetEquipmentId: string;
  materials: Record<string, number>;
  goldCost: number;
  successRate: number;
  requiredLevel: number;
}

export interface IEquipmentEvolution {
  equipmentId: string;
  targetQuality: EquipmentQuality;
  materials: Record<string, number>;
  goldCost: number;
  successRate: number;
}

export const EQUIPMENT_SETS: IEquipmentSet[] = [
  {
    id: 'set_emperor',
    name: '帝道套装',
    pieces: ['eq_emperor_sword', 'eq_emperor_armor', 'eq_emperor_boots', 'eq_emperor_ring'],
    setBonuses: [
      { requiredPieces: 2, bonuses: [{ stat: 'attack', value: 15, description: '攻击+15%' }] },
      { requiredPieces: 3, bonuses: [{ stat: 'defense', value: 10, description: '防御+10%' }, { stat: 'critRate', value: 10, description: '暴击率+10%' }] },
      { requiredPieces: 4, bonuses: [{ stat: 'attack', value: 25, description: '攻击+25%' }, { stat: 'cultivationSpeed', value: 20, description: '修炼速度+20%' }] },
    ],
    description: '传说中的帝道套装，集齐后可成就帝道',
  },
  {
    id: 'set_immortal',
    name: '不朽套装',
    pieces: ['eq_immortal_blade', 'eq_immortal_robe', 'eq_immortal_footwear'],
    setBonuses: [
      { requiredPieces: 2, bonuses: [{ stat: 'maxHp', value: 20, description: '气血+20%' }] },
      { requiredPieces: 3, bonuses: [{ stat: 'maxHp', value: 30, description: '气血+30%' }, { stat: 'healRate', value: 25, description: '恢复速度+25%' }] },
    ],
    description: '不朽仙人遗留的套装，蕴含无尽生命力',
  },
  {
    id: 'set_thunder',
    name: '雷霆套装',
    pieces: ['eq_thunder_hammer', 'eq_thunder_armor', 'eq_thunder_boots', 'eq_thunder_necklace'],
    setBonuses: [
      { requiredPieces: 2, bonuses: [{ stat: 'speed', value: 15, description: '速度+15%' }] },
      { requiredPieces: 3, bonuses: [{ stat: 'attack', value: 15, description: '攻击+15%' }, { stat: 'speed', value: 10, description: '速度+10%' }] },
      { requiredPieces: 4, bonuses: [{ stat: 'attack', value: 25, description: '攻击+25%' }, { stat: 'critRate', value: 15, description: '暴击率+15%' }] },
    ],
    description: '蕴含雷霆之力的套装，攻速如电',
  },
];

export const EQUIPMENT_RESONANCES: IEquipmentResonance[] = [
  {
    equipmentIds: ['eq_fire_sword', 'eq_fire_armor'],
    resonanceEffect: { stat: 'attack', value: 20, description: '攻击+20%' },
    description: '火属性装备共鸣，烈焰之力倍增',
  },
  {
    equipmentIds: ['eq_ice_boots', 'eq_water_ring'],
    resonanceEffect: { stat: 'speed', value: 25, description: '速度+25%' },
    description: '冰与水共鸣，身法飘逸',
  },
  {
    equipmentIds: ['eq_earth_shield', 'eq_metal_armor'],
    resonanceEffect: { stat: 'defense', value: 30, description: '防御+30%' },
    description: '土与金共鸣，固若金汤',
  },
];

export const FORGE_RECIPES: IForgeRecipe[] = [
  {
    id: 'forge_emperor_sword',
    name: '帝道剑',
    targetEquipmentId: 'eq_emperor_sword',
    materials: { 'mat_emperor_blood': 10, 'mat_divine_iron': 5, 'mat_essence': 3 },
    goldCost: 100000,
    successRate: 0.6,
    requiredLevel: 8,
  },
  {
    id: 'forge_thunder_hammer',
    name: '雷霆锤',
    targetEquipmentId: 'eq_thunder_hammer',
    materials: { 'mat_thunder_stone': 8, 'mat_divine_iron': 5, 'mat_essence': 2 },
    goldCost: 80000,
    successRate: 0.65,
    requiredLevel: 6,
  },
  {
    id: 'forge_immortal_robe',
    name: '不朽长袍',
    targetEquipmentId: 'eq_immortal_robe',
    materials: { 'mat_immortal_essence': 5, 'mat_divine_cloth': 10, 'mat_essence': 3 },
    goldCost: 120000,
    successRate: 0.55,
    requiredLevel: 9,
  },
];

export const EQUIPMENT_EVOLUTIONS: IEquipmentEvolution[] = [
  {
    equipmentId: 'eq_emperor_sword',
    targetQuality: EquipmentQuality.MYTHIC,
    materials: { 'mat_emperor_blood': 20, 'mat_divine_spark': 5 },
    goldCost: 500000,
    successRate: 0.4,
  },
  {
    equipmentId: 'eq_immortal_robe',
    targetQuality: EquipmentQuality.MYTHIC,
    materials: { 'mat_immortal_essence': 10, 'mat_divine_spark': 3 },
    goldCost: 400000,
    successRate: 0.45,
  },
];

export class EquipmentService {
  static forgeEquipment(player: IPlayer, recipeId: string): {
    success: boolean;
    result: ForgeResult;
    equipment?: IItem;
    message: string;
  } {
    const recipe = FORGE_RECIPES.find(r => r.id === recipeId);
    if (!recipe) {
      return { success: false, result: ForgeResult.FAILURE, message: '锻造配方不存在' };
    }

    if (player.realm < recipe.requiredLevel) {
      return { success: false, result: ForgeResult.FAILURE, message: '境界不足' };
    }

    if (player.gold < recipe.goldCost) {
      return { success: false, result: ForgeResult.FAILURE, message: '金币不足' };
    }

    for (const [materialId, amount] of Object.entries(recipe.materials)) {
      const count = player.inventory.filter(item => item.id === materialId).reduce((sum, item) => sum + (item.stackable ? item.maxStack : 1), 0);
      if (count < amount) {
        return { success: false, result: ForgeResult.FAILURE, message: `材料不足：${materialId}` };
      }
    }

    player.gold -= recipe.goldCost;

    for (const [materialId, amount] of Object.entries(recipe.materials)) {
      let remaining = amount;
      player.inventory = player.inventory.filter(item => {
        if (remaining <= 0) return true;
        if (item.id === materialId) {
          remaining--;
          return false;
        }
        return true;
      });
    }

    const roll = Math.random();
    let result: ForgeResult;

    if (roll < recipe.successRate * 0.1) {
      result = ForgeResult.GREAT_SUCCESS;
    } else if (roll < recipe.successRate) {
      result = ForgeResult.SUCCESS;
    } else if (roll < recipe.successRate + 0.1) {
      result = ForgeResult.DESTRUCTION;
    } else {
      result = ForgeResult.FAILURE;
    }

    if (result === ForgeResult.GREAT_SUCCESS || result === ForgeResult.SUCCESS) {
      const equipment = this.createEquipment(recipe.targetEquipmentId, result === ForgeResult.GREAT_SUCCESS);
      player.inventory.push(equipment);

      const message = result === ForgeResult.GREAT_SUCCESS
        ? `【大成功】锻造出${equipment.name}！属性大幅提升！`
        : `锻造成功！获得${equipment.name}！`;

      return { success: true, result, equipment, message };
    } else if (result === ForgeResult.DESTRUCTION) {
      return { success: false, result, message: '锻造失败，材料损毁！' };
    } else {
      return { success: false, result, message: '锻造失败，材料保留。' };
    }
  }

  static createEquipment(equipmentId: string, greatSuccess: boolean): IItem {
    const equipmentTemplates: Record<string, Omit<IItem, 'id'>> = {
      eq_emperor_sword: {
        name: '帝道剑',
        type: ItemType.EQUIPMENT,
        quality: greatSuccess ? EquipmentQuality.MYTHIC : EquipmentQuality.LEGENDARY,
        desc: '传说中的帝道之剑，蕴含帝道法则',
        price: 1000000,
        stackable: false,
        maxStack: 1,
        icon: 'sword',
        slot: EquipmentSlot.WEAPON,
        stats: { attack: greatSuccess ? 200 : 150 },
      },
      eq_emperor_armor: {
        name: '帝道战甲',
        type: ItemType.EQUIPMENT,
        quality: greatSuccess ? EquipmentQuality.MYTHIC : EquipmentQuality.LEGENDARY,
        desc: '帝道之甲，可抵挡大帝一击',
        price: 800000,
        stackable: false,
        maxStack: 1,
        icon: 'armor',
        slot: EquipmentSlot.ARMOR,
        stats: { defense: greatSuccess ? 150 : 100, hp: greatSuccess ? 500 : 300 },
      },
      eq_thunder_hammer: {
        name: '雷霆锤',
        type: ItemType.EQUIPMENT,
        quality: greatSuccess ? EquipmentQuality.LEGENDARY : EquipmentQuality.EPIC,
        desc: '蕴含雷霆之力的巨锤',
        price: 500000,
        stackable: false,
        maxStack: 1,
        icon: 'hammer',
        slot: EquipmentSlot.WEAPON,
        stats: { attack: greatSuccess ? 180 : 120, speed: greatSuccess ? 30 : 20 },
      },
      eq_immortal_robe: {
        name: '不朽长袍',
        type: ItemType.EQUIPMENT,
        quality: greatSuccess ? EquipmentQuality.MYTHIC : EquipmentQuality.LEGENDARY,
        desc: '不朽仙人遗留的长袍',
        price: 900000,
        stackable: false,
        maxStack: 1,
        icon: 'robe',
        slot: EquipmentSlot.ARMOR,
        stats: { defense: greatSuccess ? 120 : 80, hp: greatSuccess ? 800 : 500, mana: greatSuccess ? 300 : 200 },
      },
    };

    const template = equipmentTemplates[equipmentId];
    if (!template) {
      return {
        id: `eq_${Date.now()}`,
        name: '未知装备',
        type: ItemType.EQUIPMENT,
        quality: EquipmentQuality.COMMON,
        desc: '未知装备',
        price: 100,
        stackable: false,
        maxStack: 1,
        icon: 'unknown',
      };
    }

    return {
      ...template,
      id: `eq_${equipmentId}_${Date.now()}`,
    };
  }

  static enhanceEquipment(player: IPlayer, equipmentId: string): {
    success: boolean;
    newLevel: number;
    message: string;
  } {
    const equipment = player.inventory.find(e => e.id === equipmentId);
    if (!equipment || equipment.type !== ItemType.EQUIPMENT) {
      return { success: false, newLevel: 0, message: '装备不存在' };
    }

    const enhancement = this.getEnhancement(equipment);
    if (enhancement.level >= enhancement.maxLevel) {
      return { success: false, newLevel: enhancement.level, message: '装备已达最高强化等级' };
    }

    const enhanceCost = this.calculateEnhanceCost(equipment, enhancement.level + 1);
    if (player.gold < enhanceCost) {
      return { success: false, newLevel: enhancement.level, message: '金币不足' };
    }

    player.gold -= enhanceCost;

    const success = Math.random() < enhancement.successRate;

    if (success) {
      enhancement.level++;
      enhancement.successRate = Math.max(0.3, enhancement.successRate - 0.05);
      
      const bonus = enhancement.enhancementBonus.find(b => b.stat === 'attack') || 
                    enhancement.enhancementBonus.find(b => b.stat === 'defense') ||
                    enhancement.enhancementBonus[0];
      
      if (bonus) {
        bonus.value += 10;
      }

      return {
        success: true,
        newLevel: enhancement.level,
        message: `强化成功！${equipment.name}强化等级+1（Lv.${enhancement.level}）`,
      };
    } else {
      enhancement.successRate = Math.min(1.0, enhancement.successRate + 0.1);
      return {
        success: false,
        newLevel: enhancement.level,
        message: '强化失败，成功率提升',
      };
    }
  }

  static getEnhancement(equipment: IItem): IEquipmentEnhancement {
    if (!equipment.stats) {
      equipment.stats = { attack: 0 };
    }
    
    return {
      level: (equipment as any).enhanceLevel || 0,
      maxLevel: 15,
      successRate: 0.8,
      enhancementBonus: [{ stat: 'attack', value: (equipment as any).enhanceBonus || 0 }],
    };
  }

  static calculateEnhanceCost(equipment: IItem, targetLevel: number): number {
    const qualityMultiplier = {
      [EquipmentQuality.COMMON]: 1,
      [EquipmentQuality.FINE]: 2,
      [EquipmentQuality.RARE]: 4,
      [EquipmentQuality.EPIC]: 8,
      [EquipmentQuality.LEGENDARY]: 16,
      [EquipmentQuality.MYTHIC]: 32,
    };
    
    const baseCost = 1000;
    const multiplier = qualityMultiplier[equipment.quality as EquipmentQuality] || 1;
    
    return Math.floor(baseCost * multiplier * Math.pow(1.5, targetLevel - 1));
  }

  static evolveEquipment(player: IPlayer, equipmentId: string): {
    success: boolean;
    message: string;
    evolvedEquipment?: IItem;
  } {
    const equipment = player.inventory.find(e => e.id === equipmentId);
    if (!equipment || equipment.type !== ItemType.EQUIPMENT) {
      return { success: false, message: '装备不存在' };
    }

    const evolution = EQUIPMENT_EVOLUTIONS.find(e => e.equipmentId === equipmentId);
    if (!evolution) {
      return { success: false, message: '该装备无法进化' };
    }

    if (player.gold < evolution.goldCost) {
      return { success: false, message: '金币不足' };
    }

    for (const [materialId, amount] of Object.entries(evolution.materials)) {
      const count = player.inventory.filter(item => item.id === materialId).reduce((sum, item) => sum + (item.stackable ? item.maxStack : 1), 0);
      if (count < amount) {
        return { success: false, message: `材料不足：${materialId}` };
      }
    }

    player.gold -= evolution.goldCost;

    for (const [materialId, amount] of Object.entries(evolution.materials)) {
      let remaining = amount;
      player.inventory = player.inventory.filter(item => {
        if (remaining <= 0) return true;
        if (item.id === materialId) {
          remaining--;
          return false;
        }
        return true;
      });
    }

    const success = Math.random() < evolution.successRate;

    if (success) {
      equipment.quality = evolution.targetQuality;
      if (equipment.stats) {
        equipment.stats.attack = Math.floor((equipment.stats.attack || 0) * 1.5);
        equipment.stats.defense = Math.floor((equipment.stats.defense || 0) * 1.5);
      }

      return {
        success: true,
        message: `${equipment.name}进化成功！品质提升至${evolution.targetQuality}！`,
        evolvedEquipment: equipment,
      };
    } else {
      return { success: false, message: '进化失败，材料损毁！' };
    }
  }

  static checkEquipmentSets(player: IPlayer): IEquipmentSet[] {
    const equippedIds = new Set<string>();
    
    const slots = ['weapon', 'armor', 'boots', 'accessory1', 'accessory2', 'artifact'] as const;
    slots.forEach(slot => {
      const item = player.equipment[slot];
      if (item) {
        equippedIds.add(item.id);
      }
    });

    const activeSets: IEquipmentSet[] = [];

    for (const set of EQUIPMENT_SETS) {
      const matchedPieces = set.pieces.filter(pieceId => equippedIds.has(pieceId));
      if (matchedPieces.length >= 2) {
        activeSets.push({ ...set });
      }
    }

    return activeSets;
  }

  static getSetBonuses(sets: IEquipmentSet[]): Record<string, number> {
    const bonuses: Record<string, number> = {};
    const equippedIds = new Set<string>();

    for (const set of sets) {
      const matchedCount = set.pieces.filter(pieceId => equippedIds.has(pieceId)).length;
      
      for (const bonus of set.setBonuses) {
        if (matchedCount >= bonus.requiredPieces) {
          for (const effect of bonus.bonuses) {
            bonuses[effect.stat] = (bonuses[effect.stat] || 0) + effect.value;
          }
        }
      }
    }

    return bonuses;
  }

  static checkResonances(player: IPlayer): IEquipmentResonance[] {
    const equippedIds = new Set<string>();
    
    const slots = ['weapon', 'armor', 'boots', 'accessory1', 'accessory2', 'artifact'] as const;
    slots.forEach(slot => {
      const item = player.equipment[slot];
      if (item) {
        equippedIds.add(item.id);
      }
    });

    const activeResonances: IEquipmentResonance[] = [];

    for (const resonance of EQUIPMENT_RESONANCES) {
      if (resonance.equipmentIds.every(id => equippedIds.has(id))) {
        activeResonances.push(resonance);
      }
    }

    return activeResonances;
  }

  static getResonanceBonuses(resonances: IEquipmentResonance[]): Record<string, number> {
    const bonuses: Record<string, number> = {};

    for (const resonance of resonances) {
      bonuses[resonance.resonanceEffect.stat] = (bonuses[resonance.resonanceEffect.stat] || 0) + resonance.resonanceEffect.value;
    }

    return bonuses;
  }

  static getTotalEquipmentBonuses(player: IPlayer): Record<string, number> {
    const bonuses: Record<string, number> = {};

    const slots = ['weapon', 'armor', 'boots', 'accessory1', 'accessory2', 'artifact'] as const;
    slots.forEach(slot => {
      const item = player.equipment[slot];
      if (item && item.stats) {
        if (item.stats.attack) bonuses.attack = (bonuses.attack || 0) + item.stats.attack;
        if (item.stats.defense) bonuses.defense = (bonuses.defense || 0) + item.stats.defense;
        if (item.stats.hp) bonuses.hp = (bonuses.hp || 0) + item.stats.hp;
        if (item.stats.mana) bonuses.mana = (bonuses.mana || 0) + item.stats.mana;
        if (item.stats.speed) bonuses.speed = (bonuses.speed || 0) + item.stats.speed;
      }
    });

    const sets = this.checkEquipmentSets(player);
    const setBonuses = this.getSetBonuses(sets);
    Object.assign(bonuses, setBonuses);

    const resonances = this.checkResonances(player);
    const resonanceBonuses = this.getResonanceBonuses(resonances);
    Object.assign(bonuses, resonanceBonuses);

    return bonuses;
  }
}