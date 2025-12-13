# Angelo Lima - Blog Tech & IA

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fangelo-lima.fr)](https://angelo-lima.fr)
[![GitHub Pages Deploy](https://github.com/Lingelo/angelo-lima.github.io/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/Lingelo/angelo-lima.github.io/actions)

> Par [Angelo Lima](https://angelo-lima.fr) · [Site Web](https://angelo-lima.fr)

**Blog personnel bilingue** de Angelo Lima, développeur web full-stack spécialisé en Intelligence Artificielle. Site moderne avec thème sombre et design minimaliste, présentant des articles techniques sur le développement web, l'IA, et les innovations digitales.

🌐 **Site en ligne** : [https://angelo-lima.fr](https://angelo-lima.fr)

## ✨ Caractéristiques

- **🌙 Thème sombre personnalisé** avec accents dorés (#edb926)
- **🌍 Site bilingue** français/anglais avec URLs SEO-friendly
- **📱 Design responsive** optimisé mobile-first
- **⚡ Performance optimisée** avec Service Worker et lazy loading
- **🔍 SEO avancé** avec sitemap, hreflang, et métadonnées structurées
- **📊 Analytics intégré** Google Analytics et Cloudflare
- **🚀 Déploiement automatique** via GitHub Actions
- **💾 Support offline** avec cache intelligent

## 🏗️ Architecture Technique

### Stack Technologique
- **Jekyll 4.3.4** - Générateur de site statique
- **Ruby 3.3** - Runtime
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Hébergement
- **Domaine personnalisé** - `angelo-lima.fr`

### Structure des Contenus
- **Articles bilingues** : `/_posts/` avec `categories: fr|en`
- **URLs SEO** : `/fr/titre/` et `/en/title/`
- **Images optimisées** : `/assets/img/` avec support WebP
- **Thème sombre** : `/assets/css/dark-theme.css`

### Fonctionnalités Avancées
- **Grille d'articles** CSS Grid responsive
- **Pagination dynamique** JavaScript
- **Service Worker** avec stratégies de cache
- **Optimisation d'images** automatique
- **Cross-referencing** articles avec `ref:` et hreflang

## 🚀 Développement Local

### Prérequis
- Ruby 3.1+ 
- Bundler

### Installation et Lancement
```bash
# Clone du repository
git clone https://github.com/Lingelo/angelo-lima.github.io.git
cd angelo-lima.github.io

# Installation des dépendances
bundle install

# Serveur de développement
bundle exec jekyll serve

# Build de production
bundle exec jekyll build
```

Le site sera accessible à `http://localhost:4000`

## 📝 Création de Contenu

### Nouvel Article Bilingue

1. **Créer la version française** :
```bash
touch _posts/YYYY-MM-DD-titre-article.md
```

2. **Frontmatter requis** :
```yaml
---
layout: post
title: "Titre de l'article"
subtitle: "Sous-titre descriptif"
thumbnail-img: "/assets/img/article-thumbnail.png"
tags: [IA, Développement, Web]
lang: fr
ref: article-unique-reference
categories: fr
---
```

3. **Créer la version anglaise** avec les mêmes `ref:` et `categories: en`

### Tags Standardisés
- **IA** : Intelligence Artificielle, LLM, machine learning  
- **Développement** : Programming, outils de développement
- **Web** : Technologies web, frameworks
- **Tech** : Actualités tech, innovations
- **Personnel** : Expériences, réflexions personnelles
- **Sécurité** : Cybersécurité, bonnes pratiques

## 🎨 Personnalisation

### Thème Sombre
Le thème utilise des variables CSS personnalisées dans `/assets/css/dark-theme.css` :

```css
:root {
  --primary-color: #edb926;    /* Or doré */
  --primary-hover: #d4a521;    /* Or foncé hover */
  --bg-dark: #0a0a0a;          /* Fond sombre */
  --text-light: #f5f5f5;       /* Texte clair */
}
```

### Configuration Site
Fichier `_config.yml` contient :
- Informations de base (titre, auteur, description)
- Configuration SEO et sociale
- Paramètres de navigation bilingue
- Intégrations analytics

## 🔄 Déploiement

### GitHub Actions
Trois workflows automatisés :
- **CI** (`.github/workflows/ci.yml`) : Tests de build
- **Deploy** (`.github/workflows/deploy.yml`) : Déploiement sur push
- **Daily Rebuild** (`.github/workflows/daily-rebuild.yml`) : Publication des articles programmés

### Publication Automatique des Articles Programmés

Les articles peuvent être datés dans le futur (ex: `2025-12-25-mon-article.md`). Jekyll ne les publie qu'à partir de leur date. Le workflow **Daily Rebuild** reconstruit le site automatiquement chaque nuit pour publier les nouveaux articles.

**Déclencheurs (3 niveaux de fiabilité)** :
1. **Service externe** (cron-job.org) → 00:00 Paris - le plus fiable
2. **GitHub cron** → 00:05 Paris - backup
3. **GitHub cron** → 00:30 Paris - second backup

**Configuration du service externe (recommandé)** :

1. Créer un token GitHub : `Settings > Developer settings > Personal access tokens`
   - Scope : `repo` (Full control)

2. Configurer cron-job.org :
   ```
   URL: https://api.github.com/repos/Lingelo/angelo-lima.github.io/dispatches
   Méthode: POST
   Schedule: 0 0 * * * (minuit)
   Headers:
     Authorization: Bearer <GITHUB_TOKEN>
     Accept: application/vnd.github.v3+json
     Content-Type: application/json
   Body: {"event_type": "daily-rebuild"}
   ```

### Processus de Déploiement
1. Push sur `master`
2. Tests automatiques
3. Build Jekyll en production
4. Déploiement sur GitHub Pages
5. Disponible sur `https://angelo-lima.fr`

## 🏷️ SEO et Performance

### Optimisations Automatiques
- **Sitemap.xml** généré automatiquement
- **Feed RSS** avec 20 derniers articles
- **Hreflang** pour articles bilingues
- **Meta tags** sociaux (Open Graph, Twitter Cards)
- **Structured data** Schema.org

### Service Worker
Cache intelligent avec stratégies :
- **Network First** : Pages HTML (contenu frais)
- **Cache First** : Assets statiques (CSS, JS, images)
- **Stale While Revalidate** : Mise à jour en arrière-plan

## 📊 Analytics et Monitoring

- **Google Analytics** : Suivi des visites et comportement
- **Cloudflare Analytics** : Performance et sécurité
- **GitHub Actions** : Monitoring des builds

## 🛠️ Maintenance

### Mise à Jour Service Worker
Incrémenter la version dans `sw.js` lors de modifications des assets critiques :

```javascript
const CACHE_NAME = 'angelo-lima-v4'; // Incrémenter v3 -> v4
```

### Ajout de Nouvelles Tags
1. Créer `/tag/nouvelle-tag.html`
2. Mettre à jour `sitemap.xml`, `robots.txt`, `sitemap.html`

## 🤝 Contribution

Ce site est personnel mais les améliorations techniques sont bienvenues :

1. Fork du projet
2. Créer une branche feature
3. Commit des modifications
4. Ouvrir une Pull Request

## 📄 Licence

© 2024-2025 Angelo Lima. Tous droits réservés.

Le contenu des articles et le design sont propriété d'Angelo Lima.
Le code source peut être utilisé comme référence pour des projets personnels.

## 📞 Contact

- **Email** : angelomiguellima@gmail.com
- **LinkedIn** : [Angelo Lima](https://linkedin.com/in/angélo-lima)  
- **GitHub** : [@Lingelo](https://github.com/Lingelo)
- **Site Web** : [angelo-lima.fr](https://angelo-lima.fr)

---

**Fait avec ❤️ par Angelo Lima**