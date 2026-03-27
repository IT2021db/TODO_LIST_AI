import spinner from "../../assets/spinner.gif";
import { useTranslation } from "react-i18next";

export default function LoadingScreen() {
  const {t, i18n}=useTranslation();
  return (
    <div className="caret-transparent flex flex-col items-center justify-center min-h-screen">
      <img src={spinner} alt="Loading..." className="w-80 h-80 mb-4" />

      <p className="text-xl">
       {t("loading")}
      </p>
    </div>
  );
}