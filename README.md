# Orbi Landing Site

Standalone marketing site for Orbi.

Why this lives outside `orbi_nhost`:

- FlutterFlow will not overwrite it.
- Search engines get semantic, crawlable HTML instead of a Flutter web app shell.
- Legal and support pages can be indexed directly.

Files:

- `index.html`: main landing page
- `terms.html`: Terms of Service
- `privacy.html`: Privacy Policy
- `support.html`: Support page
- `styles.css`: shared styling
- `script.js`: carousel, smooth scrolling, reveal animations
- `robots.txt`: crawler rules
- `sitemap.xml`: starter sitemap

Notes before deployment:

- Update the canonical URLs and sitemap if the final domain is not `https://orbichat.io/`.
- If you later host the app itself on a subdomain like `app.orbichat.io`, update the "Join Orbi" CTA to point there.
- This project can be deployed as plain static hosting on Netlify, Vercel, Cloudflare Pages, GitHub Pages, or similar.
