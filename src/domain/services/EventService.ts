import { IPlayer } from '../entities/Player';
import { IItem, ItemType } from '../entities/Item';
import { getItemById } from '../../data/seed/items';

export interface IGameEvent {
  id: string;
  type: 'treasure' | 'herb' | 'ancient' | 'trap' | 'merchant' | 'cultivation_spot';
  title: string;
  description: string;
  options: IEventOption[];
}

export interface IEventOption {
  label: string;
  action: (player: IPlayer) => { message: string; rewards?: string[] };
}

export class EventService {
  private static currentEvent: IGameEvent | null = null;

  static getCurrentEvent(): IGameEvent | null {
    return this.currentEvent;
  }

  static clearEvent(): void {
    this.currentEvent = null;
  }

  static rollEvent(roomId: string, isSafeZone: boolean, player: IPlayer): IGameEvent | null {
    // 安全区不触发事件
    if (isSafeZone) return null;

    // 20% 概率触发
    if (Math.random() > 0.2) return null;

    // 已经触发事件了不重复触发
    if (this.currentEvent) return null;

    const events = this.getEventPool(player);
    const event = events[Math.floor(Math.random() * events.length)];
    this.currentEvent = event;
    return event;
  }

  private static getEventPool(player: IPlayer): IGameEvent[] {
    return [
      {
        id: 'treasure_box',
        type: 'treasure',
        title: '发现宝箱',
        description: '路边草丛中有一个古朴的木箱，上面布满了灰尘。',
        options: [
          {
            label: '打开宝箱',
            action: (p: IPlayer) => {
              const gold = 10 + Math.floor(Math.random() * 30);
              p.gold += gold;
              const extra: string[] = [];
              if (Math.random() < 0.3) {
                const items = ['heal_potion', 'mana_potion'].map(id => getItemById(id)).filter((i): i is IItem => i !== undefined);
                const item = { ...items[Math.floor(Math.random() * items.length)] };
                p.inventory.push(item);
                extra.push(`获得 ${item.name} ×1`);
              }
              return { message: `你打开了宝箱，获得 ${gold} 原始币。${extra.join('')}` };
            },
          },
          {
            label: '小心离开',
            action: () => ({ message: '你谨慎地离开了，什么都没有发生。' }),
          },
        ],
      },
      {
        id: 'spirit_herb',
        type: 'herb',
        title: '发现灵药',
        description: '石缝中长着一株晶莹剔透的灵草，散发着淡淡的光芒。',
        options: [
          {
            label: '采摘灵草',
            action: (p: IPlayer) => {
              const exp = 20 + Math.floor(Math.random() * 40);
              p.cultivationExp += exp;
              return { message: `你小心翼翼地摘下灵草，炼化后获得 ${exp} 修为。` };
            },
          },
          {
            label: '连根带走',
            action: (p: IPlayer) => {
              const exp = 10 + Math.floor(Math.random() * 20);
              p.cultivationExp += exp;
              const herb: IItem = {
                id: 'spirit_herb', name: '灵草', type: ItemType.MATERIAL, quality: '凡品',
                desc: '蕴含灵气的药草，是炼丹的基础材料。', price: 5,
                stackable: true, maxStack: 99, icon: '¶',
              };
              p.inventory.push(herb);
              return { message: `你连根挖起灵草，获得 ${exp} 修为，并得到一株灵草。` };
            },
          },
        ],
      },
      {
        id: 'ancient_remnant',
        type: 'ancient',
        title: '古迹传承',
        description: '一块残破的石碑立在路边，上面刻着古老的符文，隐约有灵力波动。',
        options: [
          {
            label: '参悟石碑',
            action: (p: IPlayer) => {
              const exp = 30 + Math.floor(Math.random() * 50);
              p.cultivationExp += exp;
              return { message: `你静心参悟石碑上的符文，有所领悟，修为 +${exp}。` };
            },
          },
          {
            label: '刻录符文',
            action: (p: IPlayer) => {
              const exp = 15 + Math.floor(Math.random() * 25);
              p.cultivationExp += exp;
              if (p.attack < 30) {
                p.attack += 2;
                return { message: `你将符文刻录在脑海中，修为 +${exp}，攻击 +2。` };
              }
              return { message: `你将符文刻录在脑海中，修为 +${exp}。` };
            },
          },
        ],
      },
      {
        id: 'wild_trap',
        type: 'trap',
        title: '陷阱！',
        description: '你一脚踩空，触发了隐藏在落叶下的陷阱！',
        options: [
          {
            label: '硬抗',
            action: (p: IPlayer) => {
              const dmg = Math.floor(p.maxHp * 0.15);
              p.hp = Math.max(1, p.hp - dmg);
              return { message: `你被陷阱击中，损失 ${dmg} 气血。` };
            },
          },
          {
            label: '闪避',
            action: (p: IPlayer) => {
              if (Math.random() < 0.4 + p.speed * 0.01) {
                return { message: '你身形敏捷，险之又险地避开了陷阱！' };
              }
              const dmg = Math.floor(p.maxHp * 0.1);
              p.hp = Math.max(1, p.hp - dmg);
              return { message: `闪避失败，被陷阱刮伤，损失 ${dmg} 气血。` };
            },
          },
        ],
      },
      {
        id: 'cultivation_spot',
        type: 'cultivation_spot',
        title: '灵气汇聚之地',
        description: '此处灵气异常浓郁，是一处难得的修炼宝地。',
        options: [
          {
            label: '就地修炼',
            action: (p: IPlayer) => {
              const exp = 40 + Math.floor(Math.random() * 60);
              p.cultivationExp += exp;
              return { message: `你盘膝而坐，吸收天地灵气，修为 +${exp}。` };
            },
          },
          {
            label: '布置聚灵阵',
            action: (p: IPlayer) => {
              const exp = 60 + Math.floor(Math.random() * 80);
              p.cultivationExp += exp;
              p.mana = Math.min(p.maxMana, p.mana + 20);
              return { message: `你简单布置了一个聚灵阵，修炼效果大增，修为 +${exp}，法力恢复 20。` };
            },
          },
        ],
      },
      {
        id: 'wandering_merchant_simple',
        type: 'merchant',
        title: '游方商贩',
        description: '一个背着大包裹的行脚商人看到你，热情地打招呼："道友来得正好，我这有好东西！"',
        options: [
          {
            label: '购买回春丹（15枚）',
            action: (p: IPlayer) => {
              if (p.gold < 15) return { message: '你摸了摸口袋，原始币不够。' };
              p.gold -= 15;
              const item = { ...getItemById('heal_potion')! };
              p.inventory.push(item);
              return { message: `你支付 15 枚，购买了一枚回春丹。` };
            },
          },
          {
            label: '购买培元丹（30枚）',
            action: (p: IPlayer) => {
              if (p.gold < 30) return { message: '你摸了摸口袋，原始币不够。' };
              p.gold -= 30;
              const item = { ...getItemById('exp_pill')! };
              p.inventory.push(item);
              return { message: `你支付 30 枚，购买了一枚培元丹。` };
            },
          },
          {
            label: '不予理会',
            action: () => ({ message: '你摆摆手，继续赶路。' }),
          },
        ],
      },
    ];
  }
}