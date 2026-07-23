import { ICommandHandler, ICommandContext } from './CommandRouter';
import { IForgeRecipe, FORGE_RECIPES, ForgeQuality, FORGE_QUALITY_BONUS, IRuneEngrave, RUNE_ENGRAVES, IBoneRune, BONE_RUNES, BoneRuneGrade, BONE_RUNE_GRADE_COLOR_CLASS, BONE_RUNE_GRADE_STARS, getBoneRunesByRealm } from '../../domain/entities/Forge';
import { CultivationRealm, RealmNames } from '../../domain/entities/Player';
import { EquipmentSlot, ItemType } from '../../domain/entities/Item';

interface IRuneGameState {
  equipmentId: string;
  targetRune: IRuneEngrave;
  sequence: string[];
  currentIndex: number;
  score: number;
}

export class ForgeCommand implements ICommandHandler {
  private runeGameState: IRuneGameState | null = null;

  canHandle(action: string): boolean {
    return ['forge', '炼器', '锻造', 'rune', '符文', 'engrave', '铭刻', '符文铭刻', '符文游戏', '符文点击', '骨文', '骨文刻录', '骨文选择'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;

    if (action === 'forge' || action === '炼器' || action === '锻造') {
      this.showForge(store, narrative, modalManager, args);
    } else if (action === 'rune' || action === '符文') {
      this.showRunes(store, narrative, modalManager, args);
    } else if (action === '骨文' || action === '骨文刻录') {
      if (args.length >= 2) {
        this.tryBoneRuneEngrave(store, narrative, args[0], args[1]);
      } else {
        this.showBoneRunes(store, narrative, modalManager);
      }
    } else if (action === '骨文选择') {
      this.showBoneRunesForEquipment(store, narrative, modalManager, args[0]);
    } else if (action === '符文铭刻') {
      this.startEngrave(store, narrative, args);
    } else if (action === '符文点击') {
      this.handleRuneClick(store, narrative, args);
    }
  }

  private showForge(store: any, narrative: any, modalManager: any, args: string[]): void {
    const player = store.getState().player;
    
    if (player.realm < CultivationRealm.BLOOD_MOVING) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '境界不足，无法炼器！至少需要搬血境。' });
      return;
    }

    if (args.length > 0) {
      const recipeName = args.join(' ');
      this.tryForge(store, narrative, recipeName);
    } else {
      this.showRecipes(store, narrative, modalManager);
    }
  }

  private showRecipes(store: any, narrative: any, modalManager: any): void {
    const player = store.getState().player;
    const availableRecipes = FORGE_RECIPES.filter(r => r.requiredRealm <= player.realm);

    const qualityNames: Record<ForgeQuality, string> = {
      [ForgeQuality.MORTAL]: '凡器',
      [ForgeQuality.SPIRIT]: '灵器',
      [ForgeQuality.DIVINE]: '神器',
      [ForgeQuality.IMMORTAL]: '仙器',
    };

    const slotNames: Record<EquipmentSlot, string> = {
      [EquipmentSlot.WEAPON]: '武器',
      [EquipmentSlot.ARMOR]: '护甲',
      [EquipmentSlot.BOOTS]: '靴子',
      [EquipmentSlot.ACCESSORY]: '饰品',
      [EquipmentSlot.ARTIFACT]: '神器',
    };

    if (!modalManager) {
      if (availableRecipes.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '暂无可用的锻造配方！' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '提升境界可解锁更多配方。' });
        return;
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【炼器术 · 锻造配方】' });
      const recipeItems = availableRecipes.map(recipe => {
        const canCraft = this.hasIngredients(player, recipe);
        const ingredientList = recipe.ingredients.map(ing => {
          const invItem = player.inventory.find((i: any) => i.id === ing.id);
          const count = invItem ? (invItem.stackable || 1) : 0;
          return `${ing.id}（${count}/${ing.amount}）`;
        }).join(' + ');
        const statsText = Object.entries(recipe.baseStats).map(([k, v]) => {
          const statNames: Record<string, string> = { attack: '攻击', defense: '防御', hp: '气血', mana: '法力', speed: '速度' };
          return `${statNames[k] || k}+${v}`;
        }).join(' ');
        return {
          label: `${recipe.name}（${qualityNames[recipe.quality]}·${slotNames[recipe.slot]}）`,
          action: `炼器 ${recipe.name}`,
          desc: `${statsText} | 材料：${ingredientList}${recipe.specialEffect ? ' | ' + recipe.specialEffect : ''} | 基础成功率：${(recipe.successRate * 100).toFixed(0)}%`,
          disabled: !canCraft,
        };
      });
      narrative.pushClickableList('选择配方锻造', recipeItems);
      return;
    }

    modalManager.showInteractive('炼器术 · 锻造配方', (container: HTMLElement) => {
      if (availableRecipes.length === 0) {
        container.innerHTML = '<div class="modal-empty">暂无可用的锻造配方！<br/>提升境界可解锁更多配方。</div>';
        return;
      }

      const recipeList = document.createElement('div');
      recipeList.className = 'forge-recipes';

      for (const recipe of availableRecipes) {
        const canCraft = this.hasIngredients(player, recipe);
        const qualityInfo = FORGE_QUALITY_BONUS[recipe.quality];
        
        const recipeCard = document.createElement('div');
        recipeCard.className = `forge-recipe-card ${canCraft ? '' : 'disabled'}`;
        
        const icon = document.createElement('div');
        icon.className = 'forge-recipe-icon';
        icon.textContent = '⚔️';
        
        const info = document.createElement('div');
        info.className = 'forge-recipe-info';
        
        const nameRow = document.createElement('div');
        nameRow.className = 'forge-recipe-name';
        nameRow.innerHTML = `<span>${recipe.name}</span><span class="forge-quality">${qualityNames[recipe.quality]}</span><span class="forge-slot">${slotNames[recipe.slot]}</span>`;
        info.appendChild(nameRow);
        
        const stats = document.createElement('div');
        stats.className = 'forge-recipe-stats';
        stats.innerHTML = Object.entries(recipe.baseStats).map(([k, v]) => {
          const statNames: Record<string, string> = { attack: '攻击', defense: '防御', hp: '气血', mana: '法力', speed: '速度' };
          return `<span>${statNames[k] || k}+${Math.floor(v * qualityInfo.statMultiplier)}</span>`;
        }).join(' ');
        info.appendChild(stats);
        
        if (recipe.specialEffect) {
          const effect = document.createElement('div');
          effect.className = 'forge-recipe-effect';
          effect.textContent = recipe.specialEffect;
          info.appendChild(effect);
        }
        
        const ingredients = document.createElement('div');
        ingredients.className = 'forge-recipe-ingredients';
        ingredients.innerHTML = '<span class="label">材料：</span>' + recipe.ingredients.map(ing => {
          const invItem = player.inventory.find((i: any) => i.id === ing.id);
          const count = invItem ? (invItem.stackable || 1) : 0;
          const hasEnough = count >= ing.amount;
          return `<span class="${hasEnough ? 'has' : 'missing'}">${ing.id}（${count}/${ing.amount}）</span>`;
        }).join(' + ');
        info.appendChild(ingredients);
        
        const successRate = document.createElement('div');
        successRate.className = 'forge-recipe-success';
        successRate.textContent = `成功率：${((recipe.successRate + qualityInfo.successRateBonus) * 100).toFixed(0)}%`;
        info.appendChild(successRate);
        
        const btn = document.createElement('button');
        btn.className = `modal-btn ${canCraft ? 'modal-btn-primary' : 'modal-btn-disabled'}`;
        btn.textContent = '开始锻造';
        btn.disabled = !canCraft;
        btn.addEventListener('click', () => {
          modalManager.close();
          this.tryForge(store, narrative, recipe.name);
        });
        
        recipeCard.appendChild(icon);
        recipeCard.appendChild(info);
        recipeCard.appendChild(btn);
        recipeList.appendChild(recipeCard);
      }
      
      container.appendChild(recipeList);
    }, { width: '700px', height: '500px' });
  }

  private hasIngredients(player: any, recipe: IForgeRecipe): boolean {
    for (const ing of recipe.ingredients) {
      const item = player.inventory.find((i: any) => i.id === ing.id);
      if (!item) return false;
      const count = item.stackable || 1;
      if (count < ing.amount) return false;
    }
    return true;
  }

  private tryForge(store: any, narrative: any, recipeName: string): void {
    const player = store.getState().player;
    const recipe = FORGE_RECIPES.find(r => r.name === recipeName || r.id === recipeName);

    if (!recipe) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未找到配方：${recipeName}` });
      return;
    }

    if (recipe.requiredRealm > player.realm) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `境界不足！需要${RealmNames[recipe.requiredRealm]}才能锻造此装备。` });
      return;
    }

    if (!this.hasIngredients(player, recipe)) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '材料不足！' });
      const missing = recipe.ingredients.map(ing => {
        const item = player.inventory.find((i: any) => i.id === ing.id);
        const count = item ? (item.stackable || 1) : 0;
        return `${ing.id}（${count}/${ing.amount}）`;
      }).join(', ');
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `所需材料：${missing}` });
      return;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n━━━ 开始锻造【${recipe.name}】━━━` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你点燃锻造炉，将材料投入其中...' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '锤声震天，火星四溅，装备逐渐成型...' });

    const qualityInfo = FORGE_QUALITY_BONUS[recipe.quality];
    const successRate = recipe.successRate + qualityInfo.successRateBonus;
    const isSuccess = Math.random() < successRate;

    if (isSuccess) {
      this.onForgeSuccess(store, narrative, recipe);
    } else {
      this.onForgeFailure(store, narrative, recipe);
    }
  }

  private onForgeSuccess(store: any, narrative: any, recipe: IForgeRecipe): void {
    const player = store.getState().player;
    const qualityInfo = FORGE_QUALITY_BONUS[recipe.quality];

    for (const ing of recipe.ingredients) {
      const idx = player.inventory.findIndex((i: any) => i.id === ing.id);
      if (idx !== -1) {
        const item = player.inventory[idx];
        if (item.stackable && item.stackable > ing.amount) {
          item.stackable -= ing.amount;
        } else {
          player.inventory.splice(idx, 1);
        }
      }
    }

    const qualityNames: Record<ForgeQuality, string> = {
      [ForgeQuality.MORTAL]: '凡器',
      [ForgeQuality.SPIRIT]: '灵器',
      [ForgeQuality.DIVINE]: '神器',
      [ForgeQuality.IMMORTAL]: '仙器',
    };

    const enhancedStats: Record<string, number> = {};
    for (const [k, v] of Object.entries(recipe.baseStats)) {
      enhancedStats[k] = Math.floor(v * qualityInfo.statMultiplier);
    }

    const newItem = {
      id: `forge_${Date.now()}`,
      name: recipe.name,
      type: ItemType.EQUIPMENT,
      quality: qualityNames[recipe.quality],
      desc: recipe.description,
      price: 0,
      stackable: false,
      maxStack: 1,
      icon: '⚔',
      slot: recipe.slot,
      stats: enhancedStats,
      runeSlots: recipe.runeSlots,
      runes: [],
      specialEffect: recipe.specialEffect,
    };

    player.inventory.push(newItem);

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '锻造成功！一件崭新的装备诞生了！' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `获得【${recipe.name}】（${qualityNames[recipe.quality]}）` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `属性：${Object.entries(enhancedStats).map(([k, v]) => {
      const statNames: Record<string, string> = { attack: '攻击', defense: '防御', hp: '气血', mana: '法力', speed: '速度' };
      return `${statNames[k] || k}+${v}`;
    }).join(' ')}` });
    if (recipe.runeSlots > 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `可铭刻符文数：${recipe.runeSlots}` });
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '继续锻造', action: '炼器', desc: '查看配方列表' },
      { label: '铭刻符文', action: '符文', desc: '为装备铭刻符文' },
      { label: '骨文刻录', action: '骨文', desc: '刻录凶兽骨文宝术' },
      { label: '查看背包', action: '背包', desc: '查看物品' },
    ];
    narrative.pushClickableList('锻造完成', actions);
  }

  private onForgeFailure(store: any, narrative: any, recipe: IForgeRecipe): void {
    const player = store.getState().player;

    for (const ing of recipe.ingredients) {
      const idx = player.inventory.findIndex((i: any) => i.id === ing.id);
      if (idx !== -1) {
        const item = player.inventory[idx];
        if (item.stackable && item.stackable > ing.amount) {
          item.stackable -= ing.amount;
        } else {
          player.inventory.splice(idx, 1);
        }
      }
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '锻造失败！材料在炉火中化为灰烬...' });

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '再试一次', action: `炼器 ${recipe.name}`, desc: '重新锻造' },
      { label: '查看配方', action: '炼器', desc: '查看其他配方' },
      { label: '返回状态', action: '状态', desc: '查看角色状态' },
    ];
    narrative.pushClickableList('锻造失败', actions);
  }

  private showRunes(store: any, narrative: any, modalManager: any, args: string[]): void {
    const player = store.getState().player;
    const equipmentWithSlots = player.inventory.filter((i: any) => i.type === ItemType.EQUIPMENT && i.runeSlots && i.runeSlots > 0);

    if (equipmentWithSlots.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '没有可铭刻符文的装备！' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '锻造装备时选择带有符文槽的装备。' });
      return;
    }

    if (args.length > 0) {
      const equipId = args[0];
      this.showRunesForEquipment(store, narrative, modalManager, equipId);
      return;
    }

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【符文铭刻】' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '选择一件装备进行符文铭刻：' });
      const equipItems = equipmentWithSlots.map((equip: any) => ({
        label: `${equip.name}（剩余符文槽：${equip.runeSlots - (equip.runes?.length || 0)}）`,
        action: `符文 ${equip.id}`,
        desc: equip.desc || '',
      }));
      narrative.pushClickableList('可铭刻装备', equipItems);
      return;
    }

    modalManager.showInteractive('符文铭刻 · 选择装备', (container: HTMLElement) => {
      const equipList = document.createElement('div');
      equipList.className = 'rune-equip-list';

      for (const equip of equipmentWithSlots) {
        const remainingSlots = equip.runeSlots - (equip.runes?.length || 0);
        const equipCard = document.createElement('div');
        equipCard.className = 'rune-equip-card';
        
        const icon = document.createElement('div');
        icon.className = 'rune-equip-icon';
        icon.textContent = '🔮';
        
        const info = document.createElement('div');
        info.className = 'rune-equip-info';
        
        const nameRow = document.createElement('div');
        nameRow.className = 'rune-equip-name';
        nameRow.innerHTML = `<span>${equip.name}</span><span class="rune-slots">剩余符文槽：${remainingSlots}</span>`;
        info.appendChild(nameRow);
        
        if (equip.runes && equip.runes.length > 0) {
          const runesRow = document.createElement('div');
          runesRow.className = 'rune-equip-runes';
          runesRow.textContent = `已铭刻：${equip.runes.map((r: any) => r.name).join('、')}`;
          info.appendChild(runesRow);
        }
        
        const btn = document.createElement('button');
        btn.className = `modal-btn ${remainingSlots > 0 ? 'modal-btn-primary' : 'modal-btn-disabled'}`;
        btn.textContent = remainingSlots > 0 ? '选择铭刻' : '符文槽已满';
        btn.disabled = remainingSlots <= 0;
        btn.addEventListener('click', () => {
          modalManager.close();
          this.showRunesForEquipment(store, narrative, modalManager, equip.id);
        });
        
        equipCard.appendChild(icon);
        equipCard.appendChild(info);
        equipCard.appendChild(btn);
        equipList.appendChild(equipCard);
      }
      
      container.appendChild(equipList);
    }, { width: '650px', height: '450px' });
  }

  private showRunesForEquipment(store: any, narrative: any, modalManager: any, equipId: string): void {
    const player = store.getState().player;
    const equipment = player.inventory.find((i: any) => i.id === equipId);
    
    if (!equipment) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '未找到装备！' });
      return;
    }

    const remainingSlots = equipment.runeSlots - (equipment.runes?.length || 0);
    if (remainingSlots <= 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${equipment.name}的符文槽已满！` });
      return;
    }

    const availableRunes = RUNE_ENGRAVES.filter(r => r.requiredRealm <= player.realm);

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【${equipment.name} · 符文铭刻】` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `剩余符文槽：${remainingSlots}` });
      if (equipment.runes && equipment.runes.length > 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '已铭刻符文：' });
        equipment.runes.forEach((rune: any) => {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `  ◆ ${rune.name}` });
        });
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n选择要铭刻的符文：' });
      const runeItems = availableRunes.map(rune => {
        const effects = Object.entries(rune.effect).map(([k, v]) => {
          const effectNames: Record<string, string> = { attackBonus: '攻击', defenseBonus: '防御', critBonus: '暴击', speedBonus: '速度' };
          return `${effectNames[k] || k}+${v}`;
        }).join(' ');
        return {
          label: `${rune.name} — ${effects}`,
          action: `符文铭刻 ${equipId} ${rune.id}`,
          desc: `${rune.description} | 需要${RealmNames[rune.requiredRealm]}`,
        };
      });
      narrative.pushClickableList('可用符文', runeItems);
      return;
    }

    modalManager.showInteractive(`${equipment.name} · 符文铭刻`, (container: HTMLElement) => {
      const header = document.createElement('div');
      header.className = 'rune-header';
      header.innerHTML = `<div>剩余符文槽：${remainingSlots}</div>`;
      container.appendChild(header);

      if (equipment.runes && equipment.runes.length > 0) {
        const existingRunes = document.createElement('div');
        existingRunes.className = 'rune-existing';
        existingRunes.innerHTML = `<div class="rune-existing-title">已铭刻符文</div><div class="rune-existing-list">${equipment.runes.map((r: any) => `<span>◆ ${r.name}</span>`).join(' ')}</div>`;
        container.appendChild(existingRunes);
      }

      const runeList = document.createElement('div');
      runeList.className = 'rune-list';

      for (const rune of availableRunes) {
        const runeCard = document.createElement('div');
        runeCard.className = 'rune-card';
        
        const icon = document.createElement('div');
        icon.className = 'rune-icon';
        icon.textContent = '✦';
        
        const info = document.createElement('div');
        info.className = 'rune-info';
        
        const nameRow = document.createElement('div');
        nameRow.className = 'rune-name';
        nameRow.textContent = rune.name;
        info.appendChild(nameRow);
        
        const effects = document.createElement('div');
        effects.className = 'rune-effects';
        effects.innerHTML = Object.entries(rune.effect).map(([k, v]) => {
          const effectNames: Record<string, string> = { attackBonus: '攻击', defenseBonus: '防御', critBonus: '暴击', speedBonus: '速度' };
          return `<span>${effectNames[k] || k}+${v}</span>`;
        }).join(' ');
        info.appendChild(effects);
        
        const desc = document.createElement('div');
        desc.className = 'rune-desc';
        desc.textContent = `${rune.description} | 需要${RealmNames[rune.requiredRealm]}`;
        info.appendChild(desc);
        
        const btn = document.createElement('button');
        btn.className = 'modal-btn modal-btn-primary';
        btn.textContent = '铭刻';
        btn.addEventListener('click', () => {
          modalManager.close();
          this.startEngrave(store, narrative, [equipId, rune.id]);
        });
        
        runeCard.appendChild(icon);
        runeCard.appendChild(info);
        runeCard.appendChild(btn);
        runeList.appendChild(runeCard);
      }
      
      container.appendChild(runeList);
    }, { width: '650px', height: '450px' });
  }

  private startEngrave(store: any, narrative: any, args: string[]): void {
    const player = store.getState().player;
    const equipId = args[0];
    const runeId = args[1];
    
    const equipment = player.inventory.find((i: any) => i.id === equipId);
    const rune = RUNE_ENGRAVES.find(r => r.id === runeId);
    
    if (!equipment || !rune) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '装备或符文不存在！' });
      return;
    }

    if (player.realm < rune.requiredRealm) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `境界不足！需要${RealmNames[rune.requiredRealm]}才能铭刻此符文。` });
      return;
    }

    const remainingSlots = equipment.runeSlots - (equipment.runes?.length || 0);
    if (remainingSlots <= 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${equipment.name}的符文槽已满！` });
      return;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n━━━ 符文铭刻：${rune.name} ━━━` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你取出符文石，开始为装备铭刻符文...' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '符文能量在你手中流转，需要按正确顺序激活符文节点！' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【符文铭刻小游戏】' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请按顺序点击以下符文节点：' });

    this.runeGameState = {
      equipmentId: equipId,
      targetRune: rune,
      sequence: this.generateRuneSequence(),
      currentIndex: 0,
      score: 0,
    };

    this.showRuneGame(store, narrative);
  }

  private generateRuneSequence(): string[] {
    const runeSymbols = ['天', '地', '玄', '黄', '雷', '火', '水', '风'];
    const length = 3 + Math.floor(Math.random() * 3);
    const sequence: string[] = [];
    for (let i = 0; i < length; i++) {
      sequence.push(runeSymbols[Math.floor(Math.random() * runeSymbols.length)]);
    }
    return sequence;
  }

  private showRuneGame(store: any, narrative: any): void {
    if (!this.runeGameState) return;

    const { sequence, currentIndex } = this.runeGameState;
    const progress = currentIndex / sequence.length;

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n进度：${'█'.repeat(currentIndex)}${'░'.repeat(sequence.length - currentIndex)} ${currentIndex}/${sequence.length}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `目标序列：${sequence.join(' → ')}` });

    const runeSymbols = ['天', '地', '玄', '黄', '雷', '火', '水', '风'];
    const clickableItems = runeSymbols.map(symbol => ({
      label: `▣ ${symbol}`,
      action: `符文点击 ${symbol}`,
      desc: '点击激活符文节点',
    }));

    narrative.pushClickableList('点击符文节点', clickableItems);
  }

  private handleRuneClick(store: any, narrative: any, args: string[]): void {
    if (!this.runeGameState) return;

    const clickedSymbol = args[0];
    const { sequence, currentIndex, equipmentId, targetRune } = this.runeGameState;

    if (clickedSymbol === sequence[currentIndex]) {
      this.runeGameState.currentIndex++;
      this.runeGameState.score++;
      
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `✓ 正确！${clickedSymbol}节点激活成功。` });

      if (this.runeGameState.currentIndex >= sequence.length) {
        this.completeRuneGame(store, narrative, true);
      } else {
        this.showRuneGame(store, narrative);
      }
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `✗ 错误！应该点击${sequence[currentIndex]}，而不是${clickedSymbol}。` });
      
      if (Math.random() < 0.3) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '符文能量失控，装备受到损坏！' });
        const equipment = store.getState().player.inventory.find((i: any) => i.id === equipmentId);
        if (equipment && equipment.stats) {
          for (const stat of Object.keys(equipment.stats)) {
            equipment.stats[stat] = Math.max(1, Math.floor(equipment.stats[stat] * 0.9));
          }
        }
        this.completeRuneGame(store, narrative, false);
      } else {
        this.runeGameState.currentIndex = Math.max(0, currentIndex - 1);
        this.showRuneGame(store, narrative);
      }
    }
  }

  private completeRuneGame(store: any, narrative: any, success: boolean): void {
    if (!this.runeGameState) return;

    const { equipmentId, targetRune, sequence, score } = this.runeGameState;
    const player = store.getState().player;
    const equipment = player.inventory.find((i: any) => i.id === equipmentId);

    if (success) {
      const accuracy = score / sequence.length;
      const effectMultiplier = 0.5 + accuracy * 0.5;

      const appliedRune = {
        ...targetRune,
        effect: Object.fromEntries(
          Object.entries(targetRune.effect).map(([k, v]) => [k, Math.floor(v * effectMultiplier)])
        ),
      };

      if (!equipment.runes) equipment.runes = [];
      equipment.runes.push(appliedRune);

      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n━━━━━━━━━━━━━━━━━━━━' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '符文铭刻成功！' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '━━━━━━━━━━━━━━━━━━━━' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${equipment.name}成功铭刻【${targetRune.name}】！` });
      
      const effects = Object.entries(appliedRune.effect).map(([k, v]) => {
        const effectNames: Record<string, string> = { attackBonus: '攻击', defenseBonus: '防御', critBonus: '暴击', speedBonus: '速度' };
        return `${effectNames[k] || k}+${v}`;
      }).join(' ');
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `铭刻效果：${effects}` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `铭刻准确度：${(accuracy * 100).toFixed(0)}%` });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n━━━━━━━━━━━━━━━━━━━━' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '符文铭刻失败！' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '━━━━━━━━━━━━━━━━━━━━' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '符文能量消散，铭刻失败。' });
    }

    this.runeGameState = null;
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '继续铭刻', action: `符文 ${equipmentId}`, desc: '继续为该装备铭刻' },
      { label: '查看背包', action: '背包', desc: '查看物品' },
      { label: '返回炼器', action: '炼器', desc: '查看锻造配方' },
    ];
    narrative.pushClickableList('铭刻结束', actions);
  }

  // ===== 骨文宝术刻录系统 =====

  private showBoneRunes(store: any, narrative: any, modalManager: any): void {
    const player = store.getState().player;
    const equipmentWithSlots = player.inventory.filter((i: any) =>
      i.type === ItemType.EQUIPMENT && i.runeSlots && i.runeSlots > 0
    );

    if (equipmentWithSlots.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '没有可刻录骨文的装备！' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '需要带有符文槽的装备才能刻录骨文宝术。' });
      return;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【骨文宝术刻录】' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '骨文宝术是从凶兽遗骨中提取的上古宝文，威力远超普通符文。' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '选择一件装备进行骨文刻录：' });

    const equipItems = equipmentWithSlots.map((equip: any) => ({
      label: `${equip.name}（剩余槽位：${equip.runeSlots - (equip.runes?.length || 0) - (equip.boneRunes?.length || 0)}）`,
      action: `骨文选择 ${equip.id}`,
      desc: equip.desc || '',
    }));
    narrative.pushClickableList('可刻录装备', equipItems);
  }

  private showBoneRunesForEquipment(store: any, narrative: any, modalManager: any, equipId: string): void {
    const player = store.getState().player;
    const equipment = player.inventory.find((i: any) => i.id === equipId);

    if (!equipment) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '未找到装备！' });
      return;
    }

    const usedSlots = (equipment.runes?.length || 0) + (equipment.boneRunes?.length || 0);
    const remainingSlots = equipment.runeSlots - usedSlots;
    if (remainingSlots <= 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${equipment.name}的符文槽已满！` });
      return;
    }

    const availableBoneRunes = getBoneRunesByRealm(player.realm);

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【${equipment.name} · 骨文刻录】` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `剩余槽位：${remainingSlots}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n选择要刻录的骨文宝术：' });

    const gradeNames: Record<BoneRuneGrade, string> = {
      [BoneRuneGrade.BEAST]: '遗种骨文',
      [BoneRuneGrade.PURE]: '纯血骨文',
      [BoneRuneGrade.DIVINE]: '神兽骨文',
      [BoneRuneGrade.TEN_FIERCE]: '十凶骨文',
    };

    const boneRuneItems = availableBoneRunes.map(boneRune => {
      const stars = '★'.repeat(BONE_RUNE_GRADE_STARS[boneRune.grade]);
      const effects = this.formatBoneRuneEffects(boneRune);
      const canAfford = this.canAffordBoneRune(player, boneRune);
      return {
        label: `${boneRune.name} ${stars}（${gradeNames[boneRune.grade]}）`,
        action: `骨文刻录 ${equipId} ${boneRune.id}`,
        desc: `${boneRune.description} | 效果：${effects} | 消耗：${this.formatBoneRuneCost(boneRune)}`,
        disabled: !canAfford,
      };
    });
    narrative.pushClickableList('可用骨文宝术', boneRuneItems);
  }

  private formatBoneRuneEffects(boneRune: IBoneRune): string {
    const parts: string[] = [];
    const e = boneRune.effect;
    if (e.attackBonus) parts.push(`攻击+${e.attackBonus}`);
    if (e.defenseBonus) parts.push(`防御+${e.defenseBonus}`);
    if (e.hpBonus) parts.push(`气血+${e.hpBonus}`);
    if (e.manaBonus) parts.push(`法力+${e.manaBonus}`);
    if (e.speedBonus) parts.push(`速度+${e.speedBonus}`);
    if (e.critBonus) parts.push(`暴击+${(e.critBonus * 100).toFixed(0)}%`);
    return parts.join(' ');
  }

  private formatBoneRuneCost(boneRune: IBoneRune): string {
    const parts: string[] = [`${boneRune.cost.gold}金币`];
    for (const mat of boneRune.cost.materials) {
      parts.push(`${mat.id}×${mat.amount}`);
    }
    return parts.join(' + ');
  }

  private canAffordBoneRune(player: any, boneRune: IBoneRune): boolean {
    if (player.gold < boneRune.cost.gold) return false;
    for (const mat of boneRune.cost.materials) {
      const item = player.inventory.find((i: any) => i.id === mat.id);
      if (!item) return false;
      const count = item.stackable || 1;
      if (count < mat.amount) return false;
    }
    return true;
  }

  private tryBoneRuneEngrave(store: any, narrative: any, equipId: string, boneRuneId: string): void {
    const player = store.getState().player;
    const equipment = player.inventory.find((i: any) => i.id === equipId);
    const boneRune = BONE_RUNES.find(r => r.id === boneRuneId);

    if (!equipment || !boneRune) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '装备或骨文不存在！' });
      return;
    }

    if (player.realm < boneRune.requiredRealm) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `境界不足！需要${RealmNames[boneRune.requiredRealm]}才能刻录此骨文。` });
      return;
    }

    const usedSlots = (equipment.runes?.length || 0) + (equipment.boneRunes?.length || 0);
    const remainingSlots = equipment.runeSlots - usedSlots;
    if (remainingSlots <= 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${equipment.name}的符文槽已满！` });
      return;
    }

    if (!this.canAffordBoneRune(player, boneRune)) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '金币或材料不足！' });
      return;
    }

    // 消耗金币和材料
    player.gold -= boneRune.cost.gold;
    for (const mat of boneRune.cost.materials) {
      const idx = player.inventory.findIndex((i: any) => i.id === mat.id);
      if (idx !== -1) {
        const item = player.inventory[idx];
        if (item.stackable && item.stackable > mat.amount) {
          item.stackable -= mat.amount;
        } else {
          player.inventory.splice(idx, 1);
        }
      }
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n━━━ 骨文刻录：${boneRune.name} ━━━` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你取出${boneRune.source}，以灵力提取其中的骨文宝术...` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '遗骨上的上古宝文逐渐浮现，与装备产生共鸣...' });

    // 骨文刻录成功率（十凶骨文成功率较低）
    const gradeSuccessRate: Record<BoneRuneGrade, number> = {
      [BoneRuneGrade.BEAST]: 0.9,
      [BoneRuneGrade.PURE]: 0.75,
      [BoneRuneGrade.DIVINE]: 0.55,
      [BoneRuneGrade.TEN_FIERCE]: 0.35,
    };
    const successRate = gradeSuccessRate[boneRune.grade];

    if (Math.random() < successRate) {
      // 刻录成功
      if (!equipment.boneRunes) equipment.boneRunes = [];
      equipment.boneRunes.push({
        id: boneRune.id,
        name: boneRune.name,
        grade: boneRune.grade,
        effect: { ...boneRune.effect },
        source: boneRune.source,
      });

      const stars = '★'.repeat(BONE_RUNE_GRADE_STARS[boneRune.grade]);
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【骨文刻录成功！】' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${equipment.name} 成功刻录【${boneRune.name}】${stars}！` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `效果：${this.formatBoneRuneEffects(boneRune)}` });
      if (boneRune.effect.specialEffect) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `特殊效果：${boneRune.effect.specialEffect}` });
      }
    } else {
      // 刻录失败
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【骨文刻录失败！】' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '骨文能量暴走，遗骨碎裂消散...' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '材料和金币已消耗。' });
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '继续刻录', action: `骨文选择 ${equipId}`, desc: '继续为该装备刻录骨文' },
      { label: '查看背包', action: '背包', desc: '查看物品' },
      { label: '返回炼器', action: '炼器', desc: '查看锻造配方' },
    ];
    narrative.pushClickableList('骨文刻录结束', actions);
  }
}