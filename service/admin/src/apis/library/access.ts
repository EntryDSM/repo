import { instance } from "..";

export const accessRight = (id: string, access_right: string) => {
  return instance.patch(
    `/library/${id}/access-right?access_right=${access_right}`
  );
};
