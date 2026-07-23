import { IPlayer } from './Player';
import { INPCDailyRoutine } from './NPCLifeLogic';
import { NPCRelationshiptatus } from './NPCRelationship';

export interface INPCDialogue {
  id: string;
  topic: string;
  text: string;
  condition?: (player: IPlayer) => boolean;
  onSelect?: (player: IPlayer) => { messages: string[] };
  favorabilityChange?: number;
  relationshipRequired?: NPCRelationshiptatus;
}

export interface IGreetingVariant {
  status: NPCRelationshiptatus;
  text: string;
}

export interface INPC {
  id: string;
  name: string;
  title: string;
  description: string;
  greeting: string;
  greetingVariants?: IGreetingVariant[];
  dialogues: INPCDialogue[];
  roomId: string;
  questGiver?: string;
  shopId?: string;
  lifeLogic?: INPCDailyRoutine;
  personality?: string[];
  gossipPool?: string[];
}