import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogDir = resolve(__dirname, '../blog');

const POSTS = {
  'seo-nedir-onemi-rehberi-2026.html': {
    slug: 'seo-nedir-onemi-rehberi-2026',
    headline: 'SEO Nedir? Arama Motoru Optimizasyonunun Önemi [2026]',
    ogTitle: 'SEO Nedir? Arama Motoru Optimizasyonu Rehberi | Ozturksoft',
    ogDesc: 'SEO nedir, neden önemlidir? Teknik SEO, içerik stratejisi ve Google sıralaması için rehber.',
    twitterDesc: 'SEO nedir ve işletmeniz için neden kritik? 2026 rehberi.',
    section: 'SEO',
    date: '2026-06-22T12:00:00+03:00',
    keywords: ['seo nedir', 'arama motoru optimizasyonu', 'teknik seo', 'google sıralama'],
    breadcrumb: 'SEO Nedir?',
  },
  'geo-nedir-generative-engine-optimization-rehberi-2026.html': {
    slug: 'geo-nedir-generative-engine-optimization-rehberi-2026',
    headline: 'GEO Nedir? Generative Engine Optimization Rehberi [2026]',
    ogTitle: 'GEO Nedir? Generative Engine Optimization Rehberi | Ozturksoft',
    ogDesc: 'GEO nedir? ChatGPT, Perplexity ve AI arama motorlarında görünürlük rehberi.',
    twitterDesc: 'GEO ile AI arama motorlarında markanızı öne çıkarın.',
    section: 'GEO',
    date: '2026-06-22T12:00:00+03:00',
    keywords: ['geo nedir', 'generative engine optimization', 'ai seo', 'chatgpt seo'],
    breadcrumb: 'GEO Nedir?',
  },
  'e-ticaret-sitesi-yaptirmak-maliyeti-2026.html': {
    slug: 'e-ticaret-sitesi-yaptirmak-maliyeti-2026',
    headline: 'E-Ticaret Sitesi Yaptırmak: Maliyet ve Fiyat Rehberi [2026]',
    ogTitle: 'E-Ticaret Sitesi Maliyeti ve Fiyat Rehberi [2026] | Ozturksoft',
    ogDesc: 'E-ticaret sitesi yaptırmak ne kadar tutar? 2026 fiyat aralıkları ve platform karşılaştırması.',
    twitterDesc: '2026 e-ticaret sitesi maliyet rehberi — fiyat tablosu dahil.',
    section: 'E-Ticaret',
    date: '2026-06-22T10:00:00+03:00',
    keywords: ['e-ticaret sitesi maliyeti', 'e-ticaret yaptırmak', 'online mağaza fiyat'],
    breadcrumb: 'E-Ticaret Maliyeti',
  },
  'ozel-yazilim-gelistirme-nedir-rehberi.html': {
    slug: 'ozel-yazilim-gelistirme-nedir-rehberi',
    headline: 'Özel Yazılım Geliştirme Nedir? Avantajları, Maliyet ve Süreç [2026]',
    ogTitle: 'Özel Yazılım Geliştirme Nedir? Rehber [2026] | Ozturksoft',
    ogDesc: 'Özel yazılım nedir, ne zaman tercih edilir? Maliyet, süreç ve hazır yazılım karşılaştırması.',
    twitterDesc: 'Özel yazılım geliştirme rehberi — maliyet ve avantajlar.',
    section: 'Yazılım',
    date: '2026-06-22T10:00:00+03:00',
    keywords: ['özel yazılım geliştirme', 'özel yazılım nedir', 'özel yazılım maliyeti'],
    breadcrumb: 'Özel Yazılım',
  },
  'whatsapp-chatbot-isletme-rehberi-2026.html': {
    slug: 'whatsapp-chatbot-isletme-rehberi-2026',
    headline: 'WhatsApp Chatbot: İşletmeler İçin Kurulum ve Maliyet Rehberi [2026]',
    ogTitle: 'WhatsApp Chatbot Kurulum ve Maliyet Rehberi [2026] | Ozturksoft',
    ogDesc: 'WhatsApp Business API chatbot kurulumu, GPT entegrasyonu ve maliyet rehberi.',
    twitterDesc: 'İşletmeniz için WhatsApp chatbot rehberi — maliyet ve kurulum.',
    section: 'Chatbot',
    date: '2026-06-22T10:00:00+03:00',
    keywords: ['whatsapp chatbot', 'whatsapp business api', 'chatbot maliyeti'],
    breadcrumb: 'WhatsApp Chatbot',
  },
  'kurumsal-web-sitesi-yaptirmak-rehberi-2026.html': {
    slug: 'kurumsal-web-sitesi-yaptirmak-rehberi-2026',
    headline: 'Kurumsal Web Sitesi Yaptırmak: Maliyet, Özellikler ve Rehber [2026]',
    ogTitle: 'Kurumsal Web Sitesi Maliyet Rehberi [2026] | Ozturksoft',
    ogDesc: 'Kurumsal web sitesi yaptırmak ne kadar? SEO, CMS ve çoklu dil fiyat rehberi.',
    twitterDesc: 'Kurumsal web sitesi maliyet ve özellik rehberi 2026.',
    section: 'Web Tasarım',
    date: '2026-06-22T10:00:00+03:00',
    keywords: ['kurumsal web sitesi', 'kurumsal site maliyeti', 'şirket web sitesi'],
    breadcrumb: 'Kurumsal Web',
    faq: [
      { q: 'Kurumsal web sitesi ne kadar sürer?', a: 'Standart proje 3–6 hafta, çok dilli kurumsal site 6–10 hafta sürer.' },
      { q: 'Kurumsal web sitesi ne kadar tutar?', a: '2026\'da 5–10 sayfalık kurumsal site 15.000–45.000 TL, CMS\'li projeler 35.000–90.000 TL aralığındadır.' },
    ],
  },
  'mobil-uygulama-maliyeti-2026.html': {
    slug: 'mobil-uygulama-maliyeti-2026',
    headline: 'Mobil Uygulama Yaptırmak: Maliyet ve Fiyat Rehberi [2026]',
    ogTitle: 'Mobil Uygulama Maliyeti Rehberi [2026] | Ozturksoft',
    ogDesc: 'Mobil uygulama yaptırmak ne kadar tutar? iOS, Android, Flutter maliyetleri 2026.',
    twitterDesc: 'Mobil uygulama geliştirme maliyet rehberi — Flutter vs native.',
    section: 'Mobil',
    date: '2026-06-22T10:00:00+03:00',
    keywords: ['mobil uygulama maliyeti', 'uygulama yaptırmak', 'flutter maliyet'],
    breadcrumb: 'Mobil Uygulama Maliyeti',
    faq: [
      { q: 'Mobil uygulama yaptırmak ne kadar tutar?', a: 'Ortalama KOBİ uygulaması için 120.000–200.000 TL bütçe planlayın.' },
      { q: 'Flutter mı native mi?', a: 'Flutter çoğu proje için maliyet/performans dengesinde idealdir. Oyun veya ağır grafik için native tercih edilir.' },
    ],
  },
  'yapay-zeka-danismanligi-isletmeler-rehberi-2026.html': {
    slug: 'yapay-zeka-danismanligi-isletmeler-rehberi-2026',
    headline: 'Yapay Zeka Danışmanlığı: İşletmeler İçin AI Stratejisi [2026]',
    ogTitle: 'Yapay Zeka Danışmanlığı Rehberi [2026] | Ozturksoft',
    ogDesc: 'Yapay zeka danışmanlığı nedir? ROI analizi, chatbot, otomasyon ve AI yol haritası.',
    twitterDesc: 'İşletmeler için yapay zeka danışmanlığı ve strateji rehberi.',
    section: 'Yapay Zeka',
    date: '2026-06-22T10:00:00+03:00',
    keywords: ['yapay zeka danışmanlığı', 'ai danışmanlık', 'işletme yapay zeka'],
    breadcrumb: 'AI Danışmanlığı',
    faq: [
      { q: 'AI danışmanlığı ne kadar tutar?', a: 'Keşif oturumu genelde ücretsiz; PoC projeleri 40.000–80.000 TL, tam ölçekli AI entegrasyonu 150.000–400.000+ TL.' },
      { q: 'Hangi süreçler AI ile otomatikleştirilir?', a: 'Müşteri hizmetleri chatbot, belge/fatura otomasyonu, LLM entegrasyonu ve WhatsApp satış asistanı en yaygın alanlardır.' },
    ],
  },
  'crm-erp-entegrasyonu-rehberi-2026.html': {
    slug: 'crm-erp-entegrasyonu-rehberi-2026',
    headline: 'CRM ve ERP Entegrasyonu: Maliyet, Süreç ve Yazılım Rehberi [2026]',
    ogTitle: 'CRM / ERP Entegrasyonu Rehberi [2026] | Ozturksoft',
    ogDesc: 'CRM ERP entegrasyonu nasıl yapılır? Logo, Netsis, Salesforce API bağlantı rehberi.',
    twitterDesc: 'CRM ve ERP entegrasyonu — maliyet ve süreç rehberi.',
    section: 'Entegrasyon',
    date: '2026-06-22T10:00:00+03:00',
    keywords: ['crm entegrasyonu', 'erp entegrasyonu', 'logo api', 'netsis entegrasyon'],
    breadcrumb: 'CRM / ERP',
    faq: [
      { q: 'CRM ERP entegrasyonu ne kadar sürer?', a: 'Basit API bağlantısı 2–4 hafta, çoklu sistem entegrasyonu 2–4 ay sürebilir.' },
      { q: 'Hangi sistemler entegre edilebilir?', a: 'Logo Tiger, Netsis, Mikro, SAP, Salesforce, HubSpot ve özel ERP sistemleri REST API ile entegre edilebilir.' },
    ],
  },
  'istanbul-yapay-zeka-cozumleri-rehberi.html': {
    slug: 'istanbul-yapay-zeka-cozumleri-rehberi',
    headline: "İstanbul'da Yapay Zeka Çözümleri: İşletmeniz İçin AI Rehberi [2026]",
    ogTitle: "İstanbul Yapay Zeka Çözümleri Rehberi [2026] | Ozturksoft",
    ogDesc: "İstanbul'da chatbot, LLM entegrasyonu ve süreç otomasyonu rehberi. Ankara merkezli, Türkiye geneli hizmet.",
    twitterDesc: "İstanbul işletmeleri için yapay zeka çözümleri rehberi.",
    section: 'Yapay Zeka',
    date: '2026-06-15T10:00:00+03:00',
    keywords: ['istanbul yapay zeka', 'istanbul ai çözümleri', 'istanbul chatbot'],
    breadcrumb: 'İstanbul AI',
    faq: [
      { q: "İstanbul'da yapay zeka projesi ne kadar tutar?", a: 'Chatbot projeleri 25.000–150.000 TL, LLM entegrasyonu 60.000–200.000 TL aralığındadır.' },
      { q: 'Ankara merkezli firma İstanbul\'a hizmet verir mi?', a: 'Evet. Ozturksoft Ankara merkezlidir ancak İstanbul dahil tüm Türkiye\'ye uzaktan ve yerinde hizmet sunar.' },
    ],
  },
  'izmir-yapay-zeka-cozumleri-rehberi.html': {
    slug: 'izmir-yapay-zeka-cozumleri-rehberi',
    headline: "İzmir'de Yapay Zeka Çözümleri: İşletmeniz İçin AI Rehberi [2026]",
    ogTitle: "İzmir Yapay Zeka Çözümleri Rehberi [2026] | Ozturksoft",
    ogDesc: "İzmir'de chatbot, LLM entegrasyonu ve süreç otomasyonu. Ankara merkezli, Türkiye geneli AI hizmeti.",
    twitterDesc: "İzmir işletmeleri için yapay zeka çözümleri rehberi.",
    section: 'Yapay Zeka',
    date: '2026-06-15T10:00:00+03:00',
    keywords: ['izmir yapay zeka', 'izmir ai çözümleri', 'izmir chatbot'],
    breadcrumb: 'İzmir AI',
    faq: [
      { q: "İzmir'de yapay zeka danışmanlığı alınır mı?", a: 'Evet. Ozturksoft uzaktan ve yerinde keşif görüşmeleriyle İzmir\'deki işletmelere AI danışmanlığı sunar.' },
      { q: 'İzmir için hangi AI çözümleri popüler?', a: 'E-ticaret chatbot, turizm sektörü otomasyonu ve CRM entegrasyonlu LLM asistanları en çok talep edilen çözümlerdir.' },
    ],
  },
  'bursa-yapay-zeka-cozumleri-rehberi.html': {
    slug: 'bursa-yapay-zeka-cozumleri-rehberi',
    headline: "Bursa'da Yapay Zeka Çözümleri: İşletmeniz İçin AI Rehberi [2026]",
    ogTitle: "Bursa Yapay Zeka Çözümleri Rehberi [2026] | Ozturksoft",
    ogDesc: "Bursa'da chatbot, LLM entegrasyonu ve süreç otomasyonu. Sanayi ve üretim odaklı AI rehberi.",
    twitterDesc: "Bursa işletmeleri için yapay zeka çözümleri rehberi.",
    section: 'Yapay Zeka',
    date: '2026-06-15T10:00:00+03:00',
    keywords: ['bursa yapay zeka', 'bursa ai çözümleri', 'bursa otomasyon'],
    breadcrumb: 'Bursa AI',
    faq: [
      { q: "Bursa'da üretim süreçleri AI ile otomatikleştirilir mi?", a: 'Evet. RPA ve makine öğrenmesi ile üretim planlama, kalite kontrol ve envanter yönetimi otomatikleştirilebilir.' },
      { q: 'Bursa sanayi firmaları için AI maliyeti?', a: 'Süreç otomasyonu PoC projeleri 40.000–80.000 TL, tam entegrasyon 150.000–400.000 TL aralığındadır.' },
    ],
  },
  'antalya-yapay-zeka-cozumleri-rehberi.html': {
    slug: 'antalya-yapay-zeka-cozumleri-rehberi',
    headline: "Antalya'da Yapay Zeka Çözümleri: İşletmeniz İçin AI Rehberi [2026]",
    ogTitle: "Antalya Yapay Zeka Çözümleri Rehberi [2026] | Ozturksoft",
    ogDesc: "Antalya'da chatbot, LLM entegrasyonu ve turizm sektörü AI çözümleri rehberi.",
    twitterDesc: "Antalya işletmeleri için yapay zeka çözümleri rehberi.",
    section: 'Yapay Zeka',
    date: '2026-06-15T10:00:00+03:00',
    keywords: ['antalya yapay zeka', 'antalya ai çözümleri', 'antalya chatbot'],
    breadcrumb: 'Antalya AI',
    faq: [
      { q: "Antalya turizm sektörü için chatbot faydalı mı?", a: 'Evet. Rezervasyon, çok dilli müşteri desteği ve otel/transfer yönlendirme için chatbot turizmde yüksek ROI sağlar.' },
      { q: "Antalya'da AI projesi ne kadar sürer?", a: 'Temel chatbot 2–4 hafta, CRM entegreli AI asistan 6–10 haftada teslim edilebilir.' },
    ],
  },
  'konya-yapay-zeka-cozumleri-rehberi.html': {
    slug: 'konya-yapay-zeka-cozumleri-rehberi',
    headline: "Konya'da Yapay Zeka Çözümleri: İşletmeniz İçin AI Rehberi [2026]",
    ogTitle: "Konya Yapay Zeka Çözümleri Rehberi [2026] | Ozturksoft",
    ogDesc: "Konya'da chatbot, LLM entegrasyonu ve tarım/sanayi AI çözümleri rehberi.",
    twitterDesc: "Konya işletmeleri için yapay zeka çözümleri rehberi.",
    section: 'Yapay Zeka',
    date: '2026-06-15T10:00:00+03:00',
    keywords: ['konya yapay zeka', 'konya ai çözümleri', 'konya chatbot'],
    breadcrumb: 'Konya AI',
    faq: [
      { q: "Konya'da KOBİ'ler için AI uygun mu?", a: 'Evet. WhatsApp chatbot ve süreç otomasyonu Konya KOBİ\'leri için hızlı ROI sağlayan giriş seviyesi AI çözümleridir.' },
      { q: 'Konya merkezli AI desteği nasıl alınır?', a: 'Ozturksoft Ankara merkezlidir; Konya\'ya uzaktan danışmanlık ve gerektiğinde yerinde keşif sunar.' },
    ],
  },
};

function buildOgBlock(p, desc) {
  const url = `https://ozturksoft.net/blog/${p.slug}`;
  return `
  <link rel="icon" href="/favicon-48x48.png" sizes="48x48">
  <link rel="icon" href="/favicon-32x32.png" sizes="32x32">
  <link rel="icon" href="/favicon-16x16.png" sizes="16x16">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#0d6efd">

  <meta property="og:title" content="${p.ogTitle}">
  <meta property="og:description" content="${p.ogDesc}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="https://ozturksoft.net/og-image.png">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:site_name" content="Ozturksoft">
  <meta property="article:published_time" content="${p.date}">
  <meta property="article:author" content="Samet Öztürk">
  <meta property="article:section" content="${p.section}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@ozturksoft_">
  <meta name="twitter:title" content="${p.ogTitle}">
  <meta name="twitter:description" content="${p.twitterDesc}">
  <meta name="twitter:image" content="https://ozturksoft.net/og-image.png">`;
}

function buildBlogPosting(p, desc) {
  const url = `https://ozturksoft.net/blog/${p.slug}`;
  const kw = JSON.stringify(p.keywords);
  return `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "${url}#article",
    "headline": ${JSON.stringify(p.headline)},
    "description": ${JSON.stringify(desc)},
    "image": "https://ozturksoft.net/og-image.png",
    "datePublished": "${p.date}",
    "dateModified": "${p.date}",
    "author": {
      "@type": "Person",
      "@id": "https://ozturksoft.net/#founder",
      "name": "Samet Öztürk",
      "jobTitle": "Founder & Software Engineer",
      "url": "https://ozturksoft.net/hakkimizda"
    },
    "publisher": { "@id": "https://ozturksoft.net/#organization" },
    "mainEntityOfPage": { "@id": "${url}#article" },
    "inLanguage": "tr-TR",
    "keywords": ${kw},
    "articleSection": ${JSON.stringify(p.section)}
  }
  </script>`;
}

function buildBreadcrumb(p) {
  const url = `https://ozturksoft.net/blog/${p.slug}`;
  return `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://ozturksoft.net/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://ozturksoft.net/blog" },
      { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(p.breadcrumb)}, "item": "${url}" }
    ]
  }
  </script>`;
}

function buildFaq(faq) {
  return `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
${faq.map((f, i) => `      { "@type": "Question", "name": ${JSON.stringify(f.q)}, "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(f.a)} } }${i < faq.length - 1 ? ',' : ''}`).join('\n')}
    ]
  }
  </script>`;
}

for (const [file, meta] of Object.entries(POSTS)) {
  const path = resolve(blogDir, file);
  let html = readFileSync(path, 'utf8');

  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  const desc = descMatch ? descMatch[1] : meta.ogDesc;

  if (!html.includes('og:title')) {
    if (html.includes('<link rel="icon" href="/favicon.ico"')) {
      html = html.replace(
        /<link rel="icon" href="\/favicon\.ico"[^>]*>/,
        `<link rel="icon" href="/favicon.ico" sizes="any">${buildOgBlock(meta, desc)}`
      );
    } else if (html.includes('<meta name="author"')) {
      html = html.replace(
        /(<meta name="author"[^>]*>)/,
        `$1${buildOgBlock(meta, desc)}`
      );
    }
  }

  html = html.replace(
    /<script type="application\/ld\+json">\s*\{[^]*?"@type":\s*"BlogPosting"[^]*?<\/script>/,
    buildBlogPosting(meta, desc)
  );

  if (!html.includes('"@type": "BreadcrumbList"') && !html.includes('"@type":"BreadcrumbList"')) {
    html = html.replace(
      /(<script type="application\/ld\+json">\s*\{[^]*?"@type":\s*"BlogPosting"[^]*?<\/script>)/,
      `$1\n  ${buildBreadcrumb(meta)}`
    );
  }

  if (meta.faq && !html.includes('FAQPage')) {
    const styleIdx = html.indexOf('<style id="critical">');
    if (styleIdx > -1) {
      html = html.slice(0, styleIdx) + buildFaq(meta.faq) + '\n  ' + html.slice(styleIdx);
    }
  }

  writeFileSync(path, html);
  console.log('SEO upgraded:', file);
}

// Fix background-attachment:fixed in all blog files
for (const file of readdirSync(blogDir).filter(f => f.endsWith('.html'))) {
  const path = resolve(blogDir, file);
  let html = readFileSync(path, 'utf8');
  if (html.includes('background-attachment:fixed')) {
    html = html.replace(/background-attachment:fixed/g, 'background-attachment:scroll');
    writeFileSync(path, html);
    console.log('Fixed bg-attachment:', file);
  }
}
