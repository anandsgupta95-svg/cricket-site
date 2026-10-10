
(function(){
var q=document.getElementById('q'),box=document.getElementById('results');if(!q)return;
var root=document.documentElement.getAttribute('data-root')||'';
var idx=null,sel=-1;
function norm(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function load(cb){if(idx){cb();return}var s=document.createElement('script');s.src=root+'search-index.js';s.onload=function(){idx=window.SEARCH_INDEX.map(function(e){return {t:e[0],id:e[1],n:e[2],s:e[3]||'',m:e[4]||0,k:norm(e[2]+' '+(e[3]||'')+' '+(e[5]?e[5][8]+' '+e[5][0]:''))}});cb()};document.head.appendChild(s)}
function href(e){return root+(e.t==='p'?'players/':e.t==='t'?'teams/':e.t==='e'?'events/':'matches/')+e.id+'.html'}
function kind(e){return e.t==='p'?'':e.t==='t'?'team':e.t==='e'?'tournament':'match'}
function render(list){box.innerHTML='';sel=-1;if(!list.length){box.style.display='none';return}
list.slice(0,25).forEach(function(e){var a=document.createElement('a');a.href=href(e);a.textContent=e.n;var sm=document.createElement('small');sm.textContent=(kind(e)?kind(e)+' · ':'')+e.s;a.appendChild(sm);box.appendChild(a)});box.style.display='block'}
function search(){var v=norm(q.value.trim());if(v.length<2){box.style.display='none';return}
var words=v.split(/\s+/),out=[];for(var i=0;i<idx.length&&out.length<200;i++){var e=idx[i],ok=true;for(var w=0;w<words.length;w++){if(e.k.indexOf(words[w])<0){ok=false;break}}if(ok)out.push(e)}
out.sort(function(a,b){var ap=norm(a.n).indexOf(v)===0?0:1,bp=norm(b.n).indexOf(v)===0?0:1;if(ap!==bp)return ap-bp;var at=a.t==='p'?0:1,bt=b.t==='p'?0:1;if(at!==bt)return at-bt;if(a.m!==b.m)return b.m-a.m;return a.n.length-b.n.length});render(out)}
q.addEventListener('focus',function(){load(function(){})});
q.addEventListener('input',function(){load(search)});
q.addEventListener('keydown',function(ev){var items=box.querySelectorAll('a');if(!items.length)return;
if(ev.key==='ArrowDown'){sel=Math.min(sel+1,items.length-1)}else if(ev.key==='ArrowUp'){sel=Math.max(sel-1,0)}else if(ev.key==='Enter'){if(sel>=0){location.href=items[sel].href}else{location.href=items[0].href}return}else if(ev.key==='Escape'){box.style.display='none';return}else return;
ev.preventDefault();items.forEach(function(a,i){a.className=i===sel?'sel':''});items[sel].scrollIntoView({block:'nearest'})});
document.addEventListener('click',function(ev){if(!box.contains(ev.target)&&ev.target!==q)box.style.display='none'});
})();
