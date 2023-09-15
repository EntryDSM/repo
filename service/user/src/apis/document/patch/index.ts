import { EachStateType, StateArrayType } from "@/hooks/useWriteProfile";
import { DetailType } from "../get/myDetail";
export * from "./Award";
export * from "./Certificate";
export * from "./Introduce";
export * from "./Project";
export * from "./WriteInfo";
export * from "./Activity";

type ValueOf<T> = T[keyof T];

export const disableId = <
  T extends ValueOf<
    Omit<DetailType, "document_id" | "skill_list" | "document_status">
  >
>(
  body: T
) => {
  if (Array.isArray(body)) return body.map(({ feedback, ...arg }) => arg);
  const { element_id, feedback, ...arg } = body;
  return arg;
};
