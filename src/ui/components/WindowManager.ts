import { FeatureWindow } from './FeatureWindow';

export interface WindowConfig {
  id: string;
  title: string;
  width?: number;
  height?: number;
  renderer: (container: HTMLElement) => void;
}

export class WindowManager {
  private configs: Map<string, WindowConfig> = new Map();
  private activeWindow: string | null = null;
  private featureWindow: FeatureWindow | null = null;

  constructor() {
    const element = document.getElementById('feature-window');
    if (element) {
      this.featureWindow = new FeatureWindow(element as HTMLElement);
    }
  }

  registerWindow(config: WindowConfig): void {
    this.configs.set(config.id, config);
  }

  openWindow(windowId: string): void {
    const config = this.configs.get(windowId);
    if (!config || !this.featureWindow) {
      console.warn(`Window not registered: ${windowId}`);
      return;
    }

    if (this.activeWindow === windowId && this.featureWindow.isVisible()) {
      this.closeWindow(windowId);
      return;
    }

    this.featureWindow.setTitle(config.title);
    this.featureWindow.setContentRenderer(config.renderer);
    this.featureWindow.open();
    this.activeWindow = windowId;
  }

  closeWindow(windowId?: string): void {
    if (this.featureWindow && (!windowId || this.activeWindow === windowId)) {
      this.featureWindow.close();
      this.activeWindow = null;
    }
  }

  closeAll(): void {
    if (this.featureWindow) {
      this.featureWindow.close();
    }
    this.activeWindow = null;
  }

  isOpen(windowId: string): boolean {
    return this.activeWindow === windowId && this.featureWindow ? this.featureWindow.isVisible() : false;
  }

  getWindow(windowId: string): FeatureWindow | undefined {
    return this.featureWindow || undefined;
  }

  refreshActiveWindow(): void {
    if (this.featureWindow && this.activeWindow && this.featureWindow.isVisible()) {
      this.featureWindow.renderContent();
    }
  }
}
