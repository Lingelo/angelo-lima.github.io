# Migration Jekyll vers Hugo

Ce guide détaille la démarche complète pour migrer le site personnel angelo-lima.fr de Jekyll/Beautiful Jekyll vers Hugo, en conservant toutes les fonctionnalités actuelles.

## Étape 1 : Préparation et sauvegarde

### 1.1 Backup du site actuel
```bash
# Créer une branche de sauvegarde
git checkout -b backup-jekyll-site
git push -u origin backup-jekyll-site

# Créer un tag de version
git tag v1.0-jekyll
git push origin v1.0-jekyll
```

### 1.2 Installation Hugo
```bash
# macOS avec Homebrew
brew install hugo

# Vérifier l'installation
hugo version
```

## Étape 2 : Migration automatique du contenu

### 2.1 Utiliser l'outil de migration Jekyll vers Hugo
```bash
# Créer un nouveau site Hugo
hugo new site angelo-lima-hugo
cd angelo-lima-hugo

# Importer le contenu Jekyll
hugo import jekyll ../angelo-lima.github.io ./
```

### 2.2 Structure des fichiers après migration
```
angelo-lima-hugo/
├── content/
│   └── posts/               # Articles migrés depuis _posts/
├── static/
│   └── assets/             # Images et CSS migrés
├── layouts/                # Templates à recréer
├── config.yaml            # Configuration migrée
└── themes/                 # Thème à choisir/créer
```

## Étape 3 : Choix et configuration du thème

### 3.1 Thèmes Hugo compatibles avec Beautiful Jekyll
- **PaperMod** : Moderne, rapide, SEO optimisé
- **Ananke** : Thème officiel Hugo, simple
- **Hugo-PaperMod** : Excellent pour blogs
- **Mainroad** : Style moderne, cards layout

### 3.2 Installation du thème (exemple PaperMod)
```bash
# Ajouter comme submodule Git
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod

# Ou télécharger directement
git clone https://github.com/adityatelange/hugo-PaperMod themes/PaperMod --depth=1
```

## Étape 4 : Configuration Hugo

### 4.1 Configuration de base (config.yaml)
```yaml
baseURL: "https://angelo-lima.fr"
languageCode: "fr-FR"
title: "Angelo Lima - Développeur Full Stack & IA"
theme: "PaperMod"

defaultContentLanguage: "fr"
defaultContentLanguageInSubdir: false

params:
  env: production
  title: "Angelo Lima"
  description: "Blog personnel sur le développement web, l'IA et les technologies"
  keywords: [IA, Développement, Web, Tech, Personnel, Sécurité]
  author: "Angelo Lima"
  
  # Navigation
  ShowReadingTime: true
  ShowShareButtons: true
  ShowPostNavLinks: true
  ShowBreadCrumbs: true
  ShowCodeCopyButtons: true
  ShowWordCount: true
  ShowToc: true
  
  # Theme colors (équivalent du thème doré actuel)
  assets:
    theme_color: "#edb926"
    apple_touch_icon: "/assets/img/avatar-icon.png"
    favicon: "/favicon.ico"

# Menu principal
menu:
  main:
    - identifier: home
      name: Accueil
      url: /
      weight: 10
    - identifier: posts
      name: Articles
      url: /posts/
      weight: 20
    - identifier: about
      name: À propos
      url: /aboutme/
      weight: 30
    - identifier: tags
      name: Tags
      url: /tags/
      weight: 40

# Pagination (équivalent Jekyll)
paginate: 6

# Taxonomies
taxonomies:
  tag: tags
  category: categories

# Markup configuration
markup:
  goldmark:
    renderer:
      unsafe: true
  highlight:
    style: github-dark
    lineNos: true
    codeFences: true

# Language configuration
languages:
  fr:
    languageName: "Français"
    weight: 1
    menu:
      main:
        - identifier: home
          name: Accueil
          url: /
          weight: 10
  en:
    languageName: "English" 
    weight: 2
    menu:
      main:
        - identifier: home
          name: Home
          url: /en/
          weight: 10
```

## Étape 5 : Migration des layouts et templates

### 5.1 Structure des layouts Hugo
```
layouts/
├── _default/
│   ├── baseof.html          # Template de base
│   ├── single.html          # Page article individuelle
│   ├── list.html            # Liste d'articles
│   └── index.html           # Page d'accueil
├── partials/
│   ├── head.html            # <head> HTML
│   ├── header.html          # Navigation
│   ├── footer.html          # Pied de page
│   └── social-share.html    # Partage social
└── shortcodes/              # Équivalent des includes Jekyll
```

### 5.2 Conversion des templates Liquid vers Go Templates

**Jekyll (Liquid) :**
```liquid
{% for post in site.posts limit: 6 %}
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <p>{{ post.excerpt }}</p>
{% endfor %}
```

**Hugo (Go Templates) :**
```go
{{ range first 6 .Site.RegularPages }}
  <h2><a href="{{ .Permalink }}">{{ .Title }}</a></h2>
  <p>{{ .Summary }}</p>
{{ end }}
```

### 5.3 Template de base (layouts/_default/baseof.html)
```html
<!DOCTYPE html>
<html lang="{{ .Site.Language.Lang }}">
<head>
  {{ partial "head.html" . }}
</head>
<body>
  {{ partial "header.html" . }}
  
  <main>
    {{ block "main" . }}{{ end }}
  </main>
  
  {{ partial "footer.html" . }}
</body>
</html>
```

## Étape 6 : Migration du CSS et thème doré

### 6.1 CSS personnalisé (assets/css/custom.css)
```css
/* Variables pour le thème doré */
:root {
  --primary-color: #edb926;
  --primary-hover: #d4a521;
  --bg-dark: #0a0a0a;
  --text-light: #f5f5f5;
}

/* Override des styles du thème */
.theme-toggle {
  display: none; /* Pas de toggle, thème sombre par défaut */
}

body {
  background-color: var(--bg-dark);
  color: var(--text-light);
}

/* Style des cartes articles (équivalent grid Jekyll) */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.post-card {
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
}

/* Liens et accents dorés */
a {
  color: var(--primary-color);
}

a:hover {
  color: var(--primary-hover);
}
```

### 6.2 Configuration des assets dans config.yaml
```yaml
params:
  assets:
    disableHLJS: false
    disableFingerprinting: false
  customCSS:
    - "css/custom.css"
```

## Étape 7 : Migration des fonctionnalités spécifiques

### 7.1 Service Worker et PWA
```javascript
// static/sw.js - Adapter le Service Worker existant
// Changer les chemins Jekyll vers Hugo
const CACHE_NAME = 'angelo-lima-hugo-v1';
const CRITICAL_ASSETS = [
  '/',
  '/offline/',
  '/css/style.css',
  '/js/main.js',
  '/android-chrome-192x192.png'
];
```

### 7.2 Sitemap et SEO
Hugo génère automatiquement :
- `sitemap.xml`
- `robots.txt`
- RSS feeds

Configuration dans config.yaml :
```yaml
sitemap:
  changefreq: 'weekly'
  priority: 0.8
  
outputs:
  home: ["HTML", "RSS", "JSON"]
  page: ["HTML"]
  section: ["HTML", "RSS"]
```

### 7.3 Multilangue (FR/EN)
```yaml
languages:
  fr:
    languageName: "Français"
    contentDir: "content/fr"
    weight: 1
  en:
    languageName: "English"
    contentDir: "content/en"
    weight: 2
```

## Étape 8 : Migration du contenu

### 8.1 Frontmatter des articles
**Jekyll :**
```yaml
---
layout: post
title: "Mon article"
thumbnail-img: "/assets/img/thumbnail.png"
tags: [IA, Développement]
---
```

**Hugo :**
```yaml
---
title: "Mon article"
date: 2024-12-23T10:00:00+01:00
draft: false
cover:
  image: "/assets/img/thumbnail.png"
tags: ["IA", "Développement"]
categories: ["Tech"]
---
```

### 8.2 Script de conversion automatique
```bash
#!/bin/bash
# convert-posts.sh

for file in content/posts/*.md; do
  # Convertir thumbnail-img vers cover.image
  sed -i 's/thumbnail-img:/cover:\n  image:/g' "$file"
  
  # Ajouter date si manquante
  if ! grep -q "date:" "$file"; then
    filename=$(basename "$file")
    date_part=${filename:0:10}
    sed -i "2i date: ${date_part}T10:00:00+01:00" "$file"
  fi
done
```

## Étape 9 : Configuration GitHub Actions

### 9.1 Workflow Hugo (.github/workflows/hugo.yml)
```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.140.1
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb          
      
      - name: Install Dart Sass
        run: sudo snap install dart-sass
        
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
        
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
        
      - name: Build with Hugo
        env:
          HUGO_CACHEDIR: ${{ runner.temp }}/hugo_cache
          HUGO_ENVIRONMENT: production
          TZ: Europe/Paris
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"          
            
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Étape 10 : Tests et validation

### 10.1 Tests locaux
```bash
# Lancer le serveur de développement
hugo server -D --bind 0.0.0.0 --baseURL http://localhost:1313

# Build de production
hugo --gc --minify

# Vérifier les liens cassés
hugo server --navigateToChanged
```

### 10.2 Checklist de validation
- [ ] ✅ Page d'accueil avec grille d'articles
- [ ] ✅ Articles individuels avec style correct
- [ ] ✅ Navigation fonctionnelle
- [ ] ✅ Tags et catégories
- [ ] ✅ Page About Me
- [ ] ✅ Version anglaise
- [ ] ✅ Service Worker et PWA
- [ ] ✅ SEO (sitemap, meta tags)
- [ ] ✅ Thème doré conservé
- [ ] ✅ Images optimisées
- [ ] ✅ Responsiveness mobile

### 10.3 Tests de performance
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://localhost:1313 --view

# Temps de build
time hugo --gc --minify
```

## Étape 11 : Déploiement et migration DNS

### 11.1 Basculement progressif
1. **Test sur branche** : `git checkout -b hugo-migration`
2. **Deploy sur URL temporaire** : `username.github.io/hugo-test`
3. **Tests complets**
4. **Merge vers master** quand validé
5. **Mise à jour CNAME** si domaine personnalisé

### 11.2 Redirections pour SEO
```toml
# Dans config.toml
[permalinks]
  posts = "/posts/:year/:month/:day/:title/"

# Ou fichier _redirects pour Netlify
/2024-12-23-article-title/ /posts/2024/12/23/article-title/ 301
```

## Étape 12 : Maintenance et optimisations

### 12.1 Scripts utiles
```bash
# Nouveau post
hugo new posts/$(date +%Y-%m-%d)-titre-article.md

# Optimisation images
find static/assets/img -name "*.png" -exec cwebp {} -o {}.webp \;

# Update du thème
git submodule update --remote themes/PaperMod
```

### 12.2 Monitoring
- **Google Search Console** : Soumettre nouveau sitemap
- **Analytics** : Vérifier code de tracking
- **Performance** : Monitoring Lighthouse/PageSpeed

## Résumé des avantages Hugo

- ⚡ **Performance** : Build 10x plus rapide
- 🔧 **Maintenance** : Pas de dépendances Ruby
- 📈 **SEO** : Meilleur temps de chargement
- 🌐 **Multilangue** : Support natif amélioré
- 📱 **Modern** : Écosystème plus actif

Cette migration conservera l'apparence et toutes les fonctionnalités actuelles tout en apportant les bénéfices de performance et de maintenance de Hugo.