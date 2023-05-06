import { instance } from "..";

interface DeleteType {
  document_id: string;
  element_id: string;
}

interface ChangeType extends DeleteType {
  comment: string | null;
}

export const feedbackRemove = (body: DeleteType) => {
  return instance.delete("/feedback", { data: body });
};

export const feedbackAdd = (body: ChangeType) => {
  return instance.post("/feedback", body);
};

export const feedbackChange = (body: ChangeType) => {
  return instance.patch("/feedback", body);
};
