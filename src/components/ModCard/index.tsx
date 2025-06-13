import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Accordion,
  CopyButton,
  DeleteItemButton,
  ErrorCard,
  Loading,
} from "..";
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
  const {
    addModToSelectedList,
    removeModToSelectedList,
    removeMods,
    selectedMods,
    fillModListWithStringList,
  } = useModList();

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
        if (data.modsRequirements && data.modsRequirements.length > 0) {
          data.modsRequirements.forEach((item: any) =>
            fillModListWithStringList(item.id),
          );
        }
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
    <div className="border border-gray-50/30 rounded-sm p-4 w-full flex flex-col gap-4 shadow-sm bg-gray-950 items-start relative">
      <div className="absolute top-4 right-4 flex flex-col gap-4 items-end">
        <input
          type="checkbox"
          checked={
            selectedMods.find((item) => item === workshopId) !== undefined
          }
          onChange={handleChange}
          className={cn(
            "h-4 w-4 accent-green-500 border-gray-200/30 border rounded-sm cursor-pointer",
          )}
        />
        <DeleteItemButton
          clean={true}
          onClick={() => {
            removeMods(workshopId);
            removeModToSelectedList(workshopId);
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center items-start w-full">
        <div className="flex w-40 h-40 overflow-hidden rounded-sm border border-gray-50/30">
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
            <p className="break-all w-full lg:w-fit">{modItem.workshop_id} </p>
            <CopyButton content={`${modItem.workshop_id}`} />
          </div>

          <div className="text-gray-50 font-medium flex flex-row gap-2">
            <strong>Mod ID: </strong>
            <p className="break-all w-full lg:w-fit">
              {modItem.mod_id && modItem.mod_id.join("; ")}
            </p>
            <CopyButton
              content={`${modItem.mod_id && modItem.mod_id.join("; ")}`}
            />
          </div>

          {modItem.modsRequirements && modItem.modsRequirements.length > 0 ? (
            <div className="text-gray-50 flex flex-col gap-2 w-fit">
              <h1 className="font-semibold">Required Mods:</h1>
              <ul className="flex flex-col gap-2 pr-4 pl-8 py-2 bg-slate-900 rounded-sm list-disc">
                {modItem.modsRequirements.map((item, index) => (
                  <li key={"req" + item.id + item.name}>
                    <a
                      href={item.url}
                      target="_blank"
                      className="text-sm underline"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {modItem.map_folder && (
            <div className="text-gray-50 font-medium flex flex-row gap-2">
              <strong>Map Folder: </strong>
              <p className="break-all w-full lg:w-fit">
                {modItem.map_folder && modItem.map_folder.join("; ")}
              </p>
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
