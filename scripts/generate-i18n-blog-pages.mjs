import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  ARTICLE_FILE_PREFIX,
  LOCALE_LANGS,
  OG_LOCALE,
  SCHEMA_LANG,
  blogUrl,
  buildHreflangTags,
  BASE,
} from './blog-i18n-config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');
const blogDistDir = resolve(distDir, 'blog');
const articlesDir = resolve(root, 'src/i18n/articles');
const i18nDir = resolve(root, 'src/i18n');

const translations = {};
for (const lang of ['tr', ...LOCALE_LANGS]) {
  translations[lang] = JSON.parse(readFileSync(resolve(i18nDir, `${lang}.json`), 'utf8'));
}

function getAvailableLangs(articleKey) {
  const prefix = ARTICLE_FILE_PREFIX[articleKey];
  if (!prefix) return [];
  return LOCALE_LANGS.filter((lang) =>
    existsSync(resolve(articlesDir, `${prefix}-${lang}.html`))
  );
}

function getPostTitle(lang, articleKey, fallback) {
  const title = translations[lang]?.blog?.posts?.[articleKey]?.title;
  return title || fallback;
}

function replaceArticleBody(html, body) {
  return html.replace(
    /(<article class="article-body">)([\s\S]*?)(<\/article>)/,
    `$1\n${body}\n$3`
  );
}

function replaceMeta(html, { lang, slug, title, description, articleKey, langs }) {
  const canonical = blogUrl(lang, slug);
  const hreflang = buildHreflangTags(slug, langs);
  const ogLocale = OG_LOCALE[lang] || 'en_US';
  const schemaLang = SCHEMA_LANG[lang] || 'en-US';

  let out = html;
  out = out.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title} | Ozturksoft</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${description.replace(/"/g, '&quot;')}">`
  );
  out = out.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`);
  out = out.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>\n?/g, '');
  out = out.replace(/(<link rel="canonical" href="[^"]+" \/>)/, `$1\n${hreflang}`);

  out = out.replace(/<meta property="og:title" content="[^"]*">/g, `<meta property="og:title" content="${title} | Ozturksoft">`);
  out = out.replace(/<meta property="og:description" content="[^"]*">/g, `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}">`);
  out = out.replace(/<meta property="og:url" content="[^"]*">/g, `<meta property="og:url" content="${canonical}">`);
  out = out.replace(/<meta property="og:locale" content="[^"]*">/g, `<meta property="og:locale" content="${ogLocale}">`);
  out = out.replace(/<meta name="twitter:title" content="[^"]*">/g, `<meta name="twitter:title" content="${title}">`);
  out = out.replace(/<meta name="twitter:description" content="[^"]*">/g, `<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}">`);

  out = out.replace(/"inLanguage":\s*"[^"]*"/g, `"inLanguage": "${schemaLang}"`);
  out = out.replace(/"headline":\s*"[^"]*"/g, `"headline": "${title.replace(/"/g, '\\"')}"`);

  // Update JSON-LD URLs only (not hreflang link tags)
  out = out.replace(
    /(<script type="application\/ld\+json">[\s\S]*?<\/script>)/g,
    (block) => block.replace(
      new RegExp(`https://ozturksoft\\.net/blog/${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'),
      canonical
    )
  );

  const langsAttr = ['tr', ...langs].join(',');
  if (lang !== 'tr') {
    if (out.includes('data-page-lang=')) {
      out = out.replace(/data-page-lang="[^"]*"/, `data-page-lang="${lang}"`);
    } else {
      out = out.replace(/<body([^>]*)>/, `<body$1 data-page-lang="${lang}">`);
    }
  } else {
    out = out.replace(/\s*data-page-lang="[^"]*"/, '');
  }
  out = out.replace(/data-i18n-langs="[^"]*"/, `data-i18n-langs="${langsAttr}"`);

  return out;
}

function extractMeta(html) {
  const title = html.match(/<title>([^<|]+)/)?.[1]?.trim() || '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] || title;
  const articleKey = html.match(/data-article="([^"]+)"/)?.[1];
  return { title, desc, articleKey };
}

if (!existsSync(blogDistDir)) {
  console.error('dist/blog not found — run vite build first');
  process.exit(1);
}

const sourceBlogDir = resolve(root, 'blog');
const sitemapEntries = [];
let generated = 0;

console.log('Generating localized blog pages...');

for (const file of readdirSync(sourceBlogDir).filter((f) => f.endsWith('.html'))) {
  const slug = file.replace('.html', '');
  const builtPath = resolve(blogDistDir, file);
  if (!existsSync(builtPath)) {
    console.warn(`  skip ${slug} — not in dist`);
    continue;
  }

  const sourceHtml = readFileSync(resolve(sourceBlogDir, file), 'utf8');
  const builtHtml = readFileSync(builtPath, 'utf8');
  const { title: trTitle, desc: trDesc, articleKey } = extractMeta(sourceHtml);
  if (!articleKey) continue;

  const prefix = ARTICLE_FILE_PREFIX[articleKey];
  const langs = getAvailableLangs(articleKey);
  const langsAttr = langs;

  // Patch TR dist with hreflang
  const trPatched = replaceMeta(builtHtml, {
    lang: 'tr',
    slug,
    title: trTitle,
    description: trDesc,
    articleKey,
    langs: langsAttr,
  });
  writeFileSync(builtPath, trPatched);

  for (const lang of langs) {
    const articlePath = resolve(articlesDir, `${prefix}-${lang}.html`);
    const body = readFileSync(articlePath, 'utf8');
    const title = getPostTitle(lang, articleKey, trTitle);
    const description = getPostTitle(lang, articleKey, trDesc) || trDesc;

    const outDir = resolve(distDir, lang, 'blog');
    mkdirSync(outDir, { recursive: true });

    let page = replaceArticleBody(builtHtml, body);
    page = replaceMeta(page, {
      lang,
      slug,
      title,
      description,
      articleKey,
      langs: langsAttr,
    });

    writeFileSync(resolve(outDir, file), page);
    sitemapEntries.push({ lang, slug });
    generated++;
    console.log(`  ${lang}/blog/${slug}`);
  }
}

// Update sitemap
const sitemapPath = resolve(root, 'public/sitemap.xml');
let sitemap = readFileSync(sitemapPath, 'utf8');
const today = new Date().toISOString().slice(0, 10);

// Remove old localized blog entries if re-running
sitemap = sitemap.replace(
  /\s*<url>\s*<loc>https:\/\/ozturksoft\.net\/(en|de|fr|ar|ru)\/blog\/[^<]+<\/loc>[\s\S]*?<\/url>/g,
  ''
);

const newUrls = sitemapEntries
  .map(({ lang, slug }) => `  <url>
    <loc>${blogUrl(lang, slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`)
  .join('\n');

sitemap = sitemap.replace('</urlset>', `${newUrls}\n</urlset>`);
writeFileSync(sitemapPath, sitemap);

console.log(`\nDone: ${generated} localized pages + sitemap updated`);
