/**
 * Ozturksoft contact form API (Vercel serverless)
 *
 * Required env (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY       — https://resend.com API key
 *   CONTACT_TO_EMAIL     — default: info.ozturksoft@gmail.com
 *   CONTACT_FROM_EMAIL   — default: Ozturksoft İletişim <iletisim@ozturksoft.net>
 */

const ALLOWED_ORIGINS = new Set([
  "https://ozturksoft.net",
  "https://www.ozturksoft.net",
  "http://localhost:5173",
  "http://localhost:3000",
]);

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "info.ozturksoft@gmail.com";
const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL || "Ozturksoft İletişim <iletisim@ozturksoft.net>";

function corsOrigin(req) {
  const origin = req.headers.origin || "";
  if (!origin || ALLOWED_ORIGINS.has(origin)) return origin || "https://ozturksoft.net";
  if (process.env.NODE_ENV !== "production") return origin;
  return "https://ozturksoft.net";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildEmailHtml(data) {
  const rows = [
    ["Ad Soyad", data.name],
    ["Şirket / Kurum", data.company || "—"],
    ["E-posta", data.email],
    ["Telefon", data.phone || "—"],
    ["Proje Türü", data.projectType],
    ["Bütçe", data.budget || "—"],
    ["Hedef Başlangıç", data.timeline || "—"],
    ["KVKK Onayı", data.kvkkConsentAt || "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:160px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="utf-8"><title>Ozturksoft — Yeni Teklif Talebi</title></head>
<body style="margin:0;padding:24px;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;">
    <tr>
      <td style="background:linear-gradient(135deg,#1e3a8a,#3b82f6);padding:28px 32px;border-radius:16px 16px 0 0;">
        <p style="margin:0 0 6px;color:#93c5fd;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Ozturksoft</p>
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Yeni Proje Teklif Talebi</h1>
      </td>
    </tr>
    <tr>
      <td style="background:#fff;padding:28px 32px;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(15,23,42,.08);">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:24px;">
          ${tableRows}
        </table>
        <h2 style="margin:0 0 10px;font-size:15px;color:#1e40af;">Proje Detayları</h2>
        <p style="margin:0;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;color:#334155;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
        <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">Bu e-posta ozturksoft.net iletişim formu üzerinden gönderildi.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendViaResend(data) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 503, error: "E-posta servisi yapılandırılmamış." };
  }

  const subject = `Ozturksoft — ${data.projectType} — ${data.name}`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: data.email,
      subject,
      html: buildEmailHtml(data),
      text: [
        `Ozturksoft — Yeni Teklif Talebi`,
        ``,
        `Ad Soyad: ${data.name}`,
        `Şirket: ${data.company || "—"}`,
        `E-posta: ${data.email}`,
        `Telefon: ${data.phone || "—"}`,
        `Proje Türü: ${data.projectType}`,
        `Bütçe: ${data.budget || "—"}`,
        `Başlangıç: ${data.timeline || "—"}`,
        `KVKK: ${data.kvkkConsentAt}`,
        ``,
        `Detaylar:`,
        data.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Resend error:", response.status, detail);
    return { ok: false, status: 502, error: "E-posta gönderilemedi." };
  }

  return { ok: true };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", corsOrigin(req));
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("X-Powered-By", "Ozturksoft");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";
  if (process.env.NODE_ENV === "production") {
    const allowed = [...ALLOWED_ORIGINS].some(
      (o) => origin === o || referer.startsWith(o)
    );
    if (!allowed && origin) {
      return res.status(403).json({ ok: false, error: "Forbidden" });
    }
  }

  const body = req.body || {};
  const honeypot = String(body.honeypot || "").trim();
  if (honeypot) {
    return res.status(200).json({ ok: true });
  }

  if (body.kvkkConsent !== "accepted") {
    return res.status(400).json({ ok: false, error: "KVKK onayı gerekli." });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const company = String(body.company || "").trim();
  const phone = String(body.phone || "").trim();
  const projectType = String(body.projectType || "").trim();
  const budget = String(body.budget || "").trim();
  const timeline = String(body.timeline || "").trim();
  const message = String(body.message || "").trim();
  const kvkkConsentAt = String(body.kvkkConsentAt || new Date().toISOString());

  if (!name || name.length > 120) {
    return res.status(400).json({ ok: false, error: "Geçersiz ad soyad." });
  }
  if (!isValidEmail(email) || email.length > 254) {
    return res.status(400).json({ ok: false, error: "Geçersiz e-posta." });
  }
  if (!projectType || projectType.length > 80) {
    return res.status(400).json({ ok: false, error: "Proje türü gerekli." });
  }
  if (!message || message.length > 2000) {
    return res.status(400).json({ ok: false, error: "Proje detayı gerekli." });
  }

  const result = await sendViaResend({
    name,
    email,
    company,
    phone,
    projectType,
    budget,
    timeline,
    message,
    kvkkConsentAt,
  });

  if (!result.ok) {
    return res.status(result.status || 500).json({ ok: false, error: result.error });
  }

  return res.status(200).json({ ok: true, message: "Talebiniz alındı." });
}
