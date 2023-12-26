import { ReactNode, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@primer/octicons-react";
import colors from "tailwindcss/colors";
import { cn } from "@/utils/cn";
import { RawHTML } from "../RawHTML";

interface AccordionProps {
  className?: string;
  title: string;
  children: ReactNode;
  html?: boolean;
}

export function Accordion({
  className,
  title,
  children,
  html = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={cn(
        className,
        "flex flex-col w-full gap-2 border border-gray-50/10 rounded px-2 py-1",
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex flex-row w-full justify-between items-center gap-4",
          "transition-all duration-200",
          "hover:opacity-75 active:opacity-50",
        )}
      >
        <h1 className="text-gray-50 font-bold">{title}</h1>
        {isOpen ? (
          <ChevronUpIcon fill={colors.gray[50]} size={16} aria-label="Open" />
        ) : (
          <ChevronDownIcon
            fill={colors.gray[50]}
            size={16}
            aria-label="Closed"
          />
        )}
      </button>
      <article
        className={cn(
          isOpen ? "flex" : "hidden",
          "text-gray-50 p-2 lg:p-4 bg-gray-800 rounded w-full",
        )}
      >
        <div className="flex w-full overflow-x-scroll">
          {html ? <RawHTML html={children as string} /> : children}
        </div>
      </article>
    </div>
  );
}
