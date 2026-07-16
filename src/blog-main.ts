import i18next from 'i18next';
import trTranslation from './i18n/tr.json';
import enTranslation from './i18n/en.json';
import deTranslation from './i18n/de.json';
import arTranslation from './i18n/ar.json';
import ruTranslation from './i18n/ru.json';
import frTranslation from './i18n/fr.json';

import webEn from './i18n/articles/web-en.html?raw';
import webFr from './i18n/articles/web-fr.html?raw';
import webDe from './i18n/articles/web-de.html?raw';
import webAr from './i18n/articles/web-ar.html?raw';
import webRu from './i18n/articles/web-ru.html?raw';

import aiEn from './i18n/articles/ai-en.html?raw';
import aiFr from './i18n/articles/ai-fr.html?raw';
import aiDe from './i18n/articles/ai-de.html?raw';
import aiAr from './i18n/articles/ai-ar.html?raw';
import aiRu from './i18n/articles/ai-ru.html?raw';

import qaEn from './i18n/articles/qa-en.html?raw';
import qaFr from './i18n/articles/qa-fr.html?raw';
import qaDe from './i18n/articles/qa-de.html?raw';
import qaAr from './i18n/articles/qa-ar.html?raw';
import qaRu from './i18n/articles/qa-ru.html?raw';

import mobileEn from './i18n/articles/mobile-en.html?raw';
import mobileFr from './i18n/articles/mobile-fr.html?raw';
import mobileDe from './i18n/articles/mobile-de.html?raw';
import mobileAr from './i18n/articles/mobile-ar.html?raw';
import mobileRu from './i18n/articles/mobile-ru.html?raw';

import chatbotEn from './i18n/articles/chatbot-en.html?raw';
import chatbotDe from './i18n/articles/chatbot-de.html?raw';
import chatbotFr from './i18n/articles/chatbot-fr.html?raw';
import chatbotRu from './i18n/articles/chatbot-ru.html?raw';
import chatbotAr from './i18n/articles/chatbot-ar.html?raw';
import llmEn from './i18n/articles/llm-en.html?raw';
import llmDe from './i18n/articles/llm-de.html?raw';
import llmFr from './i18n/articles/llm-fr.html?raw';
import llmRu from './i18n/articles/llm-ru.html?raw';
import llmAr from './i18n/articles/llm-ar.html?raw';
import otomasyonEn from './i18n/articles/otomasyon-en.html?raw';
import otomasyonDe from './i18n/articles/otomasyon-de.html?raw';
import otomasyonFr from './i18n/articles/otomasyon-fr.html?raw';
import otomasyonRu from './i18n/articles/otomasyon-ru.html?raw';
import otomasyonAr from './i18n/articles/otomasyon-ar.html?raw';

import istanbulEn from './i18n/articles/istanbul-en.html?raw';
import istanbulDe from './i18n/articles/istanbul-de.html?raw';
import istanbulFr from './i18n/articles/istanbul-fr.html?raw';
import istanbulAr from './i18n/articles/istanbul-ar.html?raw';
import istanbulRu from './i18n/articles/istanbul-ru.html?raw';

import izmirEn from './i18n/articles/izmir-en.html?raw';
import izmirDe from './i18n/articles/izmir-de.html?raw';
import izmirFr from './i18n/articles/izmir-fr.html?raw';
import izmirAr from './i18n/articles/izmir-ar.html?raw';
import izmirRu from './i18n/articles/izmir-ru.html?raw';

import bursaEn from './i18n/articles/bursa-en.html?raw';
import bursaDe from './i18n/articles/bursa-de.html?raw';
import bursaFr from './i18n/articles/bursa-fr.html?raw';
import bursaAr from './i18n/articles/bursa-ar.html?raw';
import bursaRu from './i18n/articles/bursa-ru.html?raw';

import antalyaEn from './i18n/articles/antalya-en.html?raw';
import antalyaDe from './i18n/articles/antalya-de.html?raw';
import antalyaFr from './i18n/articles/antalya-fr.html?raw';
import antalyaAr from './i18n/articles/antalya-ar.html?raw';
import antalyaRu from './i18n/articles/antalya-ru.html?raw';

import konyaEn from './i18n/articles/konya-en.html?raw';
import konyaDe from './i18n/articles/konya-de.html?raw';
import konyaFr from './i18n/articles/konya-fr.html?raw';
import konyaAr from './i18n/articles/konya-ar.html?raw';
import konyaRu from './i18n/articles/konya-ru.html?raw';

import ankaraSecimEn from './i18n/articles/ankara-secim-en.html?raw';
import ankaraSecimDe from './i18n/articles/ankara-secim-de.html?raw';
import ankaraSecimFr from './i18n/articles/ankara-secim-fr.html?raw';
import ankaraSecimAr from './i18n/articles/ankara-secim-ar.html?raw';
import ankaraSecimRu from './i18n/articles/ankara-secim-ru.html?raw';
import eticaretEn from './i18n/articles/eticaret-en.html?raw';
import eticaretDe from './i18n/articles/eticaret-de.html?raw';
import eticaretFr from './i18n/articles/eticaret-fr.html?raw';
import eticaretAr from './i18n/articles/eticaret-ar.html?raw';
import eticaretRu from './i18n/articles/eticaret-ru.html?raw';
import whatsappEn from './i18n/articles/whatsapp-en.html?raw';
import whatsappDe from './i18n/articles/whatsapp-de.html?raw';
import whatsappFr from './i18n/articles/whatsapp-fr.html?raw';
import whatsappAr from './i18n/articles/whatsapp-ar.html?raw';
import whatsappRu from './i18n/articles/whatsapp-ru.html?raw';
import ozelYazilimEn from './i18n/articles/ozel-yazilim-en.html?raw';
import ozelYazilimDe from './i18n/articles/ozel-yazilim-de.html?raw';
import ozelYazilimFr from './i18n/articles/ozel-yazilim-fr.html?raw';
import ozelYazilimAr from './i18n/articles/ozel-yazilim-ar.html?raw';
import ozelYazilimRu from './i18n/articles/ozel-yazilim-ru.html?raw';
import mobilMaliyetEn from './i18n/articles/mobil-maliyet-en.html?raw';
import mobilMaliyetDe from './i18n/articles/mobil-maliyet-de.html?raw';
import mobilMaliyetFr from './i18n/articles/mobil-maliyet-fr.html?raw';
import mobilMaliyetAr from './i18n/articles/mobil-maliyet-ar.html?raw';
import mobilMaliyetRu from './i18n/articles/mobil-maliyet-ru.html?raw';
import kurumsalWebEn from './i18n/articles/kurumsal-web-en.html?raw';
import kurumsalWebDe from './i18n/articles/kurumsal-web-de.html?raw';
import kurumsalWebFr from './i18n/articles/kurumsal-web-fr.html?raw';
import kurumsalWebAr from './i18n/articles/kurumsal-web-ar.html?raw';
import kurumsalWebRu from './i18n/articles/kurumsal-web-ru.html?raw';
import aiDanismanlikEn from './i18n/articles/ai-danismanlik-en.html?raw';
import aiDanismanlikDe from './i18n/articles/ai-danismanlik-de.html?raw';
import aiDanismanlikFr from './i18n/articles/ai-danismanlik-fr.html?raw';
import aiDanismanlikAr from './i18n/articles/ai-danismanlik-ar.html?raw';
import aiDanismanlikRu from './i18n/articles/ai-danismanlik-ru.html?raw';
import crmErpEn from './i18n/articles/crm-erp-en.html?raw';
import crmErpDe from './i18n/articles/crm-erp-de.html?raw';
import crmErpFr from './i18n/articles/crm-erp-fr.html?raw';
import crmErpAr from './i18n/articles/crm-erp-ar.html?raw';
import crmErpRu from './i18n/articles/crm-erp-ru.html?raw';
import seoEn from './i18n/articles/seo-en.html?raw';
import seoDe from './i18n/articles/seo-de.html?raw';
import seoFr from './i18n/articles/seo-fr.html?raw';
import seoAr from './i18n/articles/seo-ar.html?raw';
import seoRu from './i18n/articles/seo-ru.html?raw';
import geoEn from './i18n/articles/geo-en.html?raw';
import geoDe from './i18n/articles/geo-de.html?raw';
import geoFr from './i18n/articles/geo-fr.html?raw';
import geoAr from './i18n/articles/geo-ar.html?raw';
import geoRu from './i18n/articles/geo-ru.html?raw';
import ankaraAiAgentsEn from './i18n/articles/ankara-ai-agents-en.html?raw';
import ankaraAiAgentsDe from './i18n/articles/ankara-ai-agents-de.html?raw';
import ankaraAiAgentsFr from './i18n/articles/ankara-ai-agents-fr.html?raw';
import ankaraAiAgentsAr from './i18n/articles/ankara-ai-agents-ar.html?raw';
import ankaraAiAgentsRu from './i18n/articles/ankara-ai-agents-ru.html?raw';
import ankaraMcpEn from './i18n/articles/ankara-mcp-en.html?raw';
import ankaraMcpDe from './i18n/articles/ankara-mcp-de.html?raw';
import ankaraMcpFr from './i18n/articles/ankara-mcp-fr.html?raw';
import ankaraMcpAr from './i18n/articles/ankara-mcp-ar.html?raw';
import ankaraMcpRu from './i18n/articles/ankara-mcp-ru.html?raw';
import ankaraLaravelEn from './i18n/articles/ankara-laravel-en.html?raw';
import ankaraLaravelDe from './i18n/articles/ankara-laravel-de.html?raw';
import ankaraLaravelFr from './i18n/articles/ankara-laravel-fr.html?raw';
import ankaraLaravelAr from './i18n/articles/ankara-laravel-ar.html?raw';
import ankaraLaravelRu from './i18n/articles/ankara-laravel-ru.html?raw';
import ankaraSaasEn from './i18n/articles/ankara-saas-en.html?raw';
import ankaraSaasDe from './i18n/articles/ankara-saas-de.html?raw';
import ankaraSaasFr from './i18n/articles/ankara-saas-fr.html?raw';
import ankaraSaasAr from './i18n/articles/ankara-saas-ar.html?raw';
import ankaraSaasRu from './i18n/articles/ankara-saas-ru.html?raw';
import ankaraOcrEn from './i18n/articles/ankara-ocr-en.html?raw';
import ankaraOcrDe from './i18n/articles/ankara-ocr-de.html?raw';
import ankaraOcrFr from './i18n/articles/ankara-ocr-fr.html?raw';
import ankaraOcrAr from './i18n/articles/ankara-ocr-ar.html?raw';
import ankaraOcrRu from './i18n/articles/ankara-ocr-ru.html?raw';
import ankaraFlutterEn from './i18n/articles/ankara-flutter-en.html?raw';
import ankaraFlutterDe from './i18n/articles/ankara-flutter-de.html?raw';
import ankaraFlutterFr from './i18n/articles/ankara-flutter-fr.html?raw';
import ankaraFlutterAr from './i18n/articles/ankara-flutter-ar.html?raw';
import ankaraFlutterRu from './i18n/articles/ankara-flutter-ru.html?raw';
import ankaraTelecomEn from './i18n/articles/ankara-telekom-en.html?raw';
import ankaraTelecomDe from './i18n/articles/ankara-telekom-de.html?raw';
import ankaraTelecomFr from './i18n/articles/ankara-telekom-fr.html?raw';
import ankaraTelecomAr from './i18n/articles/ankara-telekom-ar.html?raw';
import ankaraTelecomRu from './i18n/articles/ankara-telekom-ru.html?raw';
import ankaraSanayiEn from './i18n/articles/ankara-sanayi-en.html?raw';
import ankaraSanayiDe from './i18n/articles/ankara-sanayi-de.html?raw';
import ankaraSanayiFr from './i18n/articles/ankara-sanayi-fr.html?raw';
import ankaraSanayiAr from './i18n/articles/ankara-sanayi-ar.html?raw';
import ankaraSanayiRu from './i18n/articles/ankara-sanayi-ru.html?raw';
import ankaraKamuEn from './i18n/articles/ankara-kamu-en.html?raw';
import ankaraKamuDe from './i18n/articles/ankara-kamu-de.html?raw';
import ankaraKamuFr from './i18n/articles/ankara-kamu-fr.html?raw';
import ankaraKamuAr from './i18n/articles/ankara-kamu-ar.html?raw';
import ankaraKamuRu from './i18n/articles/ankara-kamu-ru.html?raw';
import logoNetsisErpEn from './i18n/articles/logo-netsis-erp-en.html?raw';
import logoNetsisErpDe from './i18n/articles/logo-netsis-erp-de.html?raw';
import logoNetsisErpFr from './i18n/articles/logo-netsis-erp-fr.html?raw';
import logoNetsisErpAr from './i18n/articles/logo-netsis-erp-ar.html?raw';
import logoNetsisErpRu from './i18n/articles/logo-netsis-erp-ru.html?raw';
import kvkkAiEn from './i18n/articles/kvkk-ai-en.html?raw';
import kvkkAiDe from './i18n/articles/kvkk-ai-de.html?raw';
import kvkkAiFr from './i18n/articles/kvkk-ai-fr.html?raw';
import kvkkAiAr from './i18n/articles/kvkk-ai-ar.html?raw';
import kvkkAiRu from './i18n/articles/kvkk-ai-ru.html?raw';

const LANG_KEY = 'ozturksoft_lang';

function getBlogSlug(): string | null {
    const path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '');
    const localeMatch = path.match(/^\/(en|de|fr|ar|ru)\/blog\/([^/]+)$/);
    if (localeMatch) return localeMatch[2];
    const trMatch = path.match(/^\/blog\/([^/]+)$/);
    return trMatch ? trMatch[1] : null;
}

function detectPageLang(): string {
    const fromBody = document.body.dataset.pageLang;
    if (fromBody) return fromBody;
    const path = window.location.pathname;
    const m = path.match(/^\/(en|de|fr|ar|ru)\/blog\//);
    if (m) return m[1];
    return localStorage.getItem(LANG_KEY) || 'tr';
}

function getAvailableLangs(): string[] {
    const raw = document.body.dataset.i18nLangs;
    if (raw) return raw.split(',').map((s) => s.trim());
    return ['tr', 'en', 'de', 'fr', 'ar', 'ru'];
}

function getLocaleBlogUrl(lang: string, slug: string): string {
    return lang === 'tr' ? `/blog/${slug}` : `/${lang}/blog/${slug}`;
}

const LANG_META: Record<string, { flag: string; code: string }> = {
    tr: { flag: '🇹🇷', code: 'TR' },
    en: { flag: '🇬🇧', code: 'EN' },
    de: { flag: '🇩🇪', code: 'DE' },
    ar: { flag: '🇸🇦', code: 'AR' },
    ru: { flag: '🇷🇺', code: 'RU' },
    fr: { flag: '🇫🇷', code: 'FR' },
};

// Article bodies indexed by [lang][articleKey]
const ANKARA_NICHE = {
    ankaraAiAgents: { en: ankaraAiAgentsEn, de: ankaraAiAgentsDe, fr: ankaraAiAgentsFr, ar: ankaraAiAgentsAr, ru: ankaraAiAgentsRu },
    ankaraMcp: { en: ankaraMcpEn, de: ankaraMcpDe, fr: ankaraMcpFr, ar: ankaraMcpAr, ru: ankaraMcpRu },
    ankaraLaravel: { en: ankaraLaravelEn, de: ankaraLaravelDe, fr: ankaraLaravelFr, ar: ankaraLaravelAr, ru: ankaraLaravelRu },
    ankaraSaas: { en: ankaraSaasEn, de: ankaraSaasDe, fr: ankaraSaasFr, ar: ankaraSaasAr, ru: ankaraSaasRu },
    ankaraOcr: { en: ankaraOcrEn, de: ankaraOcrDe, fr: ankaraOcrFr, ar: ankaraOcrAr, ru: ankaraOcrRu },
    ankaraFlutter: { en: ankaraFlutterEn, de: ankaraFlutterDe, fr: ankaraFlutterFr, ar: ankaraFlutterAr, ru: ankaraFlutterRu },
    ankaraTelecom: { en: ankaraTelecomEn, de: ankaraTelecomDe, fr: ankaraTelecomFr, ar: ankaraTelecomAr, ru: ankaraTelecomRu },
    ankaraSanayi: { en: ankaraSanayiEn, de: ankaraSanayiDe, fr: ankaraSanayiFr, ar: ankaraSanayiAr, ru: ankaraSanayiRu },
    ankaraKamu: { en: ankaraKamuEn, de: ankaraKamuDe, fr: ankaraKamuFr, ar: ankaraKamuAr, ru: ankaraKamuRu },
    logoNetsisErp: { en: logoNetsisErpEn, de: logoNetsisErpDe, fr: logoNetsisErpFr, ar: logoNetsisErpAr, ru: logoNetsisErpRu },
    kvkkAi: { en: kvkkAiEn, de: kvkkAiDe, fr: kvkkAiFr, ar: kvkkAiAr, ru: kvkkAiRu },
};

const ARTICLE_BODIES: Record<string, Record<string, string>> = {
    en: { web: webEn, ai: aiEn, qa: qaEn, mobile: mobileEn, chatbot: chatbotEn, llm: llmEn, otomasyon: otomasyonEn, ankaraSecim: ankaraSecimEn, eticaret: eticaretEn, whatsapp: whatsappEn, ozelYazilim: ozelYazilimEn, mobilMaliyet: mobilMaliyetEn, kurumsalWeb: kurumsalWebEn, aiDanismanlik: aiDanismanlikEn, crmErp: crmErpEn, seo: seoEn, geo: geoEn, istanbul: istanbulEn, izmir: izmirEn, bursa: bursaEn, antalya: antalyaEn, konya: konyaEn, ...Object.fromEntries(Object.entries(ANKARA_NICHE).map(([k, v]) => [k, v.en])) },
    de: { web: webDe, ai: aiDe, qa: qaDe, mobile: mobileDe, chatbot: chatbotDe, llm: llmDe, otomasyon: otomasyonDe, ankaraSecim: ankaraSecimDe, eticaret: eticaretDe, whatsapp: whatsappDe, ozelYazilim: ozelYazilimDe, mobilMaliyet: mobilMaliyetDe, kurumsalWeb: kurumsalWebDe, aiDanismanlik: aiDanismanlikDe, crmErp: crmErpDe, seo: seoDe, geo: geoDe, istanbul: istanbulDe, izmir: izmirDe, bursa: bursaDe, antalya: antalyaDe, konya: konyaDe, ...Object.fromEntries(Object.entries(ANKARA_NICHE).map(([k, v]) => [k, v.de])) },
    fr: { web: webFr, ai: aiFr, qa: qaFr, mobile: mobileFr, chatbot: chatbotFr, llm: llmFr, otomasyon: otomasyonFr, ankaraSecim: ankaraSecimFr, eticaret: eticaretFr, whatsapp: whatsappFr, ozelYazilim: ozelYazilimFr, mobilMaliyet: mobilMaliyetFr, kurumsalWeb: kurumsalWebFr, aiDanismanlik: aiDanismanlikFr, crmErp: crmErpFr, seo: seoFr, geo: geoFr, istanbul: istanbulFr, izmir: izmirFr, bursa: bursaFr, antalya: antalyaFr, konya: konyaFr, ...Object.fromEntries(Object.entries(ANKARA_NICHE).map(([k, v]) => [k, v.fr])) },
    ar: { web: webAr, ai: aiAr, qa: qaAr, mobile: mobileAr, chatbot: chatbotAr, llm: llmAr, otomasyon: otomasyonAr, ankaraSecim: ankaraSecimAr, eticaret: eticaretAr, whatsapp: whatsappAr, ozelYazilim: ozelYazilimAr, mobilMaliyet: mobilMaliyetAr, kurumsalWeb: kurumsalWebAr, aiDanismanlik: aiDanismanlikAr, crmErp: crmErpAr, seo: seoAr, geo: geoAr, istanbul: istanbulAr, izmir: izmirAr, bursa: bursaAr, antalya: antalyaAr, konya: konyaAr, ...Object.fromEntries(Object.entries(ANKARA_NICHE).map(([k, v]) => [k, v.ar])) },
    ru: { web: webRu, ai: aiRu, qa: qaRu, mobile: mobileRu, chatbot: chatbotRu, llm: llmRu, otomasyon: otomasyonRu, ankaraSecim: ankaraSecimRu, eticaret: eticaretRu, whatsapp: whatsappRu, ozelYazilim: ozelYazilimRu, mobilMaliyet: mobilMaliyetRu, kurumsalWeb: kurumsalWebRu, aiDanismanlik: aiDanismanlikRu, crmErp: crmErpRu, seo: seoRu, geo: geoRu, istanbul: istanbulRu, izmir: izmirRu, bursa: bursaRu, antalya: antalyaRu, konya: konyaRu, ...Object.fromEntries(Object.entries(ANKARA_NICHE).map(([k, v]) => [k, v.ru])) },
};

let savedTrBody: string | null = null;
const pageLang = detectPageLang();
const savedLang = pageLang || localStorage.getItem(LANG_KEY) || 'tr';

i18next.init({
    lng: savedLang,
    fallbackLng: 'tr',
    resources: {
        tr: { translation: trTranslation },
        en: { translation: enTranslation },
        de: { translation: deTranslation },
        ar: { translation: arTranslation },
        ru: { translation: ruTranslation },
        fr: { translation: frTranslation },
    },
}).then(() => {
    const body = document.querySelector<HTMLElement>('.article-body');
    if (body && document.body.dataset.article && detectPageLang() === 'tr') {
        savedTrBody = body.innerHTML;
    }
    updateDropdownUI(normalizeLang(savedLang));
    updateContent();
});

function normalizeLang(lang: string): string {
    return lang.split('-')[0];
}

function updateArticleBody() {
    const articleKey = document.body.dataset.article;
    const body = document.querySelector<HTMLElement>('.article-body');
    if (!articleKey || !body) return;

    const lang = normalizeLang(i18next.language);

    if (lang === 'tr') {
        if (savedTrBody) {
            body.innerHTML = savedTrBody;
        }
    } else {
        const langBodies = ARTICLE_BODIES[lang] || ARTICLE_BODIES['en'];
        const translatedBody = langBodies?.[articleKey] || ARTICLE_BODIES['en']?.[articleKey];
        if (translatedBody) {
            if (!savedTrBody) savedTrBody = body.innerHTML;
            body.innerHTML = translatedBody;
        }
    }
}

function applyTranslation(el: Element, translated: string) {
    if (el.tagName === 'A' && (el.classList.contains('btn-primary') || el.classList.contains('btn'))) {
        const icon = el.querySelector('i');
        if (icon) {
            const textTarget = el.querySelector('span[data-i18n]') || el;
            if (textTarget !== el) {
                textTarget.textContent = translated;
            } else {
                el.textContent = translated + ' ';
                el.appendChild(icon);
            }
        } else {
            el.textContent = translated;
        }
    } else {
        el.innerHTML = translated;
    }
}

function updateArticleShell(articleKey: string) {
    const t = (key: string) => {
        const v = i18next.t(key);
        return v && v !== key ? v : null;
    };

    const setText = (selector: string, key: string) => {
        const el = document.querySelector<HTMLElement>(selector);
        if (!el || el.hasAttribute('data-i18n')) return;
        const v = t(key);
        if (v) el.textContent = v;
    };

    setText('.article-hero h1', `blog.posts.${articleKey}.title`);
    setText('.article-tag', `blog.posts.${articleKey}.tag`);

    const crumbs = document.querySelectorAll('.article-hero .breadcrumb span');
    const lastCrumb = crumbs[crumbs.length - 1] as HTMLElement | undefined;
    if (lastCrumb && !lastCrumb.hasAttribute('data-i18n') && lastCrumb.textContent !== '/') {
        const v = t(`blog.posts.${articleKey}.breadcrumb`);
        if (v) lastCrumb.textContent = v;
    }

    setText('.author-label', 'blog.author.label');
    setText('.author-role', 'blog.author.role');
    setText('.author-bio', 'blog.author.bio');
}

function updatePageMeta(lang: string) {
    document.documentElement.lang = lang === 'ar' ? 'ar' : lang;

    const articleKey = document.body.dataset.article;
    if (!articleKey) return;

    const titleKey = `blog.posts.${articleKey}.title`;
    const title = i18next.t(titleKey);
    if (title && title !== titleKey) {
        document.title = `${title} | Ozturksoft`;
    }

    const descKey = `blog.posts.${articleKey}.metaDesc`;
    const desc = i18next.t(descKey);
    if (desc && desc !== descKey) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', desc);
    }
}

function updateContent() {
    updateArticleBody();

    const articleKey = document.body.dataset.article;
    if (articleKey) updateArticleShell(articleKey);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        const translated = i18next.t(key);
        if (translated && translated !== key) {
            applyTranslation(el, translated);
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (!key) return;
        (el as HTMLInputElement | HTMLTextAreaElement).placeholder = i18next.t(key);
    });

    updatePageMeta(normalizeLang(i18next.language));
}

function updateDropdownUI(lang: string) {
    const meta = LANG_META[lang] || LANG_META['tr'];
    const langLabel = document.getElementById('langLabel');
    const langCodeEl = document.getElementById('langCode');
    if (langLabel) langLabel.textContent = meta.flag;
    if (langCodeEl) langCodeEl.textContent = meta.code;

    document.querySelectorAll('#langDropMenu a').forEach(a => {
        a.classList.remove('ldm-active');
        if (a.getAttribute('data-lang') === lang) a.classList.add('ldm-active');
    });

    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.removeAttribute('dir');
    }

    document.documentElement.lang = lang;
}

async function changeLanguage(lang: string) {
    const articleKey = document.body.dataset.article;
    const slug = getBlogSlug();

    // Blog yazıları: sayfa yenilemeden içerik çevirisi (locale URL'ler deploy öncesi 404 vermesin)
    if (articleKey && slug) {
        if (lang === 'tr' && document.body.dataset.pageLang && document.body.dataset.pageLang !== 'tr') {
            localStorage.setItem(LANG_KEY, lang);
            window.location.href = `/blog/${slug}`;
            return;
        }
        await i18next.changeLanguage(lang);
        localStorage.setItem(LANG_KEY, lang);
        updateDropdownUI(lang);
        updateContent();
        return;
    }

    const available = getAvailableLangs();
    if (slug && available.includes(lang)) {
        localStorage.setItem(LANG_KEY, lang);
        window.location.href = getLocaleBlogUrl(lang, slug);
        return;
    }

    await i18next.changeLanguage(lang);
    localStorage.setItem(LANG_KEY, lang);
    updateDropdownUI(lang);
    updateContent();
}

window.addEventListener('DOMContentLoaded', () => {
    // Dropdown buton aç/kapat
    const langDropBtn = document.getElementById('langDropBtn');
    const langDropMenu = document.getElementById('langDropMenu');
    if (langDropBtn && langDropMenu) {
        langDropBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropMenu.classList.toggle('open');
            langDropBtn.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            const wrap = document.getElementById('langDropdown');
            if (wrap && !wrap.contains(e.target as Node)) {
                langDropMenu.classList.remove('open');
                langDropBtn.classList.remove('open');
            }
        });
    }

    // Dropdown dil linkleri
    document.querySelectorAll('#langDropMenu a[data-lang]').forEach(a => {
        a.addEventListener('click', async (e) => {
            const lang = (a as HTMLElement).getAttribute('data-lang');
            if (lang) {
                e.preventDefault();
                await changeLanguage(lang);
                const menu = document.getElementById('langDropMenu');
                const btn = document.getElementById('langDropBtn');
                if (menu) menu.classList.remove('open');
                if (btn) btn.classList.remove('open');
            }
        });
    });

    // Mobil menü
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.getElementById('menuIcon');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            }
        });

        document.addEventListener('click', (e) => {
            if (
                navLinks.classList.contains('active') &&
                !navLinks.contains(e.target as Node) &&
                !menuToggle.contains(e.target as Node)
            ) {
                navLinks.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                }
            }
        });
    }
});
