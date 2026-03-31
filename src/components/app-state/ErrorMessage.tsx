import { ReactNode } from "react";
interface ErrorMessageProps {
  message: ReactNode;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-red-500 text-2xl font-semibold">{message}</p>
    </div>
  );
}
