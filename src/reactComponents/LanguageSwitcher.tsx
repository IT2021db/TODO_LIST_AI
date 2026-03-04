import type { Locale } from "../i18n/messages";

type Props = {
  locale: Locale; // current language
  onLocaleChange: (locale: Locale) => void;
};

export default function LanguageSwitcher({ locale, onLocaleChange }: Props) {
  const languages: Locale[] = ["en", "pl", "es"]; // <-- languages must have Locale type
  return (
    <div className="flex gap-2 mb-4">
      {languages.map((lang) => {
        const isActive = locale === lang; // current language checking

        return (
          <button
            key={lang}
            onClick={() => onLocaleChange(lang)}
            className={`
              px-3 py-1 rounded
              ${isActive ? "text-white font-bold bg-red-900 hover:bg-amber-800" : "text-white hover:bg-teal-700  bg-teal-950"}
           `}
          >
            {lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
