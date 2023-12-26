import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        className,
        "bg-gray-300 border border-gray-50 text-slate-900 px-4 h-10 rounded",
        "transition-all duration-300",
        "hover:opacity-75 active:opacity-50",
      )}
      {...props}
    >
      {children}
    </button>
  );
}
