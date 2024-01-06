export const generateWorkshopIdString = (items: ModObject[]): string => {
  const workshopIds = items
    .map((item) => item.workshop_id)
    .filter((id) => id !== undefined)
    .join(";");

  return workshopIds;
};

export const getWorkshopIds = (items: ModObject[]): number[] => {
  return items
    .map((item) => item.workshop_id)
    .filter((id): id is number => id !== undefined);
};

export const generateModIdString = (items: ModObject[]): string => {
  const modIds = items.flatMap((item) => item.mod_id ?? []).join(";");

  return modIds;
};

export const generateMapFolderString = (items: ModObject[]): string => {
  let mapFolders = items.flatMap((item) => item.map_folder ?? []).join(";");

  mapFolders += ";Muldragh, KY";

  return mapFolders;
};

export const createIniFileContent = (modList: ModObject[]): string => {
  const modsString = generateModIdString(modList);
  const mapString = generateMapFolderString(modList);
  const workshopItemsString = generateWorkshopIdString(modList);

  const iniContent = `Mods=${modsString}\nMap=${mapString}\nWorkshopItems=${workshopItemsString}`;

  return iniContent;
};
