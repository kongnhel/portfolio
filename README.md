# Portfolio

A personal portfolio built with Next.js (App Router), TypeScript and Tailwind CSS v4.
It is a fully static export — no server, no database, no API keys — deployed to
GitHub Pages by a GitHub Actions workflow.

The site is available in **English and Khmer**, in **light and dark themes**.

| Feature        | How it works                                                     |
| -------------- | ---------------------------------------------------------------- |
| Two languages  | URL-based, at `/en/...` and `/km/...`                            |
| Two themes     | CSS custom properties, toggled in the header, remembered locally |

## URLs

Every page lives under a language prefix:

```
/en/            /en/projects/    /en/projects/<slug>/    /en/about/    /en/contact/
/km/            /km/projects/    /km/projects/<slug>/    /km/about/    /km/contact/
```

The language switcher in the header moves between the two, keeping you on the same
page. Because the language is part of the URL rather than client-side state, each
version is independently shareable and screen readers get the correct `lang`
attribute. Each page also emits `hreflang` links (`en`, `km`, `x-default`) for
search engines.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script              | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the dev server                                 |
| `npm run build`     | Type-check and produce the static site in `out/`     |
| `npm run lint`      | Run ESLint                                           |
| `npm run typecheck` | Run TypeScript without emitting files                |

## Editing content

All editable content lives in a few typed files. Nothing else needs to change
when you update your details.

| File                          | Contains                                    |
| ----------------------------- | ------------------------------------------- |
| `src/data/site.ts`            | Name, email, phone, social links, photo      |
| `src/data/projects.ts`        | Projects, with `en` and `km` copy            |
| `src/data/experience.ts`      | Bio, skills, education — with `en`/`km` copy |
| `src/data/i18n/en.ts`         | All English interface text                  |
| `src/data/i18n/km.ts`         | All Khmer interface text                    |

Search the repo for `TODO` to find every placeholder left in place.

### Translating

**`en.ts` is the source of truth.** It defines the shape of the dictionary, and
`km.ts` is typed as `Dictionary`, so if you add a string to `en.ts` and forget to
translate it, `npm run typecheck` fails and tells you exactly where.

Adding a language (say Thai) means adding `"th" as const` to `locales` in
`src/lib/i18n.ts`, creating `src/data/i18n/th.ts`, and adding the routes to
`alternates.languages` in `src/lib/seo.ts`. `generateStaticParams` picks up new
locales automatically.

> The Khmer translations were written from your CV and should be proofread by a
> native speaker before you send the link to an employer — technical wording in
> particular ("រូបនា" vs "រចនា", for example) is easy to get subtly wrong.

### Adding a project

Append an entry to the array in `src/data/projects.ts`. Every project needs copy in
both languages:

```ts
{
  slug: "my-project",            // unique, lowercase, hyphenated
  category: "software",          // "software" | "networking" | "design"
  tags: ["TypeScript", "Go"],    // left untranslated in both languages
  year: 2026,
  featured: true,                // true to show on the home page
  links: [{ label: "Source", href: "https://github.com/..." }],
  copy: {
    en: { title: "…", summary: "…", description: ["…"], highlights: ["…"] },
    km: { title: "…", summary: "…", description: ["…"], highlights: ["…"] },
  },
}
```

The detail page at `/en/projects/my-project` (and `/km/...`) plus its sitemap
entries are generated automatically at build time.

## Theming

Colours are CSS custom properties in `src/app/globals.css`. Each token is declared
twice — once under `:root` for light, once under `.dark` for dark:

```css
:root { --base-950: oklch(0.995 0.002 265); /* page background */ }
.dark { --base-950: oklch(0.15  0.008 265); }
```

Names describe *strength*, not colour — `bg-base-950` is always the page
background and `text-base-100` is always primary text. Only the values swap, so no
component needs `dark:` variants. Change the values in both blocks to restyle the
whole site; the accent is `--accent`.

The toggle writes `light` or `dark` to `localStorage`, and a small inline script
applies it before first paint so the page never flashes the wrong theme. If the
visitor has never chosen, it follows their OS setting.

### Adding your photo

1. Save the photo into `public/`, e.g. `public/profile.jpg`.
   A square image of at least 400×400 works best — it is displayed in a circle.
2. Set `photoUrl: "/profile.jpg"` in `src/data/site.ts`.

While `photoUrl` is `null`, the site shows an "NK" monogram instead, so nothing
looks broken if you have not added the photo yet.

## Typography

Two font families are loaded in `src/app/[locale]/layout.tsx` and chained per
language by `--font-body` in `src/app/globals.css`:

| Language | Stack                                             |
| -------- | ------------------------------------------------- |
| `en`     | Geist Sans → Kantumruy Pro → system sans          |
| `km`     | Kantumruy Pro → Geist Sans → system sans          |

Each font only carries the scripts it has glyphs for, so Latin inside a Khmer page
(`Python`, `HTML`) skips Kantumruy and falls through to Geist, and vice versa.
`--font-mono` carries the same chain so Khmer inside a `font-mono` element lands on
Kantumruy instead of a system fallback.

Two rules exist purely because of how Khmer is written:

- `html[lang="km"] { line-height: 1.7 }` — Khmer stacks diacritics above the
  consonant; the default 1.5 clips them.
- `html[lang="km"] :where(h1, h2, h3, h4, .font-mono, [class*="tracking-"]) { letter-spacing: normal }`
  — the `tracking-*` utilities are sized for Latin. Positive tracking splits Khmer
  into visibly separated glyphs, negative tracking collides stacked diacritics.
  The rule is unlayered, so it beats Tailwind's utilities without needing `!important`.

Kantumruy Pro must be loaded with `weight: "variable"`; a numeric range such as
`"100..700"` fails with `Unknown weight`.

## Deploying to GitHub Pages

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

### 2. Turn on Pages

Repo **Settings → Pages → Build and deployment → Source: _GitHub Actions_**.
The `deploy` workflow in `.github/workflows/deploy.yml` then publishes `out/` on
every push to `main`.

### 3. Set two repository variables

Go to **Settings → Secrets and variables → Actions → Variables** and add:

| Variable                 | Value                                            | When                                     |
| ------------------------ | ------------------------------------------------ | ---------------------------------------- |
| `SITE_URL`               | `https://<user>.github.io`                       | Always                                   |
| `BASE_PATH`              | `/<repo>`                                        | Only for a project site (`github.io/<repo>`) |

Set `BASE_PATH` if your site lives at `github.io/<repo>` rather than at a user
root or a custom domain. Leave it blank for the latter two. This matches the
`basePath` option in `next.config.ts`.

> On Windows, note that Git Bash rewrites arguments that start with `/`.
> Prefix commands with `MSYS_NO_PATHCONV=1` if you hit
> `Specified basePath has to start with a /`.

### Custom domain

Add a `CNAME` file in `public/` containing your domain, then set
**Settings → Pages → Custom domain**. Leave `BASE_PATH` blank.

## Notes

- Your landing page is `/en/`. `src/app/page.tsx` is a small redirect page at the
  site root that forwards `/` to `/en/`, with a link to the Khmer version. It uses
  relative URLs, so it works unchanged under a `basePath` or a custom domain.
  Edit that file to change which language `/` forwards to.
- `public/.nojekyll` is required. Without it Pages runs Jekyll, which discards
  the `_next` directory and the site loses all its CSS and JavaScript.
- The contact form validates in the browser and then opens the visitor's mail
  client with the message pre-filled via `mailto:`. Nothing is transmitted to a
  server. To use a hosted form service instead, replace the submit handler in
  `src/components/contact-form.tsx`.
- Images use `next/image` in unoptimised mode, which is what static export
  requires. Serve images through a CDN if you later need automatic resizing.