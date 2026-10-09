import i18next from 'i18next';
import trTranslation from './i18n/tr.json';
import enTranslation from './i18n/en.json';
import deTranslation from './i18n/de.json';
import arTranslation from './i18n/ar.json';
import ruTranslation from './i18n/ru.json';
import frTranslation from './i18n/fr.json';

const LANG_KEY = 'ozturksoft_lang';

const LANG_META: Record<string, { flag: string; code: string; dir?: string }> = {
    tr: { flag: '🇹🇷', code: 'TR' },
    en: { flag: '🇬🇧', code: 'EN' },
    de: { flag: '🇩🇪', code: 'DE' },
    ar: { flag: '🇸🇦', code: 'AR', dir: 'rtl' },
    ru: { flag: '🇷🇺', code: 'RU' },
    fr: { flag: '🇫🇷', code: 'FR' },
};

function getSavedLang(): string {
    return localStorage.getItem(LANG_KEY) || 'tr';
}

function currentPath(): string {
    return window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
}

const LOCALE_HOME: Record<string, string> = {
    tr: '/',
    en: '/en',
    de: '/de',
    ar: '/ar',
    ru: '/ru',
    fr: '/fr',
};

function detectPageLang(): string {
    const fromBody = document.body?.dataset?.pageLang;
    if (fromBody) return fromBody;
    const path = currentPath();
    const match = Object.entries(LOCALE_HOME).find(([, p]) => p === path);
    if (match) return match[0];
    return getSavedLang();
}

function isLocaleHomePage(path = currentPath()): boolean {
    return Object.values(LOCALE_HOME).includes(path);
}

function saveLang(lang: string) {
    localStorage.setItem(LANG_KEY, lang);
}

// --- İ18N (ÇEVİRİ) SİSTEMİ KURULUMU ---
const pageLang = detectPageLang();
saveLang(pageLang);

function resolvedLang(): string {
    const raw = i18next.resolvedLanguage || i18next.language || getSavedLang();
    return (raw.split('-')[0] || 'tr').toLowerCase();
}

const COOKIE_CONSENT_KEY = 'ozturksoft_cookie_consent';
const COOKIE_CONSENT_VERSION_KEY = 'ozturksoft_cookie_policy_v';
const COOKIE_POLICY_VERSION = '2026-09-27-ga';

function gaMeasurementId(): string {
    const id = String(import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-081WMH9GE9').trim();
    return /^G-[A-Z0-9]+$/i.test(id) ? id : '';
}

function loadGoogleAnalytics() {
    const id = gaMeasurementId();
    if (!id || document.getElementById('ga-gtag')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true });
    const s = document.createElement('script');
    s.id = 'ga-gtag';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
}

function applyAnalyticsFromConsent(value: 'all' | 'necessary') {
    if (value === 'all') {
        loadGoogleAnalytics();
        return;
    }
    if (document.getElementById('ga-gtag')) {
        window.location.reload();
    }
}

function cookieConsentValue(): string | null {
    try {
        return localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch {
        return null;
    }
}

function cookiePolicyVersionMatches(): boolean {
    try {
        return localStorage.getItem(COOKIE_CONSENT_VERSION_KEY) === COOKIE_POLICY_VERSION;
    } catch {
        return false;
    }
}

function currentCookieConsent(): 'all' | 'necessary' | null {
    const v = cookieConsentValue();
    if ((v === 'all' || v === 'necessary') && cookiePolicyVersionMatches()) return v;
    return null;
}

function clearStoredCookieConsent() {
    try {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        localStorage.removeItem(COOKIE_CONSENT_VERSION_KEY);
    } catch {
        /* ignore */
    }
    delete document.documentElement.dataset.cookieConsent;
}

function setCookieConsent(value: 'all' | 'necessary') {
    try {
        localStorage.setItem(COOKIE_CONSENT_KEY, value);
        localStorage.setItem(COOKIE_CONSENT_VERSION_KEY, COOKIE_POLICY_VERSION);
    } catch {
        /* private mode */
    }
    document.documentElement.dataset.cookieConsent = value;
    recordCookieConsent(value);
    applyAnalyticsFromConsent(value);
}

function recordCookieConsent(value: 'all' | 'necessary') {
    try {
        void fetch('/api/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                choice: value,
                policyVersion: COOKIE_POLICY_VERSION,
                lang: document.documentElement.lang || 'tr',
                path: window.location.pathname,
            }),
            keepalive: true,
        });
    } catch {
        /* kayıt gitti tarayıcıda durur */
    }
}

function cookiePreviewRequested(): boolean {
    try {
        return new URLSearchParams(window.location.search).has('cerez');
    } catch {
        return false;
    }
}

function clearCookiePreviewQuery() {
    try {
        const url = new URL(window.location.href);
        if (!url.searchParams.has('cerez')) return;
        url.searchParams.delete('cerez');
        const qs = url.searchParams.toString();
        history.replaceState({}, '', url.pathname + (qs ? `?${qs}` : '') + url.hash);
    } catch {
        /* ignore */
    }
}

function hideCookieBanner() {
    document.getElementById('cookieBanner')?.remove();
    document.documentElement.classList.remove('cookie-banner-open');
    document.documentElement.style.removeProperty('--cookie-fab-lift');
    clearCookiePreviewQuery();
}

function syncCookieFabOffset() {
    const el = document.getElementById('cookieBanner');
    if (!el) {
        document.documentElement.style.removeProperty('--cookie-fab-lift');
        return;
    }
    const h = Math.ceil(el.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--cookie-fab-lift', `${h + 16}px`);
}

function injectFooterPrivacyLinks() {
    document.querySelectorAll('footer').forEach((footer) => {
        const wrap = footer.querySelector('.footer-links') || footer;
        if (!footer.querySelector('a[href="/gizlilik"]')) {
            const privacy = document.createElement('a');
            privacy.href = '/gizlilik';
            privacy.setAttribute('data-i18n', 'footer.links.privacy');
            privacy.textContent = 'Gizlilik & çerezler';
            wrap.appendChild(privacy);
        }
        if (!footer.querySelector('[data-cookie-settings]')) {
            const settings = document.createElement('a');
            settings.href = '#';
            settings.setAttribute('data-cookie-settings', '1');
            settings.setAttribute('data-i18n', 'cookieBanner.settings');
            settings.textContent = 'Çerez ayarları';
            wrap.appendChild(settings);
        }
    });
}

function showCookieBanner() {
    if (document.getElementById('cookieBanner')) return;
    const el = document.createElement('div');
    el.id = 'cookieBanner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'false');
    el.setAttribute('aria-labelledby', 'cookieBannerTitle');
    el.innerHTML = `
      <div class="cookie-banner-inner">
        <div class="cookie-banner-copy">
          <p id="cookieBannerTitle" class="cookie-banner-kicker" data-i18n="cookieBanner.title">Çerez tercihi</p>
          <p id="cookieBannerText" data-i18n="cookieBanner.text">Zorunlu: dil ve tercih kaydı. “Kabul et”: Google Analytics (sayfa, kaynak, cihaz — reklam profili değil). “Yalnızca zorunlu”: ölçüm yok. Ayrıntı: gizlilik metni.</p>
        </div>
        <div class="cookie-banner-actions">
          <button type="button" class="btn btn-primary" data-cookie="all" data-i18n="cookieBanner.accept">Kabul et</button>
          <button type="button" class="btn btn-outline" data-cookie="necessary" data-i18n="cookieBanner.necessary">Yalnızca zorunlu</button>
          <a href="/gizlilik" class="cookie-banner-policy" data-i18n="cookieBanner.policy">Gizlilik &amp; çerezler</a>
        </div>
      </div>`;
    document.body.appendChild(el);
    document.documentElement.classList.add('cookie-banner-open');
    if (i18next.isInitialized) updateContent();
    syncCookieFabOffset();
    requestAnimationFrame(syncCookieFabOffset);
    el.querySelector('[data-cookie="all"]')?.addEventListener('click', () => {
        setCookieConsent('all');
        hideCookieBanner();
    });
    el.querySelector('[data-cookie="necessary"]')?.addEventListener('click', () => {
        setCookieConsent('necessary');
        hideCookieBanner();
    });
}

function initCookieBanner() {
    injectFooterPrivacyLinks();
    if (document.body.dataset.cookieBannerClicks !== '1') {
        document.body.dataset.cookieBannerClicks = '1';
        document.body.addEventListener('click', (e) => {
            const trigger = (e.target as HTMLElement).closest('[data-cookie-settings]');
            if (!trigger) return;
            e.preventDefault();
            clearStoredCookieConsent();
            showCookieBanner();
        });
        window.addEventListener('resize', syncCookieFabOffset);
    }
    if (cookiePreviewRequested()) {
        clearStoredCookieConsent();
        showCookieBanner();
        return;
    }
    const saved = currentCookieConsent();
    if (saved) {
        document.documentElement.dataset.cookieConsent = saved;
        if (saved === 'all') loadGoogleAnalytics();
        if (i18next.isInitialized) updateContent();
        return;
    }
    showCookieBanner();
}

i18next.init({
    lng: pageLang,
    fallbackLng: 'tr',
    interpolation: { escapeValue: false },
    resources: {
        tr: { translation: trTranslation },
        en: { translation: enTranslation },
        de: { translation: deTranslation },
        ar: { translation: arTranslation },
        ru: { translation: ruTranslation },
        fr: { translation: frTranslation },
    }
}).then(() => {
    updateContent();
    const lang = resolvedLang();
    updateDropdownUI(lang);
    applyDocumentDir(lang);
    updateLocaleNavLinks(lang);
    initCookieBanner();
}).catch(() => {
    initCookieBanner();
});

// Çeviriyi Ekrana Uygulayan Fonksiyon
function updateContent() {
    const lang = resolvedLang();
    document.documentElement.lang = lang;
    applyDocumentDir(lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (!key) return;
        const val = i18next.t(key);
        if (typeof val !== 'string' || val === key) return;
        if (el.tagName === 'TITLE') {
            document.title = val.replace(/<[^>]+>/g, '');
            return;
        }
        el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (!key || !(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return;
        const val = i18next.t(key);
        if (typeof val === 'string' && val !== key) el.placeholder = val;
    });
}

// Dropdown butonunu aktif dile göre güncelle
function updateDropdownUI(lang: string) {
    const meta = LANG_META[lang] || LANG_META['tr'];
    const langLabel = document.getElementById('langLabel');
    const langCodeEl = document.getElementById('langCode');

    if (langLabel) langLabel.textContent = meta.flag;
    if (langCodeEl) langCodeEl.textContent = meta.code;

    // Aktif dil linkini işaretle
    document.querySelectorAll('#langDropMenu a').forEach(a => {
        a.classList.remove('ldm-active');
        const anchor = a as HTMLAnchorElement;
        const hrefLang = anchor.getAttribute('data-lang');
        if (hrefLang === lang) anchor.classList.add('ldm-active');
    });

    document.querySelectorAll('.mobile-lang-btn[data-lang]').forEach(btn => {
        btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    });
}

// Arapça için RTL yönü uygula
function applyDocumentDir(lang: string) {
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.removeAttribute('dir');
    }
}

// Dil değiştirme işlemi
async function changeLanguage(lang: string) {
    const path = currentPath();
    if (isLocaleHomePage(path)) {
        const target = LOCALE_HOME[lang];
        if (target && path !== target) {
            saveLang(lang);
            window.location.href = target;
            return;
        }
    }

    await i18next.changeLanguage(lang);
    saveLang(lang);
    updateContent();
    updateDropdownUI(lang);
    updateLocaleNavLinks(lang);
    initCookieBanner();
}

function localeHomeUrl(lang: string): string {
    return LOCALE_HOME[lang] || '/';
}

function updateLocaleNavLinks(lang: string) {
    const home = localeHomeUrl(lang);
    const logo = document.querySelector('nav > a[href]') as HTMLAnchorElement | null;
    if (logo) logo.href = home;
    const homeNav = document.querySelector('#navLinks a[data-i18n="nav.home"]') as HTMLAnchorElement | null;
    if (homeNav) homeNav.href = home;
}

function isLangMenuOpen(menu: HTMLElement | null) {
    if (!menu) return false;
    return menu.classList.contains('open') || menu.matches(':popover-open');
}

function positionLangMenu() {
    const btn = document.getElementById('langDropBtn');
    const menu = document.getElementById('langDropMenu');
    if (!btn || !menu) return;
    if (menu.parentElement !== document.body) {
        document.body.appendChild(menu);
    }
    if (!menu.hasAttribute('popover')) {
        menu.setAttribute('popover', 'manual');
    }
    const r = btn.getBoundingClientRect();
    const rtl = document.documentElement.getAttribute('dir') === 'rtl';
    menu.style.setProperty('position', 'fixed', 'important');
    menu.style.setProperty('margin', '0', 'important');
    menu.style.setProperty('inset', 'auto', 'important');
    menu.style.setProperty('top', `${Math.round(r.bottom + 10)}px`, 'important');
    menu.style.setProperty('bottom', 'auto', 'important');
    menu.style.setProperty('z-index', '2147483646', 'important');
    if (rtl) {
        menu.style.setProperty('left', `${Math.round(r.left)}px`, 'important');
        menu.style.setProperty('right', 'auto', 'important');
    } else {
        menu.style.setProperty('left', 'auto', 'important');
        menu.style.setProperty('right', `${Math.round(window.innerWidth - r.right)}px`, 'important');
    }
}

function openLangDropdown() {
    const btn = document.getElementById('langDropBtn');
    const menu = document.getElementById('langDropMenu');
    if (!menu || !btn) return;
    menu.classList.add('open');
    btn.classList.add('open');
    positionLangMenu();
    const pop = menu as HTMLElement & { showPopover?: () => void };
    if (typeof pop.showPopover === 'function') {
        try { pop.showPopover(); } catch { /* already open */ }
        positionLangMenu();
    }
}

function closeLangDropdown() {
    const menu = document.getElementById('langDropMenu');
    menu?.classList.remove('open');
    document.getElementById('langDropBtn')?.classList.remove('open');
    const pop = menu as (HTMLElement & { hidePopover?: () => void }) | null;
    if (pop && typeof pop.hidePopover === 'function') {
        try { pop.hidePopover(); } catch { /* already closed */ }
    }
    if (menu) {
        ['position', 'top', 'left', 'right', 'bottom', 'inset', 'margin', 'z-index'].forEach((prop) => {
            menu.style.removeProperty(prop);
        });
    }
}

function closeMobileNav() {
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.getElementById('menuIcon');
    navLinks?.classList.remove('active');
    if (menuIcon) {
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
    }
}

function initMobileLangPicker() {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks || document.getElementById('mobileLangPicker')) return;

    const li = document.createElement('li');
    li.id = 'mobileLangPicker';
    li.className = 'mobile-lang-picker';
    li.innerHTML = `
        <p class="mobile-lang-label">Dil / Language</p>
        <div class="mobile-lang-grid">
            ${Object.entries(LANG_META).map(([code, meta]) =>
                `<button type="button" class="mobile-lang-btn" data-lang="${code}">
                    <span aria-hidden="true">${meta.flag}</span> ${meta.code}
                </button>`
            ).join('')}
        </div>
    `;
    navLinks.appendChild(li);
}

function initLangUI() {
    const prev = (window as unknown as { __langUiAbort?: AbortController }).__langUiAbort;
    prev?.abort();
    const ac = new AbortController();
    (window as unknown as { __langUiAbort?: AbortController }).__langUiAbort = ac;
    const { signal } = ac;

    const langDropBtn = document.getElementById('langDropBtn');
    const langDropMenu = document.getElementById('langDropMenu');

    initMobileLangPicker();

    langDropBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (isLangMenuOpen(langDropMenu)) {
            closeLangDropdown();
        } else {
            openLangDropdown();
        }
    }, { signal });

    document.addEventListener('click', (e) => {
        const wrap = document.getElementById('langDropdown');
        const menu = document.getElementById('langDropMenu');
        const t = e.target;
        if (t instanceof Node && (wrap?.contains(t) || menu?.contains(t))) return;
        closeLangDropdown();
    }, { signal });

    document.querySelectorAll('#langDropMenu a[data-lang], .mobile-lang-btn[data-lang]').forEach(el => {
        el.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const lang = el.getAttribute('data-lang');
            if (!lang) return;
            await changeLanguage(lang);
            closeLangDropdown();
            closeMobileNav();
        }, { signal });
    });
}

function initMobileMenu() {
    if (document.body.dataset.mobileMenuBound === '1') return;
    document.body.dataset.mobileMenuBound = '1';

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.getElementById('menuIcon');

    if (!menuToggle || !navLinks) return;

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
            closeMobileNav();
        }
    });
}

function onReady(fn: () => void) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

onReady(() => {
    initLangUI();
    initMobileMenu();
    initCookieBanner();
});

// --- ÇEVİRİ SİSTEMİ BİTİŞİ ---

// Sayfa yüklendikten sonra çalışacak ortak fonksiyonlar
window.addEventListener("load", () => {
    initPrivacyModal();
    initContactForm();
    initScrollTopButton();
    initHeroStatsAnimation();
    setupPhoneReveal();
    initCookieBanner();
});

// Gizlilik modal fonksiyonu
function initPrivacyModal() {
    const privacyLink = document.getElementById("privacyLink") as HTMLAnchorElement;
    const modal = document.getElementById("privacyModal") as HTMLDivElement;
    const closeBtn = document.getElementById("closePrivacy") as HTMLButtonElement;

    if (!privacyLink || !modal || !closeBtn) return;

    privacyLink.addEventListener("click", (e) => {
        const href = privacyLink.getAttribute("href") || "";
        if (href.includes("gizlilik")) return;
        e.preventDefault();
        e.stopPropagation();
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}

// Form submit handler (iletisim page)
function initContactForm() {
    const form = document.getElementById("contactForm") as HTMLFormElement | null;
    if (!form) return;

    const submitBtn = document.getElementById("contactSubmitBtn") as HTMLButtonElement | null;
    const successPanel = document.getElementById("formSuccessPanel");
    const errorMsg = document.getElementById("formErrorMsg");
    const resetBtn = document.getElementById("formResetBtn");
    const details = document.getElementById("cf-details") as HTMLTextAreaElement | null;
    const charCount = document.getElementById("charCount");
    const kvkkCheckbox = document.getElementById("privacy") as HTMLInputElement | null;
    const kvkkBox = document.getElementById("kvkkConsentBox");
    const kvkkError = document.getElementById("kvkkError");
    const submitKvkkHint = document.getElementById("submitKvkkHint");
    const phoneInput = document.getElementById("cf-phone") as HTMLInputElement | null;

    const sanitizePhone = () => {
        if (!phoneInput) return;
        phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 11);
    };

    phoneInput?.addEventListener("input", sanitizePhone);
    phoneInput?.addEventListener("paste", (e) => {
        e.preventDefault();
        const pasted = e.clipboardData?.getData("text") || "";
        phoneInput.value = pasted.replace(/\D/g, "").slice(0, 11);
    });
    phoneInput?.addEventListener("keydown", (e) => {
        const allowed = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End"];
        if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return;
        if (!/^\d$/.test(e.key)) e.preventDefault();
    });

    const updateKvkkState = () => {
        const accepted = Boolean(kvkkCheckbox?.checked);
        if (submitBtn) submitBtn.disabled = !accepted;
        if (accepted) {
            kvkkBox?.classList.remove("is-invalid");
            kvkkError?.classList.remove("show");
            submitKvkkHint?.classList.remove("show");
        }
    };

    kvkkCheckbox?.addEventListener("change", updateKvkkState);
    updateKvkkState();

    const requireKvkkConsent = (): boolean => {
        if (kvkkCheckbox?.checked) return true;
        kvkkBox?.classList.add("is-invalid");
        kvkkError?.classList.add("show");
        submitKvkkHint?.classList.add("show");
        if (kvkkError) kvkkError.textContent = i18next.t("contactPage.form.privacyRequired");
        kvkkBox?.scrollIntoView({ behavior: "smooth", block: "center" });
        kvkkCheckbox?.focus();
        return false;
    };

    if (details && charCount) {
        const updateCount = () => {
            charCount.textContent = String(details.value.length);
        };
        details.addEventListener("input", updateCount);
        updateCount();
    }

    const showSuccess = () => {
        form.style.display = "none";
        errorMsg?.classList.remove("show");
        successPanel?.classList.add("show");
        form.reset();
        if (charCount) charCount.textContent = "0";
        updateKvkkState();
    };

    const showError = (msg: string) => {
        if (!errorMsg) return;
        errorMsg.textContent = msg;
        errorMsg.classList.add("show");
    };

    resetBtn?.addEventListener("click", () => {
        successPanel?.classList.remove("show");
        form.style.display = "";
        errorMsg?.classList.remove("show");
        updateKvkkState();
    });

    const setLoading = (loading: boolean) => {
        if (!submitBtn) return;
        submitBtn.disabled = loading;
        if (loading) {
            submitBtn.dataset.originalHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i> <span>${i18next.t("contactPage.form.sending")}</span>`;
        } else if (submitBtn.dataset.originalHtml) {
            submitBtn.innerHTML = submitBtn.dataset.originalHtml;
            delete submitBtn.dataset.originalHtml;
        }
    };

    const mailtoFallback = (payload: Record<string, string>) => {
        const subject = `${i18next.t("contactPage.form.mailSubject")}: ${payload.name}`;
        const body = [
            `${i18next.t("contactPage.form.name")}: ${payload.name}`,
            `${i18next.t("contactPage.form.company")}: ${payload.company || "-"}`,
            `${i18next.t("contactPage.form.email")}: ${payload.email}`,
            `${i18next.t("contactPage.form.phone")}: ${payload.phone || "-"}`,
            `${i18next.t("contactPage.form.type")}: ${payload.projectType}`,
            `${i18next.t("contactPage.form.budget")}: ${payload.budget || "-"}`,
            `${i18next.t("contactPage.form.timeline")}: ${payload.timeline || "-"}`,
            "",
            payload.message,
        ].join("\n");
        window.location.href = `mailto:info@ozturksoft.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        showSuccess();
    };

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!requireKvkkConsent()) return;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const fd = new FormData(form);
        if (fd.get("_honey")) return;
        if (fd.get("kvkk") !== "accepted") {
            requireKvkkConsent();
            return;
        }

        const getSelectedText = (name: string) => {
            const select = form.querySelector<HTMLSelectElement>(`[name="${name}"]`);
            const opt = select?.selectedOptions?.[0];
            if (!opt?.value) return "";
            return (opt.textContent || opt.value).trim();
        };

        const payload = {
            name: String(fd.get("adSoyad") || "").trim(),
            company: String(fd.get("sirket") || "").trim(),
            email: String(fd.get("email") || "").trim(),
            phone: String(fd.get("telefon") || "").trim(),
            projectType: getSelectedText("projeTuru"),
            budget: getSelectedText("butce"),
            timeline: getSelectedText("zaman"),
            message: String(fd.get("projeDetay") || "").trim(),
        };

        setLoading(true);
        errorMsg?.classList.remove("show");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    name: payload.name,
                    email: payload.email,
                    phone: payload.phone,
                    company: payload.company,
                    projectType: payload.projectType,
                    budget: payload.budget,
                    timeline: payload.timeline,
                    message: payload.message,
                    kvkkConsent: "accepted",
                    kvkkConsentAt: new Date().toISOString(),
                    honeypot: String(fd.get("_honey") || ""),
                }),
            });

            if (res.ok) {
                showSuccess();
            } else {
                showError(i18next.t("contactPage.form.error"));
            }
        } catch {
            mailtoFallback(payload);
        } finally {
            setLoading(false);
            updateKvkkState();
        }
    });
}

// Scroll to top button
function initScrollTopButton() {
    const btn = document.getElementById("scrollTopBtn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) btn.classList.add("show");
        else btn.classList.remove("show");
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Hero stats animasyonu
function initHeroStatsAnimation() {
    const stats = document.querySelectorAll<HTMLSpanElement>(".stat-number");
    if (!stats.length) return;

    stats.forEach((stat) => {
        const target = parseFloat(stat.dataset.target || "0");
        let count = 0;
        const increment = target / 200;

        const update = () => {
            count += increment;
            if (count < target) {
                stat.textContent = Math.floor(count).toString();
                requestAnimationFrame(update);
            } else {
                stat.textContent = target.toString();
            }
        };

        update();
    });
}

// Telefon Gösterme ve Arama Mantığı (Tek bir fonksiyonda birleştirildi ve temizlendi)
function setupPhoneReveal() {
    document.addEventListener('click', function(e) {
        const target = e.target as HTMLElement;
        const revealBtn = target.closest('#revealBtn') as HTMLButtonElement;

        if (revealBtn) {
            e.preventDefault(); 
            const phoneDisplay = document.getElementById('phoneDisplay');
            const realNumber = "+90 546 549 68 06"; // Kendi numaranı yaz

            if (phoneDisplay) {
                // 1. Numarayı ekranda göster ve yeşil yap
                phoneDisplay.innerText = realNumber;
                phoneDisplay.style.color = "#10b981";
                
                // 2. Butonun içini Çeviri Etiketi (data-i18n) ile yenile
                revealBtn.innerHTML = `<i class="fas fa-phone"></i> <span data-i18n="contactPage.cards.phone.callNow">Hemen Ara</span>`;
                revealBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
                revealBtn.style.border = "none";
                
                // 3. Sistemi Uyar: "Yeni kelime ekledim, İngilizceysen hemen çevir!"
                updateContent();
                
                // 4. Butonun görevini değiştir: Artık tıklayınca arama yapsın
                revealBtn.onclick = function(event) {
                    event.preventDefault();
                    window.location.href = `tel:${realNumber.replace(/\s/g, "")}`;
                };
            }
        }
    });
}