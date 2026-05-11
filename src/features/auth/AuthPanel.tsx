import { Button } from "../../design-system/Button";
import { useTranslation } from "react-i18next";

interface AuthPanelProps {
  name: string;
  input: string;
  isLoggedIn: boolean;
  setInput: (value: string) => void;
  login: () => void;
  logout: () => void;
}

export default function AuthPanel({
  name,
  input,
  isLoggedIn,
  setInput,
  login,
  logout,
}: AuthPanelProps) {
  const {t}= useTranslation();
  return (
    <div className="flex items-center justify-between gap-3 mb-6">
      <div>
        <div className="text-lg text-white font-semibold">
          {isLoggedIn ? t("greeting", {name}): t("welcome")}
        </div>

        <div className="text-sm text-gray-500">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {isLoggedIn ? (
        <Button
          variant="secondary"
          onClick={logout}
        >
          Logout
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your name"
            className="
              h-10
              px-4
              rounded-full
              bg-[#1A1D24]
              border
              border-white/5
              text-white
              outline-none
            "
          />

          <Button
            variant="primary"
            onClick={login}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
}