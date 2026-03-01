/**
 * about.js — HN College of Management, Solapur
 * Sidebar navigation + section switching for the About Us page.
 * Supports hash-based deep linking: about.html#vision-mission
 * No fetch(), no page reload — pure DOM show/hide.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

    var sidebarLinks = document.querySelectorAll('.about-sidebar__nav a[data-section]');
    var sections = document.querySelectorAll('.about-section');

    if (!sidebarLinks.length || !sections.length) return;

    /* ─────────────────────────────────────────────
       HASH → SECTION-ID ALIAS MAP
       Maps any descriptive hash a navbar link might use
       to the actual section element id in the DOM.
    ───────────────────────────────────────────── */
    var HASH_MAP = {
        /* Institute Information */
        'institute-info': 'institute-information',
        'institute': 'institute-information',
        'about-institute': 'institute-information',
        'institute-information': 'institute-information',

        /* Vision and Mission */
        'vision': 'vision-mission',
        'vision-mission': 'vision-mission',
        'vision-and-mission': 'vision-mission',
        'mission': 'vision-mission',

        /* Goals and Quality Policy */
        'goals': 'goals-quality',
        'goals-quality': 'goals-quality',
        'goals-quality-policy': 'goals-quality',
        'goals-and-quality-policy': 'goals-quality',
        'quality-policy': 'goals-quality',

        /* Core Values */
        'core-values': 'core-values',
        'values': 'core-values',

        /* Governing Body */
        'governing-body': 'governing-body',
        'governing': 'governing-body',

        /* Policies */
        'policies': 'policies',
        'policy': 'policies',

        /* Principal and Secretary Desk */
        'principal-secretary': 'principal-secretary',
        'principal': 'principal-secretary',
        'secretary': 'principal-secretary',
        'desk': 'principal-secretary',
        'principal-and-secretary-desk': 'principal-secretary'
    };

    /**
     * Resolve a raw hash fragment to a valid section element id.
     * Falls back to checking whether the raw value itself is a valid id.
     */
    function resolveHash(raw) {
        if (!raw) return null;
        var key = raw.toLowerCase();
        var mapped = HASH_MAP[key] || null;
        if (!mapped && document.getElementById(raw)) mapped = raw;
        return mapped;
    }

    /* ─────────────────────────────────────────────
       1. Switch visible section
    ───────────────────────────────────────────── */
    function showSection(id) {
        /* Hide every section */
        sections.forEach(function (s) {
            s.classList.remove('ab-visible');
        });

        /* Reveal the target */
        var target = document.getElementById(id);
        if (target) {
            target.classList.add('ab-visible');
            /* On mobile, scroll content into view */
            if (window.innerWidth <= 768) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        /* Sync sidebar active highlight */
        sidebarLinks.forEach(function (link) {
            var isActive = link.getAttribute('data-section') === id;
            link.classList.toggle('ab-active', isActive);
            link.setAttribute('aria-current', isActive ? 'true' : 'false');
        });

        /* Persist so browser back/forward remembers position */
        try { sessionStorage.setItem('aboutSection', id); } catch (e) { }
    }

    /* ─────────────────────────────────────────────
       2. Sidebar click handlers
    ───────────────────────────────────────────── */
    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var id = link.getAttribute('data-section');
            /* Reflect the section in the URL hash (no page scroll) */
            try { history.replaceState(null, '', '#' + id); } catch (e) { }
            showSection(id);
        });
    });

    /* ─────────────────────────────────────────────
       3. hashchange listener
       Fires when a navbar dropdown link like
       about.html#vision-mission changes the hash
       while the page is already open.
    ───────────────────────────────────────────── */
    window.addEventListener('hashchange', function () {
        var raw = window.location.hash ? window.location.hash.slice(1) : null;
        var id = resolveHash(raw);
        if (id) showSection(id);
    });

    /* ─────────────────────────────────────────────
       4. Initial section on page load
       Priority: URL hash  →  sessionStorage  →  first item
       Hash wins so that direct links (e.g. from navbar)
       always honour the intended destination.
    ───────────────────────────────────────────── */
    var rawHash = window.location.hash ? window.location.hash.slice(1) : null;
    var hashId = resolveHash(rawHash);

    var stored = null;
    try { stored = sessionStorage.getItem('aboutSection'); } catch (e) { }

    var firstId = sidebarLinks[0] ? sidebarLinks[0].getAttribute('data-section') : null;

    var initialId = hashId || stored || firstId;

    /* Safety: if resolved id has no matching element, fall back to first */
    if (initialId && !document.getElementById(initialId)) {
        initialId = firstId;
    }

    if (initialId) showSection(initialId);

}); /* end DOMContentLoaded */
