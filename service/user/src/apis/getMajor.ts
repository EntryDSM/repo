import { instance } from ".";

interface Major {
  major_id: string;
  name: string;
}

export const getMajor = () => {
  return instance.get<{ major_list: Major[] }>("/major");
};
