import { IGameTime, TimeOfDay, Season, getTimeOfDay, getSeason, formatTime, isNight } from '../entities/GameTime';
import { eventBus } from '../../infrastructure/event/EventBus';
import { NPCLifeService } from './NPCLifeService';
let npcLifeServiceInstance: NPCLifeService | null = null;
function getNPCLifeService(): NPCLifeService {
  if (!npcLifeServiceInstance) {
    npcLifeServiceInstance = new NPCLifeService();
  }
  return npcLifeServiceInstance;
}

export enum Weather {
  CLEAR = 'clear',
  CLOUDY = 'cloudy',
  RAIN = 'rain',
  STORM = 'storm',
  FOG = 'fog',
  SNOW = 'snow',
}

export interface ITimeEvent {
  id: string;
  timeOfDay: TimeOfDay;
  dayOfMonth?: number;
  season?: Season;
  description: string;
  effect?: () => void;
}

export class GameTimeService {
  private static instance: GameTimeService;
  private time: IGameTime;
  private tickRate: number = 1000;
  private tickInterval: number | null = null;
  private paused: boolean = false;
  private weather: Weather = Weather.CLEAR;
  private weatherDuration: number = 0;

  private constructor() {
    this.time = {
      ticks: 0,
      day: 1,
      hour: 8,
      minute: 0,
      season: Season.SPRING,
      timeOfDay: TimeOfDay.MORNING,
    };
  }

  static getInstance(): GameTimeService {
    if (!GameTimeService.instance) {
      GameTimeService.instance = new GameTimeService();
    }
    return GameTimeService.instance;
  }

  start(): void {
    if (this.tickInterval) return;
    this.tickInterval = window.setInterval(() => this.tick(), this.tickRate);
  }

  stop(): void {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    this.paused = false;
  }

  isPaused(): boolean {
    return this.paused;
  }

  setTickRate(ms: number): void {
    this.tickRate = ms;
    if (this.tickInterval) {
      this.stop();
      this.start();
    }
  }

  getTickRate(): number {
    return this.tickRate;
  }

  private tick(): void {
    if (this.paused) return;

    this.time.ticks++;
    this.time.minute += 5;

    if (this.time.minute >= 60) {
      this.time.minute = 0;
      this.time.hour++;

      if (this.time.hour >= 24) {
        this.time.hour = 0;
        this.time.day++;

        this.updateSeason();
        this.updateWeather();
      }

      this.updateTimeOfDay();
      this.onHourChanged();
    }
  }

  private updateTimeOfDay(): void {
    const newTimeOfDay = getTimeOfDay(this.time.hour);
    if (newTimeOfDay !== this.time.timeOfDay) {
      const oldTimeOfDay = this.time.timeOfDay;
      this.time.timeOfDay = newTimeOfDay;
      this.onTimeOfDayChanged(oldTimeOfDay, newTimeOfDay);
    }
  }

  private updateSeason(): void {
    const newSeason = getSeason(this.time.day);
    if (newSeason !== this.time.season) {
      this.time.season = newSeason;
      eventBus.emit('gameTime:seasonChanged', { season: newSeason, day: this.time.day });
    }
  }

  private updateWeather(): void {
    if (this.weatherDuration > 0) {
      this.weatherDuration--;
      return;
    }

    const season = this.time.season;
    const weights: Record<Season, { [key: string]: number }> = {
      [Season.SPRING]: { clear: 40, cloudy: 30, rain: 25, fog: 5 },
      [Season.SUMMER]: { clear: 50, cloudy: 20, rain: 20, storm: 10 },
      [Season.AUTUMN]: { clear: 35, cloudy: 30, rain: 25, fog: 10 },
      [Season.WINTER]: { clear: 30, cloudy: 25, snow: 35, fog: 10 },
    };

    const seasonWeights = weights[season];
    const totalWeight = Object.values(seasonWeights).reduce((sum, w) => sum + w, 0);
    let random = Math.random() * totalWeight;

    for (const [weather, weight] of Object.entries(seasonWeights)) {
      random -= weight;
      if (random <= 0) {
        this.weather = weather as Weather;
        this.weatherDuration = Math.floor(Math.random() * 3) + 1;
        eventBus.emit('gameTime:weatherChanged', { weather: this.weather, duration: this.weatherDuration });
        break;
      }
    }
  }

  private onHourChanged(): void {
    eventBus.emit('gameTime:hourChanged', { ...this.time });

    getNPCLifeService().onHourChanged(this.time);
  }

  private onTimeOfDayChanged(oldTimeOfDay: TimeOfDay, newTimeOfDay: TimeOfDay): void {
    eventBus.emit('gameTime:timeOfDayChanged', { old: oldTimeOfDay, new: newTimeOfDay });

    if (isNight({ ...this.time, timeOfDay: newTimeOfDay })) {
      eventBus.emit('gameTime:nightStarted', { ...this.time });
    } else {
      eventBus.emit('gameTime:dayStarted', { ...this.time });
    }
  }

  getTime(): IGameTime {
    return { ...this.time };
  }

  getFormattedTime(): string {
    return formatTime(this.time);
  }

  getWeather(): Weather {
    return this.weather;
  }

  getWeatherName(): string {
    const names: Record<Weather, string> = {
      [Weather.CLEAR]: '晴朗',
      [Weather.CLOUDY]: '多云',
      [Weather.RAIN]: '下雨',
      [Weather.STORM]: '暴雨',
      [Weather.FOG]: '大雾',
      [Weather.SNOW]: '下雪',
    };
    return names[this.weather];
  }

  isNight(): boolean {
    return isNight(this.time);
  }

  advanceTime(hours: number): void {
    for (let i = 0; i < hours; i++) {
      this.time.hour++;
      if (this.time.hour >= 24) {
        this.time.hour = 0;
        this.time.day++;
        this.updateSeason();
      }
      this.updateTimeOfDay();
    }
    this.onHourChanged();
  }

  setTime(hour: number, minute: number, day: number): void {
    this.time.hour = hour;
    this.time.minute = minute;
    this.time.day = day;
    this.time.timeOfDay = getTimeOfDay(hour);
    this.time.season = getSeason(day);
    eventBus.emit('gameTime:timeChanged', { ...this.time });
  }

  getDayProgress(): number {
    return ((this.time.hour * 60 + this.time.minute) / (24 * 60)) * 100;
  }

  getSeasonProgress(): number {
    const seasonDay = this.time.day % 91;
    return (seasonDay / 91) * 100;
  }
}
