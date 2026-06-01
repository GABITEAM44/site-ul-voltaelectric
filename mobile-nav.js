(function () {
  'use strict';

  var style = document.createElement('style');
  style.textContent = [
    /* Hamburger button — ascuns pe desktop */
    '.nav-hamburger {',
      'display: none;',
      'flex-direction: column;',
      'justify-content: center;',
      'align-items: center;',
      'gap: 5px;',
      'width: 40px;',
      'height: 40px;',
      'background: transparent;',
      'border: none;',
      'cursor: pointer;',
      'padding: 4px;',
      'border-radius: 8px;',
      'transition: background .2s;',
      'flex-shrink: 0;',
    '}',
    '.nav-hamburger:hover { background: rgba(245,196,0,.12); }',
    '.nav-hamburger .bar {',
      'display: block;',
      'width: 24px;',
      'height: 2.5px;',
      'background: #fff;',
      'border-radius: 2px;',
      'transition: transform .3s ease, opacity .3s ease, width .3s ease;',
      'transform-origin: center;',
    '}',
    /* Animație X când e deschis */
    '.nav-hamburger.open .bar:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }',
    '.nav-hamburger.open .bar:nth-child(2) { opacity: 0; width: 0; }',
    '.nav-hamburger.open .bar:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }',

    /* Mobile: sub 768px */
    '@media (max-width: 768px) {',
      '.nav-hamburger { display: flex; }',

      /* Nav devine dropdown */
      'header nav {',
        'position: fixed;',
        'top: 70px;',
        'left: 0; right: 0;',
        'background: #1A1A2E;',
        'flex-direction: column;',
        'align-items: stretch;',
        'gap: 0;',
        'padding: 12px 0 20px;',
        'box-shadow: 0 8px 32px rgba(0,0,0,.5);',
        'transform: translateY(-110%);',
        'opacity: 0;',
        'pointer-events: none;',
        'transition: transform .3s ease, opacity .3s ease;',
        'z-index: 99;',
      '}',
      'header nav.nav-open {',
        'transform: translateY(0);',
        'opacity: 1;',
        'pointer-events: all;',
      '}',
      'header nav a {',
        'padding: 13px 24px !important;',
        'font-size: 16px !important;',
        'border-radius: 0 !important;',
        'border-bottom: 1px solid rgba(255,255,255,.06);',
        'color: #ccc !important;',
      '}',
      'header nav a:last-child { border-bottom: none; }',
      'header nav a:hover, header nav a.active {',
        'background: rgba(245,196,0,.1) !important;',
        'color: #F5C400 !important;',
      '}',
      /* Butonul Solicită ofertă în mobil */
      'header nav a.btn-header {',
        'margin: 12px 20px 0 !important;',
        'text-align: center !important;',
        'border-radius: 10px !important;',
        'background: #F5C400 !important;',
        'color: #1A1A2E !important;',
        'border-bottom: none !important;',
        'padding: 13px 20px !important;',
      '}',
      /* Suprascrie regula display:none care există în CSS-ul paginilor */
      'header nav.nav-open a {',
        'display: block !important;',
      '}',
    '}'
  ].join('');
  document.head.appendChild(style);

  function init() {
    var header = document.querySelector('header .header-top');
    var nav = document.querySelector('header nav');
    if (!header || !nav) return;

    /* Creează butonul hamburger */
    var btn = document.createElement('button');
    btn.className = 'nav-hamburger';
    btn.setAttribute('aria-label', 'Deschide meniul');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    header.appendChild(btn);

    /* Toggle */
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = nav.classList.toggle('nav-open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Închide la click pe un link */
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('nav-open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    /* Închide la click în afara meniului */
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        nav.classList.remove('nav-open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    /* Închide la resize dacă trece de breakpoint */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        nav.classList.remove('nav-open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
