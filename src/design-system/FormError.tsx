import React from "react";

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <span className="text-red-500 mt-1 text-sm">
      {message}
    </span>
  );
}