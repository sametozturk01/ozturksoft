import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogMainPath = resolve(__dirname, '../src/blog-main.ts');

const newArticles = [
  ['ankaraSecim', 'ankara-secim'],
  ['eticaret', 'eticaret'],
  ['whatsapp', 'whatsapp'],
  ['ozelYazilim', 'ozel-yazilim'],
  ['mobilMaliyet', 'mobil-maliyet'],
  ['kurumsalWeb', 'kurumsal-web'],
  ['aiDanismanlik', 'ai-danismanlik'],
  ['crmErp', 'crm-erp'],
];

const langs = ['en', 'de', 'fr', 'ar', 'ru'];

let newImports = '';
const varNames = {};
for (const [key, file] of newArticles) {
  for (const lang of langs) {
    const v = `${key}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    varNames[`${key}:${lang}`] = v;
    newImports += `import ${v} from './i18n/articles/${file}-${lang}.html?raw';\n`;
  }
}

const extraKeys = ['ankaraSecim', 'eticaret', 'whatsapp', 'ozelYazilim', 'mobilMaliyet', 'kurumsalWeb', 'aiDanismanlik', 'crmErp'];
const buildLang = (lang) => {
  const base = {
    en: `web: webEn, ai: aiEn, qa: qaEn, mobile: mobileEn, chatbot: chatbotEn, llm: llmEn, otomasyon: otomasyonEn`,
    fr: `web: webFr, ai: aiFr, qa: qaFr, mobile: mobileFr`,
    de: `web: webDe, ai: aiDe, qa: qaDe, mobile: mobileDe`,
    ar: `web: webAr, ai: aiAr, qa: qaAr, mobile: mobileAr, chatbot: chatbotAr, llm: llmAr, otomasyon: otomasyonAr`,
    ru: `web: webRu, ai: aiRu, qa: qaRu, mobile: mobileRu`,
  };
  const cities = {
    en: `istanbul: istanbulEn, izmir: izmirEn, bursa: bursaEn, antalya: antalyaEn, konya: konyaEn`,
    fr: `istanbul: istanbulFr, izmir: izmirFr, bursa: bursaFr, antalya: antalyaFr, konya: konyaFr`,
    de: `istanbul: istanbulDe, izmir: izmirDe, bursa: bursaDe, antalya: antalyaDe, konya: konyaDe`,
    ar: `istanbul: istanbulAr, izmir: izmirAr, bursa: bursaAr, antalya: antalyaAr, konya: konyaAr`,
    ru: `istanbul: istanbulRu, izmir: izmirRu, bursa: bursaRu, antalya: antalyaRu, konya: konyaRu`,
  };
  const extras = extraKeys.map(k => `${k}: ${varNames[`${k}:${lang}`]}`).join(', ');
  return `    ${lang}: { ${base[lang]}, ${extras}, ${cities[lang]} }`;
};

const bodiesBlock = `const ARTICLE_BODIES: Record<string, Record<string, string>> = {\n${langs.map(buildLang).join(',\n')},\n};`;

let content = readFileSync(blogMainPath, 'utf8');

// Remove old new article imports if re-running
content = content.replace(/import ankaraSecimEn[\s\S]*?import ozelYazilimEn[\s\S]*?\n/, '');

// Insert new imports after konyaRu import
content = content.replace(
  /import konyaRu from '\.\/i18n\/articles\/konya-ru\.html\?raw';\n/,
  `import konyaRu from './i18n/articles/konya-ru.html?raw';\n\n${newImports}`
);

content = content.replace(
  /const ARTICLE_BODIES: Record<string, Record<string, string>> = \{[\s\S]*?\};/,
  bodiesBlock
);

writeFileSync(blogMainPath, content);
console.log('Updated blog-main.ts');
