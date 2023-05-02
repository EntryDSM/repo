import { instance } from "../..";

export interface DocumentMyRes {
  profile_image_url: string;
  email: string;
  name: string;
  grade: number;
  class_num: number;
  number: number;
  is_exist: boolean;
  status: "CREATED" | "SUBMITTED" | "SHARED";
  major_name: string;
  heading: string;
  introduce: string;
}

export const documentMy = () => {
  return instance.get<DocumentMyRes>("/document/my");
};
