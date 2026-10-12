(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) setOpen(false); });
  }

  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var panels = document.querySelectorAll('.hiw');
  var timers = [];

  function showStep(panel, btn) {
    var img = panel.querySelector('.device-screen img');
    var hl = panel.querySelector('.hiw-hl');
    panel.querySelectorAll('.hiw-step').forEach(function (b) {
      if (b === btn) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
    var r = btn.dataset.hl.split(',');
    var place = function () {
      hl.style.setProperty('--t', r[0] + '%');
      hl.style.setProperty('--l', r[1] + '%');
      hl.style.setProperty('--w', r[2] + '%');
      hl.style.setProperty('--h', r[3] + '%');
    };
    if (img.getAttribute('src') === btn.dataset.shot) { place(); return; }
    img.classList.add('is-fading');
    setTimeout(function () {
      img.src = btn.dataset.shot;
      place();
      img.classList.remove('is-fading');
    }, reduceMotion ? 0 : 250);
  }

  panels.forEach(function (panel, i) {
    var steps = Array.prototype.slice.call(panel.querySelectorAll('.hiw-step'));
    steps.forEach(function (b) { var im = new Image(); im.src = b.dataset.shot; });
    var stopAuto = function () { clearInterval(timers[i]); timers[i] = null; };
    steps.forEach(function (b) {
      b.addEventListener('click', function () { stopAuto(); showStep(panel, b); });
    });
    if (!reduceMotion) {
      timers[i] = setInterval(function () {
        if (panel.hidden) return;
        var cur = steps.findIndex(function (b) { return b.hasAttribute('aria-current'); });
        showStep(panel, steps[(cur + 1) % steps.length]);
      }, 4500);
    }
  });

  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var subject = '[' + d.get('topic') + '] ' + d.get('name');
      var body =
        'Name: ' + d.get('name') + '\n' +
        'Phone: ' + (d.get('phone') || '-') + '\n' +
        'I am a: ' + d.get('role') + '\n\n' +
        d.get('message');
      window.location.href = 'mailto:' + form.dataset.to +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
