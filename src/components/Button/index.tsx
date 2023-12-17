import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export function Button({ className, children }: ButtonProps) {
  return <button className={cn(className, "")}>{children}</button>;
}
