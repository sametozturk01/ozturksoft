import i18next from 'i18next';
import trTranslation from './i18n/tr.json';
import enTranslation from './i18n/en.json';

// --- İ18N (ÇEVİRİ) SİSTEMİ KURULUMU ---
i18next.init({
    lng: 'tr',
    fallbackLng: 'tr',
    resources: {
        tr: { translation: trTranslation },
        en: { translation: enTranslation }
    }
}).then(() => {
    updateContent();
});

// Çeviriyi Ekrana Uygulayan Fonksiyon
function updateContent() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (key) {
            el.innerHTML = i18next.t(key);
        }
    });
}

// Dil Değiştirme Buton Kontrolleri
const btnEN = document.getElementById("lang-en");
const btnTR = document.getElementById("lang-tr");

if (btnEN && btnTR) {
    btnEN.addEventListener("click", async (e) => {
        e.preventDefault();
        await i18next.changeLanguage('en');
        updateContent();
        btnEN.style.display = "none";
        btnTR.style.display = "flex";
    });

    btnTR.addEventListener("click", async (e) => {
        e.preventDefault();
        await i18next.changeLanguage('tr');
        updateContent();
        btnTR.style.display = "none";
        btnEN.style.display = "flex";
    });
}
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
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}

// Form submit handler
function initContactForm() {
    const form = document.querySelector<HTMLFormElement>("form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const body = `
Ad Soyad: ${formData.get("adSoyad") || ""}
Şirket: ${formData.get("sirket") || ""}
E-posta: ${formData.get("email") || ""}
Telefon: ${formData.get("telefon") || ""}
Proje Türü: ${formData.get("projeTuru") || ""}
Bütçe: ${formData.get("butce") || ""}
Proje Detayları: ${formData.get("projeDetay") || ""}
`;
        const subject = `Teklif Talebi: ${formData.get("adSoyad") || ""}`;
        const mailtoLink = `mailto:info.ozturksoft@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
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