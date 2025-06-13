import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface DeselectedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}
export function DeselectedButton({
  className,
  ...rest
}: DeselectedButtonProps) {
  return (
    <button
      className={cn(
        className,
        "flex items-center justify-center bg-gray-300 rounded-sm border border-gray-50/30 w-8 h-8",
        "transition-all duration-300",
        "hover:opacity-75 active:opacity-50",
        "hover:cursor-pointer"
      )}
      title="Deselect all"
      aria-label="Deselect all"
      {...rest}
    >
      <X className='text-slate-800 w-4 h-4'/>
    </button>
  );
}
