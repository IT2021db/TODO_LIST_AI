import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`bg-[#1A1D24] hover:bg-[#22262f] flex-1 w-full h-14 border-3 outline-none rounded-xl border-indigo-500 caret-teal-600  pl-2.5`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
