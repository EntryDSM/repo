import { instance } from "../..";

export interface WrtieInfoReqBody {
  element_id?: string;
  student_id?: string;
  feedback?: string;
  name: string;
  profile_image_path: string;
  major: { id: string; name: string };
  email: string;
  grade: number;
  class_num: number;
  number: number;
  skill_list: string[];
  student_number?: number;
  url?: string | null;
}

export interface WriteInfoResType {
  document_id: string;
  element_id: string;
  student_id: string;
  feedback?: string | null;
  name: string;
  profile_image_path: string;
  student_number: string;
  email: string;
  url?: string | null;
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
  profile_image_path,
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
  return instance.patch("/document/profile-image", {
    profile_image_path: profile_image_path,
  });
};
