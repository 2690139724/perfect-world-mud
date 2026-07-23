import { GameStore } from '../store/GameStore';
import { CombatEngine } from '../../domain/services/CombatEngine';
import { MonsterRepository } from '../../infrastructure/repositories/MonsterRepository';
import { IMonster } from '../../domain/entities/Monster';
import { QuestManager } from '../../domain/services/QuestManager';
import { HiddenStorylineService } from '../../domain/services/HiddenStorylineService';
import { getItemById } from '../../data/seed/items';
import { IPlayer } from '../../domain/entities/Player';

export class CombatUseCase {
  private store: GameStore;
  private monsterRepo: MonsterRepository;

  constructor(store: GameStore, monsterRepo: MonsterRepository) {
    this.store = store;
    this.monsterRepo = monsterRepo;
  }

  public startCombat(monsterId: string): boolean {
    const state = this.store.getState();
    if (state.combatState) return false;

    const monsterData = this.monsterRepo.find(monsterId);
    if (!monsterData) return false;

    const engine = new CombatEngine(state.player, monsterData);
    this.store.dispatch({ type: 'COMBAT_START', payload: { engine, enemy: monsterData } });

    return true;
  }

  public handleCombatEnd(won: boolean): void {
    const state = this.store.getState();
    const combatState = state.combatState;

    if (!combatState?.engine) return;

    if (won) {
      const expGain = combatState.engine.monster.expValue;
      const player = combatState.engine.player;
      const goldGain = combatState.engine.monster.level * (5 + Math.floor(Math.random() * 10));

      state.player.gold += goldGain;
      state.player.killedMonsters.push(combatState.engine.monster.id);

      const questMessages = QuestManager.trackKill(state.player, combatState.engine.monster.id);
      for (const msg of questMessages) {
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: msg });
      }

      const completedQuests = QuestManager.checkCompletion(state.player);
      for (const cq of completedQuests) {
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[任务完成] ${cq.questName}！` });
        for (const r of cq.rewards) {
          this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `  奖励: ${r}` });
        }
      }

      this.store.dispatch({
        type: 'ENEMY_DEFEATED',
        payload: { exp: expGain, monsterId: combatState.engine.monster.id }
      });
      this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `获得 ${goldGain} 原始币。` });

      const drops = this.rollDrops(combatState.engine.monster);
      for (const drop of drops) {
        const item = getItemById(drop.id);
        if (item) {
          state.player.inventory.push({ ...item });
        }
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `获得战利品: ${drop.name}` });
      }
      if (drops.length > 0) {
        this.store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
      }

      // 尝试发现隐藏支线线索（通过击杀怪物）
      const monsterId = combatState.engine.monster.id;
      const clue = HiddenStorylineService.tryDiscoverClueByKill(state.player, monsterId);
      if (clue) {
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【发现线索】${clue.title}` });
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: clue.description });
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `提示：${clue.hint}` });

        // 击杀线索可能掉落线索物品
        this.rollClueItemDrop(monsterId, state.player);

        const triggered = HiddenStorylineService.checkTrigger(state.player);
        if (triggered) {
          this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【触发隐藏支线】${triggered.name}` });
          this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: triggered.description });
          this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: triggered.loreText });
        }
        this.store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
      } else {
        // 即使未触发线索，也尝试掉落线索物品（用于物品类线索）
        this.rollClueItemDrop(monsterId, state.player);
      }
    } else {
      this.store.dispatch({
        type: 'PLAYER_DEFEATED',
        payload: { monsterId: combatState.engine.monster.id }
      });
    }
  }

  public isInCombat(): boolean {
    return !!this.store.getState().combatState;
  }

  public getCurrentEnemy(): IMonster | null {
    return this.store.getState().combatState?.enemy || null;
  }

  public getCombatEngine(): CombatEngine | null {
    return this.store.getState().combatState?.engine || null;
  }

  public tryRandomEncounter(roomZoneId: string): boolean {
    if (Math.random() > 0.3) return false;

    const monsters = this.monsterRepo.findByZone(roomZoneId);
    if (monsters.length === 0) {
      const all = this.monsterRepo.findAll();
      if (all.length === 0) return false;
      const monster = all[Math.floor(Math.random() * all.length)];
      return this.startCombat(monster.id);
    }

    const monster = monsters[Math.floor(Math.random() * monsters.length)];
    return this.startCombat(monster.id);
  }

  private rollDrops(monster: IMonster): { id: string; name: string }[] {
    const drops: { id: string; name: string }[] = [];
    const itemNames: Record<string, string> = {
      'wolf_skin': '狼皮', 'snake_venom': '蛇毒', 'stone_core': '石核',
      'hawk_feather': '风隼羽', 'croc_scale': '鳄鳞', 'soul_fragment': '魂之碎片',
      'fox_spirit_orb': '灵狐丹', 'bat_wing': '蝠翼', 'serpent_scale': '蟒鳞',
      'ancient_bone': '古兽骨', 'spirit_crystal': '灵石',
      'iron_sword': '粗铁剑', 'leather_armor': '兽皮甲', 'cloth_boots': '布靴',
      'bone_sword': '骨刃', 'scale_armor': '鳄鳞甲',
    };

    for (const drop of monster.drops) {
      if (Math.random() < drop.chance) {
        const count = drop.minCount + Math.floor(Math.random() * (drop.maxCount - drop.minCount + 1));
        for (let i = 0; i < count; i++) {
          drops.push({ id: drop.itemId, name: itemNames[drop.itemId] || drop.itemId });
        }
      }
    }

    return drops;
  }

  /**
   * 怪物掉落线索物品
   * 特定怪物有概率掉落线索道具，玩家拾取后可触发 item 类型线索
   */
  private rollClueItemDrop(monsterId: string, player: IPlayer): void {
    // 怪物 -> 线索物品映射及掉落概率
    const clueItemDrops: Record<string, { itemId: string; chance: number }> = {
      'wandering_soul': { itemId: 'clue_battlefield_relic', chance: 0.15 },  // 古战场游魂 -> 古战场遗物
      'ancient_immortal': { itemId: 'clue_ancient_rune', chance: 0.20 },     // 上古仙人 -> 太古符文碎片
    };

    const dropConfig = clueItemDrops[monsterId];
    if (!dropConfig) return;

    // 检查玩家是否已有该物品（避免重复）
    const hasItem = player.inventory.some(i => i.id === dropConfig.itemId);
    if (hasItem) return;

    if (Math.random() < dropConfig.chance) {
      const item = getItemById(dropConfig.itemId);
      if (!item) return;

      player.inventory.push({ ...item, id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}` });
      this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【获得线索物品】${item.name}` });
      this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: item.desc });

      // 尝试触发物品类线索
      const clue = HiddenStorylineService.tryDiscoverClueByItem(player, dropConfig.itemId);
      if (clue) {
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【发现线索】${clue.title}` });
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: clue.description });
        this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `提示：${clue.hint}` });

        const triggered = HiddenStorylineService.checkTrigger(player);
        if (triggered) {
          this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【触发隐藏支线】${triggered.name}` });
          this.store.dispatch({ type: 'SYSTEM_MESSAGE', payload: triggered.description });
        }
      }
      this.store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
    }
  }
}