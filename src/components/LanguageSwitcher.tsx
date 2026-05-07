import { useTranslation } from "react-i18next";
import { Button } from "../design-system/Button";
import { availableLocales } from "../locales";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage;
  const changeLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
    localStorage.setItem("language", locale);
  };

  return (
      <div className="flex gap-2">
      {availableLocales.map((locale: string) => (
        <button
          key={locale}
          onClick={() => changeLanguage(locale)}
          className={
            "px-3 py-1 rounded-lg text-xs transition " +
            (currentLanguage === locale
              ? "bg-white/10 text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5")
          }
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
