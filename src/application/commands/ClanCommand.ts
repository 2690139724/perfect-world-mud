import { ICommandHandler, ICommandContext } from './CommandRouter';
import { getFullRealmName } from '../../domain/entities/Player';
import { ISect, ISectMember, SectRole, FamilyRole, ForceType } from '../../domain/entities/Sect';
import { getSectById, ALL_SECTS } from '../../data/sects/sect_data';
import { SectService } from '../../domain/services/SectService';
import { MethodService } from '../../domain/services/MethodService';

/**
 * 宗门指令处理器
 *
 * 接入 SectService 的核心功能：
 * - 宗门列表/加入/退出（joinForce/leaveForce）
 * - 宗门任务（acceptQuest + 日常/周常任务 generateDailyTasks/claimTaskReward）
 * - 宗门贡献捐献（donate）
 * - 职位晋升（promoteMemberIfQualified）
 * - 宗门状态/加成（getForceStatus/getSectBonuses）
 *
 * UI 风格：按钮+可点击列表（无指令框）
 */
export class ClanCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return [
      'clan', '宗门',
      '加入宗门', '退出宗门',
      '宗门贡献', '宗门职位', '宗门任务',
      '宗门捐献', '宗门状态', '宗门建筑', '宗门任务列表', '领取宗门任务奖励',
    ].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;

    switch (action) {
      case 'clan':
      case '宗门':
        this.showClan(store, narrative, modalManager);
        break;
      case '加入宗门':
        this.joinClan(store, narrative, args[0]);
        break;
      case '退出宗门':
        this.leaveClan(store, narrative);
        break;
      case '宗门贡献':
      case '宗门捐献':
        this.donateClan(store, narrative, modalManager, args[0]);
        break;
      case '宗门职位':
        this.showRank(store, narrative, modalManager);
        break;
      case '宗门任务':
      case '宗门任务列表':
        // 带 questId 参数：接受/完成经典宗门任务；否则打开任务面板
        if (args[0]) {
          this.acceptClanQuest(store, narrative, args[0]);
        } else {
          this.showClanTasks(store, narrative, modalManager);
        }
        break;
      case '领取宗门任务奖励':
        this.claimTaskReward(store, narrative, args[0]);
        break;
      case '宗门状态':
        this.showSectStatus(store, narrative, modalManager);
        break;
      case '宗门建筑':
        this.showBuildings(store, narrative, modalManager);
        break;
    }
  }

  /** 获取玩家当前所在宗门 */
  private getPlayerSect(player: any): ISect | undefined {
    if (!player.sectId && !player.currentSectId) return undefined;
    const sectId = player.sectId || player.currentSectId;
    return getSectById(sectId);
  }

  /** 获取玩家在宗门中的成员记录 */
  private getPlayerMember(player: any, sect: ISect): ISectMember | undefined {
    return sect.members.find(m => m.playerId === player.id);
  }

  /** 角色名称映射（SectRole/FamilyRole 枚举值即中文显示名，此函数作为兜底） */
  private getRoleName(role: SectRole | FamilyRole | string): string {
    // 枚举值本身已是中文显示名，直接返回
    if (typeof role === 'string' && role.trim().length > 0) return role;
    const roleNames: Record<string, string> = {
      [SectRole.DISCIPLE]: '弟子',
      [SectRole.ELITE_DISCIPLE]: '精英弟子',
      [SectRole.CORE_DISCIPLE]: '核心弟子',
      [SectRole.ELDER]: '长老',
      [SectRole.GRAND_ELDER]: '太上长老',
      [SectRole.SUCCESSOR]: '少主',
      [SectRole.MASTER]: '宗主',
      [FamilyRole.FOUNDER]: '创始人',
      [FamilyRole.PATRIARCH]: '族长',
      [FamilyRole.HEIR]: '继承人',
      [FamilyRole.MEMBER]: '家族成员',
    };
    return roleNames[role as string] || String(role);
  }

  /** 任务难度名称 */
  private getDifficultyName(difficulty: string): string {
    const names: Record<string, string> = {
      easy: '简单',
      normal: '普通',
      medium: '中等',
      hard: '困难',
      epic: '史诗',
      legendary: '传说',
    };
    return names[difficulty] || difficulty;
  }

  /** 任务类型名称 */
  private getQuestTypeName(type: string): string {
    const names: Record<string, string> = {
      guard: '护卫',
      resource: '采集',
      mission: '差遣',
      war: '征战',
      diplomacy: '外交',
      development: '建设',
    };
    return names[type] || type;
  }

  // ============= 主面板 =============

  private showClan(store: any, narrative: any, modalManager?: any): void {
    const player = store.getState().player;
    const sect = this.getPlayerSect(player);

    if (!modalManager) {
      if (sect) {
        const member = this.getPlayerMember(player, sect);
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【${sect.name}】` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `类型：${sect.type} | 等级：${sect.rank}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `职位：${member ? this.getRoleName(member.role) : '未知'}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `贡献：${member?.contribution || 0} | 累计贡献：${member?.totalContribution || 0}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '点击"宗门"打开宗门面板查看详情。' });
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【宗门系统】' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你目前还没有加入任何宗门。' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '点击"宗门"查看可加入的宗门列表。' });
      }
      return;
    }

    if (sect) {
      // 已加入宗门：显示宗门主面板
      const member = this.getPlayerMember(player, sect);
      const status = SectService.getForceStatus(sect);
      const bonuses = SectService.getSectBonuses(sect);

      modalManager.showInteractive(sect.name, (container: HTMLElement) => {
        const bonusText = Object.keys(bonuses).length > 0
          ? Object.entries(bonuses).map(([k, v]) => `${k}+${v}`).join('，')
          : '无';

        container.innerHTML = `
          <div class="sect-info">
            <div class="sect-desc">${this.getSectDescription(sect)}</div>
            <div class="sect-detail"><span>势力类型：</span><span>${sect.type}</span></div>
            <div class="sect-detail"><span>势力等级：</span><span>${sect.rank}</span></div>
            <div class="sect-detail"><span>当前职位：</span><span>${member ? this.getRoleName(member.role) : '未知'}</span></div>
            <div class="sect-detail"><span>贡献值：</span><span>${member?.contribution || 0}</span></div>
            <div class="sect-detail"><span>累计贡献：</span><span>${member?.totalContribution || 0}</span></div>
            <div class="sect-detail"><span>势力战力：</span><span>${status.power}</span></div>
            <div class="sect-detail"><span>繁荣度：</span><span>${status.prosperity}/${status.maxProsperity}</span></div>
            <div class="sect-detail"><span>成员数：</span><span>${status.memberCount}/${status.maxMembers}</span></div>
            <div class="sect-detail"><span>国库资金：</span><span>${status.treasury}</span></div>
            <div class="sect-detail"><span>声望：</span><span>${status.reputation}</span></div>
            <div class="sect-detail"><span>领地数：</span><span>${status.territoryCount}</span></div>
            <div class="sect-detail"><span>建筑加成：</span><span>${bonusText}</span></div>
          </div>
          <div class="sect-actions">
            <button class="modal-btn" data-cmd="宗门任务">宗门任务</button>
            <button class="modal-btn" data-cmd="宗门捐献">贡献捐献</button>
            <button class="modal-btn" data-cmd="宗门职位">职位晋升</button>
            <button class="modal-btn" data-cmd="宗门状态">势力详情</button>
            <button class="modal-btn" data-cmd="宗门建筑">宗门建筑</button>
            <button class="modal-btn modal-btn-danger" data-cmd="退出宗门">退出宗门</button>
          </div>
        `;
      }, { width: '640px' });
    } else {
      // 未加入宗门：显示可加入列表
      modalManager.showInteractive('宗门列表', (container: HTMLElement) => {
        const list = document.createElement('div');
        list.className = 'sect-list';
        ALL_SECTS.forEach(sect => {
          const canJoin = !player.sectId && !player.currentSectId
            && player.realm >= sect.requiredRealm;
          const reqRealm = getFullRealmName(sect.requiredRealm, 1, false);
          const curRealm = getFullRealmName(player.realm, 1, false);
          const item = document.createElement('div');
          item.className = `sect-item ${canJoin ? '' : 'disabled'}`;
          item.innerHTML = `
            <div class="sect-item-name">${sect.name} <span class="sect-type">[${sect.type}]</span></div>
            <div class="sect-item-info">${sect.type} · ${sect.rank}</div>
            <div class="sect-item-req">入门要求：${reqRealm}（当前：${curRealm}）</div>
            <div class="sect-item-info">成员：${sect.members.length}/${sect.maxMembers} | 国库：${sect.treasury}</div>
            ${canJoin ? `<button class="sect-join-btn" data-cmd="加入宗门 ${sect.name}">加入</button>` : '<div class="sect-item-locked">未达入门要求</div>'}
          `;
          list.appendChild(item);
        });
        container.appendChild(list);
      }, { width: '640px' });
    }
  }

  private getSectDescription(sect: ISect): string {
    const intros: Record<string, string> = {
      [ForceType.FAMILY]: '血脉传承，世代延续的家族势力。',
      [ForceType.CLAN]: '聚族而居，共同进退的部族。',
      [ForceType.SECT]: '广收弟子，传承功法的修仙宗门。',
      [ForceType.GREAT_SECT]: '称霸一方，拥有广阔领地的大宗。',
      [ForceType.HOLY_LAND]: '传承万古，影响天下的修炼圣地。',
      [ForceType.EMPIRE]: '统治疆域，号令群雄的皇朝。',
      [ForceType.SUPREME]: '至高无上，镇压一界的至尊势力。',
    };
    return intros[sect.type] || '神秘势力。';
  }

  // ============= 加入/退出 =============

  private joinClan(store: any, narrative: any, sectName: string): void {
    const player = store.getState().player;

    if (player.sectId || player.currentSectId) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你已经加入了宗门，需要先退出当前宗门。' });
      return;
    }

    // 按名称查找宗门
    const target = ALL_SECTS.find(s => s.name === sectName || s.name.includes(sectName));
    if (!target) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未找到宗门：${sectName}` });
      return;
    }

    if (player.realm < target.requiredRealm) {
      const reqRealm = getFullRealmName(target.requiredRealm, 1, false);
      const curRealm = getFullRealmName(player.realm, 1, false);
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `境界不足！需要${reqRealm}，当前是${curRealm}。` });
      return;
    }

    // 调用 SectService.joinForce（直接操作 player + sect）
    const result = SectService.joinForce(player, target);
    if (!result.success) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: result.message });
      return;
    }

    // 同步到 player 的冗余字段（兼容旧逻辑）
    const member = this.getPlayerMember(player, target);
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {
      sectId: target.id,
      currentSectId: target.id,
      sectMember: member,
    }});

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ ${result.message}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: this.getSectDescription(target) });

    // 自动传授宗门基础功法
    const sectMethods = MethodService.getSectStarterMethods(target.id);
    for (const methodId of sectMethods) {
      const learnResult = MethodService.learnMethod(store.getState().player, methodId);
      if (learnResult.success) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ 宗门传承：${learnResult.message}` });
      } else if (learnResult.message && !learnResult.message.includes('已习得')) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ 宗门传承条件未满足：《${learnResult.methodName}》（${learnResult.message}）` });
      }
    }

    // 生成首日任务
    SectService.generateDailyTasks(target);
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '◆ 宗门日常任务已刷新，可前往"宗门任务"查看。' });
  }

  private leaveClan(store: any, narrative: any): void {
    const player = store.getState().player;
    const sect = this.getPlayerSect(player);

    if (!sect) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有加入任何宗门。' });
      return;
    }

    const member = this.getPlayerMember(player, sect);
    const lostContribution = Math.floor((member?.contribution || 0) * 0.5);

    // 调用 SectService.leaveForce
    const result = SectService.leaveForce(player, sect);
    if (!result.success) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: result.message });
      return;
    }

    // 应用项目硬约束：声望-100 + 触发追杀事件提示
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {
      sectId: undefined,
      currentSectId: null,
      sectMember: null,
      reputation: player.reputation - 100,
    }});

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ ${result.message}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `损失了${lostContribution}点宗门贡献。` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '声望-100，原宗门可能会对你进行追杀！' });
  }

  // ============= 贡献捐献 =============

  private donateClan(store: any, narrative: any, modalManager: any, amountArg?: string): void {
    const player = store.getState().player;
    const sect = this.getPlayerSect(player);

    if (!sect) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有加入任何宗门。' });
      return;
    }

    // 如果有参数，直接捐献
    const amount = amountArg ? parseInt(amountArg, 10) : 0;
    if (amount > 0) {
      const result = SectService.donate(player, sect, amount);
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ ${result.message}` });
      if (result.success) {
        store.dispatch({ type: 'UPDATE_PLAYER', payload: {
          gold: player.gold,
          sectMember: this.getPlayerMember(player, sect),
        }});
        // 检查是否晋升
        const member = this.getPlayerMember(player, sect);
        if (member) {
          SectService.promoteMemberIfQualified(sect, member);
        }
      }
      return;
    }

    // 否则弹出捐献面板
    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请在宗门面板中进行捐献。' });
      return;
    }

    modalManager.showInteractive('贡献捐献', (container: HTMLElement) => {
      const member = this.getPlayerMember(player, sect);
      container.innerHTML = `
        <div class="sect-info">
          <div class="sect-detail"><span>当前灵石：</span><span>${player.gold}</span></div>
          <div class="sect-detail"><span>当前贡献：</span><span>${member?.contribution || 0}</span></div>
          <div class="sect-detail"><span>累计贡献：</span><span>${member?.totalContribution || 0}</span></div>
          <div class="sect-desc">每10灵石换取1点贡献值，同时提升宗门繁荣度。</div>
        </div>
        <div class="sect-actions donate-actions">
          <button class="modal-btn" data-cmd="宗门捐献 100">捐献100</button>
          <button class="modal-btn" data-cmd="宗门捐献 500">捐献500</button>
          <button class="modal-btn" data-cmd="宗门捐献 1000">捐献1000</button>
          <button class="modal-btn" data-cmd="宗门捐献 5000">捐献5000</button>
        </div>
      `;
    }, { width: '480px' });
  }

  // ============= 职位晋升 =============

  private showRank(store: any, narrative: any, modalManager?: any): void {
    const player = store.getState().player;
    const sect = this.getPlayerSect(player);

    if (!sect) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有加入任何宗门。' });
      return;
    }

    const member = this.getPlayerMember(player, sect);
    if (!member) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '宗门成员信息异常。' });
      return;
    }

    // 触发一次晋升检查
    const oldRole = member.role;
    SectService.promoteMemberIfQualified(sect, member);
    const newRole = member.role;
    const promoted = newRole !== oldRole;

    const nextRank = this.getNextRankInfo(sect, member.role, member.totalContribution);

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【宗门职位】` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `当前职位：${this.getRoleName(member.role)}` });
      if (promoted) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ 恭喜晋升为：${this.getRoleName(newRole)}！` });
      }
      if (nextRank) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `下一职位：${nextRank.name}（还需${nextRank.required - member.totalContribution}累计贡献）` });
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '已是当前路径最高职位！' });
      }
      return;
    }

    modalManager.showInteractive('职位晋升', (container: HTMLElement) => {
      container.innerHTML = `
        <div class="sect-info">
          <div class="sect-detail"><span>当前职位：</span><span>${this.getRoleName(member.role)}</span></div>
          <div class="sect-detail"><span>当前贡献：</span><span>${member.contribution}</span></div>
          <div class="sect-detail"><span>累计贡献：</span><span>${member.totalContribution}</span></div>
          ${promoted ? '<div class="sect-promote">◆ 恭喜晋升！</div>' : ''}
          ${nextRank
            ? `<div class="sect-detail"><span>下一职位：</span><span>${nextRank.name}（需要${nextRank.required}累计贡献，还差${nextRank.required - member.totalContribution}）</span></div>`
            : '<div class="sect-detail"><span>职位状态：</span><span>已达当前路径最高职位</span></div>'}
        </div>
        <div class="sect-actions">
          <button class="modal-btn" data-cmd="宗门捐献">前往捐献</button>
          <button class="modal-btn" data-cmd="宗门任务">宗门任务</button>
        </div>
      `;
    }, { width: '520px' });
  }

  /** 根据势力类型计算下一职位需求 */
  private getNextRankInfo(sect: ISect, currentRole: SectRole | FamilyRole, totalContribution: number): { name: string; required: number } | null {
    if (sect.type === ForceType.FAMILY) {
      const path: { role: FamilyRole; name: string; required: number }[] = [
        { role: FamilyRole.MEMBER, name: '家族成员', required: 0 },
        { role: FamilyRole.ELDER, name: '长老', required: 500 },
        { role: FamilyRole.HEIR, name: '继承人', required: 2000 },
        { role: FamilyRole.PATRIARCH, name: '族长', required: 5000 },
      ];
      const idx = path.findIndex(p => p.role === currentRole);
      if (idx < 0 || idx >= path.length - 1) return null;
      return { name: path[idx + 1].name, required: path[idx + 1].required };
    } else {
      const path: { role: SectRole; name: string; required: number }[] = [
        { role: SectRole.DISCIPLE, name: '弟子', required: 0 },
        { role: SectRole.ELITE_DISCIPLE, name: '精英弟子', required: 500 },
        { role: SectRole.CORE_DISCIPLE, name: '核心弟子', required: 2000 },
        { role: SectRole.ELDER, name: '长老', required: 5000 },
        { role: SectRole.GRAND_ELDER, name: '太上长老', required: 10000 },
      ];
      const idx = path.findIndex(p => p.role === currentRole);
      if (idx < 0 || idx >= path.length - 1) return null;
      return { name: path[idx + 1].name, required: path[idx + 1].required };
    }
  }

  // ============= 宗门任务 =============

  private showClanTasks(store: any, narrative: any, modalManager?: any): void {
    const player = store.getState().player;
    const sect = this.getPlayerSect(player);

    if (!sect) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有加入任何宗门。' });
      return;
    }

    // 刷新日常任务
    SectService.generateDailyTasks(sect);

    const member = this.getPlayerMember(player, sect);

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【${sect.name}·任务】` });
      // 日常任务
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '◆ 日常任务：' });
      sect.quests.forEach(q => {
        const canDo = q.completedCount < q.maxDaily
          && (!q.requirements.minRealm || player.realm >= q.requirements.minRealm)
          && (!q.requirements.minContribution || (member?.contribution || 0) >= q.requirements.minContribution);
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `  · ${q.title}（${this.getDifficultyName(q.difficulty)}）— 奖励：贡献${q.rewards.contribution} 经验${q.rewards.exp} 灵石${q.rewards.gold}${canDo ? ' [可接]' : ' [已达上限或未达要求]'}` });
      });
      // 日常进度任务
      if (sect.dailyTasks.length > 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '◆ 日常进度任务：' });
        sect.dailyTasks.forEach(t => {
          const progress = sect.taskProgress.find(p => p.taskId === t.id && p.playerId === player.id);
          const cur = progress?.current || 0;
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `  · ${t.name}（${cur}/${t.target}${t.unit}）— 奖励：${this.formatTaskRewards(t.rewards)}${progress?.completed && !progress?.claimed ? ' [可领]' : ''}` });
        });
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请在宗门面板中接受或领取任务。' });
      return;
    }

    modalManager.showInteractive(`${sect.name}·任务`, (container: HTMLElement) => {
      const html: string[] = [];

      // 1. 经典宗门任务（一键接受完成）
      html.push('<div class="task-section"><h4>宗门差事（直接完成）</h4>');
      sect.quests.forEach(q => {
        const canDo = q.completedCount < q.maxDaily
          && (!q.requirements.minRealm || player.realm >= q.requirements.minRealm)
          && (!q.requirements.minContribution || (member?.contribution || 0) >= q.requirements.minContribution);
        const statusText = q.completedCount >= q.maxDaily
          ? `今日已完成${q.completedCount}/${q.maxDaily}`
          : `今日${q.completedCount}/${q.maxDaily}`;
        html.push(`
          <div class="task-item ${canDo ? '' : 'disabled'}">
            <div class="task-name">${q.title} <span class="task-type">[${this.getQuestTypeName(q.type)}·${this.getDifficultyName(q.difficulty)}]</span></div>
            <div class="task-desc">${q.description}</div>
            <div class="task-reward">奖励：贡献${q.rewards.contribution} 经验${q.rewards.exp} 灵石${q.rewards.gold}${q.rewards.reputation ? ` 声望${q.rewards.reputation}` : ''}</div>
            <div class="task-status">${statusText}</div>
            ${canDo ? `<button class="task-btn" data-cmd="宗门任务 ${q.id}">接受</button>` : ''}
          </div>
        `);
      });
      html.push('</div>');

      // 2. 日常进度任务
      if (sect.dailyTasks.length > 0) {
        html.push('<div class="task-section"><h4>日常进度任务</h4>');
        sect.dailyTasks.forEach(t => {
          const progress = sect.taskProgress.find(p => p.taskId === t.id && p.playerId === player.id);
          const cur = progress?.current || 0;
          const completed = progress?.completed || false;
          const claimed = progress?.claimed || false;
          let statusText: string;
          let btn: string;
          if (claimed) {
            statusText = '已领取';
            btn = '';
          } else if (completed) {
            statusText = '可领取奖励';
            btn = `<button class="task-btn" data-cmd="领取宗门任务奖励 ${t.id}">领取</button>`;
          } else {
            statusText = `进度：${cur}/${t.target}${t.unit}`;
            btn = '';
          }
          html.push(`
            <div class="task-item">
              <div class="task-name">${t.name} <span class="task-type">[每日·${this.getDifficultyName(t.difficulty)}]</span></div>
              <div class="task-desc">${t.description}</div>
              <div class="task-reward">奖励：${this.formatTaskRewards(t.rewards)}</div>
              <div class="task-status">${statusText}</div>
              ${btn}
            </div>
          `);
        });
        html.push('</div>');
      }

      container.innerHTML = html.join('');
    }, { width: '640px' });
  }

  /** 接受/完成经典宗门任务（data-cmd="宗门任务 <questId>"） */
  private acceptClanQuest(store: any, narrative: any, questId: string): void {
    const player = store.getState().player;
    const sect = this.getPlayerSect(player);
    if (!sect) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有加入任何宗门。' });
      return;
    }

    const result = SectService.acceptQuest(player, sect, questId);
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ ${result.message}` });
    if (result.success) {
      const member = this.getPlayerMember(player, sect);
      // 检查晋升
      if (member) SectService.promoteMemberIfQualified(sect, member);
      store.dispatch({ type: 'UPDATE_PLAYER', payload: {
        cultivationExp: player.cultivationExp,
        gold: player.gold,
        sectMember: member,
      }});
      // 推进日常任务进度（贡献捐献/修炼类任务）
      this.tryAdvanceDailyTasks(store, sect, player, questId);
    }
  }

  /** 领取日常任务奖励 */
  private claimTaskReward(store: any, narrative: any, taskId: string): void {
    const player = store.getState().player;
    const sect = this.getPlayerSect(player);
    if (!sect) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有加入任何宗门。' });
      return;
    }

    const result = SectService.claimTaskReward(sect, player.id, taskId);
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ ${result.message}` });
    if (result.success && result.rewards) {
      // 发放奖励
      if (result.rewards.contribution) {
        const member = this.getPlayerMember(player, sect);
        if (member) {
          member.contribution += result.rewards.contribution;
          member.totalContribution += result.rewards.contribution;
          SectService.promoteMemberIfQualified(sect, member);
        }
      }
      if (result.rewards.exp) player.cultivationExp += result.rewards.exp;
      if (result.rewards.gold) player.gold += result.rewards.gold;
      store.dispatch({ type: 'UPDATE_PLAYER', payload: {
        cultivationExp: player.cultivationExp,
        gold: player.gold,
        sectMember: this.getPlayerMember(player, sect),
      }});
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ 获得奖励：${this.formatTaskRewards(result.rewards)}` });
    }
  }

  /** 尝试推进日常任务进度（接受宗门任务时联动） */
  private tryAdvanceDailyTasks(store: any, sect: ISect, player: any, questId: string): void {
    const quest = sect.quests.find(q => q.id === questId);
    if (!quest) return;

    // 根据任务类型推进对应日常任务
    const categoryMap: Record<string, string> = {
      guard: 'CULTIVATION',
      resource: 'COLLECTION',
      mission: 'CULTIVATION',
      war: 'WAR',
      diplomacy: 'INHERITANCE',
      development: 'DONATION',
    };

    const targetCategory = categoryMap[quest.type];
    sect.dailyTasks.forEach(task => {
      if (task.category === targetCategory) {
        SectService.updateTaskProgress(sect, player.id, task.id, 1);
      }
    });
  }

  private formatTaskRewards(rewards: any): string {
    const parts: string[] = [];
    if (rewards.contribution) parts.push(`贡献${rewards.contribution}`);
    if (rewards.exp) parts.push(`经验${rewards.exp}`);
    if (rewards.gold) parts.push(`灵石${rewards.gold}`);
    if (rewards.reputation) parts.push(`声望${rewards.reputation}`);
    if (rewards.resources) {
      Object.entries(rewards.resources).forEach(([k, v]) => parts.push(`${k}×${v}`));
    }
    return parts.join(' ');
  }

  // ============= 宗门状态/建筑 =============

  private showSectStatus(store: any, narrative: any, modalManager?: any): void {
    const player = store.getState().player;
    const sect = this.getPlayerSect(player);

    if (!sect) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有加入任何宗门。' });
      return;
    }

    const status = SectService.getForceStatus(sect);
    const bonuses = SectService.getSectBonuses(sect);

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【${sect.name}·势力详情】` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `战力：${status.power}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `繁荣度：${status.prosperity}/${status.maxProsperity}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `成员：${status.memberCount}/${status.maxMembers}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `国库：${status.treasury}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `声望：${status.reputation}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `领地：${status.territoryCount}处（${sect.territory.join('、') || '无'}）` });
      if (Object.keys(bonuses).length > 0) {
        const bonusText = Object.entries(bonuses).map(([k, v]) => `${k}+${v}`).join('，');
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `建筑加成：${bonusText}` });
      }
      return;
    }

    modalManager.showInteractive(`${sect.name}·势力详情`, (container: HTMLElement) => {
      const bonusRows = Object.keys(bonuses).length > 0
        ? Object.entries(bonuses).map(([k, v]) => `<div class="sect-detail"><span>${k}：</span><span>+${v}</span></div>`).join('')
        : '<div class="sect-detail">无建筑加成</div>';

      const resourceRows = Object.keys(status.resourceSummary).length > 0
        ? Object.entries(status.resourceSummary).map(([k, v]) => `<div class="sect-detail"><span>${k}：</span><span>${v}</span></div>`).join('')
        : '<div class="sect-detail">暂无资源产出</div>';

      container.innerHTML = `
        <div class="sect-info">
          <div class="sect-detail"><span>势力战力：</span><span>${status.power}</span></div>
          <div class="sect-detail"><span>繁荣度：</span><span>${status.prosperity}/${status.maxProsperity}</span></div>
          <div class="sect-detail"><span>成员数：</span><span>${status.memberCount}/${status.maxMembers}</span></div>
          <div class="sect-detail"><span>国库资金：</span><span>${status.treasury}</span></div>
          <div class="sect-detail"><span>势力声望：</span><span>${status.reputation}</span></div>
          <div class="sect-detail"><span>领地数量：</span><span>${status.territoryCount}</span></div>
          <div class="sect-detail"><span>领地列表：</span><span>${sect.territory.join('、') || '无'}</span></div>
          <h4>建筑加成</h4>
          ${bonusRows}
          <h4>资源储备</h4>
          ${resourceRows}
        </div>
      `;
    }, { width: '600px' });
  }

  private showBuildings(store: any, narrative: any, modalManager?: any): void {
    const player = store.getState().player;
    const sect = this.getPlayerSect(player);

    if (!sect) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有加入任何宗门。' });
      return;
    }

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【${sect.name}·建筑】` });
      if (sect.buildings.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '宗门暂无建筑。' });
      } else {
        sect.buildings.forEach(b => {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `· ${b.name}（${b.type}）Lv.${b.level}/${b.maxLevel} — ${b.effect.description}` });
        });
      }
      return;
    }

    modalManager.showInteractive(`${sect.name}·建筑`, (container: HTMLElement) => {
      if (sect.buildings.length === 0) {
        container.innerHTML = '<div class="sect-info">宗门暂无建筑，需有权限的成员建造。</div>';
        return;
      }
      const html: string[] = ['<div class="building-list">'];
      sect.buildings.forEach(b => {
        html.push(`
          <div class="building-item">
            <div class="building-name">${b.name} <span class="building-type">[${b.type}]</span></div>
            <div class="building-level">等级：${b.level}/${b.maxLevel}</div>
            <div class="building-effect">效果：${b.effect.description}（${b.effect.stat}+${b.effect.value}）</div>
          </div>
        `);
      });
      html.push('</div>');
      container.innerHTML = html.join('');
    }, { width: '560px' });
  }
}
