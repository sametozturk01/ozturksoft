import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const i18nDir = resolve(__dirname, '../src/i18n');

const extraPosts = {
  de: {
    eticaret: { tag: '🛒 E-Commerce', title: 'E-Commerce-Shop: Kostenleitfaden [2026]', breadcrumb: 'E-Commerce-Kosten' },
    ozelYazilim: { tag: '⚙️ Software', title: 'Was ist Individualsoftware? [2026 Leitfaden]', breadcrumb: 'Individualsoftware' },
    whatsapp: { tag: '💬 WhatsApp', title: 'WhatsApp-Chatbot: API & Kosten [2026]', breadcrumb: 'WhatsApp-Chatbot' },
  },
  fr: {
    eticaret: { tag: '🛒 E-Commerce', title: 'Site e-commerce : guide des coûts [2026]', breadcrumb: 'Coût e-commerce' },
    ozelYazilim: { tag: '⚙️ Logiciel', title: 'Logiciel sur mesure : guide [2026]', breadcrumb: 'Logiciel sur mesure' },
    whatsapp: { tag: '💬 WhatsApp', title: 'Chatbot WhatsApp : API & coûts [2026]', breadcrumb: 'Chatbot WhatsApp' },
  },
  ar: {
    eticaret: { tag: '🛒 تجارة إلكترونية', title: 'متجر إلكتروني: دليل التكلفة [2026]', breadcrumb: 'تكلفة المتجر' },
    ozelYazilim: { tag: '⚙️ برمجيات', title: 'البرمجيات المخصصة: دليل [2026]', breadcrumb: 'برمجيات مخصصة' },
    whatsapp: { tag: '💬 واتساب', title: 'روبوت واتساب: API والتكلفة [2026]', breadcrumb: 'روبوت واتساب' },
  },
  ru: {
    eticaret: { tag: '🛒 E-Commerce', title: 'Интернет-магазин: гид по стоимости [2026]', breadcrumb: 'Стоимость магазина' },
    ozelYazilim: { tag: '⚙️ ПО', title: 'Индивидуальное ПО: гид [2026]', breadcrumb: 'Индивидуальное ПО' },
    whatsapp: { tag: '💬 WhatsApp', title: 'WhatsApp-чатбот: API и стоимость [2026]', breadcrumb: 'WhatsApp-чатбот' },
  },
};

const extraCta = {
  de: {
    ankaraSecim: { title: 'Hilfe bei der Partnerwahl?', desc: 'Kostenlose Beratung zu Umfang und Budget.', btn: 'Kostenlose Beratung' },
    eticaret: { title: 'E-Commerce-Angebot', desc: 'Individuelles Angebot für Produkte und Integrationen.', btn: 'Kostenloses Angebot' },
    whatsapp: { title: 'WhatsApp-Chatbot planen', desc: 'API, GPT und CRM inklusive.', btn: 'Kostenloses Angebot' },
    ozelYazilim: { title: 'Individualsoftware besprechen', desc: 'Kostenlose Analyse und Architektur.', btn: 'Kostenlose Beratung' },
  },
  fr: {
    ankaraSecim: { title: "Besoin d'aide pour choisir ?", desc: 'Consultation gratuite.', btn: 'Consultation gratuite' },
    eticaret: { title: 'Devis e-commerce', desc: 'Proposition sur mesure.', btn: 'Devis gratuit' },
    whatsapp: { title: 'Chatbot WhatsApp', desc: 'API, GPT et CRM inclus.', btn: 'Devis gratuit' },
    ozelYazilim: { title: 'Logiciel sur mesure', desc: 'Découverte gratuite.', btn: 'Consultation gratuite' },
  },
  ar: {
    ankaraSecim: { title: 'تحتاج مساعدة في الاختيار؟', desc: 'استشارة مجانية.', btn: 'استشارة مجانية' },
    eticaret: { title: 'عرض متجر إلكتروني', desc: 'عرض مخصص.', btn: 'عرض مجاني' },
    whatsapp: { title: 'روبوت واتساب', desc: 'API وGPT وCRM.', btn: 'عرض مجاني' },
    ozelYazilim: { title: 'برمجيات مخصصة', desc: 'اكتشاف مجاني.', btn: 'استشارة مجانية' },
  },
  ru: {
    ankaraSecim: { title: 'Нужна помощь с выбором?', desc: 'Бесплатная консультация.', btn: 'Бесплатная консультация' },
    eticaret: { title: 'Предложение e-commerce', desc: 'Индивидуальное предложение.', btn: 'Бесплатное предложение' },
    whatsapp: { title: 'WhatsApp-чатбот', desc: 'API, GPT и CRM.', btn: 'Бесплатное предложение' },
    ozelYazilim: { title: 'Индивидуальное ПО', desc: 'Бесплатный анализ.', btn: 'Бесплатная консультация' },
  },
};

for (const lang of ['de', 'fr', 'ar', 'ru']) {
  const path = resolve(i18nDir, `${lang}.json`);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  Object.assign(data.blog.posts, extraPosts[lang]);
  Object.assign(data.blog.cta, extraCta[lang]);
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  console.log('Supplemented', lang);
}
