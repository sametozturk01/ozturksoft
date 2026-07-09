import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const INDUSTRIES = {
  tr: {
    subtitle: 'Sektörel Uzmanlık',
    title: 'Hangi Sektörlere Hizmet Veriyoruz?',
    desc: 'Ankara ve Türkiye genelinde kamu, savunma, sağlık, finans ve daha fazlası — sektörünüze özel yazılım ve yapay zeka çözümleri.',
    public: { title: 'Kamu & Bakanlıklar', desc: 'E-devlet süreçleri, evrak OCR, on-premise AI ve güvenli kurumsal yazılım.' },
    defense: { title: 'Savunma Sanayi', desc: 'CMMI/ASPICE uyumlu QA, güvenli mimari ve özel yazılım geliştirme.' },
    health: { title: 'Sağlık & Hastane', desc: 'Hasta randevu, klinik chatbot, veri analitiği — KVKK uyumlu sağlık yazılımı.' },
    education: { title: 'Eğitim & Üniversite', desc: 'Öğrenci bilgi sistemleri, LMS, sınav otomasyonu ve kurumsal portallar.' },
    finance: { title: 'Finans & Bankacılık', desc: 'Risk analizi, dolandırıcılık tespiti, on-premise LLM ve güvenli entegrasyonlar.' },
    mfg: { title: 'İmalat & Üretim', desc: 'Kalite kontrol AI, öngörülü bakım, ERP entegrasyonu ve üretim panelleri.' },
    logistics: { title: 'Lojistik & Taşımacılık', desc: 'Filo takibi, rota optimizasyonu, depo yönetimi ve süreç otomasyonu.' },
    energy: { title: 'Enerji', desc: 'SCADA entegrasyonu, sensör analitiği, bakım planlama ve raporlama sistemleri.' },
    construction: { title: 'İnşaat & Müteahhitlik', desc: 'Proje yönetimi, şantiye takibi, ihale ve evrak otomasyonu yazılımları.' },
    tourism: { title: 'Turizm & Otel', desc: 'Rezervasyon sistemleri, çok dilli chatbot ve misafir deneyimi otomasyonu.' },
    retail: { title: 'E-ticaret & Perakende', desc: 'Online mağaza, ürün öneri motoru, stok ve CRM entegrasyonu.' },
    legal: { title: 'Hukuk & Danışmanlık', desc: 'Sözleşme OCR, doküman arama, iç bilgi tabanı ve LLM asistanları.' },
    agri: { title: 'Tarım & Gıda', desc: 'Tedarik zinciri, izlenebilirlik, stok ve kalite kontrol yazılımları.' },
    telecom: { title: 'Telekom', desc: 'Müşteri self-servis, chatbot, faturalama entegrasyonu ve operasyon panelleri.' },
    auto: { title: 'Otomotiv', desc: 'Bayi yönetimi, yedek parça stok, servis randevu ve CRM sistemleri.' },
    realestate: { title: 'Gayrimenkul', desc: 'Portföy yönetimi, ilan platformları, müşteri eşleştirme ve sözleşme takibi.' },
  },
  en: {
    subtitle: 'Industry Expertise',
    title: 'Industries We Serve',
    desc: 'Public sector, defense, healthcare, finance and more across Ankara and Turkey — sector-specific software and AI.',
    public: { title: 'Government & Ministries', desc: 'E-government workflows, document OCR, on-premise AI and secure enterprise software.' },
    defense: { title: 'Defense Industry', desc: 'CMMI/ASPICE-compliant QA, secure architecture and custom software development.' },
    health: { title: 'Healthcare & Hospitals', desc: 'Patient scheduling, clinical chatbots, analytics — GDPR/KVKK-compliant health software.' },
    education: { title: 'Education & Universities', desc: 'Student information systems, LMS, exam automation and institutional portals.' },
    finance: { title: 'Finance & Banking', desc: 'Risk analysis, fraud detection, on-premise LLM and secure integrations.' },
    mfg: { title: 'Manufacturing & Production', desc: 'Quality-control AI, predictive maintenance, ERP integration and production dashboards.' },
    logistics: { title: 'Logistics & Transport', desc: 'Fleet tracking, route optimization, warehouse management and process automation.' },
    energy: { title: 'Energy', desc: 'SCADA integration, sensor analytics, maintenance planning and reporting systems.' },
    construction: { title: 'Construction & Contracting', desc: 'Project management, site tracking, procurement and document automation software.' },
    tourism: { title: 'Tourism & Hospitality', desc: 'Booking systems, multilingual chatbots and guest experience automation.' },
    retail: { title: 'E-commerce & Retail', desc: 'Online stores, recommendation engines, inventory and CRM integration.' },
    legal: { title: 'Legal & Consulting', desc: 'Contract OCR, document search, internal knowledge bases and LLM assistants.' },
    agri: { title: 'Agriculture & Food', desc: 'Supply chain, traceability, inventory and quality-control software.' },
    telecom: { title: 'Telecom', desc: 'Customer self-service, chatbots, billing integration and operations dashboards.' },
    auto: { title: 'Automotive', desc: 'Dealer management, spare-parts inventory, service booking and CRM systems.' },
    realestate: { title: 'Real Estate', desc: 'Portfolio management, listing platforms, client matching and contract tracking.' },
  },
  de: {
    subtitle: 'Branchenkompetenz',
    title: 'Branchen, die wir bedienen',
    desc: 'Öffentlicher Sektor, Verteidigung, Gesundheit, Finanzen und mehr — branchenspezifische Software und KI in Ankara und der Türkei.',
    public: { title: 'Behörden & Ministerien', desc: 'E-Government, Dokumenten-OCR, On-Premise-KI und sichere Unternehmenssoftware.' },
    defense: { title: 'Verteidigungsindustrie', desc: 'CMMI/ASPICE-konforme QA, sichere Architektur und Individualsoftware.' },
    health: { title: 'Gesundheit & Krankenhäuser', desc: 'Patiententermine, klinische Chatbots, Analytik — DSGVO/KVKK-konform.' },
    education: { title: 'Bildung & Universitäten', desc: 'Studenteninformationssysteme, LMS, Prüfungsautomatisierung und Portale.' },
    finance: { title: 'Finanzen & Banken', desc: 'Risikoanalyse, Betrugserkennung, On-Premise-LLM und sichere Integrationen.' },
    mfg: { title: 'Fertigung & Produktion', desc: 'Qualitätskontrolle-KI, vorausschauende Wartung, ERP-Integration und Dashboards.' },
    logistics: { title: 'Logistik & Transport', desc: 'Flottenverfolgung, Routenoptimierung, Lagerverwaltung und Automatisierung.' },
    energy: { title: 'Energie', desc: 'SCADA-Integration, Sensoranalytik, Wartungsplanung und Berichtssysteme.' },
    construction: { title: 'Bau & Generalunternehmen', desc: 'Projektmanagement, Baustellenverfolgung, Vergabe- und Aktenautomatisierung.' },
    tourism: { title: 'Tourismus & Hotellerie', desc: 'Buchungssysteme, mehrsprachige Chatbots und Gästeerlebnis-Automatisierung.' },
    retail: { title: 'E-Commerce & Einzelhandel', desc: 'Online-Shops, Empfehlungsmotoren, Bestand und CRM-Integration.' },
    legal: { title: 'Recht & Beratung', desc: 'Vertrags-OCR, Dokumentensuche, Wissensdatenbanken und LLM-Assistenten.' },
    agri: { title: 'Landwirtschaft & Lebensmittel', desc: 'Lieferkette, Rückverfolgbarkeit, Bestand und Qualitätskontrolle.' },
    telecom: { title: 'Telekommunikation', desc: 'Kunden-Self-Service, Chatbots, Abrechnungsintegration und Operations-Dashboards.' },
    auto: { title: 'Automobil', desc: 'Händlerverwaltung, Ersatzteillager, Servicebuchung und CRM-Systeme.' },
    realestate: { title: 'Immobilien', desc: 'Portfoliomanagement, Listing-Plattformen, Kundenmatching und Vertragsverfolgung.' },
  },
  fr: {
    subtitle: 'Expertise sectorielle',
    title: 'Secteurs que nous servons',
    desc: 'Secteur public, défense, santé, finance et plus — logiciel et IA adaptés à votre secteur à Ankara et en Turquie.',
    public: { title: 'Administrations & Ministères', desc: 'E-gouvernement, OCR documentaire, IA on-premise et logiciel sécurisé.' },
    defense: { title: 'Industrie de défense', desc: 'QA conforme CMMI/ASPICE, architecture sécurisée et logiciel sur mesure.' },
    health: { title: 'Santé & Hôpitaux', desc: 'Rendez-vous patients, chatbots cliniques, analytique — conforme RGPD/KVKK.' },
    education: { title: 'Éducation & Universités', desc: 'Systèmes étudiants, LMS, automatisation des examens et portails institutionnels.' },
    finance: { title: 'Finance & Banque', desc: 'Analyse des risques, détection de fraude, LLM on-premise et intégrations sécurisées.' },
    mfg: { title: 'Industrie & Production', desc: 'IA contrôle qualité, maintenance prédictive, intégration ERP et tableaux de bord.' },
    logistics: { title: 'Logistique & Transport', desc: 'Suivi de flotte, optimisation des routes, entrepôt et automatisation.' },
    energy: { title: 'Énergie', desc: 'Intégration SCADA, analytique capteurs, planification maintenance et rapports.' },
    construction: { title: 'BTP & Contractants', desc: 'Gestion de projet, suivi de chantier, marchés publics et automatisation documentaire.' },
    tourism: { title: 'Tourisme & Hôtellerie', desc: 'Réservations, chatbots multilingues et automatisation de l\'expérience client.' },
    retail: { title: 'E-commerce & Retail', desc: 'Boutiques en ligne, moteurs de recommandation, stock et intégration CRM.' },
    legal: { title: 'Juridique & Conseil', desc: 'OCR contrats, recherche documentaire, bases de connaissances et assistants LLM.' },
    agri: { title: 'Agriculture & Agroalimentaire', desc: 'Chaîne d\'approvisionnement, traçabilité, stock et contrôle qualité.' },
    telecom: { title: 'Télécoms', desc: 'Self-service client, chatbots, facturation et tableaux de bord opérationnels.' },
    auto: { title: 'Automobile', desc: 'Gestion concessionnaires, pièces détachées, réservation service et CRM.' },
    realestate: { title: 'Immobilier', desc: 'Gestion de portefeuille, plateformes d\'annonces, matching clients et contrats.' },
  },
  ar: {
    subtitle: 'خبرة قطاعية',
    title: 'القطاعات التي نخدمها',
    desc: 'القطاع العام والدفاع والصحة والمالية والمزيد — برمجيات وذكاء اصطناعي مخصص لقطاعك في أنقرة وتركيا.',
    public: { title: 'الحكومة والوزارات', desc: 'الحكومة الإلكترونية، OCR للمستندات، ذكاء اصطناعي محلي وبرمجيات آمنة.' },
    defense: { title: 'صناعة الدفاع', desc: 'ضمان جودة CMMI/ASPICE، بنية آمنة وتطوير برمجيات مخصصة.' },
    health: { title: 'الصحة والمستشفيات', desc: 'مواعيد المرضى، روبوتات سريرية، تحليلات — برمجيات صحية متوافقة مع KVKK.' },
    education: { title: 'التعليم والجامعات', desc: 'أنظمة معلومات الطلاب، LMS، أتمتة الامتحانات والبوابات المؤسسية.' },
    finance: { title: 'المالية والمصارف', desc: 'تحليل المخاطر، كشف الاحتيال، LLM محلي وتكاملات آمنة.' },
    mfg: { title: 'التصنيع والإنتاج', desc: 'ذكاء اصطناعي لمراقبة الجودة، صيانة تنبؤية، تكامل ERP ولوحات إنتاج.' },
    logistics: { title: 'اللوجستيات والنقل', desc: 'تتبع الأسطول، تحسين المسارات، إدارة المستودعات وأتمتة العمليات.' },
    energy: { title: 'الطاقة', desc: 'تكامل SCADA، تحليلات الحساسات، تخطيط الصيانة وأنظمة التقارير.' },
    construction: { title: 'البناء والمقاولات', desc: 'إدارة المشاريع، تتبع المواقع، المناقصات وأتمتة المستندات.' },
    tourism: { title: 'السياحة والفنادق', desc: 'أنظمة الحجز، روبوتات متعددة اللغات وأتمتة تجربة الضيوف.' },
    retail: { title: 'التجارة الإلكترونية والتجزئة', desc: 'متاجر إلكترونية، محركات توصية، مخزون وتكامل CRM.' },
    legal: { title: 'القانون والاستشارات', desc: 'OCR للعقود، بحث المستندات، قواعد المعرفة ومساعدو LLM.' },
    agri: { title: 'الزراعة والأغذية', desc: 'سلسلة التوريد، التتبع، المخزون ومراقبة الجودة.' },
    telecom: { title: 'الاتصالات', desc: 'خدمة ذاتية للعملاء، روبوتات، تكامل الفوترة ولوحات العمليات.' },
    auto: { title: 'السيارات', desc: 'إدارة الوكلاء، مخزون قطع الغيار، حجز الصيانة وأنظمة CRM.' },
    realestate: { title: 'العقارات', desc: 'إدارة المحافظ، منصات الإعلانات، مطابقة العملاء وتتبع العقود.' },
  },
  ru: {
    subtitle: 'Отраслевая экспертиза',
    title: 'Отрасли, которым мы служим',
    desc: 'Госсектор, оборона, здравоохранение, финансы и другие — ПО и ИИ под вашу отрасль в Анкаре и Турции.',
    public: { title: 'Государство и министерства', desc: 'Электронное правительство, OCR документов, on-premise ИИ и безопасное ПО.' },
    defense: { title: 'Оборонная промышленность', desc: 'QA по CMMI/ASPICE, безопасная архитектура и ПО на заказ.' },
    health: { title: 'Здравоохранение и больницы', desc: 'Запись пациентов, клинические чатботы, аналитика — ПО с соблюдением KVKK.' },
    education: { title: 'Образование и вузы', desc: 'Системы студентов, LMS, автоматизация экзаменов и порталы.' },
    finance: { title: 'Финансы и банки', desc: 'Анализ рисков, обнаружение мошенничества, on-premise LLM и интеграции.' },
    mfg: { title: 'Производство', desc: 'ИИ контроля качества, предиктивное обслуживание, ERP и дашборды.' },
    logistics: { title: 'Логистика и транспорт', desc: 'Отслеживание автопарка, маршруты, склад и автоматизация процессов.' },
    energy: { title: 'Энергетика', desc: 'Интеграция SCADA, аналитика датчиков, планирование ТО и отчётность.' },
    construction: { title: 'Строительство', desc: 'Управление проектами, учёт на объектах, тендеры и автоматизация документов.' },
    tourism: { title: 'Туризм и отели', desc: 'Бронирование, многоязычные чатботы и автоматизация гостевого сервиса.' },
    retail: { title: 'E-commerce и ритейл', desc: 'Интернет-магазины, рекомендации, склад и интеграция CRM.' },
    legal: { title: 'Юриспруденция и консалтинг', desc: 'OCR договоров, поиск документов, базы знаний и LLM-ассистенты.' },
    agri: { title: 'Сельское хозяйство и пища', desc: 'Цепочка поставок, прослеживаемость, склад и контроль качества.' },
    telecom: { title: 'Телеком', desc: 'Самообслуживание, чатботы, биллинг и операционные панели.' },
    auto: { title: 'Автомобильная отрасль', desc: 'Дилеры, запчасти, сервисная запись и CRM.' },
    realestate: { title: 'Недвижимость', desc: 'Управление портфелем, площадки объявлений, подбор клиентов и договоры.' },
  },
};

const KEYS = ['public', 'defense', 'health', 'education', 'finance', 'mfg', 'logistics', 'energy', 'construction', 'tourism', 'retail', 'legal', 'agri', 'telecom', 'auto', 'realestate'];

const ICONS = {
  public: 'fa-landmark',
  defense: 'fa-shield-halved',
  health: 'fa-hospital',
  education: 'fa-graduation-cap',
  finance: 'fa-chart-line',
  mfg: 'fa-industry',
  logistics: 'fa-truck',
  energy: 'fa-bolt',
  construction: 'fa-helmet-safety',
  tourism: 'fa-hotel',
  retail: 'fa-cart-shopping',
  legal: 'fa-scale-balanced',
  agri: 'fa-seedling',
  telecom: 'fa-tower-cell',
  auto: 'fa-car',
  realestate: 'fa-city',
};

for (const lang of ['tr', 'en', 'de', 'fr', 'ar', 'ru']) {
  const file = path.join(root, 'src/i18n', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const src = INDUSTRIES[lang];
  const items = {};
  for (const k of KEYS) {
    items[k] = { title: src[k].title, desc: src[k].desc };
  }
  data.industries = {
    subtitle: src.subtitle,
    title: src.title,
    desc: src.desc,
    items,
  };
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  console.log(`✓ ${lang}.json`);
}

// Export HTML snippet for reference
const cards = KEYS.map(
  (k) => `                <div class="card industry-card" style="padding: 24px;">
                    <div class="icon-box" style="margin-bottom: 12px;"><i class="fas ${ICONS[k]} icon" style="font-size: 1.4rem;"></i></div>
                    <h3 style="font-size: 1.05rem; margin-bottom: 8px;" data-i18n="industries.items.${k}.title">${INDUSTRIES.tr[k].title}</h3>
                    <p style="color: var(--text-dim); font-size: 0.88rem; line-height: 1.6; margin: 0;" data-i18n="industries.items.${k}.desc">${INDUSTRIES.tr[k].desc}</p>
                </div>`
).join('\n');

const section = `<section class="industries-section" style="padding: 60px 8% 70px; background: var(--dark-bg);">
            <div class="section-header">
                <span style="text-transform: uppercase; letter-spacing: 3px; color: var(--primary); font-weight: 700; font-size: 0.85rem; display: block; margin-bottom: 10px;" data-i18n="industries.subtitle">Sektörel Uzmanlık</span>
                <h2 data-i18n="industries.title">Hangi Sektörlere Hizmet Veriyoruz?</h2>
                <p style="color: var(--text-dim); max-width: 760px; margin: 12px auto 0;" data-i18n="industries.desc">Ankara ve Türkiye genelinde kamu, savunma, sağlık, finans ve daha fazlası.</p>
            </div>
            <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px;">
${cards}
            </div>
        </section>`;

fs.writeFileSync(path.join(root, 'scripts/.industries-section.html'), section);
console.log('HTML snippet → scripts/.industries-section.html');
