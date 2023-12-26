import { ButtonHTMLAttributes } from "react";
import { TrashIcon } from "@primer/octicons-react";
import { cn } from "@/utils/cn";
import colors from "tailwindcss/colors";

interface DeleteItemButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}
export function DeleteItemButton({
  className,
  ...rest
}: DeleteItemButtonProps) {
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
      {...rest}
    >
      <TrashIcon fill={colors.slate[900]} />
    </button>
  );
}
