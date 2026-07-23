export enum TimeOfDay {
  DAWN = '黎明',
  MORNING = '上午',
  NOON = '正午',
  AFTERNOON = '下午',
  DUSK = '黄昏',
  NIGHT = '夜晚',
  MIDNIGHT = '午夜',
}

export enum Season {
  SPRING = '春',
  SUMMER = '夏',
  AUTUMN = '秋',
  WINTER = '冬',
}

export interface IGameTime {
  ticks: number;
  day: number;
  hour: number;
  minute: number;
  season: Season;
  timeOfDay: TimeOfDay;
}

export const TIME_OF_DAY_NAMES: Record<TimeOfDay, string> = {
  [TimeOfDay.DAWN]: '黎明',
  [TimeOfDay.MORNING]: '上午',
  [TimeOfDay.NOON]: '正午',
  [TimeOfDay.AFTERNOON]: '下午',
  [TimeOfDay.DUSK]: '黄昏',
  [TimeOfDay.NIGHT]: '夜晚',
  [TimeOfDay.MIDNIGHT]: '午夜',
};

export const SEASON_NAMES: Record<Season, string> = {
  [Season.SPRING]: '春',
  [Season.SUMMER]: '夏',
  [Season.AUTUMN]: '秋',
  [Season.WINTER]: '冬',
};

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 7) return TimeOfDay.DAWN;
  if (hour >= 7 && hour < 11) return TimeOfDay.MORNING;
  if (hour >= 11 && hour < 13) return TimeOfDay.NOON;
  if (hour >= 13 && hour < 17) return TimeOfDay.AFTERNOON;
  if (hour >= 17 && hour < 19) return TimeOfDay.DUSK;
  if (hour >= 19 && hour < 23) return TimeOfDay.NIGHT;
  return TimeOfDay.MIDNIGHT;
}

export function getSeason(day: number): Season {
  const seasonDay = day % 365;
  if (seasonDay < 91) return Season.SPRING;
  if (seasonDay < 182) return Season.SUMMER;
  if (seasonDay < 273) return Season.AUTUMN;
  return Season.WINTER;
}

export function formatTime(time: IGameTime): string {
  const seasonName = SEASON_NAMES[time.season];
  const timeOfDayName = TIME_OF_DAY_NAMES[time.timeOfDay];
  return `${seasonName}季·第${time.day}天·${timeOfDayName}`;
}

export function isNight(time: IGameTime): boolean {
  return time.timeOfDay === TimeOfDay.NIGHT || time.timeOfDay === TimeOfDay.MIDNIGHT;
}