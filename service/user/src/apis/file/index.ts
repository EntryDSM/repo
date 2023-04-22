import { instance } from "..";

interface GetFileReq {
  type: "PROFILE" | "DOCUMENT";
  file: FormData;
}
export interface GetFileRes {
  imagePath: string;
  baseUrl: string;
}

export const getFile = ({ file, type }: GetFileReq) => {
  return instance.post<GetFileRes>(`/file/image?type=${type}`, file);
};
