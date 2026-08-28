/* ============================================================
 * 江湖模拟器 · 应用层  app.js
 * 渲染 / 指令路由 / 自由行动解析 / 事件引擎 / 战斗
 * ============================================================ */
var JH = window.JH = window.JH || {};
(function(){

/* ============ 渲染辅助 ============ */
function el(id){ return document.getElementById(id); }
function esc(s){ return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }

// 面板
function panel(title, inner, opt){
  opt = opt||{};
  const cls = opt.crisis?'panel panel-crisis':'panel';
  const t = title?`<div class="ptitle">${esc(title)}</div>`:'';
  return `<div class="${cls}">${t}${inner}</div>`;
}
function div(){ return `<hr class="pdiv">`; }
function row(text, cls){ return `<div class="row ${cls||'pink'}">${text}</div>`; }
function small(text, cls){ return `<div class="row ${cls||'muted'} small">${text}</div>`; }
function tiny(text){ return `<div class="row muted tiny">${text}</div>`; }
// 进度条 value/max (总长换算为百分比)
function bar(value, max, cls){
  const pct = Math.max(0, Math.min(100, (value/max)*100));
  return `<span class="bar ${cls||''}"><i style="width:${pct}%"></i></span>`;
}
function barText(value, max, cls){ return `${bar(value,max,cls)} <span class="small pink">${value}/${max}</span>`; }

// 选项面板（合并）
function optionsPanel(opts, hint){
  let rows = opts.map((o,i)=>{
    const tag = '【'+String.fromCharCode(65+i)+'】';
    return `<div class="opt" data-opt="${i}" tabindex="0"><span class="tag">${tag}</span><span class="txt">${esc(o)}<span></div>`;
  }).join('');
  if(hint) rows += `<div class="hint muted small">${esc(hint)}</div>`;
  return panel('', rows);
}

/* 指令行 */
function cmdLine(extra){
  const base = ['面板','背包','地图','任务','对话','好感','存档','帮助'];
  if(extra) extra.forEach(x=>{ if(!base.includes(x)) base.push(x); });
  return `<div class="cmdline">${base.map(c=>`<b>${c}</b>`).join(' · ')}</div>`;
}

/* ============ 应用状态 ============ */
const App = {
  creation:null,   // 创角状态机
  current:'title', // title | creation1 | creation2 | play | combat
  pendingOpts:null, // 当前选项回调
};

/* ============ 主渲染入口 ============ */
App.render = function(){
  const stage = el('stage');
  let html='';
  if(!JH.state || !JH.state.created){
    if(App.creation){
      html = App.creation.step===2 ? App.renderCreation2() : App.renderCreation1();
    } else {
      html = App.renderTitle();
    }
  } else {
    html = App.renderMain();
  }
  stage.innerHTML = html;
  App.bindStage();
  App.syncTurnTag();
};

App.syncTurnTag = function(){
  if(JH.state && JH.state.created){
    el('turnTag').textContent = `第 ${JH.state.turn} 回合 · ${JH.shichenName(JH.state)}`;
  } else {
    el('turnTag').textContent = '大昭 · 景和三年';
  }
};

/* ============ 标题/开局 ============ */
App.renderTitle = function(){
  const inner = `
    ${row('<span class="gold">大昭景和三年 · 春</span>','gold')}
    ${div()}
    ${row('江湖风云起，武林盟主病逝，群龙无首；朝廷颁下「靖武令」清点武林，朝野暗流汹涌。','pink')}
    ${row('你，即将踏入这片江湖。','pink')}
    ${div()}
    ${small('全性向 · 高自由度武侠养成 · 可攻略角色不分性别','muted')}
    ${small('作者：雾见川','muted')}
    ${div()}
    <div class="opts">
      <div class="opt" data-act="new"><span class="tag">【A】</span><span class="txt">创建新角色，踏入江湖</span></div>
      <div class="opt" data-act="load"><span class="tag">【B】</span><span class="txt">读取存档${JH.hasSave()?'':'（暂无存档）'}</span></div>
    </div>
    ${cmdLine(['帮助'])}
  `;
  return panel('江湖模拟器 · 大昭风云录', inner);
};

/* ============ 创角 第一面 ============ */
App.startCreation = function(){
  App.creation = {
    step:1,
    name:'',gender:'男',age:18,appearance:'',
    background:null,
    allocation:{根骨:10,悟性:10,身法:10,臂力:10,魅力:10,气运:10},
    talents:[],luckRolled:false,luckValue:0,allowSecond:false,
  };
  App.render();
};

App.renderCreation1 = function(){
  // 用 form 形式
  const c = App.creation;
  const bgRows = JH.BACKGROUNDS.map(b=>{
    const sel = c.background===b.key?'red':'';
    return `<div class="opt" data-bg="${b.key}"><span class="tag">【${b.key}】</span><span class="txt">${b.name} <span class="hint muted"> ${b.desc}</span></span></div>`;
  }).join('');
  const inner = `
    ${small('作者：雾见川','muted')}
    ${div()}
    ${row('<b class="gold">姓名</b> <input id="f_name" value="${esc(c.name)}" placeholder="可带字、号" maxlength="12">','pink')}
    ${row(`<b class="gold">性别</b> <select id="f_gender">${JH.GENDER_OPTIONS.map(g=>`<option ${c.gender===g?'selected':''}>${g}</option>`).join('')}</select> <span class="muted small">全性向，你说了算</span>`,'pink')}
    ${row('<b class="gold">年龄</b> <input id="f_age" type="number" value="'+c.age+'" min="12" max="60" style="width:5em">','pink')}
    ${row('<b class="gold">相貌</b> <input id="f_app" value="'+esc(c.appearance)+'" placeholder="文字描述，AI 记入魅力与外貌" style="width:14em">','pink')}
    ${div()}
    ${row('<b class="gold">出身（十二选一）</b>','gold')}
    ${bgRows}
    ${div()}
    ${row(`<span class="muted small">已选：${c.background?JH.BACKGROUNDS.find(b=>b.key===c.background).name:'未选'}</span>`,'muted')}
    <button class="btn" id="goStep2" ${c.background?'':'disabled'}>下一步：分配属性</button>
    ${cmdLine(['帮助'])}
  `;
  return panel('江湖创角 · 第一面', inner);
};
// 注意：renderCreation1 里直接放 form，绑定后转 step2

/* ============ 创角 第二面 ============ */
App.renderCreation2 = function(){
  const c = App.creation;
  const bg = JH.BACKGROUNDS.find(b=>b.key===c.background);
  const total = JH.totalAllocated(c.allocation);
  const totalCls = total===60?'totalbar':'totalbar warn';
  // 属性滑块
  const allocRows = JH.STAT_KEYS.map(k=>{
    const mod = (bg.mods&&bg.mods[k])||0;
    const modStr = mod>0?`<span class="red small">+${mod}</span>`:(mod<0?`<span class="muted small">${mod}</span>`:`<span class="muted small">±0</span>`);
    return `<div class="alloc">
      <label>${k}</label>
      <input type="range" min="1" max="20" value="${c.allocation[k]}" data-stat="${k}">
      <span class="val" id="v_${k}">${c.allocation[k]}</span>
      <span class="mod">${modStr}</span>
    </div>`;
  }).join('');
  // 天赋
  const talentRows = JH.TALENTS.map(t=>{
    const sel = c.talents.includes(t.key)?'red':'';
    const tag = t.rare?'（稀有）':'';
    return `<div class="opt" data-talent="${t.key}"><span class="tag">[${c.talents.includes(t.key)?'✓':'　'}]</span><span class="txt">${t.key}${tag} <span class="hint muted">${t.desc}</span></span></div>`;
  }).join('');
  const secondHint = c.allowSecond
    ? `<span class="red small">气运 ${c.luckValue}！可再选 1 个副天赋</span>`
    : (c.luckRolled?`<span class="muted small">气运 ${c.luckValue}，未达 90，仅 1 主天赋</span>`:`<span class="muted small">未掷气运</span>`);
  const inner = `
    ${div()}
    ${row('<b class="gold">六维属性 · 共 60 点自由分配（单项 1~20，修正后封顶20）</b>','gold')}
    ${allocRows}
    <div class="${totalCls}">已分配 <span class="pointbox" id="totalPts">${total}</span> / 60 ${total===60?'<span class="pink small">✓</span>':'<span class="red small">需凑满60</span>'}</div>
    ${div()}
    ${row('<b class="gold">天赋（选 1 主天赋）</b>','gold')}
    ${talentRows}
    <div class="row">${secondHint} <button class="btn ghost" id="rollLuck" ${c.luckRolled?'disabled':''}>掷气运(1d100≥90可加副天赋)</button></div>
    ${div()}
    ${row('<b class="gold">初始物品</b>：旧布衣、干粮×3、水囊、火折子'+(bg.items?', '+bg.items.map(i=>i.name).join('、'):''),'pink small')}
    ${row('<b class="gold">起始银两</b>：'+(bg.silver||0)+' 两','pink small')}
    ${div()}
    <button class="btn" id="confirmCreate">踏入江湖</button>
    <button class="btn ghost" id="backStep1">返回</button>
    ${cmdLine(['帮助'])}
  `;
  return panel('江湖创角 · 第二面', inner);
};

/* ============ 主界面 ============ */
App.renderMain = function(){
  const s = JH.state;
  const p = s.player;
  const inner = `
    ${row('<span class="gold">'+JH.fullTimeStr(s)+' · '+s.weather+'</span>','gold')}
    ${div()}
    ${row(`姓名 ${esc(p.name)} · ${p.gender} · ${p.age}岁 · 出身 ${p.background.name}`)}
    ${row(`境界 <span class="gold">${p.realm}</span> · 门派 ${p.sect} · 官阶 ${p.office}`)}
    ${row(`所在 <span class="red">${p.location}</span> · 时辰 ${JH.shichenName(s)} · 天气 ${s.weather}`)}
    ${small('主线：'+s.mainQuest.text,'muted')}
    ${div()}
    ${row('<b class="gold">行动选项</b>','gold')}
    ${App.mainActions()}
    ${cmdLine(['修炼','打坐','查看','商店'])}
  `;
  let html = panel('大昭江湖 · 主界面', inner);
  html += App.stateCard();
  return html;
};

App.mainActions = function(){
  const s = JH.state; const p = s.player;
  const loc = JH.MAP[p.location];
  const acts = [];
  // 场景行动
  (loc.shops||[]).forEach(sh=>{
    acts.push(`前往「${sh}」`);
  });
  acts.push('四处游历(打听消息)');
  acts.push('打坐运功');
  acts.push('修炼武学');
  // 移动
  loc.connects.forEach(c=>acts.push(`前往「${c}」`));
  acts.push('休息(客栈/打尖)');
  if(s.pendingEvent){
    // 若有待决事件，提示
  }
  const opts = acts.slice(0,6).map(a=>a);
  // 渲染为选项
  return opts.map((a,i)=>`<div class="opt" data-act-name="${esc(a)}"><span class="tag">【${String.fromCharCode(65+i)}】</span><span class="txt">${esc(a)}</span></div>`).join('') +
    `<div class="hint muted small">也可在下方输入框自由输入你的行动…</div>`;
};

/* ============ 状态卡 ============ */
App.stateCard = function(){
  const s = JH.state; const p = s.player;
  const hp = p.qixue, hpMax = p.qixueMax;
  const nl = p.neili, nlMax = p.neiliMax;
  const tl = p.tili, tlMax = p.tiliMax;
  // 好感行（有攻略对象时）
  let affLines = '';
  const affs = Object.entries(s.affinities).filter(([k,v])=>s.knownNpcs.includes(k)).sort((a,b)=>b[1]-a[1]).slice(0,4);
  if(affs.length){
    affLines = affs.map(([k,v])=>`${k} ${v}·${JH.affStage(v)}`).join(' / ');
  }
  const inner = `
    ${row('<b class="gold">状态卡 · 第 '+s.turn+' 回合</b>','gold')}
    ${div()}
    ${row(`姓名 ${esc(p.name)} · ${p.gender} · ${p.age}岁 · 出身 ${p.background.name}`)}
    ${row(`境界 ${p.realm} · 门派 ${p.sect} · 官阶 ${p.office}`)}
    ${row(`根骨 ${p.stats['根骨']}  悟性 ${p.stats['悟性']}  身法 ${p.stats['身法']}  臂力 ${p.stats['臂力']}  魅力 ${p.stats['魅力']}  气运 ${p.stats['气运']}`)}
    ${row(`内力 ${barText(nl,nlMax,'neili')}  体力 ${barText(tl,tlMax,'tili')}`)}
    ${row(`气血 ${barText(hp,hpMax)}  饱食 ${p.baoshi}/100`)}
    ${row(`银两 ${JH.fmtSilver(p.silver)} · 声望 ${p.shengwang} · 善恶 ${JH.shaneLabel(s)}(${p.shane})`)}
    ${row(`所在地 ${p.location} · 时辰 ${JH.shichenName(s)} · 天气 ${s.weather}`)}
    ${p.shangshi?row('<span class="red">伤势：'+p.shangshi+'</span>','red'):''}
    ${p.zhongdu?row('<span class="red">中毒：'+p.zhongdu+'</span>','red'):''}
    ${affLines?small('好感：'+affLines,'muted'):''}
    ${small('主线提示：'+s.mainQuest.text,'muted')}
    ${div()}
    ${cmdLine()}
  `;
  return panel('状态卡', inner);
};

/* ============ 背包 ============ */
App.renderInventory = function(){
  const s = JH.state; const p = s.player;
  const items = p.inventory.length?p.inventory.map(i=>`${i.name}${i.qty?('×'+i.qty):''}${i.note?(' <span class="muted small">'+i.note+'</span>'):''}`).join('　'):('空空如也');
  const wx = p.wuxue.length?p.wuxue.map(w=>`${w.name}（${w.grade}/${w.type}/${w.level}）`).join('<br>'):('无');
  const inner = `
    ${row('<b class="gold">物品</b>','gold')}
    ${row(items,'pink')}
    ${div()}
    ${row('<b class="gold">已习武学</b>','gold')}
    ${row(wx,'pink small')}
    ${div()}
    ${row('<b class="gold">自创武学</b>','gold')}
    ${row(p.createdWuxue.length?p.createdWuxue.map(w=>w.name+'（'+w.desc+'）').join('<br>'):'尚无','pink small')}
    ${div()}
    ${cmdLine(['送礼'])}
  `;
  return panel('背包', inner);
};

/* ============ 地图 ============ */
App.renderMap = function(){
  const s = JH.state; const p = s.player;
  const cur = JH.MAP[p.location];
  const connects = (cur.connects||[]).map(c=>`<span class="tag-pill">${c}</span>`).join('');
  const shops = (cur.shops||[]).map(c=>`<span class="tag-pill">${c}</span>`).join('');
  let other = '';
  for(let k in JH.MAP){ if(k!==p.location) other += `<div class="row small muted">${k} <span class="tiny">(${JH.MAP[k].region})</span></div>`; }
  const inner = `
    ${row('<b class="red">当前：'+p.location+'（'+cur.region+'）</b>','gold')}
    ${row(cur.desc,'pink small')}
    ${div()}
    ${row('<b class="gold">可前往</b>','gold')}
    ${row(connects||'四周皆绝路','pink')}
    ${row('<b class="gold">本地店铺</b>','gold')}
    ${row(shops||'荒无人烟','pink')}
    ${div()}
    ${row('<b class="gold">天下地图</b>','gold')}
    ${other}
    ${div()}
    ${row('<span class="muted small">输入「前往XX」即可启程，移动消耗时辰</span>','muted')}
    ${cmdLine()}
  `;
  return panel('江湖地图', inner);
};

/* ============ 任务 ============ */
App.renderQuest = function(){
  const s = JH.state;
  const mq = s.mainQuest;
  const inner = `
    ${row('<b class="gold">主线</b>：'+mq.title,'gold')}
    ${row(mq.text,'pink')}
    ${mq.deadline?small('限期：约 '+mq.deadline+' 时辰内','muted'):''}
    ${div()}
    ${row('<b class="gold">江湖大事（待触发）</b>','gold')}
    ${JH.MAIN_QUESTS.filter(q=>q.id!==mq.id).map(q=>`<div class="row small muted">${q.title} — ${q.text}</div>`).join('')}
    ${div()}
    ${row('<b class="gold">已接任务</b>','gold')}
    ${row((s.flags.quests||[]).length?(s.flags.quests||[]).join('、'):'暂无','pink small')}
    ${div()}
    ${cmdLine()}
  `;
  return panel('任务', inner);
};

/* ============ 好感面板 ============ */
App.renderAff = function(){
  const s = JH.state;
  if(!s.knownNpcs.length){
    return panel('好感面板', row('你尚未结识江湖中人，四处游历或可遇之。','pink')+div()+small('关系阶段：陌生→相识→熟悉→知己/暧昧→恋人→生死相托','muted')+div()+cmdLine(['送礼','查看']));
  }
  const rows = s.knownNpcs.map(k=>{
    const npc = JH.npcByKey(k);
    const v = s.affinities[k]||0;
    const stage = JH.affStage(v);
    return `<div class="aff-row">
      <span class="name pink">${k} <span class="muted tiny">(${npc?npc.identity:'?'})</span></span>
      ${bar(v,100,'aff')}
      <span class="stage">${v}·${stage}</span>
    </div>`;
  }).join('');
  const inner = `
    ${rows}
    ${div()}
    ${small('送礼提示：在背包/市集获物后，输入「送XX给YY」即可送礼','muted')}
    ${small('关系阶段：陌生→相识→熟悉→知己/暧昧→恋人→生死相托','muted')}
    ${div()}
    ${cmdLine(['送礼','查看'])}
  `;
  return panel('好感面板', inner);
};

/* ============ 查看 NPC ============ */
App.renderNpc = function(key){
  const s = JH.state;
  const npc = JH.npcByKey(key);
  if(!npc) return panel('查无此人', row('未找到「'+esc(key)+'」，可攻略角色见帮助。','pink')+cmdLine());
  const known = s.knownNpcs.includes(key);
  const v = s.affinities[key]||0;
  const inner = `
    ${row(`身份 ${known?npc.identity:'？？'} · ${known?npc.gender+' · '+npc.age+'岁':'？？'}`)}
    ${row(`武功 ${known?npc.wuxue:'？？'} · 境界 ${known?npc.realm:'？？'}`)}
    ${row(`性格 ${known?npc.personality:'？？'}`)}
    ${row(`喜好 ${known?npc.likes:'？？'}  厌恶 ${known?npc.dislikes:'？？'}`)}
    ${row(`所在 ${known?npc.loc:'？？'}`)}
    ${row(`与你的关系 ${known?JH.affStage(v)+' · 好感 '+v:'陌生'}`)}
    ${known?small('近况：'+npc.stageIntro,'muted'):small('只观察到：'+npc.stageIntro,'muted')}
    ${div()}
    ${known?`<button class="btn" data-act-name="对话${key}">与之对话</button> <button class="btn ghost" data-act-name="送礼${key}">送礼</button>`:''}
    ${cmdLine(['对话'])}
  `;
  return panel(key+' · 人物', inner);
};

/* ============ 帮助 ============ */
App.renderHelp = function(){
  const inner = `
    ${row('<b class="gold">快捷指令</b>','gold')}
    ${small('面板/状态 — 查看状态卡')}
    ${small('背包 — 物品与武学　|　地图 — 地点与移动')}
    ${small('任务 — 主线与江湖大事　|　对话 — 与在场NPC交谈')}
    ${small('好感 — 好感面板　|　查看[人名] — 查NPC属性')}
    ${small('修炼/打坐 — 练功　|　商店/客栈/医馆 — 场景')}
    ${small('存档/读档 — 存读档　|　重置世界 — 重开')}
    ${div()}
    ${row('<b class="gold">自由行动</b>','gold')}
    ${small('以上只是快捷方式，你可随时输入任意行动，例如：')}
    ${small('「前往武当」「送清茶给顾青崖」「偷偷跟上那个黑衣人」','pink')}
    ${small('「打坐」「修炼家传三流拳法」「打听靖武令消息」','pink')}
    ${div()}
    ${row('<b class="gold">可攻略角色（全性向，不分玩家性别）</b>','gold')}
    ${row(JH.NPCS.map(n=>`<span class="tag-pill">${n.key}</span>`).join(''),'pink small')}
    ${div()}
    ${row('<b class="gold">六维属性</b>','gold')}
    ${JH.STAT_KEYS.map(k=>small(k+'：'+JH.STAT_DESC[k])).join('')}
    ${div()}
    ${row('<b class="gold">境界</b>：不入流→三流→二流→一流→宗师→大宗师→武圣','gold small')}
    ${row('<b class="gold">结局路线</b>（达成条件触发）','gold small')}
    ${small('江湖侠侣/一代宗师/武林盟主/庙堂宰辅/靖武功臣或逆贼/魔教教主/归隐山林/以身殉道/长生传说','muted')}
    ${div()}
    ${cmdLine()}
  `;
  return panel('帮助 · 江湖规则', inner);
};

/* ============ 日志面板 ============ */
App.renderLog = function(){
  const s = JH.state;
  if(!s.log || !s.log.length) return '';
  const rows = s.log.slice(0,8).map(l=>{
    return `<div class="log ${l.type}">${esc(l.msg)}</div>`;
  }).join('');
  return panel('江湖风声', rows);
};

/* ============ 事件渲染 ============ */
App.renderEvent = function(ev){
  const opts = ev.opts || [];
  const inner = `
    ${row('<span class="red">奇遇 · '+ev.title+'</span>','gold')}
    ${row(ev.text,'pink')}
    ${opts.length?`<div class="opts">${opts.map((o,i)=>`<div class="opt" data-ev-opt="${i}"><span class="tag">【${String.fromCharCode(65+i)}】</span><span class="txt">${esc(o)}</span></div>`).join('')}</div>`:''}
    ${small('输入你的应对之策亦可','muted')}
    ${cmdLine()}
  `;
  return panel('江湖事件', inner);
};

/* ============ 指令路由 ============ */
App.handleCommand = function(text){
  text = (text||'').trim();
  if(!text) return;
  const s = JH.state;
  // 自动存档
  if(s && s.created){ JH.autoSave(s); }

  // 创角阶段
  if(App.creation && App.creation.step===1){
    return App.creationStep1Input(text);
  }
  if(App.creation && App.creation.step===2){
    // step2 由表单绑定处理，文本输入忽略
    return;
  }

  // 标题界面
  if(!s || !s.created){
    if(/^[Aa1]|新|创|开始/.test(text) || text==='A'){
      App.startCreation(); return;
    }
    if(/^[Bb2]|读|载/.test(text) || text==='B'){
      App.loadGame(); return;
    }
    return;
  }

  // 战斗中
  if(s.combat && !s.combat.over){
    return App.combatInput(text);
  }

  // 待决事件选项
  if(s.pendingEvent && s.pendingEvent.opts){
    const idx = text.match(/^[A-Ea-e]$/);
    if(idx){
      const i = idx[0].toUpperCase().charCodeAt(0)-65;
      if(s.pendingEvent.opts[i]!==undefined){
        return App.resolveEventOption(i);
      }
    }
    // 否则作为自由行动应对
  }

  // 快捷指令
  const cmd = App.matchCmd(text);
  if(cmd) return;

  // 自由行动解析
  App.freeAction(text);
};

App.matchCmd = function(text){
  const s = JH.state;
  const t = text.replace(/\s/g,'');
  const m = (re)=> re.test(t);
  if(m(/^(面板|状态|主界面|主页)$/)) { App.render(); return true; }
  if(m(/^(背包|物品|行囊)$/)) { App.showPanel(App.renderInventory()); return true; }
  if(m(/^(地图|地点)$/)) { App.showPanel(App.renderMap()); return true; }
  if(m(/^(任务|主线)$/)) { App.showPanel(App.renderQuest()); return true; }
  if(m(/^(好感|关系)$/)) { App.showPanel(App.renderAff()); return true; }
  if(m(/^(帮助|规则|说明)$/)) { App.showPanel(App.renderHelp()); return true; }
  if(m(/^(打坐|运功|冥想)$/)) { App.doMeditate(); return true; }
  if(m(/^(修炼|练功|练武)$/)) { App.doPracticeMenu(); return true; }
  if(m(/^(对话|交谈|找人)$/)) { App.doTalkMenu(); return true; }
  if(m(/^(存档|保存)$/)) { App.doSave(); return true; }
  if(m(/^(读档|读取|载入)$/)) { App.loadGame(); return true; }
  if(m(/^(重置世界|重开|重来)$/)) { App.resetWorld(); return true; }
  // 查看[人名]
  let cm = t.match(/^(查看|查看角色|查)(.+)/);
  if(cm){ App.showPanel(App.renderNpc(cm[2])); return true; }
  // 对话XX
  let tm = t.match(/^对话(.+)/);
  if(tm){ App.doTalk(tm[1]); return true; }
  // 送礼
  let gm = text.match(/^(送|送礼|赠|给予)/);
  if(gm){ return App.doGiftParse(text); }
  // 商店/客栈/医馆
  if(m(/^(商店|买东西|购物)$/)) { App.doShop('市集'); return true; }
  if(m(/^(客栈|住店|打尖|休息)$/)) { App.doInn(); return true; }
  if(m(/^(医馆|看病|疗伤)$/)) { App.doClinic(); return true; }
  return false;
};

/* 显示临时面板（覆盖主界面，带返回） */
App.showPanel = function(html){
  const stage = el('stage');
  stage.innerHTML = html + panel('', `<button class="btn ghost" id="backMain">返回主界面</button>` + cmdLine());
  App.bindStage();
};

/* ============ 自由行动解析 ============ */
App.freeAction = function(text){
  const s = JH.state;
  const t = text.replace(/\s/g,'');
  // 1. 移动 / 进店：前往/去/到 XX（仅当目标是已知地点或店铺类型才生效）
  let mv = text.match(/^(?:前往|去|到|动身|启程|走进|进)(?:「|去|到)?(.+?)(?:」)?$/);
  if(mv){
    const dest = mv[1].trim();
    if(JH.MAP[dest]){ return App.doTravel(dest); }
    if(dest==='客栈' || dest==='住店'){ return App.doInn(); }
    if(dest==='医馆' || dest==='药铺'){ return App.doClinic(); }
    if(JH.SHOP_STOCK[dest] || dest==='市集' || dest==='商店'){ return App.doShop(dest); }
  }
  // 2. 购买：买/购 XX
  let buy = text.match(/(?:买|购买|购|来|来一)(?:一|个|些)?(.+)/);
  if(buy && /^(买|购|来)/.test(t)){ return App.doBuy(buy[1].trim()); }
  // 3. 送礼
  if(/^(送|赠|给予)/.test(t)){ return App.doGiftParse(text); }
  // 4. 修炼 XX
  let prac = text.match(/^(?:修炼|练|练习|修习)(.*)$/);
  if(prac && /^(修|练)/.test(t)){
    const arg = prac[1].trim();
    if(!arg || arg==='武学' || arg==='武学菜单'){ App.doPracticeMenu(); return; }
    return App.doPractice(arg);
  }
  // 5. 打坐
  if(/打坐|运功|冥想/.test(t)){ App.doMeditate(); return; }
  // 6. 打听/问/游历
  if(/游历|逛逛|四处走|四处/.test(t)){ return App.doAsk(''); }
  let ask = text.match(/(?:打听|问问|询问|探听|问)(?:一下)?(.*)$/);
  if(ask && /^(打听|问|询问|探听)/.test(t)){ return App.doAsk(ask[1].trim()); }
  // 7. 偷
  if(/^(偷|偷窃|偷东西)/.test(t)){ return App.doSteal(); }
  // 8. 攻击/打架
  if(/^(打|杀|攻击|出手|拔剑|拔刀)/.test(t)){ return App.doAttackFree(text); }
  // 9. 休息/睡觉
  if(/休息|睡觉|睡一觉|歇息|打尖|住店/.test(t)){ App.doInn(); return; }
  // 10. 吃东西
  let eat = text.match(/(?:吃|食用|用)(?:点|些|一个|个)?(.+)/);
  if(eat && /^吃/.test(t)){ return App.doEat(eat[1].trim()); }
  // 11. 对话XX
  let talk = t.match(/^对话(.+)/) || text.match(/^跟?(.+)说话$/) || text.match(/^找(.+)聊天$/);
  if(talk){ return App.doTalk(talk[1].trim()); }
  // 12. 查看
  let view = t.match(/^(查看|查)(.+)/);
  if(view){ App.showPanel(App.renderNpc(view[2])); return; }

  // 自由叙事兜底：把玩家输入当作一次"探索/尝试"，给一个合理化响应
  return App.freeFormFallback(text);
};

App.freeFormFallback = function(text){
  const s = JH.state;
  JH.nextTurn(s);
  // 根据气运/相关属性给出结果
  const roll = JH.dice(100);
  const qiyun = s.player.stats['气运'];
  let result;
  if(roll + qiyun > 110){
    // 成功/有收获
    const gains = [
      ()=>{ s.player.shengwang+=2; return '你的举动引起旁人赞叹，声望+2。'; },
      ()=>{ JH.growStat(s,'身法',20); return '你巧妙地完成了行动，身法略有精进。'; },
      ()=>{ JH.growStat(s,'魅力',20); return '你应对得体，魅力略有精进。'; },
      ()=>{ const g=JH.dice(20)+5; JH.addSilver(s,g); return '你有所斩获，得银 '+g+' 两。'; },
    ];
    result = JH.pick(gains)();
    JH.log(s,'good','「'+text+'」 — '+result);
  } else if(roll + qiyun > 60){
    result = '你的行动平稳推进，无惊无险。';
    JH.growStat(s,'悟性',8);
    JH.log(s,'sys','「'+text+'」 — '+result);
  } else {
    s.player.tili = Math.max(0, s.player.tili-5);
    result = '你的行动未达所愿，反耗了些体力。';
    JH.log(s,'bad','「'+text+'」 — '+result);
  }
  App.afterTurn(result);
};

/* ============ 具体行动实现 ============ */
App.doTravel = function(dest){
  const s = JH.state; const p = s.player;
  const cur = JH.MAP[p.location];
  if(dest===p.location){ App.toast('你已在此地。'); return; }
  if(!cur.connects.includes(dest)){
    // 是否在地图任意点（需中转）
    if(JH.MAP[dest]){
      App.toast('「'+dest+'」不与「'+p.location+'」直接相连，需途经：'+cur.connects.join(' / ')+'。');
      return;
    }
    App.toast('未找到「'+dest+'」此地。可用「地图」查看。');
    return;
  }
  JH.nextTurn(s);
  p.location = dest;
  const weather = JH.weatherFor(JH.MONTHS[s.time.monthIdx].season);
  s.weather = weather;
  // 旅途中可能遇 NPC 或事件
  JH.log(s,'sys','你启程前往「'+dest+'」，沿途风物渐变。');
  // 30% 途中结识/偶遇 NPC
  if(JH.dice(100)<=30){
    const local = JH.NPCS.filter(n=>n.loc===dest || n.loc==='行踪不定');
    if(local.length){
      const npc = JH.pick(local);
      JH.know(s,npc.key);
      JH.log(s,'good','途中遇见「'+npc.key+'」（'+npc.identity+'），已结识。');
    }
  }
  App.afterTurn('你抵达「'+dest+'」。'+s.weather+'。');
};

App.doMeditate = function(){
  const s = JH.state;
  const msg = JH.meditate(s);
  App.afterTurn(msg);
};

App.doPracticeMenu = function(){
  const s = JH.state;
  if(!s.player.wuxue.length){ App.toast('你尚未习得任何武学。'); return; }
  const rows = s.player.wuxue.map((w,i)=>`<div class="opt" data-prac="${esc(w.name)}"><span class="tag">【${String.fromCharCode(65+i)}】</span><span class="txt">${w.name} <span class="hint muted">${w.grade}/${w.type}/${w.level}</span></span></div>`).join('');
  App.showPanel(panel('修炼武学', row('选择一门武学修习（消耗时辰，悟性判定精进）','pink')+`<div class="opts">${rows}</div>`+small('也可直接输入「修炼 武学名」','muted')+cmdLine()));
};

App.doPractice = function(wname){
  const s = JH.state;
  // 模糊匹配
  const w = s.player.wuxue.find(x=>x.name.includes(wname) || wname.includes(x.name));
  if(!w){ App.toast('你未习得「'+wname+'」。'); return; }
  const r = JH.practiceWuxue(s, w.name);
  App.afterTurn(r.msg);
};

App.doTalkMenu = function(){
  const s = JH.state;
  if(!s.knownNpcs.length){ App.toast('你尚未结识江湖中人，四处游历或可遇之。'); return; }
  const rows = s.knownNpcs.map((k,i)=>{
    const npc = JH.npcByKey(k);
    return `<div class="opt" data-talk="${esc(k)}"><span class="tag">【${String.fromCharCode(65+i)}】</span><span class="txt">${k} <span class="hint muted">${npc?npc.identity:''}</span></span></div>`;
  }).join('');
  App.showPanel(panel('对话', row('选择交谈对象（消耗时辰）','pink')+`<div class="opts">${rows}</div>`+small('也可直接输入「对话 人名」','muted')+cmdLine()));
};

App.doTalk = function(key){
  const s = JH.state;
  const npc = JH.npcByKey(key);
  if(!npc){ App.toast('查无此人：'+key); return; }
  if(!s.knownNpcs.includes(key)){
    // 试图与陌生人对话 -> 结识
    if(npc.loc===s.player.location){
      JH.know(s,key);
      JH.nextTurn(s);
      JH.addAff(s,key,2);
      JH.growStat(s,'魅力',12);
      JH.log(s,'good','你结识了「'+key+'」（'+npc.identity+'）。');
      App.afterTurn('你上前搭话，结识了「'+key+'」。'+npc.stageIntro);
      return;
    } else {
      App.toast('「'+key+'」不在「'+s.player.location+'」，你尚未结识ta。');
      return;
    }
  }
  const r = JH.talk(s, key);
  App.afterTurn(r.msg);
};

App.doGiftParse = function(text){
  const s = JH.state;
  // 送 XX 给 YY / 送YY XX / 送 XX 给YY
  let m = text.match(/送(.+?)给(.+)/) || text.match(/赠(.+?)给(.+)/);
  let item, target;
  if(m){ item=m[1].trim(); target=m[2].trim(); }
  else {
    m = text.match(/送(.+?)(.{2,4})$/);
    // 难以分词，提示格式
  }
  if(!item || !target){
    App.toast('送礼格式：「送 物品名 给 人名」，如「送清茶给顾青崖」');
    return;
  }
  // 模糊匹配人名
  const npc = JH.NPCS.find(n=>n.key.includes(target) || target.includes(n.key));
  if(!npc){ App.toast('查无此人：'+target); return; }
  if(!s.knownNpcs.includes(npc.key)){ App.toast('你尚未结识「'+npc.key+'」。'); return; }
  // 模糊匹配物品
  const it = s.player.inventory.find(x=>x.name.includes(item) || item.includes(x.name));
  if(!it){ App.toast('背包中没有「'+item+'」。'); return; }
  // 送礼不耗整回合？规范未明确，耗半回合（合并到下个时辰）
  JH.nextTurn(s);
  const r = JH.gift(s, npc.key, it.name);
  App.afterTurn(r.msg);
};

App.doShop = function(kind){
  const s = JH.state; const p = s.player;
  const loc = JH.MAP[p.location];
  const shops = loc.shops||[];
  // 找一个可买东西的店
  const shop = shops.find(sh=> (JH.SHOP_STOCK[sh]||[]).length) || shops[0] || kind;
  const stock = JH.SHOP_STOCK[shop]||[];
  if(!stock.length){ App.toast('「'+p.location+'」无可购买的店铺。'); return; }
  const rows = stock.map(name=>{
    const price = JH.PRICES[name]||0;
    const can = p.silver>=price;
    return `<div class="opt ${can?'':'disabled'}" data-buy="${esc(name)}"><span class="tag">【买】</span><span class="txt">${name} <span class="hint muted">${JH.fmtSilver(price)}${can?'':'（银两不足）'}</span></span></div>`;
  }).join('');
  App.showPanel(panel('店铺 · '+shop+'（'+p.location+'）', row('银两：'+JH.fmtSilver(p.silver),'gold')+`<div class="opts">${rows}</div>`+small('点击购买，或输入「买 物品名」','muted')+cmdLine()));
};

App.doBuy = function(name){
  const s = JH.state; const p = s.player;
  // 模糊匹配
  const key = Object.keys(JH.PRICES).find(k=>k.includes(name)||name.includes(k));
  if(!key){ App.toast('此地无「'+name+'」出售。'); return; }
  const price = JH.PRICES[key];
  if(!JH.spendSilver(s, price)){ App.toast('银两不足，需 '+JH.fmtSilver(price)+'。'); return; }
  if(key==='客栈(一夜)'){ return App.doInn(true); }
  JH.addItem(s, {name:key, type:'物品'});
  JH.log(s,'good','购入「'+key+'」，花费 '+JH.fmtSilver(price)+'。');
  App.toast('已购入「'+key+'」。');
  App.render();
};

App.doInn = function(paid){
  const s = JH.state; const p = s.player;
  const loc = JH.MAP[p.location];
  if(!(loc.shops||[]).includes('客栈') && !paid){
    App.toast('「'+p.location+'」没有客栈，可在野外露宿（恢复减半）。是否输入「休息」露宿？');
    // 露宿
    JH.nextTurn(s);
    p.baoshi = Math.min(100, p.baoshi+20);
    p.tili = Math.min(p.tiliMax, p.tili+30);
    p.neili = Math.min(p.neiliMax, p.neili+20);
    JH.log(s,'sys','野外露宿一夜，体力内力略复，饱食回升。');
    App.afterTurn('你露宿一夜，精神略振。');
    return;
  }
  const price = JH.PRICES['客栈(一夜)'];
  if(!paid && !JH.spendSilver(s, price)){ App.toast('银两不足，客栈需 '+JH.fmtSilver(price)+'。'); return; }
  // 休息过夜：时辰推进到次日辰时
  const s0 = s.time.shichenIdx;
  // 推进到次日卯辰之间
  let steps = ((5 - s.time.shichenIdx)+12)%12 + 12; // 到次日辰时
  JH.advanceTime(s, Math.min(steps, 12));
  s.turn++;
  p.baoshi = Math.min(100, p.baoshi+40);
  p.tili = p.tiliMax;
  p.neili = p.neiliMax;
  p.fatigue = 0;
  if(p.shangshi && JH.dice(100)<=60){ p.shangshi=null; JH.log(s,'good','休息后伤势好转。'); }
  JH.log(s,'good','客栈安歇一夜，精力尽复。');
  App.afterTurn('你客栈歇息一夜，体力内力全满，饱食回升。');
};

App.doClinic = function(){
  const s = JH.state; const p = s.player;
  const loc = JH.MAP[p.location];
  if(!(loc.shops||[]).includes('医馆') && !(loc.shops||[]).includes('药铺')){
    App.toast('「'+p.location+'」无医馆。可购买疗伤药自行服用。');
    return;
  }
  if(!p.shangshi && !p.zhongdu && p.qixue>=p.qixueMax*0.9){
    App.toast('你并无伤病。'); return;
  }
  const cost = 300;
  if(!JH.spendSilver(s, cost)){ App.toast('疗伤需 '+JH.fmtSilver(cost)+'，银两不足。'); return; }
  JH.nextTurn(s);
  p.qixue = p.qixueMax;
  p.shangshi = null;
  if(p.zhongdu){ p.zhongdu=null; }
  JH.log(s,'good','医馆诊治，伤病尽去。');
  App.afterTurn('医馆诊治一番，伤病尽去，气血回满。');
};

App.doEat = function(name){
  const s = JH.state;
  const it = s.player.inventory.find(x=>x.name.includes(name)||name.includes(x.name));
  if(!it){ App.toast('没有「'+name+'」可吃。'); return; }
  JH.removeItem(s, it.name);
  s.player.baoshi = Math.min(100, s.player.baoshi+30);
  if(it.name==='疗伤药'){ s.player.qixue = Math.min(s.player.qixueMax, s.player.qixue+30); }
  JH.log(s,'sys','你用了「'+it.name+'」，饱食+30。');
  App.toast('已食用「'+it.name+'」。');
  App.render();
};

App.doAsk = function(topic){
  const s = JH.state;
  JH.nextTurn(s);
  JH.growStat(s,'魅力',8);
  JH.growStat(s,'悟性',8);
  let info;
  if(topic && (topic.includes('靖武')||topic.includes('令'))){
    info = '打听到：朝廷「靖武令」意在清点武林、收缴私兵，正邪各派暗流涌动，武林盟主之位空悬更添变数。';
    s.flags.heardJingwu = true;
  } else if(topic && topic.includes('武当')){
    info = '打听到：武当山三月后开山门收徒，届时各路少年英杰云集。';
  } else if(topic && (topic.includes('魔')||topic.includes('幽冥'))){
    info = '打听到：幽冥教残部潜伏北境，似有复辟之意，江湖正派已有所察觉。';
  } else {
    const gossips = [
      '听闻武林盟主之位悬而未决，各大派明争暗斗。',
      '市井传言，东缉事厂近日大肆缉捕江湖人，人人自危。',
      '有人说起姑苏画舫花魁柳含烟，琴艺冠绝江南，求见者络绎。',
      '江湖盛传，药王谷少谷主楚云澜医术通神，常义诊济贫。',
      '风闻北境风雪城近来怪事频生，过路客商多有失踪。',
    ];
    info = JH.pick(gossips);
  }
  JH.log(s,'sys','打听消息：'+info);
  App.afterTurn('你打听到一则消息：'+info);
};

App.doSteal = function(){
  const s = JH.state;
  if(s.player.shane < -20){ App.toast('你声名已恶，偷窃易被识破。'); }
  const shenfa = s.player.stats['身法'];
  const roll = JH.dice(100) + shenfa;
  JH.nextTurn(s);
  if(roll > 90){
    const g = JH.dice(30)+10;
    JH.addSilver(s, g);
    JH.growStat(s,'身法',20);
    JH.addShane(s,-3);
    JH.log(s,'good','你下手得手，得银 '+g+' 两，但善恶-3。');
    App.afterTurn('你得了手，得银 '+g+' 两。');
  } else if(roll > 50){
    JH.growStat(s,'身法',10);
    JH.log(s,'sys','你下手未成，也无人察觉。');
    App.afterTurn('你下手未成，悄然遁去。');
  } else {
    JH.addShengwang(s,-5);
    JH.addShane(s,-8);
    s.player.shangshi = '轻伤';
    JH.log(s,'bad','你被当场抓获，挨了一顿打，声望-5，善恶-8。');
    App.afterTurn('你被当场抓获，挨了顿打，声望大跌。');
  }
};

App.doAttackFree = function(text){
  const s = JH.state;
  // 简单：遭遇一个地痞/山贼战斗
  const enemy = JH.pick([
    {name:'地痞泼皮',hp:60,hpMax:60,atk:8,def:3,realm:'不入流',desc:'市井无赖'},
    {name:'山贼',hp:90,hpMax:90,atk:12,def:5,realm:'三流',desc:'占山劫道'},
    {name:'黑衣人',hp:120,hpMax:120,atk:18,def:8,realm:'二流',desc:'来路不明'},
  ]);
  JH.log(s,'sys','你拔刃相向，'+enemy.name+'亦不退让。');
  App.startCombatView(enemy);
};

/* ============ 事件引擎 ============ */
App.afterTurn = function(msg){
  const s = JH.state;
  JH.autoSave(s);
  // 检查节日
  const fest = JH.FESTIVALS[JH.dateKey(s)];
  if(fest && !s.flags['fest_'+JH.dateKey(s)]){
    s.flags['fest_'+JH.dateKey(s)] = true;
    App.triggerFestival(fest);
    App.render();
    App.toast('今日是「'+fest+'」，输入「参与」或自由行动。');
    return;
  }
  // 20% 随机事件
  if(!s.pendingEvent && JH.dice(100)<=20){
    const ev = JH.pick(JH.RANDOM_EVENTS);
    s.pendingEvent = {...ev, resolved:false};
    JH.log(s,'sys','触发事件：'+ev.title);
    const stage = el('stage');
    stage.innerHTML = App.renderMain() + App.renderEvent(s.pendingEvent);
    App.bindStage();
    return;
  }
  // 气运奇遇（每回合 8%）
  if(!s.pendingEvent && JH.dice(100)<=8){
    const advs = JH.ADVENTURES.filter(a=> (JH.dice(100)+s.player.stats['气运'])>a.needLuck);
    if(advs.length){
      const adv = JH.pick(advs);
      App.resolveAdventure(adv);
      App.render();
      return;
    }
  }
  // 普通刷新
  App.render();
  if(msg) App.toast(msg);
};

App.resolveEventOption = function(i){
  const s = JH.state;
  const ev = s.pendingEvent;
  const choice = ev.opts[i];
  JH.nextTurn(s);
  let result='';
  // 通用化处理
  if(/抓贼|出手|应战|冒险|应募|买|上前|帮/.test(choice)){
    const roll = JH.dice(100);
    if(roll+s.player.stats['身法']>80 || roll+s.player.stats['臂力']>80){
      const g=JH.dice(20)+5;
      JH.addSilver(s,g);
      JH.addShengwang(s,3);
      result='你得手了，得银 '+g+' 两，声望+3。';
      JH.log(s,'good',result);
    } else if(roll>40){
      result='一番周折，不了了之。';
      JH.log(s,'sys',result);
    } else {
      s.player.shangshi='轻伤';
      s.player.qixue-=15;
      result='你失了手，受了轻伤。';
      JH.log(s,'bad',result);
    }
  } else if(/救|扶|医/.test(choice)){
    if(s.player.wuxue.some(w=>w.name.includes('回春')||w.name.includes('百草')) || s.player.stats['悟性']>12){
      JH.addShengwang(s,5); JH.addShane(s,5); JH.growStat(s,'魅力',15);
      result='你施救得宜，得人感激，声望+5，善恶+5。';
      // 救人得机缘
      if(JH.dice(100)+s.player.stats['气运']>90){
        JH.addItem(s,{name:'续命丹',type:'奇药',note:'长者所赠，可续命疗重伤'});
        result+='对方赠你一枚续命丹！';
      }
      JH.log(s,'good',result);
    } else {
      result='你不懂医术，束手无策。';
      JH.log(s,'sys',result);
    }
  } else if(/忍|绕|避|婉拒|不买|离去|旁观/.test(choice)){
    result='你避开了此事。';
    JH.log(s,'sys',result);
  } else if(/话|化解|攀谈|套话|将错/.test(choice)){
    JH.growStat(s,'魅力',20);
    JH.growStat(s,'悟性',10);
    result='你一番言辞应对，略有收获。';
    JH.log(s,'good',result);
  } else {
    result='你选择了：'+choice+'。';
    JH.log(s,'sys',result);
  }
  s.pendingEvent=null;
  App.afterTurn(result);
};

App.resolveAdventure = function(adv){
  const s = JH.state;
  JH.nextTurn(s);
  let msg = '奇遇！'+adv.title+' — '+adv.text;
  const r = adv.reward;
  if(r.type==='wuxue'){
    // 给一本对应品级武学
    const grade = r.val;
    const lib = JH.WUXUE_LIB.filter(w=>w.grade===grade && !s.player.wuxue.some(p=>p.name===w.name));
    const w = JH.pick(lib.length?lib:JH.WUXUE_LIB);
    s.player.wuxue.push({...w, level:'入门'});
    msg += ' 你习得「'+w.name+'」！';
    JH.log(s,'good',msg);
  } else if(r.type==='neili'){
    s.player.neiliMax += r.val;
    s.player.neili = s.player.neiliMax;
    msg += ' 内力上限 +'+r.val+'！';
    JH.log(s,'good',msg);
  } else if(r.type==='item'){
    const it = {name:r.val||JH.pick(['古剑','神秘信物','续命丹','前朝残卷']),type:'奇物',note:'奇遇所得'};
    JH.addItem(s,it);
    msg += ' 获得「'+it.name+'」！';
    JH.log(s,'good',msg);
  } else if(r.type==='heal'){
    s.player.qixue = s.player.qixueMax;
    s.player.shangshi=null;
    s.player.zhongdu=null;
    msg += ' 旧伤尽愈，气血回满！';
    JH.log(s,'good',msg);
  }
  App.toast(msg);
};

App.triggerFestival = function(name){
  const s = JH.state;
  let msg='';
  if(name.includes('上元')){
    msg='上元灯会，长安街头花灯如海。你亦可猜灯谜、放河灯，或邂逅有缘人。';
    if(JH.dice(100)+s.player.stats['魅力']>90){
      const npc = JH.pick(JH.NPCS.filter(n=>n.loc==='京都·长安'||n.loc==='行踪不定'));
      if(npc){ JH.know(s,npc.key); JH.addAff(s,npc.key,5); msg+=' 灯下偶遇「'+npc.key+'」，好感+5。'; }
    }
  } else if(name.includes('七夕')){
    msg='七夕乞巧，今夜告白成功率大增。若有所爱之人，可表心迹。';
    s.flags.qixiBonus=true;
  } else if(name.includes('中秋')){
    msg='中秋赏月，宜邀友共饮、吟诗对月，情谊升温。';
  } else if(name.includes('除夕')){
    msg='除夕守岁，与亲近之人共度年夜饭，好感大幅升温。';
  } else if(name.includes('端午')){
    msg='端午龙舟，江上鼓声雷动，当心有人下蛊作祟。';
  } else {
    msg='今日是「'+name+'」，宜祭祀、追思、结缘。';
  }
  JH.log(s,'sys',msg);
  App.toast(msg);
};

/* ============ 战斗 ============ */
App.startCombatView = function(enemy){
  const s = JH.state;
  JH.startCombat(s, enemy);
  App.renderCombat();
};

App.renderCombat = function(){
  const s = JH.state; const c = s.combat;
  const p = s.player;
  const e = c.enemy;
  const inner = `
    ${row('<span class="red">战斗 · 第 '+c.round+' 回合</span>','gold')}
    ${div()}
    <div class="combat-row">
      <div class="combat-side">
        ${row('<b class="gold">你</b>','pink')}
        ${row('气血 '+barText(p.qixue,p.qixueMax),'pink small')}
        ${row('内力 '+barText(p.neili,p.neiliMax,'neili'),'pink small')}
        ${row('攻 '+JH.playerAtk(s)+'  防 '+JH.playerDef(s),'pink small')}
      </div>
      <div class="combat-side">
        ${row('<b class="red">'+e.name+'</b>','pink')}
        ${row('气血 '+barText(e.hp,e.hpMax),'pink small')}
        ${row('境界 '+e.realm,'pink small')}
        ${small(e.desc,'muted')}
      </div>
    </div>
    ${div()}
    <div class="opts">
      <div class="opt" data-cb="攻击"><span class="tag">【A】</span><span class="txt">攻击/出招</span></div>
      <div class="opt" data-cb="防御"><span class="tag">【B】</span><span class="txt">防御(减伤)</span></div>
      <div class="opt" data-cb="闪避"><span class="tag">【C】</span><span class="txt">轻功闪避(身法)</span></div>
      <div class="opt" data-cb="暗器"><span class="tag">【D】</span><span class="txt">暗器/用毒</span></div>
      <div class="opt" data-cb="说话"><span class="tag">【E】</span><span class="txt">说话(降战意)</span></div>
      <div class="opt" data-cb="逃跑"><span class="tag">【F】</span><span class="txt">逃跑(身法)</span></div>
    </div>
    ${c.log.length?panel('',c.log.slice(-4).map(l=>`<div class="log ${l.t}">${esc(l.m)}</div>`).join('')):''}
    ${cmdLine()}
  `;
  el('stage').innerHTML = panel('战斗', inner, {crisis:true});
  App.bindStage();
};

App.combatInput = function(text){
  const s = JH.state; const c = s.combat;
  if(c.over) return;
  const t = text.replace(/\s/g,'');
  let action;
  if(/^[Aa1]|攻击|出招|打/.test(t)) action='攻击';
  else if(/^[Bb2]|防御|防/.test(t)) action='防御';
  else if(/^[Cc3]|闪|避|轻功/.test(t)) action='闪避';
  else if(/^[Dd4]|暗器|毒/.test(t)) action='暗器';
  else if(/^[Ee5]|说话|喝|劝/.test(t)) action='说话';
  else if(/^[Ff6]|逃|跑|撤/.test(t)) action='逃跑';
  else action='攻击';
  App.combatResolve(action);
};

App.combatResolve = function(action){
  const s = JH.state; const c = s.combat; const p = s.player; const e = c.enemy;
  const addLog = (t,m)=> c.log.push({t,m});
  // 玩家先手（身法判定）
  const playerFirst = (p.stats['身法'] + JH.dice(20)) >= ( (e.atk||10) + JH.dice(20));
  const doPlayer = ()=>{
    if(action==='攻击'){
      let dmg = Math.max(2, JH.playerAtk(s) - e.def + JH.dice(10)-5);
      const crit = JH.dice(100) <= p.stats['气运'];
      if(crit) dmg = Math.round(dmg*1.8);
      e.hp -= dmg;
      addLog(crit?'bad':'sys', `你出招，造成 ${dmg} 伤害${crit?'（暴击！）':''}。`);
      JH.growStat(s,'臂力',12);
    } else if(action==='防御'){
      addLog('sys','你凝神防御，下回合所受伤害减半。');
      c.defending=true;
      JH.growStat(s,'根骨',10);
    } else if(action==='闪避'){
      const ok = JH.dice(100)+p.stats['身法'] > 80;
      if(ok){ c.evading=true; addLog('sys','你身形一闪，避开下回合攻击。'); }
      else { addLog('sys','你闪避不及。'); }
      JH.growStat(s,'身法',15);
    } else if(action==='暗器'){
      const has = p.wuxue.some(w=>w.name.includes('暗器')||w.name.includes('满天')||w.name.includes('梨花')) || p.inventory.some(i=>i.name.includes('暗器'));
      if(has){
        const dmg = JH.dice(15)+p.stats['身法']/2;
        e.hp -= dmg;
        if(JH.dice(100)<=30){ e.poisoned=true; addLog('bad','暗器淬毒，敌中毒！'); }
        addLog('sys',`你施暗器，造成 ${Math.round(dmg)} 伤害。`);
      } else { addLog('sys','你无暗器可用。'); }
    } else if(action==='说话'){
      const ok = JH.dice(100)+p.stats['魅力'] > 90;
      if(ok){ e.atk = Math.max(1, e.atk-4); addLog('good','你一番言语，敌战意大减，攻击下降。'); }
      else { addLog('sys','对方不为所动。'); }
      JH.growStat(s,'魅力',12);
    } else if(action==='逃跑'){
      const ok = JH.dice(100)+p.stats['身法'] > 70;
      if(ok){ addLog('good','你脱身而去，战斗结束。'); c.over=true; c.fled=true; }
      else { addLog('bad','未能逃脱。'); }
    }
  };
  const doEnemy = ()=>{
    if(c.evading){ addLog('sys','你已避开此击。'); c.evading=false; return; }
    let dmg = Math.max(1, e.atk - JH.playerDef(s) + JH.dice(8)-4);
    if(c.defending){ dmg = Math.round(dmg/2); c.defending=false; }
    if(e.poisoned && JH.dice(100)<=40){ e.hp -= 5; addLog('bad','毒发，敌损 5 血。'); }
    p.qixue -= dmg;
    addLog('bad', `${e.name} 反击，你受 ${dmg} 伤害。`);
    if(p.qixue<=0){
      // 绝处逢生判定
      if(JH.dice(100) <= p.stats['气运']){
        p.qixue = 1; addLog('good','绝处逢生！你勉强撑住。');
      } else {
        c.over=true; c.lost=true; p.qixue=0;
        addLog('bad','你重伤倒地……');
      }
    }
  };
  if(playerFirst){ doPlayer(); if(e.hp>0 && !c.over) doEnemy(); }
  else { doEnemy(); if(p.qixue>0 && !c.over) doPlayer(); }
  c.round++;
  // 结算
  if(c.over){
    App.combatEnd();
    return;
  }
  if(e.hp<=0){
    c.over=true; c.won=true;
    addLog('good',`${e.name} 倒下，你获胜！`);
    App.combatEnd();
    return;
  }
  App.renderCombat();
};

App.combatEnd = function(){
  const s = JH.state; const c = s.combat;
  const p = s.player;
  if(c.fled){
    JH.log(s,'sys','你逃离战斗。');
  } else if(c.won){
    JH.addShengwang(s, 5);
    JH.growStat(s,'臂力',20);
    JH.growStat(s,'根骨',15);
    const g = JH.dice(40)+20;
    JH.addSilver(s,g);
    JH.log(s,'good','战斗获胜！声望+5，得银 '+g+' 两。');
    // 30% 掉落
    if(JH.dice(100)<=30){
      const drop = JH.pick(['凡品秘籍','疗伤药','精铁剑','银票']);
      JH.addItem(s,{name:drop,type:'战利品'});
      JH.log(s,'good','敌方遗落：「'+drop+'」。');
    }
  } else if(c.lost){
    JH.log(s,'bad','你战败重伤，被人救起送回客栈。');
    p.qixue = Math.round(p.qixueMax*0.3);
    p.shangshi='重伤';
    p.tili = Math.round(p.tiliMax*0.3);
    JH.addShengwang(s,-5);
    // 自动回最近存档点（客栈）
    p.location = (JH.MAP[p.location].shops||[]).includes('客栈')?p.location:JH.MAP[p.location].connects[0]||p.location;
  }
  s.combat=null;
  App.afterTurn(c.fled?'你脱离了战斗。':(c.won?'你赢得了战斗。':'你战败，侥幸生还。'));
};

/* ============ 存档 ============ */
App.doSave = function(){
  const s = JH.state;
  const slot = JH.save(s);
  JH.log(s,'sys','已存档至第 '+slot+' 档。');
  App.toast('已存档（第 '+slot+' 档）。');
  App.render();
};

App.loadGame = function(){
  const saves = JH.listSaves();
  const keys = Object.keys(saves);
  if(!keys.length){
    const auto = JH.loadAuto();
    if(auto){ JH.state = auto; App.render(); App.toast('已读取自动存档。'); return; }
    App.toast('暂无存档。');
    return;
  }
  // 读最新一档
  const slot = keys.sort((a,b)=>saves[b].savedAt-saves[a].savedAt)[0];
  JH.load(slot);
  App.render();
  App.toast('已读取第 '+slot+' 档存档。');
};

App.resetWorld = function(){
  if(!confirm('确定要重置世界、放弃当前进度重新创角吗？')) return;
  JH.state=null; App.creation=null;
  localStorage.removeItem(JH.AUTO_KEY);
  App.render();
};

/* ============ 创角输入处理 ============ */
App.creationStep1Input = function(text){
  // step1 由表单按钮处理，这里不处理文本
};

/* ============ Toast ============ */
let toastTimer=null;
App.toast = function(msg){
  let t = el('toast');
  if(!t){
    t = document.createElement('div');
    t.id='toast';
    t.style.cssText='position:fixed;left:50%;bottom:80px;transform:translateX(-50%);background:#000;border:1px solid #E63946;color:#FFB3B3;padding:.5em 1em;border-radius:3px;z-index:99;font-size:.85em;max-width:80%;text-align:center;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.display='block';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ t.style.display='none'; }, 2600);
};

/* ============ 事件绑定 ============ */
App.bindStage = function(){
  const stage = el('stage');
  // 选项点击
  stage.querySelectorAll('.opt').forEach(o=>{
    o.addEventListener('click', ()=>{
      if(o.classList.contains('disabled')) return;
      // 各类 data 属性
      if(o.dataset.act){ App.handleTitleAct(o.dataset.act); return; }
      if(o.dataset.bg){ App.selectBackground(o.dataset.bg); return; }
      if(o.dataset.talent){ App.toggleTalent(o.dataset.talent); return; }
      if(o.dataset.actName){ App.handleCommand(o.dataset.actName); return; }
      if(o.dataset.opt!==undefined){ App.handleCommand(String.fromCharCode(65+parseInt(o.dataset.opt))); return; }
      if(o.dataset.evOpt!==undefined){ App.handleCommand(String.fromCharCode(65+parseInt(o.dataset.evOpt))); return; }
      if(o.dataset.prac){ App.doPractice(o.dataset.prac); return; }
      if(o.dataset.talk){ App.doTalk(o.dataset.talk); return; }
      if(o.dataset.buy){ App.doBuy(o.dataset.buy); return; }
      if(o.dataset.cb){ App.combatInput(o.dataset.cb); return; }
    });
  });
  // 返回主界面
  const back = stage.querySelector('#backMain');
  if(back) back.addEventListener('click', ()=>App.render());
  // 创角表单
  if(App.creation && App.creation.step===2){
    App.bindCreation2();
  }
  // 掷气运
  const rollLuck = stage.querySelector('#rollLuck');
  if(rollLuck) rollLuck.addEventListener('click', App.rollLuck);
  // 确认创角
  const conf = stage.querySelector('#confirmCreate');
  if(conf) conf.addEventListener('click', App.confirmCreation);
  const back1 = stage.querySelector('#backStep1');
  if(back1) back1.addEventListener('click', ()=>{ App.creation.step=1; App.render(); });
  // step1 按钮
  const go2 = stage.querySelector('#goStep2');
  if(go2) go2.addEventListener('click', App.goStep2);
  // step1 输入实时记录
  if(App.creation && App.creation.step===1){
    const n=stage.querySelector('#f_name'), g=stage.querySelector('#f_gender'),
          a=stage.querySelector('#f_age'), ap=stage.querySelector('#f_app');
    if(n) n.addEventListener('input',e=>App.creation.name=e.target.value);
    if(g) g.addEventListener('change',e=>App.creation.gender=e.target.value);
    if(a) a.addEventListener('input',e=>App.creation.age=parseInt(e.target.value)||18);
    if(ap) ap.addEventListener('input',e=>App.creation.appearance=e.target.value);
  }
};

App.handleTitleAct = function(act){
  if(act==='new'){ App.startCreation(); return; }
  if(act==='load'){ App.loadGame(); return; }
};

App.selectBackground = function(key){
  App.creation.background = key;
  App.render();
};

App.toggleTalent = function(key){
  const c = App.creation;
  const t = JH.TALENTS.find(x=>x.key===key);
  const idx = c.talents.indexOf(key);
  if(idx>=0){ c.talents.splice(idx,1); }
  else {
    if(!c.allowSecond && c.talents.length>=1){ App.toast('仅可选 1 个主天赋（掷气运≥90可加副天赋）。'); return; }
    if(c.allowSecond && c.talents.length>=2){ App.toast('最多 2 个天赋。'); return; }
    c.talents.push(key);
  }
  App.render();
};

App.rollLuck = function(){
  const c = App.creation;
  if(c.luckRolled) return;
  c.luckValue = JH.dice(100);
  c.luckRolled = true;
  if(c.luckValue>=90){ c.allowSecond=true; App.toast('气运 '+c.luckValue+'！可再选 1 个副天赋。'); }
  else { App.toast('气运 '+c.luckValue+'，未达 90，仅 1 主天赋。'); }
  App.render();
};

App.goStep2 = function(){
  const c = App.creation;
  if(!c.name){ c.name='无名客'; }
  if(!c.background){ App.toast('请先选择出身。'); return; }
  c.step=2;
  App.render();
};

App.bindCreation2 = function(){
  const c = App.creation;
  el('stage').querySelectorAll('input[type=range]').forEach(r=>{
    r.addEventListener('input', e=>{
      const k = e.target.dataset.stat;
      c.allocation[k] = parseInt(e.target.value);
      el('v_'+k).textContent = e.target.value;
      el('totalPts').textContent = JH.totalAllocated(c.allocation);
      const tb = el('stage').querySelector('.totalbar');
      const total = JH.totalAllocated(c.allocation);
      tb.className = total===60?'totalbar':'totalbar warn';
    });
  });
};

App.confirmCreation = function(){
  const c = App.creation;
  const total = JH.totalAllocated(c.allocation);
  if(total!==60){ App.toast('属性需恰好分配 60 点（当前 '+total+'）。'); return; }
  for(let k of JH.STAT_KEYS){ if(c.allocation[k]<1||c.allocation[k]>20){ App.toast(k+'需在1~20之间。'); return; } }
  if(c.talents.length<1){ App.toast('请至少选 1 个主天赋。'); return; }
  // 生成
  const {state, overflow} = JH.finalizeCreation({
    name:c.name, gender:c.gender, age:c.age, appearance:c.appearance,
    background:c.background, allocation:c.allocation, talents:c.talents,
  });
  if(overflow.length){
    JH.log(state,'sys','出身修正使以下属性封顶 20：'+overflow.join('、')+'。');
  }
  JH.log(state,'sys','你踏入江湖，前路未卜。');
  // 随机开局剧本
  const opening = JH.pick(JH.OPENING_SCENES);
  state.flags.opening = opening.id;
  JH.log(state,'sys','【开局】'+opening.text);
  App.creation=null;
  App.render();
  // 在主界面之上展示开局事件
  el('stage').innerHTML = App.renderMain() + panel('江湖初临', row('<span class="gold">开局 · '+opening.name+'</span>','gold')+div()+row(opening.text,'pink')+div()+row('<span class="muted small">在下方输入你的行动，或选择主界面行动。</span>','muted')+cmdLine());
  App.bindStage();
  App.toast('创角完成，江湖路始。');
};

/* ============ 快捷栏 ============ */
App.buildQuickBar = function(){
  const cmds = ['面板','背包','地图','任务','对话','好感','存档','帮助'];
  el('quickBar').innerHTML = cmds.map(c=>`<button data-q="${c}">${c}</button>`).join('');
  el('quickBar').querySelectorAll('button').forEach(b=>{
    b.addEventListener('click', ()=>App.handleCommand(b.dataset.q));
  });
};

/* ============ 启动 ============ */
App.init = function(){
  App.buildQuickBar();
  // 输入
  el('sendBtn').addEventListener('click', ()=>App.handleCommand(el('cmdInput').value));
  el('cmdInput').addEventListener('keydown', e=>{ if(e.key==='Enter'){ App.handleCommand(el('cmdInput').value); el('cmdInput').value=''; }});
  App.handleCommand; // noop
  // 尝试读自动存档
  const auto = JH.loadAuto();
  if(auto && auto.created){ JH.state = auto; }
  App.render();
};

document.addEventListener('DOMContentLoaded', App.init);
window.JHApp = App;
console.log('[JH] app loaded');
})();
