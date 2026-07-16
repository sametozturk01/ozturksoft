/** Phase 2 blog posts: kamu, logo/netsis ERP, KVKK AI */

const cta = (key, btn) =>
  `<div class="cta-box"><h3 data-i18n="blog.cta.${key}.title"></h3><p data-i18n="blog.cta.${key}.desc"></p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.${key}.btn">${btn} <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`;

export const PHASE_POSTS = [
  {
    slug: 'ankara-kamu-yazilim-2026',
    articleKey: 'ankaraKamu',
    filePrefix: 'ankara-kamu',
    tag: '🏛️ Kamu',
    section: 'Yazılım',
    date: '16 Temmuz 2026',
    readMins: '10',
    metaDateKey: 'blog.meta.date7',
    metaReadKey: 'blog.meta.read10',
    published: '2026-07-16T10:00:00+03:00',
    title: "Ankara'da Kamu Yazılım Çözümleri: E-Devlet, İhale ve On-Premise AI Rehberi [2026]",
    desc: "Ankara'da kamu ve bakanlık yazılım çözümleri. E-devlet süreçleri, evrak OCR, ihale otomasyonu, KVKK uyumlu on-premise yapay zeka ve maliyet rehberi.",
    keywords: 'ankara kamu yazılım, kamu yazılım şirketi ankara, e-devlet yazılım, bakanlık yazılım türkiye, kamu yapay zeka ankara',
    ogTitle: "Ankara Kamu Yazılım Çözümleri [2026]",
    twitterDesc: 'Kamu e-devlet, ihale otomasyonu, belge OCR ve on-premise AI — Ankara rehberi.',
    breadcrumb: 'Ankara Kamu Yazılım 2026',
    faq: [
      { q: "Ankara'da kamu yazılım projesi ne kadar tutar?", a: 'Evrak OCR modülü 60.000–120.000 TL, ihale/süreç otomasyonu 120.000–250.000 TL, kurumsal on-premise AI platformu 250.000–500.000+ TL aralığındadır.' },
      { q: 'Kamu projelerinde veriler dışarı çıkar mı?', a: 'Hayır. On-premise veya özel bulut mimarisi ile veriler kurum içinde kalır; KVKK ve bilgi güvenliği standartlarına uygun tasarım yapılır.' },
      { q: 'Hangi kamu süreçleri otomatikleştirilebilir?', a: 'Evrak arşivleme, ihale dokümanı işleme, vatandaş başvuru takibi, iç yazışma ve raporlama süreçleri en yaygın senaryolardır.' },
    ],
    bodyTr: `<p><strong>Kamu kurumları ve bakanlıklar</strong>, veri güvenliği, KVKK uyumu ve süreklilik gereksinimleri nedeniyle yazılım projelerinde özel yaklaşım ister. <strong>Ankara'da kamu yazılım çözümleri</strong> arayan kurumlar için e-devlet süreçleri, evrak dijitalleştirme ve on-premise yapay zeka rehberi bu yazıda.</p>
<div class="highlight-box"><p>⚡ <strong>Bu yazıda:</strong> Kamu yazılım ihtiyaçları, e-devlet entegrasyonu, ihale otomasyonu, belge OCR, on-premise AI ve 2026 maliyet tablosu.</p></div>
<h2>Kamu Sektöründe Yazılım İhtiyaçları</h2>
<ul>
<li><strong>E-devlet & vatandaş portalları</strong> — başvuru, takip, bildirim</li>
<li><strong>Belge OCR & dijital arşiv</strong> — evrak, fatura, ihale dosyası</li>
<li><strong>İhale & süreç otomasyonu</strong> — onay akışları, hatırlatıcılar</li>
<li><strong>On-premise yapay zeka</strong> — veri kurum dışına çıkmadan</li>
<li><strong>Kurumsal raporlama</strong> — birleşik veri panelleri</li>
</ul>
<h2>Ankara'da Kamu Yazılım Maliyeti (2026)</h2>
<table class="price-table"><thead><tr><th>Kapsam</th><th>Maliyet</th><th>Süre</th></tr></thead><tbody>
<tr><td>Evrak OCR modülü</td><td>60.000 – 120.000 TL</td><td>4–8 hafta</td></tr>
<tr><td>İhale / süreç otomasyonu</td><td>120.000 – 250.000 TL</td><td>8–14 hafta</td></tr>
<tr><td>On-premise AI platformu</td><td>250.000 – 500.000+ TL</td><td>3–6 ay</td></tr>
</tbody></table>
<p>İlgili: <a href="/blog/ankara-ocr-belge-ai-2026">belge OCR</a> · <a href="/blog/kvkk-uyumlu-yapay-zeka-rehberi-2026">KVKK uyumlu AI</a> · <a href="/ankara-yapay-zeka-cozumleri">AI çözümleri</a></p>
<h2>KVKK ve Bilgi Güvenliği</h2>
<p>Kamu projelerinde <strong>veri minimizasyonu, rol bazlı erişim, audit log ve on-premise LLM</strong> standart mimari bileşenleridir. Ozturksoft, SAP implementasyonu yapmaz; mevcut kurumsal sistemlere <strong>entegrasyon odaklı</strong> özel yazılım geliştirir.</p>
<h2>Sık Sorulan Sorular</h2>
<h3>Kamu yazılımı on-premise kurulabilir mi?</h3>
<p>Evet. Sunucularınızda veya özel bulutta çalışan tam izole mimari kurulabilir.</p>
<h3>İhale süreçleri otomatikleştirilebilir mi?</h3>
<p>Evet. Doküman yükleme, onay zinciri, hatırlatma ve raporlama otomasyonu yapılabilir.</p>
${cta('ankaraKamu', 'Ücretsiz Keşif Görüşmesi')}`,
  },
  {
    slug: 'logo-netsis-erp-entegrasyon-rehberi-2026',
    articleKey: 'logoNetsisErp',
    filePrefix: 'logo-netsis-erp',
    tag: '🔗 ERP Entegrasyon',
    section: 'Entegrasyon',
    date: '16 Temmuz 2026',
    readMins: '11',
    metaDateKey: 'blog.meta.date7',
    metaReadKey: 'blog.meta.read11',
    published: '2026-07-16T11:00:00+03:00',
    title: 'Logo, Netsis ve SAP ERP Entegrasyonu: API, Maliyet ve Rehber [2026]',
    desc: 'Logo Tiger, Netsis, Mikro ve mevcut SAP sistemlerinize API entegrasyonu rehberi. SAP danışmanlığı değil — özel yazılım ve CRM/chatbot bağlantısı.',
    keywords: 'logo entegrasyonu, netsis api, erp entegrasyonu ankara, sap entegrasyonu türkiye, logo tiger api, mikro erp entegrasyon',
    ogTitle: 'Logo, Netsis & SAP ERP Entegrasyon Rehberi [2026]',
    twitterDesc: 'Logo, Netsis, Mikro ve SAP API entegrasyonu — danışmanlık değil, özel yazılım bağlantısı.',
    breadcrumb: 'Logo Netsis ERP Entegrasyon 2026',
    faq: [
      { q: 'SAP danışmanlığı yapıyor musunuz?', a: 'Hayır. SAP ABAP implementasyonu veya modül danışmanlığı sunmuyoruz. Mevcut SAP, Logo, Netsis ve Mikro sistemlerinize REST API veya RFC ile entegre özel yazılım geliştiriyoruz.' },
      { q: 'Logo Tiger entegrasyonu ne kadar sürer?', a: 'Tek yönlü stok/fatura senkronu 2–4 hafta, çift yönlü CRM + e-ticaret entegrasyonu 6–12 hafta sürebilir.' },
      { q: 'Hangi sistemler desteklenir?', a: 'Logo Tiger, Netsis, Mikro, mevcut SAP kurulumları (API/RFC), Salesforce, HubSpot ve özel ERP sistemleri.' },
    ],
    bodyTr: `<p><strong>ERP entegrasyonu</strong>, e-ticaret, CRM, chatbot ve özel uygulamalarınızı Logo, Netsis, Mikro veya mevcut <strong>SAP</strong> sisteminizle konuşturur. Bu rehberde <strong>Logo ve Netsis ERP entegrasyonu</strong> maliyeti, API yaklaşımları ve dikkat edilmesi gerekenleri anlatıyoruz.</p>
<div class="highlight-box"><p>⚠️ <strong>Önemli:</strong> Ozturksoft <strong>SAP implementasyonu veya ABAP danışmanlığı yapmaz.</strong> Mevcut ERP'nize bağlanan özel yazılım, chatbot ve otomasyon çözümleri geliştirir.</p></div>
<h2>Desteklenen ERP Sistemleri</h2>
<ul>
<li><strong>Logo Tiger / Go</strong> — REST API, web servis</li>
<li><strong>Netsis</strong> — API ve veritabanı entegrasyonu</li>
<li><strong>Mikro</strong> — stok, cari, fatura senkronu</li>
<li><strong>SAP (mevcut kurulum)</strong> — RFC/OData/API katmanı</li>
<li><strong>Özel ERP</strong> — REST, SOAP, middleware</li>
</ul>
<h2>Entegrasyon Senaryoları</h2>
<ul><li>E-ticaret ↔ ERP stok ve sipariş senkronu</li><li>WhatsApp chatbot ↔ CRM müşteri kaydı</li><li>Fatura OCR ↔ muhasebe/ERP otomatik kayıt</li><li>Mobil saha uygulaması ↔ ERP üretim modülü</li></ul>
<h2>2026 Entegrasyon Maliyetleri</h2>
<table class="price-table"><thead><tr><th>Kapsam</th><th>Maliyet</th><th>Süre</th></tr></thead><tbody>
<tr><td>Tek yönlü API (Logo/Netsis)</td><td>20.000 – 45.000 TL</td><td>2–4 hafta</td></tr>
<tr><td>Çift yönlü + middleware</td><td>55.000 – 130.000 TL</td><td>6–10 hafta</td></tr>
<tr><td>SAP RFC/API + özel modül</td><td>120.000 – 280.000 TL</td><td>8–16 hafta</td></tr>
</tbody></table>
<p>İlgili: <a href="/blog/crm-erp-entegrasyonu-rehberi-2026">CRM/ERP rehberi</a> · <a href="/blog/ankara-chatbot-gelistirme-2026">chatbot entegrasyonu</a> · <a href="/hizmetler">hizmetlerimiz</a></p>
<h2>Sık Sorulan Sorular</h2>
<h3>SAP danışmanlığı yapıyor musunuz?</h3>
<p><strong>Hayır.</strong> SAP modül kurulumu yapmıyoruz; mevcut SAP'nize API ile bağlanan yazılım geliştiriyoruz.</p>
<h3>Logo Tiger API entegrasyonu mümkün mü?</h3>
<p>Evet. Stok, cari, fatura ve sipariş senkronu REST API ile yapılabilir.</p>
${cta('logoNetsisErp', 'Ücretsiz Entegrasyon Analizi')}`,
  },
  {
    slug: 'kvkk-uyumlu-yapay-zeka-rehberi-2026',
    articleKey: 'kvkkAi',
    filePrefix: 'kvkk-ai',
    tag: '🔒 KVKK & AI',
    section: 'Yapay Zeka',
    date: '16 Temmuz 2026',
    readMins: '10',
    metaDateKey: 'blog.meta.date7',
    metaReadKey: 'blog.meta.read10',
    published: '2026-07-16T12:00:00+03:00',
    title: 'KVKK Uyumlu Yapay Zeka Rehberi: On-Premise LLM, Veri Güvenliği [2026]',
    desc: 'KVKK uyumlu yapay zeka nasıl kurulur? On-premise LLM, veri maskeleme, audit log ve kamu/finans/savunma sektörleri için AI mimarisi rehberi.',
    keywords: 'kvkk uyumlu yapay zeka, on premise llm türkiye, kurumsal ai kvkk, güvenli yapay zeka ankara, veri güvenliği ai',
    ogTitle: 'KVKK Uyumlu Yapay Zeka Rehberi [2026]',
    twitterDesc: 'On-premise LLM, veri maskeleme ve KVKK uyumlu kurumsal AI mimarisi.',
    breadcrumb: 'KVKK Uyumlu Yapay Zeka 2026',
    faq: [
      { q: 'KVKK uyumlu AI için veriler buluta gidebilir mi?', a: 'Hassas kişisel veriler için on-premise veya özel bulut tercih edilir. Açık rıza ve veri işleme envanteri ile sınırlı bulut API kullanımı mümkündür.' },
      { q: 'On-premise LLM maliyeti ne kadar?', a: 'PoC için 80.000–150.000 TL, kurumsal on-premise platform 200.000–450.000+ TL aralığındadır.' },
      { q: 'Hangi sektörler on-premise AI kullanır?', a: 'Kamu, savunma, finans, sağlık ve hukuk sektörleri verinin kurum dışına çıkmamasını şart koşar.' },
    ],
    bodyTr: `<p><strong>KVKK uyumlu yapay zeka</strong>, kişisel ve kurumsal verilerin korunmasıyla birlikte LLM, chatbot ve AI agents kullanımını mümkün kılar. Kamu, finans ve savunma sektörlerinde <strong>on-premise AI</strong> artık standart gereksinimdir.</p>
<div class="highlight-box"><p>⚡ <strong>Bu yazıda:</strong> KVKK + AI ilkeleri, on-premise LLM, veri maskeleme, audit log, sektörel örnekler ve maliyet tablosu.</p></div>
<h2>KVKK Uyumlu AI Mimarisi</h2>
<ul>
<li><strong>On-premise LLM</strong> — veri sunucunuzda kalır</li>
<li><strong>Veri maskeleme</strong> — TCKN, IBAN, sağlık verisi anonimleştirme</li>
<li><strong>Rol bazlı erişim (RBAC)</strong> — kim hangi veriyi görür</li>
<li><strong>Audit log</strong> — tüm AI sorguları kayıt altında</li>
<li><strong>RAG ile iç doküman</strong> — harici modele minimum veri</li>
</ul>
<h2>Sektörel Kullanım</h2>
<ul><li><strong>Kamu:</strong> evrak sınıflandırma, vatandaş chatbot (on-premise)</li><li><strong>Finans:</strong> risk analizi, dolandırıcılık tespiti</li><li><strong>Savunma:</strong> izole ağda belge AI</li><li><strong>Sağlık:</strong> KVKK + sağlık verisi koruma</li></ul>
<h2>2026 Maliyet Tablosu</h2>
<table class="price-table"><thead><tr><th>Kapsam</th><th>Maliyet</th><th>Süre</th></tr></thead><tbody>
<tr><td>KVKK uyumlu chatbot (on-premise)</td><td>80.000 – 150.000 TL</td><td>6–10 hafta</td></tr>
<tr><td>RAG + kurumsal LLM</td><td>150.000 – 280.000 TL</td><td>10–16 hafta</td></tr>
<tr><td>Tam on-premise AI platformu</td><td>280.000 – 500.000+ TL</td><td>3–6 ay</td></tr>
</tbody></table>
<p>İlgili: <a href="/blog/llm-gpt-entegrasyonu-rehberi">LLM entegrasyonu</a> · <a href="/blog/ankara-kamu-yazilim-2026">kamu yazılım</a> · <a href="/ankara-ai-asistan">AI Asistan</a></p>
<h2>Sık Sorulan Sorular</h2>
<h3>ChatGPT kullanmak KVKK'ya aykırı mı?</h3>
<p>Kişisel veri gönderilmeden, aydınlatma ve sözleşmelerle sınırlı kullanım mümkündür. Hassas veriler için <strong>on-premise</strong> önerilir.</p>
<h3>On-premise LLM hangi modellerle çalışır?</h3>
<p>Llama, Mistral, Qwen ve kurumsal OpenAI/Azure private endpoint seçenekleri değerlendirilir.</p>
${cta('kvkkAi', 'KVKK Uyumlu AI Danışmanlığı')}`,
  },
];

export const PHASE_LOCALE_BODIES = {
  'ankara-kamu': {
    en: `<p><strong>Public sector software</strong> in <strong>Ankara</strong> requires KVKK compliance, data sovereignty and on-premise AI. This guide covers e-government workflows, document OCR, tender automation and 2026 pricing.</p>
<h2>Public Sector Software Needs</h2>
<ul><li>E-government & citizen portals</li><li>Document OCR & digital archive</li><li>Tender & process automation</li><li>On-premise AI — data stays in-house</li></ul>
<h2>Costs (Ankara, 2026)</h2>
<table class="price-table"><thead><tr><th>Scope</th><th>Cost</th><th>Timeline</th></tr></thead><tbody>
<tr><td>Document OCR module</td><td>60,000 – 120,000 TRY</td><td>4–8 weeks</td></tr>
<tr><td>Tender / process automation</td><td>120,000 – 250,000 TRY</td><td>8–14 weeks</td></tr>
<tr><td>On-premise AI platform</td><td>250,000 – 500,000+ TRY</td><td>3–6 months</td></tr>
</tbody></table>
<p><a href="/blog/ankara-ocr-belge-ai-2026">document OCR</a> · <a href="/blog/kvkk-uyumlu-yapay-zeka-rehberi-2026">KVKK-compliant AI</a></p>
${cta('ankaraKamu', 'Free Discovery Call')}`,
    de: `<p><strong>Behördensoftware</strong> in <strong>Ankara</strong>: E-Government, Dokumenten-OCR, Ausschreibungsautomatisierung und on-premise KI mit KVKK-Konformität.</p>
<h2>Kosten (Ankara, 2026)</h2>
<table class="price-table"><thead><tr><th>Umfang</th><th>Kosten</th><th>Dauer</th></tr></thead><tbody>
<tr><td>OCR-Modul</td><td>60.000 – 120.000 TRY</td><td>4–8 Wochen</td></tr>
<tr><td>Prozessautomatisierung</td><td>120.000 – 250.000 TRY</td><td>8–14 Wochen</td></tr>
<tr><td>On-Premise KI</td><td>250.000 – 500.000+ TRY</td><td>3–6 Monate</td></tr>
</tbody></table>
${cta('ankaraKamu', 'Kostenlose Beratung')}`,
    fr: `<p><strong>Logiciel secteur public</strong> à <strong>Ankara</strong> : e-gouvernement, OCR documentaire, automatisation des appels d'offres et IA on-premise conforme KVKK.</p>
<h2>Coûts (Ankara, 2026)</h2>
<table class="price-table"><thead><tr><th>Portée</th><th>Coût</th><th>Délai</th></tr></thead><tbody>
<tr><td>Module OCR</td><td>60 000 – 120 000 TRY</td><td>4–8 semaines</td></tr>
<tr><td>Automatisation processus</td><td>120 000 – 250 000 TRY</td><td>8–14 semaines</td></tr>
<tr><td>Plateforme IA on-premise</td><td>250 000 – 500 000+ TRY</td><td>3–6 mois</td></tr>
</tbody></table>
${cta('ankaraKamu', 'Consultation gratuite')}`,
    ar: `<p><strong>برمجيات القطاع العام</strong> في <strong>أنقرة</strong>: الحكومة الإلكترونية، OCR للمستندات، أتمتة المناقصات وذكاء اصطناعي on-premise متوافق مع KVKK.</p>
<h2>التكاليف (أنقرة، 2026)</h2>
<table class="price-table"><thead><tr><th>النطاق</th><th>التكلفة</th><th>المدة</th></tr></thead><tbody>
<tr><td>وحدة OCR</td><td>60.000 – 120.000 TRY</td><td>4–8 أسابيع</td></tr>
<tr><td>أتمتة العمليات</td><td>120.000 – 250.000 TRY</td><td>8–14 أسبوعاً</td></tr>
<tr><td>منصة AI on-premise</td><td>250.000 – 500.000+ TRY</td><td>3–6 أشهر</td></tr>
</tbody></table>
${cta('ankaraKamu', 'استشارة مجانية')}`,
    ru: `<p><strong>ГосПО</strong> в <strong>Анкаре</strong>: электронное правительство, OCR документов, автоматизация тендеров и on-premise ИИ с соблюдением KVKK.</p>
<h2>Стоимость (Анкара, 2026)</h2>
<table class="price-table"><thead><tr><th>Объём</th><th>Стоимость</th><th>Срок</th></tr></thead><tbody>
<tr><td>Модуль OCR</td><td>60 000 – 120 000 TRY</td><td>4–8 недель</td></tr>
<tr><td>Автоматизация процессов</td><td>120 000 – 250 000 TRY</td><td>8–14 недель</td></tr>
<tr><td>On-premise ИИ</td><td>250 000 – 500 000+ TRY</td><td>3–6 месяцев</td></tr>
</tbody></table>
${cta('ankaraKamu', 'Бесплатная консультация')}`,
  },
  'logo-netsis-erp': {
    en: `<p><strong>ERP integration</strong> connects your e-commerce, CRM, chatbot and custom apps to Logo, Netsis, Mikro or existing <strong>SAP</strong> systems via API.</p>
<div class="highlight-box"><p>⚠️ <strong>Important:</strong> We do <strong>not</strong> offer SAP implementation or ABAP consulting — only custom software that integrates with your existing ERP.</p></div>
<h2>Supported Systems</h2>
<ul><li>Logo Tiger / Go</li><li>Netsis</li><li>Mikro</li><li>SAP (existing install — RFC/OData/API)</li><li>Custom ERP</li></ul>
<h2>2026 Integration Costs</h2>
<table class="price-table"><thead><tr><th>Scope</th><th>Cost</th></tr></thead><tbody>
<tr><td>Single API (Logo/Netsis)</td><td>20,000 – 45,000 TRY</td></tr>
<tr><td>Bi-directional + middleware</td><td>55,000 – 130,000 TRY</td></tr>
<tr><td>SAP RFC/API + custom module</td><td>120,000 – 280,000 TRY</td></tr>
</tbody></table>
<p><a href="/blog/crm-erp-entegrasyonu-rehberi-2026">CRM/ERP guide</a></p>
${cta('logoNetsisErp', 'Free Integration Analysis')}`,
    de: `<p><strong>ERP-Integration</strong> verbindet E-Commerce, CRM und Chatbots mit Logo, Netsis, Mikro oder bestehendem <strong>SAP</strong> per API.</p>
<div class="highlight-box"><p>⚠️ Keine SAP-Implementierung — nur Integration mit bestehenden ERP-Systemen.</p></div>
<h2>Kosten (2026)</h2>
<table class="price-table"><thead><tr><th>Umfang</th><th>Kosten</th></tr></thead><tbody>
<tr><td>Einzel-API</td><td>20.000 – 45.000 TRY</td></tr>
<tr><td>Bi-direktional</td><td>55.000 – 130.000 TRY</td></tr>
<tr><td>SAP RFC/API</td><td>120.000 – 280.000 TRY</td></tr>
</tbody></table>
${cta('logoNetsisErp', 'Kostenlose Analyse')}`,
    fr: `<p><strong>Intégration ERP</strong> avec Logo, Netsis, Mikro ou <strong>SAP</strong> existant via API — pas de conseil SAP, uniquement logiciel sur mesure connecté.</p>
<h2>Coûts (2026)</h2>
<table class="price-table"><thead><tr><th>Portée</th><th>Coût</th></tr></thead><tbody>
<tr><td>API unique</td><td>20 000 – 45 000 TRY</td></tr>
<tr><td>Bi-directionnel</td><td>55 000 – 130 000 TRY</td></tr>
<tr><td>SAP RFC/API</td><td>120 000 – 280 000 TRY</td></tr>
</tbody></table>
${cta('logoNetsisErp', 'Analyse gratuite')}`,
    ar: `<p><strong>تكامل ERP</strong> مع Logo وNetsis وMikro أو <strong>SAP</strong> الحالي عبر API — لا نقدم استشارات SAP، فقط برمجيات مخصصة متصلة.</p>
<h2>التكاليف (2026)</h2>
<table class="price-table"><thead><tr><th>النطاق</th><th>التكلفة</th></tr></thead><tbody>
<tr><td>API واحد</td><td>20.000 – 45.000 TRY</td></tr>
<tr><td>ثنائي الاتجاه</td><td>55.000 – 130.000 TRY</td></tr>
<tr><td>SAP RFC/API</td><td>120.000 – 280.000 TRY</td></tr>
</tbody></table>
${cta('logoNetsisErp', 'تحليل مجاني')}`,
    ru: `<p><strong>Интеграция ERP</strong> с Logo, Netsis, Mikro или существующим <strong>SAP</strong> через API — без SAP-консалтинга, только кастомное ПО.</p>
<h2>Стоимость (2026)</h2>
<table class="price-table"><thead><tr><th>Объём</th><th>Стоимость</th></tr></thead><tbody>
<tr><td>Один API</td><td>20 000 – 45 000 TRY</td></tr>
<tr><td>Двунаправленный</td><td>55 000 – 130 000 TRY</td></tr>
<tr><td>SAP RFC/API</td><td>120 000 – 280 000 TRY</td></tr>
</tbody></table>
${cta('logoNetsisErp', 'Бесплатный анализ')}`,
  },
  'kvkk-ai': {
    en: `<p><strong>KVKK-compliant AI</strong> enables LLM, chatbot and AI agents while protecting personal and corporate data. On-premise AI is standard for public sector, finance and defense.</p>
<h2>Compliant AI Architecture</h2>
<ul><li>On-premise LLM</li><li>Data masking (ID, IBAN, health data)</li><li>RBAC & audit logs</li><li>RAG on internal documents</li></ul>
<h2>2026 Costs</h2>
<table class="price-table"><thead><tr><th>Scope</th><th>Cost</th></tr></thead><tbody>
<tr><td>On-premise chatbot</td><td>80,000 – 150,000 TRY</td></tr>
<tr><td>RAG + enterprise LLM</td><td>150,000 – 280,000 TRY</td></tr>
<tr><td>Full on-premise AI platform</td><td>280,000 – 500,000+ TRY</td></tr>
</tbody></table>
<p><a href="/blog/llm-gpt-entegrasyonu-rehberi">LLM integration</a> · <a href="/ankara-ai-asistan">AI Assistant</a></p>
${cta('kvkkAi', 'Free KVKK AI Consultation')}`,
    de: `<p><strong>KVKK-konforme KI</strong> mit on-premise LLM, Datenmaskierung, RBAC und Audit-Logs für Behörden, Finanz und Verteidigung.</p>
<h2>Kosten (2026)</h2>
<table class="price-table"><thead><tr><th>Umfang</th><th>Kosten</th></tr></thead><tbody>
<tr><td>On-Premise Chatbot</td><td>80.000 – 150.000 TRY</td></tr>
<tr><td>RAG + LLM</td><td>150.000 – 280.000 TRY</td></tr>
<tr><td>Volle KI-Plattform</td><td>280.000 – 500.000+ TRY</td></tr>
</tbody></table>
${cta('kvkkAi', 'Kostenlose Beratung')}`,
    fr: `<p><strong>IA conforme KVKK</strong> : LLM on-premise, masquage des données, RBAC et journaux d'audit pour secteur public, finance et défense.</p>
<h2>Coûts (2026)</h2>
<table class="price-table"><thead><tr><th>Portée</th><th>Coût</th></tr></thead><tbody>
<tr><td>Chatbot on-premise</td><td>80 000 – 150 000 TRY</td></tr>
<tr><td>RAG + LLM</td><td>150 000 – 280 000 TRY</td></tr>
<tr><td>Plateforme IA complète</td><td>280 000 – 500 000+ TRY</td></tr>
</tbody></table>
${cta('kvkkAi', 'Consultation gratuite')}`,
    ar: `<p><strong>ذكاء اصطناعي متوافق مع KVKK</strong>: LLM on-premise، إخفاء البيانات، RBAC وسجلات تدقيق للقطاع العام والمالية والدفاع.</p>
<h2>التكاليف (2026)</h2>
<table class="price-table"><thead><tr><th>النطاق</th><th>التكلفة</th></tr></thead><tbody>
<tr><td>روبوت on-premise</td><td>80.000 – 150.000 TRY</td></tr>
<tr><td>RAG + LLM</td><td>150.000 – 280.000 TRY</td></tr>
<tr><td>منصة AI كاملة</td><td>280.000 – 500.000+ TRY</td></tr>
</tbody></table>
${cta('kvkkAi', 'استشارة مجانية')}`,
    ru: `<p><strong>ИИ с соблюдением KVKK</strong>: on-premise LLM, маскирование данных, RBAC и аудит для госсектора, финансов и обороны.</p>
<h2>Стоимость (2026)</h2>
<table class="price-table"><thead><tr><th>Объём</th><th>Стоимость</th></tr></thead><tbody>
<tr><td>On-premise чатбот</td><td>80 000 – 150 000 TRY</td></tr>
<tr><td>RAG + LLM</td><td>150 000 – 280 000 TRY</td></tr>
<tr><td>Полная платформа ИИ</td><td>280 000 – 500 000+ TRY</td></tr>
</tbody></table>
${cta('kvkkAi', 'Бесплатная консультация')}`,
  },
};
