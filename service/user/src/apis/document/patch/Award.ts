import { toast } from "react-toastify";
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
  return instance
    .patch("/document/award", {
      award_list: body,
    })
    .catch((error) => {
      toast("입력하지 않은 필드가 있습니다.", {
        autoClose: 1000,
        type: "error",
      });
    });
};
