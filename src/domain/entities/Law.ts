import { CultivationRealm } from './Player';

export enum LawType {
  TIME = '时间法则',
  SPACE = '空间法则',
  DESTRUCTION = '毁灭法则',
  LIFE = '生命法则',
  REINCARNATION = '轮回法则',
  DESTINY = '命运法则',
  FIVE_ELEMENTS = '五行法则',
  THUNDER = '雷霆法则',
  SWORD = '剑道法则',
  FIRE = '火焰法则',
}

export interface ILawDefinition {
  id: string;
  name: string;
  type: LawType;
  description: string;
  originStory: string;
  requiredRealm: CultivationRealm;
  maxLevel: number;
  effects: {
    attackBonus?: number;
    defenseBonus?: number;
    critBonus?: number;
    specialEffect?: string;
  };
}

export interface ILawProgress {
  lawId: string;
  name: string;
  level: number;
  maxLevel: number;
  progress: number;
  maxProgress: number;
  effects: string[];
  isCompleted: boolean;
}

export const LAW_DEFINITIONS: ILawDefinition[] = [
  {
    id: 'law_time',
    name: '时间法则',
    type: LawType.TIME,
    description: '掌控时间流速，可加速或减速目标。',
    originStory: '时间法则是至高法则之一，传闻上古有大能于岁月长河中悟道，一念之间可令花开花落、沧海桑田。领悟者可操纵时间流速，加速或减速目标。',
    requiredRealm: CultivationRealm.VENERABLE,
    maxLevel: 10,
    effects: { attackBonus: 50, defenseBonus: 30, specialEffect: '攻击时20%概率减速敌人' },
  },
  {
    id: 'law_space',
    name: '空间法则',
    type: LawType.SPACE,
    description: '掌控空间，可瞬移和空间切割。',
    originStory: '空间法则是至高法则之一，上古有修士于虚空裂隙中参悟空间之道，可缩地成寸、瞬移万里。领悟者可操纵空间，瞬移和空间切割皆在掌中。',
    requiredRealm: CultivationRealm.VENERABLE,
    maxLevel: 10,
    effects: { attackBonus: 45, defenseBonus: 35, specialEffect: '可无视距离进行攻击' },
  },
  {
    id: 'law_destruction',
    name: '毁灭法则',
    type: LawType.DESTRUCTION,
    description: '毁灭之力，可摧毁一切。',
    originStory: '毁灭法则是攻击力最强的法则之一，蕴含终焉之力。上古大战中曾有修士以毁灭法则灭世，所过之处化为虚无。领悟者拥有毁灭一切的破坏力。',
    requiredRealm: CultivationRealm.DIVINE_FIRE,
    maxLevel: 10,
    effects: { attackBonus: 80, critBonus: 0.15, specialEffect: '攻击附带毁灭之力，无视30%防御' },
  },
  {
    id: 'law_life',
    name: '生命法则',
    type: LawType.LIFE,
    description: '生命之力，可治愈和恢复。',
    originStory: '生命法则是恢复力最强的法则，蕴含造化生机。传闻远古时代有神木通天，其生命力滋养万物，后有大能于神木之下悟得生命法则，可令枯木逢春、万物复苏。',
    requiredRealm: CultivationRealm.DIVINE_FIRE,
    maxLevel: 10,
    effects: { defenseBonus: 40, specialEffect: '每回合恢复10%气血' },
  },
  {
    id: 'law_reincarnation',
    name: '轮回法则',
    type: LawType.REINCARNATION,
    description: '轮回之力，可操控生死轮回。',
    originStory: '轮回法则是最神秘的法则之一，关乎生死轮回、因果报应。传闻冥府之主曾以轮回法则构建六道轮回，掌控众生生死。领悟者可操控生死轮回。',
    requiredRealm: CultivationRealm.SELF_CUT,
    maxLevel: 10,
    effects: { attackBonus: 60, defenseBonus: 60, specialEffect: '死亡时有30%概率复活' },
  },
  {
    id: 'law_destiny',
    name: '命运法则',
    type: LawType.DESTINY,
    description: '命运之力，可改变因果。',
    originStory: '命运法则是至高无上的法则，掌控因果与命运之线。传闻命运之主曾以一念改写万族命数，逆天改命。领悟者可改变因果，扭转命运。',
    requiredRealm: CultivationRealm.ESCAPE,
    maxLevel: 10,
    effects: { attackBonus: 100, defenseBonus: 50, critBonus: 0.2, specialEffect: '免疫所有负面效果' },
  },
  {
    id: 'law_five_elements',
    name: '五行法则',
    type: LawType.FIVE_ELEMENTS,
    description: '金木水火土五行之力，生生不息。',
    originStory: '五行法则是最基础的法则，金木水火土相生相克、生生不息。上古有修士观天地五行运转，悟得五行相生之道，可操纵五行之力。',
    requiredRealm: CultivationRealm.SPIRIT,
    maxLevel: 10,
    effects: { attackBonus: 30, defenseBonus: 30, specialEffect: '五行相生，全属性提升10%' },
  },
  {
    id: 'law_thunder',
    name: '雷霆法则',
    type: LawType.THUNDER,
    description: '雷霆之力，毁灭与审判。',
    originStory: '雷霆法则是攻击力极强的法则，蕴含天罚之威。传闻雷帝曾以雷霆法则执掌天劫，一声怒雷可碎裂山河。领悟者可召唤天雷，毁灭与审判并存。',
    requiredRealm: CultivationRealm.ARRAY,
    maxLevel: 10,
    effects: { attackBonus: 50, critBonus: 0.1, specialEffect: '攻击附带雷电效果，有20%概率麻痹敌人' },
  },
  {
    id: 'law_sword',
    name: '剑道法则',
    type: LawType.SWORD,
    description: '剑之极致，一剑破万法。',
    originStory: '剑道法则是剑修追求的至高法则，一剑可破万法。传闻上古剑仙以一柄无名铁剑斩断天柱，开创剑道先河。领悟者一剑出，万法灭。',
    requiredRealm: CultivationRealm.ARRAY,
    maxLevel: 10,
    effects: { attackBonus: 60, critBonus: 0.2, specialEffect: '暴击伤害提升50%' },
  },
  {
    id: 'law_fire',
    name: '火焰法则',
    type: LawType.FIRE,
    description: '火焰之力，焚烧万物。',
    originStory: '火焰法则是火系修士追求的法则，蕴含焚天煮海之威。传闻远古时代有祝融氏以自身为薪燃起天火，悟得火焰法则，可操纵天地间的一切火焰。',
    requiredRealm: CultivationRealm.SPIRIT,
    maxLevel: 10,
    effects: { attackBonus: 40, specialEffect: '攻击附带灼烧效果，持续3回合' },
  },
];

export function findLawDefinition(id: string): ILawDefinition | undefined {
  return LAW_DEFINITIONS.find(l => l.id === id);
}

export function createLawProgress(lawId: string): ILawProgress {
  const def = findLawDefinition(lawId);
  if (!def) {
    return {
      lawId,
      name: '未知法则',
      level: 0,
      maxLevel: 1,
      progress: 0,
      maxProgress: 100,
      effects: [],
      isCompleted: false,
    };
  }
  return {
    lawId: def.id,
    name: def.name,
    level: 0,
    maxLevel: def.maxLevel,
    progress: 0,
    maxProgress: 100,
    effects: [def.description],
    isCompleted: false,
  };
}

export function applyLawEffects(laws: ILawProgress[]): {
  attackBonus: number;
  defenseBonus: number;
  critBonus: number;
  specialEffects: string[];
} {
  let attackBonus = 0;
  let defenseBonus = 0;
  let critBonus = 0;
  const specialEffects: string[] = [];
  for (const law of laws) {
    const def = findLawDefinition(law.lawId);
    if (!def) continue;
    const levelMultiplier = law.level / def.maxLevel;
    attackBonus += (def.effects.attackBonus || 0) * levelMultiplier;
    defenseBonus += (def.effects.defenseBonus || 0) * levelMultiplier;
    critBonus += (def.effects.critBonus || 0) * levelMultiplier;
    if (law.level > 0 && def.effects.specialEffect) {
      specialEffects.push(def.effects.specialEffect);
    }
  }
  return { attackBonus, defenseBonus, critBonus, specialEffects };
}