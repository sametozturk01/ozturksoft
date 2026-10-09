import nodemailer from 'nodemailer';

const POLICY_VERSION = '2026-09-27-ga';
const POLICY_URL = 'https://ozturksoft.net/gizlilik';

const SITE_ORIGINS = [
  'https://ozturksoft.net',
  'https://www.ozturksoft.net',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
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
  const envTo = (process.env.CONTACT_TO || process.env.CONTACT_TO_EMAIL || '').trim();
  const to = /@ozturksoft\.net$/i.test(envTo) ? envTo : 'info@ozturksoft.net';
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

function clientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim().slice(0, 64);
  const real = req.headers['x-real-ip'];
  if (typeof real === 'string' && real.trim()) return real.trim().slice(0, 64);
  return String(req.socket?.remoteAddress || '').slice(0, 64);
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Yalnızca POST.' });
  }
  if (!isAllowedRequest(req)) {
    return res.status(403).json({ ok: false, error: 'İzin verilmeyen istek.' });
  }

  const body = parseBody(req);
  const choice = body.choice === 'all' || body.choice === 'necessary' ? body.choice : '';
  if (!choice) {
    return res.status(400).json({ ok: false, error: 'Geçersiz tercih.' });
  }

  const { user, pass, to } = getSmtpConfig();
  if (!user || !pass) {
    return res.status(503).json({ ok: false, error: 'Kayıt servisi yapılandırılmamış.' });
  }

  const nowIso = new Date().toISOString();
  const nowTr = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
  const lang = String(body.lang || '').slice(0, 8);
  const path = String(body.path || '').slice(0, 200);
  const policyVersion = String(body.policyVersion || POLICY_VERSION).slice(0, 32);
  const ip = clientIp(req);
  const ua = String(req.headers['user-agent'] || '').slice(0, 240);
  const label = choice === 'all' ? 'Kabul et (all)' : 'Yalnızca zorunlu (necessary)';

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Ozturksoft KVKK kayıt" <${user}>`,
      to,
      subject: `[KVKK kayıt] çerez · ${choice} · ${nowTr}`,
      headers: { 'X-Entity-Ref-ID': 'ozturksoft-cerez-onayi' },
      text: [
        'OZTURKSOFT ÇEREZ / ONAY KAYDI (ispat)',
        '',
        `Tercih: ${label}`,
        `Zaman (ISO): ${nowIso}`,
        `Zaman (TR): ${nowTr}`,
        `Politika: ${POLICY_URL}`,
        `Politika sürümü: ${policyVersion}`,
        `Dil: ${lang || '—'}`,
        `Sayfa: ${path || '—'}`,
        `IP: ${ip || '—'}`,
        `User-Agent: ${ua || '—'}`,
        '',
        'Bu kayıt, 6698 sayılı Kanun kapsamındaki hesap verebilirlik (ispat) içindir. Pazarlama listesi değildir.',
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
          <p style="margin:0 0 12px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#64748b">KVKK ispat kaydı</p>
          <h2 style="margin:0 0 16px;font-size:18px">Çerez tercihi: ${escapeHtml(label)}</h2>
          <table style="width:100%;font-size:14px;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#64748b">Zaman</td><td>${escapeHtml(nowTr)}<br><span style="font-size:12px;color:#94a3b8">${escapeHtml(nowIso)}</span></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Politika</td><td><a href="${POLICY_URL}">${POLICY_URL}</a> · ${escapeHtml(policyVersion)}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Dil / sayfa</td><td>${escapeHtml(lang || '—')} · ${escapeHtml(path || '—')}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">IP</td><td>${escapeHtml(ip || '—')}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Tarayıcı</td><td style="word-break:break-all">${escapeHtml(ua || '—')}</td></tr>
          </table>
          <p style="margin:16px 0 0;font-size:12px;color:#94a3b8">Hesap verebilirlik kaydı — pazarlama listesi değil.</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Consent kayıt hatası:', err?.message);
    return res.status(500).json({ ok: false, error: 'Kayıt gönderilemedi.' });
  }
}
