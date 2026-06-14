import { slugifyTag, type Lang } from '../site';
import { getPosts, type Post } from './posts';

export interface TagGroup {
  tag: string; // original tag label, e.g. "Développement"
  slug: string; // url slug, e.g. "developpement"
  posts: Post[]; // posts in this language with this tag, newest first
}

/** All tags used by posts of a language, alphabetically, each with its (newest-first) posts. */
export async function getTagGroups(lang: Lang): Promise<TagGroup[]> {
  const posts = await getPosts(lang); // already newest-first
  const map = new Map<string, Post[]>();
  for (const p of posts) {
    for (const tag of p.data.tags) {
      const clean = tag.trim();
      if (!clean) continue;
      if (!map.has(clean)) map.set(clean, []);
      map.get(clean)!.push(p);
    }
  }
  return [...map.entries()]
    .map(([tag, posts]) => ({ tag, slug: slugifyTag(tag), posts }))
    .sort((a, b) => a.tag.localeCompare(b.tag, lang === 'en' ? 'en' : 'fr'));
}
