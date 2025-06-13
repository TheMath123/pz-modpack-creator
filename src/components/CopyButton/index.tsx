import { delay } from "@/utils/delay";
import { Copy } from "lucide-react";
import { useState } from "react";

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
        className=" bg-transparent flex items-center justify-center border-none h-6 w-6 rounded-sm hover:opacity-75 active:opacity-50 hover:cursor-pointer"
        title="Copy URL"
        onClick={() => handleCopyURL()}
      >
        <Copy className="w-4 h-4 text-gray-50" />
      </button>

      {showCopyAlertMessage && ( 
        <span className="text-gray-50 text-xs font-light absolute z-10 top-0 left-8 bg-gray-950/50 px-2 py-1 border-none rounded-sm transition-all duration-200 ease-in-out shadow-sm">
          Copied
        </span>
      )}
    </div>
  );
}
