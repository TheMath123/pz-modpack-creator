"use client";

import { Input, Loading } from "@/components";
import { cn } from "@/utils/cn";
import { useModList } from "../contexts/ModListContext";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const list =
  "2900339846;2694448564;2282429356;2875848298;2616986064;2464581798;2659216714;2169435993;2664527681;2847184718;2732594572;2503622437;2487022075;2392709985;2759339330;2619072426;2852690210;1619603097;2643751872;2241990680;2292487242;1484339564;2461082856;2866258937;2757712197;2732638175;2744114761;2577243435;2859296947;2553809727;1299328280;2544353492;2704811006;2735579575;2783580134;2763647806;2642541073;2640569820;2584991527;2368058459;2216760107;2725360009;2529746725;2458631365;2710167561;2725216703;2718642011;2877685881;2313387159;2771297715;2940354599;2921981763;2883397918;2901962885;2903771337;2795007896;2942582690;2915430406;2838629416;2926455909;2859304462;2739570406;639909479;2860405997;2629954811;2857280512;2866223444;2857191956;1923023842;2286124931;2732294885;1605085751;2513537093;2769706949;1922750845;2627877543;2846623627;1911132112;2465017864;2392987599;2778576730;2878374713;2845952197;2957932451;2959512313;2337452747;2599752664;2959360615;1254546530;2961116539;2867431511;2788256295;2733680483;2961538018;2004998206;2604943386;2779447869;2961624626;2869043793;2826322136;2719850086;2920089312;2956146279;2593898609;2934985376;2674541310;2890387396;2943049204;2779627490;2893552838;2718683583;2800412098;2584112711;2920899878;2808679062;2910853862;2918458317;2585740711;2863949128;2434548740;2697542193;2942793445;2944344655;2862815146;2904920097;2934621024;1510950729;2923554542;2335368829;2721945297;2200148440;515555911;2928707272;2733027635;2609236763;2625930569;2967718410";

const ModCardDyn = dynamic(() => import("@/components/ModCard"), {
  loading: () => <Loading.Card />,
  ssr: false, // Desativar SSR para este componente se necessário
});

export default function Home() {
  const { modList, fillModListWithStringList } = useModList();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fillModListWithStringList(list);
    setShowSearchBar(true);
  }, [fillModListWithStringList]);

  const filteredModList =
    search.length > 0
      ? modList.filter((mod) => mod.title?.includes(search))
      : [];

  return (
    <main className="flex flex-col p-8 gap-8">
      {showSearchBar && (
        <Input onChange={(e) => setSearch(e.target.value)} value={search} />
      )}
      <p className="text-gray-50">
        <strong>Number of mods: </strong>
        {modList.length}
      </p>
      <div className={cn("grid gap-4")}>
        <h1 className="text-gray-50 font-bold text-lg">Mod List</h1>
        <Suspense fallback={<div>Loading...</div>}>
          {search.length > 0
            ? filteredModList.map((item) =>
                typeof item.workshop_id === "number" ? (
                  <ModCardDyn key={item.workshop_id} modId={item.workshop_id} />
                ) : null,
              )
            : modList.map((item) =>
                typeof item.workshop_id === "number" ? (
                  <ModCardDyn key={item.workshop_id} modId={item.workshop_id} />
                ) : null,
              )}
        </Suspense>
      </div>
    </main>
  );
}
