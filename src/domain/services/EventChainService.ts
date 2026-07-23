import { IPlayer } from '../entities/Player';
import { IWorldEventTemplate } from '../entities/WorldEvent';
import { WORLD_EVENT_TEMPLATES } from '../../data/events/world_events';

export enum EventChainStatus {
  LOCKED = 'locked',
  AVAILABLE = 'available',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface IEventChainStep {
  id: string;
  eventId: string;
  title: string;
  description: string;
  condition?: (player: IPlayer, chainState: IEventChainState) => boolean;
  requiredPreviousSteps?: string[];
  choiceRequirements?: Record<string, string[]>;
}

export interface IEventChain {
  id: string;
  title: string;
  description: string;
  worldId: string;
  minRealm: number;
  steps: IEventChainStep[];
  rewards: {
    exp?: number;
    gold?: number;
    items?: string[];
    reputation?: string[];
  };
}

export interface IEventChainState {
  chainId: string;
  currentStepIndex: number;
  completedSteps: string[];
  stepChoices: Record<string, string>;
  status: EventChainStatus;
  startedAt: number;
  lastUpdatedAt: number;
  variables: Record<string, any>;
}

export class EventChainService {
  private static instance: EventChainService;
  private chainStates: Map<string, IEventChainState> = new Map();
  private eventChains: IEventChain[] = [];

  private constructor() {
    this.initializeEventChains();
  }

  static getInstance(): EventChainService {
    if (!EventChainService.instance) {
      EventChainService.instance = new EventChainService();
    }
    return EventChainService.instance;
  }

  private initializeEventChains(): void {
    this.eventChains = [
      {
        id: 'chain_robbery_vengeance',
        title: '劫匪的复仇',
        description: '你在路上救下了一个商人，却得罪了劫匪团伙。他们会善罢甘休吗？',
        worldId: 'perfect_world',
        minRealm: 1,
        steps: [
          {
            id: 'step1',
            eventId: 'ev_robbery_road',
            title: '路遇劫匪',
            description: '你遇到了一伙劫匪正在抢劫商人。',
          },
          {
            id: 'step2',
            eventId: 'ev_mysterious_stranger',
            title: '神秘访客',
            description: '一个神秘人出现在城中，似乎在打听你的消息。',
            condition: (player, state) => {
              const step1Choice = state.stepChoices['step1'];
              return step1Choice === 'ch_help_merchant' || step1Choice === 'ch_observe';
            },
          },
          {
            id: 'step3',
            eventId: 'ev_ambush',
            title: '伏击',
            description: '你在一处偏僻的道路上遭到了伏击！',
            condition: (player, state) => {
              return state.completedSteps.includes('step2');
            },
          },
        ],
        rewards: {
          exp: 1000,
          gold: 500,
          reputation: ['heroic'],
        },
      },
      {
        id: 'chain_treasure_hunt',
        title: '古墓寻宝',
        description: '传闻蛮荒之地深处有一座上古修士的墓穴，里面藏着无数珍宝。',
        worldId: 'perfect_world',
        minRealm: 3,
        steps: [
          {
            id: 'treasure_step1',
            eventId: 'ev_treasure_chest',
            title: '遗落的宝箱',
            description: '你发现了一个可疑的宝箱。',
          },
          {
            id: 'treasure_step2',
            eventId: 'ev_ancient_ruin',
            title: '古遗迹',
            description: '深入探索，你发现了一座更大的遗迹入口。',
            condition: (player, state) => {
              return state.stepChoices['treasure_step1'] === 'ch_open_directly' ||
                     state.stepChoices['treasure_step1'] === 'ch_check_carefully';
            },
          },
          {
            id: 'treasure_step3',
            eventId: 'ev_celestial_phenomenon',
            title: '天降异象',
            description: '遗迹深处，宝物出世，引来了各方争夺。',
            condition: (player, state) => {
              return state.completedSteps.includes('treasure_step2');
            },
          },
        ],
        rewards: {
          exp: 2000,
          items: ['ancient_artifact', 'celestial_spirit_pearl'],
        },
      },
      {
        id: 'chain_moral_dilemma',
        title: '道德试炼',
        description: '修仙之路，道心为重。一系列的道德抉择将考验你的本心。',
        worldId: 'perfect_world',
        minRealm: 2,
        steps: [
          {
            id: 'moral_step1',
            eventId: 'ev_injured_cultivator',
            title: '受伤的修士',
            description: '路旁遇到一个重伤的修士。',
          },
          {
            id: 'moral_step2',
            eventId: 'ev_spirit_beast_cub',
            title: '灵兽幼崽',
            description: '你发现了一只受伤的灵兽幼崽。',
            condition: (player, state) => {
              return state.completedSteps.includes('moral_step1');
            },
          },
          {
            id: 'moral_step3',
            eventId: 'ev_frame_up',
            title: '栽赃陷害',
            description: '有人试图栽赃你，考验你如何应对。',
            condition: (player, state) => {
              return state.completedSteps.includes('moral_step2');
            },
          },
        ],
        rewards: {
          exp: 1500,
          reputation: ['righteous'],
        },
      },
    ];
  }

  /** 获取所有事件链 */
  getAllChains(): IEventChain[] {
    return this.eventChains;
  }

  /** 获取玩家可用的事件链 */
  getAvailableChains(player: IPlayer): IEventChain[] {
    return this.eventChains.filter(chain => {
      const state = this.getChainState(chain.id);
      if (state.status === EventChainStatus.COMPLETED || state.status === EventChainStatus.ACTIVE) {
        return false;
      }
      return player.realm >= chain.minRealm;
    });
  }

  /** 获取事件链状态 */
  getChainState(chainId: string): IEventChainState {
    if (!this.chainStates.has(chainId)) {
      this.chainStates.set(chainId, {
        chainId,
        currentStepIndex: 0,
        completedSteps: [],
        stepChoices: {},
        status: EventChainStatus.AVAILABLE,
        startedAt: 0,
        lastUpdatedAt: 0,
        variables: {},
      });
    }
    return this.chainStates.get(chainId)!;
  }

  /** 开始事件链 */
  startChain(chainId: string, player: IPlayer): boolean {
    const chain = this.eventChains.find(c => c.id === chainId);
    if (!chain) return false;

    const state = this.getChainState(chainId);
    if (state.status !== EventChainStatus.AVAILABLE && state.status !== EventChainStatus.LOCKED) {
      return false;
    }

    if (player.realm < chain.minRealm) return false;

    state.status = EventChainStatus.ACTIVE;
    state.startedAt = Date.now();
    state.lastUpdatedAt = Date.now();
    return true;
  }

  /** 获取当前步骤 */
  getCurrentStep(chainId: string): IEventChainStep | null {
    const chain = this.eventChains.find(c => c.id === chainId);
    if (!chain) return null;

    const state = this.getChainState(chainId);
    if (state.status !== EventChainStatus.ACTIVE) return null;

    const step = chain.steps[state.currentStepIndex];
    return step || null;
  }

  /** 检查步骤条件 */
  canTriggerStep(chainId: string, player: IPlayer): boolean {
    const chain = this.eventChains.find(c => c.id === chainId);
    if (!chain) return false;

    const state = this.getChainState(chainId);
    if (state.status !== EventChainStatus.ACTIVE) return false;

    const step = chain.steps[state.currentStepIndex];
    if (!step) return false;

    if (step.condition) {
      return step.condition(player, state);
    }

    // 默认条件：前置步骤都已完成
    if (step.requiredPreviousSteps) {
      return step.requiredPreviousSteps.every(s => state.completedSteps.includes(s));
    }

    return true;
  }

  /** 记录步骤选择 */
  recordStepChoice(chainId: string, stepId: string, choiceId: string): void {
    const state = this.getChainState(chainId);
    state.stepChoices[stepId] = choiceId;
    state.completedSteps.push(stepId);
    state.lastUpdatedAt = Date.now();

    const chain = this.eventChains.find(c => c.id === chainId);
    if (chain) {
      if (state.currentStepIndex < chain.steps.length - 1) {
        state.currentStepIndex++;
      } else {
        state.status = EventChainStatus.COMPLETED;
      }
    }
  }

  /** 获取步骤对应的事件模板 */
  getStepEventTemplate(chainId: string, stepId: string): IWorldEventTemplate | null {
    const chain = this.eventChains.find(c => c.id === chainId);
    if (!chain) return null;

    const step = chain.steps.find(s => s.id === stepId);
    if (!step) return null;

    return WORLD_EVENT_TEMPLATES.find(e => e.id === step.eventId) || null;
  }

  /** 完成事件链，发放奖励 */
  completeChain(chainId: string, player: IPlayer): { success: boolean; rewards: string[] } {
    const state = this.getChainState(chainId);
    if (state.status !== EventChainStatus.COMPLETED) {
      return { success: false, rewards: [] };
    }

    const chain = this.eventChains.find(c => c.id === chainId);
    if (!chain) return { success: false, rewards: [] };

    const rewards: string[] = [];

    if (chain.rewards.exp) {
      player.cultivationExp += chain.rewards.exp;
      rewards.push(`修为 +${chain.rewards.exp}`);
    }

    if (chain.rewards.gold) {
      player.gold += chain.rewards.gold;
      rewards.push(`灵石 +${chain.rewards.gold}`);
    }

    if (chain.rewards.items) {
      for (const item of chain.rewards.items) {
        rewards.push(`获得物品: ${item}`);
      }
    }

    if (chain.rewards.reputation) {
      for (const rep of chain.rewards.reputation) {
        rewards.push(`获得名声: ${rep}`);
      }
    }

    return { success: true, rewards };
  }

  /** 获取事件链进度描述 */
  getChainProgress(chainId: string): string {
    const chain = this.eventChains.find(c => c.id === chainId);
    if (!chain) return '';

    const state = this.getChainState(chainId);
    const totalSteps = chain.steps.length;
    const completedCount = state.completedSteps.length;

    switch (state.status) {
      case EventChainStatus.LOCKED:
        return '🔒 未解锁';
      case EventChainStatus.AVAILABLE:
        return '⏳ 可开始';
      case EventChainStatus.ACTIVE:
        return `🔄 进行中 (${completedCount}/${totalSteps})`;
      case EventChainStatus.COMPLETED:
        return `✅ 已完成 (${completedCount}/${totalSteps})`;
      case EventChainStatus.FAILED:
        return '❌ 已失败';
      default:
        return '';
    }
  }

  /** 获取活跃的事件链 */
  getActiveChains(): IEventChainState[] {
    return Array.from(this.chainStates.values()).filter(s => s.status === EventChainStatus.ACTIVE);
  }

  /** 重置所有事件链 */
  resetAllChains(): void {
    this.chainStates.clear();
  }
}
