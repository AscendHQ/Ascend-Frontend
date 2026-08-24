import axios from "axios";

import { LOGIN_PAGE } from "@/config/links";
import { getSecureStorage } from "@/utils/localStorage";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 60000,
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
    const errorMessage = String(response?.data ?? "").toLowerCase();
    const isAuthenticationFailure = [
      "invalid token",
      "request not authenticated",
      "school account is suspended",
    ].includes(errorMessage);

    // Only explicit token failures may clear a login. Permission errors from
    // individual modules must leave the rest of the signed-in session intact.
    if (isAuthenticationFailure) {
      window.localStorage.removeItem("userInfoAccessToken");
      window.localStorage.removeItem("userInfoData");
      window.location.href = LOGIN_PAGE;
    }

    return Promise.reject(error);
  }
);
