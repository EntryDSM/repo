import { instance } from "..";

export interface Library {
  id: string;
  access_right: string;
  year: number;
  grade: number;
  generation: number;
  url: string;
}

export const getLibrary = () => {
  return instance.get<Library[]>("/library/teacher?year=2023");
};
