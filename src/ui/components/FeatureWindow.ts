import { BaseComponent } from './BaseComponent';

export class FeatureWindow extends BaseComponent {
  private titleElement: HTMLElement | null;
  private bodyElement: HTMLElement | null;
  private closeButton: HTMLElement | null;
  private overlay: HTMLElement | null;
  private contentRenderer: ((container: HTMLElement) => void) | null;

  constructor(element: HTMLElement) {
    super(element);
    this.titleElement = element.querySelector('.feature-window-title');
    this.bodyElement = element.querySelector('.feature-window-body');
    this.closeButton = element.querySelector('.feature-window-close');
    this.overlay = null;
    this.contentRenderer = null;

    this.bindEvents();
  }

  private bindEvents(): void {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.close());
    }
  }

  setTitle(title: string): void {
    if (this.titleElement) {
      this.titleElement.textContent = title;
    }
  }

  setContentRenderer(renderer: (container: HTMLElement) => void): void {
    this.contentRenderer = renderer;
  }

  renderContent(): void {
    if (this.bodyElement && this.contentRenderer) {
      this.contentRenderer(this.bodyElement);
    }
  }

  open(): void {
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'feature-window-overlay';
      this.overlay.addEventListener('click', () => this.close());
      document.body.appendChild(this.overlay);
    }
    this.element.classList.remove('hidden');
    this.renderContent();
  }

  close(): void {
    this.element.classList.add('hidden');
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }

  isVisible(): boolean {
    return !this.element.classList.contains('hidden');
  }

  render(data?: any): void {
    if (data) {
      if (data.title) this.setTitle(data.title);
      if (data.content) this.renderContent();
    }
  }
}