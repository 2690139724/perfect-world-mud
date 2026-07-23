import { ICommandHandler, ICommandContext } from './CommandRouter';
import { IMount, MOUNTS, MountTier, getMountSpeedBonus, getMountAttackBonus, getMountDefenseBonus, getMountEvolution, getIntimacyLabel, MOUNT_TIER_STARS } from '../../domain/entities/Mount';
import { CultivationRealm, RealmNames } from '../../domain/entities/Player';

export class MountCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['mount', '坐骑', 'ride', '骑乘', 'dismount', '下马', '灵兽进化', '进化', '培养'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, narrative, modalManager } = context;

    if (action === 'mount' || action === '坐骑') {
      this.showMounts(store, narrative, modalManager, args);
    } else if (action === 'ride' || action === '骑乘') {
      this.mount(store, narrative, args);
    } else if (action === 'dismount' || action === '下马') {
      this.dismount(store, narrative);
    } else if (action === '灵兽进化' || action === '进化' || action === '培养') {
      this.showEvolutionMenu(store, narrative, args);
    } else if (action === '进化确认') {
      this.confirmEvolution(store, narrative, args[0]);
    }
  }

  private showMounts(store: any, narrative: any, modalManager: any, args: string[]): void {
    const player = store.getState().player;
    
    if (player.realm < CultivationRealm.BLOOD_MOVING) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '境界不足，无法驾驭坐骑！至少需要搬血境。' });
      return;
    }

    const tierColors: Record<MountTier, string> = {
      [MountTier.COMMON]: '普通',
      [MountTier.RARE]: '稀有',
      [MountTier.EPIC]: '史诗',
      [MountTier.LEGEND]: '传说',
      [MountTier.MYTH]: '神话',
    };

    if (!player.mounts || player.mounts.length === 0) {
      if (!modalManager) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有坐骑！' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '可在石城兽栏购买灵兽作为坐骑。' });
        this.showAvailableMounts(store, narrative);
        return;
      }

      modalManager.showInteractive('坐骑系统', (container: HTMLElement) => {
        container.innerHTML = '<div class="modal-empty">你还没有坐骑！<br/>可在石城兽栏购买灵兽作为坐骑。</div>';
        const buyBtn = document.createElement('button');
        buyBtn.className = 'modal-btn modal-btn-primary';
        buyBtn.textContent = '购买坐骑';
        buyBtn.addEventListener('click', () => {
          modalManager.close();
          this.showAvailableMounts(store, narrative, modalManager);
        });
        container.appendChild(buyBtn);
      }, { width: '500px', height: '300px' });
      return;
    }

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【坐骑】' });
      const mountItems = player.mounts.map((mount: IMount) => {
        const speed = getMountSpeedBonus(mount);
        const attack = getMountAttackBonus(mount);
        const defense = getMountDefenseBonus(mount);
        const isMounted = mount.isMounted;
        return {
          label: `${mount.name}（${tierColors[mount.tier]}·${isMounted ? '已骑乘' : '未骑乘'}）`,
          action: isMounted ? `下马` : `骑乘 ${mount.name}`,
          desc: `等级${mount.level} | 速度+${speed} | 攻击+${attack} | 防御+${defense}${mount.canFly ? ' | 可飞行' : ''}`,
        };
      });
      narrative.pushClickableList('你的坐骑', mountItems);
      const actions = [
        { label: '购买新坐骑', action: '坐骑购买', desc: '在兽栏购买灵兽' },
        { label: '灵兽进化', action: '灵兽进化', desc: '培养灵兽进化升阶' },
        { label: '查看坐骑图鉴', action: '坐骑图鉴', desc: '查看所有可获得的坐骑' },
      ];
      narrative.pushClickableList('坐骑操作', actions);
      return;
    }

    modalManager.showInteractive('坐骑系统', (container: HTMLElement) => {
      const mountList = document.createElement('div');
      mountList.className = 'mount-list';

      for (const mount of player.mounts) {
          const speed = getMountSpeedBonus(mount);
          const attack = getMountAttackBonus(mount);
          const defense = getMountDefenseBonus(mount);
          const isMounted = mount.isMounted;
          const tierLabel = tierColors[mount.tier as MountTier] || '普通';

          const mountCard = document.createElement('div');
          mountCard.className = `mount-card ${isMounted ? 'mounted' : ''}`;
          mountCard.innerHTML = `
            <div class="mount-icon">${mount.canFly ? '🦅' : '🐴'}</div>
            <div class="mount-info">
              <div class="mount-name">${mount.name} <span class="mount-tier">${tierLabel}</span></div>
              <div class="mount-status">${isMounted ? '已骑乘' : '未骑乘'}</div>
              <div class="mount-stats">等级${mount.level} | 速度+${speed} | 攻击+${attack} | 防御+${defense}${mount.canFly ? ' | 可飞行' : ''}</div>
            </div>
          `;

        const btn = document.createElement('button');
        btn.className = `modal-btn ${isMounted ? 'modal-btn-secondary' : 'modal-btn-primary'}`;
        btn.textContent = isMounted ? '下马' : '骑乘';
        btn.addEventListener('click', () => {
          modalManager.close();
          if (isMounted) {
            this.dismount(store, narrative);
          } else {
            this.mount(store, narrative, [mount.name]);
          }
        });

        mountCard.appendChild(btn);
        mountList.appendChild(mountCard);
      }

      container.appendChild(mountList);

      const actionsSection = document.createElement('div');
      actionsSection.className = 'mount-actions';

      const buyBtn = document.createElement('button');
      buyBtn.className = 'modal-btn modal-btn-secondary';
      buyBtn.textContent = '购买新坐骑';
      buyBtn.addEventListener('click', () => {
        modalManager.close();
        this.showAvailableMounts(store, narrative, modalManager);
      });

      actionsSection.appendChild(buyBtn);
      container.appendChild(actionsSection);
    }, { width: '600px', height: '450px' });
  }

  private showAvailableMounts(store: any, narrative: any, modalManager?: any): void {
    const player = store.getState().player;
    const ownedIds = (player.mounts || []).map((m: IMount) => m.id);

    const tierColors: Record<MountTier, string> = {
      [MountTier.COMMON]: '普通',
      [MountTier.RARE]: '稀有',
      [MountTier.EPIC]: '史诗',
      [MountTier.LEGEND]: '传说',
      [MountTier.MYTH]: '神话',
    };

    const availableMounts = MOUNTS.filter(m => m.requiredRealm <= player.realm && !ownedIds.includes(m.id));

    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【可购买的坐骑】' });
      const mountItems = availableMounts.map(mount => {
        const price = this.calculateMountPrice(mount);
        const canBuy = player.gold >= price;
        return {
          label: `${mount.name}（${tierColors[mount.tier]}）— ${price}金币`,
          action: `坐骑购买 ${mount.id}`,
          desc: `${mount.description} | 需要${RealmNames[mount.requiredRealm]} | 速度+${mount.baseSpeed} | ${mount.canFly ? '可飞行' : '陆地坐骑'}`,
          disabled: !canBuy,
        };
      });
      if (mountItems.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '暂无可购买的坐骑。' });
        return;
      }
      narrative.pushClickableList('可购买的坐骑', mountItems);
      return;
    }

    if (availableMounts.length === 0) {
      modalManager.showInteractive('坐骑购买', (container: HTMLElement) => {
        container.innerHTML = '<div class="modal-empty">暂无可购买的坐骑。</div>';
      }, { width: '500px', height: '300px' });
      return;
    }

    modalManager.showInteractive('坐骑购买', (container: HTMLElement) => {
      const mountList = document.createElement('div');
      mountList.className = 'mount-list';

      for (const mount of availableMounts) {
        const price = this.calculateMountPrice(mount);
        const canBuy = player.gold >= price;

        const mountCard = document.createElement('div');
        mountCard.className = `mount-card ${canBuy ? '' : 'disabled'}`;
        mountCard.innerHTML = `
          <div class="mount-icon">${mount.canFly ? '🦅' : '🐴'}</div>
          <div class="mount-info">
            <div class="mount-name">${mount.name} <span class="mount-tier">${tierColors[mount.tier]}</span></div>
            <div class="mount-price">💰 ${price} 金币</div>
            <div class="mount-stats">${mount.description} | 需要${RealmNames[mount.requiredRealm]} | 速度+${mount.baseSpeed} | ${mount.canFly ? '可飞行' : '陆地坐骑'}</div>
          </div>
        `;

        if (canBuy) {
          const btn = document.createElement('button');
          btn.className = 'modal-btn modal-btn-primary';
          btn.textContent = '购买';
          btn.addEventListener('click', () => {
            modalManager.close();
            this.buyMount(store, narrative, [mount.id]);
          });
          mountCard.appendChild(btn);
        }

        mountList.appendChild(mountCard);
      }

      container.appendChild(mountList);
    }, { width: '650px', height: '450px' });
  }

  private calculateMountPrice(mount: IMount): number {
    const tierMultiplier: Record<MountTier, number> = {
      [MountTier.COMMON]: 1,
      [MountTier.RARE]: 2,
      [MountTier.EPIC]: 4,
      [MountTier.LEGEND]: 8,
      [MountTier.MYTH]: 20,
    };
    return (mount.baseSpeed + mount.baseAttack + mount.baseDefense) * 10 * tierMultiplier[mount.tier];
  }

  private buyMount(store: any, narrative: any, args: string[]): void {
    const player = store.getState().player;
    const mountId = args[0];

    const mountDef = MOUNTS.find(m => m.id === mountId);
    if (!mountDef) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未找到坐骑：${mountId}` });
      return;
    }

    const price = this.calculateMountPrice(mountDef);
    if (player.gold < price) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `金币不足！需要${price}金币。` });
      return;
    }

    if (mountDef.requiredRealm > player.realm) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `境界不足！需要${RealmNames[mountDef.requiredRealm]}才能驾驭。` });
      return;
    }

    player.gold -= price;

    const newMount: IMount = {
      id: `${mountId}_${Date.now()}`,
      name: mountDef.name,
      tier: mountDef.tier,
      description: mountDef.description,
      originStory: mountDef.originStory,
      requiredRealm: mountDef.requiredRealm,
      baseSpeed: mountDef.baseSpeed,
      baseAttack: mountDef.baseAttack,
      baseDefense: mountDef.baseDefense,
      skills: mountDef.skills || [],
      canFly: mountDef.canFly,
      isMounted: false,
      level: 1,
      exp: 0,
    };

    player.mounts = [...(player.mounts || []), newMount];

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n你购买了【${mountDef.name}】！` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: mountDef.originStory });
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '骑乘', action: `骑乘 ${mountDef.name}`, desc: '骑乘新坐骑' },
      { label: '查看坐骑', action: '坐骑', desc: '查看坐骑列表' },
    ];
    narrative.pushClickableList('购买成功', actions);
  }

  private mount(store: any, narrative: any, args: string[]): void {
    const player = store.getState().player;
    const mountName = args.join(' ');

    if (!player.mounts || player.mounts.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有坐骑！' });
      return;
    }

    const mount = player.mounts.find((m: IMount) => m.name === mountName);
    if (!mount) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `未找到坐骑：${mountName}` });
      return;
    }

    if (mount.isMounted) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${mount.name}已经是骑乘状态！` });
      return;
    }

    mount.isMounted = true;
    const speedBonus = getMountSpeedBonus(mount);
    const attackBonus = getMountAttackBonus(mount);
    const defenseBonus = getMountDefenseBonus(mount);

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n你翻身上马，骑乘【${mount.name}】！` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: mount.originStory });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `骑乘效果：速度+${speedBonus}，攻击+${attackBonus}，防御+${defenseBonus}` });
    if (mount.canFly) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你驾驭坐骑翱翔于天际！' });
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '下马', action: '下马', desc: '取消骑乘' },
      { label: '查看状态', action: '状态', desc: '查看角色状态' },
      { label: '查看坐骑', action: '坐骑', desc: '查看坐骑列表' },
    ];
    narrative.pushClickableList('骑乘成功', actions);
  }

  private dismount(store: any, narrative: any): void {
    const player = store.getState().player;

    if (!player.mounts || player.mounts.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有坐骑！' });
      return;
    }

    const mountedMount = player.mounts.find((m: IMount) => m.isMounted);
    if (!mountedMount) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你当前没有骑乘任何坐骑！' });
      return;
    }

    mountedMount.isMounted = false;

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你从【${mountedMount.name}】上下来。` });

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '查看坐骑', action: '坐骑', desc: '查看坐骑列表' },
      { label: '查看状态', action: '状态', desc: '查看角色状态' },
    ];
    narrative.pushClickableList('已下马', actions);
  }

  // ===== 灵兽进化系统 =====

  private showEvolutionMenu(store: any, narrative: any, args: string[]): void {
    const player = store.getState().player;

    if (!player.mounts || player.mounts.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你还没有灵兽！无法进行进化培养。' });
      return;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【灵兽进化培养】' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '灵兽通过培养可以进化升阶，品阶越高属性越强。' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '进化需要：等级达标 + 亲密度达标 + 消耗金币和材料。' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n选择要进化的灵兽：' });

    const tierStars = (tier: MountTier) => '★'.repeat(MOUNT_TIER_STARS[tier]);

    const evolveItems = player.mounts.map((mount: IMount) => {
      const evolution = getMountEvolution(mount.tier);
      const intimacy = mount.intimacy || 0;
      const intimacyLabel = getIntimacyLabel(intimacy);

      let desc: string;
      if (!evolution) {
        desc = `${mount.name}（${mount.tier} ${tierStars(mount.tier)}）已达最高品阶，无法继续进化。`;
      } else {
        const levelOk = mount.level >= evolution.requiredLevel;
        const intimacyOk = intimacy >= evolution.requiredIntimacy;
        const canEvolve = levelOk && intimacyOk;
        desc = `${mount.name}（${mount.tier} ${tierStars(mount.tier)}） Lv.${mount.level} | 亲密度：${intimacyLabel}(${intimacy})\n` +
          `进化至${evolution.toTier}：需要Lv.${evolution.requiredLevel}(${levelOk ? '✓' : '✗'}) + 亲密度${evolution.requiredIntimacy}(${intimacyOk ? '✓' : '✗'}) + ${evolution.cost.gold}金币`;
      }

      return {
        label: `${mount.name} ${tierStars(mount.tier)}（${mount.tier}）`,
        action: evolution ? `进化确认 ${mount.id}` : '',
        desc,
        disabled: !evolution,
      };
    });

    narrative.pushClickableList('选择灵兽进化', evolveItems);
  }

  private confirmEvolution(store: any, narrative: any, mountId: string): void {
    const player = store.getState().player;
    const mount = player.mounts.find((m: IMount) => m.id === mountId);

    if (!mount) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '未找到灵兽！' });
      return;
    }

    const evolution = getMountEvolution(mount.tier);
    if (!evolution) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${mount.name}已达最高品阶！` });
      return;
    }

    const intimacy = mount.intimacy || 0;
    if (mount.level < evolution.requiredLevel) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `等级不足！需要Lv.${evolution.requiredLevel}，当前Lv.${mount.level}。` });
      return;
    }
    if (intimacy < evolution.requiredIntimacy) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `亲密度不足！需要${evolution.requiredIntimacy}，当前${intimacy}。` });
      return;
    }
    if (player.gold < evolution.cost.gold) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `金币不足！需要${evolution.cost.gold}金币。` });
      return;
    }

    // 检查材料
    for (const mat of evolution.cost.materials) {
      const item = player.inventory.find((i: any) => i.id === mat.id);
      if (!item || (item.stackable || 1) < mat.amount) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `材料不足！需要${mat.id}×${mat.amount}。` });
        return;
      }
    }

    // 消耗金币和材料
    player.gold -= evolution.cost.gold;
    for (const mat of evolution.cost.materials) {
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

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n━━━ 灵兽进化：${mount.name} ━━━` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你将灵兽放入灵兽阵中，注入灵力催化血脉觉醒...' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '灵兽浑身光芒大盛，血脉开始蜕变...' });

    // 进化成功率
    const successRate = 0.8 + (intimacy - evolution.requiredIntimacy) * 0.002;

    if (Math.random() < successRate) {
      // 进化成功
      mount.tier = evolution.toTier;
      mount.baseSpeed += evolution.statBoost.speed;
      mount.baseAttack += evolution.statBoost.attack;
      mount.baseDefense += evolution.statBoost.defense;
      mount.evolveCount = (mount.evolveCount || 0) + 1;

      // 传说及以上可飞行
      if (evolution.toTier === MountTier.LEGEND || evolution.toTier === MountTier.MYTH) {
        mount.canFly = true;
      }

      // 添加进化技能
      if (evolution.newSkill) {
        mount.skills.push(evolution.newSkill);
      }

      const stars = '★'.repeat(MOUNT_TIER_STARS[evolution.toTier]);
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【灵兽进化成功！】' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: evolution.evolutionStory });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${mount.name} 进化为 ${stars}（${evolution.toTier}）！` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `属性提升：速度+${evolution.statBoost.speed} 攻击+${evolution.statBoost.attack} 防御+${evolution.statBoost.defense}` });
      if (evolution.newSkill) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `觉醒技能：${evolution.newSkill.name} — ${evolution.newSkill.description}` });
      }
      if (mount.canFly && evolution.toTier >= MountTier.LEGEND) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '灵兽获得飞行能力！' });
      }
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【灵兽进化失败】' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '血脉觉醒失败，灵力消散...材料和金币已消耗。' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '可再次尝试，提升亲密度可增加成功率。' });
    }

    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

    const actions = [
      { label: '继续进化', action: '灵兽进化', desc: '查看其他灵兽' },
      { label: '查看坐骑', action: '坐骑', desc: '查看坐骑列表' },
      { label: '返回状态', action: '状态', desc: '查看角色状态' },
    ];
    narrative.pushClickableList('灵兽进化结束', actions);
  }
}