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
  },
);

export const taskText = cva("text-sm", {
  variants: {
    completed: {
      true: "line-through text-gray-500",
      false: "text-white",
    },
  },
});

export const statusTile = cva("p-4 rounded-2xl flex flex-col gap-1", {
  variants: {
    color: {
      green: "bg-green-500/10 text-green-400",
      blue: "bg-blue-500/10 text-blue-400",
      purple: "bg-purple-500/10 text-purple-400",
      red: "bg-red-500/10 text-red-400",
    },
  },
});

export const authInput = cva(
  `
    h-11
    w-full
    min-w-0
    px-4
    rounded-full
    bg-[#0F1115]
    border
    border-white/10
    text-white
    outline-none
    placeholder:text-gray-500
    focus:border-purple-500
    transition
  `,
);

export const categoryBadge = cva(
  `
    px-3
    py-1
    mr-3
    rounded-full

    text-[11px]
    font-medium
    tracking-wide

    w-fit
  `,
  {
    variants: {
        category: {
        work: "bg-blue-500/20 text-blue-300",
        home: "bg-purple-500/20 text-purple-300",
        health: "bg-green-500/20 text-green-300",
        shopping: "bg-yellow-500/20 text-yellow-300",
        garden: "bg-emerald-500/20 text-emerald-300",
        urgent: "bg-red-500/20 text-red-300",
        other: "bg-gray-500/20 text-gray-300",
      },
    },

    defaultVariants: {
      category: "other",
    },
  },
);
