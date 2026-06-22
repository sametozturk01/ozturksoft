import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const articlesDir = resolve(__dirname, '../src/i18n/articles');
mkdirSync(articlesDir, { recursive: true });

const langs = ['en', 'de', 'fr', 'ar', 'ru'];

const articles = {
  ankaraSecim: {
    file: 'ankara-secim',
    cta: 'ankaraSecim',
    bodies: {
      en: `<p>Choosing the right software partner in Ankara directly determines project success. This guide covers quote comparison, red flags, KVKK compliance and AI experience.</p>
<div class="highlight-box"><p>⚡ Practical checklist for finding an <strong>Ankara software company</strong>.</p></div>
<h2>Fair Quote Comparison</h2><p>Request scope document, tech stack, QA, maintenance and source code transfer from every vendor.</p>
<h2>Red Flags</h2><ul><li>Vague scope without written deliverables</li><li>No live references</li><li>Price far below market</li><li>Starting without contract</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraSecim.title">Need Help Choosing the Right Partner?</h3><p data-i18n="blog.cta.ankaraSecim.desc">Free consultation on scope, budget and technology.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.ankaraSecim.btn">Free Consultation</a></div>`,
      de: `<p>Die Wahl des richtigen Softwarepartners in Ankara bestimmt den Projekterfolg. Dieser Leitfaden behandelt Angebotsvergleich, Warnsignale, KVKK und KI-Erfahrung.</p>
<div class="highlight-box"><p>⚡ Praktische Checkliste für eine <strong>Softwarefirma in Ankara</strong>.</p></div>
<h2>Fairer Angebotsvergleich</h2><p>Fordern Sie Leistungsumfang, Tech-Stack, QA, Wartung und Quellcode-Übergabe an.</p>
<h2>Warnsignale</h2><ul><li>Unklarer Umfang ohne Dokumentation</li><li>Keine Referenzen</li><li>Extrem niedriger Preis</li><li>Start ohne Vertrag</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraSecim.title">Brauchen Sie Hilfe bei der Partnerwahl?</h3><p data-i18n="blog.cta.ankaraSecim.desc">Kostenlose Beratung zu Umfang und Budget.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.ankaraSecim.btn">Kostenlose Beratung</a></div>`,
      fr: `<p>Choisir le bon partenaire logiciel à Ankara détermine la réussite du projet. Guide : comparaison des devis, signaux d'alerte, KVKK et expérience IA.</p>
<div class="highlight-box"><p>⚡ Liste de contrôle pour trouver une <strong>société logicielle à Ankara</strong>.</p></div>
<h2>Comparer les devis équitablement</h2><p>Demandez le périmètre, la stack technique, les tests, la maintenance et le transfert du code source.</p>
<h2>Signaux d'alerte</h2><ul><li>Périmètre flou</li><li>Aucune référence</li><li>Prix anormalement bas</li><li>Démarrage sans contrat</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraSecim.title">Besoin d'aide pour choisir ?</h3><p data-i18n="blog.cta.ankaraSecim.desc">Consultation gratuite sur le périmètre et le budget.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.ankaraSecim.btn">Consultation gratuite</a></div>`,
      ar: `<p>اختيار شريك البرمجيات المناسب في أنقرة يحدد نجاح المشروع. يغطي هذا الدليل مقارنة العروض والإشارات التحذيرية وKVKK وخبرة الذكاء الاصطناعي.</p>
<div class="highlight-box"><p>⚡ قائمة عملية لإيجاد <strong>شركة برمجيات في أنقرة</strong>.</p></div>
<h2>مقارنة عادلة للعروض</h2><p>اطلب وثيقة النطاق والتقنيات والاختبار والصيانة ونقل الكود المصدري.</p>
<h2>إشارات تحذيرية</h2><ul><li>نطاق غير واضح</li><li>لا توجد مراجع</li><li>سعر منخفض جداً</li><li>البدء بدون عقد</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraSecim.title">تحتاج مساعدة في الاختيار؟</h3><p data-i18n="blog.cta.ankaraSecim.desc">استشارة مجانية حول النطاق والميزانية.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.ankaraSecim.btn">استشارة مجانية</a></div>`,
      ru: `<p>Выбор правильного IT-партнёра в Анкаре определяет успех проекта. Руководство: сравнение предложений, красные флаги, KVKK и опыт в ИИ.</p>
<div class="highlight-box"><p>⚡ Практический чеклист для выбора <strong>IT-компании в Анкаре</strong>.</p></div>
<h2>Честное сравнение предложений</h2><p>Запросите объём работ, стек, тестирование, поддержку и передачу исходного кода.</p>
<h2>Красные флаги</h2><ul><li>Размытый объём работ</li><li>Нет референсов</li><li>Слишком низкая цена</li><li>Старт без договора</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.ankaraSecim.title">Нужна помощь с выбором?</h3><p data-i18n="blog.cta.ankaraSecim.desc">Бесплатная консультация по объёму и бюджету.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.ankaraSecim.btn">Бесплатная консультация</a></div>`,
    },
  },
  eticaret: {
    file: 'eticaret',
    cta: 'eticaret',
    bodies: {
      en: `<p><strong>Building an e-commerce website</strong> in Turkey in 2026 costs <strong>30,000–65,000 TL</strong> for a small store and <strong>65,000–120,000 TL</strong> for mid-size projects.</p>
<div class="highlight-box"><p>⚡ WooCommerce vs custom software, payment/shipping APIs and maintenance.</p></div>
<h2>2026 Price Table</h2>
<table class="price-table"><thead><tr><th>Type</th><th>Price</th></tr></thead><tbody>
<tr><td>WooCommerce store</td><td>25,000 – 45,000 TL</td></tr>
<tr><td>Custom e-commerce</td><td>45,000 – 75,000 TL</td></tr>
<tr><td>ERP + shipping</td><td>75,000 – 120,000 TL</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.eticaret.title">Get a Quote for Your E-Commerce Project</h3><p data-i18n="blog.cta.eticaret.desc">Custom proposal for your products and integrations.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.eticaret.btn">Get a Free Quote</a></div>`,
      de: `<p>Ein <strong>E-Commerce-Shop</strong> in der Türkei 2026 kostet <strong>30.000–65.000 TL</strong> (klein) bzw. <strong>65.000–120.000 TL</strong> (mittel).</p>
<div class="highlight-box"><p>⚡ WooCommerce vs Individualsoftware, Zahlungs-/Versand-APIs.</p></div>
<h2>Preistabelle 2026</h2>
<table class="price-table"><thead><tr><th>Typ</th><th>Preis</th></tr></thead><tbody>
<tr><td>WooCommerce</td><td>25.000 – 45.000 TL</td></tr>
<tr><td>Individueller Shop</td><td>45.000 – 75.000 TL</td></tr>
<tr><td>ERP + Versand</td><td>75.000 – 120.000 TL</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.eticaret.title">E-Commerce-Angebot anfordern</h3><p data-i18n="blog.cta.eticaret.desc">Individuelles Angebot für Produkte und Integrationen.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.eticaret.btn">Kostenloses Angebot</a></div>`,
      fr: `<p>Créer un <strong>site e-commerce</strong> en Turquie en 2026 coûte <strong>30 000–65 000 TL</strong> (petit) et <strong>65 000–120 000 TL</strong> (moyen).</p>
<div class="highlight-box"><p>⚡ WooCommerce vs logiciel sur mesure, paiement et livraison.</p></div>
<h2>Grille tarifaire 2026</h2>
<table class="price-table"><thead><tr><th>Type</th><th>Prix</th></tr></thead><tbody>
<tr><td>WooCommerce</td><td>25 000 – 45 000 TL</td></tr>
<tr><td>E-commerce sur mesure</td><td>45 000 – 75 000 TL</td></tr>
<tr><td>ERP + livraison</td><td>75 000 – 120 000 TL</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.eticaret.title">Devis pour votre e-commerce</h3><p data-i18n="blog.cta.eticaret.desc">Proposition sur mesure selon vos produits.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.eticaret.btn">Devis gratuit</a></div>`,
      ar: `<p>تكلفة <strong>متجر إلكتروني</strong> في تركيا 2026: <strong>30.000–65.000 ليرة</strong> للمتاجر الصغيرة و<strong>65.000–120.000 ليرة</strong> للمتوسطة.</p>
<div class="highlight-box"><p>⚡ WooCommerce مقابل برمجيات مخصصة وتكامل الدفع والشحن.</p></div>
<h2>جدول الأسعار 2026</h2>
<table class="price-table"><thead><tr><th>النوع</th><th>السعر</th></tr></thead><tbody>
<tr><td>WooCommerce</td><td>25.000 – 45.000 ليرة</td></tr>
<tr><td>متجر مخصص</td><td>45.000 – 75.000 ليرة</td></tr>
<tr><td>ERP + شحن</td><td>75.000 – 120.000 ليرة</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.eticaret.title">احصل على عرض للمتجر الإلكتروني</h3><p data-i18n="blog.cta.eticaret.desc">عرض مخصص حسب منتجاتك وتكاملاتك.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.eticaret.btn">عرض مجاني</a></div>`,
      ru: `<p><strong>Интернет-магазин</strong> в Турции в 2026: <strong>30 000–65 000 TL</strong> (малый) и <strong>65 000–120 000 TL</strong> (средний).</p>
<div class="highlight-box"><p>⚡ WooCommerce vs индивидуальная разработка, оплата и доставка.</p></div>
<h2>Таблица цен 2026</h2>
<table class="price-table"><thead><tr><th>Тип</th><th>Цена</th></tr></thead><tbody>
<tr><td>WooCommerce</td><td>25 000 – 45 000 TL</td></tr>
<tr><td>Индивидуальный магазин</td><td>45 000 – 75 000 TL</td></tr>
<tr><td>ERP + доставка</td><td>75 000 – 120 000 TL</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.eticaret.title">Запросить предложение по e-commerce</h3><p data-i18n="blog.cta.eticaret.desc">Индивидуальное предложение под ваш ассортимент.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.eticaret.btn">Бесплатное предложение</a></div>`,
    },
  },
  whatsapp: {
    file: 'whatsapp',
    cta: 'whatsapp',
    bodies: {
      en: `<p>A <strong>WhatsApp chatbot</strong> automates orders, appointments and FAQs 24/7 via the <strong>WhatsApp Business API</strong>.</p>
<div class="highlight-box"><p>⚡ Top business search: WhatsApp chatbot integration for Turkish companies.</p></div>
<h2>2026 Costs</h2>
<table class="price-table"><thead><tr><th>Solution</th><th>Cost</th></tr></thead><tbody>
<tr><td>Basic FAQ bot</td><td>35,000 – 55,000 TL</td></tr>
<tr><td>GPT assistant</td><td>60,000 – 100,000 TL</td></tr>
<tr><td>CRM integration</td><td>90,000 – 150,000 TL</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.whatsapp.title">Let's Plan Your WhatsApp Chatbot</h3><p data-i18n="blog.cta.whatsapp.desc">API setup, GPT and CRM included.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.whatsapp.btn">Get a Free Quote</a></div>`,
      de: `<p>Ein <strong>WhatsApp-Chatbot</strong> automatisiert Bestellungen und FAQs über die <strong>WhatsApp Business API</strong>.</p>
<div class="highlight-box"><p>⚡ Beliebte Unternehmenssuche: WhatsApp-Chatbot-Integration.</p></div>
<h2>Kosten 2026</h2>
<table class="price-table"><thead><tr><th>Lösung</th><th>Kosten</th></tr></thead><tbody>
<tr><td>FAQ-Bot</td><td>35.000 – 55.000 TL</td></tr>
<tr><td>GPT-Assistent</td><td>60.000 – 100.000 TL</td></tr>
<tr><td>CRM-Integration</td><td>90.000 – 150.000 TL</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.whatsapp.title">WhatsApp-Chatbot planen</h3><p data-i18n="blog.cta.whatsapp.desc">API, GPT und CRM inklusive.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.whatsapp.btn">Kostenloses Angebot</a></div>`,
      fr: `<p>Un <strong>chatbot WhatsApp</strong> automatise commandes et FAQ via l'<strong>API WhatsApp Business</strong>.</p>
<div class="highlight-box"><p>⚡ Recherche B2B majeure : intégration chatbot WhatsApp.</p></div>
<h2>Coûts 2026</h2>
<table class="price-table"><thead><tr><th>Solution</th><th>Coût</th></tr></thead><tbody>
<tr><td>Bot FAQ</td><td>35 000 – 55 000 TL</td></tr>
<tr><td>Assistant GPT</td><td>60 000 – 100 000 TL</td></tr>
<tr><td>Intégration CRM</td><td>90 000 – 150 000 TL</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.whatsapp.title">Planifions votre chatbot WhatsApp</h3><p data-i18n="blog.cta.whatsapp.desc">API, GPT et CRM inclus.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.whatsapp.btn">Devis gratuit</a></div>`,
      ar: `<p><strong>روبوت واتساب</strong> يؤتمت الطلبات والأسئلة عبر <strong>WhatsApp Business API</strong>.</p>
<div class="highlight-box"><p>⚡ من أكثر عمليات البحث: تكامل روبوت واتساب للشركات.</p></div>
<h2>التكاليف 2026</h2>
<table class="price-table"><thead><tr><th>الحل</th><th>التكلفة</th></tr></thead><tbody>
<tr><td>بوت أسئلة شائعة</td><td>35.000 – 55.000 ليرة</td></tr>
<tr><td>مساعد GPT</td><td>60.000 – 100.000 ليرة</td></tr>
<tr><td>تكامل CRM</td><td>90.000 – 150.000 ليرة</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.whatsapp.title">لنخطط لروبوت واتساب</h3><p data-i18n="blog.cta.whatsapp.desc">إعداد API وGPT وCRM.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.whatsapp.btn">عرض مجاني</a></div>`,
      ru: `<p><strong>WhatsApp-чатбот</strong> автоматизирует заказы и FAQ через <strong>WhatsApp Business API</strong>.</p>
<div class="highlight-box"><p>⚡ Популярный B2B-запрос: интеграция WhatsApp-чатбота.</p></div>
<h2>Стоимость 2026</h2>
<table class="price-table"><thead><tr><th>Решение</th><th>Цена</th></tr></thead><tbody>
<tr><td>FAQ-бот</td><td>35 000 – 55 000 TL</td></tr>
<tr><td>GPT-ассистент</td><td>60 000 – 100 000 TL</td></tr>
<tr><td>Интеграция CRM</td><td>90 000 – 150 000 TL</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.whatsapp.title">Спланируем WhatsApp-чатбот</h3><p data-i18n="blog.cta.whatsapp.desc">API, GPT и CRM включены.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.whatsapp.btn">Бесплатное предложение</a></div>`,
    },
  },
  ozelYazilim: {
    file: 'ozel-yazilim',
    cta: 'ozelYazilim',
    bodies: {
      en: `<p><strong>Custom software development</strong> builds solutions tailored to your processes with source code transferred to you.</p>
<div class="highlight-box"><p>⚡ When off-the-shelf SaaS doesn't fit — integration, scale and competitive edge.</p></div>
<h2>Custom vs SaaS</h2><p>SaaS is fast to start; custom wins for unique workflows, ERP links and KVKK/on-premise needs.</p>
<h2>2026 Cost Ranges</h2><ul><li>SMB web app: 80,000 – 150,000 TL</li><li>ERP module: 150,000 – 300,000 TL</li><li>AI-powered system: 200,000 – 500,000+ TL</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.ozelYazilim.title">Let's Discuss Your Custom Software Project</h3><p data-i18n="blog.cta.ozelYazilim.desc">Free discovery from analysis to architecture.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.ozelYazilim.btn">Free Consultation</a></div>`,
      de: `<p><strong>Individuelle Softwareentwicklung</strong> liefert maßgeschneiderte Lösungen mit Quellcode-Übergabe.</p>
<div class="highlight-box"><p>⚡ Wenn Standard-SaaS nicht passt — Integration und Skalierung.</p></div>
<h2>Individuell vs SaaS</h2><p>SaaS startet schnell; Individualsoftware bei ERP-Anbindung und KVKK.</p>
<h2>Kosten 2026</h2><ul><li>KMU-Web-App: 80.000 – 150.000 TL</li><li>ERP-Modul: 150.000 – 300.000 TL</li><li>KI-System: 200.000 – 500.000+ TL</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.ozelYazilim.title">Individuelles Softwareprojekt besprechen</h3><p data-i18n="blog.cta.ozelYazilim.desc">Kostenlose Analyse und Architektur.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.ozelYazilim.btn">Kostenlose Beratung</a></div>`,
      fr: `<p>Le <strong>développement logiciel sur mesure</strong> crée des solutions adaptées avec transfert du code source.</p>
<div class="highlight-box"><p>⚡ Quand le SaaS standard ne suffit pas.</p></div>
<h2>Sur mesure vs SaaS</h2><p>Le SaaS démarre vite ; le sur mesure pour ERP et KVKK.</p>
<h2>Coûts 2026</h2><ul><li>App PME : 80 000 – 150 000 TL</li><li>Module ERP : 150 000 – 300 000 TL</li><li>Système IA : 200 000 – 500 000+ TL</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.ozelYazilim.title">Parlons de votre logiciel sur mesure</h3><p data-i18n="blog.cta.ozelYazilim.desc">Découverte gratuite de l'analyse à l'architecture.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.ozelYazilim.btn">Consultation gratuite</a></div>`,
      ar: `<p><strong>تطوير البرمجيات المخصصة</strong> يبني حلولاً مصممة لعملياتك مع نقل الكود المصدري.</p>
<div class="highlight-box"><p>⚡ عندما لا يناسبك البرنامج الجاهز.</p></div>
<h2>مخصص مقابل SaaS</h2><p>SaaS سريع البدء؛ المخصص لربط ERP وKVKK.</p>
<h2>التكاليف 2026</h2><ul><li>تطبيق ويب للشركات الصغيرة: 80.000 – 150.000 ليرة</li><li>وحدة ERP: 150.000 – 300.000 ليرة</li><li>نظام ذكاء اصطناعي: 200.000 – 500.000+ ليرة</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.ozelYazilim.title">لنناقش مشروعك المخصص</h3><p data-i18n="blog.cta.ozelYazilim.desc">اكتشاف مجاني من التحليل إلى الهندسة.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.ozelYazilim.btn">استشارة مجانية</a></div>`,
      ru: `<p><strong>Индивидуальная разработка ПО</strong> создаёт решения под ваши процессы с передачей исходного кода.</p>
<div class="highlight-box"><p>⚡ Когда готовый SaaS не подходит.</p></div>
<h2>Индивидуальное vs SaaS</h2><p>SaaS быстрее стартует; индивидуальное — для ERP и KVKK.</p>
<h2>Стоимость 2026</h2><ul><li>Веб-приложение МСБ: 80 000 – 150 000 TL</li><li>Модуль ERP: 150 000 – 300 000 TL</li><li>ИИ-система: 200 000 – 500 000+ TL</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.ozelYazilim.title">Обсудим ваш проект ПО</h3><p data-i18n="blog.cta.ozelYazilim.desc">Бесплатный анализ и архитектура.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.ozelYazilim.btn">Бесплатная консультация</a></div>`,
    },
  },
  mobilMaliyet: {
    file: 'mobil-maliyet',
    cta: 'mobilMaliyet',
    bodies: {
      en: `<p><strong>Mobile app development cost</strong> in Turkey 2026: simple app <strong>80,000–150,000 TL</strong>, mid-complexity <strong>150,000–300,000 TL</strong>, enterprise <strong>300,000+ TL</strong>.</p>
<div class="highlight-box"><p>⚡ Native vs Flutter vs React Native — budget and timeline comparison.</p></div>
<h2>Price by App Type</h2>
<table class="price-table"><thead><tr><th>Type</th><th>Cost</th><th>Timeline</th></tr></thead><tbody>
<tr><td>MVP / single platform</td><td>80,000 – 120,000 TL</td><td>6–10 weeks</td></tr>
<tr><td>Flutter cross-platform</td><td>120,000 – 200,000 TL</td><td>8–14 weeks</td></tr>
<tr><td>Native iOS + Android</td><td>180,000 – 350,000 TL</td><td>12–20 weeks</td></tr>
</tbody></table>
<p>Technology guide: <a href="/blog/mobil-uygulama-gelistirme-rehberi-2026">mobile development guide</a>.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.mobilMaliyet.title">Get a Mobile App Quote</h3><p data-i18n="blog.cta.mobilMaliyet.desc">Flutter or native — proposal based on your features.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.mobilMaliyet.btn">Free Quote</a></div>`,
      de: `<p><strong>Mobile-App-Entwicklung</strong> 2026: einfache App <strong>80.000–150.000 TL</strong>, mittel <strong>150.000–300.000 TL</strong>.</p>
<div class="highlight-box"><p>⚡ Native vs Flutter vs React Native.</p></div>
<h2>Preise nach App-Typ</h2>
<table class="price-table"><thead><tr><th>Typ</th><th>Preis</th></tr></thead><tbody>
<tr><td>MVP</td><td>80.000 – 120.000 TL</td></tr>
<tr><td>Flutter</td><td>120.000 – 200.000 TL</td></tr>
<tr><td>Native iOS+Android</td><td>180.000 – 350.000 TL</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.mobilMaliyet.title">Mobile-App-Angebot</h3><p data-i18n="blog.cta.mobilMaliyet.desc">Flutter oder native nach Features.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.mobilMaliyet.btn">Kostenloses Angebot</a></div>`,
      fr: `<p><strong>Coût d'application mobile</strong> 2026 : simple <strong>80 000–150 000 TL</strong>, moyenne <strong>150 000–300 000 TL</strong>.</p>
<div class="highlight-box"><p>⚡ Native vs Flutter vs React Native.</p></div>
<h2>Prix par type</h2>
<table class="price-table"><thead><tr><th>Type</th><th>Prix</th></tr></thead><tbody>
<tr><td>MVP</td><td>80 000 – 120 000 TL</td></tr>
<tr><td>Flutter</td><td>120 000 – 200 000 TL</td></tr>
<tr><td>Native</td><td>180 000 – 350 000 TL</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.mobilMaliyet.title">Devis application mobile</h3><p data-i18n="blog.cta.mobilMaliyet.desc">Flutter ou native selon vos fonctionnalités.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.mobilMaliyet.btn">Devis gratuit</a></div>`,
      ar: `<p><strong>تكلفة تطبيق الجوال</strong> 2026: بسيط <strong>80.000–150.000 ليرة</strong>، متوسط <strong>150.000–300.000 ليرة</strong>.</p>
<div class="highlight-box"><p>⚡ Native مقابل Flutter مقابل React Native.</p></div>
<h2>الأسعار حسب النوع</h2>
<table class="price-table"><thead><tr><th>النوع</th><th>السعر</th></tr></thead><tbody>
<tr><td>MVP</td><td>80.000 – 120.000 ليرة</td></tr>
<tr><td>Flutter</td><td>120.000 – 200.000 ليرة</td></tr>
<tr><td>Native</td><td>180.000 – 350.000 ليرة</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.mobilMaliyet.title">عرض تطبيق جوال</h3><p data-i18n="blog.cta.mobilMaliyet.desc">Flutter أو native حسب الميزات.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.mobilMaliyet.btn">عرض مجاني</a></div>`,
      ru: `<p><strong>Стоимость мобильного приложения</strong> 2026: простое <strong>80 000–150 000 TL</strong>, среднее <strong>150 000–300 000 TL</strong>.</p>
<div class="highlight-box"><p>⚡ Native vs Flutter vs React Native.</p></div>
<h2>Цены по типу</h2>
<table class="price-table"><thead><tr><th>Тип</th><th>Цена</th></tr></thead><tbody>
<tr><td>MVP</td><td>80 000 – 120 000 TL</td></tr>
<tr><td>Flutter</td><td>120 000 – 200 000 TL</td></tr>
<tr><td>Native</td><td>180 000 – 350 000 TL</td></tr>
</tbody></table>
<div class="cta-box"><h3 data-i18n="blog.cta.mobilMaliyet.title">Предложение по мобильному приложению</h3><p data-i18n="blog.cta.mobilMaliyet.desc">Flutter или native под ваши функции.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.mobilMaliyet.btn">Бесплатное предложение</a></div>`,
    },
  },
  kurumsalWeb: {
    file: 'kurumsal-web',
    cta: 'kurumsalWeb',
    bodies: {
      en: `<p><strong>Corporate website development</strong> in 2026 costs <strong>15,000–45,000 TL</strong> for 5–10 pages and <strong>45,000–90,000 TL</strong> for multilingual or CMS-heavy sites.</p>
<div class="highlight-box"><p>⚡ What every corporate site needs: SEO, speed, KVKK, mobile-first design.</p></div>
<h2>Corporate Site Checklist</h2><ul><li>Custom UI/UX design</li><li>SEO & Core Web Vitals</li><li>CMS for blog/news</li><li>Contact forms & KVKK consent</li><li>Multi-language (optional)</li></ul>
<p>General pricing: <a href="/blog/ankara-web-sitesi-maliyeti-2026">website cost guide</a>.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.kurumsalWeb.title">Corporate Website Quote</h3><p data-i18n="blog.cta.kurumsalWeb.desc">SEO-ready corporate site tailored to your brand.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.kurumsalWeb.btn">Free Quote</a></div>`,
      de: `<p><strong>Unternehmenswebsite</strong> 2026: <strong>15.000–45.000 TL</strong> (5–10 Seiten), <strong>45.000–90.000 TL</strong> mehrsprachig.</p>
<div class="highlight-box"><p>⚡ SEO, Geschwindigkeit, KVKK, Mobile-First.</p></div>
<h2>Checkliste</h2><ul><li>Individuelles Design</li><li>SEO & Core Web Vitals</li><li>CMS</li><li>KVKK-Formulare</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.kurumsalWeb.title">Angebot Unternehmenswebsite</h3><p data-i18n="blog.cta.kurumsalWeb.desc">SEO-optimierte Website für Ihre Marke.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.kurumsalWeb.btn">Kostenloses Angebot</a></div>`,
      fr: `<p><strong>Site web corporate</strong> 2026 : <strong>15 000–45 000 TL</strong> (5–10 pages), <strong>45 000–90 000 TL</strong> multilingue.</p>
<div class="highlight-box"><p>⚡ SEO, vitesse, KVKK, mobile-first.</p></div>
<h2>Checklist</h2><ul><li>Design sur mesure</li><li>SEO & Core Web Vitals</li><li>CMS</li><li>Formulaires KVKK</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.kurumsalWeb.title">Devis site corporate</h3><p data-i18n="blog.cta.kurumsalWeb.desc">Site SEO pour votre marque.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.kurumsalWeb.btn">Devis gratuit</a></div>`,
      ar: `<p><strong>موقع شركة</strong> 2026: <strong>15.000–45.000 ليرة</strong> (5–10 صفحات)، <strong>45.000–90.000 ليرة</strong> متعدد اللغات.</p>
<div class="highlight-box"><p>⚡ SEO والسرعة وKVKK وتصميم للجوال.</p></div>
<h2>قائمة التحقق</h2><ul><li>تصميم مخصص</li><li>SEO</li><li>CMS</li><li>نماذج KVKK</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.kurumsalWeb.title">عرض موقع شركة</h3><p data-i18n="blog.cta.kurumsalWeb.desc">موقع SEO لعلامتك.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.kurumsalWeb.btn">عرض مجاني</a></div>`,
      ru: `<p><strong>Корпоративный сайт</strong> 2026: <strong>15 000–45 000 TL</strong> (5–10 страниц), <strong>45 000–90 000 TL</strong> мультиязычный.</p>
<div class="highlight-box"><p>⚡ SEO, скорость, KVKK, mobile-first.</p></div>
<h2>Чеклист</h2><ul><li>Индивидуальный дизайн</li><li>SEO</li><li>CMS</li><li>Формы KVKK</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.kurumsalWeb.title">Предложение по корпоративному сайту</h3><p data-i18n="blog.cta.kurumsalWeb.desc">SEO-сайт под ваш бренд.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.kurumsalWeb.btn">Бесплатное предложение</a></div>`,
    },
  },
  aiDanismanlik: {
    file: 'ai-danismanlik',
    cta: 'aiDanismanlik',
    bodies: {
      en: `<p><strong>AI consulting</strong> helps businesses identify high-ROI use cases: chatbots, process automation, document AI and LLM integration.</p>
<div class="highlight-box"><p>⚡ Top search: <strong>artificial intelligence consulting</strong> for Turkish businesses.</p></div>
<h2>What AI Consulting Includes</h2><ul><li>Process audit & ROI mapping</li><li>Data readiness assessment</li><li>Model selection (GPT, Claude, open-source)</li><li>KVKK-compliant architecture</li><li>PoC → production roadmap</li></ul>
<p>Related: <a href="/blog/yapay-zeka-entegrasyonu-rehberi">AI integration</a>, <a href="/blog/llm-gpt-entegrasyonu-rehberi">LLM guide</a>.</p>
<div class="cta-box"><h3 data-i18n="blog.cta.aiDanismanlik.title">Free AI Consulting Session</h3><p data-i18n="blog.cta.aiDanismanlik.desc">We map your processes and propose an AI roadmap.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.aiDanismanlik.btn">Book Free Session</a></div>`,
      de: `<p><strong>KI-Beratung</strong> identifiziert Use Cases mit hohem ROI: Chatbots, Automatisierung, Dokumenten-KI und LLM.</p>
<div class="highlight-box"><p>⚡ Beliebte Suche: <strong>KI-Beratung für Unternehmen</strong>.</p></div>
<h2>Leistungen</h2><ul><li>Prozessaudit & ROI</li><li>Datenbewertung</li><li>Modellauswahl</li><li>KVKK-Architektur</li><li>PoC-Roadmap</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.aiDanismanlik.title">Kostenlose KI-Beratung</h3><p data-i18n="blog.cta.aiDanismanlik.desc">Wir erstellen Ihre KI-Roadmap.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.aiDanismanlik.btn">Termin buchen</a></div>`,
      fr: `<p>Le <strong>conseil en IA</strong> identifie les cas d'usage à fort ROI : chatbots, automatisation, IA documentaire et LLM.</p>
<div class="highlight-box"><p>⚡ Recherche clé : <strong>conseil intelligence artificielle</strong>.</p></div>
<h2>Prestations</h2><ul><li>Audit processus & ROI</li><li>Évaluation des données</li><li>Choix du modèle</li><li>Architecture KVKK</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.aiDanismanlik.title">Consultation IA gratuite</h3><p data-i18n="blog.cta.aiDanismanlik.desc">Feuille de route IA personnalisée.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.aiDanismanlik.btn">Réserver</a></div>`,
      ar: `<p><strong>استشارات الذكاء الاصطناعي</strong> تحدد حالات الاستخدام عالية العائد: روبوتات، أتمتة، وثائق وLLM.</p>
<div class="highlight-box"><p>⚡ بحث شائع: <strong>استشارات الذكاء الاصطناعي للشركات</strong>.</p></div>
<h2>ماذا تشمل</h2><ul><li>تدقيق العمليات</li><li>جاهزية البيانات</li><li>اختيار النموذج</li><li>بنية KVKK</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.aiDanismanlik.title">استشارة ذكاء اصطناعي مجانية</h3><p data-i18n="blog.cta.aiDanismanlik.desc">خارطة طريق ذكاء اصطناعي مخصصة.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.aiDanismanlik.btn">احجز جلسة</a></div>`,
      ru: `<p><strong>ИИ-консалтинг</strong> выявляет сценарии с высоким ROI: чатботы, автоматизация, документы и LLM.</p>
<div class="highlight-box"><p>⚡ Популярный запрос: <strong>консалтинг по искусственному интеллекту</strong>.</p></div>
<h2>Что входит</h2><ul><li>Аудит процессов</li><li>Оценка данных</li><li>Выбор модели</li><li>Архитектура KVKK</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.aiDanismanlik.title">Бесплатная ИИ-консультация</h3><p data-i18n="blog.cta.aiDanismanlik.desc">Индивидуальная дорожная карта ИИ.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.aiDanismanlik.btn">Записаться</a></div>`,
    },
  },
  crmErp: {
    file: 'crm-erp',
    cta: 'crmErp',
    bodies: {
      en: `<p><strong>CRM and ERP integration</strong> connects sales, inventory, accounting and customer data into one flow — eliminating double entry and errors.</p>
<div class="highlight-box"><p>⚡ Popular systems: Logo, Netsis, Mikro, Salesforce, HubSpot + custom APIs.</p></div>
<h2>Integration Types</h2><ul><li>E-commerce ↔ ERP stock sync</li><li>CRM ↔ WhatsApp/chatbot</li><li>Custom app ↔ accounting</li><li>BI dashboards from unified data</li></ul>
<h2>2026 Cost Ranges</h2><ul><li>Single API integration: 15,000 – 35,000 TL</li><li>Multi-system middleware: 50,000 – 120,000 TL</li><li>Full custom ERP module: 150,000 – 400,000+ TL</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.crmErp.title">CRM / ERP Integration Quote</h3><p data-i18n="blog.cta.crmErp.desc">We connect your existing systems with secure APIs.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.crmErp.btn">Free Analysis</a></div>`,
      de: `<p><strong>CRM- und ERP-Integration</strong> verbindet Vertrieb, Lager, Buchhaltung und Kundendaten in einem Fluss.</p>
<div class="highlight-box"><p>⚡ Logo, Netsis, Mikro, Salesforce + individuelle APIs.</p></div>
<h2>Integrationstypen</h2><ul><li>E-Commerce ↔ ERP</li><li>CRM ↔ WhatsApp</li><li>App ↔ Buchhaltung</li></ul>
<h2>Kosten 2026</h2><ul><li>Einzelne API: 15.000 – 35.000 TL</li><li>Middleware: 50.000 – 120.000 TL</li><li>ERP-Modul: 150.000 – 400.000+ TL</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.crmErp.title">CRM/ERP-Angebot</h3><p data-i18n="blog.cta.crmErp.desc">Sichere API-Verbindung Ihrer Systeme.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.crmErp.btn">Kostenlose Analyse</a></div>`,
      fr: `<p>L'<strong>intégration CRM et ERP</strong> unifie ventes, stock, comptabilité et données clients.</p>
<div class="highlight-box"><p>⚡ Logo, Netsis, Salesforce + APIs sur mesure.</p></div>
<h2>Types d'intégration</h2><ul><li>E-commerce ↔ ERP</li><li>CRM ↔ WhatsApp</li><li>App ↔ comptabilité</li></ul>
<h2>Coûts 2026</h2><ul><li>API unique : 15 000 – 35 000 TL</li><li>Middleware : 50 000 – 120 000 TL</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.crmErp.title">Devis intégration CRM/ERP</h3><p data-i18n="blog.cta.crmErp.desc">Connexion sécurisée de vos systèmes.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.crmErp.btn">Analyse gratuite</a></div>`,
      ar: `<p><strong>تكامل CRM وERP</strong> يربط المبيعات والمخزون والمحاسبة وبيانات العملاء في تدفق واحد.</p>
<div class="highlight-box"><p>⚡ Logo وNetsis وSalesforce + واجهات مخصصة.</p></div>
<h2>أنواع التكامل</h2><ul><li>متجر ↔ ERP</li><li>CRM ↔ واتساب</li><li>تطبيق ↔ محاسبة</li></ul>
<h2>التكاليف 2026</h2><ul><li>API واحدة: 15.000 – 35.000 ليرة</li><li>وسيط: 50.000 – 120.000 ليرة</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.crmErp.title">عرض تكامل CRM/ERP</h3><p data-i18n="blog.cta.crmErp.desc">ربط آمن لأنظمتك.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.crmErp.btn">تحليل مجاني</a></div>`,
      ru: `<p><strong>Интеграция CRM и ERP</strong> объединяет продажи, склад, бухгалтерию и данные клиентов.</p>
<div class="highlight-box"><p>⚡ Logo, Netsis, Salesforce + кастомные API.</p></div>
<h2>Типы интеграции</h2><ul><li>E-commerce ↔ ERP</li><li>CRM ↔ WhatsApp</li><li>Приложение ↔ учёт</li></ul>
<h2>Стоимость 2026</h2><ul><li>Одна API: 15 000 – 35 000 TL</li><li>Middleware: 50 000 – 120 000 TL</li></ul>
<div class="cta-box"><h3 data-i18n="blog.cta.crmErp.title">Предложение по CRM/ERP</h3><p data-i18n="blog.cta.crmErp.desc">Безопасное соединение ваших систем.</p><a href="/iletisim" class="btn-primary" data-i18n="blog.cta.crmErp.btn">Бесплатный анализ</a></div>`,
    },
  },
};

// Write all translation files
for (const [key, art] of Object.entries(articles)) {
  for (const lang of langs) {
    const path = resolve(articlesDir, `${art.file}-${lang}.html`);
    writeFileSync(path, art.bodies[lang] + '\n');
  }
}

// Generate blog-main imports snippet
const allKeys = Object.keys(articles);
const importLines = [];
const varMap = {};
for (const key of allKeys) {
  const file = articles[key].file;
  for (const lang of langs) {
    const varName = `${key}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    varMap[`${key}-${lang}`] = varName;
    importLines.push(`import ${varName} from './i18n/articles/${file}-${lang}.html?raw';`);
  }
}

console.log('Generated', langs.length * allKeys.length, 'article translation files');
console.log('Article keys:', allKeys.join(', '));
