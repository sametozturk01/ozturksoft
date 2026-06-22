import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const i18nDir = resolve(__dirname, '../src/i18n');

const additions = {
  tr: {
    tags: { ecommerce: 'E-Ticaret' },
    cards: {
      mobilMaliyetCard: { title: "Mobil Uygulama Yaptırmak: Maliyet ve Fiyat Rehberi [2026]", desc: "iOS, Android ve Flutter maliyetleri. MVP bütçesi ve teknoloji karşılaştırması." },
      kurumsalWebCard: { title: "Kurumsal Web Sitesi Yaptırmak: Maliyet ve Rehber [2026]", desc: "SEO, CMS, çoklu dil ve KVKK uyumlu kurumsal site fiyatları." },
      aiDanismanlikCard: { title: "Yapay Zeka Danışmanlığı: İşletmeler İçin AI Stratejisi [2026]", desc: "ROI analizi, chatbot, otomasyon ve LLM entegrasyonu yol haritası." },
      crmErpCard: { title: "CRM ve ERP Entegrasyonu: Maliyet ve Yazılım Rehberi [2026]", desc: "Logo, Netsis, Salesforce API entegrasyonu ve maliyet analizi." },
    },
    posts: {
      mobilMaliyet: { tag: '📱 Mobil', title: "Mobil Uygulama Yaptırmak: Maliyet ve Fiyat Rehberi [2026]", breadcrumb: 'Mobil Uygulama Maliyeti' },
      kurumsalWeb: { tag: '🌐 Web Tasarım', title: "Kurumsal Web Sitesi Yaptırmak: Maliyet, Özellikler ve Rehber [2026]", breadcrumb: 'Kurumsal Web Sitesi' },
      aiDanismanlik: { tag: '🤖 Yapay Zeka', title: "Yapay Zeka Danışmanlığı: İşletmeler İçin AI Stratejisi ve Uygulama [2026]", breadcrumb: 'Yapay Zeka Danışmanlığı' },
      crmErp: { tag: '⚙️ Yazılım', title: "CRM ve ERP Entegrasyonu: Maliyet, Süreç ve Yazılım Rehberi [2026]", breadcrumb: 'CRM ERP Entegrasyonu' },
    },
    cta: {
      mobilMaliyet: { title: 'Mobil Uygulama Teklifi Alın', desc: 'Flutter veya native — özelliklerinize göre özel teklif.', btn: 'Ücretsiz Teklif Al' },
      kurumsalWeb: { title: 'Kurumsal Web Sitesi Teklifi', desc: 'Markanıza özel, SEO uyumlu kurumsal site.', btn: 'Ücretsiz Teklif Al' },
      aiDanismanlik: { title: 'Ücretsiz AI Danışmanlık Görüşmesi', desc: 'Süreçlerinizi analiz edip size özel AI yol haritası çıkarıyoruz.', btn: 'Görüşme Talep Et' },
      crmErp: { title: 'CRM / ERP Entegrasyon Teklifi', desc: "Mevcut sistemlerinizi güvenli API'lerle bağlıyoruz.", btn: 'Ücretsiz Analiz' },
    },
  },
  en: {
    tags: { ecommerce: 'E-Commerce' },
    cards: {
      mobilMaliyetCard: { title: 'Mobile App Development Cost Guide [2026]', desc: 'iOS, Android and Flutter costs. MVP budget and technology comparison.' },
      kurumsalWebCard: { title: 'Corporate Website: Cost & Guide [2026]', desc: 'SEO, CMS, multi-language and KVKK-compliant corporate site pricing.' },
      aiDanismanlikCard: { title: 'AI Consulting for Businesses [2026]', desc: 'ROI analysis, chatbot, automation and LLM integration roadmap.' },
      crmErpCard: { title: 'CRM & ERP Integration Guide [2026]', desc: 'Logo, Netsis, Salesforce API integration and cost analysis.' },
    },
    posts: {
      mobilMaliyet: { tag: '📱 Mobile', title: 'Mobile App Development Cost Guide [2026]', breadcrumb: 'Mobile App Cost' },
      kurumsalWeb: { tag: '🌐 Web Design', title: 'Corporate Website: Cost, Features & Guide [2026]', breadcrumb: 'Corporate Website' },
      aiDanismanlik: { tag: '🤖 AI', title: 'AI Consulting: Business Strategy & Implementation [2026]', breadcrumb: 'AI Consulting' },
      crmErp: { tag: '⚙️ Software', title: 'CRM & ERP Integration: Cost, Process & Guide [2026]', breadcrumb: 'CRM ERP Integration' },
    },
    cta: {
      mobilMaliyet: { title: 'Get a Mobile App Quote', desc: 'Flutter or native — proposal based on your features.', btn: 'Free Quote' },
      kurumsalWeb: { title: 'Corporate Website Quote', desc: 'SEO-ready corporate site for your brand.', btn: 'Free Quote' },
      aiDanismanlik: { title: 'Free AI Consulting Session', desc: 'We map your processes and propose an AI roadmap.', btn: 'Book Free Session' },
      crmErp: { title: 'CRM / ERP Integration Quote', desc: 'We connect your systems with secure APIs.', btn: 'Free Analysis' },
    },
  },
  de: {
    tags: { ecommerce: 'E-Commerce' },
    cards: {
      mobilMaliyetCard: { title: 'Mobile-App-Entwicklung: Kostenleitfaden [2026]', desc: 'iOS, Android und Flutter Kosten. MVP-Budget und Technologievergleich.' },
      kurumsalWebCard: { title: 'Unternehmenswebsite: Kosten & Leitfaden [2026]', desc: 'SEO, CMS, Mehrsprachigkeit und KVKK-konforme Preise.' },
      aiDanismanlikCard: { title: 'KI-Beratung für Unternehmen [2026]', desc: 'ROI-Analyse, Chatbot, Automatisierung und LLM-Roadmap.' },
      crmErpCard: { title: 'CRM & ERP Integration: Leitfaden [2026]', desc: 'Logo, Netsis, Salesforce API-Integration und Kosten.' },
    },
    posts: {
      mobilMaliyet: { tag: '📱 Mobil', title: 'Mobile-App-Entwicklung: Kostenleitfaden [2026]', breadcrumb: 'Mobile-App-Kosten' },
      kurumsalWeb: { tag: '🌐 Webdesign', title: 'Unternehmenswebsite: Kosten & Leitfaden [2026]', breadcrumb: 'Unternehmenswebsite' },
      aiDanismanlik: { tag: '🤖 KI', title: 'KI-Beratung: Strategie & Umsetzung [2026]', breadcrumb: 'KI-Beratung' },
      crmErp: { tag: '⚙️ Software', title: 'CRM & ERP Integration: Kosten & Leitfaden [2026]', breadcrumb: 'CRM ERP Integration' },
    },
    cta: {
      mobilMaliyet: { title: 'Mobile-App-Angebot', desc: 'Flutter oder native nach Ihren Features.', btn: 'Kostenloses Angebot' },
      kurumsalWeb: { title: 'Angebot Unternehmenswebsite', desc: 'SEO-optimierte Website für Ihre Marke.', btn: 'Kostenloses Angebot' },
      aiDanismanlik: { title: 'Kostenlose KI-Beratung', desc: 'Wir erstellen Ihre individuelle KI-Roadmap.', btn: 'Termin buchen' },
      crmErp: { title: 'CRM/ERP-Angebot', desc: 'Sichere API-Verbindung Ihrer Systeme.', btn: 'Kostenlose Analyse' },
    },
  },
  fr: {
    tags: { ecommerce: 'E-Commerce' },
    cards: {
      mobilMaliyetCard: { title: "Coût développement application mobile [2026]", desc: 'Coûts iOS, Android et Flutter. Budget MVP et comparaison.' },
      kurumsalWebCard: { title: 'Site web corporate : coût & guide [2026]', desc: 'SEO, CMS, multilingue et conformité KVKK.' },
      aiDanismanlikCard: { title: 'Conseil IA pour entreprises [2026]', desc: 'Analyse ROI, chatbot, automatisation et feuille de route LLM.' },
      crmErpCard: { title: 'Intégration CRM & ERP : guide [2026]', desc: 'Intégration API Logo, Netsis, Salesforce et coûts.' },
    },
    posts: {
      mobilMaliyet: { tag: '📱 Mobile', title: 'Coût application mobile [2026]', breadcrumb: 'Coût application mobile' },
      kurumsalWeb: { tag: '🌐 Web Design', title: 'Site corporate : coût & guide [2026]', breadcrumb: 'Site corporate' },
      aiDanismanlik: { tag: '🤖 IA', title: 'Conseil IA : stratégie & mise en œuvre [2026]', breadcrumb: 'Conseil IA' },
      crmErp: { tag: '⚙️ Logiciel', title: 'Intégration CRM & ERP [2026]', breadcrumb: 'Intégration CRM ERP' },
    },
    cta: {
      mobilMaliyet: { title: 'Devis application mobile', desc: 'Flutter ou native selon vos fonctionnalités.', btn: 'Devis gratuit' },
      kurumsalWeb: { title: 'Devis site corporate', desc: 'Site SEO pour votre marque.', btn: 'Devis gratuit' },
      aiDanismanlik: { title: 'Consultation IA gratuite', desc: 'Feuille de route IA personnalisée.', btn: 'Réserver' },
      crmErp: { title: 'Devis intégration CRM/ERP', desc: 'Connexion sécurisée de vos systèmes.', btn: 'Analyse gratuite' },
    },
  },
  ar: {
    tags: { ecommerce: 'تجارة إلكترونية' },
    cards: {
      mobilMaliyetCard: { title: 'تكلفة تطوير تطبيق الجوال [2026]', desc: 'تكاليف iOS وAndroid وFlutter. ميزانية MVP ومقارنة التقنيات.' },
      kurumsalWebCard: { title: 'موقع شركة: التكلفة والدليل [2026]', desc: 'SEO وCMS وتعدد اللغات وامتثال KVKK.' },
      aiDanismanlikCard: { title: 'استشارات الذكاء الاصطناعي للشركات [2026]', desc: 'تحليل العائد والروبوت والأتمتة وخارطة طريق LLM.' },
      crmErpCard: { title: 'تكامل CRM وERP: دليل [2026]', desc: 'تكامل API لـ Logo وNetsis وSalesforce والتكاليف.' },
    },
    posts: {
      mobilMaliyet: { tag: '📱 جوال', title: 'تكلفة تطبيق الجوال [2026]', breadcrumb: 'تكلفة تطبيق الجوال' },
      kurumsalWeb: { tag: '🌐 تصميم الويب', title: 'موقع شركة: التكلفة والدليل [2026]', breadcrumb: 'موقع شركة' },
      aiDanismanlik: { tag: '🤖 ذكاء اصطناعي', title: 'استشارات الذكاء الاصطناعي [2026]', breadcrumb: 'استشارات الذكاء الاصطناعي' },
      crmErp: { tag: '⚙️ برمجيات', title: 'تكامل CRM وERP [2026]', breadcrumb: 'تكامل CRM ERP' },
    },
    cta: {
      mobilMaliyet: { title: 'عرض تطبيق جوال', desc: 'Flutter أو native حسب الميزات.', btn: 'عرض مجاني' },
      kurumsalWeb: { title: 'عرض موقع شركة', desc: 'موقع SEO لعلامتك.', btn: 'عرض مجاني' },
      aiDanismanlik: { title: 'استشارة ذكاء اصطناعي مجانية', desc: 'خارطة طريق ذكاء اصطناعي مخصصة.', btn: 'احجز جلسة' },
      crmErp: { title: 'عرض تكامل CRM/ERP', desc: 'ربط آمن لأنظمتك.', btn: 'تحليل مجاني' },
    },
  },
  ru: {
    tags: { ecommerce: 'E-Commerce' },
    cards: {
      mobilMaliyetCard: { title: 'Стоимость мобильного приложения [2026]', desc: 'iOS, Android и Flutter. Бюджет MVP и сравнение технологий.' },
      kurumsalWebCard: { title: 'Корпоративный сайт: стоимость и гид [2026]', desc: 'SEO, CMS, мультиязычность и KVKK.' },
      aiDanismanlikCard: { title: 'ИИ-консалтинг для бизнеса [2026]', desc: 'ROI, чатбот, автоматизация и дорожная карта LLM.' },
      crmErpCard: { title: 'Интеграция CRM и ERP: гид [2026]', desc: 'API Logo, Netsis, Salesforce и стоимость.' },
    },
    posts: {
      mobilMaliyet: { tag: '📱 Мобильное', title: 'Стоимость мобильного приложения [2026]', breadcrumb: 'Стоимость приложения' },
      kurumsalWeb: { tag: '🌐 Веб-дизайн', title: 'Корпоративный сайт: стоимость [2026]', breadcrumb: 'Корпоративный сайт' },
      aiDanismanlik: { tag: '🤖 ИИ', title: 'ИИ-консалтинг: стратегия [2026]', breadcrumb: 'ИИ-консалтинг' },
      crmErp: { tag: '⚙️ ПО', title: 'Интеграция CRM и ERP [2026]', breadcrumb: 'Интеграция CRM ERP' },
    },
    cta: {
      mobilMaliyet: { title: 'Предложение по приложению', desc: 'Flutter или native под ваши функции.', btn: 'Бесплатное предложение' },
      kurumsalWeb: { title: 'Предложение корпоративного сайта', desc: 'SEO-сайт под ваш бренд.', btn: 'Бесплатное предложение' },
      aiDanismanlik: { title: 'Бесплатная ИИ-консультация', desc: 'Индивидуальная дорожная карта ИИ.', btn: 'Записаться' },
      crmErp: { title: 'Предложение CRM/ERP', desc: 'Безопасное соединение систем.', btn: 'Бесплатный анализ' },
    },
  },
};

// Also add missing cards for older articles in de/fr/ru/ar if needed
const backfillCards = {
  de: {
    ankaraSecimCard: { title: 'Wie wählt man eine Softwarefirma in Ankara? [2026]', desc: 'Angebotsvergleich, Warnsignale und KI-Erfahrung.' },
    eticaretCard: { title: 'E-Commerce-Shop: Kostenleitfaden [2026]', desc: 'Online-Shop-Preise und Integrationen.' },
    ozelYazilimCard: { title: 'Was ist Individualsoftware? [2026]', desc: 'SaaS vs Individualsoftware.' },
    whatsappCard: { title: 'WhatsApp-Chatbot: API & Kosten [2026]', desc: 'WhatsApp Business API und GPT.' },
  },
  fr: {
    ankaraSecimCard: { title: 'Choisir une société logicielle à Ankara [2026]', desc: 'Comparaison des devis et signaux d\'alerte.' },
    eticaretCard: { title: 'Site e-commerce : guide des coûts [2026]', desc: 'Prix et intégrations.' },
    ozelYazilimCard: { title: 'Qu\'est-ce que le logiciel sur mesure ? [2026]', desc: 'SaaS vs sur mesure.' },
    whatsappCard: { title: 'Chatbot WhatsApp : API & coûts [2026]', desc: 'API WhatsApp Business et GPT.' },
  },
  ar: {
    ankaraSecimCard: { title: 'كيف تختار شركة برمجيات في أنقرة؟ [2026]', desc: 'مقارنة العروض والإشارات التحذيرية.' },
    eticaretCard: { title: 'متجر إلكتروني: دليل التكلفة [2026]', desc: 'الأسعار والتكاملات.' },
    ozelYazilimCard: { title: 'ما هو البرنامج المخصص؟ [2026]', desc: 'SaaS مقابل مخصص.' },
    whatsappCard: { title: 'روبوت واتساب: API والتكلفة [2026]', desc: 'WhatsApp Business API وGPT.' },
  },
  ru: {
    ankaraSecimCard: { title: 'Как выбрать IT-компанию в Анкаре? [2026]', desc: 'Сравнение предложений и красные флаги.' },
    eticaretCard: { title: 'Интернет-магазин: гид по стоимости [2026]', desc: 'Цены и интеграции.' },
    ozelYazilimCard: { title: 'Что такое индивидуальное ПО? [2026]', desc: 'SaaS vs индивидуальное.' },
    whatsappCard: { title: 'WhatsApp-чатбот: API и стоимость [2026]', desc: 'WhatsApp Business API и GPT.' },
  },
};

for (const lang of Object.keys(additions)) {
  const path = resolve(i18nDir, `${lang}.json`);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  const add = additions[lang];
  Object.assign(data.blog.tags, add.tags);
  Object.assign(data.blog.cards, add.cards);
  if (backfillCards[lang]) Object.assign(data.blog.cards, backfillCards[lang]);
  Object.assign(data.blog.posts, add.posts);
  Object.assign(data.blog.cta, add.cta);
  if (!data.blog.meta.date5) data.blog.meta.date5 = lang === 'tr' ? '22 Haziran 2026' : 'June 22, 2026';
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  console.log('Updated', lang + '.json');
}
