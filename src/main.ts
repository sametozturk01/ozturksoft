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

i18next.init({
    lng: pageLang,
    fallbackLng: 'tr',
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
    updateDropdownUI(pageLang);
    applyDocumentDir(pageLang);
    updateLocaleNavLinks(pageLang);
});

// Çeviriyi Ekrana Uygulayan Fonksiyon
function updateContent() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (key) {
            el.innerHTML = i18next.t(key);
        }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (key && (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) {
            el.placeholder = i18next.t(key);
        }
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
    applyDocumentDir(lang);
    updateLocaleNavLinks(lang);
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

function closeLangDropdown() {
    document.getElementById('langDropMenu')?.classList.remove('open');
    document.getElementById('langDropBtn')?.classList.remove('open');
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
    if (document.body.dataset.langUiBound === '1') return;
    document.body.dataset.langUiBound = '1';

    const langDropBtn = document.getElementById('langDropBtn');
    const langDropMenu = document.getElementById('langDropMenu');
    const langDropdown = document.getElementById('langDropdown');

    initMobileLangPicker();

    langDropBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const willOpen = !langDropMenu?.classList.contains('open');
        if (willOpen) {
            langDropMenu?.classList.add('open');
            langDropBtn.classList.add('open');
        } else {
            closeLangDropdown();
        }
    });

    document.addEventListener('click', (e) => {
        if (!langDropdown?.contains(e.target as Node)) {
            closeLangDropdown();
        }
    });

    document.querySelectorAll('#langDropMenu a[data-lang], .mobile-lang-btn[data-lang]').forEach(el => {
        el.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const lang = el.getAttribute('data-lang');
            if (!lang) return;
            if (lang === i18next.language && !isLocaleHomePage()) return;
            await changeLanguage(lang);
            closeLangDropdown();
            closeMobileNav();
        });
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

document.addEventListener('DOMContentLoaded', () => {
    initLangUI();
    initMobileMenu();
});

// --- ÇEVİRİ SİSTEMİ BİTİŞİ ---

// Sayfa yüklendikten sonra çalışacak ortak fonksiyonlar
window.addEventListener("load", () => {
    initPrivacyModal();
    initContactForm();
    initScrollTopButton();
    initHeroStatsAnimation();
    setupPhoneReveal();
});

// Gizlilik modal fonksiyonu
function initPrivacyModal() {
    const privacyLink = document.getElementById("privacyLink") as HTMLAnchorElement;
    const modal = document.getElementById("privacyModal") as HTMLDivElement;
    const closeBtn = document.getElementById("closePrivacy") as HTMLButtonElement;

    if (!privacyLink || !modal || !closeBtn) return;

    privacyLink.addEventListener("click", (e) => {
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
        window.location.href = `mailto:info.ozturksoft@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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