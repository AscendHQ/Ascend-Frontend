import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import { LOGIN_PAGE } from "@/config/links";
import { getSecureStorage } from "@/utils/localStorage";

const ADMIN_PATH = "/dashboard";
const PARENT_PATH = "/parent";
const STUDENT_PATH = "/student";
const TEACHER_PATH = "/teacher";

const getAccountHome = (accountType?: string) => {
  if (accountType === "parent") return PARENT_PATH;
  if (accountType === "student") return STUDENT_PATH;
  if (accountType === "teacher") return TEACHER_PATH;
  return ADMIN_PATH;
};

const getRequestedArea = (pathname: string) => {
  if (pathname.startsWith(PARENT_PATH)) return PARENT_PATH;
  if (pathname.startsWith(STUDENT_PATH)) return STUDENT_PATH;
  if (pathname.startsWith(TEACHER_PATH)) return TEACHER_PATH;
  return ADMIN_PATH;
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isCheckingAuthentication, setIsCheckingAuthentication] =
    useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const accessToken = getSecureStorage("userInfoAccessToken");
    if (!accessToken) {
      void router.replace(LOGIN_PAGE);
      return;
    }

    const userInfo = getSecureStorage("userInfoData") as
      | { account_type?: string }
      | undefined;
    const accountHome = getAccountHome(userInfo?.account_type);
    if (getRequestedArea(router.pathname) !== accountHome) {
      void router.replace(accountHome);
      return;
    }

    setIsCheckingAuthentication(false);
  }, [router]);

  if (isCheckingAuthentication) return null;
  return <>{children}</>;
};

export default ProtectedRoute;
