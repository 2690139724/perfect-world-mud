import { IMonster } from '../../domain/entities/Monster';

export class MonsterRepository {
  private monsters: Map<string, IMonster> = new Map();

  constructor() {
    this.loadDefaultMonsters();
  }

  find(id: string): IMonster | undefined {
    const monster = this.monsters.get(id);
    return monster ? { ...monster, hp: monster.maxHp } : undefined;
  }

  findAll(): IMonster[] {
    return Array.from(this.monsters.values());
  }

  findByLevel(level: number): IMonster[] {
    return Array.from(this.monsters.values()).filter(m => m.level === level);
  }

  findByZone(zoneId: string): IMonster[] {
    return Array.from(this.monsters.values()).filter(m => m.id.startsWith(zoneId));
  }

  register(monster: IMonster): void {
    this.monsters.set(monster.id, monster);
  }

  private loadDefaultMonsters(): void {
    const monsters: IMonster[] = [
      {
        id: 'wild_wolf',
        name: '野狼',
        level: 1,
        hp: 30, maxHp: 30,
        attack: 8, defense: 3, speed: 10,
        expValue: 15,
        drops: [
          { itemId: 'wolf_skin', chance: 0.4, minCount: 1, maxCount: 1 },
          { itemId: 'leather_armor', chance: 0.05, minCount: 1, maxCount: 1 },
        ],
        description: '一头普通的荒原野狼，灰毛竖立，目光凶悍。',
        race: '妖兽',
        skills: ['撕咬'],
        aiType: 'normal',
      },
      {
        id: 'poison_snake',
        name: '碧磷蛇',
        level: 2,
        hp: 25, maxHp: 25,
        attack: 10, defense: 2, speed: 12,
        expValue: 20,
        drops: [{ itemId: 'snake_venom', chance: 0.3, minCount: 1, maxCount: 1 }],
        description: '通体碧绿的毒蛇，吞吐着猩红的信子。',
        race: '妖兽',
        skills: ['毒牙'],
        aiType: 'normal',
      },
      {
        id: 'stone_beast',
        name: '石巨人',
        level: 3,
        hp: 60, maxHp: 60,
        attack: 12, defense: 8, speed: 4,
        expValue: 30,
        drops: [{ itemId: 'stone_core', chance: 0.3, minCount: 1, maxCount: 1 }, { itemId: 'iron_sword', chance: 0.08, minCount: 1, maxCount: 1 }],
        description: '由岩石构成的巨人，行动缓慢但力大无穷。',
        race: '精怪',
        skills: ['巨石投掷'],
        aiType: 'shield',
      },
      {
        id: 'wind_hawk',
        name: '风隼',
        level: 2,
        hp: 20, maxHp: 20,
        attack: 9, defense: 2, speed: 15,
        expValue: 18,
        drops: [
          { itemId: 'hawk_feather', chance: 0.5, minCount: 1, maxCount: 2 },
          { itemId: 'cloth_boots', chance: 0.06, minCount: 1, maxCount: 1 },
        ],
        description: '凶猛的猛禽，双翅展开可遮天蔽日。',
        race: '妖兽',
        skills: ['俯冲'],
        aiType: 'charge',
      },
      {
        id: 'swamp_crocodile',
        name: '沼泽鳄',
        level: 3,
        hp: 50, maxHp: 50,
        attack: 14, defense: 6, speed: 5,
        expValue: 28,
        drops: [
          { itemId: 'croc_scale', chance: 0.4, minCount: 1, maxCount: 1 },
          { itemId: 'scale_armor', chance: 0.05, minCount: 1, maxCount: 1 },
        ],
        description: '潜伏在沼泽中的巨鳄，皮糙肉厚，咬合力惊人。',
        race: '妖兽',
        skills: ['死亡翻滚'],
        aiType: 'charge',
      },
      {
        id: 'wandering_soul',
        name: '游魂',
        level: 4,
        hp: 35, maxHp: 35,
        attack: 15, defense: 1, speed: 8,
        expValue: 35,
        drops: [{ itemId: 'soul_fragment', chance: 0.2, minCount: 1, maxCount: 1 }],
        description: '古战场上游荡的残魂，散发着阴冷的气息。',
        race: '亡灵',
        skills: ['夺魄'],
        aiType: 'summon',
      },
      {
        id: 'spirit_fox',
        name: '灵狐',
        level: 3,
        hp: 28, maxHp: 28,
        attack: 11, defense: 4, speed: 14,
        expValue: 25,
        drops: [{ itemId: 'fox_spirit_orb', chance: 0.15, minCount: 1, maxCount: 1 }],
        description: '修炼有成的灵狐，身姿轻盈，眼中有灵光闪烁。',
        race: '妖兽',
        skills: ['幻惑'],
        aiType: 'summon',
      },
      {
        id: 'shadow_bat',
        name: '暗影蝠',
        level: 2,
        hp: 18, maxHp: 18,
        attack: 7, defense: 2, speed: 16,
        expValue: 16,
        drops: [{ itemId: 'bat_wing', chance: 0.3, minCount: 1, maxCount: 1 }],
        description: '洞穴深处的巨型蝙蝠，在黑暗中无声飞行。',
        race: '妖兽',
        skills: ['超声'],
        aiType: 'normal',
      },
      {
        id: 'cave_serpent',
        name: '洞穴巨蟒',
        level: 4,
        hp: 55, maxHp: 55,
        attack: 16, defense: 5, speed: 7,
        expValue: 38,
        drops: [{ itemId: 'serpent_scale', chance: 0.4, minCount: 1, maxCount: 1 }],
        description: '盘踞在洞穴深处的巨蟒，浑身覆盖着坚硬的鳞片。',
        race: '妖兽',
        skills: ['缠绕', '毒牙'],
        aiType: 'charge',
      },
      {
        id: 'ancient_guardian',
        name: '上古守卫',
        level: 6,
        hp: 80, maxHp: 80,
        attack: 20, defense: 12, speed: 3,
        expValue: 60,
        drops: [
          { itemId: 'ancient_bone', chance: 0.5, minCount: 1, maxCount: 1 },
          { itemId: 'spirit_crystal', chance: 0.3, minCount: 1, maxCount: 2 },
          { itemId: 'bone_sword', chance: 0.08, minCount: 1, maxCount: 1 },
        ],
        description: '被古代阵法唤醒的石像守卫，身上刻满了玄奥的符文。',
        race: '精怪',
        skills: ['符文冲击', '石肤'],
        aiType: 'shield',
      },
    ];

    for (const monster of monsters) {
      this.register(monster);
    }
  }
}