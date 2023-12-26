import { ButtonHTMLAttributes } from "react";
import { XIcon } from "@primer/octicons-react";
import { cn } from "@/utils/cn";
import colors from "tailwindcss/colors";

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
        "flex items-center justify-center bg-gray-300 rounded border border-gray-50 w-8 h-8",
        "transition-all duration-300",
        "hover:opacity-75 active:opacity-50",
      )}
      title="Remove items selecteds"
      aria-label="Remove items selecteds"
      {...rest}
    >
      <XIcon fill={colors.slate[800]} />
    </button>
  );
}
