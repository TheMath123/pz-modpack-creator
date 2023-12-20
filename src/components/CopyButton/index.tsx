import { useState } from "react";
import { delay } from "@/utils/delay";
import { CopyIcon } from "@primer/octicons-react";
import colors from "tailwindcss/colors";

interface CopyButtonProps {
  content: string;
}

export function CopyButton({ content }: CopyButtonProps) {
  const [showCopyAlertMessage, setShowCopyAlertMessage] = useState(false);

  async function handleCopyURL() {
    setShowCopyAlertMessage(true);
    navigator.clipboard.writeText(content);
    await delay(1200);
    setShowCopyAlertMessage(false);
  }

  return (
    <div className="relative">
      <button
        className=" bg-transparent flex items-center justify-center border border-gray-50/10 h-6 w-6 rounded hover:opacity-75 active:opacity-50"
        title="Copy URL"
        onClick={() => handleCopyURL()}
      >
        <CopyIcon fill={colors.gray[50]} size={14} />
      </button>

      {showCopyAlertMessage && (
        <p className="text-gray-50 font-semibold absolute z-10 top-0 left-8 bg-gray-950/50 px-2 py-1 border border-gray-50/10 rounded transition-all duration-200 ease-in-out shadow">
          Copied
        </p>
      )}
    </div>
  );
}
