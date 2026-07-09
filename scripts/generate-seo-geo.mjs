import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const blogDir = resolve(root, 'blog');
const publicDir = resolve(root, 'public');
const BASE = 'https://ozturksoft.net';
const INDEXNOW_KEY = 'a7f3c9e2b1d84f6a8e0c2d5b9f1a3e7c';

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// --- RSS Feed ---
const posts = readdirSync(blogDir)
  .filter((f) => f.endsWith('.html'))
  .map((f) => {
    const html = readFileSync(resolve(blogDir, f), 'utf8');
    const slug = f.replace('.html', '');
    const title = html.match(/<title>([^<|]+)/)?.[1]?.trim() || slug;
    const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] || title;
    const date =
      html.match(/article:published_time" content="([^"]+)"/)?.[1]?.slice(0, 10) ||
      html.match(/datePublished":\s*"([^"]+)"/)?.[1]?.slice(0, 10) ||
      '2026-07-09';
    return { slug, title, desc, date };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

const rssItems = posts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${BASE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.desc)}</description>
    </item>`
  )
  .join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ozturksoft Blog — Yazılım, AI &amp; Dijital Dönüşüm</title>
    <link>${BASE}/blog</link>
    <description>Ankara merkezli Ozturksoft yazılım ve yapay zeka blogu. Fiyat rehberleri, teknik içerikler ve GEO/SEO ipuçları.</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;

mkdirSync(resolve(publicDir, 'blog'), { recursive: true });
writeFileSync(resolve(publicDir, 'blog/feed.xml'), rss);
console.log(`RSS: ${posts.length} posts → public/blog/feed.xml`);

// --- Patch blog author box ---
const AUTHOR_BOX = `
<aside class="author-box" itemscope itemtype="https://schema.org/Person">
  <div class="author-box-inner">
    <div class="author-avatar" aria-hidden="true">SÖ</div>
    <div>
      <p class="author-label">Yazar · Uzman içerik</p>
      <a href="/hakkimizda" class="author-name" itemprop="name">Samet Öztürk</a>
      <p class="author-role" itemprop="jobTitle">Founder &amp; Software Engineer — Ozturksoft, Ankara</p>
      <p class="author-bio" itemprop="description">Yapay zeka entegrasyonu, özel yazılım ve QA odaklı mühendislik konularında Ozturksoft kurucusu.</p>
    </div>
  </div>
</aside>`;

let patched = 0;
for (const f of readdirSync(blogDir).filter((x) => x.endsWith('.html'))) {
  let html = readFileSync(resolve(blogDir, f), 'utf8');
  if (html.includes('class="author-box"')) continue;
  if (html.includes('<article class="article-body">')) {
    html = html.replace('<article class="article-body">', `${AUTHOR_BOX}\n<article class="article-body">`);
    writeFileSync(resolve(blogDir, f), html);
    patched++;
  }
}
console.log(`Author box: patched ${patched} blog posts`);

// --- Sitemap: add /sss if missing ---
const sitemapPath = resolve(publicDir, 'sitemap.xml');
let sitemap = readFileSync(sitemapPath, 'utf8');
if (!sitemap.includes(`${BASE}/sss</loc>`)) {
  const today = new Date().toISOString().slice(0, 10);
  sitemap = sitemap.replace(
    '</urlset>',
    `  <url>
    <loc>${BASE}/sss</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.92</priority>
  </url>
</urlset>`
  );
  writeFileSync(sitemapPath, sitemap);
  console.log('Sitemap: added /sss');
}

export { INDEXNOW_KEY, BASE };
