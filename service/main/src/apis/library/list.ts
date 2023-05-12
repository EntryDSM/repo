import { instance } from "..";

interface ListLibraryType {
  index: {
    name: string;
    student_number: number;
    page: number;
  }[];
}

export const listLibrary = (id: string) => {
  return instance.get<ListLibraryType>(`/library/${id}/index`);
};
