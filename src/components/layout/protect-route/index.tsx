import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import { LOGIN_PAGE } from "@/config/links";
import { getSecureStorage } from "@/utils/localStorage";

const ADMIN_PATH = "/dashboard";
const PARENT_PATH = "/parent";
const STUDENT_PATH = "/student";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isCheckingAuthentication, setIsCheckingAuthentication] =
    useState(true);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const accessToken = getSecureStorage("userInfoAccessToken");
    if (!accessToken) {
      void router.replace(LOGIN_PAGE);
      return;
    }

    const userInfo = getSecureStorage("userInfoData") as
      | { account_type?: string }
      | undefined;
    const isParent = userInfo?.account_type === "parent";
    const isStudent = userInfo?.account_type === "student";
    if (router.pathname.startsWith(PARENT_PATH) && !isParent) {
      void router.replace(isStudent ? STUDENT_PATH : ADMIN_PATH);
      return;
    }
    if (router.pathname.startsWith(ADMIN_PATH) && isParent) {
      void router.replace(PARENT_PATH);
      return;
    }
    if (router.pathname.startsWith(STUDENT_PATH) && !isStudent) {
      void router.replace(isParent ? PARENT_PATH : ADMIN_PATH);
      return;
    }
    if (router.pathname.startsWith(ADMIN_PATH) && isStudent) {
      void router.replace(STUDENT_PATH);
      return;
    }

    setIsCheckingAuthentication(false);
  }, [router]);

  if (isCheckingAuthentication) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
