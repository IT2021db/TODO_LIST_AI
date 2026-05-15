// AuthPanel.tsx

import { Button } from "../../design-system/Button";
import { useTranslation } from "react-i18next";
import { authInput } from "../../styles/ui";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 0);
    }
  }, [loading, isLoggedIn]);

  if (loading) {
    return <div className="mb-6 text-sm text-gray-500">Loading user...</div>;
  }

  return (
    <div className="mb-6">
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col items-start justify-start">
          <span className="text-lg text-white font-semibold">
            {isLoggedIn ? t("greeting", { name: userEmail }) : t("welcome")}
          </span>
          <div className="text-3xl text-gray-500">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {isLoggedIn ? (
          <Button variant="secondary" onClick={logout}>
            {t("logOut")}
          </Button>
        ) : (
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <input
              ref={emailInputRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className={authInput()}
            />

            <div className="relative w-full">
              <input
                ref={passwordInputRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className={`${authInput()} pr-12`}
              />

              <button
                type="button"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                  passwordInputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button type="submit" variant="secondary" className="w-full">
              {t("login")}
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={register}
            >
              {t("register")}
            </Button>
          </form>
        )}
      </div>

      {authError && <p className="mt-2 text-sm text-red-400">{authError}</p>}

      {authMessage && (
        <p className="mt-2 text-sm text-orange-400">{authMessage}</p>
      )}
    </div>
  );
}
