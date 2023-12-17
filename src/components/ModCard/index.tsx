import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Accordion, Loading, CopyButton, ErrorCard } from "@/components";
import Link from "next/link";
import { cn } from "@/utils/cn";

interface ModCardProps {
  modId: number;
}

interface ErrorState {
  message: string;
}

export default function ModCard({ modId }: ModCardProps) {
  const [modItem, setModItem] = useState<ModObject | null>(null);
  const [error, setError] = useState<ErrorState | null>(null);

  useEffect(() => {
    const itemUrl = encodeURIComponent(
      `https://steamcommunity.com/sharedfiles/filedetails/?id=${modId}`,
    );
    const fetchUrl = `/api/metadata?url=${itemUrl}`;

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
  }, [modId]);

  if (error) {
    const msg = JSON.parse(error.message).error;
    return <ErrorCard title={msg} id={modId} />;
  }

  if (!modItem) {
    return <Loading.Card />;
  }

  return (
    <main className="border border-gray-50 rounded p-4 w-full flex flex-col gap-4 shadow bg-gray-950 items-start">
      <div className="flex flex-col md:flex-row gap-4 md:items-center items-start">
        {modItem.imageURL && (
          <Image
            className="block h-40 w-40 overflow-hidden rounded border border-gray-50 self-start"
            src={modItem.imageURL}
            alt={modItem.title ?? ""}
            width={160}
            height={160}
          />
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-50 font-bold">{modItem.title}</h1>
          {modItem.description && (
            <p className="text-gray-50 font-medium">{modItem.description}</p>
          )}
          <p className="text-gray-50 font-medium flex flex-row gap-2">
            <strong>Workshop ID: </strong>
            {modItem.workshop_id}{" "}
            <CopyButton content={`${modItem.workshop_id}`} />
          </p>

          <p className="text-gray-50 font-medium flex flex-row gap-2">
            <strong>Mod ID: </strong>
            {modItem.mod_id && modItem.mod_id.join("; ")}
            <CopyButton
              content={`${modItem.mod_id && modItem.mod_id.join("; ")}`}
            />
          </p>

          {modItem.map_folder && (
            <p className="text-gray-50 font-medium flex flex-row gap-2">
              <strong>Map Folder: </strong>
              {modItem.map_folder && modItem.map_folder.join("; ")}
              <CopyButton
                content={`${
                  modItem.map_folder && modItem.map_folder.join("; ")
                }`}
              />
            </p>
          )}
          {modItem.url && (
            <div className="flex flex-row gap-2">
              <Link
                target="_blank"
                href={modItem.url}
                className={cn(
                  "text-gray-50 font-medium underline",
                  "hover:opacity-75",
                )}
              >
                {modItem.url}
              </Link>
              <CopyButton content={modItem.url} />
            </div>
          )}
        </div>
      </div>
      {modItem.rawDescription && (
        <Accordion title={"Description"} html={true}>
          {modItem.rawDescription}
        </Accordion>
      )}
    </main>
  );
}
