/**
 * loader.js — Dynamic Component Loader for HNCC College Website
 *
 * Fetches header, navbar, and footer HTML from the components/ directory.
 * This makes the loader fully dynamic: editing a component file and refreshing
 * the page will immediately reflect the change — no copy-pasting required.
 *
 * REQUIREMENTS:
 *   - Pages must be served via a local HTTP server (e.g. VS Code Live Server,
 *     npx serve, or any web server). Opening via file:// will NOT work because
 *     browsers block fetch() requests on the file:// protocol.
 *
 * USAGE:
 *   Each page must include these placeholder divs:
 *     <div id="header-placeholder"></div>
 *     <div id="navbar-placeholder"></div>
 *     <div id="footer-placeholder"></div>
 *
 *   Then load this script:
 *     <script src="../js/loader.js"></script>
 *
 * COMPONENT FILES (edit these — changes apply to ALL pages automatically):
 *   components/header.html
 *   components/navbar.html
 *   components/footer.html
 */

(function () {
    'use strict';

    /* ══════════════════════════════════════════════════════════════
       RESOLVE COMPONENT BASE PATH
       Components live at: <root>/components/
       Pages can be at:    <root>/pages/         → ../components/
                           <root>/pages/sub/     → ../../components/
       We resolve relative to the current page's location.
       ══════════════════════════════════════════════════════════════ */

    /**
     * Walk up from the current page URL to find the components/ directory.
     * Strategy: count how many directories deep we are from the project root,
     * then prefix with the correct number of "../".
     *
     * The root is identified by the presence of the "components" folder one
     * level up (for pages/) or two levels up (for pages/sub/).
     */
    function resolveComponentsBase() {
        var path = window.location.pathname;
        // Normalise slashes
        path = path.replace(/\\/g, '/');

        // Count directory depth from root by detecting known segments
        // pages/          → depth 1 → prefix "../"
        // pages/sub/      → depth 2 → prefix "../../"
        // Detect by finding "pages" in path
        var pagesIdx = path.lastIndexOf('/pages/');
        if (pagesIdx !== -1) {
            // Everything after /pages/
            var afterPages = path.substring(pagesIdx + 7); // strip '/pages/'
            // Count additional sub-directory segments
            var extraDepth = afterPages.split('/').length - 1;
            var prefix = '../';
            for (var i = 0; i < extraDepth; i++) {
                prefix += '../';
            }
            return prefix + 'components/';
        }

        // Fallback: try one level up
        return '../components/';
    }

    var COMPONENTS_BASE = resolveComponentsBase();

    /* ══════════════════════════════════════════════════════════════
       PRELOAD: Hide body until components are injected
       ══════════════════════════════════════════════════════════════ */
    var preloadStyle = document.createElement('style');
    preloadStyle.id = 'loader-preload';
    preloadStyle.textContent =
        'body { opacity: 0 !important; }' +
        'body.loader-ready { opacity: 1 !important; transition: opacity 0.3s ease; }';
    document.head.appendChild(preloadStyle);


    /* ══════════════════════════════════════════════════════════════
       FETCH & INJECT
       ══════════════════════════════════════════════════════════════ */

    /**
     * Inject an HTML string into a placeholder element.
     * @param {string} containerId  — id of the placeholder div
     * @param {string} html         — HTML string to inject
     */
    function inject(containerId, html) {
        var el = document.getElementById(containerId);
        if (el) {
            el.innerHTML = html;
        }
    }

    /**
     * Fetch a component HTML file and inject it into the matching placeholder.
     * @param {string} containerId  — id of the placeholder div
     * @param {string} filename     — filename inside components/ (e.g. 'navbar.html')
     * @returns {Promise}
     */
    function loadComponent(containerId, filename) {
        var url = COMPONENTS_BASE + filename;
        return fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(
                        'HTTP ' + response.status + ' loading ' + url
                    );
                }
                return response.text();
            })
            .then(function (html) {
                inject(containerId, html);
            })
            .catch(function (err) {
                console.error('[loader.js] Failed to load component:', url, err);
                inject(
                    containerId,
                    '<p style="color:red;padding:8px;font-family:sans-serif;">' +
                    '⚠ Component not loaded (<code>' + filename + '</code>). ' +
                    'Make sure you are running the site via a local HTTP server ' +
                    '(e.g. VS Code Live Server).' +
                    '</p>'
                );
            });
    }


    /* ══════════════════════════════════════════════════════════════
       ACTIVE NAV LINK
       ══════════════════════════════════════════════════════════════ */

    /**
     * Mark the active nav link based on the current page filename.
     */
    function markActiveNavLink() {
        var currentPage = window.location.pathname
            .split('/')
            .pop()
            .replace(/\?.*$/, '')
            .replace(/#.*$/, '');

        if (!currentPage || currentPage === '') currentPage = 'index.html';

        var pageMap = {
            'index.html':          'index',
            'home.html':           'index',
            'about.html':          'about',
            'programmes.html':     'programmes',
            'academics.html':      'academics',
            'syllabus.html':       'syllabus',
            'infrastructure.html': 'infrastructure',
            'events.html':         'events',
            'alumni.html':         'alumni',
            'achievements.html':   'achievements',
            'tenders.html':        'tenders',
            'contact.html':        'contact',
            'notifications.html':  'notifications',
            'placement.html':      'placement',
            /* ── About sub-pages ── */
            'institute-information.html': 'about',
            'vision-mission.html':        'about',
            'goals-quality.html':         'about',
            'core-values.html':           'about',
            'governing-body.html':        'about',
            'policies.html':              'about',
            'principal-secretary.html':   'about',
            /* ── Programmes sub-pages ── */
            'mba.html': 'programmes',
            'bca.html': 'programmes',
            'bba.html': 'programmes',
            /* ── Academics sub-pages ── */
            'academic-calendar.html': 'academics',
            'time-table.html':        'academics',
            'examination.html':       'academics',
            'result.html':            'academics',
            'library.html':           'academics',
            'e-resources.html':       'academics',
            /* ── Infrastructure sub-pages ── */
            'classrooms.html':     'infrastructure',
            'computer-lab.html':   'infrastructure',
            'conference-room.html':'infrastructure',
            'hostel.html':         'infrastructure',
            'gymnasium.html':      'infrastructure',
            /* ── Syllabus sub-pages ── */
            'bca1.html': 'syllabus',
            'bca2.html': 'syllabus',
            'bca3.html': 'syllabus'
        };

        var dataPage = pageMap[currentPage] || currentPage.replace('.html', '');

        document.querySelectorAll('.snav-link.active').forEach(function (el) {
            el.classList.remove('active');
        });

        var link = document.querySelector('.snav-link[data-page="' + dataPage + '"]');
        if (link) {
            link.classList.add('active');
        }
    }


    /* ══════════════════════════════════════════════════════════════
       NAVBAR RE-INIT
       ══════════════════════════════════════════════════════════════ */

    /**
     * Re-initialise navbar.js dropdown behaviour after navbar HTML is injected.
     */
    function reinitNavbar() {
        if (typeof window.initNavbar === 'function') {
            window.initNavbar();
        } else {
            document.dispatchEvent(new CustomEvent('navbarLoaded'));
        }
        markActiveNavLink();
    }


    /* ══════════════════════════════════════════════════════════════
       BOOT
       ══════════════════════════════════════════════════════════════ */

    /**
     * Main boot: fetch all three components, then reveal the page.
     */
    function boot() {
        var p1 = loadComponent('header-placeholder', 'header.html');
        var p2 = loadComponent('navbar-placeholder', 'navbar.html');
        var p3 = loadComponent('footer-placeholder', 'footer.html');

        Promise.all([p1, p2, p3]).then(function () {
            reinitNavbar();

            // Call any page-specific initialisation hook
            if (typeof window.pageInit === 'function') {
                window.pageInit();
            }

            // After injecting header/navbar, scroll to the correct position
            setTimeout(function () {
                var hash = window.location.hash;
                if (hash) {
                    var target = document.querySelector(hash);
                    if (target) {
                        target.scrollIntoView({ behavior: 'auto' });
                    }
                } else {
                    window.scrollTo(0, 0);
                }
                // Fade in the page smoothly
                document.body.classList.add('loader-ready');
            }, 0);
        });
    }

    // Start as soon as the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

})();
