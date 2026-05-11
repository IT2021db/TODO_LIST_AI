import { Button } from "../../design-system/Button";

interface VoiceButtonProps {
  listening: boolean;
  onClick: () => void;
}

export default function VoiceButton({ listening, onClick }: VoiceButtonProps) {
  return (
    <Button type="button" onClick={onClick} variant="transparent">
      <span
        className={`
                  ${listening ? "animate-pulse scale-125" : ""}
        `}
      >
        {listening ? "🔴" : "🎤"}
      </span>
    </Button>
  );
}
