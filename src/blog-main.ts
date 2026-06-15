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
import chatbotAr from './i18n/articles/chatbot-ar.html?raw';
import llmEn from './i18n/articles/llm-en.html?raw';
import llmAr from './i18n/articles/llm-ar.html?raw';
import otomasyonEn from './i18n/articles/otomasyon-en.html?raw';
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

const LANG_KEY = 'ozturksoft_lang';

const LANG_META: Record<string, { flag: string; code: string }> = {
    tr: { flag: '🇹🇷', code: 'TR' },
    en: { flag: '🇬🇧', code: 'EN' },
    de: { flag: '🇩🇪', code: 'DE' },
    ar: { flag: '🇸🇦', code: 'AR' },
    ru: { flag: '🇷🇺', code: 'RU' },
    fr: { flag: '🇫🇷', code: 'FR' },
};

// Article bodies indexed by [lang][articleKey]
// Article bodies indexed by [lang][articleKey]
const ARTICLE_BODIES: Record<string, Record<string, string>> = {
    en: { web: webEn, ai: aiEn, qa: qaEn, mobile: mobileEn, chatbot: chatbotEn, llm: llmEn, otomasyon: otomasyonEn, istanbul: istanbulEn, izmir: izmirEn, bursa: bursaEn, antalya: antalyaEn, konya: konyaEn },
    fr: { web: webFr, ai: aiFr, qa: qaFr, mobile: mobileFr, istanbul: istanbulFr, izmir: izmirFr, bursa: bursaFr, antalya: antalyaFr, konya: konyaFr },
    de: { web: webDe, ai: aiDe, qa: qaDe, mobile: mobileDe, istanbul: istanbulDe, izmir: izmirDe, bursa: bursaDe, antalya: antalyaDe, konya: konyaDe },
    ar: { web: webAr, ai: aiAr, qa: qaAr, mobile: mobileAr, chatbot: chatbotAr, llm: llmAr, otomasyon: otomasyonAr, istanbul: istanbulAr, izmir: izmirAr, bursa: bursaAr, antalya: antalyaAr, konya: konyaAr },
    ru: { web: webRu, ai: aiRu, qa: qaRu, mobile: mobileRu, istanbul: istanbulRu, izmir: izmirRu, bursa: bursaRu, antalya: antalyaRu, konya: konyaRu },
};

let savedTrBody: string | null = null;
const savedLang = localStorage.getItem(LANG_KEY) || 'tr';

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
    if (body && document.body.dataset.article) {
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
        // Restore Turkish original
        if (savedTrBody) {
            body.innerHTML = savedTrBody;
        }
    } else {
        // Use translated body for the language, fall back to EN
        const langBodies = ARTICLE_BODIES[lang] || ARTICLE_BODIES['en'];
        const translatedBody = langBodies?.[articleKey] || ARTICLE_BODIES['en']?.[articleKey];
        if (translatedBody) {
            if (!savedTrBody) savedTrBody = body.innerHTML;
            body.innerHTML = translatedBody;
        }
    }
}

function updateContent() {
    updateArticleBody();

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        const translated = i18next.t(key);
        if (translated && translated !== key) {
            el.innerHTML = translated;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (!key) return;
        (el as HTMLInputElement | HTMLTextAreaElement).placeholder = i18next.t(key);
    });
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
}

async function changeLanguage(lang: string) {
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
