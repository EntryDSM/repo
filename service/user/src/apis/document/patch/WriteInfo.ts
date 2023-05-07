import { instance } from "../..";

export interface WrtieInfoReqBody {
  element_id: string;
  student_id: string;
  name: string;
  profile_image_url: string;
  major: { id: string; name: string };
  email: string;
  grade: string;
  class_num: string;
  number: string;
  skill_list: string[];
}

export interface WriteInfoResType {
  document_id: string;
  element_id: string;
  student_id: string;
  feedback?: string | null;
  name: string;
  profile_image_url: string;
  student_number: string; // 원하면 학년 반 번호로 각각 나눠서 줄 수도 있음
  email: string;
  major: {
    id: string;
    name: string;
  };
}

export const documnetWriteInfo = ({
  skill_list,
  name,
  feedback,
  student_id,
  element_id,
  ...body
}: WriteInfoResType & { skill_list: string[] }) => {
  instance.patch("/document/skillset", { skill_list });
  return instance.patch("/document/write-info", body);
};
