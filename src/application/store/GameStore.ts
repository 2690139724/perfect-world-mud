import { IPlayer, CultivationRealm, IBattleRule, OriginType } from '../../domain/entities/Player';
import { WorldId } from '../../domain/entities/WorldDefinition';
import { IItem } from '../../domain/entities/Item';
import { ITechnique } from '../../domain/entities/Technique';
import { IBreakthroughSession } from '../../domain/entities/BreakthroughSession';
import { World } from '../../domain/World';
import { EventBus, GameEvents } from '../../infrastructure/event/EventBus';
import { ICave, CaveQuality } from '../../domain/entities/Cave';
import { IGameTime, getTimeOfDay, getSeason, TimeOfDay, Season, TIME_OF_DAY_NAMES, SEASON_NAMES } from '../../domain/entities/GameTime';
import { IAlchemySkill } from '../../domain/entities/Alchemy';
import { CombatEngine } from '../../domain/services/CombatEngine';
import { IMonster } from '../../domain/entities/Monster';

export interface IContextOption {
  label: string;
  action: string;
}

export interface ICombatState {
  engine: CombatEngine | null;
  enemy: IMonster | null;
  awaitingAction: boolean;
  combatLogs: string[];
}

export interface IGameState {
  player: IPlayer;
  world: World;
  currentEnemy: any | null;
  logs: string[];
  isRunning: boolean;
  gameTime: IGameTime;
  companionRepo: any;
  currentView: 'game' | 'inventory' | 'map' | 'codex' | 'status' | 'technique' | 'quest';
  breakthroughSession: IBreakthroughSession | null;
  pendingContext: { type: 'event' | 'npc_dialogue' | 'breakthrough'; options: IContextOption[] } | null;
  currentRoomNPCs: { id: string; title: string; name: string; index: number }[];
  npcConversation: { npcId: string } | null;
  combatState: ICombatState | null;
}

export type GameAction =
  | { type: 'MOVE_SUCCESS'; payload: any }
  | { type: 'TELEPORT_SUCCESS'; payload: any }
  | { type: 'COMBAT_RESULT'; payload: any }
  | { type: 'CULTIVATE_RESULT'; payload: any }
  | { type: 'ENEMY_DEFEATED'; payload: any }
  | { type: 'PLAYER_DEFEATED'; payload: any }
  | { type: 'COMMAND'; payload: string }
  | { type: 'SYSTEM_MESSAGE'; payload: string }
  | { type: 'UPDATE_PLAYER'; payload: Partial<IPlayer> }
  | { type: 'SET_VIEW'; payload: string }
  | { type: 'ADD_LOG'; payload: string }
  | { type: 'LOAD_STATE'; payload: Partial<IGameState> }
  | { type: 'REALM_BREAKTHROUGH'; payload: any }
  | { type: 'SET_BREAKTHROUGH_SESSION'; payload: IBreakthroughSession | null }
  | { type: 'SET_CONTEXT'; payload: IGameState['pendingContext'] }
  | { type: 'SET_NPC_CONVERSATION'; payload: { npcId: string } | null }
  | { type: 'ITEM_GAINED'; payload: IItem }
  | { type: 'TECHNIQUE_LEARNED'; payload: ITechnique }
  | { type: 'NPC_LIST'; payload: { id: string; title: string; name: string; index: number }[] }
  | { type: 'CAVE_OPENED'; payload: ICave }
  | { type: 'CAVE_PLANTED'; payload: { caveId: string; plant: any } }
  | { type: 'CAVE_HARVESTED'; payload: { caveId: string; plantId: string; items: IItem[] } }
  | { type: 'CAVE_PET_ADDED'; payload: { caveId: string; pet: any } }
  | { type: 'TIME_TICK'; payload: number }
  | { type: 'ALCHEMY_RESULT'; payload: { success: boolean; expGain?: number; hpGain?: number; manaGain?: number; inventory?: IItem[] } }
  | { type: 'COMBAT_START'; payload: { engine: CombatEngine; enemy: IMonster } }
  | { type: 'COMBAT_PLAYER_ACTION'; payload: { action: 'attack' | 'defend' | 'flee' | 'technique' | 'rage_skill'; techId?: string; rageSkillId?: string } }
  | { type: 'COMBAT_END'; payload: { won: boolean } }
  | { type: 'COMBAT_LOG'; payload: string };

export class GameStore {
  private state: IGameState;
  private listeners: Set<() => void> = new Set();
  private eventBus: EventBus;

  constructor(initialState: Partial<IGameState>) {
    this.eventBus = new EventBus();
    this.state = {
      player: this.createDefaultPlayer(),
      world: new World(Math.floor(Math.random() * 999999)),
      currentEnemy: null,
      logs: [],
      isRunning: true,
      gameTime: { ticks: 0, day: 1, hour: 8, minute: 0, season: Season.SPRING, timeOfDay: TimeOfDay.MORNING },
      companionRepo: null,
      currentView: 'game',
      breakthroughSession: null,
      pendingContext: null,
      currentRoomNPCs: [],
      npcConversation: null,
      combatState: null,
      ...initialState,
    };
  }

  private createDefaultPlayer(): IPlayer {
    return {
      id: 'player_001',
      name: '无名修士',
      origin: 'commoner',
      currentWorldId: WorldId.PERFECT_WORLD,
      worldTravelRecords: {
        [WorldId.PERFECT_WORLD]: {
          worldId: WorldId.PERFECT_WORLD,
          firstArrivalTime: 0,
          highestRealmLevel: CultivationRealm.MORTAL,
          totalTimeSpent: 0,
          ascended: false,
        },
      },
      realm: CultivationRealm.MORTAL,
      realmStage: 1,
      realmPerfection: false,
      reincarnationCount: 0,
      cultivationExp: 0,
      maxCultivationExp: 30,
      breakthroughInsight: 0,
      pastLifeMemory: 0,
      highestRealmReached: CultivationRealm.MORTAL,
      breakthroughAttempts: 0,
      talentIds: [],
      currentMethodId: undefined,
      methodProficiency: 0,
      methodMaxProficiency: 100,
      methodEnlightenmentCount: 0,
      knownMethodIds: [],
      gold: 0,
      reputation: 0,
      hp: 50,
      maxHp: 50,
      mana: 20,
      maxMana: 20,
      attack: 5,
      defense: 2,
      speed: 5,
      critRate: 0.03,
      caveCount: 0,
      spiritAbsorbRate: 1.0,
      equipment: { weapon: null, armor: null, boots: null, accessory1: null, accessory2: null, artifact: null },
      techniques: [],
      battleStrategy: [
        { id: 'rule1', priority: 1, condition: { type: 'hp_less_than', threshold: 30 }, action: { type: 'defend' } },
        { id: 'rule2', priority: 2, condition: { type: 'always' }, action: { type: 'attack' } }
      ],
      offlineStrategy: {
        movementMode: 'wander',
        activityBias: { combat: 0.5, gathering: 0.3, cultivation: 0.2, explore: 0.4 },
        battleRules: [],
        supplyThreshold: { hpPercent: 30, manaPercent: 20 },
        fleeIfUnbeatable: true,
        useEscapeToken: true,
      },
      inventory: [],
      intimacyMap: new Map(),
      bondSkills: [],
      completedQuests: [],
      activeQuests: [],
      currentRoomId: 'stone_city_gate',
      currentZoneId: 'stone_city',
      passives: [],
      avatars: [],
      laws: [],
      killedMonsters: [],
      discoveredZones: ['stone_city'],
      totalPlayTime: 0,
      totalOfflineTime: 0,
      caves: [],
      mounts: [],
      alchemySkill: { level: 1, exp: 0, maxExp: 100 },
      formationSkill: { level: 1, exp: 0, maxExp: 100 },
      learnedAlchemyRecipes: [],
      learnedFormations: [],
      boneScriptLevel: 0,
      bondedSpiritIds: [],
      dungeonProgress: [],
      currentDungeonState: undefined,
      formations: [],
      achievements: [],
      titles: [],
      meridians: [],
      daoHeart: { level: 0 as any, exp: 0, maxExp: 100, virtues: {}, defects: {} },
      companions: [],
      currentTitleId: undefined,
      hiddenStorylines: [],
      discoveredClues: [],
    };
  }

  getState(): IGameState {
    return this.state;
  }

  getEventBus(): EventBus {
    return this.eventBus;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  dispatch(action: GameAction): void {
    switch (action.type) {
      case 'MOVE_SUCCESS':
        this.state.player.currentRoomId = action.payload.room.id;
        this.state.player.currentZoneId = action.payload.zone?.id || this.state.player.currentZoneId;
        this.addLog(action.payload.message || `你来到了 ${action.payload.room.name}`);
        break;

      case 'TELEPORT_SUCCESS':
        this.state.player.currentRoomId = action.payload.room.id;
        this.addLog(action.payload.message || `你传送到了 ${action.payload.room.name}`);
        break;

      case 'COMBAT_RESULT':
        if (action.payload.logs) {
          for (const log of action.payload.logs) {
            this.addLog(log.text || log);
          }
        }
        break;

      case 'CULTIVATE_RESULT':
        this.state.player.cultivationExp += action.payload.expGain || 0;
        this.addLog(action.payload.message || `修炼获得 ${action.payload.expGain} 修为`);
        break;

      case 'ENEMY_DEFEATED':
        this.state.player.cultivationExp += action.payload.exp || 0;
        this.state.player.killedMonsters.push(action.payload.monsterId || '');
        this.addLog(`击败敌人，获得 ${action.payload.exp || 0} 修为`);
        break;

      case 'PLAYER_DEFEATED':
        this.state.player.hp = 0;
        this.addLog('你被击败了，身陨道消...');
        break;

      case 'SYSTEM_MESSAGE':
        this.addLog(action.payload);
        break;

      case 'NPC_LIST':
        this.state.currentRoomNPCs = action.payload;
        break;

      case 'UPDATE_PLAYER':
        Object.assign(this.state.player, action.payload);
        break;

      case 'SET_VIEW':
        this.state.currentView = action.payload as any;
        break;

      case 'ADD_LOG':
        this.addLog(action.payload);
        break;

      case 'LOAD_STATE':
        Object.assign(this.state, action.payload);
        break;

      case 'REALM_BREAKTHROUGH':
        this.state.player.realm = action.payload.newRealm;
        this.state.player.maxCultivationExp = action.payload.newMaxExp;
        this.state.player.cultivationExp = 0;
        this.addLog(`突破成功！你已晋级为 ${action.payload.realmName}`);
        break;

      case 'SET_BREAKTHROUGH_SESSION':
        this.state.breakthroughSession = action.payload;
        break;

      case 'SET_CONTEXT':
        this.state.pendingContext = action.payload;
        break;

      case 'SET_NPC_CONVERSATION':
        this.state.npcConversation = action.payload;
        break;

      case 'ITEM_GAINED':
        this.state.player.inventory.push(action.payload);
        this.addLog(`获得物品: ${action.payload.name}`);
        break;

      case 'TECHNIQUE_LEARNED':
        this.state.player.techniques.push(action.payload);
        this.addLog(`学会宝术: ${action.payload.name}`);
        break;

      case 'CAVE_OPENED':
        this.state.player.caves.push(action.payload);
        this.state.player.caveCount = this.state.player.caves.length;
        this.addLog(`开辟洞天成功！${action.payload.name}`);
        break;

      case 'CAVE_PLANTED': {
        const cave = this.state.player.caves.find(c => c.id === action.payload.caveId);
        if (cave) {
          cave.plants.push(action.payload.plant);
          this.addLog(`在洞天中种下了 ${action.payload.plant.name}`);
        }
        break;
      }

      case 'CAVE_HARVESTED': {
        const cave = this.state.player.caves.find(c => c.id === action.payload.caveId);
        if (cave) {
          cave.plants = cave.plants.filter(p => p.id !== action.payload.plantId);
          for (const item of action.payload.items) {
            this.state.player.inventory.push(item);
          }
          this.addLog(`收获了 ${action.payload.items.length} 个物品`);
        }
        break;
      }

      case 'CAVE_PET_ADDED': {
        const cave = this.state.player.caves.find(c => c.id === action.payload.caveId);
        if (cave) {
          cave.pets.push(action.payload.pet);
          this.addLog(`获得宠物: ${action.payload.pet.name}`);
        }
        break;
      }

      case 'TIME_TICK': {
        const minutes = action.payload;
        this.state.gameTime.ticks += minutes;
        this.state.gameTime.minute += minutes;
        
        while (this.state.gameTime.minute >= 60) {
          this.state.gameTime.minute -= 60;
          this.state.gameTime.hour++;
        }
        
        while (this.state.gameTime.hour >= 24) {
          this.state.gameTime.hour -= 24;
          this.state.gameTime.day++;
        }
        
        const newTimeOfDay = getTimeOfDay(this.state.gameTime.hour);
        const newSeason = getSeason(this.state.gameTime.day);
        
        if (newTimeOfDay !== this.state.gameTime.timeOfDay) {
          this.state.gameTime.timeOfDay = newTimeOfDay;
          this.addLog(`天色已变，现在是${TIME_OF_DAY_NAMES[newTimeOfDay]}`);
          this.eventBus.trigger(GameEvents.TIME_OF_DAY_CHANGED, { timeOfDay: newTimeOfDay });
        }
        
        if (newSeason !== this.state.gameTime.season) {
          this.state.gameTime.season = newSeason;
          this.addLog(`季节更替，现在是${SEASON_NAMES[newSeason]}季`);
          this.eventBus.trigger(GameEvents.SEASON_CHANGED, { season: newSeason });
        }
        
        this.eventBus.trigger(GameEvents.TIME_TICK, { gameTime: this.state.gameTime });
        break;
      }

      case 'ALCHEMY_RESULT': {
        if (action.payload.success) {
          if (action.payload.expGain) {
            this.state.player.cultivationExp += action.payload.expGain;
          }
          if (action.payload.hpGain) {
            this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + action.payload.hpGain);
          }
          if (action.payload.manaGain) {
            this.state.player.mana = Math.min(this.state.player.maxMana, this.state.player.mana + action.payload.manaGain);
          }
          if (action.payload.inventory) {
            for (const item of action.payload.inventory) {
              this.state.player.inventory.push(item);
            }
          }
        }
        break;
      }

      case 'COMBAT_START':
        this.state.combatState = {
          engine: action.payload.engine,
          enemy: action.payload.enemy,
          awaitingAction: true,
          combatLogs: [],
        };
        this.state.currentEnemy = action.payload.enemy;
        this.addLog(`**${action.payload.enemy.name}** 出现了！`);
        this.addLog(`等级: ${action.payload.enemy.level} ｜ 气血: ${action.payload.enemy.maxHp} ｜ 攻击: ${action.payload.enemy.attack}`);
        break;

      case 'COMBAT_PLAYER_ACTION':
        if (this.state.combatState && this.state.combatState.engine) {
          const logs = this.state.combatState.engine.playerAction(action.payload.action, action.payload.techId, action.payload.rageSkillId);
          for (const log of logs) {
            this.state.combatState!.combatLogs.push(log.text);
            this.addLog(log.text);
          }
          if (this.state.combatState.engine.ended) {
            const won = this.state.combatState.engine.monster.hp <= 0;
            this.dispatch({ type: 'COMBAT_END', payload: { won } });
          } else {
            this.state.combatState.awaitingAction = true;
          }
        }
        break;

      case 'COMBAT_END':
        if (action.payload.won) {
          if (this.state.combatState?.engine) {
            this.state.player.hp = this.state.combatState.engine.player.hp;
            this.state.player.mana = this.state.combatState.engine.player.mana;
          }
        } else {
          this.state.player.hp = 0;
        }
        this.eventBus.trigger(GameEvents.COMBAT_END_DETAILS, { won: action.payload.won });
        this.state.combatState = null;
        this.state.currentEnemy = null;
        break;

      case 'COMBAT_LOG':
        if (this.state.combatState) {
          this.state.combatState.combatLogs.push(action.payload);
        }
        this.addLog(action.payload);
        break;

      case 'COMMAND':
        this.eventBus.trigger(GameEvents.COMMAND, { command: action.payload });
        break;
    }

    this.notify();
  }

  private addLog(text: string): void {
    this.state.logs.push(text);
    if (this.state.logs.length > 1000) {
      this.state.logs.splice(0, this.state.logs.length - 1000);
    }
  }

  private notify(): void {
    for (const listener of this.listeners) {
      try {
        listener();
      } catch (e) {
        console.error('[GameStore] 监听器出错:', e);
      }
    }
  }
}