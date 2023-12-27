export const generateWorkshopIdString = (items: ModObject[]): string => {
  const workshopIds = items
    .map((item) => item.workshop_id)
    .filter((id) => id !== undefined) // Filtra os undefined para garantir que todos os ids sejam válidos
    .join(";"); // Junta os ids com ponto e vírgula

  return workshopIds;
};

export const getWorkshopIds = (items: ModObject[]): number[] => {
  return items
    .map((item) => item.workshop_id)
    .filter((id): id is number => id !== undefined); // Filtra os undefined e garante que cada id seja do tipo number
};

export const generateModIdString = (items: ModObject[]): string => {
  const modIds = items
    .flatMap((item) => item.mod_id ?? []) // Achata os arrays de mod_id e trata valores undefined
    .join(";"); // Junta os ids com ponto e vírgula

  return modIds;
};

export const generateMapFolderString = (items: ModObject[]): string => {
  const mapFolders = items
    .flatMap((item) => item.map_folder ?? []) // Achata os arrays de map_folder e trata valores undefined
    .join(";"); // Junta os itens com ponto e vírgula

  return mapFolders;
};

export const createIniFileContent = (modList: ModObject[]): string => {
  const modsString = generateModIdString(modList);
  const mapString = generateMapFolderString(modList);
  const workshopItemsString = generateWorkshopIdString(modList);

  const iniContent = `Mods=${modsString}\nMap=${mapString}\nWorkshopItems=${workshopItemsString}`;

  return iniContent;
};
