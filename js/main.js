'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const burger=document.getElementById('burger'), menu=document.getElementById('mNav');
function setMenu(open){burger.classList.toggle('on',open);menu.classList.toggle('on',open);burger.setAttribute('aria-expanded',String(open));menu.inert=!open;}
burger.addEventListener('click',()=>setMenu(burger.getAttribute('aria-expanded')!=='true'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&burger.getAttribute('aria-expanded')==='true'){setMenu(false);burger.focus();}});
document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!burger.contains(e.target))setMenu(false);});
matchMedia('(min-width:1001px)').addEventListener('change',e=>{if(e.matches)setMenu(false);});
const translations=[...document.querySelectorAll('[data-i18n]')].map(el=>({el,es:el.innerHTML,en:el.dataset.en}));
let currentLang='es';
function refreshLabels(){
 burger.setAttribute('aria-label',currentLang==='en'?'Menu':'Menú');
 document.querySelectorAll('.serv-card').forEach(card=>{const btn=card.querySelector('.serv-toggle');btn.setAttribute('aria-label',(currentLang==='en'?'Details: ':'Detalles: ')+card.querySelector('.serv-name').textContent);});
 document.querySelectorAll('.lang-btn').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===currentLang)));
}
function setLang(lang){if(!['es','en'].includes(lang))return;currentLang=lang;translations.forEach(t=>{t.el.innerHTML=t[lang]??t.es;});document.documentElement.lang=lang;document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));refreshLabels();document.dispatchEvent(new CustomEvent('once14:language',{detail:lang}));try{localStorage.setItem('once14-language',lang);}catch{}}
document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
function openService(card,open=true){
 document.querySelectorAll('.serv-card').forEach(c=>{const active=c===card&&open;c.classList.toggle('open',active);c.querySelector('.serv-toggle').setAttribute('aria-expanded',String(active));c.querySelector('.serv-detail').hidden=!active;});
}
document.querySelectorAll('.serv-card').forEach(card=>{
 card.id=card.dataset.id;
 const btn=card.querySelector('.serv-toggle'),panel=card.querySelector('.serv-detail');
 panel.id=card.id+'-details';panel.hidden=true;btn.setAttribute('aria-controls',panel.id);btn.setAttribute('aria-expanded','false');
 btn.addEventListener('click',()=>openService(card,!card.classList.contains('open')));
});
document.querySelectorAll('.faq-card').forEach((card,i)=>{
 const btn=card.querySelector('.faq-q2'),panel=card.querySelector('.faq-a2');
 panel.id='faq-answer-'+i;panel.hidden=true;btn.setAttribute('aria-controls',panel.id);btn.setAttribute('aria-expanded','false');
 btn.addEventListener('click',()=>{const open=!card.classList.contains('on');document.querySelectorAll('.faq-card').forEach(c=>{const active=c===card&&open;c.classList.toggle('on',active);c.querySelector('.faq-q2').setAttribute('aria-expanded',String(active));c.querySelector('.faq-a2').hidden=!active;});});
});
const routeIds=['s1','s7','s4','s6'];
document.querySelectorAll('.need-card').forEach((card,i)=>{
 const link=document.createElement('a');link.className='need-route';link.href='#'+routeIds[i];link.setAttribute('data-i18n','');link.dataset.en='Explore this service →';link.textContent='Explorar este servicio →';card.append(link);
 translations.push({el:link,es:link.innerHTML,en:link.dataset.en});
});
function routeService(){
 const target=document.getElementById(location.hash.slice(1));
 if(target?.classList.contains('serv-card')){openService(target);target.classList.add('visible');requestAnimationFrame(()=>target.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'}));}
 if(target?.classList.contains('serv-card'))document.dispatchEvent(new CustomEvent('once14:service-route',{detail:target.id}));
}
window.addEventListener('hashchange',routeService);
const nav=document.getElementById('nav'),progress=document.getElementById('progressBar');
let scheduled=false;
function updateScroll(){scheduled=false;const h=document.documentElement;progress.style.width=(h.scrollHeight>h.clientHeight?h.scrollTop/(h.scrollHeight-h.clientHeight)*100:0)+'%';nav.classList.toggle('scrolled',scrollY>20);}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});updateScroll();
const reveal=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver' in window&&!reduced){
 document.documentElement.classList.add('js-ready');
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.05});
 reveal.forEach(el=>observer.observe(el));
 const sections=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.nav-menu a').forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}),{rootMargin:'-20% 0px -60% 0px'});
 document.querySelectorAll('section[id]').forEach(el=>sections.observe(el));
}else reveal.forEach(el=>el.classList.add('visible'));
document.querySelectorAll('.cnt').forEach(el=>el.textContent=el.dataset.count);
try{setLang(localStorage.getItem('once14-language')||'es');}catch{setLang('es');}
routeService();
