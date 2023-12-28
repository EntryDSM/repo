import { instance } from "@/apis";

export interface DetailType {
  writer?: string | null;
  introduce?: string | null;
  skill_set?: string | null;
  project_list?: string | null;
  award_list?: string | null;
  certificate_list?: string | null;
  activity_list?: string | null;
}

export const tmpDocument = () => {
  return instance.get<DetailType>("/document/tmp");
};
