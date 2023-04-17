import { instance } from "@/apis";

interface DetailType {
  "document-id": string;
  writer: {
    element_id: string;
    student_id: string;
    name: string;
    profile_image_path: string;
    student_number: string; // 원하면 학년 반 번호로 각각 나눠서 줄 수도 있음
    email: string;
    major: {
      id: string;
      name: string;
    };
    feedback: string | null; // null 가능
    skill_set?: string[];
  };
  status: string;
  introduce: {
    element_id: string;
    heading: string;
    introduce: string;
    feedback: string | null; // null 가능
  };
  skill_set: string[];
  project_list: [
    {
      element_id: string;
      name: string;
      represent_image_path: string;
      start_date: string;
      end_date: string;
      description: string;
      url: string | null; //null 가능,
      feedback: string | null; // null 가능
    }
  ];
  award_list: [
    {
      element_id: string;
      name: string;
      awarding_institution: string;
      date: string;
      description: string | null; //null 가능
      feedback: string | null; // null 가능
    }
  ];
  certificate_list: [
    //1
    {
      element_id: string;
      name: string;
      issuing_institution: string;
      date: string;
      feedback: string | null; // null 가능
    }
  ];
}

export const myDetail = () => {
  return instance.get<DetailType>("/document/my/detail");
};
