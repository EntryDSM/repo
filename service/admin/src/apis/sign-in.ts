import { instance } from ".";

export interface PostSignIn {
  account_id: string;
  password: string;
}

interface PostSignInResType {
  access_expired_at: string;
  access_token: string;
  refresh_expired_at: string;
  refresh_token: string;
}

export const postSignIn = (body: PostSignIn) => {
  return instance.post<PostSignInResType>("/teacher/auth", body);
};
