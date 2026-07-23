export interface IPassive {
  id: string;
  name: string;
  description: string;
  effect: {
    type: 'stat_boost' | 'regen' | 'resistance' | 'special';
    target: string;
    value: number;
  };
  source: string;
  isActive: boolean;
}