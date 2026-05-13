import AuthPanel from "./AuthPanel";
import { useAuth } from "./useAuth";

export default function AuthPanelContainer() {
  const {
    name,
    input,
    setInput,
    login,
    logout,
    isLoggedIn,
  } = useAuth();

  return (
    <AuthPanel
      name={name}
      input={input}
      setInput={setInput}
      login={login}
      logout={logout}
      isLoggedIn={isLoggedIn}
    />
  );
}