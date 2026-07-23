/**
 * 浮动提示系统（Toast Notifications）
 * 用于显示即时反馈、成就、警告等短暂信息
 *
 * 样式抽离至 styles/components/toast.css
 * 层级 z-index:3000（参见层级规范）
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'achievement';

export interface IToastOptions {
  type?: ToastType;
  duration?: number;
  icon?: string;
  onClick?: () => void;
}

interface IToastTitles {
  success: string;
  error: string;
  warning: string;
  info: string;
  achievement: string;
}

/** 仙侠化标题 —— 替代现代"成功/错误/警告/提示" */
const TITLES: IToastTitles = {
  success: '功成',
  error: '道损',
  warning: '警示',
  info: '传音',
  achievement: '机缘',
};

const ICONS: Record<ToastType, string> = {
  success: '✓',
  error: '✗',
  warning: '!',
  info: '記',
  achievement: '緣',
};

export class ToastManager {
  private static instance: ToastManager;
  private container: HTMLElement | null = null;
  private queue: { message: string; options: IToastOptions }[] = [];
  private isShowing: boolean = false;

  private constructor() {
    this.createContainer();
  }

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  private createContainer(): void {
    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    document.body.appendChild(this.container);
  }

  show(message: string, options: IToastOptions = {}): void {
    this.queue.push({ message, options });
    if (!this.isShowing) {
      this.processQueue();
    }
  }

  private processQueue(): void {
    if (this.queue.length === 0) {
      this.isShowing = false;
      return;
    }

    this.isShowing = true;
    const { message, options } = this.queue.shift()!;
    this.showToast(message, options);
  }

  private showToast(message: string, options: IToastOptions): void {
    const type = options.type || 'info';
    const duration = options.duration || 3000;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconEl = document.createElement('div');
    iconEl.className = 'toast-icon';
    iconEl.textContent = options.icon || ICONS[type];

    const contentEl = document.createElement('div');
    contentEl.className = 'toast-content';

    const titleEl = document.createElement('div');
    titleEl.className = 'toast-title';
    titleEl.textContent = TITLES[type];

    const msgEl = document.createElement('div');
    msgEl.className = 'toast-message';
    msgEl.textContent = message;

    contentEl.appendChild(titleEl);
    contentEl.appendChild(msgEl);
    toast.appendChild(iconEl);
    toast.appendChild(contentEl);

    if (options.onClick) {
      toast.classList.add('toast-clickable');
      toast.onclick = () => {
        options.onClick!();
        this.removeToast(toast);
      };
    }

    this.container?.appendChild(toast);

    // 自动移除
    setTimeout(() => {
      this.removeToast(toast);
    }, duration);
  }

  private removeToast(toast: HTMLElement): void {
    if (toast.classList.contains('removing')) return;
    toast.classList.add('removing');
    setTimeout(() => {
      toast.remove();
      this.processQueue();
    }, 300);
  }

  // 快捷方法
  success(message: string): void {
    this.show(message, { type: 'success' });
  }

  error(message: string): void {
    this.show(message, { type: 'error', duration: 4000 });
  }

  warning(message: string): void {
    this.show(message, { type: 'warning' });
  }

  info(message: string): void {
    this.show(message, { type: 'info' });
  }

  achievement(message: string): void {
    this.show(message, { type: 'achievement', duration: 5000 });
  }
}
