import type { APIContext, GetStaticPaths } from 'astro';
import { getAllPublished, getTranslation, type Post } from '../../lib/posts';
import { postMarkdown } from '../../lib/markdown';

// /<lang>/<slug>.md — Markdown twin of every article, advertised in each page's <head>
// (rel="alternate" type="text/markdown") and listed in /llms.txt, so AI agents can read
// the article without the HTML chrome.
export const getStaticPaths = (async () => {
  const all = await getAllPublished();
  return all.map((post) => ({
    params: { lang: post.data.lang, slug: post.data.slug },
    props: { post },
  }));
}) satisfies GetStaticPaths;

export async function GET({ props }: APIContext) {
  const { post } = props as { post: Post };
  const translation = await getTranslation(post);
  return new Response(postMarkdown(post, translation), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
