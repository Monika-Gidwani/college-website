/**
 * loader.js — Component Loader for College Website
 *
 * Embeds header, navbar, and footer HTML directly as inline strings.
 * This avoids fetch/XHR CORS issues when opening pages via file:// protocol.
 *
 * Usage: Each page must have these placeholder divs:
 *   <div id="header-placeholder"></div>
 *   <div id="navbar-placeholder"></div>
 *   <div id="footer-placeholder"></div>
 *
 * MAINTENANCE: If you edit components/header.html, navbar.html, or footer.html,
 * you must also update the corresponding string below.
 */

(function () {
    'use strict';

    /* ══════════════════════════════════════════════════════════════
       HEADER HTML
       ══════════════════════════════════════════════════════════════ */
    var HEADER_HTML = [
        '<header class="site-header" role="banner">',
        '  <div class="header-inner">',
        '    <div class="logo-col" aria-label="College Logo">',
        '      <img src="../assets/logo.png" alt="Hirachand Nemchand College of Management Logo" class="college-logo" loading="eager" onerror="this.src=\'../assets/logo-fallback.svg\'" />',
        '    </div>',
        '    <div class="header-text-col">',
        '      <p class="sanskrit-motto" lang="mr">|| शिक्षण हाच धर्म ||</p>',
        '      <p class="trust-name">Shri Hirachand Nemchand Mafatal Punamchand Educational Trust, Solapur</p>',
        '      <h1 class="college-name">Hirachand Nemchand College of Management, Solapur</h1>',
        '      <p class="dept-name">Department of Management Studies</p>',
        '      <p class="college-details">',
        '        <span class="detail-bold">Autonomous College</span>',
        '        <span class="divider" aria-hidden="true">|</span>',
        '        <span>Affiliated to P.A.H Solapur University, Solapur</span>',
        '        <span class="divider" aria-hidden="true">|</span>',
        '        <span>Solapur, Maharashtra – 413 006</span>',
        '        <span class="divider" aria-hidden="true">|</span>',
        '        <span class="naac-badge">NAAC Re-accredited \'A\' Grade</span>',
        '        <span class="divider" aria-hidden="true">|</span>',
        '        <span class="email-info">&#9993;&nbsp;<a href="mailto:hnccsolapur@gmail.com">hnccsolapur@gmail.com</a></span>',
        '      </p>',
        '    </div>',
        '  </div>',
        '</header>'
    ].join('\n');


    /* ══════════════════════════════════════════════════════════════
       NAVBAR HTML
       ══════════════════════════════════════════════════════════════ */
    var NAVBAR_HTML = [
        '<nav class="snav" id="siteNav" role="navigation" aria-label="Main site navigation">',
        '  <div class="snav-inner">',
        '    <button class="snav-hamburger" id="snavHamburger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="snavMenu">',
        '      <span class="snav-line"></span>',
        '      <span class="snav-line"></span>',
        '      <span class="snav-line"></span>',
        '    </button>',
        '    <div class="snav-menu" id="snavMenu">',
        '',
        '      <!-- ROW 1 -->',
        '      <ul class="snav-row" role="list" aria-label="Primary navigation">',
        '',
        '        <!-- Home -->',
        '        <li class="snav-item">',
        '          <a href="home.html" class="snav-link" data-page="index">Home</a>',
        '        </li>',
        '',
        '        <!-- About Us -->',
        '        <li class="snav-item has-drop">',
        '          <a href="#" class="snav-link" data-page="about">About Us <span class="snav-caret" aria-hidden="true">&#9660;</span></a>',
        '          <ul class="snav-drop" role="list">',
        '            <li><a href="about.html#institute-information" class="snav-drop-link">Institute Information</a></li>',
        '            <li><a href="about.html#vision-mission" class="snav-drop-link">Vision and Mission</a></li>',
        '            <li><a href="about.html#goals-quality" class="snav-drop-link">Goals and Quality Policy</a></li>',
        '            <li><a href="about.html#core-values" class="snav-drop-link">Core Values</a></li>',
        '            <li><a href="about.html#governing-body" class="snav-drop-link">Governing Body</a></li>',
        '            <li><a href="about.html#policies" class="snav-drop-link">Policies</a></li>',
        '            <li><a href="about.html#principal-secretary" class="snav-drop-link">Principal and Secretary Desk</a></li>',
        '          </ul>',
        '        </li>',
        '',
        '        <!-- Programmes -->',
        '        <li class="snav-item has-drop">',
        '          <a href="programmes.html" class="snav-link" data-page="programmes">Programmes <span class="snav-caret" aria-hidden="true">&#9660;</span></a>',
        '          <ul class="snav-drop" role="list">',
        '            <li class="has-subdrop">',
        '              <a href="programmes.html#mba-hods-desk" class="snav-drop-link">MBA <span class="snav-subcaret" aria-hidden="true">&#8250;</span></a>',
        '              <ul class="snav-subdrop" role="list">',
        '                <li><a href="programmes.html#mba-hods-desk" class="snav-drop-link">HOD\'s Desk</a></li>',
        '                <li><a href="programmes.html#mba-about-dept" class="snav-drop-link">About Department</a></li>',
        '                <li><a href="programmes.html#mba-vision-mission" class="snav-drop-link">Vision and Mission</a></li>',
        '                <li><a href="programmes.html#mba-co-po-pso-peo" class="snav-drop-link">CO, PO, PSO, PEO</a></li>',
        '                <li><a href="programmes.html#mba-faculty" class="snav-drop-link">Faculty</a></li>',
        '                <li><a href="programmes.html#mba-infrastructure" class="snav-drop-link">Infrastructure</a></li>',
        '                <li><a href="programmes.html#mba-syllabus" class="snav-drop-link">Syllabus</a></li>',
        '                <li><a href="programmes.html#mba-specialisation" class="snav-drop-link">Specialisation</a></li>',
        '                <li><a href="programmes.html#mba-certification" class="snav-drop-link">Certification Course</a></li>',
        '                <li><a href="programmes.html#mba-parents-meet" class="snav-drop-link">Parents Meet &amp; Orientation Program</a></li>',
        '              </ul>',
        '            </li>',
        '            <li><a href="programmes.html#bca" class="snav-drop-link">BCA Course</a></li>',
        '            <li><a href="programmes.html#bba" class="snav-drop-link">BBA Course</a></li>',
        '          </ul>',
        '        </li>',
        '',
        '        <!-- Academics -->',
        '        <li class="snav-item has-drop">',
        '          <a href="academics.html" class="snav-link" data-page="academics">Academics <span class="snav-caret" aria-hidden="true">&#9660;</span></a>',
        '          <ul class="snav-drop" role="list">',
        '            <li><a href="academics.html#academic-calendar" class="snav-drop-link">Academic Calendar</a></li>',
        '            <li><a href="academics.html#time-table" class="snav-drop-link">Time Table (Theory, Practical)</a></li>',
        '            <li><a href="academics.html#examination" class="snav-drop-link">Examination</a></li>',
        '            <li><a href="academics.html#result" class="snav-drop-link">Result</a></li>',
        '            <li><a href="academics.html#library" class="snav-drop-link">Library</a></li>',
        '            <li><a href="academics.html#e-resources" class="snav-drop-link">E-Resources</a></li>',
        '          </ul>',
        '        </li>',
        '',
        '        <!-- Syllabus -->',
        '        <li class="snav-item has-drop">',
        '          <a href="syllabus.html" class="snav-link" data-page="syllabus">Syllabus <span class="snav-caret" aria-hidden="true">&#9660;</span></a>',
        '          <ul class="snav-drop" role="list">',
        '            <li class="has-subdrop">',
        '              <a href="syllabus.html#bca1" class="snav-drop-link">BCA <span class="snav-subcaret" aria-hidden="true">&#8250;</span></a>',
        '              <ul class="snav-subdrop" role="list">',
        '                <li><a href="syllabus.html#bca1" class="snav-drop-link">BCA I</a></li>',
        '                <li><a href="syllabus.html#bca2" class="snav-drop-link">BCA II</a></li>',
        '                <li><a href="syllabus.html#bca3" class="snav-drop-link">BCA III</a></li>',
        '              </ul>',
        '            </li>',
        '          </ul>',
        '        </li>',
        '',
        '        <!-- Events and Activities -->',
        '        <li class="snav-item">',
        '          <a href="#" class="snav-link">Events &amp; Activities</a>',
        '        </li>',
        '',
        '        <!-- Important Links -->',
        '        <li class="snav-item has-drop">',
        '          <a href="#" class="snav-link">Important Links <span class="snav-caret" aria-hidden="true">&#9660;</span></a>',
        '          <ul class="snav-drop drop-left" role="list">',
        '            <li><a href="#" class="snav-drop-link">Annual Report</a></li>',
        '            <li><a href="#" class="snav-drop-link">Institute Development Plan</a></li>',
        '            <li class="has-subdrop">',
        '              <a href="#" class="snav-drop-link">Statutory Committee <span class="snav-subcaret" aria-hidden="true">&#8250;</span></a>',
        '              <ul class="snav-subdrop subdrop-left" role="list">',
        '                <li><a href="#" class="snav-drop-link">Anti-Ragging Committee</a></li>',
        '                <li><a href="#" class="snav-drop-link">Internal Committee</a></li>',
        '                <li><a href="#" class="snav-drop-link">College Development Committee</a></li>',
        '                <li><a href="#" class="snav-drop-link">IQAC</a></li>',
        '                <li><a href="#" class="snav-drop-link">Grievance Redressal Committee</a></li>',
        '                <li><a href="#" class="snav-drop-link">SC/ST Committee</a></li>',
        '                <li><a href="#" class="snav-drop-link">Staff Grievance Committee</a></li>',
        '              </ul>',
        '            </li>',
        '            <li><a href="#" class="snav-drop-link">Strategic Management</a></li>',
        '            <li><a href="#" class="snav-drop-link">Organization Chart</a></li>',
        '            <li><a href="#" class="snav-drop-link">Mandatory Disclosure</a></li>',
        '            <li><a href="#" class="snav-drop-link">Statement of Accounts</a></li>',
        '            <li><a href="#" class="snav-drop-link">Approvals</a></li>',
        '            <li><a href="#" class="snav-drop-link">RTI</a></li>',
        '            <li><a href="#" class="snav-drop-link">Online Grievance</a></li>',
        '          </ul>',
        '        </li>',
        '',
        '        <!-- Accreditation -->',
        '        <li class="snav-item has-drop">',
        '          <a href="#" class="snav-link">Accreditation <span class="snav-caret" aria-hidden="true">&#9660;</span></a>',
        '          <ul class="snav-drop drop-left" role="list">',
        '            <li><a href="#" class="snav-drop-link">IQAC</a></li>',
        '            <li><a href="#" class="snav-drop-link">NAAC</a></li>',
        '            <li><a href="#" class="snav-drop-link">Best Practices</a></li>',
        '            <li><a href="#" class="snav-drop-link">E-Learning</a></li>',
        '          </ul>',
        '        </li>',
        '',
        '        <!-- Training & Placement -->',
        '        <li class="snav-item">',
        '          <a href="home.html#placement" class="snav-link">Training &amp; Placement</a>',
        '        </li>',
        '',
        '      </ul>',
        '',
        '      <div class="snav-divider" aria-hidden="true"></div>',
        '',
        '      <!-- ROW 2 -->',
        '      <ul class="snav-row" role="list" aria-label="Secondary navigation">',
        '',
        '        <!-- Infrastructures -->',
        '        <li class="snav-item has-drop">',
        '          <a href="infrastructure.html" class="snav-link" data-page="infrastructure">Infrastructures <span class="snav-caret" aria-hidden="true">&#9660;</span></a>',
        '          <ul class="snav-drop" role="list">',
        '            <li><a href="infrastructure.html#classrooms" class="snav-drop-link">Class Rooms with Audio Visual Aids</a></li>',
        '            <li><a href="infrastructure.html#library" class="snav-drop-link">Library</a></li>',
        '            <li><a href="infrastructure.html#computer-lab" class="snav-drop-link">Computer Lab</a></li>',
        '            <li><a href="infrastructure.html#conference-room" class="snav-drop-link">Conference Room</a></li>',
        '            <li><a href="infrastructure.html#hostel" class="snav-drop-link">Hostel Facility</a></li>',
        '            <li><a href="infrastructure.html#gymnasium" class="snav-drop-link">Gymnasium</a></li>',
        '          </ul>',
        '        </li>',
        '',
        '        <!-- Alumni -->',
        '        <li class="snav-item"><a href="#" class="snav-link">Alumni</a></li>',
        '',
        '        <!-- Achievements & Awards -->',
        '        <li class="snav-item"><a href="#" class="snav-link">Achievements &amp; Awards</a></li>',
        '',
        '        <!-- Feedback -->',
        '        <li class="snav-item has-drop">',
        '          <a href="#" class="snav-link">Feedback <span class="snav-caret" aria-hidden="true">&#9660;</span></a>',
        '          <ul class="snav-drop" role="list">',
        '            <li><a href="#" class="snav-drop-link">Student Feedback</a></li>',
        '            <li><a href="#" class="snav-drop-link">Student Satisfaction Survey</a></li>',
        '            <li><a href="#" class="snav-drop-link">Student Feedback About Teacher</a></li>',
        '            <li><a href="#" class="snav-drop-link">Parents Feedback</a></li>',
        '            <li><a href="#" class="snav-drop-link">Alumni Feedback</a></li>',
        '          </ul>',
        '        </li>',
        '',
        '        <!-- Tenders -->',
        '        <li class="snav-item"><a href="#" class="snav-link">Tenders</a></li>',
        '',
        '        <!-- Contact Us -->',
        '        <li class="snav-item"><a href="#" class="snav-link">Contact Us</a></li>',
        '',
        '        <!-- Notification & Circulars -->',
        '        <li class="snav-item"><a href="#" class="snav-link">Notification &amp; Circulars</a></li>',
        '',
        '      </ul>',
        '    </div>',
        '  </div>',
        '</nav>'
    ].join('\n');


    /* ══════════════════════════════════════════════════════════════
       FOOTER HTML
       ══════════════════════════════════════════════════════════════ */
    var FOOTER_HTML = [
        '<footer class="site-footer" role="contentinfo">',
        '  <div class="footer-inner">',
        '    <div class="footer-col footer-col--about">',
        '      <h3 class="footer-heading">HN College of Management</h3>',
        '      <p class="footer-text">',
        '        Hirachand Nemchand College of Management, Solapur — Autonomous &amp; NAAC Re-accredited \'A\' Grade.',
        '        Affiliated to P.A.H. Solapur University.',
        '      </p>',
        '    </div>',
        '    <div class="footer-col footer-col--links">',
        '      <h3 class="footer-heading">Quick Links</h3>',
        '      <ul class="footer-links">',
        '        <li><a href="home.html">Home</a></li>',
        '        <li><a href="about.html">About Us</a></li>',
        '        <li><a href="programmes.html">Programmes</a></li>',
        '        <li><a href="academics.html">Academics</a></li>',
        '        <li><a href="home.html#placement">Placement Cell</a></li>',
        '        <li><a href="#">IQAC</a></li>',
        '        <li><a href="#">Alumni</a></li>',
        '      </ul>',
        '    </div>',
        '    <div class="footer-col footer-col--contact">',
        '      <h3 class="footer-heading">Contact</h3>',
        '      <address class="footer-address">',
        '        <p>HN College of Management</p>',
        '        <p>Solapur, Maharashtra – 413 006</p>',
        '        <p><a href="mailto:hnccsolapur@gmail.com">hnccsolapur@gmail.com</a></p>',
        '      </address>',
        '    </div>',
        '  </div>',
        '  <div class="footer-bottom">',
        '    <p>&copy; 2026 Hirachand Nemchand College of Management, Solapur. All rights reserved.</p>',
        '  </div>',
        '</footer>'
    ].join('\n');


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
       INJECT COMPONENTS
       ══════════════════════════════════════════════════════════════ */

    /**
     * Inject HTML string into a placeholder element.
     */
    function inject(containerId, html) {
        var el = document.getElementById(containerId);
        if (el) el.innerHTML = html;
    }

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
            'index.html': 'index',
            'home.html': 'index',
            'about.html': 'about',
            'programmes.html': 'programmes',
            'academics.html': 'academics',
            'syllabus.html': 'syllabus',
            'infrastructure.html': 'infrastructure'
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

    /**
     * Main boot: inject all components synchronously — no fetch needed.
     */
    function boot() {
        inject('header-placeholder', HEADER_HTML);
        inject('navbar-placeholder', NAVBAR_HTML);
        inject('footer-placeholder', FOOTER_HTML);

        reinitNavbar();

        // Call any page-specific initialisation
        if (typeof window.pageInit === 'function') {
            window.pageInit();
        }

        // After injecting header/navbar above the body content, the viewport
        // may be stuck below them. Scroll to top, or to the hash target.
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
    }

    // Start as soon as DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

})();
