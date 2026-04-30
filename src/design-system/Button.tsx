import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

const buttonStyles = cva(
  "rounded-sm cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "text-white bg-teal-500 hover:brightness-110",
        secondary: "text-teal-500 bg-transparent hover:bg-teal-50",
        ghost: "text-gray-400 bg-transparent hover:bg-gray-200",
        danger: "text-white bg-red-500 hover:brightness-110",
        language: "text-white hover:bg-teal-700",
      },

      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2",
        lg: "px-4 py-3 text-lg",
        icon: "w-7 h-7 flex items-center justify-center",
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
