import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ar from './locales/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    fallbackLng: 'en', // Default to English if no preference is found
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    },
    detection: {
      // Order: check localStorage first (user preference), then query string, then browser
      order: ['localStorage', 'querystring', 'navigator'],
      caches: ['localStorage'], // Persist user's choice in localStorage
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'i18nextLng'
    }
  });

export default i18n;
