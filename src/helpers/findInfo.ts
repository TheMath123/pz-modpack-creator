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
  const modIdMatches = [...contentText.matchAll(/Mod ID:\s*([\w]+)/g)].map(
    (m) => m[1],
  );
  const mapFolderMatches = [
    ...contentText.matchAll(/Map Folder:\s*([\w\s]+)/g),
  ].map((m) => m[1]);

  return {
    workshop_id: workshopIdMatch ? parseInt(workshopIdMatch[1], 10) : null,
    mod_id: modIdMatches.length > 0 ? modIdMatches : null,
    map_folder: mapFolderMatches.length > 0 ? mapFolderMatches : null,
  };
}
