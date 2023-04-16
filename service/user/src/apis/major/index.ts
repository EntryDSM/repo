import { instance } from "..";

interface Major {
  id: string;
  name: string;
}

interface GetMajorRes {
  major_list: Major[];
}

export const getMajor = () => {
  return instance.get<GetMajorRes>("/major");
};
