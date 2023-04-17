import { instance } from "../..";

export interface IntroduceReqBody {
  heading: string;
  introduce: string;
}

export const documnetIntroduce = (body: IntroduceReqBody) => {
  return instance.patch("/document/introduce", body);
};
