import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

export const BASE = 'https://ozturksoft.net';
export const HOST = 'ozturksoft.net';
export const INDEXNOW_KEY = 'a7f3c9e2b1d84f6a8e0c2d5b9f1a3e7c';
export const INDEXNOW_KEY_URL = `${BASE}/${INDEXNOW_KEY}.txt`;

export const INDEXNOW_ENDPOINTS = [
  { name: 'IndexNow (all engines)', url: 'https://api.indexnow.org/indexnow' },
  { name: 'Bing', url: 'https://www.bing.com/indexnow' },
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
