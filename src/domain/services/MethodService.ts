/**
 * 功法获取服务
 * 统一管理玩家获取功法的渠道、条件和时机
 */
import { IPlayer, CultivationRealm } from '../entities/Player';
import {
  ICultivationMethod,
  AcquireType,
  IAcquireCondition,
  getMethod,
  getAllMethods,
} from '../../data/methods/method_data';

export interface IAcquireResult {
  success: boolean;
  methodId: string;
  methodName: string;
  message: string;
}

/** 获取途径中文标签 */
export const ACQUIRE_TYPE_LABELS: Record<AcquireType, string> = {
  [AcquireType.STARTING]: '◆ 天地传承',
  [AcquireType.SECT]: '◆ 宗门传承',
  [AcquireType.NPC_GIFT]: '◆ NPC 赠予',
  [AcquireType.NPC_TUTOR]: '◆ NPC 授业',
  [AcquireType.DESTINY]: '◆ 机缘巧合',
  [AcquireType.QUEST_REWARD]: '◆ 任务奖励',
  [AcquireType.DUNGEON_REWARD]: '◆ 秘境奖励',
  [AcquireType.EXCHANGE]: '◆ 兑换所得',
};

export class MethodService {
  /**
   * 检查玩家是否已拥有某功法
   */
  static hasMethod(player: IPlayer, methodId: string): boolean {
    return player.knownMethodIds.includes(methodId);
  }

  /**
   * 检查玩家是否满足功法的获取条件
   */
  static checkAcquireCondition(
    player: IPlayer,
    condition: IAcquireCondition | undefined,
    playerFaction: string | null = null,
    playerReputation: number = 0,
  ): { satisfied: boolean; reason?: string } {
    if (!condition) return { satisfied: true };

    if (condition.minRealm !== undefined && player.realm < condition.minRealm) {
      return {
        satisfied: false,
        reason: `需要境界：${getRealmShortName(condition.minRealm)}，当前：${getRealmShortName(player.realm)}`,
      };
    }

    if (condition.minReputation !== undefined && playerReputation < condition.minReputation) {
      return {
        satisfied: false,
        reason: `需要声望：${condition.minReputation}，当前：${playerReputation}`,
      };
    }

    if (condition.sectId && playerFaction !== condition.sectId) {
      return { satisfied: false, reason: `需要加入：${condition.sectId}` };
    }

    return { satisfied: true };
  }

  /**
   * 玩家习得功法（添加到已知列表与当前修炼）
   */
  static learnMethod(player: IPlayer, methodId: string): IAcquireResult {
    const method = getMethod(methodId);
    if (!method) {
      return { success: false, methodId, methodName: '未知', message: '功法不存在' };
    }
    if (player.knownMethodIds.includes(methodId)) {
      return { success: false, methodId, methodName: method.name, message: `已习得《${method.name}》` };
    }
    if (player.realm < method.requiredRealm) {
      return {
        success: false,
        methodId,
        methodName: method.name,
        message: `境界不足，无法修炼《${method.name}》（需${getRealmShortName(method.requiredRealm)}）`,
      };
    }

    player.knownMethodIds.push(methodId);
    // 若玩家当前无功法，则自动装备该功法
    if (!player.currentMethodId) {
      player.currentMethodId = methodId;
      player.methodProficiency = 0;
    }

    return {
      success: true,
      methodId,
      methodName: method.name,
      message: `习得功法《${method.name}》！`,
    };
  }

  /**
   * 切换当前修炼功法
   */
  static switchMethod(player: IPlayer, methodId: string): { success: boolean; message: string } {
    if (!player.knownMethodIds.includes(methodId)) {
      return { success: false, message: '你尚未习得此功法' };
    }
    const method = getMethod(methodId);
    if (!method) {
      return { success: false, message: '功法数据错误' };
    }
    if (player.realm < method.requiredRealm) {
      return { success: false, message: `境界不足，无法切换至《${method.name}》` };
    }

    player.currentMethodId = methodId;
    player.methodProficiency = 0;
    return { success: true, message: `已切换至《${method.name}》` };
  }

  /**
   * 触发顿悟进阶（修炼满熟练度后）
   */
  static tryEnlightenment(player: IPlayer): { evolved: boolean; newMethodName?: string; message: string } {
    if (!player.currentMethodId) {
      return { evolved: false, message: '尚未修炼任何功法' };
    }
    const method = getMethod(player.currentMethodId);
    if (!method || !method.evolvesTo) {
      return { evolved: false, message: '当前功法无进阶路径' };
    }
    if (player.methodProficiency < (method.proficiencyRequired || 100)) {
      return {
        evolved: false,
        message: `熟练度不足（${player.methodProficiency}/${method.proficiencyRequired || 100}）`,
      };
    }

    const nextMethod = getMethod(method.evolvesTo);
    if (!nextMethod) {
      return { evolved: false, message: '进阶功法数据错误' };
    }

    if (!player.knownMethodIds.includes(nextMethod.id)) {
      player.knownMethodIds.push(nextMethod.id);
    }
    player.currentMethodId = nextMethod.id;
    player.methodProficiency = 0;
    player.methodEnlightenmentCount += 1;

    return {
      evolved: true,
      newMethodName: nextMethod.name,
      message: `★ 顿悟！《${method.name}》进阶为《${nextMethod.name}》！`,
    };
  }

  /**
   * 列出玩家已习得的所有功法
   */
  static listKnownMethods(player: IPlayer): Array<{
    method: ICultivationMethod;
    isCurrent: boolean;
    proficiency: number;
    required: number;
  }> {
    return player.knownMethodIds
      .map((id) => {
        const method = getMethod(id);
        if (!method) return null;
        const isCurrent = player.currentMethodId === id;
        return {
          method,
          isCurrent,
          proficiency: isCurrent ? player.methodProficiency : 0,
          required: method.proficiencyRequired || 100,
        };
      })
      .filter((m): m is NonNullable<typeof m> => m !== null);
  }

  /**
   * 获取出生默认功法（每个角色天生习得"原始真解"）
   */
  static getStartingMethods(): string[] {
    return ['yuanshi_zhenjie'];
  }

  /**
   * 加入宗门时获得的功法（按宗门 ID）
   */
  static getSectStarterMethods(sectId: string): string[] {
    const sectMethods: Record<string, string[]> = {
      butian_ge: ['butian_shu'],
      huohuang_cheng: ['huohuang_jing'],
      zhulu_shuyuan: ['zhulu_xinjing'],
      bulao_shan: ['bulao_changchun'],
    };
    return sectMethods[sectId] || [];
  }

  /**
   * 获取某个 NPC 可授予/可授业的功法列表
   */
  static getNPCMethods(npcId: string): ICultivationMethod[] {
    return getAllMethods().filter(
      m =>
        (m.acquireType === AcquireType.NPC_GIFT || m.acquireType === AcquireType.NPC_TUTOR) &&
        m.acquireCondition?.npcId === npcId,
    );
  }

  /**
   * 在特定地点用货币兑换功法
   */
  static exchangeMethod(
    player: IPlayer,
    methodId: string,
    currentRoomId: string,
  ): { success: boolean; message: string; methodName?: string } {
    const method = getMethod(methodId);
    if (!method) {
      return { success: false, message: '功法不存在' };
    }
    if (method.acquireType !== AcquireType.EXCHANGE) {
      return { success: false, message: '此功法不支持兑换获取' };
    }
    if (player.knownMethodIds.includes(methodId)) {
      return { success: false, message: `已习得《${method.name}》` };
    }
    if (player.realm < method.requiredRealm) {
      return { success: false, message: `境界不足（需${getRealmShortName(method.requiredRealm)}）` };
    }

    const condition = method.acquireCondition;
    if (!condition || !condition.exchangeLocationId) {
      return { success: false, message: '此功法暂无兑换途径' };
    }
    if (currentRoomId !== condition.exchangeLocationId) {
      return { success: false, message: '不在正确的兑换地点' };
    }

    const cost = condition.exchangeCost;
    if (cost) {
      if (cost.gold && player.gold < cost.gold) {
        return { success: false, message: `金币不足（需${cost.gold}）` };
      }
      if (cost.reputation && player.reputation < cost.reputation) {
        return { success: false, message: `声望不足（需${cost.reputation}）` };
      }
    }

    // 扣除货币
    if (cost) {
      if (cost.gold) player.gold -= cost.gold;
      if (cost.reputation) player.reputation -= cost.reputation;
    }

    const learnResult = this.learnMethod(player, methodId);
    if (learnResult.success) {
      return { success: true, message: `兑换成功！${learnResult.message}`, methodName: method.name };
    }
    return { success: false, message: learnResult.message };
  }
}

function getRealmShortName(realm: number): string {
  const names = ['凡人', '搬血', '洞天', '化灵', '铭纹', '列阵', '尊者', '神火', '真一', '祭道', '神境', '虚道', '斩我', '遁一', '至尊', '真仙', '王者'];
  return names[realm] || `境界${realm}`;
}
