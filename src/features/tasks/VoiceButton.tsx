interface VoiceButtonProps {
  listening: boolean;
  onClick: () => void;
}

export default function VoiceButton({
  listening,
  onClick,
}: VoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        px-3
        py-2
        rounded-xl
        border
        transition
        hover:scale-105
      "
    >
      {listening ? "🎙️" : "🎤"}
    </button>
  );
}