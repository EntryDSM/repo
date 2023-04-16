import { instance } from "..";

export interface DocumentMyRes {
  profile_image_url: string;
  name: string;
  grade: number;
  class_num: number;
  number: number;
  is_exist: boolean;
  status: "CREATED" | "SUBMITTED" | "SHARED" | null;
  major_name: string | null;
  heading: string | null;
  introduce: string | null;
  email: string;
}

export const documentMy = () => {
  return instance.get<DocumentMyRes>("/document/my");
};
