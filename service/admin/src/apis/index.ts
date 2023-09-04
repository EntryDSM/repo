import axios, { AxiosError } from "axios";

export const instance = axios.create({
  baseURL: "https://api.dsm-repo.com",
  timeout: 3000,
});

instance.interceptors.request.use(
  async function (config) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      // @ts-ignore
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        'X-Not-Using-Xquare-Auth': 'true'
      };
    }
    return config;
  },
  function (error: AxiosError) {
    error.status;
    if (error.status) {
      window.location.href = "https://www.dsm-repo.com/";
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(undefined, function (error) {
  const status = error.response?.status;
  const isSignUp = window.location.href.includes("/sign-in");
  if (status && !isSignUp) {
    switch (error.response.status) {
      case 401:
        window.location.href = "https://www.dsm-repo.com/";
        break;
      default:
        return Promise.reject(error);
    }
  }
});
