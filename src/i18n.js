import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { messages } from './locales';

// resources in format demanded by i18next
const resources = {
  en: { translation: messages.en },
  pl: { translation: messages.pl },
  es: { translation: messages.es },
};

// load language from localStorage
const getSavedLanguage = () => localStorage.getItem("language") || "pl";

// inicjalization i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;