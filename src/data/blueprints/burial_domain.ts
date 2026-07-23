import { ZoneBlueprintDB, IZoneBlueprint } from './BlueprintDB';
import { TerrainType } from '../../domain/entities/Room';

const BurialDomainBlueprint: IZoneBlueprint = {
  id: 'burial_domain',
  name: '葬域',
  type: 'dungeon',
  description: '一片死寂的荒原，是太古时期神魔大战的遗址。地面上散落着巨大的骨骸和残破的兵器，空气中弥漫着死亡和腐朽的气息。传说这里埋葬着无数太古强者，他们的遗物和传承就深藏其中。',
  recommendedLevel: 6,
  entrances: [
    { direction: '入口', targetZoneId: 'wasteland', targetRoomId: 'wasteland_06' }
  ],
  rooms: [
    {
      id: 'burial_entrance',
      name: '葬域入口',
      description: '一片荒芜的平原，地面上散落着巨大的骨骸。有的骨骸高达数十丈，不知道是何种凶兽的遗骸。空气中弥漫着腐朽的气息，令人不适。',
      terrain: TerrainType.RUIN,
      spiritDensity: 40,
      exits: [
        { direction: '内', targetId: 'burial_bone_field', condition: '需神火境', isHidden: false, travelCost: 0 },
        { direction: '外', targetId: 'wasteland_06', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'undead_beast', minCount: 1, maxCount: 2, spawnWeight: 100, respawnTime: 600 },
      ],
      resources: [],
      npcs: [],
      isSafeZone: false,
      details: [
        { id: 'burial_entrance_bones', name: '巨大骨骸', description: '地上的骨骸高达数十丈，从骨骸的形状来看，似乎是太古凶兽的遗骸。骨骸上还残留着微弱的灵力。', type: 'lore' },
        { id: 'burial_entrance_weapons', name: '残破兵器', description: '骨骸间散落着各种残破的兵器，有石斧、骨剑、铜锤等。这些兵器虽然已经残破，但依旧散发着威压。', type: 'environment' },
        { id: 'burial_entrance_soul', name: '游荡的灵魂', description: '你隐约看到一些透明的灵魂在骨骸间游荡，它们似乎还保留着生前的意识。', type: 'secret', hint: '与灵魂交流...', requiredRealm: 7 },
      ],
    },
    {
      id: 'burial_bone_field',
      name: '万骨平原',
      description: '一片由无数骨骸铺成的平原，脚踩在骨头上发出咔嚓的声响。平原中央有一座由巨大头骨堆砌成的祭坛，散发着幽幽的绿光。',
      terrain: TerrainType.RUIN,
      spiritDensity: 60,
      exits: [
        { direction: '外', targetId: 'burial_entrance', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '前', targetId: 'burial_altar', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '东', targetId: 'burial_tomb', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'bone_golem', minCount: 1, maxCount: 3, spawnWeight: 100, respawnTime: 900 },
        { monsterId: 'undead_beast', minCount: 1, maxCount: 2, spawnWeight: 80, respawnTime: 600 },
      ],
      resources: [
        { resourceId: 'ancient_bone', amount: 3, respawnTime: 1800, harvestDifficulty: 5 },
      ],
      npcs: [],
      isSafeZone: false,
      details: [
        { id: 'burial_field_bones', name: '骨骸', description: '平原上的骨骸来自各种生物，有凶兽的，也有人族的，甚至有神族的。这些骨骸是太古神魔大战的见证。', type: 'environment' },
        { id: 'burial_field_bone_golem', name: '骨巨人', description: '由无数骨骸拼凑而成的巨人，在平原上游荡。它们是太古时期的战争傀儡，至今仍在执行着最后的命令。', type: 'lore' },
        { id: 'burial_field_collect', name: '收集骨骸', description: '平原上的骨骸虽然普通，但用来炼制骨器却是极好的材料。', type: 'interactive', hint: '收集骨骸...', interactionResult: '你从骨骸中挑选了一些品质较好的，可以用来炼制骨器。', rewardItemId: 'ancient_bone', rewardAmount: 1 },
      ],
    },
    {
      id: 'burial_altar',
      name: '骨祭坛',
      description: '一座由巨大头骨堆砌成的祭坛，散发着幽幽的绿光。祭坛中央有一个深坑，坑中似乎有什么东西在发光。祭坛周围的空气中弥漫着浓重的死气。',
      terrain: TerrainType.RUIN,
      spiritDensity: 80,
      exits: [
        { direction: '后', targetId: 'burial_bone_field', condition: undefined, isHidden: false, travelCost: 0 },
        { direction: '下', targetId: 'burial_deep', condition: '需尊者境', isHidden: true, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'altar_guardian', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 3600 },
      ],
      resources: [
        { resourceId: 'spirit_crystal', amount: 2, respawnTime: 3600, harvestDifficulty: 6 },
      ],
      npcs: [],
      isSafeZone: false,
      details: [
        { id: 'burial_altar_skulls', name: '头骨祭坛', description: '祭坛由数千个头骨堆砌而成，每个头骨都散发着幽幽的绿光。据说这些头骨来自太古时期的强者，他们的意识被封印在头骨中。', type: 'lore' },
        { id: 'burial_altar_pit', name: '祭坛深坑', description: '祭坛中央的深坑中，有一个发光的物体。仔细一看，似乎是一块刻着符文的古骨。', type: 'interactive', hint: '取出古骨...', interactionResult: '你从深坑中取出古骨，古骨上传来一股强大的力量。这是太古强者的遗骨！', rewardItemId: '太古遗骨', rewardAmount: 1, requiredRealm: 7 },
        { id: 'burial_altar_secret', name: '隐藏通道', description: '祭坛底部似乎有一条隐藏的通道，通向葬域的最深处。那里据说埋葬着太古时期最强的存在。', type: 'secret', hint: '寻找通道入口...', requiredRealm: 6 },
      ],
    },
    {
      id: 'burial_tomb',
      name: '古墓群',
      description: '一片由巨大石墓组成的墓群，每座石墓都刻着古老的铭文。石墓间飘荡着幽魂，发出凄厉的哭声。这里是太古强者安息的地方。',
      terrain: TerrainType.RUIN,
      spiritDensity: 70,
      exits: [
        { direction: '西', targetId: 'burial_bone_field', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'tomb_spirit', minCount: 2, maxCount: 4, spawnWeight: 100, respawnTime: 600 },
      ],
      resources: [
        { resourceId: 'ancient_bone', amount: 2, respawnTime: 1800, harvestDifficulty: 5 },
        { resourceId: 'spirit_crystal', amount: 1, respawnTime: 3600, harvestDifficulty: 6 },
      ],
      npcs: [],
      isSafeZone: false,
      details: [
        { id: 'burial_tomb_stones', name: '石墓铭文', description: '石墓上的铭文记载着墓主人生前的事迹。有的是太古凶兽，有的是人族强者，甚至有神族的大能。', type: 'lore' },
        { id: 'burial_tomb_open', name: '开启石墓', description: '其中一座石墓的封印似乎已经松动，可以尝试开启。', type: 'interactive', hint: '开启石墓...', interactionResult: '你推开石墓的盖板，发现里面有一具遗骸和一些陪葬品。', rewardItemId: '陪葬宝物', rewardAmount: 1, requiredRealm: 7 },
        { id: 'burial_tomb_spirit', name: '幽魂', description: '石墓间的幽魂是太古强者的残魂，它们已经失去了大部分意识，只剩下本能。与它们交流可能获得一些太古的信息。', type: 'secret', hint: '与幽魂交流...', requiredRealm: 7 },
      ],
    },
    {
      id: 'burial_deep',
      name: '葬域深处',
      description: '葬域的最深处，一座巨大的石棺矗立在中央。石棺上刻满了太古符文，散发着恐怖的威压。空气中弥漫着浓重的死气，仿佛连时间都停滞了。这里埋葬着太古时期最强的存在。',
      terrain: TerrainType.CAVE,
      spiritDensity: 200,
      exits: [
        { direction: '上', targetId: 'burial_altar', condition: undefined, isHidden: false, travelCost: 0 },
      ],
      monsters: [
        { monsterId: 'ancient_demon', minCount: 1, maxCount: 1, spawnWeight: 100, respawnTime: 28800 },
      ],
      resources: [
        { resourceId: 'immortal_essence', amount: 2, respawnTime: 172800, harvestDifficulty: 15 },
        { resourceId: 'xian_jing', amount: 3, respawnTime: 86400, harvestDifficulty: 10 },
      ],
      isSafeZone: false,
      details: [
        { id: 'burial_deep_coffin', name: '太古石棺', description: '石棺中埋葬着太古时期最强的存在，据说是与天争锋的太古神魔。石棺上的符文是封印，防止太古神魔的怨气外泄。', type: 'lore' },
        { id: 'burial_deep_open', name: '开启石棺', description: '石棺的封印似乎已经松动，可以尝试开启。但开启后会发生什么，谁也不知道。', type: 'interactive', hint: '开启石棺...', interactionResult: '你推开石棺的盖板，一股恐怖的气息扑面而来。石棺中有一具保存完好的遗骸，手中握着一卷经文。', rewardItemId: '太古魔经', rewardAmount: 1, requiredRealm: 9 },
        { id: 'burial_deep_inheritance', name: '太古传承', description: '石棺中的遗骸似乎还残留着一丝意识，它似乎想要将毕生所学传承给你。', type: 'secret', hint: '接受传承...', requiredRealm: 10 },
      ],
    },
  ],
};

ZoneBlueprintDB.register(BurialDomainBlueprint);