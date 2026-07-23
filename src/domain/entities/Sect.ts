import { CultivationRealm } from './Player';
import { ITechnique } from './Technique';

export enum ForceType {
  FAMILY = '家族',
  CLAN = '部族',
  SECT = '宗门',
  GREAT_SECT = '大宗',
  HOLY_LAND = '圣地',
  EMPIRE = '皇朝',
  SUPREME = '至尊势力',
}

export enum ForceRank {
  LEVEL_1 = '一阶势力',
  LEVEL_2 = '二阶势力',
  LEVEL_3 = '三阶势力',
  LEVEL_4 = '四阶势力',
  LEVEL_5 = '五阶势力',
}

export enum SectRole {
  DISCIPLE = '弟子',
  ELITE_DISCIPLE = '精英弟子',
  CORE_DISCIPLE = '核心弟子',
  ELDER = '长老',
  GRAND_ELDER = '太上长老',
  SUCCESSOR = '少主',
  MASTER = '宗主',
}

export enum FamilyRole {
  FOUNDER = '创始人',
  PATRIARCH = '族长',
  ELDER = '长老',
  HEIR = '继承人',
  MEMBER = '家族成员',
}

export enum SectBuildingType {
  MAIN_HALL = '大殿',
  CULTIVATION_HALL = '修炼堂',
  ALCHEMY_ROOM = '丹房',
  FORGE = '炼器室',
  LIBRARY = '藏经阁',
  TREASURY = '宝库',
  WAR_ROOM = '战堂',
  MEDICAL_ROOM = '医馆',
  RESIDENCE = '居所',
  MARKET = '坊市',
  GUARD_TOWER = '护塔',
  SPIRIT_WELL = '灵泉',
}

export enum SectWarState {
  PREPARING = '准备中',
  INVADING = '进攻中',
  DEFENDING = '防守中',
  CEASEFIRE = '休战',
  VICTORY = '胜利',
  DEFEAT = '战败',
}

export enum DiplomaticRelation {
  ALLY = '盟友',
  NEUTRAL = '中立',
  RIVAL = '敌对',
  SUBORDINATE = '附属',
}

export enum ResourceType {
  SPIRIT_STONE = '灵石',
  HERB = '灵草',
  ORE = '矿石',
  WOOD = '灵木',
  PRECIOUS = '珍宝',
}

export enum HolyLandType {
  SPIRIT_POND = '灵池',
  MEDITATION_GROTTO = '悟道窟',
  HEAVENLY_FURNACE = '天火炉',
  DRAGON_NEST = '龙巢',
  IMMORTAL_GARDEN = '仙园',
  TIME_ARRAY = '时光阵',
  LAW_SOURCE = '道源地',
  COSMIC_WELL = '混沌井',
}

export interface ICultivationBonus {
  expMultiplier: number;
  breakthroughRateBonus: number;
  daoHeartGrowth: number;
  meridianEnhancement: number;
  lawInsightBonus: number;
}

export interface IHolyLand {
  id: string;
  type: HolyLandType;
  name: string;
  level: number;
  maxLevel: number;
  description: string;
  bonus: ICultivationBonus;
  unlockRequirement: {
    minForceRank: ForceRank;
    goldCost: number;
    requiredBuildings?: string[];
  };
  currentUsers: string[];
  maxUsers: number;
  upgradeCost: number;
}

export interface ISectBuilding {
  id: string;
  type: SectBuildingType;
  name: string;
  level: number;
  maxLevel: number;
  upgradeCost: number;
  effect: { stat: string; value: number; description: string };
  description: string;
}

export enum TechniqueInheritanceType {
  FOUNDER = '创始人传承',
  ANCESTRAL = '先祖传承',
  DISCOVERED = '探索获得',
  CREATED = '自创功法',
  MERGED = '融合功法',
  EVOLVED = '进化功法',
}

export enum TechniqueEvolutionStage {
  ORIGINAL = '初始',
  IMPROVED = '改良',
  PERFECTED = '完美',
  MYSTERIOUS = '玄妙',
  DIVINE = '神级',
}

export interface ITechniqueInheritance {
  id: string;
  techniqueId: string;
  techniqueName: string;
  inheritanceType: TechniqueInheritanceType;
  evolutionStage: TechniqueEvolutionStage;
  founderId?: string;
  founderName?: string;
  discoveredFrom?: string;
  inheritanceRequirements: {
    minContribution?: number;
    minRealm?: CultivationRealm;
    requiredRole?: SectRole | FamilyRole;
    requiredBuildingLevel?: { type: SectBuildingType; level: number };
  };
  learnCount: number;
  maxLearnCount: number;
  evolutionHistory: {
    stage: TechniqueEvolutionStage;
    time: number;
    contributorId?: string;
    description: string;
  }[];
  bonusEffects: Record<string, number>;
}

export interface ITechniqueMastery {
  playerId: string;
  techniqueId: string;
  masteryLevel: number;
  masteryExp: number;
  maxMasteryExp: number;
  canTeach: boolean;
  teachingCount: number;
}

export interface ISectMember {
  playerId: string;
  name: string;
  role: SectRole | FamilyRole;
  contribution: number;
  totalContribution: number;
  joinTime: number;
  online: boolean;
  lineage?: string;
  generation?: number;
}

export interface ISectQuest {
  id: string;
  title: string;
  description: string;
  type: 'guard' | 'resource' | 'mission' | 'war' | 'diplomacy' | 'development';
  difficulty: 'easy' | 'normal' | 'hard' | 'epic' | 'legendary';
  rewards: {
    contribution: number;
    exp: number;
    gold: number;
    items?: string[];
    reputation?: number;
  };
  requirements: {
    minRealm?: CultivationRealm;
    minContribution?: number;
    minLevel?: number;
  };
  duration: number;
  completedCount: number;
  maxDaily: number;
}

export interface ISectWar {
  id: string;
  enemySectId: string;
  enemySectName: string;
  state: SectWarState;
  startTime: number;
  endTime: number;
  attackerScore: number;
  defenderScore: number;
  participants: string[];
  rewards: {
    contribution: number;
    items?: string[];
    territory?: string[];
  };
  attackingUnits: IWarUnit[];
  defendingUnits: IWarUnit[];
  strategy: WarStrategy;
}

export enum UnitType {
  MORTAL_SOLDIER = '凡人士兵',
  CULTIVATOR = '修士',
  ELITE_CULTIVATOR = '精英修士',
  BEAST_TAMER = '驯兽师',
  ARRAY_MASTER = '阵法师',
  ALCHEMIST = '丹师',
  FORGER = '炼器师',
  ASSASSIN = '刺客',
  COMMANDER = '指挥官',
}

export interface IWarUnit {
  id: string;
  type: UnitType;
  name: string;
  count: number;
  level: number;
  attack: number;
  defense: number;
  speed: number;
  specialAbility: string;
  cost: { gold: number; resources: Record<string, number> };
}

export enum WarStrategy {
  ALL_OUT_ATTACK = '全力进攻',
  DEFENSIVE_FORMATION = '防守阵型',
  GUERRILLA = '游击战术',
  FLANK_ATTACK = '侧翼包抄',
  SIEGE = '围城战术',
  COUNTER_ATTACK = '反击战术',
}

export interface IWarStrategyEffect {
  strategy: WarStrategy;
  attackBonus: number;
  defenseBonus: number;
  speedBonus: number;
  chanceToApply: number;
  description: string;
}

export interface IWarReward {
  gold: number;
  reputation: number;
  resources: Record<string, number>;
  treasures: string[];
  territory: string[];
  prisoners: string[];
}

export interface IStrategicDeployment {
  id: string;
  sectId: string;
  units: IWarUnit[];
  strategy: WarStrategy;
  targetSectId?: string;
  targetTerritory?: string;
  deploymentTime: number;
  status: 'preparing' | 'deployed' | 'engaged' | 'returned';
}

export interface IForceResource {
  type: ResourceType;
  amount: number;
  productionPerHour: number;
  storageCapacity: number;
}

export enum LeaderboardType {
  POWER = '战力榜',
  REPUTATION = '声望榜',
  PROSPERITY = '繁荣榜',
  TERRITORY = '领地榜',
  WAR_VICTORIES = '战功榜',
  TREASURES = '宝藏榜',
}

export interface ILeaderboardEntry {
  sectId: string;
  sectName: string;
  type: ForceType;
  rank: ForceRank;
  value: number;
  rankChange: number;
}

export interface ILeaderboard {
  type: LeaderboardType;
  entries: ILeaderboardEntry[];
  lastUpdateTime: number;
}

export enum ForceAchievementTier {
  BRONZE = '青铜',
  SILVER = '白银',
  GOLD = '黄金',
  PLATINUM = '铂金',
  DIAMOND = '钻石',
  MYTHIC = '神话',
}

export interface IForceAchievement {
  id: string;
  name: string;
  description: string;
  tier: ForceAchievementTier;
  icon: string;
  requirements: {
    type: 'power' | 'reputation' | 'prosperity' | 'territory' | 'members' | 'treasures' | 'warVictories' | 'inheritance';
    target: number;
  }[];
  rewards: {
    gold?: number;
    reputation?: number;
    bonus?: Record<string, number>;
    title?: string;
  };
  unlocked: boolean;
  unlockedTime?: number;
  progress: Record<string, number>;
}

export interface ISectStatistics {
  totalWarVictories: number;
  totalWarDefeats: number;
  territoriesConquered: number;
  treasuresCollected: number;
  inheritancesCreated: number;
  membersTrained: number;
  holyLandsUnlocked: number;
  totalDonations: number;
  questsCompleted: number;
}

export enum TreasureRarity {
  COMMON = '普通',
  UNCOMMON = '稀有',
  RARE = '精良',
  EPIC = '史诗',
  LEGENDARY = '传说',
  MYTHIC = '神话',
}

export enum TreasureType {
  ARTIFACT = '法器',
  WEAPON = '武器',
  ARMOR = '防具',
  ACCESSORY = '饰品',
  CONSUMABLE = '消耗品',
  MATERIAL = '材料',
  SCROLL = '卷轴',
  PET = '宠物蛋',
}

export interface IForceTreasure {
  id: string;
  name: string;
  type: TreasureType;
  rarity: TreasureRarity;
  level: number;
  description: string;
  effects: Record<string, number>;
  ownerId?: string;
  available: boolean;
  acquireTime: number;
  source: string;
}

export interface ITreasury {
  level: number;
  maxLevel: number;
  capacity: number;
  treasures: IForceTreasure[];
  upgradeCost: number;
  unlockRarity: TreasureRarity;
}

export interface IDiplomaticRelation {
  forceId: string;
  forceName: string;
  relation: DiplomaticRelation;
  relationLevel: number;
  lastInteractionTime: number;
}

export interface IFamilyLineage {
  id: string;
  ancestor: string;
  members: string[];
  generation: number;
  inheritance: {
    technique?: string;
    title?: string;
    treasure?: string;
  };
}

export interface IForceEvent {
  id: string;
  type: 'attack' | 'resource_discovery' | 'visitor' | 'treasure' | 'natural_disaster' | 'opportunity';
  title: string;
  description: string;
  choices: {
    id: string;
    text: string;
    result: string;
    rewards?: { contribution?: number; gold?: number; reputation?: number; resources?: Record<string, number> };
    penalties?: { contribution?: number; gold?: number; reputation?: number };
  }[];
  timestamp: number;
  resolved: boolean;
}

export enum TaskType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  SPECIAL = 'special',
}

export enum TaskCategory {
  CULTIVATION = 'cultivation',
  DONATION = 'donation',
  WAR = 'war',
  COLLECTION = 'collection',
  CRAFTING = 'crafting',
  EXPLORE = 'explore',
  RECRUITMENT = 'recruitment',
  INHERITANCE = 'inheritance',
}

export interface ISectTaskReward {
  contribution: number;
  gold?: number;
  exp?: number;
  reputation?: number;
  items?: string[];
  resources?: Record<string, number>;
  achievementPoints?: number;
  title?: string;
}

export interface ISectTaskProgress {
  taskId: string;
  playerId: string;
  current: number;
  target: number;
  completed: boolean;
  claimed: boolean;
  lastUpdateTime: number;
}

export interface ISectDailyTask {
  id: string;
  name: string;
  description: string;
  category: TaskCategory;
  type: TaskType.DAILY;
  target: number;
  unit: string;
  rewards: ISectTaskReward;
  difficulty: 'easy' | 'medium' | 'hard';
  refreshTime: number;
  claimedCount: number;
  maxDaily: number;
}

export interface ISectWeeklyTask {
  id: string;
  name: string;
  description: string;
  category: TaskCategory;
  type: TaskType.WEEKLY;
  target: number;
  unit: string;
  rewards: ISectTaskReward;
  difficulty: 'medium' | 'hard' | 'epic';
  refreshDay: number;
  claimedCount: number;
  maxWeekly: number;
}

export interface ISectSpecialTask {
  id: string;
  name: string;
  description: string;
  category: TaskCategory;
  type: TaskType.SPECIAL;
  target: number;
  unit: string;
  rewards: ISectTaskReward;
  difficulty: 'hard' | 'epic' | 'legendary';
  unlockCondition: {
    type: 'rank' | 'reputation' | 'achievement' | 'event';
    value: string | number;
  };
  expiresAt: number;
  claimedCount: number;
  maxClaim: number;
}

export enum TechCategory {
  CULTIVATION = 'cultivation',
  WAR = 'war',
  ECONOMY = 'economy',
  DEFENSE = 'defense',
  SPECIAL = 'special',
}

export interface IForceTech {
  id: string;
  name: string;
  description: string;
  category: TechCategory;
  level: number;
  maxLevel: number;
  prerequisites: string[];
  effects: Record<string, number | string>;
  researchCost: {
    gold: number;
    resources: Record<string, number>;
    time: number;
  };
  unlocked: boolean;
  researching: boolean;
  researchProgress: number;
  researchStartTime: number;
}

export interface IForceTechSystem {
  techs: IForceTech[];
  totalResearchPoints: number;
  researchSpeed: number;
}

export enum ShopItemType {
  CONSUMABLE = 'consumable',
  MATERIAL = 'material',
  EQUIPMENT = 'equipment',
  TECHNIQUE = 'technique',
  RESOURCE = 'resource',
  SERVICE = 'service',
}

export interface IForceShopItem {
  id: string;
  name: string;
  description: string;
  type: ShopItemType;
  itemId?: string;
  quantity: number;
  price: {
    contribution?: number;
    gold?: number;
    resources?: Record<string, number>;
  };
  minContribution: number;
  minRank: ForceRank;
  dailyLimit: number;
  purchasedToday: number;
  stock: number;
}

export interface IForceShop {
  items: IForceShopItem[];
  refreshTime: number;
  discount: number;
}

export interface IForceFeast {
  id: string;
  name: string;
  type: 'normal' | 'grand' | 'legendary';
  cost: { gold: number; resources: Record<string, number> };
  duration: number;
  effects: Record<string, number>;
  participants: string[];
  startTime: number;
  endTime: number;
}

export interface IForceFeastSystem {
  currentFeast?: IForceFeast;
  feastHistory: IForceFeast[];
  feastBonus: Record<string, number>;
}

export interface IForceSecretRealm {
  id: string;
  name: string;
  description: string;
  tier: number;
  unlockCondition: {
    sectRank?: ForceRank;
    techRequired?: string;
    achievementRequired?: string;
  };
  rewards: {
    gold: number;
    exp: number;
    resources: Record<string, number>;
    treasures: string[];
    techniques: string[];
  };
  difficulty: number;
  cooldown: number;
  lastEnterTime: number;
}

export interface IForceSecretRealmSystem {
  realms: IForceSecretRealm[];
  explorationProgress: Record<string, number>;
}

export enum AllianceRole {
  LEADER = 'leader',
  MEMBER = 'member',
}

export interface IForceAlliance {
  id: string;
  name: string;
  leaderSectId: string;
  leaderSectName: string;
  members: { sectId: string; sectName: string; role: AllianceRole; joinTime: number }[];
  formationTime: number;
  reputation: number;
  territory: string[];
  warHistory: { attackerAllianceId?: string; defenderAllianceId?: string; victory: boolean; time: number }[];
}

export interface IAllianceRequest {
  id: string;
  fromSectId: string;
  fromSectName: string;
  toSectId: string;
  toSectName: string;
  type: 'join' | 'form';
  message: string;
  timestamp: number;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface IForceTerritory {
  id: string;
  name: string;
  ownerSectId: string;
  ownerSectName: string;
  resourceOutput: Record<string, number>;
  defensePower: number;
  population: number;
  buildings: string[];
  capturedTime: number;
}

export interface IForceTerritorySystem {
  territories: IForceTerritory[];
  ownedTerritories: string[];
}

export enum ForceOfficialRank {
  GRAND_MASTER = 'grand_master',
  ELDER = 'elder',
  REGION_MASTER = 'region_master',
  GUILD_LEADER = 'guild_leader',
  SUPERVISOR = 'supervisor',
  COMMON_MEMBER = 'common_member',
}

export interface IForceOfficial {
  id: string;
  playerId: string;
  playerName: string;
  rank: ForceOfficialRank;
  title: string;
  startDate: number;
  endDate?: number;
  salary: { gold: number; contribution: number; resources: Record<string, number> };
  permissions: {
    canManageMembers: boolean;
    canManageResources: boolean;
    canDeclareWar: boolean;
    canManageBuildings: boolean;
    canHostFeast: boolean;
    canResearchTech: boolean;
    canManageAlliance: boolean;
  };
}

export interface IForceOfficialSystem {
  officials: IForceOfficial[];
  salaryCycle: number;
  lastSalaryTime: number;
}

export interface IMartialAlliance {
  id: string;
  fromSectId: string;
  fromSectName: string;
  toSectId: string;
  toSectName: string;
  type: 'marriage' | 'blood_alliance' | 'mutual_aid';
  initiatorPlayerId: string;
  initiatorPlayerName: string;
  targetPlayerId: string;
  targetPlayerName: string;
  startTime: number;
  duration?: number;
  effects: Record<string, number>;
  status: 'pending' | 'active' | 'ended' | 'dissolved';
}

export interface IBloodLineage {
  id: string;
  name: string;
  ancestor: string;
  traits: string[];
  level: number;
  maxLevel: number;
  members: string[];
  inheritedTechniques: string[];
  inheritedTreasures: string[];
}

export interface IForceMarriageSystem {
  alliances: IMartialAlliance[];
  bloodLineages: IBloodLineage[];
}

export enum TrialType {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual',
  SPECIAL = 'special',
}

export interface IForceTrial {
  id: string;
  name: string;
  type: TrialType;
  description: string;
  difficulty: number;
  rewards: {
    gold: number;
    contribution: number;
    reputation: number;
    items: string[];
    achievementPoints: number;
  };
  participants: { playerId: string; playerName: string; score: number; rank: number }[];
  startTime: number;
  endTime: number;
  minRealm: CultivationRealm;
}

export interface IForceTrialSystem {
  currentTrial?: IForceTrial;
  trialHistory: IForceTrial[];
  trialPoints: Record<string, number>;
  rankings: { playerId: string; playerName: string; totalPoints: number; rank: number }[];
}

export enum BuildingCategory {
  ADMINISTRATION = 'administration',
  DEFENSE = 'defense',
  CULTIVATION = 'cultivation',
  ECONOMY = 'economy',
  WAR = 'war',
  SPECIAL = 'special',
}

export interface ISectBuildingUpgrade {
  buildingId: string;
  currentLevel: number;
  maxLevel: number;
  upgradeCost: { gold: number; resources: Record<string, number> };
  effects: Record<string, number>;
  upgradeTime: number;
  upgrading: boolean;
}

export interface IForceBuildingSystem {
  buildings: ISectBuildingUpgrade[];
  buildingEffects: Record<string, number>;
}

export enum PetRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
  MYTHIC = 'mythic',
}

export interface IForcePet {
  id: string;
  name: string;
  type: string;
  rarity: PetRarity;
  level: number;
  maxLevel: number;
  exp: number;
  skills: { id: string; name: string; level: number; effect: string }[];
  stats: { attack: number; defense: number; speed: number; hp: number };
  ownerPlayerId?: string;
  isMount: boolean;
  isCombat: boolean;
  isProduction: boolean;
  acquireTime: number;
}

export interface IForcePetSystem {
  pets: IForcePet[];
  petSlots: number;
  maxPetSlots: number;
}

export enum FormationGrade {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  MASTER = 'master',
  GRANDMASTER = 'grandmaster',
}

export enum FormationType {
  ATTACK = 'attack',
  DEFENSE = 'defense',
  TRAP = 'trap',
  SUPPORT = 'support',
  ILLUSION = 'illusion',
  KILLING = 'killing',
}

export interface IForceFormation {
  id: string;
  name: string;
  type: FormationType;
  grade: FormationGrade;
  level: number;
  maxLevel: number;
  requiredMembers: number;
  effects: {
    attackBonus?: number;
    defenseBonus?: number;
    speedBonus?: number;
    hpBonus?: number;
    critBonus?: number;
    specialEffect?: string;
  };
  energyCost: number;
  duration: number;
  cooldown: number;
  lastActivationTime: number;
  isActive: boolean;
  description: string;
}

export interface IForceFormationSystem {
  formations: IForceFormation[];
  activeFormation?: string;
  researchLevel: number;
  formationMastery: Record<string, number>;
}

export enum CraftType {
  ALCHEMY = 'alchemy',
  FORGING = 'forging',
  TALISMAN = 'talisman',
  ARRAY_CRAFT = 'array_craft',
}

export enum RecipeRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
  MYTHIC = 'mythic',
}

export interface ICraftRecipe {
  id: string;
  name: string;
  type: CraftType;
  rarity: RecipeRarity;
  resultItemId: string;
  resultQuantity: number;
  materials: { itemId: string; quantity: number }[];
  requiredLevel: number;
  successRate: number;
  craftTime: number;
  unlocked: boolean;
  unlockCost: { gold: number; contribution: number };
}

export interface ICraftFacility {
  type: CraftType;
  level: number;
  maxLevel: number;
  upgradeCost: { gold: number; resources: Record<string, number> };
  efficiency: number;
  slots: number;
}

export interface IForceCraftSystem {
  recipes: ICraftRecipe[];
  facilities: ICraftFacility[];
  craftHistory: { recipeId: string; playerId: string; success: boolean; time: number }[];
  totalCrafted: number;
}

export interface ITradeAgreement {
  id: string;
  fromSectId: string;
  fromSectName: string;
  toSectId: string;
  toSectName: string;
  type: 'trade' | 'alliance' | 'non_aggression' | 'vassal';
  terms: {
    goldExchange?: number;
    resourceExchange?: Record<string, number>;
    duration: number;
    conditions?: string[];
  };
  startTime: number;
  endTime: number;
  status: 'pending' | 'active' | 'expired' | 'broken';
}

export interface IDiplomaticAction {
  id: string;
  fromSectId: string;
  toSectId: string;
  action: 'trade_proposal' | 'alliance_request' | 'declare_war' | 'peace_treaty' | 'tribute' | 'sanction';
  details: string;
  timestamp: number;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface IForceDiplomacySystem {
  agreements: ITradeAgreement[];
  actions: IDiplomaticAction[];
  reputation: Record<string, number>;
  standing: Record<string, 'friendly' | 'neutral' | 'hostile' | 'trusted'>;
}

export enum IntelligenceType {
  SCOUT = 'scout',
  SPY = 'spy',
  COUNTER_INTELLIGENCE = 'counter_intelligence',
  SABOTAGE = 'sabotage',
}

export interface IIntelligenceReport {
  id: string;
  targetSectId: string;
  targetSectName: string;
  type: IntelligenceType;
  info: {
    power?: number;
    resources?: Record<string, number>;
    members?: number;
    defenses?: number;
    vulnerabilities?: string[];
  };
  accuracy: number;
  gatherTime: number;
  expireTime: number;
}

export interface IForceIntelligenceSystem {
  reports: IIntelligenceReport[];
  activeSpies: { sectId: string; playerId: string; startTime: number; duration: number }[];
  counterIntelLevel: number;
  intelPoints: number;
}

export interface ISect {
  id: string;
  name: string;
  type: ForceType;
  rank: ForceRank;
  realm: CultivationRealm;
  requiredRealm: CultivationRealm;
  members: ISectMember[];
  maxMembers: number;
  contribution: number;
  treasury: number;
  buildings: ISectBuilding[];
  techniques: ITechnique[];
  quests: ISectQuest[];
  war?: ISectWar;
  reputation: number;
  territory: string[];
  creationTime: number;
  resources: IForceResource[];
  diplomacy: IDiplomaticRelation[];
  familyLineage?: IFamilyLineage;
  events: IForceEvent[];
  prosperity: number;
  maxProsperity: number;
  holyLands: IHolyLand[];
  treasurySystem: ITreasury;
  techniqueInheritances: ITechniqueInheritance[];
  techniqueMasteries: ITechniqueMastery[];
  statistics: ISectStatistics;
  achievements: IForceAchievement[];
  dailyTasks: ISectDailyTask[];
  weeklyTasks: ISectWeeklyTask[];
  specialTasks: ISectSpecialTask[];
  taskProgress: ISectTaskProgress[];
  techSystem: IForceTechSystem;
  shopSystem: IForceShop;
  feastSystem: IForceFeastSystem;
  secretRealmSystem: IForceSecretRealmSystem;
  alliance?: IForceAlliance;
  allianceRequests: IAllianceRequest[];
  territorySystem: IForceTerritorySystem;
  officialSystem: IForceOfficialSystem;
  marriageSystem: IForceMarriageSystem;
  trialSystem: IForceTrialSystem;
  buildingSystem: IForceBuildingSystem;
  petSystem: IForcePetSystem;
  formationSystem: IForceFormationSystem;
  craftSystem: IForceCraftSystem;
  diplomacySystem: IForceDiplomacySystem;
  intelligenceSystem: IForceIntelligenceSystem;
}

export const FORCE_CREATION_REQUIREMENTS: Record<ForceType, {
  minRealm: CultivationRealm;
  goldCost: number;
  description: string;
}> = {
  [ForceType.FAMILY]: {
    minRealm: CultivationRealm.BLOOD_MOVING,
    goldCost: 1000,
    description: '建立家族，血脉传承，可培养后代',
  },
  [ForceType.CLAN]: {
    minRealm: CultivationRealm.CAVE,
    goldCost: 5000,
    description: '建立部族，吸纳外族成员，共同发展',
  },
  [ForceType.SECT]: {
    minRealm: CultivationRealm.SPIRIT,
    goldCost: 20000,
    description: '建立宗门，广收弟子，传授功法',
  },
  [ForceType.GREAT_SECT]: {
    minRealm: CultivationRealm.VENERABLE,
    goldCost: 100000,
    description: '建立大宗，称霸一方，拥有领地',
  },
  [ForceType.HOLY_LAND]: {
    minRealm: CultivationRealm.DIVINE_FIRE,
    goldCost: 500000,
    description: '建立圣地，传承万古，影响天下',
  },
  [ForceType.EMPIRE]: {
    minRealm: CultivationRealm.TRUE_ONE,
    goldCost: 1000000,
    description: '建立皇朝，统治疆域，号令群雄',
  },
  [ForceType.SUPREME]: {
    minRealm: CultivationRealm.SACRIFICE,
    goldCost: 5000000,
    description: '建立至尊势力，凌驾万族，名传千古',
  },
};

export const FORCE_RANK_BONUSES: Record<ForceRank, {
  memberBonus: number;
  resourceBonus: number;
  reputationBonus: number;
}> = {
  [ForceRank.LEVEL_1]: { memberBonus: 1, resourceBonus: 1, reputationBonus: 1 },
  [ForceRank.LEVEL_2]: { memberBonus: 1.2, resourceBonus: 1.2, reputationBonus: 1.1 },
  [ForceRank.LEVEL_3]: { memberBonus: 1.5, resourceBonus: 1.5, reputationBonus: 1.3 },
  [ForceRank.LEVEL_4]: { memberBonus: 2, resourceBonus: 2, reputationBonus: 1.5 },
  [ForceRank.LEVEL_5]: { memberBonus: 3, resourceBonus: 3, reputationBonus: 2 },
};

export const SECT_ROLE_PERMISSIONS: Record<SectRole, {
  canAcceptQuests: boolean;
  canDonate: boolean;
  canUpgradeBuildings: boolean;
  canDeclareWar: boolean;
  canManageMembers: boolean;
  canAccessTechniques: boolean;
  canManageDiplomacy: boolean;
  canManageTreasury: boolean;
  canWithdrawTreasure: boolean;
}> = {
  [SectRole.DISCIPLE]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: false,
    canDeclareWar: false,
    canManageMembers: false,
    canAccessTechniques: false,
    canManageDiplomacy: false,
    canManageTreasury: false,
    canWithdrawTreasure: false,
  },
  [SectRole.ELITE_DISCIPLE]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: false,
    canDeclareWar: false,
    canManageMembers: false,
    canAccessTechniques: true,
    canManageDiplomacy: false,
    canManageTreasury: false,
    canWithdrawTreasure: false,
  },
  [SectRole.CORE_DISCIPLE]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: true,
    canDeclareWar: false,
    canManageMembers: false,
    canAccessTechniques: true,
    canManageDiplomacy: false,
    canManageTreasury: false,
    canWithdrawTreasure: true,
  },
  [SectRole.ELDER]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: true,
    canDeclareWar: true,
    canManageMembers: true,
    canAccessTechniques: true,
    canManageDiplomacy: true,
    canManageTreasury: true,
    canWithdrawTreasure: true,
  },
  [SectRole.GRAND_ELDER]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: true,
    canDeclareWar: true,
    canManageMembers: true,
    canAccessTechniques: true,
    canManageDiplomacy: true,
    canManageTreasury: true,
    canWithdrawTreasure: true,
  },
  [SectRole.SUCCESSOR]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: true,
    canDeclareWar: true,
    canManageMembers: true,
    canAccessTechniques: true,
    canManageDiplomacy: true,
    canManageTreasury: true,
    canWithdrawTreasure: true,
  },
  [SectRole.MASTER]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: true,
    canDeclareWar: true,
    canManageMembers: true,
    canAccessTechniques: true,
    canManageDiplomacy: true,
    canManageTreasury: true,
    canWithdrawTreasure: true,
  },
};

export const FAMILY_ROLE_PERMISSIONS: Record<FamilyRole, {
  canAcceptQuests: boolean;
  canDonate: boolean;
  canUpgradeBuildings: boolean;
  canDeclareWar: boolean;
  canManageMembers: boolean;
  canAccessTechniques: boolean;
  canManageDiplomacy: boolean;
  canManageTreasury: boolean;
  canWithdrawTreasure: boolean;
}> = {
  [FamilyRole.FOUNDER]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: true,
    canDeclareWar: true,
    canManageMembers: true,
    canAccessTechniques: true,
    canManageDiplomacy: true,
    canManageTreasury: true,
    canWithdrawTreasure: true,
  },
  [FamilyRole.PATRIARCH]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: true,
    canDeclareWar: true,
    canManageMembers: true,
    canAccessTechniques: true,
    canManageDiplomacy: true,
    canManageTreasury: true,
    canWithdrawTreasure: true,
  },
  [FamilyRole.ELDER]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: true,
    canDeclareWar: true,
    canManageMembers: true,
    canAccessTechniques: true,
    canManageDiplomacy: true,
    canManageTreasury: true,
    canWithdrawTreasure: true,
  },
  [FamilyRole.HEIR]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: true,
    canDeclareWar: true,
    canManageMembers: true,
    canAccessTechniques: true,
    canManageDiplomacy: true,
    canManageTreasury: true,
    canWithdrawTreasure: true,
  },
  [FamilyRole.MEMBER]: {
    canAcceptQuests: true,
    canDonate: true,
    canUpgradeBuildings: false,
    canDeclareWar: false,
    canManageMembers: false,
    canAccessTechniques: false,
    canManageDiplomacy: false,
    canManageTreasury: false,
    canWithdrawTreasure: false,
  },
};

export const SECT_BUILDING_TEMPLATES: Record<SectBuildingType, {
  name: string;
  maxLevel: 10;
  baseCost: number;
  effect: { stat: string; value: number; description: string };
  description: string;
}> = {
  [SectBuildingType.MAIN_HALL]: {
    name: '大殿',
    maxLevel: 10,
    baseCost: 10000,
    effect: { stat: 'maxMembers', value: 50, description: '增加势力人数上限' },
    description: '势力的核心建筑，决定势力规模',
  },
  [SectBuildingType.CULTIVATION_HALL]: {
    name: '修炼堂',
    maxLevel: 10,
    baseCost: 8000,
    effect: { stat: 'cultivationSpeed', value: 10, description: '修炼速度+10%' },
    description: '提供灵气浓郁的修炼环境',
  },
  [SectBuildingType.ALCHEMY_ROOM]: {
    name: '丹房',
    maxLevel: 10,
    baseCost: 12000,
    effect: { stat: 'alchemySuccess', value: 15, description: '炼丹成功率+15%' },
    description: '炼制丹药的场所',
  },
  [SectBuildingType.FORGE]: {
    name: '炼器室',
    maxLevel: 10,
    baseCost: 12000,
    effect: { stat: 'forgeQuality', value: 10, description: '炼器品质+10%' },
    description: '锻造武器装备的场所',
  },
  [SectBuildingType.LIBRARY]: {
    name: '藏经阁',
    maxLevel: 10,
    baseCost: 15000,
    effect: { stat: 'techniqueUnlock', value: 1, description: '解锁一门功法' },
    description: '存放势力功法秘籍的地方',
  },
  [SectBuildingType.TREASURY]: {
    name: '宝库',
    maxLevel: 10,
    baseCost: 10000,
    effect: { stat: 'treasuryCapacity', value: 100000, description: '增加宝库容量' },
    description: '存放势力财富的地方',
  },
  [SectBuildingType.WAR_ROOM]: {
    name: '战堂',
    maxLevel: 10,
    baseCost: 10000,
    effect: { stat: 'warPower', value: 20, description: '势力战力+20%' },
    description: '训练成员和策划战争的地方',
  },
  [SectBuildingType.MEDICAL_ROOM]: {
    name: '医馆',
    maxLevel: 10,
    baseCost: 8000,
    effect: { stat: 'healRate', value: 15, description: '恢复速度+15%' },
    description: '治疗伤病的场所',
  },
  [SectBuildingType.RESIDENCE]: {
    name: '居所',
    maxLevel: 10,
    baseCost: 5000,
    effect: { stat: 'memberHappiness', value: 5, description: '成员幸福感+5%' },
    description: '成员居住的场所',
  },
  [SectBuildingType.MARKET]: {
    name: '坊市',
    maxLevel: 10,
    baseCost: 20000,
    effect: { stat: 'income', value: 500, description: '每日获得500金币' },
    description: '吸引商人交易，增加收入',
  },
  [SectBuildingType.GUARD_TOWER]: {
    name: '护塔',
    maxLevel: 10,
    baseCost: 8000,
    effect: { stat: 'defense', value: 10, description: '防御+10%' },
    description: '守卫领地，抵御外敌',
  },
  [SectBuildingType.SPIRIT_WELL]: {
    name: '灵泉',
    maxLevel: 10,
    baseCost: 15000,
    effect: { stat: 'spiritProduction', value: 100, description: '灵泉产出+100' },
    description: '提供灵气，增加资源产出',
  },
};

export const HOLY_LAND_TEMPLATES: Record<HolyLandType, {
  name: string;
  maxLevel: 10;
  description: string;
  baseBonus: ICultivationBonus;
  unlockRequirement: {
    minForceRank: ForceRank;
    goldCost: number;
    requiredBuildings?: SectBuildingType[];
  };
  maxUsers: number;
  baseUpgradeCost: number;
}> = {
  [HolyLandType.SPIRIT_POND]: {
    name: '灵池',
    maxLevel: 10,
    description: '蕴含浓郁灵气的天然灵池，浸泡其中可加速修炼',
    baseBonus: { expMultiplier: 1.2, breakthroughRateBonus: 5, daoHeartGrowth: 0.5, meridianEnhancement: 0.1, lawInsightBonus: 0 },
    unlockRequirement: { minForceRank: ForceRank.LEVEL_1, goldCost: 50000 },
    maxUsers: 5,
    baseUpgradeCost: 30000,
  },
  [HolyLandType.MEDITATION_GROTTO]: {
    name: '悟道窟',
    maxLevel: 10,
    description: '天地自然形成的洞窟，蕴含天地法则的痕迹',
    baseBonus: { expMultiplier: 1.1, breakthroughRateBonus: 10, daoHeartGrowth: 1, meridianEnhancement: 0, lawInsightBonus: 0.15 },
    unlockRequirement: { minForceRank: ForceRank.LEVEL_2, goldCost: 200000, requiredBuildings: [SectBuildingType.LIBRARY] },
    maxUsers: 3,
    baseUpgradeCost: 100000,
  },
  [HolyLandType.HEAVENLY_FURNACE]: {
    name: '天火炉',
    maxLevel: 10,
    description: '天降神炉，可淬炼体魄，强化经脉',
    baseBonus: { expMultiplier: 1.3, breakthroughRateBonus: 3, daoHeartGrowth: 0, meridianEnhancement: 0.25, lawInsightBonus: 0 },
    unlockRequirement: { minForceRank: ForceRank.LEVEL_2, goldCost: 150000, requiredBuildings: [SectBuildingType.FORGE] },
    maxUsers: 4,
    baseUpgradeCost: 80000,
  },
  [HolyLandType.DRAGON_NEST]: {
    name: '龙巢',
    maxLevel: 10,
    description: '远古神龙栖息之地，蕴含龙气，可蜕变体质',
    baseBonus: { expMultiplier: 1.5, breakthroughRateBonus: 15, daoHeartGrowth: 1.5, meridianEnhancement: 0.4, lawInsightBonus: 0.1 },
    unlockRequirement: { minForceRank: ForceRank.LEVEL_3, goldCost: 500000, requiredBuildings: [SectBuildingType.MAIN_HALL, SectBuildingType.WAR_ROOM] },
    maxUsers: 2,
    baseUpgradeCost: 300000,
  },
  [HolyLandType.IMMORTAL_GARDEN]: {
    name: '仙园',
    maxLevel: 10,
    description: '种植仙药灵草的神秘花园，吸收药气可洗涤肉身',
    baseBonus: { expMultiplier: 1.4, breakthroughRateBonus: 8, daoHeartGrowth: 2, meridianEnhancement: 0.3, lawInsightBonus: 0.05 },
    unlockRequirement: { minForceRank: ForceRank.LEVEL_3, goldCost: 400000, requiredBuildings: [SectBuildingType.ALCHEMY_ROOM] },
    maxUsers: 3,
    baseUpgradeCost: 250000,
  },
  [HolyLandType.TIME_ARRAY]: {
    name: '时光阵',
    maxLevel: 10,
    description: '扭曲时间法则的神秘法阵，内部时间流速与外界不同',
    baseBonus: { expMultiplier: 2, breakthroughRateBonus: 20, daoHeartGrowth: 3, meridianEnhancement: 0.5, lawInsightBonus: 0.25 },
    unlockRequirement: { minForceRank: ForceRank.LEVEL_4, goldCost: 1000000, requiredBuildings: [SectBuildingType.MAIN_HALL, SectBuildingType.LIBRARY] },
    maxUsers: 1,
    baseUpgradeCost: 600000,
  },
  [HolyLandType.LAW_SOURCE]: {
    name: '道源地',
    maxLevel: 10,
    description: '大道法则的源头之地，可直接感悟天地法则',
    baseBonus: { expMultiplier: 1.8, breakthroughRateBonus: 25, daoHeartGrowth: 4, meridianEnhancement: 0.6, lawInsightBonus: 0.4 },
    unlockRequirement: { minForceRank: ForceRank.LEVEL_4, goldCost: 1500000, requiredBuildings: [SectBuildingType.LIBRARY, SectBuildingType.CULTIVATION_HALL] },
    maxUsers: 1,
    baseUpgradeCost: 800000,
  },
  [HolyLandType.COSMIC_WELL]: {
    name: '混沌井',
    maxLevel: 10,
    description: '连接混沌本源的神秘井穴，蕴含最原始的力量',
    baseBonus: { expMultiplier: 3, breakthroughRateBonus: 35, daoHeartGrowth: 5, meridianEnhancement: 0.8, lawInsightBonus: 0.6 },
    unlockRequirement: { minForceRank: ForceRank.LEVEL_5, goldCost: 5000000 },
    maxUsers: 1,
    baseUpgradeCost: 2000000,
  },
};

export const SECT_QUEST_TEMPLATES: ISectQuest[] = [
  {
    id: 'sect_quest_1',
    title: '势力巡逻',
    description: '在势力周边巡逻，防范妖兽入侵',
    type: 'guard',
    difficulty: 'easy',
    rewards: { contribution: 50, exp: 200, gold: 100 },
    requirements: { minRealm: CultivationRealm.BLOOD_MOVING },
    duration: 300,
    completedCount: 0,
    maxDaily: 3,
  },
  {
    id: 'sect_quest_2',
    title: '采集灵草',
    description: '前往灵草园采集灵草',
    type: 'resource',
    difficulty: 'easy',
    rewards: { contribution: 60, exp: 250, gold: 150 },
    requirements: { minRealm: CultivationRealm.BLOOD_MOVING },
    duration: 400,
    completedCount: 0,
    maxDaily: 3,
  },
  {
    id: 'sect_quest_3',
    title: '护送任务',
    description: '护送势力物资前往交易点',
    type: 'mission',
    difficulty: 'normal',
    rewards: { contribution: 100, exp: 500, gold: 300 },
    requirements: { minRealm: CultivationRealm.CAVE },
    duration: 600,
    completedCount: 0,
    maxDaily: 2,
  },
  {
    id: 'sect_quest_4',
    title: '清缴妖兽',
    description: '前往妖兽领地清缴作乱的妖兽',
    type: 'guard',
    difficulty: 'normal',
    rewards: { contribution: 120, exp: 600, gold: 400 },
    requirements: { minRealm: CultivationRealm.CAVE },
    duration: 800,
    completedCount: 0,
    maxDaily: 2,
  },
  {
    id: 'sect_quest_5',
    title: '争夺矿脉',
    description: '与敌对势力争夺灵矿矿脉',
    type: 'war',
    difficulty: 'hard',
    rewards: { contribution: 200, exp: 1000, gold: 800 },
    requirements: { minRealm: CultivationRealm.SPIRIT },
    duration: 1200,
    completedCount: 0,
    maxDaily: 1,
  },
  {
    id: 'sect_quest_6',
    title: '秘境探索',
    description: '探索势力发现的秘境',
    type: 'mission',
    difficulty: 'epic',
    rewards: { contribution: 300, exp: 2000, gold: 1500 },
    requirements: { minRealm: CultivationRealm.INSCRIBE },
    duration: 1800,
    completedCount: 0,
    maxDaily: 1,
  },
  {
    id: 'sect_quest_7',
    title: '外交出使',
    description: '出使其他势力，增进外交关系',
    type: 'diplomacy',
    difficulty: 'normal',
    rewards: { contribution: 80, exp: 400, gold: 200, reputation: 20 },
    requirements: { minRealm: CultivationRealm.SPIRIT },
    duration: 600,
    completedCount: 0,
    maxDaily: 2,
  },
  {
    id: 'sect_quest_8',
    title: '势力建设',
    description: '参与势力建设，提升繁荣度',
    type: 'development',
    difficulty: 'easy',
    rewards: { contribution: 40, exp: 150, gold: 50 },
    requirements: {},
    duration: 300,
    completedCount: 0,
    maxDaily: 5,
  },
  {
    id: 'sect_quest_9',
    title: '血脉传承',
    description: '传承家族血脉，培养后代',
    type: 'development',
    difficulty: 'hard',
    rewards: { contribution: 150, exp: 800, gold: 500 },
    requirements: { minRealm: CultivationRealm.CAVE },
    duration: 900,
    completedCount: 0,
    maxDaily: 1,
  },
  {
    id: 'sect_quest_10',
    title: '争霸天下',
    description: '与顶级势力争霸，争夺领地',
    type: 'war',
    difficulty: 'legendary',
    rewards: { contribution: 500, exp: 5000, gold: 3000, reputation: 100 },
    requirements: { minRealm: CultivationRealm.VENERABLE },
    duration: 3600,
    completedCount: 0,
    maxDaily: 1,
  },
];

export const FORCE_EVENT_TEMPLATES: IForceEvent[] = [
  {
    id: 'force_event_1',
    type: 'resource_discovery',
    title: '发现矿脉',
    description: '势力领地内发现一处新的灵矿矿脉！',
    choices: [
      { id: 'develop', text: '立即开发', result: '矿脉开始产出灵石', rewards: { resources: { [ResourceType.ORE]: 500 } } },
      { id: 'protect', text: '派人守护', result: '矿脉安全开发', rewards: { resources: { [ResourceType.ORE]: 300 }, gold: 1000 } },
      { id: 'secret', text: '秘密隐藏', result: '矿脉暂未被发现', penalties: {} },
    ],
    timestamp: Date.now(),
    resolved: false,
  },
  {
    id: 'force_event_2',
    type: 'visitor',
    title: '神秘来客',
    description: '一位神秘老者来到势力门口，声称要见宗主...',
    choices: [
      { id: 'welcome', text: '热情接待', result: '老者传授了一门功法', rewards: { contribution: 100, gold: 500 } },
      { id: 'suspicious', text: '谨慎对待', result: '老者留下一些灵石后离开', rewards: { gold: 2000 } },
      { id: 'reject', text: '拒之门外', result: '老者失望离开', penalties: { reputation: -20 } },
    ],
    timestamp: Date.now(),
    resolved: false,
  },
  {
    id: 'force_event_3',
    type: 'attack',
    title: '妖兽袭击',
    description: '一群妖兽正在袭击势力领地！',
    choices: [
      { id: 'fight', text: '全力反击', result: '成功击退妖兽', rewards: { contribution: 150, resources: { [ResourceType.SPIRIT_STONE]: 100 } } },
      { id: 'defend', text: '坚守防御', result: '妖兽退去，但有损失', rewards: { contribution: 50 }, penalties: { gold: -500 } },
      { id: 'negotiate', text: '尝试沟通', result: '妖兽首领同意和平共处', rewards: { reputation: 30 } },
    ],
    timestamp: Date.now(),
    resolved: false,
  },
  {
    id: 'force_event_4',
    type: 'treasure',
    title: '藏宝图',
    description: '成员在巡逻时发现了一张古老的藏宝图！',
    choices: [
      { id: 'explore', text: '立即探索', result: '找到了宝藏！', rewards: { gold: 10000, resources: { [ResourceType.PRECIOUS]: 100 } } },
      { id: 'prepare', text: '准备后再去', result: '安全获取了部分宝藏', rewards: { gold: 5000 } },
      { id: 'sell', text: '出售藏宝图', result: '获得了一笔金币', rewards: { gold: 3000 } },
    ],
    timestamp: Date.now(),
    resolved: false,
  },
  {
    id: 'force_event_5',
    type: 'opportunity',
    title: '天才降临',
    description: '一位修炼天才请求加入势力！',
    choices: [
      { id: 'accept', text: '欣然接纳', result: '天才加入，势力实力大增', rewards: { contribution: 200, reputation: 50 } },
      { id: 'test', text: '考验后再决定', result: '天才通过考验，正式加入', rewards: { contribution: 100 } },
      { id: 'reject', text: '婉言拒绝', result: '天才遗憾离开', penalties: { reputation: -30 } },
    ],
    timestamp: Date.now(),
    resolved: false,
  },
];

export function calculateSectPower(sect: ISect): number {
  let power = sect.members.length * 100;

  sect.buildings.forEach(building => {
    if (building.type === SectBuildingType.WAR_ROOM) {
      power += building.level * 500;
    }
  });

  sect.members.forEach(member => {
    power += member.contribution / 10;
  });

  const rankBonus = FORCE_RANK_BONUSES[sect.rank];
  power *= rankBonus.resourceBonus;

  return power;
}

export function calculateUpgradeCost(building: ISectBuilding): number {
  const template = SECT_BUILDING_TEMPLATES[building.type];
  return Math.floor(template.baseCost * Math.pow(1.5, building.level));
}

export function getRankName(rank: ForceRank): string {
  return rank;
}

export function canCreateForce(player: any, forceType: ForceType): { can: boolean; message: string; cost: number } {
  const req = FORCE_CREATION_REQUIREMENTS[forceType];
  if (player.realm < req.minRealm) {
    return { can: false, message: `境界不足，需要${CultivationRealm[req.minRealm]}境`, cost: req.goldCost };
  }
  if (player.gold < req.goldCost) {
    return { can: false, message: `金币不足，需要${req.goldCost}金币`, cost: req.goldCost };
  }
  return { can: true, message: '可以创建', cost: req.goldCost };
}