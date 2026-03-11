import React from "react";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorMessage";
import ErrorMessage from "./ErrorMessage";

interface AppStateProps {
  loading?: boolean;
  error?: string | null;
  children: React.ReactNode;
}

export default function AppState({ loading, error, children }: AppStateProps) {
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorMessage message={error} />;

  return <>{children}</>;
}