import { instance } from "@/apis";

export const documentShare = (id: string) => {
  return instance.post("/document/share/" + id);
};

export const documentUnShare = (id: string) => {
  return instance.post("/document/share/cancel/" + id);
};
