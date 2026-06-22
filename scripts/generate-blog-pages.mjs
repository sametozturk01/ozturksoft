import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogDir = resolve(__dirname, '../blog');
mkdirSync(blogDir, { recursive: true });

const NAV_EXTRA_CSS = `.btn{display:inline-block;padding:14px 28px;border-radius:8px;font-weight:700;text-decoration:none;transition:.3s}.btn-primary:hover{background:#2563eb}.menu-toggle{display:none;background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer}@media(max-width:768px){nav{height:70px!important;padding:0 5%!important}.logo-img{height:70px!important}.menu-toggle{display:block!important;color:#fff;font-size:1.5rem;z-index:3000}.nav-links{position:fixed!important;top:0;right:0;width:280px;height:100vh;background:#0f172a;display:flex!important;flex-direction:column!important;padding:100px 30px!important;z-index:2500;transform:translateX(100%);transition:transform .4s ease-in-out;box-shadow:-10px 0 30px rgba(0,0,0,.5)}.nav-links.active{transform:translateX(0%)!important}.btn{width:100%}}.lang-drop-wrap{position:relative}.lang-drop-btn{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);color:#fff;padding:9px 16px;border-radius:50px;cursor:pointer;font-size:.85rem;font-weight:600;display:flex;align-items:center;gap:8px;transition:all .25s ease;white-space:nowrap}.lang-drop-btn:hover{background:rgba(59,130,246,.18);border-color:rgba(59,130,246,.5)}.lang-drop-btn .chev{transition:transform .25s ease;font-size:.6rem;opacity:.7}.lang-drop-btn.open .chev{transform:rotate(180deg)}#langDropMenu{position:absolute;top:calc(100% + 12px);right:0;background:rgba(10,16,32,.97);border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden;min-width:185px;box-shadow:0 24px 60px rgba(0,0,0,.7);display:none;z-index:2000;backdrop-filter:blur(20px)}#langDropMenu.open{display:block}.ldm-header{padding:10px 16px 8px;font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);font-weight:600;border-bottom:1px solid rgba(255,255,255,.06)}#langDropMenu a{display:flex;align-items:center;gap:11px;padding:11px 16px;color:rgba(255,255,255,.65);text-decoration:none;font-size:.875rem;font-weight:500;border-bottom:1px solid rgba(255,255,255,.04);position:relative}#langDropMenu a:last-child{border-bottom:none}#langDropMenu a:hover{background:rgba(59,130,246,.14);color:#fff}#langDropMenu a.ldm-active{color:#fff;font-weight:700;background:rgba(59,130,246,.16)}#langDropMenu a.ldm-active::after{content:'✓';position:absolute;right:14px;color:var(--primary);font-size:.85rem}.ldm-flag{font-size:1.1rem;line-height:1}.ldm-name{flex:1}nav.breadcrumb::after{display:none!important}`;

const STYLE = `:root{--primary:#3b82f6;--dark-bg:#020617;--text-dim:#bbcee7;--text-main:#fff}body{font-family:'Plus Jakarta Sans',sans-serif;color:var(--text-main);background:var(--dark-bg);margin:0}nav{position:fixed;top:0;width:100%;height:100px;padding:0 8%;display:flex;justify-content:space-between;align-items:center;background:rgba(2,6,23,.9);z-index:1000;border-bottom:1px solid rgba(255,255,255,.1)}.nav-links{display:flex;list-style:none;gap:40px}.nav-links a{color:#fff;text-decoration:none;font-weight:600}.logo-img{height:90px}.btn-primary{background:var(--primary);color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700}.article-hero{padding:150px 8% 60px;background-size:cover}.article-tag{display:inline-block;padding:5px 14px;background:rgba(59,130,246,.15);color:var(--primary);border-radius:20px;font-size:.8rem;font-weight:700;margin-bottom:20px}.article-hero h1{font-size:2.5rem;font-weight:800;line-height:1.2;margin-bottom:20px;max-width:800px}.article-meta{color:#64748b;font-size:.875rem;display:flex;gap:20px;flex-wrap:wrap}.article-body{max-width:780px;margin:0 auto;padding:60px 8% 100px}.article-body h2{font-size:1.8rem;font-weight:700;margin:48px 0 20px;color:#fff;border-left:4px solid var(--primary);padding-left:16px}.article-body h3{font-size:1.2rem;font-weight:700;margin:24px 0 12px;color:#e2e8f0}.article-body p,.article-body li{color:var(--text-dim);line-height:1.8;margin-bottom:16px}.article-body strong{color:#fff}.article-body p a,.article-body li a,.highlight-box a{color:var(--primary)}.cta-box .btn-primary,.cta-box .btn.btn-primary{color:#fff}.highlight-box{background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.25);border-radius:12px;padding:24px;margin:28px 0}.price-table{width:100%;border-collapse:collapse;margin:24px 0}.price-table th{background:rgba(59,130,246,.15);color:var(--primary);padding:12px;text-align:left}.price-table td{padding:12px;border-bottom:1px solid rgba(255,255,255,.06);color:var(--text-dim)}.cta-box{background:linear-gradient(135deg,#1e3a5f,#1e1b4b);border-radius:16px;padding:48px;text-align:center;margin:60px 0 0}footer{padding:40px;text-align:center;color:#64748b}.breadcrumb{display:flex;gap:8px;font-size:.85rem;color:#64748b;margin-bottom:24px;flex-wrap:wrap}.breadcrumb a{color:#64748b;text-decoration:none}nav.breadcrumb{position:static!important;height:auto!important;background:none!important;padding:0!important}${NAV_EXTRA_CSS}`;

const posts = [
  {
    slug: 'mobil-uygulama-maliyeti-2026',
    articleKey: 'mobilMaliyet',
    title: "Mobil Uygulama Yaptırmak: Maliyet ve Fiyat Rehberi [2026]",
    desc: "Mobil uygulama yaptırmak ne kadar tutar? iOS, Android, Flutter maliyetleri, MVP bütçesi ve 2026 Türkiye piyasası rehberi.",
    keywords: "mobil uygulama yaptırmak, mobil uygulama maliyeti, uygulama geliştirme fiyat, ios android uygulama fiyatı 2026",
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80&auto=format&fit=crop',
    body: `<p><strong>Mobil uygulama yaptırmak</strong> isteyenlerin ilk sorusu maliyet. 2026'da basit MVP <strong>80.000–120.000 TL</strong>, Flutter çapraz platform <strong>120.000–200.000 TL</strong>, native iOS+Android <strong>180.000–350.000 TL</strong> aralığındadır.</p>
<div class="highlight-box"><p>⚡ Native mi Flutter mı? Teknoloji seçimi bütçenizi %40'a kadar değiştirir.</p></div>
<h2>Uygulama Türüne Göre Fiyat</h2>
<table class="price-table"><thead><tr><th>Tür</th><th>Maliyet</th><th>Süre</th></tr></thead><tbody>
<tr><td>MVP (tek platform)</td><td>80.000 – 120.000 TL</td><td>6–10 hafta</td></tr>
<tr><td>Flutter (iOS + Android)</td><td>120.000 – 200.000 TL</td><td>8–14 hafta</td></tr>
<tr><td>Native iOS + Android</td><td>180.000 – 350.000 TL</td><td>12–20 hafta</td></tr>
<tr><td>Kurumsal / ERP entegre</td><td>250.000 – 500.000+ TL</td><td>4–8 ay</td></tr>
</tbody></table>
<h2>Maliyeti Etkileyen Faktörler</h2>
<ul><li>Ekran sayısı ve kullanıcı akışları</li><li>Backend/API geliştirme</li><li>Ödeme, harita, push bildirim entegrasyonları</li><li>App Store / Play Store yayın süreci</li><li>Bakım ve yıllık güncelleme</li></ul>
<p>Teknoloji karşılaştırması: <a href="/blog/mobil-uygulama-gelistirme-rehberi-2026">mobil uygulama geliştirme rehberi</a>.</p>
<h2>Sık Sorulan Sorular</h2>
<h3>Mobil uygulama yaptırmak ne kadar tutar?</h3>
<p>Ortalama KOBİ uygulaması için <strong>120.000–200.000 TL</strong> bütçe planlayın.</p>
<h3>Flutter mı native mi?</h3>
<p>Flutter çoğu proje için maliyet/performans dengesinde idealdir. Oyun veya ağır grafik için native tercih edilir.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.mobilMaliyet.title">Mobil Uygulama Teklifi Alın</h3><p data-i18n="blog.cta.mobilMaliyet.desc">Flutter veya native — özelliklerinize göre özel teklif.</p><a href="/iletisim" class="btn-primary" style="display:inline-block;padding:16px 36px" data-i18n="blog.cta.mobilMaliyet.btn">Ücretsiz Teklif Al</a></div>`,
  },
  {
    slug: 'kurumsal-web-sitesi-yaptirmak-rehberi-2026',
    articleKey: 'kurumsalWeb',
    title: "Kurumsal Web Sitesi Yaptırmak: Maliyet, Özellikler ve Rehber [2026]",
    desc: "Kurumsal web sitesi yaptırmak ne kadar? SEO, CMS, çoklu dil, KVKK uyumu ve 2026 fiyat rehberi.",
    keywords: "kurumsal web sitesi yaptırmak, kurumsal web sitesi fiyat, şirket web sitesi, kurumsal site maliyeti 2026",
    img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80&auto=format&fit=crop',
    body: `<p><strong>Kurumsal web sitesi yaptırmak</strong>, dijital vitrininizdir. 2026'da 5–10 sayfalık kurumsal site <strong>15.000–45.000 TL</strong>, çok dilli ve gelişmiş CMS'li projeler <strong>45.000–90.000 TL</strong> aralığındadır.</p>
<div class="highlight-box"><p>⚡ Kurumsal sitede olmazsa olmaz: SEO, hız, mobil uyum, KVKK formları ve marka tutarlılığı.</p></div>
<h2>Kurumsal Site Fiyat Tablosu</h2>
<table class="price-table"><thead><tr><th>Kapsam</th><th>Fiyat</th><th>Süre</th></tr></thead><tbody>
<tr><td>Tanıtım sitesi (5–8 sayfa)</td><td>15.000 – 35.000 TL</td><td>3–4 hafta</td></tr>
<tr><td>Kurumsal + blog/CMS</td><td>35.000 – 55.000 TL</td><td>4–6 hafta</td></tr>
<tr><td>Çok dilli kurumsal</td><td>55.000 – 90.000 TL</td><td>6–10 hafta</td></tr>
</tbody></table>
<h2>Kurumsal Web Sitesinde Olması Gerekenler</h2>
<ul><li>Özel UI/UX tasarım (Figma)</li><li>Core Web Vitals optimizasyonu</li><li>İçerik yönetim paneli</li><li>İletişim formları + KVKK onayı</li><li>Google Analytics / Search Console</li></ul>
<p>Genel web maliyeti: <a href="/blog/ankara-web-sitesi-maliyeti-2026">web sitesi maliyet rehberi</a>.</p>
<h2>Sık Sorulan Sorular</h2>
<h3>Kurumsal web sitesi ne kadar sürer?</h3>
<p>Standart proje <strong>3–6 hafta</strong>, çok dilli kurumsal site <strong>6–10 hafta</strong>.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.kurumsalWeb.title">Kurumsal Web Sitesi Teklifi</h3><p data-i18n="blog.cta.kurumsalWeb.desc">Markanıza özel, SEO uyumlu kurumsal site.</p><a href="/iletisim" class="btn-primary" style="display:inline-block;padding:16px 36px" data-i18n="blog.cta.kurumsalWeb.btn">Ücretsiz Teklif Al</a></div>`,
  },
  {
    slug: 'yapay-zeka-danismanligi-isletmeler-rehberi-2026',
    articleKey: 'aiDanismanlik',
    title: "Yapay Zeka Danışmanlığı: İşletmeler İçin AI Stratejisi ve Uygulama [2026]",
    desc: "Yapay zeka danışmanlığı nedir? ROI analizi, chatbot, otomasyon, LLM entegrasyonu ve işletmeler için AI yol haritası.",
    keywords: "yapay zeka danışmanlığı, ai danışmanlık, yapay zeka firması, işletme yapay zeka, ai otomasyon işletme",
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80&auto=format&fit=crop',
    body: `<p><strong>Yapay zeka danışmanlığı</strong>, işletmenizde hangi süreçlerin AI ile otomatikleştirilebileceğini ve geri dönüşün (ROI) ne olacağını belirler. 2026'da Türk KOBİ'lerinin en çok aradığı hizmetlerden biri.</p>
<div class="highlight-box"><p>⚡ Chatbot, belge AI, süreç otomasyonu ve GPT entegrasyonu — doğru sırayla mı başlıyorsunuz?</p></div>
<h2>AI Danışmanlığı Neleri Kapsar?</h2>
<ul><li>Süreç denetimi ve ROI haritalama</li><li>Veri hazırlığı değerlendirmesi</li><li>Model seçimi (GPT-4o, Claude, açık kaynak)</li><li>KVKK uyumlu mimari tasarım</li><li>PoC → canlıya alma yol haritası</li></ul>
<h2>İşletmeler İçin En Yaygın AI Kullanım Alanları</h2>
<ul><li><strong>Müşteri hizmetleri chatbot</strong> — <a href="/blog/ankara-chatbot-gelistirme-2026">chatbot rehberi</a></li><li><strong>Belge/fatura otomasyonu</strong> — <a href="/blog/ankara-surec-otomasyonu-rpa-yapay-zeka">RPA rehberi</a></li><li><strong>LLM entegrasyonu</strong> — <a href="/blog/llm-gpt-entegrasyonu-rehberi">LLM rehberi</a></li><li><strong>WhatsApp satış asistanı</strong> — <a href="/blog/whatsapp-chatbot-isletme-rehberi-2026">WhatsApp rehberi</a></li></ul>
<h2>Danışmanlık Maliyeti</h2>
<p>Keşif ve strateji oturumu genelde <strong>ücretsiz</strong>; PoC projeleri <strong>40.000–80.000 TL</strong>, tam ölçekli AI entegrasyonu <strong>150.000–400.000+ TL</strong>.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.aiDanismanlik.title">Ücretsiz AI Danışmanlık Görüşmesi</h3><p data-i18n="blog.cta.aiDanismanlik.desc">Süreçlerinizi analiz edip size özel AI yol haritası çıkarıyoruz.</p><a href="/iletisim" class="btn-primary" style="display:inline-block;padding:16px 36px" data-i18n="blog.cta.aiDanismanlik.btn">Görüşme Talep Et</a></div>`,
  },
  {
    slug: 'crm-erp-entegrasyonu-rehberi-2026',
    articleKey: 'crmErp',
    title: "CRM ve ERP Entegrasyonu: Maliyet, Süreç ve Yazılım Rehberi [2026]",
    desc: "CRM ERP entegrasyonu nasıl yapılır? Logo, Netsis, Salesforce bağlantısı, API maliyeti ve işletme verimliliği rehberi.",
    keywords: "crm entegrasyonu, erp entegrasyonu, crm yazılımı, logo entegrasyonu, netsis api, yazılım entegrasyonu",
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80&auto=format&fit=crop',
    body: `<p><strong>CRM ve ERP entegrasyonu</strong>, satış, stok, muhasebe ve müşteri verilerini tek akışta birleştirir. Çift veri girişi ve hatalar ortadan kalkar; raporlama hızlanır.</p>
<div class="highlight-box"><p>⚡ Logo, Netsis, Mikro, Salesforce, HubSpot — mevcut sisteminizle konuşan yazılım.</p></div>
<h2>Entegrasyon Senaryoları</h2>
<ul><li>E-ticaret ↔ ERP stok senkronu</li><li>CRM ↔ WhatsApp/chatbot müşteri kaydı</li><li>Özel uygulama ↔ muhasebe yazılımı</li><li>BI panelleri — birleşik veri kaynağı</li></ul>
<h2>2026 Entegrasyon Maliyetleri</h2>
<table class="price-table"><thead><tr><th>Kapsam</th><th>Maliyet</th></tr></thead><tbody>
<tr><td>Tek yönlü API entegrasyonu</td><td>15.000 – 35.000 TL</td></tr>
<tr><td>Çift yönlü + middleware</td><td>50.000 – 120.000 TL</td></tr>
<tr><td>Özel ERP modülü</td><td>150.000 – 400.000+ TL</td></tr>
</tbody></table>
<p>İlgili: <a href="/blog/e-ticaret-sitesi-yaptirmak-maliyeti-2026">e-ticaret entegrasyonları</a>, <a href="/blog/ozel-yazilim-gelistirme-nedir-rehberi">özel yazılım</a>.</p>
<h2>Sık Sorulan Sorular</h2>
<h3>CRM ERP entegrasyonu ne kadar sürer?</h3>
<p>Basit API <strong>2–4 hafta</strong>, çoklu sistem <strong>8–16 hafta</strong>.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.crmErp.title">CRM / ERP Entegrasyon Teklifi</h3><p data-i18n="blog.cta.crmErp.desc">Mevcut sistemlerinizi güvenli API'lerle bağlıyoruz.</p><a href="/iletisim" class="btn-primary" style="display:inline-block;padding:16px 36px" data-i18n="blog.cta.crmErp.btn">Ücretsiz Analiz</a></div>`,
  },
];

for (const p of posts) {
  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title} | Ozturksoft</title>
  <link rel="canonical" href="https://ozturksoft.net/blog/${p.slug}" />
  <link rel="alternate" hreflang="tr" href="https://ozturksoft.net/blog/${p.slug}" />
  <link rel="alternate" hreflang="x-default" href="https://ozturksoft.net/blog/${p.slug}" />
  <meta name="description" content="${p.desc}">
  <meta name="keywords" content="${p.keywords}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Samet Öztürk">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" crossorigin>
  <link rel="stylesheet" href="/src/style.css">
  <script type="module" src="/src/blog-main.ts"></script>
  <style id="critical">${STYLE}.article-hero{background:linear-gradient(135deg,rgba(2,6,23,.9),rgba(15,23,42,.85)),url("${p.img}");background-size:cover}</style>
</head>
<body data-article="${p.articleKey}">
<nav>
  <a href="/"><img src="/images/logo.png" alt="Ozturksoft Logo" class="logo-img" width="187" height="180" loading="eager"></a>
  <ul class="nav-links" id="navLinks">
    <li><a href="/" data-i18n="nav.home">Ana Sayfa</a></li>
    <li><a href="/hakkimizda" data-i18n="nav.about">Hakkımızda</a></li>
    <li><a href="/hizmetler" data-i18n="nav.services">Hizmetler</a></li>
    <li><a href="/ankara-yapay-zeka-cozumleri" data-i18n="nav.ai">Yapay Zeka</a></li>
    <li><a href="/blog" style="color:var(--primary)" data-i18n="nav.blog">Blog</a></li>
    <li><a href="/iletisim" data-i18n="nav.contact">İletişim</a></li>
  </ul>
  <div style="display:flex;align-items:center;gap:10px">
    <div class="lang-drop-wrap" id="langDropdown">
      <button class="lang-drop-btn" id="langDropBtn" aria-label="Select language" type="button">
        <span id="langLabel">🇹🇷</span>
        <span id="langCode">TR</span>
        <i class="fas fa-chevron-down chev"></i>
      </button>
      <div id="langDropMenu">
        <div class="ldm-header">Dil / Language</div>
        <a href="#" data-lang="tr" class="ldm-active"><span class="ldm-flag">🇹🇷</span><span class="ldm-name">Türkçe</span></a>
        <a href="#" data-lang="en"><span class="ldm-flag">🇬🇧</span><span class="ldm-name">English</span></a>
        <a href="#" data-lang="de"><span class="ldm-flag">🇩🇪</span><span class="ldm-name">Deutsch</span></a>
        <a href="#" data-lang="ar"><span class="ldm-flag">🇸🇦</span><span class="ldm-name">العربية</span></a>
        <a href="#" data-lang="ru"><span class="ldm-flag">🇷🇺</span><span class="ldm-name">Русский</span></a>
        <a href="#" data-lang="fr"><span class="ldm-flag">🇫🇷</span><span class="ldm-name">Français</span></a>
      </div>
    </div>
    <a href="/iletisim" class="btn btn-primary" style="padding:10px 20px;font-size:.85rem" data-i18n="nav.quoteBtn">Teklif Al</a>
    <div class="menu-toggle" id="menuToggle"><i class="fas fa-bars" id="menuIcon" style="color:white"></i></div>
  </div>
</nav>
<header class="article-hero">
  <nav class="breadcrumb"><a href="/" data-i18n="blog.breadcrumb.home">Ana Sayfa</a><span>/</span><a href="/blog" data-i18n="blog.breadcrumb.blog">Blog</a><span>/</span><span data-i18n="blog.posts.${p.articleKey}.breadcrumb">...</span></nav>
  <span class="article-tag" data-i18n="blog.posts.${p.articleKey}.tag">...</span>
  <h1 data-i18n="blog.posts.${p.articleKey}.title">${p.title}</h1>
  <div class="article-meta"><span>Samet Öztürk</span><span>22 Haziran 2026</span><span>9 dk okuma</span></div>
</header>
<article class="article-body">
${p.body}
</article>
<footer><p data-i18n="blog.footer.copyright">© 2026 Ozturksoft — Ankara, Türkiye.</p></footer>
</body>
</html>`;
  writeFileSync(resolve(blogDir, `${p.slug}.html`), html);
  console.log('Created', p.slug);
}
