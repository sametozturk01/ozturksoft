export const SSS_LOCALES = [
  {
    lang: 'tr',
    urlPath: '/sss',
    file: 'sss.html',
    home: '/',
    services: '/hizmetler',
    blog: '/blog',
    faq: '/sss',
    contact: '/iletisim',
    nav: { home: 'Ana Sayfa', services: 'Hizmetler', blog: 'Blog', faq: 'SSS', contact: 'İletişim', quote: 'Teklif Al' },
  },
  {
    lang: 'en',
    urlPath: '/en/faq',
    file: 'en/faq.html',
    home: '/en',
    services: '/en/services',
    blog: '/blog',
    faq: '/en/faq',
    contact: '/iletisim',
    nav: { home: 'Home', services: 'Services', blog: 'Blog', faq: 'FAQ', contact: 'Contact', quote: 'Get a Quote' },
  },
  {
    lang: 'de',
    urlPath: '/de/faq',
    file: 'de/faq.html',
    home: '/de',
    services: '/de/leistungen',
    blog: '/blog',
    faq: '/de/faq',
    contact: '/iletisim',
    nav: { home: 'Startseite', services: 'Leistungen', blog: 'Blog', faq: 'FAQ', contact: 'Kontakt', quote: 'Angebot' },
  },
  {
    lang: 'fr',
    urlPath: '/fr/faq',
    file: 'fr/faq.html',
    home: '/fr',
    services: '/fr/services',
    blog: '/blog',
    faq: '/fr/faq',
    contact: '/iletisim',
    nav: { home: 'Accueil', services: 'Services', blog: 'Blog', faq: 'FAQ', contact: 'Contact', quote: 'Devis' },
  },
  {
    lang: 'ar',
    urlPath: '/ar/faq',
    file: 'ar/faq.html',
    home: '/ar',
    services: '/ar/services',
    blog: '/blog',
    faq: '/ar/faq',
    contact: '/iletisim',
    nav: { home: 'الرئيسية', services: 'الخدمات', blog: 'المدونة', faq: 'الأسئلة', contact: 'اتصل', quote: 'عرض سعر' },
  },
  {
    lang: 'ru',
    urlPath: '/ru/faq',
    file: 'ru/faq.html',
    home: '/ru',
    services: '/ru/uslugi',
    blog: '/blog',
    faq: '/ru/faq',
    contact: '/iletisim',
    nav: { home: 'Главная', services: 'Услуги', blog: 'Блог', faq: 'FAQ', contact: 'Контакты', quote: 'Заявка' },
  },
];

import tr from './tr.mjs';
import en from './en.mjs';
import de from './de.mjs';
import fr from './fr.mjs';
import ar from './ar.mjs';
import ru from './ru.mjs';

export const SSS_DATA = { tr, en, de, fr, ar, ru };
