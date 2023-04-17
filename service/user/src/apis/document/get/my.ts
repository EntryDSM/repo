import { instance } from "../..";

export interface DocumentMyRes {
  profile_image_url: string;
  email: string;
  grade: number;
  class_num: number;
  number: number;
  major_id: string | null;
}

export const documentMy = () => {
  return instance.get<DocumentMyRes>("/document/my");
};
