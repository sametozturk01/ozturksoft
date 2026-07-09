import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const section = fs.readFileSync(path.join(root, 'scripts/.industries-section.html'), 'utf8');

const hizmetlerSection = section.replace(
  '<h2 data-i18n="industries.title">',
  '<h2 style="font-size: 2rem; color: white;" data-i18n="industries.title">'
);

function inject(file, html, marker) {
  const p = path.join(root, file);
  let content = fs.readFileSync(p, 'utf8');
  if (content.includes('industries-section')) {
    console.log(`skip ${file} (already has industries)`);
    return;
  }
  const idx = content.indexOf(marker);
  if (idx === -1) throw new Error(`marker not found in ${file}`);
  content = content.slice(0, idx) + html + '\n\n        ' + content.slice(idx);
  fs.writeFileSync(p, content);
  console.log(`✓ ${file}`);
}

inject('index.html', section, '        <section class="services" id="hizmetler">');
inject('hizmetler.html', hizmetlerSection, '        <section class="expertise-section"');

const sectors = [
  'Kamu & Bakanlıklar', 'Savunma Sanayi', 'Sağlık & Hastane', 'Eğitim & Üniversite',
  'Finans & Bankacılık', 'İmalat & Üretim', 'Lojistik & Taşımacılık', 'Enerji',
  'İnşaat & Müteahhitlik', 'Turizm & Otel', 'E-ticaret & Perakende', 'Hukuk & Danışmanlık',
  'Tarım & Gıda', 'Telekom', 'Otomotiv', 'Gayrimenkul',
];

const itemList = `    {
      "@type": "ItemList",
      "@id": "https://ozturksoft.net/#industries",
      "name": "Hizmet Verdiğimiz Sektörler",
      "itemListElement": [
${sectors.map((name, i) => `        { "@type": "ListItem", "position": ${i + 1}, "name": "${name}" }`).join(',\n')}
      ]
    }`;

const indexPath = path.join(root, 'index.html');
let index = fs.readFileSync(indexPath, 'utf8');
if (!index.includes('#industries')) {
  index = index.replace(
    '      "sameAs": [\n        "https://www.linkedin.com/company/ozturksoft",\n        "https://www.instagram.com/ozturksoft_"\n      ]\n    }\n  ]\n}',
    `      "sameAs": [\n        "https://www.linkedin.com/company/ozturksoft",\n        "https://www.instagram.com/ozturksoft_"\n      ]\n    },\n${itemList}\n  ]\n}`
  );
  fs.writeFileSync(indexPath, index);
  console.log('✓ index.html schema ItemList');
}

console.log('done');
