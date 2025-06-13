import { cn } from "@/utils/cn";
import { Trash } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

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
          ? "border-none flex items-center justify-between rounded-sm"
          : "flex items-center justify-center rounded-sm border border-gray-50/30 bg-gray-50/10 w-8 h-8",
        "transition-all duration-300",
        "hover:opacity-75 active:opacity-50",
        "hover:cursor-pointer"
      )}
      title="Remove items selecteds"
      aria-label="Remove items selecteds"
      {...rest}
    >
      <Trash
        className="w-4 h-4 text-red-700 fill-red-700/20"
      />
    </button>
  );
}
