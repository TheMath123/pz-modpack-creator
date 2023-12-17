"use client";

import { ModCard } from "@/components";
import { cn } from "../utils/cn";

export default function Home() {
  const modURL =
    "https://steamcommunity.com/sharedfiles/filedetails/?id=2196102849";

  return (
    <main className="flex flex-col p-8 gap-8">
      <h1 className="text-gray-50 font-bold text-lg">Mod List</h1>
      <div className={cn("grid gap-4")}>
        <ModCard modId={3037988451} />
        <ModCard modId={3110913021} />
        <ModCard modId={3111166249} />
        <ModCard modId={1510950729} />
      </div>
    </main>
  );
}
