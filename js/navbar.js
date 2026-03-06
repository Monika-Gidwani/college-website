/**
 * navbar.js — HN College of Management, Solapur
 * Handles: sticky scroll shadow, mobile hamburger accordion,
 * caret rotation on mobile open/close, and right-edge
 * detection to flip dropdowns that would overflow the viewport.
 *
 * Exports window.initNavbar() so it can be called by loader.js
 * after the navbar component HTML has been dynamically injected.
 */

'use strict';

/* ─────────────────────────────────────────────
   Core navbar initialisation — called once the
   navbar HTML exists in the DOM.
───────────────────────────────────────────── */
function initNavbar() {

    var nav = document.getElementById('siteNav');
    var hamburger = document.getElementById('snavHamburger');
    var menu = document.getElementById('snavMenu');

    if (!nav || !hamburger || !menu) return;

    /* ─────────────────────────────────────────────
       1. Sticky scroll shadow
    ───────────────────────────────────────────── */
    function onScroll() {
        nav.classList.toggle('nav--scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ─────────────────────────────────────────────
       2. Helpers
    ───────────────────────────────────────────── */
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function closeAll() {
        nav.querySelectorAll('.snav-item.is-open, .has-subdrop.is-open').forEach(function (el) {
            el.classList.remove('is-open');
        });
    }

    /* ─────────────────────────────────────────────
       3. Hamburger toggle
    ───────────────────────────────────────────── */
    hamburger.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('snav--open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        if (!isOpen) closeAll();
    });

    /* ─────────────────────────────────────────────
       4. Mobile accordion — top-level dropdowns
    ───────────────────────────────────────────── */
    nav.querySelectorAll('.snav-item.has-drop > .snav-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (!isMobile()) return;
            e.preventDefault();
            var item = link.parentElement;
            var wasOpen = item.classList.contains('is-open');

            /* Close all siblings at this level */
            var siblings = item.parentElement.querySelectorAll(':scope > .snav-item.has-drop');
            siblings.forEach(function (s) { s.classList.remove('is-open'); });

            if (!wasOpen) { item.classList.add('is-open'); }
        });
    });

    /* ─────────────────────────────────────────────
       5. Mobile accordion — sub-dropdowns (level 3)
    ───────────────────────────────────────────── */
    nav.querySelectorAll('.has-subdrop > .snav-drop-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (!isMobile()) return;
            e.preventDefault();
            var item = link.parentElement;
            var wasOpen = item.classList.contains('is-open');

            /* Close all siblings at this level */
            var siblings = item.parentElement.querySelectorAll(':scope > .has-subdrop');
            siblings.forEach(function (s) { s.classList.remove('is-open'); });

            if (!wasOpen) { item.classList.add('is-open'); }
        });
    });

    /* ─────────────────────────────────────────────
       6. Close on outside click (mobile)
    ───────────────────────────────────────────── */
    document.addEventListener('click', function (e) {
        if (isMobile() && !nav.contains(e.target)) {
            nav.classList.remove('snav--open');
            hamburger.setAttribute('aria-expanded', 'false');
            closeAll();
        }
    });

    /* ─────────────────────────────────────────────
       7. Desktop — right-edge overflow detection
       Adds/removes .drop-left on .snav-drop if it
       would render beyond the viewport right edge.
    ───────────────────────────────────────────── */
    function checkEdge(item) {
        if (isMobile()) return;
        var drop = item.querySelector(':scope > .snav-drop');
        if (!drop) return;

        /* Temporarily expose drop to measure it */
        drop.style.visibility = 'hidden';
        drop.style.opacity = '0';
        drop.style.transform = 'translateY(0)';
        drop.style.display = 'block';

        var rect = drop.getBoundingClientRect();
        if (rect.right > window.innerWidth - 8) {
            drop.classList.add('drop-left');
        } else {
            drop.classList.remove('drop-left');
        }

        /* Restore — CSS transition handles the rest */
        drop.style.display = '';
        drop.style.visibility = '';
        drop.style.opacity = '';
        drop.style.transform = '';
    }

    nav.querySelectorAll('.snav-item.has-drop').forEach(function (item) {
        item.addEventListener('mouseenter', function () { checkEdge(item); });
    });

    /* ─────────────────────────────────────────────
       8. Close mobile menu on window resize to desktop
    ───────────────────────────────────────────── */
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (!isMobile()) {
                nav.classList.remove('snav--open');
                hamburger.setAttribute('aria-expanded', 'false');
                closeAll();
            }
        }, 100);
    });

    /* ─────────────────────────────────────────────
       9. Active link — highlight current section
       (for single-page anchor links, e.g. index.html)
    ───────────────────────────────────────────── */
    var sections = document.querySelectorAll('[id]');
    var navLinks = nav.querySelectorAll('.snav-link[href^="#"]');

    if ('IntersectionObserver' in window && sections.length) {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = '#' + entry.target.getAttribute('id');
                    navLinks.forEach(function (l) {
                        l.classList.toggle('active', l.getAttribute('href') === id);
                    });
                }
            });
        }, { rootMargin: '-38% 0px -58% 0px', threshold: 0 });

        sections.forEach(function (s) { obs.observe(s); });
    }
}

/* Export so loader.js can call it after navbar HTML injection */
window.initNavbar = initNavbar;

/* Also run on DOMContentLoaded for pages that embed the navbar
   directly (e.g. old root-level pages still in use) */
document.addEventListener('DOMContentLoaded', function () {
    /* Only init directly if the navbar is already present
       (i.e., not being loaded dynamically by loader.js) */
    if (document.querySelector('#navbar-placeholder')) {
        /* loader.js will handle this — do nothing here */
        return;
    }
    initNavbar();
});

/* Also listen for the navbarLoaded event dispatched by loader.js */
document.addEventListener('navbarLoaded', function () {
    initNavbar();
});
