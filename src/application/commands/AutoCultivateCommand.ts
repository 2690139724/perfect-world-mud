import { ICommandHandler, ICommandContext } from './CommandRouter';

export interface IAutoCultivateConfig {
  enabled: boolean;
  mode: 'cultivate' | 'meditate' | 'adventure' | 'battle';
  duration: number;
  interval: number;
  stopOnBreakthrough: boolean;
  stopOnLowHp: boolean;
  lowHpThreshold: number;
}

export class AutoCultivateCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['autocult', '挂机', '自动修炼', '开始挂机', '停止挂机', '挂机设置'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;

    if (action === 'autocult' || action === '挂机') {
      this.toggleAutoCultivate(store, narrative);
    } else if (action === '开始挂机') {
      this.startAutoCultivate(store, narrative, args);
    } else if (action === '停止挂机') {
      this.stopAutoCultivate(store, narrative);
    } else if (action === '挂机设置') {
      this.showSettings(store, narrative, modalManager);
    }
  }

  private getAutoConfig(store: any): IAutoCultivateConfig {
    return store.getState().autoCultivate || {
      enabled: false,
      mode: 'cultivate',
      duration: 0,
      interval: 2000,
      stopOnBreakthrough: true,
      stopOnLowHp: true,
      lowHpThreshold: 30,
    };
  }

  private toggleAutoCultivate(store: any, narrative: any): void {
    const config = this.getAutoConfig(store);
    if (config.enabled) {
      this.stopAutoCultivate(store, narrative);
    } else {
      this.startAutoCultivate(store, narrative, ['cultivate']);
    }
  }

  private startAutoCultivate(store: any, narrative: any, args: string[]): void {
    const config = this.getAutoConfig(store);
    const mode = args[0] || 'cultivate';
    const validModes = ['cultivate', 'meditate', 'adventure', 'battle'];
    if (!validModes.includes(mode)) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `无效的挂机模式！可选：${validModes.join('、')}` });
      return;
    }

    const player = store.getState().player;
    if (player.hp <= player.maxHp * 0.1) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '气血过低，无法开始挂机！' });
      return;
    }

    store.dispatch({ type: 'UPDATE_AUTO_CULTIVATE', payload: {
      enabled: true,
      mode: mode as any,
      startTime: Date.now(),
    } });

    const modeNames: Record<string, string> = {
      cultivate: '自动修炼',
      meditate: '静心冥想',
      adventure: '探索奇遇',
      battle: '自动战斗',
    };

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n━━━━━━━━━━━━━━━━━━━━` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【${modeNames[mode]}】已启动` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '━━━━━━━━━━━━━━━━━━━━' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '系统将自动执行修炼操作...' });
    if (mode === 'cultivate') {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `自动突破: ${config.stopOnBreakthrough ? '开启（成功率低于手动突破）' : '关闭'}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '修为进度越接近上限，修炼效率越低...' });
    }

    this.runAutoLoop(store, narrative);
  }

  private stopAutoCultivate(store: any, narrative: any): void {
    store.dispatch({ type: 'UPDATE_AUTO_CULTIVATE', payload: { enabled: false } });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n挂机已停止。' });

    const actions = [
      { label: '开始挂机', action: '挂机', desc: '继续自动修炼' },
      { label: '查看状态', action: '状态', desc: '查看角色状态' },
    ];
    narrative.pushClickableList('挂机停止', actions);
  }

  private runAutoLoop(store: any, narrative: any): void {
    const config = this.getAutoConfig(store);
    if (!config.enabled) return;

    setTimeout(() => {
      const currentConfig = this.getAutoConfig(store);
      if (!currentConfig.enabled) return;

      const player = store.getState().player;

      if (currentConfig.stopOnLowHp && player.hp <= player.maxHp * (currentConfig.lowHpThreshold / 100)) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n⚠️ 气血过低(${Math.floor(player.hp / player.maxHp * 100)}%)，挂机自动停止！` });
        this.stopAutoCultivate(store, narrative);
        return;
      }

      switch (currentConfig.mode) {
        case 'cultivate':
          this.autoCultivate(store);
          break;
        case 'meditate':
          this.autoMeditate(store);
          break;
        case 'adventure':
          this.autoAdventure(store);
          break;
        case 'battle':
          this.autoBattle(store);
          break;
      }

      this.runAutoLoop(store, narrative);
    }, config.interval);
  }

  private autoCultivate(store: any): void {
    const player = store.getState().player;
    
    if (player.cultivationExp >= player.maxCultivationExp) {
      this.autoBreakthrough(store);
      return;
    }

    const realm = player.realm;
    const baseExp = 10 + realm * 2;
    const expGainBase = Math.floor(baseExp * (1 + player.expBonus || 0));
    
    const progress = player.cultivationExp / player.maxCultivationExp;
    const efficiency = 1 - progress * 0.7;
    const expGain = Math.max(1, Math.floor(expGainBase * efficiency));
    
    player.cultivationExp = Math.min(player.maxCultivationExp, player.cultivationExp + expGain);

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
  }

  private autoBreakthrough(store: any): void {
    const player = store.getState().player;
    const config = this.getAutoConfig(store);

    if (!config.stopOnBreakthrough) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n⚠️ 修为已满，自动突破已禁用。请手动突破。' });
      store.dispatch({ type: 'UPDATE_AUTO_CULTIVATE', payload: { enabled: false } });
      return;
    }

    const currentRealm = player.realm;
    if (currentRealm >= 16) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n已达最高境界，挂机停止。' });
      store.dispatch({ type: 'UPDATE_AUTO_CULTIVATE', payload: { enabled: false } });
      return;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n━━━ 自动突破 ━━━' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `修为已满，尝试自动突破 ${this.getRealmName(currentRealm + 1)}...` });

    const successRate = this.calculateAutoBreakthroughRate(player);
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `自动突破成功率: **${(successRate * 100).toFixed(1)}%**（手动突破成功率更高）` });

    if (Math.random() < successRate) {
      this.performSuccessfulAutoBreakthrough(store);
    } else {
      this.handleAutoBreakthroughFailure(store);
    }
  }

  private calculateAutoBreakthroughRate(player: any): number {
    const baseRates: Record<number, number> = {
      0: 0.95, 1: 0.90, 2: 0.85, 3: 0.80, 4: 0.75,
      5: 0.70, 6: 0.60, 7: 0.50, 8: 0.40, 9: 0.35,
      10: 0.30, 11: 0.25, 12: 0.20, 13: 0.15, 14: 0.10, 15: 0.05,
    };
    
    let baseRate = baseRates[player.realm] || 0.05;
    const caveBonus = Math.min(0.08, player.caveCount * 0.01);
    const insightBonus = (player.breakthroughInsight || 0) * 0.003;
    
    const autoPenalty = 0.3;
    let finalRate = Math.min(0.95, Math.max(0.05, baseRate + caveBonus + insightBonus - autoPenalty));
    
    const maxAttempts = Math.max(3, 10 - player.realm);
    if ((player.breakthroughAttempts || 0) >= maxAttempts) {
      finalRate = 1.0;
    }
    
    return finalRate;
  }

  private performSuccessfulAutoBreakthrough(store: any): void {
    const player = store.getState().player;
    const oldRealm = player.realm;
    const newRealm = Math.min(player.realm + 1, 16);
    
    const bonusMap: Record<number, { hp: number; mana: number; attack: number; defense: number; speed: number }> = {
      0: { hp: 20, mana: 10, attack: 3, defense: 2, speed: 1 },
      1: { hp: 30, mana: 15, attack: 5, defense: 3, speed: 1 },
      2: { hp: 50, mana: 25, attack: 8, defense: 5, speed: 2 },
      3: { hp: 80, mana: 40, attack: 12, defense: 8, speed: 2 },
      4: { hp: 120, mana: 60, attack: 18, defense: 12, speed: 3 },
      5: { hp: 200, mana: 100, attack: 28, defense: 18, speed: 4 },
      6: { hp: 350, mana: 150, attack: 40, defense: 25, speed: 5 },
      7: { hp: 500, mana: 200, attack: 60, defense: 35, speed: 6 },
      8: { hp: 800, mana: 300, attack: 90, defense: 50, speed: 8 },
      9: { hp: 1200, mana: 400, attack: 130, defense: 70, speed: 10 },
      10: { hp: 2000, mana: 600, attack: 200, defense: 100, speed: 12 },
      11: { hp: 3000, mana: 800, attack: 300, defense: 150, speed: 15 },
      12: { hp: 5000, mana: 1200, attack: 500, defense: 250, speed: 20 },
      13: { hp: 8000, mana: 2000, attack: 800, defense: 400, speed: 25 },
      14: { hp: 15000, mana: 4000, attack: 1500, defense: 800, speed: 30 },
      15: { hp: 30000, mana: 8000, attack: 3000, defense: 1500, speed: 40 },
    };
    
    const bonus = bonusMap[oldRealm] || bonusMap[15];
    
    player.maxHp += bonus.hp;
    player.hp = player.maxHp;
    player.maxMana += bonus.mana;
    player.mana = player.maxMana;
    player.attack += bonus.attack;
    player.defense += bonus.defense;
    player.speed += bonus.speed;
    
    player.realm = newRealm;
    player.realmStage = 1;
    player.realmPerfection = false;
    player.cultivationExp = 0;
    
    const expRequired = (newRealm + 1) * 100;
    player.maxCultivationExp = expRequired;
    
    player.breakthroughInsight = Math.floor((player.breakthroughInsight || 0) * 0.3);
    player.breakthroughAttempts = 0;
    
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n🎉 自动突破成功！晋升为 ${this.getRealmName(newRealm)}！` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `属性提升：气血+${bonus.hp} 法力+${bonus.mana} 攻击+${bonus.attack} 防御+${bonus.defense} 速度+${bonus.speed}` });
    
    if (newRealm >= 16) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '恭喜你达到最高境界！' });
      store.dispatch({ type: 'UPDATE_AUTO_CULTIVATE', payload: { enabled: false } });
    }
    
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
  }

  private handleAutoBreakthroughFailure(store: any): void {
    const player = store.getState().player;
    
    player.breakthroughAttempts = (player.breakthroughAttempts || 0) + 1;
    
    const retentionRate = Math.min(0.85, 0.75 + (player.breakthroughInsight || 0) * 0.02);
    const loss = Math.floor(player.cultivationExp * (1 - retentionRate));
    player.cultivationExp = Math.max(0, player.cultivationExp - loss);
    
    player.breakthroughInsight = (player.breakthroughInsight || 0) + 3;
    
    const maxAttempts = Math.max(3, 10 - player.realm);
    const attemptsRemaining = maxAttempts - player.breakthroughAttempts;
    
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n❌ 自动突破失败！瓶颈纹丝不动...' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `修为损失 ${loss} 点，保留 ${Math.floor(retentionRate * 100)}%。` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `突破感悟 +3（当前 ${player.breakthroughInsight}）` });
    
    if (attemptsRemaining > 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `再失败 ${attemptsRemaining} 次后必定成功！` });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '⚠️ 保底触发！下次必定成功！' });
    }
    
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
  }

  private autoMeditate(store: any): void {
    const player = store.getState().player;
    const manaRecovery = Math.floor(player.maxMana * 0.05);
    player.mana = Math.min(player.maxMana, player.mana + manaRecovery);
    
    const hpRecovery = Math.floor(player.maxHp * 0.03);
    player.hp = Math.min(player.maxHp, player.hp + hpRecovery);

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
  }

  private autoAdventure(store: any): void {
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你四处探索着...' });
  }

  private autoBattle(store: any): void {
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你在野外寻找敌人...' });
  }

  private getRealmName(realm: number): string {
    const names = [
      '凡人', '搬血境', '洞天境', '化灵境', '铭文境', '列阵境',
      '尊者境', '神火境', '真一境', '圣祭境', '天神境', '虚道境',
      '斩我境', '遁一境', '至尊境', '仙王境',
    ];
    return names[realm] || `境界${realm}`;
  }

  private showSettings(store: any, narrative: any, modalManager: any): void {
    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【挂机设置】' });
      const config = this.getAutoConfig(store);
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `当前模式：${config.mode}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `自动停止突破：${config.stopOnBreakthrough ? '开启' : '关闭'}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `气血过低停止：${config.stopOnLowHp ? '开启' : '关闭'}（${config.lowHpThreshold}%）` });
      narrative.pushClickableList('挂机设置', [
        { label: '开始挂机', action: '挂机', desc: '启动自动修炼' },
        { label: '设置模式', action: '挂机设置 修炼', desc: '设置挂机模式' },
      ]);
      return;
    }

    const config = this.getAutoConfig(store);

    modalManager.showInteractive('挂机设置', (container: HTMLElement) => {
      const currentMode = document.createElement('div');
      currentMode.className = 'autocult-current';
      currentMode.innerHTML = `<div>当前模式：<span class="autocult-mode">${config.mode}</span></div>`;
      container.appendChild(currentMode);

      const modeSection = document.createElement('div');
      modeSection.className = 'autocult-section';
      modeSection.innerHTML = '<div class="autocult-section-title">挂机模式</div>';

      const modes = [
        { value: 'cultivate', label: '自动修炼', desc: '持续获取修为' },
        { value: 'meditate', label: '静心冥想', desc: '恢复气血法力' },
        { value: 'adventure', label: '探索奇遇', desc: '自动触发奇遇' },
        { value: 'battle', label: '自动战斗', desc: '寻找敌人战斗' },
      ];

      const modeGrid = document.createElement('div');
      modeGrid.className = 'autocult-grid';

      for (const mode of modes) {
        const btn = document.createElement('button');
        btn.className = `modal-btn ${config.mode === mode.value ? 'modal-btn-primary' : 'modal-btn-secondary'}`;
        btn.textContent = mode.label;
        btn.addEventListener('click', () => {
          store.dispatch({ type: 'UPDATE_AUTO_CULTIVATE', payload: { mode: mode.value as any } });
          this.showSettings(store, narrative, modalManager);
        });
        modeGrid.appendChild(btn);
      }

      modeSection.appendChild(modeGrid);
      container.appendChild(modeSection);

      const toggleSection = document.createElement('div');
      toggleSection.className = 'autocult-section';

      const startBtn = document.createElement('button');
      startBtn.className = 'modal-btn modal-btn-primary';
      startBtn.textContent = '开始挂机';
      startBtn.addEventListener('click', () => {
        modalManager.close();
        this.startAutoCultivate(store, narrative, [config.mode]);
      });

      const stopBtn = document.createElement('button');
      stopBtn.className = 'modal-btn modal-btn-secondary';
      stopBtn.textContent = '停止挂机';
      stopBtn.addEventListener('click', () => {
        modalManager.close();
        this.stopAutoCultivate(store, narrative);
      });

      toggleSection.appendChild(startBtn);
      toggleSection.appendChild(stopBtn);
      container.appendChild(toggleSection);
    }, { width: '500px', height: '400px' });
  }
}