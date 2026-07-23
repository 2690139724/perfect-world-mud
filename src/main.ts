/**
 * 主入口 - 独立实现角色创建流程
 */
declare global {
  interface Window {
    initCreationUI?: () => void;
    showOfflineReport?: (rewards: any) => void;
    generateNewOrigin?: () => void;
  }
}

import './ui/styles/main.css';
import './data/blueprints/stone_city';
import './data/blueprints/stone_village';
import './data/blueprints/wasteland';
import './data/blueprints/national_villages';
import { SaveManager } from './infrastructure/persistence/SaveManager';
import { getRandomTalents, ITalent } from './data/talents/talent_data';
import { OriginSystem } from './domain/services/OriginSystem';
import { WorldId } from './domain/entities/WorldDefinition';
import { generateRandomName } from './data/names/character_names';
import { getMethod } from './data/methods/method_data';

// =================== 存档管理器 ===================
const saveManager = new SaveManager();
let savedData: any = null;

// =================== 角色创建状态 ===================
let selectedTalentIds: string[] = [];
let currentTalents: ITalent[] = [];
let currentOrigin: any = null;
let selectedWorldId: WorldId = WorldId.PERFECT_WORLD;
let currentPlayerName: string = '';

// =================== 屏幕切换 ===================
type ScreenName = 'main-menu' | 'creation-screen' | 'game-screen';

function showScreen(name: ScreenName): void {
  const all: ScreenName[] = ['main-menu', 'creation-screen', 'game-screen'];
  all.forEach(n => {
    const el = document.getElementById(n);
    if (el) el.classList.toggle('hidden', n !== name);
  });
}

// =================== 启动 ===================
async function boot(): Promise<void> {
  try {
    savedData = await saveManager.load(1);
  } catch (e) {
    savedData = null;
  }

  bindMenuActions();
  bindCreationActions();
  showScreen('main-menu');
}

function bindMenuActions(): void {
  const newBtn = document.querySelector('[data-action="new-game"]');
  if (newBtn) {
    newBtn.addEventListener('click', () => {
      showScreen('creation-screen');
      resetCreationState();
      switchCreationStep('name');
    });
  }

  const loadBtn = document.querySelector('[data-action="load-game"]');
  if (loadBtn) {
    (loadBtn as HTMLButtonElement).disabled = !savedData;
    if (!savedData) loadBtn.classList.add('is-disabled');
    loadBtn.addEventListener('click', async () => {
      if (!savedData) return;
      const { startGame } = await import('./bootstrap');
      await startGame(savedData, { onExitToMenu: () => showScreen('main-menu'), getSavedData: () => savedData });
      showScreen('game-screen');
    });
  }

  const settingsBtn = document.querySelector('[data-action="settings"]');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      alert('设置面板待开放');
    });
  }

  const creditsBtn = document.querySelector('[data-action="credits"]');
  if (creditsBtn) {
    creditsBtn.addEventListener('click', () => {
      openFeatureWindow('作者寄语', `
        <div class="narrative-card">
          <div class="narrative-card-title">◆ 致读者</div>
          <div class="narrative-card-rows">
            <div class="narrative-card-row"><span>类型</span><span>修仙放置文字MUD</span></div>
            <div class="narrative-card-row"><span>风格</span><span>仙侠 · 放置 · 文字</span></div>
            <div class="narrative-card-row"><span>愿景</span><span>呈现一个有温度的仙侠世界</span></div>
            <div class="narrative-card-row"><span>特色</span><span>出身系统 · 法则领悟 · 单机AI模拟</span></div>
            <div class="narrative-card-row"><span>版本</span><span>v0.2 · 仙途</span></div>
          </div>
        </div>
      `);
    });
  }
}

function resetCreationState(): void {
  selectedTalentIds = [];
  currentTalents = [];
  currentOrigin = null;
  currentPlayerName = generateRandomName();
  updateNameDisplay();
}

function updateNameDisplay(): void {
  const nameDisplay = document.getElementById('creation-name-display');
  if (nameDisplay) {
    nameDisplay.textContent = currentPlayerName;
  }
}

function bindCreationActions(): void {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest<HTMLElement>('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    if (!action) return;

    switch (action) {
      case 'creation-back':
        showScreen('main-menu');
        break;
      case 'name-reroll':
        currentPlayerName = generateRandomName();
        updateNameDisplay();
        break;
      case 'creation-next':
        switchCreationStep('talent');
        renderTalents();
        break;
      case 'talent-back':
        switchCreationStep('name');
        break;
      case 'talent-reroll':
        renderTalents();
        break;
      case 'talent-confirm':
        if (selectedTalentIds.length < 3) {
          alert('请选择3个天赋！');
          return;
        }
        switchCreationStep('origin');
        generateNewOrigin();
        break;
      case 'origin-back':
        switchCreationStep('talent');
        break;
      case 'origin-confirm':
        console.log('origin-confirm clicked');
        console.log('currentOrigin:', currentOrigin);
        console.log('selectedTalentIds:', selectedTalentIds);
        console.log('currentPlayerName:', currentPlayerName);
        if (!currentOrigin) {
          alert('请先选择出身！');
          return;
        }
        startCreatedGame();
        break;
      case 'feature-close':
        closeFeatureWindow();
        break;
    }
  });
}

function switchCreationStep(step: 'name' | 'talent' | 'origin'): void {
  document.querySelectorAll<HTMLElement>('.creation-step').forEach(el => {
    el.classList.toggle('hidden', el.dataset.step !== step);
  });
}

function renderTalents(): void {
  const container = document.getElementById('creation-talents');
  const countEl = document.getElementById('creation-selected-count');
  if (!container) return;

  currentTalents = getRandomTalents(9);
  selectedTalentIds = [];

  const rarityColors: Record<string, string> = {
    common: '#999999',
    rare: '#0088ff',
    epic: '#aa44ff',      // 紫色
    legendary: '#ff8800',
    myth: '#ff2222',      // 红色
  };
  const rarityLabels: Record<string, string> = {
    common: '凡品',
    rare: '稀有',
    epic: '史诗',
    legendary: '传说',
    myth: '神话',
  };
  const typeLabels: Record<string, string> = {
    innate: '先天',
    physique: '体质',
    soul: '神魂',
    bloodline: '血脉',
    special: '特殊',
  };

  container.innerHTML = currentTalents.map((talent, index) => `
    <div class="talent-card" data-talent-id="${talent.id}" data-talent-index="${index}">
      <div class="talent-card-rank" style="color: ${rarityColors[talent.rarity]};">
        ${rarityLabels[talent.rarity]} · ${typeLabels[talent.type]}
      </div>
      <div class="talent-card-name">${talent.name}</div>
      <div class="talent-card-desc">${talent.description}</div>
      <div class="talent-card-effects">${talent.effects.map(e => e.description).join('、')}</div>
    </div>
  `).join('');

  container.querySelectorAll('.talent-card').forEach(el => {
    el.addEventListener('click', () => {
      const talentId = (el as HTMLElement).dataset.talentId;
      if (!talentId) return;

      const idx = selectedTalentIds.indexOf(talentId);
      if (idx > -1) {
        selectedTalentIds.splice(idx, 1);
        el.classList.remove('is-selected');
      } else {
        if (selectedTalentIds.length >= 3) {
          alert('最多只能选择3个天赋！');
          return;
        }
        selectedTalentIds.push(talentId);
        el.classList.add('is-selected');
      }

      if (countEl) countEl.textContent = `已选 ${selectedTalentIds.length} / 3`;
      checkStartButton();
    });
  });

  if (countEl) countEl.textContent = '已选 0 / 3';
  checkStartButton();
}

function generateNewOrigin(): void {
  const origins = OriginSystem.generateOrigins(selectedWorldId, 3);
  const container = document.getElementById('creation-origin-info');
  if (!container) return;

  if (!origins || origins.length === 0) {
    container.innerHTML = '<div class="origin-card"><div class="origin-card-name">生成失败</div><div class="origin-card-desc">无法生成出身信息</div></div>';
    return;
  }

  currentOrigin = origins[0];

  container.innerHTML = origins.map((origin, idx) => `
    <div class="origin-card ${idx === 0 ? 'is-selected' : ''}" data-origin-idx="${idx}">
      <div class="origin-card-name">${origin.originName || origin.config?.name || '未知出身'}</div>
      <div class="origin-card-desc">${origin.originDescription || origin.config?.description || '无法获取出身描述'}</div>
    </div>
  `).join('');

  container.querySelectorAll('.origin-card').forEach(el => {
    el.addEventListener('click', () => {
      container.querySelectorAll('.origin-card').forEach(c => c.classList.remove('is-selected'));
      el.classList.add('is-selected');
      const idx = parseInt((el as HTMLElement).dataset.originIdx || '0');
      currentOrigin = origins[idx];
      checkStartButton();
    });
  });

  checkStartButton();
}

function checkStartButton(): void {
  const talentStartBtn = document.getElementById('creation-start') as HTMLButtonElement;
  const originStartBtn = document.getElementById('creation-confirm-origin') as HTMLButtonElement;
  if (!talentStartBtn || !originStartBtn) return;
  
  const currentStep = document.querySelector<HTMLElement>('.creation-step:not(.hidden)')?.dataset.step;
  if (!currentStep) return;
  
  if (currentStep === 'talent') {
    talentStartBtn.disabled = selectedTalentIds.length < 3;
  } else if (currentStep === 'origin') {
    const selectedOriginCard = document.querySelector('.origin-card.is-selected');
    originStartBtn.disabled = !selectedOriginCard;
  }
}

async function startCreatedGame(): Promise<void> {
  const playerName = currentPlayerName || '道友';
  console.log('startCreatedGame: 開始', { playerName, currentOrigin });

  try {
    // 先切换屏幕，避免双重渲染
    showScreen('game-screen');

    const bootstrap = await import('./bootstrap');
    console.log('startCreatedGame: bootstrap loaded', Object.keys(bootstrap));
    const { startGame } = bootstrap;
    console.log('startCreatedGame: calling startGame');
    await startGame(null, {
      onExitToMenu: () => showScreen('main-menu'),
      getSavedData: () => savedData,
    });
    console.log('startCreatedGame: startGame completed');

    // 直接应用数据，不再 setTimeout
    applyCreationData(playerName);
  } catch (error) {
    console.error('startCreatedGame error:', error);
    alert('创建角色失败，请重试');
  }
}

function applyCreationData(name: string): void {
  try {
    // 始终从 window 读取最新 store，避免解构过期引用
    const store = (window as any).__gameStore__;

    if (!store) {
      console.error('applyCreationData: store is undefined');
      return;
    }
    if (!currentOrigin) {
      console.error('applyCreationData: currentOrigin is undefined');
      return;
    }
  
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
      achievements: [],
      titles: [],
      totalPlayTime: 0,
      totalOfflineTime: 0,
      hiddenStorylines: [],
      discoveredClues: [],
      companions: [],
    });

    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你出生于 **${currentOrigin.zoneName}** 的 ${currentOrigin.roomName}。` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `你的身份：${currentOrigin.originName}（${currentOrigin.config.startingPosition}）` });
    store.dispatch({ type: 'SYSTEM_MESSAGE', payload: currentOrigin.originDescription });
    if (p.currentMethodId) {
      const method = getMethod(p.currentMethodId);
      if (method) {
        store.dispatch({ type: 'SYSTEM_MESSAGE', payload: `◆ 出身传承，你已习得《${method.name}》。` });
      }
    } else {
      store.dispatch({ type: 'SYSTEM_MESSAGE', payload: '◆ 你尚未获得任何修炼功法，需寻找机缘或加入宗门获取传承。' });
    }
    store.dispatch({ type: 'UPDATE_PLAYER', payload: {} });
  } catch (error) {
    console.error('applyCreationData error:', error);
    alert('应用角色数据失败，请重试');
  }
}

// =================== 功能窗口 ===================
function openFeatureWindow(title: string, html: string): void {
  const win = document.getElementById('feature-window');
  const mask = document.getElementById('feature-window-mask');
  const titleEl = document.getElementById('feature-window-title');
  const bodyEl = document.getElementById('feature-window-body');
  if (!win || !mask || !titleEl || !bodyEl) return;

  titleEl.textContent = title;
  bodyEl.innerHTML = html;
  win.classList.remove('hidden');
  mask.classList.remove('hidden');
}

function closeFeatureWindow(): void {
  document.getElementById('feature-window')?.classList.add('hidden');
  document.getElementById('feature-window-mask')?.classList.add('hidden');
}

(window as any).openFeatureWindow = openFeatureWindow;
(window as any).closeFeatureWindow = closeFeatureWindow;
(window as any).showScreen = showScreen;

boot();
