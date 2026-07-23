import { IClue, IHiddenStoryline } from '../../domain/entities/HiddenStoryline';
import { CultivationRealm } from '../../domain/entities/Player';

/**
 * 隐藏支线线索数据
 *
 * 基于《完美世界》小说世界观设计 4 条隐藏支线，
 * 玩家通过探索、对话、战斗、收集等多渠道发现线索，
 * 集齐指定数量线索后触发隐藏任务。
 */

// ===== 支线1：柳老的往事（石城 · 凡人~搬血境）=====
export const CLUE_LIU_HISTORY_1: IClue = {
  id: 'clue_liu_history_1',
  storylineId: 'storyline_liu_past',
  title: '柳老的叹息',
  description: '柳老在听到你提起蛮荒之地的野狼时，眼中闪过一丝复杂的情绪，似乎想起了往事。他低声呢喃："当年……也是这样的夜晚。"',
  hint: '柳老似乎与蛮荒之地有某种渊源，多与他交流或许能了解更多。',
  source: 'npc',
  sourceId: 'liu_old',
  requiredCompletedQuest: 'quest_first_hunt',
};

export const CLUE_LIU_HISTORY_2: IClue = {
  id: 'clue_liu_history_2',
  storylineId: 'storyline_liu_past',
  title: '古井的低语',
  description: '石城中心的古井旁，你隐约听到井底传来低语声，似乎在呼唤某个名字。井壁上刻着一行模糊的小字："火皇二十三年，柳卫战死于此。"',
  hint: '古井似乎与一位姓柳的护卫有关，柳老或许知道更多。',
  source: 'explore',
  sourceId: 'plaza_well_secret',
  requiredClues: ['clue_liu_history_1'],
};

export const CLUE_LIU_HISTORY_3: IClue = {
  id: 'clue_liu_history_3',
  storylineId: 'storyline_liu_past',
  title: '残破的玉佩',
  description: '在蛮荒古战场遗址的废墟中，你发现了一枚残破的玉佩。玉佩上刻着"柳"字，背面有一行小字："持此佩者，可入火皇宫。"看来这是当年柳家护卫的信物。',
  hint: '这枚玉佩似乎是柳家的信物，将它带给柳老或许能揭开往事。',
  source: 'explore',
  sourceId: 'wasteland_battlefield_relic',
  requiredClues: ['clue_liu_history_2'],
};

export const CLUE_LIU_HISTORY_4: IClue = {
  id: 'clue_liu_history_4',
  storylineId: 'storyline_liu_past',
  title: '柳老的真相',
  description: '柳老看到玉佩后沉默良久，终于开口："我就是当年的柳卫，火皇近卫之一。三百年前那场大战，我侥幸存活，却再无颜面回火皇城。如今你既已知晓，便替我完成一桩心愿吧。"',
  hint: '柳老的往事已经揭开，或许还有未竟之事需要完成。',
  source: 'npc',
  sourceId: 'liu_old',
  requiredClues: ['clue_liu_history_3'],
};

// ===== 支线2：蛮荒古战场之秘（蛮荒之地 · 洞天境以上）=====
export const CLUE_BATTLEFIELD_1: IClue = {
  id: 'clue_battlefield_1',
  storylineId: 'storyline_ancient_battlefield',
  title: '古战场遗迹',
  description: '蛮荒深处，你发现了一片古老的战场遗迹。残破的兵器散落一地，地面上还残留着上古法术的痕迹。这里似乎曾是太古时期的一场大战发生地。',
  hint: '古战场似乎隐藏着上古秘辛，进一步探索或许有更多发现。',
  source: 'explore',
  sourceId: 'wasteland_battlefield_stele',
  requiredRealm: CultivationRealm.CAVE,
};

export const CLUE_BATTLEFIELD_2: IClue = {
  id: 'clue_battlefield_2',
  storylineId: 'storyline_ancient_battlefield',
  title: '亡灵的低吟',
  description: '击杀古战场游魂后，它消散前低声呢喃："英灵不散……待有缘人……唤醒将军……"看来这片战场还有未了之事。',
  hint: '亡灵提到了"将军"，或许古战场深处还有更强大的英灵存在。',
  source: 'kill',
  sourceId: 'wandering_soul',
  requiredClues: ['clue_battlefield_1'],
};

export const CLUE_BATTLEFIELD_3: IClue = {
  id: 'clue_battlefield_3',
  storylineId: 'storyline_ancient_battlefield',
  title: '火皇城史官的记载',
  description: '火皇城的史官翻阅古籍后告诉你："三百多年前，火国曾与北方蛮荒的凶兽部落大战，统帅是一位姓柳的将军。后来他战死沙场，尸骨无存。"',
  hint: '史官的记载与古战场吻合，那位将军的英灵或许还在战场上徘徊。',
  source: 'npc',
  sourceId: 'firecity_historian',
  requiredClues: ['clue_battlefield_2'],
};

export const CLUE_BATTLEFIELD_4: IClue = {
  id: 'clue_battlefield_4',
  storylineId: 'storyline_ancient_battlefield',
  title: '古战场遗物',
  description: '你收集了三件古战场遗物：一柄断剑、一面残旗、一枚将印。将印上刻着"柳"字，似乎与石城柳老有所关联。将印散发着微弱的灵光，似乎在召唤着什么。',
  hint: '集齐三件遗物，或许能唤醒沉睡的英灵。',
  source: 'item',
  sourceId: 'clue_battlefield_relic',
  requiredClues: ['clue_battlefield_3'],
};

// ===== 支线3：不老山禁地（不老山 · 化灵境以上）=====
export const CLUE_IMMORTAL_1: IClue = {
  id: 'clue_immortal_1',
  storylineId: 'storyline_immortal_mountain',
  title: '山顶石碑',
  description: '不老山秘境最深处，你发现了一块被藤蔓覆盖的古老石碑。石碑上刻满了太古文字："吾乃不老山开派祖师，留此传承待有缘人。需集齐四象之证，方可开启禁地。"',
  hint: '祖师留下了传承，需要寻找"四象之证"才能开启禁地。',
  source: 'explore',
  sourceId: 'immortal_cave_stele',
  requiredRealm: CultivationRealm.SPIRIT,
};

export const CLUE_IMMORTAL_2: IClue = {
  id: 'clue_immortal_2',
  storylineId: 'storyline_immortal_mountain',
  title: '太古符文',
  description: '石碑旁的岩壁上，你发现了一组复杂的太古符文。仔细研读后发现，这竟是四象之证的藏匿之处：青龙印在东海、白虎印在西荒、朱雀印在南疆、玄武印在北域。而不老山禁地的入口，就在秘境深处。',
  hint: '四象之证分散四方，集齐后可开启不老山禁地。',
  source: 'explore',
  sourceId: 'immortal_cave_rune',
  requiredClues: ['clue_immortal_1'],
  requiredRealm: CultivationRealm.INSCRIBE,
};

export const CLUE_IMMORTAL_3: IClue = {
  id: 'clue_immortal_3',
  storylineId: 'storyline_immortal_mountain',
  title: '守门人的指引',
  description: '不老山守门人压低声音告诉你："祖师留下的传承确实存在，但需要以心性为引。你若已悟得太古符文，便可尝试进入秘境深处。不过……禁地凶险，生死自负。"',
  hint: '守门人默许了你的探索，秘境之门已经为你敞开。',
  source: 'npc',
  sourceId: 'immortal_guard',
  requiredClues: ['clue_immortal_2'],
};

export const CLUE_IMMORTAL_4: IClue = {
  id: 'clue_immortal_4',
  storylineId: 'storyline_immortal_mountain',
  title: '传承祭坛的启示',
  description: '你触碰了秘境深处的传承祭坛，无数信息涌入脑海。祭坛传来浩瀚的力量，似乎在考验你的心性。你感受到祖师的意志："有缘人，传承已为你敞开。"',
  hint: '传承祭坛的启示印证了你的资格，禁地之门即将开启。',
  source: 'explore',
  sourceId: 'immortal_cave_altar',
  requiredClues: ['clue_immortal_3'],
};

// ===== 支线4：遗落的天角蚁宝藏（百断山 · 列阵境以上）=====
export const CLUE_ANT_1: IClue = {
  id: 'clue_ant_1',
  storylineId: 'storyline_ant_treasure',
  title: '古老蚁穴',
  description: '百断山水帘洞府深处，你发现了一个巨大的蚁穴。蚁穴入口刻着古老的纹路，似乎是太古时期人为建造。穴内传来微弱的灵气波动，似乎藏着什么宝物。',
  hint: '蚁穴非比寻常，似乎与传说中的天角蚁有关。',
  source: 'explore',
  sourceId: 'hundred_breaks_cave_ant',
  requiredRealm: CultivationRealm.ARRAY,
};

export const CLUE_ANT_2: IClue = {
  id: 'clue_ant_2',
  storylineId: 'storyline_ant_treasure',
  title: '太古凶兽志记载',
  description: '水帘洞府石台上的古经竟是《太古凶兽志》。翻阅后，你找到了关于天角蚁的记载："天角蚁，太古凶虫也。其王拥十角，力可撼山。王死后，宝藏葬于百断山深处，待有缘人开启。"',
  hint: '古籍印证了蚁穴的来历，宝藏确实存在。',
  source: 'explore',
  sourceId: 'hundred_breaks_cave_book',
  requiredClues: ['clue_ant_1'],
};

export const CLUE_ANT_3: IClue = {
  id: 'clue_ant_3',
  storylineId: 'storyline_ant_treasure',
  title: '蚁后遗甲',
  description: '你收集了数片蚁后遗甲，将其拼合后发现，甲壳上竟然刻着一幅地图！地图指向百断山深处的一个隐秘洞穴，那里似乎就是天角蚁王的宝藏所在。',
  hint: '蚁后遗甲上的地图指引了宝藏位置，集齐后即可前往。',
  source: 'item',
  sourceId: 'clue_ant_armor',
  requiredClues: ['clue_ant_2'],
};

export const CLUE_ANT_4: IClue = {
  id: 'clue_ant_4',
  storylineId: 'storyline_ant_treasure',
  title: '不老山古籍印证',
  description: '在不老山秘境中，你找到了另一本古籍，印证了天角蚁宝藏的传说。古籍还记载了开启宝藏的方法：需以蚁后遗甲为引，方可进入宝藏所在。',
  hint: '古籍印证了蚁后遗甲的地图，宝藏即将开启。',
  source: 'explore',
  sourceId: 'immortal_cave_time',
  requiredClues: ['clue_ant_3'],
};

// ===== 所有线索汇总 =====
export const ALL_CLUES: IClue[] = [
  CLUE_LIU_HISTORY_1, CLUE_LIU_HISTORY_2, CLUE_LIU_HISTORY_3, CLUE_LIU_HISTORY_4,
  CLUE_BATTLEFIELD_1, CLUE_BATTLEFIELD_2, CLUE_BATTLEFIELD_3, CLUE_BATTLEFIELD_4,
  CLUE_IMMORTAL_1, CLUE_IMMORTAL_2, CLUE_IMMORTAL_3, CLUE_IMMORTAL_4,
  CLUE_ANT_1, CLUE_ANT_2, CLUE_ANT_3, CLUE_ANT_4,
];

// ===== 隐藏支线定义 =====
export const HIDDEN_STORYLINES: IHiddenStoryline[] = [
  {
    id: 'storyline_liu_past',
    name: '柳老的往事',
    description: '石城守门老人柳老似乎隐藏着不为人知的过去，他的故事或许与三百年前的那场大战有关。',
    category: 'mystery',
    clues: ['clue_liu_history_1', 'clue_liu_history_2', 'clue_liu_history_3', 'clue_liu_history_4'],
    requiredClueCount: 4,
    triggerQuestId: 'quest_hidden_liu_past',
    rewardTitle: '知心人',
    loreText: '三百年前，火皇近卫柳卫奉命镇守石城，抵御北方蛮荒凶兽的入侵。一场血战后，柳卫侥幸存活，却因未能护住主公而自责，从此隐姓埋名，在石城门口守了三百年。',
    recommendedRealm: CultivationRealm.MORTAL,
  },
  {
    id: 'storyline_ancient_battlefield',
    name: '蛮荒古战场之秘',
    description: '蛮荒深处的古战场隐藏着太古时期的秘辛，沉睡的英灵等待着有缘人唤醒。',
    category: 'ancient',
    clues: ['clue_battlefield_1', 'clue_battlefield_2', 'clue_battlefield_3', 'clue_battlefield_4'],
    requiredClueCount: 4,
    triggerQuestId: 'quest_hidden_battlefield',
    rewardTitle: '英灵唤醒者',
    loreText: '三百多年前，火国与北方蛮荒凶兽部落爆发大战。柳姓将军率军血战，最终战死沙场。其英灵不散，化为古战场亡灵，等待后人替他完成未竟之志。',
    recommendedRealm: CultivationRealm.CAVE,
  },
  {
    id: 'storyline_immortal_mountain',
    name: '不老山禁地',
    description: '不老山开派祖师留下的传承藏在禁地深处，唯有集齐四象之证、悟得太古符文者方可开启。',
    category: 'legacy',
    clues: ['clue_immortal_1', 'clue_immortal_2', 'clue_immortal_3', 'clue_immortal_4'],
    requiredClueCount: 4,
    triggerQuestId: 'quest_hidden_immortal_legacy',
    rewardTitle: '传承继承者',
    loreText: '不老山开派祖师乃太古时期的大能，临终前将自己的传承封印在禁地之中。唯有集齐四象之证、悟得太古符文、心性纯正者，方可继承衣钵。',
    recommendedRealm: CultivationRealm.SPIRIT,
  },
  {
    id: 'storyline_ant_treasure',
    name: '遗落的天角蚁宝藏',
    description: '太古凶虫天角蚁王的宝藏葬于百断山深处，唯有寻得蚁后遗甲、印证古籍记载者方能开启。',
    category: 'legend',
    clues: ['clue_ant_1', 'clue_ant_2', 'clue_ant_3', 'clue_ant_4'],
    requiredClueCount: 4,
    triggerQuestId: 'quest_hidden_ant_treasure',
    rewardTitle: '寻宝大师',
    loreText: '天角蚁王乃太古时期的凶虫霸主，拥有十角，力可撼山。它死后，后代将其宝藏葬于百断山深处，并留下蚁后遗甲作为地图，等待有缘人开启。',
    recommendedRealm: CultivationRealm.ARRAY,
  },
];

// ===== 线索索引（O(1) 查找） =====
export const CLUES_MAP: Map<string, IClue> = new Map(ALL_CLUES.map(c => [c.id, c]));

// ===== 按来源索引的线索列表 =====
export const CLUES_BY_SOURCE: Record<string, IClue[]> = {
  explore: ALL_CLUES.filter(c => c.source === 'explore'),
  npc: ALL_CLUES.filter(c => c.source === 'npc'),
  kill: ALL_CLUES.filter(c => c.source === 'kill'),
  item: ALL_CLUES.filter(c => c.source === 'item'),
};

/** 根据 source + sourceId 查找线索 */
export function findClueBySource(source: string, sourceId: string): IClue | undefined {
  return CLUES_BY_SOURCE[source]?.find(c => c.sourceId === sourceId);
}

/** 根据 clueId 查找线索 */
export function findClueById(clueId: string): IClue | undefined {
  return CLUES_MAP.get(clueId);
}

/** 根据 storylineId 查找支线 */
export function findStorylineById(storylineId: string): IHiddenStoryline | undefined {
  return HIDDEN_STORYLINES.find(s => s.id === storylineId);
}
