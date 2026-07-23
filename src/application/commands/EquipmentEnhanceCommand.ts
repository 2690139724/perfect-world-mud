import { ICommandHandler, ICommandContext } from './CommandRouter';
import { SpiritPersonality, SPIRIT_PERSONALITY_COLOR_CLASS, rollSpiritType, generateSpiritName, getSpiritMaxExp, getSpiritLevelBonus, ISpiritType } from '../../domain/entities/Forge';

export class EquipmentEnhanceCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['enhance', '强化', '分解', '装备强化', '装备分解', '强化装备', '器灵', '器灵觉醒', '觉醒器灵'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;

    if (action === 'enhance' || action === '强化' || action === '装备强化') {
      this.showEnhanceMenu(store, narrative, modalManager);
    } else if (action === '分解' || action === '装备分解') {
      this.showDecomposeMenu(store, narrative, modalManager);
    } else if (action === '强化装备') {
      this.enhanceEquipment(store, narrative, args);
    } else if (action === '器灵' || action === '器灵觉醒') {
      this.showSpiritMenu(store, narrative);
    } else if (action === '觉醒器灵') {
      this.awakenSpirit(store, narrative, args[0]);
    }
  }

  private showEnhanceMenu(store: any, narrative: any, modalManager: any): void {
    const player = store.getState().player;
    const equipSlots = ['weapon', 'armor', 'helmet', 'boots', 'accessory'];
    const slotNames: Record<string, string> = {
      weapon: '武器',
      armor: '护甲',
      helmet: '头盔',
      boots: '靴子',
      accessory: '饰品',
    };

    const equippedItems = equipSlots.map(slot => ({
      slot,
      name: slotNames[slot],
      item: player.equipment[slot],
    })).filter(e => e.item);

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【装备强化】' });

      if (equippedItems.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有装备任何物品！' });
        return;
      }

      const enhanceItems = equippedItems.map(e => {
        const currentLevel = e.item.enhanceLevel || 0;
        const cost = this.calculateEnhanceCost(currentLevel);
        return {
          label: `${e.item.name}（${e.name}）·+${currentLevel}`,
          action: `强化装备 ${e.slot}`,
          desc: `强化费用：${cost}金币`,
          disabled: player.gold < cost,
        };
      });

      narrative.pushClickableList('可强化装备', enhanceItems);
      return;
    }

    modalManager.showInteractive('装备强化', (container: HTMLElement) => {
      if (equippedItems.length === 0) {
        container.innerHTML = '<div class="modal-empty">你还没有装备任何物品！</div>';
        return;
      }

      const enhanceList = document.createElement('div');
      enhanceList.className = 'enhance-list';

      for (const e of equippedItems) {
        const currentLevel = e.item.enhanceLevel || 0;
        const cost = this.calculateEnhanceCost(currentLevel);
        const canEnhance = player.gold >= cost && currentLevel < 10;

        const itemCard = document.createElement('div');
        itemCard.className = `enhance-card ${canEnhance ? '' : 'disabled'}`;
        itemCard.innerHTML = `
          <div class="enhance-icon">${this.getSlotIcon(e.slot)}</div>
          <div class="enhance-info">
            <div class="enhance-name">${e.item.name}</div>
            <div class="enhance-slot">${e.name}</div>
            <div class="enhance-level">强化等级：+${currentLevel}</div>
            <div class="enhance-cost">强化费用：${cost}金币</div>
          </div>
        `;

        if (canEnhance) {
          const btn = document.createElement('button');
          btn.className = 'modal-btn modal-btn-primary';
          btn.textContent = '强化';
          btn.addEventListener('click', () => {
            modalManager.close();
            this.enhanceEquipment(store, narrative, [e.slot]);
          });
          itemCard.appendChild(btn);
        }

        enhanceList.appendChild(itemCard);
      }

      container.appendChild(enhanceList);

      const tips = document.createElement('div');
      tips.className = 'enhance-tips';
      tips.innerHTML = '<div>💡 强化等级最高为+10，强化有概率失败</div>';
      container.appendChild(tips);
    }, { width: '600px', height: '450px' });
  }

  private enhanceEquipment(store: any, narrative: any, args: string[]): void {
    const slot = args[0];
    if (!slot) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请指定要强化的装备槽位！' });
      return;
    }

    const player = store.getState().player;
    const item = player.equipment[slot];
    if (!item) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '该槽位没有装备！' });
      return;
    }

    const currentLevel = item.enhanceLevel || 0;
    if (currentLevel >= 10) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${item.name}已经强化到最高等级！` });
      return;
    }

    const cost = this.calculateEnhanceCost(currentLevel);
    if (player.gold < cost) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `金币不足！需要${cost}金币。` });
      return;
    }

    player.gold -= cost;

    const successRate = Math.max(0.3, 1 - currentLevel * 0.07);
    const isSuccess = Math.random() < successRate;

    if (isSuccess) {
      item.enhanceLevel = currentLevel + 1;
      this.applyEnhanceBonus(item);

      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n✨ ${item.name}强化成功！当前等级：+${item.enhanceLevel}` });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n❌ ${item.name}强化失败！` });
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '继续强化', action: `强化装备 ${slot}`, desc: '再次强化这件装备' },
      { label: '查看强化', action: '强化', desc: '查看所有可强化装备' },
    ];
    narrative.pushClickableList('强化完成', actions);
  }

  private calculateEnhanceCost(level: number): number {
    return Math.floor(50 * Math.pow(1.5, level));
  }

  private applyEnhanceBonus(item: any): void {
    const level = item.enhanceLevel || 0;
    const bonus = level * 0.1;

    // 第一次强化时缓存原始基础值（避免后续强化基于已加成值计算）
    if (item.baseAttack === undefined) item.baseAttack = item.attack || 0;
    if (item.baseDefense === undefined) item.baseDefense = item.defense || 0;
    if (item.baseMaxHp === undefined) item.baseMaxHp = item.maxHp || 0;

    if (item.attack) item.attack = Math.floor(item.baseAttack * (1 + bonus));
    if (item.defense) item.defense = Math.floor(item.baseDefense * (1 + bonus));
    if (item.maxHp) item.maxHp = Math.floor(item.baseMaxHp * (1 + bonus));
  }

  private getSlotIcon(slot: string): string {
    const icons: Record<string, string> = {
      weapon: '⚔️',
      armor: '🛡️',
      helmet: '⛑️',
      boots: '👢',
      accessory: '💍',
    };
    return icons[slot] || '📦';
  }

  private showDecomposeMenu(store: any, narrative: any, modalManager: any): void {
    const player = store.getState().player;
    const decomposeableItems = player.inventory.filter((item: any) => 
      item.type === 'equipment' || item.type === 'weapon'
    );

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【装备分解】' });

      if (decomposeableItems.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '背包中没有可分解的装备！' });
        return;
      }

      const decomposeItems = decomposeableItems.map((item: any) => ({
        label: item.name,
        action: `分解 ${item.id}`,
        desc: `品质：${item.quality || '普通'}`,
      }));

      narrative.pushClickableList('可分解装备', decomposeItems);
      return;
    }

    modalManager.showInteractive('装备分解', (container: HTMLElement) => {
      if (decomposeableItems.length === 0) {
        container.innerHTML = '<div class="modal-empty">背包中没有可分解的装备！</div>';
        return;
      }

      const decomposeList = document.createElement('div');
      decomposeList.className = 'decompose-list';

      for (const item of decomposeableItems) {
        const materials = this.getDecomposeResult(item);

        const itemCard = document.createElement('div');
        itemCard.className = 'decompose-card';
        itemCard.innerHTML = `
          <div class="decompose-icon">📦</div>
          <div class="decompose-info">
            <div class="decompose-name">${item.name}</div>
            <div class="decompose-quality">品质：${item.quality || '普通'}</div>
            <div class="decompose-result">分解获得：${materials.join('、')}</div>
          </div>
        `;

        const btn = document.createElement('button');
        btn.className = 'modal-btn modal-btn-secondary';
        btn.textContent = '分解';
        btn.addEventListener('click', () => {
          this.decomposeItem(store, narrative, item);
          modalManager.close();
        });

        itemCard.appendChild(btn);
        decomposeList.appendChild(itemCard);
      }

      container.appendChild(decomposeList);
    }, { width: '600px', height: '450px' });
  }

  private decomposeItem(store: any, narrative: any, item: any): void {
    const player = store.getState().player;
    const idx = player.inventory.findIndex((i: any) => i.id === item.id);
    if (idx !== -1) {
      player.inventory.splice(idx, 1);
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n你分解了【${item.name}】！` });

    const materials = this.getDecomposeResult(item);
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `获得材料：${materials.join('、')}` });

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '继续分解', action: '分解', desc: '查看其他可分解装备' },
      { label: '查看背包', action: '背包', desc: '查看背包物品' },
    ];
    narrative.pushClickableList('分解完成', actions);
  }

  private getDecomposeResult(item: any): string[] {
    const quality = item.quality || '普通';
    const results: string[] = [];

    switch (quality) {
      case '凡品':
        results.push('碎铁x1');
        break;
      case '良品':
        results.push('碎铁x2', '灵石x1');
        break;
      case '上品':
        results.push('精钢x1', '灵石x2');
        break;
      case '极品':
        results.push('精钢x2', '灵石x5', '玄铁x1');
        break;
      case '神器':
        results.push('玄铁x2', '灵石x10', '神铁x1');
        break;
      default:
        results.push('碎铁x1');
    }

    return results;
  }

  // ===== 器灵觉醒系统 =====

  private showSpiritMenu(store: any, narrative: any): void {
    const player = store.getState().player;
    const equipSlots = ['weapon', 'armor', 'helmet', 'boots', 'accessory'];
    const slotNames: Record<string, string> = {
      weapon: '武器',
      armor: '护甲',
      helmet: '头盔',
      boots: '靴子',
      accessory: '饰品',
    };

    const equippedItems = equipSlots.map(slot => ({
      slot,
      name: slotNames[slot],
      item: player.equipment[slot],
    })).filter(e => e.item);

    if (equippedItems.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有装备任何物品！' });
      return;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【器灵觉醒】' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '装备强化至+5以上时，可尝试觉醒器灵。' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '器灵有不同性格，觉醒后可成长，赋予装备特殊能力。' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n选择装备查看器灵状态：' });

    const spiritItems = equippedItems.map(e => {
      const enhanceLevel = e.item.enhanceLevel || 0;
      const hasSpirit = !!e.item.spirit;
      const canAwaken = enhanceLevel >= 5 && !hasSpirit;

      let desc: string;
      if (hasSpirit) {
        desc = `器灵：${e.item.spirit.name}（${e.item.spirit.personality}）· Lv.${e.item.spirit.level}`;
      } else if (canAwaken) {
        desc = `强化+${enhanceLevel}·可觉醒器灵！消耗1000金币`;
      } else {
        desc = `强化+${enhanceLevel}·需强化至+5才能觉醒器灵`;
      }

      return {
        label: `${e.item.name}（${e.name}）`,
        action: canAwaken ? `觉醒器灵 ${e.slot}` : '',
        desc,
        disabled: !canAwaken,
      };
    });

    narrative.pushClickableList('器灵觉醒', spiritItems);
  }

  private awakenSpirit(store: any, narrative: any, slot: string): void {
    const player = store.getState().player;
    const item = player.equipment[slot];

    if (!item) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '该槽位没有装备！' });
      return;
    }

    const enhanceLevel = item.enhanceLevel || 0;
    if (enhanceLevel < 5) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '装备强化等级不足！需要+5以上才能觉醒器灵。' });
      return;
    }

    if (item.spirit) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${item.name}已经觉醒了器灵！` });
      return;
    }

    const cost = 1000;
    if (player.gold < cost) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `金币不足！需要${cost}金币。` });
      return;
    }

    player.gold -= cost;

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n━━━ 器灵觉醒：${item.name} ━━━` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你以灵力温养装备，注入神识...' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '装备微微震动，似乎有什么东西正在苏醒...' });

    // 觉醒成功率：强化等级越高成功率越高
    const awakenRate = Math.min(0.9, 0.3 + (enhanceLevel - 5) * 0.1);

    if (Math.random() < awakenRate) {
      const spiritType = rollSpiritType();
      const spiritName = generateSpiritName(spiritType.namePrefix, item.name);

      item.spirit = {
        name: spiritName,
        personality: spiritType.personality,
        level: 1,
        exp: 0,
        maxExp: getSpiritMaxExp(1),
        effect: { ...spiritType.effect },
        awakenCount: 1,
      };

      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【器灵觉醒成功！】' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${item.name}绽放神光，一道虚影从中浮现！` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `器灵名号：${spiritName}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `性格：${spiritType.personality} — ${spiritType.description}` });

      const effectParts: string[] = [];
      const e = spiritType.effect;
      if (e.attackBonus) effectParts.push(`攻击+${e.attackBonus}`);
      if (e.defenseBonus) effectParts.push(`防御+${e.defenseBonus}`);
      if (e.hpBonus) effectParts.push(`气血+${e.hpBonus}`);
      if (e.speedBonus) effectParts.push(`速度+${e.speedBonus}`);
      if (e.critBonus) effectParts.push(`暴击+${(e.critBonus * 100).toFixed(0)}%`);
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `器灵效果：${effectParts.join(' ')}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `特殊能力：${e.specialEffect}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '器灵将通过战斗积累经验成长，等级提升后效果增强。' });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【器灵觉醒失败】' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '神识消散，器灵未能觉醒...金币已消耗。' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '可再次尝试，提升装备强化等级可增加成功率。' });
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '查看器灵', action: '器灵', desc: '查看所有装备器灵状态' },
      { label: '继续强化', action: '强化', desc: '强化装备提升觉醒率' },
      { label: '返回状态', action: '状态', desc: '查看角色状态' },
    ];
    narrative.pushClickableList('器灵觉醒结束', actions);
  }
}