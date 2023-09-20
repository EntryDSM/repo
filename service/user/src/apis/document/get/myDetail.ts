import { instance } from "@/apis";
import {
  ActivityResType,
  AwardResType,
  CertificateResType,
  IntroduceResType,
  ProjectResType,
  WriteInfoReqBody,
} from "../patch";

export type StatusType = "CREATED" | "SUBMITTED" | "SHARED";

export interface DetailType {
  document_id: string;
  writer: WriteInfoReqBody;
  document_status: StatusType;
  introduce: IntroduceResType;
  skill_list: string[];
  project_list: ProjectResType[];
  award_list: AwardResType[];
  certificate_list: CertificateResType[];
  activity_list: ActivityResType[];
}

export const myDetail = () => {
  return instance.get<DetailType>("/document/my/detail");
};
