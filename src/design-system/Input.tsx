import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`bg-gray-50 flex-1 w-full border outline-none rounded-sm caret-teal-600 border-gray-300 pl-2.5`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
