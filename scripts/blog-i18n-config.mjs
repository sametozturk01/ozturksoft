/** Article key (data-article) → i18n articles filename prefix */
export const ARTICLE_FILE_PREFIX = {
  web: 'web',
  ai: 'ai',
  qa: 'qa',
  mobile: 'mobile',
  chatbot: 'chatbot',
  llm: 'llm',
  otomasyon: 'otomasyon',
  istanbul: 'istanbul',
  izmir: 'izmir',
  bursa: 'bursa',
  antalya: 'antalya',
  konya: 'konya',
  ankaraSecim: 'ankara-secim',
  eticaret: 'eticaret',
  whatsapp: 'whatsapp',
  ozelYazilim: 'ozel-yazilim',
  mobilMaliyet: 'mobil-maliyet',
  kurumsalWeb: 'kurumsal-web',
  aiDanismanlik: 'ai-danismanlik',
  crmErp: 'crm-erp',
  seo: 'seo',
  geo: 'geo',
};

export const LOCALE_LANGS = ['en', 'de', 'fr', 'ar', 'ru'];

export const OG_LOCALE = {
  tr: 'tr_TR',
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
  ar: 'ar_SA',
  ru: 'ru_RU',
};

export const SCHEMA_LANG = {
  tr: 'tr-TR',
  en: 'en-US',
  de: 'de-DE',
  fr: 'fr-FR',
  ar: 'ar-SA',
  ru: 'ru-RU',
};

export const BASE = 'https://ozturksoft.net';

export function blogUrl(lang, slug) {
  return lang === 'tr' ? `${BASE}/blog/${slug}` : `${BASE}/${lang}/blog/${slug}`;
}

export function buildHreflangTags(slug, langs) {
  const all = ['tr', ...langs.filter((l) => l !== 'tr')];
  const lines = all.map(
    (lang) => `  <link rel="alternate" hreflang="${lang}" href="${blogUrl(lang, slug)}" />`
  );
  lines.push(`  <link rel="alternate" hreflang="x-default" href="${blogUrl('tr', slug)}" />`);
  return lines.join('\n');
}
