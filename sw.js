// Service worker: guarda o app no aparelho para abrir sem internet.
// Ao adicionar um arquivo novo ao app, inclua-o em APP e troque a VERSAO.
const VERSAO='clinica-v2';
const APP=['./','index.html','estilo.css','config.js','dados.js','orcamentos.js','gestor.js','visitas.js','notificacoes.js','tema.js','app.js','manifest.json','icone-192.png','icone-512.png','icone-180.png'];
const CDN=[
 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.js',
 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js',
 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js'];

self.addEventListener('install',e=>{
 e.waitUntil(caches.open(VERSAO).then(c=>Promise.allSettled([...APP,...CDN].map(u=>c.add(u)))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
 e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=VERSAO).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
});

// Rede com limite de 3 s (sinal fraco no campo): se não responder, usa a cópia guardada
const rede=r=>new Promise((ok,no)=>{const t=setTimeout(no,3000);fetch(r).then(x=>{clearTimeout(t);ok(x)},e=>{clearTimeout(t);no(e)})});
const guarda=(r,x)=>{if(x.ok)caches.open(VERSAO).then(c=>c.put(r,x.clone()))};

self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!='GET')return;
 const mesmo=new URL(r.url).origin==location.origin;
 if(!mesmo&&!CDN.includes(r.url))return; // dados do Firebase etc.: o navegador resolve sozinho
 if(!mesmo){ // bibliotecas com versão fixa: cópia guardada primeiro
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{guarda(r,x);return x})));return;
 }
 e.respondWith(rede(r).then(x=>{guarda(r,x);return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||(r.mode=='navigate'?caches.match('index.html'):Response.error()))));
});
