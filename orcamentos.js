// Orçamentos: regras, lista e formulário (vendedor) + visão de andamento (gestor)
const OBJ=['Equipamento','Produtos recorrentes (químicos e peças)','Produto revenda'];
const OST=['Fechado','Não fechou','Aguardando'];
const OF=[
 ['vendedor','Vendedor','s',1,VEND],['data','Data','d',1],['objetivo','Objetivo do orçamento','s',1,OBJ],
 ['produtos','Produtos','a',1],['valor','Valor (R$)','n',1],
 ['fechamento','Fechamento','s',0,YN],['motivo','Não fechou, motivo?','t'],['retorno','Retorno do orçamento','d']];

// Comissão sobre o fechamento:
// Equipamento = 1,5% do valor · Produtos recorrentes = 3% do valor
// Produto revenda = 10% do valor líquido, sendo líquido = 10% do valor bruto (ou seja, 1% do bruto)
const comis=(ob,v)=>ob==OBJ[0]?v*.015:ob==OBJ[1]?v*.03:ob==OBJ[2]?v*.10*.10:0;
const ctxt=(ob,v)=>!ob||!v?'Informe o objetivo e o valor para ver a comissão.'
 :(ob==OBJ[2]?`Valor líquido (10% do bruto): <b>${brl(v*.1)}</b> · comissão (10% do líquido): <b>${brl(comis(ob,v))}</b>`
 :`Comissão (${ob==OBJ[0]?'1,5':'3'}% do valor): <b>${brl(comis(ob,v))}</b>`)+' · só é paga se o orçamento fechar.';
const brl=n=>(+n||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const stt=o=>o.fechamento=='Sim'?'Fechado':o.fechamento=='Não'?'Não fechou':'Aguardando';
const lbl=c=>`${c.nome} — ${c.cidade}`;
const nrm=x=>String(x).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const prodSel=s=>DB.clientes.find(c=>nrm(lbl(c))==nrm(s));

function orcList(){
 const L=DB.orcamentos.slice().sort((a,b)=>(b.data||'').localeCompare(a.data||''));
 return`<div class="bar2"><h2 style="margin:8px 0;flex:1">Orçamentos</h2><button class="pri" data-act="onovo">Novo orçamento</button></div>`
 +(L.length?`<div class="cards">${L.map(o=>`<div class="card" data-oid="${o.id}"><span><b>${esc(o.produtor_nome)}</b> <span class="pill ${{'Fechado':'ok','Não fechou':'nf'}[stt(o)]||''}">${stt(o)}</span></span><small>${br(o.data)} · ${esc(o.objetivo)} · ${brl(o.valor)} · ${esc(o.vendedor)}</small></div>`).join('')}</div>`:'<p class="m">Nenhum orçamento ainda. Toque em “Novo orçamento”.</p>');
}

function orcForm(){
 const o=orcCur,P=DB.clientes.slice().sort((a,b)=>a.nome.localeCompare(b.nome)),pr=P.find(c=>c.id==o.produtor_id),F=k=>OF.find(f=>f[0]==k);
 return`<form id="of"><section><h2>${o.id?'Editar orçamento':'Novo orçamento'}</h2>
 <div class="g">${inp(F('vendedor'),o.vendedor)}${inp(F('data'),o.data||hoje())}${inp(F('objetivo'),o.objetivo)}
 <label>Produtor *<input name="produtor" list="dl_prod" autocomplete="off" placeholder="Digite para buscar o produtor" value="${esc(pr?lbl(pr):'')}" required></label></div>
 <datalist id="dl_prod">${P.map(c=>`<option value="${esc(lbl(c))}">`).join('')}</datalist>
 <p><button type="button" data-act="ocnovo">+ Cadastrar novo cliente</button></p></section>
 <section id="ores"><div class="g">${inp(F('produtos'),o.produtos)}${inp(F('valor'),o.valor)}</div><p id="oc" class="m"></p>
 <div class="g">${inp(F('fechamento'),o.fechamento)}${inp(F('motivo'),o.motivo)}${inp(F('retorno'),o.retorno)}</div></section>
 <div class="act"><button class="pri">Salvar orçamento</button><button type="button" data-act="oback">Cancelar</button>${o.id?'<button type="button" class="del" data-act="odel">Excluir</button>':''}</div></form>`;
}

// Só libera o restante do formulário depois de escolher um produtor da lista
function osync(){
 const f=$('#of').elements,pr=prodSel(f.produtor.value),nao=f.fechamento.value=='Não';
 $('#ores').hidden=!pr;
 [...$('#ores').querySelectorAll('input,select,textarea')].forEach(x=>x.disabled=!pr);
 ['motivo','retorno'].forEach(k=>{f[k].closest('label').style.display=nao?'':'none';if(!nao)f[k].value=''});
 $('#oc').innerHTML=ctxt(f.objetivo.value,+f.valor.value||0);
}
function ocollect(){
 const f=$('#of').elements,g=k=>f[k].value.trim(),pr=prodSel(g('produtor'));
 return{id:orcCur.id,owner:orcCur.owner,vendedor:g('vendedor'),data:g('data'),objetivo:g('objetivo'),produtor_id:pr?pr.id:'',produtos:g('produtos'),valor:g('valor'),fechamento:g('fechamento'),motivo:g('motivo'),retorno:g('retorno')};
}
function salvarOrc(e){
 const f=e.target.elements,pr=prodSel(f.produtor.value);
 if(!pr){f.produtor.setCustomValidity('Selecione um produtor da lista');f.produtor.reportValidity();return}
 const o=ocollect();
 Object.assign(o,{id:orcCur.id||uid(),owner:orcCur.owner||Auth.user.uid,produtor_nome:pr.nome,cidade:pr.cidade,comissao_valor:+comis(o.objetivo,+o.valor).toFixed(2),atualizado_em:new Date().toISOString()});
 Dados.salvar('orcamentos',o);orcCur=null;render();
}

// ===== Visão do gestor =====
const ofiltros=()=>fsel('gov','Vendedor',VEND,go.v)+fsel('gos','Status',OST,go.s)+fsel('goo','Objetivo',OBJ,go.o)
 +`<label>De<input type="date" id="gode" value="${go.de}"></label><label>Até<input type="date" id="goate" value="${go.ate}"></label>`;
function gorc(){
 const L=DB.orcamentos.filter(o=>(!go.v||o.vendedor==go.v)&&(!go.s||stt(o)==go.s)&&(!go.o||o.objetivo==go.o)&&(!go.de||o.data>=go.de)&&(!go.ate||o.data<=go.ate)).sort((a,b)=>(b.data||'').localeCompare(a.data||''));
 if(!L.length)return'<p class="m">Nenhum orçamento com esses filtros.</p>';
 const F=L.filter(o=>stt(o)=='Fechado'),kp=(l,v)=>`<div class="kpi"><b>${v}</b><small>${l}</small></div>`;
 const val=(a,f)=>Object.entries(grp(a,f)).map(([k,x])=>[k,sum(x,o=>o.valor)]).sort((x,y)=>y[1]-x[1]);
 return`<div class="kpis">${kp('orçamentos',L.length)}${kp('valor orçado',brl(sum(L,o=>o.valor)))}${kp('fechados',`${F.length} (${Math.round(100*F.length/L.length)}%)`)}${kp('valor fechado',brl(sum(F,o=>o.valor)))}${kp('comissão dos fechados',brl(sum(F,o=>o.comissao_valor)))}</div>`
 +`<div class="two">${pbox('Orçamentos por status',pairs(L,stt))}${pbox('Valor por objetivo (R$)',val(L,o=>o.objetivo))}${pbox('Valor por vendedor (R$)',val(L,o=>o.vendedor))}</div>`
 +box('Andamento dos orçamentos',andamento(L));
}

// Tabela no computador; no celular vira lista de cartões. Clicar abre a janela com os detalhes.
const pillO=o=>`<span class="pill ${{'Fechado':'ok','Não fechou':'nf'}[stt(o)]||''}">${stt(o)}</span>`;
const andamento=L=>`<div class="so-d sc"><table><thead><tr>${['Data','Vendedor','Produtor','Objetivo','Valor','Status','Retorno do orç.','Comissão'].map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${L.map(o=>`<tr class="clk" data-ok="${o.id}"><td>${br(o.data)}</td><td>${esc(o.vendedor)}</td><td>${esc(o.produtor_nome)}</td><td>${esc(o.objetivo)}</td><td>${brl(o.valor)}</td><td>${stt(o)}</td><td>${stt(o)=='Não fechou'&&o.retorno?(o.retorno<hoje()?'⚠ ':'')+br(o.retorno):''}</td><td>${stt(o)=='Fechado'?brl(o.comissao_valor):'—'}</td></tr>`).join('')}</tbody></table></div>`
 +`<div class="so-m cards">${L.map(o=>`<div class="card" data-ok="${o.id}"><span><b>${esc(o.produtor_nome)}</b> ${pillO(o)}</span><small>${br(o.data)} · ${brl(o.valor)} · ${esc(o.vendedor)}</small></div>`).join('')}</div><p class="m">Toque num orçamento para ver todos os detalhes.</p>`;
function abrirOrc(id){
 const o=DB.orcamentos.find(x=>x.id==id);if(!o)return;
 const s=stt(o),D=[['Data',br(o.data)],['Vendedor',o.vendedor],['Objetivo',o.objetivo],['Valor',brl(o.valor)],['Status',s]];
 if(s=='Fechado')D.push(['Comissão',brl(o.comissao_valor)]);
 if(s=='Não fechou'&&o.retorno)D.push(['Retorno do orçamento',br(o.retorno)]);
 abrirModal(`<h2>${esc(o.produtor_nome)}</h2><p class="m">${esc(o.cidade)}</p><dl class="dl">${D.map(([k,v])=>`<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl><h3>Produtos</h3><p class="txt">${esc(o.produtos)||'—'}</p>`+(s=='Não fechou'?`<h3>Motivo</h3><p class="txt">${esc(o.motivo)||'Não informado'}</p>`:''));
}
