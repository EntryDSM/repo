import { instance } from "..";

interface ProjectReqBody {
  name: string;
  represent_image_path: string;
  start_date: Date;
  end_date: Date;
  skill_list: string[];
  description: string;
  url?: string;
}

export const documnetProject = (body: ProjectReqBody[]) => {
  return instance.patch("/document/project", body);
};
