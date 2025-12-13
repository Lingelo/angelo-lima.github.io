# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **bilingual personal blog** website built with Beautiful Jekyll theme, deployed on GitHub Pages. The site features a custom dark theme with golden accents (#edb926) and displays blog posts in a vertical card grid layout. Content is available in both French (primary) and English, with proper hreflang SEO implementation.

## Architecture

### Theme System
- **Base Theme**: Beautiful Jekyll 6.0.1 (Ruby gem-based Jekyll theme)
- **Custom Theme**: Dark theme with golden yellow accents implemented in `/assets/css/dark-theme.css`
- **Theme Variables**: CSS custom properties for consistent theming across the site
- **Color Scheme**: Dark background (#0a0a0a) with light text (#f5f5f5) and golden accent (#edb926)

### Layout Structure
- **Home Layout**: Custom grid-based article preview layout (6 articles per page)
- **Post Layout**: Individual blog post pages with social sharing
- **Page Layout**: Static pages like About Me
- **Layouts Location**: `_layouts/` directory contains HTML templates

### Content Management (Bilingual)
- **Blog Posts**: Markdown files in `_posts/` following `YEAR-MONTH-DAY-title.md` naming convention
- **Language Structure**: Each article exists in both French and English versions with matching `ref:` field
- **URL Structure**: `/fr/title/` for French, `/en/title/` for English via `categories:` frontmatter
- **Static Pages**: Markdown/HTML files in root directory
- **Images**: Stored in `/assets/img/` directory
- **Post Images**: Each post can have `thumbnail-img` and `cover-img` frontmatter
- **Hreflang**: Automatic cross-language linking via `_includes/head.html`

### Styling System
- **Main Styles**: `/assets/css/dark-theme.css` (processed by Jekyll with Liquid)
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px
- **Grid Layout**: CSS Grid for article previews with auto-fill columns (min 280px)
- **Card Design**: Article previews use vertical card layout with image-on-top

## Common Development Commands

### Local Development
```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve

# Serve with drafts
bundle exec jekyll serve --drafts

# Build for production
bundle exec jekyll build
```

### Content Creation
```bash
# Create new blog post (manual)
touch _posts/YYYY-MM-DD-post-title.md

# Add required frontmatter:
---
layout: post
title: "Post Title"
subtitle: "Post subtitle"
thumbnail-img: "/assets/img/thumbnail.png"
tags: [tag1, tag2]
---
```

## Key Customizations

### Custom Dark Theme
- **Primary Colors**: Golden yellow theme (#edb926 primary, #d4a521 hover)
- **Implementation**: CSS custom properties in `dark-theme.css`
- **Scope**: Applied by default to entire site (no theme toggle)

### Article Grid Layout
- **Grid System**: CSS Grid with responsive columns
- **Card Structure**: Image at top, content below with title, meta, excerpt, tags
- **Hover Effects**: Transform and shadow animations
- **Mobile Responsive**: Single column on mobile, multi-column on desktop

### JavaScript Enhancements
- **Empty Tag Removal**: `/assets/js/hide-empty-tags.js` removes tags with no content
- **Tag Validation**: Liquid template validation + JavaScript cleanup

### Social Integration
- **Social Share**: Custom styled social media sharing buttons matching footer icons
- **Footer Links**: Configured in `_config.yml` social-network-links section
- **Icon Style**: FontAwesome with fa-stack circles, consistent golden theme

## Configuration Notes

### Site Settings (`_config.yml`)
- **Pagination**: 6 articles per page
- **Timezone**: Europe/Paris
- **Languages**: Bilingual (French as default, English secondary)
- **Permalink**: `/:categories/:title/` (with categories: fr/en for language separation)

### Custom Liquid Logic
- **Tag Filtering**: Empty tag removal in home and post layouts
- **Image Handling**: Thumbnail fallback to cover-img
- **Meta Information**: Author highlighting in golden color

### Performance Optimizations
- **Critical CSS**: Inline dark theme styles in `_includes/head.html` to prevent white flash
- **Image Loading**: Lazy loading with proper alt texts
- **CSS Structure**: Modular approach with responsive breakpoints
- **Service Worker**: Comprehensive caching strategy for offline support and performance
- **WebP Images**: Automatic WebP conversion with fallback for better compression
- **PWA Features**: Manifest and mobile optimization for app-like experience

## Theme Maintenance

When making style changes:
1. Edit `/assets/css/dark-theme.css` for theme modifications
2. Use CSS custom properties for consistent theming
3. Test responsive behavior at 768px and 480px breakpoints
4. Ensure proper contrast for accessibility (white text on golden backgrounds)
5. Run Jekyll locally to test Liquid template processing

## Content Guidelines

### Blog Post Structure
- Use descriptive thumbnails for better grid appearance
- Include meaningful tags (filtered for empty/whitespace-only)
- Author names automatically styled in golden color
- Excerpt length: 50 words (configurable in `_config.yml`)

### Image Requirements
- Thumbnail images: 300x200px recommended for consistent grid
- Cover images: Full-width hero images for individual posts  
- Format: PNG/JPG optimized for web
- Location: `/assets/img/` directory

## SEO Maintenance Workflows

### Creating New Articles

When creating a new blog post, follow these steps to ensure proper SEO optimization:

1. **Create the post file** in `_posts/` with proper naming: `YYYY-MM-DD-title.md`

2. **Required frontmatter structure** (bilingual site):
```yaml
---
layout: post
title: "Article Title"
subtitle: "Article subtitle (optional but recommended)"
description: "Custom SEO description (recommended for popular articles)"
thumbnail-img: "/assets/img/article-thumbnail.png"
cover-img: "/assets/img/article-cover.png" (optional)
tags: [IA, Développement, Web, Tech, Personnel, Sécurité] # Use existing tags only
author: "Angelo Lima" (optional, will be highlighted in golden)
lang: fr # or "en" for English articles
ref: article-reference # Same ref for both language versions
categories: fr # or "en" - REQUIRED for proper URL structure (/fr/title/ or /en/title/)
---
```

3. **Post-publication SEO updates** (automatic via Jekyll):
   - Sitemap.xml automatically includes new posts
   - RSS feed.xml automatically includes new posts (latest 20)
   - Pagination automatically updates if needed
   - Breadcrumbs automatically include the post

**No manual SEO file updates needed** for new articles using existing tags.

### Adding New Tags

When adding a completely new tag category, follow these steps to prevent 404 errors:

#### 1. Create Tag Page
Create a new file in `/tag/` directory: `/tag/new-tag-name.html`
```yaml
---
layout: tag
title: "Articles sur [Category Name]"
subtitle: "Description of the category"
description: "SEO description for the tag page"
tag: NewTagName # Must match exactly the tag used in posts
permalink: /tag/new-tag-name/
---
```

#### 2. Update SEO Files
After creating a new tag page, update these files:

**A. Update `sitemap.xml`** - Add new tag URL:
```xml
<url>
  <loc>{{ site.url }}/tag/new-tag-name/</loc>
  <lastmod>{{ site.time | date_to_xmlschema }}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

**B. Update `robots.txt`** - Add new tag to allowed crawling:
```
Allow: /tag/new-tag-name/
```

**C. Update `sitemap.html`** - Add new tag category to the tags grid section:
```html
<div class="tag-category">
  <h3><a href="/tag/new-tag-name/">🔧 New Category Name</a></h3>
  <p>Description of articles in this category</p>
</div>
```

#### 3. Standardized Tag Names
Current standardized tags (use these preferentially):
- **IA**: Intelligence Artificielle, LLM, machine learning
- **Développement**: Programming, development tools, coding
- **Web**: Web technologies, frameworks, frontend/backend
- **Tech**: Technology news, innovations, hardware
- **Personnel**: Personal experiences, reflections, career
- **Sécurité**: Cybersecurity, best practices, security tools

#### 4. Tag Page Template
All tag pages use the unified template in `_layouts/tag.html` which provides:
- Automatic article listing for the tag
- Consistent styling with the site theme  
- Breadcrumb navigation support
- SEO meta tags and structured data

### SEO File Structure

Current SEO-optimized files that auto-update with content:
- **`sitemap.xml`**: Main sitemap with posts, pages, tags, pagination
- **`robots.txt`**: Crawling directives for all tag pages and content  
- **`feed.xml`**: RSS feed with full content and metadata (latest 20 posts)
- **`sitemap.html`**: Human-readable site navigation page

### Automated vs Manual SEO Updates

**Automated (no action needed)**:
- New posts appear in sitemap.xml and feed.xml
- Pagination updates automatically
- Breadcrumbs include new posts automatically
- Social sharing meta tags generated per post

**Manual updates required**:
- Adding completely new tag categories (requires tag page + SEO file updates)
- Major site structure changes
- Custom SEO descriptions for important articles

## Service Worker Management

### Automatic Content Handling

The Service Worker (`sw.js`) is designed to handle new content automatically:

**New Articles (No Action Required)**:
- Individual articles use "Network First" strategy
- New posts are automatically cached on first visit
- Home page updates automatically when new articles are published
- RSS feed and sitemap update automatically via Jekyll

**Images and Assets**:
- New images are automatically optimized and cached
- WebP conversion system handles new images automatically
- Lazy loading applies to all new images

### When to Update Service Worker

**Cache Version Update Required** when modifying:

1. **Critical Assets** in `CRITICAL_ASSETS` array:
   ```javascript
   const CRITICAL_ASSETS = [
     '/',
     '/offline/',
     '/assets/css/dark-theme.css',
     '/assets/js/canonical-enforcement.js',
     '/assets/js/image-optimization.js',
     '/assets/img/avatar-icon.png'
   ];
   ```

2. **Major Site Structure Changes**:
   - New critical pages or layouts
   - Changes to offline functionality
   - Modifications to core CSS/JS files

**How to Update Cache Version**:
```javascript
// Increment version number in sw.js
const CACHE_NAME = 'angelo-lima-v4'; // Change v3 to v4, etc.
```

### Service Worker Features

**Caching Strategies**:
- **Network First**: HTML pages (ensures fresh content)
- **Cache First**: Static assets (CSS, JS, images)
- **Stale While Revalidate**: Background updates for cached assets

**Performance Features**:
- Offline page support (`/offline/`)
- Automatic cache cleanup of old versions
- Intelligent asset prioritization
- Background updates for stale content

### Content Creation Workflow

✅ **No Service Worker Update Needed**:
- Adding new blog posts
- Updating existing articles
- Adding new images to `/assets/img/`
- Using existing tags
- Regular content updates

❌ **Service Worker Update Required**:
- Modifying `dark-theme.css`
- Updating core JavaScript files
- Adding new critical site functionality
- Changing site structure or navigation

## Publication Automatique des Articles Programmés

### Fonctionnement

Les articles peuvent être datés dans le futur (ex: `2025-12-25-mon-article.md`). Jekyll ne les publie qu'à partir de leur date. Le workflow **Daily Rebuild** (`.github/workflows/daily-rebuild.yml`) reconstruit le site automatiquement chaque nuit.

### Déclencheurs (3 niveaux de fiabilité)

1. **Service externe** (cron-job.org) → 04:00 UTC (05:00 Paris hiver / 06:00 Paris été) - le plus fiable
2. **GitHub cron** → 04:05 UTC - backup
3. **GitHub cron** → 04:30 UTC - second backup

> ⚠️ **Important** : Les jobs tournent à 04:00 UTC pour avoir une bonne marge après minuit UTC. Jekyll utilise l'heure UTC du serveur pour déterminer si un article est dans le futur.

### Configuration du Service Externe (Recommandé)

Les crons GitHub Actions ne sont pas fiables à 100%. Pour garantir la publication :

1. **Créer un token GitHub** :
   - `Settings > Developer settings > Personal access tokens`
   - Scope : `repo` (Full control)

2. **Configurer cron-job.org** :
   ```
   URL: https://api.github.com/repos/Lingelo/angelo-lima.github.io/dispatches
   Méthode: POST
   Schedule: 0 4 * * * (04:00 UTC)
   Headers:
     Authorization: Bearer <GITHUB_TOKEN>
     Accept: application/vnd.github.v3+json
     Content-Type: application/json
   Body: {"event_type": "daily-rebuild"}
   ```

### Déclenchement Manuel

Si un article programmé n'est pas publié :

```bash
# Via commit vide
git commit --allow-empty -m "chore: trigger rebuild" && git push

# Ou via GitHub CLI
gh workflow run daily-rebuild.yml
```

## Bilingual Content Management

### URL Structure and SEO
- **French articles**: Must have `categories: fr` in frontmatter → URLs like `/fr/article-title/`
- **English articles**: Must have `categories: en` in frontmatter → URLs like `/en/article-title/`
- **Internal links**: Always use language-specific URLs (`/fr/title/` or `/en/title/`) in markdown links
- **Cross-referencing**: Use matching `ref:` values for article pairs, hreflang handles automatic linking

### Creating Bilingual Articles
1. Create French version with `lang: fr`, `categories: fr`, and `ref: unique-reference`
2. Create English version with `lang: en`, `categories: en`, and same `ref: unique-reference`
3. Both articles will automatically cross-reference via hreflang in `<head>`
4. Internal links must use full language-prefixed paths to avoid 404s

### Critical Structure Rules
- **Never omit `categories: fr` or `categories: en`** - this breaks the URL structure
- **Always use language-prefixed internal links** - `/fr/title/` not `/2025-01-02-title/`
- **Maintain consistent `ref:` values** for article pairs to ensure proper hreflang
- **404 page** is available at `/404.html` with custom dark theme styling