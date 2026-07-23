import { ICommandHandler, ICommandContext } from './CommandRouter';
import { getFullRealmName, CultivationRealm, RealmNames } from '../../domain/entities/Player';
import { getMethod } from '../../data/methods/method_data';
import { SaveManager } from '../../infrastructure/persistence/SaveManager';
import { World } from '../../domain/World';
import { ItemType, IItem } from '../../domain/entities/Item';
import { QuestManager } from '../../domain/services/QuestManager';
import { QUEST_DATA, findQuest } from '../../data/quests/quest_data';
import { ARRAY_FORMATIONS, ArrayFormationTier, ArrayFormationType, IArrayFormation, IArrayFormationInstance } from '../../domain/entities/ArrayFormation';
import { getItemById } from '../../data/seed/items';
import { SEED_AUCTION_ITEMS, AUCTION_CONFIG, AUCTION_NPC_NAMES, generateAuctionSession, IAuctionItem, AuctionStatus } from '../../domain/entities/AuctionHouse';
import { SEED_ACHIEVEMENTS, AchievementCategory } from '../../domain/entities/Achievement';
import { getTechniqueById } from '../../data/seed/techniques';
import { ShopCommand } from './ShopCommand';
import { getQualityStars, getQualityStyle } from '../../domain/utils/QualityUtils';
import { HiddenStorylineService } from '../../domain/services/HiddenStorylineService';

export class GeneralCommand implements ICommandHandler {
  private saveManager: SaveManager;
  private world: World;
  private currentAuctionSession: any = null;
  private auctionTimer: number | null = null;
  private npcBidTimer: number | null = null;
  /** 玩家锁定的金币（已出价但未结算） */
  private playerLockedGold: number = 0;
  /** 玩家在当前拍卖会出价记录：itemId → 出价金额 */
  private playerBids: Map<string, number> = new Map();

  constructor(saveManager: SaveManager, world: World) {
    this.saveManager = saveManager;
    this.world = world;
  }

  canHandle(action: string): boolean {
    return [
      'status', '状态', 'inventory', '背包', 'i',
      'equip', '装备', 'e', 'unequip', '卸下',
      'use', '使用',
      'quest', '任务', 'q', 'accept', '接受',
      'map', '地图', 'm',
      'help', '帮助',
      'save', '保存',
      'technique', '宝术', 't',
      'look', '查看', 'l',
      'explore', '探索',
      'formation', '阵法', '布置', 'place',
      'auction', '拍卖', '出价', 'bid',
      'achieve', '成就', 'achievement', '装备称号', '查看成就',
      'storyline', '支线', '故事线', '线索',
      'move', '行走', 'search', '探查', 'combat', '寻战', 'rest', '打坐',
    ].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;
    
    switch (action) {
      case 'status': case '状态':
        this.showStatus(store, modalManager);
        break;
      case 'inventory': case '背包': case 'i':
        this.showInventory(store, modalManager);
        break;
      case 'use': case '使用':
        this.useItem(store, args.join(' '));
        break;
      case 'equip': case '装备': case 'e':
        this.equipItem(store, args.join(' '));
        break;
      case 'unequip': case '卸下':
        this.unequipItem(store, args.join(' '));
        break;
      case 'quest': case '任务': case 'q':
        this.showQuests(store, modalManager);
        break;
      case 'accept': case '接受':
        this.acceptQuest(store, args.join(' '));
        break;
      case 'map': case '地图': case 'm':
        this.showMap(store);
        break;
      case 'help': case '帮助':
        this.showHelp(store);
        break;
      case 'save': case '保存':
        this.saveGame(store);
        break;
      case 'technique': case '宝术': case 't':
        this.showTechniques(store, modalManager);
        break;
      case 'look': case '查看': case 'l':
        this.look(store);
        break;
      case 'explore': case '探索':
        this.explore(context, args.join(' '));
        break;
      case 'formation': case '阵法':
        this.showFormations(store, narrative, modalManager);
        break;
      case '布置': case 'place':
        this.placeFormation(store, args.join(' '));
        break;
      case '升级阵法': case 'upgradeFormation':
        this.upgradeFormation(store, args.join(' '));
        break;
      case 'auction': case '拍卖':
        this.showAuction(store, narrative, modalManager);
        break;
      case '出价': case 'bid':
        this.bid(store, args);
        break;
      case 'achieve': case '成就': case 'achievement':
        this.showAchievements(store, narrative, modalManager);
        break;
      case '装备称号':
        this.equipTitle(store, args.join(' '));
        break;
      case '查看成就':
        this.viewAchievement(store, args.join(' '));
        break;
      case 'storyline': case '支线': case '故事线': case '线索':
        this.showStorylines(store, modalManager);
        break;
      case 'move': case '行走':
        this.showMoveOptions(context);
        break;
      case 'search': case '探查':
        this.searchRoom(context);
        break;
      case 'combat': case '寻战':
        this.seekCombat(context, args.join(' '));
        break;
      case 'rest': case '打坐':
        this.rest(store);
        break;
    }
  }

  private showStatus(store: any, modalManager?: any): void {
    const p = store.getState().player;
    const fullRealm = getFullRealmName(p.realm, p.realmStage, p.realmPerfection);
    const methodName = p.currentMethodId ? (getMethod(p.currentMethodId)?.name || '未知') : '未修炼';
    
    const insightBonus = Math.floor((p.breakthroughInsight || 0) * 0.5);
    const maxAttempts = Math.max(3, 10 - p.realm);
    const attemptsRemaining = maxAttempts - (p.breakthroughAttempts || 0);
    
    let html = `
      <table>
        <tr><td class="modal-key">姓名</td><td class="modal-val">${p.name}</td></tr>
        <tr><td class="modal-key">境界</td><td class="modal-val">${fullRealm}</td></tr>
        <tr><td class="modal-key">功法</td><td class="modal-val">${methodName}</td></tr>
        <tr><td class="modal-key">转世</td><td class="modal-val">${p.reincarnationCount} 次</td></tr>
        <tr><td class="modal-key">修为</td><td class="modal-val">${Math.floor(p.cultivationExp)} / ${p.maxCultivationExp}</td></tr>
        <tr><td class="modal-key">气血</td><td class="modal-val">${p.hp} / ${p.maxHp}</td></tr>
        <tr><td class="modal-key">法力</td><td class="modal-val">${p.mana} / ${p.maxMana}</td></tr>
        <tr><td class="modal-key">攻击</td><td class="modal-val">${p.attack}</td></tr>
        <tr><td class="modal-key">防御</td><td class="modal-val">${p.defense}</td></tr>
        <tr><td class="modal-key">速度</td><td class="modal-val">${p.speed}</td></tr>
        <tr><td class="modal-key">洞天</td><td class="modal-val">${p.caveCount}</td></tr>
        <tr><td class="modal-key">暴击率</td><td class="modal-val">${(p.critRate * 100).toFixed(1)}%</td></tr>
        <tr><td class="modal-key">原始币</td><td class="modal-val">${p.gold}</td></tr>
        <tr><td class="modal-key">突破感悟</td><td class="modal-val">${p.breakthroughInsight || 0} (+${insightBonus}%成功率)</td></tr>
        <tr><td class="modal-key">突破保底</td><td class="modal-val">${attemptsRemaining > 0 ? `再失败${attemptsRemaining}次必定成功` : '已触发保底'}</td></tr>
        <tr><td class="modal-key">已探索区域</td><td class="modal-val">${p.discoveredZones.length}</td></tr>
      </table>
    `;
    
    if (modalManager) {
      modalManager.show('角色状态', html, { width: '500px' });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[CARD:status]角色状态' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]姓名: ${p.name}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]境界: ${fullRealm}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]功法: ${methodName}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]转世: ${p.reincarnationCount} 次` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]修为: ${Math.floor(p.cultivationExp)} / ${p.maxCultivationExp}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]气血: ${p.hp} / ${p.maxHp}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]法力: ${p.mana} / ${p.maxMana}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]攻击: ${p.attack} ｜ 防御: ${p.defense} ｜ 速度: ${p.speed}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]洞天: ${p.caveCount} ｜ 暴击率: ${(p.critRate * 100).toFixed(1)}% ｜ 原始币: ${p.gold}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]突破感悟: ${p.breakthroughInsight || 0} (+${insightBonus}%成功率)` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]突破保底: ${attemptsRemaining > 0 ? `再失败${attemptsRemaining}次必定成功` : '已触发保底'}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]已探索区域: ${p.discoveredZones.length}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[/CARD]' });
    }
  }

  private showInventory(store: any, modalManager?: any): void {
    const inventory = store.getState().player.inventory;
    
    if (!modalManager) {
      if (inventory.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '背包空空如也。' });
        return;
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[CARD:inv]背包' });
      for (const item of inventory) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]${item.name} — ${item.desc || '无描述'}` });
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[/CARD]' });
      return;
    }

    modalManager.showInteractive('背包', (container: HTMLElement) => {
      if (inventory.length === 0) {
        container.innerHTML = '<div class="modal-empty">背包空空如也。</div>';
        return;
      }

      const itemGrid = document.createElement('div');
      itemGrid.className = 'inventory-grid';

      for (let i = 0; i < inventory.length; i++) {
        const item = inventory[i];
        const itemCard = document.createElement('div');
        itemCard.className = 'inventory-item-card';
        const qualityStyle = getQualityStyle(item.quality);
        itemCard.style.borderColor = qualityStyle.color;
        itemCard.style.backgroundColor = qualityStyle.backgroundColor;

        const itemQuality = document.createElement('div');
        itemQuality.className = 'inventory-item-quality';
        itemQuality.textContent = getQualityStars(item.quality);
        itemQuality.style.color = qualityStyle.color;

        const itemInfo = document.createElement('div');
        itemInfo.className = 'inventory-item-info';

        const itemName = document.createElement('div');
        itemName.className = 'inventory-item-name';
        itemName.textContent = item.name;

        const itemDesc = document.createElement('div');
        itemDesc.className = 'inventory-item-desc';
        itemDesc.textContent = item.desc || '无描述';

        if (item.stats) {
          const statsEl = document.createElement('div');
          statsEl.className = 'inventory-item-stats';
          const parts: string[] = [];
          if (item.stats.attack) parts.push(`攻+${item.stats.attack}`);
          if (item.stats.defense) parts.push(`防+${item.stats.defense}`);
          if (item.stats.hp) parts.push(`血+${item.stats.hp}`);
          if (item.stats.mana) parts.push(`法+${item.stats.mana}`);
          if (item.stats.speed) parts.push(`速+${item.stats.speed}`);
          statsEl.textContent = parts.join(' ');
          itemInfo.appendChild(statsEl);
        }

        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemDesc);

        const itemActions = document.createElement('div');
        itemActions.className = 'inventory-item-actions';

        if (item.effect?.type === 'heal' || item.effect?.type === 'mana' || item.effect?.type === 'cultivation') {
          const useBtn = document.createElement('button');
          useBtn.className = 'modal-btn modal-btn-primary';
          useBtn.textContent = '使用';
          useBtn.addEventListener('click', () => {
            this.useItemDirect(store, item);
            modalManager.close();
          });
          itemActions.appendChild(useBtn);
        }

        if (item.type === ItemType.EQUIPMENT && item.slot) {
          const equipBtn = document.createElement('button');
          equipBtn.className = 'modal-btn modal-btn-secondary';
          equipBtn.textContent = '装备';
          equipBtn.addEventListener('click', () => {
            this.equipItemDirect(store, item);
            modalManager.close();
          });
          itemActions.appendChild(equipBtn);
        }

        itemCard.appendChild(itemQuality);
        itemCard.appendChild(itemInfo);
        itemCard.appendChild(itemActions);
        itemGrid.appendChild(itemCard);
      }

      container.appendChild(itemGrid);
    }, { width: '700px', height: '500px' });
  }

  private useItemDirect(store: any, item: IItem): void {
    const inv = store.getState().player.inventory;
    let consumed = false;
    const newInv = inv.filter((i: IItem) => {
      if (!consumed && i.id === item.id) {
        consumed = true;
        return false;
      }
      return true;
    });

    if (item.effect?.type === 'heal') {
      const heal = item.effect.value;
      store.getState().player.hp = Math.min(store.getState().player.maxHp, store.getState().player.hp + heal);
      store.getState().player.inventory = newInv;
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `使用 ${item.name}，恢复 ${heal} 点气血。` });
    } else if (item.effect?.type === 'mana') {
      const mana = item.effect.value;
      store.getState().player.mana = Math.min(store.getState().player.maxMana, store.getState().player.mana + mana);
      store.getState().player.inventory = newInv;
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `使用 ${item.name}，恢复 ${mana} 点法力。` });
    } else if (item.effect?.type === 'cultivation') {
      const exp = item.effect.value;
      store.getState().player.cultivationExp += exp;
      store.getState().player.inventory = newInv;
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `使用 ${item.name}，获得 ${exp} 修为。` });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${item.name} 无法直接使用。` });
    }
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
  }

  private equipItemDirect(store: any, item: IItem): void {
    const player = store.getState().player;

    const slotMap: Record<string, string> = {
      '武器': 'weapon', '护甲': 'armor', '靴子': 'boots', '饰品': 'accessory1', '法宝': 'artifact',
    };
    const slotKey = slotMap[item.slot!];
    if (!slotKey) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未知装备槽位: ${item.slot}` });
      return;
    }

    if (player.equipment[slotKey]) {
      const old = player.equipment[slotKey]!;
      player.inventory.push(old);
      if (old.stats) {
        if (old.stats.attack) player.attack -= old.stats.attack;
        if (old.stats.defense) player.defense -= old.stats.defense;
        if (old.stats.hp) { player.maxHp -= old.stats.hp; player.hp = Math.min(player.hp, player.maxHp); }
        if (old.stats.mana) { player.maxMana -= old.stats.mana; player.mana = Math.min(player.mana, player.maxMana); }
        if (old.stats.speed) player.speed -= old.stats.speed;
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `卸下 ${old.name}。` });
    }

    const idx = player.inventory.findIndex((i: IItem) => i.id === item.id);
    if (idx !== -1) player.inventory.splice(idx, 1);
    player.equipment[slotKey] = item;
    if (item.stats) {
      if (item.stats.attack) player.attack += item.stats.attack;
      if (item.stats.defense) player.defense += item.stats.defense;
      if (item.stats.hp) { player.maxHp += item.stats.hp; player.hp += item.stats.hp; }
      if (item.stats.mana) { player.maxMana += item.stats.mana; player.mana += item.stats.mana; }
      if (item.stats.speed) player.speed += item.stats.speed;
    }
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `装备 ${item.name} 成功！` });
    if (item.stats) {
      const parts: string[] = [];
      if (item.stats.attack) parts.push(`攻击+${item.stats.attack}`);
      if (item.stats.defense) parts.push(`防御+${item.stats.defense}`);
      if (item.stats.hp) parts.push(`气血+${item.stats.hp}`);
      if (item.stats.mana) parts.push(`法力+${item.stats.mana}`);
      if (item.stats.speed) parts.push(`速度+${item.stats.speed}`);
      if (parts.length > 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `属性变化: ${parts.join(' ｜ ')}` });
      }
    }
  }

  private removeItemFromInventory(store: any, item: IItem): void {
    const inv = store.getState().player.inventory;
    let removed = false;
    store.getState().player.inventory = inv.filter((i: IItem) => {
      if (!removed && i.id === item.id) {
        removed = true;
        return false;
      }
      return true;
    });
  }

  private useItem(store: any, itemName: string): void {
    if (!itemName) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请点击物品进行使用。' });
      return;
    }
    const inv = store.getState().player.inventory;
    const item = inv.find((i: IItem) => i.name === itemName);
    if (!item) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `背包中没有 ${itemName}。` });
      return;
    }
    if (item.effect?.type === 'heal') {
      const heal = item.effect.value;
      store.getState().player.hp = Math.min(store.getState().player.maxHp, store.getState().player.hp + heal);
      this.removeItemFromInventory(store, item);
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `使用 ${item.name}，恢复 ${heal} 点气血。` });
    } else if (item.effect?.type === 'mana') {
      const mana = item.effect.value;
      store.getState().player.mana = Math.min(store.getState().player.maxMana, store.getState().player.mana + mana);
      this.removeItemFromInventory(store, item);
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `使用 ${item.name}，恢复 ${mana} 点法力。` });
    } else if (item.effect?.type === 'cultivation') {
      const exp = item.effect.value;
      store.getState().player.cultivationExp += exp;
      this.removeItemFromInventory(store, item);
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `使用 ${item.name}，获得 ${exp} 修为。` });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${item.name} 无法直接使用。` });
    }
  }

  private equipItem(store: any, equipName: string): void {
    if (!equipName) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请点击物品进行装备。' });
      return;
    }
    const player = store.getState().player;
    const foundIdx = player.inventory.findIndex((i: IItem) => i.name === equipName);
    if (foundIdx === -1) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `背包中没有 ${equipName}。` });
      return;
    }
    const equipItem = player.inventory[foundIdx];
    if (equipItem.type !== ItemType.EQUIPMENT || !equipItem.slot) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${equipName} 不是可装备物品。` });
      return;
    }

    const slotMap: Record<string, string> = {
      '武器': 'weapon', '护甲': 'armor', '靴子': 'boots', '饰品': 'accessory1', '法宝': 'artifact',
    };
    const slotKey = slotMap[equipItem.slot];
    if (!slotKey) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未知装备槽位: ${equipItem.slot}` });
      return;
    }

    if (player.equipment[slotKey]) {
      const old = player.equipment[slotKey]!;
      player.inventory.push(old);
      if (old.stats) {
        if (old.stats.attack) player.attack -= old.stats.attack;
        if (old.stats.defense) player.defense -= old.stats.defense;
        if (old.stats.hp) { player.maxHp -= old.stats.hp; player.hp = Math.min(player.hp, player.maxHp); }
        if (old.stats.mana) { player.maxMana -= old.stats.mana; player.mana = Math.min(player.mana, player.maxMana); }
        if (old.stats.speed) player.speed -= old.stats.speed;
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `卸下 ${old.name}。` });
    }

    player.inventory.splice(foundIdx, 1);
    player.equipment[slotKey] = equipItem;
    if (equipItem.stats) {
      if (equipItem.stats.attack) player.attack += equipItem.stats.attack;
      if (equipItem.stats.defense) player.defense += equipItem.stats.defense;
      if (equipItem.stats.hp) { player.maxHp += equipItem.stats.hp; player.hp += equipItem.stats.hp; }
      if (equipItem.stats.mana) { player.maxMana += equipItem.stats.mana; player.mana += equipItem.stats.mana; }
      if (equipItem.stats.speed) player.speed += equipItem.stats.speed;
    }
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `装备 ${equipItem.name} 成功！` });
    if (equipItem.stats) {
      const parts: string[] = [];
      if (equipItem.stats.attack) parts.push(`攻击+${equipItem.stats.attack}`);
      if (equipItem.stats.defense) parts.push(`防御+${equipItem.stats.defense}`);
      if (equipItem.stats.hp) parts.push(`气血+${equipItem.stats.hp}`);
      if (equipItem.stats.mana) parts.push(`法力+${equipItem.stats.mana}`);
      if (equipItem.stats.speed) parts.push(`速度+${equipItem.stats.speed}`);
      if (parts.length > 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `属性变化: ${parts.join(' ｜ ')}` });
      }
    }
  }

  private unequipItem(store: any, slotName: string): void {
    const slotMap: Record<string, string> = {
      '武器': 'weapon', 'weapon': 'weapon',
      '护甲': 'armor', 'armor': 'armor',
      '靴子': 'boots', 'boots': 'boots',
      '饰品': 'accessory1', 'accessory': 'accessory1',
      '法宝': 'artifact', 'artifact': 'artifact',
    };
    const key = slotMap[slotName];
    if (!key) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '无效的装备槽位。可卸下槽位：武器、护甲、靴子、饰品、法宝。' });
      return;
    }
    const p = store.getState().player;
    const old = p.equipment[key];
    if (!old) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${slotName}槽位是空的。` });
      return;
    }
    if (old.stats) {
      if (old.stats.attack) p.attack -= old.stats.attack;
      if (old.stats.defense) p.defense -= old.stats.defense;
      if (old.stats.hp) { p.maxHp -= old.stats.hp; p.hp = Math.min(p.hp, p.maxHp); }
      if (old.stats.mana) { p.maxMana -= old.stats.mana; p.mana = Math.min(p.mana, p.maxMana); }
      if (old.stats.speed) p.speed -= old.stats.speed;
    }
    p.equipment[key] = null;
    p.inventory.push(old);
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `卸下 ${old.name}。` });
  }

  private showQuests(store: any, modalManager?: any): void {
    const pQuest = store.getState().player;
    
    let html = '';
    
    if (pQuest.activeQuests.length === 0) {
      html += '<div class="modal-section"><p>当前无活跃任务。</p></div>';
    } else {
      html += '<div class="modal-section"><h4 class="modal-section-title">进行中</h4>';
      html += '<table><tr><th class="modal-th">任务名称</th><th class="modal-th">进度</th></tr>';
      for (const aq of pQuest.activeQuests) {
        const progStrs = aq.objectives.map((o: any) => `${o.description.replace(/\d+\/\d+/g, `${o.current}/${o.required}`)}`);
        html += `<tr><td class="modal-key">【${aq.name}】</td><td class="modal-val">${progStrs.join(' | ')}</td></tr>`;
      }
      html += '</table></div>';
    }

    const available = QuestManager.listAvailable(pQuest);
    if (available.length > 0) {
      html += '<div class="modal-section"><h4 class="modal-section-title">可接取</h4>';
      html += '<table><tr><th class="modal-th">任务名称</th><th class="modal-th">描述</th></tr>';
      for (const aid of available) {
        const qDef = findQuest(aid);
        if (qDef) {
          html += `<tr><td class="modal-key">${qDef.name}</td><td class="modal-val">${qDef.description}</td></tr>`;
        }
      }
      html += '</table></div>';
    }
    
    if (modalManager) {
      modalManager.show('任务列表', html, { width: '650px', height: '450px' });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[CARD:status]任务列表' });
      if (pQuest.activeQuests.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[R]当前无活跃任务。' });
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '= 进行中 =' });
        for (const aq of pQuest.activeQuests) {
          const progStrs = aq.objectives.map((o: any) => `${o.description.replace(/\d+\/\d+/g, `${o.current}/${o.required}`)}`);
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]【${aq.name}】${progStrs.join(' | ')}` });
        }
      }
      const availableQuests = QuestManager.listAvailable(pQuest);
      if (availableQuests.length > 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '= 可接取 =' });
        for (const aid of availableQuests) {
          const qDef = findQuest(aid);
          if (qDef) {
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]${qDef.name}: ${qDef.description}` });
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]  接受: accept ${qDef.name}` });
          }
        }
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[/CARD]' });
    }
  }

  private acceptQuest(store: any, acceptName: string): void {
    if (!acceptName) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '接受: accept <任务名>' });
      return;
    }
    const matched = QUEST_DATA.find(q => q.name === acceptName);
    if (!matched) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未知任务: ${acceptName}` });
      return;
    }
    const result = QuestManager.acceptQuest(store.getState().player, matched.id);
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: result.message });
  }

  private showMap(store: any): void {
    const currentRoom = this.world.getRoom(store.getState().player.currentRoomId);
    if (currentRoom) {
      const zone = this.world.getZoneByRoomId(currentRoom.id);
      const zoneName = zone ? zone.name : '未知区域';
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `当前所在: ${zoneName} - ${currentRoom.name}` });

      const discovered = this.world.getExploredZones();
      if (discovered.length > 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '已探索区域:' });
        for (const z of discovered) {
          const progress = this.world.getZoneExplorationProgress(z.id);
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `  ${z.name} - 探索度 ${progress}%` });
        }
      }
    }
  }

  private showHelp(store: any): void {
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[CARD:help]操作指南' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '          方向移动' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]点击方向按钮移动` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '          修炼系统' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]修炼: 吐纳修炼 (需功法)` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]修炼 静坐: 缓慢但安全，恢复法力` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]修炼 冲关: 快速但消耗法力，有风险` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]突破: 小境界晋升→大圆满(需材料)→大境界突破` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '          其他功能' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]背包/状态/装备/商店/任务/地图: 对应功能` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]回应: 点击选项回应事件或心魔选择` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]交谈: 与当前房间的NPC对话` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]保存: 手动存档` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '          世界系统' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]世界: 查看当前世界与飞升条件` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]游历: 查看世界游历记录` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]飞升: 达到条件后飞升至新世界` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]专属: 查看当前世界的专属修炼体系` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[/CARD]' });
  }

  private async saveGame(store: any): Promise<void> {
    const state = store.getState();
    const success = await this.saveManager.save(1, state.player, this.world.getSeed(), state.gameTime);
    store.dispatch({
      type: 'SYSTEM_MESSAGE',
      payload: success ? '存档成功。' : '存档失败。'
    });
  }

  private showTechniques(store: any, modalManager?: any): void {
    const techs = store.getState().player.techniques;
    
    if (!modalManager) {
      if (techs.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还未掌握任何宝术。' });
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[CARD:tech]已掌握宝术' });
        for (const tech of techs) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[R]${tech.name} (${tech.quality}) 威力:${tech.baseDamage} 消耗:${tech.manaCost} 法力` });
        }
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[/CARD]' });
      }
      return;
    }

    modalManager.showInteractive('已掌握宝术', (container: HTMLElement) => {
      if (techs.length === 0) {
        container.innerHTML = '<div class="modal-empty">你还未掌握任何宝术。</div>';
        return;
      }

      const list = document.createElement('div');
      list.className = 'techniques-list';

      for (const tech of techs) {
        const techCard = document.createElement('div');
        techCard.className = 'technique-card';

        const name = document.createElement('div');
        name.className = 'technique-name';
        name.textContent = tech.name;

        const info = document.createElement('div');
        info.className = 'technique-info';
        info.textContent = `${tech.quality} | 威力: ${tech.baseDamage} | 消耗: ${tech.manaCost} 法力`;

        if (tech.description) {
          const desc = document.createElement('div');
          desc.className = 'technique-desc';
          desc.textContent = tech.description;
          techCard.appendChild(desc);
        }

        techCard.appendChild(name);
        techCard.appendChild(info);
        list.appendChild(techCard);
      }

      container.appendChild(list);
    }, { width: '600px', height: '450px' });
  }

  private look(store: any): void {
    const room = this.world.getRoom(store.getState().player.currentRoomId);
    if (room) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【${room.name}】` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: room.description });
      const exits = room.exits.map(e => e.direction).join('、');
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `出口: ${exits || '无'}` });
      if (room.monsters.length > 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '此处有怪物出没！' });
      }
    }
  }

  private showMoveOptions(context: ICommandContext): void {
    const { store, narrative } = context;
    const room = this.world.getRoom(store.getState().player.currentRoomId);
    if (!room) return;

    if (room.exits.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '此处没有可前往的方向。' });
      return;
    }

    const exitItems = room.exits.map(exit => {
      const targetRoom = exit.targetRoomId ? this.world.getRoom(exit.targetRoomId) : null;
      return {
        label: `${exit.direction} → ${targetRoom?.name || '未知区域'}`,
        action: exit.direction,
        desc: targetRoom?.description?.substring(0, 30) || '',
      };
    });

    narrative.pushClickableList('可前往方向', exitItems);
  }

  private searchRoom(context: ICommandContext): void {
    const { store, narrative } = context;
    const player = store.getState().player;
    const room = this.world.getRoom(player.currentRoomId);
    if (!room) return;

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【探查】你仔细探查${room.name}周围的环境...` });

    let foundSomething = false;

    if (room.monsters && room.monsters.length > 0) {
      foundSomething = true;
      const monsterItems = room.monsters.map((m: any) => ({
        label: `${m.name || '未知怪物'}（Lv.${m.level || 1}）`,
        action: `寻战 ${m.id || m.monsterId || ''}`,
        desc: m.description || '',
      }));
      narrative.pushClickableList('发现的怪物', monsterItems);
    }

    if (room.details && room.details.length > 0) {
      const unexplored = room.details.filter((d: any) => !d.explored || d.shopId);
      if (unexplored.length > 0) {
        foundSomething = true;
        const detailItems = unexplored.map((d: any) => ({
          label: d.name,
          action: `探索 ${d.id}`,
          desc: d.description?.substring(0, 40) || '',
        }));
        narrative.pushClickableList('发现的地点', detailItems);
      }
    }

    if (!foundSomething) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '四周空空荡荡，没有发现什么特别的东西。' });
    }

    if (Math.random() < 0.15) {
      const goldFound = Math.floor(Math.random() * 20) + 5;
      player.gold += goldFound;
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ 你在角落里发现了 ${goldFound} 枚原始币！` });
      store.dispatch({ type: 'UPDATE_PLAYER', payload: { gold: player.gold } });
    }
  }

  private seekCombat(context: ICommandContext, monsterIdArg: string): void {
    const { store, combatUseCase } = context;
    const player = store.getState().player;
    const room = this.world.getRoom(player.currentRoomId);

    if (!room || !room.monsters || room.monsters.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '此处没有可战斗的怪物。' });
      return;
    }

    let targetMonster: any = null;

    if (monsterIdArg) {
      targetMonster = room.monsters.find((m: any) => m.id === monsterIdArg || m.monsterId === monsterIdArg);
    }

    if (!targetMonster) {
      targetMonster = room.monsters[0];
    }

    const monsterId = targetMonster.id || targetMonster.monsterId;
    if (!monsterId) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '无法识别的怪物。' });
      return;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【寻战】你主动向【${targetMonster.name || '怪物'}】发起挑战！` });
    combatUseCase.startCombat(monsterId);
  }

  private rest(store: any): void {
    const player = store.getState().player;
    const room = this.world.getRoom(player.currentRoomId);

    if (!room) return;

    if (room.monsters && room.monsters.length > 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '此处有怪物出没，无法安心打坐！' });
      return;
    }

    const hpRecover = Math.floor(player.maxHp * 0.3);
    const manaRecover = Math.floor(player.maxMana * 0.3);
    const oldHp = player.hp;
    const oldMana = player.mana;
    const newHp = Math.min(player.maxHp, player.hp + hpRecover);
    const newMana = Math.min(player.maxMana, player.mana + manaRecover);

    player.hp = newHp;
    player.mana = newMana;

    const hpDelta = newHp - oldHp;
    const manaDelta = newMana - oldMana;

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【打坐】你盘膝而坐，吐纳灵气...` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `恢复气血 ${hpDelta > 0 ? '+' + hpDelta : '已满'}，恢复法力 ${manaDelta > 0 ? '+' + manaDelta : '已满'}。` });
    store.dispatch({ type: 'UPDATE_PLAYER', payload: { hp: player.hp, mana: player.mana } });
  }

  private explore(context: ICommandContext, detailId: string): void {
    const { store, narrative } = context;
    if (!detailId) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '探索: 探索 <细节名>' });
      return;
    }
    const room = this.world.getRoom(store.getState().player.currentRoomId);
    if (!room || !room.details) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '此处没有可探索的东西。' });
      return;
    }
    const detail = room.details.find(d => d.id === detailId);
    if (!detail) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '没有找到这个可探索的东西。' });
      return;
    }
    if (detail.explored && !detail.shopId) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你已经探索过${detail.name}了。` });
      return;
    }
    if (detail.requiredRealm && store.getState().player.realm < detail.requiredRealm) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你的境界不足，无法探索${detail.name}。` });
      return;
    }
    store.dispatch({ type: 'SET_CONTEXT', payload: null });
    store.dispatch({ type: 'SET_NPC_CONVERSATION', payload: null });
    if (detail.shopId) {
      const shopCommand = new ShopCommand();
      shopCommand.execute('shop', [], context);
      return;
    }
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: detail.description });
    if (detail.interactionResult) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: detail.interactionResult });
    }
    if (detail.hint && !detail.interactable) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: detail.hint });
    }
    if (detail.rewardItemId && detail.rewardAmount) {
      store.getState().player.inventory.push({
        id: `item_${Date.now()}`,
        name: detail.rewardItemId,
        desc: `从${detail.name}获得的物品`,
        type: ItemType.MATERIAL,
        quality: '凡品',
        price: 0,
        stackable: true,
        maxStack: 99,
        icon: '●',
        effect: { type: 'cultivation', value: detail.rewardAmount * 10 },
      });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你获得了 ${detail.rewardAmount} 个 ${detail.rewardItemId}！` });
    }

    // 尝试发现隐藏支线线索
    const player = store.getState().player;
    const clue = HiddenStorylineService.tryDiscoverClueByExplore(player, detail.id);
    if (clue) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【发现线索】${clue.title}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: clue.description });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `提示：${clue.hint}` });

      // 检查是否触发隐藏任务
      const triggered = HiddenStorylineService.checkTrigger(player);
      if (triggered) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【触发隐藏支线】${triggered.name}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: triggered.description });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: triggered.loreText });
      }
    }

    detail.explored = true;
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
  }

  /** 显示隐藏支线进度面板 */
  private showStorylines(store: any, modalManager?: any): void {
    const player = store.getState().player;
    const storylines = HiddenStorylineService.renderStorylinePanel(player);

    if (storylines.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '【隐藏支线】尚未发现任何线索。' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '提示：多探索房间细节、与NPC深度对话、击杀特殊怪物，可能发现隐藏线索。' });
      return;
    }

    const totalClues = HiddenStorylineService.getTotalClueCount();
    const discoveredClues = HiddenStorylineService.getDiscoveredClueCount(player);
    const completedStorylines = HiddenStorylineService.getCompletedStorylineCount(player);
    const totalStorylines = HiddenStorylineService.getTotalStorylineCount();

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【隐藏支线进度】${discoveredClues}/${totalClues} 线索，${completedStorylines}/${totalStorylines} 已完成` });
      for (const s of storylines) {
        const status = s.isCompleted ? '✓已完成' : s.isTriggered ? '◆进行中' : '○探索中';
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【${s.categoryName}】${s.name} ${status} (${s.progress})` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `  ${s.description}` });
      }
      return;
    }

    const html = `
      <div class="hidden-storyline-modal">
        <div class="hidden-storyline-header">
          <div class="hidden-storyline-title">隐藏支线</div>
          <div class="hidden-storyline-subtitle">
            线索：${discoveredClues}/${totalClues} · 支线完成：${completedStorylines}/${totalStorylines}
          </div>
        </div>
        ${storylines.map(s => {
          const statusClass = s.isCompleted ? 'hidden-storyline-status-completed' : s.isTriggered ? 'hidden-storyline-status-active' : 'hidden-storyline-status-inactive';
          return `
          <div class="hidden-storyline-card" style="--storyline-color: ${s.categoryColor};">
            <div class="hidden-storyline-card-header">
              <div>
                <span class="hidden-storyline-category">${s.categoryName}</span>
                <span class="hidden-storyline-name">${s.name}</span>
              </div>
              <div class="hidden-storyline-status ${statusClass}">
                ${s.isCompleted ? '✓ 已完成' : s.isTriggered ? '◆ 进行中' : '○ 探索中'}
              </div>
            </div>
            <div class="hidden-storyline-desc">${s.description}</div>
            <div class="hidden-storyline-progress">
              <div class="hidden-storyline-progress-label">
                <span>线索进度</span>
                <span>${s.progress}</span>
              </div>
              <div class="hidden-storyline-progress-track">
                <div class="hidden-storyline-progress-fill" style="width: ${s.progressPercent}%;"></div>
              </div>
            </div>
            ${s.discoveredClues.length > 0 ? `
              <div class="hidden-storyline-clues">
                <div class="hidden-storyline-clues-title">已发现线索：</div>
                ${s.discoveredClues.map(c => `
                  <div class="hidden-storyline-clue">
                    <div class="hidden-storyline-clue-title">${c.title}</div>
                    <div class="hidden-storyline-clue-desc">${c.description}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${s.isCompleted ? `
              <div class="hidden-storyline-lore">${s.loreText}</div>
            ` : ''}
          </div>`;
        }).join('')}
      </div>
    `;

    modalManager.open(html, { width: '600px', height: '550px' });
  }

  private showFormations(store: any, narrative: any, modalManager?: any): void {
    const player = store.getState().player;
    const availableFormations = ARRAY_FORMATIONS.filter(f => f.requiredRealm <= player.realm);
    const tierNames: Record<ArrayFormationTier, string> = {
      [ArrayFormationTier.COMMON]: '普通',
      [ArrayFormationTier.RARE]: '稀有',
      [ArrayFormationTier.EPIC]: '史诗',
      [ArrayFormationTier.LEGENDARY]: '传说',
      [ArrayFormationTier.MYTHIC]: '神话',
    };
    const typeNames: Record<ArrayFormationType, string> = {
      [ArrayFormationType.ATTACK]: '攻击',
      [ArrayFormationType.DEFENSE]: '防御',
      [ArrayFormationType.GATHERING]: '聚灵',
      [ArrayFormationType.TRAP]: '陷阱',
      [ArrayFormationType.TRANSMISSION]: '传送',
    };

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【阵法系统】' });
      if (availableFormations.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '暂无可用阵法，请提升境界。' });
        return;
      }
      const formationItems = availableFormations.map(f => {
        const matDesc = Object.entries(f.materials).map(([id, cnt]) => {
          const item = getItemById(id);
          return `${item?.name || id}×${cnt}`;
        }).join(', ');
        return {
          label: `${f.name}（${typeNames[f.type]}·${tierNames[f.tier]}）`,
          action: `布置 ${f.name}`,
          desc: `${f.description} | 材料: ${matDesc}`,
        };
      });
      narrative.pushClickableList('可用阵法 · 点击布置', formationItems);
      return;
    }

    modalManager.showInteractive('阵法系统', (container: HTMLElement) => {
      if (player.formations && player.formations.length > 0) {
        const placedHeader = document.createElement('div');
        placedHeader.className = 'modal-section-title';
        placedHeader.textContent = '已布置阵法';
        container.appendChild(placedHeader);

        const placedList = document.createElement('div');
        placedList.className = 'formations-list';

        for (const instance of player.formations) {
          const f = ARRAY_FORMATIONS.find(af => af.id === instance.formationId);
          if (!f) continue;

          const isMaxLevel = instance.level >= f.maxLevel;

          const formCard = document.createElement('div');
          formCard.className = 'formation-card';

          const name = document.createElement('div');
          name.className = 'formation-name';
          name.textContent = `${f.name}（${typeNames[f.type]}·${tierNames[f.tier]}） Lv.${instance.level}/${f.maxLevel}`;

          const effectDesc = f.effects.map(e => {
            const value = e.value * instance.level;
            const typeNames: Record<string, string> = {
              damage: `伤害+${value}`,
              defense: `防御+${value}`,
              cultivation_speed: `修炼速度${value}倍`,
              lightning_damage: `雷电伤害+${value}`,
              void_damage: `空间伤害+${value}`,
              ignore_defense: `无视防御${(value * 100).toFixed(0)}%`,
              damage_reflect: `反弹伤害${(value * 100).toFixed(0)}%`,
              time_warp: `时间加速${value}倍`,
              teleport: '传送能力',
            };
            return typeNames[e.type] || `${e.type}: ${value}`;
          }).join('，');

          const effectEl = document.createElement('div');
          effectEl.className = 'formation-desc';
          effectEl.textContent = `效果：${effectDesc}`;

          formCard.appendChild(name);
          formCard.appendChild(effectEl);

          if (!isMaxLevel) {
            const upgradeBtn = document.createElement('button');
            upgradeBtn.className = 'modal-btn modal-btn-secondary';
            upgradeBtn.textContent = '升级';
            upgradeBtn.addEventListener('click', () => {
              this.upgradeFormation(store, f.name);
              modalManager.close();
            });
            formCard.appendChild(upgradeBtn);
          } else {
            const maxLabel = document.createElement('div');
            maxLabel.className = 'formation-max-level';
            maxLabel.textContent = '已达最高等级';
            formCard.appendChild(maxLabel);
          }

          placedList.appendChild(formCard);
        }
        container.appendChild(placedList);

        const divider = document.createElement('div');
        divider.className = 'modal-divider';
        container.appendChild(divider);
      }

      if (availableFormations.length === 0) {
        container.innerHTML = '<div class="modal-empty">暂无可用阵法，请提升境界。</div>';
        return;
      }

      const list = document.createElement('div');
      list.className = 'formations-list';

      for (const f of availableFormations) {
        const matDesc = Object.entries(f.materials).map(([id, cnt]) => {
          const item = getItemById(id);
          return `${item?.name || id}×${cnt}`;
        }).join(', ');

        const canAfford = Object.entries(f.materials).every(([id, cnt]) => {
          return player.inventory.filter((i: IItem) => i.id === id).length >= cnt;
        });

        const formCard = document.createElement('div');
        formCard.className = `formation-card ${canAfford ? '' : 'disabled'}`;

        const name = document.createElement('div');
        name.className = 'formation-name';
        name.textContent = `${f.name}（${typeNames[f.type]}·${tierNames[f.tier]}）`;

        const desc = document.createElement('div');
        desc.className = 'formation-desc';
        desc.textContent = f.description;

        const mats = document.createElement('div');
        mats.className = 'formation-materials';
        mats.textContent = `材料: ${matDesc}`;

        const btn = document.createElement('button');
        btn.className = `modal-btn ${canAfford ? 'modal-btn-primary' : 'modal-btn-disabled'}`;
        btn.textContent = canAfford ? '布置' : '材料不足';
        btn.disabled = !canAfford;
        btn.addEventListener('click', () => {
          this.placeFormation(store, f.name);
          modalManager.close();
        });

        formCard.appendChild(name);
        formCard.appendChild(desc);
        formCard.appendChild(mats);
        formCard.appendChild(btn);
        list.appendChild(formCard);
      }

      container.appendChild(list);
    }, { width: '650px', height: '500px' });
  }

  private placeFormation(store: any, formationName: string): void {
    const player = store.getState().player;
    const formation = ARRAY_FORMATIONS.find(f => f.name === formationName);
    if (!formation) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未找到阵法: ${formationName}` });
      return;
    }
    if (formation.requiredRealm > player.realm) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `境界不足，需要${RealmNames[formation.requiredRealm as CultivationRealm]}` });
      return;
    }
    let canAfford = true;
    const missing: string[] = [];
    for (const [matId, amount] of Object.entries(formation.materials)) {
      const count = player.inventory.filter((i: IItem) => i.id === matId).length;
      if (count < amount) {
        canAfford = false;
        const item = getItemById(matId);
        missing.push(`${item?.name || matId}（缺${amount - count}）`);
      }
    }
    if (!canAfford) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `材料不足：${missing.join(', ')}` });
      return;
    }
    for (const [matId, amount] of Object.entries(formation.materials)) {
      let remaining = amount;
      player.inventory = player.inventory.filter((item: IItem) => {
        if (item.id === matId && remaining > 0) {
          remaining--;
          return false;
        }
        return true;
      });
    }
    player.formations.push({
      formationId: formation.id,
      level: 1,
      placedRoomId: player.currentRoomId,
      remainingDuration: formation.cooldownHours > 0 ? formation.cooldownHours * 60 * 60 : 0,
    });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `成功布置【${formation.name}】！` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: formation.description });
    store.dispatch({ type: 'UPDATE_PLAYER', payload: { inventory: player.inventory, formations: player.formations } });

    this.triggerFormationEffect(store, formation);
  }

  private upgradeFormation(store: any, formationName: string): void {
    const player = store.getState().player;
    const formation = ARRAY_FORMATIONS.find(f => f.name === formationName);
    if (!formation) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未找到阵法: ${formationName}` });
      return;
    }

    const instance = player.formations.find((f: IArrayFormationInstance) => f.formationId === formation.id);
    if (!instance) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你还没有布置【${formation.name}】！` });
      return;
    }

    if (instance.level >= formation.maxLevel) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【${formation.name}】已达最高等级！` });
      return;
    }

    const upgradeCostMultiplier = 1.5;
    const upgradeGold = Math.floor(100 * Math.pow(upgradeCostMultiplier, instance.level));
    
    const matMultiplier = instance.level;
    const missing: string[] = [];
    let canAfford = true;

    for (const [matId, amount] of Object.entries(formation.materials)) {
      const upgradeAmount = Math.floor(amount * matMultiplier);
      const count = player.inventory.filter((i: IItem) => i.id === matId).length;
      if (count < upgradeAmount) {
        canAfford = false;
        const item = getItemById(matId);
        missing.push(`${item?.name || matId}（需要${upgradeAmount}，缺${upgradeAmount - count}）`);
      }
    }

    if (player.gold < upgradeGold) {
      canAfford = false;
      missing.push(`金币（需要${upgradeGold}，缺${upgradeGold - player.gold}）`);
    }

    if (!canAfford) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `升级材料不足：${missing.join(', ')}` });
      return;
    }

    player.gold -= upgradeGold;
    for (const [matId, amount] of Object.entries(formation.materials)) {
      const upgradeAmount = Math.floor(amount * matMultiplier);
      let remaining = upgradeAmount;
      player.inventory = player.inventory.filter((item: IItem) => {
        if (item.id === matId && remaining > 0) {
          remaining--;
          return false;
        }
        return true;
      });
    }

    instance.level++;

    const effectDescs = formation.effects.map(e => {
      const value = e.value * instance.level;
      const typeNames: Record<string, string> = {
        damage: `伤害+${value}`,
        defense: `防御+${value}`,
        cultivation_speed: `修炼速度${value}倍`,
        lightning_damage: `雷电伤害+${value}`,
        void_damage: `空间伤害+${value}`,
        ignore_defense: `无视防御${(value * 100).toFixed(0)}%`,
        damage_reflect: `反弹伤害${(value * 100).toFixed(0)}%`,
        time_warp: `时间加速${value}倍`,
        teleport: '传送能力',
      };
      return typeNames[e.type] || `${e.type}: ${value}`;
    }).join('，');

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【${formation.name}】升级至${instance.level}级！` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `升级效果：${effectDescs}` });
    store.dispatch({ type: 'UPDATE_PLAYER', payload: { gold: player.gold, inventory: player.inventory, formations: player.formations } });

    this.triggerFormationEffect(store, formation, instance.level);
  }

  private triggerFormationEffect(store: any, formation: IArrayFormation, level: number = 1): void {
    const player = store.getState().player;
    const effects = formation.effects.map(e => ({
      ...e,
      value: e.value * level,
    }));

    for (const effect of effects) {
      switch (effect.type) {
        case 'cultivation_speed':
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `阵法效果：修炼速度提升至${effect.value}倍！` });
          break;
        case 'defense':
          player.defense += effect.value;
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `阵法效果：防御提升${effect.value}点！` });
          break;
        case 'damage':
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `阵法效果：攻击伤害${effect.value}点！` });
          break;
        case 'lightning_damage':
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `阵法效果：引动雷霆，造成${effect.value}点雷电伤害！` });
          break;
        case 'void_damage':
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `阵法效果：撕裂虚空，造成${effect.value}点空间伤害！` });
          break;
        case 'damage_reflect':
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `阵法效果：反弹${(effect.value * 100).toFixed(0)}%伤害！` });
          break;
        case 'time_warp':
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `阵法效果：时间流速扭曲${effect.value}倍！` });
          break;
        case 'teleport':
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `阵法效果：开启跨域传送！` });
          break;
      }
    }

    if (effects.some(e => e.type === 'cultivation_speed')) {
      const speedEffect = effects.find(e => e.type === 'cultivation_speed');
      store.dispatch({ type: 'SET_CULTIVATION_MULTIPLIER', payload: speedEffect!.value });
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
  }

  private showAuction(store: any, narrative: any, modalManager?: any): void {
    const player = store.getState().player;

    if (!this.currentAuctionSession || this.currentAuctionSession.status === AuctionStatus.ENDED) {
      this.currentAuctionSession = generateAuctionSession();
      this.playerLockedGold = 0;
      this.playerBids.clear();

      for (const item of this.currentAuctionSession.items) {
        const seedItem = getItemById(item.itemId);
        item.itemName = seedItem?.name || '';
        item.itemIcon = seedItem?.icon || '◆';
        item.quality = seedItem?.quality || '';
      }

      this.startAuctionTimer(store);
      this.startNpcBidTimer(store);

      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【石城拍卖会】' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '拍卖会开始！四方修士云集，各类奇珍异宝即将开拍。' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '场中可见丹鼎宗长老、万宝楼掌柜、散修强者等人虎视眈眈...' });
    }

    const session = this.currentAuctionSession;
    const timeRemaining = Math.max(0, Math.floor((session.endTime - Date.now()) / 1000));
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    const rarityNames: Record<string, string> = {
      common: '普通', rare: '稀有', epic: '史诗', legendary: '传说', mythic: '神话',
    };

    const availableGold = player.gold - this.playerLockedGold;

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【石城拍卖会】剩余时间: ${minutes}分${seconds}秒` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `可用原始币: ${availableGold}（锁定: ${this.playerLockedGold}）` });

      const items = session.items.map((item: IAuctionItem) => {
        const seedItem = getItemById(item.itemId);
        const isBidder = item.currentBidder === player.name;
        const nextBid = item.currentPrice + item.increment;
        return {
          label: `${seedItem?.icon || '◆'} ${item.itemName}（${rarityNames[item.rarity]}）— 当前价: ${item.currentPrice}原始币${isBidder ? '（你领先）' : item.currentBidder ? `（${item.currentBidder}领先）` : ''}`,
          action: `出价 ${item.itemId} ${nextBid}`,
          desc: `加价幅度: ${item.increment} | ${seedItem?.desc || ''}`,
          disabled: availableGold < nextBid,
        };
      });
      narrative.pushClickableList('拍卖物品 · 点击出价', items);
      return;
    }

    modalManager.showInteractive('石城拍卖会', (container: HTMLElement) => {
      const header = document.createElement('div');
      header.className = 'auction-header';
      header.innerHTML = `
        <div>石城拍卖会 · 剩余时间: <span class="auction-time">${minutes}分${seconds}秒</span></div>
        <div class="auction-gold">可用原始币: <span class="gold">${availableGold}</span>（锁定: ${this.playerLockedGold}）</div>
      `;
      container.appendChild(header);

      const list = document.createElement('div');
      list.className = 'auction-list';

      for (const item of session.items) {
        const seedItem = getItemById(item.itemId);
        const isBidder = item.currentBidder === player.name;
        const nextBid = item.currentPrice + item.increment;
        const canAfford = availableGold >= nextBid;

        const aucCard = document.createElement('div');
        aucCard.className = `auction-card ${canAfford ? '' : 'disabled'} ${isBidder ? 'current-bidder' : ''}`;

        const icon = document.createElement('div');
        icon.className = 'auction-icon';
        icon.textContent = seedItem?.icon || '◆';

        const info = document.createElement('div');
        info.className = 'auction-info';

        const name = document.createElement('div');
        name.className = 'auction-name';
        let bidStatus = '';
        if (isBidder) {
          bidStatus = '【你领先】';
        } else if (item.currentBidder) {
          bidStatus = `【${item.currentBidder}领先】`;
        }
        name.textContent = `${item.itemName}（${rarityNames[item.rarity]}）${bidStatus}`;

        const desc = document.createElement('div');
        desc.className = 'auction-desc';
        desc.textContent = seedItem?.desc || '';

        const price = document.createElement('div');
        price.className = 'auction-price';
        price.innerHTML = `当前价: <span class="auction-current-price">${item.currentPrice}</span> | 加价幅度: ${item.increment} | 下次出价: ${nextBid}`;

        info.appendChild(name);
        info.appendChild(desc);
        info.appendChild(price);

        const btn = document.createElement('button');
        btn.className = `modal-btn ${canAfford ? 'modal-btn-primary' : 'modal-btn-disabled'}`;
        btn.textContent = canAfford ? `出价 ${nextBid}` : '金币不足';
        btn.disabled = !canAfford;
        btn.addEventListener('click', () => {
          this.bid(store, [item.itemId, String(nextBid)]);
          modalManager.close();
        });

        aucCard.appendChild(icon);
        aucCard.appendChild(info);
        aucCard.appendChild(btn);
        list.appendChild(aucCard);
      }

      container.appendChild(list);

      const footer = document.createElement('div');
      footer.className = 'auction-footer';
      footer.innerHTML = `<div>每日拍卖时间：9:00、15:00、21:00 | 出价后金币锁定，被超价则退还</div>`;
      container.appendChild(footer);
    }, { width: '650px', height: '500px' });
  }

  private startAuctionTimer(store: any): void {
    if (this.auctionTimer) {
      clearInterval(this.auctionTimer);
    }

    this.auctionTimer = window.setInterval(() => {
      if (!this.currentAuctionSession) return;

      const timeRemaining = Math.floor((this.currentAuctionSession.endTime - Date.now()) / 1000);
      if (timeRemaining <= 0) {
        this.endAuction(store);
        return;
      }
    }, 1000);
  }

  /** NPC定时竞价模拟——每15秒检查一次，NPC按兴趣度和预算随机出价 */
  private startNpcBidTimer(store: any): void {
    if (this.npcBidTimer) {
      clearInterval(this.npcBidTimer);
    }

    this.npcBidTimer = window.setInterval(() => {
      if (!this.currentAuctionSession || this.currentAuctionSession.status !== AuctionStatus.RUNNING) {
        return;
      }

      const player = store.getState().player;
      const session = this.currentAuctionSession;
      let anyNpcBid = false;

      for (const item of session.items) {
        // NPC不会对玩家正在领先的物品每次都竞价，按概率
        const isPlayerLeading = item.currentBidder === player.name;
        const baseChance = item.npcInterest || AUCTION_CONFIG.npcBidBaseChance;

        // 如果玩家领先，NPC竞价概率降低但仍有可能
        const bidChance = isPlayerLeading ? baseChance * 0.5 : baseChance;

        if (Math.random() > bidChance) continue;

        const nextBid = item.currentPrice + item.increment;

        // NPC不会超过预算
        if (nextBid > (item.npcMaxBudget || item.startingPrice * 3)) continue;

        // 随机选一个NPC名字
        const npcName = AUCTION_NPC_NAMES[Math.floor(Math.random() * AUCTION_NPC_NAMES.length)];
        if (npcName === item.currentBidder) continue;

        // 如果玩家之前领先，退还玩家锁定的金币
        if (isPlayerLeading) {
          const playerPrevBid = this.playerBids.get(item.itemId);
          if (playerPrevBid) {
            this.playerLockedGold -= playerPrevBid;
            this.playerBids.delete(item.itemId);
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【竞价】${npcName}出价 ${nextBid} 原始币竞拍【${item.itemName}】，超过你的出价！锁定金币已退还。` });
          }
        } else {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【出价】${npcName}出价 ${nextBid} 原始币竞拍【${item.itemName}】。` });
        }

        item.currentPrice = nextBid;
        item.currentBidder = npcName;
        anyNpcBid = true;
      }

      if (anyNpcBid) {
        store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
      }
    }, AUCTION_CONFIG.npcBidIntervalSeconds * 1000);
  }

  private endAuction(store: any): void {
    if (this.auctionTimer) {
      clearInterval(this.auctionTimer);
      this.auctionTimer = null;
    }
    if (this.npcBidTimer) {
      clearInterval(this.npcBidTimer);
      this.npcBidTimer = null;
    }

    const session = this.currentAuctionSession;
    if (!session) return;

    session.status = AuctionStatus.ENDED;

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【石城拍卖会结束】' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '拍卖槌落下，本场拍卖会圆满结束！' });

    const player = store.getState().player;
    let wonCount = 0;
    let totalSpent = 0;

    for (const item of session.items) {
      if (item.currentBidder === player.name) {
        wonCount++;
        totalSpent += item.currentPrice;
        const seedItem = getItemById(item.itemId);
        const newItem = {
          id: `auction_item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: seedItem?.name || item.itemName,
          desc: seedItem?.desc || '拍卖获得的物品',
          type: seedItem?.type || 'material',
          quality: seedItem?.quality || item.quality || '普通',
          price: item.currentPrice,
          stackable: seedItem?.stackable || true,
          maxStack: seedItem?.maxStack || 99,
          icon: seedItem?.icon || '◆',
          effect: seedItem?.effect,
          stats: seedItem?.stats,
          slot: seedItem?.slot,
        };
        player.inventory.push(newItem);
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ 恭喜！你以 ${item.currentPrice} 原始币拍得【${newItem.name}】！` });
      } else if (item.currentBidder) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◇ 【${item.itemName}】被${item.currentBidder}以 ${item.currentPrice} 原始币拍走。` });
      }
    }

    // 扣除拍得物品的金币（从锁定金币中扣除）
    player.gold -= totalSpent;
    this.playerLockedGold = 0;
    this.playerBids.clear();

    if (wonCount === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '本场拍卖你未拍得任何物品。' });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `本场共拍得 ${wonCount} 件物品，消耗 ${totalSpent} 原始币。` });
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: { gold: player.gold, inventory: player.inventory } });

    this.currentAuctionSession = null;
  }

  private bid(store: any, args: string[]): void {
    const player = store.getState().player;
    const itemId = args[0];
    const bidAmount = parseInt(args[1]);

    if (!itemId || isNaN(bidAmount)) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '出价失败：参数错误' });
      return;
    }

    if (!this.currentAuctionSession || this.currentAuctionSession.status !== AuctionStatus.RUNNING) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '拍卖会尚未开始或已结束！' });
      return;
    }

    const item = this.currentAuctionSession.items.find((i: IAuctionItem) => i.itemId === itemId);
    if (!item) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '未找到该拍卖物品！' });
      return;
    }

    if (bidAmount < item.currentPrice + item.increment) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `出价过低！当前价${item.currentPrice}，加价幅度${item.increment}，最低出价${item.currentPrice + item.increment}` });
      return;
    }

    const availableGold = player.gold - this.playerLockedGold;
    if (bidAmount > availableGold) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `可用原始币不足！你有 ${availableGold} 可用（锁定 ${this.playerLockedGold}）。` });
      return;
    }

    // 如果玩家之前在此物品上有出价，先退还锁定金币
    const prevPlayerBid = this.playerBids.get(item.itemId);
    if (prevPlayerBid) {
      this.playerLockedGold -= prevPlayerBid;
    }

    // 锁定新出价的金币
    this.playerLockedGold += bidAmount;
    this.playerBids.set(item.itemId, bidAmount);

    const prevBidder = item.currentBidder;

    if (prevBidder && prevBidder !== player.name) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【竞价】你以 ${bidAmount} 原始币竞价【${item.itemName}】，超过${prevBidder}！` });
    } else if (prevBidder === player.name) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【加价】你再次加价至 ${bidAmount} 原始币，继续竞拍【${item.itemName}】！` });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【出价】你首次出价 ${bidAmount} 原始币，竞拍【${item.itemName}】！` });
    }

    item.currentPrice = bidAmount;
    item.currentBidder = player.name;

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
  }

  private showAchievements(store: any, narrative: any, modalManager?: any): void {
    const player = store.getState().player;
    const categories: Record<AchievementCategory, string> = {
      [AchievementCategory.CULTIVATION]: '修炼',
      [AchievementCategory.BATTLE]: '战斗',
      [AchievementCategory.EXPLORATION]: '探索',
      [AchievementCategory.SOCIAL]: '社交',
      [AchievementCategory.COLLECTION]: '收集',
    };

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【成就系统】' });
      for (const category of Object.values(AchievementCategory)) {
        const categoryAchievements = SEED_ACHIEVEMENTS.filter(a => a.category === category);
        if (categoryAchievements.length > 0) {
          const achItems = categoryAchievements.map(ach => {
            const unlocked = player.achievements.find((a: any) => a.id === ach.id)?.unlocked;
            return {
              label: `${unlocked ? '✓' : '◇'} ${ach.icon} ${ach.name}`,
              action: unlocked ? '' : `查看成就 ${ach.id}`,
              desc: ach.description,
              disabled: unlocked,
            };
          });
          narrative.pushClickableList(`【${categories[category]}】`, achItems);
        }
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【称号】' });
      if (player.titles.length > 0) {
        const titleItems = player.titles.map((title: any) => ({
          label: `${title.icon} ${title.name}${player.currentTitleId === title.id ? '（当前）' : ''}`,
          action: `装备称号 ${title.id}`,
          desc: title.description,
          disabled: player.currentTitleId === title.id,
        }));
        narrative.pushClickableList('已获得称号 · 点击装备', titleItems);
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '  暂无称号，完成成就可获得称号。' });
      }
      return;
    }

    modalManager.showInteractive('成就系统', (container: HTMLElement) => {
      const achievementsSection = document.createElement('div');
      achievementsSection.className = 'achievements-section';

      for (const category of Object.values(AchievementCategory)) {
        const categoryAchievements = SEED_ACHIEVEMENTS.filter(a => a.category === category);
        if (categoryAchievements.length === 0) continue;

        const catHeader = document.createElement('div');
        catHeader.className = 'achievements-category-header';
        catHeader.textContent = `【${categories[category]}】`;
        achievementsSection.appendChild(catHeader);

        const catList = document.createElement('div');
        catList.className = 'achievements-category-list';

        for (const ach of categoryAchievements) {
          const unlocked = player.achievements.find((a: any) => a.id === ach.id)?.unlocked;

          const achCard = document.createElement('div');
          achCard.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;

          const icon = document.createElement('div');
          icon.className = 'achievement-icon';
          icon.textContent = unlocked ? '✓' : '◇';

          const info = document.createElement('div');
          info.className = 'achievement-info';

          const name = document.createElement('div');
          name.className = 'achievement-name';
          name.textContent = `${ach.icon} ${ach.name}`;

          const desc = document.createElement('div');
          desc.className = 'achievement-desc';
          desc.textContent = ach.description;

          info.appendChild(name);
          info.appendChild(desc);

          achCard.appendChild(icon);
          achCard.appendChild(info);
          catList.appendChild(achCard);
        }

        achievementsSection.appendChild(catList);
      }

      const titlesSection = document.createElement('div');
      titlesSection.className = 'titles-section';

      const titlesHeader = document.createElement('div');
      titlesHeader.className = 'achievements-category-header';
      titlesHeader.textContent = '【称号】';
      titlesSection.appendChild(titlesHeader);

      if (player.titles.length > 0) {
        const titlesList = document.createElement('div');
        titlesList.className = 'titles-list';

        for (const title of player.titles) {
          const isCurrent = player.currentTitleId === title.id;

          const titleCard = document.createElement('div');
          titleCard.className = `title-card ${isCurrent ? 'current' : ''}`;

          const info = document.createElement('div');
          info.className = 'title-info';

          const name = document.createElement('div');
          name.className = 'title-name';
          name.textContent = `${title.icon} ${title.name}${isCurrent ? '（当前）' : ''}`;

          const desc = document.createElement('div');
          desc.className = 'title-desc';
          desc.textContent = title.description;

          info.appendChild(name);
          info.appendChild(desc);

          const btn = document.createElement('button');
          btn.className = `modal-btn ${isCurrent ? 'modal-btn-disabled' : 'modal-btn-secondary'}`;
          btn.textContent = isCurrent ? '已装备' : '装备';
          btn.disabled = isCurrent;
          btn.addEventListener('click', () => {
            this.equipTitle(store, title.id);
            modalManager.close();
          });

          titleCard.appendChild(info);
          titleCard.appendChild(btn);
          titlesList.appendChild(titleCard);
        }

        titlesSection.appendChild(titlesList);
      } else {
        const empty = document.createElement('div');
        empty.className = 'modal-empty';
        empty.textContent = '暂无称号，完成成就可获得称号。';
        titlesSection.appendChild(empty);
      }

      container.appendChild(achievementsSection);
      container.appendChild(titlesSection);
    }, { width: '700px', height: '550px' });
  }

  private equipTitle(store: any, titleId: string): void {
    const player = store.getState().player;
    const title = player.titles.find((t: any) => t.id === titleId);
    if (!title) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '未找到该称号' });
      return;
    }
    player.currentTitleId = titleId;
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `已装备称号：${title.name}` });
    store.dispatch({ type: 'UPDATE_PLAYER', payload: { currentTitleId: player.currentTitleId } });
  }

  private viewAchievement(store: any, achId: string): void {
    const ach = SEED_ACHIEVEMENTS.find(a => a.id === achId);
    if (!ach) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '未找到该成就' });
      return;
    }
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${ach.icon} ${ach.name}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `描述：${ach.description}` });
    const reqDesc = ach.requirements.map(r => {
      const typeNames: Record<string, string> = {
        reach_realm: '达到境界', kill_monsters: '击杀怪物', complete_quests: '完成任务',
        discover_zones: '发现区域', collect_items: '收集物品', spend_gold: '消耗金币',
      };
      return `${typeNames[r.type] || r.type}: ${r.target}`;
    }).join(', ');
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `条件：${reqDesc}` });
    const rewardDesc = ach.rewards.map(r => {
      if (r.type === 'title') return `称号: ${r.value}`;
      if (r.type === 'gold') return `金币: ${r.value}`;
      if (r.type === 'stat_bonus') return `属性加成: ${r.statKey}+${r.value}`;
      return `${r.type}: ${r.value}`;
    }).join(', ');
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `奖励：${rewardDesc}` });
  }
}