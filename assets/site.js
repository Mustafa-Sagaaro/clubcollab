// ClubCollab — shared interactions
(function(){
  var nav=document.getElementById('nav');
  addEventListener('scroll',function(){
    if(nav)nav.classList.toggle('scrolled',scrollY>30);
    var p=document.getElementById('progress');
    if(p){var h=document.documentElement.scrollHeight-innerHeight;p.style.width=(h>0?scrollY/h*100:0)+'%';}
  },{passive:true});

  var tog=document.querySelector('.nav-toggle');
  if(tog&&nav)tog.addEventListener('click',function(){nav.classList.toggle('open');});
  document.querySelectorAll('.navlinks a').forEach(function(a){a.addEventListener('click',function(){nav&&nav.classList.remove('open');});});
  var bd=document.querySelector('.nav-backdrop');
  if(bd&&nav)bd.addEventListener('click',function(){nav.classList.remove('open');});

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.14});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  // accordion (expandable packages)
  function setH(item){var b=item.querySelector('.acc-body');if(b)b.style.maxHeight=item.classList.contains('open')?b.scrollHeight+'px':'0px';}
  document.querySelectorAll('.acc-head').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.acc');var open=item.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');setH(item);
    });
  });
  document.querySelectorAll('.acc.open').forEach(function(item){
    var btn=item.querySelector('.acc-head');if(btn)btn.setAttribute('aria-expanded','true');setH(item);
  });
  addEventListener('resize',function(){document.querySelectorAll('.acc.open').forEach(setH);});

  document.querySelectorAll('[data-counts]').forEach(function(c){
    var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){
      e.target.querySelectorAll('[data-count]').forEach(function(n){var end=+n.dataset.count,t0=null;
        (function r(t){if(!t0)t0=t;var p=Math.min((t-t0)/1300,1);n.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(r);})(performance.now());});
      cio.unobserve(e.target);}});},{threshold:.4});
    cio.observe(c);
  });
})();
