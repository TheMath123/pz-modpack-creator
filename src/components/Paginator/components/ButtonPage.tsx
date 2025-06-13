import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes } from "react";

interface ButtonPageProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function ButtonPage({
  active,
  className,
  children,
  ...rest
}: ButtonPageProps) {
  return (
    <button
      className={cn(
        className,
        active ? "bg-gray-950 text-gray-50" : "bg-gray-300 text-gray-950",
        "flex h-8 w-8 items-center justify-center ",
        "transition-all duration-300",
        "hover:brightness-75 active:brightness-50",
        "disabled:cursor-default disabled:brightness-100",
        "hover:cursor-pointer"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
