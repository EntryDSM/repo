import { instance } from "../..";

export interface WrtieInfoReqBody {
  name: string;
  profile_image_path: string;
  major_id: string;
  email: string;
  grade: string;
  class_num: string;
  number: string;
  skill_set: string[];
}

export interface WriteInfoResType extends WrtieInfoReqBody {
  document_id: string;
  element_id: string;
  feedback: string;
}

export const documnetWriteInfo = ({
  skill_set,
  name,
  feedback,
  document_id,
  element_id,
  ...body
}: WriteInfoResType) => {
  instance.patch("/document/skillset", { skill_list: skill_set });
  return instance.patch("/document/write-info", body);
};
