// AuthPanel.tsx

import { Button } from "../../design-system/Button";
import { useTranslation } from "react-i18next";

interface AuthPanelProps {
  userEmail?: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
  loading: boolean;
  authError: string | null;
  authMessage: string | null;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  login: () => void;
  register: () => void;
  logout: () => void;
}

export default function AuthPanel({
  userEmail,
  email,
  password,
  isLoggedIn,
  loading,
  authError,
  authMessage,
  setEmail,
  setPassword,
  login,
  register,
  logout,
}: AuthPanelProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="mb-6 text-sm text-gray-500">
        Loading user...
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg text-white font-semibold">
            {isLoggedIn
              ? t("greeting", { name: userEmail })
              : t("welcome")}
          </div>

          <div className="text-sm text-gray-500">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {isLoggedIn ? (
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
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

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
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

            <Button type="button" variant="primary" onClick={login}>
              Login
            </Button>

            <Button type="button" variant="secondary" onClick={register}>
              Register
            </Button>
          </div>
        )}
      </div>

      {authError && (
        <p className="mt-2 text-sm text-red-400">
          {authError}
        </p>
      )}

      {authMessage && (
        <p className="mt-2 text-sm text-emerald-400">
          {authMessage}
        </p>
      )}
    </div>
  );
}