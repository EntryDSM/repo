import { instance } from "../..";

export const documnetSkillSet = (body: string[]) => {
  return instance.patch("/document/skill-set", body);
};
