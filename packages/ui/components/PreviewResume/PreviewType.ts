import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from "react";

export interface FeedbackBoxType {
  part: string;
  document_id: string;
  element_id: string;
  comment?: string | null;
  children?: ReactNode;
}

export interface PreviewType {
  document_id: string;
  writer: {
    element_id: string;
    student_id: string;
    feedback?: string | null;
    name: string;
    profile_image_url: string;
    student_number: number; // 원하면 학년 반 번호로 각각 나눠서 줄 수도 있음
    email: string;
    url?: string | null;
    major: {
      id: string;
      name: string;
    };
  };
  document_status: string;
  introduce: {
    element_id: string;
    feedback?: string | null;
    heading: string;
    introduce: string;
  };
  skill_list: string[];
  project_list: {
    element_id: string;
    name: string;
    represent_image_path: string;
    skill_list: string[];
    start_date: number | string;
    end_date: number | string;
    is_period: boolean;
    type: string;
    description: string;
    urls?: string[]; //null 가능
    feedback?: string | null; // null 가능
  }[];
  award_list: {
    element_id: string;
    name: string;
    awarding_institution: string;
    date: number | string;
    description: string; // null 가능
    feedback?: string | null; // null 가능
  }[];
  certificate_list: {
    element_id: string;
    name: string;
    issuing_institution: string;
    date: number | string;
    feedback?: string | null; // null 가능
  }[];
  activity_list: {
    element_id: string;
    name: string;
    date: number | string;
    end_date: number | string; // null 가능
    is_period: boolean;
    description: string; // null 가능
    feedback?: string | null; // null 가능
  }[];
  targetRef?: MutableRefObject<HTMLDivElement | null>;
  FeedbackBox?: (props: FeedbackBoxType) => JSX.Element;
  pdfView?: Dispatch<SetStateAction<boolean>>;
}
