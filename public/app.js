// ════════════════════════════════════════════════════════════════
//  Interactivité client — chargé en script classique (fonctions globales).
//  Le contenu (projets, langues) est déjà rendu par Astro : ce fichier ne
//  fait QUE de l'interactivité (bascule FR/EN en CSS, tri/filtre du DOM, etc.).
// ════════════════════════════════════════════════════════════════

// ── LANGUE ──
let lang = localStorage.getItem('lang') || ((navigator.language || 'fr').startsWith('fr') ? 'fr' : 'en');
function applyLang() {
  document.body.className = 'lang-' + lang;
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
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  const btn = document.querySelector('.dark-toggle');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
  if (navOpen) document.getElementById('nav-ul').style.background = isDark ? '#141620' : 'white';
}
window.toggleDark = toggleDark;

// ── NAV MOBILE ──
function toggleNav() {
  navOpen = !navOpen;
  const ul = document.getElementById('nav-ul');
  Object.assign(
    ul.style,
    navOpen
      ? { display: 'flex', flexDirection: 'column', position: 'fixed', top: '60px', left: 0, right: 0, background: document.documentElement.classList.contains('dark') ? '#141620' : 'white', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', zIndex: 399, gap: '.8rem' }
      : { display: 'none' }
  );
}
window.toggleNav = toggleNav;

// ── LIGHTBOX ──
function openLb(img) {
  document.getElementById('lb-img').src = img.src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
window.openLb = openLb;
window.closeLightbox = closeLightbox;
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

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

  // Réordonne le DOM : projets visibles triés, puis masqués à la fin.
  [...sorted, ...hidden].forEach((c) => grid.appendChild(c));

  // Limite d'affichage (3 mobile / 6 desktop).
  const limit = window.innerWidth <= 900 ? 3 : 6;
  sorted.forEach((c, i) => { c.style.display = projExpanded || i < limit ? '' : 'none'; });
  hidden.forEach((c) => { c.style.display = 'none'; });

  const btn = document.getElementById('proj-more-btn');
  if (btn) {
    btn.style.display = sorted.length > 6 ? 'flex' : 'none';
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
  const dbtn = document.querySelector('.dark-toggle');
  if (dbtn) dbtn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';

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
      if (!card || e.target.closest('[data-stop]')) return;
      window.location.href = card.dataset.href;
    });
    grid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const card = e.target.closest('.proj-card');
      if (card) window.location.href = card.dataset.href;
    });
  }

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
    const ul = document.getElementById('nav-ul');
    if (ul) ul.removeAttribute('style');
  }
});

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
