import { getTalentEffects } from '../../data/talents/talent_data';
import { TalentService } from './TalentService';
import { IPlayer } from '../entities/Player';

export interface ITalentStatBonuses {
  attackPct: number;      // 攻击百分比加成
  defensePct: number;     // 防御百分比加成
  maxHpPct: number;       // 气血上限百分比加成
  maxManaPct: number;     // 法力上限百分比加成
  speedPct: number;       // 速度百分比加成
  critRatePct: number;    // 暴击率百分比加成
  cultivationSpeedPct: number;  // 修炼速度百分比加成
  spiritAbsorptionPct: number;  // 灵气吸收百分比加成
  insightPct: number;     // 悟性百分比加成
  healRatePct: number;    // 恢复速度百分比加成
  dodgePct: number;       // 闪避百分比加成
  reincarnationRetainPct: number; // 转世保留百分比加成
}

export class TalentStatsCalculator {
  /**
   * 计算玩家所有天赋的属性加成（包括组合共鸣）
   */
  static calculateBonuses(player: IPlayer): ITalentStatBonuses {
    const effects = getTalentEffects(player.talentIds);

    // 检查天赋组合共鸣
    const combos = TalentService.checkTalentCombinations(player);
    const comboBonuses = TalentService.getCombinationBonuses(combos);

    // 合并基础天赋效果和组合加成
    const merged: Record<string, number> = { ...effects };
    for (const [key, val] of Object.entries(comboBonuses)) {
      merged[key] = (merged[key] || 0) + val;
    }

    return {
      attackPct: merged.attack || 0,
      defensePct: merged.defense || 0,
      maxHpPct: merged.maxHp || 0,
      maxManaPct: merged.maxMana || 0,
      speedPct: merged.speed || 0,
      critRatePct: merged.critRate || 0,
      cultivationSpeedPct: merged.cultivationSpeed || 0,
      spiritAbsorptionPct: merged.spiritAbsorption || 0,
      insightPct: merged.insight || 0,
      healRatePct: merged.healRate || 0,
      dodgePct: merged.dodge || 0,
      reincarnationRetainPct: merged.reincarnationRetain || 0,
    };
  }

  /**
   * 获取应用天赋加成后的有效攻击力
   */
  static getEffectiveAttack(player: IPlayer): number {
    const bonuses = this.calculateBonuses(player);
    return Math.floor(player.attack * (1 + bonuses.attackPct / 100));
  }

  /**
   * 获取应用天赋加成后的有效防御力
   */
  static getEffectiveDefense(player: IPlayer): number {
    const bonuses = this.calculateBonuses(player);
    return Math.floor(player.defense * (1 + bonuses.defensePct / 100));
  }

  /**
   * 获取应用天赋加成后的有效速度
   */
  static getEffectiveSpeed(player: IPlayer): number {
    const bonuses = this.calculateBonuses(player);
    return Math.floor(player.speed * (1 + bonuses.speedPct / 100));
  }

  /**
   * 获取应用天赋加成后的暴击率
   */
  static getEffectiveCritRate(player: IPlayer): number {
    const bonuses = this.calculateBonuses(player);
    return player.critRate + bonuses.critRatePct;
  }

  /**
   * 获取应用天赋加成后的最大气血
   */
  static getEffectiveMaxHp(player: IPlayer): number {
    const bonuses = this.calculateBonuses(player);
    return Math.floor(player.maxHp * (1 + bonuses.maxHpPct / 100));
  }

  /**
   * 获取应用天赋加成后的最大法力
   */
  static getEffectiveMaxMana(player: IPlayer): number {
    const bonuses = this.calculateBonuses(player);
    return Math.floor(player.maxMana * (1 + bonuses.maxManaPct / 100));
  }

  /**
   * 获取修炼速度加成倍率
   */
  static getCultivationSpeedMultiplier(player: IPlayer): number {
    const bonuses = this.calculateBonuses(player);
    return 1 + bonuses.cultivationSpeedPct / 100;
  }

  /**
   * 获取灵气吸收加成倍率
   */
  static getSpiritAbsorptionMultiplier(player: IPlayer): number {
    const bonuses = this.calculateBonuses(player);
    return 1 + bonuses.spiritAbsorptionPct / 100;
  }

  /**
   * 获取闪避率加成
   */
  static getDodgeBonus(player: IPlayer): number {
    const bonuses = this.calculateBonuses(player);
    return bonuses.dodgePct;
  }

  /**
   * 获取恢复速度加成倍率
   */
  static getHealRateMultiplier(player: IPlayer): number {
    const bonuses = this.calculateBonuses(player);
    return 1 + bonuses.healRatePct / 100;
  }
}
