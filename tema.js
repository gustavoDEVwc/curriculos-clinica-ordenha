// Tema claro/escuro: segue o aparelho até você escolher; a escolha fica salva neste aparelho
const TK=KEY+'_tema';
const temaAtual=()=>{let s=null;try{s=localStorage.getItem(TK)}catch(e){}return s||(matchMedia('(prefers-color-scheme: dark)').matches?'escuro':'claro')};
const btnTema=()=>{const e=temaAtual()=='escuro';return`<button class="tbtn" data-act="tema" aria-label="${e?'Mudar para tema claro':'Mudar para tema escuro'}" title="${e?'Tema claro':'Tema escuro'}"><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${e?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>':'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'}</svg></button>`};
const refTema=()=>{const b=$('.tbtn');if(b)b.outerHTML=btnTema()};
function alternarTema(){
 const novo=temaAtual()=='escuro'?'claro':'escuro';
 document.documentElement.dataset.tema=novo;
 try{localStorage.setItem(TK,novo)}catch(e){}
 refTema();
 if(tab=='ges'&&Auth.gestor)gdraw(); // gráficos pegam as cores do tema ao desenhar
}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{let s=null;try{s=localStorage.getItem(TK)}catch(e){}if(!s)refTema()});
