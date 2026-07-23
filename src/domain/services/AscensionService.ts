import { IPlayer } from '../entities/Player';
import { WorldId, getWorldDefinition, canAscend, getAscensionTarget } from '../entities/WorldDefinition';

export interface IAscensionResult {
  success: boolean;
  targetWorldId?: WorldId;
  targetWorldName?: string;
  targetRealmLevel?: number;
  targetRealmName?: string;
  message: string;
}

export class AscensionService {
  static checkAscensionEligibility(player: IPlayer): { eligible: boolean; targetWorldId?: WorldId; message: string } {
    const currentWorld = getWorldDefinition(player.currentWorldId);

    if (!currentWorld.ascensionTarget) {
      return { eligible: false, message: '此方世界已无更高层次的境界可追寻。' };
    }

    if (!canAscend(player.currentWorldId, player.realm)) {
      const requiredRealm = currentWorld.ascensionRealmLevel || currentWorld.realms.length - 1;
      const requiredRealmName = currentWorld.realms[requiredRealm]?.name || '未知';
      return {
        eligible: false,
        message: `需达到【${requiredRealmName}】方可飞升，当前境界不足。`,
      };
    }

    return {
      eligible: true,
      targetWorldId: currentWorld.ascensionTarget,
      message: '你已触及此方世界的天花板，飞升契机已至！',
    };
  }

  static performAscension(player: IPlayer): IAscensionResult {
    const eligibility = this.checkAscensionEligibility(player);

    if (!eligibility.eligible || !eligibility.targetWorldId) {
      return {
        success: false,
        message: eligibility.message,
      };
    }

    const targetWorldId = eligibility.targetWorldId;
    const targetWorld = getWorldDefinition(targetWorldId);
    const ascensionInfo = getAscensionTarget(player.currentWorldId);

    if (!ascensionInfo) {
      return {
        success: false,
        message: '飞升通道出现异常，无法前往新世界。',
      };
    }

    const targetRealmLevel = ascensionInfo.targetRealmLevel;

    const previousWorldId = player.currentWorldId;
    const previousRecord = player.worldTravelRecords[previousWorldId];
    if (previousRecord) {
      previousRecord.ascended = true;
      if (player.realm > previousRecord.highestRealmLevel) {
        previousRecord.highestRealmLevel = player.realm;
      }
    }

    player.currentWorldId = targetWorldId;

    const now = Date.now();
    if (!player.worldTravelRecords[targetWorldId]) {
      player.worldTravelRecords[targetWorldId] = {
        worldId: targetWorldId,
        firstArrivalTime: now,
        highestRealmLevel: targetRealmLevel,
        totalTimeSpent: 0,
        ascended: false,
      };
    } else {
      const record = player.worldTravelRecords[targetWorldId];
      if (targetRealmLevel > record.highestRealmLevel) {
        record.highestRealmLevel = targetRealmLevel;
      }
    }

    player.realm = targetRealmLevel;
    player.realmStage = 1;
    player.realmPerfection = false;
    player.cultivationExp = 0;
    player.maxCultivationExp = 30 * (player.realm + 1) * 1;

    player.currentRoomId = targetWorld.startingRoomId;
    player.currentZoneId = targetWorld.startingZoneId;

    if (!player.discoveredZones.includes(targetWorld.startingZoneId)) {
      player.discoveredZones.push(targetWorld.startingZoneId);
    }

    const targetRealmName = targetWorld.realms[targetRealmLevel]?.name || '未知';

    return {
      success: true,
      targetWorldId,
      targetWorldName: targetWorld.name,
      targetRealmLevel,
      targetRealmName,
      message: `飞升成功！你已降临【${targetWorld.name}】，境界重塑为【${targetRealmName}】。`,
    };
  }

  static getWorldTravelInfo(player: IPlayer): Array<{
    worldId: WorldId;
    worldName: string;
    highestRealmName: string;
    totalTimeSpent: number;
    firstArrivalTime: number;
    ascended: boolean;
    isCurrent: boolean;
  }> {
    return Object.values(player.worldTravelRecords).map(record => {
      const worldDef = getWorldDefinition(record.worldId);
      return {
        worldId: record.worldId,
        worldName: worldDef.name,
        highestRealmName: worldDef.realms[record.highestRealmLevel]?.name || '未知',
        totalTimeSpent: record.totalTimeSpent,
        firstArrivalTime: record.firstArrivalTime,
        ascended: record.ascended,
        isCurrent: record.worldId === player.currentWorldId,
      };
    });
  }
}
