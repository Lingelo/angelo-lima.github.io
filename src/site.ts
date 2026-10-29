// Central site configuration — the Astro equivalent of the relevant parts of _config.yml.
export const SITE = {
  url: 'https://angelo-lima.fr',
  title: 'Angelo Lima - Développeur augmenté',
  titleEn: 'Angelo Lima - AI-Augmented Developer',
  author: 'Angélo LIMA',
  authorShort: 'Angelo Lima',
  email: 'angelomiguellima@gmail.com',
  github: 'lingelo',
  linkedin: 'https://www.linkedin.com/in/ang%C3%A9lo-lima/',
  kofi: 'https://ko-fi.com/angelolima',
  gtag: 'G-EQK9L2XD8X',
  avatar: '/assets/img/avatar-icon.png',
  mobileThemeColor: '#0a0a0a',
  postsPerPage: 6,
  excerptWords: 50,
  keywords:
    'Angelo Lima, développeur augmenté, développement agentique, agents IA, Claude Code, IA générative, LLM, staff engineer, AI engineer, plateforme agentique, ingénierie logicielle, TypeScript, Java, blog tech français',
  descriptionFr:
    "Angelo Lima, développeur augmenté à l'IA, staff engineer et AI engineer. Blog sur le développement agentique, l'IA générative (Claude Code, LLM) et le métier de développeur.",
  descriptionEn:
    "Angelo Lima, AI-augmented developer, staff engineer and AI engineer. Blog about agentic development, generative AI (Claude Code, LLMs) and the craft of software.",
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
    supportTitle: 'Cet article t’a été utile ?',
    supportText:
      'Le blog est sans pub ni paywall. Si tu veux soutenir mon travail, tu peux m’offrir un café sur Ko-fi.',
    supportCta: 'M’offrir un café',
    supportFooter: 'Soutenir',
    rssSupport: 'Cet article t’a été utile ? Tu peux soutenir le blog en m’offrant un café sur',
    followLabel: 'Suivre les prochains articles',
    copyCode: 'Copier',
    copiedCode: 'Copié ✓',
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
    supportTitle: 'Found this article useful?',
    supportText:
      'This blog has no ads and no paywall. If you’d like to support my work, you can buy me a coffee on Ko-fi.',
    supportCta: 'Buy me a coffee',
    supportFooter: 'Support',
    rssSupport: 'Found this article useful? You can support the blog by buying me a coffee on',
    followLabel: 'Follow upcoming articles',
    copyCode: 'Copy',
    copiedCode: 'Copied ✓',
  },
} as const;

export type Lang = 'fr' | 'en';

// Ko-fi support line appended to each RSS item (feed readers never see the on-site box).
export const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const rssSupportHtml = (lang: Lang) =>
  `<p>☕ ${I18N[lang].rssSupport} <a href="${SITE.kofi}">Ko-fi</a>.</p>`;

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
