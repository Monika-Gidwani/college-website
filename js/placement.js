/**
 * placement.js — HN College of Management, Solapur
 * Animated stat counters + fade image slider for the
 * Training & Placement Overview section.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

    /* ═══════════════════════════════════════════════════
       1. ANIMATED STAT COUNTERS
       Each .placement-stat__number carries:
         data-target  — final numeric value
         data-suffix  — text appended after number ("+", " LPA", etc.)
       Counts 0 → target in 1.4 s via rAF (easeOutQuart),
       triggered once by IntersectionObserver (threshold 0.3).
    ═══════════════════════════════════════════════════ */
    (function () {
        var statsSection = document.getElementById('placementStats');
        if (!statsSection) return;

        var DURATION = 1400; /* ms */
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
                    el.textContent = target + suffix; /* guarantee exact final value */
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

        /* Trigger once when the stats block scrolls into view */
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
            startAll(); /* immediate fallback for older browsers */
        }
    }());


    /* ═══════════════════════════════════════════════════
       2. PLACEMENT FADE SLIDER
       Cycles .placement-slide elements every 4 s.
       CSS opacity transition handles the fade.
       Adds small dot indicators bottom-right.
    ═══════════════════════════════════════════════════ */
    (function () {
        var slider = document.getElementById('placementSlider');
        if (!slider) return;

        var slides = Array.prototype.slice.call(slider.querySelectorAll('.placement-slide'));
        var total = slides.length;
        var current = 0;
        var INTERVAL = 4000; /* ms between auto-advance */
        var timer;

        if (total < 2) return;

        /* ── Build dot indicators ── */
        var dotsWrap = document.createElement('div');
        dotsWrap.className = 'placement-slider-dots';
        slider.appendChild(dotsWrap);

        var dots = [];
        slides.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.className = 'placement-slider-dot' + (i === 0 ? ' placement-slider-dot--active' : '');
            dot.setAttribute('aria-label', 'Placement slide ' + (i + 1));
            dot.addEventListener('click', function () {
                showSlide(i);
                resetTimer();
            });
            dotsWrap.appendChild(dot);
            dots.push(dot);
        });

        function updateDots() {
            dots.forEach(function (d, i) {
                d.classList.toggle('placement-slider-dot--active', i === current);
            });
        }

        function showSlide(index) {
            slides[current].classList.remove('placement-slide--active');
            current = (index + total) % total;
            slides[current].classList.add('placement-slide--active');
            updateDots();
        }

        /* Auto-advance */
        function startTimer() {
            timer = setInterval(function () {
                showSlide(current + 1);
            }, INTERVAL);
        }

        function resetTimer() {
            clearInterval(timer);
            startTimer();
        }

        /* Pause on hover */
        slider.addEventListener('mouseenter', function () { clearInterval(timer); });
        slider.addEventListener('mouseleave', startTimer);

        /* Initialise */
        updateDots();
        startTimer();
    }());

}); /* end DOMContentLoaded */
