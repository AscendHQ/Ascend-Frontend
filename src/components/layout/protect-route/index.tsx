import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import { LOGIN_PAGE } from "@/config/links";
import { getSecureStorage } from "@/utils/localStorage";

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
    if (router.pathname.startsWith("/parent") && !isParent) {
      void router.replace("/dashboard");
      return;
    }
    if (router.pathname.startsWith("/dashboard") && isParent) {
      void router.replace("/parent");
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
