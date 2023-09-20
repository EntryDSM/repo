import {toast} from "react-toastify";
import {disableId} from ".";
import {instance} from "../..";

export interface ProjectReqBody {
  name: string;
  represent_image_path: string;
  start_date: number | string;
  end_date: number | string;
  skill_list: string[];
  description: string;
  url?: string;
}

export interface ProjectResType extends ProjectReqBody {
  element_id: string | null;
  feedback: string;
}

export const documentProject = (body: ProjectReqBody[]) => {
  const promise = instance
    .patch("/document/project", {
      title: "",
      project_list: body,
    });
  toast.promise(promise, {
    pending: "저장 중...",
    success: "저장되었습니다.",
    error: "입력하지 않은 필드가 있습니다."
  }, {
    autoClose: 1000
  });
  return promise;
};
