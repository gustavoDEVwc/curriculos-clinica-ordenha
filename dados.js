// Camada de dados: Firebase (login + Firestore).
// Para testes sem internet/login, abra a página com ?local=1 no endereço (dados ficam só neste navegador).
const LOCAL=new URLSearchParams(location.search).has('local');
const COLECOES=['clientes','visitas','orcamentos'];
const DB={clientes:[],visitas:[],orcamentos:[],usuarios:[]}; // usuarios: só o gestor carrega (e-mail → uid, para transferir clientes)
const Auth={pronto:false,erro:false,user:null,gestor:false,vendedor:'',lista:[]};
const Rede={pend:{clientes:false,visitas:false,orcamentos:false}}; // alterações salvas no aparelho e ainda não enviadas
let fbdb=null,unsubs=[],migrou=false;

// Quem é o vendedor deste login: o gestor é o GESTOR_NOME; os demais vêm do vínculo e-mail → nome (aba Gestor > Vendedores)
const calcVend=()=>{
 const em=Auth.user?(Auth.user.email||'').toLowerCase():'';
 Auth.vendedor=!Auth.user?'':Auth.gestor?GESTOR_NOME:((Auth.lista||[]).find(x=>(x.email||'').toLowerCase()==em)||{}).nome||'';
};

const Dados={
 // aoMudar('auth') = login/logout; aoMudar('clientes'|'visitas'|'orcamentos'|'config', soMeta) = dados novos
 init(aoMudar){
  if(LOCAL){
   try{Object.assign(DB,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
   COLECOES.forEach(k=>DB[k]=DB[k]||[]);
   try{Auth.lista=JSON.parse(localStorage.getItem(KEY+'_vend')||'[]')}catch(e){}
   Auth.pronto=true;Auth.user={uid:'local',email:'local'};Auth.gestor=true;calcVend();this.migrar();aoMudar('auth');return;
  }
  if(typeof firebase=='undefined'){Auth.pronto=true;Auth.erro=true;aoMudar('auth');return}
  firebase.initializeApp(FIREBASE_CONFIG);
  fbdb=firebase.firestore();
  fbdb.enablePersistence({synchronizeTabs:true}).catch(e=>console.warn('Cópia offline indisponível:',e.code)); // funciona sem sinal e sincroniza depois
  firebase.auth().onAuthStateChanged(u=>{
   unsubs.forEach(f=>f());unsubs=[];COLECOES.forEach(k=>{DB[k]=[];Rede.pend[k]=false});DB.usuarios=[];migrou=false;Auth.lista=[];
   Auth.pronto=true;Auth.user=u;Auth.gestor=!!u&&u.uid==GESTOR_UID;calcVend();
   if(u){
    const visto={};
    COLECOES.forEach(col=>{
     let q=fbdb.collection(col);
     // clientes: todos os logados veem; visitas e orçamentos: cada vendedor vê só os seus (o gestor vê tudo)
     if(col!='clientes'&&!Auth.gestor)q=q.where('owner','==',u.uid);
     unsubs.push(q.onSnapshot({includeMetadataChanges:true},s=>{
      const soMeta=!!visto[col]&&s.docChanges().length==0;visto[col]=true; // só mudou o estado de envio, não os dados
      DB[col]=s.docs.map(d=>({...d.data(),id:d.id}));Rede.pend[col]=s.metadata.hasPendingWrites;
      if(col=='clientes'&&!migrou){migrou=true;this.migrar()}
      aoMudar(col,soMeta);
     },e=>console.error(col,e)));
    });
    // cada login registra o próprio e-mail; o gestor lê a lista para saber o uid de cada vendedor
    fbdb.collection('usuarios').doc(u.uid).set({email:(u.email||'').toLowerCase()}).catch(()=>{});
    if(Auth.gestor)unsubs.push(fbdb.collection('usuarios').onSnapshot(s=>{DB.usuarios=s.docs.map(x=>({...x.data(),id:x.id}));aoMudar('usuarios',true)},e=>console.error('usuarios',e)));
    unsubs.push(fbdb.collection('config').doc('vendedores').onSnapshot(s=>{Auth.lista=(s.data()||{}).lista||[];calcVend();aoMudar('config')},e=>console.error('config',e)));
   }
   aoMudar('auth');
  });
 },
 entrar:(email,senha)=>firebase.auth().signInWithEmailAndPassword(email,senha),
 sair(){if(!LOCAL)firebase.auth().signOut()},
 salvar(col,o){
  const L=DB[col],i=L.findIndex(x=>x.id==o.id);i<0?L.push(o):L[i]=o;
  if(LOCAL)return localStorage.setItem(KEY,JSON.stringify(DB));
  const{id,...d}=o;
  fbdb.collection(col).doc(id).set(d).catch(e=>alert('Não foi possível salvar: '+e.message));
 },
 excluir(col,id){
  DB[col]=DB[col].filter(x=>x.id!=id);
  if(LOCAL)return localStorage.setItem(KEY,JSON.stringify(DB));
  fbdb.collection(col).doc(id).delete().catch(e=>alert('Não foi possível excluir: '+e.message));
 },
 salvarConfig(lista){ // vínculo e-mail → vendedor (só o gestor grava)
  Auth.lista=lista;calcVend();
  if(LOCAL)return localStorage.setItem(KEY+'_vend',JSON.stringify(lista));
  fbdb.collection('config').doc('vendedores').set({lista}).catch(e=>alert('Não foi possível salvar: '+e.message));
 },
 // Versões antigas guardavam as visitas dentro do cliente: passa cada uma para a coleção "visitas" (ids fixos, não duplica)
 migrar(){
  DB.clientes.forEach(c=>{
   if(!Array.isArray(c.visitas)||!Auth.user)return;
   if(!Auth.gestor&&c.owner!=Auth.user.uid)return;
   c.visitas.forEach((x,i)=>this.salvar('visitas',{id:c.id+'_'+i,owner:c.owner||Auth.user.uid,vendedor:x.vendedor||c.vendedor||'',cliente_id:c.id,produtor_nome:c.nome,cidade:c.cidade,data:x.data||'',obs:x.obs||'',oportunidades:x.oportunidades||'',retorno:x.retorno||'',atualizado_em:new Date().toISOString()}));
   const{visitas,ultima_visita,...sem}=c;this.salvar('clientes',sem);
  });
 }
};

// Regras de acesso usadas pelas telas (a segurança de verdade está no firestore.rules)
const meusClientes=()=>Auth.gestor?DB.clientes:DB.clientes.filter(c=>c.owner==Auth.user.uid);
const podeEditar=c=>!c.id||Auth.gestor||c.owner==Auth.user.uid;
const ultVisita=c=>DB.visitas.filter(v=>v.cliente_id==c.id).map(v=>v.data).filter(Boolean).sort().pop()||'';
const exigeVinculo=()=>{
 if(Auth.vendedor)return true;
 alert('Seu e-mail ainda não está vinculado a um vendedor. Peça ao gestor para vincular em Gestor > Vendedores.');
 return false;
};
// uid do login de um vendedor (para transferir clientes): vem do vínculo de e-mail e do registro feito no primeiro login dele
const uidVendedor=nome=>{
 if(nome==GESTOR_NOME)return LOCAL?'local':GESTOR_UID;
 if(LOCAL)return 'local-'+nome;
 const e=((Auth.lista||[]).find(x=>x.nome==nome)||{}).email,u=e&&DB.usuarios.find(x=>x.email==e.toLowerCase());
 return u?u.id:'';
};
