import { IPlayer, CultivationRealm } from '../entities/Player';
import { ISect, ISectMember, ISectBuilding, ISectQuest, ISectWar, IForceResource, IDiplomaticRelation, IFamilyLineage, IForceEvent, IHolyLand, ICultivationBonus, IForceTreasure, ITreasury, ITechniqueInheritance, ITechniqueMastery, IWarUnit, IStrategicDeployment, ILeaderboard, ILeaderboardEntry, IForceAchievement, ISectStatistics, ISectDailyTask, ISectWeeklyTask, ISectSpecialTask, ISectTaskProgress, ISectTaskReward, IForceTech, IForceTechSystem, IForceShopItem, IForceShop, IForceFeast, IForceFeastSystem, IForceSecretRealm, IForceSecretRealmSystem, IForceAlliance, IAllianceRequest, IForceTerritory, IForceTerritorySystem, IForceOfficial, IForceOfficialSystem, IMartialAlliance, IBloodLineage, IForceMarriageSystem, IForceTrial, IForceTrialSystem, ISectBuildingUpgrade, IForceBuildingSystem, IForcePet, IForcePetSystem, IForceFormation, IForceFormationSystem, ICraftRecipe, ICraftFacility, IForceCraftSystem, ITradeAgreement, IDiplomaticAction, IForceDiplomacySystem, IIntelligenceReport, IForceIntelligenceSystem, HolyLandType, TreasureRarity, TreasureType, TechniqueInheritanceType, TechniqueEvolutionStage, UnitType, WarStrategy, LeaderboardType, ForceAchievementTier, ForceType, ForceRank, SectRole, FamilyRole, SectBuildingType, SectWarState, DiplomaticRelation, ResourceType, TaskType, TaskCategory, TechCategory, ShopItemType, AllianceRole, ForceOfficialRank, TrialType, BuildingCategory, PetRarity, FormationGrade, FormationType, CraftType, RecipeRarity, IntelligenceType, FORCE_CREATION_REQUIREMENTS, FORCE_RANK_BONUSES, SECT_BUILDING_TEMPLATES, SECT_QUEST_TEMPLATES, FORCE_EVENT_TEMPLATES, HOLY_LAND_TEMPLATES, FAMILY_ROLE_PERMISSIONS, SECT_ROLE_PERMISSIONS, calculateSectPower, calculateUpgradeCost, canCreateForce } from '../entities/Sect';
import { ITechnique } from '../entities/Technique';

export interface ISectJoinResult {
  success: boolean;
  message: string;
  sect?: ISect;
}

export interface ISectDonateResult {
  success: boolean;
  message: string;
  contributionGained: number;
}

export interface ISectQuestResult {
  success: boolean;
  message: string;
  rewards?: { contribution: number; exp: number; gold: number };
}

export interface ISectWarResult {
  success: boolean;
  message: string;
  victory: boolean;
  rewards?: { contribution: number };
}

export interface IForceUpgradeResult {
  success: boolean;
  message: string;
  newRank?: ForceRank;
  newType?: ForceType;
}

export interface IDiplomacyResult {
  success: boolean;
  message: string;
  relation?: DiplomaticRelation;
}

export interface IResourceCollectResult {
  success: boolean;
  message: string;
  resources?: Record<string, number>;
}

export interface IForceEventResult {
  success: boolean;
  message: string;
  rewards?: { contribution?: number; gold?: number; reputation?: number; resources?: Record<string, number> };
  penalties?: { contribution?: number; gold?: number; reputation?: number };
}

export class SectService {
  private static ensureSectFields(sect: ISect): void {
    if (!sect.holyLands) sect.holyLands = [];
    if (!sect.treasurySystem) {
      sect.treasurySystem = {
        level: 1,
        maxLevel: 10,
        capacity: 50,
        treasures: [],
        upgradeCost: 50000,
        unlockRarity: TreasureRarity.COMMON,
      };
    }
    if (!sect.techniqueInheritances) sect.techniqueInheritances = [];
    if (!sect.techniqueMasteries) sect.techniqueMasteries = [];
    if (!sect.statistics) {
      sect.statistics = {
        totalWarVictories: 0,
        totalWarDefeats: 0,
        territoriesConquered: 0,
        treasuresCollected: 0,
        inheritancesCreated: 0,
        membersTrained: 0,
        holyLandsUnlocked: 0,
        totalDonations: 0,
        questsCompleted: 0,
      };
    }
    if (!sect.achievements) sect.achievements = [];
  }

  static createForce(player: IPlayer, name: string, forceType: ForceType): ISect | null {
    if (player.sectId) {
      return null;
    }

    const check = canCreateForce(player, forceType);
    if (!check.can) {
      return null;
    }

    player.gold -= check.cost;

    const buildings: ISectBuilding[] = Object.values(SectBuildingType).map(type => ({
      id: `building_${type}_${Date.now()}`,
      type,
      name: SECT_BUILDING_TEMPLATES[type].name,
      level: type === SectBuildingType.MAIN_HALL ? 1 : 0,
      maxLevel: SECT_BUILDING_TEMPLATES[type].maxLevel,
      upgradeCost: calculateUpgradeCost({ type, level: 0 } as ISectBuilding),
      effect: { stat: '', value: 0, description: '' },
      description: SECT_BUILDING_TEMPLATES[type].description,
    }));

    const mainHall = buildings.find(b => b.type === SectBuildingType.MAIN_HALL);
    if (mainHall) {
      mainHall.effect = SECT_BUILDING_TEMPLATES[SectBuildingType.MAIN_HALL].effect;
    }

    const resources: IForceResource[] = Object.values(ResourceType).map(type => ({
      type,
      amount: type === ResourceType.SPIRIT_STONE ? 1000 : 0,
      productionPerHour: type === ResourceType.SPIRIT_STONE ? 10 : 0,
      storageCapacity: 10000,
    }));

    let familyLineage: IFamilyLineage | undefined;
    let role: SectRole | FamilyRole;

    if (forceType === ForceType.FAMILY) {
      familyLineage = {
        id: `lineage_${Date.now()}`,
        ancestor: player.name,
        members: [player.id],
        generation: 1,
        inheritance: {},
      };
      role = FamilyRole.FOUNDER;
    } else {
      role = SectRole.MASTER;
    }

    const sect: ISect = {
      id: `force_${Date.now()}`,
      name,
      type: forceType,
      rank: ForceRank.LEVEL_1,
      realm: player.realm,
      requiredRealm: FORCE_CREATION_REQUIREMENTS[forceType].minRealm,
      members: [{
        playerId: player.id,
        name: player.name,
        role,
        contribution: 0,
        totalContribution: 0,
        joinTime: Date.now(),
        online: true,
        lineage: familyLineage?.id,
        generation: familyLineage?.generation,
      }],
      maxMembers: 10,
      contribution: 0,
      treasury: 0,
      buildings,
      techniques: [],
      quests: [...SECT_QUEST_TEMPLATES],
      reputation: 0,
      territory: [],
      creationTime: Date.now(),
      resources,
      diplomacy: [],
      familyLineage,
      events: [],
      prosperity: 100,
      maxProsperity: 1000,
      holyLands: [],
      treasurySystem: {
        level: 1,
        maxLevel: 10,
        capacity: 50,
        treasures: [],
        upgradeCost: 50000,
        unlockRarity: TreasureRarity.COMMON,
      },
      techniqueInheritances: [],
      techniqueMasteries: [],
      statistics: {
        totalWarVictories: 0,
        totalWarDefeats: 0,
        territoriesConquered: 0,
        treasuresCollected: 0,
        inheritancesCreated: 0,
        membersTrained: 0,
        holyLandsUnlocked: 0,
        totalDonations: 0,
        questsCompleted: 0,
      },
      achievements: [],
      dailyTasks: [],
      weeklyTasks: [],
      specialTasks: [],
      taskProgress: [],
      techSystem: {
        techs: [],
        totalResearchPoints: 0,
        researchSpeed: 1,
      },
      shopSystem: {
        items: [],
        refreshTime: Date.now(),
        discount: 1,
      },
      feastSystem: {
        feastHistory: [],
        feastBonus: {},
      },
      secretRealmSystem: {
        realms: [],
        explorationProgress: {},
      },
      allianceRequests: [],
      territorySystem: {
        territories: [],
        ownedTerritories: [],
      },
      officialSystem: {
        officials: [],
        salaryCycle: 86400,
        lastSalaryTime: 0,
      },
      marriageSystem: {
        alliances: [],
        bloodLineages: [],
      },
      trialSystem: {
        trialHistory: [],
        trialPoints: {},
        rankings: [],
      },
      buildingSystem: {
        buildings: [],
        buildingEffects: {},
      },
      petSystem: {
        pets: [],
        petSlots: 3,
        maxPetSlots: 10,
      },
      formationSystem: {
        formations: [],
        researchLevel: 1,
        formationMastery: {},
      },
      craftSystem: {
        recipes: [],
        facilities: [],
        craftHistory: [],
        totalCrafted: 0,
      },
      diplomacySystem: {
        agreements: [],
        actions: [],
        reputation: {},
        standing: {},
      },
      intelligenceSystem: {
        reports: [],
        activeSpies: [],
        counterIntelLevel: 1,
        intelPoints: 0,
      },
    };

    player.sectId = sect.id;
    return sect;
  }

  static canUpgradeForce(sect: ISect, player: IPlayer): { can: boolean; message: string; cost: number } {
    this.ensureSectFields(sect);
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { can: false, message: '你不是势力成员', cost: 0 };
    }

    const permissions = sect.type === ForceType.FAMILY ? FAMILY_ROLE_PERMISSIONS[member.role as FamilyRole] : SECT_ROLE_PERMISSIONS[member.role as SectRole];
    if (!permissions.canUpgradeBuildings) {
      return { can: false, message: '权限不足', cost: 0 };
    }

    const ranks = [ForceRank.LEVEL_1, ForceRank.LEVEL_2, ForceRank.LEVEL_3, ForceRank.LEVEL_4, ForceRank.LEVEL_5];
    const currentIndex = ranks.indexOf(sect.rank);
    if (currentIndex >= ranks.length - 1) {
      return { can: false, message: '势力已达最高等级', cost: 0 };
    }

    const nextRank = ranks[currentIndex + 1];
    const cost = 50000 * Math.pow(2, currentIndex);

    if (sect.treasury < cost) {
      return { can: false, message: `势力资金不足，需要${cost}金币`, cost };
    }

    if (sect.prosperity < (currentIndex + 2) * 200) {
      return { can: false, message: `繁荣度不足，需要${(currentIndex + 2) * 200}繁荣度`, cost };
    }

    return { can: true, message: '可以升级', cost };
  }

  static upgradeForce(sect: ISect, player: IPlayer): IForceUpgradeResult {
    const check = this.canUpgradeForce(sect, player);
    if (!check.can) {
      return { success: false, message: check.message };
    }

    const ranks = [ForceRank.LEVEL_1, ForceRank.LEVEL_2, ForceRank.LEVEL_3, ForceRank.LEVEL_4, ForceRank.LEVEL_5];
    const currentIndex = ranks.indexOf(sect.rank);
    const nextRank = ranks[currentIndex + 1];

    sect.treasury -= check.cost;
    sect.rank = nextRank;

    const rankBonus = FORCE_RANK_BONUSES[nextRank];
    sect.maxMembers = Math.floor(sect.maxMembers * rankBonus.memberBonus);
    sect.resources.forEach(r => {
      r.productionPerHour = Math.floor(r.productionPerHour * rankBonus.resourceBonus);
      r.storageCapacity = Math.floor(r.storageCapacity * rankBonus.resourceBonus);
    });

    return {
      success: true,
      message: `势力升级成功！当前等级：${nextRank}`,
      newRank: nextRank,
    };
  }

  static canPromoteForceType(sect: ISect, player: IPlayer, newType: ForceType): { can: boolean; message: string; cost: number } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { can: false, message: '你不是势力成员', cost: 0 };
    }

    const permissions = sect.type === ForceType.FAMILY ? FAMILY_ROLE_PERMISSIONS[member.role as FamilyRole] : SECT_ROLE_PERMISSIONS[member.role as SectRole];
    if (!permissions.canManageMembers) {
      return { can: false, message: '权限不足', cost: 0 };
    }

    const types = [ForceType.FAMILY, ForceType.CLAN, ForceType.SECT, ForceType.GREAT_SECT, ForceType.HOLY_LAND, ForceType.EMPIRE, ForceType.SUPREME];
    const currentIndex = types.indexOf(sect.type);
    const newIndex = types.indexOf(newType);

    if (newIndex <= currentIndex) {
      return { can: false, message: '新类型必须高于当前类型', cost: 0 };
    }

    const req = FORCE_CREATION_REQUIREMENTS[newType];
    if (player.realm < req.minRealm) {
      return { can: false, message: `境界不足，需要${req.minRealm}境`, cost: req.goldCost };
    }

    const cost = req.goldCost;
    if (player.gold < cost) {
      return { can: false, message: `金币不足，需要${cost}金币`, cost };
    }

    return { can: true, message: '可以晋升', cost };
  }

  static promoteForceType(sect: ISect, player: IPlayer, newType: ForceType): IForceUpgradeResult {
    const check = this.canPromoteForceType(sect, player, newType);
    if (!check.can) {
      return { success: false, message: check.message };
    }

    player.gold -= check.cost;
    sect.type = newType;
    sect.requiredRealm = FORCE_CREATION_REQUIREMENTS[newType].minRealm;
    sect.maxMembers = FORCE_CREATION_REQUIREMENTS[newType].goldCost / 100;

    if (newType !== ForceType.FAMILY) {
      sect.familyLineage = undefined;
      sect.members.forEach(m => {
        if (m.role === FamilyRole.FOUNDER) m.role = SectRole.MASTER;
        if (m.role === FamilyRole.PATRIARCH) m.role = SectRole.MASTER;
        if (m.role === FamilyRole.ELDER) m.role = SectRole.ELDER;
        if (m.role === FamilyRole.HEIR) m.role = SectRole.SUCCESSOR;
        if (m.role === FamilyRole.MEMBER) m.role = SectRole.DISCIPLE;
        delete m.lineage;
        delete m.generation;
      });
    }

    return {
      success: true,
      message: `势力晋升成功！当前类型：${newType}`,
      newType,
    };
  }

  static joinForce(player: IPlayer, sect: ISect): ISectJoinResult {
    if (player.sectId) {
      return { success: false, message: '你已经加入了一个势力' };
    }

    if (sect.members.length >= sect.maxMembers) {
      return { success: false, message: '势力人数已满' };
    }

    const member: ISectMember = {
      playerId: player.id,
      name: player.name,
      role: sect.type === ForceType.FAMILY ? FamilyRole.MEMBER : SectRole.DISCIPLE,
      contribution: 0,
      totalContribution: 0,
      joinTime: Date.now(),
      online: true,
    };

    sect.members.push(member);
    player.sectId = sect.id;

    return { success: true, message: `成功加入${sect.name}`, sect };
  }

  static leaveForce(player: IPlayer, sect: ISect): { success: boolean; message: string } {
    if (!player.sectId || player.sectId !== sect.id) {
      return { success: false, message: '你不在这个势力' };
    }

    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是这个势力的成员' };
    }

    if (member.role === SectRole.MASTER || member.role === FamilyRole.FOUNDER || member.role === FamilyRole.PATRIARCH) {
      return { success: false, message: '首领无法离开势力，请先传位' };
    }

    sect.members = sect.members.filter(m => m.playerId !== player.id);
    player.sectId = undefined;

    return { success: true, message: `成功离开${sect.name}` };
  }

  static donate(player: IPlayer, sect: ISect, gold: number): ISectDonateResult {
    if (!player.sectId || player.sectId !== sect.id) {
      return { success: false, message: '你不在这个势力', contributionGained: 0 };
    }

    if (player.gold < gold) {
      return { success: false, message: '金币不足', contributionGained: 0 };
    }

    player.gold -= gold;
    sect.treasury += gold;

    const contributionGained = Math.floor(gold / 10);
    const member = sect.members.find(m => m.playerId === player.id);
    if (member) {
      member.contribution += contributionGained;
      member.totalContribution += contributionGained;
    }

    sect.prosperity = Math.min(sect.maxProsperity, sect.prosperity + Math.floor(gold / 100));

    this.promoteMemberIfQualified(sect, member);

    return { success: true, message: `捐献成功，获得${contributionGained}贡献值`, contributionGained };
  }

  static promoteMemberIfQualified(sect: ISect, member: ISectMember | undefined): void {
    if (!member) return;

    if (sect.type === ForceType.FAMILY) {
      const promotionPath = [FamilyRole.MEMBER, FamilyRole.ELDER, FamilyRole.HEIR];
      const contributionRequirements = [500, 2000, 5000];

      const currentIndex = promotionPath.indexOf(member.role as FamilyRole);
      if (currentIndex >= promotionPath.length - 1) return;

      const requiredContribution = contributionRequirements[currentIndex];
      if (member.totalContribution >= requiredContribution) {
        member.role = promotionPath[currentIndex + 1];
      }
    } else {
      const promotionPath = [SectRole.DISCIPLE, SectRole.ELITE_DISCIPLE, SectRole.CORE_DISCIPLE, SectRole.ELDER];
      const contributionRequirements = [500, 2000, 5000, 10000];

      const currentIndex = promotionPath.indexOf(member.role as SectRole);
      if (currentIndex >= promotionPath.length - 1) return;

      const requiredContribution = contributionRequirements[currentIndex];
      if (member.totalContribution >= requiredContribution) {
        member.role = promotionPath[currentIndex + 1];
      }
    }
  }

  static upgradeSectBuilding(sect: ISect, buildingId: string, player: IPlayer): { success: boolean; message: string } {
    const building = sect.buildings.find(b => b.id === buildingId);
    if (!building) {
      return { success: false, message: '建筑不存在' };
    }

    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是势力成员' };
    }

    const permissions = sect.type === ForceType.FAMILY ? FAMILY_ROLE_PERMISSIONS[member.role as FamilyRole] : SECT_ROLE_PERMISSIONS[member.role as SectRole];
    if (!permissions.canUpgradeBuildings) {
      return { success: false, message: '权限不足' };
    }

    if (building.level >= building.maxLevel) {
      return { success: false, message: '建筑已达最高等级' };
    }

    const cost = calculateUpgradeCost(building);
    if (sect.treasury < cost) {
      return { success: false, message: '势力资金不足' };
    }

    sect.treasury -= cost;
    building.level++;
    building.upgradeCost = calculateUpgradeCost(building);

    const template = SECT_BUILDING_TEMPLATES[building.type];
    building.effect = {
      stat: template.effect.stat,
      value: template.effect.value * building.level,
      description: template.effect.description,
    };

    if (building.type === SectBuildingType.SPIRIT_WELL) {
      const spiritResource = sect.resources.find(r => r.type === ResourceType.SPIRIT_STONE);
      if (spiritResource) {
        spiritResource.productionPerHour += 100;
      }
    }

    if (building.type === SectBuildingType.MARKET) {
      sect.resources.forEach(r => {
        r.productionPerHour *= 1.1;
      });
    }

    return { success: true, message: `${building.name}升级成功！当前等级：${building.level}` };
  }

  static acceptQuest(player: IPlayer, sect: ISect, questId: string): ISectQuestResult {
    const quest = sect.quests.find(q => q.id === questId);
    if (!quest) {
      return { success: false, message: '任务不存在' };
    }

    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是势力成员' };
    }

    if (quest.requirements.minRealm && player.realm < quest.requirements.minRealm) {
      return { success: false, message: '境界不足' };
    }

    if (quest.requirements.minContribution && member.contribution < quest.requirements.minContribution) {
      return { success: false, message: '贡献值不足' };
    }

    if (quest.completedCount >= quest.maxDaily) {
      return { success: false, message: '今日已完成该任务' };
    }

    quest.completedCount++;
    member.contribution += quest.rewards.contribution;
    member.totalContribution += quest.rewards.contribution;
    player.cultivationExp += quest.rewards.exp;
    player.gold += quest.rewards.gold;

    if (quest.rewards.reputation) {
      sect.reputation += quest.rewards.reputation;
    }

    sect.prosperity = Math.min(sect.maxProsperity, sect.prosperity + 10);

    this.promoteMemberIfQualified(sect, member);

    return {
      success: true,
      message: `完成任务「${quest.title}」！获得${quest.rewards.contribution}贡献值、${quest.rewards.exp}经验、${quest.rewards.gold}金币`,
      rewards: quest.rewards,
    };
  }

  static declareWar(attackerSect: ISect, defenderSect: ISect, player: IPlayer): ISectWarResult {
    const member = attackerSect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是进攻方势力成员', victory: false };
    }

    const permissions = attackerSect.type === ForceType.FAMILY ? FAMILY_ROLE_PERMISSIONS[member.role as FamilyRole] : SECT_ROLE_PERMISSIONS[member.role as SectRole];
    if (!permissions.canDeclareWar) {
      return { success: false, message: '权限不足', victory: false };
    }

    if (attackerSect.war) {
      return { success: false, message: '势力正在进行战争', victory: false };
    }

    const war: ISectWar = {
      id: `war_${Date.now()}`,
      enemySectId: defenderSect.id,
      enemySectName: defenderSect.name,
      state: SectWarState.INVADING,
      startTime: Date.now(),
      endTime: Date.now() + 3600000,
      attackerScore: 0,
      defenderScore: 0,
      participants: [],
      rewards: { contribution: 500 },
      attackingUnits: [],
      defendingUnits: [],
      strategy: WarStrategy.ALL_OUT_ATTACK,
    };

    attackerSect.war = war;

    return {
      success: true,
      message: `向${defenderSect.name}宣战！战争开始！`,
      victory: false,
    };
  }

  static participateInWar(player: IPlayer, sect: ISect): { success: boolean; message: string } {
    if (!sect.war) {
      return { success: false, message: '势力没有正在进行的战争' };
    }

    if (sect.war.participants.includes(player.id)) {
      return { success: false, message: '你已经参加了这场战争' };
    }

    sect.war.participants.push(player.id);

    return { success: true, message: '成功加入战争！' };
  }

  static resolveWar(sect: ISect): ISectWarResult {
    if (!sect.war) {
      return { success: false, message: '没有正在进行的战争', victory: false };
    }

    const attackerPower = calculateSectPower(sect);
    const defenderSect = {} as ISect;
    const defenderPower = calculateSectPower(defenderSect);

    const powerRatio = attackerPower / (attackerPower + defenderPower);
    const randomFactor = 0.4 + Math.random() * 0.2;
    const attackerChance = powerRatio * randomFactor;

    const victory = attackerChance > 0.5;

    if (victory) {
      sect.war.state = SectWarState.VICTORY;
      sect.reputation += 100;
      sect.treasury += 10000;
      sect.prosperity = Math.min(sect.maxProsperity, sect.prosperity + 50);

      sect.war.participants.forEach(playerId => {
        const member = sect.members.find(m => m.playerId === playerId);
        if (member) {
          member.contribution += 500;
          member.totalContribution += 500;
        }
      });

      return {
        success: true,
        message: `战争胜利！势力声望+100，宝库+10000金币，参战成员获得500贡献值！`,
        victory: true,
        rewards: { contribution: 500 },
      };
    } else {
      sect.war.state = SectWarState.DEFEAT;
      sect.reputation -= 50;
      sect.prosperity = Math.max(0, sect.prosperity - 30);

      return {
        success: true,
        message: `战争失败...势力声望-50`,
        victory: false,
      };
    }
  }

  static unlockTechnique(sect: ISect, technique: ITechnique, player: IPlayer): { success: boolean; message: string } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是势力成员' };
    }

    const permissions = sect.type === ForceType.FAMILY ? FAMILY_ROLE_PERMISSIONS[member.role as FamilyRole] : SECT_ROLE_PERMISSIONS[member.role as SectRole];
    if (!permissions.canAccessTechniques) {
      return { success: false, message: '权限不足' };
    }

    if (sect.techniques.some(t => t.id === technique.id)) {
      return { success: false, message: '功法已解锁' };
    }

    const library = sect.buildings.find(b => b.type === SectBuildingType.LIBRARY);
    if (!library || library.level < 3) {
      return { success: false, message: '藏经阁等级不足' };
    }

    sect.techniques.push(technique);

    return { success: true, message: `成功解锁功法「${technique.name}」！` };
  }

  static getMemberRole(player: IPlayer, sect: ISect): SectRole | FamilyRole | null {
    const member = sect.members.find(m => m.playerId === player.id);
    return member ? member.role : null;
  }

  static getSectBonuses(sect: ISect): Record<string, number> {
    const bonuses: Record<string, number> = {};

    sect.buildings.forEach(building => {
      bonuses[building.effect.stat] = (bonuses[building.effect.stat] || 0) + building.effect.value;
    });

    return bonuses;
  }

  static collectResources(sect: ISect): IResourceCollectResult {
    const collected: Record<string, number> = {};

    sect.resources.forEach(resource => {
      const amount = resource.productionPerHour;
      resource.amount = Math.min(resource.storageCapacity, resource.amount + amount);
      collected[resource.type] = amount;
    });

    return {
      success: true,
      message: '资源收集完成',
      resources: collected,
    };
  }

  static addDiplomaticRelation(sect: ISect, forceId: string, forceName: string, relation: DiplomaticRelation): IDiplomacyResult {
    const existing = sect.diplomacy.find(d => d.forceId === forceId);
    if (existing) {
      existing.relation = relation;
      existing.lastInteractionTime = Date.now();
    } else {
      sect.diplomacy.push({
        forceId,
        forceName,
        relation,
        relationLevel: 1,
        lastInteractionTime: Date.now(),
      });
    }

    return { success: true, message: `与${forceName}建立${relation}关系`, relation };
  }

  static improveDiplomaticRelation(sect: ISect, forceId: string): IDiplomacyResult {
    const relation = sect.diplomacy.find(d => d.forceId === forceId);
    if (!relation) {
      return { success: false, message: '外交关系不存在' };
    }

    const relations = [DiplomaticRelation.RIVAL, DiplomaticRelation.NEUTRAL, DiplomaticRelation.ALLY, DiplomaticRelation.SUBORDINATE];
    const currentIndex = relations.indexOf(relation.relation);

    if (currentIndex >= relations.length - 1) {
      relation.relationLevel = Math.min(10, relation.relationLevel + 1);
      return { success: true, message: `${relation.forceName}关系等级提升至${relation.relationLevel}`, relation: relation.relation };
    }

    relation.relation = relations[currentIndex + 1];
    relation.lastInteractionTime = Date.now();

    return { success: true, message: `与${relation.forceName}关系提升为${relation.relation}`, relation: relation.relation };
  }

  static worsenDiplomaticRelation(sect: ISect, forceId: string): IDiplomacyResult {
    const relation = sect.diplomacy.find(d => d.forceId === forceId);
    if (!relation) {
      return { success: false, message: '外交关系不存在' };
    }

    const relations = [DiplomaticRelation.RIVAL, DiplomaticRelation.NEUTRAL, DiplomaticRelation.ALLY, DiplomaticRelation.SUBORDINATE];
    const currentIndex = relations.indexOf(relation.relation);

    if (currentIndex <= 0) {
      return { success: false, message: '关系已达最差' };
    }

    relation.relation = relations[currentIndex - 1];
    relation.lastInteractionTime = Date.now();

    return { success: true, message: `与${relation.forceName}关系恶化为${relation.relation}`, relation: relation.relation };
  }

  static generateForceEvent(sect: ISect): IForceEvent | null {
    const template = FORCE_EVENT_TEMPLATES[Math.floor(Math.random() * FORCE_EVENT_TEMPLATES.length)];
    if (!template) return null;

    const event: IForceEvent = {
      ...template,
      id: `event_${Date.now()}`,
      timestamp: Date.now(),
      resolved: false,
    };

    sect.events.push(event);
    return event;
  }

  static resolveForceEvent(sect: ISect, eventId: string, choiceId: string): IForceEventResult {
    const event = sect.events.find(e => e.id === eventId);
    if (!event) {
      return { success: false, message: '事件不存在' };
    }

    if (event.resolved) {
      return { success: false, message: '事件已解决' };
    }

    const choice = event.choices.find(c => c.id === choiceId);
    if (!choice) {
      return { success: false, message: '选项不存在' };
    }

    event.resolved = true;

    if (choice.rewards) {
      if (choice.rewards.contribution) {
        sect.contribution += choice.rewards.contribution;
      }
      if (choice.rewards.gold) {
        sect.treasury += choice.rewards.gold;
      }
      if (choice.rewards.resources) {
        for (const [resourceType, amount] of Object.entries(choice.rewards.resources)) {
          const resource = sect.resources.find(r => r.type === resourceType);
          if (resource) {
            resource.amount += amount;
          }
        }
      }
    }

    if (choice.penalties) {
      if (choice.penalties.contribution) {
        sect.contribution = Math.max(0, sect.contribution + choice.penalties.contribution);
      }
      if (choice.penalties.gold) {
        sect.treasury = Math.max(0, sect.treasury + choice.penalties.gold);
      }
      if (choice.penalties.reputation) {
        sect.reputation = Math.max(0, sect.reputation + choice.penalties.reputation);
      }
    }

    return {
      success: true,
      message: choice.result,
      rewards: choice.rewards,
      penalties: choice.penalties,
    };
  }

  static addTerritory(sect: ISect, territoryName: string): { success: boolean; message: string } {
    if (sect.territory.includes(territoryName)) {
      return { success: false, message: '领地已存在' };
    }

    sect.territory.push(territoryName);
    sect.prosperity = Math.min(sect.maxProsperity, sect.prosperity + 100);

    return { success: true, message: `成功占领领地：${territoryName}` };
  }

  static removeTerritory(sect: ISect, territoryName: string): { success: boolean; message: string } {
    const index = sect.territory.indexOf(territoryName);
    if (index === -1) {
      return { success: false, message: '领地不存在' };
    }

    sect.territory.splice(index, 1);
    sect.prosperity = Math.max(0, sect.prosperity - 50);

    return { success: true, message: `失去领地：${territoryName}` };
  }

  static transferLeadership(sect: ISect, player: IPlayer, newLeaderId: string): { success: boolean; message: string } {
    const currentLeader = sect.members.find(m => m.playerId === player.id);
    if (!currentLeader) {
      return { success: false, message: '你不是首领' };
    }

    const newLeader = sect.members.find(m => m.playerId === newLeaderId);
    if (!newLeader) {
      return { success: false, message: '新首领不存在' };
    }

    const oldRole = currentLeader.role;
    currentLeader.role = sect.type === ForceType.FAMILY ? FamilyRole.ELDER : SectRole.GRAND_ELDER;
    newLeader.role = oldRole;

    return { success: true, message: `成功传位给${newLeader.name}！` };
  }

  static getForceStatus(sect: ISect): {
    power: number;
    prosperity: number;
    maxProsperity: number;
    memberCount: number;
    maxMembers: number;
    treasury: number;
    reputation: number;
    territoryCount: number;
    resourceSummary: Record<string, number>;
  } {
    const resourceSummary: Record<string, number> = {};
    sect.resources.forEach(r => {
      resourceSummary[r.type] = r.amount;
    });

    return {
      power: calculateSectPower(sect),
      prosperity: sect.prosperity,
      maxProsperity: sect.maxProsperity,
      memberCount: sect.members.length,
      maxMembers: sect.maxMembers,
      treasury: sect.treasury,
      reputation: sect.reputation,
      territoryCount: sect.territory.length,
      resourceSummary,
    };
  }

  static canUnlockHolyLand(sect: ISect, player: IPlayer, holyLandType: HolyLandType): { can: boolean; message: string; cost: number } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { can: false, message: '你不是势力成员', cost: 0 };
    }

    const permissions = sect.type === ForceType.FAMILY ? FAMILY_ROLE_PERMISSIONS[member.role as FamilyRole] : SECT_ROLE_PERMISSIONS[member.role as SectRole];
    if (!permissions.canUpgradeBuildings) {
      return { can: false, message: '权限不足', cost: 0 };
    }

    const template = HOLY_LAND_TEMPLATES[holyLandType];
    if (!template) {
      return { can: false, message: '修炼圣地不存在', cost: 0 };
    }

    const existing = sect.holyLands.find(h => h.type === holyLandType);
    if (existing) {
      return { can: false, message: '该修炼圣地已解锁', cost: 0 };
    }

    const rankIndex = [ForceRank.LEVEL_1, ForceRank.LEVEL_2, ForceRank.LEVEL_3, ForceRank.LEVEL_4, ForceRank.LEVEL_5].indexOf(sect.rank);
    const requiredRankIndex = [ForceRank.LEVEL_1, ForceRank.LEVEL_2, ForceRank.LEVEL_3, ForceRank.LEVEL_4, ForceRank.LEVEL_5].indexOf(template.unlockRequirement.minForceRank);
    if (rankIndex < requiredRankIndex) {
      return { can: false, message: `势力等级不足，需要${template.unlockRequirement.minForceRank}`, cost: template.unlockRequirement.goldCost };
    }

    if (sect.treasury < template.unlockRequirement.goldCost) {
      return { can: false, message: `国库资金不足，需要${template.unlockRequirement.goldCost}金币`, cost: template.unlockRequirement.goldCost };
    }

    if (template.unlockRequirement.requiredBuildings) {
      for (const requiredBuilding of template.unlockRequirement.requiredBuildings) {
        const building = sect.buildings.find(b => b.type === requiredBuilding);
        if (!building || building.level < 5) {
          return { can: false, message: `${SECT_BUILDING_TEMPLATES[requiredBuilding].name}等级不足，需要5级`, cost: template.unlockRequirement.goldCost };
        }
      }
    }

    return { can: true, message: '可以解锁', cost: template.unlockRequirement.goldCost };
  }

  static unlockHolyLand(sect: ISect, player: IPlayer, holyLandType: HolyLandType): { success: boolean; message: string; holyLand?: IHolyLand } {
    const check = this.canUnlockHolyLand(sect, player, holyLandType);
    if (!check.can) {
      return { success: false, message: check.message };
    }

    const template = HOLY_LAND_TEMPLATES[holyLandType];
    const rankBonus = FORCE_RANK_BONUSES[sect.rank];

    const holyLand: IHolyLand = {
      id: `holyland_${Date.now()}`,
      type: holyLandType,
      name: template.name,
      level: 1,
      maxLevel: template.maxLevel,
      description: template.description,
      bonus: {
        expMultiplier: template.baseBonus.expMultiplier * rankBonus.resourceBonus,
        breakthroughRateBonus: template.baseBonus.breakthroughRateBonus * rankBonus.reputationBonus,
        daoHeartGrowth: template.baseBonus.daoHeartGrowth * rankBonus.resourceBonus,
        meridianEnhancement: template.baseBonus.meridianEnhancement * rankBonus.resourceBonus,
        lawInsightBonus: template.baseBonus.lawInsightBonus * rankBonus.resourceBonus,
      },
      unlockRequirement: template.unlockRequirement,
      currentUsers: [],
      maxUsers: template.maxUsers,
      upgradeCost: template.baseUpgradeCost,
    };

    sect.treasury -= check.cost;
    sect.holyLands.push(holyLand);
    sect.prosperity = Math.min(sect.maxProsperity, sect.prosperity + 50);

    return { success: true, message: `成功解锁修炼圣地「${template.name}」！`, holyLand };
  }

  static upgradeHolyLand(sect: ISect, player: IPlayer, holyLandId: string): { success: boolean; message: string } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是势力成员' };
    }

    const permissions = sect.type === ForceType.FAMILY ? FAMILY_ROLE_PERMISSIONS[member.role as FamilyRole] : SECT_ROLE_PERMISSIONS[member.role as SectRole];
    if (!permissions.canUpgradeBuildings) {
      return { success: false, message: '权限不足' };
    }

    const holyLand = sect.holyLands.find(h => h.id === holyLandId);
    if (!holyLand) {
      return { success: false, message: '修炼圣地不存在' };
    }

    if (holyLand.level >= holyLand.maxLevel) {
      return { success: false, message: '已达最高等级' };
    }

    const upgradeCost = Math.floor(holyLand.upgradeCost * Math.pow(1.5, holyLand.level));
    if (sect.treasury < upgradeCost) {
      return { success: false, message: `国库资金不足，需要${upgradeCost}金币` };
    }

    sect.treasury -= upgradeCost;
    holyLand.level++;

    const template = HOLY_LAND_TEMPLATES[holyLand.type];
    const rankBonus = FORCE_RANK_BONUSES[sect.rank];
    const levelMultiplier = 1 + (holyLand.level - 1) * 0.1;

    holyLand.bonus = {
      expMultiplier: template.baseBonus.expMultiplier * rankBonus.resourceBonus * levelMultiplier,
      breakthroughRateBonus: template.baseBonus.breakthroughRateBonus * rankBonus.reputationBonus * levelMultiplier,
      daoHeartGrowth: template.baseBonus.daoHeartGrowth * rankBonus.resourceBonus * levelMultiplier,
      meridianEnhancement: template.baseBonus.meridianEnhancement * rankBonus.resourceBonus * levelMultiplier,
      lawInsightBonus: template.baseBonus.lawInsightBonus * rankBonus.resourceBonus * levelMultiplier,
    };

    holyLand.maxUsers = template.maxUsers + Math.floor((holyLand.level - 1) / 3);
    holyLand.upgradeCost = Math.floor(template.baseUpgradeCost * Math.pow(1.5, holyLand.level));

    return { success: true, message: `成功将「${holyLand.name}」升级至${holyLand.level}级！` };
  }

  static enterHolyLand(sect: ISect, player: IPlayer, holyLandId: string): { success: boolean; message: string; bonus?: ICultivationBonus } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是势力成员' };
    }

    const holyLand = sect.holyLands.find(h => h.id === holyLandId);
    if (!holyLand) {
      return { success: false, message: '修炼圣地不存在' };
    }

    if (holyLand.currentUsers.length >= holyLand.maxUsers) {
      return { success: false, message: '修炼圣地已满' };
    }

    if (holyLand.currentUsers.includes(player.id)) {
      return { success: false, message: '你已经在该修炼圣地中' };
    }

    holyLand.currentUsers.push(player.id);
    return { success: true, message: `进入「${holyLand.name}」修炼！`, bonus: holyLand.bonus };
  }

  static leaveHolyLand(sect: ISect, player: IPlayer, holyLandId: string): { success: boolean; message: string } {
    const holyLand = sect.holyLands.find(h => h.id === holyLandId);
    if (!holyLand) {
      return { success: false, message: '修炼圣地不存在' };
    }

    const index = holyLand.currentUsers.indexOf(player.id);
    if (index === -1) {
      return { success: false, message: '你不在该修炼圣地中' };
    }

    holyLand.currentUsers.splice(index, 1);
    return { success: true, message: `离开「${holyLand.name}」` };
  }

  static getPlayerHolyLandBonus(player: IPlayer, sect: ISect): ICultivationBonus {
    const bonus: ICultivationBonus = {
      expMultiplier: 1,
      breakthroughRateBonus: 0,
      daoHeartGrowth: 0,
      meridianEnhancement: 0,
      lawInsightBonus: 0,
    };

    for (const holyLand of sect.holyLands) {
      if (holyLand.currentUsers.includes(player.id)) {
        bonus.expMultiplier *= holyLand.bonus.expMultiplier;
        bonus.breakthroughRateBonus += holyLand.bonus.breakthroughRateBonus;
        bonus.daoHeartGrowth += holyLand.bonus.daoHeartGrowth;
        bonus.meridianEnhancement += holyLand.bonus.meridianEnhancement;
        bonus.lawInsightBonus += holyLand.bonus.lawInsightBonus;
      }
    }

    return bonus;
  }

  static upgradeTreasury(sect: ISect, player: IPlayer): { success: boolean; message: string } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是势力成员' };
    }

    const permissions = sect.type === ForceType.FAMILY ? FAMILY_ROLE_PERMISSIONS[member.role as FamilyRole] : SECT_ROLE_PERMISSIONS[member.role as SectRole];
    if (!permissions.canManageTreasury) {
      return { success: false, message: '权限不足' };
    }

    const treasury = sect.treasurySystem;
    if (treasury.level >= treasury.maxLevel) {
      return { success: false, message: '宝库已达最高等级' };
    }

    if (sect.treasury < treasury.upgradeCost) {
      return { success: false, message: `国库资金不足，需要${treasury.upgradeCost}金币` };
    }

    sect.treasury -= treasury.upgradeCost;
    treasury.level++;

    const rarityOrder = [TreasureRarity.COMMON, TreasureRarity.UNCOMMON, TreasureRarity.RARE, TreasureRarity.EPIC, TreasureRarity.LEGENDARY, TreasureRarity.MYTHIC];
    const currentRarityIndex = rarityOrder.indexOf(treasury.unlockRarity);
    if (treasury.level >= 3 && currentRarityIndex < rarityOrder.length - 1) {
      treasury.unlockRarity = rarityOrder[currentRarityIndex + 1];
    }

    treasury.capacity = 50 + (treasury.level - 1) * 30;
    treasury.upgradeCost = Math.floor(treasury.upgradeCost * 1.8);

    return { success: true, message: `宝库升级至${treasury.level}级！容量提升至${treasury.capacity}，解锁${treasury.unlockRarity}品质宝物！` };
  }

  static addTreasure(sect: ISect, treasure: Omit<IForceTreasure, 'id' | 'acquireTime' | 'available'>): { success: boolean; message: string; treasure?: IForceTreasure } {
    const treasury = sect.treasurySystem;
    if (treasury.treasures.length >= treasury.capacity) {
      return { success: false, message: '宝库已满，请升级宝库或清理空间' };
    }

    const rarityOrder = [TreasureRarity.COMMON, TreasureRarity.UNCOMMON, TreasureRarity.RARE, TreasureRarity.EPIC, TreasureRarity.LEGENDARY, TreasureRarity.MYTHIC];
    const treasureRarityIndex = rarityOrder.indexOf(treasure.rarity);
    const unlockRarityIndex = rarityOrder.indexOf(treasury.unlockRarity);
    if (treasureRarityIndex > unlockRarityIndex) {
      return { success: false, message: `当前宝库等级无法存放${treasure.rarity}品质的宝物` };
    }

    const newTreasure: IForceTreasure = {
      ...treasure,
      id: `treasure_${Date.now()}`,
      acquireTime: Date.now(),
      available: true,
    };

    treasury.treasures.push(newTreasure);
    sect.prosperity = Math.min(sect.maxProsperity, sect.prosperity + 10);

    return { success: true, message: `成功将「${treasure.name}」存入宝库！`, treasure: newTreasure };
  }

  static withdrawTreasure(sect: ISect, player: IPlayer, treasureId: string): { success: boolean; message: string; treasure?: IForceTreasure } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是势力成员' };
    }

    const permissions = sect.type === ForceType.FAMILY ? FAMILY_ROLE_PERMISSIONS[member.role as FamilyRole] : SECT_ROLE_PERMISSIONS[member.role as SectRole];
    if (!permissions.canWithdrawTreasure) {
      return { success: false, message: '权限不足' };
    }

    const treasure = sect.treasurySystem.treasures.find(t => t.id === treasureId);
    if (!treasure) {
      return { success: false, message: '宝物不存在' };
    }

    if (!treasure.available) {
      return { success: false, message: '该宝物已被使用' };
    }

    treasure.available = false;
    treasure.ownerId = player.id;

    return { success: true, message: `成功取出「${treasure.name}」！`, treasure };
  }

  static returnTreasure(sect: ISect, player: IPlayer, treasureId: string): { success: boolean; message: string } {
    const treasure = sect.treasurySystem.treasures.find(t => t.id === treasureId);
    if (!treasure) {
      return { success: false, message: '宝物不存在' };
    }

    if (treasure.ownerId !== player.id) {
      return { success: false, message: '你不是该宝物的使用者' };
    }

    treasure.available = true;
    treasure.ownerId = undefined;

    return { success: true, message: `成功归还「${treasure.name}」至宝库！` };
  }

  static getAvailableTreasures(sect: ISect): IForceTreasure[] {
    return sect.treasurySystem.treasures.filter(t => t.available);
  }

  static getPlayerTreasures(sect: ISect, playerId: string): IForceTreasure[] {
    return sect.treasurySystem.treasures.filter(t => t.ownerId === playerId);
  }

  static getTreasureEffects(treasure: IForceTreasure): string {
    return Object.entries(treasure.effects).map(([key, value]) => `${key}: +${value}`).join(', ');
  }

  static createInheritance(sect: ISect, player: IPlayer, technique: ITechnique, inheritanceType: TechniqueInheritanceType): { success: boolean; message: string; inheritance?: ITechniqueInheritance } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是势力成员' };
    }

    const existing = sect.techniqueInheritances.find(i => i.techniqueId === technique.id);
    if (existing) {
      return { success: false, message: '该功法已有传承' };
    }

    const inheritance: ITechniqueInheritance = {
      id: `inheritance_${Date.now()}`,
      techniqueId: technique.id,
      techniqueName: technique.name,
      inheritanceType,
      evolutionStage: TechniqueEvolutionStage.ORIGINAL,
      founderId: player.id,
      founderName: player.name,
      inheritanceRequirements: {
        minContribution: 100,
        minRealm: technique.requiredRealm || CultivationRealm.MORTAL,
      },
      learnCount: 0,
      maxLearnCount: 10 + (sect.rank === ForceRank.LEVEL_5 ? 20 : 0),
      evolutionHistory: [{ stage: TechniqueEvolutionStage.ORIGINAL, time: Date.now(), contributorId: player.id, description: `${player.name}创建了该传承` }],
      bonusEffects: {},
    };

    sect.techniqueInheritances.push(inheritance);
    sect.reputation += 50;

    return { success: true, message: `成功创建功法传承「${technique.name}」！`, inheritance };
  }

  static canLearnInheritance(sect: ISect, player: IPlayer, inheritanceId: string): { can: boolean; message: string } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { can: false, message: '你不是势力成员' };
    }

    const inheritance = sect.techniqueInheritances.find(i => i.id === inheritanceId);
    if (!inheritance) {
      return { can: false, message: '传承不存在' };
    }

    if (inheritance.learnCount >= inheritance.maxLearnCount) {
      return { can: false, message: '传承名额已满' };
    }

    if (inheritance.inheritanceRequirements.minContribution && member.contribution < inheritance.inheritanceRequirements.minContribution) {
      return { can: false, message: `贡献值不足，需要${inheritance.inheritanceRequirements.minContribution}` };
    }

    if (inheritance.inheritanceRequirements.minRealm && player.realm < inheritance.inheritanceRequirements.minRealm) {
      return { can: false, message: `境界不足，需要${CultivationRealm[inheritance.inheritanceRequirements.minRealm]}` };
    }

    if (inheritance.inheritanceRequirements.requiredBuildingLevel) {
      const building = sect.buildings.find(b => b.type === inheritance.inheritanceRequirements.requiredBuildingLevel!.type);
      if (!building || building.level < inheritance.inheritanceRequirements.requiredBuildingLevel!.level) {
        return { can: false, message: `建筑等级不足` };
      }
    }

    return { can: true, message: '可以学习' };
  }

  static learnInheritance(sect: ISect, player: IPlayer, inheritanceId: string): { success: boolean; message: string; technique?: ITechnique } {
    const check = this.canLearnInheritance(sect, player, inheritanceId);
    if (!check.can) {
      return { success: false, message: check.message };
    }

    const inheritance = sect.techniqueInheritances.find(i => i.id === inheritanceId);
    if (!inheritance) {
      return { success: false, message: '传承不存在' };
    }

    inheritance.learnCount++;

    let mastery = sect.techniqueMasteries.find(m => m.playerId === player.id && m.techniqueId === inheritance.techniqueId);
    if (!mastery) {
      mastery = {
        playerId: player.id,
        techniqueId: inheritance.techniqueId,
        masteryLevel: 1,
        masteryExp: 0,
        maxMasteryExp: 100,
        canTeach: false,
        teachingCount: 0,
      };
      sect.techniqueMasteries.push(mastery);
    }

    const technique = sect.techniques.find(t => t.id === inheritance.techniqueId);

    return { success: true, message: `成功学习传承功法「${inheritance.techniqueName}」！`, technique };
  }

  static evolveInheritance(sect: ISect, player: IPlayer, inheritanceId: string): { success: boolean; message: string } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是势力成员' };
    }

    const inheritance = sect.techniqueInheritances.find(i => i.id === inheritanceId);
    if (!inheritance) {
      return { success: false, message: '传承不存在' };
    }

    const stages = [TechniqueEvolutionStage.ORIGINAL, TechniqueEvolutionStage.IMPROVED, TechniqueEvolutionStage.PERFECTED, TechniqueEvolutionStage.MYSTERIOUS, TechniqueEvolutionStage.DIVINE];
    const currentIndex = stages.indexOf(inheritance.evolutionStage);
    if (currentIndex >= stages.length - 1) {
      return { success: false, message: '已达最高进化阶段' };
    }

    const nextStage = stages[currentIndex + 1];
    const rankMultiplier = sect.rank === ForceRank.LEVEL_5 ? 0.5 : 1;
    const evolutionCost = Math.floor(50000 * (currentIndex + 1) * rankMultiplier);

    if (sect.treasury < evolutionCost) {
      return { success: false, message: `国库资金不足，需要${evolutionCost}金币` };
    }

    sect.treasury -= evolutionCost;
    inheritance.evolutionStage = nextStage;
    inheritance.evolutionHistory.push({
      stage: nextStage,
      time: Date.now(),
      contributorId: player.id,
      description: `${player.name}将功法进化至${nextStage}`,
    });

    const bonusMultiplier = 1 + currentIndex * 0.2;
    inheritance.bonusEffects = {
      power: Math.floor(10 * bonusMultiplier),
      speed: Math.floor(5 * bonusMultiplier),
      critRate: 0.02 * bonusMultiplier,
    };

    sect.reputation += 100 * (currentIndex + 1);

    return { success: true, message: `成功将「${inheritance.techniqueName}」进化至${nextStage}！` };
  }

  static getInheritanceBonus(inheritance: ITechniqueInheritance): Record<string, number> {
    return inheritance.bonusEffects;
  }

  static getPlayerMastery(sect: ISect, playerId: string, techniqueId: string): ITechniqueMastery | undefined {
    return sect.techniqueMasteries.find(m => m.playerId === playerId && m.techniqueId === techniqueId);
  }

  static addMasteryExp(sect: ISect, playerId: string, techniqueId: string, exp: number): { success: boolean; message: string; leveledUp: boolean } {
    let mastery = sect.techniqueMasteries.find(m => m.playerId === playerId && m.techniqueId === techniqueId);
    if (!mastery) {
      return { success: false, message: '未学习该功法', leveledUp: false };
    }

    mastery.masteryExp += exp;
    let leveledUp = false;

    while (mastery.masteryExp >= mastery.maxMasteryExp) {
      mastery.masteryExp -= mastery.maxMasteryExp;
      mastery.masteryLevel++;
      mastery.maxMasteryExp = Math.floor(mastery.maxMasteryExp * 1.5);

      if (mastery.masteryLevel >= 5) {
        mastery.canTeach = true;
      }

      leveledUp = true;
    }

    return { success: true, message: leveledUp ? `功法熟练度提升至${mastery.masteryLevel}级！` : '功法熟练度增加', leveledUp };
  }

  static UNIT_TEMPLATES: Record<UnitType, {
    name: string;
    baseAttack: number;
    baseDefense: number;
    baseSpeed: number;
    specialAbility: string;
    cost: { gold: number; resources: Record<string, number> };
  }> = {
    [UnitType.MORTAL_SOLDIER]: {
      name: '凡人士兵',
      baseAttack: 10,
      baseDefense: 5,
      baseSpeed: 5,
      specialAbility: '人海战术：数量优势提升攻击力',
      cost: { gold: 100, resources: { [ResourceType.ORE]: 10 } },
    },
    [UnitType.CULTIVATOR]: {
      name: '修士',
      baseAttack: 50,
      baseDefense: 20,
      baseSpeed: 15,
      specialAbility: '灵气攻击：造成额外灵气伤害',
      cost: { gold: 500, resources: { [ResourceType.SPIRIT_STONE]: 50 } },
    },
    [UnitType.ELITE_CULTIVATOR]: {
      name: '精英修士',
      baseAttack: 120,
      baseDefense: 50,
      baseSpeed: 25,
      specialAbility: '合击技：与其他精英修士协同作战',
      cost: { gold: 2000, resources: { [ResourceType.SPIRIT_STONE]: 200, [ResourceType.PRECIOUS]: 10 } },
    },
    [UnitType.BEAST_TAMER]: {
      name: '驯兽师',
      baseAttack: 80,
      baseDefense: 30,
      baseSpeed: 20,
      specialAbility: '召唤灵兽：战斗中召唤灵兽助战',
      cost: { gold: 1500, resources: { [ResourceType.WOOD]: 50, [ResourceType.HERB]: 30 } },
    },
    [UnitType.ARRAY_MASTER]: {
      name: '阵法师',
      baseAttack: 60,
      baseDefense: 40,
      baseSpeed: 10,
      specialAbility: '布置阵法：提升友军防御或削弱敌军',
      cost: { gold: 3000, resources: { [ResourceType.ORE]: 100, [ResourceType.PRECIOUS]: 20 } },
    },
    [UnitType.ALCHEMIST]: {
      name: '丹师',
      baseAttack: 40,
      baseDefense: 35,
      baseSpeed: 12,
      specialAbility: '战场炼丹：为友军提供增益丹药',
      cost: { gold: 2500, resources: { [ResourceType.HERB]: 100, [ResourceType.SPIRIT_STONE]: 100 } },
    },
    [UnitType.FORGER]: {
      name: '炼器师',
      baseAttack: 90,
      baseDefense: 60,
      baseSpeed: 10,
      specialAbility: '临时锻造：为友军打造临时武器',
      cost: { gold: 2800, resources: { [ResourceType.ORE]: 150, [ResourceType.WOOD]: 50 } },
    },
    [UnitType.ASSASSIN]: {
      name: '刺客',
      baseAttack: 150,
      baseDefense: 20,
      baseSpeed: 40,
      specialAbility: '暗杀：高概率造成暴击伤害',
      cost: { gold: 1800, resources: { [ResourceType.PRECIOUS]: 30, [ResourceType.HERB]: 20 } },
    },
    [UnitType.COMMANDER]: {
      name: '指挥官',
      baseAttack: 70,
      baseDefense: 50,
      baseSpeed: 18,
      specialAbility: '统帅：提升所有友军单位属性',
      cost: { gold: 5000, resources: { [ResourceType.PRECIOUS]: 100, [ResourceType.SPIRIT_STONE]: 500 } },
    },
  };

  static WAR_STRATEGY_EFFECTS: Record<WarStrategy, {
    attackBonus: number;
    defenseBonus: number;
    speedBonus: number;
    chanceToApply: number;
    description: string;
  }> = {
    [WarStrategy.ALL_OUT_ATTACK]: { attackBonus: 0.3, defenseBonus: -0.1, speedBonus: 0.15, chanceToApply: 0.8, description: '全力进攻，牺牲防御换取攻击力' },
    [WarStrategy.DEFENSIVE_FORMATION]: { attackBonus: -0.1, defenseBonus: 0.4, speedBonus: -0.1, chanceToApply: 0.9, description: '防守阵型，大幅提升防御力' },
    [WarStrategy.GUERRILLA]: { attackBonus: 0.1, defenseBonus: 0.1, speedBonus: 0.4, chanceToApply: 0.7, description: '游击战术，高机动性' },
    [WarStrategy.FLANK_ATTACK]: { attackBonus: 0.4, defenseBonus: -0.15, speedBonus: 0.2, chanceToApply: 0.6, description: '侧翼包抄，高风险高回报' },
    [WarStrategy.SIEGE]: { attackBonus: 0, defenseBonus: 0.25, speedBonus: -0.2, chanceToApply: 0.95, description: '围城战术，稳扎稳打' },
    [WarStrategy.COUNTER_ATTACK]: { attackBonus: 0.5, defenseBonus: 0, speedBonus: 0.1, chanceToApply: 0.5, description: '反击战术，抓住敌人破绽' },
  };

  static recruitUnit(sect: ISect, player: IPlayer, unitType: UnitType, count: number): { success: boolean; message: string; unit?: IWarUnit } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是势力成员' };
    }

    const permissions = sect.type === ForceType.FAMILY ? FAMILY_ROLE_PERMISSIONS[member.role as FamilyRole] : SECT_ROLE_PERMISSIONS[member.role as SectRole];
    if (!permissions.canDeclareWar) {
      return { success: false, message: '权限不足' };
    }

    const template = this.UNIT_TEMPLATES[unitType];
    if (!template) {
      return { success: false, message: '兵种不存在' };
    }

    const totalGoldCost = template.cost.gold * count;
    if (sect.treasury < totalGoldCost) {
      return { success: false, message: `金币不足，需要${totalGoldCost}` };
    }

    for (const [resourceType, amount] of Object.entries(template.cost.resources)) {
      const resource = sect.resources.find(r => r.type === resourceType);
      if (!resource || resource.amount < amount * count) {
        return { success: false, message: `${resourceType}不足` };
      }
    }

    sect.treasury -= totalGoldCost;
    for (const [resourceType, amount] of Object.entries(template.cost.resources)) {
      const resource = sect.resources.find(r => r.type === resourceType);
      if (resource) {
        resource.amount -= amount * count;
      }
    }

    const warRoom = sect.buildings.find(b => b.type === SectBuildingType.WAR_ROOM);
    const levelBonus = warRoom ? warRoom.level * 0.05 : 0;

    const unit: IWarUnit = {
      id: `unit_${Date.now()}`,
      type: unitType,
      name: template.name,
      count,
      level: warRoom?.level || 1,
      attack: Math.floor(template.baseAttack * (1 + levelBonus)),
      defense: Math.floor(template.baseDefense * (1 + levelBonus)),
      speed: Math.floor(template.baseSpeed * (1 + levelBonus)),
      specialAbility: template.specialAbility,
      cost: template.cost,
    };

    return { success: true, message: `成功招募${count}名${template.name}！`, unit };
  }

  static deployUnits(sect: ISect, player: IPlayer, units: IWarUnit[], strategy: WarStrategy, targetSectId?: string): { success: boolean; message: string; deployment?: IStrategicDeployment } {
    const member = sect.members.find(m => m.playerId === player.id);
    if (!member) {
      return { success: false, message: '你不是势力成员' };
    }

    const permissions = sect.type === ForceType.FAMILY ? FAMILY_ROLE_PERMISSIONS[member.role as FamilyRole] : SECT_ROLE_PERMISSIONS[member.role as SectRole];
    if (!permissions.canDeclareWar) {
      return { success: false, message: '权限不足' };
    }

    if (units.length === 0) {
      return { success: false, message: '请选择要部署的部队' };
    }

    const deployment: IStrategicDeployment = {
      id: `deployment_${Date.now()}`,
      sectId: sect.id,
      units,
      strategy,
      targetSectId,
      deploymentTime: Date.now(),
      status: 'preparing',
    };

    return { success: true, message: `部署完成！采用${strategy}战术`, deployment };
  }

  static calculateBattlePower(units: IWarUnit[], strategy: WarStrategy): number {
    let totalPower = 0;
    const strategyEffect = this.WAR_STRATEGY_EFFECTS[strategy];

    for (const unit of units) {
      const basePower = (unit.attack + unit.defense + unit.speed) * unit.count;
      const strategyBonus = basePower * (1 + strategyEffect.attackBonus + strategyEffect.defenseBonus + strategyEffect.speedBonus);
      totalPower += strategyBonus;
    }

    return Math.floor(totalPower);
  }

  static simulateWar(attackerSect: ISect, defenderSect: ISect, attackerUnits: IWarUnit[], defenderUnits: IWarUnit[], attackerStrategy: WarStrategy, defenderStrategy: WarStrategy): { victory: boolean; attackerScore: number; defenderScore: number; rewards: { gold: number; reputation: number; resources: Record<string, number> } } {
    const attackerPower = this.calculateBattlePower(attackerUnits, attackerStrategy);
    const defenderPower = this.calculateBattlePower(defenderUnits, defenderStrategy);

    const attackerAdvantage = attackerPower / (attackerPower + defenderPower);
    const randomFactor = 0.8 + Math.random() * 0.4;
    const finalAdvantage = attackerAdvantage * randomFactor;

    const victory = finalAdvantage > 0.5;
    const attackerScore = victory ? Math.floor(attackerPower * randomFactor) : Math.floor(attackerPower * (1 - randomFactor));
    const defenderScore = !victory ? Math.floor(defenderPower * (1 - randomFactor)) : Math.floor(defenderPower * randomFactor);

    const rewards: { gold: number; reputation: number; resources: Record<string, number> } = {
      gold: victory ? Math.floor(defenderSect.treasury * 0.1) : 0,
      reputation: victory ? 50 : -20,
      resources: {},
    };

    if (victory) {
      attackerSect.statistics.totalWarVictories++;
      defenderSect.statistics.totalWarDefeats++;
      defenderSect.resources.forEach(r => {
        const loot = Math.floor(r.amount * 0.05);
        if (loot > 0) {
          rewards.resources[r.type] = loot;
          r.amount -= loot;
        }
      });
      attackerSect.treasury += rewards.gold;
    } else {
      attackerSect.statistics.totalWarDefeats++;
      defenderSect.statistics.totalWarVictories++;
    }

    return { victory, attackerScore, defenderScore, rewards };
  }

  static FORCE_ACHIEVEMENTS: IForceAchievement[] = [
    { id: 'achievement_1', name: '初露锋芒', description: '势力战力达到1000', tier: ForceAchievementTier.BRONZE, icon: '⚔️', requirements: [{ type: 'power', target: 1000 }], rewards: { gold: 1000, reputation: 50 }, unlocked: false, progress: {} },
    { id: 'achievement_2', name: '小有名气', description: '势力声望达到500', tier: ForceAchievementTier.BRONZE, icon: '🌟', requirements: [{ type: 'reputation', target: 500 }], rewards: { gold: 2000, reputation: 100 }, unlocked: false, progress: {} },
    { id: 'achievement_3', name: '繁荣昌盛', description: '势力繁荣度达到500', tier: ForceAchievementTier.BRONZE, icon: '🏯', requirements: [{ type: 'prosperity', target: 500 }], rewards: { gold: 3000, bonus: { resourceBonus: 0.1 } }, unlocked: false, progress: {} },
    { id: 'achievement_4', name: '开疆拓土', description: '占领10个领地', tier: ForceAchievementTier.SILVER, icon: '🗺️', requirements: [{ type: 'territory', target: 10 }], rewards: { gold: 5000, reputation: 200 }, unlocked: false, progress: {} },
    { id: 'achievement_5', name: '人才济济', description: '势力成员达到50人', tier: ForceAchievementTier.SILVER, icon: '👥', requirements: [{ type: 'members', target: 50 }], rewards: { gold: 5000, bonus: { memberBonus: 0.1 } }, unlocked: false, progress: {} },
    { id: 'achievement_6', name: '富甲一方', description: '收集20件宝物', tier: ForceAchievementTier.SILVER, icon: '💎', requirements: [{ type: 'treasures', target: 20 }], rewards: { gold: 10000 }, unlocked: false, progress: {} },
    { id: 'achievement_7', name: '百战百胜', description: '获得50场战争胜利', tier: ForceAchievementTier.GOLD, icon: '🏆', requirements: [{ type: 'warVictories', target: 50 }], rewards: { gold: 20000, reputation: 500, title: '常胜势力' }, unlocked: false, progress: {} },
    { id: 'achievement_8', name: '传承万古', description: '创建10个功法传承', tier: ForceAchievementTier.GOLD, icon: '📜', requirements: [{ type: 'inheritance', target: 10 }], rewards: { gold: 15000, bonus: { lawInsightBonus: 0.1 } }, unlocked: false, progress: {} },
    { id: 'achievement_9', name: '圣地之主', description: '解锁全部8个修炼圣地', tier: ForceAchievementTier.PLATINUM, icon: '🏔️', requirements: [{ type: 'power', target: 10000 }], rewards: { gold: 50000, reputation: 1000, bonus: { expMultiplier: 0.2 } }, unlocked: false, progress: {} },
    { id: 'achievement_10', name: '天下第一', description: '战力榜排名第一', tier: ForceAchievementTier.MYTHIC, icon: '👑', requirements: [{ type: 'power', target: 100000 }], rewards: { gold: 100000, reputation: 5000, title: '天下第一势力' }, unlocked: false, progress: {} },
  ];

  static updateStatistics(sect: ISect, type: keyof ISectStatistics, value: number): void {
    sect.statistics[type] += value;
    this.checkAchievements(sect);
  }

  static checkAchievements(sect: ISect): IForceAchievement[] {
    const newlyUnlocked: IForceAchievement[] = [];

    for (const template of this.FORCE_ACHIEVEMENTS) {
      const existing = sect.achievements.find(a => a.id === template.id);
      if (!existing) {
        sect.achievements.push({ ...template, progress: {} });
        continue;
      }

      if (existing.unlocked) continue;

      let allRequirementsMet = true;
      for (const req of template.requirements) {
        let currentValue = 0;
        switch (req.type) {
          case 'power': currentValue = calculateSectPower(sect); break;
          case 'reputation': currentValue = sect.reputation; break;
          case 'prosperity': currentValue = sect.prosperity; break;
          case 'territory': currentValue = sect.territory.length; break;
          case 'members': currentValue = sect.members.length; break;
          case 'treasures': currentValue = sect.treasurySystem.treasures.length; break;
          case 'warVictories': currentValue = sect.statistics.totalWarVictories; break;
          case 'inheritance': currentValue = sect.techniqueInheritances.length; break;
        }
        existing.progress[req.type] = Math.min(currentValue, req.target);
        if (currentValue < req.target) {
          allRequirementsMet = false;
        }
      }

      if (allRequirementsMet) {
        existing.unlocked = true;
        existing.unlockedTime = Date.now();
        newlyUnlocked.push(existing);

        if (existing.rewards.gold) {
          sect.treasury += existing.rewards.gold;
        }
        if (existing.rewards.reputation) {
          sect.reputation += existing.rewards.reputation;
        }
      }
    }

    return newlyUnlocked;
  }

  static generateLeaderboard(sects: ISect[], type: LeaderboardType): ILeaderboard {
    let entries: ILeaderboardEntry[] = [];

    switch (type) {
      case LeaderboardType.POWER:
        entries = sects.map(s => ({ sectId: s.id, sectName: s.name, type: s.type, rank: s.rank, value: calculateSectPower(s), rankChange: 0 })).sort((a, b) => b.value - a.value);
        break;
      case LeaderboardType.REPUTATION:
        entries = sects.map(s => ({ sectId: s.id, sectName: s.name, type: s.type, rank: s.rank, value: s.reputation, rankChange: 0 })).sort((a, b) => b.value - a.value);
        break;
      case LeaderboardType.PROSPERITY:
        entries = sects.map(s => ({ sectId: s.id, sectName: s.name, type: s.type, rank: s.rank, value: s.prosperity, rankChange: 0 })).sort((a, b) => b.value - a.value);
        break;
      case LeaderboardType.TERRITORY:
        entries = sects.map(s => ({ sectId: s.id, sectName: s.name, type: s.type, rank: s.rank, value: s.territory.length, rankChange: 0 })).sort((a, b) => b.value - a.value);
        break;
      case LeaderboardType.WAR_VICTORIES:
        entries = sects.map(s => ({ sectId: s.id, sectName: s.name, type: s.type, rank: s.rank, value: s.statistics.totalWarVictories, rankChange: 0 })).sort((a, b) => b.value - a.value);
        break;
      case LeaderboardType.TREASURES:
        entries = sects.map(s => ({ sectId: s.id, sectName: s.name, type: s.type, rank: s.rank, value: s.treasurySystem.treasures.length, rankChange: 0 })).sort((a, b) => b.value - a.value);
        break;
    }

    entries = entries.slice(0, 100).map((entry, index) => ({ ...entry, rankChange: Math.floor(Math.random() * 5) - 2 }));

    return { type, entries, lastUpdateTime: Date.now() };
  }

  static getSectRankInLeaderboard(sect: ISect, leaderboard: ILeaderboard): number {
    const index = leaderboard.entries.findIndex(e => e.sectId === sect.id);
    return index === -1 ? -1 : index + 1;
  }

  static DAILY_TASK_TEMPLATES: Omit<ISectDailyTask, 'id' | 'refreshTime' | 'claimedCount'>[] = [
    { name: '日常修炼', description: '在圣地修炼一次', category: TaskCategory.CULTIVATION, type: TaskType.DAILY, target: 1, unit: '次', rewards: { contribution: 50, exp: 100 }, difficulty: 'easy', maxDaily: 3 },
    { name: '贡献捐献', description: '向势力捐献金币', category: TaskCategory.DONATION, type: TaskType.DAILY, target: 1000, unit: '金币', rewards: { contribution: 200, gold: 100 }, difficulty: 'medium', maxDaily: 2 },
    { name: '资源收集', description: '收集势力资源', category: TaskCategory.COLLECTION, type: TaskType.DAILY, target: 10, unit: '份', rewards: { contribution: 100, resources: { spiritStone: 50 } }, difficulty: 'easy', maxDaily: 5 },
    { name: '功法修炼', description: '修炼势力功法', category: TaskCategory.INHERITANCE, type: TaskType.DAILY, target: 3, unit: '次', rewards: { contribution: 80, exp: 150 }, difficulty: 'medium', maxDaily: 2 },
    { name: '招募成员', description: '邀请新成员加入', category: TaskCategory.RECRUITMENT, type: TaskType.DAILY, target: 1, unit: '人', rewards: { contribution: 300, reputation: 20 }, difficulty: 'hard', maxDaily: 1 },
  ];

  static WEEKLY_TASK_TEMPLATES: Omit<ISectWeeklyTask, 'id' | 'claimedCount'>[] = [
    { name: '周常修炼', description: '在圣地修炼5次', category: TaskCategory.CULTIVATION, type: TaskType.WEEKLY, target: 5, unit: '次', rewards: { contribution: 300, exp: 500, gold: 500 }, difficulty: 'medium', refreshDay: 0, maxWeekly: 2 },
    { name: '战争准备', description: '参与势力战争', category: TaskCategory.WAR, type: TaskType.WEEKLY, target: 2, unit: '次', rewards: { contribution: 500, reputation: 100 }, difficulty: 'hard', refreshDay: 0, maxWeekly: 1 },
    { name: '资源储备', description: '收集大量资源', category: TaskCategory.COLLECTION, type: TaskType.WEEKLY, target: 100, unit: '份', rewards: { contribution: 400, resources: { spiritStone: 200 } }, difficulty: 'medium', refreshDay: 0, maxWeekly: 1 },
    { name: '功法传承', description: '传授功法给其他成员', category: TaskCategory.INHERITANCE, type: TaskType.WEEKLY, target: 3, unit: '次', rewards: { contribution: 600, exp: 300 }, difficulty: 'epic', refreshDay: 0, maxWeekly: 1 },
  ];

  static SPECIAL_TASK_TEMPLATES: Omit<ISectSpecialTask, 'id' | 'claimedCount'>[] = [
    { name: '势力崛起', description: '势力达到3级', category: TaskCategory.WAR, type: TaskType.SPECIAL, target: 3, unit: '级', rewards: { contribution: 2000, gold: 5000, reputation: 500, achievementPoints: 10 }, difficulty: 'hard', unlockCondition: { type: 'rank', value: ForceRank.LEVEL_3 }, expiresAt: 0, maxClaim: 1 },
    { name: '百战胜者', description: '赢得100场战争', category: TaskCategory.WAR, type: TaskType.SPECIAL, target: 100, unit: '场', rewards: { contribution: 5000, reputation: 1000, title: '常胜将军' }, difficulty: 'epic', unlockCondition: { type: 'achievement', value: 'achievement_6' }, expiresAt: 0, maxClaim: 1 },
  ];

  static generateDailyTasks(sect: ISect): void {
    const now = Date.now();
    const lastRefresh = sect.dailyTasks[0]?.refreshTime || 0;
    const dayMs = 24 * 60 * 60 * 1000;

    if (now - lastRefresh < dayMs) return;

    sect.dailyTasks = this.DAILY_TASK_TEMPLATES.map((t, i) => ({
      ...t,
      id: `daily_${sect.id}_${i}_${Date.now()}`,
      refreshTime: now,
      claimedCount: 0,
    }));
  }

  static generateWeeklyTasks(sect: ISect): void {
    const now = Date.now();
    const lastRefresh = sect.weeklyTasks[0]?.refreshDay !== undefined ? new Date(now).getDay() : -1;

    if (lastRefresh === 0) return;

    sect.weeklyTasks = this.WEEKLY_TASK_TEMPLATES.map((t, i) => ({
      ...t,
      id: `weekly_${sect.id}_${i}_${Date.now()}`,
      claimedCount: 0,
    }));
  }

  static updateTaskProgress(sect: ISect, playerId: string, taskId: string, progress: number): void {
    let existing = sect.taskProgress.find(p => p.taskId === taskId && p.playerId === playerId);
    const task = [...sect.dailyTasks, ...sect.weeklyTasks, ...sect.specialTasks].find(t => t.id === taskId);

    if (!task) return;

    if (!existing) {
      existing = { taskId, playerId, current: 0, target: task.target, completed: false, claimed: false, lastUpdateTime: Date.now() };
      sect.taskProgress.push(existing);
    }

    existing.current = Math.min(existing.current + progress, task.target);
    existing.completed = existing.current >= task.target;
    existing.lastUpdateTime = Date.now();
  }

  static claimTaskReward(sect: ISect, playerId: string, taskId: string): { success: boolean; message: string; rewards?: ISectTaskReward } {
    const progress = sect.taskProgress.find(p => p.taskId === taskId && p.playerId === playerId);
    const task = [...sect.dailyTasks, ...sect.weeklyTasks, ...sect.specialTasks].find(t => t.id === taskId);

    if (!progress || !task) return { success: false, message: '任务不存在' };
    if (!progress.completed) return { success: false, message: '任务未完成' };
    if (progress.claimed) return { success: false, message: '奖励已领取' };

    progress.claimed = true;
    return { success: true, message: '奖励领取成功', rewards: task.rewards };
  }

  static TECH_TEMPLATES: Omit<IForceTech, 'id' | 'level' | 'unlocked' | 'researching' | 'researchProgress' | 'researchStartTime'>[] = [
    { name: '修炼加速', description: '提升成员修炼速度', category: TechCategory.CULTIVATION, maxLevel: 5, prerequisites: [], effects: { cultivationSpeed: 0.1 }, researchCost: { gold: 10000, resources: { spiritStone: 100 }, time: 86400 } },
    { name: '战争强化', description: '提升兵种战斗力', category: TechCategory.WAR, maxLevel: 5, prerequisites: [], effects: { unitPower: 0.1 }, researchCost: { gold: 15000, resources: { iron: 200 }, time: 172800 } },
    { name: '经济繁荣', description: '提升资源产出', category: TechCategory.ECONOMY, maxLevel: 5, prerequisites: [], effects: { resourceOutput: 0.15 }, researchCost: { gold: 8000, resources: { wood: 150 }, time: 86400 } },
    { name: '防御工事', description: '增强领地防御', category: TechCategory.DEFENSE, maxLevel: 5, prerequisites: [], effects: { defensePower: 0.1 }, researchCost: { gold: 12000, resources: { stone: 300 }, time: 172800 } },
    { name: '圣地共鸣', description: '圣地效果增强', category: TechCategory.SPECIAL, maxLevel: 3, prerequisites: ['tech_cultivation_1'], effects: { holyLandBonus: 0.2 }, researchCost: { gold: 50000, resources: { spiritStone: 500 }, time: 259200 } },
  ];

  static initializeTechSystem(sect: ISect): void {
    if (sect.techSystem.techs.length > 0) return;

    sect.techSystem.techs = this.TECH_TEMPLATES.map((t, i) => ({
      ...t,
      id: `tech_${sect.id}_${i}`,
      level: 0,
      unlocked: false,
      researching: false,
      researchProgress: 0,
      researchStartTime: 0,
    }));
  }

  static canResearchTech(sect: ISect, techId: string, player: IPlayer): { success: boolean; message: string } {
    const tech = sect.techSystem.techs.find(t => t.id === techId);
    if (!tech) return { success: false, message: '科技不存在' };
    if (tech.level >= tech.maxLevel) return { success: false, message: '科技已达最高等级' };
    if (tech.researching) return { success: false, message: '正在研究中' };

    for (const prereq of tech.prerequisites) {
      const prereqTech = sect.techSystem.techs.find(t => t.id === prereq);
      if (!prereqTech || !prereqTech.unlocked) return { success: false, message: '前置科技未解锁' };
    }

    if (sect.treasury < tech.researchCost.gold) return { success: false, message: '金币不足' };

    return { success: true, message: '可以研究' };
  }

  static startResearch(sect: ISect, techId: string, player: IPlayer): { success: boolean; message: string } {
    const check = this.canResearchTech(sect, techId, player);
    if (!check.success) return check;

    const tech = sect.techSystem.techs.find(t => t.id === techId)!;
    sect.treasury -= tech.researchCost.gold;
    tech.researching = true;
    tech.researchStartTime = Date.now();

    return { success: true, message: `开始研究 ${tech.name}` };
  }

  static updateResearchProgress(sect: ISect): void {
    for (const tech of sect.techSystem.techs) {
      if (!tech.researching) continue;

      const elapsed = Date.now() - tech.researchStartTime;
      const totalTime = tech.researchCost.time * 1000;
      tech.researchProgress = Math.min(elapsed / totalTime, 1);

      if (tech.researchProgress >= 1) {
        tech.researching = false;
        tech.level++;
        tech.unlocked = true;
        tech.researchProgress = 0;
      }
    }
  }

  static SHOP_ITEM_TEMPLATES: Omit<IForceShopItem, 'id' | 'purchasedToday' | 'stock'>[] = [
    { name: '修炼丹', description: '提升修炼速度', type: ShopItemType.CONSUMABLE, quantity: 1, price: { contribution: 50 }, minContribution: 0, minRank: ForceRank.LEVEL_1, dailyLimit: 10 },
    { name: '灵石袋', description: '获得灵石', type: ShopItemType.RESOURCE, quantity: 100, price: { contribution: 100 }, minContribution: 100, minRank: ForceRank.LEVEL_1, dailyLimit: 5 },
    { name: '低级功法', description: '基础修炼功法', type: ShopItemType.TECHNIQUE, quantity: 1, price: { contribution: 500, gold: 1000 }, minContribution: 500, minRank: ForceRank.LEVEL_2, dailyLimit: 1 },
    { name: '精炼材料', description: '用于锻造的材料', type: ShopItemType.MATERIAL, quantity: 10, price: { contribution: 200 }, minContribution: 200, minRank: ForceRank.LEVEL_1, dailyLimit: 5 },
  ];

  static refreshShop(sect: ISect): void {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    if (now - sect.shopSystem.refreshTime < dayMs) return;

    sect.shopSystem.items = this.SHOP_ITEM_TEMPLATES.map((t, i) => ({
      ...t,
      id: `shop_${sect.id}_${i}_${Date.now()}`,
      purchasedToday: 0,
      stock: t.dailyLimit * 10,
    }));
    sect.shopSystem.refreshTime = now;
  }

  static purchaseShopItem(sect: ISect, playerId: string, itemId: string): { success: boolean; message: string } {
    const item = sect.shopSystem.items.find(i => i.id === itemId);
    if (!item) return { success: false, message: '物品不存在' };

    const member = sect.members.find(m => m.playerId === playerId);
    if (!member) return { success: false, message: '你不是势力成员' };
    if (member.contribution < item.minContribution) return { success: false, message: '贡献值不足' };
    if (item.purchasedToday >= item.dailyLimit) return { success: false, message: '今日购买次数已达上限' };
    if (item.stock <= 0) return { success: false, message: '库存不足' };

    if (item.price.contribution && member.contribution < item.price.contribution) {
      return { success: false, message: '贡献值不足' };
    }
    if (item.price.gold) {
      return { success: false, message: '金币不足' };
    }

    if (item.price.contribution) {
      member.contribution -= item.price.contribution;
    }
    item.purchasedToday++;
    item.stock -= item.quantity;

    return { success: true, message: `购买 ${item.name} 成功` };
  }

  static FEAST_TEMPLATES: { type: 'normal' | 'grand' | 'legendary'; name: string; cost: { gold: number; resources: Record<string, number> }; duration: number; effects: Record<string, number> }[] = [
    { type: 'normal', name: '普通宴会', cost: { gold: 5000, resources: { food: 100 } }, duration: 3600, effects: { memberMorale: 0.1, prosperityBonus: 0.05 } },
    { type: 'grand', name: '盛大宴会', cost: { gold: 20000, resources: { food: 500, wine: 200 } }, duration: 7200, effects: { memberMorale: 0.3, prosperityBonus: 0.15, recruitmentBonus: 0.2 } },
    { type: 'legendary', name: '传奇盛宴', cost: { gold: 100000, resources: { food: 2000, wine: 1000, spiritStone: 500 } }, duration: 14400, effects: { memberMorale: 0.5, prosperityBonus: 0.3, recruitmentBonus: 0.5, cultivationBonus: 0.2 } },
  ];

  static hostFeast(sect: ISect, type: 'normal' | 'grand' | 'legendary'): { success: boolean; message: string; feast?: IForceFeast } {
    if (sect.feastSystem.currentFeast) {
      return { success: false, message: '已有宴会进行中' };
    }

    const template = this.FEAST_TEMPLATES.find(t => t.type === type);
    if (!template) return { success: false, message: '宴会类型不存在' };

    if (sect.treasury < template.cost.gold) return { success: false, message: '金币不足' };

    sect.treasury -= template.cost.gold;
    const now = Date.now();

    const feast: IForceFeast = {
      id: `feast_${sect.id}_${now}`,
      name: template.name,
      type: template.type,
      cost: template.cost,
      duration: template.duration,
      effects: template.effects,
      participants: [],
      startTime: now,
      endTime: now + template.duration * 1000,
    };

    sect.feastSystem.currentFeast = feast;
    sect.feastSystem.feastHistory.push(feast);
    sect.feastSystem.feastBonus = { ...template.effects };

    return { success: true, message: `举办 ${template.name} 成功`, feast };
  }

  static updateFeastStatus(sect: ISect): void {
    const feast = sect.feastSystem.currentFeast;
    if (!feast) return;

    if (Date.now() >= feast.endTime) {
      sect.feastSystem.currentFeast = undefined;
      sect.feastSystem.feastBonus = {};
    }
  }

  static SECRET_REALM_TEMPLATES: Omit<IForceSecretRealm, 'id' | 'lastEnterTime'>[] = [
    { name: '试炼之地', description: '基础试炼秘境', tier: 1, unlockCondition: { sectRank: ForceRank.LEVEL_1 }, rewards: { gold: 1000, exp: 500, resources: { spiritStone: 100 }, treasures: [], techniques: [] }, difficulty: 1, cooldown: 86400 },
    { name: '远古遗迹', description: '蕴含远古传承的秘境', tier: 2, unlockCondition: { sectRank: ForceRank.LEVEL_2 }, rewards: { gold: 5000, exp: 2000, resources: { spiritStone: 500 }, treasures: ['treasure_rare_1'], techniques: ['technique_rare_1'] }, difficulty: 3, cooldown: 172800 },
    { name: '仙府洞天', description: '仙人遗留的洞天福地', tier: 3, unlockCondition: { sectRank: ForceRank.LEVEL_3 }, rewards: { gold: 20000, exp: 10000, resources: { spiritStone: 2000 }, treasures: ['treasure_epic_1'], techniques: ['technique_epic_1'] }, difficulty: 5, cooldown: 259200 },
    { name: '神界碎片', description: '神界破碎后的遗迹', tier: 4, unlockCondition: { sectRank: ForceRank.LEVEL_4 }, rewards: { gold: 100000, exp: 50000, resources: { spiritStone: 10000 }, treasures: ['treasure_legendary_1'], techniques: ['technique_legendary_1'] }, difficulty: 8, cooldown: 604800 },
    { name: '混沌秘境', description: '蕴含混沌之力的神秘空间', tier: 5, unlockCondition: { sectRank: ForceRank.LEVEL_5 }, rewards: { gold: 500000, exp: 200000, resources: { spiritStone: 50000 }, treasures: ['treasure_mythic_1'], techniques: ['technique_mythic_1'] }, difficulty: 10, cooldown: 1209600 },
  ];

  static unlockSecretRealm(sect: ISect, realmId: string): { success: boolean; message: string } {
    const template = this.SECRET_REALM_TEMPLATES.find((_, i) => `realm_${sect.id}_${i}` === realmId);
    if (!template) return { success: false, message: '秘境不存在' };

    if (template.unlockCondition.sectRank && sect.rank < template.unlockCondition.sectRank) {
      return { success: false, message: '势力等级不足' };
    }

    if (template.unlockCondition.techRequired) {
      const tech = sect.techSystem.techs.find(t => t.id === template.unlockCondition.techRequired);
      if (!tech || !tech.unlocked) return { success: false, message: '前置科技未解锁' };
    }

    const existing = sect.secretRealmSystem.realms.find(r => r.name === template.name);
    if (existing) return { success: false, message: '秘境已解锁' };

    const realm: IForceSecretRealm = {
      ...template,
      id: realmId,
      lastEnterTime: 0,
    };

    sect.secretRealmSystem.realms.push(realm);
    return { success: true, message: `解锁秘境 ${template.name}` };
  }

  static enterSecretRealm(sect: ISect, realmId: string, playerId: string): { success: boolean; message: string; rewards?: IForceSecretRealm['rewards'] } {
    const realm = sect.secretRealmSystem.realms.find(r => r.id === realmId);
    if (!realm) return { success: false, message: '秘境未解锁' };

    const now = Date.now();
    if (now - realm.lastEnterTime < realm.cooldown * 1000) {
      return { success: false, message: '秘境冷却中' };
    }

    realm.lastEnterTime = now;
    sect.secretRealmSystem.explorationProgress[realmId] = (sect.secretRealmSystem.explorationProgress[realmId] || 0) + 1;

    return { success: true, message: `进入秘境 ${realm.name}`, rewards: realm.rewards };
  }

  static createAlliance(sect: ISect, player: IPlayer, name: string): { success: boolean; message: string; alliance?: IForceAlliance } {
    if (sect.alliance) return { success: false, message: '已加入其他联盟' };

    const member = sect.members.find(m => m.playerId === player.id);
    if (!member || (sect.type === ForceType.FAMILY ? member.role !== FamilyRole.FOUNDER : member.role !== SectRole.MASTER)) {
      return { success: false, message: '只有宗主/族长可以创建联盟' };
    }

    const alliance: IForceAlliance = {
      id: `alliance_${Date.now()}`,
      name,
      leaderSectId: sect.id,
      leaderSectName: sect.name,
      members: [{ sectId: sect.id, sectName: sect.name, role: AllianceRole.LEADER, joinTime: Date.now() }],
      formationTime: Date.now(),
      reputation: sect.reputation,
      territory: [...sect.territory],
      warHistory: [],
    };

    sect.alliance = alliance;
    return { success: true, message: `创建联盟 ${name} 成功`, alliance };
  }

  static sendAllianceRequest(senderSect: ISect, receiverSect: ISect, message: string): { success: boolean; message: string } {
    if (senderSect.alliance) return { success: false, message: '已加入联盟' };
    if (!receiverSect.alliance) return { success: false, message: '目标势力没有联盟' };

    const existing = senderSect.allianceRequests.find(r => r.toSectId === receiverSect.id && r.status === 'pending');
    if (existing) return { success: false, message: '已有待处理的申请' };

    const request: IAllianceRequest = {
      id: `alliance_req_${Date.now()}`,
      fromSectId: senderSect.id,
      fromSectName: senderSect.name,
      toSectId: receiverSect.id,
      toSectName: receiverSect.name,
      type: 'join',
      message,
      timestamp: Date.now(),
      status: 'pending',
    };

    senderSect.allianceRequests.push(request);
    receiverSect.allianceRequests.push(request);

    return { success: true, message: '发送联盟申请成功' };
  }

  static acceptAllianceRequest(sect: ISect, requestId: string): { success: boolean; message: string } {
    const request = sect.allianceRequests.find(r => r.id === requestId);
    if (!request || request.status !== 'pending') return { success: false, message: '申请不存在或已处理' };

    if (!sect.alliance) return { success: false, message: '你没有联盟' };
    if (sect.id !== sect.alliance.leaderSectId) return { success: false, message: '只有盟主可以接受申请' };

    request.status = 'accepted';

    sect.alliance.members.push({
      sectId: request.fromSectId,
      sectName: request.fromSectName,
      role: AllianceRole.MEMBER,
      joinTime: Date.now(),
    });

    return { success: true, message: `接受 ${request.fromSectName} 加入联盟` };
  }

  static rejectAllianceRequest(sect: ISect, requestId: string): { success: boolean; message: string } {
    const request = sect.allianceRequests.find(r => r.id === requestId);
    if (!request || request.status !== 'pending') return { success: false, message: '申请不存在或已处理' };

    request.status = 'rejected';
    return { success: true, message: '拒绝联盟申请' };
  }

  static declareAllianceWar(alliance: IForceAlliance, targetAlliance: IForceAlliance): { success: boolean; message: string } {
    const now = Date.now();
    const recentWar = alliance.warHistory.find(w => now - w.time < 86400000);
    if (recentWar) return { success: false, message: '24小时内已发起过战争' };

    alliance.warHistory.push({ attackerAllianceId: alliance.id, defenderAllianceId: targetAlliance.id, victory: false, time: now });
    targetAlliance.warHistory.push({ attackerAllianceId: alliance.id, defenderAllianceId: targetAlliance.id, victory: false, time: now });

    return { success: true, message: `向 ${targetAlliance.name} 宣战` };
  }

  static captureTerritory(sect: ISect, territoryId: string): { success: boolean; message: string } {
    const territory = sect.territorySystem.territories.find(t => t.id === territoryId);
    if (!territory) return { success: false, message: '领地不存在' };
    if (territory.ownerSectId === sect.id) return { success: false, message: '已是你的领地' };

    const attackPower = calculateSectPower(sect);
    if (attackPower < territory.defensePower) return { success: false, message: '战力不足，无法占领' };

    territory.ownerSectId = sect.id;
    territory.ownerSectName = sect.name;
    territory.capturedTime = Date.now();
    sect.territory.push(territory.name);
    sect.territorySystem.ownedTerritories.push(territoryId);

    return { success: true, message: `占领领地 ${territory.name}` };
  }

  static collectTerritoryResources(sect: ISect, territoryId: string): { success: boolean; message: string; resources?: Record<string, number> } {
    const territory = sect.territorySystem.territories.find(t => t.id === territoryId);
    if (!territory) return { success: false, message: '领地不存在' };
    if (territory.ownerSectId !== sect.id) return { success: false, message: '不是你的领地' };

    sect.treasury += 100;
    return { success: true, message: '收集资源成功', resources: territory.resourceOutput };
  }

  static assignOfficial(sect: ISect, playerId: string, rank: ForceOfficialRank): { success: boolean; message: string } {
    const member = sect.members.find(m => m.playerId === playerId);
    if (!member) return { success: false, message: '成员不存在' };

    const existing = sect.officialSystem.officials.find(o => o.playerId === playerId);
    if (existing) {
      existing.endDate = Date.now();
    }

    const salaries: Record<ForceOfficialRank, { gold: number; contribution: number; resources: Record<string, number> }> = {
      [ForceOfficialRank.GRAND_MASTER]: { gold: 10000, contribution: 500, resources: { spiritStone: 200 } },
      [ForceOfficialRank.ELDER]: { gold: 5000, contribution: 200, resources: { spiritStone: 100 } },
      [ForceOfficialRank.REGION_MASTER]: { gold: 3000, contribution: 100, resources: { spiritStone: 50 } },
      [ForceOfficialRank.GUILD_LEADER]: { gold: 2000, contribution: 50, resources: {} },
      [ForceOfficialRank.SUPERVISOR]: { gold: 1000, contribution: 20, resources: {} },
      [ForceOfficialRank.COMMON_MEMBER]: { gold: 100, contribution: 0, resources: {} },
    };

    const permissions: Record<ForceOfficialRank, IForceOfficial['permissions']> = {
      [ForceOfficialRank.GRAND_MASTER]: { canManageMembers: true, canManageResources: true, canDeclareWar: true, canManageBuildings: true, canHostFeast: true, canResearchTech: true, canManageAlliance: true },
      [ForceOfficialRank.ELDER]: { canManageMembers: true, canManageResources: true, canDeclareWar: false, canManageBuildings: true, canHostFeast: true, canResearchTech: true, canManageAlliance: false },
      [ForceOfficialRank.REGION_MASTER]: { canManageMembers: false, canManageResources: true, canDeclareWar: false, canManageBuildings: false, canHostFeast: false, canResearchTech: false, canManageAlliance: false },
      [ForceOfficialRank.GUILD_LEADER]: { canManageMembers: false, canManageResources: false, canDeclareWar: false, canManageBuildings: false, canHostFeast: false, canResearchTech: false, canManageAlliance: false },
      [ForceOfficialRank.SUPERVISOR]: { canManageMembers: false, canManageResources: false, canDeclareWar: false, canManageBuildings: false, canHostFeast: false, canResearchTech: false, canManageAlliance: false },
      [ForceOfficialRank.COMMON_MEMBER]: { canManageMembers: false, canManageResources: false, canDeclareWar: false, canManageBuildings: false, canHostFeast: false, canResearchTech: false, canManageAlliance: false },
    };

    const titles: Record<ForceOfficialRank, string> = {
      [ForceOfficialRank.GRAND_MASTER]: '宗主',
      [ForceOfficialRank.ELDER]: '长老',
      [ForceOfficialRank.REGION_MASTER]: '区域总管',
      [ForceOfficialRank.GUILD_LEADER]: '堂主',
      [ForceOfficialRank.SUPERVISOR]: '执事',
      [ForceOfficialRank.COMMON_MEMBER]: '普通成员',
    };

    const official: IForceOfficial = {
      id: `official_${Date.now()}`,
      playerId,
      playerName: member.name,
      rank,
      title: titles[rank],
      startDate: Date.now(),
      salary: salaries[rank],
      permissions: permissions[rank],
    };

    sect.officialSystem.officials.push(official);
    return { success: true, message: `任命 ${member.name} 为 ${titles[rank]}` };
  }

  static collectSalary(sect: ISect, playerId: string): { success: boolean; message: string; salary?: IForceOfficial['salary'] } {
    const official = sect.officialSystem.officials.find(o => o.playerId === playerId && !o.endDate);
    if (!official) return { success: false, message: '你没有官职' };

    const now = Date.now();
    if (now - sect.officialSystem.lastSalaryTime < sect.officialSystem.salaryCycle) {
      return { success: false, message: '俸禄领取周期未到' };
    }

    sect.officialSystem.lastSalaryTime = now;
    return { success: true, message: '领取俸禄成功', salary: official.salary };
  }

  static proposeMarriage(fromSect: ISect, toSect: ISect, initiatorPlayerId: string, initiatorPlayerName: string, targetPlayerId: string, targetPlayerName: string): { success: boolean; message: string } {
    const existing = fromSect.marriageSystem.alliances.find(a => (a.fromSectId === fromSect.id && a.toSectId === toSect.id) || (a.fromSectId === toSect.id && a.toSectId === fromSect.id));
    if (existing && existing.status === 'active') return { success: false, message: '已有联姻关系' };

    const alliance: IMartialAlliance = {
      id: `marriage_${Date.now()}`,
      fromSectId: fromSect.id,
      fromSectName: fromSect.name,
      toSectId: toSect.id,
      toSectName: toSect.name,
      type: 'marriage',
      initiatorPlayerId,
      initiatorPlayerName,
      targetPlayerId,
      targetPlayerName,
      startTime: Date.now(),
      effects: { reputationBonus: 0.1, tradeBonus: 0.15 },
      status: 'pending',
    };

    fromSect.marriageSystem.alliances.push(alliance);
    toSect.marriageSystem.alliances.push(alliance);

    return { success: true, message: `向 ${toSect.name} 提出联姻申请` };
  }

  static acceptMarriage(sect: ISect, allianceId: string): { success: boolean; message: string } {
    const alliance = sect.marriageSystem.alliances.find(a => a.id === allianceId);
    if (!alliance || alliance.status !== 'pending') return { success: false, message: '申请不存在或已处理' };

    alliance.status = 'active';
    sect.reputation += 100;

    return { success: true, message: `接受 ${alliance.fromSectName} 的联姻申请` };
  }

  static rejectMarriage(sect: ISect, allianceId: string): { success: boolean; message: string } {
    const alliance = sect.marriageSystem.alliances.find(a => a.id === allianceId);
    if (!alliance || alliance.status !== 'pending') return { success: false, message: '申请不存在或已处理' };

    alliance.status = 'dissolved';
    return { success: true, message: '拒绝联姻申请' };
  }

  static createBloodAlliance(fromSect: ISect, toSect: ISect, initiatorPlayerId: string, initiatorPlayerName: string): { success: boolean; message: string } {
    const existing = fromSect.marriageSystem.alliances.find(a => (a.fromSectId === fromSect.id && a.toSectId === toSect.id) || (a.fromSectId === toSect.id && a.toSectId === fromSect.id));
    if (existing && existing.status === 'active') return { success: false, message: '已有联盟关系' };

    const alliance: IMartialAlliance = {
      id: `blood_${Date.now()}`,
      fromSectId: fromSect.id,
      fromSectName: fromSect.name,
      toSectId: toSect.id,
      toSectName: toSect.name,
      type: 'blood_alliance',
      initiatorPlayerId,
      initiatorPlayerName,
      targetPlayerId: '',
      targetPlayerName: '',
      startTime: Date.now(),
      effects: { warBonus: 0.2, defenseBonus: 0.15 },
      status: 'active',
    };

    fromSect.marriageSystem.alliances.push(alliance);
    toSect.marriageSystem.alliances.push(alliance);

    return { success: true, message: `与 ${toSect.name} 建立血脉联盟` };
  }

  static createBloodLineage(sect: ISect, name: string, ancestor: string): { success: boolean; message: string; lineage?: IBloodLineage } {
    const existing = sect.marriageSystem.bloodLineages.find(l => l.name === name);
    if (existing) return { success: false, message: '血脉名称已存在' };

    const lineage: IBloodLineage = {
      id: `lineage_${Date.now()}`,
      name,
      ancestor,
      traits: ['坚韧', '聪慧'],
      level: 1,
      maxLevel: 10,
      members: [],
      inheritedTechniques: [],
      inheritedTreasures: [],
    };

    sect.marriageSystem.bloodLineages.push(lineage);
    return { success: true, message: `创建血脉 ${name}`, lineage };
  }

  static LEVEL_TRIAL_TEMPLATES: { type: TrialType; name: string; difficulty: number; rewards: IForceTrial['rewards']; minRealm: CultivationRealm; duration: number }[] = [
    { type: TrialType.MONTHLY, name: '月度试炼', difficulty: 3, rewards: { gold: 5000, contribution: 200, reputation: 50, items: [], achievementPoints: 5 }, minRealm: CultivationRealm.BLOOD_MOVING, duration: 86400 },
    { type: TrialType.QUARTERLY, name: '季度大比', difficulty: 5, rewards: { gold: 20000, contribution: 500, reputation: 200, items: ['trial_medal_1'], achievementPoints: 20 }, minRealm: CultivationRealm.SPIRIT, duration: 172800 },
    { type: TrialType.ANNUAL, name: '年度盛典', difficulty: 8, rewards: { gold: 100000, contribution: 2000, reputation: 1000, items: ['trial_crown_1'], achievementPoints: 50 }, minRealm: CultivationRealm.VENERABLE, duration: 259200 },
  ];

  static startTrial(sect: ISect, type: TrialType): { success: boolean; message: string; trial?: IForceTrial } {
    if (sect.trialSystem.currentTrial) return { success: false, message: '已有试炼进行中' };

    const template = this.LEVEL_TRIAL_TEMPLATES.find(t => t.type === type);
    if (!template) return { success: false, message: '试炼类型不存在' };

    const now = Date.now();
    const trial: IForceTrial = {
      id: `trial_${Date.now()}`,
      name: template.name,
      type: template.type,
      description: `${template.name}开始了，参与可获得丰厚奖励！`,
      difficulty: template.difficulty,
      rewards: template.rewards,
      participants: [],
      startTime: now,
      endTime: now + template.duration * 1000,
      minRealm: template.minRealm,
    };

    sect.trialSystem.currentTrial = trial;
    return { success: true, message: `开启 ${template.name}`, trial };
  }

  static participateTrial(sect: ISect, playerId: string, playerName: string, playerRealm: CultivationRealm): { success: boolean; message: string } {
    const trial = sect.trialSystem.currentTrial;
    if (!trial) return { success: false, message: '没有进行中的试炼' };
    if (Date.now() > trial.endTime) return { success: false, message: '试炼已结束' };
    if (playerRealm < trial.minRealm) return { success: false, message: '境界不足' };

    const existing = trial.participants.find(p => p.playerId === playerId);
    if (existing) return { success: false, message: '已参与试炼' };

    trial.participants.push({ playerId, playerName, score: 0, rank: 0 });
    return { success: true, message: '成功参与试炼' };
  }

  static submitTrialScore(sect: ISect, playerId: string, score: number): { success: boolean; message: string } {
    const trial = sect.trialSystem.currentTrial;
    if (!trial) return { success: false, message: '没有进行中的试炼' };

    const participant = trial.participants.find(p => p.playerId === playerId);
    if (!participant) return { success: false, message: '未参与试炼' };

    participant.score = score;
    trial.participants.sort((a, b) => b.score - a.score);
    trial.participants.forEach((p, i) => p.rank = i + 1);

    sect.trialSystem.trialPoints[playerId] = (sect.trialSystem.trialPoints[playerId] || 0) + score;

    return { success: true, message: `提交试炼分数 ${score}` };
  }

  static endTrial(sect: ISect): { success: boolean; message: string; rankings?: { playerId: string; playerName: string; score: number; rank: number }[] } {
    const trial = sect.trialSystem.currentTrial;
    if (!trial) return { success: false, message: '没有进行中的试炼' };

    trial.participants.sort((a, b) => b.score - a.score);
    trial.participants.forEach((p, i) => p.rank = i + 1);

    sect.trialSystem.trialHistory.push(trial);
    sect.trialSystem.rankings = trial.participants.map(p => ({ playerId: p.playerId, playerName: p.playerName, totalPoints: p.score, rank: p.rank }));
    sect.trialSystem.currentTrial = undefined;

    return { success: true, message: `${trial.name}结束`, rankings: trial.participants };
  }

  static BUILDING_UPGRADE_TEMPLATES: { buildingId: string; name: string; category: BuildingCategory; maxLevel: number; baseCost: { gold: number; resources: Record<string, number> }; baseEffects: Record<string, number> }[] = [
    { buildingId: 'hall', name: '大殿', category: BuildingCategory.ADMINISTRATION, maxLevel: 10, baseCost: { gold: 10000, resources: { stone: 500 } }, baseEffects: { maxMembers: 10, prosperityBonus: 0.05 } },
    { buildingId: 'wall', name: '城墙', category: BuildingCategory.DEFENSE, maxLevel: 10, baseCost: { gold: 8000, resources: { stone: 1000 } }, baseEffects: { defensePower: 50 } },
    { buildingId: 'meditation', name: '修炼室', category: BuildingCategory.CULTIVATION, maxLevel: 10, baseCost: { gold: 12000, resources: { spiritStone: 200 } }, baseEffects: { cultivationSpeed: 0.05 } },
    { buildingId: 'market', name: '市场', category: BuildingCategory.ECONOMY, maxLevel: 10, baseCost: { gold: 6000, resources: { wood: 300 } }, baseEffects: { resourceOutput: 0.1 } },
    { buildingId: 'barracks', name: '兵营', category: BuildingCategory.WAR, maxLevel: 10, baseCost: { gold: 15000, resources: { iron: 500 } }, baseEffects: { unitPower: 0.05 } },
    { buildingId: 'tower', name: '瞭望塔', category: BuildingCategory.SPECIAL, maxLevel: 5, baseCost: { gold: 20000, resources: { stone: 800, wood: 400 } }, baseEffects: { alertness: 0.2 } },
  ];

  static initializeBuildings(sect: ISect): void {
    if (sect.buildingSystem.buildings.length > 0) return;

    sect.buildingSystem.buildings = this.BUILDING_UPGRADE_TEMPLATES.map(t => ({
      buildingId: t.buildingId,
      currentLevel: 1,
      maxLevel: t.maxLevel,
      upgradeCost: t.baseCost,
      effects: t.baseEffects,
      upgradeTime: 0,
      upgrading: false,
    }));
  }

  static canUpgradeBuilding(sect: ISect, buildingId: string, player: IPlayer): { can: boolean; message: string; cost: { gold: number; resources: Record<string, number> } } {
    const building = sect.buildingSystem.buildings.find(b => b.buildingId === buildingId);
    if (!building) return { can: false, message: '建筑不存在', cost: { gold: 0, resources: {} } };
    if (building.currentLevel >= building.maxLevel) return { can: false, message: '建筑已达最高等级', cost: { gold: 0, resources: {} } };
    if (building.upgrading) return { can: false, message: '正在升级中', cost: { gold: 0, resources: {} } };

    const multiplier = Math.pow(1.5, building.currentLevel);
    const cost = {
      gold: Math.floor(building.upgradeCost.gold * multiplier),
      resources: Object.fromEntries(Object.entries(building.upgradeCost.resources).map(([k, v]) => [k, Math.floor(v * multiplier)])),
    };

    if (sect.treasury < cost.gold) return { can: false, message: '金币不足', cost };

    return { can: true, message: '可以升级', cost };
  }

  static upgradeBuilding(sect: ISect, buildingId: string, player: IPlayer): { success: boolean; message: string } {
    const check = this.canUpgradeBuilding(sect, buildingId, player);
    if (!check.can) return { success: false, message: check.message };

    const building = sect.buildingSystem.buildings.find(b => b.buildingId === buildingId)!;
    sect.treasury -= check.cost.gold;
    building.currentLevel++;
    building.upgrading = true;
    building.upgradeTime = Date.now() + 3600000;

    Object.entries(building.effects).forEach(([key, value]) => {
      building.effects[key] = value * 1.2;
    });

    return { success: true, message: `开始升级 ${SectService.BUILDING_UPGRADE_TEMPLATES.find((t: { buildingId: string }) => t.buildingId === buildingId)?.name}` };
  }

  static updateBuildingStatus(sect: ISect): void {
    for (const building of sect.buildingSystem.buildings) {
      if (!building.upgrading) continue;
      if (Date.now() >= building.upgradeTime) {
        building.upgrading = false;
        building.upgradeTime = 0;
      }
    }
  }

  static PET_TEMPLATES: { type: string; name: string; rarity: PetRarity; maxLevel: number; baseStats: { attack: number; defense: number; speed: number; hp: number }; skills: { id: string; name: string; level: number; effect: string }[]; isMount: boolean; isCombat: boolean; isProduction: boolean; cost: { gold: number; resources: Record<string, number> } }[] = [
    { type: 'spirit_wolf', name: '灵狼', rarity: PetRarity.COMMON, maxLevel: 30, baseStats: { attack: 50, defense: 30, speed: 80, hp: 200 }, skills: [{ id: 'bite', name: '撕咬', level: 1, effect: '造成100%攻击伤害' }], isMount: false, isCombat: true, isProduction: false, cost: { gold: 5000, resources: {} } },
    { type: 'cloud_horse', name: '云驹', rarity: PetRarity.UNCOMMON, maxLevel: 40, baseStats: { attack: 20, defense: 50, speed: 150, hp: 300 }, skills: [{ id: 'gallop', name: '疾驰', level: 1, effect: '移动速度提升50%' }], isMount: true, isCombat: false, isProduction: false, cost: { gold: 15000, resources: { spiritStone: 100 } } },
    { type: 'phoenix_bird', name: '火凤', rarity: PetRarity.EPIC, maxLevel: 80, baseStats: { attack: 500, defense: 200, speed: 200, hp: 1000 }, skills: [{ id: 'flame_burst', name: '烈焰爆发', level: 1, effect: '造成200%攻击伤害并灼烧敌人' }], isMount: true, isCombat: true, isProduction: false, cost: { gold: 100000, resources: { spiritStone: 500, fireCrystal: 100 } } },
  ];

  static summonPet(sect: ISect, petType: string): { success: boolean; message: string; pet?: IForcePet } {
    if (sect.petSystem.pets.length >= sect.petSystem.petSlots) return { success: false, message: '宠物栏已满' };

    const template = this.PET_TEMPLATES.find(t => t.type === petType);
    if (!template) return { success: false, message: '宠物类型不存在' };

    if (sect.treasury < template.cost.gold) return { success: false, message: '金币不足' };

    sect.treasury -= template.cost.gold;

    const pet: IForcePet = {
      id: `pet_${Date.now()}`,
      name: template.name,
      type: template.type,
      rarity: template.rarity,
      level: 1,
      maxLevel: template.maxLevel,
      exp: 0,
      skills: [...template.skills],
      stats: { ...template.baseStats },
      isMount: template.isMount,
      isCombat: template.isCombat,
      isProduction: template.isProduction,
      acquireTime: Date.now(),
    };

    sect.petSystem.pets.push(pet);
    return { success: true, message: `召唤宠物 ${template.name}`, pet };
  }

  static trainPet(sect: ISect, petId: string, playerId: string): { success: boolean; message: string } {
    const pet = sect.petSystem.pets.find(p => p.id === petId);
    if (!pet) return { success: false, message: '宠物不存在' };

    if (pet.level >= pet.maxLevel) return { success: false, message: '宠物已达最高等级' };

    const expNeeded = pet.level * 100;
    pet.exp += 50;

    if (pet.exp >= expNeeded) {
      pet.level++;
      pet.exp -= expNeeded;
      pet.stats.attack = Math.floor(pet.stats.attack * 1.1);
      pet.stats.defense = Math.floor(pet.stats.defense * 1.1);
      pet.stats.speed = Math.floor(pet.stats.speed * 1.05);
      pet.stats.hp = Math.floor(pet.stats.hp * 1.15);
      return { success: true, message: `${pet.name} 升级到 ${pet.level} 级` };
    }

    return { success: true, message: `${pet.name} 获得 50 经验` };
  }

  static equipPet(sect: ISect, petId: string, playerId: string): { success: boolean; message: string } {
    const pet = sect.petSystem.pets.find(p => p.id === petId);
    if (!pet) return { success: false, message: '宠物不存在' };

    const member = sect.members.find(m => m.playerId === playerId);
    if (!member) return { success: false, message: '成员不存在' };

    pet.ownerPlayerId = playerId;
    return { success: true, message: `${member.name} 装备了 ${pet.name}` };
  }

  static upgradePetSkill(sect: ISect, petId: string, skillId: string): { success: boolean; message: string } {
    const pet = sect.petSystem.pets.find(p => p.id === petId);
    if (!pet) return { success: false, message: '宠物不存在' };

    const skill = pet.skills.find(s => s.id === skillId);
    if (!skill) return { success: false, message: '技能不存在' };

    if (skill.level >= 10) return { success: false, message: '技能已达最高等级' };

    skill.level++;
    return { success: true, message: `${pet.name} 的 ${skill.name} 升级到 ${skill.level} 级` };
  }

  static expandPetSlots(sect: ISect): { success: boolean; message: string } {
    if (sect.petSystem.petSlots >= sect.petSystem.maxPetSlots) return { success: false, message: '宠物栏已达最大容量' };

    const cost = sect.petSystem.petSlots * 50000;
    if (sect.treasury < cost) return { success: false, message: '金币不足' };

    sect.treasury -= cost;
    sect.petSystem.petSlots++;

    return { success: true, message: `宠物栏扩展到 ${sect.petSystem.petSlots} 格` };
  }

  static FORMATION_TEMPLATES: { name: string; type: FormationType; grade: FormationGrade; requiredMembers: number; effects: IForceFormation['effects']; energyCost: number; duration: number; cooldown: number; description: string }[] = [
    { name: '天罡阵', type: FormationType.ATTACK, grade: FormationGrade.BASIC, requiredMembers: 5, effects: { attackBonus: 0.2, critBonus: 0.05 }, energyCost: 100, duration: 600, cooldown: 1800, description: '攻击型基础阵法，提升攻击力和暴击率' },
    { name: '地煞阵', type: FormationType.DEFENSE, grade: FormationGrade.BASIC, requiredMembers: 5, effects: { defenseBonus: 0.3, hpBonus: 0.1 }, energyCost: 100, duration: 600, cooldown: 1800, description: '防御型基础阵法，提升防御力和生命值' },
    { name: '迷踪阵', type: FormationType.ILLUSION, grade: FormationGrade.INTERMEDIATE, requiredMembers: 7, effects: { speedBonus: 0.2, specialEffect: '幻影迷惑' }, energyCost: 200, duration: 300, cooldown: 2400, description: '幻术阵法，迷惑敌人使其命中率降低' },
    { name: '诛仙阵', type: FormationType.KILLING, grade: FormationGrade.GRANDMASTER, requiredMembers: 12, effects: { attackBonus: 0.8, critBonus: 0.2, specialEffect: '必杀领域' }, energyCost: 1000, duration: 180, cooldown: 7200, description: '传说中的诛仙大阵，威力无穷' },
    { name: '困龙阵', type: FormationType.TRAP, grade: FormationGrade.ADVANCED, requiredMembers: 8, effects: { specialEffect: '禁锢敌人' }, energyCost: 300, duration: 240, cooldown: 3600, description: '陷阱阵法，困住敌人使其无法移动' },
    { name: '聚灵阵', type: FormationType.SUPPORT, grade: FormationGrade.INTERMEDIATE, requiredMembers: 6, effects: { specialEffect: '加速修炼' }, energyCost: 150, duration: 1800, cooldown: 1800, description: '辅助阵法，聚集灵气加速修炼' },
  ];

  static initializeFormations(sect: ISect): void {
    if (sect.formationSystem.formations.length > 0) return;

    sect.formationSystem.formations = this.FORMATION_TEMPLATES.map((t, i) => ({
      id: `formation_${sect.id}_${i}`,
      name: t.name,
      type: t.type,
      grade: t.grade,
      level: 1,
      maxLevel: 10,
      requiredMembers: t.requiredMembers,
      effects: t.effects,
      energyCost: t.energyCost,
      duration: t.duration,
      cooldown: t.cooldown,
      lastActivationTime: 0,
      isActive: false,
      description: t.description,
    }));
  }

  static activateFormation(sect: ISect, formationId: string, participantCount: number): { success: boolean; message: string } {
    const formation = sect.formationSystem.formations.find(f => f.id === formationId);
    if (!formation) return { success: false, message: '阵法不存在' };

    if (formation.isActive) return { success: false, message: '阵法已激活' };
    if (participantCount < formation.requiredMembers) return { success: false, message: `需要 ${formation.requiredMembers} 人` };

    const now = Date.now();
    if (now - formation.lastActivationTime < formation.cooldown * 1000) return { success: false, message: '阵法冷却中' };

    formation.isActive = true;
    formation.lastActivationTime = now;
    sect.formationSystem.activeFormation = formationId;
    sect.formationSystem.formationMastery[formationId] = (sect.formationSystem.formationMastery[formationId] || 0) + 1;

    setTimeout(() => {
      formation.isActive = false;
      if (sect.formationSystem.activeFormation === formationId) {
        sect.formationSystem.activeFormation = undefined;
      }
    }, formation.duration * 1000);

    return { success: true, message: `激活阵法 ${formation.name}` };
  }

  static upgradeFormation(sect: ISect, formationId: string): { success: boolean; message: string } {
    const formation = sect.formationSystem.formations.find(f => f.id === formationId);
    if (!formation) return { success: false, message: '阵法不存在' };
    if (formation.level >= formation.maxLevel) return { success: false, message: '阵法已达最高等级' };

    const cost = formation.level * 20000;
    if (sect.treasury < cost) return { success: false, message: '金币不足' };

    sect.treasury -= cost;
    formation.level++;

    Object.entries(formation.effects).forEach(([key, value]) => {
      if (typeof value === 'number') {
        (formation.effects as Record<string, number | string | undefined>)[key] = value * 1.15;
      }
    });
    formation.energyCost = Math.floor(formation.energyCost * 1.05);
    formation.duration = Math.floor(formation.duration * 1.1);

    return { success: true, message: `${formation.name} 升级到 ${formation.level} 级` };
  }

  static RECIPE_TEMPLATES: { name: string; type: CraftType; rarity: RecipeRarity; resultItemId: string; resultQuantity: number; materials: { itemId: string; quantity: number }[]; requiredLevel: number; successRate: number; craftTime: number; unlockCost: { gold: number; contribution: number } }[] = [
    { name: '回气丹', type: CraftType.ALCHEMY, rarity: RecipeRarity.COMMON, resultItemId: 'pill_recovery_qi', resultQuantity: 5, materials: [{ itemId: 'herb_basic', quantity: 3 }], requiredLevel: 1, successRate: 0.9, craftTime: 300, unlockCost: { gold: 5000, contribution: 100 } },
    { name: '聚灵丹', type: CraftType.ALCHEMY, rarity: RecipeRarity.UNCOMMON, resultItemId: 'pill_gather_spirit', resultQuantity: 3, materials: [{ itemId: 'herb_basic', quantity: 5 }, { itemId: 'spirit_crystal', quantity: 2 }], requiredLevel: 3, successRate: 0.75, craftTime: 600, unlockCost: { gold: 20000, contribution: 500 } },
    { name: '破境丹', type: CraftType.ALCHEMY, rarity: RecipeRarity.EPIC, resultItemId: 'pill_break_realm', resultQuantity: 1, materials: [{ itemId: 'herb_rare', quantity: 10 }, { itemId: 'spirit_crystal', quantity: 20 }], requiredLevel: 7, successRate: 0.4, craftTime: 3600, unlockCost: { gold: 100000, contribution: 2000 } },
    { name: '寒铁剑', type: CraftType.FORGING, rarity: RecipeRarity.UNCOMMON, resultItemId: 'sword_cold_iron', resultQuantity: 1, materials: [{ itemId: 'cold_iron', quantity: 10 }, { itemId: 'wood_handle', quantity: 2 }], requiredLevel: 2, successRate: 0.8, craftTime: 900, unlockCost: { gold: 15000, contribution: 300 } },
    { name: '天罡甲', type: CraftType.FORGING, rarity: RecipeRarity.RARE, resultItemId: 'armor_tiangang', resultQuantity: 1, materials: [{ itemId: 'star_iron', quantity: 15 }, { itemId: 'beast_hide', quantity: 5 }], requiredLevel: 5, successRate: 0.6, craftTime: 1800, unlockCost: { gold: 50000, contribution: 1000 } },
    { name: '护身符', type: CraftType.TALISMAN, rarity: RecipeRarity.COMMON, resultItemId: 'talisman_protection', resultQuantity: 10, materials: [{ itemId: 'spirit_paper', quantity: 5 }, { itemId: 'cinnabar', quantity: 3 }], requiredLevel: 1, successRate: 0.85, craftTime: 300, unlockCost: { gold: 8000, contribution: 200 } },
    { name: '聚灵阵盘', type: CraftType.ARRAY_CRAFT, rarity: RecipeRarity.RARE, resultItemId: 'array_plate_spirit', resultQuantity: 1, materials: [{ itemId: 'jade_essence', quantity: 8 }, { itemId: 'spirit_crystal', quantity: 15 }], requiredLevel: 4, successRate: 0.5, craftTime: 2400, unlockCost: { gold: 60000, contribution: 1200 } },
  ];

  static FACILITY_TEMPLATES: { type: CraftType; maxLevel: number; baseCost: { gold: number; resources: Record<string, number> }; efficiency: number; slots: number }[] = [
    { type: CraftType.ALCHEMY, maxLevel: 10, baseCost: { gold: 20000, resources: { stone: 300 } }, efficiency: 1, slots: 2 },
    { type: CraftType.FORGING, maxLevel: 10, baseCost: { gold: 25000, resources: { iron: 500 } }, efficiency: 1, slots: 2 },
    { type: CraftType.TALISMAN, maxLevel: 10, baseCost: { gold: 15000, resources: { wood: 200 } }, efficiency: 1, slots: 3 },
    { type: CraftType.ARRAY_CRAFT, maxLevel: 10, baseCost: { gold: 40000, resources: { jade: 100 } }, efficiency: 1, slots: 1 },
  ];

  static initializeCraftSystem(sect: ISect): void {
    if (sect.craftSystem.facilities.length === 0) {
      sect.craftSystem.facilities = this.FACILITY_TEMPLATES.map(t => ({
        type: t.type,
        level: 1,
        maxLevel: t.maxLevel,
        upgradeCost: t.baseCost,
        efficiency: t.efficiency,
        slots: t.slots,
      }));
    }
  }

  static unlockRecipe(sect: ISect, recipeIndex: number): { success: boolean; message: string } {
    const template = this.RECIPE_TEMPLATES[recipeIndex];
    if (!template) return { success: false, message: '配方不存在' };

    const existing = sect.craftSystem.recipes.find(r => r.name === template.name);
    if (existing && existing.unlocked) return { success: false, message: '配方已解锁' };

    if (sect.treasury < template.unlockCost.gold) return { success: false, message: '金币不足' };

    sect.treasury -= template.unlockCost.gold;

    const recipe: ICraftRecipe = {
      id: `recipe_${sect.id}_${Date.now()}`,
      ...template,
      unlocked: true,
    };

    sect.craftSystem.recipes.push(recipe);
    return { success: true, message: `解锁配方 ${template.name}` };
  }

  static craftItem(sect: ISect, recipeId: string, playerId: string, facilityType: CraftType): { success: boolean; message: string; result?: { itemId: string; quantity: number } } {
    const recipe = sect.craftSystem.recipes.find(r => r.id === recipeId);
    if (!recipe || !recipe.unlocked) return { success: false, message: '配方未解锁' };

    const facility = sect.craftSystem.facilities.find(f => f.type === facilityType);
    if (!facility) return { success: false, message: '设施不存在' };
    if (facility.level < recipe.requiredLevel) return { success: false, message: '设施等级不足' };

    const finalSuccessRate = recipe.successRate * facility.efficiency;
    const success = Math.random() < finalSuccessRate;

    sect.craftSystem.craftHistory.push({ recipeId, playerId, success, time: Date.now() });
    if (success) sect.craftSystem.totalCrafted++;

    return success
      ? { success: true, message: `炼制 ${recipe.name} 成功`, result: { itemId: recipe.resultItemId, quantity: recipe.resultQuantity } }
      : { success: false, message: `炼制 ${recipe.name} 失败` };
  }

  static upgradeCraftFacility(sect: ISect, facilityType: CraftType): { success: boolean; message: string } {
    const facility = sect.craftSystem.facilities.find(f => f.type === facilityType);
    if (!facility) return { success: false, message: '设施不存在' };
    if (facility.level >= facility.maxLevel) return { success: false, message: '设施已达最高等级' };

    const multiplier = Math.pow(1.5, facility.level);
    const cost = {
      gold: Math.floor(facility.upgradeCost.gold * multiplier),
      resources: Object.fromEntries(Object.entries(facility.upgradeCost.resources).map(([k, v]) => [k, Math.floor(v * multiplier)])),
    };

    if (sect.treasury < cost.gold) return { success: false, message: '金币不足' };

    sect.treasury -= cost.gold;
    facility.level++;
    facility.efficiency += 0.1;
    facility.slots++;

    return { success: true, message: `${facilityType} 设施升级到 ${facility.level} 级` };
  }

  static proposeTradeAgreement(fromSect: ISect, toSect: ISect, terms: ITradeAgreement['terms']): { success: boolean; message: string } {
    const existing = fromSect.diplomacySystem.agreements.find(a => a.toSectId === toSect.id && a.status === 'active');
    if (existing) return { success: false, message: '已有贸易协议' };

    const agreement: ITradeAgreement = {
      id: `trade_${Date.now()}`,
      fromSectId: fromSect.id,
      fromSectName: fromSect.name,
      toSectId: toSect.id,
      toSectName: toSect.name,
      type: 'trade',
      terms,
      startTime: Date.now(),
      endTime: Date.now() + terms.duration * 1000,
      status: 'pending',
    };

    fromSect.diplomacySystem.agreements.push(agreement);
    toSect.diplomacySystem.agreements.push(agreement);

    return { success: true, message: `向 ${toSect.name} 提出贸易协议` };
  }

  static acceptTradeAgreement(sect: ISect, agreementId: string): { success: boolean; message: string } {
    const agreement = sect.diplomacySystem.agreements.find(a => a.id === agreementId);
    if (!agreement || agreement.status !== 'pending') return { success: false, message: '协议不存在或已处理' };

    agreement.status = 'active';
    sect.diplomacySystem.standing[agreement.fromSectId] = 'friendly';
    sect.diplomacySystem.reputation[agreement.fromSectId] = (sect.diplomacySystem.reputation[agreement.fromSectId] || 0) + 50;

    return { success: true, message: `接受 ${agreement.fromSectName} 的贸易协议` };
  }

  static declareWarDiplomacy(fromSect: ISect, toSect: ISect, reason: string): { success: boolean; message: string } {
    const standing = fromSect.diplomacySystem.standing[toSect.id];
    if (standing === 'trusted') return { success: false, message: '不能向信任的势力宣战' };

    const action: IDiplomaticAction = {
      id: `action_${Date.now()}`,
      fromSectId: fromSect.id,
      toSectId: toSect.id,
      action: 'declare_war',
      details: reason,
      timestamp: Date.now(),
      status: 'accepted',
    };

    fromSect.diplomacySystem.actions.push(action);
    toSect.diplomacySystem.actions.push(action);
    fromSect.diplomacySystem.standing[toSect.id] = 'hostile';
    toSect.diplomacySystem.standing[fromSect.id] = 'hostile';
    fromSect.reputation -= 100;

    return { success: true, message: `向 ${toSect.name} 宣战：${reason}` };
  }

  static makePeace(fromSect: ISect, toSect: ISect, tribute?: number): { success: boolean; message: string } {
    const standing = fromSect.diplomacySystem.standing[toSect.id];
    if (standing !== 'hostile') return { success: false, message: '双方未处于敌对状态' };

    const action: IDiplomaticAction = {
      id: `action_${Date.now()}`,
      fromSectId: fromSect.id,
      toSectId: toSect.id,
      action: 'peace_treaty',
      details: tribute ? `赔款 ${tribute} 金币` : '和平协议',
      timestamp: Date.now(),
      status: 'pending',
    };

    fromSect.diplomacySystem.actions.push(action);
    toSect.diplomacySystem.actions.push(action);

    if (tribute && fromSect.treasury >= tribute) {
      fromSect.treasury -= tribute;
      toSect.treasury += tribute;
    }

    fromSect.diplomacySystem.standing[toSect.id] = 'neutral';
    toSect.diplomacySystem.standing[fromSect.id] = 'neutral';

    return { success: true, message: `与 ${toSect.name} 签订和平协议` };
  }

  static sendTribute(fromSect: ISect, toSect: ISect, gold: number): { success: boolean; message: string } {
    if (fromSect.treasury < gold) return { success: false, message: '金币不足' };

    fromSect.treasury -= gold;
    toSect.treasury += gold;
    fromSect.diplomacySystem.reputation[toSect.id] = (fromSect.diplomacySystem.reputation[toSect.id] || 0) + gold / 100;

    if (fromSect.diplomacySystem.reputation[toSect.id] >= 100) {
      fromSect.diplomacySystem.standing[toSect.id] = 'trusted';
    }

    return { success: true, message: `向 ${toSect.name} 进贡 ${gold} 金币` };
  }

  static gatherIntelligence(sect: ISect, targetSect: ISect, type: IntelligenceType): { success: boolean; message: string; report?: IIntelligenceReport } {
    const cost = type === IntelligenceType.SCOUT ? 1000 : type === IntelligenceType.SPY ? 5000 : type === IntelligenceType.SABOTAGE ? 10000 : 3000;
    if (sect.treasury < cost) return { success: false, message: '金币不足' };

    sect.treasury -= cost;

    const targetCounterIntel = targetSect.intelligenceSystem.counterIntelLevel;
    const baseAccuracy = type === IntelligenceType.SCOUT ? 0.7 : type === IntelligenceType.SPY ? 0.85 : 0.6;
    const accuracy = Math.max(0.1, baseAccuracy - targetCounterIntel * 0.05);

    const report: IIntelligenceReport = {
      id: `intel_${Date.now()}`,
      targetSectId: targetSect.id,
      targetSectName: targetSect.name,
      type,
      info: {
        power: type !== IntelligenceType.COUNTER_INTELLIGENCE ? Math.floor(calculateSectPower(targetSect) * (1 + (Math.random() - 0.5) * (1 - accuracy))) : undefined,
        members: type !== IntelligenceType.COUNTER_INTELLIGENCE ? targetSect.members.length : undefined,
        defenses: type === IntelligenceType.SCOUT || type === IntelligenceType.SPY ? Math.floor(targetSect.prosperity * (1 + (Math.random() - 0.5) * (1 - accuracy))) : undefined,
        vulnerabilities: type === IntelligenceType.SPY ? ['防御薄弱', '资源充足', '成员众多'].slice(0, Math.floor(Math.random() * 3) + 1) : undefined,
      },
      accuracy,
      gatherTime: Date.now(),
      expireTime: Date.now() + 86400000,
    };

    sect.intelligenceSystem.reports.push(report);
    sect.intelligenceSystem.intelPoints += Math.floor(accuracy * 100);

    return { success: true, message: `成功收集 ${targetSect.name} 的情报`, report };
  }

  static deploySpy(sect: ISect, targetSectId: string, playerId: string, duration: number): { success: boolean; message: string } {
    const existing = sect.intelligenceSystem.activeSpies.find(s => s.sectId === targetSectId);
    if (existing) return { success: false, message: '已有间谍在目标势力' };

    sect.intelligenceSystem.activeSpies.push({
      sectId: targetSectId,
      playerId,
      startTime: Date.now(),
      duration,
    });

    return { success: true, message: '间谍部署成功' };
  }

  static upgradeCounterIntel(sect: ISect): { success: boolean; message: string } {
    const cost = sect.intelligenceSystem.counterIntelLevel * 30000;
    if (sect.treasury < cost) return { success: false, message: '金币不足' };

    sect.treasury -= cost;
    sect.intelligenceSystem.counterIntelLevel++;

    return { success: true, message: `反间谍等级提升到 ${sect.intelligenceSystem.counterIntelLevel}` };
  }

  static performSabotage(sect: ISect, targetSect: ISect, sabotageType: 'resources' | 'buildings' | 'morale'): { success: boolean; message: string; damage?: number } {
    if (sect.intelligenceSystem.intelPoints < 500) return { success: false, message: '情报点不足' };

    const targetCounterIntel = targetSect.intelligenceSystem.counterIntelLevel;
    const successRate = Math.max(0.1, 0.7 - targetCounterIntel * 0.08);
    const success = Math.random() < successRate;

    if (!success) {
      sect.intelligenceSystem.intelPoints -= 500;
      sect.reputation -= 200;
      targetSect.diplomacySystem.standing[sect.id] = 'hostile';
      return { success: false, message: `破坏行动失败，被 ${targetSect.name} 发现` };
    }

    sect.intelligenceSystem.intelPoints -= 500;
    let damage = 0;

    switch (sabotageType) {
      case 'resources':
        damage = Math.floor(targetSect.treasury * 0.1);
        targetSect.treasury -= damage;
        break;
      case 'buildings':
        damage = Math.floor(targetSect.buildings.length * 0.2);
        if (targetSect.buildings.length > 0) {
          for (let i = 0; i < damage && i < targetSect.buildings.length; i++) {
            targetSect.buildings[i].level = Math.max(1, targetSect.buildings[i].level - 1);
          }
        }
        break;
      case 'morale':
        damage = Math.floor(targetSect.prosperity * 0.15);
        targetSect.prosperity = Math.max(0, targetSect.prosperity - damage);
        break;
    }

    return { success: true, message: `成功破坏 ${targetSect.name} 的 ${sabotageType}`, damage };
  }

  static updateIntelligenceReports(sect: ISect): void {
    const now = Date.now();
    sect.intelligenceSystem.reports = sect.intelligenceSystem.reports.filter(r => r.expireTime > now);

    sect.intelligenceSystem.activeSpies = sect.intelligenceSystem.activeSpies.filter(spy => {
      if (now - spy.startTime >= spy.duration * 1000) {
        return false;
      }
      return true;
    });
  }

  // ==================== 单机AI模拟系统 ====================

  /** NPC名字池——用于生成AI模拟的宗门成员 */
  private static NPC_MEMBER_NAMES: string[] = [
    '陈风', '李云', '赵雪', '王林', '张毅', '刘云', '黄萱', '周明',
    '吴霜', '徐磊', '孙瑶', '马超', '朱玉', '胡天', '郭靖', '林夕',
    '何欢', '高翔', '罗冰', '梁辰', '宋妍', '韩月', '唐影', '冯宇',
    '邓飞', '曹琳', '彭浩', '秦岚', '萧远', '苏晴',
  ];

  /** NPC宗门名字池——用于生成AI模拟的对手势力 */
  private static NPC_SECT_NAMES: string[] = [
    '青云门', '天剑宗', '万兽谷', '丹鼎宗', '灵符派', '魔影宗',
    '星辰阁', '幽冥殿', '百花宫', '雷火堂', '玄冰宗', '太阳谷',
    '九幽门', '太虚观', '血刀门', '凤凰谷', '苍龙阁', '白虎堂',
  ];

  /** 生成AI模拟的宗门成员，填充sect.members */
  static generateNPCMember(sect: ISect, count: number = 1): ISectMember[] {
    const newMembers: ISectMember[] = [];
    const usedNames = new Set(sect.members.map(m => m.name));

    for (let i = 0; i < count; i++) {
      if (sect.members.length >= sect.maxMembers) break;

      let name: string;
      let attempts = 0;
      do {
        name = this.NPC_MEMBER_NAMES[Math.floor(Math.random() * this.NPC_MEMBER_NAMES.length)];
        if (attempts++ > 50) {
          name = `弟子${Date.now() % 10000}_${i}`;
          break;
        }
      } while (usedNames.has(name));
      usedNames.add(name);

      const roles: SectRole[] = [SectRole.DISCIPLE, SectRole.DISCIPLE, SectRole.ELITE_DISCIPLE, SectRole.CORE_DISCIPLE, SectRole.ELDER];
      const role = roles[Math.floor(Math.random() * roles.length)];

      newMembers.push({
        playerId: `npc_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 5)}`,
        name,
        role,
        contribution: Math.floor(Math.random() * 500) + 50,
        totalContribution: Math.floor(Math.random() * 2000) + 100,
        joinTime: Date.now() - Math.floor(Math.random() * 86400000 * 30),
        online: Math.random() > 0.3,
      });
    }

    sect.members.push(...newMembers);
    return newMembers;
  }

  /** 生成AI模拟的对手势力列表，用于排行榜、战争、外交等 */
  static generateRivalSects(playerRealm: CultivationRealm, count: number = 5): ISect[] {
    const rivals: ISect[] = [];
    const usedNames = new Set<string>();

    const realmRange = Math.max(0, playerRealm - 2);
    const realmMax = playerRealm + 2;

    for (let i = 0; i < count; i++) {
      let name: string;
      let attempts = 0;
      do {
        name = this.NPC_SECT_NAMES[Math.floor(Math.random() * this.NPC_SECT_NAMES.length)];
        if (attempts++ > 50) {
          name = `神秘势力${i}`;
          break;
        }
      } while (usedNames.has(name));
      usedNames.add(name);

      const realm = Math.min(realmMax, Math.max(realmRange, Math.floor(Math.random() * (realmMax - realmRange + 1)) + realmRange));
      const types: ForceType[] = [ForceType.SECT, ForceType.CLAN, ForceType.FAMILY, ForceType.GREAT_SECT];
      const ranks: ForceRank[] = [ForceRank.LEVEL_1, ForceRank.LEVEL_2, ForceRank.LEVEL_3, ForceRank.LEVEL_4];

      const rivalSect: ISect = {
        id: `rival_${Date.now()}_${i}`,
        name,
        type: types[Math.floor(Math.random() * types.length)],
        rank: ranks[Math.floor(Math.random() * ranks.length)],
        realm,
        requiredRealm: Math.max(0, realm - 1),
        members: [],
        maxMembers: 20 + Math.floor(Math.random() * 80),
        contribution: Math.floor(Math.random() * 100000),
        treasury: Math.floor(Math.random() * 500000) + 10000,
        buildings: [],
        techniques: [],
        quests: [],
        reputation: Math.floor(Math.random() * 10000),
        territory: [],
        creationTime: Date.now() - Math.floor(Math.random() * 86400000 * 365),
        resources: [],
        diplomacy: [],
        events: [],
        prosperity: Math.floor(Math.random() * 1000) + 200,
        maxProsperity: 1000,
        holyLands: [],
        treasurySystem: { totalIncome: 0, totalExpense: 0, weeklyIncome: 0, weeklyExpense: 0, lastUpdate: Date.now(), transactions: [] } as unknown as ITreasury,
        techniqueInheritances: [],
        techniqueMasteries: [],
        statistics: { totalMembers: 0, activeMembers: 0, totalQuests: 0, totalWars: 0, warsWon: 0, totalIncome: 0, totalSpent: 0, lastUpdated: Date.now() } as unknown as ISectStatistics,
        achievements: [],
        dailyTasks: [],
        weeklyTasks: [],
        specialTasks: [],
        taskProgress: [],
        techSystem: { techs: [], totalResearchPoints: 0, researchQueue: [] } as unknown as IForceTechSystem,
        shopSystem: { items: [], lastRefresh: Date.now(), refreshInterval: 86400000 } as unknown as IForceShop,
        feastSystem: { activeFeasts: [], totalFeastsHeld: 0 } as unknown as IForceFeastSystem,
        secretRealmSystem: { availableRealms: [], activeExpeditures: [], totalCompletions: 0 } as unknown as IForceSecretRealmSystem,
        allianceRequests: [],
        territorySystem: { territories: [], totalArea: 0, defenseLevel: 1 } as unknown as IForceTerritorySystem,
        officialSystem: { officials: [], maxOfficials: 5 } as unknown as IForceOfficialSystem,
        marriageSystem: { proposals: [], marriages: [], alliances: [] } as unknown as IForceMarriageSystem,
        trialSystem: { currentTrial: undefined, trialHistory: [], totalTrials: 0 } as unknown as IForceTrialSystem,
        buildingSystem: { buildings: [], totalUpgrades: 0 } as unknown as IForceBuildingSystem,
        petSystem: { pets: [], maxPets: 5 } as unknown as IForcePetSystem,
        formationSystem: { formations: [], activeFormations: [] } as unknown as IForceFormationSystem,
        craftSystem: { recipes: [], facilities: [], totalCrafts: 0 } as unknown as IForceCraftSystem,
        diplomacySystem: { standing: {}, reputation: {}, actions: [] } as unknown as IForceDiplomacySystem,
        intelligenceSystem: { reports: [], activeSpies: [], intelPoints: 0, counterIntelLevel: 0 } as unknown as IForceIntelligenceSystem,
      };

      // 为AI势力生成一些成员
      this.generateNPCMember(rivalSect, 5 + Math.floor(Math.random() * 15));

      rivals.push(rivalSect);
    }

    return rivals;
  }

  /** 让AI模拟的宗门成员自动参与试炼，填充排名 */
  static autoParticipateTrialNPCs(sect: ISect, count: number = 5): void {
    if (!sect.trialSystem.currentTrial) return;

    const trial = sect.trialSystem.currentTrial;
    const npcMembers = sect.members.filter(m => m.playerId.startsWith('npc_'));

    for (let i = 0; i < Math.min(count, npcMembers.length); i++) {
      const npc = npcMembers[i];
      if (trial.participants.find(p => p.playerId === npc.playerId)) continue;

      // AI成员的试炼分数基于其贡献度和随机因素
      const score = Math.floor(npc.contribution * (0.5 + Math.random()) + Math.random() * 1000);

      trial.participants.push({
        playerId: npc.playerId,
        playerName: npc.name,
        score,
        rank: trial.participants.length + 1,
      });
    }

    // 按分数排序
    trial.participants.sort((a, b) => b.score - a.score);
  }

  /** AI势力对外交提案的自动响应 */
  static simulateDiplomacyResponse(fromSect: ISect, toSect: ISect, action: string): { accepted: boolean; message: string } {
    const reputation = fromSect.diplomacySystem.reputation[toSect.id] || 0;
    const standing = fromSect.diplomacySystem.standing[toSect.id] || 'neutral';

    // 基于声望和关系决定是否接受
    let acceptChance = 0.3;
    if (standing === 'trusted') acceptChance = 0.85;
    else if (standing === 'friendly') acceptChance = 0.6;
    else if (standing === 'neutral') acceptChance = 0.3;
    else if (standing === 'hostile') acceptChance = 0.1;

    acceptChance += reputation / 200;
    acceptChance = Math.min(0.95, Math.max(0.05, acceptChance));

    const accepted = Math.random() < acceptChance;

    const actionNames: Record<string, string> = {
      peace: '和平协议',
      alliance: '结盟提议',
      trade: '贸易协定',
      marriage: '联姻提议',
      tribute: '进贡',
    };

    const actionName = actionNames[action] || action;

    if (accepted) {
      return {
        accepted: true,
        message: `${toSect.name}接受了你的${actionName}。`,
      };
    } else {
      const reasons = [
        `${toSect.name}拒绝了你提出的${actionName}，认为条件不够优厚。`,
        `${toSect.name}婉拒了你的${actionName}，表示暂无此意。`,
        `${toSect.name}对${actionName}不感兴趣，拒绝了你的提议。`,
      ];
      return {
        accepted: false,
        message: reasons[Math.floor(Math.random() * reasons.length)],
      };
    }
  }

  /** 定时更新AI势力状态（模拟其他势力的发展） */
  static updateRivalSects(rivals: ISect[], playerRealm: CultivationRealm): void {
    for (const sect of rivals) {
      // AI势力资源缓慢增长
      sect.treasury += Math.floor(Math.random() * 5000);
      sect.prosperity = Math.min(sect.maxProsperity, sect.prosperity + Math.floor(Math.random() * 10));

      // 偶尔招募新成员
      if (Math.random() < 0.3 && sect.members.length < sect.maxMembers) {
        this.generateNPCMember(sect, 1);
      }

      // 偶尔有成员贡献
      if (Math.random() < 0.5) {
        const npc = sect.members[Math.floor(Math.random() * sect.members.length)];
        if (npc) {
          const gain = Math.floor(Math.random() * 200) + 50;
          npc.contribution += gain;
          npc.totalContribution += gain;
        }
      }

      // 声望波动
      sect.reputation += Math.floor(Math.random() * 21) - 10;
      sect.reputation = Math.max(0, sect.reputation);
    }
  }
}