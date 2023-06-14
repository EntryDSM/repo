import { instance } from "@/apis";

export interface DocumentResType {
  document_id: string;
  writer: {
    element_id: string;
    student_id: string;
    name: string;
    profile_image_path: string;
    student_number: string;
    email: string;
    url?: string | null;
    major: {
      id: string;
      name: string;
    };
  };
  status: string;
  introduce: {
    element_id: string;
    heading: string;
    introduce: string;
  };
  skill_list: string[];
  project_list: [
    {
      element_id: string;
      name: string;
      skill_list: string[];
      represent_image_path: string;
      start_date: number;
      end_date: number;
      description: string;
      url: string; //null 가능
    }
  ];
  award_list: [
    {
      element_id: string;
      name: string;
      awarding_institution: string;
      date: number;
      description: string; //null 가능
      url: string; //null 가능
    }
  ];
  certificate_list: [
    {
      element_id: string;
      name: string;
      issuing_institution: string;
      date: number;
    }
  ];
}

export const detail = (document_id: string) => {
  return instance.get<DocumentResType>("/document/" + document_id);
};
