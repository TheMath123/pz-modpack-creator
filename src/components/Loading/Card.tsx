import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface CardProps extends HTMLAttributes<HTMLElement> {}

export function Card({ className }: CardProps) {
  return (
    <div
      className={cn(
        className,
        "border border-gray-50 rounded p-4 w-full flex flex-col gap-4 shadow bg-gray-950 items-start animate-pulse",
      )}
    >
      <div className="flex flex-col md:flex-row gap-4 md:items-center items-start w-full">
        <div>
          <div className="w-40 h-40 bg-gray-900 rounded"></div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={`item#${item}`}
              className="w-full sm:w-[400px] h-6 bg-gray-900 rounded"
            ></div>
          ))}
        </div>
      </div>
      <div className="w-full h-7 bg-gray-900 rounded"></div>
    </div>
  );
}
