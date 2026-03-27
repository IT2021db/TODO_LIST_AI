import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from "../public/locales/en.json";
import pl from "../public/locales/pl.json";
import es from "../public/locales/es.json";

const resources = {
  en: { translation: en },
  pl: { translation: pl },
  es: { translation: es },
};

const getSavedLanguage = () => {
  const saved = localStorage.getItem("language");
  return saved || "pl";
};

i18n
  .use(initReactI18next)
  .init({
    lng: getSavedLanguage(),
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;