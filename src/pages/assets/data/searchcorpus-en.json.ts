import { getPosts, postUrl, stripMarkdown, formatDate } from '../../../lib/posts';

// Build-time search index (EN). Regenerated on every build from the content collection.
export async function GET() {
  const posts = await getPosts('en');
  const corpus = posts.map((p) => ({
    title: p.data.title,
    desc: p.data.subtitle ?? '',
    category: p.data.tags.join(', '),
    url: postUrl(p),
    date: formatDate(p.data.date, 'en'),
    content: stripMarkdown(p.body ?? '').slice(0, 600),
  }));
  return new Response(JSON.stringify(corpus), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
