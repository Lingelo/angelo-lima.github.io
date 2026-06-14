import type { APIContext } from 'astro';
import { SITE } from '../site';
import { getPosts, postUrl } from '../lib/posts';

// /llms.txt — curated, machine-readable index for LLMs and AI agents (https://llmstxt.org).
// Gives generative engines (ChatGPT, Claude, Perplexity…) a clean map of the site's content.
export async function GET(ctx: APIContext) {
  const abs = (p: string) => new URL(p, ctx.site ?? SITE.url).href;
  const fr = await getPosts('fr');
  const en = await getPosts('en');

  const line = (p: (typeof fr)[number]) => {
    const desc = p.data.description ?? p.data.subtitle ?? '';
    return `- [${p.data.title}](${abs(postUrl(p))})${desc ? `: ${desc}` : ''}`;
  };

  const body = `# ${SITE.title}

> ${SITE.descriptionFr}

Blog personnel bilingue (français / anglais) d'Angelo Lima, développeur web full-stack franco-portugais spécialisé en intelligence artificielle. Articles techniques sur le développement web, l'IA et les LLMs (Claude, ChatGPT, Ollama), Claude Code, la sécurité et l'ingénierie logicielle.

Auteur : ${SITE.author} — ${abs('/aboutme/')}

## Points d'entrée
- Accueil (FR) : ${abs('/')}
- Accueil (EN) : ${abs('/en/')}
- Index des tags (FR) : ${abs('/tags/')}
- Index des tags (EN) : ${abs('/en/tags/')}
- Flux RSS (FR) : ${abs('/feed.xml')}
- Flux RSS (EN) : ${abs('/en/feed.xml')}
- Sitemap : ${abs('/sitemap.xml')}

## Articles (Français)
${fr.map(line).join('\n')}

## Articles (English)
${en.map(line).join('\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
