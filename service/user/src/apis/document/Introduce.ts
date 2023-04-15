import { instance } from "..";

interface IntroduceReqBody {
  heading: string;
  introduce: string;
}

export const documnetProject = (body: IntroduceReqBody) => {
  return instance.patch("/document/introduce", body);
};
