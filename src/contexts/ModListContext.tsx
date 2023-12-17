"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ModListContextProps {
  modList: ModObject[];
  fillModData: (data: ModObject) => void;
  fillModListWithStringList: (list: string) => void;
}

export const ModListContext = createContext({} as ModListContextProps);

export function ModListProvider({ children }: { children: ReactNode }) {
  const [modList, setModList] = useState<ModObject[]>([]);

  function fillModData(data: ModObject) {
    const verifyItemFilled = modList.find(
      (item) => item.workshop_id === data.workshop_id,
    );

    if (verifyItemFilled?.title) {
      return;
    }

    setModList((currentModList) => {
      const index = currentModList.findIndex(
        (item) => item.workshop_id === data.workshop_id,
      );

      if (index === -1) {
        return currentModList;
      }

      const newModList = [...currentModList];
      newModList[index] = { ...newModList[index], ...data };

      return newModList;
    });
  }

  function fillModListWithStringList(list: string) {
    setModList((currentModList) => {
      const workshopIds = list.split(";").map((id) => parseInt(id, 10));

      const newModObjects = workshopIds.reduce((newMods, id) => {
        const exists = currentModList.some((mod) => mod.workshop_id === id);
        if (!exists) {
          newMods.push({ workshop_id: id, mod_id: null });
        }
        return newMods;
      }, [] as ModObject[]);

      return [...currentModList, ...newModObjects];
    });
  }

  return (
    <ModListContext.Provider
      value={{ modList, fillModData, fillModListWithStringList }}
    >
      {children}
    </ModListContext.Provider>
  );
}

export function useModList() {
  return useContext(ModListContext);
}
