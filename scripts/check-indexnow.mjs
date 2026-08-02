import {
  BASE,
  HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_URL,
  readIndexNowKeyFromDisk,
  bingMsValidateToken,
  hasBingSiteAuthXml,
} from './seo-config.mjs';

const issues = [];
const ok = [];

const diskKey = readIndexNowKeyFromDisk();
if (!diskKey) {
  issues.push(`Key file missing: public/${INDEXNOW_KEY}.txt`);
} else if (diskKey !== INDEXNOW_KEY) {
  issues.push(`Key file content mismatch (expected ${INDEXNOW_KEY.length} chars, got ${diskKey.length})`);
} else {
  ok.push('Local key file OK');
}

try {
  const res = await fetch(INDEXNOW_KEY_URL, { method: 'GET' });
  const body = (await res.text()).replace(/^\uFEFF/, '').trim();
  if (res.status !== 200) {
    issues.push(`Live key URL returned HTTP ${res.status}`);
  } else if (body !== INDEXNOW_KEY) {
    issues.push('Live key file content does not match INDEXNOW_KEY');
  } else {
    ok.push(`Live key URL OK (${INDEXNOW_KEY_URL})`);
  }
} catch (e) {
  issues.push(`Cannot fetch live key URL: ${e.message}`);
}

if (bingMsValidateToken()) ok.push('BING_MSVALIDATE env set');
else if (hasBingSiteAuthXml()) ok.push('public/BingSiteAuth.xml present');
else console.log('  ⚠ Bing Webmaster not configured yet (required to fix 403)');

console.log('IndexNow preflight');
ok.forEach((line) => console.log(`  ✓ ${line}`));
issues.forEach((line) => console.log(`  ✗ ${line}`));

if (issues.length) process.exitCode = 1;
