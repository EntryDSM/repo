import { instance } from "..";

interface DocumnetItem {
  document_id: string;
  name: string;
  profile_image_path: string;
  student_number: number;
  email: string;
  major: {
    id: string;
    name: string;
  };
}

export const getDocument = () => {
  return instance.get<DocumnetItem>("/document/shared");
};
