import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition} from "react-speech-recognition";

interface UseVoiceInputProps {
  language: string;
  onTranscript: (text: string) => void;
}

export function useVoiceInput({ language, onTranscript }: UseVoiceInputProps) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!transcript) return;

    onTranscript(transcript);
  }, [transcript]);

  const speechLanguages: Record<string, string> = {
    pl: "pl-PL",
    en: "en-US",
    es: "es-ES",
  };

  const handleVoiceInput = async () => {
    resetTranscript();

    await SpeechRecognition.startListening({
      continuous: false,
      language: speechLanguages[language] || "pl-PL",
    });
  };

  return {
    listening,
    handleVoiceInput,
    browserSupportsSpeechRecognition,
  };
}
