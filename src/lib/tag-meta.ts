// Per-tag SEO metadata, ported from the old /tag/*.html and /en/tag/*.html front matter.
// Keyed by "<lang>:<slug>". Tags without an entry fall back to a generic title/description.
export interface TagMeta {
  title: string;
  subtitle: string;
  description: string;
}

export const TAG_META: Record<string, TagMeta> = {
  'fr:claude-code': {
    title: 'Articles sur Claude Code',
    subtitle: 'Guides, tutoriels et réflexions sur Claude Code et le développement assisté par IA',
    description:
      "Découvrez tous les articles sur Claude Code : tutoriels, guides pratiques, cheatsheets et retours d'expérience sur le développement assisté par IA avec Claude Code.",
  },
  'fr:developpement': {
    title: 'Articles sur le Développement',
    subtitle: 'Programmation, outils dev, architecture et bonnes pratiques',
    description:
      'Tous les articles sur le développement web et logiciel : tutoriels programmation, outils pour développeurs, architecture logicielle et bonnes pratiques.',
  },
  'fr:ia': {
    title: "Articles sur l'Intelligence Artificielle",
    subtitle: "IA, LLM, machine learning et technologies d'avenir",
    description:
      "Découvrez tous les articles sur l'Intelligence Artificielle : tutoriels LLM, guides pratiques IA, analyses des nouvelles technologies et cas d'usage concrets.",
  },
  'fr:personnel': {
    title: 'Articles Personnels et Réflexions',
    subtitle: 'Expériences, bilans et réflexions sur la tech',
    description:
      "Réflexions personnelles, retours d'expérience et bilans sur le développement, la carrière tech et l'évolution du secteur.",
  },
  'fr:securite': {
    title: 'Articles sur la Cybersécurité',
    subtitle: 'Sécurité informatique, protection et bonnes pratiques',
    description:
      'Articles sur la cybersécurité : protection des données, sécurité des applications, bonnes pratiques et analyses des menaces.',
  },
  'fr:tech': {
    title: 'Articles Tech et Innovation',
    subtitle: 'Actualités technologiques, innovations et tendances',
    description:
      "Suivez l'actualité tech et les innovations : nouvelles technologies, analyses de marché, tendances digitales et révolutions technologiques.",
  },
  'fr:web': {
    title: 'Articles sur les Technologies Web',
    subtitle: 'Frontend, backend, frameworks et développement web moderne',
    description:
      'Découvrez les articles sur les technologies web : React, Vue.js, Node.js, CSS, HTML5 et les dernières innovations du développement web.',
  },
  'en:ai': {
    title: 'Artificial Intelligence Articles',
    subtitle: 'AI, LLM, machine learning and future technologies',
    description:
      'Discover all articles on Artificial Intelligence: LLM tutorials, practical AI guides, new technology analyses and concrete use cases.',
  },
  'en:claude-code': {
    title: 'Claude Code Articles',
    subtitle: 'Guides, tutorials and insights on Claude Code and AI-assisted development',
    description:
      'Discover all articles about Claude Code: tutorials, practical guides, cheatsheets and experience feedback on AI-assisted development with Claude Code.',
  },
  'en:development': {
    title: 'Development Articles',
    subtitle: 'Programming, development tools and best practices',
    description:
      'Discover all articles on Development: programming guides, tools, frameworks, best practices and technical solutions for modern developers.',
  },
  'en:personal': {
    title: 'Personal Articles',
    subtitle: 'Personal experiences, reflections and career insights',
    description:
      'Discover all Personal articles: career experiences, professional reflections, work-life balance and developer journey insights.',
  },
  'en:security': {
    title: 'Security Articles',
    subtitle: 'Cybersecurity, AI security and best practices',
    description:
      'Discover all articles on Security: cybersecurity, AI safety, security best practices, vulnerability analysis and protection mechanisms.',
  },
  'en:tech': {
    title: 'Technology Articles',
    subtitle: 'Tech news, innovations and digital transformation',
    description:
      'Discover all articles on Technology: innovations, digital trends, hardware, emerging technologies and tech industry analysis.',
  },
  'en:web': {
    title: 'Web Articles',
    subtitle: 'Web technologies, frameworks and modern development',
    description:
      'Discover all articles on Web: frontend and backend frameworks, web technologies, JavaScript, TypeScript and modern web development.',
  },
};
