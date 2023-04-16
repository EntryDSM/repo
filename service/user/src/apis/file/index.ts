import { instance } from "..";

interface GetFileReq {
  type: "PROFILE" | "DOCUMENT";
  file: File;
}
interface GetFileRes {
  image_path: string;
}

export const getFile = ({ file, type }: GetFileReq) => {
  const form = new FormData();
  form.append("file", file);
  return instance.post<GetFileRes>(`/file?type=${type}`, form);
};
