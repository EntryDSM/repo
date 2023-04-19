import { disableId } from ".";
import { instance } from "../..";

export interface IntroduceReqBody {
  heading: string;
  introduce: string;
}

export interface IntroduceResType extends IntroduceReqBody {
  document_id: string;
  element_id: string;
  feedback: string;
}

export const documnetIntroduce = (body: IntroduceResType) => {
  return instance.patch("/document/introduce", disableId(body));
};
