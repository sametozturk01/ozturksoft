import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hakkimizda: resolve(__dirname, 'hakkimizda.html'),
        hizmetler: resolve(__dirname, 'hizmetler.html'),
        iletisim: resolve(__dirname, 'iletisim.html'),
        blog: resolve(__dirname, 'blog.html'),
        ankaraYapayZeka: resolve(__dirname, 'ankara-yapay-zeka-cozumleri.html'),
        // Blog posts
        blogAnkaraWebSitesi: resolve(__dirname, 'blog/ankara-web-sitesi-maliyeti-2026.html'),
        blogYapayZeka: resolve(__dirname, 'blog/yapay-zeka-entegrasyonu-rehberi.html'),
        blogQaTest: resolve(__dirname, 'blog/qa-test-nedir-yazilim-kalite-guvencesi.html'),
        blogMobilUygulama: resolve(__dirname, 'blog/mobil-uygulama-gelistirme-rehberi-2026.html'),
        blogChatbot: resolve(__dirname, 'blog/ankara-chatbot-gelistirme-2026.html'),
        blogLlm: resolve(__dirname, 'blog/llm-gpt-entegrasyonu-rehberi.html'),
        blogOtomasyon: resolve(__dirname, 'blog/ankara-surec-otomasyonu-rpa-yapay-zeka.html'),
        blogIstanbul: resolve(__dirname, 'blog/istanbul-yapay-zeka-cozumleri-rehberi.html'),
        blogIzmir: resolve(__dirname, 'blog/izmir-yapay-zeka-cozumleri-rehberi.html'),
        blogBursa: resolve(__dirname, 'blog/bursa-yapay-zeka-cozumleri-rehberi.html'),
        blogAntalya: resolve(__dirname, 'blog/antalya-yapay-zeka-cozumleri-rehberi.html'),
        blogKonya: resolve(__dirname, 'blog/konya-yapay-zeka-cozumleri-rehberi.html'),
        // Language pages are standalone static HTML, not Vite entry points
        // They are served as-is by the server (Vercel cleanUrls handles /en → en.html)
      }
    }
  }
});