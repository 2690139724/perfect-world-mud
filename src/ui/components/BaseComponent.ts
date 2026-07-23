export abstract class BaseComponent {
  protected element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  show(): void {
    this.element.classList.remove('hidden');
  }

  hide(): void {
    this.element.classList.add('hidden');
  }

  isVisible(): boolean {
    return !this.element.classList.contains('hidden');
  }

  destroy(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  abstract render(data?: any): void;
}