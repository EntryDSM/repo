import { instance } from ".";

export const fileToImg = (type: "PROFILE" | "DOCUMENT", file: File) => {
  const form = new FormData();
  form.append("file", file);
  return instance.post<string>("/file", form);
};
