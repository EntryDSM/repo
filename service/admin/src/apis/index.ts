import axios, { AxiosError } from "axios";

export const instance = axios.create({
  baseURL: "https://api.dsm-repo.com",
  timeout: 10000,
});

instance.interceptors.request.use(
  async function (config) {
    const accessToken = "eyJ0eXBlIjoiYWNjZXNzIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiIwNDJhMTFiMy03NGVlLTRjNGUtODRkNi1lMWMwNGZkZWFkNDAiLCJyb2xlIjoiVEVBQ0hFUiIsImlhdCI6MTY5NTM1MDA5MiwiZXhwIjoxMTY5NTM1MDA5Mn0.VP6O1uhC42jDlzktyzokd7NfxjfOKZZ-YSDKL4a990AJn_Ye_o7EfoiLxB9txQcZJ7kwROVYnQ31YmKH2wgUzQ"
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
