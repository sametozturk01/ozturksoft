import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const PATCH = {
  tr: {
    cards: {
      ankaraSaasCard: {
        title: "Ankara'da SaaS Geliştirme: Bulut Ürün, Maliyet ve Mimari Rehberi [2026]",
        desc: "Ankara'da SaaS geliştirme rehberi. Çok kiracılı mimari, abonelik faturalandırma, MVP maliyeti ve doğru teknoloji seçimi.",
      },
      ankaraOcrCard: {
        title: "Ankara'da OCR & Belge AI: Fatura, Sözleşme Dijitalleştirme Rehberi [2026]",
        desc: "Ankara'da OCR ve belge yapay zeka çözümleri. Fatura okuma, sözleşme sınıflandırma, ERP entegrasyonu ve maliyet rehberi.",
      },
      ankaraFlutterCard: {
        title: "Ankara'da Flutter Uygulama Geliştirme: Maliyet, Süre ve Rehber [2026]",
        desc: "Ankara'da Flutter ile iOS ve Android uygulama geliştirme. MVP maliyeti, native performans, store yayınlama ve 2026 fiyat rehberi.",
      },
      ankaraTelecomCard: {
        title: "Ankara'da Telekom Yazılım Çözümleri: BSS/OSS, Chatbot ve CRM Rehberi [2026]",
        desc: "Ankara'da telekom sektörü yazılım çözümleri. Müşteri self-servis, chatbot, faturalama entegrasyonu ve operasyon panelleri.",
      },
      ankaraSanayiCard: {
        title: "Ankara'da Sanayi Yazılım Çözümleri: İmalat, Savunma ve Üretim Rehberi [2026]",
        desc: "Ankara'da sanayi ve imalat yazılımı. Kalite kontrol AI, ERP entegrasyonu, öngörülü bakım ve savunma sanayi çözümleri.",
      },
    },
    posts: {
      ankaraSaas: { tag: '☁️ SaaS', title: "Ankara'da SaaS Geliştirme: Bulut Ürün, Maliyet ve Mimari Rehberi [2026]", breadcrumb: 'Ankara SaaS 2026' },
      ankaraOcr: { tag: '📄 OCR & Belge AI', title: "Ankara'da OCR & Belge AI: Fatura, Sözleşme Dijitalleştirme Rehberi [2026]", breadcrumb: 'Ankara OCR Belge AI 2026' },
      ankaraFlutter: { tag: '📱 Flutter', title: "Ankara'da Flutter Uygulama Geliştirme: Maliyet, Süre ve Rehber [2026]", breadcrumb: 'Ankara Flutter 2026' },
      ankaraTelecom: { tag: '📡 Telekom', title: "Ankara'da Telekom Yazılım Çözümleri: BSS/OSS, Chatbot ve CRM Rehberi [2026]", breadcrumb: 'Ankara Telekom Yazılım 2026' },
      ankaraSanayi: { tag: '🏭 Sanayi', title: "Ankara'da Sanayi Yazılım Çözümleri: İmalat, Savunma ve Üretim Rehberi [2026]", breadcrumb: 'Ankara Sanayi Yazılım 2026' },
    },
    cta: {
      ankaraSaas: { title: "Ankara'da SaaS Ürününüzü Planlayalım", desc: 'MVP kapsamı ve mimari için ücretsiz keşif görüşmesi.', btn: 'Ücretsiz Teklif Al' },
      ankaraOcr: { title: 'OCR & Belge AI Projenizi Konuşalım', desc: 'Fatura ve evrak süreçlerinizi otomatikleştirmek için ücretsiz danışmanlık.', btn: 'Ücretsiz Danışmanlık' },
      ankaraFlutter: { title: 'Flutter Uygulama Projenizi Başlatalım', desc: 'iOS ve Android için tek kod tabanı — ücretsiz keşif görüşmesi.', btn: 'Projenizi Anlatın' },
      ankaraTelecom: { title: 'Telekom Yazılım Projenizi Konuşalım', desc: 'BSS/OSS, self-servis ve chatbot için ücretsiz danışmanlık.', btn: 'Ücretsiz Danışmanlık' },
      ankaraSanayi: { title: 'Sanayi Yazılım Projeniz İçin Teklif Alın', desc: 'İmalat, üretim ve savunma sanayi yazılımı — ücretsiz keşif görüşmesi.', btn: 'Ücretsiz Teklif Al' },
    },
    ankaraHub: { linkSaas: 'SaaS geliştirme rehberi', linkOcr: 'OCR & belge AI rehberi', linkFlutter: 'Flutter uygulama rehberi' },
  },
  en: {
    cards: {
      ankaraSaasCard: { title: 'SaaS Development in Ankara: Cloud Product, Cost & Architecture Guide [2026]', desc: 'SaaS development guide for Ankara. Multi-tenant architecture, subscription billing, MVP cost and tech stack selection.' },
      ankaraOcrCard: { title: 'OCR & Document AI in Ankara: Invoice & Contract Digitization Guide [2026]', desc: 'OCR and document AI in Ankara. Invoice reading, contract classification, ERP integration and cost guide.' },
      ankaraFlutterCard: { title: 'Flutter App Development in Ankara: Cost, Timeline & Guide [2026]', desc: 'Flutter iOS and Android development in Ankara. MVP cost, native performance, store publishing and 2026 pricing.' },
      ankaraTelecomCard: { title: 'Telecom Software Solutions in Ankara: BSS/OSS, Chatbot & CRM Guide [2026]', desc: 'Telecom software in Ankara. Customer self-service, chatbots, billing integration and operations dashboards.' },
      ankaraSanayiCard: { title: 'Industrial Software Solutions in Ankara: Manufacturing, Defense & Production Guide [2026]', desc: 'Industrial software in Ankara. Quality-control AI, ERP integration, predictive maintenance and defense industry solutions.' },
    },
    posts: {
      ankaraSaas: { tag: '☁️ SaaS', title: 'SaaS Development in Ankara: Cloud Product, Cost & Architecture Guide [2026]', breadcrumb: 'Ankara SaaS 2026' },
      ankaraOcr: { tag: '📄 OCR & Document AI', title: 'OCR & Document AI in Ankara: Invoice & Contract Digitization Guide [2026]', breadcrumb: 'Ankara OCR Document AI 2026' },
      ankaraFlutter: { tag: '📱 Flutter', title: 'Flutter App Development in Ankara: Cost, Timeline & Guide [2026]', breadcrumb: 'Ankara Flutter 2026' },
      ankaraTelecom: { tag: '📡 Telecom', title: 'Telecom Software Solutions in Ankara: BSS/OSS, Chatbot & CRM Guide [2026]', breadcrumb: 'Ankara Telecom Software 2026' },
      ankaraSanayi: { tag: '🏭 Industry', title: 'Industrial Software Solutions in Ankara: Manufacturing, Defense & Production Guide [2026]', breadcrumb: 'Ankara Industrial Software 2026' },
    },
    cta: {
      ankaraSaas: { title: 'Plan Your SaaS Product in Ankara', desc: 'Free discovery session for MVP scope and architecture.', btn: 'Get a Free Quote' },
      ankaraOcr: { title: "Let's Discuss Your OCR & Document AI Project", desc: 'Free consultation to automate invoice and document workflows.', btn: 'Free Consultation' },
      ankaraFlutter: { title: 'Start Your Flutter App Project', desc: 'Single codebase for iOS and Android — free discovery call.', btn: 'Tell Us About Your Project' },
      ankaraTelecom: { title: "Let's Discuss Your Telecom Software Project", desc: 'Free consultation for BSS/OSS, self-service and chatbot solutions.', btn: 'Free Consultation' },
      ankaraSanayi: { title: 'Get a Quote for Your Industrial Software Project', desc: 'Manufacturing, production and defense industry software — free discovery call.', btn: 'Get a Free Quote' },
    },
    ankaraHub: { linkSaas: 'SaaS development guide', linkOcr: 'OCR & document AI guide', linkFlutter: 'Flutter app guide' },
  },
  de: {
    cards: {
      ankaraSaasCard: { title: 'SaaS-Entwicklung in Ankara: Cloud-Produkt, Kosten & Architektur [2026]', desc: 'SaaS-Leitfaden für Ankara. Multi-Tenant-Architektur, Abrechnung, MVP-Kosten und Technologiewahl.' },
      ankaraOcrCard: { title: 'OCR & Dokumenten-KI in Ankara: Rechnungs- & Vertragsdigitalisierung [2026]', desc: 'OCR und Dokumenten-KI in Ankara. Rechnungserkennung, Vertragsklassifizierung, ERP-Integration und Kosten.' },
      ankaraFlutterCard: { title: 'Flutter-App-Entwicklung in Ankara: Kosten, Dauer & Leitfaden [2026]', desc: 'Flutter iOS/Android in Ankara. MVP-Kosten, native Performance, Store-Veröffentlichung und Preise 2026.' },
      ankaraTelecomCard: { title: 'Telekom-Software in Ankara: BSS/OSS, Chatbot & CRM Leitfaden [2026]', desc: 'Telekom-Software in Ankara. Kunden-Self-Service, Chatbots, Abrechnungsintegration und Operations-Dashboards.' },
      ankaraSanayiCard: { title: 'Industriesoftware in Ankara: Fertigung, Verteidigung & Produktion [2026]', desc: 'Industriesoftware in Ankara. Qualitätskontrolle-KI, ERP-Integration, vorausschauende Wartung und Verteidigungsindustrie.' },
    },
    posts: {
      ankaraSaas: { tag: '☁️ SaaS', title: 'SaaS-Entwicklung in Ankara: Cloud-Produkt, Kosten & Architektur [2026]', breadcrumb: 'Ankara SaaS 2026' },
      ankaraOcr: { tag: '📄 OCR & Dokumenten-KI', title: 'OCR & Dokumenten-KI in Ankara: Rechnungs- & Vertragsdigitalisierung [2026]', breadcrumb: 'Ankara OCR 2026' },
      ankaraFlutter: { tag: '📱 Flutter', title: 'Flutter-App-Entwicklung in Ankara: Kosten, Dauer & Leitfaden [2026]', breadcrumb: 'Ankara Flutter 2026' },
      ankaraTelecom: { tag: '📡 Telekom', title: 'Telekom-Software in Ankara: BSS/OSS, Chatbot & CRM Leitfaden [2026]', breadcrumb: 'Ankara Telekom Software 2026' },
      ankaraSanayi: { tag: '🏭 Industrie', title: 'Industriesoftware in Ankara: Fertigung, Verteidigung & Produktion [2026]', breadcrumb: 'Ankara Industriesoftware 2026' },
    },
    cta: {
      ankaraSaas: { title: 'Planen Sie Ihr SaaS-Produkt in Ankara', desc: 'Kostenlose Erstberatung für MVP-Umfang und Architektur.', btn: 'Kostenloses Angebot' },
      ankaraOcr: { title: 'Sprechen wir über Ihr OCR- & Dokumenten-KI-Projekt', desc: 'Kostenlose Beratung zur Automatisierung von Rechnungs- und Dokumentenprozessen.', btn: 'Kostenlose Beratung' },
      ankaraFlutter: { title: 'Starten Sie Ihr Flutter-App-Projekt', desc: 'Eine Codebasis für iOS und Android — kostenloses Erstgespräch.', btn: 'Projekt besprechen' },
      ankaraTelecom: { title: 'Sprechen wir über Ihr Telekom-Softwareprojekt', desc: 'Kostenlose Beratung für BSS/OSS, Self-Service und Chatbot.', btn: 'Kostenlose Beratung' },
      ankaraSanayi: { title: 'Angebot für Ihr Industriesoftware-Projekt', desc: 'Fertigung, Produktion und Verteidigungsindustrie — kostenloses Erstgespräch.', btn: 'Kostenloses Angebot' },
    },
    ankaraHub: { linkSaas: 'SaaS-Entwicklungsleitfaden', linkOcr: 'OCR & Dokumenten-KI Leitfaden', linkFlutter: 'Flutter-App Leitfaden' },
  },
  fr: {
    cards: {
      ankaraSaasCard: { title: 'Développement SaaS à Ankara : produit cloud, coûts et architecture [2026]', desc: 'Guide SaaS pour Ankara. Architecture multi-tenant, facturation par abonnement, coût MVP et choix technologique.' },
      ankaraOcrCard: { title: 'OCR & IA documentaire à Ankara : numérisation factures et contrats [2026]', desc: 'OCR et IA documentaire à Ankara. Lecture de factures, classification de contrats, intégration ERP et coûts.' },
      ankaraFlutterCard: { title: 'Développement Flutter à Ankara : coût, délais et guide [2026]', desc: 'Applications iOS et Android avec Flutter à Ankara. Coût MVP, performances natives, publication store et tarifs 2026.' },
      ankaraTelecomCard: { title: 'Logiciel télécom à Ankara : BSS/OSS, chatbot et CRM [2026]', desc: 'Logiciel télécom à Ankara. Self-service client, chatbots, facturation et tableaux de bord opérationnels.' },
      ankaraSanayiCard: { title: 'Logiciel industriel à Ankara : fabrication, défense et production [2026]', desc: 'Logiciel industriel à Ankara. IA contrôle qualité, intégration ERP, maintenance prédictive et défense.' },
    },
    posts: {
      ankaraSaas: { tag: '☁️ SaaS', title: 'Développement SaaS à Ankara : produit cloud, coûts et architecture [2026]', breadcrumb: 'Ankara SaaS 2026' },
      ankaraOcr: { tag: '📄 OCR & IA documentaire', title: 'OCR & IA documentaire à Ankara : numérisation factures et contrats [2026]', breadcrumb: 'Ankara OCR 2026' },
      ankaraFlutter: { tag: '📱 Flutter', title: 'Développement Flutter à Ankara : coût, délais et guide [2026]', breadcrumb: 'Ankara Flutter 2026' },
      ankaraTelecom: { tag: '📡 Télécom', title: 'Logiciel télécom à Ankara : BSS/OSS, chatbot et CRM [2026]', breadcrumb: 'Ankara Télécom 2026' },
      ankaraSanayi: { tag: '🏭 Industrie', title: 'Logiciel industriel à Ankara : fabrication, défense et production [2026]', breadcrumb: 'Ankara Industrie 2026' },
    },
    cta: {
      ankaraSaas: { title: 'Planifiez votre produit SaaS à Ankara', desc: 'Session découverte gratuite pour le périmètre MVP et l\'architecture.', btn: 'Devis gratuit' },
      ankaraOcr: { title: 'Parlons de votre projet OCR & IA documentaire', desc: 'Consultation gratuite pour automatiser vos flux de factures et documents.', btn: 'Consultation gratuite' },
      ankaraFlutter: { title: 'Lancez votre projet d\'application Flutter', desc: 'Une seule base de code pour iOS et Android — appel découverte gratuit.', btn: 'Parlez-nous de votre projet' },
      ankaraTelecom: { title: 'Parlons de votre projet logiciel télécom', desc: 'Consultation gratuite pour BSS/OSS, self-service et chatbot.', btn: 'Consultation gratuite' },
      ankaraSanayi: { title: 'Devis pour votre projet logiciel industriel', desc: 'Fabrication, production et défense — appel découverte gratuit.', btn: 'Devis gratuit' },
    },
    ankaraHub: { linkSaas: 'Guide développement SaaS', linkOcr: 'Guide OCR & IA documentaire', linkFlutter: 'Guide application Flutter' },
  },
  ar: {
    cards: {
      ankaraSaasCard: { title: 'تطوير SaaS في أنقرة: منتج سحابي وتكاليف وهندسة معمارية [2026]', desc: 'دليل تطوير SaaS في أنقرة. بنية متعددة المستأجرين، الفوترة بالاشتراك، تكلفة MVP واختيار التقنية.' },
      ankaraOcrCard: { title: 'OCR وذكاء المستندات في أنقرة: رقمنة الفواتير والعقود [2026]', desc: 'حلول OCR وذكاء المستندات في أنقرة. قراءة الفواتير، تصنيف العقود، تكامل ERP ودليل التكاليف.' },
      ankaraFlutterCard: { title: 'تطوير تطبيقات Flutter في أنقرة: التكلفة والمدة والدليل [2026]', desc: 'تطوير iOS وAndroid بـ Flutter في أنقرة. تكلفة MVP، أداء native، النشر في المتاجر وأسعار 2026.' },
      ankaraTelecomCard: { title: 'حلول برمجيات الاتصالات في أنقرة: BSS/OSS وروبوت وCRM [2026]', desc: 'برمجيات الاتصالات في أنقرة. خدمة ذاتية للعملاء، روبوتات، فوترة ولوحات عمليات.' },
      ankaraSanayiCard: { title: 'حلول البرمجيات الصناعية في أنقرة: التصنيع والدفاع والإنتاج [2026]', desc: 'برمجيات صناعية في أنقرة. ذكاء اصطناعي للجودة، تكامل ERP، صيانة تنبؤية وصناعة الدفاع.' },
    },
    posts: {
      ankaraSaas: { tag: '☁️ SaaS', title: 'تطوير SaaS في أنقرة: منتج سحابي وتكاليف وهندسة معمارية [2026]', breadcrumb: 'أنقرة SaaS 2026' },
      ankaraOcr: { tag: '📄 OCR وذكاء المستندات', title: 'OCR وذكاء المستندات في أنقرة: رقمنة الفواتير والعقود [2026]', breadcrumb: 'أنقرة OCR 2026' },
      ankaraFlutter: { tag: '📱 Flutter', title: 'تطوير تطبيقات Flutter في أنقرة: التكلفة والمدة والدليل [2026]', breadcrumb: 'أنقرة Flutter 2026' },
      ankaraTelecom: { tag: '📡 اتصالات', title: 'حلول برمجيات الاتصالات في أنقرة: BSS/OSS وروبوت وCRM [2026]', breadcrumb: 'أنقرة اتصالات 2026' },
      ankaraSanayi: { tag: '🏭 صناعة', title: 'حلول البرمجيات الصناعية في أنقرة: التصنيع والدفاع والإنتاج [2026]', breadcrumb: 'أنقرة صناعة 2026' },
    },
    cta: {
      ankaraSaas: { title: 'لنخطط لمنتج SaaS الخاص بك في أنقرة', desc: 'جلسة اكتشاف مجانية لنطاق MVP والهندسة المعمارية.', btn: 'عرض مجاني' },
      ankaraOcr: { title: 'لنناقش مشروع OCR وذكاء المستندات', desc: 'استشارة مجانية لأتمتة عمليات الفواتير والمستندات.', btn: 'استشارة مجانية' },
      ankaraFlutter: { title: 'لنبدأ مشروع تطبيق Flutter', desc: 'قاعدة كود واحدة لـ iOS وAndroid — مكالمة اكتشاف مجانية.', btn: 'أخبرنا عن مشروعك' },
      ankaraTelecom: { title: 'لنناقش مشروع برمجيات الاتصالات', desc: 'استشارة مجانية لـ BSS/OSS والخدمة الذاتية والروبوت.', btn: 'استشارة مجانية' },
      ankaraSanayi: { title: 'عرض لمشروع البرمجيات الصناعية', desc: 'التصنيع والإنتاج وصناعة الدفاع — مكالمة اكتشاف مجانية.', btn: 'عرض مجاني' },
    },
    ankaraHub: { linkSaas: 'دليل تطوير SaaS', linkOcr: 'دليل OCR وذكاء المستندات', linkFlutter: 'دليل تطبيق Flutter' },
  },
  ru: {
    cards: {
      ankaraSaasCard: { title: 'Разработка SaaS в Анкаре: облачный продукт, стоимость и архитектура [2026]', desc: 'Гид по SaaS в Анкаре. Multi-tenant архитектура, подписка, стоимость MVP и выбор технологий.' },
      ankaraOcrCard: { title: 'OCR и документный ИИ в Анкаре: оцифровка счетов и договоров [2026]', desc: 'OCR и документный ИИ в Анкаре. Чтение счетов, классификация договоров, интеграция ERP и стоимость.' },
      ankaraFlutterCard: { title: 'Разработка Flutter-приложений в Анкаре: стоимость, сроки и гид [2026]', desc: 'Flutter iOS/Android в Анкаре. Стоимость MVP, нативная производительность, публикация в сторах и цены 2026.' },
      ankaraTelecomCard: { title: 'Телеком-решения в Анкаре: BSS/OSS, чатбот и CRM [2026]', desc: 'Телеком-ПО в Анкаре. Самообслуживание, чатботы, биллинг и операционные панели.' },
      ankaraSanayiCard: { title: 'Промышленное ПО в Анкаре: производство, оборона и промышленность [2026]', desc: 'Промышленное ПО в Анкаре. ИИ контроля качества, ERP, предиктивное обслуживание и оборона.' },
    },
    posts: {
      ankaraSaas: { tag: '☁️ SaaS', title: 'Разработка SaaS в Анкаре: облачный продукт, стоимость и архитектура [2026]', breadcrumb: 'Анкара SaaS 2026' },
      ankaraOcr: { tag: '📄 OCR и документный ИИ', title: 'OCR и документный ИИ в Анкаре: оцифровка счетов и договоров [2026]', breadcrumb: 'Анкара OCR 2026' },
      ankaraFlutter: { tag: '📱 Flutter', title: 'Разработка Flutter-приложений в Анкаре: стоимость, сроки и гид [2026]', breadcrumb: 'Анкара Flutter 2026' },
      ankaraTelecom: { tag: '📡 Телеком', title: 'Телеком-решения в Анкаре: BSS/OSS, чатбот и CRM [2026]', breadcrumb: 'Анкара Телеком 2026' },
      ankaraSanayi: { tag: '🏭 Промышленность', title: 'Промышленное ПО в Анкаре: производство, оборона и промышленность [2026]', breadcrumb: 'Анкара Промышленность 2026' },
    },
    cta: {
      ankaraSaas: { title: 'Спланируем ваш SaaS-продукт в Анкаре', desc: 'Бесплатная встреча для определения MVP и архитектуры.', btn: 'Бесплатное предложение' },
      ankaraOcr: { title: 'Обсудим ваш OCR и документный ИИ проект', desc: 'Бесплатная консультация по автоматизации счетов и документов.', btn: 'Бесплатная консультация' },
      ankaraFlutter: { title: 'Запустим ваш Flutter-проект', desc: 'Одна кодовая база для iOS и Android — бесплатный звонок.', btn: 'Расскажите о проекте' },
      ankaraTelecom: { title: 'Обсудим ваш телеком-проект', desc: 'Бесплатная консультация по BSS/OSS, самообслуживанию и чатботу.', btn: 'Бесплатная консультация' },
      ankaraSanayi: { title: 'Предложение по промышленному ПО', desc: 'Производство и оборонная промышленность — бесплатная встреча.', btn: 'Бесплатное предложение' },
    },
    ankaraHub: { linkSaas: 'Гид по разработке SaaS', linkOcr: 'Гид OCR и документный ИИ', linkFlutter: 'Гид Flutter-приложений' },
  },
};

for (const [lang, data] of Object.entries(PATCH)) {
  const file = path.join(root, 'src/i18n', `${lang}.json`);
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  Object.assign(json.blog.cards, data.cards);
  Object.assign(json.blog.posts, data.posts);
  Object.assign(json.blog.cta, data.cta);
  Object.assign(json.blog.ankaraHub, data.ankaraHub);
  fs.writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
  console.log(`✓ ${lang}.json`);
}
