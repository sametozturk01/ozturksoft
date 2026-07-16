import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { buildHreflangTags } from './blog-i18n-config.mjs';
import { PHASE_POSTS, PHASE_LOCALE_BODIES } from './phase-blogs-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const template = readFileSync(resolve(root, 'blog/ankara-telekom-yazilim-2026.html'), 'utf8');
const articlesDir = resolve(root, 'src/i18n/articles');
const blogDir = resolve(root, 'blog');
const LOCALES = ['en', 'de', 'fr', 'ar', 'ru'];

function faqSchema(faq) {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
    null,
    2
  );
}

function buildPage(post) {
  const hreflang = buildHreflangTags(post.slug, ['en', 'de', 'fr', 'ar', 'ru']);
  let html = template;

  html = html.replace(/ankara-telekom-yazilim-2026/g, post.slug);
  html = html.replace(/data-article="ankaraTelecom"/, `data-article="${post.articleKey}"`);
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="https://ozturksoft.net/blog/${post.slug}" />`);
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>\n?/g, '');
  html = html.replace(/(<link rel="canonical" href="[^"]+" \/>)/, `$1\n${hreflang}`);

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${post.title} | Ozturksoft</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${post.desc}">`);
  html = html.replace(/<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="${post.keywords}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${post.ogTitle}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${post.desc}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${post.ogTitle}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${post.twitterDesc}">`);
  html = html.replace(/"article:section" content="[^"]*"/, `"article:section" content="${post.section}"`);
  html = html.replace(/2026-07-09T17:00:00\+03:00/g, post.published);
  html = html.replace(/"headline": "[^"]*"/, `"headline": "${post.title.replace(/"/g, '\\"')}"`);
  html = html.replace(/"description": "[^"]*"/, `"description": "${post.desc.replace(/"/g, '\\"')}"`, 1);
  html = html.replace(
    /"keywords": \[[^\]]*\]/,
    `"keywords": ${JSON.stringify(post.keywords.split(', ').map((k) => k.trim()))}`
  );

  html = html.replace(
    /<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "FAQPage"[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n  ${faqSchema(post.faq)}\n  </script>`
  );

  const metaDateKey = post.metaDateKey || 'blog.meta.date7';
  const metaReadKey = post.metaReadKey || `blog.meta.read${post.readMins}`;

  html = html.replace(/blog\.posts\.ankaraTelecom\./g, `blog.posts.${post.articleKey}.`);
  html = html.replace(
    /<body data-article="[^"]*"[^>]*>/,
    `<body data-article="${post.articleKey}" data-i18n-date="${metaDateKey}" data-i18n-read="${metaReadKey}" data-i18n-langs="tr,en,de,fr,ar,ru">`
  );
  html = html.replace(/data-i18n="blog\.meta\.date6"/, `data-i18n="${metaDateKey}"`);
  html = html.replace(/data-i18n="blog\.meta\.read9"/, `data-i18n="${metaReadKey}"`);
  html = html.replace(
    new RegExp(`(<span data-i18n="blog\\.posts\\.${post.articleKey}\\.breadcrumb">)[^<]*`),
    `$1${post.breadcrumb}`
  );
  html = html.replace(
    new RegExp(`(<span class="article-tag" data-i18n="blog\\.posts\\.${post.articleKey}\\.tag">)[^<]*`),
    `$1${post.tag}`
  );
  html = html.replace(
    new RegExp(`(<h1 data-i18n="blog\\.posts\\.${post.articleKey}\\.title">)[^<]*`),
    `$1${post.title}`
  );
  html = html.replace(
    new RegExp(`(<span data-i18n="${metaDateKey.replace(/\./g, '\\.')}">)[^<]*`),
    `$1${post.date}`
  );
  html = html.replace(
    new RegExp(`(<span data-i18n="${metaReadKey.replace(/\./g, '\\.')}">)[^<]*`),
    `$1${post.readMins} dk okuma`
  );

  html = html.replace(/(<article class="article-body">)[\s\S]*?(<\/article>)/, `$1\n\n${post.bodyTr}\n\n$2`);
  return html;
}

for (const post of PHASE_POSTS) {
  writeFileSync(resolve(blogDir, `${post.slug}.html`), buildPage(post));
  const bodies = PHASE_LOCALE_BODIES[post.filePrefix];
  for (const lang of LOCALES) {
    const body = bodies?.[lang];
    if (body) writeFileSync(resolve(articlesDir, `${post.filePrefix}-${lang}.html`), body.trim() + '\n');
  }
  console.log(`✓ blog/${post.slug}.html + articles/${post.filePrefix}-{en,de,fr,ar,ru}.html`);
}

console.log(`Done: ${PHASE_POSTS.length} phase blog posts.`);
