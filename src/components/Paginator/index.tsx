import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";

interface PaginatorProps extends HTMLAttributes<HTMLElement> {
  pagesAmount: number;
  currentPage: number;
  onChangePage: (changePage: number) => void;
}

export function Paginator({
  pagesAmount,
  currentPage,
  onChangePage,
  className,
  ...rest
}: PaginatorProps) {
  const maxVisiblePages = 5;
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, pagesAmount);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div
      className={cn(
        className,
        "flex flex-row gap-[1px] border border-gray-500 h-fit bg-gray-500 rounded overflow-hidden",
      )}
      {...rest}
    >
      <button
        disabled={currentPage === 1}
        className={cn(
          "w-8 h-8 min-w-[32px] flex items-center justify-center text-gray-600 bg-slate-50",
          "transition-all duration-300",
          "hover:brightness-75 active:brightness-50",
          "disabled:brightness-100",
        )}
        onClick={() => onChangePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </button>

      {pages.map((page) => (
        <button
          key={`btnPage${page}`}
          className={cn(
            currentPage === page
              ? "text-gray-50 bg-slate-600"
              : "text-gray-600 bg-slate-50",
            "w-8 h-8 min-w-[32px]",
            "transition-all duration-300",
            "hover:brightness-75 active:brightness-50",
          )}
          onClick={() => onChangePage(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === pagesAmount}
        className={cn(
          "w-8 h-8 min-w-[32px] flex items-center justify-center text-gray-600 bg-slate-50",
          "transition-all duration-300",
          "hover:brightness-75 active:brightness-50",
          "disabled:brightness-100",
        )}
        onClick={() => onChangePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
