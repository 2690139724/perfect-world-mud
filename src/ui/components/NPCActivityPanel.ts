import { INPC } from '../../domain/entities/NPC';
import { NPCLifeService } from '../../domain/services/NPCLifeService';
import {
  NPCActivityType,
  NPCMood,
  INPCLifeState,
  ACTIVITY_NAMES,
  MOOD_NAMES,
} from '../../domain/entities/NPCLifeLogic';
import { eventBus } from '../../infrastructure/event/EventBus';
import { GameTimeService } from '../../domain/services/GameTimeService';

export class NPCActivityPanel {
  private container: HTMLElement;
  private npcLifeService: NPCLifeService;
  private gameTimeService: GameTimeService;
  private npcList: INPC[] = [];
  private activityList: HTMLElement;
  private readonly boundUpdatePanel = () => this.updatePanel();

  constructor(parent: HTMLElement) {
    this.npcLifeService = new NPCLifeService();
    this.gameTimeService = GameTimeService.getInstance();
    this.container = this.createContainer();
    parent.appendChild(this.container);

    this.activityList = this.container.querySelector('.npc-activity-list')!;

    this.setupEventListeners();
  }

  private createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'npc-activity-panel';
    container.innerHTML = `
      <div class="panel-header">
        <h3>🏘️ NPC 日常</h3>
        <div class="header-info">
          <span class="time-indicator"></span>
        </div>
      </div>
      <div class="panel-filter">
        <button class="filter-btn active" data-filter="all">全部</button>
        <button class="filter-btn" data-filter="cultivating">修炼中</button>
        <button class="filter-btn" data-filter="working">工作中</button>
        <button class="filter-btn" data-filter="socializing">社交中</button>
        <button class="filter-btn" data-filter="resting">休息中</button>
      </div>
      <div class="npc-activity-list"></div>
    `;

    const filterBtns = container.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const filter = target.dataset.filter || 'all';
        this.applyFilter(filter);
      });
    });

    return container;
  }

  private setupEventListeners(): void {
    eventBus.on('npc:activityChanged', this.boundUpdatePanel);
    eventBus.on('gameTime:hourChanged', this.boundUpdatePanel);
    eventBus.on('gameTime:timeOfDayChanged', this.boundUpdatePanel);
  }

  registerNPCs(npcs: INPC[]): void {
    this.npcList = npcs;
    npcs.forEach((npc) => this.npcLifeService.registerNPC(npc));
    this.updatePanel();
  }

  private applyFilter(filter: string): void {
    const filterBtns = this.container.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => btn.classList.remove('active'));
    const activeBtn = this.container.querySelector(`[data-filter="${filter}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const items = this.activityList.querySelectorAll('.npc-activity-item');
    items.forEach((item) => {
      const activityType = (item as HTMLElement).dataset.activity;
      if (filter === 'all' || activityType === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  private updatePanel(): void {
    const timeIndicator = this.container.querySelector('.time-indicator');
    if (timeIndicator) {
      timeIndicator.textContent = this.gameTimeService.getFormattedTime();
    }

    this.activityList.innerHTML = '';

    for (const npc of this.npcList) {
      const state = this.npcLifeService.getNPCState(npc.id);
      if (!state) continue;

      const item = this.createNPCActivityItem(npc, state);
      this.activityList.appendChild(item);
    }
  }

  private createNPCActivityItem(npc: INPC, state: INPCLifeState): HTMLElement {
    const item = document.createElement('div');
    item.className = 'npc-activity-item';
    item.dataset.activity = state.currentActivity;
    item.dataset.npcId = npc.id;

    const activityName = ACTIVITY_NAMES[state.currentActivity];
    const moodName = MOOD_NAMES[state.mood];
    const moodIcon = this.getMoodIcon(state.mood);

    const isActive = this.isActivityActive(state.currentActivity);
    const isNight = this.gameTimeService.isNight();

    item.innerHTML = `
      <div class="npc-avatar">
        <span class="avatar-icon">${this.getAvatarIcon(npc)}</span>
        <span class="online-indicator ${isActive ? 'online' : 'offline'}"></span>
      </div>
      <div class="npc-info">
        <div class="npc-name">${npc.name}</div>
        <div class="npc-title">${npc.title || ''}</div>
      </div>
      <div class="npc-activity">
        <span class="activity-badge ${this.getActivityClass(state.currentActivity)}">
          ${this.getActivityIcon(state.currentActivity)} ${activityName}
        </span>
        <span class="mood-indicator">${moodIcon} ${moodName}</span>
      </div>
      <div class="npc-status">
        <div class="status-bar fatigue" style="--fill:${state.fatigue}%">
          <span class="label">疲惫</span>
          <div class="bar">
            <div class="fill"></div>
          </div>
        </div>
        <div class="status-bar hunger" style="--fill:${state.hunger}%">
          <span class="label">饥饿</span>
          <div class="bar">
            <div class="fill"></div>
          </div>
        </div>
      </div>
    `;

    if (isNight && state.currentActivity === NPCActivityType.SLEEPING) {
      item.classList.add('night-sleeping');
    }

    item.addEventListener('click', () => {
      eventBus.emit('npc:selected', { npc, state });
    });

    return item;
  }

  private isActivityActive(activity: NPCActivityType): boolean {
    const activeActivities = [
      NPCActivityType.CULTIVATING,
      NPCActivityType.WORKING,
      NPCActivityType.SOCIALIZING,
      NPCActivityType.PATROLLING,
      NPCActivityType.GUARDING,
    ];
    return activeActivities.includes(activity);
  }

  private getAvatarIcon(npc: INPC): string {
    const occupation = (npc as any).occupation || '';
    if (occupation.includes('长老')) return '👴';
    if (occupation.includes('掌门')) return '👑';
    if (occupation.includes('弟子')) return '🧑';
    if (occupation.includes('商人')) return '💰';
    if (occupation.includes('医师')) return '🧪';
    if (occupation.includes('铁匠')) return '⚒️';
    if (occupation.includes('厨师')) return '👩🍳';
    return '👤';
  }

  private static readonly ACTIVITY_ICONS: Partial<Record<NPCActivityType, string>> = {
    [NPCActivityType.CULTIVATING]: '🧘',
    [NPCActivityType.WORKING]: '⚒️',
    [NPCActivityType.SOCIALIZING]: '🤝',
    [NPCActivityType.SLEEPING]: '😴',
    [NPCActivityType.RESTING]: '🪑',
    [NPCActivityType.EATING]: '🍽️',
    [NPCActivityType.PATROLLING]: '🚶',
    [NPCActivityType.GUARDING]: '🛡️',
    [NPCActivityType.EXPLORING]: '🗺️',
    [NPCActivityType.MEDITATING]: '🧘',
    [NPCActivityType.TRAINING]: '⚔️',
    [NPCActivityType.SHOPPING]: '🛒',
    [NPCActivityType.LEARNING]: '📚',
    [NPCActivityType.CRAFTING]: '🔧',
    [NPCActivityType.HUNTING]: '🏹',
    [NPCActivityType.TRAVELING]: '🎒',
  };

  private static readonly MOOD_ICONS: Record<NPCMood, string> = {
    [NPCMood.HAPPY]: '😊',
    [NPCMood.NEUTRAL]: '😐',
    [NPCMood.TIRED]: '😫',
    [NPCMood.ANGRY]: '😠',
    [NPCMood.SAD]: '😢',
    [NPCMood.EXCITED]: '🤩',
    [NPCMood.BORED]: '😴',
    [NPCMood.WORRIED]: '😰',
    [NPCMood.PEACEFUL]: '😌',
    [NPCMood.CURIOUS]: '🤔',
    [NPCMood.PROUD]: '😏',
    [NPCMood.SHY]: '😳',
    [NPCMood.GRATEFUL]: '🙏',
    [NPCMood.JEALOUS]: '😤',
    [NPCMood.AMUSED]: '😄',
    [NPCMood.FRUSTRATED]: '😒',
    [NPCMood.RELIEVED]: '😮',
    [NPCMood.NOSTALGIC]: '🥺',
    [NPCMood.DETERMINED]: '💪',
    [NPCMood.SERENE]: '🧘',
    [NPCMood.ANXIOUS]: '😬',
    [NPCMood.HOPEFUL]: '🤞',
    [NPCMood.DISAPPOINTED]: '😞',
    [NPCMood.SATISFIED]: '😌',
    [NPCMood.HUNGRY]: '🤤',
    [NPCMood.THIRSTY]: '🥵',
    [NPCMood.COLD]: '🥶',
    [NPCMood.HOT]: '🥵',
    [NPCMood.ENERGETIC]: '⚡',
    [NPCMood.MELANCHOLY]: '🥀',
    [NPCMood.DEFIANT]: '😤',
    [NPCMood.PRIDEFUL]: '😏',
    [NPCMood.BLOODTHIRSTY]: '🩸',
    [NPCMood.NOBLE]: '👑',
    [NPCMood.RUTHLESS]: '💀',
    [NPCMood.TRANSCENDENT]: '✨',
    [NPCMood.MYSTERIOUS]: '🔮',
    [NPCMood.MAJESTIC]: '⚖️',
    [NPCMood.DIVINE]: '😇',
    [NPCMood.EVOLVING]: '🦋',
    [NPCMood.REINCARNATED]: '🔄',
    [NPCMood.ANCIENT]: '🏛️',
    [NPCMood.DARKENED]: '🌑',
    [NPCMood.FIERY]: '🔥',
    [NPCMood.RESOLUTE]: '💎',
    [NPCMood.ARROGANT]: '😒',
    [NPCMood.DOMINANT]: '👊',
    [NPCMood.ETERNAL]: '⌛',
    [NPCMood.TRAGIC]: '🎭',
    [NPCMood.UNYIELDING]: '⛓️',
    [NPCMood.COSMIC]: '🌌',
    [NPCMood.CUNNING]: '🐍',
    [NPCMood.CALCULATING]: '🧮',
    [NPCMood.STEALTHY]: '🌑',
    [NPCMood.PERSEVERING]: '🌱',
    [NPCMood.MOONLIT]: '🌙',
    [NPCMood.DAO_SEEKING]: '🔍',
    [NPCMood.OVERWHELMING]: '👑',
    [NPCMood.SOULFUL]: '👻',
  };

  private getActivityIcon(activity: NPCActivityType): string {
    return NPCActivityPanel.ACTIVITY_ICONS[activity] ?? '❓';
  }

  private getActivityClass(activity: NPCActivityType): string {
    return `activity-${activity}`;
  }

  private getMoodIcon(mood: NPCMood): string {
    return NPCActivityPanel.MOOD_ICONS[mood] ?? '😐';
  }

  destroy(): void {
    eventBus.off('npc:activityChanged', this.boundUpdatePanel);
    eventBus.off('gameTime:hourChanged', this.boundUpdatePanel);
    eventBus.off('gameTime:timeOfDayChanged', this.boundUpdatePanel);
    this.container.remove();
  }
}
