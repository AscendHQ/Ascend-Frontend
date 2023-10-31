import axios from "axios";

import { getSecureStorage } from "@/utils/cookieStorage";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 3000,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = getSecureStorage("userInfoAccessToken");
  if (token) {
    config.headers["access-token"] = token;
  }

  return config;
});
