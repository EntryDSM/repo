import { instance } from "..";

interface DetailLibraryType {
  year: number;
  grade: number;
  generation: number;
  document_url: string;
  index: {
    name: string;
    student_number: number;
    page: number;
  }[];
}

export const detailLibrary = (id: string) => {
  return instance.get<DetailLibraryType>(`/library/public/${id}`);
};
