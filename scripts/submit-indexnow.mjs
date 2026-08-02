import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  BASE,
  HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_URL,
  INDEXNOW_ENDPOINTS,
  readIndexNowKeyFromDisk,
  bingMsValidateToken,
  hasBingSiteAuthXml,
} from './seo-config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

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
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: INDEXNOW_KEY_URL,
  urlList,
};

function printBing403Help() {
  console.log('');
  console.log('IndexNow 403 = Bing site not verified yet (UserForbiddedToAccessSite).');
  console.log('Fix:');
  console.log('  1. https://www.bing.com/webmasters → Add site: ozturksoft.net');
  console.log('  2. Verify via ONE of:');
  console.log('     • Meta tag → set BING_MSVALIDATE in Vercel env, redeploy');
  console.log('     • XML file → download BingSiteAuth.xml to public/, redeploy');
  console.log('  3. After verify: npm run indexnow');
  console.log(`  Key file (already live): ${INDEXNOW_KEY_URL}`);
}

const diskKey = readIndexNowKeyFromDisk();
if (diskKey !== INDEXNOW_KEY) {
  console.warn(`IndexNow: fix public/${INDEXNOW_KEY}.txt — content must be exactly the key (no BOM/newline)`);
}

let anyOk = false;
let sawBing403 = false;

for (const endpoint of INDEXNOW_ENDPOINTS) {
  try {
    const res = await fetch(endpoint.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let detail = text.slice(0, 300);
    try {
      const json = JSON.parse(text);
      if (json.errorCode === 'UserForbiddedToAccessSite') {
        sawBing403 = true;
        detail = json.message;
      }
    } catch {}

    const status = res.ok ? 'OK' : 'FAIL';
    console.log(`IndexNow [${endpoint.name}]: ${res.status} ${res.statusText} — ${status} (${urlList.length} URLs)`);
    if (!res.ok && detail) console.log(`  → ${detail}`);
    if (res.ok) anyOk = true;
  } catch (e) {
    console.warn(`IndexNow [${endpoint.name}] skipped:`, e.message);
  }
}

if (sawBing403 && !bingMsValidateToken() && !hasBingSiteAuthXml()) {
  printBing403Help();
} else if (sawBing403) {
  console.log('');
  console.log('Bing verification file/token is set — complete verification in Bing Webmaster Tools, then rerun npm run indexnow');
}

if (!anyOk && !sawBing403) {
  process.exitCode = 1;
}
