"use client";

import { useMemo, useState, useEffect } from "react";
import { ModCard, Paginator, DeleteItemButton } from "@/components";
import { useModList } from "@/contexts/ModListContext";
import list from "@/assets/list.json";
import { paginate } from "@/helpers/paginate";
import { cn } from "@/utils/cn";
import { LocalStorage } from "@/infra/LocalStorage";

export default function Home() {
  const {
    modList,
    fillModListWithStringList,
    selectedMods,
    removeMods,
    clearSelectedList,
  } = useModList();
  const [search, setSearch] = useState("");
  const [maxItemPerPage, setMaxItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fillModListWithStringList(list.list);
  }, []);

  const pages = paginate(modList, maxItemPerPage);

  const filteredModList = useMemo(() => {
    return modList.filter((mod) =>
      mod.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, modList]);

  return (
    <main id="top" className="flex flex-col p-4 lg:p-8 gap-8">
      <header className="flex flex-col gap-4">
        <h1 className="text-gray-50 font-bold text-lg">Mod List</h1>
        {/* <Input
          className="max-w-sm"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search Mod Name..."
        /> */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center items-start">
          <h2 className="text-gray-50">
            <strong>Number of mods: </strong>
            {modList.length}
          </h2>

          {selectedMods.length > 0 ? (
            <div className={"flex flex-row gap-4 items-center"}>
              <h3 className="text-gray-50">
                <strong>Mods selected: </strong>
                {selectedMods.length}
              </h3>

              <DeleteItemButton
                onClick={() => {
                  removeMods(selectedMods);
                  clearSelectedList();
                }}
              />
              <button></button>
            </div>
          ) : null}

          <div className="flex flex-row gap-4">
            <select
              name="chosenMaxPage"
              id="chosenMaxPage"
              className={cn(
                "border border-gray-50 bg-gray-300 text-slate-900 text-center rounded px-1",
              )}
              onChange={(e) => {
                let maxItem = e.target.value;
                LocalStorage.set("max-item-per-page", maxItem);
                setMaxItemPerPage(Number(maxItem));
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>

            <Paginator
              pagesAmount={pages.length - 1}
              currentPage={currentPage}
              onChangePage={setCurrentPage}
            />
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-4">
        {pages.length > 0 &&
          pages[currentPage].map((item) => (
            <ModCard key={item.workshop_id} workshopId={item.workshop_id!} />
          ))}
      </div>
    </main>
  );
}
