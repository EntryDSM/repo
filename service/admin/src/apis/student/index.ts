import { instance } from "..";

export interface Student {
  student_id: string;
  name: string;
  document_id: string;
  document_status: string;
  feedback_count: number;
  profile_image_path: string;
  student_number: number;
  email: string;
  major: {
    id: string;
    name: string;
  };
}

interface GetStudentRes {
  student_list: Student[];
}

export const getStudent = () => {
  return instance.get<GetStudentRes>("/student");
};
