import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const template = readFileSync(resolve(root, 'index.html'), 'utf8');

const BASE = 'https://ozturksoft.net';

const LOCALES = [
  {
    lang: 'en',
    file: 'en.html',
    path: '/en',
    htmlLang: 'en',
    ogLocale: 'en_US',
    flag: '🇬🇧',
    code: 'EN',
    title: 'Ozturksoft | AI & Software Development Company in Ankara, Turkey',
    description:
      'Ozturksoft delivers AI integration, custom software, mobile apps and digital transformation for enterprises, government and businesses — from Ankara, Turkey. KVKK compliant, QA-driven.',
    keywords:
      'software company ankara, custom software turkey, AI integration ankara, enterprise software turkey, chatbot development',
    ogTitle: 'Ozturksoft | AI & Software Development — Ankara, Turkey',
    twitterTitle: 'Ozturksoft | AI & Software Development — Ankara, Turkey',
  },
  {
    lang: 'de',
    file: 'de.html',
    path: '/de',
    htmlLang: 'de',
    ogLocale: 'de_DE',
    flag: '🇩🇪',
    code: 'DE',
    title: 'Ozturksoft | Software- & KI-Unternehmen in Ankara, Türkei',
    description:
      'Ozturksoft: KI-Integration, Individualsoftware, Mobile Apps und digitale Transformation für Unternehmen und Behörden — aus Ankara, Türkei. KVKK-konform, QA-orientiert.',
    keywords:
      'softwareunternehmen ankara, individualsoftware türkei, ki integration ankara, unternehmenssoftware',
    ogTitle: 'Ozturksoft | Software & KI aus Ankara',
    twitterTitle: 'Ozturksoft | Software & KI aus Ankara',
  },
  {
    lang: 'fr',
    file: 'fr.html',
    path: '/fr',
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
    flag: '🇫🇷',
    code: 'FR',
    title: 'Ozturksoft | Société logicielle & IA à Ankara, Turquie',
    description:
      'Ozturksoft : intégration IA, logiciel sur mesure, applications mobiles et transformation digitale pour entreprises et secteur public — depuis Ankara, Turquie.',
    keywords:
      'société logicielle ankara, logiciel sur mesure turquie, intégration ia ankara',
    ogTitle: 'Ozturksoft | Logiciel & IA à Ankara',
    twitterTitle: 'Ozturksoft | Logiciel & IA à Ankara',
  },
  {
    lang: 'ar',
    file: 'ar.html',
    path: '/ar',
    htmlLang: 'ar',
    ogLocale: 'ar_SA',
    rtl: true,
    flag: '🇸🇦',
    code: 'AR',
    title: 'Ozturksoft | شركة برمجيات وذكاء اصطناعي في أنقرة، تركيا',
    description:
      'Ozturksoft: تكامل الذكاء الاصطناعي، برمجيات مخصصة، تطبيقات جوال والتحول الرقمي للمؤسسات والقطاع العام — من أنقرة، تركيا.',
    keywords:
      'شركة برمجيات أنقرة, برمجيات مخصصة تركيا, تكامل الذكاء الاصطناعي',
    ogTitle: 'Ozturksoft | برمجيات وذكاء اصطناعي في أنقرة',
    twitterTitle: 'Ozturksoft | برمجيات وذكاء اصطناعي في أنقرة',
  },
  {
    lang: 'ru',
    file: 'ru.html',
    path: '/ru',
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    flag: '🇷🇺',
    code: 'RU',
    title: 'Ozturksoft | IT-компания и ИИ в Анкаре, Турция',
    description:
      'Ozturksoft: интеграция ИИ, разработка ПО на заказ, мобильные приложения и цифровая трансформация для предприятий и госсектора — из Анкары, Турция.',
    keywords:
      'it компания анкара, разработка по турция, интеграция ии анкара',
    ogTitle: 'Ozturksoft | Разработка ПО и ИИ в Анкаре',
    twitterTitle: 'Ozturksoft | Разработка ПО и ИИ в Анкаре',
  },
];

function buildLocalePage(locale) {
  const canonical = `${BASE}${locale.path}`;
  let html = template;

  html = html.replace(/<html lang="tr">/, `<html lang="${locale.htmlLang}"${locale.rtl ? ' dir="rtl"' : ''}>`);
  html = html.replace(/<body>/, `<body data-page-lang="${locale.lang}">`);

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${locale.title}</title>`);
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonical}" />`
  );
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${locale.description.replace(/"/g, '&quot;')}">`
  );
  html = html.replace(
    /<meta name="keywords" content="[^"]*">/,
    `<meta name="keywords" content="${locale.keywords}">`
  );

  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${locale.ogTitle}">`);
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${locale.description.replace(/"/g, '&quot;')}">`
  );
  html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`);
  html = html.replace(/<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${locale.ogLocale}">`);

  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${locale.twitterTitle}">`);
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${locale.description.replace(/"/g, '&quot;')}">`
  );

  // Dropdown: active lang
  html = html.replace(/\s+class="ldm-active"/g, '');
  html = html.replace(
    new RegExp(`(<a href="#" data-lang="${locale.lang}"[^>]*)(>)`),
    '$1 class="ldm-active"$2'
  );
  html = html.replace(
    /<span id="langLabel">[^<]*<\/span>/,
    `<span id="langLabel">${locale.flag}</span>`
  );
  html = html.replace(
    /<span id="langCode">[^<]*<\/span>/,
    `<span id="langCode">${locale.code}</span>`
  );

  return html;
}

for (const locale of LOCALES) {
  const out = buildLocalePage(locale);
  writeFileSync(resolve(root, locale.file), out);
  console.log(`✓ ${locale.file} (same layout as index.html, lang=${locale.lang})`);
}

console.log('Locale home pages generated from index.html');
