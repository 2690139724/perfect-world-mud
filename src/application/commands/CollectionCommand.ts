import { ICommandHandler, ICommandContext } from './CommandRouter';
import { ADVENTURES, AdventureType, AdventureRarity } from '../../domain/entities/Adventure';
import { MOUNTS, MountTier } from '../../domain/entities/Mount';
import { TALENTS, TalentTier, TalentType } from '../../domain/entities/Talent';
import { LAW_DEFINITIONS, LawType } from '../../domain/entities/Law';
import { getQualityStars, getQualityStyle } from '../../domain/utils/QualityUtils';

export class CollectionCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['collection', '图鉴', '查看图鉴', '怪物图鉴', '物品图鉴'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;

    if (action === 'collection' || action === '图鉴') {
      this.showCollectionMenu(store, narrative, modalManager, context);
    } else if (action === '查看图鉴') {
      this.showCollectionMenu(store, narrative, modalManager, context);
    } else if (action === '怪物图鉴') {
      this.showMonsterCollection(store, narrative, modalManager);
    } else if (action === '物品图鉴') {
      this.showItemCollection(store, narrative, modalManager);
    }
  }

  private showCollectionMenu(store: any, narrative: any, modalManager: any, context?: ICommandContext): void {
    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【图鉴系统】' });
      narrative.pushClickableList('图鉴分类', [
        { label: '奇遇图鉴', action: '奇遇图鉴', desc: '查看所有奇遇事件' },
        { label: '坐骑图鉴', action: '坐骑图鉴', desc: '查看所有坐骑' },
        { label: '天赋图鉴', action: '天赋图鉴', desc: '查看所有天赋' },
        { label: '法则图鉴', action: '法则图鉴', desc: '查看所有法则' },
        { label: '怪物图鉴', action: '怪物图鉴', desc: '查看已击败的怪物' },
        { label: '物品图鉴', action: '物品图鉴', desc: '查看已收集的物品' },
      ]);
      return;
    }

    modalManager.showInteractive('图鉴系统', (container: HTMLElement) => {
      const categories = [
        { icon: '🌟', name: '奇遇图鉴', action: '奇遇图鉴', desc: `${this.getAdventureProgress(store)}/${ADVENTURES.length} 已发现` },
        { icon: '🐴', name: '坐骑图鉴', action: '坐骑图鉴', desc: `${this.getMountProgress(store)}/${MOUNTS.length} 已拥有` },
        { icon: '⭐', name: '天赋图鉴', action: '天赋图鉴', desc: `${this.getTalentProgress(store)}/${TALENTS.length} 已觉醒` },
        { icon: '⚡', name: '法则图鉴', action: '法则图鉴', desc: `${this.getLawProgress(store)}/${LAW_DEFINITIONS.length} 已领悟` },
        { icon: '👹', name: '怪物图鉴', action: '怪物图鉴', desc: '已击败的怪物' },
        { icon: '📦', name: '物品图鉴', action: '物品图鉴', desc: '已收集的物品' },
      ];

      const categoryGrid = document.createElement('div');
      categoryGrid.className = 'collection-grid';

      for (const cat of categories) {
        const catCard = document.createElement('div');
        catCard.className = 'collection-card';
        catCard.innerHTML = `
          <div class="collection-icon">${cat.icon}</div>
          <div class="collection-info">
            <div class="collection-name">${cat.name}</div>
            <div class="collection-desc">${cat.desc}</div>
          </div>
        `;

        catCard.addEventListener('click', () => {
          modalManager.close();
          if (context) {
            this.execute(cat.action, [], context);
          }
        });

        categoryGrid.appendChild(catCard);
      }

      container.appendChild(categoryGrid);
    }, { width: '600px', height: '450px' });
  }

  private getAdventureProgress(store: any): number {
    const player = store.getState().player;
    const encounteredIds = player.encounteredAdventures || [];
    return encounteredIds.length;
  }

  private getMountProgress(store: any): number {
    const player = store.getState().player;
    const mounts = player.mounts || [];
    return mounts.length;
  }

  private getTalentProgress(store: any): number {
    const player = store.getState().player;
    const talents = player.talentIds || [];
    return talents.length;
  }

  private getLawProgress(store: any): number {
    const player = store.getState().player;
    const laws = player.laws || [];
    return laws.length;
  }

  private showMonsterCollection(store: any, narrative: any, modalManager: any): void {
    const player = store.getState().player;
    const killedMonsters = player.killedMonsters || [];

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【怪物图鉴】' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `已击败怪物：${killedMonsters.length}种` });

      if (killedMonsters.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '还没有击败过任何怪物！' });
        return;
      }

      const monsterItems = killedMonsters.map((monster: string) => ({
        label: monster,
        action: '',
        desc: '已击败',
        disabled: true,
      }));

      narrative.pushClickableList('已击败怪物', monsterItems);
      return;
    }

    modalManager.showInteractive('怪物图鉴', (container: HTMLElement) => {
      const statsHeader = document.createElement('div');
      statsHeader.className = 'collection-stats';
      statsHeader.innerHTML = `<div>已击败怪物：${killedMonsters.length}种</div>`;
      container.appendChild(statsHeader);

      if (killedMonsters.length === 0) {
        container.innerHTML += '<div class="modal-empty">还没有击败过任何怪物！</div>';
        return;
      }

      const monsterGrid = document.createElement('div');
      monsterGrid.className = 'monster-grid';

      for (const monster of killedMonsters) {
        const monsterCard = document.createElement('div');
        monsterCard.className = 'monster-card';
        monsterCard.innerHTML = `
          <div class="monster-icon">👹</div>
          <div class="monster-info">
            <div class="monster-name">${monster}</div>
            <div class="monster-status">已击败</div>
          </div>
        `;
        monsterGrid.appendChild(monsterCard);
      }

      container.appendChild(monsterGrid);
    }, { width: '600px', height: '450px' });
  }

  private showItemCollection(store: any, narrative: any, modalManager: any): void {
    const player = store.getState().player;
    const inventory = player.inventory || [];
    const uniqueItems: any[] = [...new Map(inventory.map((item: any) => [item.id, item])).values()];

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【物品图鉴】' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `已收集物品：${uniqueItems.length}种` });

      if (uniqueItems.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '背包是空的！' });
        return;
      }

      const itemItems = uniqueItems.map((item: any) => ({
        label: `${item.name}（${item.quality || '普通'}）`,
        action: '',
        desc: item.desc || '',
        disabled: true,
      }));

      narrative.pushClickableList('背包物品', itemItems);
      return;
    }

    modalManager.showInteractive('物品图鉴', (container: HTMLElement) => {
      const statsHeader = document.createElement('div');
      statsHeader.className = 'collection-stats';
      statsHeader.innerHTML = `<div>已收集物品：${uniqueItems.length}种</div>`;
      container.appendChild(statsHeader);

      if (uniqueItems.length === 0) {
        container.innerHTML += '<div class="modal-empty">背包是空的！</div>';
        return;
      }

      const itemGrid = document.createElement('div');
      itemGrid.className = 'item-grid';

      for (const item of uniqueItems) {
        const qualityStyle = getQualityStyle(item.quality);
        const qualityStars = getQualityStars(item.quality);
        
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.style.borderColor = qualityStyle.color;
        itemCard.style.backgroundColor = qualityStyle.backgroundColor;
        itemCard.innerHTML = `
          <div class="item-quality" style="color: ${qualityStyle.color}">${qualityStars}</div>
          <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-quality-text">${item.quality || '普通'}</div>
            <div class="item-desc">${item.desc || '无描述'}</div>
          </div>
        `;
        itemGrid.appendChild(itemCard);
      }

      container.appendChild(itemGrid);
    }, { width: '600px', height: '450px' });
  }
}