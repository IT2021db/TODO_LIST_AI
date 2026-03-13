import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";
import { messages, type Locale } from "./i18n/messages";
import "./index.css";

function Root() {
  // 1. reading language from localStorage or fallback to "pl"
  const savedLocale = (localStorage.getItem("locale") as Locale) || "pl";

  const [locale, setLocale] = useState<Locale>(savedLocale); // Type Locale i default 'pl'

  // 2.writing to localStorage after changing locale
  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {/* forwarding locale */}
      <App locale={locale} setLocale={setLocale} />{" "}
    </IntlProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
