// main.ts
async function loadPage(page: string) {
  const app = document.getElementById("app")!;
  
  try {
    const res = await fetch(`./src/pages/${page}.html`);
    const html = await res.text();
    app.innerHTML = html;

    // Modal ve link event listener'larını ekle
    initPrivacyModal();

    // Form submit event listener
    initContactForm();
  } catch (err) {
    app.innerHTML = "<section class='content'><p>Sayfa bulunamadı.</p></section>";
  }
}

function router() {
  const hash = location.hash.replace("#", "") || "home";
  loadPage(hash);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
document.addEventListener("DOMContentLoaded", router);

// Gizlilik modal fonksiyonu
function initPrivacyModal() {
  const privacyLink = document.getElementById("privacyLink") as HTMLAnchorElement;
  const modal = document.getElementById("privacyModal") as HTMLDivElement;
  const closeBtn = document.getElementById("closePrivacy") as HTMLButtonElement;

  if (!privacyLink || !modal || !closeBtn) return;

  privacyLink.addEventListener("click", (e: Event) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e: MouseEvent) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

function initContactForm() {
  const form = document.querySelector<HTMLFormElement>("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    let body = `
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
