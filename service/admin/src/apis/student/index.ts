import { instance } from "..";

export interface StudentType {
  student_id: string;
  name: string;
  document_id: string;
  document_status: "CREATED" | "SUBMITTED" | "SHARING";
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
  const nameStr = name ?? null;
  const gradeStr = grade ?? null;
  const classNumStr = classNum ?? null;
  const majorStr = major ?? null;
  return instance.get<GetStudentRes>(
    `/student?name=${nameStr}&grade=${gradeStr}&classNum=${classNumStr}&major=${majorStr}`
  );
};
