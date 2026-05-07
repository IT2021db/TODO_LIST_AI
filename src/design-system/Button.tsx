import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

const buttonStyles = cva(
  " cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "text-white bg-indigo-500 hover:brightness-120 rounded",
        secondary: "text-teal-500 bg-transparent hover:bg-teal-50 rounded-3xl",
        ghost: "text-gray-400 bg-transparent hover:bg-gray-200",
        danger:
          "rounded-full border bg-transparent transition-all duration-200 border-gray-500 text-gray-400 hover:border-red-400 hover:text-red-400",
        language: "text-white hover:bg-teal-700",
        round:
          "h-14 min-h-[56px] px-6 rounded-full bg-indigo-500 hover:bg-blue-600 text-white font-medium  text-sm flex items-center justify-center justify-center gap-3  transition-all duration-200 disabled:!opacity-50",
addTask: `
  h-14
  px-5
   bg-indigo-500
  hover:bg-indigo-700
  text-white
  text-sm
  font-bold
  inline flex
  items-center
  gap-3
  transition-all
  duration-200
  rounded-full
`,
        // round:"bg-indigo-500 rounded-full text-white text-sm font-medium"
      },


      size: {
        sm: "px-2 py-1 text-sm rounded-xl",
        md: "px-3 py-2",
        lg: "px-4 py-3 text-lg",
        icon: "w-6 h-6 p-0 min-h-0 min-w-0 flex items-center justify-center",
        full: "h-14 min-h-[56px] px-6 text-lg p-0 flex items-center gap-3 justify-center",
      },
      //oszukujemy ts
      active: {
        true: "",
        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      active: false,
    },
    compoundVariants: [
      {
        variant: "language",
        active: true,
        className: "bg-teal-700",
      },
    ],
  },
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant, size, active, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={clsx(buttonStyles({ variant, size, active }), className)}
        {...props}
      />
    );
  },
);
