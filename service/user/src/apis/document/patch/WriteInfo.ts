import { instance } from "../..";
import {toast} from "react-toastify";

export interface WriteInfoReqBody {
  element_id?: string;
  student_id?: string;
  feedback?: string;
  name: string;
  profile_image_path: string;
  major: { id: string; name: string };
  email: string;
  grade: number;
  class_num: number;
  number: number;
  skill_list: string[];
  student_number?: number;
  url?: string | null;
}

export interface WriteInfoResType {
  document_id: string;
  element_id: string;
  student_id: string;
  feedback?: string | null;
  name: string;
  profile_image_path: string;
  student_number: string;
  email: string;
  url?: string | null;
  major: {
    id: string;
    name: string;
  };
}

export const documentWriteInfo = ({
  skill_list,
  name,
  feedback,
  student_id,
  element_id,
  profile_image_path,
  grade,
  class_num,
  number,
  major,
  student_number,
  ...body
}: WriteInfoReqBody & { skill_list: string[] }) => {
  const promise = Promise.all([
    Promise.resolve().then(() => {
      if(body.email.length === 0) throw new TypeError("Email Required");
    }),
    instance.patch("/document/skill-set", { skill_list }),
    instance.patch("/document/writer-info", {
      ...body,
      major_id: major.id,
      grade: Number(grade),
      class_num: Number(class_num),
      number: Number(number),
    }),
    instance.patch("/document/profile-image", {
      profile_image_path: profile_image_path,
    })
  ]);
  toast.promise(promise, {
    pending: "저장 중...",
    success: "저장되었습니다.",
    error: "입력하지 않은 필드가 있습니다."
  }, {
    autoClose: 1000
  });
  return promise;
};
