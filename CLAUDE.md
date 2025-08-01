# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog website built with Beautiful Jekyll theme, deployed on GitHub Pages. The site features a custom dark theme with golden accents (#edb926) and displays blog posts in a vertical card grid layout.

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

### Content Management
- **Blog Posts**: Markdown files in `_posts/` following `YEAR-MONTH-DAY-title.md` naming convention
- **Static Pages**: Markdown/HTML files in root directory
- **Images**: Stored in `/assets/img/` directory
- **Post Images**: Each post can have `thumbnail-img` and `cover-img` frontmatter

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
- **Language**: French (fr-FR)
- **Permalink**: `/:year-:month-:day-:title/`

### Custom Liquid Logic
- **Tag Filtering**: Empty tag removal in home and post layouts
- **Image Handling**: Thumbnail fallback to cover-img
- **Meta Information**: Author highlighting in golden color

### Performance Optimizations
- **Critical CSS**: Inline dark theme styles in `_includes/head.html` to prevent white flash
- **Image Loading**: Lazy loading with proper alt texts
- **CSS Structure**: Modular approach with responsive breakpoints

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