/**
 * loader.js — Component Loader for College Website
 *
 * Loads header, navbar, and footer from separate HTML files into
 * every page. Works on file:// protocol by using XMLHttpRequest
 * (synchronous) as a fallback when fetch() is unavailable or blocked.
 *
 * Usage: Each page must have these placeholder divs:
 *   <div id="header-placeholder"></div>
 *   <div id="navbar-placeholder"></div>
 *   <div id="footer-placeholder"></div>
 *
 * Then after the placeholders, call the page-specific init function:
 *   window.pageInit = function() { ... };
 */

(function () {
    'use strict';

    /**
     * Determine the base path to the components folder.
     * All pages in pages/ must reference ../components/
     */
    function getComponentPath(filename) {
        return '../components/' + filename;
    }

    /**
     * Load HTML content from a file and insert into a container element.
     * Uses XMLHttpRequest which works on file:// without CORS issues.
     */
    function loadComponent(containerId, filename, callback) {
        var container = document.getElementById(containerId);
        if (!container) {
            if (callback) callback();
            return;
        }

        var path = getComponentPath(filename);

        // Try fetch first (works in most modern browsers on file://)
        if (typeof fetch === 'function') {
            fetch(path)
                .then(function (response) {
                    if (!response.ok) throw new Error('HTTP ' + response.status);
                    return response.text();
                })
                .then(function (html) {
                    container.innerHTML = html;
                    if (callback) callback();
                })
                .catch(function () {
                    // Fallback to XHR if fetch fails on file://
                    xhrLoad(container, path, callback);
                });
        } else {
            xhrLoad(container, path, callback);
        }
    }

    /**
     * XMLHttpRequest fallback loader (works on file://)
     */
    function xhrLoad(container, path, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 0) {
                // status 0 is OK for file://
                container.innerHTML = xhr.responseText;
            }
            if (callback) callback();
        };
        xhr.onerror = function () {
            console.warn('[loader.js] Could not load component: ' + path);
            if (callback) callback();
        };
        xhr.send();
    }

    /**
     * Mark the active nav link based on the current page filename.
     * Adds class "active" to the matching nav link.
     */
    function markActiveNavLink() {
        var currentPage = window.location.pathname
            .split('/')
            .pop()                    // get filename
            .replace(/\?.*$/, '')     // strip query
            .replace(/#.*$/, '');     // strip hash

        if (!currentPage || currentPage === '') currentPage = 'index.html';

        // Map of page filename → data-page attribute value used in navbar.html
        var pageMap = {
            'index.html': 'index',
            'about.html': 'about',
            'programmes.html': 'programmes',
            'academics.html': 'academics'
        };

        var dataPage = pageMap[currentPage] || currentPage.replace('.html', '');

        // Remove any existing active classes first
        document.querySelectorAll('.snav-link.active').forEach(function (el) {
            el.classList.remove('active');
        });

        // Add active to the matching link
        var link = document.querySelector('.snav-link[data-page="' + dataPage + '"]');
        if (link) {
            link.classList.add('active');
        }
    }

    /**
     * Re-initialise navbar.js dropdown behaviour after navbar HTML is injected.
     * This calls the global initNavbar() if navbar.js has already exported it,
     * or re-dispatches a custom event that navbar.js can listen to.
     */
    function reinitNavbar() {
        if (typeof window.initNavbar === 'function') {
            window.initNavbar();
        } else {
            // navbar.js will pick this up on DOMContentLoaded / navbarReady
            document.dispatchEvent(new CustomEvent('navbarLoaded'));
        }
        markActiveNavLink();
    }

    /**
     * Main boot sequence: load header → navbar → footer → page init
     */
    function boot() {
        loadComponent('header-placeholder', 'header.html', function () {
            loadComponent('navbar-placeholder', 'navbar.html', function () {
                reinitNavbar();
                loadComponent('footer-placeholder', 'footer.html', function () {
                    // Call any page-specific initialisation
                    if (typeof window.pageInit === 'function') {
                        window.pageInit();
                    }
                });
            });
        });
    }

    // Start as soon as DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

})();
