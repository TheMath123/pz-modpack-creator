import { cn } from "@/utils/cn";
import { Plus } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface AddModButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export function AddModButton({ className, ...props }: AddModButtonProps) {
  return (
    <button
      className={cn(
        className,
        "flex items-center justify-center bg-gray-300 w-10 h-10 rounded-sm border border-gray-50/30",
        "transition-all duration-300",
        "hover:opacity-75 active:opacity-50",
        "hover:cursor-pointer",
      )}
      title="Add Mods"
      aria-label="Add Mods"
      {...props}
    >
      <Plus className="text-slate-900 w-4 h-4"/>
    </button>
  );
}
