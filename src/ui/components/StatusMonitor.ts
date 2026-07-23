/**
 * 信息展示架构 - 状态监控面板
 * 实时显示玩家核心数值、目标进度、环境效果
 */

import { IPlayer } from '../../domain/entities/Player';

export interface IStatusPanel {
  update(player: IPlayer): void;
  show(): void;
  hide(): void;
}

export class StatusMonitor implements IStatusPanel {
  private static instance: StatusMonitor;
  private container: HTMLElement | null = null;
  private lastUpdateTime: number = 0;
  private updateInterval: number = 500; // 500ms更新一次

  private constructor() {
    this.createUI();
  }

  static getInstance(): StatusMonitor {
    if (!StatusMonitor.instance) {
      StatusMonitor.instance = new StatusMonitor();
    }
    return StatusMonitor.instance;
  }

  private createUI(): void {
    // 创建状态监控面板
    this.container = document.createElement('div');
    this.container.id = 'status-monitor';
    this.container.className = 'status-monitor';
    this.container.innerHTML = `
      <!-- 核心状态区 -->
      <div class="status-core">
        <div class="status-row status-combat">
          <div class="status-item" data-stat="attack">
            <span class="stat-icon">攻</span>
            <span class="stat-label">攻击</span>
            <span class="stat-value" id="monitor-attack">0</span>
          </div>
          <div class="status-item" data-stat="defense">
            <span class="stat-icon">御</span>
            <span class="stat-label">防御</span>
            <span class="stat-value" id="monitor-defense">0</span>
          </div>
          <div class="status-item" data-stat="speed">
            <span class="stat-icon">敏</span>
            <span class="stat-label">速度</span>
            <span class="stat-value" id="monitor-speed">0</span>
          </div>
        </div>

        <div class="status-row status-cultivation">
          <div class="status-item" data-stat="cultivation-rate">
            <span class="stat-icon">元</span>
            <span class="stat-label">修炼效率</span>
            <span class="stat-value" id="monitor-cultivation-rate">1.0x</span>
          </div>
          <div class="status-item" data-stat="spirit-density">
            <span class="stat-icon">灵</span>
            <span class="stat-label">灵气</span>
            <span class="stat-value" id="monitor-spirit-density">1.0</span>
          </div>
          <div class="status-item" data-stat="breakthrough-progress">
            <span class="stat-icon">境</span>
            <span class="stat-label">突破进度</span>
            <span class="stat-value" id="monitor-breakthrough-progress">0%</span>
          </div>
        </div>
      </div>

      <!-- 目标追踪区 -->
      <div class="status-targets">
        <div class="target-header">
          <span class="target-icon">◆</span>
          <span class="target-title">当前目标</span>
        </div>
        <div class="target-list" id="monitor-targets">
          <div class="target-item target-empty">暂无目标</div>
        </div>
      </div>
      
      <!-- 效果图标区 -->
      <div class="status-effects">
        <div class="effects-row" id="monitor-buffs">
          <!-- 动态填充buff图标 -->
        </div>
      </div>
    `;

    // 默认隐藏
    this.container.classList.add('hidden');
    document.body.appendChild(this.container);
  }

  update(player: IPlayer): void {
    const now = Date.now();
    if (now - this.lastUpdateTime < this.updateInterval) return;
    this.lastUpdateTime = now;

    if (!this.container) return;

    // 更新战斗属性
    this.setText('monitor-attack', String(player.attack));
    this.setText('monitor-defense', String(player.defense));
    this.setText('monitor-speed', String(player.speed));

    // 更新修炼相关
    const cultRate = player.spiritAbsorbRate || 1.0;
    this.setText('monitor-cultivation-rate', `${cultRate.toFixed(1)}x`);

    // 突破进度
    const breakthroughProgress = player.maxCultivationExp > 0 
      ? Math.floor((player.cultivationExp / player.maxCultivationExp) * 100) 
      : 0;
    this.setText('monitor-breakthrough-progress', `${breakthroughProgress}%`);

    // 更新目标追踪
    this.updateTargets(player);
  }

  private updateTargets(player: IPlayer): void {
    const targetsEl = document.getElementById('monitor-targets');
    if (!targetsEl) return;

    // 从活动任务中提取目标
    const activeQuests = player.activeQuests || [];
    
    if (activeQuests.length === 0) {
      targetsEl.innerHTML = '<div class="target-item target-empty">暂无目标</div>';
      return;
    }

    let html = '';
    for (const quest of activeQuests.slice(0, 3)) {
      if (quest.isCompleted) continue;
      
      const currentStage = quest.stages.find((s: any) => s.id === quest.currentStageId);
      if (!currentStage) continue;

      const objectives = currentStage.objectives || [];
      const mainObj = objectives[0];
      
      if (mainObj) {
        const progress = mainObj.current / mainObj.required;
        const progressPct = Math.floor(progress * 100);

        html += `
          <div class="target-item" style="--progress-pct:${progressPct}%">
            <div class="target-name">${quest.name}</div>
            <div class="target-progress">
              <div class="target-progress-bar">
                <div class="target-progress-fill"></div>
              </div>
              <span class="target-progress-text">${mainObj.current}/${mainObj.required}</span>
            </div>
          </div>
        `;
      }
    }

    targetsEl.innerHTML = html || '<div class="target-item target-empty">暂无目标</div>';
  }

  private setText(id: string, text: string): void {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  show(): void {
    if (this.container) {
      this.container.classList.remove('hidden');
    }
  }

  hide(): void {
    if (this.container) {
      this.container.classList.add('hidden');
    }
  }

  toggle(): void {
    if (this.container) {
      this.container.classList.toggle('hidden');
    }
  }
}