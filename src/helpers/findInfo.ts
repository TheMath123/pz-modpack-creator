interface WorkshopInfo {
  workshop_id: number | null;
  mod_id: string[] | null;
  map_folder: string[] | null;
}

export function findInfo(contentText: string | null): WorkshopInfo {
  if (!contentText) {
    return { workshop_id: null, mod_id: null, map_folder: null };
  }

  const workshopIdMatch = contentText.match(/Workshop ID:\s*(\d+)/);

  const modIdSet = new Set<string>();
  [...contentText.matchAll(/Mod ID:\s*([\w\d%]+)/g)].forEach((match) => {
    const modId = match[1];
    if (typeof modId === "string") {
      // Verifica e assegura que modId é uma string
      modIdSet.add(modId);
    }
  });

  const mapFolderMatches = [
    ...contentText.matchAll(/Map Folder:\s*([\w\s]+)/g),
  ].map((m) => m[1]);

  return {
    workshop_id: workshopIdMatch ? parseInt(workshopIdMatch[1], 10) : null,
    mod_id: modIdSet.size > 0 ? Array.from(modIdSet) : null,
    map_folder: mapFolderMatches.length > 0 ? mapFolderMatches : null,
  };
}
