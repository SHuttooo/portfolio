// ════════════════════════════════════════════════════════════════
//  MOTEUR PORTFOLIO — main.js
//  Ne pas modifier ce fichier sauf pour ajouter des fonctions
// ════════════════════════════════════════════════════════════════

const CATS = {
  robotics: { fr:'Robotique', en:'Robotics',  color:'#1a2fff', bg:'#f0f2ff', icon:'🤖' },
  software: { fr:'Logiciel',  en:'Software',  color:'#475569', bg:'#f1f5f9', icon:'💻' },
  hardware: { fr:'Hardware',  en:'Hardware',  color:'#475569', bg:'#f1f5f9', icon:'⚙️' },
  web:      { fr:'Web',       en:'Web',       color:'#475569', bg:'#f1f5f9', icon:'🌐' },
  other:    { fr:'Autre',     en:'Other',     color:'#6b7280', bg:'#f9fafb', icon:'📦' },
};

let lang = (navigator.language || navigator.userLanguage || 'fr').startsWith('fr') ? 'fr' : 'en';
let scrollPos = 0;
let currentProjectId = null;

const FILTERS = [
  { id:'all',        labelFr:'Tous',              labelEn:'All',               match: null },
  { id:'ros2',       labelFr:'ROS2 · Nav2',       labelEn:'ROS2 · Nav2',       match:['ROS2','Nav2','Gazebo'] },
  { id:'python',     labelFr:'Python',            labelEn:'Python',            match:['Python'] },
  { id:'c-cpp',      labelFr:'C / C++',           labelEn:'C / C++',           match:['C','C++'] },
  { id:'js',         labelFr:'JavaScript',        labelEn:'JavaScript',        match:['JavaScript','HTML/CSS/JS'] },
  { id:'arduino',    labelFr:'Arduino · ESP32',   labelEn:'Arduino · ESP32',   match:['Arduino','ESP32'] },
  { id:'solidworks', labelFr:'CAO · Fabrication', labelEn:'CAD · Fabrication', match:['SolidWorks','3D printing','Laser cutting','Découpe laser'] },
  { id:'opencv',     labelFr:'OpenCV · Vision',   labelEn:'OpenCV · Vision',   match:['OpenCV','Vision','Image processing'] },
  { id:'ai',         labelFr:'IA · ML',           labelEn:'AI · ML',           match:['IA','Reinforcement Learning','LeRobot','Monte-Carlo','Monte Carlo','Minimax'] },
];
let activeFilter = 'all';

function stackMatchesFilter(stack, filter) {
  if (!filter || !filter.match) return true;
  return filter.match.some(keyword => {
    const k = keyword.toLowerCase();
    return (stack || []).some(s => {
      const sl = s.toLowerCase();
      return k.length <= 2 ? sl === k : sl.includes(k);
    });
  });
}

// ── SKILLS ──
function renderSkills() {
  const groups = typeof SKILL_GROUPS !== 'undefined' ? SKILL_GROUPS : [];
  document.getElementById('sk-g').innerHTML = groups.map(g => {
    const name = lang === 'en' ? g.nameEn : g.nameFr;
    const skillList = lang === 'en' ? (g.skillsEn || g.skills || []) : (g.skillsFr || g.skills || []);
    const lvls = g.levels || [];
    const tags = skillList.map((s, i) => {
      const lvl = lvls[i] || 0;
      const dots = [1,2,3].map(d => `<span class="sk-dot${d <= lvl ? ' on' : ''}" ${d <= lvl ? `style="background:${g.color}"` : ''}></span>`).join('');
      return `<span class="sk-tag"><span class="sk-tag-name">${s}</span><span class="sk-dots">${dots}</span></span>`;
    }).join('');
    return `
    <div class="sk-card rv">
      <div class="sk-top">
        <div class="sk-ico" style="background:${g.color}20">${g.icon}</div>
        <div class="sk-nm">${name}</div>
      </div>
      <div class="sk-tags">${tags}</div>
    </div>`;
  }).join('');
  observe();
}

// ── PROJECT FILTERS ──
function renderFilters() {
  const container = document.getElementById('proj-filters');
  if (!container) return;
  container.innerHTML = FILTERS.map(f => {
    const label = lang === 'fr' ? f.labelFr : f.labelEn;
    return `<button class="proj-filter-btn${f.id === activeFilter ? ' active' : ''}" onclick="setFilter('${f.id}')">${label}</button>`;
  }).join('');
}
function setFilter(id) {
  activeFilter = id;
  projExpanded = false;
  renderFilters();
  renderProjects();
}

// ── PROJECTS GRID ──
function renderProjects() {
  const filter = FILTERS.find(f => f.id === activeFilter) || FILTERS[0];
  const visible = PROJECTS.filter(p => stackMatchesFilter(p.stack, filter));
  document.getElementById('proj-g').innerHTML = visible.map((p, i) => {
    const c = CATS[p.category] || CATS.other;
    const title = lang === 'fr' ? p.titleFr : p.titleEn;
    const desc  = lang === 'fr' ? p.descFr  : p.descEn;
    const imgBlock = p.blocks && p.blocks.find(b => b.type === 'image');
    const thumb = p.thumb || (imgBlock && imgBlock.src) || null;
    const media = thumb
      ? `<img class="proj-thumb-img" src="${thumb}" alt="${title}" loading="lazy"/>`
      : `<div class="proj-thumb-ph">${c.icon}</div>`;
    const wipBadge = p.wip
      ? `<span class="wip-badge"><span class="wip-dot"></span><span class="fr">En cours</span><span class="en">In progress</span></span>`
      : '';
    const s = (typeof SOURCES !== 'undefined' && SOURCES[p.source]) ? SOURCES[p.source] : null;
    const sourceBadge = s
      ? `<span class="source-badge" style="color:${s.color};background:${s.bg}"><span class="fr">${s.fr}</span><span class="en">${s.en}</span></span>`
      : '';
    const repo = (p.link && p.link.includes('github.com')) ? p.link : null;
    const repoLink = repo
      ? `<a class="proj-gh" href="${repo}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="GitHub">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          Code
        </a>`
      : '';
    return `
      <div class="proj-card rv" style="transition-delay:${i * .05}s" onclick="openProject('${p.id}')">
        ${media}
        <div class="proj-body">
          <div class="proj-card-top">
            <div class="proj-tag" style="color:${c.color};background:${c.bg};border-color:${c.color}30">${c[lang]}</div>
            ${sourceBadge}
          </div>
          <div class="proj-title">${title}</div>
          <div class="proj-desc-wrap" onclick="event.stopPropagation()">
            <div class="proj-desc collapsed" id="desc-${p.id}">${desc}</div>
            <button class="proj-desc-toggle" onclick="toggleDesc('${p.id}',this)">▼</button>
          </div>
          <div class="proj-stack">${(p.stack||[]).map(t=>`<span class="sb">${t}</span>`).join('')}</div>
          ${wipBadge}
          <div class="proj-foot">
            <div class="proj-more"><span class="fr">Voir le projet</span><span class="en">View project</span> &rarr;</div>
            ${repoLink}
          </div>
        </div>
      </div>`;
  }).join('');
  observe();
  // Masque les projets au-delà du 6ème
  applyProjectsLimit();
}

let projExpanded = false;
function applyProjectsLimit() {
  const isMobile = window.innerWidth <= 900;
  const limit = isMobile ? 3 : 6;
  const cards = document.querySelectorAll('#proj-g .proj-card');
  cards.forEach((c, i) => {
    c.style.display = (projExpanded || i < limit) ? '' : 'none';
  });
  const btn = document.getElementById('proj-more-btn');
  if (btn) {
    btn.style.display = cards.length > 6 ? 'flex' : 'none';
    const arrow = btn.querySelector('.proj-more-arrow');
    const label = btn.querySelector('.proj-more-label');
    if (arrow) arrow.style.transform = projExpanded ? 'rotate(180deg)' : '';
    if (label) {
      label.querySelector('.fr').textContent = projExpanded ? 'Voir moins' : 'Voir tous les projets (' + cards.length + ')';
      label.querySelector('.en').textContent = projExpanded ? 'Show less' : 'View all projects (' + cards.length + ')';
    }
  }
}
function toggleProjects() {
  projExpanded = !projExpanded;
  applyProjectsLimit();
}

// ── BLOCKS RENDERER ──
function renderBlocks(blocks) {
  if (!blocks || !blocks.length) return `<p style="color:var(--muted)">Contenu à venir.</p>`;
  return blocks.map(b => {
    if (b.type === 'text') {
      const content = (lang === 'en' && b.contentEn) ? b.contentEn : (b.contentFr || b.content || '');
      const paras = content.split('\n\n').filter(Boolean).map(p => {
        if (p.startsWith('## ')) {
          const h = p.slice(3).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
          return `<h3 class="block-section-title">${h}</h3>`;
        }
        const html = p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        return `<p>${html}</p>`;
      }).join('');
      return `<div class="block-text">${paras}</div>`;
    }
    if (b.type === 'image') {
      const caption = (lang === 'en' && b.captionEn) ? b.captionEn : (b.captionFr || b.caption || '');
      const cls = ['block-img', b.hero && 'hero', b.size && `size-${b.size}`].filter(Boolean).join(' ');
      return `
      <div class="${cls}">
        <img src="${b.src}" alt="${caption}" onclick="openLb(this)" loading="lazy"/>
        ${caption ? `<div class="caption">${caption}</div>` : ''}
      </div>`;
    }
    if (b.type === 'video') {
      const caption = (lang === 'en' && b.captionEn) ? b.captionEn : (b.captionFr || b.caption || '');
      return `
      <div class="block-video">
        <video controls src="${b.src}" style="width:100%;border-radius:6px;display:block"></video>
        ${caption ? `<div class="caption">${caption}</div>` : ''}
      </div>`;
    }
    if (b.type === 'gallery') {
      const caption = (lang === 'en' && b.captionEn) ? b.captionEn : (b.captionFr || b.caption || '');
      const cols = b.columns || 'auto';
      const gridStyle = cols === 2 ? 'grid-template-columns:1fr 1fr' : '';
      const cls = b.autoHeight ? 'block-gallery auto-height' : 'block-gallery';
      return `
      <div class="${cls}" style="${gridStyle}">
        ${(b.images||[]).map(src=>`<img src="${src}" alt="" onclick="openLb(this)" loading="lazy"/>`).join('')}
      </div>
      ${caption ? `<div class="caption" style="font-size:.78rem;color:var(--muted);margin-top:.5rem;text-align:center;font-style:italic">${caption}</div>` : ''}`;
    }
    if (b.type === 'video-duo') {
      return `<div class="block-video-duo">
        ${(b.videos||[]).map(v => {
          const cap = (lang==='en' && v.captionEn) ? v.captionEn : (v.captionFr||'');
          return `<div class="block-video-duo-item">
            <video controls src="${v.src}" style="width:100%;border-radius:6px;display:block"></video>
            ${cap ? `<div class="caption">${cap}</div>` : ''}
          </div>`;
        }).join('')}
      </div>`;
    }
    if (b.type === 'code') {
      const title = (lang === 'en' && b.titleEn) ? b.titleEn : (b.titleFr || 'Code');
      const id = 'code-' + Math.random().toString(36).substr(2,6);
      const escaped = b.content.replace(/</g,'&lt;').replace(/>/g,'&gt;');
      return `
      <div class="block-code">
        <button class="code-toggle" onclick="this.classList.toggle('open');document.getElementById('${id}').classList.toggle('open')">
          ${title} <span class="code-arrow">▶</span>
        </button>
        <div class="code-body" id="${id}">
          <pre><code>${escaped}</code></pre>
        </div>
      </div>`;
    }
    return '';
  }).join('');
}

// ── OPEN / CLOSE PROJECT ──
function openProject(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  scrollPos = window.scrollY;
  currentProjectId = id;
  const c = CATS[p.category] || CATS.other;
  const title = lang === 'fr' ? p.titleFr : p.titleEn;
  document.getElementById('detail-content').innerHTML = `
    <div class="detail-tag" style="color:${c.color};background:${c.bg};border-color:${c.color}30">${c[lang]}</div>
    <h1 class="detail-title">${title}</h1>
    <div class="detail-stack">${(p.stack||[]).map(t=>`<span class="sb" style="font-size:.78rem;padding:.25rem .7rem">${t}</span>`).join('')}</div>
    ${(() => {
      const blocks = p.blocks || [];
      const last = blocks[blocks.length - 1];
      const isCredits = last && last.type === 'text' && (last.contentFr || last.content || '').includes('Cr');
      if (isCredits) {
        return renderBlocks(blocks.slice(0, -1));
      }
      return renderBlocks(blocks);
    })()}
    ${p.link ? buildLink(p.link) : ''}
    ${(() => {
      const blocks = p.blocks || [];
      const last = blocks[blocks.length - 1];
      const isCredits = last && last.type === 'text' && (last.contentFr || last.content || '').includes('Cr');
      if (isCredits) return renderBlocks([last]);
      return '';
    })()}
  `;
  document.getElementById('view-home').style.display = 'none';
  document.getElementById('view-project').style.display = 'block';
  window.scrollTo({ top:0, behavior:'smooth' });
  applyLang();
}

function showHome() {
  const wasOnProject = document.getElementById('view-project').style.display !== 'none';
  currentProjectId = null;
  document.getElementById('view-project').style.display = 'none';
  document.getElementById('view-home').style.display = 'block';
  applyLang();
  if (wasOnProject) {
    setTimeout(() => window.scrollTo({ top:scrollPos, behavior:'instant' }), 10);
  } else {
    window.scrollTo({ top:0, behavior:'smooth' });
  }
}

// ── LIGHTBOX ──
function openLb(img) {
  document.getElementById('lb-img').src = img.src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── LANG ──
function setLang(l) {
  lang = l;
  applyLang();
  renderProjects();
  renderSkills();
  renderFilters();
  if (currentProjectId) openProject(currentProjectId);
}
function applyLang() {
  document.body.className = 'lang-' + lang;
  document.querySelectorAll('.lang-sw button').forEach(b => b.classList.toggle('on', b.dataset.l === lang));
}

// ── CONTACT FORM ──
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg'), btn = this.querySelector('.btn-send');
  btn.disabled = true;
  msg.style.color = 'rgba(255,255,255,.5)';
  msg.textContent = lang === 'fr' ? 'Envoi…' : 'Sending…';
  try {
    const r = await fetch(this.action, { method:'POST', body:new FormData(this), headers:{'Accept':'application/json'} });
    if (r.ok) { msg.style.color='#4ade80'; msg.textContent = lang==='fr' ? '✓ Message envoyé !' : '✓ Sent!'; this.reset(); }
    else throw new Error();
  } catch {
    msg.style.color = '#f87171';
    msg.textContent = lang === 'fr' ? '✗ Erreur, réessayez.' : '✗ Error.';
  }
  btn.disabled = false;
});

// ── CLOSE MOBILE MENU ON RESIZE ──
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    navOpen = false;
    // Remet le CSS par défaut (la nav ul est visible via CSS sur desktop)
    document.getElementById('nav-ul').removeAttribute('style');
  }
});

// ── SCROLL REVEAL ──
function observe() {
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold:.08 });
  document.querySelectorAll('.rv:not(.on)').forEach(el => io.observe(el));
}

// ── NAV MOBILE ──
let navOpen = false;
function toggleNav() {
  navOpen = !navOpen;
  const ul = document.getElementById('nav-ul');
  Object.assign(ul.style, navOpen
    ? { display:'flex', flexDirection:'column', position:'fixed', top:'60px', left:0, right:0, background:document.documentElement.classList.contains('dark')?'#141620':'white', padding:'1rem 1.5rem', borderBottom:'1px solid var(--border)', zIndex:399, gap:'.8rem' }
    : { display:'none' });
}

// ── DARK MODE ──
function toggleDark() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.querySelector('.dark-toggle').textContent = isDark ? '☀️' : '🌙';
  // Met à jour le fond du menu mobile si ouvert
  if (navOpen) {
    document.getElementById('nav-ul').style.background = isDark ? '#141620' : 'white';
  }
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
    const btn = document.querySelector('.dark-toggle');
    if (btn) btn.textContent = '☀️';
  }
  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.toggle('dark', e.matches);
      const btn = document.querySelector('.dark-toggle');
      if (btn) btn.textContent = e.matches ? '☀️' : '🌙';
    }
  });
}

// ── BUILD LINK ──
function buildLink(url) {
  const isYT = url.includes('youtube') || url.includes('youtu.be');
  const isHF = url.includes('huggingface.co');
  const isWiki = url.includes('wiki') || url.includes('fablab') || url.includes('BookStack');
  const isDemo = url.includes('demo.matthieu-vinet.fr');
  const style = 'display:inline-flex;align-items:center;gap:.6rem;background:var(--red-f);border:1.5px solid rgba(232,25,44,.22);color:var(--red);padding:.65rem 1.3rem;border-radius:4px;font-weight:600;text-decoration:none;font-size:.88rem;margin-top:2rem;';
  if (isWiki) {
    return `<a href="${url}" target="_blank" class="detail-link">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/></svg>
      <span class="fr">Voir le projet sur le Wiki</span><span class="en">View project on the Wiki</span>
    </a>`;
  }
  if (isHF) {
    return `<a href="${url}" target="_blank" class="detail-link hf-link">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><text y="18" font-size="18">🤗</text></svg>
      <span class="fr">Voir la documentation Hugging Face</span><span class="en">View Hugging Face documentation</span>
    </a>`;
  }
  if (isYT) {
    return `<a href="${url}" target="_blank" class="detail-link yt-link">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
      <span class="fr">Voir la vid&#233;o d&#8217;inspiration</span><span class="en">Watch the inspiration video</span>
    </a>`;
  }
  if (isDemo) {
    return `<a href="${url}" target="_blank" rel="noopener" class="detail-link" style="${style}">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      <span class="fr">Voir la démo en ligne</span><span class="en">View live demo</span>
    </a>`;
  }
  return `<a href="${url}" target="_blank" class="detail-link" style="${style}">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
    <span class="fr">Voir le code sur GitHub</span><span class="en">View code on GitHub</span>
  </a>`;
}

// ── EXPÉRIENCES : voir plus / voir moins ──
function toggleExp(btn) {
  const wrap = document.getElementById('exp-extra');
  if (!wrap) return;
  const open = !wrap.classList.toggle('collapsed');
  const arrow = btn.querySelector('.exp-arrow');
  if (arrow) arrow.style.transform = open ? 'rotate(180deg)' : '';
  btn.querySelector('.fr').textContent = open ? "Voir moins d'expériences" : "Voir plus d'expériences";
  btn.querySelector('.en').textContent = open ? 'Show less experience' : 'Show more experience';
}

// ── CV DOWNLOAD (langue active) ──
function goCV(e) {
  const a = e.currentTarget;
  a.href = lang === 'en' ? 'cv-matthieu-vinet-en.pdf' : 'cv-matthieu-vinet-fr.pdf';
  return true;
}

// ── TOGGLE PROJECT DESC ──
function toggleDesc(id, btn) {
  const el = document.getElementById('desc-' + id);
  if (!el) return;
  el.classList.toggle('collapsed');
  btn.classList.toggle('open');
}

// ── INIT ──
initTheme();
applyLang();
renderFilters();
renderSkills();
renderProjects();
observe();
