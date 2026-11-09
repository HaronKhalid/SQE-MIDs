/* Progress for scenarios and quizzes (browser localStorage only).
   Existing topic progress ("sqe-done") is untouched and still used by core.js.
   New namespaced keys: sqe_scenario_attempts_v1, sqe_quiz_history_v1, sqe_quiz_stats_v1 */
const SQP={
  K:{att:"sqe_scenario_attempts_v1",hist:"sqe_quiz_history_v1",stats:"sqe_quiz_stats_v1"},
  _list(k){const a=store.get(k,[]);return Array.isArray(a)?a:[]},
  /* scenario attempts */
  attempts(){return this._list(this.K.att)},
  addAttempt(a){const l=this.attempts();l.push(a);store.set(this.K.att,l.slice(-300))},
  attemptsFor(id){return this.attempts().filter(a=>a.id===id)},
  best(id){
    const l=this.attemptsFor(id);if(!l.length)return null;
    const f=a=>a.max?a.score/a.max:1;
    return l.reduce((b,a)=>f(a)>f(b)?a:b);
  },
  /* quiz history */
  history(){return this._list(this.K.hist)},
  addHistory(h){const l=this.history();l.push(h);store.set(this.K.hist,l.slice(-100))},
  /* which quiz questions were seen / answered wrongly (by question id) */
  stats(){const s=store.get(this.K.stats,{});return{seen:(s&&s.seen)||{},wrong:(s&&s.wrong)||{}}},
  record(results){ /* results: [{id, ok}] */
    const s=this.stats();
    results.forEach(r=>{s.seen[r.id]=1;if(r.ok)delete s.wrong[r.id];else s.wrong[r.id]=1});
    store.set(this.K.stats,s);
  },
  reset(){Object.values(this.K).forEach(k=>{try{localStorage.removeItem(k)}catch(e){}})}
};
