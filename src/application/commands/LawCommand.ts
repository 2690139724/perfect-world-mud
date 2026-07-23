import { ICommandHandler, ICommandContext } from './CommandRouter';
import { ILawDefinition, ILawProgress, LAW_DEFINITIONS, LawType, findLawDefinition, createLawProgress, applyLawEffects } from '../../domain/entities/Law';
import { CultivationRealm, RealmNames } from '../../domain/entities/Player';

export class LawCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['law', '法则', '领悟法则', '查看法则', '修炼法则'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;

    if (action === 'law' || action === '法则' || action === '查看法则') {
      this.showLaws(store, narrative, modalManager);
    } else if (action === '领悟法则') {
      this.beginComprehension(store, narrative, args);
    } else if (action === '修炼法则') {
      this.cultivateLaw(store, narrative, args);
    }
  }

  private showLaws(store: any, narrative: any, modalManager?: any): void {
    const player = store.getState().player;
    const knownLaws = player.laws || [];
    const effects = applyLawEffects(knownLaws);

    if (player.realm < CultivationRealm.SPIRIT) {
      if (!modalManager) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【法则】' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '境界不足！至少需要化灵境才能感悟法则。' });
        return;
      }
      modalManager.showInteractive('法则系统', (container: HTMLElement) => {
        container.innerHTML = '<div class="modal-empty">境界不足！<br/>至少需要化灵境才能感悟法则。</div>';
      }, { width: '500px', height: '300px' });
      return;
    }

    const typeNames: Record<LawType, string> = {
      [LawType.TIME]: '时间法则',
      [LawType.SPACE]: '空间法则',
      [LawType.DESTRUCTION]: '毁灭法则',
      [LawType.LIFE]: '生命法则',
      [LawType.REINCARNATION]: '轮回法则',
      [LawType.DESTINY]: '命运法则',
      [LawType.FIVE_ELEMENTS]: '五行法则',
      [LawType.THUNDER]: '雷霆法则',
      [LawType.SWORD]: '剑道法则',
      [LawType.FIRE]: '火焰法则',
    };

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【法则】' });
      if (knownLaws.length > 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '已领悟法则：' });
        const lawItems = knownLaws.map((law: ILawProgress) => {
          const def = findLawDefinition(law.lawId);
          const progressPercent = (law.progress / law.maxProgress * 100).toFixed(0);
          return {
            label: `${law.name}（${law.level}/${law.maxLevel}）·${progressPercent}%`,
            action: `修炼法则 ${law.lawId}`,
            desc: def?.description || '',
          };
        });
        narrative.pushClickableList('已领悟法则', lawItems);
        if (effects.attackBonus > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `法则总效果：攻击力+${effects.attackBonus.toFixed(0)}` });
        if (effects.defenseBonus > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `法则总效果：防御力+${effects.defenseBonus.toFixed(0)}` });
        if (effects.critBonus > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `法则总效果：暴击率+${(effects.critBonus * 100).toFixed(0)}%` });
        if (effects.specialEffects.length > 0) store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `法则特殊效果：${effects.specialEffects.join('，')}` });
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你尚未领悟任何法则。' });
      }
      this.showAvailableLaws(store, narrative);
      return;
    }

    modalManager.showInteractive('法则系统', (container: HTMLElement) => {
      if (effects.attackBonus > 0 || effects.defenseBonus > 0 || effects.critBonus > 0 || effects.specialEffects.length > 0) {
        const effectsHeader = document.createElement('div');
        effectsHeader.className = 'law-effects';
        const effectLines: string[] = [];
        if (effects.attackBonus > 0) effectLines.push(`攻击力+${effects.attackBonus.toFixed(0)}`);
        if (effects.defenseBonus > 0) effectLines.push(`防御力+${effects.defenseBonus.toFixed(0)}`);
        if (effects.critBonus > 0) effectLines.push(`暴击率+${(effects.critBonus * 100).toFixed(0)}%`);
        if (effects.specialEffects.length > 0) effectLines.push(`特殊效果：${effects.specialEffects.join('，')}`);
        effectsHeader.innerHTML = `<div class="law-effects-title">法则总效果</div><div class="law-effects-list">${effectLines.join(' | ')}</div>`;
        container.appendChild(effectsHeader);
      }

      const knownSection = document.createElement('div');
      knownSection.className = 'law-section';
      knownSection.innerHTML = '<div class="law-section-title">⚡ 已领悟法则</div>';

      if (knownLaws.length > 0) {
        const knownGrid = document.createElement('div');
        knownGrid.className = 'law-grid';

        for (const law of knownLaws) {
          const def = findLawDefinition(law.lawId);
          const progressPercent = (law.progress / law.maxProgress * 100).toFixed(0);
          const isCompleted = law.isCompleted;

          const lawCard = document.createElement('div');
          lawCard.className = `law-card ${isCompleted ? 'completed' : ''}`;
          lawCard.innerHTML = `
            <div class="law-icon">${isCompleted ? '🌌' : '✨'}</div>
            <div class="law-info">
              <div class="law-name">${law.name}</div>
              <div class="law-type">${typeNames[def?.type || LawType.FIVE_ELEMENTS]}</div>
              <div class="law-progress">
                <div class="progress-bar"><div class="progress-fill" style="width: ${progressPercent}%"></div></div>
                <div class="progress-text">${law.level}/${law.maxLevel} · ${progressPercent}%</div>
              </div>
              <div class="law-desc">${def?.description || ''}</div>
            </div>
          `;

          if (!isCompleted) {
            const btn = document.createElement('button');
            btn.className = 'modal-btn modal-btn-primary';
            btn.textContent = '修炼';
            btn.addEventListener('click', () => {
              modalManager.close();
              this.cultivateLaw(store, narrative, [law.lawId]);
            });
            lawCard.appendChild(btn);
          }

          knownGrid.appendChild(lawCard);
        }

        knownSection.appendChild(knownGrid);
      } else {
        knownSection.innerHTML += '<div class="modal-empty">尚未领悟任何法则</div>';
      }

      container.appendChild(knownSection);

      this.showAvailableLaws(store, narrative, modalManager, container);
    }, { width: '650px', height: '500px' });
  }

  private showAvailableLaws(store: any, narrative: any, modalManager?: any, container?: HTMLElement): void {
    const player = store.getState().player;
    const knownLawIds = (player.laws || []).map((l: ILawProgress) => l.lawId);

    const availableLaws = LAW_DEFINITIONS.filter(l => 
      !knownLawIds.includes(l.id) && l.requiredRealm <= player.realm
    );

    const typeNames: Record<LawType, string> = {
      [LawType.TIME]: '时间法则',
      [LawType.SPACE]: '空间法则',
      [LawType.DESTRUCTION]: '毁灭法则',
      [LawType.LIFE]: '生命法则',
      [LawType.REINCARNATION]: '轮回法则',
      [LawType.DESTINY]: '命运法则',
      [LawType.FIVE_ELEMENTS]: '五行法则',
      [LawType.THUNDER]: '雷霆法则',
      [LawType.SWORD]: '剑道法则',
      [LawType.FIRE]: '火焰法则',
    };

    if (!modalManager) {
      if (availableLaws.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n当前境界无可领悟的法则。' });
        return;
      }
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n可领悟法则：' });
      const lawItems = availableLaws.map(law => ({
        label: `${law.name}（${typeNames[law.type]}）`,
        action: `领悟法则 ${law.id}`,
        desc: `${law.description}\n需要境界：${RealmNames[law.requiredRealm]}`,
      }));
      narrative.pushClickableList('可领悟法则', lawItems);
      return;
    }

    if (!container) return;
    if (availableLaws.length === 0) return;

    const availableSection = document.createElement('div');
    availableSection.className = 'law-section';
    availableSection.innerHTML = '<div class="law-section-title">💫 可领悟法则</div>';

    const availableGrid = document.createElement('div');
    availableGrid.className = 'law-grid';

    for (const law of availableLaws) {
      const canComprehend = player.mana >= 50;

      const lawCard = document.createElement('div');
      lawCard.className = `law-card ${canComprehend ? '' : 'disabled'}`;
      lawCard.innerHTML = `
        <div class="law-icon">🔮</div>
        <div class="law-info">
          <div class="law-name">${law.name}</div>
          <div class="law-type">${typeNames[law.type]}</div>
          <div class="law-desc">${law.description}</div>
          <div class="law-req">需要：${RealmNames[law.requiredRealm]} | 法力50</div>
        </div>
      `;

      if (canComprehend) {
        const btn = document.createElement('button');
        btn.className = 'modal-btn modal-btn-primary';
        btn.textContent = '领悟';
        btn.addEventListener('click', () => {
          modalManager.close();
          this.beginComprehension(store, narrative, [law.id]);
        });
        lawCard.appendChild(btn);
      }

      availableGrid.appendChild(lawCard);
    }

    availableSection.appendChild(availableGrid);
    container.appendChild(availableSection);
  }

  private beginComprehension(store: any, narrative: any, args: string[]): void {
    const player = store.getState().player;
    const lawId = args[0];

    if (!lawId) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请指定要领悟的法则！' });
      return;
    }

    const law = findLawDefinition(lawId);
    if (!law) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未找到法则：${lawId}` });
      return;
    }

    const knownLawIds = (player.laws || []).map((l: ILawProgress) => l.lawId);
    if (knownLawIds.includes(lawId)) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${law.name}已经领悟！` });
      return;
    }

    if (law.requiredRealm > player.realm) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `境界不足！需要${RealmNames[law.requiredRealm]}才能领悟。` });
      return;
    }

    if (player.mana < 50) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '法力不足！需要50法力才能开始领悟法则。' });
      return;
    }

    player.mana -= 50;

    const newLaw = createLawProgress(lawId);
    player.laws = [...(player.laws || []), newLaw];

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n━━━━━━━━━━━━━━━━━━━━' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `法则领悟：${law.name}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '━━━━━━━━━━━━━━━━━━━━' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: law.originStory });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你开始领悟这门法则，天地间的法则之力在你眼前若隐若现。' });

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '修炼法则', action: `修炼法则 ${lawId}`, desc: '继续修炼这门法则' },
      { label: '查看法则', action: '法则', desc: '查看所有法则' },
    ];
    narrative.pushClickableList('法则领悟成功', actions);
  }

  private cultivateLaw(store: any, narrative: any, args: string[]): void {
    const player = store.getState().player;
    const lawId = args[0];

    if (!lawId) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请指定要修炼的法则！' });
      return;
    }

    const laws = player.laws || [];
    const law = laws.find((l: ILawProgress) => l.lawId === lawId);
    if (!law) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你还没有领悟${lawId}法则！` });
      return;
    }

    const def = findLawDefinition(lawId);
    if (!def) return;

    if (law.isCompleted) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${law.name}已经修炼到最高境界！` });
      return;
    }

    const cost = 30 + law.level * 10;
    if (player.mana < cost) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `法力不足！需要${cost}法力才能修炼。` });
      return;
    }

    player.mana -= cost;

    const realmMultiplier = (player.realm + 1) / 10;
    const levelMultiplier = (law.level + 1) / law.maxLevel;
    const madnessChance = 0.05 * realmMultiplier * levelMultiplier;

    if (Math.random() < madnessChance) {
      this.handleMadness(store, narrative, player, law, def);
      return;
    }

    const expGain = Math.floor((20 + law.level * 10) * (1 + realmMultiplier * 0.2));
    law.progress += expGain;

    if (law.progress >= law.maxProgress) {
      law.level += 1;
      law.progress = 0;

      if (law.level >= law.maxLevel) {
        law.isCompleted = true;
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n━━━━━━━━━━━━━━━━━━━━` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${law.name}修炼圆满！` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '━━━━━━━━━━━━━━━━━━━━' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你完全掌握了这门法则，法则之力融入你的每一次攻击！' });
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n${law.name}突破至第${law.level}层！` });
      }
    }

    const progressPercent = (law.progress / law.maxProgress * 100).toFixed(0);
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `修炼进度：${law.level}/${law.maxLevel} · ${progressPercent}%` });

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '继续修炼', action: `修炼法则 ${lawId}`, desc: '继续修炼这门法则' },
      { label: '查看法则', action: '法则', desc: '查看所有法则' },
      { label: '查看状态', action: '状态', desc: '查看角色状态' },
    ];
    narrative.pushClickableList('修炼完成', actions);
  }

  private handleMadness(store: any, narrative: any, player: any, law: ILawProgress, def: ILawDefinition): void {
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n⚠️ 走火入魔！⚠️' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `在修炼【${def.name}】时，你迷失在了法则的深渊之中！` });

    const hpLoss = Math.floor(player.maxHp * 0.15);
    const manaLoss = Math.floor(player.maxMana * 0.2);
    
    player.hp = Math.max(1, player.hp - hpLoss);
    player.mana = Math.max(0, player.mana - manaLoss);
    
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `气血受损：-${hpLoss}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `法力紊乱：-${manaLoss}` });

    if (player.hp <= player.maxHp * 0.3) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你身受重伤，需要尽快疗伤！' });
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '强行压制', action: `修炼法则 ${law.lawId}`, desc: '强行压制心魔，继续修炼（风险更高）' },
      { label: '静心调息', action: '状态', desc: '查看当前状态并恢复' },
      { label: '换个法则', action: '法则', desc: '查看其他法则' },
    ];
    narrative.pushClickableList('走火入魔', actions);
  }
}