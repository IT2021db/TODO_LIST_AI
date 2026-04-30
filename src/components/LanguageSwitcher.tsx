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
    <div className="flex gap-2 mb-4">
      {availableLocales.map((locale) => (
        <Button
          key={locale}
          variant="language"
          active={currentLanguage === locale}
          onClick={() => changeLanguage(locale)}
        >
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
