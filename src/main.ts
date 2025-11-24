// main.ts

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
