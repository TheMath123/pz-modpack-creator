import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {}

export function Card({}: CardProps) {
  return (
    <div className="border border-gray-50 rounded p-4 w-full max-w-4xl flex flex-col gap-4 shadow bg-gray-950 items-start animate-pulse">
      <div className="flex flex-col md:flex-row gap-4 md:items-center items-start">
        <div>
          <div className="w-40 h-40 bg-gray-900 rounded"></div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={`item#${item}`}
              className="w-[400px] h-6 bg-gray-900 rounded"
            ></div>
          ))}
        </div>
      </div>
      <div className="w-full h-7 bg-gray-900 rounded"></div>
    </div>
  );
}
