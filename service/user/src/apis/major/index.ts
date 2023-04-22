import { instance } from "..";

interface Major {
  id: string;
  name: string;
}

interface GetMajorRes {
  majorList: Major[];
}

export const getMajor = () => {
  return instance.get<GetMajorRes>("/major");
};
