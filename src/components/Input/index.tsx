import { InputHTMLAttributes } from "react";
import { XIcon } from "@primer/octicons-react";
import { cn } from "@/utils/cn";
import colors from "tailwindcss/colors";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClearSearch?: () => void;
}

export function Input({ onClearSearch, className, ...rest }: InputProps) {
  return (
    <div className="relative w-fit">
      <input
        className={cn(
          className,
          "px-4 py-2 h-10 rounded bg-gray-600 text-gray-50 border border-gray-500 focus:border-gray-800 focus:outline-gray-800",
        )}
        {...rest}
      />
      {onClearSearch ? (
        <button
          onClick={onClearSearch}
          className={cn(
            "top-1/2 -translate-y-1/2 right-3 absolute",
            "transition-all duration-300",
            "hover:opacity-75 active:opacity-50",
          )}
        >
          <XIcon fill={colors.gray[50]} />
        </button>
      ) : null}
    </div>
  );
}
