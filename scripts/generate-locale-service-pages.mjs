// Builds full, statically translated locale versions of the important Turkish pages
// (same layout and content as the Turkish page, text baked in from src/i18n/<lang>.json),
// adds hreflang to the Turkish page and all its translations, and lists the URLs in the sitemap.
// Runs after `vite build` on the built Turkish pages in dist/.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { prerenderI18n } from './lib/prerender-i18n.mjs';
import { LOCALE_PAGES, EXISTING_LOCALE_LINKS } from './locale-service-pages.config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const BASE = 'https://ozturksoft.net';
const LANGS = ['en', 'de', 'fr', 'ar', 'ru'];
const OG = { en: 'en_US', de: 'de_DE', fr: 'fr_FR', ar: 'ar_SA', ru: 'ru_RU' };
const FLAG = { en: ['🇬🇧', 'EN'], de: ['🇩🇪', 'DE'], fr: ['🇫🇷', 'FR'], ar: ['🇸🇦', 'AR'], ru: ['🇷🇺', 'RU'] };
const HOME_NAME = { en: 'Home', de: 'Startseite', fr: 'Accueil', ar: 'الرئيسية', ru: 'Главная' };
const DICT = Object.fromEntries(LANGS.map((l) => [l, JSON.parse(readFileSync(resolve(root, `src/i18n/${l}.json`), 'utf8'))]));

const get = (d, k) => k.split('.').reduce((o, x) => (o && typeof o === 'object' ? o[x] : undefined), d);
const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const text = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' ').trim();

if (!existsSync(dist)) { console.log('generate-locale-service-pages: no dist, skipped'); process.exit(0); }

const url = (lang, page) => (lang === 'tr' ? `${BASE}/${page.tr}` : `${BASE}/${lang}/${page.slug[lang]}`);

// Internal link map: Turkish path -> { lang: localized path }
const LINKS = { ...EXISTING_LOCALE_LINKS };
for (const p of LOCALE_PAGES) LINKS[`/${p.tr}`] = Object.fromEntries(LANGS.map((l) => [l, `/${l}/${p.slug[l]}`]));

function hreflang(page) {
  const lines = [`    <link rel="alternate" hreflang="tr" href="${url('tr', page)}" />`];
  for (const l of LANGS) lines.push(`    <link rel="alternate" hreflang="${l}" href="${url(l, page)}" />`);
  lines.push(`    <link rel="alternate" hreflang="x-default" href="${url('tr', page)}" />`);
  return lines.join('\n');
}

function setHreflang(html, page) {
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/g, '');
  return html.replace('</head>', `${hreflang(page)}\n</head>`);
}

function setMeta(html, sel, value) {
  const re = new RegExp(`(<meta ${sel} content=")[^"]*(")`);
  return re.test(html) ? html.replace(re, `$1${attr(value)}$2`) : html;
}

function faqLd(html) {
  const qa = [];
  const re = /<details\b[^>]*>\s*<summary\b[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g;
  let m;
  while ((m = re.exec(html))) {
    const p = /<p\b[^>]*>([\s\S]*?)<\/p>/.exec(m[2]);
    if (!p) continue;
    const q = text(m[1]);
    const a = text(p[1].replace(/(\s*(?:·\s*)?<a [^>]*>[^<]*<\/a>)+\s*$/, ''));
    if (q && a) qa.push({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } });
  }
  // hub pages: <section class="... hub-faq"> with <h3>question</h3><p>answer</p>
  const hub = /<section class="[^"]*hub-faq[^"]*">([\s\S]*?)<\/section>/.exec(html);
  if (hub) {
    const r2 = /<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<p\b[^>]*>([\s\S]*?)<\/p>/g;
    while ((m = r2.exec(hub[1]))) {
      const q = text(m[1]);
      const a = text(m[2].replace(/(\s*(?:·\s*)?<a [^>]*>[^<]*<\/a>)+\s*$/, ''));
      if (q && a) qa.push({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } });
    }
  }
  return qa;
}

function localize(trHtml, page, lang) {
  const dict = DICT[lang];
  let html = trHtml;
  html = html.replace(/<html lang="tr"[^>]*>/, `<html lang="${lang}"${lang === 'ar' ? ' dir="rtl"' : ''}>`);
  html = html.replace(/<body\b/, `<body data-page-lang="${lang}"`);
  html = setHreflang(html, page);

  // title + description
  const titleKey = (/<title data-i18n="([^"]+)"/.exec(html) || [])[1];
  let title = (page.title && page.title[lang]) || (titleKey && get(dict, titleKey)) || text((/<title[^>]*>([\s\S]*?)<\/title>/.exec(html) || ['', ''])[1]);
  let desc = (page.desc && page.desc[lang]) || (page.descKey && get(dict, page.descKey)) || '';
  if (desc.length > 160) {
    const cut = desc.slice(0, 158);
    const at = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '), cut.lastIndexOf(': '));
    desc = at > 100 ? cut.slice(0, at + 1) : cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
  }
  if (title.length > 70) title = title.replace(/\s*\|\s*Ozturksoft\s*$/, '');
  html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/, `<title${titleKey ? ` data-i18n="${titleKey}"` : ''}>${attr(title).replace(/&quot;/g, '"')}</title>`);
  if (desc) {
    html = setMeta(html, 'name="description"', desc);
    html = setMeta(html, 'property="og:description"', desc);
    html = setMeta(html, 'name="twitter:description"', desc);
  }
  html = setMeta(html, 'property="og:title"', title);
  html = setMeta(html, 'name="twitter:title"', title);
  html = setMeta(html, 'property="og:url"', url(lang, page));
  html = setMeta(html, 'property="og:locale"', OG[lang]);
  html = html.replace(/\s*<meta name="keywords" content="[^"]*"\s*\/?>/, '');
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url(lang, page)}" />`);

  // visible text
  html = prerenderI18n(html, dict);

  // language dropdown state
  html = html.replace(/\s+class="ldm-active"/g, '');
  html = html.replace(new RegExp(`(<a href="#" data-lang="${lang}"[^>]*)(>)`), '$1 class="ldm-active"$2');
  html = html.replace(/<span id="langLabel">[^<]*<\/span>/, `<span id="langLabel">${FLAG[lang][0]}</span>`);
  html = html.replace(/<span id="langCode">[^<]*<\/span>/, `<span id="langCode">${FLAG[lang][1]}</span>`);

  // internal links to pages that exist in this language
  html = html.replace(/href="(\/[^"#?]*)([#?][^"]*)?"/g, (all, path, rest = '') => {
    const p = path.length > 1 ? path.replace(/\/$/, '') : path;
    return LINKS[p] && LINKS[p][lang] ? `href="${LINKS[p][lang]}${rest}"` : all;
  });

  // structured data in this language
  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  const graph = [
    { '@type': 'WebPage', '@id': `${url(lang, page)}#webpage`, url: url(lang, page), name: title, description: desc || undefined, inLanguage: lang, isPartOf: { '@id': `${BASE}/#website` }, publisher: { '@id': `${BASE}/#organization` } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: HOME_NAME[lang], item: `${BASE}/${lang}` },
      { '@type': 'ListItem', position: 2, name: title.split('|')[0].trim(), item: url(lang, page) },
    ] },
  ];
  const qa = faqLd(html);
  if (qa.length) graph.push({ '@type': 'FAQPage', mainEntity: qa });
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
  html = html.replace('</head>', `    <script type="application/ld+json">\n${ld}\n    </script>\n</head>`);
  return html;
}

const sitemapUrls = [];
let count = 0;
for (const page of LOCALE_PAGES) {
  const trFile = resolve(dist, `${page.tr}.html`);
  if (!existsSync(trFile)) { console.warn(`  missing ${page.tr}.html in dist`); continue; }
  const trHtml = readFileSync(trFile, 'utf8');
  writeFileSync(trFile, setHreflang(trHtml, page));
  for (const lang of LANGS) {
    const out = resolve(dist, lang, `${page.slug[lang]}.html`);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, localize(trHtml, page, lang));
    sitemapUrls.push(url(lang, page));
    count++;
  }
}

// sitemap (source and built copy)
const today = new Date().toISOString().slice(0, 10);
for (const sm of [resolve(root, 'public/sitemap.xml'), resolve(dist, 'sitemap.xml')]) {
  if (!existsSync(sm)) continue;
  let xml = readFileSync(sm, 'utf8');
  const add = sitemapUrls.filter((u) => !xml.includes(`<loc>${u}</loc>`))
    .map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
  if (add.length) writeFileSync(sm, xml.replace('</urlset>', `${add.join('\n')}\n</urlset>`));
}
console.log(`Locale service pages: ${count} pages (${LOCALE_PAGES.length} × ${LANGS.length})`);
