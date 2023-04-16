import { instance } from "..";

export interface MajorList {
  id: string;
  name: string;
}

interface SearchMajorRes {
  major_list: MajorList[];
}

export const searchMajor = () => {
  return instance.get<SearchMajorRes>("/major");
};

export interface MajorCreate {
  major_name: string;
}

export const createMajor = (name: string) => {
  return instance.post("/major", { major_name: name });
};

export const deleteMajor = (name: string) => {
  return instance.delete(`/major/${name}`);
};
