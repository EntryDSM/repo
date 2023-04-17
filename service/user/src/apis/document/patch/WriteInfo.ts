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
  ...body
}: WrtieInfoReqBody) => {
  instance.patch("/document/skillset", skill_set);
  return instance.patch("/document/writer-info", body);
};
