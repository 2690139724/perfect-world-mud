import { CultivationRealm } from './Player';

export interface IHeartDemonChoice {
  text: string;
  effect: number;
  narrative: string;
  insightBonus?: number;
}

export interface IHeartDemonScene {
  title: string;
  description: string;
  choices: IHeartDemonChoice[];
  minRealm?: CultivationRealm;
  maxRealm?: CultivationRealm;
}

export interface IBreakthroughSession {
  step: 'heart_demon' | 'tribulation' | 'final';
  targetRealm: CultivationRealm;
  targetName: string;
  baseRate: number;
  rateModifier: number;
  heartDemon: IHeartDemonScene;
  tribulation?: {
    totalDamage: number;
    damagePerRound: number;
    rounds: number;
    currentRound: number;
    damageReduction: number;
  };
  materialsUsed: string[];
  materialBonuses: {
    successRateBonus: number;
    damageReduction: number;
    expRetention: number;
    insightBonus: number;
  };
  daoHeartBonus: number;
}

export interface IBreakthroughResult {
  success: boolean;
  newRealm?: CultivationRealm;
  realmName?: string;
  message: string;
  failLevel?: 'minor' | 'medium' | 'major';
}
