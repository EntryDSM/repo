import { instance } from "@/apis";
import {
  AwardResType,
  CertificateResType,
  IntroduceResType,
  ProjectResType,
  WrtieInfoReqBody,
} from "../patch";

export type StatusType = "CREATED" | "SUBMITTED" | "SHARED";

export interface DetailType {
  document_id: string;
  writer: WrtieInfoReqBody;
  document_status: StatusType;
  introduce: IntroduceResType;
  skill_list: string[];
  project_list: ProjectResType[];
  award_list: AwardResType[];
  certificate_list: CertificateResType[];
}

export const myDetail = () => {
  return instance.get<DetailType>("/document/my/detail");
};
