import { SITE } from '../site';
import { postUrl, isoDate, type Post } from './posts';

/** The Markdown twin of an article, e.g. /fr/conventional-commits.md */
export const postMarkdownUrl = (p: Post) => postUrl(p).replace(/\/$/, '.md');

/**
 * Clean Markdown version of an article for AI agents: metadata as frontmatter,
 * the original body with site-relative links made absolute, and the FAQ
 * (which lives in the frontmatter, not in the body) appended as a section.
 */
export function postMarkdown(post: Post, translation?: Post): string {
  const abs = (path: string) => new URL(path, SITE.url).href;
  const { data } = post;

  const meta: Record<string, string | string[] | undefined> = {
    title: data.title,
    description: data.description ?? data.subtitle,
    url: abs(postUrl(post)),
    lang: data.lang,
    author: data.author,
    datePublished: isoDate(data.date),
    dateModified: data.lastUpdated ? isoDate(data.lastUpdated) : undefined,
    tags: data.tags.length ? data.tags : undefined,
    translation: translation ? abs(postUrl(translation)) : undefined,
  };
  const frontmatter = Object.entries(meta)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n');

  const body = (post.body ?? '')
    .replace(/\]\(\//g, `](${SITE.url}/`)
    .replace(/(src|href)="\//g, `$1="${SITE.url}/`)
    .trim();

  const faq = data.faq?.length
    ? `\n\n## ${data.lang === 'en' ? 'Frequently asked questions' : 'Questions fréquentes'}\n\n` +
      data.faq.map(({ q, a }) => `### ${q}\n\n${a}`).join('\n\n')
    : '';

  return `---\n${frontmatter}\n---\n\n# ${data.title}\n\n${data.subtitle ? `*${data.subtitle}*\n\n` : ''}${body}${faq}\n`;
}
