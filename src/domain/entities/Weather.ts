import { Season } from './GameTime';

export enum WeatherType {
  SUNNY = '晴朗',
  CLOUDY = '阴天',
  RAIN = '雨天',
  STORM = '暴雨',
  SNOW = '雪天',
  FOG = '雾天',
  THUNDER = '雷暴',
  BLOOD_MOON = '血月',
  SPIRIT_RAIN = '灵雨',
}

export interface IWeather {
  type: WeatherType;
  name: string;
  description: string;
  cultivationBonus: number;
  combatBonus: number;
  spiritBonus: number;
  duration: number;
}

export const WEATHERS: Record<WeatherType, IWeather> = {
  [WeatherType.SUNNY]: {
    type: WeatherType.SUNNY,
    name: '晴朗',
    description: '阳光明媚，万里无云。',
    cultivationBonus: 1.0,
    combatBonus: 1.0,
    spiritBonus: 1.0,
    duration: 120,
  },
  [WeatherType.CLOUDY]: {
    type: WeatherType.CLOUDY,
    name: '阴天',
    description: '天空阴沉，云层厚重。',
    cultivationBonus: 0.9,
    combatBonus: 1.0,
    spiritBonus: 0.95,
    duration: 90,
  },
  [WeatherType.RAIN]: {
    type: WeatherType.RAIN,
    name: '雨天',
    description: '细雨绵绵，空气湿润。',
    cultivationBonus: 1.1,
    combatBonus: 0.95,
    spiritBonus: 1.05,
    duration: 60,
  },
  [WeatherType.STORM]: {
    type: WeatherType.STORM,
    name: '暴雨',
    description: '狂风暴雨，电闪雷鸣。',
    cultivationBonus: 0.8,
    combatBonus: 0.9,
    spiritBonus: 1.2,
    duration: 45,
  },
  [WeatherType.SNOW]: {
    type: WeatherType.SNOW,
    name: '雪天',
    description: '雪花纷飞，天地银白。',
    cultivationBonus: 1.2,
    combatBonus: 0.9,
    spiritBonus: 1.1,
    duration: 90,
  },
  [WeatherType.FOG]: {
    type: WeatherType.FOG,
    name: '雾天',
    description: '浓雾弥漫，能见度极低。',
    cultivationBonus: 0.95,
    combatBonus: 0.85,
    spiritBonus: 1.0,
    duration: 60,
  },
  [WeatherType.THUNDER]: {
    type: WeatherType.THUNDER,
    name: '雷暴',
    description: '雷霆万钧，天地变色。修炼雷霆属性功法事半功倍。',
    cultivationBonus: 1.5,
    combatBonus: 1.2,
    spiritBonus: 1.5,
    duration: 30,
  },
  [WeatherType.BLOOD_MOON]: {
    type: WeatherType.BLOOD_MOON,
    name: '血月',
    description: '血色月亮高悬，凶兽狂暴，战斗难度大增，但修为获取也更多。',
    cultivationBonus: 2.0,
    combatBonus: 1.5,
    spiritBonus: 2.0,
    duration: 15,
  },
  [WeatherType.SPIRIT_RAIN]: {
    type: WeatherType.SPIRIT_RAIN,
    name: '灵雨',
    description: '天降灵雨，蕴含天地灵气，修炼的绝佳时机。',
    cultivationBonus: 3.0,
    combatBonus: 1.0,
    spiritBonus: 2.5,
    duration: 20,
  },
};

export function rollWeather(season: Season): WeatherType {
  const rand = Math.random();
  switch (season) {
    case Season.SPRING:
      if (rand < 0.4) return WeatherType.SUNNY;
      if (rand < 0.6) return WeatherType.CLOUDY;
      if (rand < 0.85) return WeatherType.RAIN;
      if (rand < 0.95) return WeatherType.FOG;
      return WeatherType.SPIRIT_RAIN;
    case Season.SUMMER:
      if (rand < 0.5) return WeatherType.SUNNY;
      if (rand < 0.65) return WeatherType.CLOUDY;
      if (rand < 0.8) return WeatherType.STORM;
      if (rand < 0.9) return WeatherType.THUNDER;
      if (rand < 0.98) return WeatherType.RAIN;
      return WeatherType.SPIRIT_RAIN;
    case Season.AUTUMN:
      if (rand < 0.5) return WeatherType.SUNNY;
      if (rand < 0.7) return WeatherType.CLOUDY;
      if (rand < 0.85) return WeatherType.FOG;
      if (rand < 0.95) return WeatherType.RAIN;
      return WeatherType.SPIRIT_RAIN;
    case Season.WINTER:
      if (rand < 0.4) return WeatherType.SUNNY;
      if (rand < 0.55) return WeatherType.CLOUDY;
      if (rand < 0.9) return WeatherType.SNOW;
      if (rand < 0.98) return WeatherType.FOG;
      return WeatherType.SPIRIT_RAIN;
    default:
      return WeatherType.SUNNY;
  }
}

export function rollSpecialWeather(): WeatherType | null {
  const rand = Math.random();
  if (rand < 0.01) return WeatherType.BLOOD_MOON;
  if (rand < 0.03) return WeatherType.SPIRIT_RAIN;
  return null;
}