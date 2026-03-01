/**
 * main.js — HN College of Management, Solapur
 * Navigation: sticky shadow, hamburger, smooth scroll, active section tracking.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ── DOM references ── */
  var siteNav = document.getElementById('siteNav');
  var navToggle = document.getElementById('navToggle');
  var navBody = document.getElementById('navBody');
  var navLinks = document.querySelectorAll('.nav-link');

  if (!siteNav || !navToggle || !navBody) return;

  /* ─────────────────────────────────────────────
     1. Sticky shadow on scroll
  ───────────────────────────────────────────── */
  function handleScroll() {
    siteNav.classList.toggle('nav--scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ─────────────────────────────────────────────
     2. Mobile hamburger toggle
  ───────────────────────────────────────────── */
  navToggle.addEventListener('click', function () {
    var isOpen = navBody.classList.toggle('nav-body--open');
    navToggle.classList.toggle('nav-toggle--open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* ─────────────────────────────────────────────
     3. Close menu on nav-link click (mobile)
  ───────────────────────────────────────────── */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navBody.classList.remove('nav-body--open');
      navToggle.classList.remove('nav-toggle--open');
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });

  /* ─────────────────────────────────────────────
     4. Close menu on outside click
  ───────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    if (!siteNav.contains(e.target) && navBody.classList.contains('nav-body--open')) {
      navBody.classList.remove('nav-body--open');
      navToggle.classList.remove('nav-toggle--open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ─────────────────────────────────────────────
     5. Smooth scroll with nav offset
  ───────────────────────────────────────────── */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var y = target.getBoundingClientRect().top + window.scrollY - siteNav.offsetHeight - 6;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

  /* ─────────────────────────────────────────────
     6. Active section tracking (Intersection Observer)
  ───────────────────────────────────────────── */
  var sections = document.querySelectorAll('[id]');
  if (sections.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-38% 0px -58% 0px', threshold: 0 });
    sections.forEach(function (s) { obs.observe(s); });
  }

}); /* end DOMContentLoaded */
