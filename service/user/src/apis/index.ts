import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

export const instance = axios.create({
  baseURL: "https://api.dsm-repo.com",
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${
      typeof window ?? localStorage.getItem("access_token")
    }`,
  },
});

instance.interceptors.request.use(
  async function (config) {
    const { push } = useRouter();
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      //@ts-ignore
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    } else push("https://www.dsm-repo.com/");
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);
