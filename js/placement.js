/**
 * placement.js — HN College of Management, Solapur
 * Animated stat counters + fade image slider for the
 * Training & Placement Overview section.
 * Initialised after 'componentsReady' fires from loader.js.
 */

'use strict';

document.addEventListener('componentsReady', function () {

    /* ═══════════════════════════════════════════════════
       1. ANIMATED STAT COUNTERS
       Each .placement-stat__number carries:
         data-target  — final numeric value
         data-suffix  — text appended after the number ("+", " LPA", etc.)
       Counters animate 0 → target in 1.5 s via rAF,
       triggered once by IntersectionObserver.
    ═══════════════════════════════════════════════════ */
    (function () {
        var statsSection = document.getElementById('placementStats');
        if (!statsSection) return;

        var DURATION = 1500; /* ms */
        var animated = false;

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function animateCounter(el, target, suffix) {
            var start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                var elapsed = timestamp - start;
                var progress = Math.min(elapsed / DURATION, 1);
                var eased = easeOutQuart(progress);
                var value = Math.floor(eased * target);

                el.textContent = value + suffix;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target + suffix; /* ensure exact final value */
                }
            }

            requestAnimationFrame(step);
        }

        function startAll() {
            if (animated) return;
            animated = true;

            var counters = statsSection.querySelectorAll('[data-target]');
            counters.forEach(function (el) {
                var target = parseInt(el.getAttribute('data-target'), 10);
                var suffix = el.getAttribute('data-suffix') || '';
                animateCounter(el, target, suffix);
            });
        }

        /* Trigger once when stats row enters the viewport */
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        startAll();
                        observer.disconnect(); /* fire only once */
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(statsSection);
        } else {
            /* Fallback for old browsers — run immediately */
            startAll();
        }
    }());


    /* ═══════════════════════════════════════════════════
       2. PLACEMENT FADE SLIDER
       Cycles through .placement-slide elements by
       toggling .placement-slide--active (CSS handles
       the opacity transition). No arrows, no dots.
    ═══════════════════════════════════════════════════ */
    (function () {
        var slider = document.getElementById('placementSlider');
        if (!slider) return;

        var slides = slider.querySelectorAll('.placement-slide');
        var total = slides.length;
        var current = 0;
        var INTERVAL = 3000; /* ms between auto-advance */

        if (total < 2) return; /* nothing to cycle */

        function showSlide(index) {
            slides[current].classList.remove('placement-slide--active');
            current = (index + total) % total;
            slides[current].classList.add('placement-slide--active');
        }

        /* Auto-advance */
        var timer = setInterval(function () {
            showSlide(current + 1);
        }, INTERVAL);

        /* Pause on hover for accessibility */
        slider.addEventListener('mouseenter', function () {
            clearInterval(timer);
        });
        slider.addEventListener('mouseleave', function () {
            timer = setInterval(function () {
                showSlide(current + 1);
            }, INTERVAL);
        });
    }());

}); /* end componentsReady */
