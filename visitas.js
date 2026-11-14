// Visitas a produtores: cada visita é guardada dentro do cliente (cliente.visitas)
function visList(){
 const A=DB.clientes.flatMap(c=>(c.visitas||[]).map((x,i)=>({c,i,x})));
 const ds=[...new Set(A.map(o=>o.x.data).filter(Boolean))].sort().reverse(),rs=[...new Set(A.map(o=>o.x.retorno).filter(Boolean))].sort();
 const L=A.filter(o=>(!vfd||o.x.data==vfd)&&(!vfr||o.x.retorno==vfr)).sort((a,b)=>(b.x.data||'').localeCompare(a.x.data||''));
 const op=(a,s)=>'<option value="">Todas</option>'+a.map(d=>`<option value="${d}"${d==s?' selected':''}>${br(d)}</option>`).join('');
 return`<div class="bar2"><h2 style="margin:8px 0;flex:1 1 100%">Visitas a produtores</h2><button class="pri" data-act="vnovo">Cadastrar nova visita</button><button data-act="vagenda">Agenda de retornos</button></div>`
 +`<div class="box"><div class="g" id="vfl"><label>Data da visita<select id="vfd">${op(ds,vfd)}</select></label><label>Retorno da visita<select id="vfr">${op(rs,vfr)}</select></label></div></div>`
 +(L.length?`<div class="cards">${L.map(({c,i,x})=>`<div class="card" data-vi="${c.id}|${i}"><b>${esc(c.nome)}</b><small>${br(x.data)} · ${esc(x.vendedor||c.vendedor)}${x.retorno?' · retorno em '+br(x.retorno):''}</small></div>`).join('')}</div>`:`<p class="m">${A.length?'Nenhuma visita com esses filtros.':'Nenhuma visita cadastrada. Toque em “Cadastrar nova visita”.'}</p>`);
}

// Retornos pendentes: o retorno da última visita de cada produtor
const retornos=(L=DB.clientes)=>L.map(c=>{const u=(c.visitas||[]).map((x,i)=>({x,i})).filter(o=>o.x.data||o.x.retorno).sort((a,b)=>(a.x.data||'')<(b.x.data||'')?-1:1).pop();return u&&u.x.retorno?{c,x:u.x,i:u.i,data:u.x.retorno}:null}).filter(Boolean);

// Lista de retornos de visitas: tabela no computador, cartões no celular (clicar abre a visita)
const listaRet=R=>{
 if(!R.length)return'<p class="m">Nenhum retorno de visita agendado.</p>';
 const hj=hoje(),L=R.slice().sort((a,b)=>a.data.localeCompare(b.data)),atr=r=>r.data<hj;
 return`<div class="so-d sc"><table><thead><tr><th>Retorno</th><th>Cliente</th><th>Cidade</th><th>Vendedor</th></tr></thead><tbody>${L.map(r=>`<tr class="clk" data-vk="${r.c.id}|${r.i}"><td>${atr(r)?'⚠ atrasado · ':''}${br(r.data)}</td><td>${esc(r.c.nome)}</td><td>${esc(r.c.cidade)}</td><td>${esc(r.x.vendedor||r.c.vendedor)}</td></tr>`).join('')}</tbody></table></div>`
 +`<div class="so-m cards">${L.map(r=>`<div class="card" data-vk="${r.c.id}|${r.i}"><span><b>${esc(r.c.nome)}</b> <span class="pill ${atr(r)?'nf':''}">${atr(r)?'atrasado · ':''}${br(r.data)}</span></span><small>${esc(r.c.cidade)} · ${esc(r.x.vendedor||r.c.vendedor)}</small></div>`).join('')}</div><p class="m">Toque num retorno para ver a visita.</p>`;
};

// Agenda: calendário mensal; dias com retorno ficam em destaque com a quantidade
function agenda(){
 const[Y,M]=vag.split('-').map(Number),n=new Date(Y,M,0).getDate(),off=new Date(Y,M-1,1).getDay(),hj=hoje(),by={};
 retornos().forEach(r=>(by[r.data]=by[r.data]||[]).push(r));
 let cel='<div class="dia vz"></div>'.repeat(off);
 for(let d=1;d<=n;d++){
  const iso=`${vag}-${String(d).padStart(2,'0')}`,q=(by[iso]||[]).length;
  cel+=`<div class="dia${q?(iso<hj?' ret late':' ret'):''}${iso==hj?' hoje':''}"${q?` data-dia="${iso}"`:''}><span class="dn">${d}</span>${q?`<b>${q}</b><small>${q==1?'retorno':'retornos'}</small>`:''}</div>`;
 }
 return`<div class="bar2"><button data-act="vlist">← Visitas</button><h2 style="margin:8px 0;flex:1">Agenda de retornos</h2></div>
 <div class="box"><div class="calnav"><button data-act="mprev" aria-label="Mês anterior">‹</button><input type="month" id="vmes" value="${vag}"><button data-act="mnext" aria-label="Próximo mês">›</button></div>
 <div class="cal cal-h">${['dom','seg','ter','qua','qui','sex','sáb'].map(x=>`<span>${x}</span>`).join('')}</div><div class="cal">${cel}</div>
 <p class="m">Passe o mouse (ou toque) num dia colorido para ver os clientes com retorno. Em âmbar: retornos atrasados. Aqui aparecem só os retornos de visitas; os retornos de orçamentos ficam na aba Orçamentos e nas notificações.</p></div>`;
}
function tipDia(el){
 let t=$('#tip');if(!t){t=document.createElement('div');t.id='tip';document.body.appendChild(t)}
 t.innerHTML=`<b>${br(el.dataset.dia)}</b>`+retornos().filter(r=>r.data==el.dataset.dia).map(r=>`<div>${esc(r.c.nome)} <span class="m">· ${esc(r.c.cidade)}</span></div>`).join('');
 t.hidden=false;
 const b=el.getBoundingClientRect(),w=t.offsetWidth,h=t.offsetHeight;
 t.style.left=Math.max(8,Math.min(innerWidth-w-8,b.left+b.width/2-w/2))+'px';
 t.style.top=(b.bottom+6+h>innerHeight?b.top-h-6:b.bottom+6)+'px';
}
const hideTip=()=>{const t=$('#tip');if(t)t.hidden=true};
document.addEventListener('mouseover',e=>{const d=e.target.closest('[data-dia]');if(d)tipDia(d)});
document.addEventListener('mouseout',e=>{if(e.target.closest('[data-dia]'))hideTip()});

function visForm(){
 const v=vcur,P=DB.clientes.slice().sort((a,b)=>a.nome.localeCompare(b.nome)),pr=P.find(c=>c.id==v.produtor_id),F=k=>VF.find(f=>f[0]==k);
 return`<form id="vf"><section><h2>${v.cid?'Editar visita':'Nova visita'}</h2>
 <div class="g"><label>Produtor *<input name="produtor" list="dl_prod" autocomplete="off" placeholder="Digite para buscar o produtor" value="${esc(pr?lbl(pr):'')}" required></label>
 ${inp(F('vendedor'),v.vendedor)}${inp(F('data'),v.data||hoje())}${inp(F('retorno'),v.retorno)}</div>
 <datalist id="dl_prod">${P.map(c=>`<option value="${esc(lbl(c))}">`).join('')}</datalist>
 <p id="vul" class="m"></p>
 <div class="g big">${inp(F('obs'),v.obs)}${inp(F('oportunidades'),v.oportunidades)}</div></section>
 <div class="act"><button class="pri">Salvar visita</button><button type="button" data-act="vback">Cancelar</button>${v.cid?'<button type="button" class="del" data-act="vdel">Excluir</button>':''}</div></form>`;
}

// Mostra a última visita do produtor escolhido e sugere o vendedor responsável
function vsync(){
 const f=$('#vf').elements,c=prodSel(f.produtor.value);
 $('#vul').textContent=c?'Última visita deste produtor: '+(c.ultima_visita?br(c.ultima_visita):'nenhuma registrada'):'';
 if(c&&!f.vendedor.value)f.vendedor.value=c.vendedor||'';
}

const setVisitas=(c,L)=>Dados.salvar('clientes',{...c,visitas:L,ultima_visita:L.map(x=>x.data).filter(Boolean).sort().pop()||'',atualizado_em:new Date().toISOString()});

function salvarVis(e){
 const f=e.target.elements,c=prodSel(f.produtor.value);
 if(!c){f.produtor.setCustomValidity('Selecione um produtor da lista');f.produtor.reportValidity();return}
 const g=k=>f[k].value.trim(),x={vendedor:g('vendedor'),data:g('data'),obs:g('obs'),oportunidades:g('oportunidades'),retorno:g('retorno')};
 if(vcur.cid&&vcur.cid!=c.id){ // visita mudou de produtor
  const o=DB.clientes.find(y=>y.id==vcur.cid);
  if(o)setVisitas(o,o.visitas.filter((_,i)=>i!=vcur.i));
  setVisitas(c,[...(c.visitas||[]),x]);
 }else{
  const L=(c.visitas||[]).slice();
  vcur.cid?L[vcur.i]=x:L.push(x);
  setVisitas(c,L);
 }
 vcur=null;render();
}
