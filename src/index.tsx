import { createRoot } from "react-dom/client";
import { Tooltip } from "react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";
import './i18n';  //needs to be bundled

const queryClient = new QueryClient();
function Root() {

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
          <App />
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
