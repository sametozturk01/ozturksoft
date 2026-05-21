import i18next from 'i18next';
import trTranslation from './i18n/tr.json';
import enTranslation from './i18n/en.json';
import webEn from './i18n/articles/web-en.html?raw';
import aiEn from './i18n/articles/ai-en.html?raw';
import qaEn from './i18n/articles/qa-en.html?raw';
import mobileEn from './i18n/articles/mobile-en.html?raw';

const ARTICLE_BODIES_EN: Record<string, string> = {
    web: webEn,
    ai: aiEn,
    qa: qaEn,
    mobile: mobileEn,
};

let savedTrBody: string | null = null;

i18next.init({
    lng: localStorage.getItem('ozturksoft-lang') || 'tr',
    fallbackLng: 'tr',
    resources: {
        tr: { translation: trTranslation },
        en: { translation: enTranslation },
    },
}).then(() => {
    const body = document.querySelector<HTMLElement>('.article-body');
    if (body && document.body.dataset.article) {
        savedTrBody = body.innerHTML;
    }
    applyLanguageUI();
    updateContent();
});

function updateArticleBody() {
    const articleKey = document.body.dataset.article;
    const body = document.querySelector<HTMLElement>('.article-body');
    if (!articleKey || !body || !ARTICLE_BODIES_EN[articleKey]) return;

    if (i18next.language === 'en') {
        if (!savedTrBody) savedTrBody = body.innerHTML;
        body.innerHTML = ARTICLE_BODIES_EN[articleKey];
    } else if (savedTrBody) {
        body.innerHTML = savedTrBody;
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

function applyLanguageUI() {
    const btnEN = document.getElementById('lang-en');
    const btnTR = document.getElementById('lang-tr');
    if (!btnEN || !btnTR) return;

    if (i18next.language === 'en') {
        btnEN.style.display = 'none';
        btnTR.style.display = 'flex';
        document.documentElement.lang = 'en';
    } else {
        btnTR.style.display = 'none';
        btnEN.style.display = 'flex';
        document.documentElement.lang = 'tr';
    }
}

async function setLanguage(lang: 'tr' | 'en') {
    await i18next.changeLanguage(lang);
    localStorage.setItem('ozturksoft-lang', lang);
    applyLanguageUI();
    updateContent();
}

const btnEN = document.getElementById('lang-en');
const btnTR = document.getElementById('lang-tr');

if (btnEN && btnTR) {
    btnEN.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage('en');
    });

    btnTR.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage('tr');
    });
}

window.addEventListener('DOMContentLoaded', () => {
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
