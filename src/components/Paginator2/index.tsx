import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";

interface Paginator2Props extends HTMLAttributes<HTMLElement> {
  pagesAmount: number;
  currentPage: number;
  onChangePage: (changePage: number) => void;
}

export function Paginator2({
  pagesAmount,
  currentPage,
  onChangePage,
  className,
  ...rest
}: Paginator2Props) {
  const maxVisiblePages = 5;
  const visiblePages = [];

  // Adiciona a primeira página e a reticência se necessário
  if (currentPage > maxVisiblePages - 2) {
    visiblePages.push(1, "...");
  }

  // Calcula o intervalo central das páginas
  let startPage = Math.max(currentPage - 2, 2);
  let endPage = Math.min(currentPage + 2, pagesAmount - 1);

  if (currentPage <= maxVisiblePages - 2) {
    startPage = 2;
    endPage = 2 + maxVisiblePages - 3;
  } else if (currentPage > pagesAmount - maxVisiblePages + 2) {
    startPage = pagesAmount - maxVisiblePages + 2;
    endPage = pagesAmount - 1;
  }

  // Adiciona o intervalo central
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  // Adiciona a última página e a reticência se necessário
  if (currentPage < pagesAmount - maxVisiblePages + 3) {
    visiblePages.push("...", pagesAmount);
  }

  return (
    <div className="w-full flex">
      <div
        className={cn(
          className,
          "flex flex-row gap-[1px] border border-gray-500 h-fit bg-gray-500 rounded overflow-hidden w-fit",
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
          onClick={() => onChangePage(Math.max(1, currentPage - 1))}
        >
          <ChevronLeftIcon />
        </button>

        {visiblePages.map((page, index) => (
          <button
            key={
              index === 1 || index === visiblePages.length - 2
                ? `ellipsis-${index}`
                : `btnPage${page}`
            }
            className={cn(
              currentPage === page
                ? "text-gray-50 bg-slate-600"
                : "text-gray-600 bg-slate-50",
              "w-8 h-8",
              typeof page === "string" ? "cursor-default" : "",
              "transition-all duration-300",
              "hover:brightness-75 active:brightness-50",
            )}
            onClick={() => typeof page === "number" && onChangePage(page)}
            disabled={typeof page === "string"}
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
          onClick={() => onChangePage(Math.min(pagesAmount, currentPage + 1))}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
