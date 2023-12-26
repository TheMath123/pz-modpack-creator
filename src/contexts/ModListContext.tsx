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
  selectedMods: number[];
  addModToSelectedList: (workshopId: string | number) => void;
  removeModToSelectedList: (workshopId: string | number) => void;
  clearSelectedList: () => void;
  removeMods: (workshopIdInput: string | number[] | string[]) => void;
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
  function addModToSelectedList(workshopId: string | number) {
    const isExistMod = selectedMods.find((item) => item === workshopId);

    if (isExistMod) {
      return;
    }

    let selectMod =
      typeof workshopId === "string" ? Number(workshopId) : workshopId;

    setSelectedMods([...selectedMods, selectMod]);
  }

  function removeModToSelectedList(workshopId: string | number) {
    const updatedMods = selectedMods.filter((item) => item !== workshopId);
    setSelectedMods(updatedMods);
  }

  function clearSelectedList() {
    setSelectedMods([]);
  }

  // Filled modList
  function removeMods(workshopIdInput: string | number[] | string[]) {
    console.log("aqui");
    let workshopIds: string[];

    if (typeof workshopIdInput === "string") {
      // Se for uma string, separar por ponto e vírgula e converter para array
      workshopIds = workshopIdInput.split(";");
    } else {
      // Se for um array (de números ou strings), converter todos os elementos para string
      workshopIds = workshopIdInput.map(String);
    }

    // Filtrar os mods que não estão na lista de workshopIds
    const updatedModList = modList.filter(
      (mod) => !workshopIds.includes(String(mod.workshop_id)),
    );

    // Atualizar o estado modList
    setModList(updatedModList);
  }

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
        removeMods,
        selectedMods,
        addModToSelectedList,
        removeModToSelectedList,
        clearSelectedList,
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
