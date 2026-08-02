import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
  server: {
    proxy: {
      '/api': {
        target: 'https://ozturksoft.net',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hakkimizda: resolve(__dirname, 'hakkimizda.html'),
        hizmetler: resolve(__dirname, 'hizmetler.html'),
        iletisim: resolve(__dirname, 'iletisim.html'),
        blog: resolve(__dirname, 'blog.html'),
        ankaraYapayZeka: resolve(__dirname, 'ankara-yapay-zeka-cozumleri.html'),
        ankaraYapayZekaFirmasi: resolve(__dirname, 'ankara-yapay-zeka-firmasi.html'),
        ankaraYazilimSirketi: resolve(__dirname, 'ankara-yazilim-sirketi.html'),
        ankaraAiAsistan: resolve(__dirname, 'ankara-ai-asistan.html'),
        ankaraKamuYapayZeka: resolve(__dirname, 'ankara-kamu-yapay-zeka.html'),
        sss: resolve(__dirname, 'sss.html'),
        // Blog posts
        blogAnkaraWebSitesi: resolve(__dirname, 'blog/ankara-web-sitesi-maliyeti-2026.html'),
        blogYapayZeka: resolve(__dirname, 'blog/yapay-zeka-entegrasyonu-rehberi.html'),
        blogQaTest: resolve(__dirname, 'blog/qa-test-nedir-yazilim-kalite-guvencesi.html'),
        blogMobilUygulama: resolve(__dirname, 'blog/mobil-uygulama-gelistirme-rehberi-2026.html'),
        blogChatbot: resolve(__dirname, 'blog/ankara-chatbot-gelistirme-2026.html'),
        blogAnkaraSecim: resolve(__dirname, 'blog/ankara-yazilim-sirketi-nasil-secilir-2026.html'),
        blogEticaret: resolve(__dirname, 'blog/e-ticaret-sitesi-yaptirmak-maliyeti-2026.html'),
        blogWhatsapp: resolve(__dirname, 'blog/whatsapp-chatbot-isletme-rehberi-2026.html'),
        blogOzelYazilim: resolve(__dirname, 'blog/ozel-yazilim-gelistirme-nedir-rehberi.html'),
        blogMobilMaliyet: resolve(__dirname, 'blog/mobil-uygulama-maliyeti-2026.html'),
        blogKurumsalWeb: resolve(__dirname, 'blog/kurumsal-web-sitesi-yaptirmak-rehberi-2026.html'),
        blogAiDanismanlik: resolve(__dirname, 'blog/yapay-zeka-danismanligi-isletmeler-rehberi-2026.html'),
        blogCrmErp: resolve(__dirname, 'blog/crm-erp-entegrasyonu-rehberi-2026.html'),
        blogLlm: resolve(__dirname, 'blog/llm-gpt-entegrasyonu-rehberi.html'),
        blogOtomasyon: resolve(__dirname, 'blog/ankara-surec-otomasyonu-rpa-yapay-zeka.html'),
        blogIstanbul: resolve(__dirname, 'blog/istanbul-yapay-zeka-cozumleri-rehberi.html'),
        blogIzmir: resolve(__dirname, 'blog/izmir-yapay-zeka-cozumleri-rehberi.html'),
        blogBursa: resolve(__dirname, 'blog/bursa-yapay-zeka-cozumleri-rehberi.html'),
        blogAntalya: resolve(__dirname, 'blog/antalya-yapay-zeka-cozumleri-rehberi.html'),
        blogKonya: resolve(__dirname, 'blog/konya-yapay-zeka-cozumleri-rehberi.html'),
        blogSeo: resolve(__dirname, 'blog/seo-nedir-onemi-rehberi-2026.html'),
        blogGeo: resolve(__dirname, 'blog/geo-nedir-generative-engine-optimization-rehberi-2026.html'),
        blogAnkaraAiAgents: resolve(__dirname, 'blog/ankara-ai-agents-gelistirme-2026.html'),
        blogAnkaraMcp: resolve(__dirname, 'blog/ankara-mcp-sunucu-gelistirme-2026.html'),
        blogAnkaraLaravel: resolve(__dirname, 'blog/ankara-laravel-yazilim-gelistirme-2026.html'),
        blogAnkaraSaas: resolve(__dirname, 'blog/ankara-saas-gelistirme-2026.html'),
        blogAnkaraOcr: resolve(__dirname, 'blog/ankara-ocr-belge-ai-2026.html'),
        blogAnkaraFlutter: resolve(__dirname, 'blog/ankara-flutter-uygulama-gelistirme-2026.html'),
        blogAnkaraTelecom: resolve(__dirname, 'blog/ankara-telekom-yazilim-2026.html'),
        blogAnkaraSanayi: resolve(__dirname, 'blog/ankara-sanayi-yazilim-2026.html'),
        blogAnkaraKamu: resolve(__dirname, 'blog/ankara-kamu-yazilim-2026.html'),
        blogLogoNetsisErp: resolve(__dirname, 'blog/logo-netsis-erp-entegrasyon-rehberi-2026.html'),
        blogKvkkAi: resolve(__dirname, 'blog/kvkk-uyumlu-yapay-zeka-rehberi-2026.html'),
        blogAnkaraAiSecim: resolve(__dirname, 'blog/ankara-yapay-zeka-firmasi-nasil-secilir-2026.html'),
        blogAnkaraAiKarsilastirma: resolve(__dirname, 'blog/ankara-yapay-zeka-firmalari-karsilastirma-2026.html'),
        blogAnkaraLlmMaliyet: resolve(__dirname, 'blog/ankara-llm-entegrasyonu-maliyeti-2026.html'),
        // Language pages are standalone static HTML, not Vite entry points
        // They are served as-is by the server (Vercel cleanUrls handles /en → en.html)
      }
    }
  }
});