import { forwardRef } from "react";
import clsx from "clsx";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "language"
  | "squere";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "text-white bg-teal-500 hover:brightness-110",
  secondary: "text-gray-400 bg-transparent hover:bg-gray-200",
  danger: "text-white bg-red-500 hover:brightness-110 ",
  ghost: "text-teal-500 bg-transparent hover:bg-teal-50",
  language: "text-white hover:bg-teal-700",
  squere:
    "bg-teal-500 text-white font-bold rounded-sm hover:brightness-110 transition",
};

const activeStyles: Record<ButtonVariant, string> = {
  primary: "bg-teal-700 font-bold",
  secondary: "bg-gray-300 text-gray-900 font-bold",
  danger: "bg-red-700 font-bold",
  ghost: "bg-teal-100 font-bold",
  language: "bg-red-900 text-white font-bold hover:bg-amber-800",
  squere: "",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2",
  lg: "px-4 py-3 text-lg",
  icon: "w-7 h-7 flex items-center justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", active = false, className, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={clsx(
          "rounded-sm cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          active && activeStyles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
