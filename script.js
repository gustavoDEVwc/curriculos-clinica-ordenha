const KEY='clinica_ordenha_v1',YN=['Sim','Não'];
const MARCAS=['GMZ','Intermaq','GEA','DeLaval','Boumatic','Eurolatte','Reafrio','Sulinox','BRmilk','Heidel','Outro'];
const MRES=['Sulinox','GEA','DeLaval','Heidel','Reafrio','Geogas','Serap','Ordemilk','Tecnofrio','Weizur','Outro'];
const DIAM=['51 mm','63 mm','76 mm'];
const PROD=[['pre_dipping','Pré-dipping'],['pos_dipping','Pós-dipping'],['alcalino','Alcalino'],['acido','Ácido'],['sanitizante','Sanitizante']];
const MPROD=['DeLaval','GEA','Weizur','Kron','Launer','C-Tec','RUM','Quimitol','Ordenhe','America Nutrients','Prima Raça','Kercia','BRS','Bous','AZ Clean','Não usa','Outra'];
const ASSIST=['Clínica da Ordenha','Forte Leite','Milkvel','Ordemilk','Milktec','Ordetec','SmartFarm','AlfaMilk','CB Soluções','Ordemed','Sem assistência','Outros'];
const CIDADES=["Abatiá","Adrianópolis","Agudos do Sul","Almirante Tamandaré","Altamira do Paraná","Alto Paraná","Alto Paraíso","Alto Piquiri","Altônia","Alvorada do Sul","Amaporã","Ampére","Anahy","Andirá","Antonina","Antônio Olinto","Apucarana","Arapongas","Arapoti","Arapuã","Araruna","Araucária","Ariranha do Ivaí","Assaí","Assis Chateaubriand","Astorga","Atalaia","Balsa Nova","Bandeirantes","Barbosa Ferraz","Barra do Jacaré","Barracão","Bela Vista da Caroba","Bela Vista do Paraíso","Bituruna","Boa Esperança","Boa Esperança do Iguaçu","Boa Ventura de São Roque","Boa Vista da Aparecida","Bocaiúva do Sul","Bom Jesus do Sul","Bom Sucesso","Bom Sucesso do Sul","Borrazópolis","Braganey","Brasilândia do Sul","Cafearara","Cafelândia","Cafezal do Sul","Califórnia","Cambará","Cambira","Cambé","Campina Grande do Sul","Campina da Lagoa","Campina do Simão","Campo Bonito","Campo Largo","Campo Magro","Campo Mourão","Campo do Tenente","Candói","Cantagalo","Capanema","Capitão Leônidas Marques","Carambeí","Carlópolis","Cascavel","Castro","Catanduvas","Centenário do Sul","Cerro Azul","Chopinzinho","Cianorte","Cidade Gaúcha","Clevelândia","Colombo","Colorado","Congonhinhas","Conselheiro Mairinck","Contenda","Corbélia","Cornélio Procópio","Coronel Domingos Soares","Coronel Vivida","Corumbataí do Sul","Cruz Machado","Cruzeiro do Iguaçu","Cruzeiro do Oeste","Cruzeiro do Sul","Curitiba","Curiúva","Cândido de Abreu","Céu Azul","Diamante d'Oeste","Diamante do Norte","Diamante do Sul","Dois Vizinhos","Douradina","Doutor Camargo","Engenheiro Beltrão","Entre Rios do Oeste","Enéas Marques","Esperança Nova","Espigão Alto do Iguaçu","Farol","Faxinal","Fazenda Rio Grande","Fernandes Pinheiro","Figueira","Flor da Serra do Sul","Flora da Serra","Floraí","Floresta","Florestópolis","Flórida","Formosa do Oeste","Foz do Iguaçu","Foz do Jordão","Francisco Alves","Francisco Beltrão","Fênix","General Carneiro","Godoy Moreira","Goioerê","Goioxim","Grandes Rios","Guairaçá","Guamiranga","Guapirama","Guaporema","Guaraci","Guaraniaçu","Guarapuava","Guaraqueçaba","Guaratuba","Guaíra","Honório Serpa","Ibaiti","Ibema","Ibiporã","Icaraíma","Iguaraçu","Iguatu","Imbaú","Imbituva","Inajá","Indianópolis","Inácio Martins","Ipiranga","Iporã","Iracema do Oeste","Irati","Iretama","Itaguajé","Itaipulândia","Itambaracá","Itambé","Itapejara d'Oeste","Itaperuçu","Itaúna do Sul","Ivaiporã","Ivatuba","Ivaté","Ivaí","Jaboti","Jacarezinho","Jaguapitã","Jaguariaíva","Jandaia do Sul","Janiópolis","Japira","Japurá","Jardim Alegre","Jardim Olinda","Jataizinho","Jesuítas","Joaquim Távora","Jundiaí do Sul","Juranda","Jussara","Kaloré","Lapa","Laranjal","Laranjeiras do Sul","Leópolis","Lidianópolis","Lindoeste","Loanda","Lobato","Londrina","Luiziana","Lunardelli","Lupionópolis","Mandaguari","Mandaguaçu","Mandirituba","Manfrinópolis","Mangueirinha","Manoel Ribas","Marechal Cândido Rondon","Maria Helena","Marialva","Marilena","Mariluz","Marilândia do Sul","Maringá","Maripá","Mariópolis","Marmeleiro","Marquinho","Marumbi","Matelândia","Matinhos","Mato Rico","Mauá da Serra","Medianeira","Mercedes","Mirador","Miraselva","Missal","Moreira Sales","Morretes","Munhoz de Melo","Nossa Senhora das Graças","Nova Aliança do Ivaí","Nova América da Colina","Nova Aurora","Nova Cantu","Nova Esperança","Nova Esperança do Sudoeste","Nova Fátima","Nova Laranjeiras","Nova Londrina","Nova Olímpia","Nova Prata do Iguaçu","Nova Santa Bárbara","Nova Santa Rosa","Nova Tebas","Novo Itacolomi","Ortigueira","Ourizona","Ouro Verde do Oeste","Paiçandu","Palmas","Palmeira","Palmital","Palotina","Paranacity","Paranaguá","Paranapoema","Paranavaí","Paraíso do Norte","Pato Bragado","Pato Branco","Paula Freitas","Paulo Frontin","Peabiru","Perobal","Pinhais","Pinhal de São Bento","Pinhalão","Pinhão","Piraquara","Piraí do Sul","Pitanga","Pitangueiras","Piên","Planaltina do Paraná","Planalto","Ponta Grossa","Pontal do Paraná","Porecatu","Porto Amazonas","Porto Barreiro","Porto Rico","Porto Vitória","Prado Ferreira","Pranchita","Prudentópolis","Pérola","Pérola d'Oeste","Quarto Centenário","Quatiguá","Quatro Barras","Quatro Pontes","Quedas do Iguaçu","Querência do Norte","Quinta do Sol","Quitandinha","Ramilândia","Rancho Alegre","Rancho Alegre d'Oeste","Rebouças","Renascença","Reserva","Reserva do Iguaçu","Ribeirão Claro","Ribeirão do Pinhal","Rio Azul","Rio Bom","Rio Bonito do Iguaçu","Rio Branco do Ivaí","Rio Branco do Sul","Rio Negro","Rolândia","Roncador","Rondon","Rosário do Ivaí","Sabáudia","Salgado Filho","Salto do Itararé","Salto do Lontra","Santa Amélia","Santa Cecília do Pavão","Santa Cruz de Monte Castelo","Santa Fé","Santa Helena","Santa Inês","Santa Isabel do Ivaí","Santa Izabel do Oeste","Santa Lúcia","Santa Maria do Oeste","Santa Mariana","Santa Mônica","Santa Tereza do Oeste","Santa Terezinha de Itaipu","Santana do Itararé","Santo Antônio da Platina","Santo Antônio do Cairuá","Santo Antônio do Paraíso","Santo Antônio do Sudoeste","Sapopema","Sarandi","Saudade do Iguaçu","Sengés","Serranópolis do Iguaçu","Sertaneja","Sertanópolis","Siqueira Campos","Sulamérica","São Carlos do Ivaí","São Jerônimo da Serra","São Jorge d'Oeste","São Jorge do Ivaí","São Jorge do Patrocínio","São José da Boa Vista","São José dos Pinhais","São João","São João do Caiuá","São João do Ivaí","São João do Triunfo","São Manoel do Paraná","São Mateus do Sul","São Miguel do Iguaçu","São Pedro do Iguaçu","São Pedro do Ivaí","São Pedro do Paraná","São Sebastião da Amoreira","São Tomé","Tamarana","Tamboara","Teixeira Soares","Telêmaco Borba","Tibagi","Tijucas do Sul","Toledo","Tomazina","Três Barras do Paraná","Tunas do Paraná","Tuneiras do Oeste","Tupãssi","Turvo","Ubiratã","Umuarama","Uniflor","União da Vitória","Uraí","Ventania","Vera Cruz do Oeste","Verê","Virmond","Vitorino","Wenceslau Braz","Xambrê","Ângulo"];
const SEED={cidade:CIDADES};
const VEND=['Gustavo Wunder Costa','Mara Cleve','Felipe','Vendedor 1','Vendedor 2'];
const DEP=['extracao','prog_limpeza_ordenha','prog_limpeza_tanque','cocador_vacas','cocador_bezerras','scrapper','robo_empurrar','automacao_alim'];
// ym = Sim/Não + campo de marca
const ym=(k,l,m='Marca')=>[[k,l,'s',0,YN],[k+'_marca',l+' – '+m.toLowerCase(),'t']];
// campo: [chave, rótulo, tipo(t texto|n número|s seleção|d data|p telefone|a texto longo|c texto com sugestões), obrigatório, opções]
// seção: [título, campos, chave da lista (opcional)]
const S=[
['Produtor',[
 ['nome','Nome do produtor','t',1],['telefone','Telefone / WhatsApp','p',1],
 ['prioridade','Prioridade','s',1,['A|A – recorrente, compra toda a linha','B|B – compra sempre, não toda a linha','C|C – de vez em quando, tem potencial','D|D – sem compra recorrente']],
 ['vendedor','Vendedor responsável','s',1,VEND],
 ['inservice','InService','s',0,YN],
 ['perfil','Perfil (PNL)','s',0,['Visual','Auditivo (ouvinte)','Cinestésico','Misto']],
 ['assistencia','Assistência atual','s',0,ASSIST],
 ['ultima_visita','Última visita','d']]],
['Propriedade',[
 ['propriedade','Nome da propriedade','t'],['cidade','Cidade','c',1],['regiao','Região','c'],
 ['tensao','Tensão da rede','s',0,['127 V','220 V','380 V']],['placa_solar','Placa solar','s',0,YN],
 ['gps_lat','Latitude','n'],['gps_lng','Longitude','n'],['gps_link','Link do mapa','t']]],
['Equipamento de ordenha',[
 ['ord_marca','Marca do equipamento','s',1,MARCAS],
 ['tipo_equipamento','Tipo de equipamento','s',1,['Balde ao pé fixo','Balde ao pé móvel','Canalizado']],
 ['tipo_sala','Tipo de sala','s',0,['Espinha de peixe','NZ','Paralelo','Carrossel']],
 ['unidades_ordenha','Unidades de ordenha (conjuntos)','n',1],
 ['conjunto_marca','Marca do conjunto de ordenha','s',0,MARCAS],['conjunto_modelo','Modelo do conjunto de ordenha','t'],
 ['linha_leite_altura','Linha de leite (altura)','s',0,['Alta (acima de 120 cm)','Média (até 120 cm)','Baixa (abaixo do piso)']],
 ['diam_linha_leite','Ø linha de leite','s',0,DIAM],['diam_linha_vacuo','Ø linha de vácuo','s',0,DIAM],
 ['diam_linha_limpeza','Ø linha de limpeza','s',0,['38 mm','51 mm']],
 ['unidade_final_l','Unidade final (L)','n'],['mangueira','Mangueira','s',0,['PVC','Borracha','Silicone']],['medidor_leite','Tipo de medidor de leite','t'],
 ['pulsador_tipo','Tipo de pulsador','s',0,['Eletrônico','Mecânico','Central com repetidores']],['pulsador_marca','Marca do pulsador','t'],
 ...ym('extracao','Extração (extrator de teteiras)'),
 ['bomba_vacuo','Bomba de vácuo (marca/modelo)','t'],['contencao','Contenção','t'],
 ...ym('prog_limpeza_ordenha','Programador de limpeza (ordenha)'),
 ...ym('prog_limpeza_tanque','Programador de limpeza (tanque)'),
 ['nobreak','No-break','s',0,YN],...ym('boiler','Boiler','Tipo')]],
['Resfriadores',[
 ['marca','Marca','s',1,MRES],['capacidade_l','Capacidade (L)','n',1],['modelo','Modelo','t'],['ordenhas','Ordenhas comportadas','n']],'resfriadores'],
['Rebanho e produção',[
 ['animais_ordenha','Animais em ordenha','n',1],
 ['producao_dia','Produção diária (L)','n'],['ordenhas_dia','Ordenhas por dia','s',0,['2','3']],['lotes','Lotes em ordenha','n']]],
['Estrutura',[
 ['tipo_barracao','Tipo de barracão','s',0,['Compost barn','Free stall','Tie stall / estábulo','Semiconfinamento','Pasto','Outro']],
 ['ventilacao','Ventilação Marca/modelo','t'],['cocador_vacas','Coçador (vacas)','s',0,YN],['cocador_vacas_marca','Marca coçador (vacas)','t'],['cocador_bezerras','Coçador (bezerras)','s',0,YN],['cocador_bezerras_marca','Marca coçador (bezerras)','t'],
 ['scrapper','Scrapper','s',0,YN],['scrapper_marca','Marca scrapper','t'],['robo_empurrar','Robô de empurrar trato','s',0,YN],['robo_empurrar_marca','Marca robô de empurrar trato','t'],...ym('automacao_alim','Automação da alimentação')]],
['Produtos',[...PROD.flatMap(([k,l])=>[['p_'+k+'_marca',l+' – marca','s',0,MPROD],['p_'+k+'_produto',l+' – produto','t'],['p_'+k+'_nos',l+' – compra de nós?','s',0,YN]]),['p_oleo_bomba','Óleo da bomba – marca/produto','c'],['p_oleo_bomba_nos','Óleo da bomba – compra de nós?','s',0,YN]]],
['Visitas e retornos',[
 ['vendedor','Vendedor da visita','s',0,VEND],['data','Data da visita','d'],['obs','Observações','a'],['oportunidades','Oportunidades','a'],['retorno','Retorno em','d']],'visitas']
];
const ALL=S.filter(s=>!s[2]).flatMap(s=>s[1]);
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const sum=(a,f)=>a.reduce((s,x)=>s+(+f(x)||0),0);
const grp=(a,f)=>a.reduce((m,x)=>{const k=f(x)||'(não informado)';(m[k]=m[k]||[]).push(x);return m},{});
const fmt=n=>n.toLocaleString('pt-BR');
const br=d=>d?d.split('-').reverse().join('/'):'';
const hoje=()=>new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
function semana(){const d=new Date(hoje()+'T12:00');d.setDate(d.getDate()-(d.getDay()+6)%7);const a=d.toISOString().slice(0,10);d.setDate(d.getDate()+5);return{v:'',de:a,ate:d.toISOString().slice(0,10)}}

let db=load(),cur=null,tab='cli',q='',gok=false,gt='dash',gf={v:'',c:'',i:'',p:''},gv=semana(),charts=[],jobs=[];
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{clientes:[]}}catch(e){return{clientes:[]}}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){alert('Não foi possível salvar neste navegador.')}}

function inp(f,v,list){
 const[k,l,t,r,o]=f,at=list?`data-k="${k}"`:`name="${k}"`,rq=r?' required':'';
 let h;
 if(t=='s')h=`<select ${at}${rq}><option value=""></option>${(v&&!o.some(x=>x.split('|')[0]==v)?[...o,v]:o).map(x=>{const[a,b]=x.split('|');return`<option value="${esc(a)}"${v==a?' selected':''}>${esc(b||a)}</option>`}).join('')}</select>`;
 else if(t=='a')h=`<textarea ${at} rows="2">${esc(v)}</textarea>`;
 else h=`<input ${at} type="${{n:'number',d:'date',p:'tel'}[t]||'text'}"${t=='n'?' step="any" inputmode="decimal"':''}${t=='c'?` list="dl_${k}" autocomplete="off"`+(k=='cidade'?' placeholder="Digite o nome da cidade"':''):''} value="${esc(v)}"${rq}>`;
 return`<label>${l}${r?' *':''}${h}</label>`;
}
const row=(F,v={})=>`<div class="row"><div class="g">${F.map(f=>inp(f,v[f[0]],1)).join('')}<button type="button" class="del" data-act="del">Remover</button></div></div>`;

function form(){
 const c=cur;
 const dl=ALL.filter(f=>f[2]=='c').map(([k])=>`<datalist id="dl_${k}">${[...new Set([...(SEED[k]||[]),...db.clientes.map(x=>x[k])].filter(Boolean))].map(v=>`<option value="${esc(v)}">`).join('')}</datalist>`).join('');
 return`<form id="f">${S.map(([n,F,l])=>`<section><h2>${n}</h2>`+(l
  ?`<div data-l="${l}">${(c[l]||[]).map(r=>row(F,r)).join('')}</div><button type="button" data-act="add" data-l="${l}">+ Adicionar</button>`
  :`<div class="g">${F.map(f=>inp(f,c[f[0]])).join('')}</div>`+(n=='Propriedade'?'<p><button type="button" data-act="gps">Usar minha localização atual</button> <span id="gpsst" class="m"></span></p>':''))+'</section>').join('')}
 <div class="act"><button class="pri">Salvar cliente</button><button type="button" data-act="back">Cancelar</button>${c.id?'<button type="button" class="del" data-act="delc">Excluir cliente</button>':''}</div>${dl}</form>`;
}
function sync(){
 const f=$('#f').elements;
 f.tipo_sala.closest('label').style.display=f.tipo_equipamento.value=='Canalizado'?'':'none';
 DEP.forEach(k=>{const m=f[k+'_marca'],no=f[k].value=='Não';m.closest('label').style.display=no?'none':'';if(no)m.value=''});
 PROD.forEach(([k])=>{const m=f['p_'+k+'_marca'].value,n=f['p_'+k+'_nos'];if(m&&m!='DeLaval'){n.value='Não';n.disabled=true}else n.disabled=false});
}

function cards(){
 const t=q.toLowerCase(),L=db.clientes.filter(c=>[c.nome,c.cidade,c.propriedade,c.vendedor].join(' ').toLowerCase().includes(t)).sort((a,b)=>a.nome.localeCompare(b.nome));
 return L.length?L.map(c=>`<div class="card" data-id="${c.id}"><span><b>${esc(c.nome)}</b> <span class="pill">${esc(c.prioridade)}</span></span><small>${esc(c.cidade)} · ${esc(c.ord_marca)} · ${esc(c.unidades_ordenha)} conjuntos · ${esc(c.animais_ordenha)} vacas${c.vendedor?' · '+esc(c.vendedor):''}</small></div>`).join(''):'<p class="m">Nenhum cliente encontrado. Toque em “Novo cliente” para começar.</p>';
}
const list=()=>`<div class="bar2"><input id="q" placeholder="Buscar por nome, cidade ou propriedade" value="${esc(q)}"><button class="pri" data-act="new">Novo cliente</button></div><div class="cards" id="cards">${cards()}</div>`;

const tbl=(h,rows)=>`<div class="sc"><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const bars=(a,f)=>{const m=Object.entries(grp(a,f)).map(([k,v])=>[k,v.length]).sort((x,y)=>y[1]-x[1]);if(!m.length)return'<p class="m">Sem dados.</p>';const mx=m[0][1];return m.map(([k,v])=>`<div class="br"><span>${esc(k)}</span><i style="--w:${v/mx*100}%"></i><b>${v}</b></div>`).join('')};
const box=(t,h)=>`<div class="box"><h2>${t}</h2>${h}</div>`;

function dash(){
 const C=db.clientes;if(!C.length)return'<p class="m">Cadastre clientes para ver os indicadores.</p>';
 const cap=c=>sum(c.resfriadores||[],r=>r.capacidade_l),today=new Date().toISOString().slice(0,10);
 const kpi=(l,v)=>`<div class="kpi"><b>${fmt(v)}</b><small>${l}</small></div>`;
 const marcas=[...new Set(C.map(c=>c.ord_marca).filter(Boolean))].sort();
 const dl=a=>Math.round(100*a.filter(c=>c.ord_marca=='DeLaval').length/a.length)+'%';

 const prod=PROD.map(([k,l])=>{const a=C.filter(c=>c['p_'+k+'_marca']);return box(l,`<p class="m">${a.filter(c=>c['p_'+k+'_nos']=='Sim').length} de ${a.length} compram de nós</p>`+bars(a,c=>c['p_'+k+'_marca']))}).join('');
 const ret=C.map(c=>{const v=(c.visitas||[]).filter(v=>v.data||v.retorno).sort((a,b)=>(a.data||'')<(b.data||'')?-1:1).pop();return v&&v.retorno&&[v.retorno,c.nome,c.cidade]}).filter(Boolean).sort();
 return`<div class="kpis">${kpi('clientes',C.length)}${kpi('vacas em ordenha',sum(C,c=>c.animais_ordenha))}${kpi('conjuntos de ordenha',sum(C,c=>c.unidades_ordenha))}${kpi('litros por dia',sum(C,c=>c.producao_dia))}${kpi('litros de resfriamento',sum(C,cap))}</div>`
 +box('Marcas de ordenha por cidade (nº de clientes)',tbl(['Cidade',...marcas,'Total','Conjuntos','% DeLaval'],Object.entries(grp(C,c=>c.cidade)).sort().map(([k,a])=>[esc(k),...marcas.map(m=>a.filter(c=>c.ord_marca==m).length||''),a.length,fmt(sum(a,c=>c.unidades_ordenha)),dl(a)])))
 +box('Por região (ou cidade, quando sem região)',tbl(['Região','Clientes','Vacas em ordenha','Litros/dia','Resfriamento (L)'],Object.entries(grp(C,c=>c.regiao||c.cidade)).sort().map(([k,a])=>[esc(k),a.length,fmt(sum(a,c=>c.animais_ordenha)),fmt(sum(a,c=>c.producao_dia)),fmt(sum(a,cap))])))
 +box('Por vendedor',tbl(['Vendedor','Clientes','Vacas em ordenha','Conjuntos','Prioridade A'],Object.entries(grp(C,c=>c.vendedor)).sort().map(([k,a])=>[esc(k),a.length,fmt(sum(a,c=>c.animais_ordenha)),fmt(sum(a,c=>c.unidades_ordenha)),a.filter(c=>c.prioridade=='A').length])))
 +`<div class="two">${box('Prioridade',bars(C,c=>c.prioridade))}${box('Perfil',bars(C,c=>c.perfil))}${box('Tipo de barracão',bars(C,c=>c.tipo_barracao))}${box('Tipo de equipamento',bars(C,c=>c.tipo_equipamento))}${box('Marcas de resfriador',bars(C.flatMap(c=>c.resfriadores||[]),r=>r.marca))}${box('Marca do conjunto de ordenha',bars(C,c=>c.conjunto_marca))}</div>`
 +`<div class="two">${prod}</div>`
 +box('Retornos agendados',ret.length?tbl(['Retorno','Cliente','Cidade'],ret.map(r=>[(r[0]<today?'⚠ atrasado · ':'')+br(r[0]),esc(r[1]),esc(r[2])])):'<p class="m">Nenhum retorno agendado.</p>');
}

const exp=()=>box('Exportar dados',`<p>Gera um arquivo Excel (.xlsx) com três abas ligadas por <b>id_cliente</b>: <b>clientes</b> (uma linha por cliente), <b>resfriadores</b> e <b>visitas</b>. Os cabeçalhos são os nomes dos campos do banco.</p><p><button class="pri" data-act="xlsx">Baixar Excel (.xlsx)</button></p><h2>Backup</h2><p class="m">Os dados ficam salvos neste navegador. Baixe um backup de vez em quando.</p><p><button data-act="json">Baixar backup (.json)</button></p><label>Restaurar backup<input type="file" id="imp" accept=".json"></label>`);

function xlsx(){
 if(typeof XLSX=='undefined')return alert('Biblioteca de Excel não carregou. Conecte-se à internet e recarregue a página.');
 const C=db.clientes,wb=XLSX.utils.book_new();
 const num=Object.fromEntries(ALL.map(f=>[f[0],f[2]=='n']));
 const hc=['id_cliente',...ALL.map(f=>f[0])];
 const cl=C.map(c=>Object.fromEntries([['id_cliente',c.id],...ALL.map(([k])=>[k,num[k]&&c[k]!==''&&c[k]!=null?+c[k]:(c[k]??'')])]));
 const sub=l=>{const F=S.find(s=>s[2]==l)[1].map(f=>f[0]);return[['id_cliente',...F],C.flatMap(c=>(c[l]||[]).map(r=>({id_cliente:c.id,...r})))]};
 XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(cl,{header:hc}),'clientes');
 for(const l of['resfriadores','visitas']){const[h,d]=sub(l);XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(d,{header:h}),l)}
 XLSX.writeFile(wb,'clinica_ordenha_'+new Date().toISOString().slice(0,10)+'.xlsx');
}

// ===== Área do gestor =====
const COL=['#0e6b52','#2f8fbf','#e0a030','#c9553d','#7a5cb5','#4cb58a','#8a97a0','#d97aa5','#5d7f2e','#3b4f9c','#b0803a','#2a9d9d'];
const PK=KEY+'_pin',hp=x=>btoa(encodeURIComponent(x));
const fsel=(id,l,o,v)=>`<label>${l}<select id="${id}"><option value="">Todos</option>${o.map(x=>`<option${x==v?' selected':''}>${esc(x)}</option>`).join('')}</select></label>`;
const pairs=(a,f)=>Object.entries(grp(a,f)).map(([k,v])=>[k,v.length]).sort((x,y)=>y[1]-x[1]);
const topN=(p,n=11)=>p.length>n?[...p.slice(0,n),['Outras',sum(p.slice(n),x=>x[1])]]:p;
let pn=0;
function pbox(t,p){
 if(!p.length||!sum(p,x=>x[1]))return box(t,'<p class="m">Sem dados.</p>');
 const id='pc'+(pn++);
 jobs.push(()=>charts.push(new Chart($('#'+id),{type:'pie',data:{labels:p.map(x=>x[0]),datasets:[{data:p.map(x=>x[1]),backgroundColor:p.map((_,i)=>COL[i%COL.length]),borderWidth:1}]},options:{maintainAspectRatio:false,plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:c=>{const T=c.dataset.data.reduce((a,b)=>a+b,0);return`${c.label}: ${fmt(c.parsed)} (${Math.round(100*c.parsed/T)}%)`}}}}}})));
 return box(t,`<div style="position:relative;height:270px"><canvas id="${id}"></canvas></div>`);
}
function gestor(){
 if(!gok)return box('Área do gestor',`<p class="m">${localStorage.getItem(PK)?'Digite o PIN do gestor.':'Primeiro acesso: crie um PIN para esta área.'}</p><div class="bar2"><input id="pin" type="password" inputmode="numeric" autocomplete="off" placeholder="PIN"><button class="pri" data-act="pin">Entrar</button></div>`);
 const cid=[...new Set(db.clientes.map(c=>c.cidade).filter(Boolean))].sort();
 const F=gt=='dash'?fsel('gfv','Vendedor',VEND,gf.v)+fsel('gfc','Cidade',cid,gf.c)+fsel('gfi','InService',YN,gf.i)+fsel('gfp','Prioridade',['A','B','C','D'],gf.p)
  :fsel('gvv','Vendedor',VEND,gv.v)+`<label>De<input type="date" id="gde" value="${gv.de}"></label><label>Até<input type="date" id="gate" value="${gv.ate}"></label>`;
 return`<div class="bar2">${[['dash','Dashboard'],['vis','Visitas dos vendedores']].map(([k,l])=>`<button class="${gt==k?'pri':''}" data-gt="${k}">${l}</button>`).join('')}</div><div class="box"><div class="g" id="gf">${F}</div></div><div id="gbody"></div>`;
}
function gdraw(){
 charts.forEach(c=>c.destroy());charts=[];jobs=[];pn=0;
 if(typeof Chart=='undefined'){$('#gbody').innerHTML='<p class="m">Os gráficos não carregaram. Conecte-se à internet e recarregue a página.</p>';return}
 Chart.defaults.color=getComputedStyle(document.body).color;
 $('#gbody').innerHTML=gt=='dash'?gdash():gvis();
 jobs.forEach(j=>j());
}
function gdash(){
 const C=db.clientes.filter(c=>(!gf.v||c.vendedor==gf.v)&&(!gf.c||c.cidade==gf.c)&&(!gf.i||c.inservice==gf.i)&&(!gf.p||c.prioridade==gf.p));
 if(!C.length)return'<p class="m">Nenhum cliente com esses filtros.</p>';
 const cap=c=>sum(c.resfriadores||[],r=>r.capacidade_l),kpi=(l,v)=>`<div class="kpi"><b>${fmt(v)}</b><small>${l}</small></div>`;
 const by=(f,v)=>topN(Object.entries(grp(C,f)).map(([k,a])=>[k,sum(a,v)]).sort((x,y)=>y[1]-x[1])),reg=c=>c.regiao||c.cidade;
 const prod=PROD.map(([k,l])=>{const a=C.filter(c=>c['p_'+k+'_marca']);return pbox(`${l} (${a.filter(c=>c['p_'+k+'_nos']=='Sim').length} de ${a.length} compram de nós)`,pairs(a,c=>c['p_'+k+'_marca']))}).join('');
 const ret=C.map(c=>{const x=(c.visitas||[]).filter(x=>x.data||x.retorno).sort((a,b)=>(a.data||'')<(b.data||'')?-1:1).pop();return x&&x.retorno&&[x.retorno,c.nome,c.cidade,c.vendedor]}).filter(Boolean).sort();
 return`<div class="kpis">${kpi('clientes',C.length)}${kpi('vacas em ordenha',sum(C,c=>c.animais_ordenha))}${kpi('conjuntos de ordenha',sum(C,c=>c.unidades_ordenha))}${kpi('litros por dia',sum(C,c=>c.producao_dia))}${kpi('litros de resfriamento',sum(C,cap))}</div>`
 +`<div class="two">${pbox('Marcas de ordenha',pairs(C,c=>c.ord_marca))}${pbox('Vacas em ordenha por região',by(reg,c=>c.animais_ordenha))}${pbox('Litros por dia por região',by(reg,c=>c.producao_dia))}${pbox('Resfriamento instalado (L) por região',by(reg,cap))}${pbox('Clientes por vendedor',pairs(C,c=>c.vendedor))}${pbox('Prioridade',pairs(C,c=>c.prioridade))}${pbox('InService',pairs(C,c=>c.inservice))}${pbox('Perfil',pairs(C,c=>c.perfil))}${pbox('Tipo de barracão',pairs(C,c=>c.tipo_barracao))}${pbox('Tipo de equipamento',pairs(C,c=>c.tipo_equipamento))}${pbox('Marcas de resfriador',pairs(C.flatMap(c=>c.resfriadores||[]),r=>r.marca))}${pbox('Marca do conjunto de ordenha',pairs(C,c=>c.conjunto_marca))}${prod}</div>`
 +box('Retornos agendados',ret.length?tbl(['Retorno','Cliente','Cidade','Vendedor'],ret.map(r=>[(r[0]<hoje()?'⚠ atrasado · ':'')+br(r[0]),esc(r[1]),esc(r[2]),esc(r[3])])):'<p class="m">Nenhum retorno agendado.</p>');
}
function gvis(){
 const{v,de,ate}=gv;
 if(!de||!ate||de>ate)return'<p class="m">Informe um período válido (data inicial até data final).</p>';
 const days=[];for(const d=new Date(de+'T12:00'),e=new Date(ate+'T12:00');d<=e&&days.length<93;d.setDate(d.getDate()+1))days.push(d.toISOString().slice(0,10));
 const by=Object.fromEntries(days.map(d=>[d,[]])),WD=['dom','seg','ter','qua','qui','sex','sáb'];
 db.clientes.forEach(c=>(c.visitas||[]).forEach(x=>{const w=x.vendedor||c.vendedor||'';if(by[x.data]&&(!v||w==v))by[x.data].push(`${c.nome} (${c.cidade})`+(v||!w?'':' · '+w))}));
 jobs.push(()=>charts.push(new Chart($('#vc'),{type:'bar',data:{labels:days.map(d=>WD[new Date(d+'T12:00').getDay()]+' '+br(d).slice(0,5)),datasets:[{label:'Visitas',data:days.map(d=>by[d].length),backgroundColor:COL[0],borderRadius:4}]},options:{maintainAspectRatio:false,interaction:{mode:'index',intersect:false},scales:{y:{beginAtZero:true,ticks:{precision:0},title:{display:true,text:'Visitas'}},x:{title:{display:true,text:'Data'}}},plugins:{legend:{display:false},tooltip:{callbacks:{title:i=>br(days[i[0].dataIndex]),label:c=>c.parsed.y+(c.parsed.y==1?' visita':' visitas'),afterBody:i=>by[days[i[0].dataIndex]]}}}}})));
 return box(`Visitas${v?' – '+esc(v):''}: ${sum(days,d=>by[d].length)} no período`,`<div style="position:relative;height:340px"><canvas id="vc"></canvas></div><p class="m">Passe o mouse (ou toque) em uma barra para ver os clientes visitados no dia. Visita sem vendedor informado conta para o vendedor responsável pelo cliente.</p>`);
}

function render(){
 $('#nav').innerHTML=[['cli','Currículo do Cliente'],['dash','Dashboard'],['exp','Exportar'],['ges','Gestor']].map(([k,l])=>`<button class="${tab==k?'on':''}" data-tab="${k}">${l}</button>`).join('');
 $('#app').innerHTML=tab=='cli'?(cur?form():list()):tab=='dash'?dash():tab=='ges'?gestor():exp();
 if(cur&&tab=='cli')sync();
 if(tab=='ges'&&gok)gdraw();
 scrollTo(0,0);
}

document.addEventListener('click',e=>{
 const t=e.target.closest('[data-tab],[data-act],[data-id],[data-gt]');if(!t)return;
 const d=t.dataset;
 if(d.tab){if(d.tab!='ges')gok=false;tab=d.tab;cur=null;render()}
 else if(d.gt){gt=d.gt;render()}
 else if(d.id){cur=db.clientes.find(c=>c.id==d.id);render()}
 else if(d.act=='new'){cur={};render()}
 else if(d.act=='back'){cur=null;render()}
 else if(d.act=='add'){const c=$(`[data-l="${d.l}"]`);c.insertAdjacentHTML('beforeend',row(S.find(s=>s[2]==d.l)[1]));if(d.l=='visitas'){const r=c.lastElementChild;r.querySelector('[data-k="vendedor"]').value=$('#f').elements.vendedor.value;r.querySelector('[data-k="data"]').value=hoje()}}
 else if(d.act=='del')t.closest('.row').remove();
 else if(d.act=='delc'){if(confirm('Excluir este cliente? Essa ação não pode ser desfeita.')){db.clientes=db.clientes.filter(c=>c.id!=cur.id);save();cur=null;render()}}
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
 else if(d.act=='pin'){const v=$('#pin').value,h=localStorage.getItem(PK);if(!v)return;if(!h){localStorage.setItem(PK,hp(v));gok=true;render()}else if(h==hp(v)){gok=true;render()}else alert('PIN incorreto.')}
 else if(d.act=='xlsx')xlsx();
 else if(d.act=='json'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(db)],{type:'application/json'}));a.download='backup_clinica_ordenha.json';a.click()}
});
document.addEventListener('input',e=>{if(e.target.id=='q'){q=e.target.value;$('#cards').innerHTML=cards()}if(e.target.name=='cidade')e.target.setCustomValidity('')});
document.addEventListener('change',e=>{
 if(e.target.closest('#f'))sync();
 if(e.target.closest('#gf')){const x=e.target.value;({gfv:()=>gf.v=x,gfc:()=>gf.c=x,gfi:()=>gf.i=x,gfp:()=>gf.p=x,gvv:()=>gv.v=x,gde:()=>gv.de=x,gate:()=>gv.ate=x})[e.target.id]();gdraw()}
 if(e.target.id=='imp'){const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);if(!Array.isArray(o.clientes))throw 0;if(confirm('Substituir os dados atuais pelo backup?')){db=o;save();alert('Backup restaurado.')}}catch(x){alert('Arquivo de backup inválido.')}};r.readAsText(e.target.files[0])}
});
document.addEventListener('submit',e=>{
 e.preventDefault();
 const f=e.target,o={id:cur.id||uid()};
 ALL.forEach(([k])=>o[k]=f.elements[k].value.trim());
 const nz=x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim(),ct=CIDADES.find(x=>nz(x)==nz(o.cidade));
 if(ct)o.cidade=ct;else if(o.cidade!=cur.cidade){const c=f.elements.cidade;c.setCustomValidity('Escolha uma cidade da lista do Paraná');c.reportValidity();return}
 DEP.forEach(k=>{if(o[k]=='Não')o[k+'_marca']=''});
 PROD.forEach(([k])=>{const m=o['p_'+k+'_marca'];if(m&&m!='DeLaval')o['p_'+k+'_nos']='Não'});
 S.filter(s=>s[2]).forEach(([,F,l])=>o[l]=[...f.querySelectorAll(`[data-l="${l}"] .row`)].map(r=>Object.fromEntries([...r.querySelectorAll('[data-k]')].map(x=>[x.dataset.k,x.value.trim()]))).filter(r=>Object.values(r).some(Boolean)));
 if(o.tipo_equipamento!='Canalizado')o.tipo_sala='';
 const m=(o.gps_link||'').match(/(-?\d+\.\d+)[,\s]+(-?\d+\.\d+)/);
 if(m&&!o.gps_lat){o.gps_lat=m[1];o.gps_lng=m[2]}
 if(o.gps_lat&&o.gps_lng&&!o.gps_link)o.gps_link=`https://www.google.com/maps?q=${o.gps_lat},${o.gps_lng}`;
 const dv=o.visitas.map(v=>v.data).filter(Boolean).sort().pop();
 if(dv&&(!o.ultima_visita||dv>o.ultima_visita))o.ultima_visita=dv;
 o.atualizado_em=new Date().toISOString();
 const i=db.clientes.findIndex(c=>c.id==o.id);i<0?db.clientes.push(o):db.clientes[i]=o;
 save();cur=null;render();
});
render();