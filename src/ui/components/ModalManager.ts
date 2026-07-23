export interface IModalOptions {
  width?: string;
  height?: string;
  onClose?: () => void;
  eventHandlers?: Record<string, (e: Event) => void>;
}

export class ModalManager {
  private container: HTMLElement;
  private currentModal: HTMLElement | null = null;
  private onCloseCallback: (() => void) | null = null;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Modal container ${containerId} not found`);
    this.container = el;
  }

  private createOverlay(title: string, contentEl: HTMLElement, options?: IModalOptions): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const card = document.createElement('div');
    card.className = 'modal-card';
    if (options?.width) card.style.setProperty('--modal-width', options.width);
    if (options?.height) card.style.setProperty('--modal-height', options.height);

    const header = document.createElement('div');
    header.className = 'modal-header';

    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    header.appendChild(titleSpan);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });
    header.appendChild(closeBtn);

    const body = document.createElement('div');
    body.className = 'modal-body';
    body.appendChild(contentEl);

    card.appendChild(header);
    card.appendChild(body);
    overlay.appendChild(card);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });

    if (options?.eventHandlers) {
      for (const [selector, handler] of Object.entries(options.eventHandlers)) {
        overlay.addEventListener('click', (e) => {
          const target = (e.target as HTMLElement).closest(selector);
          if (target) {
            e.stopPropagation();
            handler(e);
          }
        });
      }
    }

    return overlay;
  }

  public show(title: string, content: string, options?: IModalOptions): void {
    this.close();

    const contentEl = document.createElement('div');
    contentEl.innerHTML = content;

    const overlay = this.createOverlay(title, contentEl, options);
    this.container.appendChild(overlay);

    this.currentModal = overlay;
    this.onCloseCallback = options?.onClose || null;
  }

  public showHTML(title: string, htmlElement: HTMLElement, options?: IModalOptions): void {
    this.close();

    const overlay = this.createOverlay(title, htmlElement, options);
    this.container.appendChild(overlay);

    this.currentModal = overlay;
    this.onCloseCallback = options?.onClose || null;
  }

  public showInteractive(title: string, buildContent: (container: HTMLElement) => void, options?: IModalOptions): void {
    this.close();

    const contentEl = document.createElement('div');
    contentEl.className = 'modal-interactive-content';
    buildContent(contentEl);

    const overlay = this.createOverlay(title, contentEl, options);
    this.container.appendChild(overlay);

    this.currentModal = overlay;
    this.onCloseCallback = options?.onClose || null;
  }

  public close(): void {
    if (this.currentModal) {
      this.currentModal.remove();
      this.currentModal = null;
      if (this.onCloseCallback) {
        this.onCloseCallback();
        this.onCloseCallback = null;
      }
    }
  }

  public isOpen(): boolean {
    return this.currentModal !== null;
  }
}
