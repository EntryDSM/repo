import { instance } from "..";

interface WrtieInfoReqBody {
  profile_image_path: string;
  major_id: string;
  grade: string;
  class_num: string;
  number: string;
}

export const documnetWriteInfo = (body: WrtieInfoReqBody) => {
  return instance.patch("/document/writer-info", body);
};
