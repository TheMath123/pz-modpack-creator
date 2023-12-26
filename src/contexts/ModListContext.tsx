"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LocalStorage } from "@/infra/LocalStorage";

interface ModListContextProps {
  modList: ModObject[];
  selectedMods: ModObject[];
  addModSelect: (workshopId: string | number) => void;
  removeModSelect: (workshopId: string | number) => void;
  fillModData: (data: ModObject) => void;
  fetchModListData: (list: string) => void;
  fillModListWithStringList: (list: string) => void;
  saveList: () => void;
  loading: boolean;
}

export const ModListContext = createContext({} as ModListContextProps);

export function ModListProvider({ children }: { children: ReactNode }) {
  const [modList, setModList] = useState<ModObject[]>([]);
  const [selectedMods, setSelectedMods] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadStorageList();
  }, []);

  useEffect(() => {
    console.log(selectedMods);
  }, [selectedMods]);

  function saveList() {
    LocalStorage.set("list", JSON.stringify(modList));
  }

  function loadStorageList() {
    const strList = LocalStorage.get("list");
    if (strList) {
      setModList(JSON.parse(strList));
    }
  }

  // Selected
  function addModSelect(workshopId: string | number) {
    const isExistMod = selectedMods.find((item) => item === workshopId);

    console.log("[AddedMod] isExistMod:", isExistMod);

    if (isExistMod) {
      return;
    }

    let selectMod =
      typeof workshopId === "string" ? Number(workshopId) : workshopId;

    setSelectedMods([...selectedMods, selectMod]);
  }

  function removeModSelect(workshopId: string | number) {
    const updatedMods = selectedMods.filter((item) => item !== workshopId);
    setSelectedMods(updatedMods);
  }

  // Filled modList
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

  // APIs
  function fetchModListData(list: string) {
    const fetchBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mod_list: list.split(";"),
      }),
    };

    fetch("api/metadata", fetchBody)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || response.statusText);
          });
        }
        return response.json();
      })
      .then((data) => {
        setModList(data);
      })
      .catch((error) => {
        console.error(error);
      });

    setLoading(false);
  }

  function fetchOneModData(workshopId: string | number) {
    const fetchUrl = `/api/metadata?mod_id=${workshopId}`;

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
        fillModData(data);
      })
      .catch((error) => {});
  }

  return (
    <ModListContext.Provider
      value={{
        loading,
        modList,
        selectedMods,
        addModSelect,
        removeModSelect,
        fillModData,
        fetchModListData,
        fillModListWithStringList,
        saveList,
      }}
    >
      {children}
    </ModListContext.Provider>
  );
}

export function useModList() {
  return useContext(ModListContext);
}
