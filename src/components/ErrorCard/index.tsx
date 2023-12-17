import { cn } from "@/utils/cn";
import { CopyButton } from "../CopyButton";

interface ErrorCardProps {
  title: string;
  description?: string;
  id: string | number;
}

export function ErrorCard({ title, description, id }: ErrorCardProps) {
  return (
    <div
      className={cn(
        "border border-gray-50 rounded p-4 w-full max-w-4xl flex flex-col gap-4 shadow bg-gray-950 items-start text-gray-50",
      )}
    >
      <div className="flex flex-col gap-4 items-start">
        <h1 className="font-bold">{title}</h1>
        {description ? <p>{description}</p> : null}
        <p className="flex flex-row gap-1">
          <strong>Workshop ID:</strong>
          {id}
          <CopyButton content={`${id}`} />
        </p>
      </div>
    </div>
  );
}
