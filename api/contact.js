import nodemailer from 'nodemailer';

const SITE_ORIGINS = [
  'https://ozturksoft.net',
  'https://www.ozturksoft.net',
  'http://localhost:5173',
  'http://localhost:3000',
];

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isAllowedRequest(req) {
  if (process.env.VERCEL_ENV !== 'production') return true;
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  if (SITE_ORIGINS.includes(origin)) return true;
  return SITE_ORIGINS.some((site) => referer.startsWith(site));
}

function getSmtpConfig() {
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s/g, '');
  const to = (process.env.CONTACT_TO || process.env.CONTACT_TO_EMAIL || user).trim();
  return { user, pass, to };
}

function parseBody(req) {
  const raw = req.body;
  if (!raw) return {};
  if (typeof raw === 'object') return raw;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return {};
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Powered-By', 'Ozturksoft');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Yalnızca POST kabul edilir.' });
  }

  if (!isAllowedRequest(req)) {
    return res.status(403).json({ ok: false, error: 'İzin verilmeyen istek.' });
  }

  const body = parseBody(req);
  if (body.honeypot || body._honey) {
    return res.status(200).json({ ok: true });
  }

  if (body.kvkkConsent !== 'accepted') {
    return res.status(400).json({ ok: false, error: 'KVKK onayı gerekli.' });
  }

  const name = String(body.name || '').trim().slice(0, 120);
  const email = String(body.email || '').trim().toLowerCase().slice(0, 254);
  const company = String(body.company || '').trim().slice(0, 120);
  const phone = String(body.phone || '').trim().slice(0, 30);
  const phoneDigits = phone.replace(/\D/g, '');
  const projectType = String(body.projectType || '').trim().slice(0, 120);
  const budget = String(body.budget || '').trim().slice(0, 80);
  const timeline = String(body.timeline || '').trim().slice(0, 80);
  const message = String(body.message || '').trim().slice(0, 2000);
  const kvkkConsentAt = String(body.kvkkConsentAt || new Date().toISOString());

  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ ok: false, error: 'Zorunlu alanları doldurun.' });
  }

  if (!phoneDigits || phoneDigits.length < 10 || phoneDigits.length > 11) {
    return res.status(400).json({ ok: false, error: 'Geçerli telefon numarası gerekli (10-11 rakam).' });
  }

  if (!/^5/.test(phoneDigits.replace(/^0/, ''))) {
    return res.status(400).json({ ok: false, error: 'Geçerli bir cep telefonu numarası girin.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Geçersiz e-posta.' });
  }

  const { user, pass, to } = getSmtpConfig();
  if (!user || !pass) {
    console.error('SMTP_USER veya SMTP_PASS tanımlı değil');
    return res.status(503).json({ ok: false, error: 'Mail servisi yapılandırılmamış.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    await transporter.verify();

    const now = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
    const waLink = phoneDigits
      ? `https://wa.me/${phoneDigits.startsWith('90') ? phoneDigits : `90${phoneDigits.replace(/^0/, '')}`}`
      : '';

    const rows = [
      ['Ad Soyad', name],
      ['Şirket', company || '—'],
      ['E-posta', email],
      ['Telefon', phoneDigits],
      ['Proje Türü', projectType],
      ['Bütçe', budget || '—'],
      ['Başlangıç', timeline || '—'],
      ['KVKK Onayı', kvkkConsentAt],
    ];

    const tableHtml = rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:8px 0;color:#64748b;width:120px">${escapeHtml(label)}</td>` +
          `<td style="padding:8px 0;font-weight:600;color:#0f172a">${escapeHtml(value)}</td></tr>`
      )
      .join('');

    await transporter.sendMail({
      from: `"Ozturksoft İletişim Formu" <${user}>`,
      to,
      replyTo: email,
      subject: `[Teklif] ${projectType} — ${name}`,
      headers: { 'X-Entity-Ref-ID': 'ozturksoft-teklif-formu' },
      text: [
        '━━━ OZTURKSOFT TEKLİF FORMU ━━━',
        '',
        `Ad Soyad: ${name}`,
        `Şirket: ${company || '—'}`,
        `E-posta: ${email}`,
        `Telefon: ${phoneDigits}`,
        `Proje Türü: ${projectType}`,
        `Bütçe: ${budget || '—'}`,
        `Başlangıç: ${timeline || '—'}`,
        `KVKK: ${kvkkConsentAt}`,
        '',
        'Proje Detayları:',
        message,
        '',
        `Tarih: ${now}`,
        'Kaynak: ozturksoft.net/iletisim',
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
            <p style="margin:0;font-size:11px;opacity:.9;letter-spacing:.08em;text-transform:uppercase">Ozturksoft</p>
            <h2 style="margin:8px 0 0;font-size:20px">Yeni Proje Teklif Talebi</h2>
          </div>
          <div style="background:#f8fafc;padding:20px 24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px">${tableHtml}</table>
            <p style="margin:0 0 8px;color:#64748b;font-size:13px">Proje Detayları</p>
            <p style="margin:0;padding:14px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;color:#0f172a;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p>
            ${waLink ? `<p style="margin:20px 0 0"><a href="${waLink}" style="display:inline-block;background:#25D366;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">WhatsApp ile Yanıtla</a></p>` : ''}
            <p style="margin:16px 0 0;color:#94a3b8;font-size:12px">${now} · ozturksoft.net</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ ok: true, message: 'Talebiniz alındı.' });
  } catch (err) {
    console.error('Mail hatası:', err?.code, err?.responseCode, err?.message);

    if (err?.code === 'EAUTH' || err?.responseCode === 535) {
      return res.status(500).json({
        ok: false,
        error: 'E-posta ayarları hatalı. Gmail uygulama şifresini kontrol edin.',
      });
    }

    return res.status(500).json({ ok: false, error: 'E-posta gönderilemedi.' });
  }
}
