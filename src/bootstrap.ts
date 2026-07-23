// bootstrap.ts - 游戏运行时逻辑（按需加载）
// 由 main.ts 通过动态 import() 加载

// ===== 蓝图数据 import =====
// 完美世界基础蓝图（默认起始世界，必须预加载）
import './data/blueprints/stone_city';
import './data/blueprints/wasteland';
import './data/blueprints/fire_city';
import './data/blueprints/hundred_breaks';
import './data/blueprints/butian_ge';
import './data/blueprints/zhulu_shuyuan';
import './data/blueprints/immortal_mountain';
import './data/blueprints/divine_garden';
import './data/blueprints/burial_domain';
import './data/blueprints/national_villages';
import './data/blueprints/national_cities';
import './data/blueprints/national_capitals';
import './data/blueprints/national_megacities_1';
import './data/blueprints/national_megacities_2';
import './data/blueprints/outposts';
import './data/blueprints/camps';
import './data/blueprints/mines';
import './data/blueprints/post_stations';
import './data/blueprints/ruins';
import './data/blueprints/sects';
import './data/blueprints/battlefields';
import './data/blueprints/fishing_villages';
// 其他世界蓝图通过 BlueprintLoader 按需加载

// ===== 模块 import =====
import { GameStore, IGameState } from './application/store/GameStore';
import { GameRenderer } from './ui/renderers/GameRenderer';
import { ModalManager } from './ui/components/ModalManager';
import { WindowManager } from './ui/components/WindowManager';
import { UIService } from './application/services/UIService';
import { LayoutController } from './ui/controllers/LayoutController';
import { World } from './domain/World';
import { SaveManager } from './infrastructure/persistence/SaveManager';
import { MoveUseCase } from './application/use-cases/MoveUseCase';
import { CombatUseCase } from './application/use-cases/CombatUseCase';
import { MonsterRepository } from './infrastructure/repositories/MonsterRepository';
import { GameEvents } from './infrastructure/event/EventBus';
import { CultivationRealm, RealmNames, getFullRealmName, IPlayer, OriginType, IWorldTravelRecord } from './domain/entities/Player';
import { WorldId, WORLD_LIST, WORLD_NAMES, WORLD_DESCRIPTIONS, getWorldDefinition, getFullRealmName as getWorldFullRealmName, canAscend, getAscensionTarget } from './domain/entities/WorldDefinition';
import { SEED_TECHNIQUES, getTechniqueById } from './data/seed/techniques';
import { SEED_ITEMS, getItemById } from './data/seed/items';
import { CultivationService, CultivationMode } from './domain/services/CultivationService';
import { Season, TimeOfDay, IGameTime } from './domain/entities/GameTime';
import { BreakthroughService } from './domain/services/BreakthroughService';
import { IBreakthroughSession } from './domain/entities/BreakthroughSession';
import { EquipmentSlot, ItemType, IItem } from './domain/entities/Item';
import { findShop } from './data/shop/shop_data';
import { QuestManager } from './domain/services/QuestManager';
import { QUEST_DATA, findQuest } from './data/quests/quest_data';
import { EventService } from './domain/services/EventService';
import { getNPCsByRoom, getNPC, loadWorldNPCs } from './data/npcs/npc_data';
import { loadWorldBlueprints } from './data/blueprints/BlueprintLoader';
import { ALL_ZONES } from './data/maps';
import { loadWorldQuests } from './data/quests/QuestLoader';
import { NPCLifeService } from './domain/services/NPCLifeService';
import { getRandomTalents, getTalentEffects, getTalent, ITalent } from './data/talents/talent_data';
import { getMethod, getMethodsByRealm, AcquireType } from './data/methods/method_data';
import { MethodService, ACQUIRE_TYPE_LABELS } from './domain/services/MethodService';
import { findDungeon } from './domain/entities/Dungeon';
import './data/dungeons/dungeon_data';
import { findFormation } from './domain/entities/ArrayFormation';
import { SEED_ACHIEVEMENTS, SEED_TITLES, findTitle } from './domain/entities/Achievement';
import { CommandRouter, MoveCommand, ShopCommand, NPCCommand, CultivationCommand, DungeonCommand, GeneralCommand, CaveCommand, AlchemyCommand, ForgeCommand, MountCommand, TalentCommand, AdventureCommand, LawCommand, CombatCommand, AutoCultivateCommand, EquipmentEnhanceCommand, CollectionCommand, ClanCommand, CompanionCommand, CraftRankCommand } from './application/commands';
import { CraftRankService } from './domain/services/CraftRankService';
import { ALCHEMIST_RANK_CONFIG, FORMATION_RANK_CONFIG, BONE_SCRIPT_RANK_CONFIG } from './domain/entities/CraftRank';
import { AscensionCommand } from './application/commands/AscensionCommand';
import { OriginSystem, IOriginResult } from './domain/services/OriginSystem';
import { SceneGenerator } from './domain/services/SceneGenerator';
import { TalentService } from './domain/services/TalentService';
import { TalentStealSystem } from './domain/services/TalentStealSystem';
import { QuickbarConfig } from './ui/components/QuickbarConfig';
import { TalentStoryService } from './domain/services/TalentStoryService';
import { getTalentStory } from './data/talents/talent_stories';
import { TutorialSystem } from './domain/services/TutorialSystem';
import { QuestNotification } from './domain/services/QuestNotification';
import { StatusMonitor } from './ui/components/StatusMonitor';
import { ToastManager } from './ui/components/ToastManager';
import { MiniMap } from './ui/components/MiniMap';
import { GoalTracker } from './ui/components/GoalTracker';
import { WorldMap } from './ui/components/WorldMap';

// ===== 初始化核心模块 =====
const saveManager = new SaveManager();
const npcLifeService = new NPCLifeService();

let gameInitialized = false;
export let store: GameStore;
let renderer: GameRenderer;
let modalManager: ModalManager;
let windowManager: WindowManager;
let eventBus: any;
let world: World;
let seed: number;
let autoSaveInterval: ReturnType<typeof setInterval> | null = null;
let timeTickInterval: ReturnType<typeof setInterval> | null = null;
let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

// ===== 背包状态 =====
let currentInventoryTab: string = 'all';

// ===== 回调接口 =====
export interface IBootstrapCallbacks {
  onExitToMenu: () => void;
  getSavedData: () => any | null;
}

let bootstrapCallbacks: IBootstrapCallbacks | null = null;

function handleResize() {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
  resizeTimeout = setTimeout(() => {
    if (renderer) {
      renderer.render();
    }
  }, 150);
}

function initGame(saveData: any | null) {
  if (gameInitialized) return;
  gameInitialized = true;

  seed = saveData?.worldSeed || Math.floor(Math.random() * 999999);
  world = new World(seed);

  const startingWorldId = saveData?.player?.currentWorldId || WorldId.PERFECT_WORLD;
  loadWorldNPCs(startingWorldId);
  loadWorldBlueprints(startingWorldId);
  loadWorldQuests(startingWorldId);

  const defaultPlayer = {
    id: 'player_001',
    name: '无名修士',
    origin: 'commoner' as OriginType,
    currentWorldId: WorldId.PERFECT_WORLD,
    worldTravelRecords: {
      [WorldId.PERFECT_WORLD]: {
        worldId: WorldId.PERFECT_WORLD,
        firstArrivalTime: 0,
        highestRealmLevel: CultivationRealm.MORTAL,
        totalTimeSpent: 0,
        ascended: false,
      },
    },
    realm: CultivationRealm.MORTAL,
    realmStage: 1,
    realmPerfection: false,
    reincarnationCount: 0,
    cultivationExp: 0,
    maxCultivationExp: 30,
    breakthroughInsight: 0,
    pastLifeMemory: 0,
    highestRealmReached: CultivationRealm.MORTAL,
    breakthroughAttempts: 0,
    talentIds: [],
    currentMethodId: undefined,
    methodProficiency: 0,
    methodMaxProficiency: 100,
    methodEnlightenmentCount: 0,
    gold: 0,
    hp: 50,
    maxHp: 50,
    mana: 20,
    maxMana: 20,
    attack: 5,
    defense: 2,
    speed: 5,
    critRate: 0.03,
    caveCount: 0,
    spiritAbsorbRate: 1.0,
    equipment: { weapon: null, armor: null, boots: null, accessory1: null, accessory2: null, artifact: null },
    techniques: [SEED_TECHNIQUES[0], SEED_TECHNIQUES[1]],
    battleStrategy: [
      { id: 'rule1', priority: 1, condition: { type: 'hp_less_than' as const, threshold: 30 }, action: { type: 'defend' as const } },
      { id: 'rule2', priority: 2, condition: { type: 'always' as const }, action: { type: 'attack' as const } }
    ],
    offlineStrategy: {
      movementMode: 'wander',
      activityBias: { combat: 0.5, gathering: 0.3, cultivation: 0.2, explore: 0.4 },
      battleRules: [],
      supplyThreshold: { hpPercent: 30, manaPercent: 20 },
      fleeIfUnbeatable: true,
      useEscapeToken: true,
    },
    inventory: [],
    intimacyMap: new Map(),
    bondSkills: [],
    completedQuests: [],
    activeQuests: [],
    currentRoomId: 'stone_city_gate',
    currentZoneId: 'stone_city',
    passives: [],
    avatars: [],
    laws: [],
    killedMonsters: [],
    discoveredZones: ['stone_city'],
    totalPlayTime: 0,
    totalOfflineTime: 0,
    caves: [],
    mounts: [],
    alchemySkill: { level: 1, exp: 0, maxExp: 100 },
    dungeonProgress: [],
    formations: [],
    achievements: [],
    titles: [],
    currentTitleId: undefined,
    hiddenStorylines: [],
    discoveredClues: [],
    meridians: [],
    daoHeart: { level: 0 as any, exp: 0, maxExp: 100, virtues: {}, defects: {} },
    companions: [],
  };

  let player: IPlayer;

  if (saveData?.player) {
    player = {
      ...defaultPlayer,
      ...saveData.player,
      talentIds: saveData.player.talentIds || [],
      currentMethodId: saveData.player.currentMethodId || undefined,
      methodProficiency: saveData.player.methodProficiency || 0,
      methodMaxProficiency: saveData.player.methodMaxProficiency || 100,
      methodEnlightenmentCount: saveData.player.methodEnlightenmentCount || 0,
      realmStage: saveData.player.realmStage || 1,
      realmPerfection: saveData.player.realmPerfection || false,
      reincarnationCount: saveData.player.reincarnationCount || 0,
      breakthroughInsight: saveData.player.breakthroughInsight || 0,
      pastLifeMemory: saveData.player.pastLifeMemory || 0,
      highestRealmReached: saveData.player.highestRealmReached || CultivationRealm.MORTAL,
      breakthroughAttempts: saveData.player.breakthroughAttempts || 0
    } as IPlayer;
  } else {
    player = { ...defaultPlayer } as unknown as IPlayer;
  }

  store = new GameStore({
    player,
    world,
    gameTime: saveData?.gameTime || { ticks: 0, day: 1, hour: 8, minute: 0, season: Season.SPRING, timeOfDay: TimeOfDay.MORNING }
  });

  eventBus = store.getEventBus();

  // 转发 GrowthFeedback 等模块的系统消息到 store
  eventBus.on('system:message', (payload: string) => {
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload });
  });

  eventBus.on(GameEvents.TIME_TICK, (data: { gameTime: IGameTime }) => {
    const npcs = getNPCsByRoom(store.getState().player.currentRoomId);
    npcs.forEach(npc => {
      npcLifeService.updateNPCState(npc, data.gameTime);
    });

    // 随机触发天赋抢夺事件（极低概率，仅当玩家有可抢夺天赋时）
    if (Math.random() < 0.002) { // 0.2% chance per tick
      const player = store.getState().player;
      const stealResult = TalentStealSystem.checkStealTrigger(player);
      if (stealResult.success && stealResult.message) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: stealResult.message });
        if (stealResult.stolen && stealResult.revengeQuestId) {
          // Store the stolen talent info for revenge quest
          (player as any).stolenTalentInfo = {
            talentId: stealResult.talentId,
            talentName: stealResult.talentName,
            thiefName: stealResult.thiefName,
            revengeQuestId: stealResult.revengeQuestId,
          };
        }
        store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
      }
    }
  });

  eventBus.on(GameEvents.TIME_OF_DAY_CHANGED, (_data: { timeOfDay: TimeOfDay }) => {
    const state = store.getState();
    const npcs = getNPCsByRoom(state.player.currentRoomId);
    npcs.forEach(npc => {
      npcLifeService.updateNPCState(npc, state.gameTime);
    });
  });

  const monsterRepo = new MonsterRepository();

  const moveUseCase = new MoveUseCase(store, world, eventBus);
  const combatUseCase = new CombatUseCase(store, monsterRepo);

  const uiService = new UIService(store);
  uiService.start();

  renderer = new GameRenderer(store);

  const layoutController = new LayoutController(document.body, uiService);

  modalManager = new ModalManager('modal-container');

  windowManager = new WindowManager();

  renderer.onNPCClick = (npcIndex: number) => {
    const room = getCurrentRoom();
    if (!room) return;
    const allNPCs = getNPCsByRoom(room.id, room.description);
    if (npcIndex >= allNPCs.length) return;
    const npc = allNPCs[npcIndex];
    if (!npc) return;
    const gameTime = store.getState().gameTime;
    const activityDescription = npcLifeService.getNPCActivityDescription(npc, gameTime);
    const greeting = npcLifeService.getNPCGreeting(npc, gameTime);
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `[CARD:help]${npc.title} ${npc.name}` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: activityDescription });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: greeting });
    const available = npc.dialogues.filter(d => !d.condition || d.condition(store.getState().player));
    if (available.length > 0) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '你可以向他了解一些事情：' });
      store.dispatch({ type: 'SET_CONTEXT', payload: { type: 'npc_dialogue', options: available.map((d, di) => ({ label: d.topic, action: `回应 ${di + 1}` })) } });
      store.dispatch({ type: 'SET_NPC_CONVERSATION', payload: { npcId: npc.id } });
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '[/CARD]' });
      store.dispatch({ type: 'SET_NPC_CONVERSATION', payload: null });
    }
  };

  const commandRouter = new CommandRouter();
  const cmdContext = {
    store,
    world,
    moveUseCase,
    combatUseCase,
    narrative: renderer.getNarrative(),
    modalManager,
  };
  commandRouter.register(new MoveCommand());
  commandRouter.register(new ShopCommand());
  commandRouter.register(new NPCCommand());
  commandRouter.register(new CultivationCommand());
  commandRouter.register(new DungeonCommand());
  commandRouter.register(new GeneralCommand(saveManager, world));
  commandRouter.register(new CaveCommand());
  commandRouter.register(new AlchemyCommand());
  commandRouter.register(new ForgeCommand());
  commandRouter.register(new MountCommand());
  commandRouter.register(new TalentCommand());
  commandRouter.register(new AdventureCommand());
  commandRouter.register(new LawCommand());
  commandRouter.register(new CombatCommand());
  commandRouter.register(new AutoCultivateCommand());
  commandRouter.register(new EquipmentEnhanceCommand());
  commandRouter.register(new CollectionCommand());
  commandRouter.register(new ClanCommand());
  commandRouter.register(new CompanionCommand());
  commandRouter.register(new CraftRankCommand());
  commandRouter.register(new AscensionCommand());

  function getCurrentRoom() {
    return world.getRoom(store.getState().player.currentRoomId);
  }

  eventBus.on(GameEvents.COMMAND, (data: { command: string }) => {
    const cmd = data.command.trim().toLowerCase();
    const parts = cmd.split(/\s+/);
    const action = parts[0];
    const args = parts.slice(1);

    if (combatUseCase.isInCombat()) {
      const combatActions = ['攻击', '防御', '逃跑', '技能', '吃药'];
      if (!combatActions.includes(action)) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '战斗中只能使用：攻击、防御、逃跑、技能、吃药' });
        return;
      }
    }

    if (!commandRouter.execute(action, args, cmdContext)) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `无法执行该操作，请使用界面按钮进行操作。` });
    }
  });

  eventBus.on(GameEvents.COMBAT_END_DETAILS, (data: { won: boolean }) => {
    combatUseCase.handleCombatEnd(data.won);
  });

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    const dataCmd = target.closest('[data-cmd]');
    if (dataCmd) {
      const cmd = dataCmd.getAttribute('data-cmd');
      if (cmd) {
        store.dispatch({ type: 'COMMAND', payload: cmd });
      }
      return;
    }

    const dataAction = target.closest('[data-action]');
    if (dataAction) {
      const action = (dataAction as HTMLElement).dataset.action;
      if (!action) return;

      switch (action) {
        case 'narrative-clear':
          renderer.getNarrative().clear();
          break;
        case 'narrative-tail':
          renderer.getNarrative().scrollToBottom();
          break;
        case 'open-menu':
          renderer.onOpenMenu?.();
          break;
        case 'open-help':
          renderer.onOpenHelp?.();
          break;
        case 'enter-cave':
          store.dispatch({ type: 'COMMAND', payload: '进入洞天' });
          break;
        case 'upgrade-cave':
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '洞府升级功能开发中...' });
          break;
        case 'quickbar-edit':
          windowManager.openWindow('quickbar-edit');
          break;
        case 'quickbar-save': {
          const qb = QuickbarConfig.getInstance();
          qb.save();
          const qgrid = document.getElementById('quick-grid');
          if (qgrid) qb.render(qgrid);
          windowManager.closeWindow('quickbar-edit');
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '快捷栏配置已保存。' });
          break;
        }
        case 'quickbar-reset': {
          const qb2 = QuickbarConfig.getInstance();
          qb2.resetToDefault();
          const qpanel = document.querySelector('.quickbar-edit-panel');
          if (qpanel) qb2.renderEditPanel(qpanel as HTMLElement);
          break;
        }
        default:
          store.dispatch({ type: 'COMMAND', payload: action });
          break;
      }
      return;
    }

    const shopBuyBtn = target.closest('.shop-buy-btn');
    if (shopBuyBtn) {
      const idxStr = shopBuyBtn.getAttribute('data-item-index');
      if (idxStr !== null) {
        const idx = parseInt(idxStr);
        const player = store.getState().player;
        const shop = findShop(player.currentRoomId);
        if (shop && shop.items[idx]) {
          const item = shop.items[idx];
          store.dispatch({ type: 'COMMAND', payload: `购买 ${item.item.name}` });
        }
      }
      return;
    }

    const craftTab = target.closest('.craft-tab');
    if (craftTab) {
      const tab = craftTab.getAttribute('data-tab');
      if (tab) {
        document.querySelectorAll('.craft-tab').forEach(t => t.classList.remove('active'));
        craftTab.classList.add('active');
        if (tab === 'alchemy') {
          store.dispatch({ type: 'COMMAND', payload: '炼丹' });
        } else if (tab === 'forge') {
          store.dispatch({ type: 'COMMAND', payload: '锻造' });
        } else if (tab === 'rank') {
          store.dispatch({ type: 'COMMAND', payload: '品阶' });
        }
      }
      return;
    }

    const auctionTab = target.closest('.auction-tab');
    if (auctionTab) {
      const tab = auctionTab.getAttribute('data-tab');
      if (tab) {
        document.querySelectorAll('.auction-tab').forEach(t => t.classList.remove('active'));
        auctionTab.classList.add('active');
        store.dispatch({ type: 'COMMAND', payload: '拍卖' });
      }
      return;
    }

    const mountActionBtn = target.closest('.mount-action-btn');
    if (mountActionBtn) {
      const mountId = mountActionBtn.getAttribute('data-mount-id');
      if (mountId) {
        const btnText = mountActionBtn.textContent?.trim();
        if (btnText === '召唤') {
          store.dispatch({ type: 'COMMAND', payload: `骑乘 ${mountId}` });
        } else if (btnText === '下马') {
          store.dispatch({ type: 'COMMAND', payload: '下马' });
        }
      }
      return;
    }

    const formationActionBtn = target.closest('.formation-action-btn');
    if (formationActionBtn) {
      const formationId = formationActionBtn.getAttribute('data-formation-id');
      if (formationId) {
        store.dispatch({ type: 'COMMAND', payload: `布置 ${formationId}` });
      }
      return;
    }

    const talentStoryBtn = target.closest('.talent-story-btn');
    if (talentStoryBtn) {
      const talentId = talentStoryBtn.getAttribute('data-talent-id');
      if (talentId) {
        openTalentStory(talentId);
      }
      return;
    }

    const inventoryTab = target.closest('[data-inventory-tab]');
    if (inventoryTab) {
      const tabKey = inventoryTab.getAttribute('data-inventory-tab');
      if (tabKey) {
        currentInventoryTab = tabKey;
        const container = document.getElementById('feature-window-body');
        if (container) {
          renderFeatureContent('backpack', container);
        }
      }
      return;
    }

    const itemCard = target.closest('.item-card[data-item-index]');
    if (itemCard) {
      const idxStr = itemCard.getAttribute('data-item-index');
      if (idxStr !== null) {
        const idx = parseInt(idxStr);
        showItemDetail(idx);
      }
      return;
    }

    const itemUseBtn = target.closest('.item-use-btn');
    if (itemUseBtn) {
      const idxStr = itemUseBtn.getAttribute('data-index');
      if (idxStr !== null) {
        const idx = parseInt(idxStr);
        const player = store.getState().player;
        const item = player.inventory?.[idx];
        if (item) {
          if (item.type === ItemType.EQUIPMENT) {
            store.dispatch({ type: 'COMMAND', payload: `装备 ${item.name}` });
          } else {
            store.dispatch({ type: 'COMMAND', payload: `使用 ${item.name}` });
          }
        }
      }
      return;
    }

    // 快捷栏编辑面板：点击移除按钮
    const removeBtn = target.closest('[data-remove]');
    if (removeBtn) {
      const view = removeBtn.getAttribute('data-remove');
      if (view) {
        const quickbar = QuickbarConfig.getInstance();
        quickbar.toggleItem(view);
        const panel = document.querySelector('.quickbar-edit-panel');
        if (panel) {
          quickbar.renderEditPanel(panel as HTMLElement);
          setupQuickbarDrag(panel as HTMLElement);
        }
      }
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // 快捷栏编辑面板：点击功能项切换选中
    const editItem = target.closest('.quickbar-edit-item');
    if (editItem) {
      const view = editItem.getAttribute('data-view');
      if (view) {
        const quickbar = QuickbarConfig.getInstance();
        const wasSelected = quickbar.getSelectedViews().includes(view);
        const success = quickbar.toggleItem(view);
        if (wasSelected || success) {
          // 重新渲染整个面板
          const panel = document.querySelector('.quickbar-edit-panel');
          if (panel) {
            quickbar.renderEditPanel(panel as HTMLElement);
            setupQuickbarDrag(panel as HTMLElement);
          }
        } else if (!wasSelected && !success) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `快捷栏已满（最多 ${quickbar.getMaxSlots()} 项），请先取消其他功能。` });
        }
      }
      return;
    }

    const dataView = target.closest('[data-view]');
    if (dataView) {
      const view = (dataView as HTMLElement).dataset.view;
      if (view) renderer.onNavigate?.(view);
      return;
    }

    const choiceText = target.closest('.choice-text');
    if (choiceText) {
      const action = choiceText.getAttribute('data-action');
      if (action) {
        store.dispatch({ type: 'COMMAND', payload: action });
      }
      return;
    }

    const listItemActive = target.closest('.list-item-active');
    if (listItemActive) {
      const action = listItemActive.getAttribute('data-action');
      if (action) {
        store.dispatch({ type: 'COMMAND', payload: action });
      }
      return;
    }

    const npcNameLink = target.closest('.npc-name-link');
    if (npcNameLink) {
      const idx = npcNameLink.getAttribute('data-npc-idx');
      if (idx !== null) {
        renderer.onNPCClick?.(parseInt(idx));
      }
      return;
    }

    const mapExit = target.closest('.map-exit');
    if (mapExit) {
      const dir = mapExit.getAttribute('data-exit-dir');
      if (dir) {
        store.dispatch({ type: 'COMMAND', payload: dir });
      }
      return;
    }

    const detailItem = target.closest('.detail-item');
    if (detailItem) {
      const detailId = detailItem.getAttribute('data-detail-id');
      if (detailId) {
        store.dispatch({ type: 'COMMAND', payload: `探索 ${detailId}` });
      }
      return;
    }

    const switchMethod = target.closest('[data-switch-method]');
    if (switchMethod) {
      const methodId = (switchMethod as HTMLElement).dataset.switchMethod;
      if (methodId) {
        const result = MethodService.switchMethod(store.getState().player, methodId);
        if (result.success) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ ${result.message}` });
          const win = windowManager.getWindow('method');
          if (win) {
            win.renderContent();
          }
        } else {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: result.message });
        }
      }
      return;
    }

    const exchangeBtn = target.closest('[data-exchange-method]');
    if (exchangeBtn) {
      const methodId = (exchangeBtn as HTMLElement).dataset.exchangeMethod;
      if (methodId) {
        const player = store.getState().player;
        const result = MethodService.exchangeMethod(player, methodId, player.currentRoomId);
        if (result.success) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ ${result.message}` });
          store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
          const win = windowManager.getWindow('method');
          if (win) {
            win.renderContent();
          }
        } else {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: result.message });
        }
      }
      return;
    }
  });

  autoSaveInterval = setInterval(() => {
    const state = store.getState();
    saveManager.save(1, state.player, world.getSeed(), state.gameTime);
  }, 300000);

  // 游戏时间驱动：每 1 真实秒推进 1 游戏分钟
  timeTickInterval = setInterval(() => {
    store.dispatch({ type: 'TIME_TICK', payload: 1 });
  }, 1000);

  setTimeout(() => {
    const state = store.getState();
    const room = world.getRoom(state.player.currentRoomId);
    if (room) {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你来到了 ${room.name}。` });
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: room.description });
      // 房间叙事上下文化：附加上时辰/季节/境界感知氛围
      const decorated = SceneGenerator.decorateRoomDescription(room.description, state.gameTime, state.player.realm);
      if (decorated.ambiance) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `〔${decorated.ambiance}〕` });
      }
      if (room.exits && room.exits.length > 0) {
        const exitNames = room.exits.map(e => e.direction).join('、');
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `可前往：${exitNames}` });
      }
    }
  }, 500);

  let isDead = false;
  let lastRealm = player.realm;
  store.subscribe(() => {
    const p = store.getState().player;
    if (p.hp <= 0 && !isDead) {
      isDead = true;
      const overlay = document.getElementById('reincarnation-overlay');
      if (overlay) overlay.style.display = 'flex';
    }

    // 检查境界变化（突破成功后），触发隐藏天赋解锁检测
    if (p.realm !== lastRealm) {
      lastRealm = p.realm;
      // 检查隐藏天赋解锁
      const hiddenTalent = TalentService.checkHiddenTalentUnlock(p);
      if (hiddenTalent) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `\n━━━━━━━━━━━━━━━━━━━━` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `隐藏天赋觉醒：${hiddenTalent.talent.name}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `━━━━━━━━━━━━━━━━━━━━` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: hiddenTalent.talent.description });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: hiddenTalent.talent.effects.map((e: any) => e.description).join('、') });
      }
    }
  });

  let currentOrigin: IOriginResult | null = null;
  let selectedWorldId: WorldId = WorldId.PERFECT_WORLD;

  function renderWorldSelection(): void {
    const container = document.getElementById('creation-world');
    if (!container) return;

    container.innerHTML = WORLD_LIST.map(worldId => {
      const def = getWorldDefinition(worldId);
      const isSelected = selectedWorldId === worldId;
      return `
        <div class="world-card ${isSelected ? 'selected' : ''} ${def.colorClass}" data-world-id="${worldId}">
          <div class="world-name">${def.name}</div>
          <div class="world-desc">${def.description}</div>
          <div class="world-realms">境界：${def.realms.slice(1, 5).map(r => r.name).join(' → ')} → ...</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.world-card').forEach(el => {
      el.addEventListener('click', () => {
        const worldId = (el as HTMLElement).dataset.worldId as WorldId;
        if (!worldId) return;
        selectedWorldId = worldId;
        renderWorldSelection();
        generateNewOrigin();
      });
    });
  }

  function renderOriginInfo(): void {
    const container = document.getElementById('creation-origin');
    const startBtn = document.getElementById('creation-start') as HTMLButtonElement;
    if (!container || !currentOrigin) return;

    const config = currentOrigin.config;
    const rarityColors: Record<string, string> = {
      common: '#999999',
      uncommon: '#00ff00',
      rare: '#0088ff',
      epic: '#aa00ff',
      legendary: '#ff8800',
    };
    const rarityLabel: Record<string, string> = {
      common: '平凡',
      uncommon: '普通',
      rare: '稀有',
      epic: '史诗',
      legendary: '传说',
    };

    container.innerHTML = `
      <div class="origin-card origin-card-${config.rarity}">
        <div class="origin-header">
          <div class="origin-name">${config.name}</div>
          <div class="origin-rarity">${rarityLabel[config.rarity]}</div>
        </div>
        <div class="origin-desc">${config.description}</div>
        <div class="origin-stats">
          <div class="stat-item">
            <span class="stat-label">境界</span>
            <span class="stat-value">${RealmNames[config.startingRealm]}·${config.startingStage}层</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">职位</span>
            <span class="stat-value">${config.startingPosition}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">出生地</span>
            <span class="stat-value">${currentOrigin.zoneName} · ${currentOrigin.roomName}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">初始金币</span>
            <span class="stat-value">${config.startingGold[0]}~${config.startingGold[1]}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">初始天赋</span>
            <span class="stat-value">${config.startingTalentCount}个</span>
          </div>
        </div>
        <div class="origin-items">
          <div class="origin-label">初始物品</div>
          <div class="origin-items-list">${config.startingItems.map(id => getItemById(id)?.name || id).join('、')}</div>
        </div>
        ${config.startingTechniques.length > 0 ? `
        <div class="origin-techniques">
          <div class="origin-label">初始术法</div>
          <div class="origin-techniques-list">${config.startingTechniques.map(id => getTechniqueById(id)?.name || id).join('、')}</div>
        </div>` : ''}
      </div>
    `;

    if (startBtn) startBtn.disabled = false;
  }

  function generateNewOrigin(): void {
    currentOrigin = OriginSystem.generateOrigin(selectedWorldId);
    renderOriginInfo();
  }

  let creationUIInitialized = false;
  let selectedTalentIds: string[] = [];
  let currentTalents: ITalent[] = [];

  function renderTalents(): void {
    const container = document.getElementById('creation-talents');
    const countEl = document.getElementById('creation-selected-count');
    if (!container) return;

    currentTalents = getRandomTalents(9);
    selectedTalentIds = [];

    container.innerHTML = currentTalents.map((talent, index) => {
      const rarityColors: Record<string, string> = {
        common: '#999999',
        rare: '#0088ff',
        legendary: '#ff8800',
      };
      const rarityLabels: Record<string, string> = {
        common: '凡品',
        rare: '稀有',
        legendary: '传说',
      };
      const typeLabels: Record<string, string> = {
        innate: '先天',
        physique: '体质',
        soul: '神魂',
      };

      return `
        <div class="creation-talent" data-talent-id="${talent.id}" data-talent-index="${index}">
          <div class="creation-talent-rarity rarity-${talent.rarity}" style="color: ${rarityColors[talent.rarity]}; border-color: ${rarityColors[talent.rarity]};">
            ${rarityLabels[talent.rarity]} · ${typeLabels[talent.type]}
          </div>
          <div class="creation-talent-name">${talent.name}</div>
          <div class="creation-talent-desc">${talent.description}</div>
          <div class="creation-talent-effects">
            ${talent.effects.map(e => e.description).join('、')}
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.creation-talent').forEach(el => {
      el.addEventListener('click', () => {
        const talentId = (el as HTMLElement).dataset.talentId;
        if (!talentId) return;

        const idx = selectedTalentIds.indexOf(talentId);
        if (idx > -1) {
          selectedTalentIds.splice(idx, 1);
          el.classList.remove('selected');
        } else {
          if (selectedTalentIds.length >= 3) {
            store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '最多只能选择3个天赋！' });
            return;
          }
          selectedTalentIds.push(talentId);
          el.classList.add('selected');
        }

        if (countEl) countEl.textContent = `${selectedTalentIds.length}/3`;
        checkStartButton();
      });
    });

    if (countEl) countEl.textContent = '0/3';
    checkStartButton();
  }

  function checkStartButton(): void {
    const startBtn = document.getElementById('creation-start') as HTMLButtonElement;
    if (startBtn) {
      startBtn.disabled = selectedTalentIds.length < 3 || !currentOrigin;
    }
  }

  function initCreationUI(): void {
    if (creationUIInitialized) return;
    creationUIInitialized = true;

    renderWorldSelection();
    generateNewOrigin();
    renderTalents();

    const refreshBtn = document.getElementById('creation-refresh');
    if (refreshBtn) refreshBtn.addEventListener('click', renderTalents);

    const rerollOriginBtn = document.getElementById('creation-reroll-origin');
    if (rerollOriginBtn) {
      rerollOriginBtn.addEventListener('click', generateNewOrigin);
    }

    const startBtn = document.getElementById('creation-start');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('creation-name') as HTMLInputElement;
        const name = nameInput?.value.trim() || '无名修士';
        if (!currentOrigin || selectedTalentIds.length < 3) return;

        const p = store.getState().player;
        const originData = OriginSystem.createPlayerFromOrigin(currentOrigin);

        Object.assign(p, originData, {
          id: 'player_001',
          name,
          origin: currentOrigin.config.type,
          reincarnationCount: 0,
          talentIds: [...selectedTalentIds],
          passives: [],
          avatars: [],
          laws: [],
          killedMonsters: [],
          totalPlayTime: 0,
          totalOfflineTime: 0,
          caves: [],
          mounts: [],
          alchemySkill: { level: 1, exp: 0, maxExp: 100 },
          dungeonProgress: [],
          formations: [],
          achievements: [],
          titles: [],
          currentTitleId: undefined,
          hiddenStorylines: [],
          discoveredClues: [],
          intimacyMap: new Map(),
          bondSkills: [],
          completedQuests: [],
          activeQuests: [],
          caveCount: 0,
          equipment: { weapon: null, armor: null, boots: null, accessory1: null, accessory2: null, artifact: null },
          battleStrategy: [
            { id: 'rule1', priority: 1, condition: { type: 'hp_less_than' as const, threshold: 30 }, action: { type: 'defend' as const } },
            { id: 'rule2', priority: 2, condition: { type: 'always' as const }, action: { type: 'attack' as const } }
          ],
          offlineStrategy: {
            movementMode: 'wander',
            activityBias: { combat: 0.5, gathering: 0.3, cultivation: 0.2, explore: 0.4 },
            battleRules: [],
            supplyThreshold: { hpPercent: 30, manaPercent: 20 },
            fleeIfUnbeatable: true,
            useEscapeToken: true,
          },
        });

        store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

        const overlay = document.getElementById('creation-overlay');
        if (overlay) overlay.style.display = 'none';

        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【欢迎】${getWorldDefinition(selectedWorldId).name}` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你出生于 **${currentOrigin.zoneName}** 的 ${currentOrigin.roomName}。` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你的身份：${currentOrigin.originName}（${currentOrigin.config.startingPosition}）` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: currentOrigin.originDescription });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '【开局提示】' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '• 点击底部「修炼」按钮开始修行，提升境界' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '• 点击「任务」查看和接取新手任务' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '• 点击「舆图」探索周边区域，寻找机缘' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '• 点击「天赋」查看你的天赋能力' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '• 点击「状态」查看当前属性和修炼进度' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '开始你的修仙之旅吧！' });

        setTimeout(() => {
          const tutorial = TutorialSystem.getInstance();
          tutorial.start();
        }, 1500);

        setTimeout(() => {
          QuestNotification.checkAndNotify(p);
        }, 5000);

        // 初始化UI组件
        const statusMonitor = StatusMonitor.getInstance();
        statusMonitor.show();

        const goalTracker = GoalTracker.getInstance();
        goalTracker.show();

        const miniMap = MiniMap.getInstance();
        const toastManager = ToastManager.getInstance();

        // 初始化世界地图
        const worldMap = WorldMap.getInstance();
        const currentWorldId = p.currentWorldId || WorldId.PERFECT_WORLD;
        const worldZones = ALL_ZONES.filter(z => z.id.startsWith(currentWorldId.replace('_', '_')) || z.id.includes(currentWorldId.split('_')[0]));
        worldMap.init(p, worldZones, currentWorldId, (zoneId, roomId) => {
          store.dispatch({ type: 'COMMAND', payload: `传送 ${roomId}` });
        });

        saveManager.save(1, p, world.getSeed(), { ticks: 0, day: 1, hour: 8, minute: 0, season: Season.SPRING, timeOfDay: TimeOfDay.MORNING });
      });
    }
  }

  function initReincarnationUI(): void {
    const reincarnationBtn = document.getElementById('reincarnation-btn');
    if (reincarnationBtn) {
      reincarnationBtn.addEventListener('click', () => {
        const p = store.getState().player;

        const effects = getTalentEffects(p.talentIds);
        const retainPercent = Math.max(10, effects.reincarnationRetain || 0);
        const retainedExp = Math.floor(p.cultivationExp * retainPercent / 100);

        // 前世记忆增益：基于前世境界与转世次数累积
        const previousRealm = p.realm;
        if (previousRealm > (p.highestRealmReached || CultivationRealm.MORTAL)) {
          p.highestRealmReached = previousRealm;
        }
        // 每转世一次，前世记忆加成 = 前世境界等级 × 0.5 + 转世次数 × 0.3（百分比点）
        const memoryGain = Math.floor(previousRealm * 0.5 + (p.reincarnationCount + 1) * 0.3);
        p.pastLifeMemory = (p.pastLifeMemory || 0) + memoryGain;

        p.reincarnationCount++;
        p.cultivationExp = retainedExp;
        p.gold = Math.floor(p.gold * 0.3);

        store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

        isDead = false;

        const overlay = document.getElementById('reincarnation-overlay');
        if (overlay) overlay.style.display = 'none';

        initCreationUI();

        const creationOverlay = document.getElementById('creation-overlay');
        if (creationOverlay) creationOverlay.style.display = 'flex';

        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你已转世重修，保留 ${retainPercent}% 修为（${retainedExp} 点）。` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `前世记忆觉醒，突破成功率加成 +${memoryGain}%（当前总计 +${p.pastLifeMemory}%）。` });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '重新投胎，开始新的人生。' });

        generateNewOrigin();
        renderTalents();
      });
    }
  }

  function showOfflineReport(rewards: any): void {
    const modal = document.createElement('div');
    modal.className = 'creation-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
      <div class="creation-card">
        <div class="creation-header">
          <div class="creation-title">【离线收益】</div>
          <div class="creation-subtitle">— 你离开了一段时间 —</div>
        </div>
        <div class="creation-body text-center">
          ${rewards.messages.map((m: string) => `<p class="offline-message">${m}</p>`).join('')}
        </div>
        <div class="creation-footer">
          <button id="offline-continue-btn" class="creation-start-btn">继续游戏</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const btn = modal.querySelector('#offline-continue-btn') as HTMLButtonElement;
    btn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  }

  window.initCreationUI = initCreationUI;
  (window as any).initReincarnationUI = initReincarnationUI;
  window.showOfflineReport = showOfflineReport;
  (window as any).generateNewOrigin = generateNewOrigin;

  renderer.render();

  initFeatureWindows();
  initQuickbar();

  renderer.onNavigate = (view: string) => {
    // 修炼直接走命令系统（不需要打开窗口）
    if (view === 'cultivation') {
      store.dispatch({ type: 'COMMAND', payload: '修炼' });
      return;
    }
    // 世界地图打开全屏覆盖层
    if (view === 'worldmap') {
      const worldMap = WorldMap.getInstance();
      if (!worldMap.isVisible()) {
        worldMap.show();
      } else {
        worldMap.hide();
      }
      return;
    }
    // 其他功能打开专属窗口
    windowManager.openWindow(view);
  };

  const exitToMenuBtn = document.getElementById('menu-btn-exit');
  if (exitToMenuBtn) {
    exitToMenuBtn.addEventListener('click', exitToMainMenu);
  }

  window.addEventListener('resize', handleResize);
}

function initFeatureWindows(): void {
  const windowConfigs: Record<string, { title: string; width: number; height: number }> = {
    backpack: { title: '背包', width: 800, height: 600 },
    equip: { title: '装备', width: 700, height: 550 },
    shop: { title: '商店', width: 800, height: 600 },
    status: { title: '状态', width: 700, height: 550 },
    task: { title: '任务', width: 800, height: 600 },
    map: { title: '地图', width: 900, height: 650 },
    craft: { title: '炼制', width: 800, height: 600 },
    method: { title: '功法', width: 800, height: 600 },
    technique: { title: '宝术', width: 800, height: 600 },
    companion: { title: '道侣', width: 800, height: 600 },
    clan: { title: '宗门', width: 900, height: 650 },
    cave: { title: '洞府', width: 700, height: 550 },
    mount: { title: '坐骑', width: 700, height: 550 },
    formation: { title: '阵法', width: 800, height: 600 },
    auction: { title: '拍卖', width: 900, height: 650 },
    achieve: { title: '成就', width: 800, height: 600 },
    talent: { title: '天赋', width: 800, height: 600 },
  };

  Object.entries(windowConfigs).forEach(([key, config]) => {
    windowManager.registerWindow({
      id: key,
      title: config.title,
      width: config.width,
      height: config.height,
      renderer: (container: HTMLElement) => renderFeatureContent(key, container),
    });

    const btn = document.getElementById(`btn-${key}`);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        windowManager.openWindow(key);
      });
    }
  });
}

function initQuickbar(): void {
  const quickbar = QuickbarConfig.getInstance();
  const grid = document.getElementById('quick-grid');
  if (!grid) return;

  // 初始渲染快捷栏
  quickbar.render(grid);

  // 注册窗口配置（用于编辑面板）
  windowManager.registerWindow({
    id: 'quickbar-edit',
    title: '自定快捷栏',
    width: 600,
    height: 650,
    renderer: (container: HTMLElement) => {
      quickbar.renderEditPanel(container);
      setupQuickbarDrag(container);
    },
  });
}

function setupQuickbarDrag(container: HTMLElement): void {
  const selectedContainer = document.getElementById('quickbar-edit-selected');
  if (!selectedContainer) return;

  let draggedView: string | null = null;
  let draggedEl: HTMLElement | null = null;

  selectedContainer.addEventListener('dragstart', (e) => {
    const item = (e.target as HTMLElement).closest('.quickbar-selected-item');
    if (!item) return;
    draggedEl = item as HTMLElement;
    draggedView = draggedEl.getAttribute('data-view');
    draggedEl.classList.add('is-dragging');
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', draggedView || '');
    }
  });

  selectedContainer.addEventListener('dragend', (e) => {
    if (draggedEl) {
      draggedEl.classList.remove('is-dragging');
      draggedEl = null;
      draggedView = null;
    }
    const placeholders = selectedContainer.querySelectorAll('.drag-placeholder');
    placeholders.forEach(p => p.remove());
  });

  selectedContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!draggedView) return;

    const afterElement = getDragAfterElement(selectedContainer, e.clientY);
    const placeholder = selectedContainer.querySelector('.drag-placeholder');
    if (placeholder) placeholder.remove();

    const newPlaceholder = document.createElement('div');
    newPlaceholder.className = 'drag-placeholder';

    if (afterElement == null) {
      selectedContainer.appendChild(newPlaceholder);
    } else {
      selectedContainer.insertBefore(newPlaceholder, afterElement);
    }
  });

  selectedContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!draggedView) return;

    const afterElement = getDragAfterElement(selectedContainer, e.clientY);
    const items = Array.from(selectedContainer.querySelectorAll('.quickbar-selected-item'));
    let toIndex = items.length;

    if (afterElement) {
      toIndex = items.indexOf(afterElement as HTMLElement);
    }

    const quickbar = QuickbarConfig.getInstance();
    quickbar.moveItem(draggedView, toIndex);

    // 重新渲染已选区域
    const panel = container.querySelector('.quickbar-edit-panel');
    if (panel) {
      quickbar.renderEditPanel(container);
      setupQuickbarDrag(container);
    }
  });

  function getDragAfterElement(container: HTMLElement, y: number): HTMLElement | null {
    const draggableElements = Array.from(
      container.querySelectorAll('.quickbar-selected-item:not(.is-dragging)')
    ) as HTMLElement[];

    interface DragClosest {
      offset: number;
      element: HTMLElement | null;
    }

    return draggableElements.reduce<DragClosest>((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
  }
}


function renderFeatureContent(windowId: string, container: HTMLElement): void {
  const state = store?.getState();
  if (!state) {
    container.innerHTML = '<div class="empty-state">无法获取游戏数据</div>';
    return;
  }

  const p = state.player;

  switch (windowId) {
    case 'backpack':
      container.innerHTML = renderBackpackContent(p);
      break;
    case 'equip':
      container.innerHTML = renderEquipmentContent(p);
      break;
    case 'status':
      container.innerHTML = renderStatusContent(p);
      break;
    case 'task':
      container.innerHTML = renderTaskContent(state);
      break;
    case 'method':
      container.innerHTML = renderMethodContent(p);
      break;
    case 'technique':
      container.innerHTML = renderTechniqueContent(p);
      break;
    case 'achieve':
      container.innerHTML = renderAchievementContent(p);
      break;
    case 'shop':
      container.innerHTML = renderShopContent(p, state);
      break;
    case 'map':
      container.innerHTML = renderMapContent(p, state);
      break;
    case 'craft':
      container.innerHTML = renderCraftContent(p);
      break;
    case 'cave':
      container.innerHTML = renderCaveContent(p);
      break;
    case 'mount':
      container.innerHTML = renderMountContent(p);
      break;
    case 'formation':
      container.innerHTML = renderFormationContent(p);
      break;
    case 'auction':
      container.innerHTML = renderAuctionContent(p);
      break;
    case 'talent':
      container.innerHTML = renderTalentContent(p);
      break;
    case 'companion':
      container.innerHTML = renderCompanionContent(p);
      break;
    case 'clan':
      container.innerHTML = renderClanContent(p, state);
      break;
    default:
      container.innerHTML = `<div class="empty-state">功能开发中</div>`;
  }
}

function getQualityClass(quality: string): string {
  const map: Record<string, string> = {
    '凡品': 'quality-common',
    '良品': 'quality-uncommon',
    '珍品': 'quality-rare',
    '极品': 'quality-epic',
    '仙品': 'quality-legendary',
    '神品': 'quality-mythic',
  };
  return map[quality] || 'quality-common';
}

function getItemIcon(item: IItem): string {
  if (item.icon) return item.icon;
  const typeIcons: Record<string, string> = {
    [ItemType.ELIXIR]: '丹',
    [ItemType.MATERIAL]: '材',
    [ItemType.EQUIPMENT]: '器',
    [ItemType.QUEST]: '任',
    [ItemType.SPECIAL]: '特',
    [ItemType.FRAGMENT]: '碎',
  };
  return typeIcons[item.type] || '物';
}

function getInventoryTabs(): { key: string; label: string; type?: ItemType }[] {
  return [
    { key: 'all', label: '全部' },
    { key: 'elixir', label: '丹药', type: ItemType.ELIXIR },
    { key: 'material', label: '材料', type: ItemType.MATERIAL },
    { key: 'equipment', label: '装备', type: ItemType.EQUIPMENT },
    { key: 'quest', label: '任务', type: ItemType.QUEST },
    { key: 'special', label: '特殊', type: ItemType.SPECIAL },
    { key: 'fragment', label: '碎片', type: ItemType.FRAGMENT },
  ];
}

function getFilteredInventory(inventory: IItem[], tabKey: string): IItem[] {
  if (tabKey === 'all') return inventory;
  const tabs = getInventoryTabs();
  const tab = tabs.find(t => t.key === tabKey);
  if (!tab || !tab.type) return inventory;
  return inventory.filter(item => item.type === tab.type);
}

function getInventoryCounts(inventory: IItem[]): Record<string, number> {
  const counts: Record<string, number> = { all: inventory.length };
  const tabs = getInventoryTabs();
  tabs.forEach(tab => {
    if (tab.type) {
      counts[tab.key] = inventory.filter(item => item.type === tab.type).length;
    }
  });
  return counts;
}

function renderBackpackContent(player: IPlayer): string {
  const inventory = player.inventory || [];
  const tabs = getInventoryTabs();
  const counts = getInventoryCounts(inventory);
  const filtered = getFilteredInventory(inventory, currentInventoryTab);

  if (filtered.length === 0) {
    return `
      <div class="inventory-panel">
        <div class="inventory-tabs">
          ${tabs.map(tab => `
            <button class="inventory-tab ${currentInventoryTab === tab.key ? 'is-active' : ''}" data-inventory-tab="${tab.key}">
              ${tab.label}
              <span class="inventory-tab-count">${counts[tab.key] || 0}</span>
            </button>
          `).join('')}
        </div>
        <div class="inventory-summary">
          <span class="inventory-summary-text">共 <em>${inventory.length}</em> 件物品</span>
        </div>
        <div class="empty-state">
          <div class="empty-state-icon">空</div>
          <div class="empty-state-text">此处空空如也</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="inventory-panel">
      <div class="inventory-tabs">
        ${tabs.map(tab => `
          <button class="inventory-tab ${currentInventoryTab === tab.key ? 'is-active' : ''}" data-inventory-tab="${tab.key}">
            ${tab.label}
            <span class="inventory-tab-count">${counts[tab.key] || 0}</span>
          </button>
        `).join('')}
      </div>
      <div class="inventory-summary">
        <span class="inventory-summary-text">共 <em>${inventory.length}</em> 件物品</span>
      </div>
      <div class="inventory-grid">
        ${filtered.map((item, i) => {
          const originalIndex = inventory.indexOf(item);
          const qualityClass = getQualityClass(item.quality);
          const icon = getItemIcon(item);
          return `
            <div class="item-card ${qualityClass}" data-item-index="${originalIndex}">
              <div class="item-icon">${icon}</div>
              <div class="item-name">${item.name}</div>
              <div class="item-type-tag">${item.quality}</div>
              ${item.stackable && item.maxStack && item.maxStack > 1 ? `<div class="item-stack-count">×${item.maxStack}</div>` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function showItemDetail(itemIndex: number): void {
  const player = store.getState().player;
  const item = player.inventory?.[itemIndex];
  if (!item) return;

  const qualityClass = getQualityClass(item.quality);
  const icon = getItemIcon(item);
  const isEquipment = item.type === ItemType.EQUIPMENT;
  const isUsable = item.type === ItemType.ELIXIR || item.type === ItemType.SPECIAL;

  const statsHtml = item.stats && Object.keys(item.stats).length > 0 ? `
    <div class="item-detail-stats">
      ${Object.entries(item.stats).map(([key, value]) => {
        const statNames: Record<string, string> = {
          attack: '攻击', defense: '防御', hp: '气血', mana: '法力', speed: '速度', crit: '暴击'
        };
        return `
          <div class="item-detail-stat-row">
            <span class="item-detail-stat-label">${statNames[key] || key}</span>
            <span class="item-detail-stat-value">+${value}</span>
          </div>
        `;
      }).join('')}
    </div>
  ` : '';

  const effectHtml = item.effect ? `
    <div class="item-detail-effect">
      <div class="item-detail-effect-label">◆ 效果</div>
      <div class="item-detail-effect-text">${formatEffect(item.effect)}</div>
    </div>
  ` : '';

  const descHtml = item.desc ? `
    <div class="item-detail-desc">${item.desc}</div>
  ` : '';

  const modal = document.createElement('div');
  modal.className = 'item-detail-overlay';
  modal.innerHTML = `
    <div class="item-detail-modal">
      <div class="item-detail-header">
        <div class="item-detail-icon ${qualityClass}">${icon}</div>
        <div class="item-detail-title">
          <div class="item-detail-name" style="color: var(--paper-0);">${item.name}</div>
          <div class="item-detail-quality">${item.quality} · ${getItemTypeName(item.type)}</div>
        </div>
      </div>
      <div class="item-detail-body">
        ${descHtml}
        ${statsHtml}
        ${effectHtml}
      </div>
      <div class="item-detail-footer">
        <button class="item-detail-btn" data-detail-action="close">关闭</button>
        ${isEquipment ? `<button class="item-detail-btn is-primary" data-detail-action="equip" data-index="${itemIndex}">装备</button>` : ''}
        ${isUsable ? `<button class="item-detail-btn is-primary" data-detail-action="use" data-index="${itemIndex}">使用</button>` : ''}
      </div>
    </div>
  `;

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    const actionBtn = target.closest('[data-detail-action]');
    if (actionBtn) {
      const action = actionBtn.getAttribute('data-detail-action');
      const idxStr = actionBtn.getAttribute('data-index');
      if (action === 'close') {
        modal.remove();
        modal.removeEventListener('click', handleClick);
      } else if (action === 'equip' && idxStr !== null) {
        const idx = parseInt(idxStr);
        const invItem = store.getState().player.inventory?.[idx];
        if (invItem) {
          store.dispatch({ type: 'COMMAND', payload: `装备 ${invItem.name}` });
        }
        modal.remove();
        modal.removeEventListener('click', handleClick);
        refreshBackpackWindow();
      } else if (action === 'use' && idxStr !== null) {
        const idx = parseInt(idxStr);
        const invItem = store.getState().player.inventory?.[idx];
        if (invItem) {
          store.dispatch({ type: 'COMMAND', payload: `使用 ${invItem.name}` });
        }
        modal.remove();
        modal.removeEventListener('click', handleClick);
        refreshBackpackWindow();
      }
      return;
    }

    if (target === modal) {
      modal.remove();
      modal.removeEventListener('click', handleClick);
    }
  };

  modal.addEventListener('click', handleClick);
  document.body.appendChild(modal);
}

function refreshBackpackWindow(): void {
  if (windowManager.isOpen('backpack')) {
    windowManager.refreshActiveWindow();
  }
}

function renderEquipmentContent(player: IPlayer): string {
  const slots: { key: keyof typeof player.equipment; label: string }[] = [
    { key: 'weapon', label: '武器' },
    { key: 'armor', label: '护甲' },
    { key: 'boots', label: '靴子' },
    { key: 'accessory1', label: '饰品1' },
    { key: 'accessory2', label: '饰品2' },
    { key: 'artifact', label: '法宝' },
  ];
  return `
    <div class="equip-list">
      ${slots.map(slot => {
        const item = player.equipment[slot.key];
        return `
          <div class="equip-slot">
            <span class="slot-label">${slot.label}</span>
            ${item ? `
              <div class="slot-item equipped">
                <div class="item-name">${item.name}</div>
                <div class="item-stats">${formatStats(item.stats || {})}</div>
              </div>
            ` : '<span class="slot-item empty">空</span>'}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderStatusContent(player: IPlayer): string {
  const realmName = getWorldFullRealmName(player.currentWorldId, player.realm, player.realmStage, player.realmPerfection);
  const expPercent = player.maxCultivationExp > 0
    ? Math.floor((player.cultivationExp / player.maxCultivationExp) * 100)
    : 0;
  const retainPercent = Math.min(30, 10 + player.reincarnationCount * 2);
  const currentMethod = player.currentMethodId
    ? getMethod(player.currentMethodId)
    : null;

  return `
    <div class="status-content">
      <div class="status-section-title">基础信息</div>
      <div class="status-attrs">
        <div class="status-attr">
          <span class="status-attr-label">姓名</span>
          <span class="status-attr-value">${player.name}</span>
        </div>
        <div class="status-attr">
          <span class="status-attr-label">境界</span>
          <span class="status-attr-value">${realmName}</span>
        </div>
        <div class="status-attr">
          <span class="status-attr-label">转世</span>
          <span class="status-attr-value">${player.reincarnationCount}次</span>
        </div>
        <div class="status-attr">
          <span class="status-attr-label">保留率</span>
          <span class="status-attr-value">${retainPercent}%</span>
        </div>
      </div>

      <div class="status-section-title">修炼进度</div>
      <div class="panel-progress" style="margin-bottom:var(--sp-3)">
        <div class="panel-progress-bar">
          <div class="panel-progress-fill" style="width:${expPercent}%"></div>
        </div>
        <span class="panel-progress-text">${player.cultivationExp} / ${player.maxCultivationExp} (${expPercent}%)</span>
      </div>
      ${currentMethod ? `
        <div class="panel-card">
          <div class="panel-card-header">
            <span class="panel-card-name">${currentMethod.name}</span>
            <span class="panel-card-tag">修炼中</span>
          </div>
          <div class="panel-card-desc">${currentMethod.description || '无描述'}</div>
          <div class="panel-card-meta">
            <span>速度加成: ${currentMethod.speedBonus || 1}x</span>
            <span>品阶: ${currentMethod.grade}</span>
          </div>
        </div>
      ` : `<div class="empty-state" style="padding:var(--sp-4)"><div class="empty-state-icon">功</div><div>尚未修炼任何功法</div></div>`}

      <div class="status-section-title">属性</div>
      <div class="status-attrs">
        <div class="status-attr">
          <span class="status-attr-label">气血</span>
          <span class="status-attr-value">${player.hp}/${player.maxHp}</span>
        </div>
        <div class="status-attr">
          <span class="status-attr-label">法力</span>
          <span class="status-attr-value">${player.mana}/${player.maxMana}</span>
        </div>
        <div class="status-attr">
          <span class="status-attr-label">攻击</span>
          <span class="status-attr-value">${player.attack}</span>
        </div>
        <div class="status-attr">
          <span class="status-attr-label">防御</span>
          <span class="status-attr-value">${player.defense}</span>
        </div>
        <div class="status-attr">
          <span class="status-attr-label">速度</span>
          <span class="status-attr-value">${player.speed}</span>
        </div>
        <div class="status-attr">
          <span class="status-attr-label">暴击</span>
          <span class="status-attr-value">${(player.critRate * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div class="status-section-title">资源</div>
      <div class="status-attrs">
        <div class="status-attr">
          <span class="status-attr-label">原始币</span>
          <span class="status-attr-value">${player.gold}</span>
        </div>
        <div class="status-attr">
          <span class="status-attr-label">洞府</span>
          <span class="status-attr-value">${player.caveCount}</span>
        </div>
      </div>
    </div>
  `;
}

function renderTaskContent(state: IGameState): string {
  const activeQuests = state.player.activeQuests || [];
  const completedQuests = state.player.completedQuests || [];
  
  if (activeQuests.length === 0 && completedQuests.length === 0) {
    return `<div class="empty-state">暂无任务</div>`;
  }

  const formatQuestProgress = (quest: any) => {
    if (!quest.stages || quest.stages.length === 0) return '';
    const currentStage = quest.stages.find((s: any) => s.id === quest.currentStageId);
    if (!currentStage || !currentStage.objectives) return '';
    return currentStage.objectives.map((o: any) => `${o.current}/${o.required}`).join(' ');
  };

  return `
    <div class="task-list">
      ${activeQuests.length > 0 ? `
        <div class="task-section">
          <div class="task-section-title">进行中</div>
          ${activeQuests.map((quest: any) => `
            <div class="task-card">
              <div class="task-name">${quest.name}</div>
              <div class="task-desc">${quest.description}</div>
              <div class="task-progress">进度: ${formatQuestProgress(quest)}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      ${completedQuests.length > 0 ? `
        <div class="task-section">
          <div class="task-section-title completed">已完成</div>
          ${completedQuests.map((id: string) => {
            const quest = findQuest(id);
            return quest ? `
              <div class="task-card completed">
                <div class="task-name">${quest.name}</div>
              </div>
            ` : '';
          }).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function renderMethodContent(player: IPlayer): string {
  const currentMethod = player.currentMethodId ? getMethod(player.currentMethodId) : null;
  const knownMethods = MethodService.listKnownMethods(player);
  const allMethods = getMethodsByRealm(player.realm);
  const unknownMethods = allMethods.filter(m => !player.knownMethodIds.includes(m.id));

  const getGradeClass = (grade: string) => {
    const map: Record<string, string> = {
      '黄': 'grade-yellow', '玄': 'grade-xuan', '地': 'grade-di',
      '天': 'grade-tian', '至尊': 'grade-zhizun', '仙': 'grade-xian'
    };
    return map[grade] || 'grade-default';
  };

  return `
    <div class="method-content">
      <div class="method-current-section">
        <div class="method-section-title">当前修炼</div>
        ${currentMethod ? `
          <div class="method-card current">
            <div class="method-header">
              <span class="method-grade-badge ${getGradeClass(currentMethod.grade)}">${currentMethod.grade}品</span>
              <span class="method-name">${currentMethod.name}</span>
            </div>
            <div class="method-desc">${currentMethod.description}</div>
            <div class="method-proficiency">
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${(player.methodProficiency / player.methodMaxProficiency) * 100}%"></div>
              </div>
              <span>${player.methodProficiency}/${player.methodMaxProficiency}</span>
            </div>
            <div class="method-meta">
              <span>领悟次数: ${player.methodEnlightenmentCount}</span>
              <span>修炼加成: ${currentMethod.speedBonus}x</span>
            </div>
            ${currentMethod.evolvesTo ? `
              <div class="method-evolve-hint">
                满熟练度后可进阶为《${currentMethod.evolvesToName}》
              </div>
            ` : ''}
            ${currentMethod.specialEffects.length > 0 ? `
              <div class="method-effects">
                ${currentMethod.specialEffects.map(e => `<span class="method-effect-tag">${e}</span>`).join('')}
              </div>
            ` : ''}
            <div class="method-acquire-info">
              <span class="acquire-label">${ACQUIRE_TYPE_LABELS[currentMethod.acquireType] || ''}</span>
              <span class="acquire-detail">${currentMethod.acquireDetail}</span>
            </div>
          </div>
        ` : `<div class="empty-state">尚未修炼任何功法</div>`}
      </div>

      ${knownMethods.length > 1 ? `
        <div class="method-known-section">
          <div class="method-section-title">已习得功法（点击切换）</div>
          <div class="method-known-list">
            ${knownMethods.filter(m => !m.isCurrent).map(m => `
              <div class="method-known-item" data-switch-method="${m.method.id}">
                <span class="method-grade-badge ${getGradeClass(m.method.grade)}">${m.method.grade}</span>
                <span class="method-known-name">${m.method.name}</span>
                <span class="method-known-bonus">${m.method.speedBonus}x</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${unknownMethods.length > 0 ? `
        <div class="method-unknown-section">
          <div class="method-section-title">可获取功法</div>
          <div class="method-unknown-list">
            ${unknownMethods.map(m => {
              const isExchange = m.acquireType === AcquireType.EXCHANGE;
              const atLocation = isExchange && m.acquireCondition?.exchangeLocationId === player.currentRoomId;
              const cost = m.acquireCondition?.exchangeCost;
              const canAfford = isExchange && (!cost?.gold || player.gold >= cost.gold) && (!cost?.reputation || player.reputation >= cost.reputation);
              const exchangeBtn = isExchange ? `
                <button class="method-exchange-btn ${atLocation && canAfford ? '' : 'disabled'}"
                  ${atLocation && canAfford ? `data-exchange-method="${m.id}"` : ''}>
                  ${atLocation ? (canAfford ? '兑换' : '不足') : '异地'}
                </button>
              ` : '';
              return `
              <div class="method-unknown-item">
                <span class="method-grade-badge ${getGradeClass(m.grade)}">${m.grade}</span>
                <span class="method-unknown-name">${m.name}</span>
                <span class="method-unknown-source">${ACQUIRE_TYPE_LABELS[m.acquireType] || ''}</span>
                ${exchangeBtn}
                <span class="method-unknown-detail">${m.acquireDetail}</span>
              </div>
            `;
            }).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function renderTechniqueContent(player: IPlayer): string {
  if (!player.techniques || player.techniques.length === 0) {
    return `<div class="empty-state">暂无宝术</div>`;
  }
  return `
    <div class="technique-list">
      ${player.techniques.map((t, i) => `
        <div class="technique-card">
          <div class="technique-name">${t.name}</div>
          <div class="technique-desc">${t.description}</div>
          <div class="technique-stats">
            <span>伤害: ${t.baseDamage || 0}</span>
            <span>消耗: ${t.manaCost || 0}法力</span>
            <span>冷却: ${t.cooldown || 0}回合</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAchievementContent(player: IPlayer): string {
  const achievements = player.achievements || [];
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  return `
    <div class="achievement-content">
      <div class="achievement-header">已解锁: ${unlockedCount}/${SEED_ACHIEVEMENTS.length}</div>
      <div class="achievement-grid">
        ${SEED_ACHIEVEMENTS.map(ach => {
          const unlocked = achievements.find(a => a.id === ach.id)?.unlocked;
          return `
            <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
              <div class="achievement-icon">${unlocked ? '✓' : '○'}</div>
              <div class="achievement-name">${ach.name}</div>
              ${unlocked ? `<div class="achievement-desc">${ach.description}</div>` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderShopContent(player: IPlayer, state: IGameState): string {
  const shop = findShop(player.currentRoomId);
  if (!shop) {
    return `<div class="empty-state">当前位置没有商店</div>`;
  }
  return `
    <div class="shop-content">
      <div class="shop-header">${shop.name}</div>
      <div class="shop-greeting">${shop.greeting}</div>
      <div class="shop-items">
        ${shop.items.map((item, i) => `
          <div class="shop-item">
            <div class="shop-item-icon">${item.item.icon}</div>
            <div class="shop-item-info">
              <div class="shop-item-name">${item.item.name}</div>
              <div class="shop-item-desc">${item.item.desc}</div>
              <div class="shop-item-price">${item.price}原始币</div>
              ${item.stock > 0 ? `<div class="shop-item-stock">库存: ${item.stock}</div>` : item.stock === -1 ? '' : `<div class="shop-item-stock">已售罄</div>`}
            </div>
            <button class="shop-buy-btn" ${player.gold < item.price ? 'disabled' : ''} data-item-index="${i}">购买</button>
          </div>
        `).join('')}
      </div>
      <div class="shop-balance">当前持有: ${player.gold}原始币</div>
    </div>
  `;
}

function renderMapContent(player: IPlayer, state: IGameState): string {
  const room = world.getRoom(player.currentRoomId);
  if (!room) {
    return `<div class="empty-state">无法获取当前位置信息</div>`;
  }
  const exits = room.exits || [];
  return `
    <div class="map-content">
      <div class="map-header">当前位置</div>
      <div class="map-current">${room.name}</div>
      <div class="map-desc">${room.description}</div>
      <div class="map-exits">
        <div class="map-section-title">可前往</div>
        ${exits.length > 0 ? exits.map(e => {
          const targetRoom = e.targetRoomId ? world.getRoom(e.targetRoomId) : null;
          return `
            <div class="map-exit-item" data-exit-dir="${e.direction}">
              <span class="map-exit-dir">${e.direction}</span>
              <span class="map-exit-name">${targetRoom?.name || '未知区域'}</span>
            </div>
          `;
        }).join('') : '<div class="empty-state">暂无出口</div>'}
      </div>
    </div>
  `;
}

function renderCraftContent(player: IPlayer): string {
  const alchemyRank = CraftRankService.getAlchemistRank(player);
  const formationRank = CraftRankService.getFormationRank(player);
  const boneScriptRank = CraftRankService.getBoneScriptRank(player);
  const alchemyExp = player.alchemySkill?.exp || 0;
  const formationExp = player.formationSkill?.exp || 0;
  const boneScriptLv = player.boneScriptLevel || 0;

  return `
    <div class="craft-content">
      <div class="craft-rank-overview">
        <div class="craft-rank-row">
          <span class="craft-rank-label">炼丹师</span>
          <span class="craft-rank-value">${alchemyRank}</span>
          <span class="craft-rank-exp">经验 ${alchemyExp}</span>
          <button class="craft-rank-btn" data-cmd="炼丹品阶">详情</button>
        </div>
        <div class="craft-rank-row">
          <span class="craft-rank-label">阵法师</span>
          <span class="craft-rank-value">${formationRank}</span>
          <span class="craft-rank-exp">经验 ${formationExp}</span>
          <button class="craft-rank-btn" data-cmd="阵法品阶">详情</button>
        </div>
        <div class="craft-rank-row">
          <span class="craft-rank-label">骨文铭刻</span>
          <span class="craft-rank-value">${boneScriptRank}</span>
          <span class="craft-rank-exp">等级 ${boneScriptLv}</span>
          <button class="craft-rank-btn" data-cmd="骨文品阶">详情</button>
        </div>
      </div>
      <div class="craft-tabs">
        <button class="craft-tab active" data-tab="alchemy">炼丹</button>
        <button class="craft-tab" data-tab="forge">锻造</button>
        <button class="craft-tab" data-tab="rank">品阶</button>
      </div>
      <div class="craft-panel">
        <div class="craft-section">
          <div class="craft-section-title">材料</div>
          <div class="craft-materials">
            ${(player.inventory || []).filter(i => i.type === ItemType.MATERIAL).map(item => `
              <div class="craft-material">
                <span>${item.name}</span>
                <span>1</span>
              </div>
            `).join('') || '<div class="empty-state">暂无材料</div>'}
          </div>
        </div>
        <div class="craft-section">
          <div class="craft-section-title">已学丹方</div>
          <div class="craft-learned">
            ${(player.learnedAlchemyRecipes || []).length} 个丹方
            <button class="craft-rank-btn" data-cmd="炼丹">查看丹方</button>
          </div>
          <div class="craft-section-title">已学阵法</div>
          <div class="craft-learned">
            ${(player.learnedFormations || []).length} 个阵法
            <button class="craft-rank-btn" data-cmd="阵法品阶">查看阵法</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCaveContent(player: IPlayer): string {
  return `
    <div class="cave-content">
      <div class="cave-header">我的洞府</div>
      <div class="cave-stats">
        <div class="cave-stat">
          <span class="cave-stat-label">洞府数量</span>
          <span class="cave-stat-value">${player.caveCount || 0}</span>
        </div>
        <div class="cave-stat">
          <span class="cave-stat-label">洞府列表</span>
          <span class="cave-stat-value">${player.caves.length}个</span>
        </div>
      </div>
      <div class="cave-actions">
        <button class="cave-action-btn" data-action="enter-cave">进入洞府</button>
        <button class="cave-action-btn" data-action="upgrade-cave">升级洞府</button>
      </div>
    </div>
  `;
}

function renderMountContent(player: IPlayer): string {
  const mounts = player.mounts || [];
  return `
    <div class="mount-content">
      <div class="mount-header">坐骑</div>
      ${mounts.length > 0 ? `
        <div class="mount-list">
          ${mounts.map(m => `
            <div class="mount-card">
              <div class="mount-icon">◈</div>
              <div class="mount-info">
                <div class="mount-name">${m.name}</div>
                <div class="mount-speed">基础速度: ${m.baseSpeed}</div>
                <div class="mount-tier">品阶: ${m.tier}</div>
              </div>
              <button class="mount-action-btn" data-mount-id="${m.id}">召唤</button>
            </div>
          `).join('')}
        </div>
      ` : '<div class="empty-state">暂无坐骑</div>'}
    </div>
  `;
}

function renderFormationContent(player: IPlayer): string {
  const formations = player.formations || [];
  const formationRank = CraftRankService.getFormationRank(player);
  const formationRankConfig = FORMATION_RANK_CONFIG[formationRank];
  const formationExp = player.formationSkill?.exp || 0;
  const learnedCount = (player.learnedFormations || []).length;

  return `
    <div class="formation-content">
      <div class="formation-header">阵法</div>
      <div class="formation-rank-box">
        <div class="formation-rank-row">
          <span class="formation-rank-label">阵法师品阶</span>
          <span class="formation-rank-value">${formationRank}</span>
          <span class="formation-rank-exp">经验 ${formationExp}</span>
          <button class="craft-rank-btn" data-cmd="阵法品阶">详情</button>
        </div>
        <div class="formation-rank-desc">${formationRankConfig.description}</div>
        <div class="formation-rank-info">
          可学习品阶：${formationRankConfig.maxFormationTier}及以下 | 已学 ${learnedCount} 个
        </div>
      </div>
      <div class="formation-stats">
        <div class="formation-stat">
          <span class="formation-stat-label">已拥有阵法</span>
          <span class="formation-stat-value">${formations.length}个</span>
        </div>
      </div>
      <div class="formation-list">
        ${formations.length > 0 ? formations.map(f => {
          const base = findFormation(f.formationId);
          return `
            <div class="formation-card">
              <div class="formation-name">${base?.name || '未知阵法'}</div>
              <div class="formation-desc">${base?.description || '暂无描述'}</div>
              <div class="formation-level">等级: ${f.level}</div>
              <button class="formation-action-btn" data-formation-id="${f.formationId}">布置</button>
            </div>
          `;
        }).join('') : '<div class="empty-state">暂无阵法</div>'}
      </div>
    </div>
  `;
}

function renderAuctionContent(player: IPlayer): string {
  // 模拟拍卖品数据
  const auctionItems = [
    { name: '天元丹', desc: '提升修为的上品丹药', price: 8888, bidder: '匿名修士', timeLeft: '2时辰' },
    { name: '玄冰剑', desc: '寒铁所铸，附带冰属性伤害', price: 12800, bidder: '冷月仙子', timeLeft: '5时辰' },
    { name: '紫府真诀', desc: '修炼神识的珍贵功法残卷', price: 50000, bidder: '青云子', timeLeft: '1天' },
    { name: '五行灵石', desc: '蕴含五行之力的稀有灵石', price: 3200, bidder: '散修无名', timeLeft: '3时辰' },
    { name: '九转还魂丹', desc: '濒死回生的救命丹药', price: 66666, bidder: '百草老人', timeLeft: '1时辰' },
  ];

  return `
    <div class="auction-content">
      <div class="auction-header">仙市拍卖行</div>
      <div class="auction-tabs">
        <button class="auction-tab active" data-tab="browse">浏览</button>
        <button class="auction-tab" data-tab="bid">我的竞拍</button>
        <button class="auction-tab" data-tab="sell">寄卖</button>
      </div>
      <div class="auction-panel">
        <div class="auction-section">
          <div class="auction-section-title">◆ 当前拍卖</div>
          <div class="panel-card-list">
            ${auctionItems.map(item => `
              <div class="panel-card">
                <div class="panel-card-header">
                  <span class="panel-card-name">${item.name}</span>
                  <span class="panel-card-tag">剩 ${item.timeLeft}</span>
                </div>
                <div class="panel-card-desc">${item.desc}</div>
                <div class="panel-card-meta">
                  <span>当前出价 <span style="color:var(--gold-1);font-family:var(--font-deco)">${item.price}</span> 灵石</span>
                  <span>领先: ${item.bidder}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="auction-section" style="margin-top:var(--sp-4)">
          <div class="auction-section-title">◆ 我的寄卖</div>
          <div class="empty-state" style="padding:var(--sp-4)">
            <div class="empty-state-icon">寄</div>
            <div>暂无寄卖物品</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ===== 天赋窗口 =====
function renderTalentContent(player: IPlayer): string {
  const talentIds = player.talentIds || [];
  const rarityColors: Record<string, string> = {
    common: '#999',
    rare: '#4a9eff',
    epic: '#a855f7',
    legendary: '#f59e0b',
    myth: '#ef4444',
  };
  const rarityNames: Record<string, string> = {
    common: '普通',
    rare: '稀有',
    epic: '史诗',
    legendary: '传说',
    myth: '神话',
  };
  const typeNames: Record<string, string> = {
    innate: '先天',
    physique: '体质',
    soul: '神魂',
    bloodline: '血脉',
    special: '特殊',
  };

  if (talentIds.length === 0) {
    return `<div class="talent-content"><div class="empty-state">尚未觉醒天赋</div></div>`;
  }

  const physiqueTalents: ITalent[] = [];
  const otherTalents: ITalent[] = [];
  for (const id of talentIds) {
    const t = getTalent(id);
    if (!t) continue;
    if (t.type === 'physique') {
      physiqueTalents.push(t);
    } else {
      otherTalents.push(t);
    }
  }

  const renderTalentCard = (t: ITalent) => {
    const color = rarityColors[t.rarity] || '#999';
    const canTrigger = (t.rarity === 'legendary' || t.rarity === 'myth') && t.isAwakened !== false;
    return `
      <div class="talent-card" style="border-color: ${color}">
        <div class="talent-card-header" style="color: ${color}">
          <span class="talent-name">${t.name}</span>
          <span class="talent-rarity">${rarityNames[t.rarity] || t.rarity} · ${typeNames[t.type] || t.type}</span>
        </div>
        <div class="talent-desc">${t.description}</div>
        <div class="talent-effects">
          ${t.effects.map((e: any) => `<span class="talent-effect-tag">${e.description}</span>`).join('')}
        </div>
        ${t.isAwakened === false ? '<div class="talent-unawakened">未觉醒</div>' : ''}
        ${t.originStory ? `<div class="talent-origin">${t.originStory}</div>` : ''}
        ${canTrigger ? `<button class="talent-story-btn" data-talent-id="${t.id}">体悟机缘</button>` : ''}
      </div>
    `;
  };

  let html = '<div class="talent-content">';

  if (otherTalents.length > 0) {
    html += `
      <div class="talent-section">
        <div class="talent-section-title">天赋</div>
        <div class="talent-list">
          ${otherTalents.map(t => renderTalentCard(t)).join('')}
        </div>
      </div>
    `;
  }

  if (physiqueTalents.length > 0) {
    html += `
      <div class="talent-section">
        <div class="talent-section-title talent-section-title-physique">体质</div>
        <div class="talent-list">
          ${physiqueTalents.map(t => renderTalentCard(t)).join('')}
        </div>
      </div>
    `;
  }

  html += '</div>';
  return html;
}

// ===== 天赋剧情弹窗 =====
function openTalentStory(talentId: string): void {
  const player = store.getState().player;
  const check = TalentStoryService.canTriggerStory(player, talentId);
  if (!check.can) {
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: check.reason });
    return;
  }

  const baseId = TalentStoryService.getBaseTalentId(talentId);
  const story = getTalentStory(baseId);
  const talent = getTalent(baseId);
  if (!story || !talent) {
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '机缘未至...' });
    return;
  }
  const activeStory = story;

  let narrativeIndex = 0;
  let currentPhase: 'narrative' | 'choice' | 'outcome' = 'narrative';

  modalManager.showInteractive(
    story.title,
    (container) => {
      const narrativeEl = document.createElement('div');
      narrativeEl.className = 'talent-story-narrative';
      narrativeEl.style.lineHeight = '1.8';
      narrativeEl.style.marginBottom = '20px';
      narrativeEl.style.color = '#e8dcc8';
      narrativeEl.style.fontSize = '14px';

      const choicesEl = document.createElement('div');
      choicesEl.className = 'talent-story-choices';
      choicesEl.style.display = 'flex';
      choicesEl.style.flexDirection = 'column';
      choicesEl.style.gap = '10px';

      const continueBtn = document.createElement('button');
      continueBtn.className = 'talent-story-continue';
      continueBtn.textContent = '继续';
      continueBtn.style.padding = '10px 20px';
      continueBtn.style.background = 'linear-gradient(135deg, #6b4423, #8b5a2b)';
      continueBtn.style.color = '#fff';
      continueBtn.style.border = 'none';
      continueBtn.style.borderRadius = '6px';
      continueBtn.style.cursor = 'pointer';
      continueBtn.style.alignSelf = 'flex-end';
      continueBtn.style.marginTop = '10px';
      continueBtn.onclick = () => {
        if (currentPhase === 'narrative') {
          narrativeIndex++;
          renderNarrative();
        } else if (currentPhase === 'outcome') {
          modalManager.close();
          windowManager.refreshActiveWindow();
        }
      };

      function renderNarrative(): void {
        if (narrativeIndex < activeStory.narrative.length) {
          const p = document.createElement('p');
          p.textContent = activeStory.narrative[narrativeIndex];
          p.style.margin = '0 0 12px 0';
          p.style.opacity = '0';
          narrativeEl.appendChild(p);
          requestAnimationFrame(() => {
            p.style.transition = 'opacity 0.4s';
            p.style.opacity = '1';
          });
          if (narrativeIndex === activeStory.narrative.length - 1) {
            setTimeout(() => {
              currentPhase = 'choice';
              renderChoices();
            }, 400);
          }
        }
      }

      function renderChoices(): void {
        choicesEl.innerHTML = '';
        activeStory.choices.forEach((choice, idx) => {
          const btn = document.createElement('button');
          btn.style.padding = '12px 16px';
          btn.style.background = 'rgba(107, 68, 35, 0.3)';
          btn.style.border = '1px solid #8b5a2b';
          btn.style.color = '#e8dcc8';
          btn.style.borderRadius = '6px';
          btn.style.cursor = 'pointer';
          btn.style.textAlign = 'left';
          btn.style.transition = 'all 0.2s';
          btn.innerHTML = `<div style="font-weight:bold;margin-bottom:4px;">${choice.label}</div><div style="font-size:12px;color:#b8a88e;">${choice.description}</div>`;
          btn.onmouseenter = () => {
            btn.style.background = 'rgba(139, 90, 43, 0.5)';
          };
          btn.onmouseleave = () => {
            btn.style.background = 'rgba(107, 68, 35, 0.3)';
          };
          btn.onclick = () => {
            currentPhase = 'outcome';
            resolveOutcome(idx);
          };
          choicesEl.appendChild(btn);
        });
      }

      function resolveOutcome(choiceIdx: number): void {
        const result = TalentStoryService.triggerStory(store.getState().player, baseId);
        if (!result.success || !result.outcome) {
          store.dispatch({ type: 'SYSTEM_MESSAGE', payload: result.message });
          modalManager.close();
          return;
        }

        store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });

        choicesEl.innerHTML = '';
        const outcomeTitle = document.createElement('div');
        outcomeTitle.style.fontSize = '18px';
        outcomeTitle.style.fontWeight = 'bold';
        outcomeTitle.style.marginBottom = '12px';
        outcomeTitle.style.textAlign = 'center';
        if (result.outcome.type === 'enhance' || result.outcome.type === 'blessing') {
          outcomeTitle.style.color = '#fbbf24';
        } else if (result.outcome.type === 'lose') {
          outcomeTitle.style.color = '#ef4444';
        } else {
          outcomeTitle.style.color = '#9ca3af';
        }
        outcomeTitle.textContent = `【${result.outcome.title}】`;

        const outcomeNarrative = document.createElement('p');
        outcomeNarrative.style.lineHeight = '1.8';
        outcomeNarrative.style.color = '#e8dcc8';
        outcomeNarrative.style.marginBottom = '20px';
        outcomeNarrative.textContent = result.outcome.narrative;

        narrativeEl.appendChild(outcomeTitle);
        narrativeEl.appendChild(outcomeNarrative);

        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `【${activeStory.title}】${result.outcome.title}：${result.outcome.narrative}` });

        continueBtn.textContent = '确定';
        container.appendChild(continueBtn);
      }

      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.appendChild(narrativeEl);
      container.appendChild(choicesEl);

      renderNarrative();
    },
    {
      width: '520px',
      onClose: () => {
        windowManager.refreshActiveWindow();
      },
    }
  );
}

// ===== 道侣窗口 =====
function renderCompanionContent(player: IPlayer): string {
  const companions = player.companions || [];
  const currentId = player.currentCompanionId;
  const relNames: Record<string, string> = {
    STRANGER: '陌生人',
    ACQUAINTANCE: '相识',
    FRIEND: '朋友',
    CLOSE_FRIEND: '挚友',
    LOVER: '道侣',
    SOULMATE: '灵魂伴侣',
  };
  const personalityNames: Record<string, string> = {
    COLD: '高冷',
    WARM: '温柔',
    FIERY: '火爆',
    CALM: '沉稳',
    PLAYFUL: '俏皮',
    MYSTERIOUS: '神秘',
  };
  const typeNames: Record<string, string> = {
    MORTAL: '凡人',
    CULTIVATOR: '修士',
    DEMON: '妖族',
    SPIRIT: '灵体',
    GODDESS: '神女',
  };

  if (companions.length === 0) {
    return `<div class="companion-content"><div class="empty-state">尚未结识道侣</div></div>`;
  }

  return `
    <div class="companion-content">
      <div class="companion-header">道侣 (${companions.length})</div>
      <div class="companion-list">
        ${companions.map(c => {
          const isCurrent = c.id === currentId;
          const relName = relNames[c.relationship] || c.relationship;
          const persName = personalityNames[c.personality] || c.personality;
          const typeName = typeNames[c.type] || c.type;
          const affPct = Math.floor((c.affinity / c.maxAffinity) * 100);
          return `
            <div class="companion-card ${isCurrent ? 'companion-current' : ''}">
              <div class="companion-card-header">
                <span class="companion-name">${c.name}</span>
                <span class="companion-type">${typeName} · ${persName}</span>
              </div>
              <div class="companion-rel">关系：${relName}</div>
              <div class="companion-affinity">
                <span class="companion-affinity-label">好感度</span>
                <div class="companion-affinity-bar">
                  <div class="companion-affinity-fill" style="width: ${affPct}%"></div>
                  <span class="companion-affinity-text">${c.affinity} / ${c.maxAffinity}</span>
                </div>
              </div>
              <div class="companion-bonus">
                <span>修炼加成 +${Math.floor((c.cultivationBonus || 0) * 100)}%</span>
                <span>战斗加成 +${Math.floor((c.combatBonus || 0) * 100)}%</span>
              </div>
              ${isCurrent ? '<div class="companion-current-tag">同行中</div>' : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ===== 宗门/家族窗口 =====
function renderClanContent(player: IPlayer, state: any): string {
  const sectId = player.sectId;

  if (!sectId) {
    return `
      <div class="clan-content">
        <div class="empty-state">
          你尚未加入任何宗门或家族
          <div style="margin-top: 12px; font-size: 13px; color: #888;">
            可通过游戏中的宗门系统创建或加入势力
          </div>
        </div>
      </div>
    `;
  }

  // 从 SectService 获取宗门数据
  const sectService = (state as any).sectService;
  const sect = sectService?.getSect?.(sectId);
  if (!sect) {
    return `<div class="clan-content"><div class="empty-state">宗门数据加载中</div></div>`;
  }

  const typeNames: Record<string, string> = {
    FAMILY: '家族',
    TRIBE: '部族',
    SECT: '宗门',
    GREAT_SECT: '大宗',
    HOLY_LAND: '圣地',
    DYNASTY: '皇朝',
    SUPREME: '至尊势力',
  };
  const rankNames: Record<string, string> = {
    ONE: '一阶',
    TWO: '二阶',
    THREE: '三阶',
    FOUR: '四阶',
    FIVE: '五阶',
  };
  const roleNames: Record<string, string> = {
    DISCIPLE: '弟子',
    ELITE_DISCIPLE: '精英弟子',
    CORE_DISCIPLE: '核心弟子',
    ELDER: '长老',
    GRAND_ELDER: '太上长老',
    YOUNG_MASTER: '少主',
    SECT_MASTER: '宗主',
    FOUNDER: '创始人',
    FAMILY_HEAD: '族长',
    FAMILY_ELDER: '长老',
    HEIR: '继承人',
    FAMILY_MEMBER: '家族成员',
  };

  const myMember = sect.members?.find((m: any) => m.playerId === player.id || m.name === player.name);
  const onlineCount = sect.members?.filter((m: any) => m.online).length || 0;

  return `
    <div class="clan-content">
      <div class="clan-header">
        <div class="clan-title">${sect.name}</div>
        <div class="clan-sub">
          <span>${typeNames[sect.type] || sect.type}</span>
          <span>·</span>
          <span>${rankNames[sect.rank] || sect.rank}</span>
        </div>
      </div>

      <div class="clan-stats">
        <div class="clan-stat-item">
          <span class="clan-stat-label">繁荣度</span>
          <span class="clan-stat-value">${sect.prosperity || 0} / ${sect.maxProsperity || 100}</span>
        </div>
        <div class="clan-stat-item">
          <span class="clan-stat-label">成员</span>
          <span class="clan-stat-value">${sect.members?.length || 0} / ${sect.maxMembers || 50}（在线 ${onlineCount}）</span>
        </div>
        <div class="clan-stat-item">
          <span class="clan-stat-label">金库</span>
          <span class="clan-stat-value">${sect.treasury || 0}</span>
        </div>
        <div class="clan-stat-item">
          <span class="clan-stat-label">我的贡献</span>
          <span class="clan-stat-value">${myMember?.contribution || 0}（累计 ${myMember?.totalContribution || 0}）</span>
        </div>
        ${myMember ? `<div class="clan-stat-item"><span class="clan-stat-label">我的职位</span><span class="clan-stat-value">${roleNames[myMember.role] || myMember.role}</span></div>` : ''}
      </div>

      ${sect.territory && sect.territory.length > 0 ? `
        <div class="clan-section">
          <div class="clan-section-title">领地</div>
          <div class="clan-territory">${sect.territory.map((t: string) => `<span class="clan-territory-tag">${t}</span>`).join('')}</div>
        </div>
      ` : ''}

      ${sect.members && sect.members.length > 0 ? `
        <div class="clan-section">
          <div class="clan-section-title">成员列表</div>
          <div class="clan-member-list">
            ${sect.members.slice(0, 20).map((m: any) => `
              <div class="clan-member-row ${m.online ? 'clan-member-online' : ''}">
                <span class="clan-member-name">${m.name}</span>
                <span class="clan-member-role">${roleNames[m.role] || m.role}</span>
                <span class="clan-member-contrib">贡献 ${m.contribution || 0}</span>
                <span class="clan-member-status">${m.online ? '在线' : '离线'}</span>
              </div>
            `).join('')}
            ${sect.members.length > 20 ? `<div class="clan-member-more">...还有 ${sect.members.length - 20} 名成员</div>` : ''}
          </div>
        </div>
      ` : ''}

      ${sect.buildings && sect.buildings.length > 0 ? `
        <div class="clan-section">
          <div class="clan-section-title">建筑 (${sect.buildings.length})</div>
          <div class="clan-building-list">
            ${sect.buildings.slice(0, 10).map((b: any) => `
              <div class="clan-building-row">
                <span class="clan-building-name">${b.name || b.templateId}</span>
                <span class="clan-building-level">Lv.${b.level || 1}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function getItemTypeName(type: string): string {
  const map: Record<string, string> = {
    [ItemType.ELIXIR]: '丹药',
    [ItemType.MATERIAL]: '材料',
    [ItemType.EQUIPMENT]: '装备',
    [ItemType.QUEST]: '任务物品',
    [ItemType.SPECIAL]: '特殊',
    [EquipmentSlot.WEAPON]: '武器',
    [EquipmentSlot.ARMOR]: '护甲',
    [EquipmentSlot.BOOTS]: '靴子',
    [EquipmentSlot.ACCESSORY]: '饰品',
    [EquipmentSlot.ARTIFACT]: '法宝',
  };
  return map[type] || type;
}

function formatEffect(effect: any): string {
  if (!effect) return '';
  const parts: string[] = [];
  if (effect.hp) parts.push(`气血+${effect.hp}`);
  if (effect.mana) parts.push(`法力+${effect.mana}`);
  if (effect.attack) parts.push(`攻击+${effect.attack}`);
  if (effect.defense) parts.push(`防御+${effect.defense}`);
  return parts.join(' ');
}

function formatStats(stats: Record<string, number | undefined>): string {
  const parts: string[] = [];
  if (stats.attack) parts.push(`攻+${stats.attack}`);
  if (stats.defense) parts.push(`防+${stats.defense}`);
  if (stats.hp) parts.push(`血+${stats.hp}`);
  if (stats.mana) parts.push(`法+${stats.mana}`);
  if (stats.speed) parts.push(`速+${stats.speed}`);
  return parts.join(' ');
}

function formatMethodBonus(bonus: Record<string, number>): string {
  const parts: string[] = [];
  Object.entries(bonus).forEach(([key, value]) => {
    const keyNames: Record<string, string> = {
      attack: '攻击', defense: '防御', hp: '气血', mana: '法力', speed: '速度',
      critRate: '暴击', spiritAbsorbRate: '吸灵'
    };
    parts.push(`${keyNames[key] || key}+${value}`);
  });
  return parts.join(' ');
}

export function exitToMainMenu(): void {
  if (store) {
    const state = store.getState();
    saveManager.save(1, state.player, world.getSeed(), state.gameTime);
  }

  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
    autoSaveInterval = null;
  }

  if (timeTickInterval) {
    clearInterval(timeTickInterval);
    timeTickInterval = null;
  }

  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
    resizeTimeout = null;
  }

  window.removeEventListener('resize', handleResize);

  gameInitialized = false;
  store = null as any;
  renderer = null as any;
  modalManager = null as any;
  windowManager = null as any;
  eventBus = null as any;
  world = null as any;

  const app = document.getElementById('app');
  const mainMenu = document.getElementById('main-menu');

  if (app) {
    app.style.animation = 'fadeOut 0.5s ease-out forwards';
    setTimeout(() => {
      app.style.display = 'none';
      app.classList.remove('game-active');
      app.style.opacity = '';
      app.style.transition = '';
    }, 500);
  }

  if (mainMenu) {
    mainMenu.style.display = 'flex';
    mainMenu.style.opacity = '0';
    setTimeout(() => {
      mainMenu.style.transition = 'opacity 0.5s ease-out';
      mainMenu.style.opacity = '1';
    }, 50);
  }

  // 通过回调通知 main.ts 退出到主菜单（由 main.ts 负责刷新菜单状态与按钮）
  setTimeout(() => {
    if (bootstrapCallbacks) {
      bootstrapCallbacks.onExitToMenu();
    }
  }, 600);
}

export async function startGame(saveData: any | null, callbacks: IBootstrapCallbacks): Promise<void> {
  bootstrapCallbacks = callbacks;
  
  try {
    console.log('startGame: 開始', { saveData: !!saveData });
    initGame(saveData);
    console.log('startGame: initGame done', { store: !!store });
    
    // 将 store 暴露到 window，供 main.ts 等模块使用
    (window as any).__gameStore__ = store;
  } catch (error) {
    console.error('startGame error:', error);
    throw error;
  }

  // 离线收益：仅在有存档时计算
  if (saveData && saveData.timestamp) {
    const rewards = saveManager.calculateOfflineRewards(saveData);
    if (rewards.durationMinutes >= 1) {
      // 应用收益到玩家
      const p = store.getState().player;
      if (rewards.exp > 0) {
        p.cultivationExp = Math.min(p.maxCultivationExp, p.cultivationExp + rewards.exp);
      }
      if (rewards.gold > 0) {
        p.gold += rewards.gold;
      }
      for (const item of rewards.items) {
        const base = getItemById(item.id);
        if (base) {
          for (let i = 0; i < item.count; i++) {
            p.inventory.push({ ...base, id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}` });
          }
        }
      }
      store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
      (window as any).showOfflineReport(rewards);
    }
  }

  // 新角色引导：隐藏支线系统提示
  if (!saveData || !saveData.player) {
    setTimeout(() => {
      if (store) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '═══════════════════════════════════════' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '【天道提示】隐藏支线系统已开启' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '在这片无尽疆域中，隐藏着无数未解之谜。' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '· 与NPC多次对话、探索房间细节、击杀特殊怪物，可能发现隐藏线索' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '· 集齐指定数量线索后，将自动触发隐藏支线任务' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '· 完成隐藏支线可获得稀有称号、神品道具、传承功法' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '· 输入"支线"命令可查看已发现的线索和支线进度' });
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '═══════════════════════════════════════' });
      }
    }, 2000);
  }
}
