(function () {
  'use strict';

  /* Bara "SUNĂ ACUM" — vizibilă doar pe mobile (≤768px) */

  /* Stilurile sunt in style.css */
  function init() {
    var bar = document.createElement('div');
    bar.id = 'call-bar';
    bar.innerHTML = [
      '<a id="call-btn" href="tel:+40724702632" aria-label="Suna la Volta Electric: 0724 702 632">',
        '<svg class="call-ico" fill="none" stroke="currentColor" stroke-width="2.2"',
          ' stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"',
          ' aria-hidden="true">',
          '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07',
            ' 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3',
            'a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09',
            ' 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0',
            ' 2.81.7A2 2 0 0 1 22 16.92z"/>',
        '</svg>',
        '<span class="call-label">SUNĂ ACUM</span>',
        '<span class="call-num">0724 702 632</span>',
        '<span class="call-arrow">›</span>',
      '</a>',
    ].join('');

    document.body.appendChild(bar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
