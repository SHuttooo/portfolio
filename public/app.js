// ════════════════════════════════════════════════════════════════
//  Interactivité client — chargé en script classique (fonctions globales).
//  Le contenu (projets, langues) est déjà rendu par Astro : ce fichier ne
//  fait QUE de l'interactivité (bascule FR/EN en CSS, tri/filtre du DOM, etc.).
// ════════════════════════════════════════════════════════════════

// ── LANGUE ──
let lang = localStorage.getItem('lang') || ((navigator.language || 'fr').startsWith('fr') ? 'fr' : 'en');
function applyLang() {
  document.body.className = 'lang-' + lang;
  document.documentElement.lang=lang;
  document.querySelectorAll('title[data-fr],meta[data-fr]').forEach(el=>{if(el.tagName==='TITLE')el.textContent=el.dataset[lang];else el.content=el.dataset[lang];});
  const locale=document.querySelector('meta[property="og:locale"]');if(locale)locale.content=lang==='en'?'en_GB':'fr_FR';
  document.querySelectorAll('a[onclick*=goCV]').forEach(a=>{a.href='/cv-matthieu-vinet-'+lang+'.pdf';});
  document.querySelectorAll('.preview').forEach(el=>el.dispatchEvent(new Event('update-preview-label')));
  document.querySelectorAll('.style-picker').forEach(el=>el.dispatchEvent(new Event('update-style-label')));
  document.querySelectorAll('.lang-sw button[data-l]').forEach((b) => b.classList.toggle('on', b.dataset.l === lang));
}
function setLang(l) {
  lang = l;
  localStorage.setItem('lang', l);
  applyLang();
}
window.setLang = setLang;

// ── DARK MODE ──
let navOpen = false;
function toggleDark() {
  const isDark = document.documentElement.classList.toggle('dark');
  try{localStorage.setItem('theme', isDark ? 'dark' : 'light');}catch{}
  const btn = document.querySelector('.dark-toggle');
  if (btn){btn.textContent = isDark ? '☀' : '☾';btn.setAttribute('aria-pressed',String(isDark));btn.setAttribute('aria-label',lang==='en'?(isDark?'Switch to light mode':'Switch to dark mode'):(isDark?'Passer en mode clair':'Passer en mode sombre'));}
  if (navOpen) document.getElementById('nav-ul').style.background = 'var(--surface)';
}
window.toggleDark = toggleDark;

// ── NAV MOBILE ──
function toggleNav() {
  navOpen = !navOpen;
  document.querySelector('.hbg')?.setAttribute('aria-expanded',String(navOpen));
  const ul = document.getElementById('nav-ul');
  Object.assign(
    ul.style,
    navOpen
      ? { display: 'flex', flexDirection: 'column', position: 'fixed', top: '60px', left: 0, right: 0, background: 'var(--surface)', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', zIndex: 399, gap: '.8rem' }
      : { display: 'none' }
  );
}
window.toggleNav = toggleNav;

// ── LIGHTBOX ──
let lightboxTrigger = null;
function openLb(img) {
  lightboxTrigger = document.activeElement;
  document.getElementById('lb-img').src = img.src;
  document.getElementById('lb-img').alt = img.alt || (lang === 'en' ? 'Project image' : 'Image du projet');
  document.getElementById('lightbox').classList.add('open');
  document.querySelector('.lb-close').focus();
}
function closeLightbox() {
  const wasOpen = document.getElementById('lightbox').classList.contains('open');
  document.getElementById('lightbox').classList.remove('open');
  if (wasOpen) lightboxTrigger?.focus();
}
window.openLb = openLb;
window.closeLightbox = closeLightbox;
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'Tab' && document.getElementById('lightbox').classList.contains('open')) {
    e.preventDefault();document.querySelector('.lb-close').focus();
  }
});

// ── CV (langue active) ──
function goCV(e) {
  e.currentTarget.href = lang === 'en' ? '/cv-matthieu-vinet-en.pdf' : '/cv-matthieu-vinet-fr.pdf';
  return true;
}
window.goCV = goCV;

// ── TOGGLE DESCRIPTION (carte projet) ──
function toggleDesc(id, btn) {
  const el = document.getElementById('desc-' + id);
  if (!el) return;
  el.classList.toggle('collapsed');
  btn.classList.toggle('open');
}
window.toggleDesc = toggleDesc;

// ── VOIR PLUS D'EXPÉRIENCES ──
function toggleExp(btn) {
  const wrap = document.getElementById('exp-extra');
  if (!wrap) return;
  const open = !wrap.classList.toggle('collapsed');
  const arrow = btn.querySelector('.exp-arrow');
  if (arrow) arrow.style.transform = open ? 'rotate(180deg)' : '';
  btn.querySelector('.fr').textContent = open ? "Voir moins d'expériences" : "Voir plus d'expériences";
  btn.querySelector('.en').textContent = open ? 'Show less experience' : 'Show more experience';
}
window.toggleExp = toggleExp;

// ── FILTRES / TRI / LIMITE DES PROJETS ──
let projSort = 'featured';
let projExpanded = false;

function stackMatch(dataStack, matchStr) {
  if (!matchStr) return true;
  const stack = (dataStack || '').toLowerCase().split('|').filter(Boolean);
  return matchStr.toLowerCase().split('|').some((k) => (k.length <= 2 ? stack.includes(k) : stack.some((s) => s.includes(k))));
}

function applyFilterSort() {
  const grid = document.getElementById('proj-g');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.proj-card')];
  const fbtn = document.querySelector('.proj-filter-btn.active');
  const matchStr = fbtn ? fbtn.dataset.match : '';

  const visible = cards.filter((c) => stackMatch(c.dataset.stack, matchStr));
  const hidden = cards.filter((c) => !visible.includes(c));

  const byDate = (a, b) => (b.dataset.date || '').localeCompare(a.dataset.date || '');
  let sorted;
  if (projSort === 'recent') {
    sorted = visible.slice().sort(byDate);
  } else {
    const feat = visible.filter((c) => c.dataset.featured === '1').sort(byDate);
    const oth = visible.filter((c) => c.dataset.featured !== '1').sort(byDate);
    sorted = [...feat, ...oth];
  }

  grid.dataset.sort=projSort;
  const featuredGrid=grid.querySelector('.featured-projects');const otherGrid=grid.querySelector('.other-projects');
  [...sorted,...hidden].forEach(c=>(projSort==='featured'&&c.dataset.featured==='1'?featuredGrid:otherGrid).appendChild(c));
  const limit=projSort==='featured'?6+sorted.filter(c=>c.dataset.featured==='1').length:6;
  sorted.forEach((c,i)=>{c.hidden=!projExpanded&&i>=limit;if(c.hidden)c.querySelector('.preview')?.dispatchEvent(new Event('stop-preview'));});
  hidden.forEach(c=>{c.hidden=true;c.querySelector('.preview')?.dispatchEvent(new Event('stop-preview'));});
  // Repack each run of standard cards after filtering, preserving project order.
  cards.forEach(c=>c.classList.remove('featured-fill-row'));
  let pending = null;
  for (const card of [...featuredGrid.children].filter(c=>!c.hidden)) {
    if (card.classList.contains('featured-layout-wide')) {
      if (pending) pending.classList.add('featured-fill-row');
      pending = null;
    } else if (pending) pending = null;
    else pending = card;
  }
  if (pending) pending.classList.add('featured-fill-row');
  grid.querySelector('[data-featured-group]').hidden=![...featuredGrid.children].some(c=>!c.hidden);
  grid.querySelector('[data-other-group]').hidden=![...otherGrid.children].some(c=>!c.hidden);

  const btn = document.getElementById('proj-more-btn');
  if (btn) {
    btn.style.display = sorted.length > limit ? 'flex' : 'none';
    btn.setAttribute('aria-expanded',String(projExpanded));
    const arrow = btn.querySelector('.proj-more-arrow');
    const label = btn.querySelector('.proj-more-label');
    if (arrow) arrow.style.transform = projExpanded ? 'rotate(180deg)' : '';
    if (label) {
      label.querySelector('.fr').textContent = projExpanded ? 'Voir moins' : 'Voir tous les projets (' + sorted.length + ')';
      label.querySelector('.en').textContent = projExpanded ? 'Show less' : 'View all projects (' + sorted.length + ')';
    }
  }
}

function toggleProjects() {
  projExpanded = !projExpanded;
  applyFilterSort();
}
window.toggleProjects = toggleProjects;

// ── SCROLL REVEAL ──
function observe() {
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.rv:not(.on)').forEach((el) => io.observe(el));
}

// ── INIT ──
function init() {
  applyLang();
  initStylePicker();
  document.querySelectorAll('#nav-ul a').forEach(a=>a.addEventListener('click',()=>{if(navOpen)toggleNav();}));
  const dbtn = document.querySelector('.dark-toggle');
  if (dbtn){const dark=document.documentElement.classList.contains('dark');dbtn.textContent=dark?'☀':'☾';dbtn.setAttribute('aria-pressed',String(dark));}

  // Filtres
  document.querySelectorAll('.proj-filter-btn').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.proj-filter-btn').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      projExpanded = false;
      applyFilterSort();
    });
  });
  // Tri
  document.querySelectorAll('.sort-btn').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      projSort = b.dataset.sort;
      projExpanded = false;
      applyFilterSort();
    });
  });
  // Bouton "voir plus de projets"
  const moreBtn = document.getElementById('proj-more-btn');
  if (moreBtn) moreBtn.addEventListener('click', toggleProjects);

  // Navigation carte projet (clic + clavier), en ignorant les zones interactives.
  const grid = document.getElementById('proj-g');
  if (grid) {
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.proj-card');
      if (!card || e.target.closest('[data-stop],a,button')) return;
      window.location.href = card.dataset.href;
    });
    grid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const card = e.target.closest('.proj-card');
      if (card && !e.target.closest('a,button,[data-stop]')) window.location.href = card.dataset.href;
    });
  }

  initPreviews();
  initVideoMetadata();
  applyFilterSort();
  observe();

  // Formulaire de contact
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const msg = document.getElementById('form-msg');
      const btn = this.querySelector('.btn-send');
      btn.disabled = true;
      msg.style.color = 'rgba(255,255,255,.5)';
      msg.textContent = lang === 'fr' ? 'Envoi…' : 'Sending…';
      try {
        const r = await fetch(this.action, { method: 'POST', body: new FormData(this), headers: { Accept: 'application/json' } });
        if (r.ok) { msg.style.color = '#4ade80'; msg.textContent = lang === 'fr' ? '✓ Message envoyé !' : '✓ Sent!'; this.reset(); }
        else throw new Error();
      } catch {
        msg.style.color = '#f87171';
        msg.textContent = lang === 'fr' ? '✗ Erreur, réessayez.' : '✗ Error.';
      }
      btn.disabled = false;
    });
  }
}

// Fermeture du menu mobile au redimensionnement.
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    navOpen = false;
    document.querySelector('.hbg')?.setAttribute('aria-expanded','false');
    const ul = document.getElementById('nav-ul');
    if (ul) ul.removeAttribute('style');
  }
});

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

// ── CHAPITRES EN ONGLETS (fiche projet) ──
function switchChap(btn) {
  var n = btn.getAttribute('data-chap');
  var root = btn.closest('.proj-detail') || document;
  root.querySelectorAll('.chap-tab').forEach(function (b) {
    var on = b === btn;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  root.querySelectorAll('.chap-block').forEach(function (el) {
    el.classList.toggle('on', el.getAttribute('data-chap') === n);
  });
  // Une vidéo laissée en lecture dans l'onglet qu'on quitte continuerait de jouer.
  root.querySelectorAll('.chap-block:not(.on) video').forEach(function (v) { v.pause(); });
}
window.switchChap = switchChap;

// Lazy, muted previews: explicit controls remain available on touch and keyboard.
function initPreviews(){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');const fine=matchMedia('(hover:hover) and (pointer:fine)');
 const previews=[...document.querySelectorAll('.preview')];
 for(const el of previews){
  const video=el.querySelector('video');const button=el.querySelector('.preview-toggle');if(!video||!button)continue;
  let pinned=false;let requested=false;
  const label=()=>{const active=el.classList.contains('playing');const text=lang==='en'?(active?'Pause preview':'Play preview'):(active?'Mettre en pause':'Voir la vidéo');button.textContent=active?'Ⅱ':'▶';button.setAttribute('aria-label',text);button.title=text;button.setAttribute('aria-pressed',String(active));};
  const stop=()=>{requested=false;video.pause();el.classList.remove('playing');label();};
  const play=async()=>{requested=true;previews.forEach(other=>{if(other!==el)other.dispatchEvent(new Event('stop-preview'));});if(!video.getAttribute('src'))video.src=video.dataset.src;try{await video.play();if(!requested){video.pause();return;}el.classList.add('playing');label();}catch{pinned=false;stop();}};
  el.addEventListener('pointerenter',()=>{if(fine.matches&&!reduced.matches)play();});el.addEventListener('pointerleave',()=>{if(!pinned)stop();});
  button.addEventListener('click',()=>{if(pinned){pinned=false;stop();}else{pinned=true;play();}});
  el.addEventListener('stop-preview',()=>{pinned=false;stop();});el.addEventListener('update-preview-label',label);
  reduced.addEventListener('change',()=>{pinned=false;stop();});
  new IntersectionObserver(entries=>{if(!entries[0].isIntersecting){pinned=false;stop();}},{threshold:.05}).observe(el);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){pinned=false;stop();}});label();
 }
}
const browserTheme=matchMedia('(prefers-color-scheme: dark)');browserTheme.addEventListener('change',event=>{let saved;try{saved=localStorage.getItem('theme');}catch{}if(saved==='dark'||saved==='light')return;document.documentElement.classList.toggle('dark',event.matches);const button=document.querySelector('.dark-toggle');if(button){button.textContent=event.matches?'☀':'☾';button.setAttribute('aria-pressed',String(event.matches));}});

// Visual variants share content, structure and an independent light/dark preference.
function initStylePicker(){
 const picker=document.querySelector('.style-picker');if(!picker)return;
 const names={atelier:'Atelier',studio:'Studio',editorial:'Éditorial',solaire:'Solaire'};
 const buttons=[...picker.querySelectorAll('[data-visual-style]')];
 const update=()=>{
  const style=document.documentElement.dataset.visualStyle||'atelier';
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.visualStyle===style)));
  picker.querySelector('.current-style').textContent=lang==='en'&&style==='editorial'?'Editorial':lang==='en'&&style==='solaire'?'Solar':names[style];
 };
 buttons.forEach(b=>b.addEventListener('click',()=>{
  document.documentElement.dataset.visualStyle=b.dataset.visualStyle;
  try{localStorage.setItem('portfolio-visual-style',b.dataset.visualStyle);}catch{}
  update();
 }));
 picker.addEventListener('update-style-label',update);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&picker.open){picker.open=false;picker.querySelector('summary').focus();}});
 document.addEventListener('click',e=>{if(picker.open&&!picker.contains(e.target))picker.open=false;});
 update();
 initStyleInvitation(picker);
}

// One small invitation after 25 seconds: no overlay, focus capture or interruption of a form.
function initStyleInvitation(picker){
 const invitation=document.querySelector('.style-invitation');if(!invitation)return;
 const key='portfolio-style-invitation-v1';
 let dismissed=false;try{dismissed=!!localStorage.getItem(key);}catch{}
 let timer;
 const hide=()=>{dismissed=true;invitation.hidden=true;clearTimeout(timer);try{localStorage.setItem(key,'seen');}catch{}};
 invitation.querySelector('.invitation-close').addEventListener('click',hide);
 invitation.querySelector('.invitation-open').addEventListener('click',()=>{hide();picker.open=true;picker.querySelector('summary').focus();});
 picker.addEventListener('toggle',()=>{if(picker.open)hide();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!invitation.hidden)hide();});
 const show=()=>{
  if(dismissed)return;
  if(document.hidden||picker.open||document.activeElement?.matches('input,textarea,select')){timer=setTimeout(show,10000);return;}
  invitation.hidden=false;
  try{localStorage.setItem(key,'seen');}catch{}
 };
 if(!dismissed)timer=setTimeout(show,25000);
}

// Load only metadata for visible case-study videos, keeping offscreen chapters quiet.
function initVideoMetadata(){
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){if(!entry.isIntersecting)continue;
   const video=entry.target;video.preload='metadata';video.load();observer.unobserve(video);
  }
 },{rootMargin:'200px'});
 document.querySelectorAll('video[data-load-metadata]').forEach(video=>observer.observe(video));
}
