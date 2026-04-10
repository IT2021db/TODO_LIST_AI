import React from "react";
import clsx from "clsx";

interface FormErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
  message?: string;
}

export default function FormError({
  message,
  className,
  ...props
}: FormErrorProps) {
  if (!message) return null;

  return (
    <span className={clsx("text-red-500 mt-1 text-sm", className)} {...props}>
      {message}
    </span>
  );
}
