import { IPlayer, CultivationRealm, RealmNames } from '../entities/Player';
import { IMonster, MonsterAIType } from '../entities/Monster';
import {
  IDungeon, IDungeonStage, IDungeonRivalNPC, IDungeonReward,
  ICurrentDungeonState, IDungeonProgress,
  DungeonStageType, DungeonTier, DungeonType,
  findDungeon, DUNGEONS,
} from '../entities/Dungeon';
import { CombatEngine } from './CombatEngine';
import { MethodService } from './MethodService';
import { getTechniqueById } from '../../data/seed/techniques';

/**
 * 副本服务层
 *
 * 从 DungeonCommand 抽离的核心业务逻辑，负责：
 * - 副本进入/退出/进度管理
 * - 5阶段流程（探索→战斗→解谜→试炼→传承）的状态推进
 * - 竞争 NPC 生成与主动行为（小说化争夺感）
 * - 战斗接入 CombatEngine（替代副本内简化战斗）
 * - 每日次数/冷却校验
 * - 奖励发放
 */

const TIER_MULTIPLIER: Record<DungeonTier, number> = {
  [DungeonTier.NORMAL]: 1,
  [DungeonTier.ELITE]: 1.5,
  [DungeonTier.LEGENDARY]: 2,
  [DungeonTier.MYTHIC]: 3,
};

/** 副本进入/挑战结果 */
export interface IDungeonEnterResult {
  success: boolean;
  message: string;
  state?: ICurrentDungeonState;
}

/** 阶段处理结果 */
export interface IStageHandleResult {
  logs: string[];
  advanced: boolean;
  completed: boolean;
  failed: boolean;
  /** 需要进入战斗（返回怪物数据） */
  combat?: { monster: IMonster; isRivalNPC?: boolean; rivalNPCId?: string };
}

/** 战斗结果 */
export interface IDungeonCombatResult {
  win: boolean;
  logs: string[];
  hpLost: number;
  expGain: number;
  /** 玩家剩余血量 */
  playerHp: number;
  playerMana: number;
}

/** 竞争 NPC 主动行动结果 */
export interface IRivalActionResult {
  npcId: string;
  npcName: string;
  action: 'advance' | 'find_clue' | 'ambush' | 'leave' | 'taunt';
  message: string;
  /** 该 NPC 是否因此抢到了传承 */
  stoleInheritance?: boolean;
}

export class DungeonService {
  /** 缓存玩家当日的副本进入次数（key: playerId_dungeonId, value: count） */
  private static dailyEntryLog: Map<string, { count: number; lastEntryTime: number }> = new Map();

  // ============= 进入/退出 =============

  /** 校验并进入副本 */
  static enterDungeon(player: IPlayer, dungeonId: string): IDungeonEnterResult {
    const dungeon = findDungeon(dungeonId);
    if (!dungeon) {
      return { success: false, message: '未找到该秘境。' };
    }

    if (player.realm < dungeon.requiredRealm) {
      return {
        success: false,
        message: `境界不足，需要${RealmNames[dungeon.requiredRealm]}才能进入${dungeon.name}。`,
      };
    }

    // 每日次数校验
    const entryKey = `${player.id}_${dungeonId}`;
    const entryLog = this.dailyEntryLog.get(entryKey);
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    if (entryLog && now - entryLog.lastEntryTime < oneDayMs) {
      if (entryLog.count >= dungeon.dailyLimit) {
        return { success: false, message: `今日进入${dungeon.name}的次数已达上限（${dungeon.dailyLimit}次）。` };
      }
    }

    // 冷却校验（基于上次完成时间）
    const progress = player.dungeonProgress.find(p => p.dungeonId === dungeonId);
    if (progress?.lastCompletedAt) {
      const cooldownMs = dungeon.cooldownHours * 60 * 60 * 1000;
      const elapsed = now - progress.lastCompletedAt;
      if (elapsed < cooldownMs) {
        const remainingHours = Math.ceil((cooldownMs - elapsed) / (60 * 60 * 1000));
        return { success: false, message: `${dungeon.name}尚在冷却中，还需${remainingHours}小时。` };
      }
    }

    // 记录进入次数
    if (entryLog && now - entryLog.lastEntryTime < oneDayMs) {
      entryLog.count++;
    } else {
      this.dailyEntryLog.set(entryKey, { count: 1, lastEntryTime: now });
    }

    // 若已有进度，恢复进度
    if (player.currentDungeonState?.dungeonId === dungeonId) {
      return { success: true, message: `继续挑战${dungeon.name}（从上次进度继续）。`, state: player.currentDungeonState };
    }

    // 生成新状态
    const state: ICurrentDungeonState = {
      dungeonId: dungeon.id,
      currentStageIndex: 0,
      cluesFound: [],
      monstersDefeated: [],
      trialUnlocked: false,
      trialCompleted: false,
      rivalNPCs: this.generateRivalNPCs(dungeon),
      tempRewards: [],
      explorationCount: 0,
    };

    player.currentDungeonState = state;
    return { success: true, message: `进入${dungeon.name}。`, state };
  }

  /** 生成竞争 NPC */
  static generateRivalNPCs(dungeon: IDungeon): IDungeonRivalNPC[] {
    if (!dungeon.rivalNPCTemplates || dungeon.rivalNPCTemplates.length === 0) return [];
    const count = Math.floor(Math.random() * 2) + 1; // 1-2 个
    return [...dungeon.rivalNPCTemplates]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map(t => ({ ...t, isDefeated: false, isFriendly: Math.random() < 0.3 }));
  }

  /** 离开副本，保存进度 */
  static leaveDungeon(player: IPlayer): { success: boolean; message: string; grantedRewards: string[] } {
    const state = player.currentDungeonState;
    if (!state) {
      return { success: false, message: '你不在任何副本中。', grantedRewards: [] };
    }

    const dungeon = findDungeon(state.dungeonId);
    const grantedRewards: string[] = [];

    // 发放已积累的临时奖励
    if (state.tempRewards.length > 0) {
      for (const r of state.tempRewards) {
        const msg = this.grantReward(player, r);
        if (msg) grantedRewards.push(msg);
      }
      state.tempRewards = [];
    }

    // 保存进度
    const progress = player.dungeonProgress.find(p => p.dungeonId === state.dungeonId);
    const completedStages = Array.from(new Set([
      ...(progress?.completedStages || []),
      ...Array.from({ length: state.currentStageIndex }, (_, i) => i),
    ]));
    if (progress) {
      progress.currentStage = state.currentStageIndex;
      progress.completedStages = completedStages;
      progress.totalAttempts++;
    } else {
      player.dungeonProgress.push({
        dungeonId: state.dungeonId,
        completed: false,
        currentStage: state.currentStageIndex,
        completedStages,
        totalAttempts: 1,
        successfulAttempts: 0,
      });
    }

    player.currentDungeonState = undefined;
    return {
      success: true,
      message: `你退出了${dungeon?.name || '副本'}，进度已保存。`,
      grantedRewards,
    };
  }

  // ============= 阶段处理 =============

  /** 处理当前阶段的挑战（探索/解谜/试炼/传承）——战斗阶段由 startCombat 处理 */
  static handleStage(player: IPlayer, dungeon: IDungeon, stage: IDungeonStage): IStageHandleResult {
    const state = player.currentDungeonState;
    if (!state) {
      return { logs: ['副本状态异常'], advanced: false, completed: false, failed: false };
    }

    const handler: Partial<Record<DungeonStageType, () => IStageHandleResult>> = {
      [DungeonStageType.EXPLORE]: () => this.handleExploreStage(player, dungeon, stage),
      [DungeonStageType.COMBAT]: () => this.handleCombatStage(player, dungeon, stage),
      [DungeonStageType.PUZZLE]: () => this.handlePuzzleStage(player, dungeon, stage),
      [DungeonStageType.TRIAL]: () => this.handleTrialStage(player, dungeon, stage),
      [DungeonStageType.REWARD]: () => this.handleRewardStage(player, dungeon, stage),
    };

    const fn = stage.stageType !== undefined ? handler[stage.stageType] : undefined;
    if (fn) return fn();
    return this.handleLegacyCombat(player, dungeon, stage);
  }

  /** 探索阶段：寻找线索 */
  private static handleExploreStage(player: IPlayer, dungeon: IDungeon, stage: IDungeonStage): IStageHandleResult {
    const state = player.currentDungeonState!;
    const logs: string[] = [];
    state.explorationCount++;
    logs.push('你开始仔细搜索周围环境...');

    if (stage.clues && stage.clues.length > 0) {
      const undiscovered = stage.clues.filter(c => !state.cluesFound.includes(c.id));
      if (undiscovered.length > 0) {
        const clue = undiscovered[Math.floor(Math.random() * undiscovered.length)];
        state.cluesFound.push(clue.id);
        logs.push(`【发现线索】${clue.name}`);
        logs.push(clue.foundDesc);
      } else {
        logs.push('你已经找到了所有线索，这片区域没有什么可发现的了。');
      }
    }

    const required = stage.requiredExploration ?? stage.clues?.length ?? 1;
    const canAdvance = state.explorationCount >= required &&
      (!stage.clues || stage.clues.every(c => state.cluesFound.includes(c.id)));

    if (canAdvance) {
      logs.push('【阶段完成】你已探索完毕，可以前往下一阶段。');
      const advanceResult = this.advanceStage(player, dungeon, stage);
      return { logs: [...logs, ...advanceResult.logs], advanced: true, completed: advanceResult.completed, failed: false };
    }

    logs.push(`探索进度：${state.explorationCount}/${required}`);
    return { logs, advanced: false, completed: false, failed: false };
  }

  /** 战斗阶段：生成怪物，返回 combat 数据供命令层调用 CombatEngine */
  private static handleCombatStage(player: IPlayer, dungeon: IDungeon, stage: IDungeonStage): IStageHandleResult {
    const state = player.currentDungeonState!;
    const hostileNPC = state.rivalNPCs.find(r => !r.isDefeated && !r.isFriendly);

    if (hostileNPC) {
      // 优先与敌对竞争者战斗
      const monster = this.createRivalNPCMonster(hostileNPC, dungeon);
      return {
        logs: [`【遭遇竞争者】${hostileNPC.title} · ${hostileNPC.name} 拦住了你的去路！`],
        advanced: false,
        completed: false,
        failed: false,
        combat: { monster, isRivalNPC: true, rivalNPCId: hostileNPC.id },
      };
    }

    // 与守护妖兽战斗
    const monster = this.createStageMonster(dungeon, stage);
    return {
      logs: ['【遭遇守护妖兽】一头强大的妖兽从暗处扑出！'],
      advanced: false,
      completed: false,
      failed: false,
      combat: { monster, isRivalNPC: false },
    };
  }

  /** 解谜阶段：检查线索是否齐全 */
  private static handlePuzzleStage(player: IPlayer, dungeon: IDungeon, stage: IDungeonStage): IStageHandleResult {
    const state = player.currentDungeonState!;
    if (!stage.puzzles || stage.puzzles.length === 0) {
      const advanceResult = this.advanceStage(player, dungeon, stage);
      return { logs: advanceResult.logs, advanced: true, completed: advanceResult.completed, failed: false };
    }

    const puzzle = stage.puzzles[0];
    const missing = puzzle.requiredClues.filter(c => !state.cluesFound.includes(c));
    if (missing.length > 0) {
      return {
        logs: ['【解谜失败】你还缺少关键线索。', '需要返回上一阶段寻找缺失的线索。'],
        advanced: false,
        completed: false,
        failed: false,
      };
    }

    const logs = [`【解谜成功】${puzzle.name}`, puzzle.solvedDesc];
    const advanceResult = this.advanceStage(player, dungeon, stage);
    return { logs: [...logs, ...advanceResult.logs], advanced: true, completed: advanceResult.completed, failed: false };
  }

  /** 试炼阶段：基于境界差+攻击力+线索收集计算成功率 */
  private static handleTrialStage(player: IPlayer, dungeon: IDungeon, stage: IDungeonStage): IStageHandleResult {
    const state = player.currentDungeonState!;
    const requiredRealm = stage.requiredRealm ?? CultivationRealm.MORTAL;
    const logs = [`【试炼开始】${stage.name}`, stage.description];
    if (stage.inheritanceDesc) logs.push(stage.inheritanceDesc);

    // 基础成功率
    const realmDiff = player.realm - requiredRealm;
    let chance = Math.min(0.9, Math.max(0.1, 0.3 + realmDiff * 0.15 + (player.attack || 0) * 0.001));

    // 线索收集加成：每多一个线索 +5%
    const totalCluesInDungeon = dungeon.stages
      .filter(s => s.stageType === DungeonStageType.EXPLORE)
      .reduce((sum, s) => sum + (s.clues?.length || 0), 0);
    const foundCluesRatio = totalCluesInDungeon > 0 ? state.cluesFound.length / totalCluesInDungeon : 0;
    chance += foundCluesRatio * 0.15;
    chance = Math.min(0.95, chance);

    const success = Math.random() < chance;

    if (success) {
      logs.push('【试炼通过】你以强大的实力和坚定的意志通过了试炼！');
      const advanceResult = this.advanceStage(player, dungeon, stage);
      return { logs: [...logs, ...advanceResult.logs], advanced: true, completed: advanceResult.completed, failed: false };
    }

    const hpLoss = Math.floor(player.maxHp * 0.2);
    player.hp = Math.max(1, player.hp - hpLoss);
    logs.push(`【试炼失败】你未能通过试炼，受到了反噬，损失${hpLoss}点气血。`);
    logs.push('你可以调整状态后再次尝试。');
    return { logs, advanced: false, completed: false, failed: false };
  }

  /** 传承阶段：发放奖励 */
  private static handleRewardStage(player: IPlayer, dungeon: IDungeon, stage: IDungeonStage): IStageHandleResult {
    const logs = [`【传承降临】${stage.name}`];
    if (stage.inheritanceDesc) logs.push(stage.inheritanceDesc);

    for (const r of stage.rewards) {
      const msg = this.grantReward(player, r);
      if (msg) logs.push(`◆ ${msg}`);
    }

    const advanceResult = this.advanceStage(player, dungeon, stage);
    return { logs: [...logs, ...advanceResult.logs], advanced: true, completed: advanceResult.completed, failed: false };
  }

  /** 旧格式副本兼容：直接生成怪物战斗 */
  private static handleLegacyCombat(player: IPlayer, dungeon: IDungeon, stage: IDungeonStage): IStageHandleResult {
    const monster = this.createStageMonster(dungeon, stage);
    return {
      logs: ['【遭遇敌人】你遇到了秘境中的守护者！'],
      advanced: false,
      completed: false,
      failed: false,
      combat: { monster, isRivalNPC: false },
    };
  }

  // ============= 阶段推进 =============

  private static advanceStage(player: IPlayer, dungeon: IDungeon, stage: IDungeonStage): { logs: string[]; completed: boolean } {
    const state = player.currentDungeonState!;
    if (stage.rewards) state.tempRewards.push(...stage.rewards);

    state.currentStageIndex++;
    state.explorationCount = 0;

    const nextStage = dungeon.stages[state.currentStageIndex];
    if (nextStage) {
      return { logs: ['你继续深入副本...'], completed: false };
    }

    // 副本通关
    this.completeDungeon(player, dungeon);
    return { logs: ['━━━━━━━━━━━━━━━━━━━━━━━━', '【秘境通关！】', '━━━━━━━━━━━━━━━━━━━━━━━━', `你成功通关了【${dungeon.name}】！`], completed: true };
  }

  /** 副本通关结算 */
  private static completeDungeon(player: IPlayer, dungeon: IDungeon): void {
    const state = player.currentDungeonState!;

    // 发放累积奖励
    for (const r of state.tempRewards) {
      this.grantReward(player, r);
    }
    state.tempRewards = [];

    // 恢复部分血蓝
    player.hp = Math.min(player.maxHp, player.hp + Math.floor(player.maxHp * 0.2));
    player.mana = Math.min(player.maxMana, player.mana + Math.floor(player.maxMana * 0.2));

    // 更新进度
    const progress = player.dungeonProgress.find(p => p.dungeonId === dungeon.id);
    if (progress) {
      progress.completed = true;
      progress.successfulAttempts++;
      progress.lastCompletedAt = Date.now();
    } else {
      player.dungeonProgress.push({
        dungeonId: dungeon.id,
        completed: true,
        currentStage: dungeon.stages.length,
        completedStages: dungeon.stages.map((_, i) => i),
        totalAttempts: 1,
        successfulAttempts: 1,
        lastCompletedAt: Date.now(),
      });
    }

    player.currentDungeonState = undefined;
  }

  // ============= 战斗接入 CombatEngine =============

  /** 生成竞争 NPC 怪物数据 */
  static createRivalNPCMonster(npc: IDungeonRivalNPC, dungeon: IDungeon): IMonster {
    const multiplier = TIER_MULTIPLIER[dungeon.tier] ?? 1;
    const realmBonus = (npc.realm || 0) * 0.5;
    const maxHp = Math.floor((200 + realmBonus * 100) * multiplier);
    return {
      id: `rival_${npc.id}`,
      name: `${npc.title} · ${npc.name}`,
      level: (npc.realm || 1) * 3,
      hp: maxHp,
      maxHp,
      attack: Math.floor((20 + realmBonus * 10) * multiplier),
      defense: Math.floor((10 + realmBonus * 5) * multiplier),
      speed: 10 + (npc.realm || 1) * 2,
      expValue: Math.floor(100 * multiplier),
      drops: [],
      description: npc.description,
      race: '人族',
      skills: ['普通攻击', '重击', '秘法'],
      aiType: 'normal' as MonsterAIType,
      realm: npc.realm,
    };
  }

  /** 生成阶段守护妖兽怪物数据 */
  static createStageMonster(dungeon: IDungeon, stage: IDungeonStage): IMonster {
    const multiplier = TIER_MULTIPLIER[dungeon.tier] ?? 1;
    const isBoss = stage.isBossStage;
    const stageRealm = stage.requiredRealm ?? dungeon.requiredRealm;
    const maxHp = Math.floor((isBoss ? 500 : 150) * multiplier * (1 + stageRealm * 0.3));
    return {
      id: `monster_${dungeon.id}_${stage.id}`,
      name: isBoss ? `【${stage.name}】守护妖兽` : '秘境妖兽',
      level: (stageRealm + 1) * 3,
      hp: maxHp,
      maxHp,
      attack: Math.floor((isBoss ? 35 : 15) * multiplier * (1 + stageRealm * 0.2)),
      defense: Math.floor((isBoss ? 15 : 8) * multiplier * (1 + stageRealm * 0.15)),
      speed: 8 + stageRealm * 2,
      expValue: Math.floor((isBoss ? 300 : 80) * multiplier),
      drops: [],
      description: stage.description,
      race: '妖兽',
      skills: isBoss ? ['横扫', '咆哮', '必杀一击'] : ['普通攻击', '撕咬', '冲撞'],
      aiType: (isBoss ? 'charge' : 'normal') as MonsterAIType,
      realm: stageRealm,
    };
  }

  /**
   * 使用 CombatEngine 快速解决副本内战斗（碾压场景）
   * 返回战斗结果供命令层更新状态
   */
  static quickResolveCombat(player: IPlayer, monster: IMonster): IDungeonCombatResult {
    const engine = new CombatEngine(player, monster);
    const logs: string[] = [];

    // 尝试快速结算（碾压场景）
    const quick = engine.quickResolve();
    if (quick.win) {
      logs.push(`你以碾压之势击败了${monster.name}！`);
      return {
        win: true,
        logs,
        hpLost: quick.hpLost,
        expGain: quick.expGain,
        playerHp: engine.player.hp,
        playerMana: engine.player.mana,
      };
    }

    // 非碾压：模拟完整战斗（简化版，实际应由命令层调用 playerAction 逐步进行）
    // 这里提供一个自动战斗循环作为兜底
    let round = 0;
    const maxRounds = 50;
    while (!engine.ended && round < maxRounds) {
      round++;
      const action = engine.player.hp > engine.player.maxHp * 0.3 ? 'attack' : 'defend';
      const roundLogs = engine.playerAction(action);
      for (const log of roundLogs) {
        logs.push(log.text);
      }
    }

    const win = engine.monster.hp <= 0;
    const hpLost = player.hp - engine.player.hp;
    return {
      win,
      logs,
      hpLost: Math.max(0, hpLost),
      expGain: win ? monster.expValue : 0,
      playerHp: engine.player.hp,
      playerMana: engine.player.mana,
    };
  }

  /** 处理战斗胜利后的副本状态更新 */
  static handleCombatVictory(player: IPlayer, dungeon: IDungeon, isRivalNPC: boolean, rivalNPCId?: string): { logs: string[]; advanced: boolean; completed: boolean } {
    const state = player.currentDungeonState!;
    const logs: string[] = [];

    if (isRivalNPC && rivalNPCId) {
      const rival = state.rivalNPCs.find(r => r.id === rivalNPCId);
      if (rival) {
        rival.isDefeated = true;
        logs.push(`【竞争者击退】${rival.name}身受重伤，退出了争夺。`);
      }
      // 击退竞争者后，仍需与守护妖兽战斗（或直接推进）
      return { logs, advanced: false, completed: false };
    }

    // 击败守护妖兽，推进阶段
    const stage = dungeon.stages[state.currentStageIndex];
    if (stage && stage.stageType === DungeonStageType.COMBAT) {
      const advanceResult = this.advanceStage(player, dungeon, stage);
      return { logs: [...logs, ...advanceResult.logs], advanced: true, completed: advanceResult.completed };
    }

    return { logs, advanced: false, completed: false };
  }

  /** 处理战斗失败 */
  static handleCombatDefeat(player: IPlayer): { logs: string[] } {
    player.hp = Math.floor(player.maxHp * 0.3);
    player.mana = Math.floor(player.maxMana * 0.3);
    player.currentDungeonState = undefined;
    return {
      logs: [
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        '【战斗失败】',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        '你被击败了……',
        '你被神秘力量送出了副本。',
      ],
    };
  }

  // ============= 竞争 NPC 主动行为（小说化争夺） =============

  /**
   * 竞争 NPC 主动行动
   * 每次玩家完成一个阶段后调用，让竞争 NPC 也有机会推进自己的进度
   * 这是"小说化争夺"的核心——NPC 不再只是被动等待
   */
  static processRivalNPCActions(player: IPlayer, dungeon: IDungeon): IRivalActionResult[] {
    const state = player.currentDungeonState;
    if (!state) return [];

    const results: IRivalActionResult[] = [];
    const activeRivals = state.rivalNPCs.filter(r => !r.isDefeated);
    if (activeRivals.length === 0) return [];

    const currentStageIndex = state.currentStageIndex;
    const totalStages = dungeon.stages.length;
    const playerProgressRatio = currentStageIndex / totalStages;

    for (const npc of activeRivals) {
      // 友善 NPC 有 20% 概率主动离开
      if (npc.isFriendly && Math.random() < 0.2) {
        results.push({
          npcId: npc.id,
          npcName: npc.name,
          action: 'leave',
          message: `${npc.name}似乎对传承失去了兴趣，转身离去。`,
        });
        npc.isDefeated = true; // 标记为已退出
        continue;
      }

      // 敌对 NPC 的行为取决于玩家进度
      if (npc.isFriendly) continue;

      const roll = Math.random();

      // 玩家接近传承时，NPC 可能偷袭（30%）
      if (playerProgressRatio >= 0.6 && roll < 0.3) {
        results.push({
          npcId: npc.id,
          npcName: npc.name,
          action: 'ambush',
          message: `【${npc.name}试图偷袭】${npc.name}从暗处冲出，想要夺取你手中的线索！`,
        });
        continue;
      }

      // NPC 发现线索（25%）
      if (roll < 0.25 && currentStageIndex < totalStages - 1) {
        results.push({
          npcId: npc.id,
          npcName: npc.name,
          action: 'find_clue',
          message: `${npc.name}也在搜索线索，你看到他在另一处发现了什么。`,
        });
        continue;
      }

      // NPC 推进进度（20%）—— 可能抢先到达传承
      if (roll < 0.2 && currentStageIndex >= totalStages - 2) {
        // NPC 接近传承时，有概率抢走传承（10%）
        if (currentStageIndex === totalStages - 1 && Math.random() < 0.1) {
          results.push({
            npcId: npc.id,
            npcName: npc.name,
            action: 'advance',
            message: `【危急】${npc.name}已经抢先一步到达传承之地！你必须立即阻止他！`,
            stoleInheritance: true,
          });
        } else {
          results.push({
            npcId: npc.id,
            npcName: npc.name,
            action: 'advance',
            message: `${npc.name}悄然深入了副本，似乎也在向传承之地推进。`,
          });
        }
        continue;
      }

      // NPC 嘲讽（10%）
      if (roll < 0.1) {
        const taunts = [
          `${npc.name}冷笑道："这传承非我莫属，你趁早退去。"`,
          `${npc.name}不屑地看了你一眼："区区修为，也敢觊觎传承？"`,
          `${npc.name}沉声道："此地的造化，只能属于一人。"`,
        ];
        results.push({
          npcId: npc.id,
          npcName: npc.name,
          action: 'taunt',
          message: taunts[Math.floor(Math.random() * taunts.length)],
        });
      }
    }

    return results;
  }

  // ============= 奖励发放 =============

  static grantReward(player: IPlayer, reward: IDungeonReward): string | null {
    switch (reward.type) {
      case 'item':
        return reward.id ? `获得物品: ${reward.name || reward.id} ×${reward.amount}` : null;
      case 'technique': {
        if (!reward.id) return null;
        const t = getTechniqueById(reward.id);
        if (!t) return null;
        player.techniques.push({ ...t });
        return `获得宝术: ${t.name}`;
      }
      case 'inheritance': {
        const result = reward.id ? MethodService.learnMethod(player, reward.id) : null;
        if (result?.success) return `【传承获得】${reward.name} — 领悟传承功法！`;
        player.cultivationExp += 5000;
        return `【传承获得】${reward.name} — 修为大涨，领悟传承奥义！`;
      }
      case 'exp':
        player.cultivationExp += reward.amount;
        return `获得修为: ${reward.amount}`;
      case 'gold':
        player.gold += reward.amount;
        return `获得灵石: ${reward.amount}`;
      case 'talent':
      case 'law':
      default:
        return null;
    }
  }

  // ============= 查询 =============

  /** 获取副本进度（修复原 getDungeonProgress 空桩） */
  static getDungeonProgress(player: IPlayer, dungeonId: string): IDungeonProgress | undefined {
    return player.dungeonProgress.find(p => p.dungeonId === dungeonId);
  }

  /** 获取玩家可进入的副本列表 */
  static getAvailableDungeons(player: IPlayer): IDungeon[] {
    return DUNGEONS.filter(d => d.requiredRealm <= player.realm);
  }

  /** 检查玩家是否在副本中 */
  static isInDungeon(player: IPlayer): boolean {
    return !!player.currentDungeonState;
  }

  /** 获取当前副本 */
  static getCurrentDungeon(player: IPlayer): IDungeon | undefined {
    if (!player.currentDungeonState) return undefined;
    return findDungeon(player.currentDungeonState.dungeonId);
  }

  /** 获取当前阶段 */
  static getCurrentStage(player: IPlayer): IDungeonStage | undefined {
    const dungeon = this.getCurrentDungeon(player);
    if (!dungeon || !player.currentDungeonState) return undefined;
    return dungeon.stages[player.currentDungeonState.currentStageIndex];
  }

  /** 获取剩余每日次数 */
  static getRemainingDailyEntries(player: IPlayer, dungeonId: string): number {
    const dungeon = findDungeon(dungeonId);
    if (!dungeon) return 0;
    const entryKey = `${player.id}_${dungeonId}`;
    const entryLog = this.dailyEntryLog.get(entryKey);
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    if (entryLog && now - entryLog.lastEntryTime < oneDayMs) {
      return Math.max(0, dungeon.dailyLimit - entryLog.count);
    }
    return dungeon.dailyLimit;
  }
}
