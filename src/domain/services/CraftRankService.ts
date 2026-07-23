import { IPlayer } from '../entities/Player';
import { IItem } from '../entities/Item';
import {
  AlchemistRank, FormationMasterRank, BoneScriptRank,
  ALCHEMIST_RANK_CONFIG, FORMATION_RANK_CONFIG, BONE_SCRIPT_RANK_CONFIG,
  getAlchemistRank, getFormationRank, getBoneScriptRank,
  canLearnAlchemyRecipe, canLearnFormation,
} from '../entities/CraftRank';
import { IAlchemyRecipe, ALCHEMY_RECIPES, PillGrade } from '../entities/Alchemy';
import { IArrayFormation, ARRAY_FORMATIONS, ArrayFormationTier } from '../entities/ArrayFormation';

/**
 * 炼制师品阶服务层
 *
 * 负责：
 * - 炼丹师/阵法师品阶升级（基于经验）
 * - 丹方/阵法学习（品阶联动校验）
 * - 骨文铭刻（接入装备强化流程）
 * - 器灵契约（接入装备觉醒流程）
 * - 品阶加成计算（成功率、产出、效果）
 */

export interface IRankUpResult {
  success: boolean;
  message: string;
  newRank?: AlchemistRank | FormationMasterRank | BoneScriptRank;
}

export interface ILearnResult {
  success: boolean;
  message: string;
  recipe?: IAlchemyRecipe;
  formation?: IArrayFormation;
}

export interface IInscribeResult {
  success: boolean;
  message: string;
  /** 铭刻后属性加成 */
  attributeBonus?: { attack?: number; defense?: number; speed?: number };
  /** 是否触发骨文共鸣（额外效果） */
  resonance?: boolean;
}

export interface ISpiritBondResult {
  success: boolean;
  message: string;
  /** 器灵觉醒后的额外效果 */
  spiritEffect?: string;
}

export class CraftRankService {
  // ============= 炼丹师品阶 =============

  /** 获取玩家当前炼丹师品阶 */
  static getAlchemistRank(player: IPlayer): AlchemistRank {
    return getAlchemistRank(player.alchemySkill?.exp || 0);
  }

  /** 获取炼丹师品阶配置 */
  static getAlchemistRankConfig(player: IPlayer) {
    const rank = this.getAlchemistRank(player);
    return ALCHEMIST_RANK_CONFIG[rank];
  }

  /** 检查炼丹师品阶升级 */
  static checkAlchemistRankUp(player: IPlayer): IRankUpResult {
    if (!player.alchemySkill) {
      return { success: false, message: '炼丹技能未初始化。' };
    }
    const currentRank = this.getAlchemistRank(player);
    const nextRank = this.getNextAlchemistRank(currentRank);
    if (!nextRank) {
      return { success: false, message: '已达炼丹帝师之境，无法再进一步。' };
    }
    const nextConfig = ALCHEMIST_RANK_CONFIG[nextRank];
    if (player.alchemySkill.exp < nextConfig.requiredExp) {
      return { success: false, message: `经验不足，需要 ${nextConfig.requiredExp} 点（当前 ${player.alchemySkill.exp}）。` };
    }
    return {
      success: true,
      message: `**【品阶提升】** 炼丹师品阶升至「${nextRank}」！${nextConfig.description}`,
      newRank: nextRank,
    };
  }

  /** 学习丹方（品阶联动校验） */
  static learnAlchemyRecipe(player: IPlayer, recipeId: string): ILearnResult {
    const recipe = ALCHEMY_RECIPES.find(r => r.id === recipeId || r.name === recipeId);
    if (!recipe) {
      return { success: false, message: '丹方不存在。' };
    }
    if (!player.learnedAlchemyRecipes) {
      player.learnedAlchemyRecipes = [];
    }
    if (player.learnedAlchemyRecipes.includes(recipe.id)) {
      return { success: false, message: `已学会丹方「${recipe.name}」。` };
    }
    const rank = this.getAlchemistRank(player);
    if (!canLearnAlchemyRecipe(rank, recipe.grade)) {
      return {
        success: false,
        message: `品阶不足！当前「${rank}」仅可学习${ALCHEMIST_RANK_CONFIG[rank].maxRecipeGrade}及以下丹方，「${recipe.name}」为${recipe.grade}。`,
      };
    }
    player.learnedAlchemyRecipes.push(recipe.id);
    return {
      success: true,
      message: `学会丹方「${recipe.name}」（${recipe.grade}）！`,
      recipe,
    };
  }

  /** 获取玩家可学习的丹方列表（受品阶限制） */
  static getLearnableAlchemyRecipes(player: IPlayer): IAlchemyRecipe[] {
    const rank = this.getAlchemistRank(player);
    const learned = player.learnedAlchemyRecipes || [];
    return ALCHEMY_RECIPES.filter(r =>
      !learned.includes(r.id) && canLearnAlchemyRecipe(rank, r.grade)
    );
  }

  // ============= 阵法师品阶 =============

  /** 获取玩家当前阵法师品阶 */
  static getFormationRank(player: IPlayer): FormationMasterRank {
    return getFormationRank(player.formationSkill?.exp || 0);
  }

  /** 获取阵法师品阶配置 */
  static getFormationRankConfig(player: IPlayer) {
    const rank = this.getFormationRank(player);
    return FORMATION_RANK_CONFIG[rank];
  }

  /** 检查阵法师品阶升级 */
  static checkFormationRankUp(player: IPlayer): IRankUpResult {
    if (!player.formationSkill) {
      return { success: false, message: '阵法技能未初始化。' };
    }
    const currentRank = this.getFormationRank(player);
    const nextRank = this.getNextFormationRank(currentRank);
    if (!nextRank) {
      return { success: false, message: '已达阵法帝师之境，无法再进一步。' };
    }
    const nextConfig = FORMATION_RANK_CONFIG[nextRank];
    if (player.formationSkill.exp < nextConfig.requiredExp) {
      return { success: false, message: `经验不足，需要 ${nextConfig.requiredExp} 点（当前 ${player.formationSkill.exp}）。` };
    }
    return {
      success: true,
      message: `**【品阶提升】** 阵法师品阶升至「${nextRank}」！${nextConfig.description}`,
      newRank: nextRank,
    };
  }

  /** 学习阵法（品阶联动校验） */
  static learnFormation(player: IPlayer, formationId: string): ILearnResult {
    const formation = ARRAY_FORMATIONS.find(f => f.id === formationId || f.name === formationId);
    if (!formation) {
      return { success: false, message: '阵法不存在。' };
    }
    if (!player.learnedFormations) {
      player.learnedFormations = [];
    }
    if (player.learnedFormations.includes(formation.id)) {
      return { success: false, message: `已学会阵法「${formation.name}」。` };
    }
    const rank = this.getFormationRank(player);
    if (!canLearnFormation(rank, formation.tier)) {
      return {
        success: false,
        message: `品阶不足！当前「${rank}」仅可学习${FORMATION_RANK_CONFIG[rank].maxFormationTier}及以下阵法，「${formation.name}」为${formation.tier}。`,
      };
    }
    player.learnedFormations.push(formation.id);
    return {
      success: true,
      message: `学会阵法「${formation.name}」！`,
      formation,
    };
  }

  /** 获取玩家可学习的阵法列表（受品阶限制） */
  static getLearnableFormations(player: IPlayer): IArrayFormation[] {
    const rank = this.getFormationRank(player);
    const learned = player.learnedFormations || [];
    return ARRAY_FORMATIONS.filter(f =>
      !learned.includes(f.id) && canLearnFormation(rank, f.tier)
    );
  }

  // ============= 骨文铭刻 =============

  /** 获取玩家当前骨文品阶 */
  static getBoneScriptRank(player: IPlayer): BoneScriptRank {
    return getBoneScriptRank(player.boneScriptLevel || 0);
  }

  /** 获取骨文品阶配置 */
  static getBoneScriptRankConfig(player: IPlayer) {
    const rank = this.getBoneScriptRank(player);
    return BONE_SCRIPT_RANK_CONFIG[rank];
  }

  /**
   * 骨文铭刻：将骨文铭刻至装备，提升装备属性
   * 受骨文品阶限制（品阶决定可铭刻装备等级与属性倍率）
   */
  static inscribeBoneScript(player: IPlayer, item: IItem): IInscribeResult {
    const rank = this.getBoneScriptRank(player);
    const config = BONE_SCRIPT_RANK_CONFIG[rank];

    if (rank === BoneScriptRank.NONE) {
      return { success: false, message: '尚未入门骨文铭刻，需先学习骨文之道。' };
    }

    // 检查装备品阶（item.rarity 假设为 1-7）
    const itemGrade = (item as any).rarity || 1;
    if (itemGrade > config.maxItemGrade) {
      return {
        success: false,
        message: `品阶不足！当前「${rank}」仅可铭刻${config.maxItemGrade}级装备，此装备为${itemGrade}级。`,
      };
    }

    // 检查是否已铭刻
    if ((item as any).boneScriptInscribed) {
      return { success: false, message: '此装备已铭刻骨文，无法重复铭刻。' };
    }

    // 计算属性加成
    const multiplier = config.attributeMultiplier;
    const baseAttack = (item as any).attack || 0;
    const baseDefense = (item as any).defense || 0;
    const baseSpeed = (item as any).speed || 0;

    const attackBonus = Math.floor(baseAttack * (multiplier - 1));
    const defenseBonus = Math.floor(baseDefense * (multiplier - 1));
    const speedBonus = Math.floor(baseSpeed * (multiplier - 1));

    // 应用加成
    if (attackBonus > 0) (item as any).attack = baseAttack + attackBonus;
    if (defenseBonus > 0) (item as any).defense = baseDefense + defenseBonus;
    if (speedBonus > 0) (item as any).speed = baseSpeed + speedBonus;
    (item as any).boneScriptInscribed = true;
    (item as any).boneScriptRank = rank;

    // 检查骨文共鸣（10% 概率）
    const resonance = Math.random() < 0.1;
    if (resonance) {
      // 共鸣额外加成
      const extraAttack = Math.floor(attackBonus * 0.5);
      const extraDefense = Math.floor(defenseBonus * 0.5);
      if (extraAttack > 0) (item as any).attack += extraAttack;
      if (extraDefense > 0) (item as any).defense += extraDefense;
    }

    return {
      success: true,
      message: `成功为【${item.name}】铭刻骨文！品阶「${rank}」${resonance ? '，触发骨文共鸣！' : ''}`,
      attributeBonus: { attack: attackBonus, defense: defenseBonus, speed: speedBonus },
      resonance,
    };
  }

  // ============= 器灵契约 =============

  /**
   * 器灵契约：与装备中的器灵缔结契约，觉醒装备潜能
   * 需要骨文品阶达到 ADEPT 以上
   */
  static bondSpirit(player: IPlayer, item: IItem): ISpiritBondResult {
    const rank = this.getBoneScriptRank(player);
    const rankOrder = [
      BoneScriptRank.NONE, BoneScriptRank.INITIATE, BoneScriptRank.APPRENTICE,
      BoneScriptRank.ADEPT, BoneScriptRank.MASTER, BoneScriptRank.GRANDMASTER,
      BoneScriptRank.SAGE, BoneScriptRank.EMPEROR,
    ];
    const currentIdx = rankOrder.indexOf(rank);

    if (currentIdx < rankOrder.indexOf(BoneScriptRank.ADEPT)) {
      return {
        success: false,
        message: `骨文品阶不足！需达到「${BoneScriptRank.ADEPT}」方可契约器灵。`,
      };
    }

    if (!(item as any).boneScriptInscribed) {
      return { success: false, message: '装备尚未铭刻骨文，无法觉醒器灵。' };
    }

    if ((item as any).spiritBonded) {
      return { success: false, message: '此装备已觉醒器灵。' };
    }

    // 生成器灵ID
    const spiritId = `spirit_${item.id}_${Date.now()}`;
    if (!player.bondedSpiritIds) {
      player.bondedSpiritIds = [];
    }
    player.bondedSpiritIds.push(spiritId);
    (item as any).spiritBonded = true;
    (item as any).spiritId = spiritId;

    // 器灵觉醒效果（基于骨文品阶）
    const config = BONE_SCRIPT_RANK_CONFIG[rank];
    const effectMultiplier = config.attributeMultiplier;
    const baseAttack = (item as any).attack || 0;
    const baseDefense = (item as any).defense || 0;

    const spiritAttack = Math.floor(baseAttack * (effectMultiplier - 1) * 0.5);
    const spiritDefense = Math.floor(baseDefense * (effectMultiplier - 1) * 0.5);

    if (spiritAttack > 0) (item as any).attack += spiritAttack;
    if (spiritDefense > 0) (item as any).defense += spiritDefense;

    const spiritEffect = `器灵觉醒：攻击+${spiritAttack}，防御+${spiritDefense}（品阶「${rank}」）`;

    return {
      success: true,
      message: `**【器灵觉醒】** 装备【${item.name}】觉醒器灵！${spiritEffect}`,
      spiritEffect,
    };
  }

  // ============= 经验加成 =============

  /** 炼丹成功时增加经验 */
  static addAlchemyExp(player: IPlayer, exp: number): { leveledUp: boolean; newRank?: AlchemistRank; message?: string } {
    if (!player.alchemySkill) {
      player.alchemySkill = { level: 1, exp: 0, maxExp: 200 };
    }
    const oldRank = this.getAlchemistRank(player);
    player.alchemySkill.exp += exp;
    if (player.alchemySkill.exp > player.alchemySkill.maxExp) {
      player.alchemySkill.maxExp = Math.floor(player.alchemySkill.maxExp * 1.5);
    }
    const newRank = this.getAlchemistRank(player);
    if (newRank !== oldRank) {
      return {
        leveledUp: true,
        newRank,
        message: `**【品阶提升】** 炼丹师品阶升至「${newRank}」！${ALCHEMIST_RANK_CONFIG[newRank].description}`,
      };
    }
    return { leveledUp: false };
  }

  /** 布阵成功时增加经验 */
  static addFormationExp(player: IPlayer, exp: number): { leveledUp: boolean; newRank?: FormationMasterRank; message?: string } {
    if (!player.formationSkill) {
      player.formationSkill = { level: 1, exp: 0, maxExp: 200 };
    }
    const oldRank = this.getFormationRank(player);
    player.formationSkill.exp += exp;
    if (player.formationSkill.exp > player.formationSkill.maxExp) {
      player.formationSkill.maxExp = Math.floor(player.formationSkill.maxExp * 1.5);
    }
    const newRank = this.getFormationRank(player);
    if (newRank !== oldRank) {
      return {
        leveledUp: true,
        newRank,
        message: `**【品阶提升】** 阵法师品阶升至「${newRank}」！${FORMATION_RANK_CONFIG[newRank].description}`,
      };
    }
    return { leveledUp: false };
  }

  /** 铭刻成功时增加骨文等级 */
  static addBoneScriptExp(player: IPlayer, exp: number): { leveledUp: boolean; newRank?: BoneScriptRank; message?: string } {
    const oldRank = this.getBoneScriptRank(player);
    if (!player.boneScriptLevel) player.boneScriptLevel = 0;
    player.boneScriptLevel += Math.max(1, Math.floor(exp / 50));
    const newRank = this.getBoneScriptRank(player);
    if (newRank !== oldRank) {
      return {
        leveledUp: true,
        newRank,
        message: `**【品阶提升】** 骨文铭刻品阶升至「${newRank}」！${BONE_SCRIPT_RANK_CONFIG[newRank].description}`,
      };
    }
    return { leveledUp: false };
  }

  // ============= 辅助方法 =============

  private static getNextAlchemistRank(rank: AlchemistRank): AlchemistRank | null {
    const order = [
      AlchemistRank.APPRENTICE, AlchemistRank.DISCIPLE, AlchemistRank.MASTER,
      AlchemistRank.GRANDMASTER, AlchemistRank.ELDER, AlchemistRank.GREAT_ELDER,
      AlchemistRank.SAGE, AlchemistRank.EMPEROR,
    ];
    const idx = order.indexOf(rank);
    if (idx < 0 || idx >= order.length - 1) return null;
    return order[idx + 1];
  }

  private static getNextFormationRank(rank: FormationMasterRank): FormationMasterRank | null {
    const order = [
      FormationMasterRank.APPRENTICE, FormationMasterRank.DISCIPLE, FormationMasterRank.MASTER,
      FormationMasterRank.GRANDMASTER, FormationMasterRank.ELDER, FormationMasterRank.GREAT_ELDER,
      FormationMasterRank.SAGE, FormationMasterRank.EMPEROR,
    ];
    const idx = order.indexOf(rank);
    if (idx < 0 || idx >= order.length - 1) return null;
    return order[idx + 1];
  }
}
