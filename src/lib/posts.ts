import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../site';

export type Post = CollectionEntry<'posts'>;

/**
 * A post is published once its date is reached — mirrors Jekyll's future-date exclusion
 * (the Daily Rebuild workflow re-runs the build so scheduled posts appear on their date).
 * In `astro dev` everything is shown so future drafts can be previewed.
 */
export const isPublished = (p: Post): boolean =>
  import.meta.env.DEV || p.data.date.getTime() <= Date.now();

const byDateDesc = (a: Post, b: Post) => {
  const d = b.data.date.getTime() - a.data.date.getTime();
  return d !== 0 ? d : b.id.localeCompare(a.id);
};

/** All published posts for a language, newest first (filename slug breaks same-day ties). */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const all = await getCollection('posts', (p) => p.data.lang === lang && isPublished(p));
  return all.sort(byDateDesc);
}

/** Every published post (both languages) — used to generate static routes. */
export async function getAllPublished(): Promise<Post[]> {
  return (await getCollection('posts', isPublished)).sort(byDateDesc);
}

/** The article URL, e.g. /fr/conventional-commits/ */
export const postUrl = (p: Post) => `/${p.data.lang}/${p.data.slug}/`;

/** Find the translation (same translationKey, other language). */
export async function getTranslation(post: Post): Promise<Post | undefined> {
  const other: Lang = post.data.lang === 'fr' ? 'en' : 'fr';
  const candidates = await getCollection(
    'posts',
    (p) =>
      p.data.lang === other &&
      p.data.translationKey === post.data.translationKey &&
      isPublished(p),
  );
  return candidates[0];
}

/** Up to `max` posts in the same language sharing at least one tag, newest first. */
export async function relatedPosts(post: Post, max = 3): Promise<Post[]> {
  const sameLang = await getPosts(post.data.lang);
  const tags = new Set(post.data.tags);
  return sameLang
    .filter((p) => p.id !== post.id && p.data.tags.some((t) => tags.has(t)))
    .slice(0, max);
}

/**
 * Prev/next within the same language. The list is newest→oldest, so:
 *   prev = the more recent article ("Précédent")
 *   next = the older article ("Suivant")
 * Matches the language-filtered behaviour from _layouts/post.html.
 */
export function prevNext(post: Post, postsInLang: Post[]) {
  const i = postsInLang.findIndex((p) => p.id === post.id);
  return {
    prev: i > 0 ? postsInLang[i - 1] : undefined,
    next: i >= 0 && i < postsInLang.length - 1 ? postsInLang[i + 1] : undefined,
  };
}

/** Locale-aware date string. fr → "24 déc. 2024", en → "Dec 24, 2024". */
export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', {
    year: 'numeric',
    month: 'short',
    day: lang === 'en' ? 'numeric' : '2-digit',
    timeZone: 'UTC',
  });
}

export const isoDate = (date: Date) => date.toISOString();

/** Rough reading time in minutes (≈200 wpm), like the old readtime.html. */
export function readingTime(body: string): number {
  const words = stripMarkdown(body).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** First-paragraph excerpt from the body, trimmed to `words` words (like Jekyll's post.excerpt). */
export function excerpt(post: Post, words = 25): string {
  const text = stripMarkdown(post.body ?? '');
  const arr = text.split(/\s+/).filter(Boolean);
  const slice = arr.slice(0, words).join(' ');
  return arr.length > words ? slice + '…' : slice;
}

export function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ') // code fences
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → text
    .replace(/^#{1,6}\s+/gm, '') // headings
    .replace(/[*_>#~|-]+/g, ' ') // md punctuation
    .replace(/\s+/g, ' ')
    .trim();
}
