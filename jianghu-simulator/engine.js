/* ============================================================
 * 江湖模拟器 · 核心引擎  engine.js
 * 状态 / 创角校验 / 时辰 / 境界 / 属性成长 / 存档 / 结算
 * ============================================================ */
var JH = window.JH = window.JH || {};

/* ============ 全局状态 ============ */
JH.state = null;
JH.SAVE_KEY = 'jianghu_sim_save_v1';
JH.AUTO_KEY = 'jianghu_sim_autosave_v1';

/* ---------- 新建空状态 ---------- */
JH.newState = function(){
  return {
    created:false,
    turn:0,
    time:{year:'景和三年',monthIdx:0,day:1,shichenIdx:5}, // 正月初一 巳时开局
    weather:'晴',
    player:{
      name:'',gender:'男',age:18,appearance:'',
      background:null,
      stats:{根骨:0,悟性:0,身法:0,臂力:0,魅力:0,气运:0},
      talents:[],
      realm:'不入流',
      sect:'无',sectRole:'散人',
      office:'白身',
      neili:0,neiliMax:20,
      tili:100,tiliMax:100,
      qixue:100,qixueMax:100,
      baoshi:80,fatigue:0,
      shangshi:null,zhongdu:null,
      silver:0,shengwang:0,shane:0,
      inventory:[],
      wuxue:[],
      location:'泉州',
      createdWuxue:[],
    },
    affinities:{},
    relations:{},
    knownNpcs:[],          // 已认识的 NPC
    flags:{},
    mainQuest:JH.MAIN_QUESTS[0],
    pendingEvent:null,     // 待玩家选择的事件
    combat:null,
    log:[],
    createdAt:Date.now(),
  };
};

/* ============ 创角校验 ============ */
// 分配值 -> 修正后最终值（封顶20，下限1）
JH.resolveStats = function(allocation, mods){
  const out={};
  let overflow=[];
  for(let k of JH.STAT_KEYS){
    let base = Math.max(1, Math.min(20, allocation[k]||0));
    let mod = (mods && mods[k]) || 0;
    let final = base + mod;
    if(final>20){ overflow.push(k); final=20; }
    if(final<1) final=1;
    out[k]=final;
  }
  return {stats:out, overflow};
};

JH.totalAllocated = function(allocation){
  return JH.STAT_KEYS.reduce((s,k)=>s+(allocation[k]||0),0);
};

/* 完成创角：写入状态 */
JH.finalizeCreation = function(charData){
  const s = JH.newState();
  const bg = JH.BACKGROUNDS.find(b=>b.key===charData.background);
  const {stats,overflow} = JH.resolveStats(charData.allocation, bg.mods||{});

  s.player.name = charData.name || '无名客';
  s.player.gender = charData.gender || '男';
  s.player.age = charData.age || 18;
  s.player.appearance = charData.appearance || '';
  s.player.background = bg;
  s.player.stats = stats;
  s.player.talents = charData.talents || [];

  // 出身加成
  s.player.silver = bg.silver || 0;
  s.player.shengwang = bg.shengwang || 0;
  s.player.tiliMax = 100 + (bg.tiliMaxBonus||0);
  s.player.tili = s.player.tiliMax;
  s.player.qixueMax = 100;
  s.player.qixue = s.player.qixueMax;
  s.player.neiliMax = 20 + (bg.mods&&bg.mods.内力? bg.mods.内力:0);
  s.player.neili = s.player.neiliMax;
  s.player.location = bg.startLoc || bg.start || '泉州';

  // 天赋修正
  for(let tname of s.player.talents){
    const t = JH.TALENTS.find(x=>x.key===tname);
    if(t && t.mod){
      for(let k in t.mod){ s.player.stats[k] = Math.max(1, s.player.stats[k] + t.mod[k]); }
    }
  }

  // 初始物品
  s.player.inventory = JSON.parse(JSON.stringify(JH.BASE_ITEMS));
  if(bg.items) bg.items.forEach(it=>s.player.inventory.push(JSON.parse(JSON.stringify(it))));
  // 银两按出身，部分出身自带路引已在items中

  // 初始武学
  if(bg.wuxue) bg.wuxue.forEach(w=>s.player.wuxue.push({...w,level:'入门'}));

  s.created = true;
  s.turn = 1;
  // 主线提示
  s.mainQuest = JH.MAIN_QUESTS[0];
  JH.state = s;
  return {state:s, overflow};
};

/* ============ 时辰 / 时间 ============ */
JH.timeStr = function(s){
  if(!s) return '';
  const m = JH.MONTHS[s.time.monthIdx];
  return `大昭${s.time.year} · ${m.name}${s.time.day}日 · ${JH.SHICHEN_NAME[s.time.shichenIdx]}`;
};
JH.fullTimeStr = function(s){
  if(!s) return '';
  const m = JH.MONTHS[s.time.monthIdx];
  return `${s.time.year} · ${m.season} · ${m.name}${s.time.day}日 · ${JH.SHICHEN_NAME[s.time.shichenIdx]}`;
};
JH.dateKey = function(s){
  return (s.time.monthIdx+1)+'-'+s.time.day;
};
JH.shichenName = function(s){ return JH.SHICHEN_NAME[s.time.shichenIdx]; };

// 推进一个时辰
JH.advanceTime = function(s, hours=1){
  for(let i=0;i<hours;i++){
    s.time.shichenIdx++;
    if(s.time.shichenIdx>=12){
      s.time.shichenIdx=0;
      s.time.day++;
      if(s.time.day>30){
        s.time.day=1; s.time.monthIdx++;
        if(s.time.monthIdx>=12) s.time.monthIdx=0;
        // 换月刷新天气
        s.weather = JH.weatherFor(JH.MONTHS[s.time.monthIdx].season);
      }
    }
  }
};

/* 回合推进：每行动消耗 1 时辰，推进 1 个事件节点 */
JH.nextTurn = function(s){
  s.turn++;
  JH.advanceTime(s,1);
  // 饱食/疲劳结算
  s.player.baoshi = Math.max(0, s.player.baoshi-3);
  if(s.player.baoshi<=0){ s.player.tili = Math.max(0, s.player.tili-5); }
  // 体力缓慢恢复
  if(s.player.baoshi>40){ s.player.tili = Math.min(s.player.tiliMax, s.player.tili+2); }
  // 内力缓慢恢复
  s.player.neili = Math.min(s.player.neiliMax, s.player.neili + Math.ceil(s.player.neiliMax*0.1));
  // 伤势恢复
  if(s.player.shangshi){
    if(JH.dice(100)<=40){ s.player.shangshi=null; JH.log(s,'good','伤势渐愈。'); }
  }
};

/* ============ 属性熟练度成长 ============ */
JH.growStat = function(s, key, amount){
  if(!s.player._prof) s.player._prof = {};
  s.player._prof[key] = (s.player._prof[key]||0) + amount;
  const cur = s.player.stats[key];
  // 三流前上限20，宗师前25
  const cap = (s.player.realm==='宗师'||s.player.realm==='大宗师')?25:20;
  if(cur>=cap) return false;
  if(s.player._prof[key]>=100){
    s.player._prof[key]-=100;
    s.player.stats[key]++;
    JH.log(s,'good',`${key} 提升至 ${s.player.stats[key]}！`);
    return true;
  }
  return false;
};

/* ============ 境界判定 ============ */
JH.realmIndex = function(name){ return JH.REALMS.findIndex(r=>r.name===name); };
JH.tryBreakthrough = function(s){
  const idx = JH.realmIndex(s.player.realm);
  if(idx>=JH.REALMS.length-1) return {ok:false,msg:'已达武圣之境，无更高境界可证。'};
  const next = JH.REALMS[idx+1];
  if(s.player.neiliMax < next.neili){
    return {ok:false,msg:`内力上限不足（需 ${next.neili}，当前 ${s.player.neiliMax}）。需打坐运功积累内力。`};
  }
  // 悟性判定 + 气运
  const wuxing = s.player.stats['悟性'];
  const qiyun = s.player.stats['气运'];
  const roll = JH.dice(100);
  const success = roll + wuxing + qiyun/2 > 100;
  if(success){
    s.player.realm = next.name;
    s.player.neiliMax = Math.round(s.player.neiliMax*1.3);
    s.player.neili = s.player.neiliMax;
    s.player.qixueMax += 20; s.player.qixue = s.player.qixueMax;
    JH.log(s,'good',`突破成功！迈入「${next.name}」之境，内力上限大增。`);
    return {ok:true,msg:`突破成功！迈入「${next.name}」之境。`};
  } else {
    s.player.neili = Math.floor(s.player.neili*0.5);
    s.player.shangshi = '内伤';
    JH.log(s,'bad',`突破失败！走火入魔，内力大损，身受内伤。`);
    return {ok:false,msg:'突破失败，走火入魔，需调养数日。'};
  }
};

/* 打坐运功：涨内力上限熟练度、内力回满 */
JH.meditate = function(s){
  JH.nextTurn(s);
  const gain = 5 + Math.floor(s.player.stats['根骨']/3);
  s.player.neili = Math.min(s.player.neiliMax, s.player.neili + gain*2);
  JH.growStat(s,'根骨',15);
  JH.growStat(s,'悟性',8);
  // 内力上限成长
  if(JH.dice(100) + s.player.stats['根骨'] > 90 && s.player.neiliMax < JH.REALMS[Math.min(JH.realmIndex(s.player.realm)+1,JH.REALMS.length-1)].neili){
    s.player.neiliMax += 5;
    JH.log(s,'good',`打坐有所悟，内力上限 +5（${s.player.neiliMax}）。`);
  }
  JH.log(s,'sys',`打坐一炷香，内力恢复，根骨略有精进。`);
  return '打坐完毕，神清气爽。';
};

/* 修炼武学 */
JH.practiceWuxue = function(s, wname){
  const w = s.player.wuxue.find(x=>x.name===wname);
  if(!w) return {ok:false,msg:'你尚未习得此武学。'};
  JH.nextTurn(s);
  const levels=['入门','小成','大成','圆满'];
  const idx = levels.indexOf(w.level);
  if(idx>=3) return {ok:false,msg:`${wname} 已至圆满，可尝试融会贯通（需宗师境界）。`};
  const roll = JH.dice(100) + s.player.stats['悟性'] + s.player.stats[w.type==='内功'?'根骨':'臂力']/2;
  // 剑心通明加成
  let bonus = 0;
  if(s.player.talents.includes('剑心通明') && w.type==='外功' && w.name.includes('剑')) bonus=20;
  if(roll + bonus > 100){
    w.level = levels[idx+1];
    JH.growStat(s, w.type==='内功'?'根骨':'臂力', 25);
    if(w.type==='轻功') JH.growStat(s,'身法',25);
    JH.growStat(s,'悟性',10);
    JH.log(s,'good',`${wname} 修至「${w.level}」！`);
    return {ok:true,msg:`${wname} 精进至「${w.level}」。`};
  }
  JH.growStat(s, w.type==='内功'?'根骨':'臂力', 12);
  JH.growStat(s,'悟性',5);
  JH.log(s,'sys',`修炼一晌，${wname} 略有所得，尚未突破。`);
  return {ok:false,msg:`修炼${wname}，略有精进。`};
};

/* ============ 银两 / 背包 ============ */
JH.addItem = function(s, item){ s.player.inventory.push(item); };
JH.removeItem = function(s, name){
  const i = s.player.inventory.findIndex(x=>x.name===name);
  if(i>=0){ s.player.inventory.splice(i,1); return true; }
  return false;
};
JH.hasItem = function(s, name){ return s.player.inventory.some(x=>x.name===name); };
JH.addSilver = function(s, n){ s.player.silver += n; };
JH.spendSilver = function(s, n){
  if(s.player.silver < n) return false;
  s.player.silver -= n; return true;
};
// 银两换算（文/两）
JH.fmtSilver = function(n){
  if(n>=1000) return (n/1000).toFixed(1).replace(/\.0$/,'')+'贯';
  return n+'两';
};

/* ============ 好感 ============ */
JH.getAff = function(s, npcKey){ return s.affinities[npcKey] || 0; };
JH.addAff = function(s, npcKey, delta, reason){
  // 心有灵犀天赋加成
  if(s.player.talents.includes('心有灵犀') && delta>0) delta = Math.round(delta*1.2);
  const old = s.affinities[npcKey] || 0;
  const newV = Math.max(0, Math.min(120, old + delta));
  s.affinities[npcKey] = newV;
  // 关系阶段变化
  const oldStage = JH.affStage(old);
  const newStage = JH.affStage(newV);
  if(oldStage !== newStage && newV>old){
    JH.log(s,'good',`与 ${npcKey} 关系升至「${newStage}」！`);
  }
  return {old,newV};
};
JH.know = function(s, npcKey){
  if(!s.knownNpcs.includes(npcKey)){
    s.knownNpcs.push(npcKey);
    s.affinities[npcKey] = s.affinities[npcKey] || Math.max(0, s.player.stats['魅力']-5);
  }
};

/* 送礼判定 */
JH.gift = function(s, npcKey, itemName){
  const npc = JH.npcByKey(npcKey);
  if(!npc) return {ok:false,msg:'查无此人。'};
  if(!s.knownNpcs.includes(npcKey)) return {ok:false,msg:`你尚未结识 ${npcKey}。`};
  if(!JH.hasItem(s,itemName)) return {ok:false,msg:`背包中没有「${itemName}」。`};
  JH.removeItem(s,itemName);
  // 判定喜好
  const likes = (npc.likes||'').split('/');
  const dislikes = (npc.dislikes||'').split('/');
  let delta=2, resp='收下，点头致意。';
  if(likes.some(l=>itemName.includes(l.trim()))){
    delta = JH.dice(6)+5; // 6~11
    resp = `${npcKey} 眼中一亮：「这正是我喜好的。」好感 +${delta}。`;
  } else if(dislikes.some(l=>itemName.includes(l.trim()))){
    delta = -(JH.dice(4)+1);
    resp = `${npcKey} 皱眉，不太欢喜。好感 ${delta}。`;
  } else if(['神兵','孤本','奇药','续命丹','古剑','神秘信物','前朝玉佩'].includes(itemName)){
    delta = JH.dice(10)+10;
    resp = `${npcKey} 惊叹此物珍贵，郑重收下。好感 +${delta}！可能触发专属事件。`;
  } else {
    resp = `${npcKey} 收下「${itemName}」，好感 +${delta}。`;
  }
  const r = JH.addAff(s, npcKey, delta);
  JH.log(s, delta>0?'good':'bad', resp);
  return {ok:true,msg:resp, delta};
};

/* ============ 对话 (结交/闲谈) ============ */
JH.talk = function(s, npcKey){
  const npc = JH.npcByKey(npcKey);
  if(!npc) return {ok:false,msg:'查无此人。'};
  JH.know(s,npcKey);
  JH.nextTurn(s);
  // 魅力判定加好感
  const roll = JH.dice(100) + s.player.stats['魅力'];
  let delta = 1, line = npc.stageIntro;
  if(roll>90){ delta = 4; line = `${npcKey} 与你相谈甚欢，引为可交之人。`; }
  else if(roll<30){ delta = 0; line = `${npcKey} 兴致寥寥，话不投机。`; }
  else { delta = 2; line = `与 ${npcKey} 闲聊几句，略增熟络。`; }
  JH.addAff(s, npcKey, delta);
  JH.growStat(s,'魅力',10);
  return {ok:true,msg:line, delta, npc};
};

/* ============ 存档 ============ */
JH.save = function(s, slot){
  slot = slot || (JH.listSaves().length+1);
  const data = JSON.parse(JSON.stringify(s));
  data.savedAt = Date.now();
  const list = JH.listSaves();
  list[slot] = data;
  localStorage.setItem(JH.SAVE_KEY, JSON.stringify(list));
  return slot;
};
JH.autoSave = function(s){
  localStorage.setItem(JH.AUTO_KEY, JSON.stringify(s));
};
JH.loadAuto = function(){
  const raw = localStorage.getItem(JH.AUTO_KEY);
  if(!raw) return null;
  return JSON.parse(raw);
};
JH.listSaves = function(){
  try{ return JSON.parse(localStorage.getItem(JH.SAVE_KEY)) || {}; }catch(e){ return {}; }
};
JH.load = function(slot){
  const list = JH.listSaves();
  if(!list[slot]) return null;
  JH.state = JSON.parse(JSON.stringify(list[slot]));
  return JH.state;
};
JH.hasSave = function(){ return Object.keys(JH.listSaves()).length>0 || !!localStorage.getItem(JH.AUTO_KEY); };

/* ============ 日志 ============ */
JH.log = function(s, type, msg){
  s.log = s.log || [];
  s.log.unshift({type: type||'sys', msg, t: Date.now()});
  if(s.log.length>40) s.log.pop();
};

/* ============ 善恶/声望 ============ */
JH.addShane = function(s, n){ s.player.shane = Math.max(-100, Math.min(100, s.player.shane+n)); };
JH.addShengwang = function(s, n){ s.player.shengwang = Math.max(0, s.player.shengwang+n); };
JH.shaneLabel = function(s){
  const v = s.player.shane;
  if(v>=30) return '正义';
  if(v<=-30) return '邪恶';
  return '中立';
};

/* ============ 战斗初始化 (供 app/战斗模块调用) ============ */
JH.startCombat = function(s, enemy){
  s.combat = {
    enemy: enemy, // {name, hp, hpMax, atk, def, realm, desc}
    round: 1,
    log:[],
    over:false,
  };
  JH.log(s,'sys',`战斗开始：${enemy.name}（${enemy.realm}）。`);
};

/* 玩家攻击力 */
JH.playerAtk = function(s){
  let base = s.player.stats['臂力'] + Math.floor(s.player.neili/10);
  // 取最强外功
  let best = 0;
  s.player.wuxue.forEach(w=>{
    if(w.type==='外功' || w.type==='内功'){
      const lvlMul = {入门:0.6,小成:0.8,大成:1.0,圆满:1.3}[w.level]||0.6;
      best = Math.max(best, (w.power||0)*lvlMul);
    }
  });
  return base + best;
};
JH.playerDef = function(s){
  let base = s.player.stats['根骨'] + Math.floor(s.player.neili/15);
  s.player.wuxue.forEach(w=>{
    if(w.type==='内功'){ base += (w.power||0)*0.3*({入门:0.6,小成:0.8,大成:1.0,圆满:1.3}[w.level]||0.6); }
  });
  return base;
};

console.log('[JH] engine loaded');
