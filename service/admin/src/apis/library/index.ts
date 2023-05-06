import { instance } from "..";

export interface Library {
  id: string;
  access_right: "PUBLIC" | "STUDENT_ONLY" | "PRIVATE";
  year: number;
  grade: number;
  generation: number;
  url: string;
}

export const getLibrary = (year: string) => {
  return instance.get<Library[]>(`/library/teacher?year=${year}`);
};
