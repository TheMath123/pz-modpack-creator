import { HTMLAttributes, Key, useCallback, useMemo } from "react";
import { cn } from "@/utils/cn";
import { ChevronRightIcon, ChevronLeftIcon } from "@primer/octicons-react";
import colors from "tailwindcss/colors";
import { ButtonPage } from "./components/ButtonPage";

interface PaginatorProps extends HTMLAttributes<HTMLElement> {
  pagesAmount: number;
  currentPage: number;
  onChangePage: (pageRender: number) => void;
}

export function Paginator({
  pagesAmount,
  currentPage,
  onChangePage,
  className,
  ...rest
}: PaginatorProps) {
  const pagesList = useMemo(
    () => Array.from({ length: pagesAmount }, (_, index) => index + 1),
    [pagesAmount],
  );

  const renderButton = useCallback(
    (pageIndex: number) => (
      <ButtonPage
        key={`page_${pageIndex}`}
        active={currentPage === pageIndex}
        onClick={() => onChangePage(pageIndex)}
      >
        {pageIndex + 1}
      </ButtonPage>
    ),
    [currentPage, onChangePage],
  );

  const renderEllipsis = useCallback(
    (key?: Key) => <ButtonPage key={key}>...</ButtonPage>,
    [],
  );

  const renderPageButton = useCallback(() => {
    const pageItems = [];
    const listLength = pagesList.length;

    // Sempre incluir a primeira página
    pageItems.push(renderButton(0));

    // Adicionando reticências iniciais se necessário
    if (currentPage > 3) {
      pageItems.push(renderEllipsis("ellipsis_start"));
    }

    // Definindo intervalo de páginas a serem exibidas
    let startRange = Math.max(currentPage - 1, 1);
    let endRange = Math.min(currentPage + 1, listLength - 2);

    // Ajustando intervalo para manter sempre 7 itens, incluindo as reticências
    if (currentPage <= 3) {
      startRange = 1;
      endRange = 4;
    }
    if (currentPage >= listLength - 4) {
      startRange = listLength - 5;
      endRange = listLength - 2;
    }

    // Adicionando botões de páginas intermediárias
    for (let i = startRange; i <= endRange; i++) {
      pageItems.push(renderButton(i));
    }

    // Adicionando reticências finais se necessário
    if (currentPage < listLength - 4) {
      pageItems.push(renderEllipsis("ellipsis_end"));
    }

    // Sempre incluir a última página
    pageItems.push(renderButton(listLength - 1));

    return pageItems;
  }, [currentPage, pagesList.length, renderButton, renderEllipsis]);

  return (
    <div className="flex w-fit">
      <div
        className={cn(
          className,
          "flex h-fit w-fit flex-row gap-[1px] overflow-hidden rounded border border-gray-50 bg-gray-50 shadow-sm",
        )}
        {...rest}
      >
        <ButtonPage
          disabled={currentPage === 0}
          onClick={() =>
            onChangePage(
              currentPage - 1 < pagesAmount - 1 ? currentPage - 1 : 0,
            )
          }
          aria-label={"Pagina anterior"}
        >
          <ChevronLeftIcon fill={colors.slate["900"]} />
        </ButtonPage>

        {renderPageButton()}

        <ButtonPage
          disabled={currentPage - 1 === pagesAmount - 2}
          onClick={() =>
            onChangePage(
              currentPage - 1 < pagesAmount - 1
                ? currentPage + 1
                : pagesAmount - 1,
            )
          }
          aria-label="Próxima Pagina"
        >
          <ChevronRightIcon fill={colors.slate["900"]} />
        </ButtonPage>
      </div>
    </div>
  );
}
