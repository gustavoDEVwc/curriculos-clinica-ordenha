// Aplicativo: cadastro de clientes, dashboard, exportação, navegação e login
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const sum=(a,f)=>a.reduce((s,x)=>s+(+f(x)||0),0);
const grp=(a,f)=>a.reduce((m,x)=>{const k=f(x)||'(não informado)';(m[k]=m[k]||[]).push(x);return m},{});
const fmt=n=>n.toLocaleString('pt-BR');
const br=d=>d?d.split('-').reverse().join('/'):'';
const hoje=()=>new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
function semana(){const d=new Date(hoje()+'T12:00');d.setDate(d.getDate()-(d.getDay()+6)%7);const a=d.toISOString().slice(0,10);d.setDate(d.getDate()+5);return{v:'',de:a,ate:d.toISOString().slice(0,10)}}

let cur=null,tab='cli',q='',back=null,orcCur=null,orcDraft=null,vcur=null,lf='todos',gsel=null,gopen=false,vfd='',vfr='',vag=null,gt='dash',gf={v:'',c:'',i:'',p:''},gv=semana(),go={v:'',s:'',o:'',de:'',ate:''},charts=[],jobs=[];

function inp(f,v,list){
 const[k,l,t,r,o]=f,at=list?`data-k="${k}"`:`name="${k}"`,rq=r?' required':'';
 let h;
 if(t=='s')h=`<select ${at}${rq}><option value=""></option>${(v&&!o.some(x=>x.split('|')[0]==v)?[...o,v]:o).map(x=>{const[a,b]=x.split('|');return`<option value="${esc(a)}"${v==a?' selected':''}>${esc(b||a)}</option>`}).join('')}</select>`;
 else if(t=='a')h=`<textarea ${at}${rq} rows="2">${esc(v)}</textarea>`;
 else h=`<input ${at} type="${{n:'number',d:'date',p:'tel'}[t]||'text'}"${t=='n'?' step="any" inputmode="decimal"':''}${t=='c'?` list="dl_${k}" autocomplete="off"`+(k=='cidade'?' placeholder="Digite o nome da cidade"':''):''} value="${esc(v)}"${rq}>`;
 return`<label>${l}${r?' *':''}${h}</label>`;
}
const row=(F,v={})=>`<div class="row"><div class="g">${F.map(f=>inp(f,v[f[0]],1)).join('')}<button type="button" class="del" data-act="del">Remover</button></div></div>`;

function form(){
 const c=cur.vendedor?cur:{...cur,vendedor:Auth.vendedor};
 const dl=ALL.filter(f=>f[2]=='c').map(([k])=>`<datalist id="dl_${k}">${[...new Set([...(SEED[k]||[]),...DB.clientes.map(x=>x[k])].filter(Boolean))].map(v=>`<option value="${esc(v)}">`).join('')}</datalist>`).join('');
 return`<form id="f">${S.map(([n,F,l])=>`<section><h2>${n}</h2>`+(l
  ?`<div data-l="${l}">${(c[l]||[]).map(r=>row(F,r)).join('')}</div><button type="button" data-act="add" data-l="${l}">+ Adicionar</button>`
  :`<div class="g">${F.map(f=>inp(f,c[f[0]])).join('')}</div>`+(n=='Propriedade'?'<p><button type="button" data-act="gps">Usar minha localização atual</button> <span id="gpsst" class="m"></span></p>':''))+'</section>').join('')}
 <div class="act"><button class="pri">Salvar cliente</button><button type="button" data-act="back">Cancelar</button>${c.id?'<button type="button" class="del" data-act="delc">Excluir cliente</button>':''}</div>${dl}</form>`;
}
function sync(){
 const f=$('#f').elements;
 const transf=Auth.gestor&&cur.id; // só o gestor troca o vendedor de um cliente já cadastrado
 f.vendedor.disabled=!transf;
 const lv=f.vendedor.closest('label');
 if(transf&&!lv.dataset.n){lv.dataset.n=1;lv.insertAdjacentHTML('beforeend','<small>Gestor: escolha outro vendedor para transferir este cliente.</small>')}
 f.tipo_sala.closest('label').style.display=f.tipo_equipamento.value=='Canalizado'?'':'none';
 [...DEP.map(k=>[f[k],f[k+'_marca'],'Sim']),[f.pulsador_tipo,f.pulsador_marca,'*']].forEach(([s,m,v])=>{const on=v=='*'?!!s.value:s.value==v;m.closest('label').style.display=on?'':'none';if(!on)m.value=''});
 document.querySelectorAll('#f .row').forEach(r=>{const s=r.querySelector('[data-k=prog_limpeza]'),m=r.querySelector('[data-k=prog_limpeza_marca]');if(s&&m){const on=s.value=='Sim';m.closest('label').style.display=on?'':'none';if(!on)m.value=''}});
 PROD.forEach(([k])=>{const m=f['p_'+k+'_marca'].value,n=f['p_'+k+'_nos'];if(m&&m!='DeLaval'){n.value='Não';n.disabled=true}else n.disabled=false});
}

function cards(){
 const t=q.toLowerCase(),L=DB.clientes.filter(c=>(lf=='todos'||c.owner==Auth.user.uid)&&[c.nome,c.cidade,c.propriedade,c.vendedor].join(' ').toLowerCase().includes(t)).sort((a,b)=>a.nome.localeCompare(b.nome));
 return L.length?L.map(c=>`<div class="card" data-id="${c.id}"><span><b>${esc(c.nome)}</b> <span class="pill">${esc(c.prioridade)}</span></span><small>${esc(c.cidade)} · ${esc(c.ord_marca)} · ${esc(c.unidades_ordenha)} conjuntos · ${esc(c.animais_ordenha)} vacas${c.vendedor?' · '+esc(c.vendedor):''}</small></div>`).join(''):'<p class="m">Nenhum cliente encontrado. Toque em “Novo cliente” para começar.</p>';
}
const list=()=>`<div class="bar2"><input id="q" placeholder="Buscar por nome, cidade ou propriedade" value="${esc(q)}"><button class="pri" data-act="new">Novo cliente</button></div><div class="bar2"><button class="${lf=='todos'?'pri':''}" data-lf="todos">Todos os clientes</button><button class="${lf=='meus'?'pri':''}" data-lf="meus">Meus clientes</button></div><div class="cards" id="cards">${cards()}</div>`;

const tbl=(h,rows)=>`<div class="sc"><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const bars=(a,f)=>{const m=Object.entries(grp(a,f)).map(([k,v])=>[k,v.length]).sort((x,y)=>y[1]-x[1]);if(!m.length)return'<p class="m">Sem dados.</p>';const mx=m[0][1];return m.map(([k,v])=>`<div class="br"><span>${esc(k)}</span><i style="--w:${v/mx*100}%"></i><b>${v}</b></div>`).join('')};
const box=(t,h)=>`<div class="box"><h2>${t}</h2>${h}</div>`;

function dash(){
 const C=meusClientes();if(!C.length)return'<p class="m">Cadastre clientes para ver os indicadores.</p>';
 const cap=c=>sum(c.resfriadores||[],r=>r.capacidade_l),today=new Date().toISOString().slice(0,10);
 const kpi=(l,v)=>`<div class="kpi"><b>${fmt(v)}</b><small>${l}</small></div>`;
 const marcas=[...new Set(C.map(c=>c.ord_marca).filter(Boolean))].sort();
 const dl=a=>Math.round(100*a.filter(c=>c.ord_marca=='DeLaval').length/a.length)+'%';

 const prod=PROD.map(([k,l])=>{const a=C.filter(c=>c['p_'+k+'_marca']);return box(l,`<p class="m">${a.filter(c=>c['p_'+k+'_nos']=='Sim').length} de ${a.length} compram de nós</p>`+bars(a,c=>c['p_'+k+'_marca']))}).join('');
 return`<div class="kpis">${kpi('clientes',C.length)}${kpi('vacas em ordenha',sum(C,c=>c.animais_ordenha))}${kpi('conjuntos de ordenha',sum(C,c=>c.unidades_ordenha))}${kpi('litros por dia',sum(C,c=>c.producao_dia))}${kpi('litros de resfriamento',sum(C,cap))}</div>`
 +box('Marcas de ordenha por cidade (nº de clientes)',tbl(['Cidade',...marcas,'Total','Conjuntos','% DeLaval'],Object.entries(grp(C,c=>c.cidade)).sort().map(([k,a])=>[esc(k),...marcas.map(m=>a.filter(c=>c.ord_marca==m).length||''),a.length,fmt(sum(a,c=>c.unidades_ordenha)),dl(a)])))
 +box('Por região (ou cidade, quando sem região)',tbl(['Região','Clientes','Vacas em ordenha','Litros/dia','Resfriamento (L)'],Object.entries(grp(C,c=>c.regiao||c.cidade)).sort().map(([k,a])=>[esc(k),a.length,fmt(sum(a,c=>c.animais_ordenha)),fmt(sum(a,c=>c.producao_dia)),fmt(sum(a,cap))])))
 +box('Por vendedor',tbl(['Vendedor','Clientes','Vacas em ordenha','Conjuntos','Prioridade A'],Object.entries(grp(C,c=>c.vendedor)).sort().map(([k,a])=>[esc(k),a.length,fmt(sum(a,c=>c.animais_ordenha)),fmt(sum(a,c=>c.unidades_ordenha)),a.filter(c=>c.prioridade=='A').length])))
 +`<div class="two">${box('Prioridade',bars(C,c=>c.prioridade))}${box('Perfil',bars(C,c=>c.perfil))}${box('Tipo de barracão',bars(C,c=>c.tipo_barracao))}${box('Tipo de equipamento',bars(C,c=>c.tipo_equipamento))}${box('Marcas de resfriador',bars(C.flatMap(c=>c.resfriadores||[]),r=>r.marca))}${box('Marca do conjunto de ordenha',bars(C,c=>c.conjunto_marca))}</div>`
 +`<div class="two">${prod}</div>`
 +box('Retornos de visitas agendados',listaRet(retornos(C)));
}

const exp=()=>box('Exportar dados',`<p>Gera um arquivo Excel (.xlsx) com quatro abas: <b>clientes</b> (uma linha por cliente), <b>resfriadores</b> e <b>visitas</b> (ligadas por <b>id_cliente</b>) e <b>orcamentos</b>. Os cabeçalhos são os nomes dos campos do banco. Cada vendedor exporta só os próprios dados; o gestor exporta tudo.</p><p><button class="pri" data-act="xlsx">Baixar Excel (.xlsx)</button></p><h2>Backup</h2><p class="m">Os dados ficam salvos neste navegador. Baixe um backup de vez em quando.</p><p><button data-act="json">Baixar backup (.json)</button></p><label>Restaurar backup<input type="file" id="imp" accept=".json"></label>`);

function xlsx(){
 if(typeof XLSX=='undefined')return alert('Biblioteca de Excel não carregou. Conecte-se à internet e recarregue a página.');
 const C=meusClientes(),wb=XLSX.utils.book_new(); // vendedor exporta só os próprios dados; gestor exporta tudo
 const num=Object.fromEntries(EXPF.map(f=>[f[0],f[2]=='n']));
 const hc=['id_cliente',...EXPF.map(f=>f[0])];
 const cl=C.map(c=>Object.fromEntries([['id_cliente',c.id],...EXPF.map(([k])=>[k,k=='ultima_visita'?ultVisita(c):num[k]&&c[k]!==''&&c[k]!=null?+c[k]:(c[k]??'')])]));
 const sub=l=>{const F=S.find(s=>s[2]==l)[1].map(f=>f[0]);return[['id_cliente',...F],C.flatMap(c=>(c[l]||[]).map(r=>({id_cliente:c.id,...r})))]};
 XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(cl,{header:hc}),'clientes');
 {const[h,d]=sub('resfriadores');XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(d,{header:h}),'resfriadores')}
 const VH=['id','cliente_id','produtor_nome','cidade','vendedor','data','obs','oportunidades','retorno'];
 XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(DB.visitas.map(v=>Object.fromEntries(VH.map(k=>[k,v[k]??'']))),{header:VH}),'visitas');
 const OH=['id','vendedor','data','objetivo','produtor_id','produtor_nome','cidade','produtos','valor','via_coamo','comissao_valor','recebimento_clinica','fechamento','motivo','retorno'];
 XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(DB.orcamentos.map(o=>Object.fromEntries(OH.map(k=>[k,['valor','comissao_valor','recebimento_clinica'].includes(k)?+o[k]||0:o[k]??'']))),{header:OH}),'orcamentos');
 XLSX.writeFile(wb,'clinica_ordenha_'+new Date().toISOString().slice(0,10)+'.xlsx');
}

// Cliente de outro vendedor: só leitura (somente o dono e o gestor alteram)
function travarForm(){
 const f=$('#f');
 f.querySelectorAll('input,select,textarea,button').forEach(x=>{if(x.dataset.act!='back')x.disabled=true});
 f.querySelectorAll('.act .pri,.act .del').forEach(x=>x.hidden=true);
 f.querySelector('[data-act=back]').textContent='Voltar';
 f.insertAdjacentHTML('afterbegin',`<div class="box"><b>Somente leitura.</b> Este cliente é de ${esc(cur.vendedor||'outro vendedor')}; só ele e o gestor podem alterar o cadastro.</div>`);
}
const medeHeader=()=>document.documentElement.style.setProperty('--hh',$('header').offsetHeight+'px');
addEventListener('resize',medeHeader);
function render(keep){
 const n=$('#nav'),m=$('#menu'),ap=$('#app'),ac=$('#acoes');
 m.hidden=true;
 if(!Auth.pronto||Auth.erro||!Auth.user){n.innerHTML=m.innerHTML=ac.innerHTML='';ap.innerHTML=!Auth.pronto?'<p class="m">Carregando…</p>':Auth.erro?'<p class="m">Não foi possível carregar o Firebase. Verifique a internet e recarregue a página.</p>':loginHTML();return}
 const T=[['cli','Currículo do Cliente'],['vis','Visitas a produtores'],['orc','Orçamentos'],['dash','Dashboard'],['exp','Exportar'],...(Auth.gestor?[['ges','Gestor']]:[])],bt=([k,l])=>`<button class="${tab==k?'on':''}" data-tab="${k}">${l}</button>`;
 n.innerHTML=T.map(bt).join(''); // abas (computador)
 ac.innerHTML=bell()+btnTema()+'<button class="sairb" data-act="sair">Sair</button><button class="hamb" data-act="menu" aria-label="Menu"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>';
 m.innerHTML=T.map(bt).join('')+'<button class="sairm" data-act="sair">Sair</button>'; // menu do celular
 medeHeader();
 ap.innerHTML=tab=='cli'?(cur?form():list()):tab=='orc'?(orcCur?orcForm():orcList()):tab=='vis'?(vcur?visForm():vag?agenda():visList()):tab=='dash'?dash():tab=='ges'?gestor():exp();
 if(cur&&tab=='cli'){sync();if(!podeEditar(cur))travarForm()}
 if(orcCur&&tab=='orc')osync();
 if(vcur&&tab=='vis')vsync();
 if(tab=='ges'&&Auth.gestor)gdraw();
 if(!keep)scrollTo(0,0);
}

document.addEventListener('click',e=>{
 if(!e.target.closest('.hamb')){const mn=$('#menu');if(mn)mn.hidden=true}
 if(!e.target.closest('[data-dia]'))hideTip();
 if(!e.target.closest('.bell,#notif'))$('#notif').hidden=true;
 const t=e.target.closest('[data-tab],[data-act],[data-id],[data-gt],[data-oid],[data-vi],[data-vk],[data-ok],[data-dia],[data-nt],[data-lf]');if(!t)return;
 const d=t.dataset;
 if(d.tab){if(d.tab=='ges'){gsel=null;gopen=false}tab=d.tab;cur=null;orcCur=null;vcur=null;vag=null;back=null;render()}
 else if(d.oid){orcCur=DB.orcamentos.find(o=>o.id==d.oid);render()}
 else if(d.gt){gt=d.gt;if(gt=='dash')gsel=null;render()}
 else if(d.id){cur=DB.clientes.find(c=>c.id==d.id);render()}
 else if(d.act=='new'){if(exigeVinculo()){cur={};render()}}
 else if(d.act=='back'){cur=null;if(back=='orc'){back=null;tab='orc';orcCur=orcDraft}render()}
 else if(d.act=='add'){$(`[data-l="${d.l}"]`).insertAdjacentHTML('beforeend',row(S.find(s=>s[2]==d.l)[1]));sync()}
 else if(d.act=='del')t.closest('.row').remove();
 else if(d.act=='delc'){if(confirm('Excluir este cliente? Essa ação não pode ser desfeita.')){Dados.excluir('clientes',cur.id);cur=null;render()}}
 else if(d.act=='gps'){
  if(!navigator.geolocation)return alert('Este navegador não oferece localização.');
  const f=$('#f').elements,st=$('#gpsst');let best=null,id,tm;
  const fim=msg=>{navigator.geolocation.clearWatch(id);clearTimeout(tm);t.disabled=false;st.textContent=msg||(best?`Localização salva (precisão de ±${Math.round(best.coords.accuracy)} m).`+(best.coords.accuracy>100?' Precisão baixa: no notebook a posição vem do Wi-Fi/internet e pode errar quilômetros. Use o celular ao ar livre, com o GPS ligado, e toque de novo.':''):'Não foi possível obter a localização.')};
  t.disabled=true;st.textContent='Buscando sinal de GPS…';
  tm=setTimeout(()=>fim(),25000);
  id=navigator.geolocation.watchPosition(p=>{
   if(!best||p.coords.accuracy<best.coords.accuracy){best=p;const la=p.coords.latitude.toFixed(6),ln=p.coords.longitude.toFixed(6);f.gps_lat.value=la;f.gps_lng.value=ln;f.gps_link.value=`https://www.google.com/maps?q=${la},${ln}`;st.textContent=`Melhorando a precisão… ±${Math.round(p.coords.accuracy)} m`}
   if(p.coords.accuracy<=15)fim();
  },()=>fim(best?null:'Não foi possível obter a localização. Permita o acesso à localização no navegador e no aparelho.'),{enableHighAccuracy:true,maximumAge:0,timeout:25000});
 }
 else if(d.act=='menu'){const mn=$('#menu');mn.style.top=$('header').getBoundingClientRect().bottom+'px';mn.hidden=!mn.hidden}
 else if(d.act=='sair'){tab='cli';cur=orcCur=vcur=null;vag=null;Dados.sair()}
 else if(d.act=='onovo'){if(exigeVinculo()){orcCur={};render()}}
 else if(d.act=='oback'){orcCur=null;render()}
 else if(d.act=='odel'){if(confirm('Excluir este orçamento?')){Dados.excluir('orcamentos',orcCur.id);orcCur=null;render()}}
 else if(d.act=='ocnovo'){if(!exigeVinculo())return;orcDraft=ocollect();back='orc';tab='cli';cur={};orcCur=null;render()}
 else if(d.act=='tema')alternarTema();
 else if(d.nt){const[tp,id]=d.nt.split('|');marcar([t.dataset.nk]);refBadge();$('#notif').hidden=true;irNotif(tp,id)}
 else if(d.act=='notif'){const p=$('#notif');p.innerHTML=notifHTML();p.style.top=$('header').getBoundingClientRect().bottom+'px';p.hidden=!p.hidden}
 else if(d.act=='nlidas'){marcar(notificacoes().map(x=>x.k));$('#notif').innerHTML=notifHTML();refBadge()}
 else if(d.lf){lf=d.lf;render(true)}
 else if(d.ok)abrirOrc(d.ok);
 else if(d.dia)tipDia(t);
 else if(d.act=='vagenda'){vag=hoje().slice(0,7);render()}
 else if(d.act=='vlist'){vag=null;render()}
 else if(d.act=='mprev'||d.act=='mnext'){const[y,m]=vag.split('-').map(Number),dt=new Date(y,m-1+(d.act=='mnext'?1:-1),1);vag=dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0');render(true)}
 else if(d.vi){vcur=DB.visitas.find(x=>x.id==d.vi);render()}
 else if(d.vk)abrirVisita(d.vk);
 else if(d.act=='vnovo'){if(exigeVinculo()){vcur={};render()}}
 else if(d.act=='vback'){vcur=null;render()}
 else if(d.act=='vdel'){if(confirm('Excluir esta visita?')){Dados.excluir('visitas',vcur.id);vcur=null;render()}}
 else if(d.act=='vsalvar'){
  const lista=[...document.querySelectorAll('#gvl [data-nome]')].map(i=>({nome:i.dataset.nome,email:i.value.trim().toLowerCase()})).filter(x=>x.email),em=lista.map(x=>x.email);
  if(new Set(em).size<em.length)return alert('Há e-mails repetidos.');
  Dados.salvarConfig(lista);alert('Vínculos salvos.');
 }
 else if(d.act=='gtodos'){gsel=null;gdraw()}
 else if(d.act=='gnenhum'){gsel=new Set();gdraw()}
 else if(d.act=='lad'){
  const k=d.k,v=$('#li_'+k).value.trim();if(!v)return;
  if(LISTAS[k].some(x=>x.toLowerCase()==v.toLowerCase()))return alert('Esta opção já existe na lista.');
  LISTAS[k].splice(LISTAS[k].length-FIXOS[k].length,0,v);Dados.salvarListas(listasParaSalvar());gdraw();
 }
 else if(d.act=='lrm'){
  if(!confirm('Remover "'+d.v+'" da lista?'))return;
  const i=LISTAS[d.k].indexOf(d.v);if(i>=0)LISTAS[d.k].splice(i,1);Dados.salvarListas(listasParaSalvar());gdraw();
 }
 else if(d.act=='xlsx')xlsx();
 else if(d.act=='json'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(DB)],{type:'application/json'}));a.download='backup_clinica_ordenha.json';a.click()}
});
document.addEventListener('input',e=>{if(e.target.id=='q'){q=e.target.value;$('#cards').innerHTML=cards()}if(e.target.name=='cidade')e.target.setCustomValidity('');if(e.target.closest('#of')){if(e.target.name=='produtor')e.target.setCustomValidity('');osync()}
 if(e.target.closest('#vf')){if(e.target.name=='produtor')e.target.setCustomValidity('');vsync()}});
document.addEventListener('change',e=>{
 if(e.target.closest('#f'))sync();
 if(e.target.closest('#of'))osync();
 if(e.target.matches('[data-g]')){if(!gsel)gsel=new Set(GKEYS);e.target.checked?gsel.add(e.target.dataset.g):gsel.delete(e.target.dataset.g);gdraw()}
 if(e.target.closest('#vf'))vsync();
 if(e.target.closest('#vfl')){if(e.target.id=='vfd')vfd=e.target.value;else vfr=e.target.value;render(true)}
 if(e.target.id=='vmes'&&e.target.value){vag=e.target.value;render(true)}
 if(e.target.closest('#gf')){const x=e.target.value;({gfv:()=>gf.v=x,gfc:()=>gf.c=x,gfi:()=>gf.i=x,gfp:()=>gf.p=x,gvv:()=>gv.v=x,gde:()=>gv.de=x,gate:()=>gv.ate=x,gov:()=>go.v=x,gos:()=>go.s=x,goo:()=>go.o=x,gode:()=>go.de=x,goate:()=>go.ate=x})[e.target.id]();gdraw()}
 if(e.target.id=='imp'){const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);if(!Array.isArray(o.clientes))throw 0;if(confirm('Importar os dados do backup? Itens com o mesmo id serão atualizados.')){['clientes','visitas','orcamentos'].forEach(k=>(o[k]||[]).forEach(c=>Dados.salvar(k,{...c,owner:Auth.gestor?(c.owner||Auth.user.uid):Auth.user.uid})));Dados.migrar();render();alert('Backup importado.')}}catch(x){alert('Arquivo de backup inválido.')}};r.readAsText(e.target.files[0])}
});
document.addEventListener('submit',e=>{
 e.preventDefault();
 if(e.target.id=='lf')return entrar(e);
 if(e.target.id=='of')return salvarOrc(e);
 if(e.target.id=='vf')return salvarVis(e);
 const f=e.target,o={id:cur.id||uid(),owner:cur.owner||Auth.user.uid};
 ALL.forEach(([k])=>o[k]=f.elements[k].value.trim());
 const nz=x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim(),ct=CIDADES.find(x=>nz(x)==nz(o.cidade));
 if(ct)o.cidade=ct;else if(o.cidade!=cur.cidade){const c=f.elements.cidade;c.setCustomValidity('Escolha uma cidade da lista do Paraná');c.reportValidity();return}
 DEP.forEach(k=>{if(o[k]!='Sim')o[k+'_marca']=''});if(!o.pulsador_tipo)o.pulsador_marca='';
 PROD.forEach(([k])=>{const m=o['p_'+k+'_marca'];if(m&&m!='DeLaval')o['p_'+k+'_nos']='Não'});
 S.filter(s=>s[2]).forEach(([,F,l])=>o[l]=[...f.querySelectorAll(`[data-l="${l}"] .row`)].map(r=>Object.fromEntries([...r.querySelectorAll('[data-k]')].map(x=>[x.dataset.k,x.value.trim()]))).filter(r=>Object.values(r).some(Boolean)));
 if(o.tipo_equipamento!='Canalizado')o.tipo_sala='';
 const m=(o.gps_link||'').match(/(-?\d+\.\d+)[,\s]+(-?\d+\.\d+)/);
 if(m&&!o.gps_lat){o.gps_lat=m[1];o.gps_lng=m[2]}
 if(o.gps_lat&&o.gps_lng&&!o.gps_link)o.gps_link=`https://www.google.com/maps?q=${o.gps_lat},${o.gps_lng}`;
 o.criado_em=cur.criado_em||new Date().toISOString();
 o.vendedor=Auth.gestor&&cur.id?f.elements.vendedor.value:(cur.vendedor||Auth.vendedor);
 if(cur.id&&o.vendedor&&o.vendedor!=cur.vendedor){ // transferência de cliente (só o gestor chega aqui)
  const u2=uidVendedor(o.vendedor);
  if(!u2)return alert(`${o.vendedor} ainda não entrou no app ou não tem e-mail vinculado. Vincule o e-mail em Gestor > Vendedores e peça para ele entrar uma vez.`);
  if(!confirm(`Transferir "${o.nome}" de ${cur.vendedor||'sem vendedor'} para ${o.vendedor}?\n\nAs visitas deste cliente também passam para ${o.vendedor}. Os orçamentos continuam com quem os criou (a comissão não muda).`))return;
  o.owner=u2;
  DB.visitas.filter(x=>x.cliente_id==cur.id).forEach(x=>Dados.salvar('visitas',{...x,owner:u2}));
 }
 o.atualizado_em=new Date().toISOString();
 Dados.salvar('clientes',o);
 if(back=='orc'){back=null;tab='orc';orcCur={...orcDraft,produtor_id:o.id}}
 cur=null;render();
});
const loginHTML=()=>`<form id="lf" class="box" style="max-width:380px;margin:24px auto"><h2>Entrar</h2><div class="g"><label>E-mail<input name="email" type="email" autocomplete="username" required></label><label>Senha<input name="senha" type="password" autocomplete="current-password" required></label></div><p id="lerr" style="color:var(--w)"></p><button class="pri">Entrar</button></form>`;
function entrar(e){
 const f=e.target.elements,er=$('#lerr');er.textContent='';
 Dados.entrar(f.email.value.trim(),f.senha.value).catch(x=>er.textContent=x.code=='auth/network-request-failed'?'Sem conexão. Tente novamente.':'E-mail ou senha incorretos.');
}
// Aviso de conexão: sem internet ou alterações ainda sendo enviadas
function refNet(){
 const e=$('#offline');if(!e)return;
 const off=!navigator.onLine,p=Object.values(Rede.pend).some(Boolean);
 e.hidden=!(off||p);
 e.textContent=off?'Sem internet: pode continuar usando. As alterações serão enviadas quando a conexão voltar.':'Enviando alterações…';
}
addEventListener('online',refNet);addEventListener('offline',refNet);
function iniciar(){render();refNet();Dados.init((t,meta)=>{refNet();if(t=='auth'){render();return}if(!meta&&!cur&&!orcCur&&!vcur)render(true)})}
iniciar();
