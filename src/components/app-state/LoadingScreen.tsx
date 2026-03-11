import spinner from "../../assets/spinner.gif";
import { FormattedMessage } from "react-intl";

interface LoadingScreenProps {
  messageId?: string;
}

export default function LoadingScreen({ messageId = "loading" }: LoadingScreenProps) {
  return (
    <div className="caret-transparent flex flex-col items-center justify-center min-h-screen">
      <img src={spinner} alt="Loading..." className="w-80 h-80 mb-4" />

      <p className="text-xl">
        <FormattedMessage id={messageId} />
      </p>
    </div>
  );
}