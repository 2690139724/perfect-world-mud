import { IPlayer } from '../entities/Player';
import { getTalent, talentRegistry } from '../../data/talents/talent_data';

export interface ITalentStealEvent {
  talentId: string;
  talentName: string;
  thiefName: string;
  thiefDescription: string;
  thiefRealm: number;
  stealChance: number;
  revengeQuestId: string;
}

export interface ITalentStealResult {
  success: boolean;
  stolen: boolean;
  talentId?: string;
  talentName?: string;
  thiefName?: string;
  message: string;
  revengeQuestId?: string;
}

// 抢夺者模板：基于小说中的势力设定
const THIEF_TEMPLATES = [
  {
    name: '石毅',
    description: '石国大王子，天生重瞳，觊觎至尊骨已久。',
    minRealm: 3,
    realmBonus: 2,
    targetTalent: 'supreme_bone',
    revengeQuestId: 'revenge_shiyi',
  },
  {
    name: '雨族尊者',
    description: '雨族暗中窥伺，欲夺取重瞳之力。',
    minRealm: 5,
    realmBonus: 3,
    targetTalent: 'double_pupils',
    revengeQuestId: 'revenge_yu_clan',
  },
  {
    name: '火族长老',
    description: '火族高层觊觎先天道胎，欲占为己有。',
    minRealm: 4,
    realmBonus: 2,
    targetTalent: 'innate_dao_fetus',
    revengeQuestId: 'revenge_fire_clan',
  },
  {
    name: '魔道修士',
    description: '魔道修士觊觎混沌体，企图炼化吸收。',
    minRealm: 6,
    realmBonus: 3,
    targetTalent: 'chaos_body',
    revengeQuestId: 'revenge_demon_cultivator',
  },
  {
    name: '神秘势力',
    description: '神秘势力暗中窥伺你的特殊天赋。',
    minRealm: 3,
    realmBonus: 1,
    targetTalent: null, // 随机选取可抢夺天赋
    revengeQuestId: 'revenge_mysterious',
  },
];

// 已触发过的抢夺事件记录（防止重复触发）
const triggeredSteals = new Set<string>();

export class TalentStealSystem {
  /**
   * 检查是否触发天赋抢夺事件
   * 在玩家进入新区域或境界提升时有概率触发
   */
  static checkStealTrigger(player: IPlayer): ITalentStealResult {
    // 获取玩家可被抢夺的天赋
    const stealableTalents = player.talentIds.filter(id => {
      const talent = getTalent(id);
      return talent && talent.stealable === true;
    });

    if (stealableTalents.length === 0) {
      return { success: false, stolen: false, message: '' };
    }

    // 筛选适合的抢夺者
    const validThieves = THIEF_TEMPLATES.filter(thief => {
      if (player.realm < thief.minRealm) return false;
      if (triggeredSteals.has(thief.name)) return false;
      if (thief.targetTalent) {
        return stealableTalents.includes(thief.targetTalent);
      }
      return true;
    });

    if (validThieves.length === 0) {
      return { success: false, stolen: false, message: '' };
    }

    // 随机选择一个抢夺者
    const thief = validThieves[Math.floor(Math.random() * validThieves.length)];

    // 确定被抢夺的天赋
    const targetTalentId = thief.targetTalent && stealableTalents.includes(thief.targetTalent)
      ? thief.targetTalent
      : stealableTalents[Math.floor(Math.random() * stealableTalents.length)];

    const talent = getTalent(targetTalentId);
    if (!talent) {
      return { success: false, stolen: false, message: '' };
    }

    // 计算抢夺成功率
    const realmDiff = (thief.minRealm + thief.realmBonus) - player.realm;
    const baseChance = 0.3;
    const realmFactor = Math.max(0, realmDiff * 0.1);
    // HP低于50%时增加被抢概率
    const hpFactor = player.hp < player.maxHp * 0.5 ? 0.2 : 0;
    const stealChance = Math.min(0.7, baseChance + realmFactor + hpFactor);

    const isStolen = Math.random() < stealChance;

    if (isStolen) {
      // 标记已触发
      triggeredSteals.add(thief.name);

      // 从玩家天赋列表中移除
      player.talentIds = player.talentIds.filter(id => id !== targetTalentId);

      return {
        success: true,
        stolen: true,
        talentId: targetTalentId,
        talentName: talent.name,
        thiefName: thief.name,
        message: `\n━━━━━━━━━━━━━━━━━━━━\n【天赋被夺】${thief.name}趁你不备，强行夺走了你的${talent.name}！\n${thief.description}\n━━━━━━━━━━━━━━━━━━━━\n你誓言夺回${talent.name}，此仇必报！`,
        revengeQuestId: thief.revengeQuestId,
      };
    } else {
      // 抢夺失败，但敌人逃跑
      return {
        success: true,
        stolen: false,
        talentName: talent.name,
        thiefName: thief.name,
        message: `\n【险遭夺宝】${thief.name}觊觎你的${talent.name}，试图抢夺但被你击退！\n${thief.description}\n此人不会善罢甘休，需多加防范。`,
        revengeQuestId: thief.revengeQuestId,
      };
    }
  }

  /**
   * 夺回被抢夺的天赋
   * 击败抢夺者后调用
   */
  static recoverStolenTalent(player: IPlayer, talentId: string, thiefName: string): ITalentStealResult {
    const talent = getTalent(talentId);
    if (!talent) {
      return { success: false, stolen: false, message: '天赋不存在' };
    }

    if (player.talentIds.includes(talentId)) {
      return { success: false, stolen: false, message: '该天赋已在身上' };
    }

    // 恢复天赋
    player.talentIds.push(talentId);

    return {
      success: true,
      stolen: false,
      talentId,
      talentName: talent.name,
      thiefName,
      message: `\n━━━━━━━━━━━━━━━━━━━━\n【夺回天赋】你击败了${thiefName}，成功夺回了${talent.name}！\n${talent.name}重新回归，实力大增！\n━━━━━━━━━━━━━━━━━━━━`,
    };
  }

  /**
   * 获取所有可被抢夺的天赋
   */
  static getStealableTalents(player: IPlayer): string[] {
    return player.talentIds.filter(id => {
      const talent = getTalent(id);
      return talent && talent.stealable === true;
    });
  }

  /**
   * 检查玩家是否有被抢夺的天赋记录
   */
  static hasStolenTalents(player: IPlayer, allStealableIds: string[]): string[] {
    return allStealableIds.filter(id => {
      const talent = getTalent(id);
      return talent && talent.stealable === true && !player.talentIds.includes(id);
    });
  }
}
