This is a Next.js portfolio starter wired to a global JSON config so you can change content and theme without touching code.

## Getting Started

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000

## Config-driven content

All site content and theme live in `public/portfolio.config.json`.

- `site.title`, `site.description` control metadata and header title
- `site.theme`: primary color and light/dark background/foreground
- `nav.items`: header navigation
- `hero`: name, role, summary, actions, social links
- `sections`: supports `projects`, `about`, `skills`, `contact`

Edit the JSON and refresh — the page renders dynamically from the config.

Example snippet:

```json
{
  "site": { "title": "John Doe — Portfolio", "description": "Full‑stack developer." },
  "nav": { "items": [{ "label": "Projects", "href": "#projects" }] },
  "hero": { "name": "John Doe", "role": "Full‑stack Developer" },
  "sections": [
    { "type": "projects", "title": "Projects", "items": [{ "title": "Acme" }] },
    { "type": "about", "title": "About", "body": "Bio here" },
    { "type": "skills", "title": "Skills", "groups": [{ "title": "Core", "items": ["TS", "React"] }] },
    { "type": "contact", "title": "Contact", "email": "hello@example.com" }
  ]
}
```

## Theming

The theme is controlled by CSS variables injected from the JSON at runtime:
- `--primary` maps to Tailwind tokens `text-primary` and `bg-primary`
- `--background` maps to `bg-background`
- `--foreground` maps to `text-foreground`

You can tweak `site.theme` in the config to change colors globally.

## Files of interest

- `public/portfolio.config.json` — single source of truth
- `src/lib/config.ts` — TypeScript types + loader + CSS var generator
- `src/app/layout.tsx` — applies theme + nav + metadata from config
- `src/app/page.tsx` — renders hero and dynamic sections

## Notes

- This starter targets Next.js App Router with React Server Components by default
- No data fetching outside the filesystem; deploy anywhere 
