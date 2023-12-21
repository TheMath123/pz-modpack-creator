"use client";

import { useMemo, useState } from "react";
import { Input, ModCard } from "@/components";
import { useModList } from "../contexts/ModListContext";
import { ArrowUpIcon } from "@primer/octicons-react";
import colors from "tailwindcss/colors";
import { LocalStorage } from "@/infra/LocalStorage";
import React from "react";
import { NavigatePages } from "../components/NavigatePages";

const list = "";

export default function Home() {
  const { modList, loading } = useModList();
  const [search, setSearch] = useState("");
  const [maxItemPerPage, setMaxItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const paginateArray = (array: any[], pageSize: number) => {
    const pages = [];

    for (let i = 0; i < array.length; i += pageSize) {
      pages.push(array.slice(i, i + pageSize));
    }

    return pages;
  };

  const pages = paginateArray(modList, maxItemPerPage);

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
          <NavigatePages
            pagesAmount={paginateArray.length}
            currentPage={currentPage}
            onChangePage={setCurrentPage}
          />
        </div>
      </header>
      <div className="flex flex-col gap-4">
        {pages.length > 0 &&
          pages[currentPage].map((workshop_id) => (
            <ModCard key={workshop_id} modId={workshop_id} />
          ))}
      </div>
      {/* <a
        href={"#top"}
        className="fixed h-8 w-8 bg-gray-800 border border-gray-50/10 rounded-full flex items-center justify-center z-10 bottom-8 right-8 cursor-pointer hover:bg-gray-800/75 active:bg-gray-800/50"
      >
        <ArrowUpIcon fill={colors.gray[50]} size={28} />
      </a> */}
    </main>
  );
}
