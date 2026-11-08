/* Interactive labs for chapters 1-5 (calculators, simulators, classify games) */
/* ---------- Chapter 1 labs ---------- */
sorter("s-who",["Juran","IEEE","ISO 8402","Weinberg","Pressman"],[
 {t:"Fitness for purpose",a:0,w:"Joseph Juran."},
 {t:"Quality is value to some person (it is subjective).",a:3,w:"Gerald Weinberg."},
 {t:"Degree to which a system meets specified requirements AND customer needs or expectations.",a:1,w:"IEEE Glossary."},
 {t:"Totality of features that bear on the ability to satisfy specified or implied needs.",a:2,w:"ISO 8402."},
 {t:"Conformance to explicit requirements, documented standards and implicit characteristics.",a:4,w:"Roger Pressman's software quality definition."},
 {t:"کوالٹی ہر شخص کے لیے مختلف ہو سکتی ہے کیونکہ یہ ذاتی رائے ہے۔",a:3,w:"Weinberg: subjective."}]);
sorter("s-design",["Quality of Design","Quality of Conformance"],[
 {t:"آرکیٹیکٹ نے گھر کا نقشہ خاندان کی ضرورت کے مطابق بنایا۔",a:0,w:"Planning what to build = design."},
 {t:"مستری نے نقشے کے مطابق دیواریں سیدھی اور صحیح اونچائی پر بنائیں۔",a:1,w:"Building as per design = conformance."},
 {t:"ٹیم نے سوچا کہ ایپ میں کون سے فیچرز اور اسکرینیں ہوں گی۔",a:0,w:"Deciding the product = design."},
 {t:"پروگرامر نے ڈیزائن ڈاکومنٹ کے مطابق کوڈ لکھا اور tolerance کے اندر رکھا۔",a:1,w:"Implementation according to design."},
 {t:"کل لاگت کا صرف 5٪ مگر معیار پر 70٪ اثر۔",a:0,w:"The famous 5% / 70% fact is about design."},
 {t:"سموسہ 100 گرام ڈیزائن تھا اور تیار ہو کر 98 گرام نکلا۔",a:1,w:"Within tolerance → good conformance."}]);
$$("#tg,#tl,#tm").forEach(e=>e.oninput=tol);
function tol(){
  const t=+$("#tg").value,l=Math.abs(+$("#tl").value),m=+$("#tm").value,lo=t-l,hi=t+l,ok=m>=lo&&m<=hi;
  const span=Math.max(l*3,Math.abs(m-t)*1.2,1),pos=50+(m-t)/span*50;
  $("#tout").innerHTML=`Allowed range: <b>${lo} to ${hi}</b><br>Measured <b>${m}</b> is ${ok?'<span class="good">WITHIN tolerance → conforms ✔</span>':'<span class="badc">OUTSIDE tolerance → does NOT conform ✘</span>'} (deviation ${(m-t>0?"+":"")+(m-t)})
  <div style="position:relative;height:26px;margin-top:8px;background:var(--line);border-radius:6px"><div style="position:absolute;left:${50-l/span*50}%;width:${l/span*100}%;top:0;bottom:0;background:var(--ok-soft);border:1px solid var(--ok)"></div><div style="position:absolute;left:50%;top:0;bottom:0;width:2px;background:var(--ink)"></div><div style="position:absolute;left:${Math.max(0,Math.min(98,pos))}%;top:2px;width:10px;height:22px;border-radius:5px;background:${ok?"var(--ok)":"var(--bad)"}"></div></div><small>Black line = target · green = tolerance zone · dot = measured</small>`;
}
tol();
sorter("s-obj",["Objective quality","Perceived quality"],[
 {t:"موبائل میں 8GB ریم اور 5000mAh بیٹری ہے۔",a:0,w:"Measurable attributes."},
 {t:"لوگ کہتے ہیں فلاں برانڈ سب سے بھروسے مند ہے، حالانکہ انہوں نے کبھی استعمال نہیں کیا۔",a:1,w:"Opinion without using the product."},
 {t:"ٹیسٹ میں ایپ 1 سیکنڈ میں کھلتی ہے۔",a:0,w:"Instrument measurement."},
 {t:"اشتہار اور دوستوں کی رائے سے گاہک سمجھتا ہے کہ کمپنی اچھی ہے۔",a:1,w:"Based on advertising and others' experience."},
 {t:"Google بہتر تھا مگر لوگوں کو اسے بہترین ماننے میں 3 سال لگے۔",a:1,w:"The slide's example of perception lagging."},
 {t:"Hard disk capacity and processing speed of a PC.",a:0,w:"Objective attributes in the slide."}]);
function mg(){
  const dir=$("#mgDir").value,rep=$("#mgRep").value;
  const f=t=>{let full;
    if(dir==="up")full=rep==="high"?3:6; else full=rep==="high"?4:3;
    return Math.min(1,0.2+(t-1)*0.8/(full-1))};
  $("#mgOut").innerHTML=[1,2,3,4,5,6,7].map(y=>{const p=Math.round(f(y)*100);return `<div style="display:flex;gap:8px;align-items:center"><span style="width:60px">Year ${y}</span><div class="bar" style="width:${p*0.8}%;background:${dir==="up"?"var(--ok)":"var(--bad)"}">${p}%</div></div>`}).join("");
}
$("#mgDir").onchange=$("#mgRep").onchange=mg;mg();
sorter("s-qaqc",["QA (process / framework)","QC (checking the product)"],[
 {t:"کمپنی بھر کے لیے کوڈنگ اسٹینڈرڈ اور طریقہ کار بنانا۔",a:0,w:"Framework of procedures and standards = QA."},
 {t:"ریلیز سے پہلے تیار ایپ ٹیسٹ کر کے بگ ڈھونڈنا۔",a:1,w:"Finding defects in the product before shipment = QC."},
 {t:"ریویو کر کے شپمنٹ سے پہلے نقص نکالنا۔",a:1,w:"QC: reviews and removal of defects before shipment."},
 {t:"یقینی بنانا کہ ٹیم پراسیس فالو کر رہی ہے تاکہ مینجمنٹ کو یقین ہو۔",a:0,w:"“Assurance”: if the process is followed, quality is assured."}]);

/* ---------- Chapter 2 labs ---------- */
sorter("s-mcarea",["Product Revision","Product Transition","Product Operation"],[
 {t:"ایپ میں نیا فیچر آسانی سے شامل ہو جائے۔",a:0,w:"Flexibility → Revision."},
 {t:"ایپ اینڈرائیڈ اور آئی فون دونوں پر چلے۔",a:1,w:"Portability → Transition."},
 {t:"ایپ ہر بار صحیح حساب دے۔",a:2,w:"Correctness/Reliability → Operation."},
 {t:"ٹیسٹر آسانی سے ٹیسٹ کر سکے۔",a:0,w:"Testability → Revision."},
 {t:"ایپ بینک کے سسٹم سے جڑ سکے۔",a:1,w:"Interoperability → Transition."},
 {t:"غیر مجاز بندہ ڈیٹا نہ دیکھ سکے۔",a:2,w:"Integrity → Operation."},
 {t:"پرانا کوڈ نئے پروجیکٹ میں دوبارہ استعمال ہو۔",a:1,w:"Reusability → Transition."},
 {t:"بگ ملے تو جلد ٹھیک ہو جائے۔",a:0,w:"Maintainability → Revision."}]);
const MCF=["Maintainability","Flexibility","Testability","Portability","Reusability","Interoperability","Correctness","Reliability","Efficiency","Integrity","Usability"];
sorter("s-mcf",MCF,[
 {t:"Can I fix it?",e:"کیا میں اسے ٹھیک کر سکتا ہوں؟",a:0},{t:"Can I change it?",e:"کیا میں اسے بدل سکتا ہوں؟",a:1},{t:"Can I test it?",e:"کیا میں اسے ٹیسٹ کر سکتا ہوں؟",a:2},
 {t:"Will I be able to use it on another machine?",e:"کیا کسی دوسری مشین پر چلے گا؟",a:3},{t:"Will I be able to reuse some of the software?",e:"کیا اس کا کچھ حصہ دوبارہ استعمال ہو سکتا ہے؟",a:4},
 {t:"Will I be able to interface it with another application?",e:"کیا کسی دوسری ایپ سے جڑ سکتا ہے؟",a:5},{t:"Does it do what I want?",e:"کیا یہ وہی کرتا ہے جو میں چاہتا ہوں؟",a:6},
 {t:"Does it do it accurately all the time?",e:"کیا یہ ہر بار درست کام کرتا ہے؟",a:7},{t:"Will it run on my machine as well as it can?",e:"کیا میری مشین پر بہترین چلے گا؟",a:8},
 {t:"Is it secure?",e:"کیا یہ محفوظ ہے؟",a:9},{t:"Can I run it?",e:"کیا میں اسے چلا سکتا ہوں؟",a:10}]);
function trade(){
  const a=+$("#tr1").value,b=+$("#tr2").value;$("#tr1v").textContent=a;$("#tr2v").textContent=b;
  $("#tr1a").style.width=(10+a*10)+"%";$("#tr1a").textContent="Security "+(a*12.5)+"%";
  $("#tr1b").style.width=(100-a*9)+"%";$("#tr1b").textContent="Speed (efficiency) ⬇ "+Math.round(100-a*9)+"%";
  $("#tr2a").style.width=(10+b*10)+"%";$("#tr2a").textContent="Maintainability "+(b*12.5)+"%";
  $("#tr2b").style.width=(10+b*10)+"%";$("#tr2b").textContent="Flexibility ⬆ "+(b*12.5)+"%";
}
$("#tr1").oninput=$("#tr2").oninput=trade;trade();
const ISO={
 "Functionality":[["Suitability","Has the right set of functions for the tasks","ایپ میں وہی فیچرز ہوں جن کی ضرورت ہے (مثلاً بل بھرنے کی سہولت)"],["Accuracy","Gives right/agreed results","بیلنس بالکل درست"],["Interoperability","Works with other systems","ایپ بینک سے جڑ جائے"],["Security","Protects data from unauthorized access","پاس ورڈ اور OTP"],["Compliance","Follows standards and laws","اسٹیٹ بینک کے قواعد کی پابندی"]],
 "Reliability":[["Maturity","Few failures caused by faults","پرانی آزمودہ ایپ کم کریش ہوتی ہے"],["Fault tolerance","Keeps working even with faults","نیٹ سلو ہو تو بھی ایپ چلتی رہے"],["Recoverability","Can recover data and performance after failure","کریش کے بعد لین دین واپس مل جائے"],["Compliance","Follows reliability standards","معیار کی پابندی"]],
 "Usability":[["Understandability","User understands what it does","بٹنوں کے نام سمجھ آئیں"],["Learnability","Easy to learn","نیا بندہ ایک منٹ میں سیکھ لے"],["Operability","Easy to operate and control","کم کلکس میں کام ہو جائے"],["Attractiveness","Pleasing look","خوبصورت ڈیزائن"],["Compliance","Follows usability standards","معیار کی پابندی"]],
 "Efficiency":[["Time behaviour","Response and processing time","ایپ 2 سیکنڈ میں کھلے"],["Resource utilisation","Amount of CPU/memory/battery used","بیٹری کم کھائے"],["Compliance","Follows efficiency standards","معیار کی پابندی"]],
 "Maintainability":[["Analysability","Easy to find cause of failure","لاگ دیکھ کر وجہ مل جائے"],["Changeability","Easy to modify","نیا فیچر آسانی سے لگے"],["Stability","Changes don't cause unexpected effects","ایک جگہ بدلا تو دوسری جگہ خراب نہ ہو"],["Testability","Easy to test after change","بدلے ہوئے حصے کا ٹیسٹ آسان"],["Compliance","Follows maintainability standards","معیار کی پابندی"]],
 "Portability":[["Adaptability","Can adapt to different environments","مختلف اسکرین سائز پر چلے"],["Installability","Easy to install","ایک کلک انسٹال"],["Co-existence","Lives with other software in same environment","دوسری ایپس کے ساتھ جھگڑا نہ کرے"],["Replaceability","Can replace another software","پرانی ایپ کی جگہ لے سکے"],["Compliance","Follows portability standards","معیار کی پابندی"]]};
$("#isoChips").innerHTML=Object.keys(ISO).map(k=>`<button class="chip" data-k="${k}">${k} (${ISO[k].length})</button>`).join("");
$$("#isoChips .chip").forEach(c=>c.onclick=()=>{$$("#isoChips .chip").forEach(x=>x.classList.toggle("on",x===c));
 $("#isoOut").innerHTML=`<b>${c.dataset.k}</b><div class="scroll"><table><tr><th>Sub-characteristic</th><th>Meaning</th><th>اردو مثال (بینکنگ ایپ)</th></tr>${ISO[c.dataset.k].map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td class="urtxt" dir="rtl">${r[2]}</td></tr>`).join("")}</table></div>`});
sorter("s-furps",["Functionality","Usability","Reliability","Performance","Supportability","+ Design","+ Implementation","+ Interface","+ Physical"],[
 {t:"The persistence will be handled by a relational database.",e:"ڈیٹا ریلیشنل ڈیٹا بیس میں محفوظ ہوگا۔",a:5,w:"Design requirement (slide)."},
 {t:"The database will be Oracle 8i.",e:"ڈیٹا بیس Oracle 8i ہوگا۔",a:6,w:"Implementation requirement: constrains technology (slide)."},
 {t:"The system will run 7 days a week, 24 hours a day.",e:"سسٹم ہفتے کے سات دن 24 گھنٹے چلے گا۔",a:2,w:"Reliability (availability) (slide)."},
 {t:"An online help system is required.",e:"آن لائن ہیلپ ضروری ہے۔",a:1,w:"Usability (documentation/help) (slide)."},
 {t:"All presentation logic will be written in Visual Basic.",e:"تمام presentation logic Visual Basic میں لکھا جائے گا۔",a:6,w:"Implementation: constrains the language (slide)."},
 {t:"Pages must load within 2 seconds.",e:"صفحہ 2 سیکنڈ میں کھلے۔",a:3,w:"Performance: response time."},
 {t:"The system must connect to the bank's payment gateway.",e:"سسٹم بینک کے پیمنٹ گیٹ وے سے جڑے۔",a:7,w:"Interface requirement: interacts with an external item."},
 {t:"The handheld device must weigh under 200 g.",e:"ہینڈ ہیلڈ ڈیوائس کا وزن 200 گرام سے کم ہو۔",a:8,w:"Physical requirement: shape, size, weight."},
 {t:"The system should be extendable with new modules later.",e:"بعد میں نئے ماڈیول جوڑے جا سکیں۔",a:4,w:"Supportability: extend, adapt, correct."},
 {t:"The system shall calculate the monthly bill for each customer.",e:"سسٹم ہر گاہک کا ماہانہ بل بنائے۔",a:0,w:"Functionality: what the system does."}]);
const GQM=[
 {g:"Improve the quality of testing",q:[["How many defects are found before release?","Defects found in testing per KLOC"],["How effective are our test cases?","% of requirements covered by tests"]],u:"ٹیسٹنگ بہتر بنانا"},
 {g:"Reduce rework / cost of poor quality",q:[["How much time is spent fixing defects?","Rework hours per week"],["How many defects escape to customers?","Customer-reported defects per release"]],u:"دوبارہ کام کم کرنا"},
 {g:"Improve customer satisfaction",q:[["Are customers happy with the product?","Satisfaction survey score (1–5)"],["How fast are issues resolved?","Average days to close a complaint"]],u:"گاہک کی تسلی بڑھانا"},
 {g:"Deliver on time",q:[["How accurate are our time estimates?","Planned vs actual days (variation %)"],["How many tasks are finished each week?","Tasks completed per sprint"]],u:"وقت پر ڈلیوری"}];
$("#gqmChips").innerHTML=GQM.map((x,i)=>`<button class="chip" data-i="${i}">${x.g}</button>`).join("");
$$("#gqmChips .chip").forEach(c=>c.onclick=()=>{$$("#gqmChips .chip").forEach(x=>x.classList.toggle("on",x===c));const x=GQM[c.dataset.i];
 $("#gqmOut").innerHTML=`<b>🎯 Goal:</b> ${x.g} <span class="urtxt" dir="rtl">(${x.u})</span><ul>${x.q.map(r=>`<li><b>❓ Question:</b> ${r[0]}<ul><li><b>📏 Metric:</b> ${r[1]}</li></ul></li>`).join("")}</ul>`});
function gq(){const g=$("#gG").value.trim(),q=$("#gQ").value.trim(),m=$("#gM").value.trim();
 $("#gOut").innerHTML=(g||q||m)?`🎯 <b>Goal:</b> ${esc(g)||"…"} → ❓ <b>Question:</b> ${esc(q)||"…"} → 📏 <b>Metric:</b> ${esc(m)||"…"}${g&&q&&m?'<br><span class="good">✔ Complete GQM chain!</span>':""}`:"Fill the three boxes to see your GQM chain."}
$$("#gG,#gQ,#gM").forEach(e=>e.oninput=gq);
const PR={
 "Banking app":{t:["Integrity (security)","Reliability","Correctness","Usability"],w:"Money is involved: security, accuracy and always-on matter more than raw speed. Expect efficiency to suffer a little (trade-off).",u:"بینکنگ ایپ میں سیکیورٹی اور درستگی سب سے اہم ہے۔"},
 "Mobile game":{t:["Efficiency","Usability","Portability"],w:"Smooth speed and fun interface win. Deep security is less critical.",u:"گیم میں رفتار اور مزہ اہم ہے۔"},
 "Hospital system":{t:["Reliability","Correctness","Integrity","Usability"],w:"Wrong or unavailable data can harm patients. Also needs privacy.",u:"ہسپتال میں غلطی جان لیوا ہو سکتی ہے، اس لیے درستگی اور ہمیشہ چلنا لازمی ہے۔"},
 "Long-life company software":{t:["Maintainability","Flexibility","Testability","Reusability"],w:"It will change for years, so ease of change and testing is key.",u:"جو سافٹ ویئر برسوں چلے گا اس میں تبدیلی آسان ہونی چاہیے۔"},
 "Software for many devices":{t:["Portability","Interoperability","Usability"],w:"Must run on many platforms and connect to others.",u:"جو بہت سی ڈیوائسز پر چلے اس کے لیے portability اہم ہے۔"}};
$("#prChips").innerHTML=Object.keys(PR).map(k=>`<button class="chip" data-k="${k}">${k}</button>`).join("");
$$("#prChips .chip").forEach(c=>c.onclick=()=>{$$("#prChips .chip").forEach(x=>x.classList.toggle("on",x===c));const x=PR[c.dataset.k];
 $("#prOut").innerHTML=`<b>Top priorities:</b> ${x.t.map((a,i)=>`${i+1}. ${a}`).join(" · ")}<br>${x.w}<div class="urtxt" dir="rtl">${x.u}</div>`});

/* ---------- Chapter 3 labs ---------- */
sorter("s-cost",["Prevention","Appraisal","Internal failure","External failure","Intangible"],[
 {t:"عملے کی ٹریننگ۔",e:"Staff training",a:0,w:"Prevents defects."},
 {t:"کوالٹی پلاننگ میٹنگ۔",e:"Quality planning",a:0,w:"Prevention cost."},
 {t:"ریلیز سے پہلے کوڈ انسپکشن۔",e:"Code inspection",a:1,w:"Inspecting = appraisal."},
 {t:"ٹیسٹنگ آلات کی دیکھ بھال۔",e:"Maintenance of test equipment",a:1,w:"Listed under appraisal."},
 {t:"ٹیسٹنگ میں ملے بگ کو دوبارہ لکھنا۔",e:"Rework before shipping",a:2,w:"Found before delivery = internal."},
 {t:"ناکام ٹیسٹ کے بعد دوبارہ ٹیسٹنگ۔",e:"Re-testing",a:2,w:"Internal failure cost."},
 {t:"ہیلپ لائن پر شکایات سنبھالنا۔",e:"Help line support",a:3,w:"After delivery = external."},
 {t:"گاہک کو وارنٹی میں پروڈکٹ بدل کر دینا یا پیسے واپس کرنا۔",e:"Warranty / product return",a:3,w:"External failure."},
 {t:"بدنامی کی وجہ سے سیلز کم ہو گئیں۔",e:"Lost sales from reputation",a:4,w:"Hidden image cost = intangible."},
 {t:"ڈیڈ لائن مس ہونے سے گاہک کا اعتماد ٹوٹا۔",e:"Missed deadline",a:4,w:"Intangible."},
 {t:"Six Sigma جیسا بہتری کا عمل اپنانا۔",e:"Quality improvement process",a:0,w:"Prevention."},
 {t:"کمپنی کے خلاف قانونی مقدمہ۔",e:"Legal liability",a:3,w:"External failure."}]);
function coq(){
  const p=+$("#cp").value||0,a=+$("#ca").value||0,i=+$("#ci").value||0,e=+$("#ce").value||0,m=+$("#cm").value||0;
  const intang=e*m,good=p+a,poor=i+e+intang,tot=good+poor,tang=p+a+i+e;
  const pc=v=>tot?Math.max(0,v/tot*100):0;
  $("#cout").innerHTML=`<div class="stack"><i style="width:${pc(p)}%;background:#12805c">Prev</i><i style="width:${pc(a)}%;background:#3b5bdb">Appr</i><i style="width:${pc(i)}%;background:#b36b00">Int</i><i style="width:${pc(e)}%;background:#c92a2a">Ext</i><i style="width:${pc(intang)}%;background:#6b2fa0">Intangible</i></div>
  Cost of GOOD quality (prevention + appraisal): <b>Rs ${fmt(good)}</b><br>Cost of POOR quality (internal + external + intangible): <b>Rs ${fmt(poor)}</b><br>Tangible total: Rs ${fmt(tang)} · <b>Total cost of quality: Rs ${fmt(tot)}</b><br>
  ${tot? (poor/tot>0.6?'<span class="badc">Most of your money is wasted on failures. Spend more on prevention.</span>':'<span class="good">Balanced: more is going to doing it right.</span>'):""}`;
}
$$("#cp,#ca,#ci,#ce,#cm").forEach(e=>e.oninput=coq);coq();
function r100(){const v=+$("#r1").value||0;
 $("#r1o").innerHTML=`<div class="bar" style="width:5%;background:var(--ok)">Prevention: Rs ${fmt(v)}</div><div class="bar" style="width:30%;background:var(--warn)">Correction: Rs ${fmt(v*10)}</div><div class="bar" style="width:100%;background:var(--bad)">Failure: Rs ${fmt(v*100)}</div>If you skip prevention you may pay <b>10×</b> (fix before delivery) or <b>100×</b> (fix after failure). You would save up to <b>Rs ${fmt(v*99)}</b>.`}
$("#r1").oninput=r100;r100();
function ecl(){
  const x=+$("#ecl").value,w=+$("#eclw").value;$("#eclv").textContent=x;$("#eclwv").textContent=w;
  const C=t=>t*t/100,F=t=>w*(100-t)*(100-t)/100,T=t=>C(t)+F(t);
  let best=0,bv=1e9;for(let t=0;t<=100;t+=0.5){if(T(t)<bv){bv=T(t);best=t}}
  const W=560,H=260,P=34,ymax=Math.max(100,w*100)*1.05;
  const X=t=>P+t/100*(W-2*P),Y=v=>H-P-v/ymax*(H-2*P);
  const path=f=>{let d="";for(let t=0;t<=100;t+=2)d+=(t?"L":"M")+X(t).toFixed(1)+","+Y(f(t)).toFixed(1);return d};
  $("#eclsvg").innerHTML=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:640px;background:var(--card);border:1px solid var(--line);border-radius:10px">
   <line x1="${P}" y1="${H-P}" x2="${W-P}" y2="${H-P}" stroke="currentColor" opacity=".4"/><line x1="${P}" y1="${P/2}" x2="${P}" y2="${H-P}" stroke="currentColor" opacity=".4"/>
   <path d="${path(C)}" fill="none" stroke="#12805c" stroke-width="2.5"/><path d="${path(F)}" fill="none" stroke="#c92a2a" stroke-width="2.5"/><path d="${path(T)}" fill="none" stroke="#3b5bdb" stroke-width="3"/>
   <line x1="${X(best)}" y1="${P/2}" x2="${X(best)}" y2="${H-P}" stroke="#b36b00" stroke-dasharray="4"/><circle cx="${X(best)}" cy="${Y(bv)}" r="6" fill="#b36b00"/>
   <line x1="${X(x)}" y1="${P/2}" x2="${X(x)}" y2="${H-P}" stroke="currentColor" opacity=".5"/><circle cx="${X(x)}" cy="${Y(T(x))}" r="5" fill="#3b5bdb"/>
   <text x="${W/2}" y="${H-8}" text-anchor="middle" font-size="12" fill="currentColor">Conformance level (%) →</text>
   <text x="${P+6}" y="18" font-size="12" fill="#12805c">● Prevention+Appraisal</text><text x="${P+170}" y="18" font-size="12" fill="#c92a2a">● Failure costs</text><text x="${P+270}" y="18" font-size="12" fill="#3b5bdb">● Total (U-shape)</text></svg>`;
  $("#eclout").innerHTML=`At ${x}%: prevention+appraisal = <b>${C(x).toFixed(1)}</b>, failure = <b>${F(x).toFixed(1)}</b>, total = <b>${T(x).toFixed(1)}</b>.<br>Lowest total is at <b>≈${best}%</b> (orange) = the ECL. ${Math.abs(x-best)<=3?'<span class="good">You are at the ECL 🎯</span>':x<best?'<span class="badc">Too little control: failures dominate. Spend more on prevention/appraisal.</span>':'<span class="badc">Too much control: extra checking costs more than it saves.</span>'}<br><small>At weight 1 the green and red lines cross exactly at the minimum (the slide's “equal” statement). If failures are costlier, the best level moves right.</small>`;
}
$("#ecl").oninput=$("#eclw").oninput=ecl;ecl();
function rp(){const b=+$("#rp").value||0;const ph=[["Requirements",1],["Design",5],["Coding",10],["Testing",20],["After release (customer)",100]];
 $("#rpo").innerHTML=ph.map(([n,m])=>`<div style="display:flex;gap:8px;align-items:center"><span style="width:150px;font-size:.85rem">${n}</span><div class="bar" style="width:${Math.max(m,6)*0.7}%;background:${m>=100?"var(--bad)":m>=20?"var(--warn)":"var(--ok)"}">Rs ${fmt(b*m)} (${m}×)</div></div>`).join("")}
$("#rp").oninput=rp;rp();

/* ---------- Chapter 4 labs ---------- */
sorter("s-three",["Defect Prevention","Defect Reduction","Defect Containment"],[
 {t:"ٹیم کو requirements analysis کی ٹریننگ دینا۔",a:0,w:"Education & training → prevention."},
 {t:"Syntax-directed editor استعمال کرنا۔",a:0,w:"Tools that block errors → prevention."},
 {t:"کوڈ ریویو / انسپکشن کرنا۔",a:1,w:"Finding faults that exist → reduction (static)."},
 {t:"ٹیسٹ کیسز چلا کر نتیجہ دیکھنا۔",a:1,w:"Dynamic testing → reduction."},
 {t:"ایک ماڈیول کی خرابی پورے سسٹم کو نہ گرائے، اس کے لیے backup ورژن رکھنا۔",a:2,w:"Fault tolerance → containment."},
 {t:"Fault tree بنا کر حادثے کا نقصان کم کرنا۔",a:2,w:"Failure containment."},
 {t:"Coding standards لازمی کرنا۔",a:0,w:"Process conformance & standards enforcement → prevention."},
 {t:"Walkthrough کرنا۔",a:1,w:"Static testing → reduction."},
 {t:"Recovery block / N-version programming لگانا۔",a:2,w:"Fault tolerance techniques → containment."}]);
sorter("s-sd",["Static testing","Dynamic testing"],[
 {t:"Code inspection",a:0,w:"Humans read; program not run."},{t:"Walkthrough",a:0,w:"Group code reading."},{t:"Desk checking",a:0,w:"One person reads."},
 {t:"Black-box testing",a:1,w:"Program is executed."},{t:"White-box testing",a:1,w:"Program is executed."},
 {t:"پروگرام چلائے بغیر کوڈ پڑھ کر غلطی ڈھونڈنا۔",a:0,w:"No execution = static."},
 {t:"ٹیسٹ اسکرپٹ چلا کر نتیجہ دیکھنا۔",a:1,w:"Execution = dynamic."},{t:"ڈیزائن ڈاکومنٹ کا ریویو۔",a:0,w:"Reviewing artifacts = static."}]);
sorter("s-bw",["Black-box","White-box"],[
 {t:"ٹیسٹر کوڈ نہیں دیکھتا، صرف ان پٹ دے کر آؤٹ پٹ دیکھتا ہے۔",a:0,w:"Black-box."},
 {t:"ہر if/else برانچ چلنے کا ٹیسٹ۔",a:1,w:"Looks at internal structure."},
 {t:"Verify that external functions match user expectations.",a:0,w:"Functional testing."},
 {t:"Verify internal units, structures and relations among them.",a:1,w:"Structural testing."},
 {t:"ATM کے بٹن دبا کر دیکھنا کہ پیسے نکلتے ہیں یا نہیں۔",a:0,w:"Only external behavior."},
 {t:"لفٹ کی مشین کھول کر تاروں کی جانچ۔",a:1,w:"Inside view (clear box)."}]);
let lbMode="B",lbCov=new Set();
function grade(m){ /* SPEC: <0 or >100 Invalid, >=50 Pass, else Fail.  Hidden BUG: uses > 50 */
  if(m<0||m>100)return["Invalid","b1"];
  if(m>50)return["Pass","b2"];
  return["Fail","b3"];}
function lbDraw(last){
  const L=[["b1","if (marks &lt; 0 or marks &gt; 100):  return \"Invalid\""],["b2","elif (marks <span class=\"bug\">&gt; 50</span>):          return \"Pass\""],["b3","else:                          return \"Fail\""]];
  $("#labCode").innerHTML=`<pre class="code">${L.map(([id,t])=>`<span class="${last===id?"hl":""}">${t}</span>`).join("\n")}</pre><small style="color:var(--muted)">White-box: you can see the code. Do you spot a mismatch with the spec (50 or more = Pass)?</small>`;
  $("#lbCov").innerHTML=`Branch coverage: <b>${lbCov.size} / 3</b> ${["b1","b2","b3"].map(b=>lbCov.has(b)?"✅":"⬜").join(" ")} ${lbCov.size===3?'<span class="good">100% branch coverage 🎉</span>':""}`;
}
function setLbMode(m){lbMode=m;$("#mdB").classList.toggle("on",m==="B");$("#mdW").classList.toggle("on",m==="W");$("#labCode").style.display=m==="W"?"block":"none";$("#lbExpWrap").style.display=m==="B"?"block":"none";lbCov=new Set();lbDraw();$("#lbOut").innerHTML="Try inputs like 75, 30, 120, and the boundary <b>50</b>."}
$("#mdB").onclick=()=>setLbMode("B");$("#mdW").onclick=()=>setLbMode("W");
$("#lbRun").onclick=()=>{
  const v=+$("#lbIn").value,[out,br]=grade(v);lbCov.add(br);
  const specOut=(v<0||v>100)?"Invalid":v>=50?"Pass":"Fail";
  if(lbMode==="B"){const exp=$("#lbExp").value;
    $("#lbOut").innerHTML=`Input <b>${v}</b> → program says <b>${out}</b>; you expected <b>${exp}</b>. ${out===exp?'<span class="good">Test PASSED ✔</span>':'<span class="badc">Test FAILED ✘ → you found a bug!</span>'}${v===50&&out!==specOut?"<br>Boundary values are where bugs hide. The spec says 50 should be Pass.":""}`;}
  else{$("#lbOut").innerHTML=`Input <b>${v}</b> runs branch <b>${br.toUpperCase()}</b> → <b>${out}</b>. ${out!==specOut?'<span class="badc">Spec says '+specOut+': the marked “&gt; 50” should be “&gt;= 50”.</span>':""}`}
  lbDraw(lbMode==="W"?br:undefined);
};
setLbMode("B");

/* ---------- Chapter 5 labs ---------- */
sorter("s-tech",["Recovery Block","N-Version Programming","N-Self-Checking","Retry Block","N-Copy Programming"],[
 {t:"ایک ہی الگورتھم، ان پٹ کو دوسری شکل میں دے کر دوبارہ کوشش۔",e:"Same algorithm, re-expressed input, retry",a:3,w:"Data diversity, sequential."},
 {t:"کئی ورژن parallel چلتے ہیں اور voter اکثریت سے جواب چنتا ہے۔",e:"Parallel versions + voter",a:1,w:"Design diversity, static."},
 {t:"Primary فیل ہو تو alternate لگتا ہے، state واپس کی جاتی ہے، acceptance test چلتا ہے۔",e:"Alternates + acceptance test + restore state",a:0,w:"Design diversity, sequential."},
 {t:"ہر ورژن کا اپنا acceptance test ہے؛ سب سے اونچی رینک والا پاس ورژن جیتتا ہے۔",e:"Separate AT per version, ranking",a:2,w:"Structural variation of RB and NVP."},
 {t:"DRA سے ڈیٹا re-express ہوتا ہے، کم از کم دو copies parallel چلتی ہیں، decision mechanism فیصلہ کرتا ہے۔",e:"DRA + copies + DM",a:4,w:"Data-diverse variant of NVP."},
 {t:"Suggested by Elmendorf (1972); developed by Avizienis & Chen.",a:1,w:"NVP history."},
 {t:"Introduced by Horning in 1974.",a:0,w:"Recovery blocks history."},
 {t:"Ammann and Knight (1987).",a:3,w:"Retry block (and data diversity)."}]);
const BEH=[["ok","Works correctly (2x)"],["wrongout","Wrong, out of range (−1)"],["wrongin","Wrong but in range (2x+1)"],["crash","Crashes (divide by zero)"],["slow","Too slow (time limit)"]];
$("#rbCfg").innerHTML=["Primary alternate","Alternate 2","Alternate 3"].map((n,i)=>`<div class="mini"><b>${n}</b><select class="rbSel">${BEH.map(([v,t])=>`<option value="${v}" ${(i===0&&v==="crash")||(i>0&&v==="ok")?"selected":""}>${t}</option>`).join("")}</select></div>`).join("");
$("#rbRun").onclick=()=>{
  const x=+$("#rbX").value,truth=2*x,names=["Primary","Alternate 2","Alternate 3"];let log=[],res=null;
  const sel=$$(".rbSel").map(s=>s.value);
  for(let i=0;i<3&&res===null;i++){
    log.push(`💾 Restore saved state (recovery point) before <b>${names[i]}</b>.`);
    const b=sel[i];
    if(b==="crash"){log.push(`❌ ${names[i]} crashed (divide by zero) → next alternate.`);continue}
    if(b==="slow"){log.push(`⏱️ ${names[i]} exceeded time limit → next alternate.`);continue}
    const r=b==="ok"?truth:b==="wrongout"?-1:truth+1;
    const pass=Number.isFinite(r)&&r>=0&&r<=1000;
    log.push(`${names[i]} returned <b>${r}</b>. Acceptance test (0–1000): ${pass?"✔ PASS":"✘ FAIL → next alternate"}`);
    if(pass)res=[r,names[i]];
  }
  let end;
  if(res===null)end=`<span class="badc">All alternates failed → ERROR raised.</span>`;
  else end=`Accepted <b>${res[0]}</b> from <b>${res[1]}</b>. Truth is ${truth}: ${res[0]===truth?'<span class="good">correct ✔</span>':'<span class="badc">WRONG answer accepted! The acceptance test was too weak (flaw: accepts incorrect).</span>'}`;
  $("#rbOut").innerHTML=log.join("<br>")+"<hr>"+end+((truth>1000||truth<0)?'<br><span class="badc">Note: the correct answer '+truth+' lies outside 0–1000, so this test would reject a correct result (flaw: rejects correct).</span>':"");
};
let vMode="N";
function vDraw(){
  $("#vHint").textContent=vMode==="N"?"NVP: enter the output of each version. The voter takes the majority (2 of 3). No majority → failure exception.":"NSCP: each version has its own acceptance test. Rank 1 is highest. The output comes from the highest-ranking version that passes its own test.";
  const old=$$("#vCfg .vout").map(i=>i.value);
  $("#vCfg").innerHTML=[1,2,3].map((n,i)=>`<div class="mini"><b>Version ${n}${vMode==="S"?" (rank "+n+")":""}</b><label>Output</label><input type="number" class="vout" value="${old[i]??[42,42,17][i]}">${vMode==="S"?`<label><input type="checkbox" class="vat" ${i===0?"":"checked"}> its own acceptance test passes</label>`:""}</div>`).join("");
}
$("#vmN").onclick=()=>{vMode="N";$("#vmN").classList.add("on");$("#vmS").classList.remove("on");vDraw();$("#vOut").innerHTML=""};
$("#vmS").onclick=()=>{vMode="S";$("#vmS").classList.add("on");$("#vmN").classList.remove("on");vDraw();$("#vOut").innerHTML=""};
$("#vRun").onclick=()=>{
  const o=$$("#vCfg .vout").map(i=>+i.value);
  if(vMode==="N"){const cnt={};o.forEach(v=>cnt[v]=(cnt[v]||0)+1);const win=Object.keys(cnt).find(k=>cnt[k]>o.length/2);
    $("#vOut").innerHTML=win!==undefined?`Voter: <b>${win}</b> got ${cnt[win]} of ${o.length} votes → output <b>${win}</b>. <span class="good">Local failure masked ✔</span>`:`<span class="badc">No majority → failure exception.</span>`;}
  else{const at=$$("#vCfg .vat").map(c=>c.checked);const k=at.findIndex(Boolean);
    $("#vOut").innerHTML=k>=0?`Version ${k+1} is the highest-ranking version that passed its own test → output <b>${o[k]}</b>.${k>0?" Higher-ranked versions failed their tests and were skipped.":""}`:`<span class="badc">No version passed its own acceptance test → failure.</span>`;}
};
vDraw();
$("#rtRun").onclick=()=>{
  const x=+$("#rtX").value,n=Math.max(0,Math.min(5,+$("#rtN").value||0));let log=[],ok=false;
  const alg=v=>{if(Number.isInteger(v)&&v%10===0)throw new Error("crash");return 100/v};
  for(let k=0;k<=n&&!ok;k++){
    const inp=k===0?x:+(x+0.01*k).toFixed(2);
    const tag=k?"(re-expressed input "+inp+")":"(original input "+inp+")";
    try{const r=alg(inp);
      if(Number.isFinite(r)){log.push(`Try ${k+1} ${tag}: result <b>${r.toFixed(4)}</b> ✔ passes acceptance test.`);ok=true;
        if(k>0)log.push(`<span class="good">Data diversity worked: ${x} crashed, ${inp} gave an almost identical answer (exact 100/${x} = ${(100/x).toFixed(4)}).</span>`)}
      else log.push(`Try ${k+1} ${tag}: result not acceptable.`)}
    catch(e){log.push(`Try ${k+1} ${tag}: ❌ algorithm crashed.`)}
  }
  if(!ok){log.push(`⏱️ Deadline/retries exhausted → run <b>Backup algorithm</b> with the <b>original input</b> ${x}.`);
    log.push(x===0?`<span class="badc">Backup also fails (division by zero) → failure exception.</span>`:`Backup result: <b>${(100/x).toFixed(4)}</b> ✔`)}
  $("#rtOut").innerHTML=log.join("<br>");
};
const FT={
 "Room has no light":{g:"OR",t:"Room has no light",u:"کمرے میں روشنی نہیں",k:[{t:"Bulb fused",u:"بلب فیوز",p:.05},{g:"AND",t:"No power and no backup",u:"بجلی نہیں اور بیک اپ بھی نہیں",k:[{t:"Load-shedding",u:"لوڈ شیڈنگ",p:.3},{g:"OR",t:"Backup fails",u:"بیک اپ ناکام",k:[{t:"UPS battery dead",u:"UPS کی بیٹری ختم",p:.2},{t:"UPS not plugged in",u:"UPS لگی ہی نہیں",p:.1}]}]}]},
 "Unauthorized data access":{g:"AND",t:"Hacker views user data",u:"ہیکر صارف کا ڈیٹا دیکھ لے",k:[{g:"OR",t:"Attacker gets valid password",u:"پاس ورڈ مل جائے",k:[{t:"Weak password guessed",u:"کمزور پاس ورڈ اندازے سے",p:.1},{t:"Phishing steals password",u:"فشنگ سے پاس ورڈ چوری",p:.05}]},{t:"No second factor (OTP) required",u:"OTP لازمی نہیں",p:.5}]},
 "Car won't start":{g:"OR",t:"Car won't start",u:"گاڑی سٹارٹ نہیں",k:[{t:"Battery dead",u:"بیٹری ڈیڈ",p:.1},{t:"Out of petrol",u:"پیٹرول ختم",p:.05},{g:"AND",t:"Starter fails and no push-start possible",u:"سیلف خراب اور دھکا بھی ممکن نہیں",k:[{t:"Starter motor faulty",u:"سیلف خراب",p:.04},{t:"Nobody to push",u:"دھکا لگانے والا کوئی نہیں",p:.5}]}]}};
let ftCur="Room has no light",ftState=new Map(),ftProb=new Map();
function ftReset(){ftState=new Map();ftProb=new Map();(function w(n,p){n.id=p;if(!n.k){ftProb.set(n.id,n.p)}else n.k.forEach((c,i)=>w(c,p+"."+i))})(FT[ftCur],"r")}
const ev=n=>n.k?(n.g==="AND"?n.k.every(ev):n.k.some(ev)):!!ftState.get(n.id);
const pr=n=>n.k?(n.g==="AND"?n.k.reduce((a,c)=>a*pr(c),1):1-n.k.reduce((a,c)=>a*(1-pr(c)),1)):ftProb.get(n.id);
function ftRender(){
  const root=FT[ftCur];
  const rn=n=>{const f=ev(n);
    if(!n.k)return `<li><span class="node ${f?"fire":""}"><label style="margin:0;display:inline-flex;gap:6px;align-items:center;color:inherit;font-size:inherit"><input type="checkbox" data-id="${n.id}" ${ftState.get(n.id)?"checked":""}> ${n.t} <span class="urtxt" dir="rtl">(${n.u})</span></label> p=<input type="number" step="0.01" min="0" max="1" data-pid="${n.id}" value="${ftProb.get(n.id)}"></span></li>`;
    return `<li><span class="node ${f?"fire":""}"><span class="tag ${n.g.toLowerCase()}">${n.g}</span><b>${n.t}</b> <span class="urtxt" dir="rtl">(${n.u})</span> ${f?"🔥":""}</span><ul>${n.k.map(rn).join("")}</ul></li>`};
  $("#ftBox").innerHTML=`<ul class="tree">${rn(root)}</ul>`;
  $$("#ftBox input[type=checkbox]").forEach(c=>c.onchange=()=>{ftState.set(c.dataset.id,c.checked);ftRender()});
  $$("#ftBox input[type=number]").forEach(c=>c.onchange=()=>{ftProb.set(c.dataset.pid,Math.max(0,Math.min(1,+c.value||0)));ftRender()});
  $("#ftOut").innerHTML=`Top event “<b>${root.t}</b>”: ${ev(root)?'<span class="badc">HAPPENS 🔥</span>':'<span class="good">does not happen ✔</span>'}<br>Probability of top event (from leaf probabilities): <b>${(pr(root)*100).toFixed(2)}%</b><br><small>OR = any child is enough · AND = all children needed. To reduce the accident, protect the paths with the fewest AND-barriers.</small>`;
}
$("#ftChips").innerHTML=Object.keys(FT).map(k=>`<button class="chip ${k===ftCur?"on":""}" data-k="${k}">${k}</button>`).join("");
$$("#ftChips .chip").forEach(c=>c.onclick=()=>{ftCur=c.dataset.k;$$("#ftChips .chip").forEach(x=>x.classList.toggle("on",x===c));ftReset();ftRender()});
ftReset();ftRender();

