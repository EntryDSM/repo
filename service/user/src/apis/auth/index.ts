import { instance } from "..";

export interface postSignUpBody {
  name: string;
  email: string;
  grade: number;
  class_num: number;
  number: number;
  major_id: string;
  profile_image_path: string;
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

interface oAuthLoginReqType {
  code: string;
  scope: string;
  authuser: string;
  hd: string;
  prompt: string;
}

export const oAuthLogin = async ({ code }: oAuthLoginReqType) => {
  return instance.get<oAuthLoginResType>(`/auth/oauth/token?code=${code}`);
};
