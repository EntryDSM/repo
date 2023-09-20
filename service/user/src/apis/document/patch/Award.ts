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

export const documentAward = (body: AwardReqBody[]) => {
  const promise = instance.patch("/document/award", {
    award_list: body,
  })
  toast.promise(promise, {
    pending: "저장 중...",
    success: "저장되었습니다.",
    error: "입력하지 않은 필드가 있습니다."
  }, {
    autoClose: 1000
  });
  return promise;
};
