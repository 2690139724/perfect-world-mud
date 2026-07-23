/**
 * 叙事流组件
 * 重写为简洁卡片式布局
 */

export interface LogEntry {
  id: number;
  type: 'line' | 'card' | 'choice' | 'npc-list' | 'room-details' | 'clickable-list' | 'welcome' | 'heading';
  content: string;
  className?: string;
  html?: string;
  cardType?: string;
  cardRows?: { key: string; val: string }[];
}

const HEADING_KEYWORDS = ['【欢迎】', '【提示】', '【剧情】', '【提示：'];

export class NarrativeStream {
  private container: HTMLElement;
  private scrollEl: HTMLElement;
  private content: HTMLElement;

  private logs: LogEntry[] = [];
  private maxLogs: number = 800;

  private inCard: boolean = false;
  private cardType: string = '';

  private autoScrollEnabled: boolean = true;
  private userScrolled: boolean = false;

  private nextId: number = 1;

  constructor(container: HTMLElement) {
    this.container = container;
    this.scrollEl = this.findScrollEl(container);
    this.content = this.findContentEl(container);

    this.bindScroll();
  }

  private findScrollEl(container: HTMLElement): HTMLElement {
    return container.closest('.narrative-viewport') as HTMLElement
      || container.closest('.narrative-stream-wrap') as HTMLElement
      || container;
  }

  private findContentEl(container: HTMLElement): HTMLElement {
    if (container.classList.contains('narrative-stream')) return container;
    return container.querySelector('.narrative-stream') as HTMLElement || container;
  }

  private bindScroll(): void {
    this.scrollEl.addEventListener('scroll', () => {
      const isAtBottom = this.scrollEl.scrollTop + this.scrollEl.clientHeight >= this.scrollEl.scrollHeight - 30;
      this.userScrolled = !isAtBottom;
    });
  }

  private addLog(log: Omit<LogEntry, 'id'>): LogEntry {
    const entry: LogEntry = { ...log, id: this.nextId++ };
    this.logs.push(entry);

    while (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    this.renderEntry(entry);
    if (this.autoScrollEnabled && !this.userScrolled) {
      this.scrollToBottom();
    }
    return entry;
  }

  private renderEntry(entry: LogEntry): void {
    const el = this.createLogElement(entry);
    if (!el) return;
    this.content.appendChild(el);
  }

  private createLogElement(log: LogEntry): HTMLElement | null {
    switch (log.type) {
      case 'line': {
        const el = document.createElement('div');
        el.className = `narrative-line ${log.className || ''}`;
        el.innerHTML = log.html || this.escapeHtml(log.content);
        return el;
      }
      case 'heading': {
        const el = document.createElement('div');
        el.className = `narrative-heading ${log.className || ''}`;
        el.textContent = log.content;
        return el;
      }
      case 'card': {
        const el = document.createElement('div');
        el.className = `narrative-card card-${log.cardType || 'system'}`;
        if (log.content) {
          const titleEl = document.createElement('div');
          titleEl.className = 'narrative-card-title';
          titleEl.textContent = `◆ ${log.content}`;
          el.appendChild(titleEl);
        }
        if (log.cardRows) {
          const rowsEl = document.createElement('div');
          rowsEl.className = 'narrative-card-rows';
          log.cardRows.forEach(row => {
            const rowEl = document.createElement('div');
            rowEl.className = 'narrative-card-row';
            if (row.key) {
              rowEl.innerHTML = `<span class="narrative-card-key">${this.escapeHtml(row.key)}</span><span class="narrative-card-val">${row.val}</span>`;
            } else {
              rowEl.innerHTML = `<span class="narrative-card-val">${row.val}</span>`;
            }
            rowsEl.appendChild(rowEl);
          });
          el.appendChild(rowsEl);
        }
        return el;
      }
      case 'choice': {
        const el = document.createElement('div');
        el.className = 'narrative-choice';
        el.innerHTML = log.html || '';
        return el;
      }
      case 'npc-list': {
        const el = document.createElement('div');
        el.className = 'narrative-npc-list';
        el.innerHTML = log.html || '';
        return el;
      }
      case 'room-details': {
        const el = document.createElement('div');
        el.className = 'narrative-details';
        el.innerHTML = log.html || '';
        return el;
      }
      case 'clickable-list': {
        const el = document.createElement('div');
        el.className = 'narrative-clickable';
        el.innerHTML = log.html || '';
        return el;
      }
      case 'welcome': {
        const el = document.createElement('div');
        el.className = 'narrative-welcome';
        el.innerHTML = log.html || '';
        return el;
      }
    }
    return null;
  }

  public push(text: string): void {
    if (!text) return;

    if (text.startsWith('[CARD:')) {
      this.inCard = true;
      const match = text.match(/\[CARD:(\w+)\](.*)/);
      this.cardType = match ? match[1] : 'system';
      const title = match ? match[2] : '';
      this.addLog({
        type: 'card',
        content: title,
        cardType: this.cardType,
        cardRows: []
      });
      return;
    }

    if (text === '[/CARD]') {
      this.inCard = false;
      this.cardType = '';
      return;
    }

    if (this.inCard) {
      const lastLog = this.logs[this.logs.length - 1];
      if (lastLog && lastLog.type === 'card') {
        if (!lastLog.cardRows) lastLog.cardRows = [];

        if (text.startsWith('[R]')) {
          const rowContent = text.substring(3);
          const colonIdx = rowContent.indexOf(':');
          if (colonIdx > 0) {
            const key = rowContent.substring(0, colonIdx).trim();
            const val = rowContent.substring(colonIdx + 1).trim();
            lastLog.cardRows.push({ key, val: this.formatCardValue(val) });
          } else {
            lastLog.cardRows.push({ key: '', val: this.formatCardValue(rowContent) });
          }
        } else if (text.trim()) {
          lastLog.cardRows.push({ key: '', val: this.formatCardValue(text.trim()) });
        }

        this.reRenderLastCard(lastLog);
        if (this.autoScrollEnabled && !this.userScrolled) {
          this.scrollToBottom();
        }
      }
      return;
    }

    if (HEADING_KEYWORDS.some(kw => text.startsWith(kw))) {
      const content = text.replace(/【[^】]+】/g, '').trim();
      if (content) {
        this.addLog({ type: 'heading', content });
      }
      return;
    }

    const html = this.formatText(text);
    const className = this.detectLogClass(text);
    this.addLog({ type: 'line', content: text, html, className });
  }

  private reRenderLastCard(card: LogEntry): void {
    const cards = this.content.querySelectorAll('.narrative-card');
    const last = cards[cards.length - 1];
    if (!last) return;

    let rowsEl = last.querySelector('.narrative-card-rows') as HTMLElement;
    if (!rowsEl) {
      rowsEl = document.createElement('div');
      rowsEl.className = 'narrative-card-rows';
      last.appendChild(rowsEl);
    }
    rowsEl.innerHTML = '';
    if (card.cardRows) {
      card.cardRows.forEach(row => {
        const rowEl = document.createElement('div');
        rowEl.className = 'narrative-card-row';
        if (row.key) {
          rowEl.innerHTML = `<span class="narrative-card-key">${this.escapeHtml(row.key)}</span><span class="narrative-card-val">${row.val}</span>`;
        } else {
          rowEl.innerHTML = `<span class="narrative-card-val">${row.val}</span>`;
        }
        rowsEl.appendChild(rowEl);
      });
    }
  }

  private detectLogClass(text: string): string {
    if (text.includes('突破') || text.includes('晋升') || text.includes('晋级')) return 'narrative-line-realm';
    if (text.includes('获得') && (text.includes('修为') || text.includes('灵石') || text.includes('铜币'))) return 'narrative-line-gain';
    if (text.includes('伤害') || text.includes('受到') || text.includes('战败') || text.includes('击杀')) return 'narrative-line-combat';
    if (text.includes('【') && text.includes('】')) return 'narrative-line-system';
    if (text.startsWith('「') || text.includes('说道')) return 'narrative-line-npc';
    if (text.startsWith('◆') || text.startsWith('◇')) return 'narrative-line-action';
    return 'narrative-line-narrative';
  }

  public pushBatch(lines: string[]): void {
    for (const line of lines) this.push(line);
  }

  public pushChoices(options: { label: string; action: string }[]): void {
    const lines = options.map(opt => {
      return `<span class="narrative-choice-item" data-action="${this.escapeHtml(opt.action)}">${this.escapeHtml(opt.label)}</span>`;
    });
    const html = lines.join(' ◇ ');
    this.addLog({ type: 'choice', content: '', html });
  }

  public pushNPCList(npcs: { id: string; title: string; name: string; index: number }[]): void {
    if (npcs.length === 0) return;
    const namesSpan = npcs.map(npc => {
      return `<span class="npc-link" data-npc-idx="${npc.index}" data-npc-id="${this.escapeHtml(npc.id)}">${this.escapeHtml(npc.title)}${this.escapeHtml(npc.name)}</span>`;
    }).join('、');
    const html = `此处有：${namesSpan}`;
    this.addLog({ type: 'npc-list', content: '', html });
  }

  public pushRoomDetails(details: any[], roomDesc?: string): void {
    const interactable = details.filter((d: any) => d.interactable && !d.explored);
    const secrets = details.filter((d: any) => d.type === 'secret' && !d.explored);
    const lore = details.filter((d: any) => d.type === 'lore');

    let html = '';
    if (lore.length > 0) {
      html += '<div class="narrative-details-section"><span class="narrative-details-label">◇ 传说</span><div class="narrative-details-items">';
      html += lore.map((d: any) => `<span class="narrative-detail-item" data-detail-id="${this.escapeHtml(d.id)}">${this.escapeHtml(d.name)}</span>`).join('、');
      html += '</div></div>';
    }
    if (interactable.length > 0) {
      html += '<div class="narrative-details-section"><span class="narrative-details-label">◇ 可交互</span><div class="narrative-details-items">';
      html += interactable.map((d: any) => `<span class="narrative-detail-item" data-detail-id="${this.escapeHtml(d.id)}">${this.escapeHtml(d.name)}</span>`).join('、');
      html += '</div></div>';
    }
    if (secrets.length > 0) {
      html += '<div class="narrative-details-section"><span class="narrative-details-label">◇ 隐秘</span><div class="narrative-details-items">';
      html += secrets.map((d: any) => `<span class="narrative-detail-item" data-detail-id="${this.escapeHtml(d.id)}">${this.escapeHtml(d.name)}</span>`).join('、');
      html += '</div></div>';
    }
    if (roomDesc) {
      html += `<div class="narrative-details-section"><span class="narrative-details-label">◇ 环境</span><div class="narrative-details-desc">${this.escapeHtml(roomDesc)}</div></div>`;
    }
    if (!html) return;
    this.addLog({ type: 'room-details', content: '', html });
  }

  public pushClickableList(title: string, items: { label: string; action: string; desc?: string; disabled?: boolean }[]): void {
    let html = `<div class="narrative-clickable-title">◆ ${this.escapeHtml(title)}</div>`;
    if (items.length === 0) {
      html += '<div class="narrative-clickable-empty">暂无内容</div>';
    } else {
      html += '<div class="narrative-clickable-items">';
      items.forEach(item => {
        const cls = item.disabled ? 'narrative-clickable-item is-disabled' : 'narrative-clickable-item';
        const actionAttr = item.disabled ? '' : ` data-action="${this.escapeHtml(item.action)}"`;
        const descAttr = item.desc ? ` title="${this.escapeHtml(item.desc)}"` : '';
        html += `<span class="${cls}"${actionAttr}${descAttr}>${this.escapeHtml(item.label)}</span>`;
      });
      html += '</div>';
    }
    this.addLog({ type: 'clickable-list', content: '', html });
  }

  private formatText(text: string): string {
    const escaped = this.escapeHtml(text);
    return escaped
      .replace(/\*\*([^*]+)\*\*/g, '<span class="narrative-special">$1</span>')
      .replace(/【([^】]+)】/g, '<span class="narrative-tag">【$1】</span>')
      .replace(/《([^》]+)》/g, '<span class="narrative-book">《$1》</span>')
      .replace(/(\d+)\/(\d+)/g, '<span class="narrative-num">$1/$2</span>')
      .replace(/(\d+(\.\d+)?)%/g, '<span class="narrative-num">$1%</span>');
  }

  private formatCardValue(val: string): string {
    return this.escapeHtml(val)
      .replace(/(\d+)/g, '<span class="narrative-num">$1</span>')
      .replace(/(搬血|洞天|化灵|铭纹|列阵|尊者|神火|真一|祭道|神境|虚道|斩我|遁一|至尊|真仙)/g, '<span class="narrative-realm">$1</span>');
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  public scrollToBottom(): void {
    requestAnimationFrame(() => {
      if (this.scrollEl) this.scrollEl.scrollTop = this.scrollEl.scrollHeight;
    });
  }

  public clear(): void {
    this.logs = [];
    this.inCard = false;
    this.cardType = '';
    this.content.innerHTML = '';
  }

  public getLogCount(): number {
    return this.logs.length;
  }
}
