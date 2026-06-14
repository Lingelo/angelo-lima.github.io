// Central site configuration — the Astro equivalent of the relevant parts of _config.yml.
export const SITE = {
  url: 'https://angelo-lima.fr',
  title: 'Angelo Lima - Dev Web & IA',
  titleEn: 'Angelo Lima - Web Dev & AI',
  author: 'Angélo LIMA',
  authorShort: 'Angelo Lima',
  email: 'angelomiguellima@gmail.com',
  github: 'lingelo',
  linkedin: 'angélo-lima',
  gtag: 'G-EQK9L2XD8X',
  avatar: '/assets/img/avatar-icon.png',
  mobileThemeColor: '#0a0a0a',
  postsPerPage: 6,
  excerptWords: 50,
  keywords:
    'Angelo Lima développeur France, blog tech Angelo Lima, développeur web IA Angelo Lima, Angelo Lima blog français, programmation web Angelo Lima, tutoriels IA Claude ChatGPT, développeur full-stack France, blog développement Angelo Lima, innovation digitale Angelo Lima, outils IA développeurs, maillage interne SEO, optimisation performance web, développeur JavaScript TypeScript, blog tech français 2025',
  descriptionFr:
    "Angelo Lima, développeur web full-stack spécialisé en IA. Blog tech français avec tutoriels développement, analyses d'outils IA (Claude, ChatGPT), et réflexions sur l'innovation digitale moderne.",
  descriptionEn:
    'Angelo Lima, full-stack web developer specialized in AI. Tech blog with development tutorials, AI tools analysis (Claude, ChatGPT), and reflections on modern digital innovation.',
} as const;

// UI strings per language (the bits that were inlined as {% if page.lang == 'en' %} in Liquid).
export const I18N = {
  fr: {
    blog: 'Blog',
    about: 'À propos',
    archive: 'Archive',
    resume: 'Mon CV',
    home: 'Accueil',
    tags: 'Tags',
    readEssay: "Lire l'article",
    featured: 'Article Vedette',
    recent: 'Publications Récentes',
    viewAll: 'Voir les Archives',
    published: 'Publié le',
    readTime: 'Temps de lecture',
    topics: 'Sujets',
    share: 'Partager',
    related: 'Articles connexes',
    previous: 'Précédent',
    next: 'Suivant',
    minuteRead: 'min de lecture',
    backToTop: 'Back to top ↑',
    cookieTitle: 'Ce site utilise des cookies',
    cookieText:
      "J'utilise des cookies pour analyser le trafic et améliorer ton expérience. Aucune donnée personnelle n'est partagée avec des tiers.",
    cookieAccept: 'Accepter',
    cookieRefuse: 'Refuser',
    langName: 'Français',
  },
  en: {
    blog: 'Blog',
    about: 'About',
    archive: 'Archive',
    resume: 'Resume',
    home: 'Home',
    tags: 'Tags',
    readEssay: 'Read Essay',
    featured: 'Featured Essay',
    recent: 'Recent Publications',
    viewAll: 'View All Archive',
    published: 'Published',
    readTime: 'Read Time',
    topics: 'Topics',
    share: 'Share',
    related: 'Related Articles',
    previous: 'Previous',
    next: 'Next',
    minuteRead: 'minute read',
    backToTop: 'Back to top ↑',
    cookieTitle: 'This site uses cookies',
    cookieText:
      'I use cookies to analyze traffic and improve your experience. No personal data is shared with third parties.',
    cookieAccept: 'Accept',
    cookieRefuse: 'Refuse',
    langName: 'English',
  },
} as const;

export type Lang = 'fr' | 'en';

// Home prefix per language: FR home is at "/", EN home at "/en/".
export const homeUrl = (lang: Lang) => (lang === 'en' ? '/en/' : '/');

// Strip diacritics + slugify a tag exactly the way the Jekyll tag pages were named
// ("Développement" → "developpement", "Sécurité" → "securite", "Claude Code" → "claude-code").
export function slugifyTag(tag: string): string {
  return tag
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// URL of a tag term page for a given language.
export const tagUrl = (lang: Lang, tag: string) =>
  lang === 'en' ? `/en/tag/${slugifyTag(tag)}/` : `/tag/${slugifyTag(tag)}/`;
