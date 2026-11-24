import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

export const BASE = 'https://ozturksoft.net';
export const HOST = 'ozturksoft.net';
export const INDEXNOW_KEY = 'a7deb6fa3548476fa494ee86218d76ef';
export const INDEXNOW_KEY_URL = `${BASE}/${INDEXNOW_KEY}.txt`;

export const INDEXNOW_ENDPOINTS = [
  { name: 'IndexNow (all engines)', url: 'https://api.indexnow.org/indexnow' },
  { name: 'Bing', url: 'https://www.bing.com/indexnow' },
  // Yandex accepts our key while Bing returns 403; IndexNow engines share submissions, so this still reaches Bing
  { name: 'Yandex', url: 'https://yandex.com/indexnow' },
];

export function readIndexNowKeyFromDisk() {
  const keyPath = resolve(root, 'public', `${INDEXNOW_KEY}.txt`);
  if (!existsSync(keyPath)) return null;
  return readFileSync(keyPath, 'utf8').replace(/^\uFEFF/, '').trim();
}

export function bingMsValidateToken() {
  return process.env.BING_MSVALIDATE?.trim() || '';
}

export function hasBingSiteAuthXml() {
  return existsSync(resolve(root, 'public', 'BingSiteAuth.xml'));
}
