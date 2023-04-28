import { disableId } from ".";
import { instance } from "../..";

export interface ProjectReqBody {
  name: string;
  represent_image_url: string;
  start_date: string;
  end_date: string;
  skill_list: string[];
  description: string;
  url?: string;
}

export interface ProjectResType extends ProjectReqBody {
  element_id: string;
  feedback: string;
}

export const documnetProject = (body: ProjectResType[]) => {
  return instance.patch("/document/project", {
    title: '',
    project_list: body.map(disableId),

  });
};
