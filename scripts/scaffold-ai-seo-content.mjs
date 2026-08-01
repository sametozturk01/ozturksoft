import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const blogDir = resolve(root, 'blog');
const articlesDir = resolve(root, 'src/i18n/articles');

const BLOG_SHELL = readFileSync(resolve(blogDir, 'ankara-kamu-yazilim-2026.html'), 'utf8');

function makeBlog(cfg) {
  let html = BLOG_SHELL;
  const rep = (from, to) => { html = html.split(from).join(to); };
  rep('ankara-kamu-yazilim-2026', cfg.slug);
  rep('data-article="ankaraKamu"', `data-article="${cfg.key}"`);
  rep('data-i18n-date="blog.meta.date7"', `data-i18n-date="${cfg.dateKey}"`);
  rep('blog.posts.ankaraKamu.', `blog.posts.${cfg.key}.`);
  rep('blog.cta.ankaraKamu.', `blog.cta.${cfg.key}.`);
  rep(cfg.oldTitle, cfg.title);
  rep(cfg.oldDesc, cfg.desc);
  rep(cfg.oldKeywords, cfg.keywords);
  rep(cfg.oldOgTitle, cfg.ogTitle);
  rep(cfg.oldTwitterDesc, cfg.twitterDesc);
  rep(cfg.oldHeadline, cfg.headline);
  rep(cfg.oldBreadcrumbName, cfg.breadcrumbName);
  rep(cfg.oldArticleSection, cfg.articleSection || 'Yapay Zeka');
  rep(cfg.oldFaqJson, cfg.faqJson);
  rep(cfg.oldHeroImg, cfg.heroImg || 'photo-1677442136019-21780ecad995');
  rep(cfg.oldBody, cfg.body);
  return html;
}

const BLOGS = [
  {
    slug: 'ankara-yapay-zeka-firmasi-nasil-secilir-2026',
    key: 'ankaraAiSecim',
    dateKey: 'blog.meta.date8',
    oldTitle: "Ankara'da Kamu Yazılım Çözümleri: E-Devlet, İhale ve On-Premise AI Rehberi [2026] | Ozturksoft",
    title: "Ankara'da Yapay Zeka Firması Nasıl Seçilir? [2026 Rehberi] | Ozturksoft",
    oldDesc: "Ankara'da kamu ve bakanlık yazılım çözümleri. E-devlet süreçleri, evrak OCR, ihale otomasyonu, KVKK uyumlu on-premise yapay zeka ve maliyet rehberi.",
    desc: "Ankara'da yapay zeka firması seçerken dikkat edilmesi gerekenler: LLM deneyimi, KVKK, on-premise, referans ve teklif karşılaştırması. 2026 pratik kontrol listesi.",
    oldKeywords: 'ankara kamu yazılım, kamu yazılım şirketi ankara, e-devlet yazılım, bakanlık yazılım türkiye, kamu yapay zeka ankara',
    keywords: 'ankara yapay zeka firması, ankara ai firması nasıl seçilir, yapay zeka şirketi ankara, llm entegrasyonu ankara, kurumsal yapay zeka ankara',
    oldOgTitle: 'Ankara Kamu Yazılım Çözümleri [2026]',
    ogTitle: "Ankara Yapay Zeka Firması Nasıl Seçilir? [2026]",
    oldTwitterDesc: 'Kamu e-devlet, ihale otomasyonu, belge OCR ve on-premise AI — Ankara rehberi.',
    twitterDesc: 'LLM, KVKK, on-premise ve referans kontrolü — Ankara AI firması seçim rehberi.',
    oldHeadline: "Ankara'da Kamu Yazılım Çözümleri: E-Devlet, İhale ve On-Premise AI Rehberi [2026]",
    headline: "Ankara'da Yapay Zeka Firması Nasıl Seçilir? [2026 Rehberi]",
    oldBreadcrumbName: "Ankara'da Chatbot Geliştirme 2026",
    breadcrumbName: 'Ankara Yapay Zeka Firması Seçimi 2026',
    oldFaqJson: `"keywords": ["ankara kamu yazılım","kamu yazılım şirketi ankara","e-devlet yazılım","bakanlık yazılım türkiye","kamu yapay zeka ankara"]`,
    faqJson: `"keywords": ["ankara yapay zeka firması","ankara ai firması","yapay zeka şirketi ankara","llm entegrasyonu ankara"]`,
    oldBody: `<p><strong>Kamu kurumları ve bakanlıklar</strong>`,
    body: `<p><strong>Ankara yapay zeka firması</strong> seçmek, yazılım şirketi seçmekten farklı kriterler gerektirir: LLM/RAG deneyimi, veri güvenliği, model sahipliği ve KVKK uyumu kritiktir. Bu rehberde <strong>ankara ai firması</strong> ararken kullanabileceğiniz kontrol listesini paylaşıyoruz.</p>
<div class="highlight-box"><p>⚡ <strong>Bu yazıda:</strong> AI firması seçim kriterleri, teklif karşılaştırması, kırmızı bayraklar, KVKK/on-premise, referans kontrolü ve <a href="/blog/ankara-yapay-zeka-firmalari-karsilastirma-2026">firma karşılaştırması</a>.</p></div>
<h2>Ankara'da Yapay Zeka Firması Seçerken 10 Kriter</h2>
<ol>
<li><strong>LLM & RAG deneyimi</strong> — GPT, Claude, yerel model; canlı proje referansı</li>
<li><strong>KVKK & on-premise</strong> — veri kurum dışına çıkmadan çalışabilir mi?</li>
<li><strong>Entegrasyon yetkinliği</strong> — CRM, ERP, WhatsApp, e-devlet API</li>
<li><strong>QA & test süreçleri</strong> — AI çıktı doğrulama, hallucination kontrolü</li>
<li><strong>Yazılı kapsam & SLA</strong> — model güncelleme, bakım, kaynak kod devri</li>
<li><strong>Sektör deneyimi</strong> — kamu, finans, sağlık, imalat</li>
<li><strong>Fiyat şeffaflığı</strong> — token/API maliyeti dahil mi?</li>
<li><strong>Çok kanallı destek</strong> — web, WhatsApp, ses, dahili panel</li>
<li><strong>GEO & SEO bilinci</strong> — AI arama görünürlüğü (opsiyonel ama artı değer)</li>
<li><strong>Yerel erişilebilirlik</strong> — Ankara'da yüz yüze keşif ve müdahale</li>
</ol>
<h2>Teklif Karşılaştırması Nasıl Yapılır?</h2>
<p>Her firmadan aynı kapsamı isteyin: kullanıcı sayısı, kanal (web/WhatsApp), entegrasyon listesi, on-premise gereksinimi, eğitim verisi hacmi, aylık token bütçesi. <a href="/blog/ankara-llm-entegrasyonu-maliyeti-2026">LLM maliyet rehberimize</a> bakın.</p>
<h2>Kırmızı Bayraklar</h2>
<ul>
<li>Sadece chatbot UI satıp LLM altyapısı detaylandırmayan firma</li>
<li>KVKK veya veri işleme sözleşmesi sunmayan firma</li>
<li>Canlı AI referansı gösteremeyen firma</li>
<li>Fiyatın piyasanın çok altında olması (gizli API maliyeti riski)</li>
</ul>
<h2>Ankara Ekosistemi Avantajı</h2>
<p>Ankara; kamu, savunma, sağlık ve hukuk sektörlerinde <strong>KVKK uyumlu on-premise AI</strong> talebinin en yoğun olduğu şehirlerden biridir. <a href="/ankara-yapay-zeka-firmasi">Ozturksoft</a> Çankaya merkezli yapay zeka firması olarak LLM, RAG, MCP ve OCR projeleri sunar.</p>
<p>İlgili: <a href="/blog/kvkk-uyumlu-yapay-zeka-rehberi-2026">KVKK uyumlu AI</a> · <a href="/ankara-kamu-yapay-zeka">kamu yapay zeka çözümleri</a> · <a href="/blog/ankara-yazilim-sirketi-nasil-secilir-2026">yazılım şirketi seçimi</a></p>
<h2>Sık Sorulan Sorular</h2>
<h3>Ankara'da yapay zeka firması seçerken en önemli kriter nedir?</h3>
<p>Canlı LLM/RAG referansı, KVKK uyumu ve entegrasyon yetkinliği. Fiyat tek başına yeterli değildir.</p>
<h3>On-premise AI şart mı?</h3>
<p>Kamu, finans ve savunma için genelde evet. KOBİ'ler bulut tabanlı çözümle başlayabilir.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiSecim.title"></h3><p data-i18n="blog.cta.ankaraAiSecim.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiSecim.btn">Ücretsiz Danışmanlık <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
    faqPage: [
      ['Ankara yapay zeka firması seçerken en önemli kriter nedir?', 'LLM/RAG deneyimi, KVKK uyumu, on-premise seçeneği ve canlı referans projeler.'],
      ['Ankara AI firması teklifleri neden farklı?', 'Model seçimi, token maliyeti, entegrasyon kapsamı ve on-premise altyapı fiyatı değişkenleri yaratır.'],
      ['Yerel Ankara AI firması avantajı nedir?', 'Yüz yüze keşif, hızlı müdahale ve kamu/savunma sektörü deneyimi.'],
    ],
    articles: {
      en: `<p>Choosing an <strong>Ankara AI company</strong> requires criteria beyond generic software vendors: LLM/RAG experience, KVKK compliance, on-premise options and live references.</p>
<h2>10 Selection Criteria</h2><ol><li>LLM & RAG experience</li><li>KVKK & on-premise</li><li>CRM/ERP integration</li><li>QA & hallucination control</li><li>Written SLA & source code</li><li>Sector experience</li><li>Transparent pricing incl. API tokens</li><li>Multi-channel (web, WhatsApp)</li><li>Local Ankara access</li></ol>
<h2>Red Flags</h2><ul><li>No live AI references</li><li>No data processing agreement</li><li>Vague LLM architecture</li></ul>
<p><a href="/blog/ankara-llm-entegrasyonu-maliyeti-2026">LLM cost guide</a> · <a href="/ankara-yapay-zeka-firmasi">Ozturksoft AI hub</a></p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiSecim.title"></h3><p data-i18n="blog.cta.ankaraAiSecim.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiSecim.btn">Free Consultation <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      de: `<p>Die Wahl eines <strong>KI-Unternehmens in Ankara</strong> erfordert LLM/RAG-Erfahrung, KVKK-Konformität, On-Premise-Optionen und Referenzen.</p>
<h2>10 Auswahlkriterien</h2><ol><li>LLM & RAG</li><li>KVKK & On-Premise</li><li>CRM/ERP-Integration</li><li>QA & Halluzinationskontrolle</li><li>SLA & Quellcode</li></ol>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiSecim.title"></h3><p data-i18n="blog.cta.ankaraAiSecim.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiSecim.btn">Kostenlose Beratung <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      fr: `<p>Choisir une <strong>entreprise IA à Ankara</strong> exige expérience LLM/RAG, conformité KVKK, option on-premise et références réelles.</p>
<h2>10 critères</h2><ol><li>LLM & RAG</li><li>KVKK & on-premise</li><li>Intégration CRM/ERP</li><li>QA</li><li>SLA écrit</li></ol>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiSecim.title"></h3><p data-i18n="blog.cta.ankaraAiSecim.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiSecim.btn">Consultation gratuite <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      ar: `<p>اختيار <strong>شركة ذكاء اصطناعي في أنقرة</strong> يتطلب خبرة LLM/RAG والامتثال لـ KVKK وخيار on-premise ومراجع حية.</p>
<h2>معايير الاختيار</h2><ol><li>خبرة LLM وRAG</li><li>KVKK وon-premise</li><li>تكامل CRM/ERP</li><li>ضمان الجودة</li></ol>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiSecim.title"></h3><p data-i18n="blog.cta.ankaraAiSecim.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiSecim.btn">استشارة مجانية <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      ru: `<p>Выбор <strong>ИИ-компании в Анкаре</strong> требует опыта LLM/RAG, соответствия KVKK, on-premise и живых референсов.</p>
<h2>10 критериев</h2><ol><li>LLM и RAG</li><li>KVKK и on-premise</li><li>Интеграция CRM/ERP</li><li>QA</li><li>SLA и исходный код</li></ol>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiSecim.title"></h3><p data-i18n="blog.cta.ankaraAiSecim.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiSecim.btn">Бесплатная консультация <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
    },
    prefix: 'ankara-ai-secim',
  },
  {
    slug: 'ankara-yapay-zeka-firmalari-karsilastirma-2026',
    key: 'ankaraAiKarsilastirma',
    dateKey: 'blog.meta.date8',
    oldTitle: "Ankara'da Kamu Yazılım Çözümleri: E-Devlet, İhale ve On-Premise AI Rehberi [2026] | Ozturksoft",
    title: "Ankara Yapay Zeka Firmaları Karşılaştırması [2026] | Ozturksoft",
    oldDesc: "Ankara'da kamu ve bakanlık yazılım çözümleri. E-devlet süreçleri, evrak OCR, ihale otomasyonu, KVKK uyumlu on-premise yapay zeka ve maliyet rehberi.",
    desc: "Ankara yapay zeka firmaları karşılaştırması: LLM, chatbot, on-premise, KVKK, fiyat ve sektör uzmanlığı. Objektif 2026 değerlendirme tablosu.",
    oldKeywords: 'ankara kamu yazılım, kamu yazılım şirketi ankara, e-devlet yazılım, bakanlık yazılım türkiye, kamu yapay zeka ankara',
    keywords: 'ankara yapay zeka firmaları, ankara ai firması karşılaştırma, yapay zeka şirketi ankara, en iyi ai firması ankara',
    oldOgTitle: 'Ankara Kamu Yazılım Çözümleri [2026]',
    ogTitle: 'Ankara Yapay Zeka Firmaları Karşılaştırması [2026]',
    oldTwitterDesc: 'Kamu e-devlet, ihale otomasyonu, belge OCR ve on-premise AI — Ankara rehberi.',
    twitterDesc: 'Ankara AI firmaları — LLM, KVKK, on-premise ve fiyat karşılaştırması.',
    oldHeadline: "Ankara'da Kamu Yazılım Çözümleri: E-Devlet, İhale ve On-Premise AI Rehberi [2026]",
    headline: 'Ankara Yapay Zeka Firmaları Karşılaştırması [2026]',
    oldBreadcrumbName: "Ankara'da Chatbot Geliştirme 2026",
    breadcrumbName: 'Ankara AI Firmaları Karşılaştırma 2026',
    oldFaqJson: `"keywords": ["ankara kamu yazılım","kamu yazılım şirketi ankara","e-devlet yazılım","bakanlık yazılım türkiye","kamu yapay zeka ankara"]`,
    faqJson: `"keywords": ["ankara yapay zeka firmaları","ankara ai karşılaştırma","yapay zeka şirketi ankara"]`,
    oldBody: `<p><strong>Kamu kurumları ve bakanlıklar</strong>`,
    body: `<p>Ankara'da onlarca firma "yapay zeka" hizmeti sunuyor; ancak gerçek <strong>LLM, RAG ve kurumsal AI</strong> uzmanlığı her firmada yok. Bu yazıda <strong>ankara yapay zeka firmaları</strong> için objektif bir karşılaştırma çerçevesi ve örnek değerlendirme tablosu sunuyoruz.</p>
<div class="highlight-box"><p>⚡ <strong>Not:</strong> Bu tablo genel kriterlere dayanır. Seçim öncesi <a href="/blog/ankara-yapay-zeka-firmasi-nasil-secilir-2026">seçim rehberimizi</a> okuyun.</p></div>
<h2>Karşılaştırma Kriterleri</h2>
<table class="price-table"><thead><tr><th>Kriter</th><th>Neden önemli?</th></tr></thead><tbody>
<tr><td>LLM / RAG projeleri</td><td>Gerçek AI yetkinliğinin göstergesi</td></tr>
<tr><td>On-premise & KVKK</td><td>Kamu, finans, savunma için zorunlu</td></tr>
<tr><td>Entegrasyon (ERP/CRM)</td><td>AI'ın iş değeri üretmesi için</td></tr>
<tr><td>QA & test</td><td>Hallucination ve regresyon kontrolü</td></tr>
<tr><td>Çok dil & GEO</td><td>Uluslararası müşteriler için</td></tr>
<tr><td>Ankara yerel ekip</td><td>Yüz yüze keşif ve destek</td></tr>
</tbody></table>
<h2>Örnek Değerlendirme Tablosu (2026)</h2>
<p>Aşağıdaki tablo <em>genel piyasa profillerine</em> göre tipik özellikleri yansıtır; teklif almadan karar vermeyin.</p>
<table class="price-table"><thead><tr><th>Profil</th><th>Güçlü yön</th><th>Dikkat</th></tr></thead><tbody>
<tr><td>Büyük sistem entegratörü</td><td>Kurumsal referans, ölçek</td><td>AI derinliği sınırlı olabilir</td></tr>
<tr><td>Dijital ajans</td><td>UI/UX, hızlı MVP</td><td>LLM altyapısı dış kaynaklı olabilir</td></tr>
<tr><td>AI odaklı yazılım firması (ör. Ozturksoft)</td><td>LLM, RAG, MCP, OCR, on-premise</td><td>Proje bazlı fiyatlandırma</td></tr>
<tr><td>Freelance / uzaktan ekip</td><td>Maliyet</td><td>SLA, KVKK, bakım riski</td></tr>
</tbody></table>
<p><strong>Ozturksoft</strong> — Ankara Çankaya merkezli yapay zeka firması: <a href="/ankara-yapay-zeka-firmasi">hub sayfa</a>, <a href="/ankara-kamu-yapay-zeka">kamu AI</a>, 6 dil, llms.txt/GEO altyapısı.</p>
<p>İlgili: <a href="/blog/ankara-llm-entegrasyonu-maliyeti-2026">LLM maliyeti</a> · <a href="/blog/kvkk-uyumlu-yapay-zeka-rehberi-2026">KVKK AI</a></p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiKarsilastirma.title"></h3><p data-i18n="blog.cta.ankaraAiKarsilastirma.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiKarsilastirma.btn">Ücretsiz Teklif <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
    faqPage: [
      ['Ankara en iyi yapay zeka firması hangisi?', 'Tek doğru cevap yok; LLM referansı, KVKK uyumu ve sektör deneyiminize göre değişir. Karşılaştırma tablosu ve seçim rehberi kullanın.'],
      ['Ajans mı AI firması mı?', 'Derin LLM/RAG ve on-premise ihtiyacı varsa AI odaklı yazılım firması tercih edin.'],
    ],
    articles: {
      en: `<p>Objective framework to compare <strong>Ankara AI companies</strong> by LLM depth, KVKK, on-premise and integration skills.</p>
<table class="price-table"><thead><tr><th>Profile</th><th>Strength</th><th>Watch</th></tr></thead><tbody>
<tr><td>AI-focused software (e.g. Ozturksoft)</td><td>LLM, RAG, MCP, on-premise</td><td>Project-based pricing</td></tr>
<tr><td>Digital agency</td><td>Fast UI MVP</td><td>LLM may be outsourced</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiKarsilastirma.title"></h3><p data-i18n="blog.cta.ankaraAiKarsilastirma.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiKarsilastirma.btn">Get a Quote <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      de: `<p>Vergleichsrahmen für <strong>KI-Unternehmen in Ankara</strong>: LLM, KVKK, On-Premise, Integration.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiKarsilastirma.title"></h3><p data-i18n="blog.cta.ankaraAiKarsilastirma.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiKarsilastirma.btn">Angebot <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      fr: `<p>Cadre de comparaison des <strong>entreprises IA à Ankara</strong>.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiKarsilastirma.title"></h3><p data-i18n="blog.cta.ankaraAiKarsilastirma.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiKarsilastirma.btn">Devis <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      ar: `<p>إطار مقارنة <strong>شركات الذكاء الاصطناعي في أنقرة</strong>.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiKarsilastirma.title"></h3><p data-i18n="blog.cta.ankaraAiKarsilastirma.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiKarsilastirma.btn">عرض سعر <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      ru: `<p>Сравнение <strong>ИИ-компаний Анкары</strong> по LLM, KVKK и on-premise.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiKarsilastirma.title"></h3><p data-i18n="blog.cta.ankaraAiKarsilastirma.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiKarsilastirma.btn">Запросить КП <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
    },
    prefix: 'ankara-ai-karsilastirma',
  },
  {
    slug: 'ankara-llm-entegrasyonu-maliyeti-2026',
    key: 'ankaraLlmMaliyet',
    dateKey: 'blog.meta.date8',
    oldTitle: "Ankara'da Kamu Yazılım Çözümleri: E-Devlet, İhale ve On-Premise AI Rehberi [2026] | Ozturksoft",
    title: "Ankara LLM Entegrasyonu Maliyeti ve Fiyatları [2026] | Ozturksoft",
    oldDesc: "Ankara'da kamu ve bakanlık yazılım çözümleri. E-devlet süreçleri, evrak OCR, ihale otomasyonu, KVKK uyumlu on-premise yapay zeka ve maliyet rehberi.",
    desc: "Ankara LLM entegrasyonu maliyeti 2026: GPT/Claude API, RAG, chatbot, on-premise ve kurumsal AI fiyat tablosu. Gizli maliyetler ve bütçe planlama.",
    oldKeywords: 'ankara kamu yazılım, kamu yazılım şirketi ankara, e-devlet yazılım, bakanlık yazılım türkiye, kamu yapay zeka ankara',
    keywords: 'ankara llm entegrasyonu maliyeti, llm entegrasyonu fiyat, gpt entegrasyonu ankara, rag maliyeti türkiye, kurumsal ai fiyat',
    oldOgTitle: 'Ankara Kamu Yazılım Çözümleri [2026]',
    ogTitle: 'Ankara LLM Entegrasyonu Maliyeti [2026]',
    oldTwitterDesc: 'Kamu e-devlet, ihale otomasyonu, belge OCR ve on-premise AI — Ankara rehberi.',
    twitterDesc: 'LLM, RAG ve kurumsal AI — Ankara 2026 fiyat rehberi.',
    oldHeadline: "Ankara'da Kamu Yazılım Çözümleri: E-Devlet, İhale ve On-Premise AI Rehberi [2026]",
    headline: 'Ankara LLM Entegrasyonu Maliyeti [2026]',
    oldBreadcrumbName: "Ankara'da Chatbot Geliştirme 2026",
    breadcrumbName: 'Ankara LLM Maliyeti 2026',
    oldFaqJson: `"keywords": ["ankara kamu yazılım","kamu yazılım şirketi ankara","e-devlet yazılım","bakanlık yazılım türkiye","kamu yapay zeka ankara"]`,
    faqJson: `"keywords": ["ankara llm entegrasyonu","llm maliyeti","gpt entegrasyonu ankara","rag fiyat"]`,
    oldBody: `<p><strong>Kamu kurumları ve bakanlıklar</strong>`,
    body: `<p><strong>Ankara LLM entegrasyonu maliyeti</strong> proje kapsamına, model seçimine ve on-premise gereksinimine göre 40.000 TL'den 500.000+ TL'ye kadar değişir. Bu rehberde 2026 fiyat aralıkları, gizli maliyetler ve bütçe planlama ipuçlarını bulacaksınız.</p>
<div class="highlight-box"><p>⚡ Fiyatlar tahmini aralıktır; kesin teklif için <a href="/iletisim">ücretsiz keşif görüşmesi</a> talep edin.</p></div>
<h2>LLM Entegrasyonu Maliyet Tablosu (Ankara, 2026)</h2>
<table class="price-table"><thead><tr><th>Proje tipi</th><th>Maliyet (TL)</th><th>Süre</th></tr></thead><tbody>
<tr><td>Basit GPT chatbot (web)</td><td>40.000 – 80.000</td><td>3–5 hafta</td></tr>
<tr><td>WhatsApp + RAG bilgi bankası</td><td>80.000 – 150.000</td><td>6–10 hafta</td></tr>
<tr><td>Kurumsal AI agent (CRM/ERP)</td><td>150.000 – 280.000</td><td>2–4 ay</td></tr>
<tr><td>On-premise LLM platformu</td><td>280.000 – 500.000+</td><td>3–6 ay</td></tr>
</tbody></table>
<h2>Gizli Maliyetler</h2>
<ul>
<li><strong>API token</strong> — aylık OpenAI/Anthropic kullanımı</li>
<li><strong>Vektör veritabanı</strong> — Pinecone, pgvector hosting</li>
<li><strong>İçerik hazırlığı</strong> — RAG için doküman temizleme</li>
<li><strong>Bakım & fine-tuning</strong> — model güncelleme</li>
</ul>
<h2>Maliyeti Düşüren Faktörler</h2>
<p>Hazır MCP şablonları, açık kaynak embedding modelleri, kademeli MVP ve bulut yerine hibrit on-premise mimari bütçeyi optimize eder. <a href="/blog/llm-gpt-entegrasyonu-rehberi">LLM entegrasyon rehberi</a> · <a href="/blog/ankara-yapay-zeka-firmasi-nasil-secilir-2026">firma seçimi</a></p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraLlmMaliyet.title"></h3><p data-i18n="blog.cta.ankaraLlmMaliyet.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraLlmMaliyet.btn">Ücretsiz Teklif <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
    faqPage: [
      ['Ankara LLM entegrasyonu ne kadar?', 'Basit chatbot 40–80 bin TL, kurumsal RAG 80–150 bin TL, on-premise platform 280 bin TL ve üzeri.'],
      ['Aylık API maliyeti ne kadar?', 'Kullanıma bağlı; orta ölçekli kurumsal chatbot için 2.000–15.000 TL/ay token maliyeti tipiktir.'],
    ],
    articles: {
      en: `<p><strong>LLM integration cost in Ankara (2026)</strong> ranges from 40,000 to 500,000+ TRY depending on RAG, channels and on-premise needs.</p>
<table class="price-table"><thead><tr><th>Type</th><th>Cost (TRY)</th></tr></thead><tbody>
<tr><td>Simple GPT web chatbot</td><td>40,000 – 80,000</td></tr>
<tr><td>WhatsApp + RAG</td><td>80,000 – 150,000</td></tr>
<tr><td>Enterprise AI agent</td><td>150,000 – 280,000</td></tr>
<tr><td>On-premise LLM</td><td>280,000 – 500,000+</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraLlmMaliyet.title"></h3><p data-i18n="blog.cta.ankaraLlmMaliyet.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraLlmMaliyet.btn">Free Quote <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      de: `<p><strong>LLM-Integrationskosten in Ankara 2026</strong>: 40.000–500.000+ TRY je nach RAG und On-Premise.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraLlmMaliyet.title"></h3><p data-i18n="blog.cta.ankaraLlmMaliyet.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraLlmMaliyet.btn">Angebot <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      fr: `<p><strong>Coût d'intégration LLM à Ankara 2026</strong> : 40 000–500 000+ TRY.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraLlmMaliyet.title"></h3><p data-i18n="blog.cta.ankaraLlmMaliyet.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraLlmMaliyet.btn">Devis <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      ar: `<p><strong>تكلفة تكامل LLM في أنقرة 2026</strong>: 40,000–500,000+ ليرة تركية.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraLlmMaliyet.title"></h3><p data-i18n="blog.cta.ankaraLlmMaliyet.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraLlmMaliyet.btn">عرض مجاني <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
      ru: `<p><strong>Стоимость интеграции LLM в Анкаре 2026</strong>: 40 000–500 000+ TRY.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraLlmMaliyet.title"></h3><p data-i18n="blog.cta.ankaraLlmMaliyet.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraLlmMaliyet.btn">Запросить КП <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
    },
    prefix: 'ankara-llm-maliyet',
  },
];

function buildFaq(faqs) {
  const items = faqs.map(([q, a]) => `    {
      "@type": "Question",
      "name": "${q.replace(/"/g, '\\"')}",
      "acceptedAnswer": { "@type": "Answer", "text": "${a.replace(/"/g, '\\"')}" }
    }`).join(',\n');
  return `  {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${items}
  ]
}`;
}

for (const b of BLOGS) {
  let html = makeBlog(b);
  // Replace FAQ block
  html = html.replace(
    /<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema.org",\s*"@type": "FAQPage"[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${buildFaq(b.faqPage)}\n  </script>`
  );
  // Replace article body
  html = html.replace(
    /<article class="article-body">[\s\S]*?<\/article>/,
    `<article class="article-body">\n\n${b.body}\n\n</article>`
  );
  html = html.replace(/2026-07-16T10:00:00\+03:00/g, '2026-08-01T10:00:00+03:00');
  writeFileSync(resolve(blogDir, `${b.slug}.html`), html);
  console.log(`blog/${b.slug}.html`);

  for (const [lang, body] of Object.entries(b.articles)) {
    writeFileSync(resolve(articlesDir, `${b.prefix}-${lang}.html`), body + '\n');
    console.log(`  articles/${b.prefix}-${lang}.html`);
  }
}

console.log('Done: 3 blogs + 15 articles');
