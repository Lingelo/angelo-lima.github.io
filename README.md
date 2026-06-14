# Angelo Lima - Blog Tech & IA

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fangelo-lima.fr)](https://angelo-lima.fr)
[![GitHub Pages Deploy](https://github.com/Lingelo/angelo-lima.github.io/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/Lingelo/angelo-lima.github.io/actions)

> Par [Angelo Lima](https://angelo-lima.fr) · [Site Web](https://angelo-lima.fr)

**Blog personnel bilingue** d'Angelo Lima, développeur web full-stack spécialisé en Intelligence Artificielle. Thème sombre éditorial avec accents dorés, articles techniques sur le développement web, l'IA et les innovations digitales.

🌐 **Site en ligne** : [https://angelo-lima.fr](https://angelo-lima.fr)

## ✨ Caractéristiques

- 🌙 Thème sombre éditorial, accents dorés (#edb926), Playfair Display + Geist
- 🌍 Bilingue FR/EN avec URLs SEO `/fr/titre/` et `/en/title/` et hreflang
- ⚡ Site statique ultra-rapide (build < 2 s, zéro JS de framework côté client)
- 🔍 SEO avancé : sitemap, RSS (fr + en), Open Graph, Schema.org
- 📱 PWA : Service Worker, offline, manifest
- 🚀 Déploiement automatique GitHub Actions → GitHub Pages

## 🏗️ Stack technique

- **[Astro](https://astro.build) 5** — générateur de site statique (content collections typées)
- **Node.js 22** — runtime de build (aucun JS de framework expédié au navigateur)
- **TypeScript** — schéma de contenu et helpers
- **GitHub Actions** → **GitHub Pages**, domaine `angelo-lima.fr`

### Structure du projet

```
src/
├── content/posts/{fr,en}/   # 109 articles (Markdown + frontmatter)
├── content.config.ts        # schéma de la collection (zod)
├── pages/                    # routing
│   ├── index.astro           # home FR (/)        en/index.astro (/en/)
│   ├── [lang]/[slug].astro    # articles /fr/… /en/…
│   ├── page/[page].astro      # pagination /page/N/
│   ├── tag/[tag].astro        # /tag/<slug>/       en/tag/[tag].astro
│   ├── tags/index.astro       # /tags/             en/tags/index.astro
│   ├── aboutme.astro          # /aboutme/          en/aboutme.astro
│   ├── feed.xml.ts            # /feed.xml          en/feed.xml.ts
│   ├── 404.astro · offline.astro
├── layouts/                  # BaseLayout · PostLayout · PageLayout
├── components/               # Head · Nav · Footer · Home · TagTerm · …
├── lib/                      # posts.ts · tags.ts · tag-meta.ts
├── site.ts                   # config centrale + i18n + slugify
└── redirects.json            # redirections legacy (générées)
public/
├── assets/{css,js,img,data}  # dark-theme.css + JS vanilla + images
├── resume/ · sw.js · manifest.json · favicon.ico · CNAME · robots.txt
scripts/
├── migrate-content.mjs           # Jekyll → Astro (one-shot)
└── add-pagination-redirects.mjs
```

## 🚀 Développement local

```bash
npm install        # dépendances
npm run dev        # serveur de dev (http://localhost:4321) — articles futurs visibles
npm run build      # build de production → dist/
npm run preview    # prévisualiser dist/
```

## 📝 Créer un article bilingue

1. **Version française** — `src/content/posts/fr/YYYY-MM-DD-titre.md` :

```yaml
---
title: "Titre de l'article"
subtitle: "Sous-titre descriptif"
date: 2026-01-15T12:00:00.000Z
lang: fr
translationKey: reference-unique     # identique aux 2 langues (apparie FR/EN)
slug: titre-de-larticle              # segment d'URL → /fr/titre-de-larticle/
tags: ["IA", "Développement"]
author: "Angelo Lima"
cover: "/assets/img/article.webp"
thumbnail: "/assets/img/thumb-article.webp"
aliases: []                          # anciennes URLs à rediriger (optionnel)
---
```

2. **Version anglaise** — `src/content/posts/en/...` avec le **même `translationKey`** et `lang: en`, `slug` anglais. Le hreflang et le sélecteur de langue se font automatiquement.

### Publication programmée
Un article daté dans le futur n'est **pas publié** tant que sa date n'est pas atteinte (filtre `isPublished`, `src/lib/posts.ts`). Le workflow **Daily Rebuild** reconstruit le site chaque nuit pour publier les articles arrivés à échéance.

### Tags standardisés
**IA** · **Développement** · **Web** · **Tech** · **Personnel** · **Sécurité** · **Claude Code** (FR)
**AI** · **Development** · **Web** · **Tech** · **Personal** · **Security** · **Claude Code** (EN)

Une page de tag (`/tag/<slug>/`) est générée automatiquement pour chaque tag utilisé. Pour personnaliser le SEO d'un tag, ajouter une entrée dans `src/lib/tag-meta.ts`.

## 🔄 Déploiement

Trois workflows GitHub Actions :
- **CI** (`ci.yml`) — build de test sur PR/push
- **Deploy** (`deploy.yml`) — build + déploiement sur push `master`
- **Daily Rebuild** (`daily-rebuild.yml`) — publie les articles programmés (cron 04:05 + 04:30 UTC, ou `repository_dispatch`)

Chaîne : `npm ci` → `npm run build` → `dist/` → `upload-pages-artifact` → `deploy-pages`. Le `CNAME` (dans `public/`) conserve le domaine `angelo-lima.fr`.

## 🛠️ Maintenance

- **Service Worker** : incrémenter `CACHE_NAME` dans `public/sw.js` après modif d'assets critiques.
- **Migration** : voir [`MIGRATION.md`](./MIGRATION.md) pour les détails du passage Jekyll → Astro.

## 📄 Licence

© 2024-2026 Angelo Lima. Le contenu et le design sont la propriété d'Angelo Lima.

## 📞 Contact

- **Email** : angelomiguellima@gmail.com
- **LinkedIn** : [Angelo Lima](https://linkedin.com/in/angélo-lima)
- **GitHub** : [@Lingelo](https://github.com/Lingelo)

---

**Fait avec ❤️ par Angelo Lima · propulsé par [Astro](https://astro.build)**
