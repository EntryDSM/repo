import { instance } from "@/apis";

export const documentSubmit = (isSubmit?: boolean) => {
  const cancleUrl = isSubmit ? "" : "/cancel";
  return instance.post("/document/submit" + cancleUrl);
};
