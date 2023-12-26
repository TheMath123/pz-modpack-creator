import { ButtonHTMLAttributes } from "react";
import { TrashIcon } from "@primer/octicons-react";
import { cn } from "@/utils/cn";
import colors from "tailwindcss/colors";

interface DeleteItemButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  clean?: boolean;
}
export function DeleteItemButton({
  className,
  clean = false,
  ...rest
}: DeleteItemButtonProps) {
  return (
    <button
      className={cn(
        className,
        clean
          ? "border-none flex items-center justify-between rounded"
          : "flex items-center justify-center bg-red-800 rounded border border-gray-50 w-8 h-8",
        "transition-all duration-300",
        "hover:opacity-75 active:opacity-50",
      )}
      title="Remove items selecteds"
      aria-label="Remove items selecteds"
      {...rest}
    >
      <TrashIcon
        fill={clean ? colors.red[800] : colors.gray[50]}
        size={clean ? 20 : undefined}
      />
    </button>
  );
}
