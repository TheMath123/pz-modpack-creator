interface ModRequired {
  name: string;
  id: string | null;
  url: string;
}
interface ModObject {
  title?: string;
  description?: string;
  rawDescription?: string;
  imageURL?: string;
  url?: string;
  workshop_id?: number;
  modsRequirements?: ModRequired[];
  mod_id: string[] | null;
  map_folder?: string[] | null;
  error?: string | null;
}
