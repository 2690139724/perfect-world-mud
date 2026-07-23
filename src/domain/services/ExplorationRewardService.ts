import { IPlayer, CultivationRealm } from '../entities/Player';
import { IZone } from '../entities/Zone';
import { World } from '../World';

export interface IExplorationReward {
  zoneId: string;
  zoneName: string;
  tier: 30 | 60 | 100;
  type: 'title' | 'shop_unlock' | 'secret_realm';
  name: string;
  description: string;
  effect?: {
    stat?: Partial<Record<'attack' | 'defense' | 'maxHp' | 'maxMana' | 'speed' | 'spiritAbsorbRate', number>>;
    expBonus?: number;
    goldBonus?: number;
  };
}

const ZONE_REWARDS: Record<string, { t30?: IExplorationReward; t60?: IExplorationReward; t100?: IExplorationReward }> = {
  'stone_village': {
    t30: {
      zoneId: 'stone_village', zoneName: '青云村', tier: 30,
      type: 'shop_unlock', name: '村老杂货',
      description: '青云村的老人对你信任了几分，杂货铺打开了后院的存货。',
    },
    t60: {
      zoneId: 'stone_village', zoneName: '青云村', tier: 60,
      type: 'title', name: '青云村少年',
      description: '你已走遍青云村的每一寸土地，村民们都认识了你。',
      effect: { stat: { maxHp: 20, defense: 2 } },
    },
    t100: {
      zoneId: 'stone_village', zoneName: '青云村', tier: 100,
      type: 'secret_realm', name: '村后古洞',
      description: '你在青云村后山发现了一处隐秘的古洞，似有上古传承。',
      effect: { expBonus: 10 },
    },
  },
  'stone_city': {
    t30: {
      zoneId: 'stone_city', zoneName: '石城', tier: 30,
      type: 'shop_unlock', name: '宝阁密室',
      description: '石城宝阁的掌柜邀你进入内室，陈列着罕见珍品。',
    },
    t60: {
      zoneId: 'stone_city', zoneName: '石城', tier: 60,
      type: 'title', name: '石城常客',
      description: '你对石城的大街小巷了如指掌，车马行都给你打折扣。',
      effect: { stat: { speed: 3 }, goldBonus: 5 },
    },
    t100: {
      zoneId: 'stone_city', zoneName: '石城', tier: 100,
      type: 'secret_realm', name: '地下密道',
      description: '你发现了石城地下的古老密道，通往一处被遗忘的宝库。',
      effect: { goldBonus: 15 },
    },
  },
  'butian_ge': {
    t30: {
      zoneId: 'butian_ge', zoneName: '补天阁', tier: 30,
      type: 'shop_unlock', name: '藏经阁一层',
      description: '补天阁藏经阁对你开放第一层，可借阅基础功法。',
    },
    t60: {
      zoneId: 'butian_ge', zoneName: '补天阁', tier: 60,
      type: 'title', name: '补天门徒',
      description: '你已熟悉补天阁的每一处亭台楼阁，俨然半个弟子。',
      effect: { stat: { spiritAbsorbRate: 0.05, maxMana: 30 } },
    },
    t100: {
      zoneId: 'butian_ge', zoneName: '补天阁', tier: 100,
      type: 'secret_realm', name: '补天秘境',
      description: '你发现了补天阁深处的秘境入口，内有先辈传承。',
      effect: { expBonus: 15 },
    },
  },
  'hundred_breaks': {
    t30: {
      zoneId: 'hundred_breaks', zoneName: '百断山脉', tier: 30,
      type: 'shop_unlock', name: '散修集市',
      description: '山中的散修们接纳了你，可在隐秘集市交易。',
    },
    t60: {
      zoneId: 'hundred_breaks', zoneName: '百断山脉', tier: 60,
      type: 'title', name: '百断行者',
      description: '你踏遍百断山脉，凶兽见你都要避让三分。',
      effect: { stat: { attack: 5, speed: 2 } },
    },
    t100: {
      zoneId: 'hundred_breaks', zoneName: '百断山脉', tier: 100,
      type: 'secret_realm', name: '太古遗藏',
      description: '你在百断山脉最深处发现了太古强者的遗藏。',
      effect: { expBonus: 20, goldBonus: 10 },
    },
  },
  'immortal_mountain': {
    t30: {
      zoneId: 'immortal_mountain', zoneName: '不死山', tier: 30,
      type: 'shop_unlock', name: '山外道坛',
      description: '不死山外的隐修允许你使用他们的道坛交易。',
    },
    t60: {
      zoneId: 'immortal_mountain', zoneName: '不死山', tier: 60,
      type: 'title', name: '不死山人',
      description: '你在不死山中来去自如，连不死生物都默许了你的存在。',
      effect: { stat: { maxHp: 50, defense: 5 } },
    },
    t100: {
      zoneId: 'immortal_mountain', zoneName: '不死山', tier: 100,
      type: 'secret_realm', name: '不死药园',
      description: '你找到了传说中的不死药园，内有可活死人肉白骨的神药。',
      effect: { expBonus: 25 },
    },
  },
};

export class ExplorationRewardService {
  /**
   * 检查某区域是否达到新的探索度里程碑，返回新解锁的奖励
   */
  static checkMilestone(world: World, player: IPlayer, zoneId: string): IExplorationReward[] {
    const progress = world.getZoneExplorationProgress(zoneId);
    if (progress === 0) return [];

    const rewards = ZONE_REWARDS[zoneId];
    if (!rewards) return [];

    const unlocked: IExplorationReward[] = [];
    const already = player.explorationMilestones || {};
    const key = zoneId;

    if (progress >= 100 && !already[key]?.includes(100) && rewards.t100) {
      unlocked.push(rewards.t100);
      this.applyReward(player, rewards.t100);
      if (!already[key]) already[key] = [];
      already[key].push(100);
    }
    if (progress >= 60 && !already[key]?.includes(60) && rewards.t60) {
      unlocked.push(rewards.t60);
      this.applyReward(player, rewards.t60);
      if (!already[key]) already[key] = [];
      already[key].push(60);
    }
    if (progress >= 30 && !already[key]?.includes(30) && rewards.t30) {
      unlocked.push(rewards.t30);
      this.applyReward(player, rewards.t30);
      if (!already[key]) already[key] = [];
      already[key].push(30);
    }

    player.explorationMilestones = already;
    return unlocked;
  }

  private static applyReward(player: IPlayer, reward: IExplorationReward): void {
    if (!reward.effect) return;

    if (reward.effect.stat) {
      const s = reward.effect.stat;
      if (s.attack) player.attack += s.attack;
      if (s.defense) player.defense += s.defense;
      if (s.maxHp) {
        player.maxHp += s.maxHp;
        player.hp += s.maxHp;
      }
      if (s.maxMana) {
        player.maxMana += s.maxMana;
        player.mana += s.maxMana;
      }
      if (s.speed) player.speed += s.speed;
      if (s.spiritAbsorbRate) player.spiritAbsorbRate += s.spiritAbsorbRate;
    }

    if (reward.effect.expBonus) {
      player.expBonus = (player.expBonus || 0) + reward.effect.expBonus;
    }
    if (reward.effect.goldBonus) {
      player.goldBonus = (player.goldBonus || 0) + reward.effect.goldBonus;
    }
  }

  static getRewardDescription(reward: IExplorationReward): string {
    const tierText = reward.tier === 30 ? '初探' : reward.tier === 60 ? '通晓' : '尽知';
    let typeText = '';
    switch (reward.type) {
      case 'title': typeText = '称号'; break;
      case 'shop_unlock': typeText = '商店'; break;
      case 'secret_realm': typeText = '秘境'; break;
    }
    return `【${reward.zoneName}·${tierText}】解锁${typeText}：${reward.name}`;
  }
}
