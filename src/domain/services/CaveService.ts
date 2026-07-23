/**
 * 洞府系统服务
 * 独立于命令层，负责洞府管理、种植、宠物、装饰等核心逻辑
 */

import { ICave, ICavePlant, ICavePet, CaveQuality, CAVE_QUALITIES, SEED_PLANTS, SEED_PETS } from '../entities/Cave';
import { CultivationRealm } from '../entities/Player';

export interface ICaveDecoration {
  id: string;
  name: string;
  icon: string;
  description: string;
  type: 'furniture' | 'formation' | 'spirit_item' | 'landscape';
  effects: {
    spiritDensityBonus?: number;
    cultivationBonus?: number;
    plantGrowthBonus?: number;
    petLoyaltyBonus?: number;
  };
  price: number;
  requiredQuality?: CaveQuality;
}

export interface IPetCombatAssist {
  petId: string;
  petName: string;
  attackBonus: number;
  defenseBonus: number;
  skillName: string;
  skillDescription: string;
  triggerChance: number;
}

export const CAVE_DECORATIONS: ICaveDecoration[] = [
  {
    id: 'dec_spirit_bed',
    name: '灵木床榻',
    icon: '🛏',
    description: '以灵木打造的床榻，休息时恢复更快',
    type: 'furniture',
    effects: { cultivationBonus: 5 },
    price: 200,
  },
  {
    id: 'dec_spirit_pool',
    name: '灵泉小池',
    icon: '💧',
    description: '洞府内自然涌出的灵泉，提升灵气浓度',
    type: 'spirit_item',
    effects: { spiritDensityBonus: 0.2, cultivationBonus: 10 },
    price: 500,
    requiredQuality: CaveQuality.SPIRIT,
  },
  {
    id: 'dec_gather_array',
    name: '聚灵阵盘',
    icon: '🔯',
    description: '小型聚灵阵法，大幅提升灵气浓度',
    type: 'formation',
    effects: { spiritDensityBonus: 0.5, cultivationBonus: 15 },
    price: 1000,
    requiredQuality: CaveQuality.SPIRIT,
  },
  {
    id: 'dec_spirit_tree',
    name: '万年灵树',
    icon: '🌳',
    description: '洞府中生长的灵树，加速植物生长',
    type: 'landscape',
    effects: { plantGrowthBonus: 20, spiritDensityBonus: 0.3 },
    price: 800,
    requiredQuality: CaveQuality.SPIRIT,
  },
  {
    id: 'dec_beast_statue',
    name: '瑞兽石像',
    icon: '🦁',
    description: '洞府门口的瑞兽石像，提升宠物忠诚度',
    type: 'landscape',
    effects: { petLoyaltyBonus: 10 },
    price: 600,
  },
  {
    id: 'dec_dragon_pillar',
    name: '盘龙柱',
    icon: '🐉',
    description: '刻有龙纹的石柱，镇压洞府气运',
    type: 'formation',
    effects: { spiritDensityBonus: 0.8, cultivationBonus: 25, plantGrowthBonus: 10 },
    price: 3000,
    requiredQuality: CaveQuality.DIVINE,
  },
  {
    id: 'dec_immortal_forge',
    name: '仙火炉鼎',
    icon: '🔥',
    description: '以仙火为源的炉鼎，可辅助炼丹炼器',
    type: 'spirit_item',
    effects: { cultivationBonus: 30, spiritDensityBonus: 1.0 },
    price: 5000,
    requiredQuality: CaveQuality.DIVINE,
  },
  {
    id: 'dec_chaos_pool',
    name: '混沌灵池',
    icon: '🌌',
    description: '蕴含混沌之力的灵池，全方位提升洞府',
    type: 'spirit_item',
    effects: { spiritDensityBonus: 2.0, cultivationBonus: 50, plantGrowthBonus: 30, petLoyaltyBonus: 20 },
    price: 20000,
    requiredQuality: CaveQuality.IMMORTAL,
  },
];

export const PET_COMBAT_SKILLS: Record<string, { name: string; description: string; triggerChance: number; damageMultiplier: number }> = {
  spirit_fox: { name: '灵狐幻术', description: '灵狐施展幻术迷惑敌人，降低其攻击', triggerChance: 0.25, damageMultiplier: 0.3 },
  wind_hawk: { name: '风鹰突击', description: '风鹰从空中俯冲攻击', triggerChance: 0.3, damageMultiplier: 0.4 },
  stone_beast: { name: '石兽护主', description: '石兽挡在主人面前，减少受到的伤害', triggerChance: 0.35, damageMultiplier: 0 },
  fire_lion: { name: '火狮咆哮', description: '火狮发出震天咆哮，对敌人造成火焰伤害', triggerChance: 0.2, damageMultiplier: 0.5 },
};

export class CaveService {
  private static instance: CaveService;

  private constructor() {}

  static getInstance(): CaveService {
    if (!CaveService.instance) {
      CaveService.instance = new CaveService();
    }
    return CaveService.instance;
  }

  createCave(playerRealm: CultivationRealm, playerName: string): ICave {
    return {
      id: `cave_${Date.now()}`,
      name: `${playerName}的洞天`,
      quality: CaveQuality.MORTAL,
      realm: playerRealm,
      spiritDensity: 1.0,
      size: 3,
      plants: [],
      pets: [],
      decorations: [],
      lastVisitTime: Date.now(),
    };
  }

  getUpgradeCost(currentQuality: CaveQuality): number | null {
    const upgrades: Partial<Record<CaveQuality, number>> = {
      [CaveQuality.MORTAL]: 100,
      [CaveQuality.SPIRIT]: 500,
      [CaveQuality.DIVINE]: 2000,
    };
    return upgrades[currentQuality] ?? null;
  }

  canUpgrade(cave: ICave): boolean {
    return cave.quality !== CaveQuality.IMMORTAL;
  }

  upgradeCave(cave: ICave, gold: number): { success: boolean; newQuality?: CaveQuality; cost: number; message: string } {
    if (!this.canUpgrade(cave)) {
      return { success: false, cost: 0, message: '洞天已达最高品质' };
    }

    const cost = this.getUpgradeCost(cave.quality);
    if (cost === null) {
      return { success: false, cost: 0, message: '无法升级' };
    }

    if (gold < cost) {
      return { success: false, cost, message: `灵石不足，需要 ${cost} 灵石` };
    }

    const order = [CaveQuality.MORTAL, CaveQuality.SPIRIT, CaveQuality.DIVINE, CaveQuality.IMMORTAL];
    const currentIndex = order.indexOf(cave.quality);
    const newQuality = order[currentIndex + 1];
    cave.quality = newQuality;
    const config = CAVE_QUALITIES[newQuality];
    cave.spiritDensity = config.spiritBonus;
    cave.size = config.maxSize;

    return {
      success: true,
      newQuality,
      cost,
      message: `洞天升级为「${config.name}」！灵气浓度提升至 ${config.spiritBonus}，种植位扩展至 ${config.maxSize} 个。`,
    };
  }

  plantSeed(cave: ICave, plantId: string): { success: boolean; message: string; plant?: ICavePlant } {
    const seedData = SEED_PLANTS[plantId];
    if (!seedData) {
      return { success: false, message: '未知的种子' };
    }

    if (cave.plants.length >= cave.size) {
      return { success: false, message: '种植位已满，请先收获或升级洞天' };
    }

    const growthBonus = this.getPlantGrowthBonus(cave);
    const adjustedGrowthTime = Math.floor(seedData.growthTime * (1 - growthBonus / 100));

    const plant: ICavePlant = {
      id: `plant_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      plantId,
      name: seedData.name,
      plantedTime: Date.now(),
      growthStage: 0,
      maxGrowthStage: seedData.maxStage,
      harvestTime: Date.now() + adjustedGrowthTime,
      yield: seedData.yield,
    };

    cave.plants.push(plant);
    return {
      success: true,
      message: `成功种下${seedData.name}，预计 ${Math.ceil(adjustedGrowthTime / 60000)} 分钟后成熟`,
      plant,
    };
  }

  harvestPlant(cave: ICave, plantId: string): { success: boolean; message: string; yield?: number; plantName?: string } {
    const plantIndex = cave.plants.findIndex(p => p.id === plantId);
    if (plantIndex < 0) {
      return { success: false, message: '未找到此植物' };
    }

    const plant = cave.plants[plantIndex];
    const now = Date.now();
    if (now < plant.harvestTime) {
      const remaining = Math.ceil((plant.harvestTime - now) / 60000);
      return { success: false, message: `${plant.name}尚未成熟，还需 ${remaining} 分钟` };
    }

    cave.plants.splice(plantIndex, 1);
    return {
      success: true,
      message: `收获${plant.name} ×${plant.yield}`,
      yield: plant.yield,
      plantName: plant.name,
    };
  }

  getPlantGrowthProgress(cave: ICave, plantId: string): { stage: number; maxStage: number; percentage: number; isReady: boolean } {
    const plant = cave.plants.find(p => p.id === plantId);
    if (!plant) return { stage: 0, maxStage: 0, percentage: 0, isReady: false };

    const now = Date.now();
    const totalTime = plant.harvestTime - plant.plantedTime;
    const elapsed = Math.min(now - plant.plantedTime, totalTime);
    const percentage = Math.floor((elapsed / totalTime) * 100);
    const stage = Math.min(plant.maxGrowthStage, Math.floor((elapsed / totalTime) * plant.maxGrowthStage));
    const isReady = now >= plant.harvestTime;

    return { stage, maxStage: plant.maxGrowthStage, percentage, isReady };
  }

  buyPet(cave: ICave, petId: string, gold: number): { success: boolean; message: string; pet?: ICavePet; cost: number } {
    const petData = SEED_PETS[petId];
    if (!petData) {
      return { success: false, message: '未知的灵兽', cost: 0 };
    }

    const cost = petData.baseAttack * 50 + petData.baseDefense * 50;
    if (gold < cost) {
      return { success: false, message: `灵石不足，需要 ${cost} 灵石`, cost };
    }

    const maxPets = Math.floor(cave.size / 2);
    if (cave.pets.length >= maxPets) {
      return { success: false, message: `灵兽栏已满（上限 ${maxPets} 只），请升级洞天`, cost };
    }

    const pet: ICavePet = {
      id: `pet_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      petId,
      name: petData.name,
      level: 1,
      exp: 0,
      maxExp: petData.expPerLevel,
      attack: petData.baseAttack,
      defense: petData.baseDefense,
      loyalty: 50,
    };

    cave.pets.push(pet);
    return {
      success: true,
      message: `成功收服${petData.name}！`,
      pet,
      cost,
    };
  }

  feedPet(cave: ICave, petId: string): { success: boolean; message: string; loyaltyGain?: number } {
    const pet = cave.pets.find(p => p.id === petId);
    if (!pet) {
      return { success: false, message: '未找到此灵兽' };
    }

    const loyaltyBonus = this.getPetLoyaltyBonus(cave);
    const gain = 5 + Math.floor(loyaltyBonus / 5);
    pet.loyalty = Math.min(100, pet.loyalty + gain);

    return {
      success: true,
      message: `${pet.name}的忠诚度提升 ${gain} 点（当前 ${pet.loyalty}）`,
      loyaltyGain: gain,
    };
  }

  gainPetExp(cave: ICave, petId: string, exp: number): { leveledUp: boolean; newLevel?: number; message: string } {
    const pet = cave.pets.find(p => p.id === petId);
    if (!pet) {
      return { leveledUp: false, message: '未找到此灵兽' };
    }

    pet.exp += exp;
    let leveledUp = false;

    while (pet.exp >= pet.maxExp) {
      pet.exp -= pet.maxExp;
      pet.level++;
      const petData = SEED_PETS[pet.petId];
      if (petData) {
        pet.attack += Math.floor(petData.baseAttack * 0.3);
        pet.defense += Math.floor(petData.baseDefense * 0.3);
        pet.maxExp = Math.floor(pet.maxExp * 1.5);
      }
      leveledUp = true;
    }

    return {
      leveledUp,
      newLevel: leveledUp ? pet.level : undefined,
      message: leveledUp ? `${pet.name}升级到 ${pet.level} 级！攻击力+${pet.attack}，防御力+${pet.defense}` : `${pet.name}获得 ${exp} 经验`,
    };
  }

  getPetCombatAssist(cave: ICave): IPetCombatAssist[] {
    return cave.pets
      .filter(pet => pet.loyalty >= 30)
      .map(pet => {
        const skill = PET_COMBAT_SKILLS[pet.petId];
        if (!skill) return null;

        const loyaltyMultiplier = 0.5 + pet.loyalty / 200;
        const levelMultiplier = 1 + pet.level * 0.1;

        return {
          petId: pet.id,
          petName: pet.name,
          attackBonus: Math.floor(pet.attack * levelMultiplier),
          defenseBonus: Math.floor(pet.defense * levelMultiplier * 0.5),
          skillName: skill.name,
          skillDescription: skill.description,
          triggerChance: skill.triggerChance * loyaltyMultiplier,
        };
      })
      .filter((assist): assist is IPetCombatAssist => assist !== null);
  }

  buyDecoration(cave: ICave, decorationId: string, gold: number): { success: boolean; message: string; cost: number } {
    const decoration = CAVE_DECORATIONS.find(d => d.id === decorationId);
    if (!decoration) {
      return { success: false, message: '未知的装饰', cost: 0 };
    }

    if (cave.decorations.includes(decorationId)) {
      return { success: false, message: '已拥有此装饰', cost: 0 };
    }

    if (decoration.requiredQuality) {
      const qualityOrder = [CaveQuality.MORTAL, CaveQuality.SPIRIT, CaveQuality.DIVINE, CaveQuality.IMMORTAL];
      const caveQualityIndex = qualityOrder.indexOf(cave.quality);
      const requiredIndex = qualityOrder.indexOf(decoration.requiredQuality);
      if (caveQualityIndex < requiredIndex) {
        return { success: false, message: `需要${CAVE_QUALITIES[decoration.requiredQuality].name}品质才能购买`, cost: 0 };
      }
    }

    if (gold < decoration.price) {
      return { success: false, message: `灵石不足，需要 ${decoration.price} 灵石`, cost: decoration.price };
    }

    cave.decorations.push(decorationId);
    return {
      success: true,
      message: `成功购买「${decoration.name}」！${this.formatDecorationEffects(decoration)}`,
      cost: decoration.price,
    };
  }

  removeDecoration(cave: ICave, decorationId: string): boolean {
    const index = cave.decorations.indexOf(decorationId);
    if (index < 0) return false;
    cave.decorations.splice(index, 1);
    return true;
  }

  getDecorationInfo(decorationId: string): ICaveDecoration | undefined {
    return CAVE_DECORATIONS.find(d => d.id === decorationId);
  }

  getCaveDecorations(cave: ICave): ICaveDecoration[] {
    return cave.decorations
      .map(id => CAVE_DECORATIONS.find(d => d.id === id))
      .filter((d): d is ICaveDecoration => d !== undefined);
  }

  getAvailableDecorations(cave: ICave): ICaveDecoration[] {
    return CAVE_DECORATIONS.filter(d => !cave.decorations.includes(d.id));
  }

  getTotalSpiritDensityBonus(cave: ICave): number {
    return this.getCaveDecorations(cave).reduce((sum, d) => sum + (d.effects.spiritDensityBonus || 0), 0);
  }

  getTotalCultivationBonus(cave: ICave): number {
    return this.getCaveDecorations(cave).reduce((sum, d) => sum + (d.effects.cultivationBonus || 0), 0);
  }

  getPlantGrowthBonus(cave: ICave): number {
    return this.getCaveDecorations(cave).reduce((sum, d) => sum + (d.effects.plantGrowthBonus || 0), 0);
  }

  getPetLoyaltyBonus(cave: ICave): number {
    return this.getCaveDecorations(cave).reduce((sum, d) => sum + (d.effects.petLoyaltyBonus || 0), 0);
  }

  getEffectiveSpiritDensity(cave: ICave): number {
    return cave.spiritDensity + this.getTotalSpiritDensityBonus(cave);
  }

  getCultivationMultiplier(cave: ICave): number {
    const baseMultiplier = this.getEffectiveSpiritDensity(cave);
    const bonusMultiplier = 1 + this.getTotalCultivationBonus(cave) / 100;
    return baseMultiplier * bonusMultiplier;
  }

  private formatDecorationEffects(decoration: ICaveDecoration): string {
    const parts: string[] = [];
    if (decoration.effects.spiritDensityBonus) parts.push(`灵气+${decoration.effects.spiritDensityBonus}`);
    if (decoration.effects.cultivationBonus) parts.push(`修炼+${decoration.effects.cultivationBonus}%`);
    if (decoration.effects.plantGrowthBonus) parts.push(`生长+${decoration.effects.plantGrowthBonus}%`);
    if (decoration.effects.petLoyaltyBonus) parts.push(`忠诚+${decoration.effects.petLoyaltyBonus}`);
    return parts.length > 0 ? `（${parts.join('，')}）` : '';
  }

  getCaveSummary(cave: ICave): {
    quality: string;
    spiritDensity: number;
    effectiveSpiritDensity: number;
    cultivationMultiplier: number;
    plantSlots: { used: number; max: number };
    petSlots: { used: number; max: number };
    decorationCount: number;
    readyPlants: number;
  } {
    const readyPlants = cave.plants.filter(p => Date.now() >= p.harvestTime).length;
    return {
      quality: CAVE_QUALITIES[cave.quality].name,
      spiritDensity: cave.spiritDensity,
      effectiveSpiritDensity: this.getEffectiveSpiritDensity(cave),
      cultivationMultiplier: this.getCultivationMultiplier(cave),
      plantSlots: { used: cave.plants.length, max: cave.size },
      petSlots: { used: cave.pets.length, max: Math.floor(cave.size / 2) },
      decorationCount: cave.decorations.length,
      readyPlants,
    };
  }
}

export function getCaveQualityName(quality: CaveQuality): string {
  return CAVE_QUALITIES[quality]?.name || quality;
}
