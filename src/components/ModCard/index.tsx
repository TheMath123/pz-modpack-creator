import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { Loading, CopyButton, Accordion, ErrorCard } from "..";
import { cn } from "@/utils/cn";
import { useModList } from "../../contexts/ModListContext";

interface ModCardProps {
  workshopId: number | string;
}

interface ErrorState {
  message: string;
}

export function ModCard({ workshopId }: ModCardProps) {
  const [modItem, setModItem] = useState<ModObject | null>(null);
  const [error, setError] = useState<ErrorState | null>(null);
  const [cardSelected, setCardSelected] = useState(false);
  const { addModToSelectedList, removeModToSelectedList } = useModList();

  useEffect(() => {
    const fetchUrl = `/api/metadata?mod_id=${workshopId}`;

    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || response.statusText);
          });
        }
        return response.json();
      })
      .then((data) => {
        setModItem(data);
        setError(null);
      })
      .catch((error) => {
        setError({
          message: error.message || "An error occurred while fetching data.",
        });
        setModItem(null);
      });
  }, [workshopId]);

  useEffect(() => {}, [cardSelected]);

  if (error) {
    const msg = JSON.parse(error.message).error;
    return <ErrorCard title={msg} id={workshopId} />;
  }

  if (!modItem) {
    return <Loading.Card />;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardSelected(e.target.checked);
    if (e.target.checked) {
      addModToSelectedList(workshopId);
    } else {
      removeModToSelectedList(workshopId);
    }
  };

  return (
    <div className="border border-gray-50 rounded p-4 w-full flex flex-col gap-4 shadow bg-gray-950 items-start relative">
      <input
        type="checkbox"
        checked={cardSelected}
        onChange={handleChange}
        className={cn(
          "absolute top-4 right-4 h-5 w-5 accent-green-500 border-gray-200 border rounded",
        )}
      />
      <div className="flex flex-col md:flex-row gap-4 md:items-center items-start w-full">
        <div className="flex w-40 h-40 overflow-hidden rounded border border-gray-50">
          {modItem.imageURL && (
            <Image
              src={modItem.imageURL}
              alt={modItem.title ?? "Not found title"}
              width={160}
              height={160}
            />
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-gray-50 font-medium">{modItem.title}</h1>

          {modItem.description && (
            <p className="text-gray-50 font-medium">{modItem.description}</p>
          )}

          <div className="text-gray-50 font-medium flex flex-row gap-2">
            <strong>Workshop ID: </strong>
            {modItem.workshop_id}{" "}
            <CopyButton content={`${modItem.workshop_id}`} />
          </div>

          <div className="text-gray-50 font-medium flex flex-row gap-2">
            <strong>Mod ID: </strong>
            {modItem.mod_id && modItem.mod_id.join("; ")}
            <CopyButton
              content={`${modItem.mod_id && modItem.mod_id.join("; ")}`}
            />
          </div>

          {modItem.map_folder && (
            <div className="text-gray-50 font-medium flex flex-row gap-2">
              <strong>Map Folder: </strong>
              {modItem.map_folder && modItem.map_folder.join("; ")}
              <CopyButton
                content={`${
                  modItem.map_folder && modItem.map_folder.join("; ")
                }`}
              />
            </div>
          )}
          <div className="flex flex-row gap-2 w-full">
            <Link
              target="_blank"
              href={modItem.url ?? ""}
              className={cn(
                "text-gray-50 font-medium underline",
                "hover:opacity-75",
              )}
            >
              {modItem.url}
            </Link>
            <CopyButton content={modItem.url ?? ""} />
          </div>
        </div>
      </div>
      {modItem.rawDescription && (
        <Accordion title={"Description"} html={true}>
          {modItem.rawDescription}
        </Accordion>
      )}
    </div>
  );
}
