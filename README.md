# Cab Sarathi — website

Static site for https://cabsarathi.in (plain HTML + CSS + a little JS, no build step).

- `index.html` — home, `about.html`, `contact.html`, `privacy.html`, `terms.html`, `404.html`
- `styles.css` — shared styles, `script.js` — menu, tabs, "How it works" steps
- `assets/` — logo, favicon, app screenshots (`assets/screens/*.webp`)

Links are clean (`/about`, `/privacy`), so preview with a small local server instead of opening the file: `npx serve .` then open http://localhost:3000. On the server: `git pull` in the site folder — nginx serves the files as they are.
