// Notificações (sino na barra superior)
// 1) Retorno de VISITA atrasado: 1, 3 e 7 dias
// 2) Orçamento aguardando resposta: 3, 7 e 15 dias desde a data do orçamento
// 3) Orçamento NÃO fechado com retorno vencido: 3, 7 e 15 dias depois da data do retorno do orçamento
// 4) Cliente sem visita: categoria A 21 dias, B 28 dias, C 35 dias
const LIM_CAT={A:21,B:28,C:35};
const dias=(a,b)=>Math.round((new Date(a+'T12:00')-new Date(b+'T12:00'))/864e5);
const marco=(d,M)=>[...M].reverse().find(m=>d>=m)||0; // maior marco já atingido (M em ordem crescente)

function notificacoes(){
 const hj=hoje(),N=[],add=(k,sev,t,det,ir,id,d)=>N.push({k,sev,t,det,ir,id,d});
 retornos().forEach(r=>{
  const d=dias(hj,r.data),M=[1,3,7],m=marco(d,M);
  if(m)add(`ret|${r.c.id}|${r.data}|${m}`,M.indexOf(m)+1,`Retorno de visita atrasado há ${d} dia${d>1?'s':''}`,`${r.c.nome} · ${r.c.cidade} · ${r.x.vendedor||r.c.vendedor||''}`,'vis',r.c.id,d);
 });
 DB.orcamentos.forEach(o=>{
  const s=stt(o),M=[3,7,15];
  if(s=='Aguardando'){
   const d=dias(hj,o.data),m=marco(d,M);
   if(m)add(`oag|${o.id}|${m}`,M.indexOf(m)+1,`Orçamento aguardando resposta há ${d} dias`,`${o.produtor_nome} · ${o.objetivo} · ${brl(o.valor)}`,'orc',o.id,d);
  }else if(s=='Não fechou'&&o.retorno){
   const d=dias(hj,o.retorno),m=marco(d,M);
   if(m)add(`oret|${o.id}|${o.retorno}|${m}`,M.indexOf(m)+1,`Retorno do orçamento vencido há ${d} dias`,`${o.produtor_nome} · ${brl(o.valor)}${o.motivo?' · '+o.motivo:''}`,'orc',o.id,d);
  }
 });
 DB.clientes.forEach(c=>{
  const lim=LIM_CAT[c.prioridade];if(!lim)return;
  const ult=(c.visitas||[]).map(x=>x.data).filter(Boolean).sort().pop(),base=ult||(c.criado_em||'').slice(0,10);
  if(!base)return;
  const d=dias(hj,base);
  if(d>lim)add(`cat|${c.id}|${base}`,{A:3,B:2,C:1}[c.prioridade],`Cliente ${c.prioridade} sem visita há ${d} dias`,`${c.nome} · ${c.cidade} · limite de ${lim} dias${ult?'':' (contado desde o cadastro)'}`,'vis',c.id,d);
 });
 return N.sort((a,b)=>b.sev-a.sev||b.d-a.d);
}

// "Lida" é guardado neste aparelho; quando o atraso chega a um novo marco, a notificação volta como nova
const NK=()=>KEY+'_lidas_'+(Auth.user?Auth.user.uid:'');
const lidas=()=>{try{return new Set(JSON.parse(localStorage.getItem(NK())||'[]'))}catch(e){return new Set()}};
const marcar=ks=>{const s=lidas();ks.forEach(k=>s.add(k));try{localStorage.setItem(NK(),JSON.stringify([...s].slice(-500)))}catch(e){}};
const nBadge=()=>{const L=lidas(),n=notificacoes().filter(x=>!L.has(x.k)).length;return n?`<i class="bdg">${n>9?'9+':n}</i>`:''};
const bell=()=>`<button class="bell" data-act="notif" aria-label="Notificações"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>${nBadge()}</button>`;
const refBadge=()=>{const b=$('.bell');if(!b)return;const o=b.querySelector('.bdg');if(o)o.remove();b.insertAdjacentHTML('beforeend',nBadge())};

function notifHTML(){
 const L=lidas(),N=notificacoes();
 return`<div class="nh"><b>Notificações</b>${N.some(x=>!L.has(x.k))?'<button data-act="nlidas">Marcar todas como lidas</button>':''}</div>`
 +(N.length?N.map(x=>`<div class="nt s${x.sev}${L.has(x.k)?'':' novo'}" data-nt="${x.ir}|${x.id}" data-nk="${esc(x.k)}"><b>${esc(x.t)}</b><small>${esc(x.det)}</small></div>`).join(''):'<p class="m" style="padding:12px">Nenhuma notificação no momento.</p>');
}

// Abre a tela certa: visita nova já com o produtor escolhido, ou o orçamento
function irNotif(tipo,id){
 cur=orcCur=vcur=null;vag=null;back=null;
 if(tipo=='orc'){tab='orc';orcCur=DB.orcamentos.find(o=>o.id==id)||null}
 else{tab='vis';vcur={produtor_id:id}}
 render();
}
