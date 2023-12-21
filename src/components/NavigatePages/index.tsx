import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface NavigatePagesProps extends HTMLAttributes<HTMLElement> {
  pagesAmount: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

export function NavigatePages({
  pagesAmount,
  currentPage,
  onChangePage,
  className,
  ...rest
}: NavigatePagesProps) {
  const pages = Array.from({ length: pagesAmount }, (_, index) => index + 1);
  return (
    <div
      className={cn(
        className,
        "flex flex-row gap-[1px] border border-gray-500 h-fit bg-gray-500 rounded overflow-hidden",
      )}
      {...rest}
    >
      {pages.map((page, index) => (
        <button
          key={`btnPage${page}`}
          className={cn(
            currentPage === index
              ? "text-gray-50 bg-slate-600"
              : "text-gray-600 bg-slate-50",
            "w-8 h-8 min-w-[32px]",
            "transition-all duration-300",
            "hover:brightness-75 active:brightness-50",
          )}
          onClick={() => onChangePage(index)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
