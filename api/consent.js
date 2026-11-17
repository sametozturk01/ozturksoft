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

// Short, readable device/browser summary from the user agent
function uaSummary(ua) {
  const u = String(ua || '');
  if (!u) return '—';
  let device = 'Bilinmeyen cihaz';
  let os = '';
  let m;
  if ((m = u.match(/iPhone OS (\d+)[_.](\d+)/))) { device = 'iPhone'; os = `iOS ${m[1]}.${m[2]}`; }
  else if ((m = u.match(/iPad.*OS (\d+)[_.](\d+)/))) { device = 'iPad'; os = `iPadOS ${m[1]}.${m[2]}`; }
  else if ((m = u.match(/Android (\d+(?:\.\d+)?)/))) { device = /Mobile/.test(u) ? 'Android telefon' : 'Android tablet'; os = `Android ${m[1]}`; }
  else if (/Windows NT/.test(u)) { device = 'Bilgisayar'; os = 'Windows'; }
  else if ((m = u.match(/Mac OS X (\d+)[_.](\d+)/))) { device = 'Mac'; os = `macOS ${m[1]}.${m[2]}`; }
  else if (/Linux/.test(u)) { device = 'Bilgisayar'; os = 'Linux'; }
  let browser = 'Tarayıcı';
  if (/FBAN|FBAV|Instagram/.test(u)) browser = 'Facebook/Instagram uygulaması';
  else if (/EdgA?\//.test(u)) browser = 'Edge';
  else if (/SamsungBrowser/.test(u)) browser = 'Samsung Internet';
  else if (/OPR\//.test(u)) browser = 'Opera';
  else if (/Firefox|FxiOS/.test(u)) browser = 'Firefox';
  else if (/Chrome|CriOS/.test(u)) browser = 'Chrome';
  else if (/Safari/.test(u)) browser = 'Safari';
  return [device, os, browser].filter(Boolean).join(' · ');
}

// Crawlers and link-preview bots that sometimes run the cookie banner
function botHint(ip, ua) {
  const u = String(ua || '');
  if (/bot|crawler|spider|preview|facebookexternalhit|HeadlessChrome|Lighthouse/i.test(u)) return 'Tarayıcı kimliği bot/önizleme aracına ait';
  if (/^(173\.252\.|69\.171\.|66\.220\.|31\.13\.|157\.240\.|69\.63\.)/.test(String(ip || ''))) return 'IP Meta (Facebook) ağına ait; muhtemelen link önizleme botu';
  return '';
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
  const bot = botHint(ip, ua);
  const pageUrl = path ? `https://ozturksoft.net${path}` : '';
  const pageName = path === '/' || !path ? 'Ana sayfa (/)' : path;
  const badge =
    choice === 'all'
      ? { text: 'Kabul Et', bg: '#dcfce7', fg: '#166534', border: '#86efac' }
      : { text: 'Yalnızca Zorunlu', bg: '#fef3c7', fg: '#92400e', border: '#fcd34d' };
  const rows = [
    ['Sayfa', `<a href="${escapeHtml(pageUrl || 'https://ozturksoft.net/')}" style="color:#1d4ed8;text-decoration:underline;font-weight:600">${escapeHtml(pageName)}</a>`],
    ['Geldiği yer', escapeHtml(source)],
    ['Konum', `${escapeHtml(location)} <span style="color:#64748b;font-size:13px">(IP'ye göre yaklaşık)</span>`],
    ['Zaman', escapeHtml(nowTr)],
    ['Dil', escapeHtml((lang || '—').toUpperCase())],
    ['IP', escapeHtml(ip || '—')],
    ['Cihaz', `<strong style="color:#0f172a">${escapeHtml(uaSummary(ua))}</strong><br><span style="color:#64748b;font-size:12px;line-height:1.5;word-break:break-all;overflow-wrap:anywhere">${escapeHtml(ua || '—')}</span>`],
  ];
  const rowsHtml = rows
    .map(
      ([k, v], i) =>
        `<tr><td style="padding:12px 12px 12px 0;width:104px;vertical-align:top;color:#64748b;font-size:14px;${i ? 'border-top:1px solid #e2e8f0;' : ''}">${k}</td>` +
        `<td style="padding:12px 0;vertical-align:top;color:#0f172a;font-size:15px;line-height:1.5;word-break:break-word;overflow-wrap:anywhere;${i ? 'border-top:1px solid #e2e8f0;' : ''}">${v}</td></tr>`
    )
    .join('');
  const botHtml = bot
    ? `<tr><td style="padding:0 20px 4px"><div style="background:#fff7ed;border:1px solid #fdba74;border-radius:10px;padding:10px 14px;color:#9a3412;font-size:14px;line-height:1.5"><strong>Muhtemelen bot:</strong> ${escapeHtml(bot)}.</div></td></tr>`
    : '';

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
        `Cihaz: ${uaSummary(ua)}`,
        `Tarayıcı: ${ua || '—'}`,
        ...(bot ? [`Not: Muhtemelen bot — ${bot}`] : []),
        `Politika: ${POLICY_URL} · ${policyVersion}`,
        '',
        'KVKK ispat kaydı (6698 sayılı Kanun, hesap verebilirlik). Pazarlama listesi değildir.',
      ].join('\n'),
      html: `
        <div style="background:#f1f5f9;padding:20px 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
          <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;table-layout:fixed;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-top:6px solid #2563eb;border-radius:14px">
            <tr><td style="padding:22px 20px 6px">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#2563eb">Ozturksoft · Çerez tercihi kaydı</p>
              <p style="margin:0 0 12px;font-size:21px;line-height:1.35;font-weight:800;color:#0f172a;overflow-wrap:anywhere">${escapeHtml(pageName)}</p>
              <span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${badge.bg};border:1px solid ${badge.border};color:${badge.fg};font-size:13px;font-weight:700">${badge.text}</span>
            </td></tr>
            ${botHtml}
            <tr><td style="padding:10px 20px 6px">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed">${rowsHtml}</table>
            </td></tr>
            <tr><td style="padding:12px 20px 20px;font-size:12px;line-height:1.6;color:#64748b;border-top:1px solid #e2e8f0">
              KVKK ispat kaydı · politika ${escapeHtml(policyVersion)} · <a href="${POLICY_URL}" style="color:#64748b">ozturksoft.net/gizlilik</a><br>Pazarlama listesi değildir.
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
