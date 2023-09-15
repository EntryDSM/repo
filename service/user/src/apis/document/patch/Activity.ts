import { toast } from "react-toastify";
import { disableId } from ".";
import { instance } from "../..";

export interface ActivityReqBody {
  name: string;
  date: number | string;
  description: string;
}

export interface ActivityResType extends ActivityReqBody {
  element_id: string | null;
  feedback: string;
}

export const documnetActivity = (body: ActivityReqBody[]) => {
  return instance
    .patch("/document/activity", {
      activity_list: body,
    })
    .catch((error) => {
      toast("입력하지 않은 필드가 있습니다.", {
        autoClose: 1000,
        type: "error",
      });
    });
};
