import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const BASE = 'https://ozturksoft.net';
const KEY = 'a7f3c9e2b1d84f6a8e0c2d5b9f1a3e7c';
const KEY_LOCATION = `${BASE}/${KEY}.txt`;

const priorityPaths = [
  '/',
  '/sss',
  '/ankara-yapay-zeka-firmasi',
  '/ankara-yapay-zeka-cozumleri',
  '/ankara-yazilim-sirketi',
  '/ankara-ai-asistan',
  '/ankara-kamu-yapay-zeka',
  '/blog/ankara-yapay-zeka-firmasi-nasil-secilir-2026',
  '/blog/ankara-yapay-zeka-firmalari-karsilastirma-2026',
  '/blog/ankara-llm-entegrasyonu-maliyeti-2026',
  '/hizmetler',
  '/blog',
  '/hakkimizda',
  '/iletisim',
  '/en',
  '/de',
];

// Add blog URLs from sitemap (cap 80)
let extra = [];
try {
  const sitemap = readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8');
  extra = [...sitemap.matchAll(/<loc>(https:\/\/ozturksoft\.net[^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => !priorityPaths.some((p) => u === BASE + p || u.endsWith(p)))
    .slice(0, 80);
} catch {}

const urlList = [...new Set([...priorityPaths.map((p) => BASE + p), ...extra])].slice(0, 100);

const body = {
  host: 'ozturksoft.net',
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  console.log(`IndexNow: ${res.status} ${res.statusText} (${urlList.length} URLs)`);
  if (!res.ok) {
    const text = await res.text();
    console.log(text.slice(0, 200));
  }
} catch (e) {
  console.warn('IndexNow submit skipped (network):', e.message);
}
