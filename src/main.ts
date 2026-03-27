// main.ts

// 🔴 SEO FIX: Hash URL temizleme (Google duplicate fix)
if (window.location.hash) {
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
}

async function loadPage(page: string) {
  const app = document.getElementById("app")!;
  
  try {
    const res = await fetch(`./src/pages/${page}.html`);
    const html = await res.text();
    app.innerHTML = html;
    

    // Sayfa yüklendikten sonra tüm eventler ve animasyonlar
    initPrivacyModal();
    initContactForm();
    initScrollTopButton();
    initHeroStatsAnimation();
    window.scrollTo(0,0); // Sayfa değişince en üste çık
  } catch (err) {
    app.innerHTML = "<section class='content'><p>Sayfa bulunamadı.</p></section>";
  }
}

function router() {
  const hash = location.hash.replace("#", "") || "home";
  loadPage(hash);
}

// Sayfa yüklendiğinde ve hash değiştiğinde router çalışsın
window.addEventListener("hashchange", router);
window.addEventListener("load", router);

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

(window as any).revealPhone = function() {
    const phoneBtn = document.getElementById('phoneBtn');
    const phoneText = document.getElementById('phoneText');
    const realNumber = "+90 546 549 68 06"; // Numaranı buraya yaz

    if (phoneBtn && phoneText) {
        phoneText.innerText = realNumber;
        (phoneBtn as HTMLAnchorElement).href = `tel:${realNumber.replace(/\s/g, "")}`;
        phoneBtn.innerText = "Hemen Ara";
        phoneBtn.style.background = "#10b981";
    }
};

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

const setupPhoneReveal = () => {
    const btn = document.getElementById('revealBtn');
    const display = document.getElementById('phoneDisplay');
    const realNumber = "+90 555 123 45 67"; // Kendi numaranı buraya yaz

    if (btn && display) {
        btn.onclick = () => {
            // 1. Yazıyı gerçek numara ile değiştir
            display.innerText = realNumber;
            display.style.color = "#10b981"; // Başarılı (Yeşil) renk verelim
            
            // 2. Butonu "Hemen Ara" butonuna dönüştür
            btn.innerHTML = `<i class="fas fa-phone"></i> Hemen Ara`;
            btn.style.background = "#10b981";
            
            // 3. Butona tıklandığında artık arama yapmasını sağla
            btn.onclick = () => {
                window.location.href = `tel:${realNumber.replace(/\s/g, "")}`;
            };
        };
    }
};

// Sayfa her yüklendiğinde bu kontrolü çalıştır
setupPhoneReveal();


// Bu kod her türlü çakışmayı aşar ve direkt çalışır
document.addEventListener('click', function(e) {
    const target = e.target as HTMLElement;
    
    // Eğer tıklanan şey bizim butonumuzsa veya butonun içindeki ikonsa
    if (target && (target.id === 'revealBtn' || target.parentElement?.id === 'revealBtn')) {
        const display = document.getElementById('phoneDisplay');
        const btn = document.getElementById('revealBtn');
        const realNumber = "+90 546 549 68 06"; // Kendi numaranı yaz

        if (display && btn) {
            display.innerText = realNumber;
            display.style.color = "#10b981";
            btn.innerHTML = `<i class="fas fa-phone"></i> Hemen Ara`;
            btn.style.background = "#10b981";
            
            // İkinci tıklamada arama yapması için
            btn.onclick = () => {
                window.location.href = `tel:${realNumber.replace(/\s/g, "")}`;
            };
        }
    }
});

