import { toast } from "react-toastify";
import { disableId } from ".";
import { instance } from "../..";

export interface ProjectReqBody {
  name: string;
  represent_image_path: string;
  start_date: number | string;
  end_date: number | string;
  is_period: boolean;
  type: string;
  skill_list: string[];
  description: string;
  urls?: string[];
}

export interface ProjectResType extends ProjectReqBody {
  element_id: string | null;
  feedback: string;
}

export const documentProject = (body: ProjectReqBody[]) => {
  return instance
    .patch("/document/project", {
      project_list: body,
    })
    .catch((_) => {
      toast("입력하지 않은 필드가 있습니다.", {
        autoClose: 1000,
        type: "error",
      });
    });
};
