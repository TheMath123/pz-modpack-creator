import { cn } from "@/utils/cn";
import { Search, X } from "lucide-react";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClearSearch?: () => void;
}

export function Input({ type, onClearSearch, className, ...rest }: InputProps) {
  return (
    <div className="relative w-full md:max-w-sm">
      <input
        className={cn(
          className,
          "px-4 py-2 h-10 rounded-sm bg-gray-600 text-gray-50 border border-gray-500/30 focus:border-gray-800 focus:outline-gray-800",
        )}
        {...rest}
      />
      {onClearSearch && type==='search' ? (
        <button
          onClick={onClearSearch}
          className={cn(
            "top-1/2 -translate-y-1/2 right-3 absolute",
            "transition-all duration-300",
            "hover:opacity-75 active:opacity-50",
            'hover:cursor-pointer',
          )}
        >
          <X className="h-4 w-4 text-gray-100" />
        </button>
      ) :   type==='search'?     <Search className="absolute h-4 w-4 text-gray-100 top-1/2 -translate-y-2 right-3" />:null}
    </div>
  );
}
