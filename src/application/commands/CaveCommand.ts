import { ICommandHandler, ICommandContext } from './CommandRouter';
import { ICave, ICavePlant, ICavePet, CaveQuality, CAVE_QUALITIES, SEED_PLANTS, SEED_PETS } from '../../domain/entities/Cave';
import { CultivationRealm, RealmNames } from '../../domain/entities/Player';

export class CaveCommand implements ICommandHandler {
  canHandle(action: string): boolean {
    return ['cave', '洞天', 'enter_cave', '进入洞天', 'plant', '种植', 'harvest', '收获', 'pet', '宠物'].includes(action);
  }

  execute(action: string, args: string[], context: ICommandContext): void {
    const { store, world, narrative, modalManager } = context;

    if (action === 'cave' || action === '洞天') {
      this.showCave(store, narrative, modalManager);
    } else if (action === 'enter_cave' || action === '进入洞天') {
      this.enterCave(store, narrative);
    } else if (action === 'plant' || action === '种植') {
      this.plantSeed(store, narrative, modalManager, args);
    } else if (action === 'harvest' || action === '收获') {
      this.harvestPlant(store, narrative, args);
    } else if (action === 'pet' || action === '宠物') {
      this.managePets(store, narrative, modalManager, args);
    }
  }

  private getPlayerCave(store: any): ICave | null {
    const player = store.getState().player;
    if (!player.cave) {
      return null;
    }
    return player.cave;
  }

  private showCave(store: any, narrative: any, modalManager: any): void {
    const cave = this.getPlayerCave(store);
    if (!cave) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你尚未拥有洞天，突破到洞天境后将自动开辟。' });
      return;
    }

    const qualityInfo = CAVE_QUALITIES[cave.quality];
    const now = Date.now();
    
    if (!modalManager) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【${cave.name} · ${qualityInfo.name}】` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `灵气浓度：${(cave.spiritDensity * 100).toFixed(0)}%（修炼效率 ${(qualityInfo.spiritBonus * 100).toFixed(0)}%）` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `洞天大小：${cave.size}（最大 ${qualityInfo.maxSize}）` });
      if (cave.plants.length > 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n种植区：' });
        const plantItems = cave.plants.map((plant, index) => {
          const plantInfo = SEED_PLANTS[plant.plantId];
          const progress = Math.min(100, ((now - plant.plantedTime) / plantInfo.growthTime) * 100);
          const isReady = progress >= 100;
          return {
            label: `${plant.name}（成长度 ${progress.toFixed(0)}%）${isReady ? '【可收获】' : ''}`,
            action: isReady ? `收获 ${index}` : `种植 ${plant.name}`,
            desc: isReady ? '点击收获' : '正在生长中...',
            disabled: !isReady,
          };
        });
        narrative.pushClickableList('灵草种植', plantItems);
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '种植区：空（可种植灵草）' });
      }
      if (cave.pets.length > 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n宠物：' });
        const petItems = cave.pets.map((pet) => ({
          label: `${pet.name}（等级${pet.level} · 攻击${pet.attack} · 防御${pet.defense} · 忠诚度${pet.loyalty}）`,
          action: `宠物 ${pet.name}`,
          desc: `忠诚度：${pet.loyalty}/100，经验：${pet.exp}/${pet.maxExp}`,
        }));
        narrative.pushClickableList('洞天宠物', petItems);
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '宠物：空（可在石城宠物店购买）' });
      }
      const upgradeCost = this.getUpgradeCost(cave);
      const canUpgrade = upgradeCost && store.getState().player.gold >= upgradeCost.gold;
      const actions = [
        { label: '进入洞天修炼', action: '进入', desc: '在洞天中修炼，享受灵气加成' },
        { label: '种植灵草', action: '种植', desc: '在种植区种植灵草种子' },
        { label: '升级洞天', action: '洞天升级', desc: upgradeCost ? `花费${upgradeCost.gold}金币升级到下一品质` : '已达最高品质', disabled: !canUpgrade },
      ];
      narrative.pushClickableList('洞天操作', actions);
      return;
    }

    modalManager.showInteractive(`${cave.name} · ${qualityInfo.name}`, (container: HTMLElement) => {
      const header = document.createElement('div');
      header.className = 'cave-header';
      header.innerHTML = `
        <div class="cave-stat">灵气浓度：<span class="highlight">${(cave.spiritDensity * 100).toFixed(0)}%</span></div>
        <div class="cave-stat">修炼效率：<span class="highlight">${(qualityInfo.spiritBonus * 100).toFixed(0)}%</span></div>
        <div class="cave-stat">洞天大小：<span class="highlight">${cave.size}/${qualityInfo.maxSize}</span></div>
      `;
      container.appendChild(header);

      const plantsSection = document.createElement('div');
      plantsSection.className = 'cave-section';
      plantsSection.innerHTML = '<div class="cave-section-title">🌿 种植区</div>';
      
      if (cave.plants.length > 0) {
        const plantsGrid = document.createElement('div');
        plantsGrid.className = 'cave-plants-grid';
        
        cave.plants.forEach((plant: ICavePlant, index: number) => {
          const plantInfo = SEED_PLANTS[plant.plantId];
          const progress = Math.min(100, ((now - plant.plantedTime) / plantInfo.growthTime) * 100);
          const isReady = progress >= 100;
          
          const plantCard = document.createElement('div');
          plantCard.className = `cave-plant-card ${isReady ? 'ready' : ''}`;
          plantCard.innerHTML = `
            <div class="cave-plant-icon">🌱</div>
            <div class="cave-plant-name">${plant.name}</div>
            <div class="cave-plant-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width:${progress}%"></div>
              </div>
              <span>${progress.toFixed(0)}%</span>
            </div>
          `;
          
          if (isReady) {
            const btn = document.createElement('button');
            btn.className = 'modal-btn modal-btn-primary';
            btn.textContent = '收获';
            btn.addEventListener('click', () => {
              modalManager.close();
              this.harvestPlant(store, narrative, [String(index)]);
            });
            plantCard.appendChild(btn);
          }
          plantsGrid.appendChild(plantCard);
        });
        plantsSection.appendChild(plantsGrid);
      } else {
        plantsSection.innerHTML += '<div class="cave-empty">种植区为空</div>';
      }
      container.appendChild(plantsSection);

      const petsSection = document.createElement('div');
      petsSection.className = 'cave-section';
      petsSection.innerHTML = '<div class="cave-section-title">🐾 宠物</div>';
      
      if (cave.pets.length > 0) {
        const petsList = document.createElement('div');
        petsList.className = 'cave-pets-list';
        
        cave.pets.forEach((pet: ICavePet) => {
          const petCard = document.createElement('div');
          petCard.className = 'cave-pet-card';
          petCard.innerHTML = `
            <div class="cave-pet-icon">🐱</div>
            <div class="cave-pet-info">
              <div class="cave-pet-name">${pet.name}</div>
              <div class="cave-pet-stats">等级${pet.level} | 攻击${pet.attack} | 防御${pet.defense}</div>
              <div class="cave-pet-loyalty">忠诚度：${pet.loyalty}/100</div>
              <div class="cave-pet-exp">经验：${pet.exp}/${pet.maxExp}</div>
            </div>
          `;
          petsList.appendChild(petCard);
        });
        petsSection.appendChild(petsList);
      } else {
        petsSection.innerHTML += '<div class="cave-empty">宠物为空（可在石城宠物店购买）</div>';
      }
      container.appendChild(petsSection);

      const actionsSection = document.createElement('div');
      actionsSection.className = 'cave-actions';
      
      const enterBtn = document.createElement('button');
      enterBtn.className = 'modal-btn modal-btn-primary';
      enterBtn.textContent = '进入洞天修炼';
      enterBtn.addEventListener('click', () => {
        modalManager.close();
        this.enterCave(store, narrative);
      });
      
      const plantBtn = document.createElement('button');
      plantBtn.className = 'modal-btn modal-btn-secondary';
      plantBtn.textContent = '种植灵草';
      plantBtn.addEventListener('click', () => {
        modalManager.close();
        this.plantSeed(store, narrative, modalManager, []);
      });
      
      const petBtn = document.createElement('button');
      petBtn.className = 'modal-btn modal-btn-secondary';
      petBtn.textContent = '宠物管理';
      petBtn.addEventListener('click', () => {
        modalManager.close();
        this.managePets(store, narrative, modalManager, []);
      });
      
      const upgradeCost = this.getUpgradeCost(cave);
      const player = store.getState().player;
      const canUpgrade = upgradeCost && player.gold >= upgradeCost.gold;
      const upgradeBtn = document.createElement('button');
      upgradeBtn.className = `modal-btn ${canUpgrade ? 'modal-btn-primary' : 'modal-btn-disabled'}`;
      upgradeBtn.textContent = upgradeCost ? `升级洞天（${upgradeCost.gold}金币）` : '已达最高品质';
      upgradeBtn.disabled = !canUpgrade;
      
      actionsSection.appendChild(enterBtn);
      actionsSection.appendChild(plantBtn);
      actionsSection.appendChild(petBtn);
      actionsSection.appendChild(upgradeBtn);
      container.appendChild(actionsSection);
    }, { width: '700px', height: '550px' });
  }

  private enterCave(store: any, narrative: any): void {
    const cave = this.getPlayerCave(store);
    if (!cave) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你尚未拥有洞天！' });
      return;
    }

    const qualityInfo = CAVE_QUALITIES[cave.quality];
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n━━━ 进入洞天 ━━━` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你进入了【${cave.name}】，浓郁的灵气扑面而来。` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `在此修炼，效率提升 ${((qualityInfo.spiritBonus - 1) * 100).toFixed(0)}%！` });
    
    const now = Date.now();
    cave.plants.forEach(plant => {
      const plantInfo = SEED_PLANTS[plant.plantId];
      const progress = Math.min(100, ((now - plant.plantedTime) / plantInfo.growthTime) * 100);
      if (progress >= 100) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `  · ${plant.name}已成熟，可以收获了！` });
      }
    });

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '' });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你可以在此修炼、种植、收获。' });
    
    const actions = [
      { label: '在洞天修炼', action: '修炼', desc: '享受洞天灵气加成' },
      { label: '查看洞天状态', action: '洞天', desc: '查看种植和宠物' },
      { label: '离开洞天', action: '返回', desc: '回到当前位置' },
    ];
    narrative.pushClickableList('洞天内操作', actions);
  }

  private plantSeed(store: any, narrative: any, modalManager: any, args: string[]): void {
    const cave = this.getPlayerCave(store);
    if (!cave) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你尚未拥有洞天！' });
      return;
    }

    const qualityInfo = CAVE_QUALITIES[cave.quality];
    if (cave.plants.length >= qualityInfo.maxSize) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `洞天种植区已满！当前 ${cave.plants.length}/${qualityInfo.maxSize}。` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '升级洞天可增加种植位。' });
      return;
    }

    const player = store.getState().player;
    const seeds = player.inventory.filter((item: any) => item.name && item.name.includes('种子'));
    
    if (seeds.length === 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '背包中没有灵草种子！' });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '可在石城药铺购买种子。' });
      return;
    }

    if (!modalManager) {
      const seedItems = seeds.map((seed: any) => ({
        label: seed.name,
        action: `种植 ${seed.name}`,
        desc: `数量：${seed.stackable ? seed.stackable : 1}`,
      }));
      narrative.pushClickableList('选择种子种植', seedItems);
      return;
    }

    modalManager.showInteractive('种植灵草', (container: HTMLElement) => {
      const seedList = document.createElement('div');
      seedList.className = 'seed-list';
      
      for (const seed of seeds) {
        const seedCard = document.createElement('div');
        seedCard.className = 'seed-card';
        seedCard.innerHTML = `
          <div class="seed-icon">🌰</div>
          <div class="seed-info">
            <div class="seed-name">${seed.name}</div>
            <div class="seed-count">数量：${seed.stackable ? seed.stackable : 1}</div>
          </div>
        `;
        
        const btn = document.createElement('button');
        btn.className = 'modal-btn modal-btn-primary';
        btn.textContent = '种植';
        btn.addEventListener('click', () => {
          modalManager.close();
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你种下了 ${seed.name}！` });
          const plantInfo = SEED_PLANTS[seed.id] || { growthTime: 60000, yield: 1 };
          cave.plants.push({
            id: `plant_${Date.now()}_${seed.id}`,
            plantId: seed.id,
            name: seed.name.replace('种子', ''),
            plantedTime: Date.now(),
            growthStage: 0,
            maxGrowthStage: 3,
            yield: plantInfo.yield || 1,
            harvestTime: Date.now() + plantInfo.growthTime,
          });
          const idx = player.inventory.findIndex((i: any) => i.id === seed.id);
          if (idx !== -1) {
            if (player.inventory[idx].stackable && player.inventory[idx].stackable > 1) {
              player.inventory[idx].stackable--;
            } else {
              player.inventory.splice(idx, 1);
            }
          }
          store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
          this.showCave(store, narrative, modalManager);
        });
        
        seedCard.appendChild(btn);
        seedList.appendChild(seedCard);
      }
      
      container.appendChild(seedList);
    }, { width: '500px', height: '400px' });
  }

  private harvestPlant(store: any, narrative: any, args: string[]): void {
    const cave = this.getPlayerCave(store);
    if (!cave) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你尚未拥有洞天！' });
      return;
    }

    const index = parseInt(args[0]);
    if (isNaN(index) || index < 0 || index >= cave.plants.length) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '请选择正确的种植位！' });
      return;
    }

    const plant = cave.plants[index];
    const now = Date.now();
    const plantInfo = SEED_PLANTS[plant.plantId];
    
    if (now - plant.plantedTime < plantInfo.growthTime) {
      const progress = ((now - plant.plantedTime) / plantInfo.growthTime) * 100;
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `${plant.name}还未成熟！当前成长度：${progress.toFixed(0)}%` });
      return;
    }

    const yieldAmount = plant.yield;
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你收获了 ${yieldAmount} 株${plant.name}！` });
    
    const newPlant = {
      ...plant,
      plantedTime: now,
      growthStage: 0,
      harvestTime: now + plantInfo.growthTime,
    };
    cave.plants[index] = newPlant;
    
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
    this.showCave(store, narrative, null);
  }

  private managePets(store: any, narrative: any, modalManager: any, args: string[]): void {
    const cave = this.getPlayerCave(store);
    if (!cave) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你尚未拥有洞天！' });
      return;
    }

    const action = args[0];
    if (!action) {
      this.showPetList(store, narrative, modalManager);
      return;
    }

    if (action === 'buy') {
      this.buyPet(store, narrative, modalManager);
    } else {
      this.showPetDetail(store, narrative, action);
    }
  }

  private showPetList(store: any, narrative: any, modalManager: any): void {
    const cave = this.getPlayerCave(store);
    if (!cave) return;

    if (!modalManager) {
      if (cave.pets.length === 0) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '洞天内还没有宠物。' });
      } else {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '\n【洞天宠物】' });
        const petItems = cave.pets.map((pet) => ({
          label: `${pet.name}（等级${pet.level}）`,
          action: `宠物 ${pet.name}`,
          desc: `攻击${pet.attack} · 防御${pet.defense} · 忠诚度${pet.loyalty}`,
        }));
        narrative.pushClickableList('宠物列表', petItems);
      }
      const actions = [
        { label: '购买宠物', action: '宠物 buy', desc: '在宠物店购买灵兽' },
        { label: '返回洞天', action: '洞天', desc: '返回洞天主界面' },
      ];
      narrative.pushClickableList('宠物操作', actions);
      return;
    }

    modalManager.showInteractive('洞天宠物', (container: HTMLElement) => {
      if (cave.pets.length > 0) {
        const petsList = document.createElement('div');
        petsList.className = 'cave-pets-list';
        
        cave.pets.forEach((pet: ICavePet) => {
          const petCard = document.createElement('div');
          petCard.className = 'cave-pet-card';
          petCard.innerHTML = `
            <div class="cave-pet-icon">🐱</div>
            <div class="cave-pet-info">
              <div class="cave-pet-name">${pet.name}</div>
              <div class="cave-pet-stats">等级${pet.level} | 攻击${pet.attack} | 防御${pet.defense}</div>
              <div class="cave-pet-loyalty">忠诚度：${pet.loyalty}/100</div>
              <div class="cave-pet-exp">经验：${pet.exp}/${pet.maxExp}</div>
            </div>
          `;
          petsList.appendChild(petCard);
        });
        container.appendChild(petsList);
      } else {
        container.innerHTML = '<div class="modal-empty">洞天内还没有宠物。</div>';
      }

      const actionsSection = document.createElement('div');
      actionsSection.className = 'cave-actions';
      
      const buyBtn = document.createElement('button');
      buyBtn.className = 'modal-btn modal-btn-primary';
      buyBtn.textContent = '购买宠物';
      buyBtn.addEventListener('click', () => {
        modalManager.close();
        this.buyPet(store, narrative, modalManager);
      });
      
      const backBtn = document.createElement('button');
      backBtn.className = 'modal-btn modal-btn-secondary';
      backBtn.textContent = '返回洞天';
      backBtn.addEventListener('click', () => {
        modalManager.close();
        this.showCave(store, narrative, modalManager);
      });
      
      actionsSection.appendChild(buyBtn);
      actionsSection.appendChild(backBtn);
      container.appendChild(actionsSection);
    }, { width: '600px', height: '450px' });
  }

  private buyPet(store: any, narrative: any, modalManager: any): void {
    const availablePets = Object.entries(SEED_PETS).map(([id, info]) => ({
      id,
      name: info.name,
      price: info.baseAttack * 20 + info.baseDefense * 15,
      attack: info.baseAttack,
      defense: info.baseDefense,
    }));

    const player = store.getState().player;

    if (!modalManager) {
      const petItems = availablePets.map(pet => ({
        label: `${pet.name} — ${pet.price}金币`,
        action: `宠物购买 ${pet.id}`,
        desc: `基础攻击：${pet.attack} · 基础防御：${pet.defense}`,
        disabled: player.gold < pet.price,
      }));
      narrative.pushClickableList('可购买的宠物', petItems);
      return;
    }

    modalManager.showInteractive('购买宠物', (container: HTMLElement) => {
      const header = document.createElement('div');
      header.className = 'pet-shop-header';
      header.innerHTML = `<div>你的金币：<span class="gold">${player.gold}</span></div>`;
      container.appendChild(header);

      const petList = document.createElement('div');
      petList.className = 'pet-shop-list';
      
      for (const pet of availablePets) {
        const canAfford = player.gold >= pet.price;
        const petCard = document.createElement('div');
        petCard.className = `pet-shop-card ${canAfford ? '' : 'disabled'}`;
        petCard.innerHTML = `
          <div class="pet-shop-icon">🐾</div>
          <div class="pet-shop-info">
            <div class="pet-shop-name">${pet.name}</div>
            <div class="pet-shop-stats">攻击：${pet.attack} | 防御：${pet.defense}</div>
            <div class="pet-shop-price">${pet.price}金币</div>
          </div>
        `;
        
        const btn = document.createElement('button');
        btn.className = `modal-btn ${canAfford ? 'modal-btn-primary' : 'modal-btn-disabled'}`;
        btn.textContent = canAfford ? '购买' : '金币不足';
        btn.disabled = !canAfford;
        btn.addEventListener('click', () => {
          modalManager.close();
          player.gold -= pet.price;
          const cave = this.getPlayerCave(store);
          if (cave) {
            cave.pets.push({
              id: `pet_${Date.now()}`,
              petId: pet.id,
              name: pet.name,
              level: 1,
              attack: pet.attack,
              defense: pet.defense,
              loyalty: 80,
              exp: 0,
              maxExp: 100,
            });
          }
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你购买了 ${pet.name}！` });
          store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
          this.showPetList(store, narrative, modalManager);
        });
        
        petCard.appendChild(btn);
        petList.appendChild(petCard);
      }
      
      container.appendChild(petList);
    }, { width: '600px', height: '450px' });
  }

  private showPetDetail(store: any, narrative: any, petName: string): void {
    const cave = this.getPlayerCave(store);
    if (!cave) return;

    const pet = cave.pets.find((p: ICavePet) => p.name === petName);
    if (!pet) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '未找到该宠物！' });
      return;
    }

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n【${pet.name}】` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `等级：${pet.level}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `攻击：${pet.attack}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `防御：${pet.defense}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `忠诚度：${pet.loyalty}/100` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `经验：${pet.exp}/${pet.maxExp}` });

    const actions = [
      { label: '喂食提升忠诚度', action: `宠物喂食 ${pet.name}`, desc: '消耗食物提升忠诚度' },
      { label: '返回宠物列表', action: '宠物', desc: '返回宠物列表' },
    ];
    narrative.pushClickableList('宠物操作', actions);
  }

  private getUpgradeCost(cave: ICave): { gold: number; items?: { id: string; amount: number }[] } | null {
    const qualities = [CaveQuality.MORTAL, CaveQuality.SPIRIT, CaveQuality.DIVINE, CaveQuality.IMMORTAL];
    const currentIndex = qualities.indexOf(cave.quality);
    if (currentIndex >= qualities.length - 1) return null;

    const costs: Record<CaveQuality, number> = {
      [CaveQuality.MORTAL]: 100,
      [CaveQuality.SPIRIT]: 500,
      [CaveQuality.DIVINE]: 2000,
      [CaveQuality.IMMORTAL]: 0,
    };
    return { gold: costs[cave.quality] };
  }
}