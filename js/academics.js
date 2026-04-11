/**
 * academics.js — HN College of Management, Solapur
 * Sidebar navigation + section switching for the Academics page.
 * Supports hash-based deep linking: academics.html#library
 * Library section has its own inner sub-navigation.
 * No fetch(), no page reload — pure DOM show/hide.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

    /* ── Main sidebar links ── */
    var sidebarLinks = document.querySelectorAll('.ac-sidebar__nav a[data-section]');
    var sections = document.querySelectorAll('.ac-section');

    /* ── Library inner sub-nav is no longer needed — sidebar drives it ── */

    if (!sidebarLinks.length || !sections.length) return;

    /* ---------------------------------------------------------
       HASH → SECTION-ID ALIAS MAP
    --------------------------------------------------------- */
    var HASH_MAP = {
        'academic-calendar': 'academic-calendar',
        'calendar': 'academic-calendar',
        'timetable': 'time-table',
        'time-table': 'time-table',
        'theory': 'time-table',
        'practical': 'time-table',
        'examination': 'examination',
        'exam': 'examination',
        'exams': 'examination',
        'result': 'result',
        'results': 'result',
        'library': 'library-books',
        'library-books': 'library-books',
        'library-digital': 'library-digital',
        'library-rules': 'library-rules',
        'library-timings': 'library-timings',
        'e-resources': 'e-resources',
        'eresources': 'e-resources'
    };

    function resolveHash(raw) {
        if (!raw) return null;
        var key = raw.toLowerCase();
        var mapped = HASH_MAP[key] || null;
        if (!mapped && document.getElementById(raw)) mapped = raw;
        return mapped;
    }

    /* ---------------------------------------------------------
       1. Show/hide main sections
    --------------------------------------------------------- */
    function showSection(id) {
        sections.forEach(function (s) {
            s.classList.remove('ac-visible');
        });

        var target = document.getElementById(id);
        if (target) {
            target.classList.add('ac-visible');
            if (window.innerWidth <= 768) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        sidebarLinks.forEach(function (link) {
            var isActive = link.getAttribute('data-section') === id;
            link.classList.toggle('ac-active', isActive);
            link.setAttribute('aria-current', isActive ? 'true' : 'false');
        });

        try { sessionStorage.setItem('academicsSection', id); } catch (e) { }
    }

    /* ---------------------------------------------------------
       2. Sidebar click handlers
    --------------------------------------------------------- */
    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var id = link.getAttribute('data-section');
            /* If clicking the parent 'Library' toggle, show library-books */
            if (id === 'library') id = 'library-books';
            try { history.replaceState(null, '', '#' + id); } catch (e) { }
            showSection(id);
        });
    });


    /* ---------------------------------------------------------
       4. hashchange listener
       Fires when a navbar dropdown changes the hash while the
       page is already open.
    --------------------------------------------------------- */
    window.addEventListener('hashchange', function () {
        var raw = window.location.hash ? window.location.hash.slice(1) : null;
        var id = resolveHash(raw);
        if (id) showSection(id);
    });

    /* ---------------------------------------------------------
       5. Initial section on page load
       Priority: URL hash → sessionStorage → first item
    --------------------------------------------------------- */
    var rawHash = window.location.hash ? window.location.hash.slice(1) : null;
    var hashId = resolveHash(rawHash);

    var stored = null;
    try { stored = sessionStorage.getItem('academicsSection'); } catch (e) { }

    var firstId = sidebarLinks[0] ? sidebarLinks[0].getAttribute('data-section') : null;

    var initialId = hashId || stored || firstId;

    if (initialId && !document.getElementById(initialId)) {
        initialId = firstId;
    }

    if (initialId) showSection(initialId);

}); /* end DOMContentLoaded */
