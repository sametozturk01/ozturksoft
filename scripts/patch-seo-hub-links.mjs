import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const BASE = 'https://ozturksoft.net';
const today = new Date().toISOString().slice(0, 10);

const HUB = '/ankara-yapay-zeka-firmasi';
const FOOTER_SNIPPET = `<a href="${HUB}" style="color:#3b82f6">Ankara Yapay Zeka Firması</a>`;

// Sitemap: add hub pages with top priority
const sitemapPath = resolve(root, 'public/sitemap.xml');
let sitemap = readFileSync(sitemapPath, 'utf8');
for (const path of [HUB, '/ankara-ai-asistan', '/ankara-kamu-yapay-zeka']) {
  if (!sitemap.includes(`${BASE}${path}</loc>`)) {
    const priority = path === HUB ? '0.99' : '0.95';
    sitemap = sitemap.replace(
      '</urlset>',
      `  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
</urlset>`
    );
  }
}
// Bump hub priority if exists
sitemap = sitemap.replace(
  /(<loc>https:\/\/ozturksoft\.net\/ankara-yapay-zeka-firmasi<\/loc>\s*<lastmod>)[^<]+(<\/lastmod>\s*<changefreq>)[^<]+(<\/changefreq>\s*<priority>)[^<]+(<\/priority>)/,
  `$1${today}$2weekly$30.99$4`
);
writeFileSync(sitemapPath, sitemap);
console.log('Sitemap: ankara-yapay-zeka-firmasi priority updated');

// Patch Ankara AI blogs — add hub link in footer if missing
const blogDir = resolve(root, 'blog');
let patched = 0;
for (const f of readdirSync(blogDir).filter((x) => x.endsWith('.html'))) {
  if (!f.includes('ankara') && !f.includes('yapay-zeka') && !f.includes('llm') && !f.includes('chatbot') && !f.includes('kvkk')) continue;
  const p = resolve(blogDir, f);
  let html = readFileSync(p, 'utf8');
  if (html.includes(HUB)) continue;
  if (html.includes('blog.breadcrumb.blog')) {
    html = html.replace(
      /(<a href="\/ankara-yapay-zeka-cozumleri"[^>]*>[^<]*<\/a>)/,
      `$1 · ${FOOTER_SNIPPET}`
    );
    writeFileSync(p, html);
    patched++;
  }
}
console.log(`Blog footer hub links: ${patched} posts patched`);

// Nav: point AI link to hub on key pages
const navPages = [
  'index.html',
  'hizmetler.html',
  'hakkimizda.html',
  'iletisim.html',
  'blog.html',
  'ankara-yapay-zeka-cozumleri.html',
  'ankara-yazilim-sirketi.html',
  'ankara-ai-asistan.html',
  'ankara-kamu-yapay-zeka.html',
];
let navPatched = 0;
for (const file of navPages) {
  const p = resolve(root, file);
  try {
    let html = readFileSync(p, 'utf8');
    const next = html.replace(
      /href="\/ankara-yapay-zeka-cozumleri"/g,
      `href="${HUB}"`
    );
    if (next !== html) {
      writeFileSync(p, next);
      navPatched++;
    }
  } catch {}
}
console.log(`Nav AI hub link: ${navPatched} pages updated`);
