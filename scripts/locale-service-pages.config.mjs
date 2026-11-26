// Important Turkish pages that get full, statically translated locale versions.
// slug: per-language path under /<lang>/ ; desc: per-language meta description ; title: optional override.
export const LOCALE_PAGES = [
  {
    tr: 'ai-agent',
    slug: { en: 'ai-agent-development', de: 'ki-agenten-entwicklung', fr: 'developpement-agent-ia', ar: 'ai-agent-development', ru: 'razrabotka-ai-agentov' },
    desc: {
      en: 'AI agent development: pilot projects 60,000–120,000 TL, enterprise agents 150,000–280,000 TL. CRM/ERP connections, Ankara team, free discovery call.',
      de: 'KI-Agenten entwickeln lassen: Pilotprojekt 60.000–120.000 TL, Enterprise-Agent 150.000–280.000 TL. CRM/ERP-Anbindung, Team in Ankara, kostenloses Erstgespräch.',
      fr: 'Développement d’agents IA : projet pilote 60 000–120 000 TL, agent d’entreprise 150 000–280 000 TL. Connexion CRM/ERP, équipe à Ankara, premier échange gratuit.',
      ar: 'تطوير وكلاء الذكاء الاصطناعي: مشروع تجريبي 60,000–120,000 ليرة، ووكيل مؤسسي 150,000–280,000 ليرة. ربط CRM/ERP، فريق في أنقرة، جلسة استكشاف مجانية.',
      ru: 'Разработка ИИ-агентов: пилот 60 000–120 000 TL, корпоративный агент 150 000–280 000 TL. Интеграция с CRM/ERP, команда в Анкаре, бесплатная консультация.',
    },
  },
  {
    tr: 'chatbot-yaptirmak',
    slug: { en: 'chatbot-development', de: 'chatbot-entwicklung', fr: 'developpement-chatbot', ar: 'chatbot-development', ru: 'razrabotka-chatbota' },
    desc: {
      en: 'Chatbot development: FAQ bot 25,000–45,000 TL, GPT web chatbot 45,000–80,000 TL, document-based RAG bot 80,000–150,000 TL. Website widget, CRM, KVKK. Ankara.',
      de: 'Chatbot entwickeln lassen: FAQ-Bot 25.000–45.000 TL, GPT-Webchatbot 45.000–80.000 TL, RAG-Bot 80.000–150.000 TL. Website-Widget, CRM, KVKK. Team in Ankara.',
      fr: 'Création de chatbot : bot FAQ 25 000–45 000 TL, chatbot web GPT 45 000–80 000 TL, bot RAG 80 000–150 000 TL. Widget site, CRM, KVKK. Équipe à Ankara.',
      ar: 'تطوير روبوت محادثة: روبوت أسئلة شائعة 25,000–45,000 ليرة، روبوت GPT للموقع 45,000–80,000 ليرة، روبوت RAG 80,000–150,000 ليرة. ربط CRM وKVKK، أنقرة.',
      ru: 'Разработка чат-бота: FAQ-бот 25 000–45 000 TL, GPT-чат-бот для сайта 45 000–80 000 TL, RAG-бот 80 000–150 000 TL. Виджет, CRM, KVKK. Команда в Анкаре.',
    },
  },
  {
    tr: 'yapay-zeka-entegrasyonu',
    slug: { en: 'ai-integration', de: 'ki-integration', fr: 'integration-ia', ar: 'ai-integration', ru: 'integraciya-ii' },
    desc: {
      en: 'AI integration: ChatGPT/GPT 40,000–80,000 TL, RAG on company documents 80,000–200,000 TL, on-premise 150,000–500,000+ TL. KVKK compliant, Ankara team.',
      de: 'KI-Integration: ChatGPT/GPT 40.000–80.000 TL, RAG mit Firmendokumenten 80.000–200.000 TL, On-Premise 150.000–500.000+ TL. KVKK-konform, Team in Ankara.',
      fr: 'Intégration de l’IA : ChatGPT/GPT 40 000–80 000 TL, RAG sur vos documents 80 000–200 000 TL, on-premise 150 000–500 000+ TL. Conforme KVKK, équipe à Ankara.',
      ar: 'تكامل الذكاء الاصطناعي: ChatGPT/GPT من 40,000 إلى 80,000 ليرة، RAG على مستندات الشركة 80,000–200,000 ليرة، وعلى خوادمكم 150,000–500,000+ ليرة. متوافق مع KVKK.',
      ru: 'Интеграция ИИ: ChatGPT/GPT 40 000–80 000 TL, RAG по документам компании 80 000–200 000 TL, on-premise 150 000–500 000+ TL. Соответствие KVKK, команда в Анкаре.',
    },
  },
  {
    tr: 'kurum-ici-yapay-zeka',
    slug: { en: 'private-chatgpt-for-business', de: 'firmeneigenes-chatgpt', fr: 'chatgpt-prive-entreprise', ar: 'private-chatgpt', ru: 'korporativnyj-chatgpt' },
    desc: {
      en: 'A private ChatGPT for your company: runs on your own server, knows your documents and cites its sources. KVKK, on-premise. Pilot 40,000–80,000 TL. Ankara.',
      de: 'Firmeneigenes ChatGPT: läuft auf Ihrem Server, kennt Ihre Dokumente und nennt Quellen. KVKK-konform, On-Premise. Pilotprojekt 40.000–80.000 TL. Team in Ankara.',
      fr: 'Un ChatGPT privé pour votre entreprise : sur votre serveur, il connaît vos documents et cite ses sources. KVKK, on-premise. Pilote 40 000–80 000 TL. Ankara.',
      ar: 'ChatGPT خاص بشركتكم: يعمل على خادمكم ويعرف مستنداتكم ويذكر المصدر. متوافق مع KVKK ويعمل داخل الشركة. مشروع تجريبي 40,000–80,000 ليرة. أنقرة.',
      ru: 'Собственный ChatGPT для компании: работает на вашем сервере, знает ваши документы и даёт ссылки на источники. KVKK, on-premise. Пилот 40 000–80 000 TL.',
    },
  },
  {
    tr: 'yapay-zeka-danismanligi',
    slug: { en: 'ai-consulting', de: 'ki-beratung', fr: 'conseil-ia', ar: 'ai-consulting', ru: 'konsalting-ii' },
    desc: {
      en: 'AI consulting: free discovery call, roadmap 25,000–60,000 TL, pilot (PoC) 40,000–80,000 TL. Where to start, which process, KVKK and budget. Ankara team.',
      de: 'KI-Beratung: kostenloses Erstgespräch, Fahrplan 25.000–60.000 TL, Pilotprojekt (PoC) 40.000–80.000 TL. Wo anfangen, welcher Prozess, KVKK und Budget.',
      fr: 'Conseil en IA : premier échange gratuit, feuille de route 25 000–60 000 TL, pilote (PoC) 40 000–80 000 TL. Par où commencer, quel processus, KVKK et budget.',
      ar: 'استشارات الذكاء الاصطناعي: جلسة استكشاف مجانية، خارطة طريق 25,000–60,000 ليرة، مشروع تجريبي 40,000–80,000 ليرة. من أين نبدأ، أي عملية، KVKK والميزانية.',
      ru: 'Консалтинг по ИИ: бесплатная консультация, дорожная карта 25 000–60 000 TL, пилот (PoC) 40 000–80 000 TL. С чего начать, какой процесс, KVKK и бюджет.',
    },
  },
  {
    tr: 'ozel-yazilim-yaptirmak',
    slug: { en: 'custom-software-development', de: 'individualsoftware-entwicklung', fr: 'developpement-logiciel-sur-mesure', ar: 'custom-software-development', ru: 'razrabotka-po-na-zakaz' },
    desc: {
      en: 'Custom software development: SMB projects 80,000–200,000 TL, enterprise systems 200,000–500,000+ TL. Written scope, source code handover, QA and KVKK. Ankara.',
      de: 'Individualsoftware entwickeln lassen: KMU 80.000–200.000 TL, Unternehmenssysteme 200.000–500.000+ TL. Schriftlicher Umfang, Quellcode-Übergabe, QA und KVKK.',
      fr: 'Logiciel sur mesure : PME 80 000–200 000 TL, systèmes d’entreprise 200 000–500 000+ TL. Périmètre écrit, remise du code source, QA et KVKK. Ankara.',
      ar: 'تطوير برمجيات مخصّصة: مشاريع الشركات الصغيرة 80,000–200,000 ليرة، والأنظمة المؤسسية 200,000–500,000+ ليرة. نطاق مكتوب وتسليم الشيفرة المصدرية، أنقرة.',
      ru: 'Разработка ПО на заказ: МСБ 80 000–200 000 TL, корпоративные системы 200 000–500 000+ TL. Письменный объём работ, передача исходного кода, QA и KVKK.',
    },
  },
  {
    tr: 'web-sitesi-yaptirmak-ankara',
    slug: { en: 'website-development', de: 'website-erstellen-lassen', fr: 'creation-site-web', ar: 'website-development', ru: 'razrabotka-sajta' },
    desc: {
      en: 'Website development in Ankara: corporate websites 15,000–90,000 TL, e-commerce 100,000–500,000+ TL. SEO, KVKK and a written quote. Free discovery call.',
      de: 'Website erstellen lassen in Ankara: Firmenwebsite 15.000–90.000 TL, Onlineshop 100.000–500.000+ TL. SEO, KVKK und schriftliches Angebot. Kostenloses Erstgespräch.',
      fr: 'Création de site web à Ankara : site vitrine 15 000–90 000 TL, e-commerce 100 000–500 000+ TL. SEO, KVKK et devis écrit. Premier échange gratuit.',
      ar: 'تصميم مواقع الويب في أنقرة: موقع الشركة 15,000–90,000 ليرة، والمتجر الإلكتروني 100,000–500,000+ ليرة. تحسين محركات البحث وKVKK وعرض سعر مكتوب.',
      ru: 'Разработка сайта в Анкаре: корпоративный сайт 15 000–90 000 TL, интернет-магазин 100 000–500 000+ TL. SEO, KVKK и письменное предложение.',
    },
  },
  {
    tr: 'mobil-uygulama-yaptirmak',
    slug: { en: 'mobile-app-development', de: 'app-entwicklung', fr: 'developpement-application-mobile', ar: 'mobile-app-development', ru: 'razrabotka-mobilnyh-prilozhenij' },
    desc: {
      en: 'Mobile app development: MVP 80,000–120,000 TL, Flutter 120,000–200,000 TL, native iOS + Android 180,000–350,000 TL. Written quote, App Store release. Ankara.',
      de: 'App entwickeln lassen: MVP 80.000–120.000 TL, Flutter 120.000–200.000 TL, native iOS + Android 180.000–350.000 TL. Schriftliches Angebot, Store-Veröffentlichung.',
      fr: 'Développement d’application mobile : MVP 80 000–120 000 TL, Flutter 120 000–200 000 TL, natif iOS + Android 180 000–350 000 TL. Devis écrit, publication en store.',
      ar: 'تطوير تطبيقات الجوال: نسخة أولى 80,000–120,000 ليرة، Flutter من 120,000 إلى 200,000 ليرة، وiOS وAndroid أصلي 180,000–350,000 ليرة. عرض مكتوب ونشر في المتاجر.',
      ru: 'Разработка мобильного приложения: MVP 80 000–120 000 TL, Flutter 120 000–200 000 TL, нативные iOS + Android 180 000–350 000 TL. Публикация в App Store.',
    },
  },
  {
    tr: 'e-ticaret-sitesi-yaptirmak',
    slug: { en: 'ecommerce-website-development', de: 'onlineshop-erstellen-lassen', fr: 'creation-site-ecommerce', ar: 'ecommerce-development', ru: 'razrabotka-internet-magazina' },
    title: {
      en: 'E-commerce Website Development | Your Own Store | Ozturksoft',
      de: 'Onlineshop erstellen lassen | Ihr eigener Shop | Ozturksoft',
      fr: 'Création de site e-commerce | Votre propre boutique | Ozturksoft',
      ar: 'تطوير متجر إلكتروني | متجركم الخاص | Ozturksoft',
      ru: 'Разработка интернет-магазина | Собственный магазин | Ozturksoft',
    },
    desc: {
      en: 'Your own online store instead of a shared theme: code and data belong to you. Custom store 100,000–150,000 TL, with ERP 150,000–250,000 TL, B2B 250,000–500,000+ TL.',
      de: 'Ein eigener Onlineshop statt Standard-Theme: Code und Daten gehören Ihnen. Shop 100.000–150.000 TL, mit ERP 150.000–250.000 TL, B2B 250.000–500.000+ TL.',
      fr: 'Votre propre boutique en ligne au lieu d’un thème partagé : code et données vous appartiennent. Boutique 100 000–150 000 TL, avec ERP 150 000–250 000 TL.',
      ar: 'متجر إلكتروني خاص بكم بدل القوالب المشتركة: الشيفرة والبيانات ملككم. متجر مخصّص 100,000–150,000 ليرة، مع ERP من 150,000 إلى 250,000 ليرة.',
      ru: 'Собственный интернет-магазин вместо общего шаблона: код и данные принадлежат вам. Магазин 100 000–150 000 TL, с ERP 150 000–250 000 TL, B2B от 250 000 TL.',
    },
  },
  {
    tr: 'geo-optimizasyonu',
    slug: { en: 'geo-optimization', de: 'geo-optimierung', fr: 'optimisation-geo', ar: 'geo-optimization', ru: 'geo-optimizaciya' },
    desc: {
      en: 'GEO optimization: get cited in ChatGPT, Gemini, Perplexity and Google AI Overviews. GEO audit 15,000–25,000 TL, setup 35,000–60,000 TL. Ankara team.',
      de: 'GEO-Optimierung: als Quelle in ChatGPT, Gemini, Perplexity und Google AI Overviews erscheinen. GEO-Audit 15.000–25.000 TL, Einrichtung 35.000–60.000 TL.',
      fr: 'Optimisation GEO : soyez cité dans ChatGPT, Gemini, Perplexity et les aperçus IA de Google. Audit GEO 15 000–25 000 TL, mise en place 35 000–60 000 TL.',
      ar: 'تحسين GEO: اظهروا كمصدر في ChatGPT وGemini وPerplexity وملخصات Google بالذكاء الاصطناعي. تدقيق GEO من 15,000 إلى 25,000 ليرة، والإعداد 35,000–60,000 ليرة.',
      ru: 'GEO-оптимизация: станьте источником в ответах ChatGPT, Gemini, Perplexity и обзорах Google AI. GEO-аудит 15 000–25 000 TL, настройка 35 000–60 000 TL.',
    },
  },
  {
    tr: 'whatsapp-chatbot-yaptirmak',
    slug: { en: 'whatsapp-chatbot', de: 'whatsapp-chatbot', fr: 'chatbot-whatsapp', ar: 'whatsapp-chatbot', ru: 'whatsapp-chatbot' },
    desc: {
      en: 'WhatsApp chatbot development: FAQ bot 40,000–70,000 TL, GPT assistant 60,000–100,000 TL, with CRM 90,000–160,000 TL. Official Business API, orders, KVKK.',
      de: 'WhatsApp-Chatbot erstellen lassen: FAQ-Bot 40.000–70.000 TL, GPT-Assistent 60.000–100.000 TL, mit CRM 90.000–160.000 TL. Offizielle Business API, KVKK.',
      fr: 'Chatbot WhatsApp : bot FAQ 40 000–70 000 TL, assistant GPT 60 000–100 000 TL, avec CRM 90 000–160 000 TL. API Business officielle, commandes, KVKK.',
      ar: 'روبوت محادثة واتساب: روبوت أسئلة شائعة 40,000–70,000 ليرة، مساعد GPT من 60,000 إلى 100,000 ليرة، ومع CRM من 90,000 إلى 160,000 ليرة. واجهة Business API الرسمية.',
      ru: 'Чат-бот для WhatsApp: FAQ-бот 40 000–70 000 TL, GPT-ассистент 60 000–100 000 TL, с CRM 90 000–160 000 TL. Официальный Business API, заказы, KVKK.',
    },
  },
  { tr: 'urunler', slug: { en: 'products', de: 'produkte', fr: 'produits', ar: 'products', ru: 'produkty' }, descKey: 'productsPage.meta.desc' },
  { tr: 'urunler/alfaihale', slug: { en: 'products/alfaihale', de: 'produkte/alfaihale', fr: 'produits/alfaihale', ar: 'products/alfaihale', ru: 'produkty/alfaihale' }, descKey: 'alfaihalePage.meta.desc' },
  { tr: 'urunler/addjarvis', slug: { en: 'products/addjarvis', de: 'produkte/addjarvis', fr: 'produits/addjarvis', ar: 'products/addjarvis', ru: 'produkty/addjarvis' }, descKey: 'addjarvisPage.meta.desc' },
];

// Existing locale URLs for pages that already have their own locale versions (used to rewrite internal links)
export const EXISTING_LOCALE_LINKS = {
  '/': { en: '/en', de: '/de', fr: '/fr', ar: '/ar', ru: '/ru' },
  '/hizmetler': { en: '/en/services', de: '/de/leistungen', fr: '/fr/services', ar: '/ar/services', ru: '/ru/uslugi' },
  '/sss': { en: '/en/faq', de: '/de/faq', fr: '/fr/faq', ar: '/ar/faq', ru: '/ru/faq' },
  '/ankara-yapay-zeka-firmasi': { en: '/en/ankara-ai-company', de: '/de/ankara-ki-unternehmen', fr: '/fr/entreprise-ia-ankara', ar: '/ar/ankara-ai-company', ru: '/ru/ankara-ai-kompaniya' },
  '/ankara-yazilim-sirketi': { en: '/en/ankara-software-company', de: '/de/ankara-softwareunternehmen', fr: '/fr/entreprise-logicielle-ankara', ar: '/ar/ankara-software-company', ru: '/ru/ankara-soft-kompaniya' },
};
