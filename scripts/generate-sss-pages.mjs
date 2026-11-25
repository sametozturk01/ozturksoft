import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SSS_DATA, SSS_LOCALES } from './sss-faq/index.mjs';
import { applyFooter } from './apply-site-footer.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const BASE = 'https://ozturksoft.net';
const DICT = {};
for (const l of ['tr', 'en', 'de', 'fr', 'ar', 'ru']) DICT[l] = JSON.parse(readFileSync(resolve(root, `src/i18n/${l}.json`), 'utf8'));
const AI_HUB = { tr: '/ankara-yapay-zeka-firmasi', en: '/en/ankara-ai-company', de: '/de/ankara-ki-unternehmen', fr: '/fr/entreprise-ia-ankara', ar: '/ar/ankara-ai-company', ru: '/ru/ankara-ai-kompaniya' };
const LANG_META = { tr: ['🇹🇷', 'Türkçe'], en: ['🇬🇧', 'English'], de: ['🇩🇪', 'Deutsch'], ar: ['🇸🇦', 'العربية'], ru: ['🇷🇺', 'Русский'], fr: ['🇫🇷', 'Français'] };


function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function hreflangBlock() {
  const lines = SSS_LOCALES.map((l) => {
    const href = `${BASE}${l.urlPath}`;
    return `  <link rel="alternate" hreflang="${l.lang}" href="${href}" />`;
  });
  lines.push(`  <link rel="alternate" hreflang="x-default" href="${BASE}/sss" />`);
  return lines.join('\n');
}

function faqSchema(items) {
  const mainEntity = items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: stripHtml(item.html.replace(/(\s*(?:·\s*)?<a [^>]*>[^<]*<\/a>)+\s*$/, '')) },
  }));
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity }, null, 2);
}

const UI = {
  tr: { kicker: 'Sık sorulan sorular', topics: 'Konular', ctaT: 'Sorunuzun cevabını bulamadınız mı?', ctaD: 'Projenizi kısaca anlatın; ücretsiz keşif görüşmesinde net bir yol haritası ve yazılı fiyat verelim.', ctaB: 'Ücretsiz keşif görüşmesi', call: 'Hemen arayın', menu: 'Menü' },
  en: { kicker: 'Frequently asked questions', topics: 'Topics', ctaT: "Didn't find your answer?", ctaD: 'Tell us briefly about your project; in a free discovery call we give you a clear roadmap and a written quote.', ctaB: 'Free discovery call', call: 'Call us', menu: 'Menu' },
  de: { kicker: 'Häufige Fragen', topics: 'Themen', ctaT: 'Keine passende Antwort gefunden?', ctaD: 'Beschreiben Sie kurz Ihr Projekt; im kostenlosen Erstgespräch erhalten Sie einen klaren Fahrplan und ein schriftliches Angebot.', ctaB: 'Kostenloses Erstgespräch', call: 'Jetzt anrufen', menu: 'Menü' },
  fr: { kicker: 'Questions fréquentes', topics: 'Thèmes', ctaT: "Vous n'avez pas trouvé votre réponse ?", ctaD: 'Décrivez brièvement votre projet ; lors d’un premier échange gratuit, nous vous donnons une feuille de route claire et un devis écrit.', ctaB: 'Premier échange gratuit', call: 'Appelez-nous', menu: 'Menu' },
  ar: { kicker: 'الأسئلة الشائعة', topics: 'المواضيع', ctaT: 'لم تجدوا إجابة سؤالكم؟', ctaD: 'صفوا مشروعكم باختصار، وفي جلسة استكشاف مجانية نقدّم لكم خطة واضحة وعرض سعر مكتوبًا.', ctaB: 'جلسة استكشاف مجانية', call: 'اتصلوا بنا', menu: 'القائمة' },
  ru: { kicker: 'Частые вопросы', topics: 'Темы', ctaT: 'Не нашли ответ на свой вопрос?', ctaD: 'Коротко опишите проект — на бесплатной консультации дадим понятный план и письменное предложение.', ctaB: 'Бесплатная консультация', call: 'Позвонить', menu: 'Меню' },
};
const FLAGS = { tr: 'TR', en: 'EN', de: 'DE', fr: 'FR', ar: 'AR', ru: 'RU' };

function groups(data) {
  const starts = data.categories.map((c) => data.items.findIndex((it) => it.id === c.id));
  return data.categories.map((c, k) => {
    const from = starts[k];
    const to = k + 1 < starts.length ? starts[k + 1] : data.items.length;
    return { ...c, items: data.items.slice(from, to) };
  });
}

function faqGroups(data) {
  return groups(data).map((g) => `      <section class="sss-group" id="konu-${g.id}">
        <h2 class="sss-group-title">${g.label}</h2>
${g.items.map((item, n) => `        <details class="sss-item" id="${item.id}"${n === 0 ? ' open' : ''}>
          <summary><h3>${item.q}</h3><span class="sss-ico" aria-hidden="true"></span></summary>
          <div class="sss-a"><p>${item.html}</p></div>
        </details>`).join('\n')}
      </section>`).join('\n');
}

const PAGE_CSS = `
:root{--primary:#3b82f6;--bg:#020617;--card:#0b1324;--line:rgba(255,255,255,.08);--dim:#a7b6cc}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:#fff;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit}
.top{position:fixed;top:0;left:0;width:100%;height:100px;padding:0 8%;display:flex;justify-content:space-between;align-items:center;background:rgba(2,6,23,.9);z-index:4000;border-bottom:1px solid rgba(255,255,255,.1)}
.top::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.top::after{content:"";position:absolute;bottom:-1px;left:10%;width:80%;height:1px;background:linear-gradient(90deg,transparent,var(--primary),transparent);box-shadow:0 0 20px var(--primary)}
.top-logo img{height:90px;width:auto;display:block;transition:transform .3s ease;filter:drop-shadow(0 0 8px rgba(59,130,246,.6))}
.top-logo img:hover{transform:scale(1.05);filter:drop-shadow(0 0 15px rgba(59,130,246,.9))}
.top-links{display:flex;gap:30px;list-style:none}
.top-links a{text-decoration:none;color:#bbcee7;font-weight:600;font-size:.95rem;transition:.3s}
.top-links a:hover{color:var(--primary)}
.top-r{display:flex;align-items:center;gap:15px}
.ld{position:relative}
.ld-btn{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);color:#fff;padding:9px 16px;border-radius:50px;cursor:pointer;font:600 .85rem 'Plus Jakarta Sans',sans-serif;display:flex;align-items:center;gap:8px;transition:all .25s ease;white-space:nowrap}
.ld-btn:hover{background:rgba(59,130,246,.18);border-color:rgba(59,130,246,.5)}
.ld-btn .chev{font-size:.6rem;opacity:.7;transition:transform .25s ease}
.ld.open .chev{transform:rotate(180deg)}
.ld-menu{position:absolute;top:calc(100% + 12px);right:0;background:#0a1020;border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden;min-width:185px;box-shadow:0 24px 60px rgba(0,0,0,.7);display:none;z-index:9999}
[dir="rtl"] .ld-menu{right:auto;left:0}
.ld.open .ld-menu{display:block}
.ldm-h{padding:10px 16px 8px;font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);font-weight:600;border-bottom:1px solid rgba(255,255,255,.06)}
.ld-menu a{display:flex;align-items:center;gap:11px;padding:11px 16px;color:rgba(255,255,255,.65);text-decoration:none;font-size:.875rem;font-weight:500;border-bottom:1px solid rgba(255,255,255,.04);position:relative}
.ld-menu a:last-child{border-bottom:none}
.ld-menu a:hover{background:rgba(59,130,246,.14);color:#fff}
.ld-menu a.on{color:#fff;font-weight:700;background:rgba(59,130,246,.16)}
.ld-menu a.on::after{content:'✓';position:absolute;right:14px;color:var(--primary);font-size:.85rem}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;text-decoration:none;font-weight:700;border-radius:12px;transition:all .3s cubic-bezier(.4,0,.2,1)}
.btn-p{background:var(--primary);color:#fff;box-shadow:0 4px 15px rgba(59,130,246,.4);padding:14px 26px;font-size:.95rem}.btn-p:hover{box-shadow:0 6px 20px rgba(59,130,246,.6);transform:translateY(-2px)}
.top-r .btn-p{padding:10px 20px;font-size:.85rem}
.btn-o{border:2px solid var(--primary);color:var(--primary);padding:12px 24px;font-size:.95rem}.btn-o:hover{background:var(--primary);color:#fff}
.burger{display:none;background:none;border:0;color:#fff;font-size:1.5rem;cursor:pointer;padding:10px;z-index:3000}
.hero{position:relative;text-align:center;padding:180px 24px 50px;overflow:hidden}
.hero::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(50% 70% at 25% 10%,rgba(66,83,211,.18),transparent 75%),radial-gradient(45% 60% at 80% 40%,rgba(59,130,246,.12),transparent 75%)}
.kicker{display:inline-flex;align-items:center;gap:10px;color:#60a5fa;font-size:.78rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;margin-bottom:16px}
.kicker::before{content:"";width:22px;height:2px;background:var(--primary)}
.hero h1{font-size:clamp(2.2rem,5vw,3.6rem);line-height:1.08;font-weight:800;letter-spacing:-.02em;margin-bottom:18px}
.hero .sub{color:var(--dim);font-size:1.06rem;max-width:720px;margin:0 auto}
.quick{max-width:820px;margin:30px auto 0;text-align:left;background:linear-gradient(120deg,rgba(59,130,246,.12),rgba(15,23,42,.6));border:1px solid rgba(59,130,246,.3);border-radius:18px;padding:20px 24px;color:#dbe4f0;font-size:.97rem;line-height:1.7}
.quick strong{color:#fff}.quick a{color:#93c5fd}
.quick a[href^="tel"],.sss-a strong{white-space:nowrap}.quick a[href^="tel"],.sss-a strong{white-space:nowrap}
.chips{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:28px}
.chips a{text-decoration:none;font-size:.88rem;font-weight:600;padding:9px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.14);color:#e2e8f0;background:rgba(255,255,255,.03)}
.chips a:hover{border-color:var(--primary);background:rgba(59,130,246,.12)}
.wrap{max-width:1240px;margin:0 auto;padding:30px 24px 40px;display:grid;grid-template-columns:240px minmax(0,1fr);gap:48px;align-items:start}
.side{position:sticky;top:130px}
.side p{font-size:.76rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#64748b;margin-bottom:12px}
.side a{display:flex;justify-content:space-between;gap:10px;text-decoration:none;color:#cbd5e1;font-weight:600;font-size:.95rem;padding:10px 14px;border-radius:12px;border-left:2px solid transparent}
.side a span{color:#64748b;font-weight:700;font-size:.8rem}
.side a:hover,.side a.on{background:rgba(59,130,246,.1);border-left-color:var(--primary);color:#fff}
.sss-group{scroll-margin-top:130px;margin-bottom:44px}
.sss-group-title{font-size:1.5rem;font-weight:800;margin-bottom:16px;letter-spacing:-.01em}
.sss-item{scroll-margin-top:130px;background:var(--card);border:1px solid var(--line);border-radius:16px;margin-bottom:12px;transition:border-color .2s}
.sss-item[open]{border-color:rgba(59,130,246,.4);background:linear-gradient(180deg,rgba(59,130,246,.06),var(--card))}
.sss-item summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:20px 22px}
.sss-item summary::-webkit-details-marker{display:none}
.sss-item h3{font-size:1.05rem;font-weight:700;line-height:1.45}
.sss-ico{flex:0 0 30px;height:30px;border-radius:50%;background:rgba(59,130,246,.14);position:relative}
.sss-ico::before,.sss-ico::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:2px;background:#93c5fd;transform:translate(-50%,-50%);transition:transform .2s}
.sss-ico::after{transform:translate(-50%,-50%) rotate(90deg)}
.sss-item[open] .sss-ico::after{transform:translate(-50%,-50%) rotate(0)}
.sss-a{padding:0 22px 20px}
.sss-a p{color:var(--dim);line-height:1.8;font-size:.98rem}
.sss-a a{color:#93c5fd}
.cta{max-width:1100px;margin:20px auto 90px;padding:56px 24px;text-align:center;border-radius:24px;border:1px solid rgba(59,130,246,.35);background:radial-gradient(500px 260px at 15% 0%,rgba(66,83,211,.2),transparent 70%),radial-gradient(500px 260px at 85% 0%,rgba(59,130,246,.16),transparent 70%),rgba(15,23,42,.7)}
.cta h2{font-size:clamp(1.6rem,3.2vw,2.4rem);font-weight:800;margin-bottom:12px}
.cta p{color:var(--dim);max-width:620px;margin:0 auto 26px}
.cta .row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
@media (max-width:1240px) and (min-width:769px){.top{padding:0 3%}.top-links{gap:18px}.top-links a{font-size:.86rem;white-space:nowrap}}
@media (max-width:980px) and (min-width:769px){.top-links{gap:12px}.top-links a{font-size:.8rem}.top-logo img{height:64px}}
@media (max-width:960px){.wrap{grid-template-columns:1fr;gap:10px}.side{display:none}}
@media (max-width:768px){
 .top{height:70px;padding:0 5%}.top-logo img{height:70px}
 .burger{display:block}
 .top-links{position:fixed;top:0;right:0;width:280px;height:100vh;background:#0f172a;flex-direction:column;gap:22px;padding:100px 30px;z-index:2500;transform:translateX(100%);transition:transform .4s ease-in-out;box-shadow:-10px 0 30px rgba(0,0,0,.5)}
 .top-links.open{transform:translateX(0)}
 .top-links a{font-size:1.05rem}
 .hero{padding-top:120px}
}
@media (max-width:600px){
 .hero{padding:110px 16px 36px}
 .wrap{padding:16px}
 .cta{margin:10px 16px 60px;padding:40px 20px}
 .cta .btn{width:100%}
 .top-r{gap:10px}.top-r .btn-p{padding:9px 14px;font-size:.8rem}
 .ld-btn{padding:8px 12px}
 body{overflow-x:hidden}
}
[dir="rtl"] .quick{text-align:right}
[dir="rtl"] .side a{border-left:0;border-right:2px solid transparent}
[dir="rtl"] .top-links{right:auto}

`;

function buildPage(locale, data) {
  const canonical = `${BASE}${locale.urlPath}`;
  const rtl = locale.lang === 'ar' ? ' dir="rtl"' : '';
  const ui = UI[locale.lang] || UI.tr;
  const gs = groups(data);
  const t = (k) => k.split('.').reduce((o, x) => (o ? o[x] : undefined), DICT[locale.lang]) || k.split('.').reduce((o, x) => (o ? o[x] : undefined), DICT.tr);
  const order = ['tr', 'en', 'de', 'ar', 'ru', 'fr'];
  const byLang = Object.fromEntries(SSS_LOCALES.map((l) => [l.lang, l]));
  const langLinks = order.filter((l) => byLang[l]).map((l) => `<a href="${byLang[l].urlPath}" hreflang="${l}"${l === locale.lang ? ' class="on" aria-current="page"' : ''}><span>${LANG_META[l][0]}</span><span>${LANG_META[l][1]}</span></a>`).join('\n          ');

  return `<!DOCTYPE html>
<html lang="${locale.lang}"${rtl}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(data.meta.title)}</title>
  <meta name="description" content="${esc(data.meta.description)}" />
  <meta name="keywords" content="${esc(data.meta.keywords)}" />
  <meta name="robots" content="index, follow">
  <meta name="geo.region" content="TR-06" />
  <meta name="geo.placename" content="Ankara" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" type="application/rss+xml" href="${BASE}/blog/feed.xml" title="Ozturksoft Blog RSS" />
  <link rel="alternate" type="text/plain" href="${BASE}/llms.txt" title="LLM Context" />
  <link rel="alternate" type="text/plain" href="${BASE}/ai.txt" title="AI Context" />
${hreflangBlock()}
  <link rel="icon" href="/favicon.ico" sizes="any">
  <meta property="og:title" content="${esc(data.meta.ogTitle || data.meta.title)}">
  <meta property="og:description" content="${esc(data.meta.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${BASE}/og-image.png">
  <meta property="og:type" content="website">
  <script type="application/ld+json">
${faqSchema(data.items)}
  </script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" crossorigin>
  <link rel="stylesheet" href="/site-footer.css">
  <style>${PAGE_CSS}</style>
</head>
<body>
  <nav class="top" aria-label="Main">
    <a href="${locale.home}" class="top-logo"><img src="/images/logo.png" alt="Ozturksoft" width="94" height="90"></a>
    <ul class="top-links" id="topLinks">
      <li><a href="${locale.home}">${t('nav.home')}</a></li>
      <li><a href="/hakkimizda">${t('nav.about')}</a></li>
      <li><a href="${locale.services}">${t('nav.services')}</a></li>
      <li><a href="/urunler">${t('nav.products')}</a></li>
      <li><a href="${AI_HUB[locale.lang]}">${t('nav.ai')}</a></li>
      <li><a href="${locale.blog}">${t('nav.blog')}</a></li>
      <li><a href="${locale.contact}">${t('nav.contact')}</a></li>
    </ul>
    <div class="top-r">
      <div class="ld" id="ld">
        <button class="ld-btn" type="button" aria-label="Select language" aria-haspopup="true" aria-expanded="false" onclick="var w=document.getElementById('ld');w.classList.toggle('open');this.setAttribute('aria-expanded',w.classList.contains('open'))">
          <span>${LANG_META[locale.lang][0]}</span><span>${locale.lang.toUpperCase()}</span><i class="fas fa-chevron-down chev"></i>
        </button>
        <div class="ld-menu">
          <div class="ldm-h">Dil / Language</div>
          ${langLinks}
        </div>
      </div>
      <a href="${locale.contact}" class="btn btn-p">${t('nav.quoteBtn')}</a>
      <button class="burger" type="button" aria-label="${ui.menu}" aria-controls="topLinks" aria-expanded="false" onclick="var l=document.getElementById('topLinks');l.classList.toggle('open');this.setAttribute('aria-expanded',l.classList.contains('open'))"><i class="fas fa-bars"></i></button>
    </div>
  </nav>

  <section class="hero">
    <span class="kicker">${ui.kicker}</span>
    <h1>${data.hero.title}</h1>
    <p class="sub">${data.hero.subtitle}</p>
    <div class="quick">${data.hero.quick}</div>
    <div class="chips">
      ${gs.map((g) => `<a href="#konu-${g.id}">${g.label}</a>`).join('\n      ')}
    </div>
  </section>

  <main class="wrap">
    <aside class="side" aria-label="${ui.topics}">
      <p>${ui.topics}</p>
      ${gs.map((g) => `<a href="#konu-${g.id}">${g.label}<span>${g.items.length}</span></a>`).join('\n      ')}
    </aside>
    <div class="list">
${faqGroups(data)}
    </div>
  </main>

  <section class="cta">
    <h2>${ui.ctaT}</h2>
    <p>${ui.ctaD}</p>
    <div class="row">
      <a href="${locale.contact}" class="btn btn-p">${ui.ctaB} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
      <a href="tel:+905465496806" class="btn btn-o"><i class="fas fa-phone" aria-hidden="true"></i> ${ui.call}</a>
    </div>
  </section>

  <footer></footer>
  <script>
  (function(){
    function openHash(){var id=decodeURIComponent(location.hash.slice(1));var el=id&&document.getElementById(id);if(el&&el.tagName==='DETAILS')el.open=true;}
    openHash();window.addEventListener('hashchange',openHash);
    document.addEventListener('click',function(e){var w=document.getElementById('ld');if(w&&!w.contains(e.target))w.classList.remove('open');});
    var links=[].slice.call(document.querySelectorAll('.side a'));
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-30% 0px -60% 0px'});
    document.querySelectorAll('.sss-group').forEach(function(g){io.observe(g)});}
  })();
  </script>
</body>
</html>`;
}

for (const locale of SSS_LOCALES) {
  const data = SSS_DATA[locale.lang];
  if (!data) throw new Error(`Missing SSS_DATA for ${locale.lang}`);
  const outPath = resolve(root, locale.file);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, applyFooter(buildPage(locale, data)));
  console.log(`✓ ${locale.file} (${data.items.length} FAQ)`);
}

// Sitemap: ensure all FAQ URLs
const sitemapPath = resolve(root, 'public/sitemap.xml');
let sitemap = readFileSync(sitemapPath, 'utf8');
const today = new Date().toISOString().slice(0, 10);

for (const locale of SSS_LOCALES) {
  const loc = `${BASE}${locale.urlPath}`;
  if (sitemap.includes(`<loc>${loc}</loc>`)) continue;
  sitemap = sitemap.replace(
    '</urlset>',
    `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.92</priority>
  </url>
</urlset>`
  );
}
writeFileSync(sitemapPath, sitemap);
console.log('Sitemap: FAQ URLs updated');

// llms.txt — multilingual FAQ URLs
const llmsPath = resolve(root, 'public/llms.txt');
let llms = readFileSync(llmsPath, 'utf8');
const faqBlock = `## FAQ Hub (multilingual)
- Turkish: ${BASE}/sss
- English: ${BASE}/en/faq
- German: ${BASE}/de/faq
- French: ${BASE}/fr/faq
- Arabic: ${BASE}/ar/faq
- Russian: ${BASE}/ru/faq
`;
if (!llms.includes('## FAQ Hub (multilingual)')) {
  llms = llms.replace('## FAQ Hub (cite for quick answers)', `${faqBlock}## FAQ Hub (cite for quick answers)`);
  writeFileSync(llmsPath, llms);
  console.log('llms.txt: FAQ locale URLs added');
}
