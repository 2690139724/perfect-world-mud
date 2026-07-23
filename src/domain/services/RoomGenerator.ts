import { IRoom, TerrainType, IExit, IMonsterSpawn, IResourceNode } from '../entities/Room';
import { SeedRandom } from '../../infrastructure/random/SeedRandom';

export class RoomGenerator {
  private terrainWeights: Record<TerrainType, number> = {
    [TerrainType.PLAIN]: 30,
    [TerrainType.FOREST]: 35,
    [TerrainType.MOUNTAIN]: 20,
    [TerrainType.SWAMP]: 15,
    [TerrainType.DESERT]: 10,
    [TerrainType.VOLCANO]: 5,
    [TerrainType.RUIN]: 8,
    [TerrainType.CAVE]: 12,
    [TerrainType.WATER]: 6,
    [TerrainType.SNOW]: 4,
    [TerrainType.SPECIAL]: 3,
  };

  constructor(private rng: SeedRandom) {}

  generateRoom(id: string, depth: number, parent?: IRoom): IRoom {
    const terrain = this.chooseTerrain(depth);
    const [name, desc] = this.generateNameAndDesc(terrain, depth);
    const spirit = Math.min(100, 20 + depth * 2 + this.rng.nextInt(-10, 10));
    const exits = this.generateExits(depth, parent);
    const monsters = this.generateMonsters(depth);
    const resources = this.generateResources(depth);

    return {
      id,
      name,
      description: desc,
      terrain,
      spiritDensity: Math.max(0, spirit),
      exits,
      monsters,
      resources,
      npcs: [],
      isSafeZone: false,
      visited: false,
      firstVisited: 0,
      dynamicEvents: [],
      zoneId: '',
    };
  }

  private chooseTerrain(depth: number): TerrainType {
    const adjustedWeights: Record<TerrainType, number> = { ...this.terrainWeights };
    if (depth > 20) {
      adjustedWeights[TerrainType.VOLCANO] += 10;
      adjustedWeights[TerrainType.SWAMP] += 10;
      adjustedWeights[TerrainType.RUIN] += 15;
    }
    if (depth > 50) {
      adjustedWeights[TerrainType.CAVE] += 20;
      adjustedWeights[TerrainType.DESERT] += 10;
    }
    const total = Object.values(adjustedWeights).reduce((a, b) => a + b, 0);
    let rand = this.rng.next() * total;
    for (const [terrain, weight] of Object.entries(adjustedWeights)) {
      rand -= weight;
      if (rand <= 0) return terrain as TerrainType;
    }
    return TerrainType.FOREST;
  }

  private generateExits(depth: number, parent?: IRoom): IExit[] {
    const exits: IExit[] = [];
    if (parent) {
      const backDir = this.getOppositeDirection(parent.exits[0]?.direction || '南');
      exits.push({
        direction: backDir,
        targetId: parent.id,
        condition: undefined,
        isHidden: false,
        travelCost: 0,
      });
    }
    const dirs = ['北', '南', '东', '西', '东北', '西北', '东南', '西南'];
    const count = this.rng.nextInt(2, 5);
    for (let i = 0; i < count; i++) {
      const dir = dirs[this.rng.nextInt(0, dirs.length - 1)];
      if (!exits.some(e => e.direction === dir)) {
        const hidden = this.rng.next() < 0.08;
        exits.push({
          direction: dir,
          targetId: null,
          condition: hidden ? '需敏锐感知' : undefined,
          isHidden: hidden,
          travelCost: 0,
        });
      }
    }
    return exits;
  }

  private generateMonsters(depth: number): IMonsterSpawn[] {
    const count = depth > 30 ? this.rng.nextInt(1, 3) : this.rng.nextInt(0, 2);
    const monsters: IMonsterSpawn[] = [];
    for (let i = 0; i < count; i++) {
      const level = Math.max(1, Math.floor(depth / 5) + 1);
      monsters.push({
        monsterId: `monster_lv${level}_${this.rng.nextInt(1, 5)}`,
        minCount: 1,
        maxCount: this.rng.nextInt(1, Math.min(4, 1 + Math.floor(depth / 20))),
        spawnWeight: 100,
        respawnTime: 180 + this.rng.nextInt(0, 300),
      });
    }
    return monsters;
  }

  private generateResources(depth: number): IResourceNode[] {
    const count = this.rng.nextInt(0, 2);
    const resources: IResourceNode[] = [];
    const resIds = ['spirit_herb', 'blood_flower', 'iron_ore', 'spring_water', 'lingzhi', 'dragon_herb'];
    for (let i = 0; i < count; i++) {
      resources.push({
        resourceId: resIds[this.rng.nextInt(0, resIds.length - 1)],
        amount: this.rng.nextInt(1, 3 + Math.floor(depth / 10)),
        respawnTime: 300 + this.rng.nextInt(0, 600),
        harvestDifficulty: Math.max(1, Math.floor(depth / 15) + 1),
      });
    }
    return resources;
  }

  private generateNameAndDesc(terrain: TerrainType, depth: number): [string, string] {
    const prefixes = ['苍', '黑', '赤', '青', '白', '黄', '紫', '玄', '幽', '冥'];
    const suffixes: Record<TerrainType, string[]> = {
      [TerrainType.PLAIN]: ['原', '野', '坪', '甸'],
      [TerrainType.FOREST]: ['林', '森', '樾', '麓'],
      [TerrainType.MOUNTAIN]: ['山', '岭', '峰', '峦'],
      [TerrainType.SWAMP]: ['泽', '沼', '荡', '洼'],
      [TerrainType.DESERT]: ['漠', '沙', '碛', '砾'],
      [TerrainType.VOLCANO]: ['火脉', '熔岩地', '赤谷', '炎崖'],
      [TerrainType.RUIN]: ['废墟', '遗迹', '断垣', '古垒'],
      [TerrainType.CAVE]: ['洞', '窟', '穴', '隧'],
      [TerrainType.WATER]: ['湖', '泽', '潭', '渊'],
      [TerrainType.SNOW]: ['雪原', '冰谷', '寒岭', '霜野'],
      [TerrainType.SPECIAL]: ['秘境', '禁地', '灵脉', '仙山'],
    };
    const suffixList = suffixes[terrain] || ['地'];
    const prefix = prefixes[this.rng.nextInt(0, prefixes.length - 1)];
    const suffix = suffixList[this.rng.nextInt(0, suffixList.length - 1)];
    const name = `${prefix}${suffix}` + (depth > 20 ? '·深处' : '');

    const descTemplates: Record<TerrainType, string[]> = {
      [TerrainType.PLAIN]: ['一望无际的平原，风吹草低见牛羊。', '地势平坦，视野开阔。'],
      [TerrainType.FOREST]: ['古木参天，藤蔓缠绕，阳光透过叶隙洒下斑驳光影。', '密林深处传来不知名野兽的低吼。'],
      [TerrainType.MOUNTAIN]: ['陡峭的山路蜿蜒而上，山风呼啸。', '岩石嶙峋，云雾缭绕山腰。'],
      [TerrainType.SWAMP]: ['泥泞不堪，水汽弥漫，空气中带着腐朽的气息。', '沼泽中不时冒起气泡。'],
      [TerrainType.DESERT]: ['黄沙漫天，热浪滚滚，远处有沙丘起伏。', '干旱的土地上寸草不生。'],
      [TerrainType.VOLCANO]: ['地面龟裂，热气蒸腾，远处有熔岩缓缓流淌。', '空气中弥漫着硫磺的气味。'],
      [TerrainType.RUIN]: ['残垣断壁，荒草丛生，昔日辉煌已成往事。', '石柱上隐约可见古老符文。'],
      [TerrainType.CAVE]: ['幽暗深邃，水声滴答，寒意从深处袭来。', '洞壁上有不知名的发光苔藓。'],
      [TerrainType.WATER]: ['碧波荡漾，水光潋滟，水草在清澈的水中摇曳。', '水面泛起微微涟漪。'],
      [TerrainType.SNOW]: ['白雪皑皑，寒风刺骨，天地间一片苍茫。', '冰挂如剑悬于崖壁。'],
      [TerrainType.SPECIAL]: ['灵气浓郁，天地异象，这里似乎蕴藏着某种神秘的力量。', '流光溢彩，异香扑鼻，这是一处非凡之地。'],
    };
    const descs = descTemplates[terrain] || ['一片未知的土地。'];
    const desc = descs[this.rng.nextInt(0, descs.length - 1)] + (depth > 30 ? ' 这里似乎蕴藏着某种古老的力量。' : '');
    return [name, desc];
  }

  private getOppositeDirection(dir: string): string {
    const map: Record<string, string> = {
      '北': '南', '南': '北', '东': '西', '西': '东',
      '东北': '西南', '西南': '东北', '西北': '东南', '东南': '西北'
    };
    return map[dir] || '南';
  }
}