import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

export const instance = axios.create({
  baseURL: "https://api.dsm-repo.com",
  timeout: 3000,
});

instance.interceptors.request.use(
  async function (config) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      //@ts-ignore
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(undefined, function (error) {
  const status = error.response.status;
  const isSignIn = window.location.href.includes("/sign-in");
  if (status && !isSignIn) {
    switch (status) {
      case 401:
        window.location.href = "https://www.dsm-repo.com/";
        break;
      default:
        throw error;
    }
  }
  console.log(error);
  throw error;
});
