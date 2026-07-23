import { ICommandHandler, ICommandContext } from './CommandRouter';
import { DUNGEONS, findDungeon, DungeonStageType, IDungeonRivalNPC, IDungeon, IDungeonStage } from '../../domain/entities/Dungeon';
import { CultivationRealm, IPlayer, RealmNames } from '../../domain/entities/Player';
import { IMonster } from '../../domain/entities/Monster';
import { DungeonService } from '../../domain/services/DungeonService';
import { CombatEngine } from '../../domain/services/CombatEngine';
import { MethodService } from '../../domain/services/MethodService';
import { getTechniqueById } from '../../data/seed/techniques';
import { CommandHelper } from './CommandHelper';

/**
 * 副本命令处理器
 *
 * 已重构为接入 DungeonService 服务层 + CombatEngine 战斗引擎：
 * - 业务逻辑由 DungeonService 处理
 * - 战斗由 CombatEngine 处理（替代内嵌简化战斗）
 * - 竞争 NPC 主动行为由 DungeonService.processRivalNPCActions 驱动
 * - 本类仅负责 UI 渲染和用户交互
 */
export class DungeonCommand implements ICommandHandler {
  /** 当前战斗引擎实例（接入 CombatEngine） */
  private combatEngine: CombatEngine | null = null;
  /** 当前战斗的副本上下文 */
  private combatContext: { dungeon: IDungeon; isRivalNPC: boolean; rivalNPCId?: string } | null = null;

  canHandle(action: string): boolean {
    return [
      'dungeon', '秘境', '副本', 'enter', '进入', '挑战', '离开副本',
      '闪避', '使用宝术', '战斗', '战斗攻击', '战斗防御',
      '与NPC交互',
      '战斗逃跑',
    ].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const player = context.store.getState().player;

    switch (action) {
      case 'dungeon':
      case '秘境':
      case '副本':
        this.showDungeons(context, player);
        break;
      case 'enter':
      case '进入':
        this.enterDungeon(context, player, args.join(' '));
        break;
      case '挑战':
        this.challengeDungeon(context, player);
        break;
      case '离开副本':
        this.leaveDungeon(context, player);
        break;
      case '战斗攻击':
        this.playerAttack(context);
        break;
      case '战斗防御':
        this.playerDefend(context);
        break;
      case '闪避':
        this.playerDodge(context);
        break;
      case '使用宝术':
        this.playerUseTechnique(context, args);
        break;
      case '战斗逃跑':
        this.playerFlee(context);
        break;
      case '与NPC交互':
        this.interactWithRivalNPC(context, player, args.join(' '));
        break;
    }
  }

  // ================== 副本列表展示 ==================

  private showDungeons(ctx: ICommandContext, player: IPlayer): void {
    const { store, narrative, modalManager } = ctx;
    const availableDungeons = DungeonService.getAvailableDungeons(player);

    if (!modalManager) {
      if (availableDungeons.length === 0) {
        CommandHelper.say(store, '你的境界不足以进入任何秘境。');
        return;
      }
      CommandHelper.say(store, '\n【秘境系统】');
      const items = availableDungeons.map(d => {
        const remaining = DungeonService.getRemainingDailyEntries(player, d.id);
        return {
          label: `${d.name}（${d.type}·${d.tier}）— 需${RealmNames[d.requiredRealm]}`,
          action: `进入 ${d.name}`,
          desc: `${d.description} | 推荐境界: ${RealmNames[d.recommendedRealm]} | 今日剩余${remaining}次`,
          disabled: player.currentRoomId !== d.entranceRoomId,
        };
      });
      CommandHelper.pushList(narrative, '可进入的秘境 · 点击查看详情', items);
      CommandHelper.say(store, '（灰色表示未在入口位置，需先前往入口）');
      return;
    }

    modalManager.showInteractive('秘境系统', (container: HTMLElement) => {
      if (availableDungeons.length === 0) {
        container.innerHTML = '<div class="modal-empty">你的境界不足以进入任何秘境。<br/>提升境界可解锁更多秘境。</div>';
        return;
      }
      const dungeonList = document.createElement('div');
      dungeonList.className = 'dungeon-list';
      for (const dungeon of availableDungeons) {
        const isAtEntrance = player.currentRoomId === dungeon.entranceRoomId;
        const remaining = DungeonService.getRemainingDailyEntries(player, dungeon.id);
        const card = document.createElement('div');
        card.className = `dungeon-card ${isAtEntrance && remaining > 0 ? '' : 'disabled'}`;
        card.innerHTML = `
          <div class="dungeon-icon">🏰</div>
          <div class="dungeon-info">
            <div class="dungeon-name"><span>${dungeon.name}</span><span class="dungeon-tier">${dungeon.tier}</span></div>
            <div class="dungeon-type">${dungeon.type} · 需要${RealmNames[dungeon.requiredRealm]}</div>
            <div class="dungeon-desc">${dungeon.description}</div>
            <div class="dungeon-info-row">
              <span>推荐：${RealmNames[dungeon.recommendedRealm]}</span>
              <span>今日剩余：${remaining}/${dungeon.dailyLimit}</span>
            </div>
            ${!isAtEntrance ? '<div class="dungeon-hint">未在入口位置，需先前往入口</div>' : ''}
            ${remaining === 0 ? '<div class="dungeon-hint">今日次数已用完</div>' : ''}
          </div>
        `;
        const btn = document.createElement('button');
        btn.className = `modal-btn ${isAtEntrance && remaining > 0 ? 'modal-btn-primary' : 'modal-btn-disabled'}`;
        btn.textContent = isAtEntrance ? (remaining > 0 ? '进入秘境' : '次数已满') : '前往入口';
        btn.disabled = !isAtEntrance || remaining === 0;
        btn.addEventListener('click', () => {
          if (isAtEntrance && remaining > 0) {
            modalManager.close();
            this.enterDungeon(ctx, player, dungeon.name);
          }
        });
        card.appendChild(btn);
        dungeonList.appendChild(card);
      }
      container.appendChild(dungeonList);
    }, { width: '650px', height: '450px' });
  }

  // ================== 进入副本 ==================

  private enterDungeon(ctx: ICommandContext, player: IPlayer, dungeonName: string): void {
    const { store, narrative } = ctx;
    if (!dungeonName) {
      CommandHelper.say(store, '请指定要进入的秘境名称。');
      return;
    }

    const dungeon = this.findDungeonByName(dungeonName);
    if (!dungeon) {
      CommandHelper.say(store, `未找到秘境: ${dungeonName}`);
      return;
    }

    if (player.currentRoomId !== dungeon.entranceRoomId) {
      CommandHelper.say(store, `你需要先前往${dungeon.name}的入口。`);
      return;
    }

    // 调用 DungeonService 进入副本
    const result = DungeonService.enterDungeon(player, dungeon.id);
    if (!result.success) {
      CommandHelper.say(store, result.message);
      return;
    }

    CommandHelper.notifyPlayerChanged(store);

    CommandHelper.sayBlock(store, [
      `\n━━━━━━━━━━━━━━━━━━━━━━━━\n【进入${dungeon.name}】\n━━━━━━━━━━━━━━━━━━━━━━━━`,
      dungeon.description,
      `\n来历：${dungeon.originStory}`,
    ]);

    if (result.state?.rivalNPCs && result.state.rivalNPCs.length > 0) {
      CommandHelper.say(store, '\n【争夺者】你察觉到附近还有其他修士的气息...');
      for (const npc of result.state.rivalNPCs) {
        const attitude = npc.isFriendly ? '（似乎可以交流）' : '（目光中带着敌意）';
        CommandHelper.say(store, `◆ ${npc.title} · ${npc.name} — ${npc.description}${attitude}`);
      }
    }

    this.showDungeonStatus(ctx, store.getState().player, dungeon);
  }

  private findDungeonByName(name: string): IDungeon | undefined {
    const slug = name.toLowerCase().replace(/\s+/g, '_');
    return DUNGEONS.find(d => d.name.includes(name) || d.id.includes(slug));
  }

  // ================== 显示副本状态 ==================

  private showDungeonStatus(ctx: ICommandContext, player: IPlayer, dungeon: IDungeon): void {
    const { store, narrative } = ctx;
    const state = player.currentDungeonState;
    if (!state) return;

    const stage = dungeon.stages[state.currentStageIndex];
    if (!stage) {
      // 副本已通关（由 DungeonService 处理）
      return;
    }

    CommandHelper.sayBlock(store, [
      `\n━━━ 第${state.currentStageIndex + 1}阶段：${stage.name} ━━━`,
      stage.description,
      this.stageHint(stage, state),
    ]);

    const activeRivals = state.rivalNPCs.filter((r: IDungeonRivalNPC) => !r.isDefeated);
    if (activeRivals.length > 0) {
      CommandHelper.say(store, '\n【竞争者在附近】');
      for (const r of activeRivals) {
        CommandHelper.say(store, `◆ ${r.name} — ${r.isFriendly ? '态度友善' : '敌意明显'}`);
      }
    }

    this.showStageActions(ctx, player, dungeon, stage);
  }

  private stageHint(stage: IDungeonStage, state: import('../../domain/entities/Dungeon').ICurrentDungeonState): string {
    switch (stage.stageType) {
      case DungeonStageType.EXPLORE: {
        if (stage.clues && stage.clues.length > 0) {
          const found = stage.clues.filter(c => state.cluesFound.includes(c.id)).length;
          return `\n【探索阶段】仔细搜索周围，寻找开启下一阶段的线索。\n已发现线索：${found}/${stage.clues.length}`;
        }
        return '\n【探索阶段】仔细搜索周围，寻找开启下一阶段的线索。';
      }
      case DungeonStageType.COMBAT:
        return '\n【战斗阶段】强大的敌人挡在前方，必须击败才能继续前进。';
      case DungeonStageType.PUZZLE: {
        if (stage.puzzles && stage.puzzles.length > 0) {
          const puzzle = stage.puzzles[0];
          const foundClues = puzzle.requiredClues.filter(c => state.cluesFound.includes(c)).length;
          return `\n【解谜阶段】需要集齐线索才能解开封印。\n解谜进度：${foundClues}/${puzzle.requiredClues.length}`;
        }
        return '\n【解谜阶段】需要集齐线索才能解开封印。';
      }
      case DungeonStageType.TRIAL:
        return '\n【试炼阶段】前方是上古强者设下的试炼，需以命相搏。';
      case DungeonStageType.REWARD:
        return '\n【传承阶段】你已到达传承之地，接受最终的馈赠。';
      default:
        return '';
    }
  }

  private showStageActions(ctx: ICommandContext, player: IPlayer, dungeon: IDungeon, stage: IDungeonStage): void {
    const { narrative } = ctx;
    const state = player.currentDungeonState;
    const actions: { label: string; action: string; desc: string; disabled?: boolean }[] = [];

    const primary: Record<string, string> = {
      [DungeonStageType.EXPLORE]: '🔍 搜索线索',
      [DungeonStageType.COMBAT]: '⚔ 迎战',
      [DungeonStageType.PUZZLE]: '🔓 尝试解谜',
      [DungeonStageType.TRIAL]: '🔥 接受试炼',
      [DungeonStageType.REWARD]: '✦ 接受传承',
    };
    const descMap: Record<string, string> = {
      [DungeonStageType.EXPLORE]: '仔细搜索周围环境',
      [DungeonStageType.COMBAT]: '与守护妖兽或竞争者战斗',
      [DungeonStageType.PUZZLE]: '用已收集的线索解开封印',
      [DungeonStageType.TRIAL]: '进入试炼之地',
      [DungeonStageType.REWARD]: '获得最终奖励',
    };
    if (stage.stageType !== undefined && primary[stage.stageType]) {
      actions.push({ label: primary[stage.stageType], action: '挑战', desc: descMap[stage.stageType] });
    }

    const activeRivals = state?.rivalNPCs.filter((r: IDungeonRivalNPC) => !r.isDefeated) || [];
    for (const r of activeRivals) {
      actions.push({
        label: r.isFriendly ? `🤝 与${r.name}交涉` : `⚔ 与${r.name}交战`,
        action: `与NPC交互 ${r.id}`,
        desc: r.isFriendly ? '尝试与竞争者结盟' : '击败竞争者',
      });
    }

    actions.push({ label: '🚪 离开副本', action: '离开副本', desc: '暂时退出副本（保留当前进度）' });

    CommandHelper.pushList(narrative, '副本操作', actions);
  }

  // ================== 挑战/探索 ==================

  private challengeDungeon(ctx: ICommandContext, player: IPlayer): void {
    const { store } = ctx;
    const state = player.currentDungeonState;
    if (!state) {
      CommandHelper.say(store, '你不在任何副本中。');
      return;
    }
    const dungeon = findDungeon(state.dungeonId);
    if (!dungeon) {
      CommandHelper.say(store, '副本数据异常。');
      return;
    }
    const stage = dungeon.stages[state.currentStageIndex];
    if (!stage) {
      return;
    }

    // 调用 DungeonService 处理阶段
    const result = DungeonService.handleStage(player, dungeon, stage);
    CommandHelper.sayBlock(store, result.logs);

    if (result.combat) {
      // 进入战斗：使用 CombatEngine
      this.startCombat(ctx, player, dungeon, result.combat.monster, result.combat.isRivalNPC ?? false, result.combat.rivalNPCId);
      return;
    }

    if (result.completed) {
      this.onDungeonCompleted(ctx, player, dungeon);
      return;
    }

    if (result.advanced) {
      // 阶段推进后，竞争 NPC 主动行动
      this.processRivalActions(ctx, player, dungeon);
      CommandHelper.notifyPlayerChanged(store);
      this.showDungeonStatus(ctx, store.getState().player, dungeon);
      return;
    }

    CommandHelper.notifyPlayerChanged(store);
    // 未推进，继续显示当前阶段操作
    const currentStage = dungeon.stages[state.currentStageIndex];
    if (currentStage) this.showStageActions(ctx, player, dungeon, currentStage);
  }

  // ================== 竞争 NPC 主动行为 ==================

  private processRivalActions(ctx: ICommandContext, player: IPlayer, dungeon: IDungeon): void {
    const { store } = ctx;
    const results = DungeonService.processRivalNPCActions(player, dungeon);
    if (results.length === 0) return;

    CommandHelper.say(store, '\n【竞争者动向】');
    for (const r of results) {
      CommandHelper.say(store, `◆ ${r.message}`);

      if (r.action === 'ambush') {
        // NPC 偷袭：直接触发与该 NPC 的战斗
        const npc = player.currentDungeonState?.rivalNPCs.find(n => n.id === r.npcId);
        if (npc) {
          const monster = DungeonService.createRivalNPCMonster(npc, dungeon);
          CommandHelper.say(store, `\n${npc.name}向你发动了攻击！`);
          this.startCombat(ctx, player, dungeon, monster, true, npc.id);
          return;
        }
      }

      if (r.stoleInheritance) {
        // NPC 抢走传承：玩家必须立即与之战斗夺回
        CommandHelper.say(store, '【警告】若不立即击败他，传承将落入他人之手！');
      }
    }
    CommandHelper.notifyPlayerChanged(store);
  }

  // ================== 战斗系统（接入 CombatEngine） ==================

  private startCombat(ctx: ICommandContext, player: IPlayer, dungeon: IDungeon, monster: IMonster, isRivalNPC: boolean, rivalNPCId?: string): void {
    const { store } = ctx;
    this.combatEngine = new CombatEngine(player, monster);
    this.combatContext = { dungeon, isRivalNPC, rivalNPCId };

    CommandHelper.sayBlock(store, [
      `\n遭遇敌人：${monster.name}`,
      `敌人血量：${this.renderHpBar(monster.hp, monster.maxHp)} ${monster.hp}/${monster.maxHp}`,
      `你的血量：${this.renderHpBar(player.hp, player.maxHp)} ${player.hp}/${player.maxHp}`,
    ]);
    this.showBattleOptions(ctx);
  }

  private renderHpBar(current: number, max: number): string {
    const filled = Math.floor((current / max) * 20);
    return '█'.repeat(filled) + '░'.repeat(20 - filled);
  }

  private showBattleOptions(ctx: ICommandContext): void {
    const player = ctx.store.getState().player;
    const techniques = player.techniques
      .map(tech => getTechniqueById(tech.id))
      .filter((t): t is NonNullable<ReturnType<typeof getTechniqueById>> => Boolean(t));
    const basicActions = [
      { label: '⚔ 普通攻击', action: '战斗攻击', desc: '基础攻击，消耗0法力' },
      { label: '🛡 防御', action: '战斗防御', desc: '本回合减少受到的伤害' },
      { label: '💨 闪避', action: '闪避', desc: '50%概率完全躲避攻击' },
      { label: '🏃 逃跑', action: '战斗逃跑', desc: '尝试逃离战斗（会失去部分进度）' },
    ];
    const techniqueActions = techniques.map(t => ({
      label: `📜 ${t.name}`,
      action: `使用宝术 ${t.id}`,
      desc: `${t.description} | 消耗${t.manaCost || 10}法力`,
      disabled: player.mana < (t.manaCost || 10),
    }));
    CommandHelper.pushList(ctx.narrative, '战斗操作', [...basicActions, ...techniqueActions]);
  }

  private playerAttack(ctx: ICommandContext): void {
    if (!this.combatEngine) return CommandHelper.say(ctx.store, '你不在战斗中！');
    const { store } = ctx;
    const logs = this.combatEngine.playerAction('attack');
    this.renderCombatLogs(store, logs);
    this.checkCombatEnd(ctx);
  }

  private playerDefend(ctx: ICommandContext): void {
    if (!this.combatEngine) return CommandHelper.say(ctx.store, '你不在战斗中！');
    const { store } = ctx;
    const logs = this.combatEngine.playerAction('defend');
    this.renderCombatLogs(store, logs);
    this.checkCombatEnd(ctx);
  }

  private playerDodge(ctx: ICommandContext): void {
    if (!this.combatEngine) return CommandHelper.say(ctx.store, '你不在战斗中！');
    // 闪避用 defend 模拟（CombatEngine 无独立 dodge）
    const { store } = ctx;
    const logs = this.combatEngine.playerAction('defend');
    CommandHelper.say(store, '\n你身形一闪，试图闪避敌人的攻击！');
    this.renderCombatLogs(store, logs);
    this.checkCombatEnd(ctx);
  }

  private playerUseTechnique(ctx: ICommandContext, args: string[]): void {
    if (!this.combatEngine) return CommandHelper.say(ctx.store, '你不在战斗中！');
    const { store } = ctx;
    const techId = args.join(' ');
    const player = store.getState().player;
    const technique = getTechniqueById(techId);
    if (!technique) return CommandHelper.say(store, `未找到宝术：${techId}`);
    if (player.mana < (technique.manaCost || 10)) return CommandHelper.say(store, '法力不足！');

    const logs = this.combatEngine.playerAction('technique', techId);
    this.renderCombatLogs(store, logs);
    this.checkCombatEnd(ctx);
  }

  private playerFlee(ctx: ICommandContext): void {
    if (!this.combatEngine) return CommandHelper.say(ctx.store, '你不在战斗中！');
    const { store } = ctx;
    const logs = this.combatEngine.playerAction('flee');
    this.renderCombatLogs(store, logs);

    if (this.combatEngine.ended) {
      // 逃跑成功
      CommandHelper.say(store, '\n你成功逃离了战斗，但失去了部分副本进度。');
      this.combatEngine = null;
      this.combatContext = null;
      // 逃跑视为离开副本
      this.leaveDungeon(ctx, store.getState().player);
    }
  }

  private renderCombatLogs(store: any, logs: import('../../domain/services/CombatEngine').ICombatLog[]): void {
    for (const log of logs) {
      CommandHelper.say(store, log.text);
    }
    if (this.combatEngine) {
      const player = store.getState().player;
      const monster = this.combatEngine.monster;
      if (monster.hp > 0) {
        CommandHelper.say(store, `敌人血量：${this.renderHpBar(monster.hp, monster.maxHp)} ${monster.hp}/${monster.maxHp}`);
      }
      if (player.hp > 0) {
        CommandHelper.say(store, `你的血量：${this.renderHpBar(player.hp, player.maxHp)} ${player.hp}/${player.maxHp}`);
      }
    }
  }

  private checkCombatEnd(ctx: ICommandContext): void {
    if (!this.combatEngine) return;
    const { store } = ctx;

    if (this.combatEngine.ended) {
      const player = store.getState().player;
      const monster = this.combatEngine.monster;
      const isVictory = monster.hp <= 0;

      // 同步玩家血蓝到 store
      player.hp = this.combatEngine.player.hp;
      player.mana = this.combatEngine.player.mana;

      if (isVictory) {
        CommandHelper.say(store, `\n⚔ 你击败了${monster.name}！`);
        if (this.combatContext) {
          const { dungeon, isRivalNPC, rivalNPCId } = this.combatContext;
          const result = DungeonService.handleCombatVictory(player, dungeon, isRivalNPC, rivalNPCId);
          CommandHelper.sayBlock(store, result.logs);
          CommandHelper.notifyPlayerChanged(store);

          this.combatEngine = null;
          this.combatContext = null;

          if (result.completed) {
            this.onDungeonCompleted(ctx, player, dungeon);
          } else if (result.advanced) {
            // 推进后竞争 NPC 行动
            this.processRivalActions(ctx, player, dungeon);
            CommandHelper.notifyPlayerChanged(store);
            this.showDungeonStatus(ctx, player, dungeon);
          } else {
            // 击退竞争者后仍需与守护妖兽战斗
            const stage = dungeon.stages[player.currentDungeonState!.currentStageIndex];
            if (stage) this.showStageActions(ctx, player, dungeon, stage);
          }
        }
      } else {
        // 玩家战败
        const result = DungeonService.handleCombatDefeat(player);
        CommandHelper.sayBlock(store, result.logs);
        CommandHelper.notifyPlayerChanged(store);
        this.combatEngine = null;
        this.combatContext = null;
        CommandHelper.pushList(ctx.narrative, '战斗失败', [
          { label: '返回石城', action: '前往 石城', desc: '返回安全区域恢复' },
          { label: '查看状态', action: '状态', desc: '查看角色状态' },
        ]);
      }
    } else {
      // 战斗继续
      CommandHelper.notifyPlayerChanged(store);
      this.showBattleOptions(ctx);
    }
  }

  // ================== 离开副本 ==================

  private leaveDungeon(ctx: ICommandContext, player: IPlayer): void {
    const { store, narrative } = ctx;
    const result = DungeonService.leaveDungeon(player);
    CommandHelper.say(store, `\n${result.message}`);

    if (result.grantedRewards.length > 0) {
      CommandHelper.say(store, '\n【已获得奖励】');
      result.grantedRewards.forEach(msg => CommandHelper.say(store, `  ◆ ${msg}`));
    }

    CommandHelper.notifyPlayerChanged(store);
    CommandHelper.pushList(narrative, '副本外', [
      { label: '返回石城', action: '前往 石城', desc: '返回安全区域' },
      { label: '查看状态', action: '状态', desc: '查看角色状态' },
    ]);
  }

  // ================== 副本通关 ==================

  private onDungeonCompleted(ctx: ICommandContext, player: IPlayer, dungeon: IDungeon): void {
    const { store, narrative } = ctx;
    CommandHelper.sayBlock(store, [
      '秘境的力量认可了你的实力。',
      `\n【获得奖励】`,
    ]);

    // 发放累积奖励
    const state = player.currentDungeonState;
    if (state && state.tempRewards.length > 0) {
      for (const r of state.tempRewards) {
        const msg = DungeonService.grantReward(player, r);
        if (msg) CommandHelper.say(store, `  ◆ ${msg}`);
      }
      state.tempRewards = [];
    }

    CommandHelper.say(store, `\n气血和法力恢复了一部分。`);
    CommandHelper.notifyPlayerChanged(store);

    CommandHelper.pushList(narrative, '通关成功', [
      { label: '返回石城', action: '前往 石城', desc: '返回安全区域' },
      { label: '查看状态', action: '状态', desc: '查看角色状态' },
      { label: '查看背包', action: '背包', desc: '查看获得的物品' },
    ]);
  }

  // ================== 竞争NPC交互 ==================

  private interactWithRivalNPC(ctx: ICommandContext, player: IPlayer, npcId: string): void {
    const { store } = ctx;
    const state = player.currentDungeonState;
    if (!state) {
      CommandHelper.say(store, '你不在任何副本中。');
      return;
    }

    const npc = state.rivalNPCs.find((r: IDungeonRivalNPC) => r.id === npcId);
    if (!npc || npc.isDefeated) {
      CommandHelper.say(store, '该竞争者已不在附近。');
      return;
    }

    if (npc.isFriendly) {
      CommandHelper.sayBlock(store, [
        `\n【与${npc.name}交谈】`,
        `${npc.name}看了你一眼，说道："这副本深处的传承非同小可，我已放弃争夺，祝你好运。"`,
        `${npc.name}将所知的一些信息告诉了你，然后转身离去。`,
        '\n你获得了一些有用的信息，接下来可以专心探索副本。',
      ]);
      npc.isDefeated = true;
      CommandHelper.notifyPlayerChanged(store);
    } else {
      CommandHelper.say(store, `\n【与${npc.name}交战】${npc.description}`);
      const dungeon = findDungeon(state.dungeonId);
      if (dungeon) {
        const monster = DungeonService.createRivalNPCMonster(npc, dungeon);
        this.startCombat(ctx, player, dungeon, monster, true, npc.id);
      }
    }
  }
}
