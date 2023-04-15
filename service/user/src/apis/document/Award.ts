import { instance } from "..";

interface AwardReqBody {
  name: string;
  awarding_institution: string;
  date: Date;
  desctiption?: string;
}

export const documnetAward = (body: AwardReqBody[]) => {
  return instance.patch("/document/award", body);
};
