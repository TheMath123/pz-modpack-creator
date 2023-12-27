import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import { Button } from ".";
import { useModList } from "@/contexts/ModListContext";
import { createIniFileContent, getWorkshopIds } from "@/helpers/ModObject";

interface DownloadButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function DownloadButton({ ...rest }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [startDownload, setStartDownload] = useState(false);
  const { fetchModListData, modList } = useModList();

  useEffect(() => {
    if (startDownload) {
      const iniFileContent = createIniFileContent(modList);
      const blob = new Blob([iniFileContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "modList.ini";
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(link);

      setStartDownload(false);
      setLoading(false);
    }
  }, [startDownload, modList]);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await fetchModListData(getWorkshopIds(modList));
      setStartDownload(true); // Defina para true somente após a conclusão bem-sucedida de fetchModListData
    } catch (error) {
      console.error("Erro ao baixar dados: ", error);
      setLoading(false);
    }
  };

  return (
    <Button loading={loading} onClick={handleDownload} {...rest}>
      Generate File
    </Button>
  );
}
