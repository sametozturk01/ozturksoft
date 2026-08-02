import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { bingMsValidateToken, hasBingSiteAuthXml } from './seo-config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const marker = '<!-- seo:bing-verification -->';
const token = bingMsValidateToken();
const xmlReady = hasBingSiteAuthXml();

const pages = ['index.html'];

for (const file of pages) {
  const filePath = resolve(root, file);
  if (!existsSync(filePath)) continue;

  let html = readFileSync(filePath, 'utf8');
  if (!html.includes(marker)) continue;

  const replacement = token
    ? `    <meta name="msvalidate.01" content="${token}" />\n    ${marker}`
    : marker;

  if (html.includes('msvalidate.01') && !token) continue;

  html = html.replace(marker, replacement);
  writeFileSync(filePath, html);
}

if (token) {
  console.log('Bing Webmaster: msvalidate.01 meta tag injected');
} else if (xmlReady) {
  console.log('Bing Webmaster: BingSiteAuth.xml found in public/');
} else {
  console.log(
    'Bing Webmaster: add BING_MSVALIDATE env or public/BingSiteAuth.xml, then verify at https://www.bing.com/webmasters'
  );
}
