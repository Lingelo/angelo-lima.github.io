import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../site';
import { getPosts, postUrl, excerpt } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = (await getPosts('fr')).slice(0, 20);
  return rss({
    title: SITE.title,
    description: 'Feed RSS angelo-lima.fr',
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.subtitle ?? excerpt(p, 50),
      link: postUrl(p),
      categories: p.data.tags,
    })),
    customData: '<language>fr-FR</language>',
  });
}
