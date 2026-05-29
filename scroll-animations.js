(function () {
  'use strict';

  /* ── Stiluri CSS de bază ── */
  var style = document.createElement('style');
  style.textContent = [
    /* Elementele care vor fi animate — stare inițială: invizibil */
    '.sa {',
      'opacity: 0;',
      'transform: translateY(32px);',
      'transition: opacity .6s ease, transform .6s ease;',
      'will-change: opacity, transform;',
    '}',
    /* Stare vizibilă — adăugată de JS */
    '.sa.sa-visible {',
      'opacity: 1;',
      'transform: translateY(0);',
    '}',
    /* Variante de direcție */
    '.sa-left  { transform: translateX(-40px); }',
    '.sa-left.sa-visible  { transform: translateX(0); }',
    '.sa-right { transform: translateX(40px); }',
    '.sa-right.sa-visible { transform: translateX(0); }',
    '.sa-scale { transform: scale(.92); }',
    '.sa-scale.sa-visible { transform: scale(1); }',
    /* Întârzieri în cascadă */
    '.sa-d1 { transition-delay: .08s; }',
    '.sa-d2 { transition-delay: .16s; }',
    '.sa-d3 { transition-delay: .24s; }',
    '.sa-d4 { transition-delay: .32s; }',
    '.sa-d5 { transition-delay: .40s; }',
    '.sa-d6 { transition-delay: .48s; }',
    /* Respect prefers-reduced-motion */
    '@media (prefers-reduced-motion: reduce) {',
      '.sa { opacity: 1 !important; transform: none !important; transition: none !important; }',
    '}'
  ].join('');
  document.head.appendChild(style);

  /* ── Selectori care primesc animație automată ── */
  var AUTO_SELECTORS = [
    /* Headings de secțiune */
    '.section-title', '.page-hero h1', '.article-hero h1',
    /* Carduri */
    '.product-card', '.brand-section', '.project-card',
    '.info-card', '.why-card', '.stat-card',
    /* Blog */
    '.article-featured', '.article-card',
    /* FAQ */
    '.faq-item',
    /* Calculator pași */
    '.step-card', '.type-card',
    /* Branduri chips */
    '.brand-chip',
    /* Secțiuni generale */
    '.cta-section', '.brands', '.blog-layout',
    /* Testimoniale */
    '.testimonial-card',
    /* Sidebar cards */
    '.sidebar-card'
  ].join(', ');

  function addClasses() {
    var elements = document.querySelectorAll(AUTO_SELECTORS);
    elements.forEach(function (el, i) {
      /* Nu animăm dacă elementul e în viewport la încărcare (above the fold) */
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        /* Vizibil imediat — fără animație */
        return;
      }
      el.classList.add('sa');

      /* Cascadă automată pentru elementele din același container */
      var parent = el.parentElement;
      if (parent) {
        var siblings = Array.from(parent.children).filter(function (c) {
          return c.classList.contains('sa');
        });
        var idx = siblings.indexOf(el);
        if (idx > 0 && idx <= 5) {
          el.classList.add('sa-d' + idx);
        }
      }
    });
  }

  function observe() {
    if (!('IntersectionObserver' in window)) {
      /* Fallback: arată tot dacă browserul nu suportă */
      document.querySelectorAll('.sa').forEach(function (el) {
        el.classList.add('sa-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sa-visible');
          observer.unobserve(entry.target); /* animăm o singură dată */
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.sa').forEach(function (el) {
      observer.observe(el);
    });
  }

  function init() {
    addClasses();
    observe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
