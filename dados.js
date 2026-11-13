// Camada de dados: Firebase (login + Firestore).
// Para testes sem internet/login, abra a página com ?local=1 no endereço (dados ficam só neste navegador).
const LOCAL=new URLSearchParams(location.search).has('local');
const DB={clientes:[],orcamentos:[]};
const Auth={pronto:false,erro:false,user:null,gestor:false};
let fbdb=null,unsubs=[];

const Dados={
 // aoMudar('auth') = login/logout; aoMudar('clientes'|'orcamentos') = dados novos
 init(aoMudar){
  if(LOCAL){
   try{Object.assign(DB,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
   DB.clientes=DB.clientes||[];DB.orcamentos=DB.orcamentos||[];
   Auth.pronto=true;Auth.user={uid:'local'};Auth.gestor=true;aoMudar('auth');return;
  }
  if(typeof firebase=='undefined'){Auth.pronto=true;Auth.erro=true;aoMudar('auth');return}
  firebase.initializeApp(FIREBASE_CONFIG);
  fbdb=firebase.firestore();
  fbdb.enablePersistence({synchronizeTabs:true}).catch(()=>{}); // funciona sem sinal e sincroniza depois
  firebase.auth().onAuthStateChanged(u=>{
   unsubs.forEach(f=>f());unsubs=[];DB.clientes=[];DB.orcamentos=[];
   Auth.pronto=true;Auth.user=u;Auth.gestor=!!u&&u.uid==GESTOR_UID;
   if(u)['clientes','orcamentos'].forEach(col=>{
    let q=fbdb.collection(col);
    if(!Auth.gestor)q=q.where('owner','==',u.uid); // vendedor enxerga só o que é dele; gestor enxerga tudo
    unsubs.push(q.onSnapshot(s=>{DB[col]=s.docs.map(d=>({...d.data(),id:d.id}));aoMudar(col)},e=>console.error(col,e)));
   });
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
 }
};
