import { cva } from "class-variance-authority";

export const taskItem = cva(
  "flex items-center justify-between px-4 py-3 rounded-xl transition",
  {
    variants: {
      state: {
        default: "bg-[#1A1D24] hover:bg-[#22262f]",
        completed: "bg-[#14171c] opacity-70",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

export const taskText = cva("text-sm", {
  variants: {
    completed: {
      true: "line-through text-gray-500",
      false: "text-white",
    },
  },
});

export const statusTile = cva(
  "p-4 rounded-2xl flex flex-col gap-1",
  {
    variants: {
      color: {
        green: "bg-green-500/10 text-green-400",
        blue: "bg-blue-500/10 text-blue-400",
        purple: "bg-purple-500/10 text-purple-400",
        red: "bg-red-500/10 text-red-400",
      },
    },
  }
);