import React from "react";

import { getSecureStorage } from "@/utils/localStorage";

const ASCEND_ADMIN_ACCESS_LEVEL = 2;

export default function useIsAscendOwner() {
  const [isReady, setIsReady] = React.useState(false);
  const [isAscendOwner, setIsAscendOwner] = React.useState(false);

  React.useEffect(() => {
    const account = getSecureStorage("userInfoData") as
      | { access_level?: number | string }
      | undefined;
    setIsAscendOwner(
      Number(account?.access_level ?? 0) >= ASCEND_ADMIN_ACCESS_LEVEL,
    );
    setIsReady(true);
  }, []);

  return { isReady, isAscendOwner };
}
