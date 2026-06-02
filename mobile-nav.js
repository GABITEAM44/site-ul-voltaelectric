(function () {
  'use strict';

  /* Stilurile sunt in style.css */
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
