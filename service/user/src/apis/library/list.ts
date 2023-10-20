import { instance } from "..";

interface LibraryIndexType {
  index: {
    name: string;
    major: string;
    student_number: number;
    page: number;
  }[];
}

export const libraryIndexList = (id: string) => {
  return instance.get<LibraryIndexType>(`/library/${id}/index`);
};
