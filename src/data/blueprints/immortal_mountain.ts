import { ZoneBlueprintDB, IZoneBlueprint } from './BlueprintDB';
import { TerrainType } from '../../domain/entities/Room';

const ImmortalMountainBlueprint: IZoneBlueprint = {
  id: 'immortal_mountain',
  name: '不老山',
  type: 'mountain',
  description: '一座高耸入云的古老仙山，终年云雾缭绕。山上灵气浓郁到近乎实质，是修炼的绝佳之地。山中藏有无数灵药和古老传承，也是很多强者隐居的地方。',
  recommendedLevel: 3,
  entrances: [
    { direction: '南', targetZoneId: 'wasteland', targetRoomId: 'wasteland_06' }
  ],
  rooms: [
    {
      id: 'immortal_gate',
      name: '不老山门',
      description: '一座由巨大玉石砌成的山门，门上刻着"不老山"三个古朴的大字。山门两侧各立着一尊石像，面目模糊，似乎是远古时期的守护兽。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 60,
      exits: [
        { direction: '内', targetId: 'immortal_path', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '南', targetId: 'wasteland_06', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['immortal_guard'],
      isSafeZone: true,
      details: [
        { id: 'immortal_gate_runes', name: '山门符文', description: '玉石门上刻满了太古符文，散发着淡淡的灵光。据说这些符文是不老山开派祖师亲手刻画的，蕴含着无上大道。', type: 'lore' },
        { id: 'immortal_gate_statues', name: '守护石像', description: '两尊石像高达五丈，虽然已经风化，但依旧散发着强大的威压。据说它们是太古凶兽的石像化身，一旦有人强行闯入，便会苏醒。', type: 'lore' },
        { id: 'immortal_gate_plaque', name: '匾额', description: '"不老山"三个字苍劲有力，仿佛蕴含着永恒的力量。匾额下方还有一行小字："入此山者，可得长生。"', type: 'environment' },
      ],
    },
    {
      id: 'immortal_path',
      name: '登仙路',
      description: '一条蜿蜒向上的石阶路，两旁长满了奇花异草。石阶上刻着古老的纹路，似乎是某种阵法的一部分。越往上走，灵气越浓郁。',
      terrain: TerrainType.MOUNTAIN,
      spiritDensity: 70,
      exits: [
        { direction: '下', targetId: 'immortal_gate', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '上', targetId: 'immortal_platform', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'immortal_deer', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 600 },
        { monsterId: 'spirit_bird', minCount: 1, maxCount: 1, spawnWeight: 50, respawnTime: 900 },
      ],
      resources: [{ resourceId: 'immortal_herb', amount: 3, respawnTime: 1200, harvestDifficulty: 4 }],
      npcs: [],
      isSafeZone: false,
      details: [
        { id: 'immortal_path_stones', name: '石阶', description: '每一块石阶都由千年灵玉雕琢而成，踩上去有一股温和的力量涌入体内，有助于修炼。', type: 'environment' },
        { id: 'immortal_path_flowers', name: '仙草', description: '路旁生长着各种仙草，有七彩灵芝、万年雪莲、九转还魂草等。这些都是炼制顶级丹药的珍贵材料。', type: 'interactive', hint: '采集仙草...', interactionResult: '你小心翼翼地采集了一株七彩灵芝，仙草入手温润，散发着浓郁的药香。', rewardItemId: '七彩灵芝', rewardAmount: 1 },
        { id: 'immortal_path_formation', name: '护山大阵', description: '石阶上的纹路是护山大阵的一部分，可抵御外敌入侵。同时也能汇聚天地灵气，滋养整座仙山。', type: 'lore' },
      ],
    },
    {
      id: 'immortal_platform',
      name: '观星台',
      description: '一处宽阔的平台，位于半山腰。台上有一座古老的观星塔，塔身刻满了星图。站在这里，可以俯瞰山下的景色，也可以仰望星空。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 80,
      exits: [
        { direction: '下', targetId: 'immortal_path', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '上', targetId: 'immortal_palace', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'immortal_garden', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['star_seer'],
      isSafeZone: true,
      details: [
        { id: 'immortal_platform_tower', name: '观星塔', description: '塔身高达九丈，塔身刻满了星图和古老的占卜符文。据说通过观星塔可以预知未来，也可以沟通星辰之力。', type: 'lore' },
        { id: 'immortal_platform_view', name: '远眺', description: '站在观星台上远眺，可以看到茫茫荒原和远处的百断山。天气好的时候，甚至能看到火皇城的轮廓。', type: 'environment' },
        { id: 'immortal_platform_altar', name: '祭星台', description: '观星塔前有一座石坛，是用来祭祀星辰的。坛上刻着"天人感应"四个大字。', type: 'environment' },
      ],
    },
    {
      id: 'immortal_garden',
      name: '不老药园',
      description: '不老山的药园，种植着各种珍稀灵药。药园被阵法笼罩，寻常人无法进入。园中灵气浓郁到形成了灵雾，是炼药师梦寐以求的地方。',
      terrain: TerrainType.FOREST,
      spiritDensity: 90,
      exits: [
        { direction: '西', targetId: 'immortal_platform', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'garden_guardian', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 3600 },
      ],
      resources: [
        { resourceId: 'immortal_herb', amount: 5, respawnTime: 1800, harvestDifficulty: 5 },
        { resourceId: 'spirit_crystal', amount: 2, respawnTime: 3600, harvestDifficulty: 6 },
      ],
      npcs: ['herb_master'],
      isSafeZone: false,
      details: [
        { id: 'immortal_garden_herbs', name: '珍稀灵药', description: '药园中种植着各种珍稀灵药，有万年人参、九转何首乌、血龙参等。每一株都是无价之宝。', type: 'interactive', hint: '采集灵药...', interactionResult: '你在药园中找到了一株万年人参，参须如丝，散发着浓郁的灵气。', rewardItemId: '万年人参', rewardAmount: 1 },
        { id: 'immortal_garden_formation', name: '护园大阵', description: '药园被一座强大的阵法笼罩，可防止外人闯入，同时也能加速灵药的生长。', type: 'lore' },
        { id: 'immortal_garden_fountain', name: '灵泉', description: '药园中央有一座灵泉，泉水清澈见底，散发着浓郁的灵气。用灵泉水浇灌灵药，可提升灵药的品质。', type: 'environment' },
        { id: 'immortal_garden_secret', name: '药园深处', description: '药园深处有一处被阵法隐藏的区域，据说里面种植着传说中的"不死药"。', type: 'secret', hint: '探索药园深处...', requiredRealm: 6 },
      ],
    },
    {
      id: 'immortal_palace',
      name: '不老宫',
      description: '不老山的主峰，一座宏伟的宫殿群。宫殿由白玉和灵玉筑成，在阳光下闪耀着柔和的光芒。这里是不老山的核心，也是许多强者闭关修炼的地方。',
      terrain: TerrainType.PLAIN,
      spiritDensity: 100,
      exits: [
        { direction: '下', targetId: 'immortal_platform', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '后', targetId: 'immortal_cave', condition: '需尊者境', isHidden: true, travelCost: 0 },
      ],
      monsters: [],
      resources: [],
      npcs: ['immortal_elder', 'young_master'],
      isSafeZone: true,
      details: [
        { id: 'immortal_palace_hall', name: '长生殿', description: '不老宫的主殿，殿内供奉着不老山开派祖师的神像。殿壁上刻着不老山的传承功法和历代强者的事迹。', type: 'lore' },
        { id: 'immortal_palace_treasure', name: '藏宝阁', description: '长生殿后方有一座藏宝阁，收藏着不老山历代积累的珍宝和传承。据说里面有完整的太古宝术。', type: 'secret', hint: '进入藏宝阁...', requiredRealm: 5 },
        { id: 'immortal_palace_courtyard', name: '演武场', description: '宫殿旁有一座宽阔的演武场，是不老山弟子切磋武艺的地方。场地上刻着各种阵法，可模拟各种战斗环境。', type: 'environment' },
        { id: 'immortal_palace_spring', name: '洗髓泉', description: '演武场旁有一处温泉，名为"洗髓泉"。浸泡其中可洗练筋骨，改善体质。', type: 'interactive', hint: '进入洗髓泉...', interactionResult: '你进入洗髓泉，温热的泉水包裹全身，一股温和的力量冲刷着你的筋骨，浑身暖洋洋的。', rewardItemId: '洗髓丹', rewardAmount: 1 },
      ],
    },
    {
      id: 'immortal_cave',
      name: '不老秘境',
      description: '不老山后山的一处秘境，是不老山最神秘的地方。秘境中时间流速与外界不同，是修炼的绝佳之地。据说秘境深处藏着不老山最大的秘密。',
      terrain: TerrainType.CAVE,
      spiritDensity: 150,
      exits: [
        { direction: '前', targetId: 'immortal_palace', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'ancient_immortal', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 7200 },
      ],
      resources: [
        { resourceId: 'immortal_essence', amount: 1, respawnTime: 86400, harvestDifficulty: 10 },
        { resourceId: 'spirit_crystal', amount: 3, respawnTime: 5400, harvestDifficulty: 7 },
      ],
      isSafeZone: false,
      details: [
        { id: 'immortal_cave_time', name: '时间法则', description: '秘境中的时间流速比外界慢十倍，在这里修炼一天相当于外界十天。这是不老山最大的秘密之一。', type: 'lore' },
        { id: 'immortal_cave_altar', name: '传承祭坛', description: '秘境深处有一座古老的祭坛，上面放着不老山的至高传承。据说只有有缘人才能获得传承。', type: 'interactive', hint: '触碰传承祭坛...', interactionResult: '祭坛传来一股浩瀚的力量，无数信息涌入你的脑海。你获得了不老山的至高传承！', rewardItemId: '不老仙经', rewardAmount: 1, requiredRealm: 7 },
        { id: 'immortal_cave_stele', name: '祖师石碑', description: '秘境最深处，你发现了一块被藤蔓覆盖的古老石碑。拂去藤蔓后，石碑上刻满了太古文字："吾乃不老山开派祖师，留此传承待有缘人。需集齐四象之证，方可开启禁地。"', type: 'secret', hint: '研读祖师石碑...', requiredRealm: 3 },
        { id: 'immortal_cave_rune', name: '太古符文', description: '石碑旁的岩壁上，刻着一组复杂的太古符文。仔细研读后发现，这竟是四象之证的藏匿之处：青龙印在东海、白虎印在西荒、朱雀印在南疆、玄武印在北域。', type: 'secret', hint: '解读太古符文...', requiredRealm: 4 },
        { id: 'immortal_cave_crystal', name: '仙晶矿脉', description: '洞壁上嵌着一些发光的晶体，是传说中的仙晶。仙晶蕴含着庞大的仙力，是修炼的顶级资源。', type: 'interactive', hint: '开采仙晶...', interactionResult: '你用随身携带的工具敲下了一块仙晶，入手冰凉，散发着浓郁的仙力。', rewardItemId: '仙晶', rewardAmount: 1 },
        { id: 'immortal_cave_void', name: '虚空通道', description: '祭坛后方有一道虚空裂缝，裂缝中传来阵阵恐怖的气息。据说这道裂缝通向传说中的仙域。', type: 'secret', hint: '探查虚空裂缝...', requiredRealm: 10 },
      ],
    },
  ],
};

ZoneBlueprintDB.register(ImmortalMountainBlueprint);