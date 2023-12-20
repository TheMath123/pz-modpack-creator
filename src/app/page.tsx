"use client";

import { useMemo, useState } from "react";
import { Input, Loading } from "@/components";
import { useModList } from "../contexts/ModListContext";
import { ArrowUpIcon } from "@primer/octicons-react";
import colors from "tailwindcss/colors";
import ModCard from "../components/ModCard";
import { LocalStorage } from "@/infra/LocalStorage";
import React from "react";
import { NavigatePages } from "../components/NavigatePages";

const list =
  "2900339846;2694448564;2282429356;2875848298;2616986064;2464581798;2659216714;2169435993;2664527681;2847184718;2732594572;2503622437;2487022075;2392709985;2759339330;2619072426;2852690210;1619603097;2643751872;2241990680;2292487242;1484339564;2461082856;2866258937;2757712197;2732638175;2744114761;2577243435;2859296947;2553809727;1299328280;2544353492;2704811006;2735579575;2783580134;2763647806;2642541073;2640569820;2584991527;2368058459;2216760107;2725360009;2529746725;2458631365;2710167561;2725216703;2718642011;2877685881;2313387159;2771297715;2940354599;2921981763;2883397918;2901962885;2903771337;2795007896;2942582690;2915430406;2838629416;2926455909;2859304462;2739570406;639909479;2860405997;2629954811;2857280512;2866223444;2857191956;1923023842;2286124931;2732294885;1605085751;2513537093;2769706949;1922750845;2627877543;2846623627;1911132112;2465017864;2392987599;2778576730;2878374713;2845952197;2957932451;2959512313;2337452747;2599752664;2959360615;1254546530;2961116539;2867431511;2788256295;2733680483;2961538018;2004998206;2604943386;2779447869;2961624626;2869043793;2826322136;2719850086;2920089312;2956146279;2593898609;2934985376;2674541310;2890387396;2943049204;2779627490;2893552838;2718683583;2800412098;2584112711;2920899878;2808679062;2910853862;2918458317;2585740711;2863949128;2434548740;2697542193;2942793445;2944344655;2862815146;2904920097;2934621024;1510950729;2923554542;2335368829;2721945297;2200148440;515555911;2928707272;2733027635;2609236763;2625930569;2967718410";

export default function Home() {
  const { modList, fetchModListData, loading } = useModList();
  const [search, setSearch] = useState("");
  const [maxItemPerPage, setMaxItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const strList = LocalStorage.get("list");
  !strList && fetchModListData(list);

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
          <NavigatePages pagesAmount={paginateArray.length} />
        </div>
      </header>
      <div className="flex flex-col gap-4">
        {pages.length > 0 &&
          pages[currentPage].map((item: ModObject) => (
            <ModCard key={item.workshop_id} modObj={item} />
          ))}
      </div>
      <a
        href={"#top"}
        className="fixed h-8 w-8 bg-gray-800 border border-gray-50/10 rounded-full flex items-center justify-center z-10 bottom-8 right-8 cursor-pointer hover:bg-gray-800/75 active:bg-gray-800/50"
      >
        <ArrowUpIcon fill={colors.gray[50]} size={28} />
      </a>
    </main>
  );
}
