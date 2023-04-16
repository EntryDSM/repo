import { instance } from ".";

interface SaveImgRes {
  image_path: string;
}

export const SaveImg = (type: "PROFILE" | "DOCUMENT", file: FormData) => {
  return instance.post<SaveImgRes>(`/file?type=${type}`, file);
};
