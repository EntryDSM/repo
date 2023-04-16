import { instance } from "..";

export interface MajorList {
  id: string;
  name: string;
}

interface SearchMajorRes {
  major_list: MajorList[];
}

export const getMajor = () => {
  return instance.get<SearchMajorRes>("/major");
};

export interface PostMajorReq {
  major_name: string;
}

export const postMajor = (body: PostMajorReq) => {
  return instance.post("/major", body);
};

export const deleteMajor = (name: string) => {
  return instance.delete(`/major/${name}`);
};
