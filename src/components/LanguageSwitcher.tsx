import { useTranslation } from "react-i18next";
import { Button } from "../design-system/Button";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = ["en", "pl", "es"];
  const currentLanguage = i18n.resolvedLanguage;
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div className="flex gap-2 mb-4">
      {languages.map((lang) => (
        <Button
          key={lang}
          variant="language"
          active={currentLanguage === lang}
          onClick={() => changeLanguage(lang)}
        >
          {lang.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
