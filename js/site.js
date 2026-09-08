(() => {
  const DATA = window.PORTFOLIO_DATA;
  const CREDENTIALS = { email: 'vemasardiyan@student.ppns.ac.id', password: 'akubisa' };
  const isLogin = location.pathname.endsWith('/login.html') || location.pathname.endsWith('login.html');
  const authed = sessionStorage.getItem('vemas_portfolio_auth') === 'yes';
  if (document.body.classList.contains('auth-required') && !authed) { location.replace('login.html'); return; }
  if (isLogin && authed) { location.replace('index.html'); return; }
  const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const img = path => path ? esc(path) : '';
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', e => {e.preventDefault();const email=document.getElementById('loginEmail').value.trim().toLowerCase();const pwd=document.getElementById('passwordInput').value;if(email===CREDENTIALS.email&&pwd===CREDENTIALS.password){sessionStorage.setItem('vemas_portfolio_auth','yes');location.href='index.html';}else document.getElementById('loginError').hidden=false;});
  document.querySelectorAll('.js-logout').forEach(btn=>btn.addEventListener('click',()=>{sessionStorage.removeItem('vemas_portfolio_auth');location.href='login.html';}));
  document.querySelectorAll('.copy-btn').forEach(btn=>btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(btn.dataset.copy);btn.textContent='Copied';setTimeout(()=>btn.textContent='Copy',900);}catch(_){}}));
  const toggle=document.getElementById('togglePassword'),pwd=document.getElementById('passwordInput');if(toggle&&pwd)toggle.onclick=()=>pwd.type=pwd.type==='password'?'text':'password';
  if (document.getElementById('profileTitle')) {const p=DATA.PROFILE;document.getElementById('profileTitle').textContent=p.title;document.getElementById('profileSummary').textContent=p.summary;document.getElementById('profileList').innerHTML=[['Nama',p.name],['TTL',p.birth],['Pendidikan',p.education],['IPK',p.gpa],['Domisili',p.location]].map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('');document.getElementById('projectRail').innerHTML=DATA.PROJECTS.map(pr=>`<a class="project-card tilt reveal accent-${esc(pr.accent)}" href="project.html?id=${encodeURIComponent(pr.slug)}"><div class="project-no">${esc(pr.number)}</div><div class="project-meta"><span>${esc(pr.year)}</span><span>${esc(pr.type)}</span></div>${pr.cover?`<div class="project-cover"><img src="${img(pr.cover)}" alt="${esc(pr.title)}"></div>`:`<div class="project-cover abstract-cover"><span>${esc(pr.number)}</span></div>`}<div class="project-content"><h3>${esc(pr.title)}</h3><p>${esc(pr.summary)}</p></div><div class="project-open">Open case study <span>↗</span></div></a>`).join('');document.getElementById('skillsGrid').innerHTML=DATA.SKILLS.map((s,i)=>`<article class="skill-panel glass reveal"><div class="skill-head"><span>0${i+1}</span><h3>${esc(s.name)}</h3></div><div class="tags">${s.items.map(x=>`<span>${esc(x)}</span>`).join('')}</div></article>`).join('');document.getElementById('leadershipTimeline').innerHTML=DATA.LEADERSHIP.map(l=>`<div class="timeline-item"><span>${esc(l.period)}</span><div><h3>${esc(l.role)}</h3><p>${esc(l.org)}</p></div></div>`).join('');document.getElementById('contactGrid').innerHTML=`<a href="mailto:${esc(p.email)}"><small>Email</small><strong>${esc(p.email)}</strong></a><a href="tel:${esc(p.phone.replace(/\s/g,''))}"><small>Phone / WhatsApp</small><strong>${esc(p.phone)}</strong></a><a href="https://instagram.com/${esc(p.instagram.replace('@',''))}" target="_blank"><small>Instagram</small><strong>${esc(p.instagram)}</strong></a><a href="https://${esc(p.linkedin)}" target="_blank"><small>LinkedIn</small><strong>${esc(p.linkedin)}</strong></a><div class="address-card"><small>Alamat</small><strong>${esc(p.address)}</strong></div>`;document.getElementById('emailButton').href=`mailto:${p.email}`;}
  const root=document.getElementById('projectRoot');
  if(root){
    const id=new URLSearchParams(location.search).get('id');
    const project=DATA.PROJECTS.find(p=>p.slug===id)||DATA.PROJECTS[0];
    const idx=DATA.PROJECTS.indexOf(project),prev=DATA.PROJECTS[idx-1],next=DATA.PROJECTS[idx+1];
    document.title=`${project.title} — Vemas Ardiyan Syah`;
    const normalizeMedia=(g)=>{
      if(Array.isArray(g)) return {type:'image',src:g[0],caption:g[1]||''};
      return g||{};
    };
    const mediaHTML=(raw)=>{
      const g=normalizeMedia(raw), cap=esc(g.caption||''), badge=g.badge?`<span class="media-badge">${esc(g.badge)}</span>`:'';
      const source=g.source?`<a class="media-source" href="${esc(g.source)}" target="_blank" rel="noopener">Source ↗</a>`:'';
      if(g.type==='video'){
        return `<figure class="gallery-item gallery-video reveal">${badge}<video controls preload="metadata" ${g.poster?`poster="${img(g.poster)}"`:''}><source src="${img(g.src)}" type="video/mp4">Browser Anda tidak mendukung video.</video><figcaption><span>${cap}</span>${source}</figcaption></figure>`;
      }
      if(g.type==='video-embed'){
        return `<figure class="gallery-item gallery-video reveal">${badge}<div class="video-embed"><iframe src="${esc(g.src)}" title="${cap}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><figcaption><span>${cap}</span>${source}</figcaption></figure>`;
      }
      if(g.type==='info'){
        return `<article class="gallery-item info-media reveal">${badge}<div class="info-media-inner"><span class="eyebrow">TECHNICAL NOTE</span><h3>${esc(g.title||'Project Note')}</h3><p>${esc(g.text||'')}</p>${source}</div></article>`;
      }
      return `<figure class="gallery-item image-media reveal">${badge}<button class="media-open" type="button" aria-label="Open image"><img src="${img(g.src)}" alt="${cap}" loading="lazy" referrerpolicy="no-referrer"></button><figcaption><span>${cap}</span>${source}</figcaption></figure>`;
    };
    const flow=project.case_flow&&project.case_flow.length?project.case_flow:project.story.map((text,i)=>({label:['CONTEXT','BUILD','IMPACT'][i]||`STEP ${i+1}`,title:'',text}));
    const refs=(project.references||[]).map(r=>`<a class="source-chip" href="${esc(r.url)}" target="_blank" rel="noopener"><span>↗</span><div><small>Reference / source</small><b>${esc(r.label)}</b></div></a>`).join('');
    root.innerHTML=`
      <section class="project-hero section-pad accent-${esc(project.accent)}">
        <div class="project-hero-grid">
          <div class="reveal">
            <div class="eyebrow"><span>${esc(project.number)}</span> ${esc(project.type)} · ${esc(project.year)}</div>
            <h1>${esc(project.title)}</h1><h2>${esc(project.subtitle)}</h2><p>${esc(project.summary)}</p>
            <div class="project-stack">${project.stack.map(x=>`<span>${esc(x)}</span>`).join('')}</div>
          </div>
          <div class="project-hero-media reveal">${project.cover?`<img src="${img(project.cover)}" alt="${esc(project.title)}" referrerpolicy="no-referrer">`:`<div class="hero-abstract"><span>${esc(project.number)}</span><b>${esc(project.year)}</b></div>`}</div>
        </div>
        <div class="detail-metrics reveal">${project.metrics.map(([v,l])=>`<div><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join('')}</div>
      </section>
      <section class="section-pad case-layout">
        <div class="section-heading compact reveal"><div><span class="section-index">CASE</span><span class="eyebrow">PROJECT-SPECIFIC STORY</span></div><h2>How this work<br><span>actually happened.</span></h2></div>
        <div class="case-flow-grid">${flow.map((f,i)=>`<article class="case-flow-card reveal"><span class="case-step">0${i+1}</span><span class="eyebrow">${esc(f.label)}</span><h3>${esc(f.title||'')}</h3><p>${esc(f.text)}</p></article>`).join('')}</div>
        <aside class="case-role glass reveal"><span class="eyebrow">WHAT I DID</span><ul>${project.responsibilities.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></aside>
      </section>
      ${project.gallery&&project.gallery.length?`
      <section class="section-pad gallery-section">
        <div class="section-heading compact reveal"><div><span class="section-index">VISUAL</span><span class="eyebrow">DOCUMENTATION</span></div><h2>Evidence, process &<br><span>selected documentation.</span></h2></div>
        <div class="gallery-grid">${project.gallery.map(mediaHTML).join('')}</div>
      </section>`:''}
      <section class="section-pad outcome-section">
        <div class="outcome-card reveal"><span class="eyebrow">OUTCOME / LEARNING</span><h2>${esc(project.outcome)}</h2></div>
        ${project.documents.length?`<div class="docs-row reveal">${project.documents.map(([l,p])=>`<a class="doc-chip" target="_blank" href="${img(p)}"><span>↗</span><div><small>Supporting document</small><b>${esc(l)}</b></div></a>`).join('')}</div>`:''}
        ${refs?`<div class="source-row reveal">${refs}</div>`:''}
      </section>
      <section class="section-pad next-projects">${prev?`<a href="project.html?id=${encodeURIComponent(prev.slug)}"><small>Previous</small><strong>← ${esc(prev.title)}</strong></a>`:'<span></span>'}${next?`<a class="next" href="project.html?id=${encodeURIComponent(next.slug)}"><small>Next</small><strong>${esc(next.title)} →</strong></a>`:''}</section>`;
    const modal=document.createElement('div');
    modal.className='lightbox';modal.innerHTML='<button class="lightbox-close" aria-label="Close">×</button><img alt=""><p></p>';
    document.body.appendChild(modal);
    const closeModal=()=>modal.classList.remove('open');
    modal.querySelector('.lightbox-close').onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
    document.querySelectorAll('.media-open').forEach(btn=>btn.addEventListener('click',()=>{const im=btn.querySelector('img');modal.querySelector('img').src=im.src;modal.querySelector('p').textContent=btn.closest('figure').querySelector('figcaption span')?.textContent||'';modal.classList.add('open')}));
  }
  const prefersReduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const reveals=document.querySelectorAll('.reveal');if(!prefersReduced&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.1});reveals.forEach(x=>io.observe(x));}else reveals.forEach(x=>x.classList.add('is-visible'));
  document.querySelectorAll('.counter').forEach(el=>{const target=Number(el.dataset.target||0);let done=false;const go=()=>{if(done)return;done=true;const s=performance.now();const f=t=>{let p=Math.min((t-s)/1200,1);p=1-Math.pow(1-p,3);el.textContent=Math.floor(target*p).toLocaleString('id-ID');if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};if('IntersectionObserver'in window){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){go();o.disconnect()}}),{threshold:.4});o.observe(el)}else go()});
  if(!prefersReduced&&matchMedia('(pointer:fine)').matches)document.querySelectorAll('.tilt').forEach(card=>{card.onmousemove=e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-3px)`};card.onmouseleave=()=>card.style.transform=''});
  const canvas=document.getElementById('networkCanvas');if(canvas&&!prefersReduced&&!navigator.webdriver){const ctx=canvas.getContext('2d');let w,h,dpr,pts=[];const resize=()=>{dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);pts=Array.from({length:Math.min(55,Math.floor(w/26))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}))};resize();addEventListener('resize',resize);const draw=()=>{ctx.clearRect(0,0,w,h);pts.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.fillStyle='rgba(81,199,255,.45)';ctx.arc(p.x,p.y,1.2,0,Math.PI*2);ctx.fill();for(let j=i+1;j<pts.length;j++){const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<125){ctx.strokeStyle=`rgba(72,147,220,${.12*(1-d/125)})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}});requestAnimationFrame(draw)};draw()}
})();
