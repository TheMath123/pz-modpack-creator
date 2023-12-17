import { ButtonHTMLAttributes } from "react";
import { CopyIcon } from "@primer/octicons-react";
import colors from "tailwindcss/colors";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function CopyButton({ ...props }: CopyButtonProps) {
  return (
    <button
      {...props}
      className="flex flex-row ustify-center break-keep px-4 py-3 gap-2 bg-gray-900 rounded-lg hover:opacity-75 active:opacity-50"
      title="Copy URL"
    >
      <CopyIcon fill={colors.gray[50]} aria-label="Copy" />
    </button>
  );
}
