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

// Submit only the pages that changed in this deploy. Re-sending the same ~100 URLs on every build
// wastes Bing's crawl budget and can trip its 429 "potential spam" limit.
// Builds on Vercel diff against the previous deploy; local builds skip (the Vercel deploy submits).
// `npm run indexnow -- --all` resubmits the full sitemap by hand.
import { execSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';

const args = process.argv.slice(2);
const fromBuild = args.includes('--from-build');
const sendAll = args.includes('--all');

if (fromBuild && !process.env.VERCEL) {
  console.log('IndexNow: local build — skipped (the Vercel deploy submits changed pages)');
  process.exit(0);
}

const git = (cmd) => {
  try { return execSync(`git ${cmd}`, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString(); }
  catch { return null; }
};

function sitemapUrls(xml) {
  return [...(xml || '').matchAll(/<loc>(https:\/\/ozturksoft\.net[^<]+)<\/loc>/g)].map((m) => m[1]);
}

const rootHtml = readdirSync(root).filter((f) => f.endsWith('.html'));
const LOCALES = ['en', 'de', 'fr', 'ar', 'ru'];
const pageUrl = (file) => {
  if (file === 'index.html') return BASE + '/';
  return BASE + '/' + file.replace(/\.html$/, '').replace(/\/index$/, '');
};

function changedUrls(base) {
  const names = git(`diff --name-status ${base} HEAD`);
  if (names === null) return null;
  const urls = new Set();
  for (const line of names.trim().split('\n').filter(Boolean)) {
    const [, file] = line.split('\t');
    if (!file) continue;
    if (/^[^/]+\.html$/.test(file) && !file.startsWith('__')) {
      urls.add(pageUrl(file));
      if (file === 'index.html') LOCALES.forEach((l) => urls.add(`${BASE}/${l}`));
    } else if (/^blog\/[^/]+\.html$/.test(file) || /^(en|de|fr|ar|ru)\/.+\.html$/.test(file)) {
      urls.add(pageUrl(file));
    } else if (/^src\/i18n\/articles\/(.+)-(en|de|fr|ar|ru|tr)\.html$/.test(file)) {
      const [, article, lang] = file.match(/^src\/i18n\/articles\/(.+)-(\w\w)\.html$/);
      for (const f of readdirSync(resolve(root, 'blog'))) {
        const html = readFileSync(resolve(root, 'blog', f), 'utf8');
        if (html.includes(`data-article="${article}"`)) {
          urls.add(lang === 'tr' ? `${BASE}/blog/${f.replace(/\.html$/, '')}` : `${BASE}/${lang}/blog/${f.replace(/\.html$/, '')}`);
        }
      }
    } else if (/^src\/i18n\/(tr|en|de|fr|ar|ru)\.json$/.test(file)) {
      // Find the namespaces whose text changed and the pages that use them
      let before = {}, after = {};
      try { before = JSON.parse(git(`show ${base}:${file}`) || '{}'); } catch {}
      try { after = JSON.parse(readFileSync(resolve(root, file), 'utf8')); } catch {}
      const changedNs = Object.keys({ ...before, ...after }).filter(
        (ns) => JSON.stringify(before[ns]) !== JSON.stringify(after[ns])
      );
      for (const ns of changedNs) {
        for (const f of rootHtml) {
          if (readFileSync(resolve(root, f), 'utf8').includes(`data-i18n="${ns}.`)) urls.add(pageUrl(f));
        }
      }
    } else if (/^scripts\/sss-faq\//.test(file)) {
      urls.add(`${BASE}/sss`);
      LOCALES.forEach((l) => urls.add(`${BASE}/${l}/faq`));
    }
  }
  // Pages newly added to the sitemap
  const oldMap = new Set(sitemapUrls(git(`show ${base}:public/sitemap.xml`)));
  for (const u of sitemapUrls(readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8'))) {
    if (!oldMap.has(u)) urls.add(u);
  }
  return [...urls];
}

let urlList;
if (sendAll) {
  urlList = sitemapUrls(readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8'));
} else {
  const prev = process.env.VERCEL_GIT_PREVIOUS_SHA;
  const baseArg = args.find((a) => a.startsWith('--base='))?.slice(7);
  const base = baseArg || (prev && git(`cat-file -e ${prev}^{commit}`) !== null ? prev : 'HEAD~1');
  urlList = changedUrls(base);
  if (urlList === null) {
    console.log(`IndexNow: git history not available (base ${base}) — skipped`);
    process.exit(0);
  }
  console.log(`IndexNow: ${urlList.length} changed URL(s) since ${base.slice(0, 12)}`);
}
urlList = [...new Set(urlList)].slice(0, 1000);
if (!urlList.length) {
  console.log('IndexNow: nothing changed — skipped');
  process.exit(0);
}
if (args.includes('--dry')) {
  urlList.forEach((u) => console.log('  ' + u));
  process.exit(0);
}

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
