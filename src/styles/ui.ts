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

export const categoryBadge = cva(
  `
    px-3
    py-1
    rounded-full

    text-[11px]
    font-medium
    tracking-wide

    w-fit
  `,
  {
    variants: {
      category: {
        work: `
          bg-blue-500/15
          text-blue-300
        `,

        personal: `
          bg-purple-500/15
          text-purple-300
        `,

        health: `
          bg-green-500/15
          text-green-300
        `,

        priority: `
          bg-red-500/15
          text-red-300
        `,

        other: `bg-orange-500/15
        text-orange-500`,
      },
    },

    defaultVariants: {
      category: "other",
    },
  },
);
