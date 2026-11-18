// Dashboard do vendedor (o gestor escolhe de qual vendedor quer ver): Resumo, Comissões e CRM
const nomeMes=m=>{const s=new Date(m+'-15T12:00').toLocaleDateString('pt-BR',{month:'long',year:'numeric'});return s.charAt(0).toUpperCase()+s.slice(1)};
const mesAtual=()=>hoje().slice(0,7);
const fechado=o=>stt(o)=='Fechado';
const mesFech=o=>(o.data_fechamento||o.data||'').slice(0,7); // mês em que a venda fechou (sem data de fechamento, usa a data do orçamento)
const orcsDe=V=>DB.orcamentos.filter(o=>o.vendedor==V);
const visDeV=V=>DB.visitas.filter(v=>v.vendedor==V);
const clisDe=V=>DB.clientes.filter(c=>c.vendedor==V);
const pct=(a,b)=>b>0?Math.round(1000*a/b)/10:0;
const fmtPct=n=>String(n).replace('.',',')+'%';
const metaDe=(mes,nome)=>(METAS[mes]||{})[nome]||(METAS.padrao||{})[nome]||null;
const vendDash=()=>Auth.gestor?(dv||Auth.vendedor||VEND[0]):Auth.vendedor;
let DKEYS=[];

function dash(){
 if(!Auth.gestor&&!Auth.vendedor)return box('Dashboard','<p class="m">Seu e-mail ainda não está vinculado a um vendedor. Peça ao gestor para vincular em Gestor > Vendedores.</p>');
 return`<div class="bar2">${[['resumo','Resumo'],['com','Comissões'],['crm','CRM']].map(([k,l])=>`<button class="${dt==k?'pri':''}" data-dt="${k}">${l}</button>`).join('')}</div>`
 +(Auth.gestor?`<div class="box"><div class="g"><label>Vendedor<select id="dvsel">${VEND.map(n=>`<option${n==vendDash()?' selected':''}>${esc(n)}</option>`).join('')}</select></label></div></div>`:'')
 +'<div id="dbody"></div>';
}
function ddraw(){
 charts.forEach(c=>c.destroy());charts=[];jobs=[];pn=0;
 const el=$('#dbody');if(!el)return;
 const V=vendDash();
 el.innerHTML=dt=='com'?dComissoes(V):dt=='crm'?dCRM(V):dResumo(V);
 if(typeof Chart!='undefined'){Chart.defaults.color=getComputedStyle(document.body).color;jobs.forEach(j=>j())}
 else if(jobs.length)el.insertAdjacentHTML('beforeend','<p class="m">Os gráficos precisam de internet para carregar.</p>');
}

// Barra de meta: carrega conforme o realizado; ao chegar em 100% mostra a frase de parabéns
const metaBox=(t,real,meta,f,tipo)=>{
 if(!meta)return box(t,`<p class="m">Meta ainda não definida pelo gestor. Realizado no mês: <b>${f(real)}</b></p>`);
 const p=pct(real,meta);
 return box(t,`<div class="mh"><b>${f(real)}</b><span>de ${f(meta)} · ${fmtPct(p)}</span></div><div class="prog${p>=100?' ok':''}"><i style="width:${Math.min(100,p)}%"></i></div>`
  +(p>=100?`<p class="parab">🎉 Parabéns! Você bateu a meta de ${tipo} deste mês!</p>`:`<p class="m">Faltam ${f(meta-real)} para a meta.</p>`));
};

function dResumo(V){
 const mes=mesAtual(),F=orcsDe(V).filter(o=>fechado(o)&&mesFech(o)==mes),mt=metaDe(mes,V)||{};
 const vis=visDeV(V).filter(v=>(v.data||'').slice(0,7)==mes).length,C=clisDe(V);
 const GR=construirGR(C,false);DKEYS=GR.map(x=>x[0]);
 const on=x=>!dsel||dsel.has(x[0]),S=GR.filter(on);
 return`<div class="destaque"><small>Comissão até o momento · ${nomeMes(mes)}</small><b>${brl(sum(F,o=>o.comissao_valor))}</b><span>${F.length} ${F.length==1?'venda fechada':'vendas fechadas'} neste mês · zera todo mês (outros meses em Comissões)</span></div>`
 +metaBox('Meta de faturamento',sum(F,o=>o.valor),mt.fat,brl,'faturamento')
 +metaBox('Meta de visitas',vis,mt.vis,n=>fmt(n)+(n==1?' visita':' visitas'),'visitas')
 +(C.length?kpisDe(C)+filtroGraficos(GR,dsel,dopen,'dchk','data-d','dtodos','dnenhum')+(S.length?`<div class="two">${S.map(x=>x[2]()).join('')}</div>`:'<p class="m">Nenhum gráfico selecionado.</p>'):'<p class="m">Nenhum cliente cadastrado neste vendedor.</p>')
 +box('Retornos de visitas agendados',listaRet(retornos(C)));
}

// Vendas fechadas: tabela no computador, cartões no celular (clicar abre os detalhes do orçamento)
const listaVendas=F=>`<div class="so-d sc"><table><thead><tr>${['Fechamento','Produtor','Objetivo','Valor','Comissão'].map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${F.map(o=>`<tr class="clk" data-ok="${o.id}"><td>${br(o.data_fechamento||o.data)}</td><td>${esc(o.produtor_nome)}</td><td>${esc(o.objetivo)}</td><td>${brl(o.valor)}</td><td>${brl(o.comissao_valor)}</td></tr>`).join('')}</tbody></table></div>`
 +`<div class="so-m cards">${F.map(o=>`<div class="card" data-ok="${o.id}"><span><b>${esc(o.produtor_nome)}</b> <span class="pill ok">${brl(o.comissao_valor)}</span></span><small>${br(o.data_fechamento||o.data)} · ${brl(o.valor)} · ${esc(o.objetivo)}</small></div>`).join('')}</div>`;

function dComissoes(V){
 const mes=dmes,A=orcsDe(V).filter(fechado),F=A.filter(o=>mesFech(o)==mes).sort((a,b)=>(b.data_fechamento||b.data||'').localeCompare(a.data_fechamento||a.data||'')),ano=A.filter(o=>mesFech(o).slice(0,4)==mes.slice(0,4));
 return box('Comissão por mês',`<div class="g"><label>Mês<input type="month" id="dmes" value="${mes}"></label></div>`)
 +`<div class="destaque"><small>Comissão em ${nomeMes(mes)}${mes==mesAtual()?' (mês atual)':''}</small><b>${brl(sum(F,o=>o.comissao_valor))}</b><span>${F.length} ${F.length==1?'venda fechada':'vendas fechadas'} · faturamento ${brl(sum(F,o=>o.valor))} · total em ${mes.slice(0,4)}: ${brl(sum(ano,o=>o.comissao_valor))}</span></div>`
 +box('Vendas fechadas no mês',F.length?listaVendas(F)+'<p class="m">Toque numa venda para ver os detalhes.</p>':'<p class="m">Nenhuma venda fechada neste mês.</p>');
}

function dCRM(V){
 const mes=mesAtual(),O=orcsDe(V),Om=O.filter(o=>(o.data||'').slice(0,7)==mes);
 const Fa=O.filter(fechado),Fm=Fa.filter(o=>mesFech(o)==mes),va=visDeV(V),vm=va.filter(v=>(v.data||'').slice(0,7)==mes);
 const conv=a=>{const f=a.filter(fechado).length;return`<div class="kpi"><b>${a.length?fmtPct(pct(f,a.length)):'—'}</b><small>${a.length?`${f} de ${a.length} orçamentos`:'sem orçamentos'}</small></div>`};
 const vpv=(v,s)=>s?`<b>${String(Math.round(10*v/s)/10).replace('.',',')} visitas</b> para cada 1 venda <span class="m">(${v} ${v==1?'visita':'visitas'} e ${s} ${s==1?'venda':'vendas'})</span>`:`<span class="m">Nenhuma venda ainda (${v} ${v==1?'visita':'visitas'}).</span>`;
 const porObj=OBJ.map(ob=>{const a=O.filter(o=>o.objetivo==ob),f=a.filter(fechado).length;return[esc(ob),a.length,f,a.length?fmtPct(pct(f,a.length)):'—']});
 // Penetração DeLaval: linhas de produto com marca DeLaval ÷ linhas possíveis (5 por cliente)
 const C=clisDe(V).sort((a,b)=>a.nome.localeCompare(b.nome)),sel=C.find(c=>c.id==dprod),L=sel?[sel]:C;
 const dl=sum(L,c=>PROD.filter(([k])=>c['p_'+k+'_marca']=='DeLaval').length),tot=L.length*PROD.length;
 const cat={'DeLaval':0,'Outras marcas':0,'Não usa':0,'Sem informação':0};
 L.forEach(c=>PROD.forEach(([k])=>{const m=c['p_'+k+'_marca'];cat[!m?'Sem informação':m=='DeLaval'?'DeLaval':m=='Não usa'?'Não usa':'Outras marcas']++}));
 const linhas=PROD.map(([k,l])=>{const n=L.filter(c=>c['p_'+k+'_marca']=='DeLaval').length;return sel?[l,esc(sel['p_'+k+'_marca']||'sem informação'),sel['p_'+k+'_marca']=='DeLaval'?'✓ DeLaval':'—']:[l,`${n} de ${L.length} clientes`,fmtPct(pct(n,L.length))]});
 return box('Conversão de orçamentos em fechamento',`<div class="kpis">${conv(O)}${conv(Om)}</div><p class="m">Primeiro número: todos os orçamentos. Segundo: orçamentos feitos em ${nomeMes(mes)}.</p>`+tbl(['Objetivo','Orçamentos','Fechados','Conversão'],porObj))
 +box('Visitas para cada venda',`<p>Geral: ${vpv(va.length,Fa.length)}</p><p>${nomeMes(mes)}: ${vpv(vm.length,Fm.length)}</p>`)
 +box('Penetração de produtos DeLaval',`<div class="g"><label>Produtor<select id="dprod"><option value="">Todos os produtores (geral)</option>${C.map(c=>`<option value="${c.id}"${c.id==dprod?' selected':''}>${esc(lbl(c))}</option>`).join('')}</select></label></div>`
  +(L.length?`<div class="kpis"><div class="kpi"><b>${fmtPct(pct(dl,tot))}</b><small>penetração ${sel?'neste produtor':'geral'} (${dl} de ${tot} linhas de produto)</small></div></div>`+tbl(['Produto',sel?'Marca usada':'Clientes com DeLaval',sel?'DeLaval?':'Penetração'],linhas):'<p class="m">Nenhum cliente cadastrado.</p>'))
 +(L.length?pbox('Linhas de produto por situação',Object.entries(cat).filter(([,n])=>n)):'');
}
