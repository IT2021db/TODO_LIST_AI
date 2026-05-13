interface ClearInputButtonProps {
  visible: boolean;
  onClick: () => void;
}

export default function ClearInputButton({
  visible,
  onClick,
}: ClearInputButtonProps) {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        text-gray-400
        hover:text-white
        transition
        opacity-70
        hover:opacity-100
        shrink-0
      "
    >
       ×
    </button>
  );
}