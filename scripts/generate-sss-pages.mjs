import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SSS_DATA, SSS_LOCALES } from './sss-faq/index.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const BASE = 'https://ozturksoft.net';

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function hreflangBlock() {
  const lines = SSS_LOCALES.map((l) => {
    const href = `${BASE}${l.urlPath}`;
    return `  <link rel="alternate" hreflang="${l.lang}" href="${href}" />`;
  });
  lines.push(`  <link rel="alternate" hreflang="x-default" href="${BASE}/sss" />`);
  return lines.join('\n');
}

function faqSchema(items) {
  const mainEntity = items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: stripHtml(item.html) },
  }));
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity }, null, 2);
}

function faqArticles(items) {
  return items
    .map(
      (item) => `    <article class="sss-item" id="${item.id}">
      <h2>${item.q}</h2>
      <p>${item.html}</p>
    </article>`
    )
    .join('\n');
}

function buildPage(locale, data) {
  const canonical = `${BASE}${locale.urlPath}`;
  const rtl = locale.lang === 'ar' ? ' dir="rtl"' : '';
  const navFaqStyle = ' style="color:var(--primary)"';

  return `<!DOCTYPE html>
<html lang="${locale.lang}"${rtl}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(data.meta.title)}</title>
  <meta name="description" content="${esc(data.meta.description)}" />
  <meta name="keywords" content="${esc(data.meta.keywords)}" />
  <meta name="robots" content="index, follow">
  <meta name="geo.region" content="TR-06" />
  <meta name="geo.placename" content="Ankara" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" type="application/rss+xml" href="${BASE}/blog/feed.xml" title="Ozturksoft Blog RSS" />
  <link rel="alternate" type="text/plain" href="${BASE}/llms.txt" title="LLM Context" />
  <link rel="alternate" type="text/plain" href="${BASE}/ai.txt" title="AI Context" />
${hreflangBlock()}
  <link rel="icon" href="/favicon.ico" sizes="any">
  <meta property="og:title" content="${esc(data.meta.ogTitle || data.meta.title)}">
  <meta property="og:description" content="${esc(data.meta.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${BASE}/og-image.png">
  <meta property="og:type" content="website">
  <script type="application/ld+json">
${faqSchema(data.items)}
  </script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" crossorigin>
  <link rel="stylesheet" href="/src/style.css">
  <style>
    .sss-hero{padding:130px 8% 50px;max-width:900px}
    .sss-hero h1{font-size:2.4rem;font-weight:800;margin-bottom:12px}
    .sss-hero p{color:var(--text-dim);font-size:1.05rem}
    .sss-cats{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
    .sss-cats a{font-size:.78rem;padding:6px 12px;border-radius:20px;background:rgba(59,130,246,.1);color:var(--primary);text-decoration:none;border:1px solid rgba(59,130,246,.2)}
    .sss-cats a:hover{background:rgba(59,130,246,.2)}
    .sss-list{max-width:860px;margin:0 auto;padding:20px 8% 80px}
    .sss-item{border-bottom:1px solid rgba(255,255,255,.08);padding:24px 0}
    .sss-item h2{font-size:1.15rem;font-weight:700;color:#fff;margin-bottom:10px}
    .sss-item p{color:var(--text-dim);line-height:1.75;font-size:1rem}
    .sss-item a{color:var(--primary)}
    .sss-quick{background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:12px;padding:20px 24px;margin-bottom:32px}
    .sss-quick p{color:#c7d2fe;margin:0;font-size:.95rem}
  </style>
</head>
<body data-page-lang="${locale.lang}">
  <nav>
    <a href="${locale.home}"><img src="/images/logo.png" alt="Ozturksoft" class="logo-img" height="80"></a>
    <ul class="nav-links" id="navLinks">
      <li><a href="${locale.home}">${locale.nav.home}</a></li>
      <li><a href="${locale.services}">${locale.nav.services}</a></li>
      <li><a href="${locale.blog}">${locale.nav.blog}</a></li>
      <li><a href="${locale.faq}"${navFaqStyle}>${locale.nav.faq}</a></li>
      <li><a href="${locale.contact}">${locale.nav.contact}</a></li>
    </ul>
    <a href="${locale.contact}" class="btn btn-primary" style="padding:10px 20px;font-size:.85rem">${locale.nav.quote}</a>
  </nav>

  <header class="sss-hero">
    <h1>${data.hero.title}</h1>
    <p>${data.hero.subtitle}</p>
    <div class="sss-quick" style="margin-top:24px">
      <p>${data.hero.quick}</p>
    </div>
    <nav class="sss-cats" aria-label="FAQ categories">
      ${data.categories.map((c) => `<a href="#${c.id}">${c.label}</a>`).join('\n      ')}
    </nav>
  </header>

  <section class="sss-list">
${faqArticles(data.items)}
  </section>

  <footer style="text-align:center;padding:30px;color:#64748b;border-top:1px solid rgba(255,255,255,.06)">
    <p>© 2026 Ozturksoft — Ankara | <a href="/blog/feed.xml" style="color:#3b82f6">RSS</a> · <a href="/ai.txt" style="color:#3b82f6">ai.txt</a> · <a href="/llms.txt" style="color:#3b82f6">llms.txt</a></p>
  </footer>
</body>
</html>`;
}

for (const locale of SSS_LOCALES) {
  const data = SSS_DATA[locale.lang];
  if (!data) throw new Error(`Missing SSS_DATA for ${locale.lang}`);
  const outPath = resolve(root, locale.file);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buildPage(locale, data));
  console.log(`✓ ${locale.file} (${data.items.length} FAQ)`);
}

// Sitemap: ensure all FAQ URLs
const sitemapPath = resolve(root, 'public/sitemap.xml');
let sitemap = readFileSync(sitemapPath, 'utf8');
const today = new Date().toISOString().slice(0, 10);

for (const locale of SSS_LOCALES) {
  const loc = `${BASE}${locale.urlPath}`;
  if (sitemap.includes(`<loc>${loc}</loc>`)) continue;
  sitemap = sitemap.replace(
    '</urlset>',
    `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.92</priority>
  </url>
</urlset>`
  );
}
writeFileSync(sitemapPath, sitemap);
console.log('Sitemap: FAQ URLs updated');

// llms.txt — multilingual FAQ URLs
const llmsPath = resolve(root, 'public/llms.txt');
let llms = readFileSync(llmsPath, 'utf8');
const faqBlock = `## FAQ Hub (multilingual)
- Turkish: ${BASE}/sss
- English: ${BASE}/en/faq
- German: ${BASE}/de/faq
- French: ${BASE}/fr/faq
- Arabic: ${BASE}/ar/faq
- Russian: ${BASE}/ru/faq
`;
if (!llms.includes('## FAQ Hub (multilingual)')) {
  llms = llms.replace('## FAQ Hub (cite for quick answers)', `${faqBlock}## FAQ Hub (cite for quick answers)`);
  writeFileSync(llmsPath, llms);
  console.log('llms.txt: FAQ locale URLs added');
}
