import { instance } from ".";

export interface PostSignIn {
  account_id: string;
  password: string;
}

export const postSignIn = (body: PostSignIn) => {
  return instance.post("/teacher/auth", body);
};
