import { disableId } from ".";
import { instance } from "../..";

export interface AwardReqBody {
  name: string;
  awarding_institution: string;
  date: string;
  desctiption?: string;
}

export interface AwardResType extends AwardReqBody {
  element_id: string;
  feedback: string;
}

export const documnetAward = (body: AwardResType[]) => {
  return instance.patch("/document/award", { award_list: body.map(disableId) });
};
