export interface IQuestStage {
  id: string;
  name: string;
  description: string;
  giverNpcId: string;
  receiverNpcId?: string;
  objectives: IQuestObjective[];
  rewards?: IQuestReward[];
  nextStageId?: string;
  isCompleted: boolean;
}

export interface IQuest {
  id: string;
  name: string;
  description: string;
  stages: IQuestStage[];
  currentStageId: string;
  rewards: IQuestReward[];
  prerequisites: string[];
  isActive: boolean;
  isCompleted: boolean;
  isRepeatable: boolean;
  category: 'side' | 'daily' | 'companion' | 'epic';
  minRealm?: number;
  maxRealm?: number;
  zoneId?: string;
}

export interface IQuestObjective {
  type: 'kill' | 'collect' | 'reach' | 'talk' | 'cultivate' | 'intimacy' | 'explore' | 'deliver' | 'craft' | 'gather';
  targetId: string;
  current: number;
  required: number;
  description: string;
}

export interface IQuestReward {
  type: 'exp' | 'item' | 'technique' | 'realm' | 'reputation' | 'cave' | 'gold' | 'title';
  id?: string;
  amount: number;
}