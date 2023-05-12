import { instance } from "..";

export interface Library {
  id: string;
  access_right: "PUBLIC" | "STUDENT_ONLY" | "PRIVATE";
  year: number;
  grade: number;
  generation: number;
  document_url: string;
}

interface LibraryType {
  library_document_list: Library[];
}

export const getLibrary = (year: string) => {
  return instance.get<LibraryType>(`/library/teacher?year=${year}`);
};
