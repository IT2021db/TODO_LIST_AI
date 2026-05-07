import { statusTile } from "../styles/ui";

interface StatTileProps {
  label: string;
  value: number;
  color: "green" | "blue" | "purple" | "red";
  progress?: number;
}

export default function StatTile({
  label,
  value,
  color,
  progress = 0,
}: StatTileProps) {
  const progressColors = {
    green: "bg-green-400",
    blue: "bg-blue-400",
    purple: "bg-purple-400",
    red: "bg-red-400",
  };
  return (
      <div
      className={statusTile({
        color,
      })}
    >
      {/* CONTENT */}
      <div className="flex flex-col flex-1">
        <span className="text-xs opacity-70">
          {label}
        </span>

        <div className="flex-1" />

        <span className="text-lg sm:text-xl font-semibold">
          {value}
        </span>
      </div>

      {/* PROGRESS LINE */}
      <div className="mt-3 h-1 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className={`
            h-full
            rounded-full
            transition-all
            duration-500
            ${progressColors[color]}
          `}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}
