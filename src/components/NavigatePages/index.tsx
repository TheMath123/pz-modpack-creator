import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface NavigatePagesProps extends HTMLAttributes<HTMLElement> {
  pagesAmount: number;
}

export function NavigatePages({
  pagesAmount,
  className,
  ...rest
}: NavigatePagesProps) {
  const pages = Array.from({ length: pagesAmount }, (_, index) => index + 1);
  return (
    <div
      className={cn(
        className,
        "flex flex-row gap-[1px] bg-gray-800 border border-gray-500",
      )}
      {...rest}
    >
      {pages.map((page, index) => (
        <button
          key={`btnPage${page}`}
          className={cn(
            "w-8 h-8",
            "text-gray-50",
            "rounded bg-white",
            "transition-all duration-300",
            "hover:brightness-75 active:brightness-50",
          )}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
