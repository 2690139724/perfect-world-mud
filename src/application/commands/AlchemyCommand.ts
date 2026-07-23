import { ICommandHandler, ICommandContext } from './CommandRouter';
import {
  IAlchemyRecipe,
  ALCHEMY_RECIPES,
  PillGrade,
  PillStar,
  PillEffect,
  PILL_GRADE_BONUS,
  PILL_STAR_MULTIPLIER,
  PILL_STAR_NAMES,
  rollPillStar,
  rollPillCount,
  formatPillStars,
} from '../../domain/entities/Alchemy';
import { CultivationRealm, RealmNames } from '../../domain/entities/Player';

interface IAlchemyState {
  recipe: IAlchemyRecipe;
  fireLevel: 'gentle' | 'strong' | 'violent';
  qualityBonus: number;
  explosionRisk: number;
}

export class AlchemyCommand implements ICommandHandler {
  private alchemyState: IAlchemyState | null = null;

  canHandle(action: string): boolean {
    return ['alchemy', '炼丹', '炼药', 'recipe', '配方', '控火', '凝丹', '文火', '武火', '猛火'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;

    if (action === 'alchemy' || action === '炼丹' || action === '炼药') {
      this.showAlchemy(store, narrative, modalManager, args);
    } else if (action === 'recipe' || action === '配方') {
      this.showRecipes(store, narrative, modalManager);
    } else if (action === '文火' || action === '武火' || action === '猛火') {
      this.handleFireControl(store, narrative, action);
    } else if (action === '凝丹') {
      this.finalizePill(store, narrative);
    }
  }

  private showAlchemy(store: any, narrative: any, modalManager: any, args: string[]): void {
    const player = store.getState().player;
    
    if (player.realm < CultivationRealm.BLOOD_MOVING) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '境界不足，无法炼丹！至少需要搬血境。' });
      return;
    }

    if (args.length > 0) {
      const recipeName = args.join(' ');
      this.startAlchemy(store, narrative, recipeName);
    } else {
      this.showRecipes(store, narrative, modalManager);
    }
  }

  private showRecipes(store: any, narrative: any, modalManager: any): void {
    const player = store.getState().player;
    const availableRecipes = ALCHEMY_RECIPES.filter(r => r.requiredRealm <= player.realm);

    if (!modalManager) {
      if (availableRecipes.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '暂无可用的丹方！' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '提升境界可解锁更多丹方。' });
        return;
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【炼丹术 · 丹方列表】' });
      const recipeItems = availableRecipes.map(recipe => {
        const canCraft = this.hasIngredients(player, recipe);
        const ingredientList = recipe.ingredients.map(ing => {
          const invItem = player.inventory.find((i: any) => i.id === ing.id);
          const count = invItem ? (invItem.stackable || 1) : 0;
          return `${ing.id}（${count}/${ing.amount}）`;
        }).join(' + ');
        const gradeStars = '★'.repeat(this.getGradeStars(recipe.grade));
        return {
          label: `${recipe.name} ${gradeStars}（${recipe.grade}）`,
          action: `炼丹 ${recipe.name}`,
          desc: `${recipe.description} | 材料：${ingredientList} | 基础成功率：${(recipe.successRate * 100).toFixed(0)}%`,
          disabled: !canCraft,
        };
      });
      narrative.pushClickableList('选择丹方炼丹', recipeItems);
      return;
    }

    modalManager.showInteractive('炼丹术 · 丹方列表', (container: HTMLElement) => {
      if (availableRecipes.length === 0) {
        container.innerHTML = '<div class="modal-empty">暂无可用的丹方！<br/>提升境界可解锁更多丹方。</div>';
        return;
      }

      const recipeList = document.createElement('div');
      recipeList.className = 'alchemy-recipes';

      for (const recipe of availableRecipes) {
        const canCraft = this.hasIngredients(player, recipe);
        const gradeInfo = PILL_GRADE_BONUS[recipe.grade];
        const gradeClass = this.getGradeClass(recipe.grade);
        const gradeStars = '★'.repeat(this.getGradeStars(recipe.grade));
        
        const recipeCard = document.createElement('div');
        recipeCard.className = `alchemy-recipe-card ${canCraft ? '' : 'disabled'}`;
        
        const icon = document.createElement('div');
        icon.className = `alchemy-recipe-icon ${gradeClass}`;
        icon.textContent = '⚗️';
        
        const info = document.createElement('div');
        info.className = 'alchemy-recipe-info';
        
        const nameRow = document.createElement('div');
        nameRow.className = 'alchemy-recipe-name';
        nameRow.innerHTML = `<span>${recipe.name}</span><span class="alchemy-quality ${gradeClass}">${recipe.grade} ${gradeStars}</span>`;
        info.appendChild(nameRow);
        
        const desc = document.createElement('div');
        desc.className = 'alchemy-recipe-desc';
        desc.textContent = recipe.description;
        info.appendChild(desc);
        
        const stats = document.createElement('div');
        stats.className = 'alchemy-recipe-stats';
        stats.innerHTML = `<span>成功率：${((recipe.successRate + gradeInfo.successRateBonus) * 100).toFixed(0)}%</span>`;
        info.appendChild(stats);
        
        const ingredients = document.createElement('div');
        ingredients.className = 'alchemy-recipe-ingredients';
        ingredients.innerHTML = '<span class="label">材料：</span>' + recipe.ingredients.map(ing => {
          const invItem = player.inventory.find((i: any) => i.id === ing.id);
          const count = invItem ? (invItem.stackable || 1) : 0;
          const hasEnough = count >= ing.amount;
          return `<span class="${hasEnough ? 'has' : 'missing'}">${ing.id}（${count}/${ing.amount}）</span>`;
        }).join(' + ');
        info.appendChild(ingredients);
        
        const btn = document.createElement('button');
        btn.className = `modal-btn ${canCraft ? 'modal-btn-primary' : 'modal-btn-disabled'}`;
        btn.textContent = '开始炼制';
        btn.disabled = !canCraft;
        btn.addEventListener('click', () => {
          modalManager.close();
          this.startAlchemy(store, narrative, recipe.name);
        });
        
        recipeCard.appendChild(icon);
        recipeCard.appendChild(info);
        recipeCard.appendChild(btn);
        recipeList.appendChild(recipeCard);
      }
      
      container.appendChild(recipeList);
    }, { width: '700px', height: '500px' });
  }

  private getGradeClass(grade: PillGrade): string {
    const classMap: Record<PillGrade, string> = {
      [PillGrade.MORTAL]: 'pill-grade-mortal',
      [PillGrade.SPIRIT]: 'pill-grade-spirit',
      [PillGrade.TREASURE]: 'pill-grade-treasure',
      [PillGrade.SAINT]: 'pill-grade-saint',
      [PillGrade.DIVINE]: 'pill-grade-divine',
      [PillGrade.IMMORTAL]: 'pill-grade-immortal',
      [PillGrade.EMPEROR]: 'pill-grade-emperor',
    };
    return classMap[grade] || 'pill-grade-mortal';
  }

  private getGradeStars(grade: PillGrade): number {
    const stars: Record<PillGrade, number> = {
      [PillGrade.MORTAL]: 1,
      [PillGrade.SPIRIT]: 2,
      [PillGrade.TREASURE]: 3,
      [PillGrade.SAINT]: 4,
      [PillGrade.DIVINE]: 5,
      [PillGrade.IMMORTAL]: 6,
      [PillGrade.EMPEROR]: 7,
    };
    return stars[grade] || 1;
  }

  private hasIngredients(player: any, recipe: IAlchemyRecipe): boolean {
    for (const ing of recipe.ingredients) {
      const item = player.inventory.find((i: any) => i.id === ing.id);
      if (!item) return false;
      const count = item.stackable || 1;
      if (count < ing.amount) return false;
    }
    return true;
  }

  private startAlchemy(store: any, narrative: any, recipeName: string): void {
    const player = store.getState().player;
    const recipe = ALCHEMY_RECIPES.find(r => r.name === recipeName || r.id === recipeName);

    if (!recipe) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未找到丹方：${recipeName}` });
      return;
    }

    if (recipe.requiredRealm > player.realm) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `境界不足！需要${RealmNames[recipe.requiredRealm]}才能炼制此丹。` });
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

    const gradeStars = '★'.repeat(this.getGradeStars(recipe.grade));

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n━━━ 开始炼制【${recipe.name}】${gradeStars}（${recipe.grade}）━━━` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你取出丹炉，将材料一一放入其中...' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '灵力注入丹炉，火焰升腾，材料开始熔化...' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【第二阶段：控火】' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '丹药星级取决于火候控制，请选择合适的火力：' });

    this.alchemyState = {
      recipe,
      fireLevel: 'strong',
      qualityBonus: 0,
      explosionRisk: 0,
    };

    narrative.pushClickableList('选择火力', [
      { label: '🔥 文火', action: '文火', desc: '温和稳定，成功率+15%，出高星概率略低' },
      { label: '🔥🔥 武火', action: '武火', desc: '均衡火力，正常成功率，正常星级（推荐）' },
      { label: '🔥🔥🔥 猛火', action: '猛火', desc: '强力高温，成功率-10%，出高星概率+20%，炸炉风险+15%' },
    ]);
  }

  private handleFireControl(store: any, narrative: any, fireType: string): void {
    if (!this.alchemyState) return;

    const recipe = this.alchemyState.recipe;

    switch (fireType) {
      case '文火':
        this.alchemyState.fireLevel = 'gentle';
        this.alchemyState.qualityBonus = -0.05;
        this.alchemyState.explosionRisk = -0.15;
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n你调整灵力输出，火焰变得温和而稳定...' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '丹炉内温度平稳上升，材料缓缓熔化融合。' });
        break;
      case '武火':
        this.alchemyState.fireLevel = 'strong';
        this.alchemyState.qualityBonus = 0;
        this.alchemyState.explosionRisk = 0;
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n你控制灵力，保持均衡的火力...' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '丹炉内温度适中，材料完美融合。' });
        break;
      case '猛火':
        this.alchemyState.fireLevel = 'violent';
        this.alchemyState.qualityBonus = 0.2;
        this.alchemyState.explosionRisk = 0.15;
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n你全力输出灵力，火焰变得狂暴而炽热！' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '丹炉内温度急剧上升，材料迅速熔化！' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '警告：丹炉开始轻微晃动，有炸炉风险！' });
        break;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【第三阶段：凝丹】' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '材料已完全融合，现在需要将其凝聚成丹！' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你需要集中精神，引导灵力将药液凝聚成型。' });

    narrative.pushClickableList('炼丹操作', [
      { label: '✨ 开始凝丹', action: '凝丹', desc: '引导灵力凝聚丹药' },
    ]);
  }

  private finalizePill(store: any, narrative: any): void {
    if (!this.alchemyState) return;

    const player = store.getState().player;
    const { recipe, qualityBonus, explosionRisk } = this.alchemyState;
    const gradeInfo = PILL_GRADE_BONUS[recipe.grade];

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n你集中精神，引导灵力缓缓凝聚...' });
    
    const baseSuccessRate = recipe.successRate + gradeInfo.successRateBonus;
    const finalSuccessRate = baseSuccessRate + (qualityBonus < 0 ? -qualityBonus : 0) + explosionRisk;
    
    const explosionChance = Math.max(0, explosionRisk);
    if (Math.random() < explosionChance) {
      this.handleExplosion(store, narrative, recipe);
      return;
    }

    const isSuccess = Math.random() < finalSuccessRate;

    if (isSuccess) {
      this.onCraftSuccess(store, narrative, recipe, qualityBonus);
    } else {
      this.onCraftFailure(store, narrative, recipe);
    }

    this.alchemyState = null;
  }

  private handleExplosion(store: any, narrative: any, recipe: IAlchemyRecipe): void {
    const player = store.getState().player;

    for (const ing of recipe.ingredients) {
      const idx = player.inventory.findIndex((i: any) => i.id === ing.id);
      if (idx !== -1) {
        player.inventory.splice(idx, 1);
      }
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '砰！！！' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '丹炉承受不住高温，轰然炸开！' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你被爆炸波及，气血受损！' });
    
    const damage = Math.floor(player.maxHp * 0.2);
    player.hp = Math.max(1, player.hp - damage);
    
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `受到 ${damage} 点伤害！` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '所有材料化为飞灰...' });

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '查看状态', action: '状态', desc: '查看角色状态' },
      { label: '查看丹方', action: '炼丹', desc: '查看其他丹方' },
    ];
    narrative.pushClickableList('炸炉了！', actions);
  }

  private onCraftSuccess(store: any, narrative: any, recipe: IAlchemyRecipe, qualityBonus: number): void {
    const player = store.getState().player;
    const gradeInfo = PILL_GRADE_BONUS[recipe.grade];
    const alchemyLevel = player.alchemySkill?.level || 1;

    const star = rollPillStar(qualityBonus, alchemyLevel);
    const starMult = PILL_STAR_MULTIPLIER[star];
    const pillCount = rollPillCount(recipe.baseCount || 1, star);
    const finalEffectBonus = gradeInfo.effectBonus + qualityBonus;
    const effectValue = Math.floor(recipe.effect.value * finalEffectBonus * starMult);

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

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '丹药成型！一缕药香弥漫开来...' });

    const starStr = formatPillStars(star);
    const starName = PILL_STAR_NAMES[star];

    if (star === PillStar.THREE) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【上品丹成！】${recipe.name} ${starStr}（${starName}${recipe.grade}）品质上佳，药效远超寻常！` });
    } else if (star === PillStar.TWO) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【中品】成功炼制${recipe.name} ${starStr}（${starName}${recipe.grade}），品质中规中矩。` });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【下品】${recipe.name} ${starStr}（${starName}${recipe.grade}）品质欠佳，药效有所折扣。` });
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `成丹数量：${pillCount} 颗` });

    const effectName = this.getEffectName(recipe.effect.type);
    const duration = recipe.effect.duration ? `，持续${Math.floor(recipe.effect.duration / 1000)}秒` : '';
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `单颗效果：${effectName} ${effectValue}${duration}` });

    const expGain = this.gainAlchemyExp(player, recipe, star);
    if (expGain > 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `炼丹术经验 +${expGain}` });
      if (player.alchemySkill.exp >= player.alchemySkill.maxExp) {
        player.alchemySkill.level += 1;
        player.alchemySkill.exp -= player.alchemySkill.maxExp;
        player.alchemySkill.maxExp = Math.floor(player.alchemySkill.maxExp * 1.5);
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `炼丹术等级提升！当前等级：${player.alchemySkill.level}级` });
      }
    }

    const totalEffectValue = effectValue * pillCount;
    const resultPayload: { success: boolean; expGain?: number; hpGain?: number; manaGain?: number } = { success: true };

    if (recipe.effect.type === PillEffect.EXP_BOOST) {
      resultPayload.expGain = totalEffectValue;
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n你服用全部丹药，获得 ${totalEffectValue} 修为！` });
    } else if (recipe.effect.type === PillEffect.HEAL) {
      resultPayload.hpGain = totalEffectValue;
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n你服用全部丹药，恢复 ${totalEffectValue} 气血！` });
    } else if (recipe.effect.type === PillEffect.MANA_RESTORE) {
      resultPayload.manaGain = totalEffectValue;
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n你服用全部丹药，恢复 ${totalEffectValue} 法力！` });
    }

    store.dispatch({ type: 'ALCHEMY_RESULT', payload: resultPayload });
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '继续炼丹', action: '炼丹', desc: '查看丹方列表' },
      { label: '查看背包', action: '背包', desc: '查看物品' },
      { label: '返回状态', action: '状态', desc: '查看角色状态' },
    ];
    narrative.pushClickableList('炼丹完成', actions);
  }

  private gainAlchemyExp(player: any, recipe: IAlchemyRecipe, star: PillStar): number {
    if (!player.alchemySkill) return 0;
    const gradeMult: Record<PillGrade, number> = {
      [PillGrade.MORTAL]: 1,
      [PillGrade.SPIRIT]: 2,
      [PillGrade.TREASURE]: 3,
      [PillGrade.SAINT]: 5,
      [PillGrade.DIVINE]: 8,
      [PillGrade.IMMORTAL]: 12,
      [PillGrade.EMPEROR]: 18,
    };
    const starBonus: Record<PillStar, number> = {
      [PillStar.ONE]: 0.6,
      [PillStar.TWO]: 1,
      [PillStar.THREE]: 1.6,
    };
    const baseExp = 10 * (gradeMult[recipe.grade] || 1);
    const exp = Math.floor(baseExp * (starBonus[star] || 1));
    player.alchemySkill.exp += exp;
    return exp;
  }

  private onCraftFailure(store: any, narrative: any, recipe: IAlchemyRecipe): void {
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

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '丹炉一阵晃动，丹药化为飞灰...' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `炼制失败！材料已消耗。` });

    if (recipe.failureProduct) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `获得残渣：${recipe.failureProduct.id}×${recipe.failureProduct.amount}` });
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '再试一次', action: `炼丹 ${recipe.name}`, desc: '重新炼制此丹' },
      { label: '查看丹方', action: '炼丹', desc: '查看其他丹方' },
      { label: '返回状态', action: '状态', desc: '查看角色状态' },
    ];
    narrative.pushClickableList('炼丹失败', actions);
  }

  private getEffectName(effect: PillEffect): string {
    const names: Record<PillEffect, string> = {
      [PillEffect.HEAL]: '恢复气血',
      [PillEffect.MANA_RESTORE]: '恢复法力',
      [PillEffect.EXP_BOOST]: '增加修为',
      [PillEffect.ATTACK_BOOST]: '提升攻击',
      [PillEffect.DEFENSE_BOOST]: '提升防御',
      [PillEffect.SPEED_BOOST]: '提升速度',
      [PillEffect.CRIT_BOOST]: '提升暴击',
      [PillEffect.REALM_BOOST]: '助力突破',
    };
    return names[effect];
  }
}
