/**
 * slider.js — HN College of Management, Solapur
 * Initialises the hero image slider and the Latest Events carousel.
 * Runs after the 'componentsReady' event fired by loader.js.
 */

'use strict';

document.addEventListener('componentsReady', function () {

    /* ═══════════════════════════════════════════
       1. HERO IMAGE SLIDER
    ═══════════════════════════════════════════ */
    (function () {
        var wrapper = document.getElementById('slidesWrapper');
        var dotsEl = document.getElementById('sliderDots');
        var prevBtn = document.getElementById('sliderPrev');
        var nextBtn = document.getElementById('sliderNext');

        if (!wrapper || !dotsEl) return;

        var slides = wrapper.querySelectorAll('.slide');
        var total = slides.length;
        var current = 0;
        var autoTimer = null;
        var INTERVAL = 4000;

        /* Build dot indicators */
        slides.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.className = 'slider-dot' + (i === 0 ? ' slider-dot--active' : '');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', 'Slide ' + (i + 1));
            dot.addEventListener('click', function () { goTo(i); resetTimer(); });
            dotsEl.appendChild(dot);
        });

        /* Navigate to a slide */
        function goTo(index) {
            current = (index + total) % total;
            wrapper.style.transform = 'translateX(-' + (current * 100) + '%)';

            var dots = dotsEl.querySelectorAll('.slider-dot');
            dots.forEach(function (d, i) {
                d.classList.toggle('slider-dot--active', i === current);
            });

            slides.forEach(function (slide, i) {
                slide.classList.toggle('slide--active', i === current);
            });
        }

        /* Arrow controls */
        prevBtn.addEventListener('click', function () { goTo(current - 1); resetTimer(); });
        nextBtn.addEventListener('click', function () { goTo(current + 1); resetTimer(); });

        /* Keyboard support */
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') { goTo(current - 1); resetTimer(); }
            if (e.key === 'ArrowRight') { goTo(current + 1); resetTimer(); }
        });

        /* Touch / swipe */
        var touchStartX = 0;
        wrapper.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        wrapper.addEventListener('touchend', function (e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetTimer(); }
        });

        /* Auto-advance */
        function startTimer() {
            autoTimer = setInterval(function () { goTo(current + 1); }, INTERVAL);
        }
        function resetTimer() {
            clearInterval(autoTimer);
            startTimer();
        }

        /* Pause on hover */
        var sliderEl = document.getElementById('slider');
        if (sliderEl) {
            sliderEl.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
            sliderEl.addEventListener('mouseleave', startTimer);
        }

        goTo(0);
        startTimer();
    }());


    /* ═══════════════════════════════════════════
       2. LATEST EVENTS CAROUSEL
    ═══════════════════════════════════════════ */
    (function () {
        var track = document.getElementById('leventsTrack');
        var dotsWrap = document.getElementById('leventsDots');
        var prevBtn = document.getElementById('leventsPrev');
        var nextBtn = document.getElementById('leventsNext');
        var carousel = document.getElementById('leventsCarousel');

        if (!track || !dotsWrap || !prevBtn || !nextBtn) return;

        var INTERVAL = 3000;
        var GAP_PX = 24;     /* matches gap: 24px on .levents-track in events.css */
        var MOBILE_BP = 640;
        var TABLET_BP = 1199;
        var DESKTOP_BP = 1200;

        /* Gather original cards */
        var origCards = Array.prototype.slice.call(track.children);
        var totalOrig = origCards.length;

        /* Clone cards for infinite looping */
        origCards.forEach(function (card) {
            var clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        });
        origCards.forEach(function (card) {
            var clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.insertBefore(clone, track.firstChild);
        });

        var allCards = Array.prototype.slice.call(track.children);
        var current = totalOrig;
        var autoTimer = null;
        var isTransitioning = false;

        function perView() {
            if (window.innerWidth >= DESKTOP_BP) return 3;
            if (window.innerWidth > MOBILE_BP) return 2;
            return 1;
        }

        function getCardWidth() {
            var pv = perView();
            /* getBoundingClientRect gives the exact rendered width including
               fractional pixels — far more reliable than offsetWidth */
            var trackW = Math.floor(track.parentElement.getBoundingClientRect().width);
            return Math.floor((trackW - GAP_PX * (pv - 1)) / pv);
        }

        function getOffset(index) {
            return index * (getCardWidth() + GAP_PX);
        }

        function moveTo(index, animate) {
            track.style.transition = animate === false
                ? 'none'
                : 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)';
            track.style.transform = 'translateX(-' + getOffset(index) + 'px)';
        }

        /* Infinite loop jump after transition */
        track.addEventListener('transitionend', function () {
            isTransitioning = false;
            if (current >= totalOrig * 2) { current = totalOrig; moveTo(current, false); }
            if (current < totalOrig) { current = totalOrig * 2 - 1; moveTo(current, false); }
            updateDots();
        });

        /* Build dots */
        for (var d = 0; d < totalOrig; d++) {
            (function (idx) {
                var dot = document.createElement('button');
                dot.className = 'levents-dot' + (idx === 0 ? ' levents-dot--active' : '');
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', 'Event slide ' + (idx + 1));
                dot.addEventListener('click', function () {
                    if (isTransitioning) return;
                    current = totalOrig + idx;
                    moveTo(current, true);
                    updateDots();
                    resetTimer();
                });
                dotsWrap.appendChild(dot);
            }(d));
        }

        function updateDots() {
            var realIdx = (current - totalOrig + totalOrig) % totalOrig;
            var dots = dotsWrap.querySelectorAll('.levents-dot');
            dots.forEach(function (dot, i) {
                dot.classList.toggle('levents-dot--active', i === realIdx);
            });
        }

        function advance(dir) {
            if (isTransitioning) return;
            isTransitioning = true;
            current += dir;
            moveTo(current, true);
            updateDots();
        }

        prevBtn.addEventListener('click', function () { advance(-1); resetTimer(); });
        nextBtn.addEventListener('click', function () { advance(1); resetTimer(); });

        function startTimer() {
            autoTimer = setInterval(function () { advance(1); }, INTERVAL);
        }
        function resetTimer() {
            clearInterval(autoTimer);
            startTimer();
        }

        carousel.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
        carousel.addEventListener('mouseleave', startTimer);

        /* Touch / swipe */
        var touchStartX = 0;
        track.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        track.addEventListener('touchend', function (e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) { advance(diff > 0 ? 1 : -1); resetTimer(); }
        });

        /* Resize handling */
        var resizeTimer;

        function setSizes() {
            var pv = perView();
            /* getBoundingClientRect gives exact rendered float width.
               CSS gap:14px adds space BETWEEN cards only (not after last),
               so: visible fill = N*cardW + (N-1)*14 <= trackW. No bleed. */
            var trackW = Math.floor(track.parentElement.getBoundingClientRect().width);
            var cardW = Math.floor((trackW - GAP_PX * (pv - 1)) / pv);

            allCards.forEach(function (card) {
                card.style.flex = '0 0 ' + cardW + 'px';
                card.style.width = cardW + 'px';
                card.style.marginRight = ''; /* clear any leftover value */
            });
            moveTo(current, false);
        }

        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setSizes, 120);
        });

        setSizes();
        updateDots();
        startTimer();
    }());

}); /* end componentsReady */
