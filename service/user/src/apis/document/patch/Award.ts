import { disableId } from ".";
import { instance } from "../..";

export interface AwardReqBody {
  name: string;
  awarding_institution: string;
  date: number | string;
  description: string;
}

export interface AwardResType extends AwardReqBody {
  element_id: string | null;
  feedback: string;
}

export const documnetAward = (body: AwardReqBody[]) => {
  return instance.patch("/document/award", {
    award_list: body,
  });
};
