const $=s=>document.querySelector(s),SU=["m","p","s"],HO=["E","S","W","N","P","F","C"],NM={m:"萬",p:"筒",s:"索",E:"東",S:"南",W:"西",N:"北",P:"白",F:"發",C:"中"};
const KANJI_NUM=["","一","二","三","四","五","六","七","八","九"];

function pinLayout(n){
  const layouts={
    1:[[50,50]],
    2:[[32,32],[68,68]],
    3:[[30,30],[50,50],[70,70]],
    4:[[30,30],[70,30],[30,70],[70,70]],
    5:[[28,28],[72,28],[50,50],[28,72],[72,72]],
    6:[[30,24],[70,24],[30,50],[70,50],[30,76],[70,76]],
    7:[[28,22],[72,22],[50,38],[28,55],[72,55],[28,78],[72,78]],
    8:[[28,20],[72,20],[28,40],[72,40],[28,60],[72,60],[28,80],[72,80]],
    9:[[25,22],[50,22],[75,22],[25,50],[50,50],[75,50],[25,78],[50,78],[75,78]]
  };
  return layouts[n];
}
function souLayout(n){
  const layouts={
    1:[[50,50]],
    2:[[38,34],[62,66]],
    3:[[50,24],[35,62],[65,62]],
    4:[[35,30],[65,30],[35,70],[65,70]],
    5:[[35,26],[65,26],[50,50],[35,74],[65,74]],
    6:[[35,22],[65,22],[35,50],[65,50],[35,78],[65,78]],
    7:[[50,18],[35,38],[65,38],[35,60],[65,60],[35,82],[65,82]],
    8:[[35,18],[65,18],[35,40],[65,40],[35,62],[65,62],[35,84],[65,84]],
    9:[[30,18],[50,18],[70,18],[30,50],[50,50],[70,50],[30,82],[50,82],[70,82]]
  };
  return layouts[n];
}

function pinRedIndices(n){
  const map={
    1:[0],
    2:[],
    3:[1],
    4:[],
    5:[2],
    6:[4,5],
    7:[4,5,6],
    8:[4,5,6,7],
    9:[3,4,5]
  };
  return map[n]||[];
}
function pinDotSVG(x,y,r,isRed){
  const stroke="#202020";
  const fill=isRed?"#d94b55":"#f3f3f3";
  const core=isRed?"#f1d2d8":"#8a8a8a";
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="5"/>
          <circle cx="${x}" cy="${y}" r="${Math.max(3,r-6)}" fill="${core}" stroke="${stroke}" stroke-width="1.5"/>`;
}
function pinCircle(x,y,isRed=false,r=13){
  const base=isRed?"#d65560":"#f5f5f5";
  const mid=isRed?"#f0d3d7":"#d8d8d8";
  const core=isRed?"#cb3946":"#7c7c7c";
  const deco=isRed?"#f7eef0":"#ededed";
  return `<g>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${base}" stroke="#1b1b1b" stroke-width="4"/>
    <circle cx="${x}" cy="${y}" r="${r-4}" fill="${mid}" stroke="#1b1b1b" stroke-width="1.5"/>
    <circle cx="${x}" cy="${y}" r="${r-8}" fill="${core}" stroke="#1b1b1b" stroke-width="1.2"/>
    <circle cx="${x}" cy="${y-4}" r="1.8" fill="${deco}"/>
    <circle cx="${x+4}" cy="${y}" r="1.8" fill="${deco}"/>
    <circle cx="${x}" cy="${y+4}" r="1.8" fill="${deco}"/>
    <circle cx="${x-4}" cy="${y}" r="1.8" fill="${deco}"/>
  </g>`;
}
function pinOne(){
  return `<svg viewBox="0 0 100 120" aria-hidden="true">
    <circle cx="50" cy="60" r="28" fill="#f4f4f4" stroke="#1b1b1b" stroke-width="5"/>
    <circle cx="50" cy="60" r="22" fill="#df7078" stroke="#1b1b1b" stroke-width="1.5"/>
    <circle cx="50" cy="60" r="16" fill="#f7e8ea" stroke="#1b1b1b" stroke-width="1.2"/>
    <circle cx="50" cy="60" r="10" fill="#c94450" stroke="#1b1b1b" stroke-width="1"/>
    <circle cx="50" cy="46" r="2.1" fill="#f8f8f8"/><circle cx="60" cy="50" r="2.1" fill="#f8f8f8"/><circle cx="64" cy="60" r="2.1" fill="#f8f8f8"/><circle cx="60" cy="70" r="2.1" fill="#f8f8f8"/><circle cx="50" cy="74" r="2.1" fill="#f8f8f8"/><circle cx="40" cy="70" r="2.1" fill="#f8f8f8"/><circle cx="36" cy="60" r="2.1" fill="#f8f8f8"/><circle cx="40" cy="50" r="2.1" fill="#f8f8f8"/>
  </svg>`;
}
function pinTwo(){ return `<svg viewBox="0 0 100 120" aria-hidden="true">${pinCircle(50,35,false)}${pinCircle(50,85,false)}</svg>`; }
function pinThree(){ return `<svg viewBox="0 0 100 120" aria-hidden="true">${pinCircle(30,34,false)}${pinCircle(50,60,true)}${pinCircle(70,86,false)}</svg>`; }
function pinFour(){ return `<svg viewBox="0 0 100 120" aria-hidden="true">${pinCircle(32,35,false)}${pinCircle(68,35,false)}${pinCircle(32,85,false)}${pinCircle(68,85,false)}</svg>`; }
function pinFive(){ return `<svg viewBox="0 0 100 120" aria-hidden="true">${pinCircle(32,35,false)}${pinCircle(68,35,false)}${pinCircle(50,60,true)}${pinCircle(32,85,false)}${pinCircle(68,85,false)}</svg>`; }
function pinSix(){ return `<svg viewBox="0 0 100 120" aria-hidden="true">${pinCircle(32,28,false)}${pinCircle(68,28,false)}${pinCircle(32,72,true)}${pinCircle(68,72,true)}${pinCircle(32,96,true)}${pinCircle(68,96,true)}</svg>`; }
function pinSeven(){ return `<svg viewBox="0 0 100 120" aria-hidden="true">${pinCircle(26,22,false)}${pinCircle(40,40,false)}${pinCircle(54,58,false)}${pinCircle(34,84,true)}${pinCircle(54,84,true)}${pinCircle(34,102,true)}${pinCircle(54,102,true)}</svg>`; }
function pinEight(){ return `<svg viewBox="0 0 100 120" aria-hidden="true">${pinCircle(32,18,false)}${pinCircle(68,18,false)}${pinCircle(32,42,false)}${pinCircle(68,42,false)}${pinCircle(32,66,false)}${pinCircle(68,66,false)}${pinCircle(32,90,false)}${pinCircle(68,90,false)}</svg>`; }
function pinNine(){ return `<svg viewBox="0 0 100 120" aria-hidden="true">${pinCircle(24,22,false)}${pinCircle(50,22,false)}${pinCircle(76,22,false)}${pinCircle(24,60,true)}${pinCircle(50,60,true)}${pinCircle(76,60,true)}${pinCircle(24,98,false)}${pinCircle(50,98,false)}${pinCircle(76,98,false)}</svg>`; }
function bambooSVG(x,y,color="#1f1f1f", inner="#dfeedd"){
  return `<rect x="${x-7}" y="${y-16}" width="14" height="32" rx="6" fill="${inner}" stroke="${color}" stroke-width="4"/>
          <line x1="${x}" y1="${y-12}" x2="${x}" y2="${y+12}" stroke="${color}" stroke-width="2"/>
          <line x1="${x-5}" y1="${y}" x2="${x+5}" y2="${y}" stroke="${color}" stroke-width="2"/>`;
}
function bambooPairSVG(x,y,color="#202020", inner="#e0f1e4"){
  return `${bambooSVG(x-8,y,color,inner)}${bambooSVG(x+8,y,color,inner)}`;
}
function souSingle(x,y,color="#202020", inner="#e0f1e4"){
  return bambooSVG(x,y,color,inner);
}
function souTwoVertical(){
  return `<svg viewBox="0 0 100 120" aria-hidden="true">
    ${souSingle(50,34)}
    ${souSingle(50,86)}
  </svg>`;
}
function souThree(){
  return `<svg viewBox="0 0 100 120" aria-hidden="true">
    ${souSingle(36,34)}
    ${souSingle(36,86)}
    ${souSingle(66,60)}
  </svg>`;
}
function souFour(){
  return `<svg viewBox="0 0 100 120" aria-hidden="true">
    ${souSingle(35,34)}
    ${souSingle(65,34)}
    ${souSingle(35,86)}
    ${souSingle(65,86)}
  </svg>`;
}
function souFive(){
  return `<svg viewBox="0 0 100 120" aria-hidden="true">
    ${souSingle(35,34)}
    ${souSingle(65,34)}
    ${souSingle(50,60,"#c8444b","#f4d7d8")}
    ${souSingle(35,86)}
    ${souSingle(65,86)}
  </svg>`;
}
function souSix(){
  return `<svg viewBox="0 0 100 120" aria-hidden="true">
    ${souSingle(34,24)}
    ${souSingle(66,24)}
    ${souSingle(34,60)}
    ${souSingle(66,60)}
    ${souSingle(34,96)}
    ${souSingle(66,96)}
  </svg>`;
}
function souSeven(){
  return `<svg viewBox="0 0 100 120" aria-hidden="true">
    ${souSingle(50,18,"#c8444b","#f4d7d8")}
    ${souSingle(34,46)}
    ${souSingle(66,46)}
    ${souSingle(34,72)}
    ${souSingle(66,72)}
    ${souSingle(34,98)}
    ${souSingle(66,98)}
  </svg>`;
}
function souEight(){
  return `<svg viewBox="0 0 100 120" aria-hidden="true">
    ${bambooPairSVG(34,36)}
    ${bambooPairSVG(66,36)}
    ${bambooPairSVG(34,86)}
    ${bambooPairSVG(66,86)}
  </svg>`;
}
function souNine(){
  return `<svg viewBox="0 0 100 120" aria-hidden="true">
    ${souSingle(26,22)}
    ${souSingle(50,22,"#c8444b","#f4d7d8")}
    ${souSingle(74,22)}
    ${souSingle(26,60)}
    ${souSingle(50,60,"#c8444b","#f4d7d8")}
    ${souSingle(74,60)}
    ${souSingle(26,98)}
    ${souSingle(50,98,"#c8444b","#f4d7d8")}
    ${souSingle(74,98)}
  </svg>`;
}
function tileFaceMarkup(t){
  if(t.length===2){
    const n=+t[0], s=t[1];
    if(s==="m"){
      return `<img class="tile-art" src="assets/manzu/${n}m.jpg" alt="${n}萬" draggable="false">`;
    }
    if(s==="p"){
      return `<img class="tile-art" src="assets/pinzu/${n}p.jpg" alt="${n}筒" draggable="false">`;
    }
    if(s==="s"){
      return `<img class="tile-art" src="assets/souzu/${n}s.jpg" alt="${n}索" draggable="false">`;
    }
  }
  if(["E","S","W","N","P","F","C"].includes(t)){
    return `<img class="tile-art" src="assets/honors/${t}.jpg" alt="${tt(t)}" draggable="false">`;
  }
  return "";
}
function tileHTML(t, mini=false){
  return `<span class="${mini?"mini-tile":"tile-visual"}" aria-label="${tt(t)}">${tileFaceMarkup(t)}</span>`;
}

// ===== BGM / 効果音（実音源ファイル方式） =====
let SOUND={
  enabled:localStorage.getItem("17po_bgm")!=="off",
  buildBgm:null,
  playBgm:null,
  active:null,
  phase:"build",
  normalVolume:.24,
  duckVolume:.10,
  ducked:false,
  fadeFrame:null,
  fadeDuration:3000,
  playPrimed:false,
  pendingResume:false,
  sfx:{}
};

function initAudio(){
  SOUND.buildBgm=$("#buildBgmAudio");
  SOUND.playBgm=$("#playBgmAudio");

  for(const a of [SOUND.buildBgm,SOUND.playBgm]){
    if(!a)continue;
    a.loop=true;
    a.preload="auto";
    a.playsInline=true;
  }

  if(SOUND.buildBgm)SOUND.buildBgm.volume=SOUND.normalVolume;
  if(SOUND.playBgm)SOUND.playBgm.volume=0;
  SOUND.active=SOUND.buildBgm;

  SOUND.sfx={
    select:new Audio("assets/audio/select.wav"),
    deselect:new Audio("assets/audio/deselect.wav"),
    confirm:new Audio("assets/audio/confirm.wav"),
    discard:new Audio("assets/audio/discard.wav"),
    ron:new Audio("assets/audio/ron.wav")
  };

  Object.values(SOUND.sfx).forEach(a=>{
    a.preload="auto";
    a.volume=.72;
  });

  // 自動開始がブロックされた場合、次の操作で自動復帰する。
  document.addEventListener("pointerdown",resumePendingBgm,{capture:true});
  document.addEventListener("keydown",resumePendingBgm,{capture:true});

  updateBgmButton()
}

function cancelBgmFade(){
  if(SOUND.fadeFrame!==null){
    cancelAnimationFrame(SOUND.fadeFrame);
    SOUND.fadeFrame=null
  }
}

function currentBgmTargetVolume(){
  return SOUND.ducked?SOUND.duckVolume:SOUND.normalVolume
}

function activeBgm(){
  return SOUND.phase==="play"?SOUND.playBgm:SOUND.buildBgm
}

function pauseInactiveBgm(){
  const inactive=SOUND.phase==="play"?SOUND.buildBgm:SOUND.playBgm;
  if(inactive&&!inactive.paused)inactive.pause()
}

function markPlayFailure(){
  SOUND.pendingResume=true
}

function markPlaySuccess(){
  SOUND.pendingResume=false
}

function safePlay(audio){
  if(!audio)return Promise.resolve(false);

  try{
    const p=audio.play();
    if(p&&typeof p.then==="function"){
      return p.then(()=>{
        markPlaySuccess();
        return true
      }).catch(()=>{
        markPlayFailure();
        return false
      })
    }

    markPlaySuccess();
    return Promise.resolve(true)
  }catch(e){
    markPlayFailure();
    return Promise.resolve(false)
  }
}

function fadeInBgm(duration=SOUND.fadeDuration){
  const audio=activeBgm();
  if(!audio||!SOUND.enabled)return;

  cancelBgmFade();
  audio.volume=0;

  const started=performance.now();

  const step=now=>{
    if(!SOUND.enabled||audio!==activeBgm()){
      cancelBgmFade();
      return
    }

    const progress=Math.min(1,(now-started)/duration);
    const eased=1-Math.pow(1-progress,3);
    audio.volume=currentBgmTargetVolume()*eased;

    if(progress<1){
      SOUND.fadeFrame=requestAnimationFrame(step)
    }else{
      SOUND.fadeFrame=null;
      audio.volume=currentBgmTargetVolume()
    }
  };

  SOUND.fadeFrame=requestAnimationFrame(step)
}

function primePlayBgmFromGesture(){
  if(SOUND.playPrimed||!SOUND.playBgm)return;

  const a=SOUND.playBgm;
  const oldVolume=a.volume;
  a.volume=0;

  try{a.currentTime=0}catch(e){}

  try{
    const p=a.play();

    if(p&&typeof p.then==="function"){
      p.then(()=>{
        a.pause();
        try{a.currentTime=0}catch(e){}
        a.volume=oldVolume;
        SOUND.playPrimed=true
      }).catch(()=>{
        a.volume=oldVolume
      })
    }else{
      a.pause();
      try{a.currentTime=0}catch(e){}
      a.volume=oldVolume;
      SOUND.playPrimed=true
    }
  }catch(e){
    a.volume=oldVolume
  }
}

function unlockAudioFromGesture(){
  // 最初の「開始」操作で対局用BGMも一度だけ無音再生しておく。
  // これによりタイムアウト開始でもブラウザの自動再生制限に掛かりにくくなる。
  primePlayBgmFromGesture()
}

function setBgmPhase(phase){
  SOUND.phase=phase==="play"?"play":"build";
  SOUND.ducked=false;
  cancelBgmFade();

  const audio=activeBgm();
  SOUND.active=audio;
  pauseInactiveBgm();

  if(!audio){
    updateBgmButton();
    return
  }

  if(SOUND.phase==="play"){
    try{audio.currentTime=0}catch(e){}
    audio.volume=0
  }else{
    audio.volume=currentBgmTargetVolume()
  }

  if(!SOUND.enabled){
    updateBgmButton();
    return
  }

  safePlay(audio).then(ok=>{
    if(!ok)return;
    if(SOUND.phase==="play")fadeInBgm();
    else audio.volume=currentBgmTargetVolume()
  });

  updateBgmButton()
}

function startBgm(){
  const audio=activeBgm();

  if(!SOUND.enabled||!audio){
    updateBgmButton();
    return
  }

  cancelBgmFade();

  if(SOUND.phase==="play")audio.volume=0;
  else audio.volume=currentBgmTargetVolume();

  safePlay(audio).then(ok=>{
    if(ok&&SOUND.phase==="play")fadeInBgm()
  });

  updateBgmButton()
}

function pauseBgm(){
  cancelBgmFade();
  for(const a of [SOUND.buildBgm,SOUND.playBgm]){
    if(a&&!a.paused)a.pause()
  }
}

function resumePendingBgm(){
  if(!SOUND.pendingResume||!SOUND.enabled)return;

  const audio=activeBgm();
  if(!audio)return;

  safePlay(audio).then(ok=>{
    if(ok&&SOUND.phase==="play"&&audio.volume===0)fadeInBgm()
  })
}

function setBgmDuck(duck){
  SOUND.ducked=!!duck;
  const audio=activeBgm();
  if(!audio)return;

  if(SOUND.fadeFrame===null){
    audio.volume=currentBgmTargetVolume()
  }
}

function toggleBgm(){
  SOUND.enabled=!SOUND.enabled;
  localStorage.setItem("17po_bgm",SOUND.enabled?"on":"off");

  if(SOUND.enabled){
    unlockAudioFromGesture();
    startBgm()
  }else{
    pauseBgm()
  }

  updateBgmButton()
}

function updateBgmButton(){
  const b=$("#bgmToggle");
  if(!b)return;
  b.textContent=SOUND.enabled?"♪ BGM ON":"♪ BGM OFF";
  b.classList.toggle("off",!SOUND.enabled)
}

function playSfx(name,volume=1){
  const src=SOUND.sfx[name];
  if(!src)return;

  try{
    const a=src.cloneNode();
    a.volume=Math.max(0,Math.min(1,src.volume*volume));
    const p=a.play();
    if(p&&p.catch)p.catch(()=>{})
  }catch(e){}
}

initAudio();

let G={name:"",round:1,half:"表",dealer:0,money:[0,0],hands:[[],[]],fixed:[[],[]],cand:[[],[]],river:[[],[]],sel:[],dora:null,ura:null,turn:0,fur:[false,false],time:180,timer:null,pending:null,dice:[0,0],gameOver:false};
function deck(){let a=[];for(let s of SU)for(let n=1;n<=9;n++)for(let i=0;i<4;i++)a.push(n+s);for(let h of HO)for(let i=0;i<4;i++)a.push(h);return sh(a)}
function sh(a){for(let i=a.length-1;i;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function tt(t){return t.length==2?t[0]+NM[t[1]]:NM[t]}
function sortTiles(arr){return [...arr].sort((a,b)=>idx(a)-idx(b))}
function sortIndicesByTiles(indices, tiles){return [...indices].sort((a,b)=>idx(tiles[a])-idx(tiles[b]))}
function decideInitialDealer(){
  let a=0,b=0;
  do{a=1+Math.floor(Math.random()*6);b=1+Math.floor(Math.random()*6)}while(a===b);
  G.dice=[a,b];
  G.dealer=a<b?0:1;
}
function renderDora(id){
  const box=$(id);
  box.innerHTML=tileHTML(de(G.dora),true);
}
function de(t){if(t.length==2)return ((+t[0]==9?1:+t[0]+1)+t[1]);let i=HO.indexOf(t);if(i<4)return HO[(i+1)%4];let a=["P","F","C"];return a[(a.indexOf(t)+1)%3]}
function el(t,fn){
  let b=document.createElement("button");
  b.className="tile";
  b.setAttribute("aria-label",tt(t));
  b.innerHTML=tileFaceMarkup(t);
  if(fn)b.onclick=fn;
  return b
}
function show(id){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("on"));$(id).classList.add("on")}
$("#com").onclick=()=>show("#setup");$("#reset").onclick=()=>location.reload();$("#bgmToggle").onclick=toggleBgm;updateBgmButton();$("#start").onclick=()=>{unlockAudioFromGesture();setBgmPhase("build");G.name=$("#name").value.trim()||"プレイヤー";newRound()}

function newRound(){
  clearBuildInputArm();
  clearMouseDiscardArm();
  clearInterval(G.ronInt);
  G.pending=null;
  G.wasDraw=false;
  $("#ronBox")?.classList.add("hidden");

  let d=deck();
  G.hands=[sortTiles(d.slice(0,34)),sortTiles(d.slice(34,68))];
  let w=d.slice(68),p=Math.floor(Math.random()*34);
  G.dora=w[p];
  G.ura=w[p+34];
  G.sel=[];
  G.river=[[],[]];
  G.fur=[false,false];
  G.time=180;

  if(G.round==1&&G.half==="表"&&G.dice[0]===0)decideInitialDealer();
  build()
}
function build(){
  setBgmPhase("build");
  show("#build");
  $("#round").textContent=`${G.round}回${G.half}`;
  $("#dealer").textContent=`${G.dealer?"CPU":G.name}${G.round===1&&G.half==="表"?` 🎲${G.dice[0]}-${G.dice[1]}`:""}`;
  renderDora("#dora");
  $("#buildMoney").textContent=`${G.name} ¥${G.money[0].toLocaleString()}　CPU ¥${G.money[1].toLocaleString()}`;
  $("#buildTitle").textContent=`${G.name}の手作り`;
  renderBuild();
  clearInterval(G.timer);
  G.timer=setInterval(()=>{
    G.time--;
    timer();
    if(G.time<=0){
      clearInterval(G.timer);
      force()
    }
  },1000)
}
function timer(){let m=Math.floor(G.time/60),s=G.time%60;$("#timer").textContent=`${m}:${String(s).padStart(2,"0")}`}

let buildInputArmedKey=null;
let buildInputArmedNode=null;
let buildInputArmTimer=null;
let lastBuildTouchAt=0;
const BUILD_DOUBLE_CLICK_WINDOW=1000;

function defaultBuildInputHint(){
  const touchLike=window.matchMedia?.("(pointer: coarse)")?.matches;
  return touchLike
    ?"牌をタッチして選択 / 選択解除"
    :"牌をWクリックして選択 / 選択解除"
}

function clearBuildInputArm(){
  if(buildInputArmTimer!==null){
    clearTimeout(buildInputArmTimer);
    buildInputArmTimer=null
  }

  if(buildInputArmedNode){
    buildInputArmedNode.classList.remove("build-input-armed");
    buildInputArmedNode=null
  }

  buildInputArmedKey=null;

  const hint=$("#buildInputHint");
  if(hint)hint.textContent=defaultBuildInputHint()
}

function armBuildInput(key,node){
  if(buildInputArmTimer!==null){
    clearTimeout(buildInputArmTimer);
    buildInputArmTimer=null
  }

  if(buildInputArmedNode && buildInputArmedNode!==node){
    buildInputArmedNode.classList.remove("build-input-armed")
  }

  buildInputArmedKey=key;
  buildInputArmedNode=node;
  node.classList.add("build-input-armed");

  const hint=$("#buildInputHint");
  if(hint)hint.textContent="同じ牌をもう一度クリック";

  buildInputArmTimer=setTimeout(()=>{
    clearBuildInputArm()
  },BUILD_DOUBLE_CLICK_WINDOW)
}

function commitBuildTile(index,isSelected){
  if(!Number.isInteger(index))return;

  clearBuildInputArm();

  if(isSelected){
    if(!G.sel.includes(index))return;
    playSfx("deselect");
    G.sel=G.sel.filter(x=>x!==index);
    renderBuild();
    return
  }

  if(G.sel.includes(index) || G.sel.length>=13)return;
  playSfx("select");
  G.sel.push(index);
  renderBuild()
}

function makeBuildTile(index,isSelected){
  const t=G.hands[0][index];
  const b=el(t);
  const key=`${isSelected?"selected":"pool"}:${index}`;

  b.dataset.handIndex=String(index);
  b.dataset.buildZone=isSelected?"selected":"pool";

  const commit=()=>commitBuildTile(index,isSelected);

  // スマホ / タブレット：1回タッチで選択・選択解除。
  b.addEventListener("pointerup",e=>{
    if(e.pointerType==="touch"||e.pointerType==="pen"){
      lastBuildTouchAt=performance.now();
      e.preventDefault();
      commit()
    }
  });

  // PC：同じ牌への2回クリックで確定。
  // DOMを作り直す前に2回目まで判定するので、表→裏でも安定して動作する。
  b.addEventListener("click",e=>{
    if(performance.now()-lastBuildTouchAt<900)return;

    e.preventDefault();

    if(buildInputArmedKey===key){
      commit()
    }else{
      armBuildInput(key,b)
    }
  });

  // ブラウザが正式なdblclickを発火した場合も保険として受ける。
  b.addEventListener("dblclick",e=>{
    if(performance.now()-lastBuildTouchAt<900)return;
    e.preventDefault();
    commit()
  });

  return b
}

function renderBuild(){
  timer();

  // 選択確定後の再描画では、古いDOMに紐づく1回目クリック状態を残さない。
  if(buildInputArmedNode && !document.body.contains(buildInputArmedNode)){
    clearBuildInputArm()
  }

  $("#pool").innerHTML="";
  $("#selected").innerHTML="";

  const poolIndices=G.hands[0].map((_,i)=>i).filter(i=>!G.sel.includes(i));

  sortIndicesByTiles(poolIndices,G.hands[0]).forEach(i=>{
    $("#pool").append(makeBuildTile(i,false))
  });

  sortIndicesByTiles(G.sel,G.hands[0]).forEach(i=>{
    $("#selected").append(makeBuildTile(i,true))
  });

  const hint=$("#buildInputHint");
  if(hint&&!buildInputArmedKey)hint.textContent=defaultBuildInputHint();

  $("#count").textContent=G.sel.length;

  let w=G.sel.length==13?waits(G.sel.map(i=>G.hands[0][i])):[];
  $("#tenpai").textContent=w.length
    ?`テンパイ：${sortTiles(w).map(tt).join("・")}`
    :G.sel.length==13
      ?"ノーテン"
      :"";

  $("#confirm").disabled=!w.length;
  $("#clearSelection").disabled=G.sel.length===0
}
$("#clearSelection").onclick=()=>{
  if(!G.sel.length)return;
  clearBuildInputArm();
  playSfx("deselect");
  G.sel=[];
  renderBuild()
};
$("#confirm").onclick=()=>{clearBuildInputArm();playSfx("confirm");clearInterval(G.timer);startPlay()}
function force(){clearBuildInputArm();let r=G.hands[0].map((_,i)=>i).filter(i=>!G.sel.includes(i));while(G.sel.length<13)G.sel.push(r.splice(Math.floor(Math.random()*r.length),1)[0]);playSfx("confirm",.75);startPlay()}
function startPlay(){clearBuildInputArm();clearMouseDiscardArm();setBgmPhase("play");G.fixed[0]=sortTiles(G.sel.map(i=>G.hands[0][i]));G.cand[0]=sortTiles(G.hands[0].filter((_,i)=>!G.sel.includes(i)));makeComHand();G.turn=G.dealer;show("#play");renderPlay();if(G.turn==1)setTimeout(comTurn,450)}

function countsToHand(c){
  const a=[];
  for(let i=0;i<34;i++){
    for(let n=0;n<c[i];n++)a.push(tile(i))
  }
  return a
}

function addWinningPatternCandidates(map,target,A,deficit){
  let deficitIdx=-1;

  if(deficit===1){
    for(let i=0;i<34;i++){
      if(target[i]>A[i]){
        deficitIdx=i;
        break
      }
    }
  }

  for(let w=0;w<34;w++){
    if(target[w]===0)continue;

    // CPUが4枚すべて持っている牌は相手からロンできない。
    if(A[w]>=4)continue;

    // 14枚完成形に外部牌1枚が必要なら、その牌だけが待ち候補。
    if(deficit===1 && w!==deficitIdx)continue;

    target[w]--;

    let ok=true;
    for(let i=0;i<34;i++){
      if(target[i]>A[i]){
        ok=false;
        break
      }
    }

    if(ok){
      const key=target.join("");
      let entry=map.get(key);

      if(!entry){
        entry={
          hand:countsToHand(target),
          waits:new Set()
        };
        map.set(key,entry)
      }

      entry.waits.add(tile(w))
    }

    target[w]++
  }
}

function generateMaxComTenpaiCandidates(){
  const A=cs(G.hands[1]);
  const map=new Map();
  const usage=Array(34).fill(0);
  const meldOptions=[];

  // 刻子候補。
  // ロン牌で3枚目が来る形まで考えるため、自分が2枚持っていれば候補にする。
  for(let i=0;i<34;i++){
    if(A[i]>=2){
      meldOptions.push({counts:[[i,3]]})
    }
  }

  // 順子候補。
  // 3枚のうち1枚までなら相手の捨て牌で完成できる。
  for(const off of [0,9,18]){
    for(let r=0;r<=6;r++){
      const ids=[off+r,off+r+1,off+r+2];
      if(ids.filter(i=>A[i]===0).length<=1){
        meldOptions.push({counts:ids.map(i=>[i,1])})
      }
    }
  }

  function tryAdd(option,deficit){
    let delta=0;

    for(const [i,n] of option.counts){
      const next=usage[i]+n;

      // 物理的に同じ牌は4枚まで。
      if(next>4)return null;

      const oldOver=Math.max(0,usage[i]-A[i]);
      const newOver=Math.max(0,next-A[i]);
      delta+=newOver-oldOver
    }

    const nextDeficit=deficit+delta;
    return nextDeficit<=1?nextDeficit:null
  }

  function addOption(option){
    for(const [i,n] of option.counts)usage[i]+=n
  }

  function removeOption(option){
    for(const [i,n] of option.counts)usage[i]-=n
  }

  function dfsMelds(startIndex,depth,deficit){
    if(depth===4){
      addWinningPatternCandidates(map,usage,A,deficit);
      return
    }

    for(let oi=startIndex;oi<meldOptions.length;oi++){
      const nd=tryAdd(meldOptions[oi],deficit);
      if(nd===null)continue;

      addOption(meldOptions[oi]);
      dfsMelds(oi,depth+1,nd);
      removeOption(meldOptions[oi])
    }
  }

  // 4面子1雀頭を体系的に探索。
  for(let pair=0;pair<34;pair++){
    // 雀頭をロンで完成する場合でも、固定13枚側に1枚は必要。
    if(A[pair]<1)continue;

    usage[pair]=2;
    const deficit=Math.max(0,2-A[pair]);

    dfsMelds(0,0,deficit);
    usage[pair]=0
  }

  // 七対子も体系的に探索。
  usage.fill(0);
  const pairTypes=[];
  for(let i=0;i<34;i++){
    if(A[i]>=1)pairTypes.push(i)
  }

  function dfsChiitoi(pos,depth,deficit){
    if(depth===7){
      addWinningPatternCandidates(map,usage,A,deficit);
      return
    }

    for(let k=pos;k<pairTypes.length;k++){
      const i=pairTypes[k];
      const nd=deficit+(A[i]>=2?0:1);
      if(nd>1)continue;

      usage[i]=2;
      dfsChiitoi(k+1,depth+1,nd);
      usage[i]=0
    }
  }

  dfsChiitoi(0,0,0);

  // 国士無双も候補化。
  const yaochu=[0,8,9,17,18,26,27,28,29,30,31,32,33];

  for(const duplicate of yaochu){
    const target=Array(34).fill(0);

    for(const i of yaochu)target[i]=1;
    target[duplicate]++;

    let deficit=0;
    for(let i=0;i<34;i++){
      deficit+=Math.max(0,target[i]-A[i])
    }

    if(deficit<=1){
      addWinningPatternCandidates(map,target,A,deficit)
    }
  }

  return map
}

function comPayoutForHan(han){
  const dealer=G.dealer===1;

  if(han>=13)return dealer?48000:32000;
  if(han>=11)return dealer?36000:24000;
  if(han>=8)return dealer?24000:16000;
  if(han>=6)return dealer?18000:12000;
  return dealer?12000:8000
}

function maxComHandScore(hand,knownWaits){
  const ws=[...knownWaits];
  if(!ws.length)return -Infinity;

  let score=0;
  let strongLive=0;
  let usableLive=0;
  let reserveWaitCopies=0;
  let strongWaitKinds=0;

  for(const w of ws){
    // CPUの34枚以外に残っている最大枚数。
    const live=Math.max(0,4-cnt(G.hands[1],w));
    if(live<=0)continue;

    usableLive+=live;

    // 自分の21枚側に残っている待ち牌は、捨てるとフリテンになるので
    // 最後まで残す必要がある。
    reserveWaitCopies+=Math.max(0,cnt(G.hands[1],w)-cnt(hand,w));

    // 人間が捨てたと仮定して役・飜数を判定。
    const ev=evaluate(hand,w,0);

    if(ev.yakumanCount>0){
      const amount=(G.dealer===1?48000:32000)*ev.yakumanCount;
      score+=live*amount*2.2;
      strongLive+=live;
      strongWaitKinds++;
      continue
    }

    if(ev.han>=4){
      const amount=comPayoutForHan(ev.han);
      score+=live*amount;
      strongLive+=live;
      strongWaitKinds++;
      continue
    }

    // 3飜は一発または河底が付いたときだけ4飜に届くため低評価。
    if(ev.han===3){
      score+=live*(G.dealer===1?12000:8000)*0.08
    }
  }

  if(usableLive===0)return -Infinity;

  // 4飜以上で実際にロンできる待ちを最優先。
  score+=strongLive*1400;
  score+=strongWaitKinds*900;

  // 多面待ちを評価。
  score+=ws.length*90;

  // 自分の待ち牌を21枚側に残しすぎると、17枚捨てる途中で
  // 必ず待ち牌を切ってフリテンになるため大きく減点。
  if(reserveWaitCopies>4){
    score-=1000000*(reserveWaitCopies-4)
  }else{
    score-=reserveWaitCopies*120
  }

  // 4飜以上の待ちがない形は最強CPUではほぼ採用しない。
  if(strongLive===0)score-=250000;

  return score
}

function makeComHand(){
  const candidates=generateMaxComTenpaiCandidates();

  let best=null;
  let bestScore=-Infinity;

  for(const entry of candidates.values()){
    const score=maxComHandScore(entry.hand,entry.waits);

    if(score>bestScore){
      bestScore=score;
      best=entry
    }
  }

  // 理論上ほぼ必ずテンパイ候補を作れるが、安全策として
  // 万一候補が無い場合だけ従来の同一34枚内ランダム探索へ退避。
  if(!best){
    const h=G.hands[1];
    let bestIds=[];
    let fallback=[];

    for(let tries=0;tries<25000&&!bestIds.length;tries++){
      const ids=sh([...Array(34).keys()]).slice(0,13);
      if(!fallback.length)fallback=ids;

      if(waits(ids.map(i=>h[i])).length){
        bestIds=ids
      }
    }

    if(!bestIds.length){
      bestIds=fallback.length?fallback:[...Array(13).keys()]
    }

    G.fixed[1]=sortTiles(bestIds.map(i=>h[i]));
    G.cand[1]=sortTiles(h.filter((_,i)=>!bestIds.includes(i)));
    return
  }

  G.fixed[1]=sortTiles(best.hand);

  // 同じ牌が複数あるので「枚数」で固定13枚を差し引く。
  const need=cs(G.fixed[1]);
  const cand=[];

  for(const t of G.hands[1]){
    const i=idx(t);

    if(need[i]>0){
      need[i]--
    }else{
      cand.push(t)
    }
  }

  G.cand[1]=sortTiles(cand)
}


function renderCpuBacks(){
  const box=$("#cpuHandBacks");
  if(!box)return;
  box.innerHTML="";
  for(let i=0;i<13;i++){
    const back=document.createElement("span");
    back.className="tile-back";
    box.appendChild(back)
  }
}

function renderMoneyStatus(){
  const box=$("#money");
  if(!box)return;

  const pLeader=G.money[0]>G.money[1];
  const cLeader=G.money[1]>G.money[0];
  box.innerHTML=`
    <span class="money-status">
      <span class="money-chip ${pLeader?"leader":""}">
        <span class="money-chip-name">${G.name}</span>
        <b class="money-chip-value">¥${G.money[0].toLocaleString()}</b>
      </span>
      <span class="money-divider">VS</span>
      <span class="money-chip ${cLeader?"leader":""}">
        <span class="money-chip-name">CPU</span>
        <b class="money-chip-value">¥${G.money[1].toLocaleString()}</b>
      </span>
    </span>
  `
}


function updateDiscardControl(){
  const humanTurn=G.turn===0 && !G.pending;
  $("#cand")?.classList.toggle("locked",!humanTurn);

  if(!humanTurn&&mouseDiscardArmedNode){
    clearMouseDiscardArm()
  }

  const hint=$("#discardHint");
  if(hint){
    if(!humanTurn){
      hint.textContent="CPUの打牌を待っています"
    }else if(mouseDiscardArmedNode){
      hint.textContent="同じ牌をもう一度クリック"
    }else{
      const touchLike=window.matchMedia?.("(pointer: coarse)")?.matches;
      hint.textContent=touchLike
        ?"牌をタッチして捨てる"
        :"牌をダブルクリックして捨てる"
    }
  }
}

function updateTurnUI(){
  $("#turn").textContent=G.turn===0?`${G.name}の番`:"CPUの番";
  updateDiscardControl()
}

function updateCandidateIndexes(){
  [...$("#cand").children].forEach((node,i)=>{
    node.dataset.index=String(i)
  })
}

let mouseDiscardArmedNode=null;
let mouseDiscardArmTimer=null;
let lastTouchDiscardAt=0;
const MOUSE_DOUBLE_CLICK_WINDOW=1000;

function clearMouseDiscardArm(){
  if(mouseDiscardArmTimer!==null){
    clearTimeout(mouseDiscardArmTimer);
    mouseDiscardArmTimer=null
  }

  if(mouseDiscardArmedNode){
    mouseDiscardArmedNode.classList.remove("mouse-discard-armed");
    mouseDiscardArmedNode=null
  }

  if(G.turn===0&&!G.pending){
    const hint=$("#discardHint");
    if(hint&&!window.matchMedia?.("(pointer: coarse)")?.matches){
      hint.textContent="牌をダブルクリックして捨てる"
    }
  }
}

function armMouseDiscard(b){
  clearMouseDiscardArm();

  mouseDiscardArmedNode=b;
  b.classList.add("mouse-discard-armed");

  const hint=$("#discardHint");
  if(hint)hint.textContent="同じ牌をもう一度クリック";

  mouseDiscardArmTimer=setTimeout(()=>{
    clearMouseDiscardArm()
  },MOUSE_DOUBLE_CLICK_WINDOW)
}

function makeCandidateTile(t,i){
  const b=el(t);
  b.dataset.index=String(i);

  const throwThisTile=()=>{
    if(G.turn!==0||G.pending)return;

    const currentIndex=Number(b.dataset.index);
    if(!Number.isInteger(currentIndex))return;

    clearMouseDiscardArm();
    discard(0,currentIndex,b)
  };

  // タッチ / ペンは1回で即捨て。
  b.addEventListener("pointerup",e=>{
    if(e.pointerType==="touch"||e.pointerType==="pen"){
      lastTouchDiscardAt=performance.now();
      e.preventDefault();
      throwThisTile()
    }
  });

  // PCは標準dblclickに依存せず、同じ牌への2回の通常clickで判定。
  // 1秒以内ならOS側のダブルクリック速度設定に左右されにくい。
  b.addEventListener("click",e=>{
    // タッチ後にブラウザが生成する疑似clickは無視。
    if(performance.now()-lastTouchDiscardAt<900)return;

    const finePointer=window.matchMedia?.("(pointer: fine)")?.matches;
    if(!finePointer&&e.detail===0)return;

    e.preventDefault();

    if(mouseDiscardArmedNode===b){
      throwThisTile()
    }else{
      armMouseDiscard(b)
    }
  });

  // ネイティブdblclickも保険として残す。
  b.addEventListener("dblclick",e=>{
    if(performance.now()-lastTouchDiscardAt<900)return;
    e.preventDefault();
    throwThisTile()
  });

  return b
}

function animateDiscardToRiver(b,fromRect,p){
  if(!b)return;

  if(typeof b.animate==="function"){
    const to=b.getBoundingClientRect();

    if(fromRect){
      const dx=fromRect.left-to.left;
      const dy=fromRect.top-to.top;
      const sx=fromRect.width/to.width;
      const sy=fromRect.height/to.height;

      b.animate([
        {
          transformOrigin:"top left",
          transform:`translate(${dx}px,${dy}px) scale(${sx},${sy})`,
          filter:"brightness(1.10)",
          zIndex:30
        },
        {
          transformOrigin:"top left",
          transform:"translate(0,0) scale(1,1)",
          filter:"brightness(1)",
          zIndex:1
        }
      ],{
        duration:230,
        easing:"cubic-bezier(.2,.8,.2,1)"
      });
      return
    }

    b.animate([
      {
        transform:`translateY(${p===1?-18:12}px) scale(1.05)`,
        opacity:.55
      },
      {
        transform:"translateY(0) scale(1)",
        opacity:1
      }
    ],{
      duration:190,
      easing:"cubic-bezier(.2,.8,.2,1)"
    })
  }
}

function appendDiscardToRiver(p,t,node=null){
  const target=p===0?$("#riverP"):$("#riverC");
  let b=node;
  const fromRect=b?b.getBoundingClientRect():null;

  if(!b)b=el(t);

  b.onclick=null;
  b.removeAttribute("data-index");
  b.classList.remove("mouse-discard-armed");
  b.classList.add("river-static-tile");
  b.setAttribute("aria-disabled","true");
  b.tabIndex=-1;
  if(typeof b.blur==="function")b.blur();

  target.appendChild(b);
  animateDiscardToRiver(b,fromRect,p);

  if(p===0)updateCandidateIndexes()
}

function renderPlay(){
  const names=[G.name,"CPU"];

  $("#pRound").textContent=`${G.round}回${G.half}`;
  $("#pDealer").textContent=names[G.dealer];
  renderDora("#pDora");
  renderMoneyStatus();

  renderCpuBacks();

  $("#fixed").innerHTML="";
  sortTiles(G.fixed[0]).forEach(t=>$("#fixed").append(el(t)));

  // 前局・前ターンの入力ロックやWクリック待機状態を必ず初期化。
  // その後 updateTurnUI() で、現在の手番に応じて正しい状態へ戻す。
  clearMouseDiscardArm();
  $("#cand").classList.remove("locked");
  $("#cand").innerHTML="";
  G.cand[0].forEach((t,i)=>$("#cand").append(makeCandidateTile(t,i)));

  $("#riverP").innerHTML="";
  G.river[0].forEach(t=>$("#riverP").append(el(t)));

  $("#riverC").innerHTML="";
  G.river[1].forEach(t=>$("#riverC").append(el(t)));

  updateTurnUI()
}

function discard(p,i,node=null){
  if(p!==G.turn)return;
  if(G.river[p].length>=17)return;
  if(i<0||i>=G.cand[p].length)return;

  const t=G.cand[p].splice(i,1)[0];
  G.river[p].push(t);

  appendDiscardToRiver(p,t,node);
  playSfx("discard",p===0?1:.78);

  if(win([...G.fixed[p],t]))G.fur[p]=true;

  const o=1-p;
  const ev=evaluate(G.fixed[o],t,p);

  if(win([...G.fixed[o],t])&&!G.fur[o]){
    if(ev.han>=4||ev.yakumanCount>0){
      if(o===0){
        updateDiscardControl();
        ronPrompt(o,p,t,ev);
        return
      }else{
        playSfx("ron");
        finishRon(o,t,ev);
        return
      }
    }else{
      G.fur[o]=true
    }
  }

  if(G.river[0].length>=17&&G.river[1].length>=17){
    draw();
    return
  }

  G.turn=o;

  if(G.river[o].length>=17){
    if(G.river[p].length>=17){
      draw();
      return
    }
    G.turn=p
  }

  updateTurnUI();

  if(G.turn===1)setTimeout(comTurn,450)
}

function comDiscardSafety(t){
  // 相手がすでにフリテンなら放銃危険度は0。
  if(G.fur[0])return 0;

  const humanRiver=G.river[0];

  // 相手自身がすでに捨てた同一牌は、このゲームでは完全な現物。
  if(humanRiver.includes(t))return 1000000;

  let score=0;

  // CPUの34枚＋公開河＋表ドラ表示牌から、相手が持てる枚数を読む。
  const ownCopies=cnt(G.hands[1],t);

  // CPUの河はもともとCPUの34枚に含まれているため、ここで足すと二重計上になる。
  const visibleCopies=
    ownCopies+
    cnt(humanRiver,t)+
    (G.dora===t?1:0);

  if(visibleCopies>=4)return 900000;

  score+=visibleCopies*55;
  score+=ownCopies*30;

  const dora=de(G.dora);
  const humanSeat=(G.dealer===0)?"E":"S";

  // 4飜到達を助けやすい牌は強く警戒。
  if(t===dora)score-=220;
  if(t===humanSeat)score-=150;
  if(["P","F","C"].includes(t))score-=95;

  if(t.length===2){
    const n=+t[0];

    // 中張牌は順子待ちに絡みやすい。
    if(n===1||n===9)score+=42;
    else if(n===2||n===8)score+=20;
    else if(n===5)score-=48;
    else score-=24;

    // このゲームでは相手の河＝固定13枚に採用しなかった牌なので、
    // 河に多く出ている色は少し安全寄り、少ない色は少し危険寄りとみる。
    if(humanRiver.length>=4){
      const suit=t[1];
      const suitCounts={
        m:humanRiver.filter(x=>x.length===2&&x[1]==="m").length,
        p:humanRiver.filter(x=>x.length===2&&x[1]==="p").length,
        s:humanRiver.filter(x=>x.length===2&&x[1]==="s").length
      };
      const avg=(suitCounts.m+suitCounts.p+suitCounts.s)/3;
      score+=(suitCounts[suit]-avg)*7
    }
  }else{
    if(t!==humanSeat)score+=24
  }

  // 一発が付く最初の1巡はさらに守備寄り。
  if(humanRiver.length<=1){
    if(t===dora)score-=90;
    if(t===humanSeat||["P","F","C"].includes(t))score-=45;
    if(t.length===2&&+t[0]===5)score-=25
  }

  return score
}

function chooseMaxComDiscard(){
  if(!G.cand[1].length)return -1;

  // CPU自身の待ち牌は切った瞬間にフリテンになるため、
  // 切らずに済む限り必ず保護する。
  const ownWaits=new Set(waits(G.fixed[1]));
  const allIndices=G.cand[1].map((_,i)=>i);
  const nonWaitIndices=allIndices.filter(i=>!ownWaits.has(G.cand[1][i]));

  // 待ち牌以外が1枚でも残っている間は、待ち牌を候補から外す。
  const pool=nonWaitIndices.length?nonWaitIndices:allIndices;

  let bestScore=G.fur[0]?Infinity:-Infinity;
  let choices=[];

  for(const i of pool){
    const s=comDiscardSafety(G.cand[1][i]);

    if(G.fur[0]){
      // 相手がフリテンなら、普段なら最も危険な牌から先に処理。
      if(s<bestScore){
        bestScore=s;
        choices=[i]
      }else if(s===bestScore){
        choices.push(i)
      }
    }else{
      // 通常時は最も安全な牌を選ぶ。
      if(s>bestScore){
        bestScore=s;
        choices=[i]
      }else if(s===bestScore){
        choices.push(i)
      }
    }
  }

  return choices[Math.floor(Math.random()*choices.length)]
}

function comTurn(){
  if(G.turn!=1)return;
  if(G.river[1].length>=17||G.cand[1].length===0){
    if(G.river[0].length>=17)draw();
    return
  }

  const i=chooseMaxComDiscard();
  if(i<0)return;
  discard(1,i)
}
function ronPrompt(w,l,t,ev){
  setBgmDuck(true);
  playSfx("ron");
  G.pending={w,l,t,ev};
  $("#ronTile").innerHTML="";
  $("#ronTile").append(el(t));
  $("#ronBox").classList.remove("hidden");
  let n=10;
  $("#sec").textContent=n;
  clearInterval(G.ronInt);
  G.ronInt=setInterval(()=>{
    n--;
    $("#sec").textContent=n;
    if(n<=0){
      clearInterval(G.ronInt);
      pass()
    }
  },1000)
}
function pass(){
  setBgmDuck(false);
  clearInterval(G.ronInt);
  let r=G.pending;
  if(!r)return;

  G.fur[r.w]=true;
  $("#ronBox").classList.add("hidden");
  $("#ronTile").innerHTML="";
  G.pending=null;

  // 両者17枚捨て済みの最終ロン牌を見逃した場合は、そのまま流局。
  if(G.river[0].length>=17&&G.river[1].length>=17){
    draw();
    return
  }

  G.turn=0;
  updateTurnUI()
}
$("#pass").onclick=pass;
$("#ron").onclick=()=>{
  setBgmDuck(false);
  clearInterval(G.ronInt);
  let r=G.pending;
  if(!r)return;
  $("#ronBox").classList.add("hidden");
  $("#ronTile").innerHTML="";
  finishRon(r.w,r.t,r.ev);
  G.pending=null
}

function resultTileMarkup(t,extraClass=""){
  return `<span class="result-tile ${extraClass}" aria-label="${tt(t)}">${tileFaceMarkup(t)}</span>`
}

function resultHandMarkup(hand13,winTile){
  const fixed=sortTiles(hand13).map(t=>resultTileMarkup(t)).join("");
  return `
    <div class="result-hand">
      <div class="result-fixed-tiles">${fixed}</div>
      <span class="result-plus">＋</span>
      ${resultTileMarkup(winTile,"winning-result-tile")}
    </div>
  `
}

function resultFixedHandMarkup(hand13){
  return `<div class="result-fixed-tiles reveal-hand">${sortTiles(hand13).map(t=>resultTileMarkup(t)).join("")}</div>`
}

function yakuMarkup(yaku){
  return `<div class="yaku-chips">${yaku.map(y=>`<span>${y}</span>`).join("")}</div>`
}

function tierClassName(tier){
  if(tier.includes("役満"))return "tier-yakuman";
  if(tier==="三倍満")return "tier-sanbaiman";
  if(tier==="倍満")return "tier-baiman";
  if(tier==="跳満")return "tier-haneman";
  return "tier-mangan"
}

function englishTierName(tier){
  const multiYakuman=tier.match(/^(\d+)倍役満$/);
  if(multiYakuman)return `${multiYakuman[1]}x YAKUMAN`;
  if(tier==="役満")return "YAKUMAN";
  if(tier==="数え役満")return "COUNTED YAKUMAN";
  if(tier==="三倍満")return "SANBAIMAN";
  if(tier==="倍満")return "BAIMAN";
  if(tier==="跳満")return "HANEMAN";
  return "MANGAN"
}

function currentMoneyMarkup(winnerIndex=null){
  return `
    <div class="result-money-board">
      <div class="${winnerIndex===0?"money-winner":""}">
        <span>${G.name}</span>
        <b>¥${G.money[0].toLocaleString()}</b>
      </div>
      <div class="${winnerIndex===1?"money-winner":""}">
        <span>CPU</span>
        <b>¥${G.money[1].toLocaleString()}</b>
      </div>
    </div>
  `
}

function finishRon(w,t,ev){
  $("#next").textContent="次の局へ";

  const full=[...G.fixed[w],t];
  const faceDora=de(G.dora);
  const uraDora=de(G.ura);
  const faceCount=cnt(full,faceDora);
  const uraCount=cnt(full,uraDora);

  let finalHan=ev.han;
  let tier="";
  let amount=0;

  if(ev.yakumanCount>0){
    const n=ev.yakumanCount;
    tier=n===1?"役満":`${n}倍役満`;
    amount=(w===G.dealer?48000:32000)*n;
  }else{
    finalHan+=uraCount;
    tier=finalHan>=13?"数え役満":
         finalHan>=11?"三倍満":
         finalHan>=8?"倍満":
         finalHan>=6?"跳満":"満貫";

    amount=(w===G.dealer?
      {"満貫":12000,"跳満":18000,"倍満":24000,"三倍満":36000,"数え役満":48000}:
      {"満貫":8000,"跳満":12000,"倍満":16000,"三倍満":24000,"数え役満":32000}
    )[tier];
  }

  G.money[w]+=amount;
  show("#result");
  $("#resultTitle").textContent=`${w?"CPU":G.name} ロン！`;

  const hanLine=ev.yakumanCount>0
    ? `<span>役満数 <b>${ev.yakumanCount}</b></span><span>ドラ・裏ドラは役満に加算しません</span>`
    : `<span>表ドラ込み <b>${ev.han}飜</b></span><span>裏ドラ <b>${uraCount}枚</b></span><span>最終 <b>${finalHan}飜</b></span>`;

  $("#resultBody").innerHTML=`
    <div class="result-panel ${tierClassName(tier)}">
      <div class="score-hero">
        <div class="score-tier-stack">
          <span class="score-kicker">HIGH STAKES</span>
          <span class="score-tier">${tier}</span>
          <span class="score-subtier">${englishTierName(tier)}</span>
        </div>
        <strong>+¥${amount.toLocaleString()}</strong>
      </div>

      <div class="result-section">
        <span class="result-label">和了形</span>
        ${resultHandMarkup(G.fixed[w],t)}
      </div>

      <div class="result-section">
        <span class="result-label">役</span>
        ${yakuMarkup(ev.yaku)}
      </div>

      <div class="bonus-tiles">
        <div class="bonus-box">
          <span>表ドラ</span>
          ${resultTileMarkup(faceDora)}
          <b>${faceCount}枚</b>
        </div>
        <div class="bonus-box ura-box">
          <span>裏ドラ</span>
          ${resultTileMarkup(uraDora)}
          <b>${uraCount}枚</b>
        </div>
      </div>

      <div class="han-summary">${hanLine}</div>
      ${currentMoneyMarkup(w)}
    </div>
  `;

  G.wasDraw=false
}

function showFinalResult(){
  G.gameOver=true;
  const wi=G.money[0]>G.money[1]?0:1;
  const winner=wi===0?G.name:"CPU";

  show("#result");
  $("#resultTitle").textContent=`対局終了　${winner}の勝ち！`;
  $("#resultBody").innerHTML=`
    <div class="result-panel final-result-panel">
      <div class="score-hero final-score">
        <div class="score-tier-stack">
          <span class="score-kicker">FINAL TABLE</span>
          <span class="score-tier">FINAL</span>
          <span class="score-subtier">HIGH STAKES WIN</span>
        </div>
        <strong>${winner} WIN</strong>
      </div>
      ${currentMoneyMarkup(wi)}
      <p class="result-note">3回裏終了時点、または延長の裏終了時点で獲得金額が上回った側の勝利です。</p>
    </div>
  `;
  $("#next").textContent="最初から"
}

function draw(){
  $("#next").textContent="次の局へ";
  show("#result");
  $("#resultTitle").textContent="流局";
  $("#resultBody").innerHTML=`
    <div class="result-panel draw-result-panel">
      <div class="draw-message">17枚ずつ捨て切りました。親継続で同じ局をやり直します。</div>

      <div class="result-section">
        <span class="result-label">${G.name}の固定13枚</span>
        ${resultFixedHandMarkup(G.fixed[0])}
      </div>

      <div class="result-section">
        <span class="result-label">CPUの固定13枚</span>
        ${resultFixedHandMarkup(G.fixed[1])}
      </div>

      ${currentMoneyMarkup(null)}
    </div>
  `;
  G.wasDraw=true
}

$("#next").onclick=()=>{
  if(G.gameOver){
    location.reload();
    return
  }

  if(G.wasDraw){
    $("#next").textContent="次の局へ";
    newRound();
    return
  }

  G.dealer=1-G.dealer;

  if(G.half==="表"){
    G.half="裏";
    $("#next").textContent="次の局へ";
    newRound();
    return
  }

  if(G.round>=3 && G.money[0]!==G.money[1]){
    showFinalResult();
    return
  }

  G.round++;
  G.half="表";
  $("#next").textContent="次の局へ";
  newRound()
}


function idx(t){
  if(t.length===2)return (t[1]==="m"?0:t[1]==="p"?9:18)+(+t[0]-1);
  return 27+HO.indexOf(t)
}
function tile(i){
  if(i<27)return (i%9+1)+(i<9?"m":i<18?"p":"s");
  return HO[i-27]
}
function cs(a){
  const c=Array(34).fill(0);
  a.forEach(t=>c[idx(t)]++);
  return c
}
function cnt(a,t){return a.filter(x=>x===t).length}
function isHonorIndex(i){return i>=27}
function isTerminalIndex(i){return i<27&&(i%9===0||i%9===8)}
function isYaochuIndex(i){return isHonorIndex(i)||isTerminalIndex(i)}
function rankOfIndex(i){return i<27?(i%9)+1:null}
function isDragonIndex(i){return i>=31&&i<=33}
function meldTileIndices(m){
  return m.type==="trip"?[m.tile,m.tile,m.tile]:[m.start,m.start+1,m.start+2]
}
function meldHasTerminalOrHonor(m){
  return meldTileIndices(m).some(isYaochuIndex)
}
function meldKey(m){
  return m.type==="trip"?`T${m.tile}`:`S${m.start}`
}

function standardDecompositions(tiles){
  const base=cs(tiles);
  const out=[];

  for(let pair=0;pair<34;pair++){
    if(base[pair]<2)continue;
    const c=[...base];
    c[pair]-=2;

    function rec(cc,melds){
      let i=-1;
      for(let j=0;j<34;j++){
        if(cc[j]>0){i=j;break}
      }
      if(i<0){
        if(melds.length===4)out.push({pair,melds:melds.map(x=>({...x}))});
        return
      }
      if(melds.length>=4)return;

      if(cc[i]>=3){
        cc[i]-=3;
        melds.push({type:"trip",tile:i});
        rec(cc,melds);
        melds.pop();
        cc[i]+=3
      }

      if(i<27&&i%9<=6&&cc[i+1]>0&&cc[i+2]>0){
        cc[i]--;cc[i+1]--;cc[i+2]--;
        melds.push({type:"seq",start:i});
        rec(cc,melds);
        melds.pop();
        cc[i]++;cc[i+1]++;cc[i+2]++
      }
    }

    rec(c,[])
  }

  const seen=new Set();
  return out.filter(d=>{
    const k=`${d.pair}|${d.melds.map(m=>meldKey(m)).sort().join(",")}`;
    if(seen.has(k))return false;
    seen.add(k);
    return true
  })
}

function isChiitoi(tiles){
  return cs(tiles).filter(x=>x===2).length===7
}
function isKokushi(tiles){
  if(tiles.length!==14)return false;
  const c=cs(tiles);
  const y=[0,8,9,17,18,26,27,28,29,30,31,32,33];
  return y.every(i=>c[i]>=1)&&y.some(i=>c[i]>=2)
}
function isChuuren(tiles){
  if(tiles.length!==14||tiles.some(t=>t.length!==2))return false;
  const suit=tiles[0][1];
  if(!tiles.every(t=>t[1]===suit))return false;
  const r=Array(10).fill(0);
  tiles.forEach(t=>r[+t[0]]++);
  if(r[1]<3||r[9]<3)return false;
  for(let n=2;n<=8;n++)if(r[n]<1)return false;
  return true
}
function isRyuuiisou(tiles){
  const green=new Set(["2s","3s","4s","6s","8s","F"]);
  return tiles.every(t=>green.has(t))
}

function winAssignments(decomp,winIdx){
  const out=[];
  if(decomp.pair===winIdx)out.push({kind:"pair",meldIndex:-1});
  decomp.melds.forEach((m,i)=>{
    if(meldTileIndices(m).includes(winIdx))out.push({kind:m.type,meldIndex:i})
  });
  return out.length?out:[{kind:"none",meldIndex:-1}]
}

function isRyanmen(decomp,assignment,winIdx){
  if(assignment.kind!=="seq")return false;
  const m=decomp.melds[assignment.meldIndex];
  const start=rankOfIndex(m.start);
  const win=rankOfIndex(winIdx);
  if(win===start+1)return false;
  if(start===1&&win===3)return false;
  if(start===7&&win===7)return false;
  return true
}

function concealedTripCount(decomp,assignment){
  let n=decomp.melds.filter(m=>m.type==="trip").length;
  if(assignment.kind==="trip")n--;
  return n
}

function yakumanForStandard(tiles,decomp,assignment){
  const c=cs(tiles);
  const y=[];

  if([31,32,33].every(i=>c[i]>=3))y.push("大三元");

  const windTrips=[27,28,29,30].filter(i=>c[i]>=3).length;
  if(windTrips===4)y.push("大四喜");
  else if(windTrips===3&&[27,28,29,30].includes(decomp.pair))y.push("小四喜");

  if(tiles.every(t=>t.length===1))y.push("字一色");
  if(tiles.every(t=>t.length===2&&(+t[0]===1||+t[0]===9)))y.push("清老頭");
  if(isRyuuiisou(tiles))y.push("緑一色");

  const allTrips=decomp.melds.every(m=>m.type==="trip");
  if(allTrips&&concealedTripCount(decomp,assignment)===4&&assignment.kind==="pair"){
    y.push("四暗刻")
  }

  if(isChuuren(tiles))y.push("九蓮宝燈");

  return y
}

function normalYakuForStandard(tiles,decomp,assignment,winner,winIdx){
  const c=cs(tiles);
  const y=[];
  let han=0;
  const seatWind=winner===G.dealer?27:28;

  if(tiles.every(t=>t.length===2&&+t[0]>=2&&+t[0]<=8)){
    y.push("タンヤオ");han++
  }

  for(const [i,name] of [[31,"白"],[32,"發"],[33,"中"]]){
    if(c[i]>=3){y.push(`役牌 ${name}`);han++}
  }
  if(c[seatWind]>=3){
    y.push(`自風 ${seatWind===27?"東":"南"}`);han++
  }

  const seqs=decomp.melds.filter(m=>m.type==="seq");
  const trips=decomp.melds.filter(m=>m.type==="trip");

  const valuePair=isDragonIndex(decomp.pair)||decomp.pair===seatWind;
  if(seqs.length===4&&!valuePair&&isRyanmen(decomp,assignment,winIdx)){
    y.push("ピンフ");han++
  }

  const seqMap=new Map();
  seqs.forEach(m=>seqMap.set(m.start,(seqMap.get(m.start)||0)+1));
  const identicalPairs=[...seqMap.values()].reduce((s,n)=>s+Math.floor(n/2),0);
  if(seqs.length===4&&identicalPairs>=2){
    y.push("二盃口");han+=3
  }else if(identicalPairs>=1){
    y.push("一盃口");han++
  }

  for(let r=1;r<=7;r++){
    const starts=[r-1,9+r-1,18+r-1];
    if(starts.every(s=>seqs.some(m=>m.start===s))){
      y.push("三色同順");han+=2;break
    }
  }

  for(const off of [0,9,18]){
    if([off,off+3,off+6].every(s=>seqs.some(m=>m.start===s))){
      y.push("一気通貫");han+=2;break
    }
  }

  if(trips.length===4){
    y.push("対々和");han+=2
  }

  if(concealedTripCount(decomp,assignment)>=3){
    y.push("三暗刻");han+=2
  }

  for(let r=1;r<=9;r++){
    const a=[r-1,9+r-1,18+r-1];
    if(a.every(i=>trips.some(m=>m.tile===i))){
      y.push("三色同刻");han+=2;break
    }
  }

  const dragonTrips=[31,32,33].filter(i=>c[i]>=3).length;
  if(dragonTrips===2&&[31,32,33].includes(decomp.pair)){
    y.push("小三元");han+=2
  }

  if(tiles.every(t=>isYaochuIndex(idx(t)))){
    y.push("混老頭");han+=2
  }

  const allGroupsYaochu=
    isYaochuIndex(decomp.pair)&&
    decomp.melds.every(m=>meldHasTerminalOrHonor(m));
  if(allGroupsYaochu&&seqs.length>0){
    const hasHonor=tiles.some(t=>t.length===1);
    if(hasHonor){y.push("チャンタ");han+=2}
    else{y.push("純チャン");han+=3}
  }

  const suits=new Set(tiles.filter(t=>t.length===2).map(t=>t[1]));
  const hasHonor=tiles.some(t=>t.length===1);
  if(suits.size===1){
    if(hasHonor){y.push("混一色");han+=3}
    else{y.push("清一色");han+=6}
  }

  return {han,yaku:y}
}

function normalYakuForChiitoi(tiles){
  const y=["七対子"];
  let han=2;

  if(tiles.every(t=>t.length===2&&+t[0]>=2&&+t[0]<=8)){
    y.push("タンヤオ");han++
  }
  if(tiles.every(t=>isYaochuIndex(idx(t)))){
    y.push("混老頭");han+=2
  }

  const suits=new Set(tiles.filter(t=>t.length===2).map(t=>t[1]));
  const hasHonor=tiles.some(t=>t.length===1);
  if(suits.size===1){
    if(hasHonor){y.push("混一色");han+=3}
    else{y.push("清一色");han+=6}
  }

  return {han,yaku:y}
}

function bonusYaku(tiles,discarder){
  const y=["リーチ"];
  let han=1;

  if(G.river[discarder].length===1){
    y.push("一発");han++
  }
  if(G.river[discarder].length===17){
    y.push("河底");han++
  }

  const d=cnt(tiles,de(G.dora));
  if(d>0){
    y.push(`ドラ${d}`);han+=d
  }

  return {han,yaku:y}
}

function evaluate(hand13,winTile,discarder){
  const tiles=[...hand13,winTile];
  const winner=1-discarder;
  const winIdx=idx(winTile);

  if(isKokushi(tiles)){
    return {han:0,yaku:["国士無双"],yak:true,yakumanCount:1}
  }

  const decomps=standardDecompositions(tiles);
  const chiitoi=isChiitoi(tiles);

  if(!chiitoi&&decomps.length===0){
    return {han:0,yaku:[],yak:false,yakumanCount:0}
  }

  const bonus=bonusYaku(tiles,discarder);
  let best={han:-1,yaku:[],yak:false,yakumanCount:0};

  if(chiitoi){
    const yakuman=[];
    if(tiles.every(t=>t.length===1))yakuman.push("字一色");
    if(tiles.every(t=>t.length===2&&(+t[0]===1||+t[0]===9)))yakuman.push("清老頭");
    if(isRyuuiisou(tiles))yakuman.push("緑一色");

    if(yakuman.length){
      best={han:0,yaku:yakuman,yak:true,yakumanCount:yakuman.length}
    }else{
      const n=normalYakuForChiitoi(tiles);
      best={
        han:n.han+bonus.han,
        yaku:[...bonus.yaku,...n.yaku],
        yak:false,
        yakumanCount:0
      }
    }
  }

  for(const d of decomps){
    for(const assignment of winAssignments(d,winIdx)){
      const yakuman=yakumanForStandard(tiles,d,assignment);

      if(yakuman.length){
        if(yakuman.length>best.yakumanCount){
          best={han:0,yaku:yakuman,yak:true,yakumanCount:yakuman.length}
        }
        continue
      }

      if(best.yakumanCount>0)continue;

      const n=normalYakuForStandard(tiles,d,assignment,winner,winIdx);
      const cand={
        han:n.han+bonus.han,
        yaku:[...bonus.yaku,...n.yaku],
        yak:false,
        yakumanCount:0
      };
      if(cand.han>best.han)best=cand
    }
  }

  return best.han<0
    ? {han:0,yaku:[],yak:false,yakumanCount:0}
    : best
}

function meld(c){
  let i=c.findIndex(x=>x);
  if(i<0)return true;
  if(c[i]>=3){
    c[i]-=3;
    if(meld(c)){c[i]+=3;return true}
    c[i]+=3
  }
  if(i<27&&i%9<=6&&c[i+1]&&c[i+2]){
    c[i]--;c[i+1]--;c[i+2]--;
    if(meld(c)){c[i]++;c[i+1]++;c[i+2]++;return true}
    c[i]++;c[i+1]++;c[i+2]++
  }
  return false
}
function win(a){
  if(a.length!==14)return false;
  if(isKokushi(a)||isChiitoi(a))return true;
  return standardDecompositions(a).length>0
}
function waits(h){
  const r=[];
  for(let i=0;i<34;i++){
    const t=tile(i);
    if(cnt(h,t)<4&&win([...h,t]))r.push(t)
  }
  return r
}



// ===== ルール表示 =====
function openRules(){
  const box=$("#rulesBox");
  if(!box)return;
  box.classList.remove("hidden");
  box.setAttribute("aria-hidden","false");
  document.body.classList.add("rules-open");
  const scroll=box.querySelector(".rules-scroll");
  if(scroll)scroll.scrollTop=0
}

function closeRules(){
  const box=$("#rulesBox");
  if(!box)return;
  box.classList.add("hidden");
  box.setAttribute("aria-hidden","true");
  document.body.classList.remove("rules-open")
}

$("#rulesOpenHeader")?.addEventListener("click",openRules);
$("#rulesOpenHome")?.addEventListener("click",openRules);
$("#rulesClose")?.addEventListener("click",closeRules);
$("#rulesCloseBottom")?.addEventListener("click",closeRules);
$("#rulesBox")?.addEventListener("click",e=>{
  if(e.target===$("#rulesBox"))closeRules()
});
window.addEventListener("keydown",e=>{
  if(e.key==="Escape"&&!$("#rulesBox")?.classList.contains("hidden"))closeRules()
});
