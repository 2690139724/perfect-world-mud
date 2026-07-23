import {
  IRumor,
  RumorType,
  RumorReliability,
  RumorStatus,
  RUMOR_TYPE_NAMES,
  RUMOR_RELIABILITY_NAMES,
  RUMOR_STATUS_NAMES,
  getRumorTypeColor,
  getRumorReliabilityColor,
} from '../../domain/entities/Rumor';
import { RumorService } from '../../domain/services/RumorService';
import { eventBus } from '../../infrastructure/event/EventBus';

export class RumorBoard {
  private container: HTMLElement;
  private rumorService: RumorService;
  private rumorList: HTMLElement;
  private selectedRumor: IRumor | null = null;
  private readonly boundUpdateBoard = () => this.updateBoard();

  constructor(parent: HTMLElement) {
    this.rumorService = RumorService.getInstance();
    this.container = this.createContainer();
    parent.appendChild(this.container);

    this.rumorList = this.container.querySelector('.rumor-list')!;

    this.setupEventListeners();
    this.updateBoard();
  }

  private createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'rumor-board';
    container.innerHTML = `
      <div class="board-header">
        <h3>传闻公告板</h3>
        <div class="header-stats">
          <span class="stat-item"><span id="rumor-count">0</span></span>
        </div>
      </div>
      <div class="board-filter">
        <button class="filter-btn active" data-filter="all">全部</button>
        ${Object.entries(RUMOR_TYPE_NAMES).map(([key, name]) => `
          <button class="filter-btn" data-filter="${key}" style="--color:${getRumorTypeColor(key as RumorType)}">
            ${name}
          </button>
        `).join('')}
      </div>
      <div class="rumor-list"></div>
      <div class="rumor-detail" id="rumor-detail">
        <div class="detail-header">
          <h4 id="detail-title"></h4>
          <button class="close-btn" id="close-detail">×</button>
        </div>
        <div class="detail-content" id="detail-content"></div>
        <div class="detail-meta">
          <span class="meta-item" id="detail-source"></span>
          <span class="meta-item" id="detail-date"></span>
        </div>
        <div class="detail-actions">
          <button class="action-btn verify-btn" id="verify-true">证实</button>
          <button class="action-btn verify-btn" id="verify-false">辟谣</button>
          <button class="action-btn" id="spread-rumor">传播</button>
        </div>
      </div>
    `;

    const filterBtns = container.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const filter = target.dataset.filter || 'all';
        this.applyFilter(filter);
      });
    });

    container.querySelector('#close-detail')?.addEventListener('click', () => this.closeDetail());
    container.querySelector('#verify-true')?.addEventListener('click', () => this.verifyRumor(true));
    container.querySelector('#verify-false')?.addEventListener('click', () => this.verifyRumor(false));
    container.querySelector('#spread-rumor')?.addEventListener('click', () => this.spreadRumor());

    return container;
  }

  private setupEventListeners(): void {
    eventBus.on('rumor:created', this.boundUpdateBoard);
    eventBus.on('rumor:updated', this.boundUpdateBoard);
    eventBus.on('rumor:verified', this.boundUpdateBoard);
    eventBus.on('rumor:spread', this.boundUpdateBoard);
    eventBus.on('rumor:removed', this.boundUpdateBoard);
  }

  private applyFilter(filter: string): void {
    const filterBtns = this.container.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => btn.classList.remove('active'));
    const activeBtn = this.container.querySelector(`[data-filter="${filter}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const items = this.rumorList.querySelectorAll('.rumor-item');
    items.forEach((item) => {
      const type = (item as HTMLElement).dataset.type;
      if (filter === 'all' || type === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  private updateBoard(): void {
    const rumors = this.rumorService.getAllRumors();

    const countElement = this.container.querySelector('#rumor-count');
    if (countElement) {
      countElement.textContent = String(rumors.length);
    }

    this.rumorList.innerHTML = '';

    for (const rumor of rumors) {
      const item = this.createRumorItem(rumor);
      this.rumorList.appendChild(item);
    }
  }

  private createRumorItem(rumor: IRumor): HTMLElement {
    const item = document.createElement('div');
    item.className = 'rumor-item';
    item.dataset.type = rumor.type;
    item.dataset.id = rumor.id;

    const typeColor = getRumorTypeColor(rumor.type);
    const reliabilityColor = getRumorReliabilityColor(rumor.reliability);
    item.style.setProperty('--type-color', typeColor);
    item.style.setProperty('--type-color-soft', `${typeColor}40`);
    item.style.setProperty('--reliability-color', reliabilityColor);
    item.style.setProperty('--spread-pct', `${rumor.spreadLevel}%`);

    item.innerHTML = `
      <div class="rumor-header">
        <span class="type-badge">${RUMOR_TYPE_NAMES[rumor.type]}</span>
        <span class="reliability-badge">${RUMOR_RELIABILITY_NAMES[rumor.reliability]}</span>
        <span class="status-badge">${RUMOR_STATUS_NAMES[rumor.status]}</span>
      </div>
      <div class="rumor-title">${rumor.title}</div>
      <div class="rumor-preview">${rumor.content.substring(0, 50)}${rumor.content.length > 50 ? '...' : ''}</div>
      <div class="rumor-footer">
        <span class="source">${rumor.source}</span>
        <span class="date">第${rumor.createdAt}天</span>
        <div class="spread-bar">
          <div class="spread-fill"></div>
        </div>
      </div>
    `;

    item.addEventListener('click', () => this.showDetail(rumor));

    return item;
  }

  private showDetail(rumor: IRumor): void {
    this.selectedRumor = rumor;

    const detail = this.container.querySelector('#rumor-detail') as HTMLElement;
    if (!detail) return;

    const typeColor = getRumorTypeColor(rumor.type);
    detail.style.setProperty('--type-color', typeColor);

    (detail.querySelector('#detail-title') as HTMLElement).innerHTML = `
      <span class="type-prefix">[${RUMOR_TYPE_NAMES[rumor.type]}]</span>
      ${rumor.title}
    `;

    (detail.querySelector('#detail-content') as HTMLElement).textContent = rumor.content;

    (detail.querySelector('#detail-source') as HTMLElement).innerHTML = `
      <span>来源 <strong>${rumor.source}</strong></span>
    `;

    (detail.querySelector('#detail-date') as HTMLElement).innerHTML = `
      <span>录于 第${rumor.createdAt}天</span>
    `;

    detail.classList.add('visible');
  }

  private closeDetail(): void {
    const detail = this.container.querySelector('#rumor-detail');
    if (detail) {
      detail.classList.remove('visible');
    }
    this.selectedRumor = null;
  }

  private verifyRumor(isTrue: boolean): void {
    if (!this.selectedRumor) return;

    this.rumorService.verifyRumor(this.selectedRumor.id, isTrue);
    this.closeDetail();
  }

  private spreadRumor(): void {
    if (!this.selectedRumor) return;

    this.rumorService.spreadRumor(this.selectedRumor.id);
    this.closeDetail();
  }

  destroy(): void {
    eventBus.off('rumor:created', this.boundUpdateBoard);
    eventBus.off('rumor:updated', this.boundUpdateBoard);
    eventBus.off('rumor:verified', this.boundUpdateBoard);
    eventBus.off('rumor:spread', this.boundUpdateBoard);
    eventBus.off('rumor:removed', this.boundUpdateBoard);
    this.container.remove();
  }
}
