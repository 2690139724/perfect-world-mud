import { IPlayer } from '../entities/Player';
import { WorldId } from '../entities/WorldDefinition';
import {
  IWorldSpecialty,
  IAlienFire,
  IWarSoul,
  ISpiritRoot,
  ILifeDeathRealm,
  getWorldSpecialty,
  getAlienFires,
  getWarSouls,
  getSpiritRoots,
  getLifeDeathRealms,
} from '../entities/WorldSpecialty';
import { CultivationRealm } from '../entities/Player';

export interface ISpecialtyAcquireResult {
  success: boolean;
  message: string;
  bonus?: {
    attack?: number;
    defense?: number;
    cultivationSpeed?: number;
    breakthrough?: number;
    comprehension?: number;
  };
}

export class WorldSpecialtyService {
  static getSpecialtyInfo(worldId: WorldId): IWorldSpecialty | undefined {
    return getWorldSpecialty(worldId);
  }

  static getAvailableItems(worldId: WorldId): IAlienFire[] | IWarSoul[] | ISpiritRoot[] | ILifeDeathRealm[] {
    const specialty = getWorldSpecialty(worldId);
    if (!specialty) return [];

    switch (specialty.type) {
      case 'alien_fire':
        return getAlienFires();
      case 'war_soul':
        return getWarSouls();
      case 'spirit_root':
        return getSpiritRoots();
      case 'life_death':
        return getLifeDeathRealms();
      default:
        return [];
    }
  }

  static tryAcquireSpecialty(player: IPlayer, itemId: string): ISpecialtyAcquireResult {
    const specialty = getWorldSpecialty(player.currentWorldId);
    if (!specialty) {
      return { success: false, message: '此方世界无专属修炼体系。' };
    }

    switch (specialty.type) {
      case 'alien_fire':
        return this.tryAbsorbAlienFire(player, itemId);
      case 'war_soul':
        return this.tryAbsorbWarSoul(player, itemId);
      case 'spirit_root':
        return this.tryAwakenSpiritRoot(player, itemId);
      case 'life_death':
        return this.tryComprehendLifeDeath(player, itemId);
      default:
        return { success: false, message: '未知修炼体系。' };
    }
  }

  private static tryAbsorbAlienFire(player: IPlayer, fireId: string): ISpecialtyAcquireResult {
    const fires = getAlienFires();
    const fire = fires.find(f => f.id === fireId);
    if (!fire) {
      return { success: false, message: '未找到此异火。' };
    }

    if (player.realm < fire.requiredRealm) {
      return { success: false, message: `境界不足，需达到更高境界方可吸收${fire.name}。` };
    }

    const success = Math.random() > fire.absorbDifficulty * 0.08;
    if (!success) {
      return { success: false, message: `吸收${fire.name}失败！异火反噬，你受到了灼伤。` };
    }

    return {
      success: true,
      message: `成功吸收${fire.name}！你的攻击力提升了${fire.powerBonus}%。`,
      bonus: { attack: fire.powerBonus },
    };
  }

  private static tryAbsorbWarSoul(player: IPlayer, soulId: string): ISpecialtyAcquireResult {
    const souls = getWarSouls();
    const soul = souls.find(s => s.id === soulId);
    if (!soul) {
      return { success: false, message: '未找到此战魂。' };
    }

    if (player.realm < soul.requiredRealm) {
      return { success: false, message: `境界不足，无法承载${soul.name}的力量。` };
    }

    const success = Math.random() > soul.tier * 0.08;
    if (!success) {
      return { success: false, message: `吸收${soul.name}失败！战魂反噬，你精神受到了冲击。` };
    }

    return {
      success: true,
      message: `成功吸收${soul.name}！攻击力+${soul.attackBonus}%，防御力+${soul.defenseBonus}%。`,
      bonus: { attack: soul.attackBonus, defense: soul.defenseBonus },
    };
  }

  private static tryAwakenSpiritRoot(player: IPlayer, rootId: string): ISpecialtyAcquireResult {
    const roots = getSpiritRoots();
    const root = roots.find(r => r.id === rootId);
    if (!root) {
      return { success: false, message: '未找到此灵根。' };
    }

    return {
      success: true,
      message: `觉醒${root.name}！修炼速度提升${root.cultivationBonus}%。${root.description}`,
      bonus: { cultivationSpeed: root.cultivationBonus },
    };
  }

  private static tryComprehendLifeDeath(player: IPlayer, realmId: string): ISpecialtyAcquireResult {
    const realms = getLifeDeathRealms();
    const realm = realms.find(r => r.id === realmId);
    if (!realm) {
      return { success: false, message: '未找到此生死意境。' };
    }

    const success = Math.random() > realm.level * 0.07;
    if (!success) {
      return { success: false, message: `领悟${realm.name}失败，生死之道玄奥难明。` };
    }

    return {
      success: true,
      message: `领悟${realm.name}！悟性+${realm.comprehensionBonus}%，突破成功率+${realm.breakthroughBonus}%。`,
      bonus: { comprehension: realm.comprehensionBonus, breakthrough: realm.breakthroughBonus },
    };
  }

  static getSpecialtyDescription(worldId: WorldId): string {
    const specialty = getWorldSpecialty(worldId);
    if (!specialty) return '此方世界无专属修炼体系。';

    let desc = `【${specialty.name}】\n${specialty.description}\n\n`;

    const items = this.getAvailableItems(worldId);
    if (items.length > 0) {
      desc += '可用项目：\n';
      for (const item of items) {
        if ('rank' in item) {
          desc += `  - ${item.name}（排名${item.rank}）：${item.description} 攻击+${item.powerBonus}%\n`;
        } else if ('tier' in item) {
          desc += `  - ${item.name}（${item.tier}阶）：${item.description} 攻+${item.attackBonus}/防+${item.defenseBonus}\n`;
        } else if ('element' in item) {
          desc += `  - ${item.name}（${item.element}属性）：${item.description} 修炼+${item.cultivationBonus}%\n`;
        } else if ('level' in item) {
          desc += `  - ${item.name}（${item.level}层）：${item.description} 悟性+${item.comprehensionBonus}%\n`;
        }
      }
    }

    return desc;
  }
}
