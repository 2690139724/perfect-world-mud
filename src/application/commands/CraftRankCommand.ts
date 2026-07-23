import { ICommandHandler, ICommandContext } from './CommandRouter';
import { IPlayer } from '../../domain/entities/Player';
import { IItem } from '../../domain/entities/Item';
import { CraftRankService } from '../../domain/services/CraftRankService';
import {
  AlchemistRank, FormationMasterRank, BoneScriptRank,
  ALCHEMIST_RANK_CONFIG, FORMATION_RANK_CONFIG, BONE_SCRIPT_RANK_CONFIG,
  ALCHEMIST_RANK_ORDER, FORMATION_RANK_ORDER, BONE_SCRIPT_RANK_ORDER,
} from '../../domain/entities/CraftRank';
import { CommandHelper } from './CommandHelper';

/**
 * 炼制品阶命令处理器
 *
 * 接入 CraftRankService，提供：
 * - 炼丹师/阵法师/骨文铭刻品阶查询
 * - 丹方/阵法学习（品阶联动校验）
 * - 骨文铭刻（装备强化）
 * - 器灵契约（装备觉醒）
 */
export class CraftRankCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return [
      'craft_rank', '品阶', '炼制品阶', '炼丹品阶', '阵法品阶', '骨文品阶',
      '学习丹方', '学习阵法', '铭刻骨文', '器灵契约', '器灵觉醒',
    ].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const player = context.store.getState().player;

    switch (action) {
      case 'craft_rank':
      case '品阶':
      case '炼制品阶':
        this.showCraftRanks(context, player);
        break;
      case '炼丹品阶':
        this.showAlchemyRankDetail(context, player);
        break;
      case '阵法品阶':
        this.showFormationRankDetail(context, player);
        break;
      case '骨文品阶':
        this.showBoneScriptRankDetail(context, player);
        break;
      case '学习丹方':
        this.handleLearnAlchemyRecipe(context, player, args.join(' '));
        break;
      case '学习阵法':
        this.handleLearnFormation(context, player, args.join(' '));
        break;
      case '铭刻骨文':
        this.handleInscribeBoneScript(context, player, args.join(' '));
        break;
      case '器灵契约':
      case '器灵觉醒':
        this.handleSpiritBond(context, player, args.join(' '));
        break;
    }
  }

  // ================== 品阶总览 ==================

  private showCraftRanks(ctx: ICommandContext, player: IPlayer): void {
    const { store, narrative, modalManager } = ctx;
    const alchemyRank = CraftRankService.getAlchemistRank(player);
    const formationRank = CraftRankService.getFormationRank(player);
    const boneScriptRank = CraftRankService.getBoneScriptRank(player);

    CommandHelper.sayBlock(store, [
      '\n【炼制品阶总览】',
      `◆ 炼丹师：${alchemyRank}（经验 ${player.alchemySkill?.exp || 0}）`,
      `  ${ALCHEMIST_RANK_CONFIG[alchemyRank].description}`,
      `◆ 阵法师：${formationRank}（经验 ${player.formationSkill?.exp || 0}）`,
      `  ${FORMATION_RANK_CONFIG[formationRank].description}`,
      `◆ 骨文铭刻：${boneScriptRank}（等级 ${player.boneScriptLevel || 0}）`,
      `  ${BONE_SCRIPT_RANK_CONFIG[boneScriptRank].description}`,
    ]);

    CommandHelper.pushList(narrative, '品阶详情', [
      { label: '炼丹师品阶详情', action: '炼丹品阶', desc: '查看可学习丹方与品阶升级' },
      { label: '阵法师品阶详情', action: '阵法品阶', desc: '查看可学习阵法与品阶升级' },
      { label: '骨文铭刻品阶详情', action: '骨文品阶', desc: '查看可铭刻装备与品阶升级' },
    ]);

    if (modalManager) {
      // modalManager 可用时显示弹窗（这里简化处理，主要交互在列表中）
    }
  }

  // ================== 炼丹师品阶详情 ==================

  private showAlchemyRankDetail(ctx: ICommandContext, player: IPlayer): void {
    const { store, narrative } = ctx;
    const rank = CraftRankService.getAlchemistRank(player);
    const config = ALCHEMIST_RANK_CONFIG[rank];
    const currentIdx = ALCHEMIST_RANK_ORDER.indexOf(rank);
    const nextRank = ALCHEMIST_RANK_ORDER[currentIdx + 1];
    const nextConfig = nextRank ? ALCHEMIST_RANK_CONFIG[nextRank] : null;

    CommandHelper.sayBlock(store, [
      `\n【炼丹师品阶·${rank}】`,
      config.description,
      `当前经验：${player.alchemySkill?.exp || 0}${nextConfig ? ` / ${nextConfig.requiredExp}` : '（已满阶）'}`,
      `成功率加成：+${(config.successRateBonus * 100).toFixed(0)}%`,
      `出丹数量加成：+${(config.yieldBonus * 100).toFixed(0)}%`,
      `可学习丹方品阶：${config.maxRecipeGrade}及以下`,
    ]);

    if (nextConfig) {
      CommandHelper.say(store, `下一品阶：${nextRank}（需经验 ${nextConfig.requiredExp}）`);
    }

    // 检查品阶升级
    const rankUpResult = CraftRankService.checkAlchemistRankUp(player);
    if (rankUpResult.success) {
      CommandHelper.say(store, rankUpResult.message);
    }

    // 显示可学习丹方
    const learnable = CraftRankService.getLearnableAlchemyRecipes(player);
    if (learnable.length > 0) {
      CommandHelper.pushList(narrative, '可学习丹方（点击学习）', learnable.map(r => ({
        label: `${r.name}（${r.grade}）`,
        action: `学习丹方 ${r.name}`,
        desc: `${r.description} | 品阶：${r.grade} | 成功率：${(r.successRate * 100).toFixed(0)}%`,
      })));
    } else {
      CommandHelper.say(store, '当前品阶下无可学习的新丹方。');
    }
  }

  // ================== 阵法师品阶详情 ==================

  private showFormationRankDetail(ctx: ICommandContext, player: IPlayer): void {
    const { store, narrative } = ctx;
    const rank = CraftRankService.getFormationRank(player);
    const config = FORMATION_RANK_CONFIG[rank];
    const currentIdx = FORMATION_RANK_ORDER.indexOf(rank);
    const nextRank = FORMATION_RANK_ORDER[currentIdx + 1];
    const nextConfig = nextRank ? FORMATION_RANK_CONFIG[nextRank] : null;

    CommandHelper.sayBlock(store, [
      `\n【阵法师品阶·${rank}】`,
      config.description,
      `当前经验：${player.formationSkill?.exp || 0}${nextConfig ? ` / ${nextConfig.requiredExp}` : '（已满阶）'}`,
      `布阵成功率加成：+${(config.successRateBonus * 100).toFixed(0)}%`,
      `阵法效果加成：+${(config.effectBonus * 100).toFixed(0)}%`,
      `可学习阵法品阶：${config.maxFormationTier}及以下`,
    ]);

    if (nextConfig) {
      CommandHelper.say(store, `下一品阶：${nextRank}（需经验 ${nextConfig.requiredExp}）`);
    }

    const rankUpResult = CraftRankService.checkFormationRankUp(player);
    if (rankUpResult.success) {
      CommandHelper.say(store, rankUpResult.message);
    }

    const learnable = CraftRankService.getLearnableFormations(player);
    if (learnable.length > 0) {
      CommandHelper.pushList(narrative, '可学习阵法（点击学习）', learnable.map(f => ({
        label: `${f.name}（${f.tier}）`,
        action: `学习阵法 ${f.name}`,
        desc: `${f.description} | 品阶：${f.tier} | 需境界：${f.requiredRealm}`,
      })));
    } else {
      CommandHelper.say(store, '当前品阶下无可学习的新阵法。');
    }
  }

  // ================== 骨文铭刻品阶详情 ==================

  private showBoneScriptRankDetail(ctx: ICommandContext, player: IPlayer): void {
    const { store, narrative } = ctx;
    const rank = CraftRankService.getBoneScriptRank(player);
    const config = BONE_SCRIPT_RANK_CONFIG[rank];
    const currentIdx = BONE_SCRIPT_RANK_ORDER.indexOf(rank);
    const nextRank = BONE_SCRIPT_RANK_ORDER[currentIdx + 1];
    const nextConfig = nextRank ? BONE_SCRIPT_RANK_CONFIG[nextRank] : null;

    CommandHelper.sayBlock(store, [
      `\n【骨文铭刻品阶·${rank}】`,
      config.description,
      `当前等级：${player.boneScriptLevel || 0}${nextConfig ? ` / ${nextConfig.requiredLevel}` : '（已满阶）'}`,
      `成功率加成：+${(config.successRateBonus * 100).toFixed(0)}%`,
      `属性加成倍率：${config.attributeMultiplier}x`,
      `可铭刻装备品阶：${config.maxItemGrade}级及以下`,
    ]);

    if (rank === BoneScriptRank.NONE) {
      CommandHelper.say(store, '需先学习骨文之道（需达到搬血境并完成相关任务）。');
      return;
    }

    // 列出可铭刻的装备
    const inscribeableItems = (player.inventory || []).filter(it => {
      const itemGrade = (it as any).rarity || 1;
      return !(it as any).boneScriptInscribed && itemGrade <= config.maxItemGrade;
    }).slice(0, 20);

    if (inscribeableItems.length > 0) {
      CommandHelper.pushList(narrative, '可铭刻装备（点击铭刻）', inscribeableItems.map(it => ({
        label: `${it.name}${(it as any).boneScriptInscribed ? '（已铭刻）' : ''}`,
        action: `铭刻骨文 ${it.name}`,
        desc: `品阶：${(it as any).rarity || 1}级 | ${it.description || ''}`,
      })));
    } else {
      CommandHelper.say(store, '行囊中没有可铭刻的装备。');
    }

    // 列出可觉醒器灵的装备（需 ADEPT 以上品阶）
    if (currentIdx >= BONE_SCRIPT_RANK_ORDER.indexOf(BoneScriptRank.ADEPT)) {
      const spiritItems = (player.inventory || []).filter(it =>
        (it as any).boneScriptInscribed && !(it as any).spiritBonded
      ).slice(0, 20);
      if (spiritItems.length > 0) {
        CommandHelper.pushList(narrative, '可觉醒器灵的装备（点击觉醒）', spiritItems.map(it => ({
          label: `${it.name}（已铭刻·未觉醒）`,
          action: `器灵契约 ${it.name}`,
          desc: `已铭刻骨文，可觉醒器灵获得额外属性`,
        })));
      }
    }
  }

  // ================== 学习丹方 ==================

  private handleLearnAlchemyRecipe(ctx: ICommandContext, player: IPlayer, name: string): void {
    const { store } = ctx;
    if (!name) {
      CommandHelper.say(store, '请指定要学习的丹方名称。');
      return;
    }
    const result = CraftRankService.learnAlchemyRecipe(player, name);
    CommandHelper.say(store, result.message);
    if (result.success) {
      CommandHelper.notifyPlayerChanged(store);
      this.showAlchemyRankDetail(ctx, store.getState().player);
    }
  }

  // ================== 学习阵法 ==================

  private handleLearnFormation(ctx: ICommandContext, player: IPlayer, name: string): void {
    const { store } = ctx;
    if (!name) {
      CommandHelper.say(store, '请指定要学习的阵法名称。');
      return;
    }
    const result = CraftRankService.learnFormation(player, name);
    CommandHelper.say(store, result.message);
    if (result.success) {
      CommandHelper.notifyPlayerChanged(store);
      this.showFormationRankDetail(ctx, store.getState().player);
    }
  }

  // ================== 铭刻骨文 ==================

  private handleInscribeBoneScript(ctx: ICommandContext, player: IPlayer, itemName: string): void {
    const { store } = ctx;
    if (!itemName) {
      CommandHelper.say(store, '请指定要铭刻的装备名称。');
      return;
    }
    const item = (player.inventory || []).find(it => it.name === itemName || it.name.includes(itemName));
    if (!item) {
      CommandHelper.say(store, `行囊中未找到：${itemName}`);
      return;
    }
    const result = CraftRankService.inscribeBoneScript(player, item);
    CommandHelper.say(store, result.message);
    if (result.success) {
      if (result.attributeBonus) {
        CommandHelper.sayBlock(store, [
          `◆ 攻击 +${result.attributeBonus.attack || 0}`,
          `◆ 防御 +${result.attributeBonus.defense || 0}`,
          `◆ 速度 +${result.attributeBonus.speed || 0}`,
        ]);
      }
      if (result.resonance) {
        CommandHelper.say(store, '**【骨文共鸣】** 铭刻触发共鸣，额外属性加成！');
      }
      // 铭刻成功增加骨文经验
      const expResult = CraftRankService.addBoneScriptExp(player, 100);
      if (expResult.leveledUp && expResult.message) {
        CommandHelper.say(store, expResult.message);
      }
      CommandHelper.notifyPlayerChanged(store);
      this.showBoneScriptRankDetail(ctx, store.getState().player);
    }
  }

  // ================== 器灵契约 ==================

  private handleSpiritBond(ctx: ICommandContext, player: IPlayer, itemName: string): void {
    const { store } = ctx;
    if (!itemName) {
      CommandHelper.say(store, '请指定要觉醒器灵的装备名称。');
      return;
    }
    const item = (player.inventory || []).find(it => it.name === itemName || it.name.includes(itemName));
    if (!item) {
      CommandHelper.say(store, `行囊中未找到：${itemName}`);
      return;
    }
    const result = CraftRankService.bondSpirit(player, item);
    CommandHelper.say(store, result.message);
    if (result.success) {
      if (result.spiritEffect) {
        CommandHelper.say(store, `◆ ${result.spiritEffect}`);
      }
      CommandHelper.notifyPlayerChanged(store);
      this.showBoneScriptRankDetail(ctx, store.getState().player);
    }
  }
}
