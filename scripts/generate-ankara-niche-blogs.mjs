import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { buildHreflangTags } from './blog-i18n-config.mjs';
import { LOCALE_BODIES, NEW_POSTS, newLocaleExtras } from './ankara-niche-i18n.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const template = readFileSync(resolve(root, 'blog/ankara-chatbot-gelistirme-2026.html'), 'utf8');
const articlesDir = resolve(root, 'src/i18n/articles');
const blogDir = resolve(root, 'blog');

const POSTS = [
  {
    slug: 'ankara-ai-agents-gelistirme-2026',
    articleKey: 'ankaraAiAgents',
    filePrefix: 'ankara-ai-agents',
    tag: '🤖 AI Agents',
    section: 'Yapay Zeka',
    date: '9 Temmuz 2026',
    readMins: '10',
    published: '2026-07-09T10:00:00+03:00',
    title: "Ankara'da AI Agents Geliştirme: Otonom Asistanlar, Maliyet ve Rehber [2026]",
    desc: "Ankara'da AI agents geliştirme rehberi. Otonom asistanlar, araç kullanımı, çok adımlı iş akışları, maliyet tablosu ve doğru firma seçimi.",
    keywords: 'ankara ai agents, ai agent geliştirme ankara, otonom ai asistan ankara, yapay zeka agent türkiye, enterprise ai ankara',
    ogTitle: "Ankara'da AI Agents Geliştirme [2026]",
  twitterDesc: 'AI agents maliyeti, LangChain, MCP entegrasyonu ve KVKK uyumlu otonom asistan rehberi.',
    breadcrumb: 'Ankara AI Agents 2026',
    ctaKey: 'ankaraAiAgents',
    faq: [
      { q: "Ankara'da AI agents geliştirmek ne kadar tutar?", a: 'Temel bir AI agent PoC projesi 60.000–120.000 TL, CRM/ERP entegreli kurumsal agent çözümü 150.000–350.000 TL aralığındadır. Aylık API ve bakım maliyeti ayrıca planlanmalıdır.' },
      { q: 'AI agent ile chatbot arasındaki fark nedir?', a: 'Chatbot çoğunlukla soru-cevap odaklıdır. AI agent ise araçları kullanarak çok adımlı görevleri planlar, veritabanına yazar, e-posta gönderir veya süreç başlatır — otonom karar alır.' },
      { q: 'AI agents KVKK uyumlu olabilir mi?', a: 'Evet. On-premise LLM, veri maskeleme, rol bazlı erişim ve audit log ile KVKK uyumlu AI agent mimarisi kurulabilir.' },
    ],
    bodyTr: `<p><strong>AI agents</strong> (yapay zeka ajanları), tek bir soruya yanıt vermekle kalmaz; hedefe ulaşmak için <strong>plan yapar, araçları kullanır ve çok adımlı iş akışlarını otonom yürütür.</strong> 2026'da Ankara'daki KOBİ'ler ve kurumlar, chatbot'un ötesinde bu teknolojiyi aramaya başladı.</p>
<p>Bu rehberde <strong>Ankara'da AI agents geliştirme</strong> maliyeti, mimari seçenekleri, kullanım senaryoları ve doğru yazılım partnerini nasıl seçeceğinizi anlatıyoruz.</p>
<div class="highlight-box"><p>⚡ <strong>Bu yazıda:</strong> AI agent vs chatbot farkı, LangChain/MCP mimarisi, sektörel kullanım örnekleri, 2026 maliyet tablosu ve KVKK uyumu.</p></div>
<h2>AI Agent Nedir?</h2>
<p>AI agent; LLM (GPT-4o, Claude vb.) çekirdeği, <strong>araç seti</strong> (veritabanı sorgusu, API çağrısı, e-posta, dosya okuma) ve <strong>görev planlayıcı</strong>dan oluşan otonom bir yazılım katmanıdır.</p>
<ul>
<li><strong>Chatbot:</strong> "Kargo nerede?" → yanıt verir</li>
<li><strong>AI Agent:</strong> "İade talebini işle" → CRM'de kayıt açar, stok günceller, müşteriye e-posta atar, yöneticiye bildirim gönderir</li>
</ul>
<h2>Ankara'da AI Agents Kullanım Senaryoları</h2>
<div class="use-case-grid">
<div class="use-case-card"><div class="icon">📋</div><h4>Satış & Destek Agent</h4><p>CRM'den müşteri geçmişini okur, teklif hazırlar, WhatsApp veya e-posta ile iletişim kurar.</p></div>
<div class="use-case-card"><div class="icon">📄</div><h4>Belge İşleme Agent</h4><p>Fatura, sözleşme ve evrakları OCR ile okur, ERP'ye işler, onay akışı başlatır.</p></div>
<div class="use-case-card"><div class="icon">🔍</div><h4>Araştırma Agent</h4><p>İç dokümanlar, web ve veritabanından bilgi toplar, rapor üretir.</p></div>
<div class="use-case-card"><div class="icon">⚙️</div><h4>Operasyon Agent</h4><p>Stok, sipariş ve lojistik süreçlerinde tetikleyici aksiyonlar alır.</p></div>
</div>
<h2>AI Agents Geliştirme Maliyeti (Ankara, 2026)</h2>
<table class="price-table"><thead><tr><th>Kapsam</th><th>Maliyet</th><th>Süre</th></tr></thead><tbody>
<tr><td>PoC / tek senaryo agent</td><td>60.000 – 120.000 TL</td><td>4–6 hafta</td></tr>
<tr><td>Çok araçlı kurumsal agent</td><td>150.000 – 280.000 TL</td><td>8–14 hafta</td></tr>
<tr><td>Enterprise AI (on-premise + MCP)</td><td>280.000 – 500.000+ TL</td><td>3–6 ay</td></tr>
</tbody></table>
<p>İlgili rehberler: <a href="/blog/llm-gpt-entegrasyonu-rehberi">LLM entegrasyonu</a>, <a href="/blog/ankara-mcp-sunucu-gelistirme-2026">MCP sunucuları</a>, <a href="/blog/ankara-chatbot-gelistirme-2026">chatbot geliştirme</a>.</p>
<h2>Teknik Mimari: LangChain, RAG ve MCP</h2>
<p>Güçlü bir AI agent genelde şu bileşenlerden oluşur:</p>
<ul>
<li><strong>LLM:</strong> OpenAI GPT-4o, Anthropic Claude veya on-premise model</li>
<li><strong>RAG:</strong> Şirket dokümanlarından bağlamlı yanıt</li>
<li><strong>MCP Servers:</strong> Model Context Protocol ile güvenli araç bağlantısı</li>
<li><strong>Orchestration:</strong> LangChain, LangGraph veya özel agent framework</li>
</ul>
<p><a href="/ankara-yapay-zeka-cozumleri">Ozturksoft</a> Ankara merkezli olarak AI agents, <a href="/hizmetler">kurumsal yazılım</a> ve KVKK uyumlu mimari sunar.</p>
<h2>Sık Sorulan Sorular</h2>
<h3>Ankara'da AI agents geliştirmek ne kadar tutar?</h3>
<p>PoC için <strong>60.000–120.000 TL</strong>, tam kurumsal çözüm için <strong>150.000–350.000+ TL</strong> bütçe planlayın.</p>
<h3>AI agent ile chatbot farkı nedir?</h3>
<p>Chatbot yanıt odaklıdır; AI agent görev tamamlar — planlar, araç kullanır, sistemlere yazar.</p>
<h3>Hangi sektörler için uygun?</h3>
<p>Perakende, lojistik, hukuk, sağlık, kamu ve üretim — tekrarlayan çok adımlı süreçlerin olduğu her alan.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiAgents.title">Ankara'da AI Agents Projenizi Planlayalım</h3><p data-i18n="blog.cta.ankaraAiAgents.desc">Otonom asistan ve kurumsal AI agent mimarinizi ücretsiz keşif görüşmesinde birlikte tasarlayalım.</p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiAgents.btn">Ücretsiz Danışmanlık <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
    bodyEn: `<p><strong>AI agents</strong> go beyond answering a single question — they <strong>plan, use tools, and run multi-step workflows autonomously.</strong> In 2026, SMEs and enterprises in Ankara are looking beyond chatbots for this capability.</p>
<p>This guide covers <strong>AI agent development in Ankara</strong>: costs, architecture, use cases, and how to choose the right partner.</p>
<div class="highlight-box"><p>⚡ <strong>In this article:</strong> AI agent vs chatbot, LangChain/MCP architecture, sector examples, 2026 pricing, and KVKK compliance.</p></div>
<h2>What Is an AI Agent?</h2>
<p>An AI agent combines an LLM core, a <strong>tool set</strong> (database queries, APIs, email, files), and a <strong>task planner</strong> into an autonomous software layer.</p>
<h2>Use Cases in Ankara</h2>
<ul><li>Sales & support agents connected to CRM</li><li>Document processing with OCR + ERP</li><li>Research agents across internal docs</li><li>Operations agents for stock and logistics</li></ul>
<h2>Development Costs (2026)</h2>
<table class="price-table"><thead><tr><th>Scope</th><th>Cost</th><th>Timeline</th></tr></thead><tbody>
<tr><td>PoC / single-scenario agent</td><td>60,000 – 120,000 TRY</td><td>4–6 weeks</td></tr>
<tr><td>Multi-tool enterprise agent</td><td>150,000 – 280,000 TRY</td><td>8–14 weeks</td></tr>
<tr><td>Enterprise AI (on-premise + MCP)</td><td>280,000 – 500,000+ TRY</td><td>3–6 months</td></tr>
</tbody></table>
<p>Related: <a href="/blog/llm-gpt-entegrasyonu-rehberi">LLM integration</a>, <a href="/blog/ankara-mcp-sunucu-gelistirme-2026">MCP servers</a>.</p>
<h2>FAQ</h2>
<h3>How much does an AI agent cost in Ankara?</h3>
<p>Plan <strong>60,000–120,000 TRY</strong> for PoC and <strong>150,000–350,000+ TRY</strong> for full enterprise solutions.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraAiAgents.title">Plan Your AI Agents Project in Ankara</h3><p data-i18n="blog.cta.ankaraAiAgents.desc">Free discovery session for autonomous assistant and enterprise AI agent architecture.</p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraAiAgents.btn">Free Consultation <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
  },
  {
    slug: 'ankara-mcp-sunucu-gelistirme-2026',
    articleKey: 'ankaraMcp',
    filePrefix: 'ankara-mcp',
    tag: '🔌 MCP',
    section: 'Yapay Zeka',
    date: '9 Temmuz 2026',
    readMins: '9',
    published: '2026-07-09T11:00:00+03:00',
    title: "Ankara'da MCP Sunucu Geliştirme: Model Context Protocol Rehberi [2026]",
    desc: "Ankara'da MCP (Model Context Protocol) sunucu geliştirme. LLM'leri veritabanı, CRM ve araçlara güvenli bağlama, maliyet ve mimari rehberi.",
    keywords: 'ankara mcp sunucu, mcp server türkiye, model context protocol ankara, mcp geliştirme, llm entegrasyon ankara',
    ogTitle: "Ankara MCP Sunucu Geliştirme [2026]",
    twitterDesc: 'MCP sunucuları ile LLM-araç entegrasyonu, KVKK uyumu ve kurumsal AI altyapısı rehberi.',
    breadcrumb: 'Ankara MCP Sunucu 2026',
    ctaKey: 'ankaraMcp',
    faq: [
      { q: 'MCP (Model Context Protocol) nedir?', a: 'MCP, büyük dil modellerinin harici araçlara, veritabanlarına ve API\'lere standart ve güvenli şekilde bağlanmasını sağlayan açık bir protokoldür. Anthropic tarafından tanıtılmıştır.' },
      { q: "Ankara'da MCP sunucu geliştirmek ne kadar tutar?", a: 'Temel MCP sunucu entegrasyonu 40.000–80.000 TL, kurumsal çoklu araç MCP altyapısı 100.000–200.000 TL aralığındadır.' },
      { q: 'MCP neden önemli?', a: 'LLM\'lerin gerçek iş değeri üretmesi için CRM, ERP, veritabanı ve özel API\'lere bağlanması gerekir. MCP bu bağlantıyı standartlaştırır ve güvenli hale getirir.' },
    ],
    bodyTr: `<p><strong>MCP (Model Context Protocol)</strong>, 2025–2026'nın en kritik kurumsal AI altyapı trendlerinden biri. LLM'lerinizi veritabanı, CRM, dosya sistemi ve özel API'lere <strong>güvenli ve standart</strong> şekilde bağlamanızı sağlar.</p>
<p><strong>Ankara'da MCP sunucu geliştirme</strong> hizmeti arayan kurumlar için bu rehberde protokolü, mimariyi, maliyeti ve kullanım senaryolarını açıklıyoruz.</p>
<div class="highlight-box"><p>⚡ <strong>Bu yazıda:</strong> MCP nedir, chatbot/LLM'den farkı, Ankara'da kurumsal kullanım, geliştirme maliyeti ve KVKK uyumlu dağıtım.</p></div>
<h2>MCP (Model Context Protocol) Nedir?</h2>
<p>MCP, AI uygulamalarının (Claude, Cursor, özel agent'lar) <strong>harici kaynaklara</strong> bağlanması için standart bir arayüz sunar. Her entegrasyon için özel kod yazmak yerine MCP sunucuları tanımlarsınız:</p>
<ul>
<li><strong>Veritabanı MCP:</strong> PostgreSQL, MySQL sorguları</li>
<li><strong>CRM MCP:</strong> Müşteri kaydı okuma/yazma</li>
<li><strong>Dosya MCP:</strong> Kurumsal doküman erişimi</li>
<li><strong>API MCP:</strong> Logo, Netsis, özel REST servisleri</li>
</ul>
<h2>Neden MCP Sunucuya İhtiyacınız Var?</h2>
<p>Chatbot veya LLM entegrasyonu tek başına yeterli değildir. Gerçek iş değeri için modelin <strong>aksiyon alması</strong> gerekir:</p>
<ul>
<li>Sipariş oluşturma, stok sorgulama</li>
<li>Fatura ve belge işleme</li>
<li>Çalışan self-servis (izin, masraf, envanter)</li>
<li>İç bilgi bankasından anlık rapor</li>
</ul>
<p>Detay: <a href="/blog/ankara-ai-agents-gelistirme-2026">AI Agents rehberi</a> · <a href="/blog/llm-gpt-entegrasyonu-rehberi">LLM entegrasyonu</a></p>
<h2>Ankara'da MCP Sunucu Geliştirme Maliyeti (2026)</h2>
<table class="price-table"><thead><tr><th>Kapsam</th><th>Maliyet</th><th>Süre</th></tr></thead><tbody>
<tr><td>Tek araç MCP sunucusu</td><td>40.000 – 80.000 TL</td><td>2–4 hafta</td></tr>
<tr><td>Çoklu MCP (CRM + DB + API)</td><td>100.000 – 180.000 TL</td><td>6–10 hafta</td></tr>
<tr><td>On-premise kurumsal MCP platformu</td><td>180.000 – 350.000 TL+</td><td>2–4 ay</td></tr>
</tbody></table>
<h2>KVKK ve Güvenlik</h2>
<p>Kurumsal MCP sunucularında rol bazlı erişim (RBAC), audit log, veri maskeleme ve on-premise dağıtım kritiktir. <a href="/ankara-yapay-zeka-cozumleri">Ozturksoft</a> tüm MCP projelerinde KVKK uyumlu mimari uygular.</p>
<h2>Sık Sorulan Sorular</h2>
<h3>MCP ile API entegrasyonu arasındaki fark?</h3>
<p>MCP, LLM-araç iletişimini standartlaştırır; farklı modeller ve client'lar aynı MCP sunucusunu kullanabilir.</p>
<h3>Hangi LLM'ler MCP destekler?</h3>
<p>Claude, OpenAI ekosistemi ve LangChain tabanlı agent'lar MCP ile çalışabilir.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraMcp.title">MCP Sunucu Projenizi Konuşalım</h3><p data-i18n="blog.cta.ankaraMcp.desc">LLM'lerinizi CRM, veritabanı ve iş araçlarınıza güvenle bağlayalım.</p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraMcp.btn">Ücretsiz Teklif Al <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
    bodyEn: `<p><strong>MCP (Model Context Protocol)</strong> is one of the key enterprise AI infrastructure trends of 2025–2026. It lets you connect LLMs to databases, CRM, file systems, and custom APIs in a <strong>secure, standardized</strong> way.</p>
<p>This guide explains MCP server development for organizations in <strong>Ankara</strong>: architecture, costs, and use cases.</p>
<div class="highlight-box"><p>⚡ <strong>In this article:</strong> What MCP is, why it matters, enterprise use in Ankara, pricing, and KVKK-compliant deployment.</p></div>
<h2>What Is MCP?</h2>
<p>MCP provides a standard interface for AI apps to connect to external resources — databases, CRM, files, and APIs — without bespoke glue code for every integration.</p>
<h2>Why You Need MCP Servers</h2>
<p>LLMs create real business value when they <strong>take action</strong>: create orders, query stock, process documents, and generate reports from internal data.</p>
<h2>Development Costs (Ankara, 2026)</h2>
<table class="price-table"><thead><tr><th>Scope</th><th>Cost</th><th>Timeline</th></tr></thead><tbody>
<tr><td>Single-tool MCP server</td><td>40,000 – 80,000 TRY</td><td>2–4 weeks</td></tr>
<tr><td>Multi MCP (CRM + DB + API)</td><td>100,000 – 180,000 TRY</td><td>6–10 weeks</td></tr>
<tr><td>On-premise MCP platform</td><td>180,000 – 350,000+ TRY</td><td>2–4 months</td></tr>
</tbody></table>
<p>Related: <a href="/blog/ankara-ai-agents-gelistirme-2026">AI Agents guide</a> · <a href="/blog/llm-gpt-entegrasyonu-rehberi">LLM integration</a></p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraMcp.title">Let's Discuss Your MCP Server Project</h3><p data-i18n="blog.cta.ankaraMcp.desc">Securely connect your LLMs to CRM, databases, and business tools.</p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraMcp.btn">Get a Free Quote <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
  },
  {
    slug: 'ankara-laravel-yazilim-gelistirme-2026',
    articleKey: 'ankaraLaravel',
    filePrefix: 'ankara-laravel',
    tag: '🐘 Laravel',
    section: 'Yazılım',
    date: '9 Temmuz 2026',
    readMins: '9',
    published: '2026-07-09T12:00:00+03:00',
    title: "Ankara'da Laravel Yazılım Geliştirme: API, Panel ve Kurumsal Sistemler [2026]",
    desc: "Ankara'da Laravel ile özel yazılım, REST API, yönetim paneli ve kurumsal web uygulaması geliştirme. Maliyet, süre ve teknoloji rehberi.",
    keywords: 'ankara laravel yazılım, laravel geliştirme ankara, php laravel ankara, laravel api geliştirme, kurumsal laravel türkiye',
    ogTitle: "Ankara Laravel Yazılım Geliştirme [2026]",
    twitterDesc: 'Laravel API, admin panel, SaaS ve kurumsal backend maliyet rehberi — Ankara.',
    breadcrumb: 'Ankara Laravel Yazılım 2026',
    ctaKey: 'ankaraLaravel',
    faq: [
      { q: "Ankara'da Laravel projesi ne kadar tutar?", a: 'Temel REST API ve admin panel 50.000–100.000 TL, kurumsal SaaS veya ERP entegre Laravel sistemi 120.000–300.000 TL aralığındadır.' },
      { q: 'Laravel mi Node.js mi?', a: 'Hızlı CRUD, admin panel ve PHP ekosistemi için Laravel idealdir. Gerçek zamanlı ve mikroservis ağırlıklı projelerde Node.js veya hibrit mimari tercih edilebilir.' },
      { q: 'Laravel ile SaaS yapılabilir mi?', a: 'Evet. Laravel, çok kiracılı (multi-tenant) SaaS, abonelik faturalandırma ve API-first ürünler için yaygın kullanılır.' },
    ],
    bodyTr: `<p><strong>Laravel</strong>, kurumsal web uygulamaları, REST API'ler, yönetim panelleri ve SaaS ürünleri için Türkiye'nin en çok tercih edilen PHP framework'lerinden biri. <strong>Ankara'da Laravel yazılım geliştirme</strong> arayan işletmeler için maliyet, süre ve mimari kararları bu rehberde.</p>
<div class="highlight-box"><p>⚡ <strong>Bu yazıda:</strong> Laravel ne zaman tercih edilir, Ankara piyasası fiyatları, API/panel/SaaS örnekleri ve doğru firma seçimi.</p></div>
<h2>Laravel ile Neler Geliştirilir?</h2>
<ul>
<li><strong>Kurumsal web uygulamaları</strong> — iç süreç, portal, B2B</li>
<li><strong>REST / GraphQL API</strong> — mobil ve frontend için backend</li>
<li><strong>Yönetim paneli</strong> — Filament, Nova veya özel admin</li>
<li><strong>SaaS ürünleri</strong> — abonelik, çok kiracılı mimari</li>
<li><strong>E-ticaret backend</strong> — ödeme, stok, kargo entegrasyonu</li>
</ul>
<h2>Ankara'da Laravel Proje Maliyeti (2026)</h2>
<table class="price-table"><thead><tr><th>Proje Türü</th><th>Maliyet</th><th>Süre</th></tr></thead><tbody>
<tr><td>API + basit admin panel</td><td>50.000 – 100.000 TL</td><td>4–8 hafta</td></tr>
<tr><td>Kurumsal web uygulaması</td><td>100.000 – 200.000 TL</td><td>8–14 hafta</td></tr>
<tr><td>SaaS / ERP entegre sistem</td><td>200.000 – 400.000+ TL</td><td>3–6 ay</td></tr>
</tbody></table>
<h2>Laravel vs Diğer Teknolojiler</h2>
<p><strong>Laravel</strong> hızlı geliştirme, güçlü ORM (Eloquent), hazır auth ve geniş paket ekosistemi sunar. React/Next.js frontend + Laravel API hibriti Ankara'da sık görülür.</p>
<p>İlgili: <a href="/blog/ozel-yazilim-gelistirme-nedir-rehberi">özel yazılım rehberi</a> · <a href="/ankara-yazilim-sirketi">Ankara yazılım şirketi</a> · <a href="/hizmetler">hizmetlerimiz</a></p>
<h2>Proje Süreci</h2>
<ol>
<li>Keşif ve gereksinim analizi</li>
<li>Veritabanı ve API tasarımı</li>
<li>Sprint bazlı geliştirme + QA</li>
<li>Canlıya alma ve bakım SLA</li>
</ol>
<p><a href="/ankara-yazilim-sirketi">Ozturksoft</a> Laravel, React ve TypeScript ile Ankara merkezli <strong>özel yazılım ve SaaS</strong> projeleri geliştirir.</p>
<h2>Sık Sorulan Sorular</h2>
<h3>Ankara'da Laravel projesi ne kadar tutar?</h3>
<p>API + panel için <strong>50.000–100.000 TL</strong>, kurumsal SaaS için <strong>200.000–400.000+ TL</strong> planlayın.</p>
<h3>Mevcut sistemime entegre olur mu?</h3>
<p>Evet. Logo, Netsis, SAP ve özel sistemlere REST API ile entegrasyon yapılabilir.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraLaravel.title">Laravel Projeniz İçin Teklif Alın</h3><p data-i18n="blog.cta.ankaraLaravel.desc">API, panel veya kurumsal Laravel sistemi — ücretsiz keşif görüşmesi.</p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraLaravel.btn">Ücretsiz Teklif Al <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
    bodyEn: `<p><strong>Laravel</strong> is one of Turkey's most popular PHP frameworks for enterprise web apps, REST APIs, admin panels, and SaaS products. This guide covers <strong>Laravel software development in Ankara</strong>: costs, timelines, and architecture.</p>
<div class="highlight-box"><p>⚡ <strong>In this article:</strong> When to choose Laravel, Ankara market pricing, API/panel/SaaS examples, and vendor selection.</p></div>
<h2>What Can You Build with Laravel?</h2>
<ul><li>Corporate web applications and B2B portals</li><li>REST / GraphQL APIs for mobile and SPA frontends</li><li>Admin panels (Filament, Nova, or custom)</li><li>Multi-tenant SaaS with subscriptions</li><li>E-commerce backends with payment and logistics</li></ul>
<h2>Project Costs in Ankara (2026)</h2>
<table class="price-table"><thead><tr><th>Project</th><th>Cost</th><th>Timeline</th></tr></thead><tbody>
<tr><td>API + simple admin</td><td>50,000 – 100,000 TRY</td><td>4–8 weeks</td></tr>
<tr><td>Enterprise web app</td><td>100,000 – 200,000 TRY</td><td>8–14 weeks</td></tr>
<tr><td>SaaS / ERP-integrated system</td><td>200,000 – 400,000+ TRY</td><td>3–6 months</td></tr>
</tbody></table>
<p>Related: <a href="/blog/ozel-yazilim-gelistirme-nedir-rehberi">custom software guide</a> · <a href="/ankara-yazilim-sirketi">Ankara software company</a></p>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraLaravel.title">Get a Quote for Your Laravel Project</h3><p data-i18n="blog.cta.ankaraLaravel.desc">API, admin panel, or enterprise Laravel system — free discovery call.</p><a href="/iletisim" class="btn btn-primary" style="font-size:1.05rem;padding:16px 36px" data-i18n="blog.cta.ankaraLaravel.btn">Free Quote <i class="fas fa-arrow-right" style="margin-left:8px"></i></a></div>`,
  },
  ...NEW_POSTS.map((p) => ({ ...p, bodyEn: newLocaleExtras[p.filePrefix].en })),
];

function faqSchema(faq) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }, null, 2);
}

function buildPage(post) {
  const hreflang = buildHreflangTags(post.slug, ['en', 'de', 'fr', 'ar', 'ru']);
  let html = template;

  html = html.replace(/ankara-chatbot-gelistirme-2026/g, post.slug);
  html = html.replace(/data-article="chatbot"/, `data-article="${post.articleKey}"`);
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="https://ozturksoft.net/blog/${post.slug}" />`
  );
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>\n?/g, '');
  html = html.replace(
    /(<link rel="canonical" href="[^"]+" \/>)/,
    `$1\n${hreflang}`
  );

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${post.title} | Ozturksoft</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${post.desc}">`
  );
  html = html.replace(
    /<meta name="keywords" content="[^"]*">/,
    `<meta name="keywords" content="${post.keywords}">`
  );
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${post.ogTitle}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${post.desc}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${post.ogTitle}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${post.twitterDesc}">`);
  html = html.replace(/"article:section" content="[^"]*"/, `"article:section" content="${post.section}"`);
  html = html.replace(/2026-06-14T10:00:00\+03:00/g, post.published);
  html = html.replace(/"headline": "[^"]*"/, `"headline": "${post.title.replace(/"/g, '\\"')}"`);
  html = html.replace(/"description": "[^"]*"/, `"description": "${post.desc.replace(/"/g, '\\"')}"`, 1);
  html = html.replace(
    /"keywords": \[[^\]]*\]/,
    `"keywords": ${JSON.stringify(post.keywords.split(', ').map((k) => k.trim()))}`
  );

  html = html.replace(
    /<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "FAQPage"[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n  ${faqSchema(post.faq)}\n  </script>`
  );

  html = html.replace(
    /<span>Ankara'da Chatbot Geliştirme 2026<\/span>/,
    `<span>${post.breadcrumb}</span>`
  );
  html = html.replace(/<span class="article-tag">🤖 Yapay Zeka<\/span>/, `<span class="article-tag">${post.tag}</span>`);
  html = html.replace(
    /<h1>Ankara'da Chatbot Yaptırmak:[\s\S]*?<\/h1>/,
    `<h1>${post.title}</h1>`
  );
  html = html.replace(/14 Haziran 2026/g, post.date);
  html = html.replace(/9 dk okuma/g, `${post.readMins} dk okuma`);
  html = html.replace(
    /(<article class="article-body">)[\s\S]*?(<\/article>)/,
    `$1\n\n${post.bodyTr}\n\n$2`
  );

  return html;
}

const LOCALES = ['en', 'de', 'fr', 'ar', 'ru'];

// Register locale bodies for new posts
for (const post of NEW_POSTS) {
  const extras = newLocaleExtras[post.filePrefix];
  LOCALE_BODIES[post.filePrefix] = { en: extras.en, de: extras.de, fr: extras.fr, ar: extras.ar, ru: extras.ru };
}

for (const post of POSTS) {
  const out = buildPage(post);
  writeFileSync(resolve(blogDir, `${post.slug}.html`), out);

  const bodies = LOCALE_BODIES[post.filePrefix];
  if (bodies) {
    for (const lang of LOCALES) {
      const body = bodies[lang] || post.bodyEn;
      if (body) writeFileSync(resolve(articlesDir, `${post.filePrefix}-${lang}.html`), body.trim() + '\n');
    }
  } else if (post.bodyEn) {
    writeFileSync(resolve(articlesDir, `${post.filePrefix}-en.html`), post.bodyEn.trim() + '\n');
  }
  console.log(`✓ blog/${post.slug}.html + articles/${post.filePrefix}-{en,de,fr,ar,ru}.html`);
}

console.log(`Done: ${POSTS.length} niche Ankara blog posts.`);
