import { ButtonHTMLAttributes } from "react";
import { PlusIcon } from "@primer/octicons-react";
import { cn } from "@/utils/cn";
import colors from "tailwindcss/colors";

interface AddModButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export function AddModButton({ className, ...props }: AddModButtonProps) {
  return (
    <button
      className={cn(
        className,
        "flex items-center justify-center bg-gray-300 w-10 h-10 rounded border border-gray-50",
        "transition-all duration-300",
        "hover:opacity-75 active:opacity-50",
      )}
      title="Add Mods"
      aria-label="Add Mods"
      {...props}
    >
      <PlusIcon fill={colors.slate[900]} />
    </button>
  );
}
