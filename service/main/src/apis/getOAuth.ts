import axios from "axios";
import { instance } from ".";

interface GetOAuthRes {
  loginLink: string;
}

export const getOAuth = () => {
  return instance.get<GetOAuthRes>(`/auth/google/link`);
};
