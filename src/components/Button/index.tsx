import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Loading } from "..";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}
export function Button({
  loading,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={loading}
      className={cn(
        className,
        "bg-gray-300 border border-gray-50 min-w-fit w-full px-4 h-10 text-slate-900 rounded text-center flex items-center justify-center",
        "transition-all duration-300",
        "hover:opacity-75 active:opacity-50",
        "disabled:cursor-default disabled:opacity-100",
      )}
      {...props}
    >
      {loading ? <Loading.Spinner /> : children}
    </button>
  );
}
