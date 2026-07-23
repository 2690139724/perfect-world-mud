import { ITechnique, TechniqueQuality, TechniqueSource } from '../entities/Technique';
import { IPlayer } from '../entities/Player';
import { ItemType } from '../entities/Item';
import { AttributeType } from './CombatEngine';

export enum TechniqueElement {
  FIRE = 'fire',
  WATER = 'water',
  THUNDER = 'thunder',
  WIND = 'wind',
  EARTH = 'earth',
  WOOD = 'wood',
  METAL = 'metal',
  LIGHT = 'light',
  DARK = 'dark',
  NONE = 'none',
}

export enum TechniqueRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
  MYTHIC = 'mythic',
}

export interface ITechniqueFragment {
  id: string;
  techniqueId: string;
  fragmentIndex: number;
  totalFragments: number;
  found: boolean;
  source: string;
  description: string;
}

export interface ITechniqueFusion {
  id: string;
  name: string;
  baseTechniques: string[];
  fusedTechnique: ITechnique;
  fusionCost: number;
  successRate: number;
}

export interface ITechniqueBond {
  id: string;
  techniqueIds: string[];
  bonus: {
    damage: number;
    critRate: number;
    cooldownReduction: number;
  };
  description: string;
}

export interface ITechniqueCounter {
  attacker: TechniqueElement;
  defender: TechniqueElement;
  damageMultiplier: number;
  effect: string;
}

export const TECHNIQUE_ELEMENT_COUNTER: ITechniqueCounter[] = [
  { attacker: TechniqueElement.FIRE, defender: TechniqueElement.WIND, damageMultiplier: 1.5, effect: '火势借风势，威力大增' },
  { attacker: TechniqueElement.WIND, defender: TechniqueElement.EARTH, damageMultiplier: 1.5, effect: '风蚀土崩，无坚不摧' },
  { attacker: TechniqueElement.EARTH, defender: TechniqueElement.WATER, damageMultiplier: 1.5, effect: '以土挡水，滴水不漏' },
  { attacker: TechniqueElement.WATER, defender: TechniqueElement.FIRE, damageMultiplier: 1.5, effect: '水火相克，以柔克刚' },
  { attacker: TechniqueElement.WOOD, defender: TechniqueElement.EARTH, damageMultiplier: 1.5, effect: '木借土生，生生不息' },
  { attacker: TechniqueElement.METAL, defender: TechniqueElement.WOOD, damageMultiplier: 1.5, effect: '金克木，削铁如泥' },
  { attacker: TechniqueElement.THUNDER, defender: TechniqueElement.WATER, damageMultiplier: 1.5, effect: '雷电劈水，导电伤人' },
  { attacker: TechniqueElement.LIGHT, defender: TechniqueElement.DARK, damageMultiplier: 1.8, effect: '光明驱散黑暗，净化一切' },
  { attacker: TechniqueElement.DARK, defender: TechniqueElement.LIGHT, damageMultiplier: 0.7, effect: '黑暗被光明压制' },
  { attacker: TechniqueElement.FIRE, defender: TechniqueElement.WATER, damageMultiplier: 0.7, effect: '火被水浇灭' },
  { attacker: TechniqueElement.WATER, defender: TechniqueElement.EARTH, damageMultiplier: 0.7, effect: '水被土吸收' },
];

export const TECHNIQUE_BONDS: ITechniqueBond[] = [
  {
    id: 'bond_fire_wind',
    techniqueIds: ['tech_fire_1', 'tech_wind_1'],
    bonus: { damage: 0.2, critRate: 0.1, cooldownReduction: 0.1 },
    description: '风火燎原：火与风的结合，威力倍增',
  },
  {
    id: 'bond_water_ice',
    techniqueIds: ['tech_water_1', 'tech_water_2'],
    bonus: { damage: 0.15, critRate: 0.05, cooldownReduction: 0.15 },
    description: '冰霜冻结：水属性功法融合，冻结敌人',
  },
  {
    id: 'bond_thunder_earth',
    techniqueIds: ['tech_thunder_1', 'tech_earth_1'],
    bonus: { damage: 0.25, critRate: 0.15, cooldownReduction: 0.05 },
    description: '雷电撼地：雷与土共鸣，引发地震',
  },
  {
    id: 'bond_light_dark',
    techniqueIds: ['tech_light_1', 'tech_dark_1'],
    bonus: { damage: 0.3, critRate: 0.2, cooldownReduction: 0.2 },
    description: '阴阳相生：光明与黑暗的极致平衡',
  },
];

export class TechniqueService {
  static findFragments(player: IPlayer, techniqueId: string): ITechniqueFragment[] {
    return player.inventory
      .filter(item => item.type === ItemType.FRAGMENT && item.metadata?.techniqueId === techniqueId)
      .map(item => ({
        id: item.id,
        techniqueId: item.metadata?.techniqueId || '',
        fragmentIndex: item.metadata?.fragmentIndex || 0,
        totalFragments: item.metadata?.totalFragments || 0,
        found: true,
        source: item.metadata?.source || '',
        description: item.description || item.desc || '',
      }));
  }

  static checkFragmentCompletion(fragments: ITechniqueFragment[]): boolean {
    if (fragments.length === 0) return false;
    const total = fragments[0].totalFragments;
    const foundIndices = new Set(fragments.map(f => f.fragmentIndex));
    return foundIndices.size === total;
  }

  static assembleTechnique(player: IPlayer, fragments: ITechniqueFragment[]): ITechnique | null {
    if (!this.checkFragmentCompletion(fragments)) return null;

    const techniqueId = fragments[0].techniqueId;
    const assembledTechnique: ITechnique = {
      id: techniqueId,
      name: fragments[0].description,
      quality: TechniqueQuality.LEGEND,
      source: TechniqueSource.ANCIENT_RUINS,
      baseDamage: 100 + fragments.length * 20,
      manaCost: 50 + fragments.length * 10,
      cooldown: 3,
      description: '由残卷拼凑而成的远古功法',
      originStory: fragments.map(f => f.source).join('\n'),
      element: fragments[0].techniqueId.includes('fire') ? 'fire' : 
               fragments[0].techniqueId.includes('water') ? 'water' :
               fragments[0].techniqueId.includes('thunder') ? 'thunder' : 'none',
      proficiency: 0,
      maxProficiency: 1000,
      requiredRealm: 3,
    };

    fragments.forEach(fragment => {
      const item = player.inventory.find(i => i.id === fragment.id);
      if (item) {
        player.inventory = player.inventory.filter(i => i.id !== fragment.id);
      }
    });

    player.techniques.push(assembledTechnique);
    return assembledTechnique;
  }

  static fuseTechniques(player: IPlayer, techIds: string[]): { success: boolean; fusedTechnique?: ITechnique; message: string } {
    const techniques = player.techniques.filter(t => techIds.includes(t.id));
    if (techniques.length < 2) {
      return { success: false, message: '至少需要两种功法才能融合' };
    }

    const fusionCost = this.calculateFusionCost(techniques);
    if (player.gold < fusionCost) {
      return { success: false, message: '金币不足，无法融合' };
    }

    const successRate = this.calculateFusionSuccessRate(techniques);
    if (Math.random() > successRate) {
      player.gold -= fusionCost;
      return { success: false, message: '融合失败，功法损毁！' };
    }

    player.gold -= fusionCost;

    const fusedTechnique = this.createFusedTechnique(techniques);
    player.techniques.push(fusedTechnique);

    techIds.forEach(id => {
      player.techniques = player.techniques.filter(t => t.id !== id);
    });

    return { success: true, fusedTechnique, message: `成功融合出 ${fusedTechnique.name}！` };
  }

  static calculateFusionCost(techniques: ITechnique[]): number {
    let cost = 1000;
    techniques.forEach(tech => {
      const qualityMultiplier = {
        [TechniqueQuality.COMMON]: 1,
        [TechniqueQuality.BEAST]: 3,
        [TechniqueQuality.PURE]: 5,
        [TechniqueQuality.LEGEND]: 10,
        [TechniqueQuality.SUPREME]: 20,
      };
      cost += tech.baseDamage * qualityMultiplier[tech.quality] * 10;
    });
    return cost;
  }

  static calculateFusionSuccessRate(techniques: ITechnique[]): number {
    let baseRate = 0.6;
    const elementCompatibility = this.checkElementCompatibility(techniques);
    baseRate += elementCompatibility * 0.2;
    
    if (techniques.length > 3) {
      baseRate -= (techniques.length - 3) * 0.1;
    }

    return Math.max(0.2, Math.min(0.95, baseRate));
  }

  static checkElementCompatibility(techniques: ITechnique[]): number {
    const elements = techniques.map(t => t.element);
    const uniqueElements = new Set(elements);
    
    if (uniqueElements.size === 1) return 1;
    
    const compatiblePairs = [
      ['fire', 'wind'],
      ['water', 'ice'],
      ['thunder', 'earth'],
      ['light', 'dark'],
    ];
    
    for (const pair of compatiblePairs) {
      if (pair.every(e => elements.includes(e as any))) {
        return 0.8;
      }
    }
    
    return 0.5;
  }

  static createFusedTechnique(techniques: ITechnique[]): ITechnique {
    const avgDamage = Math.floor(techniques.reduce((sum, t) => sum + t.baseDamage, 0) / techniques.length);
    const avgManaCost = Math.floor(techniques.reduce((sum, t) => sum + t.manaCost, 0) / techniques.length);
    
    const fusedName = techniques.map(t => t.name.slice(0, 2)).join('') + '融合';
    
    const elements = techniques.map(t => t.element);
    const mainElement = elements[0];

    const qualities = [TechniqueQuality.COMMON, TechniqueQuality.BEAST, TechniqueQuality.PURE, TechniqueQuality.LEGEND, TechniqueQuality.SUPREME];
    const maxQualityIndex = Math.max(...techniques.map(t => qualities.indexOf(t.quality)));
    const fusedQuality = qualities[Math.min(maxQualityIndex + 1, qualities.length - 1)];

    return {
      id: `fused_${Date.now()}`,
      name: fusedName,
      quality: fusedQuality,
      source: TechniqueSource.OTHER,
      baseDamage: Math.floor(avgDamage * (1 + techniques.length * 0.1)),
      manaCost: Math.floor(avgManaCost * (1 + techniques.length * 0.05)),
      cooldown: Math.max(1, Math.floor(techniques.reduce((sum, t) => sum + t.cooldown, 0) / techniques.length) - 1),
      description: `融合了${techniques.map(t => t.name).join('、')}的力量`,
      originStory: '通过功法融合创造的全新功法',
      element: mainElement,
      proficiency: 0,
      maxProficiency: Math.floor(techniques.reduce((sum, t) => sum + t.maxProficiency, 0) * 0.8),
      requiredRealm: Math.max(...techniques.map(t => t.requiredRealm)),
    };
  }

  static checkBonds(player: IPlayer): ITechniqueBond[] {
    const playerTechIds = new Set(player.techniques.map(t => t.id));
    const activeBonds: ITechniqueBond[] = [];

    for (const bond of TECHNIQUE_BONDS) {
      if (bond.techniqueIds.every(id => playerTechIds.has(id))) {
        activeBonds.push(bond);
      }
    }

    return activeBonds;
  }

  static getBondBonuses(bonds: ITechniqueBond[]): { damage: number; critRate: number; cooldownReduction: number } {
    return bonds.reduce(
      (total, bond) => ({
        damage: total.damage + bond.bonus.damage,
        critRate: total.critRate + bond.bonus.critRate,
        cooldownReduction: total.cooldownReduction + bond.bonus.cooldownReduction,
      }),
      { damage: 0, critRate: 0, cooldownReduction: 0 }
    );
  }

  static calculateCounterBonus(attackElement: TechniqueElement, defenseElement: TechniqueElement): { multiplier: number; effect: string } {
    const counter = TECHNIQUE_ELEMENT_COUNTER.find(
      c => c.attacker === attackElement && c.defender === defenseElement
    );

    if (counter) {
      return { multiplier: counter.damageMultiplier, effect: counter.effect };
    }

    return { multiplier: 1.0, effect: '' };
  }

  static upgradeTechnique(player: IPlayer, techniqueId: string, materials: string[]): { success: boolean; message: string; upgradedTechnique?: ITechnique } {
    const technique = player.techniques.find(t => t.id === techniqueId);
    if (!technique) {
      return { success: false, message: '未找到该功法' };
    }

    if (technique.proficiency >= technique.maxProficiency) {
      return { success: false, message: '功法已达最高熟练度' };
    }

    const upgradeCost = this.calculateUpgradeCost(technique);
    if (player.gold < upgradeCost) {
      return { success: false, message: '金币不足' };
    }

    player.gold -= upgradeCost;
    technique.proficiency = Math.min(technique.maxProficiency, technique.proficiency + 100);
    technique.baseDamage = Math.floor(technique.baseDamage * 1.05);

    return { success: true, message: `${technique.name}升级成功！`, upgradedTechnique: technique };
  }

  static calculateUpgradeCost(technique: ITechnique): number {
    const qualityMultiplier = {
      [TechniqueQuality.COMMON]: 1,
      [TechniqueQuality.BEAST]: 2,
      [TechniqueQuality.PURE]: 4,
      [TechniqueQuality.LEGEND]: 8,
      [TechniqueQuality.SUPREME]: 16,
    };
    return Math.floor(100 * qualityMultiplier[technique.quality] * (technique.proficiency / 100));
  }
}