import nodemailer from 'nodemailer';

const POLICY_VERSION = '2026-11-18-ga';
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
  const to = envTo && !/@ozturksoft\.net$/i.test(envTo) ? envTo : user;
  return { user, pass, to: to || user };
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

// Where the visitor came from: site path, external host, or nothing
function sourceLabel(raw) {
  const ref = String(raw || '').trim().slice(0, 200);
  if (!ref || ref === 'doğrudan') return 'Doğrudan / bilinmiyor';
  if (ref.startsWith('/')) return `Site içi · ${ref}`;
  const host = ref.replace(/^www\./, '');
  const known = [
    [/(^|\.)google\./, 'Google'], [/(^|\.)bing\.com$/, 'Bing'], [/(^|\.)yandex\./, 'Yandex'],
    [/(^|\.)duckduckgo\.com$/, 'DuckDuckGo'], [/(^|\.)linkedin\.com$|^lnkd\.in$/, 'LinkedIn'],
    [/(^|\.)(facebook|instagram)\.com$/, 'Meta'], [/(^|\.)(chatgpt\.com|openai\.com)$/, 'ChatGPT'],
    [/(^|\.)perplexity\.ai$/, 'Perplexity'], [/(^|\.)gemini\.google\.com$/, 'Gemini'],
    [/(^|\.)clutch\.co$/, 'Clutch'], [/(^|\.)goodfirms\.co$/, 'GoodFirms'],
  ];
  const hit = known.find(([re]) => re.test(host));
  return hit ? `${hit[1]} · ${host}` : host;
}

// Approximate location Vercel derives from the IP (city, country)
function approxLocation(req) {
  const dec = (v) => {
    try { return decodeURIComponent(String(v || '')); } catch { return String(v || ''); }
  };
  const city = dec(req.headers['x-vercel-ip-city']).slice(0, 60);
  const country = dec(req.headers['x-vercel-ip-country']).slice(0, 8);
  return [city, country].filter(Boolean).join(', ') || 'Bilinmiyor';
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
  const label = choice === 'all' ? 'Kabul Et' : 'Yalnızca Zorunlu';
  const source = sourceLabel(body.referrer);
  const location = approxLocation(req);
  const pageUrl = path ? `https://ozturksoft.net${path}` : '';
  const rows = [
    ['Sayfa', path ? `<a href="${escapeHtml(pageUrl)}" style="color:#93c5fd;text-decoration:underline">${escapeHtml(path)}</a>` : '—'],
    ['Geldiği yer', escapeHtml(source)],
    ['Konum', escapeHtml(location)],
    ['Zaman', escapeHtml(nowTr)],
    ['Dil', escapeHtml(lang || '—')],
    ['IP', escapeHtml(ip || '—')],
    ['Tarayıcı', `<span style="font-size:13px;word-break:break-all;overflow-wrap:anywhere">${escapeHtml(ua || '—')}</span>`],
  ];
  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 12px 10px 0;width:110px;vertical-align:top;color:#94a3b8;font-size:15px">${k}</td>` +
        `<td style="padding:10px 0;color:#e2e8f0;font-size:15px;word-break:break-word;overflow-wrap:anywhere">${v}</td></tr>`
    )
    .join('');

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Ozturksoft KVKK kayıt" <${user}>`,
      to,
      subject: `[Çerez] ${label} · ${path || '/'} · ${nowTr}`,
      headers: { 'X-Entity-Ref-ID': 'ozturksoft-cerez-onayi' },
      text: [
        'OZTURKSOFT · ÇEREZ TERCİHİ KAYDI',
        '',
        `Tercih: ${label} (${choice})`,
        `Sayfa: ${path || '—'}`,
        `Geldiği yer: ${source}`,
        `Konum (IP'ye göre yaklaşık): ${location}`,
        `Zaman: ${nowTr} (${nowIso})`,
        `Dil: ${lang || '—'}`,
        `IP: ${ip || '—'}`,
        `Tarayıcı: ${ua || '—'}`,
        `Politika: ${POLICY_URL} · ${policyVersion}`,
        '',
        'KVKK ispat kaydı (6698 sayılı Kanun, hesap verebilirlik). Pazarlama listesi değildir.',
      ].join('\n'),
      html: `
        <div style="background:#020617;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
          <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;table-layout:fixed;margin:0 auto;background:#0f172a;border:1px solid #1e293b;border-radius:16px;overflow:hidden">
            <tr><td style="background:#1d4ed8;background-image:linear-gradient(135deg,#2563eb 0%,#1e3a8a 100%);padding:24px 20px">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#bfdbfe">Ozturksoft · Çerez tercihi kaydı</p>
              <p style="margin:0;font-size:22px;line-height:1.3;font-weight:800;color:#ffffff;overflow-wrap:anywhere">${escapeHtml(label)} · ${escapeHtml(path || '/')}</p>
            </td></tr>
            <tr><td style="padding:18px 20px 8px">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed">${rowsHtml}</table>
            </td></tr>
            <tr><td style="padding:8px 20px 22px;font-size:13px;line-height:1.6;color:#64748b">
              KVKK ispat kaydı · ${escapeHtml(policyVersion)} · <a href="${POLICY_URL}" style="color:#64748b">gizlilik</a> · pazarlama listesi değildir
            </td></tr>
          </table>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Consent kayıt hatası:', err?.message);
    return res.status(500).json({ ok: false, error: 'Kayıt gönderilemedi.' });
  }
}
