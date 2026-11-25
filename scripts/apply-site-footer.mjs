// Puts the shared site footer (scripts/site-footer.html) on every page.
// Usage: node scripts/apply-site-footer.mjs dist      -> all built pages, footer text in the page language
//        node scripts/apply-site-footer.mjs --src     -> tracked source pages (Turkish text, translated at runtime)
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE = readFileSync(join(root, 'scripts/site-footer.html'), 'utf8').trim();
const DICTS = {};
for (const l of ['tr', 'en', 'de', 'fr', 'ar', 'ru']) DICTS[l] = JSON.parse(readFileSync(join(root, `src/i18n/${l}.json`), 'utf8'));
const CSS = '<link rel="stylesheet" href="/site-footer.css">';
const FA = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" crossorigin>';

const get = (d, key) => key.split('.').reduce((o, k) => (o && typeof o === 'object' ? o[k] : undefined), d);
const esc = (s) => s.replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function footerFor(lang) {
  if (lang === 'tr' || !DICTS[lang]) return TEMPLATE;
  return TEMPLATE.replace(/data-i18n="([^"]+)">([^<]*)</g, (m, key, text) => {
    const v = get(DICTS[lang], key);
    return `data-i18n="${key}">${typeof v === 'string' ? esc(v) : text}<`;
  });
}

export function applyFooter(html) {
  const lang = ((html.match(/<html[^>]*\slang="([a-z]{2})/i) || [])[1] || 'tr').toLowerCase();
  const start = html.lastIndexOf('<footer');
  if (start === -1) return html;
  const end = html.indexOf('</footer>', start);
  if (end === -1) return html;
  let out = html.slice(0, start) + footerFor(lang) + html.slice(end + '</footer>'.length);
  if (!out.includes('/site-footer.css')) out = out.replace('</head>', `  ${CSS}\n</head>`);
  if (!out.includes('font-awesome')) out = out.replace('</head>', `  ${FA}\n</head>`);
  return out;
}

function walk(dir, acc = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) { if (n !== 'assets' && n !== 'node_modules') walk(p, acc); }
    else if (n.endsWith('.html') && !n.startsWith('__')) acc.push(p);
  }
  return acc;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const arg = process.argv[2] || 'dist';
  let files;
  if (arg === '--src') {
    files = [...readdirSync(root).filter((n) => n.endsWith('.html')).map((n) => join(root, n)),
             ...readdirSync(join(root, 'blog')).filter((n) => n.endsWith('.html')).map((n) => join(root, 'blog', n)),
             ...readdirSync(join(root, 'urunler')).filter((n) => n.endsWith('.html')).map((n) => join(root, 'urunler', n))];
  } else files = walk(resolve(root, arg));
  let n = 0;
  for (const f of files) {
    const s = readFileSync(f, 'utf8');
    const o = applyFooter(s);
    if (o !== s) { writeFileSync(f, o); n++; }
  }
  console.log(`Site footer: ${n}/${files.length} pages updated`);
}
