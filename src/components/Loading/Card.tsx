import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {}

export function Card({}: CardProps) {
  return (
    <div className="max-w-4xl border h-60 border-gray-50 rounded p-4 w-full flex flex-col gap-4 shadow bg-gray-950 items-start animate-pulse">
      <div className="flex flex-row gap-4 w-full">
        <div>
          <div className="w-40 h-40 bg-gray-900 rounded animate-pulse"></div>
        </div>
        <div className="flex flex-col gap-2 w-full justify-center">
          <div className="w-1/2 h-6 bg-gray-900 rounded animate-pulse"></div>
          <div className="w-1/2 h-6 bg-gray-900 rounded animate-pulse"></div>
          <div className="w-1/2 h-6 bg-gray-900 rounded animate-pulse"></div>
          <div className="w-1/2 h-6 bg-gray-900 rounded animate-pulse"></div>
          <div className="w-2/3 h-6 bg-gray-900 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="w-full h-7 bg-gray-900 rounded animate-pulse"></div>
    </div>
  );
}
