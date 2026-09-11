const $=s=>document.querySelector(s),SU=["m","p","s"],HO=["E","S","W","N","P","F","C"],NM={m:"萬",p:"筒",s:"索",E:"東",S:"南",W:"西",N:"北",P:"白",F:"發",C:"中"};
let G={name:"",round:1,half:"表",dealer:0,money:[0,0],hands:[[],[]],fixed:[[],[]],cand:[[],[]],river:[[],[]],sel:[],dora:null,ura:null,turn:0,fur:[false,false],time:180,timer:null,pending:null};
function deck(){let a=[];for(let s of SU)for(let n=1;n<=9;n++)for(let i=0;i<4;i++)a.push(n+s);for(let h of HO)for(let i=0;i<4;i++)a.push(h);return sh(a)}
function sh(a){for(let i=a.length-1;i;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function tt(t){return t.length==2?t[0]+NM[t[1]]:NM[t]}
function de(t){if(t.length==2)return ((+t[0]==9?1:+t[0]+1)+t[1]);let i=HO.indexOf(t);if(i<4)return HO[(i+1)%4];let a=["P","F","C"];return a[(a.indexOf(t)+1)%3]}
function el(t,fn){let b=document.createElement("button");b.className="tile";b.textContent=tt(t);if(fn)b.onclick=fn;return b}
function show(id){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("on"));$(id).classList.add("on")}
$("#com").onclick=()=>show("#setup");$("#online").onclick=()=>$("#onlineNote").classList.toggle("hidden");$("#reset").onclick=()=>location.reload();$("#start").onclick=()=>{G.name=$("#name").value.trim()||"プレイヤー";newRound()}

function newRound(){let d=deck();G.hands=[d.slice(0,34),d.slice(34,68)];let w=d.slice(68),p=Math.floor(Math.random()*34);G.dora=w[p];G.ura=w[p+34];G.sel=[];G.river=[[],[]];G.fur=[false,false];G.time=180;G.dealer=(G.round==1&&G.half=="表")?Math.floor(Math.random()*2):G.dealer;build()}
function build(){show("#build");$("#round").textContent=`${G.round}回${G.half}`;$("#dealer").textContent=`親：${G.dealer?"COM":G.name}`;$("#dora").textContent=`ドラ ${tt(G.dora)}→${tt(de(G.dora))}`;$("#buildTitle").textContent=`${G.name}の手作り`;renderBuild();clearInterval(G.timer);G.timer=setInterval(()=>{G.time--;timer();if(G.time<=0){clearInterval(G.timer);force()}},1000)}
function timer(){let m=Math.floor(G.time/60),s=G.time%60;$("#timer").textContent=`残り ${m}:${String(s).padStart(2,"0")}`}
function renderBuild(){timer();$("#pool").innerHTML="";$("#selected").innerHTML="";G.hands[0].forEach((t,i)=>{if(!G.sel.includes(i))$("#pool").append(el(t,()=>{if(G.sel.length<13){G.sel.push(i);renderBuild()}}))});G.sel.forEach(i=>$("#selected").append(el(G.hands[0][i],()=>{G.sel=G.sel.filter(x=>x!=i);renderBuild()})));$("#count").textContent=G.sel.length;let w=G.sel.length==13?waits(G.sel.map(i=>G.hands[0][i])):[];$("#tenpai").textContent=w.length?`テンパイ：${w.map(tt).join("・")}`:G.sel.length==13?"ノーテン":"";$("#confirm").disabled=!w.length}
$("#confirm").onclick=()=>{clearInterval(G.timer);startPlay()}
function force(){let r=G.hands[0].map((_,i)=>i).filter(i=>!G.sel.includes(i));while(G.sel.length<13)G.sel.push(r.splice(Math.floor(Math.random()*r.length),1)[0]);startPlay()}
function startPlay(){G.fixed[0]=G.sel.map(i=>G.hands[0][i]);G.cand[0]=G.hands[0].filter((_,i)=>!G.sel.includes(i));makeComHand();G.turn=G.dealer;show("#play");renderPlay();if(G.turn==1)setTimeout(comTurn,450)}
function makeComHand(){
  let h=G.hands[1],best=[];
  // COMは「確定ON」と同じくテンパイ13枚だけで開始する。
  // ランダム探索を十分行い、見つからなければ13枚組を部分交換して探索する。
  for(let tries=0;tries<12000&&!best.length;tries++){
    let ids=sh([...Array(34).keys()]).slice(0,13);
    if(waits(ids.map(i=>h[i])).length)best=ids;
  }
  if(!best.length){
    // 万一探索で見つからない場合は、COMだけ再配牌して必ずテンパイを探す。
    // プレイヤー側の34枚・公開ドラは変更しない。
    let pool=deck();
    for(let retry=0;retry<20&&!best.length;retry++){
      h=pool.slice(0,34);
      for(let tries=0;tries<12000&&!best.length;tries++){
        let ids=sh([...Array(34).keys()]).slice(0,13);
        if(waits(ids.map(i=>h[i])).length)best=ids;
      }
      if(!best.length)pool=deck();
    }
  }
  // 最終安全策。通常ここには到達しない。
  if(!best.length)best=[...Array(13).keys()];
  G.hands[1]=h;
  G.fixed[1]=best.map(i=>h[i]);
  G.cand[1]=h.filter((_,i)=>!best.includes(i));
}
function renderPlay(){let names=[G.name,"COM"];$("#pRound").textContent=`${G.round}回${G.half}`;$("#pDealer").textContent=`親：${names[G.dealer]}`;$("#pDora").textContent=`ドラ ${tt(G.dora)}→${tt(de(G.dora))}`;$("#money").textContent=`¥${G.money[0].toLocaleString()} / COM ¥${G.money[1].toLocaleString()}`;$("#turn").textContent=G.turn==0?`${G.name}の番`:"COMの番";$("#fixed").innerHTML="";G.fixed[0].forEach(t=>$("#fixed").append(el(t)));$("#cand").innerHTML="";if(G.turn==0)G.cand[0].forEach((t,i)=>$("#cand").append(el(t,()=>discard(0,i))));["#riverP","#riverC"].forEach((q,p)=>{$(q).innerHTML="";G.river[p].forEach(t=>$(q).append(el(t)))})}
function discard(p,i){if(G.river[p].length>=17)return;let t=G.cand[p].splice(i,1)[0];G.river[p].push(t);if(win([...G.fixed[p],t]))G.fur[p]=true;let o=1-p,ev=evaluate(G.fixed[o],t,p);if(win([...G.fixed[o],t])&&!G.fur[o]){if(ev.han>=4||ev.yak){if(o==0){ronPrompt(o,p,t,ev);return}else{finishRon(o,t,ev);return}}else G.fur[o]=true}if(G.river[0].length>=17&&G.river[1].length>=17){draw();return}G.turn=o;if(G.river[o].length>=17){if(G.river[p].length>=17){draw();return}G.turn=p}renderPlay();if(G.turn==1)setTimeout(comTurn,450)}
function comTurn(){if(G.turn!=1)return;if(G.river[1].length>=17||G.cand[1].length===0){if(G.river[0].length>=17)draw();return}let i=Math.floor(Math.random()*G.cand[1].length);discard(1,i)}
function ronPrompt(w,l,t,ev){G.pending={w,l,t,ev};$("#ronBox").classList.remove("hidden");let n=10;$("#sec").textContent=n;G.ronInt=setInterval(()=>{n--;$("#sec").textContent=n;if(n<=0){clearInterval(G.ronInt);pass()}},1000)}
function pass(){let r=G.pending;G.fur[r.w]=true;$("#ronBox").classList.add("hidden");G.pending=null;G.turn=0;renderPlay()}
$("#pass").onclick=pass;$("#ron").onclick=()=>{clearInterval(G.ronInt);let r=G.pending;$("#ronBox").classList.add("hidden");finishRon(r.w,r.t,r.ev);G.pending=null}
function finishRon(w,t,ev){let ura=cnt([...G.fixed[w],t],de(G.ura)),han=ev.yak?0:ev.han+ura,tier=ev.yak?"役満":han>=13?"数え役満":han>=11?"三倍満":han>=8?"倍満":han>=6?"跳満":"満貫",amt=(w==G.dealer?{"満貫":12000,"跳満":18000,"倍満":24000,"三倍満":36000,"数え役満":48000,"役満":48000}:{"満貫":8000,"跳満":12000,"倍満":16000,"三倍満":24000,"数え役満":32000,"役満":32000})[tier];G.money[w]+=amt;show("#result");$("#resultTitle").textContent=`${w? "COM":G.name} ロン！`;$("#resultBody").innerHTML=`<p>和了牌：${tt(t)}</p><p>役：${ev.yaku.join(" / ")}</p><p>裏ドラ：${ura}枚</p><h2>${tier}　+¥${amt.toLocaleString()}</h2>`;G.wasDraw=false}
function draw(){show("#result");$("#resultTitle").textContent="流局";$("#resultBody").innerHTML="<p>17枚ずつ捨て切りました。親継続で同じ局をやり直します。</p>";G.wasDraw=true}
$("#next").onclick=()=>{if(!G.wasDraw){if(G.half=="表")G.half="裏";else{G.half="表";G.round++}G.dealer=1-G.dealer}newRound()}

function idx(t){if(t.length==2)return (t[1]=="m"?0:t[1]=="p"?9:18)+(+t[0]-1);return 27+HO.indexOf(t)}
function tile(i){if(i<27)return (i%9+1)+(i<9?"m":i<18?"p":"s");return HO[i-27]}
function cs(a){let c=Array(34).fill(0);a.forEach(t=>c[idx(t)]++);return c}
function meld(c){let i=c.findIndex(x=>x);if(i<0)return true;if(c[i]>=3){c[i]-=3;if(meld(c)){c[i]+=3;return true}c[i]+=3}if(i<27&&i%9<=6&&c[i+1]&&c[i+2]){c[i]--;c[i+1]--;c[i+2]--;if(meld(c)){c[i]++;c[i+1]++;c[i+2]++;return true}c[i]++;c[i+1]++;c[i+2]++}return false}
function win(a){if(a.length!=14)return false;let c=cs(a);if(c.filter(x=>x==2).length==7)return true;let k=[0,8,9,17,18,26,27,28,29,30,31,32,33];if(k.every(i=>c[i])&&k.some(i=>c[i]>=2))return true;for(let i=0;i<34;i++)if(c[i]>=2){c[i]-=2;if(meld(c)){c[i]+=2;return true}c[i]+=2}return false}
function waits(h){let r=[];for(let i=0;i<34;i++){let t=tile(i);if(cnt(h,t)<4&&win([...h,t]))r.push(t)}return r}
function cnt(a,t){return a.filter(x=>x==t).length}
function evaluate(h,t,discarder){let a=[...h,t],baseTenpai=waits(h).length>0,y=baseTenpai?["リーチ"]:[],han=baseTenpai?1:0,yak=false,c=cs(a);let k=[0,8,9,17,18,26,27,28,29,30,31,32,33];if(k.every(i=>c[i])&&k.some(i=>c[i]>=2)){yak=true;y=["国士無双"]}if(!yak){if(a.every(x=>x.length==2&&+x[0]>=2&&+x[0]<=8)){han++;y.push("タンヤオ")}if(c.filter(x=>x==2).length==7){han+=2;y.push("七対子")}for(let z of [["P","白"],["F","發"],["C","中"]])if(c[idx(z[0])]>=3){han++;y.push("役牌 "+z[1])}let d=cnt(a,de(G.dora));if(d){han+=d;y.push("ドラ"+d)}if(G.river[discarder].length==1){han++;y.push("一発")}if(G.river[discarder].length==17){han++;y.push("河底")}}return{han,yaku:y,yak}}
