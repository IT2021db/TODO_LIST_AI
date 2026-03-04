import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";
import { messages } from "./i18n/messages";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAppLocale } from "./useAppLocale";

const queryClient = new QueryClient();
function Root() {
  const { locale, onLocaleChange } = useAppLocale();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <IntlProvider locale={locale} messages={messages[locale]}>
        <App locale={locale} onLocaleChange={onLocaleChange} />
      </IntlProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
