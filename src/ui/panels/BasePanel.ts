/**
 * 面板基类
 * 所有 UI 面板都继承此类，统一生命周期和布局响应
 */

import { eventBus, GameEvents } from '../../infrastructure/event/EventBus';
import { LayoutType } from '../../application/services/UIService';

export abstract class BasePanel {
  protected container: HTMLElement;
  protected panelId: string;
  protected layout: LayoutType = 'desktop';
  protected visible: boolean = true;
  protected subscriptions: (() => void)[] = [];

  constructor(container: HTMLElement, panelId: string) {
    this.container = container;
    this.panelId = panelId;
    this.container.dataset.panelId = panelId;

    this.bindEvents();
  }

  /**
   * 绑定事件监听
   */
  protected bindEvents(): void {
    const unsub = eventBus.on<LayoutType>(GameEvents.LAYOUT_CHANGED, (layout) => {
      this.layout = layout;
      this.onLayoutChange(layout);
    });
    this.subscriptions.push(unsub);
  }

  /**
   * 子类实现：布局变化时调整显示
   */
  protected abstract onLayoutChange(layout: LayoutType): void;

  /**
   * 子类实现：渲染数据
   */
  abstract render(data: unknown): void;

  /**
   * 显示面板
   */
  show(): void {
    this.visible = true;
    this.container.classList.remove('panel-hidden');
    this.container.classList.add('panel-visible');
  }

  /**
   * 隐藏面板
   */
  hide(): void {
    this.visible = false;
    this.container.classList.remove('panel-visible');
    this.container.classList.add('panel-hidden');
  }

  /**
   * 切换显示
   */
  toggle(): void {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * 是否可见
   */
  isVisible(): boolean {
    return this.visible;
  }

  /**
   * 销毁面板，清理事件监听
   */
  destroy(): void {
    this.subscriptions.forEach(unsub => unsub());
    this.subscriptions = [];
  }
}
