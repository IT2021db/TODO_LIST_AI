import { ReactNode } from "react";
import spinner from "../../assets/spinner.gif";

interface LoadingScreenProps {
  message: ReactNode;
}

export default function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className="caret-transparent flex flex-col items-center justify-center min-h-screen">
      <img src={spinner} alt="Loading..." className="w-80 h-80 mb-4" />

      <p className="text-xl">{message}</p>
    </div>
  );
}
