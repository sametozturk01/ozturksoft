import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const langs = ['tr', 'en', 'de', 'fr', 'ar', 'ru'];

const patches = {
  tr: {
    cards: {
      ankaraAiSecimCard: { title: "Ankara'da Yapay Zeka Firması Nasıl Seçilir? [2026 Rehberi]", desc: 'LLM deneyimi, KVKK, on-premise, referans ve teklif karşılaştırması. AI firması seçim kontrol listesi.' },
      ankaraAiKarsilastirmaCard: { title: 'Ankara Yapay Zeka Firmaları Karşılaştırması [2026]', desc: 'LLM, chatbot, on-premise, KVKK ve fiyat — objektif değerlendirme tablosu.' },
      ankaraLlmMaliyetCard: { title: 'Ankara LLM Entegrasyonu Maliyeti [2026]', desc: 'GPT/Claude API, RAG, chatbot ve on-premise AI fiyat aralıkları. Gizli maliyetler.' },
    },
    posts: {
      ankaraAiSecim: { tag: '🤖 Yapay Zeka', title: "Ankara'da Yapay Zeka Firması Nasıl Seçilir? [2026 Rehberi]", breadcrumb: 'AI Firması Seçimi 2026', metaDesc: "Ankara'da yapay zeka firması seçerken LLM, KVKK, on-premise ve referans kriterleri. 2026 pratik rehber." },
      ankaraAiKarsilastirma: { tag: '🤖 Yapay Zeka', title: 'Ankara Yapay Zeka Firmaları Karşılaştırması [2026]', breadcrumb: 'AI Firmaları Karşılaştırma', metaDesc: 'Ankara yapay zeka firmaları karşılaştırması: LLM, KVKK, on-premise ve fiyat tablosu.' },
      ankaraLlmMaliyet: { tag: '💰 Maliyet', title: 'Ankara LLM Entegrasyonu Maliyeti [2026]', breadcrumb: 'LLM Maliyeti Ankara', metaDesc: 'Ankara LLM entegrasyonu maliyeti 2026: GPT, RAG, chatbot ve on-premise fiyat tablosu.' },
    },
    cta: {
      ankaraAiSecim: { title: 'Doğru AI Partnerini Birlikte Bulalım', desc: 'LLM kapsamı, KVKK ve bütçenizi değerlendirmek için ücretsiz danışmanlık.', btn: 'Ücretsiz Danışmanlık' },
      ankaraAiKarsilastirma: { title: 'Ankara AI Projeniz İçin Teklif Alın', desc: 'Karşılaştırma sonrası size özel LLM ve entegrasyon teklifi hazırlayalım.', btn: 'Ücretsiz Teklif' },
      ankaraLlmMaliyet: { title: 'LLM Projeniz İçin Net Fiyat Alın', desc: 'Kapsamınıza göre özel LLM entegrasyon teklifi — gizli maliyet yok.', btn: 'Ücretsiz Teklif' },
    },
    meta: { date8: '1 Ağustos 2026' },
    kamuAiPage: {
      hero: { badge: 'Kamu & Bakanlık AI', title: 'Ankara Kamu Yapay Zeka Çözümleri', desc: 'Bakanlık ve kamu kurumları için on-premise yapay zeka, evrak OCR, e-devlet süreç otomasyonu ve KVKK uyumlu LLM — veriler kurum içinde kalır.', guideLink: 'Kamu yazılım rehberi →' },
      features: { f1: { title: 'E-Devlet & Vatandaş Portalları', desc: 'Başvuru takibi, bildirim ve AI destekli vatandaş asistanı — Türkçe NLP.' }, f2: { title: 'Belge OCR & Dijital Arşiv', desc: 'Evrak, fatura ve ihale dosyalarından otomatik veri çıkarma.' }, f3: { title: 'On-Premise & KVKK', desc: 'Veri kurum dışına çıkmadan LLM — audit log ve rol bazlı erişim.' }, f4: { title: 'İhale & Süreç Otomasyonu', desc: 'Onay zinciri, hatırlatıcı ve raporlama otomasyonu.' } },
      pricing: { title: '2026 Fiyat Aralığı (Kamu AI)', col1: 'Kapsam', col2: 'Maliyet', row1: 'Evrak OCR modülü', row1price: '60.000 – 120.000 TL', row2: 'İhale / süreç otomasyonu', row2price: '120.000 – 250.000 TL', row3: 'On-premise AI platformu', row3price: '250.000 – 500.000+ TL' },
      links: { kvkk: 'KVKK uyumlu AI', ocr: 'Belge OCR', hub: 'AI firması hub' },
      cta: { title: 'Kamu AI Projenizi Planlayalım', desc: 'On-premise gereksinimleri, KVKK ve entegrasyon ihtiyaçlarınızı ücretsiz keşif görüşmesinde değerlendirelim.', btn: 'Ücretsiz Keşif Görüşmesi' },
    },
  },
  en: {
    cards: {
      ankaraAiSecimCard: { title: 'How to Choose an AI Company in Ankara? [2026 Guide]', desc: 'LLM experience, KVKK, on-premise, references and quote comparison checklist.' },
      ankaraAiKarsilastirmaCard: { title: 'Ankara AI Companies Comparison [2026]', desc: 'Objective comparison: LLM, KVKK, on-premise and pricing.' },
      ankaraLlmMaliyetCard: { title: 'Ankara LLM Integration Cost [2026]', desc: 'GPT/Claude API, RAG, chatbot and on-premise AI price ranges.' },
    },
    posts: {
      ankaraAiSecim: { tag: '🤖 AI', title: 'How to Choose an AI Company in Ankara? [2026 Guide]', breadcrumb: 'AI Company Selection 2026', metaDesc: 'How to choose an Ankara AI company: LLM, KVKK, on-premise and references. 2026 guide.' },
      ankaraAiKarsilastirma: { tag: '🤖 AI', title: 'Ankara AI Companies Comparison [2026]', breadcrumb: 'AI Companies Comparison', metaDesc: 'Compare Ankara AI companies by LLM depth, KVKK, on-premise and pricing.' },
      ankaraLlmMaliyet: { tag: '💰 Cost', title: 'Ankara LLM Integration Cost [2026]', breadcrumb: 'LLM Cost Ankara', metaDesc: 'Ankara LLM integration cost 2026: GPT, RAG, chatbot and on-premise pricing.' },
    },
    cta: {
      ankaraAiSecim: { title: 'Find the Right AI Partner', desc: 'Free consultation on LLM scope, KVKK and budget.', btn: 'Free Consultation' },
      ankaraAiKarsilastirma: { title: 'Get a Quote for Your AI Project', desc: 'Custom LLM and integration proposal after comparison.', btn: 'Free Quote' },
      ankaraLlmMaliyet: { title: 'Get a Clear LLM Quote', desc: 'Scope-based LLM integration pricing with no hidden costs.', btn: 'Free Quote' },
    },
    meta: { date8: 'August 1, 2026' },
    kamuAiPage: {
      hero: { badge: 'Public Sector AI', title: 'Ankara Public Sector AI Solutions', desc: 'On-premise AI, document OCR, e-government automation and KVKK-compliant LLM for ministries and public institutions.', guideLink: 'Public sector software guide →' },
      features: { f1: { title: 'E-Government & Citizen Portals', desc: 'Application tracking, notifications and AI citizen assistant — Turkish NLP.' }, f2: { title: 'Document OCR & Digital Archive', desc: 'Automated data extraction from files, invoices and tender documents.' }, f3: { title: 'On-Premise & KVKK', desc: 'LLM without data leaving the institution — audit log and RBAC.' }, f4: { title: 'Tender & Process Automation', desc: 'Approval chains, reminders and reporting automation.' } },
      pricing: { title: '2026 Price Range (Public AI)', col1: 'Scope', col2: 'Cost', row1: 'Document OCR module', row1price: '60,000 – 120,000 TRY', row2: 'Tender / process automation', row2price: '120,000 – 250,000 TRY', row3: 'On-premise AI platform', row3price: '250,000 – 500,000+ TRY' },
      links: { kvkk: 'KVKK-compliant AI', ocr: 'Document OCR', hub: 'AI company hub' },
      cta: { title: 'Plan Your Public AI Project', desc: 'Free discovery call for on-premise, KVKK and integration requirements.', btn: 'Free Discovery Call' },
    },
  },
  de: {
    cards: {
      ankaraAiSecimCard: { title: 'KI-Unternehmen in Ankara wählen? [2026 Leitfaden]', desc: 'LLM-Erfahrung, KVKK, On-Premise, Referenzen und Angebotsvergleich.' },
      ankaraAiKarsilastirmaCard: { title: 'Ankara KI-Unternehmen Vergleich [2026]', desc: 'Objektiver Vergleich: LLM, KVKK, On-Premise und Preise.' },
      ankaraLlmMaliyetCard: { title: 'Ankara LLM-Integrationskosten [2026]', desc: 'GPT/Claude API, RAG, Chatbot und On-Premise KI Preise.' },
    },
    posts: {
      ankaraAiSecim: { tag: '🤖 KI', title: 'KI-Unternehmen in Ankara wählen? [2026 Leitfaden]', breadcrumb: 'KI-Auswahl 2026', metaDesc: 'KI-Unternehmen in Ankara wählen: LLM, KVKK, On-Premise. Leitfaden 2026.' },
      ankaraAiKarsilastirma: { tag: '🤖 KI', title: 'Ankara KI-Unternehmen Vergleich [2026]', breadcrumb: 'KI-Vergleich', metaDesc: 'Vergleich von KI-Unternehmen in Ankara nach LLM, KVKK und Preis.' },
      ankaraLlmMaliyet: { tag: '💰 Kosten', title: 'Ankara LLM-Integrationskosten [2026]', breadcrumb: 'LLM-Kosten Ankara', metaDesc: 'LLM-Integrationskosten Ankara 2026: GPT, RAG, Chatbot, On-Premise.' },
    },
    cta: {
      ankaraAiSecim: { title: 'Den richtigen KI-Partner finden', desc: 'Kostenlose Beratung zu LLM, KVKK und Budget.', btn: 'Kostenlose Beratung' },
      ankaraAiKarsilastirma: { title: 'Angebot für Ihr KI-Projekt', desc: 'Individuelles LLM-Angebot nach Vergleich.', btn: 'Kostenloses Angebot' },
      ankaraLlmMaliyet: { title: 'Klares LLM-Angebot', desc: 'Scope-basierte LLM-Preise ohne versteckte Kosten.', btn: 'Kostenloses Angebot' },
    },
    meta: { date8: '1. August 2026' },
    kamuAiPage: {
      hero: { badge: 'Öffentlicher Sektor KI', title: 'Ankara KI-Lösungen für den öffentlichen Sektor', desc: 'On-Premise KI, Dokumenten-OCR, E-Government-Automatisierung und KVKK-konformes LLM.', guideLink: 'Leitfaden öffentliche Software →' },
      features: { f1: { title: 'E-Government & Bürgerportale', desc: 'Antragsverfolgung und KI-Bürgerassistent — Türkisch NLP.' }, f2: { title: 'Dokumenten-OCR & Archiv', desc: 'Automatische Datenextraktion aus Akten und Ausschreibungen.' }, f3: { title: 'On-Premise & KVKK', desc: 'LLM ohne Datenabfluss — Audit-Log und RBAC.' }, f4: { title: 'Ausschreibungs-Automatisierung', desc: 'Genehmigungsketten und Berichte.' } },
      pricing: { title: '2026 Preisspanne (Öffentliche KI)', col1: 'Umfang', col2: 'Kosten', row1: 'Dokumenten-OCR', row1price: '60.000 – 120.000 TRY', row2: 'Prozessautomatisierung', row2price: '120.000 – 250.000 TRY', row3: 'On-Premise KI-Plattform', row3price: '250.000 – 500.000+ TRY' },
      links: { kvkk: 'KVKK-konforme KI', ocr: 'Dokumenten-OCR', hub: 'KI-Unternehmen Hub' },
      cta: { title: 'Öffentliches KI-Projekt planen', desc: 'Kostenlose Erstberatung zu On-Premise und KVKK.', btn: 'Kostenlose Beratung' },
    },
  },
  fr: {
    cards: {
      ankaraAiSecimCard: { title: "Comment choisir une entreprise IA à Ankara ? [2026]", desc: 'Expérience LLM, KVKK, on-premise, références et comparaison de devis.' },
      ankaraAiKarsilastirmaCard: { title: 'Comparaison des entreprises IA à Ankara [2026]', desc: 'Comparaison objective : LLM, KVKK, on-premise et prix.' },
      ankaraLlmMaliyetCard: { title: "Coût d'intégration LLM à Ankara [2026]", desc: 'API GPT/Claude, RAG, chatbot et IA on-premise.' },
    },
    posts: {
      ankaraAiSecim: { tag: '🤖 IA', title: "Comment choisir une entreprise IA à Ankara ? [2026]", breadcrumb: 'Choix entreprise IA 2026', metaDesc: 'Choisir une entreprise IA à Ankara : LLM, KVKK, on-premise. Guide 2026.' },
      ankaraAiKarsilastirma: { tag: '🤖 IA', title: 'Comparaison entreprises IA Ankara [2026]', breadcrumb: 'Comparaison IA', metaDesc: 'Comparer les entreprises IA à Ankara : LLM, KVKK, on-premise.' },
      ankaraLlmMaliyet: { tag: '💰 Coût', title: "Coût intégration LLM Ankara [2026]", breadcrumb: 'Coût LLM Ankara', metaDesc: 'Coût intégration LLM Ankara 2026 : GPT, RAG, chatbot, on-premise.' },
    },
    cta: {
      ankaraAiSecim: { title: 'Trouvons le bon partenaire IA', desc: 'Consultation gratuite sur LLM, KVKK et budget.', btn: 'Consultation gratuite' },
      ankaraAiKarsilastirma: { title: 'Devis pour votre projet IA', desc: 'Proposition LLM personnalisée après comparaison.', btn: 'Devis gratuit' },
      ankaraLlmMaliyet: { title: 'Devis LLM transparent', desc: 'Tarification LLM selon périmètre, sans coûts cachés.', btn: 'Devis gratuit' },
    },
    meta: { date8: '1 août 2026' },
    kamuAiPage: {
      hero: { badge: 'IA secteur public', title: 'Solutions IA secteur public à Ankara', desc: 'IA on-premise, OCR documentaire, automatisation e-gouvernement et LLM conforme KVKK.', guideLink: 'Guide logiciel public →' },
      features: { f1: { title: 'E-gouvernement & portails citoyens', desc: 'Suivi des demandes et assistant IA citoyen — NLP turc.' }, f2: { title: 'OCR & archivage numérique', desc: 'Extraction automatique des documents et appels d\'offres.' }, f3: { title: 'On-premise & KVKK', desc: 'LLM sans sortie de données — journal d\'audit et RBAC.' }, f4: { title: 'Automatisation des marchés', desc: 'Chaînes d\'approbation et rapports.' } },
      pricing: { title: 'Fourchette de prix 2026 (IA publique)', col1: 'Périmètre', col2: 'Coût', row1: 'Module OCR', row1price: '60 000 – 120 000 TRY', row2: 'Automatisation processus', row2price: '120 000 – 250 000 TRY', row3: 'Plateforme IA on-premise', row3price: '250 000 – 500 000+ TRY' },
      links: { kvkk: 'IA conforme KVKK', ocr: 'OCR documentaire', hub: 'Hub entreprise IA' },
      cta: { title: 'Planifions votre projet IA public', desc: 'Appel découverte gratuit pour on-premise et KVKK.', btn: 'Appel découverte gratuit' },
    },
  },
  ar: {
    cards: {
      ankaraAiSecimCard: { title: 'كيف تختار شركة ذكاء اصطناعي في أنقرة؟ [2026]', desc: 'خبرة LLM وKVKK وon-premise والمراجع ومقارنة العروض.' },
      ankaraAiKarsilastirmaCard: { title: 'مقارنة شركات الذكاء الاصطناعي في أنقرة [2026]', desc: 'مقارنة موضوعية: LLM وKVKK وon-premise والأسعار.' },
      ankaraLlmMaliyetCard: { title: 'تكلفة تكامل LLM في أنقرة [2026]', desc: 'أسعار GPT/Claude وRAG وروبوت المحادثة وon-premise.' },
    },
    posts: {
      ankaraAiSecim: { tag: '🤖 ذكاء اصطناعي', title: 'كيف تختار شركة ذكاء اصطناعي في أنقرة؟ [2026]', breadcrumb: 'اختيار شركة AI 2026', metaDesc: 'اختيار شركة ذكاء اصطناعي في أنقرة: LLM وKVKK وon-premise. دليل 2026.' },
      ankaraAiKarsilastirma: { tag: '🤖 ذكاء اصطناعي', title: 'مقارنة شركات AI في أنقرة [2026]', breadcrumb: 'مقارنة شركات AI', metaDesc: 'مقارنة شركات الذكاء الاصطناعي في أنقرة حسب LLM وKVKK والسعر.' },
      ankaraLlmMaliyet: { tag: '💰 التكلفة', title: 'تكلفة تكامل LLM في أنقرة [2026]', breadcrumb: 'تكلفة LLM أنقرة', metaDesc: 'تكلفة تكامل LLM في أنقرة 2026: GPT وRAG وchatbot وon-premise.' },
    },
    cta: {
      ankaraAiSecim: { title: 'لنجد شريك AI المناسب', desc: 'استشارة مجانية حول LLM وKVKK والميزانية.', btn: 'استشارة مجانية' },
      ankaraAiKarsilastirma: { title: 'عرض سعر لمشروع AI', desc: 'عرض LLM مخصص بعد المقارنة.', btn: 'عرض مجاني' },
      ankaraLlmMaliyet: { title: 'عرض LLM واضح', desc: 'تسعير LLM حسب النطاق دون تكاليف خفية.', btn: 'عرض مجاني' },
    },
    meta: { date8: '1 أغسطس 2026' },
    kamuAiPage: {
      hero: { badge: 'ذكاء اصطناعي للقطاع العام', title: 'حلول الذكاء الاصطناعي للقطاع العام في أنقرة', desc: 'ذكاء اصطناعي on-premise وOCR للمستندات وأتمتة الحكومة الإلكترونية وLLM متوافق مع KVKK.', guideLink: 'دليل برمجيات القطاع العام →' },
      features: { f1: { title: 'الحكومة الإلكترونية وبوابات المواطن', desc: 'تتبع الطلبات ومساعد AI للمواطن — NLP تركي.' }, f2: { title: 'OCR للمستندات والأرشيف الرقمي', desc: 'استخراج البيانات من الملفات والمناقصات.' }, f3: { title: 'On-premise وKVKK', desc: 'LLM دون خروج البيانات — سجل تدقيق وRBAC.' }, f4: { title: 'أتمتة المناقصات والعمليات', desc: 'سلاسل الموافقة والتقارير.' } },
      pricing: { title: 'نطاق الأسعار 2026 (AI عام)', col1: 'النطاق', col2: 'التكلفة', row1: 'وحدة OCR للمستندات', row1price: '60,000 – 120,000 TRY', row2: 'أتمتة العمليات', row2price: '120,000 – 250,000 TRY', row3: 'منصة AI on-premise', row3price: '250,000 – 500,000+ TRY' },
      links: { kvkk: 'AI متوافق مع KVKK', ocr: 'OCR للمستندات', hub: 'مركز شركة AI' },
      cta: { title: 'لنخطط لمشروع AI للقطاع العام', desc: 'مكالمة اكتشاف مجانية لمتطلبات on-premise وKVKK.', btn: 'مكالمة اكتشاف مجانية' },
    },
  },
  ru: {
    cards: {
      ankaraAiSecimCard: { title: 'Как выбрать ИИ-компанию в Анкаре? [2026]', desc: 'Опыт LLM, KVKK, on-premise, референсы и сравнение предложений.' },
      ankaraAiKarsilastirmaCard: { title: 'Сравнение ИИ-компаний Анкары [2026]', desc: 'Объективное сравнение: LLM, KVKK, on-premise и цены.' },
      ankaraLlmMaliyetCard: { title: 'Стоимость интеграции LLM в Анкаре [2026]', desc: 'Цены на GPT/Claude API, RAG, чатбот и on-premise ИИ.' },
    },
    posts: {
      ankaraAiSecim: { tag: '🤖 ИИ', title: 'Как выбрать ИИ-компанию в Анкаре? [2026]', breadcrumb: 'Выбор ИИ-компании 2026', metaDesc: 'Выбор ИИ-компании в Анкаре: LLM, KVKK, on-premise. Гид 2026.' },
      ankaraAiKarsilastirma: { tag: '🤖 ИИ', title: 'Сравнение ИИ-компаний Анкары [2026]', breadcrumb: 'Сравнение ИИ', metaDesc: 'Сравнение ИИ-компаний Анкары по LLM, KVKK и цене.' },
      ankaraLlmMaliyet: { tag: '💰 Стоимость', title: 'Стоимость интеграции LLM в Анкаре [2026]', breadcrumb: 'Стоимость LLM Анкара', metaDesc: 'Стоимость интеграции LLM в Анкаре 2026: GPT, RAG, чатбот, on-premise.' },
    },
    cta: {
      ankaraAiSecim: { title: 'Найдём правильного ИИ-партнёра', desc: 'Бесплатная консультация по LLM, KVKK и бюджету.', btn: 'Бесплатная консультация' },
      ankaraAiKarsilastirma: { title: 'КП на ваш ИИ-проект', desc: 'Индивидуальное предложение по LLM после сравнения.', btn: 'Бесплатное КП' },
      ankaraLlmMaliyet: { title: 'Прозрачное КП на LLM', desc: 'Цена LLM по объёму работ без скрытых расходов.', btn: 'Бесплатное КП' },
    },
    meta: { date8: '1 августа 2026' },
    kamuAiPage: {
      hero: { badge: 'ИИ для госсектора', title: 'ИИ-решения для госсектора в Анкаре', desc: 'On-premise ИИ, OCR документов, автоматизация e-government и LLM с соблюдением KVKK.', guideLink: 'Гид по госсофту →' },
      features: { f1: { title: 'E-government и порталы граждан', desc: 'Отслеживание заявок и ИИ-ассистент — турецкий NLP.' }, f2: { title: 'OCR документов и архив', desc: 'Автоматическое извлечение данных из дел и тендеров.' }, f3: { title: 'On-premise и KVKK', desc: 'LLM без вывода данных — audit log и RBAC.' }, f4: { title: 'Автоматизация тендеров', desc: 'Цепочки согласования и отчёты.' } },
      pricing: { title: 'Диапазон цен 2026 (госсектор ИИ)', col1: 'Объём', col2: 'Стоимость', row1: 'Модуль OCR', row1price: '60 000 – 120 000 TRY', row2: 'Автоматизация процессов', row2price: '120 000 – 250 000 TRY', row3: 'On-premise ИИ-платформа', row3price: '250 000 – 500 000+ TRY' },
      links: { kvkk: 'ИИ с KVKK', ocr: 'OCR документов', hub: 'Хаб ИИ-компании' },
      cta: { title: 'Спланируем госсекторный ИИ-проект', desc: 'Бесплатный звонок по on-premise и KVKK.', btn: 'Бесплатная консультация' },
    },
  },
};

for (const lang of langs) {
  const path = resolve(root, `src/i18n/${lang}.json`);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  const p = patches[lang];

  Object.assign(data.blog.cards, p.cards);
  Object.assign(data.blog.posts, p.posts);
  Object.assign(data.blog.cta, p.cta);
  Object.assign(data.blog.meta, p.meta);
  data.kamuAiPage = p.kamuAiPage;

  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  console.log(`patched ${lang}.json`);
}

console.log('i18n patch done');
