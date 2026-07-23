import { INPC, INPCDialogue } from '../entities/NPC';
import {
  NPCActivityType,
  NPCMood,
  INPCDailyRoutine,
  INPCLifeState,
  INPCScheduleEntry,
  ACTIVITY_NAMES,
  MOOD_NAMES,
  WeatherType,
  WEATHER_EFFECTS,
  SEASON_EFFECTS,
} from '../entities/NPCLifeLogic';
import { IGameTime, getTimeOfDay, isNight, Season } from '../entities/GameTime';
import { IPlayer } from '../entities/Player';
import { eventBus } from '../../infrastructure/event/EventBus';

export class NPCLifeService {
  private npcStates: Map<string, INPCLifeState> = new Map();

  constructor() {}

  initializeNPCState(npc: INPC): void {
    if (this.npcStates.has(npc.id)) return;
    this.npcStates.set(npc.id, {
      currentActivity: NPCActivityType.RESTING,
      currentLocation: npc.roomId,
      mood: NPCMood.NEUTRAL,
      fatigue: 0,
      hunger: 0,
      activityProgress: 0,
      lastActivityChange: 0,
    });
  }

  updateNPCState(npc: INPC, gameTime: IGameTime, weather?: WeatherType): INPCLifeState | null {
    if (!npc.lifeLogic) return null;

    const state = this.npcStates.get(npc.id);
    if (!state) {
      this.initializeNPCState(npc);
      return this.npcStates.get(npc.id)!;
    }

    const currentHour = gameTime.hour;
    const schedule = npc.lifeLogic.schedule;
    let activeSchedule = this.findActiveSchedule(schedule, currentHour);

    // 应用天气影响：可能调整活动
    if (weather) {
      activeSchedule = this.applyWeatherToSchedule(activeSchedule, weather, state);
    }

    // 应用季节影响：可能调整活动
    activeSchedule = this.applySeasonToSchedule(activeSchedule, gameTime.season, state);

    if (activeSchedule && activeSchedule.activity !== state.currentActivity) {
      state.currentActivity = activeSchedule.activity;
      state.currentLocation = activeSchedule.location || npc.roomId;
      state.lastActivityChange = gameTime.ticks;
      state.activityProgress = 0;
    }

    state.activityProgress += 1;

    this.updateMood(npc, state, gameTime, weather);
    this.updateFatigue(state, gameTime);
    this.updateHunger(state, gameTime);

    return state;
  }

  private applyWeatherToSchedule(
    schedule: INPCScheduleEntry | undefined,
    weather: WeatherType,
    state: INPCLifeState
  ): INPCScheduleEntry | undefined {
    if (!schedule) return schedule;

    const weatherEffect = WEATHER_EFFECTS[weather];
    if (!weatherEffect) return schedule;

    // 检查是否有强烈的天气影响需要调整活动
    const activityModifiers = weatherEffect.activityModifiers;
    const modifier = activityModifiers.find((am) => am.activity === schedule.activity);

    // 如果当前活动受天气强烈负面影响，有一定概率切换到备选活动
    if (modifier && modifier.modifier < -0.3) {
      // 找一个受天气正面影响的活动作为备选
      const alternativeActivity = activityModifiers.find((am) => am.modifier > 0.1);
      if (alternativeActivity && Math.random() < 0.3) {
        return {
          ...schedule,
          activity: alternativeActivity.activity,
          description: `因${weatherEffect.description}改为${ACTIVITY_NAMES[alternativeActivity.activity]}`,
          greeting: `天气不好，改做别的了。`,
        };
      }
    }

    return schedule;
  }

  private applySeasonToSchedule(
    schedule: INPCScheduleEntry | undefined,
    season: Season,
    state: INPCLifeState
  ): INPCScheduleEntry | undefined {
    if (!schedule) return schedule;

    // 获取季节效果
    const seasonKey = season === Season.SPRING ? '春' :
                      season === Season.SUMMER ? '夏' :
                      season === Season.AUTUMN ? '秋' : '冬';
    const seasonEffect = SEASON_EFFECTS[seasonKey];
    if (!seasonEffect) return schedule;

    // 季节偏好的活动有一定概率被选择
    if (seasonEffect.preferredActivities.length > 0 && Math.random() < 0.15) {
      const preferredActivity = seasonEffect.preferredActivities[Math.floor(Math.random() * seasonEffect.preferredActivities.length)];
      if (preferredActivity !== schedule.activity) {
        return {
          ...schedule,
          activity: preferredActivity,
          description: `${seasonEffect.description}，${ACTIVITY_NAMES[preferredActivity]}`,
          greeting: `这个季节适合${ACTIVITY_NAMES[preferredActivity]}。`,
        };
      }
    }

    return schedule;
  }

  private findActiveSchedule(schedule: INPCScheduleEntry[], hour: number): INPCScheduleEntry | undefined {
    return schedule.find((entry) => {
      if (entry.startHour < entry.endHour) {
        return hour >= entry.startHour && hour < entry.endHour;
      } else {
        return hour >= entry.startHour || hour < entry.endHour;
      }
    });
  }

  private updateMood(npc: INPC, state: INPCLifeState, gameTime: IGameTime, weather?: WeatherType): void {
    if (!npc.lifeLogic) return;

    const moodChange = npc.lifeLogic.moodChanges.find(
      (mc: { activity: NPCActivityType; mood: NPCMood; reason: string }) => mc.activity === state.currentActivity
    );
    if (moodChange) {
      state.mood = moodChange.mood;
    } else {
      // 默认情绪逻辑
      if (state.currentActivity === NPCActivityType.SLEEPING) {
        state.mood = state.fatigue > 50 ? NPCMood.TIRED : NPCMood.NEUTRAL;
      } else if (state.currentActivity === NPCActivityType.CULTIVATING) {
        state.mood = state.fatigue > 60 ? NPCMood.TIRED : NPCMood.EXCITED;
      } else if (state.currentActivity === NPCActivityType.WORKING) {
        state.mood = state.fatigue > 70 ? NPCMood.TIRED : NPCMood.NEUTRAL;
      } else if (state.currentActivity === NPCActivityType.SOCIALIZING) {
        state.mood = NPCMood.HAPPY;
      } else if (state.currentActivity === NPCActivityType.EATING) {
        state.mood = state.hunger > 50 ? NPCMood.HAPPY : NPCMood.NEUTRAL;
      } else if (state.currentActivity === NPCActivityType.GUARDING) {
        state.mood = isNight(gameTime) ? NPCMood.WORRIED : NPCMood.NEUTRAL;
      }
    }

    // 应用天气情绪影响
    if (weather) {
      const weatherEffect = WEATHER_EFFECTS[weather];
      if (weatherEffect && weatherEffect.moodModifiers.length > 0) {
        // 随机选择一个天气相关的情绪影响
        const moodMod = weatherEffect.moodModifiers[Math.floor(Math.random() * weatherEffect.moodModifiers.length)];
        if (Math.random() < moodMod.modifier) {
          state.mood = moodMod.mood;
        }
      }
    }

    // 应用季节情绪影响
    const seasonKey = gameTime.season === Season.SPRING ? '春' :
                      gameTime.season === Season.SUMMER ? '夏' :
                      gameTime.season === Season.AUTUMN ? '秋' : '冬';
    const seasonEffect = SEASON_EFFECTS[seasonKey];
    if (seasonEffect && seasonEffect.moodModifiers.length > 0) {
      const moodMod = seasonEffect.moodModifiers[Math.floor(Math.random() * seasonEffect.moodModifiers.length)];
      if (Math.random() < moodMod.modifier * 0.3) {  // 季节影响较弱
        state.mood = moodMod.mood;
      }
    }
  }

  private updateFatigue(state: INPCLifeState, gameTime: IGameTime): void {
    if (state.currentActivity === NPCActivityType.SLEEPING) {
      state.fatigue = Math.max(0, state.fatigue - 15);
    } else if (state.currentActivity === NPCActivityType.RESTING) {
      state.fatigue = Math.max(0, state.fatigue - 5);
    } else if (state.currentActivity === NPCActivityType.CULTIVATING) {
      state.fatigue = Math.min(100, state.fatigue + 3);
    } else if (state.currentActivity === NPCActivityType.WORKING) {
      state.fatigue = Math.min(100, state.fatigue + 2);
    } else if (state.currentActivity === NPCActivityType.PATROLLING) {
      state.fatigue = Math.min(100, state.fatigue + 4);
    } else {
      state.fatigue = Math.min(100, state.fatigue + 1);
    }
  }

  private updateHunger(state: INPCLifeState, gameTime: IGameTime): void {
    if (state.currentActivity === NPCActivityType.EATING) {
      state.hunger = Math.max(0, state.hunger - 30);
    } else {
      state.hunger = Math.min(100, state.hunger + 2);
    }
  }

  getNPCState(npcId: string): INPCLifeState | undefined {
    return this.npcStates.get(npcId);
  }

  getNPCActivityDescription(npc: INPC, gameTime: IGameTime, weather?: WeatherType): string {
    const state = this.updateNPCState(npc, gameTime, weather);
    if (!state) return npc.description;

    const schedule = npc.lifeLogic?.schedule;
    const currentHour = gameTime.hour;
    let activeSchedule = schedule ? this.findActiveSchedule(schedule, currentHour) : null;

    // 应用天气和季节影响
    if (weather && activeSchedule) {
      activeSchedule = this.applyWeatherToSchedule(activeSchedule, weather, state);
    }
    if (activeSchedule) {
      activeSchedule = this.applySeasonToSchedule(activeSchedule, gameTime.season, state);
    }

    const activityName = ACTIVITY_NAMES[state.currentActivity];
    const moodName = MOOD_NAMES[state.mood];
    const moodIcon = this.getMoodIcon(state.mood);

    let description = `${npc.description} `;
    description += `【${activityName}】`;
    description += ` ${moodIcon} ${moodName}`;

    if (activeSchedule) {
      description += ` — ${activeSchedule.description}`;
    }

    if (state.fatigue > 70) {
      description += '（显得很疲惫）';
    }
    if (state.hunger > 70) {
      description += '（看起来很饿）';
    }

    // 添加天气描述
    if (weather) {
      const weatherEffect = WEATHER_EFFECTS[weather];
      if (weatherEffect) {
        description += ` (${weatherEffect.description})`;
      }
    }

    return description;
  }

  getNPCGreeting(npc: INPC, gameTime: IGameTime, weather?: WeatherType): string {
    const state = this.updateNPCState(npc, gameTime, weather);
    if (!state || !npc.lifeLogic) return npc.greeting;

    const schedule = npc.lifeLogic.schedule;
    const currentHour = gameTime.hour;
    let activeSchedule = schedule ? this.findActiveSchedule(schedule, currentHour) : null;

    // 应用天气和季节影响
    if (weather && activeSchedule) {
      activeSchedule = this.applyWeatherToSchedule(activeSchedule, weather, state);
    }
    if (activeSchedule) {
      activeSchedule = this.applySeasonToSchedule(activeSchedule, gameTime.season, state);
    }

    if (activeSchedule) {
      return activeSchedule.greeting;
    }

    return npc.greeting;
  }

  getNPCMoodIcon(npcId: string): string {
    const state = this.npcStates.get(npcId);
    if (!state) return '';
    return this.getMoodIcon(state.mood);
  }

  private getMoodIcon(mood: NPCMood): string {
    switch (mood) {
      case NPCMood.HAPPY: return '😊';
      case NPCMood.NEUTRAL: return '😐';
      case NPCMood.TIRED: return '😫';
      case NPCMood.ANGRY: return '😠';
      case NPCMood.SAD: return '😢';
      case NPCMood.EXCITED: return '🤩';
      case NPCMood.BORED: return '😴';
      case NPCMood.WORRIED: return '😰';
      case NPCMood.PEACEFUL: return '😌';
      case NPCMood.CURIOUS: return '🤔';
      case NPCMood.PROUD: return '😏';
      case NPCMood.SHY: return '😳';
      case NPCMood.GRATEFUL: return '🙏';
      case NPCMood.JEALOUS: return '😤';
      case NPCMood.AMUSED: return '😄';
      case NPCMood.FRUSTRATED: return '😒';
      case NPCMood.RELIEVED: return '😮';
      case NPCMood.NOSTALGIC: return '🥺';
      case NPCMood.DETERMINED: return '💪';
      case NPCMood.SERENE: return '🧘';
      case NPCMood.ANXIOUS: return '😬';
      case NPCMood.HOPEFUL: return '🤞';
      case NPCMood.DISAPPOINTED: return '😞';
      case NPCMood.SATISFIED: return '😌';
      case NPCMood.HUNGRY: return '🤤';
      case NPCMood.THIRSTY: return '🥵';
      case NPCMood.COLD: return '🥶';
      case NPCMood.HOT: return '🥵';
      case NPCMood.ENERGETIC: return '⚡';
      case NPCMood.MELANCHOLY: return '🥀';
      // 修仙类情绪图标
      case NPCMood.DEFIANT: return '😤';
      case NPCMood.PRIDEFUL: return '😏';
      case NPCMood.BLOODTHIRSTY: return '🩸';
      case NPCMood.NOBLE: return '👑';
      case NPCMood.RUTHLESS: return '💀';
      case NPCMood.TRANSCENDENT: return '✨';
      case NPCMood.MYSTERIOUS: return '🔮';
      case NPCMood.MAJESTIC: return '⚖️';
      case NPCMood.DIVINE: return '😇';
      case NPCMood.EVOLVING: return '🦋';
      case NPCMood.REINCARNATED: return '🔄';
      case NPCMood.ANCIENT: return '🏛️';
      case NPCMood.DARKENED: return '🌑';
      case NPCMood.FIERY: return '🔥';
      case NPCMood.RESOLUTE: return '💎';
      case NPCMood.ARROGANT: return '😒';
      case NPCMood.DOMINANT: return '👊';
      case NPCMood.ETERNAL: return '⌛';
      case NPCMood.TRAGIC: return '🎭';
      case NPCMood.UNYIELDING: return '⛓️';
      case NPCMood.COSMIC: return '🌌';
      case NPCMood.CUNNING: return '🐍';
      case NPCMood.CALCULATING: return '🧮';
      case NPCMood.STEALTHY: return '🌑';
      case NPCMood.PERSEVERING: return '🌱';
      case NPCMood.MOONLIT: return '🌙';
      case NPCMood.DAO_SEEKING: return '🔍';
      case NPCMood.OVERWHELMING: return '👑';
      case NPCMood.SOULFUL: return '👻';
      default: return '😐';
    }
  }

  getMoodBasedDialogue(npc: INPC, player: IPlayer): INPCDialogue[] {
    const state = this.npcStates.get(npc.id);
    if (!state) return npc.dialogues;

    const filtered = npc.dialogues.filter((d: INPCDialogue) => {
      if (!d.condition) return true;
      return d.condition(player);
    });

    const moodModifiers: Record<NPCMood, number> = {
      [NPCMood.HAPPY]: 1,
      [NPCMood.NEUTRAL]: 0,
      [NPCMood.TIRED]: -1,
      [NPCMood.ANGRY]: -2,
      [NPCMood.SAD]: -1,
      [NPCMood.EXCITED]: 1,
      [NPCMood.BORED]: 0,
      [NPCMood.WORRIED]: -1,
      [NPCMood.PEACEFUL]: 1,
      [NPCMood.CURIOUS]: 0,
      [NPCMood.PROUD]: 0,
      [NPCMood.SHY]: -1,
      [NPCMood.GRATEFUL]: 1,
      [NPCMood.JEALOUS]: -1,
      [NPCMood.AMUSED]: 1,
      [NPCMood.FRUSTRATED]: -1,
      [NPCMood.RELIEVED]: 1,
      [NPCMood.NOSTALGIC]: 0,
      [NPCMood.DETERMINED]: 1,
      [NPCMood.SERENE]: 1,
      [NPCMood.ANXIOUS]: -1,
      [NPCMood.HOPEFUL]: 1,
      [NPCMood.DISAPPOINTED]: -1,
      [NPCMood.SATISFIED]: 1,
      [NPCMood.HUNGRY]: -1,
      [NPCMood.THIRSTY]: -1,
      [NPCMood.COLD]: -1,
      [NPCMood.HOT]: -1,
      [NPCMood.ENERGETIC]: 1,
      [NPCMood.MELANCHOLY]: -1,
      // 修仙类情绪权重
      [NPCMood.DEFIANT]: 0,
      [NPCMood.PRIDEFUL]: 0,
      [NPCMood.BLOODTHIRSTY]: -2,
      [NPCMood.NOBLE]: 1,
      [NPCMood.RUTHLESS]: -2,
      [NPCMood.TRANSCENDENT]: 1,
      [NPCMood.MYSTERIOUS]: 0,
      [NPCMood.MAJESTIC]: 1,
      [NPCMood.DIVINE]: 1,
      [NPCMood.EVOLVING]: 1,
      [NPCMood.REINCARNATED]: 0,
      [NPCMood.ANCIENT]: 0,
      [NPCMood.DARKENED]: -2,
      [NPCMood.FIERY]: 1,
      [NPCMood.RESOLUTE]: 1,
      [NPCMood.ARROGANT]: 0,
      [NPCMood.DOMINANT]: 1,
      [NPCMood.ETERNAL]: 0,
      [NPCMood.TRAGIC]: -1,
      [NPCMood.UNYIELDING]: 1,
      [NPCMood.COSMIC]: 0,
      [NPCMood.CUNNING]: -1,
      [NPCMood.CALCULATING]: -1,
      [NPCMood.STEALTHY]: -1,
      [NPCMood.PERSEVERING]: 1,
      [NPCMood.MOONLIT]: 1,
      [NPCMood.DAO_SEEKING]: 1,
      [NPCMood.OVERWHELMING]: 1,
      [NPCMood.SOULFUL]: 0,
    };

    return filtered;
  }

  resetAllStates(): void {
    this.npcStates.clear();
  }

  getAllStates(): Map<string, INPCLifeState> {
    return this.npcStates;
  }

  private npcReferences: INPC[] = [];

  registerNPC(npc: INPC): void {
    if (!this.npcReferences.find((n) => n.id === npc.id)) {
      this.npcReferences.push(npc);
      this.initializeNPCState(npc);
    }
  }

  onHourChanged(gameTime: IGameTime): void {
    for (const npc of this.npcReferences) {
      const state = this.updateNPCState(npc, gameTime);
      if (state) {
        eventBus.emit('npc:activityChanged', {
          npcId: npc.id,
          npcName: npc.name,
          activity: state.currentActivity,
          location: state.currentLocation,
          mood: state.mood,
          time: gameTime,
        });
      }
    }
  }
}
