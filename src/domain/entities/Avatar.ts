export interface IAvatar {
  id: string;
  name: string;
  description: string;
  realm: number;
  stats: {
    attack: number;
    defense: number;
    hp: number;
    mana: number;
    speed: number;
  };
  skills: string[];
  isActive: boolean;
  unlockCondition: string;
}