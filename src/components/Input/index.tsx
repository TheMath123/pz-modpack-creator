import { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        className,
        "px-4 py-2 rounded bg-gray-600 text-gray-50 focus:bg-red-800",
      )}
      {...rest}
    />
  );
}
