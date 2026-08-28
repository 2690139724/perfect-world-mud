/* UI 渲染与指令流测试（无浏览器，DOM mock） */
global.window = {};
const store = {};
global.localStorage = {
  getItem(k){return store[k]||null;},
  setItem(k,v){store[k]=v;},
  removeItem(k){delete store[k];}
};

// ---- 最小 DOM mock ----
function mkEl(id){
  return {
    id, _html:'', value:'', textContent:'', className:'',
    style:{}, dataset:{}, _l:{}, selected:false, disabled:false,
    set innerHTML(v){ this._html=v; },
    get innerHTML(){ return this._html; },
    addEventListener(ev,cb){ (this._l[ev]=this._l[ev]||[]).push(cb); },
    querySelector(sel){ return mkEl('_q'); },     // 返回可写空元素，避免 NPE
    querySelectorAll(sel){ return []; },
    appendChild(){}, focus(){}, click(){},
  };
}
const elCache = {};
global.document = {
  getElementById(id){ return elCache[id] || (elCache[id]=mkEl(id)); },
  createElement(t){ return mkEl('_new'); },
  addEventListener(){},
};

require('./data.js');
require('./engine.js');
require('./app.js');
const {JHApp:App} = window;
const {JH} = window;

let pass=0, fail=0;
function assert(n,c){ if(c){pass++;console.log('  PASS',n);} else {fail++;console.log('  FAIL',n);} }
const stage = ()=>document.getElementById('stage')._html;

console.log('== 标题界面 ==');
App.render();
assert('标题含游戏名', /江湖模拟器/.test(stage()));
assert('标题含作者署名 雾见川', /雾见川/.test(stage()));
assert('标题含创角选项', /创建新角色/.test(stage()));

console.log('== 创角流程 ==');
App.startCreation();
assert('创角第一面 含 12 出身', (stage().match(/data-bg="/g)||[]).length===12);
App.selectBackground('B'); // 武学世家
assert('已选出身 武学世家', App.creation.background==='B');
App.goStep2();
assert('进入第二面', App.creation.step===2);
assert('第二面含 6 属性滑块', (stage().match(/data-stat="/g)||[]).length===6);
assert('第二面含 10 天赋', (stage().match(/data-talent="/g)||[]).length===10);
// 设置名字与天赋，确认
App.creation.name='沈惊鸿';
App.creation.talents=['剑心通明'];
App.confirmCreation();
assert('创角后进入游戏 (状态卡出现)', /状态卡/.test(stage()));
assert('状态卡含玩家姓名', /沈惊鸿/.test(stage()));
assert('状态卡含境界 不入流', /不入流/.test(stage()));
assert('状态卡含六维 根骨', /根骨\s*\d+/.test(stage()));
assert('开局面板出现', /江湖初临/.test(stage()));

console.log('== 快捷指令 ==');
App.handleCommand('背包');
assert('背包面板 含 已习武学', /已习武学/.test(stage()));
App.handleCommand('地图');
assert('地图面板 含 当前', /当前：/.test(stage()));
assert('地图含 可前往', /可前往/.test(stage()));
App.handleCommand('任务');
assert('任务面板 含 主线', /主线/.test(stage()));
App.handleCommand('好感');
assert('好感面板 含 关系阶段', /关系阶段/.test(stage()));
App.handleCommand('帮助');
assert('帮助 含 可攻略角色', /可攻略角色/.test(stage()));
assert('帮助 含 顾青崖', /顾青崖/.test(stage()));
assert('帮助 含 境界阶梯', /武圣/.test(stage()));

console.log('== 自由行动 ==');
App.handleCommand('面板');
assert('面板指令回主界面', /大昭江湖 · 主界面/.test(stage()));
// 移动：泉州 connects 含 中原洛阳 与 江南姑苏
const locBefore = JH.state.player.location;
App.handleCommand('前往中原洛阳');
assert('前往中原洛阳 后地点变更', JH.state.player.location==='中原洛阳');
assert('前往后回合推进', JH.state.turn>=2);

console.log('== 打坐/修炼 ==');
const turnBefore = JH.state.turn;
App.handleCommand('打坐');
assert('打坐推进回合', JH.state.turn>turnBefore);

console.log('== 打听消息 ==');
App.handleCommand('打听靖武令消息');
assert('打听靖武令 含 靖武令', /靖武令/.test(stage()) || JH.state.flags.heardJingwu===true);

console.log('== 战斗 ==');
JH.state.player.stats.臂力 = 25;
App.doAttackFree('打');
assert('战斗面板渲染', /战斗/.test(stage()) && JH.state.combat && !JH.state.combat.over);
// 模拟攻击至结束
let guard=0;
while(JH.state.combat && !JH.state.combat.over && guard<30){ App.combatInput('攻击'); guard++; }
assert('战斗可正常结算结束', !JH.state.combat || JH.state.combat.over);

console.log('== 送礼 ==');
JH.know(JH.state, '顾青崖');
JH.addItem(JH.state, {name:'清茶', type:'物品'});
const aff0 = JH.getAff(JH.state,'顾青崖');
App.handleCommand('送清茶给顾青崖');
assert('送礼后好感上升', JH.getAff(JH.state,'顾青崖')>aff0);

console.log('== 存档/读档 ==');
App.handleCommand('存档');
assert('存档生效', Object.keys(JH.listSaves()).length>=1);
const snap = JSON.stringify(JH.state.player.stats);
JH.state.player.stats.臂力 = 0;
App.handleCommand('读档');
assert('读档还原属性', JSON.stringify(JH.state.player.stats)===snap);

console.log(`\n结果: ${pass} 通过, ${fail} 失败`);
process.exit(fail?1:0);
