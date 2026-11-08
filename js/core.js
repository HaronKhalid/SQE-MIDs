/* Core: helpers, tab navigation, progress tracking, reusable 'sorter' game */
/* ---------- helpers ---------- */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const fmt=n=>Math.round(n).toLocaleString("en-US");
const esc=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));

/* ---------- tabs ---------- */
const PAGES=[["home","Home"],["c1","Ch 1"],["c2","Ch 2"],["c3","Ch 3"],["c4","Ch 4"],["c5","Ch 5"],["quiz","Quiz"],["cards","Flashcards"],["sheet","Cheat Sheet"]];
function buildTabs(){
  $("#tabs").innerHTML=PAGES.map(([id,t])=>`<button data-go="${id}">${t}<small id="pc-${id}"></small></button>`).join("");
  $$("#tabs button").forEach(b=>b.onclick=()=>go(b.dataset.go));
}
function go(id,topic){
  if(!PAGES.some(p=>p[0]===id))id="home";
  $$(".page").forEach(p=>p.classList.toggle("on",p.id===id));
  $$("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.go===id));
  try{history.replaceState(null,"","#"+id)}catch(e){}
  if(topic){const el=document.querySelector(`[data-id="${topic}"]`);if(el)setTimeout(()=>el.scrollIntoView({behavior:"smooth",block:"start"}),50);}
  else window.scrollTo(0,0);
}

/* ---------- progress ---------- */
let done=store.get("sqe-done",{});
function setupTopics(){
  $$(".topic[data-id]").forEach(t=>{
    const h=$("h3",t),id=t.dataset.id;
    const num=document.createElement("span");num.className="tn";num.textContent=id.split("-")[1]+".";
    h.prepend(num);
    const b=document.createElement("button");b.className="done-btn";
    const upd=()=>{t.classList.toggle("done",!!done[id]);b.textContent=done[id]?"✓ Learned":"Mark learned"};
    b.onclick=()=>{done[id]=!done[id];store.set("sqe-done",done);upd();progress()};
    h.appendChild(b);upd();
  });
}
function progress(){
  const all=$$(".topic[data-id]");let d=0;const per={};
  all.forEach(t=>{const c=t.closest(".page").id;per[c]=per[c]||[0,0];per[c][1]++;if(done[t.dataset.id]){d++;per[c][0]++}});
  const pct=all.length?Math.round(d/all.length*100):0;
  $("#pfill").style.width=pct+"%";$("#ptext").textContent=pct+"% ("+d+" of "+all.length+" topics)";
  Object.keys(per).forEach(c=>{const e=$("#pc-"+c);if(e)e.textContent=" "+Math.round(per[c][0]/per[c][1]*100)+"%"});
  buildCov();
}
function buildCov(){
  const names={c1:"Chapter 1: Quality",c2:"Chapter 2: Quality Models",c3:"Chapter 3: Cost of Quality",c4:"Chapter 4: Quality Assurance",c5:"Chapter 5: Defect Containment"};
  $("#covmap").innerHTML=Object.keys(names).map(c=>`<div class="card"><b>${names[c]}</b>${$$(`#${c} .topic[data-id]`).map(t=>`<a href="#${c}" data-c="${c}" data-t="${t.dataset.id}"><span class="ck">${done[t.dataset.id]?"✅":"⬜"}</span>${t.dataset.id.split("-")[1]}. ${t.dataset.title}</a>`).join("")}</div>`).join("");
  $$("#covmap a").forEach(a=>a.onclick=e=>{e.preventDefault();go(a.dataset.c,a.dataset.t)});
}
$("#resetP").onclick=()=>{if(confirm("Reset all progress?")){done={};store.set("sqe-done",done);$$(".topic").forEach(t=>t.classList.remove("done"));$$(".done-btn").forEach(b=>b.textContent="Mark learned");progress()}};
$("#themeBtn").onclick=()=>{const r=document.documentElement;const n=r.dataset.theme==="dark"?"light":"dark";r.dataset.theme=n;store.set("sqe-theme",n)};
(function(){const t=store.get("sqe-theme",null)||(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t})();

/* ---------- generic sorter ---------- */
function sorter(id,cats,items){
  const el=document.getElementById(id);let q=shuffle(items),i=0,score=0,locked=false;
  function draw(){
    if(i>=q.length){el.innerHTML=`<div class="out"><span class="score">${score} / ${q.length}</span> ${score===q.length?"🎉 Perfect!":score>=q.length*0.7?"👍 Good, revise the missed ones.":"📚 Read the topic again, then retry."}<br><button class="b" style="margin-top:8px">Play again</button></div>`;
      $("button",el).onclick=()=>{q=shuffle(items);i=0;score=0;draw()};return}
    const it=q[i];locked=false;
    el.innerHTML=`<div class="out"><small>Question ${i+1} of ${q.length}</small><div class="urtxt" dir="auto" style="font-size:1.1rem;margin:6px 0">${esc(it.t)}</div>${it.e?`<div class="urtxt" dir="auto" style="color:var(--muted)">${esc(it.e)}</div>`:""}</div><div>${cats.map((c,k)=>`<button class="opt" data-k="${k}">${esc(c)}</button>`).join("")}</div><div id="${id}-fb"></div>`;
    $$("button.opt",el).forEach(b=>b.onclick=()=>{
      if(locked)return;locked=true;const k=+b.dataset.k;const ok=k===it.a;
      if(ok)score++;b.classList.add(ok?"right":"wrong");
      if(!ok)$$("button.opt",el)[it.a].classList.add("right");
      $("#"+id+"-fb").innerHTML=`<div class="out">${ok?'<span class="good">✔ Correct.</span>':'<span class="badc">✘ Not quite.</span>'} ${esc(it.w||"")}<br><button class="b" style="margin-top:8px">${i+1<q.length?"Next":"See score"}</button></div>`;
      $("#"+id+"-fb button").onclick=()=>{i++;draw()};
    });
  }
  draw();
}

