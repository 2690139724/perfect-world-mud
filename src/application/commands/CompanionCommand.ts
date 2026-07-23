import { ICommandHandler, ICommandContext } from './CommandRouter';
import {
  ICompanion, CompanionPersonality, CompanionType, CompanionRelationship, CompanionNation,
  DEFAULT_INTERACTIONS, DEFAULT_STORY_NODES,
} from '../../domain/entities/Companion';
import { CultivationRealm, IPlayer } from '../../domain/entities/Player';
import { CompanionService } from '../../domain/services/CompanionService';
import { CommandHelper } from './CommandHelper';

/**
 * 道侣命令处理器
 *
 * 已重构为接入 CompanionService 服务层：
 * - 业务逻辑（相遇/互动/春宵/成长/剧情推进）由 CompanionService 处理
 * - 本类仅负责 UI 渲染和用户交互
 * - 支持：道侣列表 / 详情 / 互动 / 赠礼 / 春宵 / 结缘 / 剧情查看
 */

/** 候选道侣池（玩家可在不同位置/境界相遇） */
const CANDIDATE_COMPANIONS: ICompanion[] = [
  {
    id: 'companion_huo_linger',
    name: '火灵儿',
    avatarId: 'fire_linger',
    personality: CompanionPersonality.FIERY,
    type: CompanionType.GODDESS,
    realm: CultivationRealm.SPIRIT,
    realmStage: 3,
    affinity: 0,
    maxAffinity: 9999,
    relationship: CompanionRelationship.STRANGER,
    giftPreferences: ['weapons', 'alcohol'],
    storyProgress: 0,
    cultivationBonus: 0.1,
    combatBonus: 0.08,
    lastInteractionTime: 0,
    isOnline: true,
    location: 'fire_country_palace',
    nation: CompanionNation.FIRE,
    faction: '火国公主',
    storyNodes: [...DEFAULT_STORY_NODES],
    interactions: [...DEFAULT_INTERACTIONS],
    unlockedPoses: [],
    todayInteractCount: 0,
    lastInteractDate: '',
    isBonded: false,
  },
  {
    id: 'companion_qing_yi',
    name: '清漪',
    avatarId: 'qing_yi',
    personality: CompanionPersonality.COLD,
    type: CompanionType.CULTIVATOR,
    realm: CultivationRealm.VENERABLE,
    realmStage: 5,
    affinity: 0,
    maxAffinity: 9999,
    relationship: CompanionRelationship.STRANGER,
    giftPreferences: ['jewelry', 'weapons'],
    storyProgress: 0,
    cultivationBonus: 0.15,
    combatBonus: 0.1,
    lastInteractionTime: 0,
    isOnline: true,
    location: 'qinglin_pavilion',
    nation: CompanionNation.WOOD,
    faction: '截天教圣女',
    storyNodes: [...DEFAULT_STORY_NODES],
    interactions: [...DEFAULT_INTERACTIONS],
    unlockedPoses: [],
    todayInteractCount: 0,
    lastInteractDate: '',
    isBonded: false,
  },
  {
    id: 'companion_yun_xi',
    name: '云曦',
    avatarId: 'yun_xi',
    personality: CompanionPersonality.WARM,
    type: CompanionType.GODDESS,
    realm: CultivationRealm.SPIRIT,
    realmStage: 6,
    affinity: 0,
    maxAffinity: 9999,
    relationship: CompanionRelationship.STRANGER,
    giftPreferences: ['flowers', 'jewelry'],
    storyProgress: 0,
    cultivationBonus: 0.12,
    combatBonus: 0.09,
    lastInteractionTime: 0,
    isOnline: true,
    location: 'rain_country_palace',
    nation: CompanionNation.RAIN,
    faction: '雨国公主',
    storyNodes: [...DEFAULT_STORY_NODES],
    interactions: [...DEFAULT_INTERACTIONS],
    unlockedPoses: [],
    todayInteractCount: 0,
    lastInteractDate: '',
    isBonded: false,
  },
];

/** 当前选中的道侣ID（用于详情面板） */
let selectedCompanionId: string | null = null;

export class CompanionCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return [
      'companion', '道侣', '查看道侣', '道侣列表',
      '亲密', '双修', '春宵', '结缘', '赠礼',
      '道侣互动', '道侣详情', '道侣剧情', '相遇道侣',
    ].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store } = context;
    const player = store.getState().player;

    switch (action) {
      case 'companion':
      case '道侣':
      case '查看道侣':
      case '道侣列表':
        this.showCompanions(context, player);
        break;
      case '相遇道侣':
        this.tryEncounter(context, player, args.join(' '));
        break;
      case '道侣详情':
        this.showCompanionDetail(context, player, args.join(' '));
        break;
      case '道侣互动':
        this.handleInteract(context, player, args[0], args.slice(1).join(' '));
        break;
      case '亲密':
        this.handleInteract(context, player, args[0], 'chat');
        break;
      case '双修':
      case '春宵':
        this.handleSpringNight(context, player, args[0], args[1]);
        break;
      case '结缘':
        this.handleBond(context, player, args[0]);
        break;
      case '赠礼':
        this.handleGift(context, player, args[0], args.slice(1).join(' '));
        break;
      case '道侣剧情':
        this.showStoryProgress(context, player, args[0]);
        break;
    }
  }

  // ================== 道侣列表 ==================

  private showCompanions(ctx: ICommandContext, player: IPlayer): void {
    const { store, narrative, modalManager } = ctx;
    const companions: ICompanion[] = player.companions || [];

    if (!modalManager) {
      if (companions.length === 0) {
        CommandHelper.sayBlock(store, [
          '\n【道侣系统】',
          '你还没有遇到任何有缘人。',
          '在修行路上，特定地点与境界下，你将与命定之人相遇。',
        ]);
        const candidates = this.getEncounterableCandidates(player);
        if (candidates.length > 0) {
          CommandHelper.pushList(narrative, '可相遇之人（点击尝试相遇）', candidates.map(c => ({
            label: `${c.name}（${c.faction}）`,
            action: `相遇道侣 ${c.name}`,
            desc: `${c.nation} · 需要境界：${this.realmName(c.realm)}`,
          })));
        }
        return;
      }
      CommandHelper.say(store, '\n【道侣列表】');
      CommandHelper.pushList(narrative, '你的道侣（点击查看详情）', companions.map(c => ({
        label: `${c.name} — ${c.relationship} · 好感 ${c.affinity}${c.isBonded ? ' · 已结缘' : ''}`,
        action: `道侣详情 ${c.name}`,
        desc: `${c.faction} · ${c.nation} · ${this.realmName(c.realm)}${c.realmStage}层 · 今日剩余互动 ${CompanionService.getRemainingInteractions(c)} 次`,
      })));
      return;
    }

    modalManager.showInteractive('道侣系统', (container: HTMLElement) => {
      if (companions.length === 0) {
        const candidates = this.getEncounterableCandidates(player);
        container.innerHTML = '<div class="modal-empty">你还没有遇到任何有缘人。<br/>在修行路上，特定地点与境界下，你将与命定之人相遇。</div>';
        if (candidates.length > 0) {
          const list = document.createElement('div');
          list.className = 'companion-list';
          list.innerHTML = '<div class="modal-section-title">可相遇之人</div>';
          for (const c of candidates) {
            const item = document.createElement('div');
            item.className = 'companion-item';
            item.innerHTML = `
              <div class="companion-item-header">
                <span class="companion-item-name">${c.name}</span>
                <span class="companion-faction">${c.faction}</span>
              </div>
              <div class="companion-item-info">${c.nation} · 需要境界：${this.realmName(c.realm)}</div>
            `;
            const btn = document.createElement('button');
            btn.className = 'modal-btn modal-btn-primary';
            btn.textContent = '尝试相遇';
            btn.addEventListener('click', () => {
              modalManager.close();
              this.tryEncounter(ctx, player, c.name);
            });
            item.appendChild(btn);
            list.appendChild(item);
          }
          container.appendChild(list);
        }
        return;
      }

      const list = document.createElement('div');
      list.className = 'companion-list';
      for (const c of companions) {
        const item = document.createElement('div');
        item.className = 'companion-item';
        const remaining = CompanionService.getRemainingInteractions(c);
        item.innerHTML = `
          <div class="companion-item-header">
            <span class="companion-item-name">${c.name}</span>
            <span class="companion-faction">${c.faction}</span>
            ${c.isBonded ? '<span class="companion-bonded">已结缘</span>' : ''}
          </div>
          <div class="companion-item-info">
            ${c.relationship} · 好感 ${c.affinity} · ${this.realmName(c.realm)}${c.realmStage}层
          </div>
          <div class="companion-item-info">今日剩余互动：${remaining} 次</div>
        `;
        const btn = document.createElement('button');
        btn.className = 'modal-btn';
        btn.textContent = '查看详情';
        btn.addEventListener('click', () => {
          modalManager.close();
          this.showCompanionDetail(ctx, player, c.name);
        });
        item.appendChild(btn);
        list.appendChild(item);
      }
      container.appendChild(list);
    }, { width: '600px', height: '500px' });
  }

  // ================== 尝试相遇 ==================

  private tryEncounter(ctx: ICommandContext, player: IPlayer, name: string): void {
    const { store } = ctx;
    if (!name) {
      CommandHelper.say(store, '请指定要相遇的道侣名称。');
      return;
    }
    const candidate = CANDIDATE_COMPANIONS.find(c => c.name === name || c.name.includes(name));
    if (!candidate) {
      CommandHelper.say(store, `未找到名为「${name}」的有缘人。`);
      return;
    }

    const result = CompanionService.encounter(player, candidate);
    CommandHelper.say(store, result.message);
    if (result.success && result.companion) {
      CommandHelper.notifyPlayerChanged(store);
      // 触发首个剧情节点
      const storyResult = CompanionService.tryAdvanceStory(player, result.companion);
      if (storyResult.success && storyResult.node) {
        CommandHelper.sayBlock(store, [
          storyResult.message,
          storyResult.node.content,
          ...storyResult.rewardTexts.map(t => `◆ ${t}`),
        ]);
      }
      // 自动进入详情
      this.showCompanionDetail(ctx, store.getState().player, result.companion.name);
    }
  }

  // ================== 道侣详情 ==================

  private showCompanionDetail(ctx: ICommandContext, player: IPlayer, name: string): void {
    const { store, narrative, modalManager } = ctx;
    if (!name) {
      CommandHelper.say(store, '请指定要查看的道侣名称。');
      return;
    }
    const companion = (player.companions || []).find(c => c.name === name || c.name.includes(name));
    if (!companion) {
      CommandHelper.say(store, `未找到道侣：${name}`);
      return;
    }
    selectedCompanionId = companion.id;
    CommandHelper.notifyPlayerChanged(store);

    const interactions = CompanionService.getAvailableInteractions(companion);
    const poses = CompanionService.getAvailablePoses(companion);
    const currentNode = CompanionService.getCurrentStoryNode(companion);
    const remaining = CompanionService.getRemainingInteractions(companion);

    if (!modalManager) {
      CommandHelper.sayBlock(store, [
        `\n【${companion.name}】${companion.faction} · ${companion.nation}`,
        `关系：${companion.relationship} · 好感：${companion.affinity}/${companion.maxAffinity}`,
        `境界：${this.realmName(companion.realm)} ${companion.realmStage}层 · 今日剩余互动：${remaining}`,
        `势力：${companion.faction} · 性格：${companion.personality}`,
      ]);

      const actionItems: { label: string; action: string; desc: string; disabled?: boolean }[] = [];
      for (const int of interactions) {
        actionItems.push({
          label: `${int.name}${int.manaCost ? `（耗${int.manaCost}法力）` : ''}`,
          action: `道侣互动 ${companion.name} ${int.type}`,
          desc: `${int.description} · 好感+${int.affinityGain}${int.expGain ? ` · 修为+${int.expGain}` : ''}`,
          disabled: remaining <= 0 && int.type !== 'springnight',
        });
      }

      if (companion.relationship >= CompanionRelationship.LOVER) {
        if (companion.isBonded) {
          for (const pose of poses) {
            actionItems.push({
              label: `春宵·${pose.name}（${pose.expMultiplier}x）`,
              action: `春宵 ${companion.name} ${pose.id}`,
              desc: `${pose.description} · 耗${pose.manaCost}法力`,
              disabled: player.mana < pose.manaCost,
            });
          }
        } else {
          actionItems.push({
            label: '正式结缘',
            action: `结缘 ${companion.name}`,
            desc: `好感≥${500}时可在天地见证下结为道侣`,
            disabled: companion.affinity < 500,
          });
        }
      }

      if (currentNode) {
        actionItems.push({
          label: `查看剧情：${currentNode.title}`,
          action: `道侣剧情 ${companion.name}`,
          desc: `下一个剧情节点（需${currentNode.requiredRelationship}·好感≥${currentNode.requiredAffinity}）`,
        });
      }

      actionItems.push({ label: '返回道侣列表', action: '道侣列表', desc: '返回道侣列表' });
      CommandHelper.pushList(narrative, `${companion.name} · 互动选项`, actionItems);
      return;
    }

    modalManager.showInteractive(`道侣·${companion.name}`, (container: HTMLElement) => {
      container.innerHTML = `
        <div class="companion-detail">
          <div class="companion-detail-header">
            <h3>${companion.name}</h3>
            <div class="companion-faction-tag">${companion.faction} · ${companion.nation}</div>
          </div>
          <div class="companion-stats">
            <div>关系：<strong>${companion.relationship}</strong></div>
            <div>好感：<strong>${companion.affinity}/${companion.maxAffinity}</strong></div>
            <div>境界：<strong>${this.realmName(companion.realm)} ${companion.realmStage}层</strong></div>
            <div>性格：<strong>${companion.personality}</strong></div>
            <div>今日剩余互动：<strong>${remaining}</strong></div>
            <div>${companion.isBonded ? '已结缘 ✦' : '未结缘'}</div>
          </div>
          <div class="companion-affinity-bar">
            <div class="companion-affinity-fill" style="width: ${Math.min(100, companion.affinity / companion.maxAffinity * 100)}%"></div>
          </div>
        </div>
      `;

      const actionsWrap = document.createElement('div');
      actionsWrap.className = 'companion-actions';
      actionsWrap.innerHTML = '<div class="modal-section-title">互动</div>';
      for (const int of interactions) {
        const disabled = (remaining <= 0 && int.type !== 'springnight') || (!!int.manaCost && player.mana < int.manaCost);
        const btn = document.createElement('button');
        btn.className = `modal-btn ${disabled ? 'modal-btn-disabled' : ''}`;
        btn.textContent = `${int.name}${int.manaCost ? `（${int.manaCost}法力）` : ''}`;
        btn.disabled = disabled;
        btn.addEventListener('click', () => {
          modalManager.close();
          this.handleInteract(ctx, player, companion.name, int.type);
        });
        actionsWrap.appendChild(btn);
      }

      // 春宵/结缘区
      if (companion.relationship >= CompanionRelationship.LOVER) {
        const bondWrap = document.createElement('div');
        bondWrap.className = 'companion-actions';
        if (companion.isBonded) {
          bondWrap.innerHTML = '<div class="modal-section-title">双修姿势</div>';
          for (const pose of poses) {
            const disabled = player.mana < pose.manaCost;
            const btn = document.createElement('button');
            btn.className = `modal-btn ${disabled ? 'modal-btn-disabled' : 'modal-btn-primary'}`;
            btn.textContent = `${pose.name}（${pose.expMultiplier}x · ${pose.manaCost}法力）`;
            btn.disabled = disabled;
            btn.addEventListener('click', () => {
              modalManager.close();
              this.handleSpringNight(ctx, player, companion.name, pose.id);
            });
            bondWrap.appendChild(btn);
          }
          if (poses.length === 0) {
            bondWrap.innerHTML += '<div class="modal-empty">尚无可用双修姿势，需更高好感度解锁。</div>';
          }
        } else {
          bondWrap.innerHTML = '<div class="modal-section-title">结缘</div>';
          const btn = document.createElement('button');
          btn.className = `modal-btn ${companion.affinity < 500 ? 'modal-btn-disabled' : 'modal-btn-primary'}`;
          btn.textContent = companion.affinity < 500 ? `好感不足（需${500}）` : '正式结缘';
          btn.disabled = companion.affinity < 500;
          btn.addEventListener('click', () => {
            modalManager.close();
            this.handleBond(ctx, player, companion.name);
          });
          bondWrap.appendChild(btn);
        }
        actionsWrap.appendChild(bondWrap);
      }

      // 剧情区
      if (currentNode) {
        const storyWrap = document.createElement('div');
        storyWrap.className = 'companion-actions';
        storyWrap.innerHTML = '<div class="modal-section-title">剧情</div>';
        const btn = document.createElement('button');
        btn.className = 'modal-btn';
        btn.textContent = `查看剧情：${currentNode.title}`;
        btn.addEventListener('click', () => {
          modalManager.close();
          this.showStoryProgress(ctx, player, companion.name);
        });
        storyWrap.appendChild(btn);
        actionsWrap.appendChild(storyWrap);
      }

      container.appendChild(actionsWrap);
    }, { width: '600px', height: '600px' });
  }

  // ================== 互动处理 ==================

  private handleInteract(ctx: ICommandContext, player: IPlayer, name: string, actionType: string): void {
    const { store } = ctx;
    const companion = (player.companions || []).find(c => c.name === name || c.name.includes(name));
    if (!companion) {
      CommandHelper.say(store, `未找到道侣：${name}`);
      return;
    }

    const remaining = CompanionService.getRemainingInteractions(companion);
    if (remaining <= 0 && actionType !== 'springnight') {
      CommandHelper.say(store, `今日与${companion.name}的互动次数已用完，明日再来。`);
      return;
    }

    const result = CompanionService.interact(player, companion, actionType);
    CommandHelper.sayBlock(store, result.messages);
    if (result.affinityChange > 0) {
      CommandHelper.say(store, `好感 +${result.affinityChange}（当前 ${companion.affinity}）`);
    }
    CommandHelper.notifyPlayerChanged(store);

    // 检查剧情推进
    const storyResult = CompanionService.tryAdvanceStory(player, companion);
    if (storyResult.success && storyResult.node) {
      CommandHelper.sayBlock(store, [
        storyResult.message,
        storyResult.node.content,
        ...storyResult.rewardTexts.map(t => `◆ ${t}`),
      ]);
    }

    // 返回详情
    this.showCompanionDetail(ctx, store.getState().player, companion.name);
  }

  // ================== 赠礼 ==================

  private handleGift(ctx: ICommandContext, player: IPlayer, name: string, itemName: string): void {
    const { store } = ctx;
    const companion = (player.companions || []).find(c => c.name === name || c.name.includes(name));
    if (!companion) {
      CommandHelper.say(store, `未找到道侣：${name}`);
      return;
    }
    if (!itemName) {
      // 列出可赠物品
      const giftItems = (player.inventory || []).filter((it, idx, arr) => arr.findIndex(x => x.id === it.id) === idx).slice(0, 20);
      if (giftItems.length === 0) {
        CommandHelper.say(store, '你的行囊空空，无物可赠。');
        return;
      }
      const { narrative } = ctx;
      CommandHelper.pushList(narrative, `赠予${companion.name}的礼物`, giftItems.map(it => ({
        label: `${it.name}`,
        action: `赠礼 ${companion.name} ${it.name}`,
        desc: it.description || '一件可赠予的物品',
      })));
      return;
    }

    const itemIdx = (player.inventory || []).findIndex(it => it.name === itemName || it.name.includes(itemName));
    if (itemIdx < 0) {
      CommandHelper.say(store, `行囊中未找到：${itemName}`);
      return;
    }
    const gift = player.inventory[itemIdx];
    player.inventory.splice(itemIdx, 1);

    const result = CompanionService.interact(player, companion, 'gift', gift);
    CommandHelper.sayBlock(store, [
      `你将【${gift.name}】赠予${companion.name}。`,
      ...result.messages,
    ]);
    if (result.affinityChange > 0) {
      CommandHelper.say(store, `好感 +${result.affinityChange}（当前 ${companion.affinity}）`);
    }
    CommandHelper.notifyPlayerChanged(store);

    const storyResult = CompanionService.tryAdvanceStory(player, companion);
    if (storyResult.success && storyResult.node) {
      CommandHelper.sayBlock(store, [storyResult.message, storyResult.node.content, ...storyResult.rewardTexts.map(t => `◆ ${t}`)]);
    }
    this.showCompanionDetail(ctx, store.getState().player, companion.name);
  }

  // ================== 春宵 ==================

  private handleSpringNight(ctx: ICommandContext, player: IPlayer, name: string, poseId?: string): void {
    const { store } = ctx;
    const companion = (player.companions || []).find(c => c.name === name || c.name.includes(name));
    if (!companion) {
      CommandHelper.say(store, `未找到道侣：${name}`);
      return;
    }
    const result = CompanionService.springNight(player, companion, poseId);
    if (!result.success) {
      CommandHelper.say(store, result.message);
      return;
    }
    CommandHelper.sayBlock(store, [
      `\n━━━━━━━━━━━━━━━━━━━━━━━━\n【春宵·${result.pose?.name || '双修悟道'}】\n━━━━━━━━━━━━━━━━━━━━━━━━`,
      ...result.narrative,
      `\n${result.message}`,
      `◆ 修为 +${result.expGain}`,
      `◆ 好感 +${result.affinityGain}（当前 ${companion.affinity}）`,
    ]);
    CommandHelper.notifyPlayerChanged(store);
    this.showCompanionDetail(ctx, store.getState().player, companion.name);
  }

  // ================== 结缘 ==================

  private handleBond(ctx: ICommandContext, player: IPlayer, name: string): void {
    const { store } = ctx;
    const companion = (player.companions || []).find(c => c.name === name || c.name.includes(name));
    if (!companion) {
      CommandHelper.say(store, `未找到道侣：${name}`);
      return;
    }
    if (companion.affinity < 500) {
      CommandHelper.say(store, `亲密度不足！需要达到 500 才能结缘（当前 ${companion.affinity}）。`);
      return;
    }
    if (companion.relationship < CompanionRelationship.LOVER) {
      CommandHelper.say(store, `关系阶段不足！需要达到「${CompanionRelationship.LOVER}」才能结缘。`);
      return;
    }
    if (companion.isBonded) {
      CommandHelper.say(store, `你与${companion.name}已经结缘。`);
      return;
    }
    companion.isBonded = true;
    companion.relationship = CompanionRelationship.LOVER;
    CommandHelper.sayBlock(store, [
      `\n━━━━━━━━━━━━━━━━━━━━━━━━\n【结缘·${companion.name}】\n━━━━━━━━━━━━━━━━━━━━━━━━`,
      `烛影合拢，月光如水。你与${companion.name}在天地见证下正式结为道侣。`,
      `从此，你们将携手共赴长生路，双修悟道，心灵相通。`,
    ]);
    CommandHelper.notifyPlayerChanged(store);
    this.showCompanionDetail(ctx, store.getState().player, companion.name);
  }

  // ================== 剧情查看 ==================

  private showStoryProgress(ctx: ICommandContext, player: IPlayer, name: string): void {
    const { store } = ctx;
    const companion = (player.companions || []).find(c => c.name === name || c.name.includes(name));
    if (!companion) {
      CommandHelper.say(store, `未找到道侣：${name}`);
      return;
    }
    const currentNode = CompanionService.getCurrentStoryNode(companion);
    if (!currentNode) {
      CommandHelper.say(store, `${companion.name}的剧情已全部完成。`);
      return;
    }
    // 主动尝试推进剧情
    const result = CompanionService.tryAdvanceStory(player, companion);
    if (result.success && result.node) {
      CommandHelper.sayBlock(store, [
        result.message,
        result.node.content,
        ...(result.rewardTexts.length > 0 ? ['', '【奖励】'] : []),
        ...result.rewardTexts.map(t => `◆ ${t}`),
      ]);
      CommandHelper.notifyPlayerChanged(store);
    } else {
      CommandHelper.sayBlock(store, [
        `下一个剧情节点：${currentNode.title}`,
        `触发条件：${currentNode.requiredRelationship} · 好感≥${currentNode.requiredAffinity}`,
        `当前：${companion.relationship} · 好感 ${companion.affinity}`,
      ]);
    }
    this.showCompanionDetail(ctx, store.getState().player, companion.name);
  }

  // ================== 辅助方法 ==================

  private getEncounterableCandidates(player: IPlayer): ICompanion[] {
    return CANDIDATE_COMPANIONS.filter(c =>
      !player.companions.some(pc => pc.id === c.id) && player.realm >= c.realm
    );
  }

  private realmName(realm: CultivationRealm): string {
    const names = ['凡人', '锻体', '凝气', '筑基', '金丹', '元婴', '化神', '炼虚', '合体', '大乘', '渡劫', '仙人'];
    return names[realm] || '未知';
  }
}
