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

    /* ── Library inner sub-nav: supports both old anchor links and new tab buttons ── */
    var libNavLinks = document.querySelectorAll('.ac-lib-subnav a[data-lib]');
    var libTabBtns = document.querySelectorAll('.ac-lib-tab[data-libtab]');
    var libPanels = document.querySelectorAll('.ac-lib-panel');

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
        'library': 'library',
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
            try { history.replaceState(null, '', '#' + id); } catch (e) { }
            showSection(id);
        });
    });

    /* ---------------------------------------------------------
       3. Library inner sub-navigation
       Supports: old .ac-lib-subnav a[data-lib] links
               + new .ac-lib-tab[data-libtab] button elements
    --------------------------------------------------------- */
    function showLibPanel(panelId) {
        /* Hide all panels (handle both class naming conventions) */
        libPanels.forEach(function (p) {
            p.classList.remove('lib-visible', 'ac-lib-visible');
        });

        /* Reveal target panel */
        var target = document.getElementById(panelId)
            || document.getElementById('libtab-' + panelId);
        if (target) {
            target.classList.add('lib-visible');
            target.classList.add('ac-lib-visible');
        }

        /* Update old anchor-style nav */
        libNavLinks.forEach(function (a) {
            var isActive = a.getAttribute('data-lib') === panelId;
            a.classList.toggle('lib-active', isActive);
            a.classList.toggle('ac-lib-active', isActive);
        });

        /* Update new tab-button nav */
        libTabBtns.forEach(function (btn) {
            var isActive = btn.getAttribute('data-libtab') === panelId;
            btn.classList.toggle('mba-tab-active', isActive);
            btn.classList.toggle('ac-lib-active', isActive);
            btn.setAttribute('aria-selected', String(isActive));
        });

        try { sessionStorage.setItem('libraryPanel', panelId); } catch (e) { }
    }

    /* Attach old anchor-link handlers */
    if (libNavLinks.length) {
        libNavLinks.forEach(function (a) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                showLibPanel(a.getAttribute('data-lib'));
            });
        });
    }

    /* Attach new tab-button handlers */
    if (libTabBtns.length) {
        libTabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                showLibPanel(btn.getAttribute('data-libtab'));
            });
        });

        /* Default library panel on page load */
        var storedPanel = null;
        try { storedPanel = sessionStorage.getItem('libraryPanel'); } catch (e) { }
        var firstTabPanel = libTabBtns[0] ? libTabBtns[0].getAttribute('data-libtab') : null;
        showLibPanel(storedPanel || firstTabPanel);
    } else if (libNavLinks.length) {
        /* Old nav fallback */
        var storedPanel2 = null;
        try { storedPanel2 = sessionStorage.getItem('libraryPanel'); } catch (e) { }
        var firstLibPanel = libNavLinks[0] ? libNavLinks[0].getAttribute('data-lib') : null;
        showLibPanel(storedPanel2 || firstLibPanel);
    }

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
