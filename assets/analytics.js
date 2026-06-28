(function () {
  var lastPieceId = '';

  function track(name, params) {
    if (typeof gtag === 'function') {
      gtag('event', name, params || {});
    }
  }

  document.addEventListener('click', function (e) {
    var t = e.target;

    // View catalogue
    if (t.closest('a[href="products.html"]')) {
      track('view_catalogue');
      return;
    }

    // Back to wall / logo (products page links to index.html)
    var toIndex = t.closest('a[href="index.html"]');
    if (toIndex) {
      var txt = (toIndex.textContent || '').toLowerCase();
      track(txt.indexOf('back') !== -1 || txt.indexOf('wall') !== -1 ? 'back_to_wall' : 'logo_click');
      return;
    }

    // Desktop nav anchors
    if (t.closest('a[href="#studio"]')) { track('nav_studio'); return; }
    if (t.closest('a[href="#contact"]')) { track('nav_contact'); return; }

    // Email
    if (t.closest('a[href^="mailto:"]')) { track('contact_email'); return; }

    // Instagram — enquiry (inside detail panel) vs footer contact link
    var ig = t.closest('a[href*="instagram.com"]');
    if (ig) {
      var igTxt = (ig.textContent || '').toLowerCase();
      // "message" (EN) or "پیام" (FA)
      var isEnquiry = igTxt.indexOf('message') !== -1 || igTxt.indexOf('پیام') !== -1;
      track(isEnquiry ? 'enquire_instagram' : 'contact_instagram', { item_id: lastPieceId });
      return;
    }

    // Piece card click — opens detail panel
    var card = t.closest('[data-id]');
    if (card) {
      lastPieceId = card.getAttribute('data-id') || '';
      track('view_piece', { item_id: lastPieceId });
      return;
    }

    // Buttons
    var btn = t.closest('button');
    if (!btn) return;
    var bTxt = (btn.textContent || '').trim();

    if (btn.closest('header')) {
      // Language toggle (mobile) — the only button in the header
      track('toggle_language');
      return;
    }
    if (bTxt.length <= 2) {
      // Close panel × button
      track('close_piece', { item_id: lastPieceId });
      return;
    }
    if (bTxt.toLowerCase().indexOf('reset') !== -1) {
      track('reset_wall');
    }
  });
})();
