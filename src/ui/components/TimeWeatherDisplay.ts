import { GameTimeService, Weather } from '../../domain/services/GameTimeService';
import { IGameTime, TimeOfDay, Season, TIME_OF_DAY_NAMES, SEASON_NAMES } from '../../domain/entities/GameTime';
import { eventBus } from '../../infrastructure/event/EventBus';

export class TimeWeatherDisplay {
  private container: HTMLElement;
  private timeService: GameTimeService;
  private timeElement!: HTMLElement;
  private seasonElement!: HTMLElement;
  private weatherElement!: HTMLElement;
  private progressBar!: HTMLElement;
  private progressFill!: HTMLElement;
  private readonly boundUpdateDisplay = () => this.updateDisplay();

  constructor(parent: HTMLElement) {
    this.timeService = GameTimeService.getInstance();
    this.container = this.createContainer();
    parent.appendChild(this.container);

    this.setupEventListeners();
    this.updateDisplay();
  }

  private createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'time-weather-display';
    container.innerHTML = `
      <div class="time-main">
        <div class="time-value" id="game-time-value"></div>
        <div class="time-period" id="game-time-period"></div>
      </div>
      <div class="time-info">
        <div class="season-badge" id="game-season"></div>
        <div class="weather-badge" id="game-weather"></div>
      </div>
      <div class="time-progress">
        <div class="progress-bar">
          <div class="progress-fill" id="day-progress"></div>
        </div>
        <div class="progress-label">第 <span id="day-number">1</span> 天</div>
      </div>
    `;

    this.timeElement = container.querySelector('#game-time-value')!;
    this.seasonElement = container.querySelector('#game-season')!;
    this.weatherElement = container.querySelector('#game-weather')!;
    this.progressBar = container.querySelector('.progress-bar')!;
    this.progressFill = container.querySelector('#day-progress')!;

    return container;
  }

  private setupEventListeners(): void {
    eventBus.on('gameTime:hourChanged', this.boundUpdateDisplay);
    eventBus.on('gameTime:timeOfDayChanged', this.boundUpdateDisplay);
    eventBus.on('gameTime:seasonChanged', this.boundUpdateDisplay);
    eventBus.on('gameTime:weatherChanged', this.boundUpdateDisplay);
  }

  private updateDisplay(): void {
    const time = this.timeService.getTime();
    const weather = this.timeService.getWeather();

    this.timeElement.textContent = this.formatHour(time);
    this.timeElement.className = `time-value ${this.getTimeOfDayClass(time.timeOfDay)}`;

    this.seasonElement.textContent = SEASON_NAMES[time.season];
    this.seasonElement.className = `season-badge ${this.getSeasonClass(time.season)}`;

    this.weatherElement.innerHTML = `${this.getWeatherIcon(weather)} ${this.timeService.getWeatherName()}`;
    this.weatherElement.className = `weather-badge ${this.getWeatherClass(weather)}`;

    this.progressFill.style.setProperty('--progress', `${this.timeService.getDayProgress()}%`);
    this.progressFill.className = `progress-fill ${this.getTimeOfDayClass(time.timeOfDay)}`;

    const dayNumber = this.container.querySelector('#day-number');
    if (dayNumber) {
      dayNumber.textContent = String(time.day);
    }
  }

  private formatHour(time: IGameTime): string {
    const hour = String(time.hour).padStart(2, '0');
    const minute = String(time.minute).padStart(2, '0');
    return `${hour}:${minute}`;
  }

  private getTimeOfDayClass(timeOfDay: TimeOfDay): string {
    return `time-${timeOfDay}`;
  }

  private getSeasonClass(season: Season): string {
    return `season-${season}`;
  }

  private getWeatherClass(weather: Weather): string {
    return `weather-${weather}`;
  }

  private getWeatherIcon(weather: Weather): string {
    const icons: Record<Weather, string> = {
      [Weather.CLEAR]: '☀️',
      [Weather.CLOUDY]: '☁️',
      [Weather.RAIN]: '🌧️',
      [Weather.STORM]: '⛈️',
      [Weather.FOG]: '🌫️',
      [Weather.SNOW]: '❄️',
    };
    return icons[weather] ?? '☀️';
  }

  destroy(): void {
    eventBus.off('gameTime:hourChanged', this.boundUpdateDisplay);
    eventBus.off('gameTime:timeOfDayChanged', this.boundUpdateDisplay);
    eventBus.off('gameTime:seasonChanged', this.boundUpdateDisplay);
    eventBus.off('gameTime:weatherChanged', this.boundUpdateDisplay);
    this.container.remove();
  }
}
