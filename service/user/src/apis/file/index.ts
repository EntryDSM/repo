import { instance } from "..";

interface GetFileReq {
  type: "PROFILE" | "DOCUMENT";
  file: FormData;
}
interface GetFileRes {
  image_path: string;
  base_url: string;
}

export const getFile = ({ file, type }: GetFileReq) => {
  return instance.post<GetFileRes>(`/file/image?type=${type}`, file);
};
