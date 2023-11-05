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

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const response = error?.response;
    const statusCode = response?.status;

    if (statusCode === 403) {
      window.localStorage.clear();
      window.location.href = "/auth/login";
    }
  }
);
