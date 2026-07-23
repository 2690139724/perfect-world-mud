import { ICommandHandler, ICommandContext } from './CommandRouter';
import { findShop } from '../../data/shop/shop_data';
import { IItem, ItemType, EquipmentSlot } from '../../domain/entities/Item';
import { getQualityStars, getQualityStyle } from '../../domain/utils/QualityUtils';
import { ShopPriceService } from '../../domain/services/ShopPriceService';

export class ShopCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['shop', '商店', 'buy', '购买', 'sell', '出售', '出售列表'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;
    
    switch (action) {
      case 'shop':
      case '商店':
        this.showShop(store, narrative, modalManager);
        break;
      case 'buy':
      case '购买':
        this.buyItem(store, args.join(' '));
        break;
      case '出售列表':
        this.showSellList(store, narrative, modalManager);
        break;
      case 'sell':
      case '出售':
        this.sellItem(store, args[0]);
        break;
    }
  }

  private showShop(store: any, narrative: any, modalManager: any): void {
    const roomId = store.getState().player.currentRoomId;
    const shop = findShop(roomId);
    if (!shop) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '此处没有可交易的商铺或小摊。' });
      return;
    }
    const p = store.getState().player;
    const pGold = p.gold;
    const priceService = ShopPriceService.getInstance();
    const ownerId = shop.ownerId || `shop_${roomId}`;
    const shopType = shop.shopType || 'general';

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: shop.greeting });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[CARD:status]${shop.name}　灵石: ${pGold}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[/CARD]' });
      const shopItems = shop.items.map(entry => {
        const stockStr = entry.stock === -1 ? '∞' : String(entry.stock);
        const statsStr = entry.item.stats
          ? Object.entries(entry.item.stats)
            .filter(([, v]) => !!v)
            .map(([k, v]) => ({ 'attack': '攻', 'defense': '防', 'hp': '血', 'mana': '法', 'speed': '速' }[k] || k) + `+${v}`)
            .join(' ')
          : '';
        const extra = entry.item.slot ? `[${entry.item.slot}]` : '';
        const soldOut = entry.stock === 0;
        const qualityStars = getQualityStars(entry.item.quality);
        // 计算实际买价
        const calculated = priceService.calculatePrice(entry.item, p, ownerId, shopType);
        const displayPrice = calculated.finalBuyPrice;
        const priceNote = calculated.finalBuyPrice !== entry.price ? `（原${entry.price}）` : '';
        return {
          label: `${qualityStars} ${entry.item.name} ${extra}${statsStr ? ' ' + statsStr : ''} — ${displayPrice}枚${priceNote} (库存:${stockStr})`,
          action: `购买 ${entry.item.id}`,
          desc: entry.item.desc,
          disabled: soldOut || pGold < displayPrice,
        };
      });
      shopItems.push({ label: '▼ 出售背包物品', action: '出售列表', desc: '查看背包并出售物品', disabled: false });
      narrative.pushClickableList(`${shop.name} · 商品交易`, shopItems);
      return;
    }

    modalManager.showInteractive(`${shop.name} · 商品交易`, (container: HTMLElement) => {
      const header = document.createElement('div');
      header.className = 'shop-header';
      header.innerHTML = `<div>${shop.greeting}</div><div class="shop-gold">你的金币: <span class="gold">${pGold}</span></div>`;
      container.appendChild(header);

      const itemList = document.createElement('div');
      itemList.className = 'shop-items';

      for (const entry of shop.items) {
        const stockStr = entry.stock === -1 ? '∞' : String(entry.stock);
        const soldOut = entry.stock === 0;
        const canAfford = pGold >= entry.price;
        const qualityStyle = getQualityStyle(entry.item.quality);
        
        const itemCard = document.createElement('div');
        itemCard.className = `shop-item-card ${soldOut ? 'disabled' : ''}`;
        itemCard.style.borderColor = qualityStyle.color;
        itemCard.style.backgroundColor = qualityStyle.backgroundColor;
        
        const quality = document.createElement('div');
        quality.className = 'shop-item-quality';
        quality.textContent = getQualityStars(entry.item.quality);
        quality.style.color = qualityStyle.color;
        
        const info = document.createElement('div');
        info.className = 'shop-item-info';
        
        const nameRow = document.createElement('div');
        nameRow.className = 'shop-item-name';
        nameRow.innerHTML = `<span>${entry.item.name}</span>`;
        if (entry.item.quality) {
          nameRow.innerHTML += `<span class="shop-item-quality">·${entry.item.quality}</span>`;
        }
        info.appendChild(nameRow);
        
        if (entry.item.stats) {
          const stats = document.createElement('div');
          stats.className = 'shop-item-stats';
          stats.innerHTML = Object.entries(entry.item.stats)
            .filter(([, v]) => !!v)
            .map(([k, v]) => {
              const statNames: Record<string, string> = { attack: '攻击', defense: '防御', hp: '气血', mana: '法力', speed: '速度' };
              return `<span>${statNames[k] || k}+${v}</span>`;
            }).join(' ');
          info.appendChild(stats);
        }
        
        if (entry.item.desc) {
          const desc = document.createElement('div');
          desc.className = 'shop-item-desc';
          desc.textContent = entry.item.desc;
          info.appendChild(desc);
        }
        
        const priceRow = document.createElement('div');
        priceRow.className = 'shop-item-price';
        priceRow.innerHTML = `<span>价格：${entry.price}金币</span><span class="shop-item-stock">库存：${stockStr}</span>`;
        info.appendChild(priceRow);
        
        const btn = document.createElement('button');
        btn.className = `modal-btn ${soldOut ? 'modal-btn-disabled' : (canAfford ? 'modal-btn-primary' : 'modal-btn-disabled')}`;
        btn.textContent = soldOut ? '售罄' : (canAfford ? '购买' : '金币不足');
        btn.disabled = soldOut || !canAfford;
        btn.addEventListener('click', () => {
          modalManager.close();
          this.buyItem(store, entry.item.id);
        });
        
        itemCard.appendChild(quality);
        itemCard.appendChild(info);
        itemCard.appendChild(btn);
        itemList.appendChild(itemCard);
      }
      
      const sellBtn = document.createElement('button');
      sellBtn.className = 'modal-btn modal-btn-secondary sell-all-btn';
      sellBtn.textContent = '出售背包物品';
      sellBtn.addEventListener('click', () => {
        modalManager.close();
        this.showSellList(store, narrative, modalManager);
      });
      
      container.appendChild(itemList);
      container.appendChild(sellBtn);
    }, { width: '700px', height: '500px' });
  }

  private buyItem(store: any, itemId: string): void {
    if (!itemId) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请点击商品进行购买。' });
      return;
    }
    const roomId = store.getState().player.currentRoomId;
    const shop = findShop(roomId);
    if (!shop) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '此处没有商铺。' });
      return;
    }
    const entry = shop.items.find(e => e.item.id === itemId);
    if (!entry) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '该商品不在商铺中。' });
      return;
    }
    if (entry.stock === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${entry.item.name} 已售罄。` });
      return;
    }
    const p = store.getState().player;
    // 接入 ShopPriceService 计算实际买价（受 NPC 关系/名声/事件影响）
    const priceService = ShopPriceService.getInstance();
    const ownerId = shop.ownerId || `shop_${roomId}`;
    const calculated = priceService.calculatePrice(entry.item, p, ownerId, shop.shopType || 'general');
    const finalPrice = calculated.finalBuyPrice;

    // 检查是否可以购买（敌对关系拒绝交易）
    const canBuy = priceService.canBuy(entry.item, p, ownerId);
    if (!canBuy.canBuy) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: canBuy.reason || '无法购买。' });
      return;
    }

    if (p.gold < finalPrice) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `灵石不足。需要 ${finalPrice} 枚，当前 ${p.gold} 枚。` });
      return;
    }
    p.gold -= finalPrice;
    const boughtItem = { ...entry.item };
    p.inventory.push(boughtItem);
    if (entry.stock > 0) entry.stock--;
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    // 显示价格明细（若有修正）
    if (calculated.modifiers.length > 0) {
      const modDesc = calculated.modifiers.map(m => m.description).join('，');
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `购得 ${boughtItem.name}，花费 ${finalPrice} 枚（原价 ${entry.price}，${modDesc}），余 ${p.gold} 枚。` });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `购得 ${boughtItem.name}，花费 ${finalPrice} 枚（余 ${p.gold} 枚）。` });
    }
  }

  private showSellList(store: any, narrative: any, modalManager: any): void {
    const p = store.getState().player;
    if (p.inventory.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '背包空空如也，无可出售之物。' });
      return;
    }

    if (!modalManager) {
      const sellItems = p.inventory.map((it: IItem, idx: number) => {
        const sellPrice = Math.floor(it.price * 0.5);
        const statsStr = it.stats
          ? Object.entries(it.stats)
            .filter(([, v]) => !!v)
            .map(([k, v]) => ({ 'attack': '攻', 'defense': '防', 'hp': '血', 'mana': '法', 'speed': '速' }[k] || k) + `+${v}`)
            .join(' ')
          : '';
        return {
          label: `${it.icon} ${it.name} ${statsStr} — 售价 ${sellPrice}枚`,
          action: `出售 ${idx}`,
          desc: it.desc,
          disabled: sellPrice <= 0,
        };
      });
      narrative.pushClickableList('背包物品 · 点击出售', sellItems);
      return;
    }

    modalManager.showInteractive('出售背包物品', (container: HTMLElement) => {
      const header = document.createElement('div');
      header.className = 'sell-header';
      header.innerHTML = `<div>你的金币：<span class="gold">${p.gold}</span></div><div>出售价格为原价的50%</div>`;
      container.appendChild(header);

      const itemList = document.createElement('div');
      itemList.className = 'sell-items';

      for (let idx = 0; idx < p.inventory.length; idx++) {
        const it = p.inventory[idx];
        const sellPrice = Math.floor(it.price * 0.5);
        const cannotSell = sellPrice <= 0;
        const qualityStyle = getQualityStyle(it.quality);
        
        const itemCard = document.createElement('div');
        itemCard.className = `sell-item-card ${cannotSell ? 'disabled' : ''}`;
        itemCard.style.borderColor = qualityStyle.color;
        itemCard.style.backgroundColor = qualityStyle.backgroundColor;
        
        const quality = document.createElement('div');
        quality.className = 'sell-item-quality';
        quality.textContent = getQualityStars(it.quality);
        quality.style.color = qualityStyle.color;
        
        const info = document.createElement('div');
        info.className = 'sell-item-info';
        
        const nameRow = document.createElement('div');
        nameRow.className = 'sell-item-name';
        nameRow.textContent = it.name;
        info.appendChild(nameRow);
        
        if (it.stats) {
          const stats = document.createElement('div');
          stats.className = 'sell-item-stats';
          stats.innerHTML = Object.entries(it.stats)
            .filter(([, v]) => !!v)
            .map(([k, v]) => {
              const statNames: Record<string, string> = { attack: '攻击', defense: '防御', hp: '气血', mana: '法力', speed: '速度' };
              return `<span>${statNames[k] || k}+${v}</span>`;
            }).join(' ');
          info.appendChild(stats);
        }
        
        const priceRow = document.createElement('div');
        priceRow.className = 'sell-item-price';
        priceRow.textContent = `售价：${sellPrice}金币`;
        info.appendChild(priceRow);
        
        const btn = document.createElement('button');
        btn.className = `modal-btn ${cannotSell ? 'modal-btn-disabled' : 'modal-btn-primary'}`;
        btn.textContent = cannotSell ? '无法出售' : '出售';
        btn.disabled = cannotSell;
        btn.addEventListener('click', () => {
          modalManager.close();
          this.sellItem(store, String(idx));
        });
        
        itemCard.appendChild(quality);
        itemCard.appendChild(info);
        itemCard.appendChild(btn);
        itemList.appendChild(itemCard);
      }
      
      container.appendChild(itemList);
    }, { width: '650px', height: '450px' });
  }

  private sellItem(store: any, idxStr: string): void {
    const idx = parseInt(idxStr);
    const p = store.getState().player;
    if (isNaN(idx) || idx < 0 || idx >= p.inventory.length) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '无效的物品序号。' });
      return;
    }
    const item = p.inventory[idx];
    // 接入 ShopPriceService 计算实际卖价
    const roomId = store.getState().player.currentRoomId;
    const shop = findShop(roomId);
    const priceService = ShopPriceService.getInstance();
    const ownerId = shop?.ownerId || `shop_${roomId}`;
    const calculated = priceService.calculatePrice(item, p, ownerId, shop?.shopType || 'general');
    const sellPrice = calculated.finalSellPrice;

    if (sellPrice <= 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '此物品无法出售。' });
      return;
    }
    p.gold += sellPrice;
    p.inventory.splice(idx, 1);
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    // 显示价格明细（若有修正）
    if (calculated.modifiers.length > 0) {
      const modDesc = calculated.modifiers.map(m => m.description).join('，');
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `出售 ${item.name}，获得 ${sellPrice} 枚（原价 ${item.price}，${modDesc}），余 ${p.gold} 枚。` });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `出售 ${item.name}，获得 ${sellPrice} 枚灵石（余 ${p.gold} 枚）。` });
    }
  }
}