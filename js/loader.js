/**
 * loader.js — HN College of Management, Solapur
 * Dynamically loads HTML component files into their target elements,
 * then fires 'componentsReady' so slider.js and main.js can initialise.
 */

'use strict';

/**
 * Fetches an HTML file and injects its content into the element with the given ID.
 * @param {string} url      - Relative path to the HTML component file.
 * @param {string} targetId - ID of the element to inject into.
 * @returns {Promise}
 */
function loadComponent(url, targetId) {
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to load component: ' + url + ' (' + response.status + ')');
            }
            return response.text();
        })
        .then(function (html) {
            var el = document.getElementById(targetId);
            if (el) {
                el.innerHTML = html;
            } else {
                console.warn('loader.js: target element #' + targetId + ' not found.');
            }
        });
}

/* ── Load all components in parallel, then signal readiness ── */
Promise.all([
    loadComponent('components/header.html', 'header'),
    loadComponent('components/navbar.html', 'navbar'),
    loadComponent('components/news-panel.html', 'news-panel'),
    loadComponent('components/latest-events.html', 'latest-events'),
    loadComponent('components/placement-overview.html', 'placement-overview'),
    loadComponent('components/footer.html', 'footer')
])
    .then(function () {
        /* All HTML is in the DOM — let other scripts initialise */
        document.dispatchEvent(new CustomEvent('componentsReady'));
    })
    .catch(function (err) {
        console.error('loader.js: component loading failed —', err);
        console.info('Tip: Serve the site via a local web server (e.g. VS Code Live Server).');
    });
