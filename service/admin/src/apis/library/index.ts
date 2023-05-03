import { instance } from "..";

export interface Library {
  id: string;
  access_right: "PUBLIC" | "STUDENT_ONLY" | "PRIVATE";
  year: number;
  grade: number;
  generation: number;
  url: string;
}

export const getLibrary = () => {
  return instance.get<Library[]>("/library/teacher?year=2023");
};
