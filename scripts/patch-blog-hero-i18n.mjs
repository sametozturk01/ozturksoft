import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const blogDir = resolve(root, 'blog');

const POST_META = {
  ankaraAiAgents: { date: 'blog.meta.date6', read: 'blog.meta.read10' },
  ankaraMcp: { date: 'blog.meta.date6', read: 'blog.meta.read9' },
  ankaraLaravel: { date: 'blog.meta.date6', read: 'blog.meta.read9' },
  ankaraSaas: { date: 'blog.meta.date6', read: 'blog.meta.read10' },
  ankaraOcr: { date: 'blog.meta.date6', read: 'blog.meta.read9' },
  ankaraFlutter: { date: 'blog.meta.date6', read: 'blog.meta.read9' },
  chatbot: { date: 'blog.meta.date2', read: 'blog.meta.read9' },
  llm: { date: 'blog.meta.date3', read: 'blog.meta.read10' },
  otomasyon: { date: 'blog.meta.date4', read: 'blog.meta.read10' },
};

function patchAuthor(html) {
  let out = html;
  if (!out.includes('data-i18n="blog.author.label"')) {
    out = out.replace(
      /<p class="author-label">Yazar · Uzman içerik<\/p>/,
      '<p class="author-label" data-i18n="blog.author.label">Yazar · Uzman içerik</p>'
    );
  }
  if (!out.includes('data-i18n="blog.author.role"')) {
    out = out.replace(
      /<p class="author-role" itemprop="jobTitle">Founder &amp; Software Engineer — Ozturksoft, Ankara<\/p>/,
      '<p class="author-role" itemprop="jobTitle" data-i18n="blog.author.role">Founder &amp; Software Engineer — Ozturksoft, Ankara</p>'
    );
  }
  if (!out.includes('data-i18n="blog.author.bio"')) {
    out = out.replace(
      /<p class="author-bio" itemprop="description">Yapay zeka entegrasyonu, özel yazılım ve QA odaklı mühendislik konularında Ozturksoft kurucusu\.<\/p>/,
      '<p class="author-bio" itemprop="description" data-i18n="blog.author.bio">Yapay zeka entegrasyonu, özel yazılım ve QA odaklı mühendislik konularında Ozturksoft kurucusu.</p>'
    );
  }
  return out;
}

function patchHero(html, articleKey) {
  let out = html;
  const base = `blog.posts.${articleKey}`;

  if (!out.includes(`${base}.title`)) {
    out = out.replace(
      /(<header class="article-hero">[\s\S]*?<h1)(?!\s+data-i18n)/,
      `$1 data-i18n="${base}.title"`
    );
  }
  if (!out.includes(`${base}.tag`)) {
    out = out.replace(
      /(<span class="article-tag")(?!\s+data-i18n)/,
      `$1 data-i18n="${base}.tag"`
    );
  }

  // Breadcrumb title span (single span, not nested)
  if (!out.includes(`${base}.breadcrumb`)) {
    out = out.replace(
      /(<nav class="breadcrumb"[\s\S]*?<span>\/)(<\/span>\s*)(<span)(?!\s+data-i18n)(>)([^<]+)(<\/span>)/,
      `$1$2$3 data-i18n="${base}.breadcrumb"$4$5$6`
    );
  }

  const meta = POST_META[articleKey];
  if (meta && !out.includes(`data-i18n="${meta.date}"`)) {
    if (!out.includes('data-i18n-date=')) {
      out = out.replace(
        /(<body data-article="[^"]+")/,
        `$1 data-i18n-date="${meta.date}" data-i18n-read="${meta.read}"`
      );
    }
    if (!out.includes(`data-i18n="${meta.date}"`)) {
      out = out.replace(
        /<span><i class="fas fa-calendar-alt"><\/i>\s*([^<]+)<\/span>/,
        `<span><i class="fas fa-calendar-alt"></i> <span data-i18n="${meta.date}">$1</span></span>`
      );
      out = out.replace(
        /<span><i class="fas fa-clock"><\/i>\s*([^<]+)<\/span>/,
        `<span><i class="fas fa-clock"></i> <span data-i18n="${meta.read}">$1</span></span>`
      );
    }
  }

  return out;
}

let patched = 0;
for (const file of readdirSync(blogDir).filter((f) => f.endsWith('.html'))) {
  const path = resolve(blogDir, file);
  const articleKey = readFileSync(path, 'utf8').match(/data-article="([^"]+)"/)?.[1];
  if (!articleKey) continue;

  const before = readFileSync(path, 'utf8');
  let html = patchAuthor(before);
  html = patchHero(html, articleKey);
  if (html !== before) {
    writeFileSync(path, html);
    patched++;
    console.log(`  ${file}`);
  }
}
console.log(`Patched ${patched} blog hero/author i18n blocks`);
