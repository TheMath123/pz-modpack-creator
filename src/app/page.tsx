"use client";

import { useMemo, useState, useEffect } from "react";
import {
  ModCard,
  Paginator,
  DeleteItemButton,
  Input,
  AddModButton,
  DeselectedButton,
  DownloadButton,
  Button,
} from "@/components";
import { useModList } from "@/contexts/ModListContext";
import list from "@/assets/list.json";
import { paginate } from "@/helpers/paginate";
import { cn } from "@/utils/cn";
import { LocalStorage } from "@/infra/LocalStorage";
import { Metadata } from "next";

export default function Home() {
  const {
    modList,
    fillModListWithStringList,
    selectedMods,
    removeMods,
    clearSelectedList,
    selectAllMods,
    selectModCurrentPage,
  } = useModList();
  const [search, setSearch] = useState("");
  const [modsForAdd, setModsForAdd] = useState("");
  const [maxItemPerPage, setMaxItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fillModListWithStringList(list.list);
  }, []);

  const filteredModList = useMemo(() => {
    const searchTerm = search.replaceAll(",", "").trim();

    if (!searchTerm) {
      return modList; // Retorna a lista inteira se a busca estiver vazia
    }

    return modList.filter((mod) => {
      const workshopIdString = String(mod.workshop_id);
      return workshopIdString.includes(searchTerm);
    });
  }, [search, modList]);

  const pages = paginate(
    filteredModList.length > 0 ? filteredModList : modList,
    maxItemPerPage,
  );

  function handleSelectPage() {
    if (pages.length > 0 && pages[currentPage].length > 0)
      selectModCurrentPage(pages[currentPage]);
  }

  function handlerAddMod() {
    if (modsForAdd.trim().replaceAll(" ", ";").length >= 9) {
      fillModListWithStringList(modsForAdd);
      setModsForAdd("");
    }
  }

  return (
    <main id="top" className="flex flex-col p-4 lg:p-8 gap-8 relative">
      <header className="flex flex-col gap-4 lg:fixed lg:z-30 bg-gray-900 lg:inset-0 h-fit lg:py-4 lg:px-8 w-full">
        <h1 className="text-gray-50 font-bold text-lg">Mod List</h1>

        <div className="flex lg:grid lg:grid-cols-3 flex-col lg:flex-row gap-4 grid-flow-col items-center lg:justify-between w-full">
          <div className="flex flex-row gap-4 items-center w-full lg:w-fit">
            <Input
              type="text"
              className="lg:max-w-sm w-full"
              onChange={(e) => setModsForAdd(e.target.value)}
              value={modsForAdd}
              placeholder="Enter workshop id"
            />
            <AddModButton onClick={() => handlerAddMod()} />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <Button
              onClick={() => {
                LocalStorage.clear();
                window.location.href = window.location.href;
              }}
            >
              Reset Pack
            </Button>
            <Button onClick={() => handleSelectPage()}>Select Page</Button>
            <Button onClick={selectAllMods}>Select All</Button>
            <DownloadButton />
          </div>

          {selectedMods.length > 0 ? (
            <div
              className={
                "flex flex-row gap-4 items-center order-last place-self-end"
              }
            >
              <h3 className="text-gray-50">
                <strong>Mods selected: </strong>
                {selectedMods.length}
              </h3>

              <DeleteItemButton
                onClick={() => {
                  setCurrentPage(0);
                  removeMods(selectedMods);
                  clearSelectedList();
                }}
              />

              <DeselectedButton
                onClick={() => {
                  clearSelectedList();
                }}
              />
            </div>
          ) : null}
        </div>

        {modList.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-4 grid-flow-col w-full lg:items-center lg:justify-between">
            <Input
              className="max-w-sm"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search Workshop ID..."
              onClearSearch={
                search.length > 0 ? () => setSearch("") : undefined
              }
            />
            <h2 className="text-gray-50">
              <strong>Number of mods: </strong>
              {modList.length}
            </h2>
            {filteredModList.length > maxItemPerPage ? (
              <div className="flex flex-col lg:flex-row gap-4">
                <select
                  name="chosenMaxPage"
                  id="chosenMaxPage"
                  className={cn(
                    "border border-gray-50 bg-gray-300 text-slate-900 text-center rounded px-1 w-10 h-8",
                  )}
                  onChange={(e) => {
                    let maxItem = e.target.value;
                    LocalStorage.set("max-item-per-page", maxItem);
                    setCurrentPage(0);
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
                  pagesAmount={pages.length}
                  currentPage={currentPage}
                  onChangePage={setCurrentPage}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </header>
      <div className="flex flex-col gap-4 lg:mt-[172px]">
        {pages.length > 0 &&
          pages[currentPage].map((item) => (
            <ModCard key={item.workshop_id} workshopId={item.workshop_id!} />
          ))}
      </div>
    </main>
  );
}
