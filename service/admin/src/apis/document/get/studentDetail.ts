import { instance } from "@/apis";

export interface StudentDetailType {
  document_id: string;
  writer: {
    element_id: string;
    student_id: string;
    name: string;
    profile_image_url: string;
    student_number: number; // 원하면 학년 반 번호로 각각 나눠서 줄 수도 있음
    email: string;
    major: {
      id: string;
      name: string;
    };
    feedback: string | null; // null 가능
  };
  document_status: "CREATED" | "SUBMITTED" | "SHARED";
  introduce: {
    element_id: string;
    heading: string;
    introduce: string;
    feedback: string | null; // null 가능
  };
  skill_list: string[];
  project_list: {
    element_id: string;
    name: string;
    represent_image_path: string;
    skill_list: string[];
    start_date: number;
    end_date: number;
    description: string;
    url: string; //null 가능,
    feedback: string | null; // null 가능
  }[];
  award_list: {
    element_id: string;
    name: string;
    awarding_institution: string;
    date: number;
    description: string; //null 가능
    url: string; //null 가능
    feedback: string | null; // null 가능
  }[];
  certificate_list: {
    element_id: string;
    name: string;
    issuing_institution: string;
    date: number;
    feedback: string | null; // null 가능
  }[];
  activity_list: {
    element_id: string;
    name: string;
    date: number;
    description: string; // null 가능
    feedback: string | null; // null 가능
  }[];
}

export const studentDetail = (id: string) => {
  return instance.get<StudentDetailType>("/document/student/" + id);
};
