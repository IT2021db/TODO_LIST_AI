import React from "react";
import { useTranslation } from "react-i18next";
import LoadingScreen from "./LoadingScreen";
import ErrorMessage from "./ErrorMessage";

interface AppStateProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

export default function AppState({ loading, error, children }: AppStateProps) {
const {t}=useTranslation();

  if (loading) return <LoadingScreen message={t("loading")}/>;
  if (error) return <ErrorMessage message={error} />;

  return <>{children}</>;
}
