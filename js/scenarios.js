/* Scenarios: shared question engine (render / read / grade / feedback) + the Scenarios page.
   Content comes from scenario-data.js, progress from progress.js. */

const SC=SCENARIOS.filter(s=>s.published);
const SC_CATS={"model-identification":"Model identification","model-application":"Model application","model-comparison":"Model comparison","problem-diagnosis":"Problem diagnosis","solution-design":"Solution design","integrated":"Integrated case study"};
const DIFF_L={easy:"Easy",medium:"Medium",hard:"Hard"};
const STATUS={correct:["✔","Correct"],partial:["◐","Partly correct"],wrong:["✘","Incorrect"],unanswered:["○","Not answered"],written:["✎","Written answer (self-assess below)"]};
const RUBRIC=[["Correctly identifies the problem",2],["Selects a suitable model / concept",2],["Applies the model to the scenario facts",3],["Recommends a suitable action",2],["Gives a clear justification",1]];

/* lesson topic -> scenario tag, plus a short “where would you use this?” line */
const TOPIC_TAGS={"c1-1":"quality","c1-2":"quality","c1-3":"pressman","c1-4":"variation","c1-5":"design-conformance","c1-6":"design-conformance","c1-7":"objective-perceived","c1-8":"objective-perceived","c1-10":"qc",
 "c2-1":"model-selection","c2-2":"mccall","c2-3":"mccall","c2-4":"mccall","c2-5":"tradeoffs","c2-6":"iso-9126","c2-7":"boehm","c2-8":"furps","c2-9":"gqm","c2-10":"model-selection",
 "c3-1":"cost","c3-2":"prevention","c3-3":"appraisal","c3-4":"failure","c3-5":"intangible","c3-6":"cost","c3-7":"1-10-100","c3-8":"ecl","c3-9":"1-10-100",
 "c4-1":"qa","c4-2":"qa","c4-3":"prevention-techniques","c4-4":"prevention-techniques","c4-5":"prevention-techniques","c4-6":"inspection","c4-7":"walkthrough","c4-8":"black-white",
 "c5-1":"fault-tolerance","c5-2":"fault-tolerance","c5-3":"redundancy","c5-4":"recovery","c5-5":"fault-injection","c5-6":"diversity","c5-7":"recovery-block","c5-8":"nvp","c5-9":"nscp","c5-10":"retry","c5-11":"diversity","c5-12":"diversity","c5-13":"fta"};
const WHERE={
 "c1-1":"When a client says the product is “good” but it is late or over budget: check requirements, cost and time together.",
 "c1-3":"When writing a specification: also list the unwritten expectations such as stability and security.",
 "c1-5":"When a product misses its targets: decide whether the plan (design) or the build (conformance) is at fault.",
 "c1-7":"When users distrust a technically good product: look at perceived quality.",
 "c1-10":"Before every release: tests and reviews that find and remove defects.",
 "c2-3":"Explaining a banking app's failures to a manager: wrong balance = correctness, always working = reliability.",
 "c2-5":"When a client wants maximum security and maximum speed: explain the trade-off.",
 "c2-6":"Reviewing a finished product against six characteristics.",
 "c2-8":"Writing a requirements list: sort every item into F, U, R, P, S or a constraint.",
 "c2-9":"When a manager says “improve quality”: turn it into a goal, questions and metrics.",
 "c3-4":"Reporting where the money went after a bad release (refunds, help line, rework).",
 "c3-7":"Convincing management to pay for early reviews.",
 "c3-8":"Deciding how much testing and inspection is enough.",
 "c4-3":"When the same coding mistakes repeat: remove the cause with training and standards.",
 "c4-6":"A formal review of requirements or code before testing starts.",
 "c4-8":"Black-box: acceptance tests from the specification. White-box: tests that cover every branch.",
 "c5-4":"Banking transfers: undo to a safe state, or correct with compensation.",
 "c5-7":"Critical code with a backup routine that runs when the first one fails its check.",
 "c5-8":"Systems where several independent versions compute the answer and a voter decides.",
 "c5-13":"Analysing how a payment or control system could fail and where to add protection."};

/* ====================== shared question engine ====================== */
const fmtn=n=>String(Math.round(n*100)/100);
function typeNote(q){return {single:"Choose ONE answer.",multi:"Select ALL that apply. Partial credit: correct picks minus wrong picks.",match:"Choose a category for every item.",written:"Write your own answer, then compare it with the model answer (self-assessed)."}[q.type]}
function marksLabel(q){return q.type==="written"?"self-assessed":q.marks+(q.marks===1?" mark":" marks")}

function qInputs(q,pre,saved){
  if(q.type==="single")return `<div class="opts" role="radiogroup">`+q.options.map((o,i)=>`<label class="optrow"><input type="radio" name="${pre}" value="${i}" ${saved&&saved[0]===i?"checked":""}><span>${esc(o)}</span></label>`).join("")+`</div>`;
  if(q.type==="multi")return `<div class="opts">`+q.options.map((o,i)=>`<label class="optrow"><input type="checkbox" name="${pre}" value="${i}" ${saved&&saved.includes(i)?"checked":""}><span>${esc(o)}</span></label>`).join("")+`</div>`;
  if(q.type==="match")return q.items.map((it,i)=>`<div class="mrow"><label for="${pre}-${i}">${esc(it.t)}</label><select id="${pre}-${i}"><option value="">Choose…</option>${q.categories.map((c,k)=>`<option value="${k}" ${saved&&saved[i]===k?"selected":""}>${esc(c)}</option>`).join("")}</select></div>`).join("");
  return `<textarea id="${pre}" rows="5" placeholder="Write your answer here…" aria-label="Your answer">${esc(saved||"")}</textarea>`;
}
function qRead(q,root,pre){
  if(q.type==="single"){const c=root.querySelector(`input[name="${pre}"]:checked`);return c?[+c.value]:null}
  if(q.type==="multi"){const l=[...root.querySelectorAll(`input[name="${pre}"]:checked`)].map(x=>+x.value);return l.length?l:null}
  if(q.type==="match"){const l=q.items.map((_,i)=>{const v=root.querySelector(`#${pre}-${i}`).value;return v===""?null:+v});return l.some(v=>v!==null)?l:null}
  const t=root.querySelector("#"+pre).value.trim();return t||null;
}
function qGrade(q,ans){
  if(q.type==="written")return{got:0,max:0,status:ans?"written":"unanswered"};
  if(ans===null)return{got:0,max:q.marks,status:"unanswered"};
  if(q.type==="single"){const ok=ans[0]===q.answer[0];return{got:ok?1:0,max:1,status:ok?"correct":"wrong"}}
  if(q.type==="multi"){const n=q.answer.length,c=ans.filter(a=>q.answer.includes(a)).length,w=ans.length-c;const got=Math.max(0,c-w)/n*q.marks;return{got,max:q.marks,status:(c===n&&w===0)?"correct":got>0?"partial":"wrong"}}
  const got=q.items.filter((it,i)=>ans[i]===it.a).length;
  return{got,max:q.marks,status:got===q.marks?"correct":got>0?"partial":"wrong"};
}
function ansText(q,ans){
  if(ans===null||ans===undefined)return "—";
  if(q.type==="single")return esc(q.options[ans[0]]);
  if(q.type==="multi")return ans.map(i=>esc(q.options[i])).join("; ");
  if(q.type==="match")return "<ul>"+q.items.map((it,i)=>`<li>${esc(it.t)} → <b>${ans[i]===null?"(blank)":esc(q.categories[ans[i]])}</b></li>`).join("")+"</ul>";
  return esc(ans).replace(/\n/g,"<br>");
}
function correctText(q){
  if(q.type==="single"||q.type==="multi")return q.answer.map(i=>esc(q.options[i])).join("; ");
  if(q.type==="match")return "<ul>"+q.items.map(it=>`<li>${esc(it.t)} → <b>${esc(q.categories[it.a])}</b></li>`).join("")+"</ul>";
  return "";
}
function rubricHTML(pre){
  return `<div class="rubric" data-pre="${pre}"><b>Self-assessment rubric</b> <small class="muted">(tick what your answer really contains)</small>`+
   RUBRIC.map(([t,p],i)=>`<label class="optrow"><input type="checkbox" data-p="${p}"><span>${t} <small>(${p})</small></span></label>`).join("")+
   `<div class="rscore">Self score: <b>0</b> / 10</div></div>`;
}
function bindRubrics(root){
  root.querySelectorAll(".rubric").forEach(r=>{
    r.addEventListener("change",()=>{const s=[...r.querySelectorAll("input:checked")].reduce((a,x)=>a+ +x.dataset.p,0);r.querySelector(".rscore b").textContent=s});
  });
}
function qFeedback(q,ans,g,label){
  const [ic,tx]=STATUS[g.status];
  let h=`<div class="fb fb-${g.status}"><div class="fb-h"><span aria-hidden="true">${ic}</span> <b>${label?label+" — ":""}${tx}</b>${q.type!=="written"&&g.status!=="unanswered"?` · ${fmtn(g.got)} / ${g.max} mark${g.max===1?"":"s"}`:""}</div>`;
  h+=`<p class="fq">${esc(q.prompt)}</p>`;
  if(q.type==="written"){
    h+=`<p><b>Your answer:</b><br>${ansText(q,ans)}</p><div class="model"><b>Model answer</b><p>${esc(q.model)}</p></div>${rubricHTML("r")}`;
  }else{
    h+=`<div><b>Your answer:</b> ${ansText(q,ans)}</div>`;
    if(g.status!=="correct")h+=`<div><b>Correct answer:</b> ${correctText(q)}</div>`;
    h+=`<p class="explain">${esc(q.explain||"")}</p>`;
  }
  return h+`</div>`;
}

/* ====================== Scenarios page ====================== */
const SCS={ch:"all",cat:"all",diff:"all",status:"all",q:"",tag:""};
let scView="list",scCur=null,scMode="guided",scStage=0,scNotes={},scStartT=0,scTimerId=null,scTimeUp=false;
const scById=id=>SC.find(s=>s.id===id);
const scBox=()=>document.getElementById("scBox");
const scDone=id=>SQP.attemptsFor(id).length>0;
function scShow(){if(scView==="detail"&&scCur)scDetail();else scList()}
function scStopTimer(){if(scTimerId){clearInterval(scTimerId);scTimerId=null}}
function scByTag(tag){Object.assign(SCS,{ch:"all",cat:"all",diff:"all",status:"all",q:"",tag});scView="list";scCur=null;scStopTimer();go("scenarios")}
function scOpenById(id,mode){scCur=id;scMode=mode||"guided";scStage=0;scNotes={};scStopTimer();scView="detail";go("scenarios")}

function scBadges(s){
  return `<span class="badge">Chapter ${s.chapter}</span><span class="badge">${SC_CATS[s.category]}</span><span class="badge d-${s.difficulty}">${s.difficulty==="easy"?"●":s.difficulty==="medium"?"●●":"●●●"} ${DIFF_L[s.difficulty]}</span><span class="badge">⏱ ${s.minutes} min</span>`;
}
function scList(){
  scView="list";scCur=null;scStopTimer();
  const sel=(id,label,opts,val)=>`<div><label for="${id}">${label}</label><select id="${id}">${opts.map(([v,t])=>`<option value="${v}" ${v===val?"selected":""}>${t}</option>`).join("")}</select></div>`;
  scBox().innerHTML=`
   <p class="sc-lead">Read a real situation, find the quality problem, pick the right model, apply it, recommend a solution and justify it. This is how the exam asks questions.</p>
   <div class="card sc-filters">
     <div><label for="scQ">Search</label><input type="text" id="scQ" placeholder="e.g. McCall, refund, recovery" value="${esc(SCS.q)}"></div>
     <div class="row">
       ${sel("scCh","Chapter",[["all","All chapters"],...[1,2,3,4,5].map(c=>[String(c),"Chapter "+c])],SCS.ch)}
       ${sel("scCat","Category",[["all","All categories"],...Object.entries(SC_CATS)],SCS.cat)}
       ${sel("scDiff","Difficulty",[["all","Any difficulty"],["easy","Easy"],["medium","Medium"],["hard","Hard"]],SCS.diff)}
       ${sel("scSt","Status",[["all","All"],["new","Not started"],["done","Completed"]],SCS.status)}
     </div>
     ${SCS.tag?`<p class="tagnote">Showing topic <b>#${esc(SCS.tag)}</b> <button class="chip" id="scClearTag">Clear ✕</button></p>`:""}
   </div>
   <div id="scSummary" class="muted" role="status"></div>
   <div id="scCards" class="sc-grid"></div>`;
  const upd=()=>{SCS.q=$("#scQ").value;SCS.ch=$("#scCh").value;SCS.cat=$("#scCat").value;SCS.diff=$("#scDiff").value;SCS.status=$("#scSt").value;scCards()};
  ["scQ","scCh","scCat","scDiff","scSt"].forEach(id=>{$("#"+id).oninput=upd;$("#"+id).onchange=upd});
  const ct=$("#scClearTag");if(ct)ct.onclick=()=>{SCS.tag="";scList()};
  scCards();
}
function scFiltered(){
  const q=SCS.q.trim().toLowerCase();
  return SC.filter(s=>
    (SCS.ch==="all"||s.chapter===+SCS.ch)&&(SCS.cat==="all"||s.category===SCS.cat)&&(SCS.diff==="all"||s.difficulty===SCS.diff)&&
    (SCS.status==="all"||(SCS.status==="done")===scDone(s.id))&&(!SCS.tag||s.tags.includes(SCS.tag))&&
    (!q||(s.title+" "+s.description+" "+s.tags.join(" ")+" "+SC_CATS[s.category]).toLowerCase().includes(q)));
}
function scCards(){
  const l=scFiltered();
  $("#scSummary").textContent=l.length+" of "+SC.length+" scenarios · "+SC.filter(s=>scDone(s.id)).length+" completed";
  $("#scCards").innerHTML=l.length?l.map(s=>{
    const b=SQP.best(s.id);
    const summary=s.description.length>150?s.description.slice(0,147).replace(/\s+\S*$/,"")+"…":s.description;
    return `<article class="sc-card"><div class="sc-meta">${scBadges(s)}</div><h3>${esc(s.title)}</h3><p>${esc(summary)}</p>
      <div class="tags">${s.tags.slice(0,4).map(t=>`<span class="tag2">#${esc(t)}</span>`).join("")}</div>
      <div class="sc-foot"><span class="stat">${b?`✅ Completed · best ${fmtn(b.score)}/${b.max}`:"○ Not started"}</span><button class="b" data-open="${s.id}" aria-label="Start scenario: ${esc(s.title)}">${b?"Practise again":"Start"}</button></div></article>`}).join(""):
    `<div class="card">No scenarios match these filters. <button class="b alt" id="scReset">Reset filters</button></div>`;
  $$("#scCards [data-open]").forEach(b=>b.onclick=()=>scOpenById(b.dataset.open));
  const r=$("#scReset");if(r)r.onclick=()=>{Object.assign(SCS,{ch:"all",cat:"all",diff:"all",status:"all",q:"",tag:""});scList()};
}

/* ---------- detail view ---------- */
function topicTitle(id){const t=document.querySelector(`.topic[data-id="${id}"]`);return t?t.dataset.title:id}
function scDetail(){
  const s=scById(scCur);if(!s){scList();return}
  scView="detail";const b=SQP.best(s.id);
  scBox().innerHTML=`<button class="b alt" id="scBack">← All scenarios</button>
  <div class="sc-layout"><div class="sc-main">
    <h2 style="margin-top:12px">${esc(s.title)}</h2><div class="sc-meta">${scBadges(s)}</div>
    <div class="case"><div class="case-h">📋 Situation</div><p>${esc(s.description)}</p></div>
    <div class="chips" role="group" aria-label="Practice mode">
      <button class="chip ${scMode==="guided"?"on":""}" data-m="guided" aria-pressed="${scMode==="guided"}">🧭 Guided practice</button>
      <button class="chip ${scMode==="exam"?"on":""}" data-m="exam" aria-pressed="${scMode==="exam"}">⏱ Exam mode</button></div>
    <div id="scBody"></div>
  </div><aside class="sc-side">
    <div class="card"><b>About this scenario</b><ul class="plain"><li>Chapter ${s.chapter}</li><li>${SC_CATS[s.category]}</li><li>${DIFF_L[s.difficulty]} · about ${s.minutes} min</li><li>${b?`Best: ${fmtn(b.score)}/${b.max}`:"Not attempted yet"}</li></ul></div>
    <div class="card"><b>Related lessons</b><div class="relbtns">${s.related.map(id=>`<button class="chip" data-t="${id}">📖 ${esc(topicTitle(id))}</button>`).join("")}</div></div>
  </aside></div>`;
  $("#scBack").onclick=()=>{scStopTimer();scList()};
  $$(".sc-main [data-m]").forEach(c=>c.onclick=()=>{scMode=c.dataset.m;scStage=0;scNotes={};scStopTimer();scDetail()});
  $$(".sc-side [data-t]").forEach(c=>c.onclick=()=>go("c"+scChapOf(c.dataset.t),c.dataset.t));
  scBodyRender(s);
}
const scChapOf=tid=>tid.match(/^c(\d)/)[1];
function scBodyRender(s){scMode==="guided"?scGuided(s):scExamSetup(s)}

/* ---------- guided practice: five thinking stages, then questions ---------- */
const STAGES=[
 ["A","Understand the problem","What is happening? What is the main quality concern? Which facts in the case matter?",s=>s.solution.problem],
 ["B","Identify the concept","Which model, factor, cost category, QA technique or containment method applies? Why is it relevant?",s=>s.solution.concepts],
 ["C","Apply it","Connect the facts to the model's characteristics or steps. Do not just write a definition.",s=>s.solution.apply],
 ["D","Recommend an action","Suggest a practical action. How would you measure success?",s=>s.solution.recs],
 ["E","Justify your choice","Why is this suitable? Mention limits or trade-offs.",s=>[s.solution.just,...s.solution.mistakes.map(m=>"Common mistake: "+m)]]];
function scGuided(s){
  const body=document.getElementById("scBody");
  if(scStage>=STAGES.length){scQuestions(s,{exam:false});return}
  const [L,title,prompt,get]=STAGES[scStage];
  body.innerHTML=`<div class="card stage">
    <div class="stage-top">Stage ${L} of E · try it yourself first</div><h3>${title}</h3><p>${prompt}</p>
    <label for="scNote">Your thinking (optional, not graded)</label>
    <textarea id="scNote" rows="4" placeholder="Write your answer for this stage…">${esc(scNotes[scStage]||"")}</textarea>
    <div class="btnrow"><button class="b alt" id="scHint">💡 Show hint</button><button class="b alt" id="scRev">👁 Reveal explanation</button></div>
    <div id="scHintBox" class="hintbox" hidden></div><div id="scRevBox" class="revbox" hidden></div>
    <div class="btnrow"><button class="b alt" id="scPrev" ${scStage?"":"disabled"}>← Back</button><button class="b" id="scNext">${scStage===STAGES.length-1?"Go to the questions →":"Next stage →"}</button></div></div>`;
  const save=()=>{scNotes[scStage]=$("#scNote").value};
  $("#scNote").oninput=save;
  $("#scHint").onclick=()=>{const h=$("#scHintBox");h.hidden=!h.hidden;h.innerHTML="💡 "+esc((s.hints&&s.hints[scStage])||"Re-read the situation and underline the key facts.")};
  $("#scRev").onclick=()=>{const r=$("#scRevBox");r.hidden=!r.hidden;r.innerHTML="<b>Teaching explanation</b><ul>"+get(s).map(x=>`<li>${esc(x)}</li>`).join("")+"</ul>"};
  $("#scPrev").onclick=()=>{save();scStage--;scGuided(s);scrollToBody()};
  $("#scNext").onclick=()=>{save();scStage++;scGuided(s);scrollToBody()};
}
function scrollToBody(){const b=document.getElementById("scBody");if(b)b.scrollIntoView({behavior:"smooth",block:"start"})}

/* ---------- exam mode ---------- */
function scExamSetup(s){
  const mins=[...new Set([s.minutes,5,10,15,20,30])].sort((a,b)=>a-b);
  document.getElementById("scBody").innerHTML=`<div class="card"><h3>⏱ Exam mode</h3>
    <ul><li>No hints and no explanations while you work.</li><li>The solution appears only after you submit.</li><li>You can leave questions unanswered and review them before submitting.</li><li>Your score is saved on this device.</li></ul>
    <label for="scTime">Timer</label><select id="scTime">${mins.map(m=>`<option value="${m}" ${m===s.minutes?"selected":""}>${m} minutes${m===s.minutes?" (suggested)":""}</option>`).join("")}<option value="0">No timer</option></select>
    <div class="btnrow"><button class="b" id="scStartExam">Start exam</button></div></div>`;
  $("#scStartExam").onclick=()=>{const m=+$("#scTime").value;scQuestions(s,{exam:true,minutes:m})};
}

/* ---------- questions (guided + exam) ---------- */
function scQuestions(s,o){
  const body=document.getElementById("scBody");scTimeUp=false;scStartT=Date.now();let confirmed=false;
  body.innerHTML=(o.exam&&o.minutes?`<div class="timerbar" id="scTimer" role="timer">⏱ ${o.minutes}:00</div>`:"")+
   `<h3 id="scQTitle" tabindex="-1">${o.exam?"Exam questions":"Now answer the questions"}</h3>
    <p class="muted">${o.exam?"Solutions are hidden until you submit.":"You can check your answers after answering."} Written answers are self-assessed.</p>
    <form id="scForm" novalidate>${s.questions.map((q,i)=>`<fieldset class="qbox" id="qb${i}"><legend>Q${i+1}. ${esc(q.prompt)} <span class="marks">${marksLabel(q)}</span></legend><p class="qnote">${typeNote(q)}</p>${qInputs(q,"sq"+i)}</fieldset>`).join("")}
    <div id="scWarn" role="alert"></div><button type="submit" class="b" id="scSubmit">${o.exam?"Submit exam":"Check answers"}</button></form>`;
  scrollToBody();
  const form=$("#scForm");
  form.onsubmit=e=>{
    e.preventDefault();
    const answers=s.questions.map((q,i)=>qRead(q,form,"sq"+i));
    const blank=s.questions.map((q,i)=>answers[i]===null?i:-1).filter(i=>i>=0);
    if(o.exam&&blank.length&&!confirmed&&!scTimeUp){
      confirmed=true;
      $$(".qbox",form).forEach((f,i)=>f.classList.toggle("blank",blank.includes(i)));
      $("#scWarn").innerHTML=`<div class="warn">${blank.length} question${blank.length>1?"s are":" is"} not answered: ${blank.map(i=>"Q"+(i+1)).join(", ")}. Review them, or press Submit again to submit anyway.</div>`;
      document.getElementById("qb"+blank[0]).scrollIntoView({behavior:"smooth",block:"center"});
      $("#scSubmit").textContent="Submit anyway";return;
    }
    scStopTimer();scFinish(s,answers,o);
  };
  if(o.exam&&o.minutes){
    const end=Date.now()+o.minutes*60000;
    scStopTimer();
    scTimerId=setInterval(()=>{
      const t=document.getElementById("scTimer");
      if(!t||!document.getElementById("scForm")){scStopTimer();return}
      const left=Math.max(0,Math.round((end-Date.now())/1000));
      t.textContent="⏱ "+Math.floor(left/60)+":"+String(left%60).padStart(2,"0");
      t.classList.toggle("low",left<=60);
      if(left<=0){scTimeUp=true;scStopTimer();document.getElementById("scForm").requestSubmit()}
    },1000);
  }
}

/* ---------- results ---------- */
function scFinish(s,answers,o){
  const grades=s.questions.map((q,i)=>qGrade(q,answers[i]));
  const score=grades.reduce((a,g)=>a+g.got,0),max=grades.reduce((a,g)=>a+g.max,0);
  const secs=Math.round((Date.now()-scStartT)/1000);
  const weak=grades.some((g,i)=>s.questions[i].type!=="written"&&g.status!=="correct");
  SQP.addAttempt({id:s.id,mode:o.exam?"exam":"guided",ts:Date.now(),score:Math.round(score*100)/100,max,seconds:secs,weakTags:weak?s.tags:[],unanswered:grades.filter(g=>g.status==="unanswered").length});
  const pct=max?Math.round(score/max*100):100;
  const verdict=pct>=85?"Excellent: you applied the concepts well.":pct>=60?"Good. Read the feedback and the lessons below to close the gaps.":"Keep practising. Open the related lessons, then try this scenario again.";
  const sl=s.solution,li=a=>"<ul>"+a.map(x=>`<li>${esc(x)}</li>`).join("")+"</ul>";
  const idx=SC.findIndex(x=>x.id===s.id);
  const next=SC.slice(idx+1).concat(SC.slice(0,idx)).find(x=>!scDone(x.id))||SC[(idx+1)%SC.length];
  document.getElementById("scBody").innerHTML=`<div class="result" id="scRes" tabindex="-1">
    <h3>${o.exam?"Exam result":"Your result"}</h3>
    ${scTimeUp?`<div class="warn">Time was up, so the exam was submitted automatically.</div>`:""}
    <div class="big">${fmtn(score)} / ${max} <small>(${pct}%)</small></div>
    <p>${verdict}</p><p class="muted">Time: ${Math.floor(secs/60)}m ${secs%60}s · ${grades.filter(g=>g.status==="unanswered").length} unanswered · written answers are not in the score (self-assess below)</p>
    ${s.questions.map((q,i)=>qFeedback(q,answers[i],grades[i],"Q"+(i+1))).join("")}
    <div class="card solution"><h3>✅ Recommended solution</h3>
      <b>1. Problem identification</b>${li(sl.problem)}
      <b>2. Concepts / models that apply</b>${li(sl.concepts)}
      <b>3. Model application breakdown</b>${li(sl.apply)}
      <b>4. Recommended actions</b>${li(sl.recs)}
      <b>5. Why this works</b><p>${esc(sl.just)}</p>
      <b>6. Common mistakes</b>${li(sl.mistakes)}</div>
    <div class="card"><b>📖 Revise the related lessons</b><div class="relbtns">${s.related.map(id=>`<button class="chip" data-t="${id}">${esc(topicTitle(id))}</button>`).join("")}</div></div>
    <div class="btnrow"><button class="b" id="scNextSc">Next scenario →</button><button class="b alt" id="scRetry">Try this one again</button><button class="b alt" id="scToList">All scenarios</button></div></div>`;
  bindRubrics(document.getElementById("scBody"));
  $$("#scRes [data-t]").forEach(c=>c.onclick=()=>go("c"+scChapOf(c.dataset.t),c.dataset.t));
  $("#scNextSc").onclick=()=>scOpenById(next.id,scMode);
  $("#scRetry").onclick=()=>{scStage=0;scNotes={};scDetail()};
  $("#scToList").onclick=()=>scList();
  const r=document.getElementById("scRes");r.scrollIntoView({behavior:"smooth",block:"start"});r.focus({preventScroll:true});
  progress();
}

/* ====================== home summary + lesson links ====================== */
function renderHomeScenarios(){
  const el=document.getElementById("homeScen");if(!el)return;
  const doneL=SC.filter(s=>scDone(s.id));
  const rows=[1,2,3,4,5].map(c=>{
    const l=SC.filter(s=>s.chapter===c),d=l.filter(s=>scDone(s.id));
    const bests=d.map(s=>SQP.best(s.id)).filter(b=>b&&b.max);
    const avg=bests.length?Math.round(bests.reduce((a,b)=>a+b.score/b.max,0)/bests.length*100):null;
    return `<span class="chbadge">Ch ${c}: ${d.length}/${l.length}${avg!==null?" · avg "+avg+"%":""}</span>`}).join("");
  const nextS=SC.find(s=>!scDone(s.id))||SC[0];
  el.innerHTML=`<div class="card sc-home"><h2 style="margin-top:0">🧩 Practice Scenarios</h2>
    <p>Learn to identify, select and apply SQE models to real-world problems.</p>
    <div class="meter"><i style="width:${SC.length?Math.round(doneL.length/SC.length*100):0}%"></i></div>
    <p class="muted" style="margin:6px 0 12px">${doneL.length} of ${SC.length} scenarios completed</p>
    <div class="btnrow"><button class="b" id="homeScBtn">▶ ${doneL.length?"Continue practising":"Start a scenario"}</button><button class="b alt" id="homeScAll">Browse all</button></div>
    <div class="chbreak">${rows}</div>
    <p class="muted" style="margin:10px 0 0;font-size:.85rem"><b>Learn</b> = Chapters · <b>Revise</b> = Flashcards and Cheat sheet · <b>Practice</b> = Scenarios and Quiz. Progress is saved in this browser only and does not sync across devices.</p></div>`;
  $("#homeScBtn").onclick=()=>scOpenById(nextS.id);
  $("#homeScAll").onclick=()=>{scView="list";go("scenarios")};
}
function addTopicLinks(){
  $$(".topic[data-id]").forEach(t=>{
    const id=t.dataset.id,tag=TOPIC_TAGS[id];
    const n=tag?SC.filter(s=>s.tags.includes(tag)).length:0;
    if(!WHERE[id]&&!n)return;
    const body=$(".tbody",t),anchor=$(".learn-btn",body);
    const box=document.createElement("div");box.className="applybox";
    box.innerHTML=(WHERE[id]?`<p><b>📍 Where would you use this?</b> ${esc(WHERE[id])}</p>`:"")+(n?`<button class="b alt">🧩 Practise ${n} scenario${n>1?"s":""} on this topic</button>`:"");
    body.insertBefore(box,anchor);
    const b=$("button",box);if(b)b.onclick=()=>scByTag(tag);
  });
}
