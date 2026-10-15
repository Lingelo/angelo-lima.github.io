#!/usr/bin/env node
// Cross-post English articles to Dev.to as DRAFTS (published: false), with
// canonical_url pointing back to angelo-lima.fr so SEO credit stays here.
//
// Idempotent and stateless: before creating anything it lists every article on the
// Dev.to account (drafts included) and skips posts whose canonical_url already exists.
//
// Env:
//   DEVTO_API_KEY  Dev.to API key (Settings → Extensions → DEV Community API Keys)
//   DEVTO_SINCE    only sync posts dated on/after this day (YYYY-MM-DD), avoids backfilling the archive
//   DEVTO_ONLY     comma-separated slugs or translationKeys to sync regardless of DEVTO_SINCE (backfill)
//   DRY_RUN=1      print the payloads instead of calling the API
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const SITE = 'https://angelo-lima.fr';
const API = 'https://dev.to/api';
const POSTS_DIR = 'src/content/posts/en';

const { DEVTO_API_KEY, DEVTO_SINCE, DEVTO_ONLY, DRY_RUN } = process.env;
const dryRun = DRY_RUN === '1';
const only = (DEVTO_ONLY ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const since = DEVTO_SINCE ? new Date(`${DEVTO_SINCE}T00:00:00Z`) : null;

// Site tags → Dev.to tags (lowercase alphanumeric, max 4 per article).
const TAG_MAP = {
  ia: 'ai',
  development: 'programming',
  'développement': 'programming',
  web: 'webdev',
  tech: 'technology',
  'claude code': 'claudecode',
  personal: 'career',
  security: 'security',
};

const absolute = (path) => (path?.startsWith('/') ? SITE + path : path);

function readPost(file) {
  const raw = readFileSync(join(POSTS_DIR, file), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`No frontmatter in ${file}`);
  return { file, data: parse(m[1]), body: m[2] };
}

// Rewrite root-relative links and images to absolute URLs, outside fenced code blocks.
function absolutizeLinks(markdown) {
  return markdown
    .split(/(^```[\s\S]*?^```)/m)
    .map((part, i) =>
      i % 2 === 1
        ? part
        : part
            .replace(/\]\(\/(?!\/)/g, `](${SITE}/`)
            .replace(/(src|href)="\/(?!\/)/g, `$1="${SITE}/`),
    )
    .join('');
}

function toDevtoTags(tags = []) {
  const out = tags
    .map((t) => TAG_MAP[t.toLowerCase()] ?? t.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, ''))
    .filter(Boolean);
  return [...new Set(out)].slice(0, 4);
}

function buildArticle({ data, body }) {
  const canonical = `${SITE}/en/${data.slug}/`;
  let md = '';
  if (data.subtitle) md += `*${data.subtitle}*\n\n`;
  md += absolutizeLinks(body.trim());
  if (data.faq?.length) {
    md += '\n\n## Frequently asked questions\n\n';
    md += data.faq.map(({ q, a }) => `**${q}**\n\n${a}`).join('\n\n');
  }
  md += `\n\n---\n\n*Originally published on [angelo-lima.fr](${canonical}).*\n`;

  const image = absolute(data.cover ?? data.shareImg ?? data.thumbnail);
  return {
    title: data.title.slice(0, 128),
    body_markdown: md,
    published: false,
    canonical_url: canonical,
    description: data.description ?? data.subtitle ?? '',
    tags: toDevtoTags(data.tags),
    ...(image ? { main_image: image } : {}),
  };
}

async function devto(path, init = {}) {
  const res = await fetch(API + path, {
    ...init,
    headers: {
      'api-key': DEVTO_API_KEY,
      'content-type': 'application/json',
      accept: 'application/vnd.forem.api-v1+json',
      ...init.headers,
    },
  });
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}

async function existingCanonicals() {
  const urls = new Set();
  for (let page = 1; ; page++) {
    const batch = await devto(`/articles/me/all?per_page=1000&page=${page}`);
    for (const a of batch) if (a.canonical_url) urls.add(a.canonical_url.replace(/\/?$/, '/'));
    if (batch.length < 1000) return urls;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (!DEVTO_API_KEY && !dryRun) {
    console.log('::warning::DEVTO_API_KEY is not set, skipping Dev.to sync.');
    return;
  }

  const now = Date.now();
  const candidates = readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map(readPost)
    .filter(({ data }) => new Date(data.date).getTime() <= now) // scheduled posts wait for their date
    .filter(({ data }) =>
      only.length
        ? only.includes(data.slug) || only.includes(data.translationKey)
        : since && new Date(data.date) >= since,
    );

  if (!candidates.length) {
    console.log('No English article to sync.');
    return;
  }

  const existing = dryRun ? new Set() : await existingCanonicals();
  let failures = 0;
  for (const post of candidates) {
    const article = buildArticle(post);
    if (existing.has(article.canonical_url)) {
      console.log(`= already on Dev.to: ${article.canonical_url}`);
      continue;
    }
    if (dryRun) {
      console.log(JSON.stringify(article, null, 2));
      continue;
    }
    try {
      const created = await devto('/articles', { method: 'POST', body: JSON.stringify({ article }) });
      console.log(`+ draft created: ${article.title} → ${created.url}`);
      await sleep(5000); // Dev.to rate-limits article creation
    } catch (err) {
      failures++;
      console.log(`::error::${post.file}: ${err.message}`);
    }
  }
  if (failures) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
