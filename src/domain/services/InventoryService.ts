/**
 * 背包管理服务
 * 提供物品分类筛选、一键出售、物品用途提示等功能
 */

import { IItem, ItemType } from '../entities/Item';
import { getItemById } from '../../data/seed/items';

export type ItemCategory = 'all' | 'equipment' | 'elixir' | 'material' | 'special' | 'quest' | 'fragment';

export type SortType = 'quality' | 'name' | 'type' | 'price';
export type SortOrder = 'asc' | 'desc';

export interface IItemUsage {
  canUse: boolean;
  usageType: 'consume' | 'equip' | 'sell' | 'quest' | 'craft' | 'none';
  description: string;
  relatedRecipes?: string[];
  relatedQuests?: string[];
}

export class InventoryService {
  private static instance: InventoryService;

  private constructor() {}

  static getInstance(): InventoryService {
    if (!InventoryService.instance) {
      InventoryService.instance = new InventoryService();
    }
    return InventoryService.instance;
  }

  filterByCategory(items: IItem[], category: ItemCategory): IItem[] {
    if (category === 'all') return [...items];

    const typeMap: Record<ItemCategory, ItemType | null> = {
      all: null,
      equipment: ItemType.EQUIPMENT,
      elixir: ItemType.ELIXIR,
      material: ItemType.MATERIAL,
      special: ItemType.SPECIAL,
      quest: ItemType.QUEST,
      fragment: ItemType.FRAGMENT,
    };

    const targetType = typeMap[category];
    if (!targetType) return [...items];

    return items.filter(item => item.type === targetType);
  }

  filterByQuality(items: IItem[], quality: string): IItem[] {
    if (quality === 'all') return [...items];
    return items.filter(item => item.quality === quality);
  }

  filterByKeyword(items: IItem[], keyword: string): IItem[] {
    if (!keyword.trim()) return [...items];
    const kw = keyword.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(kw) ||
      item.desc.toLowerCase().includes(kw) ||
      item.id.toLowerCase().includes(kw)
    );
  }

  sortItems(items: IItem[], sortType: SortType, order: SortOrder = 'desc'): IItem[] {
    const result = [...items];
    const qualityOrder: Record<string, number> = {
      '凡品': 1, '良品': 2, '珍品': 3, '极品': 4, '仙品': 5, '神品': 6,
    };
    const typeOrder: Record<string, number> = {
      [ItemType.EQUIPMENT]: 1, [ItemType.ELIXIR]: 2, [ItemType.MATERIAL]: 3,
      [ItemType.SPECIAL]: 4, [ItemType.QUEST]: 5, [ItemType.FRAGMENT]: 6,
    };

    result.sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      switch (sortType) {
        case 'quality':
          valA = qualityOrder[a.quality] || 0;
          valB = qualityOrder[b.quality] || 0;
          break;
        case 'name':
          valA = a.name;
          valB = b.name;
          break;
        case 'type':
          valA = typeOrder[a.type] || 99;
          valB = typeOrder[b.type] || 99;
          break;
        case 'price':
          valA = a.price;
          valB = b.price;
          break;
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return order === 'asc' ? valA - valB : valB - valA;
      }
      if (typeof valA === 'string' && typeof valB === 'string') {
        return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return 0;
    });

    return result;
  }

  getItemUsage(item: IItem): IItemUsage {
    if (item.type === ItemType.EQUIPMENT) {
      return {
        canUse: true,
        usageType: 'equip',
        description: '可装备提升属性',
      };
    }

    if (item.type === ItemType.QUEST) {
      return {
        canUse: false,
        usageType: 'quest',
        description: '任务物品，不可出售或丢弃',
      };
    }

    if (item.effect) {
      const effectDescs: Record<string, string> = {
        heal: '使用后恢复气血',
        restore_mana: '使用后恢复法力',
        cultivation: '使用后增加修为',
        cure_poison: '使用后解除中毒',
        full_restore: '使用后完全恢复',
        breakthrough: '使用后提升突破成功率',
        buff_attack: '使用后提升攻击力',
        buff_defense: '使用后提升防御力',
        buff_speed: '使用后提升速度',
        buff_cultivation: '使用后提升修炼效率',
        stun: '对敌人造成眩晕效果',
        shield: '获得护盾保护',
        summon: '召唤助战单位',
      };

      const desc = effectDescs[item.effect.type] || '使用后产生特殊效果';

      return {
        canUse: true,
        usageType: 'consume',
        description: desc,
      };
    }

    if (item.type === ItemType.MATERIAL) {
      return {
        canUse: false,
        usageType: 'craft',
        description: '可用于炼丹、炼器或合成',
      };
    }

    if (item.type === ItemType.FRAGMENT) {
      return {
        canUse: false,
        usageType: 'craft',
        description: '集齐后可合成完整物品',
      };
    }

    if (item.type === ItemType.SPECIAL) {
      return {
        canUse: true,
        usageType: 'consume',
        description: '特殊道具，使用后产生特殊效果',
      };
    }

    return {
      canUse: false,
      usageType: 'none',
      description: '暂无用途',
    };
  }

  canSell(item: IItem): boolean {
    return item.type !== ItemType.QUEST && item.price > 0;
  }

  sellItem(items: IItem[], itemId: string, count: number = 1): { remaining: IItem[]; gold: number; sold: boolean } {
    const item = items.find(i => i.id === itemId);
    if (!item) return { remaining: items, gold: 0, sold: false };
    if (!this.canSell(item)) return { remaining: items, gold: 0, sold: false };

    const inventoryItem = items.find(i => i.id === itemId);
    if (!inventoryItem) return { remaining: items, gold: 0, sold: false };

    const actualCount = Math.min(count, 1);
    const gold = item.price * actualCount;

    const remaining = items.filter(i => i.id !== itemId);

    return { remaining, gold, sold: true };
  }

  sellAllByCategory(items: IItem[], category: ItemCategory, minQuality: string = '凡品'): {
    remaining: IItem[];
    gold: number;
    soldCount: number;
    soldItems: IItem[];
  } {
    const qualityOrder: Record<string, number> = {
      '凡品': 1, '良品': 2, '珍品': 3, '极品': 4, '仙品': 5, '神品': 6,
    };
    const minQualityVal = qualityOrder[minQuality] || 1;

    const toSell: IItem[] = [];
    const remaining: IItem[] = [];

    items.forEach(item => {
      const itemQualityVal = qualityOrder[item.quality] || 0;
      if (
        this.canSell(item) &&
        itemQualityVal <= minQualityVal &&
        (category === 'all' || this.matchesCategory(item, category))
      ) {
        toSell.push(item);
      } else {
        remaining.push(item);
      }
    });

    const gold = toSell.reduce((sum, item) => sum + item.price, 0);

    return {
      remaining,
      gold,
      soldCount: toSell.length,
      soldItems: toSell,
    };
  }

  sellAllJunk(items: IItem[]): {
    remaining: IItem[];
    gold: number;
    soldCount: number;
    soldItems: IItem[];
  } {
    return this.sellAllByCategory(items, 'all', '凡品');
  }

  private matchesCategory(item: IItem, category: ItemCategory): boolean {
    const typeMap: Record<ItemCategory, ItemType | null> = {
      all: null,
      equipment: ItemType.EQUIPMENT,
      elixir: ItemType.ELIXIR,
      material: ItemType.MATERIAL,
      special: ItemType.SPECIAL,
      quest: ItemType.QUEST,
      fragment: ItemType.FRAGMENT,
    };
    const targetType = typeMap[category];
    return !targetType || item.type === targetType;
  }

  getItemCount(items: IItem[], itemId: string): number {
    const item = items.find(i => i.id === itemId);
    return item ? (item.stackable ? (item as any).count || 1 : 1) : 0;
  }

  hasItem(items: IItem[], itemId: string, count: number = 1): boolean {
    return this.getItemCount(items, itemId) >= count;
  }

  getCategoryCounts(items: IItem[]): Record<ItemCategory, number> {
    const counts: Record<ItemCategory, number> = {
      all: items.length,
      equipment: 0,
      elixir: 0,
      material: 0,
      special: 0,
      quest: 0,
      fragment: 0,
    };

    items.forEach(item => {
      switch (item.type) {
        case ItemType.EQUIPMENT: counts.equipment++; break;
        case ItemType.ELIXIR: counts.elixir++; break;
        case ItemType.MATERIAL: counts.material++; break;
        case ItemType.SPECIAL: counts.special++; break;
        case ItemType.QUEST: counts.quest++; break;
        case ItemType.FRAGMENT: counts.fragment++; break;
      }
    });

    return counts;
  }

  getValueSummary(items: IItem[]): { totalValue: number; sellableValue: number; itemCount: number } {
    let totalValue = 0;
    let sellableValue = 0;

    items.forEach(item => {
      totalValue += item.price;
      if (this.canSell(item)) {
        sellableValue += item.price;
      }
    });

    return {
      totalValue,
      sellableValue,
      itemCount: items.length,
    };
  }

  getQualityColor(quality: string): string {
    const colors: Record<string, string> = {
      '凡品': '#9ca3af',
      '良品': '#22c55e',
      '珍品': '#3b82f6',
      '极品': '#a855f7',
      '仙品': '#f59e0b',
      '神品': '#ef4444',
    };
    return colors[quality] || '#9ca3af';
  }

  getQualityBgClass(quality: string): string {
    const classes: Record<string, string> = {
      '凡品': 'quality-common',
      '良品': 'quality-good',
      '珍品': 'quality-rare',
      '极品': 'quality-epic',
      '仙品': 'quality-legendary',
      '神品': 'quality-mythic',
    };
    return classes[quality] || 'quality-common';
  }
}

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  all: '全部',
  equipment: '装备',
  elixir: '丹药',
  material: '材料',
  special: '特殊',
  quest: '任务',
  fragment: '碎片',
};

export const CATEGORY_ICONS: Record<ItemCategory, string> = {
  all: '📦',
  equipment: '⚔',
  elixir: '⚗',
  material: '🪨',
  special: '✨',
  quest: '📜',
  fragment: '🧩',
};

export const QUALITY_LIST = ['凡品', '良品', '珍品', '极品', '仙品', '神品'];
