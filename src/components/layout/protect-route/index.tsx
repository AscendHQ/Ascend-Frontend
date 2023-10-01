// components/ProtectedRoute.js
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { LOGIN_PAGE } from "@/config/links";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = "";
    if (!isLoggedIn) {
      router.push(LOGIN_PAGE);
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
