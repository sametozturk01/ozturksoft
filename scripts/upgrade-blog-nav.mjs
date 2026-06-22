import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogDir = resolve(__dirname, '../blog');

const NAV_EXTRA_CSS = `.btn{display:inline-block;padding:14px 28px;border-radius:8px;font-weight:700;text-decoration:none;transition:.3s}.btn-primary:hover{background:#2563eb}.menu-toggle{display:none;background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer}@media(max-width:768px){nav{height:70px!important;padding:0 5%!important}.logo-img{height:70px!important}.menu-toggle{display:block!important;color:#fff;font-size:1.5rem;z-index:3000}.nav-links{position:fixed!important;top:0;right:0;width:280px;height:100vh;background:#0f172a;display:flex!important;flex-direction:column!important;padding:100px 30px!important;z-index:2500;transform:translateX(100%);transition:transform .4s ease-in-out;box-shadow:-10px 0 30px rgba(0,0,0,.5)}.nav-links.active{transform:translateX(0%)!important}.btn{width:100%}}.lang-drop-wrap{position:relative}.lang-drop-btn{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);color:#fff;padding:9px 16px;border-radius:50px;cursor:pointer;font-size:.85rem;font-weight:600;display:flex;align-items:center;gap:8px;transition:all .25s ease;white-space:nowrap}.lang-drop-btn:hover{background:rgba(59,130,246,.18);border-color:rgba(59,130,246,.5)}.lang-drop-btn .chev{transition:transform .25s ease;font-size:.6rem;opacity:.7}.lang-drop-btn.open .chev{transform:rotate(180deg)}#langDropMenu{position:absolute;top:calc(100% + 12px);right:0;background:rgba(10,16,32,.97);border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden;min-width:185px;box-shadow:0 24px 60px rgba(0,0,0,.7);display:none;z-index:2000;backdrop-filter:blur(20px)}#langDropMenu.open{display:block}.ldm-header{padding:10px 16px 8px;font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);font-weight:600;border-bottom:1px solid rgba(255,255,255,.06)}#langDropMenu a{display:flex;align-items:center;gap:11px;padding:11px 16px;color:rgba(255,255,255,.65);text-decoration:none;font-size:.875rem;font-weight:500;border-bottom:1px solid rgba(255,255,255,.04);position:relative}#langDropMenu a:last-child{border-bottom:none}#langDropMenu a:hover{background:rgba(59,130,246,.14);color:#fff}#langDropMenu a.ldm-active{color:#fff;font-weight:700;background:rgba(59,130,246,.16)}#langDropMenu a.ldm-active::after{content:'✓';position:absolute;right:14px;color:var(--primary);font-size:.85rem}.ldm-flag{font-size:1.1rem;line-height:1}.ldm-name{flex:1}nav.breadcrumb::after{display:none!important}`;

const FULL_NAV = `<nav>
  <a href="/"><img src="/images/logo.png" alt="Ozturksoft Logo" class="logo-img" width="187" height="180" loading="eager"></a>
  <ul class="nav-links" id="navLinks">
    <li><a href="/" data-i18n="nav.home">Ana Sayfa</a></li>
    <li><a href="/hakkimizda" data-i18n="nav.about">Hakkımızda</a></li>
    <li><a href="/hizmetler" data-i18n="nav.services">Hizmetler</a></li>
    <li><a href="/ankara-yapay-zeka-cozumleri" data-i18n="nav.ai">Yapay Zeka</a></li>
    <li><a href="/blog" style="color:var(--primary)" data-i18n="nav.blog">Blog</a></li>
    <li><a href="/iletisim" data-i18n="nav.contact">İletişim</a></li>
  </ul>
  <div style="display:flex;align-items:center;gap:10px">
    <div class="lang-drop-wrap" id="langDropdown">
      <button class="lang-drop-btn" id="langDropBtn" aria-label="Select language" type="button">
        <span id="langLabel">🇹🇷</span>
        <span id="langCode">TR</span>
        <i class="fas fa-chevron-down chev"></i>
      </button>
      <div id="langDropMenu">
        <div class="ldm-header">Dil / Language</div>
        <a href="#" data-lang="tr" class="ldm-active"><span class="ldm-flag">🇹🇷</span><span class="ldm-name">Türkçe</span></a>
        <a href="#" data-lang="en"><span class="ldm-flag">🇬🇧</span><span class="ldm-name">English</span></a>
        <a href="#" data-lang="de"><span class="ldm-flag">🇩🇪</span><span class="ldm-name">Deutsch</span></a>
        <a href="#" data-lang="ar"><span class="ldm-flag">🇸🇦</span><span class="ldm-name">العربية</span></a>
        <a href="#" data-lang="ru"><span class="ldm-flag">🇷🇺</span><span class="ldm-name">Русский</span></a>
        <a href="#" data-lang="fr"><span class="ldm-flag">🇫🇷</span><span class="ldm-name">Français</span></a>
      </div>
    </div>
    <a href="/iletisim" class="btn btn-primary" style="padding:10px 20px;font-size:.85rem" data-i18n="nav.quoteBtn">Teklif Al</a>
    <div class="menu-toggle" id="menuToggle"><i class="fas fa-bars" id="menuIcon" style="color:white"></i></div>
  </div>
</nav>`;

const NAV_RE = /<nav>[\s\S]*?<\/nav>/;

const files = [
  'crm-erp-entegrasyonu-rehberi-2026.html',
  'e-ticaret-sitesi-yaptirmak-maliyeti-2026.html',
  'kurumsal-web-sitesi-yaptirmak-rehberi-2026.html',
  'mobil-uygulama-maliyeti-2026.html',
  'ozel-yazilim-gelistirme-nedir-rehberi.html',
  'whatsapp-chatbot-isletme-rehberi-2026.html',
  'yapay-zeka-danismanligi-isletmeler-rehberi-2026.html',
];

for (const file of files) {
  const path = resolve(blogDir, file);
  let html = readFileSync(path, 'utf8');

  if (html.includes('langDropBtn')) {
    console.log('Skip (already upgraded):', file);
    continue;
  }

  if (!NAV_RE.test(html)) {
    console.warn('Nav block not found:', file);
    continue;
  }

  html = html.replace(NAV_RE, FULL_NAV);

  if (!html.includes('#langDropMenu{position:absolute')) {
    html = html.replace('</style>', `${NAV_EXTRA_CSS}</style>`);
  }

  // Ensure navLinks id on ul
  html = html.replace(/<ul class="nav-links">/g, '<ul class="nav-links" id="navLinks">');

  writeFileSync(path, html);
  console.log('Upgraded:', file);
}
