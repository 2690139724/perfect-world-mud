import { IPlayer } from '../entities/Player';
import { ILawDefinition, ILawProgress, LawType, LAW_DEFINITIONS, findLawDefinition, createLawProgress, applyLawEffects } from '../entities/Law';

export enum LawConflictLevel {
  NONE = '无冲突',
  MINOR = '轻微冲突',
  MODERATE = '中度冲突',
  SEVERE = '严重冲突',
  CRITICAL = '致命冲突',
}

export interface ILawFusion {
  id: string;
  name: string;
  description: string;
  requiredLaws: string[];
  effects: {
    attackBonus?: number;
    defenseBonus?: number;
    critBonus?: number;
    specialEffect?: string;
  };
  successRate: number;
  goldCost: number;
  materials: Record<string, number>;
}

export interface ILawDomain {
  id: string;
  name: string;
  description: string;
  requiredLaw: string;
  requiredLevel: number;
  effects: {
    attackBonus: number;
    defenseBonus: number;
    specialEffect: string;
    domainAbility: string;
  };
}

export interface ILawConflict {
  lawId1: string;
  lawId2: string;
  level: LawConflictLevel;
  penalty: {
    attackPenalty?: number;
    defensePenalty?: number;
    critPenalty?: number;
    description: string;
  };
}

export const LAW_CONFLICTS: ILawConflict[] = [
  {
    lawId1: 'law_destruction',
    lawId2: 'law_life',
    level: LawConflictLevel.SEVERE,
    penalty: { attackPenalty: 30, defensePenalty: 20, description: '毁灭与生命法则相互排斥，全属性下降' },
  },
  {
    lawId1: 'law_time',
    lawId2: 'law_space',
    level: LawConflictLevel.MODERATE,
    penalty: { attackPenalty: 15, defensePenalty: 15, description: '时空法则难以共存，属性有所下降' },
  },
  {
    lawId1: 'law_fire',
    lawId2: 'law_thunder',
    level: LawConflictLevel.MINOR,
    penalty: { attackPenalty: 5, description: '火与雷存在轻微冲突' },
  },
  {
    lawId1: 'law_reincarnation',
    lawId2: 'law_destiny',
    level: LawConflictLevel.CRITICAL,
    penalty: { attackPenalty: 50, defensePenalty: 50, critPenalty: 0.1, description: '轮回与命运法则冲突严重，实力大幅下降' },
  },
];

export const LAW_FUSIONS: ILawFusion[] = [
  {
    id: 'fusion_void',
    name: '虚空法则',
    description: '融合空间与时间法则，领悟虚空之道',
    requiredLaws: ['law_space', 'law_time'],
    effects: { attackBonus: 100, defenseBonus: 60, specialEffect: '可穿越虚空，无视距离攻击并免疫30%伤害' },
    successRate: 0.3,
    goldCost: 500000,
    materials: { 'mat_void_essence': 10, 'mat_time_crystal': 5, 'mat_space_stone': 5 },
  },
  {
    id: 'fusion_chaos',
    name: '混沌法则',
    description: '融合五行法则与毁灭法则，领悟混沌之道',
    requiredLaws: ['law_five_elements', 'law_destruction'],
    effects: { attackBonus: 120, critBonus: 0.2, specialEffect: '攻击附带混沌之力，无视50%防御' },
    successRate: 0.25,
    goldCost: 800000,
    materials: { 'mat_chaos_stone': 8, 'mat_destruction_crystal': 5, 'mat_element_essence': 10 },
  },
  {
    id: 'fusion_immortal',
    name: '永生法则',
    description: '融合生命法则与轮回法则，领悟永生之道',
    requiredLaws: ['law_life', 'law_reincarnation'],
    effects: { defenseBonus: 100, specialEffect: '每秒恢复5%气血，死亡时有50%概率复活' },
    successRate: 0.2,
    goldCost: 1000000,
    materials: { 'mat_immortal_essence': 10, 'mat_reincarnation_crystal': 5, 'mat_life_heart': 5 },
  },
];

export const LAW_DOMAINS: ILawDomain[] = [
  {
    id: 'domain_time',
    name: '时间领域',
    description: '展开时间领域，掌控领域内的时间流速',
    requiredLaw: 'law_time',
    requiredLevel: 5,
    effects: { attackBonus: 50, defenseBonus: 30, specialEffect: '领域内敌人行动速度降低50%', domainAbility: '时间停滞：使敌人停滞3秒' },
  },
  {
    id: 'domain_space',
    name: '空间领域',
    description: '展开空间领域，扭曲领域内的空间',
    requiredLaw: 'law_space',
    requiredLevel: 5,
    effects: { attackBonus: 45, defenseBonus: 40, specialEffect: '领域内可瞬移，无视距离攻击', domainAbility: '空间切割：造成大量伤害并击退敌人' },
  },
  {
    id: 'domain_destruction',
    name: '毁灭领域',
    description: '展开毁灭领域，领域内万物皆可毁灭',
    requiredLaw: 'law_destruction',
    requiredLevel: 6,
    effects: { attackBonus: 80, defenseBonus: 0, specialEffect: '领域内攻击附带毁灭之力，暴击率+15%', domainAbility: '毁灭风暴：对所有敌人造成大量伤害' },
  },
  {
    id: 'domain_life',
    name: '生命领域',
    description: '展开生命领域，领域内万物复苏',
    requiredLaw: 'law_life',
    requiredLevel: 6,
    effects: { attackBonus: 0, defenseBonus: 60, specialEffect: '领域内每秒恢复10%气血', domainAbility: '生命绽放：立即恢复50%气血并清除负面效果' },
  },
  {
    id: 'domain_reincarnation',
    name: '轮回领域',
    description: '展开轮回领域，掌控生死轮回',
    requiredLaw: 'law_reincarnation',
    requiredLevel: 8,
    effects: { attackBonus: 70, defenseBonus: 70, specialEffect: '死亡时有30%概率在领域内复活', domainAbility: '轮回审判：强制敌人进入轮回，造成真实伤害' },
  },
  {
    id: 'domain_destiny',
    name: '命运领域',
    description: '展开命运领域，改变因果命运',
    requiredLaw: 'law_destiny',
    requiredLevel: 10,
    effects: { attackBonus: 100, defenseBonus: 60, specialEffect: '免疫所有负面效果，暴击伤害提升100%', domainAbility: '命运改写：立即结束战斗，胜负由命运决定' },
  },
];

export class LawService {
  static canComprehend(player: IPlayer, lawId: string): { can: boolean; message: string } {
    const lawDef = findLawDefinition(lawId);
    if (!lawDef) {
      return { can: false, message: '法则不存在' };
    }

    if (player.realm < lawDef.requiredRealm) {
      return { can: false, message: `境界不足，需要${lawDef.requiredRealm}境` };
    }

    const existing = player.laws.find(l => l.lawId === lawId);
    if (existing && existing.isCompleted) {
      return { can: false, message: '该法则已领悟完成' };
    }

    return { can: true, message: '可以领悟该法则' };
  }

  static comprehendLaw(player: IPlayer, lawId: string): { success: boolean; message: string; lawProgress?: ILawProgress } {
    const check = this.canComprehend(player, lawId);
    if (!check.can) {
      return { success: false, message: check.message };
    }

    const lawDef = findLawDefinition(lawId)!;
    let existing = player.laws.find(l => l.lawId === lawId);

    if (!existing) {
      existing = createLawProgress(lawId);
      player.laws.push(existing);
    }

    const insightBonus = player.daoHeart.exp / player.daoHeart.maxExp * 20;
    const baseProgress = 10 + insightBonus;
    const randomVariation = Math.random() * 10 - 5;
    const progress = Math.min(100, existing.progress + baseProgress + randomVariation);

    existing.progress = progress;

    if (existing.progress >= 100) {
      existing.level = Math.min(lawDef.maxLevel, existing.level + 1);
      existing.progress = 0;
      existing.isCompleted = existing.level >= lawDef.maxLevel;
      existing.effects.push(lawDef.effects.specialEffect || '');

      if (existing.isCompleted) {
        return {
          success: true,
          message: `恭喜！成功领悟${lawDef.name}！`,
          lawProgress: existing,
        };
      } else {
        return {
          success: true,
          message: `${lawDef.name}领悟进度提升！当前等级：${existing.level}/${lawDef.maxLevel}`,
          lawProgress: existing,
        };
      }
    }

    return {
      success: true,
      message: `${lawDef.name}领悟进度提升至${Math.floor(existing.progress)}%`,
      lawProgress: existing,
    };
  }

  static checkLawConflicts(player: IPlayer): ILawConflict[] {
    const activeLawIds = player.laws.filter(l => l.level > 0).map(l => l.lawId);
    const conflicts: ILawConflict[] = [];

    for (let i = 0; i < activeLawIds.length; i++) {
      for (let j = i + 1; j < activeLawIds.length; j++) {
        const conflict = LAW_CONFLICTS.find(
          c => (c.lawId1 === activeLawIds[i] && c.lawId2 === activeLawIds[j]) ||
               (c.lawId1 === activeLawIds[j] && c.lawId2 === activeLawIds[i])
        );
        if (conflict) {
          conflicts.push(conflict);
        }
      }
    }

    return conflicts;
  }

  static getConflictPenalties(conflicts: ILawConflict[]): Record<string, number> {
    const penalties: Record<string, number> = { attack: 0, defense: 0, crit: 0 };

    for (const conflict of conflicts) {
      penalties.attack += conflict.penalty.attackPenalty || 0;
      penalties.defense += conflict.penalty.defensePenalty || 0;
      penalties.crit += conflict.penalty.critPenalty || 0;
    }

    return penalties;
  }

  static canFuse(player: IPlayer, fusionId: string): { can: boolean; message: string } {
    const fusion = LAW_FUSIONS.find(f => f.id === fusionId);
    if (!fusion) {
      return { can: false, message: '融合配方不存在' };
    }

    for (const lawId of fusion.requiredLaws) {
      const law = player.laws.find(l => l.lawId === lawId);
      if (!law || law.level < 5) {
        const lawDef = findLawDefinition(lawId);
        return { can: false, message: `${lawDef?.name || lawId}领悟等级不足，需要5级` };
      }
    }

    if (player.gold < fusion.goldCost) {
      return { can: false, message: '金币不足' };
    }

    for (const [materialId, amount] of Object.entries(fusion.materials)) {
      const count = player.inventory.filter(item => item.id === materialId).reduce((sum, item) => sum + (item.stackable ? item.maxStack : 1), 0);
      if (count < amount) {
        return { can: false, message: `材料不足：${materialId}` };
      }
    }

    return { can: true, message: '可以进行法则融合' };
  }

  static fuseLaws(player: IPlayer, fusionId: string): { success: boolean; message: string; fusedLaw?: ILawProgress } {
    const check = this.canFuse(player, fusionId);
    if (!check.can) {
      return { success: false, message: check.message };
    }

    const fusion = LAW_FUSIONS.find(f => f.id === fusionId)!;

    player.gold -= fusion.goldCost;

    for (const [materialId, amount] of Object.entries(fusion.materials)) {
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

    const success = Math.random() < fusion.successRate;

    if (success) {
      const fusedLaw: ILawProgress = {
        lawId: fusion.id,
        name: fusion.name,
        level: 1,
        maxLevel: 10,
        progress: 0,
        maxProgress: 100,
        effects: [fusion.description, fusion.effects.specialEffect || ''],
        isCompleted: false,
      };

      player.laws.push(fusedLaw);

      for (const lawId of fusion.requiredLaws) {
        const index = player.laws.findIndex(l => l.lawId === lawId);
        if (index !== -1) {
          player.laws.splice(index, 1);
        }
      }

      return {
        success: true,
        message: `成功融合出${fusion.name}！`,
        fusedLaw,
      };
    } else {
      return {
        success: false,
        message: '法则融合失败，材料损毁！',
      };
    }
  }

  static getAvailableDomains(player: IPlayer): ILawDomain[] {
    return LAW_DOMAINS.filter(domain => {
      const law = player.laws.find(l => l.lawId === domain.requiredLaw);
      return law && law.level >= domain.requiredLevel;
    });
  }

  static activateDomain(player: IPlayer, domainId: string): { success: boolean; message: string; domain?: ILawDomain } {
    const domain = LAW_DOMAINS.find(d => d.id === domainId);
    if (!domain) {
      return { success: false, message: '领域不存在' };
    }

    const law = player.laws.find(l => l.lawId === domain.requiredLaw);
    if (!law || law.level < domain.requiredLevel) {
      return { success: false, message: '法则领悟等级不足' };
    }

    return {
      success: true,
      message: `展开${domain.name}！`,
      domain,
    };
  }

  static getDomainEffects(domain: ILawDomain): Record<string, number> {
    return {
      attack: domain.effects.attackBonus,
      defense: domain.effects.defenseBonus,
    };
  }

  static getTotalLawEffects(player: IPlayer): {
    attackBonus: number;
    defenseBonus: number;
    critBonus: number;
    specialEffects: string[];
    conflicts: ILawConflict[];
    penalties: Record<string, number>;
    domains: ILawDomain[];
  } {
    const effects = applyLawEffects(player.laws);
    const conflicts = this.checkLawConflicts(player);
    const penalties = this.getConflictPenalties(conflicts);
    const domains = this.getAvailableDomains(player);

    return { ...effects, conflicts, penalties, domains };
  }

  static getLawRecommendations(player: IPlayer): ILawDefinition[] {
    const activeLawIds = player.laws.filter(l => l.level > 0).map(l => l.lawId);
    const recommendations: ILawDefinition[] = [];

    for (const lawDef of LAW_DEFINITIONS) {
      if (activeLawIds.includes(lawDef.id)) continue;
      if (player.realm < lawDef.requiredRealm) continue;

      const hasConflict = LAW_CONFLICTS.some(
        c => c.level >= LawConflictLevel.SEVERE && (activeLawIds.includes(c.lawId1) || activeLawIds.includes(c.lawId2))
      );

      if (!hasConflict) {
        recommendations.push(lawDef);
      }
    }

    return recommendations;
  }
}