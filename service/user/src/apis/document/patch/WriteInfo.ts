import { instance } from "../..";

export interface WrtieInfoReqBody {
  element_id: string;
  student_id: string;
  feedback?: string;
  name: string;
  profile_image_url: string;
  major: { id: string; name: string };
  email: string;
  grade: number;
  class_num: number;
  number: number;
  skill_list: string[];
  student_number: number;
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
  profile_image_url,
  grade,
  class_num,
  number,
  major,
  student_number,
  ...body
}: WrtieInfoReqBody & { skill_list: string[] }) => {
  instance.patch("/document/skill-set", { skill_list });
  instance.patch("/document/writer-info", {
    ...body,
    major_id: major.id,
    grade: Number(grade),
    class_num: Number(class_num),
    number: Number(number),
  });
  instance.patch("/document/profile-image", {
    profile_image_path: profile_image_url,
  });
};
