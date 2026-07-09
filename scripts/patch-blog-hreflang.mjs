import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import {
  ARTICLE_FILE_PREFIX,
  LOCALE_LANGS,
  buildHreflangTags,
} from './blog-i18n-config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const blogDir = resolve(root, 'blog');
const articlesDir = resolve(root, 'src/i18n/articles');

function getAvailableLangs(articleKey) {
  const prefix = ARTICLE_FILE_PREFIX[articleKey];
  if (!prefix) return [];
  return LOCALE_LANGS.filter((lang) =>
    existsSync(resolve(articlesDir, `${prefix}-${lang}.html`))
  );
}

function patchFile(filePath) {
  let html = readFileSync(filePath, 'utf8');
  const slug = filePath.replace(/.*\//, '').replace('.html', '');
  const articleMatch = html.match(/data-article="([^"]+)"/);
  if (!articleMatch) return false;

  const articleKey = articleMatch[1];
  const langs = getAvailableLangs(articleKey);
  const hreflangBlock = buildHreflangTags(slug, langs);
  const langsAttr = ['tr', ...langs].join(',');

  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>\n?/g, '');
  html = html.replace(
    /(<link rel="canonical" href="[^"]+" \/>)/,
    `$1\n${hreflangBlock}`
  );

  if (html.includes('data-i18n-langs=')) {
    html = html.replace(/data-i18n-langs="[^"]*"/, `data-i18n-langs="${langsAttr}"`);
  } else {
    html = html.replace(
      /<body([^>]*)>/,
      `<body$1 data-i18n-langs="${langsAttr}">`
    );
  }

  writeFileSync(filePath, html);
  console.log(`  ${slug}: tr + ${langs.join(', ')}`);
  return { slug, articleKey, langs };
}

const files = readdirSync(blogDir).filter((f) => f.endsWith('.html'));
const manifest = [];
console.log('Patching hreflang on Turkish blog pages...');
for (const f of files) {
  const result = patchFile(resolve(blogDir, f));
  if (result) manifest.push(result);
}

export { manifest };
