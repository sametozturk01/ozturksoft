import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { BASE, OG_LOCALE } from './blog-i18n-config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const i18nDir = resolve(root, 'src/i18n');

const LOCALES = [
  { lang: 'en', home: '/en', servicesPath: 'services', ankaraAiPath: 'ankara-ai-solutions', ankaraSwPath: 'ankara-software-company', ankaraAsistanPath: 'ankara-ai-assistant' },
  { lang: 'de', home: '/de', servicesPath: 'leistungen', ankaraAiPath: 'ankara-ki-loesungen', ankaraSwPath: 'ankara-softwareunternehmen', ankaraAsistanPath: 'ankara-ki-assistent' },
  { lang: 'fr', home: '/fr', servicesPath: 'services', ankaraAiPath: 'solutions-ia-ankara', ankaraSwPath: 'entreprise-logicielle-ankara', ankaraAsistanPath: 'assistant-ia-ankara' },
  { lang: 'ar', home: '/ar', servicesPath: 'services', ankaraAiPath: 'ankara-ai-solutions', ankaraSwPath: 'ankara-software-company', ankaraAsistanPath: 'ankara-ai-assistant', rtl: true },
  { lang: 'ru', home: '/ru', servicesPath: 'uslugi', ankaraAiPath: 'ankara-ai-resheniya', ankaraSwPath: 'ankara-soft-kompaniya', ankaraAsistanPath: 'ankara-ai-assistent' },
];

const META = {
  en: {
    servicesTitle: 'Services | Software & AI Company in Ankara | Ozturksoft',
    servicesDesc: 'Ozturksoft — Ankara-based software company: custom software, AI integration, mobile apps, SEO, QA testing and DevOps. Free consultation.',
    ankaraAiTitle: 'Ankara AI Solutions | LLM, Chatbot & Automation | Ozturksoft',
    ankaraAiDesc: 'Ankara AI solutions partner: machine learning, LLM integration, chatbots and process automation for businesses in Ankara, Turkey.',
    ankaraSwTitle: 'Ankara Software Company | Custom Software & AI | Ozturksoft',
    ankaraSwDesc: 'Leading Ankara software company for custom development, AI integration, web and mobile apps. QA-driven delivery, KVKK compliant.',
    servicesH1: 'Software & AI Services in Ankara',
    ankaraAiH1: 'Ankara AI Solutions',
    ankaraSwH1: 'Ankara Software Company',
    cta: 'Free Consultation',
    contact: 'Contact',
    blog: 'Blog',
    aiAsistanTitle: 'Ozturksoft AI Assistant | Enterprise WhatsApp & Web | Ankara',
    aiAsistanDesc: 'Enterprise AI assistant with WhatsApp, web and CRM integration. KVKK compliant, on-premise option.',
    aiAsistanH1: 'Ozturksoft AI Assistant',
  },
  de: {
    servicesTitle: 'Leistungen | Software & KI aus Ankara | Ozturksoft',
    servicesDesc: 'Ozturksoft — Softwareunternehmen in Ankara: Individualsoftware, KI-Integration, Mobile Apps, SEO, QA und DevOps.',
    ankaraAiTitle: 'Ankara KI-Lösungen | LLM, Chatbot & Automatisierung | Ozturksoft',
    ankaraAiDesc: 'KI-Lösungspartner in Ankara: Machine Learning, LLM-Integration, Chatbots und Prozessautomatisierung.',
    ankaraSwTitle: 'Softwareunternehmen Ankara | Individualsoftware & KI | Ozturksoft',
    ankaraSwDesc: 'Führendes Softwareunternehmen in Ankara für Individualentwicklung, KI, Web und Mobile Apps.',
    servicesH1: 'Software- & KI-Leistungen in Ankara',
    ankaraAiH1: 'Ankara KI-Lösungen',
    ankaraSwH1: 'Softwareunternehmen in Ankara',
    cta: 'Kostenlose Beratung',
    contact: 'Kontakt',
    blog: 'Blog',
    aiAsistanTitle: 'Ozturksoft KI-Assistent | Enterprise WhatsApp & Web | Ankara',
    aiAsistanDesc: 'Enterprise KI-Assistent mit WhatsApp-, Web- und CRM-Integration. KVKK-konform, On-Premise-Option.',
    aiAsistanH1: 'Ozturksoft KI-Assistent',
  },
  fr: {
    servicesTitle: 'Services | Société logicielle & IA à Ankara | Ozturksoft',
    servicesDesc: 'Ozturksoft — société logicielle à Ankara : logiciel sur mesure, intégration IA, apps mobiles, SEO, QA et DevOps.',
    ankaraAiTitle: 'Solutions IA Ankara | LLM, Chatbot & Automatisation | Ozturksoft',
    ankaraAiDesc: 'Partenaire IA à Ankara : machine learning, intégration LLM, chatbots et automatisation des processus.',
    ankaraSwTitle: 'Société logicielle Ankara | Logiciel sur mesure & IA | Ozturksoft',
    ankaraSwDesc: 'Société logicielle de référence à Ankara pour développement sur mesure, IA, web et mobile.',
    servicesH1: 'Services logiciels & IA à Ankara',
    ankaraAiH1: 'Solutions IA à Ankara',
    ankaraSwH1: 'Société logicielle à Ankara',
    cta: 'Consultation gratuite',
    contact: 'Contact',
    blog: 'Blog',
    aiAsistanTitle: 'Assistant IA Ozturksoft | WhatsApp & Web Enterprise | Ankara',
    aiAsistanDesc: 'Assistant IA enterprise avec intégration WhatsApp, web et CRM. Conforme KVKK, option on-premise.',
    aiAsistanH1: 'Assistant IA Ozturksoft',
  },
  ar: {
    servicesTitle: 'الخدمات | شركة برمجيات وذكاء اصطناعي في أنقرة | Ozturksoft',
    servicesDesc: 'Ozturksoft — شركة برمجيات في أنقرة: برمجيات مخصصة، تكامل الذكاء الاصطناعي، تطبيقات جوال، SEO واختبار QA.',
    ankaraAiTitle: 'حلول الذكاء الاصطناعي في أنقرة | LLM وروبوت محادثة | Ozturksoft',
    ankaraAiDesc: 'شريك حلول الذكاء الاصطناعي في أنقرة: تعلم الآلة، تكامل LLM، روبوتات المحادثة وأتمتة العمليات.',
    ankaraSwTitle: 'شركة برمجيات أنقرة | برمجيات مخصصة وذكاء اصطناعي | Ozturksoft',
    ankaraSwDesc: 'شركة برمجيات رائدة في أنقرة للتطوير المخصص والذكاء الاصطناعي وتطبيقات الويب والجوال.',
    servicesH1: 'خدمات البرمجيات والذكاء الاصطناعي في أنقرة',
    ankaraAiH1: 'حلول الذكاء الاصطناعي في أنقرة',
    ankaraSwH1: 'شركة برمجيات في أنقرة',
    cta: 'استشارة مجانية',
    contact: 'اتصل بنا',
    blog: 'المدونة',
    aiAsistanTitle: 'مساعد AI Ozturksoft | واتساب وويب مؤسسي | أنقرة',
    aiAsistanDesc: 'مساعد ذكاء اصطناعي مؤسسي مع تكامل WhatsApp والويب وCRM. متوافق مع KVKK، خيار on-premise.',
    aiAsistanH1: 'مساعد AI Ozturksoft',
  },
  ru: {
    servicesTitle: 'Услуги | IT-компания и ИИ в Анкаре | Ozturksoft',
    servicesDesc: 'Ozturksoft — IT-компания в Анкаре: разработка ПО, интеграция ИИ, мобильные приложения, SEO, QA и DevOps.',
    ankaraAiTitle: 'ИИ-решения в Анкаре | LLM, чатбот и автоматизация | Ozturksoft',
    ankaraAiDesc: 'Партнёр по ИИ в Анкаре: машинное обучение, интеграция LLM, чатботы и автоматизация процессов.',
    ankaraSwTitle: 'IT-компания Анкара | Разработка ПО и ИИ | Ozturksoft',
    ankaraSwDesc: 'Ведущая IT-компания в Анкаре: индивидуальная разработка, ИИ, веб и мобильные приложения.',
    servicesH1: 'Услуги разработки ПО и ИИ в Анкаре',
    ankaraAiH1: 'ИИ-решения в Анкаре',
    ankaraSwH1: 'IT-компания в Анкаре',
    cta: 'Бесплатная консультация',
    contact: 'Контакты',
    blog: 'Блог',
    aiAsistanTitle: 'AI-ассистент Ozturksoft | WhatsApp и веб | Анкара',
    aiAsistanDesc: 'Корпоративный AI-ассистент с интеграцией WhatsApp, веб и CRM. KVKK, опция on-premise.',
    aiAsistanH1: 'AI-ассистент Ozturksoft',
  },
};

const SERVICES = {
  en: ['Custom Software Development', 'AI & LLM Integration', 'Mobile App Development', 'Web Development & SEO', 'QA & Software Testing', 'WhatsApp Chatbot', 'CRM/ERP Integration', 'Process Automation (RPA)'],
  de: ['Individualsoftware', 'KI- & LLM-Integration', 'Mobile App Entwicklung', 'Webentwicklung & SEO', 'QA & Softwaretests', 'WhatsApp Chatbot', 'CRM/ERP Integration', 'Prozessautomatisierung (RPA)'],
  fr: ['Logiciel sur mesure', 'Intégration IA & LLM', 'Applications mobiles', 'Développement web & SEO', 'QA & tests logiciels', 'Chatbot WhatsApp', 'Intégration CRM/ERP', 'Automatisation (RPA)'],
  ar: ['برمجيات مخصصة', 'تكامل الذكاء الاصطناعي وLLM', 'تطبيقات الجوال', 'تطوير الويب وSEO', 'اختبار QA', 'روبوت WhatsApp', 'تكامل CRM/ERP', 'أتمتة العمليات (RPA)'],
  ru: ['Разработка ПО на заказ', 'Интеграция ИИ и LLM', 'Мобильные приложения', 'Веб-разработка и SEO', 'QA и тестирование', 'WhatsApp чатбот', 'Интеграция CRM/ERP', 'Автоматизация (RPA)'],
};

function localePath(locale, trSlug) {
  const map = {
    hizmetler: locale.servicesPath,
    'ankara-yapay-zeka-cozumleri': locale.ankaraAiPath,
    'ankara-yazilim-sirketi': locale.ankaraSwPath,
    'ankara-ai-asistan': locale.ankaraAsistanPath,
  };
  return map[trSlug];
}

function hreflangInner(slug, langs) {
  const lines = [`  <link rel="alternate" hreflang="tr" href="${BASE}/${slug}" />`];
  for (const locale of LOCALES) {
    const part = localePath(locale, slug);
    if (part) lines.push(`  <link rel="alternate" hreflang="${locale.lang}" href="${BASE}${locale.home}/${part}" />`);
  }
  lines.push(`  <link rel="alternate" hreflang="x-default" href="${BASE}/${slug}" />`);
  return lines.join('\n');
}

function pageHtml({ lang, locale, slug, trSlug, title, desc, h1, body, rtl }) {
  const canonical = `${BASE}${locale.home}/${localePath(locale, trSlug)}`;
  const m = META[lang];
  const og = OG_LOCALE[lang] || 'en_US';
  return `<!DOCTYPE html>
<html lang="${lang}"${rtl ? ' dir="rtl"' : ''}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="canonical" href="${canonical}" />
${hreflangInner(slug, lang)}
  <meta name="description" content="${desc.replace(/"/g, '&quot;')}">
  <meta name="robots" content="index, follow">
  <meta name="geo.region" content="TR-06" />
  <meta name="geo.placename" content="Ankara" />
  <meta property="og:title" content="${title.replace(/"/g, '&quot;')}">
  <meta property="og:description" content="${desc.replace(/"/g, '&quot;')}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${BASE}/og-image.png">
  <meta property="og:locale" content="${og}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap">
  <style>
    :root{--primary:#3b82f6;--dark:#020617;--dim:#94a3b8}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--dark);color:#fff;line-height:1.7}
    nav{display:flex;justify-content:space-between;align-items:center;padding:20px 8%;border-bottom:1px solid rgba(255,255,255,.08)}
    nav a{color:var(--dim);text-decoration:none;margin-left:20px;font-weight:600;font-size:.9rem}
    nav a:hover{color:#fff}
    .hero{padding:80px 8% 50px;max-width:900px}
    .hero h1{font-size:2.4rem;margin-bottom:16px;line-height:1.2}
    .hero p{color:var(--dim);font-size:1.1rem;margin-bottom:28px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;padding:0 8% 40px;max-width:1100px;margin:0 auto}
    .card{background:#0f172a;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:22px}
    .card h3{font-size:1rem;margin-bottom:8px;color:#e2e8f0}
    .links{padding:20px 8% 60px;max-width:900px}
    .links h2{font-size:1.3rem;margin-bottom:16px}
    .links a{color:var(--primary);display:block;margin-bottom:8px;text-decoration:none}
    .btn{display:inline-block;background:var(--primary);color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;margin-top:8px}
    footer{text-align:center;padding:30px;color:#64748b;font-size:.85rem;border-top:1px solid rgba(255,255,255,.06)}
  </style>
</head>
<body>
  <nav>
    <a href="${locale.home}"><img src="/images/logo.png" alt="Ozturksoft" height="60"></a>
    <div>
      <a href="${locale.home}">Home</a>
      <a href="${locale.home}/${locale.servicesPath}">${m.servicesH1.split(' ').slice(-2).join(' ') || 'Services'}</a>
      <a href="/blog">${m.blog}</a>
      <a href="/iletisim">${m.contact}</a>
    </div>
  </nav>
  <section class="hero">
    <h1>${h1}</h1>
    <p>${desc}</p>
    <a href="/iletisim" class="btn">${m.cta}</a>
  </section>
  ${body}
  <footer>© 2026 Ozturksoft — Ankara, Turkey</footer>
</body>
</html>`;
}

function servicesBody(lang) {
  const items = SERVICES[lang].map((s) => `<div class="card"><h3>${s}</h3><p>Ankara, Turkey</p></div>`).join('\n');
  return `<div class="grid">${items}</div>`;
}

function ankaraLinks(lang, type) {
  const posts =
    type === 'ai'
      ? [
          ['/blog/yapay-zeka-entegrasyonu-rehberi', 'AI Integration Guide'],
          ['/blog/ankara-chatbot-gelistirme-2026', 'Chatbot Ankara'],
          ['/blog/llm-gpt-entegrasyonu-rehberi', 'LLM Integration'],
          ['/blog/ankara-surec-otomasyonu-rpa-yapay-zeka', 'RPA Automation'],
        ]
      : [
          ['/blog/ankara-yazilim-sirketi-nasil-secilir-2026', 'How to Choose Software Company'],
          ['/blog/ozel-yazilim-gelistirme-nedir-rehberi', 'Custom Software Guide'],
          ['/blog/ankara-web-sitesi-maliyeti-2026', 'Website Cost Ankara'],
          ['/blog/mobil-uygulama-gelistirme-rehberi-2026', 'Mobile App Development'],
        ];
  const prefix = lang === 'tr' ? '' : `/${lang}`;
  return `<section class="links"><h2>Guides</h2>${posts.map(([p, t]) => `<a href="${prefix}${p}">${t}</a>`).join('')}</section>`;
}

// Generate to dist if exists, else root locale folders
const outRoot = resolve(root, 'dist');
const writeRoots = existsSync(outRoot) ? [outRoot, root] : [root];

for (const writeRoot of writeRoots) {
for (const locale of LOCALES) {
  const m = META[locale.lang];
  const dir = resolve(writeRoot, locale.lang);
  mkdirSync(dir, { recursive: true });

  const pages = [
    { file: `${locale.servicesPath}.html`, slug: 'hizmetler', trSlug: 'hizmetler', title: m.servicesTitle, desc: m.servicesDesc, h1: m.servicesH1, body: servicesBody(locale.lang) },
    { file: `${locale.ankaraAiPath}.html`, slug: 'ankara-yapay-zeka-cozumleri', trSlug: 'ankara-yapay-zeka-cozumleri', title: m.ankaraAiTitle, desc: m.ankaraAiDesc, h1: m.ankaraAiH1, body: ankaraLinks(locale.lang, 'ai') },
    { file: `${locale.ankaraSwPath}.html`, slug: 'ankara-yazilim-sirketi', trSlug: 'ankara-yazilim-sirketi', title: m.ankaraSwTitle, desc: m.ankaraSwDesc, h1: m.ankaraSwH1, body: ankaraLinks(locale.lang, 'sw') },
    { file: `${locale.ankaraAsistanPath}.html`, slug: 'ankara-ai-asistan', trSlug: 'ankara-ai-asistan', title: m.aiAsistanTitle, desc: m.aiAsistanDesc, h1: m.aiAsistanH1, body: ankaraLinks(locale.lang, 'ai') },
  ];

  for (const p of pages) {
    const html = pageHtml({ lang: locale.lang, locale, rtl: locale.rtl, ...p });
    writeFileSync(resolve(dir, p.file), html);
    console.log(`  ${locale.lang}/${p.file}`);
  }
}
}

console.log('Locale inner pages generated');

// Sitemap entries for locale inner pages + ankara hub
const sitemapPath = resolve(root, 'public/sitemap.xml');
let sitemap = readFileSync(sitemapPath, 'utf8');
const today = new Date().toISOString().slice(0, 10);
sitemap = sitemap.replace(
  /\s*<url>\s*<loc>https:\/\/ozturksoft\.net\/(en|de|fr|ar|ru)\/(services|leistungen|uslugi|ankara-[^<]+)<\/loc>[\s\S]*?<\/url>/g,
  ''
);
if (!sitemap.includes(`${BASE}/ankara-yazilim-sirketi</loc>`)) {
  sitemap = sitemap.replace(
    '</urlset>',
    `  <url>
    <loc>${BASE}/ankara-yazilim-sirketi</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.98</priority>
  </url>
</urlset>`
  );
}
if (!sitemap.includes(`${BASE}/ankara-ai-asistan</loc>`)) {
  sitemap = sitemap.replace(
    '</urlset>',
    `  <url>
    <loc>${BASE}/ankara-ai-asistan</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
</urlset>`
  );
}
const localeUrls = [];
for (const locale of LOCALES) {
  for (const part of [locale.servicesPath, locale.ankaraAiPath, locale.ankaraSwPath, locale.ankaraAsistanPath]) {
    localeUrls.push(`${BASE}${locale.home}/${part}`);
  }
}
const localeXml = localeUrls
  .map((loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.88</priority>
  </url>`)
  .join('\n');
sitemap = sitemap.replace('</urlset>', `${localeXml}\n</urlset>`);
writeFileSync(sitemapPath, sitemap);
console.log('Sitemap updated with locale inner pages');
