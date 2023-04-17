import { instance } from "../..";

export interface AwardReqBody {
  name: string;
  awarding_institution: string;
  date: Date;
  desctiption?: string;
}

export interface AwardResType extends AwardReqBody {
  document_id: string;
  element_id: string;
  feedback: string;
}

export const documnetAward = (body: AwardReqBody[]) => {
  return instance.patch("/document/award", { award_list: body });
};
