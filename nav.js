/* ===== SHARED NAV / CURSOR / TRANSITIONS ===== */
(function(){

  /* ---- CURSOR ---- */
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  if(cur && ring){
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
    (function loop(){
      cur.style.left=mx+'px'; cur.style.top=my+'px';
      rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,[role=button]').forEach(el=>{
      el.addEventListener('mouseenter',()=>document.body.classList.add('hover-active'));
      el.addEventListener('mouseleave',()=>document.body.classList.remove('hover-active'));
    });
  }

  /* ---- NAV LINKS ---- */
  /* Directly wire every nav tab to navigate on click */
  document.querySelectorAll('.nav-links a').forEach(function(a){
    a.style.pointerEvents = 'auto';
    a.style.cursor = 'pointer';
    a.onclick = function(e){
      e.stopPropagation();
      var href = a.getAttribute('href');
      if(href) window.location.href = href;
    };
  });

  /* ---- REVEAL SYSTEM ---- */
  function forceReveal(el){
    el.style.transition = 'none';
    el.style.opacity    = '1';
    el.style.transform  = 'translateY(0)';
  }

  function animReveal(el){
    el.style.transition = '';
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        el.classList.add('visible');
      });
    });
  }

  const revealEls = document.querySelectorAll('.reveal');

  if(!('IntersectionObserver' in window)){
    revealEls.forEach(forceReveal);
    return;
  }

  const obs = new IntersectionObserver((entries,observer)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        animReveal(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  revealEls.forEach(el=>{
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 20){
      forceReveal(el);
    } else {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(28px)';
      obs.observe(el);
    }
  });

})();
