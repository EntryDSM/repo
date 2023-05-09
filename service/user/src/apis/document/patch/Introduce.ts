import { disableId } from ".";
import { instance } from "../..";

export interface IntroduceReqBody {
  heading: string;
  introduce: string;
}

export interface IntroduceResType extends IntroduceReqBody {
  element_id: string;
  feedback: string;
}

export const documnetIntroduce = (body: IntroduceReqBody) => {
  return instance.patch("/document/introduce", body);
};
