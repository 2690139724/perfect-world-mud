export interface WildernessBuilding {
  id: string;
  name: string;
  type: 'hut' | 'shed' | 'pavilion' | 'mine' | 'stele';
  description: string;
  positionHint: string;
  appearance: string[];
  dimensions: {
    width: string;
    depth: string;
    height: string;
  };
  material: string[];
  interior: string[];
  function: string[];
  cultivationElements?: string[];
  dangerLevel?: string;
  resourceOutputs?: {
    id: string;
    name: string;
    description: string;
  }[];
  npcs?: string[];
}

export const WILDERNESS_BUILDINGS: WildernessBuilding[] = [
  {
    id: 'hunter_hut',
    name: '猎户木屋',
    type: 'hut',
    description: '深山狩猎路径旁的简易木屋，猎人临时歇脚、过夜避雨之所。',
    positionHint: '深山狩猎路径旁（距水源较近）',
    appearance: [
      '简易木屋，圆木垒墙',
      '树皮顶，一窗（方形小窗）一门（木板门）',
      '屋外可能晾晒兽皮'
    ],
    dimensions: {
      width: '一丈二',
      depth: '一丈',
      height: '七尺'
    },
    material: ['圆木', '树皮', '木板'],
    interior: [
      '单间，土灶（靠墙石砌）',
      '木床（铺干草）',
      '墙上挂兽皮与风干肉',
      '墙角放猎叉与弓'
    ],
    function: [
      '猎人临时歇脚',
      '过夜避雨',
      '简单补给'
    ],
    cultivationElements: [
      '屋主可能遗留低阶兽骨',
      '粗浅狩猎笔记'
    ],
    npcs: ['hunter']
  },
  {
    id: 'herbalist_shed',
    name: '采药人草棚',
    type: 'shed',
    description: '灵药生长区附近的极简草棚，便于采药人停留作业。',
    positionHint: '灵药生长区附近（便于停留作业）',
    appearance: [
      '三根木桩架一块油布',
      '极简，四面通风',
      '略显破旧'
    ],
    dimensions: {
      width: '六尺',
      depth: '六尺',
      height: '五尺'
    },
    material: ['木桩', '油布', '干草'],
    interior: [
      '无隔间',
      '地面铺干草',
      '可能有简单的草药晾晒架'
    ],
    function: [
      '遮风避雨',
      '短暂休息',
      '存放采集工具'
    ],
    cultivationElements: [
      '可能遗留采药笔记',
      '药篓或石锄'
    ],
    npcs: ['herbalist']
  },
  {
    id: 'road_pavilion',
    name: '古道凉亭',
    type: 'pavilion',
    description: '古道上每隔十里一处的休息亭，供行人歇脚、避雨、乘凉。',
    positionHint: '古道上每隔十里一处（便于行人歇脚）',
    appearance: [
      '四柱木亭，青瓦顶',
      '内设石凳（沿柱一圈）',
      '亭中有碑（刻亭名与建造年月）',
      '可能有楹联'
    ],
    dimensions: {
      width: '一丈二',
      depth: '一丈二',
      height: '九尺'
    },
    material: ['木柱', '石基', '青瓦'],
    interior: [
      '石凳沿柱一圈',
      '中央石碑',
      '地面石铺'
    ],
    function: [
      '行人歇脚',
      '避雨',
      '乘凉',
      '路标'
    ],
    cultivationElements: [
      '亭柱有时刻有前人留字（诗、感悟或警示）',
      '或刻有粗浅符文（祈福）'
    ]
  },
  {
    id: 'spirit_mine',
    name: '灵石矿洞',
    type: 'mine',
    description: '灵脉附近山体的矿洞，有明显开采痕迹，深处可能有矿兽栖息。',
    positionHint: '灵脉附近的山体（矿脉裸露处）',
    appearance: [
      '洞口不规则（人为扩大）',
      '有明显开采痕迹（凿痕、碎石堆）',
      '洞内黑暗幽深，需照明进入',
      '可能有木架支撑洞口'
    ],
    dimensions: {
      width: '一丈',
      depth: '不定（数丈至数十丈）',
      height: '七尺'
    },
    material: ['岩体', '灵石矿脉', '木架'],
    interior: [
      '洞道蜿蜒',
      '壁面可见灵石矿脉裸露（发微光）',
      '深处可能有积水',
      '木架支撑'
    ],
    function: [
      '开采灵石',
      '探索矿洞'
    ],
    cultivationElements: [
      '洞中可能栖息矿兽（以灵石为食）',
      '可能有前人开采留下的工具（石镐、绳索）'
    ],
    dangerLevel: '中',
    resourceOutputs: [
      { id: 'spirit_stone', name: '灵石', description: '下品至中品灵石' },
      { id: 'associated_ore', name: '伴生矿', description: '铜锡铁等金属矿' }
    ],
    npcs: ['miner']
  },
  {
    id: 'road_stele',
    name: '古道石碑',
    type: 'stele',
    description: '古道旁的里程碑或指路碑，刻有地名、里程或古人题字。',
    positionHint: '古道旁（里程碑）或岔路口（指路碑）',
    appearance: [
      '青石碑，风化严重（棱角磨圆）',
      '半埋于土',
      '碑面刻有文字，部分模糊不清',
      '可能有苔藓覆盖'
    ],
    dimensions: {
      width: '两尺',
      depth: '六寸',
      height: '五尺'
    },
    material: ['青石'],
    interior: [],
    function: [
      '里程碑',
      '指路',
      '纪念'
    ],
    cultivationElements: [
      '可能附有微弱灵力残留（古人刻字时注入的意念）',
      '古老的碑文可能记载历史事件'
    ]
  }
];

export function getWildernessBuildingById(id: string): WildernessBuilding | undefined {
  return WILDERNESS_BUILDINGS.find(b => b.id === id);
}

export function getWildernessBuildingsByType(type: WildernessBuilding['type']): WildernessBuilding[] {
  return WILDERNESS_BUILDINGS.filter(b => b.type === type);
}
