"use client";

import { useMemo, useState, useEffect } from "react";
import { Input, ModCard, Paginator } from "@/components";
import { useModList } from "../contexts/ModListContext";
import list from "@/assets/list.json";
import { paginate } from "@/helpers/paginate";

export default function Home() {
  const { modList, loading, fillModListWithStringList } = useModList();
  const [search, setSearch] = useState("");
  const [maxItemPerPage, setMaxItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const pages = paginate(modList, maxItemPerPage);

  useEffect(() => {
    fillModListWithStringList(list.list);
  }, []);

  console.log(pages);

  const filteredModList = useMemo(() => {
    return modList.filter((mod) =>
      mod.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, modList]);

  return (
    <main id="top" className="flex flex-col p-8 gap-8">
      <header className="flex flex-col gap-4">
        <h1 className="text-gray-50 font-bold text-lg">Mod List</h1>
        <Input
          className="max-w-sm"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search Mod Name..."
        />
        <div className="flex flex-row justify-between gap-2">
          <h2 className="text-gray-50">
            <strong>Number of mods: </strong>
            {modList.length}
          </h2>
          <Paginator
            pagesAmount={pages.length}
            currentPage={currentPage}
            onChangePage={setCurrentPage}
          />
        </div>
      </header>
      <div className="flex flex-col gap-4">
        {pages.length > 0 &&
          pages[currentPage].map((item) => (
            <ModCard key={item.workshop_id} modId={item.workshop_id!} />
          ))}
      </div>
    </main>
  );
}
