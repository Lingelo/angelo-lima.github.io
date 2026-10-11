import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE, escapeHtml, rssSupportHtml } from '../../site';
import { getPosts, postUrl, excerpt } from '../../lib/posts';

export async function GET(context: APIContext) {
  const posts = (await getPosts('en')).slice(0, 20);
  return rss({
    title: `${SITE.title} - English`,
    description: 'angelo-lima.fr RSS feed',
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: `<p>${escapeHtml(p.data.subtitle ?? excerpt(p, 50))}</p>${rssSupportHtml('en')}`,
      link: postUrl(p),
      categories: p.data.tags,
    })),
    customData: '<language>en-US</language>',
  });
}
