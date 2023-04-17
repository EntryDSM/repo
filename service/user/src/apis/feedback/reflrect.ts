import { EachStateType } from "@/hooks/useWriteProfile";
import { instance } from "..";

export interface ReflrectIdType {
  document_id: string;
  element_id: string;
}

export const feedbackReflrect = ({
  document_id,
  element_id,
}: ReflrectIdType) => {
  return instance.patch("/feedback/apply", {
    document_id,
    element_id,
  });
};
