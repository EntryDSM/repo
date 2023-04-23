import axios, { AxiosError } from "axios";

export const instance = axios.create({
  baseURL: "https://api.dsm-repo.com",
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${typeof window ?? localStorage.getItem("access_token")}`,
  },
});

instance.interceptors.request.use(
  async function (config) {
    const accessToken = localStorage.getItem("access_token");
    accessToken
      ? //@ts-ignore
        (config.headers = {
          Authorization: `Bearer ${accessToken}`,
        })
      : null;
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);
