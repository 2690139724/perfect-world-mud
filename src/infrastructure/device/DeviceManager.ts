/**
 * 设备检测管理器
 * 检测平台类型、屏幕尺寸、输入方式等
 */

export type PlatformType = 'desktop' | 'android' | 'ios' | 'web';

export interface IDeviceInfo {
  platform: PlatformType;
  isMobile: boolean;
  isTouch: boolean;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
}

export class DeviceManager {
  private info: IDeviceInfo;
  private listeners: Set<(info: IDeviceInfo) => void> = new Set();

  constructor() {
    this.info = this.detect();
    this.bindResize();
  }

  /**
   * 获取当前设备信息
   */
  getInfo(): IDeviceInfo {
    return { ...this.info };
  }

  /**
   * 监听设备信息变化
   */
  subscribe(callback: (info: IDeviceInfo) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * 检测平台
   */
  private detect(): IDeviceInfo {
    const ua = navigator.userAgent.toLowerCase();
    const width = window.innerWidth;
    const height = window.innerHeight;

    let platform: PlatformType = 'desktop';

    if (/android/.test(ua)) {
      platform = 'android';
    } else if (/iphone|ipad|ipod/.test(ua)) {
      platform = 'ios';
    } else if (!window.require && !/electron/.test(ua)) {
      platform = 'web';
    }

    const isMobile = platform === 'android' || platform === 'ios';

    return {
      platform,
      isMobile,
      isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      screenWidth: width,
      screenHeight: height,
      pixelRatio: window.devicePixelRatio || 1,
    };
  }

  /**
   * 绑定窗口大小变化
   */
  private bindResize(): void {
    let resizeTimer: number | null = null;

    window.addEventListener('resize', () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(() => {
        this.info = this.detect();
        this.listeners.forEach(cb => cb(this.info));
      }, 150);
    });
  }
}

export const deviceManager = new DeviceManager();
