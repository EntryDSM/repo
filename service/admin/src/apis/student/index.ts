import { instance } from "..";

export interface StudentType {
  student_id: string;
  name: string;
  document_id: string;
  document_status: string;
  feedback_count: number;
  profile_image_url: string;
  student_number: number;
  email: string;
  major: {
    id: string;
    name: string;
  };
}

interface GetStudentRes {
  student_list: StudentType[];
}

export const getStudent = () => {
  return instance.get<GetStudentRes>("/student");
};
