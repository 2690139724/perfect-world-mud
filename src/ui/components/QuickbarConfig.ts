// QuickbarConfig.ts - 可配置快捷功能栏
// 负责快捷栏按钮的渲染、增删、持久化

const STORAGE_KEY = 'wujiang_quickbar';

export interface IQuickbarItem {
  view: string;     // 功能窗口ID（对应 windowConfigs 的 key），或特殊值 'cultivation'（走命令系统）
  glyph: string;    // 单字图标
  name: string;     // 显示名称
}

// 所有可用的快捷功能（view 必须与 bootstrap.ts 中 windowConfigs 的 key 一致）
export const ALL_QUICKBAR_ITEMS: IQuickbarItem[] = [
  { view: 'backpack',    glyph: '囊', name: '行囊' },
  { view: 'map',         glyph: '舆', name: '舆图' },
  { view: 'cultivation', glyph: '修', name: '修炼' },
  { view: 'technique',   glyph: '术', name: '宝术' },
  { view: 'method',      glyph: '法', name: '功法' },
  { view: 'status',      glyph: '相', name: '状态' },
  { view: 'task',        glyph: '任', name: '任务' },
  { view: 'shop',        glyph: '铺', name: '商铺' },
  { view: 'craft',       glyph: '炼', name: '炼制' },
  { view: 'equip',       glyph: '装', name: '装备' },
  { view: 'cave',        glyph: '洞', name: '洞府' },
  { view: 'mount',       glyph: '骑', name: '坐骑' },
  { view: 'formation',   glyph: '阵', name: '阵法' },
  { view: 'auction',     glyph: '拍', name: '拍卖' },
  { view: 'achieve',     glyph: '勋', name: '成就' },
  { view: 'talent',      glyph: '赋', name: '天赋' },
  { view: 'companion',   glyph: '侣', name: '道侣' },
  { view: 'clan',        glyph: '族', name: '宗门' },
  { view: 'worldmap',    glyph: '界', name: '世界' },
];

// 默认快捷栏配置
const DEFAULT_QUICKBAR: string[] = [
  'backpack', 'map', 'cultivation',
  'technique', 'companion', 'clan',
  'talent',
];

const MAX_SLOTS = 12;  // 最大快捷栏槽位数

export class QuickbarConfig {
  private static instance: QuickbarConfig;
  private selectedViews: string[];
  private onNavigate: ((view: string) => void) | null = null;
  private openEditPanel: (() => void) | null = null;

  private constructor() {
    this.selectedViews = this.loadFromStorage();
  }

  static getInstance(): QuickbarConfig {
    if (!QuickbarConfig.instance) {
      QuickbarConfig.instance = new QuickbarConfig();
    }
    return QuickbarConfig.instance;
  }

  /** 设置导航回调（点击按钮时触发） */
  setOnNavigate(cb: (view: string) => void): void {
    this.onNavigate = cb;
  }

  /** 设置编辑面板打开回调 */
  setEditPanelOpener(cb: () => void): void {
    this.openEditPanel = cb;
  }

  /** 获取当前选中的功能列表 */
  getSelected(): IQuickbarItem[] {
    return this.selectedViews
      .map(v => ALL_QUICKBAR_ITEMS.find(item => item.view === v))
      .filter((item): item is IQuickbarItem => item !== undefined);
  }

  /** 获取所有可用功能 */
  getAllItems(): IQuickbarItem[] {
    return ALL_QUICKBAR_ITEMS;
  }

  /** 获取当前选中的 view id 列表 */
  getSelectedViews(): string[] {
    return [...this.selectedViews];
  }

  /** 最大槽位数 */
  getMaxSlots(): number {
    return MAX_SLOTS;
  }

  /** 渲染快捷栏按钮到指定容器 */
  render(container: HTMLElement): void {
    const items = this.getSelected();
    let html = '';
    for (const item of items) {
      html += `<button class="quick-btn" data-view="${item.view}"><span>${item.glyph}</span><em>${item.name}</em></button>`;
    }
    if (items.length === 0) {
      html = '<div class="quick-empty">点击右上「编」添加功能</div>';
    }
    container.innerHTML = html;
  }

  /** 渲染编辑面板内容到指定容器 */
  renderEditPanel(container: HTMLElement): void {
    const selectedSet = new Set(this.selectedViews);
    const selectedItems = this.getSelected();
    let html = `
      <div class="quickbar-edit-panel">
        <div class="quickbar-edit-title">自定快捷栏</div>
        <div class="quickbar-edit-hint">拖拽已选功能调整顺序，勾选添加/移除（最多 ${MAX_SLOTS} 项）<br/>当前已选 ${this.selectedViews.length} / ${MAX_SLOTS}</div>

        <div class="quickbar-edit-section-title">◇ 当前快捷栏（可拖拽排序）</div>
        <div class="quickbar-edit-selected" id="quickbar-edit-selected">
    `;
    if (selectedItems.length === 0) {
      html += '<div class="quickbar-edit-empty">暂无选中功能</div>';
    } else {
      for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];
        html += `
          <div class="quickbar-selected-item" draggable="true" data-view="${item.view}" data-index="${i}">
            <span class="quickbar-selected-handle">≡</span>
            <span class="quickbar-selected-glyph">${item.glyph}</span>
            <span class="quickbar-selected-name">${item.name}</span>
            <span class="quickbar-selected-remove" data-remove="${item.view}">✕</span>
          </div>
        `;
      }
    }
    html += `
        </div>

        <div class="quickbar-edit-section-title">◇ 可用功能</div>
        <div class="quickbar-edit-grid" id="quickbar-edit-grid">
    `;
    for (const item of ALL_QUICKBAR_ITEMS) {
      const selected = selectedSet.has(item.view);
      html += `
        <div class="quickbar-edit-item ${selected ? 'is-selected' : ''}" data-view="${item.view}">
          <span class="quickbar-edit-item-glyph">${item.glyph}</span>
          <span class="quickbar-edit-item-name">${item.name}</span>
          <span class="quickbar-edit-item-check">${selected ? '✓' : '○'}</span>
        </div>
      `;
    }
    html += `
        </div>
        <div class="quickbar-edit-actions">
          <button class="quickbar-edit-btn" data-action="quickbar-reset">恢复默认</button>
          <button class="quickbar-edit-btn is-primary" data-action="quickbar-save">保存</button>
        </div>
      </div>
    `;
    container.innerHTML = html;
  }

  /** 切换某功能的选中状态 */
  toggleItem(view: string): boolean {
    const idx = this.selectedViews.indexOf(view);
    if (idx >= 0) {
      this.selectedViews.splice(idx, 1);
      return false;
    } else {
      if (this.selectedViews.length >= MAX_SLOTS) {
        return false;
      }
      this.selectedViews.push(view);
      return true;
    }
  }

  /** 移动某功能到指定位置（拖拽排序） */
  moveItem(fromView: string, toIndex: number): boolean {
    const fromIdx = this.selectedViews.indexOf(fromView);
    if (fromIdx < 0) return false;
    if (toIndex < 0 || toIndex >= this.selectedViews.length) return false;
    if (fromIdx === toIndex) return true;

    const [item] = this.selectedViews.splice(fromIdx, 1);
    this.selectedViews.splice(toIndex, 0, item);
    return true;
  }

  /** 保存到 localStorage */
  save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.selectedViews));
    } catch (e) {
      // 忽略存储异常（如隐私模式）
    }
  }

  /** 恢复默认配置 */
  resetToDefault(): void {
    this.selectedViews = [...DEFAULT_QUICKBAR];
    this.save();
  }

  /** 从 localStorage 加载 */
  private loadFromStorage(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [...DEFAULT_QUICKBAR];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [...DEFAULT_QUICKBAR];
      // 过滤掉无效的 view id
      const validViews = new Set(ALL_QUICKBAR_ITEMS.map(item => item.view));
      const filtered = parsed.filter(v => validViews.has(v));
      // 去重并限制数量
      const unique = Array.from(new Set(filtered)).slice(0, MAX_SLOTS);
      return unique.length > 0 ? unique : [...DEFAULT_QUICKBAR];
    } catch (e) {
      return [...DEFAULT_QUICKBAR];
    }
  }
}
