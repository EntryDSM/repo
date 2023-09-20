import {disableId} from ".";
import {instance} from "../..";
import {toast} from "react-toastify";

export interface IntroduceReqBody {
  heading: string;
  introduce: string;
}

export interface IntroduceResType extends IntroduceReqBody {
  element_id: string;
  feedback: string;
}

export const documentIntroduce = (body: IntroduceReqBody) => {
  const promise = instance.patch("/document/introduce", body)
  toast.promise(promise, {
    pending: "저장 중...",
    success: "저장되었습니다.",
    error: "입력하지 않은 필드가 있습니다."
  }, {
    autoClose: 1000
  });
  return promise;
};
