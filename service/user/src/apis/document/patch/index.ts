import { EachStateType, StateArrayType } from "@/hooks/useWriteProfile";
export * from "./Award";
export * from "./Certificate";
export * from "./Introduce";
export * from "./Project";
export * from "./SkillSet";
export * from "./WriteInfo";

interface PropsType {
  element_id?: string;
  feedback: string;
}

export const disableId = <T extends EachStateType>({
  element_id,
  feedback,
  ...arg
}: PropsType & T) => arg;
