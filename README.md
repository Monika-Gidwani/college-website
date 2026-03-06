# HN College of Management — Static College Website

A completely static college website built with **HTML, CSS and Vanilla JavaScript**. Runs directly via `file://` with no backend or server required.

---

## Project Structure

```
college-website/
│
├── assets/
│   └── logo.png
│
├── components/              ← Reusable HTML snippets
│   ├── header.html          ← College header (logo + name)
│   ├── navbar.html          ← Full two-row navigation with dropdowns
│   └── footer.html          ← Footer with quick links + contact
│
├── css/
│   ├── base.css             ← CSS reset, variables, typography
│   ├── layout.css           ← Homepage grid, events, placement
│   ├── header.css           ← Site header styles
│   ├── navbar.css           ← Navigation styles (desktop + mobile)
│   ├── about.css            ← About Us page styles
│   ├── academics.css        ← Academics page styles
│   ├── programmes.css       ← Programmes page styles
│   ├── components.css       ← Shared card, button, ticker styles
│   ├── events.css           ← Events carousel styles
│   └── placement.css        ← Placement section styles
│
├── js/
│   ├── loader.js            ← Component loader (works on file://)
│   ├── navbar.js            ← Navbar behaviour (hamburger, dropdowns)
│   ├── main.js              ← Home page: slider, news ticker
│   ├── slider.js            ← Image slider logic
│   ├── about.js             ← About page sidebar navigation
│   ├── academics.js         ← Academics page section switching
│   ├── programmes.js        ← Programmes page tabs
│   └── placement.js         ← Placement counter animation
│
├── pages/                   ← All HTML pages (canonical)
│   ├── index.html           ← Homepage
│   ├── about.html           ← About Us
│   ├── programmes.html      ← Programmes (MBA, BCA, BBA)
│   └── academics.html       ← Academics section
│
└── README.md
```

---

## How the Component System Works

Each page in `pages/` has three placeholder `div`s:

```html
<div id="header-placeholder"></div>
<div id="navbar-placeholder"></div>
<!-- ... page content ... -->
<div id="footer-placeholder"></div>
```

**`js/loader.js`** fetches each component file (`../components/header.html`, etc.) via `fetch()` with an `XMLHttpRequest` fallback and inserts the HTML into the placeholders. After the navbar loads, it calls `window.initNavbar()` from `navbar.js` to re-attach all event listeners.

> ✅ Works on `file://` — no server required.

---

## How to Open Pages

Open any page directly in a browser:

```
pages/index.html       ← Homepage
pages/about.html       ← About Us
pages/programmes.html  ← Programmes
pages/academics.html   ← Academics
```

**To update the header, navbar, or footer:** edit the single file in `components/` — all pages update automatically.

---

## Navigation Links Convention

All links within `components/navbar.html` use page names relative to the `pages/` folder:

| Destination | Link |
|---|---|
| Homepage | `index.html` |
| About Us section | `about.html#vision-mission` |
| Programmes | `programmes.html` |
| Academics section | `academics.html#library` |

---

## Design Theme

- **Colours:** Brown/maroon gradient navigation, beige page background, white content cards
- **Typography:** Playfair Display (headings), Poppins (body) — via Google Fonts
- **Responsiveness:** Mobile hamburger menu with accordion dropdowns
- **No horizontal scroll:** All layouts use `max-width` and `overflow-x: hidden`
