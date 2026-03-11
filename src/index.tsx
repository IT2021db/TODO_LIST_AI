import { createRoot } from "react-dom/client";
import { Tooltip } from "react-tooltip";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import { messages } from "./i18n/messages";
import "./index.css";
import { useAppLocale } from "./hooks/useAppLocale";

const queryClient = new QueryClient();
function Root() {
  const { locale, onLocaleChange } = useAppLocale();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <IntlProvider locale={locale} messages={messages[locale]}>
        <App locale={locale} onLocaleChange={onLocaleChange} />
      </IntlProvider>
      {/* GLOBAL TOOLTIP */}
      <Tooltip
        id="app-tooltip"
        place="top"
        className="bg-slate-700 text-white px-2 py-1 rounded text-sm"
      />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
