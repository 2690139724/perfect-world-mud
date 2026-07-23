import { ICommandHandler, ICommandContext } from './CommandRouter';
import { IAdventure, ADVENTURES, AdventureType, AdventureRarity, rollAdventure, findAdventure } from '../../domain/entities/Adventure';
import { TimeOfDay } from '../../domain/entities/GameTime';
import { CultivationRealm, RealmNames } from '../../domain/entities/Player';

export class AdventureCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['adventure', '奇遇', '触发奇遇', '奇遇选项', '奇遇图鉴'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;

    if (action === 'adventure' || action === '奇遇') {
      this.triggerAdventure(store, narrative);
    } else if (action === '触发奇遇') {
      this.triggerAdventure(store, narrative);
    } else if (action === '奇遇选项') {
      this.handleOption(store, narrative, args);
    } else if (action === '奇遇图鉴') {
      this.showAdventureGuide(store, narrative, modalManager);
    }
  }

  private triggerAdventure(store: any, narrative: any): void {
    const player = store.getState().player;
    const gameTime = store.getState().gameTime;
    
    const realm = player.realm;
    const timeOfDay = gameTime.timeOfDay || TimeOfDay.DAWN;
    const location = player.currentRoomId;

    const adventure = rollAdventure(realm, timeOfDay, location);

    if (!adventure) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你四处探索，并未发现什么特别的机缘。' });
      return;
    }

    this.showAdventure(store, narrative, adventure);
  }

  private showAdventure(store: any, narrative: any, adventure: IAdventure): void {
    const typeNames: Record<AdventureType, string> = {
      [AdventureType.BLESSING]: '天降机缘',
      [AdventureType.COMBAT]: '战斗奇遇',
      [AdventureType.DISCOVERY]: '发现奇遇',
      [AdventureType.CHOICE]: '选择奇遇',
      [AdventureType.MYSTERY]: '神秘奇遇',
    };

    const rarityColors: Record<AdventureRarity, string> = {
      [AdventureRarity.COMMON]: '普通',
      [AdventureRarity.RARE]: '稀有',
      [AdventureRarity.EPIC]: '史诗',
      [AdventureRarity.LEGEND]: '传说',
    };

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n━━━━━━━━━━━━━━━━━━━━' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【${typeNames[adventure.type]}·${rarityColors[adventure.rarity]}】` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: adventure.name });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '━━━━━━━━━━━━━━━━━━━━' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: adventure.description });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: adventure.originStory });

    if (adventure.options && adventure.options.length > 0) {
      const optionItems = adventure.options.map((opt, index) => {
        const canAfford = this.checkAffordability(store.getState().player, opt);

        return {
          label: opt.text,
          action: `奇遇选项 ${adventure.id} ${index}`,
          desc: this.buildOptionDesc(opt),
          disabled: !canAfford,
        };
      });

      narrative.pushClickableList('选择行动', optionItems);
    } else if (adventure.autoResult) {
      this.applyResult(store, narrative, adventure.autoResult);
    }
  }

  private checkAffordability(player: any, option: any): boolean {
    if (!option.penalties) return true;

    for (const penalty of option.penalties) {
      switch (penalty.type) {
        case 'gold':
          if (player.gold < penalty.amount) return false;
          break;
        case 'hp':
          if (player.hp <= penalty.amount) return false;
          break;
        case 'mana':
          if (player.mana <= penalty.amount) return false;
          break;
      }
    }
    return true;
  }

  private buildOptionDesc(option: any): string {
    let desc = '';
    if (option.rewards) {
      desc += '奖励：';
      desc += option.rewards.map((r: any) => {
        if (r.type === 'exp') return `修为${r.amount}`;
        if (r.type === 'gold') return `金币${r.amount}`;
        if (r.type === 'item') return `物品`;
        if (r.type === 'technique') return `宝术`;
        if (r.type === 'talent') return `天赋`;
        if (r.type === 'realm') return `境界提升`;
        return `${r.type}${r.amount}`;
      }).join(', ');
    }
    if (option.penalties) {
      if (desc) desc += ' | ';
      desc += '消耗：';
      desc += option.penalties.map((p: any) => {
        if (p.type === 'gold') return `金币${p.amount}`;
        if (p.type === 'hp') return `气血${p.amount}`;
        if (p.type === 'mana') return `法力${p.amount}`;
        return `${p.type}${p.amount}`;
      }).join(', ');
    }
    return desc;
  }

  private handleOption(store: any, narrative: any, args: string[]): void {
    const adventureId = args[0];
    const optionIndex = parseInt(args[1]);

    const adventure = findAdventure(adventureId);
    if (!adventure || !adventure.options || optionIndex >= adventure.options.length) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '无效的选择！' });
      return;
    }

    const option = adventure.options[optionIndex];

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n' + option.result });

    this.applyResult(store, narrative, { rewards: option.rewards, penalties: option.penalties });
  }

  private applyResult(store: any, narrative: any, result: { rewards?: any[], penalties?: any[] }): void {
    const player = store.getState().player;

    if (result.penalties) {
      for (const penalty of result.penalties) {
        switch (penalty.type) {
          case 'gold':
            player.gold = Math.max(0, player.gold - penalty.amount);
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `损失了 ${penalty.amount} 金币` });
            break;
          case 'hp':
            player.hp = Math.max(1, player.hp - penalty.amount);
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `损失了 ${penalty.amount} 气血` });
            break;
          case 'mana':
            player.mana = Math.max(0, player.mana - penalty.amount);
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `损失了 ${penalty.amount} 法力` });
            break;
        }
      }
    }

    if (result.rewards) {
      for (const reward of result.rewards) {
        switch (reward.type) {
          case 'exp':
            player.cultivationExp += reward.amount;
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `获得 ${reward.amount} 修为！` });
            break;
          case 'gold':
            player.gold += reward.amount;
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `获得 ${reward.amount} 金币！` });
            break;
          case 'item':
            if (reward.id) {
              player.inventory.push({
                id: reward.id,
                name: this.getItemName(reward.id),
                type: 'material',
                quality: '凡品',
                desc: '奇遇获得的物品',
                price: 0,
                stackable: false,
                maxStack: 1,
                icon: '✦',
              });
              store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `获得物品：${this.getItemName(reward.id)}！` });
            }
            break;
          case 'technique':
            if (reward.id && !player.techniqueIds.includes(reward.id)) {
              player.techniqueIds.push(reward.id);
              store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `获得宝术：${this.getTechniqueName(reward.id)}！` });
            }
            break;
          case 'talent':
            if (reward.id && !player.talentIds.includes(reward.id)) {
              player.talentIds.push(reward.id);
              const talent = findAdventure(reward.id);
              store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `觉醒天赋：${talent?.name || reward.id}！` });
            }
            break;
          case 'realm':
            player.realm = Math.min(player.realm + reward.amount, 15);
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `境界提升至${RealmNames[player.realm as CultivationRealm]}！` });
            break;
        }
      }
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '继续探索', action: '奇遇', desc: '再次尝试触发奇遇' },
      { label: '查看状态', action: '状态', desc: '查看角色状态' },
      { label: '查看背包', action: '背包', desc: '查看获得的物品' },
    ];
    narrative.pushClickableList('奇遇结束', actions);
  }

  private getItemName(id: string): string {
    const names: Record<string, string> = {
      exp_pill: '聚气丹',
      dragon_blood: '真龙血',
      spirit_crystal: '灵石',
    };
    return names[id] || id;
  }

  private getTechniqueName(id: string): string {
    const names: Record<string, string> = {
      qingluan_baoshu: '青鸾宝术',
      taotie_baoshu: '饕餮宝术',
      liushen_fa: '青木法',
    };
    return names[id] || id;
  }

  private showAdventureGuide(store: any, narrative: any, modalManager?: any): void {
    const typeNames: Record<AdventureType, string> = {
      [AdventureType.BLESSING]: '天降机缘',
      [AdventureType.COMBAT]: '战斗奇遇',
      [AdventureType.DISCOVERY]: '发现奇遇',
      [AdventureType.CHOICE]: '选择奇遇',
      [AdventureType.MYSTERY]: '神秘奇遇',
    };

    const rarityColors: Record<AdventureRarity, string> = {
      [AdventureRarity.COMMON]: '普通',
      [AdventureRarity.RARE]: '稀有',
      [AdventureRarity.EPIC]: '史诗',
      [AdventureRarity.LEGEND]: '传说',
    };

    const player = store.getState().player;
    const encounteredIds = player.encounteredAdventures || [];

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【奇遇图鉴】' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `已遭遇：${encounteredIds.length}/${ADVENTURES.length}` });

      const adventureItems = ADVENTURES.map(adventure => {
        const isEncountered = encounteredIds.includes(adventure.id);
        return {
          label: `${isEncountered ? '✓' : '?'} ${adventure.name}（${typeNames[adventure.type]}·${rarityColors[adventure.rarity]}）`,
          action: '',
          desc: isEncountered ? adventure.description : '尚未发现',
          disabled: !isEncountered,
        };
      });

      narrative.pushClickableList('奇遇图鉴', adventureItems);
      return;
    }

    modalManager.showInteractive('奇遇图鉴', (container: HTMLElement) => {
      const statsHeader = document.createElement('div');
      statsHeader.className = 'adventure-stats';
      statsHeader.innerHTML = `<div>已遭遇：${encounteredIds.length}/${ADVENTURES.length}</div>`;
      container.appendChild(statsHeader);

      const byType: Record<AdventureType, IAdventure[]> = {
        [AdventureType.BLESSING]: [],
        [AdventureType.COMBAT]: [],
        [AdventureType.DISCOVERY]: [],
        [AdventureType.CHOICE]: [],
        [AdventureType.MYSTERY]: [],
      };

      for (const adventure of ADVENTURES) {
        byType[adventure.type].push(adventure);
      }

      for (const type of Object.values(AdventureType)) {
        const adventures = byType[type];
        if (adventures.length === 0) continue;

        const section = document.createElement('div');
        section.className = 'adventure-section';
        section.innerHTML = `<div class="adventure-section-title">${typeNames[type]}</div>`;

        const grid = document.createElement('div');
        grid.className = 'adventure-grid';

        for (const adventure of adventures) {
          const isEncountered = encounteredIds.includes(adventure.id);

          const card = document.createElement('div');
          card.className = `adventure-card ${isEncountered ? '' : 'locked'}`;
          card.innerHTML = `
            <div class="adventure-icon">${isEncountered ? '🌟' : '❓'}</div>
            <div class="adventure-info">
              <div class="adventure-name">${isEncountered ? adventure.name : '???'}</div>
              <div class="adventure-rarity">${rarityColors[adventure.rarity]}</div>
              <div class="adventure-desc">${isEncountered ? adventure.description : '尚未发现此奇遇'}</div>
            </div>
          `;

          grid.appendChild(card);
        }

        section.appendChild(grid);
        container.appendChild(section);
      }
    }, { width: '700px', height: '550px' });
  }
}