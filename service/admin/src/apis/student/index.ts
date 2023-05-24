import { instance } from "..";

export interface StudentType {
  student_id: string;
  name: string;
  document_id: string;
  document_status: "CREATED" | "SUBMITTED" | "SHARED";
  feedback_count: number;
  profile_image_url: string;
  student_number: number;
  email: string;
  major: {
    id: string;
    name: string;
  };
}

export interface GetStudentRes {
  student_list: StudentType[];
}

interface PropsType {
  name?: string;
  grade?: string;
  classNum?: string;
  major?: string;
}

export const getStudent = ({ name, grade, classNum, major }: PropsType) => {
  return instance.get<GetStudentRes>(
    `/student?name=${name || ""}&grade=${grade || ""}&classNum=${
      classNum || ""
    }&majorId=${major || ""}`
  );
};
