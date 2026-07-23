import {
  INPCRelationship,
  NPCRelationshiptatus,
  NPCReputationTag,
  getRelationshipStatus,
  FAVORABILITY_THRESHOLDS,
} from '../entities/NPCRelationship';

const relationshipStore = new Map<string, Map<string, INPCRelationship>>();

export interface IFavorabilityChangeResult {
  success: boolean;
  oldStatus: NPCRelationshiptatus;
  newStatus: NPCRelationshiptatus;
  amount: number;
  actualChange: number;
  statusChanged: boolean;
  message: string;
}

export class NPCRelationshipService {
  static getRelationship(playerId: string, npcId: string): INPCRelationship {
    if (!relationshipStore.has(playerId)) {
      relationshipStore.set(playerId, new Map());
    }
    const playerRels = relationshipStore.get(playerId)!;
    if (!playerRels.has(npcId)) {
      playerRels.set(npcId, {
        npcId,
        favorability: 0,
        status: NPCRelationshiptatus.NEUTRAL,
        reputationTags: [],
        metCount: 0,
        lastInteractionTime: 0,
        giftsGiven: [],
        questsCompleted: [],
        specialFlags: [],
        debtOwed: 0,
        debtOwedTo: 0,
        savedLife: false,
        betrayed: false,
      });
    }
    return playerRels.get(npcId)!;
  }

  static recordMeeting(playerId: string, npcId: string): void {
    const rel = this.getRelationship(playerId, npcId);
    rel.metCount++;
    rel.lastInteractionTime = Date.now();
  }

  static changeFavorability(
    playerId: string,
    npcId: string,
    amount: number,
    reason?: string,
  ): IFavorabilityChangeResult {
    const rel = this.getRelationship(playerId, npcId);
    const oldStatus = rel.status;
    const oldFavor = rel.favorability;

    let actualChange = amount;

    if (rel.savedLife && amount > 0) actualChange = Math.floor(amount * 1.5);
    if (rel.betrayed && amount > 0) actualChange = Math.floor(amount * 0.3);

    rel.favorability = Math.max(-100, Math.min(100, rel.favorability + actualChange));
    rel.status = getRelationshipStatus(rel.favorability);
    rel.lastInteractionTime = Date.now();

    const statusChanged = oldStatus !== rel.status;
    let message = '';

    if (actualChange > 0) {
      message = `好感度 +${actualChange}`;
    } else {
      message = `好感度 ${actualChange}`;
    }

    if (statusChanged) {
      if (this.isStatusBetter(rel.status, oldStatus)) {
        message += `，关系提升为【${this.getStatusName(rel.status)}】`;
      } else {
        message += `，关系降为【${this.getStatusName(rel.status)}】`;
      }
    }

    return {
      success: true,
      oldStatus,
      newStatus: rel.status,
      amount,
      actualChange,
      statusChanged,
      message,
    };
  }

  private static isStatusBetter(newStatus: NPCRelationshiptatus, oldStatus: NPCRelationshiptatus): boolean {
    const order = [
      NPCRelationshiptatus.HOSTILE,
      NPCRelationshiptatus.UNFRIENDLY,
      NPCRelationshiptatus.NEUTRAL,
      NPCRelationshiptatus.FRIENDLY,
      NPCRelationshiptatus.TRUSTED,
      NPCRelationshiptatus.ALLY,
    ];
    return order.indexOf(newStatus) > order.indexOf(oldStatus);
  }

  private static getStatusName(status: NPCRelationshiptatus): string {
    const names: Record<NPCRelationshiptatus, string> = {
      [NPCRelationshiptatus.HOSTILE]: '敌对',
      [NPCRelationshiptatus.UNFRIENDLY]: '冷淡',
      [NPCRelationshiptatus.NEUTRAL]: '中立',
      [NPCRelationshiptatus.FRIENDLY]: '友善',
      [NPCRelationshiptatus.TRUSTED]: '信任',
      [NPCRelationshiptatus.ALLY]: '至交',
    };
    return names[status];
  }

  static addReputationTag(playerId: string, npcId: string, tag: NPCReputationTag): void {
    const rel = this.getRelationship(playerId, npcId);
    if (!rel.reputationTags.includes(tag)) {
      rel.reputationTags.push(tag);
    }
  }

  static removeReputationTag(playerId: string, npcId: string, tag: NPCReputationTag): void {
    const rel = this.getRelationship(playerId, npcId);
    rel.reputationTags = rel.reputationTags.filter(t => t !== tag);
  }

  static canTrade(playerId: string, npcId: string): boolean {
    const rel = this.getRelationship(playerId, npcId);
    return rel.status !== NPCRelationshiptatus.HOSTILE;
  }

  static canReceiveQuest(playerId: string, npcId: string): boolean {
    const rel = this.getRelationship(playerId, npcId);
    return rel.status !== NPCRelationshiptatus.HOSTILE && rel.status !== NPCRelationshiptatus.UNFRIENDLY;
  }

  static getDiscountRate(playerId: string, npcId: string): number {
    const rel = this.getRelationship(playerId, npcId);
    switch (rel.status) {
      case NPCRelationshiptatus.ALLY: return 0.7;
      case NPCRelationshiptatus.TRUSTED: return 0.8;
      case NPCRelationshiptatus.FRIENDLY: return 0.9;
      default: return 1.0;
    }
  }

  static markSavedLife(playerId: string, npcId: string): void {
    const rel = this.getRelationship(playerId, npcId);
    if (!rel.savedLife) {
      rel.savedLife = true;
      this.changeFavorability(playerId, npcId, 30, '救命之恩');
    }
  }

  static markBetrayed(playerId: string, npcId: string): void {
    const rel = this.getRelationship(playerId, npcId);
    if (!rel.betrayed) {
      rel.betrayed = true;
      this.changeFavorability(playerId, npcId, -50, '背叛');
    }
  }

  static addDebt(playerId: string, npcId: string, amount: number): void {
    const rel = this.getRelationship(playerId, npcId);
    rel.debtOwedTo += amount;
  }

  static repayDebt(playerId: string, npcId: string, amount: number): boolean {
    const rel = this.getRelationship(playerId, npcId);
    if (rel.debtOwedTo <= 0) return false;
    rel.debtOwedTo = Math.max(0, rel.debtOwedTo - amount);
    if (rel.debtOwedTo === 0) {
      this.changeFavorability(playerId, npcId, 10, '还清债务');
    }
    return true;
  }

  static getAllRelationships(playerId: string): INPCRelationship[] {
    if (!relationshipStore.has(playerId)) return [];
    return Array.from(relationshipStore.get(playerId)!.values());
  }

  static getRelationshipsByStatus(playerId: string, status: NPCRelationshiptatus): INPCRelationship[] {
    return this.getAllRelationships(playerId).filter(r => r.status === status);
  }
}
