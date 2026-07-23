export enum ItemType {
  ELIXIR = '丹药',
  MATERIAL = '材料',
  EQUIPMENT = '装备',
  QUEST = '任务物品',
  SPECIAL = '特殊',
  FRAGMENT = '碎片',
}

export enum EquipmentSlot {
  WEAPON = '武器',
  ARMOR = '护甲',
  BOOTS = '靴子',
  ACCESSORY = '饰品',
  ARTIFACT = '法宝',
}

export interface IItem {
  id: string;
  name: string;
  type: ItemType;
  quality: '凡品' | '良品' | '珍品' | '极品' | '仙品' | '神品';
  desc: string;
  price: number;
  stackable: boolean;
  maxStack: number;
  icon: string;
  slot?: EquipmentSlot;
  stats?: {
    attack?: number;
    defense?: number;
    hp?: number;
    mana?: number;
    speed?: number;
    crit?: number;
  };
  effect?: {
    type: 'heal' | 'mana' | 'cultivation' | 'buff' | 'cure' | 'attack' | 'defense' |
          'cure_poison' | 'restore_mana' | 'restore_stamina' | 'full_restore' | 'comprehension' |
          'buff_strength' | 'buff_speed' | 'buff_defense' | 'buff_attack' | 'buff_cultivation' | 'buff_all' |
          'breakthrough' | 'heal_soul' | 'restore_meridian' | 'rebirth' |
          'invisibility' | 'water_breathing' | 'transformation' | 'youth' | 'reincarnation' | 'change_fate' |
          'poison' | 'soul_damage' | 'charm' |
          'noise' | 'ward' | 'attack_fire' | 'attack_ice' | 'attack_thunder' | 'shield' |
          'summon' | 'escape' | 'aoe_damage' | 'teleport' | 'stun' | 'seal' |
          'create_item' | 'trap' | 'damage_over_time' | 'illusion' | 'create_illusion' |
          'food' | 'pet' | 'mount' | 'learn_skill' | 'reveal_treasure' | 'open_dungeon' |
          'summon_powerful' | 'identify' | 'enchant' | 'resurrect' | 'unlock' | 'access' |
          'gamble' | 'fish' | 'fish_spirit' | 'calm' | 'buff_alchemy' | 'craft' | 'craft_spirit';
    value?: number;
    duration?: number;
  };
  runeSlots?: number;
  recipe?: Record<string, number>;
  /** 扩展元数据，用于功法残卷等特殊物品 */
  metadata?: any;
  /** 物品详细描述（兼容旧字段） */
  description?: string;
}