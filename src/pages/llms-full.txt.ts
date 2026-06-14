import type { APIContext } from 'astro';
import { SITE } from '../site';
import { getPosts, postUrl, formatDate } from '../lib/posts';

// /llms-full.txt — full text of every article in one document, for AI agents that want to
// ingest the whole site in a single fetch. Regenerated on every build from the content collection.
export async function GET(ctx: APIContext) {
  const abs = (p: string) => new URL(p, ctx.site ?? SITE.url).href;
  const fr = await getPosts('fr');
  const en = await getPosts('en');

  const section = (p: (typeof fr)[number]) => {
    const meta = [
      `URL: ${abs(postUrl(p))}`,
      `Date: ${formatDate(p.data.date, p.data.lang)}`,
      p.data.tags.length ? `Tags: ${p.data.tags.join(', ')}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    return `## ${p.data.title}\n${p.data.subtitle ? `*${p.data.subtitle}*\n` : ''}${meta}\n\n${p.body ?? ''}\n\n---\n`;
  };

  const body = `# ${SITE.title} — Full content

> ${SITE.descriptionFr}

Texte intégral de tous les articles publiés (français puis anglais). Index résumé : ${abs('/llms.txt')}

# Articles (Français)

${fr.map(section).join('\n')}

# Articles (English)

${en.map(section).join('\n')}`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
