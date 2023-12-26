import { ButtonHTMLAttributes } from "react";
import { PlusIcon } from "@primer/octicons-react";
import { cn } from "@/utils/cn";
import colors from "tailwindcss/colors";

interface AddModButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export function AddModButton({ className }: AddModButtonProps) {
  return (
    <button
      className={cn(
        className,
        "flex items-center justify-center bg-gray-300 w-8 h-8 rounded border border-gray-50",
        "transition-all duration-300",
        "hover:opacity-75 active:opacity-50",
      )}
      title="Remove items selecteds"
      aria-label="Remove items selecteds"
    >
      <PlusIcon fill={colors.slate[900]} />
    </button>
  );
}
