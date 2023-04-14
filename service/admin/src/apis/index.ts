import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.dsm-repo.com",
  timeout: 3000,
});
