import { useModList } from "@/contexts/ModListContext";
import { cn } from "@/utils/cn";
import { ChangeEvent, useState } from "react";
import { DeleteItemButton } from "..";
import { CopyButton } from "../CopyButton";

interface ErrorCardProps {
  title: string;
  description?: string;
  id: string | number;
}

export function ErrorCard({ title, description, id }: ErrorCardProps) {
  const {
    selectedMods,
    removeMods,
    removeModToSelectedList,
    addModToSelectedList,
  } = useModList();
  const [cardSelected, setCardSelected] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardSelected(e.target.checked);
    if (e.target.checked) {
      addModToSelectedList(id);
    } else {
      removeModToSelectedList(id);
    }
  };

  return (
    <div
      className={cn(
        "border border-gray-50/30 rounded-sm p-4 w-full flex flex-col gap-4 shadow-sm bg-gray-950 items-start text-gray-50 relative",
      )}
    >
      <div className="flex flex-col gap-4 items-start">
        <div className="absolute top-4 right-4 flex flex-col gap-4 items-end">
          <input
            type="checkbox"
            checked={selectedMods.find((item) => item === id) !== undefined}
            onChange={handleChange}
            className={cn(
              "h-5 w-5 accent-green-500 border-gray-200/30 border rounded-sm",
            )}
          />
          <DeleteItemButton
            clean={true}
            onClick={() => {
              removeMods(id);
              removeModToSelectedList(id);
            }}
          />
        </div>
        <h1 className="font-bold">{title}</h1>
        {description ? <p>{description}</p> : null}
        <div className="flex flex-row gap-1">
          <strong>Workshop ID:</strong>
          {id}
          <CopyButton content={`${id}`} />
        </div>
      </div>
    </div>
  );
}
