import {
  ISect,
  ISectWar,
  IWarUnit,
  UnitType,
  WarStrategy,
  SectWarState,
  DiplomaticRelation,
  IWarReward,
  IStrategicDeployment,
  IForceTerritory,
  calculateSectPower,
} from '../entities/Sect';
import { eventBus } from '../../infrastructure/event/EventBus';
import { GameTimeService } from './GameTimeService';

export class FactionWarService {
  private static instance: FactionWarService;
  private wars: Map<string, ISectWar> = new Map();
  private deployments: Map<string, IStrategicDeployment> = new Map();
  private gameTimeService: GameTimeService;

  private constructor() {
    this.gameTimeService = GameTimeService.getInstance();
    this.setupEventListeners();
  }

  static getInstance(): FactionWarService {
    if (!FactionWarService.instance) {
      FactionWarService.instance = new FactionWarService();
    }
    return FactionWarService.instance;
  }

  private setupEventListeners(): void {
    eventBus.on('gameTime:dayChanged', () => this.processWarTurns());
    eventBus.on('faction:diplomacyChanged', () => this.checkForWars());
  }

  declareWar(attacker: ISect, defender: ISect): ISectWar | null {
    if (attacker.id === defender.id) return null;

    const existingWar = this.getWarBetween(attacker.id, defender.id);
    if (existingWar) return existingWar;

    const war: ISectWar = {
      id: `war_${Date.now()}`,
      enemySectId: defender.id,
      enemySectName: defender.name,
      state: SectWarState.INVADING,
      startTime: this.gameTimeService.getTime().day,
      endTime: this.gameTimeService.getTime().day + 7,
      attackerScore: 0,
      defenderScore: 0,
      participants: [],
      rewards: {
        contribution: 1000,
        territory: [],
      },
      attackingUnits: this.generateUnits(attacker),
      defendingUnits: this.generateUnits(defender),
      strategy: WarStrategy.ALL_OUT_ATTACK,
    };

    this.wars.set(war.id, war);

    attacker.war = war;
    defender.war = war;

    eventBus.emit('faction:warDeclared', { war, attacker, defender });
    eventBus.emit('faction:conflict', {
      faction: attacker.name,
      description: `${attacker.name}向${defender.name}宣战！`,
    });

    return war;
  }

  private generateUnits(sect: ISect): IWarUnit[] {
    const units: IWarUnit[] = [];
    const power = calculateSectPower(sect);

    const unitTypes: UnitType[] = [
      UnitType.MORTAL_SOLDIER,
      UnitType.CULTIVATOR,
      UnitType.ELITE_CULTIVATOR,
      UnitType.COMMANDER,
    ];

    for (const type of unitTypes) {
      const unit: IWarUnit = {
        id: `unit_${Date.now()}_${type}`,
        type,
        name: type,
        count: Math.floor(power / 1000) + Math.floor(Math.random() * 10),
        level: sect.members.length > 50 ? 3 : sect.members.length > 20 ? 2 : 1,
        attack: this.getUnitAttack(type),
        defense: this.getUnitDefense(type),
        speed: this.getUnitSpeed(type),
        specialAbility: this.getUnitAbility(type),
        cost: { gold: 0, resources: {} },
      };
      units.push(unit);
    }

    return units;
  }

  private getUnitAttack(type: UnitType): number {
    switch (type) {
      case UnitType.MORTAL_SOLDIER: return 10;
      case UnitType.CULTIVATOR: return 50;
      case UnitType.ELITE_CULTIVATOR: return 150;
      case UnitType.ASSASSIN: return 300;
      case UnitType.COMMANDER: return 200;
      default: return 30;
    }
  }

  private getUnitDefense(type: UnitType): number {
    switch (type) {
      case UnitType.MORTAL_SOLDIER: return 5;
      case UnitType.CULTIVATOR: return 30;
      case UnitType.ELITE_CULTIVATOR: return 80;
      case UnitType.COMMANDER: return 100;
      default: return 20;
    }
  }

  private getUnitSpeed(type: UnitType): number {
    switch (type) {
      case UnitType.ASSASSIN: return 100;
      case UnitType.CULTIVATOR: return 60;
      case UnitType.MORTAL_SOLDIER: return 30;
      case UnitType.ELITE_CULTIVATOR: return 50;
      case UnitType.COMMANDER: return 40;
      default: return 35;
    }
  }

  private getUnitAbility(type: UnitType): string {
    switch (type) {
      case UnitType.MORTAL_SOLDIER: return '人海战术';
      case UnitType.CULTIVATOR: return '灵气攻击';
      case UnitType.ELITE_CULTIVATOR: return '精英合击';
      case UnitType.BEAST_TAMER: return '妖兽召唤';
      case UnitType.ARRAY_MASTER: return '阵法加持';
      case UnitType.ALCHEMIST: return '丹药增益';
      case UnitType.FORGER: return '神兵锻造';
      case UnitType.ASSASSIN: return '暗杀突袭';
      case UnitType.COMMANDER: return '战术指挥';
      default: return '普通攻击';
    }
  }

  private processWarTurns(): void {
    const currentDay = this.gameTimeService.getTime().day;

    for (const war of this.wars.values()) {
      if (war.state === SectWarState.VICTORY || war.state === SectWarState.DEFEAT) {
        continue;
      }

      if (currentDay >= war.endTime) {
        this.resolveWar(war);
        continue;
      }

      this.processWarRound(war);
    }
  }

  private processWarRound(war: ISectWar): void {
    const attackerPower = this.calculateTotalPower(war.attackingUnits);
    const defenderPower = this.calculateTotalPower(war.defendingUnits);

    const strategyBonus = this.getStrategyBonus(war.strategy);
    const attackerEffectivePower = attackerPower * (1 + strategyBonus.attackBonus);
    const defenderEffectivePower = defenderPower * (1 + strategyBonus.defenseBonus);

    const attackerDamage = Math.max(1, Math.floor(attackerEffectivePower / 10));
    const defenderDamage = Math.max(1, Math.floor(defenderEffectivePower / 10));

    war.attackingUnits.forEach((unit) => {
      unit.count = Math.max(0, unit.count - Math.floor(defenderDamage / war.attackingUnits.length));
    });

    war.defendingUnits.forEach((unit) => {
      unit.count = Math.max(0, unit.count - Math.floor(attackerDamage / war.defendingUnits.length));
    });

    const attackerAlive = war.attackingUnits.reduce((sum, u) => sum + u.count, 0);
    const defenderAlive = war.defendingUnits.reduce((sum, u) => sum + u.count, 0);

    if (attackerAlive > 0) {
      war.attackerScore += attackerAlive * 10;
    }
    if (defenderAlive > 0) {
      war.defenderScore += defenderAlive * 10;
    }

    if (attackerAlive === 0) {
      war.state = SectWarState.DEFEAT;
    } else if (defenderAlive === 0) {
      war.state = SectWarState.VICTORY;
    }

    eventBus.emit('war:roundProcessed', {
      war,
      attackerDamage,
      defenderDamage,
      attackerAlive,
      defenderAlive,
    });
  }

  private calculateTotalPower(units: IWarUnit[]): number {
    return units.reduce((sum, unit) => {
      return sum + unit.count * (unit.attack + unit.defense + unit.speed) / 3;
    }, 0);
  }

  private getStrategyBonus(strategy: WarStrategy): { attackBonus: number; defenseBonus: number } {
    const bonuses: Record<WarStrategy, { attackBonus: number; defenseBonus: number }> = {
      [WarStrategy.ALL_OUT_ATTACK]: { attackBonus: 0.3, defenseBonus: -0.2 },
      [WarStrategy.DEFENSIVE_FORMATION]: { attackBonus: -0.1, defenseBonus: 0.3 },
      [WarStrategy.GUERRILLA]: { attackBonus: 0.1, defenseBonus: 0.1 },
      [WarStrategy.FLANK_ATTACK]: { attackBonus: 0.2, defenseBonus: 0 },
      [WarStrategy.SIEGE]: { attackBonus: 0, defenseBonus: 0.2 },
      [WarStrategy.COUNTER_ATTACK]: { attackBonus: 0.15, defenseBonus: 0.15 },
    };
    return bonuses[strategy];
  }

  private resolveWar(war: ISectWar): void {
    let winnerId: string;
    let loserId: string;

    if (war.attackerScore > war.defenderScore) {
      war.state = SectWarState.VICTORY;
      winnerId = war.id.split('_')[0];
      loserId = war.enemySectId;
    } else {
      war.state = SectWarState.DEFEAT;
      winnerId = war.enemySectId;
      loserId = war.id.split('_')[0];
    }

    const reward = this.generateWarReward(war);

    eventBus.emit('war:resolved', { war, winnerId, loserId, reward });
    eventBus.emit('faction:conflict', {
      faction: winnerId,
      description: `${winnerId}在战争中战胜了${loserId}！`,
    });
  }

  private generateWarReward(war: ISectWar): IWarReward {
    const baseGold = 1000 + war.attackerScore * 10;
    const baseReputation = 50 + war.attackerScore;

    return {
      gold: baseGold,
      reputation: baseReputation,
      resources: {},
      treasures: [],
      territory: [],
      prisoners: [],
    };
  }

  private getWarBetween(sectId1: string, sectId2: string): ISectWar | undefined {
    for (const war of this.wars.values()) {
      const isBetween =
        (war.id.includes(sectId1) && war.enemySectId === sectId2) ||
        (war.id.includes(sectId2) && war.enemySectId === sectId1);
      if (isBetween && war.state !== SectWarState.VICTORY && war.state !== SectWarState.DEFEAT) {
        return war;
      }
    }
    return undefined;
  }

  private checkForWars(): void {
    eventBus.emit('faction:warCheck');
  }

  deployUnits(deployment: IStrategicDeployment): void {
    this.deployments.set(deployment.id, deployment);
    eventBus.emit('faction:deployment', deployment);
  }

  captureTerritory(war: ISectWar, territory: IForceTerritory): void {
    territory.ownerSectId = war.id.split('_')[0];
    territory.ownerSectName = war.id.split('_')[0];
    war.rewards.territory?.push(territory.id);
    eventBus.emit('faction:territoryCaptured', { war, territory });
  }

  setWarStrategy(warId: string, strategy: WarStrategy): void {
    const war = this.wars.get(warId);
    if (war) {
      war.strategy = strategy;
      eventBus.emit('war:strategyChanged', { warId, strategy });
    }
  }

  getWar(warId: string): ISectWar | undefined {
    return this.wars.get(warId);
  }

  getAllActiveWars(): ISectWar[] {
    return Array.from(this.wars.values()).filter(
      (w) => w.state !== SectWarState.VICTORY && w.state !== SectWarState.DEFEAT
    );
  }

  getWarsBySect(sectId: string): ISectWar[] {
    return Array.from(this.wars.values()).filter(
      (w) => w.id.includes(sectId) || w.enemySectId === sectId
    );
  }

  ceasefire(warId: string): void {
    const war = this.wars.get(warId);
    if (war) {
      war.state = SectWarState.CEASEFIRE;
      eventBus.emit('war:ceasefire', war);
    }
  }

  cancelWar(warId: string): void {
    this.wars.delete(warId);
    eventBus.emit('war:cancelled', warId);
  }
}
