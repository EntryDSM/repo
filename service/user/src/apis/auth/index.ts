import { instance } from "..";

export interface postSignUpBody {
  name: string;
  email: string;
  grade: number;
  class_num: number;
  number: number;
}

export const postSignUp = (body: postSignUpBody) => {
  return instance.post("/student", body);
};

interface oAuthLoginResType {
  access_token: string;
  access_expired_at: string;
  refresh_token: string;
  refresh_expired_at: string;
}

export const oAuthLogin = (code?: any) => {
  return instance.get<oAuthLoginResType>(`/auth/oauth/token?code=${code}`);
};
