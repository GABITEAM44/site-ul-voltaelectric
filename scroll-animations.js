(function () {
  'use strict';

  /* ============================================================
     scroll-animations.js — Volta Electric
     5 tipuri de animatie per element, aplicate automat.
     Inspirat din metodologia EUROELECTRIC (Ghid v1.0 · 2026)
     ============================================================ */

  var style = document.createElement('style');
  style.textContent = [
    /* ── Baza: fadeUp ── */
    '.sa {',
      'opacity:0; transform:translateY(28px);',
      'transition:opacity .6s ease, transform .6s ease;',
      'will-change:opacity,transform;',
    '}',
    '.sa.sa-visible { opacity:1; transform:translateY(0); }',

    /* ── Slide stanga ── */
    '.sa-left  { transform:translateX(-44px) translateY(0); }',
    '.sa-left.sa-visible  { transform:translateX(0); }',

    /* ── Slide dreapta ── */
    '.sa-right { transform:translateX(44px) translateY(0); }',
    '.sa-right.sa-visible { transform:translateX(0); }',

    /* ── Scale pop (zoom usor + fadeIn) ── */
    '.sa-scale { transform:scale(.88) translateY(0); opacity:0; }',
    '.sa-scale.sa-visible { transform:scale(1); opacity:1; transition:opacity .5s ease, transform .5s cubic-bezier(.34,1.36,.64,1); }',

    /* ── Zoom subtil (pentru carduri produs) ── */
    '.sa-zoom { transform:scale(.94); opacity:0; }',
    '.sa-zoom.sa-visible { transform:scale(1); opacity:1; }',

    /* ── Delays cascada ── */
    '.sa-d1 { transition-delay:.07s; }',
    '.sa-d2 { transition-delay:.14s; }',
    '.sa-d3 { transition-delay:.21s; }',
    '.sa-d4 { transition-delay:.28s; }',
    '.sa-d5 { transition-delay:.35s; }',
    '.sa-d6 { transition-delay:.42s; }',

    /* ── prefers-reduced-motion ── */
    '@media (prefers-reduced-motion:reduce) {',
      '.sa,.sa-left,.sa-right,.sa-scale,.sa-zoom {',
        'opacity:1!important; transform:none!important; transition:none!important;',
      '}',
    '}'
  ].join('');
  document.head.appendChild(style);

  /* ============================================================
     REGULI per tip de element
     Fiecare regula: { selector, anim, cascade }
     anim: 'up' | 'left' | 'right' | 'scale' | 'zoom'
     cascade: true = delay automat pe frati
     ============================================================ */
  var RULES = [

    /* Titluri sectiuni — fadeUp simplu */
    { sel:'.section-title',     anim:'up',    cascade:false },
    { sel:'.section-label',     anim:'up',    cascade:false },
    { sel:'.page-hero h1',      anim:'up',    cascade:false },
    { sel:'.article-hero h1',   anim:'up',    cascade:false },
    { sel:'.cat-section-title', anim:'up',    cascade:false },

    /* Carduri Why (De ce Volta) — slide din stanga */
    { sel:'.why-card',          anim:'left',  cascade:true  },

    /* Carduri informatii contact — alternant */
    { sel:'.info-card',         anim:'left',  cascade:true  },

    /* Stats — scale pop cu delay secvential */
    { sel:'.stat-card',         anim:'scale', cascade:true  },
    { sel:'.stat-num',          anim:'scale', cascade:true  },

    /* Carduri produs — zoom subtil */
    { sel:'.product-card',      anim:'zoom',  cascade:true  },

    /* Carduri proiect — alternant stanga/dreapta */
    { sel:'.project-card',      anim:'zigzag',cascade:true  },

    /* Branduri chips — scale pop cu cascada */
    { sel:'.brand-chip',        anim:'scale', cascade:true  },

    /* Sectiuni brand (branduri.html) — slide alternant */
    { sel:'.brand-section',     anim:'up',    cascade:false },

    /* Blog */
    { sel:'.article-featured',  anim:'up',    cascade:false },
    { sel:'.article-card',      anim:'zoom',  cascade:true  },

    /* FAQ */
    { sel:'.faq-item',          anim:'up',    cascade:true  },

    /* Calculator */
    { sel:'.type-card',         anim:'scale', cascade:true  },
    { sel:'.step-card',         anim:'up',    cascade:true  },

    /* Testimoniale */
    { sel:'.testimonial-card',  anim:'scale', cascade:true  },

    /* Sidebar */
    { sel:'.sidebar-card',      anim:'up',    cascade:true  },

    /* CTA sectiuni */
    { sel:'.cta-section',       anim:'up',    cascade:false },
    { sel:'.cta-banner',        anim:'up',    cascade:false },

    /* Hero-cards (homepage) */
    { sel:'.hero-card',         anim:'right', cascade:true  },

    /* Cat-cards (categorii) */
    { sel:'.cat-card',          anim:'zoom',  cascade:true  },

    /* Client chips */
    { sel:'.client-chip',       anim:'scale', cascade:true  },

    /* Mission cards */
    { sel:'.mission-card',      anim:'left',  cascade:true  },
  ];

  var seen = new WeakSet(); /* evita dubla aplicare */

  function animClass(anim, idx) {
    if (anim === 'left')   return 'sa sa-left';
    if (anim === 'right')  return 'sa sa-right';
    if (anim === 'scale')  return 'sa sa-scale';
    if (anim === 'zoom')   return 'sa sa-zoom';
    if (anim === 'zigzag') return idx % 2 === 0 ? 'sa sa-left' : 'sa sa-right';
    return 'sa'; /* up */
  }

  function isAboveFold(el) {
    return el.getBoundingClientRect().top < window.innerHeight - 80;
  }

  function applyRule(rule) {
    var els = document.querySelectorAll(rule.sel);
    /* Grupeaza per parinte pentru cascada */
    var parentMap = {};
    els.forEach(function(el) {
      var pid = el.parentElement ? (el.parentElement._saId || (el.parentElement._saId = ++applyRule._id)) : 0;
      if (!parentMap[pid]) parentMap[pid] = [];
      parentMap[pid].push(el);
    });

    Object.values(parentMap).forEach(function(group) {
      var groupIdx = 0;
      group.forEach(function(el) {
        if (seen.has(el) || isAboveFold(el)) return;
        seen.add(el);

        var classes = animClass(rule.anim, groupIdx).split(' ');
        classes.forEach(function(c){ if(c) el.classList.add(c); });

        if (rule.cascade && groupIdx > 0 && groupIdx <= 6) {
          el.classList.add('sa-d' + Math.min(groupIdx, 6));
        }
        groupIdx++;
      });
    });
  }
  applyRule._id = 0;

  function observe() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.sa').forEach(function(el){ el.classList.add('sa-visible'); });
      return;
    }
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sa-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -36px 0px' });

    document.querySelectorAll('.sa').forEach(function(el){ io.observe(el); });
  }

  function init() {
    RULES.forEach(applyRule);
    observe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
