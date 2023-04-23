import { instance } from "../..";

export interface WrtieInfoReqBody {
  name: string;
  profile_image_url: string;
  major: { id: string; name: string };
  email: string;
  grade: string;
  class_num: string;
  number: string;
  skill_set: string[];
}

export interface WriteInfoResType extends WrtieInfoReqBody {
  student_id: string;
  element_id: string;
  feedback: string;
}

export const documnetWriteInfo = ({
  skill_set,
  name,
  feedback,
  student_id,
  element_id,
  ...body
}: WriteInfoResType) => {
  instance.patch("/document/skillset", { skill_list: skill_set });
  return instance.patch("/document/write-info", body);
};
