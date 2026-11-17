// Bake i18n strings into static HTML: same result as main.ts updateContent(),
// so crawlers see each locale's own text instead of the Turkish template.
function lookup(dict, key) {
  return key.split('.').reduce((o, k) => (o && typeof o === 'object' ? o[k] : undefined), dict);
}

export function prerenderI18n(html, dict) {
  const open = /<([a-zA-Z][\w-]*)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>/g;
  const hits = [];
  let m;
  while ((m = open.exec(html))) {
    const tag = m[1].toLowerCase();
    if (tag === 'title') continue;
    const val = lookup(dict, m[2]);
    if (typeof val !== 'string') continue;
    const start = m.index + m[0].length;
    const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
    re.lastIndex = start;
    let depth = 1, t, end = -1;
    while ((t = re.exec(html))) {
      depth += t[1] ? -1 : 1;
      if (depth === 0) { end = t.index; break; }
    }
    if (end !== -1) hits.push({ start, end, val });
  }
  // Apply from the end so earlier offsets stay valid; skip ranges nested in a replaced parent
  hits.sort((a, b) => b.start - a.start);
  let out = html;
  const done = [];
  for (const h of hits) {
    if (done.some((d) => h.start >= d.start && h.end <= d.end)) continue;
    out = out.slice(0, h.start) + h.val + out.slice(h.end);
    done.push(h);
  }
  return out.replace(/(\sdata-i18n-placeholder="([^"]+)"[^>]*?\splaceholder=")[^"]*"/g, (all, pre, key) => {
    const val = lookup(dict, key);
    return typeof val === 'string' ? `${pre}${val.replace(/"/g, '&quot;')}"` : all;
  });
}


const BASE = 'https://ozturksoft.net';

const LOCALES = [
  {
    lang: 'en',
    file: 'en.html',
    path: '/en',
    htmlLang: 'en',
    ogLocale: 'en_US',
    flag: '🇬🇧',
    code: 'EN',
    title: 'Ozturksoft | AI & Software Development Company in Ankara, Turkey',
    description:
      'Ozturksoft delivers AI integration, custom software, mobile apps and digital transformation for enterprises, government and businesses — from Ankara, Turkey. KVKK compliant, QA-driven.',
    keywords:
      'software company ankara, custom software turkey, AI integration ankara, enterprise software turkey, chatbot development',
    ogTitle: 'Ozturksoft | AI & Software Development — Ankara, Turkey',
    twitterTitle: 'Ozturksoft | AI & Software Development — Ankara, Turkey',
  },
  {
    lang: 'de',
    file: 'de.html',
    path: '/de',
    htmlLang: 'de',
    ogLocale: 'de_DE',
    flag: '🇩🇪',
    code: 'DE',
    title: 'Ozturksoft | Software- & KI-Unternehmen in Ankara, Türkei',
    description:
      'Ozturksoft: KI-Integration, Individualsoftware, Mobile Apps und digitale Transformation für Unternehmen und Behörden — aus Ankara, Türkei. KVKK-konform, QA-orientiert.',
    keywords:
      'softwareunternehmen ankara, individualsoftware türkei, ki integration ankara, unternehmenssoftware',
    ogTitle: 'Ozturksoft | Software & KI aus Ankara',
    twitterTitle: 'Ozturksoft | Software & KI aus Ankara',
  },
  {
    lang: 'fr',
    file: 'fr.html',
    path: '/fr',
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
    flag: '🇫🇷',
    code: 'FR',
    title: 'Ozturksoft | Société logicielle & IA à Ankara, Turquie',
    description:
      'Ozturksoft : intégration IA, logiciel sur mesure, applications mobiles et transformation digitale pour entreprises et secteur public — depuis Ankara, Turquie.',
    keywords:
      'société logicielle ankara, logiciel sur mesure turquie, intégration ia ankara',
    ogTitle: 'Ozturksoft | Logiciel & IA à Ankara',
    twitterTitle: 'Ozturksoft | Logiciel & IA à Ankara',
  },
  {
    lang: 'ar',
    file: 'ar.html',
    path: '/ar',
    htmlLang: 'ar',
    ogLocale: 'ar_SA',
    rtl: true,
    flag: '🇸🇦',
    code: 'AR',
    title: 'Ozturksoft | شركة برمجيات وذكاء اصطناعي في أنقرة، تركيا',
    description:
      'Ozturksoft: تكامل الذكاء الاصطناعي، برمجيات مخصصة، تطبيقات جوال والتحول الرقمي للمؤسسات والقطاع العام — من أنقرة، تركيا.',
    keywords:
      'شركة برمجيات أنقرة, برمجيات مخصصة تركيا, تكامل الذكاء الاصطناعي',
    ogTitle: 'Ozturksoft | برمجيات وذكاء اصطناعي في أنقرة',
    twitterTitle: 'Ozturksoft | برمجيات وذكاء اصطناعي في أنقرة',
  },
  {
    lang: 'ru',
    file: 'ru.html',
    path: '/ru',
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    flag: '🇷🇺',
    code: 'RU',
    title: 'Ozturksoft | IT-компания и ИИ в Анкаре, Турция',
    description:
      'Ozturksoft: интеграция ИИ, разработка ПО на заказ, мобильные приложения и цифровая трансформация для предприятий и госсектора — из Анкары, Турция.',
    keywords:
      'it компания анкара, разработка по турция, интеграция ии анкара',
    ogTitle: 'Ozturksoft | Разработка ПО и ИИ в Анкаре',
    twitterTitle: 'Ozturksoft | Разработка ПО и ИИ в Анкаре',
  },
];
