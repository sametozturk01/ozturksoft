import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const REPLACEMENTS = [
  ['fa-shield-halved', '🛡️'],
  ['fa-industry', '🏭'],
  ['fa-tower-cell', '📡'],
  ['fa-helmet-safety', '🏗️'],
  ['fa-scale-balanced', '⚖️'],
  ['fa-city', '🏙️'],
];

for (const file of ['index.html', 'hizmetler.html']) {
  const p = path.join(root, file);
  let html = fs.readFileSync(p, 'utf8');
  for (const [fa, emoji] of REPLACEMENTS) {
    const re = new RegExp(
      `<div class="icon-box" style="margin-bottom: 12px;"><i class="fas ${fa} icon" style="font-size: 1.4rem;"></i></div>`,
      'g'
    );
    html = html.replace(
      re,
      `<div class="icon-box" style="margin-bottom: 12px; font-size: 1.5rem; line-height: 1;">${emoji}</div>`
    );
  }
  fs.writeFileSync(p, html);
  console.log(`✓ ${file}`);
}
