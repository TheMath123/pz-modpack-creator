interface ModObject {
  title?: string;
  description?: string;
  rawDescription?: string;
  imageURL?: string;
  url?: string;
  workshop_id?: number;
  mod_id: string[] | null;
  map_folder?: string[] | null;
  error?: string | null;
}
