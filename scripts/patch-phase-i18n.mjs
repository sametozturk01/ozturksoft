import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const i18nDir = path.join(__dirname, '../src/i18n');

const PATCH = {
  tr: {
    references: {
      title: 'Güvenle Çalıştığımız Partnerler',
      subtitle: 'KOBİ\'lerden kurumlara — Ankara ve Türkiye genelinde iş birliği yaptığımız markalar.',
    },
    stats: {
      projects: 'Tamamlanan Proje',
      satisfaction: 'Müşteri Memnuniyeti',
      support: '7/24 Teknik Destek',
      sectors: 'Sektör Uzmanlığı',
      experience: 'Yıllık Deneyim',
    },
    testimonials: {
      title: 'Müşterilerimiz Ne Diyor?',
      subtitle: 'Gerçek projelerden geri bildirimler — şeffaflık ve kalite odaklı teslimat.',
      t1: {
        quote: 'Web sitemiz ve rezervasyon sistemimiz zamanında teslim edildi. Süreç boyunca her adımı raporladılar.',
        name: 'Ahmet K.',
        role: 'Turizm & Transfer — Ankara',
        result: 'Online rezervasyon %40 arttı',
      },
      t2: {
        quote: 'WhatsApp chatbot entegrasyonu sayesinde müşteri sorularının büyük kısmını otomatik yanıtlıyoruz.',
        name: 'Elif Y.',
        role: 'E-ticaret & Perakende',
        result: 'Destek yükü %35 azaldı',
      },
      t3: {
        quote: 'Özel yazılım projemizde QA süreçleri ve kaynak kod devri sözleşmede netti. Güvenle çalıştık.',
        name: 'Murat D.',
        role: 'İmalat & Üretim — Ostim',
        result: 'Üretim takibi dijitalleşti',
      },
    },
    servicesPage: {
      erpNote: {
        title: 'ERP Entegrasyonu (Logo, Netsis, SAP)',
        desc: 'SAP implementasyonu veya ABAP danışmanlığı yapmıyoruz. Mevcut Logo, Netsis, Mikro ve SAP sistemlerinize API/RFC ile entegre özel yazılım, chatbot ve otomasyon geliştiriyoruz.',
        link: 'ERP entegrasyon rehberi →',
      },
    },
    expertise: {
      cards: {
        erpIntegration: {
          title: 'ERP Entegrasyonu',
          desc: 'Logo Tiger, Netsis, Mikro ve mevcut SAP kurulumlarınıza API ile bağlanan özel yazılım — danışmanlık değil, entegrasyon.',
        },
      },
    },
    industries: {
      guideLink: 'Sektör rehberi →',
    },
    aiAssistantPage: {
      hero: {
        badge: 'Kurumsal AI Asistan',
        title1: 'Ozturksoft',
        title2: 'AI Asistan',
        desc: 'WhatsApp, web ve CRM entegre kurumsal yapay zeka asistanı. 7/24 müşteri desteği, satış ve süreç otomasyonu — KVKK uyumlu, on-premise seçeneği.',
      },
      features: {
        f1: { title: 'WhatsApp & Web', desc: 'Müşterilerinizin bulunduğu kanallarda 7/24 yanıt — Türkçe NLP ve GPT destekli.' },
        f2: { title: 'CRM & ERP Bağlantısı', desc: 'Logo, Netsis, Salesforce ve özel sistemlere API entegrasyonu — canlı veri.' },
        f3: { title: 'KVKK Uyumlu', desc: 'On-premise kurulum, veri maskeleme ve audit log ile kurumsal güvenlik.' },
        f4: { title: 'AI Agents', desc: 'Sadece soru-cevap değil — sipariş, randevu ve süreç başlatma otonom görevler.' },
      },
      pricing: {
        title: '2026 Fiyat Aralığı',
        row1: 'Temel chatbot (WhatsApp + web)',
        row1price: '80.000 – 150.000 TL',
        row2: 'CRM/ERP entegre AI asistan',
        row2price: '150.000 – 280.000 TL',
        row3: 'Kurumsal on-premise platform',
        row3price: '280.000 – 500.000+ TL',
      },
      cta: { title: 'AI Asistan Projenizi Planlayalım', desc: 'Ücretsiz keşif görüşmesinde kanal, entegrasyon ve KVKK gereksinimlerinizi birlikte değerlendirelim.', btn: 'Ücretsiz Demo Talep Et' },
    },
    blog: {
      meta: { date7: '16 Temmuz 2026' },
      cards: {
        ankaraKamuCard: { title: "Ankara'da Kamu Yazılım Çözümleri: E-Devlet, İhale ve On-Premise AI Rehberi [2026]", desc: 'Kamu ve bakanlık yazılımı. E-devlet, evrak OCR, ihale otomasyonu ve KVKK uyumlu on-premise AI.' },
        logoNetsisErpCard: { title: 'Logo, Netsis ve SAP ERP Entegrasyonu: API, Maliyet ve Rehber [2026]', desc: 'Logo Tiger, Netsis, Mikro ve SAP API entegrasyonu — danışmanlık değil, özel yazılım bağlantısı.' },
        kvkkAiCard: { title: 'KVKK Uyumlu Yapay Zeka Rehberi: On-Premise LLM, Veri Güvenliği [2026]', desc: 'KVKK uyumlu AI mimarisi. On-premise LLM, veri maskeleme ve kamu/finans/savunma sektörleri.' },
      },
      posts: {
        ankaraKamu: { tag: '🏛️ Kamu', title: "Ankara'da Kamu Yazılım Çözümleri: E-Devlet, İhale ve On-Premise AI Rehberi [2026]", breadcrumb: 'Ankara Kamu Yazılım 2026' },
        logoNetsisErp: { tag: '🔗 ERP Entegrasyon', title: 'Logo, Netsis ve SAP ERP Entegrasyonu: API, Maliyet ve Rehber [2026]', breadcrumb: 'Logo Netsis ERP Entegrasyon 2026' },
        kvkkAi: { tag: '🔒 KVKK & AI', title: 'KVKK Uyumlu Yapay Zeka Rehberi: On-Premise LLM, Veri Güvenliği [2026]', breadcrumb: 'KVKK Uyumlu Yapay Zeka 2026' },
      },
      cta: {
        ankaraKamu: { title: 'Kamu Yazılım Projenizi Konuşalım', desc: 'E-devlet, OCR ve on-premise AI için ücretsiz keşif görüşmesi.', btn: 'Ücretsiz Keşif Görüşmesi' },
        logoNetsisErp: { title: 'ERP Entegrasyon Analizi Alın', desc: 'Logo, Netsis veya SAP bağlantınız için ücretsiz teknik değerlendirme.', btn: 'Ücretsiz Entegrasyon Analizi' },
        kvkkAi: { title: 'KVKK Uyumlu AI Projenizi Planlayalım', desc: 'On-premise LLM ve güvenli AI mimarisi için ücretsiz danışmanlık.', btn: 'KVKK Uyumlu AI Danışmanlığı' },
      },
    },
  },
  en: {
    references: { title: 'Partners We Trust', subtitle: 'From SMEs to enterprises — brands we collaborate with across Ankara and Turkey.' },
    stats: { projects: 'Completed Projects', satisfaction: 'Client Satisfaction', support: '24/7 Technical Support', sectors: 'Industry Expertise', experience: 'Years of Experience' },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Real feedback from real projects — transparent, quality-driven delivery.',
      t1: { quote: 'Our website and booking system were delivered on time. They reported every step throughout the process.', name: 'Ahmet K.', role: 'Tourism & Transfer — Ankara', result: 'Online bookings up 40%' },
      t2: { quote: 'WhatsApp chatbot integration automatically answers most customer questions now.', name: 'Elif Y.', role: 'E-commerce & Retail', result: 'Support load down 35%' },
      t3: { quote: 'QA processes and source code handover were clearly defined in the contract. We worked with confidence.', name: 'Murat D.', role: 'Manufacturing — Ostim', result: 'Production tracking digitized' },
    },
    servicesPage: { erpNote: { title: 'ERP Integration (Logo, Netsis, SAP)', desc: 'We do not offer SAP implementation or ABAP consulting. We build custom software, chatbots and automation integrated with your existing Logo, Netsis, Mikro and SAP systems via API/RFC.', link: 'ERP integration guide →' } },
    expertise: { cards: { erpIntegration: { title: 'ERP Integration', desc: 'Custom software connected to Logo Tiger, Netsis, Mikro and existing SAP via API — integration, not consulting.' } } },
    industries: { guideLink: 'Sector guide →' },
    aiAssistantPage: {
      hero: { badge: 'Enterprise AI Assistant', title1: 'Ozturksoft', title2: 'AI Assistant', desc: 'WhatsApp, web and CRM-integrated enterprise AI assistant. 24/7 support, sales and process automation — KVKK compliant, on-premise option.' },
      features: {
        f1: { title: 'WhatsApp & Web', desc: '24/7 responses on channels your customers use — Turkish NLP and GPT-powered.' },
        f2: { title: 'CRM & ERP Connection', desc: 'API integration with Logo, Netsis, Salesforce and custom systems — live data.' },
        f3: { title: 'KVKK Compliant', desc: 'On-premise deployment, data masking and audit logs for enterprise security.' },
        f4: { title: 'AI Agents', desc: 'Beyond Q&A — autonomous tasks: orders, appointments and process triggers.' },
      },
      pricing: { title: '2026 Price Ranges', row1: 'Basic chatbot (WhatsApp + web)', row1price: '80,000 – 150,000 TRY', row2: 'CRM/ERP integrated AI assistant', row2price: '150,000 – 280,000 TRY', row3: 'Enterprise on-premise platform', row3price: '280,000 – 500,000+ TRY' },
      cta: { title: 'Plan Your AI Assistant Project', desc: 'Free discovery call to evaluate channels, integrations and KVKK requirements.', btn: 'Request Free Demo' },
    },
    blog: {
      meta: { date7: 'July 16, 2026' },
      cards: {
        ankaraKamuCard: { title: 'Public Sector Software in Ankara: E-Government, Tender & On-Premise AI Guide [2026]', desc: 'Government software. E-government, document OCR, tender automation and KVKK-compliant on-premise AI.' },
        logoNetsisErpCard: { title: 'Logo, Netsis & SAP ERP Integration: API, Cost & Guide [2026]', desc: 'Logo Tiger, Netsis, Mikro and SAP API integration — not consulting, custom software connection.' },
        kvkkAiCard: { title: 'KVKK-Compliant AI Guide: On-Premise LLM & Data Security [2026]', desc: 'KVKK-compliant AI architecture. On-premise LLM, data masking for public sector, finance and defense.' },
      },
      posts: {
        ankaraKamu: { tag: '🏛️ Public Sector', title: 'Public Sector Software in Ankara: E-Government, Tender & On-Premise AI Guide [2026]', breadcrumb: 'Ankara Public Sector Software 2026' },
        logoNetsisErp: { tag: '🔗 ERP Integration', title: 'Logo, Netsis & SAP ERP Integration: API, Cost & Guide [2026]', breadcrumb: 'Logo Netsis ERP Integration 2026' },
        kvkkAi: { tag: '🔒 KVKK & AI', title: 'KVKK-Compliant AI Guide: On-Premise LLM & Data Security [2026]', breadcrumb: 'KVKK-Compliant AI 2026' },
      },
      cta: {
        ankaraKamu: { title: "Let's Discuss Your Public Sector Project", desc: 'Free discovery for e-government, OCR and on-premise AI.', btn: 'Free Discovery Call' },
        logoNetsisErp: { title: 'Get an ERP Integration Analysis', desc: 'Free technical assessment for Logo, Netsis or SAP connection.', btn: 'Free Integration Analysis' },
        kvkkAi: { title: 'Plan Your KVKK-Compliant AI Project', desc: 'Free consultation for on-premise LLM and secure AI architecture.', btn: 'Free KVKK AI Consultation' },
      },
    },
  },
  de: {
    references: { title: 'Partner, denen wir vertrauen', subtitle: 'Von KMU bis Konzerne — Marken, mit denen wir in Ankara und der Türkei zusammenarbeiten.' },
    stats: { projects: 'Abgeschlossene Projekte', satisfaction: 'Kundenzufriedenheit', support: '24/7 Technischer Support', sectors: 'Branchenexpertise', experience: 'Jahre Erfahrung' },
    testimonials: {
      title: 'Was unsere Kunden sagen',
      subtitle: 'Echtes Feedback aus echten Projekten — transparente, qualitätsorientierte Lieferung.',
      t1: { quote: 'Website und Buchungssystem pünktlich geliefert. Jeder Schritt wurde dokumentiert.', name: 'Ahmet K.', role: 'Tourismus & Transfer — Ankara', result: 'Online-Buchungen +40%' },
      t2: { quote: 'WhatsApp-Chatbot beantwortet die meisten Kundenfragen automatisch.', name: 'Elif Y.', role: 'E-Commerce & Einzelhandel', result: 'Support-Aufwand -35%' },
      t3: { quote: 'QA-Prozesse und Quellcode-Übergabe waren im Vertrag klar definiert.', name: 'Murat D.', role: 'Fertigung — Ostim', result: 'Produktionsverfolgung digitalisiert' },
    },
    servicesPage: { erpNote: { title: 'ERP-Integration (Logo, Netsis, SAP)', desc: 'Keine SAP-Implementierung oder ABAP-Beratung. Wir entwickeln Individualsoftware, Chatbots und Automatisierung per API/RFC mit bestehenden Logo-, Netsis-, Mikro- und SAP-Systemen.', link: 'ERP-Integrationsleitfaden →' } },
    expertise: { cards: { erpIntegration: { title: 'ERP-Integration', desc: 'Individualsoftware verbunden mit Logo Tiger, Netsis, Mikro und SAP per API — Integration, keine Beratung.' } } },
    industries: { guideLink: 'Branchenleitfaden →' },
    aiAssistantPage: {
      hero: { badge: 'Enterprise KI-Assistent', title1: 'Ozturksoft', title2: 'KI-Assistent', desc: 'WhatsApp-, Web- und CRM-integrierter KI-Assistent. 24/7 Support, Vertrieb und Automatisierung — KVKK-konform, On-Premise-Option.' },
      features: {
        f1: { title: 'WhatsApp & Web', desc: '24/7 Antworten auf den Kanälen Ihrer Kunden — Türkisch NLP und GPT.' },
        f2: { title: 'CRM & ERP Anbindung', desc: 'API-Integration mit Logo, Netsis, Salesforce und Eigenentwicklungen.' },
        f3: { title: 'KVKK-konform', desc: 'On-Premise, Datenmaskierung und Audit-Logs für Unternehmenssicherheit.' },
        f4: { title: 'AI Agents', desc: 'Mehr als Q&A — autonome Aufgaben: Bestellungen, Termine, Prozesse.' },
      },
      pricing: { title: 'Preise 2026', row1: 'Basis-Chatbot (WhatsApp + Web)', row1price: '80.000 – 150.000 TRY', row2: 'CRM/ERP-integrierter KI-Assistent', row2price: '150.000 – 280.000 TRY', row3: 'Enterprise On-Premise', row3price: '280.000 – 500.000+ TRY' },
      cta: { title: 'KI-Assistent-Projekt planen', desc: 'Kostenlose Erstberatung für Kanäle, Integrationen und KVKK.', btn: 'Kostenlose Demo anfordern' },
    },
    blog: {
      meta: { date7: '16. Juli 2026' },
      cards: {
        ankaraKamuCard: { title: 'Behördensoftware in Ankara: E-Government, Ausschreibung & On-Premise KI [2026]', desc: 'Behördensoftware. E-Government, OCR, Ausschreibungsautomatisierung und on-premise KI.' },
        logoNetsisErpCard: { title: 'Logo, Netsis & SAP ERP-Integration: API, Kosten & Leitfaden [2026]', desc: 'Logo Tiger, Netsis, Mikro und SAP API-Integration — keine Beratung, Software-Anbindung.' },
        kvkkAiCard: { title: 'KVKK-konforme KI: On-Premise LLM & Datensicherheit [2026]', desc: 'KVKK-konforme KI-Architektur für Behörden, Finanz und Verteidigung.' },
      },
      posts: {
        ankaraKamu: { tag: '🏛️ Behörden', title: 'Behördensoftware in Ankara: E-Government, Ausschreibung & On-Premise KI [2026]', breadcrumb: 'Ankara Behördensoftware 2026' },
        logoNetsisErp: { tag: '🔗 ERP-Integration', title: 'Logo, Netsis & SAP ERP-Integration: API, Kosten & Leitfaden [2026]', breadcrumb: 'Logo Netsis ERP Integration 2026' },
        kvkkAi: { tag: '🔒 KVKK & KI', title: 'KVKK-konforme KI: On-Premise LLM & Datensicherheit [2026]', breadcrumb: 'KVKK-konforme KI 2026' },
      },
      cta: {
        ankaraKamu: { title: 'Behördenprojekt besprechen', desc: 'Kostenlose Erstberatung für E-Government und on-premise KI.', btn: 'Kostenlose Beratung' },
        logoNetsisErp: { title: 'ERP-Integrationsanalyse', desc: 'Kostenlose technische Bewertung für Logo, Netsis oder SAP.', btn: 'Kostenlose Analyse' },
        kvkkAi: { title: 'KVKK-konformes KI-Projekt planen', desc: 'Kostenlose Beratung für on-premise LLM.', btn: 'Kostenlose Beratung' },
      },
    },
  },
  fr: {
    references: { title: 'Partenaires de confiance', subtitle: 'Des PME aux grands groupes — marques avec lesquelles nous collaborons à Ankara et en Turquie.' },
    stats: { projects: 'Projets réalisés', satisfaction: 'Satisfaction client', support: 'Support technique 24/7', sectors: 'Expertise sectorielle', experience: "Années d'expérience" },
    testimonials: {
      title: 'Ce que disent nos clients',
      subtitle: 'Retours réels de projets réels — livraison transparente et orientée qualité.',
      t1: { quote: 'Site web et système de réservation livrés à temps. Chaque étape a été rapportée.', name: 'Ahmet K.', role: 'Tourisme & Transfert — Ankara', result: 'Réservations en ligne +40%' },
      t2: { quote: 'Le chatbot WhatsApp répond automatiquement à la plupart des questions clients.', name: 'Elif Y.', role: 'E-commerce & Retail', result: 'Charge support -35%' },
      t3: { quote: 'Processus QA et transfert du code source clairement définis au contrat.', name: 'Murat D.', role: 'Industrie — Ostim', result: 'Suivi production digitalisé' },
    },
    servicesPage: { erpNote: { title: 'Intégration ERP (Logo, Netsis, SAP)', desc: "Pas d'implémentation SAP ni de conseil ABAP. Nous développons logiciel sur mesure, chatbots et automatisation intégrés à vos systèmes Logo, Netsis, Mikro et SAP via API/RFC.", link: "Guide d'intégration ERP →" } },
    expertise: { cards: { erpIntegration: { title: 'Intégration ERP', desc: 'Logiciel sur mesure connecté à Logo Tiger, Netsis, Mikro et SAP via API — intégration, pas conseil.' } } },
    industries: { guideLink: 'Guide sectoriel →' },
    aiAssistantPage: {
      hero: { badge: 'Assistant IA Enterprise', title1: 'Ozturksoft', title2: 'Assistant IA', desc: 'Assistant IA intégré WhatsApp, web et CRM. Support 24/7, ventes et automatisation — conforme KVKK, option on-premise.' },
      features: {
        f1: { title: 'WhatsApp & Web', desc: 'Réponses 24/7 sur les canaux de vos clients — NLP turc et GPT.' },
        f2: { title: 'Connexion CRM & ERP', desc: 'Intégration API avec Logo, Netsis, Salesforce et systèmes internes.' },
        f3: { title: 'Conforme KVKK', desc: 'Déploiement on-premise, masquage des données et journaux d\'audit.' },
        f4: { title: 'AI Agents', desc: 'Au-delà du Q&R — tâches autonomes : commandes, rendez-vous, processus.' },
      },
      pricing: { title: 'Tarifs 2026', row1: 'Chatbot de base (WhatsApp + web)', row1price: '80 000 – 150 000 TRY', row2: 'Assistant IA intégré CRM/ERP', row2price: '150 000 – 280 000 TRY', row3: 'Plateforme on-premise enterprise', row3price: '280 000 – 500 000+ TRY' },
      cta: { title: 'Planifiez votre assistant IA', desc: 'Consultation gratuite pour canaux, intégrations et exigences KVKK.', btn: 'Demander une démo gratuite' },
    },
    blog: {
      meta: { date7: '16 juillet 2026' },
      cards: {
        ankaraKamuCard: { title: 'Logiciel secteur public à Ankara : e-gouvernement, appels d\'offres & IA on-premise [2026]', desc: 'Logiciel public. E-gouvernement, OCR, automatisation des appels d\'offres et IA on-premise.' },
        logoNetsisErpCard: { title: 'Intégration ERP Logo, Netsis & SAP : API, coûts & guide [2026]', desc: 'Intégration API Logo Tiger, Netsis, Mikro et SAP — pas de conseil, connexion logicielle.' },
        kvkkAiCard: { title: 'IA conforme KVKK : LLM on-premise & sécurité des données [2026]', desc: 'Architecture IA conforme KVKK pour secteur public, finance et défense.' },
      },
      posts: {
        ankaraKamu: { tag: '🏛️ Secteur public', title: 'Logiciel secteur public à Ankara : e-gouvernement, appels d\'offres & IA on-premise [2026]', breadcrumb: 'Logiciel public Ankara 2026' },
        logoNetsisErp: { tag: '🔗 Intégration ERP', title: 'Intégration ERP Logo, Netsis & SAP : API, coûts & guide [2026]', breadcrumb: 'Intégration Logo Netsis ERP 2026' },
        kvkkAi: { tag: '🔒 KVKK & IA', title: 'IA conforme KVKK : LLM on-premise & sécurité des données [2026]', breadcrumb: 'IA conforme KVKK 2026' },
      },
      cta: {
        ankaraKamu: { title: 'Discutons de votre projet public', desc: 'Consultation gratuite pour e-gouvernement et IA on-premise.', btn: 'Consultation gratuite' },
        logoNetsisErp: { title: 'Analyse d\'intégration ERP', desc: 'Évaluation technique gratuite pour Logo, Netsis ou SAP.', btn: 'Analyse gratuite' },
        kvkkAi: { title: 'Planifiez votre IA conforme KVKK', desc: 'Consultation gratuite pour LLM on-premise.', btn: 'Consultation gratuite' },
      },
    },
  },
  ar: {
    references: { title: 'شركاء نثق بهم', subtitle: 'من الشركات الصغيرة إلى المؤسسات — علامات نتعاون معها في أنقرة وتركيا.' },
    stats: { projects: 'مشاريع مكتملة', satisfaction: 'رضا العملاء', support: 'دعم فني 24/7', sectors: 'خبرة قطاعية', experience: 'سنوات الخبرة' },
    testimonials: {
      title: 'ماذا يقول عملاؤنا',
      subtitle: 'تعليقات حقيقية من مشاريع حقيقية — تسليم شفاف وموجه للجودة.',
      t1: { quote: 'تم تسليم موقعنا ونظام الحجز في الوقت المحدد. أبلغونا عن كل خطوة.', name: 'أحمد ك.', role: 'سياحة ونقل — أنقرة', result: 'الحجوزات عبر الإنترنت +40%' },
      t2: { quote: 'تكامل روبوت WhatsApp يجيب تلقائياً على معظم أسئلة العملاء.', name: 'إيليف ي.', role: 'تجارة إلكترونية', result: 'عبء الدعم -35%' },
      t3: { quote: 'عمليات QA وتسليم الكود المصدري كانت واضحة في العقد.', name: 'مراد د.', role: 'تصنيع — أوستيم', result: 'تتبع الإنتاج رقمي' },
    },
    servicesPage: { erpNote: { title: 'تكامل ERP (Logo، Netsis، SAP)', desc: 'لا نقدم تنفيذ SAP أو استشارات ABAP. نطور برمجيات مخصصة وروبوتات وأتمتة متصلة بأنظمة Logo وNetsis وMikro وSAP الحالية عبر API/RFC.', link: 'دليل تكامل ERP →' } },
    expertise: { cards: { erpIntegration: { title: 'تكامل ERP', desc: 'برمجيات مخصصة متصلة بـ Logo Tiger وNetsis وMikro وSAP عبر API — تكامل وليس استشارة.' } } },
    industries: { guideLink: 'دليل القطاع →' },
    aiAssistantPage: {
      hero: { badge: 'مساعد AI مؤسسي', title1: 'Ozturksoft', title2: 'مساعد AI', desc: 'مساعد ذكاء اصطناعي متكامل مع WhatsApp والويب وCRM. دعم 24/7 ومبيعات وأتمتة — متوافق مع KVKK، خيار on-premise.' },
      features: {
        f1: { title: 'WhatsApp والويب', desc: 'ردود 24/7 على قنوات عملائك — NLP تركي وGPT.' },
        f2: { title: 'اتصال CRM وERP', desc: 'تكامل API مع Logo وNetsis وSalesforce والأنظمة الداخلية.' },
        f3: { title: 'متوافق مع KVKK', desc: 'نشر on-premise وإخفاء البيانات وسجلات التدقيق.' },
        f4: { title: 'AI Agents', desc: 'أكثر من الأسئلة والأجوبة — مهام مستقلة: طلبات ومواعيد وعمليات.' },
      },
      pricing: { title: 'أسعار 2026', row1: 'روبوت أساسي (WhatsApp + ويب)', row1price: '80.000 – 150.000 TRY', row2: 'مساعد AI متكامل CRM/ERP', row2price: '150.000 – 280.000 TRY', row3: 'منصة on-premise مؤسسية', row3price: '280.000 – 500.000+ TRY' },
      cta: { title: 'خطط لمشروع مساعد AI', desc: 'استشارة مجانية لتقييم القنوات والتكاملات ومتطلبات KVKK.', btn: 'اطلب عرضاً مجانياً' },
    },
    blog: {
      meta: { date7: '16 يوليو 2026' },
      cards: {
        ankaraKamuCard: { title: 'برمجيات القطاع العام في أنقرة: الحكومة الإلكترونية والمناقصات وAI on-premise [2026]', desc: 'برمجيات حكومية. الحكومة الإلكترونية وOCR وأتمتة المناقصات وAI on-premise.' },
        logoNetsisErpCard: { title: 'تكامل ERP Logo وNetsis وSAP: API والتكاليف والدليل [2026]', desc: 'تكامل API مع Logo Tiger وNetsis وMikro وSAP — ليس استشارة، بل اتصال برمجي.' },
        kvkkAiCard: { title: 'دليل AI متوافق مع KVKK: LLM on-premise وأمان البيانات [2026]', desc: 'بنية AI متوافقة مع KVKK للقطاع العام والمالية والدفاع.' },
      },
      posts: {
        ankaraKamu: { tag: '🏛️ قطاع عام', title: 'برمجيات القطاع العام في أنقرة: الحكومة الإلكترونية والمناقصات وAI on-premise [2026]', breadcrumb: 'برمجيات القطاع العام أنقرة 2026' },
        logoNetsisErp: { tag: '🔗 تكامل ERP', title: 'تكامل ERP Logo وNetsis وSAP: API والتكاليف والدليل [2026]', breadcrumb: 'تكامل Logo Netsis ERP 2026' },
        kvkkAi: { tag: '🔒 KVKK وAI', title: 'دليل AI متوافق مع KVKK: LLM on-premise وأمان البيانات [2026]', breadcrumb: 'AI متوافق KVKK 2026' },
      },
      cta: {
        ankaraKamu: { title: 'لنناقش مشروع القطاع العام', desc: 'استشارة مجانية للحكومة الإلكترونية وAI on-premise.', btn: 'استشارة مجانية' },
        logoNetsisErp: { title: 'تحليل تكامل ERP', desc: 'تقييم تقني مجاني لـ Logo أو Netsis أو SAP.', btn: 'تحليل مجاني' },
        kvkkAi: { title: 'خطط لمشروع AI متوافق KVKK', desc: 'استشارة مجانية لـ LLM on-premise.', btn: 'استشارة مجانية' },
      },
    },
  },
  ru: {
    references: { title: 'Партнёры, которым мы доверяем', subtitle: 'От МСБ до корпораций — бренды, с которыми мы сотрудничаем в Анкаре и Турции.' },
    stats: { projects: 'Завершённых проектов', satisfaction: 'Удовлетворённость клиентов', support: 'Техподдержка 24/7', sectors: 'Отраслевая экспертиза', experience: 'Лет опыта' },
    testimonials: {
      title: 'Что говорят клиенты',
      subtitle: 'Реальные отзывы с реальных проектов — прозрачная качественная поставка.',
      t1: { quote: 'Сайт и система бронирования сданы в срок. Каждый шаг документировался.', name: 'Ахмет К.', role: 'Туризм и трансфер — Анкара', result: 'Онлайн-бронирования +40%' },
      t2: { quote: 'WhatsApp-чатбот автоматически отвечает на большинство вопросов клиентов.', name: 'Элиф Й.', role: 'E-commerce и ритейл', result: 'Нагрузка на поддержку -35%' },
      t3: { quote: 'QA-процессы и передача исходного кода чётко прописаны в договоре.', name: 'Мурат Д.', role: 'Производство — Остим', result: 'Учёт производства оцифрован' },
    },
    servicesPage: { erpNote: { title: 'Интеграция ERP (Logo, Netsis, SAP)', desc: 'Мы не делаем внедрение SAP и ABAP-консалтинг. Разрабатываем кастомное ПО, чатботы и автоматизацию с интеграцией в существующие Logo, Netsis, Mikro и SAP через API/RFC.' , link: 'Руководство по интеграции ERP →' } },
    expertise: { cards: { erpIntegration: { title: 'Интеграция ERP', desc: 'Кастомное ПО, подключённое к Logo Tiger, Netsis, Mikro и SAP через API — интеграция, не консалтинг.' } } },
    industries: { guideLink: 'Отраслевой гид →' },
    aiAssistantPage: {
      hero: { badge: 'Корпоративный AI-ассистент', title1: 'Ozturksoft', title2: 'AI-ассистент', desc: 'AI-ассистент с интеграцией WhatsApp, веб и CRM. Поддержка 24/7, продажи и автоматизация — KVKK, опция on-premise.' },
      features: {
        f1: { title: 'WhatsApp и веб', desc: 'Ответы 24/7 на каналах клиентов — турецкий NLP и GPT.' },
        f2: { title: 'Подключение CRM и ERP', desc: 'API-интеграция с Logo, Netsis, Salesforce и внутренними системами.' },
        f3: { title: 'Соответствие KVKK', desc: 'On-premise, маскирование данных и аудит-логи.' },
        f4: { title: 'AI Agents', desc: 'Больше чем Q&A — автономные задачи: заказы, встречи, процессы.' },
      },
      pricing: { title: 'Цены 2026', row1: 'Базовый чатбот (WhatsApp + веб)', row1price: '80 000 – 150 000 TRY', row2: 'AI-ассистент с CRM/ERP', row2price: '150 000 – 280 000 TRY', row3: 'Корпоративная on-premise платформа', row3price: '280 000 – 500 000+ TRY' },
      cta: { title: 'Спланируйте проект AI-ассистента', desc: 'Бесплатная консультация по каналам, интеграциям и KVKK.', btn: 'Запросить демо' },
    },
    blog: {
      meta: { date7: '16 июля 2026' },
      cards: {
        ankaraKamuCard: { title: 'ГосПО в Анкаре: электронное правительство, тендеры и on-premise ИИ [2026]', desc: 'Государственное ПО. E-government, OCR, автоматизация тендеров и on-premise ИИ.' },
        logoNetsisErpCard: { title: 'Интеграция ERP Logo, Netsis и SAP: API, стоимость и гид [2026]', desc: 'API-интеграция Logo Tiger, Netsis, Mikro и SAP — не консалтинг, а подключение ПО.' },
        kvkkAiCard: { title: 'ИИ с соблюдением KVKK: on-premise LLM и безопасность данных [2026]', desc: 'Архитектура ИИ с KVKK для госсектора, финансов и обороны.' },
      },
      posts: {
        ankaraKamu: { tag: '🏛️ Госсектор', title: 'ГосПО в Анкаре: электронное правительство, тендеры и on-premise ИИ [2026]', breadcrumb: 'ГосПО Анкара 2026' },
        logoNetsisErp: { tag: '🔗 Интеграция ERP', title: 'Интеграция ERP Logo, Netsis и SAP: API, стоимость и гид [2026]', breadcrumb: 'Интеграция Logo Netsis ERP 2026' },
        kvkkAi: { tag: '🔒 KVKK и ИИ', title: 'ИИ с соблюдением KVKK: on-premise LLM и безопасность данных [2026]', breadcrumb: 'ИИ с KVKK 2026' },
      },
      cta: {
        ankaraKamu: { title: 'Обсудим госпроект', desc: 'Бесплатная консультация по e-government и on-premise ИИ.', btn: 'Бесплатная консультация' },
        logoNetsisErp: { title: 'Анализ интеграции ERP', desc: 'Бесплатная оценка для Logo, Netsis или SAP.', btn: 'Бесплатный анализ' },
        kvkkAi: { title: 'Спланируйте ИИ с KVKK', desc: 'Бесплатная консультация по on-premise LLM.', btn: 'Бесплатная консультация' },
      },
    },
  },
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

for (const lang of Object.keys(PATCH)) {
  const file = path.join(i18nDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  deepMerge(data, PATCH[lang]);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  console.log(`✓ patched ${lang}.json`);
}

console.log('Phase i18n patch done.');
