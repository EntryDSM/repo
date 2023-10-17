import { instance } from "@/apis";

interface DocumentFileReq {
  grade: number;
  file: FormData;
}

export const saveDocument = ({ grade, file }: DocumentFileReq) => {
  return instance.post(`/library?grade=${grade}`, file);
};
