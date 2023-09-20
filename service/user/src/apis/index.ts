import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

export const instance = axios.create({
  baseURL: "https://api.dsm-repo.com",
  timeout: 10000,
});

instance.interceptors.request.use(
  async function (config) {
    const accessToken =
      "eyJ0eXBlIjoiYWNjZXNzIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiIxZjg3MDk0Mi1hYzRlLTQ1YmMtODg0My1iZGQ5NTI2MTE1YjciLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTY5NDk0NTA1OSwiZXhwIjoxMTY5NDk0NTA1OX0.-xCyrbeLCKlYswnQHglfed45_eKl6tEvFVcg9NipbjmJgYZIYeMak3Ea0cERt42kyX7q3oe3xFphwsbjBRXTsg";
    if (accessToken) {
      //@ts-ignore
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        "X-Not-Using-Xquare-Auth": "true",
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
