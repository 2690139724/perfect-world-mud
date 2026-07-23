import { IPlayer } from '../entities/Player';
import { IItem } from '../entities/Item';
import { NPCRelationshipService } from './NPCRelationshipService';
import { NPCRelationshiptatus } from '../entities/NPCRelationship';
import { NPCInteractionService } from './NPCInteractionService';

export interface IPriceModifier {
  source: string;
  description: string;
  buyMultiplier: number;
  sellMultiplier: number;
}

export interface ICalculatedPrice {
  basePrice: number;
  finalBuyPrice: number;
  finalSellPrice: number;
  modifiers: IPriceModifier[];
}

export class ShopPriceService {
  private static instance: ShopPriceService;
  private globalEvents: Map<string, { multiplier: number; expiresAt: number }> = new Map();

  private constructor() {}

  static getInstance(): ShopPriceService {
    if (!ShopPriceService.instance) {
      ShopPriceService.instance = new ShopPriceService();
    }
    return ShopPriceService.instance;
  }

  /**
   * 计算商品价格
   * @param item 物品
   * @param player 玩家
   * @param shopOwnerId 商店老板NPC ID
   * @param shopType 商店类型
   */
  calculatePrice(
    item: IItem,
    player: IPlayer,
    shopOwnerId: string,
    shopType: string = 'general',
  ): ICalculatedPrice {
    const basePrice = item.price;
    const modifiers: IPriceModifier[] = [];

    // 1. NPC关系折扣
    const rel = NPCRelationshipService.getRelationship(player.id, shopOwnerId);
    let relationMultiplier = 1.0;
    let relationSellMultiplier = 1.0;
    let relationDesc = '';

    switch (rel.status) {
      case NPCRelationshiptatus.ALLY:
        relationMultiplier = 0.7;
        relationSellMultiplier = 1.3;
        relationDesc = '至交折扣 -30%';
        break;
      case NPCRelationshiptatus.TRUSTED:
        relationMultiplier = 0.8;
        relationSellMultiplier = 1.2;
        relationDesc = '信任折扣 -20%';
        break;
      case NPCRelationshiptatus.FRIENDLY:
        relationMultiplier = 0.9;
        relationSellMultiplier = 1.1;
        relationDesc = '友善折扣 -10%';
        break;
      case NPCRelationshiptatus.UNFRIENDLY:
        relationMultiplier = 1.2;
        relationSellMultiplier = 0.8;
        relationDesc = '冷淡加价 +20%';
        break;
      case NPCRelationshiptatus.HOSTILE:
        relationMultiplier = 2.0;
        relationSellMultiplier = 0.5;
        relationDesc = '敌对加价 +100%';
        break;
    }

    if (relationDesc) {
      modifiers.push({
        source: 'relationship',
        description: relationDesc,
        buyMultiplier: relationMultiplier,
        sellMultiplier: relationSellMultiplier,
      });
    }

    // 2. 名声影响
    const memory = NPCInteractionService.getInstance().getMemory(shopOwnerId);
    const playerReputation = memory.aboutPlayer.playerReputation;
    let reputationMultiplier = 1.0;
    let reputationDesc = '';

    if (playerReputation === 'villainous' || playerReputation === 'cruel') {
      reputationMultiplier = 1.3;
      reputationDesc = '恶名昭彰 +30%';
    } else if (playerReputation === 'noble' || playerReputation === 'honest') {
      reputationMultiplier = 0.95;
      reputationDesc = '善名远播 -5%';
    } else if (playerReputation === 'cunning') {
      reputationMultiplier = 1.1;
      reputationDesc = '狡猾之名 +10%';
    }

    if (reputationDesc) {
      modifiers.push({
        source: 'reputation',
        description: reputationDesc,
        buyMultiplier: reputationMultiplier,
        sellMultiplier: 1.0,
      });
    }

    // 3. 商店类型专业加成
    let typeMultiplier = 1.0;
    let typeDesc = '';
    switch (shopType) {
      case 'blacksmith':
        if (item.type.toString() === '装备') {
          typeMultiplier = 0.95;
          typeDesc = '铁匠铺专业 -5%';
        }
        break;
      case 'alchemy':
        if (item.type.toString() === '丹药') {
          typeMultiplier = 0.95;
          typeDesc = '丹药铺专业 -5%';
        }
        break;
      case 'general':
        typeMultiplier = 1.0;
        break;
    }

    if (typeDesc) {
      modifiers.push({
        source: 'shop_type',
        description: typeDesc,
        buyMultiplier: typeMultiplier,
        sellMultiplier: 1.0,
      });
    }

    // 4. 全局事件影响
    let eventMultiplier = 1.0;
    for (const [eventId, event] of this.globalEvents) {
      if (event.expiresAt > Date.now()) {
        eventMultiplier *= event.multiplier;
      }
    }

    if (eventMultiplier !== 1.0) {
      modifiers.push({
        source: 'global_event',
        description: eventMultiplier > 1 ? '市场波动 +' + Math.round((eventMultiplier - 1) * 100) + '%' : '市场优惠 -' + Math.round((1 - eventMultiplier) * 100) + '%',
        buyMultiplier: eventMultiplier,
        sellMultiplier: eventMultiplier,
      });
    }

    // 5. 批量购买折扣
    // (这个需要在外部根据购买数量计算)

    // 计算最终价格
    let totalBuyMultiplier = 1.0;
    let totalSellMultiplier = 1.0;

    for (const mod of modifiers) {
      totalBuyMultiplier *= mod.buyMultiplier;
      totalSellMultiplier *= mod.sellMultiplier;
    }

    // 限制价格波动范围
    totalBuyMultiplier = Math.max(0.5, Math.min(3.0, totalBuyMultiplier));
    totalSellMultiplier = Math.max(0.3, Math.min(2.0, totalSellMultiplier));

    const finalBuyPrice = Math.round(basePrice * totalBuyMultiplier);
    const finalSellPrice = Math.round(basePrice * totalSellMultiplier * 0.6); // 卖出价格基础是买入价的60%

    return {
      basePrice,
      finalBuyPrice,
      finalSellPrice,
      modifiers,
    };
  }

  /**
   * 添加全局价格事件
   * @param eventId 事件ID
   * @param multiplier 价格倍率
   * @param durationMinutes 持续时间（分钟）
   */
  addGlobalPriceEvent(eventId: string, multiplier: number, durationMinutes: number): void {
    this.globalEvents.set(eventId, {
      multiplier,
      expiresAt: Date.now() + durationMinutes * 60 * 1000,
    });
  }

  /**
   * 移除全局价格事件
   */
  removeGlobalPriceEvent(eventId: string): void {
    this.globalEvents.delete(eventId);
  }

  /**
   * 获取当前活跃的全局价格事件
   */
  getActivePriceEvents(): { eventId: string; multiplier: number; remainingMinutes: number }[] {
    const now = Date.now();
    const active: { eventId: string; multiplier: number; remainingMinutes: number }[] = [];

    for (const [eventId, event] of this.globalEvents) {
      if (event.expiresAt > now) {
        active.push({
          eventId,
          multiplier: event.multiplier,
          remainingMinutes: Math.round((event.expiresAt - now) / 60000),
        });
      }
    }

    return active;
  }

  /**
   * 检查玩家是否可以购买
   */
  canBuy(item: IItem, player: IPlayer, shopOwnerId: string): { canBuy: boolean; reason?: string } {
    const price = this.calculatePrice(item, player, shopOwnerId);

    if (player.gold < price.finalBuyPrice) {
      return { canBuy: false, reason: '灵石不足' };
    }

    const rel = NPCRelationshipService.getRelationship(player.id, shopOwnerId);
    if (rel.status === NPCRelationshiptatus.HOSTILE) {
      return { canBuy: false, reason: '对方拒绝与你交易' };
    }

    return { canBuy: true };
  }

  /**
   * 格式化价格信息为字符串
   */
  formatPriceInfo(calculated: ICalculatedPrice): string {
    const lines: string[] = [];
    lines.push(`基础价格: ${calculated.basePrice} 灵石`);

    for (const mod of calculated.modifiers) {
      const icon = mod.buyMultiplier < 1 ? '🟢' : mod.buyMultiplier > 1 ? '🔴' : '⚪';
      lines.push(`${icon} ${mod.description}`);
    }

    lines.push(`---`);
    lines.push(`💰 买入: ${calculated.finalBuyPrice} 灵石`);
    lines.push(`💎 卖出: ${calculated.finalSellPrice} 灵石`);

    return lines.join('\n');
  }
}
