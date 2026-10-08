# Portfolio

A personal portfolio built with Next.js (App Router), TypeScript and Tailwind CSS v4.
It is a fully static export — no server, no database, no API keys — deployed to
GitHub Pages by a GitHub Actions workflow.

The design is a **terminal / CRT** interface: monospace throughout, square corners,
hairline borders and one electric-cyan accent.

The site is **English-only**, in **light and dark themes**.

| Feature        | How it works                                                     |
| -------------- | ---------------------------------------------------------------- |
| URL locale     | Every page lives under `/en/...`; any other prefix 404s          |
| Two themes     | CSS custom properties, toggled in the header, remembered locally |

## URLs

Every page lives under the language prefix:

```
/en/            /en/projects/    /en/projects/<slug>/    /en/about/    /en/contact/
```

`/` forwards to `/en/`. Because the language is part of the URL rather than
client-side state, each page is independently shareable and screen readers get
the correct `lang` attribute. Each page also emits `hreflang` links (`en` and
`x-default`) for search engines.

The locale plumbing is kept even though only English is registered — see
[Adding a language](#adding-a-language) below.

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
| `src/data/projects.ts`        | Projects, with copy nested per locale       |
| `src/data/experience.ts`      | Bio, skills, education — copy per locale    |
| `src/data/i18n/en.ts`         | All English interface text                  |

Search the repo for `TODO` to find every placeholder left in place.

### Adding a language

The site ships English-only, but the locale plumbing is still in place so another
language is a small addition:

1. Add the code to `locales` and `localeMeta` in `src/lib/i18n.ts`, and a
   `LanguageSwitcher` back into `src/components/site-header.tsx`
   (`switchLocale` was removed with the switcher — restore it from git history or
   just build the href from `localisedPath`).
2. Create `src/data/i18n/<code>.ts` exporting a `Dictionary`, and return it from
   `getDictionary` in `src/lib/i18n.ts`. Because the type is `typeof en`, an
   untranslated key is a `npm run typecheck` error that names the exact path.
3. Add a sibling `copy` entry to every project in `src/data/projects.ts`, every
   `skillGroups` entry and `education`/`experience` entry in
   `src/data/experience.ts`, and every `about.bio` / `about.facts` value. They
   are typed `Record<Locale, …>`, so a missing locale fails to compile.
4. Add the code to `alternates.languages` in `src/lib/seo.ts`. Next only emits
   hreflang links from a statically analysable object literal, so this list is
   written out by hand.
5. If the script is not Latin, load a font for it in
   `src/app/[locale]/layout.tsx` and prepend it to the `--font-body` /
   `--font-code` chains in `src/app/globals.css`. Leave out any variable that is
   not defined — an undefined `var()` reference invalidates the whole declaration.
6. Add a link to the language on the root redirect (`src/app/page.tsx`) and on
   the 404 page (`src/app/global-not-found.tsx`), which both render outside the
   locale layout and hand-write their hreflang tags.

Routes, the sitemap and `generateStaticParams` all follow `locales`
automatically. Anything of yours that has Khmer text in a *screenshot* is fine —
only text in the source is removed.

### Adding a project

Append an entry to the array in `src/data/projects.ts`. Every project needs copy
for each registered locale:

```ts
{
  slug: "my-project",            // unique, lowercase, hyphenated
  category: "software",          // "software" | "networking" | "design"
  tags: ["TypeScript", "Go"],    // proper nouns, left untranslated
  year: 2026,
  featured: true,                // true to show on the home page
  links: [{ labelKey: "source", href: "https://github.com/..." }],
  copy: {
    en: { title: "…", summary: "…", description: ["…"], highlights: ["…"] },
  },
}
```

`labelKey` is a dictionary key (`liveSite` or `source`), not text, so the link
label is translated with everything else.

The detail page at `/en/projects/my-project` plus its sitemap entries are
generated automatically at build time.

## Theming

The design language is **terminal / CRT**: monospace throughout, square corners,
1px borders, and one loud accent (electric cyan `#22d3ee`). Colours are CSS custom
properties in `src/app/globals.css`. Each token is declared twice — once under
`:root` for light, once under `.dark` for dark:

```css
:root { --base-950: oklch(0.987 0.004 220); /* page background */ }
.dark { --base-950: oklch(0.145 0.021 245); }
```

Names describe *strength*, not colour — `bg-base-950` is always the page
background and `text-base-100` is always primary text. Only the values swap, so no
component needs `dark:` variants. Change the values in both blocks to restyle the
whole site.

Beyond the `base-950…100` ramp:

| Token                             | Purpose                                              |
| --------------------------------- | ---------------------------------------------------- |
| `--accent` / `--accent-muted`     | Cyan. Buttons, links, focus rings, the active nav.   |
| `--accent-bright`                 | Hover state for accent text.                         |
| `--accent-2` / `--accent-3`       | Magenta and amber, used by the window LEDs and gradient rules. |
| `--glow` / `--glow-soft`          | Bloom shadows. Empty in light mode, lit in dark.     |

### Style primitives

Shared class names in `globals.css` keep the terminal look consistent:

| Class                        | Effect                                                    |
| ---------------------------- | --------------------------------------------------------- |
| `.prompt`                    | Colours a `$` / `>` / `~/` prefix in the accent.          |
| `.caret-blink`               | Blinking block cursor (`::after`).                         |
| `.brackets`                  | Corner brackets on `::before` / `::after`, spreading on hover. |
| `.crt-image`                 | Scanline sheen over a photo or screenshot.                 |
| `.led`                       | Slow-pulsing status dot.                                   |
| `.sweep` / `.scanlines` / `.vignette` | Ambient CRT layers, rendered by `src/components/ambient.tsx`. |

`--radius-DEFAULT` is set to `0`, so the bare `rounded` utility resolves to sharp
corners. Use `rounded-full` explicitly where a circle is actually wanted.

The toggle writes `light` or `dark` to `localStorage`, and a small inline script
applies it before first paint so the page never flashes the wrong theme. If the
visitor has never chosen, it follows their OS setting.

### Favicon

`src/app/favicon.ico` (16/32/48), `src/app/icon.png` (256) and
`src/app/apple-icon.png` (128) are cut from the same photo as `site.photoUrl` and
given a cyan ring and corner brackets. Next picks all three up as file-based
metadata and applies `basePath` automatically, so they are declared nowhere in
code.

### Photos

`public/image/me/my style.png` is the single source for every image of you:

| Output                            | Crop                        | Used by                      |
| --------------------------------- | --------------------------- | ---------------------------- |
| `public/image/me/profile.jpg`     | head and shoulders, 512×512 | `ProfilePhoto` — About page  |
| `public/image/me/hero.jpg`        | 4:5, 720×900                | `HeroPortrait` — Home hero   |
| `src/app/favicon.ico`, `icon.png`, `apple-icon.png` | tight on the face | browser / iOS tab icon |

Regenerate all four together when the source photo changes. Set `photoUrl` to
`null` in `src/data/site.ts` to fall back to the "NK" monogram instead.

## Typography

One family is loaded in `src/app/[locale]/layout.tsx` and chained by
`--font-body` / `--font-code` in `src/app/globals.css`:

```css
--font-body: var(--font-jetbrains), ui-monospace, monospace;
```

JetBrains Mono carries the whole site — it is the terminal voice the design is
built around, and it has a generous x-height for reading at body sizes. It is
loaded in three static weights (400/500/700) rather than as a variable font, so
no reader ever waits on an extra download.

`font-variant-ligatures: none` is set on `body`. Mono coding fonts turn `=>` and
`!=` into arrows and ligatures that read as noise in prose.

If you add a language with a non-Latin script, add its font to the layout and
prepend it to both chains — see [Adding a language](#adding-a-language). Leave
any variable you do not define out of the chain: a single undefined `var()`
reference invalidates the whole declaration and `font-family` silently falls back
to the inherited value.

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
  site root that forwards `/` to `/en/`. It uses relative URLs, so it works
  unchanged under a `basePath` or a custom domain. Edit that file to change
  which language `/` forwards to.
- `public/.nojekyll` is required. Without it Pages runs Jekyll, which discards
  the `_next` directory and the site loses all its CSS and JavaScript.
- The contact form validates in the browser and then opens the visitor's mail
  client with the message pre-filled via `mailto:`. Nothing is transmitted to a
  server. To use a hosted form service instead, replace the submit handler in
  `src/components/contact-form.tsx`.
- Images use `next/image` in unoptimised mode, which is what static export
  requires. Serve images through a CDN if you later need automatic resizing.
- `src/app/icon.png`, `src/app/apple-icon.png` and `src/app/favicon.ico` are cut
  from the same photo as `public/image/me/profile.jpg`. Next serves them as
  file-based metadata, so replacing all four is the only step needed to change
  the browser tab icon and the About-page portrait.