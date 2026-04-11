/**
 * infrastructure.js — Sidebar Tab Switching for Infrastructure Page
 *
 * Same pattern as about.js / syllabus.js:
 * - Sidebar links with data-section attributes
 * - Matching content sections by ID
 * - Active class: inf-active / inf-visible
 */

(function () {
    'use strict';

    var sidebar = document.querySelector('.infra-sidebar__nav');
    if (!sidebar) return;

    var links = sidebar.querySelectorAll('a[data-section]');
    var sections = document.querySelectorAll('.infra-section');

    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(function (sec) {
            sec.classList.remove('inf-visible');
        });

        // Remove active from all links
        links.forEach(function (link) {
            link.classList.remove('inf-active');
        });

        // Show target section
        var target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('inf-visible');
        }

        // Activate matching link
        var activeLink = sidebar.querySelector('a[data-section="' + sectionId + '"]');
        if (activeLink) {
            activeLink.classList.add('inf-active');
        }
    }

    // Click handlers
    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Handle hash in URL (e.g., infrastructure.html#library)
    var hash = window.location.hash.replace('#', '');
    if (hash) {
        var validSection = document.getElementById(hash);
        if (validSection && validSection.classList.contains('infra-section')) {
            showSection(hash);
        }
    }

})();
