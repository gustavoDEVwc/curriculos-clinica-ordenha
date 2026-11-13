// Configuração do Firebase e do gestor
const FIREBASE_CONFIG={
  apiKey:"AIzaSyBTbBKRk6PzRVauQEN9pSx6I94izMR7B0s",
  authDomain:"clientes-clinica-7addb.firebaseapp.com",
  projectId:"clientes-clinica-7addb",
  storageBucket:"clientes-clinica-7addb.firebasestorage.app",
  messagingSenderId:"200514396157",
  appId:"1:200514396157:web:ddfd8ea608d4a05b170394"
};
const GESTOR_UID='GDgIeOmpo3RRFjNdDhnXg6YdGXx1'; // somente este usuário vê tudo e abre a aba Gestor

// Listas e campos do cadastro
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
