import { useEffect, useState } from "react";

const STORAGE_KEY = "todo-user";

export function useAuth() {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setName(saved);
    }
  }, []);

  const login = () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    localStorage.setItem(STORAGE_KEY, trimmed);

    setName(trimmed);
    setInput("");
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);

    setName("");
  };

  return {
    name,
    input,
    setInput,
    login,
    logout,
    isLoggedIn: Boolean(name),
  };
}