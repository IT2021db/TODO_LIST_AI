import { useState, useEffect } from "react";
import type { Locale } from "./i18n/messages";

export function useAppLocale() {
  // read from localStorage or fallback to "pl"
  const getInitialLocale = (): Locale => {
    const saved = localStorage.getItem("locale");
    return (saved as Locale) || "pl";
  };

  const [locale, setLocale] = useState<Locale>(getInitialLocale);
 
  // 2.writing to localStorage after changing locale
  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

   const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return {
    locale,
    onLocaleChange: handleLocaleChange,
  };
}
