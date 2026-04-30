import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import LoadingScreen from "./LoadingScreen";
import ErrorMessage from "./ErrorMessage";
import { rd, RemoteData } from "../../lib/remoteData";

interface AppStateProps<T> {
  data: RemoteData<T>;
  children: (data: T) => ReactNode;
}
export default function AppState<T>({ data, children }: AppStateProps<T>) {
  const { t } = useTranslation();

  return rd
    .journey(data)
    .wait(<LoadingScreen message={t("loading")} />)
    .catch((error) => <ErrorMessage message={error} />)
    .done(children);
}
