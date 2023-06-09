import { disableId } from ".";
import { instance } from "../..";

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

export const documnetProject = (body: ProjectReqBody[]) => {
  return instance.patch("/document/project", {
    title: "",
    project_list: body,
  });
};
