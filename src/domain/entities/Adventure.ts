import { CultivationRealm } from './Player';
import { TimeOfDay } from './GameTime';

export enum AdventureType {
  BLESSING = '天降机缘',
  COMBAT = '战斗奇遇',
  DISCOVERY = '发现奇遇',
  CHOICE = '选择奇遇',
  MYSTERY = '神秘奇遇',
}

export enum AdventureRarity {
  COMMON = '普通',
  RARE = '稀有',
  EPIC = '史诗',
  LEGEND = '传说',
}

export interface IAdventureOption {
  text: string;
  result: string;
  rewards?: {
    type: 'exp' | 'item' | 'gold' | 'technique' | 'realm' | 'talent';
    id?: string;
    amount: number;
  }[];
  penalties?: {
    type: 'hp' | 'mana' | 'gold';
    amount: number;
  }[];
}

export interface IAdventure {
  id: string;
  name: string;
  type: AdventureType;
  rarity: AdventureRarity;
  description: string;
  originStory: string;
  triggerCondition: {
    minRealm?: CultivationRealm;
    maxRealm?: CultivationRealm;
    timeOfDay?: TimeOfDay[];
    location?: string[];
    probability: number;
  };
  options?: IAdventureOption[];
  autoResult?: {
    text: string;
    rewards?: {
      type: 'exp' | 'item' | 'gold' | 'technique' | 'realm' | 'talent';
      id?: string;
      amount: number;
    }[];
  };
}

export const ADVENTURES: IAdventure[] = [
  {
    id: 'adventure_spirit_rain',
    name: '灵石雨',
    type: AdventureType.BLESSING,
    rarity: AdventureRarity.RARE,
    description: '天空中突然下起了灵石雨，漫天灵石如雨点般落下！',
    originStory: '灵石雨是天地灵气汇聚到极致时的自然现象，修士可趁机收集灵石加速修炼。',
    triggerCondition: { probability: 0.05, timeOfDay: [TimeOfDay.NOON, TimeOfDay.AFTERNOON] },
    autoResult: {
      text: '你趁着灵石雨收集了大量灵石，修为大增！',
      rewards: [
        { type: 'exp', amount: 200 },
        { type: 'gold', amount: 50 },
      ],
    },
  },
  {
    id: 'adventure_enlightenment',
    name: '悟道时刻',
    type: AdventureType.BLESSING,
    rarity: AdventureRarity.EPIC,
    description: '你突然进入了一种玄妙的悟道状态，天地大道在你眼前清晰展现。',
    originStory: '悟道时刻是修士梦寐以求的机缘，在悟道状态下可快速提升修为，甚至领悟新的法则。',
    triggerCondition: { probability: 0.02, minRealm: CultivationRealm.CAVE },
    autoResult: {
      text: '你在悟道状态下感悟颇深，修为暴涨！',
      rewards: [
        { type: 'exp', amount: 1000 },
      ],
    },
  },
  {
    id: 'adventure_ancient_tomb',
    name: '古墓发现',
    type: AdventureType.DISCOVERY,
    rarity: AdventureRarity.EPIC,
    description: '你发现了一座古老的墓穴，墓门上刻着太古符文。似乎里面埋葬着一位远古强者。',
    originStory: '古墓是远古强者陨落后留下的墓地，里面可能藏有传承和宝物，但也可能暗藏危机。',
    triggerCondition: { probability: 0.03, minRealm: CultivationRealm.SPIRIT },
    options: [
      {
        text: '进入墓穴探索',
        result: '你小心翼翼地进入墓穴，发现了一具远古强者的遗骸和一本功法。',
        rewards: [
          { type: 'exp', amount: 500 },
          { type: 'technique', id: 'qingluan_baoshu', amount: 1 },
        ],
        penalties: [{ type: 'hp', amount: 30 }],
      },
      {
        text: '离开此地',
        result: '你决定不冒险，离开了古墓。',
      },
    ],
  },
  {
    id: 'adventure_beast_tide',
    name: '兽潮来袭',
    type: AdventureType.COMBAT,
    rarity: AdventureRarity.RARE,
    description: '远方传来震天的兽吼声，一群凶兽正向你冲来！',
    originStory: '兽潮是荒域常见的灾难，大量凶兽聚集形成兽潮，所过之处寸草不生。',
    triggerCondition: { probability: 0.08, minRealm: CultivationRealm.BLOOD_MOVING },
    options: [
      {
        text: '迎战兽潮',
        result: '你勇敢地迎战兽潮，经过一番激战，击退了凶兽，获得了大量修为和材料。',
        rewards: [
          { type: 'exp', amount: 300 },
          { type: 'gold', amount: 30 },
        ],
        penalties: [{ type: 'hp', amount: 50 }, { type: 'mana', amount: 20 }],
      },
      {
        text: '逃离此地',
        result: '你迅速逃离了兽潮的范围，虽然没获得什么，但保住了性命。',
        penalties: [{ type: 'hp', amount: 10 }],
      },
    ],
  },
  {
    id: 'adventure_mysterious_merchant',
    name: '神秘商人',
    type: AdventureType.CHOICE,
    rarity: AdventureRarity.RARE,
    description: '一位戴着斗笠的神秘商人出现在你面前，他打开了一个布满符文的箱子。',
    originStory: '神秘商人游走于荒域各地，出售各种稀奇古怪的物品。他们的来历神秘，但货物往往物超所值。',
    triggerCondition: { probability: 0.06, timeOfDay: [TimeOfDay.DUSK, TimeOfDay.NIGHT] },
    options: [
      {
        text: '花费50金币购买',
        result: '你花费50金币购买了一个神秘物品，打开一看是一颗珍贵的聚气丹！',
        rewards: [{ type: 'item', id: 'exp_pill', amount: 1 }],
        penalties: [{ type: 'gold', amount: 50 }],
      },
      {
        text: '花费100金币购买',
        result: '你花费100金币购买了一个神秘物品，打开一看是一本古老的宝术残卷！',
        rewards: [{ type: 'technique', id: 'taotie_baoshu', amount: 1 }],
        penalties: [{ type: 'gold', amount: 100 }],
      },
      {
        text: '拒绝交易',
        result: '你婉拒了神秘商人的交易，他微微一笑后消失在夜色中。',
      },
    ],
  },
  {
    id: 'adventure_dragon_blood',
    name: '真龙血池',
    type: AdventureType.BLESSING,
    rarity: AdventureRarity.LEGEND,
    description: '你发现了一个隐藏的洞穴，洞穴中央有一个血红色的池子，散发着真龙的气息！',
    originStory: '真龙血池是太古真龙陨落后留下的血池，浸泡其中可淬炼肉身，甚至觉醒真龙血脉。',
    triggerCondition: { probability: 0.01, minRealm: CultivationRealm.SPIRIT },
    options: [
      {
        text: '浸泡真龙血',
        result: '你跳入真龙血池，剧痛过后感到全身充满了力量，觉醒了真龙血脉！',
        rewards: [
          { type: 'exp', amount: 2000 },
          { type: 'talent', id: 'talent_long_xue', amount: 1 },
        ],
        penalties: [{ type: 'hp', amount: 80 }],
      },
      {
        text: '只取一些龙血',
        result: '你小心地取了一些真龙血，虽然没觉醒血脉，但也获得了不少修为。',
        rewards: [
          { type: 'exp', amount: 500 },
          { type: 'item', id: 'dragon_blood', amount: 1 },
        ],
      },
      {
        text: '离开此地',
        result: '你担心真龙血池有危险，决定离开。',
      },
    ],
  },
  {
    id: 'adventure_ancient_inheritance',
    name: '上古传承',
    type: AdventureType.MYSTERY,
    rarity: AdventureRarity.LEGEND,
    description: '你感到一股神秘的召唤，似乎有什么东西在引导你前往某个方向。',
    originStory: '上古传承是远古强者留下的传承之力，有缘者可获得强者的毕生所学。',
    triggerCondition: { probability: 0.015, minRealm: CultivationRealm.INSCRIBE },
    options: [
      {
        text: '跟随召唤',
        result: '你跟随神秘的召唤来到一处秘境，获得了一位上古强者的传承！',
        rewards: [
          { type: 'exp', amount: 3000 },
          { type: 'technique', id: 'liushen_fa', amount: 1 },
        ],
      },
      {
        text: '无视召唤',
        result: '你忽略了神秘的召唤，继续自己的旅程。',
      },
    ],
  },
  {
    id: 'adventure_spirit_vein',
    name: '灵脉发现',
    type: AdventureType.DISCOVERY,
    rarity: AdventureRarity.EPIC,
    description: '你无意中发现了一处隐藏的灵脉，灵气浓郁到近乎实质！',
    originStory: '灵脉是天地灵气汇聚之地，在灵脉上修炼可事半功倍，是修士梦寐以求的修炼圣地。',
    triggerCondition: { probability: 0.04, minRealm: CultivationRealm.CAVE },
    autoResult: {
      text: '你在灵脉处修炼了一段时间，修为大幅提升！',
      rewards: [{ type: 'exp', amount: 800 }],
    },
  },
  {
    id: 'adventure_broken_array',
    name: '残破阵法',
    type: AdventureType.MYSTERY,
    rarity: AdventureRarity.RARE,
    description: '你发现了一个残破的阵法，阵法中还残留着一些灵力。',
    originStory: '残破阵法是远古时期布置的阵法遗留，修复后可获得阵法的力量。',
    triggerCondition: { probability: 0.05, minRealm: CultivationRealm.CAVE },
    options: [
      {
        text: '尝试修复阵法',
        result: '你花费了一些时间修复阵法，阵法启动后为你注入了一股灵力！',
        rewards: [
          { type: 'exp', amount: 400 },
        ],
        penalties: [{ type: 'mana', amount: 30 }],
      },
      {
        text: '拆解阵法材料',
        result: '你拆解了阵法，获得了一些灵石和材料。',
        rewards: [
          { type: 'gold', amount: 40 },
          { type: 'item', id: 'spirit_crystal', amount: 1 },
        ],
      },
    ],
  },
  {
    id: 'adventure_moonlight',
    name: '月光洗礼',
    type: AdventureType.BLESSING,
    rarity: AdventureRarity.COMMON,
    description: '今夜的月光格外明亮，月光中蕴含着一丝天地灵气。',
    originStory: '月光洗礼是月圆之夜特有的现象，月光中蕴含的灵气可帮助修士净化肉身。',
    triggerCondition: { probability: 0.1, timeOfDay: [TimeOfDay.NIGHT, TimeOfDay.MIDNIGHT] },
    autoResult: {
      text: '你在月光下修炼，感到浑身舒畅，修为有所提升。',
      rewards: [{ type: 'exp', amount: 100 }],
    },
  },
];

export function rollAdventure(realm: CultivationRealm, timeOfDay: TimeOfDay, location?: string): IAdventure | null {
  const eligible = ADVENTURES.filter(adv => {
    const cond = adv.triggerCondition;
    if (cond.minRealm !== undefined && realm < cond.minRealm) return false;
    if (cond.maxRealm !== undefined && realm > cond.maxRealm) return false;
    if (cond.timeOfDay && !cond.timeOfDay.includes(timeOfDay)) return false;
    if (cond.location && location && !cond.location.includes(location)) return false;
    return true;
  });
  
  for (const adv of eligible) {
    if (Math.random() < adv.triggerCondition.probability) {
      return adv;
    }
  }
  return null;
}

export function findAdventure(id: string): IAdventure | undefined {
  return ADVENTURES.find(a => a.id === id);
}