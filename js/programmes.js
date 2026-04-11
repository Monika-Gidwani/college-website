/**
 * programmes.js — HN College of Management, Solapur
 * Sidebar programme switching (MBA / BCA / BBA) +
 * MBA & BCA inner tab switching using simple .active class.
 * No fetch(), no hash writing, no scroll on tab click.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

    /* ── Prevent Chrome scroll restoration gap ── */
    try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) { }
    window.scrollTo(0, 0);

    /* ════════════════════════════════════════════════
       MBA INNER TAB SWITCHING
       Buttons:  .mba-tab-btn[data-tab]
       Sections: .tab-content[data-content]
       Active class on both: "active"
    ════════════════════════════════════════════════ */
    var mbaTabs = document.querySelectorAll('.mba-tab-btn');
    var mbaContents = document.querySelectorAll('.tab-content');

    function activateMbaTab(tabName) {
        if (!tabName) return;

        /* deactivate all buttons */
        mbaTabs.forEach(function (t) {
            t.classList.remove('active', 'mba-tab-active');
            t.setAttribute('aria-selected', 'false');
        });

        /* hide all content sections */
        mbaContents.forEach(function (c) { c.classList.remove('active'); });

        /* activate matching button */
        var btn = document.querySelector('.mba-tab-btn[data-tab="' + tabName + '"]');
        if (btn) {
            btn.classList.add('active', 'mba-tab-active');
            btn.setAttribute('aria-selected', 'true');
        }

        /* show matching content */
        var content = document.querySelector('.tab-content[data-content="' + tabName + '"]');
        if (content) content.classList.add('active');

        try { sessionStorage.setItem('progMbaTab', tabName); } catch (e) { }
    }

    /* tab button click — no hash, no scroll */
    mbaTabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            activateMbaTab(this.dataset.tab);
        });
    });

    /* ════════════════════════════════════════════════
       BCA INNER TAB SWITCHING
       Buttons:  .bca-tab-btn[data-tab]
       Sections: .bca-tab-content[data-content]
       Active class on both: "active"
    ════════════════════════════════════════════════ */
    var bcaTabs = document.querySelectorAll('.bca-tab-btn');
    var bcaContents = document.querySelectorAll('.bca-tab-content');

    function activateBcaTab(tabName) {
        if (!tabName) return;

        /* deactivate all buttons */
        bcaTabs.forEach(function (t) {
            t.classList.remove('active', 'bca-tab-active');
            t.setAttribute('aria-selected', 'false');
        });

        /* hide all content sections */
        bcaContents.forEach(function (c) { c.classList.remove('active'); });

        /* activate matching button */
        var btn = document.querySelector('.bca-tab-btn[data-tab="' + tabName + '"]');
        if (btn) {
            btn.classList.add('active', 'bca-tab-active');
            btn.setAttribute('aria-selected', 'true');
        }

        /* show matching content */
        var content = document.querySelector('.bca-tab-content[data-content="' + tabName + '"]');
        if (content) content.classList.add('active');

        try { sessionStorage.setItem('progBcaTab', tabName); } catch (e) { }
    }

    /* tab button click — no hash, no scroll */
    bcaTabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            activateBcaTab(this.dataset.tab);
        });
    });

    /* ════════════════════════════════════════════════
       SIDEBAR PROGRAMME SWITCHING  (MBA / BCA / BBA)
    ════════════════════════════════════════════════ */
    var sidebarLinks = document.querySelectorAll('.prog-sidebar__nav a[data-programme]');
    var panels = document.querySelectorAll('.prog-panel');

    if (!sidebarLinks.length || !panels.length) {
        /* at least run default tab on page load */
        activateMbaTab('hod');
        return;
    }

    /* Hash → { prog, tab } map
       Hash is READ on first load only — never written during clicks */
    var HASH_MAP = {
        'mba': { prog: 'mba', tab: 'hod' },
        'panel-mba': { prog: 'mba', tab: 'hod' },
        'mba-hods-desk': { prog: 'mba', tab: 'hod' },
        'mba-about-dept': { prog: 'mba', tab: 'about' },
        'mba-vision-mission': { prog: 'mba', tab: 'vision' },
        'mba-co-po-pso-peo': { prog: 'mba', tab: 'co' },
        'mba-faculty': { prog: 'mba', tab: 'faculty' },
        'mba-infrastructure': { prog: 'mba', tab: 'infra' },
        'mba-syllabus': { prog: 'mba', tab: 'syllabus' },
        'mba-specialisation': { prog: 'mba', tab: 'special' },
        'mba-certification': { prog: 'mba', tab: 'cert' },
        'mba-parents-meet': { prog: 'mba', tab: 'parents' },
        'bca': { prog: 'bca', tab: 'bca-about' },
        'panel-bca': { prog: 'bca', tab: 'bca-about' },
        'bca-about-dept': { prog: 'bca', tab: 'bca-about' },
        'bca-mission-focus': { prog: 'bca', tab: 'bca-mission' },
        'bca-po-pso-peo': { prog: 'bca', tab: 'bca-co' },
        'bca-faculty': { prog: 'bca', tab: 'bca-faculty' },
        'bca-activities': { prog: 'bca', tab: 'bca-activities' },
        'bca-syllabus': { prog: 'bca', tab: 'bca-syllabus' },
        'bca-specialisation': { prog: 'bca', tab: 'bca-special' },
        'bca-certification': { prog: 'bca', tab: 'bca-cert' },
        'bca-parents-meet': { prog: 'bca', tab: 'bca-parents' },
        'bba': { prog: 'bba', tab: null },
        'panel-bba': { prog: 'bba', tab: null }
    };

    function resolveHash(raw) {
        return raw ? (HASH_MAP[raw.toLowerCase()] || null) : null;
    }

    function showProgramme(progId) {
        panels.forEach(function (p) { p.classList.remove('prog-visible'); });
        var panel = document.getElementById('panel-' + progId);
        if (panel) panel.classList.add('prog-visible');

        sidebarLinks.forEach(function (link) {
            var active = link.getAttribute('data-programme') === progId;
            link.classList.toggle('prog-active', active);
            link.setAttribute('aria-current', active ? 'true' : 'false');
        });

        try { sessionStorage.setItem('progProgramme', progId); } catch (e) { }
    }

    function navigate(progId, tabName) {
        showProgramme(progId);
        if (progId === 'mba') activateMbaTab(tabName || 'hod');
        if (progId === 'bca') activateBcaTab(tabName || 'bca-about');
    }

    /* sidebar clicks */
    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var progId = link.getAttribute('data-programme');
            var savedTab = null;
            if (progId === 'mba') {
                try { savedTab = sessionStorage.getItem('progMbaTab'); } catch (e2) { }
            }
            if (progId === 'bca') {
                try { savedTab = sessionStorage.getItem('progBcaTab'); } catch (e2) { }
            }
            navigate(progId, savedTab || (progId === 'mba' ? 'hod' : progId === 'bca' ? 'bca-about' : null));
        });
    });

    /* hashchange — browser back/forward only */
    window.addEventListener('hashchange', function () {
        var resolved = resolveHash(window.location.hash.slice(1));
        if (resolved) navigate(resolved.prog, resolved.tab);
    });

    /* ── Initial page load ── */
    var fromHash = resolveHash(window.location.hash ? window.location.hash.slice(1) : '');

    if (fromHash) {
        navigate(fromHash.prog, fromHash.tab);
    } else {
        var storedProg = null, storedMbaTab = null, storedBcaTab = null;
        try {
            storedProg = sessionStorage.getItem('progProgramme');
            storedMbaTab = sessionStorage.getItem('progMbaTab');
            storedBcaTab = sessionStorage.getItem('progBcaTab');
        } catch (e) { }

        var initProg = storedProg || 'mba';
        var initTab = null;
        if (initProg === 'mba') initTab = storedMbaTab || 'hod';
        else if (initProg === 'bca') initTab = storedBcaTab || 'bca-about';
        navigate(initProg, initTab);
    }

}); /* end DOMContentLoaded */
