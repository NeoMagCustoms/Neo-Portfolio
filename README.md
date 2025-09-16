
# Emma Gardner — 3‑Pane Portfolio (Eleventy + Decap CMS)

**Features**
- 3‑column gallery (Work) like classic illustrator templates.
- Top nav: Work | Store | Info, plus /admin login link.
- Right‑rail social icons (Pinterest, Facebook, Instagram).
- Hero banner with centered artist name overlay.
- Blog at /blog (create posts in CMS).

## Quick start
1. Create a Git repo and push this folder.
2. Netlify → Add new site → Import from Git.
   - Build command: `npm run build`
   - Publish directory: `_site`
3. Netlify → Identity → Enable → Registration = Invite only.
4. Enable Git Gateway. Invite the artist’s email.
5. Visit `/admin/` to log in and start uploading.

## Pages
- `/` Work (gallery)
- `/store/` Store (link to external or use Buy links per artwork)
- `/info/` Bio/Contact
- `/blog/` Blog index

## Content locations
- Artworks: `src/artworks/*.md`
- Blog: `src/posts/*.md`
- Images uploaded via CMS: `src/images/uploads/`
- Hero banner: `src/images/hero.jpg`
