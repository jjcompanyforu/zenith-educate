# Zenith Educate

Website for Zenith Educate, Thiruvananthapuram — built with **React 19**, **React Router 7** and **Vite**.

## Run locally

```bash
npm install
npm run dev        # development server with hot reload (http://localhost:5173)
npm run build      # production build into dist/
npm run preview    # serve the production build (http://localhost:4173)
```

## Deploy (Vercel)

`vercel.json` configures the Vite build (`npm run build` → `dist/`), sends every route to the
single-page app, and permanently redirects the old `.html` URLs (e.g. `/about.html` → `/about`).
Connect the Vercel project to this GitHub repository so each push to `main` deploys.

## Project structure

```
index.html                  Vite entry: SEO meta tags + structured data (JSON-LD)
public/                     Served as-is: assets/img/**, robots.txt, sitemap.xml
src/
  main.jsx, App.jsx         Entry point and routes
  data/
    courses.js              ★ Course catalogue — edit courses, durations, modules, "Admissions Open" here
    videos.js               ★ YouTube Shorts shown on the site
    site.js                 Phone, WhatsApp, email, address and social links
  components/               Layout, header, footer, modal, YouTube player, course catalogue + dialogs
  sections/                 Homepage sections (hero, results, video reel, programmes, forms, leadership…)
  pages/                    One component per route (/, /about, /programmes, /admissions, …)
  hooks/                    Page titles/meta, 3D pointer tilt
  styles/home.css           Global + homepage styles
  styles/pages.css          Inner-page styles (scoped under .page)
legacy-static/              The previous static HTML version, kept for reference only (not deployed)
```

## Common edits

- **Add or change a course:** edit `src/data/courses.js`. Set `open: true` to show the
  "Admissions Open" badge and Apply Now form. Each course gets a shareable link: `/#course-<id>`.
- **Add a YouTube Short:** add `{ id, title, tag }` to `SHORTS` in `src/data/videos.js`.
- **Change contact details:** edit `src/data/site.js`.
- **Images:** put files in `public/assets/img/` and reference them as `/assets/img/...`.

## Forms

The site has no backend. The apply/enquiry forms open WhatsApp or the visitor's email app with the
details filled in — nothing is stored. Connect a form service or a serverless function if submissions
should be saved automatically.

## Before production

- Confirm all course names, durations, fees and claims with the institute.
- Replace demo/stock photography with licensed or approved images.
- The site renders in the browser (single-page app). Search engines that don't run JavaScript only see
  the shared meta tags in `index.html`; add pre-rendering if per-page SEO matters.
