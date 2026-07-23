import { CultivationRealm } from './Player';
import { IMonster } from './Monster';

export enum DungeonTier {
  NORMAL = '普通',
  ELITE = '精英',
  LEGENDARY = '传说',
  MYTHIC = '神话',
}

export enum DungeonType {
  RUINS = '遗迹',
  TOMB = '古墓',
  BATTLEFIELD = '战场',
  SECRET_REALM = '秘境',
  TRIAL = '试炼',
}

export enum DungeonStageType {
  EXPLORE = 'explore',
  COMBAT = 'combat',
  PUZZLE = 'puzzle',
  TRIAL = 'trial',
  REWARD = 'reward',
}

export interface IDungeonClue {
  id: string;
  name: string;
  description: string;
  foundDesc: string;
}

export interface IDungeonPuzzle {
  id: string;
  name: string;
  description: string;
  requiredClues: string[];
  solvedDesc: string;
}

export interface IDungeonRivalNPC {
  id: string;
  name: string;
  title: string;
  realm: CultivationRealm;
  description: string;
  isDefeated: boolean;
  isFriendly: boolean;
}

export interface IDungeonStage {
  id: string;
  name: string;
  description: string;
  monsters: IMonster[];
  requiredRealm?: CultivationRealm;
  timeLimit?: number;
  rewards: IDungeonReward[];
  isBossStage?: boolean;
  /** 传承试炼描述 */
  inheritanceDesc?: string;
  /** 阶段类型 */
  stageType?: DungeonStageType;
  /** 可探索发现的线索 */
  clues?: IDungeonClue[];
  /** 需要解开的谜题 */
  puzzles?: IDungeonPuzzle[];
  /** 阶段完成所需的探索次数 */
  requiredExploration?: number;
}

export interface IDungeonReward {
  type: 'exp' | 'gold' | 'item' | 'technique' | 'talent' | 'law' | 'inheritance';
  id?: string;
  amount: number;
  name?: string;
}

export interface ICurrentDungeonState {
  dungeonId: string;
  currentStageIndex: number;
  cluesFound: string[];
  monstersDefeated: string[];
  trialUnlocked: boolean;
  trialCompleted: boolean;
  rivalNPCs: IDungeonRivalNPC[];
  tempRewards: IDungeonReward[];
  explorationCount: number;
}

export interface IDungeon {
  id: string;
  name: string;
  type: DungeonType;
  tier: DungeonTier;
  description: string;
  originStory: string;
  entranceRoomId: string;
  requiredRealm: CultivationRealm;
  recommendedRealm: CultivationRealm;
  stages: IDungeonStage[];
  dailyLimit: number;
  cooldownHours: number;
  rewards: IDungeonReward[];
  /** 竞争NPC模板（进入副本时随机生成） */
  rivalNPCTemplates?: Omit<IDungeonRivalNPC, 'isDefeated' | 'isFriendly'>[];
}

export interface IDungeonProgress {
  dungeonId: string;
  completed: boolean;
  currentStage: number;
  completedStages: number[];
  totalAttempts: number;
  successfulAttempts: number;
  bestTime?: number;
  lastCompletedAt?: number;
}

export function findDungeon(id: string): IDungeon | undefined {
  return DUNGEONS.find(d => d.id === id);
}

export function getDungeonsByRealm(realm: CultivationRealm): IDungeon[] {
  return DUNGEONS.filter(d => d.requiredRealm <= realm);
}

/**
 * @deprecated 请使用 DungeonService.getDungeonProgress(player, dungeonId)
 * 此函数保留仅为向后兼容，无法获取真实进度
 */
export function getDungeonProgress(dungeonId: string): IDungeonProgress | undefined {
  return undefined;
}

export const DUNGEONS: IDungeon[] = [
  {
    id: 'dungeon_leidi_ruins',
    name: '雷帝遗迹',
    type: DungeonType.RUINS,
    tier: DungeonTier.LEGENDARY,
    description: '上古雷帝留下的遗迹，蕴含雷帝法的传承。雷光交织，电闪雷鸣。',
    originStory: '雷帝是上古大能，遗留的遗迹中藏有雷帝法传承。石昊曾在此获得雷帝法，实力大增。',
    entranceRoomId: 'room_leidi_ruins_entrance',
    requiredRealm: CultivationRealm.CAVE,
    recommendedRealm: CultivationRealm.SPIRIT,
    rivalNPCTemplates: [
      { id: 'rival_leidi_1', name: '雷霄子', title: '紫电宗真传', realm: CultivationRealm.SPIRIT, description: '紫电宗的天才弟子，身怀雷系灵根，对雷帝传承势在必得。' },
      { id: 'rival_leidi_2', name: '赵无极', title: '散修', realm: CultivationRealm.CAVE, description: '一名经验丰富的散修，眼神阴鸷，似乎在盘算着什么。' },
    ],
    stages: [
      {
        id: 'stage_leidi_1',
        name: '遗迹外围',
        description: '遗迹外围雷光闪烁，断壁残垣间似乎隐藏着什么秘密。',
        monsters: [],
        requiredRealm: CultivationRealm.CAVE,
        stageType: DungeonStageType.EXPLORE,
        requiredExploration: 2,
        clues: [
          { id: 'clue_leidi_stone', name: '雷纹石碑', description: '一块刻满雷纹的石碑', foundDesc: '你在断壁后发现一块刻满雷纹的石碑，上面记载着雷帝封印的开启之法。' },
          { id: 'clue_leidi_jade', name: '残破玉简', description: '一枚残破的玉简', foundDesc: '你在废墟中挖出一枚残破玉简，神识探入其中，得知需承受雷劫洗礼方可进入传承殿堂。' },
        ],
        rewards: [{ type: 'exp', amount: 300 }],
      },
      {
        id: 'stage_leidi_2',
        name: '雷兽守护',
        description: '遗迹深处，一头雷霆凝聚的妖兽挡住了去路。',
        monsters: [],
        requiredRealm: CultivationRealm.CAVE,
        stageType: DungeonStageType.COMBAT,
        rewards: [{ type: 'exp', amount: 500 }, { type: 'gold', amount: 200 }],
      },
      {
        id: 'stage_leidi_3',
        name: '封印之门',
        description: '一扇布满雷纹的巨门横亘在前方，门上封印需要特定线索才能解开。',
        monsters: [],
        requiredRealm: CultivationRealm.CAVE,
        stageType: DungeonStageType.PUZZLE,
        puzzles: [
          { id: 'puzzle_leidi_seal', name: '雷帝封印', description: '需要雷纹石碑和残破玉简中的信息才能解开封印', requiredClues: ['clue_leidi_stone', 'clue_leidi_jade'], solvedDesc: '你将玉简中的雷劫之力注入石碑纹路，巨门上的雷纹逐一亮起，封印缓缓开启，露出通往试炼之地的道路。' },
        ],
        rewards: [{ type: 'exp', amount: 500 }],
      },
      {
        id: 'stage_leidi_4',
        name: '雷劫试炼',
        description: '试炼之地中，九天神雷汇聚，需承受雷劫洗礼方可获得传承资格。',
        monsters: [],
        requiredRealm: CultivationRealm.SPIRIT,
        stageType: DungeonStageType.TRIAL,
        rewards: [{ type: 'exp', amount: 1000 }],
        inheritanceDesc: '雷劫洗礼你的肉身，雷电之力融入经脉，你感受到一丝雷帝法则的波动...',
      },
      {
        id: 'stage_leidi_5',
        name: '雷帝传承',
        description: '传承殿堂中央，雷帝残留意志正在等待有缘人。',
        monsters: [],
        requiredRealm: CultivationRealm.SPIRIT,
        stageType: DungeonStageType.REWARD,
        rewards: [
          { type: 'inheritance', id: 'leidi_fa', amount: 1, name: '雷帝法' },
          { type: 'exp', amount: 2000 },
          { type: 'gold', amount: 1000 },
        ],
        isBossStage: true,
        inheritanceDesc: '传承殿堂中央，一道虚影浮现——那是雷帝的残留意志。"吾之雷法，传于有缘人..."',
      },
    ],
    dailyLimit: 1,
    cooldownHours: 24,
    rewards: [
      { type: 'inheritance', id: 'leidi_fa', amount: 1, name: '雷帝法' },
      { type: 'exp', amount: 3500 },
      { type: 'gold', amount: 1200 },
    ],
  },
  {
    id: 'dungeon_kunpeng_nest',
    name: '鲲鹏巢穴',
    type: DungeonType.SECRET_REALM,
    tier: DungeonTier.MYTHIC,
    description: '十凶之一鲲鹏的巢穴，蕴含鲲鹏宝术的无上传承。',
    originStory: '鲲鹏巢穴是十凶传承之地，石昊在此获得鲲鹏宝术，成为其最强底牌。巢穴中鲲鹏气息弥漫，威压惊人。',
    entranceRoomId: 'room_kunpeng_nest_entrance',
    requiredRealm: CultivationRealm.ARRAY,
    recommendedRealm: CultivationRealm.VENERABLE,
    rivalNPCTemplates: [
      { id: 'rival_kunpeng_1', name: '海神后人', title: '海神宫圣子', realm: CultivationRealm.VENERABLE, description: '来自海神宫的强大圣子，身怀海神传承，对鲲鹏宝术志在必得。' },
      { id: 'rival_kunpeng_2', name: '莫道', title: '截天教弟子', realm: CultivationRealm.ARRAY, description: '截天教的天才弟子，冷静沉稳，目光始终锁定着巢穴深处。' },
      { id: 'rival_kunpeng_3', name: '藤一', title: '尊者传人', realm: CultivationRealm.ARRAY, description: '一位尊者的亲传弟子，实力不容小觑，似乎带着某种秘宝。' },
    ],
    stages: [
      {
        id: 'stage_kunpeng_1',
        name: '巢穴外围',
        description: '鲲鹏巢穴外围海浪滔天，古老的符文在岩壁上若隐若现。',
        monsters: [],
        requiredRealm: CultivationRealm.ARRAY,
        stageType: DungeonStageType.EXPLORE,
        requiredExploration: 3,
        clues: [
          { id: 'clue_kunpeng_rune', name: '太古符文', description: '岩壁上的太古符文', foundDesc: '你在岩壁上发现一组太古符文，记载着鲲鹏化鱼与化鸟之秘。' },
          { id: 'clue_kunpeng_feather', name: '鲲鹏真羽', description: '一根散发威压的真羽', foundDesc: '你在巢穴深处发现一根鲲鹏真羽，羽中蕴含着空间之道的残片。' },
          { id: 'clue_kunpeng_bone', name: '化鲲骨', description: '一具蕴含化鲲之意的遗骨', foundDesc: '你在海底发现一具古老遗骨，骨中残留着化鲲的意志。' },
        ],
        rewards: [{ type: 'exp', amount: 1500 }],
      },
      {
        id: 'stage_kunpeng_2',
        name: '鲲鹏威压',
        description: '越往深处，鲲鹏残留的威压越发恐怖，更有守护妖兽蛰伏。',
        monsters: [],
        requiredRealm: CultivationRealm.ARRAY,
        stageType: DungeonStageType.COMBAT,
        rewards: [{ type: 'exp', amount: 2000 }],
        inheritanceDesc: '鲲鹏威压如山般压来，你咬紧牙关，体内灵力疯狂运转抵挡...',
      },
      {
        id: 'stage_kunpeng_3',
        name: '幻境之门',
        description: '一扇由鲲鹏气息凝聚的门户挡住了去路，门上幻境流转。',
        monsters: [],
        requiredRealm: CultivationRealm.ARRAY,
        stageType: DungeonStageType.PUZZLE,
        puzzles: [
          { id: 'puzzle_kunpeng_gate', name: '鲲鹏幻境', description: '需要领悟鲲鹏化形之妙才能破解幻境之门', requiredClues: ['clue_kunpeng_rune', 'clue_kunpeng_feather', 'clue_kunpeng_bone'], solvedDesc: '你将符文、真羽与遗骨中的道韵合一，幻境之门上浮现鲲鹏化鱼化鸟之景，门户缓缓开启。' },
        ],
        rewards: [{ type: 'exp', amount: 2000 }],
        inheritanceDesc: '幻境中，你看到鲲鹏展翅遮天蔽日，化鱼潜入深海。你领悟到鲲鹏化形之妙...',
      },
      {
        id: 'stage_kunpeng_4',
        name: '十凶试炼',
        description: '试炼之地中，十凶威压凝聚成形，需以命相搏。',
        monsters: [],
        requiredRealm: CultivationRealm.VENERABLE,
        stageType: DungeonStageType.TRIAL,
        rewards: [{ type: 'exp', amount: 4000 }],
      },
      {
        id: 'stage_kunpeng_5',
        name: '鲲鹏传承',
        description: '传承之地中央，鲲鹏虚影正在等待天命之人。',
        monsters: [],
        requiredRealm: CultivationRealm.VENERABLE,
        stageType: DungeonStageType.REWARD,
        rewards: [
          { type: 'inheritance', id: 'kunpeng_fa', amount: 1, name: '鲲鹏法' },
          { type: 'exp', amount: 5000 },
          { type: 'gold', amount: 5000 },
        ],
        isBossStage: true,
        inheritanceDesc: '传承之地中央，一道鲲鹏虚影浮现。"十凶传承，非天命之人不可得。汝既有缘，吾传汝鲲鹏宝术..."',
      },
    ],
    dailyLimit: 1,
    cooldownHours: 48,
    rewards: [
      { type: 'inheritance', id: 'kunpeng_fa', amount: 1, name: '鲲鹏法' },
      { type: 'exp', amount: 10000 },
      { type: 'gold', amount: 5000 },
    ],
  },
  {
    id: 'dungeon_life_forbidden',
    name: '生命禁区',
    type: DungeonType.TOMB,
    tier: DungeonTier.MYTHIC,
    description: '遮天世界中的生命禁区，蕴含不死药传承和古代大帝的遗藏。',
    originStory: '生命禁区是遮天世界中最为危险的禁地之一，传说古代大帝曾在此留下传承。禁区中充满了死亡的气息，但也蕴含着长生不死的秘密。',
    entranceRoomId: 'room_life_forbidden_entrance',
    requiredRealm: CultivationRealm.VENERABLE,
    recommendedRealm: CultivationRealm.SUPREME,
    rivalNPCTemplates: [
      { id: 'rival_life_1', name: '禁区猎杀者', title: '古代生物', realm: CultivationRealm.SUPREME, description: '禁区中诞生的恐怖生物，以闯入者为食，实力深不可测。' },
      { id: 'rival_life_2', name: '古族圣子', title: '古皇子嗣', realm: CultivationRealm.VENERABLE, description: '古皇的子嗣，身怀大帝血脉，对禁区中的大帝传承志在必得。' },
    ],
    stages: [
      {
        id: 'stage_life_1',
        name: '禁区外围',
        description: '禁区外围死气弥漫，断壁残垣间隐约可见上古阵法的痕迹。',
        monsters: [],
        requiredRealm: CultivationRealm.VENERABLE,
        stageType: DungeonStageType.EXPLORE,
        requiredExploration: 3,
        clues: [
          { id: 'clue_life_bone', name: '帝骨残片', description: '一块散发帝威的骨片', foundDesc: '你在枯骨堆中发现一块散发淡淡帝威的骨片，上面记载着大帝陵寝的方向。' },
          { id: 'clue_life_map', name: '禁区古图', description: '一张残破的古图', foundDesc: '你在石缝中发现一张残破古图，图中标注了不死药园的位置和一条隐秘通道。' },
          { id: 'clue_life_mark', name: '长生印记', description: '一个古老的长生印记', foundDesc: '你在岩壁上发现一个古老印记，印记中蕴含着大帝对长生的感悟。' },
        ],
        rewards: [{ type: 'exp', amount: 4000 }],
        inheritanceDesc: '禁区内死气弥漫，你看到遍地枯骨，这些都是曾经闯入禁区的修士遗骸...',
      },
      {
        id: 'stage_life_2',
        name: '不死药园',
        description: '深入禁区后，发现一片不死药园，守护者正在蛰伏。',
        monsters: [],
        requiredRealm: CultivationRealm.VENERABLE,
        stageType: DungeonStageType.COMBAT,
        rewards: [{ type: 'item', id: 'immortal_essence', amount: 1 }, { type: 'exp', amount: 6000 }],
        inheritanceDesc: '药园中不死药散发着幽幽光芒，你小心翼翼地采摘，感受到其中蕴含的磅礴生命力...',
      },
      {
        id: 'stage_life_3',
        name: '帝陵封印',
        description: '大帝陵寝前有一道古老封印，需要集齐线索才能开启。',
        monsters: [],
        requiredRealm: CultivationRealm.VENERABLE,
        stageType: DungeonStageType.PUZZLE,
        puzzles: [
          { id: 'puzzle_life_seal', name: '大帝封印', description: '需要帝骨、古图和长生印记中的道韵才能开启帝陵', requiredClues: ['clue_life_bone', 'clue_life_map', 'clue_life_mark'], solvedDesc: '你将帝骨、古图与长生印记合一，大帝陵寝前的封印缓缓消散，露出通往传承之地的青铜古门。' },
        ],
        rewards: [{ type: 'exp', amount: 5000 }],
      },
      {
        id: 'stage_life_4',
        name: '生死试炼',
        description: '大帝设下的生死试炼，需要在死气中感悟生机。',
        monsters: [],
        requiredRealm: CultivationRealm.SUPREME,
        stageType: DungeonStageType.TRIAL,
        rewards: [{ type: 'exp', amount: 10000 }],
      },
      {
        id: 'stage_life_5',
        name: '大帝传承',
        description: '陵寝中央，大帝残留意志正在等待后来者。',
        monsters: [],
        requiredRealm: CultivationRealm.SUPREME,
        stageType: DungeonStageType.REWARD,
        rewards: [
          { type: 'inheritance', id: 'diti_fa', amount: 1, name: '大帝传承' },
          { type: 'exp', amount: 15000 },
          { type: 'gold', amount: 10000 },
        ],
        isBossStage: true,
        inheritanceDesc: '陵寝中央，一道帝王虚影浮现。"吾乃古代大帝，在此留下传承。汝既至此，吾传汝大帝之法..."',
      },
    ],
    dailyLimit: 1,
    cooldownHours: 72,
    rewards: [
      { type: 'inheritance', id: 'diti_fa', amount: 1, name: '大帝传承' },
      { type: 'exp', amount: 28000 },
      { type: 'gold', amount: 10000 },
    ],
  },
  {
    id: 'dungeon_bianhua',
    name: '彼岸花海',
    type: DungeonType.SECRET_REALM,
    tier: DungeonTier.MYTHIC,
    description: '圣墟世界中的彼岸花海，蕴含轮回大道的传承。',
    originStory: '彼岸花海是圣墟世界中最为神秘的秘境之一，传说此地连接生死两岸，蕴含轮回大道的传承。花海中彼岸花盛开，红如鲜血，美得令人窒息。',
    entranceRoomId: 'room_bianhua_entrance',
    requiredRealm: CultivationRealm.SUPREME,
    recommendedRealm: CultivationRealm.SUPREME,
    rivalNPCTemplates: [
      { id: 'rival_bianhua_1', name: '轮回猎手', title: '魂河来客', realm: CultivationRealm.TRUE_IMMORTAL, description: '来自魂河尽头的恐怖存在，专门猎杀感悟轮回之道的修士。' },
      { id: 'rival_bianhua_2', name: '花粉女帝', title: '无上存在', realm: CultivationRealm.SUPREME, description: '一位与花粉路有关的无上女帝，对轮回大道有着独特的理解。' },
    ],
    stages: [
      {
        id: 'stage_bianhua_1',
        name: '花海迷踪',
        description: '彼岸花海中花瓣飞舞，花海深处似乎隐藏着什么。',
        monsters: [],
        requiredRealm: CultivationRealm.SUPREME,
        stageType: DungeonStageType.EXPLORE,
        requiredExploration: 3,
        clues: [
          { id: 'clue_bianhua_petal', name: '轮回花瓣', description: '一片蕴含轮回之力的花瓣', foundDesc: '你在花海深处拾到一片散发幽光的花瓣，花瓣中倒映着前世今生的画面。' },
          { id: 'clue_bianhua_river', name: '生死之河', description: '一条流淌在花海中的小河', foundDesc: '你发现一条隐秘小河，河水中流淌着生死二气，似乎是轮回之桥的引路之水。' },
          { id: 'clue_bianhua_stone', name: '三生石', description: '一块刻有前世今生的奇石', foundDesc: '你在花海尽头发现一块奇石，石面上浮现着"三生"二字，蕴含着轮回的奥秘。' },
        ],
        rewards: [{ type: 'exp', amount: 8000 }],
        inheritanceDesc: '彼岸花盛开如血，你漫步其中，感受到生死交替的玄妙...',
      },
      {
        id: 'stage_bianhua_2',
        name: '花海妖灵',
        description: '花海中诞生了强大的花妖，守护着通往深处的道路。',
        monsters: [],
        requiredRealm: CultivationRealm.SUPREME,
        stageType: DungeonStageType.COMBAT,
        rewards: [{ type: 'exp', amount: 10000 }],
      },
      {
        id: 'stage_bianhua_3',
        name: '轮回封印',
        description: '通往轮回之桥的入口被一道封印封锁，需要集齐线索才能开启。',
        monsters: [],
        requiredRealm: CultivationRealm.SUPREME,
        stageType: DungeonStageType.PUZZLE,
        puzzles: [
          { id: 'puzzle_bianhua_seal', name: '轮回封印', description: '需要轮回花瓣、生死之河和三生石中的道韵才能解开封印', requiredClues: ['clue_bianhua_petal', 'clue_bianhua_river', 'clue_bianhua_stone'], solvedDesc: '你将花瓣、河水与三生石合一，轮回封印缓缓消散，一条由彼岸花铺成的道路通向轮回之桥。' },
        ],
        rewards: [{ type: 'exp', amount: 8000 }],
        inheritanceDesc: '轮回之桥下，生死之河奔流不息。你走过桥梁，感受到轮回之力的洗礼...',
      },
      {
        id: 'stage_bianhua_4',
        name: '轮回试炼',
        description: '轮回之桥尽头，需要经历生死轮回的试炼。',
        monsters: [],
        requiredRealm: CultivationRealm.TRUE_IMMORTAL,
        stageType: DungeonStageType.TRIAL,
        rewards: [{ type: 'exp', amount: 15000 }],
      },
      {
        id: 'stage_bianhua_5',
        name: '轮回传承',
        description: '传承之地中央，轮回大道的意志正在等待有缘人。',
        monsters: [],
        requiredRealm: CultivationRealm.TRUE_IMMORTAL,
        stageType: DungeonStageType.REWARD,
        rewards: [
          { type: 'inheritance', id: 'lunhui_fa', amount: 1, name: '轮回大道' },
          { type: 'exp', amount: 30000 },
          { type: 'gold', amount: 20000 },
        ],
        isBossStage: true,
        inheritanceDesc: '传承之地中央，一朵巨大的彼岸花绽放，花中浮现一道虚影。"轮回大道，生灭不息。汝既至此，吾传汝轮回之法..."',
      },
    ],
    dailyLimit: 1,
    cooldownHours: 72,
    rewards: [
      { type: 'inheritance', id: 'lunhui_fa', amount: 1, name: '轮回大道' },
      { type: 'exp', amount: 55000 },
      { type: 'gold', amount: 20000 },
    ],
  },
];