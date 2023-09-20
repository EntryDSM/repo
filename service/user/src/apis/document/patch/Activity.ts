import {toast} from "react-toastify";
import {disableId} from ".";
import {instance} from "../..";

export interface ActivityReqBody {
  name: string;
  date: number | string;
  end_date: number | string;
  is_period: boolean;
  description: string;
}

export interface ActivityResType extends ActivityReqBody {
  element_id: string | null;
  feedback: string;
}

export const documentActivity = (body: ActivityReqBody[]) => {
  const promise = instance.patch("/document/activity", {
    activity_list: body,
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
