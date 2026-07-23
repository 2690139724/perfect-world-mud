export enum TutorialPhase {
  PHASE_0_BIRTH = 'phase_0_birth',
  PHASE_1_FIRST_STEP = 'phase_1_first_step',
  PHASE_2_EXPLORATION = 'phase_2_exploration',
  PHASE_3_COMBAT = 'phase_3_combat',
  PHASE_4_ADVANCED = 'phase_4_advanced',
  COMPLETED = 'completed',
}

export interface ITutorialStep {
  id: string;
  phase: TutorialPhase;
  message: string;
  highlightSelector?: string;
  autoTrigger?: boolean;
  skipCondition?: () => boolean;
  actionLabel?: string;
}

export interface ITutorialPhaseInfo {
  phase: TutorialPhase;
  name: string;
  description: string;
  unlockCondition: string;
  steps: string[];
}

export const TUTORIAL_PHASES: ITutorialPhaseInfo[] = [
  {
    phase: TutorialPhase.PHASE_0_BIRTH,
    name: '初降人世',
    description: '了解角色基础信息和修炼入门',
    unlockCondition: '初始开启',
    steps: ['step_welcome', 'step_status', 'step_cultivation_basic', 'step_cultivate_now'],
  },
  {
    phase: TutorialPhase.PHASE_1_FIRST_STEP,
    name: '初出茅庐',
    description: '学习任务系统和基础探索',
    unlockCondition: '达到搬血境后开启',
    steps: ['step_realm_up', 'step_task_intro', 'step_first_quest', 'step_map_intro'],
  },
  {
    phase: TutorialPhase.PHASE_2_EXPLORATION,
    name: '踏入江湖',
    description: '学习战斗、背包和装备系统',
    unlockCondition: '完成「初出茅庐」任务后开启',
    steps: ['step_combat_intro', 'step_inventory_intro', 'step_equipment_intro'],
  },
  {
    phase: TutorialPhase.PHASE_3_COMBAT,
    name: '淬炼锋芒',
    description: '深入了解战斗策略和功法',
    unlockCondition: '穿戴3件装备后开启',
    steps: ['step_technique_intro', 'step_combat_tips'],
  },
  {
    phase: TutorialPhase.PHASE_4_ADVANCED,
    name: '修行之路',
    description: '解锁更多高级玩法',
    unlockCondition: '达到洞天境后开启',
    steps: ['step_advanced_features', 'step_growth_guide', 'step_final'],
  },
];

export class TutorialSystem {
  private static instance: TutorialSystem;
  private steps: ITutorialStep[] = [];
  private currentStepIndex: number = 0;
  private currentPhase: TutorialPhase = TutorialPhase.PHASE_0_BIRTH;
  private isActive: boolean = false;
  private overlay: HTMLElement | null = null;
  private highlightEl: HTMLElement | null = null;
  private contentEl: HTMLElement | null = null;
  private nextBtn: HTMLElement | null = null;
  private phaseCompleted: Set<TutorialPhase> = new Set();
  private onPhaseCompleteCallback?: ((phase: TutorialPhase) => void);

  private constructor() {
    this.initSteps();
    this.loadProgress();
  }

  static getInstance(): TutorialSystem {
    if (!TutorialSystem.instance) {
      TutorialSystem.instance = new TutorialSystem();
    }
    return TutorialSystem.instance;
  }

  setOnPhaseComplete(callback: (phase: TutorialPhase) => void): void {
    this.onPhaseCompleteCallback = callback;
  }

  private initSteps(): void {
    this.steps = [
      // ========== 阶段0：初降人世 ==========
      {
        id: 'step_welcome',
        phase: TutorialPhase.PHASE_0_BIRTH,
        message: '欢迎来到修仙世界，道友！你降生于大荒边的石村，天生带有神秘体质。让我来指引你踏上修仙之路吧。',
        actionLabel: '开始修行',
      },
      {
        id: 'step_status',
        phase: TutorialPhase.PHASE_0_BIRTH,
        message: '首先，点击底部「状态」按钮查看你的详细属性。这里可以看到你的境界、修为、战力等核心信息。',
        highlightSelector: '.quick-btn[data-view="status"]',
      },
      {
        id: 'step_cultivation_basic',
        phase: TutorialPhase.PHASE_0_BIRTH,
        message: '修仙之路，以修为本。点击「修炼」按钮开始打坐修行，积累修为后可突破到更高境界。',
        highlightSelector: '.quick-btn[data-view="cultivation"]',
      },
      {
        id: 'step_cultivate_now',
        phase: TutorialPhase.PHASE_0_BIRTH,
        message: '点击「修炼」按钮，开始你的第一次修行吧！修炼完成后记得再次点击，积累足够修为即可突破境界。',
        highlightSelector: '.cultivate-btn',
      },

      // ========== 阶段1：初出茅庐 ==========
      {
        id: 'step_realm_up',
        phase: TutorialPhase.PHASE_1_FIRST_STEP,
        message: '恭喜！你已经突破到搬血境，正式踏上修仙之路！接下来让我们了解更多功能。',
      },
      {
        id: 'step_task_intro',
        phase: TutorialPhase.PHASE_1_FIRST_STEP,
        message: '点击「任务」按钮查看可接取的任务。完成任务可以获得经验、灵石和各种奖励，是快速成长的好方法。',
        highlightSelector: '.quick-btn[data-view="task"]',
      },
      {
        id: 'step_first_quest',
        phase: TutorialPhase.PHASE_1_FIRST_STEP,
        message: '找到「初出茅庐」任务并接取它。这是你的第一个任务，完成后会解锁更多功能哦！',
        highlightSelector: '.quest-item[data-id="quest_first_hunt"]',
      },
      {
        id: 'step_map_intro',
        phase: TutorialPhase.PHASE_1_FIRST_STEP,
        message: '点击「舆图」按钮探索周边区域。不同区域有不同的机缘和挑战，从后山开始你的冒险吧！',
        highlightSelector: '.quick-btn[data-view="map"]',
      },

      // ========== 阶段2：踏入江湖 ==========
      {
        id: 'step_combat_intro',
        phase: TutorialPhase.PHASE_2_EXPLORATION,
        message: '遇到敌人了！战斗系统是你获取资源和提升实力的重要途径。注意观察敌人血量，合理使用技能和道具。',
      },
      {
        id: 'step_inventory_intro',
        phase: TutorialPhase.PHASE_2_EXPLORATION,
        message: '点击「背包」按钮查看你的战利品。背包中有各种材料、丹药和装备，善用它们可以事半功倍。',
        highlightSelector: '.quick-btn[data-view="inventory"]',
      },
      {
        id: 'step_equipment_intro',
        phase: TutorialPhase.PHASE_2_EXPLORATION,
        message: '在背包中找到装备物品，点击即可穿戴。合适的装备能大幅提升你的战斗力！',
      },

      // ========== 阶段3：淬炼锋芒 ==========
      {
        id: 'step_technique_intro',
        phase: TutorialPhase.PHASE_3_COMBAT,
        message: '你已经有了基础装备，是时候学习功法了！点击「功法」按钮，学习强力的技能和心法。',
        highlightSelector: '.quick-btn[data-view="technique"]',
      },
      {
        id: 'step_combat_tips',
        phase: TutorialPhase.PHASE_3_COMBAT,
        message: '战斗小技巧：合理搭配攻防技能，注意技能冷却时间，危急时刻使用丹药可以扭转战局。',
      },

      // ========== 阶段4：修行之路 ==========
      {
        id: 'step_advanced_features',
        phase: TutorialPhase.PHASE_4_ADVANCED,
        message: '洞天境！你已经踏入了修行的新境界。炼丹、炼器、阵法、宗门...更多高级玩法等你探索！',
      },
      {
        id: 'step_growth_guide',
        phase: TutorialPhase.PHASE_4_ADVANCED,
        message: '点击「成长手册」可以查看阶段性目标和奖励。每天完成目标可以获得丰厚奖励，助力你的修行之路。',
        highlightSelector: '.growth-guide-btn',
      },
      {
        id: 'step_final',
        phase: TutorialPhase.PHASE_4_ADVANCED,
        message: '道友，新手指引到此结束。修仙之路漫漫，愿你早日得道飞升！如有疑问，随时可以查看帮助。',
        actionLabel: '开始冒险',
      },
    ];
  }

  private loadProgress(): void {
    try {
      const saved = localStorage.getItem('wujiang_tutorial');
      if (saved) {
        const data = JSON.parse(saved);
        this.currentPhase = data.currentPhase || TutorialPhase.PHASE_0_BIRTH;
        this.phaseCompleted = new Set(data.phaseCompleted || []);
        const phaseStepIndex = this.getPhaseStartIndex(this.currentPhase);
        const offset = data.phaseStepOffset || 0;
        this.currentStepIndex = phaseStepIndex + offset;
      }
    } catch (e) {
      // ignore
    }
  }

  private saveProgress(): void {
    try {
      const phaseStartIndex = this.getPhaseStartIndex(this.currentPhase);
      const phaseStepOffset = Math.max(0, this.currentStepIndex - phaseStartIndex);
      localStorage.setItem('wujiang_tutorial', JSON.stringify({
        currentPhase: this.currentPhase,
        phaseCompleted: Array.from(this.phaseCompleted),
        phaseStepOffset: phaseStepOffset,
        completed: this.currentPhase === TutorialPhase.COMPLETED,
      }));
    } catch (e) {
      // ignore
    }
  }

  private getPhaseStartIndex(phase: TutorialPhase): number {
    let index = 0;
    for (const step of this.steps) {
      if (step.phase === phase) break;
      index++;
    }
    return index;
  }

  private getPhaseSteps(phase: TutorialPhase): ITutorialStep[] {
    return this.steps.filter(s => s.phase === phase);
  }

  hasCompleted(): boolean {
    return this.currentPhase === TutorialPhase.COMPLETED;
  }

  hasPhaseCompleted(phase: TutorialPhase): boolean {
    return this.phaseCompleted.has(phase);
  }

  getCurrentPhase(): TutorialPhase {
    return this.currentPhase;
  }

  getPhaseInfo(phase: TutorialPhase): ITutorialPhaseInfo | undefined {
    return TUTORIAL_PHASES.find(p => p.phase === phase);
  }

  getAllPhases(): ITutorialPhaseInfo[] {
    return TUTORIAL_PHASES;
  }

  getNextPhase(): TutorialPhase | null {
    const currentIndex = TUTORIAL_PHASES.findIndex(p => p.phase === this.currentPhase);
    if (currentIndex < 0 || currentIndex >= TUTORIAL_PHASES.length - 1) {
      return this.currentPhase === TutorialPhase.COMPLETED ? null : TUTORIAL_PHASES[0].phase;
    }
    return TUTORIAL_PHASES[currentIndex + 1].phase;
  }

  start(): void {
    if (this.hasCompleted()) return;
    this.isActive = true;
    this.showStep(this.currentStepIndex);
  }

  startPhase(phase: TutorialPhase): boolean {
    if (this.phaseCompleted.has(phase)) return false;
    const phaseSteps = this.getPhaseSteps(phase);
    if (phaseSteps.length === 0) return false;

    this.currentPhase = phase;
    this.currentStepIndex = this.getPhaseStartIndex(phase);
    this.saveProgress();
    this.isActive = true;
    this.showStep(this.currentStepIndex);
    return true;
  }

  skipPhase(): void {
    this.phaseCompleted.add(this.currentPhase);
    this.advancePhase();
  }

  skipAll(): void {
    this.currentPhase = TutorialPhase.COMPLETED;
    TUTORIAL_PHASES.forEach(p => this.phaseCompleted.add(p.phase));
    this.saveProgress();
    this.hide();
  }

  private advancePhase(): void {
    const phases = TUTORIAL_PHASES;
    const currentIndex = phases.findIndex(p => p.phase === this.currentPhase);
    if (currentIndex < phases.length - 1) {
      this.currentPhase = phases[currentIndex + 1].phase;
      this.currentStepIndex = this.getPhaseStartIndex(this.currentPhase);
      this.saveProgress();
    } else {
      this.currentPhase = TutorialPhase.COMPLETED;
      this.saveProgress();
      this.hide();
    }
  }

  private showStep(index: number): void {
    if (index >= this.steps.length) {
      this.complete();
      return;
    }

    const step = this.steps[index];

    if (step.skipCondition && step.skipCondition()) {
      this.next();
      return;
    }

    this.createOverlay();

    if (step.highlightSelector) {
      const target = document.querySelector(step.highlightSelector);
      if (target) {
        this.createHighlight(target as HTMLElement);
      }
    }

    this.updateContent(step.message, step);
  }

  private createOverlay(): void {
    if (this.overlay) return;

    this.overlay = document.createElement('div');
    this.overlay.className = 'tutorial-overlay';

    this.contentEl = document.createElement('div');
    this.contentEl.className = 'tutorial-content';

    const headerRow = document.createElement('div');
    headerRow.className = 'tutorial-header-row';

    const title = document.createElement('div');
    title.className = 'tutorial-title';
    title.textContent = '【新手指引】';
    headerRow.appendChild(title);

    const phaseLabel = document.createElement('div');
    phaseLabel.className = 'tutorial-phase';
    const phaseInfo = this.getPhaseInfo(this.currentPhase);
    phaseLabel.textContent = phaseInfo ? phaseInfo.name : '';
    headerRow.appendChild(phaseLabel);

    this.contentEl.appendChild(headerRow);

    const progressBar = document.createElement('div');
    progressBar.className = 'tutorial-progress';
    const progressFill = document.createElement('div');
    progressFill.className = 'tutorial-progress-fill';
    progressBar.appendChild(progressFill);
    this.contentEl.appendChild(progressBar);

    const message = document.createElement('div');
    message.className = 'tutorial-message';
    this.contentEl.appendChild(message);

    const actions = document.createElement('div');
    actions.className = 'tutorial-actions';

    const tipText = document.createElement('div');
    tipText.className = 'tutorial-step-indicator';
    actions.appendChild(tipText);

    const btnGroup = document.createElement('div');
    btnGroup.className = 'tutorial-btn-group';

    this.nextBtn = document.createElement('button');
    this.nextBtn.className = 'tutorial-next-btn';
    this.nextBtn.textContent = '下一步';
    this.nextBtn.onclick = () => this.next();
    btnGroup.appendChild(this.nextBtn);

    const skipBtn = document.createElement('button');
    skipBtn.className = 'tutorial-skip-btn';
    skipBtn.textContent = '跳过本段';
    skipBtn.onclick = () => this.skipPhase();
    btnGroup.appendChild(skipBtn);

    actions.appendChild(btnGroup);
    this.contentEl.appendChild(actions);
    this.overlay.appendChild(this.contentEl);
    document.body.appendChild(this.overlay);
  }

  private createHighlight(target: HTMLElement): void {
    if (this.highlightEl) {
      this.highlightEl.remove();
    }

    const rect = target.getBoundingClientRect();
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    this.highlightEl = document.createElement('div');
    this.highlightEl.className = 'tutorial-highlight';
    // 仅保留动态位置/尺寸（CSS 变量无法表达）
    this.highlightEl.style.left = `${rect.left + scrollX - 8}px`;
    this.highlightEl.style.top = `${rect.top + scrollY - 8}px`;
    this.highlightEl.style.width = `${rect.width + 16}px`;
    this.highlightEl.style.height = `${rect.height + 16}px`;

    const glow = document.createElement('div');
    glow.className = 'tutorial-highlight-glow';
    this.highlightEl.appendChild(glow);

    document.body.appendChild(this.highlightEl);
  }

  private updateContent(message: string, step?: ITutorialStep): void {
    if (!this.contentEl) return;
    const msgEl = this.contentEl.querySelector('.tutorial-message');
    if (msgEl) {
      msgEl.textContent = message;
    }

    if (step && this.nextBtn) {
      this.nextBtn.textContent = step.actionLabel || '下一步';
    }

    if (step) {
      const phaseSteps = this.getPhaseSteps(step.phase);
      const currentIndex = phaseSteps.findIndex(s => s.id === step.id);
      const progress = phaseSteps.length > 0
        ? Math.floor(((currentIndex + 1) / phaseSteps.length) * 100)
        : 0;

      const progressFill = this.contentEl.querySelector('.tutorial-progress-fill');
      if (progressFill) {
        (progressFill as HTMLElement).style.width = `${progress}%`;
      }

      const stepIndicator = this.contentEl.querySelector('.tutorial-step-indicator');
      if (stepIndicator) {
        stepIndicator.textContent = `${currentIndex + 1} / ${phaseSteps.length}`;
      }
    }
  }

  private next(): void {
    const currentStep = this.steps[this.currentStepIndex];
    this.currentStepIndex++;
    this.saveProgress();
    this.cleanup();

    const nextStep = this.steps[this.currentStepIndex];
    if (nextStep && nextStep.phase === currentStep.phase) {
      setTimeout(() => this.showStep(this.currentStepIndex), 100);
    } else {
      this.completePhase(currentStep.phase);
    }
  }

  private completePhase(phase: TutorialPhase): void {
    this.phaseCompleted.add(phase);
    this.saveProgress();

    if (this.onPhaseCompleteCallback) {
      this.onPhaseCompleteCallback(phase);
    }

    const nextPhase = this.getNextPhase();
    if (!nextPhase || this.currentStepIndex >= this.steps.length) {
      this.currentPhase = TutorialPhase.COMPLETED;
      this.saveProgress();
    }
    this.hide();
  }

  private complete(): void {
    this.currentPhase = TutorialPhase.COMPLETED;
    this.phaseCompleted = new Set(TUTORIAL_PHASES.map(p => p.phase));
    this.saveProgress();
    this.hide();
  }

  private hide(): void {
    this.cleanup();
    this.isActive = false;
  }

  private cleanup(): void {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
    if (this.highlightEl) {
      this.highlightEl.remove();
      this.highlightEl = null;
    }
    this.contentEl = null;
    this.nextBtn = null;
  }

  skip(): void {
    this.skipPhase();
  }

  reset(): void {
    this.currentPhase = TutorialPhase.PHASE_0_BIRTH;
    this.phaseCompleted.clear();
    this.currentStepIndex = this.getPhaseStartIndex(TutorialPhase.PHASE_0_BIRTH);
    this.saveProgress();
  }
}
