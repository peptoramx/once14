'use strict';
(() => {
 const cards=[...document.querySelectorAll('.serv-card')],search=document.getElementById('service-search');
 const filters=[...document.querySelectorAll('[data-filter]')],reset=document.querySelector('.service-reset'),results=document.querySelector('.service-results');
 const groups={capital:['s4','s5','s6'],control:['s1','s3','s7'],growth:['s2','s3','s4','s5','s7'],team:['s8']};
 const clean=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const terms=new Map(cards.map(card=>[card.id,clean(card.textContent+' '+[...card.querySelectorAll('[data-en]')].map(el=>el.dataset.en).join(' '))]));
 let filter='all';
 function applyFilters(){
  const words=clean(search.value.trim()).split(/\s+/).filter(Boolean);
  let count=0;
  cards.forEach(card=>{const match=(filter==='all'||groups[filter].includes(card.id))&&words.every(w=>terms.get(card.id).includes(w));card.hidden=!match;if(match){count++;card.classList.add('visible');}else if(card.classList.contains('open'))openService(card,false);});
  filters.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.filter===filter)));
  const en=document.documentElement.lang==='en';
  results.textContent=count ? (en?count+' services available':count+' servicios disponibles') : (en?'No matches. Try another term or clear the filters.':'Sin coincidencias. Pruebe otro término o limpie los filtros.');
  reset.hidden=filter==='all'&&!search.value;
 }
 filters.forEach(btn=>btn.addEventListener('click',()=>{filter=btn.dataset.filter;applyFilters();}));
 search.addEventListener('input',applyFilters);
 reset.addEventListener('click',()=>{filter='all';search.value='';applyFilters();search.focus();});
 document.addEventListener('once14:service-route',()=>{filter='all';search.value='';applyFilters();});
 document.addEventListener('click',e=>{const anchor=e.target.closest('a[href^="#s"]');if(anchor&&document.getElementById(anchor.hash.slice(1))?.classList.contains('serv-card')){filter='all';search.value='';applyFilters();if(location.hash===anchor.hash)routeService();}});
 const process=document.querySelector('.stepper');
 const stages=[...process.querySelectorAll('.step-item')];
 const stageDetails=[
  ['Revisamos información financiera y operativa para entender de dónde viene el resultado y dónde se concentra el riesgo.','We review financial and operational information to understand results and identify where risk concentrates.'],
  ['Comparamos escenarios, definimos prioridades y conectamos las metas con los recursos y el flujo de efectivo.','We compare scenarios, define priorities and connect goals with resources and cash flow.'],
  ['Convertimos el plan en presupuestos, modelos financieros e indicadores que se puedan utilizar en la operación.','We turn the plan into budgets, financial models and indicators that can be used in daily operations.'],
  ['Contrastamos lo planeado con lo ocurrido y revisamos las desviaciones para ajustar las decisiones a tiempo.','We compare plans with actual results and review deviations to adjust decisions in time.'],
  ['Incorporamos lo aprendido al siguiente ciclo de planeación para afinar herramientas y prioridades.','We incorporate lessons into the next planning cycle to refine tools and priorities.']
 ];
 const stagePanel=document.createElement('div');stagePanel.className='process-detail';stagePanel.id='process-detail';
 const stageButtons=[];
 stages.forEach((stage,i)=>{
  const button=document.createElement('button');button.type='button';button.className='process-stage';button.setAttribute('aria-controls',stagePanel.id);button.setAttribute('aria-pressed','false');
  button.append(stage.querySelector('.step-circle'),stage.querySelector('h4'));stage.prepend(button);stageButtons.push(button);
  const panel=document.createElement('div');panel.id='process-stage-'+i;panel.hidden=true;panel.append(stage.querySelector('p'));
  const detail=document.createElement('p');detail.dataset.i18n='';detail.dataset.en=stageDetails[i][1];detail.textContent=stageDetails[i][0];translations.push({el:detail,es:stageDetails[i][0],en:stageDetails[i][1]});panel.append(detail);stagePanel.append(panel);
  button.addEventListener('click',()=>{stageButtons.forEach((b,j)=>{b.setAttribute('aria-pressed',String(i===j));stagePanel.children[j].hidden=i!==j;});});
 });
 process.after(stagePanel);stageButtons[0].click();
 stagePanel.querySelectorAll('[data-i18n]').forEach(el=>{if(document.documentElement.lang==='en')el.innerHTML=el.dataset.en;});
 const loaded=[];
 const gallery=document.querySelector('.gallery-track');
 const galleryButtons=[...document.querySelectorAll('[data-gallery-direction]')];
 function galleryState(){galleryButtons.forEach(btn=>{const direction=Number(btn.dataset.galleryDirection);btn.disabled=direction<0?gallery.scrollLeft<2:gallery.scrollLeft>=gallery.scrollWidth-gallery.clientWidth-2;});}
 galleryButtons.forEach(btn=>btn.addEventListener('click',()=>gallery.scrollBy({left:Number(btn.dataset.galleryDirection)*(gallery.querySelector('.gallery-tile').getBoundingClientRect().width+16),behavior:reduced?'instant':'smooth'})));
 gallery.addEventListener('scroll',galleryState,{passive:true});window.addEventListener('resize',galleryState);galleryState();
 document.querySelectorAll('[data-media]').forEach(frame=>{
  const item=window.ONCE14_MEDIA?.[frame.dataset.media];if(!item?.ready)return;
  const image=new Image();image.width=1200;image.height=900;image.decoding='async';image.loading=frame.dataset.media==='consulting'?'eager':'lazy';
  image.style.objectPosition=item.position;image.alt=document.documentElement.lang==='en'?item.en:item.es;
  image.sizes=frame.dataset.media==='consulting'?'100vw':'(max-width: 700px) 90vw, 50vw';image.srcset='assets/editorial/'+item.file+'-640.webp 640w, assets/editorial/'+item.file+'-1200.webp 1200w'+(frame.dataset.media==='consulting'?', assets/editorial/consulting-1600.webp 1600w':'');
  if(frame.dataset.media==='consulting')image.fetchPriority='high';
  image.addEventListener('load',()=>{frame.hidden=false;frame.classList.add('media-loaded');frame.querySelector('.media-caption').hidden=false;if(frame.closest('.gallery-track')&&[...gallery.querySelectorAll('[data-media]')].every(el=>el.classList.contains('media-loaded')))document.querySelector('.gallery-pending').hidden=true;});
  image.addEventListener('error',()=>{image.remove();frame.classList.remove('media-loaded');frame.querySelector('.media-caption').hidden=true;if(frame.classList.contains('activity-media'))frame.hidden=true;});
  image.src='assets/editorial/'+item.file+'-1200.webp';frame.prepend(image);loaded.push({image,item});
 });
 document.addEventListener('once14:language',()=>{applyFilters();loaded.forEach(({image,item})=>image.alt=document.documentElement.lang==='en'?item.en:item.es);});
 applyFilters();
})();
