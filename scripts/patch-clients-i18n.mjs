import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const PATCH = {
  tr: {
    heroSubtitle: 'Kurumlar, devlet daireleri ve işletmeler için Ankara merkezli yapay zeka, özel yazılım ve dijital dönüşüm çözümleri.',
    expertiseSubtitle: 'Kurumlar & Kamu İçin Yazılım & AI',
    servicesHeroDesc: 'Kurumlardan devlet dairelerine, KOBİ\'lerden girişimlere — KVKK uyumlu, ölçeklenebilir dijital dönüşüm. Fikirden canlıya, her adımda yanınızdayız.',
    aiHeroDesc: 'Kurumlar ve devlet daireleri için on-premise AI, belge dijitalleştirme, süreç otomasyonu ve kurumsal yazılım. Veriniz güvende, süreçleriniz akıllı.',
    clients: {
      subtitle: 'Kurumsal & Kamu Odaklı',
      title: 'Kime Hizmet Veriyoruz?',
      desc: 'Holdingler, kamu kurumları ve özel sektör için aynı QA disiplini ve KVKK uyumlu mimari.',
      enterprise: {
        title: 'Kurumlar & Holdingler',
        desc: 'ERP, CRM, kurumsal web, AI agents ve mobil — binlerce kullanıcıya ölçeklenen, denetlenebilir sistemler.',
        li1: 'Kurumsal ERP & CRM entegrasyonu',
        li2: 'Çok birimli yönetim panelleri',
      },
      government: {
        badge: 'KAMU & DEVLET',
        title: 'Devlet Daireleri & Kamu Kurumları',
        desc: 'On-premise yapay zeka, OCR, e-devlet süreçleri ve güvenli yazılım — veriler kurum içinde kalır.',
        li1: 'Belge OCR & dijital arşiv',
        li2: 'İhale, evrak ve süreç otomasyonu',
      },
      sme: {
        title: 'KOBİ & Girişimler',
        desc: 'SaaS MVP, chatbot ve hızlı dijital dönüşüm — şeffaf bütçe ve kısa teslim süreleri.',
        li1: 'Flutter & web MVP',
        li2: 'WhatsApp chatbot & otomasyon',
      },
    },
    sectors: {
      title1: 'Kurumlara &',
      title2: 'Devlet Dairelerine',
      title3: 'Özel Çözümler',
      desc: 'Holdingler, bakanlıklar, belediyeler, üniversiteler ve KOBİ\'ler için KVKK uyumlu yapay zeka ve yazılım.',
      badge: 'KURUMSAL & KAMU',
      s1: {
        title: 'Kurumlar & Holdingler',
        li1t: 'Kurumsal AI & LLM Entegrasyonu',
        li1d: 'On-premise veya özel bulutta çalışan, denetlenebilir kurumsal yapay zeka sistemleri.',
        li2t: 'ERP / CRM Özel Yazılım',
        li2d: 'Logo, Netsis, SAP ve özel sistemlere entegre kurumsal uygulamalar.',
      },
      s2: {
        title: 'Devlet Daireleri & Kamu',
        li1t: 'Belge OCR & Evrak Dijitalleştirme',
        li1d: 'Fatura, sözleşme ve kurum evraklarının otomatik okunması ve arşivlenmesi.',
        li2t: 'Güvenli On-Premise AI',
        li2d: 'Veri dışarı çıkmadan çalışan, KVKK ve kamu güvenlik standartlarına uygun mimari.',
      },
      s3: {
        title: 'KOBİ & Özel Sektör',
        li1t: 'Chatbot & Süreç Otomasyonu',
        li1d: 'WhatsApp ve web üzerinden 7/24 müşteri desteği ve operasyon otomasyonu.',
        li2t: 'SaaS & Mobil MVP',
        li2d: 'Hızlı piyasaya çıkış için Flutter, Laravel ve bulut tabanlı ürünler.',
      },
    },
  },
  en: {
    heroSubtitle: 'AI, custom software and digital transformation for enterprises, government agencies and businesses — based in Ankara, Turkey.',
    expertiseSubtitle: 'Software & AI for Enterprise & Public Sector',
    servicesHeroDesc: 'From enterprises and government to SMEs and startups — GDPR/KVKK-compliant, scalable digital transformation from idea to production.',
    aiHeroDesc: 'On-premise AI, document digitization, process automation and enterprise software for institutions and government agencies.',
    clients: {
      subtitle: 'Enterprise & Public Sector Focus',
      title: 'Who We Serve',
      desc: 'Same QA discipline and compliant architecture for holdings, public institutions and the private sector.',
      enterprise: { title: 'Enterprises & Holdings', desc: 'ERP, CRM, corporate web, AI agents and mobile — scalable, auditable systems for thousands of users.', li1: 'Enterprise ERP & CRM integration', li2: 'Multi-department admin panels' },
      government: { badge: 'GOVERNMENT & PUBLIC', title: 'Government Agencies & Public Sector', desc: 'On-premise AI, OCR, e-government workflows and secure software — data stays in-house.', li1: 'Document OCR & digital archive', li2: 'Procurement & paperwork automation' },
      sme: { title: 'SMEs & Startups', desc: 'SaaS MVP, chatbots and fast digital transformation — transparent budgets and short delivery cycles.', li1: 'Flutter & web MVP', li2: 'WhatsApp chatbot & automation' },
    },
    sectors: {
      title1: 'Solutions for',
      title2: 'Enterprises &',
      title3: 'Government',
      desc: 'KVKK-compliant AI and software for holdings, ministries, municipalities, universities and SMEs.',
      badge: 'ENTERPRISE & PUBLIC',
      s1: { title: 'Enterprises & Holdings', li1t: 'Enterprise AI & LLM Integration', li1d: 'Auditable corporate AI on-premise or in private cloud.', li2t: 'ERP / CRM Custom Software', li2d: 'Enterprise apps integrated with Logo, SAP and custom systems.' },
      s2: { title: 'Government & Public Sector', li1t: 'Document OCR & Digitization', li1d: 'Automated reading and archiving of invoices, contracts and official documents.', li2t: 'Secure On-Premise AI', li2d: 'Architecture compliant with public-sector security — data never leaves your network.' },
      s3: { title: 'SMEs & Private Sector', li1t: 'Chatbot & Process Automation', li1d: '24/7 customer support and operations automation via WhatsApp and web.', li2t: 'SaaS & Mobile MVP', li2d: 'Fast time-to-market with Flutter, Laravel and cloud products.' },
    },
  },
  de: {
    heroSubtitle: 'KI, Individualsoftware und digitale Transformation für Unternehmen, Behörden und KMU — Sitz in Ankara, Türkei.',
    expertiseSubtitle: 'Software & KI für Unternehmen & Öffentlichen Sektor',
    servicesHeroDesc: 'Von Konzernen und Behörden bis KMU — DSGVO/KVKK-konforme, skalierbare digitale Transformation.',
    aiHeroDesc: 'On-Premise-KI, Dokumentendigitalisierung und Automatisierung für Institutionen und Behörden.',
    clients: {
      subtitle: 'Fokus Unternehmen & Öffentlicher Sektor',
      title: 'Für wen wir arbeiten',
      desc: 'Gleiche QA-Disziplin für Holdings, Behörden und Privatwirtschaft.',
      enterprise: { title: 'Unternehmen & Holdings', desc: 'ERP, CRM, Corporate Web, AI Agents und Mobile — skalierbare Systeme.', li1: 'ERP- & CRM-Integration', li2: 'Multi-Abteilungs-Panels' },
      government: { badge: 'BEHÖRDEN & STAAT', title: 'Behörden & Öffentlicher Sektor', desc: 'On-Premise-KI, OCR und sichere Software — Daten bleiben intern.', li1: 'Dokumenten-OCR & Archiv', li2: 'Vergabe- & Aktenautomatisierung' },
      sme: { title: 'KMU & Startups', desc: 'SaaS-MVP, Chatbot und schnelle Digitalisierung.', li1: 'Flutter & Web-MVP', li2: 'WhatsApp-Chatbot' },
    },
    sectors: {
      title1: 'Lösungen für',
      title2: 'Unternehmen &',
      title3: 'Behörden',
      desc: 'KVKK-konforme KI und Software für Holdings, Ministerien, Kommunen und KMU.',
      badge: 'UNTERNEHMEN & STAAT',
      s1: { title: 'Unternehmen & Holdings', li1t: 'Enterprise AI & LLM', li1d: 'Prüfbare KI On-Premise oder Private Cloud.', li2t: 'ERP / CRM Individualsoftware', li2d: 'Integration mit Logo, SAP und Eigenentwicklungen.' },
      s2: { title: 'Behörden & Öffentlicher Sektor', li1t: 'Dokumenten-OCR', li1d: 'Automatische Erfassung von Rechnungen und Verwaltungsakten.', li2t: 'Sichere On-Premise-KI', li2d: 'Daten verlassen nicht das Behördennetz.' },
      s3: { title: 'KMU & Privatwirtschaft', li1t: 'Chatbot & Automatisierung', li1d: '24/7-Support über WhatsApp und Web.', li2t: 'SaaS & Mobile MVP', li2d: 'Schneller Marktstart mit Flutter und Laravel.' },
    },
  },
  fr: {
    heroSubtitle: 'IA, logiciel sur mesure et transformation digitale pour entreprises, administrations publiques et PME — basés à Ankara.',
    expertiseSubtitle: 'Logiciel & IA pour Entreprises & Secteur Public',
    servicesHeroDesc: 'Des groupes aux administrations publiques et PME — transformation digitale conforme RGPD/KVKK.',
    aiHeroDesc: 'IA on-premise, numérisation documentaire et automatisation pour institutions et administrations.',
    clients: {
      subtitle: 'Focus Entreprise & Secteur Public',
      title: 'À qui nous nous adressons',
      desc: 'Même discipline QA pour holdings, institutions publiques et secteur privé.',
      enterprise: { title: 'Entreprises & Holdings', desc: 'ERP, CRM, web corporate, agents IA et mobile — systèmes scalables.', li1: 'Intégration ERP & CRM', li2: 'Panels multi-services' },
      government: { badge: 'ADMINISTRATION PUBLIQUE', title: 'Administrations & Secteur Public', desc: 'IA on-premise, OCR et logiciel sécurisé — données en interne.', li1: 'OCR & archivage numérique', li2: 'Automatisation des dossiers' },
      sme: { title: 'PME & Startups', desc: 'MVP SaaS, chatbot et transformation rapide.', li1: 'MVP Flutter & web', li2: 'Chatbot WhatsApp' },
    },
    sectors: {
      title1: 'Solutions pour',
      title2: 'Entreprises &',
      title3: 'Administrations',
      desc: 'IA et logiciel conforme KVKK pour holdings, ministères, municipalités et PME.',
      badge: 'ENTREPRISE & PUBLIC',
      s1: { title: 'Entreprises & Holdings', li1t: 'IA d\'entreprise & LLM', li1d: 'IA auditable on-premise ou cloud privé.', li2t: 'ERP / CRM sur mesure', li2d: 'Intégration Logo, SAP et systèmes internes.' },
      s2: { title: 'Administrations & Secteur Public', li1t: 'OCR documentaire', li1d: 'Lecture automatique des factures et documents officiels.', li2t: 'IA on-premise sécurisée', li2d: 'Données qui ne quittent pas le réseau institutionnel.' },
      s3: { title: 'PME & Secteur Privé', li1t: 'Chatbot & automatisation', li1d: 'Support 24/7 via WhatsApp et web.', li2t: 'MVP SaaS & mobile', li2d: 'Time-to-market rapide avec Flutter et Laravel.' },
    },
  },
  ar: {
    heroSubtitle: 'ذكاء اصطناعي وبرمجيات مخصصة وتحول رقمي للمؤسسات والدوائر الحكومية والشركات — مقرنا أنقرة.',
    expertiseSubtitle: 'برمجيات وذكاء اصطناعي للمؤسسات والقطاع العام',
    servicesHeroDesc: 'من المؤسسات والجهات الحكومية إلى الشركات الصغيرة — تحول رقمي متوافق مع KVKK.',
    aiHeroDesc: 'ذكاء اصطناعي محلي، رقمنة المستندات وأتمتة للمؤسسات والدوائر الحكومية.',
    clients: {
      subtitle: 'تركيز مؤسسي وحكومي',
      title: 'من نخدم',
      desc: 'نفس انضباط ضمان الجودة للمؤسسات والقطاع العام والقطاع الخاص.',
      enterprise: { title: 'المؤسسات والشركات القابضة', desc: 'ERP وCRM وويب مؤسسي ووكلاء AI وتطبيقات جوال.', li1: 'تكامل ERP وCRM', li2: 'لوحات إدارة متعددة' },
      government: { badge: 'القطاع الحكومي', title: 'الدوائر الحكومية والقطاع العام', desc: 'ذكاء اصطناعي محلي وOCR وبرمجيات آمنة — البيانات داخل المؤسسة.', li1: 'OCR وأرشفة رقمية', li2: 'أتمتة المناقصات والمستندات' },
      sme: { title: 'الشركات الصغيرة والناشئة', desc: 'MVP SaaS وروبوت محادثة وتحول رقمي سريع.', li1: 'MVP Flutter وويب', li2: 'روبوت WhatsApp' },
    },
    sectors: {
      title1: 'حلول للمؤسسات',
      title2: 'والدوائر',
      title3: 'الحكومية',
      desc: 'ذكاء اصطناعي وبرمجيات متوافقة مع KVKK للمؤسسات والوزارات والبلديات.',
      badge: 'مؤسسي وحكومي',
      s1: { title: 'المؤسسات والشركات القابضة', li1t: 'ذكاء اصطناعي مؤسسي', li1d: 'أنظمة AI قابلة للتدقيق على الخوادم المحلية.', li2t: 'ERP / CRM مخصص', li2d: 'تكامل مع Logo وSAP والأنظمة الداخلية.' },
      s2: { title: 'الدوائر الحكومية', li1t: 'OCR و رقمنة المستندات', li1d: 'قراءة وأرشفة الفواتير والعقود الرسمية.', li2t: 'ذكاء اصطناعي آمن محلي', li2d: 'البيانات لا تغادر شبكة المؤسسة.' },
      s3: { title: 'الشركات الصغيرة', li1t: 'روبوت محادثة وأتمتة', li1d: 'دعم 24/7 عبر WhatsApp والويب.', li2t: 'MVP SaaS وجوال', li2d: 'إطلاق سريع مع Flutter وLaravel.' },
    },
  },
  ru: {
    heroSubtitle: 'ИИ, ПО на заказ и цифровая трансформация для предприятий, госорганов и бизнеса — офис в Анкаре.',
    expertiseSubtitle: 'ПО и ИИ для предприятий и госсектора',
    servicesHeroDesc: 'От холдингов и госструктур до МСП — масштабируемая цифровая трансформация с соблюдением KVKK.',
    aiHeroDesc: 'Локальный ИИ, оцифровка документов и автоматизация для учреждений и госорганов.',
    clients: {
      subtitle: 'Фокус: корпорации и госсектор',
      title: 'Кому мы помогаем',
      desc: 'Единая QA-дисциплина для холдингов, госсектора и частного бизнеса.',
      enterprise: { title: 'Предприятия и холдинги', desc: 'ERP, CRM, корпоративный web, AI agents и мобильные приложения.', li1: 'Интеграция ERP и CRM', li2: 'Панели для подразделений' },
      government: { badge: 'ГОССЕКТОР', title: 'Госорганы и госсектор', desc: 'Локальный ИИ, OCR и безопасное ПО — данные остаются внутри.', li1: 'OCR и цифровой архив', li2: 'Автоматизация закупок и документов' },
      sme: { title: 'МСП и стартапы', desc: 'SaaS MVP, чатботы и быстрая цифровизация.', li1: 'Flutter и web MVP', li2: 'WhatsApp-чатбот' },
    },
    sectors: {
      title1: 'Решения для',
      title2: 'предприятий и',
      title3: 'госсектора',
      desc: 'ИИ и ПО с соблюдением KVKK для холдингов, министерств, муниципалитетов и МСП.',
      badge: 'КОРПОРАЦИИ И ГОССЕКТОР',
      s1: { title: 'Предприятия и холдинги', li1t: 'Корпоративный ИИ и LLM', li1d: 'Аудируемый ИИ on-premise или в частном облаке.', li2t: 'ERP / CRM на заказ', li2d: 'Интеграция с Logo, SAP и внутренними системами.' },
      s2: { title: 'Госорганы и госсектор', li1t: 'OCR и оцифровка документов', li1d: 'Автоматическое чтение счетов и официальных документов.', li2t: 'Безопасный локальный ИИ', li2d: 'Данные не покидают сеть учреждения.' },
      s3: { title: 'МСП и частный сектор', li1t: 'Чатбот и автоматизация', li1d: 'Поддержка 24/7 через WhatsApp и web.', li2t: 'SaaS и mobile MVP', li2d: 'Быстрый выход на рынок с Flutter и Laravel.' },
    },
  },
};

for (const [lang, p] of Object.entries(PATCH)) {
  const file = path.join(root, 'src/i18n', `${lang}.json`);
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  json.hero.subtitle = p.heroSubtitle;
  json.expertise.subtitle = p.expertiseSubtitle;
  json.servicesPage.hero.desc = p.servicesHeroDesc;
  json.aiPage.hero.desc = p.aiHeroDesc;
  json.clients = p.clients;
  Object.assign(json.aiPage.sectors, p.sectors);
  fs.writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
  console.log(`✓ ${lang}.json`);
}
