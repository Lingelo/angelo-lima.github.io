#!/usr/bin/env node
// One-shot migration: Jekyll _posts/*.md  →  Astro src/content/posts/{fr,en}/*.md
//
// For each post we:
//   - split fr/en by the `categories` field,
//   - derive the URL slug from the filename (Jekyll's :title = filename minus date),
//   - rebuild the front matter (ref→translationKey, *-img→cover/thumbnail/shareImg, ISO date),
//   - record the legacy URL as an alias (reproduces _plugins/redirect_generator.rb + .html stubs).
//
// It also writes src/redirects.json (legacy URL → new URL) and a migration report.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const POSTS_DIR = join(ROOT, '_posts');
const OUT_DIR = join(ROOT, 'src', 'content', 'posts');

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})-(.+)$/;

/** Minimal front-matter parser tailored to these files (quoted scalars + [a, b] arrays). */
function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) throw new Error('no front matter');
  const end = raw.indexOf('\n---', 3);
  const fmBlock = raw.slice(3, end).trim();
  const body = raw.slice(raw.indexOf('\n', end + 1) + 1).replace(/^\s*\n/, '');
  const data = {};
  for (const line of fmBlock.split('\n')) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val
        .slice(1, -1)
        .split(',')
        .map((s) => unquote(s.trim()))
        .filter((s) => s !== '');
    } else {
      val = unquote(val);
    }
    data[key] = val;
  }
  return { data, body };
}

function unquote(s) {
  if (s.length >= 2 && ((s[0] === '"' && s.at(-1) === '"') || (s[0] === "'" && s.at(-1) === "'"))) {
    return s.slice(1, -1);
  }
  return s;
}

/** Emit a YAML double-quoted scalar (JSON string syntax is valid YAML). */
const yamlStr = (s) => JSON.stringify(String(s));

function buildFrontmatter(fm) {
  const lines = ['---'];
  lines.push(`title: ${yamlStr(fm.title)}`);
  if (fm.subtitle) lines.push(`subtitle: ${yamlStr(fm.subtitle)}`);
  if (fm.description) lines.push(`description: ${yamlStr(fm.description)}`);
  lines.push(`date: ${fm.date}`);
  if (fm.lastUpdated) lines.push(`lastUpdated: ${fm.lastUpdated}`);
  lines.push(`lang: ${fm.lang}`);
  lines.push(`translationKey: ${yamlStr(fm.translationKey)}`);
  lines.push(`slug: ${yamlStr(fm.slug)}`);
  lines.push('tags:');
  for (const t of fm.tags) lines.push(`  - ${yamlStr(t)}`);
  if (fm.tags.length === 0) lines[lines.length - 1] = 'tags: []';
  lines.push(`author: ${yamlStr(fm.author)}`);
  if (fm.cover) lines.push(`cover: ${yamlStr(fm.cover)}`);
  if (fm.thumbnail) lines.push(`thumbnail: ${yamlStr(fm.thumbnail)}`);
  if (fm.shareImg) lines.push(`shareImg: ${yamlStr(fm.shareImg)}`);
  lines.push('aliases:');
  for (const a of fm.aliases) lines.push(`  - ${yamlStr(a)}`);
  if (fm.aliases.length === 0) lines[lines.length - 1] = 'aliases: []';
  if (fm.mathjax) lines.push('mathjax: true');
  lines.push('---', '');
  return lines.join('\n');
}

// Fresh output dirs.
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(join(OUT_DIR, 'fr'), { recursive: true });
mkdirSync(join(OUT_DIR, 'en'), { recursive: true });

const redirects = {};
const report = [];
let count = 0;

for (const file of readdirSync(POSTS_DIR).sort()) {
  if (!file.endsWith('.md')) continue;
  const base = file.replace(/\.md$/, '');
  const m = base.match(DATE_RE);
  if (!m) {
    console.warn(`SKIP (no date prefix): ${file}`);
    continue;
  }
  const [, y, mo, d, slug] = m;
  const raw = readFileSync(join(POSTS_DIR, file), 'utf-8');
  const { data, body } = parseFrontmatter(raw);

  const lang = (data.lang || data.categories || 'fr').trim();
  const categories = (data.categories || lang).trim();
  if (lang !== 'fr' && lang !== 'en') {
    console.warn(`SKIP (unknown lang ${lang}): ${file}`);
    continue;
  }

  const newUrl = `/${categories}/${slug}/`;
  const legacyAlias = categories === 'en' ? `/en/${base}/` : `/${base}/`;

  const fm = {
    title: data.title || slug,
    subtitle: data.subtitle,
    description: data.description,
    // Noon UTC keeps the calendar day stable in every timezone when formatting.
    date: `${y}-${mo}-${d}T12:00:00.000Z`,
    lastUpdated: data['last-updated'] ? `${data['last-updated']}T12:00:00.000Z` : undefined,
    lang,
    translationKey: data.ref || slug,
    slug,
    tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
    author: data.author || 'Angelo Lima',
    cover: data['cover-img'],
    thumbnail: data['thumbnail-img'],
    shareImg: data['share-img'],
    aliases: [legacyAlias],
    mathjax: data.mathjax === 'true' || data.mathjax === true,
  };

  writeFileSync(join(OUT_DIR, lang, file), buildFrontmatter(fm) + body);
  redirects[legacyAlias] = newUrl;
  report.push({ file, lang, slug, url: newUrl, alias: legacyAlias, ref: fm.translationKey });
  count++;
}

// Persist redirects (post-level). Pagination redirects are appended later by add-pagination-redirects.mjs.
writeFileSync(join(ROOT, 'src', 'redirects.json'), JSON.stringify(redirects, null, 2) + '\n');
writeFileSync(join(ROOT, 'scripts', 'migration-report.json'), JSON.stringify(report, null, 2) + '\n');

// Quick integrity summary.
const fr = report.filter((r) => r.lang === 'fr').length;
const en = report.filter((r) => r.lang === 'en').length;
const refs = {};
for (const r of report) (refs[r.ref] ??= []).push(r.lang);
const paired = Object.values(refs).filter((l) => l.includes('fr') && l.includes('en')).length;
const orphans = Object.entries(refs).filter(([, l]) => l.length === 1);

console.log(`Migrated ${count} posts → ${fr} fr / ${en} en`);
console.log(`Translation pairs (fr+en): ${paired}`);
console.log(`Orphan refs (single language): ${orphans.length}`);
for (const [ref, l] of orphans) console.log(`  - ${ref} (${l.join(',')})`);
console.log(`Redirects written: ${Object.keys(redirects).length}`);
