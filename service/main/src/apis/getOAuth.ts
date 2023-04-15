import { instance } from ".";

interface GetOAuthRes {
  login_link: string;
}

export const getOAuth = () => {
  return instance.get<GetOAuthRes>("/auth/google/link");
};
