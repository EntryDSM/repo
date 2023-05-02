import { instance } from "..";

export interface MyFeedbackResType {
  document_id: string;
  feedback_list: {
    element_id: string;
    element_name: string;
    comment: string;
  }[];
}

export const myFeedback = () => {
  return instance.get<MyFeedbackResType>("/feedback/my");
};
