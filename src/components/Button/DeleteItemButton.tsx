import { ButtonHTMLAttributes, ReactNode } from "react";
import { TrashIcon } from "@primer/octicons-react";
import { cn } from "@/utils/cn";

interface DeleteItemButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}
export function DeleteItemButton({ className }: DeleteItemButtonProps) {
  return (
    <button
      className={cn(
        className,
        "flex items-center justify-center bg-gray-300 w-8 h-8 rounded",
      )}
      title="Remove items"
    >
      <TrashIcon />
    </button>
  );
}
