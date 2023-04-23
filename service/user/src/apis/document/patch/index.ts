import { EachStateType, StateArrayType } from "@/hooks/useWriteProfile";
export * from "./Award";
export * from "./Certificate";
export * from "./Introduce";
export * from "./Project";
export * from "./SkillSet";
export * from "./WriteInfo";

interface PropsType {
  document_id?: string;
  element_id?: string;
  feedback: string;
}

export const disableId = <T extends EachStateType>({
  document_id,
  element_id,
  feedback,
  ...arg
}: PropsType & T) => arg;
