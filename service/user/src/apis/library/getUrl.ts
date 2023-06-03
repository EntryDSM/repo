import { instance } from "..";

export interface Library {
  year: number;
  grade: number;
  generation: number;
  document_url: string;
}

interface LibraryType {
  library_document_list: Library[];
}

export const getUrl = (year: string) => {
  return instance.get<LibraryType>(`/library/student?year=${year}`);
};
