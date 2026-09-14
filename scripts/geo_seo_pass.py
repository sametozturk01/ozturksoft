#!/usr/bin/env python3
"""Inject GEO discovery links + social tags on commercial landings."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

LANDINGS = [
    "ai-agent.html",
    "ankara-ai-asistan.html",
    "ankara-kamu-yapay-zeka.html",
    "ankara-web-tasarim.html",
    "ankara-yapay-zeka-cozumleri.html",
    "ankara-yazilim-sirketi.html",
    "chatbot-yaptirmak.html",
    "e-fatura-entegrasyonu.html",
    "e-ticaret-sitesi-yaptirmak.html",
    "fatura-okuma.html",
    "hizmetler.html",
    "logo-netsis-entegrasyon.html",
    "mobil-uygulama-yaptirmak.html",
    "ozel-yazilim-yaptirmak.html",
    "qa-test-hizmeti.html",
    "surec-otomasyonu.html",
    "trendyol-entegrasyonu.html",
    "web-sitesi-yaptirmak-ankara.html",
    "whatsapp-chatbot-yaptirmak.html",
    "yapay-zeka-danismanligi.html",
    "yapay-zeka-entegrasyonu.html",
    "iletisim.html",
    "hakkimizda.html",
    "blog.html",
]

LLMS = '    <link rel="alternate" type="text/plain" href="https://ozturksoft.net/llms.txt" title="LLM Context" />\n'
AI = '    <link rel="alternate" type="text/plain" href="https://ozturksoft.net/ai.txt" title="AI Context" />\n'
SITE = '    <meta property="og:site_name" content="Ozturksoft">\n'
TW = '    <meta name="twitter:card" content="summary_large_image">\n'


def inject(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    orig = text
    if "ozturksoft.net/llms.txt" not in text:
        # after first canonical
        if 'rel="canonical"' in text:
            i = text.find("rel=\"canonical\"")
            end = text.find(">", i) + 1
            if text[end] == "\n":
                end += 1
            text = text[:end] + LLMS + AI + text[end:]
        else:
            text = text.replace("<head>", "<head>\n" + LLMS + AI, 1)
    if 'og:site_name' not in text and "og:type" in text:
        text = text.replace(
            '<meta property="og:type" content="website">',
            '<meta property="og:type" content="website">\n' + SITE.rstrip("\n") + "\n" + TW.rstrip("\n"),
            1,
        )
    elif 'twitter:card' not in text and "og:type" in text:
        text = text.replace(
            '<meta property="og:type" content="website">',
            '<meta property="og:type" content="website">\n' + TW.rstrip("\n"),
            1,
        )
    if text != orig:
        path.write_text(text, encoding="utf-8")
        return "updated"
    return "skip"


def main() -> None:
    for name in LANDINGS:
        p = ROOT / name
        if not p.exists():
            print("missing", name)
            continue
        print(inject(p), name)


if __name__ == "__main__":
    main()
