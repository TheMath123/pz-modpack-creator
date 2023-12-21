import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Accordion, Loading, CopyButton, ErrorCard } from "@/components";
import Link from "next/link";
import { cn } from "@/utils/cn";
import ModCard from "../ModCard";

interface RegularModCardProps {
  modObj: ModObject;
}

interface ErrorState {
  message: string;
}

export default React.memo(ModCard);

function RegularModCard({ modObj }: RegularModCardProps) {
  const [modItem, setModItem] = useState<ModObject | null>(null);
  const [error, setError] = useState<ErrorState | null>(null);

  if (!modObj) {
    return <Loading.Card />;
  }

  return (
    <main className="border border-gray-50 rounded p-4 w-full flex flex-col gap-4 shadow bg-gray-950 items-start">
      <div className="flex flex-col md:flex-row gap-4 md:items-center items-start">
        {modObj.imageURL && (
          <Image
            className="block h-40 w-40 overflow-hidden rounded border border-gray-50 self-start"
            src={modObj.imageURL}
            alt={modObj.title ?? ""}
            width={160}
            height={160}
          />
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-50 font-bold">{modObj.title}</h1>
          {modObj.description && (
            <p className="text-gray-50 font-medium">{modObj.description}</p>
          )}
          <p className="text-gray-50 font-medium flex flex-row gap-2">
            <strong>Workshop ID: </strong>
            {modObj.workshop_id}{" "}
            <CopyButton content={`${modObj.workshop_id}`} />
          </p>

          <p className="text-gray-50 font-medium flex flex-row gap-2">
            <strong>Mod ID: </strong>
            {modObj.mod_id && modObj.mod_id.join("; ")}
            <CopyButton
              content={`${modObj.mod_id && modObj.mod_id.join("; ")}`}
            />
          </p>

          {modObj.map_folder && (
            <p className="text-gray-50 font-medium flex flex-row gap-2">
              <strong>Map Folder: </strong>
              {modObj.map_folder && modObj.map_folder.join("; ")}
              <CopyButton
                content={`${modObj.map_folder && modObj.map_folder.join("; ")}`}
              />
            </p>
          )}
          {modObj.url && (
            <div className="flex flex-row gap-2">
              <Link
                target="_blank"
                href={modObj.url}
                className={cn(
                  "text-gray-50 font-medium underline",
                  "hover:opacity-75",
                )}
              >
                {modObj.url}
              </Link>
              <CopyButton content={modObj.url} />
            </div>
          )}
        </div>
      </div>
      {modObj.rawDescription && (
        <Accordion title={"Description"} html={true}>
          {modObj.rawDescription}
        </Accordion>
      )}
    </main>
  );
}
