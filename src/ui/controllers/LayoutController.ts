/**
 * 布局控制器
 * 根据设备信息切换桌面/平板/移动端布局
 */

import { deviceManager, IDeviceInfo } from '../../infrastructure/device/DeviceManager';
import { eventBus, GameEvents } from '../../infrastructure/event/EventBus';
import { LayoutType, UIService } from '../../application/services/UIService';

export class LayoutController {
  private rootEl: HTMLElement;
  private uiService: UIService;
  private currentLayout: LayoutType = 'desktop';
  private unsubscribe: (() => void) | null = null;

  constructor(rootEl: HTMLElement, uiService: UIService) {
    this.rootEl = rootEl;
    this.uiService = uiService;

    this.init();
  }

  /**
   * 初始化布局检测
   */
  private init(): void {
    const info = deviceManager.getInfo();
    this.applyLayout(this.resolveLayout(info));

    this.unsubscribe = deviceManager.subscribe((info) => {
      this.applyLayout(this.resolveLayout(info));
    });
  }

  /**
   * 根据设备信息解析布局类型
   */
  private resolveLayout(info: IDeviceInfo): LayoutType {
    const width = info.screenWidth;

    if (info.isMobile || width < 768) {
      return 'mobile';
    }
    if (width < 1200) {
      return 'tablet';
    }
    return 'desktop';
  }

  /**
   * 应用布局
   */
  private applyLayout(layout: LayoutType): void {
    if (this.currentLayout === layout) return;
    this.currentLayout = layout;

    // 移除旧布局类
    this.rootEl.classList.remove('layout-desktop', 'layout-tablet', 'layout-mobile');
    // 添加新布局类
    this.rootEl.classList.add(`layout-${layout}`);

    // 通知 UI Service
    this.uiService.setLayout(layout);

    // 广播布局变化事件
    eventBus.emit(GameEvents.LAYOUT_CHANGED, layout);
  }

  /**
   * 获取当前布局
   */
  getCurrentLayout(): LayoutType {
    return this.currentLayout;
  }

  /**
   * 销毁
   */
  destroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
}
