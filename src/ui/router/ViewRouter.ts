/**
 * 视图路由
 * 管理主界面各功能视图的切换（桌面端叠加、移动端全屏）
 */

import { eventBus, GameEvents } from '../../infrastructure/event/EventBus';

export type ViewName =
  | 'main'
  | 'backpack'
  | 'equipment'
  | 'map'
  | 'technique'
  | 'cultivation'
  | 'companion'
  | 'clan'
  | 'cave'
  | 'settings'
  | 'help';

export interface IView {
  name: ViewName;
  element: HTMLElement;
}

export class ViewRouter {
  private views: Map<ViewName, IView> = new Map();
  private viewStack: ViewName[] = ['main'];
  private rootEl: HTMLElement;

  constructor(rootEl: HTMLElement) {
    this.rootEl = rootEl;
    this.bindEvents();
  }

  /**
   * 注册视图
   */
  register(view: IView): void {
    this.views.set(view.name, view);
  }

  /**
   * 切换视图
   */
  switch(viewName: ViewName, push: boolean = true): void {
    const current = this.getCurrentView();
    if (current === viewName) return;

    this.hideView(current);
    this.showView(viewName);

    if (push) {
      this.viewStack.push(viewName);
    } else {
      this.viewStack[this.viewStack.length - 1] = viewName;
    }

    eventBus.emit(GameEvents.VIEW_SWITCH, { from: current, to: viewName });
  }

  /**
   * 返回上一个视图
   */
  back(): void {
    if (this.viewStack.length <= 1) return;

    const current = this.viewStack.pop()!;
    const previous = this.viewStack[this.viewStack.length - 1];

    this.hideView(current);
    this.showView(previous);

    eventBus.emit(GameEvents.VIEW_BACK, { from: current, to: previous });
  }

  /**
   * 获取当前视图
   */
  getCurrentView(): ViewName {
    return this.viewStack[this.viewStack.length - 1];
  }

  /**
   * 判断指定视图是否为主视图
   */
  isMainView(): boolean {
    return this.getCurrentView() === 'main';
  }

  /**
   * 绑定系统事件
   */
  private bindEvents(): void {
    // 安卓端返回键支持
    if (window.history && window.history.pushState) {
      window.addEventListener('popstate', () => {
        if (!this.isMainView()) {
          this.back();
          // 阻止默认返回行为
          window.history.pushState(null, '', window.location.href);
        }
      });
    }
  }

  /**
   * 显示视图
   */
  private showView(viewName: ViewName): void {
    const view = this.views.get(viewName);
    if (view) {
      view.element.classList.add('view-active');
      view.element.classList.remove('view-hidden');
    }
    this.rootEl.classList.add(`active-view-${viewName}`);
  }

  /**
   * 隐藏视图
   */
  private hideView(viewName: ViewName): void {
    const view = this.views.get(viewName);
    if (view) {
      view.element.classList.remove('view-active');
      view.element.classList.add('view-hidden');
    }
    this.rootEl.classList.remove(`active-view-${viewName}`);
  }
}
