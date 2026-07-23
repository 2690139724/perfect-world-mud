import { DUNGEONS, IDungeon, DungeonTier, DungeonType } from '../../domain/entities/Dungeon';
import { CultivationRealm } from '../../domain/entities/Player';

const AncientBattlefieldDungeon: IDungeon = {
  id: 'dungeon_ancient_battlefield',
  name: '太古战场',
  type: DungeonType.BATTLEFIELD,
  tier: DungeonTier.NORMAL,
  description: '一处古老的战场遗迹，地面上散落着残破的兵器和骨骸。空气中弥漫着浓郁的杀伐之气，仿佛还能听到千年前的喊杀声。',
  originStory: '太古时期，石族先祖与凶兽在此展开一场大战。数千石族战士战死沙场，他们的执念化作了英灵，守护着这片战场。',
  entranceRoomId: 'wasteland_06',
  requiredRealm: CultivationRealm.BLOOD_MOVING,
  recommendedRealm: CultivationRealm.CAVE,
  dailyLimit: 3,
  cooldownHours: 0,
  rewards: [
    { type: 'item', id: 'ancient_bone', amount: 3 },
    { type: 'item', id: 'iron_ore', amount: 5 },
    { type: 'technique', id: 'shifu_shu', amount: 1 },
  ],
  stages: [
    {
      id: 'battlefield_stage1',
      name: '英灵守卫',
      description: '战场入口处，几具骨骸缓缓站起，他们是战死的石族士兵，守护着战场的入口。',
      monsters: [],
      requiredRealm: CultivationRealm.BLOOD_MOVING,
      rewards: [
        { type: 'item', id: 'ancient_bone', amount: 1 },
      ],
    },
    {
      id: 'battlefield_stage2',
      name: '凶兽残骸',
      description: '战场中央，一具巨大的凶兽残骸突然动了起来。这是一头铁甲兽的遗骸，被英灵之力唤醒。',
      monsters: [],
      requiredRealm: CultivationRealm.BLOOD_MOVING,
      rewards: [
        { type: 'item', id: 'iron_ore', amount: 3 },
        { type: 'item', id: 'stone_core', amount: 1 },
      ],
    },
    {
      id: 'battlefield_stage3',
      name: '将军英灵',
      description: '战场深处，一位身穿铠甲的英灵将军矗立在那里。他是当年的石族将领，实力强大。',
      monsters: [],
      isBossStage: true,
      requiredRealm: CultivationRealm.CAVE,
      rewards: [
        { type: 'item', id: 'ancient_bone', amount: 3 },
        { type: 'technique', id: 'shifu_shu', amount: 1 },
      ],
    },
  ],
};

const HundredBreaksTrialDungeon: IDungeon = {
  id: 'dungeon_hundred_breaks_trial',
  name: '百断山试炼',
  type: DungeonType.TRIAL,
  tier: DungeonTier.ELITE,
  description: '百断山深处的一处试炼之地，是太古时期强者留下的考验。通过试炼者可获得强大的传承。',
  originStory: '百断山曾是太古时期的一处修炼圣地，一位强大的太古强者在此留下了试炼，考验后来者的实力和心性。',
  entranceRoomId: 'hundred_breaks_peak',
  requiredRealm: CultivationRealm.CAVE,
  recommendedRealm: CultivationRealm.SPIRIT,
  dailyLimit: 1,
  cooldownHours: 6,
  rewards: [
    { type: 'item', id: 'baoshu_fragment_zhenlong', amount: 1 },
    { type: 'item', id: 'talent_fragment', amount: 3 },
    { type: 'item', id: 'spirit_crystal', amount: 5 },
  ],
  stages: [
    {
      id: 'trial_stage1',
      name: '凶兽群',
      description: '一群铁甲兽挡在前方，它们是试炼的第一道考验。',
      monsters: [],
      requiredRealm: CultivationRealm.CAVE,
      rewards: [
        { type: 'item', id: 'spirit_herb', amount: 3 },
      ],
    },
    {
      id: 'trial_stage2',
      name: '幻境考验',
      description: '一片迷雾笼罩，幻境中出现了你的心魔。只有战胜心魔，才能继续前进。',
      monsters: [],
      requiredRealm: CultivationRealm.SPIRIT,
      rewards: [
        { type: 'item', id: 'spirit_crystal', amount: 2 },
        { type: 'item', id: 'soul_fragment', amount: 1 },
        { type: 'item', id: 'talent_fragment', amount: 1 },
      ],
    },
    {
      id: 'trial_stage3',
      name: '太古传承',
      description: '试炼的终点，一座古老的传承台。台上放着一卷传承卷轴，旁边有一位守护英灵。',
      monsters: [],
      isBossStage: true,
      requiredRealm: CultivationRealm.SPIRIT,
      rewards: [
        { type: 'item', id: 'baoshu_fragment_zhenlong', amount: 2 },
        { type: 'item', id: 'talent_fragment', amount: 3 },
        { type: 'item', id: 'spirit_crystal', amount: 5 },
      ],
    },
  ],
};

const ImmortalGraveDungeon: IDungeon = {
  id: 'dungeon_immortal_grave',
  name: '仙坟',
  type: DungeonType.TOMB,
  tier: DungeonTier.LEGENDARY,
  description: '一座悬浮在空中的巨大坟冢，散发着淡淡的仙气。坟冢周围布满了禁制，只有真正的强者才能进入。',
  originStory: '这是一位远古仙人的墓地，仙人在陨落前将毕生所学封印在坟中。传说得到仙人传承者，可一步登天。',
  entranceRoomId: 'divine_garden_secret',
  requiredRealm: CultivationRealm.VENERABLE,
  recommendedRealm: CultivationRealm.DIVINE_FIRE,
  dailyLimit: 1,
  cooldownHours: 24,
  rewards: [
    { type: 'item', id: 'law_essence_time', amount: 1 },
    { type: 'item', id: 'baoshu_fragment_liushen', amount: 1 },
    { type: 'item', id: 'spirit_crystal', amount: 10 },
  ],
  stages: [
    {
      id: 'grave_stage1',
      name: '仙坟禁制',
      description: '仙坟入口处布满了仙禁，需要破解禁制才能进入。',
      monsters: [],
      requiredRealm: CultivationRealm.VENERABLE,
      rewards: [
        { type: 'item', id: 'spirit_crystal', amount: 2 },
      ],
    },
    {
      id: 'grave_stage2',
      name: '仙人护卫',
      description: '仙坟内部，两位仙人护卫的英灵正在巡逻。他们实力强大，不容小觑。',
      monsters: [],
      requiredRealm: CultivationRealm.DIVINE_FIRE,
      rewards: [
        { type: 'item', id: 'spirit_crystal', amount: 5 },
        { type: 'item', id: 'soul_fragment', amount: 2 },
        { type: 'item', id: 'baoshu_fragment_liushen', amount: 1 },
      ],
    },
    {
      id: 'grave_stage3',
      name: '仙人遗骸',
      description: '仙坟最深处，一具仙人的遗骸躺在石棺中。遗骸身上散发着强大的仙气，旁边放着仙人的传承。',
      monsters: [],
      isBossStage: true,
      requiredRealm: CultivationRealm.DIVINE_FIRE,
      rewards: [
        { type: 'item', id: 'law_essence_time', amount: 2 },
        { type: 'item', id: 'baoshu_fragment_liushen', amount: 2 },
        { type: 'item', id: 'spirit_crystal', amount: 10 },
      ],
    },
  ],
};

const AncientRoadDungeon: IDungeon = {
  id: 'dungeon_ancient_road',
  name: '古路',
  type: DungeonType.SECRET_REALM,
  tier: DungeonTier.MYTHIC,
  description: '一条悬浮在虚空中的道路，通向未知的远方。道路两旁是无尽的星空，散发着神秘的气息。',
  originStory: '古路是通往上界的道路，由远古大能开辟。踏上古路者，需要经历无数考验，最终到达上界。石昊曾踏上古路，一路征战，最终登临仙域。',
  entranceRoomId: 'burial_deep',
  requiredRealm: CultivationRealm.SUPREME,
  recommendedRealm: CultivationRealm.TRUE_IMMORTAL,
  dailyLimit: 1,
  cooldownHours: 48,
  rewards: [
    { type: 'item', id: 'law_essence_destiny', amount: 1 },
    { type: 'item', id: 'baoshu_fragment_huangdi', amount: 1 },
    { type: 'item', id: 'talent_fragment', amount: 5 },
  ],
  stages: [
    {
      id: 'road_stage1',
      name: '星空试炼',
      description: '古路的第一站，星空之中漂浮着无数星辰碎片。需要在星辰碎片间跳跃，到达对岸。',
      monsters: [],
      requiredRealm: CultivationRealm.SUPREME,
      rewards: [
        { type: 'item', id: 'soul_fragment', amount: 3 },
        { type: 'item', id: 'talent_fragment', amount: 2 },
      ],
    },
    {
      id: 'road_stage2',
      name: '界域之门',
      description: '一扇巨大的界域之门挡住了去路。门上刻满了太古符文，需要破解符文才能打开。',
      monsters: [],
      requiredRealm: CultivationRealm.TRUE_IMMORTAL,
      rewards: [
        { type: 'item', id: 'spirit_crystal', amount: 8 },
        { type: 'item', id: 'soul_fragment', amount: 5 },
        { type: 'item', id: 'law_essence_destiny', amount: 1 },
      ],
    },
    {
      id: 'road_stage3',
      name: '终极考验',
      description: '古路的终点，一位太古至尊的虚影正在等待。只有战胜他，才能通过古路，到达上界。',
      monsters: [],
      isBossStage: true,
      requiredRealm: CultivationRealm.TRUE_IMMORTAL,
      rewards: [
        { type: 'item', id: 'law_essence_destiny', amount: 2 },
        { type: 'item', id: 'baoshu_fragment_huangdi', amount: 2 },
        { type: 'item', id: 'talent_fragment', amount: 5 },
      ],
    },
  ],
};

const Ten凶TrialDungeon: IDungeon = {
  id: 'dungeon_ten凶_trial',
  name: '十凶试炼',
  type: DungeonType.TRIAL,
  tier: DungeonTier.LEGENDARY,
  description: '一处神秘的试炼之地，封印着太古十凶的力量。通过试炼者可获得十凶的传承。',
  originStory: '太古时期，十凶是这片天地的主宰。他们陨落之后，留下了试炼之地，考验后来者是否有资格继承他们的力量。',
  entranceRoomId: 'divine_garden_center',
  requiredRealm: CultivationRealm.ARRAY,
  recommendedRealm: CultivationRealm.VENERABLE,
  dailyLimit: 1,
  cooldownHours: 12,
  rewards: [
    { type: 'item', id: 'baoshu_fragment_qingluan', amount: 1 },
    { type: 'item', id: 'baoshu_fragment_taotie', amount: 1 },
    { type: 'item', id: 'baoshu_fragment_zhenlong', amount: 1 },
  ],
  stages: [
    {
      id: 'ten凶_stage1',
      name: '青鸾试炼',
      description: '一只巨大的青鸾虚影出现，它是太古十凶之一的青鸾。只有战胜它，才能获得青鸾的认可。',
      monsters: [],
      isBossStage: true,
      requiredRealm: CultivationRealm.ARRAY,
      rewards: [
        { type: 'item', id: 'baoshu_fragment_qingluan', amount: 2 },
        { type: 'item', id: 'spirit_herb', amount: 5 },
      ],
    },
    {
      id: 'ten凶_stage2',
      name: '饕餮试炼',
      description: '一只巨大的饕餮虚影出现，它是太古十凶之一的饕餮。饕餮以吞噬万物为生，需要小心应对。',
      monsters: [],
      isBossStage: true,
      requiredRealm: CultivationRealm.VENERABLE,
      rewards: [
        { type: 'item', id: 'baoshu_fragment_taotie', amount: 2 },
        { type: 'item', id: 'spirit_crystal', amount: 4 },
      ],
    },
    {
      id: 'ten凶_stage3',
      name: '真龙试炼',
      description: '一条巨大的真龙虚影出现，它是太古十凶之首的真龙。这是最强的试炼，只有真正的强者才能通过。',
      monsters: [],
      isBossStage: true,
      requiredRealm: CultivationRealm.DIVINE_FIRE,
      rewards: [
        { type: 'item', id: 'baoshu_fragment_zhenlong', amount: 3 },
        { type: 'item', id: 'talent_fragment', amount: 3 },
      ],
    },
  ],
};

DUNGEONS.push(
  AncientBattlefieldDungeon,
  HundredBreaksTrialDungeon,
  ImmortalGraveDungeon,
  AncientRoadDungeon,
  Ten凶TrialDungeon
);