import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";
import { messages, type Locale } from "./i18n/messages";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function Root() {
  // 1. reading language from localStorage or fallback to "pl"
  const savedLocale = (localStorage.getItem("locale") as Locale) || "pl";

  const [locale, setLocale] = useState<Locale>(savedLocale); // Type Locale i default 'pl'

  // 2.writing to localStorage after changing locale
  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <IntlProvider locale={locale} messages={messages[locale]}>
        <App locale={locale} setLocale={setLocale} />{" "}
      </IntlProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
