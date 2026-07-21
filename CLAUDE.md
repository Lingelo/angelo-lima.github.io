# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **bilingual personal blog** built with **Astro**, deployed on GitHub Pages under the custom domain **angelo-lima.fr**. The site features a custom dark theme with golden accents (#edb926) and displays blog posts in a card grid layout. Content is available in both French (primary) and English, with proper hreflang SEO.

> **History**: the site was originally a Beautiful Jekyll site and was migrated to Astro (see `scripts/migrate-content.mjs` and `scripts/migration-report.json`). Legacy Jekyll URLs are preserved via redirects. If you find references to `_posts/`, `_layouts/`, `_config.yml`, `bundle`, or Liquid, they are outdated — the sections below describe the current Astro architecture.

## Architecture

### Stack
- **Framework**: Astro 5.x (static output, `build.format: 'directory'`, `trailingSlash: 'always'`)
- **Runtime**: Node 22, npm (see `package.json`, v2.0.0)
- **Integrations**: `@astrojs/sitemap` (sitemap generation), `@astrojs/rss` (feed)
- **Markdown**: GitHub-flavored, syntax highlighting via Shiki (`github-dark` theme), `smartypants: false`
- **Central config**: `astro.config.mjs` (site URL, redirects, integrations, markdown) and `src/site.ts` (`SITE` constants: title, author, `postsPerPage: 6`, `excerptWords: 50`, analytics id, plus the `I18N` UI strings per language)

### Directory Structure
```
src/
├── content/
│   ├── posts/fr/          # French articles (Markdown)
│   ├── posts/en/          # English articles (Markdown)
│   └── ...
├── content.config.ts      # Zod schema for the posts collection (frontmatter contract)
├── site.ts                # SITE constants + I18N strings
├── redirects.json         # legacy URL → new URL map (consumed by astro.config.mjs)
├── layouts/               # BaseLayout, PageLayout, PostLayout
├── components/            # Head, Nav, Footer, Home, Pagination, RelatedPosts,
│                          # SocialShare, Search, SchemaOrg, BreadcrumbSchema, TagTerm, CookieConsent
├── lib/                   # posts.ts (queries), tags.ts (tag grouping), tag-meta.ts
└── pages/
    ├── index.astro                # FR home
    ├── [lang]/[slug].astro        # every article, /fr/<slug>/ and /en/<slug>/
    ├── page/[page].astro          # FR pagination   + en/page/[page].astro
    ├── tag/[tag].astro            # FR tag pages     + en/tag/[tag].astro
    ├── tags/index.astro           # FR tag index     + en/tags/index.astro
    ├── aboutme.astro, 404.astro, offline.astro
    ├── feed.xml.ts                # RSS feed
    └── llms.txt.ts, llms-full.txt.ts   # LLM-friendly site exports

public/
├── assets/css/dark-theme.css      # the theme (STATIC — no longer Liquid-processed)
├── assets/css/fonts.css
├── assets/img/                    # post images, avatar, etc.
├── assets/js/                     # canonical-enforcement.js, image-optimization.js, ...
├── sw.js                          # service worker (PWA / offline)
├── manifest.json, robots.txt, CNAME, favicon.ico
```

### Content Collection & Frontmatter Schema

Posts are a typed Astro content collection. The schema lives in `src/content.config.ts` (Zod). **Language is determined by the directory** (`posts/fr/` or `posts/en/`) and the `lang` field — there is **no `categories` field** anymore.

Fields:
- `title` (string, required)
- `subtitle` (string, optional) — shown under the title
- `description` (string, optional) — SEO meta description
- `date` (datetime, required) — ISO 8601, e.g. `2026-07-21T12:00:00.000Z`
- `lastUpdated` (datetime, optional)
- `lang` (`fr` | `en`, required)
- `translationKey` (string, required) — **pairs the FR and EN version** of an article (this replaced Jekyll's `ref:`). hreflang cross-linking is automatic when both versions share the same key.
- `tags` (string array, default `[]`)
- `author` (string, default `Angelo Lima`)
- `cover`, `thumbnail`, `shareImg` (strings, optional) — image paths under `/assets/img/`
- `slug` (string, required) — the URL segment after the language prefix (e.g. `amalia-ia-portugaise-souverainete` → `/fr/amalia-ia-portugaise-souverainete/`)
- `aliases` (string array, default `[]`) — documents legacy URLs; see "Redirects" below
- `mathjax` (boolean, optional)
- `faq` (array of `{ q, a }`, optional) — GEO/SEO. When present, `PostLayout` renders a visible FAQ section **and** emits `FAQPage` JSON-LD. Keep answers short and self-contained so answer engines can quote them.

### Routing & URLs
- **Articles**: `/<lang>/<slug>/` via `src/pages/[lang]/[slug].astro` (the canonical URL is built in `postUrl()` in `src/lib/posts.ts`).
- **Home**: `/` (FR) and `/en/`.
- **Pagination**: `/page/2/`, `/en/page/2/`, … (6 posts per page, from `SITE.postsPerPage`).
- **Tags**: `/tag/<tag-slug>/` and `/en/tag/<tag-slug>/`, plus index pages `/tags/` and `/en/tags/`.
- All canonical URLs keep a **trailing slash**.

### Bilingual System
- Create the FR version in `src/content/posts/fr/` with `lang: fr`, and the EN version in `src/content/posts/en/` with `lang: en`.
- Give **both the same `translationKey`** — `getTranslation()` (`src/lib/posts.ts`) finds the pair and `Head`/`SchemaOrg` emit the `<link rel="alternate" hreflang="…">` tags automatically.
- **Internal links must use full language-prefixed paths** (`/fr/title/` or `/en/title/`), never a bare filename. Link FR articles to FR articles and EN to EN.

### Redirects / Legacy URLs
- Astro emits a redirect page (meta-refresh + canonical) for every entry in `src/redirects.json`, wired through `astro.config.mjs`. This reproduces the old Jekyll `_plugins/redirect_generator.rb` behavior.
- The map was generated from the migration (`scripts/migrate-content.mjs`) and extended for pagination (`scripts/add-pagination-redirects.mjs`).
- The `aliases` frontmatter field is **documentary** for new posts: adding an alias there does **not** by itself create a redirect. A genuinely new article has no legacy URL, so this rarely matters. If you ever need an old path to 301 to a new one, add it to `src/redirects.json`.

### Styling
- **Theme**: `public/assets/css/dark-theme.css` — served as a static asset (it is **not** processed by any template engine; write plain CSS with real values, not Liquid).
- **Colors**: dark background (#0a0a0a), light text (#f5f5f5), golden accent (#edb926, hover #d4a521), via CSS custom properties.
- **Responsive**: mobile-first, breakpoints at 768px and 480px; article grid uses CSS Grid.

## Common Development Commands

```bash
npm install          # install dependencies

npm run dev          # local dev server with HMR (astro dev) — shows future-dated drafts
npm run build        # production build to dist/ (astro build)
npm run preview      # serve the built dist/ locally
npm run check        # type-check content + components (astro check)
```

> In `npm run dev`, future-dated posts are visible so you can preview drafts. In `npm run build` they are excluded until their date (see "Scheduled Posts").

## Creating New Articles

1. Create the file in the right language directory: `src/content/posts/fr/YYYY-MM-DD-title.md` (and/or `posts/en/…`).

2. Frontmatter (match the schema in `src/content.config.ts`):
```yaml
---
title: "Titre de l'article"
subtitle: "Sous-titre (optionnel)"
description: "Description SEO (recommandée pour les articles importants)"
date: 2026-07-21T12:00:00.000Z
lang: fr                       # or "en"
translationKey: "unique-key"   # SAME value on the FR and EN versions
slug: "url-segment"            # → /fr/url-segment/ or /en/url-segment/
tags:
  - "IA"
  - "Tech"
author: "Angelo Lima"
thumbnail: "/assets/img/article-thumbnail.png"
shareImg: "/assets/img/article-thumbnail.png"   # used for social sharing
aliases:
  - "/YYYY-MM-DD-url-segment/"                    # optional, documentary
---
```

3. Auto-updated on the next build (no manual action needed):
   - RSS feed (`src/pages/feed.xml.ts`)
   - Sitemap (`@astrojs/sitemap`)
   - Pagination, breadcrumbs, related posts, tag pages, hreflang alternates

4. **Images** go in `public/assets/img/`. Reference them as `/assets/img/name.png`. A missing `thumbnail` does not break the build (the card renders without an image), but a real image is recommended for the grid and social sharing.

## Tags (Auto-Generated)

**There is no manual tag-page creation anymore.** Tag pages, the tag index, and their listings are generated dynamically from the `tags` used in posts (`src/lib/tags.ts`, `src/pages/tag/[tag].astro`, `src/pages/en/tag/[tag].astro`). Tag URL slugs are produced by `slugifyTag()` in `src/site.ts`.

To add a tag to an article, just put it in the `tags` array. You do **not** need to edit `sitemap.xml`, `robots.txt`, or any tag stub file.

Preferred standardized tags (reuse existing ones rather than inventing new): **IA**, **Développement** / **Development**, **Web**, **Tech**, **Personnel** / **Personal**, **Sécurité** / **Security**, **Claude Code**. Per-tag titles/descriptions can be customized in `src/lib/tag-meta.ts`.

## SEO Files

Generated by Astro (no manual editing for new content):
- **Sitemap**: `@astrojs/sitemap` integration (excludes 404/offline and paginated pages).
- **RSS feed**: `src/pages/feed.xml.ts`.
- **hreflang**: emitted per-page in `<head>` from the `translationKey` pairing.
- **llms.txt / llms-full.txt**: `src/pages/llms.txt.ts` and `llms-full.txt.ts` — LLM-friendly exports of the site.
- **robots.txt**: static in `public/robots.txt`.
- **Structured data**: `SchemaOrg.astro` + `BreadcrumbSchema.astro`.

## Service Worker (PWA)

`public/sw.js` provides offline support and caching. Current cache version: `angelo-lima-v5` (`CACHE_NAME`).

- **Bump `CACHE_NAME`** (v5 → v6, …) when you change any file in `CRITICAL_ASSETS` (currently `/`, `/offline/`, `/assets/css/dark-theme.css`, `/assets/js/canonical-enforcement.js`, `/assets/js/image-optimization.js`, `/assets/img/avatar-icon.png`) or make major structural changes.
- **No bump needed** for normal content: new posts, new images, edits to existing articles.
- Strategies: Network First for HTML (fresh content), Cache First for static assets, with background revalidation.

## Scheduled Posts (Daily Rebuild)

Articles can be dated in the future. `isPublished()` in `src/lib/posts.ts` excludes future-dated posts from production builds until their date is reached (mirroring Jekyll's behavior).

Because a static build won't publish a scheduled post on its own, `.github/workflows/daily-rebuild.yml` re-runs `npm run build` on a schedule (GitHub cron at **04:05** and **04:30 UTC**, plus any external trigger via `repository_dispatch`). Jekyll-era note: the server compares against **UTC**, so the early-morning UTC schedule gives margin after midnight.

Manual trigger if a scheduled post is missing:
```bash
git commit --allow-empty -m "chore: trigger rebuild" && git push
# or run the daily-rebuild workflow from the GitHub Actions tab
```

## Deployment & CI

- **`.github/workflows/ci.yml`** — on push/PR: `npm ci`, `npm run check`, `npm run build`.
- **`.github/workflows/deploy.yml`** — builds and deploys to GitHub Pages.
- **`.github/workflows/daily-rebuild.yml`** — scheduled rebuild for future-dated posts (see above).
- Custom domain via `public/CNAME` (angelo-lima.fr); site URL is set in `astro.config.mjs` and `src/site.ts`.

**Before pushing content changes, run `npm run build` locally** to catch schema/frontmatter errors — an invalid frontmatter field fails the content-collection validation and breaks the build.

## Content Guidelines

- **Creating a full article?** Use the `create-article` skill (`.claude/skills/create-article/`). It encodes the end-to-end workflow — bilingual pairing, schema-correct frontmatter, standardized tags, internal linking, SEO/GEO (short description, "L'essentiel" key-facts box, `faq:` block), a deslopify pass, and build validation. Its `references/seo-geo.md` holds the detailed SEO/GEO rules.
- Reuse existing tags; keep the tag set small and standardized.
- Write meaningful `subtitle` and `description` for important articles (better cards + SEO).
- Thumbnails ~300×200 for consistent grid appearance; cover images full-width for the hero.
- Anti-slop: the `deslopify` skill (`.claude/skills/deslopify/`) documents the AI-writing markers to avoid (over-used em-dashes, "not X but Y", ternary rhythm, generic openers). Apply it to drafts — this is a bilingual FR/EN blog with a personal, direct voice to preserve.

## Theme Maintenance

When changing styles:
1. Edit `public/assets/css/dark-theme.css` (plain CSS, static).
2. Use the existing CSS custom properties for consistent theming.
3. Test the 768px and 480px breakpoints.
4. Ensure contrast/accessibility (light text on golden backgrounds).
5. If you touch a `CRITICAL_ASSETS` file, bump the service worker `CACHE_NAME`.
