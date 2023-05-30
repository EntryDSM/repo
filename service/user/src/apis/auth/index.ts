import { instance } from "..";

export interface postSignUpBody {
  name: string;
  email: string;
  grade: number;
  class_num: number;
  number: number;
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

export const oAuthLogin = ({
  code,
  scope,
  authuser,
  hd,
  prompt,
}: oAuthLoginReqType) => {
  return instance.get<oAuthLoginResType>(
    `/auth/oauth/token?code=${code}&prompt=${prompt}&hd=${hd}&scope=${scope}&authuser=${authuser}`
  );
};
