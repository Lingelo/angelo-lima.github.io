#!/usr/bin/env node
// Merge legacy pagination redirects (/page2/ → /page/2/, /en/page2/ → /en/page/2/) into
// src/redirects.json. The old JS pagination used /pageN/; native pagination uses /page/N/.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PER_PAGE = 6;

function postCount(lang) {
  // Count migrated posts for a language.
  return readdirSync(join(ROOT, 'src', 'content', 'posts', lang)).filter((f) => f.endsWith('.md'))
    .length;
}

const redirectsPath = join(ROOT, 'src', 'redirects.json');
const redirects = JSON.parse(readFileSync(redirectsPath, 'utf-8'));

for (const lang of ['fr', 'en']) {
  const total = Math.max(1, Math.ceil((postCount(lang) - 1) / PER_PAGE));
  const prefix = lang === 'en' ? '/en' : '';
  for (let n = 2; n <= total; n++) {
    redirects[`${prefix}/page${n}/`] = `${prefix}/page/${n}/`;
  }
}

writeFileSync(redirectsPath, JSON.stringify(redirects, null, 2) + '\n');
console.log(`Total redirects after pagination merge: ${Object.keys(redirects).length}`);
