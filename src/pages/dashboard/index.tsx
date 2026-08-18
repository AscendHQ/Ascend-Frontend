import { useRouter } from "next/router";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { PLATFORM_METRICS } from "@/config/links";
import useIsAscendOwner from "@/hooks/use-is-ascend-owner";
import MainSection from "@/templates/Dashboard-overview/main-section";

export default function Dashboard() {
  const router = useRouter();
  const { isReady, isAscendOwner } = useIsAscendOwner();

  React.useEffect(() => {
    if (isReady && isAscendOwner) void router.replace(PLATFORM_METRICS);
  }, [isAscendOwner, isReady, router]);

  if (!isReady || isAscendOwner) return null;

  return (
    <Container headerTitle="Overview">
      <MainSection />
    </Container>
  );
}
