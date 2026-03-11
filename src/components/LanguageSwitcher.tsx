import type { Locale } from "../i18n/messages";
import { Button } from "../design-system/Button";

type Props = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export default function LanguageSwitcher({ locale, onLocaleChange }: Props) {
  const languages: Locale[] = ["en", "pl", "es"];

  return (
    <div className="flex gap-2 mb-4">
      {languages.map((lang) => (
        <Button
          key={lang}
          variant="language"
          active={locale === lang}
          onClick={() => onLocaleChange(lang)}
        >
          {lang.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}