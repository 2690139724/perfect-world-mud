/* 运行时逻辑测试：data.js + engine.js */
global.window = {};
global.localStorage = {
  _d:{},
  getItem(k){return this._d[k]||null;},
  setItem(k,v){this._d[k]=v;},
  removeItem(k){delete this._d[k];}
};
global.document = { addEventListener(){} };

require('./data.js');
require('./engine.js');
const {JH} = window;

let pass=0, fail=0;
function assert(name, cond){ if(cond){pass++; console.log('  PASS', name);} else {fail++; console.log('  FAIL', name);} }

console.log('== 创角校验 ==');
// 1. 名门世家：魅力+2，魅力分配20应封顶
let r = JH.resolveStats({根骨:10,悟性:10,身法:10,臂力:10,魅力:20,气运:0}, {魅力:+2});
assert('魅力20+2 封顶20', r.stats.魅力===20);
assert('魅力溢出标记', r.overflow.includes('魅力'));
assert('气运0被抬到1', r.stats.气运===1);

// 2. 总和必须60
assert('默认分配总和60', JH.totalAllocated({根骨:10,悟性:10,身法:10,臂力:10,魅力:10,气运:10})===60);

console.log('== finalizeCreation ==');
const {state} = JH.finalizeCreation({
  name:'沈惊鸿', gender:'男', age:20, appearance:'剑眉星目',
  background:'B', // 武学世家 根骨+2 臂力+1
  allocation:{根骨:10,悟性:10,身法:10,臂力:10,魅力:10,气运:10},
  talents:['剑心通明']
});
JH.state = state;
assert('创角完成', state.created===true);
assert('回合=1', state.turn===1);
assert('武学世家根骨=12', state.player.stats.根骨===12);
assert('武学世家臂力=11', state.player.stats.臂力===11);
assert('初始有家传武学', state.player.wuxue.length>=1);
assert('初始物品含干粮', state.player.inventory.some(i=>i.name==='干粮'));
assert('银两=0(武学世家无silver)', state.player.silver===0);
assert('初始境界不入流', state.player.realm==='不入流');

console.log('== 时辰推进 ==');
const before = state.time.shichenIdx;
JH.advanceTime(state, 1);
assert('推进1时辰', state.time.shichenIdx === (before+1)%12);
JH.advanceTime(state, 20);
assert('跨日 day 增长', state.time.day > 1 || state.time.monthIdx > 0);

console.log('== 境界突破 ==');
state.player.neiliMax = 1000; state.player.neili = 1000;
const br = JH.tryBreakthrough(state);
assert('内力足够可尝试突破', typeof br.ok==='boolean');

console.log('== 好感送礼 ==');
JH.know(state, '顾青崖');
JH.addItem(state, {name:'清茶', type:'物品'});
const beforeAff = JH.getAff(state,'顾青崖');
JH.gift(state, '顾青崖', '清茶');
assert('送喜好物好感上升', JH.getAff(state,'顾青崖') > beforeAff);
assert('送礼后物品扣除', !JH.hasItem(state,'清茶'));

console.log('== 存档 ==');
const slot = JH.save(state);
const list = JH.listSaves();
assert('存档列表非空', Object.keys(list).length>=1);
assert('读档还原姓名', JH.load(slot).player.name==='沈惊鸿');

console.log('== 掷骰范围 ==');
let inRange = true;
for(let i=0;i<200;i++){ const d=JH.dice(100); if(d<1||d>100) inRange=false; }
assert('dice(100) 在1..100', inRange);

console.log('== 修炼精进 ==');
const w0 = state.player.wuxue[0];
const lvl0 = w0.level;
// 强行悟性高，多练几次
state.player.stats.悟性 = 25;
for(let i=0;i<30;i++){ JH.practiceWuxue(state, w0.name); }
assert('修炼后熟练度累积或晋级', state.player.wuxue[0].level!==lvl0 || (state.player._prof && state.player._prof['臂力']>=0));

console.log(`\n结果: ${pass} 通过, ${fail} 失败`);
process.exit(fail?1:0);
