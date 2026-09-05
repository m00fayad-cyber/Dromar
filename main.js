/* =========================================================
   Dr. Omar Farouk — Premium Dental Portfolio
   Main JavaScript
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
  }

  hamburger.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- Smooth scroll for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerHeight = header.offsetHeight;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---------- Before / After sliders ---------- */
  var sliders = document.querySelectorAll('[data-ba-slider]');

  sliders.forEach(function (sliderRoot) {
    var frame = sliderRoot.querySelector('.ba-frame');
    var before = sliderRoot.querySelector('.ba-before');
    var handle = sliderRoot.querySelector('.ba-handle');
    var dragging = false;

    function setPosition(percent) {
      percent = Math.max(0, Math.min(100, percent));
      before.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
      handle.style.left = percent + '%';
      handle.setAttribute('aria-valuenow', Math.round(percent));
    }

    function percentFromClientX(clientX) {
      var rect = frame.getBoundingClientRect();
      var x = clientX - rect.left;
      return (x / rect.width) * 100;
    }

    function handleMove(clientX) {
      setPosition(percentFromClientX(clientX));
    }

    frame.addEventListener('pointerdown', function (e) {
      dragging = true;
      frame.setPointerCapture && frame.setPointerCapture(e.pointerId);
      handleMove(e.clientX);
    });

    frame.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      handleMove(e.clientX);
    });

    frame.addEventListener('pointerup', function () { dragging = false; });
    frame.addEventListener('pointerleave', function () { dragging = false; });
    frame.addEventListener('pointercancel', function () { dragging = false; });

    /* Keyboard accessibility */
    handle.addEventListener('keydown', function (e) {
      var current = parseFloat(handle.style.left) || 50;
      if (e.key === 'ArrowLeft') { setPosition(current - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPosition(current + 5); e.preventDefault(); }
    });

    /* init */
    setPosition(50);
  });

  /* ---------- Portfolio filters ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var caseCards = document.querySelectorAll('.case-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      var filter = btn.getAttribute('data-filter');

      caseCards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        var show = filter === 'all' || category === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxContent = document.getElementById('lightboxContent');
  var lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('[data-lightbox-trigger]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.case-card');
      var clone = card.querySelector('.ba-slider').cloneNode(true);
      var info = card.querySelector('.case-info').cloneNode(true);
      var expandBtn = info.querySelector('.case-expand');
      if (expandBtn) expandBtn.remove();

      lightboxContent.innerHTML = '';
      lightboxContent.appendChild(clone);
      lightboxContent.appendChild(info);

      /* re-init slider inside lightbox clone */
      var frame = clone.querySelector('.ba-frame');
      var beforeImg = clone.querySelector('.ba-before');
      var handle = clone.querySelector('.ba-handle');
      var dragging = false;

      function setPos(percent) {
        percent = Math.max(0, Math.min(100, percent));
        beforeImg.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
        handle.style.left = percent + '%';
      }
      function moveFromX(clientX) {
        var rect = frame.getBoundingClientRect();
        var x = clientX - rect.left;
        setPos((x / rect.width) * 100);
      }
      frame.addEventListener('pointerdown', function (e) { dragging = true; moveFromX(e.clientX); });
      frame.addEventListener('pointermove', function (e) { if (dragging) moveFromX(e.clientX); });
      frame.addEventListener('pointerup', function () { dragging = false; });
      frame.addEventListener('pointerleave', function () { dragging = false; });
      setPos(50);

      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });

  /* ---------- Appointment form ---------- */
  var form = document.getElementById('appointmentForm');
  var submitBtn = document.getElementById('appointmentSubmit');

  var validators = {
    fullName: function (v) { return v.trim().length >= 2; },
    phoneNumber: function (v) { return /^[+\d][\d\s()-]{6,}$/.test(v.trim()); },
    service: function (v) { return v.trim().length > 0; },
    visitDate: function (v) { return v.trim().length > 0; }
  };

  function validateField(name) {
    var field = form.elements[name];
    var row = field.closest('.form-row');
    var isValid = validators[name](field.value);
    row.classList.toggle('has-error', !isValid);
    return isValid;
  }

  Object.keys(validators).forEach(function (name) {
    var field = form.elements[name];
    field.addEventListener('blur', function () { validateField(name); });
    field.addEventListener('input', function () {
      if (field.closest('.form-row').classList.contains('has-error')) {
        validateField(name);
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var allValid = true;
    Object.keys(validators).forEach(function (name) {
      if (!validateField(name)) allValid = false;
    });

    if (!allValid) {
      var firstError = form.querySelector('.form-row.has-error input, .form-row.has-error select');
      if (firstError) firstError.focus();
      return;
    }

    form.classList.add('is-loading');
    submitBtn.disabled = true;

    /* Simulated submission — demo project, no backend */
    setTimeout(function () {
      form.classList.remove('is-loading');
      form.classList.add('is-success');
      submitBtn.disabled = false;
    }, 1100);
  });

})();
