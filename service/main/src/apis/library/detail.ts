import { instance } from "..";

interface DetailLibraryType {
  year: number;
  grade: number;
  generation: number;
  document_url: string;
  index: {
    name: string;
    major: string; // 사용되지 않는 정보
    student_number: number;
    page: number;
  }[];
}

export const detailLibrary = (id: string) => {
  return instance.get<DetailLibraryType>(`/library/public/${id}`);
};
