(function () {
  'use strict';

  /* Stilurile sunt in style.css */
  function init() {
    var btn = document.createElement('button');
    btn.id = 'btt-btn';
    btn.setAttribute('aria-label', 'Înapoi sus');
    btn.setAttribute('title', 'Înapoi sus');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);

    /* Afișează după 400px scroll */
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('btt-visible');
      } else {
        btn.classList.remove('btt-visible');
      }
    }, { passive: true });

    /* Click — scroll smooth la top */
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
