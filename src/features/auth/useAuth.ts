import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authError, setAuthError] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async () => {
    setAuthError(null);
    setAuthMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
      return;
    }

    setAuthMessage(t("loggedinSuccessfully"));
    setTimeout(() => {
      setAuthMessage(null);
    }, 3000);
  };

  const register = async () => {
    setAuthError(null);
    setAuthMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
      return;
    }

    setAuthMessage("Account created successfully");
  };

  const logout = async () => {
    setAuthError(null);
    setAuthMessage(null);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setAuthError(error.message);
    }
    setEmail("");
    setPassword("");
  };

  return {
    user,
    loading,
    isLoggedIn: !!user,

    email,
    password,
    setEmail,
    setPassword,

    login,
    register,
    logout,

    authError,
    authMessage,
  };
}
